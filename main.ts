// Entry point for the bring-the-humans-03 TikTok ad.
//
// The ad itself lives on TikTok; this program only hands its address to
// the house. It copies VIDEO.json from the repository root into the
// output directory, byte for byte, so the grader can read the video.
//
// Node 22, standard library only. No network, no clock, no randomness:
// the same input always produces the same output.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, "VIDEO.json");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "VIDEO.json");

if (!existsSync(source)) {
  console.error(`VIDEO.json not found in the repository root: ${source}`);
  process.exit(1);
}

// The house only accepts a real TikTok video address, so check the
// shape before handing it over: https://www.tiktok.com/@<handle>/video/<digits>
const videoUrl = JSON.parse(readFileSync(source, "utf8")).url;
const tiktokVideo = /^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/\d+$/;
if (typeof videoUrl !== "string" || !tiktokVideo.test(videoUrl)) {
  console.error(`VIDEO.json url is not a TikTok video address: ${videoUrl}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`Copied VIDEO.json to ${target}`);
