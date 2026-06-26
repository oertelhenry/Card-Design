import { useState, useRef, useEffect, createContext, useContext } from "react";

// ─── Theme Context (defined after palettes below) ───────────────────────────────
const ThemeCtx = createContext(false);

// ─── Font Loader ────────────────────────────────────────────────────────────────
// Injects the Google Fonts stylesheet for Inter Tight (display) + Inter (body)
// once, so the display-font contrast used in headings actually renders instead
// of silently falling back to regular Inter. Also pulls in the other options
// offered in the card editor's "Font pairing" picker (Poppins, Playfair Display,
// Manrope) — without this, selecting one of those there would just silently
// fall back to a system font, since the name alone doesn't make a font exist.
function useFontLoader() {
  useEffect(() => {
    const id = "cardz-font-inter-tight";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?" +
      "family=Inter:wght@400;450;500;550;600" +
      "&family=Inter+Tight:wght@500;600;650;700" +
      "&family=Poppins:wght@400;500;600;700" +
      "&family=Playfair+Display:wght@500;600;700" +
      "&family=Manrope:wght@400;500;600;700" +
      "&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Design Tokens ─────────────────────────────────────────────────────────────

// Pair a tight, confident grotesk for headings/labels with the same family at
// lighter weight for body copy — loaded via useFontLoader() in the root export.
const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const FD = "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

const C_LIGHT = {
  bgPage:        "#FAFAF8",
  bgSurface:     "#FFFFFF",
  bgInput:       "#F6F6F4",
  bgInputFocus:  "#FFFFFF",

  sidebar:       "#13131A",
  sidebarBorder: "rgba(255,255,255,0.07)",
  sidebarText:   "#EDEDF1",
  sidebarMuted:  "#6B6B76",
  sidebarActive: "#FFFFFF",
  sidebarActiveBg: "#4F46E5",
  sidebarHover:  "rgba(255,255,255,0.045)",

  accent:        "#4F46E5",
  accentHover:   "#4338CA",
  accentLight:   "rgba(79,70,229,0.08)",

  text1:         "#161618",
  text2:         "#6B6B70",
  text3:         "#A6A6AC",

  border:        "#E7E7E3",
  borderFocus:   "#4F46E5",

  danger:        "#E5484D",
  dangerBg:      "rgba(229,72,77,0.07)",
  success:       "#2FA563",
  warning:       "#D8932A",

  shadow: {
    sm:   "0 1px 2px rgba(20,20,25,0.05)",
    md:   "0 4px 12px rgba(20,20,25,0.06), 0 1px 2px rgba(20,20,25,0.04)",
    lg:   "0 12px 28px rgba(20,20,25,0.09), 0 2px 6px rgba(20,20,25,0.05)",
    form: "0 24px 48px -12px rgba(20,20,25,0.16), 0 2px 8px rgba(20,20,25,0.05)",
    dropdown: "0 8px 24px rgba(20,20,25,0.14), 0 2px 6px rgba(20,20,25,0.06)",
  },
};

// Dark-mode override palette — same shape as C
const CD = {
  bgPage:        "#0F1117",
  bgSurface:     "#181B23",
  bgInput:       "#22263A",
  bgInputFocus:  "#272B3F",

  sidebar:       "#13131A",
  sidebarBorder: "rgba(255,255,255,0.07)",
  sidebarText:   "#EDEDF1",
  sidebarMuted:  "#6B6B76",
  sidebarActive: "#FFFFFF",
  sidebarActiveBg: "#4F46E5",
  sidebarHover:  "rgba(255,255,255,0.045)",

  accent:        "#6D64FF",
  accentHover:   "#5A52E0",
  accentLight:   "rgba(109,100,255,0.15)",

  text1:         "#F0F0F5",
  text2:         "#9898A6",
  text3:         "#5C5C6A",

  border:        "#2A2D3E",
  borderFocus:   "#6D64FF",

  danger:        "#FF6468",
  dangerBg:      "rgba(255,100,104,0.10)",
  success:       "#3FC87A",
  warning:       "#E8A83A",

  shadow: {
    sm:   "0 1px 2px rgba(0,0,0,0.30)",
    md:   "0 4px 12px rgba(0,0,0,0.36), 0 1px 2px rgba(0,0,0,0.22)",
    lg:   "0 12px 28px rgba(0,0,0,0.44), 0 2px 6px rgba(0,0,0,0.28)",
    form: "0 24px 48px -12px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.28)",
    dropdown: "0 8px 24px rgba(0,0,0,0.50), 0 2px 6px rgba(0,0,0,0.32)",
  },
};

// ─── Theme Hook (after both palettes are defined) ────────────────────────────
function useC() {
  const dk = useContext(ThemeCtx);
  return dk ? CD : C_LIGHT;
}

const R = { xs: 5, sm: 7, md: 9, lg: 12, xl: 16, full: 9999 };

// ─── Icon Component ─────────────────────────────────────────────────────────────

function Icon({ name, size = 18, color = "currentColor", style = {} }) {
  const base = {
    width: size, height: size,
    viewBox: "0 0 24 24",
    strokeLinecap: "round", strokeLinejoin: "round",
    style: {
      display: "block",
      flexShrink: 0,
      fill: "none",
      stroke: color,
      strokeWidth: 1.75,
      overflow: "visible",
      ...style,
    },
  };

  switch (name) {
    case "home":
      return <svg {...base}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z"/></svg>;
    case "cards":
      return <svg {...base}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
    case "survey":
      return <svg {...base}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><path d="M9 5a2 2 0 012-2h2a2 2 0 012 2 2 2 0 01-2 2h-2a2 2 0 01-2-2z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>;
    case "globe":
      return <svg {...base}><circle cx="12" cy="12" r="9"/><path d="M12 3c-2.5 3-2.5 9 0 12m0-12c2.5 3 2.5 9 0 12"/><path d="M3.6 9h16.8M3.6 15h16.8"/></svg>;
    case "chart":
      return <svg {...base}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
    case "users":
      return <svg {...base}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case "building":
      return <svg {...base}><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
    case "bell":
      return <svg {...base}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
    case "qr":
      return <svg {...base} style={{ ...base.style, strokeWidth: 1.5 }}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="5" y="5" width="3" height="3" fill={color} stroke="none"/><rect x="16" y="5" width="3" height="3" fill={color} stroke="none"/><rect x="5" y="16" width="3" height="3" fill={color} stroke="none"/><path d="M14 14h3v3m4 0v4m-4 0h4m-4-4h4"/></svg>;
    case "help":
      return <svg {...base}><circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.5}/></svg>;
    case "upload":
      return <svg {...base}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>;
    case "search":
      return <svg {...base}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case "moon":
      return <svg {...base}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
    case "sun":
      return <svg {...base}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
    case "chevLeft":
      return <svg {...base}><polyline points="15 18 9 12 15 6"/></svg>;
    case "chevRight":
      return <svg {...base}><polyline points="9 18 15 12 9 6"/></svg>;
    case "settings":
      return <svg {...base}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
    case "creditCard":
      return <svg {...base}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
    case "logout":
      return <svg {...base}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
    case "eye":
      return <svg {...base}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "eyeOff":
      return <svg {...base}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
    case "user":
      return <svg {...base}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "mail":
      return <svg {...base}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case "lock":
      return <svg {...base}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
    case "check":
      return <svg {...base}><polyline points="20 6 9 17 4 12"/></svg>;
    case "x":
      return <svg {...base}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "edit":
      return <svg {...base}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case "share":
      return <svg {...base}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>;
    case "copy":
      return <svg {...base}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
    case "trash":
      return <svg {...base}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>;
    case "grid":
      return <svg {...base}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case "list":
      return <svg {...base}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
    case "chevDown":
      return <svg {...base}><polyline points="6 9 12 15 18 9"/></svg>;
    case "plus":
      return <svg {...base}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "layers":
      return <svg {...base}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case "carFront":
      return <svg {...base}><path d="M5 17h14M5 17a2 2 0 01-2-2v-2.2a3 3 0 01.27-1.24l1.7-3.86A3 3 0 017.69 6h8.62a3 3 0 012.72 1.7l1.7 3.86A3 3 0 0121 12.8V15a2 2 0 01-2 2M5 17a2 2 0 002 2 2 2 0 002-2M17 17a2 2 0 002 2 2 2 0 002-2"/><path d="M5 11h14"/><circle cx="7.5" cy="14.5" r=".6" fill={color} stroke="none"/><circle cx="16.5" cy="14.5" r=".6" fill={color} stroke="none"/></svg>;
    case "clock":
      return <svg {...base}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>;
    case "calendar":
      return <svg {...base}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
    case "mapPin":
      return <svg {...base}><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "star":
      return <svg {...base}><path d="M12 2.5l2.9 6 6.6.7-4.9 4.6 1.3 6.5L12 17.1 6.1 20.3l1.3-6.5-4.9-4.6 6.6-.7L12 2.5z"/></svg>;
    case "code":
      return <svg {...base}><polyline points="9 18 3 12 9 6"/><polyline points="15 6 21 12 15 18"/></svg>;
    case "image":
      return <svg {...base}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.7"/><path d="M21 16l-5.5-5.5L9 17"/></svg>;
    case "messageCircle":
      return <svg {...base}><path d="M21 11.5a8.38 8.38 0 01-1.9 5.4L21 21l-4.3-1.1a8.5 8.5 0 11-2.9-15.9 8.5 8.5 0 017.2 7.5z"/></svg>;
    case "play":
      return <svg {...base} style={{ ...base.style, fill: color, stroke: "none" }}><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.75"/><path d="M10 8.5l6 3.5-6 3.5z"/></svg>;
    case "download":
      return <svg {...base}><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>;
    case "homeScreen":
      return <svg {...base}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/></svg>;
    case "swap":
      return <svg {...base}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>;
    case "heart":
      return <svg {...base}><path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2.3 4.5 6 4.5c2 0 3.5 1.1 6 3.5 2.5-2.4 4-3.5 6-3.5 3.7 0 5.6 3.8 4 7.2C19.5 16.3 12 21 12 21z"/></svg>;
    case "fileText":
      return <svg {...base}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>;
    case "dragDots":
      return (
        <svg {...base} style={{ ...base.style, fill: color, stroke: "none" }}>
          <circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/>
          <circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/>
          <circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>
        </svg>
      );
    case "chevUp":
      return <svg {...base}><polyline points="18 15 12 9 6 15"/></svg>;
    case "userCircle":
      return <svg {...base}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 19a6 6 0 0111 0"/></svg>;
    case "link2":
      return <svg {...base}><path d="M9 17H7a5 5 0 010-10h2"/><path d="M15 7h2a5 5 0 010 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
    case "phone":
      return <svg {...base}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>;
    default:
      return null;
  }
}

// ─── Shared Form Components ─────────────────────────────────────────────────────

function Label({ children, htmlFor }) {
  const C = useC();
  return (
    <label
      htmlFor={htmlFor}
      style={{ display: "block", fontSize: 12, fontWeight: 500, color: C.text2, marginBottom: 4, fontFamily: F }}
    >
      {children}
    </label>
  );
}

function Input({ id, type = "text", placeholder, value, onChange, autoComplete, style = {} }) {
  const C = useC();
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        type={isPassword ? (showPw ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: 44,
          padding: isPassword ? "0 40px 0 11px" : "0 11px",
          fontSize: 13,
          fontFamily: F,
          fontWeight: 400,
          color: C.text1,
          background: focused ? C.bgInputFocus : C.bgInput,
          border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
          borderRadius: R.sm,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
          boxShadow: focused ? `0 0 0 3px rgba(79,70,229,0.14)` : "none",
          ...style,
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPw(v => !v)}
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            color: C.text3,
            lineHeight: 0,
          }}
        >
          <Icon name={showPw ? "eyeOff" : "eye"} size={17} color={C.text3} />
        </button>
      )}
    </div>
  );
}

