import { useState, useEffect } from "react";

/* ============================================================================
   NewSurveys — Survey Editor
   Pixel-faithful rebuild of CardDesigns/NewSurveys/newsurveys.mp4

   A three-tab survey builder on a warm cream canvas with an emerald accent:
     • Survey Details  — Details / Custom HTML sub-tabs
     • Questions       — sortable Multiple-Choice & Answer-Block sections
     • Results         — live participation + per-question breakdown

   Self-contained: inline styles, no external UI deps. Default export renders
   the full editor surface (the screen recording is cropped to this panel).
   ========================================================================== */

// ─── Fonts ───────────────────────────────────────────────────────────────────
function useFontLoader() {
  useEffect(() => {
    const id = "newsurveys-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?" +
      "family=Inter:wght@400;450;500;600;700" +
      "&family=Inter+Tight:wght@500;600;650;700" +
      "&display=swap";
    document.head.appendChild(link);
  }, []);
}

const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const FD = "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const MONO = "'SFMono-Regular', ui-monospace, 'Cascadia Mono', Menlo, Consolas, monospace";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  page:        "#F4F2EC",
  bar:         "#F8F6F1",
  surface:     "#FBFAF6",
  border:      "#E9E5DB",
  borderSoft:  "#EFEBE2",
  input:       "#EFEBE3",
  inputBorder: "#E6E1D5",

  text:  "#211F1A",
  text2: "#6E695C",
  text3: "#9A9385",

  green:      "#1C9E4B",  // solid accent — button / toggle-on
  greenHover: "#178A41",
  greenText:  "#1C7C42",  // green text — active tab, links
  greenSoft:  "#DCEBD9",
  greenSoftBd:"#C6DCC2",

  amber:     "#B47A0A",
  amberSoft: "#FAEFDC",
  amberSoftBd:"#EFDFC0",

  blueText:  "#5C7BA0",
  blueSoft:  "#E9F2FD",
  blueSoftBd:"#D5E5F6",

  slate:     "#5E6B7E",
  slateSoft: "#E4E9F0",
  slateSoftBd:"#D5DCE6",

  graySoft:  "#F0ECE4",
  graySoftBd:"#E2DCD0",

  purple:    "#7C5BD6",
  purpleSoft:"#F1ECFB",

  danger:    "#C0492E",
  track:     "#EBE7DD",
};

const R = { sm: 7, md: 9, lg: 12, xl: 14, full: 9999 };

// ─── Icons ────────────────────────────────────────────────────────────────────
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75, style = {} }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color, strokeWidth,
    strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block", flexShrink: 0, ...style },
  };
  switch (name) {
    case "gear":   return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
    case "code":   return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "image":  return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5L5 21"/></svg>;
    case "x":      return <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "plus":   return <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "chevDown": return <svg {...p}><polyline points="6 9 12 15 18 9"/></svg>;
    case "chevUp":   return <svg {...p}><polyline points="18 15 12 9 6 15"/></svg>;
    case "copy":   return <svg {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
    case "share":  return <svg {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>;
    case "eye":    return <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "trash":  return <svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>;
    case "refresh":return <svg {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>;
    case "clock":  return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>;
    case "zap":    return <svg {...p} style={{ ...p.style, fill: color, stroke: "none" }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
    case "users":  return <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case "fileText": return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>;
    case "sparkle":return <svg {...p}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/></svg>;
    case "drag":   return <svg {...p} style={{ ...p.style, fill: color, stroke: "none" }}><circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/></svg>;
    default: return null;
  }
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange?.(!on)}
      style={{
        width: 42, height: 24, borderRadius: R.full, border: "none", padding: 0,
        cursor: "pointer", position: "relative", flexShrink: 0,
        background: on ? C.green : "#D8D2C6",
        transition: "background 0.18s",
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: on ? 21 : 3,
        width: 18, height: 18, borderRadius: R.full, background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.28)", transition: "left 0.18s",
      }} />
    </button>
  );
}

