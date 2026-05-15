import { readFileSync } from "node:fs";
import path from "node:path";

const html = readFileSync(
  path.join(process.cwd(), "app", "gallery", "body.html"),
  "utf8",
);

export default function GalleryPage() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
