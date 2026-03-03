import { useState } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  PERSONALYZ CARD — "Broadsheet & Brass" Vintage Theme       ║
 ║                                                              ║
 ║  Aesthetic: Victorian broadsheet meets art deco brass         ║
 ║  Fonts: Playfair Display (editorial serif headings)          ║
 ║         + Crimson Pro (old-style body text)                   ║
 ║         + UnifrakturMaguntia (blackletter accent)             ║
 ║  Palette: Aged parchment #F5EFE0, espresso #2C1810,         ║
 ║           brass #A67C52, aged ink #3D2B1F                    ║
 ║  Texture: Paper grain, ornate rules, copper engravings       ║
 ║  Signature: Newspaper-style identity, brass ornaments,       ║
 ║             wax-seal profile frame, engraved dividers        ║
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
const O = {
  parchment: "#F5EFE0",
  parchDark: "#EDE4D0",
  parchDeep: "#E3D8C2",
  cream: "#FAF6ED",
  linen: "#F0E9D8",
  espresso: "#2C1810",
  ink: "#3D2B1F",
  inkMid: "#5C4033",
  inkLight: "#7A6455",
  tan: "#9C8B7A",
  dusty: "#B5A696",
  faded: "#C9BFB2",
  brass: "#A67C52",
  brassLight: "#C49A6C",
  brassDark: "#8B6340",
  copper: "#B87333",
  rust: "#8B4513",
  burgundy: "#6B1C23",
  burgundySoft: "#F5E8EA",
  forest: "#2D4A2D",
  forestSoft: "#EDF2ED",
  border: "#D4C9B8",
  borderDark: "#BFB19D",
  borderFine: "#E4DDD0",
};

// ── Ornamental SVG elements ────────────────────────────────
function OrnateRule({ width = "100%", color = O.brass }) {
  return (
    <svg width={width} height="12" viewBox="0 0 200 12" style={{ display: "block", margin: "0 auto" }}>
      <line x1="0" y1="6" x2="70" y2="6" stroke={color} strokeWidth="0.5" />
      <line x1="130" y1="6" x2="200" y2="6" stroke={color} strokeWidth="0.5" />
      <circle cx="78" cy="6" r="1.5" fill={color} />
      <path d="M85 6 L100 1 L115 6 L100 11 Z" fill="none" stroke={color} strokeWidth="0.8" />
      <circle cx="100" cy="6" r="2" fill={color} />
      <circle cx="122" cy="6" r="1.5" fill={color} />
    </svg>
  );
}

