# Cascob Site Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever o site Cascob como HTML/CSS/JS estático puro, mantendo o visual atual e adicionando seção de Mídia, formulário leve, 2 páginas SEO, schema.org, analytics e modo escuro polido.

**Architecture:** Pasta nova `cascob-v2/` ao lado de `project/` (que fica intacto). Single-page principal + 4 páginas auxiliares. Sem framework. Vanilla JS modular (~10KB total). Reels do Instagram lazy-loaded via Intersection Observer. Slides em scroll-snap CSS. Form leve monta link `wa.me` no client.

**Tech Stack:** HTML5, CSS3 (custom properties, scroll-snap, color-mix), JavaScript ES2020 vanilla, Schema.org JSON-LD, Google Fonts self-hosted (Cormorant Garamond + Manrope), Google Analytics 4, Meta Pixel.

**Working dir:** `C:\Users\PICHAU\Downloads\site cascob-handoff\site-cascob\` (referido como `<root>` no plano).

**Spec base:** [docs/superpowers/specs/2026-05-08-cascob-site-overhaul-design.md](../specs/2026-05-08-cascob-site-overhaul-design.md)

---

## Task 0: Setup — Git, estrutura de pastas, copiar assets reutilizáveis

**Files:**
- Create: `<root>/.gitignore`
- Create: `<root>/cascob-v2/` (e subdiretórios)
- Copy: `<root>/project/img/logo-cascob.png` → `<root>/cascob-v2/assets/img/logo-cascob.png`

- [ ] **Step 1: Inicializar repositório git no diretório raiz**

```bash
cd "C:/Users/PICHAU/Downloads/site cascob-handoff/site-cascob"
git init
git add docs/
git commit -m "docs: spec and plan for v2 overhaul"
```

- [ ] **Step 2: Criar `.gitignore`**

Criar `<root>/.gitignore`:
```
.DS_Store
Thumbs.db
node_modules/
*.log
.env
.env.local
```

- [ ] **Step 3: Criar estrutura de pastas do v2**

```bash
mkdir -p cascob-v2/assets/css cascob-v2/assets/js cascob-v2/assets/img/slides cascob-v2/assets/img/icons cascob-v2/assets/fonts cascob-v2/servicos
```

- [ ] **Step 4: Copiar logo PNG do protótipo (reaproveitar)**

```bash
cp project/img/logo-cascob.png cascob-v2/assets/img/logo-cascob.png
```

- [ ] **Step 5: Verificar estrutura criada**

```bash
ls -la cascob-v2/
ls -la cascob-v2/assets/
```

Saída esperada: `assets/`, `servicos/` na raiz; `css/ js/ img/ fonts/` em assets.

- [ ] **Step 6: Commit**

```bash
git add .gitignore cascob-v2/
git commit -m "chore: scaffold cascob-v2 directory structure"
```

---

## Task 1: Self-host fontes (Cormorant Garamond + Manrope)

**Files:**
- Create: `<root>/cascob-v2/assets/fonts/cormorant-garamond-500.woff2`
- Create: `<root>/cascob-v2/assets/fonts/cormorant-garamond-500-italic.woff2`
- Create: `<root>/cascob-v2/assets/fonts/cormorant-garamond-600.woff2`
- Create: `<root>/cascob-v2/assets/fonts/manrope-400.woff2`
- Create: `<root>/cascob-v2/assets/fonts/manrope-500.woff2`
- Create: `<root>/cascob-v2/assets/fonts/manrope-600.woff2`
- Create: `<root>/cascob-v2/assets/fonts/manrope-700.woff2`
- Create: `<root>/cascob-v2/assets/fonts/fonts.css`

- [ ] **Step 1: Baixar Cormorant Garamond (3 variantes)**

```bash
mkdir -p cascob-v2/assets/fonts
cd cascob-v2/assets/fonts

curl -o cormorant-garamond-500.woff2 "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.woff2"
curl -o cormorant-garamond-500-italic.woff2 "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjQFOmOzVpKO_5fwcs.woff2"
curl -o cormorant-garamond-600.woff2 "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjorvVKsS6V7w.woff2"
```

Se algum 404: pegar versão atualizada em `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap` (User-Agent moderno) — extrair URLs `.woff2` da resposta.

- [ ] **Step 2: Baixar Manrope (4 pesos)**

```bash
curl -o manrope-400.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2"
curl -o manrope-500.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSg.woff2"
curl -o manrope-600.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRgg6xSg.woff2"
curl -o manrope-700.woff2 "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRgg2xSg.woff2"
```

- [ ] **Step 3: Verificar arquivos baixados (todos > 10KB)**

```bash
ls -la cascob-v2/assets/fonts/
```

Saída esperada: 7 arquivos `.woff2`, cada um entre 15KB e 80KB.

- [ ] **Step 4: Criar `fonts.css`**

Criar `<root>/cascob-v2/assets/fonts/fonts.css`:
```css
@font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:500;font-display:swap;src:url('cormorant-garamond-500.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
@font-face{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-display:swap;src:url('cormorant-garamond-500-italic.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
@font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:600;font-display:swap;src:url('cormorant-garamond-600.woff2') format('woff2');}
@font-face{font-family:'Manrope';font-style:normal;font-weight:400;font-display:swap;src:url('manrope-400.woff2') format('woff2');}
@font-face{font-family:'Manrope';font-style:normal;font-weight:500;font-display:swap;src:url('manrope-500.woff2') format('woff2');}
@font-face{font-family:'Manrope';font-style:normal;font-weight:600;font-display:swap;src:url('manrope-600.woff2') format('woff2');}
@font-face{font-family:'Manrope';font-style:normal;font-weight:700;font-display:swap;src:url('manrope-700.woff2') format('woff2');}
```

- [ ] **Step 5: Commit**

```bash
git add cascob-v2/assets/fonts/
git commit -m "feat(fonts): self-host Cormorant Garamond + Manrope"
```

---

## Task 2: Portar styles.css (sem mudanças visuais) + tokens estendidos

**Files:**
- Create: `<root>/cascob-v2/assets/css/styles.css`

**Estratégia:** copiar `project/styles.css` literalmente, depois aplicar 5 ajustes incrementais: (1) trocar import de Google Fonts por self-hosted, (2) adicionar tokens novos para mídia/form/skip-link/reduced-motion, (3) adicionar estilos da seção Mídia, (4) adicionar estilos do Form leve, (5) garantir contraste AA no dourado sobre creme.

- [ ] **Step 1: Copiar CSS base do protótipo**

```bash
cp project/styles.css cascob-v2/assets/css/styles.css
```

- [ ] **Step 2: Adicionar import de fontes self-hosted no topo do CSS**

Editar `<root>/cascob-v2/assets/css/styles.css`. No topo absoluto (linha 1), prepender:

```css
@import url('../fonts/fonts.css');

```

- [ ] **Step 3: Adicionar tokens novos no `:root` e `data-mode="escuro"`**

Encontrar bloco `:root {` (linha ~2) e logo antes do fechamento `}` adicionar:
```css
  --gold-readable: #8a6720;
  --focus-ring: 2px solid var(--gold);
  --container-pad: 28px;
  --section-pad-y: clamp(80px, 10vw, 140px);
  --transition-base: 200ms cubic-bezier(.4,0,.2,1);
```

E no bloco `:root[data-mode="escuro"] {` (linha ~26), adicionar:
```css
  --gold-readable: var(--gold-light);
  --focus-ring: 2px solid var(--gold-light);
```

- [ ] **Step 4: Adicionar estilos de acessibilidade ao final do arquivo**

Apender ao final de `styles.css`:
```css

/* ───────── ACESSIBILIDADE ───────── */
.skip-link{position:absolute;top:-100px;left:0;z-index:1000;background:var(--black);color:var(--cream);padding:12px 18px;font-weight:600;text-decoration:none;border-radius:0 0 4px 0;}
.skip-link:focus{top:0;outline:var(--focus-ring);outline-offset:2px;}
:focus-visible{outline:var(--focus-ring);outline-offset:3px;border-radius:2px;}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important;}
  .strip__track{animation:none;}
  .hero-logo img{animation:none;}
}
```

- [ ] **Step 5: Adicionar tokens p/ contraste do dourado em texto pequeno**

Buscar em `styles.css` o seletor `.kicker {` (linha ~200). Substituir o `color: var(--gold-deep);` por `color: var(--gold-readable);`. Isso aumenta contraste em texto miúdo sobre creme.

- [ ] **Step 6: Adicionar estilos da Seção Mídia**

Apender ao final de `styles.css`:
```css

/* ───────── MÍDIA (NOVA) ───────── */
.midia__sub{font-family:var(--serif);font-weight:500;font-size:clamp(22px,2.4vw,30px);color:var(--fg);margin:48px 0 24px;letter-spacing:-0.01em;}
.midia__sub:first-of-type{margin-top:0;}

.midia__reels{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.midia__reels:empty{display:none;}
.midia__reels:empty + h3{display:none;}
@media (max-width:880px){.midia__reels{grid-template-columns:repeat(2,1fr);}}
@media (max-width:580px){.midia__reels{grid-template-columns:1fr;}}

.midia__reel{position:relative;aspect-ratio:9/16;background:var(--bg-alt);border:1px solid var(--line);overflow:hidden;border-radius:6px;display:flex;align-items:center;justify-content:center;}
.midia__reel-fallback{padding:24px;text-align:center;color:var(--fg-soft);font-size:14px;line-height:1.5;}
.midia__reel-fallback a{color:var(--gold-readable);font-weight:600;}

.midia__slides{position:relative;}
.slides__track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:8px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--gold) transparent;}
.slides__track::-webkit-scrollbar{height:6px;}
.slides__track::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px;}
.slides__track:empty + .slides__nav, .slides__track:empty ~ .slides__dots{display:none;}
.slides__slide{flex:0 0 calc((100% - 16px)/2);scroll-snap-align:center;border-radius:6px;overflow:hidden;background:var(--bg-alt);border:1px solid var(--line);aspect-ratio:1/1;}
.slides__slide img{width:100%;height:100%;object-fit:cover;display:block;}
@media (max-width:880px){.slides__slide{flex:0 0 calc((100% - 16px)/1.5);}}
@media (max-width:580px){.slides__slide{flex:0 0 100%;}}

.slides__nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:var(--black);color:var(--cream);border:none;font-size:20px;line-height:1;cursor:pointer;z-index:2;opacity:0.85;transition:opacity var(--transition-base),transform var(--transition-base);display:flex;align-items:center;justify-content:center;}
.slides__nav:hover{opacity:1;transform:translateY(-50%) scale(1.05);}
.slides__nav:disabled{opacity:0.3;cursor:not-allowed;}
.slides__nav--prev{left:-22px;}
.slides__nav--next{right:-22px;}
@media (max-width:580px){.slides__nav--prev{left:8px;}.slides__nav--next{right:8px;}}

.slides__dots{display:flex;gap:8px;justify-content:center;margin-top:20px;}
.slides__dots button{width:8px;height:8px;border-radius:50%;border:none;background:var(--line);padding:0;cursor:pointer;transition:background var(--transition-base),transform var(--transition-base);}
.slides__dots button[aria-current="true"]{background:var(--gold);transform:scale(1.3);}
```

- [ ] **Step 7: Adicionar estilos do Form leve**

Apender ao final de `styles.css`:
```css

/* ───────── FORM LEVE (NOVO) ───────── */
.form-leve{display:grid;grid-template-columns:1fr 1.2fr;gap:clamp(40px,6vw,80px);align-items:start;}
@media (max-width:880px){.form-leve{grid-template-columns:1fr;}}

.form-leve__head{padding-top:8px;}
.form-leve__form{display:flex;flex-direction:column;gap:20px;background:rgba(255,255,255,0.04);padding:32px 28px;border:1px solid rgba(246,241,230,0.12);border-radius:6px;}
.form-leve__form label{display:flex;flex-direction:column;gap:6px;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:color-mix(in oklab,var(--cream) 75%,transparent);font-weight:600;}
.form-leve__form label span{font-weight:600;}