const BADGE = {
  mc:       { bg: C.slateSoft, bd: C.slateSoftBd, fg: C.slate },
  answer:   { bg: C.blueSoft,  bd: C.blueSoftBd,  fg: C.blueText },
  paged:    { bg: C.greenSoft, bd: C.greenSoftBd, fg: C.greenText },
  disabled: { bg: C.slateSoft, bd: C.slateSoftBd, fg: C.slate },
  complete: { bg: C.greenSoft, bd: C.greenSoftBd, fg: C.greenText },
  progress: { bg: C.amberSoft, bd: C.amberSoftBd, fg: C.amber },
  notstart: { bg: C.blueSoft,  bd: C.blueSoftBd,  fg: C.blueText },
};
function Badge({ variant = "mc", children }) {
  const b = BADGE[variant] || BADGE.mc;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 9px", borderRadius: R.full,
      background: b.bg, border: `1px solid ${b.bd}`, color: b.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: "-0.01em",
      fontFamily: F, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: R.lg, padding: 22, marginBottom: 16,
      boxShadow: "0 1px 2px rgba(30,26,18,0.03)", ...style,
    }}>{children}</div>
  );
}

function FieldLabel({ children, style = {} }) {
  return <div style={{ fontSize: 12.5, fontWeight: 500, color: C.text2, marginBottom: 7, fontFamily: F, ...style }}>{children}</div>;
}

function TextField({ value, placeholder, mono = false, style = {} }) {
  const [v, setV] = useState(value ?? "");
  return (
    <input
      value={v} placeholder={placeholder} onChange={e => setV(e.target.value)}
      style={{
        width: "100%", height: 46, padding: "0 14px", boxSizing: "border-box",
        fontSize: 15, fontFamily: mono ? MONO : F, fontWeight: 400, color: C.text,
        background: C.input, border: `1px solid ${C.inputBorder}`,
        borderRadius: R.md, outline: "none", ...style,
      }}
    />
  );
}

function TextArea({ value, placeholder, rows = 3, style = {} }) {
  const [v, setV] = useState(value ?? "");
  return (
    <textarea
      value={v} placeholder={placeholder} rows={rows} onChange={e => setV(e.target.value)}
      style={{
        width: "100%", padding: "12px 14px", boxSizing: "border-box",
        fontSize: 15, fontFamily: F, fontWeight: 400, color: C.text, lineHeight: 1.55,
        background: C.input, border: `1px solid ${C.inputBorder}`,
        borderRadius: R.md, outline: "none", resize: "vertical", ...style,
      }}
    />
  );
}

// Small ghost / text buttons used throughout
function GhostBtn({ icon, children, onClick, style = {}, color = C.text, iconColor }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        height: 44, padding: "0 16px", borderRadius: R.md,
        background: h ? C.graySoft : C.surface, border: `1px solid ${C.border}`,
        cursor: "pointer", fontFamily: F, fontSize: 14.5, fontWeight: 500, color,
        transition: "background 0.13s", ...style,
      }}
    >
      {icon && <Icon name={icon} size={16} color={iconColor || color} />}
      {children}
    </button>
  );
}

function TextBtn({ icon, children, color = C.text2, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, background: "none",
        border: "none", cursor: "pointer", fontFamily: F, fontSize: 13.5,
        fontWeight: 500, color, opacity: h ? 0.75 : 1, padding: 0,
      }}
    >
      {icon && <Icon name={icon} size={15} color={color} />}
      {children}
    </button>
  );
}

// ─── Top tab bar ──────────────────────────────────────────────────────────────
const TABS = [
  { id: "details", label: "Survey Details" },
  { id: "questions", label: "Questions" },
  { id: "results", label: "Results" },
];
function TopTabs({ active, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4,
      height: 46, padding: "0 16px", background: C.bar,
      borderBottom: `1px solid ${C.border}`,
    }}>
      {TABS.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            padding: "6px 14px", borderRadius: R.full, border: "none", cursor: "pointer",
            background: on ? "#EBE7DE" : "transparent",
            color: on ? C.text : C.text2,
            fontFamily: F, fontSize: 14, fontWeight: on ? 600 : 500,
            letterSpacing: "-0.01em", transition: "background 0.13s, color 0.13s",
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}

