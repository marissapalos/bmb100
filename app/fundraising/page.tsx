import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Fundraising — Bulldog Marching Band Centennial",
  description:
    "Gift card fundraisers and monthly profit share nights supporting the Bulldog Marching Band Centennial Celebration.",
};

const html = readFileSync(
  path.join(process.cwd(), "app", "fundraising", "body.html"),
  "utf8",
);

export default function FundraisingPage() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