.form-leve__form input[type="text"],.form-leve__form input[type="tel"]{height:48px;padding:0 16px;border:1px solid rgba(246,241,230,0.18);background:rgba(0,0,0,0.4);color:var(--cream);font-family:var(--sans);font-size:16px;border-radius:4px;transition:border-color var(--transition-base),background var(--transition-base);}
.form-leve__form input:focus{outline:none;border-color:var(--gold-light);background:rgba(0,0,0,0.6);}
.form-leve__form input[aria-invalid="true"]{border-color:#ff6b6b;background:rgba(255,107,107,0.08);}

.form-leve__form fieldset{border:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
.form-leve__form legend{font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:color-mix(in oklab,var(--cream) 75%,transparent);font-weight:600;margin-bottom:12px;}
.form-leve__form fieldset label{flex-direction:row;align-items:center;gap:10px;text-transform:none;letter-spacing:0;font-size:15px;font-weight:400;cursor:pointer;color:color-mix(in oklab,var(--cream) 90%,transparent);}
.form-leve__form fieldset input[type="radio"]{width:18px;height:18px;accent-color:var(--gold);cursor:pointer;}

.form-leve__error{color:#ff8b8b;font-size:13px;margin-top:4px;font-weight:500;text-transform:none;letter-spacing:0;}
.form-leve__legal{font-size:12.5px;color:color-mix(in oklab,var(--cream) 55%,transparent);margin:0;line-height:1.5;}
```

- [ ] **Step 8: Estilos para serv-card expansível (accordion)**

Apender ao final de `styles.css`:
```css

/* ───────── SERV-CARD EXPANSÍVEL ───────── */
.serv-card{cursor:pointer;text-align:left;width:100%;font-family:inherit;color:inherit;}
.serv-card[aria-expanded="true"]{border-color:var(--gold);background:color-mix(in oklab,var(--gold) 8%,var(--bg));}
.serv-card__chevron{position:absolute;top:24px;right:20px;font-size:18px;color:var(--gold-readable);transition:transform var(--transition-base);}
.serv-card[aria-expanded="true"] .serv-card__chevron{transform:rotate(180deg);}
.serv-card__detail{grid-column:1/-1;background:var(--bg);border:1px solid var(--gold);border-top:none;padding:0 24px;max-height:0;overflow:hidden;transition:max-height 350ms cubic-bezier(.5,.05,.2,1),padding 200ms;}
.serv-card__detail.is-open{max-height:600px;padding:24px;}
.serv-card__detail p{margin:0;color:var(--fg-soft);line-height:1.65;}
.serv-card__detail-cta{display:inline-flex;align-items:center;gap:6px;margin-top:16px;color:var(--gold-readable);font-weight:600;font-size:14.5px;}

/* serv-card que linka pra página dedicada */
.serv-card--link::after{content:"→";position:absolute;bottom:18px;right:18px;color:var(--gold-readable);font-size:18px;transition:transform var(--transition-base);}
.serv-card--link:hover::after{transform:translateX(3px);}
```

- [ ] **Step 9: Estilos para theme toggle no header**

Apender ao final de `styles.css`:
```css

/* ───────── THEME TOGGLE ───────── */
.theme-toggle{appearance:none;background:none;border:1px solid var(--line);width:36px;height:36px;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--fg);transition:background var(--transition-base),border-color var(--transition-base);}
.theme-toggle:hover{background:color-mix(in oklab,var(--fg) 6%,transparent);border-color:var(--gold);}
.theme-toggle svg{width:16px;height:16px;}
.theme-toggle .icon-moon{display:none;}
:root[data-mode="escuro"] .theme-toggle .icon-sun{display:none;}
:root[data-mode="escuro"] .theme-toggle .icon-moon{display:block;}

/* nav row precisa acomodar toggle */
.nav__actions{display:flex;align-items:center;gap:12px;}
```

- [ ] **Step 10: Estilos para breadcrumb (páginas SEO)**

Apender ao final de `styles.css`:
```css

/* ───────── BREADCRUMB ───────── */
.breadcrumb{display:flex;flex-wrap:wrap;gap:8px;font-size:13px;color:var(--fg-soft);margin:120px 0 32px;padding:0 var(--container-pad);max-width:var(--maxw);margin-left:auto;margin-right:auto;}
.breadcrumb a{color:inherit;text-decoration:underline;text-decoration-color:transparent;transition:text-decoration-color var(--transition-base);}
.breadcrumb a:hover{text-decoration-color:var(--gold-readable);}
.breadcrumb__sep{color:var(--gold-readable);}
.breadcrumb [aria-current="page"]{color:var(--fg);font-weight:500;}
```

- [ ] **Step 11: Verificar que CSS é parseável**

```bash
node -e "const fs=require('fs');const css=fs.readFileSync('cascob-v2/assets/css/styles.css','utf8');console.log('Lines:',css.split('\n').length,'Bytes:',css.length);"
```

Saída esperada: `Lines:` >900, `Bytes:` >25000.

- [ ] **Step 12: Commit**

```bash
git add cascob-v2/assets/css/styles.css
git commit -m "feat(css): port styles + add media/form/a11y/theme-toggle styles"
```

---

## Task 3: HTML do `index.html` — head + header + hero + strip

**Files:**
- Create: `<root>/cascob-v2/index.html`

- [ ] **Step 1: Criar arquivo `index.html` com head completo**

Criar `<root>/cascob-v2/index.html`:
```html
<!DOCTYPE html>
<html lang="pt-BR" data-mode="claro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cascob — Recuperação de Crédito · Limpe seu nome em 30 dias úteis</title>
<meta name="description" content="Há mais de 12 anos a Cascob ajuda famílias brasileiras a limpar o nome, renegociar dívidas e recuperar o crédito. Análise gratuita pelo WhatsApp.">

<link rel="canonical" href="https://DOMINIO_PLACEHOLDER/">
<meta property="og:title" content="Cascob — Limpe seu nome em 30 dias úteis">
<meta property="og:description" content="Análise gratuita do CPF. Mais de 2 mil famílias atendidas em todo o Brasil desde 2012.">
<meta property="og:image" content="https://DOMINIO_PLACEHOLDER/assets/img/og-image.jpg">
<meta property="og:url" content="https://DOMINIO_PLACEHOLDER/">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/assets/img/icons/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon.png">

<link rel="preload" href="/assets/fonts/cormorant-garamond-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/img/logo-cascob.png" as="image">

<link rel="stylesheet" href="/assets/css/styles.css">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CASCOB Recuperação de Créditos",
  "alternateName": "Cascob",
  "url": "https://DOMINIO_PLACEHOLDER/",
  "logo": "https://DOMINIO_PLACEHOLDER/assets/img/logo-cascob.png",
  "telephone": "+55-17-99199-9006",
  "foundingDate": "2012",
  "taxID": "22.770.533/0001-95",
  "areaServed": {"@type": "Country", "name": "Brasil"},
  "sameAs": ["https://instagram.com/cascobsjrp"]
}
</script>
</head>
<body>
<a href="#main" class="skip-link">Pular para o conteúdo</a>

<!-- HEADER + HERO + STRIP serão adicionados nos próximos steps -->

<main id="main">
<!-- seções aqui nos próximos steps -->
</main>

<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/midia-config.js" defer></script>
<script src="/assets/js/instagram-lazy.js" defer></script>
<script src="/assets/js/analytics.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Adicionar `<header>` antes de `<main>`**

Logo após `<a href="#main" class="skip-link">…</a>`, inserir:
```html
<header class="nav" id="site-header">
  <div class="container nav__row">
    <a href="#top" class="logo logo--md" aria-label="Cascob — início">
      <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
      <span class="logo__text">
        <span class="logo__name">CASCOB</span>
        <span class="logo__sub">recuperação de créditos</span>
      </span>
    </a>
    <nav class="nav__links" aria-label="Navegação principal">
      <a href="#sobre">Sobre</a>
      <a href="#servicos">Serviços</a>
      <a href="#midia">Mídia</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#depoimentos">Depoimentos</a>
      <a href="#faq">Dúvidas</a>
    </nav>
    <div class="nav__actions">
      <button class="theme-toggle" type="button" aria-label="Alternar tema claro/escuro" id="theme-toggle">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <a class="btn btn--gold btn--sm" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20do%20meu%20CPF." target="_blank" rel="noopener" data-wa-source="header">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91ZM12 20.16a8.13 8.13 0 0 1-4.15-1.14l-.3-.18-2.63.69.7-2.56-.2-.31A8.16 8.16 0 1 1 12 20.16Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8s-.39-.13-.55.13-.63.8-.78.96-.28.2-.53.07a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16 0-.3-.04-.42s-.55-1.33-.76-1.82-.4-.42-.55-.43h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.85 2c0 1.18.86 2.32.98 2.48s1.69 2.58 4.1 3.62a14 14 0 0 0 1.37.5 3.3 3.3 0 0 0 1.51.1 2.47 2.47 0 0 0 1.62-1.14 2 2 0 0 0 .14-1.14c-.06-.1-.22-.16-.47-.29Z"/></svg>
        Falar agora
      </a>
    </div>
  </div>
</header>
```

- [ ] **Step 3: Adicionar Hero como primeira seção dentro de `<main>`**

Substituir `<!-- seções aqui nos próximos steps -->` por:
```html
<section class="hero" id="top">
  <div class="hero__grid">
    <div class="hero__left">
      <span class="eyebrow"><span class="eyebrow__line"></span> desde 2012 · são josé do rio preto · sp</span>
      <h1 class="hero__title">Limpe seu nome<br>em <em>30 dias úteis.</em></h1>
      <p class="hero__lede">Pagando menos da metade do valor da dívida. Mais de 2 mil clientes assessorados em todo o Brasil. Análise do seu CPF é gratuita e sigilosa.</p>
      <div class="hero__ctas">
        <a class="btn btn--gold" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20do%20meu%20CPF." target="_blank" rel="noopener" data-wa-source="hero">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91ZM12 20.16a8.13 8.13 0 0 1-4.15-1.14l-.3-.18-2.63.69.7-2.56-.2-.31A8.16 8.16 0 1 1 12 20.16Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8s-.39-.13-.55.13-.63.8-.78.96-.28.2-.53.07a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16 0-.3-.04-.42s-.55-1.33-.76-1.82-.4-.42-.55-.43h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.85 2c0 1.18.86 2.32.98 2.48s1.69 2.58 4.1 3.62a14 14 0 0 0 1.37.5 3.3 3.3 0 0 0 1.51.1 2.47 2.47 0 0 0 1.62-1.14 2 2 0 0 0 .14-1.14c-.06-.1-.22-.16-.47-.29Z"/></svg>
          Falar no WhatsApp
        </a>
        <a class="btn btn--ghost" href="#servicos">Ver serviços <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8 L13 8 M9 4 L13 8 L9 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="hero__trust">
        <div><strong>12+</strong><span>anos de mercado</span></div>
        <div><strong>2 mil</strong><span>clientes assessorados</span></div>
        <div><strong>30</strong><span>dias úteis em média</span></div>
      </div>
    </div>
    <div class="hero__right">
      <div class="hero-logo" aria-hidden="true">
        <img src="/assets/img/logo-cascob.png" alt="" width="200" height="200">
      </div>
    </div>
  </div>
</section>

<div class="strip" aria-hidden="true">
  <div class="strip__track">
    <span>limpe seu nome em 30 dias úteis</span>
    <span>pague menos da metade da dívida</span>
    <span>atendimento presencial ou por vídeo</span>
    <span>evite cair em golpes</span>
    <span>mais de 2 mil clientes assessorados</span>
    <span>limpe seu nome em 30 dias úteis</span>
    <span>pague menos da metade da dívida</span>
    <span>atendimento presencial ou por vídeo</span>
    <span>evite cair em golpes</span>
    <span>mais de 2 mil clientes assessorados</span>
  </div>
</div>
```

- [ ] **Step 4: Verificação visual rápida**

Abrir `cascob-v2/index.html` direto no navegador (file://). Esperado: header fixo, hero com h1 grande, ticker dourado animado. Botões Whatsapp e Ver Serviços visíveis.

- [ ] **Step 5: Commit**

```bash
git add cascob-v2/index.html
git commit -m "feat(home): add head, header, hero, strip"
```

---

## Task 4: Index — Sobre + Serviços (com accordion) + Mídia (placeholder)

**Files:**
- Modify: `<root>/cascob-v2/index.html`

- [ ] **Step 1: Adicionar seção Sobre depois de `</div><!-- /strip -->`**

Logo após o fechamento da div `.strip`, dentro de `<main>`:
```html
<section class="section section--cream" id="sobre">
  <div class="container two-col">
    <div class="two-col__left">
      <span class="kicker">01 — sobre nós</span>
      <h2 class="h2">Uma equipe que cuida do seu nome <em>com a seriedade que ele merece.</em></h2>
    </div>
    <div class="two-col__right">
      <p class="prose">A <strong>Cascob</strong> nasceu em São José do Rio Preto com um objetivo simples: trabalhar até atingir o resultado esperado pelo cliente, valorizando a dignidade de quem está com o nome sujo.</p>
      <p class="prose">Em mais de uma década, ajudamos famílias e empresas em todo o Brasil a limpar o CPF, renegociar com bancos e financeiras e — quando preciso — buscar na justiça as compensações previstas em lei.</p>
      <ul class="checks">
        <li>Atendimento presencial ou por vídeo, com equipe humana</li>
        <li>Análise jurídica do seu caso, sem compromisso</li>
        <li>Acompanhamento até o nome sair dos órgãos de proteção</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar seção Serviços com 8 cards (accordion para 6, link para 2)**

Os cards "Dívidas prescritas" (idx 6) e "Fraude no consignado" (idx 7) são links para páginas SEO; os demais expandem inline. Adicionar:

```html
<section class="section section--cream-deep" id="servicos">
  <div class="container">
    <div class="section__head">
      <span class="kicker">02 — o que resolvemos</span>
      <h2 class="h2">Tudo o que pode estar <em>sujando seu nome.</em></h2>
      <p class="prose prose--muted" style="margin-top:18px;">Atuamos em praticamente toda forma de dívida que o brasileiro enfrenta — incluindo as cobranças prescritas e os golpes mais comuns.</p>
    </div>
    <div class="servicos__grid" id="servicos-grid">
      <button type="button" class="serv-card" aria-expanded="false" aria-controls="serv-detail-1" data-servico="lojas-cartoes">
        <span class="serv-card__num">01</span>
        <h3 class="serv-card__t">Lojas e cartões</h3>
        <p class="serv-card__d">Negociação direta com lojistas e administradoras de cartão.</p>
        <span class="serv-card__chevron" aria-hidden="true">▾</span>
      </button>
      <div class="serv-card__detail" id="serv-detail-1" role="region">
        <p>Negociamos diretamente com Renner, Riachuelo, C&A, Marisa, Casas Bahia, Magazine Luiza, Pernambucanas e administradoras de cartão (Itaucard, Bradescard, Credicard, Cetelem, Hipercard). Quando o desconto vem ruim, identificamos juros abusivos e judicializamos pra forçar valor justo.</p>
        <a href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20d%C3%ADvida%20com%20loja%2Fcart%C3%A3o%20e%20quero%20a%20an%C3%A1lise%20gratuita." class="serv-card__detail-cta" target="_blank" rel="noopener" data-wa-source="servico-lojas">Falar agora →</a>
      </div>

      <button type="button" class="serv-card" aria-expanded="false" aria-controls="serv-detail-2" data-servico="protestos">
        <span class="serv-card__num">02</span>
        <h3 class="serv-card__t">Protestos em cartório</h3>
        <p class="serv-card__d">Sustação e baixa de protestos indevidos ou negociados.</p>
        <span class="serv-card__chevron" aria-hidden="true">▾</span>
      </button>
      <div class="serv-card__detail" id="serv-detail-2" role="region">
        <p>Sustamos protestos antes do registro definitivo (medida liminar) e fazemos a baixa de protestos indevidos. Quando o protesto está correto, negociamos diretamente com o credor pra liberar a baixa em até 5 dias úteis após pagamento.</p>
        <a href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20protesto%20em%20cart%C3%B3rio%20e%20quero%20a%20an%C3%A1lise%20gratuita." class="serv-card__detail-cta" target="_blank" rel="noopener" data-wa-source="servico-protestos">Falar agora →</a>
      </div>

      <button type="button" class="serv-card" aria-expanded="false" aria-controls="serv-detail-3" data-servico="cheques">
        <span class="serv-card__num">03</span>
        <h3 class="serv-card__t">Cheques</h3>
        <p class="serv-card__d">Cheques devolvidos, CCF e cobranças bancárias.</p>
        <span class="serv-card__chevron" aria-hidden="true">▾</span>
      </button>
      <div class="serv-card__detail" id="serv-detail-3" role="region">
        <p>Negociamos cheques devolvidos por motivo 11, 12, 13, 14, 21, 22 e fazemos a baixa do CCF (Cadastro de Emitentes de Cheques sem Fundos). Em casos com mais de 5 anos, identificamos prescrição e cancelamos diretamente.</p>
        <a href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20cheque%20devolvido%2FCCF%20e%20quero%20a%20an%C3%A1lise%20gratuita." class="serv-card__detail-cta" target="_blank" rel="noopener" data-wa-source="servico-cheques">Falar agora →</a>
      </div>

      <button type="button" class="serv-card" aria-expanded="false" aria-controls="serv-detail-4" data-servico="bancos">
        <span class="serv-card__num">04</span>
        <h3 class="serv-card__t">Bancos e financiadoras</h3>
        <p class="serv-card__d">Empréstimos, cheque especial, cartão de crédito e financiamentos.</p>
        <span class="serv-card__chevron" aria-hidden="true">▾</span>
      </button>
      <div class="serv-card__detail" id="serv-detail-4" role="region">
        <p>Atuamos contra Itaú, Bradesco, Santander, Banco do Brasil, Caixa, Nubank, Inter, BMG, PAN, Pague Menos. Identificamos juros abusivos, capitalização indevida, tarifas ilegais. Quando o caso pede, ajuizamos revisional bancária com pedido de tutela pra suspender a cobrança.</p>
        <a href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20d%C3%ADvida%20banc%C3%A1ria%20e%20quero%20a%20an%C3%A1lise%20gratuita." class="serv-card__detail-cta" target="_blank" rel="noopener" data-wa-source="servico-bancos">Falar agora →</a>
      </div>

      <button type="button" class="serv-card" aria-expanded="false" aria-controls="serv-detail-5" data-servico="telefonia">
        <span class="serv-card__num">05</span>
        <h3 class="serv-card__t">Telefonia</h3>
        <p class="serv-card__d">Cobranças de operadoras, contestações e baixas indevidas.</p>
        <span class="serv-card__chevron" aria-hidden="true">▾</span>
      </button>
      <div class="serv-card__detail" id="serv-detail-5" role="region">
        <p>Vivo, Claro, TIM, Oi: contestamos cobrança de planos cancelados, fidelidade indevida, equipamentos não devolvidos, faturas após portabilidade. Em inscrição irregular, baixa do nome + indenização por danos morais.</p>
        <a href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20cobran%C3%A7a%20de%20operadora%20e%20quero%20a%20an%C3%A1lise%20gratuita." class="serv-card__detail-cta" target="_blank" rel="noopener" data-wa-source="servico-telefonia">Falar agora →</a>
      </div>

      <button type="button" class="serv-card" aria-expanded="false" aria-controls="serv-detail-6" data-servico="energia">
        <span class="serv-card__num">06</span>
        <h3 class="serv-card__t">Energia e concessionárias</h3>
        <p class="serv-card__d">Faturas em aberto, cortes irregulares e renegociação.</p>
        <span class="serv-card__chevron" aria-hidden="true">▾</span>
      </button>
      <div class="serv-card__detail" id="serv-detail-6" role="region">
        <p>Renegociamos com CPFL, Elektro, Energisa, Sabesp e companhias estaduais. Em corte irregular ou TOI (Termo de Ocorrência) abusivo, ajuizamos pedido de religação imediata + indenização.</p>
        <a href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20d%C3%ADvida%20de%20energia%2F%C3%A1gua%20e%20quero%20a%20an%C3%A1lise%20gratuita." class="serv-card__detail-cta" target="_blank" rel="noopener" data-wa-source="servico-energia">Falar agora →</a>
      </div>

      <a href="/servicos/dividas-prescritas" class="serv-card serv-card--link" data-servico="prescritas">
        <span class="serv-card__num">07</span>
        <h3 class="serv-card__t">Dívidas prescritas</h3>
        <p class="serv-card__d">Ativos, Ipanema, Itapeva, NPL II e cobranças fora do prazo.</p>
      </a>

      <a href="/servicos/fraude-consignado" class="serv-card serv-card--link" data-servico="fraude-consignado">
        <span class="serv-card__num">08</span>
        <h3 class="serv-card__t">Fraude no consignado</h3>
        <p class="serv-card__d">Empréstimos consignados não solicitados, com restituição.</p>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Adicionar seção Mídia (estrutura, JS popula depois)**

Logo após `</section><!-- servicos -->`:
```html
<section class="section section--cream" id="midia" aria-labelledby="midia-title">
  <div class="container">
    <div class="section__head">
      <span class="kicker">03 — mídia</span>
      <h2 class="h2" id="midia-title">Cascob na prática.</h2>
      <p class="prose prose--muted" style="margin-top:18px;">Conteúdo do nosso Instagram <a href="https://instagram.com/cascobsjrp" target="_blank" rel="noopener" style="color:var(--gold-readable);font-weight:600;">@cascobsjrp</a>.</p>
    </div>

    <h3 class="midia__sub">Vídeos</h3>
    <div class="midia__reels" id="reels-container" aria-live="polite"></div>

    <h3 class="midia__sub">Slides</h3>
    <div class="midia__slides">
      <div class="slides__track" id="slides-track" tabindex="0" aria-label="Galeria de slides — use as setas do teclado para navegar"></div>
      <button class="slides__nav slides__nav--prev" type="button" aria-label="Slide anterior" id="slides-prev">‹</button>
      <button class="slides__nav slides__nav--next" type="button" aria-label="Próximo slide" id="slides-next">›</button>
      <div class="slides__dots" id="slides-dots" role="tablist" aria-label="Indicadores de slide"></div>
    </div>

    <div class="section__foot">
      <a class="btn btn--ghost" href="https://instagram.com/cascobsjrp" target="_blank" rel="noopener" data-wa-source="midia-instagram">Ver mais no @cascobsjrp <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8 L13 8 M9 4 L13 8 L9 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Verificação visual**

Abrir `index.html` no navegador. Esperado: 8 cards de serviço (6 com ▾, 2 últimos com →). Seção Mídia visível mas vazia (containers existem, JS popula depois).

- [ ] **Step 5: Commit**

```bash
git add cascob-v2/index.html
git commit -m "feat(home): add sobre, servicos with accordion, midia section"
```

---

## Task 5: Index — Como funciona + Form leve + Resultados

**Files:**
- Modify: `<root>/cascob-v2/index.html`

- [ ] **Step 1: Adicionar Como funciona após Mídia**

```html
<section class="section section--black" id="como-funciona">
  <div class="container">
    <div class="section__head">
      <span class="kicker kicker--gold">04 — como funciona</span>
      <h2 class="h2 h2--light">Quatro passos. <em>Sem promessa milagrosa.</em></h2>
    </div>
    <ol class="steps">
      <li class="step"><span class="step__n">01</span><h3 class="step__t">Você fala no WhatsApp</h3><p class="step__d">Conta sua situação. Sem julgamento, sem formulário longo.</p></li>
      <li class="step"><span class="step__n">02</span><h3 class="step__t">Análise gratuita do CPF</h3><p class="step__d">Levantamos pendências, identificamos cobranças indevidas e montamos um plano.</p></li>
      <li class="step"><span class="step__n">03</span><h3 class="step__t">Negociação ou ação</h3><p class="step__d">Buscamos o melhor acordo. Em juros abusivos, acionamos a justiça.</p></li>
      <li class="step"><span class="step__n">04</span><h3 class="step__t">Nome limpo em 30 dias</h3><p class="step__d">Acompanhamos a baixa nos órgãos e te avisamos quando estiver tudo resolvido.</p></li>
    </ol>
    <div class="section__foot">
      <a class="btn btn--gold" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20do%20meu%20CPF." target="_blank" rel="noopener" data-wa-source="como-funciona">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
        Começar minha análise gratuita
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar seção Form leve**

```html
<section class="section section--black" id="comecar" aria-labelledby="form-title">
  <div class="container form-leve">
    <div class="form-leve__head">
      <span class="kicker kicker--gold">05 — comece a análise</span>
      <h2 class="h2 h2--light" id="form-title">Em 30 segundos a gente já está conversando.</h2>
      <p class="prose prose--light" style="margin-top:18px;">Preenche aqui que abrimos o WhatsApp já com o seu caso pré-montado. Seus dados não saem do seu celular.</p>
    </div>
    <form class="form-leve__form" id="form-leve" novalidate>
      <label>
        <span>Seu nome</span>
        <input name="nome" type="text" required minlength="2" autocomplete="name" placeholder="Como gostaria de ser chamado">
      </label>
      <label>
        <span>Telefone (com DDD)</span>
        <input name="telefone" type="tel" required autocomplete="tel" placeholder="(17) 99999-9999" inputmode="tel">
      </label>
      <fieldset>
        <legend>Valor aproximado da dívida</legend>
        <label><input type="radio" name="faixa" value="ate-3k" required> Até R$ 3.000</label>
        <label><input type="radio" name="faixa" value="3k-10k"> R$ 3.000 a R$ 10.000</label>
        <label><input type="radio" name="faixa" value="10k-30k"> R$ 10.000 a R$ 30.000</label>
        <label><input type="radio" name="faixa" value="30k+"> Acima de R$ 30.000</label>
        <label><input type="radio" name="faixa" value="nao-sei"> Não sei ao certo</label>
      </fieldset>
      <p class="form-leve__error" id="form-error" hidden></p>
      <button type="submit" class="btn btn--gold">Abrir WhatsApp →</button>
      <p class="form-leve__legal">Seus dados não são armazenados em servidor algum. Apenas montamos o link do WhatsApp pra você. <a href="#" style="color:var(--gold-light);">Política de privacidade</a></p>
    </form>
  </div>
</section>
```

- [ ] **Step 3: Adicionar seção Resultados**

```html
<section class="section section--cream" id="resultados">
  <div class="container">
    <div class="section__head">
      <span class="kicker">06 — resultados</span>
      <h2 class="h2">Números que viram histórias.</h2>
    </div>
    <div class="metrics">
      <figure class="metric">
        <div class="metric__num"><span data-counter="12">12</span><span>anos</span></div>
        <figcaption>cuidando de nomes<br>brasileiros desde 2012</figcaption>
      </figure>
      <figure class="metric metric--accent">
        <div class="metric__num"><span data-counter="2000">2 mil</span><span>+</span></div>
        <figcaption>clientes assessorados<br>em todo o Brasil</figcaption>
      </figure>
      <figure class="metric">
        <div class="metric__num"><span data-counter="30">30</span><span>dias</span></div>
        <figcaption>úteis em média para<br>limpar o nome*</figcaption>
      </figure>
      <figure class="metric">
        <div class="metric__num">½<span>dívida</span></div>
        <figcaption>em média no acordo,<br>menos da metade do valor</figcaption>
      </figure>
    </div>
    <p class="footnote">* Tempo médio observado em casos sem litígio judicial. Cada caso é avaliado individualmente.</p>
  </div>
</section>
```

- [ ] **Step 4: Verificação visual**

Recarregar no navegador. Esperado: 4 steps numerados em fundo preto, form preto com inputs e radios, 4 metrics com números grandes.

- [ ] **Step 5: Commit**

```bash
git add cascob-v2/index.html
git commit -m "feat(home): add como-funciona, form-leve, resultados"
```

---

## Task 6: Index — Depoimentos + FAQ + Contato + Footer + Floating WA

**Files:**
- Modify: `<root>/cascob-v2/index.html`

- [ ] **Step 1: Adicionar seção Depoimentos**

```html
<section class="section section--cream-deep" id="depoimentos">
  <div class="container">
    <div class="section__head">
      <span class="kicker">07 — quem já passou por aqui</span>
      <h2 class="h2">A confiança vem<br>de quem <em>já voltou a dormir tranquilo.</em></h2>
    </div>
    <div class="quotes">
      <blockquote class="quote">
        <span class="quote__mark" aria-hidden="true">&ldquo;</span>
        <p>Foram providenciais na hora que eu mais precisava. Eficientes e prestativos do começo ao fim.</p>
        <cite>— Cliente atendida em São José do Rio Preto · 2024</cite>
      </blockquote>
      <blockquote class="quote">
        <span class="quote__mark" aria-hidden="true">&ldquo;</span>
        <p>Resolveram com excelência minhas pendências e ainda conseguiram as compensações previstas em lei.</p>
        <cite>— Cliente atendida em Fernandópolis · 2023</cite>
      </blockquote>
      <blockquote class="quote">
        <span class="quote__mark" aria-hidden="true">&ldquo;</span>
        <p>Equipe séria e responsável. Saí da dívida de juros abusivos com a ajuda da Cascob.</p>
        <cite>— Cliente atendido em Rio Preto · 2024</cite>
      </blockquote>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar FAQ ampliada (10 perguntas para SEO long-tail)**

```html
<section class="section section--cream" id="faq" aria-labelledby="faq-title">
  <div class="container two-col two-col--narrow">
    <div class="two-col__left">
      <span class="kicker">08 — perguntas frequentes</span>
      <h2 class="h2" id="faq-title">Tudo o que costumam perguntar <em>antes de começar.</em></h2>
      <p class="prose prose--muted" style="margin-top:18px;">Não achou sua dúvida? Manda no WhatsApp que a gente responde como se fosse a primeira vez.</p>
    </div>
    <div class="two-col__right">
      <ul class="faq" id="faq-list">
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-1"><span>Em quanto tempo meu nome fica limpo?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-1" role="region"><p>Na maioria dos casos, em até 30 dias úteis após o acordo ou ação. Cada caso é avaliado individualmente — em situações com litígio judicial o prazo pode ser maior, mas a Cascob acompanha até o final.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-2"><span>Vocês cobram para analisar meu CPF?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-2" role="region"><p>Não. A primeira análise da sua situação é gratuita e sem compromisso. Só seguimos em frente se você decidir contratar.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-3"><span>Atendem fora de São José do Rio Preto?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-3" role="region"><p>Sim. Atendemos clientes em todo o Brasil — presencialmente em Rio Preto ou por vídeo, com a mesma atenção. Documentos são enviados de forma segura.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-4"><span>Como evito cair em golpes de "limpa nome"?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-4" role="region"><p>Desconfie de quem promete milagre, cobra valores altos antecipadamente ou se recusa a fazer atendimento por vídeo identificável. A Cascob faz atendimento presencial ou em videochamada com a equipe, sem mistério.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-5"><span>Preciso pagar a dívida toda?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-5" role="region"><p>Não necessariamente. Boa parte do nosso trabalho é negociar descontos relevantes — em média, menos da metade do valor original. O objetivo é resolver, não te afundar mais.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-6"><span>E se a dívida for indevida ou prescrita?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-6" role="region"><p>Quando identificamos cobrança indevida, juros abusivos, dívidas prescritas (Ativos, Ipanema, Itapeva, NPL II) ou inscrição irregular nos órgãos, podemos entrar com ação judicial buscando a baixa do nome e as compensações previstas em lei.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-7"><span>Meus dados estão protegidos?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-7" role="region"><p>Sim. Seguimos a LGPD (Lei nº 13.709/2018). Seus dados são tratados apenas para o atendimento do seu caso e nunca são vendidos.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-8"><span>Limpar nome é legalizado?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-8" role="region"><p>Sim. Recuperação de crédito é uma atividade legal regulamentada — atuamos com base no Código de Defesa do Consumidor (CDC) e na legislação bancária. O que é golpe é prometer "limpar nome" sem fazer nada concreto pelo cliente.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-9"><span>Quanto custa o serviço da Cascob?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-9" role="region"><p>O custo varia por caso e é apresentado depois da análise gratuita do seu CPF. Trabalhamos de forma transparente: você só decide contratar depois de saber o valor exato e o que será feito. Sem cobranças escondidas.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-10"><span>Em quais estados a Cascob atende?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="faq-a-10" role="region"><p>Em todos os estados do Brasil. Sede em São José do Rio Preto (SP), atendimento presencial na região e por vídeo (Google Meet ou WhatsApp) para clientes de qualquer cidade. Já assessoramos casos em SP, MG, RJ, PR, SC, RS, MT, MS, GO, BA, PE, CE, DF e outros.</p></div></li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Adicionar Schema FAQPage no `<head>`**

Editar o `<head>`. Logo após o JSON-LD da Organization, inserir mais um `<script type="application/ld+json">`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Em quanto tempo meu nome fica limpo?","acceptedAnswer":{"@type":"Answer","text":"Na maioria dos casos, em até 30 dias úteis após o acordo ou ação. Cada caso é avaliado individualmente — em situações com litígio judicial o prazo pode ser maior, mas a Cascob acompanha até o final."}},
    {"@type":"Question","name":"Vocês cobram para analisar meu CPF?","acceptedAnswer":{"@type":"Answer","text":"Não. A primeira análise da sua situação é gratuita e sem compromisso. Só seguimos em frente se você decidir contratar."}},
    {"@type":"Question","name":"Atendem fora de São José do Rio Preto?","acceptedAnswer":{"@type":"Answer","text":"Sim. Atendemos clientes em todo o Brasil — presencialmente em Rio Preto ou por vídeo, com a mesma atenção. Documentos são enviados de forma segura."}},
    {"@type":"Question","name":"Como evito cair em golpes de limpa nome?","acceptedAnswer":{"@type":"Answer","text":"Desconfie de quem promete milagre, cobra valores altos antecipadamente ou se recusa a fazer atendimento por vídeo identificável. A Cascob faz atendimento presencial ou em videochamada com a equipe, sem mistério."}},
    {"@type":"Question","name":"Preciso pagar a dívida toda?","acceptedAnswer":{"@type":"Answer","text":"Não necessariamente. Boa parte do nosso trabalho é negociar descontos relevantes — em média, menos da metade do valor original."}},
    {"@type":"Question","name":"E se a dívida for indevida ou prescrita?","acceptedAnswer":{"@type":"Answer","text":"Quando identificamos cobrança indevida, juros abusivos, dívidas prescritas (Ativos, Ipanema, Itapeva, NPL II) ou inscrição irregular nos órgãos, podemos entrar com ação judicial buscando a baixa do nome e as compensações previstas em lei."}},
    {"@type":"Question","name":"Meus dados estão protegidos?","acceptedAnswer":{"@type":"Answer","text":"Sim. Seguimos a LGPD (Lei nº 13.709/2018). Seus dados são tratados apenas para o atendimento do seu caso e nunca são vendidos."}},
    {"@type":"Question","name":"Limpar nome é legalizado?","acceptedAnswer":{"@type":"Answer","text":"Sim. Recuperação de crédito é uma atividade legal regulamentada — atuamos com base no Código de Defesa do Consumidor (CDC) e na legislação bancária."}},
    {"@type":"Question","name":"Quanto custa o serviço da Cascob?","acceptedAnswer":{"@type":"Answer","text":"O custo varia por caso e é apresentado depois da análise gratuita do seu CPF. Trabalhamos de forma transparente: você só decide contratar depois de saber o valor exato."}},
    {"@type":"Question","name":"Em quais estados a Cascob atende?","acceptedAnswer":{"@type":"Answer","text":"Em todos os estados do Brasil. Sede em São José do Rio Preto (SP), atendimento presencial na região e por vídeo para clientes de qualquer cidade."}}
  ]
}
</script>
```

- [ ] **Step 4: Adicionar Contato**

Após `</section><!-- faq -->`:
```html
<section class="section section--black section--contact" id="contato">
  <div class="container contact">
    <div class="contact__left">
      <span class="kicker kicker--gold">09 — fale com a gente</span>
      <h2 class="h2 h2--light h2--xl" style="margin-top:14px;">A gente atende como<br>se você estivesse aqui<br>na <em>nossa sala.</em></h2>
      <p class="prose prose--light" style="margin-top:18px;">Atendimento presencial em São José do Rio Preto ou por vídeo, em qualquer canto do Brasil. Sigilo total sobre o seu caso.</p>
    </div>
    <div class="contact__right">
      <a class="contact__card" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20do%20meu%20CPF." target="_blank" rel="noopener" data-wa-source="contato">
        <span class="contact__lab">WhatsApp · clique para conversar</span>
        <span class="contact__num">(17) 99199-9006</span>
        <span class="contact__cta">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
          Iniciar conversa
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8 L13 8 M9 4 L13 8 L9 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </a>
      <div class="contact__hours">
        <div><span>Atendimento</span><strong>Seg–Sex · 09h às 18h</strong></div>
        <div><span>Cobertura</span><strong>Brasil inteiro · presencial ou vídeo</strong></div>
        <div><span>Análise</span><strong>Gratuita e sem compromisso</strong></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Adicionar Footer + Floating WhatsApp (depois de `</main>`)**