function Btn({ children, onClick, type = "button", variant = "primary", disabled = false, full = false, style = {} }) {
  const C = useC();
  const [hovered, setHovered] = useState(false);

  const variants = {
    primary: {
      background: hovered ? C.accentHover : C.accent,
      color: "#FFFFFF",
      border: "none",
    },
    ghost: {
      background: hovered ? C.bgInput : "transparent",
      color: C.text2,
      border: `1.5px solid ${C.border}`,
    },
    danger: {
      background: hovered ? "rgba(255,59,48,0.12)" : C.dangerBg,
      color: C.danger,
      border: `1.5px solid rgba(255,59,48,0.18)`,
    },
  };

  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: full ? "100%" : "auto",
        height: 44,
        padding: "0 20px",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: F,
        borderRadius: R.sm,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.15s, box-shadow 0.15s, transform 0.1s",
        transform: hovered && !disabled ? "translateY(-0.5px)" : "none",
        boxShadow: variant === "primary" && !disabled
          ? hovered ? "0 4px 14px rgba(79,70,229,0.32)" : "0 1px 3px rgba(79,70,229,0.20)"
          : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        letterSpacing: "-0.01em",
        ...v,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Logo Mark ─────────────────────────────────────────────────────────────────

function LogoMark({ size = 34, collapsed = false }) {
  const C = useC();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: R.sm,
          background: "linear-gradient(145deg, #6C63FF 0%, #4F46E5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(79,70,229,0.32)",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 800, fontSize: Math.round(size * 0.41), fontFamily: F, letterSpacing: "-0.02em" }}>
          C
        </span>
      </div>
      {!collapsed && (
        <span style={{ color: C.sidebarText, fontWeight: 650, fontSize: 16, fontFamily: FD, letterSpacing: "-0.025em" }}>
          Cardz
        </span>
      )}
    </div>
  );
}

// ─── Login Page ─────────────────────────────────────────────────────────────────

function LoginPage({ onSignIn, onRegister }) {
  const C = useC();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.bgPage,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F,
        zIndex: 100,
        padding: "0 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: C.bgSurface,
          borderRadius: R.xl,
          padding: "48px 48px 40px",
          boxShadow: C.shadow.form,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <LogoMark size={38} />
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 650,
              fontFamily: FD,
              color: C.text1,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
            }}
          >
            Welcome back
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: C.text2, lineHeight: 1.5 }}>
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Email */}
          <div>
            <Label htmlFor="login-email">Username or email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Label htmlFor="login-password">Password</Label>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.accent,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: F,
                  letterSpacing: 0,
                }}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <Btn type="submit" full style={{ marginTop: 4, height: 46, fontSize: 15 }}>
            Sign in
          </Btn>
        </form>

        {/* Divider */}
        <div
          style={{
            margin: "28px 0 0",
            paddingTop: 24,
            borderTop: `1px solid ${C.border}`,
            textAlign: "center",
            fontSize: 14,
            color: C.text2,
          }}
        >
          Don't have an account?{" "}
          <button
            onClick={onRegister}
            style={{
              background: "none",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              color: C.accent,
              cursor: "pointer",
              padding: 0,
              fontFamily: F,
            }}
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Register Page ──────────────────────────────────────────────────────────────

function RegisterPage({ onBack, onSignUp }) {
  const C = useC();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });

  const set = (key) => (e) => setForm(v => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignUp) onSignUp();
    else onBack();
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.bgPage,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F,
        zIndex: 100,
        padding: "0 16px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: C.bgSurface,
          borderRadius: R.xl,
          padding: "48px 48px 40px",
          margin: "32px 0",
          boxShadow: C.shadow.form,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 28 }}>
          <LogoMark size={38} />
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 650,
              fontFamily: FD,
              color: C.text1,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
            }}
          >
            Create your account
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: C.text2, lineHeight: 1.5 }}>
            Start building your digital presence today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <Label htmlFor="reg-first">First name</Label>
              <Input
                id="reg-first"
                placeholder="Jane"
                value={form.firstName}
                onChange={set("firstName")}
                autoComplete="given-name"
              />
            </div>
            <div>
              <Label htmlFor="reg-last">Last name</Label>
              <Input
                id="reg-last"
                placeholder="Smith"
                value={form.lastName}
                onChange={set("lastName")}
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="reg-email">Email address</Label>
            <Input
              id="reg-email"
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="reg-pw">Password</Label>
            <Input
              id="reg-pw"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={set("password")}
              autoComplete="new-password"
            />
          </div>

          {/* Confirm */}
          <div>
            <Label htmlFor="reg-confirm">Confirm password</Label>
            <Input
              id="reg-confirm"
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set("confirm")}
              autoComplete="new-password"
            />
          </div>

          {/* Terms note */}
          <p style={{ margin: 0, fontSize: 12, color: C.text3, lineHeight: 1.5 }}>
            By creating an account you agree to our{" "}
            <span style={{ color: C.accent, cursor: "pointer" }}>Terms of Service</span>{" "}
            and{" "}
            <span style={{ color: C.accent, cursor: "pointer" }}>Privacy Policy</span>.
          </p>

          {/* Submit */}
          <Btn type="submit" full style={{ height: 46, fontSize: 15 }}>
            Create account
          </Btn>
        </form>

        {/* Back to login */}
        <div
          style={{
            margin: "24px 0 0",
            paddingTop: 22,
            borderTop: `1px solid ${C.border}`,
            textAlign: "center",
            fontSize: 14,
            color: C.text2,
          }}
        >
          Already have an account?{" "}
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              color: C.accent,
              cursor: "pointer",
              padding: 0,
              fontFamily: F,
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── User Dropdown ─────────────────────────────────────────────────────────────

function UserDropdown({ user, onClose, onSignOut, collapsed }) {
  const C = useC();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const menuItems = [
    { label: "Settings", icon: "settings" },
    { label: "Subscription", icon: "creditCard" },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: collapsed ? 8 : 12,
        right: collapsed ? "auto" : 12,
        width: collapsed ? 200 : "auto",
        background: "#1C1E25",
        border: `1px solid rgba(255,255,255,0.09)`,
        borderRadius: R.md,
        boxShadow: C.shadow.dropdown,
        overflow: "hidden",
        zIndex: 200,
        fontFamily: F,
      }}
    >
      {/* Email header */}
      <div
        style={{
          padding: "12px 16px 10px",
          borderBottom: `1px solid rgba(255,255,255,0.07)`,
        }}
      >
        <p style={{ margin: 0, fontSize: 12, color: C.sidebarMuted, fontWeight: 400, letterSpacing: "0.01em" }}>
          {user.email}
        </p>
      </div>

      {/* Menu items */}
      {menuItems.map((item) => (
        <DropdownItem key={item.label} icon={item.icon} label={item.label} />
      ))}

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 0" }} />

      {/* Logout */}
      <DropdownItem icon="logout" label="Log out" danger onClick={onSignOut} />

      {/* Bottom padding */}
      <div style={{ height: 4 }} />
    </div>
  );
}

function DropdownItem({ icon, label, danger = false, onClick }) {
  const C = useC();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 16px",
        background: hovered ? (danger ? "rgba(255,59,48,0.10)" : "rgba(255,255,255,0.05)") : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: F,
        transition: "background 0.12s",
      }}
    >
      <Icon
        name={icon}
        size={15}
        color={danger ? C.danger : hovered ? C.sidebarText : C.sidebarMuted}
        style={{ transition: "color 0.12s" }}
      />
      <span
        style={{
          fontSize: 13.5,
          fontWeight: 450,
          color: danger ? C.danger : hovered ? C.sidebarText : "#C5C5CA",
          letterSpacing: "-0.005em",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard",     label: "Dashboard",     icon: "home" },
  { id: "cards",         label: "All Cards",      icon: "cards" },
  { id: "surveys",       label: "Surveys",        icon: "survey" },
  { id: "microsites",    label: "Microsites",     icon: "globe" },
  { id: "analytics",     label: "Analytics",      icon: "chart" },
  { id: "users",         label: "Users",          icon: "users" },
  { id: "companies",     label: "Companies",      icon: "building" },
  { id: "notifications", label: "Notifications",  icon: "bell" },
  { id: "qrcode",        label: "QR Code",        icon: "qr" },
  { id: "help",          label: "Help",           icon: "help" },
  { id: "imports",       label: "Imports",        icon: "upload" },
];

function NavItem({ item, active, collapsed, onClick }) {
  const C = useC();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={collapsed ? item.label : ""}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? "10px 0" : "8px 12px",
        borderRadius: R.sm,
        border: "none",
        cursor: "pointer",
        background: active ? C.sidebarActiveBg : hovered ? C.sidebarHover : "transparent",
        transition: "background 0.13s",
        marginBottom: 1,
        fontFamily: F,
        position: "relative",
      }}
    >
      <Icon
        name={item.icon}
        size={16.5}
        color={active ? C.sidebarActive : hovered ? C.sidebarText : C.sidebarMuted}
        style={{ transition: "color 0.13s" }}
      />
      {!collapsed && (
        <span
          style={{
            fontSize: 13.5,
            fontWeight: active ? 560 : 440,
            color: active ? "#FFFFFF" : hovered ? C.sidebarText : "#9D9DA6",
            letterSpacing: "-0.01em",
            transition: "color 0.13s, font-weight 0.13s",
          }}
        >
          {item.label}
        </span>
      )}
    </button>
  );
}

