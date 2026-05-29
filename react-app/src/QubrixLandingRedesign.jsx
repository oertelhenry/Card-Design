import { useState } from "react";

const styles = {
  vars: {
    "--navy": "#02061a",
    "--navy2": "#07112e",
    "--blue": "#0b8dff",
    "--cyan": "#23ffd0",
    "--mint": "#3cf2bb",
    "--white": "#f7fbff",
    "--muted": "#a8b7d8",
    "--panel": "rgba(255,255,255,.075)",
    "--border": "rgba(65,255,215,.24)",
  },
};

const globalCss = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  a { color: inherit; text-decoration: none; }
  ul { padding-left: 18px; }
  @media (max-width: 900px) {
    .qbx-hero    { grid-template-columns: 1fr !important; }
    .qbx-cards   { grid-template-columns: 1fr !important; }
    .qbx-flow    { grid-template-columns: 1fr !important; }
    .qbx-logos   { grid-template-columns: repeat(2,1fr) !important; }
    .qbx-trust   { grid-template-columns: 1fr 1fr !important; }
    .qbx-menu    { display: none !important; }
  }
`;

/* ── tiny sub-components ─────────────────────────────────────────── */

function Wrap({ children, style, id, className }) {
  return (
    <div
      id={id}
      className={className}
      style={{
        width: "min(1180px, 92%)",
        margin: "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ href, children }) {
  return (
    <a
      href={href}
      style={{
        background: "linear-gradient(135deg,#0b8dff,#23ffd0)",
        color: "#02061a",
        padding: "13px 19px",
        borderRadius: 999,
        fontWeight: 800,
        boxShadow: "0 0 32px rgba(35,255,208,.22)",
        display: "inline-block",
        fontSize: 14,
      }}
    >
      {children}
    </a>
  );
}

function Ghost({ href, children }) {
  return (
    <a
      href={href}
      style={{
        border: "1px solid rgba(65,255,215,.24)",
        padding: "13px 19px",
        borderRadius: 999,
        color: "#dffcff",
        background: "rgba(255,255,255,.04)",
        display: "inline-block",
        fontSize: 14,
      }}
    >
      {children}
    </a>
  );
}

/* ── Logo placeholder (no local image) ──────────────────────────── */
function QubrixLogo() {
  return (
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 14,
        background: "linear-gradient(135deg,#0b8dff,#23ffd0)",
        display: "grid",
        placeItems: "center",
        fontWeight: 900,
        fontSize: 22,
        color: "#02061a",
        flexShrink: 0,
      }}
    >
      Q
    </div>
  );
}

/* ── Header ──────────────────────────────────────────────────────── */
function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        background: "rgba(2,6,26,.78)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Wrap style={{ height: 78, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 800, letterSpacing: ".08em" }}>
          <QubrixLogo />
          <span>QUBRIX</span>
        </div>
        {/* Nav */}
        <nav className="qbx-menu" style={{ display: "flex", gap: 26, color: "#a8b7d8", fontSize: 14 }}>
          <a href="#value">Value</a>
          <a href="#process">Process</a>
          <a href="#banks">Banks</a>
          <a href="#trust">Trust</a>
        </nav>
        <Btn href="#demo">Request Demo</Btn>
      </Wrap>
    </header>
  );
}

/* ── Hero mock-up widget ─────────────────────────────────────────── */
function Dot() {
  return (
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#23ffd0",
        boxShadow: "0 0 16px #23ffd0",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

function MetricCard({ value, label }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.06)",
        padding: 18,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <b style={{ fontSize: 27, color: "#23ffd0" }}>{value}</b>
      <span style={{ display: "block", color: "#a8b7d8", fontSize: 13, marginTop: 5 }}>{label}</span>
    </div>
  );
}

function StageRow({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(11,141,255,.1)",
        border: "1px solid rgba(11,141,255,.22)",
        padding: "13px 15px",
        borderRadius: 15,
        color: "#d7f7ff",
      }}
    >
      <span>{label}</span>
      <Dot />
    </div>
  );
}

function MockDashboard() {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid rgba(65,255,215,.24)",
        borderRadius: 30,
        background: "linear-gradient(160deg,rgba(255,255,255,.12),rgba(255,255,255,.035))",
        padding: 22,
        boxShadow: "0 28px 80px rgba(0,0,0,.38)",
      }}
    >
      {/* glow pseudo */}
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 30,
          background: "linear-gradient(135deg,rgba(11,141,255,.45),rgba(35,255,208,.38),transparent)",
          zIndex: -1,
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          background: "#070d25",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,.08)",
          padding: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <b>Live Project Command Centre</b>
          <span style={{ color: "#23ffd0" }}>● Active</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 14,
            marginTop: 18,
          }}
        >
          <MetricCard value="6"    label="Builder quotes compared" />
          <MetricCard value="3"    label="Bank approvals received" />
          <MetricCard value="82%"  label="Construction progress" />
          <MetricCard value="100%" label="Drawdown audit trail" />
        </div>
        <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
          <StageRow label="Quote accepted" />
          <StageRow label="Finance approved" />
          <StageRow label="Milestone inspection" />
          <StageRow label="Bank drawdown released" />
        </div>
      </div>
    </div>
  );
}

/* ── Hero section ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ padding: "84px 0 44px" }}>
      <Wrap
        className="qbx-hero"
        style={{
          display: "grid",
          gridTemplateColumns: "1.04fr .96fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "#23ffd0", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: 13 }}>
            Quantify, qualify, without qualm
          </div>
          <h1
            style={{
              fontSize: "clamp(42px,6vw,76px)",
              lineHeight: 0.98,
              margin: "18px 0",
              background: "linear-gradient(90deg,#fff,#78dbff,#23ffd0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            One trusted platform for home building quotes, finance and drawdowns.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.65, color: "#d8e6ff", maxWidth: 650, margin: 0 }}>
            Qubrix connects customers, registered builders and banks in one transparent digital journey,
            from quote request to finance approval, construction milestones and controlled facility drawdowns.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 30 }}>
            <Btn href="#process">See the process</Btn>
            <Ghost href="#value">Explore stakeholder value</Ghost>
          </div>
        </div>
        <MockDashboard />
      </Wrap>
    </section>
  );
}

/* ── Value cards ─────────────────────────────────────────────────── */
function Icon({ emoji }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg,rgba(11,141,255,.25),rgba(35,255,208,.18))",
        border: "1px solid rgba(65,255,215,.24)",
        fontSize: 25,
      }}
    >
      {emoji}
    </div>
  );
}

function ValueCard({ emoji, title, items }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.075)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 24,
        padding: 26,
        minHeight: 280,
        boxShadow: "0 18px 45px rgba(0,0,0,.22)",
      }}
    >
      <Icon emoji={emoji} />
      <h3 style={{ fontSize: 24, margin: "18px 0 10px" }}>{title}</h3>
      <ul>
        {items.map((it, i) => (
          <li key={i} style={{ color: "#c4d3ef", lineHeight: 1.55, marginBottom: 4 }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function ValueSection() {
  return (
    <section id="value" style={{ padding: "64px 0" }}>
      <Wrap>
        <h2 style={{ fontSize: 38, margin: "0 0 12px" }}>Clear value for every participant</h2>
        <p style={{ color: "#a8b7d8", fontSize: 18, maxWidth: 760, lineHeight: 1.6, margin: 0 }}>
          A central platform reduces confusion, improves accountability and creates a trusted record
          for every decision, document, quote, approval and payment.
        </p>
        <div
          className="qbx-cards"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 32 }}
        >
          <ValueCard
            emoji="👨‍👩‍👧"
            title="Customers"
            items={[
              "Compare registered builders in one place.",
              "Track finance offers from multiple banks.",
              "View milestones, documents and drawdowns transparently.",
              "Reduce disputes with a single project record.",
            ]}
          />
          <ValueCard
            emoji="🏗️"
            title="Builders"
            items={[
              "Receive qualified building opportunities.",
              "Submit structured quotes and variations digitally.",
              "Get clearer milestone approvals.",
              "Improve cashflow visibility with bank-managed drawdowns.",
            ]}
          />
          <ValueCard
            emoji="🏦"
            title="Banks"
            items={[
              "Receive complete finance applications.",
              "Access builder, quote and project documentation.",
              "Control facility drawdowns by verified milestones.",
              "Improve risk visibility across the build lifecycle.",
            ]}
          />
        </div>
      </Wrap>
    </section>
  );
}

/* ── Process section ─────────────────────────────────────────────── */
function Tag({ children }) {
  return (
    <span
      style={{
        fontSize: 12,
        border: "1px solid rgba(65,255,215,.24)",
        borderRadius: 999,
        padding: "6px 10px",
        color: "#23ffd0",
        background: "rgba(35,255,208,.07)",
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  );
}

/** Placeholder for local images that can't load */
function ImgPlaceholder({ label }) {
  return (
    <div
      style={{
        width: "100%",
        height: 160,
        background: "rgba(255,255,255,.06)",
        display: "grid",
        placeItems: "center",
        color: "#a8b7d8",
        fontSize: 13,
        borderRadius: 4,
      }}
    >
      [ {label} ]
    </div>
  );
}

function FlowBox({ accent, title, tag, imgLabel, note }) {
  return (
    <div
      style={{
        borderRadius: 26,
        padding: 24,
        border: "1px solid rgba(255,255,255,.1)",
        background: accent,
      }}
    >
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          margin: "0 0 0 0",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {title} <Tag>{tag}</Tag>
      </h3>
      <div
        style={{
          marginTop: 18,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.12)",
          background: "#fff",
          boxShadow: "0 18px 50px rgba(0,0,0,.25)",
        }}
      >
        <ImgPlaceholder label={imgLabel} />
      </div>
      <p style={{ marginTop: 18, color: "#c4d3ef", lineHeight: 1.55 }}>{note}</p>
    </div>
  );
}

function ProcessSection() {
  return (
    <section id="process" style={{ padding: "64px 0" }}>
      <Wrap>
        <h2 style={{ fontSize: 38, margin: "0 0 12px" }}>From fragmented to fully controlled</h2>
        <p style={{ color: "#a8b7d8", fontSize: 18, maxWidth: 760, lineHeight: 1.6, margin: 0 }}>
          Qubrix replaces scattered emails, WhatsApps and manual spreadsheets with one coordinated
          operating layer for the full build and finance process.
        </p>
        <div
          className="qbx-flow"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, marginTop: 34 }}
        >
          <FlowBox
            accent="linear-gradient(160deg,rgba(255,70,90,.13),rgba(255,255,255,.04))"
            title="Without Qubrix"
            tag="Fragmented"
            imgLabel="Without Qubrix – fragmented process"
            note="Customers, builders and banks work across multiple disconnected channels. Quote requests, approvals, follow-ups and payments become difficult to control, causing delays, duplicated effort and poor visibility."
          />
          <FlowBox
            accent="linear-gradient(160deg,rgba(35,255,208,.15),rgba(11,141,255,.08))"
            title="With Qubrix"
            tag="Centralised"
            imgLabel="With Qubrix – central platform"
            note="Qubrix becomes the single control point. Customers, builders and banks interact through one trusted platform, making quotes, finance applications, approvals, milestones and drawdowns easier to manage."
          />
        </div>
      </Wrap>
    </section>
  );
}

/* ── Banks section ───────────────────────────────────────────────── */
function LogoCard({ name }) {
  return (
    <div
      style={{
        height: 82,
        borderRadius: 18,
        background: "rgba(255,255,255,.07)",
        border: "1px solid rgba(255,255,255,.1)",
        display: "grid",
        placeItems: "center",
        fontWeight: 900,
        letterSpacing: ".04em",
        color: "#e8fbff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {name}
      {/* bottom gradient line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-20%",
          right: "-20%",
          height: 3,
          background: "linear-gradient(90deg,#0b8dff,#23ffd0)",
        }}
      />
    </div>
  );
}

function BanksSection() {
  return (
    <section id="banks" style={{ padding: "64px 0" }}>
      <Wrap>
        <h2 style={{ fontSize: 38, margin: "0 0 12px" }}>Example partner bank panel</h2>
        <p style={{ color: "#a8b7d8", fontSize: 18, maxWidth: 760, lineHeight: 1.6, margin: 0 }}>
          Display your finance partners in a premium, trustworthy way. Replace these placeholders
          with approved bank logos once partner usage rights are confirmed.
        </p>
        <div
          className="qbx-logos"
          style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16, marginTop: 28 }}
        >
          {["MCB","ABSA","SBM","BANK ONE","MAUBANK","ROGERS"].map(n => (
            <LogoCard key={n} name={n} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ── Trust section ───────────────────────────────────────────────── */
function TrustCard({ title, text }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.055)",
        border: "1px solid rgba(255,255,255,.09)",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <b style={{ color: "#23ffd0", fontSize: 22 }}>{title}</b>
      <p style={{ color: "#a8b7d8", margin: "8px 0 0", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

function TrustSection() {
  return (
    <section id="trust" style={{ padding: "64px 0" }}>
      <Wrap>
        <h2 style={{ fontSize: 38, margin: "0 0 12px" }}>Built for trust, control and scale</h2>
        <div
          className="qbx-trust"
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 30 }}
        >
          <TrustCard title="Verified Network" text="Registered builders, structured onboarding and controlled access." />
          <TrustCard title="Audit Trail"      text="Every quote, approval, document and drawdown recorded centrally." />
          <TrustCard title="Secure Data"      text="Role-based access and bank-grade document governance." />
          <TrustCard title="Smart Analytics"  text="Pipeline, conversion, build progress and funding visibility." />
        </div>
      </Wrap>
    </section>
  );
}

/* ── CTA section ─────────────────────────────────────────────────── */
function DemoSection() {
  return (
    <section id="demo" style={{ padding: "64px 0 86px", textAlign: "center" }}>
      <Wrap>
        <h2 style={{ fontSize: 38, margin: "0 0 12px" }}>Make construction finance easier to manage.</h2>
        <p style={{ color: "#a8b7d8", fontSize: 18, maxWidth: 760, lineHeight: 1.6, margin: "0 auto" }}>
          Give customers confidence, builders qualified opportunities and banks
          better control over risk and drawdowns.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 30, justifyContent: "center" }}>
          <Btn href="mailto:info@qubrix.example">Book a platform demo</Btn>
        </div>
      </Wrap>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        padding: "42px 0",
        borderTop: "1px solid rgba(255,255,255,.08)",
        color: "#a8b7d8",
        textAlign: "center",
      }}
    >
      <Wrap>QUBRIX, Quantify Qualify without Qualm</Wrap>
    </footer>
  );
}

/* ── Root ────────────────────────────────────────────────────────── */
export default function QubrixLanding() {
  return (
    <>
      <style>{globalCss}</style>
      <div
        style={{
          margin: 0,
          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
          background:
            "radial-gradient(circle at 15% 10%,rgba(11,141,255,.24),transparent 28%)," +
            "radial-gradient(circle at 85% 2%,rgba(35,255,208,.16),transparent 32%)," +
            "linear-gradient(180deg,#02061a,#05091f 55%,#02040f)",
          color: "#f7fbff",
          minHeight: "100vh",
        }}
      >
        <Header />
        <main>
          <Hero />
          <ValueSection />
          <ProcessSection />
          <BanksSection />
          <TrustSection />
          <DemoSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
