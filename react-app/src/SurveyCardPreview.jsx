import { useState } from "react";

/* ══════════════════════════════════════════════════════════
   SURVEY CARD PREVIEW — Mobile & Desktop layouts
   White + Blue palette · Paged & Scrollable modes
   ══════════════════════════════════════════════════════════ */

const SAMPLE_SURVEY = {
  id: "4d439062-85d2-4c4f-8e00-39b996136849",
  surveyName: "HenryTestQuiz",
  details: {
    description: "This is just a test to see how this will work",
    image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-/1e0f3c32821240ea981f8b3635139cb5_hl2.png",
    pagedView: true,
  },
  sections: [
    {
      id: "43a16aec-927f-4265-9f7e-65d370c2e2be",
      type: "multipleChoice",
      sort: 0,
      question: "Top 3 Brands Financed by ALPHERA 2025 (New cars only)",
      description: "",
      required: true,
      allowMultiple: true,
      options: [
        { id: "f8566d3b", text: "Land Rover", correct: false, sort: 0 },
        { id: "9fb7eb06", text: "Porsche", correct: true, sort: 1 },
        { id: "7e3e034b", text: "Toyota", correct: false, sort: 2 },
        { id: "dca64bc0", text: "Ford", correct: true, sort: 3 },
        { id: "a0e7cdff", text: "BMW", correct: true, sort: 4 },
      ],
    },
    {
      id: "b32df88e-fb8d-49e3-b86c-98d84cd95a6d",
      type: "multipleChoice",
      sort: 1,
      question: "Top 3 Brands Financed by ALPHERA 2025 (Used cars only)",
      description: "",
      required: true,
      allowMultiple: true,
      options: [
        { id: "cf493864", text: "Land Rover", correct: false, sort: 0 },
        { id: "d1451f50", text: "Porsche", correct: true, sort: 1 },
        { id: "e1f770d1", text: "Toyota", correct: true, sort: 2 },
        { id: "35a85d36", text: "Ford", correct: true, sort: 3 },
        { id: "61fd3c94", text: "BMW", correct: false, sort: 4 },
      ],
    },
    {
      id: "14c5df8c-a2a4-48d3-9d0d-de3f86c60db8",
      type: "multipleChoice",
      sort: 2,
      question: "Total Amount paid for May and October DIC Sprint",
      description: "",
      required: true,
      allowMultiple: false,
      options: [
        { id: "601e78ca", text: "R 1,987,684", correct: false, sort: 0 },
        { id: "e722cb08", text: "R 2,999,684", correct: true, sort: 1 },
        { id: "8a654df4", text: "R 2,798,684", correct: false, sort: 2 },
      ],
    },
    {
      id: "58ae9c3a-4da7-478f-97b1-e4589a296422",
      type: "multipleChoice",
      sort: 3,
      question: "Average Amount Financed New",
      description: "",
      required: true,
      allowMultiple: false,
      options: [
        { id: "4e4c664a", text: "R 1,133,624", correct: false, sort: 0 },
        { id: "696f2d88", text: "R 4,000,889", correct: true, sort: 1 },
        { id: "35f6e00c", text: "R 2,909,624", correct: false, sort: 2 },
      ],
    },
    {
      id: "a1ede260-2de9-4906-b5d3-7591d6f17d16",
      type: "multipleChoice",
      sort: 4,
      question: "Ferraris, Lamborghini, Aston Martin and Bentley Financed",
      description: "",
      required: true,
      allowMultiple: false,
      options: [
        { id: "446f01c5", text: "60", correct: false, sort: 0 },
        { id: "ba13dd10", text: "70", correct: true, sort: 1 },
        { id: "b5c7e95b", text: "45", correct: false, sort: 2 },
      ],
    },
    {
      id: "7a52fc96-006c-4f88-ace8-3a509e3e5fa1",
      type: "multipleChoice",
      sort: 5,
      question: "Highest Volume per dealer for a month",
      description: "",
      required: true,
      allowMultiple: false,
      options: [
        { id: "f7e4dfae", text: "R 37.8 mil", correct: false, sort: 0 },
        { id: "29510f4a", text: "R 57 mil", correct: false, sort: 1 },
        { id: "4bacdaa3", text: "R 80.8 mil", correct: false, sort: 2 },
      ],
    },
    {
      id: "1ff23be2-7e59-4732-849a-c1d434d0c8a6",
      type: "freeText",
      sort: 6,
      question: "What can we do better",
      description: "Please add any suggestions",
      required: true,
      allowMultiple: false,
      options: [],
      placeholder: "Type your answer here…",
      multiline: true,
    },
  ],
};

