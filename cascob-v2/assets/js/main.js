(function() {
  'use strict';

  // Util: dispara evento custom (analytics escuta em analytics.js)
  function track(event, params) {
    window.dispatchEvent(new CustomEvent('cascob:event', { detail: { event, params: params || {} } }));
  }
  window.cascobTrack = track;

  // Header: encolhe ao rolar
  const header = document.getElementById('site-header');
  if (header) {
    let scrolled = false;
    const onScroll = () => {
      const next = window.scrollY > 30;
      if (next !== scrolled) {
        scrolled = next;
        header.classList.toggle('nav--scrolled', scrolled);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Theme toggle (claro/escuro), persistido em localStorage
  const themeKey = 'cascob:theme';
  const html = document.documentElement;
  const savedTheme = (function() {
    try { return localStorage.getItem(themeKey); } catch (e) { return null; }
  })();
  if (savedTheme === 'claro' || savedTheme === 'escuro') {
    html.dataset.mode = savedTheme;
  }
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = html.dataset.mode === 'escuro' ? 'claro' : 'escuro';
      html.dataset.mode = next;
      try { localStorage.setItem(themeKey, next); } catch (e) {}
      track('theme_toggle', { tema: next });
    });
  }

  // Serviços accordion (cards 1–6)
  document.querySelectorAll('.serv-card[aria-expanded]').forEach(card => {
    card.addEventListener('click', () => {
      const expanded = card.getAttribute('aria-expanded') === 'true';
      const detailId = card.getAttribute('aria-controls');
      const detail = document.getElementById(detailId);
      if (!detail) return;

      // Fecha outros
      document.querySelectorAll('.serv-card[aria-expanded="true"]').forEach(other => {
        if (other !== card) {
          other.setAttribute('aria-expanded', 'false');
          const otherDetail = document.getElementById(other.getAttribute('aria-controls'));
          if (otherDetail) otherDetail.classList.remove('is-open');
        }
      });

      card.setAttribute('aria-expanded', String(!expanded));
      detail.classList.toggle('is-open', !expanded);

      if (!expanded) {
        track('servico_expandido', { servico: card.dataset.servico });
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const item = btn.closest('.faq__item');
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      item.classList.toggle('is-open', !expanded);
      if (answer) {
        answer.style.maxHeight = expanded ? '0' : answer.scrollHeight + 'px';
      }
      btn.querySelector('.faq__plus').textContent = expanded ? '+' : '−';
    });
  });

  // WhatsApp click tracking (delegate)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-wa-source]');
    if (!link) return;
    track('whatsapp_click', { local: link.dataset.waSource });
  });

  // Counter animado (números na seção Resultados)
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const animate = (el) => {
      const target = parseInt(el.dataset.counter, 10);
      if (isNaN(target)) return;
      const duration = 1200;
      const start = performance.now();
      const initialText = el.textContent;
      const isMil = initialText.includes('mil');
      const tick = (now) => {
        const elapsed = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const current = Math.round(target * eased);
        el.textContent = isMil ? (current >= 1000 ? (current / 1000).toFixed(0) + ' mil' : String(current)) : String(current);
        if (elapsed < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }
})();
