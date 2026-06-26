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

function UserDropdown({ user, onClose, onSignOut, collapsed, onNavigate }) {
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
    { id: "settings", label: "Settings", icon: "settings" },
    { id: "subscription", label: "Subscription", icon: "creditCard" },
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
        <DropdownItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          onClick={() => { onNavigate?.(item.id); onClose(); }}
        />
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

// ─── Topbar User Dropdown (light/dark-adaptive, top-right) ─────────────────────

function TopDropdownItem({ icon, label, danger = false, onClick }) {
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
        background: hovered ? (danger ? C.dangerBg : C.bgInput) : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: F,
        transition: "background 0.12s",
      }}
    >
      <Icon name={icon} size={15} color={danger ? C.danger : C.text2} style={{ transition: "color 0.12s" }} />
      <span style={{ fontSize: 13.5, fontWeight: 450, color: danger ? C.danger : C.text1, letterSpacing: "-0.005em" }}>
        {label}
      </span>
    </button>
  );
}

function TopUserDropdown({ user, onClose, onNavigate, onSignOut }) {
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
    { id: "settings", label: "Settings", icon: "settings" },
    { id: "subscription", label: "Subscription", icon: "creditCard" },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: 224,
        background: C.bgSurface,
        border: `1px solid ${C.border}`,
        borderRadius: R.md,
        boxShadow: C.shadow.dropdown,
        overflow: "hidden",
        zIndex: 200,
        fontFamily: F,
      }}
    >
      {/* Name + email header */}
      <div style={{ padding: "12px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 13.5, fontWeight: 650, color: C.text1, letterSpacing: "-0.01em" }}>
          {user.firstName} {user.lastName}
        </div>
        <div style={{ fontSize: 12, color: C.text3, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.email}
        </div>
      </div>

      {/* Menu items */}
      {menuItems.map((item) => (
        <TopDropdownItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          onClick={() => { onNavigate?.(item.id); onClose(); }}
        />
      ))}

      {/* Divider */}
      <div style={{ height: 1, background: C.border, margin: "4px 0" }} />

      {/* Logout */}
      <TopDropdownItem icon="logout" label="Log out" danger onClick={onSignOut} />

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
            onNavigate={(id) => { onNavChange(id); }}
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

function Topbar({ title, subtitle, darkMode, onToggleDark, user, actions, onBack, onNavigate, onSignOut }) {
  const C = useC();
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") || "?";
  const [avatarHover, setAvatarHover] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            outline: "none",
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
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setDropdownOpen(v => !v)}
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
              boxShadow: avatarHover || dropdownOpen ? "0 0 0 3px rgba(79,70,229,0.20)" : "none",
              transition: "box-shadow 0.15s",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          {dropdownOpen && (
            <TopUserDropdown
              user={user}
              onClose={() => setDropdownOpen(false)}
              onNavigate={onNavigate}
              onSignOut={onSignOut}
            />
          )}
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

// ─── Settings: Switch toggle ────────────────────────────────────────────────────

function Switch({ checked, onChange }) {
  const C = useC();
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      style={{
        width: 38, height: 22, borderRadius: R.full, border: "none", padding: 2,
        background: checked ? C.accent : C.border, cursor: "pointer", position: "relative",
        flexShrink: 0, transition: "background 0.15s", display: "flex", alignItems: "center",
      }}
    >
      <span
        style={{
          width: 18, height: 18, borderRadius: R.full, background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transform: checked ? "translateX(16px)" : "translateX(0)",
          transition: "transform 0.15s",
        }}
      />
    </button>
  );
}

function SettingsLabel({ children }) {
  const C = useC();
  return (
    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: C.text2, marginBottom: 4, fontFamily: F }}>
      {children}
    </label>
  );
}