// ─── Sub-tabs (Details / Custom HTML) ─────────────────────────────────────────
function SubTab({ icon, label, on, onClick }) {
  const [h, setH] = useState(false);
  const col = on ? C.greenText : (h ? C.text : C.text2);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, background: "none",
        border: "none", cursor: "pointer", fontFamily: F, fontSize: 15,
        fontWeight: on ? 600 : 500, color: col, padding: "0 2px 12px",
        borderBottom: `2px solid ${on ? C.greenText : "transparent"}`,
        marginBottom: -1,
      }}>
      <Icon name={icon} size={17} color={col} />
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TAB 1 — SURVEY DETAILS
// ═══════════════════════════════════════════════════════════════════════════════
function DetailsTab() {
  const [sub, setSub] = useState("details");
  const [overlay, setOverlay] = useState(true);
  const [paged, setPaged] = useState(true);
  const [customOn, setCustomOn] = useState(false);

  return (
    <div>
      {/* sub-tab bar */}
      <div style={{ display: "flex", gap: 26, borderBottom: `1px solid ${C.border}`, marginBottom: 26 }}>
        <SubTab icon="gear" label="Details" on={sub === "details"} onClick={() => setSub("details")} />
        <SubTab icon="code" label="Custom HTML" on={sub === "custom"} onClick={() => setSub("custom")} />
      </div>

      {sub === "details" ? (
        <>
          {/* Path + name */}
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <FieldLabel>Path <span style={{ color: C.text3, fontWeight: 400 }}>optional</span></FieldLabel>
                <TextField value="demo" />
              </div>
              <div>
                <FieldLabel>Survey name</FieldLabel>
                <TextField value="travelpreference" />
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: C.text2, lineHeight: 1.7 }}>
              <div>Letters, numbers and hyphens only — used in the URL.</div>
              <div style={{ letterSpacing: "0.04em" }}>
                <span style={{ fontWeight: 600, color: C.text2, fontSize: 12 }}>PREVIEW</span>{" "}
                <span style={{ color: C.greenText }}>http://survey.localhost:4281/</span>{" "}
                <span style={{ color: C.text3 }}>demo</span>{" "}
                <span style={{ color: C.greenText }}>travelpreference</span>
              </div>
            </div>
          </Card>

          {/* Title + description */}
          <Card>
            <FieldLabel>Survey Title</FieldLabel>
            <TextField value="Travel Preferences Survey" style={{ marginBottom: 18 }} />
            <FieldLabel>Description</FieldLabel>
            <TextArea value="Help us create better travel experiences tailored just for you." rows={3} />
          </Card>

          {/* Survey image */}
          <Card>
            <FieldLabel style={{ marginBottom: 12 }}>Survey Image</FieldLabel>
            <div style={{
              position: "relative", height: 236, borderRadius: R.md, overflow: "hidden",
              background: "linear-gradient(105deg, #2E3A46 0%, #6E5A48 30%, #C98B4A 55%, #F0B25E 72%, #FBE39B 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* faux sun glow */}
              <div style={{ position: "absolute", right: "18%", top: "22%", width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,250,220,0.95) 0%, rgba(255,220,150,0.2) 60%, transparent 70%)" }} />
              <div style={{
                padding: "8px 18px", borderRadius: R.full, background: "rgba(20,16,12,0.55)",
                color: "#fff", fontSize: 14, fontWeight: 500, backdropFilter: "blur(2px)",
              }}>Drag to reposition</div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
              <GhostBtn icon="image" style={{ flex: 1 }}>Change Image</GhostBtn>
              <GhostBtn icon="x" color={C.text2} style={{ background: "transparent", border: "none" }}>Remove image</GhostBtn>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: C.text2 }}>
              Recommended: 800×400px · JPG/PNG · Max 2MB · Drag the crop window to reposition.
            </div>
          </Card>

          {/* Toggles */}
          <Card style={{ padding: "6px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: `1px solid ${C.borderSoft}` }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 3 }}>Image overlay</div>
                <div style={{ fontSize: 13.5, color: C.text2 }}>Colour tint applied over the banner image</div>
              </div>
              <Toggle on={overlay} onChange={setOverlay} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 3 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Paged view</span>
                  <Badge variant="paged">Paged</Badge>
                </div>
                <div style={{ fontSize: 13.5, color: C.text2 }}>Show one question at a time with Next / Back navigation</div>
              </div>
              <Toggle on={paged} onChange={setPaged} />
            </div>
          </Card>
        </>
      ) : (
        // Custom HTML sub-tab
        <Card>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Enable Custom HTML</span>
                <Badge variant="disabled">Disabled</Badge>
              </div>
              <div style={{ fontSize: 14, color: C.text2 }}>Inject custom markup into the survey card</div>
            </div>
            <Toggle on={customOn} onChange={setCustomOn} />
          </div>
          <FieldLabel>Custom HTML</FieldLabel>
          <TextArea
            mono
            rows={8}
            value={'<div class="banner">\n  <h2>Welcome!</h2>\n</div>'}
            style={{ fontFamily: MONO, fontSize: 13.5, color: C.text3, lineHeight: 1.7 }}
          />
          <div style={{ marginTop: 14, fontSize: 13.5, color: C.text2 }}>
            Raw HTML is rendered as-is on the card.{" "}
            <span style={{ color: C.greenText, fontWeight: 500 }}>Sanitize on the backend before saving</span>{" "}
            to avoid unsafe scripts.
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TAB 2 — QUESTIONS
// ═══════════════════════════════════════════════════════════════════════════════
const SECTIONS = [
  { n: 1, type: "mc", q: "What type of vacation do you prefer?", helper: "e.g. Select all that apply.", allowMultiple: true, options: ["Beach", "Mountains", "City", "Cruise"] },
  { n: 2, type: "mc", q: "Who do you usually travel with?", helper: "e.g. Select all that apply.", allowMultiple: true, options: ["Family", "Friends", "Partner", "Solo"] },
  { n: 3, type: "mc", q: "Which activities do you enjoy?", helper: "e.g. Select all that apply.", allowMultiple: true, options: ["Sightseeing", "Food Tours", "Hiking", "Museums", "Shopping"] },
  { n: 4, type: "mc", q: "How many vacations do you take each year?", helper: "", allowMultiple: false, options: ["1", "2-3", "4-5", "6+"] },
  { n: 5, type: "mc", q: "What's most important when booking accommodation?", helper: "", allowMultiple: false, options: ["Price", "Location", "Amenities", "Reviews"] },
  { n: 6, type: "answer", q: "What could we improve?", helper: "Extra guidance for the respondent...", multiline: true },
];

function OptionRow({ label, multiple }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      height: 48, padding: "0 14px", marginBottom: 8,
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.md,
    }}>
      <Icon name="drag" size={16} color={C.text3} />
      <span style={{
        width: 18, height: 18, flexShrink: 0,
        borderRadius: multiple ? 4 : R.full,
        border: `1.5px solid ${C.inputBorder}`, background: "#fff",
      }} />
      <span style={{ flex: 1, fontSize: 15, color: C.text }}>{label}</span>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0 }}>
        <Icon name="x" size={16} color={C.text3} />
      </button>
    </div>
  );
}

