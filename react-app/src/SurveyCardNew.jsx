import { useState, useEffect } from "react";

/* ============================================================================
   SurveyCardNew — respondent-facing survey card
   Pixel-faithful rebuild of:
     CardDesigns/SurveyCard/surveycardDesktop.mp4
     CardDesigns/SurveyCard/surveycardMobile.mp4

   The public "take the survey" experience for the Travel Preferences Survey:
     • Intro   — banner hero + personal-details form, "Start Survey"
     • Paged   — one question at a time, progress header, Back / Next / Finish
     • Done    — thank-you confirmation with "Take survey again"

   Responsive: a single centered column that reflows for narrow (mobile)
   viewports. Self-contained — inline styles, internal flow state.
   ========================================================================== */

// ─── Fonts ────────────────────────────────────────────────────────────────────
function useFontLoader() {
  useEffect(() => {
    const id = "surveycard-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?" +
      "family=Inter:wght@400;450;500;600;700" +
      "&family=Inter+Tight:wght@600;700;800" +
      "&display=swap";
    document.head.appendChild(link);
  }, []);
}
const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const FD = "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  page:        "#F5F3ED",
  surface:     "#FBFAF6",
  optionBg:    "#FAF8F3",
  optionHover: "#EFEBE2",
  border:      "#E7E3D9",
  borderSoft:  "#EDE9E0",
  inputBorder: "#E2DDD1",

  text:   "#20211D",
  text2:  "#6B665A",
  text3:  "#A39C8C",

  green:      "#12943C",   // primary button
  greenHover: "#0F7F33",
  greenVivid: "#0F9E3C",   // progress fill
  greenText:  "#1C8043",   // % / link text
  greenSoft:  "#DDEFDC",   // number badge / selected tint
  greenSoftBd:"#B9DDB9",
  greenBadge: "#1C7C42",

  amber:  "#9A7B45",       // "before we get started" / counter
  red:    "#D6455F",       // required asterisk
  track:  "#EBE7DD",
};
const R = { sm: 8, md: 10, lg: 14, xl: 18, full: 9999 };

// sunset hero — stand-in for the bundled banner photo
const HERO_BG =
  "linear-gradient(180deg, rgba(20,16,14,0.05) 0%, rgba(20,16,14,0.55) 100%), " +
  "linear-gradient(100deg, #33323A 0%, #5E4A3E 32%, #B87A44 56%, #ED9E4E 74%, #FBDF97 100%)";

// ─── Viewport hook (drives the mobile reflow) ────────────────────────────────
function useNarrow(bp = 560) {
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth <= bp : false
  );
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth <= bp);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return narrow;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 2, style = {} }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color,
    strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block", flexShrink: 0, ...style },
  };
  switch (name) {
    case "arrowRight": return <svg {...p}><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>;
    case "arrowLeft":  return <svg {...p}><line x1="20" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/></svg>;
    case "check":      return <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>;
    case "doubleCheck":return <svg {...p}><polyline points="16 7 9 16 5.5 12.5"/><polyline points="21 7 13.5 16 13 15.4"/></svg>;
    case "refresh":    return <svg {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;
    default: return null;
  }
}

