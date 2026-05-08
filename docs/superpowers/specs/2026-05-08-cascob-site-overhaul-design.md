# Cascob — Reescrita do Site (v2)

**Data:** 2026-05-08
**Autor:** Jefferson + Claude (brainstorming)
**Status:** Aprovado pelo usuário, aguardando plano de implementação

---

## Contexto

Site atual em `site-cascob/project/` é um protótipo do Claude Design — React via CDN com Babel compilando JSX no navegador. Funciona, mas:

- LCP alto (Babel + React UMD bloqueiam a renderização)
- SEO prejudicado (HTML inicial vazio, conteúdo só aparece após JS executar)
- Sem estrutura para mídia (vídeos, slides)
- Sem analytics, sem schema.org, sem sitemap
- `tweaks-panel.jsx` é resíduo da ferramenta de design

A Cascob é uma empresa de **recuperação de crédito** em São José do Rio Preto, atende todo o Brasil desde 2012. CNPJ 22.770.533/0001-95. Telefone (17) 99199-9006. Instagram @cascobsjrp. Domínio: a comprar.

## Objetivo

Reescrever o site mantendo o visual e a copy atuais, mas:

1. Trocar a stack para HTML/CSS/JS estático (sem React)
2. Adicionar seção **Mídia** com Reels do Instagram + slides em carrossel
3. Implementar SEO técnico (schema.org, sitemap, meta tags, FAQPage rico)
4. Atingir Lighthouse 90+ em Performance, SEO, Acessibilidade, Best Practices
5. Adicionar formulário leve de captação que monta link WhatsApp
6. Criar 2 páginas SEO específicas (dívidas prescritas, fraude consignado)
7. Habilitar GA4 + Meta Pixel com eventos de conversão
8. Polir visual (microanimações, hover states, modo escuro)

## Não-objetivos

- **Não reescrever a copy** — está boa, só revisão fina (typos, polimento).
- **Não trocar paleta nem tipografia** (creme/preto/dourado, Cormorant Garamond + Manrope).
- **Não criar backend** — formulário monta link WhatsApp client-side, sem armazenar dados.
- **Não criar painel administrativo** — atualização de mídia via edição de arquivo de config (`midia-config.js`).
- **Não usar `LocalBusiness`** no schema (o usuário não quer expor endereço); usar `Organization` com `areaServed: Brasil`.

## Decisões já tomadas (durante o brainstorming)

| Decisão | Escolha | Motivo |
|---|---|---|
| Stack | HTML/CSS/JS estático puro | Performance + SEO + zero infra |
| Posição da seção Mídia | Depois de Serviços | Vitrine logo após explicar o que faz |
| Nome da seção no menu | "Mídia" | — |
| Quantidade inicial de mídia | 3–6 itens | Sem filtro/paginação |
| Vídeos | Reels do Instagram embedados | Mantém engajamento na conta IG |
| Slides | Carrossel de imagens estáticas | Estilo carrossel do IG |
| Formulário | Leve (nome + telefone + faixa de dívida) → monta WhatsApp | Converte melhor que botão puro, zero infra |
| Estrutura | Híbrida: single-page + 2 páginas SEO | Máximo retorno por esforço |
| Páginas SEO | Dívidas prescritas, Fraude consignado | Maior volume de busca long-tail |
| Endereço público | Não exibir | Estratégia nacional |
| Email/Domínio | Placeholder no spec | Usuário fornece depois |

## Estrutura de arquivos