function SectionRow({ s, expanded, onToggle }) {
  const isAnswer = s.type === "answer";
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.lg,
      marginBottom: 12, boxShadow: "0 1px 2px rgba(30,26,18,0.03)", overflow: "hidden",
    }}>
      {/* header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 16px", height: 60 }}>
        <Icon name="drag" size={17} color={C.text3} />
        <span style={{ fontSize: 15, fontWeight: 700, color: C.green, width: 14, textAlign: "center" }}>{s.n}</span>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: C.text }}>{s.q}</span>
        <Badge variant={isAnswer ? "answer" : "mc"}>{isAnswer ? "Answer Block" : "Multiple Choice"}</Badge>
        {!isAnswer && <span style={{ fontSize: 13, color: C.text2, whiteSpace: "nowrap" }}>{s.options.length} options</span>}
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 4 }}>
          <IconBtn name="chevUp" />
          <IconBtn name="chevDown" />
          <IconBtn name={expanded ? "chevUp" : "chevDown"} onClick={onToggle} />
        </div>
      </div>

      {/* expanded body */}
      {expanded && (
        <div style={{ padding: "4px 20px 22px", borderTop: `1px solid ${C.borderSoft}` }}>
          {isAnswer ? (
            <AnswerBlockBody s={s} />
          ) : (
            <MultipleChoiceBody s={s} />
          )}
        </div>
      )}
    </div>
  );
}

