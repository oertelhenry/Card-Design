import { useState, useRef, useEffect } from "react";

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

const C = {
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
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") || "?";
  const [avatarHover, setAvatarHover] = useState(false);

  const dk = darkMode;
  const topBg      = dk ? "#1A1D26" : C.bgSurface;
  const topBorder  = dk ? "rgba(255,255,255,0.07)" : C.border;
  const titleColor = dk ? "#F0F0F5" : C.text1;
  const mutedColor = dk ? "rgba(255,255,255,0.38)" : C.text3;
  const srchBg     = dk ? "rgba(255,255,255,0.06)" : C.bgInput;
  const srchBorder = dk ? "rgba(255,255,255,0.10)" : C.border;

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

// ─── All Cards: Mock Data ──────────────────────────────────────────────────────

const BUSINESS_CARDS = [
  { name: "AashiFowdar",       company: "ToyotaMauritius", unit: null,            created: "24 Mar 2026",  logo: "🚗" },
  { name: "AashiqHemraz",      company: "Jetour",          unit: "Phoenix",       created: "27 Oct 2025",  photo: true },
  { name: "AdriaanPansegrouw", company: "Seriti",          unit: null,            created: "16 Feb 2026",  photo: true },
  { name: "AjmalJaumeer",      company: "ToyotaMauritius", unit: null,            created: "25 Mar 2026",  logo: "🚗" },
  { name: "AlanEtiennette",    company: "BankOne",         unit: null,            created: "02 Apr 2026",  photo: true },
  { name: "AldoOppel",         company: "Seriti",          unit: "SeritiSolutions", created: "14 Sept 2025", photo: true },
  { name: "AlexandreHURDOWAR", company: "Leal",            unit: "BMW After Sale", created: "11 Feb 2026", logo: "🅱️" },
  { name: "AllasJeanAdrien",   company: "Leal",            unit: "Renault",       created: "18 Feb 2026",  logo: "◇" },
  { name: "AlwynCarstens",     company: "MDF",             unit: "MDF",           created: "11 Feb 2026",  photo: true, companyAccent: true },
  { name: "AmandavonWeilligh", company: "Seriti",          unit: "Bank Windhoek", created: "24 Oct 2025",  photo: true },
];

const VEHICLE_CARDS = [
  { name: "001",          company: "Seriti",          created: "28 Oct 2025" },
  { name: "002",          company: "Seriti",          created: "28 Oct 2025" },
  { name: "003",          company: "Seriti",          created: "28 Oct 2025" },
  { name: "004",          company: "Seriti",          created: "28 Oct 2025" },
  { name: "ABC123",       company: "Seriti",          created: "29 Jan 2026" },
  { name: "bZ4X",         company: "ToyotaMauritius", created: "26 Mar 2026" },
  { name: "CClass350E",   company: "CFAOMauritius",   created: "08 Apr 2026" },
  { name: "Clementines",  company: "Seriti",          created: "19 Jan 2026" },
  { name: "CorollaCrossE3", company: "CFAO-Mobility-Kenya", created: "07 May 2026" },
  { name: "CorollaCrossGR", company: "CFAO-Mobility-Kenya", created: "07 May 2026" },
];

const GENERIC_CARDS = [
  { name: "RMApplyFinance1",   company: "Seriti", unit: "Seriti New Zealand", created: "02 Feb 2026" },
  { name: "RMApplyInsurance1", company: "Seriti", unit: "Seriti New Zealand", created: "02 Feb 2026" },
  { name: "RMBooktestdrive1",  company: "Seriti", unit: "Seriti New Zealand", created: "02 Feb 2026" },
  { name: "RMTradein1",        company: "Seriti", unit: "Seriti New Zealand", created: "02 Feb 2026" },
  { name: "RMWorkshop1",       company: "Seriti", unit: "Seriti New Zealand", created: "02 Feb 2026" },
  { name: "SeritiNZtest",      company: "Seriti", unit: "Seriti New Zealand", created: "02 Feb 2026" },
  { name: "Test",              company: "Seriti", unit: null,                 created: "29 Jan 2026" },
];

const CARD_TYPES = [
  { id: "business", label: "Business", icon: "creditCard", data: BUSINESS_CARDS },
  { id: "vehicle",   label: "Vehicle",  icon: "carFront",   data: VEHICLE_CARDS },
  { id: "generic",   label: "Generic",  icon: "grid",       data: GENERIC_CARDS },
];

// ─── All Cards: Row Action Icons ──────────────────────────────────────────────

function RowAction({ icon, danger = false, title, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        background: hovered ? (danger ? C.dangerBg : C.bgInput) : "transparent",
        borderRadius: R.sm,
        cursor: "pointer",
        transition: "background 0.13s",
        flexShrink: 0,
      }}
    >
      <Icon name={icon} size={16.5} color={danger ? C.danger : hovered ? C.text1 : C.text2} />
    </button>
  );
}

// ─── All Cards: Avatar / Logo Cell ────────────────────────────────────────────

function CardThumb({ item, type }) {
  const bg =
    type === "vehicle" ? C.accentLight :
    type === "generic" ? "rgba(216,147,42,0.12)" :
    "#EDEDF0";

  const iconColor =
    type === "vehicle" ? C.accent :
    type === "generic" ? C.warning :
    C.text2;

  if (type === "business" && item.photo) {
    // Stylised "photo" avatar placeholder using initials
    const initials = item.name.replace(/[a-z]/g, "").slice(0, 2) || item.name.slice(0, 2).toUpperCase();
    return (
      <div
        style={{
          width: 32, height: 32, borderRadius: R.full, flexShrink: 0,
          background: "linear-gradient(135deg, #8B85FF 0%, #4F46E5 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: F,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      style={{
        width: 32, height: 32, borderRadius: type === "business" ? R.full : R.sm, flexShrink: 0,
        background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
      }}
    >
      {type === "business" ? (
        <span style={{ fontSize: 13 }}>{item.logo || "🏢"}</span>
      ) : (
        <Icon name={type === "vehicle" ? "carFront" : "grid"} size={15} color={iconColor} />
      )}
    </div>
  );
}

// ─── All Cards: Filter Pill (type tabs) ───────────────────────────────────────

function TypeTab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        padding: "6px 2px",
        cursor: "pointer",
        fontFamily: F,
        position: "relative",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: active ? 600 : 500,
          color: active ? C.accent : C.text2,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
      {count != null && (
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 650,
            color: active ? "#fff" : C.text2,
            background: active ? C.accent : C.bgInput,
            borderRadius: R.full,
            padding: "1px 7px",
            lineHeight: 1.5,
          }}
        >
          {count}
        </span>
      )}
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0, right: 0, bottom: -9,
            height: 2,
            background: C.accent,
            borderRadius: 2,
          }}
        />
      )}
    </button>
  );
}

// ─── All Cards: Company Filter Dropdown ───────────────────────────────────────

function CompanyDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          height: 38, padding: "0 12px 0 14px",
          background: C.bgSurface, border: `1.5px solid ${C.border}`,
          borderRadius: R.sm, cursor: "pointer", fontFamily: F,
        }}
      >
        <span style={{ fontSize: 13.5, fontWeight: 500, color: C.text1 }}>All Companies</span>
        <Icon name="chevDown" size={14} color={C.text3} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0,
            minWidth: 200, background: C.bgSurface, border: `1px solid ${C.border}`,
            borderRadius: R.md, boxShadow: C.shadow.dropdown, padding: 6, zIndex: 50,
          }}
        >
          {["All Companies", "Seriti", "ToyotaMauritius", "Leal", "BankOne", "MDF"].map((c) => (
            <div
              key={c}
              onClick={() => setOpen(false)}
              style={{
                padding: "8px 10px", fontSize: 13.5, color: C.text1,
                borderRadius: R.xs, cursor: "pointer", fontFamily: F,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = C.bgInput}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── All Cards: Pagination ─────────────────────────────────────────────────────

function Pagination({ total, label, perPage, onPerPageChange }) {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const [page, setPage] = useState(1);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const pages = [];
  pages.push(1);
  if (pageCount > 1) {
    if (page > 3) pages.push("…");
    for (let p = Math.max(2, page - 1); p <= Math.min(pageCount - 1, page + 1); p++) {
      if (!pages.includes(p)) pages.push(p);
    }
    if (page < pageCount - 2) pages.push("…");
    if (!pages.includes(pageCount)) pages.push(pageCount);
  }

  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px", borderTop: `1px solid ${C.border}`,
        fontFamily: F, flexWrap: "wrap", gap: 12,
      }}
    >
      <span style={{ fontSize: 13, color: C.text2 }}>
        Showing {start}–{end} of {total} {label}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <PageNavBtn disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} icon="chevLeft" />
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} style={{ fontSize: 13, color: C.text3, padding: "0 4px" }}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                minWidth: 30, height: 30, borderRadius: R.sm,
                border: "none", cursor: "pointer", fontFamily: F,
                fontSize: 13, fontWeight: p === page ? 650 : 500,
                background: p === page ? C.accent : "transparent",
                color: p === page ? "#fff" : C.text2,
              }}
            >
              {p}
            </button>
          )
        )}
        <PageNavBtn disabled={page === pageCount} onClick={() => setPage(p => Math.min(pageCount, p + 1))} icon="chevRight" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, color: C.text2 }}>Per page</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange?.(Number(e.target.value))}
          style={{
            height: 30, borderRadius: R.sm, border: `1.5px solid ${C.border}`,
            background: C.bgSurface, fontFamily: F, fontSize: 13, color: C.text1,
            padding: "0 8px", cursor: "pointer",
          }}
        >
          {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
}

