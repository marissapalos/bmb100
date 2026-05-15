import { readFileSync } from "node:fs";
import path from "node:path";

const html = readFileSync(
  path.join(process.cwd(), "app", "reunion", "body.html"),
  "utf8",
);

export default function ReunionPage() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
