#!/usr/bin/env node
// Prepares a project video (for example a Brag render) for the site and prints
// the `video: {...}` snippet for src/constants/products.tsx.
//
//   node scripts/ingest-video.mjs <project-slug> <path/to/video.mp4> [--poster-at 5] [--blob] [--webm]
//
// Needs FFmpeg on PATH.
//   default   writes public/videos/<slug>.mp4 and <slug>-poster.webp, to be
//             committed with the site (fine for short clips of a few MB)
//   --blob    uploads to Vercel Blob instead (needs BLOB_READ_WRITE_TOKEN),
//             for long or numerous videos that should stay out of git
//   --webm    also encode a VP9 WebM (smaller for some browsers, slower to make)
//   --poster-at <seconds>  which frame becomes the poster (default 1)

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const positional = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--poster-at");
const [slug, input] = positional;

if (!slug || !input) {
  console.error("Usage: node scripts/ingest-video.mjs <project-slug> <path/to/video.mp4> [--poster-at 5] [--blob] [--webm]");
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
const posterAt = Number(option("--poster-at", "1"));
if (!Number.isFinite(posterAt) || posterAt < 0) {
  console.error("--poster-at takes a number of seconds.");
  process.exit(1);
}
const useBlob = flag("--blob");
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (useBlob && !token) {
  console.error("--blob needs BLOB_READ_WRITE_TOKEN in the environment.");
  process.exit(1);
}

const run = (cmd, cmdArgs) => {
  const res = spawnSync(cmd, cmdArgs, { encoding: "utf8" });
  if (res.error || res.status !== 0) {
    console.error(`${cmd} failed:\n${res.stderr || res.error?.message}`);
    process.exit(1);
  }
  return res.stdout.trim();
};

const outDir = useBlob ? path.join("video-out", slug) : path.join("public", "videos");
mkdirSync(outDir, { recursive: true });
const mp4 = path.join(outDir, `${slug}.mp4`);
const webm = path.join(outDir, `${slug}.webm`);
const poster = path.join(outDir, `${slug}-poster.webp`);
// Cap at 1080p, keep the aspect ratio, force even dimensions.
const scale = "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2";

console.log("Encoding MP4 (H.264, fast start)…");
run("ffmpeg", ["-y", "-i", input, "-vf", scale, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", mp4]);

if (flag("--webm")) {
  console.log("Encoding WebM (VP9)…");
  run("ffmpeg", ["-y", "-i", input, "-vf", scale, "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-row-mt", "1", "-c:a", "libopus", "-b:a", "96k", webm]);
}

console.log(`Grabbing the poster frame at ${posterAt}s…`);
run("ffmpeg", ["-y", "-ss", String(posterAt), "-i", input, "-frames:v", "1", "-vf", scale, "-quality", "84", poster]);

const duration = Math.round(
  Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", mp4]))
);
const mb = (file) => (statSync(file).size / 1e6).toFixed(1);

let urls = {
  src: `/videos/${slug}.mp4`,
  webm: flag("--webm") ? `/videos/${slug}.webm` : null,
  poster: `/videos/${slug}-poster.webp`,
};

if (useBlob) {
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
    webm: flag("--webm") ? await upload(webm, "video/webm") : null,
    poster: await upload(poster, "image/webp"),
  };
}

console.log(`\n${mp4}  ${mb(mp4)} MB`);
console.log(`\nAdd this to the "${slug}" entry in src/constants/products.tsx:\n`);
console.log(
  [
    "  video: {",
    `    src: "${urls.src}",`,
    urls.webm ? `    webm: "${urls.webm}",` : null,
    `    poster: "${urls.poster}",`,
    `    duration: ${duration},`,
    "  },",
  ]
    .filter(Boolean)
    .join("\n") + "\n"
);
