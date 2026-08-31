/* ============================================================================
   LoginRegister — Cardify authentication screen
   Pixel-faithful rebuild of: LoginRegister.mp4

   The recording shows a single screen — the "Welcome back" sign-in view — at
   two widths:
     • DESKTOP  — 50/50 split: photographic brand panel (left) + form (right)
     • MOBILE   — the form alone, as a centred card on a cream canvas, with the
                  Cardify wordmark moved to the top of the card

   Both layouts live in this one file. A Desktop / Mobile pill (top-right,
   mirroring the recording) switches the preview frame; the layout also reflows
   automatically to the real viewport width.

   The file name says "LoginRegister" but the register screen never appears in
   the recording, so only the login view is reproduced here. The right-hand
   column is factored into <AuthForm mode="login" />; a "register" mode is
   stubbed with the same tokens so the file can grow into the second screen.

   Self-contained — inline styles, internal state, no external deps beyond React
   and Google Fonts.
   ========================================================================== */

import { useEffect, useState } from "react";
import loginBannerImg from "./assets/loginbanner.jpg";

// ─── Fonts ────────────────────────────────────────────────────────────────────
function useFontLoader() {
  useEffect(() => {
    const id = "cardify-auth-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?" +
      "family=Inter:wght@400;500;600;700;800" +
      "&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500" +
      "&display=swap";
    document.head.appendChild(link);
  }, []);
}

const SANS = "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const SERIF = "'Newsreader', Georgia, 'Times New Roman', serif";

// ─── Palette — sampled from LoginRegister.mp4 ─────────────────────────────────
const C = {
  brand: "#B74E2E", // logo tile + primary button + links
  brandText: "#FFFFFF",

  canvas: "#F7F2EA", // page behind the mobile card
  surface: "#FCF8F2", // right panel / card fill
  frame: "#EFE6D9", // hairline around the whole desktop stage

  ink: "#221C18", // headings
  body: "#6E655E", // secondary copy
  muted: "#B6A794", // OR label, footer links
  placeholder: "#A9A19A",

  field: "#FFFEFC", // input + google button fill
  fieldBorder: "#E7DFD2",
  divider: "#E8DFD1",

  // left brand panel
  panelInk: "#FFFFFF",
  panelMuted: "rgba(255,255,255,0.66)",
  panelChip: "rgba(255,255,255,0.12)",
  panelChipBorder: "rgba(255,255,255,0.22)",
};

// The recording uses a warm, low-key photo of a person in a suit holding a
// phone, over golden bokeh — bundled from src/assets so Vite serves it.
const HERO_IMG = loginBannerImg;

