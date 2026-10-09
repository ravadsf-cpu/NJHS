// Download every file we need from the old Weebly site into /public,
// so the new site is self-hosted and doesn't depend on Weebly staying up.
//
//   node scripts/fetch-assets.mjs
//
// Idempotent: skips files that already exist. Pass --force to re-download.
// Prints a final report with any failures.

import { mkdir, access, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { request } from "node:https";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const publicDir = resolve(root, "public");

const BASE = "https://njhslms.weebly.com/uploads/4/7/8/7/4787650/";
const FORCE = process.argv.includes("--force");

const downloads = {
  // PDFs and docs
  "downloads/service-hours-log-2026-27.pdf":
    "service_hours_log_2026-_2027_-_google_docs_2.pdf",
  "downloads/8th-grade-application.pdf":
    "8th_grade_njhs_application.docx.pdf",
  "downloads/teacher-recommendation-form.pdf":
    "lms_njhs_recommendation_form.docx.pdf",
  "downloads/njhs-information.pdf":
    "njhs_information___1_.pdf",
  "downloads/service-hours-log-2025-26.pdf":
    "service_hours_log_2025-__2026__1_.pdf",

  // Site photos
  "photos/site/group-2025-26.png":
    "2025-2025-njhs_orig.png",
  "photos/site/volunteer.png":
    "volunteer_orig.png",
  "photos/site/aug-njhs-flyer.jpg":
    "editor/aug-njhs-flyer.jpg",
  "photos/site/gallery-banner.jpg":
    "1000012470_orig.jpg",

  // Gallery albums
  "photos/gallery/2026-first-meeting/img-9389.jpg": "img-9389_orig.jpg",
  "photos/gallery/2026-first-meeting/img-9386.jpg": "img-9386_orig.jpg",
  "photos/gallery/2026-first-meeting/img-9387.jpg": "img-9387_orig.jpg",

  "photos/gallery/staff-goodie-bags/img-3422.jpg": "thumbnail-img-3422_orig.jpg",
  "photos/gallery/staff-goodie-bags/img-3426.jpg": "thumbnail-img-3426_orig.jpg",
  "photos/gallery/staff-goodie-bags/img-3423.jpg": "thumbnail-img-3423_orig.jpg",
  "photos/gallery/staff-goodie-bags/img-3425.jpg": "thumbnail-img-3425_orig.jpg",
  "photos/gallery/staff-goodie-bags/img-3424.jpg": "thumbnail-img-3424_orig.jpg",

  "photos/gallery/food-bank/food-bank-1.jpg":
    "thumbnail-b4fe1e47-febb-478d-9ed8-ebb502815da0_orig.jpg",
  "photos/gallery/food-bank/food-bank-2.jpg":
    "thumbnail-10ecf2f0-e40d-4a84-970a-9621bfb4c0fd_orig.jpg",

  "photos/gallery/past-meetings/img-3215.jpg": "thumbnail-img-3215_orig.jpg",
  "photos/gallery/past-meetings/img-3211.jpg": "thumbnail-img-3211_orig.jpg",
  "photos/gallery/past-meetings/img-3212.jpg": "thumbnail-img-3212_orig.jpg",
  "photos/gallery/past-meetings/img-3217.jpg": "thumbnail-img-3217_orig.jpg",
  "photos/gallery/past-meetings/img-3213.jpg": "thumbnail-img-3213_orig.jpg",

  "photos/gallery/2022-23-meetings/image-00.jpeg": "image_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-01.jpeg": "image-1_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-02.jpeg": "image-2_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-03.jpeg": "image-3_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-04.jpeg": "image-4_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-05.jpeg": "image-5_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-06.jpeg": "image-6_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-07.jpeg": "image-7_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-08.jpeg": "image-8_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-09.jpeg": "image-9_orig.jpeg",
  "photos/gallery/2022-23-meetings/image-10.jpeg": "image-10_orig.jpeg",

  "photos/gallery/oak-forest-foster-closet/oak-forest-holiday-2.jpg":
    "oak-forest-holiday-2-orig_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-holiday.jpg":
    "oak-forest-holiday-orig_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-4.jpg":
    "oak-forest-4_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-3.jpg":
    "oak-forest-3_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-2.jpg":
    "oak-forest-2_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-1.jpg":
    "oak-forest-1_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-5.jpg":
    "oak-forest-5_orig.jpg",
  "photos/gallery/oak-forest-foster-closet/oak-forest-main.png":
    "oak-forest-orig_orig.png",
  "photos/gallery/oak-forest-foster-closet/oak-forest-group.jpg":
    "oak-forest-group-orig_orig.jpg",
};

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function fetchBuffer(url, redirectsLeft = 5) {
  return new Promise((resolveP, rejectP) => {
    const req = request(url, { method: "GET", headers: { "user-agent": "njhs-asset-fetcher" } }, (res) => {
      const status = res.statusCode || 0;
      if (status >= 300 && status < 400 && res.headers.location) {
        res.resume();
        if (redirectsLeft <= 0) {
          rejectP(new Error(`too many redirects for ${url}`));
          return;
        }
        const next = new URL(res.headers.location, url).toString();
        fetchBuffer(next, redirectsLeft - 1).then(resolveP, rejectP);
        return;
      }
      if (status < 200 || status >= 300) {
        res.resume();
        rejectP(new Error(`HTTP ${status} for ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolveP(Buffer.concat(chunks)));
      res.on("error", rejectP);
    });
    req.on("error", rejectP);
    req.end();
  });
}

async function downloadOne(destRel, srcName) {
  const dest = resolve(publicDir, destRel);
  if (!FORCE && (await exists(dest))) {
    return { destRel, status: "skipped" };
  }
  await mkdir(dirname(dest), { recursive: true });
  const url = BASE + srcName;
  try {
    const buf = await fetchBuffer(url);
    await writeFile(dest, buf);
    return { destRel, status: "ok", size: buf.length };
  } catch (err) {
    return { destRel, status: "fail", url, error: String(err.message || err) };
  }
}

async function main() {
  const entries = Object.entries(downloads);
  const results = [];
  for (const [destRel, srcName] of entries) {
    const r = await downloadOne(destRel, srcName);
    const marker = r.status === "ok" ? "✓" : r.status === "skipped" ? "·" : "✗";
    const extra = r.status === "ok" ? ` ${Math.round(r.size / 1024)}k` : r.status === "fail" ? ` ${r.error}` : "";
    console.log(`${marker} ${destRel}${extra}`);
    results.push(r);
  }
  const ok = results.filter((r) => r.status === "ok").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const failed = results.filter((r) => r.status === "fail");
  console.log("");
  console.log(`downloaded: ${ok}   skipped (already present): ${skipped}   failed: ${failed.length}`);
  if (failed.length) {
    console.log("");
    console.log("Failures:");
    for (const f of failed) {
      console.log(`  ${f.destRel}  <- ${f.url}`);
      console.log(`      ${f.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
