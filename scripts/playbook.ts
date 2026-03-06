import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { parse as parseYaml } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_PLAYBOOK_SOURCE_ROOT = join(__dirname, "..");
const MODULE_TYPES = ["rules", "skills", "commands", "templates"] as const;
type ModuleType = (typeof MODULE_TYPES)[number];
type ModuleRefs = Record<ModuleType, string[]>;

interface ModuleMeta {
  id: string;
  type: "rule" | "skill" | "command" | "template";
  dependencies: string[];
}

interface IndexedModule extends ModuleMeta {
  folderType: ModuleType;
  sourcePath: string;
}

interface Preset {
  id: string;
  extends?: string;
  required: ModuleRefs;
  optional: ModuleRefs;
}

export interface NewPlaybookConfig {
  source?: {
    repo?: string;
    ref?: string;
  };
  preset?: string;
  include?: Partial<ModuleRefs>;
  exclude?: Partial<ModuleRefs>;
  overrides?: Record<string, unknown>;
}

interface LegacyPlaybookConfig {
  preset?: string;
  modules?: Partial<ModuleRefs>;
  overrides?: {
    rules?: { add?: string[]; remove?: string[] };
    skills?: { add?: string[]; remove?: string[] };
    commands?: { add?: string[]; remove?: string[] };
    templates?: { add?: string[]; remove?: string[] };
  };
}

function usage() {
  console.log("Usage:");
  console.log("  pnpm playbook sync [--config playbook.yaml] [--target .] [--source /path/to/team-playbook]");
}

function parseArgs(argv: string[]) {
  const command = argv[2];
  if (!command) return { command: undefined, configPath: "playbook.yaml", targetPath: ".", sourcePath: undefined as string | undefined };

  let configPath = "playbook.yaml";
  let targetPath = ".";
  let sourcePath: string | undefined;

  for (let i = 3; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--config" && argv[i + 1]) {
      configPath = argv[++i];
      continue;
    }
    if (arg === "--target" && argv[i + 1]) {
      targetPath = argv[++i];
      continue;
    }
    if (arg === "--source" && argv[i + 1]) {
      sourcePath = argv[++i];
      continue;
    }
    console.error(`Unknown argument: ${arg}`);
    usage();
    process.exit(1);
  }

  return { command, configPath, targetPath, sourcePath };
}

function emptyModuleRefs(): ModuleRefs {
  return { rules: [], skills: [], commands: [], templates: [] };
}

function toUnique(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

function normalizeConfig(raw: unknown): NewPlaybookConfig {
  const doc = (raw || {}) as { playbook?: NewPlaybookConfig } & LegacyPlaybookConfig;
  if (doc.playbook && typeof doc.playbook === "object") {
    return doc.playbook;
  }

  const include = emptyModuleRefs();
  const exclude = emptyModuleRefs();
  const legacy = doc as LegacyPlaybookConfig;
  const oldOverrides = legacy.overrides || {};

  for (const t of MODULE_TYPES) {
    include[t] = toUnique([...(legacy.modules?.[t] || []), ...(oldOverrides[t]?.add || [])]);
    exclude[t] = toUnique(oldOverrides[t]?.remove || []);
  }

  return {
    preset: legacy.preset,
    include,
    exclude,
    overrides: {},
  };
}

function collectModules(sourceRoot: string): Map<string, IndexedModule> {
  const map = new Map<string, IndexedModule>();
  for (const folderType of MODULE_TYPES) {
    const typeDir = join(sourceRoot, "modules", folderType);
    if (!existsSync(typeDir)) continue;
    const subdirs = readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const sub of subdirs) {
      const metaPath = join(typeDir, sub, "meta.yaml");
      if (!existsSync(metaPath)) continue;
      const meta = parseYaml(readFileSync(metaPath, "utf-8")) as ModuleMeta;
      if (!meta?.id) continue;
      map.set(meta.id, {
        ...meta,
        folderType,
        sourcePath: join(typeDir, sub),
      });
    }
  }
  return map;
}

