/* Social proof (True Classic "Real guys. Real try-ons." layout) — Regina's own top TikToks + stats published on regina.com.mx/pages/nuestra-historia */
(function () {
  const REELS = [ // file, TikTok id, real view count at capture (Nov 5 2026), caption, start second (skips unboxing frames)
    ['r1', '7643943209856535825', '4.3K', 'Suavidad que se siente desde el primer toque', 0],
    ['r2', '7696671002205785365', '2.2K', 'Tips para vestir tu cama', 0],
    ['r3', '7673624267065462036', '2.4K', 'Un diseño fresco que transforma tu habitación', 32.8],
    ['r4', '7673626163331304724', '1.4K', '3 pasos para que tu cama parezca de hotel', 28]
  ];
  const STATS = [['1998', 'año de fundación'], ['+27', 'años en el mercado'], ['Millones', 'de hogares mexicanos'], ['3 MSI', 'meses sin intereses']];
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  const TT = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.4 6.4 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.4 1.3V6.5a4.5 4.5 0 0 1-4.4-4.5z"/></svg>';
  const css = `
  .sp{padding:72px 20px 80px;text-align:center;background:var(--sp-bg,#fff)}
  .sp-k{margin:0 0 10px;font:600 12px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#5A7A5A}
  .sp h2{margin:0;font:500 clamp(32px,3.4vw,46px)/1.08 'Cormorant Garamond',Georgia,serif;color:#002554;letter-spacing:-.005em}
  .sp-g{max-width:1232px;margin:40px auto 0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .sp-t{position:relative;aspect-ratio:293/366;border-radius:6px;overflow:hidden;background:#F3F3F1;cursor:pointer}
  .sp-t video,.sp-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .sp-t::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(1,15,43,.55));pointer-events:none;transition:opacity .3s}
  .sp-t.is-playing::after{opacity:0}
  .sp-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:84px;height:84px;border-radius:50%;border:1.5px solid rgba(255,255,255,.85);display:grid;place-items:center;z-index:2;transition:transform .25s,opacity .25s;background:none;cursor:pointer;padding:0}
  .sp-play span{width:62px;height:62px;border-radius:50%;background:#fff;color:#010F2B;display:grid;place-items:center;box-shadow:0 6px 18px rgba(0,0,0,.18)}
  .sp-play svg{width:20px;height:20px;margin-left:3px}
  .sp-t:hover .sp-play{transform:translate(-50%,-50%) scale(1.06)}
  .sp-t.is-playing .sp-play{opacity:0;pointer-events:none}
  .sp-cap{position:absolute;left:14px;right:14px;bottom:12px;z-index:2;text-align:left;color:#fff;font:500 14px/1.3 Inter,sans-serif;text-shadow:0 1px 4px rgba(0,0,0,.35);transition:opacity .3s}
  .sp-cap small{display:inline-flex;align-items:center;gap:5px;margin-top:6px;font-weight:600;font-size:12px;opacity:.95}
  .sp-cap svg{width:13px;height:13px}
  .sp-t.is-playing .sp-cap{opacity:0}
  .sp-stats{max-width:1232px;margin:42px auto 0;background:#EAE2D6;border-radius:10px;display:grid;grid-template-columns:repeat(4,1fr);padding:26px 0}
  .sp-s{padding:6px 10px;border-left:1px solid rgba(0,37,84,.14)}
  .sp-s:first-child{border-left:0}
  .sp-s b{display:block;font:500 clamp(30px,2.8vw,40px)/1 'Cormorant Garamond',Georgia,serif;color:#010F2B}
  .sp-s span{display:block;margin-top:8px;font:400 14px/1.3 Inter,sans-serif;color:#2B2F38}
  .sp-more{display:inline-flex;align-items:center;gap:8px;margin-top:22px;font:600 14px Inter,sans-serif;color:#002554;text-decoration:underline;text-underline-offset:3px}
  .sp-more svg{width:16px;height:16px}
  @media(max-width:989px){.sp-g{grid-template-columns:repeat(4,72%);overflow-x:auto;scroll-snap-type:x mandatory;margin:32px -20px 0;padding:0 20px;scrollbar-width:none}.sp-t{scroll-snap-align:start}.sp-g::-webkit-scrollbar{display:none}}
  @media(max-width:749px){.sp{padding:52px 20px 56px}.sp-stats{grid-template-columns:1fr 1fr;padding:6px 0}.sp-s{padding:16px 8px}.sp-s:nth-child(3){border-left:0}.sp-s:nth-child(n+3){border-top:1px solid rgba(0,37,84,.14)}}`;
  function build(anchor) {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const sec = document.createElement('section');
    sec.className = 'sp'; sec.setAttribute('aria-labelledby', 'sp-h');
    sec.innerHTML = `<p class="sp-k">Desde nuestras redes</p><h2 id="sp-h">Por qué millones de hogares eligen Regina</h2>
      <div class="sp-g">${REELS.map(([f, id, v, cap, s]) => `<div class="sp-t" data-start="${s}">
        <video playsinline preload="none" poster="media/social/${f}.jpg"><source src="media/social/${f}.mp4" type="video/mp4"></video>
        <button class="sp-play" aria-label="Reproducir: ${cap}"><span>${PLAY}</span></button>
        <div class="sp-cap">${cap}<br><small>${TT} ${v} vistas</small></div></div>`).join('')}</div>
      <div class="sp-stats">${STATS.map(([b, s]) => `<div class="sp-s"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
      <a class="sp-more" href="https://www.tiktok.com/@regina.mxoficial" target="_blank" rel="noopener">${TT} Ver más en @regina.mxoficial</a>`;
    anchor.parentNode.insertBefore(sec, anchor);
    const tiles = [...sec.querySelectorAll('.sp-t')];
    const stop = t => { const v = t.querySelector('video'); v.pause(); t.classList.remove('is-playing'); };
    tiles.forEach(t => {
      const v = t.querySelector('video');
      t.addEventListener('click', () => {
        if (t.classList.contains('is-playing')) { stop(t); return; }
        tiles.filter(x => x !== t).forEach(stop);
        const s = +t.dataset.start || 0;
        const go = () => { if (s && v.currentTime < s) v.currentTime = s; v.muted = false; v.play().catch(() => { v.muted = true; v.play().catch(() => {}); }); };
        if (v.readyState >= 1) go(); else { v.preload = 'auto'; v.addEventListener('loadedmetadata', go, { once: true }); v.load(); }
        t.classList.add('is-playing');
      });
      v.addEventListener('ended', () => stop(t));
    });
  }
  function boot() {
    const a = document.querySelector('#home .press') || document.querySelector('main .stores');
    if (a && !document.querySelector('.sp')) build(a);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 0)); else setTimeout(boot, 0);
})();
