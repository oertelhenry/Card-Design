import { useState } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  PERSONALYZ CARD — "Ivory & Slate" Professional Theme       ║
 ║                                                              ║
 ║  Aesthetic: Corporate elegance, editorial restraint           ║
 ║  Fonts: Cormorant Garamond (refined serif headings)          ║
 ║         + Source Sans 3 (clean, professional body)            ║
 ║  Palette: Deep navy #0F1D2F accent on warm ivory #FDFCFA     ║
 ║  Icons: Clean SVG line icons (no emoji)                      ║
 ║  Layout: Same forced 2-col grids, refined spacing            ║
 ║  Signature: Thin gold accent line, understated luxury         ║
 ╚══════════════════════════════════════════════════════════════╝
*/

const BANNER_URL = "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/1a21a2c340464867a35477b65feb9ea1_banner.jpg";
const PROFILE_URL = "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/3c79dc694bf148f3b1813f7a1865235f_batman.jpg";
const SVC_IMGS = [
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-group-items690de51b-29bf-4712-832b-d54822b0e6bfservices/3fa8a4c21a0d43ea8fa0ce53e0c59e20_6.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-group-items690de51b-29bf-4712-832b-d54822b0e6bfservices/eab7b8bd58234cbdbfbe8b2e35af66b0_serv1.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-group-items690de51b-29bf-4712-832b-d54822b0e6bfservices/6e4e0f981b9e47bdbb5d18fd51333420_serv2.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-group-items690de51b-29bf-4712-832b-d54822b0e6bfservices/a17d8db5ca474cdcb262eb62f84ed094_serv3.jpg",
];
const TEST_IMGS = [
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-group-itemsc0ff032e-6096-4f89-9bd4-1cdba069f383testimonials/b9b47b460fdc49bdb3ab913928aa4dea_Lois Lane.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-group-itemsc0ff032e-6096-4f89-9bd4-1cdba069f383testimonials/f06857cbc16444f0936d91030c207882_batman.jpg",
];
const GALLERY_IMGS = [
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/c266299212304f20a387df2888065c79_test.jpeg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/7cd954e2cb884fa4b35d0f6ed292cf42_1.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/2f2946afd4224d249db34308aa1520b5_2.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/c591cec33bd34c1cbaba669fe11ca536_5.jpg",
  "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-780ce3c3-eb45-4ff4-9e47-5d68c61f3b61/27cf81818ff14d37a4d7d74c448d3c5b_4.jpg",
];

// ── Palette ─────────────────────────────────────────────────
const P = {
  navy: "#0F1D2F",
  navyMid: "#1B2D44",
  navyLight: "#2A3F5A",
  slate: "#475569",
  cool: "#64748B",
  silver: "#94A3B8",
  mist: "#CBD5E1",
  pearl: "#E2E8F0",
  ivory: "#FDFCFA",
  warm: "#F8F6F3",
  card: "#FFFFFF",
  gold: "#B8860B",
  goldLight: "#D4A843",
  goldSoft: "#FBF6EC",
  goldFaint: "#F9F4E8",
  accent: "#0F1D2F",
  accentSoft: "#EEF1F5",
  green: "#166534",
  greenBg: "#F0F9F4",
  red: "#991B1B",
  redBg: "#FEF2F2",
  orange: "#92400E",
  orangeBg: "#FFFBEB",
  border: "#E2E5EA",
  borderFine: "#ECEEF2",
};

// ── SVG Icons ───────────────────────────────────────────────
const I = {
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  link: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.gold} strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  cal: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  bolt: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  quote: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  map: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  play: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M10 8l6 4-6 4z"/></svg>,
  img: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  chev: (open) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={P.silver} strokeWidth="2" strokeLinecap="round" style={{ transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: open ? "rotate(180deg)" : "rotate(0)" }}><path d="M6 9l6 6 6-6"/></svg>,
  arrow: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
};

