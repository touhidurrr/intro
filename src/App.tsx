import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  identity,
  links,
  projects,
  roles,
  skills,
  stats,
  REQUESTS_PER_SECOND,
} from "./data";

/* ------------------------------------------------------------------ */
/* live metric                                                          */
/* ------------------------------------------------------------------ */

/** Requests served across production systems since the page was opened. */
function useRequestTicker(): number {
  const [count, setCount] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const tick = (t: number) => {
      start.current ??= t;
      setCount(Math.floor(((t - start.current) / 1000) * REQUESTS_PER_SECOND));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return count;
}

/* ------------------------------------------------------------------ */
/* JSON rendering                                                       */
/* ------------------------------------------------------------------ */

/** Tokenize pretty-printed JSON into syntax-highlighted React nodes. */
function highlightJson(src: string): ReactNode[] {
  const re =
    /("(?:\\.|[^"\\])*")(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?/g;
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > i) out.push(src.slice(i, m.index));
    if (m[1] && m[2]) {
      out.push(
        <span key={key++} className="text-accent">
          {m[1]}
        </span>,
        m[2],
      );
    } else if (m[1]) {
      out.push(
        <span key={key++} className="text-str">
          {m[1]}
        </span>,
      );
    } else {
      out.push(
        <span key={key++} className="text-num">
          {m[0]}
        </span>,
      );
    }
    i = m.index + m[0].length;
  }
  out.push(src.slice(i));
  return out;
}

function JsonBody({ data }: { data: unknown }) {
  const nodes = useMemo(
    () => highlightJson(JSON.stringify(data, null, 2)),
    [data],
  );
  return (
    <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed text-dim">
      {nodes}
    </pre>
  );
}

