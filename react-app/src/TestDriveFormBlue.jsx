import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  :root {
    --bg: #f0f4fa;
    --bg2: #e6ecf6;
    --surface: #ffffff;
    --surface2: #f4f7fc;
    --border: rgba(30,60,140,0.1);
    --border-focus: rgba(37,99,235,0.5);
    --blue: #1d4ed8;
    --blue-mid: #2563eb;
    --blue-light: #3b82f6;
    --blue-dim: rgba(37,99,235,0.09);
    --blue-glow: rgba(37,99,235,0.14);
    --navy: #0f2563;
    --text-primary: #0d1b3e;
    --text-secondary: rgba(13,27,62,0.52);
    --text-muted: rgba(13,27,62,0.32);
    --error: #dc2626;
    --success: #059669;
    --radius: 22px;
    --radius-sm: 14px;
    --shadow: 0 2px 20px rgba(29,78,216,0.07), 0 1px 4px rgba(29,78,216,0.04);
    --shadow-lg: 0 12px 60px rgba(29,78,216,0.12), 0 2px 8px rgba(29,78,216,0.06);
  }

  html, body, #root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Inter', sans-serif;
  }

  .app-wrapper {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .app-wrapper::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(ellipse 500px 350px at 90% -5%, rgba(59,130,246,0.13) 0%, transparent 70%),
      radial-gradient(ellipse 400px 400px at -5% 90%, rgba(29,78,216,0.09) 0%, transparent 70%),
      radial-gradient(ellipse 300px 300px at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ─── PAGE ─── */
  .page {
    width: 100%;
    max-width: 430px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    animation: pageIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  @keyframes pageIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── TOP NAV BAR ─── */
  .nav-bar {
    background: var(--navy);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 20px rgba(15,37,99,0.25);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: var(--blue-mid);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-icon svg { color: #fff; }

  .nav-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.01em;
  }

  .nav-badge {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px;
    padding: 4px 11px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.06em;
  }

  /* ─── HERO BAND ─── */
  .hero-band {
    background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%);
    padding: 32px 28px 40px;
    position: relative;
    overflow: hidden;
  }

  .hero-band::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }

  .hero-band::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 32px;
    background: var(--bg);
    clip-path: ellipse(55% 100% at 50% 100%);
  }

  .hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(147,197,253,0.9);
    margin-bottom: 10px;
    position: relative; z-index: 1;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.5px;
    position: relative; z-index: 1;
    margin-bottom: 10px;
  }

  .hero-title span {
    color: #93c5fd;
  }

  .hero-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    font-weight: 300;
    max-width: 280px;
    position: relative; z-index: 1;
  }

  /* ─── SECTION LABEL ─── */
  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 24px 28px 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ─── FORM CARD ─── */
  .form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin: 0 16px;
    padding: 24px 22px;
    box-shadow: var(--shadow-lg);
  }

  /* ─── FIELD ─── */
  .field {
    margin-bottom: 16px;
  }

  .field:last-of-type { margin-bottom: 0; }

  .field-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 7px;
    padding-left: 2px;
  }

  .field-required {
    color: var(--blue-mid);
    font-size: 14px;
    line-height: 1;
  }

  .field-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .field-icon {
    position: absolute;
    left: 15px;
    color: var(--text-muted);
    pointer-events: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }

  .field-input {
    width: 100%;
    background: var(--surface2);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px 14px 46px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: var(--text-primary);
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }

  .field-input::placeholder {
    color: var(--text-muted);
    font-weight: 300;
  }

  .field-input:focus {
    border-color: var(--border-focus);
    background: #fff;
    box-shadow: 0 0 0 4px var(--blue-glow);
  }

  .field-input-wrap:focus-within .field-icon {
    color: var(--blue-mid);
  }

  .field-input.has-error {
    border-color: var(--error);
    box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
  }

  .field-error {
    font-size: 12px;
    color: var(--error);
    margin-top: 6px;
    padding-left: 2px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* ─── INFO ROW (2 cols) ─── */
  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .field-row .field {
    margin-bottom: 0;
  }

  /* ─── SUBMIT ─── */
  .submit-wrap {
    padding: 20px 16px 8px;
  }

  .submit-btn {
    width: 100%;
    padding: 17px;
    background: linear-gradient(135deg, var(--navy) 0%, var(--blue-mid) 100%);
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
    box-shadow: 0 6px 28px rgba(29,78,216,0.4);
    -webkit-tap-highlight-color: transparent;
  }

  .submit-btn:hover {
    filter: brightness(1.08);
    box-shadow: 0 10px 36px rgba(29,78,216,0.5);
  }

  .submit-btn:active { transform: scale(0.98); }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .btn-arrow { transition: transform 0.2s; }
  .submit-btn:hover .btn-arrow { transform: translateX(4px); }

  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
    background-size: 200% 100%;
    background-position: -100% 0;
    transition: background-position 0.5s;
  }
  .submit-btn:hover::before { background-position: 200% 0; }

  /* ─── PROGRESS ─── */
  .progress-wrap {
    padding: 16px 28px 6px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .progress-bar {
    flex: 1; height: 3px;
    border-radius: 2px;
    background: var(--border);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--navy), var(--blue-light));
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  .progress-text {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  /* ─── FOOTER ─── */
  .footer-note {
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    padding: 10px 32px 40px;
    line-height: 1.7;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .lock-row {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-muted);
    font-weight: 500;
  }

  /* ════════════════════════════
     THANK YOU PAGE
  ════════════════════════════ */

  .ty-page {
    width: 100%;
    max-width: 430px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    animation: pageIn 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* ─── TY HERO ─── */
  .ty-hero {
    background: linear-gradient(160deg, var(--navy) 0%, var(--blue) 60%, var(--blue-light) 100%);
    padding: 52px 28px 60px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ty-hero::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 40px;
    background: var(--bg);
    clip-path: ellipse(55% 100% at 50% 100%);
  }

  /* decorative circles */
  .ty-deco-1 {
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
  }

  .ty-deco-2 {
    position: absolute;
    bottom: 20px; left: -40px;
    width: 140px; height: 140px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .ty-check-outer {
    position: relative;
    width: 90px; height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    z-index: 1;
    animation: iconPop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
  }

  @keyframes iconPop {
    from { opacity: 0; transform: scale(0.3); }
    to   { opacity: 1; transform: scale(1); }
  }

  .ty-check-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.25);
    animation: ringPulse 2.5s ease-in-out infinite;
  }

  @keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.1); opacity: 0.1; }
  }

  .ty-check-circle {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: 1.5px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ty-check-circle svg { color: #fff; }

  .ty-hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(147,197,253,0.85);
    margin-bottom: 8px;
    z-index: 1;
    animation: fadeSlidUp 0.5s ease 0.35s both;
  }

  .ty-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: 40px;
    font-weight: 800;
    color: #fff;
    text-align: center;
    line-height: 1.1;
    letter-spacing: -0.5px;
    z-index: 1;
    animation: fadeSlidUp 0.5s ease 0.45s both;
  }

  .ty-hero-title span {
    color: #93c5fd;
  }

  @keyframes fadeSlidUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── STATS ROW ─── */
  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 28px 16px 0;
    animation: fadeSlidUp 0.5s ease 0.55s both;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    box-shadow: var(--shadow);
  }

  .stat-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: var(--blue-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }

  .stat-icon svg { color: var(--blue-mid); }

  .stat-val {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1;
  }

  .stat-label {
    font-size: 10px;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: center;
  }

  /* ─── CONFIRMATION CARD ─── */
  .confirm-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin: 16px 16px 0;
    padding: 24px 22px;
    box-shadow: var(--shadow-lg);
    animation: fadeSlidUp 0.5s ease 0.65s both;
  }

  .confirm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .confirm-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: 0.01em;
  }

  .confirm-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(5,150,105,0.1);
    border: 1px solid rgba(5,150,105,0.25);
    color: var(--success);
    border-radius: 100px;
    padding: 4px 11px;
    font-size: 11px;
    font-weight: 600;
  }

  .confirm-rows {
    display: grid;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .confirm-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
  }

  .confirm-row:last-child { border-bottom: none; }

  .confirm-key {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .confirm-val {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
    text-align: right;
  }

  /* ─── CAR BANNER ─── */
  .car-banner {
    margin: 16px 16px 0;
    background: linear-gradient(135deg, var(--navy) 0%, var(--blue-mid) 100%);
    border-radius: var(--radius);
    padding: 28px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(29,78,216,0.35);
    animation: fadeSlidUp 0.5s ease 0.75s both;
  }

  .car-banner::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
  }

  .car-banner-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(147,197,253,0.8);
    margin-bottom: 16px;
    position: relative; z-index: 1;
  }

  .car-float {
    position: relative; z-index: 1;
    animation: carFloat 3.5s ease-in-out infinite;
  }

  @keyframes carFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  .car-banner-tagline {
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    margin-top: 14px;
    position: relative; z-index: 1;
    font-weight: 300;
    font-style: italic;
  }

  /* ─── FOOTER ─── */
  .ty-footer {
    padding: 20px 28px 48px;
    text-align: center;
    animation: fadeSlidUp 0.5s ease 0.85s both;
  }

  .ty-footer-text {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.8;
  }

  .ty-footer-text strong {
    color: var(--blue-mid);
    font-weight: 600;
  }
