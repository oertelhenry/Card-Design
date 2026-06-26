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
      style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.text2, marginBottom: 6, fontFamily: F }}
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
          padding: isPassword ? "0 44px 0 14px" : "0 14px",
          fontSize: 15,
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
// ─── Microsites Feature ────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Sample Data ───────────────────────────────────────────────────────────────

const MICROSITES_DATA = [
  { id: "ms1",  name: "CFAOKenya",         subtitle: "CFAO Mobility Kenya",    company: "Seriti",               cards: 0,  created: "07 May 2026", logo: "🔴", logoBg: "#DC2626" },
  { id: "ms2",  name: "CFAOMOBILITYKENYA", subtitle: "CFAO Mobility Kenya",    company: "CFAO-Mobility-Kenya",  cards: 15, created: "07 May 2026", logo: "🔴", logoBg: "#DC2626" },
  { id: "ms3",  name: "CheryDXB",          subtitle: "CheryDXB",               company: "SeritiInternationalUAE", cards: 2, created: "23 Jun 2026", logo: null, logoBg: "#6B7280" },
  { id: "ms4",  name: "JACKenya",          subtitle: "JAC KENYA",              company: "Seriti",               cards: 3,  created: "10 Apr 2026", logo: "🚗", logoBg: "#1D4ED8" },
  { id: "ms5",  name: "JetourMauritius",   subtitle: "Jetour Mauritius",       company: "Jetour",               cards: 6,  created: "27 Oct 2025", logo: "⬛", logoBg: "#111827" },
  { id: "ms6",  name: "lot",               subtitle: "Jetour",                 company: "Jetour",               cards: 1,  created: "15 Oct 2025", logo: "J",  logoBg: "#374151" },
  { id: "ms7",  name: "MarketDemandFruits",subtitle: "Market Demand Fruits",   company: "Seriti",               cards: 3,  created: "19 Jan 2026", logo: "🍊", logoBg: "#EA580C" },
  { id: "ms8",  name: "MercedesMauritius", subtitle: "Mercedes Benz Mauritius",company: "CFAOMauritius",        cards: 3,  created: "08 Apr 2026", logo: "⭕", logoBg: "#9CA3AF" },
  { id: "ms9",  name: "NalediMotors",      subtitle: "NALEDI MOTORS",          company: "Seriti",               cards: 4,  created: "28 Oct 2025", logo: "⬛", logoBg: "#1F2937" },
  { id: "ms10", name: "RedstoneMotors",    subtitle: "NZ Test site",           company: "Seriti",               cards: 1,  created: "29 Jan 2026", logo: "🟢", logoBg: "#15803D" },
  { id: "ms11", name: "RedStoneMotors2",   subtitle: "RedStone Motors Ltd",    company: "Seriti",               cards: 2,  created: "14 Feb 2026", logo: "⬛", logoBg: "#374151" },
  { id: "ms12", name: "showroom",          subtitle: "McCarthy Toyota",        company: "Personalyz",           cards: 5,  created: "22 Mar 2026", logo: "⭕", logoBg: "#9CA3AF" },
  { id: "ms13", name: "testMicrosite",     subtitle: "asdf",                   company: "Seriti",               cards: 0,  created: "01 Feb 2026", logo: "🟢", logoBg: "#15803D" },
  { id: "ms14", name: "ToyotaMauritius",   subtitle: "Toyota Mauritius",       company: "ToyotaMauritius",      cards: 15, created: "12 Sep 2025", logo: "T",  logoBg: "#DC2626",
    vehicles: ["bZ4X","CorollaCrossHybrid","CorollaCrossHybridAero","CorollaHybrid","CrownHybrid","FortunerVActive","Hiace","Hiace14Deluxe","HiluxDoubleCab","LandCruiser300","Prado","ProACE","RAV4","Yaris","YarisAero"],
  },
];

// ─── Microsite Logo / Avatar ────────────────────────────────────────────────────