function Sidebar({ activeNav, onNavChange, collapsed, onToggleCollapse, user, onSignOut }) {
  const C = useC();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleHovered, setToggleHovered] = useState(false);

  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") || user.email?.[0]?.toUpperCase() || "?";

  return (
    <aside
      style={{
        width: collapsed ? 64 : 220,
        flexShrink: 0,
        background: C.sidebar,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "20px 18px 18px",
          borderBottom: `1px solid ${C.sidebarBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          flexShrink: 0,
        }}
      >
        <LogoMark size={32} collapsed={collapsed} />
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? "12px 8px 0" : "12px 10px 0",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {NAV.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeNav === item.id}
            collapsed={collapsed}
            onClick={onNavChange}
          />
        ))}
      </nav>

      {/* Collapse toggle — in flow, just above user footer */}
      <div
        style={{
          padding: collapsed ? "6px 0" : "6px 10px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onMouseEnter={() => setToggleHovered(true)}
          onMouseLeave={() => setToggleHovered(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: R.sm,
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ display: "block" }}>
            {collapsed
              ? <path d="M6 3L11 8L6 13" stroke={toggleHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M10 3L5 8L10 13" stroke={toggleHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
        </button>
      </div>

      {/* User footer */}
      <div
        style={{
          padding: collapsed ? "10px 8px 14px" : "10px 10px 14px",
          borderTop: `1px solid ${C.sidebarBorder}`,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Dropdown */}
        {dropdownOpen && (
          <UserDropdown
            user={user}
            collapsed={collapsed}
            onClose={() => setDropdownOpen(false)}
            onSignOut={onSignOut}
          />
        )}

        <button
          onClick={() => setDropdownOpen(v => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "8px 0" : "8px 10px",
            background: dropdownOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
            border: "none",
            borderRadius: R.sm,
            cursor: "pointer",
            fontFamily: F,
            transition: "background 0.13s",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: R.full,
              background: "linear-gradient(135deg, #6C63FF 0%, #4F46E5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            {initials}
          </div>

          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 550,
                  color: C.sidebarText,
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  letterSpacing: "-0.01em",
                }}
              >
                {user.firstName} {user.lastName}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.sidebarMuted,
                  lineHeight: 1.3,
                  marginTop: 1,
                }}
              >
                {user.plan || "Free"}
              </div>
            </div>
          )}

          {!collapsed && (
            <div
              style={{
                flexShrink: 0,
                background: user.plan === "Free"
                  ? "linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)"
                  : C.accent,
                color: "#fff",
                fontSize: 10.5,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: R.full,
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {user.plan === "Free" ? "Upgrade" : "Pro"}
            </div>
          )}
        </button>
      </div>

    </aside>
  );
}

// ─── Topbar ────────────────────────────────────────────────────────────────────

function Topbar({ title, subtitle, darkMode, onToggleDark, user, actions, onBack }) {
  const C = useC();
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") || "?";
  const [avatarHover, setAvatarHover] = useState(false);

  const dk = darkMode; // kept for the toggle button border/bg only
  const topBg      = C.bgSurface;
  const topBorder  = C.border;
  const titleColor = C.text1;
  const mutedColor = C.text3;
  const srchBg     = C.bgInput;
  const srchBorder = C.border;

  return (
    <header
      style={{
        height: 56,
        background: topBg,
        borderBottom: `1px solid ${topBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px 0 28px",
        flexShrink: 0,
        zIndex: 10,
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      {/* Left: title area */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button
            onClick={onBack}
            title="Back to All Cards"
            style={{
              width: 30, height: 30, borderRadius: R.sm, border: "none", outline: "none",
              background: "transparent", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = dk ? "rgba(255,255,255,0.08)" : C.bgInput}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <Icon name="chevLeft" size={17} color={titleColor} />
          </button>
        )}
        <div>
        {title && (
          <div
            style={{
              fontSize: 16,
              fontWeight: 650,
              color: titleColor,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: F,
              transition: "color 0.25s",
            }}
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div
            style={{
              fontSize: 12,
              color: mutedColor,
              marginTop: 1,
              fontFamily: F,
              transition: "color 0.25s",
            }}
          >
            {subtitle}
          </div>
        )}
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {actions}
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: srchBg,
            border: `1.5px solid ${srchBorder}`,
            borderRadius: R.sm,
            padding: "0 12px",
            height: 34,
            cursor: "text",
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          <Icon name="search" size={15} color={mutedColor} style={{ strokeWidth: 2 }} />
          <span style={{ fontSize: 13, color: mutedColor, fontFamily: F }}>Search…</span>
          <kbd
            style={{
              fontSize: 10.5,
              color: mutedColor,
              background: dk ? "rgba(255,255,255,0.06)" : C.bgPage,
              border: `1px solid ${srchBorder}`,
              borderRadius: 4,
              padding: "1px 5px",
              fontFamily: F,
              letterSpacing: "0.02em",
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Light / Dark toggle */}
        <button
          type="button"
          onClick={onToggleDark}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: 34,
            height: 34,
            padding: 0,
            borderRadius: R.sm,
            border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.10)" : C.border}`,
            background: darkMode ? "rgba(255,255,255,0.07)" : C.bgInput,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, border-color 0.2s",
            flexShrink: 0,
            lineHeight: 0,
          }}
        >
          <Icon
            name={dk ? "sun" : "moon"}
            size={18}
            color={dk ? "#FFFFFF" : C.text1}
          />
        </button>

        {/* Avatar */}
        <div
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          style={{
            width: 34,
            height: 34,
            borderRadius: R.full,
            background: "linear-gradient(135deg, #6C63FF 0%, #4F46E5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 700,
            fontFamily: F,
            letterSpacing: "0.02em",
            boxShadow: avatarHover ? "0 0 0 3px rgba(79,70,229,0.20)" : "none",
            transition: "box-shadow 0.15s",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}

// ─── Dashboard Placeholder ─────────────────────────────────────────────────────

function DashboardPlaceholder({ user }) {
  const C = useC();
  return (
    <div
      style={{
        flex: 1,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 56px)",
        fontFamily: F,
        gap: 12,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: R.lg,
          background: "linear-gradient(145deg, #6C63FF 0%, #4F46E5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
          boxShadow: "0 4px 16px rgba(79,70,229,0.26)",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>C</span>
      </div>
      <h2
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 600,
          fontFamily: FD,
          color: C.text1,
          letterSpacing: "-0.025em",
        }}
      >
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
      </h2>
      <p style={{ margin: 0, fontSize: 14, color: C.text3 }}>
        Select a section from the sidebar to get started.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Surveys Feature ───────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Switch component (needed for survey editor) ───────────────────────────────

function Switch({ checked, onChange, size = "md" }) {
  const C = useC();
  const w = size === "sm" ? 34 : 38, h = size === "sm" ? 20 : 22, knob = h - 4;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      style={{
        width: w, height: h, borderRadius: R.full, border: "none",
        background: checked ? C.accent : "#D8D8D6",
        position: "relative", cursor: "pointer", flexShrink: 0,
        transition: "background 0.18s", outline: "none", padding: 0,
      }}
    >
      <span style={{
        position: "absolute", top: 2, left: checked ? w - knob - 2 : 2,
        width: knob, height: knob, borderRadius: R.full, background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
        transition: "left 0.18s",
      }} />
    </button>
  );
}

// ─── Pill / Badge helper ────────────────────────────────────────────────────────

function Pill({ children, color = "default" }) {
  const C = useC();
  const map = {
    default:    { bg: C.bgInput,                       text: C.text2 },
    accent:     { bg: C.accentLight,                   text: C.accent },
    success:    { bg: "rgba(47,165,99,0.10)",           text: C.success },
    warning:    { bg: "rgba(216,147,42,0.12)",          text: C.warning },
    danger:     { bg: C.dangerBg,                      text: C.danger },
    orange:     { bg: "rgba(249,115,22,0.10)",          text: "#EA7011" },
    gray:       { bg: C.bgInput,                       text: C.text3 },
  };
  const s = map[color] || map.default;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: R.full, fontSize: 11.5, fontWeight: 600, fontFamily: F, background: s.bg, color: s.text, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

// ─── Sample data ───────────────────────────────────────────────────────────────

const SURVEY_SAMPLE = {
  id: "s1",
  name: "HenryTestQuiz",
  title: "Your BMW Experiance Matters",
  description: "Help us shape the future of BMW ownership by sharing your feedback",
  company: "Personalyz",
  sections: 9,
  submissions: 7,
  created: "16 Jun 2026",
  imageOverlay: true,
  overlayColor: "#000000",
  pagedView: true,
};

const QUESTIONS_SAMPLE = [
  {
    id: "q1", type: "multiple_choice", order: 1,
    question: "Top 3 Brands Financed by ALPHERA 2025 (New cars only)",
    helper: "",
    allowMultiple: true, required: true,
    options: [
      { id: "o1", text: "Land Rover", correct: false },
      { id: "o2", text: "Porche",     correct: true  },
      { id: "o3", text: "Toyota",     correct: true  },
      { id: "o4", text: "Ford",       correct: false },
      { id: "o5", text: "BMW",        correct: true  },
      { id: "o6", text: "VW",         correct: true  },
    ],
  },
  {
    id: "q2", type: "multiple_choice", order: 2,
    question: "Top 3 Brands Financed by ALPHERA 2025 (Used cars only)",
    helper: "",
    allowMultiple: true, required: true,
    options: [
      { id: "o7",  text: "Toyota",  correct: true  },
      { id: "o8",  text: "Porche",  correct: true  },
      { id: "o9",  text: "Volvo",   correct: false },
      { id: "o10", text: "Ford",    correct: true  },
      { id: "o11", text: "BMW",     correct: false },
    ],
  },
  {
    id: "q3", type: "multiple_choice", order: 3,
    question: "Total Amount paid for May and October DIC Sprint",
    helper: "",
    allowMultiple: false, required: true,
    options: [
      { id: "o12", text: "R 37,8 mil", correct: false },
      { id: "o13", text: "R 57 mil",   correct: true  },
      { id: "o14", text: "R 80,8 mil", correct: false },
    ],
  },
  {
    id: "q4", type: "multiple_choice", order: 4,
    question: "Average Amount Financed New",
    helper: "",
    allowMultiple: false, required: true,
    options: [
      { id: "o15", text: "R 750 000",  correct: false },
      { id: "o16", text: "R 1.2 mil",  correct: true  },
      { id: "o17", text: "R 680 000",  correct: false },
    ],
  },
  {
    id: "q5", type: "multiple_choice", order: 5,
    question: "Ferraris, Lamborghini, Aston Martin and Bentley Financed",
    helper: "",
    allowMultiple: false, required: true,
    options: [
      { id: "o18", text: "15", correct: false },
      { id: "o19", text: "45", correct: true  },
      { id: "o20", text: "30", correct: false },
    ],
  },
  {
    id: "q6", type: "multiple_choice", order: 6,
    question: "Highest Volume per dealer for a month",
    helper: "",
    allowMultiple: false, required: true,
    options: [
      { id: "o21", text: "R 37,8 mil", correct: false },
      { id: "o22", text: "R 57 mil",   correct: true  },
      { id: "o23", text: "R 80,8 mil", correct: false },
    ],
  },
  {
    id: "q7", type: "answer_block", order: 7,
    question: "What can we do better",
    helper: "",
    required: true,
    placeholderText: "Type your answer here...",
    multiLine: true,
  },
  {
    id: "q8", type: "multiple_choice", order: 8,
    question: "Rate your overall experience",
    helper: "",
    allowMultiple: false, required: true,
    options: [
      { id: "o24", text: "Excellent", correct: true },
      { id: "o25", text: "Good",      correct: false },
      { id: "o26", text: "Average",   correct: false },
      { id: "o27", text: "Poor",      correct: false },
    ],
  },
  {
    id: "q9", type: "answer_block", order: 9,
    question: "Any additional comments?",
    helper: "",
    required: false,
    placeholderText: "Type your answer here...",
    multiLine: true,
  },
];

const RESULTS_PARTICIPANTS = [
  { name: "Brendan Smith", phone: "1234567890", email: "brendan@smith.com", answered: 9, status: "Complete", date: "17 Jun 2026" },
  { name: "Henry Oertel",  phone: "+27836751117", email: "oertel.henry@gmail.com", answered: 9, status: "Complete", date: "17 Jun 2026" },
];

const RESULTS_QUESTIONS = QUESTIONS_SAMPLE.map((q, i) => ({
  ...q,
  answeredCount: 2, totalCount: 2, pct: 100, status: "Complete",
  answers: q.options ? q.options.map(o => ({ ...o, votes: o.correct ? 2 : 1, pct: o.correct ? 100 : 50 })) : [],
}));

// ─── Surveys List Page ─────────────────────────────────────────────────────────

function SurveysListPage({ onEdit, onNewSurvey }) {
  const C = useC();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("surveys"); // surveys | results
  const [searchFocused, setSearchFocused] = useState(false);

  const surveys = [SURVEY_SAMPLE];
  const filtered = surveys.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "24px 28px", fontFamily: F }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, height: 38, width: 220, padding: "0 12px",
          background: searchFocused ? C.bgInputFocus : C.bgInput,
          border: `1.5px solid ${searchFocused ? C.borderFocus : C.border}`,
          borderRadius: R.sm, boxShadow: searchFocused ? "0 0 0 3px rgba(79,70,229,0.14)" : "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}>
          <Icon name="search" size={14} color={C.text3} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search surveys..."
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, color: C.text1, fontFamily: F, width: "100%" }}
          />
        </div>

        {/* Company filter */}
        <div style={{ position: "relative" }}>
          <select style={{ height: 38, padding: "0 32px 0 14px", fontSize: 13.5, fontFamily: F, color: C.text1, background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", appearance: "none", cursor: "pointer" }}>
            <option>All Companies</option>
            <option>Personalyz</option>
          </select>
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Icon name="chevDown" size={14} color={C.text3} />
          </div>
        </div>

        {/* Tab strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: 4 }}>
          {[{ id: "surveys", label: "Surveys", count: surveys.length }, { id: "results", label: "Results" }].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: "none", border: "none", borderBottom: `2.5px solid ${tab === t.id ? C.accent : "transparent"}`,
                borderTop: "none", borderLeft: "none", borderRight: "none",
                outline: "none", cursor: "pointer", padding: "6px 2px 8px", fontFamily: F,
                fontSize: 14, fontWeight: tab === t.id ? 650 : 500,
                color: tab === t.id ? C.accent : C.text2,
              }}
            >
              {t.label}{t.count != null && <span style={{ marginLeft: 5, fontSize: 12, fontWeight: 650, background: tab === t.id ? C.accent : C.bgInput, color: tab === t.id ? "#fff" : C.text2, borderRadius: R.full, padding: "1px 6px" }}>{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Table surface */}
      <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
          <thead>
            <tr>
              {["Survey", "Company / Unit", "Sections", "Submissions", "Created", ""].map((h, i) => (
                <th key={i} style={{ textAlign: "left", padding: "11px 20px", fontSize: 11.5, fontWeight: 650, letterSpacing: "0.04em", color: C.text3, textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, background: C.bgPage, whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => (
              <tr
                key={s.id}
                style={{ borderBottom: idx < filtered.length - 1 ? `1px solid ${C.border}` : "none" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bgPage}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: R.sm, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="survey" size={15} color={C.accent} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.accent, cursor: "pointer" }} onClick={() => onEdit(s)}>{s.name}</div>
                      <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.description}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 20px", fontSize: 13.5, color: C.text1 }}>{s.company}</td>
                <td style={{ padding: "12px 20px", fontSize: 13.5, color: C.text1, textAlign: "center" }}>{s.sections}</td>
                <td style={{ padding: "12px 20px", fontSize: 13.5, color: C.text1, textAlign: "center" }}>{s.submissions}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.text2, whiteSpace: "nowrap" }}>{s.created}</td>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                    <button title="Edit" onClick={() => onEdit(s)} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", borderRadius: R.sm, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.bgInput} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <Icon name="edit" size={15} color={C.text2} />
                    </button>
                    <button title="Delete" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", borderRadius: R.sm, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.dangerBg} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <Icon name="trash" size={15} color={C.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "40px 20px", textAlign: "center", fontSize: 14, color: C.text3 }}>No surveys match your search.</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 13, color: C.text2 }}>Showing 1–{filtered.length} of {filtered.length} surveys</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button disabled style={{ width: 28, height: 28, borderRadius: R.sm, border: "none", background: "transparent", cursor: "not-allowed", opacity: 0.35, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="chevLeft" size={15} color={C.text2} />
            </button>
            <button style={{ minWidth: 28, height: 28, borderRadius: R.sm, border: "none", background: C.accent, color: "#fff", fontSize: 13, fontWeight: 650, fontFamily: F, cursor: "pointer" }}>1</button>
            <button disabled style={{ width: 28, height: 28, borderRadius: R.sm, border: "none", background: "transparent", cursor: "not-allowed", opacity: 0.35, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="chevRight" size={15} color={C.text2} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: C.text2 }}>Per page</span>
            <select style={{ height: 28, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 13, color: C.text1, padding: "0 8px", cursor: "pointer" }}>
              <option>10</option><option>25</option><option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Survey Editor: Survey Details Panel ───────────────────────────────────────

function SurveyDetailsPanel({ survey, onChange }) {
  const C = useC();
  const [detailsTab, setDetailsTab] = useState("details"); // details | customHtml
  const set = k => e => onChange({ ...survey, [k]: e.target.value });

  return (
    <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px", borderBottom: `1px solid ${C.border}`, background: C.bgPage }}>
        <div style={{ width: 22, height: 22, borderRadius: R.full, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="survey" size={13} color={C.accent} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 650, color: C.text1, fontFamily: FD }}>Survey Details</span>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 20px", background: C.bgSurface }}>
        {[{ id: "details", label: "Details" }, { id: "customHtml", label: "<> Custom HTML" }].map(t => (
          <button
            key={t.id}
            onClick={() => setDetailsTab(t.id)}
            style={{
              background: "none", border: "none", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none",
              borderBottom: `2.5px solid ${detailsTab === t.id ? C.accent : "transparent"}`,
              cursor: "pointer", padding: "10px 4px 9px", marginRight: 18, fontFamily: F,
              fontSize: 13.5, fontWeight: detailsTab === t.id ? 650 : 500,
              color: detailsTab === t.id ? C.accent : C.text2,
              marginBottom: -1,
            }}
          >
            {t.id === "details" && <Icon name="survey" size={13} color={detailsTab === t.id ? C.accent : C.text3} style={{ display: "inline-block", verticalAlign: "middle", marginRight: 5 }} />}
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 20px" }}>
        {detailsTab === "details" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <Label>Survey Name</Label>
              <input value={survey.name} onChange={set("name")} style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
              <p style={{ margin: "5px 0 0", fontSize: 12, color: C.text3 }}>Letters, numbers, hyphens, and underscores only — used in the survey URL.</p>
            </div>
            <div>
              <Label>Survey Title</Label>
              <input value={survey.title} onChange={set("title")} style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <Label>Description</Label>
              <textarea value={survey.description} onChange={set("description")} rows={4} style={{ width: "100%", padding: "10px 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5 }} />
            </div>

            {/* Survey Image */}
            <div>
              <Label>Survey Image</Label>
              <div style={{ height: 160, background: "linear-gradient(135deg,#0B0C1A,#1a1a2e)", borderRadius: R.md, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, position: "relative", overflow: "hidden", border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 40 }}>🏎️</span>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: R.sm, fontFamily: F }}>Drag to reposition</span>
                </div>
              </div>
              <button style={{ width: "100%", height: 38, border: `1.5px solid ${C.accent}`, borderRadius: R.sm, background: C.accentLight, color: C.accent, fontFamily: F, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                <Icon name="image" size={14} color={C.accent} /> Change Image
              </button>
              <div style={{ height: 38, padding: "0 12px", background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, display: "flex", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 11.5, color: C.text3, fontFamily: F, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://personalyz-images.s3.af-south-1.amazonaws.com/ad-loads/survey</span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 11.5, color: C.text3 }}>Recommended: 800×400px · JPG/PNG · Max 2MB · Drag the crop window to reposition.</p>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: C.danger, fontSize: 12.5, fontFamily: F, display: "flex", alignItems: "center", gap: 4, marginTop: 6, padding: 0 }}>
                <Icon name="x" size={12} color={C.danger} /> Remove image
              </button>
            </div>

            {/* Toggles */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: C.bgPage, borderRadius: R.sm }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 550, color: C.text1 }}>Image overlay</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 1 }}>Colour tint applied over the banner image</div>
                </div>
                {survey.imageOverlay && (
                  <label style={{ width: 24, height: 24, borderRadius: R.xs, background: survey.overlayColor || "#000", border: `1px solid ${C.border}`, cursor: "pointer", display: "block", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                    <input type="color" value={survey.overlayColor || "#000000"} onChange={e => onChange({ ...survey, overlayColor: e.target.value })} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
                  </label>
                )}
              </div>
              <Switch checked={survey.imageOverlay} onChange={v => onChange({ ...survey, imageOverlay: v })} size="sm" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: C.bgPage, borderRadius: R.sm }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 550, color: C.text1 }}>Paged view</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 1 }}>Show one question at a time with Next / Back navigation</div>
                </div>
                {survey.pagedView && <Pill color="accent">Paged</Pill>}
              </div>
              <Switch checked={survey.pagedView} onChange={v => onChange({ ...survey, pagedView: v })} size="sm" />
            </div>
          </div>
        ) : (
          <div>
            {/* Enable toggle row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: C.bgPage, borderRadius: R.sm, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Switch checked={survey.customHtmlEnabled || false} onChange={v => onChange({ ...survey, customHtmlEnabled: v })} size="sm" />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 550, color: C.text1 }}>Enable Custom HTML</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 1 }}>Inject custom markup into the survey card</div>
                </div>
              </div>
              <Pill color={survey.customHtmlEnabled ? "success" : "gray"}>{survey.customHtmlEnabled ? "Enabled" : "Disabled"}</Pill>
            </div>

            {/* HTML textarea */}
            <div>
              <Label>Custom HTML</Label>
              <textarea
                rows={10}
                value={survey.customHtmlContent || ""}
                onChange={e => onChange({ ...survey, customHtmlContent: e.target.value })}
                placeholder="Paste any custom HTML to inject into the survey card…"
                style={{
                  width: "100%", padding: "10px 11px", fontSize: 13,
                  fontFamily: "'SF Mono','Monaco','Consolas',monospace",
                  color: C.text1, background: C.bgInput,
                  border: `1.5px solid ${C.border}`, borderRadius: R.sm,
                  outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6,
                  opacity: survey.customHtmlEnabled ? 1 : 0.55,
                }}
                disabled={!survey.customHtmlEnabled}
              />
              <p style={{ margin: "6px 0 0", fontSize: 12, color: C.text3, lineHeight: 1.5 }}>
                Raw HTML is rendered as-is on the card.{" "}
                <span style={{ color: C.accent, cursor: "pointer" }}>Sanitize on the backend before saving</span>{" "}
                to avoid unsafe scripts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Survey Editor: Question Components ────────────────────────────────────────

function SectionTypeDropdown({ onSelect, onClose }) {
  const C = useC();
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const types = [
    { id: "multiple_choice", icon: "userCircle", label: "Multiple Choice", desc: "A question with selectable options. Mark which answer(s) are correct to track progress." },
    { id: "answer_block",    icon: "fileText",   label: "Answer Block",    desc: "A prompt with an open text field for respondents to type their own answer." },
  ];

  return (
    <div ref={ref} style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 100, background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, boxShadow: C.shadow.dropdown, padding: 14, minWidth: 280 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: C.text3, textTransform: "uppercase", marginBottom: 10, fontFamily: F }}>Choose a section type</div>
      {types.map(t => (
        <button
          key={t.id}
          onClick={() => { onSelect(t.id); onClose(); }}
          style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 10px", border: "none", background: "none", cursor: "pointer", borderRadius: R.sm, textAlign: "left", marginBottom: 4 }}
          onMouseEnter={e => e.currentTarget.style.background = C.bgInput}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div style={{ width: 28, height: 28, borderRadius: R.full, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <Icon name={t.icon} size={14} color={C.accent} />
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text1, fontFamily: F }}>{t.label}</div>
            <div style={{ fontSize: 12, color: C.text3, marginTop: 2, lineHeight: 1.4 }}>{t.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function AnswerOption({ opt, allowMultiple, onToggleCorrect, onChange, onRemove }) {
  const C = useC();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px", borderRadius: R.sm, background: opt.correct ? "rgba(47,165,99,0.08)" : "transparent", border: `1.5px solid ${opt.correct ? C.success : C.border}`, marginBottom: 4 }}>
      <Icon name="dragDots" size={12} color={C.text3} style={{ cursor: "grab", flexShrink: 0 }} />
      {/* Correct toggle */}
      <button
        onClick={() => onToggleCorrect()}
        title="Mark as correct"
        style={{ width: 17, height: 17, borderRadius: allowMultiple ? R.xs : R.full, border: `2px solid ${opt.correct ? C.success : C.border}`, background: opt.correct ? C.success : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, padding: 0 }}
      >
        {opt.correct && <Icon name="check" size={10} color="#fff" />}
      </button>
      <input
        value={opt.text}
        onChange={e => onChange({ ...opt, text: e.target.value })}
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: F, color: C.text1 }}
      />
      {opt.correct && <span style={{ fontSize: 11.5, fontWeight: 600, color: C.success }}>Correct</span>}
      <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: C.text3 }}>
        <Icon name="x" size={13} color={C.text3} />
      </button>
    </div>
  );
}

function MultipleChoiceQuestion({ q, onChange, onRemove, onDuplicate, onMoveUp, onMoveDown, isFirst, isLast }) {
  const C = useC();
  const [collapsed, setCollapsed] = useState(false);
  const correctCount = q.options.filter(o => o.correct).length;

  const updateOption = (idx, next) => {
    const opts = [...q.options]; opts[idx] = next; onChange({ ...q, options: opts });
  };
  const toggleCorrect = (idx) => {
    const opts = q.options.map((o, i) => ({ ...o, correct: q.allowMultiple ? (i === idx ? !o.correct : o.correct) : i === idx }));
    onChange({ ...q, options: opts });
  };
  const removeOption = (idx) => onChange({ ...q, options: q.options.filter((_, i) => i !== idx) });
  const addOption = () => onChange({ ...q, options: [...q.options, { id: `o_${Date.now()}`, text: "", correct: false }] });

  return (
    <div style={{ background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.lg, marginBottom: 24, boxShadow: C.shadow.md, overflow: "hidden" }}>
      {/* Collapsed header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: C.bgPage, borderBottom: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}` }}>
        <Icon name="dragDots" size={14} color={C.text3} style={{ cursor: "grab", flexShrink: 0 }} />
        <div style={{ width: 22, height: 22, borderRadius: R.full, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="userCircle" size={13} color={C.accent} />
        </div>
        <span style={{ width: 20, fontSize: 12.5, color: C.text3, flexShrink: 0 }}>{q.order}</span>
        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: C.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.question || "Untitled question"}</span>
        <Pill color="accent">Multiple Choice</Pill>
        {q.required && <Pill color="warning">Required</Pill>}
        <Pill color="gray">{q.options.length} options</Pill>
        {!isFirst && (
          <button onClick={onMoveUp} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 3px", color: C.text3, display: "flex" }} title="Move up">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 9L6 3M6 3L3 6M6 3L9 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        {!isLast && (
          <button onClick={onMoveDown} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 3px", color: C.text3, display: "flex" }} title="Move down">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3L6 9M6 9L9 6M6 9L3 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        <button onClick={() => setCollapsed(v => !v)} title={collapsed ? "Expand" : "Collapse"} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", padding: 2, display: "flex", color: C.text3, transition: "transform 0.2s", transform: collapsed ? "rotate(180deg)" : "none" }}>
          <Icon name="chevUp" size={15} color={C.text3} />
        </button>
      </div>

      {!collapsed && <div style={{ padding: "14px 18px" }}>
        <div style={{ marginBottom: 8 }}>
          <Label>Question</Label>
          <input value={q.question} onChange={e => onChange({ ...q, question: e.target.value })} style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Label>Helper text (optional)</Label>
          <input value={q.helper} onChange={e => onChange({ ...q, helper: e.target.value })} placeholder="e.g. Select all that apply." style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
        </div>

        {/* Answers header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase", fontFamily: F }}>Answers</span>
            <Pill color="success">{correctCount} correct</Pill>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Switch checked={q.allowMultiple} onChange={v => onChange({ ...q, allowMultiple: v })} size="sm" />
            <span style={{ fontSize: 12.5, color: C.text2 }}>Allow multiple</span>
          </div>
        </div>
        <p style={{ margin: "0 0 10px", fontSize: 11.5, color: C.text3, fontStyle: "italic" }}>Tap the {q.allowMultiple ? "checkbox" : "circle"} to flag an answer as correct. Correct answers drive real-time progress scoring on the backend.</p>

        {q.options.map((opt, idx) => (
          <AnswerOption key={opt.id} opt={opt} allowMultiple={q.allowMultiple}
            onToggleCorrect={() => toggleCorrect(idx)}
            onChange={next => updateOption(idx, next)}
            onRemove={() => removeOption(idx)}
          />
        ))}

        <button onClick={addOption} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: `1.5px dashed ${C.border}`, borderRadius: R.sm, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: C.accent, fontFamily: F, fontWeight: 600, marginTop: 4 }}>
          <Icon name="plus" size={14} color={C.accent} /> Add Option
        </button>
      </div>}

      {!collapsed && /* Footer */
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderTop: `1px solid ${C.border}`, background: C.bgPage }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Switch checked={q.required} onChange={v => onChange({ ...q, required: v })} size="sm" />
          <span style={{ fontSize: 13, color: C.text2 }}>Required</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onDuplicate} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.text2, fontFamily: F, padding: "2px 0" }}>
            <Icon name="copy" size={14} color={C.text2} /> Duplicate
          </button>
          <button onClick={onRemove} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.danger, fontFamily: F, padding: "2px 0" }}>
            <Icon name="trash" size={13} color={C.danger} /> Delete
          </button>
        </div>
      </div>}
    </div>
  );
}

function AnswerBlockQuestion({ q, onChange, onRemove, onDuplicate, onMoveUp, onMoveDown, isFirst, isLast }) {
  const C = useC();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.lg, marginBottom: 24, boxShadow: C.shadow.md, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: C.bgPage, borderBottom: `1px solid ${C.border}`, borderLeft: "3px solid #6D40FF" }}>
        <Icon name="dragDots" size={14} color={C.text3} style={{ cursor: "grab", flexShrink: 0 }} />
        <div style={{ width: 22, height: 22, borderRadius: R.full, background: "rgba(109,64,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="fileText" size={13} color="#6D40FF" />
        </div>
        <span style={{ width: 20, fontSize: 12.5, color: C.text3, flexShrink: 0 }}>{q.order}</span>
        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: C.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.question || "Untitled question"}</span>
        <Pill color="gray">Answer Block</Pill>
        {q.required && <Pill color="warning">Required</Pill>}
        <Pill color="default">{q.multiLine ? "Long answer" : "Short answer"}</Pill>
        {!isFirst && <button onClick={onMoveUp} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 3px", color: C.text3, display: "flex" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 9L6 3M6 3L3 6M6 3L9 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
        {!isLast && <button onClick={onMoveDown} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 3px", color: C.text3, display: "flex" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3L6 9M6 9L9 6M6 9L3 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
        <button onClick={() => setCollapsed(v => !v)} title={collapsed ? "Expand" : "Collapse"} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", padding: 2, display: "flex", color: C.text3, transition: "transform 0.2s", transform: collapsed ? "rotate(180deg)" : "none" }}><Icon name="chevUp" size={15} color={C.text3} /></button>
      </div>

      {!collapsed && <div style={{ padding: "14px 18px" }}>
        <div style={{ marginBottom: 8 }}>
          <Label>Prompt / Question</Label>
          <input value={q.question} onChange={e => onChange({ ...q, question: e.target.value })} style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Label>Helper text (optional)</Label>
          <input value={q.helper} onChange={e => onChange({ ...q, helper: e.target.value })} placeholder="Extra guidance for the respondent..." style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase", marginBottom: 8, fontFamily: F }}>Respondent's Answer Field</div>
          <textarea rows={4} placeholder="Type your answer here..." style={{ width: "100%", padding: "8px 11px", fontSize: 13, fontFamily: F, color: C.text3, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.5 }} readOnly />
          <p style={{ margin: "5px 0 0", fontSize: 11.5, color: C.text3, fontStyle: "italic" }}>Preview only — respondents fill this in on the live card.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center" }}>
          <div>
            <Label>Placeholder text</Label>
            <input value={q.placeholderText} onChange={e => onChange({ ...q, placeholderText: e.target.value })} style={{ width: "100%", height: 32, padding: "0 11px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 22, flexShrink: 0 }}>
            <Switch checked={q.multiLine} onChange={v => onChange({ ...q, multiLine: v })} size="sm" />
            <span style={{ fontSize: 12.5, color: C.text2, whiteSpace: "nowrap" }}>Multi-line answer</span>
          </div>
        </div>
      </div>}

      {!collapsed && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderTop: `1px solid ${C.border}`, background: C.bgPage }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Switch checked={q.required} onChange={v => onChange({ ...q, required: v })} size="sm" />
          <span style={{ fontSize: 13, color: C.text2 }}>Required</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onDuplicate} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.text2, fontFamily: F }}>
            <Icon name="copy" size={14} color={C.text2} /> Duplicate
          </button>
          <button onClick={onRemove} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.danger, fontFamily: F }}>
            <Icon name="trash" size={13} color={C.danger} /> Delete
          </button>
        </div>
      </div>}
    </div>
  );
}

