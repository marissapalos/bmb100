import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "FAQ — Bulldog Marching Band Centennial",
  description:
    "Answers about registering, the event schedule, alumni participation, and giving during the Bulldog Marching Band 100 Year Celebration.",
};

const html = readFileSync(
  path.join(process.cwd(), "app", "faq", "body.html"),
  "utf8",
);

export default function FaqPage() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
