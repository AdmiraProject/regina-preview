/* Regina v1 — Weezie-structure shell + home + PDP. Real Regina data only (window.RG via core.js RGK). */
(function () {
  const K = window.RGK; if (!K) return;
  const RG = K.RG;
  const SITE = 'https://www.regina.com.mx';
  const col = h => SITE + '/collections/' + h;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const avail = p => p && p.v.some(v => v.a);
  const RM = matchMedia('(prefers-reduced-motion: reduce)');

  // Product loops (animated from the real product photos)
  const VID = {
    'cobertor-nuvo-loyal-laguna': 'nuvo-laguna', 'cobertor-boutique-bubble-onyx': 'boutique-onyx',
    'cobertor-texturelle-capri-malva': 'texturelle-malva', 'toalla-grosso': 'toallas-grosso',
    'set-de-cortinas-blackout-celine-black': 'cortina-celine', 'cobertor-baby-seduccion-osito-estrella': 'baby-osito'
  };

  const I = {
    search: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8.5" cy="8.5" r="6.5"/><path d="m13.5 13.5 5 5"/></svg>',
    user: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="6.5" r="4"/><path d="M2.5 19c.8-4 3.8-6 7.5-6s6.7 2 7.5 6"/></svg>',
    bag: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6.5h13l-1 12h-11z"/><path d="M7 8V5a3 3 0 0 1 6 0v3"/></svg>',
    menu: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 5h16M2 10h16M2 15h16"/></svg>',
    left: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10.5 2.5 5 8l5.5 5.5"/></svg>',
    right: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5.5 2.5 11 8l-5.5 5.5"/></svg>',
    caret: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m2.5 5 4.5 4.5L11.5 5"/></svg>',
    arrow: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 6h10M7 2l4 4-4 4"/></svg>',
    pause: '<svg viewBox="0 0 14 14" fill="currentColor"><rect x="3" y="2" width="3" height="10"/><rect x="8" y="2" width="3" height="10"/></svg>',
    play: '<svg viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z"/></svg>',
    truck: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1 3.5h9v8H1zM10 6h3l2 2.5v3h-5"/><circle cx="4" cy="12.5" r="1.3"/><circle cx="12" cy="12.5" r="1.3"/></svg>',
    card: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6.5h14"/></svg>',
    pin: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.2 1.8 3.6 4 3.8v3.1c-1.5.1-2.8-.4-4-1.2v6.1c0 3.7-3 5.7-5.9 5.7a5.6 5.6 0 0 1-5.6-5.6c0-3.6 3.3-6.1 6.8-5.4v3.2c-1.6-.5-3.6.4-3.6 2.3 0 1.4 1.1 2.4 2.4 2.4 1.5 0 2.5-1 2.5-2.9V3z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5zm5.5 13.4c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.4 8.6L23 12l-8.6 2.4L12 23l-2.4-8.6L1 12l8.6-2.4z"/></svg>'
  };
  const SOCIAL = [
    ['Instagram', 'https://www.instagram.com/regina.mxoficial/', I.ig],
    ['Facebook', 'https://www.facebook.com/regina.mxoficial', I.fb],
    ['TikTok', 'https://www.tiktok.com/@regina.mxoficial', I.tt],
    ['WhatsApp', 'https://wa.me/524491842835', I.wa],
    ['Correo', 'mailto:contacto@regina.com.mx', I.mail]
  ];

  // first image of the first available products in a collection — real product photography for menu cards
  const colImgs = (c, n) => K.inCol(c, n || 2).map(p => ({ src: K.img(p.img[0], 700), p }));

  const NAV = [
    { l: 'Invierno', season: 1, c: 'preparate-para-el-invierno', links: [['Cobertores ultra cálidos', 'cobertores-ultra-calidos'], ['Cobertores calientitos para bebé', 'cobertores-calientitos-bebe'], ['Sábanas Polaris', 'sabanas-polaris'], ['Batas de descanso', 'batas-de-descanso'], ['Ver todo invierno', 'preparate-para-el-invierno']], cards: [['Cobertores ultra cálidos', 'cobertores-ultra-calidos'], ['Sábanas Polaris', 'sabanas-polaris']] },
    { l: 'Recámara', c: 'recamara', links: [['Edredones', 'edredones-recamara'], ['Cobertores ligeros', 'cobertor-ligero'], ['Cobertores ultra cálidos', 'cobertores-ultra-calidos'], ['Colección Nuvó', 'edre-cobertores-nuvo'], ['Colección Boutique', 'edre-cobertores-boutique'], ['Regina 400 Plus+', 'regina-400-plus'], ['Seducción', 'cobertores-seduccion'], ['Sábanas Polaris', 'sabanas-polaris'], ['Batas de descanso', 'batas-de-descanso'], ['Ver toda la recámara', 'recamara']], cards: [['Colección Nuvó', 'edre-cobertores-nuvo'], ['Colección Boutique', 'edre-cobertores-boutique']] },
    { l: 'Cobertores', c: 'cobertores', links: [['Cobertores ultra cálidos', 'cobertores-ultra-calidos'], ['Cobertores ligeros', 'cobertor-ligero'], ['Colección Nuvó', 'edre-cobertores-nuvo'], ['Colección Boutique', 'edre-cobertores-boutique'], ['Seducción', 'cobertores-seduccion'], ['Regina 400 Plus+', 'regina-400-plus'], ['Ver todos los cobertores', 'cobertores']], cards: [['Seducción', 'cobertores-seduccion'], ['Regina 400 Plus+', 'regina-400-plus']] },
    { l: 'Edredones', c: 'edredones', links: [['Edredones para recámara', 'edredones-recamara'], ['Set de Edredón Ligero Doble Vista', 'set-de-edredon-ligero-doble-vista'], ['Set de Edredón Relieve Soft Washed', 'set-de-edredon-relieve-soft-washed'], ['Set de Edredón Borda-Tech', 'edredon-borda-tech'], ['Ver todos los edredones', 'edredones']], cards: [['Edredones para recámara', 'edredones-recamara'], ['Doble Vista', 'set-de-edredon-ligero-doble-vista']] },
    { l: 'Bebé', c: 'bebe', links: [['Sets de bebé', 'set-cobertor-almohadita-bebe'], ['Cobertor calientito para bebé', 'cobertores-calientitos-bebe'], ['Cobertor ligero para bebé', 'cobertor-ligero-bebe'], ['Baby Seducción', 'baby-seduccion'], ['Bautizo', 'cobertor-bebe-mi-bautizo'], ['Ver todo bebé', 'bebe']], cards: [['Baby Seducción', 'baby-seduccion'], ['Sets de bebé', 'set-cobertor-almohadita-bebe']] },
    { l: 'Baño', c: 'bano', links: [['Toallas', 'toallas'], ['Batas de baño', 'bata-de-bano'], ['Ver todo baño', 'bano']], cards: [['Toallas', 'toallas'], ['Toallas y batas', 'toallas-y-batas-de-bano']] },
    { l: 'Cortinas', c: 'cortinas', links: [['Cortinas Blackout', 'cortinas-blackout'], ['Cortinas Jacquard Relieve 3D', 'cortinas-jacquard-relieve-3d'], ['Cortinas Traslúcidas', 'cortinas-traslucidas'], ['Ver todas las cortinas', 'cortinas']], cards: [['Blackout', 'cortinas-blackout'], ['Jacquard Relieve 3D', 'cortinas-jacquard-relieve-3d']] },
    { l: 'Ofertas', c: 'ofertas-especiales' }
  ];
  // mega-card images: prefer our local collection membership; fall back to any product of the right family
  const cardImg = c => { const ps = K.inCol(c, 1); if (ps[0]) return K.img(ps[0].img[0], 700); const alt = RG.find(p => p.img[0] && norm(p.ty + ' ' + p.t).includes(norm(c.split('-')[0]))); return alt ? K.img(alt.img[0], 700) : ''; };

  const UTIL = [['Nuestra historia', SITE + '/pages/nuestra-historia'], ['Catálogos', SITE + '/pages/catalogos'], ['Contacto', SITE + '/pages/contact']];
  const SUPPORT = [['Contáctanos', SITE + '/pages/contact'], ['Política de envío', SITE + '/policies/shipping-policy'], ['Política de devolución', SITE + '/policies/refund-policy'], ['Aviso de privacidad', SITE + '/policies/privacy-policy'], ['Términos y condiciones', SITE + '/policies/terms-of-service'], ['Mi cuenta', SITE + '/account'], ['WhatsApp', 'https://wa.me/524491842835']];

  /* ================= shell ================= */
  function shell() {
    const ann = document.createElement('div');
    ann.className = 'ann'; ann.setAttribute('role', 'region'); ann.setAttribute('aria-label', 'Anuncios');
    ann.innerHTML = [
      `<span>Envío gratis en pedidos superiores a <a href="${col('all')}">$1,499</a></span>${I.arrow}`,
      `<span><a href="${col('all')}">3 meses sin intereses</a> y entregas a todo México</span>${I.arrow}`,
      `<span><button type="button" data-dp-open>10% de descuento</button> en tu primera compra</span>${I.arrow}`
    ].map((h, i) => `<div class="ann-s${i ? '' : ' is-on'}" aria-hidden="${i ? 'true' : 'false'}">${h}</div>`).join('');
    document.body.prepend(ann);
    let ai = 0; const as = $$('.ann-s', ann);
    if (!RM.matches) setInterval(() => { as[ai].classList.remove('is-on'); as[ai].setAttribute('aria-hidden', 'true'); ai = (ai + 1) % as.length; as[ai].classList.add('is-on'); as[ai].setAttribute('aria-hidden', 'false'); }, 5000);

    const hdr = $('#hdr');
    hdr.className = 'hdr';
    hdr.innerHTML = `<div class="hdr-in">
      <div class="hdr-top">
        <div class="hdr-l"><button class="burger" aria-label="Abrir menú" data-mdr-open>${I.menu}</button><div class="util">${UTIL.map(([t, u]) => `<a href="${u}">${t}</a>`).join('')}</div></div>
        <a class="logo" href="index.html" aria-label="Regina, inicio"><img src="media/brand/logo.svg" alt="Regina" width="91" height="30"></a>
        <div class="icons">
          <button type="button" aria-label="Buscar" aria-expanded="false" data-srch-toggle>${I.search}</button>
          <a class="acct" href="${SITE}/account" aria-label="Mi cuenta">${I.user}</a>
          <button type="button" aria-label="Abrir carrito" data-cart-open>${I.bag}<span class="bub" data-count hidden>0</span></button>
        </div>
      </div>
      <ul class="nav" role="list">${NAV.map(n => `<li><a class="nav-a${n.season ? ' season' : ''}" href="${col(n.c)}">${n.l}</a>${n.links ? `
        <div class="mega"><div class="mega-in"><div class="mega-l">${n.links.map(([t, c]) => `<a href="${col(c)}">${t}</a>`).join('')}</div>
        <div class="mega-r">${n.cards.map(([t, c]) => `<a class="mega-card" href="${col(c)}"><img src="${cardImg(c)}" alt="" loading="lazy"><span>${t}</span></a>`).join('')}</div></div></div>` : ''}</li>`).join('')}</ul>
      <div class="srch" role="search"><div class="srch-in"><label class="sr" for="q">Buscar productos</label><input id="q" type="search" placeholder="Busca cobertores, edredones, toallas…" autocomplete="off"><div class="srch-res" aria-live="polite"></div></div></div>
    </div>`;
    // burger lives in util on desktop (hidden) — move to left column for mobile layout
    window.addEventListener('scroll', () => hdr.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

    // search
    const sb = $('.srch', hdr), si = $('#q'), sr = $('.srch-res', hdr), st = $('[data-srch-toggle]', hdr);
    st.addEventListener('click', () => { const o = sb.classList.toggle('is-open'); st.setAttribute('aria-expanded', o); if (o) si.focus(); });
    si.addEventListener('input', () => {
      const q = norm(si.value.trim());
      if (q.length < 2) { sr.innerHTML = ''; return; }
      const res = RG.filter(p => avail(p) && norm(p.t + ' ' + p.ty).includes(q)).slice(0, 12);
      sr.innerHTML = res.length ? res.map(p => `<a href="product.html?h=${p.h}"><img src="${K.img(p.img[0], 300)}" alt="" loading="lazy">${esc(p.t)}<br><b>${K.money(K.minPrice(p))}</b></a>`).join('') : `<p class="srch-empty">No encontramos resultados para “${esc(si.value)}”</p>`;
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && sb.classList.contains('is-open')) { sb.classList.remove('is-open'); st.setAttribute('aria-expanded', 'false'); st.focus(); } });

    // mobile drawer
    const md = document.createElement('div');
    md.className = 'mdr'; md.setAttribute('role', 'dialog'); md.setAttribute('aria-modal', 'true'); md.setAttribute('aria-label', 'Menú');
    md.innerHTML = `<div class="mdr-scrim" data-mdr-close></div><div class="mdr-p">
      <div class="mdr-x"><img src="media/brand/logo.svg" alt="Regina"><button aria-label="Cerrar menú" data-mdr-close>×</button></div>
      ${NAV.map(n => n.links ? `<details><summary${n.season ? ' style="color:var(--terracota)"' : ''}>${n.l}${I.caret}</summary><div class="mdr-sub">${n.links.map(([t, c]) => `<a href="${col(c)}">${t}</a>`).join('')}
        <div class="mdr-cards">${n.cards.map(([t, c]) => `<a href="${col(c)}"><img src="${cardImg(c)}" alt="" loading="lazy">${t}</a>`).join('')}</div></div></details>` : `<a class="mdr-plain" href="${col(n.c)}">${n.l}</a>`).join('')}
      <div class="mdr-util">${UTIL.map(([t, u]) => `<a href="${u}">${t}</a>`).join('')}</div>
      <h4>Atención al cliente</h4><div class="mdr-sup">${SUPPORT.map(([t, u]) => `<a href="${u}">${t}</a>`).join('')}</div>
      <div class="mdr-soc">${SOCIAL.map(([n, u, s]) => `<a href="${u}" aria-label="${n}" target="_blank" rel="noopener">${s}</a>`).join('')}</div>
    </div>`;
    document.body.appendChild(md);
    const mdOpen = () => { md.classList.add('is-open'); document.documentElement.classList.add('rg-lock'); $('[data-mdr-close].mdr-x button, .mdr-x button', md).focus(); };
    const mdClose = () => { md.classList.remove('is-open'); document.documentElement.classList.remove('rg-lock'); };
    document.addEventListener('click', e => { if (e.target.closest('[data-mdr-open]')) mdOpen(); else if (e.target.closest('[data-mdr-close]')) mdClose(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') mdClose(); });

    // cart drawer (structure required by core.js)
    const mc = document.createElement('div');
    mc.className = 'mc'; mc.setAttribute('data-cart', ''); mc.setAttribute('role', 'dialog'); mc.setAttribute('aria-modal', 'true'); mc.setAttribute('aria-label', 'Tu carrito');
    mc.innerHTML = `<div class="mc-scrim" data-cart-close></div>
      <div class="mc-p">
        <div class="mc-cart">
          <div class="mc-head">
            <div class="mc-head-row"><h2>Tu carrito<span>(<span data-cart-count>0</span>)</span></h2><button class="mc-x" aria-label="Cerrar carrito" data-cart-close><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 4 12 12M16 4 4 16"/></svg></button></div>
            <div class="mc-ship"><div data-cart-ship></div><div class="mc-track"><i data-cart-bar></i></div></div>
          </div>
          <div class="mc-body"><div data-cart-lines></div>
            <p class="mc-note">Revisa tus medidas y colores antes de pagar. Pagas en el checkout seguro de regina.com.mx</p>
          </div>
          <div class="mc-foot" data-cart-foot>
            <div class="row"><span>Subtotal</span><span data-cart-sub>$0.00</span></div>
            <button class="btn" type="button" data-checkout>Finalizar compra</button>
            <small>Envío e impuestos se calculan en el pago · 3 meses sin intereses</small>
          </div>
        </div>
        <aside class="mc-up" data-cart-upwrap><h3>Completa tu descanso</h3><div class="mc-up-list" data-cart-up></div></aside>
      </div>`;
    document.body.appendChild(mc);

    // footer
    const f = $('#ftr');
    f.className = 'ftr';
    f.innerHTML = `<div class="ftr-g">
      <div class="ftr-l">
        <div class="ftr-mark"><img src="media/brand/logo.svg" alt="Regina"></div>
        <div class="ftr-col"><h3>Regina</h3>${[['Nuestra historia', SITE + '/pages/nuestra-historia'], ['Catálogos', SITE + '/pages/catalogos'], ['Recámara', col('recamara')], ['Bebé', col('bebe')], ['Baño', col('bano')], ['Cortinas', col('cortinas')], ['Ofertas especiales', col('ofertas-especiales')]].map(([t, u]) => `<a href="${u}">${t}</a>`).join('')}
          <p class="ftr-con">+52 449 184 2835<br><a href="mailto:contacto@regina.com.mx" style="display:inline;font-size:14px">contacto@regina.com.mx</a><br>Aguascalientes, México</p></div>
        <div class="ftr-col"><h3>Atención al cliente</h3>${SUPPORT.map(([t, u]) => `<a href="${u}">${t}</a>`).join('')}</div>
      </div>
      <div class="ftr-r"><div class="ftr-card">
        <h2>10% de descuento en tu primera compra</h2>
        <p>Suscríbete y recibe novedades, lanzamientos y tu código de bienvenida</p>
        <form class="nl" novalidate><label class="sr" for="nle">Correo electrónico</label><input id="nle" type="email" placeholder="Tu correo electrónico" autocomplete="email" required><button type="submit">Suscribirme</button></form>
        <p class="nl-ok" aria-live="polite"></p>
        <div class="ftr-soc">${SOCIAL.map(([n, u, s]) => `<a href="${u}" aria-label="${n}" target="_blank" rel="noopener">${s}</a>`).join('')}</div>
        <div class="ftr-tag">@regina.mxoficial</div>
      </div></div>
    </div>
    <div class="ftr-bot"><span>©2026 Regina</span><a href="${SITE}/policies/terms-of-service">Términos y condiciones</a><a href="${SITE}/policies/privacy-policy">Aviso de privacidad</a><a href="${SITE}/policies/refund-policy">Política de devolución</a><a href="${SITE}/policies/shipping-policy">Política de envío</a><span class="ftr-bsoc">${SOCIAL.map(([n, u, s]) => `<a href="${u}" aria-label="${n}" target="_blank" rel="noopener">${s}</a>`).join('')}</span><img class="amvo" src="media/brand/amvo-s.png" alt="Sello AMVO"></div>`;
    $('.nl', f).addEventListener('submit', e => {
      e.preventDefault(); const v = $('#nle').value.trim(); const ok = /\S+@\S+\.\S+/.test(v);
      $('.nl-ok', f).textContent = ok ? '¡Listo! Revisa tu correo para recibir tu código de descuento' : 'Escribe un correo válido';
      if (ok) { try { localStorage.setItem('regina-news', v); } catch (er) {} }
    });
  }

  /* ================= discount popup ================= */
  function popup(force) {
    let seen = false; try { seen = !!localStorage.getItem('rg-dp'); } catch (e) {}
    if (seen && !force) return;
    let dp = $('.dp');
    if (!dp) {
      const pics = ['media/photo/majestic-tessa-red-frontal.jpg', 'media/photo/regina400-sorrento-lavanda-cama.jpg', 'media/photo/nuvo-conrad-cedro-cenital.jpg'];
      dp = document.createElement('div');
      dp.className = 'dp'; dp.setAttribute('role', 'dialog'); dp.setAttribute('aria-modal', 'true'); dp.setAttribute('aria-labelledby', 'dp-h');
      dp.innerHTML = `<div class="dp-scene" aria-hidden="true">
          <div class="dp-pol" style="--r:-7deg;left:6%;top:12%;width:312px;height:440px"><img src="${pics[0]}" alt=""></div>
          <div class="dp-pol" style="--r:5deg;left:27%;top:30%;width:339px;height:439px"><img src="${pics[1]}" alt=""></div>
          <div class="dp-pol" style="--r:-3deg;left:9%;top:58%;width:308px;height:422px"><img src="${pics[2]}" alt=""></div>
          <div class="dp-star" style="left:36%;top:12%">${I.star}</div><div class="dp-star" style="left:4%;top:50%;width:30px">${I.star}</div><div class="dp-star" style="left:46%;top:76%;width:36px">${I.star}</div>
        </div>
        <button class="dp-x" aria-label="Cerrar" data-dp-close>×</button>
        <div class="dp-card">
          <img class="lg" src="media/brand/logo.svg" alt="Regina">
          <h2 id="dp-h">10% <small>en tu primera compra</small></h2>
          <p>¿Qué estás buscando?</p>
          <div class="dp-btns">${['Recámara', 'Bebé', 'Baño', 'Cortinas'].map(t => `<button type="button" data-dp-pick="${t}">${t}</button>`).join('')}</div>
          <form class="dp-form" novalidate><label class="sr" for="dpe">Correo electrónico</label><input id="dpe" type="email" placeholder="Tu correo electrónico" autocomplete="email" required><button type="submit">Quiero mi 10%</button><p class="dp-legal">Al suscribirte aceptas recibir novedades de Regina</p></form>
          <button class="dp-no" type="button" data-dp-close>No, gracias</button>
        </div>`;
      document.body.appendChild(dp);
      dp.addEventListener('click', e => {
        const pick = e.target.closest('[data-dp-pick]');
        if (pick) { dp.dataset.pick = pick.dataset.dpPick; $('.dp-card', dp).classList.add('step2'); $('#dpe').focus(); }
        if (e.target.closest('[data-dp-close]')) close();
      });
      $('.dp-form', dp).addEventListener('submit', e => {
        e.preventDefault(); const v = $('#dpe').value.trim();
        if (!/\S+@\S+\.\S+/.test(v)) { $('#dpe').focus(); return; }
        try { localStorage.setItem('regina-news', v); localStorage.setItem('regina-interest', dp.dataset.pick || ''); } catch (er) {}
        $('.dp-form', dp).innerHTML = `<p style="font:500 26px/1.15 var(--fd);color:var(--navy);margin:8px 0 0">¡Suscripción confirmada!</p><p style="font-size:15px;margin:10px 0 0;color:var(--sec)">Revisa tu correo para recibir tu código de descuento</p>`;
        $('.dp-no', dp).textContent = 'Seguir comprando';
      });
    }
    function close() { dp.classList.remove('is-open'); document.documentElement.classList.remove('rg-lock'); try { localStorage.setItem('rg-dp', '1'); } catch (e) {} }
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && dp.classList.contains('is-open')) close(); });
    dp.classList.add('is-open'); document.documentElement.classList.add('rg-lock');
    setTimeout(() => { const b = $('.dp-btns button', dp); if (b) b.focus(); }, 60);
  }
  document.addEventListener('click', e => { if (e.target.closest('[data-dp-open]')) popup(true); });

  /* ================= product card + carousel ================= */
  const optName = p => (p.o || []).find(o => /color/i.test(o));
  function priceHTML(p) {
    const ps = p.v.map(v => v.p), mn = Math.min(...ps), multi = new Set(ps).size > 1;
    const v = p.v.find(x => x.p === mn); const cmp = v && v.c;
    return `${multi ? 'Desde ' : ''}<b>${K.money(mn)}</b>${cmp ? `<s>${K.money(cmp)}</s>` : ''}`;
  }
  function countLabel(p) {
    const co = optName(p);
    if (co) { const idx = p.o.indexOf(co); const n = new Set(p.v.map(v => v.t.split(' / ')[idx])).size; return n + (n === 1 ? ' color disponible' : ' colores disponibles'); }
    const n = p.v.length; if (n <= 1 || p.v[0].t === 'Default Title') return 'Medida única';
    return n + ' medidas disponibles';
  }
  function card(p) {
    const vid = VID[p.h];
    const sold = !avail(p);
    const sws = p.img.slice(0, 6);
    return `<div class="card"${vid ? ' data-hovervid' : ''}>
      <a class="card-im" href="product.html?h=${p.h}" aria-label="${esc(p.t)}">
        <img src="${K.img(p.img[0], 500)}" alt="${esc(p.t)}" loading="lazy" width="500" height="500">
        ${vid ? `<video muted loop playsinline preload="none" data-src="media/vid/${vid}-s.mp4" aria-hidden="true"></video>` : ''}
      </a>
      <span class="pill${sold ? ' sold' : ''}">${sold ? 'Agotado' : esc(p.ty || 'Regina')}</span>
      <a class="card-t" href="product.html?h=${p.h}">${esc(p.t)}</a>
      <div class="card-pr">${priceHTML(p)}</div>
      <div class="card-op"><div class="n">${countLabel(p)}</div>
        ${sws.length > 1 ? `<div class="sw" role="group" aria-label="Vistas de ${esc(p.t)}">${sws.map((s, i) => `<button type="button" class="${i ? '' : 'is-on'}" data-sw="${K.img(s, 500)}" aria-label="Vista ${i + 1}"><img src="${K.img(s, 80)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
      </div>
    </div>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-sw]'); if (!b) return;
    const c = b.closest('.card'); $('.card-im img', c).src = b.dataset.sw;
    $$('[data-sw]', c).forEach(x => x.classList.toggle('is-on', x === b));
  });
  document.addEventListener('playing', e => { if (e.target.tagName === 'VIDEO') e.target.classList.add('is-ready'); }, true);

  function carousel(title, prods, cls) {
    return `<section class="rc container ${cls || ''}" aria-label="${esc(title)}">
      ${title ? `<h2 class="rc-t">${esc(title)}</h2>` : ''}
      <div class="rc-wrap"><button class="rc-arr prev" aria-label="Anterior" data-rc="-1">${I.left}</button>
        <div class="rc-track">${prods.map(card).join('')}</div>
        <button class="rc-arr next" aria-label="Siguiente" data-rc="1">${I.right}</button></div>
    </section>`;
  }
  function wireCarousels(root) {
    $$('.rc-wrap', root).forEach(w => {
      const t = $('.rc-track, .ugc-track', w); if (!t) return;
      const upd = () => {
        const p = $('.rc-arr.prev', w), n = $('.rc-arr.next', w);
        if (p) p.disabled = t.scrollLeft < 4; if (n) n.disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
        // vertically centre arrows on the card image
        const im = $('.card-im', t); if (im && p && !w.closest('.ugc')) { const top = im.offsetTop + im.offsetHeight / 2; p.style.top = n.style.top = top + 'px'; }
      };
      t.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); setTimeout(upd, 50); upd();
    });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-rc]'); if (!a) return;
    const t = $('.rc-track, .ugc-track', a.parentElement); t.scrollBy({ left: +a.dataset.rc * t.clientWidth * .9, behavior: RM.matches ? 'auto' : 'smooth' });
  });

  // pick: available products from a collection, featuring products with real-photo loops first
  function pick(c, n, lead) {
    const all = RG.filter(p => p.cols.includes(c) && avail(p));
    const first = (lead || []).map(K.find).filter(p => p && avail(p));
    const rest = all.filter(p => !first.includes(p));
    return first.concat(rest).slice(0, n || 12);
  }

  /* ================= video toggle ================= */
  document.addEventListener('click', e => {
    const b = e.target.closest('.vtoggle'); if (!b) return;
    const vs = $$('video', b.parentElement).filter(v => v.offsetParent !== null);
    const paused = vs.every(v => v.paused);
    vs.forEach(v => paused ? v.play().catch(() => {}) : v.pause());
    b.innerHTML = paused ? I.pause : I.play; b.setAttribute('aria-label', paused ? 'Pausar video' : 'Reproducir video');
  });

  /* ================= HOME ================= */
  function home() {
    const m = $('#home'); if (!m) return;
    const vhero = (d, mob, label) => `<section class="vhero" aria-label="${label}">
      <video class="d" autoplay muted loop playsinline preload="metadata" poster="media/v1/${d}.jpg" data-inview><source src="media/v1/${d}.mp4" type="video/mp4"></video>
      <video class="m" autoplay muted loop playsinline preload="metadata" poster="media/v1/${mob}.jpg" data-inview><source src="media/v1/${mob}.mp4" type="video/mp4"></video>
      <button class="vtoggle" aria-label="Pausar video">${I.pause}</button></section>`;
    const strip = (h, btn, href) => `<section class="container strip"><h2>${h}</h2><a class="btn" href="${href}">${btn}</a></section>`;
    const clist = items => `<section class="container clist"><div class="clist-row">${items.map(([img, t, b, href]) => `<div class="clist-c"><a class="im" href="${href}"><img src="${img}" alt="${esc(t)}" loading="lazy"></a><h3>${t}</h3><a class="btn btn--card" href="${href}">${b}</a></div>`).join('')}</div></section>`;
    const T = h => K.find(h);
    const pimg = (h, i, w) => { const p = T(h); return p ? K.img(p.img[i || 0], w || 900) : ''; };

    // scrapbook polaroids: real product photos, scattered statically (no scroll motion)
    const scrapPics = [
      ['media/photo/majestic-tessa-red-frontal.jpg', 'Majestic 3D', 292 / 344, 30, 8, -6], ['media/photo/regina400-sienna-portobello-cama.jpg', 'Regina 400 Plus+', 193 / 239, 76, 12, 5],
      [pimg('cobertor-boutique-bubble-onyx', 0), 'Boutique', 1, 52, 27, -3], ['media/photo/nuvo-conrad-cedro-cenital.jpg', 'Nuvó', 292 / 344, 22, 42, 4],
      ['media/photo/regina400-sorrento-lavanda-cama.jpg', 'Sorrento', 193 / 239, 72, 50, -5], [pimg('cobertor-texturelle-capri-malva', 0), 'Texturelle', 254 / 339, 40, 66, 6],
      ['media/photo/regina400-sienna-olive-textura.jpg', 'Textura', 1, 78, 80, -4], [pimg('cobertor-seduccion-vinedo', 0), 'Seducción', 193 / 239, 30, 88, 3]
    ];
    const scrapW = [300, 230, 240, 300, 220, 260, 230, 220];

    const winter = pick('preparate-para-el-invierno', 12, ['cobertor-boutique-bubble-onyx', 'cobertor-texturelle-capri-malva']);
    const ultra = pick('cobertores-ultra-calidos', 12, ['cobertor-texturelle-capri-malva', 'cobertor-boutique-bubble-onyx', 'cobertor-seduccion-vinedo']).filter(p => !winter.slice(0, 2).includes(p));
    const edre = pick('edredones-recamara', 12, ['juego-de-edredon-majestic-3d-tessa-gold', 'juego-de-edredon-majestic-3d-tessa-red']);
    const lines = [
      ['Nuvó', 'cobertor-nuvo-loyal-laguna', 'Sus dos vistas completamente diferentes permiten transformar la recámara al instante'],
      ['Boutique', 'cobertor-boutique-bubble-onyx', 'La suavidad de sus delicadas fibras se combina con una calidez envolvente'],
      ['Texturelle', 'cobertor-texturelle-capri-malva', 'La armonía perfecta entre un sofisticado diseño degradado y una exquisita textura jacquard'],
      ['Seducción', 'cobertor-seduccion-vinedo', 'Suavidad profunda y un peso acogedor que se siente verdaderamente premium'],
      ['Regina 400 Plus+', 'cobertor-regina-400-plus-petalis', 'Ligero, cómodo y súper agradable al tacto, con calor justo sin ser pesado'],
      ['Majestic 3D', 'juego-de-edredon-majestic-3d-tessa-gold', 'Textura Jacquard 3D con delicados motivos botánicos en relieve']
    ];
    const tiles = [
      ['Recámara', 'recamara', 'media/photo/majestic-tessa-red-frontal.jpg'],
      ['Cobertores ultra cálidos', 'cobertores-ultra-calidos', pimg('cobertor-nuvo-alpina-crem', 0, 500) || pimg('cobertor-boutique-bubble-onyx', 0, 500)],
      ['Cobertores ligeros', 'cobertor-ligero', 'media/photo/regina400-amore-mio-lilys-cama-frente.jpg'],
      ['Bebé', 'bebe', pimg('cobertor-baby-seduccion-osito-estrella', 0, 500)],
      ['Baño', 'bano', pimg('toalla-grosso', 0, 500)],
      ['Cortinas', 'cortinas', pimg('set-de-cortinas-blackout-celine-black', 0, 500)]
    ];
    const ugc = [
      ['nuvo-laguna', 'cobertor-nuvo-loyal-laguna', -4], ['boutique-onyx', 'cobertor-boutique-bubble-onyx', 3], ['texturelle-malva', 'cobertor-texturelle-capri-malva', -2],
      ['toallas-grosso', 'toalla-grosso', 4], ['cortina-celine', 'set-de-cortinas-blackout-celine-black', -3], ['baby-osito', 'cobertor-baby-seduccion-osito-estrella', 2]
    ];

    m.innerHTML = `
      ${vhero('hero1', 'hero1-m', 'Cobertores Regina en movimiento')}
      ${strip('Arropa tu hogar para las noches más frías', 'Prepárate para el invierno', col('preparate-para-el-invierno'))}
      ${carousel('Lo nuevo para este invierno', winter)}
      ${clist([
        ['media/photo/nuvo-conrad-cedro-cenital.jpg', 'Una recámara de revista', 'Ver colección Nuvó', col('edre-cobertores-nuvo')],
        ['media/photo/regina400-sorrento-lavanda-cama.jpg', 'Calidez ligera todo el año', 'Ver cobertores ligeros', col('cobertor-ligero')],
        ['media/photo/bata-volga-violet.jpg', 'Para quedarte en casa', 'Ver batas de descanso', col('batas-de-descanso')]
      ])}
      <section class="scrap" aria-labelledby="scrap-h"><div class="container scrap-g">
        <div class="scrap-tx">
          <img class="mark" src="media/brand/favicon.png" alt="" aria-hidden="true">
          <h2 class="h-ed" id="scrap-h">Una temporada para arroparse</h2>
          <p>Borrega, relieves, jacquard y peluche suave. Cada temporada llegamos con nuevas texturas y nuevos diseños para que tu cama se sienta como un santuario</p>
          <a class="btn btn--royal" href="${col('cobertores-ultra-calidos')}">Ver cobertores ultra cálidos</a>
        </div>
        <div class="scrap-ph" aria-hidden="true">${scrapPics.map(([src, cap, ar, x, y, r], i) => `<div class="pol" style="--r:${r}deg;left:${x}%;top:${y}%;width:${scrapW[i]}px;height:${Math.round(scrapW[i] / ar) + 44}px"><img src="${src}" alt="" loading="lazy"><span>${cap}</span></div>`).join('')}</div>
      </div></section>
      ${carousel('Edredones para vestir tu cama', edre)}
      ${vhero('hero2', 'hero2-m', 'Baño, cortinas y bebé Regina en movimiento')}
      ${strip('Diseño, calidez y suavidad para cada rincón de tu hogar', 'Conoce nuestra historia', SITE + '/pages/nuestra-historia')}
      ${clist([
        [pimg('toalla-grosso', 0), 'Para el baño', 'Ver toallas', col('toallas')],
        [pimg('cobertor-baby-seduccion-osito-estrella', 0), 'Para los más pequeños', 'Ver bebé', col('bebe')],
        [pimg('set-de-cortinas-blackout-celine-black', 0), 'Para sala y recámara', 'Ver cortinas', col('cortinas')]
      ])}
      ${carousel('Favoritos de temporada', ultra)}
      <section class="iwt"><div class="container iwt-g">
        <div class="iwt-tx">
          <span class="script">de visita en</span>
          <h2 class="h-ed">Una recámara Regina</h2>
          <p>Entra a una recámara vestida con el cobertor ligero Regina 400 Sorrento Lavanda: suave, calientito y con el brillo discreto de su acabado Sensa Shine. Calor justo, sin ser pesado</p>
          <a class="btn btn--line" href="product.html?h=cobertor-ligero-regina-400-sorrento-lavanda">Ver Sorrento Lavanda</a>
        </div>
        <div class="iwt-im iwt-vid">
          <video autoplay muted loop playsinline preload="metadata" poster="media/v1/tour.jpg" data-inview aria-label="Recorrido por una recámara con el cobertor Regina 400 Sorrento Lavanda"><source src="media/v1/tour.mp4" type="video/mp4"></video>
          <a class="iwt-tag" href="product.html?h=cobertor-ligero-regina-400-sorrento-lavanda"><img src="${pimg('cobertor-ligero-regina-400-sorrento-lavanda', 0, 160)}" alt=""><span>Regina 400 Sorrento Lavanda<small>Desde ${K.money(299)}</small></span></a>
          <button class="vtoggle" aria-label="Pausar video">${I.pause}</button>
        </div>
      </div></section>
      <section class="container cgrid" aria-label="Compra por categoría"><ul>${tiles.map(([t, c, img]) => `<li><a href="${col(c)}"><img src="${img}" alt="" loading="lazy"><span>${t}</span></a></li>`).join('')}</ul></section>
      <section class="cib"><div class="cib-row">
        <div class="cib-im cib-a"><img src="media/photo/majestic-tessa-gold-edredon-doblado.jpg" alt="Edredón Majestic 3D Tessa Gold doblado" loading="lazy"></div>
        <div class="cib-tx"><div class="cib-frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="cib-c">
          <span class="script">Recién llegado</span>
          <h2 class="h-ed">Majestic 3D Tessa Gold</h2>
          <p>Jacquard 3D con motivos botánicos en relieve, fundas y un cojín bordado de terciopelo para vestir tu cama completa</p>
          <a class="btn" href="product.html?h=juego-de-edredon-majestic-3d-tessa-gold">Descubre Tessa Gold</a>
        </div></div>
        <div class="cib-im cib-b"><img src="media/photo/majestic-tessa-gold-funda-almohada.jpg" alt="Funda de almohada Majestic 3D Tessa Gold" loading="lazy"></div>
      </div></section>
      <section class="ugc" aria-labelledby="ugc-h"><h2 class="h-ed" id="ugc-h">Texturas que se sienten</h2>
        <div class="rc-wrap"><button class="rc-arr prev" aria-label="Anterior" data-rc="-1">${I.left}</button>
          <div class="ugc-track">${ugc.map(([v, h], i) => { const p = T(h); return p ? `<a class="ugc-t mat-${[0, 0, 1, 0, 0, 1][i]}" href="product.html?h=${h}"><div class="fr"><video autoplay muted loop playsinline preload="none" poster="media/v1/p-${v}.jpg" data-inview aria-hidden="true"><source src="media/v1/p-${v}.mp4" type="video/mp4"></video><img class="ugc-logo" src="media/brand/logo-white.svg" alt=""><span class="ugc-cap">${esc(K.shortName(p))}</span></div><b>${esc(p.t)}<small>${priceHTML(p).replace(/<\/?b>/g, '')}</small></b></a>` : ''; }).join('')}</div>
          <button class="rc-arr next" aria-label="Siguiente" data-rc="1">${I.right}</button></div>
      </section>
      <section class="press" aria-label="Nuestras líneas"><div class="press-q">${lines.map(([n, h, q], i) => `<p class="${i ? '' : 'is-on'}" id="pq${i}">“${q}”</p>`).join('')}</div>
        <div class="press-l" role="tablist" aria-label="Líneas Regina">${lines.map(([n], i) => `<button role="tab" aria-selected="${!i}" aria-controls="pq${i}" class="lg lg-${i}${i ? '' : ' is-on'}" data-pq="${i}">${n === 'Regina 400 Plus+' ? 'Regina<sup>400</sup><em>plus+</em>' : n === 'Majestic 3D' ? 'MAJESTIC<span>3D</span>' : n}</button>`).join('')}</div></section>`;
    $$('[data-pq]', m).forEach(b => b.addEventListener('click', () => {
      $$('[data-pq]', m).forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
      $$('.press-q p', m).forEach((p, i) => p.classList.toggle('is-on', i === +b.dataset.pq));
    }));
    K.Cart.upsell = ['toalla-grosso', 'cobertor-texturelle-capri-malva', 'cobertor-baby-seduccion-osito-estrella', 'set-de-cortinas-blackout-celine-black', 'cobertor-regina-400-plus-petalis', 'juego-de-edredon-majestic-3d-tessa-gold'];
    wireCarousels(m);
    observeVideos(m);
  }

  // core.js observes [data-inview] videos only on DOMContentLoaded; ours are rendered after, so observe here
  function observeVideos(root) {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (RM.matches) return; en.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .2 });
    $$('video[data-inview]', root).forEach(v => { if (RM.matches) v.removeAttribute('autoplay'); io.observe(v); });
  }

  /* ================= PDP ================= */
  function pdp() {
    const m = $('#pdp'); if (!m) return;
    const qs = new URLSearchParams(location.search);
    let p = K.find(qs.get('h')) || K.find('toalla-grosso');
    let sel = {}; let qty = 1;
    const opts = () => (p.o || []).filter(o => o !== 'Title');
    const valsOf = i => [...new Set(p.v.map(v => v.t.split(' / ')[i]))];
    const variantFor = s => p.v.find(v => { const parts = v.t.split(' / '); return opts().every((o, i) => parts[i] === s[o]); });
    const shortSize = t => (t || '').split(' - ')[0].trim();
    const colorIdx = () => opts().findIndex(o => /color/i.test(o));
    const imgForColor = c => p.img.find(u => norm(u.split('/').pop()).includes(norm(c).replace(/\s+/g, '-')) || norm(u.split('/').pop()).includes(norm(c).replace(/\s+/g, '')));

    function siblings() {
      if (!p.ty) return [];
      return RG.filter(x => x.ty === p.ty && x.h !== p.h && avail(x)).slice(0, 11);
    }
    function pairs() {
      const c = p.cols; let pool;
      if (c.includes('bano') || c.includes('toallas-y-batas-de-bano')) pool = RG.filter(x => (x.cols.includes('bano') || x.cols.includes('toallas-y-batas-de-bano')) && x.h !== p.h);
      else if (c.includes('bebe')) pool = RG.filter(x => x.cols.includes('bebe') && x.ty !== p.ty);
      else if (c.includes('cortinas')) pool = RG.filter(x => x.cols.includes('cobertores-ultra-calidos') || x.cols.includes('edredones-recamara'));
      else pool = RG.filter(x => x.cols.includes('sabanas-polaris') || x.cols.includes('cortinas') || (x.cols.includes('recamara') && x.ty !== p.ty));
      return pool.filter(avail).slice(0, 10);
    }
    function ymal() {
      const c = p.cols.find(x => !['todos', 'ofertas-especiales'].includes(x)) || 'recamara';
      return RG.filter(x => x.h !== p.h && avail(x) && (x.ty === p.ty || x.cols.includes(c))).slice(0, 12);
    }
    function render() {
      const os = opts();
      if (!Object.keys(sel).length || !variantFor(sel)) {
        const v0 = p.v.find(v => v.a) || p.v[0]; const parts = v0.t.split(' / '); sel = {}; os.forEach((o, i) => sel[o] = parts[i]);
      }
      const v = variantFor(sel) || p.v[0];
      const ci = colorIdx();
      let imgs = p.img.slice();
      if (ci > -1) { const ci0 = imgForColor(sel[os[ci]]); if (ci0) imgs = [ci0].concat(imgs.filter(u => u !== ci0)); }
      const vid = VID[p.h];
      const slides = imgs.map((u, i) => ({ t: 'i', src: K.img(u, 1100), th: K.img(u, 180), alt: p.t + ' vista ' + (i + 1) }));
      if (vid) slides.splice(1, 0, { t: 'v', src: `media/vid/${vid}.mp4`, th: `media/vid/${vid}.jpg`, alt: p.t + ' en movimiento' });
      const isNew = p.cols.includes('primavera-verano-2026') || (p.at || '') >= '2026-09';
      const sizeIdx = os.findIndex(o => /tama|medida|size/i.test(o));
      const sib = ci > -1 ? [] : siblings();
      const descLines = (p.d || '').split('\n').filter(Boolean);
      const incl = descLines.filter(l => /^incluye|^el set incluye/i.test(l));
      const body = descLines.filter(l => !incl.includes(l));
      const pr = pairs(); const ym = ymal();
      const COLN = { bano: 'Toallas', 'toallas-y-batas-de-bano': 'Toallas', bebe: 'Bebé', cortinas: 'Cortinas', 'edredones-recamara': 'Edredones', 'cobertores-ultra-calidos': 'Cobertores ultra cálidos', 'cobertor-ligero': 'Cobertores ligeros', recamara: 'Recámara' };
      const lineName = p.ty || (p.cols.map(c => COLN[c]).find(Boolean)) || 'Regina';
      const curName = p.ty ? p.t.replace(new RegExp(p.ty.replace(/[+]/g, '\\+'), 'i'), '').replace(/^(Edre-?cobertor|Cobertor|Set de|Juego de)\s+/i, '').replace(/\s+/g, ' ').trim() : '';

      m.innerHTML = `<div class="container pdp">
        <div class="pi"><div class="pi-head">
          <nav class="bc" aria-label="Ruta"><a href="index.html">Inicio</a> / <a href="${col(p.cols[0] || 'all')}">${esc(lineName)}</a> / <span>${esc(p.t)}</span></nav>
          <h1>${esc(p.t)}</h1>
          <div class="pi-line">${esc(lineName)}</div>
          <div class="pi-price" aria-live="polite">${K.money(v.p)}${v.c ? `<s>${K.money(v.c)}</s>` : ''}<span class="msi">o 3 meses sin intereses de ${K.money(v.p / 3)}</span></div>
        </div></div>
        <div class="pg" aria-label="Galería">
          <div class="pg-rail" role="tablist">${slides.map((s, i) => `<button role="tab" aria-label="Ver ${s.t === 'v' ? 'video' : 'imagen ' + (i + 1)}" class="${i ? '' : 'is-on'}" data-g="${i}"><img src="${s.th}" alt="" loading="lazy"></button>`).join('')}</div>
          <div class="pg-main">
            ${isNew ? '<span class="pg-badge">Nuevo</span>' : ''}
            <div class="pg-slides">${slides.map((s, i) => s.t === 'v' ? `<video muted loop playsinline autoplay preload="metadata" poster="${s.th}" data-inview aria-label="${esc(s.alt)}"><source src="${s.src}" type="video/mp4"></video>` : `<img src="${s.src}" alt="${esc(s.alt)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>`).join('')}</div>
            <button class="pg-arr prev" aria-label="Imagen anterior" data-gn="-1">${I.left}</button><button class="pg-arr next" aria-label="Imagen siguiente" data-gn="1">${I.right}</button>
          </div>
        </div>
        <div class="pi"><div class="pi-body">
          ${sizeIdx > -1 && valsOf(sizeIdx).length > 1 ? `<div class="opt"><div class="opt-l">Medida : <b>${esc(sel[os[sizeIdx]])}</b></div><div class="sz" role="radiogroup" aria-label="Medida">${valsOf(sizeIdx).map(val => { const s2 = { ...sel, [os[sizeIdx]]: val }; const vv = variantFor(s2); return `<button role="radio" aria-checked="${sel[os[sizeIdx]] === val}" class="${sel[os[sizeIdx]] === val ? 'is-on' : ''}${vv && vv.a ? '' : ' na'}" data-opt="${os[sizeIdx]}" data-val="${esc(val)}" title="${esc(val)}">${esc(shortSize(val))}</button>`; }).join('')}</div></div>` : ''}
          ${ci > -1 ? `<div class="opt"><div class="opt-l">Color : <b>${esc(sel[os[ci]])}</b></div><div class="cs" role="radiogroup" aria-label="Color">${valsOf(ci).map(val => { const im = imgForColor(val) || p.img[0]; return `<button role="radio" aria-checked="${sel[os[ci]] === val}" aria-label="${esc(val)}" class="${sel[os[ci]] === val ? 'is-on' : ''}" data-opt="${os[ci]}" data-val="${esc(val)}"><img src="${K.img(im, 90)}" alt=""></button>`; }).join('')}</div></div>`
          : sib.length ? `<div class="opt"><div class="opt-l">Diseño : <b>${esc(curName || p.t)}</b></div><div class="cs" aria-label="Otros diseños ${esc(lineName)}"><a class="is-on" href="product.html?h=${p.h}" aria-current="true" aria-label="${esc(p.t)}"><img src="${K.img(p.img[0], 90)}" alt=""></a>${sib.map(s => `<a href="product.html?h=${s.h}" data-sib="${s.h}" aria-label="${esc(s.t)}" title="${esc(s.t)}"><img src="${K.img(s.img[0], 90)}" alt="" loading="lazy"></a>`).join('')}</div></div>` : ''}
          <div class="atc-row">
            <div class="qstep" role="group" aria-label="Cantidad"><button type="button" aria-label="Quitar uno" data-qd="-1">−</button><span aria-live="polite">${qty}</span><button type="button" aria-label="Agregar uno" data-qd="1">+</button></div>
            <button class="btn btn--solid" type="button" ${v.a ? `data-add="${p.h}" data-vid="${v.id}" data-qty="${qty}"` : 'disabled'}>${v.a ? 'Agregar a la bolsa' : 'Agotado'}</button>
          </div>
          <div class="shipn"><div>${I.truck} Envío gratis desde $1,499 <i>|</i> ${I.card} 3 meses sin intereses</div><div style="margin-top:4px">${I.pin} Entregas a todo México</div></div>
          ${vid ? `<div class="pvid"><video muted loop playsinline autoplay preload="none" poster="media/v1/p-${vid}.jpg" data-inview aria-hidden="true"><source src="media/v1/p-${vid}.mp4" type="video/mp4"></video></div>` : ''}
          <div class="pdesc">${body.map(l => `<p>${esc(l)}</p>`).join('')}</div>
          <div class="promise">
            <svg class="seal" viewBox="0 0 66 108" aria-hidden="true"><path d="M8 0h50v86l-25 22L8 86z" fill="#002554"/><circle cx="33" cy="40" r="20" fill="none" stroke="#EAE2D6" stroke-width="1.5"/><text x="33" y="48" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="24" font-weight="600" fill="#EAE2D6">R</text><text x="33" y="76" text-anchor="middle" font-family="Inter,sans-serif" font-size="8" letter-spacing="1" fill="#EAE2D6">1998</text></svg>
            <h3>Nuestra promesa</h3>
            <b>Buenos diseños, precio accesible e innovación constante</b>
            <p>Desde Aguascalientes, más de 27 años arropando hogares mexicanos. ¿Dudas? Escríbenos por <a href="https://wa.me/524491842835" style="text-decoration:underline">WhatsApp</a></p>
          </div>
          <div class="acc is-open"><button type="button" aria-expanded="true">Medidas y contenido<span class="pm" aria-hidden="true"></span></button><div class="acc-b"><div>
            <ul>${p.v.filter(x => x.t !== 'Default Title').map(x => `<li>${esc(x.t)} · ${K.money(x.p)}${x.a ? '' : ' · Agotado'}</li>`).join('') || '<li>Medida única</li>'}</ul>
            ${incl.map(l => `<p style="margin:6px 0 0"><b>${esc(l)}</b></p>`).join('')}
          </div></div></div>
          <div class="acc"><button type="button" aria-expanded="false">Envíos y pagos<span class="pm" aria-hidden="true"></span></button><div class="acc-b"><div>
            <ul><li>Envío gratis en pedidos superiores a $1,499</li><li>Entregas a todo México</li><li>3 meses sin intereses</li><li>Pago seguro en el checkout de regina.com.mx</li></ul>
            <p style="margin:6px 0 0">Consulta la <a href="${SITE}/policies/shipping-policy" style="text-decoration:underline">política de envío</a> y la <a href="${SITE}/policies/refund-policy" style="text-decoration:underline">política de devolución</a></p>
          </div></div></div>
          ${pr.length ? `<div class="pair"><h3>Combínalo con</h3><div class="rc-wrap"><button class="rc-arr prev" aria-label="Anterior" data-rc="-1">${I.left}</button><div class="rc-track">${pr.map(card).join('')}</div><button class="rc-arr next" aria-label="Siguiente" data-rc="1">${I.right}</button></div></div>` : ''}
        </div></div>
      </div>
      ${ym.length ? carousel('También te puede gustar', ym, 'ymal') : ''}
      <div class="satc" aria-hidden="true"><div class="satc-r1"><img src="${K.img(imgs[0], 120)}" alt=""><div>${esc(p.t)}<small>${esc(os.map(o => shortSize(sel[o])).join(' · '))}</small></div><span class="p">${K.money(v.p)}</span></div>
        <button class="btn btn--solid" type="button" ${v.a ? `data-add="${p.h}" data-vid="${v.id}" data-qty="${qty}"` : 'disabled'}>${v.a ? 'Agregar a la bolsa' : 'Agotado'}</button></div>`;

      document.title = p.t + ' · Regina';
      K.Cart.upsell = pr.slice(0, 6).map(x => x.h);
      wire(slides.length);
      wireCarousels(m);
      observeVideos(m);
    }
    let gi = 0;
    function go(i, n) {
      gi = (i + n) % n;
      $('.pg-slides', m).style.transform = `translateX(${-gi * 100}%)`;
      $$('.pg-rail button', m).forEach((b, k) => { b.classList.toggle('is-on', k === gi); b.setAttribute('aria-selected', k === gi); });
      const r = $('.pg-rail', m), b = $$('.pg-rail button', m)[gi]; if (r && b) r.scrollTo({ top: b.offsetTop - 40, left: b.offsetLeft - 40, behavior: 'smooth' });
    }
    function wire(n) {
      gi = 0;
      $$('[data-g]', m).forEach(b => b.addEventListener('click', () => go(+b.dataset.g, n)));
      $$('[data-gn]', m).forEach(b => b.addEventListener('click', () => go(gi + +b.dataset.gn, n)));
      // swipe
      const sl = $('.pg-slides', m); let x0 = null;
      sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
      sl.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(gi + (dx < 0 ? 1 : -1), n); x0 = null; });
      $$('[data-opt]', m).forEach(b => b.addEventListener('click', () => { sel[b.dataset.opt] = b.dataset.val; render(); }));
      $$('[data-qd]', m).forEach(b => b.addEventListener('click', () => {
        qty = Math.max(1, Math.min(20, qty + +b.dataset.qd)); $('.qstep span', m).textContent = qty;
        $$('[data-add]', m).forEach(a => { if (a.closest('.atc-row') || a.closest('.satc')) a.dataset.qty = qty; });
      }));
      $$('[data-sib]', m).forEach(a => a.addEventListener('click', e => {
        e.preventDefault(); const np = K.find(a.dataset.sib); if (!np) return;
        p = np; sel = {}; qty = 1; history.pushState({ h: p.h }, '', 'product.html?h=' + p.h); render(); scrollTo({ top: 0, behavior: RM.matches ? 'auto' : 'smooth' });
      }));
      $$('.acc>button', m).forEach(b => b.addEventListener('click', () => { const a = b.parentElement; const o = a.classList.toggle('is-open'); b.setAttribute('aria-expanded', o); }));
      // mobile sticky ATC
      const satc = $('.satc', m), row = $('.atc-row', m);
      if (satc && row) {
        if (window._rgSatc) removeEventListener('scroll', window._rgSatc);
        window._rgSatc = () => { const on = row.getBoundingClientRect().bottom < 0; satc.classList.toggle('is-on', on); satc.setAttribute('aria-hidden', String(!on)); };
        addEventListener('scroll', window._rgSatc, { passive: true }); window._rgSatc();
      }
    }
    addEventListener('popstate', () => { const np = K.find(new URLSearchParams(location.search).get('h')); if (np) { p = np; sel = {}; render(); } });
    render();
  }

  /* ================= boot ================= */
  function boot() {
    shell(); home(); pdp();
    K.Cart.el = document.querySelector('[data-cart]'); K.Cart.render();
    document.querySelectorAll('[data-count]').forEach(n => { n.textContent = K.count(); n.hidden = !K.count(); });
    if (!/checkout/.test(location.pathname)) setTimeout(() => popup(false), 4000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
