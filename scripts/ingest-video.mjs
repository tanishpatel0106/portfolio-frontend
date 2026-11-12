#!/usr/bin/env node
// Turns a Brag render (brag-output/brag.mp4) into web-ready assets and prints
// the `video: {...}` snippet for src/constants/products.tsx.
//
//   node scripts/ingest-video.mjs <project-slug> <path/to/brag.mp4>
//
// Needs FFmpeg on PATH. With BLOB_READ_WRITE_TOKEN set (Vercel Blob), the
// files are uploaded and the snippet uses their public URLs. Without it, the
// files are written to ./video-out/<slug>/ for you to host yourself.
// Videos are never committed to git.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const [slug, input] = process.argv.slice(2);
if (!slug || !input) {
  console.error("Usage: node scripts/ingest-video.mjs <project-slug> <path/to/video.mp4>");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error("The slug may only contain lowercase letters, digits and dashes.");
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`File not found: ${input}`);
  process.exit(1);
}

const run = (cmd, args) => {
  const res = spawnSync(cmd, args, { encoding: "utf8" });
  if (res.error || res.status !== 0) {
    console.error(`${cmd} failed:\n${res.stderr || res.error?.message}`);
    process.exit(1);
  }
  return res.stdout.trim();
};

const outDir = path.join("video-out", slug);
mkdirSync(outDir, { recursive: true });
const mp4 = path.join(outDir, `${slug}.mp4`);
const webm = path.join(outDir, `${slug}.webm`);
const poster = path.join(outDir, `${slug}-poster.webp`);
// Cap at 1080p, keep aspect ratio, force even dimensions.
const scale = "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2";

console.log("Encoding MP4 (H.264, fast start)…");
run("ffmpeg", ["-y", "-i", input, "-vf", scale, "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", mp4]);

console.log("Encoding WebM (VP9)…");
run("ffmpeg", ["-y", "-i", input, "-vf", scale, "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-row-mt", "1", "-c:a", "libopus", "-b:a", "96k", webm]);

console.log("Grabbing poster frame…");
run("ffmpeg", ["-y", "-ss", "1", "-i", input, "-frames:v", "1", "-vf", scale, "-quality", "82", poster]);

const duration = Math.round(
  Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", mp4]))
);

let urls = { src: mp4, webm, poster };
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (token) {
  const { put } = await import("@vercel/blob");
  const upload = async (file, contentType) => {
    const blob = await put(`videos/${path.basename(file)}`, readFileSync(file), {
      access: "public",
      contentType,
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return blob.url;
  };
  console.log("Uploading to Vercel Blob…");
  urls = {
    src: await upload(mp4, "video/mp4"),
    webm: await upload(webm, "video/webm"),
    poster: await upload(poster, "image/webp"),
  };
} else {
  console.log(`\nNo BLOB_READ_WRITE_TOKEN set. Files are in ${outDir}/ — upload them to your storage and replace the paths below with their URLs.`);
}

console.log(`\nAdd this to the "${slug}" entry in src/constants/products.tsx:\n`);
console.log(`  video: {
    src: "${urls.src}",
    webm: "${urls.webm}",
    poster: "${urls.poster}",
    duration: ${duration},
  },\n`);
