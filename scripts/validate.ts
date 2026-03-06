import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MODULES_DIR = join(ROOT, "modules");
const PRESETS_DIR = join(ROOT, "presets");

const MetaSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["rule", "skill", "command", "template"]),
  version: z.string(),
  owner: z.string(),
  status: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  applies_to: z.array(z.string()),
  dependencies: z.array(z.string()),
  updated_at: z.string(),
});

const PresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  summary: z.string(),
  applies_to: z.array(z.string()),
  required: z.object({
    rules: z.array(z.string()),
    skills: z.array(z.string()),
    commands: z.array(z.string()),
    templates: z.array(z.string()),
  }),
  optional: z.object({
    rules: z.array(z.string()),
    skills: z.array(z.string()),
    commands: z.array(z.string()),
    templates: z.array(z.string()),
  }),
});

function walkDirs(dir: string, base = ""): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const dirs: string[] = [];
  for (const e of entries) {
    if (e.isDirectory() && !e.name.startsWith(".")) {
      const path = base ? `${base}/${e.name}` : e.name;
      dirs.push(path);
      dirs.push(...walkDirs(join(dir, e.name), path));
    }
  }
  return dirs;
}

function collectModuleIds(): Map<string, string> {
  const ids = new Map<string, string>();
  for (const type of ["rules", "skills", "commands", "templates"]) {
    const dir = join(MODULES_DIR, type);
    if (!existsSync(dir)) continue;
    const subdirs = readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    for (const sub of subdirs) {
      const metaPath = join(dir, sub, "meta.yaml");
      if (!existsSync(metaPath)) {
        console.error(`Missing meta.yaml: modules/${type}/${sub}/`);
        process.exit(1);
      }
      const raw = readFileSync(metaPath, "utf-8");
      const data = parseYaml(raw);
      const result = MetaSchema.safeParse(data);
      if (!result.success) {
        console.error(`Invalid meta.yaml in modules/${type}/${sub}/:`, result.error.message);
        process.exit(1);
      }
      const { id } = result.data;
      if (id !== sub) {
        console.error(`meta.yaml id "${id}" must match directory name "${sub}" in modules/${type}/${sub}/`);
        process.exit(1);
      }
      if (ids.has(id)) {
        console.error(`Duplicate module id: ${id} (${ids.get(id)} vs modules/${type}/${sub})`);
        process.exit(1);
      }
      ids.set(id, `modules/${type}/${sub}`);
    }
  }
  return ids;
}

function collectPresetRefs(): { presetId: string; refs: string[] }[] {
  const presets: { presetId: string; refs: string[] }[] = [];
  if (!existsSync(PRESETS_DIR)) return presets;
  const subdirs = readdirSync(PRESETS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const sub of subdirs) {
    const presetPath = join(PRESETS_DIR, sub, "preset.yaml");
    if (!existsSync(presetPath)) continue;
    const raw = readFileSync(presetPath, "utf-8");
    const data = parseYaml(raw);
    const result = PresetSchema.safeParse(data);
    if (!result.success) {
      console.error(`Invalid preset.yaml in presets/${sub}/:`, result.error.message);
      process.exit(1);
    }
    if (result.data.id !== sub) {
      console.error(`preset.yaml id "${result.data.id}" must match directory name "${sub}" in presets/${sub}/`);
      process.exit(1);
    }
    const refs: string[] = [];
    for (const key of ["rules", "skills", "commands", "templates"] as const) {
      refs.push(...result.data.required[key], ...result.data.optional[key]);
    }
    presets.push({ presetId: result.data.id, refs: refs.filter(Boolean) });
  }
  return presets;
}

function main() {
  const moduleIds = collectModuleIds();
  const presetRefs = collectPresetRefs();

  for (const { presetId, refs } of presetRefs) {
    for (const ref of refs) {
      if (!moduleIds.has(ref)) {
        console.error(`Preset ${presetId} references unknown module: ${ref}`);
        process.exit(1);
      }
    }
  }

  console.log("Validation passed.");
}

main();
