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

  // Form leve: monta link WhatsApp e abre
  const form = document.getElementById('form-leve');
  if (form) {
    const errorEl = document.getElementById('form-error');
    const phoneInput = form.querySelector('input[name="telefone"]');

    // Máscara de telefone (17) 99999-9999
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 0) v = '(' + v;
        if (v.length > 3) v = v.slice(0, 3) + ') ' + v.slice(3);
        if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
        else if (v.length > 9) v = v.slice(0, 9) + '-' + v.slice(9);
        e.target.value = v;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = (data.get('nome') || '').toString().trim();
      const telefone = (data.get('telefone') || '').toString().trim();
      const faixa = (data.get('faixa') || '').toString();

      const errors = [];
      if (nome.length < 2) errors.push('Por favor, digite seu nome.');
      const phoneDigits = telefone.replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.push('Telefone precisa ter DDD + número (10 ou 11 dígitos).');
      if (!faixa) errors.push('Escolha uma faixa de dívida.');

      if (errors.length) {
        errorEl.textContent = errors.join(' ');
        errorEl.hidden = false;
        if (errors[0].includes('nome')) form.querySelector('input[name="nome"]').setAttribute('aria-invalid', 'true');
        if (errors[0].includes('Telefone')) form.querySelector('input[name="telefone"]').setAttribute('aria-invalid', 'true');
        return;
      }

      errorEl.hidden = true;
      form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));

      const faixaLegivel = {
        'ate-3k': 'até R$ 3.000',
        '3k-10k': 'entre R$ 3 mil e R$ 10 mil',
        '10k-30k': 'entre R$ 10 mil e R$ 30 mil',
        '30k+': 'acima de R$ 30 mil',
        'nao-sei': 'ainda não sei o valor exato'
      }[faixa] || faixa;

      const msg = `Oi, sou ${nome}. Tenho dívida ${faixaLegivel} e quero a análise sob consulta do meu CPF. Telefone: ${telefone}.`;
      const url = `https://wa.me/5517991999006?text=${encodeURIComponent(msg)}`;

      track('formulario_enviado', { faixa });
      track('whatsapp_click', { local: 'form' });

      window.open(url, '_blank', 'noopener');
      window.location.href = '/obrigado.html';
    });
  }
})();