function PageNavBtn({ disabled, onClick, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
        border: "none", borderRadius: R.sm, cursor: disabled ? "default" : "pointer",
        background: hovered && !disabled ? C.bgInput : "transparent",
        opacity: disabled ? 0.35 : 1,
      }}
    >
      <Icon name={icon} size={16} color={C.text2} />
    </button>
  );
}

// ─── All Cards: Table ──────────────────────────────────────────────────────────

function CardsTable({ items, type, onEdit }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
      <thead>
        <tr>
          {["Card", "Company / Unit", "Created", ""].map((h, i) => (
            <th
              key={h + i}
              style={{
                textAlign: "left",
                padding: "11px 20px",
                fontSize: 11.5,
                fontWeight: 650,
                letterSpacing: "0.04em",
                color: C.text3,
                textTransform: "uppercase",
                borderBottom: `1px solid ${C.border}`,
                background: C.bgPage,
                whiteSpace: "nowrap",
                width: i === 3 ? 190 : "auto",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr
            key={item.name + idx}
            style={{ borderBottom: idx === items.length - 1 ? "none" : `1px solid ${C.border}` }}
            onMouseEnter={(e) => e.currentTarget.style.background = C.bgPage}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <td style={{ padding: "10px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CardThumb item={item} type={type} />
                <span style={{ fontSize: 13.5, fontWeight: 500, color: C.text1, letterSpacing: "-0.005em" }}>
                  {item.name}
                </span>
              </div>
            </td>
            <td style={{ padding: "10px 20px" }}>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: item.companyAccent ? C.accent : C.text1,
                }}
              >
                {item.company}
              </div>
              {item.unit && (
                <div style={{ fontSize: 12, color: C.text3, marginTop: 1 }}>{item.unit}</div>
              )}
            </td>
            <td style={{ padding: "10px 20px", fontSize: 13, color: C.text2, whiteSpace: "nowrap" }}>
              {item.created}
            </td>
            <td style={{ padding: "10px 20px", width: 190, minWidth: 190 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end", minWidth: 150 }}>
                <RowAction icon="edit" title="Edit" onClick={() => onEdit?.(item)} />
                <RowAction icon="eye" title="Preview" />
                <RowAction icon="share" title="Share" />
                <RowAction icon="copy" title="Duplicate" />
                <RowAction icon="trash" title="Delete" danger />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── All Cards: Grid (card view) ──────────────────────────────────────────────

function CardsGrid({ items, type, onEdit }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 14,
        padding: 20,
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.name + idx}
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: R.lg,
            padding: 16,
            background: C.bgSurface,
            transition: "box-shadow 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = C.shadow.md; e.currentTarget.style.borderColor = "#D8D8D3"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <CardThumb item={item} type={type} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.name}
              </div>
              <div style={{ fontSize: 12, color: C.text3, marginTop: 1 }}>{item.created}</div>
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: item.companyAccent ? C.accent : C.text2, fontWeight: 500, marginBottom: 12 }}>
            {item.company}{item.unit ? ` · ${item.unit}` : ""}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end", borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 2 }}>
            <RowAction icon="edit" title="Edit" onClick={() => onEdit?.(item)} />
            <RowAction icon="eye" title="Preview" />
            <RowAction icon="share" title="Share" />
            <RowAction icon="copy" title="Duplicate" />
            <RowAction icon="trash" title="Delete" danger />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── All Cards: Page ───────────────────────────────────────────────────────────

function AllCardsPage({ onEditCard }) {
  const [activeType, setActiveType] = useState("business");
  const [viewMode, setViewMode] = useState("list");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const current = CARD_TYPES.find(t => t.id === activeType);
  const items = current.data.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const pageItems = items.slice(0, perPage);
  const labelPlural = `${activeType} card${items.length === 1 ? "" : "s"}`;

  return (
    <div style={{ padding: "24px 28px 32px", fontFamily: F }}>
      {/* Toolbar row: search-cards / company filter / type tabs / view toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Search cards */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8,
              height: 38, width: 220, padding: "0 12px",
              background: searchFocused ? C.bgInputFocus : C.bgInput,
              border: `1.5px solid ${searchFocused ? C.borderFocus : C.border}`,
              borderRadius: R.sm,
              boxShadow: searchFocused ? "0 0 0 3px rgba(79,70,229,0.14)" : "none",
              transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
            }}
          >
            <Icon name="search" size={14.5} color={C.text3} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search cards..."
              style={{
                border: "none", outline: "none", background: "transparent",
                fontSize: 13.5, color: C.text1, fontFamily: F, width: "100%",
              }}
            />
          </div>

          <CompanyDropdown />

          {/* Type tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: 6, paddingBottom: 1 }}>
            {CARD_TYPES.map(t => (
              <TypeTab
                key={t.id}
                label={t.label}
                count={activeType === t.id ? t.data.length : null}
                active={activeType === t.id}
                onClick={() => { setActiveType(t.id); setSearch(""); }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {activeType === "business" && (
            <Btn variant="ghost" style={{ height: 38, padding: "0 14px", fontSize: 13.5 }}>
              <Icon name="list" size={15} color={C.text2} />
              Group Items
            </Btn>
          )}
          {activeType === "vehicle" && (
            <Btn variant="ghost" style={{ height: 38, padding: "0 14px", fontSize: 13.5 }}>
              <Icon name="chart" size={15} color={C.text2} />
              Test Drives Analytics
            </Btn>
          )}

          {/* View toggle */}
          <div
            style={{
              display: "flex", flexShrink: 0, minWidth: 72, border: `1.5px solid ${C.border}`, borderRadius: R.sm,
              overflow: "hidden", background: C.bgSurface,
            }}
          >
            <ViewToggleBtn icon="list" active={viewMode === "list"} onClick={() => setViewMode("list")} />
            <ViewToggleBtn icon="grid" active={viewMode === "grid"} onClick={() => setViewMode("grid")} />
          </div>
        </div>
      </div>

      {/* Card surface */}
      <div
        style={{
          background: C.bgSurface,
          border: `1px solid ${C.border}`,
          borderRadius: R.lg,
          overflow: "hidden",
          boxShadow: C.shadow.sm,
        }}
      >
        {pageItems.length === 0 ? (
          <div style={{ padding: "56px 20px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 14, color: C.text3 }}>No cards match your search.</p>
          </div>
        ) : viewMode === "list" ? (
          <div style={{ overflowX: "auto" }}>
            <CardsTable items={pageItems} type={activeType} onEdit={(item) => onEditCard?.(item, activeType)} />
          </div>
        ) : (
          <CardsGrid items={pageItems} type={activeType} onEdit={(item) => onEditCard?.(item, activeType)} />
        )}

        <Pagination total={items.length} label={labelPlural} perPage={perPage} onPerPageChange={setPerPage} />
      </div>
    </div>
  );
}

function ViewToggleBtn({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        border: "none", cursor: "pointer",
        background: active ? C.accentLight : "transparent",
      }}
    >
      <Icon name={icon} size={17} color={active ? C.accent : C.text2} />
    </button>
  );
}

// ─── Switch (toggle) ───────────────────────────────────────────────────────────

function Switch({ checked, onChange, size = "md" }) {
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
      <span
        style={{
          position: "absolute", top: 2, left: checked ? w - knob - 2 : 2,
          width: knob, height: knob, borderRadius: R.full, background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "left 0.18s",
        }}
      />
    </button>
  );
}

// ─── Edit Card: Section Data ───────────────────────────────────────────────────
// One flat, freely-orderable list. No forced categories — grouping the same
// items by "type" fell apart the moment something got dragged across groups
// (a relocated item adopting a heading it doesn't really belong to), so this
// keeps the list honest: order is just order, drag anywhere, drop anywhere.

const SECTIONS_INITIAL = [
  { id: "cardDetails",   label: "Card Details",     icon: "userCircle", enabled: true,  meta: "Identity & photos" },
  { id: "contactInfo",   label: "Contact Info",      icon: "mail",       enabled: true,  meta: "2 items added" },
  { id: "shareConnect",  label: "Share & Connect",   icon: "share",      enabled: true,  meta: "Save-card button" },
  { id: "social",        label: "Social",            icon: "globe",      enabled: true,  meta: "0 links added" },
  { id: "businessHours", label: "Business Hours",    icon: "clock",      enabled: true,  meta: "Mon – Fri" },
  { id: "appointments",  label: "Appointments",      icon: "calendar",   enabled: true,  meta: "Booking link" },
  { id: "services",      label: "Services",          icon: "layers",     enabled: true,  meta: "0 services" },
  { id: "googleMap",     label: "Google Map",        icon: "mapPin",     enabled: true,  meta: "1 location" },
  { id: "testimonials",  label: "Testimonials",      icon: "star",       enabled: false, meta: "0 reviews" },
  { id: "customHtml",    label: "Custom HTML",       icon: "code",       enabled: true,  meta: "Embed block" },
  { id: "gallery",       label: "Gallery",            icon: "image",      enabled: false, meta: "0 photos" },
  { id: "rateService",   label: "Rate Service",       icon: "star",       enabled: false, meta: "Feedback form" },
];

// ─── Edit Card: Sections Panel (left column) ───────────────────────────────────

function SectionRow({ item, active, onSelect, onToggle, dragHandlers, isDropTarget }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      {...dragHandlers}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 10px 8px 4px",
        borderRadius: R.sm,
        cursor: "pointer",
        background: active ? C.accentLight : hovered ? C.bgInput : "transparent",
        borderLeft: `3px solid ${active ? C.accent : "transparent"}`,
        borderTop: `2px solid ${isDropTarget ? C.accent : "transparent"}`,
        marginBottom: 1,
        transition: "background 0.12s",
      }}
    >
      <span style={{ cursor: "grab", display: "flex", touchAction: "none" }}>
        <Icon name="dragDots" size={14} color={C.text3} />
      </span>
      <div
        style={{
          width: 26, height: 26, borderRadius: R.sm, flexShrink: 0,
          background: active ? C.accent : C.bgInput,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon name={item.icon} size={14} color={active ? "#fff" : C.text2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: active ? 650 : 550, color: active ? C.accent : C.text1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.label}
        </div>
        <div style={{ fontSize: 11, color: C.text3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.meta}
        </div>
      </div>
      <Switch checked={item.enabled} onChange={onToggle} size="sm" />
    </div>
  );
}

function TopTabs({ activeId, onSelect }) {
  const tabs = [{ id: "theme", label: "Theme" }, { id: "styling", label: "Styling" }];
  return (
    <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 16px" }}>
      {tabs.map((t) => {
        const active = activeId === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              background: "none", border: "none", outline: "none", cursor: "pointer",
              padding: "12px 4px 10px", marginRight: 22, fontFamily: F,
              fontSize: 14, fontWeight: active ? 650 : 500,
              color: active ? C.accent : C.text2,
              borderBottom: `2.5px solid ${active ? C.accent : "transparent"}`,
              borderRadius: active ? "2px 2px 0 0" : 0,
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionsPanel({ sections, activeId, search, onSearch, onSelect, onToggleEnabled, onReorder }) {
  const dragIdRef = useRef(null);
  const [dropTargetId, setDropTargetId] = useState(null);

  const enabledCount = sections.filter(i => i.enabled).length;
  const totalCount = sections.length;
  const q = search.trim().toLowerCase();
  const items = q ? sections.filter(i => i.label.toLowerCase().includes(q)) : sections;

  return (
    <>
      <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 650, color: C.text1, fontFamily: FD }}>Card Sections</span>
          <span style={{ fontSize: 11.5, fontWeight: 650, color: C.accent, background: C.accentLight, borderRadius: R.full, padding: "1px 8px" }}>
            {enabledCount}/{totalCount}
          </span>
        </div>
        <p style={{ margin: "0 0 10px", fontSize: 11.5, color: C.text3 }}>Drag to reorder · toggle to show on card</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: 32, padding: "0 10px", background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm }}>
          <Icon name="search" size={13} color={C.text3} />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Find a section…"
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 12.5, color: C.text1, fontFamily: F, width: "100%" }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
        {items.map((item) => (
          <SectionRow
            key={item.id}
            item={item}
            active={activeId === item.id}
            isDropTarget={dropTargetId === item.id}
            onSelect={() => onSelect(item.id)}
            onToggle={(val) => onToggleEnabled(item.id, val)}
            dragHandlers={{
              draggable: true,
              onDragStart: () => { dragIdRef.current = item.id; },
              onDragOver: (e) => { e.preventDefault(); setDropTargetId(item.id); },
              onDragLeave: () => setDropTargetId((id) => (id === item.id ? null : id)),
              onDrop: (e) => {
                e.preventDefault();
                if (dragIdRef.current && dragIdRef.current !== item.id) {
                  onReorder(dragIdRef.current, item.id);
                }
                dragIdRef.current = null;
                setDropTargetId(null);
              },
            }}
          />
        ))}
        {q && items.length === 0 && (
          <p style={{ fontSize: 12.5, color: C.text3, padding: "8px 4px" }}>No sections match "{search}".</p>
        )}
      </div>
    </>
  );
}

// ─── Edit Card: Theme Preset Picker (center panel) ─────────────────────────────

const THEME_PRESETS = [
  { id: "vintage", name: "Vintage", tag: "VINTAGE", desc: "Warm, elegant & timeless", gradient: "linear-gradient(135deg,#C9A35A,#7A5A2E)" },
  { id: "formal",  name: "Formal",  tag: "FORMAL",  desc: "Clean, professional & bold", gradient: "linear-gradient(135deg,#2B2B36,#13131A)" },
  { id: "taboo",   name: "Taboo",   tag: "TABOO",   desc: "Vivid, bold & electric", gradient: "linear-gradient(135deg,#3B82F6,#1E40AF)" },
];

function ThemePresetCard({ preset, active, onUse }) {
  return (
    <div
      style={{
        borderRadius: R.lg,
        border: `2px solid ${active ? C.accent : C.border}`,
        overflow: "hidden",
        background: C.bgSurface,
        cursor: "pointer",
      }}
      onClick={onUse}
    >
      <div style={{ height: 150, background: preset.gradient, position: "relative", padding: 14 }}>
        <span
          style={{
            position: "absolute", top: 10, right: 10,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
            color: "#fff", background: "rgba(0,0,0,0.32)", borderRadius: R.xs, padding: "3px 7px",
          }}
        >
          {preset.tag}
        </span>
        <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: R.full, background: "rgba(255,255,255,0.32)" }} />
          <div style={{ width: 96, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
          <div style={{ width: 70, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.22)" }} />
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 16, height: 16, borderRadius: R.full, background: "rgba(255,255,255,0.28)" }} />)}
          </div>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 15, fontWeight: 650, color: C.text1, fontFamily: FD }}>{preset.name}</div>
        <div style={{ fontSize: 12.5, color: C.text3, marginTop: 2 }}>{preset.desc}</div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 16px" }}>
        {active ? (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 650, color: C.accent }}>
            <Icon name="check" size={14} color={C.accent} /> Active
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: C.text2 }}>
            <Icon name="chevRight" size={14} color={C.text2} /> Use this theme
          </span>
        )}
      </div>
    </div>
  );
}

