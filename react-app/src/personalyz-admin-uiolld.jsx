import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Calm Admin palette from trend research
// ═══════════════════════════════════════════════════════════════
const T = {
  bg: "#F6F4F1",
  surface: "#FFFFFF",
  surfaceAlt: "#FAF9F7",
  ink: "#1A1A1A",
  ink2: "#3D3D3D",
  sub: "#7A7A7A",
  muted: "#A3A3A3",
  faint: "#E8E5E1",
  border: "#E8E5E1",
  borderLight: "#F0EEEB",
  accent: "#0066FF",
  accentSoft: "#EBF2FF",
  accentHover: "#0052CC",
  success: "#1A8917",
  successSoft: "#E8F5E8",
  warning: "#E8890C",
  warningSoft: "#FFF4E5",
  danger: "#D32F2F",
  dangerSoft: "#FFEAEA",
  purple: "#7B61FF",
  purpleSoft: "#F0EDFF",
  glass: "rgba(255,255,255,0.72)",
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.03)",
  shadowMd: "0 2px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.06)",
  shadowLg: "0 4px 12px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.1)",
  radius: 10,
  radiusSm: 6,
  radiusLg: 14,
};

const font = {
  display: "'Instrument Serif', Georgia, serif",
  ui: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Consolas', monospace",
};

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />,
    cards: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    users: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    building: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    chart: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    bell: <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    settings: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />,
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path d="M12 4v16m8-8H4" />,
    chevDown: <path d="M19 9l-7 7-7-7" />,
    chevRight: <path d="M9 5l7 7-7 7" />,
    chevLeft: <path d="M15 19l-7-7 7-7" />,
    edit: <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    eye: <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    eyeOff: <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />,
    share: <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />,
    grip: <><circle cx="8" cy="6" r="1.5" fill="currentColor"/><circle cx="16" cy="6" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="18" r="1.5" fill="currentColor"/><circle cx="16" cy="18" r="1.5" fill="currentColor"/></>,
    car: <path d="M5 17h14M5 17a2 2 0 01-2-2V9l3-5h12l3 5v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />,
    menu: <path d="M3 7h4m0 0V3m0 4l10 10m0 0v-4m0 4H13" />,
    x: <path d="M6 18L18 6M6 6l12 12" />,
    check: <path d="M5 13l4 4L19 7" />,
    globe: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
    photo: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    star: <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
    toggle: <><rect x="1" y="5" width="22" height="14" rx="7" /><circle cx="8" cy="12" r="4" fill="currentColor" /></>,
    mail: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    lock: <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    shield: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    trash: <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    userCircle: <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    key: <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
    clipboard: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
    refresh: <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    filter: <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
    download: <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    mapPin: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
    monitor: <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    smartphone: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
    calendar: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    trendUp: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    cursor: <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const businessCard = {
  id: "6607cc25", cardName: "batman", companyName: "ToyotaKenya", type: "Business", enabled: true, theme: "voyager",
  profile: { name: "batman", designation: "Guardian of Metropolis", moreDetail: "Fortress of Solitude", description: "Stronger than a locomotive, faster than a speeding bullet..." },
  sections: [
    { key: "businessDetails", label: "Business Details", enabled: false, sort: 0, group: "—" },
    { key: "accountDetails", label: "Account Details", enabled: true, sort: 1, group: "—" },
    { key: "contactInfo", label: "Contact Info", enabled: true, sort: 2, group: "Local", items: 3 },
    { key: "businessHours", label: "Business Hours", enabled: true, sort: 3, group: "Local", items: 7 },
    { key: "more", label: "More Detail", enabled: true, sort: 4, group: "—" },
    { key: "rate", label: "Rate Service", enabled: true, sort: 5, group: "—" },
    { key: "appointments", label: "Appointments", enabled: true, sort: 6, group: "Local", items: 6 },
    { key: "services", label: "Services", enabled: true, sort: 7, group: "Company", items: 4 },
    { key: "testimonials", label: "Testimonials", enabled: true, sort: 8, group: "Company", items: 2 },
    { key: "social", label: "Social", enabled: true, sort: 9, group: "Local", items: 4 },
    { key: "googleMap", label: "Google Map", enabled: true, sort: 10, group: "—" },
    { key: "customHtml", label: "Custom HTML", enabled: true, sort: 11, group: "—" },
    { key: "gallery", label: "Gallery", enabled: true, sort: 12, group: "Local", items: 5 },
  ],
  styling: { topColor: "#0056B3", bottomColor: "#ffffff", iconCircleColor: "#0d4d91", btnColor: "#0056b3" },
};

const vehicleCards = [
  { id: "31a25198", name: "FordEcosport", make: "FORD", model: "EcoSport", year: "2022", variant: "1.0 EcoBoost 125 ST-Line", price: "R 240 000" },
  { id: "5051b1d8", name: "FordKuga", make: "FORD", model: "Kuga", year: "2021", variant: "1.5 EcoBlue ST-Line Edition", price: "R 299 999" },
  { id: "1baca882", name: "FordPuma", make: "FORD", model: "Puma", year: "2023", variant: "1.0 EcoBoost Hybrid mHEV", price: "R 420 000" },
  { id: "01dead60", name: "HondaCRV", make: "HONDA", model: "CR-V", year: "2018", variant: "1.6 i-DTEC 160 Auto SE Plus", price: "R 376 000" },
  { id: "c1f71330", name: "LandRover", make: "LAND ROVER", model: "Evoque", year: "2021", variant: "R-Dynamic SE", price: "R 570 000" },
  { id: "e414780d", name: "MazdaCx5", make: "MAZDA", model: "CX-5", year: "2019", variant: "2.2d 184 AWD Sport Nav+", price: "R 265 999" },
];

const allCards = [
  { id: "6607cc25", name: "batman", company: "ToyotaKenya", type: "Business", status: "Active", views: 1247, shares: 89, lastEdit: "2d ago" },
  { id: "6d4ff38b", name: "DashingDelux", company: "Jetour", type: "Vehicle", status: "Active", views: 532, shares: 34, lastEdit: "5h ago" },
  { id: "1b9265c9", name: "WinterMenu", company: "Personalyz", type: "Generic", status: "Active", views: 3891, shares: 267, lastEdit: "1d ago" },
  { id: "94456e4e", name: "Parkinglot", company: "Personalyz", type: "Microsite", status: "Active", views: 8412, shares: 512, lastEdit: "3h ago" },
  { id: "a1b2c3d4", name: "SalesTeam", company: "ToyotaKenya", type: "Business", status: "Draft", views: 0, shares: 0, lastEdit: "Just now" },
  { id: "e5f6a7b8", name: "BenzGLC300", company: "Personalyz", type: "Vehicle", status: "Active", views: 912, shares: 67, lastEdit: "4d ago" },
];

const usersData = [
  { id: "u1", name: "Henry Oertel", email: "oertel.henry@gmail.com", role: "SuperAdmin", company: "Personalyz", orgUnit: null, cards: 12, status: "Active", joined: "Jan 2024", lastActive: "Just now", phone: "+27 82 555 0100", avatar: "HO" },
  { id: "u2", name: "Natasha Munisami", email: "natasha@jetourmauritius.mu", role: "Admin", company: "Jetour", orgUnit: "Port Louis", cards: 8, status: "Active", joined: "Mar 2024", lastActive: "2h ago", phone: "+230 5 251 2000", avatar: "NM" },
  { id: "u3", name: "David Kamau", email: "david@toyotakenya.co.ke", role: "OrgUnitAdmin", company: "ToyotaKenya", orgUnit: "Sales", cards: 5, status: "Active", joined: "May 2024", lastActive: "1d ago", phone: "+254 722 100 200", avatar: "DK" },
  { id: "u4", name: "Sarah Ndlovu", email: "sarah@personalyz.me", role: "Moderator", company: "Personalyz", orgUnit: "DemoCards", cards: 0, status: "Invited", joined: "Feb 2025", lastActive: "Never", phone: "", avatar: "SN" },
];

const rolesData = ["Moderator", "OrgUnitAdmin", "Admin", "SuperAdmin"];
const companiesData = [
  { name: "Personalyz", orgUnits: [null, "DemoCards"] },
  { name: "ToyotaKenya", orgUnits: [null, "Sales", "Service"] },
  { name: "Jetour", orgUnits: [null, "Phoenix", "Port Louis"] },
];

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Badge({ label, variant = "default" }) {
  const styles = {
    default: { bg: T.faint, color: T.sub },
    active: { bg: T.successSoft, color: T.success },
    draft: { bg: T.warningSoft, color: T.warning },
    invited: { bg: T.warningSoft, color: T.warning },
    business: { bg: T.accentSoft, color: T.accent },
    vehicle: { bg: T.purpleSoft, color: T.purple },
    generic: { bg: T.warningSoft, color: T.warning },
    microsite: { bg: T.successSoft, color: T.success },
    company: { bg: "#F0EDFF", color: "#7B61FF" },
    local: { bg: T.faint, color: T.sub },
    superadmin: { bg: T.accentSoft, color: T.accent },
    admin: { bg: T.purpleSoft, color: T.purple },
    orgunitadmin: { bg: T.warningSoft, color: T.warning },
    moderator: { bg: T.faint, color: T.sub },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", background: s.bg, color: s.color, fontFamily: font.ui, lineHeight: "18px" }}>
      {label}
    </span>
  );
}

function Btn({ children, variant = "primary", size = "md", icon, onClick, style: extra, disabled }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: font.ui, fontWeight: 600, borderRadius: T.radiusSm, transition: "all 0.15s", lineHeight: 1, opacity: disabled ? 0.5 : 1 };
  const sizes = { sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 }, lg: { padding: "10px 20px", fontSize: 14 } };
  const variants = {
    primary: { background: T.accent, color: "#fff" },
    secondary: { background: T.faint, color: T.ink },
    ghost: { background: "transparent", color: T.sub },
    danger: { background: T.dangerSoft, color: T.danger },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...extra }}>{icon}{children}</button>;
}