// ─── Text input (intro form) ─────────────────────────────────────────────────
function Field({ label, required, optional, type = "text", placeholder, value, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text, marginBottom: 8 }}>
        {label}
        {required && <span style={{ color: C.red, marginLeft: 4 }}>*</span>}
        {optional && <span style={{ color: C.text3, fontWeight: 400, marginLeft: 6 }}>(optional)</span>}
      </div>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", height: 52, padding: "0 16px", boxSizing: "border-box",
          fontSize: 15.5, fontFamily: F, color: C.text, background: C.surface,
          border: `1.5px solid ${focus ? C.greenSoftBd : C.inputBorder}`,
          borderRadius: R.md, outline: "none",
          boxShadow: focus ? `0 0 0 4px rgba(18,148,60,0.10)` : "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  INTRO SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function Intro({ narrow, onStart }) {
  const [f, setF] = useState({ first: "", last: "", email: "", phone: "" });
  const set = k => v => setF(s => ({ ...s, [k]: v }));
  const ready = f.first.trim() && f.last.trim() && f.email.trim();

  return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: narrow ? "20px 16px 36px" : "40px 24px 64px" }}>
      {/* Hero */}
      <div style={{
        position: "relative", height: narrow ? 168 : 316, borderRadius: R.lg,
        overflow: "hidden", background: HERO_BG,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 24px",
      }}>
        <div style={{ position: "absolute", right: narrow ? "14%" : "20%", top: narrow ? "16%" : "22%", width: narrow ? 64 : 110, height: narrow ? 64 : 110, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,251,225,0.95) 0%, rgba(255,220,150,0.25) 58%, transparent 70%)" }} />
        <h1 style={{
          position: "relative", margin: 0, color: "#fff", fontFamily: FD, fontWeight: 800,
          fontSize: narrow ? 27 : 38, letterSpacing: "-0.02em", lineHeight: 1.12,
          textShadow: "0 2px 12px rgba(0,0,0,0.35)",
        }}>Travel Preferences Survey</h1>
        <p style={{
          position: "relative", margin: narrow ? "10px 0 0" : "12px 0 0", color: "rgba(255,255,255,0.94)",
          fontSize: narrow ? 14.5 : 16.5, fontWeight: 600, lineHeight: 1.4,
          textShadow: "0 1px 8px rgba(0,0,0,0.35)", maxWidth: 440,
        }}>Help us create better travel experiences tailored just for you.</p>
      </div>

      {/* Intro copy */}
      <p style={{ margin: narrow ? "20px 0 22px" : "26px 0 26px", fontSize: narrow ? 15 : 16, color: C.amber, fontWeight: 500, lineHeight: 1.5 }}>
        Before we get started, please tell us a bit about yourself.
      </p>

      {/* Form */}
      <Field label="First Name" required placeholder="Jane" value={f.first} onChange={set("first")} />
      <Field label="Last Name"  required placeholder="Smith" value={f.last} onChange={set("last")} />
      <Field label="Email Address" required type="email" placeholder="jane@example.com" value={f.email} onChange={set("email")} />
      <Field label="Phone" optional type="tel" placeholder="+27 82 000 0000" value={f.phone} onChange={set("phone")} />

      {/* Start */}
      <button
        onClick={() => ready && onStart()}
        disabled={!ready}
        style={{
          width: "100%", height: 56, marginTop: 8, borderRadius: R.md, border: "none",
          fontFamily: F, fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          cursor: ready ? "pointer" : "not-allowed",
          background: ready ? C.green : "#DCD5C8",
          color: ready ? "#fff" : "#A79F8F",
          boxShadow: ready ? "0 4px 14px rgba(18,148,60,0.30)" : "none",
          transition: "background 0.15s, box-shadow 0.15s",
        }}>
        Start Survey <Icon name="arrowRight" size={18} color={ready ? "#fff" : "#A79F8F"} />
      </button>

      <div style={{ textAlign: "center", marginTop: 20, fontSize: 13.5, fontWeight: 500, color: C.text2 }}>
        6 questions · Takes about <span style={{ color: C.greenText, fontWeight: 600 }}>2 minutes</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  QUESTION DATA
// ═══════════════════════════════════════════════════════════════════════════════
const QUESTIONS = [
  { n: 1, type: "multi",  q: "What type of vacation do you prefer?", helper: "e.g. Select all that apply.", options: ["Beach", "Mountains", "City", "Cruise"] },
  { n: 2, type: "multi",  q: "Who do you usually travel with?", helper: "e.g. Select all that apply.", options: ["Family", "Friends", "Partner", "Solo"] },
  { n: 3, type: "multi",  q: "Which activities do you enjoy?", helper: "e.g. Select all that apply.", options: ["Sightseeing", "Food Tours", "Hiking", "Museums", "Shopping"] },
  { n: 4, type: "single", q: "How many vacations do you take each year?", helper: "", options: ["1", "2", "3", "More than 3"] },
  { n: 5, type: "single", q: "What's most important when booking accommodation?", helper: "", options: ["Price", "Location", "Amenities", "Reviews"] },
  { n: 6, type: "text",   q: "What could we improve?", helper: "Extra guidance for the respondent...", max: 500 },
];