function MicrositeLogo({ ms, size = 36 }) {
  const C = useC();
  if (ms.imageUrl) {
    return (
      <div style={{ width: size, height: size, borderRadius: R.sm, overflow: "hidden", flexShrink: 0, border: `1px solid ${C.border}` }}>
        <img src={ms.imageUrl} alt={ms.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: R.sm, flexShrink: 0,
      background: ms.logoBg || C.bgInput,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.42, color: "#fff", fontWeight: 700, fontFamily: FD,
      border: `1px solid rgba(0,0,0,0.08)`,
    }}>
      {typeof ms.logo === "string" && ms.logo.length <= 2 ? ms.logo : ""}
    </div>
  );
}

// ─── Cards count badge ──────────────────────────────────────────────────────────

function CardsBadge({ count }) {
  const C = useC();
  const color = count === 0 ? C.text3 : count >= 10 ? C.accent : C.success;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 24, height: 24, borderRadius: R.full, padding: "0 6px",
      fontSize: 12.5, fontWeight: 700, fontFamily: F,
      background: count === 0 ? C.bgInput : count >= 10 ? C.accentLight : "rgba(47,165,99,0.10)",
      color,
    }}>
      {count}
    </span>
  );
}

// ─── Edit Microsite Drawer ──────────────────────────────────────────────────────

function EditMicrositeDrawer({ ms, onClose, onSave, onDelete }) {
  const C = useC();
  const [form, setForm] = useState({
    name: ms.name,
    description: ms.subtitle,
    details: "",
  });
  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }));

  const vehicles = ms.vehicles || [];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 200 }}
      />

      {/* Drawer panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 380, background: C.bgSurface,
        boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
        zIndex: 201, display: "flex", flexDirection: "column",
        fontFamily: F,
      }}>
        {/* Drawer header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 650, color: C.text1, fontFamily: FD }}>Edit Microsite</div>
              <div style={{ fontSize: 12, color: C.accent, marginTop: 2 }}>Editing: {ms.name}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 5, height: 32, padding: "0 12px", background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 12.5, color: C.text2, fontFamily: F }}>
                <Icon name="eye" size={13} color={C.text2} /> Preview
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 5, height: 32, padding: "0 12px", background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 12.5, color: C.text2, fontFamily: F }}>
                <Icon name="share" size={13} color={C.text2} /> Share
              </button>
              <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: R.sm, border: `1px solid ${C.border}`, background: C.bgInput, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="x" size={14} color={C.text2} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>

          {/* Microsite Image */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.text2, marginBottom: 8, fontFamily: F }}>Microsite Image</label>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              {/* Logo preview with border */}
              <div style={{
                width: 72, height: 72, borderRadius: R.md, flexShrink: 0,
                border: `1.5px solid ${C.border}`, overflow: "hidden",
                background: C.bgSurface,
              }}>
                <MicrositeLogo ms={ms} size={72} />
              </div>
              {/* Actions + hint stacked */}
              <div style={{ paddingTop: 2 }}>
                {/* Change + Remove on one row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 5, height: 30, padding: "0 12px", background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 12.5, color: C.text2, fontFamily: F, fontWeight: 500 }}>
                    <Icon name="image" size={13} color={C.text2} /> Change
                  </button>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: C.text2, fontFamily: F, padding: 0, fontWeight: 500 }}>
                    Remove
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: 11.5, color: C.text3 }}>PNG, JPG or GIF. Recommended 200×200px.</p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.text2, marginBottom: 6, fontFamily: F }}>
              Name <span style={{ color: C.danger }}>*</span>
            </label>
            <input
              value={form.name}
              onChange={set("name")}
              style={{ width: "100%", height: 42, padding: "0 12px", fontSize: 14, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }}
            />
            <p style={{ margin: "5px 0 0", fontSize: 11.5, color: C.text3 }}>Unique identifier for this microsite</p>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.text2, marginBottom: 6, fontFamily: F }}>
              Description <span style={{ color: C.danger }}>*</span>
            </label>
            <input
              value={form.description}
              onChange={set("description")}
              style={{ width: "100%", height: 42, padding: "0 12px", fontSize: 14, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }}
            />
            <p style={{ margin: "5px 0 0", fontSize: 11.5, color: C.text3 }}>The display name for this microsite</p>
          </div>

          {/* Details */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.text2, marginBottom: 6, fontFamily: F }}>Details</label>
            <input
              value={form.details}
              onChange={set("details")}
              placeholder="e.g. Vehicle List"
              style={{ width: "100%", height: 42, padding: "0 12px", fontSize: 14, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", boxSizing: "border-box" }}
            />
            <p style={{ margin: "5px 0 0", fontSize: 11.5, color: C.text3 }}>Short description of what this microsite contains</p>
          </div>

          {/* Vehicles list */}
          {vehicles.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="carFront" size={13} color={C.text3} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: C.text3, textTransform: "uppercase", fontFamily: F }}>Vehicles</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>{vehicles.length}</span>
              </div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: R.md, overflow: "hidden" }}>
                {vehicles.map((v, i) => (
                  <div
                    key={v}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 14px",
                      borderBottom: i < vehicles.length - 1 ? `1px solid ${C.border}` : "none",
                      background: i % 2 === 0 ? "transparent" : C.bgPage,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : C.bgPage}
                  >
                    <div style={{ width: 28, height: 20, background: C.bgInput, borderRadius: R.xs, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="carFront" size={13} color={C.text3} />
                    </div>
                    <span style={{ fontSize: 13.5, color: C.text1, fontWeight: 450 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer footer */}
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: C.bgPage }}>
          <button
            onClick={onDelete}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.danger, fontFamily: F, fontWeight: 550, padding: "4px 0" }}
          >
            <Icon name="trash" size={14} color={C.danger} /> Delete
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClose}
              style={{ height: 36, padding: "0 16px", background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, cursor: "pointer", fontSize: 13, color: C.text2, fontFamily: F, fontWeight: 550 }}
            >
              Cancel
            </button>
            <button
              onClick={() => { onSave(form); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 6, height: 36, padding: "0 16px", background: C.accent, border: "none", borderRadius: R.sm, cursor: "pointer", fontSize: 13, color: "#fff", fontFamily: F, fontWeight: 600 }}
            >
              <Icon name="check" size={14} color="#fff" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Microsites Page ────────────────────────────────────────────────────────────