function IconBtn({ name, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: R.sm, border: "none", cursor: "pointer",
        background: h ? C.graySoft : "transparent",
      }}>
      <Icon name={name} size={16} color={C.text2} />
    </button>
  );
}

function EditorMeta() {
  return (
    <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase" }} />
  );
}

function FooterRow() {
  const [req, setReq] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, paddingTop: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Toggle on={req} onChange={setReq} />
        <span style={{ fontSize: 14.5, color: C.text }}>Required</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <TextBtn icon="copy" color={C.text2}>Duplicate</TextBtn>
        <TextBtn icon="trash" color={C.danger}>Delete</TextBtn>
      </div>
    </div>
  );
}

function MultipleChoiceBody({ s }) {
  const [multiple, setMultiple] = useState(s.allowMultiple);
  return (
    <div style={{ paddingTop: 18 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", marginBottom: 8 }}>Question</div>
      <TextField value={s.q} style={{ marginBottom: 18 }} />

      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", marginBottom: 8 }}>
        Helper Text <span style={{ textTransform: "none", fontWeight: 400, letterSpacing: 0, color: C.text3 }}>(optional)</span>
      </div>
      <TextField value={s.helper} placeholder="e.g. Select all that apply." style={{ marginBottom: 20 }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase" }}>Answers</span>
          <span style={{ fontSize: 12.5, color: C.amber }}>0 correct</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Toggle on={multiple} onChange={setMultiple} />
          <span style={{ fontSize: 14, color: C.text }}>Allow multiple</span>
        </div>
      </div>
      <div style={{ fontSize: 12.5, fontStyle: "italic", color: C.text2, marginBottom: 16 }}>
        Tap the {multiple ? "checkbox" : "circle"} to flag an answer as correct. Correct answers drive real-time progress scoring on the backend.
      </div>

      {s.options.map(o => <OptionRow key={o} label={o} multiple={multiple} />)}

      <button style={{
        display: "inline-flex", alignItems: "center", gap: 7, marginTop: 2,
        height: 40, padding: "0 14px", borderRadius: R.md,
        background: C.surface, border: `1px solid ${C.greenSoftBd}`, cursor: "pointer",
        fontFamily: F, fontSize: 14, fontWeight: 600, color: C.greenText,
      }}>
        <Icon name="plus" size={15} color={C.greenText} /> Add Option
      </button>

      <div style={{ borderTop: `1px solid ${C.borderSoft}`, marginTop: 18 }} />
      <FooterRow />
    </div>
  );
}

function AnswerBlockBody({ s }) {
  const [multiline, setMultiline] = useState(true);
  return (
    <div style={{ paddingTop: 18 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", marginBottom: 8 }}>Prompt / Question</div>
      <TextField value={s.q} style={{ marginBottom: 18 }} />

      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", marginBottom: 8 }}>
        Helper Text <span style={{ textTransform: "none", fontWeight: 400, letterSpacing: 0, color: C.text3 }}>(optional)</span>
      </div>
      <TextField value={s.helper} style={{ marginBottom: 20 }} />

      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", marginBottom: 10 }}>Respondent's Answer Field</div>
      <div style={{ border: `1px dashed ${C.inputBorder}`, borderRadius: R.md, padding: 16, background: "rgba(239,235,227,0.35)" }}>
        <div style={{
          height: 80, borderRadius: R.sm, border: `1px solid ${C.borderSoft}`, background: C.surface,
          padding: "12px 14px", fontSize: 15, color: C.text3,
        }}>Type your answer here...</div>
        <div style={{ marginTop: 12, fontSize: 12.5, color: C.amber }}>
          Preview only — respondents fill this in on the live card.
        </div>
      </div>

      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", margin: "20px 0 8px" }}>Placeholder Text</div>
      <TextField value="Type your answer here..." style={{ marginBottom: 16 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Toggle on={multiline} onChange={setMultiline} />
        <span style={{ fontSize: 14.5, color: C.text }}>Multi-line answer</span>
      </div>

      <div style={{ borderTop: `1px solid ${C.borderSoft}`, marginTop: 18 }} />
      <FooterRow />
    </div>
  );
}

function AddSectionMenu({ open }) {
  if (!open) return null;
  const items = [
    { icon: "sparkle", title: "Multiple Choice", desc: "A question with selectable options.", sel: true, iconWrap: null },
    { icon: "fileText", title: "Answer Block", desc: "A prompt with an open text field.", sel: false },
  ];
  return (
    <div style={{
      position: "absolute", top: 48, right: 0, width: 300, zIndex: 20,
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.lg,
      boxShadow: "0 12px 30px rgba(30,26,18,0.14)", overflow: "hidden",
    }}>
      <div style={{ padding: "12px 16px 8px", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text2, textTransform: "uppercase", borderBottom: `1px solid ${C.borderSoft}` }}>
        Choose a section type
      </div>
      {items.map(it => (
        <div key={it.title} style={{ display: "flex", gap: 12, padding: "12px 16px", cursor: "pointer" }}>
          {it.sel ? (
            <span style={{ width: 20, height: 20, borderRadius: R.full, border: `5px solid ${C.green}`, background: "#fff", flexShrink: 0, marginTop: 1 }} />
          ) : (
            <span style={{ width: 20, height: 20, borderRadius: 5, background: C.amberSoft, border: `1px solid ${C.amberSoftBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Icon name="fileText" size={12} color={C.amber} />
            </span>
          )}
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: C.text }}>{it.title}</div>
            <div style={{ fontSize: 13, color: C.text2, marginTop: 1 }}>{it.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuestionsTab() {
  const [expanded, setExpanded] = useState(null);
  const [menu, setMenu] = useState(false);
  const [addHover, setAddHover] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, fontFamily: FD, color: C.text, letterSpacing: "-0.025em" }}>Survey Sections</h2>
          <div style={{ marginTop: 6, fontSize: 14, color: C.text2 }}>
            6 sections · <span style={{ color: C.greenText, fontWeight: 500 }}>5 multiple choice</span> · <span style={{ color: C.amber, fontWeight: 500 }}>1 answer blocks</span>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenu(m => !m)}
            onMouseEnter={() => setAddHover(true)} onMouseLeave={() => setAddHover(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px",
              borderRadius: R.md, border: "none", cursor: "pointer",
              background: addHover ? C.greenHover : C.green, color: "#fff",
              fontFamily: F, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em",
              boxShadow: "0 2px 8px rgba(28,158,75,0.28)", transition: "background 0.13s",
            }}>
            <Icon name="plus" size={17} color="#fff" /> Add Section
          </button>
          <AddSectionMenu open={menu} />
        </div>
      </div>

      {SECTIONS.map(s => (
        <SectionRow key={s.n} s={s} expanded={expanded === s.n} onToggle={() => setExpanded(e => e === s.n ? null : s.n)} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TAB 3 — RESULTS
// ═══════════════════════════════════════════════════════════════════════════════
const STATS = [
  { n: 3, label: "Complete",    bg: C.greenSoft, bd: C.greenSoftBd, fg: C.greenText },
  { n: 1, label: "In Progress", bg: C.amberSoft, bd: C.amberSoftBd, fg: C.amber },
  { n: 2, label: "Not Started", bg: C.blueSoft,  bd: C.blueSoftBd,  fg: C.blueText },
  { n: 2, label: "Registered",  bg: C.graySoft,  bd: C.graySoftBd,  fg: C.text2 },
];

const BREAKDOWN = [
  { n: 1, q: "What type of vacation do you prefer?",            answered: 2, pct: 100, status: "complete" },
  { n: 2, q: "Who do you usually travel with?",                 answered: 2, pct: 100, status: "complete" },
  { n: 3, q: "Which activities do you enjoy?",                  answered: 2, pct: 100, status: "complete" },
  { n: 4, q: "How many vacations do you take each year?",       answered: 1, pct: 50,  status: "progress" },
  { n: 5, q: "What's most important when booking accommodation?", answered: 0, pct: 0, status: "notstart" },
  { n: 6, q: "What could we improve?",                          answered: 0, pct: 0,  status: "notstart" },
];

function Ring({ pct, status }) {
  const stroke = status === "complete" ? C.green : status === "progress" ? C.amber : "#C9C2B4";
  const r = 20, cx = 24, cy = 24, circ = 2 * Math.PI * r;
  const off = circ * (1 - pct / 100);
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: "block", flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.track} strokeWidth="4" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy + 3.5} textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="700" fill={stroke}>{pct}%</text>
    </svg>
  );
}

function BreakdownCard({ item }) {
  const accent = item.status === "complete" ? C.green : item.status === "progress" ? C.amber : "#B9C6D8";
  const pctColor = item.status === "complete" ? C.greenText : item.status === "progress" ? C.amber : C.blueText;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      background: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${accent}`,
      borderRadius: R.md, padding: "18px 20px", marginBottom: 14,
    }}>
      <Ring pct={item.pct} status={item.status} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: C.text }}>
          <span style={{ color: C.text2, marginRight: 8 }}>{item.n}</span>{item.q}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <span style={{ fontSize: 13.5, color: C.text2 }}>{item.answered} / 2 answered ({item.pct}%)</span>
          <Badge variant={item.status}>
            {item.status === "complete" ? "Complete" : item.status === "progress" ? "In Progress" : "Not Started"}
          </Badge>
        </div>
        <div style={{ marginTop: 12 }}>
          <GhostBtn icon="eye" color={C.text2} iconColor={C.text2} style={{ height: 34, padding: "0 12px", fontSize: 13.5 }}>Reveal answers</GhostBtn>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: FD, color: pctColor, letterSpacing: "-0.02em" }}>{item.pct}%</div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase", marginTop: 2 }}>Participation</div>
      </div>
    </div>
  );
}

function Participant({ initial, name, pct }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 4px" }}>
      <span style={{ width: 30, height: 30, borderRadius: R.full, background: C.graySoft, border: `1px solid ${C.graySoftBd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600, color: C.text2, flexShrink: 0 }}>{initial}</span>
      <span style={{ flex: 1, fontSize: 14.5, color: C.text }}>{name}</span>
      <div style={{ width: 120, height: 6, borderRadius: R.full, background: C.track, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: C.amber, borderRadius: R.full }} />
      </div>
      <Badge variant="progress">Started</Badge>
    </div>
  );
}

function ResultsTab() {
  const [showParticipants, setShowParticipants] = useState(true);

  return (
    <div>
      {/* toolbar */}
      <Card style={{ padding: "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <GhostBtn icon="refresh" color={C.text} style={{ height: 38, padding: "0 14px", fontSize: 14 }}>Refresh</GhostBtn>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", color: C.text2, textTransform: "uppercase" }}>Auto-refresh</span>
          <div style={{ position: "relative" }}>
            <select style={{
              appearance: "none", height: 38, padding: "0 34px 0 12px", borderRadius: R.md,
              background: C.input, border: `1px solid ${C.inputBorder}`, color: C.text,
              fontFamily: F, fontSize: 14, cursor: "pointer",
            }}>
              <option>Off</option><option>10s</option><option>30s</option><option>60s</option>
            </select>
            <Icon name="chevDown" size={15} color={C.text2} style={{ position: "absolute", right: 12, top: 12, pointerEvents: "none" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: C.text2 }}>
          <Icon name="clock" size={15} color={C.text2} />
          Last refreshed: <span style={{ color: C.greenText, fontWeight: 500 }}>just now</span>
        </div>
      </Card>

      {/* stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
        {STATS.map(s => (
          <div key={s.label} style={{
            background: s.bg, border: `1px solid ${s.bd}`, borderRadius: R.lg,
            padding: "20px 0", textAlign: "center",
          }}>
            <div style={{ fontSize: 30, fontWeight: 700, fontFamily: FD, color: s.fg, letterSpacing: "-0.03em" }}>{s.n}</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", color: s.fg, textTransform: "uppercase", marginTop: 4, opacity: 0.9 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* sessions */}
      <Card style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text2, textTransform: "uppercase" }}>Sessions</span>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, flex: 1, height: 40, padding: "0 12px",
          background: C.input, border: `1px solid ${C.inputBorder}`, borderRadius: R.md, minWidth: 0,
        }}>
          <span style={{ fontSize: 14, color: C.text, whiteSpace: "nowrap" }}>Morning test — 12 Jul 2026, 07</span>
          <span style={{ fontSize: 12.5, fontFamily: MONO, color: C.text3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>http://survey.localhost:4281/demo/travelpref…</span>
        </div>
        <GhostBtn icon="copy" color={C.text} style={{ height: 40, padding: "0 14px", fontSize: 13.5 }}>Copy URL</GhostBtn>
        <GhostBtn icon="share" color={C.text} style={{ height: 40, padding: "0 14px", fontSize: 13.5 }}>Share</GhostBtn>
      </Card>

      {/* live participation */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Icon name="zap" size={17} color={C.amber} />
            <span style={{ fontSize: 16, fontWeight: 600, color: C.text }}>Live Participation</span>
            <span style={{ fontSize: 13.5, color: C.text2 }}>2 of 2 active</span>
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, fontFamily: FD, color: C.text, letterSpacing: "-0.02em" }}>50%</span>
        </div>
        <div style={{ height: 10, borderRadius: R.full, background: C.track, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: "50%", height: "100%", background: `linear-gradient(90deg, ${C.green} 0%, ${C.amber} 100%)`, borderRadius: R.full }} />
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: C.text2 }}>
          <LegendDot color={C.green} label="Complete 0" />
          <LegendDot color={C.amber} label="Started 2" />
          <LegendDot color="#B9C6D8" label="Not started 0" />
        </div>
      </Card>

      {/* participants */}
      <Card style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Icon name="users" size={16} color={C.text2} />
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text2, textTransform: "uppercase" }}>Participants</span>
            <span style={{ fontSize: 13.5, color: C.text2 }}>— 2 started, 3 complete</span>
          </div>
          <button onClick={() => setShowParticipants(v => !v)} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 13.5, fontWeight: 500, color: C.text2 }}>
            Show <Icon name={showParticipants ? "chevUp" : "chevDown"} size={15} color={C.text2} />
          </button>
        </div>
        {showParticipants && (
          <div style={{ marginTop: 10, borderTop: `1px solid ${C.borderSoft}`, paddingTop: 6 }}>
            <Participant initial="A" name="Alice Johnson" pct={62} />
            <Participant initial="B" name="Bob Smith" pct={38} />
          </div>
        )}
      </Card>

      {/* question breakdown */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "24px 2px 14px" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text2, textTransform: "uppercase" }}>Question Breakdown</span>
        <span style={{ fontSize: 13.5, color: C.text2 }}>3 of 6 <span style={{ color: C.greenText, fontWeight: 500 }}>fully answered</span></span>
      </div>
      {BREAKDOWN.map(item => <BreakdownCard key={item.n} item={item} />)}
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: R.full, background: color }} />
      {label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function NewSurveys() {
  useFontLoader();
  const [tab, setTab] = useState("details");

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: C.page, fontFamily: F }}>
      <TopTabs active={tab} onChange={setTab} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 28px 64px" }}>
          {tab === "details" && <DetailsTab />}
          {tab === "questions" && <QuestionsTab />}
          {tab === "results" && <ResultsTab />}
        </div>
      </div>
    </div>
  );
}
