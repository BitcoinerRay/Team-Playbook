import { resolve } from "path";
import {
  DEFAULT_PLAYBOOK_SOURCE_ROOT,
  type NewPlaybookConfig,
  syncPlaybookConfig,
} from "./playbook.js";

function usage() {
  console.log("Usage: pnpm run sync-preset <preset-name> [--target <path>] [--source <path>]");
  console.log("Example: pnpm run sync-preset web3-product --target .");
}

function parseArgs(argv: string[]) {
  const presetName = argv[2];
  if (!presetName || presetName.startsWith("-")) {
    return { presetName: undefined, targetPath: ".", sourcePath: undefined as string | undefined };
  }

  let targetPath = ".";
  let sourcePath: string | undefined;

  for (let i = 3; i < argv.length; i++) {
    const arg = argv[i];
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

  return { presetName, targetPath, sourcePath };
}

function main() {
  try {
    const { presetName, targetPath, sourcePath } = parseArgs(process.argv);
    if (!presetName) {
      usage();
      process.exit(0);
    }

    const cwd = process.cwd();
    const targetRoot = resolve(cwd, targetPath);
    const sourceRoot = sourcePath ? resolve(cwd, sourcePath) : DEFAULT_PLAYBOOK_SOURCE_ROOT;

    const config: NewPlaybookConfig = {
      preset: presetName,
      include: { rules: [], skills: [], commands: [], templates: [] },
      exclude: { rules: [], skills: [], commands: [], templates: [] },
      overrides: {},
    };

    const result = syncPlaybookConfig({
      config,
      targetRoot,
      sourceRoot,
      sourceLabel: sourceRoot,
    });

    console.log("sync-preset delegated to playbook sync.");
    console.log(`Preset: ${presetName}`);
    console.log(`Target: ${targetRoot}`);
    console.log(`Source: ${sourceRoot}`);
    console.log(
      `Resolved modules: rules=${result.resolved.rules.length}, skills=${result.resolved.skills.length}, commands=${result.resolved.commands.length}, templates=${result.resolved.templates.length}`
    );
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}

main();