function MicrositesPage() {
  const C = useC();
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [editingMs, setEditingMs] = useState(null);
  const [microsites, setMicrosites] = useState(MICROSITES_DATA);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = microsites.filter(ms =>
    ms.name.toLowerCase().includes(search.toLowerCase()) ||
    ms.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    ms.company.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSave = (form) => {
    setMicrosites(prev => prev.map(ms =>
      ms.id === editingMs.id ? { ...ms, name: form.name, subtitle: form.description } : ms
    ));
  };

  const handleDelete = () => {
    setMicrosites(prev => prev.filter(ms => ms.id !== editingMs.id));
    setEditingMs(null);
  };

  return (
    <>
      <div style={{ padding: "24px 28px 32px", fontFamily: F }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            height: 38, width: 220, padding: "0 12px",
            background: searchFocused ? C.bgInputFocus : C.bgInput,
            border: `1.5px solid ${searchFocused ? C.borderFocus : C.border}`,
            borderRadius: R.sm,
            boxShadow: searchFocused ? "0 0 0 3px rgba(79,70,229,0.14)" : "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}>
            <Icon name="search" size={14} color={C.text3} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search microsites..."
              style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, color: C.text1, fontFamily: F, width: "100%" }}
            />
          </div>

          {/* Vehicle tab pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: 4 }}>
            <button style={{
              background: "none", border: "none", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none",
              borderBottom: `2.5px solid ${C.accent}`,
              cursor: "pointer", padding: "6px 2px 8px", fontFamily: F,
              fontSize: 14, fontWeight: 650, color: C.accent,
            }}>
              Vehicle{" "}
              <span style={{ marginLeft: 5, fontSize: 12, fontWeight: 650, background: C.accent, color: "#fff", borderRadius: R.full, padding: "1px 7px" }}>{microsites.length}</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
            <thead>
              <tr>
                {["Microsite", "Company", "Cards", "Created"].map((h, i) => (
                  <th key={h} style={{
                    textAlign: i >= 2 ? "center" : "left",
                    padding: "11px 20px", fontSize: 11.5, fontWeight: 650,
                    letterSpacing: "0.04em", color: C.text3, textTransform: "uppercase",
                    borderBottom: `1px solid ${C.border}`, background: C.bgPage, whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((ms, idx) => (
                <tr
                  key={ms.id}
                  style={{ borderBottom: idx < pageItems.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}
                  onClick={() => setEditingMs(ms)}
                  onMouseEnter={e => e.currentTarget.style.background = C.bgPage}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Microsite name + logo */}
                  <td style={{ padding: "10px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <MicrositeLogo ms={ms} size={36} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.accent }}>{ms.name}</div>
                        <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1 }}>{ms.subtitle}</div>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td style={{ padding: "10px 20px" }}>
                    <span style={{
                      fontSize: 13.5, color: ms.company === "Jetour" || ms.company === "ToyotaMauritius" || ms.company === "CFAO-Mobility-Kenya" ? C.accent : C.text1,
                      fontWeight: 450,
                    }}>
                      {ms.company}
                    </span>
                  </td>

                  {/* Cards count */}
                  <td style={{ padding: "10px 20px", textAlign: "center" }}>
                    <CardsBadge count={ms.cards} />
                  </td>

                  {/* Created */}
                  <td style={{ padding: "10px 20px", fontSize: 13, color: C.text2, whiteSpace: "nowrap", textAlign: "center" }}>
                    {ms.created}
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "48px 20px", textAlign: "center", fontSize: 14, color: C.text3 }}>
                    No microsites match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.text2 }}>
              Showing {filtered.length === 0 ? "0" : `${(page - 1) * perPage + 1}–${Math.min(page * perPage, filtered.length)}`} of {filtered.length} microsites
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                style={{ width: 28, height: 28, borderRadius: R.sm, border: "none", background: "transparent", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.35 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon name="chevLeft" size={14} color={C.text2} />
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{ minWidth: 28, height: 28, borderRadius: R.sm, border: "none", background: p === page ? C.accent : "transparent", color: p === page ? "#fff" : C.text2, fontSize: 13, fontWeight: p === page ? 650 : 500, fontFamily: F, cursor: "pointer" }}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page >= pageCount}
                onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                style={{ width: 28, height: 28, borderRadius: R.sm, border: "none", background: "transparent", cursor: page >= pageCount ? "not-allowed" : "pointer", opacity: page >= pageCount ? 0.35 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon name="chevRight" size={14} color={C.text2} />
              </button>
            </div>
            <div style={{ fontSize: 13, color: C.text2 }}>Per page <strong style={{ color: C.text1 }}>10</strong></div>
          </div>
        </div>
      </div>

      {/* Edit drawer */}
      {editingMs && (
        <EditMicrositeDrawer
          ms={editingMs}
          onClose={() => setEditingMs(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}


// ─── Admin Layout ──────────────────────────────────────────────────────────────

function AdminLayout({ user, onSignOut }) {
  // AdminLayout owns darkMode and is the ThemeCtx.Provider root.
  const [activeNav, setActiveNav] = useState("microsites");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const C = darkMode ? CD : C_LIGHT;

  const navTitle = NAV.find(n => n.id === activeNav)?.label || "Dashboard";
  const navSubtitle = activeNav === "dashboard" ? `Welcome back, ${user.firstName || "there"}` :
                      activeNav === "microsites" ? "Vehicle lots and card collections" : null;

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
            actions={activeNav === "microsites" ? (
              <Btn style={{ height: 36, padding: "0 16px", fontSize: 13.5 }}>
                <Icon name="plus" size={15} color="#fff" />
                New Microsite
              </Btn>
            ) : null}
          />

          <main style={{ flex: 1, overflowY: "auto", background: C.bgPage, transition: "background 0.25s", position: "relative" }}>
            {activeNav === "microsites" ? (
              <MicrositesPage />
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