// ─── Progress header ──────────────────────────────────────────────────────────
function ProgressHeader({ index, total }) {
  const pct = Math.round((index / total) * 100);
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 5, background: C.page,
      borderBottom: `1px solid ${C.border}`, padding: "16px 24px 14px",
    }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: C.text2 }}>Question {index + 1} of {total}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.greenText, fontFamily: FD }}>{pct}%</span>
        </div>
        <div style={{ height: 6, borderRadius: R.full, background: C.track, overflow: "hidden" }}>
          <div style={{ width: `${Math.max(pct, 6)}%`, height: "100%", background: C.greenVivid, borderRadius: R.full, transition: "width 0.3s" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Choice option ────────────────────────────────────────────────────────────
function ChoiceOption({ label, kind, checked, onToggle }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 14,
        minHeight: 54, padding: "0 16px", marginBottom: 12, textAlign: "left",
        borderRadius: R.md, cursor: "pointer", fontFamily: F,
        background: checked ? C.greenSoft : hover ? C.optionHover : C.optionBg,
        border: `1.5px solid ${checked ? C.greenSoftBd : C.border}`,
        transition: "background 0.12s, border-color 0.12s",
      }}>
      <span style={{
        width: 22, height: 22, flexShrink: 0, position: "relative",
        borderRadius: kind === "single" ? R.full : 6,
        border: `1.5px solid ${checked ? C.green : "#C9C2B2"}`,
        background: checked ? C.green : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && (kind === "single"
          ? <span style={{ width: 9, height: 9, borderRadius: R.full, background: "#fff" }} />
          : <Icon name="check" size={14} color="#fff" strokeWidth={3} />)}
      </span>
      <span style={{ fontSize: 15.5, color: C.text, fontWeight: checked ? 600 : 450 }}>{label}</span>
    </button>
  );
}

