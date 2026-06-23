import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Personalyz Admin palette
// ═══════════════════════════════════════════════════════════════
const T = {
  bg: "#F0F0F0",
  surface: "#FFFFFF",
  surfaceAlt: "#F8F8F8",
  ink: "#1A1A1A",
  ink2: "#3D3D3D",
  sub: "#6B7280",
  muted: "#9CA3AF",
  faint: "#E5E7EB",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  accent: "#2563EB",
  accentSoft: "#EFF6FF",
  accentHover: "#1D4ED8",
  success: "#16A34A",
  successSoft: "#F0FDF4",
  warning: "#D97706",
  warningSoft: "#FFFBEB",
  danger: "#DC2626",
  dangerSoft: "#FEF2F2",
  purple: "#7C3AED",
  purpleSoft: "#F5F3FF",
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#E5E7EB",
  sidebarActive: "#EFF6FF",
  sidebarActiveText: "#2563EB",
  sidebarText: "#374151",
  topbar: "#FFFFFF",
  shadow: "0 1px 3px rgba(0,0,0,0.08)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.08)",
  radius: 8,
  radiusSm: 6,
  radiusLg: 12,
};

const font = {
  ui: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Consolas', monospace",
};

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    plus: <path d="M12 4v16m8-8H4" />,
    x: <path d="M6 18L18 6M6 6l12 12" />,
    chevDown: <path d="M19 9l-7 7-7-7" />,
    chevRight: <path d="M9 5l7 7-7 7" />,
    chevUp: <path d="M5 15l7-7 7 7" />,
    edit: <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    grip: <><circle cx="9" cy="5" r="1.5" fill="currentColor" /><circle cx="15" cy="5" r="1.5" fill="currentColor" /><circle cx="9" cy="12" r="1.5" fill="currentColor" /><circle cx="15" cy="12" r="1.5" fill="currentColor" /><circle cx="9" cy="19" r="1.5" fill="currentColor" /><circle cx="15" cy="19" r="1.5" fill="currentColor" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
    save: <path d="M17 21v-8H7v8m10 0H7m10 0h2a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0016.586 3H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0v-8h10" />,
    arrowUp: <path d="M12 19V5m-7 7l7-7 7 7" />,
    arrowDown: <path d="M12 5v14m7-7l-7 7-7-7" />,
    check: <path d="M5 13l4 4L19 7" />,
    info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    photo: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
    radio: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" /></>,
    text: <path d="M4 7V5h16v2M9 5v14m-3 0h6M14 13h6m-6 4h6m-6-8h6" />,
    clipboard: <><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" /><path d="M9 11h6M9 15h4" /></>,
    search: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    cards: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
    surveys: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
    microsites: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></>,
    analytics: <path d="M18 20V10M12 20V4M6 20v-6" />,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
    companies: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    notifications: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></>,
    qrcode: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3M17 17h3v3M14 20h3" /></>,
    help: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></>,
    imports: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
    chevLeft: <path d="M15 19l-7-7 7-7" />,
    moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
    upload: <><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" /></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    session: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Badge({ label, variant = "default" }) {
  const styles = {
    default: { bg: T.faint, color: T.sub },
    active: { bg: T.successSoft, color: T.success },
    accent: { bg: T.accentSoft, color: T.accent },
    warning: { bg: T.warningSoft, color: T.warning },
    purple: { bg: T.purpleSoft, color: T.purple },
    danger: { bg: T.dangerSoft, color: T.danger },
    muted: { bg: T.faint, color: T.muted },
    success: { bg: T.successSoft, color: T.success },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", background: s.bg, color: s.color, fontFamily: font.ui, lineHeight: "18px", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function Btn({ children, variant = "primary", size = "md", icon, onClick, style: extra, disabled }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: font.ui, fontWeight: 600, borderRadius: T.radiusSm, transition: "all 0.15s", lineHeight: 1, opacity: disabled ? 0.5 : 1 };
  const sizes = { xs: { padding: "4px 8px", fontSize: 11 }, sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 }, lg: { padding: "10px 20px", fontSize: 14 } };
  const variants = { primary: { background: T.accent, color: "#fff" }, secondary: { background: T.faint, color: T.ink }, ghost: { background: "transparent", color: T.sub }, danger: { background: T.dangerSoft, color: T.danger }, outline: { background: "transparent", color: T.accent, border: `1px solid ${T.accent}` }, ghostRed: { background: "transparent", color: T.danger } };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...extra }}>{icon}{children}</button>;
}

function Toggle({ on, onToggle, label, size = "md" }) {
  const w = size === "sm" ? 34 : 40, h = size === "sm" ? 20 : 22, dot = size === "sm" ? 16 : 18;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={onToggle}>
      <div style={{ width: w, height: h, borderRadius: h / 2, padding: 2, transition: "background 0.2s", background: on ? T.accent : "#D1D5DB", display: "flex", alignItems: "center", justifyContent: on ? "flex-end" : "flex-start" }}>
        <div style={{ width: dot, height: dot, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", transition: "all 0.2s" }} />
      </div>
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: T.ink, fontFamily: font.ui }}>{label}</span>}
    </div>
  );
}

const uid = (p = "id") => `${p}-${Date.now()}-${Math.floor(Math.random() * 9999)}`;

// ═══════════════════════════════════════════════════════════════
// SECTION TYPES
// ═══════════════════════════════════════════════════════════════
const SECTION_TYPES = {
  multipleChoice: { label: "Multiple Choice", icon: "radio", variant: "accent", iconBg: T.accentSoft, iconColor: T.accent, blurb: "A question with selectable options. Mark which answer(s) are correct to track progress." },
  freeText: { label: "Answer Block", icon: "text", variant: "purple", iconBg: T.purpleSoft, iconColor: T.purple, blurb: "A prompt with an open text field for respondents to type their own answer." },
};