```html
<footer class="footer">
  <div class="container footer__row">
    <div class="footer__brand">
      <a href="#top" class="logo logo--md">
        <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
        <span class="logo__text">
          <span class="logo__name">CASCOB</span>
          <span class="logo__sub">recuperação de créditos</span>
        </span>
      </a>
      <p>Recuperação de crédito desde 2012.<br>São José do Rio Preto · SP · atendimento em todo o Brasil.</p>
    </div>
    <div class="footer__col">
      <span class="footer__h">Contato</span>
      <a href="https://wa.me/5517991999006" target="_blank" rel="noopener" data-wa-source="footer">WhatsApp (17) 99199-9006</a>
      <a href="https://instagram.com/cascobsjrp" target="_blank" rel="noopener">Instagram @cascobsjrp</a>
    </div>
    <div class="footer__col">
      <span class="footer__h">Navegar</span>
      <a href="#sobre">Sobre</a>
      <a href="#servicos">Serviços</a>
      <a href="/servicos/dividas-prescritas">Dívidas prescritas</a>
      <a href="/servicos/fraude-consignado">Fraude consignado</a>
      <a href="#faq">Dúvidas</a>
    </div>
    <div class="footer__col">
      <span class="footer__h">Aviso</span>
      <p class="footer__fine">CASCOB Recuperação de Créditos · CNPJ 22.770.533/0001-95. Os resultados variam conforme cada caso. Consulte sua situação na análise gratuita.</p>
    </div>
  </div>
  <div class="footer__base container">
    <span>© 2012–2026 Cascob · Todos os direitos reservados</span>
    <span>"nós podemos ajudar você"</span>
  </div>
</footer>

<a class="float-wa" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20do%20meu%20CPF." target="_blank" rel="noopener" aria-label="Falar no WhatsApp" data-wa-source="floating">
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
  <span>Falar no WhatsApp</span>
</a>
```

