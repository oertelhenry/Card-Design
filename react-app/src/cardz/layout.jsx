import { useState, useRef, useEffect } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────

const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const C = {
  bgPage:        "#F2F2F7",
  bgSurface:     "#FFFFFF",
  bgInput:       "#F9F9FB",
  bgInputFocus:  "#FFFFFF",

  sidebar:       "#0F1117",
  sidebarBorder: "rgba(255,255,255,0.06)",
  sidebarText:   "#E5E5EA",
  sidebarMuted:  "#5A5A63",
  sidebarActive: "#4DA3FF",
  sidebarActiveBg: "rgba(10,132,255,0.13)",
  sidebarHover:  "rgba(255,255,255,0.05)",

  accent:        "#0A84FF",
  accentHover:   "#0071E3",
  accentLight:   "rgba(10,132,255,0.09)",

  text1:         "#1D1D1F",
  text2:         "#6E6E73",
  text3:         "#AEAEB2",

  border:        "#E4E4E9",
  borderFocus:   "#0A84FF",

  danger:        "#FF3B30",
  dangerBg:      "rgba(255,59,48,0.07)",
  success:       "#34C759",
  warning:       "#FF9500",

  shadow: {
    sm:   "0 1px 4px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.04)",
    md:   "0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
    lg:   "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)",
    form: "0 20px 60px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
    dropdown: "0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
  },
};

const R = { xs: 6, sm: 8, md: 11, lg: 14, xl: 18, full: 9999 };

// ─── Icon Component ─────────────────────────────────────────────────────────────

function Icon({ name, size = 18, color = "currentColor", style = {} }) {
  const base = {
    width: size, height: size,
    viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth: 1.75,
    strokeLinecap: "round", strokeLinejoin: "round",
    display: "block", flexShrink: 0,
    ...style,
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
      return <svg {...base} strokeWidth={1.5}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="5" y="5" width="3" height="3" fill={color} stroke="none"/><rect x="16" y="5" width="3" height="3" fill={color} stroke="none"/><rect x="5" y="16" width="3" height="3" fill={color} stroke="none"/><path d="M14 14h3v3m4 0v4m-4 0h4m-4-4h4"/></svg>;
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
          boxShadow: focused ? `0 0 0 3px rgba(10,132,255,0.12)` : "none",
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
          ? hovered ? "0 2px 10px rgba(10,132,255,0.35)" : "0 1px 4px rgba(10,132,255,0.22)"
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
          background: "linear-gradient(145deg, #1A6EFF 0%, #0A5BE5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(10,100,255,0.30)",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 800, fontSize: Math.round(size * 0.41), fontFamily: F, letterSpacing: "-0.02em" }}>
          C
        </span>
      </div>
      {!collapsed && (
        <span style={{ color: C.sidebarText, fontWeight: 700, fontSize: 16, fontFamily: F, letterSpacing: "-0.02em" }}>
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
              fontSize: 26,
              fontWeight: 700,
              color: C.text1,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
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
              fontSize: 26,
              fontWeight: 700,
              color: C.text1,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
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
        padding: collapsed ? "10px 0" : "9px 12px",
        borderRadius: R.sm,
        border: "none",
        cursor: "pointer",
        background: active ? C.sidebarActiveBg : hovered ? C.sidebarHover : "transparent",
        transition: "background 0.13s",
        marginBottom: 2,
        fontFamily: F,
        position: "relative",
      }}
    >
      {active && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            height: "60%",
            width: 3,
            background: C.sidebarActive,
            borderRadius: "0 3px 3px 0",
          }}
        />
      )}
      <Icon
        name={item.icon}
        size={17}
        color={active ? C.sidebarActive : hovered ? C.sidebarText : C.sidebarMuted}
        style={{ transition: "color 0.13s" }}
      />
      {!collapsed && (
        <span
          style={{
            fontSize: 13.5,
            fontWeight: active ? 550 : 430,
            color: active ? C.sidebarActive : hovered ? C.sidebarText : "#9A9AA5",
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
              background: "linear-gradient(135deg, #0A84FF 0%, #6C56E0 100%)",
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

function Topbar({ title, subtitle, darkMode, onToggleDark, user }) {
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") || "?";
  const [avatarHover, setAvatarHover] = useState(false);

  return (
    <header
      style={{
        height: 56,
        background: C.bgSurface,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px 0 28px",
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Left: title area */}
      <div>
        {title && (
          <div
            style={{
              fontSize: 16,
              fontWeight: 650,
              color: C.text1,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: F,
            }}
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div
            style={{
              fontSize: 12,
              color: C.text3,
              marginTop: 1,
              fontFamily: F,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: C.bgInput,
            border: `1.5px solid ${C.border}`,
            borderRadius: R.sm,
            padding: "0 12px",
            height: 34,
            cursor: "text",
          }}
        >
          <Icon name="search" size={14} color={C.text3} />
          <span style={{ fontSize: 13, color: C.text3, fontFamily: F }}>Search…</span>
          <kbd
            style={{
              fontSize: 10.5,
              color: C.text3,
              background: C.bgPage,
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: "1px 5px",
              fontFamily: F,
              letterSpacing: "0.02em",
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          style={{
            width: 34,
            height: 34,
            borderRadius: R.sm,
            border: `1.5px solid ${C.border}`,
            background: C.bgInput,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.13s",
            color: C.text2,
          }}
        >
          <Icon name={darkMode ? "sun" : "moon"} size={15} color={C.text2} />
        </button>

        {/* Avatar */}
        <div
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          style={{
            width: 34,
            height: 34,
            borderRadius: R.full,
            background: "linear-gradient(135deg, #0A84FF 0%, #6C56E0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 700,
            fontFamily: F,
            letterSpacing: "0.02em",
            boxShadow: avatarHover ? "0 0 0 3px rgba(10,132,255,0.20)" : "none",
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
          background: "linear-gradient(145deg, #1A6EFF 0%, #0A5BE5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
          boxShadow: "0 4px 16px rgba(10,100,255,0.24)",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>C</span>
      </div>
      <h2
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 650,
          color: C.text1,
          letterSpacing: "-0.02em",
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

// ─── Admin Layout ──────────────────────────────────────────────────────────────

function AdminLayout({ user, onSignOut }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
        onNavChange={setActiveNav}
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
          title={NAV.find(n => n.id === activeNav)?.label || "Dashboard"}
          subtitle={activeNav === "dashboard" ? `Welcome back, ${user.firstName || "there"}` : null}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(v => !v)}
          user={user}
        />

        <main style={{ flex: 1, overflowY: "auto", background: C.bgPage }}>
          <DashboardPlaceholder user={user} />
        </main>
      </div>
    </div>
  );
}

// ─── Root Export ───────────────────────────────────────────────────────────────

export default function CardzApp() {
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
