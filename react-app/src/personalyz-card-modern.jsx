import { useState } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  PERSONALYZ CARD — "Void & Neon" Ultra-Modern Theme         ║
 ║                                                              ║
 ║  Aesthetic: Dark glass, neon accents, app-native density     ║
 ║  Fonts: Sora (geometric, futuristic) + JetBrains Mono       ║
 ║  Palette: Near-black #09090B base, cyan #06B6D4 +           ║
 ║           lime #84CC16 dual accent, glass overlays           ║
 ║  Layout: Forced 2-col, ultra-tight spacing, pill shapes     ║
 ║  Signature: Gradient mesh hero, frosted glass sections,      ║
 ║             neon glow states, mono-spaced data               ║
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
const V = {
  void: "#09090B",
  void2: "#0F0F12",
  void3: "#18181B",
  void4: "#1C1C21",
  void5: "#27272A",
  zinc6: "#3F3F46",
  zinc5: "#52525B",
  zinc4: "#71717A",
  zinc3: "#A1A1AA",
  zinc2: "#D4D4D8",
  zinc1: "#E4E4E7",
  white: "#FAFAFA",
  cyan: "#06B6D4",
  cyanDark: "#0891B2",
  cyanGlow: "rgba(6,182,212,0.15)",
  cyanGlow2: "rgba(6,182,212,0.08)",
  lime: "#84CC16",
  limeDark: "#65A30D",
  limeGlow: "rgba(132,204,22,0.15)",
  rose: "#F43F5E",
  roseGlow: "rgba(244,63,94,0.12)",
  amber: "#F59E0B",
  amberGlow: "rgba(245,158,11,0.12)",
  green: "#22C55E",
  greenGlow: "rgba(34,197,94,0.12)",
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.07)",
  glassHover: "rgba(255,255,255,0.06)",
  gradient: "linear-gradient(135deg, #06B6D4, #84CC16)",
};