// ── Section Component — refined, understated ────────────────
function Sec({ title, icon, children, open: init = true, noPad, flush }) {
  const [open, setOpen] = useState(init);
  return (
    <div style={{ borderTop: `1px solid ${P.borderFine}` }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "14px 20px", border: "none", background: "none", cursor: "pointer",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7, flexShrink: 0,
          background: P.accentSoft, display: "flex", alignItems: "center", justifyContent: "center",
        }}>{icon}</div>
        <span style={{
          fontSize: 13.5, color: P.navy, flex: 1, textAlign: "left",
          fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em",
          fontWeight: 700,
        }}>{title}</span>
        {I.chev(open)}
      </button>
      <div style={{
        display: "grid", gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: noPad ? 0 : flush ? "0 0 16px" : "0 20px 16px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── Star row ────────────────────────────────────────────────
function Stars({ n = 5, size = 11 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? P.gold : P.pearl}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN CARD
// ══════════════════════════════════════════════════════════════
export default function FormalCard() {
  const [rating, setRating] = useState(null);
  const [apptTime, setApptTime] = useState(null);
  const [moreTimes, setMoreTimes] = useState(false);
  const [galIdx, setGalIdx] = useState(0);

  const appts = ["08:00–09:00", "09:00–10:00", "10:00–11:00", "11:00–12:00", "16:00–17:00", "17:00–18:00"];
  const shownAppts = moreTimes ? appts : appts.slice(0, 3);

  return (
    <div style={{
      maxWidth: 490, margin: "0 auto", background: "rgb(15, 23, 42)",
      minHeight: "100vh", fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        .f-pill:active { transform: scale(0.97); }
        .f-tile:active { transform: scale(0.98); }
        .gscroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO — Clean banner, centered profile, formal identity
          ═══════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        {/* Banner — no diagonal clip, clean bottom edge */}
        <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
          <img src={BANNER_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,29,47,0.15) 0%, rgba(15,29,47,0.65) 100%)" }} />
        </div>

        {/* Profile — overlapping bottom of banner */}
        <div style={{ position: "absolute", left: "50%", bottom: -70, transform: "translateX(-50%)", zIndex: 5 }}>
          <div style={{
            width: 160, height: 160, borderRadius: "50%",
            border: `4px solid ${P.card}`, overflow: "hidden",
            boxShadow: "0 2px 16px rgba(15,29,47,0.15)",
          }}>
            <img src={PROFILE_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* Identity Panel */}
      <div style={{
        background: P.card, margin: "0 14px", borderRadius: "0 0 16px 16px",
        padding: "82px 22px 20px", textAlign: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
      }}>
        {/* Gold accent rule */}
        <div style={{ width: 32, height: 2, background: P.gold, margin: "0 auto 14px", borderRadius: 1 }} />

        <h1 style={{
          fontSize: 28, fontWeight: 700, color: P.navy, margin: "0 0 4px",
          fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em", lineHeight: 1,
        }}>batman</h1>

        <div style={{
          fontSize: 13, fontWeight: 600, color: P.gold,
          letterSpacing: "0.06em", textTransform: "uppercase",
          marginBottom: 2,
        }}>Guardian of Metropolis</div>

        <div style={{
          fontSize: 12, color: P.silver, fontWeight: 400,
          marginBottom: 12, letterSpacing: "0.02em",
        }}>Fortress of Solitude</div>

        {/* Thin divider */}
        <div style={{ width: 48, height: 1, background: P.pearl, margin: "0 auto 12px" }} />

        <p style={{
          fontSize: 13, color: P.slate, lineHeight: 1.75, margin: 0,
          fontWeight: 400,
        }}>
          Stronger than a locomotive, faster than a speeding bullet, and always on call when Metropolis (or Earth) needs saving. Kindness first, heat vision second.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          CONTACT — Refined vertical list with thin borders
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "10px 14px 0", borderRadius: 16, overflow: "hidden",
        background: P.card, boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}>
        {[
          { icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          ), label: "WhatsApp", value: "12026650100" },
          { icon: (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          ), label: "Email", value: "superman@dailyplanet.com" },
          { icon: (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={P.navyMid} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          ), label: "Phone", value: "12026650100" },
        ].map((c, i) => (
          <div key={i} className="f-pill" style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "13px 18px", cursor: "pointer",
            borderBottom: i < 2 ? `1px solid ${P.borderFine}` : "none",
            transition: "background 0.15s",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: P.accentSoft, display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>{c.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: P.silver,
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 1,
              }}>{c.label}</div>
              <div style={{
                fontSize: 13, fontWeight: 600, color: P.navy,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{c.value}</div>
            </div>
            <div style={{ color: P.mist }}>{I.arrow}</div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTIONS CONTAINER
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "10px 14px 0", borderRadius: 16, overflow: "hidden",
        background: P.card, boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}>

        {/* ═══ BUSINESS HOURS ═══ */}
        <Sec title="Business Hours" icon={I.clock}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 12px" }}>
            {[
              ["Monday", "08:00 – 15:00", true], ["Tuesday", "08:00 – 15:00", true],
              ["Wednesday", "08:00 – 15:00", true], ["Thursday", "08:00 – 15:00", true],
              ["Friday", "08:00 – 15:00", true], ["Saturday", "Closed", false],
              ["Sunday", "Closed", false],
            ].map(([day, time, on]) => (
              <div key={day} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 10px", borderRadius: 6,
                borderLeft: `2px solid ${on ? P.green : P.pearl}`,
                background: on ? P.greenBg : "#FAFAFA",
              }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: on ? P.navy : P.silver }}>{day.substring(0, 3)}</span>
                <span style={{ fontSize: 10.5, fontWeight: 500, color: on ? P.green : P.mist, fontVariantNumeric: "tabular-nums" }}>{time}</span>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SHARE & CONNECT ═══ */}
        <Sec title="Share & Connect" icon={I.link}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Save Card", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>, bg: P.navy },
              { label: "Share Card", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>, bg: P.navyMid },
              { label: "Contact", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>, bg: P.navyLight },
              { label: "Add to Home", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>, bg: P.slate },
            ].map((b, i) => (
              <button key={i} className="f-tile" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                padding: "12px 10px", borderRadius: 10,
                border: "none", cursor: "pointer",
                background: b.bg, color: "#fff",
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.01em",
                transition: "transform 0.15s, box-shadow 0.2s",
                boxShadow: "0 1px 4px rgba(15,29,47,0.12)",
              }}>
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        </Sec>

        {/* ═══ RATE SERVICE ═══ */}
        <Sec title="Rate Our Service" icon={I.star}>
          <div style={{ display: "flex", gap: 8, marginBottom: rating ? 10 : 0 }}>
            {[
              { label: "Unhappy", val: "bad", c: P.red, bg: P.redBg, border: "#FCA5A5",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={P.red} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
              { label: "Neutral", val: "meh", c: P.orange, bg: P.orangeBg, border: "#FCD34D",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={P.orange} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
              { label: "Happy", val: "good", c: P.green, bg: P.greenBg, border: "#86EFAC",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={P.green} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
            ].map((r) => (
              <button key={r.val} onClick={() => setRating(r.val)} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                padding: "12px 6px", borderRadius: 10, cursor: "pointer",
                border: `1.5px solid ${rating === r.val ? r.border : P.border}`,
                background: rating === r.val ? r.bg : P.card,
                transition: "all 0.2s",
              }}>
                {r.icon}
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: rating === r.val ? r.c : P.silver,
                }}>{r.label}</span>
              </button>
            ))}
          </div>
          {rating && (
            <>
              <textarea placeholder="We appreciate your feedback…" style={{
                width: "100%", padding: "10px 14px", borderRadius: 8,
                border: `1px solid ${P.border}`, fontSize: 13,
                fontFamily: "'Source Sans 3', sans-serif",
                resize: "none", height: 56, outline: "none", background: P.warm, boxSizing: "border-box",
              }} />
              <button style={{
                width: "100%", padding: 11, borderRadius: 8, border: "none",
                background: P.navy, color: "#fff", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", marginTop: 6,
                letterSpacing: "0.02em",
              }}>Submit Rating</button>
            </>
          )}
        </Sec>

        {/* ═══ APPOINTMENTS ═══ */}
        <Sec title="Request an Appointment" icon={I.cal}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: P.silver, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Date</label>
            <input type="date" defaultValue="2026-02-24" style={{
              width: "100%", padding: "10px 14px", borderRadius: 8,
              border: `1px solid ${P.border}`, fontSize: 13,
              fontFamily: "'Source Sans 3', sans-serif",
              color: P.navy, outline: "none", background: P.warm, boxSizing: "border-box",
            }} />
          </div>
          <label style={{ fontSize: 10, fontWeight: 700, color: P.silver, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Available Times</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
            {shownAppts.map((t, i) => (
              <button key={i} onClick={() => setApptTime(i)} style={{
                padding: "9px 4px", borderRadius: 7,
                border: `1.5px solid ${apptTime === i ? P.navy : P.border}`,
                background: apptTime === i ? P.accentSoft : P.card,
                color: apptTime === i ? P.navy : P.slate,
                fontSize: 11, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
                fontVariantNumeric: "tabular-nums", transition: "all 0.15s",
              }}>{t}</button>
            ))}
          </div>
          {!moreTimes && (
            <button onClick={() => setMoreTimes(true)} style={{
              display: "block", width: "100%", padding: 5, border: "none",
              background: "none", color: P.gold, fontSize: 11.5, fontWeight: 600,
              cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", marginBottom: 6,
            }}>More times ({appts.length - 3}) ▾</button>
          )}
          <button style={{
            width: "100%", padding: 12, borderRadius: 8, border: "none",
            background: P.navy, color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
            letterSpacing: "0.02em",
          }}>Request an Appointment</button>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          SERVICES — Forced 2-col, formal card style
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", borderRadius: 16, overflow: "hidden", background: P.card, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <Sec title="Our Services" icon={I.bolt}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { title: "Metropolis City Watch", desc: "Rapid aerial response, crisis containment, and polite roof landings." },
              { title: "Disaster Relief & Rescue", desc: "From collapsing bridges to volcanic grumbles—calm coordination." },
              { title: "Satellite & Orbital Support", desc: "Gentle satellite repositioning, debris cleanup, and space-tows." },
              { title: "Heroic Readiness Training", desc: "Community workshops on emergency readiness and ethical power use." },
            ].map((svc, i) => (
              <div key={i} className="f-tile" style={{
                borderRadius: 12, overflow: "hidden", background: "#F0F0F0",
                border: `1px solid ${P.border}`, cursor: "pointer",
                transition: "transform 0.15s",
              }}>
                <div style={{ height: 85, position: "relative", overflow: "hidden" }}>
                  <img src={SVC_IMGS[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "10px 10px 12px" }}>
                  <div style={{
                    fontSize: 12.5, fontWeight: 700, color: P.navy,
                    fontFamily: "'Cormorant Garamond', serif",
                    lineHeight: 1.25, marginBottom: 4,
                  }}>{svc.title}</div>
                  <div style={{
                    fontSize: 10.5, color: P.cool, lineHeight: 1.5, marginBottom: 10,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{svc.desc}</div>
                  <button style={{
                    width: "100%", padding: "7px 8px", borderRadius: 6,
                    border: `1px solid ${P.navy}`, background: "transparent",
                    color: P.navy, fontSize: 11, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'Source Sans 3', sans-serif",
                    letterSpacing: "0.03em",
                  }}>Read more</button>
                </div>
              </div>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS — Formal 2-col
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", borderRadius: 16, overflow: "hidden", background: P.card, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <Sec title="Testimonials" icon={I.quote}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { name: "Lois Lane", text: "Unfailingly reliable and impossibly kind. Also an excellent interview—when he's not saving the day.", stars: 5 },
              { name: "Batman", text: "Efficient. Trustworthy. Overpowered, but responsible about it.", stars: 5 },
            ].map((t, i) => (
              <div key={i} style={{
                padding: "14px 12px", borderRadius: 12,
                background: "#F0F0F0", border: `1px solid ${P.borderFine}`,
                position: "relative",
              }}>
                {/* Decorative top line */}
                <div style={{ width: 20, height: 2, background: P.gold, borderRadius: 1, marginBottom: 10 }} />

                <div style={{
                  width: 38, height: 38, borderRadius: "50%", marginBottom: 8,
                  overflow: "hidden", border: `2px solid ${P.card}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}>
                  <img src={TEST_IMGS[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                <Stars n={t.stars} />

                <div style={{
                  fontSize: 11, color: P.slate, lineHeight: 1.6,
                  marginTop: 6, marginBottom: 8, fontStyle: "italic",
                }}>"{t.text}"</div>

                <div style={{
                  fontSize: 11, fontWeight: 700, color: P.navy,
                  letterSpacing: "0.01em",
                }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          SOCIAL — Formal icon row
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", borderRadius: 16, overflow: "hidden", background: P.card, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <Sec title="Social" icon={I.globe}>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {[
              { label: "Website", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.navy} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
              { label: "X", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill={P.navy}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { label: "Instagram", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={P.navy} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill={P.navy} stroke="none"/></svg> },
              { label: "Telegram", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill={P.navy}><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            ].map((s, i) => (
              <button key={i} style={{
                width: 50, height: 50, borderRadius: 12,
                background: P.accentSoft, border: `1px solid ${P.border}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                cursor: "pointer", transition: "transform 0.15s",
              }}>
                {s.icon}
                <span style={{ fontSize: 7.5, fontWeight: 700, color: P.silver, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</span>
              </button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          MAP + CUSTOM HTML + GALLERY
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", borderRadius: 16, overflow: "hidden", background: P.card, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        {/* MAP */}
        <Sec title="Location" icon={I.map} noPad>
          <div style={{ margin: "0 20px 16px", borderRadius: 12, overflow: "hidden", height: 170, border: `1px solid ${P.border}` }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.502320959!2d-87.89668624561754!3d41.83384858178919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sza!4v1765441428500!5m2!1sen!2sza"
              width="100%" height="100%" style={{ border: 0, display: "block" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Sec>

        {/* CUSTOM HTML */}
        <Sec title="Featured Content" icon={I.play} open={false}>
          <div style={{
            borderRadius: 10, border: `1px solid ${P.border}`,
            background: P.warm, padding: "18px 16px", textAlign: "center",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: P.accentSoft,
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 8,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.navy} strokeWidth="1.8" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: P.navy, marginBottom: 2 }}>Embedded Content</div>
            <div style={{ fontSize: 11, color: P.silver, lineHeight: 1.5 }}>LinkedIn posts, finance applications, or custom embeds render here.</div>
          </div>
        </Sec>

        {/* GALLERY */}
        <Sec title="Gallery" icon={I.img}>
          <div style={{
            height: 240, borderRadius: 12, marginBottom: 8,
            overflow: "hidden", position: "relative", border: `1px solid ${P.border}`,
            background: P.warm,
          }}>
            <img src={GALLERY_IMGS[galIdx]} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", transition: "opacity 0.3s" }} />
            <button onClick={() => setGalIdx(Math.max(0, galIdx - 1))} style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(15,29,47,0.5)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galIdx === 0 ? 0.3 : 1,
            }}>‹</button>
            <button onClick={() => setGalIdx(Math.min(GALLERY_IMGS.length - 1, galIdx + 1))} style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(15,29,47,0.5)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galIdx === GALLERY_IMGS.length - 1 ? 0.3 : 1,
            }}>›</button>
            <div style={{
              position: "absolute", bottom: 8, right: 10,
              padding: "3px 10px", borderRadius: 6,
              background: "rgba(15,29,47,0.6)", backdropFilter: "blur(4px)",
              color: "#fff", fontSize: 10, fontWeight: 600, fontVariantNumeric: "tabular-nums",
            }}>{galIdx + 1} / {GALLERY_IMGS.length}</div>
          </div>
          <div className="gscroll" style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none" }}>
            {GALLERY_IMGS.map((img, i) => (
              <button key={i} onClick={() => setGalIdx(i)} style={{
                width: 52, height: 52, borderRadius: 8, flexShrink: 0,
                overflow: "hidden", cursor: "pointer", padding: 0, background: P.warm,
                border: galIdx === i ? `2.5px solid ${P.navy}` : `1.5px solid ${P.border}`,
                opacity: galIdx === i ? 1 : 0.5, transition: "all 0.2s",
              }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
              </button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "10px 14px 0", borderRadius: "16px 16px 0 0",
        background: P.navy, padding: "22px 18px 36px", textAlign: "center",
      }}>
        {/* Gold accent line */}
        <div style={{ width: 28, height: 1.5, background: P.gold, margin: "0 auto 12px", borderRadius: 1 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
          <span style={{
            fontSize: 14, fontWeight: 700, color: "#fff",
            fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.04em",
          }}>PERSONALYZ</span>
        </div>
        <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 10 }}>
          Create your own digital card at personalyz.me
        </div>
        <div style={{
          display: "inline-block", padding: "5px 14px", borderRadius: 6,
          border: `1px solid rgba(255,255,255,0.1)`,
        }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.01em" }}>
            cards.personalyz.me/ToyotaKenya/batman
          </span>
        </div>
      </div>
    </div>
  );
}