// ─── Survey Editor: Questions Panel ────────────────────────────────────────────

function QuestionsPanel({ questions, onChange }) {
  const C = useC();
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const updateQ = (idx, next) => { const qs = [...questions]; qs[idx] = next; onChange(qs); };
  const removeQ = (idx) => onChange(questions.filter((_, i) => i !== idx));
  const duplicateQ = (idx) => {
    const copy = { ...questions[idx], id: `q_${Date.now()}`, order: questions.length + 1 };
    onChange([...questions, copy]);
  };
  const moveQ = (idx, dir) => {
    const qs = [...questions];
    const t = idx + dir;
    if (t < 0 || t >= qs.length) return;
    [qs[idx], qs[t]] = [qs[t], qs[idx]];
    onChange(qs.map((q, i) => ({ ...q, order: i + 1 })));
  };
  const addQuestion = (type) => {
    const base = { id: `q_${Date.now()}`, type, order: questions.length + 1, question: "", helper: "", required: true };
    const q = type === "multiple_choice"
      ? { ...base, allowMultiple: false, options: [] }
      : { ...base, placeholderText: "Type your answer here...", multiLine: true };
    onChange([...questions, q]);
  };

  const mcCount = questions.filter(q => q.type === "multiple_choice").length;
  const abCount = questions.filter(q => q.type === "answer_block").length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD }}>Survey Sections</h2>
          <p style={{ margin: "3px 0 0", fontSize: 12.5, color: C.text3 }}>
            {questions.length} sections · {mcCount} multiple choice · {abCount} answer block{abCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <Btn onClick={() => setShowTypeDropdown(v => !v)} style={{ height: 36, padding: "0 16px", fontSize: 13 }}>
            <Icon name="plus" size={14} color="#fff" /> Add Section
          </Btn>
          {showTypeDropdown && (
            <SectionTypeDropdown onSelect={addQuestion} onClose={() => setShowTypeDropdown(false)} />
          )}
        </div>
      </div>

      {questions.map((q, idx) =>
        q.type === "multiple_choice" ? (
          <MultipleChoiceQuestion key={q.id} q={q} onChange={next => updateQ(idx, next)} onRemove={() => removeQ(idx)} onDuplicate={() => duplicateQ(idx)} onMoveUp={() => moveQ(idx, -1)} onMoveDown={() => moveQ(idx, 1)} isFirst={idx === 0} isLast={idx === questions.length - 1} />
        ) : (
          <AnswerBlockQuestion key={q.id} q={q} onChange={next => updateQ(idx, next)} onRemove={() => removeQ(idx)} onDuplicate={() => duplicateQ(idx)} onMoveUp={() => moveQ(idx, -1)} onMoveDown={() => moveQ(idx, 1)} isFirst={idx === 0} isLast={idx === questions.length - 1} />
        )
      )}
    </div>
  );
}