```
cascob-v2/
├── index.html                         ← landing single-page
├── servicos/
│   ├── dividas-prescritas.html       ← página SEO 1
│   └── fraude-consignado.html        ← página SEO 2
├── obrigado.html                      ← thank-you (rastreio de conversão)
├── 404.html
├── assets/
│   ├── css/
│   │   └── styles.css                 ← um único arquivo, organizado por seção
│   ├── js/
│   │   ├── main.js                    ← vanilla JS (header scroll, accordion, FAQ, form, carrossel)
│   │   ├── midia-config.js            ← edita aqui pra adicionar Reels/slides
│   │   ├── analytics.js               ← GA4 + Pixel + eventos
│   │   └── instagram-lazy.js          ← carrega embed.js do IG ao rolar
│   ├── img/
│   │   ├── logo-cascob.webp
│   │   ├── logo-cascob.png            ← fallback
│   │   ├── og-image.jpg               ← 1200x630 pra compartilhamento
│   │   ├── slides/                    ← imagens dos slides (usuário sobe)
│   │   └── icons/                     ← ícones SVG inline preferencialmente
│   └── fonts/                         ← Cormorant + Manrope self-hosted (woff2)
├── sitemap.xml
├── robots.txt
├── .htaccess                          ← cache + redirects (Apache/cPanel)
├── _redirects                         ← redirects (Netlify/Cloudflare Pages)
├── _headers                           ← cache headers (Netlify/Cloudflare Pages)
└── README.md                          ← como atualizar mídia, deploy, edição de copy
```

## Páginas — estrutura por página

### `index.html`

Ordem das seções (mantém visual atual + nova Mídia):

1. **Header** (sticky, encolhe ao rolar) — Logo · [Sobre · Serviços · Mídia · Como funciona · Depoimentos · Dúvidas] · botão "Falar agora"
2. **Hero** — eyebrow, H1 "Limpe seu nome em 30 dias úteis.", lede, 2 CTAs (WhatsApp + "Ver serviços"), 3 trust metrics (12+, 2 mil, 30)
3. **Strip** (ticker horizontal infinito) — 5 frases curtas
4. **Sobre** — kicker "01", H2, 2 parágrafos, lista de checks
5. **Serviços** — kicker "02", grid de 8 cards. Cada card é **clicável** e expande painel inline com detalhes (300-400 chars). Os cards "Dívidas prescritas" e "Fraude no consignado" abrem a página SEO em vez de expandir.
6. **Mídia** (NOVA) — kicker "03", H2 "Cascob na prática.", subseção Vídeos (3 Reels) + subseção Slides (carrossel), CTA "Ver mais no @cascobsjrp"
7. **Como funciona** — kicker "04", 4 steps numerados, CTA WhatsApp no final
8. **Form leve** — kicker "05", nome + telefone + radio de faixa de dívida → monta WhatsApp
9. **Resultados** — kicker "06", 4 metrics com contagem animada ao entrar na viewport
10. **Depoimentos** — kicker "07", 3 quotes (slider mobile, grid desktop)
11. **FAQ** — kicker "08", accordion com 8-10 perguntas (ampliar de 7 atuais para incluir long-tail SEO)
12. **Contato** — kicker "09", lado-esquerdo com texto, lado-direito com card WhatsApp + horários
13. **Footer** — logo + descrição, contato, navegação, aviso legal (CNPJ), copyright

Renumeração dos kickers: hoje vai de 01 a 07. Com a inserção de Mídia (após Serviços) e Form (após Como funciona), a nova numeração é 01–09.

### `servicos/dividas-prescritas.html`

- Mesmo header e footer da home
- Breadcrumb: Home > Serviços > Dívidas prescritas
- H1: "Dívidas prescritas: Ativos, Ipanema, Itapeva, NPL II"
- ~400 palavras explicando: o que é prescrição (5 anos pelo CDC), como identificar, o que a Cascob faz, casos comuns (sem nomes)
- Seção "FAQ sobre prescrição" (5–6 perguntas específicas, com Schema FAQPage)
- CTA WhatsApp com mensagem pré-pronta: "Oi, tenho cobrança que pode ser prescrita e quero a análise gratuita."
- Schema.org `Service` (provider=Organization Cascob)
- Link interno pra home e pra outra página SEO

### `servicos/fraude-consignado.html`

- Mesmo padrão acima
- H1: "Fraude no consignado: como identificar e como restituir"
- ~400 palavras sobre: empréstimos consignados não solicitados (foco INSS, servidores), prazo, restituição em dobro (Art. 42 CDC), papel da Cascob
- FAQ específica
- CTA pré-pronto: "Oi, suspeito de fraude no consignado e quero a análise gratuita."

