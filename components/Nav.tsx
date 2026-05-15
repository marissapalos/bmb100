import Link from "next/link";

const links = [
  { href: "/timeline", label: "Timeline" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reunion", label: "Reunion" },
  { href: "/reunion#register", label: "Register" },
];

export function Nav() {
  return (
    <header className="border-b border-navy/10 bg-cream/80 backdrop-blur supports-[backdrop-filter]:bg-cream/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg tracking-wide text-navy hover:text-cardinal transition-colors"
        >
          BMB <span className="text-cardinal">·</span> 1926–2026
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-navy/80 hover:text-cardinal transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