- [ ] **Step 6: Verificação visual**

Recarregar. Esperado: 3 quotes, FAQ com 10 itens fechados, contato preto, footer 4 colunas, botão flutuante WhatsApp verde no canto inferior direito.

- [ ] **Step 7: Validar HTML**

```bash
npx html-validate cascob-v2/index.html 2>&1 | head -50
```

Saída esperada: 0 erros (ou apenas warnings sobre `style=` inline, aceitáveis).

Se `html-validate` não estiver disponível:
```bash
npx -p html-validate@latest html-validate cascob-v2/index.html
```

- [ ] **Step 8: Commit**

```bash
git add cascob-v2/index.html
git commit -m "feat(home): add depoimentos, faq, contato, footer, floating-wa"
```

---

## Task 7: JS — `main.js` (header scroll, theme toggle, accordion serviços, FAQ)

**Files:**
- Create: `<root>/cascob-v2/assets/js/main.js`

- [ ] **Step 1: Criar `main.js` com utilitários e header scroll**

Criar `<root>/cascob-v2/assets/js/main.js`:
```javascript
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
```

- [ ] **Step 2: Verificação manual**

Recarregar `index.html`. Testar:
1. Rolar a página → header encolhe ✅
2. Clicar no botão sol/lua → tema alterna ✅
3. Clicar num card de serviço (01–06) → expande detalhe, outros fecham ✅
4. Clicar numa pergunta da FAQ → abre/fecha ✅
5. Rolar até "Resultados" → números 12, 2 mil, 30 contam de 0 ao alvo ✅
6. Recarregar a página → tema persiste ✅

