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
// ICONS — Minimal SVG icon system
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
    edit: <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    eye: <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
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
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// REAL DATA from JSON structures
// ═══════════════════════════════════════════════════════════════
const businessCard = {
  id: "6607cc25",
  cardName: "batman",
  companyName: "ToyotaKenya",
  type: "Business",
  enabled: true,
  theme: "voyager",
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

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Badge({ label, variant = "default" }) {
  const styles = {
    default: { bg: T.faint, color: T.sub },
    active: { bg: T.successSoft, color: T.success },
    draft: { bg: T.warningSoft, color: T.warning },
    business: { bg: T.accentSoft, color: T.accent },
    vehicle: { bg: T.purpleSoft, color: T.purple },
    generic: { bg: T.warningSoft, color: T.warning },
    microsite: { bg: T.successSoft, color: T.success },
    company: { bg: "#F0EDFF", color: "#7B61FF" },
    local: { bg: T.faint, color: T.sub },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", background: s.bg, color: s.color, fontFamily: font.ui, lineHeight: "18px" }}>
      {label}
    </span>
  );
}

function Btn({ children, variant = "primary", size = "md", icon, onClick, style: extra }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer", fontFamily: font.ui, fontWeight: 600, borderRadius: T.radiusSm, transition: "all 0.15s", lineHeight: 1 };
  const sizes = { sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 }, lg: { padding: "10px 20px", fontSize: 14 } };
  const variants = {
    primary: { background: T.accent, color: "#fff" },
    secondary: { background: T.faint, color: T.ink },
    ghost: { background: "transparent", color: T.sub },
    danger: { background: T.dangerSoft, color: T.danger },
  };
  return <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...extra }}>{icon}{children}</button>;
}