function ThemePickerPanel({ activeTheme, onSelectTheme }) {
  return (
    <div style={{ padding: "24px 28px" }}>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Theme</h2>
      <p style={{ margin: "4px 0 20px", fontSize: 13, color: C.text3 }}>Choose the visual style for your card. You can change this at any time.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, maxWidth: 920 }}>
        {THEME_PRESETS.map((preset) => (
          <ThemePresetCard
            key={preset.id}
            preset={preset}
            active={activeTheme === preset.id}
            onUse={() => onSelectTheme(preset.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Edit Card: Styling Panel (center panel — no drag/toggle, card-wide only) ──

const FONT_PAIRS = ["Inter", "Poppins", "Playfair Display", "Manrope"];

const STYLE_FIELDS_INITIAL = {
  // Backgrounds
  topCardColour:      "#FFFFFF",
  cardBackground:      "#FFFFFF",
  servicesTestimonialsBg: "#FF0000",
  // Text
  cardName:            "#161618",
  designation:         "#161618",
  moreDetail:          "#161618",
  profileDescription:  "#161618",
  sectionHeading:      "#161618",
  servicesTestimonialsHeading: "#FFFFFF",
  servicesTestimonialsText:    "#FFFFFF",
  contactText:         "#000000",
  // Icons
  iconCircle:          "#FF0000",
  icon:                "#FFFFFF",
  // Buttons
  buttonBackground:    "#FF0000",
  buttonHover:         "#FF3333",
  buttonText:          "#FFFFFF",
};

const STYLE_FIELD_GROUPS = [
  {
    label: "Backgrounds",
    fields: [
      { key: "topCardColour",          label: "Top Card Colour" },
      { key: "cardBackground",          label: "Card Background" },
      { key: "servicesTestimonialsBg",  label: "Services & Testimonials" },
    ],
  },
  {
    label: "Text",
    fields: [
      { key: "cardName",                       label: "Card Name" },
      { key: "designation",                     label: "Designation" },
      { key: "moreDetail",                      label: "More Detail" },
      { key: "profileDescription",              label: "Profile Description" },
      { key: "sectionHeading",                  label: "Section Heading" },
      { key: "servicesTestimonialsHeading",     label: "Services & Testimonials Heading" },
      { key: "servicesTestimonialsText",        label: "Services & Testimonials Text" },
      { key: "contactText",                     label: "Contact Text" },
    ],
  },
  {
    label: "Icons",
    fields: [
      { key: "iconCircle", label: "Icon Circle" },
      { key: "icon",       label: "Icon" },
    ],
  },
  {
    label: "Buttons",
    fields: [
      { key: "buttonBackground", label: "Button Background" },
      { key: "buttonHover",      label: "Button Hover" },
      { key: "buttonText",       label: "Button Text" },
    ],
  },
];

function SwatchRow({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontSize: 11.5, fontWeight: 650, color: C.text3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>{children}</div>
    </div>
  );
}

// Single color field: swatch (opens the native color picker) + live hex input,
// both inside one bordered control — same visual language as Input/Switch
// elsewhere in the editor instead of a bare browser color-input box.
function ColorField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div style={{ minHeight: 32, display: "flex", alignItems: "flex-end", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: C.text2, fontFamily: F, lineHeight: 1.3 }}>{label}</span>
      </div>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          height: 40, padding: "0 6px 0 8px",
          background: focused ? C.bgInputFocus : C.bgInput,
          border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
          borderRadius: R.sm,
          boxShadow: focused ? "0 0 0 3px rgba(79,70,229,0.14)" : "none",
          transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
        }}
      >
        <label
          style={{
            width: 24, height: 24, borderRadius: R.xs, flexShrink: 0, cursor: "pointer",
            background: value, border: `1px solid rgba(0,0,0,0.12)`,
            display: "flex", position: "relative", overflow: "hidden",
          }}
        >
          <input
            type="color"
            value={/^#[0-9A-Fa-f]{6}$/.test(value) ? value : "#000000"}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", padding: 0, cursor: "pointer", opacity: 0 }}
          />
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: F, color: C.text1, letterSpacing: "0.01em" }}
        />
      </div>
    </div>
  );
}

