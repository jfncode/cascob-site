# Checklist pré-deploy — Cascob v2

Tudo que precisa ser verificado/preenchido antes do site ir ao ar.

## 🔧 Substituições obrigatórias

- [ ] **Domínio**: substituir `DOMINIO_PLACEHOLDER` em todos os arquivos:
  ```bash
  grep -rl DOMINIO_PLACEHOLDER cascob-v2/ | xargs sed -i 's/DOMINIO_PLACEHOLDER/seu-dominio.com.br/g'
  ```
  (No macOS, use `sed -i ''` com aspas vazias.)

- [ ] **Google Analytics 4 ID**: editar `assets/js/analytics.js`, substituir `G-XXXXXXXXXX` pelo ID real
- [ ] **Meta Pixel ID**: editar `assets/js/analytics.js`, substituir `000000000000000` pelo ID real

## 🎨 Imagens placeholder a substituir

- [ ] `assets/img/logo-cascob.webp` (atualmente placeholder simples) → converter o PNG real em WebP
- [ ] `assets/img/og-image.jpg` (placeholder 1200x630 genérico) → criar design final em Figma/Canva
- [ ] `assets/img/icons/apple-touch-icon.png` (placeholder genérico) → renderizar logo real em 180x180

## 📱 Mídia inicial (opcional para 1ª versão)

- [ ] Adicionar pelo menos 1-3 Reels do @cascobsjrp em `assets/js/midia-config.js`
- [ ] Salvar 2-3 slides em `assets/img/slides/` e adicionar referências em `midia-config.js`

## ✅ Smoke tests no navegador

- [ ] Abrir `index.html` localmente (com `npx serve`) e percorrer toda a página
- [ ] Testar accordion de serviços (clicar nos cards 01-06)
- [ ] Testar FAQ (10 perguntas devem abrir/fechar)
- [ ] Testar form leve: submeter vazio (mostra erro), submeter completo (abre WhatsApp + redireciona pra /obrigado)
- [ ] Testar theme toggle (botão sol/lua no header)
- [ ] Verificar que o counter dos resultados anima ao rolar até "Resultados"
- [ ] Testar página `/servicos/dividas-prescritas` (FAQ funciona, breadcrumb funciona)
- [ ] Testar página `/servicos/fraude-consignado` (idem)
- [ ] Mobile: testar em DevTools com viewport iPhone 12 Pro

## 🎯 Lighthouse (alvo 90+)

Rodar Chrome DevTools > Lighthouse > Mobile, todas as 4 categorias:

- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

## ♿ Axe DevTools (acessibilidade)

Instalar extensão axe DevTools no Chrome e rodar em `http://localhost:3000`:

- [ ] 0 erros críticos

## 🔍 Validar Schema.org

Para `index.html`, `/servicos/dividas-prescritas`, `/servicos/fraude-consignado`:

- [ ] Cole conteúdo dos `<script type="application/ld+json">` em https://search.google.com/test/rich-results
- [ ] 0 erros, FAQs marcadas como rich results elegíveis

---

## Resultado dos checks automatizados (Task 17 — 2026-05-08)

| Check | Resultado |
|-------|-----------|
| HTML validate — element-permitted-content | ✅ CORRIGIDO (h3/p dentro de button → span) |
| HTML validate — unique-landmark | ✅ CORRIGIDO (aria-label adicionado em todos role="region") |
| HTML validate — no-inline-style | ⚠️ 72 ocorrências (estilos inline, não afeta funcionalidade) |
| HTML validate — prefer-native-element | ⚠️ 20 ocorrências (div role="region" vs section, semântica correta per ARIA) |
| JS syntax — main.js, midia-config.js, instagram-lazy.js, analytics.js | ✅ OK |
| JSON-LD — index.html (Organization + FAQPage) | ✅ 2 schemas válidos |
| JSON-LD — dividas-prescritas.html (Service + FAQPage) | ✅ 2 schemas válidos |
| JSON-LD — fraude-consignado.html (Service + FAQPage) | ✅ 2 schemas válidos |
| Links internos absolutos | ✅ Todos OK |
| Anchor links index.html | ✅ Todos OK (#como-funciona, #depoimentos, #faq, #main, #midia, #servicos, #sobre, #top) |
| CSS braces balanceados | ✅ 297 open = 297 close |
| Smoke test HTTP (npx serve) | ✅ HTTP 200 em todas as 5 páginas |
| data-wa-source count | ⚠️ index.html: 13 (esperado ~16, mas todos os botões WA presentes) |