function SettingsCard({ icon, title, subtitle, children, footer }) {
  const C = useC();
  return (
    <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: `1px solid ${C.border}`, background: C.bgPage }}>
        <div style={{ width: 22, height: 22, borderRadius: R.full, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name={icon} size={13} color={C.accent} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 650, color: C.text1, fontFamily: FD, lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: C.text3, marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        {children}
      </div>
      {footer && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "12px 20px", borderTop: `1px solid ${C.border}`, background: C.bgPage }}>
          {footer}
        </div>
      )}
    </div>
  );
}

// ─── Settings Page ──────────────────────────────────────────────────────────────

function SettingsPage({ user }) {
  const C = useC();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    enabled: true,
  });
  const [pw, setPw] = useState({ newPassword: "", confirmPassword: "" });
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedPw, setSavedPw] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const fieldStyle = { height: 32, fontSize: 13, padding: "0 11px" };

  const handleSaveProfile = () => {
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2000);
  };

  const handleSavePassword = () => {
    setSavedPw(true);
    setPw({ newPassword: "", confirmPassword: "" });
    setTimeout(() => setSavedPw(false), 2000);
  };

  return (
    <div style={{ padding: "24px 28px", maxWidth: 680, fontFamily: F }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Profile Details */}
        <SettingsCard
          icon="user"
          title="Profile Details"
          subtitle="Update your name, email address, and account status"
          footer={
            <>
              <Btn variant="ghost" style={{ height: 34, padding: "0 16px", fontSize: 13 }}>
                Cancel
              </Btn>
              <Btn onClick={handleSaveProfile} style={{ height: 34, padding: "0 18px", fontSize: 13 }}>
                {savedProfile ? <><Icon name="check" size={14} color="#fff" /> Saved</> : "Save"}
              </Btn>
            </>
          }
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div>
              <SettingsLabel>First name</SettingsLabel>
              <Input value={form.firstName} onChange={set("firstName")} style={fieldStyle} />
            </div>
            <div>
              <SettingsLabel>Last name</SettingsLabel>
              <Input value={form.lastName} onChange={set("lastName")} style={fieldStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <SettingsLabel>
              Email address <span style={{ color: C.danger }}>*</span>
            </SettingsLabel>
            <Input type="email" value={form.email} onChange={set("email")} style={fieldStyle} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: C.bgPage, borderRadius: R.sm }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 550, color: C.text1 }}>Account enabled</div>
              <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1 }}>Disabling sign-in revokes access without deleting the account</div>
            </div>
            <Switch checked={form.enabled} onChange={(v) => setForm(f => ({ ...f, enabled: v }))} />
          </div>
        </SettingsCard>

        {/* Change Password */}
        <SettingsCard
          icon="lock"
          title="Change Password"
          footer={
            <Btn
              onClick={handleSavePassword}
              disabled={!pw.newPassword || pw.newPassword !== pw.confirmPassword}
              style={{ height: 34, padding: "0 18px", fontSize: 13 }}
            >
              {savedPw ? <><Icon name="check" size={14} color="#fff" /> Updated</> : "Update Password"}
            </Btn>
          }
        >
          <p style={{ margin: "0 0 12px", fontSize: 12.5, color: C.text3, fontStyle: "italic" }}>
            Leave blank to keep the current password.
          </p>
          <div style={{ marginBottom: 10 }}>
            <SettingsLabel>New password</SettingsLabel>
            <Input
              type="password"
              value={pw.newPassword}
              onChange={(e) => setPw(p => ({ ...p, newPassword: e.target.value }))}
              autoComplete="new-password"
              style={fieldStyle}
            />
          </div>
          <div>
            <SettingsLabel>Confirm password</SettingsLabel>
            <Input
              type="password"
              value={pw.confirmPassword}
              onChange={(e) => setPw(p => ({ ...p, confirmPassword: e.target.value }))}
              autoComplete="new-password"
              style={fieldStyle}
            />
            {pw.confirmPassword && pw.newPassword !== pw.confirmPassword && (
              <p style={{ margin: "5px 0 0", fontSize: 11.5, color: C.danger }}>Passwords do not match.</p>
            )}
          </div>
        </SettingsCard>

      </div>
    </div>
  );
}

