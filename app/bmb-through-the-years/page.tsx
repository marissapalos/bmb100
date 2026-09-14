import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "BMB Through the Years Halftime Show — Bulldog Marching Band Centennial",
  description:
    "Details for BMB Through the Years, the September 26, 2026 centennial halftime performance welcoming Bulldog Marching Band alumni back to the field at the Fresno State football game vs. Rice.",
};

const html = readFileSync(
  path.join(process.cwd(), "app", "bmb-through-the-years", "body.html"),
  "utf8",
);

export default function BmbThroughTheYearsPage() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