// ═══════════════════════════════════════════════════════════════
// SAMPLE DATA
// ═══════════════════════════════════════════════════════════════
const sampleSurveys = [
  {
    id: "survey-1",
    surveyName: "HenryTestQuiz",
    description: "this is just a test to see how this will work",
    company: "Personalyz",
    sections: 7,
    submissions: 2,
    created: "11 Jun 2026",
    image: "",
    details: { description: "this is just a test to see how this will work", image: "", customHtmlEnabled: false, customHtml: "", pagedView: true },
    sessions: [
      {
        id: "sess-1",
        label: "Pretoria Conference — 11 Jun 2026, 23:12",
        url: "http://localhost:4201/surveys/personalyz/henrytestquiz/9589c328",
        registered: 205, complete: 0, inProgress: 78, notStarted: 127,
        participants: [
          { name: "Anella Conradie", phone: "+27825747580", email: "anella@shanghai.co.za", answered: 4, status: "inProgress", time: "12 Jun 2026" },
          { name: "Henry Oertel", phone: "+27836751117", email: "oertel.henry@gmail.com", answered: 1, status: "inProgress", time: "11 Jun 2026" },
          { name: "Sarah Botha", phone: "+27711234567", email: "sarah.b@example.com", answered: 7, status: "complete", time: "12 Jun 2026" },
          { name: "Pieter van Wyk", phone: "+27829876543", email: "pvw@company.co.za", answered: 0, status: "notStarted", time: "" },
        ],
        questionStats: [
          { id: "sec-1", question: "Top 3 Brands Financed by ALPHERA 2025 (New cars only)", type: "multipleChoice", answered: 2, total: 205, options: [{ text: "Land Rover", votes: 1 }, { text: "Porche", votes: 2 }, { text: "Toyota", votes: 1 }, { text: "Ford", votes: 1 }, { text: "BMW", votes: 1 }] },
          { id: "sec-2", question: "Top 3 Brands Financed by ALPHERA 2025 (Used cars only)", type: "multipleChoice", answered: 1, total: 205, options: [{ text: "Land Rover", votes: 0 }, { text: "Porche", votes: 1 }, { text: "Toyota", votes: 1 }, { text: "Ford", votes: 0 }, { text: "BMW", votes: 1 }] },
          { id: "sec-3", question: "Total Amount paid for May and October DIC Sprint", type: "multipleChoice", answered: 1, total: 205, options: [{ text: "R 1,987,684", votes: 0 }, { text: "R 2,999,684", votes: 0 }, { text: "R 2,798,684", votes: 1 }] },
          { id: "sec-4", question: "Average Amount Financed New", type: "multipleChoice", answered: 1, total: 205, options: [{ text: "R 1,133,624", votes: 0 }, { text: "R 4,000,889", votes: 0 }, { text: "R 2,909,624", votes: 1 }] },
          { id: "sec-5", question: "Ferraris, Lamborghini, Aston Martin and Bentley Financed", type: "multipleChoice", answered: 0, total: 205, options: [{ text: "60", votes: 0 }, { text: "70", votes: 0 }, { text: "45", votes: 0 }] },
          { id: "sec-6", question: "Highest Volume per dealer for a month", type: "multipleChoice", answered: 0, total: 205, options: [{ text: "R 37,8 mil", votes: 0 }, { text: "R 57 mil", votes: 0 }, { text: "R 80.8 mil", votes: 0 }] },
          { id: "sec-7", question: "What can we do better", type: "freeText", answered: 0, total: 205, responses: [] },
        ],
      },
    ],
    sectionData: [
      { id: "sec-1", type: "multipleChoice", sort: 0, question: "Top 3 Brands Financed by ALPHERA 2025 (New cars only)", description: "", allowMultiple: true, required: true, options: [{ id: "o1", text: "Land Rover", correct: false }, { id: "o2", text: "Porche", correct: true }, { id: "o3", text: "Toyota", correct: false }, { id: "o4", text: "Ford", correct: true }, { id: "o5", text: "BMW", correct: true }] },
      { id: "sec-2", type: "multipleChoice", sort: 1, question: "Top 3 Brands Financed by ALPHERA 2025 (Used cars only)", description: "", allowMultiple: true, required: true, options: [{ id: "o6", text: "Land Rover", correct: false }, { id: "o7", text: "Porche", correct: true }, { id: "o8", text: "Toyota", correct: true }, { id: "o9", text: "Ford", correct: true }, { id: "o10", text: "BMW", correct: false }] },
      { id: "sec-3", type: "multipleChoice", sort: 2, question: "Total Amount paid for May and October DIC Sprint", description: "", allowMultiple: false, required: true, options: [{ id: "o11", text: "R 1,987,684", correct: false }, { id: "o12", text: "R 2,999,684", correct: true }, { id: "o13", text: "R 2,798,684", correct: false }] },
      { id: "sec-4", type: "multipleChoice", sort: 3, question: "Highest Volume per dealer for a month", description: "", allowMultiple: false, required: true, options: [{ id: "o14", text: "R 37,8 mil", correct: false }, { id: "o15", text: "R 57 mil", correct: false }, { id: "o16", text: "R 80.8 mil", correct: false }] },
      { id: "sec-7", type: "freeText", sort: 4, question: "What can we do better", description: "please add any suggestions", required: true, placeholder: "Type your answer here...", multiline: true },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "allcards", label: "All Cards", icon: "cards" },
  { id: "surveys", label: "Surveys", icon: "surveys" },
  { id: "microsites", label: "Microsites", icon: "microsites" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "users", label: "Users", icon: "users" },
  { id: "companies", label: "Companies", icon: "companies" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
  { id: "qrcode", label: "QR Code", icon: "qrcode" },
  { id: "help", label: "Help", icon: "help" },
  { id: "imports", label: "Imports", icon: "imports" },
];

function Sidebar({ activeNav, onNavClick }) {
  return (
    <div style={{ width: 220, flexShrink: 0, background: T.sidebarBg, borderRight: `1px solid ${T.sidebarBorder}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.sidebarBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: "#fff", fontFamily: font.ui }}>P</div>
        <span style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>Personalyz</span>
      </div>
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button key={item.id} onClick={() => onNavClick(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 12px", border: "none", borderRadius: T.radiusSm, cursor: "pointer", background: isActive ? T.sidebarActive : "transparent", color: isActive ? T.sidebarActiveText : T.sidebarText, fontFamily: font.ui, fontSize: 13, fontWeight: isActive ? 600 : 500, transition: "all 0.12s", marginBottom: 1, textAlign: "left" }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = T.surfaceAlt; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
              <Icon name={item.icon} size={16} color={isActive ? T.accent : T.sub} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.sidebarBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: font.ui, flexShrink: 0 }}>HO</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Henry</div>
          <div style={{ fontSize: 11, color: T.sub, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>oertel.henry@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DONUT CHART — SVG participation ring
// ═══════════════════════════════════════════════════════════════
function DonutChart({ answered, total, size = 80, strokeWidth = 9 }) {
  const pct = total > 0 ? Math.min(answered / total, 1) : 0;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const isComplete = pct >= 1;
  const fillColor = isComplete ? T.success : pct > 0.6 ? T.accent : pct > 0 ? T.warning : "#E5E7EB";

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
        {pct > 0 && (
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={fillColor} strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.3s" }} />
        )}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 800, color: pct > 0 ? fillColor : T.muted, fontFamily: font.ui }}>{answered}</span>
        <span style={{ fontSize: size * 0.14, color: T.muted, fontFamily: font.ui, marginTop: 1 }}>/ {total}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// QUESTION RESULT CARD
// ═══════════════════════════════════════════════════════════════
function QuestionResultCard({ stat, index }) {
  const [answersVisible, setAnswersVisible] = useState(false);
  const pct = stat.total > 0 ? Math.round((stat.answered / stat.total) * 100) : 0;
  const maxVotes = stat.options ? Math.max(...stat.options.map((o) => o.votes), 1) : 1;
  const isComplete = pct >= 100;
  const hasActivity = stat.answered > 0;
  const statusColor = isComplete ? T.success : hasActivity ? T.warning : T.muted;
  const statusLabel = isComplete ? "Complete" : hasActivity ? "In Progress" : "Not Started";
  const statusBg = isComplete ? T.successSoft : hasActivity ? T.warningSoft : T.faint;
  const hasAnswerContent = (stat.type === "multipleChoice" && stat.options) || stat.type === "freeText";

  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${isComplete ? "#86EFAC" : T.border}`, marginBottom: 12, overflow: "hidden", transition: "border-color 0.3s" }}>
      {/* Header row with donut */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", background: T.surfaceAlt, borderBottom: hasAnswerContent ? `1px solid ${T.borderLight}` : "none" }}>
        <DonutChart answered={stat.answered} total={stat.total} size={72} strokeWidth={8} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: font.ui, flexShrink: 0 }}>{index + 1}</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: font.ui, lineHeight: 1.3 }}>{stat.question}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>{stat.answered} / {stat.total} answered ({pct}%)</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: statusBg, color: statusColor, fontFamily: font.ui }}>{statusLabel}</span>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: statusColor, fontFamily: font.ui, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 11, color: T.muted, fontFamily: font.ui }}>participation</div>
        </div>
      </div>

      {/* Reveal answers toggle footer */}
      {hasAnswerContent && (
        <button
          onClick={() => setAnswersVisible(!answersVisible)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: answersVisible ? "7px 18px" : "9px 18px",
            border: "none", background: answersVisible ? T.surface : T.faint,
            cursor: "pointer", fontFamily: font.ui, fontSize: 12, fontWeight: 600,
            color: answersVisible ? T.sub : T.ink2,
            borderTop: answersVisible ? `1px solid ${T.borderLight}` : "none",
            transition: "all 0.15s",
          }}
        >
          <Icon name={answersVisible ? "chevUp" : "eye"} size={13} color={answersVisible ? T.muted : T.accent} />
          {answersVisible ? "Hide answers" : "Reveal answers"}
        </button>
      )}

      {/* Answer bars — only shown when revealed */}
      {answersVisible && stat.type === "multipleChoice" && stat.options && (
        <div style={{ padding: "10px 18px 14px" }}>
          {stat.options.map((opt, i) => {
            const barPct = stat.answered > 0 ? Math.round((opt.votes / stat.answered) * 100) : 0;
            const barWidth = maxVotes > 0 ? (opt.votes / maxVotes) * 100 : 0;
            const isTop = opt.votes > 0 && opt.votes === Math.max(...stat.options.map((o) => o.votes));
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <div style={{ width: 110, fontSize: 12, color: T.ink2, fontFamily: font.ui, flexShrink: 0, fontWeight: isTop ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opt.text}</div>
                <div style={{ flex: 1, height: 10, background: T.faint, borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${barWidth}%`, background: isTop ? T.accent : "#93C5FD", borderRadius: 5, transition: "width 0.5s ease" }} />
                </div>
                <div style={{ width: 16, fontSize: 12, fontWeight: 600, color: isTop ? T.accent : T.sub, fontFamily: font.ui, textAlign: "right", flexShrink: 0 }}>{opt.votes}</div>
                <div style={{ width: 34, fontSize: 11, color: T.muted, fontFamily: font.ui, textAlign: "right", flexShrink: 0 }}>{barPct}%</div>
              </div>
            );
          })}
        </div>
      )}

      {answersVisible && stat.type === "freeText" && (
        <div style={{ padding: "10px 18px 14px" }}>
          {stat.answered === 0
            ? <p style={{ fontSize: 12, color: T.muted, fontFamily: font.ui, margin: 0, fontStyle: "italic" }}>Free text — 0 responses</p>
            : (stat.responses || []).map((r, i) => <div key={i} style={{ fontSize: 12, color: T.ink2, fontFamily: font.ui, padding: "6px 10px", background: T.surfaceAlt, borderRadius: 4, marginBottom: 4 }}>{r}</div>)
          }
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RESULTS VIEW
// ═══════════════════════════════════════════════════════════════
function ResultsView({ surveys }) {
  const [selectedSurveyId, setSelectedSurveyId] = useState(surveys[0]?.id || null);
  const [selectedSessionIdx, setSelectedSessionIdx] = useState(0);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [sessionDropOpen, setSessionDropOpen] = useState(false);
  const sessionDropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (sessionDropRef.current && !sessionDropRef.current.contains(e.target)) setSessionDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const survey = surveys.find((s) => s.id === selectedSurveyId);
  const session = survey?.sessions?.[selectedSessionIdx];

  if (!survey || !session) {
    return (
      <div style={{ padding: "48px 28px", textAlign: "center" }}>
        <Icon name="analytics" size={36} color={T.muted} />
        <p style={{ fontSize: 15, fontWeight: 600, color: T.ink, margin: "12px 0 4px", fontFamily: font.ui }}>No results yet</p>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: font.ui }}>Survey responses will appear here once sessions are created.</p>
      </div>
    );
  }

  const totalQ = session.questionStats.length;
  const fullyAnswered = session.questionStats.filter((q) => q.answered >= q.total && q.total > 0).length;
  const activeParticipants = session.inProgress + session.complete;
  const activePct = session.registered > 0 ? Math.round((activeParticipants / session.registered) * 100) : 0;

  return (
    <div style={{ padding: "0 0 32px" }}>

      {/* ── Survey picker + status counters ─────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <select value={selectedSurveyId} onChange={(e) => { setSelectedSurveyId(e.target.value); setSelectedSessionIdx(0); }}
            style={{ padding: "7px 32px 7px 12px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontWeight: 600, fontFamily: font.ui, color: T.ink, background: T.surface, outline: "none", appearance: "none", cursor: "pointer", minWidth: 200 }}>
            {surveys.map((s) => <option key={s.id} value={s.id}>{s.surveyName}</option>)}
          </select>
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Icon name="chevDown" size={13} color={T.sub} />
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Status tiles */}
        {[
          { value: session.complete, label: "COMPLETE", accent: T.success },
          { value: session.inProgress, label: "IN PROGRESS", accent: T.warning },
          { value: session.notStarted, label: "NOT STARTED", accent: T.muted },
          { value: session.registered, label: "REGISTERED", accent: T.accent },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 16px", borderRadius: T.radius, border: `1.5px solid ${s.accent}33`, background: T.surface, minWidth: 84 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: s.accent, fontFamily: font.ui, lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: font.ui, letterSpacing: "0.06em", marginTop: 3 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Live participation bar ───────────────────────────── */}
      <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: "14px 18px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="zap" size={15} color={T.accent} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>Live Participation</span>
            <span style={{ fontSize: 12, color: T.muted, fontFamily: font.ui }}>{activeParticipants} of {session.registered} active</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, color: T.accent, fontFamily: font.ui }}>{activePct}%</span>
        </div>
        <div style={{ height: 12, background: T.faint, borderRadius: 6, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: `${activePct}%`, background: `linear-gradient(90deg, ${T.accent}, #60A5FA)`, borderRadius: 6, transition: "width 0.6s ease" }} />
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {[{ label: "Complete", value: session.complete, color: T.success }, { label: "Started", value: session.inProgress, color: T.accent }, { label: "Not started", value: session.notStarted, color: T.muted }].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
              <span style={{ fontSize: 11, color: T.sub, fontFamily: font.ui }}>{item.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: font.ui }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Session selector + URL ───────────────────────────── */}
      <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ padding: "9px 16px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="session" size={13} color={T.sub} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.muted, fontFamily: font.ui }}>Sessions</span>
          </div>
          <Btn variant="outline" size="xs" icon={<Icon name="plus" size={11} color={T.accent} />}>New Session</Btn>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          {/* Session dropdown */}
          <div ref={sessionDropRef} style={{ position: "relative", minWidth: 260 }}>
            <button onClick={() => setSessionDropOpen(!sessionDropOpen)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 11px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface, cursor: "pointer", fontFamily: font.ui, fontSize: 13, color: T.ink, textAlign: "left" }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.label}</span>
              <Icon name="chevDown" size={13} color={T.sub} />
            </button>
            {sessionDropOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 50, background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, boxShadow: T.shadowMd }}>
                {survey.sessions.map((s, idx) => (
                  <button key={s.id} onClick={() => { setSelectedSessionIdx(idx); setSessionDropOpen(false); }} style={{ width: "100%", padding: "9px 12px", border: "none", background: idx === selectedSessionIdx ? T.accentSoft : "transparent", cursor: "pointer", fontFamily: font.ui, fontSize: 13, color: idx === selectedSessionIdx ? T.accent : T.ink, textAlign: "left" }}>{s.label}</button>
                ))}
              </div>
            )}
          </div>
          {/* URL */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, padding: "7px 11px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surfaceAlt, fontSize: 12, color: T.sub, fontFamily: font.mono, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.url}</div>
            <Btn variant="secondary" size="sm" icon={<Icon name="link" size={13} />}>Copy URL</Btn>
          </div>
        </div>
      </div>

      {/* ── Participants — collapsible ───────────────────────── */}
      <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 18, overflow: "hidden" }}>
        <button onClick={() => setParticipantsOpen(!participantsOpen)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", border: "none", background: T.surfaceAlt, cursor: "pointer", borderBottom: participantsOpen ? `1px solid ${T.border}` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="users" size={13} color={T.sub} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.muted, fontFamily: font.ui }}>Participants</span>
            <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>— {session.participants.filter((p) => p.status !== "notStarted").length} started, {session.participants.filter((p) => p.status === "complete").length} complete</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: T.muted, fontFamily: font.ui }}>{participantsOpen ? "Hide" : "Show"}</span>
            <Icon name={participantsOpen ? "chevUp" : "chevDown"} size={13} color={T.muted} />
          </div>
        </button>

        {participantsOpen && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) 1fr 70px 110px 100px", padding: "8px 16px", background: T.surfaceAlt, borderBottom: `1px solid ${T.borderLight}` }}>
              {["NAME", "EMAIL", "ANSWERED", "STATUS", "TIME"].map((h) => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.muted, fontFamily: font.ui }}>{h}</span>
              ))}
            </div>
            {session.participants.map((p, i) => {
              const sc = { complete: { color: T.success, bg: T.successSoft, label: "Complete" }, inProgress: { color: T.warning, bg: T.warningSoft, label: "In Progress" }, notStarted: { color: T.muted, bg: T.faint, label: "Not Started" } }[p.status] || { color: T.muted, bg: T.faint, label: "—" };
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) 1fr 70px 110px 100px", padding: "10px 16px", borderBottom: `1px solid ${T.borderLight}`, alignItems: "center" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = T.surfaceAlt}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: T.muted, fontFamily: font.ui }}>{p.phone}</div>
                  </div>
                  <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>{p.email}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{p.answered}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: sc.bg, color: sc.color, fontFamily: font.ui, display: "inline-block" }}>{sc.label}</span>
                  <span style={{ fontSize: 12, color: T.muted, fontFamily: font.ui }}>{p.time}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Question Breakdown ──────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Icon name="analytics" size={15} color={T.sub} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.muted, fontFamily: font.ui }}>Question Breakdown</span>
        <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>{fullyAnswered} of {totalQ} fully answered</span>
      </div>

      {session.questionStats.map((stat, idx) => (
        <QuestionResultCard key={stat.id} stat={stat} index={idx} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SURVEYS LIST VIEW
// ═══════════════════════════════════════════════════════════════
function SurveysListView({ surveys, onEdit, onCreate }) {
  const [tab, setTab] = useState("surveys");
  const [search, setSearch] = useState("");
  const filtered = surveys.filter((s) => s.surveyName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="search" size={14} color={T.muted} /></div>
          <input placeholder="Search...  ⌘K" style={{ paddingLeft: 30, paddingRight: 12, height: 34, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: font.ui, color: T.ink, background: T.surfaceAlt, outline: "none", width: 200 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6 }}><Icon name="moon" size={18} color={T.sub} /></button>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: font.ui }}>HO</div>
        </div>
      </div>

      {/* Page header */}
      <div style={{ background: T.surface, padding: "18px 28px 0", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, fontFamily: font.ui, margin: 0 }}>Surveys</h1>
            <p style={{ fontSize: 13, color: T.sub, margin: "2px 0 14px", fontFamily: font.ui }}>Surveys across all companies</p>
          </div>
          <Btn icon={<Icon name="plus" size={14} color="#fff" />} onClick={onCreate} style={{ marginTop: 4 }}>New Survey</Btn>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px 28px", background: T.bg }}>
        {/* Filter row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="search" size={13} color={T.muted} /></div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search surveys..." style={{ paddingLeft: 30, paddingRight: 12, height: 34, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: font.ui, color: T.ink, background: T.surface, outline: "none", width: 220 }} />
          </div>
          <div style={{ position: "relative" }}>
            <select style={{ padding: "6px 28px 6px 12px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: font.ui, color: T.ink, background: T.surface, outline: "none", appearance: "none", cursor: "pointer", height: 34 }}>
              <option>All Companies</option><option>Personalyz</option>
            </select>
            <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="chevDown" size={13} color={T.sub} /></div>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {[{ id: "surveys", label: `Surveys ${surveys.length}` }, { id: "results", label: "Results" }].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "6px 14px", border: "none", borderRadius: T.radiusSm, cursor: "pointer", fontFamily: font.ui, fontSize: 13, fontWeight: tab === t.id ? 600 : 500, background: tab === t.id ? T.accent : "transparent", color: tab === t.id ? "#fff" : T.sub, transition: "all 0.12s" }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Surveys table */}
        {tab === "surveys" && (
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 160px 100px 120px 130px 60px", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt }}>
              {["SURVEY", "COMPANY / UNIT", "SECTIONS", "SUBMISSIONS", "CREATED", ""].map((h, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 700, color: T.muted, fontFamily: font.ui, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>
            {filtered.length === 0
              ? <div style={{ padding: "40px 16px", textAlign: "center", color: T.muted, fontSize: 13, fontFamily: font.ui }}>No surveys found.</div>
              : filtered.map((survey, i) => (
                <div key={survey.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 160px 100px 120px 130px 60px", padding: "14px 16px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "center" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = T.surfaceAlt}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 6, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="surveys" size={16} color={T.accent} /></div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{survey.surveyName}</div>
                      <div style={{ fontSize: 12, color: T.sub, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{survey.description}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: T.ink, fontFamily: font.ui }}>{survey.company}</span>
                  <span style={{ fontSize: 13, color: T.ink, fontFamily: font.ui }}>{survey.sections}</span>
                  <span style={{ fontSize: 13, color: T.ink, fontFamily: font.ui }}>{survey.submissions}</span>
                  <span style={{ fontSize: 13, color: T.ink, fontFamily: font.ui }}>{survey.created}</span>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button onClick={() => onEdit(survey)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4 }} title="Edit"><Icon name="edit" size={16} color={T.muted} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4 }} title="Delete"><Icon name="trash" size={16} color={T.muted} /></button>
                  </div>
                </div>
              ))
            }
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 13, color: T.sub, fontFamily: font.ui }}>Showing 1–{filtered.length} of {filtered.length} surveys</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button style={{ width: 28, height: 28, borderRadius: 4, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="chevLeft" size={13} color={T.muted} /></button>
                <button style={{ width: 28, height: 28, borderRadius: 4, border: "none", background: T.accent, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: font.ui }}>1</button>
                <button style={{ width: 28, height: 28, borderRadius: 4, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="chevRight" size={13} color={T.muted} /></button>
                <span style={{ fontSize: 13, color: T.sub, fontFamily: font.ui, marginLeft: 8 }}>Per page</span>
                <div style={{ position: "relative" }}>
                  <select style={{ padding: "4px 24px 4px 8px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 12, fontFamily: font.ui, background: T.surface, outline: "none", appearance: "none", cursor: "pointer" }}>
                    <option>10</option><option>25</option><option>50</option>
                  </select>
                  <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="chevDown" size={11} color={T.sub} /></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results tab */}
        {tab === "results" && <ResultsView surveys={surveys} />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDITOR TOP BAR
// ═══════════════════════════════════════════════════════════════
function EditorTopBar({ surveyName, onBack, onCancel, onSave }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 40, background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", minHeight: 52 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4, display: "flex", alignItems: "center" }}><Icon name="chevLeft" size={18} color={T.sub} /></button>
        <div style={{ width: 30, height: 30, borderRadius: 6, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="surveys" size={15} color={T.accent} /></div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>{surveyName}</span>
            <Badge label="Survey" variant="accent" />
          </div>
          <p style={{ fontSize: 11, color: T.sub, margin: 0, fontFamily: font.ui }}>Editing existing survey</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Btn variant="ghost" size="sm" icon={<Icon name="x" size={13} color={T.sub} />} onClick={onCancel}>Cancel</Btn>
        <Btn size="sm" icon={<Icon name="check" size={13} color="#fff" />} onClick={onSave}>Save Changes</Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SURVEY DETAILS PANEL
// ═══════════════════════════════════════════════════════════════
function SurveyDetailsPanel({ surveyName, details, onChangeName, onChange }) {
  const [tab, setTab] = useState("details");
  const fileRef = useRef(null);
  const set = (patch) => onChange({ ...details, ...patch });
  const handleImageFile = (file) => { if (!file) return; const reader = new FileReader(); reader.onload = () => set({ image: reader.result }); reader.readAsDataURL(file); };
  const tabs = [{ id: "details", label: "Details", icon: "surveys" }, { id: "html", label: "Custom HTML", icon: "code" }];

  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 20, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px 0", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="surveys" size={13} color={T.accent} /></div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: font.ui, margin: 0 }}>Survey Details</h3>
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "none", background: "transparent", cursor: "pointer", fontFamily: font.ui, fontSize: 13, fontWeight: tab === t.id ? 600 : 500, color: tab === t.id ? T.accent : T.sub, borderBottom: tab === t.id ? `2px solid ${T.accent}` : "2px solid transparent", marginBottom: -1, transition: "all 0.12s" }}>
              <Icon name={t.icon} size={13} color={tab === t.id ? T.accent : T.sub} />{t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "details" && (
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>Survey Name</label>
            <input value={surveyName} onChange={(e) => onChangeName(e.target.value)} style={{ width: "100%", padding: "8px 12px", fontSize: 14, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>Description</label>
            <textarea value={details.description} onChange={(e) => set({ description: e.target.value })} rows={3} style={{ width: "100%", padding: "8px 12px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 6, fontFamily: font.ui }}>Survey Image</label>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 90, height: 80, borderRadius: T.radiusSm, overflow: "hidden", border: `1px solid ${T.border}`, background: T.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {details.image ? <img src={details.image} alt="Survey" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Icon name="photo" size={24} color={T.muted} />}
              </div>
              <div style={{ flex: 1 }}>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageFile(e.target.files?.[0])} />
                <Btn variant="outline" size="sm" icon={<Icon name="upload" size={13} color={T.accent} />} onClick={() => fileRef.current?.click()} style={{ marginBottom: 6 }}>Upload Image</Btn>
                <p style={{ fontSize: 11, color: T.muted, margin: "4px 0 6px", fontFamily: font.ui }}>Recommended: 800×400px · JPG/PNG · Max 2MB</p>
                <input value={details.image?.startsWith("data:") ? "" : (details.image || "")} onChange={(e) => set({ image: e.target.value })} placeholder="https://..." style={{ width: "100%", padding: "5px 9px", fontSize: 11, fontFamily: font.mono, border: `1px solid ${T.border}`, borderRadius: 4, background: T.surface, color: T.sub, outline: "none", boxSizing: "border-box" }} />
                {details.image && <button onClick={() => set({ image: "" })} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: T.sub, fontFamily: font.ui, marginTop: 4, display: "flex", alignItems: "center", gap: 4, padding: 0 }}><Icon name="x" size={11} color={T.sub} /> Remove Image</button>}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surfaceAlt }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Toggle on={details.pagedView !== false} onToggle={() => set({ pagedView: !details.pagedView })} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Paged view</div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: font.ui }}>Show one question at a time with Next / Back navigation</div>
              </div>
            </div>
            {details.pagedView !== false && <Badge label="Paged" variant="success" />}
          </div>
        </div>
      )}

      {tab === "html" && (
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: T.radiusSm, background: T.surfaceAlt, border: `1px solid ${T.borderLight}`, marginBottom: 14 }}>
            <Toggle on={details.customHtmlEnabled} onToggle={() => set({ customHtmlEnabled: !details.customHtmlEnabled })} size="sm" />
            <div><span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Enable Custom HTML</span><span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>Inject custom markup into the survey card</span></div>
          </div>
          <textarea value={details.customHtml} onChange={(e) => set({ customHtml: e.target.value })} disabled={!details.customHtmlEnabled} placeholder={'<div class="banner">\n  <h2>Welcome!</h2>\n</div>'} spellCheck={false} rows={8} style={{ width: "100%", padding: "10px 12px", fontSize: 12, fontFamily: font.mono, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: details.customHtmlEnabled ? T.surface : T.faint, color: details.customHtmlEnabled ? T.ink : T.muted, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// OPTION ROW
// ═══════════════════════════════════════════════════════════════
function OptionRow({ option, index, allowMultiple, onChange, onToggleCorrect, onDelete, isOnly }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", border: `1px solid ${option.correct ? "#86EFAC" : T.border}`, background: option.correct ? T.successSoft : T.surface, borderRadius: T.radiusSm, marginBottom: 5, transition: "all 0.15s" }}>
      <div style={{ cursor: "grab", flexShrink: 0 }}><Icon name="grip" size={11} color={T.muted} /></div>
      <button onClick={onToggleCorrect} style={{ width: 20, height: 20, flexShrink: 0, cursor: "pointer", padding: 0, borderRadius: allowMultiple ? 4 : "50%", border: `2px solid ${option.correct ? T.success : "#D1D5DB"}`, background: option.correct ? T.success : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {option.correct && <Icon name="check" size={11} color="#fff" />}
      </button>
      <input value={option.text} onChange={(e) => onChange({ ...option, text: e.target.value })} placeholder={`Option ${index + 1}`} style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, fontFamily: font.ui, color: T.ink, outline: "none", fontWeight: option.correct ? 600 : 400 }} />
      {option.correct && <Badge label="Correct" variant="success" />}
      <button onClick={onDelete} disabled={isOnly} style={{ width: 22, height: 22, borderRadius: 4, border: "none", flexShrink: 0, background: "transparent", cursor: isOnly ? "not-allowed" : "pointer", opacity: isOnly ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="x" size={12} color={T.muted} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MULTIPLE CHOICE BODY
// ═══════════════════════════════════════════════════════════════
function MultipleChoiceBody({ section, onChange }) {
  const set = (patch) => onChange({ ...section, ...patch });
  const updateOption = (idx, next) => { const options = [...section.options]; options[idx] = next; set({ options }); };
  const toggleCorrect = (idx) => { let opts = [...section.options]; if (section.allowMultiple) { opts[idx] = { ...opts[idx], correct: !opts[idx].correct }; } else { opts = opts.map((o, i) => ({ ...o, correct: i === idx ? !o.correct : false })); } set({ options: opts }); };
  const addOption = () => set({ options: [...section.options, { id: uid("opt"), text: "", correct: false }] });
  const deleteOption = (idx) => set({ options: section.options.filter((_, i) => i !== idx) });
  const toggleAllowMultiple = () => { const am = !section.allowMultiple; let opts = section.options; if (!am) { let seen = false; opts = opts.map((o) => { if (o.correct && !seen) { seen = true; return o; } return { ...o, correct: false }; }); } set({ allowMultiple: am, options: opts }); };
  const correctCount = section.options.filter((o) => o.correct).length;

  return (
    <div style={{ padding: "12px 16px 14px" }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4, fontFamily: font.ui }}>Question</label>
      <input value={section.question} onChange={(e) => set({ question: e.target.value })} placeholder="e.g. Which of these are correct?" style={{ width: "100%", padding: "8px 11px", fontSize: 13, fontWeight: 600, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: "#fff", color: T.ink, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4, fontFamily: font.ui }}>Helper text <span style={{ color: T.muted, fontWeight: 400 }}>(optional)</span></label>
      <input value={section.description} onChange={(e) => set({ description: e.target.value })} placeholder="e.g. Select all that apply." style={{ width: "100%", padding: "7px 11px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: "#fff", color: T.ink2, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.ui, textTransform: "uppercase" }}>ANSWERS</span>
          <Badge label={`${correctCount} correct`} variant={correctCount > 0 ? "success" : "muted"} />
        </div>
        <Toggle on={section.allowMultiple} onToggle={toggleAllowMultiple} label="Allow multiple" size="sm" />
      </div>
      <p style={{ fontSize: 11, color: T.muted, margin: "0 0 8px", fontFamily: font.ui }}>Tap the {section.allowMultiple ? "checkbox" : "circle"} to flag an answer as correct. Correct answers drive real-time progress scoring on the backend.</p>
      {section.options.map((opt, idx) => <OptionRow key={opt.id} option={opt} index={idx} allowMultiple={section.allowMultiple} onChange={(next) => updateOption(idx, next)} onToggleCorrect={() => toggleCorrect(idx)} onDelete={() => deleteOption(idx)} isOnly={section.options.length <= 1} />)}
      <button onClick={addOption} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: T.accent, fontFamily: font.ui, padding: "4px 0", marginTop: 4 }}>
        <Icon name="plus" size={13} color={T.accent} /> Add Option
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FREE TEXT BODY
// ═══════════════════════════════════════════════════════════════
function FreeTextBody({ section, onChange }) {
  const set = (patch) => onChange({ ...section, ...patch });
  return (
    <div style={{ padding: "12px 16px 14px" }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4, fontFamily: font.ui }}>Prompt / Question</label>
      <input value={section.question} onChange={(e) => set({ question: e.target.value })} placeholder="e.g. What could we improve?" style={{ width: "100%", padding: "8px 11px", fontSize: 13, fontWeight: 600, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: "#fff", color: T.ink, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4, fontFamily: font.ui }}>Helper text <span style={{ color: T.muted, fontWeight: 400 }}>(optional)</span></label>
      <input value={section.description} onChange={(e) => set({ description: e.target.value })} placeholder="Extra guidance…" style={{ width: "100%", padding: "7px 11px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: "#fff", color: T.ink2, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.ui, textTransform: "uppercase", marginBottom: 6 }}>Respondent's Answer Field</label>
      <div style={{ border: `1px dashed ${T.border}`, borderRadius: T.radiusSm, background: T.surfaceAlt, padding: 10, marginBottom: 14 }}>
        {section.multiline ? <textarea disabled placeholder={section.placeholder || "Type your answer here…"} rows={3} style={{ width: "100%", padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: 4, background: "#fff", color: T.muted, outline: "none", resize: "none", boxSizing: "border-box" }} />
          : <input disabled placeholder={section.placeholder || "Type your answer here…"} style={{ width: "100%", padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: 4, background: "#fff", color: T.muted, outline: "none", boxSizing: "border-box" }} />}
        <p style={{ fontSize: 11, color: T.muted, margin: "6px 0 0", fontFamily: font.ui }}>Preview only — respondents fill this in on the live card.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "flex-end" }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4, fontFamily: font.ui }}>Placeholder text</label>
          <input value={section.placeholder} onChange={(e) => set({ placeholder: e.target.value })} placeholder="Type your answer here…" style={{ width: "100%", padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: 4, background: "#fff", color: T.ink, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ paddingBottom: 2 }}><Toggle on={section.multiline} onToggle={() => set({ multiline: !section.multiline })} label="Multi-line answer" size="sm" /></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION CARD
// ═══════════════════════════════════════════════════════════════
function SectionCard({ section, index, total, onChange, onDelete, onDuplicate, onMove }) {
  const [collapsed, setCollapsed] = useState(false);
  const meta = SECTION_TYPES[section.type];
  const summary = section.type === "multipleChoice" ? `${section.options.length} options` : section.multiline ? "Long answer" : "Short answer";
  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderBottom: collapsed ? "none" : `1px solid ${T.borderLight}`, background: T.surfaceAlt }}>
        <div style={{ cursor: "grab", flexShrink: 0 }}><Icon name="grip" size={13} color={T.muted} /></div>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: meta.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={meta.icon} size={13} color={meta.iconColor} /></div>
        <div onClick={() => setCollapsed(!collapsed)} style={{ flex: 1, minWidth: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, fontFamily: font.ui, width: 16, flexShrink: 0, textAlign: "center" }}>{index + 1}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{section.question || <span style={{ color: T.muted, fontStyle: "italic" }}>Untitled</span>}</span>
        </div>
        <Badge label={meta.label} variant={meta.variant} />
        {section.required && <Badge label="Required" variant="warning" />}
        <Badge label={summary} variant="muted" />
        <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
          <button onClick={() => onMove(-1)} disabled={index === 0} style={{ width: 22, height: 22, borderRadius: 3, border: "none", background: "transparent", cursor: index === 0 ? "not-allowed" : "pointer", opacity: index === 0 ? 0.3 : 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="arrowUp" size={11} color={T.sub} /></button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} style={{ width: 22, height: 22, borderRadius: 3, border: "none", background: "transparent", cursor: index === total - 1 ? "not-allowed" : "pointer", opacity: index === total - 1 ? 0.3 : 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="arrowDown" size={11} color={T.sub} /></button>
        </div>
        <button onClick={() => setCollapsed(!collapsed)} style={{ width: 24, height: 24, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={collapsed ? "chevDown" : "chevUp"} size={13} color={T.sub} /></button>
      </div>
      {!collapsed && (
        <>
          {section.type === "multipleChoice" ? <MultipleChoiceBody section={section} onChange={onChange} /> : <FreeTextBody section={section} onChange={onChange} />}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderTop: `1px solid ${T.borderLight}`, background: T.surfaceAlt }}>
            <Toggle on={section.required} onToggle={() => onChange({ ...section, required: !section.required })} label="Required" size="sm" />
            <div style={{ display: "flex", gap: 6 }}>
              <Btn variant="ghost" size="xs" icon={<Icon name="copy" size={11} />} onClick={onDuplicate}>Duplicate</Btn>
              <Btn variant="ghostRed" size="xs" icon={<Icon name="trash" size={11} color={T.danger} />} onClick={onDelete}>Delete</Btn>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADD SECTION MENU
// ═══════════════════════════════════════════════════════════════
function AddSectionMenu({ onAdd }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <Btn size="sm" icon={<Icon name="plus" size={13} color="#fff" />} onClick={() => setOpen(!open)}>Add Section</Btn>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 50, width: 300, background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadowMd, overflow: "hidden", padding: 6 }}>
          <div style={{ padding: "7px 10px 5px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.ui, textTransform: "uppercase" }}>Choose a section type</div>
          {Object.entries(SECTION_TYPES).map(([type, m]) => (
            <button key={type} onClick={() => { onAdd(type); setOpen(false); }} style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%", textAlign: "left", padding: "9px 10px", border: "none", background: "transparent", cursor: "pointer", borderRadius: T.radiusSm, transition: "background 0.12s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.surfaceAlt)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: m.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={m.icon} size={15} color={m.iconColor} /></div>
              <div><div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>{m.label}</div><div style={{ fontSize: 12, color: T.sub, fontFamily: font.ui, lineHeight: 1.4, marginTop: 2 }}>{m.blurb}</div></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHONE PREVIEW
// ═══════════════════════════════════════════════════════════════
function PhonePreview({ survey }) {
  return (
    <div style={{ width: 230, flexShrink: 0, padding: "14px 16px", borderLeft: `1px solid ${T.border}`, background: T.surface, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.sub, fontFamily: font.ui, marginBottom: 14, letterSpacing: "0.04em", textTransform: "uppercase", alignSelf: "flex-start" }}>Preview</div>
      <div style={{ width: 180, borderRadius: 24, border: "6px solid #1A1A1A", overflow: "hidden", background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
        <div style={{ height: 8, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 40, height: 4, background: "#2a2a2a", borderRadius: 4 }} /></div>
        <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)", padding: "14px 12px 12px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -10, right: -10, width: 60, height: 60, borderRadius: "50%", border: "20px solid rgba(255,255,255,0.07)" }} />
          <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: font.ui, letterSpacing: "0.08em", marginBottom: 4 }}>◆ SURVEY</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: font.ui, lineHeight: 1.2, marginBottom: 4 }}>{survey.surveyName}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.75)", fontFamily: font.ui, lineHeight: 1.4 }}>{survey.details.description}</div>
        </div>
        <div style={{ padding: "10px 10px 14px", background: "#fff" }}>
          <div style={{ fontSize: 9, color: "#374151", fontFamily: font.ui, marginBottom: 8, lineHeight: 1.4 }}>Before we get started, please tell us a bit about yourself.</div>
          {[{ label: "First Name", req: true, placeholder: "Jane" }, { label: "Last Name", req: true, placeholder: "Smith" }, { label: "Email Address", req: true, placeholder: "jane@example.com" }, { label: "Phone", req: false }].map((f) => (
            <div key={f.label} style={{ marginBottom: 7 }}>
              <div style={{ fontSize: 8, fontWeight: 600, color: "#374151", fontFamily: font.ui, marginBottom: 2 }}>{f.label} {f.req && <span style={{ color: T.danger }}>*</span>}</div>
              <div style={{ border: `1px solid #E5E7EB`, borderRadius: 4, padding: "4px 7px", fontSize: 8, color: "#9CA3AF", fontFamily: font.ui, background: "#fff" }}>{f.placeholder || ""}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDITOR VIEW
// ═══════════════════════════════════════════════════════════════
function EditorView({ survey, onBack }) {
  const [data, setData] = useState(survey);
  const makeSection = (type) => { const base = { id: uid("sec"), type, sort: data.sectionData.length, question: "", description: "", required: false }; if (type === "multipleChoice") return { ...base, allowMultiple: false, options: [{ id: uid("opt"), text: "", correct: false }, { id: uid("opt"), text: "", correct: false }] }; return { ...base, placeholder: "Type your answer here...", multiline: true }; };
  const addSection = (type) => setData({ ...data, sectionData: [...data.sectionData, makeSection(type)] });
  const updateSection = (idx, next) => { const sd = [...data.sectionData]; sd[idx] = next; setData({ ...data, sectionData: sd }); };
  const deleteSection = (idx) => { const s = data.sectionData[idx]; if (!confirm(`Delete "${s.question || `Section ${idx + 1}`}"?`)) return; setData({ ...data, sectionData: data.sectionData.filter((_, i) => i !== idx) }); };
  const duplicateSection = (idx) => { const copy = JSON.parse(JSON.stringify(data.sectionData[idx])); copy.id = uid("sec"); if (copy.options) copy.options = copy.options.map((o) => ({ ...o, id: uid("opt") })); const sd = [...data.sectionData]; sd.splice(idx + 1, 0, copy); setData({ ...data, sectionData: sd }); };
  const moveSection = (idx, dir) => { const target = idx + dir; if (target < 0 || target >= data.sectionData.length) return; const sd = [...data.sectionData]; [sd[idx], sd[target]] = [sd[target], sd[idx]]; setData({ ...data, sectionData: sd }); };
  const mcCount = data.sectionData.filter((s) => s.type === "multipleChoice").length;
  const ftCount = data.sectionData.filter((s) => s.type === "freeText").length;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
      <EditorTopBar surveyName={data.surveyName} onBack={onBack} onCancel={onBack} onSave={() => alert("Changes saved!")} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: T.bg }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <SurveyDetailsPanel surveyName={data.surveyName} details={data.details} onChangeName={(surveyName) => setData({ ...data, surveyName })} onChange={(details) => setData({ ...data, details })} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font.ui, margin: 0 }}>Survey Sections</h2>
                <p style={{ fontSize: 12, color: T.sub, margin: "2px 0 0", fontFamily: font.ui }}>{data.sectionData.length} sections · {mcCount} multiple choice · {ftCount} answer block{ftCount !== 1 ? "s" : ""}</p>
              </div>
              <AddSectionMenu onAdd={addSection} />
            </div>
            {data.sectionData.length === 0 ? (
              <div style={{ background: T.surface, borderRadius: T.radius, border: `2px dashed ${T.border}`, padding: "40px 24px", textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: T.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}><Icon name="clipboard" size={20} color={T.accent} /></div>
                <p style={{ fontSize: 14, fontWeight: 600, color: T.ink, margin: "0 0 4px", fontFamily: font.ui }}>No sections yet</p>
                <p style={{ fontSize: 12, color: T.sub, margin: "0 0 14px", fontFamily: font.ui }}>Add a multiple-choice question or an open answer block.</p>
                <AddSectionMenu onAdd={addSection} />
              </div>
            ) : data.sectionData.map((section, idx) => (
              <SectionCard key={section.id} section={section} index={idx} total={data.sectionData.length}
                onChange={(next) => updateSection(idx, next)} onDelete={() => deleteSection(idx)}
                onDuplicate={() => duplicateSection(idx)} onMove={(dir) => moveSection(idx, dir)} />
            ))}
            {data.sectionData.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 6, marginBottom: 24 }}>
                <AddSectionMenu onAdd={addSection} />
              </div>
            )}
          </div>
        </div>
        <PhonePreview survey={data} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function SurveyApp() {
  const [activeNav, setActiveNav] = useState("surveys");
  const [view, setView] = useState("list");
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [surveys, setSurveys] = useState(sampleSurveys);

  const handleEdit = (survey) => { setEditingSurvey(survey); setView("editor"); };
  const handleCreate = () => {
    const s = { id: uid("survey"), surveyName: "New Survey", description: "", company: "Personalyz", sections: 0, submissions: 0, created: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), image: "", sessions: [], details: { description: "", image: "", customHtmlEnabled: false, customHtml: "", pagedView: true }, sectionData: [] };
    setSurveys([...surveys, s]); setEditingSurvey(s); setView("editor");
  };
  const handleBack = () => { setView("list"); setEditingSurvey(null); };
  const handleNavClick = (id) => { setActiveNav(id); if (id === "surveys") { setView("list"); setEditingSurvey(null); } };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: font.ui }}>
      <Sidebar activeNav={activeNav} onNavClick={handleNavClick} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {view === "list" && <SurveysListView surveys={surveys} onEdit={handleEdit} onCreate={handleCreate} />}
        {view === "editor" && editingSurvey && <EditorView survey={editingSurvey} onBack={handleBack} />}
      </div>
    </div>
  );
}