// ─── Notifications: Mock Data ───────────────────────────────────────────────────

const NOTIF_CARDS = [
  { id: "c1",  name: "jetour003",             company: "Jetour",  orgUnit: "JetourBW",  type: "businesscard", subscribers: 16, lastUsed: null },
  { id: "c2",  name: "CustomWalksPAARLGIM",   company: "Seriti",  orgUnit: "50efe594",  type: "businesscard", subscribers: 10, lastUsed: null },
  { id: "c3",  name: "KshiteejSeedhoneea",    company: "Jetour",  orgUnit: "e3fffb08",  type: "businesscard", subscribers: 6,  lastUsed: null },
  { id: "c4",  name: "YolandaRossouw",        company: "Jetour",  orgUnit: "e3fffb08",  type: "businesscard", subscribers: 5,  lastUsed: null },
  { id: "c5",  name: "AldoOppel",             company: "Seriti",  orgUnit: "50efe594",  type: "businesscard", subscribers: 5,  lastUsed: "2026/02/02 14:53" },
  { id: "c6",  name: "X70PlusDelux",          company: "Jetour",  orgUnit: null,        type: "vehiclecard",  subscribers: 5,  lastUsed: null },
  { id: "c7",  name: "T1EDGE",                company: "Jetour",  orgUnit: null,        type: "vehiclecard",  subscribers: 4,  lastUsed: null },
  { id: "c8",  name: "AashiqHemraz",          company: "Jetour",  orgUnit: "e3fffb08",  type: "businesscard", subscribers: 4,  lastUsed: null },
  { id: "c9",  name: "DashingDelux",          company: "Jetour",  orgUnit: null,        type: "vehiclecard",  subscribers: 4,  lastUsed: null },
  { id: "c10", name: "jetour004",             company: "Jetour",  orgUnit: "JetourBW",  type: "businesscard", subscribers: 4,  lastUsed: null },
  { id: "c11", name: "batman",                company: "Personalyz", orgUnit: null,     type: "businesscard", subscribers: 2,  lastUsed: null },
  { id: "c12", name: "henry",                 company: "Personalyz", orgUnit: null,     type: "businesscard", subscribers: 1,  lastUsed: null },
];

const NOTIF_HISTORY = [
  { id: "h1",  card: "jetour001",       title: "Proud sponsors of 2026 SABF Botswana Re Mmogo Rally", url: "https://cards.personalyz.me/JetourBW/jetour001",        body: "Our Jetour T2 was the star of the show, book your test drive and experience 2026 SA CAR OF THE YEAR Watch the video of this fabulous vehicle", sent: 3, failed: 0, sentAt: "2026/06/18 11:28" },
  { id: "h2",  card: "batman",          title: "this is henry test",                                    url: "https://www.nedbank.co.za",                              body: "this is henry test",  sent: 2, failed: 1, sentAt: "2026/05/21 12:40" },
  { id: "h3",  card: "batman",          title: "test",                                                  url: "https://www.nedbank.co.za",                              body: "test",                 sent: 2, failed: 1, sentAt: "2026/05/19 15:39" },
  { id: "h4",  card: "batman",          title: "New Products",                                          url: "ghttps://www",                                            body: "New Products",         sent: 2, failed: 1, sentAt: "2026/05/19 15:39" },
  { id: "h5",  card: "batman",          title: "test",                                                  url: "https://cards.personalyz.me/ToyotaKeny...",             body: "test",                 sent: 2, failed: 1, sentAt: "2026/04/12 18:25" },
  { id: "h6",  card: "batman",          title: "test",                                                  url: "https://cards.personalyz.me/ToyotaKeny...",             body: "test",                 sent: 2, failed: 1, sentAt: "2026/04/10 22:39" },
  { id: "h7",  card: "henry",           title: "Henry Test",                                            url: "https://cards.personalyz.me/Personalyz/...",            body: "Henry Test",           sent: 1, failed: 0, sentAt: "2026/03/13 15:32" },
  { id: "h8",  card: "aldotest",        title: "asdf",                                                  url: "https://cards.personalyz.me/Seriti/aldotest",           body: "asdf",                 sent: 1, failed: 0, sentAt: "2026/03/13 09:51" },
  { id: "h9",  card: "Unknown",         title: "asdf",                                                  url: "https://cards.personalyz.me/site/Person...",            body: "asdf",                 sent: 2, failed: 0, sentAt: "2026/03/13 09:50" },
  { id: "h10", card: "NovaRenevations", title: "asdf",                                                  url: "https://cards.personalyz.me/Seriti/Nova...",            body: "asdf",                 sent: 3, failed: 0, sentAt: "2026/03/13 09:50" },
];