### `obrigado.html`

- Página simples, mensagem curta: "Pronto. Já te direcionamos pro WhatsApp da Cascob. Se a janela não abriu, [clique aqui]."
- Dispara `conversion` event no GA4 e Pixel
- Botão pra voltar à home

### `404.html`

- Mesmo header/footer
- Mensagem: "Essa página saiu de circulação — mas o nome do brasileiro a gente recupera."
- 4 links principais: Home, Serviços, Mídia, WhatsApp

## Componente: Seção Mídia

### Layout (HTML estrutural)

```html
<section class="section section--cream-deep" id="midia">
  <div class="container">
    <div class="section__head">
      <span class="kicker">03 — mídia</span>
      <h2 class="h2">Cascob na prática.</h2>
      <p class="prose prose--muted">Conteúdo do nosso Instagram <a href="https://instagram.com/cascobsjrp" rel="noopener" target="_blank">@cascobsjrp</a>.</p>
    </div>

    <h3 class="midia__sub">Vídeos</h3>
    <div class="midia__reels" id="reels-container">
      <!-- preenchido via JS a partir de midia-config.js -->
    </div>

    <h3 class="midia__sub">Slides</h3>
    <div class="midia__slides" id="slides-container">
      <div class="slides__track">
        <!-- preenchido via JS -->
      </div>
      <button class="slides__nav slides__nav--prev" aria-label="Anterior">‹</button>
      <button class="slides__nav slides__nav--next" aria-label="Próximo">›</button>
      <div class="slides__dots" id="slides-dots"></div>
    </div>

    <div class="section__foot">
      <a class="btn btn--ghost" href="https://instagram.com/cascobsjrp" rel="noopener" target="_blank">Ver mais no @cascobsjrp</a>
    </div>
  </div>
</section>
```

### Configuração (arquivo único pra editar)

`assets/js/midia-config.js`:

```js
// EDITAR AQUI PARA ADICIONAR/REMOVER MÍDIA
// Após editar, basta recarregar o site — sem build, sem deploy especial.
window.MIDIA = {
  reels: [
    // Cole o ID do Reel: a parte entre /reel/ e / da URL do Instagram
    // Ex: instagram.com/reel/DABC123xyz/  →  id: "DABC123xyz"
    // { id: "DABC123xyz", titulo: "Como negociar dívida prescrita" },
  ],
  slides: [
    // Salve a imagem em assets/img/slides/ e adicione aqui
    // { src: "assets/img/slides/01.jpg", alt: "Texto alternativo descritivo" },
  ]
};
```

### Comportamento técnico

**Reels:**
- Quando a seção entra na viewport (Intersection Observer, threshold 0.1), `instagram-lazy.js` injeta o script `https://www.instagram.com/embed.js` no `<head>` (uma vez só)
- Para cada item em `MIDIA.reels`, gera um `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/{id}/">` com o título dentro
- Após o script carregar, ele processa todos os blockquotes automaticamente
- Fallback se o script falhar: bloco mostra link "Ver no @cascobsjrp"
- Se `MIDIA.reels` estiver vazio, a subseção "Vídeos" some inteira

**Slides:**
- Container com `scroll-snap-type: x mandatory` e `overflow-x: auto`
- Cada slide é um `<img loading="lazy" width="..." height="...">` com `scroll-snap-align: center`
- Setas (`prev`/`next`) chamam `scrollBy({ left: ±slideWidth, behavior: 'smooth' })`
- Dots refletem o slide atual (Intersection Observer no track)
- Swipe nativo no mobile (touch já é coberto por `overflow-x: auto`)
- Se `MIDIA.slides` estiver vazio, a subseção some

**Responsivo:**
- Desktop (≥960px): 3 reels lado a lado, slides 2 visíveis por vez
- Tablet (640–959px): 2 reels, 1.5 slides visíveis
- Mobile (<640px): 1 reel, 1 slide