- [ ] **Step 3: Validar JS sintaticamente**

```bash
node -c cascob-v2/assets/js/main.js
```

Saída esperada: sem output (válido).

- [ ] **Step 4: Commit**

```bash
git add cascob-v2/assets/js/main.js
git commit -m "feat(js): add main.js — header scroll, theme toggle, accordions, counters"
```

---

## Task 8: JS — `midia-config.js` + render Reels com lazy load

**Files:**
- Create: `<root>/cascob-v2/assets/js/midia-config.js`
- Create: `<root>/cascob-v2/assets/js/instagram-lazy.js`

- [ ] **Step 1: Criar `midia-config.js` (arquivo de config do usuário)**

Criar `<root>/cascob-v2/assets/js/midia-config.js`:
```javascript
// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO DE MÍDIA — Cascob
// ─────────────────────────────────────────────────────────────────────────────
// EDITE ESTE ARQUIVO PARA ADICIONAR/REMOVER REELS E SLIDES.
// Após salvar, basta recarregar o site no navegador.
// ─────────────────────────────────────────────────────────────────────────────
window.MIDIA = {
  reels: [
    // Cole o ID do Reel: a parte entre /reel/ e / da URL do Instagram.
    // Exemplo: https://www.instagram.com/reel/DABC123xyz/  →  id: "DABC123xyz"
    //
    // { id: "DABC123xyz", titulo: "Como negociar dívida prescrita" },
    // { id: "DDEF456abc", titulo: "Cuidado com golpes de limpa nome" },
  ],
  slides: [
    // Salve a imagem em assets/img/slides/ e adicione aqui.
    // Recomendado: JPG ou WebP, 1080x1080 (quadrado) ou 1080x1350 (4:5).
    //
    // { src: "/assets/img/slides/01-golpes.jpg", alt: "Os 3 golpes mais comuns de limpa nome em 2026" },
    // { src: "/assets/img/slides/02-prescricao.jpg", alt: "Sua dívida pode estar prescrita" },
  ]
};
```

- [ ] **Step 2: Criar `instagram-lazy.js` — render dos Reels com Intersection Observer**

Criar `<root>/cascob-v2/assets/js/instagram-lazy.js`:
```javascript
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

  // ── INIT ──────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { renderReels(); renderSlides(); });
  } else {
    renderReels();
    renderSlides();
  }
})();
```

- [ ] **Step 3: Verificação com config vazia (estado inicial)**

Recarregar o site. Esperado: seção "Mídia" aparece com kicker e título, mas as subseções "Vídeos" e "Slides" estão **escondidas** (sem itens). Botão "Ver mais no @cascobsjrp" continua visível.

- [ ] **Step 4: Verificação com mídia de teste**

Editar temporariamente `<root>/cascob-v2/assets/js/midia-config.js` e adicionar:
```javascript
window.MIDIA = {
  reels: [
    { id: "C5XyZ_test", titulo: "Reel de teste" }
  ],
  slides: [
    { src: "https://placehold.co/600x600/c89b3c/111?text=Slide+1", alt: "Slide 1" },
    { src: "https://placehold.co/600x600/111/c89b3c?text=Slide+2", alt: "Slide 2" },
    { src: "https://placehold.co/600x600/c89b3c/111?text=Slide+3", alt: "Slide 3" }
  ]
};
```

Recarregar. Esperado:
- Reel mostra blockquote (que vai mostrar fallback porque ID é falso, mas estrutura existe)
- 3 slides em scroll horizontal, dots visíveis, setas funcionam, swipe nativo no mobile

Reverter o arquivo de config pra estado vazio antes do commit:
```javascript
window.MIDIA = {
  reels: [],
  slides: []
};
```
(Manter os comentários explicativos da Step 1.)

- [ ] **Step 5: Validar JS**

```bash
node -c cascob-v2/assets/js/midia-config.js
node -c cascob-v2/assets/js/instagram-lazy.js
```

- [ ] **Step 6: Commit**

```bash
git add cascob-v2/assets/js/midia-config.js cascob-v2/assets/js/instagram-lazy.js
git commit -m "feat(midia): add lazy reel embed + slides carousel with config file"
```

---

## Task 9: JS — `analytics.js` (GA4 + Pixel + 6 eventos)

**Files:**
- Create: `<root>/cascob-v2/assets/js/analytics.js`

- [ ] **Step 1: Criar `analytics.js`**

Criar `<root>/cascob-v2/assets/js/analytics.js`:
```javascript
(function() {
  'use strict';

  // PLACEHOLDERS — Jefferson substitui antes do deploy
  const GA4_ID = 'G-XXXXXXXXXX';
  const PIXEL_ID = '000000000000000';

  const hasGA = GA4_ID && GA4_ID !== 'G-XXXXXXXXXX';
  const hasPixel = PIXEL_ID && PIXEL_ID !== '000000000000000';

  // ── Google Analytics 4 ───────────────────────────────────────────────
  if (hasGA) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA4_ID, {
      anonymize_ip: true,
      send_page_view: true
    });
  } else {
    console.info('[Cascob] GA4 desativado (substitua GA4_ID em analytics.js).');
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

  // Página /obrigado dispara conversion
  if (window.location.pathname.endsWith('/obrigado.html') || window.location.pathname.endsWith('/obrigado')) {
    window.dispatchEvent(new CustomEvent('cascob:event', { detail: { event: 'conversion', params: {} } }));
  }
})();
```

- [ ] **Step 2: Verificação no console**

Recarregar `index.html` no navegador. Abrir DevTools console. Esperado:
- `[Cascob] GA4 desativado` e `[Cascob] Meta Pixel desativado` (placeholders ainda).
- Clicar em qualquer botão WhatsApp → log `[Cascob analytics — sem ID configurado] whatsapp_click {local: "..."}`.
- Clicar em qualquer card de serviço → log `servico_expandido`.

- [ ] **Step 3: Commit**

```bash
git add cascob-v2/assets/js/analytics.js
git commit -m "feat(analytics): add GA4 + Pixel + 6 event tracking"
```

---

## Task 10: JS — Form leve (validação + WhatsApp builder)

**Files:**
- Modify: `<root>/cascob-v2/assets/js/main.js`

- [ ] **Step 1: Adicionar handler do form ao final do IIFE em main.js**

Encontrar a linha `})();` ao final de `main.js` e logo antes adicionar:
```javascript

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

      const msg = `Oi, sou ${nome}. Tenho dívida ${faixaLegivel} e quero a análise gratuita do meu CPF. Telefone: ${telefone}.`;
      const url = `https://wa.me/5517991999006?text=${encodeURIComponent(msg)}`;

      track('formulario_enviado', { faixa });
      track('whatsapp_click', { local: 'form' });

      window.open(url, '_blank', 'noopener');
      window.location.href = '/obrigado.html';
    });
  }
```

- [ ] **Step 2: Verificação manual**

Recarregar. Ir até a seção "Comece a análise". Testar:
1. Submeter vazio → erro "Por favor, digite seu nome…" ✅
2. Digitar nome curto + telefone bagunçado → erro de telefone ✅
3. Digitar nome + telefone (digita só números, máscara aparece) ✅
4. Selecionar faixa "R$ 3.000 a R$ 10.000" e enviar → abre nova aba do WhatsApp com mensagem montada + redireciona pra /obrigado.html (essa página ainda não existe; vamos criar na Task 13)

- [ ] **Step 3: Commit**

```bash
git add cascob-v2/assets/js/main.js
git commit -m "feat(form): add lite form with WhatsApp builder + phone mask"
```

---

## Task 11: Página SEO — Dívidas prescritas

**Files:**
- Create: `<root>/cascob-v2/servicos/dividas-prescritas.html`

- [ ] **Step 1: Criar página completa**

Criar `<root>/cascob-v2/servicos/dividas-prescritas.html`:
```html
<!DOCTYPE html>
<html lang="pt-BR" data-mode="claro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dívidas Prescritas: Ativos, Ipanema, Itapeva, NPL II — Cascob</title>
<meta name="description" content="Cobrança de dívida prescrita é ilegal. Saiba se sua dívida com Ativos, Ipanema, Itapeva ou NPL II passou dos 5 anos e tire o nome dos órgãos de proteção.">

<link rel="canonical" href="https://DOMINIO_PLACEHOLDER/servicos/dividas-prescritas">
<meta property="og:title" content="Dívidas Prescritas — Cascob">
<meta property="og:description" content="Tire o nome de cobranças prescritas (5+ anos). Análise gratuita.">
<meta property="og:image" content="https://DOMINIO_PLACEHOLDER/assets/img/og-image.jpg">
<meta property="og:url" content="https://DOMINIO_PLACEHOLDER/servicos/dividas-prescritas">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">