function Input({ label, value, placeholder, type = "text", hint, full }) {
  return (
    <div style={{ marginBottom: 14, width: full ? "100%" : undefined }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>{label}</label>}
      <input type={type} value={value} placeholder={placeholder} readOnly style={{
        width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui, border: `1px solid ${T.border}`,
        borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", boxSizing: "border-box",
      }} />
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
      {/* Logo */}
      <div style={{ padding: collapsed ? "16px 12px" : "16px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.borderLight}`, height: 56, minHeight: 56 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.accent}, #4A90D9)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: font.ui }}>P</span>
        </div>
        {!collapsed && <span style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: font.ui, letterSpacing: "-0.02em" }}>Personalyz</span>}
      </div>

      {/* Nav Items */}
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

      {/* Collapse Toggle */}
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

function TopBar({ title, subtitle, actions }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 40, padding: "12px 28px", background: "rgba(246,244,241,0.85)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 56,
    }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 12, color: T.sub, margin: "2px 0 0", fontFamily: font.ui }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="search" size={15} color={T.muted} /></div>
          <input placeholder="Search… ⌘K" readOnly style={{
            width: 200, padding: "7px 12px 7px 32px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
            borderRadius: T.radiusSm, background: T.surface, color: T.sub, outline: "none",
          }} />
        </div>
        {actions}
        {/* Avatar */}
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
        {/* Stats Row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <StatCard label="Total Cards" value="47" change="12%" changeType="up" icon="cards" accent={T.accentSoft} />
          <StatCard label="Total Views" value="14,082" change="23%" changeType="up" icon="eye" accent={T.successSoft} />
          <StatCard label="Shares" value="969" change="8%" changeType="up" icon="share" accent={T.purpleSoft} />
          <StatCard label="Active Users" value="12" change="2" changeType="up" icon="users" accent={T.warningSoft} />
        </div>

        {/* Two-column: Recent + Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          {/* Recent Cards Table */}
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

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Quick Actions */}
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

            {/* Activity Feed */}
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
        {/* Filters + View Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: font.ui,
                border: `1px solid ${filter === f ? T.accent : T.border}`, borderRadius: 6,
                background: filter === f ? T.accentSoft : T.surface, color: filter === f ? T.accent : T.sub,
                cursor: "pointer",
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

        {/* Card Grid */}
        {viewMode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((card) => (
              <div key={card.id} onClick={() => onNav("editor")} style={{
                background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`,
                overflow: "hidden", cursor: "pointer", transition: "all 0.15s",
              }}>
                {/* Thumbnail */}
                <div style={{ height: 140, background: `linear-gradient(135deg, ${card.type === "Business" ? "#E8F0FF" : card.type === "Vehicle" ? "#F0EDFF" : card.type === "Generic" ? "#FFF4E5" : "#E8F5E8"}, ${T.surfaceAlt})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: T.glass, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(255,255,255,0.5)` }}>
                    <Icon name={card.type === "Business" ? "users" : card.type === "Vehicle" ? "car" : card.type === "Microsite" ? "globe" : "cards"} size={24} color={T.accent} />
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10 }}>
                    <Badge label={card.status} variant={card.status === "Active" ? "active" : "draft"} />
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>{card.name}</div>
                      <div style={{ fontSize: 12, color: T.muted }}>{card.company}</div>
                    </div>
                    <Badge label={card.type} variant={card.type.toLowerCase()} />
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.sub, fontFamily: font.mono }}>
                    <span>{card.views.toLocaleString()} views</span>
                    <span>{card.shares} shares</span>
                    <span style={{ marginLeft: "auto", color: T.muted }}>{card.lastEdit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            {/* List header */}
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
// CARD EDITOR — Split View with Section Management
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
        {/* Left: Editor Panel */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {/* Card Identity */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>Card Identity</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Card Name" value={card.cardName} />
              <Input label="Company" value={card.companyName} />
              <Input label="Name" value={card.profile.name} />
              <Input label="Designation" value={card.profile.designation} />
              <div style={{ gridColumn: "1 / -1" }}>
                <Input label="More Detail" value={card.profile.moreDetail} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>Description</label>
                <textarea readOnly value={card.profile.description} style={{
                  width: "100%", padding: "9px 12px", fontSize: 14, fontFamily: font.ui, border: `1px solid ${T.border}`,
                  borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", resize: "vertical",
                  minHeight: 60, boxSizing: "border-box",
                }} />
              </div>
            </div>
            {/* Images */}
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4 }}>Profile Picture</div>
                <div style={{ width: 80, height: 80, borderRadius: T.radius, background: T.faint, border: `2px dashed ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="photo" size={24} color={T.muted} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4 }}>Banner Image</div>
                <div style={{ height: 80, borderRadius: T.radius, background: T.faint, border: `2px dashed ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="photo" size={24} color={T.muted} />
                </div>
              </div>
            </div>
          </div>

          {/* Sections — Draggable List */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>Card Sections</h3>
              <span style={{ fontSize: 11, color: T.muted, fontFamily: font.ui }}>Drag to reorder · Toggle to enable</span>
            </div>
            {card.sections.map((sec, i) => (
              <div key={sec.key} onClick={() => setActiveSection(sec.key)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 20px",
                borderBottom: i < card.sections.length - 1 ? `1px solid ${T.borderLight}` : "none",
                background: activeSection === sec.key ? T.accentSoft : "transparent",
                cursor: "pointer", transition: "background 0.12s",
              }}>
                {/* Drag Handle */}
                <div style={{ color: T.muted, cursor: "grab", flexShrink: 0 }}>
                  <Icon name="grip" size={14} color={T.muted} />
                </div>
                {/* Sort number */}
                <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: font.mono, width: 18, textAlign: "center" }}>
                  {sec.sort}
                </span>
                {/* Section name */}
                <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, flex: 1 }}>{sec.label}</span>
                {/* Group badge */}
                {sec.group !== "—" && <Badge label={sec.group} variant={sec.group === "Company" ? "company" : "local"} />}
                {/* Item count */}
                {sec.items && <span style={{ fontSize: 11, color: T.muted, fontFamily: font.mono }}>{sec.items} items</span>}
                {/* Toggle */}
                <div style={{
                  width: 36, height: 20, borderRadius: 10, padding: 2, cursor: "pointer", transition: "background 0.2s",
                  background: sec.enabled ? T.accent : T.faint,
                  display: "flex", alignItems: "center", justifyContent: sec.enabled ? "flex-end" : "flex-start",
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", transition: "all 0.2s" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Section Detail: Contact Info Example */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>Contact Info</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <Badge label="Local" variant="local" />
                <Btn variant="secondary" size="sm" icon={<Icon name="plus" size={13} />}>Add</Btn>
              </div>
            </div>
            {[
              { icon: "fab fa-whatsapp", detail: "12025550100", label: "WhatsApp" },
              { icon: "fas fa-phone", detail: "12025550100", label: "Phone" },
              { icon: "fas fa-envelope", detail: "superman@dailyplanet.com", label: "Email" },
            ].map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                borderRadius: T.radiusSm, border: `1px solid ${T.borderLight}`, marginBottom: 6,
                background: T.surfaceAlt,
              }}>
                <Icon name="grip" size={14} color={T.muted} />
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14 }}>{c.label === "WhatsApp" ? "💬" : c.label === "Phone" ? "📞" : "✉️"}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, fontFamily: font.ui }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: T.ink, fontFamily: font.ui }}>{c.detail}</div>
                </div>
                <div style={{
                  width: 36, height: 20, borderRadius: 10, padding: 2, background: T.accent,
                  display: "flex", alignItems: "center", justifyContent: "flex-end",
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Styling */}
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

        {/* Right: Live Preview */}
        {!previewCollapsed && (
          <div style={{
            width: 380, borderLeft: `1px solid ${T.border}`, background: T.surfaceAlt,
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}>
            {/* Glass Preview Header */}
            <div style={{
              padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              background: T.glass, backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid rgba(255,255,255,0.45)`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>Live Preview</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button style={{ padding: "4px 10px", borderRadius: 4, border: `1px solid ${T.border}`, background: T.surface, fontSize: 11, fontWeight: 600, color: T.accent, cursor: "pointer", fontFamily: font.ui }}>Mobile</button>
                <button style={{ padding: "4px 10px", borderRadius: 4, border: "none", background: "transparent", fontSize: 11, fontWeight: 500, color: T.muted, cursor: "pointer", fontFamily: font.ui }}>Desktop</button>
              </div>
            </div>
            {/* Phone Frame */}
            <div style={{ flex: 1, display: "flex", alignItems: "start", justifyContent: "center", padding: 20, overflowY: "auto" }}>
              <div style={{
                width: 300, borderRadius: 28, background: "#fff", boxShadow: T.shadowLg,
                border: "8px solid #1A1A1A", overflow: "hidden",
              }}>
                {/* Status bar */}
                <div style={{ height: 28, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 80, height: 22, borderRadius: 12, background: "#000" }} />
                </div>
                {/* Banner */}
                <div style={{ height: 120, background: `linear-gradient(135deg, ${card.styling.topColor}, #2980b9)`, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: "#eee", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 24 }}>🦇</span>
                  </div>
                </div>
                {/* Card Content */}
                <div style={{ padding: "36px 20px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.ink }}>{card.profile.name}</div>
                  <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>{card.profile.designation}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{card.profile.moreDetail}</div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 8, lineHeight: 1.5, padding: "0 8px" }}>
                    {card.profile.description.substring(0, 80)}...
                  </div>
                  {/* Contact icons */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 14 }}>
                    {["💬", "📞", "✉️"].map((ic, i) => (
                      <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: card.styling.iconCircleColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 16 }}>{ic}</span>
                      </div>
                    ))}
                  </div>
                  {/* Sections preview */}
                  <div style={{ marginTop: 16, textAlign: "left" }}>
                    {card.sections.filter(s => s.enabled).slice(2, 6).map((sec, i) => (
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
// MICROSITES VIEW (Vehicle Lots)
// ═══════════════════════════════════════════════════════════════

function MicrositesView({ onNav }) {
  return (
    <div>
      <TopBar title="Microsites" subtitle="Vehicle lots and card collections" actions={<Btn icon={<Icon name="plus" size={15} color="#fff" />}>New Microsite</Btn>} />
      <div style={{ padding: "24px 28px", maxWidth: 1200 }}>
        {/* Active Microsite */}
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, fontFamily: font.display }}>Parkinglot</div>
              <div style={{ fontSize: 12, color: T.sub }}>Mercedes Alberton · (011) 879-2069 · 10 vehicles</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="secondary" size="sm" icon={<Icon name="share" size={13} />}>Share</Btn>
              <Btn variant="secondary" size="sm" icon={<Icon name="edit" size={13} />}>Edit</Btn>
            </div>
          </div>
          {/* Vehicle Grid */}
          <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {vehicleCards.map((v) => (
              <div key={v.id} style={{
                borderRadius: T.radiusSm, border: `1px solid ${T.border}`, overflow: "hidden",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{ height: 100, background: `linear-gradient(135deg, #F0EDFF, ${T.surfaceAlt})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="car" size={32} color={T.purple} />
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: font.ui }}>{v.make} {v.model}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{v.year} · {v.variant.substring(0, 25)}...</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.accent, fontFamily: font.mono, marginTop: 6 }}>{v.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANALYTICS VIEW
// ═══════════════════════════════════════════════════════════════

function AnalyticsView() {
  const barData = [
    { label: "Mon", h: 65 }, { label: "Tue", h: 85 }, { label: "Wed", h: 72 },
    { label: "Thu", h: 90 }, { label: "Fri", h: 55 }, { label: "Sat", h: 40 }, { label: "Sun", h: 30 },
  ];
  return (
    <div>
      <TopBar title="Analytics" subtitle="Card performance across all companies" actions={
        <div style={{ display: "flex", gap: 2, background: T.faint, borderRadius: 6, padding: 2 }}>
          {["7d", "30d", "90d", "1y"].map((p, i) => (
            <button key={p} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 600, fontFamily: font.ui, border: "none", borderRadius: 4, cursor: "pointer", background: i === 1 ? T.surface : "transparent", color: i === 1 ? T.ink : T.muted, boxShadow: i === 1 ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}>{p}</button>
          ))}
        </div>
      } />
      <div style={{ padding: "24px 28px", maxWidth: 1200 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <StatCard label="Total Views" value="14,082" change="23%" changeType="up" icon="eye" />
          <StatCard label="Unique Visitors" value="8,431" change="18%" changeType="up" icon="users" />
          <StatCard label="Shares" value="969" change="8%" changeType="up" icon="share" />
          <StatCard label="Avg. Time on Card" value="1:42" change="5s" changeType="up" icon="clock" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Bar Chart */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, marginBottom: 16 }}>Views This Week</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
              {barData.map((d) => (
                <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: "100%", height: `${d.h}%`, borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg, ${T.accent}, #4A90D9)`, minHeight: 4, transition: "height 0.3s" }} />
                  <span style={{ fontSize: 10, color: T.muted, fontFamily: font.mono }}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Cards */}
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, marginBottom: 16 }}>Top Performing Cards</div>
            {[
              { name: "Parkinglot", type: "Microsite", views: 8412, pct: 100 },
              { name: "WinterMenu", type: "Generic", views: 3891, pct: 46 },
              { name: "batman", type: "Business", views: 1247, pct: 15 },
              { name: "BenzGLC300", type: "Vehicle", views: 912, pct: 11 },
              { name: "DashingDelux", type: "Vehicle", views: 532, pct: 6 },
            ].map((c, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{c.name}</span>
                    <Badge label={c.type} variant={c.type.toLowerCase()} />
                  </div>
                  <span style={{ fontSize: 12, fontFamily: font.mono, color: T.sub }}>{c.views.toLocaleString()}</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: T.faint }}>
                  <div style={{ height: 5, borderRadius: 3, background: T.accent, width: `${c.pct}%`, opacity: 1 - i * 0.15 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// USERS VIEW
// ═══════════════════════════════════════════════════════════════

function UsersView() {
  const users = [
    { name: "Henry Oertel", email: "oertel.henry@gmail.com", role: "Super Admin", company: "Personalyz", cards: 12, status: "Active" },
    { name: "Natasha M.", email: "natasha@jetourmauritius.mu", role: "Admin", company: "Jetour", cards: 8, status: "Active" },
    { name: "David K.", email: "david@toyotakenya.co.ke", role: "Editor", company: "ToyotaKenya", cards: 5, status: "Active" },
    { name: "Sarah N.", email: "sarah@personalyz.me", role: "Viewer", company: "Personalyz", cards: 0, status: "Invited" },
  ];
  return (
    <div>
      <TopBar title="Users" subtitle={`${users.length} users across 3 companies`} actions={<Btn icon={<Icon name="plus" size={15} color="#fff" />}>Invite User</Btn>} />
      <div style={{ padding: "24px 28px", maxWidth: 1200 }}>
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 80px 80px", gap: 12, padding: "10px 20px", borderBottom: `1px solid ${T.border}`, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.mono, textTransform: "uppercase" }}>
            <span>User</span><span>Role</span><span>Company</span><span>Cards</span><span>Status</span>
          </div>
          {users.map((u, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 80px 80px", gap: 12, alignItems: "center", padding: "14px 20px", borderBottom: i < users.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i * 80}, 60%, 70%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{u.name.split(" ").map(w => w[0]).join("")}</span>
                </div>
                <div><div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{u.name}</div><div style={{ fontSize: 11, color: T.muted }}>{u.email}</div></div>
              </div>
              <Badge label={u.role} variant={u.role === "Super Admin" ? "business" : "default"} />
              <span style={{ fontSize: 12, color: T.sub, fontFamily: font.ui }}>{u.company}</span>
              <span style={{ fontSize: 12, color: T.sub, fontFamily: font.mono }}>{u.cards}</span>
              <Badge label={u.status} variant={u.status === "Active" ? "active" : "draft"} />
            </div>
          ))}
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

function NotificationsView() {
  const notifs = [
    { type: "share", title: "batman card shared 3 times", desc: "QR code scanned at ToyotaKenya Nairobi office", time: "2 min ago", read: false },
    { type: "edit", title: "WinterMenu updated", desc: "Food Menu section: 3 new items added by Henry Oertel", time: "1h ago", read: false },
    { type: "user", title: "New user joined Jetour", desc: "Natasha accepted the invitation and created 2 cards", time: "3h ago", read: false },
    { type: "publish", title: "DashingDelux published", desc: "Vehicle card went live at jetourmauritius.mu", time: "5h ago", read: true },
    { type: "analytics", title: "Parkinglot milestone", desc: "Crossed 8,000 total views. Top card this month.", time: "6h ago", read: true },
    { type: "system", title: "Subscription renewed", desc: "Personalyz Enterprise plan renewed for 12 months", time: "1d ago", read: true },
  ];
  const iconMap = { share: "share", edit: "edit", user: "users", publish: "check", analytics: "chart", system: "settings" };
  const colorMap = { share: T.accent, edit: T.warning, user: T.purple, publish: T.success, analytics: T.accent, system: T.muted };

  return (
    <div>
      <TopBar title="Notifications" subtitle="3 unread" actions={<Btn variant="ghost" size="sm">Mark all read</Btn>} />
      <div style={{ padding: "24px 28px", maxWidth: 720 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: "16px 18px", marginBottom: 8,
            borderRadius: T.radius, border: `1px solid ${n.read ? T.borderLight : T.accent}`,
            background: n.read ? T.surface : T.accentSoft, transition: "all 0.15s",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: n.read ? T.faint : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={iconMap[n.type]} size={16} color={colorMap[n.type]} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>{n.title}</div>
              <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>{n.desc}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 4, fontFamily: font.mono }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: 4, background: T.accent, flexShrink: 0, marginTop: 6 }} />}
          </div>
        ))}
      </div>
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
            <Input label="Full Name" value="Henry Oertel" />
            <Input label="Email" value="oertel.henry@gmail.com" />
            <Input label="Company" value="Personalyz" />
            <Input label="Role" value="Super Admin" />
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
              <div style={{
                width: 40, height: 22, borderRadius: 11, padding: 2, cursor: "pointer",
                background: pref.on ? T.accent : T.faint,
                display: "flex", alignItems: "center", justifyContent: pref.on ? "flex-end" : "flex-start",
              }}>
                <div style={{ width: 18, height: 18, borderRadius: 9, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: "0 0 14px" }}>API & Integrations</h3>
          <Input label="API Key" value="pk_live_•••••••••••••••••••Xz4" hint="Use this key to integrate with your backend" />
          <Input label="Webhook URL" value="https://api.personalyz.me/webhooks/cards" hint="POST events are sent here on card interactions" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function PersonalyzAdmin() {
  const [view, setView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const views = {
    dashboard: <Dashboard onNav={setView} />,
    cards: <CardsView onNav={setView} />,
    editor: <CardEditor />,
    microsites: <MicrositesView onNav={setView} />,
    analytics: <AnalyticsView />,
    users: <UsersView />,
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