function Input({ label, value, placeholder, type = "text", hint, full, onChange, readOnly, icon }) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  return (
    <div style={{ marginBottom: 14, width: full ? "100%" : undefined }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {icon && <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name={icon} size={15} color={T.muted} /></div>}
        <input
          type={isPassword ? (showPw ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          style={{
            width: "100%", padding: icon ? "9px 12px 9px 34px" : "9px 12px", fontSize: 14, fontFamily: font.ui,
            border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: readOnly ? T.surfaceAlt : T.surface,
            color: T.ink, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
            paddingRight: isPassword ? 38 : 12,
          }}
          onFocus={(e) => { if (!readOnly) e.target.style.borderColor = T.accent; }}
          onBlur={(e) => { e.target.style.borderColor = T.border; }}
        />
        {isPassword && (
          <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <Icon name={showPw ? "eyeOff" : "eye"} size={16} color={T.muted} />
          </button>
        )}
      </div>
      {hint && <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

function StatCard({ label, value, change, changeType, icon: iconName, accent }) {
  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: "18px 20px", flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: T.sub, fontFamily: font.ui }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: accent || T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={iconName || "chart"} size={16} color={T.accent} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, fontFamily: font.display, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      {change && (
        <div style={{ fontSize: 12, fontWeight: 600, color: changeType === "up" ? T.success : T.danger, marginTop: 6, fontFamily: font.ui }}>
          {changeType === "up" ? "↑" : "↓"} {change} <span style={{ color: T.muted, fontWeight: 400 }}>vs last month</span>
        </div>
      )}
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 40, height: 22, borderRadius: 11, padding: 2, cursor: "pointer", transition: "background 0.2s",
        background: on ? T.accent : T.faint,
        display: "flex", alignItems: "center", justifyContent: on ? "flex-end" : "flex-start",
      }}
    >
      <div style={{ width: 18, height: 18, borderRadius: 9, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", transition: "all 0.2s" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════

function Sidebar({ active, onNav, collapsed, onToggle }) {
  const w = collapsed ? 64 : 220;
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "cards", label: "All Cards", icon: "cards" },
    { id: "editor", label: "Card Editor", icon: "edit" },
    { id: "microsites", label: "Microsites", icon: "globe" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "users", label: "Users", icon: "users" },
    { id: "companies", label: "Companies", icon: "building" },
    { id: "notifications", label: "Notifications", icon: "bell", badge: 3 },
    { id: "settings", label: "Settings", icon: "settings" },
  ];
  return (
    <div style={{
      width: w, minWidth: w, height: "100vh", background: T.surface, borderRight: `1px solid ${T.border}`,
      display: "flex", flexDirection: "column", transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{ padding: collapsed ? "16px 12px" : "16px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.borderLight}`, height: 56, minHeight: 56 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.accent}, #4A90D9)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: font.ui }}>P</span>
        </div>
        {!collapsed && <span style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font.ui, letterSpacing: "-0.02em" }}>Personalyz</span>}
      </div>
      <div style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: collapsed ? "9px 0" : "9px 10px",
              borderRadius: T.radiusSm, border: "none", cursor: "pointer", marginBottom: 2, transition: "all 0.12s",
              background: isActive ? T.accentSoft : "transparent", color: isActive ? T.accent : T.sub,
              justifyContent: collapsed ? "center" : "flex-start", fontFamily: font.ui,
            }}>
              <Icon name={item.icon} size={18} color={isActive ? T.accent : T.sub} />
              {!collapsed && (
                <>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, flex: 1, textAlign: "left" }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ width: 18, height: 18, borderRadius: 9, background: T.danger, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
      <button onClick={onToggle} style={{
        padding: 12, border: "none", background: "transparent", cursor: "pointer", borderTop: `1px solid ${T.borderLight}`,
        display: "flex", justifyContent: "center", color: T.muted,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {collapsed ? <path d="M9 5l7 7-7 7" /> : <path d="M15 19l-7-7 7-7" />}
        </svg>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TOP BAR
// ═══════════════════════════════════════════════════════════════

function TopBar({ title, subtitle, actions, breadcrumb }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 40, padding: "12px 28px", background: "rgba(246,244,241,0.85)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 56,
    }}>
      <div>
        {breadcrumb && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <Icon name="chevRight" size={12} color={T.muted} />}
                <span
                  onClick={crumb.onClick}
                  style={{ fontSize: 11, color: crumb.onClick ? T.accent : T.muted, fontFamily: font.ui, cursor: crumb.onClick ? "pointer" : "default", fontWeight: 500 }}
                >{crumb.label}</span>
              </span>
            ))}
          </div>
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 12, color: T.sub, margin: "2px 0 0", fontFamily: font.ui }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="search" size={15} color={T.muted} /></div>
          <input placeholder="Search… ⌘K" readOnly style={{
            width: 200, padding: "7px 12px 7px 32px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
            borderRadius: T.radiusSm, background: T.surface, color: T.sub, outline: "none",
          }} />
        </div>
        {actions}
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, #667eea, #764ba2)`, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: font.ui }}>HO</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════

function Dashboard({ onNav }) {
  return (
    <div>
      <TopBar title="Dashboard" subtitle="Welcome back, Henry" actions={<Btn icon={<Icon name="plus" size={15} color="#fff" />} onClick={() => onNav("editor")}>New Card</Btn>} />
      <div style={{ padding: "24px 28px", maxWidth: 1200 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <StatCard label="Total Cards" value="47" change="12%" changeType="up" icon="cards" accent={T.accentSoft} />
          <StatCard label="Total Views" value="14,082" change="23%" changeType="up" icon="eye" accent={T.successSoft} />
          <StatCard label="Shares" value="969" change="8%" changeType="up" icon="share" accent={T.purpleSoft} />
          <StatCard label="Active Users" value="12" change="2" changeType="up" icon="users" accent={T.warningSoft} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>Recent Cards</span>
              <Btn variant="ghost" size="sm" onClick={() => onNav("cards")}>View all →</Btn>
            </div>
            <div>
              {allCards.map((card, i) => (
                <div key={card.id} style={{
                  display: "grid", gridTemplateColumns: "1fr 80px 80px 80px 60px 56px", gap: 12, alignItems: "center",
                  padding: "12px 20px", borderBottom: i < allCards.length - 1 ? `1px solid ${T.borderLight}` : "none",
                  fontSize: 13, fontFamily: font.ui,
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: T.ink }}>{card.name}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{card.company}</div>
                  </div>
                  <Badge label={card.type} variant={card.type.toLowerCase()} />
                  <Badge label={card.status} variant={card.status === "Active" ? "active" : "draft"} />
                  <span style={{ color: T.sub, fontSize: 12, fontFamily: font.mono }}>{card.views.toLocaleString()}</span>
                  <span style={{ color: T.muted, fontSize: 12 }}>{card.lastEdit}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => onNav("editor")} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="edit" size={13} color={T.sub} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, display: "block", marginBottom: 14 }}>Quick Actions</span>
              {[
                { label: "New Business Card", icon: "users", action: "editor" },
                { label: "New Vehicle Card", icon: "car", action: "editor" },
                { label: "New Generic Card", icon: "cards", action: "editor" },
                { label: "Import CSV", icon: "plus", action: "cards" },
              ].map((qa) => (
                <button key={qa.label} onClick={() => onNav(qa.action)} style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px",
                  borderRadius: T.radiusSm, border: `1px solid ${T.borderLight}`, background: T.surfaceAlt,
                  cursor: "pointer", marginBottom: 6, transition: "all 0.12s", fontFamily: font.ui,
                }}>
                  <Icon name={qa.icon} size={16} color={T.accent} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{qa.label}</span>
                  <span style={{ marginLeft: "auto", color: T.muted }}><Icon name="chevRight" size={14} color={T.muted} /></span>
                </button>
              ))}
            </div>
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, display: "block", marginBottom: 14 }}>Activity</span>
              {[
                { text: "batman card shared via QR", time: "2 min ago", dot: T.accent },
                { text: "WinterMenu updated 3 sections", time: "1h ago", dot: T.success },
                { text: "New user Natasha joined Jetour", time: "3h ago", dot: T.purple },
                { text: "DashingDelux published", time: "5h ago", dot: T.success },
                { text: "Parkinglot microsite: 142 views today", time: "6h ago", dot: T.warning },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "start", marginBottom: 12 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.dot, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: T.ink, fontFamily: font.ui, lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// USERS VIEW — List + Inline Editor
// ═══════════════════════════════════════════════════════════════

function UsersView({ onNav }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editorTab, setEditorTab] = useState("profile");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Editable user state
  const [editUser, setEditUser] = useState(null);

  const openEditor = (user) => {
    setEditUser({ ...user, newPassword: "", confirmPassword: "" });
    setSelectedUser(user.id);
    setEditorTab("profile");
    setIsCreating(false);
  };

  const startCreate = () => {
    const newUser = {
      id: "new", name: "", email: "", role: "Moderator", company: companiesData[0].name,
      orgUnit: null, cards: 0, status: "Invited", joined: "Now", lastActive: "Never",
      phone: "", avatar: "??", newPassword: "", confirmPassword: "",
    };
    setEditUser(newUser);
    setSelectedUser("new");
    setEditorTab("profile");
    setIsCreating(true);
  };

  const closeEditor = () => {
    setSelectedUser(null);
    setEditUser(null);
    setIsCreating(false);
  };

  const updateField = (field, value) => {
    setEditUser(prev => ({ ...prev, [field]: value }));
  };

  // Derive initials from name
  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const avatarColors = ["#667eea", "#f093fb", "#4fd1c5", "#f6ad55", "#fc8181"];
  const getAvatarColor = (idx) => avatarColors[idx % avatarColors.length];

  // ═══════════════════════════════════════════
  // ROLE SELECTION MODAL
  // ═══════════════════════════════════════════
  const RoleModal = () => {
    if (!showRoleModal) return null;
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div onClick={() => setShowRoleModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }} />
        <div style={{ position: "relative", background: T.surface, borderRadius: T.radiusLg, boxShadow: T.shadowLg, width: 360, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>Select Role</span>
            <button onClick={() => setShowRoleModal(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon name="x" size={16} color={T.muted} />
            </button>
          </div>
          <div style={{ padding: "8px 12px" }}>
            {rolesData.map((role) => {
              const isSelected = editUser?.role === role;
              return (
                <button
                  key={role}
                  onClick={() => { updateField("role", role); setShowRoleModal(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px",
                    borderRadius: T.radiusSm, border: `1px solid ${isSelected ? T.accent : "transparent"}`,
                    background: isSelected ? T.accentSoft : "transparent", cursor: "pointer",
                    marginBottom: 2, transition: "all 0.12s", fontFamily: font.ui,
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: 9, border: `2px solid ${isSelected ? T.accent : T.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: isSelected ? T.accent : "transparent",
                  }}>
                    {isSelected && <Icon name="check" size={11} color="#fff" />}
                  </div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{role}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>
                      {role === "SuperAdmin" && "Full platform access, manage all companies"}
                      {role === "Admin" && "Company-level access, manage users and cards"}
                      {role === "OrgUnitAdmin" && "Org unit access, manage unit cards"}
                      {role === "Moderator" && "View and edit assigned cards only"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ padding: "12px 20px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Btn variant="secondary" size="sm" onClick={() => setShowRoleModal(false)}>Cancel</Btn>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════
  // COMPANY ASSOCIATION MODAL
  // ═══════════════════════════════════════════
  const CompanyModal = () => {
    if (!showCompanyModal) return null;
    const selectedCompany = companiesData.find(c => c.name === editUser?.company) || companiesData[0];
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div onClick={() => setShowCompanyModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }} />
        <div style={{ position: "relative", background: T.surface, borderRadius: T.radiusLg, boxShadow: T.shadowLg, width: 400, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>Company & Org Unit</span>
            <button onClick={() => setShowCompanyModal(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon name="x" size={16} color={T.muted} />
            </button>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 6, fontFamily: font.ui }}>Company</label>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <select
                value={editUser?.company || ""}
                onChange={(e) => updateField("company", e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui,
                  border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface,
                  color: T.ink, outline: "none", appearance: "none", cursor: "pointer",
                }}
              >
                {companiesData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <Icon name="chevDown" size={14} color={T.muted} />
              </div>
            </div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 6, fontFamily: font.ui }}>Org Unit</label>
            <div style={{ position: "relative" }}>
              <select
                value={editUser?.orgUnit || ""}
                onChange={(e) => updateField("orgUnit", e.target.value || null)}
                style={{
                  width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui,
                  border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface,
                  color: T.ink, outline: "none", appearance: "none", cursor: "pointer",
                }}
              >
                {(companiesData.find(c => c.name === editUser?.company)?.orgUnits || []).map(ou => (
                  <option key={ou || "none"} value={ou || ""}>{ou || "None (Company-wide)"}</option>
                ))}
              </select>
              <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <Icon name="chevDown" size={14} color={T.muted} />
              </div>
            </div>
          </div>
          <div style={{ padding: "12px 20px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Btn variant="secondary" size="sm" onClick={() => setShowCompanyModal(false)}>Cancel</Btn>
            <Btn size="sm" onClick={() => setShowCompanyModal(false)}>Apply</Btn>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════
  // EDITOR PANEL (RIGHT SIDE)
  // ═══════════════════════════════════════════
  const EditorPanel = () => {
    if (!editUser) return null;

    const tabs = [
      { id: "profile", label: "Profile", icon: "userCircle" },
      { id: "access", label: "Access", icon: "shield" },
      { id: "security", label: "Security", icon: "lock" },
    ];

    return (
      <div style={{
        width: 460, minWidth: 460, borderLeft: `1px solid ${T.border}`, background: T.surface,
        display: "flex", flexDirection: "column", height: "calc(100vh - 56px)", overflow: "hidden",
      }}>
        {/* Editor Header with Avatar */}
        <div style={{ padding: "20px 24px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${getAvatarColor(usersData.findIndex(u => u.id === selectedUser))}, ${getAvatarColor(usersData.findIndex(u => u.id === selectedUser) + 2)})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: font.ui }}>
                  {getInitials(editUser.name)}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font.display }}>
                  {isCreating ? "New User" : editUser.name || "Unnamed"}
                </div>
                <div style={{ fontSize: 12, color: T.muted, fontFamily: font.ui }}>
                  {isCreating ? "Creating new account" : editUser.email}
                </div>
              </div>
            </div>
            <button onClick={closeEditor} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6 }}>
              <Icon name="x" size={18} color={T.muted} />
            </button>
          </div>

          {/* Tab Bar */}
          <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.border}`, marginLeft: -24, marginRight: -24, paddingLeft: 24 }}>
            {tabs.map(tab => {
              const isActive = editorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEditorTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", border: "none", cursor: "pointer",
                    background: "transparent", fontFamily: font.ui, fontSize: 13, fontWeight: isActive ? 600 : 500,
                    color: isActive ? T.accent : T.sub, borderBottom: `2px solid ${isActive ? T.accent : "transparent"}`,
                    marginBottom: -1, transition: "all 0.12s",
                  }}
                >
                  <Icon name={tab.icon} size={15} color={isActive ? T.accent : T.muted} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content — Scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

          {/* ═══ PROFILE TAB ═══ */}
          {editorTab === "profile" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Input
                  label="First Name"
                  value={editUser.name.split(" ")[0] || ""}
                  placeholder="First name"
                  onChange={(e) => {
                    const parts = editUser.name.split(" ");
                    parts[0] = e.target.value;
                    updateField("name", parts.join(" "));
                  }}
                />
                <Input
                  label="Last Name"
                  value={editUser.name.split(" ").slice(1).join(" ") || ""}
                  placeholder="Last name"
                  onChange={(e) => {
                    const first = editUser.name.split(" ")[0] || "";
                    updateField("name", `${first} ${e.target.value}`.trim());
                  }}
                />
              </div>
              <Input
                label="Email"
                value={editUser.email}
                placeholder="user@company.com"
                type="email"
                icon="mail"
                onChange={(e) => updateField("email", e.target.value)}
              />
              <Input
                label="Phone"
                value={editUser.phone || ""}
                placeholder="+27 00 000 0000"
                icon="share"
                onChange={(e) => updateField("phone", e.target.value)}
              />

              {/* Status & Meta */}
              {!isCreating && (
                <div style={{ background: T.surfaceAlt, borderRadius: T.radius, padding: 16, marginTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.sub, marginBottom: 10, fontFamily: font.ui }}>Activity</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Status", value: editUser.status },
                      { label: "Cards Created", value: editUser.cards },
                      { label: "Joined", value: editUser.joined },
                      { label: "Last Active", value: editUser.lastActive },
                    ].map((item) => (
                      <div key={item.label}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: font.mono }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, marginTop: 2 }}>
                          {item.label === "Status" ? <Badge label={item.value} variant={item.value.toLowerCase()} /> : item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ ACCESS TAB ═══ */}
          {editorTab === "access" && (
            <div>
              {/* Role */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, fontFamily: font.ui }}>Role</div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", borderRadius: T.radius, border: `1px solid ${T.border}`, background: T.surfaceAlt,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: editUser.role === "SuperAdmin" ? T.accentSoft : editUser.role === "Admin" ? T.purpleSoft : T.warningSoft,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon name="shield" size={18} color={editUser.role === "SuperAdmin" ? T.accent : editUser.role === "Admin" ? T.purple : T.warning} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{editUser.role}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>
                        {editUser.role === "SuperAdmin" && "Full platform access"}
                        {editUser.role === "Admin" && "Company-level access"}
                        {editUser.role === "OrgUnitAdmin" && "Org unit access"}
                        {editUser.role === "Moderator" && "Limited access"}
                      </div>
                    </div>
                  </div>
                  <Btn variant="secondary" size="sm" onClick={() => setShowRoleModal(true)}>
                    Change
                  </Btn>
                </div>
              </div>

              {/* Company & Org Unit */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, fontFamily: font.ui }}>Company & Org Unit</div>
                <div style={{
                  padding: "14px 16px", borderRadius: T.radius, border: `1px solid ${T.border}`, background: T.surfaceAlt,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="building" size={18} color={T.accent} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{editUser.company}</div>
                        <div style={{ fontSize: 11, color: T.muted }}>
                          {editUser.orgUnit ? `Org Unit: ${editUser.orgUnit}` : "Company-wide access"}
                        </div>
                      </div>
                    </div>
                    <Btn variant="secondary" size="sm" onClick={() => setShowCompanyModal(true)}>
                      Change
                    </Btn>
                  </div>
                </div>
              </div>

              {/* Permissions summary */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, fontFamily: font.ui }}>Permissions</div>
                <div style={{ background: T.surfaceAlt, borderRadius: T.radius, padding: 4 }}>
                  {[
                    { label: "Create Cards", desc: "Create new business & vehicle cards", allowed: editUser.role !== "Moderator" },
                    { label: "Edit Cards", desc: "Modify existing card content", allowed: true },
                    { label: "Manage Users", desc: "Invite, edit, and remove users", allowed: editUser.role === "SuperAdmin" || editUser.role === "Admin" },
                    { label: "Manage Companies", desc: "Create and configure companies", allowed: editUser.role === "SuperAdmin" },
                    { label: "View Analytics", desc: "Access card performance data", allowed: editUser.role !== "Moderator" },
                    { label: "API Access", desc: "Use platform API endpoints", allowed: editUser.role === "SuperAdmin" },
                  ].map((perm, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: T.radiusSm,
                      background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, fontFamily: font.ui }}>{perm.label}</div>
                        <div style={{ fontSize: 11, color: T.muted }}>{perm.desc}</div>
                      </div>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: perm.allowed ? T.successSoft : T.faint,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        {perm.allowed
                          ? <Icon name="check" size={13} color={T.success} />
                          : <Icon name="x" size={13} color={T.muted} />
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══ SECURITY TAB ═══ */}
          {editorTab === "security" && (
            <div>
              <div style={{ background: T.surfaceAlt, borderRadius: T.radius, padding: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Icon name="key" size={16} color={T.accent} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>
                    {isCreating ? "Set Password" : "Reset Password"}
                  </span>
                </div>
                <Input
                  label="New Password"
                  type="password"
                  value={editUser.newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => updateField("newPassword", e.target.value)}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={editUser.confirmPassword}
                  placeholder="Re-enter password"
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                />
                {editUser.newPassword && editUser.confirmPassword && editUser.newPassword !== editUser.confirmPassword && (
                  <div style={{ fontSize: 12, color: T.danger, fontFamily: font.ui, marginTop: -8 }}>Passwords do not match</div>
                )}
                {editUser.newPassword && editUser.newPassword.length > 0 && editUser.newPassword.length < 8 && (
                  <div style={{ fontSize: 12, color: T.warning, fontFamily: font.ui, marginTop: -8 }}>Minimum 8 characters</div>
                )}
              </div>

              {!isCreating && (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, fontFamily: font.ui }}>Account Actions</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <button style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px",
                        borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surface,
                        cursor: "pointer", fontFamily: font.ui, textAlign: "left",
                      }}>
                        <Icon name="refresh" size={16} color={T.accent} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>Send Password Reset Email</div>
                          <div style={{ fontSize: 11, color: T.muted }}>User will receive a reset link</div>
                        </div>
                      </button>
                      <button style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px",
                        borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surface,
                        cursor: "pointer", fontFamily: font.ui, textAlign: "left",
                      }}>
                        <Icon name="clipboard" size={16} color={T.accent} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>Resend Invitation</div>
                          <div style={{ fontSize: 11, color: T.muted }}>Send new activation email</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div style={{ borderRadius: T.radius, border: `1px solid ${T.dangerSoft}`, overflow: "hidden" }}>
                    <div style={{ padding: "12px 16px", background: T.dangerSoft }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.danger, fontFamily: font.ui }}>Danger Zone</span>
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Deactivate User</div>
                          <div style={{ fontSize: 11, color: T.muted }}>Revoke access without deleting</div>
                        </div>
                        <Btn variant="danger" size="sm">Deactivate</Btn>
                      </div>
                      <div style={{ height: 1, background: T.borderLight, margin: "12px 0" }} />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Delete User</div>
                          <div style={{ fontSize: 11, color: T.muted }}>Permanently remove this user</div>
                        </div>
                        <Btn variant="danger" size="sm" icon={<Icon name="trash" size={13} color={T.danger} />}>Delete</Btn>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: "14px 24px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8,
          justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: T.surface,
        }}>
          <Btn variant="ghost" size="sm" onClick={closeEditor}>Cancel</Btn>
          <div style={{ display: "flex", gap: 8 }}>
            {isCreating && (
              <Btn size="sm" icon={<Icon name="mail" size={14} color="#fff" />}>
                Create & Send Invite
              </Btn>
            )}
            <Btn size="sm" icon={<Icon name="check" size={14} color="#fff" />}>
              {isCreating ? "Create User" : "Save Changes"}
            </Btn>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════
  return (
    <div>
      <TopBar
        title="Users"
        subtitle={`${usersData.length} users across ${companiesData.length} companies`}
        actions={<Btn icon={<Icon name="plus" size={15} color="#fff" />} onClick={startCreate}>New User</Btn>}
      />
      <div style={{ display: "flex", height: "calc(100vh - 56px)", overflow: "hidden" }}>
        {/* Main User List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ maxWidth: selectedUser ? 800 : 1200 }}>
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              {/* Table Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: selectedUser ? "1fr 100px 80px" : "1fr 120px 130px 80px 80px 40px",
                gap: 12, padding: "10px 20px", borderBottom: `1px solid ${T.border}`,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.mono, textTransform: "uppercase",
              }}>
                <span>User</span>
                <span>Role</span>
                {!selectedUser && <span>Company</span>}
                {!selectedUser && <span>Cards</span>}
                <span>Status</span>
                {!selectedUser && <span></span>}
              </div>

              {/* User Rows */}
              {usersData.map((u, i) => {
                const isSelected = selectedUser === u.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => openEditor(u)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: selectedUser ? "1fr 100px 80px" : "1fr 120px 130px 80px 80px 40px",
                      gap: 12, alignItems: "center", padding: "14px 20px",
                      borderBottom: i < usersData.length - 1 ? `1px solid ${T.borderLight}` : "none",
                      cursor: "pointer", transition: "all 0.12s",
                      background: isSelected ? T.accentSoft : "transparent",
                      borderLeft: isSelected ? `3px solid ${T.accent}` : "3px solid transparent",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: `linear-gradient(135deg, ${getAvatarColor(i)}, ${getAvatarColor(i + 2)})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: font.ui }}>{u.avatar}</span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: T.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                      </div>
                    </div>
                    <Badge label={u.role} variant={u.role.toLowerCase()} />
                    {!selectedUser && <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>{u.company}</span>}
                    {!selectedUser && <span style={{ fontSize: 12, color: T.sub, fontFamily: font.mono }}>{u.cards}</span>}
                    <Badge label={u.status} variant={u.status.toLowerCase()} />
                    {!selectedUser && (
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditor(u); }}
                        style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Icon name="edit" size={13} color={T.sub} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor Slide-in Panel */}
        {selectedUser && <EditorPanel />}
      </div>

      {/* Modals */}
      <RoleModal />
      <CompanyModal />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// ALL CARDS VIEW
// ═══════════════════════════════════════════════════════════════

function CardsView({ onNav }) {
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Business", "Vehicle", "Generic", "Microsite"];
  const filtered = filter === "All" ? allCards : allCards.filter((c) => c.type === filter);

  return (
    <div>
      <TopBar title="All Cards" subtitle={`${allCards.length} cards across 3 companies`}
        actions={<Btn icon={<Icon name="plus" size={15} color="#fff" />} onClick={() => onNav("editor")}>New Card</Btn>} />
      <div style={{ padding: "20px 28px", maxWidth: 1200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: font.ui,
                border: `1px solid ${filter === f ? T.accent : T.border}`, borderRadius: 6,
                background: filter === f ? T.accentSoft : T.surface, color: filter === f ? T.accent : T.sub, cursor: "pointer",
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 2, background: T.faint, borderRadius: 6, padding: 2 }}>
            {["grid", "list"].map((m) => (
              <button key={m} onClick={() => setViewMode(m)} style={{
                padding: "5px 12px", fontSize: 11, fontWeight: 600, fontFamily: font.ui,
                border: "none", borderRadius: 4, cursor: "pointer",
                background: viewMode === m ? T.surface : "transparent", color: viewMode === m ? T.ink : T.muted,
                boxShadow: viewMode === m ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}>{m === "grid" ? "Grid" : "List"}</button>
            ))}
          </div>
        </div>
        {viewMode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((card) => (
              <div key={card.id} onClick={() => onNav("editor")} style={{
                background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden", cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{ height: 140, background: `linear-gradient(135deg, ${card.type === "Business" ? "#E8F0FF" : card.type === "Vehicle" ? "#F0EDFF" : card.type === "Generic" ? "#FFF4E5" : "#E8F5E8"}, ${T.surfaceAlt})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: T.glass, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(255,255,255,0.5)` }}>
                    <Icon name={card.type === "Business" ? "users" : card.type === "Vehicle" ? "car" : card.type === "Microsite" ? "globe" : "cards"} size={24} color={T.accent} />
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10 }}><Badge label={card.status} variant={card.status === "Active" ? "active" : "draft"} /></div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                    <div><div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>{card.name}</div><div style={{ fontSize: 12, color: T.muted }}>{card.company}</div></div>
                    <Badge label={card.type} variant={card.type.toLowerCase()} />
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.sub, fontFamily: font.mono }}>
                    <span>{card.views.toLocaleString()} views</span><span>{card.shares} shares</span>
                    <span style={{ marginLeft: "auto", color: T.muted }}>{card.lastEdit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 100px 100px 60px", gap: 12, padding: "10px 20px", borderBottom: `1px solid ${T.border}`, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.mono, textTransform: "uppercase" }}>
              <span>Name</span><span>Type</span><span>Status</span><span>Views</span><span>Shares</span><span></span>
            </div>
            {filtered.map((card, i) => (
              <div key={card.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 100px 100px 60px", gap: 12, alignItems: "center", padding: "12px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : "none", fontSize: 13, fontFamily: font.ui }}>
                <div><div style={{ fontWeight: 600, color: T.ink }}>{card.name}</div><div style={{ fontSize: 11, color: T.muted }}>{card.company}</div></div>
                <Badge label={card.type} variant={card.type.toLowerCase()} />
                <Badge label={card.status} variant={card.status === "Active" ? "active" : "draft"} />
                <span style={{ fontFamily: font.mono, fontSize: 12, color: T.sub }}>{card.views.toLocaleString()}</span>
                <span style={{ fontFamily: font.mono, fontSize: 12, color: T.sub }}>{card.shares}</span>
                <button onClick={() => onNav("editor")} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="edit" size={13} color={T.sub} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD EDITOR
// ═══════════════════════════════════════════════════════════════

function CardEditor() {
  const [activeSection, setActiveSection] = useState("businessDetails");
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  const card = businessCard;

  return (
    <div>
      <TopBar title="Edit Card" subtitle={`${card.cardName} · ${card.companyName} · ${card.type} Card`}
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="secondary" size="sm" icon={<Icon name="eye" size={14} color={T.sub} />}>Preview</Btn>
            <Btn variant="secondary" size="sm" icon={<Icon name="share" size={14} color={T.sub} />}>Share</Btn>
            <Btn size="sm">Save & Publish</Btn>
          </div>
        }
      />
      <div style={{ display: "flex", height: "calc(100vh - 56px)", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>Card Identity</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <Input label="Card Name" value={card.cardName} />
              <Input label="Company" value={card.companyName} />
              <Input label="Theme" value={card.theme} />
            </div>
          </div>

          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>Profile</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Name" value={card.profile.name} />
              <Input label="Designation" value={card.profile.designation} />
              <Input label="More Detail" value={card.profile.moreDetail} full />
            </div>
          </div>

          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>Sections</h3>
              <Btn variant="secondary" size="sm" icon={<Icon name="plus" size={13} />}>Add Section</Btn>
            </div>
            {card.sections.map((sec) => (
              <div key={sec.key} onClick={() => setActiveSection(sec.key)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: T.radiusSm,
                border: `1px solid ${activeSection === sec.key ? T.accent : T.borderLight}`,
                background: activeSection === sec.key ? T.accentSoft : T.surfaceAlt,
                marginBottom: 4, cursor: "pointer", transition: "all 0.12s",
              }}>
                <Icon name="grip" size={14} color={T.muted} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, flex: 1 }}>{sec.label}</span>
                {sec.group !== "—" && <Badge label={sec.group} variant={sec.group === "Company" ? "company" : "local"} />}
                {sec.items && <span style={{ fontSize: 11, color: T.muted, fontFamily: font.mono }}>{sec.items} items</span>}
                <Toggle on={sec.enabled} />
              </div>
            ))}
          </div>

          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>Card Styling</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Top Color", color: card.styling.topColor },
                { label: "Bottom Color", color: card.styling.bottomColor },
                { label: "Icon Color", color: card.styling.iconCircleColor },
                { label: "Button Color", color: card.styling.btnColor },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: T.radiusSm, border: `1px solid ${T.border}` }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: s.color, border: `1px solid ${T.border}` }} />
                    <span style={{ fontSize: 12, color: T.sub, fontFamily: font.mono }}>{s.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!previewCollapsed && (
          <div style={{ width: 380, borderLeft: `1px solid ${T.border}`, background: T.surfaceAlt, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{
              padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              background: T.glass, backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderBottom: `1px solid rgba(255,255,255,0.45)`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>Live Preview</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button style={{ padding: "4px 10px", borderRadius: 4, border: `1px solid ${T.border}`, background: T.surface, fontSize: 11, fontWeight: 600, color: T.accent, cursor: "pointer", fontFamily: font.ui }}>Mobile</button>
                <button style={{ padding: "4px 10px", borderRadius: 4, border: "none", background: "transparent", fontSize: 11, fontWeight: 500, color: T.muted, cursor: "pointer", fontFamily: font.ui }}>Desktop</button>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "start", justifyContent: "center", padding: 20, overflowY: "auto" }}>
              <div style={{ width: 300, borderRadius: 28, background: "#fff", boxShadow: T.shadowLg, border: "8px solid #1A1A1A", overflow: "hidden" }}>
                <div style={{ height: 28, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 80, height: 22, borderRadius: 12, background: "#000" }} />
                </div>
                <div style={{ height: 120, background: `linear-gradient(135deg, ${card.styling.topColor}, #2980b9)`, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: "#eee", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 24 }}>🦇</span>
                  </div>
                </div>
                <div style={{ padding: "36px 20px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.ink }}>{card.profile.name}</div>
                  <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>{card.profile.designation}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{card.profile.moreDetail}</div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 8, lineHeight: 1.5, padding: "0 8px" }}>{card.profile.description.substring(0, 80)}...</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 14 }}>
                    {["💬", "📞", "✉️"].map((ic, i) => (
                      <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: card.styling.iconCircleColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 16 }}>{ic}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, textAlign: "left" }}>
                    {card.sections.filter(s => s.enabled).slice(2, 6).map((sec) => (
                      <div key={sec.key} style={{ padding: "8px 12px", borderRadius: 8, background: T.surfaceAlt, marginBottom: 4, fontSize: 11, fontWeight: 600, color: T.ink2, fontFamily: font.ui, display: "flex", justifyContent: "space-between" }}>
                        <span>{sec.label}</span>
                        {sec.items && <span style={{ color: T.muted }}>{sec.items}</span>}
                      </div>
                    ))}
                    <div style={{ padding: 6, textAlign: "center", fontSize: 10, color: T.muted }}>+ {card.sections.filter(s => s.enabled).length - 6} more sections</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MICROSITES VIEW
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MICROSITE SLIDE PANEL (Create / Edit)
// ═══════════════════════════════════════════════════════════════
function MicrositeSlidePanelOuter({ open, onClose, microsite, onSave }) {
  const isEdit = !!microsite;
  const [description, setDescription] = useState(microsite?.description || "");
  const [details, setDetails] = useState(microsite?.details || "");
  const [imageUrl, setImageUrl] = useState(microsite?.imageUrl || "");
  const [imagePreview, setImagePreview] = useState(microsite?.imageUrl || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (open) {
      setDescription(microsite?.description || "");
      setDetails(microsite?.details || "");
      setImageUrl(microsite?.imageUrl || "");
      setImagePreview(microsite?.imageUrl || "");
    }
  }, [open, microsite]);

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setImageUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!description.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave({ description, details, imageUrl, id: microsite?.id });
      onClose();
    }, 600);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      onSave({ __delete: true, id: microsite?.id });
      onClose();
    }, 600);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.18)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.25s",
        }}
      />
      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
        width: 440,
        background: T.surface,
        borderLeft: `1px solid ${T.border}`,
        boxShadow: open ? T.shadowLg : "none",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Panel Header */}
        <div style={{
          padding: "18px 24px", borderBottom: `1px solid ${T.borderLight}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: T.surfaceAlt,
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, fontFamily: font.display, letterSpacing: "-0.01em" }}>
              {isEdit ? "Edit Microsite" : "New Microsite"}
            </div>
            <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>
              {isEdit ? `Editing: ${microsite?.name}` : "Create a new microsite"}
            </div>
          </div>
          <button onClick={onClose} style={{ background: T.faint, border: "none", borderRadius: 8, cursor: "pointer", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="x" size={16} color={T.sub} />
          </button>
        </div>

        {/* Panel Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 0" }}>

          {/* Image Upload */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 8, fontFamily: font.ui }}>
              Microsite Image
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Preview box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: 88, height: 88, borderRadius: T.radius,
                  border: `2px dashed ${imagePreview ? T.accent : T.border}`,
                  background: imagePreview ? "transparent" : T.surfaceAlt,
                  overflow: "hidden", cursor: "pointer", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 0.15s",
                  position: "relative",
                }}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{
                      position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <Icon name="photo" size={20} color="#fff" />
                    </div>
                  </>
                ) : (
                  <Icon name="photo" size={28} color={T.muted} />
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageFile} />
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <Btn variant="secondary" size="sm" icon={<Icon name="photo" size={13} />} onClick={() => fileInputRef.current?.click()}>
                    {imagePreview ? "Change" : "Upload"}
                  </Btn>
                  {imagePreview && (
                    <Btn variant="ghost" size="sm" onClick={() => { setImagePreview(""); setImageUrl(""); }}>
                      Remove
                    </Btn>
                  )}
                </div>
                <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.4 }}>
                  PNG, JPG or GIF. Recommended 200×200px.
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: T.borderLight, margin: "0 0 22px" }} />

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>
              Description <span style={{ color: T.danger }}>*</span>
            </label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Jetour Mauritius"
              style={{
                width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui,
                border: `1px solid ${!description.trim() && description !== "" ? T.danger : T.border}`,
                borderRadius: T.radiusSm, background: T.surface, color: T.ink,
                outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
            <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>The display name for this microsite</div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>
              Details
            </label>
            <input
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="e.g. Vehicle List"
              style={{
                width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui,
                border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface,
                color: T.ink, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
            <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>Short description of what this microsite contains</div>
          </div>

          {/* Vehicles read-only info (edit mode only) */}
          {isEdit && (
            <div style={{
              background: T.surfaceAlt, borderRadius: T.radius, border: `1px solid ${T.borderLight}`,
              padding: "14px 16px", marginTop: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Icon name="car" size={15} color={T.sub} />
                <span style={{ fontSize: 12, fontWeight: 700, color: T.sub, fontFamily: font.ui, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Vehicles
                </span>
                <span style={{
                  marginLeft: "auto", fontSize: 11, fontWeight: 700, fontFamily: font.mono,
                  background: T.purpleSoft, color: T.purple, padding: "2px 8px", borderRadius: 10,
                }}>
                  {microsite?.cards ?? 0}
                </span>
              </div>
              {vehicleCards.slice(0, 3).map(v => (
                <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.borderLight}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: `linear-gradient(135deg, #F0EDFF, ${T.surfaceAlt})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="car" size={16} color={T.purple} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{v.make} {v.model}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{v.year}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: T.muted, marginTop: 8, fontStyle: "italic" }}>
                Vehicles are managed separately from All Cards view.
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div style={{
          padding: "16px 24px", borderTop: `1px solid ${T.borderLight}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: T.surfaceAlt,
        }}>
          <div>
            {isEdit && (
              <Btn variant="danger" size="sm" icon={<Icon name="trash" size={13} color={T.danger} />} onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete"}
              </Btn>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" size="sm" onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" size="sm" onClick={handleSave} disabled={!description.trim() || saving}
              icon={saving ? undefined : <Icon name="check" size={14} color="#fff" />}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Microsite"}
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}

function MicrositesView({ onNav }) {
  const initialMicrosites = [
    { id: "ms1", name: "JetourMauritius", description: "Jetour Mauritius", details: "Vehicle List", company: "Jetour", cards: 6, created: "27 Oct 2025", imageUrl: "" },
    { id: "ms2", name: "lot", description: "Jetour", details: "Vehicle List", company: "Jetour", cards: 1, created: "15 Oct 2025", imageUrl: "" },
    { id: "ms3", name: "lot", description: "McCarthy Toyota Alberton", details: "Vehicle List", company: "TurboMango", cards: 1, created: "01 Oct 2025", imageUrl: "" },
    { id: "ms4", name: "MarketDemandFruits", description: "Market Demand Fruits", details: "Product List", company: "Seriti", cards: 3, created: "19 Jan 2026", imageUrl: "" },
    { id: "ms5", name: "NalediMotors", description: "NALEDI MOTORS", details: "Vehicle List", company: "Seriti", cards: 4, created: "28 Oct 2025", imageUrl: "" },
    { id: "ms6", name: "Parkinglot", description: "Mercedes Alberton", details: "Vehicle List", company: "Personalyz", cards: 11, created: "15 Sept 2025", imageUrl: "" },
    { id: "ms7", name: "RedstoneMotors", description: "NZ Test site", details: "Vehicle List", company: "Seriti", cards: 1, created: "29 Jan 2026", imageUrl: "" },
    { id: "ms8", name: "RedStoneMotors2", description: "RedStone Motors Ltd", details: "Vehicle List", company: "Seriti", cards: 19, created: "29 Jan 2026", imageUrl: "" },
    { id: "ms9", name: "showroom", description: "McCarthy Toyota", details: "Vehicle List", company: "Personalyz", cards: 1, created: "30 Sept 2025", imageUrl: "" },
    { id: "ms10", name: "testMicrosite", description: "asdf", details: "Test", company: "Seriti", cards: 0, created: "19 Oct 2025", imageUrl: "" },
  ];

  const [microsites, setMicrosites] = useState(initialMicrosites);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Vehicle");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingMs, setEditingMs] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = microsites.filter(ms =>
    ms.name.toLowerCase().includes(search.toLowerCase()) ||
    ms.description.toLowerCase().includes(search.toLowerCase()) ||
    ms.company.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openNew = () => { setEditingMs(null); setPanelOpen(true); };
  const openEdit = (ms) => { setEditingMs(ms); setPanelOpen(true); };
  const closePanel = () => setPanelOpen(false);

  const handleSave = (data) => {
    if (data.__delete) {
      setMicrosites(prev => prev.filter(ms => ms.id !== data.id));
      return;
    }
    if (data.id) {
      setMicrosites(prev => prev.map(ms =>
        ms.id === data.id ? { ...ms, description: data.description, details: data.details, imageUrl: data.imageUrl } : ms
      ));
    } else {
      const newMs = {
        id: `ms${Date.now()}`,
        name: data.description.replace(/\s+/g, ""),
        description: data.description,
        details: data.details,
        imageUrl: data.imageUrl,
        company: "Personalyz",
        cards: 0,
        created: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      };
      setMicrosites(prev => [newMs, ...prev]);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <TopBar
        title="Microsites"
        subtitle="Vehicle lots and card collections"
        actions={
          <Btn icon={<Icon name="plus" size={15} color="#fff" />} onClick={openNew}>
            + New Microsite
          </Btn>
        }
      />

      <div style={{ padding: "20px 28px", maxWidth: 1200 }}>
        {/* Filters row */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          {/* Search */}
          <div style={{ position: "relative", width: 240 }}>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
              <Icon name="search" size={14} color={T.muted} />
            </div>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search microsites..."
              style={{
                width: "100%", padding: "8px 12px 8px 32px", fontSize: 13, fontFamily: font.ui,
                border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                background: T.surface, color: T.ink, outline: "none", boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
          {/* Type filter pill */}
          <button
            onClick={() => setFilterType(filterType === "Vehicle" ? "" : "Vehicle")}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 20,
              border: `1px solid ${filterType === "Vehicle" ? T.accent : T.border}`,
              background: filterType === "Vehicle" ? T.accentSoft : T.surface,
              color: filterType === "Vehicle" ? T.accent : T.sub,
              fontSize: 13, fontWeight: 600, fontFamily: font.ui, cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            Vehicle
            <span style={{
              background: filterType === "Vehicle" ? T.accent : T.faint,
              color: filterType === "Vehicle" ? "#fff" : T.sub,
              fontSize: 11, fontWeight: 700, padding: "1px 6px", borderRadius: 10,
            }}>{microsites.length}</span>
          </button>
        </div>

        {/* Table */}
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 220px 100px 130px",
            padding: "10px 20px", borderBottom: `1px solid ${T.border}`,
            background: T.surfaceAlt,
          }}>
            {["MICROSITE", "COMPANY", "CARDS", "CREATED"].map(col => (
              <div key={col} style={{ fontSize: 11, fontWeight: 700, color: T.muted, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div style={{ padding: "48px 20px", textAlign: "center", color: T.muted, fontSize: 14, fontFamily: font.ui }}>
              No microsites found.
            </div>
          ) : paginated.map((ms, i) => (
            <div
              key={ms.id}
              style={{
                display: "grid", gridTemplateColumns: "1fr 220px 100px 130px",
                padding: "13px 20px", alignItems: "center",
                borderBottom: i < paginated.length - 1 ? `1px solid ${T.borderLight}` : "none",
                cursor: "pointer", transition: "background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.surfaceAlt}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              onClick={() => openEdit(ms)}
            >
              {/* Microsite name + description */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, flexShrink: 0, overflow: "hidden",
                  background: ms.imageUrl ? "transparent" : `linear-gradient(135deg, ${T.faint}, ${T.surfaceAlt})`,
                  border: `1px solid ${T.borderLight}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {ms.imageUrl
                    ? <img src={ms.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <Icon name="globe" size={18} color={T.muted} />
                  }
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>{ms.name}</div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 1 }}>{ms.description}</div>
                </div>
              </div>

              {/* Company */}
              <div style={{ fontSize: 13, color: T.ink2, fontFamily: font.ui }}>{ms.company}</div>

              {/* Cards badge */}
              <div>
                <span style={{
                  fontSize: 12, fontWeight: 700, fontFamily: font.mono,
                  color: ms.cards === 0 ? T.muted : T.success,
                  background: ms.cards === 0 ? T.faint : T.successSoft,
                  padding: "2px 8px", borderRadius: 10,
                }}>
                  {ms.cards}
                </span>
              </div>

              {/* Created */}
              <div style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>{ms.created}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 0", fontSize: 13, color: T.sub, fontFamily: font.ui,
        }}>
          <span>
            Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} microsites
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: page === 1 ? T.faint : T.surface, cursor: page === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon name="chevLeft" size={14} color={page === 1 ? T.muted : T.ink} />
            </button>
            <span style={{
              width: 28, height: 28, borderRadius: 6, background: T.accent, color: "#fff",
              fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: font.mono,
            }}>{page}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: page >= totalPages ? T.faint : T.surface, cursor: page >= totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon name="chevRight" size={14} color={page >= totalPages ? T.muted : T.ink} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 12 }}>
              <span style={{ fontSize: 12, color: T.muted }}>Per page</span>
              <div style={{ position: "relative" }}>
                <select
                  value={perPage}
                  onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
                  style={{
                    padding: "4px 24px 4px 8px", fontSize: 12, fontFamily: font.ui,
                    border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                    background: T.surface, color: T.ink, outline: "none", appearance: "none", cursor: "pointer",
                  }}
                >
                  {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon name="chevDown" size={11} color={T.muted} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Panel */}
      <MicrositeSlidePanelOuter
        open={panelOpen}
        onClose={closePanel}
        microsite={editingMs}
        onSave={handleSave}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANALYTICS VIEW
// ═══════════════════════════════════════════════════════════════

// Shared select component for analytics filters
function Select({ label, value, options, onChange, width }) {
  return (
    <div style={{ minWidth: width || 120 }}>
      {label && <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.muted, marginBottom: 4, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%", padding: "7px 28px 7px 10px", fontSize: 13, fontFamily: font.ui, fontWeight: 500,
            border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface,
            color: T.ink, outline: "none", appearance: "none", cursor: "pointer",
          }}
        >
          {options.map(o => <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>{typeof o === "string" ? o : o.label}</option>)}
        </select>
        <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <Icon name="chevDown" size={13} color={T.muted} />
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  // ── Filter state ──
  const [period, setPeriod] = useState("Today");
  const [groupBy, setGroupBy] = useState("Hour");
  const [dimension, setDimension] = useState("Card");
  const [cardType, setCardType] = useState("All");
  const [topN, setTopN] = useState("10");
  const [company, setCompany] = useState("All");
  const [orgUnit, setOrgUnit] = useState("All");
  const [card, setCard] = useState("All");
  const [metric, setMetric] = useState("hits");
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [explorerCard, setExplorerCard] = useState(null);
  const [explorerSearch, setExplorerSearch] = useState("");
  const [selectedHitIdx, setSelectedHitIdx] = useState(null);

  // ── Analytics data ──
  const timeSeriesData = [
    { time: "3:00 AM", hits: 1, sessions: 1, users: 1 },
    { time: "4:00 AM", hits: 0, sessions: 0, users: 0 },
    { time: "5:00 AM", hits: 0, sessions: 0, users: 0 },
    { time: "6:00 AM", hits: 2, sessions: 1, users: 1 },
    { time: "7:00 AM", hits: 1, sessions: 1, users: 1 },
    { time: "8:00 AM", hits: 3, sessions: 2, users: 2 },
    { time: "9:00 AM", hits: 2, sessions: 2, users: 1 },
    { time: "10:00 AM", hits: 3, sessions: 2, users: 2 },
    { time: "11:00 AM", hits: 6, sessions: 4, users: 3 },
    { time: "12:00 PM", hits: 2, sessions: 2, users: 1 },
    { time: "1:00 PM", hits: 1, sessions: 1, users: 1 },
    { time: "2:00 PM", hits: 3, sessions: 2, users: 2 },
    { time: "3:00 PM", hits: 5, sessions: 3, users: 3 },
  ];
  const maxHits = Math.max(...timeSeriesData.map(d => d.hits), 1);

  const breakdownData = [
    { name: "jetour001", company: "JetourBW", hits: 6, type: "Business" },
    { name: "JetourMauritius", company: "Jetour", hits: 5, type: "Business" },
    { name: "NovaRenevations", company: "Seriti", hits: 4, type: "Business" },
    { name: "SeritiNZDemoCard", company: "Seriti", hits: 3, type: "Business" },
    { name: "YolandaRossouw", company: "Jetour", hits: 3, type: "Business" },
    { name: "WinterMenu", company: "Personalyz", hits: 2, type: "Generic" },
    { name: "AashiqHemraz", company: "Jetour", hits: 1, type: "Business" },
    { name: "DashingDelux", company: "Jetour", hits: 1, type: "Vehicle" },
    { name: "Mullerduplessis", company: "Seriti", hits: 1, type: "Business" },
  ];
  const maxBreakdown = Math.max(...breakdownData.map(d => d.hits), 1);

  const deviceData = [
    { device: "Mobile", count: 21, pct: 78, icon: "smartphone" },
    { device: "Desktop", count: 6, pct: 22, icon: "monitor" },
  ];

  const browserData = [
    { name: "Chrome", pct: 52, color: T.accent },
    { name: "Safari", pct: 30, color: T.purple },
    { name: "Firefox", pct: 11, color: T.warning },
    { name: "Other", pct: 7, color: T.muted },
  ];

  const companyBreakdown = [
    { name: "Jetour", hits: 12, pct: 100 },
    { name: "Seriti", hits: 8, pct: 67 },
    { name: "Personalyz", hits: 5, pct: 42 },
    { name: "JetourBW", hits: 2, pct: 17 },
  ];

  // ── Card Explorer data ──
  const explorerCards = [
    { name: "jetour001", company: "JetourBW", orgUnit: "—", hits: 6 },
    { name: "JetourMauritius", company: "Jetour", orgUnit: "Phoenix", hits: 5 },
    { name: "NovaRenevations", company: "Seriti", orgUnit: "Nova", hits: 4 },
    { name: "SeritiNZDemoCard", company: "Seriti", orgUnit: "Seriti New Zealand", hits: 3 },
    { name: "YolandaRossouw", company: "Jetour", orgUnit: "Phoenix", hits: 3 },
    { name: "WinterMenu", company: "Personalyz", orgUnit: "DemoCards", hits: 2 },
    { name: "DashingDelux", company: "Jetour", orgUnit: "Phoenix", hits: 1 },
  ];

  const hitLogData = [
    { time: "3:24:16 PM", card: "DashingDelux", company: "Jetour", orgUnit: "Phoenix", device: "desktop", browser: "Chrome", lat: -20.16, lng: 57.50, location: "Port Louis, MU" },
    { time: "3:23:58 PM", card: "JetourMauritius", company: "Jetour", orgUnit: "Phoenix", device: "desktop", browser: "Chrome", lat: -20.24, lng: 57.48, location: "Quatre Bornes, MU" },
    { time: "3:23:57 PM", card: "AashiqHemraz", company: "Jetour", orgUnit: "Phoenix", device: "desktop", browser: "Chrome", lat: -20.16, lng: 57.50, location: "Port Louis, MU" },
    { time: "3:18:53 PM", card: "SeritiNZDemoCard", company: "Seriti", orgUnit: "Seriti NZ", device: "desktop", browser: "Chrome", lat: -36.85, lng: 174.76, location: "Auckland, NZ" },
    { time: "3:05:18 PM", card: "JetourMauritius", company: "Jetour", orgUnit: "Phoenix", device: "desktop", browser: "Chrome", lat: -20.26, lng: 57.55, location: "Rose Hill, MU" },
    { time: "3:00:06 PM", card: "NovaRenevations", company: "Seriti", orgUnit: "Nova", device: "mobile", browser: "Chrome", lat: -26.20, lng: 28.04, location: "Johannesburg, ZA" },
    { time: "2:59:56 PM", card: "NovaRenevations", company: "Seriti", orgUnit: "Nova", device: "mobile", browser: "Chrome", lat: -26.20, lng: 28.04, location: "Johannesburg, ZA" },
    { time: "12:00:53 PM", card: "NovaRenevations", company: "Seriti", orgUnit: "Nova", device: "mobile", browser: "Chrome", lat: -25.75, lng: 28.19, location: "Pretoria, ZA" },
    { time: "11:59:15 AM", card: "Mullerduplessis", company: "Seriti", orgUnit: "SeritiSolutions", device: "mobile", browser: "Safari", lat: -33.93, lng: 18.42, location: "Cape Town, ZA" },
    { time: "11:33:49 AM", card: "jetour001", company: "JetourBW", orgUnit: "—", device: "mobile", browser: "Chrome", lat: -24.65, lng: 25.91, location: "Gaborone, BW" },
    { time: "11:33:35 AM", card: "jetour001", company: "JetourBW", orgUnit: "—", device: "mobile", browser: "Chrome", lat: -24.65, lng: 25.91, location: "Gaborone, BW" },
    { time: "11:33:23 AM", card: "jetour001", company: "JetourBW", orgUnit: "—", device: "mobile", browser: "Chrome", lat: -24.65, lng: 25.91, location: "Gaborone, BW" },
    { time: "11:31:52 AM", card: "jetour001", company: "JetourBW", orgUnit: "—", device: "mobile", browser: "Safari", lat: -24.68, lng: 25.93, location: "Gaborone, BW" },
    { time: "10:45:30 AM", card: "JetourMauritius", company: "Jetour", orgUnit: "Phoenix", device: "mobile", browser: "Firefox", lat: -20.16, lng: 57.50, location: "Port Louis, MU" },
    { time: "10:45:25 AM", card: "YolandaRossouw", company: "Jetour", orgUnit: "Phoenix", device: "mobile", browser: "Firefox", lat: -20.16, lng: 57.50, location: "Port Louis, MU" },
    { time: "9:31:55 AM", card: "JetourMauritius", company: "Jetour", orgUnit: "Phoenix", device: "mobile", browser: "Safari", lat: -20.24, lng: 57.48, location: "Quatre Bornes, MU" },
  ];

  const filteredExplorerCards = explorerCards.filter(c =>
    !explorerSearch || c.name.toLowerCase().includes(explorerSearch.toLowerCase())
  );

  const filteredHitLog = explorerCard
    ? hitLogData.filter(h => h.card === explorerCard)
    : hitLogData;

  const totalHits = breakdownData.reduce((s, d) => s + d.hits, 0);
  const totalSessions = 18;
  const totalUsers = 12;

  // ── Metric selector pill ──
  const MetricPill = ({ id, label, active, onClick }) => (
    <button onClick={() => onClick(id)} style={{
      padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: font.ui,
      border: `1px solid ${active ? T.accent : T.border}`, borderRadius: 20,
      background: active ? T.accent : T.surface, color: active ? "#fff" : T.sub,
      cursor: "pointer", transition: "all 0.15s", lineHeight: 1,
    }}>{label}</button>
  );

  return (
    <div>
      <TopBar title="Analytics" subtitle="Card performance across all companies" actions={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Btn variant="secondary" size="sm" icon={<Icon name="download" size={14} color={T.sub} />}>Export CSV</Btn>
          <Btn variant="secondary" size="sm" icon={<Icon name="refresh" size={14} color={T.sub} />}>Refresh</Btn>
        </div>
      } />
      <div style={{ overflowY: "auto", height: "calc(100vh - 56px)" }}>
        <div style={{ padding: "20px 28px", maxWidth: 1400 }}>

          {/* ═══ FILTER BAR ═══ */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 20, overflow: "hidden" }}>
            {/* Primary filters row */}
            <div style={{ padding: "14px 18px", display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
              <Select label="Range" value={period} onChange={setPeriod} width={110}
                options={["Today", "Yesterday", "7 Days", "30 Days", "90 Days", "This Month", "Last Month", "Custom"]} />
              <Select label="Group By" value={groupBy} onChange={setGroupBy} width={100}
                options={["Hour", "Day", "Week", "Month"]} />
              <Select label="Dimension" value={dimension} onChange={setDimension} width={110}
                options={["Card", "Company", "Org Unit", "Device", "Browser"]} />
              <Select label="Card Type" value={cardType} onChange={setCardType} width={100}
                options={["All", "Business", "Vehicle", "Generic", "Microsite"]} />
              <Select label="Top" value={topN} onChange={setTopN} width={70}
                options={["5", "10", "20", "50"]} />

              {/* Expand/collapse secondary filters */}
              <button
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
                  border: `1px solid ${filtersExpanded ? T.accent : T.border}`, borderRadius: T.radiusSm,
                  background: filtersExpanded ? T.accentSoft : "transparent", cursor: "pointer",
                  fontSize: 12, fontWeight: 600, fontFamily: font.ui, color: filtersExpanded ? T.accent : T.sub,
                  transition: "all 0.15s", marginBottom: 0, alignSelf: "flex-end",
                }}
              >
                <Icon name="filter" size={14} color={filtersExpanded ? T.accent : T.muted} />
                Filters
                <Icon name={filtersExpanded ? "chevDown" : "chevRight"} size={12} color={filtersExpanded ? T.accent : T.muted} />
              </button>

              {/* Metric pills - pushed right */}
              <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignSelf: "flex-end" }}>
                <MetricPill id="hits" label="Total Hits" active={metric === "hits"} onClick={setMetric} />
                <MetricPill id="sessions" label="Sessions" active={metric === "sessions"} onClick={setMetric} />
                <MetricPill id="users" label="Users" active={metric === "users"} onClick={setMetric} />
              </div>
            </div>

            {/* Secondary filters (collapsible) */}
            {filtersExpanded && (
              <div style={{ padding: "0 18px 14px", display: "flex", gap: 12, borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                <Select label="Company" value={company} onChange={setCompany} width={140}
                  options={["All", "Personalyz", "Jetour", "JetourBW", "Seriti", "ToyotaKenya"]} />
                <Select label="Org Unit" value={orgUnit} onChange={setOrgUnit} width={140}
                  options={["All", "Phoenix", "Port Louis", "Nova", "Seriti NZ", "DemoCards", "Sales"]} />
                <Select label="Card" value={card} onChange={setCard} width={160}
                  options={["All", ...explorerCards.map(c => c.name)]} />
              </div>
            )}
          </div>

          {/* ═══ STAT CARDS ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
            <StatCard label="Total Hits" value={totalHits.toLocaleString()} change="12%" changeType="up" icon="cursor" accent={T.accentSoft} />
            <StatCard label="Unique Sessions" value={totalSessions.toString()} change="8%" changeType="up" icon="trendUp" accent={T.successSoft} />
            <StatCard label="Unique Users" value={totalUsers.toString()} change="3" changeType="up" icon="users" accent={T.purpleSoft} />
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.sub, fontFamily: font.ui }}>Device Split</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.warningSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="smartphone" size={16} color={T.warning} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                {deviceData.map(d => (
                  <div key={d.device}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                      <Icon name={d.icon} size={13} color={T.sub} />
                      <span style={{ fontSize: 11, color: T.muted, fontFamily: font.ui }}>{d.device}</span>
                    </div>
                    <span style={{ fontSize: 22, fontWeight: 700, color: T.ink, fontFamily: font.display }}>{d.pct}%</span>
                  </div>
                ))}
              </div>
              {/* Mini stacked bar */}
              <div style={{ display: "flex", height: 4, borderRadius: 2, overflow: "hidden", marginTop: 8 }}>
                <div style={{ width: `${deviceData[0].pct}%`, background: T.accent }} />
                <div style={{ width: `${deviceData[1].pct}%`, background: T.purple }} />
              </div>
            </div>
          </div>

          {/* ═══ ROW 2: TIME SERIES + BREAKDOWN ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

            {/* Area chart — Hits over time */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>
                  {metric === "hits" ? "Total Hits" : metric === "sessions" ? "Unique Sessions" : "Unique Users"} Over Time
                </div>
                <Btn variant="ghost" size="sm" icon={<Icon name="download" size={13} color={T.muted} />}>CSV</Btn>
              </div>
              {/* Y-axis + chart area */}
              <div style={{ display: "flex", gap: 0, height: 180 }}>
                {/* Y labels */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 8, paddingBottom: 22 }}>
                  {[maxHits, Math.round(maxHits * 0.66), Math.round(maxHits * 0.33), 0].map(v => (
                    <span key={v} style={{ fontSize: 10, color: T.muted, fontFamily: font.mono, textAlign: "right", minWidth: 14 }}>{v}</span>
                  ))}
                </div>
                {/* Chart bars with area effect */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, position: "relative" }}>
                    {/* Grid lines */}
                    {[0, 33, 66, 100].map(p => (
                      <div key={p} style={{ position: "absolute", left: 0, right: 0, bottom: `${p}%`, height: 1, background: T.borderLight, zIndex: 0 }} />
                    ))}
                    {timeSeriesData.map((d, i) => {
                      const val = metric === "hits" ? d.hits : metric === "sessions" ? d.sessions : d.users;
                      const h = maxHits > 0 ? (val / maxHits) * 100 : 0;
                      return (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                          <div style={{
                            width: "100%", height: `${Math.max(h, 2)}%`,
                            borderRadius: "3px 3px 0 0",
                            background: `linear-gradient(180deg, ${T.accent}cc, ${T.accent}40)`,
                            transition: "height 0.3s ease",
                            minHeight: val > 0 ? 4 : 0,
                          }} />
                        </div>
                      );
                    })}
                  </div>
                  {/* X labels */}
                  <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
                    {timeSeriesData.map((d, i) => (
                      <div key={i} style={{ flex: 1, textAlign: "center" }}>
                        {i % 3 === 0 && <span style={{ fontSize: 9, color: T.muted, fontFamily: font.mono }}>{d.time.replace(":00 ", "")}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal bar — Breakdown by dimension */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>
                  Breakdown <span style={{ fontSize: 12, fontWeight: 400, color: T.muted }}>by {dimension.toLowerCase()}</span>
                </div>
                <Btn variant="ghost" size="sm" icon={<Icon name="download" size={13} color={T.muted} />}>CSV</Btn>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {breakdownData.slice(0, parseInt(topN)).map((d, i) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui, width: 120, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 0 }}>{d.name}</span>
                    <div style={{ flex: 1, height: 20, borderRadius: 3, background: T.faint, overflow: "hidden", position: "relative" }}>
                      <div style={{
                        height: "100%", borderRadius: 3,
                        background: `linear-gradient(90deg, ${T.accent}, #4A90D9)`,
                        width: `${(d.hits / maxBreakdown) * 100}%`,
                        opacity: 1 - i * 0.06,
                        transition: "width 0.4s ease",
                      }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, fontFamily: font.mono, minWidth: 20, textAlign: "right" }}>{d.hits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ ROW 3: TOP CARDS + BROWSER/COMPANY ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>

            {/* Top Performing Cards (kept from original) */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, marginBottom: 16 }}>Top Performing Cards</div>
              {breakdownData.slice(0, 5).map((c, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{c.name}</span>
                      <Badge label={c.type} variant={c.type.toLowerCase()} />
                    </div>
                    <span style={{ fontSize: 11, fontFamily: font.mono, color: T.sub }}>{c.hits}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: T.faint }}>
                    <div style={{ height: 4, borderRadius: 2, background: T.accent, width: `${(c.hits / maxBreakdown) * 100}%`, opacity: 1 - i * 0.12, transition: "width 0.3s" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Browser breakdown */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, marginBottom: 16 }}>Browser</div>
              {/* Mini donut representation using stacked bar */}
              <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                {browserData.map((b) => (
                  <div key={b.name} style={{ width: `${b.pct}%`, background: b.color, transition: "width 0.3s" }} />
                ))}
              </div>
              {browserData.map((b, i) => (
                <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < browserData.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: b.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: T.ink, fontFamily: font.ui, flex: 1 }}>{b.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font.mono }}>{b.pct}%</span>
                </div>
              ))}
            </div>

            {/* Company breakdown */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, marginBottom: 16 }}>By Company</div>
              {companyBreakdown.map((co, i) => (
                <div key={co.name} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{co.name}</span>
                    <span style={{ fontSize: 11, fontFamily: font.mono, color: T.sub }}>{co.hits} hits</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: T.faint }}>
                    <div style={{ height: 4, borderRadius: 2, background: T.purple, width: `${co.pct}%`, opacity: 1 - i * 0.15, transition: "width 0.3s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ ROW 4: CARD ACCESS EXPLORER ═══ */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="search" size={16} color={T.accent} />
                <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>Card Access Explorer</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {explorerCard && (
                  <button onClick={() => { setExplorerCard(null); setSelectedHitIdx(null); }} style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
                    borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.accentSoft,
                    cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: font.ui, color: T.accent,
                  }}>
                    {explorerCard}
                    <Icon name="x" size={12} color={T.accent} />
                  </button>
                )}
                <Btn variant="ghost" size="sm" icon={<Icon name="download" size={13} color={T.muted} />}>Export</Btn>
              </div>
            </div>

            <div style={{ display: "flex", minHeight: 520 }}>
              {/* Left: Card selector + Map */}
              <div style={{ width: 300, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column" }}>
                {/* Search input */}
                <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.borderLight}` }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}>
                      <Icon name="search" size={14} color={T.muted} />
                    </div>
                    <input
                      value={explorerSearch}
                      onChange={(e) => setExplorerSearch(e.target.value)}
                      placeholder="Search cards…"
                      style={{
                        width: "100%", padding: "7px 10px 7px 30px", fontSize: 13, fontFamily: font.ui,
                        border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surfaceAlt,
                        color: T.ink, outline: "none", boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
                {/* Card list */}
                <div style={{ flex: 1, overflowY: "auto", maxHeight: 220 }}>
                  {filteredExplorerCards.map((c) => {
                    const isActive = explorerCard === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => { setExplorerCard(isActive ? null : c.name); setSelectedHitIdx(null); }}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", padding: "10px 14px", border: "none", cursor: "pointer",
                          background: isActive ? T.accentSoft : "transparent",
                          borderLeft: `3px solid ${isActive ? T.accent : "transparent"}`,
                          borderBottom: `1px solid ${T.borderLight}`,
                          transition: "all 0.1s", fontFamily: font.ui, textAlign: "left",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? T.accent : T.ink }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: T.muted }}>{c.company}{c.orgUnit !== "—" ? ` · ${c.orgUnit}` : ""}</div>
                        </div>
                        <span style={{
                          fontSize: 11, fontWeight: 700, fontFamily: font.mono,
                          color: isActive ? T.accent : T.sub,
                          background: isActive ? "rgba(0,102,255,0.1)" : T.faint,
                          padding: "2px 8px", borderRadius: 10,
                        }}>{c.hits}</span>
                      </button>
                    );
                  })}
                </div>

                {/* ── Location Map Panel ── */}
                <div style={{ borderTop: `1px solid ${T.border}`, flex: 1, display: "flex", flexDirection: "column", minHeight: 260 }}>
                  <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="mapPin" size={14} color={T.accent} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Location</span>
                    {selectedHitIdx !== null && filteredHitLog[selectedHitIdx] && (
                      <span style={{ fontSize: 11, color: T.muted, fontFamily: font.ui, marginLeft: "auto" }}>
                        {filteredHitLog[selectedHitIdx].location}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#E8ECF0" }}>
                    {/* SVG Map visualization */}
                    {(selectedHitIdx !== null && filteredHitLog[selectedHitIdx]) ? (() => {
                      const hit = filteredHitLog[selectedHitIdx];
                      // Gather all pins for context (from filtered hits with unique locations)
                      const uniqueLocations = [];
                      const seen = new Set();
                      filteredHitLog.forEach(h => {
                        const key = `${h.lat},${h.lng}`;
                        if (!seen.has(key)) { seen.add(key); uniqueLocations.push(h); }
                      });
                      // Map projection: simple mercator-ish fit to data bounds
                      const lats = uniqueLocations.map(l => l.lat);
                      const lngs = uniqueLocations.map(l => l.lng);
                      const minLat = Math.min(...lats) - 2;
                      const maxLat = Math.max(...lats) + 2;
                      const minLng = Math.min(...lngs) - 2;
                      const maxLng = Math.max(...lngs) + 2;
                      const project = (lat, lng) => ({
                        x: ((lng - minLng) / (maxLng - minLng)) * 100,
                        y: ((maxLat - lat) / (maxLat - minLat)) * 100,
                      });

                      return (
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                          {/* Grid lines for map feel */}
                          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                            {[20, 40, 60, 80].map(p => (
                              <g key={p}>
                                <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke={T.border} strokeWidth="0.5" strokeDasharray="4 4" />
                                <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke={T.border} strokeWidth="0.5" strokeDasharray="4 4" />
                              </g>
                            ))}
                          </svg>
                          {/* All location pins (faded) */}
                          {uniqueLocations.map((loc, i) => {
                            const pos = project(loc.lat, loc.lng);
                            const isSelected = loc.lat === hit.lat && loc.lng === hit.lng;
                            return (
                              <div key={i} style={{
                                position: "absolute",
                                left: `${pos.x}%`, top: `${pos.y}%`,
                                transform: "translate(-50%, -100%)",
                                zIndex: isSelected ? 10 : 1,
                                transition: "all 0.3s ease",
                              }}>
                                {/* Pin stem */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                  <div style={{
                                    width: isSelected ? 28 : 16, height: isSelected ? 28 : 16,
                                    borderRadius: "50% 50% 50% 0",
                                    background: isSelected ? T.accent : T.muted,
                                    transform: "rotate(-45deg)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: isSelected ? `0 2px 8px ${T.accent}60` : "0 1px 3px rgba(0,0,0,0.15)",
                                    transition: "all 0.3s ease",
                                  }}>
                                    <div style={{
                                      width: isSelected ? 10 : 6, height: isSelected ? 10 : 6,
                                      borderRadius: "50%", background: "#fff",
                                      transform: "rotate(45deg)",
                                    }} />
                                  </div>
                                  {/* Shadow dot */}
                                  <div style={{
                                    width: isSelected ? 12 : 6, height: 3,
                                    borderRadius: "50%",
                                    background: "rgba(0,0,0,0.15)",
                                    marginTop: 2,
                                    transition: "all 0.3s ease",
                                  }} />
                                </div>
                                {/* Label on selected pin */}
                                {isSelected && (
                                  <div style={{
                                    position: "absolute", bottom: "calc(100% + 4px)", left: "50%",
                                    transform: "translateX(-50%)",
                                    background: T.ink, color: "#fff",
                                    padding: "3px 8px", borderRadius: 4,
                                    fontSize: 10, fontWeight: 600, fontFamily: font.ui,
                                    whiteSpace: "nowrap",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                  }}>
                                    {loc.location}
                                    {/* Tooltip arrow */}
                                    <div style={{
                                      position: "absolute", top: "100%", left: "50%",
                                      transform: "translateX(-50%)",
                                      width: 0, height: 0,
                                      borderLeft: "4px solid transparent",
                                      borderRight: "4px solid transparent",
                                      borderTop: `4px solid ${T.ink}`,
                                    }} />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })() : (
                      /* Empty state */
                      <div style={{
                        width: "100%", height: "100%",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        gap: 8, padding: 20,
                      }}>
                        {/* Subtle map grid background */}
                        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
                          {[20, 40, 60, 80].map(p => (
                            <g key={p}>
                              <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke={T.border} strokeWidth="0.5" strokeDasharray="4 4" />
                              <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke={T.border} strokeWidth="0.5" strokeDasharray="4 4" />
                            </g>
                          ))}
                        </svg>
                        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: 12, margin: "0 auto 8px",
                            background: T.faint, display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon name="mapPin" size={22} color={T.muted} />
                          </div>
                          <div style={{ fontSize: 12, color: T.sub, fontFamily: font.ui, fontWeight: 500 }}>
                            Select a row to view location
                          </div>
                          <div style={{ fontSize: 11, color: T.muted, fontFamily: font.ui, marginTop: 2, fontStyle: "italic" }}>
                            Location is approximate
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Hit log table */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Table header */}
                <div style={{
                  display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 74px 74px 100px",
                  gap: 6, padding: "10px 16px", borderBottom: `1px solid ${T.border}`,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: T.muted,
                  fontFamily: font.mono, textTransform: "uppercase", background: T.surfaceAlt,
                }}>
                  <span>Time</span><span>Card</span><span>Company</span><span>Org Unit</span><span>Device</span><span>Browser</span><span>Location</span>
                </div>
                {/* Table rows */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {filteredHitLog.length === 0 ? (
                    <div style={{ padding: 40, textAlign: "center" }}>
                      <Icon name="cursor" size={24} color={T.faint} />
                      <div style={{ fontSize: 13, color: T.muted, marginTop: 8, fontFamily: font.ui }}>
                        {explorerCard ? "No hits recorded for this card" : "Select a card to filter, or view all hits"}
                      </div>
                    </div>
                  ) : (
                    filteredHitLog.map((h, i) => {
                      const isRowSelected = selectedHitIdx === i;
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedHitIdx(isRowSelected ? null : i)}
                          style={{
                            display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 74px 74px 100px",
                            gap: 6, padding: "9px 16px", alignItems: "center",
                            borderBottom: `1px solid ${T.borderLight}`,
                            fontSize: 12, fontFamily: font.ui, color: T.ink2,
                            background: isRowSelected ? T.accentSoft : i % 2 === 0 ? "transparent" : T.surfaceAlt,
                            borderLeft: `3px solid ${isRowSelected ? T.accent : "transparent"}`,
                            cursor: "pointer", transition: "all 0.1s",
                          }}
                        >
                          <span style={{ fontFamily: font.mono, fontSize: 11, color: T.sub }}>{h.time}</span>
                          <span style={{ fontWeight: 600, color: isRowSelected ? T.accent : T.ink }}>{h.card}</span>
                          <span style={{ color: T.sub }}>{h.company}</span>
                          <span style={{ color: T.muted }}>{h.orgUnit}</span>
                          <span>
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 3,
                              padding: "1px 6px", borderRadius: 3, fontSize: 11,
                              background: h.device === "desktop" ? T.purpleSoft : T.accentSoft,
                              color: h.device === "desktop" ? T.purple : T.accent,
                            }}>
                              <Icon name={h.device === "desktop" ? "monitor" : "smartphone"} size={11} color={h.device === "desktop" ? T.purple : T.accent} />
                              {h.device}
                            </span>
                          </span>
                          <span style={{ fontSize: 11, color: T.sub }}>{h.browser}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: isRowSelected ? T.accent : T.muted }}>
                            <Icon name="mapPin" size={11} color={isRowSelected ? T.accent : T.muted} />
                            {h.location}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMPANIES VIEW
// ═══════════════════════════════════════════════════════════════

function CompaniesView() {
  const companies = [
    { name: "Personalyz", id: "99711c2d", users: 4, cards: 22, orgUnits: ["DemoCards"], plan: "Enterprise" },
    { name: "ToyotaKenya", id: "17697ab6", users: 6, cards: 15, orgUnits: ["Sales", "Service"], plan: "Business" },
    { name: "Jetour", id: "ee95ae56", users: 3, cards: 10, orgUnits: ["Phoenix", "Port Louis"], plan: "Business" },
  ];
  return (
    <div>
      <TopBar title="Companies" subtitle={`${companies.length} organizations`} actions={<Btn icon={<Icon name="plus" size={15} color="#fff" />}>Add Company</Btn>} />
      <div style={{ padding: "24px 28px", maxWidth: 1200 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {companies.map((co) => (
            <div key={co.id} style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="building" size={20} color={T.accent} />
                </div>
                <Badge label={co.plan} variant={co.plan === "Enterprise" ? "business" : "default"} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font.display, marginBottom: 4 }}>{co.name}</div>
              <div style={{ fontSize: 11, color: T.muted, fontFamily: font.mono, marginBottom: 12 }}>ID: {co.id}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ padding: 10, borderRadius: T.radiusSm, background: T.surfaceAlt, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: font.display }}>{co.users}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>Users</div>
                </div>
                <div style={{ padding: 10, borderRadius: T.radiusSm, background: T.surfaceAlt, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: font.display }}>{co.cards}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>Cards</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 4 }}>Org Units</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {co.orgUnits.map((ou) => <Badge key={ou} label={ou} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NOTIFICATIONS VIEW
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// PUSH NOTIFICATIONS — Send Modal
// ═══════════════════════════════════════════════════════════════
function SendPushModal({ open, onClose, selectedCards, onSent }) {
  const [title, setTitle] = useState("");
  const [routeToCard, setRouteToCard] = useState(true);
  const [customUrl, setCustomUrl] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => { if (open) { setTitle(""); setRouteToCard(true); setCustomUrl(""); setMessage(""); } }, [open]);

  const canSend = title.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onSent({ title, url: routeToCard ? null : customUrl, message, cards: selectedCards });
      onClose();
    }, 800);
  };

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
      {/* Modal */}
      <div style={{
        position: "relative", zIndex: 1, width: 480, background: T.surface,
        borderRadius: T.radiusLg, boxShadow: T.shadowLg,
        border: `1px solid ${T.border}`, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, fontFamily: font.display, letterSpacing: "-0.01em" }}>
              Send Push Notification
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, fontFamily: font.ui,
                background: T.accentSoft, color: T.accent,
                padding: "3px 10px", borderRadius: 20,
              }}>
                {selectedCards.length} card{selectedCards.length !== 1 ? "s" : ""} selected
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: T.faint, border: "none", borderRadius: 8, cursor: "pointer", padding: 7, display: "flex" }}>
            <Icon name="x" size={15} color={T.sub} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          {/* Title */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>
              Title <span style={{ color: T.danger }}>*</span>
            </label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Notification title"
              autoFocus
              style={{
                width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui,
                border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                background: T.surface, color: T.ink, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>

          {/* Route to card toggle */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 14px", marginBottom: 16,
            background: routeToCard ? T.accentSoft : T.surfaceAlt,
            border: `1px solid ${routeToCard ? T.accent : T.border}`,
            borderRadius: T.radius, transition: "all 0.15s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: routeToCard ? T.accent : T.faint,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}>
                <Icon name="cards" size={15} color={routeToCard ? "#fff" : T.muted} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Route to Card</div>
                <div style={{ fontSize: 11, color: T.sub }}>Tapping the notification opens the card directly</div>
              </div>
            </div>
            <Toggle on={routeToCard} onClick={() => { setRouteToCard(!routeToCard); setCustomUrl(""); }} />
          </div>

          {/* Custom URL — shown as its own block when route to card is off */}
          {!routeToCard && (
            <div style={{
              padding: "14px 16px", marginBottom: 16,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: T.radius,
            }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 6, fontFamily: font.ui }}>
                Custom URL <span style={{ color: T.muted, fontWeight: 400 }}>(optional — leave blank for alert only)</span>
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon name="globe" size={14} color={T.muted} />
                </div>
                <input
                  value={customUrl}
                  onChange={e => setCustomUrl(e.target.value)}
                  placeholder="https://..."
                  autoFocus
                  style={{
                    width: "100%", padding: "9px 12px 9px 32px", fontSize: 14, fontFamily: font.ui,
                    border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                    background: T.surfaceAlt, color: T.ink, outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.target.style.borderColor = T.accent}
                  onBlur={e => e.target.style.borderColor = T.border}
                />
              </div>
            </div>
          )}

          {/* Message */}
          <div style={{ marginBottom: 4 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>
              Message <span style={{ color: T.muted, fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Notification message body…"
              rows={3}
              style={{
                width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui,
                border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                background: T.surface, color: T.ink, outline: "none",
                boxSizing: "border-box", resize: "vertical", lineHeight: 1.5,
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "flex-end", gap: 8, background: T.surfaceAlt }}>
          <Btn variant="ghost" size="sm" onClick={onClose}>Cancel</Btn>
          <Btn
            variant="primary" size="sm" disabled={!canSend || sending}
            icon={sending ? undefined : <Icon name="bell" size={14} color="#fff" />}
            onClick={handleSend}
          >
            {sending ? "Sending…" : `Send to ${selectedCards.length} Card${selectedCards.length !== 1 ? "s" : ""}`}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PUSH NOTIFICATIONS — Detail Modal
// ═══════════════════════════════════════════════════════════════
function NotifDetailModal({ notif, onClose }) {
  if (!notif) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
      <div style={{
        position: "relative", zIndex: 1, width: 440, background: T.surface,
        borderRadius: T.radiusLg, boxShadow: T.shadowLg,
        border: `1px solid ${T.border}`, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: T.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="bell" size={16} color={T.purple} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display }}>{notif.title}</div>
              <div style={{ fontSize: 11, color: T.muted, fontFamily: font.mono }}>{notif.sentAt}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: T.faint, border: "none", borderRadius: 8, cursor: "pointer", padding: 7, display: "flex" }}>
            <Icon name="x" size={15} color={T.sub} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 22px" }}>
          {/* Card + body */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div style={{ background: T.surfaceAlt, borderRadius: T.radius, border: `1px solid ${T.borderLight}`, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Card</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{notif.cardName}</div>
            </div>
            <div style={{ background: T.surfaceAlt, borderRadius: T.radius, border: `1px solid ${T.borderLight}`, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Body</div>
              <div style={{ fontSize: 13, color: T.ink2, fontFamily: font.ui, lineHeight: 1.4 }}>{notif.body || <span style={{ color: T.muted, fontStyle: "italic" }}>No message</span>}</div>
            </div>
          </div>

          {/* URL */}
          {notif.url && (
            <div style={{ background: T.surfaceAlt, borderRadius: T.radius, border: `1px solid ${T.borderLight}`, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>URL</div>
              <a href={notif.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: T.accent, fontFamily: font.ui, wordBreak: "break-all", textDecoration: "none" }}>
                {notif.url}
              </a>
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div style={{ background: T.successSoft, borderRadius: T.radius, border: `1px solid ${T.success}22`, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: T.success, fontFamily: font.mono }}>{notif.sent}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.success, marginTop: 2 }}>Devices Sent</div>
            </div>
            <div style={{ background: T.dangerSoft, borderRadius: T.radius, border: `1px solid ${T.danger}22`, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: T.danger, fontFamily: font.mono }}>{notif.failed}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.danger, marginTop: 2 }}>Devices Failed</div>
            </div>
            <div style={{ background: T.accentSoft, borderRadius: T.radius, border: `1px solid ${T.accent}22`, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: T.accent, fontFamily: font.mono }}>{notif.sent + notif.failed}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.accent, marginTop: 2 }}>Total Devices</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 22px", borderTop: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "flex-end", background: T.surfaceAlt }}>
          <Btn variant="secondary" size="sm" onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PUSH NOTIFICATIONS — Main View
// ═══════════════════════════════════════════════════════════════
function NotificationsView() {
  const [activeTab, setActiveTab] = useState("send");

  // ── Send tab state ──
  const [filterCompany, setFilterCompany] = useState("All Companies");
  const [filterOrgUnit, setFilterOrgUnit] = useState("All Org Units");
  const [filterType, setFilterType] = useState("All Card Types");
  const [selected, setSelected] = useState([]);
  const [sendPage, setSendPage] = useState(1);
  const sendPerPage = 10;
  const [sendModalOpen, setSendModalOpen] = useState(false);

  // ── History tab state ──
  const [histFilterCompany, setHistFilterCompany] = useState("All Companies");
  const [histFilterOrgUnit, setHistFilterOrgUnit] = useState("All Org Units");
  const [histSearch, setHistSearch] = useState("");
  const [histDateFrom, setHistDateFrom] = useState("");
  const [histDateTo, setHistDateTo] = useState("");
  const [histPage, setHistPage] = useState(1);
  const histPerPage = 10;
  const [detailNotif, setDetailNotif] = useState(null);

  // ── Data ──
  const subscribedCards = [
    { id: "c1", name: "AdriaanPansegrouw", type: "businesscard", company: "Seriti", orgUnit: "Local", subscribers: 3, lastUsed: null },
    { id: "c2", name: "NovaRenevations", type: "businesscard", company: "Seriti", orgUnit: "Local", subscribers: 3, lastUsed: null },
    { id: "c3", name: "batman", type: "businesscard", company: "ToyotaKenya", orgUnit: "Sales", subscribers: 2, lastUsed: "2026/02/17 20:28" },
    { id: "c4", name: "naledimotors001", type: "businesscard", company: "Seriti", orgUnit: "Local", subscribers: 2, lastUsed: "2026/03/02 11:19" },
    { id: "c5", name: "AldoOppel", type: "businesscard", company: "Seriti", orgUnit: "Local", subscribers: 2, lastUsed: "2026/02/02 14:53" },
    { id: "c6", name: "jetour002", type: "businesscard", company: "Jetour", orgUnit: "Port Louis", subscribers: 2, lastUsed: "2026/02/20 11:10" },
    { id: "c7", name: "jetour001", type: "businesscard", company: "Jetour", orgUnit: "Port Louis", subscribers: 2, lastUsed: "2026/02/20 11:07" },
    { id: "c8", name: "JOHNTROLLIP", type: "businesscard", company: "Personalyz", orgUnit: null, subscribers: 1, lastUsed: null },
    { id: "c9", name: "GarethHiepner", type: "businesscard", company: "Seriti", orgUnit: "Local", subscribers: 1, lastUsed: "2026/02/25 13:55" },
    { id: "c10", name: "naledicommercial101", type: "businesscard", company: "Seriti", orgUnit: "Local", subscribers: 1, lastUsed: null },
    { id: "c11", name: "jetour003", type: "businesscard", company: "Jetour", orgUnit: "Port Louis", subscribers: 1, lastUsed: "2026/02/20 11:07" },
    { id: "c12", name: "WinterMenu", type: "generic", company: "Personalyz", orgUnit: null, subscribers: 4, lastUsed: "2026/03/01 09:00" },
    { id: "c13", name: "DashingDelux", type: "vehicle", company: "Jetour", orgUnit: "Port Louis", subscribers: 5, lastUsed: "2026/02/28 14:22" },
  ];

  const [historyData, setHistoryData] = useState([
    { id: "h1", cardName: "naledimotors001", title: "NOT THE NORMAL ONE", body: "Test", url: "https://cards.personalyz.me/Naledi/naledimotors001", sent: 2, failed: 0, sentAt: "2026/03/02 11:19" },
    { id: "h2", cardName: "GarethHiepner", title: "Teswt", body: "Test", url: "https://cards.personalyz.me/Seriti/GarethHiepner", sent: 1, failed: 2, sentAt: "2026/02/25 13:55" },
    { id: "h3", cardName: "jetour002", title: "EXSITING NEWS: JETOUR TEST DRIVE WEEK 23-27 FEBRUARY 2026, come and join us", body: "", url: "https://cards.personalyz.me/JetourBW/jetour002", sent: 1, failed: 0, sentAt: "2026/02/20 11:10" },
    { id: "h4", cardName: "jetour002", title: "EXSITING NEWS: JETOUR TEST DRIVE WEEK 23-27 FEBRUARY 2026, come and join us", body: "", url: "https://cards.personalyz.me/JetourBW/jetour002", sent: 1, failed: 0, sentAt: "2026/02/20 11:07" },
    { id: "h5", cardName: "jetour003", title: "EXSITING NEWS: JETOUR TEST DRIVE WEEK 23-27 FEBRUARY 2026, come and join us", body: "", url: "https://cards.personalyz.me/JetourBW/jetour003", sent: 0, failed: 1, sentAt: "2026/02/20 11:07" },
    { id: "h6", cardName: "jetour001", title: "EXSITING NEWS: JETOUR TEST DRIVE WEEK 23-27 FEBRUARY 2026, come and join us", body: "", url: "https://cards.personalyz.me/JetourBW/jetour001", sent: 2, failed: 0, sentAt: "2026/02/20 11:07" },
    { id: "h7", cardName: "jetour002", title: "EXSITING NEWS: JETOUR TEST DRIVE WEEK 23-27 FEBRUARY 2026, come and join us", body: "", url: "https://cards.personalyz.me/JetourBW/jetour002", sent: 1, failed: 0, sentAt: "2026/02/20 11:02" },
    { id: "h8", cardName: "jetour001", title: "EXSITING NEWS: JETOUR TEST DRIVE WEEK 23-27 FEBRUARY 2026, come and join us", body: "", url: "https://cards.personalyz.me/JetourBW/jetour001", sent: 2, failed: 0, sentAt: "2026/02/20 11:02" },
    { id: "h9", cardName: "jetour001", title: "New Vehicle Loaded", body: "Check out the new arrivals on our lot.", url: "https://www.jetourgaborone.co.bw/dashing", sent: 2, failed: 0, sentAt: "2026/02/20 10:56" },
    { id: "h10", cardName: "batman", title: "jhj", body: "", url: "https://cards.personalyz.me/ToyotaKenya/batman", sent: 2, failed: 0, sentAt: "2026/02/17 20:28" },
    { id: "h11", cardName: "WinterMenu", title: "New menu items added!", body: "We've added 5 new dishes to the winter menu.", url: "https://cards.personalyz.me/Personalyz/WinterMenu", sent: 4, failed: 0, sentAt: "2026/03/01 09:00" },
    { id: "h12", cardName: "DashingDelux", title: "New vehicle in stock", body: "The Dashing Deluxe is now available.", url: "https://cards.personalyz.me/Jetour/DashingDelux", sent: 3, failed: 1, sentAt: "2026/02/28 14:22" },
  ]);

  const companies = ["All Companies", ...Array.from(new Set(subscribedCards.map(c => c.company)))];
  const orgUnits = ["All Org Units", ...Array.from(new Set(subscribedCards.map(c => c.orgUnit).filter(Boolean)))];
  const cardTypes = ["All Card Types", ...Array.from(new Set(subscribedCards.map(c => c.type)))];

  // ── Filtered cards ──
  const filteredCards = subscribedCards.filter(c => {
    if (filterCompany !== "All Companies" && c.company !== filterCompany) return false;
    if (filterOrgUnit !== "All Org Units" && c.orgUnit !== filterOrgUnit) return false;
    if (filterType !== "All Card Types" && c.type !== filterType) return false;
    return true;
  });

  const totalSendPages = Math.ceil(filteredCards.length / sendPerPage);
  const paginatedCards = filteredCards.slice((sendPage - 1) * sendPerPage, sendPage * sendPerPage);

  const allOnPageSelected = paginatedCards.length > 0 && paginatedCards.every(c => selected.includes(c.id));
  const someOnPageSelected = paginatedCards.some(c => selected.includes(c.id));

  const toggleAll = () => {
    if (allOnPageSelected) setSelected(s => s.filter(id => !paginatedCards.map(c => c.id).includes(id)));
    else setSelected(s => Array.from(new Set([...s, ...paginatedCards.map(c => c.id)])));
  };
  const toggleOne = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  // ── Filtered history ──
  const filteredHistory = historyData.filter(h => {
    if (histFilterCompany !== "All Companies") {
      const card = subscribedCards.find(c => c.name === h.cardName);
      if (!card || card.company !== histFilterCompany) return false;
    }
    if (histFilterOrgUnit !== "All Org Units") {
      const card = subscribedCards.find(c => c.name === h.cardName);
      if (!card || card.orgUnit !== histFilterOrgUnit) return false;
    }
    if (histSearch && !h.title.toLowerCase().includes(histSearch.toLowerCase()) && !h.cardName.toLowerCase().includes(histSearch.toLowerCase())) return false;
    return true;
  });
  const totalHistPages = Math.ceil(filteredHistory.length / histPerPage);
  const paginatedHistory = filteredHistory.slice((histPage - 1) * histPerPage, histPage * histPerPage);

  const handleSent = ({ title, url, message, cards }) => {
    const now = new Date();
    const pad = n => String(n).padStart(2, "0");
    const ts = `${now.getFullYear()}/${pad(now.getMonth()+1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const selectedCardObjs = subscribedCards.filter(c => cards.includes(c.id));
    const newEntries = selectedCardObjs.map((c, i) => ({
      id: `h_new_${Date.now()}_${i}`,
      cardName: c.name,
      title,
      body: message,
      url: url || `https://cards.personalyz.me/${c.company}/${c.name}`,
      sent: c.subscribers,
      failed: 0,
      sentAt: ts,
    }));
    setHistoryData(prev => [...newEntries, ...prev]);
    setSelected([]);
    setActiveTab("history");
  };

  // ── Shared filter dropdown renderer ──
  const FilterDropdown = ({ value, onChange, options }) => (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "7px 28px 7px 12px", fontSize: 13, fontFamily: font.ui, fontWeight: 500,
          border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface,
          color: value.startsWith("All") ? T.sub : T.ink, outline: "none", appearance: "none", cursor: "pointer",
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon name="chevDown" size={12} color={T.muted} />
      </div>
    </div>
  );

  // ── Pagination renderer ──
  const Pagination = ({ page, setPage, total, filtered }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "14px 0", fontSize: 12, color: T.sub, fontFamily: font.ui }}>
      <span style={{ marginRight: 8 }}>
        {Math.min((page - 1) * (activeTab === "send" ? sendPerPage : histPerPage) + 1, filtered)}–{Math.min(page * (activeTab === "send" ? sendPerPage : histPerPage), filtered)} of {filtered}
      </span>
      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
        style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: page === 1 ? T.faint : T.surface, cursor: page === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="chevLeft" size={13} color={page === 1 ? T.muted : T.ink} />
      </button>
      <span style={{ width: 28, height: 28, borderRadius: 6, background: T.accent, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono }}>{page}</span>
      <button onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page >= total}
        style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`, background: page >= total ? T.faint : T.surface, cursor: page >= total ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="chevRight" size={13} color={page >= total ? T.muted : T.ink} />
      </button>
    </div>
  );

  return (
    <div>
      <TopBar
        title="Push Notifications"
        subtitle="Send messages to card subscribers and review history"
      />

      <div style={{ padding: "20px 28px", maxWidth: 1200 }}>
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2, background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 4, width: "fit-content", marginBottom: 20 }}>
          {[
            { id: "send", label: "Send", icon: "bell" },
            { id: "history", label: "History", icon: "clock" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "7px 18px",
                borderRadius: 7, border: "none", cursor: "pointer", fontFamily: font.ui,
                fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                background: activeTab === tab.id ? T.accent : "transparent",
                color: activeTab === tab.id ? "#fff" : T.sub,
              }}
            >
              <Icon name={tab.icon} size={14} color={activeTab === tab.id ? "#fff" : T.sub} />
              {tab.label}
              {tab.id === "history" && (
                <span style={{
                  fontSize: 10, fontWeight: 700, fontFamily: font.mono,
                  background: activeTab === "history" ? "rgba(255,255,255,0.25)" : T.faint,
                  color: activeTab === "history" ? "#fff" : T.muted,
                  padding: "1px 6px", borderRadius: 10, marginLeft: 2,
                }}>{historyData.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* ══ SEND TAB ══ */}
        {activeTab === "send" && (
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <FilterDropdown value={filterCompany} onChange={v => { setFilterCompany(v); setSendPage(1); }} options={companies} />
              <FilterDropdown value={filterOrgUnit} onChange={v => { setFilterOrgUnit(v); setSendPage(1); }} options={orgUnits} />
              <FilterDropdown value={filterType} onChange={v => { setFilterType(v); setSendPage(1); }} options={cardTypes} />
              <div style={{ flex: 1 }} />
              <Btn
                variant={selected.length > 0 ? "primary" : "secondary"}
                size="sm"
                icon={<Icon name="bell" size={13} color={selected.length > 0 ? "#fff" : T.sub} />}
                onClick={() => selected.length > 0 && setSendModalOpen(true)}
                disabled={selected.length === 0}
              >
                Send ({selected.length})
              </Btn>
            </div>

            {/* Selection hint */}
            {selected.length > 0 && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", marginBottom: 10,
                background: T.accentSoft, borderRadius: T.radiusSm, border: `1px solid ${T.accent}33`,
              }}>
                <Icon name="check" size={14} color={T.accent} />
                <span style={{ fontSize: 13, color: T.accent, fontWeight: 600, fontFamily: font.ui }}>
                  {selected.length} card{selected.length !== 1 ? "s" : ""} selected
                </span>
                <span style={{ color: T.accent, fontSize: 13 }}>
                  — reaching approximately <strong>{subscribedCards.filter(c => selected.includes(c.id)).reduce((acc, c) => acc + c.subscribers, 0)}</strong> subscriber{subscribedCards.filter(c => selected.includes(c.id)).reduce((acc, c) => acc + c.subscribers, 0) !== 1 ? "s" : ""}
                </span>
                <button onClick={() => setSelected([])} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: T.accent, fontFamily: font.ui }}>
                  <Icon name="x" size={12} color={T.accent} /> Clear
                </button>
              </div>
            )}

            {/* Cards table */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 160px 100px 160px", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt, alignItems: "center" }}>
                {/* Master checkbox */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div
                    onClick={toggleAll}
                    style={{
                      width: 16, height: 16, borderRadius: 4, cursor: "pointer", border: `2px solid ${allOnPageSelected ? T.accent : T.border}`,
                      background: allOnPageSelected ? T.accent : someOnPageSelected ? T.accentSoft : T.surface,
                      display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s",
                    }}
                  >
                    {allOnPageSelected && <Icon name="check" size={10} color="#fff" />}
                    {!allOnPageSelected && someOnPageSelected && <div style={{ width: 8, height: 2, background: T.accent, borderRadius: 1 }} />}
                  </div>
                </div>
                {["CARD NAME", "CARD TYPE", "SUBSCRIBERS", "LAST USED"].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: T.muted, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {paginatedCards.map((card, i) => {
                const isSelected = selected.includes(card.id);
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleOne(card.id)}
                    style={{
                      display: "grid", gridTemplateColumns: "44px 1fr 160px 100px 160px",
                      padding: "12px 16px", alignItems: "center",
                      borderBottom: i < paginatedCards.length - 1 ? `1px solid ${T.borderLight}` : "none",
                      background: isSelected ? T.accentSoft : "transparent",
                      cursor: "pointer", transition: "background 0.1s",
                      borderLeft: `3px solid ${isSelected ? T.accent : "transparent"}`,
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = T.surfaceAlt; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Checkbox */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 4, border: `2px solid ${isSelected ? T.accent : T.border}`,
                        background: isSelected ? T.accent : T.surface,
                        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s",
                      }}>
                        {isSelected && <Icon name="check" size={10} color="#fff" />}
                      </div>
                    </div>
                    {/* Name */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: T.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="cards" size={14} color={T.purple} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{card.name}</div>
                        <div style={{ fontSize: 11, color: T.muted }}>{card.company}{card.orgUnit ? ` · ${card.orgUnit}` : ""}</div>
                      </div>
                    </div>
                    {/* Type */}
                    <div>
                      <span style={{
                        fontSize: 11, fontWeight: 600, fontFamily: font.ui,
                        background: card.type === "businesscard" ? T.accentSoft : card.type === "vehicle" ? T.purpleSoft : T.warningSoft,
                        color: card.type === "businesscard" ? T.accent : card.type === "vehicle" ? T.purple : T.warning,
                        padding: "2px 8px", borderRadius: 10,
                      }}>{card.type}</span>
                    </div>
                    {/* Subscribers */}
                    <div>
                      <span style={{
                        fontSize: 13, fontWeight: 700, fontFamily: font.mono,
                        color: card.subscribers > 1 ? T.accent : T.sub,
                      }}>{card.subscribers}</span>
                    </div>
                    {/* Last used */}
                    <div style={{ fontSize: 12, color: card.lastUsed ? T.ink2 : T.muted, fontFamily: font.mono }}>
                      {card.lastUsed || "—"}
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination page={sendPage} setPage={setSendPage} total={totalSendPages} filtered={filteredCards.length} />
          </div>
        )}

        {/* ══ HISTORY TAB ══ */}
        {activeTab === "history" && (
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <FilterDropdown value={histFilterCompany} onChange={v => { setHistFilterCompany(v); setHistPage(1); }} options={companies} />
              <FilterDropdown value={histFilterOrgUnit} onChange={v => { setHistFilterOrgUnit(v); setHistPage(1); }} options={orgUnits} />
              {/* Search */}
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <Icon name="search" size={13} color={T.muted} />
                </div>
                <input
                  value={histSearch}
                  onChange={e => { setHistSearch(e.target.value); setHistPage(1); }}
                  placeholder="Search by title…"
                  style={{
                    padding: "7px 12px 7px 30px", fontSize: 13, fontFamily: font.ui, width: 200,
                    border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                    background: T.surface, color: T.ink, outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = T.accent}
                  onBlur={e => e.target.style.borderColor = T.border}
                />
              </div>
              {/* Date range */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input type="date" value={histDateFrom} onChange={e => setHistDateFrom(e.target.value)}
                  style={{ padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none" }} />
                <span style={{ fontSize: 12, color: T.muted }}>to</span>
                <input type="date" value={histDateTo} onChange={e => setHistDateTo(e.target.value)}
                  style={{ padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none" }} />
              </div>
            </div>

            {/* History table */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 240px 60px 60px 150px 44px", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt, alignItems: "center" }}>
                {["CARD", "TITLE", "URL", "SENT", "FAILED", "SENT AT", ""].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: T.muted, fontFamily: font.mono, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
                ))}
              </div>

              {paginatedHistory.length === 0 ? (
                <div style={{ padding: "48px 20px", textAlign: "center", color: T.muted, fontSize: 14, fontFamily: font.ui }}>No notifications found.</div>
              ) : paginatedHistory.map((h, i) => (
                <div
                  key={h.id}
                  style={{
                    display: "grid", gridTemplateColumns: "130px 1fr 240px 60px 60px 150px 44px",
                    padding: "12px 16px", alignItems: "center",
                    borderBottom: i < paginatedHistory.length - 1 ? `1px solid ${T.borderLight}` : "none",
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = T.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setDetailNotif(h)}
                >
                  {/* Card name */}
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.cardName}</div>
                  {/* Title */}
                  <div style={{ fontSize: 13, color: T.ink2, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>{h.title}</div>
                  {/* URL */}
                  <div style={{ fontSize: 12, color: T.accent, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>
                    <a href={h.url} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "none" }}>{h.url}</a>
                  </div>
                  {/* Sent */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.success, fontFamily: font.mono }}>{h.sent}</div>
                  {/* Failed */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: h.failed > 0 ? T.danger : T.muted, fontFamily: font.mono }}>{h.failed}</div>
                  {/* Sent at */}
                  <div style={{ fontSize: 11, color: T.sub, fontFamily: font.mono }}>{h.sentAt}</div>
                  {/* View */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: T.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="eye" size={13} color={T.purple} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination page={histPage} setPage={setHistPage} total={totalHistPages} filtered={filteredHistory.length} />
          </div>
        )}
      </div>

      {/* Modals */}
      <SendPushModal
        open={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        selectedCards={selected}
        onSent={handleSent}
      />
      <NotifDetailModal notif={detailNotif} onClose={() => setDetailNotif(null)} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS VIEW
// ═══════════════════════════════════════════════════════════════

function SettingsView() {
  return (
    <div>
      <TopBar title="Settings" subtitle="Account, preferences, and integrations" />
      <div style={{ padding: "24px 28px", maxWidth: 720 }}>
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>Profile</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Full Name" value="Henry Oertel" readOnly />
            <Input label="Email" value="oertel.henry@gmail.com" readOnly />
            <Input label="Company" value="Personalyz" readOnly />
            <Input label="Role" value="Super Admin" readOnly />
          </div>
        </div>
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>Preferences</h3>
          {[
            { label: "Dark Mode", desc: "Switch to dark theme", on: false },
            { label: "Email Notifications", desc: "Receive card activity alerts", on: true },
            { label: "Auto-save", desc: "Save changes automatically every 30s", on: true },
            { label: "Reduced Motion", desc: "Minimize animations for accessibility", on: false },
          ].map((pref, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? `1px solid ${T.borderLight}` : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{pref.label}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{pref.desc}</div>
              </div>
              <Toggle on={pref.on} />
            </div>
          ))}
        </div>
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>API & Integrations</h3>
          <Input label="API Key" value="pk_live_•••••••••••••••••••Xz4" hint="Use this key to integrate with your backend" readOnly />
          <Input label="Webhook URL" value="https://api.personalyz.me/webhooks/cards" hint="POST events are sent here on card interactions" readOnly />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function PersonalyzAdmin() {
  const [view, setView] = useState("analytics");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const views = {
    dashboard: <Dashboard onNav={setView} />,
    cards: <CardsView onNav={setView} />,
    editor: <CardEditor />,
    microsites: <MicrositesView onNav={setView} />,
    analytics: <AnalyticsView />,
    users: <UsersView onNav={setView} />,
    companies: <CompaniesView />,
    notifications: <NotificationsView />,
    settings: <SettingsView />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, overflow: "hidden" }}>
      <Sidebar active={view} onNav={setView} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div style={{ flex: 1, overflow: "auto" }}>
        {views[view]}
      </div>
    </div>
  );
}
