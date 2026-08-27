/* BMB Centennial — interactions */
(function(){
  'use strict';

  /* --- Active nav highlight (derived from URL pathname; body[data-page] kept as fallback) --- */
  const pageMap = { '/': 'home', '/timeline': 'timeline', '/gallery': 'gallery', '/reunion': 'reunion' };
  const page = pageMap[location.pathname] || document.body.dataset.page;
  if (page) {
    document.querySelectorAll('.topnav__links a[data-nav]').forEach(a => {
      if (a.dataset.nav === page) a.classList.add('is-current');
    });
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.getElementById('topnavToggle');
  const navLinks = document.getElementById('topnavLinks');
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* --- Top nav scroll state --- */
  /* Looked up per call, not cached: client-side route changes swap in a new
     #topnav node, and a cached reference would leave the new nav transparent
     over cream content. */
  const onScroll = () => {
    const nav = document.getElementById('topnav');
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal on scroll --- */
  const revealTargets = document.querySelectorAll(
    '.ms, .t-intro, .gallery__head, .gallery__filters, .masonry, .gallery__submit, .r-day, .reunion__meta, .faq, .register__head, .form, .footer__inner, .rband__inner'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-in'));
  }

  /* --- Hero parallax --- */
  const heroImg = document.querySelector('.hero__img');
  if (heroImg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let raf = null;
    const onScrollParallax = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        heroImg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
        raf = null;
      });
    };
    document.addEventListener('scroll', onScrollParallax, { passive: true });
  }

  /* --- Gallery filtering --- */
  const chips = document.querySelectorAll('.chip');
  const tiles = document.querySelectorAll('.m-tile');
  const eraMap = {
    'all': () => true,
    '1920s-40s': t => t.dataset.era === '1920s-40s',
    '1950s-60s': t => t.dataset.era === '1950s-60s',
    '1970s-80s': t => t.dataset.era === '1970s-80s',
    '1990s-00s': t => t.dataset.era === '1990s-00s',
    '2010s-today': t => t.dataset.era === '2010s-today'
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;
      const test = eraMap[filter] || eraMap.all;
      tiles.forEach(t => {
        if (test(t)) t.classList.remove('is-hidden');
        else t.classList.add('is-hidden');
      });
    });
  });

  /* --- Smooth anchor offset for fixed nav --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const tgt = document.getElementById(id);
      if (!tgt) return;
      e.preventDefault();
      const top = tgt.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --- Handle landing-with-hash from another page (e.g. reunion.html#register) --- */
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const tgt = document.getElementById(id);
    if (tgt) {
      // small delay so layout settles, then offset for fixed nav
      requestAnimationFrame(() => {
        setTimeout(() => {
          const top = tgt.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'auto' });
        }, 80);
      });
    }
  }

  /* --- Registration form --- */
  const form = document.getElementById('regForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // basic validation already runs via required attrs (we used novalidate so we mock success)
      form.querySelectorAll('fieldset, .form__submit').forEach(el => el.style.display = 'none');
      success.hidden = false;
      const top = success.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }
})();

/* BMB Centennial — FAQ page (/faq) search, filter & accordion.
   Kept in a separate IIFE with document-level delegation so it survives
   client-side route changes and stays inert on every other page. */
(function(){
  'use strict';

  const root = () => document.getElementById('faqp');

  const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();

  /* Applies the current query + category to every question, then updates the
     result count and empty state. */
  function apply(el, fromSearch){
    const q = norm(el.querySelector('#faqpSearch').value);
    const cat = (el.querySelector('.faqp-chip.is-active') || {}).dataset?.faqCat || 'all';
    let count = 0;

    el.querySelectorAll('.faqp-group').forEach(group => {
      const inCat = cat === 'all' || group.dataset.faqGroup === cat;
      let shown = 0;

      group.querySelectorAll('.faqp-item').forEach(item => {
        const hit = inCat && (!q || norm(item.textContent).includes(q));
        item.hidden = !hit;
        if (hit) {
          shown++;
          // A multi-character search auto-expands matches so the answer is visible;
          // clearing the search collapses them back down. Filtering by category
          // leaves whatever the reader already opened alone.
          if (fromSearch) item.open = q.length > 1;
        }
      });

      group.hidden = shown === 0;
      count += shown;
    });

    el.querySelector('#faqpClear').hidden = q.length === 0;
    el.querySelector('#faqpEmpty').hidden = count !== 0;
    el.querySelector('#faqpCount').textContent = q
      ? count + (count === 1 ? ' answer matches ' : ' answers match ') + '\u201C' + el.querySelector('#faqpSearch').value.trim() + '\u201D'
      : count + ' questions answered \u00B7 tap any question to expand';
  }

  document.addEventListener('input', (e) => {
    if (e.target.id !== 'faqpSearch') return;
    const el = root();
    if (el) apply(el, true);
  });

  document.addEventListener('click', (e) => {
    const el = root();
    if (!el) return;

    const chip = e.target.closest('.faqp-chip');
    if (chip && el.contains(chip)) {
      el.querySelectorAll('.faqp-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      apply(el);
      return;
    }

    if (e.target.closest('#faqpClear')) {
      el.querySelector('#faqpSearch').value = '';
      apply(el, true);
    }
  });

  /* One answer open at a time. */
  document.addEventListener('toggle', (e) => {
    const item = e.target;
    if (!item.classList || !item.classList.contains('faqp-item') || !item.open) return;
    const el = root();
    if (!el || !el.contains(item)) return;
    // While an active search has expanded every match, leave them all open.
    if (norm(el.querySelector('#faqpSearch').value).length > 1) return;
    el.querySelectorAll('.faqp-item[open]').forEach(other => {
      if (other !== item) other.open = false;
    });
  }, true);

  const el = root();
  if (el) apply(el);
})();
