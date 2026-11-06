/* Regina v2 — Olipop-structure shell + home + PDP renderers */
(function () {
  const K = window.RGK; const $ = (s, r) => (r || document).querySelector(s); const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const STORE = K.STORE;
  const VID = { 'cobertor-nuvo-loyal-laguna': 'nuvo-laguna', 'cobertor-boutique-bubble-onyx': 'boutique-onyx', 'cobertor-texturelle-capri-malva': 'texturelle-malva', 'toalla-grosso': 'toallas-grosso', 'set-de-cortinas-blackout-celine-black': 'cortina-celine', 'cobertor-baby-seduccion-osito-estrella': 'baby-osito' };
  const CATS = [
    { k: 'ultra', label: 'Ultra cálidos', menu: 'Cobertores ultra cálidos', col: 'cobertores-ultra-calidos', eb: 'Para las noches más frías del año', d: 'Nuvó, Boutique, Texturelle y Seducción: borrega, relieves y pelo alto para dormir calientito', lead: ['cobertor-boutique-bubble-onyx', 'cobertor-texturelle-capri-malva', 'cobertor-nuvo-loyal-laguna'] },
    { k: 'ligeros', label: 'Cobertores ligeros', menu: 'Cobertores ligeros', col: 'cobertor-ligero', eb: 'Calidez justa, sin peso', d: 'Regina 400 Plus+ y Regina 300: suaves, ligeros y con acabado Sensa Shine para cualquier momento del día', lead: ['cobertor-regina-400-plus-petalis'] },
    { k: 'edredones', label: 'Edredones', menu: 'Edredones', col: 'edredones-recamara', eb: 'Viste tu cama completa', d: 'Juegos con texturas jacquard, relieve 3D y bordados que incluyen fundas y cojín decorativo', lead: ['juego-de-edredon-majestic-3d-tessa-red'] },
    { k: 'bebe', label: 'Bebé', menu: 'Bebé', col: 'bebe', eb: 'Suavidad desde el primer día', d: 'Cobertores, sets y edre-cobertores para la cuna, con diseños tiernos y tacto extra suave', lead: ['cobertor-baby-seduccion-osito-estrella'] },
    { k: 'bano', label: 'Baño', menu: 'Toallas y batas', col: 'toallas-y-batas-de-bano', eb: 'Absorbencia que se nota en cada uso', d: 'Toallas Select jacquard 100% algodón y batas para empezar y terminar el día con suavidad', lead: ['toalla-grosso'] },
    { k: 'cortinas', label: 'Cortinas', menu: 'Cortinas', col: 'cortinas', eb: 'Para sala y recámara', d: 'Blackout, jacquard relieve 3D y translúcidas para controlar la luz y vestir tus ventanas', lead: ['set-de-cortinas-blackout-celine-black'] }
  ];
  const ico = {
    chev: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4l6 6-6 6"/></svg>',
    down: '<svg class="chev" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7l6 6 6-6"/></svg>',
    left: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4l-6 6 6 6"/></svg>',
    right: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4l6 6-6 6"/></svg>',
    bag: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 9h16l-1.2 13H6.2z"/><path d="M9 9V7a4 4 0 018 0v2"/></svg>',
    user: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="13" cy="9" r="4.5"/><path d="M4.5 22c1.2-4.2 4.5-6.2 8.5-6.2s7.3 2 8.5 6.2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    truck: '<svg viewBox="0 0 40 40"><path d="M4 11h20v16H4zM24 17h7l5 5v5H24z"/><circle cx="11" cy="29" r="3"/><circle cx="30" cy="29" r="3"/></svg>',
    card: '<svg viewBox="0 0 40 40"><rect x="5" y="10" width="30" height="20" rx="3"/><path d="M5 16h30M10 25h6"/></svg>',
    pin: '<svg viewBox="0 0 40 40"><path d="M20 35s11-10 11-18a11 11 0 00-22 0c0 8 11 18 11 18z"/><circle cx="20" cy="17" r="4"/></svg>',
    gift: '<svg viewBox="0 0 40 40"><rect x="7" y="16" width="26" height="18"/><path d="M5 11h30v5H5zM20 11v23M20 11c-3-5-9-5-9-1s9 1 9 1zm0 0c3-5 9-5 9-1s-9 1-9 1z"/></svg>',
    star: '<svg viewBox="0 0 72 72" aria-hidden="true"><path d="M36 2l5.6 6.3 8-2.9 2.6 8.1 8.4.8-.4 8.4 7.4 4-4 7.4 4 7.4-7.4 4 .4 8.4-8.4.8-2.6 8.1-8-2.9L36 70l-5.6-6.3-8 2.9-2.6-8.1-8.4-.8.4-8.4-7.4-4 4-7.4-4-7.4 7.4-4-.4-8.4 8.4-.8 2.6-8.1 8 2.9z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.4 6.4 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.4 1.3V6.5a4.5 4.5 0 0 1-4.4-4.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z"/></svg>'
  };

  const isNew = p => /majestic|solé|sole\b|micro bubble/i.test(p.ty + ' ' + p.t);
  const avail = p => p.v.some(v => v.a);
  const firstVar = p => p.v.find(v => v.a) || p.v[0];
  const lineName = p => p.ty || (/toalla/i.test(p.t) ? 'Toallas Select' : 'Regina');
  const priceHTML = p => {
    const ps = p.v.map(v => v.p); const mn = Math.min(...ps); const multi = new Set(ps).size > 1;
    const v = p.v.find(x => x.p === mn); return (v.c ? `<s>${K.money(v.c)}</s>` : '') + (multi ? 'Desde ' : '') + K.money(mn);
  };
  const pick = (col, lead, n) => {
    const base = K.RG.filter(p => p.cols.includes(col) && avail(p));
    const L = (lead || []).map(K.find).filter(p => p && avail(p));
    const rest = base.filter(p => !L.includes(p));
    rest.sort((a, b) => (isNew(b) - isNew(a)) || (b.img.length - a.img.length));
    return [...L, ...rest].slice(0, n || 12);
  };
  const card = (p, opt) => {
    const v = firstVar(p); const vid = VID[p.h]; const ok = avail(p);
    const alt = p.img[1] ? `<img class="alt" src="${K.img(p.img[1], 640)}" alt="" loading="lazy">` : '';
    return `<div class="pcard"${vid ? ' data-hovervid' : ''}>
      ${isNew(p) ? `<div class="badge">${ico.star}<span>Nuevo</span></div>` : ''}
      <a class="pcard-im" href="v2-product.html?h=${p.h}" aria-label="${p.t}">
        <img src="${K.img(p.img[0], 640)}" alt="${p.t}" loading="lazy">${alt}
        ${vid ? `<video muted loop playsinline preload="none" data-src="media/vid/${vid}-s.mp4" poster="media/vid/${vid}.jpg" oncanplay="this.classList.add('is-ready')"></video>` : ''}
      </a>
      ${ok ? `<button class="pcard-qa" data-add="${p.h}" data-vid="${v.id}">Agregar ${v.t !== 'Default Title' ? '· ' + v.t.split(' - ')[0] : 'al carrito'}</button>` : ''}
      <div class="pcard-tx">
        <div class="pcard-line">${lineName(p)}</div>
        <a class="pcard-name" href="v2-product.html?h=${p.h}">${p.t}</a>
        <div class="pcard-pr">${ok ? priceHTML(p) : 'Agotado'}</div>
        ${ok ? `<button class="pcard-mqa" data-add="${p.h}" data-vid="${v.id}">Agregar</button>` : ''}
      </div>
    </div>`;
  };

  /* ---------- drag-to-scroll for tracks ---------- */
  function dragTrack(t) {
    let down = false, sx = 0, sl = 0, moved = false;
    t.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = t.scrollLeft; });
    window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) { moved = true; t.classList.add('is-drag'); } t.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', () => { if (!down) return; down = false; t.classList.remove('is-drag'); });
    t.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  }

  /* ---------- shell ---------- */
  function shell() {
    const top = document.getElementById('shell-top');
    top.outerHTML = `
    <a class="sr" href="#main">Saltar al contenido</a>
    <div class="hdr-group">
      <div class="ann" role="region" aria-label="Anuncios">
        <div class="ann-track">
          <div class="ann-slide"><span>Envío gratis en pedidos superiores a $1,499</span><span class="dot">·</span><a href="#coleccion">Comprar ahora</a></div>
          <div class="ann-slide"><span>3 meses sin intereses</span><span class="dot">·</span><span>Entregas a todo México</span></div>
          <div class="ann-slide"><span>10% de descuento en tu primera compra</span><span class="dot">·</span><a href="#newsletter">Suscríbete</a></div>
        </div>
        <button class="ann-arrow ann-prev" aria-label="Anuncio anterior">${ico.left}</button>
        <button class="ann-arrow ann-next" aria-label="Siguiente anuncio">${ico.right}</button>
      </div>
      <header class="hdr" style="position:relative">
        <div class="hdr-in">
          <div class="hdr-mob"><button class="icon-btn" data-mnav aria-label="Abrir menú" aria-expanded="false">${ico.menu}</button></div>
          <nav class="hdr-l" aria-label="Principal">
            <button data-mega="shop" aria-expanded="false">Tienda</button>
            <button data-mega="learn" aria-expanded="false">Descubre</button>
            <a href="v2.html#lineas">Calidez</a>
          </nav>
          <a class="hdr-logo" href="v2.html" aria-label="Regina, inicio"><img src="media/brand/logo.svg" alt="Regina" width="121" height="40"></a>
          <div class="hdr-r">
            <a class="txt" href="${STORE}/pages/contacto">Contacto</a>
            <a class="icon-btn" href="${STORE}/account" aria-label="Mi cuenta">${ico.user}</a>
            <button class="icon-btn" data-cart-open aria-label="Abrir carrito">${ico.bag}<span class="cart-dot" data-count hidden>0</span></button>
          </div>
        </div>
        <div class="mega" id="mega-shop" data-panel="shop">
          <div class="mega-shop">
            <aside class="mega-rail">
              ${CATS.map((c, i) => `<button class="mega-row${i ? '' : ' is-active'}" data-cat="${c.k}">${c.menu}${ico.chev}</button>`).join('')}
              <a class="btn" href="${STORE}/collections/todos-los-productos">Ver todo</a>
            </aside>
            ${CATS.map((c, i) => `<div class="mega-panel${i ? '' : ' is-active'}" data-catp="${c.k}">
              <div class="mega-sub"><div><h2>${c.menu}</h2><p class="eyebrow">${c.eb}</p><p>${c.d}</p></div>
              <div class="mega-sub-r"><a class="btn-sm" href="${STORE}/collections/${c.col}">Ver ${c.label.toLowerCase()}</a><button class="arrow-btn" data-scroll="-1" aria-label="Anterior">${ico.left}</button><button class="arrow-btn" data-scroll="1" aria-label="Siguiente">${ico.right}</button></div></div>
              <div class="mega-tiles">${pick(c.col, c.lead, 14).map(p => `<a class="mtile" href="v2-product.html?h=${p.h}">${isNew(p) ? `<div class="badge" style="width:56px;height:56px;top:8px;right:0;font-size:11px">${ico.star}<span>Nuevo</span></div>` : ''}<div class="im"><img src="${K.img(p.img[0], 260)}" alt="" loading="lazy"></div><span>${K.shortName(p)}</span></a>`).join('')}</div>
            </div>`).join('')}
          </div>
        </div>
        <div class="mega mega-learn-wrap" id="mega-learn" data-panel="learn">
          <div class="mega-learn">
            <a class="lcard" href="${STORE}/pages/nuestra-historia"><div class="im"><img src="media/photo/majestic-tessa-red-frontal.jpg" alt="" loading="lazy"></div><b>Nuestra historia</b></a>
            <a class="lcard" href="v2.html#lineas"><div class="im"><img src="media/vid/boutique-onyx.jpg" alt="" loading="lazy"></div><b>Elige tu calidez</b></a>
            <a class="lcard" href="v2-product.html?h=juego-de-edredon-majestic-3d-tessa-red"><div class="im"><img src="media/photo/majestic-tessa-red-acercamiento-lateral.jpg" alt="" loading="lazy"></div><b>Texturas jacquard 3D</b></a>
            <a class="lcard" href="v2-product.html?h=cobertor-baby-seduccion-osito-estrella"><div class="im"><img src="media/vid/baby-osito.jpg" alt="" loading="lazy"></div><b>Regina Baby</b></a>
          </div>
        </div>
      </header>
    </div>
    <div class="mega-scrim"></div>
    <nav class="mnav" id="mnav" aria-label="Menú móvil" hidden>
      <div class="mnav-tabs" role="tablist"><button class="is-active" data-mtab="shop" role="tab">Tienda</button><button data-mtab="learn" role="tab">Descubre</button></div>
      <div class="mnav-pane is-active" data-mpane="shop">
        ${CATS.map((c, i) => `<div class="macc${i ? '' : ' is-open'}"><button aria-expanded="${!i}">${c.menu}${ico.down}</button><div class="macc-body"><p class="eyebrow">${c.eb}</p><p>${c.d}</p><div class="macc-scroll">${pick(c.col, c.lead, 8).map(p => `<a href="v2-product.html?h=${p.h}"><img src="${K.img(p.img[0], 200)}" alt="" loading="lazy">${K.shortName(p)}</a>`).join('')}</div><a class="btn-sm" href="${STORE}/collections/${c.col}">Ver ${c.label.toLowerCase()}</a></div></div>`).join('')}
      </div>
      <div class="mnav-pane" data-mpane="learn">
        <div class="macc"><a href="${STORE}/pages/nuestra-historia" style="display:block;padding:18px 0;font:600 21px var(--fd);color:var(--navy2)">Nuestra historia</a></div>
        <div class="macc"><a href="v2.html#lineas" style="display:block;padding:18px 0;font:600 21px var(--fd);color:var(--navy2)">Elige tu calidez</a></div>
        <div class="macc"><a href="v2-product.html?h=juego-de-edredon-majestic-3d-tessa-red" style="display:block;padding:18px 0;font:600 21px var(--fd);color:var(--navy2)">Texturas jacquard 3D</a></div>
      </div>
      <a class="btn" href="${STORE}/collections/todos-los-productos">Ver todo</a>
      <div class="mlinks"><a href="${STORE}/pages/contacto">Contacto</a><a href="${STORE}/account">Mi cuenta</a><a href="tel:+524491842835">+52 449 184 2835</a><a href="mailto:contacto@regina.com.mx">contacto@regina.com.mx</a></div>
    </nav>`;

    const bot = document.getElementById('shell-bot');
    bot.outerHTML = `
    <div class="wave" aria-hidden="true"></div>
    <footer class="ftr" id="newsletter">
      <div class="ftr-in">
        <div class="ftr-top">
          <div class="ftr-news">
            <h3>Suscríbete y recibe 10% en tu primera compra</h3>
            <form class="nl" novalidate><label class="sr" for="nl-e">Correo electrónico</label><input id="nl-e" type="email" placeholder="Tu correo electrónico" required><button class="btn btn--light" type="submit">Suscribirme</button></form>
            <p class="nl-ok" hidden>¡Listo! Revisa tu correo para recibir tu código</p>
            <div class="social">${[['Instagram','https://www.instagram.com/regina.mxoficial/',ico.ig],['Facebook','https://www.facebook.com/regina.mxoficial',ico.fb],['TikTok','https://www.tiktok.com/@regina.mxoficial',ico.tt],['WhatsApp','https://wa.me/524491842835',ico.wa],['Correo','mailto:contacto@regina.com.mx',ico.mail]].map(([n, u, i]) => `<a href="${u}" aria-label="${n}" target="_blank" rel="noopener">${i}</a>`).join('')}</div>
          </div>
          <div class="ftr-cols">
            <div class="fcol"><h3>Tienda</h3>${CATS.map(c => `<a href="${STORE}/collections/${c.col}">${c.menu}</a>`).join('')}</div>
            <div class="fcol"><h3>Ayuda</h3><a href="${STORE}/pages/contacto">Contáctanos</a><a href="${STORE}/policies/privacy-policy">Aviso de privacidad</a><a href="${STORE}/policies/terms-of-service">Términos y condiciones</a><a href="${STORE}/policies/refund-policy">Política de devolución</a><a href="tel:+524491842835">+52 449 184 2835</a><a href="mailto:contacto@regina.com.mx">contacto@regina.com.mx</a></div>
          </div>
        </div>
        <div class="ftr-seal"><img src="media/brand/amvo-s.png" alt="Sello AMVO" loading="lazy"><span>Compra segura · Pagos protegidos</span></div>
        <div class="ftr-bot"><span>© 2026 Regina. Todos los derechos reservados</span><nav><a href="${STORE}/policies/privacy-policy">Privacidad</a><a href="${STORE}/policies/terms-of-service">Términos</a><a href="${STORE}/pages/nuestra-historia">Nuestra historia</a></nav></div>
      </div>
    </footer>
    <div class="cart" data-cart aria-hidden="true">
      <div class="cart-scrim" data-cart-close></div>
      <aside class="cart-p" role="dialog" aria-modal="true" aria-label="Tu carrito">
        <div class="cart-h"><h2>Tu carrito (<span data-cart-count>0</span>)</h2><button class="cart-x" data-cart-close aria-label="Cerrar carrito">×</button></div>
        <div class="cart-ship"><div data-cart-ship></div><div class="meter"><i data-cart-bar></i></div></div>
        <div class="cart-body">
          <div data-cart-lines></div>
          <div class="cart-up" data-cart-upwrap><div class="cart-up-h"><h3>Completa tu descanso</h3><div style="display:flex;gap:6px"><button class="arrow-btn" style="width:28px;height:28px" data-upscroll="-1" aria-label="Anterior">${ico.left}</button><button class="arrow-btn" style="width:28px;height:28px" data-upscroll="1" aria-label="Siguiente">${ico.right}</button></div></div><div class="cart-up-track" data-cart-up></div></div>
        </div>
        <div class="cart-f" data-cart-foot><div class="row"><span>Subtotal</span><span data-cart-sub>$0</span></div><button class="btn" data-checkout>Finalizar compra</button><small>3 meses sin intereses · Entregas a todo México</small></div>
      </aside>
    </div>`;
    K.Cart.upsell = ['toalla-grosso', 'cobertor-regina-400-plus-petalis', 'cobertor-baby-seduccion-osito-estrella', 'set-de-cortinas-blackout-celine-black', 'cobertor-texturelle-capri-malva', 'cobertor-boutique-bubble-onyx'];

    // announcement slider (manual, like Olipop)
    let ai = 0; const at = $('.ann-track'); const n = $$('.ann-slide').length;
    const go = d => { ai = (ai + d + n) % n; at.style.transform = `translateX(${-100 * ai}%)`; };
    $('.ann-prev').onclick = () => go(-1); $('.ann-next').onclick = () => go(1);

    // header shadow
    const hdr = $('.hdr'); addEventListener('scroll', () => hdr.classList.toggle('is-active', scrollY > 10), { passive: true });

    // mega menus (hover + click + keyboard)
    const scrim = $('.mega-scrim'); let timer;
    const openMega = k => { clearTimeout(timer); $$('.mega').forEach(m => m.classList.toggle('is-open', m.dataset.panel === k)); $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', b.dataset.mega === k)); scrim.classList.toggle('is-open', !!k); };
    const closeSoon = () => { timer = setTimeout(() => openMega(null), 120); };
    $$('[data-mega]').forEach(b => { b.addEventListener('mouseenter', () => openMega(b.dataset.mega)); b.addEventListener('click', () => openMega(b.getAttribute('aria-expanded') === 'true' ? null : b.dataset.mega)); b.addEventListener('mouseleave', closeSoon); });
    $$('.mega').forEach(m => { m.addEventListener('mouseenter', () => clearTimeout(timer)); m.addEventListener('mouseleave', closeSoon); });
    scrim.addEventListener('click', () => openMega(null));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') openMega(null); });
    $$('.mega-row').forEach(r => { const on = () => { $$('.mega-row').forEach(x => x.classList.toggle('is-active', x === r)); $$('.mega-panel').forEach(p => p.classList.toggle('is-active', p.dataset.catp === r.dataset.cat)); }; r.addEventListener('mouseenter', on); r.addEventListener('focus', on); r.addEventListener('click', on); });
    $$('.mega-panel').forEach(p => { const t = $('.mega-tiles', p); dragTrack(t); $$('[data-scroll]', p).forEach(b => b.onclick = () => t.scrollBy({ left: +b.dataset.scroll * 412, behavior: 'smooth' })); });

    // mobile nav
    const mn = $('#mnav'); const mb = $('[data-mnav]');
    mb.onclick = () => { const o = !mn.classList.contains('is-open'); if (o) mn.hidden = false; requestAnimationFrame(() => mn.classList.toggle('is-open', o)); mb.setAttribute('aria-expanded', o); document.documentElement.classList.toggle('rg-lock', o); if (!o) setTimeout(() => { if (!mn.classList.contains('is-open')) mn.hidden = true; }, 320); };
    $$('[data-mtab]').forEach(b => b.onclick = () => { $$('[data-mtab]').forEach(x => x.classList.toggle('is-active', x === b)); $$('[data-mpane]').forEach(p => p.classList.toggle('is-active', p.dataset.mpane === b.dataset.mtab)); });
    $$('.macc>button').forEach(b => b.onclick = () => { const a = b.parentElement; const o = !a.classList.contains('is-open'); a.classList.toggle('is-open', o); b.setAttribute('aria-expanded', o); });
    mn.addEventListener('click', e => { if (e.target.closest('a[href^="v2"]')) mb.click(); });

    // cart upsell arrows
    document.addEventListener('click', e => { const b = e.target.closest('[data-upscroll]'); if (b) $('[data-cart-up]').scrollBy({ left: +b.dataset.upscroll * 304, behavior: 'smooth' }); });
    // newsletter (local capture, same as Regina's 10% signup)
    $('.nl').addEventListener('submit', e => { e.preventDefault(); const i = $('#nl-e'); if (!/\S+@\S+\.\S+/.test(i.value)) { i.focus(); return; } try { localStorage.setItem('regina-news', i.value); } catch (er) {} $('.nl-ok').hidden = false; i.value = ''; });
  }

  /* ---------- home ---------- */
  function home() {
    // collections tabs
    const chips = $('#chips'), subs = $('#coll-subs'), panels = $('#coll-panels');
    chips.innerHTML = CATS.map((c, i) => `<button class="chip${i ? '' : ' is-active'}" data-tab="${c.k}" role="tab" aria-selected="${!i}">${c.label}</button>`).join('');
    subs.innerHTML = CATS.map((c, i) => `<p class="eyebrow${i ? '' : ' is-active'}" data-sub="${c.k}">${c.eb}</p>`).join('');
    panels.innerHTML = CATS.map((c, i) => `<div class="coll-panel${i ? '' : ' is-active'}" data-tabp="${c.k}" role="tabpanel"><div class="track">${pick(c.col, c.lead, 12).map(card).join('')}</div></div>`).join('');
    $$('[data-tab]', chips).forEach(b => b.onclick = () => { const k = b.dataset.tab; $$('[data-tab]').forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); }); $$('[data-sub]').forEach(x => x.classList.toggle('is-active', x.dataset.sub === k)); $$('[data-tabp]').forEach(x => x.classList.toggle('is-active', x.dataset.tabp === k)); });
    $$('.track').forEach(dragTrack);

    // brand-lines slider (press slider structure; quotes are Regina's own published copy)
    const Q = [
      { tab: 'Nuestra historia', q: 'Hay personas que usaron cobertores Regina desde su cuna y que hoy los eligen para la cama de sus propios hijos', s: 'regina.com.mx · Nuestra historia' },
      { tab: 'Boutique', q: 'Máxima calidez, estilo incomparable', s: 'Edre-cobertor Boutique Bubble Onyx', h: 'cobertor-boutique-bubble-onyx' },
      { tab: 'Texturelle', q: 'La armonía perfecta entre un sofisticado diseño degradado y una exquisita textura jacquard', s: 'Edre-cobertor Texturelle', h: 'cobertor-texturelle-capri-malva' },
      { tab: 'Regina 400 Plus+', q: 'Calor justo y una sensación súper rica sin ser pesado', s: 'Cobertor Regina 400 Plus+', h: 'cobertor-regina-400-plus-petalis' }
    ];
    const pt = $('#press-tabs'), pq = $('#press-q'), pd = $('#press-dots');
    pt.innerHTML = Q.map((x, i) => `<button class="${i ? '' : 'is-active'}" data-pi="${i}">${x.tab}</button>`).join('');
    pq.innerHTML = Q.map((x, i) => `<h4 class="${i ? '' : 'is-active'}" aria-hidden="${!!i}">“${x.q}”<small>${x.h ? `<a href="v2-product.html?h=${x.h}" style="text-decoration:underline">${x.s}</a>` : x.s}</small></h4>`).join('');
    pd.innerHTML = Q.map((x, i) => `<button class="${i ? '' : 'is-active'}" data-pi="${i}" aria-label="Frase ${i + 1}"></button>`).join('');
    let pi = 0; const setP = i => { pi = (i + Q.length) % Q.length; $$('[data-pi]').forEach(b => b.classList.toggle('is-active', +b.dataset.pi === pi)); $$('#press-q h4').forEach((h, j) => { h.classList.toggle('is-active', j === pi); h.setAttribute('aria-hidden', j !== pi); }); };
    document.addEventListener('click', e => { const b = e.target.closest('[data-pi]'); if (b) setP(+b.dataset.pi); });
    let tx = 0; pq.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true }); pq.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 40) setP(pi + (d < 0 ? 1 : -1)); });
  }

  /* ---------- PDP ---------- */
  function pdp() {
    const h = new URLSearchParams(location.search).get('h') || 'cobertor-texturelle-capri-malva';
    const p = K.find(h) || K.find('cobertor-texturelle-capri-malva');
    document.title = p.t + ' · Regina';
    const siblings = K.RG.filter(x => x.ty && x.ty === p.ty).slice(0, 30);
    // options: color (if product has a color option) + size
    const hasColor = p.o.length > 1 || /color/i.test(p.o[0] || '');
    const parts = v => v.t.split(' / ');
    const colors = hasColor && p.o.length > 1 ? [...new Set(p.v.map(v => parts(v)[0]))] : null;
    const sizeOf = v => colors ? parts(v).slice(1).join(' / ') : v.t;
    let cur = firstVar(p); let qty = 1; let plan = 'contado';
    const vid = VID[p.h];
    const dsc = p.d.split('\n'); const lead = dsc[0]; const firstSentence = (lead.match(/^[^.!?]+/) || [lead])[0].replace(/^Edre-Cobertor[^:]*:\s*/i, '');
    const incl = dsc.filter(l => /^incluye|el set incluye/i.test(l)).join('\n');
    const descBody = dsc.filter(l => !/^incluye|el set incluye/i.test(l)).join('\n');
    const imgs = p.img;
    const el = $('#pdp');
    el.innerHTML = `
      <div class="gal">
        <div class="gal-feat" id="feat">${vid ? `<video autoplay muted loop playsinline poster="media/vid/${vid}.jpg" data-inview><source src="media/vid/${vid}.mp4" type="video/mp4"></video>` : `<img src="${K.img(imgs[0], 1200)}" alt="${p.t}">`}
          <div class="gal-pill">${lineName(p)} · ${p.v.length > 1 ? p.v.length + ' opciones' : sizeOf(cur)}</div></div>
        <div class="gal-grid">${imgs.map((src, i) => `<button class="${i > 3 ? 'is-hidden' : ''}" data-gi="${i}" aria-label="Ver imagen ${i + 1}"><img src="${K.img(src, 700)}" alt="${p.t} vista ${i + 1}" loading="lazy"></button>`).join('')}</div>
        ${imgs.length > 4 ? '<button class="gal-more">Ver todas</button>' : ''}
      </div>
      <div class="buy">
        <a class="buy-line" href="${STORE}/collections/${(p.cols[0] || 'todos-los-productos')}">${lineName(p)}</a>
        <h1>${p.t}</h1>
        <p class="buy-tag">${firstSentence}</p>
        <div class="buy-price" id="price"></div>
        ${siblings.length > 1 ? `<div class="buy-lab">Diseño: <b>${K.shortName(p)}</b></div>
        <details class="dd"><summary><img class="swatch" src="${K.img(imgs[0], 80)}" alt="">${K.shortName(p)}${ico.down}</summary>
          <div class="dd-list">${siblings.map(s => `<a href="v2-product.html?h=${s.h}" class="${s.h === p.h ? 'is-cur' : ''}"><img class="swatch" src="${K.img(s.img[0], 80)}" alt="">${K.shortName(s)}${!avail(s) ? '<span class="tag">Agotado</span>' : isNew(s) ? '<span class="tag">Nuevo</span>' : ''}</a>`).join('')}</div></details>` : ''}
        ${colors ? `<div class="buy-lab">Color: <b id="colLab"></b></div><div class="pills" id="colPills">${colors.map(c => `<button class="pill" data-col="${c}">${c}</button>`).join('')}</div>` : ''}
        ${p.v.length > 1 || cur.t !== 'Default Title' ? `<div class="buy-lab">Medida: <b id="sizeLab"></b></div><div class="pills" id="sizePills"></div>` : ''}
        <div class="buy-lab">Forma de pago: <b id="planLab">De contado</b></div>
        <div class="plan" id="plan">
          <label class="is-active"><input type="radio" name="plan" value="contado" checked><span>De contado<small>Pago único con tarjeta y más métodos</small></span><span class="r" id="pC"></span></label>
          <label><input type="radio" name="plan" value="msi"><span>3 meses sin intereses<small>Con tarjetas participantes en el pago seguro</small></span><span class="r" id="pM"></span></label>
        </div>
        <div class="atc"><div class="qbig"><button aria-label="Menos" id="qm">−</button><span id="qv">1</span><button aria-label="Más" id="qp">+</button></div><button class="btn" id="atc">Agregar al carrito</button></div>
        <div class="buy-note">${ico.truck.replace('<svg', '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"')}<span id="shipNote"></span></div>
        <div class="xsell"><img src="media/vid/toallas-grosso.jpg" alt="" loading="lazy"><div><h4>¿Completas tu descanso?</h4><a class="btn-sm" href="v2-product.html?h=toalla-grosso">Ver toallas Select</a></div></div>
        <div class="xswitch">¿Buscas más calidez o algo más ligero? Mira <a href="${STORE}/collections/cobertores-ultra-calidos">ultra cálidos</a> o <a href="${STORE}/collections/cobertor-ligero">cobertores ligeros</a></div>
      </div>`;
    // gallery
    const feat = $('#feat');
    $$('[data-gi]').forEach(b => b.onclick = () => { $$('[data-gi]').forEach(x => x.classList.toggle('is-active', x === b)); const old = feat.querySelector('img,video'); const im = document.createElement('img'); im.src = K.img(imgs[+b.dataset.gi], 1200); im.alt = p.t; old.replaceWith(im); feat.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
    const more = $('.gal-more'); if (more) more.onclick = () => { $$('.gal-grid .is-hidden').forEach(x => x.classList.remove('is-hidden')); more.remove(); };
    // variant UI
    function render() {
      const pr = cur.p * qty;
      $('#price').innerHTML = K.money(cur.p) + (cur.c ? `<s>${K.money(cur.c)}</s>` : '');
      $('#pC').innerHTML = K.money(pr); $('#pM').innerHTML = `${K.money(pr / 3)}<s style="text-decoration:none">x 3 meses</s>`;
      $('#qv').textContent = qty;
      const left = K.FREE_SHIP - (K.subtotal() + pr);
      $('#shipNote').textContent = left > 0 ? `Te faltan ${K.money(left)} para envío gratis` : 'Este pedido tiene envío gratis';
      const atc = $('#atc'); atc.disabled = !cur.a; atc.textContent = cur.a ? `Agregar al carrito · ${K.money(pr)}` : 'Agotado'; atc.style.opacity = cur.a ? 1 : .5;
      if (colors) { const c = parts(cur)[0]; $('#colLab').textContent = c; $$('[data-col]').forEach(b => b.classList.toggle('is-active', b.dataset.col === c)); }
      const sp = $('#sizePills');
      if (sp) {
        const pool = colors ? p.v.filter(v => parts(v)[0] === parts(cur)[0]) : p.v;
        sp.innerHTML = pool.map(v => `<button class="pill${v.id === cur.id ? ' is-active' : ''}" data-v="${v.id}" ${v.a ? '' : 'disabled'}>${sizeOf(v).split(' - ')[0]}</button>`).join('');
        $('#sizeLab').textContent = sizeOf(cur);
        $$('[data-v]', sp).forEach(b => b.onclick = () => { cur = p.v.find(v => v.id == b.dataset.v); render(); });
      }
      $('#stk-p') && ($('#stk-p').textContent = `${sizeOf(cur) === 'Default Title' ? '' : sizeOf(cur).split(' - ')[0] + ' · '}${K.money(cur.p)}`);
    }
    if (colors) $$('[data-col]').forEach(b => b.onclick = () => { const sz = sizeOf(cur); cur = p.v.find(v => parts(v)[0] === b.dataset.col && sizeOf(v) === sz) || p.v.find(v => parts(v)[0] === b.dataset.col); render(); });
    $$('#plan input').forEach(i => i.onchange = () => { plan = i.value; $$('#plan label').forEach(l => l.classList.toggle('is-active', l.contains(i))); $('#planLab').textContent = plan === 'msi' ? '3 meses sin intereses' : 'De contado'; });
    $('#qm').onclick = () => { qty = Math.max(1, qty - 1); render(); }; $('#qp').onclick = () => { qty++; render(); };
    $('#atc').onclick = () => { if (cur.a) K.add(p.h, cur.id, qty); };
    document.addEventListener('click', e => { const d = $('.dd'); if (d && d.open && !d.contains(e.target)) d.open = false; });

    // details band (ingredients-band structure)
    $('#ing').innerHTML = `
      <div class="ing-l"><h3>${K.shortName(p)}</h3><p class="eyebrow">${lineName(p)}</p>
        <p>${descBody}</p>${incl ? `<p><b>Qué incluye:</b> ${incl.replace(/^(el set )?incluye:?\s*/i, '')}</p>` : ''}
        <p><b>Envío:</b> entregas a todo México · gratis en pedidos superiores a $1,499</p></div>
      <div class="facts" aria-label="Ficha del producto"><h5>Ficha del producto</h5>
        <div class="r big"><b>Línea</b><span>${lineName(p)}</span></div>
        ${[...new Map(p.v.map(v => [sizeOf(v), v])).values()].map(v => `<div class="r"><b>${sizeOf(v).split(' - ')[0] === 'Default Title' ? 'Medida' : sizeOf(v).split(' - ')[0]}</b><span>${(sizeOf(v).split(' - ')[1] || '') || K.money(v.p)}</span></div>`).join('')}${colors ? `<div class="r"><b>Colores</b><span>${colors.join(', ')}</span></div>` : ''}
        <small>Precios en MXN, IVA incluido. Disponibilidad según existencias en regina.com.mx</small></div>`;
    // bottom hero
    const hero = $('#pdp-hero');
    const life = imgs[2] || imgs[1] || imgs[0];
    hero.innerHTML = `<img src="${K.img(life, 1800)}" alt="${p.t} en ambiente" loading="lazy">`;
    // recommendations
    const recs = K.RG.filter(x => x.h !== p.h && avail(x) && x.cols.some(c => p.cols.includes(c))).sort((a, b) => (isNew(b) - isNew(a)) || (b.img.length - a.img.length)).slice(0, 4);
    $('#love').innerHTML = recs.map(card).join('');
    K.Cart.upsell = recs.map(r => r.h).concat(K.Cart.upsell || []);
    // sticky ATC (mobile + when buy box scrolls away)
    const st = $('#sticky');
    st.innerHTML = `<img src="${K.img(imgs[0], 120)}" alt=""><div>${p.t}<small id="stk-p"></small></div><button class="btn" style="height:44px;padding:0 22px" id="stk">Agregar</button>`;
    $('#stk').onclick = () => $('#atc').click();
    const io = new IntersectionObserver(([en]) => st.classList.toggle('is-on', !en.isIntersecting && en.boundingClientRect.top < 0), { threshold: 0 });
    io.observe($('#atc'));
    render();
    document.addEventListener('regina:cart', render);
  }

  document.addEventListener('DOMContentLoaded', () => {
    shell();
    if (document.body.dataset.page === 'home') home();
    if (document.body.dataset.page === 'pdp') pdp();
    // core.js binds the drawer on DOMContentLoaded before this ran in some orders — rebind
    K.Cart.el = document.querySelector('[data-cart]'); K.Cart.render();
    document.querySelectorAll('[data-count]').forEach(n => { n.textContent = K.count(); n.hidden = !K.count(); });
    // in-view autoplay for videos created after core's observer
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (RM) return; en.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .2 });
    $$('video[data-inview]').forEach(v => io.observe(v));
  });
})();
