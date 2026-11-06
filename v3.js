/* Regina v3 = v1 (Weezie 1:1) with single one-shot full-width videos in the two video sections (like weezietowels.com) */
(function () {
  const swap = () => {
    const vh = document.querySelectorAll('.vhero');
    const SRC = [['hero-a', 'Recámara vestida con el juego de edredón Majestic 3D Tessa Red'], ['hero-b', 'Cobertor Nuvó Conrad Cedro visto desde arriba']];
    vh.forEach((s, i) => {
      const src = SRC[i]; if (!src) return;
      s.classList.add('vhero--one');
      s.setAttribute('aria-label', src[1]);
      s.querySelectorAll('video').forEach(v => v.remove());
      s.insertAdjacentHTML('afterbegin',
        `<video class="d" autoplay muted loop playsinline preload="metadata" poster="media/v3/${src[0]}.jpg" data-inview><source src="media/v3/${src[0]}.mp4" type="video/mp4"></video>` +
        `<video class="m" autoplay muted loop playsinline preload="metadata" poster="media/v3/${src[0]}-m.jpg" data-inview><source src="media/v3/${src[0]}-m.mp4" type="video/mp4"></video>`);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting ? en.target.play().catch(() => {}) : en.target.pause()), { threshold: .2 });
        s.querySelectorAll('video').forEach(v => io.observe(v));
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(swap, 0)); else setTimeout(swap, 0);
})();
