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

  /* --- Top nav scroll state --- */
  const nav = document.getElementById('topnav');
  const onScroll = () => {
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