<link rel="icon" href="/assets/img/icons/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/cormorant-garamond-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Recuperação de dívidas prescritas",
  "name": "Análise e baixa de dívidas prescritas — Ativos, Ipanema, Itapeva, NPL II",
  "description": "Identificação de prescrição (5 anos pelo CDC), baixa do nome nos órgãos de proteção e indenização por inscrição irregular após prazo.",
  "provider": {
    "@type": "Organization",
    "name": "CASCOB Recuperação de Créditos",
    "url": "https://DOMINIO_PLACEHOLDER/",
    "telephone": "+55-17-99199-9006"
  },
  "areaServed": {"@type": "Country", "name": "Brasil"}
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"O que é dívida prescrita?","acceptedAnswer":{"@type":"Answer","text":"É uma dívida que ultrapassou o prazo legal para o credor cobrar judicialmente. Pelo Código de Defesa do Consumidor (Art. 27) e Código Civil, a maioria das dívidas de consumo prescreve em 5 anos contados a partir do vencimento."}},
    {"@type":"Question","name":"Quem são Ativos, Ipanema, Itapeva e NPL II?","acceptedAnswer":{"@type":"Answer","text":"São empresas de cobrança que compram carteiras de dívidas antigas dos bancos e financeiras (NPL = Non-Performing Loans). Compram a R$ 0,05 por R$ 1 de dívida e tentam cobrar o valor cheio. Muitas dessas dívidas já estão prescritas."}},
    {"@type":"Question","name":"Como saber se minha dívida está prescrita?","acceptedAnswer":{"@type":"Answer","text":"Some 5 anos a partir do vencimento da última parcela ou da última cobrança válida. Se passou desse prazo e o credor não acionou a justiça, a dívida está prescrita. A Cascob faz essa análise gratuitamente."}},
    {"@type":"Question","name":"Empresa pode cobrar dívida prescrita?","acceptedAnswer":{"@type":"Answer","text":"Pode pedir o pagamento (sem ameaças), mas não pode inscrever o nome nos órgãos de proteção (SPC/Serasa) nem ajuizar ação. Inscrição após prescrição gera direito a baixa imediata e indenização por danos morais."}},
    {"@type":"Question","name":"Quanto tempo leva para tirar o nome de uma dívida prescrita?","acceptedAnswer":{"@type":"Answer","text":"Em casos de prescrição comprovada, o pedido de baixa costuma sair em 5 a 30 dias úteis. Quando há indenização envolvida, o processo judicial leva de 6 a 18 meses."}}
  ]
}
</script>
</head>
<body>
<a href="#main" class="skip-link">Pular para o conteúdo</a>

<header class="nav" id="site-header">
  <div class="container nav__row">
    <a href="/" class="logo logo--md" aria-label="Cascob — voltar para a página inicial">
      <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
      <span class="logo__text">
        <span class="logo__name">CASCOB</span>
        <span class="logo__sub">recuperação de créditos</span>
      </span>
    </a>
    <nav class="nav__links" aria-label="Navegação principal">
      <a href="/#sobre">Sobre</a>
      <a href="/#servicos">Serviços</a>
      <a href="/#midia">Mídia</a>
      <a href="/#como-funciona">Como funciona</a>
      <a href="/#faq">Dúvidas</a>
    </nav>
    <div class="nav__actions">
      <button class="theme-toggle" type="button" aria-label="Alternar tema claro/escuro" id="theme-toggle">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <a class="btn btn--gold btn--sm" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20cobran%C3%A7a%20que%20pode%20ser%20prescrita%20e%20quero%20a%20an%C3%A1lise%20gratuita." target="_blank" rel="noopener" data-wa-source="seo-prescritas-header">Falar agora</a>
    </div>
  </div>
</header>

<nav class="breadcrumb" aria-label="Caminho de navegação">
  <a href="/">Início</a>
  <span class="breadcrumb__sep">›</span>
  <a href="/#servicos">Serviços</a>
  <span class="breadcrumb__sep">›</span>
  <span aria-current="page">Dívidas prescritas</span>
</nav>

<main id="main">
<article class="section section--cream" style="padding-top:0;">
  <div class="container two-col two-col--narrow">
    <div class="two-col__left">
      <span class="kicker">serviço · 07</span>
      <h1 class="h2" style="font-size:clamp(36px,5vw,64px);">Dívidas Prescritas: <em>Ativos, Ipanema, Itapeva, NPL II.</em></h1>
      <p class="prose">Cobrança fora do prazo é <strong>ilegal</strong>. Se sua dívida passou dos 5 anos e ainda está sujando seu nome, a Cascob tira em até 30 dias úteis — e quando cabe, busca indenização por danos morais.</p>
      <p style="margin-top:24px;">
        <a class="btn btn--gold" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20cobran%C3%A7a%20que%20pode%20ser%20prescrita%20e%20quero%20a%20an%C3%A1lise%20gratuita." target="_blank" rel="noopener" data-wa-source="seo-prescritas-cta">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
          Análise gratuita pelo WhatsApp
        </a>
      </p>
    </div>
    <div class="two-col__right">
      <h2 style="font-family:var(--serif);font-size:28px;margin:0 0 16px;font-weight:500;">O que é prescrição de dívida?</h2>
      <p class="prose">Pelo <strong>Código de Defesa do Consumidor</strong> (Art. 27) e Código Civil, a maioria das dívidas de consumo prescreve em <strong>5 anos</strong> contados a partir do vencimento. Passado esse prazo, o credor:</p>
      <ul class="checks">
        <li><strong>não pode</strong> inscrever seu nome no SPC, Serasa ou Boa Vista</li>
        <li><strong>não pode</strong> ajuizar ação de cobrança</li>
        <li><strong>pode pedir</strong> o pagamento (sem ameaças), mas você não é obrigado a pagar</li>
      </ul>

      <h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">Quem são essas empresas?</h2>
      <p class="prose">Ativos, Ipanema, Itapeva e NPL II são <strong>fundos de investimento em direitos creditórios (FIDCs)</strong>. Compram carteiras de dívidas antigas dos bancos a centavos por real, e tentam cobrar o valor cheio. Muito frequentemente, essas dívidas já estão prescritas — mas a empresa cobra mesmo assim.</p>

      <h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">O que a Cascob faz</h2>
      <ol class="checks" style="counter-reset:item;">
        <li>Análise gratuita do seu caso (datas, contratos, histórico de cobrança)</li>
        <li>Verificação se a prescrição foi interrompida (acordo, novação, ação judicial anterior)</li>
        <li>Notificação extrajudicial à empresa pedindo baixa imediata</li>
        <li>Quando necessário, ação judicial com pedido de tutela de urgência (baixa em 48h) e indenização</li>
      </ol>

      <h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">Casos típicos</h2>
      <p class="prose"><em>Dívidas de cartão de crédito de 2018 ainda no Serasa em 2024.</em> <em>Cobrança de cheque devolvido de 2017 reaparecendo em 2025.</em> <em>SMS e ligações cobrando empréstimo de 2016.</em> Todos esses casos tipicamente caem na prescrição quinquenal.</p>

      <h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">Perguntas frequentes</h2>
      <ul class="faq" id="faq-list">
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="p-faq-1"><span>O que é dívida prescrita?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="p-faq-1" role="region"><p>Dívida que ultrapassou o prazo legal para cobrança judicial. Pelo CDC, a maioria das dívidas de consumo prescreve em 5 anos.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="p-faq-2"><span>Quem são Ativos, Ipanema, Itapeva e NPL II?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="p-faq-2" role="region"><p>Empresas de cobrança que compram carteiras de dívidas antigas dos bancos. Compram barato e tentam cobrar valor cheio. Muitas dessas dívidas já estão prescritas.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="p-faq-3"><span>Como saber se minha dívida está prescrita?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="p-faq-3" role="region"><p>Some 5 anos a partir do vencimento. Se passou e o credor não te processou, está prescrita. A Cascob faz essa análise gratuitamente — basta nos enviar a tela do Serasa.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="p-faq-4"><span>Empresa pode cobrar dívida prescrita?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="p-faq-4" role="region"><p>Pode pedir o pagamento (sem ameaças), mas não pode inscrever o nome no SPC/Serasa nem ajuizar ação. Inscrição após prescrição gera direito a baixa imediata e indenização por danos morais.</p></div></li>
        <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="p-faq-5"><span>Quanto tempo leva pra tirar o nome?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="p-faq-5" role="region"><p>Em casos de prescrição comprovada: 5 a 30 dias úteis. Quando há indenização envolvida, o processo leva de 6 a 18 meses.</p></div></li>
      </ul>

      <p style="margin-top:48px;">
        <a class="btn btn--gold" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20cobran%C3%A7a%20que%20pode%20ser%20prescrita%20e%20quero%20a%20an%C3%A1lise%20gratuita." target="_blank" rel="noopener" data-wa-source="seo-prescritas-cta-final">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
          Quero a análise gratuita
        </a>
      </p>
      <p style="margin-top:24px;font-size:14px;color:var(--fg-soft);">Veja também: <a href="/servicos/fraude-consignado" style="color:var(--gold-readable);font-weight:600;">Fraude no consignado</a></p>
    </div>
  </div>
</article>
</main>

<footer class="footer">
  <div class="container footer__row">
    <div class="footer__brand">
      <a href="/" class="logo logo--md">
        <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
        <span class="logo__text">
          <span class="logo__name">CASCOB</span>
          <span class="logo__sub">recuperação de créditos</span>
        </span>
      </a>
      <p>Recuperação de crédito desde 2012.<br>São José do Rio Preto · SP · atendimento em todo o Brasil.</p>
    </div>
    <div class="footer__col">
      <span class="footer__h">Contato</span>
      <a href="https://wa.me/5517991999006" target="_blank" rel="noopener" data-wa-source="footer">WhatsApp (17) 99199-9006</a>
      <a href="https://instagram.com/cascobsjrp" target="_blank" rel="noopener">Instagram @cascobsjrp</a>
    </div>
    <div class="footer__col">
      <span class="footer__h">Navegar</span>
      <a href="/#sobre">Sobre</a>
      <a href="/#servicos">Serviços</a>
      <a href="/#faq">Dúvidas</a>
    </div>
    <div class="footer__col">
      <span class="footer__h">Aviso</span>
      <p class="footer__fine">CASCOB · CNPJ 22.770.533/0001-95. Os resultados variam conforme cada caso.</p>
    </div>
  </div>
  <div class="footer__base container">
    <span>© 2012–2026 Cascob</span>
  </div>
</footer>

<a class="float-wa" href="https://wa.me/5517991999006?text=Ol%C3%A1%2C%20tenho%20cobran%C3%A7a%20que%20pode%20ser%20prescrita%20e%20quero%20a%20an%C3%A1lise%20gratuita." target="_blank" rel="noopener" aria-label="Falar no WhatsApp" data-wa-source="seo-prescritas-floating">
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
  <span>Falar no WhatsApp</span>
</a>

<script>window.dispatchEvent(new CustomEvent('cascob:event', { detail: { event: 'pagina_seo_visitada', params: { pagina: 'dividas-prescritas' } } }));</script>
<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/analytics.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verificação visual**

Abrir `cascob-v2/servicos/dividas-prescritas.html` no navegador. Esperado: página com breadcrumb, H1, conteúdo estruturado, FAQ funcional, footer.

- [ ] **Step 3: Validar Schema.org**

Copiar o conteúdo dos `<script type="application/ld+json">` e colar em https://search.google.com/test/rich-results. Esperado: 0 erros.

- [ ] **Step 4: Commit**

```bash
git add cascob-v2/servicos/dividas-prescritas.html
git commit -m "feat(seo): add dividas-prescritas SEO page with schema.org"
```

---

## Task 12: Página SEO — Fraude no consignado

**Files:**
- Create: `<root>/cascob-v2/servicos/fraude-consignado.html`

- [ ] **Step 1: Criar página**

Criar `<root>/cascob-v2/servicos/fraude-consignado.html` com a mesma estrutura da Task 11, substituindo:
- `<title>`: `Fraude no Consignado: Restituição em Dobro — Cascob`
- `<meta name="description">`: `Empréstimo consignado não solicitado no INSS, militar ou servidor? Cascob faz a restituição em dobro pelo Art. 42 do CDC. Análise gratuita.`
- canonical/og:url: `/servicos/fraude-consignado`
- breadcrumb final: `Fraude no consignado`
- H1: `Fraude no Consignado: <em>como identificar e como restituir.</em>`
- Lede: `Empréstimo consignado que você não pediu? A Cascob para o desconto, baixa o contrato e busca a restituição em dobro do que foi cobrado — pelo Art. 42 do CDC.`
- Conteúdo (substitui as 4 subseções):

```html
<h2 style="font-family:var(--serif);font-size:28px;margin:0 0 16px;font-weight:500;">O que é fraude no consignado?</h2>
<p class="prose">Empréstimo consignado é aquele descontado direto do salário, aposentadoria ou benefício do INSS. <strong>Fraude</strong> é quando aparece um desconto que você nunca contratou — geralmente por:</p>
<ul class="checks">
  <li>Documento vazado em loja, clínica, sindicato ou financeira</li>
  <li>Ligação fingindo ser do banco ou do INSS</li>
  <li>Refinanciamento automático sem autorização explícita</li>
  <li>Empréstimo "preventivo" oferecido por correspondente bancário</li>
</ul>

<h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">Quem é mais vulnerável</h2>
<p class="prose">Aposentados e pensionistas do INSS, militares, servidores públicos federais, estaduais e municipais. Em 2025, o INSS bloqueou cobrança de mais de 1,3 milhão de contratos suspeitos.</p>

<h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">Como funciona a restituição</h2>
<p class="prose">O <strong>Art. 42 do Código de Defesa do Consumidor</strong> garante: cobrança indevida → restituição em <strong>dobro</strong>, com correção. Exemplo: se o banco descontou R$ 8.000 do seu benefício em 24 parcelas, você recebe R$ 16.000 corrigidos de volta.</p>

<h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">O que a Cascob faz</h2>
<ol class="checks">
  <li>Análise gratuita: levantamos contratos do INSS/RH e identificamos os fraudulentos</li>
  <li>Pedido administrativo direto ao banco e ao INSS — quando funciona, baixa em 30 dias</li>
  <li>Quando não funciona: ação judicial com pedido de tutela (parar o desconto imediato) + restituição em dobro + danos morais</li>
  <li>Acompanhamento até o dinheiro cair na conta</li>
</ol>
```