function StyleFieldGroup({ label, fields, values, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text3, textTransform: "uppercase", marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(196px, 1fr))", gap: "20px 16px", alignItems: "start" }}>
        {fields.map((f) => (
          <ColorField
            key={f.key}
            label={f.label}
            value={values[f.key]}
            onChange={(v) => onChange(f.key, v)}
          />
        ))}
      </div>
    </div>
  );
}

function StylingPanel({ font, onFontChange }) {
  const [colors, setColors] = useState(STYLE_FIELDS_INITIAL);

  const setColor = (key, value) => setColors(prev => ({ ...prev, [key]: value }));

  return (
    <div style={{ padding: "24px 28px", maxWidth: 880 }}>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Card Styling</h2>
      <p style={{ margin: "4px 0 24px", fontSize: 13, color: C.text3 }}>Fine-tune colors and type — applies to the whole card, not a single section.</p>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: C.text3, textTransform: "uppercase", marginBottom: 12 }}>
          Typography
        </div>
        <SwatchRow label="Font pairing">
          {FONT_PAIRS.map((f) => (
            <button
              key={f}
              onClick={() => onFontChange(f)}
              style={{
                padding: "6px 12px", borderRadius: R.full, cursor: "pointer", outline: "none",
                border: `1.5px solid ${font === f ? C.accent : C.border}`,
                background: font === f ? C.accentLight : C.bgSurface,
                color: font === f ? C.accent : C.text2,
                fontSize: 13, fontWeight: 550, fontFamily: `'${f}', ${F}`,
              }}
            >
              {f}
            </button>
          ))}
        </SwatchRow>
      </div>

      {STYLE_FIELD_GROUPS.map((group) => (
        <StyleFieldGroup
          key={group.label}
          label={group.label}
          fields={group.fields}
          values={colors}
          onChange={setColor}
        />
      ))}
    </div>
  );
}


// ─── Edit Card: Card Details Panel ─────────────────────────────────────────────