// ── Glass Section ───────────────────────────────────────────
function Sec({ title, tag, children, open: init = true, noPad }) {
  const [open, setOpen] = useState(init);
  return (
    <div style={{
      background: V.glass, borderRadius: 16,
      border: `1px solid ${V.glassBorder}`,
      marginBottom: 8, overflow: "hidden",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 8, width: "100%",
        padding: "12px 14px", border: "none", background: "none", cursor: "pointer",
      }}>
        {/* Gradient dot */}
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: V.gradient, flexShrink: 0,
          boxShadow: `0 0 8px ${V.cyanGlow}`,
        }} />
        <span style={{
          fontSize: 12.5, fontWeight: 700, color: V.zinc2, flex: 1, textAlign: "left",
          fontFamily: "'Sora', sans-serif", letterSpacing: "-0.01em",
        }}>{title}</span>
        {tag && (
          <span style={{
            fontSize: 9, fontWeight: 600, color: V.cyan,
            fontFamily: "'JetBrains Mono', monospace",
            padding: "2px 7px", borderRadius: 4,
            background: V.cyanGlow2, letterSpacing: "0.02em",
          }}>{tag}</span>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={V.zinc5} strokeWidth="2.5" strokeLinecap="round" style={{
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: open ? "rotate(180deg)" : "rotate(0)",
        }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div style={{
        display: "grid", gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: noPad ? 0 : "0 14px 14px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── Stars (neon) ────────────────────────────────────────────
function Stars({ n = 5, size = 11 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? V.amber : V.void5}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
export default function ModernCard() {
  const [rating, setRating] = useState(null);
  const [apptTime, setApptTime] = useState(null);
  const [moreTimes, setMoreTimes] = useState(false);
  const [galIdx, setGalIdx] = useState(0);
  const [hoverBtn, setHoverBtn] = useState(null);

  const appts = ["08:00", "09:00", "10:00", "11:00", "16:00", "17:00"];
  const shownAppts = moreTimes ? appts : appts.slice(0, 3);

  const mono = "'JetBrains Mono', monospace";
  const sans = "'Sora', sans-serif";

  return (
    <div style={{
      maxWidth: 420, margin: "0 auto", background: V.void,
      minHeight: "100vh", fontFamily: sans, color: V.zinc3,
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        .n-press:active { transform: scale(0.96) !important; }
        .n-scroll::-webkit-scrollbar { display: none; }
        @keyframes meshMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease-out both; }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO — Gradient mesh + glass profile card
          ═══════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        {/* Animated gradient mesh background */}
        <div style={{
          height: 220, position: "relative", overflow: "hidden",
        }}>
          <img src={BANNER_URL} alt="" style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: "brightness(0.35) saturate(0.7)",
          }} />
          {/* Gradient mesh overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 20% 50%, rgba(6,182,212,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(132,204,22,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(244,63,94,0.1) 0%, transparent 50%)",
            animation: "meshMove 8s ease-in-out infinite",
            backgroundSize: "200% 200%",
          }} />
          {/* Noise texture overlay */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.35,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }} />
          {/* Bottom fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
            background: `linear-gradient(transparent, ${V.void})`,
          }} />
          {/* Company pill — top left */}
          <div style={{
            position: "absolute", top: 12, left: 12,
            padding: "4px 10px", borderRadius: 20,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${V.glassBorder}`,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: V.green, animation: "glowPulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: V.zinc2, fontFamily: mono, letterSpacing: "0.02em" }}>
              ToyotaKenya
            </span>
          </div>
          {/* Status pill — top right */}
          <div style={{
            position: "absolute", top: 12, right: 12,
            padding: "4px 10px", borderRadius: 20,
            background: V.greenGlow, border: "1px solid rgba(34,197,94,0.2)",
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: V.green, fontFamily: mono, letterSpacing: "0.06em", textTransform: "uppercase" }}>ONLINE</span>
          </div>
        </div>

        {/* Profile + Identity — overlapping */}
        <div className="fade-in" style={{ marginTop: -56, padding: "0 12px", position: "relative", zIndex: 5 }}>
          <div style={{
            background: V.glass, borderRadius: 20,
            border: `1px solid ${V.glassBorder}`,
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            padding: "0 18px 18px", textAlign: "center",
          }}>
            {/* Profile pic */}
            <div style={{
              width: 84, height: 84, borderRadius: 22, margin: "-42px auto 12px",
              border: `3px solid ${V.void3}`,
              overflow: "hidden", position: "relative",
              boxShadow: `0 0 0 1px ${V.glassBorder}, 0 8px 24px rgba(0,0,0,0.4)`,
            }}>
              <img src={PROFILE_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {/* Gradient ring */}
              <div style={{
                position: "absolute", inset: -3, borderRadius: 25, border: "2px solid transparent",
                background: `linear-gradient(${V.void3}, ${V.void3}) padding-box, ${V.gradient} border-box`,
                pointerEvents: "none",
              }} />
            </div>

            <h1 style={{
              fontSize: 24, fontWeight: 800, color: V.white, margin: "0 0 3px",
              fontFamily: sans, letterSpacing: "-0.03em", lineHeight: 1,
            }}>batman</h1>

            {/* Gradient title */}
            <div style={{
              fontSize: 12, fontWeight: 700,
              background: V.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.02em", marginBottom: 2,
            }}>Guardian of Metropolis</div>

            <div style={{
              fontSize: 11, color: V.zinc5, fontFamily: mono, fontWeight: 400,
              marginBottom: 10,
            }}>Fortress of Solitude</div>

            {/* Thin gradient divider */}
            <div style={{
              width: 40, height: 1, margin: "0 auto 10px",
              background: V.gradient, borderRadius: 1, opacity: 0.4,
            }} />

            <p style={{
              fontSize: 12.5, color: V.zinc4, lineHeight: 1.7, margin: 0,
              fontWeight: 400,
            }}>
              Stronger than a locomotive, faster than a speeding bullet, and always on call when Metropolis (or Earth) needs saving. Kindness first, heat vision second.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          CONTACT — Neon-accented pills
          ═══════════════════════════════════════════════════ */}
      <div style={{ padding: "8px 12px 0", display: "flex", gap: 6 }}>
        {[
          { icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
            label: "WhatsApp", val: "120-2655-0100", glow: "rgba(37,211,102,0.1)", border: "rgba(37,211,102,0.2)", color: "#25D366" },
          { icon: <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={V.cyan} strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
            label: "Email", val: "superman@dp.com", glow: V.cyanGlow2, border: "rgba(6,182,212,0.15)", color: V.cyan },
          { icon: <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
            label: "Phone", val: "120-2655-0100", glow: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.15)", color: "#A78BFA" },
        ].map((c, i) => (
          <div key={i} className="n-press" style={{
            flex: 1, minWidth: 0, padding: "10px 9px", borderRadius: 14,
            background: c.glow, border: `1px solid ${c.border}`,
            cursor: "pointer", transition: "transform 0.15s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
              {c.icon}
              <span style={{ fontSize: 8.5, fontWeight: 700, color: c.color, fontFamily: mono, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.label}</span>
            </div>
            <div style={{
              fontSize: 10.5, fontWeight: 600, color: V.zinc2, fontFamily: mono,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          ALL SECTIONS
          ═══════════════════════════════════════════════════ */}
      <div style={{ padding: "8px 12px 0" }}>

        {/* ═══ BUSINESS HOURS ═══ */}
        <Sec title="Business Hours" tag="7 days">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 8px" }}>
            {[
              ["Mon", "08–15", true], ["Tue", "08–15", true], ["Wed", "08–15", true],
              ["Thu", "08–15", true], ["Fri", "08–15", true], ["Sat", "—", false], ["Sun", "—", false],
            ].map(([d, t, on]) => (
              <div key={d} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "5px 8px", borderRadius: 6,
                background: on ? V.greenGlow : "rgba(255,255,255,0.02)",
                border: `1px solid ${on ? "rgba(34,197,94,0.12)" : "transparent"}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: on ? V.green : V.zinc6, fontFamily: mono }}>{d}</span>
                <span style={{ fontSize: 10, fontWeight: 500, color: on ? "rgba(34,197,94,0.7)" : V.zinc6, fontFamily: mono }}>{t}</span>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SHARE & CONNECT ═══ */}
        <Sec title="Share & Connect" tag="4 actions">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              { label: "Save Card", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>,
                bg: `linear-gradient(135deg, ${V.cyan}, ${V.cyanDark})`, glow: V.cyanGlow },
              { label: "Share", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
                bg: `linear-gradient(135deg, ${V.lime}, ${V.limeDark})`, glow: V.limeGlow },
              { label: "Contact", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
                bg: "linear-gradient(135deg, #8B5CF6, #7C3AED)", glow: "rgba(139,92,246,0.15)" },
              { label: "Homescreen", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7M14 17.5h7"/></svg>,
                bg: `linear-gradient(135deg, ${V.void5}, ${V.zinc6})`, glow: "rgba(255,255,255,0.04)" },
            ].map((b, i) => (
              <button key={i} className="n-press"
                onPointerEnter={() => setHoverBtn(i)}
                onPointerLeave={() => setHoverBtn(null)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  padding: "11px 8px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: b.bg, color: "#fff",
                  fontSize: 11.5, fontWeight: 700, fontFamily: sans,
                  boxShadow: hoverBtn === i ? `0 0 20px ${b.glow}, 0 4px 12px rgba(0,0,0,0.3)` : `0 2px 8px rgba(0,0,0,0.2)`,
                  transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: hoverBtn === i ? "translateY(-1px) scale(1.03)" : "none",
                  letterSpacing: "-0.01em",
                }}
              >{b.icon} {b.label}</button>
            ))}
          </div>
        </Sec>

        {/* ═══ RATE ═══ */}
        <Sec title="Rate Our Service">
          <div style={{ display: "flex", gap: 6, marginBottom: rating ? 10 : 0 }}>
            {[
              { label: "Bad", val: "bad", c: V.rose, glow: V.roseGlow, border: "rgba(244,63,94,0.2)",
                face: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={V.rose} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
              { label: "Meh", val: "meh", c: V.amber, glow: V.amberGlow, border: "rgba(245,158,11,0.2)",
                face: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={V.amber} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
              { label: "Great", val: "good", c: V.green, glow: V.greenGlow, border: "rgba(34,197,94,0.2)",
                face: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={V.green} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
            ].map((r) => (
              <button key={r.val} onClick={() => setRating(r.val)} className="n-press" style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "10px 4px", borderRadius: 12, cursor: "pointer",
                border: `1.5px solid ${rating === r.val ? r.border : V.glassBorder}`,
                background: rating === r.val ? r.glow : V.glass,
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                transform: rating === r.val ? "scale(1.05)" : "scale(1)",
              }}>
                {r.face}
                <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: rating === r.val ? r.c : V.zinc5, fontFamily: mono }}>{r.label}</span>
              </button>
            ))}
          </div>
          {rating && (
            <>
              <textarea placeholder="Tell us more…" style={{
                width: "100%", padding: "10px 12px", borderRadius: 10,
                border: `1px solid ${V.glassBorder}`, fontSize: 12.5, fontFamily: sans,
                resize: "none", height: 52, outline: "none",
                background: V.void3, color: V.zinc3, boxSizing: "border-box",
              }} />
              <button style={{
                width: "100%", padding: 10, borderRadius: 10, border: "none",
                background: V.gradient, color: V.void,
                fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: sans, marginTop: 6,
              }}>Submit</button>
            </>
          )}
        </Sec>

        {/* ═══ APPOINTMENTS ═══ */}
        <Sec title="Book a Slot" tag="6 open">
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 9, fontWeight: 700, color: V.zinc5, fontFamily: mono, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>DATE</label>
            <input type="date" defaultValue="2026-02-24" style={{
              width: "100%", padding: "9px 12px", borderRadius: 10,
              border: `1px solid ${V.glassBorder}`, fontSize: 12.5, fontFamily: mono,
              color: V.zinc2, outline: "none", background: V.void3, boxSizing: "border-box",
              colorScheme: "dark",
            }} />
          </div>
          <label style={{ fontSize: 9, fontWeight: 700, color: V.zinc5, fontFamily: mono, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>TIME</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 8 }}>
            {shownAppts.map((t, i) => (
              <button key={i} onClick={() => setApptTime(i)} className="n-press" style={{
                padding: "8px 4px", borderRadius: 8,
                border: `1.5px solid ${apptTime === i ? V.cyan : V.glassBorder}`,
                background: apptTime === i ? V.cyanGlow2 : V.void3,
                color: apptTime === i ? V.cyan : V.zinc4,
                fontSize: 11, fontWeight: 600, cursor: "pointer",
                fontFamily: mono, transition: "all 0.15s",
                boxShadow: apptTime === i ? `0 0 12px ${V.cyanGlow}` : "none",
              }}>{t}</button>
            ))}
          </div>
          {!moreTimes && (
            <button onClick={() => setMoreTimes(true)} style={{
              display: "block", width: "100%", padding: 4, border: "none",
              background: "none", color: V.cyan, fontSize: 11, fontWeight: 600,
              cursor: "pointer", fontFamily: mono, marginBottom: 6,
            }}>+{appts.length - 3} more slots ▾</button>
          )}
          <button style={{
            width: "100%", padding: 11, borderRadius: 10, border: "none",
            background: V.gradient, color: V.void,
            fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: sans,
            boxShadow: `0 0 20px ${V.cyanGlow}`,
          }}>Request Appointment</button>
        </Sec>

        {/* ═══ SERVICES — 2-col dark tiles ═══ */}
        <Sec title="Services" tag={`${SVC_IMGS.length}`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { title: "Metropolis City Watch", desc: "Rapid aerial response, crisis containment, and polite roof landings." },
              { title: "Disaster Relief & Rescue", desc: "Collapsing bridges to volcanic grumbles—calm coordination." },
              { title: "Satellite & Orbital Support", desc: "Gentle satellite repositioning, debris cleanup, space-tows." },
              { title: "Heroic Readiness Training", desc: "Emergency readiness workshops and ethical power use." },
            ].map((svc, i) => (
              <div key={i} className="n-press" style={{
                borderRadius: 14, overflow: "hidden",
                border: `1px solid ${V.glassBorder}`,
                background: V.void3, cursor: "pointer", transition: "transform 0.15s",
              }}>
                <div style={{ height: 80, position: "relative", overflow: "hidden" }}>
                  <img src={SVC_IMGS[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.7) saturate(0.8)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.1) 60%)" }} />
                  <div style={{ position: "absolute", bottom: 6, left: 8, right: 8, fontSize: 11, fontWeight: 700, color: V.white, fontFamily: sans, lineHeight: 1.25 }}>{svc.title}</div>
                </div>
                <div style={{ padding: "8px 9px 10px" }}>
                  <div style={{ fontSize: 10, color: V.zinc5, lineHeight: 1.5, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{svc.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: V.cyan, fontFamily: mono }}>
                    VIEW
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={V.cyan} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ TESTIMONIALS — 2-col glass ═══ */}
        <Sec title="Testimonials" tag="5/5">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { name: "Lois Lane", text: "Unfailingly reliable and impossibly kind. An excellent interview—when not saving the day.", stars: 5 },
              { name: "Batman", text: "Efficient. Trustworthy. Overpowered, but responsible about it.", stars: 5 },
            ].map((t, i) => (
              <div key={i} style={{
                padding: "12px 10px", borderRadius: 14,
                background: V.void3, border: `1px solid ${V.glassBorder}`,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, marginBottom: 8,
                  overflow: "hidden", border: `2px solid ${V.void5}`,
                }}>
                  <img src={TEST_IMGS[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <Stars n={t.stars} />
                <div style={{ fontSize: 10.5, color: V.zinc4, lineHeight: 1.55, marginTop: 6, marginBottom: 8, fontStyle: "italic" }}>
                  "{t.text}"
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: V.zinc2, fontFamily: mono }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SOCIAL — Neon icon row ═══ */}
        <Sec title="Social" tag="4 links">
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {[
              { label: "WEB", color: V.cyan, glow: V.cyanGlow2, icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={V.cyan} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
              { label: "X", color: V.zinc2, glow: "rgba(255,255,255,0.04)", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill={V.zinc2}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { label: "IG", color: "#E4405F", glow: "rgba(228,64,95,0.08)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#E4405F" stroke="none"/></svg> },
              { label: "TG", color: "#0088CC", glow: "rgba(0,136,204,0.08)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="#0088CC"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            ].map((s, i) => (
              <button key={i} className="n-press" style={{
                width: 48, height: 48, borderRadius: 14,
                background: s.glow, border: `1px solid ${s.color}22`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {s.icon}
                <span style={{ fontSize: 7, fontWeight: 700, color: s.color, fontFamily: mono, letterSpacing: "0.06em" }}>{s.label}</span>
              </button>
            ))}
          </div>
        </Sec>

        {/* ═══ MAP ═══ */}
        <Sec title="Location" noPad>
          <div style={{ margin: "0 14px 14px", borderRadius: 12, overflow: "hidden", height: 160, border: `1px solid ${V.glassBorder}` }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.502320959!2d-87.89668624561754!3d41.83384858178919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sza!4v1765441428500!5m2!1sen!2sza"
              width="100%" height="100%" style={{ border: 0, display: "block", filter: "invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(1.1)" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Sec>

        {/* ═══ CUSTOM HTML ═══ */}
        <Sec title="Featured Content" open={false}>
          <div style={{
            borderRadius: 12, border: `1px solid ${V.glassBorder}`,
            background: V.void3, padding: "18px 14px", textAlign: "center",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: V.cyanGlow2, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 8, border: `1px solid rgba(6,182,212,0.12)` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={V.cyan} strokeWidth="1.8" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: V.zinc2, marginBottom: 2 }}>Embedded Content</div>
            <div style={{ fontSize: 10.5, color: V.zinc5, lineHeight: 1.5 }}>LinkedIn, finance apps, or custom embeds.</div>
          </div>
        </Sec>

        {/* ═══ GALLERY ═══ */}
        <Sec title="Gallery" tag={`${GALLERY_IMGS.length} photos`}>
          <div style={{
            height: 185, borderRadius: 14, marginBottom: 8,
            overflow: "hidden", position: "relative",
            border: `1px solid ${V.glassBorder}`,
          }}>
            <img src={GALLERY_IMGS[galIdx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.3s" }} />
            {/* Dark vignette */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.4) 100%)" }} />
            <button onClick={() => setGalIdx(Math.max(0, galIdx - 1))} style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              width: 30, height: 30, borderRadius: 8,
              background: "rgba(9,9,11,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: `1px solid ${V.glassBorder}`, color: "#fff", fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", opacity: galIdx === 0 ? 0.3 : 1,
            }}>‹</button>
            <button onClick={() => setGalIdx(Math.min(GALLERY_IMGS.length - 1, galIdx + 1))} style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              width: 30, height: 30, borderRadius: 8,
              background: "rgba(9,9,11,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: `1px solid ${V.glassBorder}`, color: "#fff", fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", opacity: galIdx === GALLERY_IMGS.length - 1 ? 0.3 : 1,
            }}>›</button>
            <div style={{
              position: "absolute", bottom: 8, right: 10,
              padding: "3px 10px", borderRadius: 8,
              background: "rgba(9,9,11,0.6)", backdropFilter: "blur(4px)",
              border: `1px solid ${V.glassBorder}`,
              color: V.zinc3, fontSize: 10, fontWeight: 600, fontFamily: mono,
            }}>{galIdx + 1}/{GALLERY_IMGS.length}</div>
          </div>
          <div className="n-scroll" style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none" }}>
            {GALLERY_IMGS.map((img, i) => (
              <button key={i} onClick={() => setGalIdx(i)} style={{
                width: 50, height: 50, borderRadius: 10, flexShrink: 0,
                overflow: "hidden", cursor: "pointer", padding: 0, background: "none",
                border: galIdx === i ? `2px solid ${V.cyan}` : `1.5px solid ${V.glassBorder}`,
                opacity: galIdx === i ? 1 : 0.4, transition: "all 0.2s",
                boxShadow: galIdx === i ? `0 0 10px ${V.cyanGlow}` : "none",
              }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════ */}
      <div style={{ padding: "20px 12px 40px", textAlign: "center" }}>
        {/* Gradient line */}
        <div style={{ width: 40, height: 2, background: V.gradient, margin: "0 auto 14px", borderRadius: 1 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5,
            background: V.gradient, display: "flex", alignItems: "center", justifyContent: "center",
          }}><span style={{ color: V.void, fontSize: 9, fontWeight: 900 }}>P</span></div>
          <span style={{ fontSize: 11, fontWeight: 700, color: V.zinc4, fontFamily: mono, letterSpacing: "0.06em", textTransform: "uppercase" }}>Personalyz</span>
        </div>
        <div style={{ fontSize: 10, color: V.zinc6, marginBottom: 8 }}>Create your own digital card</div>
        <div style={{
          display: "inline-block", padding: "4px 12px", borderRadius: 6,
          background: V.glass, border: `1px solid ${V.glassBorder}`,
        }}>
          <span style={{ fontSize: 9.5, color: V.zinc5, fontFamily: mono }}>
            cards.personalyz.me/ToyotaKenya/batman
          </span>
        </div>
      </div>
    </div>
  );
}
