import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "100 Years of the Bulldog Marching Band — 1926 to 2026",
  description:
    "A centennial celebration of the Fresno State Bulldog Marching Band. Timeline, gallery, and reunion registration.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* TODO v2: migrate to next/font/google + global CSS import. Linked here verbatim to match the Claude Design handoff exactly. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Playfair+Display:ital,wght@0,500;0,700;0,800;0,900;1,700;1,800&family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&family=Special+Elite&family=Noto+Music&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/handoff/styles.css" />
      </head>
      <body>
        {children}
        <Script src="/handoff/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