// ─── Survey Editor: Live Preview ───────────────────────────────────────────────

function SurveyLivePreview({ survey }) {
  const C = useC();
  return (
    <div style={{ width: 300, flexShrink: 0, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", background: C.bgPage }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <span style={{ fontSize: 13.5, fontWeight: 650, color: C.text1, fontFamily: FD }}>Preview</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 12px", overflowY: "auto" }}>
        <div style={{ width: 250, borderRadius: 24, background: "#0B0B0D", padding: 7, boxShadow: "0 16px 40px rgba(0,0,0,0.26)" }}>
          <div style={{ borderRadius: 18, overflow: "hidden" }}>
            {/* Survey banner */}
            <div style={{ height: 120, background: "linear-gradient(135deg,#0B0C1A,#1C1F35)", position: "relative", display: "flex", alignItems: "flex-end", padding: 12 }}>
              <div style={{ position: "absolute", top: 8, left: 10, display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: R.full, background: C.success }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: F, letterSpacing: "0.08em" }}>SURVEY</span>
              </div>
              <div style={{ fontSize: 22, position: "absolute", top: 8, right: 10, opacity: 0.3 }}>M</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: FD, lineHeight: 1.2, letterSpacing: "-0.02em" }}>{survey.title || "Your Survey Title"}</h3>
                <p style={{ margin: "4px 0 0", fontSize: 9.5, color: "rgba(255,255,255,0.6)", fontFamily: F, lineHeight: 1.4 }}>{(survey.description || "").slice(0, 60)}{survey.description?.length > 60 ? "…" : ""}</p>
              </div>
            </div>
            {/* Form area */}
            <div style={{ background: "#fff", padding: "14px 14px 18px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 10, color: "#3a3a3f", fontFamily: F, lineHeight: 1.5 }}>Before we get started, please tell us a bit about yourself.</p>
              {[{ label: "First Name", ph: "Jane" }, { label: "Last Name", ph: "Smith" }, { label: "Email Address", ph: "jane@example.com" }].map(f => (
                <div key={f.label} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 600, color: "#161618", marginBottom: 3, fontFamily: F }}>{f.label} <span style={{ color: "#E5484D" }}>*</span></div>
                  <div style={{ height: 28, padding: "0 8px", background: "#F6F6F4", border: "1px solid #E7E7E3", borderRadius: 5, display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 9.5, color: "#A6A6AC", fontFamily: F }}>{f.ph}</span>
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

// ─── Survey Editor: Page ───────────────────────────────────────────────────────

function SurveyEditorPage({ survey: initialSurvey, onBack }) {
  const C = useC();
  const [survey, setSurvey] = useState(initialSurvey);
  const [questions, setQuestions] = useState(QUESTIONS_SAMPLE);
  const [activeSection, setActiveSection] = useState("surveyDetails"); // surveyDetails | questions

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", fontFamily: F, background: C.bgPage }}>
      {/* Editor topbar */}
      <div style={{ height: 52, background: C.bgSurface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ width: 28, height: 28, borderRadius: R.sm, border: `1px solid ${C.border}`, background: C.bgInput, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="chevLeft" size={15} color={C.text2} />
          </button>
          <div style={{ width: 24, height: 24, borderRadius: R.sm, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="survey" size={14} color={C.accent} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 650, color: C.text1, fontFamily: FD }}>{survey.name}</span>
              <Pill color="accent">Survey</Pill>
            </div>
            <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1 }}>Editing existing survey</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Btn variant="ghost" onClick={onBack} style={{ height: 34, padding: "0 14px", fontSize: 13 }}>
            <Icon name="x" size={14} color={C.text2} /> Cancel
          </Btn>
          <Btn style={{ height: 34, padding: "0 14px", fontSize: 13 }}>
            <Icon name="check" size={14} color="#fff" /> Save Changes
          </Btn>
        </div>
      </div>

      {/* Editor body */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left nav */}
        <div style={{ width: 200, flexShrink: 0, borderRight: `1px solid ${C.border}`, background: C.bgSurface, display: "flex", flexDirection: "column", padding: "14px 10px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.07em", color: C.text3, textTransform: "uppercase", marginBottom: 8, padding: "0 4px", fontFamily: F }}>Survey</div>
          {[
            { id: "surveyDetails", label: "Survey Details", icon: "survey" },
            { id: "questions",     label: "Questions",      icon: "list" },
          ].map(item => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                  borderRadius: R.sm, border: "none", cursor: "pointer", fontFamily: F, marginBottom: 2,
                  background: active ? C.accentLight : "transparent",
                  borderLeft: `3px solid ${active ? C.accent : "transparent"}`,
                  textAlign: "left",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.bgInput; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ width: 22, height: 22, borderRadius: R.sm, background: active ? C.accent : C.bgInput, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={item.icon} size={13} color={active ? "#fff" : C.text2} />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: active ? 650 : 500, color: active ? C.accent : C.text1 }}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Center content */}
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: "20px 24px" }}>
          {activeSection === "surveyDetails" ? (
            <SurveyDetailsPanel survey={survey} onChange={setSurvey} />
          ) : (
            <QuestionsPanel questions={questions} onChange={setQuestions} />
          )}
        </div>

        {/* Right preview */}
        <SurveyLivePreview survey={survey} />
      </div>
    </div>
  );
}