/* ─── Design tokens ─── */
const C = {
  blue:       "#0057FF",
  blueDark:   "#003FBF",
  blueLight:  "#EBF1FF",
  blueMid:    "#C7D9FF",
  accent:     "#00C2A0",   // teal pop for correct/CTA highlight
  white:      "#FFFFFF",
  surface:    "#F7F9FF",
  border:     "#D8E3FF",
  t1:         "#0D1B3E",
  t2:         "#5A6A8A",
  t3:         "#8A99BB",
  error:      "#E84040",
};

/* ─── Icons ─── */
const Icons = {
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  ChevLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4l-10 8L2 4" />
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.8 12.8 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.8 12.8 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  List: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3" cy="6" r="1.5" fill="currentColor" /><circle cx="3" cy="12" r="1.5" fill="currentColor" /><circle cx="3" cy="18" r="1.5" fill="currentColor" />
    </svg>
  ),
  Pages: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="15" x2="12" y2="15" />
    </svg>
  ),
};

/* ─── Progress bar ─── */
function ProgressBar({ current, total, color = C.blue }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: C.t2, fontWeight: 500 }}>
          {current === 0 ? "Details" : `Question ${current} of ${total}`}
        </span>
        <span style={{ fontSize: 12, color: C.blue, fontWeight: 700 }}>{current === 0 ? "" : `${pct}%`}</span>
      </div>
      <div style={{ height: 5, background: C.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${current === 0 ? 0 : pct}%`,
          background: `linear-gradient(90deg, ${C.blue}, ${C.accent})`,
          borderRadius: 99,
          transition: "width .4s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  );
}

/* ─── User details page ─── */
function DetailsPage({ survey, onStart, isMobile }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState({});
  const errors = {
    name: !form.name.trim() ? "Name is required" : "",
    email: !form.email.trim() ? "Email is required" : !/\S+@\S+\.\S+/.test(form.email) ? "Enter a valid email" : "",
  };
  const isValid = !errors.name && !errors.email;

  const field = (key, label, placeholder, icon, type = "text") => {
    const err = touched[key] && errors[key];
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 6 }}>
          {label} {key !== "phone" && <span style={{ color: C.error }}>*</span>}
        </label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: err ? C.error : C.t3, pointerEvents: "none",
          }}>{icon}</span>
          <input
            type={type}
            value={form[key]}
            placeholder={placeholder}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            onBlur={() => setTouched(t => ({ ...t, [key]: true }))}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "12px 14px 12px 44px",
              borderRadius: 10,
              border: `1.5px solid ${err ? C.error : touched[key] && !errors[key] ? C.accent : C.border}`,
              background: C.white,
              fontSize: 14, color: C.t1,
              outline: "none",
              transition: "border-color .15s",
              fontFamily: "inherit",
            }}
          />
        </div>
        {err && <p style={{ margin: "5px 0 0", fontSize: 12, color: C.error }}>{err}</p>}
      </div>
    );
  };

  return (
    <div>
      {/* Banner */}
      <div style={{
        borderRadius: isMobile ? 0 : 16,
        overflow: "hidden",
        marginBottom: 24,
        position: "relative",
        minHeight: 160,
        background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 100%)`,
      }}>
        {survey.details.image && (
          <img
            src={survey.details.image}
            alt=""
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: 0.18,
            }}
          />
        )}
        <div style={{
          position: "relative", zIndex: 1,
          padding: isMobile ? "28px 24px" : "36px 40px",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,.15)", borderRadius: 99,
            padding: "4px 12px", marginBottom: 14,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: ".08em", textTransform: "uppercase" }}>
              Survey
            </span>
          </div>
          <h1 style={{ margin: "0 0 10px", fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-.02em" }}>
            {survey.surveyName}
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.55, maxWidth: 500 }}>
            {survey.details.description}
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: isMobile ? "0 20px" : "0 28px 8px" }}>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: C.t2, lineHeight: 1.6 }}>
          Before we get started, please tell us a bit about yourself.
        </p>

        {field("name", "Full Name", "Jane Smith", <Icons.User />, "text")}
        {field("email", "Email Address", "jane@example.com", <Icons.Mail />, "email")}
        {field("phone", "Phone Number (optional)", "+27 82 000 0000", <Icons.Phone />, "tel")}

        <button
          onClick={() => isValid && onStart(form)}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "14px 24px",
            borderRadius: 12,
            border: "none",
            background: isValid
              ? `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`
              : C.border,
            color: isValid ? "#fff" : C.t3,
            fontSize: 15, fontWeight: 700,
            cursor: isValid ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all .15s",
            boxShadow: isValid ? `0 4px 16px ${C.blue}44` : "none",
            fontFamily: "inherit",
          }}
        >
          <Icons.Send />
          Start Survey
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: C.t3, marginTop: 14 }}>
          {survey.sections.length} question{survey.sections.length !== 1 ? "s" : ""} · Takes about 2 minutes
        </p>
      </div>
    </div>
  );
}

