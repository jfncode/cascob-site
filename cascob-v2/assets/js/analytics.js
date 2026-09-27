(function() {
  'use strict';

  // PLACEHOLDERS — Jefferson substitui antes do deploy
  const GA4_ID = 'G-6MLY881RCB';
  const ADS_ID = 'AW-984072087';
  const ADS_CONVERSION_LABEL = 'P4cDCJ_eg4QdEJf_ntUD'; // Conversão "Contato" (Google Ads)
  const PIXEL_ID = '000000000000000';

  const hasGA = GA4_ID && GA4_ID !== 'G-XXXXXXXXXX';
  const hasAds = ADS_ID && ADS_ID !== 'AW-XXXXXXXXX';
  const hasPixel = PIXEL_ID && PIXEL_ID !== '000000000000000';

  // ── Google gtag.js (GA4 + Google Ads) ────────────────────────────────
  if (hasGA || hasAds) {
    // Um único gtag.js serve os dois produtos; carrega usando o 1º ID ativo.
    const loaderId = hasGA ? GA4_ID : ADS_ID;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${loaderId}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());

    if (hasGA) {
      gtag('config', GA4_ID, {
        anonymize_ip: true,
        send_page_view: true
      });
    }
    if (hasAds) {
      gtag('config', ADS_ID);
    }
  }

  if (!hasGA) {
    console.info('[Cascob] GA4 desativado (substitua GA4_ID em analytics.js).');
  }
  if (!hasAds) {
    console.info('[Cascob] Google Ads desativado (substitua ADS_ID em analytics.js).');
  }

  // ── Meta Pixel ───────────────────────────────────────────────────────
  if (hasPixel) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  } else {
    console.info('[Cascob] Meta Pixel desativado (substitua PIXEL_ID em analytics.js).');
  }

  // ── Listener central de eventos ──────────────────────────────────────
  window.addEventListener('cascob:event', (e) => {
    const { event, params } = e.detail;

    if (hasGA && window.gtag) {
      window.gtag('event', event, params);
    }

    if (hasPixel && window.fbq) {
      const fbEventName = mapToFbEvent(event);
      if (fbEventName) {
        window.fbq('trackCustom', fbEventName, params);
      }
    }

    if (typeof window.console !== 'undefined' && (!hasGA && !hasPixel)) {
      console.log('[Cascob analytics — sem ID configurado]', event, params);
    }
  });

  function mapToFbEvent(event) {
    const map = {
      'whatsapp_click': 'WhatsAppClick',
      'formulario_enviado': 'Lead',
      'servico_expandido': 'ServiceExpanded',
      'pagina_seo_visitada': 'PageView',
      'midia_visualizada': 'MediaViewed',
      'theme_toggle': 'ThemeToggle',
      'conversion': 'Lead'
    };
    return map[event] || null;
  }

  // Página /obrigado dispara a conversão (funciona com /obrigado, /obrigado/ e /obrigado/index.html)
  const convPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  if (convPath.endsWith('/obrigado') || convPath.endsWith('/obrigado.html')) {
    // Conversão "Contato" do Google Ads (send_to com o rótulo específico)
    if (hasAds && window.gtag) {
      gtag('event', 'conversion', { 'send_to': ADS_ID + '/' + ADS_CONVERSION_LABEL });
    }
    // Evento interno (GA4 + Meta Pixel via listener central)
    window.dispatchEvent(new CustomEvent('cascob:event', { detail: { event: 'conversion', params: {} } }));
  }
})();