- E as **5 perguntas FAQ específicas**:

```html
<h2 style="font-family:var(--serif);font-size:28px;margin:40px 0 16px;font-weight:500;">Perguntas frequentes</h2>
<ul class="faq" id="faq-list">
  <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="f-faq-1"><span>Como sei que tenho consignado fraudulento?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="f-faq-1" role="region"><p>Veja seu extrato do INSS pelo Meu INSS (app ou site) ou seu contracheque. Procure descontos com nome de banco que você nunca contratou. Para servidores e militares, peça o histórico no RH.</p></div></li>
  <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="f-faq-2"><span>Em quanto tempo o desconto para?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="f-faq-2" role="region"><p>No pedido administrativo, em 10 a 30 dias. Em ação judicial com tutela de urgência, em 24 a 72 horas — o juiz determina suspensão imediata.</p></div></li>
  <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="f-faq-3"><span>Recebo de volta tudo que foi descontado?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="f-faq-3" role="region"><p>Sim, e em dobro. Pelo Art. 42 do CDC, cobrança indevida gera restituição em dobro. Se já tiver pago R$ 5.000, recebe R$ 10.000 corrigidos.</p></div></li>
  <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="f-faq-4"><span>Tem prazo para reclamar de consignado fraudulento?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="f-faq-4" role="region"><p>O prazo prescricional é de 5 anos para a restituição em dobro e de 3 anos para danos morais, contados a partir de quando você descobriu a fraude. Quanto antes, melhor.</p></div></li>
  <li class="faq__item"><button class="faq__q" type="button" aria-expanded="false" aria-controls="f-faq-5"><span>Tenho que ir ao banco?</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__a" id="f-faq-5" role="region"><p>Não. Tudo é resolvido pela Cascob — análise por WhatsApp, documentos enviados digitalmente, atendimento por vídeo se preferir. Sem ligação para o banco da sua parte.</p></div></li>
</ul>
```

- E o **CTA final** muda para: "Quero parar o desconto agora"
- E o **link interno final**: `Veja também: <a href="/servicos/dividas-prescritas">Dívidas prescritas</a>`
- E o **Schema.org Service**: `serviceType: "Restituição de consignado fraudulento"`, `name`, `description` adaptados.
- E o **Schema.org FAQPage**: as 5 Q&A específicas acima.
- E os links de WhatsApp todos com mensagem: `Ol%C3%A1%2C%20suspeito%20de%20fraude%20no%20consignado%20e%20quero%20a%20an%C3%A1lise%20gratuita.`
- E o evento da página: `pagina_seo_visitada` com `pagina: 'fraude-consignado'`.

(Resto da estrutura — head, header, breadcrumb, footer, floating WA, scripts — copiar de `dividas-prescritas.html` mudando apenas os textos acima.)

- [ ] **Step 2: Verificação visual e schema**

Abrir no navegador. Validar schema em https://search.google.com/test/rich-results.

- [ ] **Step 3: Commit**

```bash
git add cascob-v2/servicos/fraude-consignado.html
git commit -m "feat(seo): add fraude-consignado SEO page with schema.org"
```

---

## Task 13: Páginas auxiliares — `obrigado.html` + `404.html`

**Files:**
- Create: `<root>/cascob-v2/obrigado.html`
- Create: `<root>/cascob-v2/404.html`

- [ ] **Step 1: Criar `obrigado.html`**

Criar `<root>/cascob-v2/obrigado.html`:
```html
<!DOCTYPE html>
<html lang="pt-BR" data-mode="claro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Obrigado — Cascob</title>
<meta name="robots" content="noindex,follow">
<link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
<header class="nav">
  <div class="container nav__row">
    <a href="/" class="logo logo--md">
      <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
      <span class="logo__text"><span class="logo__name">CASCOB</span><span class="logo__sub">recuperação de créditos</span></span>
    </a>
  </div>
</header>

<main style="min-height:80vh;display:flex;align-items:center;padding:120px 0 80px;">
  <div class="container" style="text-align:center;max-width:680px;">
    <span class="kicker">tudo certo</span>
    <h1 class="h2" style="font-size:clamp(40px,5.6vw,72px);">Pronto. <em>O WhatsApp deve ter aberto.</em></h1>
    <p class="prose" style="margin:24px auto 32px;max-width:520px;">Se a janela do WhatsApp não abriu sozinha, clique no botão abaixo. Em até 30 minutos um especialista da Cascob começa a sua análise gratuita.</p>
    <p>
      <a class="btn btn--gold" href="https://wa.me/5517991999006" target="_blank" rel="noopener" data-wa-source="obrigado">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
        Abrir WhatsApp manualmente
      </a>
    </p>
    <p style="margin-top:48px;">
      <a href="/" style="color:var(--gold-readable);font-weight:600;">← Voltar para a página inicial</a>
    </p>
  </div>
</main>

<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/analytics.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Criar `404.html`**

Criar `<root>/cascob-v2/404.html`:
```html
<!DOCTYPE html>
<html lang="pt-BR" data-mode="claro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Página não encontrada — Cascob</title>
<meta name="robots" content="noindex,follow">
<link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
<header class="nav">
  <div class="container nav__row">
    <a href="/" class="logo logo--md">
      <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
      <span class="logo__text"><span class="logo__name">CASCOB</span><span class="logo__sub">recuperação de créditos</span></span>
    </a>
  </div>
</header>

<main style="min-height:80vh;display:flex;align-items:center;padding:120px 0 80px;">
  <div class="container" style="text-align:center;max-width:680px;">
    <span class="kicker">404</span>
    <h1 class="h2">Essa página saiu de circulação<br><em>— mas o nome do brasileiro a gente recupera.</em></h1>
    <p class="prose" style="margin:24px auto 40px;max-width:520px;">A página que você procura mudou de endereço ou nunca existiu. Tente um dos links abaixo:</p>
    <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;">
      <a class="btn btn--ghost" href="/">Página inicial</a>
      <a class="btn btn--ghost" href="/#servicos">Nossos serviços</a>
      <a class="btn btn--ghost" href="/#midia">Mídia</a>
      <a class="btn btn--gold" href="https://wa.me/5517991999006" target="_blank" rel="noopener" data-wa-source="404">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91Z"/></svg>
        Falar no WhatsApp
      </a>
    </div>
  </div>
</main>

<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/analytics.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Verificação**

Abrir as duas páginas no navegador. Esperado: layouts limpos, links funcionais.

- [ ] **Step 4: Commit**

```bash
git add cascob-v2/obrigado.html cascob-v2/404.html
git commit -m "feat(pages): add obrigado + 404 pages"
```

---

## Task 14: SEO técnico — `sitemap.xml` + `robots.txt`

**Files:**
- Create: `<root>/cascob-v2/sitemap.xml`
- Create: `<root>/cascob-v2/robots.txt`

- [ ] **Step 1: Criar `sitemap.xml`**

Criar `<root>/cascob-v2/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://DOMINIO_PLACEHOLDER/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://DOMINIO_PLACEHOLDER/servicos/dividas-prescritas</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://DOMINIO_PLACEHOLDER/servicos/fraude-consignado</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Criar `robots.txt`**

Criar `<root>/cascob-v2/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /obrigado
Disallow: /obrigado.html

Sitemap: https://DOMINIO_PLACEHOLDER/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add cascob-v2/sitemap.xml cascob-v2/robots.txt
git commit -m "feat(seo): add sitemap and robots.txt"
```

---

## Task 15: Cache & deploy — `_redirects`, `_headers`, `.htaccess`

**Files:**
- Create: `<root>/cascob-v2/_redirects`
- Create: `<root>/cascob-v2/_headers`
- Create: `<root>/cascob-v2/.htaccess`

- [ ] **Step 1: Criar `_redirects` (Netlify/Cloudflare Pages)**

Criar `<root>/cascob-v2/_redirects`:
```
# URLs limpas para páginas SEO
/servicos/dividas-prescritas    /servicos/dividas-prescritas.html    200
/servicos/fraude-consignado     /servicos/fraude-consignado.html     200
/obrigado                       /obrigado.html                        200