/* ─── Multiple choice question ─── */
function MultipleChoice({ section, value, onChange }) {
  const selected = value || [];
  const toggle = (id) => {
    if (section.allowMultiple) {
      onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
    } else {
      onChange([id]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {section.allowMultiple && (
        <p style={{ margin: "0 0 4px", fontSize: 12, color: C.t2, fontStyle: "italic" }}>
          Select all that apply
        </p>
      )}
      {section.options.sort((a, b) => a.sort - b.sort).map(opt => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "13px 16px",
              borderRadius: 12,
              border: `2px solid ${active ? C.blue : C.border}`,
              background: active ? C.blueLight : C.white,
              cursor: "pointer",
              textAlign: "left",
              transition: "all .15s",
              fontFamily: "inherit",
            }}
          >
            <div style={{
              width: 22, height: 22, flexShrink: 0,
              borderRadius: section.allowMultiple ? 6 : "50%",
              border: `2px solid ${active ? C.blue : C.border}`,
              background: active ? C.blue : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
              transition: "all .15s",
            }}>
              {active && <Icons.Check />}
            </div>
            <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? C.blue : C.t1 }}>
              {opt.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Free text question ─── */
function FreeText({ section, value, onChange }) {
  return (
    <div>
      {section.description && (
        <p style={{ margin: "0 0 10px", fontSize: 13, color: C.t2, lineHeight: 1.5 }}>{section.description}</p>
      )}
      <textarea
        value={value || ""}
        placeholder={section.placeholder || "Type your answer here…"}
        onChange={e => onChange(e.target.value)}
        rows={5}
        style={{
          width: "100%", boxSizing: "border-box",
          padding: "14px 16px",
          borderRadius: 12,
          border: `1.5px solid ${value ? C.blue : C.border}`,
          background: C.white,
          fontSize: 14, color: C.t1,
          lineHeight: 1.6,
          resize: "vertical",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color .15s",
        }}
      />
    </div>
  );
}

/* ─── Thank-you screen ─── */
function ThankYou({ survey, isMobile }) {
  return (
    <div style={{ textAlign: "center", padding: isMobile ? "40px 24px" : "60px 40px" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.blue}, ${C.accent})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px",
        boxShadow: `0 8px 24px ${C.blue}44`,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: 26, fontWeight: 800, color: C.t1, letterSpacing: "-.02em" }}>
        Thank you!
      </h2>
      <p style={{ margin: 0, fontSize: 15, color: C.t2, lineHeight: 1.65, maxWidth: 340, marginInline: "auto" }}>
        Your responses for <strong style={{ color: C.t1 }}>{survey.surveyName}</strong> have been recorded. We appreciate your time.
      </p>
      <div style={{
        marginTop: 32, display: "inline-flex", gap: 8, alignItems: "center",
        background: C.blueLight, borderRadius: 99, padding: "8px 18px",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }} />
        <span style={{ fontSize: 13, color: C.blue, fontWeight: 600 }}>Survey complete</span>
      </div>
    </div>
  );
}

/* ─── Question wrapper used in both paged & scroll ─── */
function QuestionBlock({ section, index, total, answers, setAnswers, isMobile, compact }) {
  const val = answers[section.id];
  const onChange = (v) => setAnswers(prev => ({ ...prev, [section.id]: v }));
  const hasAnswer = Array.isArray(val) ? val.length > 0 : !!val;

  return (
    <div style={{
      background: C.white,
      borderRadius: compact ? 0 : 16,
      border: compact ? "none" : `1.5px solid ${C.border}`,
      padding: isMobile ? "20px" : "28px 32px",
      boxShadow: compact ? "none" : "0 2px 12px rgba(0,87,255,.05)",
    }}>
      {/* Question header */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{
          flexShrink: 0,
          width: 32, height: 32, borderRadius: 10,
          background: hasAnswer ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})` : C.blueLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700,
          color: hasAnswer ? "#fff" : C.blue,
          transition: "all .2s",
        }}>
          {hasAnswer ? <Icons.Check /> : index + 1}
        </div>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: C.t1, lineHeight: 1.4 }}>
            {section.question}
            {section.required && <span style={{ color: C.error, marginLeft: 4 }}>*</span>}
          </p>
          {section.description && (
            <p style={{ margin: 0, fontSize: 13, color: C.t2 }}>{section.description}</p>
          )}
        </div>
      </div>

      {section.type === "multipleChoice" && (
        <MultipleChoice section={section} value={val} onChange={onChange} />
      )}
      {section.type === "freeText" && (
        <FreeText section={section} value={val} onChange={onChange} />
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   MOBILE CARD
   ════════════════════════════════════════ */
function MobileCard({ survey }) {
  const [stage, setStage] = useState("details"); // details | survey | done
  const [paged, setPaged] = useState(survey.details.pagedView);
  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const sections = survey.sections.sort((a, b) => a.sort - b.sort);

  const canAdvance = () => {
    const sec = sections[pageIndex];
    if (!sec) return true;
    if (!sec.required) return true;
    const val = answers[sec.id];
    return Array.isArray(val) ? val.length > 0 : !!val?.trim();
  };

  const handleSubmit = () => setStage("done");

  return (
    <div style={{
      maxWidth: 420, margin: "0 auto",
      background: C.surface,
      minHeight: "100%",
      fontFamily: "'Inter','DM Sans','Segoe UI',system-ui,sans-serif",
      color: C.t1,
      paddingBottom: 40,
    }}>
      {/* Top bar */}
      <div style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{survey.surveyName}</span>
        </div>
        {stage === "survey" && (
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { key: false, icon: <Icons.List /> },
              { key: true, icon: <Icons.Pages /> },
            ].map(({ key, icon }) => (
              <button
                key={String(key)}
                onClick={() => { setPaged(key); setPageIndex(0); }}
                style={{
                  padding: "5px 8px", borderRadius: 7,
                  border: `1px solid ${paged === key ? C.blue : C.border}`,
                  background: paged === key ? C.blueLight : "transparent",
                  color: paged === key ? C.blue : C.t3,
                  cursor: "pointer",
                  display: "flex", alignItems: "center",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress */}
      {stage === "survey" && (
        <div style={{ padding: "16px 20px 8px", background: C.white }}>
          <ProgressBar
            current={paged ? pageIndex + 1 : sections.length}
            total={sections.length}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ paddingTop: stage === "details" ? 0 : 12 }}>
        {stage === "details" && (
          <DetailsPage survey={survey} isMobile onStart={() => setStage("survey")} />
        )}

        {stage === "survey" && !paged && (
          <div style={{ padding: "0 0 16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 16px" }}>
              {sections.map((sec, i) => (
                <QuestionBlock
                  key={sec.id}
                  section={sec}
                  index={i}
                  total={sections.length}
                  answers={answers}
                  setAnswers={setAnswers}
                  isMobile
                />
              ))}
            </div>
            <div style={{ padding: "20px 16px 0" }}>
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12, border: "none",
                  background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: `0 4px 16px ${C.blue}44`,
                  fontFamily: "inherit",
                }}
              >
                <Icons.Send /> Submit Survey
              </button>
            </div>
          </div>
        )}

        {stage === "survey" && paged && (
          <div style={{ padding: "4px 16px" }}>
            <QuestionBlock
              section={sections[pageIndex]}
              index={pageIndex}
              total={sections.length}
              answers={answers}
              setAnswers={setAnswers}
              isMobile
            />
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {pageIndex > 0 && (
                <button
                  onClick={() => setPageIndex(i => i - 1)}
                  style={{
                    flex: 1, padding: "13px", borderRadius: 12,
                    border: `1.5px solid ${C.border}`,
                    background: C.white,
                    color: C.t1, fontSize: 14, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: "inherit",
                  }}
                >
                  <Icons.ChevLeft /> Previous
                </button>
              )}
              {pageIndex < sections.length - 1 ? (
                <button
                  onClick={() => canAdvance() && setPageIndex(i => i + 1)}
                  style={{
                    flex: 2, padding: "13px", borderRadius: 12, border: "none",
                    background: canAdvance()
                      ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`
                      : C.border,
                    color: canAdvance() ? "#fff" : C.t3,
                    fontSize: 14, fontWeight: 700,
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    boxShadow: canAdvance() ? `0 4px 12px ${C.blue}33` : "none",
                    fontFamily: "inherit",
                    transition: "all .15s",
                  }}
                >
                  Next <Icons.ChevRight />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 2, padding: "13px", borderRadius: 12, border: "none",
                    background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                    color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    boxShadow: `0 4px 12px ${C.blue}33`,
                    fontFamily: "inherit",
                  }}
                >
                  <Icons.Send /> Submit
                </button>
              )}
            </div>
            {/* Dot indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              {sections.map((_, i) => (
                <div
                  key={i}
                  onClick={() => i <= pageIndex && setPageIndex(i)}
                  style={{
                    width: i === pageIndex ? 20 : 7, height: 7, borderRadius: 99,
                    background: i === pageIndex ? C.blue : i < pageIndex ? C.blueMid : C.border,
                    cursor: i <= pageIndex ? "pointer" : "default",
                    transition: "all .2s",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === "done" && <ThankYou survey={survey} isMobile />}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DESKTOP CARD
   ════════════════════════════════════════ */
function DesktopCard({ survey }) {
  const [stage, setStage] = useState("details");
  const [paged, setPaged] = useState(survey.details.pagedView);
  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const sections = survey.sections.sort((a, b) => a.sort - b.sort);

  const canAdvance = () => {
    const sec = sections[pageIndex];
    if (!sec || !sec.required) return true;
    const val = answers[sec.id];
    return Array.isArray(val) ? val.length > 0 : !!val?.trim();
  };

  return (
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "grid",
      gridTemplateColumns: stage === "details" ? "1fr" : "280px 1fr",
      gap: 0,
      background: C.white,
      borderRadius: 20,
      border: `1.5px solid ${C.border}`,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,87,255,.1)",
      minHeight: 580,
      fontFamily: "'Inter','DM Sans','Segoe UI',system-ui,sans-serif",
    }}>
      {/* ── Sidebar (only in survey/done stage) ── */}
      {stage !== "details" && (
        <div style={{
          background: `linear-gradient(180deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
          padding: "32px 24px",
          display: "flex", flexDirection: "column",
        }}>
          {/* Survey name */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,.15)", borderRadius: 99,
              padding: "4px 12px", marginBottom: 14,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: ".08em", textTransform: "uppercase" }}>
                Survey
              </span>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
              {survey.surveyName}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.55 }}>
              {survey.details.description}
            </p>
          </div>

          {/* View toggle */}
          {stage === "survey" && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                View Mode
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { key: false, label: "Scroll", icon: <Icons.List /> },
                  { key: true, label: "Pages", icon: <Icons.Pages /> },
                ].map(({ key, label, icon }) => (
                  <button
                    key={String(key)}
                    onClick={() => { setPaged(key); setPageIndex(0); }}
                    style={{
                      flex: 1, padding: "8px", borderRadius: 8,
                      border: `1.5px solid ${paged === key ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.2)"}`,
                      background: paged === key ? "rgba(255,255,255,.15)" : "transparent",
                      color: "#fff", fontSize: 12, fontWeight: 600,
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      fontFamily: "inherit",
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question nav list */}
          {stage === "survey" && (
            <div style={{ flex: 1, overflowY: "auto" }}>
              {sections.map((sec, i) => {
                const val = answers[sec.id];
                const done = Array.isArray(val) ? val.length > 0 : !!val?.trim();
                const active = paged && i === pageIndex;
                return (
                  <div
                    key={sec.id}
                    onClick={() => paged && i <= (paged ? pageIndex : sections.length) && setPageIndex(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 10, marginBottom: 4,
                      background: active ? "rgba(255,255,255,.18)" : "transparent",
                      cursor: paged ? "pointer" : "default",
                      transition: "background .15s",
                    }}
                  >
                    <div style={{
                      width: 26, height: 26, flexShrink: 0, borderRadius: 8,
                      background: done ? C.accent : "rgba(255,255,255,.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: "#fff",
                      transition: "background .2s",
                    }}>
                      {done ? <Icons.Check /> : i + 1}
                    </div>
                    <p style={{
                      margin: 0, fontSize: 12, fontWeight: active ? 700 : 500,
                      color: active ? "#fff" : "rgba(255,255,255,.65)",
                      lineHeight: 1.4,
                      overflow: "hidden", textOverflow: "ellipsis",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>
                      {sec.question}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Progress */}
          {stage === "survey" && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.15)" }}>
              <ProgressBar
                current={paged ? pageIndex + 1 : sections.length}
                total={sections.length}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Main content area ── */}
      <div style={{
        padding: stage === "details" ? 0 : "40px 48px",
        overflowY: "auto",
        maxHeight: stage === "details" ? "none" : 680,
        background: stage === "details" ? C.white : C.surface,
      }}>
        {stage === "details" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", minHeight: 560 }}>
            {/* Left: banner */}
            <div style={{
              background: `linear-gradient(145deg, ${C.blueDark} 0%, ${C.blue} 100%)`,
              padding: "52px 48px",
              display: "flex", flexDirection: "column", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {survey.details.image && (
                <img
                  src={survey.details.image}
                  alt=""
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", opacity: 0.12,
                  }}
                />
              )}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,.15)", borderRadius: 99,
                  padding: "5px 14px", marginBottom: 20,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".08em", textTransform: "uppercase" }}>
                    Survey
                  </span>
                </div>
                <h1 style={{ margin: "0 0 16px", fontSize: 34, fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-.025em" }}>
                  {survey.surveyName}
                </h1>
                <p style={{ margin: "0 0 32px", fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.65 }}>
                  {survey.details.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[
                    { label: `${survey.sections.length} Questions` },
                    { label: "~2 min" },
                  ].map(({ label }) => (
                    <div key={label} style={{
                      background: "rgba(255,255,255,.12)", borderRadius: 99,
                      padding: "6px 14px", fontSize: 13, color: "rgba(255,255,255,.85)", fontWeight: 500,
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: C.t1 }}>Your details</h2>
              <p style={{ margin: "0 0 28px", fontSize: 14, color: C.t2 }}>We'd like to know who you are before we begin.</p>

              {[
                { key: "name", label: "Full Name", placeholder: "Jane Smith", icon: <Icons.User />, type: "text", req: true },
                { key: "email", label: "Email Address", placeholder: "jane@example.com", icon: <Icons.Mail />, type: "email", req: true },
                { key: "phone", label: "Phone Number", placeholder: "+27 82 000 0000", icon: <Icons.Phone />, type: "tel", req: false },
              ].map(({ key, label, placeholder, icon, type, req }) => (
                <div key={key} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 7 }}>
                    {label} {req && <span style={{ color: C.error }}>*</span>}
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.t3, pointerEvents: "none" }}>
                      {icon}
                    </span>
                    <input
                      type={type}
                      placeholder={placeholder}
                      style={{
                        width: "100%", boxSizing: "border-box",
                        padding: "13px 14px 13px 44px",
                        borderRadius: 10, border: `1.5px solid ${C.border}`,
                        background: C.white, fontSize: 14, color: C.t1,
                        outline: "none", fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStage("survey")}
                style={{
                  marginTop: 8, padding: "14px 24px", borderRadius: 12, border: "none",
                  background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: `0 4px 20px ${C.blue}44`,
                  fontFamily: "inherit", width: "100%",
                }}
              >
                <Icons.Send /> Start Survey
              </button>
            </div>
          </div>
        )}

        {stage === "survey" && !paged && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {sections.map((sec, i) => (
                <QuestionBlock
                  key={sec.id}
                  section={sec}
                  index={i}
                  total={sections.length}
                  answers={answers}
                  setAnswers={setAnswers}
                  isMobile={false}
                />
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <button
                onClick={() => setStage("done")}
                style={{
                  padding: "14px 36px", borderRadius: 12, border: "none",
                  background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 10,
                  boxShadow: `0 4px 20px ${C.blue}44`,
                  fontFamily: "inherit",
                }}
              >
                <Icons.Send /> Submit Survey
              </button>
            </div>
          </div>
        )}

        {stage === "survey" && paged && (
          <div>
            <QuestionBlock
              section={sections[pageIndex]}
              index={pageIndex}
              total={sections.length}
              answers={answers}
              setAnswers={setAnswers}
              isMobile={false}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
              {pageIndex > 0 && (
                <button
                  onClick={() => setPageIndex(i => i - 1)}
                  style={{
                    padding: "12px 24px", borderRadius: 10,
                    border: `1.5px solid ${C.border}`, background: C.white,
                    color: C.t1, fontSize: 14, fontWeight: 600, cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: "inherit",
                  }}
                >
                  <Icons.ChevLeft /> Previous
                </button>
              )}
              {pageIndex < sections.length - 1 ? (
                <button
                  onClick={() => canAdvance() && setPageIndex(i => i + 1)}
                  style={{
                    padding: "12px 28px", borderRadius: 10, border: "none",
                    background: canAdvance()
                      ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`
                      : C.border,
                    color: canAdvance() ? "#fff" : C.t3,
                    fontSize: 14, fontWeight: 700,
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: "inherit",
                    boxShadow: canAdvance() ? `0 4px 14px ${C.blue}44` : "none",
                    transition: "all .15s",
                  }}
                >
                  Next Question <Icons.ChevRight />
                </button>
              ) : (
                <button
                  onClick={() => setStage("done")}
                  style={{
                    padding: "12px 28px", borderRadius: 10, border: "none",
                    background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                    color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: "inherit",
                    boxShadow: `0 4px 14px ${C.blue}44`,
                  }}
                >
                  <Icons.Send /> Submit Survey
                </button>
              )}
            </div>
          </div>
        )}

        {stage === "done" && <ThankYou survey={survey} isMobile={false} />}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   PREVIEW WRAPPER
   ════════════════════════════════════════ */
export default function SurveyCardPreview() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{
      background: "#EEF3FF",
      minHeight: "100vh",
      fontFamily: "'Inter','DM Sans','Segoe UI',system-ui,sans-serif",
    }}>
      {/* Tab bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "20px 16px 0" }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 28px",
              fontSize: 13, fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 10,
              border: `1.5px solid ${mode === m ? C.blue : C.border}`,
              background: mode === m ? C.blue : C.white,
              color: mode === m ? "#fff" : C.t2,
              cursor: "pointer",
              transition: "all .15s",
              fontFamily: "inherit",
            }}
          >
            {m === "mobile" ? "📱 Mobile" : "🖥 Desktop"}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ padding: mode === "desktop" ? "28px 24px 60px" : "28px 0 60px" }}>
        {mode === "mobile" ? (
          <div style={{
            maxWidth: 420, margin: "0 auto",
            borderRadius: 24,
            border: `2px solid ${C.border}`,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,87,255,.14)",
          }}>
            <MobileCard survey={SAMPLE_SURVEY} />
          </div>
        ) : (
          <div style={{ boxShadow: "0 24px 80px rgba(0,87,255,.12)" }}>
            <DesktopCard survey={SAMPLE_SURVEY} />
          </div>
        )}
      </div>
    </div>
  );
}
