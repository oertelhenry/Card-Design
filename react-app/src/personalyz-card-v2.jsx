import { useState, useRef, useEffect } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  PERSONALYZ CARD — "Slate & Spark" Theme                    ║
 ║                                                              ║
 ║  Aesthetic: Dark editorial hero → warm ivory body            ║
 ║  Fonts: Outfit (geometric, modern) + Fraunces (expressive   ║
 ║         optical serif for headings)                          ║
 ║  Accent: Electric cobalt #2563EB on warm #FAFAF7 base       ║
 ║  Layout: Forced 2-col grids, never responsive-stack          ║
 ║  Signature: Diagonal clip on hero, overlapping profile,      ║
 ║             pill contact row, micro-animations throughout    ║
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

// ── Collapsible Section ─────────────────────────────────────
function Sec({ title, iconSvg, children, open: defaultOpen = true, noPad, topBorder }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#fff", borderTop: topBorder ? "1px solid #EDEDED" : "none" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "13px 16px", border: "none", background: "none", cursor: "pointer",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 13 }}>{iconSvg}</span>
        </div>
        <span style={{
          fontSize: 13.5, fontWeight: 700, color: "#111", flex: 1, textAlign: "left",
          fontFamily: "'Fraunces', serif", letterSpacing: "-0.01em",
        }}>{title}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" style={{
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div style={{
        display: "grid", gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: noPad ? "0" : "0 16px 14px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── Stars ────────────────────────────────────────────────────
function Stars({ n = 5, size = 11 }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? "#F59E0B" : "#E5E7EB"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN CARD
// ══════════════════════════════════════════════════════════════
export default function Card() {
  const [rating, setRating] = useState(null);
  const [apptTime, setApptTime] = useState(null);
  const [moreTimes, setMoreTimes] = useState(false);
  const [galIdx, setGalIdx] = useState(0);
  const [hoverShare, setHoverShare] = useState(null);

  const appts = ["08–09", "09–10", "10–11", "11–12", "16–17", "17–18"];
  const shownAppts = moreTimes ? appts : appts.slice(0, 3);

  return (
    <div style={{
      maxWidth: 420, margin: "0 auto", background: "#F5F5F2",
      minHeight: "100vh", position: "relative",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100% { transform:scale(1) } 50% { transform:scale(1.05) } }
        .fade-up { animation: fadeUp 0.5s ease-out both; }
        .card-pill:active { transform: scale(0.97); }
        .svc-tile:active { transform: scale(0.98); }
        .gal-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO — Banner + Profile Overlay + Identity
          ═══════════════════════════════════════════════════ */}
      <div style={{ position: "relative", paddingBottom: 24 }}>
        {/* Banner with diagonal clip */}
        <div style={{
          height: 195, position: "relative", overflow: "hidden",
          clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 100%)",
        }}>
          <img src={BANNER_URL} alt="" style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
          }} />
          {/* Dark gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
          }} />
          {/* Company badge */}
          <div style={{
            position: "absolute", top: 12, left: 14,
            padding: "5px 11px", borderRadius: 20,
            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
              ToyotaKenya
            </span>
          </div>
        </div>

        {/* Profile picture — overlapping banner */}
        <div style={{
          position: "absolute", left: "50%", top: 142,
          transform: "translateX(-50%)", zIndex: 5,
        }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            border: "4px solid #fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            overflow: "hidden", background: "#ddd",
          }}>
            <img src={PROFILE_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Active dot */}
          <div style={{
            position: "absolute", bottom: 6, right: 6,
            width: 16, height: 16, borderRadius: "50%",
            background: "#22C55E", border: "3px solid #fff",
          }} />
        </div>
      </div>

      {/* Identity Card */}
      <div className="fade-up" style={{
        background: "#fff", margin: "28px 12px 8px", borderRadius: 18,
        padding: "42px 18px 16px", textAlign: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)",
        position: "relative",
      }}>
        {/* Subtle accent line */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 40, height: 3, borderRadius: 2, background: "#2563EB",
        }} />

        <h1 style={{
          fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 3px",
          fontFamily: "'Fraunces', serif", letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>batman</h1>

        <div style={{
          fontSize: 13, fontWeight: 600, color: "#2563EB", marginBottom: 2,
          letterSpacing: "0.005em",
        }}>Guardian of Metropolis</div>

        <div style={{
          fontSize: 11.5, color: "#94A3B8", fontWeight: 400,
          fontStyle: "italic", marginBottom: 10,
        }}>Fortress of Solitude</div>

        <p style={{
          fontSize: 12.5, color: "#475569", lineHeight: 1.7, margin: 0,
          maxWidth: 320, marginInline: "auto",
        }}>
          Stronger than a locomotive, faster than a speeding bullet, and always on call when Metropolis (or Earth) needs saving. Kindness first, heat vision second.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          CONTACT — Horizontal pill row
          ═══════════════════════════════════════════════════ */}
      <div style={{
        display: "flex", gap: 8, padding: "6px 12px 10px", overflowX: "auto",
      }}>
        {[
          { icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          ), label: "WhatsApp", value: "12026650100", bg: "#ECFDF5", color: "#059669", border: "#BBF7D0" },
          { icon: (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          ), label: "Email", value: "superman@dailyplanet.com", bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
          { icon: (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          ), label: "Phone", value: "12026650100", bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
        ].map((c, i) => (
          <div key={i} className="card-pill" style={{
            flex: 1, minWidth: 0, padding: "10px 10px",
            borderRadius: 14, background: c.bg,
            border: `1.5px solid ${c.border}`, cursor: "pointer",
            transition: "transform 0.15s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              {c.icon}
              <span style={{ fontSize: 9.5, fontWeight: 700, color: c.color, letterSpacing: "0.05em", textTransform: "uppercase" }}>{c.label}</span>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#1E293B",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Sections container */}
      <div style={{ margin: "4px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.02)" }}>

        {/* ═══ BUSINESS HOURS ═══ */}
        <Sec title="Business Hours" iconSvg="🕐">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 10px" }}>
            {[
              ["Mon", "08:00 – 15:00", true], ["Tue", "08:00 – 15:00", true],
              ["Wed", "08:00 – 15:00", true], ["Thu", "08:00 – 15:00", true],
              ["Fri", "08:00 – 15:00", true], ["Sat", "Closed", false],
              ["Sun", "Closed", false],
            ].map(([day, time, on]) => (
              <div key={day} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "5px 8px", borderRadius: 7,
                background: on ? "#F0FDF4" : "#FAFAFA",
              }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: on ? "#166534" : "#9CA3AF" }}>{day}</span>
                <span style={{ fontSize: 10.5, fontWeight: 500, color: on ? "#15803D" : "#D1D5DB", fontVariantNumeric: "tabular-nums" }}>{time}</span>
              </div>
            ))}
          </div>
        </Sec>

        {/* ═══ SHARE & CONNECT ═══ */}
        <Sec title="Share & Connect" iconSvg="🔗" topBorder>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Save Card", icon: "💾", bg: "linear-gradient(135deg,#2563EB,#3B82F6)" },
              { label: "Share Card", icon: "📤", bg: "linear-gradient(135deg,#7C3AED,#8B5CF6)" },
              { label: "Contact", icon: "📱", bg: "linear-gradient(135deg,#059669,#10B981)" },
              { label: "Homescreen", icon: "📌", bg: "linear-gradient(135deg,#0F172A,#334155)" },
            ].map((b, i) => (
              <button key={i}
                onPointerEnter={() => setHoverShare(i)}
                onPointerLeave={() => setHoverShare(null)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  padding: "11px 8px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: b.bg, color: "#fff", fontSize: 12, fontWeight: 700,
                  fontFamily: "'Outfit', sans-serif",
                  transform: hoverShare === i ? "translateY(-1px) scale(1.03)" : "none",
                  boxShadow: hoverShare === i ? "0 6px 20px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <span style={{ fontSize: 14 }}>{b.icon}</span>{b.label}
              </button>
            ))}
          </div>
        </Sec>

        {/* ═══ RATE SERVICE ═══ */}
        <Sec title="Rate Our Service" iconSvg="⭐" topBorder>
          <div style={{ display: "flex", gap: 8, marginBottom: rating ? 10 : 0 }}>
            {[
              { emoji: "😟", label: "Unhappy", val: "bad", c: "#EF4444", bg: "#FEF2F2", bc: "#FECACA" },
              { emoji: "😐", label: "Neutral", val: "meh", c: "#F97316", bg: "#FFF7ED", bc: "#FED7AA" },
              { emoji: "😊", label: "Happy", val: "good", c: "#22C55E", bg: "#F0FDF4", bc: "#BBF7D0" },
            ].map((r) => (
              <button key={r.val} onClick={() => setRating(r.val)} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "10px 6px", borderRadius: 12, cursor: "pointer",
                border: `2px solid ${rating === r.val ? r.c : "#E5E7EB"}`,
                background: rating === r.val ? r.bg : "#fff",
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                transform: rating === r.val ? "scale(1.05)" : "scale(1)",
              }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{r.emoji}</span>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: rating === r.val ? r.c : "#9CA3AF",
                }}>{r.label}</span>
              </button>
            ))}
          </div>
          {rating && (
            <>
              <textarea placeholder="Tell us more…" style={{
                width: "100%", padding: "10px 12px", borderRadius: 10,
                border: "1.5px solid #E5E7EB", fontSize: 12.5, fontFamily: "'Outfit', sans-serif",
                resize: "none", height: 56, outline: "none", background: "#FAFAFA",
                boxSizing: "border-box",
              }} />
              <button style={{
                width: "100%", padding: 11, borderRadius: 10, border: "none",
                background: "#2563EB", color: "#fff", fontSize: 12.5, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Outfit', sans-serif", marginTop: 6,
              }}>Submit Rating</button>
            </>
          )}
        </Sec>

        {/* ═══ APPOINTMENTS ═══ */}
        <Sec title="Request an Appointment" iconSvg="📅" topBorder>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Date</label>
            <input type="date" defaultValue="2026-02-24" style={{
              width: "100%", padding: "9px 12px", borderRadius: 10,
              border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "'Outfit', sans-serif",
              color: "#1E293B", outline: "none", background: "#FAFAFA",
              boxSizing: "border-box",
            }} />
          </div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Hour</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
            {shownAppts.map((t, i) => (
              <button key={i} onClick={() => setApptTime(i)} style={{
                padding: "8px 4px", borderRadius: 8,
                border: `1.5px solid ${apptTime === i ? "#2563EB" : "#E5E7EB"}`,
                background: apptTime === i ? "#EFF6FF" : "#fff",
                color: apptTime === i ? "#2563EB" : "#475569",
                fontSize: 11, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", transition: "all 0.15s",
                fontVariantNumeric: "tabular-nums",
              }}>{t}</button>
            ))}
          </div>
          {!moreTimes && (
            <button onClick={() => setMoreTimes(true)} style={{
              display: "block", width: "100%", padding: 5, border: "none",
              background: "none", color: "#2563EB", fontSize: 11.5, fontWeight: 600,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif", marginBottom: 6,
            }}>More times ({appts.length - 3}) ▾</button>
          )}
          <button style={{
            width: "100%", padding: 12, borderRadius: 10, border: "none",
            background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
            boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
          }}>Request an Appointment</button>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          SERVICES — Forced 2-col tiles with real images
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "8px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.02)" }}>
        <Sec title="Our Services" iconSvg="⚡">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { title: "Metropolis City Watch", desc: "Rapid aerial response, crisis containment, and polite roof landings." },
              { title: "Disaster Relief & Rescue", desc: "From collapsing bridges to volcanic grumbles—calm coordination." },
              { title: "Satellite & Orbital Support", desc: "Gentle satellite repositioning, debris cleanup, and space-tows." },
              { title: "Heroic Readiness Training", desc: "Community workshops on emergency readiness and ethical power use." },
            ].map((svc, i) => (
              <div key={i} className="svc-tile" style={{
                borderRadius: 14, overflow: "hidden",
                border: "1px solid #E5E7EB", cursor: "pointer",
                transition: "transform 0.15s",
              }}>
                {/* Image with overlay title */}
                <div style={{
                  height: 80, position: "relative", overflow: "hidden",
                }}>
                  <img src={SVC_IMGS[i]} alt="" style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 60%)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 6, left: 8, right: 8,
                    fontSize: 11, fontWeight: 700, color: "#fff",
                    fontFamily: "'Fraunces', serif", lineHeight: 1.25,
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  }}>{svc.title}</div>
                </div>
                {/* Description + CTA */}
                <div style={{ padding: "8px 9px 10px" }}>
                  <div style={{
                    fontSize: 10.5, color: "#64748B", lineHeight: 1.5,
                    marginBottom: 8,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{svc.desc}</div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 11, fontWeight: 700, color: "#2563EB",
                  }}>
                    Read more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS — Forced 2-col with real photos
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "8px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.02)" }}>
        <Sec title="Testimonials" iconSvg="💬">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { name: "Lois Lane", text: "Unfailingly reliable and impossibly kind. Also an excellent interview—when he's not saving the day.", stars: 5 },
              { name: "Batman", text: "Efficient. Trustworthy. Overpowered, but responsible about it.", stars: 5 },
            ].map((t, i) => (
              <div key={i} style={{
                padding: "12px 10px", borderRadius: 14,
                background: i === 0 ? "#FAFBFF" : "#FAFAFA",
                border: "1px solid #EDEDF0",
                position: "relative",
              }}>
                {/* Quote mark */}
                <div style={{
                  position: "absolute", top: 4, right: 8,
                  fontSize: 32, fontFamily: "Georgia, serif",
                  color: "#E8EDFF", lineHeight: 1, fontWeight: 700,
                }}>"</div>

                <div style={{
                  width: 36, height: 36, borderRadius: "50%", marginBottom: 6,
                  overflow: "hidden", border: "2px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>
                  <img src={TEST_IMGS[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                <div style={{ marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#64748B" }}>{t.stars}/5</span>
                </div>
                <Stars n={t.stars} />

                <div style={{
                  fontSize: 10.5, color: "#475569", lineHeight: 1.55,
                  marginTop: 6, marginBottom: 6,
                }}>{t.text}</div>

                <div style={{
                  fontSize: 11, fontWeight: 700, color: "#0F172A",
                }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          SOCIAL — Icon circles row
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "8px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
        <Sec title="Social" iconSvg="🌐">
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            {[
              { label: "Web", color: "#2563EB", bg: "#EFF6FF", icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              )},
              { label: "X", color: "#0F172A", bg: "#F1F5F9", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F172A"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              )},
              { label: "Insta", color: "#E4405F", bg: "#FFF1F2", icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#E4405F" stroke="none"/></svg>
              )},
              { label: "TG", color: "#0088CC", bg: "#E0F2FE", icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#0088CC"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              )},
            ].map((s, i) => (
              <button key={i} style={{
                width: 48, height: 48, borderRadius: "50%",
                background: s.bg, border: `1.5px solid ${s.color}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "transform 0.2s",
              }}>{s.icon}</button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          GOOGLE MAP
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "8px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
        <Sec title="Find Us" iconSvg="📍" noPad>
          <div style={{ margin: "0 16px 14px", borderRadius: 14, overflow: "hidden", height: 170, border: "1px solid #E5E7EB" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.502320959!2d-87.89668624561754!3d41.83384858178919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sza!4v1765441428500!5m2!1sen!2sza"
              width="100%" height="100%" style={{ border: 0, display: "block" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          CUSTOM HTML — Placeholder
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "8px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
        <Sec title="Featured Content" iconSvg="📺" open={false}>
          <div style={{
            borderRadius: 14, overflow: "hidden", border: "1px solid #E5E7EB",
            background: "#FAFAFA", padding: "20px 16px", textAlign: "center",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: "#EFF6FF",
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 8,
              fontSize: 20,
            }}>▶️</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 3 }}>Embedded Content</div>
            <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.5 }}>
              LinkedIn posts, finance applications, or custom embeds render here.
            </div>
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          GALLERY — Main image + horizontal thumb scroll
          ═══════════════════════════════════════════════════ */}
      <div style={{ margin: "8px 12px 0", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
        <Sec title="Gallery" iconSvg="🖼️">
          {/* Main image viewer */}
          <div style={{
            height: 190, borderRadius: 14, marginBottom: 8,
            overflow: "hidden", position: "relative",
            background: "#111", border: "1px solid #E5E7EB",
          }}>
            <img src={GALLERY_IMGS[galIdx]} alt="" style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transition: "opacity 0.3s",
            }} />
            {/* Nav arrows */}
            <button onClick={() => setGalIdx(Math.max(0, galIdx - 1))} style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galIdx === 0 ? 0.3 : 1,
            }}>‹</button>
            <button onClick={() => setGalIdx(Math.min(GALLERY_IMGS.length - 1, galIdx + 1))} style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galIdx === GALLERY_IMGS.length - 1 ? 0.3 : 1,
            }}>›</button>
            {/* Counter pill */}
            <div style={{
              position: "absolute", bottom: 8, right: 10,
              padding: "3px 10px", borderRadius: 10,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
              color: "#fff", fontSize: 10, fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}>{galIdx + 1} / {GALLERY_IMGS.length}</div>
          </div>
          {/* Thumbnails horizontal scroll */}
          <div className="gal-scroll" style={{
            display: "flex", gap: 6, overflowX: "auto",
            paddingBottom: 2, scrollbarWidth: "none",
          }}>
            {GALLERY_IMGS.map((img, i) => (
              <button key={i} onClick={() => setGalIdx(i)} style={{
                width: 54, height: 54, borderRadius: 10, flexShrink: 0,
                overflow: "hidden", cursor: "pointer", padding: 0,
                border: galIdx === i ? "2.5px solid #2563EB" : "2px solid #E5E7EB",
                opacity: galIdx === i ? 1 : 0.55,
                transition: "all 0.2s",
                background: "none",
              }}>
                <img src={img} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                }} />
              </button>
            ))}
          </div>
        </Sec>
      </div>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════ */}
      <div style={{
        margin: "8px 12px 0", borderRadius: "18px 18px 0 0", overflow: "hidden",
        background: "#0F172A", padding: "22px 16px 36px", textAlign: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: "linear-gradient(135deg,#2563EB,#60A5FA)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>P</span>
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>Personalyz</span>
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginBottom: 8 }}>
          Create your own digital card at personalyz.me
        </div>
        <div style={{
          display: "inline-block", padding: "5px 14px", borderRadius: 8,
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>
            cards.personalyz.me/ToyotaKenya/batman
          </span>
        </div>
      </div>
    </div>
  );
}
