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
- `CHECKLIST_DEPLOY.md` — checklist completo pré-publicação

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

Veja [CHECKLIST_DEPLOY.md](CHECKLIST_DEPLOY.md) para a lista completa. Resumo:

- [ ] Substituir `DOMINIO_PLACEHOLDER` em todos os arquivos pelo domínio real
- [ ] Editar `assets/js/analytics.js` com IDs reais do GA4 e Meta Pixel
- [ ] Substituir 3 placeholders de imagem (logo WebP, OG image 1200x630, apple-touch-icon)
- [ ] Adicionar 1+ Reels e 2+ slides em `midia-config.js`
- [ ] Rodar Lighthouse mobile (alvo 90+) e axe DevTools (0 erros críticos)

## Deploy

### Netlify (recomendado)

1. Crie conta em netlify.com (grátis)
2. Drag-and-drop a pasta `cascob-v2/` na home do Netlify
3. Aguarde upload (~30s)
4. Site ativo. Configure domínio em Settings > Domain.

Os arquivos `_redirects` e `_headers` configuram URLs limpas, cache e security headers automaticamente.

### Cloudflare Pages

1. Crie conta em pages.cloudflare.com (grátis)
2. Conecte o repositório Git ou drag-and-drop
3. Domínio + SSL automáticos
4. `_redirects` e `_headers` funcionam idênticos ao Netlify.

### Hospedagem cPanel/Apache

1. Compactar `cascob-v2/` em zip
2. Upload via cPanel File Manager para `public_html/`
3. Extrair. O `.htaccess` configura compressão, cache, URLs limpas, force HTTPS.

## Editar copy

A copy do site está direto no HTML. Buscar pelo texto e editar.

Exemplo: trocar "Limpe seu nome em 30 dias úteis":
```bash
grep -rn "30 dias úteis" cascob-v2/
```

Não há sistema de templates — cada página é independente. Mantenha consistência manualmente.

## Voltando ao protótipo original

O site original (React + CDN) está em `../project/`. Inalterado.
