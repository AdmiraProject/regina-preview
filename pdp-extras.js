/* Regina PDP details (v1 + v2): view labels from Regina's own photo naming, Frente/Reverso switch, feature chips from the real description */
(function () {
  const K = window.RGK; if (!K) return;
  const VIEWS = [['REVERSO', 'Reverso'], ['FRENTE', 'Frente'], ['DOBLAD', 'Doblado'], ['CENITAL', 'Vista cenital'], ['CLOSE', 'Detalle'], ['TEXTURA', 'Textura'], ['DETALLE', 'Detalle'], ['MODELO', 'En casa'], ['AMBIENTE', 'En casa'], ['DIBUJO', 'Diseño'], ['LATERAL', 'Lateral'], ['DIAGONAL', 'Cama'], ['CAMA', 'Cama']];
  const view = u => { const f = (u || '').split('/').pop().split('?')[0].toUpperCase(); const m = VIEWS.find(([k]) => f.includes(k)); return m ? m[1] : ''; };
  const FEAT = [
    [/doble vista|dos vistas/i, 'Doble vista', 'M4 6h7v12H4zM13 6h7v12h-7'],
    [/reverso[^.]*borrega|borrega/i, 'Reverso de borrega', 'M4 14c2-4 4-4 6 0s4 4 6 0 4-4 4-4M4 18c2-4 4-4 6 0s4 4 6 0'],
    [/jacquard/i, 'Tejido jacquard', 'M4 4h16v16H4zM4 9h16M4 14h16M9 4v16M14 4v16'],
    [/3d|relieve/i, 'Relieve', 'M4 16l5-8 4 6 3-4 4 6'],
    [/pelo alto/i, 'Pelo alto', 'M6 18V8M10 18V6M14 18V8M18 18V6'],
    [/sensa shine/i, 'Acabado Sensa Shine', 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z'],
    [/dupla-?bond/i, 'Tecnología Dupla-Bond', 'M8 12a4 4 0 108 0 4 4 0 10-8 0M4 12h4M16 12h4'],
    [/blackout|bloquear la luz/i, 'Blackout', 'M12 4a8 8 0 100 16 6 6 0 010-16z'],
    [/100% algod/i, '100% algodón', 'M12 4c3 3 3 6 0 9-3-3-3-6 0-9zM12 13v7'],
    [/zero twist/i, 'Zero Twist', 'M5 12c3-6 11-6 14 0-3 6-11 6-14 0z'],
    [/bordad/i, 'Bordado', 'M5 19L19 5M15 5h4v4'],
    [/terciopelo|velvet/i, 'Cojín de terciopelo', 'M4 9c0-3 16-3 16 0v6c0 3-16 3-16 0z'],
    [/ligero/i, 'Ligero', 'M4 14c4-8 12-8 16 0']
  ];
  const features = p => { const d = (p.d || '') + ' ' + (p.ty || ''); const out = []; FEAT.forEach(([re, l, path]) => { if (re.test(d) && out.length < 6 && !out.find(o => o.l === l)) out.push({ l, path }); }); return out; };
  K.view = view; K.features = features;

  const css = document.createElement('style');
  css.textContent = `
  .vlab{position:absolute;left:12px;top:12px;z-index:3;background:rgba(255,255,255,.92);color:#002554;font:600 11px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:6px 9px;border-radius:999px;pointer-events:none}
  .tlab{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(1,15,43,.55));color:#fff;font:600 9px/1 Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:10px 4px 5px;text-align:center;pointer-events:none}
  .fchips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 4px;justify-content:inherit}
  .fchip{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 12px 0 9px;border:1px solid #E4E4E1;border-radius:999px;background:#fff;color:#002554;font:500 13px/1 Inter,sans-serif}
  .fchip svg{width:16px;height:16px;fill:none;stroke:#5A7A5A;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
  .sides{display:inline-flex;margin:12px 0 2px;border:1px solid #002554;border-radius:999px;padding:3px;gap:2px;background:#fff}
  .sides button{height:32px;padding:0 16px;border-radius:999px;font:600 13px Inter,sans-serif;color:#002554;background:none;border:0;cursor:pointer}
  .sides button.is-on{background:#002554;color:#fff}
  .incl{display:flex;gap:8px;align-items:flex-start;margin:12px 0 0;padding:10px 12px;background:#F3F3F1;border-radius:8px;font:500 13px/1.45 Inter,sans-serif;color:#010F2B;text-align:left}
  .incl b{color:#002554}`;
  document.head.appendChild(css);

  function apply() {
    const h = new URLSearchParams(location.search).get('h');
    const p = K.find(h) || K.find(document.body.dataset.page === 'pdp' ? 'cobertor-texturelle-capri-malva' : 'toalla-grosso');
    if (!p) return;
    // v1 (Weezie): .pg-rail thumbs + .pg-slides ; v2 (Olipop): .gal-grid tiles + #feat
    const thumbs = [...document.querySelectorAll('.pg-rail [data-g], .gal-grid [data-gi]')];
    thumbs.forEach(b => { if (b.querySelector('.tlab')) return; const im = b.querySelector('img'); const l = view(im && (im.getAttribute('src') || '')); if (l) { b.style.position = 'relative'; b.insertAdjacentHTML('beforeend', `<span class="tlab">${l}</span>`); } });
    document.querySelectorAll('.pg-slides > img, .pg-slides > div, .pg-slides > figure').forEach(s => { if (s.querySelector && s.querySelector('.vlab')) return; const im = s.tagName === 'IMG' ? s : s.querySelector('img'); const l = view(im && im.getAttribute('src')); if (l && s.tagName !== 'IMG') { s.style.position = 'relative'; s.insertAdjacentHTML('beforeend', `<span class="vlab">${l}</span>`); } });
    const anchor = document.querySelector('.pi-price, #price');
    if (anchor && !document.querySelector('.fchips')) {
      const f = features(p);
      let html = f.length ? `<div class="fchips" aria-label="Características">${f.map(x => `<span class="fchip"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${x.path}"/></svg>${x.l}</span>`).join('')}</div>` : '';
      const fi = p.img.findIndex(u => view(u) === 'Frente'), ri = p.img.findIndex(u => view(u) === 'Reverso');
      if (fi > -1 && ri > -1) html += `<div class="sides" role="group" aria-label="Ver frente o reverso"><button class="is-on" data-side="${fi}">Frente</button><button data-side="${ri}">Reverso</button></div>`;
      const incl = (p.d || '').split('\n').find(l => /^(el set )?incluye/i.test(l));
      if (incl) html += `<div class="incl"><b>Incluye:</b> ${incl.replace(/^(el set )?incluye:?\s*/i, '')}</div>`;
      anchor.insertAdjacentHTML('afterend', html);
    }
  }
  // Frente/Reverso → jump gallery to that photo (works with both galleries)
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-side]'); if (!b) return;
    const h = new URLSearchParams(location.search).get('h'); const p = K.find(h) || K.find('cobertor-texturelle-capri-malva');
    const src = p.img[+b.dataset.side]; const key = src.split('/').pop();
    b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('is-on', x === b));
    const t = [...document.querySelectorAll('.pg-rail [data-g], .gal-grid [data-gi]')].find(x => (x.querySelector('img')?.getAttribute('src') || '').includes(key));
    if (t) t.click();
  });
  const root = document.getElementById('pdp');
  if (root) { new MutationObserver(() => { clearTimeout(root._t); root._t = setTimeout(apply, 30); }).observe(root, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(apply, 50)); else setTimeout(apply, 50);
})();