`;

// ─── ICONS ───────────────────────────────────────────────────

const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="btn-arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const CarNavIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v6a2 2 0 0 1-2 2h-2"/>
    <circle cx="7" cy="17" r="2"/><circle cx="15" cy="17" r="2"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 8 8"/><path d="M22 12h-4"/>
  </svg>
);

const RouteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3"/><path d="M9 19h8.5c.4 0 .9-.2 1.2-.5l2.9-3c.7-.7.7-1.8 0-2.5L19.5 12"/><path d="M6 16V7c0-1.1.9-2 2-2h6"/>
    <circle cx="18" cy="5" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const BlueCar = () => (
  <svg width="210" height="82" viewBox="0 0 210 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="36" width="170" height="28" rx="7" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
    <path d="M52 36 C64 14 148 14 158 36 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
    <rect x="65" y="18" width="32" height="16" rx="3.5" fill="rgba(147,197,253,0.25)" stroke="rgba(147,197,253,0.4)" strokeWidth="0.8"/>
    <rect x="103" y="18" width="32" height="16" rx="3.5" fill="rgba(147,197,253,0.25)" stroke="rgba(147,197,253,0.4)" strokeWidth="0.8"/>
    <circle cx="57" cy="64" r="11" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
    <circle cx="57" cy="64" r="5.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
    <circle cx="153" cy="64" r="11" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
    <circle cx="153" cy="64" r="5.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
    <rect x="18" y="50" width="18" height="9" rx="3" fill="rgba(255,240,150,0.65)"/>
    <rect x="170" y="50" width="18" height="9" rx="3" fill="rgba(255,120,100,0.5)"/>
    <ellipse cx="105" cy="77" rx="80" ry="4.5" fill="rgba(0,0,0,0.15)"/>
  </svg>
);

// ─── FORM PAGE ────────────────────────────────────────────────

function FormPage({ onSubmit }) {
  const [values, setValues] = useState({ name: "", surname: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "First name is required";
    if (!values.surname.trim()) e.surname = "Surname is required";
    if (!values.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email";
    if (!values.phone.trim()) e.phone = "Contact number is required";
    else if (!/^[\d\s\+\-\(\)]{7,}$/.test(values.phone)) e.phone = "Enter a valid number";
    return e;
  };

  const handleChange = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    onSubmit(values);
  };

  return (
    <div className="page">
      {/* Nav */}
      <div className="nav-bar">
        <div className="nav-brand">
          <div className="nav-icon"><CarNavIcon /></div>
          <span className="nav-title">Test Drive</span>
        </div>
        <div className="nav-badge">Test Drive</div>
      </div>

      {/* Hero */}
      <div className="hero-band">
        <div className="hero-eyebrow">Registration Form</div>
        <h1 className="hero-title">Your test drive<br /><span>starts here.</span></h1>
        <p className="hero-sub">Fill in your details below, buckle up, and enjoy the drive!</p>
      </div>

      {/* Form */}
      <div className="section-label">Your Information</div>

      <div className="form-card">
        <div className="field-row">
          <div className="field">
            <label className="field-label" htmlFor="name">
              First Name <span className="field-required">*</span>
            </label>
            <div className="field-input-wrap">
              <span className="field-icon"><UserIcon /></span>
              <input
                id="name" type="text" autoComplete="given-name"
                className={`field-input${errors.name ? " has-error" : ""}`}
                placeholder="James"
                value={values.name} onChange={handleChange("name")}
              />
            </div>
            {errors.name && <div className="field-error"><ErrIcon />{errors.name}</div>}
          </div>

          <div className="field">
            <label className="field-label" htmlFor="surname">
              Surname <span className="field-required">*</span>
            </label>
            <div className="field-input-wrap">
              <span className="field-icon"><UserIcon /></span>
              <input
                id="surname" type="text" autoComplete="family-name"
                className={`field-input${errors.surname ? " has-error" : ""}`}
                placeholder="Anderson"
                value={values.surname} onChange={handleChange("surname")}
              />
            </div>
            {errors.surname && <div className="field-error"><ErrIcon />{errors.surname}</div>}
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="email">
            Email Address <span className="field-required">*</span>
          </label>
          <div className="field-input-wrap">
            <span className="field-icon"><MailIcon /></span>
            <input
              id="email" type="email" autoComplete="email"
              className={`field-input${errors.email ? " has-error" : ""}`}
              placeholder="you@example.com"
              value={values.email} onChange={handleChange("email")}
            />
          </div>
          {errors.email && <div className="field-error"><ErrIcon />{errors.email}</div>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="phone">
            Contact Number <span className="field-required">*</span>
          </label>
          <div className="field-input-wrap">
            <span className="field-icon"><PhoneIcon /></span>
            <input
              id="phone" type="tel" autoComplete="tel"
              className={`field-input${errors.phone ? " has-error" : ""}`}
              placeholder="+27 82 000 0000"
              value={values.phone} onChange={handleChange("phone")}
            />
          </div>
          {errors.phone && <div className="field-error"><ErrIcon />{errors.phone}</div>}
        </div>
      </div>

      <div className="submit-wrap">
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          <div className="submit-btn-inner">
            {loading ? "Confirming…" : <>Begin Test Drive <ArrowIcon /></>}
          </div>
        </button>
      </div>

      <div className="progress-wrap">
        <div className="progress-bar"><div className="progress-fill" style={{ width: "50%" }} /></div>
        <span className="progress-text">Step 1 / 2</span>
      </div>

      <div className="footer-note">
        <div className="lock-row"><LockIcon /><span>Secured &amp; Confidential</span></div>
        Your data is used solely for this test drive session.
      </div>
    </div>
  );
}

const ErrIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

// ─── THANK YOU PAGE ───────────────────────────────────────────

function ThankYouPage({ data }) {
  return (
    <div className="ty-page">
      <div className="ty-hero">
        <div className="ty-deco-1" />
        <div className="ty-deco-2" />

        <div className="ty-check-outer">
          <div className="ty-check-ring" />
          <div className="ty-check-circle"><CheckIcon /></div>
        </div>

        <div className="ty-hero-eyebrow">You're All Set</div>
        <h2 className="ty-hero-title">Welcome,<br /><span>{data.name}!</span></h2>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {[
          { icon: <SpeedIcon />, val: "Now",   label: "Ready" },
          { icon: <RouteIcon />, val: "Open",  label: "Route" },
          { icon: <ClockIcon />, val: "30m",   label: "Drive" },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Confirmation */}
      <div className="confirm-card">
        <div className="confirm-header">
          <span className="confirm-title">Booking Summary</span>
          <span className="confirm-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            Confirmed
          </span>
        </div>

        <div className="confirm-rows">
          {[
            { key: "Full Name", val: `${data.name} ${data.surname}` },
            { key: "Email",     val: data.email },
            { key: "Contact",   val: data.phone },
          ].map(r => (
            <div className="confirm-row" key={r.key}>
              <span className="confirm-key">{r.key}</span>
              <span className="confirm-val">{r.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Car */}
      <div className="car-banner">
        <div className="car-banner-label">The Road Awaits</div>
        <div className="car-float"><BlueCar /></div>
        <p className="car-banner-tagline">"Feel every curve, every corner."</p>
      </div>

      <div className="progress-wrap" style={{ padding: "20px 28px 6px" }}>
        <div className="progress-bar"><div className="progress-fill" style={{ width: "100%" }} /></div>
        <span className="progress-text">Step 2 / 2</span>
      </div>

      <div className="ty-footer">
        <p className="ty-footer-text">
          A consultant will be with you momentarily.<br />
          <strong>Enjoy your drive — drive safe!</strong>
        </p>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        {submitted
          ? <ThankYouPage data={formData} />
          : <FormPage onSubmit={(d) => { setFormData(d); setSubmitted(true); }} />}
      </div>
    </>
  );
}