const NOTIF_TYPE_STYLES = {
  businesscard: { bg: "rgba(79,70,229,0.08)", color: "#4F46E5", plain: false },
  vehiclecard:  { bg: "transparent",          color: null,      plain: true  },
};

// ─── Notifications: small shared bits ───────────────────────────────────────────

function NotifSelect({ value, options, onChange, style = {} }) {
  const C = useC();
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          height: 32, padding: "0 30px 0 12px", fontSize: 13, fontFamily: F, color: C.text1,
          background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm,
          outline: "none", appearance: "none", cursor: "pointer", ...style,
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon name="chevDown" size={14} color={C.text3} />
      </div>
    </div>
  );
}

function NotifSearchInput({ value, onChange, placeholder }) {
  const C = useC();
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 8, height: 32, padding: "0 12px",
        background: focused ? C.bgInputFocus : C.bgInput,
        border: `1.5px solid ${focused ? C.borderFocus : C.border}`, borderRadius: R.sm,
        transition: "background 0.15s, border-color 0.15s", minWidth: 220,
      }}
    >
      <Icon name="search" size={14} color={C.text3} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text1, fontFamily: F, width: "100%" }}
      />
    </div>
  );
}

function NotifCheckbox({ checked, indeterminate, onChange }) {
  const C = useC();
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 17, height: 17, borderRadius: 4, flexShrink: 0, cursor: "pointer",
        border: `1.5px solid ${checked || indeterminate ? C.accent : C.border}`,
        background: checked || indeterminate ? C.accent : C.bgSurface,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
      }}
    >
      {indeterminate && !checked && <div style={{ width: 8, height: 2, background: "#fff", borderRadius: 1 }} />}
      {checked && <Icon name="check" size={11} color="#fff" />}
    </button>
  );
}

