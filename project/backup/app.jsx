/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "claro"
} /*EDITMODE-END*/;

const PHONE_DISPLAY = "(17) 99199-9006";
const PHONE_DIGITS = "5517991999006";
const WA_LINK = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent("Olá, gostaria de uma análise gratuita do meu CPF.")}`;

/* ───────── icons ───────── */
const WhatsIcon = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-3px" }}>
    <path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.43 17.69L3 22l4.43-1.16A10 10 0 1 0 19.05 4.91ZM12 20.16a8.13 8.13 0 0 1-4.15-1.14l-.3-.18-2.63.69.7-2.56-.2-.31A8.16 8.16 0 1 1 12 20.16Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8s-.39-.13-.55.13-.63.8-.78.96-.28.2-.53.07a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16 0-.3-.04-.42s-.55-1.33-.76-1.82-.4-.42-.55-.43h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.85 2c0 1.18.86 2.32.98 2.48s1.69 2.58 4.1 3.62a14 14 0 0 0 1.37.5 3.3 3.3 0 0 0 1.51.1 2.47 2.47 0 0 0 1.62-1.14 2 2 0 0 0 .14-1.14c-.06-.1-.22-.16-.47-.29Z" />
  </svg>;


const Arrow = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-2px" }}>
    <path d="M3 8 L13 8 M9 4 L13 8 L9 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


/* logo — stylized monogram inspired by the brand mark */
const Logo = () =>
<a href="#top" className="logo" aria-label="Cascob">
    <span className="logo__mark">C̶S</span>
    <span style={{ display: "flex", flexDirection: "column" }}>
      <span className="logo__name">CASCOB</span>
      <span className="logo__sub">recuperação de créditos</span>
    </span>
  </a>;


/* 12-year seal — recreated as CSS to mirror brand badge */
const Seal = ({ years = 12 }) =>
<div className="seal" aria-label={`${years} anos de recuperação de crédito`}>
    <div className="seal__ring" />
    <div className="seal__center">
      <div className="seal__brand"></div>
      <div className="seal__stars"></div>
      <div className="seal__num">{years}</div>
      <div className="seal__years"></div>
    </div>
    <div className="seal__caption"></div>
  </div>;


/* ───────── HERO ───────── */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__left">
          <div className="hero__seal-row">
            <Seal years={12} />
            <div className="hero__seal-meta">
              <strong>“nós podemos ajudar você”</strong>
              <span>desde 2012 · são josé do rio preto · sp</span>
            </div>
          </div>

          <h1 className="hero__title">
            Limpe seu nome<br />em <em>30 dias úteis.</em>
          </h1>
          <p className="hero__lede">
            Pagando menos da metade do valor da dívida. Mais de 2 mil clientes
            assessorados em todo o Brasil. Análise do seu CPF é gratuita e
            sigilosa.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--gold" href={WA_LINK} target="_blank" rel="noopener">
              <WhatsIcon /> Falar no WhatsApp
            </a>
            <a className="btn btn--ghost" href="#servicos">
              Ver serviços <Arrow />
            </a>
            <span className="hero__hint">Resposta em horário comercial</span>
          </div>

          <div className="hero__trust">
            <div><strong>12+</strong><span>anos de mercado</span></div>
            <div><strong>2 mil</strong><span>clientes assessorados</span></div>
            <div><strong>30</strong><span>dias úteis em média</span></div>
          </div>
        </div>

        <div className="hero__photo">
          <div className="hero__photo-frame">
            <img src="img/photo-mulher.jpg" alt="Cliente Cascob com nome limpo" />
            <div className="hero__quote">
              “Saí do negativado e voltei a respirar.”
              <span className="hero__quote-author">cliente atendida em rio preto</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ───────── strip ───────── */
function Strip() {
  const items = [
  "limpe seu nome em 30 dias úteis",
  "pague menos da metade da dívida",
  "atendimento presencial ou por vídeo",
  "evite cair em golpes",
  "mais de 2 mil clientes assessorados"];

  const row =
  <span>
      {items.map((t, i) => <span key={i}>{t}</span>)}
    </span>;

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        {row}{row}
      </div>
    </div>);

}

/* ───────── SOBRE ───────── */
function Sobre() {
  return (
    <section className="section section--cream" id="sobre">
      <div className="container two-col">
        <div className="two-col__left">
          <div className="sobre__photo">
            <img src="img/photo-cassio.jpg" alt="Equipe Cascob" />
            <div className="sobre__caption">
              <strong>Cascob</strong>
              atendimento humano, sigilo total
            </div>
          </div>
        </div>
        <div className="two-col__right">
          <span className="kicker">01 — sobre nós</span>
          <h2 className="h2">
            Uma equipe que cuida do seu nome <em>com a seriedade que ele merece.</em>
          </h2>
          <p className="prose" style={{ marginTop: 24 }}>
            A <strong>Cascob</strong> nasceu em São José do Rio Preto com um
            objetivo simples: trabalhar até atingir o resultado esperado pelo
            cliente, valorizando a dignidade de quem está com o nome sujo.
          </p>
          <p className="prose">
            Em mais de uma década, ajudamos famílias e empresas em todo o Brasil
            a limpar o CPF, renegociar com bancos e financeiras e — quando
            preciso — buscar na justiça as compensações previstas em lei.
          </p>
          <ul className="checks">
            <li>Atendimento presencial ou por vídeo, com equipe humana</li>
            <li>Análise jurídica do seu caso, sem compromisso</li>
            <li>Acompanhamento até o nome sair dos órgãos de proteção</li>
          </ul>
        </div>
      </div>
    </section>);

}

/* ───────── SERVIÇOS ───────── */
const SERVICOS = [
{ n: "01", t: "Lojas e cartões", d: "Negociação direta com lojistas e administradoras de cartão." },
{ n: "02", t: "Protestos em cartório", d: "Sustação e baixa de protestos indevidos ou negociados." },
{ n: "03", t: "Cheques", d: "Cheques devolvidos, CCF e cobranças bancárias." },
{ n: "04", t: "Bancos e financiadoras", d: "Empréstimos, cheque especial, cartão de crédito e financiamentos." },
{ n: "05", t: "Telefonia", d: "Cobranças de operadoras, contestações e baixas indevidas." },
{ n: "06", t: "Energia e concessionárias", d: "Faturas em aberto, cortes irregulares e renegociação." },
{ n: "07", t: "Dívidas prescritas", d: "Ativos, Ipanema, Itapeva, NPL II e cobranças fora do prazo." },
{ n: "08", t: "Fraude no consignado", d: "Empréstimos consignados não solicitados, com restituição." }];


function Servicos() {
  return (
    <section className="section section--cream-deep" id="servicos">
      <div className="container">
        <div className="section__head">
          <span className="kicker">02 — o que resolvemos</span>
          <h2 className="h2">
            Tudo o que pode estar <em>sujando seu nome.</em>
          </h2>
          <p className="prose prose--muted" style={{ marginTop: 18 }}>
            Atuamos em praticamente toda forma de dívida que o brasileiro
            enfrenta — incluindo as cobranças prescritas e os golpes mais
            comuns.
          </p>
        </div>
        <div className="servicos__grid">
          {SERVICOS.map((s, i) =>
          <div key={i} className="serv-card">
              <span className="serv-card__num">{s.n}</span>
              <h3 className="serv-card__t">{s.t}</h3>
              <p className="serv-card__d">{s.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ───────── CALLOUT (fraude consignado) ───────── */
function Callout() {
  return (
    <section className="section section--cream" id="fraude">
      <div className="container">
        <div className="callout">
          <div className="callout__photo">
            <img src="img/photo-senhor.jpg" alt="Vítima de fraude no consignado" style={{ opacity: "1" }} />
          </div>
          <div className="callout__body">
            <span className="callout__tag">alerta · fraude no consignado</span>
            <h2 className="callout__t">
              Recebeu dinheiro <em>na conta</em> sem ter pedido?
            </h2>
            <p className="callout__d">
              Se valores caíram na sua conta — em especial em benefícios do
              INSS — sem que você tenha solicitado, você pode ter sido vítima
              de fraude no empréstimo consignado. A Cascob ajuda a contestar,
              cancelar e buscar restituição.
            </p>
            <div className="callout__cta">
              <a className="btn btn--gold" href={WA_LINK} target="_blank" rel="noopener">
                <WhatsIcon /> Quero entender meu caso
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ───────── COMO FUNCIONA ───────── */
const STEPS = [
{ n: "01", t: "Você fala no WhatsApp", d: "Conta sua situação. Sem julgamento, sem formulário longo." },
{ n: "02", t: "Análise gratuita do CPF", d: "Levantamos pendências, identificamos cobranças indevidas e montamos um plano." },
{ n: "03", t: "Negociação ou ação", d: "Buscamos o melhor acordo. Em juros abusivos, acionamos a justiça." },
{ n: "04", t: "Nome limpo em 30 dias", d: "Acompanhamos a baixa nos órgãos e te avisamos quando estiver tudo resolvido." }];


function ComoFunciona() {
  return (
    <section className="section section--black" id="como-funciona">
      <div className="container">
        <div className="section__head">
          <span className="kicker kicker--gold">03 — como funciona</span>
          <h2 className="h2 h2--light">
            Quatro passos. <em>Sem promessa milagrosa.</em>
          </h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) =>
          <li key={i} className="step">
              <span className="step__n">{s.n}</span>
              <h3 className="step__t">{s.t}</h3>
              <p className="step__d">{s.d}</p>
            </li>
          )}
        </ol>
        <div className="section__foot">
          <a className="btn btn--gold" href={WA_LINK} target="_blank" rel="noopener">
            <WhatsIcon /> Começar minha análise gratuita
          </a>
        </div>
      </div>
    </section>);

}

/* ───────── RESULTADOS ───────── */
function Resultados() {
  return (
    <section className="section section--cream" id="resultados">
      <div className="container">
        <div className="section__head">
          <span className="kicker">04 — resultados</span>
          <h2 className="h2">Números que viram histórias.</h2>
        </div>
        <div className="metrics">
          <figure className="metric">
            <div className="metric__num">12<span>anos</span></div>
            <figcaption>cuidando de nomes<br />brasileiros desde 2012</figcaption>
          </figure>
          <figure className="metric metric--accent">
            <div className="metric__num">2<span>mil+</span></div>
            <figcaption>clientes assessorados<br />em todo o Brasil</figcaption>
          </figure>
          <figure className="metric">
            <div className="metric__num">30<span>dias</span></div>
            <figcaption>úteis em média para<br />limpar o nome*</figcaption>
          </figure>
          <figure className="metric">
            <div className="metric__num">½<span>dívida</span></div>
            <figcaption>em média no acordo,<br />menos da metade do valor</figcaption>
          </figure>
        </div>
        <p className="footnote">* Tempo médio observado em casos sem litígio judicial. Cada caso é avaliado individualmente.</p>
      </div>
    </section>);

}

/* ───────── DEPOIMENTOS ───────── */
const QUOTES = [
{ q: "Foram providenciais na hora que eu mais precisava. Eficientes e prestativos do começo ao fim.", a: "Cliente atendida em São José do Rio Preto · 2024" },
{ q: "Resolveram com excelência minhas pendências e ainda conseguiram as compensações previstas em lei.", a: "Cliente atendida em Fernandópolis · 2023" },
{ q: "Equipe séria e responsável. Saí da dívida de juros abusivos com a ajuda da Cascob.", a: "Cliente atendido em Rio Preto · 2024" }];


function Depoimentos() {
  return (
    <section className="section section--cream-deep" id="depoimentos">
      <div className="container">
        <div className="section__head">
          <span className="kicker">05 — quem já passou por aqui</span>
          <h2 className="h2">A confiança vem<br />de quem <em>já voltou a dormir tranquilo.</em></h2>
        </div>
        <div className="quotes">
          {QUOTES.map((q, i) =>
          <blockquote key={i} className="quote">
              <span className="quote__mark">“</span>
              <p>{q.q}</p>
              <cite>— {q.a}</cite>
            </blockquote>
          )}
        </div>
      </div>
    </section>);

}

/* ───────── FAQ ───────── */
const FAQS = [
{ q: "Em quanto tempo meu nome fica limpo?", a: "Na maioria dos casos, em até 30 dias úteis após o acordo ou ação. Cada caso é avaliado individualmente — em situações com litígio judicial o prazo pode ser maior, mas a Cascob acompanha até o final." },
{ q: "Vocês cobram para analisar meu CPF?", a: "Não. A primeira análise da sua situação é gratuita e sem compromisso. Só seguimos em frente se você decidir contratar." },
{ q: "Atendem fora de São José do Rio Preto?", a: "Sim. Atendemos clientes em todo o Brasil — presencialmente em Rio Preto ou por vídeo, com a mesma atenção. Documentos são enviados de forma segura." },
{ q: "Como evito cair em golpes de “limpa nome”?", a: "Desconfie de quem promete milagre, cobra valores altos antecipadamente ou se recusa a fazer atendimento por vídeo identificável. A Cascob faz atendimento presencial ou em videochamada com a equipe, sem mistério." },
{ q: "Preciso pagar a dívida toda?", a: "Não necessariamente. Boa parte do nosso trabalho é negociar descontos relevantes — em média, menos da metade do valor original. O objetivo é resolver, não te afundar mais." },
{ q: "E se a dívida for indevida ou prescrita?", a: "Quando identificamos cobrança indevida, juros abusivos, dívidas prescritas (Ativos, Ipanema, Itapeva, NPL II) ou inscrição irregular nos órgãos, podemos entrar com ação judicial buscando a baixa do nome e as compensações previstas em lei." },
{ q: "Meus dados estão protegidos?", a: "Sim. Seguimos a LGPD (Lei nº 13.709/2018). Seus dados são tratados apenas para o atendimento do seu caso e nunca são vendidos." }];


function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section--cream" id="faq">
      <div className="container two-col two-col--narrow">
        <div className="two-col__left">
          <span className="kicker">06 — perguntas frequentes</span>
          <h2 className="h2">Tudo o que costumam perguntar <em>antes de começar.</em></h2>
          <p className="prose prose--muted" style={{ marginTop: 18 }}>
            Não achou sua dúvida? Manda no WhatsApp que a gente responde como
            se fosse a primeira vez.
          </p>
        </div>
        <div className="two-col__right">
          <ul className="faq">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                  <button className="faq__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span>{f.q}</span>
                    <span className="faq__plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className="faq__a" style={{ maxHeight: isOpen ? 400 : 0 }}>
                    <p>{f.a}</p>
                  </div>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </section>);

}

/* ───────── CONTATO ───────── */
function Contato() {
  return (
    <section className="section section--black section--contact" id="contato">
      <div className="container contact">
        <div className="contact__left">
          <span className="kicker kicker--gold">07 — fale com a gente</span>
          <h2 className="h2 h2--light h2--xl" style={{ marginTop: 14 }}>
            A gente atende como<br />se você estivesse aqui<br />na <em>nossa sala.</em>
          </h2>
          <p className="prose prose--light" style={{ marginTop: 18 }}>
            Atendimento presencial em São José do Rio Preto ou por vídeo, em
            qualquer canto do Brasil. Sigilo total sobre o seu caso.
          </p>
        </div>
        <div className="contact__right">
          <a className="contact__card" href={WA_LINK} target="_blank" rel="noopener">
            <span className="contact__lab">WhatsApp · clique para conversar</span>
            <span className="contact__num">{PHONE_DISPLAY}</span>
            <span className="contact__cta"><WhatsIcon /> Iniciar conversa <Arrow /></span>
          </a>
          <div className="contact__hours">
            <div><span>Atendimento</span><strong>Seg – Sex · 09h às 18h</strong></div>
            <div><span>Cobertura</span><strong>Brasil inteiro · presencial ou vídeo</strong></div>
            <div><span>Análise</span><strong>Gratuita e sem compromisso</strong></div>
          </div>
        </div>
      </div>
    </section>);

}

/* ───────── HEADER + FOOTER ───────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__row">
        <Logo />
        <nav className="nav__links">
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <a className="btn btn--gold btn--sm" href={WA_LINK} target="_blank" rel="noopener">
          <WhatsIcon size={14} /> Falar agora
        </a>
      </div>
    </header>);

}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div className="footer__brand">
          <Logo />
          <p>Recuperação de crédito desde 2012. <br />São José do Rio Preto · SP · atendimento em todo o Brasil.</p>
        </div>
        <div className="footer__col">
          <span className="footer__h">Contato</span>
          <a href={WA_LINK} target="_blank" rel="noopener">WhatsApp {PHONE_DISPLAY}</a>
        </div>
        <div className="footer__col">
          <span className="footer__h">Navegar</span>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#faq">Dúvidas</a>
        </div>
        <div className="footer__col">
          <span className="footer__h">Aviso</span>
          <p className="footer__fine">CASCOB Recuperação de Créditos · CNPJ 22.770.533/0001-95. Os resultados variam conforme cada caso.</p>
        </div>
      </div>
      <div className="footer__base container">
        <span>© 2012–2026 Cascob · Todos os direitos reservados</span>
        <span>“nós podemos ajudar você”</span>
      </div>
    </footer>);

}

/* ───────── FLOATING WA ───────── */
function FloatingWA() {
  return (
    <a className="float-wa" href={WA_LINK} target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <WhatsIcon size={26} />
      <span>Falar no WhatsApp</span>
    </a>);

}

/* ───────── APP ───────── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.dataset.mode = t.mode;
  }, [t.mode]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Strip />
        <Sobre />
        <Servicos />
        <Callout />
        <ComoFunciona />
        <Resultados />
        <Depoimentos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <FloatingWA />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Tema">
          <TweakRadio
            label="Modo"
            value={t.mode}
            options={[{ value: "claro", label: "Claro" }, { value: "escuro", label: "Escuro" }]}
            onChange={(v) => setTweak("mode", v)} />
          
        </TweakSection>
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);