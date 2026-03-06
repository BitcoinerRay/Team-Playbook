import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parse as parseYaml } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MODULES_DIR = join(ROOT, "modules");
const PRESETS_DIR = join(ROOT, "presets");
const REGISTRY_DIR = join(ROOT, "registry");

interface ModuleMeta {
  id: string;
  name: string;
  type: string;
  version: string;
  owner: string;
  status: string;
  summary: string;
  tags: string[];
  applies_to: string[];
  dependencies: string[];
  updated_at: string;
}

interface PresetMeta {
  id: string;
  name: string;
  version: string;
  summary: string;
  applies_to: string[];
  required: { rules: string[]; skills: string[]; commands: string[]; templates: string[] };
  optional: { rules: string[]; skills: string[]; commands: string[]; templates: string[] };
}

function collectModules(): (ModuleMeta & { path: string })[] {
  const modules: (ModuleMeta & { path: string })[] = [];
  for (const type of ["rules", "skills", "commands", "templates"]) {
    const dir = join(MODULES_DIR, type);
    if (!existsSync(dir)) continue;
    const subdirs = readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    for (const sub of subdirs) {
      const metaPath = join(dir, sub, "meta.yaml");
      if (!existsSync(metaPath)) continue;
      const raw = readFileSync(metaPath, "utf-8");
      const data = parseYaml(raw) as ModuleMeta;
      modules.push({ ...data, path: `modules/${type}/${sub}` });
    }
  }
  return modules;
}

function collectPresets(): (PresetMeta & { path: string })[] {
  const presets: (PresetMeta & { path: string })[] = [];
  if (!existsSync(PRESETS_DIR)) return presets;
  const subdirs = readdirSync(PRESETS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const sub of subdirs) {
    const presetPath = join(PRESETS_DIR, sub, "preset.yaml");
    if (!existsSync(presetPath)) continue;
    const raw = readFileSync(presetPath, "utf-8");
    const data = parseYaml(raw) as PresetMeta;
    presets.push({ ...data, path: `presets/${sub}` });
  }
  return presets;
}

function buildSearchIndex(modules: (ModuleMeta & { path: string })[], presets: (PresetMeta & { path: string })[]) {
  return {
    modules: modules.map((m) => ({
      id: m.id,
      name: m.name,
      type: m.type,
      summary: m.summary,
      tags: m.tags,
      path: m.path,
    })),
    presets: presets.map((p) => ({
      id: p.id,
      name: p.name,
      summary: p.summary,
      tags: p.applies_to,
      path: p.path,
    })),
  };
}

function main() {
  const modules = collectModules();
  const presets = collectPresets();

  const index = { modules, presets };
  const searchIndex = buildSearchIndex(modules, presets);

  if (!existsSync(REGISTRY_DIR)) {
    mkdirSync(REGISTRY_DIR, { recursive: true });
  }

  writeFileSync(join(REGISTRY_DIR, "index.json"), JSON.stringify(index, null, 2));
  writeFileSync(join(REGISTRY_DIR, "search-index.json"), JSON.stringify(searchIndex, null, 2));

  console.log(`Built registry: ${modules.length} modules, ${presets.length} presets`);
}

main();