function TabButton({ active, label, icon, count, onClick }) {
  const C = useC();
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 7, height: 34, padding: "0 16px",
        borderRadius: R.sm, cursor: "pointer", fontFamily: F, fontSize: 13.5, fontWeight: 600,
        background: active ? C.accent : C.bgSurface,
        border: `1.5px solid ${active ? C.accent : C.border}`,
        color: active ? "#fff" : C.text2,
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
      }}
    >
      <Icon name={icon} size={14} color={active ? "#fff" : C.text3} />
      {label}
      {count != null && (
        <span
          style={{
            fontSize: 11, fontWeight: 700, padding: "1px 6px", borderRadius: R.full,
            background: active ? "rgba(255,255,255,0.22)" : C.bgInput,
            color: active ? "#fff" : C.text3,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function NotifPagination({ page, setPage, rows, setRows, total }) {
  const C = useC();
  const pageCount = Math.max(1, Math.ceil(total / rows));
  const from = total === 0 ? 0 : (page - 1) * rows + 1;
  const to = Math.min(total, page * rows);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 4px 4px" }}>
      <span style={{ fontSize: 13, color: C.text3 }}>{from}–{to} of {total}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, color: C.text3 }}>Rows:</span>
        <NotifSelect
          value={String(rows)}
          onChange={(v) => { setRows(Number(v)); setPage(1); }}
          options={[10, 25, 50].map(n => ({ value: String(n), label: String(n) }))}
          style={{ height: 30 }}
        />
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ width: 30, height: 30, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, cursor: page === 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: page === 1 ? 0.4 : 1 }}
        >
          <Icon name="chevLeft" size={15} color={C.text2} />
        </button>
        <span style={{ width: 30, height: 30, borderRadius: R.sm, background: C.accent, color: "#fff", fontSize: 13, fontWeight: 650, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {page}
        </span>
        <button
          onClick={() => setPage(p => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          style={{ width: 30, height: 30, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, cursor: page === pageCount ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: page === pageCount ? 0.4 : 1 }}
        >
          <Icon name="chevRight" size={15} color={C.text2} />
        </button>
      </div>
    </div>
  );
}

// ─── Notifications: Modal shell ─────────────────────────────────────────────────

function NotifModal({ onClose, maxWidth = 480, children }) {
  const C = useC();
  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(15,15,22,0.45)", zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth, maxHeight: "88vh", overflowY: "auto",
          background: C.bgSurface, borderRadius: R.lg, boxShadow: C.shadow.form, fontFamily: F,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Notifications: Send modal ──────────────────────────────────────────────────

function SendNotificationModal({ selectedCards, onClose, onSend }) {
  const C = useC();
  const [title, setTitle] = useState("");
  const [routeToCard, setRouteToCard] = useState(true);
  const [message, setMessage] = useState("");

  return (
    <NotifModal onClose={onClose} maxWidth={480}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px 20px 0" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Send Push Notification</h2>
          <span
            style={{
              display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 600, color: C.accent,
              background: C.accentLight, borderRadius: R.full, padding: "3px 10px",
            }}
          >
            {selectedCards.length} card{selectedCards.length === 1 ? "" : "s"} selected
          </span>
        </div>
        <button
          onClick={onClose}
          style={{ width: 26, height: 26, borderRadius: R.sm, border: "none", background: C.bgInput, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >
          <Icon name="x" size={14} color={C.text2} />
        </button>
      </div>

      <div style={{ padding: "18px 20px" }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: C.text2, marginBottom: 4, fontFamily: F }}>
            Title <span style={{ color: C.danger }}>*</span>
          </label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title" style={{ height: 32, fontSize: 13, padding: "0 11px" }} />
        </div>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 14,
            background: C.accentLight, border: `1.5px solid rgba(79,70,229,0.18)`, borderRadius: R.sm,
          }}
        >
          <div style={{ width: 30, height: 30, borderRadius: R.sm, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="grid" size={14} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>Route to Card</div>
            <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1 }}>Tapping the notification opens the card directly</div>
          </div>
          <Switch checked={routeToCard} onChange={setRouteToCard} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: C.text2, marginBottom: 4, fontFamily: F }}>
            Message <span style={{ color: C.text3, fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Notification message body…"
            rows={4}
            style={{
              width: "100%", padding: "9px 11px", fontSize: 13, fontFamily: F, color: C.text1,
              background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm,
              outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, padding: "12px 20px", borderTop: `1px solid ${C.border}` }}>
        <Btn variant="ghost" onClick={onClose} style={{ height: 34, padding: "0 16px", fontSize: 13 }}>Cancel</Btn>
        <Btn
          disabled={!title.trim()}
          onClick={() => onSend({ title, routeToCard, message })}
          style={{ height: 34, padding: "0 16px", fontSize: 13 }}
        >
          <Icon name="bell" size={13} color="#fff" /> Send to {selectedCards.length} Card{selectedCards.length === 1 ? "" : "s"}
        </Btn>
      </div>
    </NotifModal>
  );
}

// ─── Notifications: History detail modal ────────────────────────────────────────

function HistoryDetailModal({ item, onClose }) {
  const C = useC();
  return (
    <NotifModal onClose={onClose} maxWidth={520}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "18px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ width: 32, height: 32, borderRadius: R.full, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="bell" size={15} color={C.accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 650, color: C.text1, fontFamily: FD, lineHeight: 1.3 }}>{item.title}</div>
          <div style={{ fontSize: 12, color: C.text3, marginTop: 2 }}>{item.sentAt}</div>
        </div>
        <button
          onClick={onClose}
          style={{ width: 26, height: 26, borderRadius: R.sm, border: "none", background: C.bgInput, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >
          <Icon name="x" size={14} color={C.text2} />
        </button>
      </div>

      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div style={{ background: C.bgPage, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "10px 12px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase", marginBottom: 6 }}>Card</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{item.card}</div>
          </div>
          <div style={{ background: C.bgPage, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "10px 12px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase", marginBottom: 6 }}>Body</div>
            <div style={{ fontSize: 13, color: C.text1, lineHeight: 1.45 }}>{item.body}</div>
          </div>
        </div>

        <div style={{ background: C.bgPage, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "10px 12px", marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase", marginBottom: 6 }}>URL</div>
          <div style={{ fontSize: 13, color: C.accent, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.url}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div style={{ background: "rgba(47,165,99,0.08)", borderRadius: R.sm, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.success }}>{item.sent}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.success, marginTop: 2 }}>Devices Sent</div>
          </div>
          <div style={{ background: C.dangerBg, borderRadius: R.sm, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.danger }}>{item.failed}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.danger, marginTop: 2 }}>Devices Failed</div>
          </div>
          <div style={{ background: C.accentLight, borderRadius: R.sm, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.accent }}>{item.sent + item.failed}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.accent, marginTop: 2 }}>Total Devices</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 20px", borderTop: `1px solid ${C.border}` }}>
        <Btn variant="ghost" onClick={onClose} style={{ height: 34, padding: "0 18px", fontSize: 13 }}>Close</Btn>
      </div>
    </NotifModal>
  );
}

// ─── Notifications: Send tab ────────────────────────────────────────────────────

function SendTab() {
  const C = useC();
  const [company, setCompany] = useState("all");
  const [orgUnit, setOrgUnit] = useState("all");
  const [cardType, setCardType] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [showSendModal, setShowSendModal] = useState(false);

  const filtered = NOTIF_CARDS.filter(c =>
    (cardType === "all" || c.type === cardType) &&
    (company === "all" || c.company === company) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const pageItems = filtered.slice((page - 1) * rows, page * rows);

  const allOnPageSelected = pageItems.length > 0 && pageItems.every(c => selected.has(c.id));
  const someOnPageSelected = pageItems.some(c => selected.has(c.id));

  const toggleOne = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleAllOnPage = (checked) => {
    setSelected(prev => {
      const next = new Set(prev);
      pageItems.forEach(c => checked ? next.add(c.id) : next.delete(c.id));
      return next;
    });
  };

  const selectedCards = NOTIF_CARDS.filter(c => selected.has(c.id));
  const totalSubscribers = selectedCards.reduce((sum, c) => sum + c.subscribers, 0);

  const companies = ["all", ...Array.from(new Set(NOTIF_CARDS.map(c => c.company)))];

  return (
    <>
      {/* Filters row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <NotifSelect
          value={company}
          onChange={setCompany}
          options={[{ value: "all", label: "All Companies" }, ...companies.filter(c => c !== "all").map(c => ({ value: c, label: c }))]}
        />
        <NotifSelect value={orgUnit} onChange={setOrgUnit} options={[{ value: "all", label: "All Org Units" }]} />
        <NotifSelect
          value={cardType}
          onChange={setCardType}
          options={[{ value: "all", label: "All Card Types" }, { value: "businesscard", label: "Business Card" }, { value: "vehiclecard", label: "Vehicle Card" }]}
        />
        <NotifSearchInput value={search} onChange={setSearch} placeholder="Search by name…" />
        <div style={{ flex: 1 }} />
        <Btn
          disabled={selected.size === 0}
          onClick={() => setShowSendModal(true)}
          style={{ height: 32, padding: "0 16px", fontSize: 13 }}
        >
          <Icon name="bell" size={13} color="#fff" /> Send ({selected.size})
        </Btn>
      </div>

      {/* Selection banner */}
      {selected.size > 0 && (
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", marginBottom: 8,
            background: C.accentLight, border: `1px solid rgba(79,70,229,0.18)`, borderRadius: R.sm,
          }}
        >
          <Icon name="check" size={13} color={C.accent} />
          <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>
            {selected.size} card{selected.size === 1 ? "" : "s"} selected
          </span>
          <span style={{ fontSize: 13, color: C.text3 }}>— reaching approximately {totalSubscribers} subscribers</span>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setSelected(new Set())}
            style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: C.text3, fontFamily: F }}
          >
            <Icon name="x" size={12} color={C.text3} /> Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "7px 16px", borderBottom: `1px solid ${C.border}`, background: C.bgPage }}>
          <div style={{ width: 17 }}>
            <NotifCheckbox checked={allOnPageSelected} indeterminate={someOnPageSelected && !allOnPageSelected} onChange={toggleAllOnPage} />
          </div>
          <span style={{ flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Card Name</span>
          <span style={{ width: 120, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Card Type</span>
          <span style={{ width: 90, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Subscribers</span>
          <span style={{ width: 130, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Last Used</span>
        </div>

        {pageItems.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", fontSize: 14, color: C.text3 }}>No cards match your filters.</div>
        )}

        {pageItems.map((c) => {
          const isSel = selected.has(c.id);
          const typeStyle = NOTIF_TYPE_STYLES[c.type] || { bg: "transparent", color: C.text2, plain: true };
          return (
            <div
              key={c.id}
              onClick={() => toggleOne(c.id)}
              style={{
                display: "flex", alignItems: "center", gap: 14, padding: "6px 16px", cursor: "pointer",
                borderBottom: `1px solid ${C.border}`,
                background: isSel ? C.accentLight : "transparent",
                borderLeft: `3px solid ${isSel ? C.accent : "transparent"}`,
              }}
            >
              <div style={{ width: 17 }} onClick={(e) => e.stopPropagation()}>
                <NotifCheckbox checked={isSel} onChange={() => toggleOne(c.id)} />
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div style={{ width: 26, height: 26, borderRadius: R.sm, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="grid" size={14} color={C.accent} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: C.text3, marginTop: 1 }}>
                    {c.company}{c.orgUnit ? ` · ${c.orgUnit}` : ""}
                  </div>
                </div>
              </div>
              <div style={{ width: 120 }}>
                {typeStyle.plain ? (
                  <span style={{ fontSize: 12.5, color: C.text2 }}>{c.type}</span>
                ) : (
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: typeStyle.color, background: typeStyle.bg, borderRadius: R.full, padding: "3px 10px" }}>{c.type}</span>
                )}
              </div>
              <div style={{ width: 90, fontSize: 13, fontWeight: 650, color: C.accent }}>{c.subscribers}</div>
              <div style={{ width: 130, fontSize: 12.5, color: C.text3 }}>{c.lastUsed || "–"}</div>
            </div>
          );
        })}
      </div>

      <NotifPagination page={page} setPage={setPage} rows={rows} setRows={setRows} total={filtered.length} />

      {showSendModal && (
        <SendNotificationModal
          selectedCards={selectedCards}
          onClose={() => setShowSendModal(false)}
          onSend={() => {
            setShowSendModal(false);
            setSelected(new Set());
          }}
        />
      )}
    </>
  );
}

// ─── Notifications: History tab ─────────────────────────────────────────────────

function HistoryTab() {
  const C = useC();
  const [company, setCompany] = useState("all");
  const [orgUnit, setOrgUnit] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [activeItem, setActiveItem] = useState(null);

  const filtered = NOTIF_HISTORY.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));
  const pageItems = filtered.slice((page - 1) * rows, page * rows);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <NotifSelect value={company} onChange={setCompany} options={[{ value: "all", label: "All Companies" }]} />
        <NotifSelect value={orgUnit} onChange={setOrgUnit} options={[{ value: "all", label: "All Org Units" }]} />
        <NotifSearchInput value={search} onChange={setSearch} placeholder="Search by title…" />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          style={{ height: 32, padding: "0 10px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
        />
        <span style={{ fontSize: 13, color: C.text3 }}>to</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          style={{ height: 32, padding: "0 10px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgSurface, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
        />
      </div>

      <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", boxShadow: C.shadow.sm }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "7px 16px", borderBottom: `1px solid ${C.border}`, background: C.bgPage }}>
          <span style={{ width: 140, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Card</span>
          <span style={{ flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Title</span>
          <span style={{ width: 200, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Url</span>
          <span style={{ width: 60, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Sent</span>
          <span style={{ width: 60, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Failed</span>
          <span style={{ width: 130, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: C.text3, textTransform: "uppercase" }}>Sent At</span>
          <span style={{ width: 36 }} />
        </div>

        {pageItems.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", fontSize: 14, color: C.text3 }}>No notifications match your search.</div>
        )}

        {pageItems.map((h) => (
          <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "5px 16px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ width: 140, fontSize: 13, fontWeight: 600, color: C.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.card}</span>
            <span style={{ flex: 1, fontSize: 13, color: C.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.title}</span>
            <span style={{ width: 200, fontSize: 12.5, color: C.accent, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.url}</span>
            <span style={{ width: 60, fontSize: 13, fontWeight: 650, color: C.success }}>{h.sent}</span>
            <span style={{ width: 60, fontSize: 13, fontWeight: 650, color: h.failed > 0 ? C.danger : C.text3 }}>{h.failed}</span>
            <span style={{ width: 130, fontSize: 12.5, color: C.text3 }}>{h.sentAt}</span>
            <span style={{ width: 36 }}>
              <button
                onClick={() => setActiveItem(h)}
                style={{ width: 24, height: 24, borderRadius: R.sm, border: "none", background: C.accentLight, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon name="eye" size={13} color={C.accent} />
              </button>
            </span>
          </div>
        ))}
      </div>

      <NotifPagination page={page} setPage={setPage} rows={rows} setRows={setRows} total={filtered.length} />

      {activeItem && (
        <HistoryDetailModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </>
  );
}

// ─── Notifications Page ─────────────────────────────────────────────────────────

function NotificationsPage() {
  const [tab, setTab] = useState("send");

  return (
    <div style={{ padding: "24px 28px", fontFamily: F }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <TabButton active={tab === "send"} icon="bell" label="Send" onClick={() => setTab("send")} />
        <TabButton active={tab === "history"} icon="clock" label="History" count={NOTIF_HISTORY.length} onClick={() => setTab("history")} />
      </div>

      {tab === "send" ? <SendTab /> : <HistoryTab />}
    </div>
  );
}

// ─── Admin Layout ──────────────────────────────────────────────────────────────

function AdminLayout({ user, onSignOut }) {
  // AdminLayout owns darkMode and is the ThemeCtx.Provider root.
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const C = darkMode ? CD : C_LIGHT;

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
            title={activeNav === "settings" ? "Settings" : (NAV.find(n => n.id === activeNav)?.label || "Dashboard")}
            subtitle={
              activeNav === "dashboard" ? `Welcome back, ${user.firstName || "there"}`
              : activeNav === "notifications" ? "Send messages to card subscribers and review history"
              : null
            }
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(v => !v)}
            user={user}
            onNavigate={setActiveNav}
            onSignOut={onSignOut}
          />

          <main style={{ flex: 1, overflowY: "auto", background: C.bgPage, transition: "background 0.25s", position: "relative" }}>
            {activeNav === "settings" ? <SettingsPage user={user} />
              : activeNav === "notifications" ? <NotificationsPage />
              : <DashboardPlaceholder user={user} />
            }
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
