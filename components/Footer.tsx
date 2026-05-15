export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-sm text-navy/80 md:grid-cols-3">
        <div>
          <h3 className="mb-2 font-serif text-base text-navy">Contact</h3>
          <p>CSU Fresno · Department of Music</p>
          <p>
            <a href="tel:+15592782654" className="hover:text-cardinal">
              (559) 278-2654
            </a>
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-serif text-base text-navy">Follow</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://instagram.com/fsbmb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cardinal"
              >
                Instagram · @fsbmb
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/bulldogmarchingband"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cardinal"
              >
                Facebook · bulldogmarchingband
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@fsbmb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cardinal"
              >
                YouTube · @fsbmb
              </a>
            </li>
          </ul>
        </div>

        <div className="text-navy/70">
          <p className="font-serif text-base text-navy mb-2">Fresno State</p>
          <p>
            A program of California State University, Fresno — Department of
            Music.
          </p>
        </div>
      </div>

      <div className="border-t border-navy/10">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-navy/60">
          © 2026 Bulldog Marching Band Alumni Association
        </div>
      </div>
    </footer>
  );
}
