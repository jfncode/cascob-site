(function() {
  'use strict';

  const reelsContainer = document.getElementById('reels-container');
  const slidesTrack = document.getElementById('slides-track');
  const slidesDots = document.getElementById('slides-dots');
  const slidesPrev = document.getElementById('slides-prev');
  const slidesNext = document.getElementById('slides-next');

  const config = window.MIDIA || { reels: [], slides: [] };

  // ── REELS ─────────────────────────────────────────────────────────────
  function renderReels() {
    if (!reelsContainer) return;
    if (!config.reels || !config.reels.length) {
      const sectionTitle = reelsContainer.previousElementSibling;
      if (sectionTitle && sectionTitle.classList.contains('midia__sub')) {
        sectionTitle.style.display = 'none';
      }
      reelsContainer.style.display = 'none';
      return;
    }

    config.reels.forEach((reel, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'midia__reel';
      wrapper.innerHTML = `
        <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/${encodeURIComponent(reel.id)}/" data-instgrm-version="14" style="background:transparent;border:0;margin:0;padding:0;width:100%;">
          <a href="https://www.instagram.com/reel/${encodeURIComponent(reel.id)}/" target="_blank" rel="noopener" class="midia__reel-fallback">
            ${reel.titulo ? reel.titulo + '<br><br>' : ''}
            Ver no <strong>@cascobsjrp</strong> →
          </a>
        </blockquote>
      `;
      reelsContainer.appendChild(wrapper);

      if ('IntersectionObserver' in window) {
        const trackOnce = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            window.cascobTrack && window.cascobTrack('midia_visualizada', { tipo: 'reel', indice: idx });
            trackOnce.disconnect();
          }
        }, { threshold: 0.5 });
        trackOnce.observe(wrapper);
      }
    });

    if ('IntersectionObserver' in window) {
      const loader = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadInstagramScript();
          loader.disconnect();
        }
      }, { rootMargin: '200px' });
      loader.observe(reelsContainer);
    } else {
      loadInstagramScript();
    }
  }

  let igScriptLoaded = false;
  function loadInstagramScript() {
    if (igScriptLoaded) return;
    igScriptLoaded = true;
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  }

  // ── SLIDES ────────────────────────────────────────────────────────────
  function renderSlides() {
    if (!slidesTrack) return;
    if (!config.slides || !config.slides.length) {
      const sectionTitle = document.querySelector('#midia .midia__sub:nth-of-type(2)');
      if (sectionTitle) sectionTitle.style.display = 'none';
      const slidesContainer = slidesTrack.parentElement;
      if (slidesContainer) slidesContainer.style.display = 'none';
      return;
    }

    config.slides.forEach((slide, idx) => {
      const div = document.createElement('div');
      div.className = 'slides__slide';
      div.setAttribute('role', 'group');
      div.setAttribute('aria-roledescription', 'slide');
      div.setAttribute('aria-label', `Slide ${idx + 1} de ${config.slides.length}`);
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = slide.alt || `Slide ${idx + 1}`;
      img.loading = 'lazy';
      img.width = 600;
      img.height = 600;
      div.appendChild(img);
      slidesTrack.appendChild(div);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
      dot.setAttribute('aria-current', idx === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => goToSlide(idx));
      slidesDots.appendChild(dot);

      if ('IntersectionObserver' in window) {
        const trackOnce = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            window.cascobTrack && window.cascobTrack('midia_visualizada', { tipo: 'slide', indice: idx });
            trackOnce.disconnect();
          }
        }, { threshold: 0.6, root: slidesTrack });
        trackOnce.observe(div);
      }
    });

    setupSlideNav();
  }

  function setupSlideNav() {
    const slides = slidesTrack.querySelectorAll('.slides__slide');
    if (!slides.length) return;

    slidesPrev.addEventListener('click', () => {
      slidesTrack.scrollBy({ left: -slides[0].offsetWidth - 16, behavior: 'smooth' });
    });
    slidesNext.addEventListener('click', () => {
      slidesTrack.scrollBy({ left: slides[0].offsetWidth + 16, behavior: 'smooth' });
    });

    slidesTrack.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); slidesPrev.click(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); slidesNext.click(); }
    });

    if ('IntersectionObserver' in window) {
      const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const slide = entry.target;
            const idx = Array.from(slides).indexOf(slide);
            slidesDots.querySelectorAll('button').forEach((dot, i) => {
              dot.setAttribute('aria-current', i === idx ? 'true' : 'false');
            });
            slidesPrev.disabled = idx === 0;
            slidesNext.disabled = idx === slides.length - 1;
          }
        });
      }, { root: slidesTrack, threshold: 0.6 });
      slides.forEach(s => slideObserver.observe(s));
    }
  }

  function goToSlide(idx) {
    const slides = slidesTrack.querySelectorAll('.slides__slide');
    if (slides[idx]) {
      slidesTrack.scrollTo({ left: slides[idx].offsetLeft - slidesTrack.offsetLeft, behavior: 'smooth' });
    }
  }

  // ── EMBED LOADER (centralizado) ──────────────────────────────────────
  // Carrega o embed.js do Instagram quando QUALQUER blockquote .instagram-media
  // entra na viewport — cobre seção destaques (hardcoded) + seção mídia (gerados via JS).
  function initEmbedLoader() {
    const candidates = document.querySelectorAll('.instagram-media');
    if (!candidates.length) return;
    if ('IntersectionObserver' in window) {
      const loader = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            loadInstagramScript();
            loader.disconnect();
            return;
          }
        }
      }, { rootMargin: '200px' });
      candidates.forEach(c => loader.observe(c));
    } else {
      loadInstagramScript();
    }
  }

  // ── INIT ──────────────────────────────────────────────────────────────
  function init() {
    renderReels();
    renderSlides();
    initEmbedLoader();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
