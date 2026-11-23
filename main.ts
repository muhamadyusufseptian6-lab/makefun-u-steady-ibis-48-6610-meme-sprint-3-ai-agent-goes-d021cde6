// Meme Sprint 3: AI Agent Goes Rogue — entry program.
//
// Writes the original meme image (meme.png, shipped in this repo and
// drawn entirely in code) to $MAKEFUN_OUTPUT_DIR/entry.png.
// Node 22, stdlib-only, deterministic: the output is a byte-for-byte
// copy of the shipped image on every run.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The image lives in the repo next to this script; the input dir is
// only consulted as a fallback so the program also works when the
// harness stages the image there instead.
const candidates = [
  join(repoDir, "meme.png"),
  join(inputDir, "meme.png"),
];

const source = candidates.find((candidate) => existsSync(candidate));
if (source === undefined) {
  throw new Error("meme.png not found in repo dir or input dir");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "entry.png"));