# Fallback 404
/*    /404.html    404
```

- [ ] **Step 2: Criar `_headers` (Netlify/Cloudflare Pages)**

Criar `<root>/cascob-v2/_headers`:
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/*.html
  Cache-Control: public, max-age=3600
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- [ ] **Step 3: Criar `.htaccess` (Apache/cPanel)**

Criar `<root>/cascob-v2/.htaccess`:
```apache
# Cascob — Apache config

# Compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json text/xml image/svg+xml
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  <FilesMatch "\.(woff2|ttf|otf)$">
    Header set Access-Control-Allow-Origin "*"
  </FilesMatch>
</IfModule>

# URLs limpas
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^servicos/dividas-prescritas$ /servicos/dividas-prescritas.html [L]
RewriteRule ^servicos/fraude-consignado$ /servicos/fraude-consignado.html [L]
RewriteRule ^obrigado$ /obrigado.html [L]

# 404 customizado
ErrorDocument 404 /404.html

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

- [ ] **Step 4: Commit**

```bash
git add cascob-v2/_redirects cascob-v2/_headers cascob-v2/.htaccess
git commit -m "feat(deploy): add Netlify/CF/Apache config for cache, redirects, headers"
```

---

## Task 16: Imagens — converter logo para WebP, criar OG image, favicon

**Files:**
- Create: `<root>/cascob-v2/assets/img/logo-cascob.webp`
- Create: `<root>/cascob-v2/assets/img/og-image.jpg`
- Create: `<root>/cascob-v2/assets/img/icons/favicon.svg`
- Create: `<root>/cascob-v2/assets/img/icons/apple-touch-icon.png`

- [ ] **Step 1: Converter logo PNG para WebP**

Usar [squoosh.app](https://squoosh.app) ou comando:
```bash
# Se tiver cwebp instalado
cwebp -q 92 cascob-v2/assets/img/logo-cascob.png -o cascob-v2/assets/img/logo-cascob.webp

# Alternativa: ImageMagick
magick cascob-v2/assets/img/logo-cascob.png -quality 92 cascob-v2/assets/img/logo-cascob.webp
```

Resultado esperado: arquivo `.webp` ~30-50% menor que o PNG original.

- [ ] **Step 2: Atualizar HTML para usar `<picture>` com WebP + PNG fallback**

Em `index.html`, `obrigado.html`, `404.html` e `servicos/*.html`, substituir todos:
```html
<img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
```

Por:
```html
<picture>
  <source srcset="/assets/img/logo-cascob.webp" type="image/webp">
  <img class="logo__img" src="/assets/img/logo-cascob.png" alt="" width="44" height="44">
</picture>
```

E o hero (logo grande) idem:
```html
<picture>
  <source srcset="/assets/img/logo-cascob.webp" type="image/webp">
  <img src="/assets/img/logo-cascob.png" alt="" width="200" height="200">
</picture>
```

- [ ] **Step 3: Criar OG image (1200x630)**

Esta é uma imagem para compartilhamento em redes sociais. Opções:
1. Criar manualmente em Figma/Canva (1200x630, fundo preto + logo dourado + texto "Limpe seu nome em 30 dias úteis")
2. Usar placeholder até Jefferson criar a final

Para placeholder funcional, baixar de:
```bash
curl -o cascob-v2/assets/img/og-image.jpg "https://placehold.co/1200x630/111111/c89b3c.jpg?text=CASCOB+%E2%80%94+Limpe+seu+nome+em+30+dias+%C3%BAteis"
```

Adicionar ao `README.md` da Task 18 a tarefa: "Substituir og-image.jpg por design final (1200x630)".

- [ ] **Step 4: Criar favicon SVG**

Criar `<root>/cascob-v2/assets/img/icons/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#111111"/>
  <text x="16" y="22" text-anchor="middle" font-family="Georgia,serif" font-weight="600" font-size="18" fill="#c89b3c" letter-spacing="0.05em">C</text>
</svg>
```

- [ ] **Step 5: Criar apple-touch-icon (180x180 PNG)**

Renderizar a favicon em PNG 180x180 ou usar placeholder:
```bash
curl -o cascob-v2/assets/img/icons/apple-touch-icon.png "https://placehold.co/180x180/111111/c89b3c.png?text=C"
```

- [ ] **Step 6: Verificação**

Recarregar `index.html`. Esperado: site renderiza igual ao anterior, mas agora usando WebP onde suportado. Verificar Network tab no DevTools — `logo-cascob.webp` carregado em vez do PNG em browsers modernos.

- [ ] **Step 7: Commit**

```bash
git add cascob-v2/assets/img/
git add cascob-v2/index.html cascob-v2/obrigado.html cascob-v2/404.html cascob-v2/servicos/
git commit -m "feat(perf): add WebP logo + OG image + favicon"
```

---

## Task 17: Auditoria final — Lighthouse + a11y + ajustes

**Files:**
- Modify: `<root>/cascob-v2/assets/css/styles.css` (se houver ajustes)
- Modify: `<root>/cascob-v2/index.html` (se houver ajustes)

- [ ] **Step 1: Servir o site localmente**

```bash
cd cascob-v2
npx serve -l 3000
```

Site disponível em `http://localhost:3000`.

- [ ] **Step 2: Rodar Lighthouse (mobile)**

Em Chrome DevTools (F12) → Lighthouse tab:
- Mode: Navigation
- Device: Mobile
- Categories: todas marcadas (Performance, Accessibility, Best Practices, SEO)
- Click "Analyze page load"

Critério de aceitação: cada categoria ≥ 90.

Anotar quais quesitos estão abaixo. Causas comuns + correções:
- **Performance < 90**: imagens muito grandes (revisar Step 6 da Task 16), JS bloqueante (verificar `defer` nos scripts), CSS muito grande (considerar minificar)
- **Accessibility < 90**: contraste insuficiente (rodar Step 3 abaixo), labels faltando, alt text vazio
- **Best Practices < 90**: HTTPS não usado em local (ignorar), erros no console
- **SEO < 90**: meta description faltando, canonical errado, link com texto inadequado

- [ ] **Step 3: Auditoria de acessibilidade com axe DevTools**

Instalar [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) (extensão Chrome). Rodar em `http://localhost:3000`. Critério: 0 erros críticos.

Erros típicos a corrigir inline:
- "Elements must have sufficient color contrast" → ajustar `--gold-readable` ou cor específica
- "Form fields must have labels" → adicionar `<label>` em qualquer input sem
- "ARIA hidden elements must not contain focusable elements" → revisar `aria-hidden` em containers com botões

- [ ] **Step 4: Validar HTML**

```bash
npx html-validate cascob-v2/index.html cascob-v2/servicos/dividas-prescritas.html cascob-v2/servicos/fraude-consignado.html cascob-v2/obrigado.html cascob-v2/404.html
```

Critério: 0 erros (warnings de inline styles aceitáveis).

- [ ] **Step 5: Validar Schema.org**

Para `index.html` e cada página em `/servicos/`, copiar conteúdo dos `<script type="application/ld+json">` e validar em https://search.google.com/test/rich-results. Critério: 0 erros.

- [ ] **Step 6: Smoke test funcional**

Em `http://localhost:3000`, verificar:
- [ ] Navegação por teclado (Tab) atinge todos os elementos focáveis em ordem lógica
- [ ] Skip-link aparece ao primeiro Tab
- [ ] Modo escuro alterna e persiste após reload
- [ ] Accordion serviços abre/fecha
- [ ] FAQ abre/fecha
- [ ] Counter dos resultados anima ao rolar
- [ ] Form com nome+telefone+faixa abre WhatsApp e redireciona pra /obrigado
- [ ] /servicos/dividas-prescritas e /servicos/fraude-consignado abrem (precisa servidor — não funciona via file://)
- [ ] /404 (qualquer URL inválida) mostra a página 404
- [ ] Logo no header e footer linkam pra "/"
- [ ] Mídia: subseções "Vídeos" e "Slides" estão escondidas (config vazia)
- [ ] Mídia: ao adicionar 1 reel + 2 slides em `midia-config.js`, ambas aparecem corretamente

- [ ] **Step 7: Smoke test mobile**

DevTools → Device toolbar (Ctrl+Shift+M) → iPhone 12 Pro:
- [ ] Header recolhe ao rolar
- [ ] Hero readable, botões empilhados
- [ ] Services em 1 ou 2 colunas
- [ ] WhatsApp flutuante visível, não tampa form
- [ ] Form inputs maiores que 44px
- [ ] Carousel de slides faz swipe nativo

- [ ] **Step 8: Commit ajustes (se houver)**

```bash
git add cascob-v2/
git commit -m "fix(a11y,perf): address Lighthouse and axe findings"
```

---

## Task 18: Documentação — `README.md`

**Files:**
- Create: `<root>/cascob-v2/README.md`

- [ ] **Step 1: Criar README.md**

Criar `<root>/cascob-v2/README.md`:
```markdown
# Cascob — Site v2

Site institucional da Cascob Recuperação de Créditos. HTML/CSS/JS estático puro, sem build, sem framework.

## Estrutura

- `index.html` — landing principal
- `servicos/` — páginas SEO (dívidas prescritas, fraude consignado)
- `obrigado.html` — thank-you após formulário
- `404.html` — página de erro
- `assets/css/styles.css` — todo CSS
- `assets/js/` — JavaScript modular
  - `main.js` — header, theme toggle, accordions, contadores, form
  - `midia-config.js` — **EDITE AQUI** para mídia
  - `instagram-lazy.js` — render dos Reels e slides
  - `analytics.js` — GA4 + Pixel
- `assets/img/` — imagens, logo, OG, favicons
  - `slides/` — **COLOQUE AQUI** as imagens dos carrosséis
- `assets/fonts/` — Cormorant + Manrope (self-hosted)
- `sitemap.xml`, `robots.txt`, `_redirects`, `_headers`, `.htaccess` — SEO + deploy

## Como atualizar a mídia (Reels e Slides)

Editar **um único arquivo**: `assets/js/midia-config.js`.

### Adicionar um Reel do Instagram

1. Copie a URL do Reel: `https://www.instagram.com/reel/DABC123xyz/`
2. Pegue só o ID (parte entre `/reel/` e `/`): `DABC123xyz`
3. Adicione no array `reels`:
   ```js
   { id: "DABC123xyz", titulo: "Como negociar dívida prescrita" }
   ```
4. Salve o arquivo. Recarregue o site. Pronto.

### Adicionar um Slide

1. Salve a imagem em `assets/img/slides/` (recomendado: 1080x1080 ou 1080x1350, JPG ou WebP, < 200KB)
2. Adicione no array `slides`:
   ```js
   { src: "/assets/img/slides/01-golpes.jpg", alt: "Os 3 golpes mais comuns de limpa nome" }
   ```
3. Salve. Recarregue. Pronto.

### Remover um Reel ou Slide

Apague a linha correspondente do array.

### Esconder a seção Mídia inteira

Deixe os dois arrays vazios. As subseções "Vídeos" e "Slides" são escondidas automaticamente quando não há itens.

## Antes de publicar — checklist do Jefferson

- [ ] **Domínio**: substituir `DOMINIO_PLACEHOLDER` pelo domínio real em todos os arquivos. Use:
  ```bash
  grep -rl DOMINIO_PLACEHOLDER cascob-v2/ | xargs sed -i 's/DOMINIO_PLACEHOLDER/seu-dominio.com.br/g'
  ```
- [ ] **GA4 ID**: editar `assets/js/analytics.js`, substituir `G-XXXXXXXXXX` pelo ID real
- [ ] **Meta Pixel ID**: editar `assets/js/analytics.js`, substituir `000000000000000` pelo ID real
- [ ] **Email**: se tiver email de contato, adicionar no footer (`index.html`, `404.html`, `obrigado.html`, páginas SEO) e no schema.org Organization
- [ ] **OG image**: substituir `assets/img/og-image.jpg` pelo design final (1200x630, JPG)
- [ ] **Mídia inicial**: adicionar pelo menos 1 reel e 2-3 slides em `midia-config.js`

## Deploy

### Netlify (recomendado)

1. Crie conta em netlify.com (grátis)
2. Drag-and-drop a pasta `cascob-v2/` na home do Netlify
3. Aguarde upload (~30s)
4. Site ativo. Configure domínio em Settings > Domain.

### Cloudflare Pages

1. Crie conta em pages.cloudflare.com (grátis)
2. Conecte o repositório Git ou drag-and-drop
3. Domínio + SSL automáticos

### Hospedagem cPanel/Apache

1. Compactar `cascob-v2/` em zip
2. Upload via cPanel File Manager para `public_html/`
3. Extrair. O `.htaccess` configura o resto.

## Editar copy

A copy do site está direto no HTML. Buscar pelo texto e editar.

Exemplo: trocar "Limpe seu nome em 30 dias úteis":
```bash
grep -rn "30 dias úteis" cascob-v2/
```

Não há sistema de templates — cada página é independente. Mantenha consistência manualmente.

## Voltando ao protótipo original

O site original (React + CDN) está em `../project/`. Inalterado.
```

- [ ] **Step 2: Verificar README**

```bash
cat cascob-v2/README.md | head -80
```

- [ ] **Step 3: Commit final**

```bash
git add cascob-v2/README.md
git commit -m "docs: add README with maintenance instructions"
```

- [ ] **Step 4: Tag de versão**

```bash
git tag -a v2.0.0-rc1 -m "Cascob v2 — first release candidate"
```

---

## Self-Review Checklist

Após completar todas as tasks, verificar:

**1. Spec coverage:**
- [x] Stack HTML/CSS/JS estático: Tasks 2-15
- [x] Seção Mídia (Reels + slides): Tasks 4, 8
- [x] Form leve com WhatsApp: Tasks 5, 10
- [x] 2 páginas SEO: Tasks 11, 12
- [x] obrigado.html + 404.html: Task 13
- [x] Schema.org Organization + FAQPage + Service: Tasks 3, 6, 11, 12
- [x] sitemap + robots: Task 14
- [x] Cache + redirects: Task 15
- [x] WebP + OG image + favicon: Task 16
- [x] Self-hosted fonts: Task 1
- [x] Theme toggle: Tasks 3, 7
- [x] Accordion serviços: Tasks 2, 4, 7
- [x] FAQ ampliado (10 perguntas): Tasks 6, 7
- [x] GA4 + Pixel + 6 eventos: Task 9
- [x] Counter animado: Tasks 5, 7
- [x] Skip-link, focus rings, prefers-reduced-motion: Task 2
- [x] Mobile responsive: herdado do CSS original (Task 2)
- [x] Lighthouse 90+ verificado: Task 17
- [x] axe DevTools sem erros: Task 17
- [x] README com instruções: Task 18

**2. Placeholder scan:**
- `DOMINIO_PLACEHOLDER` em URLs canonical, og:url, schemas, sitemap — **intencional**, README documenta substituição
- `G-XXXXXXXXXX` (GA4) e `000000000000000` (Pixel) em analytics.js — **intencional**, README documenta substituição
- `og-image.jpg` placeholder — **intencional**, README documenta substituição
- Sem TODOs, sem "implementar depois"

**3. Type/name consistency:**
- `cascobTrack` (window global) ↔ `track()` (helper local) ↔ `cascob:event` (custom event) — coerentes
- `data-wa-source` em links → `whatsapp_click` event com param `local` — coerentes
- `data-servico` no card → `servico_expandido` event com param `servico` — coerentes
- IDs de elementos referenciados por JS: `site-header`, `theme-toggle`, `reels-container`, `slides-track`, `slides-prev`, `slides-next`, `slides-dots`, `form-leve`, `form-error`, `faq-list`, `servicos-grid` — todos definidos no HTML e usados no JS

---

## Execution Handoff

**Plan complete and saved to [docs/superpowers/plans/2026-05-08-cascob-site-overhaul.md](2026-05-08-cascob-site-overhaul.md). Two execution options:**

**1. Subagent-Driven (recommended)** — Eu despacho um subagente fresco por task, revisamos entre tasks, iteração rápida.

**2. Inline Execution** — Executo as tasks nesta sessão usando executing-plans, com checkpoints pra revisão a cada 3-4 tasks.

**Which approach?**