function SmallOrnament({ color = O.brass }) {
  return (
    <svg width="60" height="10" viewBox="0 0 60 10" style={{ display: "block", margin: "0 auto" }}>
      <line x1="0" y1="5" x2="18" y2="5" stroke={color} strokeWidth="0.5" />
      <path d="M22 5 L30 1.5 L38 5 L30 8.5 Z" fill="none" stroke={color} strokeWidth="0.7" />
      <circle cx="30" cy="5" r="1.5" fill={color} />
      <line x1="42" y1="5" x2="60" y2="5" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

function CornerOrnament({ style: extra }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ ...extra, color: O.brass }}>
      <path d="M2 2 L2 12 M2 2 L12 2" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M2 2 L7 7" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ── Vintage Section ─────────────────────────────────────────
function Sec({ title, children, open: init = true, noPad }) {
  const [open, setOpen] = useState(init);
  return (
    <div style={{ marginBottom: 0 }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 0, width: "100%",
        padding: "14px 18px 10px", border: "none", background: "none", cursor: "pointer",
        flexDirection: "column",
      }}>
        {/* Decorative top rule */}
        <div style={{ width: "100%", marginBottom: 8 }}>
          <SmallOrnament />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 8 }}>
          <span style={{
            fontSize: 15, fontWeight: 700, color: O.espresso, flex: 1, textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{title}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={O.dusty} strokeWidth="2" strokeLinecap="round" style={{
            position: "absolute", right: 28,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </button>
      <div style={{
        display: "grid", gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.4s ease",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: noPad ? 0 : "0 18px 16px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── Vintage Stars ───────────────────────────────────────────
function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ fontSize: 12, color: i < n ? O.brass : O.faded }}>★</span>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
export default function VintageCard() {
  const [rating, setRating] = useState(null);
  const [apptTime, setApptTime] = useState(null);
  const [moreTimes, setMoreTimes] = useState(false);
  const [galIdx, setGalIdx] = useState(0);
  const [hoverBtn, setHoverBtn] = useState(null);

  const appts = ["8 o'clock", "9 o'clock", "10 o'clock", "11 o'clock", "4 o'clock", "5 o'clock"];
  const shownAppts = moreTimes ? appts : appts.slice(0, 3);

  return (
    <div style={{
      maxWidth: 420, margin: "0 auto", minHeight: "100vh",
      background: O.parchment, fontFamily: "'Crimson Pro', Georgia, serif",
      color: O.ink, position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=UnifrakturMaguntia&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        .v-press:active { transform: scale(0.97) !important; }
        .v-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Paper grain texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, opacity: 0.12,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        mixBlendMode: "multiply",
      }} />

      {/* ═══════════════════════════════════════════════════
          HERO — Sepia banner, oval profile, broadsheet identity
          ═══════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        {/* Banner — sepia treatment */}
        <div style={{ height: 185, position: "relative", overflow: "hidden" }}>
          <img src={BANNER_URL} alt="" style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: "sepia(0.55) brightness(0.75) contrast(1.1) saturate(0.7)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, rgba(44,24,16,0.2) 0%, rgba(44,24,16,0.7) 100%)`,
          }} />
          {/* Vignette */}
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: "inset 0 0 80px rgba(44,24,16,0.5)",
          }} />
        </div>

        {/* Profile — oval frame with brass border */}
        <div style={{
          position: "absolute", left: "50%", bottom: -48, transform: "translateX(-50%)", zIndex: 5,
        }}>
          {/* Ornate frame */}
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            border: `4px solid ${O.brass}`,
            boxShadow: `0 0 0 2px ${O.parchment}, 0 0 0 4px ${O.brassLight}40, 0 6px 20px rgba(44,24,16,0.3)`,
            overflow: "hidden", position: "relative",
            background: O.parchDark,
          }}>
            <img src={PROFILE_URL} alt="" style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "sepia(0.15) contrast(1.05)",
            }} />
          </div>
        </div>
      </div>

      {/* Identity — Broadsheet style */}
      <div style={{
        margin: "0 14px", background: O.cream,
        border: `1px solid ${O.border}`,
        borderTop: "none",
        padding: "56px 20px 20px", textAlign: "center",
        position: "relative",
      }}>
        {/* Corner ornaments */}
        <CornerOrnament style={{ position: "absolute", top: 8, left: 8 }} />
        <CornerOrnament style={{ position: "absolute", top: 8, right: 8, transform: "scaleX(-1)" }} />
        <CornerOrnament style={{ position: "absolute", bottom: 8, left: 8, transform: "scaleY(-1)" }} />
        <CornerOrnament style={{ position: "absolute", bottom: 8, right: 8, transform: "scale(-1)" }} />

        {/* Masthead style name */}
        <div style={{
          fontSize: 11, fontWeight: 500, color: O.brass,
          letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: 6, fontFamily: "'Crimson Pro', serif",
        }}>— Presented by ToyotaKenya —</div>

        <h1 style={{
          fontSize: 38, fontWeight: 900, color: O.espresso, margin: "0 0 0",
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "-0.02em", lineHeight: 1,
        }}>Batman</h1>

        <div style={{ margin: "8px auto", width: 160 }}>
          <OrnateRule />
        </div>

        <div style={{
          fontSize: 14, fontWeight: 600, color: O.brass,
          letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: 3, fontFamily: "'Playfair Display', serif",
        }}>Guardian of Metropolis</div>

        <div style={{
          fontSize: 13, color: O.tan, fontStyle: "italic",
          marginBottom: 12, fontFamily: "'Crimson Pro', serif",
        }}>Fortress of Solitude</div>

        {/* Double rule */}
        <div style={{ borderTop: `1px solid ${O.border}`, borderBottom: `1px solid ${O.border}`, height: 4, width: 100, margin: "0 auto 12px" }} />

        <p style={{
          fontSize: 14, color: O.inkMid, lineHeight: 1.8, margin: 0,
          fontFamily: "'Crimson Pro', serif", fontWeight: 400,
          textAlign: "justify", hyphens: "auto",
        }}>
          Stronger than a locomotive, faster than a speeding bullet, and always on call when Metropolis (or Earth) needs saving. Kindness first, heat vision second.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          CONTACT — Vintage ledger style
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "10px 14px 0", background: O.cream,
        border: `1px solid ${O.border}`, overflow: "hidden",
      }}>
        {[
          { icon: "✆", label: "WhatsApp Dispatch", value: "12026650100", accent: O.forest },
          { icon: "✉", label: "Electronic Post", value: "superman@dailyplanet.com", accent: O.brass },
          { icon: "☏", label: "Telephone Exchange", value: "12026650100", accent: O.burgundy },
        ].map((c, i) => (
          <div key={i} className="v-press" style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px", cursor: "pointer",
            borderBottom: i < 2 ? `1px solid ${O.borderFine}` : "none",
            transition: "background 0.2s",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
              border: `1.5px solid ${c.accent}`, background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, color: c.accent,
            }}>{c.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 9.5, fontWeight: 600, color: O.dusty,
                letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "'Crimson Pro', serif", marginBottom: 1,
              }}>{c.label}</div>
              <div style={{
                fontSize: 13.5, fontWeight: 600, color: O.espresso,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                fontFamily: "'Crimson Pro', serif",
              }}>{c.value}</div>
            </div>
            <span style={{ color: O.faded, fontSize: 14 }}>›</span>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTIONS
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "10px 14px 0", background: O.cream,
        border: `1px solid ${O.border}`,
      }}>

        {/* ═══ BUSINESS HOURS ═══ */}
        <Sec title="Hours of Operation">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 14px" }}>
            {[
              ["Monday", "8am – 3pm", true], ["Tuesday", "8am – 3pm", true],
              ["Wednesday", "8am – 3pm", true], ["Thursday", "8am – 3pm", true],
              ["Friday", "8am – 3pm", true], ["Saturday", "Closed", false],
              ["Sunday", "Closed", false],
            ].map(([day, time, on]) => (
              <div key={day} style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                padding: "5px 8px",
                borderBottom: `1px dotted ${on ? O.borderFine : "transparent"}`,
              }}>
                <span style={{
                  fontSize: 12.5, fontWeight: 600, color: on ? O.ink : O.faded,
                  fontFamily: "'Crimson Pro', serif", fontStyle: on ? "normal" : "italic",
                }}>{day.substring(0, 3)}</span>
                <span style={{
                  fontSize: 11.5, fontWeight: 400, color: on ? O.inkMid : O.faded,
                  fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
                }}>{time}</span>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SHARE & CONNECT ═══ */}
        <Sec title="Share & Connect">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Save Card", icon: "⬇", bg: O.espresso },
              { label: "Share Card", icon: "↗", bg: O.ink },
              { label: "Contact", icon: "✆", bg: O.brassDark },
              { label: "Homescreen", icon: "⌂", bg: O.inkLight },
            ].map((b, i) => (
              <button key={i} className="v-press"
                onPointerEnter={() => setHoverBtn(i)}
                onPointerLeave={() => setHoverBtn(null)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "11px 10px", border: "none", cursor: "pointer",
                  background: b.bg, color: O.parchment,
                  fontSize: 12.5, fontWeight: 600,
                  fontFamily: "'Crimson Pro', serif",
                  letterSpacing: "0.04em",
                  borderRadius: 0,
                  transition: "all 0.2s",
                  boxShadow: hoverBtn === i ? "0 3px 10px rgba(44,24,16,0.25)" : "0 1px 3px rgba(44,24,16,0.12)",
                  transform: hoverBtn === i ? "translateY(-1px)" : "none",
                }}
              >
                <span style={{ fontSize: 14 }}>{b.icon}</span> {b.label}
              </button>
            ))}
          </div>
        </Sec>

        {/* ═══ RATE ═══ */}
        <Sec title="Rate Our Service">
          <div style={{ display: "flex", gap: 8, marginBottom: rating ? 12 : 0 }}>
            {[
              { label: "Dissatisfied", val: "bad", icon: "☹", c: O.burgundy, bg: O.burgundySoft, bc: "#D4A0A6" },
              { label: "Indifferent", val: "meh", icon: "—", c: O.brass, bg: "#FAF4E8", bc: O.brassLight },
              { label: "Delighted", val: "good", icon: "☺", c: O.forest, bg: O.forestSoft, bc: "#A3BFA3" },
            ].map((r) => (
              <button key={r.val} onClick={() => setRating(r.val)} className="v-press" style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "11px 4px", cursor: "pointer",
                border: `1.5px solid ${rating === r.val ? r.bc : O.border}`,
                background: rating === r.val ? r.bg : O.cream,
                borderRadius: 0, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 24, lineHeight: 1, color: r.c }}>{r.icon}</span>
                <span style={{
                  fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: rating === r.val ? r.c : O.dusty,
                  fontFamily: "'Crimson Pro', serif",
                }}>{r.label}</span>
              </button>
            ))}
          </div>
          {rating && (
            <>
              <textarea placeholder="Your observations, if you please…" style={{
                width: "100%", padding: "10px 14px", border: `1px solid ${O.border}`,
                fontSize: 13.5, fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
                resize: "none", height: 56, outline: "none",
                background: O.parchment, color: O.ink, boxSizing: "border-box", borderRadius: 0,
              }} />
              <button style={{
                width: "100%", padding: 11, border: "none",
                background: O.espresso, color: O.parchment,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Crimson Pro', serif",
                letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6, borderRadius: 0,
              }}>Submit One's Rating</button>
            </>
          )}
        </Sec>

        {/* ═══ APPOINTMENTS ═══ */}
        <Sec title="Request an Audience">
          <div style={{ marginBottom: 12 }}>
            <label style={{
              fontSize: 10, fontWeight: 700, color: O.dusty,
              letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "'Crimson Pro', serif",
              display: "block", marginBottom: 4,
            }}>Date of Appointment</label>
            <input type="date" defaultValue="2026-02-24" style={{
              width: "100%", padding: "10px 14px", border: `1px solid ${O.border}`,
              fontSize: 13.5, fontFamily: "'Crimson Pro', serif",
              color: O.espresso, outline: "none", background: O.parchment,
              boxSizing: "border-box", borderRadius: 0,
            }} />
          </div>
          <label style={{
            fontSize: 10, fontWeight: 700, color: O.dusty,
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: "'Crimson Pro', serif",
            display: "block", marginBottom: 5,
          }}>Preferred Hour</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
            {shownAppts.map((t, i) => (
              <button key={i} onClick={() => setApptTime(i)} className="v-press" style={{
                padding: "8px 4px",
                border: `1.5px solid ${apptTime === i ? O.brass : O.border}`,
                background: apptTime === i ? "#FAF4E8" : O.cream,
                color: apptTime === i ? O.brassDark : O.inkLight,
                fontSize: 11.5, fontWeight: 500, cursor: "pointer",
                fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
                transition: "all 0.15s", borderRadius: 0,
              }}>{t}</button>
            ))}
          </div>
          {!moreTimes && (
            <button onClick={() => setMoreTimes(true)} style={{
              display: "block", width: "100%", padding: 4, border: "none",
              background: "none", color: O.brass, fontSize: 12, fontWeight: 500,
              cursor: "pointer", fontFamily: "'Crimson Pro', serif",
              fontStyle: "italic", marginBottom: 6,
            }}>Further hours available ▾</button>
          )}
          <button style={{
            width: "100%", padding: 12, border: "none",
            background: O.espresso, color: O.parchment,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Crimson Pro', serif",
            letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 0,
          }}>Request an Appointment</button>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          SERVICES — 2-col with sepia images
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", background: O.cream, border: `1px solid ${O.border}` }}>
        <Sec title="Our Services">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { title: "Metropolis City Watch", desc: "Rapid aerial response, crisis containment, and polite roof landings." },
              { title: "Disaster Relief & Rescue", desc: "From collapsing bridges to volcanic grumbles—calm coordination." },
              { title: "Satellite & Orbital", desc: "Gentle satellite repositioning, debris cleanup, and space-tows." },
              { title: "Heroic Readiness", desc: "Community workshops on emergency readiness and ethical power use." },
            ].map((svc, i) => (
              <div key={i} className="v-press" style={{
                border: `1px solid ${O.border}`, overflow: "hidden",
                cursor: "pointer", transition: "transform 0.15s",
                background: O.cream,
              }}>
                <div style={{ height: 80, position: "relative", overflow: "hidden" }}>
                  <img src={SVC_IMGS[i]} alt="" style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    filter: "sepia(0.4) brightness(0.8) contrast(1.05) saturate(0.75)",
                  }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(44,24,16,0.6) 0%, rgba(44,24,16,0.05) 60%)" }} />
                  <div style={{
                    position: "absolute", bottom: 5, left: 7, right: 7,
                    fontSize: 11, fontWeight: 700, color: O.parchment,
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1.2, textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  }}>{svc.title}</div>
                </div>
                <div style={{ padding: "8px 9px 10px" }}>
                  <div style={{
                    fontSize: 11, color: O.inkLight, lineHeight: 1.55,
                    fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
                    marginBottom: 8,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{svc.desc}</div>
                  <button style={{
                    width: "100%", padding: "6px 8px",
                    border: `1px solid ${O.espresso}`, background: "transparent",
                    color: O.espresso, fontSize: 10.5, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'Crimson Pro', serif", letterSpacing: "0.08em",
                    textTransform: "uppercase", borderRadius: 0,
                  }}>Read more</button>
                </div>
              </div>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS — 2-col with quotation marks
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", background: O.cream, border: `1px solid ${O.border}` }}>
        <Sec title="Testimonials">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { name: "Lois Lane", text: "Unfailingly reliable and impossibly kind. Also an excellent interview—when he's not saving the day.", stars: 5 },
              { name: "Batman", text: "Efficient. Trustworthy. Overpowered, but responsible about it.", stars: 5 },
            ].map((t, i) => (
              <div key={i} style={{
                padding: "14px 10px", background: O.parchment,
                border: `1px solid ${O.borderFine}`, position: "relative",
              }}>
                {/* Large quote mark */}
                <div style={{
                  position: "absolute", top: 2, right: 6,
                  fontSize: 40, fontFamily: "Georgia, serif", color: O.parchDeep,
                  lineHeight: 1, fontWeight: 700,
                }}>"</div>

                <div style={{
                  width: 38, height: 38, borderRadius: "50%", marginBottom: 8,
                  overflow: "hidden", border: `2px solid ${O.brass}`,
                  boxShadow: `0 0 0 1px ${O.parchment}`,
                }}>
                  <img src={TEST_IMGS[i]} alt="" style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    filter: "sepia(0.2) contrast(1.05)",
                  }} />
                </div>

                <Stars n={t.stars} />

                <div style={{
                  fontSize: 11.5, color: O.inkMid, lineHeight: 1.6,
                  marginTop: 6, marginBottom: 8,
                  fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
                }}>"{t.text}"</div>

                <div style={{
                  fontSize: 11, fontWeight: 700, color: O.espresso,
                  fontFamily: "'Playfair Display', serif",
                }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          SOCIAL — Brass circle icons
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", background: O.cream, border: `1px solid ${O.border}` }}>
        <Sec title="Social Connexions">
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            {[
              { label: "Web", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={O.espresso} strokeWidth="1.4" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
              { label: "X", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill={O.espresso}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { label: "Insta", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={O.espresso} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill={O.espresso} stroke="none"/></svg> },
              { label: "TG", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill={O.espresso}><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            ].map((s, i) => (
              <button key={i} className="v-press" style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "transparent",
                border: `1.5px solid ${O.brass}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {s.icon}
                <span style={{ fontSize: 7, fontWeight: 700, color: O.dusty, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Crimson Pro', serif" }}>{s.label}</span>
              </button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          MAP + EMBED + GALLERY
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "10px 14px 0", background: O.cream, border: `1px solid ${O.border}` }}>
        {/* MAP */}
        <Sec title="Our Location" noPad>
          <div style={{
            margin: "0 18px 16px", overflow: "hidden", height: 165,
            border: `1px solid ${O.border}`,
            boxShadow: "inset 0 0 12px rgba(44,24,16,0.08)",
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.502320959!2d-87.89668624561754!3d41.83384858178919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sza!4v1765441428500!5m2!1sen!2sza"
              width="100%" height="100%" style={{ border: 0, display: "block", filter: "sepia(0.25) saturate(0.8)" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Sec>

        {/* CUSTOM HTML */}
        <Sec title="Featured Content" open={false}>
          <div style={{
            border: `1px solid ${O.border}`, background: O.parchment,
            padding: "18px 14px", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, color: O.brass, marginBottom: 6 }}>❧</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: O.espresso, fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>Embedded Content</div>
            <div style={{ fontSize: 12, color: O.tan, fontStyle: "italic", lineHeight: 1.5 }}>
              LinkedIn despatches, finance applications, or bespoke embeds shall render here.
            </div>
          </div>
        </Sec>

        {/* GALLERY */}
        <Sec title="Gallery">
          <div style={{
            height: 185, marginBottom: 8, overflow: "hidden", position: "relative",
            border: `1px solid ${O.border}`,
            boxShadow: "inset 0 0 16px rgba(44,24,16,0.08)",
          }}>
            <img src={GALLERY_IMGS[galIdx]} alt="" style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              filter: "sepia(0.15) contrast(1.05) saturate(0.85)",
              transition: "opacity 0.3s",
            }} />
            <button onClick={() => setGalIdx(Math.max(0, galIdx - 1))} style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(44,24,16,0.55)", border: `1px solid ${O.brass}50`,
              color: O.parchment, fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galIdx === 0 ? 0.3 : 1,
            }}>‹</button>
            <button onClick={() => setGalIdx(Math.min(GALLERY_IMGS.length - 1, galIdx + 1))} style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(44,24,16,0.55)", border: `1px solid ${O.brass}50`,
              color: O.parchment, fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galIdx === GALLERY_IMGS.length - 1 ? 0.3 : 1,
            }}>›</button>
            <div style={{
              position: "absolute", bottom: 8, right: 10,
              padding: "3px 10px", background: "rgba(44,24,16,0.6)",
              border: `1px solid ${O.brass}40`,
              color: O.parchment, fontSize: 10, fontWeight: 600,
              fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
            }}>{galIdx + 1} of {GALLERY_IMGS.length}</div>
          </div>
          <div className="v-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
            {GALLERY_IMGS.map((img, i) => (
              <button key={i} onClick={() => setGalIdx(i)} style={{
                width: 50, height: 50, flexShrink: 0,
                overflow: "hidden", cursor: "pointer", padding: 0, background: "none",
                border: galIdx === i ? `2.5px solid ${O.brass}` : `1.5px solid ${O.border}`,
                opacity: galIdx === i ? 1 : 0.5, transition: "all 0.2s", borderRadius: 0,
              }}>
                <img src={img} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  filter: "sepia(0.2) saturate(0.8)",
                }} />
              </button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          FOOTER — Old-world colophon
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "10px 14px 0", background: O.espresso,
        border: `1px solid ${O.brassDark}40`,
        padding: "22px 18px 36px", textAlign: "center",
        position: "relative",
      }}>
        {/* Ornate top rule */}
        <div style={{ marginBottom: 14 }}>
          <OrnateRule color={O.brass + "80"} />
        </div>

        {/* Blackletter brand */}
        <div style={{
          fontSize: 22, color: O.brassLight,
          fontFamily: "'UnifrakturMaguntia', cursive",
          marginBottom: 4, letterSpacing: "0.02em",
        }}>Personalyz</div>

        <div style={{
          fontSize: 10.5, color: "rgba(245,239,224,0.3)", lineHeight: 1.6,
          fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
          marginBottom: 10,
        }}>
          Purveyors of Fine Digital Calling Cards — Est. MMXXV
        </div>

        <div style={{
          display: "inline-block", padding: "5px 14px",
          border: `1px solid rgba(166,124,82,0.25)`,
        }}>
          <span style={{
            fontSize: 10, color: "rgba(245,239,224,0.35)", fontWeight: 400,
            fontFamily: "'Crimson Pro', serif", fontStyle: "italic",
          }}>
            cards.personalyz.me/ToyotaKenya/batman
          </span>
        </div>

        {/* Bottom ornament */}
        <div style={{ marginTop: 14 }}>
          <span style={{ fontSize: 16, color: O.brass + "60" }}>❦</span>
        </div>
      </div>
    </div>
  );
}
