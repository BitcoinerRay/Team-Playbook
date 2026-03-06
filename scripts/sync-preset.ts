const presetName = process.argv[2];

if (!presetName) {
  console.log("Usage: pnpm run sync-preset <preset-name> [--target <path>]");
  console.log("Example: pnpm run sync-preset web3-product");
  console.log("");
  console.log("Stub: validates preset exists, then exits. Future: copy/link modules into target.");
  process.exit(0);
}

const { readFileSync, existsSync } = await import("fs");
const { join, dirname } = await import("path");
const { fileURLToPath } = await import("url");
const __dirname = dirname(fileURLToPath(import.meta.url));
const presetPath = join(__dirname, "..", "presets", presetName, "preset.yaml");

if (!existsSync(presetPath)) {
  console.error(`Preset not found: ${presetName}`);
  process.exit(1);
}

console.log(`sync-preset: stub - preset="${presetName}" exists`);
console.log("Future: resolve required+optional modules, copy/link into --target. Options: --dry-run, --link");
process.exit(0);