const HERO_OVERLAY =
  "linear-gradient(180deg, rgba(40,24,17,0.55) 0%, rgba(46,28,20,0.62) 45%, rgba(30,18,13,0.82) 100%)";

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────
function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function EyeOff({ size = 18, color = "#9A928B" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 2l20 20M6.7 6.7C4.6 8 3 10 2 12c2.5 5 7 8 10 8 2 0 4-.6 5.7-1.7M9.9 5.2A9.8 9.8 0 0112 5c3 0 7.5 3 10 7-.7 1.4-1.7 2.7-2.8 3.8M9.9 9.9a3 3 0 004.2 4.2"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserGlyph({ size = 20, color = "#FFFFFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.6" stroke={color} strokeWidth="1.7" />
      <path
        d="M5 19.2c1.4-3.1 4-4.7 7-4.7s5.6 1.6 7 4.7"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Brand mark
// ─────────────────────────────────────────────────────────────────────────────
function Logo({ tile = 40, gap = 12, wordSize = 20, dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      <div
        style={{
          width: tile,
          height: tile,
          borderRadius: tile * 0.28,
          background: C.brand,
          display: "grid",
          placeItems: "center",
          color: "#FFFFFF",
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: tile * 0.5,
          lineHeight: 1,
          boxShadow: "0 6px 16px rgba(183,78,46,0.28)",
        }}
      >
        C
      </div>
      <span
        style={{
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: wordSize,
          letterSpacing: "-0.01em",
          color: dark ? C.ink : C.panelInk,
        }}
      >
        Cardify
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Left brand panel (desktop only)
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { n: "50K+", l: "Cards Created" },
  { n: "98%", l: "Satisfaction" },
  { n: "120+", l: "Countries" },
];

function BrandPanel() {
  return (
    <div
      style={{
        position: "relative",
        flex: "1 1 50%",
        minWidth: 0,
        overflow: "hidden",
        color: C.panelInk,
        fontFamily: SANS,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `${HERO_OVERLAY}, url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 60px",
        }}
      >
        <Logo />

        <div style={{ maxWidth: 470 }}>
          <p
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 31,
              lineHeight: 1.36,
              letterSpacing: "0.01em",
            }}
          >
            &ldquo;Your digital identity, crafted to make every introduction
            unforgettable.&rdquo;
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 30 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: C.panelChip,
                border: `1px solid ${C.panelChipBorder}`,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <UserGlyph />
            </div>
            <div style={{ lineHeight: 1.4 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>
                Trusted by 10,000+ professionals
              </div>
              <div style={{ fontSize: 13, color: C.panelMuted }}>
                Digital cards created worldwide
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          {STATS.map((s) => (
            <div key={s.l}>
              <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.01em" }}>{s.n}</div>
              <div style={{ fontSize: 13, color: C.panelMuted, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Form primitives
// ─────────────────────────────────────────────────────────────────────────────
function Field({ label, trailing, type = "text", placeholder, adornment }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <label
          style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13.5, color: C.ink }}
        >
          {label}
        </label>
        {trailing}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: 52,
            boxSizing: "border-box",
            padding: adornment ? "0 44px 0 16px" : "0 16px",
            borderRadius: 12,
            border: `1px solid ${C.fieldBorder}`,
            background: C.field,
            fontFamily: SANS,
            fontSize: 15,
            color: C.ink,
            outline: "none",
          }}
        />
        {adornment && (
          <span
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            {adornment}
          </span>
        )}
      </div>
    </div>
  );
}

function OrDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "22px 0" }}>
      <span style={{ flex: 1, height: 1, background: C.divider }} />
      <span
        style={{
          fontFamily: SANS,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.14em",
          color: C.muted,
        }}
      >
        OR
      </span>
      <span style={{ flex: 1, height: 1, background: C.divider }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth form — the right-hand column
// ─────────────────────────────────────────────────────────────────────────────
function AuthForm({ mode = "login", showLogo = false }) {
  const isLogin = mode === "login";

  return (
    <div style={{ width: "100%", maxWidth: 442, fontFamily: SANS }}>
      {showLogo && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 34 }}>
          <Logo dark tile={40} wordSize={20} />
        </div>
      )}

      <h1
        style={{
          margin: 0,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 34,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: C.ink,
        }}
      >
        {isLogin ? "Welcome back" : "Create your account"}
      </h1>
      <p style={{ margin: "8px 0 0", fontSize: 15, color: C.body }}>
        {isLogin
          ? "Sign in to your account to continue"
          : "Start crafting your digital identity — it's free"}
      </p>

      <button
        type="button"
        style={{
          marginTop: 28,
          width: "100%",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          borderRadius: 12,
          border: `1px solid ${C.fieldBorder}`,
          background: C.field,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 15,
          color: C.ink,
          cursor: "pointer",
        }}
      >
        <GoogleG />
        Continue with Google
      </button>

      <OrDivider />

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field
          label="Username or email"
          placeholder="Enter your username or email"
        />
        <Field
          label="Password"
          type="password"
          placeholder="Enter your password"
          adornment={<EyeOff />}
          trailing={
            isLogin ? (
              <a
                href="#forgot"
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.brand,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
            ) : null
          }
        />
      </div>

      <button
        type="button"
        style={{
          marginTop: 22,
          width: "100%",
          height: 54,
          borderRadius: 12,
          border: "none",
          background: C.brand,
          color: C.brandText,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
          boxShadow: "0 10px 22px rgba(183,78,46,0.22)",
        }}
      >
        {isLogin ? "Sign in" : "Create account"}
      </button>

      <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 14, color: C.body }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a
          href={isLogin ? "#register" : "#login"}
          style={{ color: C.brand, fontWeight: 700, textDecoration: "none" }}
        >
          {isLogin ? "Create one free" : "Sign in"}
        </a>
      </p>

      <div style={{ height: 1, background: C.divider, margin: "28px 0 0" }} />

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          fontSize: 13,
          color: C.muted,
        }}
      >
        {["Terms of Service", "Privacy Policy", "Billing & Refunds"].map((t, i) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {i > 0 && <span style={{ opacity: 0.6 }}>·</span>}
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              {t}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Frames
// ─────────────────────────────────────────────────────────────────────────────
function DesktopStage() {
  return (
    <div
      style={{
        width: "min(1280px, 96vw)",
        height: "min(760px, 88vh)",
        display: "flex",
        borderRadius: 16,
        overflow: "hidden",
        background: C.surface,
        border: `1px solid ${C.frame}`,
        boxShadow: "0 30px 80px rgba(40,24,17,0.16)",
      }}
    >
      <BrandPanel />
      <div
        style={{
          flex: "1 1 50%",
          minWidth: 0,
          background: C.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 56px",
        }}
      >
        <AuthForm mode="login" />
      </div>
    </div>
  );
}

function MobileStage() {
  return (
    <div
      style={{
        width: 390,
        maxWidth: "94vw",
        minHeight: "min(780px, 92vh)",
        background: C.canvas,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        borderRadius: 20,
        border: `1px solid ${C.frame}`,
      }}
    >
      <div
        style={{
          width: "100%",
          background: C.surface,
          border: "1px solid rgba(34,28,24,0.07)",
          borderRadius: 20,
          padding: "30px 26px 26px",
          boxShadow: "0 20px 50px rgba(40,24,17,0.10)",
        }}
      >
        <AuthForm mode="login" showLogo />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Preview shell — Desktop / Mobile pill (mirrors the recording)
// ─────────────────────────────────────────────────────────────────────────────
export default function LoginRegister() {
  useFontLoader();
  const [view, setView] = useState("desktop");

  useEffect(() => {
    const sync = () => {
      if (window.innerWidth < 820) setView("mobile");
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.canvas,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: SANS,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 4,
          padding: 4,
          borderRadius: 999,
          background: "#FFFFFF",
          border: `1px solid ${C.fieldBorder}`,
          boxShadow: "0 6px 18px rgba(40,24,17,0.12)",
        }}
      >
        {["desktop", "mobile"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            style={{
              border: "none",
              cursor: "pointer",
              padding: "7px 16px",
              borderRadius: 999,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "capitalize",
              background: view === v ? C.brand : "transparent",
              color: view === v ? "#FFFFFF" : C.body,
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "desktop" ? <DesktopStage /> : <MobileStage />}
    </div>
  );
}
