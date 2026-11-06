/* Regina v1 — Weezie motion layer (ported from weezietowels.com theme: animations.js + ScrapbookBanner/ParallaxManager)
   1) Dawn scroll-trigger slide-in reveals  2) scrapbook: sticky text + parallax polaroids + fade-in  3) endless centered video reel */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

  /* ---------- 1. scroll-trigger animate--slide-in (Weezie/Dawn animations.js) ---------- */
  function reveals() {
    const tag = (els, cascade) => els.forEach(el => { el.classList.add('scroll-trigger', 'animate--slide-in'); if (cascade) el.setAttribute('data-cascade', ''); });
    tag($$('.vhero'));                                    // video-section__media
    tag($$('main .strip'));
    tag($$('.rc h2'));
    tag($$('.clist-c'), true);                           // content lists cascade
    tag($$('.iwt-tx, .iwt-im'), true);
    tag($$('.cgrid li'), true);
    tag($$('.cib'));
    tag($$('.ugc > h2'));
    tag($$('.press'));
    tag($$('.ftr-g > *'), true);                          // footer__blocks-wrapper
    if (RM) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en, i) => {
        const t = en.target;
        if (en.isIntersecting) {
          if (t.classList.contains('scroll-trigger--offscreen')) {
            t.classList.remove('scroll-trigger--offscreen');
            if (t.hasAttribute('data-cascade')) t.style.setProperty('--animation-order', i);
          }
          obs.unobserve(t);
        } else {
          t.classList.add('scroll-trigger--offscreen');
        }
      });
    }, { rootMargin: '0px 0px -50px 0px' });
    $$('.scroll-trigger').forEach(el => io.observe(el));
    addEventListener('scroll', () => { const vh = innerHeight; $$('.scroll-trigger--offscreen').forEach(t => { const r = t.getBoundingClientRect(); if (r.top < vh - 50 && r.bottom > 0) { t.classList.remove('scroll-trigger--offscreen'); io.unobserve(t); } }); }, { passive: true });
  }

  /* ---------- 2. scrapbook banner (text-left layout, exact Weezie positions) ---------- */
  const SB = [ // width %, left %, top (vw), rotate deg, parallax strength
    [46, 27, 0, -5.53, 0.1], [41, 81, 7, 8.409, -0.1], [39, 33, 33, -10.88, 0.1], [36, 77, 49, 10.88, -0.2],
    [40, 33, 64, 5.53, 0.15], [36, 83, 80, -8.409, -0.15], [35, 32, 96, 8.409, 0.25], [36, 76, 114, -5.53, -0.1]
  ];
  const AR = [292 / 344, 193 / 239, 214 / 214, 292 / 344, 193 / 239, 254 / 339, 214 / 214, 193 / 239];
  function scrapbook() {
    const ph = $('.scrap-ph'); if (!ph) return;
    const pics = $$('.pol', ph).map(p => ({ src: $('img', p).getAttribute('src'), cap: ($('span', p) || {}).textContent || '' }));
    ph.className = 'scrap-ph sb-ctn';
    ph.innerHTML = pics.slice(0, 8).map((p, i) => {
      const [w, l, t, r, s] = SB[i];
      const shape = ['ticket', 'oval', 'arch', 'ticket', 'oval', 'round', 'arch', 'ticket'][i];
      return `<div class="sb-m" style="--w:${w}%;--l:${l}%;--t:${t}vw"><div class="sb-in" data-parallax-strength="${s}"><div class="sb-rot" style="--r:${r}deg"><div class="fr fr--${shape}" style="aspect-ratio:${shape === 'oval' ? 0.8 : AR[i]}"><img src="${p.src}" alt="" loading="lazy"></div></div></div></div>`;
    }).join('');
    const inners = $$('.sb-in', ph);
    if (RM) { inners.forEach(e => e.classList.add('anim')); return; }
    // fade-in once (ScrapbookBanner.onIntersection, rootMargin -10% 0 -20%)
    const io = new IntersectionObserver((es, o) => es.forEach(en => { if (en.isIntersecting) { o.unobserve(en.target); en.target.classList.add('anim'); } }), { rootMargin: '-10% 0px -20% 0px' });
    inners.forEach(e => io.observe(e));
    // ParallaxManager: translateY = (scrollY + vh/2 - elementCenter) * strength, desktop ≥1024 only
    const mq = matchMedia('(min-width: 1024px)');
    const data = new Map(), visible = new Set(); let ticking = false;
    const recalc = () => inners.forEach(el => { const prev = el.style.transform; el.style.transform = ''; const r = el.getBoundingClientRect(); data.set(el, r.top + scrollY + r.height / 2); el.style.transform = prev; });
    const update = () => { if (!mq.matches) return; const c = scrollY + innerHeight / 2; visible.forEach(el => { el.style.transform = `translateY(${(c - data.get(el)) * (parseFloat(el.dataset.parallaxStrength) || 0)}px)`; }); };
    const vis = new IntersectionObserver(es => { es.forEach(en => en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)); update(); });
    inners.forEach(el => vis.observe(el));
    // fade trigger fallback (same zone as rootMargin -10% 0 -20%) so it never depends on IO/rAF delivery alone
    const fade = () => { const vh = innerHeight; inners.forEach(el => { if (el.classList.contains('anim')) return; const r = el.getBoundingClientRect(); if (r.top < vh * 0.8 && r.bottom > vh * 0.1) el.classList.add('anim'); }); };
    addEventListener('scroll', () => { fade(); if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } }, { passive: true });
    fade();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { recalc(); update(); }, 100); }, { passive: true });
    mq.addEventListener('change', e => { if (!e.matches) inners.forEach(el => el.style.transform = ''); else { recalc(); update(); } });
    recalc(); update();
    addEventListener('load', () => { recalc(); update(); });
  }

  /* ---------- 3. video reel: centered + endless both directions ---------- */
  function reel() {
    const t = $('.ugc-track'); if (!t) return;
    const orig = $$('.ugc-t', t); if (orig.length < 2) return;
    const mk = cls => orig.map(n => { const c = n.cloneNode(true); c.classList.add(cls); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; return c; });
    const before = mk('is-clone'), after = mk('is-clone');
    before.forEach(c => t.insertBefore(c, orig[0])); after.forEach(c => t.appendChild(c));
    t.classList.add('is-loop');
    const setW = () => orig[orig.length - 1].offsetLeft + orig[orig.length - 1].offsetWidth - orig[0].offsetLeft + parseFloat(getComputedStyle(t).columnGap || 0);
    const center = el => el.offsetLeft + el.offsetWidth / 2 - t.clientWidth / 2;
    const jump = x => { t.style.scrollBehavior = 'auto'; t.style.scrollSnapType = 'none'; t.scrollLeft = x; requestAnimationFrame(() => { t.style.scrollBehavior = ''; t.style.scrollSnapType = ''; }); };
    const start = () => jump(center(orig[Math.floor(orig.length / 2)]));
    start(); addEventListener('load', start);
    let st;
    t.addEventListener('scroll', () => {
      clearTimeout(st);
      st = setTimeout(() => { const w = setW(), base = orig[0].offsetLeft; if (t.scrollLeft < base - w * 0.5) jump(t.scrollLeft + w); else if (t.scrollLeft > base + w * 0.5) jump(t.scrollLeft - w); }, 120);
    }, { passive: true });
    // arrows always active on a loop
    const w = t.closest('.rc-wrap'); if (w) { const f = () => $$('.rc-arr', w).forEach(a => a.disabled = false); t.addEventListener('scroll', f, { passive: true }); setTimeout(f, 60); }
    // in-view autoplay for clones (core only observed originals)
    if (!RM) { const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting ? en.target.play().catch(() => {}) : en.target.pause()), { threshold: .25 }); $$('video', t).forEach(v => io.observe(v)); }
  }

  function boot() { scrapbook(); reel(); reveals(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 0)); else setTimeout(boot, 0);
})();