// ─── Dots pagination ──────────────────────────────────────────────────────────
function Dots({ index, total }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, margin: "22px 0 26px" }}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === index;
        const past = i < index;
        return (
          <span key={i} style={{
            height: 7, width: active ? 22 : 7, borderRadius: R.full,
            background: active ? C.greenVivid : past ? C.greenSoftBd : "#D8D2C6",
            transition: "width 0.25s, background 0.25s",
          }} />
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  QUESTION SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function QuestionScreen({ narrow, index, total, answer, setAnswer, onBack, onNext }) {
  const q = QUESTIONS[index];
  const last = index === total - 1;

  const toggleMulti = (opt) => {
    const cur = Array.isArray(answer) ? answer : [];
    setAnswer(cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt]);
  };

  return (
    <>
      <ProgressHeader index={index} total={total} />
      <div style={{ maxWidth: 660, margin: "0 auto", padding: narrow ? "24px 16px 40px" : "40px 24px 48px" }}>
        {/* Question card */}
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`, borderRadius: R.lg,
          padding: narrow ? "22px 18px" : "26px 28px", boxShadow: "0 1px 3px rgba(30,26,18,0.04)",
        }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
            <span style={{
              width: 30, height: 30, flexShrink: 0, borderRadius: R.full, background: C.greenSoft,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: C.greenBadge,
            }}>{q.n}</span>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: narrow ? 18 : 19, fontWeight: 700, color: C.text, fontFamily: FD, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{q.q}</div>
              {q.helper && <div style={{ marginTop: 6, fontSize: 14, fontStyle: "italic", color: C.text2 }}>{q.helper}</div>}
            </div>
          </div>

          {q.type === "text" ? (
            <TextQuestion answer={answer} setAnswer={setAnswer} max={q.max} />
          ) : (
            <div style={{ paddingLeft: narrow ? 0 : 0 }}>
              {q.options.map(opt => {
                const checked = q.type === "multi"
                  ? Array.isArray(answer) && answer.includes(opt)
                  : answer === opt;
                return (
                  <ChoiceOption
                    key={opt} label={opt} kind={q.type} checked={checked}
                    onToggle={() => q.type === "multi" ? toggleMulti(opt) : setAnswer(opt)}
                  />
                );
              })}
            </div>
          )}
        </div>

        <Dots index={index} total={total} />

        {/* Nav */}
        <div style={{ display: "flex", gap: 16 }}>
          <button
            onClick={onBack} disabled={index === 0}
            style={{
              flex: narrow ? "0 0 40%" : "0 0 38%", height: 56, borderRadius: R.md,
              background: C.surface, border: `1.5px solid ${C.border}`,
              cursor: index === 0 ? "default" : "pointer", opacity: index === 0 ? 0.5 : 1,
              fontFamily: F, fontSize: 16, fontWeight: 600, color: C.text,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
            <Icon name="arrowLeft" size={17} color={C.text} /> Back
          </button>
          <NextButton last={last} onClick={onNext} />
        </div>

        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13.5, color: C.text2 }}>
          You can <span style={{ color: C.greenText, fontWeight: 500 }}>skip</span> this question and{" "}
          <span style={{ color: C.greenText, fontWeight: 500 }}>come back later</span>
        </div>
      </div>
    </>
  );
}

function NextButton({ last, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, height: 56, borderRadius: R.md, border: "none", cursor: "pointer",
        background: hover ? C.greenHover : C.green, color: "#fff",
        fontFamily: F, fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        boxShadow: "0 4px 14px rgba(18,148,60,0.28)", transition: "background 0.15s",
      }}>
      {last ? <>Finish <Icon name="check" size={18} color="#fff" strokeWidth={2.5} /></>
            : <>Next <Icon name="arrowRight" size={18} color="#fff" /></>}
    </button>
  );
}

function TextQuestion({ answer, setAnswer, max }) {
  const val = typeof answer === "string" ? answer : "";
  return (
    <div>
      <textarea
        value={val}
        onChange={e => setAnswer(e.target.value.slice(0, max))}
        placeholder="Type your answer here..."
        rows={4}
        style={{
          width: "100%", boxSizing: "border-box", padding: "14px 16px", resize: "vertical",
          fontSize: 15.5, fontFamily: F, color: C.text, lineHeight: 1.55,
          background: C.optionBg, border: `1.5px solid ${C.border}`, borderRadius: R.md, outline: "none",
        }}
      />
      <div style={{ textAlign: "right", marginTop: 8, fontSize: 13, fontWeight: 500, color: C.amber }}>
        {val.length}/{max}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  THANK YOU SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function Done({ onRestart }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 24px", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: R.full, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <Icon name="doubleCheck" size={30} color={C.green} strokeWidth={2.4} />
      </div>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, fontFamily: FD, color: C.text, letterSpacing: "-0.02em" }}>Thank you!</h1>
      <p style={{ margin: "14px 0 0", maxWidth: 400, fontSize: 15.5, color: C.text2, lineHeight: 1.55 }}>
        Your response to <span style={{ fontWeight: 700, color: C.text }}>Travel Preferences Survey</span> has been recorded. We appreciate your time.
      </p>
      <button
        onClick={onRestart}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          marginTop: 28, height: 48, padding: "0 22px", borderRadius: R.md,
          background: hover ? C.optionHover : C.surface, border: `1.5px solid ${C.border}`,
          cursor: "pointer", fontFamily: F, fontSize: 15, fontWeight: 600, color: C.text,
          display: "inline-flex", alignItems: "center", gap: 9, transition: "background 0.13s",
        }}>
        <Icon name="refresh" size={16} color={C.text2} /> Take survey again
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function SurveyCardNew() {
  useFontLoader();
  const narrow = useNarrow();
  const total = QUESTIONS.length;

  // screen: "intro" | 0..total-1 | "done"
  const [screen, setScreen] = useState("intro");
  const [answers, setAnswers] = useState({});

  const setAnswer = (i) => (val) => setAnswers(a => ({ ...a, [i]: val }));

  const goNext = (i) => setScreen(i === total - 1 ? "done" : i + 1);
  const goBack = (i) => setScreen(i === 0 ? "intro" : i - 1);
  const restart = () => { setAnswers({}); setScreen("intro"); };

  return (
    <div style={{ position: "absolute", inset: 0, overflowY: "auto", background: C.page, fontFamily: F }}>
      {screen === "intro" && <Intro narrow={narrow} onStart={() => setScreen(0)} />}
      {typeof screen === "number" && (
        <QuestionScreen
          narrow={narrow}
          index={screen}
          total={total}
          answer={answers[screen]}
          setAnswer={setAnswer(screen)}
          onBack={() => goBack(screen)}
          onNext={() => goNext(screen)}
        />
      )}
      {screen === "done" && <Done onRestart={restart} />}
    </div>
  );
}