function FieldGroup({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function CardDetailsPanel({ data, onChange }) {
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value });
  return (
    <div style={{ padding: "24px 28px", maxWidth: 880 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Card Identity</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12.5, color: C.text3 }}>Core info shown at the top of the card</p>
        </div>
        <Btn variant="ghost" style={{ height: 36, padding: "0 14px", fontSize: 13, color: C.accent, borderColor: "rgba(79,70,229,0.3)" }}>
          <Icon name="star" size={14} color={C.accent} /> Auto Generate
        </Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <FieldGroup label="Card Name">
          <Input value={data.cardName} onChange={set("cardName")} />
        </FieldGroup>
        <FieldGroup label="Email Address (Notifications Only)">
          <Input type="email" value={data.email} onChange={set("email")} />
        </FieldGroup>
        <FieldGroup label="Display Name">
          <Input value={data.displayName} onChange={set("displayName")} />
        </FieldGroup>
        <FieldGroup label="Designation">
          <Input value={data.designation} onChange={set("designation")} />
        </FieldGroup>
      </div>

      <div style={{ marginBottom: 16 }}>
        <FieldGroup label="More Detail">
          <Input value={data.moreDetail} onChange={set("moreDetail")} />
        </FieldGroup>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Label>Description</Label>
        <textarea
          value={data.description}
          onChange={set("description")}
          rows={3}
          style={{
            width: "100%", padding: "10px 14px", fontSize: 14, fontFamily: F, color: C.text1,
            background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm,
            outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5,
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          { key: "profilePicture", label: "Profile Picture", emoji: "🚗" },
          { key: "bannerImage", label: "Banner Image", emoji: "🏔️" },
        ].map((img) => (
          <div key={img.key}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <Label>{img.label}</Label>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <Btn variant="ghost" style={{ height: 32, padding: "0 12px", fontSize: 12.5 }}>
                <Icon name="image" size={13} color={C.text2} /> Change
              </Btn>
              <Btn variant="danger" style={{ height: 32, padding: "0 12px", fontSize: 12.5 }}>
                <Icon name="x" size={13} color={C.danger} /> Remove
              </Btn>
            </div>
            <div
              style={{
                height: 140, borderRadius: R.md, background: "linear-gradient(135deg,#23232b,#13131a)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36,
                border: `1px solid ${C.border}`,
              }}
            >
              {img.emoji}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Edit Card: Contact Info Panel ─────────────────────────────────────────────

const CONTACT_TYPES = [
  { id: "phone",     label: "Phone",     icon: "phone", color: "#2FA563" },
  { id: "email",     label: "Email",     icon: "mail",   color: "#4F46E5" },
  { id: "whatsapp",  label: "WhatsApp",  icon: "share",  color: "#2FA563" },
  { id: "linkedin",  label: "LinkedIn",  icon: "link2",  color: "#0A66C2" },
  { id: "facebook",  label: "Facebook",  icon: "link2",  color: "#1877F2" },
  { id: "twitter",   label: "Twitter X", icon: "x",      color: "#111111" },
  { id: "instagram", label: "Instagram", icon: "image",  color: "#D6249F" },
  { id: "slack",     label: "Slack",     icon: "globe",  color: "#4A154B" },
];

function ContactInfoPanel({ contacts, onChange }) {
  const update = (idx, value) => {
    const next = [...contacts];
    next[idx] = { ...next[idx], value };
    onChange(next);
  };
  const toggle = (idx) => {
    const next = [...contacts];
    next[idx] = { ...next[idx], enabled: !next[idx].enabled };
    onChange(next);
  };
  const remove = (idx) => onChange(contacts.filter((_, i) => i !== idx));
  const add = (type) => onChange([...contacts, { type: type.id, label: type.label, color: type.color, icon: type.icon, value: "", enabled: true }]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Contact Info</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12.5, color: C.text3 }}>Pick a channel below to add it to the card</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
          <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
            <option>— local —</option>
          </select>
        </div>
      </div>

      {/* Quick-add channel pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {CONTACT_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => add(t)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 12px 6px 8px", borderRadius: R.full,
              border: `1.5px solid ${C.border}`, background: C.bgSurface,
              cursor: "pointer", fontFamily: F, outline: "none",
            }}
          >
            <span style={{ width: 18, height: 18, borderRadius: R.full, background: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={t.icon} size={10} color="#fff" />
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 550, color: C.text1 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Existing contact rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 640 }}>
        {contacts.length === 0 && (
          <p style={{ fontSize: 13, color: C.text3, margin: 0 }}>No contact channels yet — add one above.</p>
        )}
        {contacts.map((c, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="dragDots" size={13} color={C.text3} />
            <div style={{ width: 30, height: 30, borderRadius: R.full, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={c.icon} size={14} color="#fff" />
            </div>
            <input
              value={c.value}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={`Enter ${c.label.toLowerCase()}…`}
              style={{
                flex: 1, height: 40, padding: "0 14px", fontSize: 13.5, fontFamily: F, color: C.text1,
                background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none",
              }}
            />
            <Switch checked={c.enabled} onChange={() => toggle(idx)} />
            <button onClick={() => remove(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
              <Icon name="x" size={15} color={C.text3} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Edit Card: Social Panel ────────────────────────────────────────────────────

const SOCIAL_TYPES = [
  { id: "whatsapp",  label: "WhatsApp",  icon: "messageCircle", color: "#25D366" },
  { id: "instagram", label: "Instagram", icon: "image",         color: "#D6249F" },
  { id: "linkedin",  label: "LinkedIn",  icon: "link2",         color: "#0A66C2" },
  { id: "youtube",   label: "YouTube",   icon: "play",          color: "#FF0000" },
  { id: "facebook",  label: "Facebook",  icon: "link2",         color: "#1877F2" },
  { id: "twitter",   label: "Twitter X", icon: "x",             color: "#111111" },
  { id: "website",   label: "Website",   icon: "globe",         color: "#4F46E5" },
];

function SocialPanel({ links, onChange }) {
  const update = (idx, value) => {
    const next = [...links];
    next[idx] = { ...next[idx], value };
    onChange(next);
  };
  const toggle = (idx) => {
    const next = [...links];
    next[idx] = { ...next[idx], enabled: !next[idx].enabled };
    onChange(next);
  };
  const remove = (idx) => onChange(links.filter((_, i) => i !== idx));
  const add = (type) => onChange([...links, { type: type.id, label: type.label, color: type.color, icon: type.icon, value: "", enabled: true }]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Social</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12.5, color: C.text3 }}>Pick a platform below to add it to the card</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
          <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
            <option>Toyota Mauritius</option>
          </select>
        </div>
      </div>

      {/* Quick-add platform pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {SOCIAL_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => add(t)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 12px 6px 8px", borderRadius: R.full,
              border: `1.5px solid ${C.border}`, background: C.bgSurface,
              cursor: "pointer", fontFamily: F, outline: "none",
            }}
          >
            <span style={{ width: 18, height: 18, borderRadius: R.full, background: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={t.icon} size={10} color="#fff" />
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 550, color: C.text1 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Existing link rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 720 }}>
        {links.length === 0 && (
          <p style={{ fontSize: 13, color: C.text3, margin: 0 }}>No social links yet — add one above.</p>
        )}
        {links.map((l, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="dragDots" size={13} color={C.text3} />
            <div style={{ width: 30, height: 30, borderRadius: R.full, background: l.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={l.icon} size={14} color="#fff" />
            </div>
            <input
              value={l.value}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={`Paste your ${l.label.toLowerCase()} link…`}
              style={{
                flex: 1, height: 40, padding: "0 14px", fontSize: 13, fontFamily: F, color: C.text1,
                background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none",
              }}
            />
            <Switch checked={l.enabled} onChange={() => toggle(idx)} />
            <button onClick={() => remove(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
              <Icon name="x" size={15} color={C.text3} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Edit Card: Business Hours Panel ───────────────────────────────────────────

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function BusinessHoursPanel({ hours, onChange }) {
  const update = (idx, patch) => {
    const next = [...hours];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Business Hours</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
            <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
              <option>— local —</option>
            </select>
          </div>
          <span style={{ fontSize: 11.5, color: C.text3 }}>Toggle to mark a day open or closed</span>
        </div>
      </div>

      <div style={{ marginTop: 18, borderTop: `1px solid ${C.border}`, maxWidth: 720 }}>
        {hours.map((d, idx) => (
          <div
            key={d.day}
            style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "12px 4px", borderBottom: `1px solid ${C.border}`,
              background: idx % 2 === 1 ? C.bgPage : "transparent",
            }}
          >
            <span style={{ width: 92, fontSize: 13.5, fontWeight: 600, color: C.text1, flexShrink: 0 }}>{d.day}</span>
            <Switch checked={d.enabled} onChange={(val) => update(idx, { enabled: val })} />
            {d.enabled ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="time"
                  value={d.start}
                  onChange={(e) => update(idx, { start: e.target.value })}
                  style={{ height: 34, padding: "0 10px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
                />
                <span style={{ color: C.text3, fontSize: 13 }}>–</span>
                <input
                  type="time"
                  value={d.end}
                  onChange={(e) => update(idx, { end: e.target.value })}
                  style={{ height: 34, padding: "0 10px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
                />
              </div>
            ) : (
              <span style={{ fontSize: 13, color: C.text3, fontStyle: "italic" }}>Closed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Edit Card: Share & Connect Panel ──────────────────────────────────────────

const SHARE_CONNECT_OPTIONS_INITIAL = [
  { id: "saveCard",   label: "Save Card",        desc: "Lets visitors save your contact details directly to their phone.", icon: "download",    enabled: true },
  { id: "shareCard",  label: "Share Card",        desc: "Allows visitors to share your card link with others.",            icon: "share",        enabled: true },
  { id: "contact",    label: "Contact",           desc: "Provides a quick way for visitors to reach out to you.",          icon: "phone",        enabled: true },
  { id: "homeScreen", label: "Save to Home Screen", desc: "Prompts visitors to add your card as a shortcut on their device.", icon: "homeScreen", enabled: true },
];

function ShareConnectOptionRow({ option, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 4px", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ width: 32, height: 32, borderRadius: R.sm, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
        <Icon name={option.icon} size={16} color={C.accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text1 }}>{option.label}</div>
        <p style={{ margin: "2px 0 0", fontSize: 12.5, color: C.text3, lineHeight: 1.5 }}>{option.desc}</p>
      </div>
      <Switch checked={option.enabled} onChange={onToggle} />
    </div>
  );
}

function ShareConnectPanel({ options, onChange }) {
  const toggle = (idx, val) => {
    const next = [...options];
    next[idx] = { ...next[idx], enabled: val };
    onChange(next);
  };

  return (
    <div style={{ padding: "24px 28px", maxWidth: 680 }}>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Share &amp; Connect</h2>
      <p style={{ margin: "6px 0 20px", fontSize: 13, color: C.text3, lineHeight: 1.6 }}>
        Controls the action bar shown on your digital card. Toggle each option below to show or hide it — turning all of them off hides the whole action bar.
      </p>
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        {options.map((option, idx) => (
          <ShareConnectOptionRow key={option.id} option={option} onToggle={(val) => toggle(idx, val)} />
        ))}
      </div>
    </div>
  );
}


// ─── Edit Card: shared drag-reorder helper ─────────────────────────────────────
// Generic two-ref drag handlers for any array-of-objects panel below — avoids
// re-deriving the same dragstart/dragover/drop wiring per section.
function useDragReorder(items, onChange) {
  const dragIdxRef = useRef(null);
  const [overIdx, setOverIdx] = useState(null);

  const handlersFor = (idx) => ({
    draggable: true,
    onDragStart: () => { dragIdxRef.current = idx; },
    onDragOver: (e) => { e.preventDefault(); setOverIdx(idx); },
    onDragLeave: () => setOverIdx((i) => (i === idx ? null : i)),
    onDrop: (e) => {
      e.preventDefault();
      const from = dragIdxRef.current;
      if (from === null || from === idx) { setOverIdx(null); return; }
      const next = [...items];
      const [moved] = next.splice(from, 1);
      next.splice(idx, 0, moved);
      onChange(next);
      dragIdxRef.current = null;
      setOverIdx(null);
    },
  });

  return { handlersFor, overIdx };
}

// ─── Edit Card: Appointments Panel ─────────────────────────────────────────────

function AppointmentsPanel({ slots, onChange }) {
  const { handlersFor, overIdx } = useDragReorder(slots, onChange);

  const update = (idx, patch) => {
    const next = [...slots];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };
  const remove = (idx) => onChange(slots.filter((_, i) => i !== idx));
  const addSlot = () => onChange([...slots, { start: "09:00", end: "10:00", enabled: true }]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Request an Appointment</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
            <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
              <option>— local —</option>
            </select>
          </div>
          <span style={{ fontSize: 11.5, color: C.text3 }}>Drag to reorder</span>
          <Btn onClick={addSlot} style={{ height: 34, padding: "0 14px", fontSize: 12.5 }}>
            <Icon name="plus" size={13} color="#fff" /> Add Slot
          </Btn>
        </div>
      </div>

      <div style={{ maxWidth: 760 }}>
        {slots.map((slot, idx) => (
          <div
            key={idx}
            {...handlersFor(idx)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 4px", borderBottom: `1px solid ${C.border}`,
              borderTop: `2px solid ${overIdx === idx ? C.accent : "transparent"}`,
              background: idx % 2 === 1 ? C.bgPage : "transparent",
            }}
          >
            <Icon name="dragDots" size={13} color={C.text3} />
            <span style={{ width: 18, fontSize: 12.5, color: C.text3, textAlign: "center" }}>{idx + 1}</span>
            <input
              type="time"
              value={slot.start}
              onChange={(e) => update(idx, { start: e.target.value })}
              style={{ height: 36, padding: "0 10px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
            />
            <span style={{ color: C.text3, fontSize: 13 }}>–</span>
            <input
              type="time"
              value={slot.end}
              onChange={(e) => update(idx, { end: e.target.value })}
              style={{ height: 36, padding: "0 10px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
            />
            <Switch checked={slot.enabled} onChange={(val) => update(idx, { enabled: val })} />
            <button onClick={() => remove(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
              <Icon name="x" size={15} color={C.text3} />
            </button>
          </div>
        ))}
        {slots.length === 0 && (
          <p style={{ fontSize: 13, color: C.text3 }}>No time slots yet — add one above.</p>
        )}
      </div>
    </div>
  );
}

// ─── Edit Card: Services Panel ─────────────────────────────────────────────────

const SERVICE_ICON_CHOICES = ["swap", "mapPin", "globe", "heart", "layers", "star", "calendar", "code"];

function ServiceIconPicker({ icon, onPick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 38, height: 38, borderRadius: R.full, border: `1.5px solid ${C.border}`,
          background: C.dangerBg, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", outline: "none",
        }}
      >
        <Icon name={icon} size={17} color={C.danger} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 20, background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: R.md, boxShadow: C.shadow.dropdown, padding: 8, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {SERVICE_ICON_CHOICES.map((ic) => (
            <button
              key={ic}
              onClick={() => { onPick(ic); setOpen(false); }}
              style={{
                width: 32, height: 32, borderRadius: R.sm, border: "none", cursor: "pointer", outline: "none",
                background: ic === icon ? C.accentLight : C.bgInput,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon name={ic} size={15} color={ic === icon ? C.accent : C.text2} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service, onChange, onRemove, dragHandlers, isDropTarget }) {
  const set = (patch) => onChange({ ...service, ...patch });
  return (
    <div
      {...dragHandlers}
      style={{
        border: `1px solid ${C.border}`, borderTop: `2px solid ${isDropTarget ? C.accent : C.border}`,
        borderRadius: R.lg, padding: 16, marginBottom: 14, background: C.bgSurface,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Icon name="dragDots" size={14} color={C.text3} />
        <ServiceIconPicker icon={service.icon} onPick={(ic) => set({ icon: ic })} />
        <input
          value={service.title}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="Service title"
          style={{ flex: 1, height: 38, padding: "0 12px", fontSize: 14, fontWeight: 600, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
        />
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexShrink: 0 }}>
          <Icon name="x" size={16} color={C.text3} />
        </button>
      </div>
      <textarea
        value={service.desc}
        onChange={(e) => set({ desc: e.target.value })}
        placeholder="Describe this service…"
        rows={2}
        style={{ width: "100%", padding: "10px 12px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5, marginBottom: 10 }}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={service.ctaLabel}
          onChange={(e) => set({ ctaLabel: e.target.value })}
          placeholder="Button label"
          style={{ width: 160, height: 36, padding: "0 12px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", flexShrink: 0 }}
        />
        <input
          value={service.url}
          onChange={(e) => set({ url: e.target.value })}
          placeholder="https://…"
          style={{ flex: 1, height: 36, padding: "0 12px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
        />
      </div>
    </div>
  );
}

function ServicesPanel({ services, onChange }) {
  const { handlersFor, overIdx } = useDragReorder(services, onChange);

  const update = (idx, next) => {
    const arr = [...services];
    arr[idx] = next;
    onChange(arr);
  };
  const remove = (idx) => onChange(services.filter((_, i) => i !== idx));
  const add = () => onChange([...services, { icon: "swap", title: "", desc: "", ctaLabel: "Read More", url: "" }]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Our Services</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
            <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
              <option>— local —</option>
            </select>
          </div>
          <Btn onClick={add} style={{ height: 34, padding: "0 14px", fontSize: 12.5 }}>
            <Icon name="plus" size={13} color="#fff" /> Add Service
          </Btn>
        </div>
      </div>

      <div style={{ maxWidth: 760 }}>
        {services.map((s, idx) => (
          <ServiceCard
            key={idx}
            service={s}
            onChange={(next) => update(idx, next)}
            onRemove={() => remove(idx)}
            dragHandlers={handlersFor(idx)}
            isDropTarget={overIdx === idx}
          />
        ))}
        {services.length === 0 && (
          <p style={{ fontSize: 13, color: C.text3 }}>No services yet — add one above.</p>
        )}
      </div>
    </div>
  );
}

// ─── Edit Card: Embed-code panel (shared shape for Google Map & Custom HTML) ──

function EmbedCodePanel({ title, value, onChange, savedLabel, placeholder }) {
  const [touched, setTouched] = useState(false);
  return (
    <div style={{ padding: "24px 28px" }}>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>{title}</h2>
      <div style={{ marginTop: 16, maxWidth: 1040 }}>
        <textarea
          value={value}
          onChange={(e) => { onChange(e.target.value); setTouched(true); }}
          placeholder={placeholder}
          rows={6}
          style={{
            width: "100%", padding: "12px 14px", fontSize: 12.5, fontFamily: "'SF Mono', 'Monaco', monospace",
            color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm,
            outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6,
          }}
        />
        {value.trim() && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
            <Icon name="check" size={13} color={C.success} />
            <span style={{ fontSize: 12.5, color: C.success }}>{savedLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Edit Card: Testimonials Panel ─────────────────────────────────────────────

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 1, display: "flex" }}
        >
          <Icon name="star" size={15} style={{ fill: n <= value ? "#F5A623" : "none", stroke: n <= value ? "#F5A623" : C.text3 }} />
        </button>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, onChange, onRemove, dragHandlers, isDropTarget }) {
  const set = (patch) => onChange({ ...testimonial, ...patch });
  const initials = (testimonial.company || "??").slice(0, 2).toUpperCase();
  return (
    <div
      {...dragHandlers}
      style={{
        border: `1px solid ${C.border}`, borderTop: `2px solid ${isDropTarget ? C.accent : C.border}`,
        borderRadius: R.lg, padding: 16, marginBottom: 14, background: C.bgSurface,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Icon name="dragDots" size={14} color={C.text3} />
        <div style={{ width: 32, height: 32, borderRadius: R.full, background: C.bgInput, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.text2, flexShrink: 0 }}>
          {initials}
        </div>
        <input
          value={testimonial.company}
          onChange={(e) => set({ company: e.target.value })}
          placeholder="Company name"
          style={{ flex: 1, height: 36, padding: "0 12px", fontSize: 13.5, fontWeight: 600, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none" }}
        />
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexShrink: 0 }}>
          <Icon name="x" size={16} color={C.text3} />
        </button>
      </div>
      <div style={{ marginBottom: 8 }}>
        <StarRating value={testimonial.rating} onChange={(v) => set({ rating: v })} />
      </div>
      <textarea
        value={testimonial.review}
        onChange={(e) => set({ review: e.target.value })}
        placeholder="What did they say?"
        rows={3}
        style={{ width: "100%", padding: "10px 12px", fontSize: 13, fontFamily: F, color: C.text1, background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5 }}
      />
    </div>
  );
}

function TestimonialsPanel({ testimonials, onChange }) {
  const { handlersFor, overIdx } = useDragReorder(testimonials, onChange);

  const update = (idx, next) => {
    const arr = [...testimonials];
    arr[idx] = next;
    onChange(arr);
  };
  const remove = (idx) => onChange(testimonials.filter((_, i) => i !== idx));
  const add = () => onChange([...testimonials, { company: "", rating: 5, review: "" }]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Testimonials</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
            <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
              <option>Testimonial Collection</option>
            </select>
          </div>
          <Btn onClick={add} style={{ height: 34, padding: "0 14px", fontSize: 12.5 }}>
            <Icon name="plus" size={13} color="#fff" /> Add Testimonial
          </Btn>
        </div>
      </div>

      <div style={{ maxWidth: 760 }}>
        {testimonials.map((t, idx) => (
          <TestimonialCard
            key={idx}
            testimonial={t}
            onChange={(next) => update(idx, next)}
            onRemove={() => remove(idx)}
            dragHandlers={handlersFor(idx)}
            isDropTarget={overIdx === idx}
          />
        ))}
        {testimonials.length === 0 && (
          <p style={{ fontSize: 13, color: C.text3 }}>No testimonials yet — add one above.</p>
        )}
      </div>
    </div>
  );
}


// ─── Edit Card: Gallery Panel ───────────────────────────────────────────────────

const GALLERY_MEDIA_TYPES = [
  { id: "image", label: "Image", icon: "image", gradient: "linear-gradient(135deg,#8a7355,#3d3225)" },
  { id: "video", label: "Video", icon: "play",  gradient: "linear-gradient(135deg,#2B2B36,#13131A)" },
  { id: "pdf",   label: "PDF",   icon: "fileText", gradient: "linear-gradient(135deg,#3B82F6,#1E40AF)" },
];

function GalleryTile({ item, onRemove, dragHandlers, isDropTarget }) {
  const [hovered, setHovered] = useState(false);
  const meta = GALLERY_MEDIA_TYPES.find((t) => t.id === item.type) || GALLERY_MEDIA_TYPES[0];
  return (
    <div
      {...dragHandlers}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: 120 }}
    >
      <div
        style={{
          position: "relative", width: 120, height: 90, borderRadius: R.md, overflow: "hidden",
          background: meta.gradient, border: `2px solid ${isDropTarget ? C.accent : "transparent"}`,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab",
        }}
      >
        <Icon name={meta.icon} size={22} color="rgba(255,255,255,0.85)" />
        {hovered && (
          <button
            onClick={onRemove}
            style={{
              position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: R.full,
              background: "rgba(0,0,0,0.55)", border: "none", cursor: "pointer", outline: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name="x" size={11} color="#fff" />
          </button>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, justifyContent: "center" }}>
        <Icon name="dragDots" size={11} color={C.text3} />
        <span style={{ fontSize: 11.5, color: C.text3, fontWeight: 500 }}>{meta.label}</span>
      </div>
    </div>
  );
}

function GalleryPanel({ items, onChange }) {
  const { handlersFor, overIdx } = useDragReorder(items, onChange);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  const add = (type) => onChange([...items, { type }]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Gallery</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, color: C.text3 }}>Group Items</span>
            <select style={{ height: 34, borderRadius: R.sm, border: `1.5px solid ${C.border}`, background: C.bgSurface, fontFamily: F, fontSize: 12.5, color: C.text1, padding: "0 8px" }}>
              <option>— local —</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {GALLERY_MEDIA_TYPES.map((t) => (
              <Btn key={t.id} variant="ghost" onClick={() => add(t.id)} style={{ height: 34, padding: "0 13px", fontSize: 12.5 }}>
                <Icon name={t.icon} size={13} color={C.text2} /> {t.label}
              </Btn>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {items.map((item, idx) => (
          <GalleryTile
            key={idx}
            item={item}
            onRemove={() => remove(idx)}
            dragHandlers={handlersFor(idx)}
            isDropTarget={overIdx === idx}
          />
        ))}
        {items.length === 0 && (
          <p style={{ fontSize: 13, color: C.text3 }}>No media yet — add an Image, Video, or PDF above.</p>
        )}
      </div>
    </div>
  );
}

// ─── Edit Card: Rate Service Panel ─────────────────────────────────────────────

function RateServicePanel({ prompt, onChange }) {
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>Rate Our Service</h2>
        <span style={{ fontSize: 11.5, color: C.text3 }}>Shown to customers on your card</span>
      </div>
      <div style={{ maxWidth: 760 }}>
        <Label>Prompt</Label>
        <textarea
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Please rate your interaction with me"
          rows={4}
          style={{
            width: "100%", padding: "12px 14px", fontSize: 14, fontFamily: F, color: C.text1,
            background: C.bgInput, border: `1.5px solid ${C.border}`, borderRadius: R.sm,
            outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
          <span style={{ fontSize: 12.5, color: C.text3 }}>Preview rating:</span>
          <StarRating value={5} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}


// ─── Edit Card: Generic placeholder panel for not-yet-built sections ──────────

function GenericSectionPanel({ section, onToggle }) {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 640 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: C.text1, fontFamily: FD, letterSpacing: "-0.02em" }}>{section.label}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.text3 }}>{section.enabled ? "Visible on card" : "Hidden from card"}</span>
          <Switch checked={section.enabled} onChange={onToggle} />
        </div>
      </div>
      <p style={{ margin: "0 0 20px", fontSize: 13, color: C.text3 }}>{section.meta}</p>

      <div
        style={{
          border: `1.5px dashed ${C.border}`, borderRadius: R.lg, padding: 28,
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10,
          background: C.bgPage,
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: R.md, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={section.icon} size={19} color={C.accent} />
        </div>
        <p style={{ margin: 0, fontSize: 13, color: C.text2, maxWidth: 320 }}>
          Editor for this section keeps the same pattern as Card Details / Contact Info — drag items, toggle visibility, and the live preview updates instantly.
        </p>
        <Btn style={{ height: 36, padding: "0 16px", fontSize: 13, marginTop: 4 }}>
          <Icon name="plus" size={14} color="#fff" /> Add item
        </Btn>
      </div>
    </div>
  );
}

// ─── Edit Card: Live Preview ───────────────────────────────────────────────────

function LivePreview({ cardData, contacts, sectionsById, previewMode, onPreviewMode, font }) {
  const showContact = sectionsById.contactInfo?.enabled;
  const showShare = sectionsById.shareConnect?.enabled;
  const isMobile = previewMode === "mobile";

  return (
    <div style={{ width: isMobile ? 320 : 480, flexShrink: 0, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", background: C.bgPage }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 650, color: C.text1, fontFamily: FD }}>Live Preview</span>
        <div style={{ display: "flex", border: `1.5px solid ${C.border}`, borderRadius: R.sm, overflow: "hidden" }}>
          {["mobile", "desktop"].map((m) => (
            <button
              key={m}
              onClick={() => onPreviewMode(m)}
              style={{
                padding: "5px 12px", fontSize: 12, fontWeight: 600, fontFamily: F, border: "none", cursor: "pointer",
                background: previewMode === m ? C.accent : "transparent",
                color: previewMode === m ? "#fff" : C.text2,
                textTransform: "capitalize",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "28px 16px", overflowY: "auto" }}>
        <div
          style={{
            width: isMobile ? 270 : 340, borderRadius: 28, background: "#0B0B0D", padding: 8,
            boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
          }}
        >
          <div style={{ borderRadius: 22, overflow: "hidden", background: "#fff" }}>
            {/* Banner */}
            <div style={{ height: 130, background: "linear-gradient(135deg,#8a7355,#3d3225)", position: "relative" }} />

            {/* Avatar */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: -38 }}>
              <div style={{ width: 76, height: 76, borderRadius: R.full, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: C.shadow.md, fontSize: 30 }}>
                🚗
              </div>
            </div>

            <div style={{ textAlign: "center", padding: "10px 20px 24px" }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#161618", fontFamily: `'${font}', ${FD}` }}>{cardData.displayName || cardData.cardName}</h3>
              <p style={{ margin: "2px 0 0", fontSize: 12.5, fontWeight: 600, color: "#3a3a3f" }}>{cardData.designation}</p>
              <p style={{ margin: "1px 0 10px", fontSize: 11.5, color: "#9a9aa0" }}>{cardData.moreDetail}</p>
              <p style={{ margin: "0 0 14px", fontSize: 10.5, lineHeight: 1.5, color: "#7a7a82" }}>{cardData.description}</p>

              {showContact && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {contacts.filter(c => c.enabled && c.value).map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                      <div style={{ width: 22, height: 22, borderRadius: R.full, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name={c.icon} size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: 10.5, color: "#3a3a3f", wordBreak: "break-all" }}>{c.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {showShare && (
                <>
                  <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#161618" }}>Share &amp; Connect</p>
                  <div style={{ background: "#E5484D", color: "#fff", borderRadius: R.sm, padding: "8px 0", fontSize: 11.5, fontWeight: 650 }}>
                    Save Card
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Card: Page ───────────────────────────────────────────────────────────

function EditCardPage({ card, onBack }) {
  const [sections, setSections] = useState(SECTIONS_INITIAL);
  const [activeId, setActiveId] = useState("cardDetails");
  const [search, setSearch] = useState("");
  const [previewMode, setPreviewMode] = useState("mobile");
  const [activeTheme, setActiveTheme] = useState("taboo");
  const [font, setFont] = useState(FONT_PAIRS[0]);

  const [cardData, setCardData] = useState({
    cardName: card?.name || "",
    email: "",
    displayName: card?.name ? card.name.replace(/([a-z])([A-Z])/g, "$1 $2") : "",
    designation: "Sales Representative",
    moreDetail: card?.company || "",
    description: "",
  });

  const [contacts, setContacts] = useState([
    { type: "email", label: "Email", color: "#4F46E5", icon: "mail", value: "", enabled: true },
    { type: "phone", label: "Phone", color: "#2FA563", icon: "phone", value: "", enabled: true },
  ]);

  const [socialLinks, setSocialLinks] = useState([
    { type: "whatsapp",  label: "WhatsApp",  color: "#25D366", icon: "messageCircle", value: "", enabled: true },
    { type: "instagram", label: "Instagram", color: "#D6249F", icon: "image",         value: "", enabled: true },
    { type: "linkedin",  label: "LinkedIn",  color: "#0A66C2", icon: "link2",         value: "", enabled: true },
    { type: "youtube",   label: "YouTube",   color: "#FF0000", icon: "play",          value: "", enabled: true },
    { type: "website",   label: "Website",   color: "#4F46E5", icon: "globe",         value: "", enabled: true },
  ]);

  const [businessHours, setBusinessHours] = useState(
    DAYS_OF_WEEK.map((day) => ({
      day,
      enabled: day !== "Saturday" && day !== "Sunday",
      start: "08:00",
      end: "17:00",
    }))
  );

  const [shareConnectOptions, setShareConnectOptions] = useState(SHARE_CONNECT_OPTIONS_INITIAL);

  const [appointmentSlots, setAppointmentSlots] = useState([
    { start: "09:00", end: "10:00", enabled: true },
    { start: "10:00", end: "11:00", enabled: true },
    { start: "11:00", end: "12:00", enabled: true },
  ]);

  const [services, setServices] = useState([
    { icon: "swap",  title: "Transactional",            desc: "", ctaLabel: "Read More", url: "" },
    { icon: "mapPin", title: "International Banking",    desc: "", ctaLabel: "Read More", url: "" },
  ]);

  const [googleMapEmbed, setGoogleMapEmbed] = useState("");
  const [customHtml, setCustomHtml] = useState("");

  const [testimonials, setTestimonials] = useState([
    { company: "", rating: 5, review: "" },
  ]);

  const [galleryItems, setGalleryItems] = useState([
    { type: "image" }, { type: "image" }, { type: "image" },
  ]);

  const [ratePrompt, setRatePrompt] = useState("Please rate your interaction with me");

  const sectionsById = {};
  sections.forEach(i => { sectionsById[i.id] = i; });
  const activeSection = sectionsById[activeId];

  const toggleEnabled = (itemId, val) => {
    setSections(prev => prev.map(i => i.id === itemId ? { ...i, enabled: val } : i));
  };

  // Drop a section directly onto another row: it's inserted right before that
  // row. Order is the only thing this represents now — no category to adopt.
  const reorder = (draggedId, targetId) => {
    setSections(prev => {
      const moved = prev.find(i => i.id === draggedId);
      const rest = prev.filter(i => i.id !== draggedId);
      const targetIdx = rest.findIndex(i => i.id === targetId);
      if (!moved || targetIdx === -1) return prev;
      const next = [...rest];
      next.splice(targetIdx, 0, moved);
      return next;
    });
  };

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", fontFamily: F, background: C.bgSurface }}>
      <div style={{ width: 268, flexShrink: 0, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", background: C.bgSurface }}>
        <TopTabs activeId={activeId} onSelect={setActiveId} />
        <SectionsPanel
          sections={sections}
          activeId={activeId}
          search={search}
          onSearch={setSearch}
          onSelect={setActiveId}
          onToggleEnabled={toggleEnabled}
          onReorder={reorder}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, overflowY: "auto", background: C.bgSurface }}>
        {activeId === "cardDetails" ? (
          <CardDetailsPanel data={cardData} onChange={setCardData} />
        ) : activeId === "contactInfo" ? (
          <ContactInfoPanel contacts={contacts} onChange={setContacts} />
        ) : activeId === "social" ? (
          <SocialPanel links={socialLinks} onChange={setSocialLinks} />
        ) : activeId === "businessHours" ? (
          <BusinessHoursPanel hours={businessHours} onChange={setBusinessHours} />
        ) : activeId === "shareConnect" ? (
          <ShareConnectPanel options={shareConnectOptions} onChange={setShareConnectOptions} />
        ) : activeId === "appointments" ? (
          <AppointmentsPanel slots={appointmentSlots} onChange={setAppointmentSlots} />
        ) : activeId === "services" ? (
          <ServicesPanel services={services} onChange={setServices} />
        ) : activeId === "googleMap" ? (
          <EmbedCodePanel
            title="Google Map"
            value={googleMapEmbed}
            onChange={setGoogleMapEmbed}
            savedLabel="Map link saved — will display on the card when enabled."
            placeholder="Paste a Google Maps embed <iframe> code here…"
          />
        ) : activeId === "customHtml" ? (
          <EmbedCodePanel
            title="Custom HTML"
            value={customHtml}
            onChange={setCustomHtml}
            savedLabel="HTML saved — will render on the card when enabled."
            placeholder="Paste any HTML or embed code (YouTube, forms, widgets)…"
          />
        ) : activeId === "testimonials" ? (
          <TestimonialsPanel testimonials={testimonials} onChange={setTestimonials} />
        ) : activeId === "gallery" ? (
          <GalleryPanel items={galleryItems} onChange={setGalleryItems} />
        ) : activeId === "rateService" ? (
          <RateServicePanel prompt={ratePrompt} onChange={setRatePrompt} />
        ) : activeId === "theme" ? (
          <ThemePickerPanel activeTheme={activeTheme} onSelectTheme={setActiveTheme} />
        ) : activeId === "styling" ? (
          <StylingPanel font={font} onFontChange={setFont} />
        ) : (
          <GenericSectionPanel
            section={activeSection}
            onToggle={(val) => toggleEnabled(activeId, val)}
          />
        )}
      </div>

      <LivePreview
        cardData={cardData}
        contacts={contacts}
        sectionsById={sectionsById}
        previewMode={previewMode}
        onPreviewMode={setPreviewMode}
        font={font}
      />
    </div>
  );
}

// ─── Admin Layout ──────────────────────────────────────────────────────────────

function AdminLayout({ user, onSignOut }) {
  const [activeNav, setActiveNav] = useState("cards");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editingCard, setEditingCard] = useState(null); // { item, type } | null

  const openEditor = (item, type) => setEditingCard({ item, type });
  const closeEditor = () => setEditingCard(null);

  const typeLabel = editingCard ? editingCard.type[0].toUpperCase() + editingCard.type.slice(1) : "";

  return (
    /* Absolute shell — fills App.jsx content container (below the selector bar) */
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        fontFamily: F,
      }}
    >
      {/* Sidebar — normal flex child, fills the shell height */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={(id) => { setEditingCard(null); setActiveNav(id); }}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(v => !v)}
        user={user}
        onSignOut={onSignOut}
      />

      {/* Content — flex:1 expands to fill all space right of the sidebar */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: C.bgPage,
        }}
      >
        <Topbar
          title={editingCard ? "Edit Card" : (NAV.find(n => n.id === activeNav)?.label || "Dashboard")}
          subtitle={
            editingCard ? `${editingCard.item.name} · ${editingCard.item.company} · ${typeLabel} Card` :
            activeNav === "dashboard" ? `Welcome back, ${user.firstName || "there"}` :
            activeNav === "cards" ? "Cards across all companies" :
            null
          }
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(v => !v)}
          user={user}
          onBack={editingCard ? closeEditor : null}
          actions={
            editingCard ? (
              <>
                <Btn variant="ghost" style={{ height: 36, padding: "0 14px", fontSize: 13 }}>
                  <Icon name="users" size={14} color={C.text2} /> Assign Card User
                </Btn>
                <Btn variant="ghost" style={{ height: 36, padding: "0 14px", fontSize: 13 }}>
                  <Icon name="eye" size={14} color={C.text2} /> Preview
                </Btn>
                <Btn variant="ghost" style={{ height: 36, padding: "0 14px", fontSize: 13 }}>
                  <Icon name="share" size={14} color={C.text2} /> Share
                </Btn>
                <Btn onClick={closeEditor} style={{ height: 36, padding: "0 16px", fontSize: 13 }}>
                  Save &amp; Publish
                </Btn>
              </>
            ) : activeNav === "cards" ? (
              <Btn style={{ height: 36, padding: "0 16px", fontSize: 13.5 }}>
                <Icon name="plus" size={15} color="#fff" />
                New Card
              </Btn>
            ) : null
          }
        />

        <main style={{ flex: 1, overflowY: "auto", background: darkMode ? "#13151C" : C.bgPage, transition: "background 0.25s", position: "relative" }}>
          {editingCard ? (
            <EditCardPage card={editingCard.item} onBack={closeEditor} />
          ) : activeNav === "cards" ? (
            <AllCardsPage onEditCard={openEditor} />
          ) : (
            <DashboardPlaceholder user={user} />
          )}
        </main>
      </div>
    </div>
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