function collectPresets(sourceRoot: string): Map<string, Preset> {
  const map = new Map<string, Preset>();
  const presetsRoot = join(sourceRoot, "presets");
  if (!existsSync(presetsRoot)) return map;
  const subdirs = readdirSync(presetsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  for (const sub of subdirs) {
    const presetPath = join(presetsRoot, sub, "preset.yaml");
    if (!existsSync(presetPath)) continue;
    const preset = parseYaml(readFileSync(presetPath, "utf-8")) as Preset;
    if (!preset?.id) continue;
    map.set(preset.id, preset);
  }
  return map;
}

function mergeRefs(base: ModuleRefs, next: Partial<ModuleRefs>): ModuleRefs {
  const out = emptyModuleRefs();
  for (const t of MODULE_TYPES) {
    out[t] = toUnique([...(base[t] || []), ...((next[t] as string[]) || [])]);
  }
  return out;
}

function resolvePresetModules(presetId: string | undefined, presets: Map<string, Preset>): ModuleRefs {
  if (!presetId) return emptyModuleRefs();
  const preset = presets.get(presetId);
  if (!preset) {
    throw new Error(`Preset not found: ${presetId}`);
  }

  const chain = new Set<string>();
  function resolveOne(p: Preset): ModuleRefs {
    if (chain.has(p.id)) {
      throw new Error(`Preset extends cycle detected at: ${p.id}`);
    }
    chain.add(p.id);
    const base = p.extends ? resolveOne(requirePreset(p.extends, presets)) : emptyModuleRefs();
    const requiredAndOptional = mergeRefs(p.required || emptyModuleRefs(), p.optional || emptyModuleRefs());
    const merged = mergeRefs(base, requiredAndOptional);
    chain.delete(p.id);
    return merged;
  }
  return resolveOne(preset);
}

function requirePreset(id: string, presets: Map<string, Preset>): Preset {
  const preset = presets.get(id);
  if (!preset) {
    throw new Error(`Preset not found: ${id}`);
  }
  return preset;
}

function applyIncludeExclude(base: ModuleRefs, include?: Partial<ModuleRefs>, exclude?: Partial<ModuleRefs>): ModuleRefs {
  const out = emptyModuleRefs();
  for (const t of MODULE_TYPES) {
    const merged = toUnique([...(base[t] || []), ...((include?.[t] as string[]) || [])]);
    const removeSet = new Set((exclude?.[t] as string[]) || []);
    out[t] = merged.filter((id) => !removeSet.has(id));
  }
  return out;
}

function validateModuleRefs(refs: ModuleRefs, modules: Map<string, IndexedModule>, label: string) {
  for (const t of MODULE_TYPES) {
    for (const id of refs[t]) {
      if (!modules.has(id)) {
        throw new Error(`Unknown module in ${label}.${t}: ${id}`);
      }
    }
  }
}

function resolveDependencies(refs: ModuleRefs, modules: Map<string, IndexedModule>): ModuleRefs {
  const out = emptyModuleRefs();
  const queue: string[] = [];

  for (const t of MODULE_TYPES) {
    for (const id of refs[t]) {
      if (!out[t].includes(id)) {
        out[t].push(id);
      }
      queue.push(id);
    }
  }

  while (queue.length) {
    const id = queue.shift()!;
    const module = modules.get(id);
    if (!module) {
      throw new Error(`Dependency resolution failed, unknown module: ${id}`);
    }
    for (const dep of module.dependencies || []) {
      const depModule = modules.get(dep);
      if (!depModule) {
        throw new Error(`Module "${id}" references unknown dependency: ${dep}`);
      }
      const type = depModule.folderType;
      if (!out[type].includes(dep)) {
        out[type].push(dep);
        queue.push(dep);
      }
    }
  }

  for (const t of MODULE_TYPES) {
    out[t] = toUnique(out[t]);
  }
  return out;
}

function ensureDir(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function writeJson(path: string, data: unknown) {
  ensureDir(dirname(path));
  writeFileSync(path, JSON.stringify(data, null, 2));
}

function syncModules(resolved: ModuleRefs, modules: Map<string, IndexedModule>, targetRoot: string) {
  const playbookRoot = join(targetRoot, ".playbook");
  const modulesRoot = join(playbookRoot, "modules");
  rmSync(modulesRoot, { recursive: true, force: true });
  ensureDir(modulesRoot);

  for (const t of MODULE_TYPES) {
    ensureDir(join(modulesRoot, t));
    for (const id of resolved[t]) {
      const module = modules.get(id);
      if (!module) continue;
      cpSync(module.sourcePath, join(modulesRoot, t, id), { recursive: true });
    }
  }
}

function syncCursor(resolved: ModuleRefs, modules: Map<string, IndexedModule>, targetRoot: string) {
  const cursorRules = join(targetRoot, ".cursor", "rules");
  const cursorSkills = join(targetRoot, ".cursor", "skills");
  rmSync(cursorRules, { recursive: true, force: true });
  rmSync(cursorSkills, { recursive: true, force: true });
  ensureDir(cursorRules);
  ensureDir(cursorSkills);

  for (const id of resolved.rules) {
    const module = modules.get(id);
    if (!module) continue;
    const readmePath = join(module.sourcePath, "README.md");
    if (!existsSync(readmePath)) continue;
    const content = readFileSync(readmePath, "utf-8");
    writeFileSync(join(cursorRules, `${id}.md`), content);
  }

  for (const id of resolved.skills) {
    const module = modules.get(id);
    if (!module) continue;
    const readmePath = join(module.sourcePath, "README.md");
    if (!existsSync(readmePath)) continue;
    const content = readFileSync(readmePath, "utf-8");
    writeFileSync(join(cursorSkills, `${id}.md`), content);
  }
}

export function syncPlaybookConfig(params: {
  config: NewPlaybookConfig;
  targetRoot: string;
  sourceRoot: string;
  sourceLabel?: string;
}) {
  const { config, targetRoot, sourceRoot, sourceLabel } = params;
  const modules = collectModules(sourceRoot);
  const presets = collectPresets(sourceRoot);

  const presetModules = resolvePresetModules(config.preset, presets);
  const included = applyIncludeExclude(
    presetModules,
    config.include || emptyModuleRefs(),
    config.exclude || emptyModuleRefs()
  );
  validateModuleRefs(included, modules, "resolved");
  const resolved = resolveDependencies(included, modules);

  syncModules(resolved, modules, targetRoot);
  syncCursor(resolved, modules, targetRoot);

  const sourceInfo =
    sourceLabel ||
    (config.source
      ? `${config.source.repo || "unknown"}@${config.source.ref || "unknown"}`
      : sourceRoot);

  const manifest = {
    preset_id: config.preset || "",
    source: sourceInfo,
    overrides: config.overrides || {},
    resolved_modules: resolved,
    generated_at: new Date().toISOString(),
  };

  const registry = {
    schema_version: "1",
    synced_at: new Date().toISOString(),
    source: {
      repo: config.source?.repo || null,
      ref: config.source?.ref || null,
      local_root: sourceRoot,
    },
    preset_id: config.preset || null,
    include: config.include || emptyModuleRefs(),
    exclude: config.exclude || emptyModuleRefs(),
    overrides: config.overrides || {},
    resolved_modules: resolved,
    modules: Object.fromEntries(
      MODULE_TYPES.map((t) => [
        t,
        resolved[t].map((id) => {
          const module = modules.get(id)!;
          return {
            id,
            type: module.type,
            dependencies: module.dependencies || [],
            source_path: module.sourcePath,
          };
        }),
      ])
    ),
  };

  writeJson(join(targetRoot, ".playbook", "registry.json"), registry);
  writeJson(join(targetRoot, "docs", "playbook", "manifest.json"), manifest);

  return { resolved };
}

export function syncPlaybookFromConfigFile(params: {
  configAbsPath: string;
  targetRoot: string;
  sourceRoot: string;
}) {
  const { configAbsPath, targetRoot, sourceRoot } = params;
  if (!existsSync(configAbsPath)) {
    throw new Error(`Config not found: ${configAbsPath}`);
  }
  const rawConfig = parseYaml(readFileSync(configAbsPath, "utf-8"));
  const config = normalizeConfig(rawConfig);
  const result = syncPlaybookConfig({ config, targetRoot, sourceRoot });

  console.log("Playbook sync complete.");
  console.log(`Config: ${configAbsPath}`);
  console.log(`Target: ${targetRoot}`);
  console.log(`Source: ${sourceRoot}`);
  console.log(
    `Resolved modules: rules=${result.resolved.rules.length}, skills=${result.resolved.skills.length}, commands=${result.resolved.commands.length}, templates=${result.resolved.templates.length}`
  );
}

function main() {
  try {
    const { command, configPath, targetPath, sourcePath } = parseArgs(process.argv);
    if (!command || command === "help" || command === "--help") {
      usage();
      process.exit(0);
    }
    if (command !== "sync") {
      console.error(`Unsupported command: ${command}`);
      usage();
      process.exit(1);
    }

    const cwd = process.cwd();
    const targetRoot = resolve(cwd, targetPath);
    const sourceRoot = sourcePath ? resolve(cwd, sourcePath) : DEFAULT_PLAYBOOK_SOURCE_ROOT;
    const configAbsPath = resolve(targetRoot, configPath);

    syncPlaybookFromConfigFile({ configAbsPath, targetRoot, sourceRoot });
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main();
}
