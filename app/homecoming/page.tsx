import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "2026 Homecoming Alumni Band — Bulldog Marching Band Centennial",
  description:
    "Details for the 2026 Homecoming Alumni Band weekend — the Friday night alumni gathering at Crow & Wolf and Saturday's rehearsal, schedule, and logistics for game day.",
};

const html = readFileSync(
  path.join(process.cwd(), "app", "homecoming", "body.html"),
  "utf8",
);

export default function HomecomingPage() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