## Componente: Form leve

### Markup

```html
<section class="section section--black" id="comecar">
  <div class="container form-leve">
    <div class="form-leve__head">
      <span class="kicker kicker--gold">05 — comece a análise</span>
      <h2 class="h2 h2--light">Em 30 segundos a gente já está conversando.</h2>
      <p class="prose prose--light">Preenche aqui que abrimos o WhatsApp já com o seu caso.</p>
    </div>
    <form class="form-leve__form" novalidate>
      <label>
        <span>Seu nome</span>
        <input name="nome" type="text" required minlength="2" autocomplete="name">
      </label>
      <label>
        <span>Telefone (com DDD)</span>
        <input name="telefone" type="tel" required pattern="\(\d{2}\)\s?\d{4,5}-\d{4}" autocomplete="tel">
      </label>
      <fieldset>
        <legend>Valor aproximado da dívida</legend>
        <label><input type="radio" name="faixa" value="ate-3k" required> Até R$ 3.000</label>
        <label><input type="radio" name="faixa" value="3k-10k"> R$ 3.000 a R$ 10.000</label>
        <label><input type="radio" name="faixa" value="10k-30k"> R$ 10.000 a R$ 30.000</label>
        <label><input type="radio" name="faixa" value="30k+"> Acima de R$ 30.000</label>
        <label><input type="radio" name="faixa" value="nao-sei"> Não sei ao certo</label>
      </fieldset>
      <button type="submit" class="btn btn--gold">Abrir WhatsApp</button>
      <p class="form-leve__legal">Seus dados não são armazenados. Apenas montamos o link do WhatsApp pra você.</p>
    </form>
  </div>
</section>
```

### Comportamento

- Máscara de telefone aplicada via JS (`(17) 99999-9999`)
- Validação client-side antes do submit. Se inválido, destaca campo + mensagem inline (sem alert).
- Ao submeter:
  1. Monta mensagem: `"Oi, sou {nome}. Tenho dívida na faixa {faixa-legível} e quero a análise gratuita. Telefone: {telefone}."`
  2. Dispara evento `formulario_enviado` no GA4 + Pixel com `faixa` como parâmetro
  3. Abre `https://wa.me/5517991999006?text={mensagem-encoded}` em nova aba
  4. Redireciona a aba atual pra `/obrigado.html` (rastreio limpo de conversão)

### Sem backend

Nada é enviado pra servidor. O formulário é puramente um construtor de URL. A LGPD é trivialmente atendida (sem coleta = sem tratamento).

## Acessibilidade (alvo: WCAG AA, idealmente AAA em texto)

- Contraste verificado em todas as combinações cor-fundo (especialmente dourado sobre creme — pode estar abaixo de AA atualmente, ajustar tom se necessário)
- Skip-link "pular para conteúdo" como primeiro elemento focável
- Todos os botões/links com `aria-label` quando o conteúdo for ícone-only (ex: setas do carrossel, WhatsApp flutuante quando recolhido)
- Accordion de serviços e FAQ com `aria-expanded`, `aria-controls` e gerenciamento de foco correto
- Carrossel: setas com `aria-label`, dots com `aria-label="Slide N de M"`, slide ativo com `aria-current="true"`
- Formulário: `<label>` envolvendo cada input, `<fieldset>` + `<legend>` para grupo de radios, mensagens de erro com `aria-live="polite"`
- `prefers-reduced-motion`: desliga ticker animado, contagem de números, microanimações de hover
- Foco visível em todos os elementos interativos (não usar `outline: none` sem alternativa)
- Modo escuro: contrastes revisados separadamente

## SEO

### Meta tags (em todas as páginas)

```html
<title>Cascob — Recuperação de Crédito · Limpe seu nome em 30 dias úteis</title>
<meta name="description" content="...">
<link rel="canonical" href="https://{DOMINIO}/...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://{DOMINIO}/assets/img/og-image.jpg">
<meta property="og:url" content="...">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
```