// ─── Survey Results: Donut circle ──────────────────────────────────────────────

function DonutCircle({ answered, total, status }) {
  const pct = total > 0 ? answered / total : 0;
  const r = 26, cx = 32, cy = 32, stroke = 4;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const color = status === "Complete" ? "#2FA563" : status === "In Progress" ? "#D8932A" : "#A6A6AC";
  return (
    <svg width={64} height={64} viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E7E7E3" strokeWidth={stroke} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25}
        strokeLinecap="round" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 13, fontWeight: 700, fill: color, fontFamily: F }}>
        {answered}
      </text>
      <text x={cx} y={cy + 13} textAnchor="middle" style={{ fontSize: 9, fill: "#A6A6AC", fontFamily: F }}>
        /{total}
      </text>
    </svg>
  );
}

// ─── Survey Results: Question breakdown card ────────────────────────────────────

function QuestionBreakdownCard({ q, index }) {
  const C = useC();
  const [revealed, setRevealed] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const statusColor = q.status === "Complete" ? C.success : q.status === "In Progress" ? C.warning : C.text3;
  const maxVotes = Math.max(1, ...(q.answers?.map(a => a.votes) || [1]));

  return (
    <div style={{ background: C.bgSurface, border: `1.5px solid ${q.status === "Complete" ? "rgba(47,165,99,0.25)" : q.status === "In Progress" ? "rgba(216,147,42,0.25)" : C.border}`, borderRadius: R.lg, marginBottom: 12, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
        <DonutCircle answered={q.answeredCount} total={q.totalCount} status={q.status} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text3 }}>{index + 1}</span>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.question}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: C.text3 }}>{q.answeredCount} / {q.totalCount} answered ({q.pct}%)</span>
            <Pill color={q.status === "Complete" ? "success" : q.status === "In Progress" ? "warning" : "gray"}>{q.status}</Pill>
          </div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: statusColor, fontFamily: FD, flexShrink: 0 }}>{q.pct}%<div style={{ fontSize: 10, fontWeight: 600, color: C.text3, textAlign: "right", letterSpacing: "0.05em" }}>PARTICIPATION</div></div>
      </div>

      {/* Reveal / bar chart */}
      {q.answers && q.answers.length > 0 && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "0 18px" }}>
          <button
            onClick={() => setRevealed(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: C.accent, fontFamily: F, fontWeight: 600, padding: "10px 0" }}
          >
            <Icon name={revealed ? "eyeOff" : "eye"} size={13} color={C.accent} />
            {revealed ? "Hide answers" : "Reveal answers"}
          </button>
          {revealed && (
            <div style={{ paddingBottom: 14 }}>
              {q.answers.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  {showCorrect && <div style={{ width: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.correct ? <Icon name="check" size={12} color={C.success} /> : <Icon name="x" size={12} color={C.text3} />}</div>}
                  <span style={{ width: 90, fontSize: 12.5, color: C.text2, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.text}</span>
                  <div style={{ flex: 1, height: 8, background: C.bgInput, borderRadius: R.full, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(a.votes / maxVotes) * 100}%`, background: a.votes === maxVotes ? C.accent : C.text3, borderRadius: R.full, transition: "width 0.4s" }} />
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: C.text2, width: 16, flexShrink: 0, textAlign: "right" }}>{a.votes}</span>
                  <span style={{ fontSize: 12, color: C.text3, width: 36, flexShrink: 0 }}>{a.pct}%</span>
                  {showCorrect && a.correct && <Icon name="check" size={12} color={C.success} />}
                </div>
              ))}
              <button
                onClick={() => setShowCorrect(v => !v)}
                style={{ display: "flex", alignItems: "center", gap: 5, background: showCorrect ? C.success : C.bgInput, border: "none", borderRadius: R.sm, cursor: "pointer", fontSize: 12, color: showCorrect ? "#fff" : C.text2, fontFamily: F, fontWeight: 600, padding: "6px 12px", marginTop: 8 }}
              >
                <Icon name={showCorrect ? "eyeOff" : "eye"} size={12} color={showCorrect ? "#fff" : C.text2} />
                {showCorrect ? "Hide correct answers" : "Show correct answers"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Survey Results: Page ──────────────────────────────────────────────────────

function SurveyResultsPage({ isFullScreen, onToggleFullScreen }) {
  const C = useC();
  const [selectedSurvey, setSelectedSurvey] = useState("HenryTestQuiz");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedSession, setSelectedSession] = useState("Morris — 17 Jun 2026, 18:04");

  const stats = [
    { label: "COMPLETE",    value: 2, color: C.success },
    { label: "IN PROGRESS", value: 0, color: C.warning },
    { label: "NOT STARTED", value: 0, color: C.text3 },
    { label: "REGISTERED",  value: 2, color: C.text2 },
  ];

  const completePct = 100;
  const completeCount = 2, startedCount = 0, notStartedCount = 0;

  return (
    <div style={{ padding: isFullScreen ? "20px 28px" : "20px 0 20px 0", fontFamily: F }}>
      {/* Controls row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ position: "relative", minWidth: 200 }}>
          <select value={selectedSurvey} onChange={e => setSelectedSurvey(e.target.value)} style={{ width: "100%", height: 36, padding: "0 32px 0 12px", fontSize: 13.5, fontFamily: F, color: C.text1, background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", appearance: "none", cursor: "pointer" }}>
            <option>HenryTestQuiz</option>
            <option>Another Survey</option>
          </select>
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Icon name="chevDown" size={14} color={C.text3} />
          </div>
        </div>

        {/* Full screen icon */}
        <button onClick={onToggleFullScreen} title={isFullScreen ? "Exit full screen" : "Full screen"} style={{ width: 34, height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.text2} strokeWidth="2" strokeLinecap="round">
            {isFullScreen
              ? <><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/></>
              : <><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></>
            }
          </svg>
        </button>

        {/* Refresh */}
        <button style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 12px", background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 13, color: C.text2, fontFamily: F }}>
          <Icon name="download" size={14} color={C.text2} />
          Refresh
        </button>

        {/* Auto toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Switch checked={autoRefresh} onChange={setAutoRefresh} size="sm" />
          <span style={{ fontSize: 12.5, color: C.text3 }}>Auto (15s)</span>
        </div>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexWrap: "wrap" }}>
          {stats.map(s => (
            <div key={s.label} style={{ border: `1.5px solid ${C.border}`, borderRadius: R.sm, padding: "4px 14px", textAlign: "center", background: C.bgSurface, minWidth: 72 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: FD }}>{s.value}</div>
              <div style={{ fontSize: 10, fontWeight: 650, color: C.text3, letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions */}
      <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "14px 18px", marginBottom: 14, boxShadow: C.shadow.sm }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="clock" size={13} color={C.text3} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.text3, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: F }}>Sessions</span>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: C.accent, fontFamily: F, fontWeight: 600, padding: 0 }}>
            <Icon name="plus" size={13} color={C.accent} /> New Session
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)} style={{ height: 36, padding: "0 30px 0 12px", fontSize: 13.5, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", appearance: "none", cursor: "pointer" }}>
              <option>Morris — 17 Jun 2026, 18:04</option>
              <option>Default Session</option>
            </select>
            <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="chevDown" size={13} color={C.text3} /></div>
          </div>
          <div style={{ flex: 1, height: 36, padding: "0 12px", background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 12.5, color: C.accent, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://cards.personalyz.me/surveys/personalyz/henrytestquiz/be82ad92</span>
          </div>
          <button style={{ height: 36, padding: "0 12px", background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 13, color: C.text2, fontFamily: F }}>Copy URL</button>
          <button style={{ height: 36, padding: "0 12px", display: "flex", alignItems: "center", gap: 5, background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 13, color: C.text2, fontFamily: F }}>
            <Icon name="share" size={13} color={C.text2} /> Share
          </button>
        </div>
      </div>

      {/* Live Participation */}
      <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "14px 18px", marginBottom: 14, boxShadow: C.shadow.sm }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: C.text1 }}>⚡ Live Participation</span>
            <span style={{ fontSize: 12.5, color: C.text3 }}>2 of 2 active</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: C.accent, fontFamily: FD }}>{completePct}%</span>
        </div>
        <div style={{ height: 8, background: C.bgInput, borderRadius: R.full, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${completePct}%`, background: `linear-gradient(90deg, ${C.success}, ${C.accent})`, borderRadius: R.full }} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 12, color: C.text3 }}><span style={{ width: 8, height: 8, borderRadius: R.full, background: C.success, display: "inline-block", marginRight: 5 }} />Complete {completeCount}</span>
          <span style={{ fontSize: 12, color: C.text3 }}><span style={{ width: 8, height: 8, borderRadius: R.full, background: C.accent, display: "inline-block", marginRight: 5 }} />Started {startedCount}</span>
          <span style={{ fontSize: 12, color: C.text3 }}><span style={{ width: 8, height: 8, borderRadius: R.full, background: C.warning, display: "inline-block", marginRight: 5 }} />Not started {notStartedCount}</span>
        </div>
      </div>

      {/* Participants */}
      <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, marginBottom: 14, overflow: "hidden", boxShadow: C.shadow.sm }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="users" size={13} color={C.text3} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.text3, letterSpacing: "0.07em", textTransform: "uppercase" }}>Participants</span>
            <span style={{ fontSize: 12, color: C.text3 }}>— 2 started, 2 complete</span>
          </div>
          <button onClick={() => setShowParticipants(v => !v)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: C.text2, fontFamily: F }}>
            {showParticipants ? "Hide" : "Show"} <Icon name={showParticipants ? "chevUp" : "chevDown"} size={13} color={C.text2} />
          </button>
        </div>
        {showParticipants && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
            <thead>
              <tr style={{ borderTop: `1px solid ${C.border}` }}>
                {["Name", "Email", "Answered", "Status", "Time"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "9px 18px", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: C.text3, textTransform: "uppercase", borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESULTS_PARTICIPANTS.map((p, i) => (
                <tr key={i} style={{ borderBottom: i < RESULTS_PARTICIPANTS.length - 1 ? `1px solid ${C.border}` : "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bgPage}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 18px" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text1 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.text3 }}>{p.phone}</div>
                  </td>
                  <td style={{ padding: "10px 18px", fontSize: 13, color: C.accent }}>{p.email}</td>
                  <td style={{ padding: "10px 18px", fontSize: 13, color: C.text2, textAlign: "center" }}>{p.answered}</td>
                  <td style={{ padding: "10px 18px" }}><Pill color="success">{p.status}</Pill></td>
                  <td style={{ padding: "10px 18px", fontSize: 12.5, color: C.text3, whiteSpace: "nowrap" }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Question Breakdown */}
      <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="chart" size={13} color={C.text3} />
          <span style={{ fontSize: 11, fontWeight: 700, color: C.text3, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: F }}>Question Breakdown</span>
        </div>
        <span style={{ fontSize: 12, color: C.text3 }}>9 of 9 fully answered</span>
      </div>
      {RESULTS_QUESTIONS.map((q, i) => (
        <QuestionBreakdownCard key={q.id} q={q} index={i} />
      ))}
    </div>
  );
}

// ─── Surveys Page (list + results combined, tab-switched) ─────────────────────

function SurveysPage() {
  const C = useC();
  const [view, setView] = useState("list"); // list | editor | results-fullscreen
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [activeTab, setActiveTab] = useState("surveys"); // surveys | results
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Full-screen results overlay
  if (isFullScreen) {
    return (
      <div style={{ position: "fixed", inset: 0, background: C.bgPage, zIndex: 500, overflowY: "auto", fontFamily: F }}>
        <div style={{ padding: "0 28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.border}`, marginBottom: 8 }}>
            <span style={{ fontSize: 13.5, fontWeight: 650, color: C.text1, fontFamily: FD }}>Survey Results</span>
            <button onClick={() => setIsFullScreen(false)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "5px 12px", cursor: "pointer", fontSize: 12.5, color: C.text2, fontFamily: F }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/></svg>
              Exit Full Screen
            </button>
          </div>
          <SurveyResultsPage isFullScreen={true} onToggleFullScreen={() => setIsFullScreen(false)} />
        </div>
      </div>
    );
  }

  if (view === "editor" && editingSurvey) {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <SurveyEditorPage survey={editingSurvey} onBack={() => { setView("list"); setEditingSurvey(null); }} />
      </div>
    );
  }

  // List / Results view
  return (
    <div style={{ padding: "24px 28px 32px", fontFamily: F }}>
      {/* Tab strip toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 38, width: 220, padding: "0 12px", background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm }}>
          <Icon name="search" size={14} color={C.text3} />
          <input placeholder="Search surveys..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, color: C.text1, fontFamily: F, width: "100%" }} />
        </div>
        {/* Company filter */}
        <div style={{ position: "relative" }}>
          <select style={{ height: 38, padding: "0 30px 0 12px", fontSize: 13.5, fontFamily: F, color: C.text1, background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", appearance: "none", cursor: "pointer" }}>
            <option>All Companies</option>
          </select>
          <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="chevDown" size={13} color={C.text3} /></div>
        </div>
        {/* Tabs */}
        {[{ id: "surveys", label: "Surveys", count: 1 }, { id: "results", label: "Results" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "none", border: "none", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none",
            borderBottom: `2.5px solid ${activeTab === t.id ? C.accent : "transparent"}`,
            cursor: "pointer", padding: "6px 2px 8px", fontFamily: F,
            fontSize: 14, fontWeight: activeTab === t.id ? 650 : 500,
            color: activeTab === t.id ? C.accent : C.text2,
          }}>
            {t.label}
            {t.count != null && <span style={{ marginLeft: 5, fontSize: 12, fontWeight: 650, background: activeTab === t.id ? C.accent : C.bgInput, color: activeTab === t.id ? "#fff" : C.text2, borderRadius: R.full, padding: "1px 6px" }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {activeTab === "surveys" ? (
        /* Survey list table */
        <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
            <thead>
              <tr>
                {["Survey", "Company / Unit", "Sections", "Submissions", "Created", ""].map((h, i) => (
                  <th key={i} style={{ textAlign: i >= 2 && i <= 4 ? "center" : "left", padding: "11px 20px", fontSize: 11.5, fontWeight: 650, letterSpacing: "0.04em", color: C.text3, textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, background: C.bgPage, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr onMouseEnter={e => e.currentTarget.style.background = C.bgPage} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: R.sm, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="survey" size={15} color={C.accent} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.accent, cursor: "pointer" }} onClick={() => { setEditingSurvey(SURVEY_SAMPLE); setView("editor"); }}>
                        {SURVEY_SAMPLE.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {SURVEY_SAMPLE.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 20px", fontSize: 13.5, color: C.text1 }}>{SURVEY_SAMPLE.company}</td>
                <td style={{ padding: "12px 20px", fontSize: 13.5, color: C.text1, textAlign: "center" }}>{SURVEY_SAMPLE.sections}</td>
                <td style={{ padding: "12px 20px", fontSize: 13.5, color: C.text1, textAlign: "center" }}>{SURVEY_SAMPLE.submissions}</td>
                <td style={{ padding: "12px 20px", fontSize: 13, color: C.text2, whiteSpace: "nowrap" }}>{SURVEY_SAMPLE.created}</td>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                    <button title="Edit" onClick={() => { setEditingSurvey(SURVEY_SAMPLE); setView("editor"); }} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", borderRadius: R.sm, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.bgInput} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <Icon name="edit" size={15} color={C.text2} />
                    </button>
                    <button title="Delete" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", borderRadius: R.sm, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.dangerBg} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <Icon name="trash" size={15} color={C.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.text2 }}>Showing 1–1 of 1 surveys</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button disabled style={{ width: 28, height: 28, borderRadius: R.sm, border: "none", background: "transparent", opacity: 0.35, display: "flex", alignItems: "center", justifyContent: "center", cursor: "not-allowed" }}><Icon name="chevLeft" size={14} color={C.text2} /></button>
              <button style={{ minWidth: 28, height: 28, borderRadius: R.sm, border: "none", background: C.accent, color: "#fff", fontSize: 13, fontWeight: 650, fontFamily: F, cursor: "pointer" }}>1</button>
              <button disabled style={{ width: 28, height: 28, borderRadius: R.sm, border: "none", background: "transparent", opacity: 0.35, display: "flex", alignItems: "center", justifyContent: "center", cursor: "not-allowed" }}><Icon name="chevRight" size={14} color={C.text2} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: C.text2 }}>Per page</span>
              <select style={{ height: 28, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 13, color: C.text1, padding: "0 6px", cursor: "pointer" }}>
                <option>10</option><option>25</option><option>50</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        /* Results tab */
        <SurveyResultsPage isFullScreen={false} onToggleFullScreen={() => setIsFullScreen(true)} />
      )}
    </div>
  );
}


// ─── Admin Layout ──────────────────────────────────────────────────────────────

function AdminLayout({ user, onSignOut }) {
  // AdminLayout owns darkMode and is the ThemeCtx.Provider root.
  const [activeNav, setActiveNav] = useState("surveys");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const C = darkMode ? CD : C_LIGHT;

  const navTitle  = NAV.find(n => n.id === activeNav)?.label || "Dashboard";
  const navSubtitle = activeNav === "dashboard" ? `Welcome back, ${user.firstName || "there"}` :
                      activeNav === "surveys"   ? "Surveys across all companies" : null;

  return (
    <ThemeCtx.Provider value={darkMode}>
      {/* Absolute shell */}
      <div style={{ position: "absolute", inset: 0, display: "flex", fontFamily: F }}>

        {/* Sidebar */}
        <Sidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(v => !v)}
          user={user}
          onSignOut={onSignOut}
        />

        {/* Main content column */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bgPage }}>
          <Topbar
            title={navTitle}
            subtitle={navSubtitle}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(v => !v)}
            user={user}
            actions={activeNav === "surveys" ? (
              <Btn style={{ height: 36, padding: "0 16px", fontSize: 13.5 }}>
                <Icon name="plus" size={15} color="#fff" />
                New Survey
              </Btn>
            ) : null}
          />

          <main style={{ flex: 1, overflowY: "auto", background: C.bgPage, transition: "background 0.25s", position: "relative" }}>
            {activeNav === "surveys" ? (
              <SurveysPage />
            ) : (
              <DashboardPlaceholder user={user} />
            )}
          </main>
        </div>

      </div>
    </ThemeCtx.Provider>
  );
}

// ─── Root Export ───────────────────────────────────────────────────────────────

export default function CardzApp() {
  useFontLoader();
  const [view, setView] = useState("login");

  const [user] = useState({
    firstName: "Henry",
    lastName: "Oertel",
    email: "henry@personalyz.me",
    plan: "Free",
  });

  if (view === "login") {
    return (
      <LoginPage
        onSignIn={() => setView("admin")}
        onRegister={() => setView("register")}
      />
    );
  }

  if (view === "register") {
    return (
      <RegisterPage
        onBack={() => setView("login")}
        onSignUp={() => setView("admin")}
      />
    );
  }

  return (
    <AdminLayout
      user={user}
      onSignOut={() => setView("login")}
    />
  );
}