/** Response panel chrome: status line on top, body below. */
function ResponsePanel({
  status = "200 OK",
  meta = "application/json",
  children,
}: {
  status?: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-5 py-2.5 font-mono text-[0.7rem]">
        <span className="text-ok">{status}</span>
        <span className="text-dim">{meta}</span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* endpoint scaffolding                                                 */
/* ------------------------------------------------------------------ */

function Method({ verb }: { verb: "GET" | "POST" }) {
  const tone =
    verb === "GET" ? "text-ok border-ok/40" : "text-num border-num/40";
  return (
    <span
      className={`rounded-md border px-2 py-0.5 font-mono text-[0.68rem] font-bold tracking-wide ${tone}`}
    >
      {verb}
    </span>
  );
}

function Endpoint({
  verb,
  path,
  summary,
  children,
}: {
  verb: "GET" | "POST";
  path: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="flex flex-wrap items-center gap-3 font-mono">
          <Method verb={verb} />
          <h2 className="text-base font-bold text-fg">{path}</h2>
        </header>
        <p className="mt-2 max-w-2xl text-sm text-dim">{summary}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* sections                                                             */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6">
      <a href="#top" className="font-mono text-sm font-medium tracking-tight">
        touhidur<span className="text-accent">.bd</span>
        <span className="ml-3 text-[0.7rem] text-dim">API reference · v1</span>
      </a>
      <nav className="flex items-center gap-5 font-mono text-xs">
        <a
          className="hover:text-accent"
          href={links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="hover:text-accent"
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="hover:text-accent"
          href={links.resume}
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
        <a
          className="rounded-full bg-accent px-4 py-2 font-medium text-base transition-colors hover:bg-fg"
          href={links.email}
        >
          Email me
        </a>
      </nav>
    </header>
  );
}

function Root() {
  const served = useRequestTicker();

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-14 pb-16 sm:pt-20">
      <p className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.14em] text-dim">
        <span className="relative flex size-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex size-2.5 rounded-full bg-ok" />
        </span>
        <span className="text-ok">all systems operational</span> · uptime is the
        portfolio
      </p>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="display text-[clamp(2.5rem,6.5vw,4.6rem)]">
            I build backends
            <br />
            that <span className="text-accent">stay up.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-dim">
            Md. Touhidur Rahman — backend &amp; DevOps engineer and MongoDB
            certified developer. Writing code since 2018, shipping for US and
            Indian teams since 2022, and running one game server that hasn't
            slept since January 2022.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {stats.map((s) => (
              <div key={s.label} className="bg-panel p-5">
                <dt className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
                  {s.label}
                </dt>
                <dd className="display mt-1 text-3xl text-fg">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 font-mono">
          <p className="mb-3 flex items-center gap-3 text-xs text-dim">
            <Method verb="GET" /> <span className="font-bold text-fg">/</span>
          </p>
          <ResponsePanel>
            <div className="border-b border-line px-5 py-3 text-[0.72rem] leading-relaxed text-dim">
              <p>
                x-served-from:{" "}
                <span className="text-str">
                  dhaka · utc+6 · remote worldwide
                </span>
              </p>
              <p aria-live="off">
                x-requests-since-pageload:{" "}
                <span className="text-num">
                  {served.toLocaleString("en-US")}
                </span>
              </p>
            </div>
            <JsonBody data={identity} />
          </ResponsePanel>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const slug = (org: string) => org.split(" ")[0]?.toLowerCase();

  return (
    <Endpoint
      verb="GET"
      path="/experience"
      summary="Returns three production systems and what it took to keep them running. Sorted by recency."
    >
      <div className="space-y-12">
        {roles.map((r) => (
          <article
            key={r.org}
            className="grid gap-4 sm:grid-cols-[190px_1fr] sm:gap-10"
          >
            <div className="font-mono text-xs leading-relaxed text-dim">
              <p className="font-bold text-fg">{r.period}</p>
              <p>{r.place}</p>
            </div>
            <div>
              <h3 className="font-mono text-sm text-dim">
                /experience/
                <a
                  className="font-bold text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
                  href={r.orgUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {slug(r.org)}
                </a>
              </h3>
              <p className="display mt-1.5 text-2xl">
                {r.title} · {r.org}
              </p>
              <ul className="mt-4 max-w-2xl space-y-2 text-[0.95rem] leading-relaxed text-fg/90">
                {r.notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span
                      className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                      aria-hidden="true"
                    />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-xs text-dim">
                {r.stack.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Endpoint>
  );
}

function Projects() {
  return (
    <Endpoint
      verb="GET"
      path="/projects"
      summary="Open source, in production, with real users. Star counts verified against the GitHub API."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group bg-panel p-6 transition-colors hover:bg-line/50"
          >
            <p className="font-mono text-xs text-num">{p.metric}</p>
            <h3 className="mt-2 font-mono text-sm font-bold text-fg">
              /projects/<span className="text-accent">{p.name}</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">{p.desc}</p>
          </a>
        ))}
      </div>
    </Endpoint>
  );
}

function Skills() {
  const payload = Object.fromEntries(
    skills.map((s) => [
      s.group.toLowerCase().replace(/ & /g, "_and_").replace(/ /g, "_"),
      s.items,
    ]),
  );

  return (
    <Endpoint
      verb="GET"
      path="/skills"
      summary="The toolbox, as data. Everything listed here has shipped to production."
    >
      <div className="max-w-2xl">
        <ResponsePanel>
          <JsonBody data={payload} />
        </ResponsePanel>
      </div>
    </Endpoint>
  );
}

function Contact() {
  return (
    <Endpoint
      verb="POST"
      path="/contact"
      summary="Accepts remote backend and DevOps roles. Overlaps comfortably with US and EU hours — and answers fast, the same way the servers do."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">
            Hiring remote? <span className="text-accent">Let's talk.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-4 font-mono text-sm">
            <a
              className="rounded-full bg-accent px-5 py-2.5 font-medium text-base transition-colors hover:bg-fg"
              href={links.email}
            >
              me@touhidur.bd
            </a>
            <a
              className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
              href={links.resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume (PDF)
            </a>
          </div>
        </div>
        <div className="min-w-0 font-mono">
          <ResponsePanel status="202 Accepted" meta="usually < 24h">
            <pre className="overflow-x-auto p-5 text-[0.78rem] leading-relaxed text-dim">
              <span className="text-ok">$</span> curl -X{" "}
              <span className="text-num">POST</span> https://touhidur.bd/contact
              \{"\n"}
              {"    "}-d{" "}
              <span className="text-str">
                '{"{"} "role": "backend", "remote": true {"}"}'
              </span>
            </pre>
          </ResponsePanel>
        </div>
      </div>
    </Endpoint>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 font-mono text-xs text-dim">
        <span>© {new Date().getFullYear()} Md. Touhidur Rahman</span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>main</span>
          <span>TypeScript 6</span>
          <span>Bun</span>
          <span>UTC+6</span>
          <span className="flex items-center gap-2 text-ok">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-ok"
              aria-hidden="true"
            />
            operational
          </span>
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Root />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