### Schema.org (em `index.html`)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CASCOB Recuperação de Créditos",
  "url": "https://{DOMINIO}",
  "logo": "https://{DOMINIO}/assets/img/logo-cascob.png",
  "telephone": "+55-17-99199-9006",
  "foundingDate": "2012",
  "taxID": "22.770.533/0001-95",
  "areaServed": { "@type": "Country", "name": "Brasil" },
  "sameAs": ["https://instagram.com/cascobsjrp"]
}
```

### Schema.org `FAQPage` (gerado automaticamente a partir das FAQs)

Cada `<details>`/accordion da seção FAQ vira uma entrada do schema.

### Schema.org `Service` (nas páginas SEO)

Tipo de serviço, descrição, área atendida, fornecedor (Organization).

### Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://{DOMINIO}/</loc><priority>1.0</priority></url>
  <url><loc>https://{DOMINIO}/servicos/dividas-prescritas</loc><priority>0.8</priority></url>
  <url><loc>https://{DOMINIO}/servicos/fraude-consignado</loc><priority>0.8</priority></url>
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://{DOMINIO}/sitemap.xml
```

## Performance (alvo Lighthouse 90+)

| Item | Implementação |
|---|---|
| Fontes | Cormorant + Manrope self-hosted em woff2, preload das variantes usadas, `font-display: swap` |
| CSS | Crítico inline no `<head>`, resto via `<link rel="stylesheet">` com `media="print" onload="this.media='all'"` |
| JS | Tudo `defer`. Vanilla, sem framework. Total inicial: <10KB. |
| Imagens | WebP com fallback PNG via `<picture>`. `width`/`height` declarados. `loading="lazy"` em tudo abaixo da dobra. |
| Logo no hero | LCP element — preload + sem lazy |
| Instagram embed | Carrega só ao entrar na viewport da seção Mídia |
| GA4 + Pixel | Carregamento `defer`, idealmente após `load` event |
| Cache | 1 ano para assets versionados, 1h para HTML, via `_headers`/`.htaccess` |
| Compressão | Brotli/gzip habilitado pelo provedor |

## Analytics

### Google Analytics 4

- ID em variável (placeholder `G-XXXXXXXXXX` no spec, usuário substitui)
- Carregamento deferido
- Pageview automático

### Meta Pixel

- ID em variável (placeholder, usuário substitui)
- Carregamento deferido
- PageView automático

### Eventos rastreados (mesmo nome em GA4 e Pixel onde possível)

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | Qualquer clique em link WhatsApp | `local`: hero, header, contato, flutuante, form, faq, cta-final |
| `formulario_enviado` | Submit válido do form leve | `faixa`: ate-3k / 3k-10k / 10k-30k / 30k+ / nao-sei |
| `servico_expandido` | Clica num card de serviço que expande | `servico`: nome do serviço |
| `pagina_seo_visitada` | Pageview em `/servicos/*` | `pagina`: dividas-prescritas / fraude-consignado |
| `midia_visualizada` | Reel ou slide entra na viewport | `tipo`: reel / slide, `indice`: 0..n |
| `conversion` | Pageview em `/obrigado.html` | (configurar como conversão no GA4 e Pixel) |

## Mobile

- Header sticky encolhe (padding reduzido) ao rolar > 30px
- Botões mínimo 44×44px
- WhatsApp flutuante visível, **se fixa acima do form** quando o form aparece (não tampa)
- Texto base 16px (evita zoom iOS em inputs)
- Espaçamentos reduzidos em telas <640px (containers com padding 20px, hero menos folgado)
- Carrossel de slides: swipe nativo, dots maiores
- Menu desktop some abaixo de 720px → vira ícone hambúrguer que abre painel lateral
- Cards de serviço em coluna única
- Form com inputs em largura total

## Modo escuro

Já existe atributo `data-mode="claro"|"escuro"` no `<html>`. Toggle persistido em `localStorage`. No spec novo:

- Botão de toggle no header (ícone sol/lua), não mais no painel de tweaks (que será removido)
- Variáveis CSS para todas as cores; `[data-mode="escuro"]` redefine
- Imagens com filtro `brightness(0.9)` em modo escuro pra reduzir glare
- Logo: versão branca quando em escuro (`<picture>` com `prefers-color-scheme` ou via CSS)
- Reels do Instagram: força tema dark via parâmetro `?theme=dark` quando aplicável (o embed.js suporta)

## Deploy / Hospedagem

Recomendação: **Netlify** ou **Cloudflare Pages** (drag-and-drop da pasta `cascob-v2/`, SSL grátis, CDN global, deploy contínuo se conectar Git).

O spec entrega ambos os formatos de configuração:

- `_redirects` + `_headers` (Netlify, Cloudflare Pages)
- `.htaccess` (Apache/cPanel)

URLs limpas (`/servicos/dividas-prescritas` em vez de `.html`):
- Em Netlify/Cloudflare: já funciona automaticamente quando o arquivo existe como `dividas-prescritas.html`
- Em Apache: `RewriteRule` no `.htaccess`

## Conteúdo (revisão fina)

A copy atual está boa. Apenas revisar:

- Typos
- Pontuação consistente
- Quebras de linha em mobile (evitar viúvas)
- Adicionar 2-3 FAQs novas focadas em long-tail SEO ("É legalizado limpar nome?", "Quanto custa o serviço da Cascob?", "Vocês atendem em qual estado?")

## Riscos e atenções

| Risco | Mitigação |
|---|---|
| Instagram quebra a API de embed | Fallback "Ver no @cascobsjrp" + monitor manual |
| Usuário esquece de comprar domínio | Spec usa placeholder; site funciona em qualquer domínio que ele apontar |
| GA4/Pixel sem ID | Site funciona sem (analytics fica desligado), aviso no console |
| Form abre WhatsApp Web e não o app no desktop | Comportamento esperado do `wa.me`. Aceitar. |
| Cards de serviço SEO ("dívidas prescritas", "fraude consignado") não abrem mais inline — só link | Documentar no README; comportamento esperado |
| Modo escuro pode ter contraste fraco em alguns cantos | Auditoria a11y antes de finalizar |

## Critérios de aceitação

O site v2 está pronto quando:

1. ✅ Lighthouse mobile ≥ 90 em todas as 4 categorias na home
2. ✅ Visual idêntico (ou melhor) ao protótipo, em desktop e mobile
3. ✅ Funcionalidades atuais preservadas (FAQ accordion, ticker, modo claro/escuro, WhatsApp flutuante, hover states)
4. ✅ Seção Mídia carrega e funciona com 0 itens (some), 1 item, e 6 itens em ambas subseções
5. ✅ Form leve abre WhatsApp com mensagem montada corretamente em todos os cenários (4 faixas + "não sei")
6. ✅ Páginas SEO renderizam, têm schema válido (validar em search.google.com/test/rich-results), e linkam de volta pra home
7. ✅ Eventos GA4/Pixel disparam corretamente (verificar com DebugView)
8. ✅ Acessibilidade: navegação por teclado completa, screenreader testado em pelo menos 1 ferramenta (axe DevTools sem erros críticos)
9. ✅ Sitemap.xml e robots.txt válidos
10. ✅ README.md instrui Jefferson a: editar mídia, trocar IDs de analytics, fazer deploy

## Dados a serem fornecidos por Jefferson

- [ ] Domínio (após comprar)
- [ ] Email de contato (pra footer e schema)
- [ ] ID do Google Analytics 4
- [ ] ID do Meta Pixel
- [ ] Vídeos: links/IDs de Reels do @cascobsjrp para a primeira leva
- [ ] Slides: imagens em formato JPG/WebP (proporção 1:1 ou 4:5, recomendado 1080×1080 ou 1080×1350)

Sem esses dados o site funciona normalmente — placeholders serão usados, analytics fica desligado, mídia simplesmente não aparece até ser preenchida.

---

**Próximo passo:** invocar `writing-plans` para gerar o plano de implementação detalhado.
