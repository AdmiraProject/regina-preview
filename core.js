/* Regina shared commerce engine: catalog helpers, cart, drawer hooks, checkout popup, checkout handoff.
   Real data only (window.RG from data.js, scraped from regina.com.mx Shopify). */
(function () {
  const RG = window.RG || [];
  const byH = Object.fromEntries(RG.map(p => [p.h, p]));
  const FREE_SHIP = 1499; // regina.com.mx: "Envío gratis en pedidos superiores a $1,499"
  const STORE = 'https://www.regina.com.mx';
  const money = n => '$' + Number(n).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money0 = n => '$' + Number(n).toLocaleString('es-MX', { maximumFractionDigits: 0 });
  const img = (src, w) => src ? src + (src.includes('?') ? '&' : '?') + 'width=' + (w || 800) : '';
  const minPrice = p => Math.min(...p.v.map(v => v.p));
  const inCol = (c, n) => RG.filter(p => p.cols.includes(c) && p.v.some(v => v.a)).slice(0, n || 12);
  const find = h => byH[h];
  // Short product name (drop the long series prefix for cards)
  const shortName = p => p.t.replace(/^(Edre-?cobertor|Cobertor|Set de|Juego de)\s+/i, '').trim();

  /* ---------- cart ---------- */
  const KEY = 'regina-cart-v1';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} emit(); };
  const listeners = [];
  const emit = () => listeners.forEach(f => f(cart));
  const lineOf = (h, vid) => cart.find(l => l.h === h && l.vid === vid);
  function add(h, vid, qty) {
    const p = byH[h]; if (!p) return;
    const v = p.v.find(x => x.id == vid) || p.v.find(x => x.a) || p.v[0];
    const l = lineOf(h, v.id);
    if (l) l.q += qty || 1; else cart.push({ h, vid: v.id, q: qty || 1 });
    save(); Cart.open();
  }
  function setQty(h, vid, q) {
    const l = lineOf(h, vid); if (!l) return;
    l.q = q; if (l.q <= 0) cart = cart.filter(x => x !== l);
    save();
  }
  const lines = () => cart.map(l => { const p = byH[l.h]; const v = p && p.v.find(x => x.id == l.vid); return p && v ? { ...l, p, v } : null; }).filter(Boolean);
  const subtotal = () => lines().reduce((s, l) => s + l.v.p * l.q, 0);
  const count = () => cart.reduce((s, l) => s + l.q, 0);
  // Real Shopify cart permalink → regina.com.mx checkout with these variants.
  function checkoutUrl(lead) {
    const items = cart.map(l => l.vid + ':' + l.q).join(',');
    const q = new URLSearchParams();
    if (lead) {
      if (lead.email) q.set('checkout[email]', lead.email);
      if (lead.first) q.set('checkout[shipping_address][first_name]', lead.first);
      if (lead.last) q.set('checkout[shipping_address][last_name]', lead.last);
      if (lead.phone) q.set('checkout[shipping_address][phone]', lead.phone);
      if (lead.zip) q.set('checkout[shipping_address][zip]', lead.zip);
      if (lead.address) q.set('checkout[shipping_address][address1]', lead.address);
      if (lead.city) q.set('checkout[shipping_address][city]', lead.city);
      q.set('checkout[shipping_address][country]', 'MX');
    }
    return STORE + '/cart/' + items + (q.toString() ? '?' + q.toString() : '');
  }

  /* ---------- drawer (markup themed by each version's CSS) ---------- */
  const Cart = {
    el: null,
    open() { if (!this.el) return; this.render(); this.el.classList.add('is-open'); document.documentElement.classList.add('rg-lock'); },
    close() { if (!this.el) return; this.el.classList.remove('is-open'); document.documentElement.classList.remove('rg-lock'); },
    upsell: null,
    render() {
      const el = this.el; if (!el) return;
      const ls = lines(); const st = subtotal(); const left = Math.max(0, FREE_SHIP - st);
      const pct = Math.min(100, st / FREE_SHIP * 100);
      el.querySelector('[data-cart-count]').textContent = count();
      el.querySelector('[data-cart-ship]').innerHTML = left > 0
        ? `Te faltan <b>${money(left)}</b> para obtener <b>envío gratis</b>`
        : `¡Felicidades! Tu pedido tiene <b>envío gratis</b>`;
      el.querySelector('[data-cart-bar]').style.width = pct + '%';
      const body = el.querySelector('[data-cart-lines]');
      body.innerHTML = ls.length ? ls.map(l => `
        <div class="cl">
          <a class="cl-img" href="product.html?h=${l.h}"><img src="${img(l.p.img[0], 240)}" alt="${l.p.t}"></a>
          <div class="cl-info">
            <a class="cl-t" href="product.html?h=${l.h}">${l.p.t}</a>
            ${l.v.t !== 'Default Title' ? `<div class="cl-v">${l.v.t}</div>` : ''}
            <div class="cl-row">
              <div class="qty"><button aria-label="Quitar uno" data-q="${l.h}|${l.vid}|${l.q - 1}">−</button><span>${l.q}</span><button aria-label="Agregar uno" data-q="${l.h}|${l.vid}|${l.q + 1}">+</button></div>
              <div class="cl-p">${l.v.c ? `<s>${money(l.v.c * l.q)}</s>` : ''}${money(l.v.p * l.q)}</div>
            </div>
            <button class="cl-rm" data-q="${l.h}|${l.vid}|0">Eliminar</button>
          </div>
        </div>`).join('') : `<div class="cart-empty"><p>Tu carrito está vacío</p><a class="btn" href="index.html#shop" data-cart-close>Explorar colección</a></div>`;
      el.querySelector('[data-cart-sub]').textContent = money(st);
      el.querySelector('[data-cart-foot]').hidden = !ls.length;
      const up = el.querySelector('[data-cart-up]');
      if (up) {
        const inCart = new Set(cart.map(l => l.h));
        const picks = (this.upsell || []).map(find).filter(p => p && !inCart.has(p.h)).slice(0, 6);
        up.closest('[data-cart-upwrap]').hidden = !picks.length || !ls.length;
        up.innerHTML = picks.map(p => `
          <div class="cu">
            <img src="${img(p.img[0], 200)}" alt="">
            <div><div class="cu-t">${shortName(p)}</div><div class="cu-p">${money(minPrice(p))}</div></div>
            <button class="cu-add" data-add="${p.h}" aria-label="Agregar ${p.t}">+</button>
          </div>`).join('');
      }
    }
  };

  /* ---------- lead capture → Regina's Klaviyo (public site key from regina.com.mx) ---------- */
  // Sent BEFORE redirecting to checkout, so the contact + cart exist even if the shopper never pays.
  // Set window.REGINA_LEADS_OFF = true to disable (e.g. internal testing).
  const KLAVIYO_SITE = 'XVZupa', KREV = '2024-10-15';
  const e164 = ph => { const d = (ph || '').replace(/\D/g, ''); if (d.length === 10) return '+52' + d; if (d.length === 12 && d.startsWith('52')) return '+' + d; return null; };
  function sendLead(lead, stage) {
    if (window.REGINA_LEADS_OFF || !lead || !lead.email) return Promise.resolve(false);
    const ls = lines();
    const cart = ls.map(l => ({ producto: l.p.t, variante: l.v.t, cantidad: l.q, precio: l.v.p, url: STORE + '/products/' + l.p.h, imagen: l.p.img[0] }));
    const phone = e164(lead.phone);
    const profile = { email: lead.email.trim(), first_name: lead.first || undefined, last_name: lead.last || undefined,
      location: { zip: lead.zip || undefined, city: lead.city || undefined, country: 'Mexico' },
      properties: { telefono_capturado: lead.phone || '', acepta_novedades: !!lead.news, origen_lead: 'Sitio preview · popup antes del checkout' } };
    if (phone) profile.phone_number = phone;
    const post = (path, data) => fetch(`https://a.klaviyo.com/client/${path}/?company_id=${KLAVIYO_SITE}`, {
      method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json', revision: KREV }, body: JSON.stringify({ data })
    }).then(r => r.ok).catch(() => false);
    const reqs = [
      post('profiles', { type: 'profile', attributes: profile }),
      post('events', { type: 'event', attributes: {
        metric: { data: { type: 'metric', attributes: { name: 'Lead antes de checkout' } } },
        profile: { data: { type: 'profile', attributes: phone ? { email: profile.email, phone_number: phone } : { email: profile.email } } },
        value: subtotal(), value_currency: 'MXN', unique_id: 'lead-' + Date.now(),
        properties: { etapa: stage, subtotal: subtotal(), piezas: count(), productos: cart, checkout_url: checkoutUrl(lead) } } })
    ];
    // never block the shopper more than ~2.5s
    return Promise.race([Promise.all(reqs).then(r => r.every(Boolean)), new Promise(res => setTimeout(() => res(false), 2500))]);
  }

  /* ---------- checkout popup (lead capture → checkout page) ---------- */
  const LEAD = 'regina-lead';
  const getLead = () => { try { return JSON.parse(localStorage.getItem(LEAD) || 'null'); } catch (e) { return null; } };
  function openCheckoutPopup() {
    let m = document.getElementById('rg-co');
    if (!m) {
      m = document.createElement('div');
      m.id = 'rg-co'; m.className = 'co-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'co-h');
      m.innerHTML = `
        <div class="co-scrim" data-co-close></div>
        <div class="co-card">
          <button class="co-x" data-co-close aria-label="Cerrar">×</button>
          <div class="co-side">
            <img src="media/brand/logo.svg" alt="Regina" class="co-logo">
            <div class="co-sum" data-co-sum></div>
          </div>
          <form class="co-form" novalidate>
            <p class="co-eyebrow">Paso 1 de 2 · Tus datos</p>
            <h2 id="co-h">Casi listo para tu descanso</h2>
            <p class="co-sub">Te enviamos la confirmación y el seguimiento de tu pedido. Pagas en el checkout seguro de regina.com.mx</p>
            <div class="co-grid">
              <label>Nombre<input name="first" autocomplete="given-name" required></label>
              <label>Apellido<input name="last" autocomplete="family-name" required></label>
              <label class="full">Correo electrónico<input name="email" type="email" autocomplete="email" required></label>
              <label class="full">Teléfono / WhatsApp<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
              <label>Código postal<input name="zip" autocomplete="postal-code" inputmode="numeric" maxlength="5"></label>
              <label>Ciudad<input name="city" autocomplete="address-level2"></label>
            </div>
            <label class="co-opt"><input type="checkbox" name="news" checked> Quiero recibir novedades de Regina</label>
            <p class="co-err" role="alert" hidden>Completa nombre, apellido, correo y un teléfono de 10 dígitos</p>
            <button class="btn btn-block co-go" type="submit">Continuar al pago</button>
            <ul class="co-trust"><li>Envío gratis desde $1,499</li><li>3 meses sin intereses</li><li>Entregas a todo México</li></ul>
          </form>
        </div>`;
      document.body.appendChild(m);
      m.addEventListener('click', e => { if (e.target.closest('[data-co-close]')) closeCo(); });
      m.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const f = new FormData(e.target); const lead = Object.fromEntries(f.entries());
        const ok = lead.first && lead.last && /\S+@\S+\.\S+/.test(lead.email) && !!e164(lead.phone);
        m.querySelector('.co-err').hidden = !!ok; if (!ok) return;
        lead.news = !!f.get('news');
        try { localStorage.setItem(LEAD, JSON.stringify(lead)); } catch (er) {}
        document.dispatchEvent(new CustomEvent('regina:lead', { detail: lead }));
        const btn = m.querySelector('.co-go'); btn.disabled = true; btn.textContent = 'Guardando tus datos…';
        sendLead(lead, 'popup').finally(() => { location.href = 'checkout.html'; });
      });
    }
    const lead = getLead() || {};
    m.querySelectorAll('input[name]').forEach(i => { if (lead[i.name] && i.type !== 'checkbox') i.value = lead[i.name]; });
    m.querySelector('[data-co-sum]').innerHTML = lines().map(l => `<div class="co-li"><img src="${img(l.p.img[0], 120)}" alt=""><span class="co-q">${l.q}</span><div>${l.p.t}<small>${l.v.t !== 'Default Title' ? l.v.t : ''}</small></div><b>${money(l.v.p * l.q)}</b></div>`).join('') + `<div class="co-tot"><span>Subtotal</span><b>${money(subtotal())}</b></div>`;
    Cart.close();
    m.classList.add('is-open'); document.documentElement.classList.add('rg-lock');
    setTimeout(() => m.querySelector('input[name=first]').focus(), 50);
  }
  function closeCo() { const m = document.getElementById('rg-co'); if (m) m.classList.remove('is-open'); document.documentElement.classList.remove('rg-lock'); }

  /* ---------- global wiring ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]');
    if (a) { e.preventDefault(); add(a.dataset.add, a.dataset.vid, +(a.dataset.qty || 1)); return; }
    const q = e.target.closest('[data-q]');
    if (q) { const [h, vid, n] = q.dataset.q.split('|'); setQty(h, +vid, +n); return; }
    if (e.target.closest('[data-cart-open]')) { e.preventDefault(); Cart.open(); return; }
    if (e.target.closest('[data-cart-close]')) { Cart.close(); return; }
    if (e.target.closest('[data-checkout]')) { e.preventDefault(); if (count()) openCheckoutPopup(); return; }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { Cart.close(); closeCo(); } });
  listeners.push(() => { Cart.render(); document.querySelectorAll('[data-count]').forEach(n => { n.textContent = count(); n.hidden = !count(); }); });
  document.addEventListener('DOMContentLoaded', () => { Cart.el = document.querySelector('[data-cart]'); emit(); });

  // Hover-to-play product videos + autoplay-in-view loops (respects reduced motion).
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  document.addEventListener('DOMContentLoaded', () => {
    const vids = document.querySelectorAll('video[data-inview]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (RM.matches) return; en.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .25 });
      vids.forEach(v => io.observe(v));
    }
  });
  document.addEventListener('mouseover', e => { const c = e.target.closest('[data-hovervid]'); if (!c || RM.matches) return; const v = c.querySelector('video'); if (v) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); } });
  document.addEventListener('mouseout', e => { const c = e.target.closest('[data-hovervid]'); if (!c || c.contains(e.relatedTarget)) return; const v = c.querySelector('video'); if (v) v.pause(); });

  window.RGK = { RG, find, inCol, money, money0, img, minPrice, shortName, add, setQty, lines, subtotal, count, checkoutUrl, getLead, Cart, FREE_SHIP, openCheckoutPopup, STORE, sendLead, e164 };
})();
