/**
 * BuildQuote Platform — Property Developer Module
 * Apple HIG — Liquid Glass Design System (matches BuildQuotePlatform.jsx)
 *
 * NEW ROLE: Property Developer
 * A developer owns land subdivided into stands (erven), offers a catalogue of
 * predefined house designs per stand, and shares an interactive "explorer"
 * link with interested clients. The system auto-checks whether a chosen house
 * design fits a chosen stand (footprint vs. stand size, coverage & setbacks).
 *
 * Screens in this file:
 *  D1. Developer Dashboard        — portfolio stats, developments, leads, activity
 *  D2. Create Development         — 5-step wizard (Details → Layout → Stands → House Plans → Review)
 *  D3. Development Detail         — interactive estate map, stands, plans, fit matrix, leads
 *  D4. Share-with-Client modal    — generate & track explorer links
 *  D5. Client Explorer            — what the client sees at home (stand + house play space)
 *  D6. Messages                   — developer ↔ client conversations
 *  D7. Company Profile            — company details, branding, team, compliance docs
 *  D8. Profile & Settings         — personal account
 *
 * Integration notes (for merging into BuildQuotePlatform.jsx):
 *  - Add role "developer" to WelcomeScreen roles + navConfig + topbarConfig
 *  - The Client Explorer's "Request Building Quote" CTA routes into the
 *    existing client create-project flow with stand + plan pre-filled.
 */

import { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — identical to BuildQuotePlatform.jsx, plus developer additions
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --bg-base        : #F6F4F0;
    --bg-elevated    : rgba(255,252,248,0.88);
    --bg-glass       : rgba(255,252,248,0.68);
    --bg-sidebar     : #19273A;
    --bg-sidebar-hover : rgba(255,255,255,0.07);

    --brand-primary  : #1C3557;
    --brand-mid      : #264a75;
    --brand-accent   : #C4622D;
    --brand-accent-lt: rgba(196,98,45,0.12);

    --success        : #2A7D4F;
    --success-bg     : rgba(42,125,79,0.10);
    --warning        : #B45309;
    --warning-bg     : rgba(180,83,9,0.10);
    --error          : #C0392B;
    --error-bg       : rgba(192,57,43,0.10);
    --info-bg        : rgba(28,53,87,0.07);

    --txt-1          : #1A1A1A;
    --txt-2          : #5A5A5A;
    --txt-3          : #9A9A9A;
    --txt-dark       : rgba(255,255,255,0.92);
    --txt-dark-2     : rgba(255,255,255,0.55);

    --border-sub     : rgba(0,0,0,0.07);
    --border-med     : rgba(0,0,0,0.12);
    --border-str     : rgba(0,0,0,0.20);

    --shadow-xs : 0 1px 2px rgba(0,0,0,0.05);
    --shadow-sm : 0 2px 6px rgba(0,0,0,0.07),0 1px 2px rgba(0,0,0,0.04);
    --shadow-md : 0 6px 20px rgba(0,0,0,0.09),0 2px 6px rgba(0,0,0,0.05);
    --shadow-lg : 0 16px 40px rgba(0,0,0,0.11),0 4px 10px rgba(0,0,0,0.06);
    --shadow-xl : 0 28px 72px rgba(0,0,0,0.13),0 8px 20px rgba(0,0,0,0.07);

    --r-sm  : 8px;
    --r-md  : 12px;
    --r-lg  : 16px;
    --r-xl  : 22px;
    --r-2xl : 32px;
    --r-full: 9999px;

    --font-d : 'DM Serif Display', Georgia, serif;
    --font-b : 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-m : 'JetBrains Mono', 'Courier New', monospace;

    --ease-out   : cubic-bezier(0.16,1,0.3,1);
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --dur-fast   : 140ms;
    --dur-norm   : 240ms;
    --dur-slow   : 380ms;

    --sidebar-w  : 256px;
    --topbar-h   : 60px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-b);
    background: var(--bg-base);
    color: var(--txt-1);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  input, textarea, select { font-family: inherit; }
  a { text-decoration: none; color: inherit; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 3px; }

  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideUp  { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes slideIn  { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes shimmer  { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.45} }
  @keyframes pop      { 0%{transform:scale(0.85);opacity:0} 80%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }

  /* ── Layout ── */
  .app-shell   { display:flex; min-height:100vh; position:relative; }
  .main-area   { margin-left:var(--sidebar-w); flex:1; display:flex; flex-direction:column; min-height:100vh; overflow-x:hidden; }
  .page-wrap   { padding:32px 36px; flex:1; animation:slideIn var(--dur-slow) var(--ease-out); }
  .max-content { max-width:1200px; }

  /* ── Sidebar ── */
  .sidebar {
    width: var(--sidebar-w); background: var(--bg-sidebar);
    position: fixed; top:0; left:0; bottom:0;
    display: flex; flex-direction:column;
    z-index: 100; overflow-y:auto; overflow-x:hidden;
  }
  .sb-logo { display:flex; align-items:center; gap:10px; padding:24px 20px 20px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .sb-logo-mark {
    width:34px; height:34px; border-radius:10px;
    background:linear-gradient(135deg,var(--brand-accent),#E8956B);
    display:flex; align-items:center; justify-content:center;
    font-size:17px; flex-shrink:0; box-shadow:0 4px 12px rgba(196,98,45,0.4);
  }
  .sb-logo-name { font-family:var(--font-d); font-size:19px; color:var(--txt-dark); letter-spacing:-0.3px; }
  .sb-logo-name em { color:#F4A570; font-style:normal; }
  .sb-nav { padding:16px 12px; flex:1; }
  .sb-section-label { font-size:9.5px; font-weight:700; letter-spacing:1.1px; text-transform:uppercase; color:var(--txt-dark-2); padding:12px 8px 6px; margin-top:4px; }
  .sb-item {
    display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:10px;
    font-size:13.5px; font-weight:400; color:var(--txt-dark-2);
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    position:relative; margin-bottom:1px; width:100%; text-align:left;
  }
  .sb-item:hover  { background:var(--bg-sidebar-hover); color:var(--txt-dark); }
  .sb-item.active { background:rgba(196,98,45,0.18); color:#F4A570; font-weight:500; }
  .sb-item-ico    { width:18px; text-align:center; font-size:15px; flex-shrink:0; }
  .sb-badge { margin-left:auto; background:var(--brand-accent); color:white; font-size:9.5px; font-weight:700; padding:1px 6px; border-radius:var(--r-full); min-width:18px; text-align:center; }
  .sb-divider { height:1px; background:rgba(255,255,255,0.07); margin:8px 16px; }
  .sb-user {
    margin-top:auto; padding:14px 16px; border-top:1px solid rgba(255,255,255,0.08);
    display:flex; align-items:center; gap:10px; cursor:pointer;
    transition:background var(--dur-fast); flex-shrink:0;
  }
  .sb-user:hover { background:var(--bg-sidebar-hover); }
  .sb-user-name  { font-size:13px; font-weight:500; color:var(--txt-dark); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .sb-user-role  { font-size:11px; color:var(--txt-dark-2); }

  /* ── Topbar ── */
  .topbar {
    height:var(--topbar-h); padding:0 36px;
    display:flex; align-items:center; gap:12px;
    background:rgba(246,244,240,0.88);
    backdrop-filter:blur(16px) saturate(1.6);
    -webkit-backdrop-filter:blur(16px) saturate(1.6);
    border-bottom:1px solid var(--border-sub);
    position:sticky; top:0; z-index:50;
  }
  .topbar-title    { font-size:16px; font-weight:600; letter-spacing:-0.15px; }
  .topbar-sub      { font-size:12px; color:var(--txt-3); margin-top:1px; }
  .topbar-actions  { margin-left:auto; display:flex; align-items:center; gap:8px; }

  /* ── Typography ── */
  .h-display { font-family:var(--font-d); font-size:40px; line-height:1.08; letter-spacing:-0.5px; }
  .h-1       { font-family:var(--font-d); font-size:30px; line-height:1.12; letter-spacing:-0.3px; }
  .h-2       { font-size:21px; font-weight:600; letter-spacing:-0.2px; }
  .h-3       { font-size:16px; font-weight:600; letter-spacing:-0.1px; }
  .h-4       { font-size:14px; font-weight:600; }
  .body-lg   { font-size:15px; line-height:1.65; }
  .body      { font-size:13.5px; line-height:1.55; }
  .caption   { font-size:12px; line-height:1.45; }
  .micro     { font-size:10.5px; line-height:1.35; }

  /* ── Buttons ── */
  .btn {
    display:inline-flex; align-items:center; justify-content:center; gap:6px;
    font-family:var(--font-b); font-weight:500;
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    white-space:nowrap; border:none; position:relative; overflow:hidden;
  }
  .btn:focus-visible { outline:2.5px solid var(--brand-accent); outline-offset:2px; }
  .btn:disabled { opacity:0.45; cursor:not-allowed; pointer-events:none; }
  .btn-primary { background:var(--brand-primary); color:white; padding:9px 20px; border-radius:var(--r-md); font-size:13.5px; box-shadow:0 2px 8px rgba(28,53,87,0.25); }
  .btn-primary:hover { background:var(--brand-mid); box-shadow:0 4px 16px rgba(28,53,87,0.30); transform:translateY(-1px); }
  .btn-primary:active { transform:translateY(0); }
  .btn-accent { background:var(--brand-accent); color:white; padding:9px 20px; border-radius:var(--r-md); font-size:13.5px; box-shadow:0 2px 8px rgba(196,98,45,0.30); }
  .btn-accent:hover { background:#B5581F; box-shadow:0 4px 16px rgba(196,98,45,0.35); transform:translateY(-1px); }
  .btn-secondary { background:white; color:var(--txt-1); padding:8px 18px; border-radius:var(--r-md); font-size:13.5px; border:1px solid var(--border-med); box-shadow:var(--shadow-xs); }
  .btn-secondary:hover { background:#f8f7f5; border-color:var(--border-str); transform:translateY(-1px); }
  .btn-ghost { background:transparent; color:var(--txt-2); padding:8px 14px; border-radius:var(--r-md); font-size:13.5px; }
  .btn-ghost:hover { background:rgba(0,0,0,0.05); color:var(--txt-1); }
  .btn-danger { background:var(--error-bg); color:var(--error); padding:8px 18px; border-radius:var(--r-md); font-size:13.5px; border:1px solid rgba(192,57,43,0.18); }
  .btn-danger:hover { background:rgba(192,57,43,0.16); }
  .btn-sm  { padding:5px 12px; font-size:12px; border-radius:var(--r-sm); }
  .btn-lg  { padding:13px 28px; font-size:15px; border-radius:var(--r-lg); }
  .btn-xl  { padding:15px 36px; font-size:16px; border-radius:var(--r-lg); }
  .btn-ico { width:34px; height:34px; padding:0; border-radius:var(--r-md); background:white; border:1px solid var(--border-med); color:var(--txt-2); box-shadow:var(--shadow-xs); }
  .btn-ico:hover { background:#f5f5f3; color:var(--txt-1); }

  /* ── Cards ── */
  .card { background:white; border-radius:var(--r-lg); border:1px solid var(--border-sub); box-shadow:var(--shadow-sm); overflow:hidden; }
  .card-glass {
    background:var(--bg-glass);
    backdrop-filter:blur(22px) saturate(1.6); -webkit-backdrop-filter:blur(22px) saturate(1.6);
    border-radius:var(--r-lg); border:1px solid rgba(255,255,255,0.65);
    box-shadow:var(--shadow-md); overflow:hidden;
  }
  .card-head { padding:18px 22px; border-bottom:1px solid var(--border-sub); display:flex; align-items:center; gap:10px; }
  .card-body { padding:22px; }
  .card-foot { padding:14px 22px; border-top:1px solid var(--border-sub); background:rgba(0,0,0,0.017); display:flex; align-items:center; gap:10px; }
  .card-hover { transition:all var(--dur-norm) var(--ease-out); cursor:pointer; }
  .card-hover:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }

  /* ── Stat Cards ── */
  .stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:14px; margin-bottom:24px; }
  .stat-card {
    background:white; border-radius:var(--r-lg); border:1px solid var(--border-sub);
    padding:18px 22px; box-shadow:var(--shadow-sm);
    position:relative; overflow:hidden; cursor:pointer;
    transition:all var(--dur-norm) var(--ease-out);
  }
  .stat-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--sc, var(--brand-accent)); }
  .stat-label { font-size:11px; font-weight:600; color:var(--txt-2); text-transform:uppercase; letter-spacing:0.6px; margin-bottom:8px; }
  .stat-value { font-family:var(--font-d); font-size:30px; line-height:1; color:var(--txt-1); margin-bottom:5px; }
  .stat-delta { font-size:11.5px; display:flex; align-items:center; gap:3px; }

  /* ── Badges ── */
  .badge { display:inline-flex; align-items:center; gap:5px; padding:2px 9px; border-radius:var(--r-full); font-size:10.5px; font-weight:700; letter-spacing:0.3px; white-space:nowrap; }
  .bdot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
  .b-draft      { background:rgba(0,0,0,0.06); color:var(--txt-2); }
  .b-pending    { background:rgba(180,83,9,0.12); color:#92400E; }
  .b-accepted   { background:rgba(42,125,79,0.14); color:#166534; }
  .b-rejected   { background:var(--error-bg); color:var(--error); }
  .b-inprogress { background:rgba(2,132,199,0.12); color:#0369A1; }
  .b-verified   { background:rgba(42,125,79,0.12); color:var(--success); }
  .b-active     { background:rgba(42,125,79,0.12); color:var(--success); }
  .b-review     { background:rgba(109,40,217,0.10); color:#6D28D9; }
  .b-submitted  { background:rgba(28,53,87,0.10); color:var(--brand-primary); }

  /* Stand-status badges */
  .b-available  { background:rgba(42,125,79,0.12);  color:#166534; }
  .b-reserved   { background:rgba(180,83,9,0.14);   color:#92400E; }
  .b-sold       { background:rgba(28,53,87,0.12);   color:var(--brand-primary); }
  .b-onhold     { background:rgba(0,0,0,0.06);      color:var(--txt-2); }

  /* Fit badges */
  .b-fit-good   { background:rgba(42,125,79,0.14);  color:#166534; }
  .b-fit-tight  { background:rgba(180,83,9,0.14);   color:#92400E; }
  .b-fit-no     { background:var(--error-bg);       color:var(--error); }

  /* ── Forms ── */
  .form-row  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .form-row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
  .f-group   { margin-bottom:18px; }
  .f-label   { display:block; font-size:12.5px; font-weight:500; color:var(--txt-1); margin-bottom:6px; }
  .f-label .req { color:var(--brand-accent); margin-left:2px; }
  .f-hint    { font-size:11.5px; color:var(--txt-3); margin-top:5px; line-height:1.4; }
  .inp {
    width:100%; padding:9px 13px; background:white; border:1.5px solid var(--border-med);
    border-radius:var(--r-md); font-size:13.5px; color:var(--txt-1);
    transition:all var(--dur-fast) var(--ease-out); outline:none;
  }
  .inp::placeholder { color:var(--txt-3); }
  .inp:focus { border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }
  textarea.inp { resize:vertical; min-height:90px; line-height:1.55; }
  select.inp {
    appearance:none; cursor:pointer; padding-right:34px;
    background-image:url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5.5 5.5L10 1' stroke='%239A9A9A' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 11px center;
  }
  .inp-wrap { position:relative; display:flex; align-items:center; }
  .inp-wrap .inp { padding-left:36px; }
  .inp-ico { position:absolute; left:11px; color:var(--txt-3); pointer-events:none; font-size:15px; }
  .inp-sfx { position:absolute; right:12px; color:var(--txt-3); font-size:12px; font-weight:500; font-family:var(--font-m); }

  .check-row { display:flex; align-items:center; gap:10px; cursor:pointer; }
  .check-box { width:18px; height:18px; border-radius:5px; border:1.5px solid var(--border-med); background:white; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all var(--dur-fast) var(--ease-out); }
  .check-box.checked { background:var(--brand-primary); border-color:var(--brand-primary); }

  /* ── Tabs ── */
  .tabs { display:flex; gap:2px; background:rgba(0,0,0,0.05); padding:3px; border-radius:var(--r-md); width:fit-content; }
  .tab-item { padding:5px 16px; border-radius:calc(var(--r-md) - 2px); font-size:12.5px; font-weight:500; color:var(--txt-2); cursor:pointer; transition:all var(--dur-fast) var(--ease-out); border:none; background:none; white-space:nowrap; }
  .tab-item.active { background:white; color:var(--txt-1); box-shadow:var(--shadow-sm); }
  .tab-item:hover:not(.active) { color:var(--txt-1); }

  /* ── Table ── */
  .tbl { width:100%; border-collapse:collapse; }
  .tbl th { text-align:left; font-size:10.5px; font-weight:700; color:var(--txt-3); text-transform:uppercase; letter-spacing:0.7px; padding:10px 16px; border-bottom:1px solid var(--border-sub); white-space:nowrap; }
  .tbl td { padding:11px 16px; font-size:13px; color:var(--txt-1); border-bottom:1px solid var(--border-sub); vertical-align:middle; }
  .tbl tbody tr { cursor:pointer; transition:background var(--dur-fast); }
  .tbl tbody tr:hover { background:rgba(0,0,0,0.018); }
  .tbl tr:last-child td { border-bottom:none; }

  /* ── Steps / Wizard ── */
  .stepper { display:flex; align-items:flex-start; margin-bottom:36px; }
  .step-node { display:flex; flex-direction:column; align-items:center; flex:1; position:relative; }
  .step-circ { width:30px; height:30px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; z-index:1; transition:all var(--dur-norm) var(--ease-out); }
  .step-circ.done   { background:var(--success); color:white; box-shadow:0 0 0 4px rgba(42,125,79,0.15); }
  .step-circ.active { background:var(--brand-primary); color:white; box-shadow:0 0 0 4px rgba(28,53,87,0.15); }
  .step-circ.todo   { background:white; color:var(--txt-3); border:2px solid var(--border-med); }
  .step-lbl { font-size:10.5px; font-weight:500; color:var(--txt-3); text-align:center; margin-top:7px; white-space:nowrap; }
  .step-lbl.active { color:var(--brand-primary); font-weight:700; }
  .step-lbl.done   { color:var(--success); }
  .step-line { position:absolute; top:15px; left:50%; right:-50%; height:2px; background:var(--border-med); z-index:0; }
  .step-line.done { background:var(--success); }
  .step-node:last-child .step-line { display:none; }

  /* ── Timeline ── */
  .timeline { padding-left:28px; position:relative; }
  .timeline::before { content:''; position:absolute; left:12px; top:8px; bottom:8px; width:2px; background:var(--border-sub); }
  .tl-item { position:relative; margin-bottom:18px; }
  .tl-dot  { position:absolute; left:-22px; top:3px; width:10px; height:10px; border-radius:50%; background:white; border:2px solid var(--border-med); }
  .tl-dot.done   { background:var(--success); border-color:var(--success); box-shadow:0 0 0 3px rgba(42,125,79,0.18); }
  .tl-dot.active { background:var(--brand-accent); border-color:var(--brand-accent); box-shadow:0 0 0 3px rgba(196,98,45,0.18); }
  .tl-time  { font-size:10.5px; color:var(--txt-3); font-family:var(--font-m); margin-bottom:2px; }
  .tl-title { font-size:13px; font-weight:600; color:var(--txt-1); margin-bottom:2px; }
  .tl-desc  { font-size:12px; color:var(--txt-2); line-height:1.5; }

  /* ── Progress ── */
  .progress { height:5px; background:var(--border-sub); border-radius:3px; overflow:hidden; }
  .progress-fill { height:100%; border-radius:3px; background:linear-gradient(90deg,var(--brand-primary),var(--brand-accent)); transition:width var(--dur-slow) var(--ease-out); }

  /* ── Modal ── */
  .modal-bg {
    position:fixed; inset:0; background:rgba(0,0,0,0.38);
    backdrop-filter:blur(5px); -webkit-backdrop-filter:blur(5px);
    z-index:1000; display:flex; align-items:center; justify-content:center;
    padding:24px; animation:fadeIn var(--dur-norm) var(--ease-out);
  }
  .modal { background:white; border-radius:var(--r-xl); box-shadow:var(--shadow-xl); width:100%; max-width:520px; max-height:92vh; overflow-y:auto; animation:slideUp var(--dur-slow) var(--ease-out); }
  .modal-lg { max-width:740px; }
  .modal-head { padding:24px 24px 16px; display:flex; align-items:flex-start; gap:14px; }
  .modal-body { padding:0 24px 24px; }
  .modal-foot { padding:14px 24px; border-top:1px solid var(--border-sub); display:flex; align-items:center; justify-content:flex-end; gap:10px; }

  /* ── Upload ── */
  .upload-zone { border:2px dashed var(--border-med); border-radius:var(--r-lg); padding:28px; text-align:center; cursor:pointer; transition:all var(--dur-fast) var(--ease-out); background:rgba(0,0,0,0.01); }
  .upload-zone:hover { border-color:var(--brand-primary); background:var(--info-bg); }

  /* ── Notification ── */
  .notif { padding:12px 16px; border-radius:var(--r-md); display:flex; align-items:flex-start; gap:10px; margin-bottom:14px; }
  .notif.info    { background:var(--info-bg); border-left:3px solid var(--brand-primary); }
  .notif.success { background:var(--success-bg); border-left:3px solid var(--success); }
  .notif.warning { background:var(--warning-bg); border-left:3px solid var(--warning); }
  .notif.error   { background:var(--error-bg); border-left:3px solid var(--error); }

  /* ── Doc chip / Tag / Avatar / Empty state ── */
  .doc-chip { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; background:rgba(0,0,0,0.04); border:1px solid var(--border-sub); border-radius:var(--r-md); font-size:11.5px; color:var(--txt-2); cursor:pointer; transition:background var(--dur-fast); white-space:nowrap; }
  .doc-chip:hover { background:rgba(0,0,0,0.07); }
  .tag { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; background:rgba(0,0,0,0.05); border-radius:var(--r-full); font-size:11.5px; font-weight:500; color:var(--txt-2); }
  .ava { border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:600; color:white; flex-shrink:0; }
  .ava-sm { width:26px; height:26px; font-size:10px; }
  .ava-md { width:34px; height:34px; font-size:13px; }
  .ava-lg { width:46px; height:46px; font-size:17px; }
  .ava-xl { width:64px; height:64px; font-size:22px; }
  .empty-state { text-align:center; padding:56px 28px; display:flex; flex-direction:column; align-items:center; gap:12px; }
  .empty-ico { width:68px; height:68px; border-radius:var(--r-xl); background:rgba(0,0,0,0.04); display:flex; align-items:center; justify-content:center; font-size:30px; margin-bottom:4px; }

  .sec-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
  .divider { height:1px; background:var(--border-sub); margin:18px 0; }

  /* ═══════════════════════════════════════════════════════════════════════
     DEVELOPER MODULE — new component styles
     ═══════════════════════════════════════════════════════════════════════ */

  /* Estate map */
  .estate-map-wrap {
    background:linear-gradient(135deg,#e8efea 0%,#dde8e0 55%,#cfdfd4 100%);
    border-radius:var(--r-lg); position:relative; overflow:hidden;
    border:1px solid var(--border-sub);
  }
  .estate-map-wrap::before {
    content:''; position:absolute; inset:0;
    background-image:linear-gradient(rgba(255,255,255,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.22) 1px,transparent 1px);
    background-size:26px 26px; pointer-events:none;
  }
  .estate-map-svg { display:block; width:100%; height:auto; position:relative; z-index:1; }
  .stand-shape { cursor:pointer; transition:filter var(--dur-fast), opacity var(--dur-fast); }
  .stand-shape:hover { filter:brightness(1.06) drop-shadow(0 2px 6px rgba(0,0,0,0.18)); }
  .map-legend { display:flex; flex-wrap:wrap; gap:14px; padding:12px 16px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); border-top:1px solid var(--border-sub); position:relative; z-index:2; }
  .legend-item { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:500; color:var(--txt-2); }
  .legend-swatch { width:12px; height:12px; border-radius:4px; border:1px solid rgba(0,0,0,0.14); }

  /* House plan cards */
  .plan-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }
  .plan-card { background:white; border-radius:var(--r-lg); border:1px solid var(--border-sub); box-shadow:var(--shadow-sm); overflow:hidden; transition:all var(--dur-norm) var(--ease-out); cursor:pointer; position:relative; }
  .plan-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  .plan-card.selected { border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.12), var(--shadow-md); }
  .plan-img { height:132px; display:flex; align-items:center; justify-content:center; font-size:44px; position:relative; overflow:hidden; }
  .plan-img::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.14) 1px,transparent 1px); background-size:22px 22px; }
  .plan-img span { position:relative; z-index:1; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.22)); }
  .plan-specs { display:flex; gap:10px; flex-wrap:wrap; }
  .plan-spec { display:inline-flex; align-items:center; gap:4px; font-size:11.5px; color:var(--txt-2); font-weight:500; }

  /* Fit meter */
  .fit-meter { height:8px; border-radius:4px; background:var(--border-sub); overflow:hidden; position:relative; }
  .fit-meter-fill { height:100%; border-radius:4px; transition:width var(--dur-slow) var(--ease-out); }
  .fit-meter-limit { position:absolute; top:-2px; bottom:-2px; width:2px; background:var(--txt-1); opacity:0.35; }

  /* Fit matrix */
  .fit-matrix { width:100%; border-collapse:collapse; }
  .fit-matrix th, .fit-matrix td { padding:9px 12px; font-size:12px; border-bottom:1px solid var(--border-sub); text-align:center; }
  .fit-matrix th { font-size:10px; font-weight:700; color:var(--txt-3); text-transform:uppercase; letter-spacing:0.6px; background:rgba(0,0,0,0.02); }
  .fit-matrix td:first-child, .fit-matrix th:first-child { text-align:left; white-space:nowrap; }
  .fit-cell { display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:8px; font-size:13px; }
  .fit-cell.good  { background:rgba(42,125,79,0.14); }
  .fit-cell.tight { background:rgba(180,83,9,0.14); }
  .fit-cell.no    { background:var(--error-bg); }

  /* Share link box */
  .share-link-box { display:flex; align-items:center; gap:8px; background:rgba(0,0,0,0.035); border:1px solid var(--border-sub); border-radius:var(--r-md); padding:9px 12px; font-family:var(--font-m); font-size:12px; color:var(--txt-2); overflow:hidden; }
  .share-link-box .lnk { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

  /* Messages */
  .msg-layout { display:grid; grid-template-columns:300px 1fr; gap:0; background:white; border-radius:var(--r-lg); border:1px solid var(--border-sub); box-shadow:var(--shadow-sm); overflow:hidden; height:calc(100vh - var(--topbar-h) - 130px); min-height:480px; }
  .msg-list { border-right:1px solid var(--border-sub); overflow-y:auto; }
  .msg-list-item { padding:14px 16px; border-bottom:1px solid var(--border-sub); cursor:pointer; transition:background var(--dur-fast); display:flex; gap:10px; align-items:flex-start; }
  .msg-list-item:hover { background:rgba(0,0,0,0.02); }
  .msg-list-item.active { background:rgba(28,53,87,0.06); border-left:3px solid var(--brand-primary); padding-left:13px; }
  .msg-thread { display:flex; flex-direction:column; overflow:hidden; }
  .msg-thread-head { padding:14px 20px; border-bottom:1px solid var(--border-sub); display:flex; align-items:center; gap:10px; flex-shrink:0; background:rgba(246,244,240,0.6); }
  .msg-scroll { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px; }
  .bubble { max-width:68%; padding:10px 14px; border-radius:var(--r-lg); font-size:13px; line-height:1.55; position:relative; }
  .bubble.them { background:rgba(0,0,0,0.045); color:var(--txt-1); border-bottom-left-radius:4px; align-self:flex-start; }
  .bubble.me   { background:var(--brand-primary); color:white; border-bottom-right-radius:4px; align-self:flex-end; }
  .bubble-time { font-size:9.5px; opacity:0.55; margin-top:4px; font-family:var(--font-m); }
  .msg-composer { padding:12px 16px; border-top:1px solid var(--border-sub); display:flex; gap:10px; align-items:center; flex-shrink:0; }

  /* Client explorer (public link view) */
  .explorer-hero { background:var(--brand-primary); border-radius:var(--r-xl); padding:28px 32px; color:white; position:relative; overflow:hidden; margin-bottom:24px; }
  .explorer-hero::before { content:''; position:absolute; top:-70px; right:-50px; width:280px; height:280px; border-radius:50%; background:rgba(196,98,45,0.18); }
  .explorer-hero::after  { content:''; position:absolute; bottom:-90px; left:30%; width:220px; height:220px; border-radius:50%; background:rgba(255,255,255,0.05); }

  /* Utility */
  .flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}
  .items-c{align-items:center}.items-s{align-items:flex-start}
  .j-between{justify-content:space-between}.j-center{justify-content:center}
  .gap-2{gap:6px}.gap-3{gap:10px}.gap-4{gap:14px}.gap-6{gap:20px}.gap-8{gap:28px}
  .w-full{width:100%}.relative{position:relative}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .mb-1{margin-bottom:4px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}
  .mb-5{margin-bottom:20px}.mb-6{margin-bottom:24px}.mb-8{margin-bottom:32px}
  .mt-2{margin-top:8px}.mt-3{margin-top:12px}.mt-4{margin-top:16px}.mt-6{margin-top:24px}
  .ml-auto{margin-left:auto}.mr-2{margin-right:8px}
  .p-4{padding:14px}.p-5{padding:18px}.p-6{padding:22px}
  .rounded-md{border-radius:var(--r-md)}.rounded-lg{border-radius:var(--r-lg)}.rounded-full{border-radius:var(--r-full)}
  .c-1{color:var(--txt-1)}.c-2{color:var(--txt-2)}.c-3{color:var(--txt-3)}
  .c-accent{color:var(--brand-accent)}.c-brand{color:var(--brand-primary)}
  .c-success{color:var(--success)}.c-error{color:var(--error)}.c-warning{color:var(--warning)}
  .c-white{color:white}
  .fw-4{font-weight:400}.fw-5{font-weight:500}.fw-6{font-weight:600}.fw-7{font-weight:700}
  .fs-d{font-family:var(--font-d)}.fs-m{font-family:var(--font-m)}
  .bg-white{background:white}.bg-info{background:var(--info-bg)}.bg-success{background:var(--success-bg)}
  .bg-accent-lt{background:var(--brand-accent-lt)}.bg-brand-lt{background:rgba(28,53,87,0.05)}
  .border-sub{border:1px solid var(--border-sub)}.border-med{border:1px solid var(--border-med)}
  .shadow-sm{box-shadow:var(--shadow-sm)}.shadow-md{box-shadow:var(--shadow-md)}
  .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .text-right{text-align:right}.text-center{text-align:center}.italic{font-style:italic}

  @media(max-width:1024px){
    :root{--sidebar-w:220px}
    .grid-4{grid-template-columns:repeat(2,1fr)}
    .grid-3{grid-template-columns:repeat(2,1fr)}
    .msg-layout{grid-template-columns:240px 1fr}
  }
  @media(max-width:768px){
    .sidebar{transform:translateX(-100%)}
    .main-area{margin-left:0}
    .grid-2,.grid-3{grid-template-columns:1fr}
    .grid-4{grid-template-columns:1fr 1fr}
    .page-wrap{padding:20px 18px}
    .topbar{padding:0 18px}
    .form-row,.form-row3{grid-template-columns:1fr}
    .stepper{overflow-x:auto}
    .msg-layout{grid-template-columns:1fr}
    .msg-list{display:none}
  }

  /* ── Demo nav ── */
  .demo-nav { background:#0F1921; padding:8px 16px; display:flex; align-items:center; gap:6px; flex-wrap:wrap; position:sticky; top:0; z-index:9999; border-bottom:1px solid rgba(255,255,255,0.06); }
  .demo-label { color:rgba(255,255,255,0.3); font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; margin-right:6px; white-space:nowrap; }
  .demo-btn { padding:3px 11px; border-radius:var(--r-full); font-size:11px; font-weight:500; cursor:pointer; transition:all var(--dur-fast); border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.62); white-space:nowrap; }
  .demo-btn:hover  { background:rgba(255,255,255,0.12); color:white; }
  .demo-btn.active { background:var(--brand-accent); border-color:var(--brand-accent); color:white; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DEMO DATA — Developer module
// ─────────────────────────────────────────────────────────────────────────────
const STAND_STATUSES = {
  AVAILABLE: { label:"Available", cls:"b-available", dot:"#166534", map:"#7FB98F" },
  RESERVED:  { label:"Reserved",  cls:"b-reserved",  dot:"#B45309", map:"#E5B366" },
  SOLD:      { label:"Sold",      cls:"b-sold",      dot:"#1C3557", map:"#8AA3C4" },
  ON_HOLD:   { label:"On Hold",   cls:"b-onhold",    dot:"#9A9A9A", map:"#C9C9C4" },
};

const DEV_STATUSES = {
  DRAFT:     { label:"Draft",       cls:"b-draft" },
  SELLING:   { label:"Selling",     cls:"b-active" },
  LAUNCHING: { label:"Launching",   cls:"b-review" },
  SOLD_OUT:  { label:"Sold Out",    cls:"b-sold" },
};

// Coverage rule of thumb (typical SA municipal zoning for Res 1):
// max 60% of the stand may be built on; setbacks eat further into usable area.
const COVERAGE_RATIO = 0.60;   // max footprint / stand area
const COMFORT_MARGIN = 0.85;   // ≤85% of the allowed coverage = comfortable

const HOUSE_PLANS = [
  {
    id:"HP-01", name:"The Protea", type:"Single Storey", beds:3, baths:2, garages:2,
    footprint:145, underRoof:145, priceFrom:1850000, icon:"🏡",
    grad:"linear-gradient(135deg,#C4622D,#E8956B)",
    desc:"Family single-storey with open-plan living, covered patio and double garage. North-facing living wing.",
    features:["Open-plan kitchen","Covered patio","Solar geyser","Fibre ready"],
    docs:["Protea_floor_plan.pdf","Protea_elevations.pdf"],
  },
  {
    id:"HP-02", name:"The Aloe", type:"Single Storey", beds:2, baths:1, garages:1,
    footprint:98, underRoof:98, priceFrom:1290000, icon:"🏠",
    grad:"linear-gradient(135deg,#2A7D4F,#6FBF8F)",
    desc:"Compact lock-up-and-go starter home. Ideal for smaller stands and first-time buyers.",
    features:["Courtyard garden","Single garage","Prepaid utilities"],
    docs:["Aloe_floor_plan.pdf"],
  },
  {
    id:"HP-03", name:"The Baobab", type:"Single Storey", beds:4, baths:3, garages:2,
    footprint:210, underRoof:210, priceFrom:2740000, icon:"🏘️",
    grad:"linear-gradient(135deg,#1C3557,#4A6FA5)",
    desc:"Flagship 4-bedroom family home with study, scullery and entertainer's patio with built-in braai.",
    features:["Study / 5th bed","Scullery & pantry","Built-in braai","Double volume entrance"],
    docs:["Baobab_floor_plan.pdf","Baobab_elevations.pdf","Baobab_3D_render.jpg"],
  },
  {
    id:"HP-04", name:"The Fynbos", type:"Double Storey", beds:3, baths:2.5, garages:2,
    footprint:118, underRoof:186, priceFrom:2320000, icon:"🏢",
    grad:"linear-gradient(135deg,#6D28D9,#A78BFA)",
    desc:"Double-storey design with a small ground footprint — all bedrooms upstairs, balcony off the main suite.",
    features:["Small footprint","Main-suite balcony","Pyjama lounge","Guest WC"],
    docs:["Fynbos_floor_plan.pdf","Fynbos_elevations.pdf"],
  },
];

// Estate stands — x/y/w/h are layout-plan coordinates for the interactive map (viewBox 0 0 640 400)
const STANDS = [
  { id:"ST-01", no:"Stand 1",  size:420, price:495000, status:"SOLD",      orientation:"North", frontage:15, x: 20, y: 40, w: 90, h: 80, servitude:false },
  { id:"ST-02", no:"Stand 2",  size:385, price:465000, status:"SOLD",      orientation:"North", frontage:14, x:115, y: 40, w: 85, h: 80, servitude:false },
  { id:"ST-03", no:"Stand 3",  size:410, price:489000, status:"RESERVED",  orientation:"North-East", frontage:15, x:205, y: 40, w: 90, h: 80, servitude:false },
  { id:"ST-04", no:"Stand 4",  size:520, price:585000, status:"AVAILABLE", orientation:"East",  frontage:18, x:300, y: 40, w:110, h: 80, servitude:false },
  { id:"ST-05", no:"Stand 5",  size:610, price:665000, status:"AVAILABLE", orientation:"East",  frontage:20, x:415, y: 40, w:125, h: 80, servitude:true  },
  { id:"ST-06", no:"Stand 6",  size:298, price:398000, status:"AVAILABLE", orientation:"South", frontage:12, x: 20, y:180, w: 78, h: 75, servitude:false },
  { id:"ST-07", no:"Stand 7",  size:305, price:405000, status:"RESERVED",  orientation:"South", frontage:12, x:103, y:180, w: 78, h: 75, servitude:false },
  { id:"ST-08", no:"Stand 8",  size:340, price:435000, status:"AVAILABLE", orientation:"South-West", frontage:13, x:186, y:180, w: 82, h: 75, servitude:false },
  { id:"ST-09", no:"Stand 9",  size:455, price:520000, status:"AVAILABLE", orientation:"West",  frontage:16, x:273, y:180, w: 98, h: 75, servitude:false },
  { id:"ST-10", no:"Stand 10", size:512, price:572000, status:"ON_HOLD",   orientation:"West",  frontage:17, x:376, y:180, w:106, h: 75, servitude:false },
  { id:"ST-11", no:"Stand 11", size:735, price:790000, status:"AVAILABLE", orientation:"North-West", frontage:24, x:487, y:180, w: 90, h:130, servitude:false },
  { id:"ST-12", no:"Stand 12", size:388, price:468000, status:"AVAILABLE", orientation:"North", frontage:14, x: 20, y:290, w:160, h: 72, servitude:false },
];

const DEVELOPMENTS = [
  {
    id:"DEV-2026-001", name:"The Ridge at Ruimsig", location:"Ruimsig, Roodepoort, GP",
    status:"SELLING", stands:12, standsAvailable:7, standsReserved:2, standsSold:2,
    priceRange:"R 398k – R 790k", pipelineValue:"R 14.2M", launched:"14 Mar 2026",
    hoa:"R 1,850 pm levy", grad:"linear-gradient(135deg,#1C3557,#3D5F8A)", icon:"⛰️",
  },
  {
    id:"DEV-2026-002", name:"Willow Creek Estate", location:"Centurion, GP",
    status:"LAUNCHING", stands:28, standsAvailable:28, standsReserved:0, standsSold:0,
    priceRange:"R 520k – R 1.1M", pipelineValue:"R 31.6M", launched:"Launching Aug 2026",
    hoa:"R 2,200 pm levy", grad:"linear-gradient(135deg,#2A7D4F,#5FA97C)", icon:"🌿",
  },
  {
    id:"DEV-2025-014", name:"Umhlanga Coastal Villas", location:"Umhlanga, KZN",
    status:"SOLD_OUT", stands:9, standsAvailable:0, standsReserved:0, standsSold:9,
    priceRange:"R 1.2M – R 2.4M", pipelineValue:"R 16.8M", launched:"02 Feb 2025",
    hoa:"R 3,400 pm levy", grad:"linear-gradient(135deg,#C4622D,#E8956B)", icon:"🌊",
  },
];

const DEV_LEADS = [
  { id:"LD-101", client:"Thabo Nkosi",  stand:"ST-04", plan:"HP-01", stage:"CONFIGURED", lastActive:"2h ago",  note:"Opened link 4×, configured Protea on Stand 4", ava:"#1C3557" },
  { id:"LD-102", client:"Priya Naidoo", stand:"ST-09", plan:"HP-04", stage:"INTERESTED", lastActive:"1d ago",  note:"Requested a building quote — routed to BuildQuote", ava:"#2A7D4F" },
  { id:"LD-103", client:"Dean Botha",   stand:"ST-06", plan:null,    stage:"VIEWED",     lastActive:"3d ago",  note:"Viewed layout only, no house selected yet", ava:"#7C3AED" },
  { id:"LD-104", client:"Lisa Joubert", stand:"ST-11", plan:"HP-03", stage:"RESERVED",   lastActive:"5d ago",  note:"Paid reservation deposit on Stand 11", ava:"#C4622D" },
];

const LEAD_STAGES = {
  SENT:       { label:"Link Sent",   cls:"b-draft" },
  VIEWED:     { label:"Viewed",      cls:"b-submitted" },
  CONFIGURED: { label:"Configured",  cls:"b-review" },
  INTERESTED: { label:"Quote Requested", cls:"b-inprogress" },
  RESERVED:   { label:"Reserved",    cls:"b-accepted" },
};

const DEV_ACTIVITY = [
  { time:"08 Jul 2026 09:12", title:"Explorer link opened",       desc:"Thabo Nkosi opened The Ridge explorer and configured The Protea on Stand 4.", dot:"active" },
  { time:"07 Jul 2026 16:40", title:"Quote requested",            desc:"Priya Naidoo requested a building quote — Stand 9 + The Fynbos. Sent to BuildQuote matching.", dot:"done" },
  { time:"06 Jul 2026 11:05", title:"Stand reserved",             desc:"Stand 11 reserved by Lisa Joubert. Reservation deposit received.", dot:"done" },
  { time:"04 Jul 2026 14:22", title:"House plan updated",         desc:"The Baobab base price adjusted to R 2,740,000 (+ escalation).", dot:"done" },
  { time:"01 Jul 2026 08:30", title:"New development draft",      desc:"Willow Creek Estate created — 28 stands imported from surveyor CSV.", dot:"done" },
];

const DEV_MESSAGES = [
  { id:"C-1", name:"Thabo Nkosi",  ava:"#1C3557", preview:"Does Stand 4 allow a flat roof design?", time:"09:14", unread:2, msgs:[
    { who:"them", text:"Hi Neo, thanks for the link! I've been playing with the explorer over the weekend.", time:"Sat 18:02" },
    { who:"them", text:"Does Stand 4 allow a flat roof design? I really like The Protea but would prefer a modern roofline.", time:"09:14" },
    { who:"me",   text:"Morning Thabo! Yes — the estate design guidelines allow flat or mono-pitch on the northern row. I can ask our architect for a Protea flat-roof variant elevation.", time:"09:20" },
  ]},
  { id:"C-2", name:"Priya Naidoo", ava:"#2A7D4F", preview:"Quote request submitted ✅", time:"Yest", unread:0, msgs:[
    { who:"them", text:"I've gone ahead and requested the building quote for Stand 9 with The Fynbos!", time:"Yest 16:41" },
    { who:"me",   text:"Fantastic — I can see it in the pipeline. A verified builder will be matched within 48 hours and I'll keep the stand flagged for you.", time:"Yest 16:55" },
  ]},
  { id:"C-3", name:"Lisa Joubert", ava:"#C4622D", preview:"Deposit paid — what's next?", time:"Mon", unread:0, msgs:[
    { who:"them", text:"Deposit paid for Stand 11 — what's next?", time:"Mon 10:15" },
    { who:"me",   text:"Congratulations Lisa! 🎉 Next step is the sale agreement from our conveyancers (3–5 days), then you can lock in The Baobab and we route it for building quotes and bank pre-approval.", time:"Mon 10:30" },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// FIT ENGINE — will this house fit on this stand?
// ─────────────────────────────────────────────────────────────────────────────
// usable buildable area = stand size × municipal coverage ratio (default 60%).
// A plan "fits comfortably" if its ground footprint ≤ 85% of that allowance,
// "tight" if within the allowance but above 85%, otherwise it won't comply.
const checkFit = (plan, stand) => {
  if (!plan || !stand) return null;
  const allowed = stand.size * COVERAGE_RATIO;
  const usagePct = (plan.footprint / allowed) * 100;         // % of allowance used
  const coveragePct = (plan.footprint / stand.size) * 100;   // % of stand covered
  if (plan.footprint <= allowed * COMFORT_MARGIN)
    return { verdict:"good",  label:"Fits comfortably", icon:"✓", cls:"b-fit-good",  usagePct, coveragePct, allowed };
  if (plan.footprint <= allowed)
    return { verdict:"tight", label:"Tight fit",        icon:"⚠", cls:"b-fit-tight", usagePct, coveragePct, allowed };
  return   { verdict:"no",    label:"Exceeds coverage", icon:"✕", cls:"b-fit-no",    usagePct, coveragePct, allowed };
};

const fmtR = (n) => "R " + n.toLocaleString("en-ZA");

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS (mirrors BuildQuotePlatform.jsx atoms)
// ─────────────────────────────────────────────────────────────────────────────
const StandBadge = ({ status }) => {
  const s = STAND_STATUSES[status];
  if (!s) return null;
  return <span className={`badge ${s.cls}`}><span className="bdot" style={{ background:s.dot }} />{s.label}</span>;
};

const DevBadge = ({ status }) => {
  const s = DEV_STATUSES[status];
  if (!s) return null;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
};

const LeadBadge = ({ stage }) => {
  const s = LEAD_STAGES[stage];
  if (!s) return null;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
};

const FitBadge = ({ fit }) => fit
  ? <span className={`badge ${fit.cls}`}>{fit.icon} {fit.label}</span>
  : null;

const Avatar = ({ name = "?", bg = "#1C3557", size = "md" }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return <div className={`ava ava-${size}`} style={{ background: bg }}>{initials}</div>;
};

const StatCard = ({ label, value, delta, deltaType = "up", color = "var(--brand-accent)", icon }) => (
  <div className="stat-card" style={{ "--sc": color }}>
    <div className="flex items-c j-between mb-3">
      <div className="stat-label">{label}</div>
      {icon && <span style={{ fontSize: 20, opacity: 0.5 }}>{icon}</span>}
    </div>
    <div className="stat-value">{value}</div>
    {delta && <div className={`stat-delta ${deltaType}`}>
      <span>{deltaType === "up" ? "↑" : deltaType === "down" ? "↓" : "→"}</span>
      <span>{delta}</span>
    </div>}
  </div>
);

const Notif = ({ type = "info", icon, title, msg }) => (
  <div className={`notif ${type}`}>
    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
    <div>
      {title && <div className="fw-6 caption mb-1">{title}</div>}
      <div className="caption c-2">{msg}</div>
    </div>
  </div>
);

const Tag = ({ children }) => <span className="tag">{children}</span>;
const Divider = () => <div className="divider" />;
const DocChip = ({ name, size, icon = "📄" }) => (
  <span className="doc-chip"><span>{icon}</span><span className="fw-5">{name}</span>{size && <span className="c-3">· {size}</span>}</span>
);

// Fit meter — visual bar: footprint vs allowed coverage
const FitMeter = ({ fit }) => {
  if (!fit) return null;
  const pct = Math.min(fit.usagePct, 130);
  const color = fit.verdict === "good" ? "var(--success)" : fit.verdict === "tight" ? "var(--warning)" : "var(--error)";
  return (
    <div>
      <div className="fit-meter">
        <div className="fit-meter-fill" style={{ width: `${Math.min(pct / 1.3, 100)}%`, background: color }} />
        <div className="fit-meter-limit" style={{ left: `${100 / 1.3}%` }} title="Coverage limit" />
      </div>
      <div className="flex j-between mt-2">
        <span className="micro c-3">{Math.round(fit.coveragePct)}% of stand covered</span>
        <span className="micro c-3">limit {Math.round(COVERAGE_RATIO * 100)}%</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ESTATE MAP — interactive SVG site layout with numbered stands
// ─────────────────────────────────────────────────────────────────────────────
const EstateMap = ({ stands, selectedId, onSelect, height = "auto", compact = false }) => (
  <div className="estate-map-wrap">
    <svg className="estate-map-svg" viewBox="0 0 640 400" style={{ height }}>
      {/* Roads */}
      <rect x="0" y="130" width="640" height="40" rx="4" fill="#B9BDB6" opacity="0.85" />
      <rect x="0" y="265" width="500" height="16" rx="4" fill="#B9BDB6" opacity="0.7" />
      <line x1="0" y1="150" x2="640" y2="150" stroke="white" strokeWidth="2" strokeDasharray="14 12" opacity="0.8" />
      <text x="12" y="156" fontSize="11" fill="#5A5A5A" fontFamily="var(--font-b)" fontWeight="600">Protea Crescent</text>
      {/* Entrance */}
      <rect x="588" y="118" width="46" height="64" rx="8" fill="#8AA3C4" opacity="0.35" />
      <text x="611" y="146" fontSize="9" fill="#1C3557" fontWeight="700" textAnchor="middle">GATE</text>
      <text x="611" y="158" fontSize="9" fill="#1C3557" fontWeight="700" textAnchor="middle">HOUSE</text>
      {/* Park */}
      <rect x="200" y="290" width="270" height="90" rx="12" fill="#7FB98F" opacity="0.45" />
      <text x="335" y="338" fontSize="11" fill="#166534" fontWeight="600" textAnchor="middle">🌳 Communal Park & Play Area</text>

      {stands.map(st => {
        const s = STAND_STATUSES[st.status];
        const sel = selectedId === st.id;
        return (
          <g key={st.id} className="stand-shape" onClick={() => onSelect && onSelect(st.id)}>
            <rect
              x={st.x} y={st.y} width={st.w} height={st.h} rx="7"
              fill={s.map} opacity={sel ? 1 : 0.82}
              stroke={sel ? "var(--brand-accent)" : "rgba(0,0,0,0.22)"}
              strokeWidth={sel ? 3 : 1}
            />
            <text x={st.x + st.w / 2} y={st.y + st.h / 2 - (compact ? 0 : 6)} fontSize={compact ? 11 : 13} fontWeight="700"
              fill="#1A1A1A" textAnchor="middle" fontFamily="var(--font-b)">
              {st.no.replace("Stand ", "")}
            </text>
            {!compact && (
              <text x={st.x + st.w / 2} y={st.y + st.h / 2 + 11} fontSize="9" fill="rgba(0,0,0,0.55)" textAnchor="middle" fontFamily="var(--font-m)">
                {st.size}m²
              </text>
            )}
            {st.servitude && <text x={st.x + st.w - 12} y={st.y + 14} fontSize="10" textAnchor="middle">⚡</text>}
          </g>
        );
      })}
      <text x="628" y="392" fontSize="16" textAnchor="end">🧭</text>
      <text x="606" y="392" fontSize="9" fill="#5A5A5A" textAnchor="end" fontWeight="600">N ↑</text>
    </svg>
    <div className="map-legend">
      {Object.entries(STAND_STATUSES).map(([k, v]) => (
        <span key={k} className="legend-item"><span className="legend-swatch" style={{ background: v.map }} />{v.label}</span>
      ))}
      <span className="legend-item"><span>⚡</span>Servitude</span>
      <span className="legend-item ml-auto c-3">Tap a stand to select</span>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D1 — DEVELOPER DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const DeveloperDashboard = ({ setScreen }) => (
  <div className="page-wrap">
    <div className="flex items-c j-between mb-6">
      <div>
        <div className="h-1 mb-1">Good morning, Neo 👋</div>
        <div className="caption c-2">Your developments, stands and buyer activity at a glance.</div>
      </div>
      <button className="btn btn-accent" onClick={() => setScreen("dev-create")}>+ New Development</button>
    </div>

    <Notif type="success" icon="🎉" title="Quote requested on The Ridge"
      msg="Priya Naidoo requested a building quote for Stand 9 + The Fynbos. The request has been routed to BuildQuote builder matching." />

    <div className="stat-grid">
      <StatCard label="Active Developments" value="2" delta="1 launching Aug" color="var(--brand-primary)" icon="🏘️" />
      <StatCard label="Stands Available" value="35" delta="of 49 total" deltaType="neutral" color="var(--success)" icon="📐" />
      <StatCard label="Reserved / Sold" value="4 / 11" delta="2 this month" color="var(--brand-accent)" icon="🤝" />
      <StatCard label="Pipeline Value" value="R 45.8M" delta="↑ R 1.3M this month" color="#7C3AED" icon="💰" />
      <StatCard label="Active Leads" value="4" delta="1 quote requested" color="#0369A1" icon="🔗" />
    </div>

    <div className="grid-2 gap-6">
      <div>
        <div className="sec-head">
          <div className="h-3">My Developments</div>
          <button className="btn btn-ghost btn-sm" onClick={() => setScreen("dev-detail")}>View all →</button>
        </div>
        {DEVELOPMENTS.map(d => (
          <div key={d.id} className="card card-hover mb-3" onClick={() => setScreen("dev-detail")}>
            <div className="flex items-c gap-3 p-5">
              <div className="ava ava-lg" style={{ background: d.grad, borderRadius:"var(--r-md)", fontSize:22 }}>{d.icon}</div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div className="flex items-c gap-2 mb-1">
                  <span className="h-4 truncate">{d.name}</span>
                  <DevBadge status={d.status} />
                </div>
                <div className="caption c-3">{d.location} · {d.stands} stands · {d.priceRange}</div>
                <div className="flex items-c gap-3 mt-2">
                  <div className="progress flex-1">
                    <div className="progress-fill" style={{ width: `${((d.standsSold + d.standsReserved) / d.stands) * 100}%` }} />
                  </div>
                  <span className="micro c-3 fs-m">{d.standsSold + d.standsReserved}/{d.stands} placed</span>
                </div>
              </div>
              <div className="text-right">
                <div className="fw-6 caption fs-m">{d.pipelineValue}</div>
                <div className="micro c-3 mt-1">{d.launched}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="sec-head">
          <div className="h-3">Buyer Leads</div>
          <button className="btn btn-ghost btn-sm" onClick={() => setScreen("dev-detail")}>Explorer links →</button>
        </div>
        <div className="card mb-5">
          {DEV_LEADS.map((l, i) => {
            const stand = STANDS.find(s => s.id === l.stand);
            const plan = HOUSE_PLANS.find(p => p.id === l.plan);
            return (
              <div key={l.id} className="flex items-c gap-3 p-4 card-hover"
                style={{ borderBottom: i < DEV_LEADS.length - 1 ? "1px solid var(--border-sub)" : "none" }}
                onClick={() => setScreen("dev-messages")}>
                <Avatar name={l.client} bg={l.ava} size="md" />
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div className="flex items-c gap-2 mb-1">
                    <span className="h-4">{l.client}</span>
                    <LeadBadge stage={l.stage} />
                  </div>
                  <div className="caption c-3 truncate">{stand?.no}{plan ? ` · ${plan.name}` : ""} — {l.note}</div>
                </div>
                <span className="micro c-3" style={{ flexShrink: 0 }}>{l.lastActive}</span>
              </div>
            );
          })}
        </div>

        <div className="sec-head"><div className="h-3">Recent Activity</div></div>
        <div className="card card-body">
          <div className="timeline">
            {DEV_ACTIVITY.map((e, i) => (
              <div key={i} className="tl-item">
                <div className={`tl-dot ${e.dot}`} />
                <div className="tl-time">{e.time}</div>
                <div className="tl-title">{e.title}</div>
                <div className="tl-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D2 — CREATE DEVELOPMENT (5-step wizard)
// ─────────────────────────────────────────────────────────────────────────────
const CreateDevelopmentScreen = ({ setScreen }) => {
  const [step, setStep] = useState(0);
  const steps = ["Development Details", "Estate Layout", "Stands", "House Plans", "Review & Publish"];

  const [wizStands, setWizStands] = useState([
    { no:"1", size:"420", price:"495000", orientation:"North", notes:"Corner stand" },
    { no:"2", size:"385", price:"465000", orientation:"North", notes:"" },
  ]);
  const [newStand, setNewStand] = useState({ no:"", size:"", price:"", orientation:"North", notes:"" });
  const [wizPlans, setWizPlans] = useState(HOUSE_PLANS.slice(0, 2).map(p => p.id));

  const addStand = () => {
    if (!newStand.no || !newStand.size) return;
    setWizStands([...wizStands, newStand]);
    setNewStand({ no:"", size:"", price:"", orientation:"North", notes:"" });
  };
  const removeStand = (idx) => setWizStands(wizStands.filter((_, i) => i !== idx));
  const togglePlan = (id) => setWizPlans(wizPlans.includes(id) ? wizPlans.filter(p => p !== id) : [...wizPlans, id]);

  return (
    <div className="page-wrap max-content" style={{ margin: "0 auto", width: "100%" }}>
      {/* Stepper */}
      <div className="stepper">
        {steps.map((s, i) => (
          <div key={s} className="step-node">
            <div className={`step-line ${i < step ? "done" : ""}`} />
            <div className={`step-circ ${i < step ? "done" : i === step ? "active" : "todo"}`}>{i < step ? "✓" : i + 1}</div>
            <div className={`step-lbl ${i < step ? "done" : i === step ? "active" : ""}`}>{s}</div>
          </div>
        ))}
      </div>

      <div className="card">
        {/* ── STEP 1 · Development details ── */}
        {step === 0 && (
          <div className="card-body">
            <div className="h-3 mb-1">Development details</div>
            <div className="caption c-2 mb-5">Basic information about the development. This appears on the explorer link your clients receive.</div>
            <div className="form-row">
              <div className="f-group">
                <label className="f-label">Development Name <span className="req">*</span></label>
                <input className="inp" placeholder="e.g. The Ridge at Ruimsig" defaultValue="Willow Creek Estate" />
              </div>
              <div className="f-group">
                <label className="f-label">Development Type <span className="req">*</span></label>
                <select className="inp" defaultValue="Security Estate">
                  {["Security Estate","Lifestyle Estate","Sectional Title Complex","Freestanding Cluster","Retirement Village"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="f-group">
                <label className="f-label">Location / Suburb <span className="req">*</span></label>
                <div className="inp-wrap"><span className="inp-ico">📍</span><input className="inp" placeholder="Suburb, City, Province" defaultValue="Centurion, GP" /></div>
              </div>
              <div className="f-group">
                <label className="f-label">Erf / Township Reference</label>
                <input className="inp" placeholder="e.g. Ptn 12 of Erf 456, Rooihuiskraal" />
              </div>
            </div>
            <div className="form-row3">
              <div className="f-group">
                <label className="f-label">Total Stands <span className="req">*</span></label>
                <input className="inp" type="number" defaultValue="28" />
              </div>
              <div className="f-group">
                <label className="f-label">Coverage Limit</label>
                <div className="inp-wrap"><input className="inp" style={{ paddingLeft: 13 }} type="number" defaultValue="60" /><span className="inp-sfx">%</span></div>
                <div className="f-hint">Max buildable % of stand size per zoning. Drives the automatic house-fit check.</div>
              </div>
              <div className="f-group">
                <label className="f-label">Monthly Levy (est.)</label>
                <div className="inp-wrap"><span className="inp-ico">💰</span><input className="inp" placeholder="R 0" defaultValue="R 2,200" /></div>
              </div>
            </div>
            <div className="f-group">
              <label className="f-label">Description</label>
              <textarea className="inp" placeholder="Sell the lifestyle — schools, security, greenery, fibre…"
                defaultValue="A 28-stand secure lifestyle estate along the Hennops greenbelt. Fibre to every home, solar-ready designs, communal park with play area, and 24h manned access control." />
            </div>
            <div className="f-group">
              <label className="f-label">Amenities</label>
              <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                {["24h Security","Fibre","Communal Park","Clubhouse","Pet Friendly","Solar Ready","Walking Trails","Backup Water"].map((a, i) => (
                  <span key={a} className="tag" style={i < 5 ? { background:"rgba(28,53,87,0.10)", color:"var(--brand-primary)" } : {}}>{i < 5 ? "✓ " : "+ "}{a}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2 · Estate layout ── */}
        {step === 1 && (
          <div className="card-body">
            <div className="h-3 mb-1">Estate layout plan</div>
            <div className="caption c-2 mb-5">Upload the surveyor's site development plan (SDP) showing numbered stands. Clients will tap stands directly on this layout.</div>
            <div className="upload-zone mb-5">
              <div style={{ fontSize: 30, marginBottom: 8 }}>🗺️</div>
              <div className="h-4 mb-1">Drop your layout plan here</div>
              <div className="caption c-3 mb-3">PDF, PNG or DWG export · max 25MB</div>
              <button className="btn btn-secondary btn-sm">Browse files</button>
            </div>
            <Notif type="success" icon="✅" title="Layout processed — 12 stands detected"
              msg="We traced the stand boundaries and numbers below. Drag corners on the preview to adjust, or re-number stands in the next step." />
            <EstateMap stands={STANDS} compact />
            <div className="flex gap-2 mt-4">
              <DocChip name="WillowCreek_SDP_RevC.pdf" size="4.1 MB" icon="🗺️" />
              <DocChip name="Surveyor_General_Diagram.pdf" size="1.8 MB" />
            </div>
          </div>
        )}

        {/* ── STEP 3 · Stands ── */}
        {step === 2 && (
          <div className="card-body">
            <div className="h-3 mb-1">Stand register</div>
            <div className="caption c-2 mb-5">Capture each stand's number, size and price. Size drives the automatic house-fit guidance. You can also import from a surveyor CSV.</div>

            <div className="flex items-c gap-2 mb-4">
              <button className="btn btn-secondary btn-sm">⬆ Import CSV</button>
              <span className="micro c-3">Columns: stand_no, size_m2, price, orientation, notes</span>
            </div>

            <div className="card mb-5" style={{ boxShadow: "none" }}>
              <table className="tbl">
                <thead>
                  <tr><th>Stand No</th><th>Size (m²)</th><th>Price</th><th>Orientation</th><th>Notes</th><th></th></tr>
                </thead>
                <tbody>
                  {wizStands.map((s, i) => (
                    <tr key={i}>
                      <td className="fw-6">Stand {s.no}</td>
                      <td className="fs-m">{s.size} m²</td>
                      <td className="fs-m">{s.price ? fmtR(Number(s.price)) : "—"}</td>
                      <td>{s.orientation}</td>
                      <td className="c-2">{s.notes || "—"}</td>
                      <td><button className="btn btn-ghost btn-sm c-error" onClick={() => removeStand(i)}>✕</button></td>
                    </tr>
                  ))}
                  <tr style={{ background: "rgba(28,53,87,0.025)" }}>
                    <td><input className="inp" style={{ padding: "6px 10px", fontSize: 12.5 }} placeholder="No." value={newStand.no} onChange={e => setNewStand({ ...newStand, no: e.target.value })} /></td>
                    <td><input className="inp" style={{ padding: "6px 10px", fontSize: 12.5 }} placeholder="m²" value={newStand.size} onChange={e => setNewStand({ ...newStand, size: e.target.value })} /></td>
                    <td><input className="inp" style={{ padding: "6px 10px", fontSize: 12.5 }} placeholder="R" value={newStand.price} onChange={e => setNewStand({ ...newStand, price: e.target.value })} /></td>
                    <td>
                      <select className="inp" style={{ padding: "6px 28px 6px 10px", fontSize: 12.5 }} value={newStand.orientation} onChange={e => setNewStand({ ...newStand, orientation: e.target.value })}>
                        {["North","North-East","East","South-East","South","South-West","West","North-West"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </td>
                    <td><input className="inp" style={{ padding: "6px 10px", fontSize: 12.5 }} placeholder="e.g. corner stand, servitude" value={newStand.notes} onChange={e => setNewStand({ ...newStand, notes: e.target.value })} /></td>
                    <td><button className="btn btn-primary btn-sm" onClick={addStand}>+ Add</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Notif type="info" icon="💡" title="Pricing helper"
              msg={`Average price across captured stands: ${wizStands.length ? fmtR(Math.round(wizStands.reduce((a, s) => a + (Number(s.price) || 0), 0) / wizStands.length)) : "—"} · ${wizStands.length ? "R " + Math.round(wizStands.reduce((a, s) => a + ((Number(s.price) || 0) / (Number(s.size) || 1)), 0) / wizStands.length).toLocaleString("en-ZA") : "—"} per m². Stands priced >15% off the per-m² trend get flagged before publishing.`} />
          </div>
        )}

        {/* ── STEP 4 · House plans ── */}
        {step === 3 && (
          <div className="card-body">
            <div className="h-3 mb-1">House plan catalogue</div>
            <div className="caption c-2 mb-5">Attach the predefined designs clients may build in this development. Footprint (ground floor m²) is used for the fit check against each stand.</div>

            <div className="upload-zone mb-5">
              <div style={{ fontSize: 30, marginBottom: 8 }}>🏡</div>
              <div className="h-4 mb-1">Add a new house design</div>
              <div className="caption c-3 mb-3">Upload renders, floor plans & elevations · we'll extract beds, baths and sizes for you to confirm</div>
              <button className="btn btn-secondary btn-sm">Upload design pack</button>
            </div>

            <div className="caption fw-6 mb-3 c-2">Or select from your existing catalogue:</div>
            <div className="plan-grid">
              {HOUSE_PLANS.map(p => (
                <div key={p.id} className={`plan-card ${wizPlans.includes(p.id) ? "selected" : ""}`} onClick={() => togglePlan(p.id)}>
                  <div className="plan-img" style={{ background: p.grad }}><span>{p.icon}</span></div>
                  <div className="p-4">
                    <div className="flex items-c j-between mb-1">
                      <span className="h-4">{p.name}</span>
                      {wizPlans.includes(p.id) && <span className="badge b-accepted">✓ Included</span>}
                    </div>
                    <div className="micro c-3 mb-2">{p.type} · from {fmtR(p.priceFrom)}</div>
                    <div className="plan-specs">
                      <span className="plan-spec">🛏 {p.beds}</span>
                      <span className="plan-spec">🛁 {p.baths}</span>
                      <span className="plan-spec">🚗 {p.garages}</span>
                      <span className="plan-spec">📐 {p.footprint}m² footprint</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 5 · Review ── */}
        {step === 4 && (
          <div className="card-body">
            <div className="h-3 mb-1">Review & publish</div>
            <div className="caption c-2 mb-5">Once published, you can generate explorer links for clients and track their activity per stand.</div>

            <div className="grid-2 gap-4 mb-5">
              <div className="card p-5" style={{ boxShadow: "none" }}>
                <div className="stat-label mb-2">Development</div>
                <div className="h-4 mb-1">Willow Creek Estate</div>
                <div className="caption c-2">Security Estate · Centurion, GP</div>
                <Divider />
                <div className="flex j-between caption mb-2"><span className="c-2">Stands captured</span><span className="fw-6 fs-m">{wizStands.length} of 28</span></div>
                <div className="flex j-between caption mb-2"><span className="c-2">House plans</span><span className="fw-6 fs-m">{wizPlans.length}</span></div>
                <div className="flex j-between caption mb-2"><span className="c-2">Coverage limit</span><span className="fw-6 fs-m">60%</span></div>
                <div className="flex j-between caption"><span className="c-2">Layout plan</span><span className="fw-6">✅ Uploaded</span></div>
              </div>
              <div className="card p-5 bg-info" style={{ boxShadow: "none" }}>
                <div className="stat-label mb-2">Automatic fit preview</div>
                <div className="caption c-2 mb-3">Smallest captured stand vs each included plan:</div>
                {wizPlans.map(pid => {
                  const p = HOUSE_PLANS.find(h => h.id === pid);
                  const smallest = { size: Math.min(...wizStands.map(s => Number(s.size) || 9999)) };
                  const fit = checkFit(p, smallest);
                  return (
                    <div key={pid} className="flex items-c j-between mb-2">
                      <span className="caption fw-5">{p.name}</span>
                      <FitBadge fit={fit} />
                    </div>
                  );
                })}
                <div className="micro c-3 mt-2">Full stand-by-stand matrix available after publishing.</div>
              </div>
            </div>

            <div className="check-row mb-2">
              <div className="check-box checked"><span style={{ color: "white", fontSize: 11 }}>✓</span></div>
              <span className="caption c-2">I confirm stand sizes and pricing match the approved Surveyor General diagram.</span>
            </div>
            <div className="check-row">
              <div className="check-box checked"><span style={{ color: "white", fontSize: 11 }}>✓</span></div>
              <span className="caption c-2">House plans comply with the estate architectural guidelines.</span>
            </div>
          </div>
        )}

        <div className="card-foot">
          <button className="btn btn-ghost" onClick={() => step === 0 ? setScreen("dev-dashboard") : setStep(step - 1)}>
            ← {step === 0 ? "Cancel" : "Back"}
          </button>
          <div className="ml-auto flex gap-2">
            <button className="btn btn-secondary">Save Draft</button>
            {step < steps.length - 1
              ? <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue →</button>
              : <button className="btn btn-accent" onClick={() => setScreen("dev-detail")}>🚀 Publish Development</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARE-WITH-CLIENT MODAL — generate & track explorer links
// ─────────────────────────────────────────────────────────────────────────────
const ShareModal = ({ stand, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [expiry, setExpiry] = useState("14 days");
  const link = `https://buildquote.co.za/explore/ridge-ruimsig?stand=${stand ? stand.id : "any"}&t=8f3k2m`;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="ava ava-lg" style={{ background: "var(--brand-accent-lt)", color: "var(--brand-accent)", borderRadius: "var(--r-md)", fontSize: 22 }}>🔗</div>
          <div>
            <div className="h-3">Share with a client</div>
            <div className="caption c-2">The client gets a private explorer link to browse {stand ? `${stand.no}` : "the estate"} and try house designs from home.</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="f-group">
              <label className="f-label">Client Name</label>
              <input className="inp" placeholder="e.g. Thabo Nkosi" />
            </div>
            <div className="f-group">
              <label className="f-label">Mobile / Email</label>
              <input className="inp" placeholder="+27 82 000 0000 or email" />
            </div>
          </div>
          <div className="form-row">
            <div className="f-group">
              <label className="f-label">Pre-select stand</label>
              <select className="inp" defaultValue={stand ? stand.no : "Let client choose"}>
                <option>Let client choose</option>
                {STANDS.filter(s => s.status === "AVAILABLE").map(s => <option key={s.id}>{s.no}</option>)}
              </select>
            </div>
            <div className="f-group">
              <label className="f-label">Link expires in</label>
              <select className="inp" value={expiry} onChange={e => setExpiry(e.target.value)}>
                {["7 days","14 days","30 days","Never"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="f-group">
            <label className="f-label">Personal note (shows on the explorer)</label>
            <textarea className="inp" style={{ minHeight: 64 }} placeholder="Great meeting you today! Stand 4 with The Protea is the combo we looked at — have a play and tell me what you think." />
          </div>
          <div className="f-group">
            <label className="f-label">Explorer link</label>
            <div className="share-link-box">
              <span className="lnk">{link}</span>
              <button className="btn btn-secondary btn-sm" onClick={() => setCopied(true)}>{copied ? "✓ Copied" : "Copy"}</button>
            </div>
            <div className="f-hint">You'll be notified when the client opens the link, configures a house, or requests a quote.</div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-secondary">📱 WhatsApp</button>
          <button className="btn btn-primary" onClick={onClose}>✉️ Send Link</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D3 — DEVELOPMENT DETAIL (map · stands · plans · fit matrix · leads)
// ─────────────────────────────────────────────────────────────────────────────
const DevelopmentDetailScreen = ({ setScreen }) => {
  const [tab, setTab] = useState("overview");
  const [selectedStand, setSelectedStand] = useState("ST-04");
  const [shareOpen, setShareOpen] = useState(false);
  const dev = DEVELOPMENTS[0];
  const stand = STANDS.find(s => s.id === selectedStand);

  return (
    <div className="page-wrap">
      {shareOpen && <ShareModal stand={stand} onClose={() => setShareOpen(false)} />}

      {/* Header */}
      <div className="flex items-c j-between mb-5" style={{ flexWrap: "wrap", gap: 12 }}>
        <div className="flex items-c gap-4">
          <div className="ava ava-xl" style={{ background: dev.grad, borderRadius: "var(--r-lg)", fontSize: 28 }}>{dev.icon}</div>
          <div>
            <div className="flex items-c gap-3 mb-1">
              <span className="h-2">{dev.name}</span>
              <DevBadge status={dev.status} />
            </div>
            <div className="caption c-2">{dev.id} · {dev.location} · Launched {dev.launched} · {dev.hoa}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={() => setScreen("dev-explorer")}>👁 Preview Explorer</button>
          <button className="btn btn-accent" onClick={() => setShareOpen(true)}>🔗 Share with Client</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs mb-6">
        {[["overview","Estate Map"],["stands","Stands"],["plans","House Plans"],["fit","Fit Matrix"],["leads","Leads & Links"]].map(([k, l]) => (
          <button key={k} className={`tab-item ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {/* ── TAB · Estate map ── */}
      {tab === "overview" && (
        <div className="grid-2 gap-6" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
          <div>
            <EstateMap stands={STANDS} selectedId={selectedStand} onSelect={setSelectedStand} />
            <div className="stat-grid mt-4" style={{ marginBottom: 0 }}>
              <StatCard label="Available" value={dev.standsAvailable} color="var(--success)" icon="🟢" />
              <StatCard label="Reserved" value={dev.standsReserved} color="var(--warning)" icon="🟡" />
              <StatCard label="Sold" value={dev.standsSold} color="var(--brand-primary)" icon="🔵" />
            </div>
          </div>

          {/* Selected stand panel */}
          <div>
            {stand ? (
              <div className="card">
                <div className="card-head">
                  <div>
                    <div className="flex items-c gap-2">
                      <span className="h-3">{stand.no}</span>
                      <StandBadge status={stand.status} />
                    </div>
                    <div className="caption c-3 mt-1">{stand.id} · {stand.orientation}-facing · {stand.frontage}m frontage{stand.servitude ? " · ⚡ Eskom servitude" : ""}</div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="grid-2 mb-4">
                    <div className="bg-brand-lt rounded-md p-4">
                      <div className="stat-label">Stand Size</div>
                      <div className="h-2 fs-m">{stand.size} m²</div>
                    </div>
                    <div className="bg-accent-lt rounded-md p-4">
                      <div className="stat-label">Price</div>
                      <div className="h-2 fs-m">{fmtR(stand.price)}</div>
                      <div className="micro c-3">R {Math.round(stand.price / stand.size).toLocaleString("en-ZA")}/m²</div>
                    </div>
                  </div>

                  <div className="stat-label mb-3">Which designs fit this stand?</div>
                  {HOUSE_PLANS.map(p => {
                    const fit = checkFit(p, stand);
                    return (
                      <div key={p.id} className="mb-4">
                        <div className="flex items-c j-between mb-2">
                          <div className="flex items-c gap-2">
                            <span style={{ fontSize: 16 }}>{p.icon}</span>
                            <span className="caption fw-6">{p.name}</span>
                            <span className="micro c-3">{p.footprint}m² footprint</span>
                          </div>
                          <FitBadge fit={fit} />
                        </div>
                        <FitMeter fit={fit} />
                      </div>
                    );
                  })}
                  <div className="micro c-3 mt-2">Based on {Math.round(COVERAGE_RATIO * 100)}% max coverage. Setbacks & building lines verified at plan approval.</div>
                </div>
                <div className="card-foot">
                  {stand.status === "AVAILABLE" && <>
                    <button className="btn btn-secondary btn-sm">Mark Reserved</button>
                    <button className="btn btn-primary btn-sm ml-auto" onClick={() => setShareOpen(true)}>🔗 Share this stand</button>
                  </>}
                  {stand.status !== "AVAILABLE" && <span className="caption c-3">This stand is {STAND_STATUSES[stand.status].label.toLowerCase()} — sharing disabled.</span>}
                </div>
              </div>
            ) : (
              <div className="card empty-state">
                <div className="empty-ico">👆</div>
                <div className="h-4">Select a stand on the map</div>
                <div className="caption c-2">Tap any numbered stand to see its size, price and which house designs fit.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB · Stands table ── */}
      {tab === "stands" && (
        <div className="card">
          <div className="card-head">
            <div className="h-3">Stand register</div>
            <div className="ml-auto flex gap-2">
              <button className="btn btn-secondary btn-sm">⬆ Import CSV</button>
              <button className="btn btn-primary btn-sm">+ Add Stand</button>
            </div>
          </div>
          <table className="tbl">
            <thead>
              <tr><th>Stand</th><th>Size</th><th>Price</th><th>R/m²</th><th>Orientation</th><th>Designs that fit</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {STANDS.map(s => {
                const fits = HOUSE_PLANS.filter(p => checkFit(p, s).verdict !== "no");
                return (
                  <tr key={s.id} onClick={() => { setSelectedStand(s.id); setTab("overview"); }}>
                    <td className="fw-6">{s.no}{s.servitude && " ⚡"}</td>
                    <td className="fs-m">{s.size} m²</td>
                    <td className="fs-m">{fmtR(s.price)}</td>
                    <td className="fs-m c-2">{Math.round(s.price / s.size).toLocaleString("en-ZA")}</td>
                    <td>{s.orientation}</td>
                    <td>
                      <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                        {fits.length
                          ? fits.map(p => <span key={p.id} className="tag" title={checkFit(p, s).label}>{p.icon} {p.name.replace("The ", "")}</span>)
                          : <span className="micro c-error">No catalogue design fits</span>}
                      </div>
                    </td>
                    <td><StandBadge status={s.status} /></td>
                    <td><button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setSelectedStand(s.id); setShareOpen(true); }}>🔗</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TAB · House plans ── */}
      {tab === "plans" && (
        <div>
          <div className="sec-head">
            <div>
              <div className="h-3">House plan catalogue</div>
              <div className="caption c-2">Predefined designs clients can build in {dev.name}.</div>
            </div>
            <button className="btn btn-primary btn-sm">+ Add House Plan</button>
          </div>
          <div className="plan-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
            {HOUSE_PLANS.map(p => {
              const fitsOn = STANDS.filter(s => s.status === "AVAILABLE" && checkFit(p, s).verdict !== "no").length;
              return (
                <div key={p.id} className="plan-card">
                  <div className="plan-img" style={{ background: p.grad, height: 150 }}><span style={{ fontSize: 52 }}>{p.icon}</span></div>
                  <div className="p-5">
                    <div className="flex items-c j-between mb-1">
                      <span className="h-3">{p.name}</span>
                      <span className="badge b-submitted">{p.type}</span>
                    </div>
                    <div className="caption c-2 mb-3" style={{ minHeight: 36 }}>{p.desc}</div>
                    <div className="plan-specs mb-3">
                      <span className="plan-spec">🛏 {p.beds} bed</span>
                      <span className="plan-spec">🛁 {p.baths} bath</span>
                      <span className="plan-spec">🚗 {p.garages} garage</span>
                    </div>
                    <div className="grid-2 mb-3">
                      <div className="bg-brand-lt rounded-md p-4" style={{ padding: 12 }}>
                        <div className="micro c-3">Footprint / Under roof</div>
                        <div className="caption fw-7 fs-m">{p.footprint} / {p.underRoof} m²</div>
                      </div>
                      <div className="bg-accent-lt rounded-md p-4" style={{ padding: 12 }}>
                        <div className="micro c-3">From</div>
                        <div className="caption fw-7 fs-m">{fmtR(p.priceFrom)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3" style={{ flexWrap: "wrap" }}>
                      {p.features.slice(0, 3).map(f => <Tag key={f}>{f}</Tag>)}
                    </div>
                    <div className="flex gap-2 mb-3" style={{ flexWrap: "wrap" }}>
                      {p.docs.map(d => <DocChip key={d} name={d} icon={d.endsWith(".jpg") ? "🖼️" : "📄"} />)}
                    </div>
                    <div className="flex items-c j-between" style={{ paddingTop: 10, borderTop: "1px solid var(--border-sub)" }}>
                      <span className="micro c-2">Fits <b className="c-success">{fitsOn}</b> of {STANDS.filter(s => s.status === "AVAILABLE").length} available stands</span>
                      <button className="btn btn-ghost btn-sm">Edit</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB · Fit matrix ── */}
      {tab === "fit" && (
        <div className="card">
          <div className="card-head">
            <div>
              <div className="h-3">Stand × House-plan fit matrix</div>
              <div className="caption c-2">Auto-calculated: ground footprint vs {Math.round(COVERAGE_RATIO * 100)}% coverage allowance per stand.</div>
            </div>
            <div className="ml-auto flex gap-3">
              <span className="legend-item"><span className="fit-cell good" style={{ width: 20, height: 20, fontSize: 11 }}>✓</span> Comfortable</span>
              <span className="legend-item"><span className="fit-cell tight" style={{ width: 20, height: 20, fontSize: 11 }}>⚠</span> Tight</span>
              <span className="legend-item"><span className="fit-cell no" style={{ width: 20, height: 20, fontSize: 11 }}>✕</span> Won't comply</span>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="fit-matrix">
              <thead>
                <tr>
                  <th>Stand</th><th>Size</th><th>Status</th>
                  {HOUSE_PLANS.map(p => <th key={p.id}>{p.icon}<br />{p.name.replace("The ", "")}<br /><span className="fs-m" style={{ fontWeight: 400 }}>{p.footprint}m²</span></th>)}
                </tr>
              </thead>
              <tbody>
                {STANDS.map(s => (
                  <tr key={s.id}>
                    <td className="fw-6">{s.no}</td>
                    <td className="fs-m">{s.size}m²</td>
                    <td><StandBadge status={s.status} /></td>
                    {HOUSE_PLANS.map(p => {
                      const fit = checkFit(p, s);
                      return (
                        <td key={p.id} title={`${p.name} on ${s.no}: ${fit.label} — covers ${Math.round(fit.coveragePct)}% of stand`}>
                          <span className={`fit-cell ${fit.verdict}`}>{fit.icon}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB · Leads & links ── */}
      {tab === "leads" && (
        <div className="grid-2 gap-6" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
          <div className="card">
            <div className="card-head">
              <div className="h-3">Explorer links & buyer journey</div>
              <button className="btn btn-primary btn-sm ml-auto" onClick={() => setShareOpen(true)}>+ New Link</button>
            </div>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Stand · Plan</th><th>Stage</th><th>Last Active</th><th></th></tr></thead>
              <tbody>
                {DEV_LEADS.map(l => {
                  const s = STANDS.find(x => x.id === l.stand);
                  const p = HOUSE_PLANS.find(x => x.id === l.plan);
                  return (
                    <tr key={l.id}>
                      <td>
                        <div className="flex items-c gap-2">
                          <Avatar name={l.client} bg={l.ava} size="sm" />
                          <span className="fw-6">{l.client}</span>
                        </div>
                      </td>
                      <td className="caption c-2">{s?.no}{p ? ` · ${p.name}` : ""}</td>
                      <td><LeadBadge stage={l.stage} /></td>
                      <td className="caption c-3">{l.lastActive}</td>
                      <td><button className="btn btn-ghost btn-sm" onClick={() => setScreen("dev-messages")}>💬</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card card-body mb-4">
              <div className="stat-label mb-3">Buyer funnel — The Ridge</div>
              {[["Links sent", 9, "var(--txt-3)"],["Opened & viewed", 7, "var(--brand-primary)"],["House configured", 4, "#7C3AED"],["Quote requested", 2, "#0369A1"],["Reserved / sold", 4, "var(--success)"]].map(([lbl, n, c]) => (
                <div key={lbl} className="mb-3">
                  <div className="flex j-between caption mb-1"><span className="c-2">{lbl}</span><span className="fw-7 fs-m">{n}</span></div>
                  <div className="progress"><div className="progress-fill" style={{ width: `${(n / 9) * 100}%`, background: c }} /></div>
                </div>
              ))}
            </div>
            <Notif type="info" icon="🔁" title="Handover to BuildQuote"
              msg="When a client requests a quote from the explorer, a client project is created automatically with the stand and house plan pre-filled, and enters the normal builder-matching and bank-application pipeline." />
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D5 — CLIENT EXPLORER (what the client sees when they open the link)
// ─────────────────────────────────────────────────────────────────────────────
const ClientExplorerScreen = ({ setScreen }) => {
  const [standId, setStandId] = useState("ST-04");
  const [planId, setPlanId] = useState("HP-01");
  const stand = STANDS.find(s => s.id === standId);
  const plan = HOUSE_PLANS.find(p => p.id === planId);
  const fit = useMemo(() => checkFit(plan, stand), [plan, stand]);
  const packagePrice = stand && plan ? stand.price + plan.priceFrom : null;

  return (
    <div className="page-wrap">
      {/* Hero */}
      <div className="explorer-hero">
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="flex items-c gap-2 mb-2">
            <span className="badge b-active">👁 Client Explorer Preview</span>
            <span className="badge" style={{ background: "rgba(255,255,255,0.14)", color: "white" }}>Link expires in 12 days</span>
          </div>
          <div className="h-1 c-white mb-2">The Ridge at Ruimsig</div>
          <div className="body c-white mb-3" style={{ opacity: 0.75, maxWidth: 560 }}>
            Hi Thabo! 👋 Great meeting you today. Pick a stand, try our house designs on it, and see instantly if your favourite fits.
            When you're happy, request a building quote right here. — <b>Neo, Kgatla Developments</b>
          </div>
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            {["🔒 24h Security","🌐 Fibre to home","🌳 Communal park","☀️ Solar ready"].map(t => (
              <span key={t} className="tag" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2 gap-6" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        {/* Left — choose stand & house */}
        <div>
          <div className="sec-head">
            <div className="h-3">1 · Choose your stand</div>
            <span className="caption c-3">{STANDS.filter(s => s.status === "AVAILABLE").length} available</span>
          </div>
          <EstateMap stands={STANDS} selectedId={standId} onSelect={id => {
            const s = STANDS.find(x => x.id === id);
            if (s.status === "AVAILABLE") setStandId(id);
          }} />

          <div className="sec-head mt-6">
            <div className="h-3">2 · Try a house design</div>
            <span className="caption c-3">{HOUSE_PLANS.length} designs in this estate</span>
          </div>
          <div className="plan-grid">
            {HOUSE_PLANS.map(p => {
              const f = checkFit(p, stand);
              return (
                <div key={p.id} className={`plan-card ${planId === p.id ? "selected" : ""}`} onClick={() => setPlanId(p.id)}>
                  <div className="plan-img" style={{ background: p.grad }}>
                    <span>{p.icon}</span>
                    <span style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}><FitBadge fit={f} /></span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-c j-between mb-1">
                      <span className="h-4">{p.name}</span>
                      {planId === p.id && <span className="badge b-accepted">Selected</span>}
                    </div>
                    <div className="micro c-3 mb-2">{p.type} · from {fmtR(p.priceFrom)}</div>
                    <div className="plan-specs">
                      <span className="plan-spec">🛏 {p.beds}</span>
                      <span className="plan-spec">🛁 {p.baths}</span>
                      <span className="plan-spec">🚗 {p.garages}</span>
                      <span className="plan-spec">📐 {p.footprint}m²</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — live summary & fit */}
        <div>
          <div className="card" style={{ position: "sticky", top: "calc(var(--topbar-h) + 16px)" }}>
            <div className="card-head">
              <div className="h-3">Your selection</div>
            </div>
            <div className="card-body">
              {/* Fit verdict */}
              {fit && (
                <div className={`notif ${fit.verdict === "good" ? "success" : fit.verdict === "tight" ? "warning" : "error"}`} style={{ marginBottom: 18 }}>
                  <span style={{ fontSize: 18 }}>{fit.verdict === "good" ? "✅" : fit.verdict === "tight" ? "⚠️" : "🚫"}</span>
                  <div>
                    <div className="fw-6 caption mb-1">
                      {fit.verdict === "good" && `${plan.name} fits ${stand.no} comfortably`}
                      {fit.verdict === "tight" && `${plan.name} is a tight fit on ${stand.no}`}
                      {fit.verdict === "no" && `${plan.name} won't comply on ${stand.no}`}
                    </div>
                    <div className="caption c-2">
                      {plan.footprint}m² footprint on a {stand.size}m² stand — {Math.round(fit.coveragePct)}% coverage
                      (limit {Math.round(COVERAGE_RATIO * 100)}%).
                      {fit.verdict === "tight" && " Little garden space will remain; consider a larger stand."}
                      {fit.verdict === "no" && " Try a larger stand or a design with a smaller footprint (a double storey helps)."}
                    </div>
                  </div>
                </div>
              )}
              <FitMeter fit={fit} />

              <Divider />

              <div className="flex j-between caption mb-2"><span className="c-2">Stand</span><span className="fw-6">{stand.no} · {stand.size}m² · {stand.orientation}</span></div>
              <div className="flex j-between caption mb-2"><span className="c-2">Stand price</span><span className="fw-6 fs-m">{fmtR(stand.price)}</span></div>
              <div className="flex j-between caption mb-2"><span className="c-2">House</span><span className="fw-6">{plan.name} · {plan.beds} bed {plan.type.toLowerCase()}</span></div>
              <div className="flex j-between caption mb-2"><span className="c-2">House from</span><span className="fw-6 fs-m">{fmtR(plan.priceFrom)}</span></div>
              <div className="flex j-between caption mb-2"><span className="c-2">Est. monthly levy</span><span className="fw-6 fs-m">R 1,850</span></div>

              <div className="rounded-md p-4 mt-3" style={{ background: "var(--brand-primary)" }}>
                <div className="flex j-between items-c">
                  <span className="caption c-white" style={{ opacity: 0.75 }}>Estimated package</span>
                  <span className="h-3 c-white fs-m">{fmtR(packagePrice)}</span>
                </div>
                <div className="micro c-white mt-1" style={{ opacity: 0.55 }}>Indicative only — final price via verified builder quote.</div>
              </div>
            </div>
            <div className="card-foot" style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
              <button className="btn btn-accent btn-lg w-full" disabled={fit && fit.verdict === "no"} onClick={() => setScreen("dev-detail")}>
                📋 Request Building Quote
              </button>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm flex-1">💬 Ask Neo a question</button>
                <button className="btn btn-secondary btn-sm flex-1">🤝 Reserve this stand</button>
              </div>
              <div className="micro c-3 text-center">Requesting a quote creates your BuildQuote project with this stand & design pre-filled — verified builders then quote on it.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D6 — MESSAGES
// ─────────────────────────────────────────────────────────────────────────────
const DeveloperMessagesScreen = () => {
  const [active, setActive] = useState("C-1");
  const [draft, setDraft] = useState("");
  const conv = DEV_MESSAGES.find(c => c.id === active);
  return (
    <div className="page-wrap">
      <div className="sec-head">
        <div>
          <div className="h-2">Messages</div>
          <div className="caption c-2">Conversations with clients exploring your developments.</div>
        </div>
        <button className="btn btn-secondary btn-sm">＋ New Message</button>
      </div>
      <div className="msg-layout">
        <div className="msg-list">
          {DEV_MESSAGES.map(c => (
            <div key={c.id} className={`msg-list-item ${active === c.id ? "active" : ""}`} onClick={() => setActive(c.id)}>
              <Avatar name={c.name} bg={c.ava} size="md" />
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div className="flex items-c j-between mb-1">
                  <span className="caption fw-6 truncate">{c.name}</span>
                  <span className="micro c-3">{c.time}</span>
                </div>
                <div className="micro c-2 truncate">{c.preview}</div>
              </div>
              {c.unread > 0 && <span className="sb-badge" style={{ marginLeft: 0 }}>{c.unread}</span>}
            </div>
          ))}
        </div>
        <div className="msg-thread">
          <div className="msg-thread-head">
            <Avatar name={conv.name} bg={conv.ava} size="md" />
            <div>
              <div className="caption fw-6">{conv.name}</div>
              <div className="micro c-3">Lead · The Ridge at Ruimsig</div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="btn btn-ico" title="Share explorer link">🔗</button>
              <button className="btn btn-ico" title="View lead">👤</button>
            </div>
          </div>
          <div className="msg-scroll">
            {conv.msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.who}`}>
                {m.text}
                <div className="bubble-time">{m.time}</div>
              </div>
            ))}
          </div>
          <div className="msg-composer">
            <button className="btn btn-ico" title="Attach">📎</button>
            <input className="inp" placeholder={`Message ${conv.name.split(" ")[0]}…`} value={draft} onChange={e => setDraft(e.target.value)} />
            <button className="btn btn-primary" disabled={!draft}>Send ↑</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D7 — COMPANY PROFILE
// ─────────────────────────────────────────────────────────────────────────────
const CompanyScreen = () => {
  const [tab, setTab] = useState("details");
  return (
    <div className="page-wrap max-content" style={{ margin: "0 auto", width: "100%" }}>
      <div className="flex items-c gap-4 mb-6">
        <div className="ava ava-xl" style={{ background: "linear-gradient(135deg,#1C3557,#3D5F8A)", borderRadius: "var(--r-lg)", fontSize: 26 }}>🏢</div>
        <div className="flex-1">
          <div className="flex items-c gap-3 mb-1">
            <span className="h-2">Kgatla Developments (Pty) Ltd</span>
            <span className="badge b-verified">✓ Verified Developer</span>
          </div>
          <div className="caption c-2">Reg 2014/187654/07 · NHBRC Enrolled · Member since 2024 · 3 developments · 49 stands</div>
        </div>
        <button className="btn btn-secondary">👁 Public Profile</button>
      </div>

      <div className="tabs mb-6">
        {[["details","Company Details"],["branding","Branding"],["team","Team"],["docs","Compliance Docs"]].map(([k, l]) => (
          <button key={k} className={`tab-item ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "details" && (
        <div className="card card-body">
          <div className="form-row">
            <div className="f-group"><label className="f-label">Registered Company Name <span className="req">*</span></label><input className="inp" defaultValue="Kgatla Developments (Pty) Ltd" /></div>
            <div className="f-group"><label className="f-label">Trading As</label><input className="inp" defaultValue="Kgatla Developments" /></div>
          </div>
          <div className="form-row3">
            <div className="f-group"><label className="f-label">Company Reg No <span className="req">*</span></label><input className="inp" defaultValue="2014/187654/07" /></div>
            <div className="f-group"><label className="f-label">VAT Number</label><input className="inp" defaultValue="4890265731" /></div>
            <div className="f-group"><label className="f-label">NHBRC Enrolment No <span className="req">*</span></label><input className="inp" defaultValue="1-2014-889021" /></div>
          </div>
          <div className="form-row">
            <div className="f-group"><label className="f-label">Head Office</label><div className="inp-wrap"><span className="inp-ico">📍</span><input className="inp" defaultValue="12 Jellicoe Ave, Rosebank, Johannesburg" /></div></div>
            <div className="f-group"><label className="f-label">Website</label><div className="inp-wrap"><span className="inp-ico">🌐</span><input className="inp" defaultValue="www.kgatladev.co.za" /></div></div>
          </div>
          <div className="f-group">
            <label className="f-label">Company Bio (shows on explorer links)</label>
            <textarea className="inp" defaultValue="Kgatla Developments creates secure, fibre-ready lifestyle estates across Gauteng and KZN. Every home is NHBRC-enrolled and built by BuildQuote-verified contractors." />
          </div>
          <div className="flex j-between items-c mt-2">
            <span className="caption c-3">Last updated 04 Jul 2026</span>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      )}

      {tab === "branding" && (
        <div className="grid-2 gap-6">
          <div className="card card-body">
            <div className="h-4 mb-3">Logo & colours</div>
            <div className="upload-zone mb-4">
              <div style={{ fontSize: 26, marginBottom: 6 }}>🏢</div>
              <div className="caption fw-6 mb-1">Upload company logo</div>
              <div className="micro c-3">PNG or SVG · square, min 256px</div>
            </div>
            <div className="f-group">
              <label className="f-label">Brand colour (explorer accents)</label>
              <div className="flex gap-2">
                {["#1C3557","#C4622D","#2A7D4F","#6D28D9","#0369A1"].map((c, i) => (
                  <div key={c} style={{ width: 34, height: 34, borderRadius: 10, background: c, cursor: "pointer", boxShadow: i === 0 ? "0 0 0 3px rgba(28,53,87,0.25)" : "none", border: "2px solid white" }} />
                ))}
              </div>
            </div>
          </div>
          <div className="card card-body">
            <div className="h-4 mb-3">Explorer link preview</div>
            <div className="explorer-hero" style={{ marginBottom: 0, padding: "20px 22px" }}>
              <div className="relative" style={{ zIndex: 1 }}>
                <div className="micro c-white mb-1" style={{ opacity: 0.6 }}>KGATLA DEVELOPMENTS PRESENTS</div>
                <div className="h-3 c-white mb-1">The Ridge at Ruimsig</div>
                <div className="micro c-white" style={{ opacity: 0.7 }}>Your logo, colours and bio appear on every client explorer link.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="card">
          <div className="card-head">
            <div className="h-3">Team members</div>
            <button className="btn btn-primary btn-sm ml-auto">+ Invite Member</button>
          </div>
          <table className="tbl">
            <thead><tr><th>Member</th><th>Role</th><th>Developments</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {[
                { n:"Neo Kgatla",      r:"Owner / Director",   d:"All", s:"b-active",  sl:"Active", a:"#1C3557" },
                { n:"Zanele Mthembu",  r:"Sales Agent",        d:"The Ridge",  s:"b-active",  sl:"Active", a:"#C4622D" },
                { n:"Pieter du Toit",  r:"Sales Agent",        d:"Willow Creek", s:"b-active", sl:"Active", a:"#2A7D4F" },
                { n:"Ayesha Karim",    r:"Finance",            d:"All", s:"b-pending", sl:"Invite Sent", a:"#7C3AED" },
              ].map(m => (
                <tr key={m.n}>
                  <td><div className="flex items-c gap-2"><Avatar name={m.n} bg={m.a} size="sm" /><span className="fw-6">{m.n}</span></div></td>
                  <td className="caption c-2">{m.r}</td>
                  <td className="caption c-2">{m.d}</td>
                  <td><span className={`badge ${m.s}`}>{m.sl}</span></td>
                  <td><button className="btn btn-ghost btn-sm">⋯</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "docs" && (
        <div className="card card-body">
          <div className="h-4 mb-1">Compliance documents</div>
          <div className="caption c-2 mb-4">Required before developments can be published. Verified by BuildQuote admin.</div>
          {[
            { n:"Company Registration (CIPC)", f:"CIPC_CoR14.3.pdf", ok:true },
            { n:"NHBRC Enrolment Certificate", f:"NHBRC_Enrolment_2026.pdf", ok:true },
            { n:"Tax Clearance / Pin", f:"SARS_TCS_Pin.pdf", ok:true },
            { n:"Township Establishment Approval — Willow Creek", f:null, ok:false },
          ].map(d => (
            <div key={d.n} className="flex items-c gap-3 p-4 border-sub rounded-md mb-3">
              <span style={{ fontSize: 20 }}>{d.ok ? "✅" : "⚠️"}</span>
              <div className="flex-1">
                <div className="caption fw-6">{d.n}</div>
                <div className="micro c-3">{d.f ? d.f : "Outstanding — required before Willow Creek can launch"}</div>
              </div>
              {d.f ? <DocChip name="View" icon="📄" /> : <button className="btn btn-secondary btn-sm">Upload</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN D8 — PROFILE & SETTINGS (personal)
// ─────────────────────────────────────────────────────────────────────────────
const DeveloperProfileScreen = () => (
  <div className="page-wrap max-content" style={{ margin: "0 auto", width: "100%" }}>
    <div className="flex items-c gap-4 mb-6">
      <Avatar name="Neo Kgatla" bg="#1C3557" size="xl" />
      <div className="flex-1">
        <div className="h-2 mb-1">Neo Kgatla</div>
        <div className="caption c-2">Property Developer · Kgatla Developments · Johannesburg</div>
      </div>
      <span className="badge b-verified">✓ Verified Developer</span>
    </div>

    <div className="grid-2 gap-6">
      <div className="card card-body">
        <div className="h-4 mb-4">Personal details</div>
        <div className="form-row">
          <div className="f-group"><label className="f-label">First Name</label><input className="inp" defaultValue="Neo" /></div>
          <div className="f-group"><label className="f-label">Last Name</label><input className="inp" defaultValue="Kgatla" /></div>
        </div>
        <div className="f-group"><label className="f-label">Email</label><div className="inp-wrap"><span className="inp-ico">✉️</span><input className="inp" defaultValue="neo@kgatladev.co.za" /></div></div>
        <div className="f-group"><label className="f-label">Phone</label><div className="inp-wrap"><span className="inp-ico">📱</span><input className="inp" defaultValue="+27 82 445 7810" /></div></div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div>
        <div className="card card-body mb-4">
          <div className="h-4 mb-4">Notifications</div>
          {[
            ["Explorer link opened by a client", true],
            ["House configured on a stand", true],
            ["Quote requested (handover to BuildQuote)", true],
            ["Stand reserved or sold", true],
            ["Weekly pipeline summary", false],
          ].map(([l, on]) => (
            <div key={l} className="flex items-c j-between mb-3">
              <span className="caption c-2">{l}</span>
              <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? "var(--success)" : "var(--border-med)", position: "relative", cursor: "pointer", transition: "background 140ms" }}>
                <div style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "white", boxShadow: "var(--shadow-xs)", transition: "left 140ms" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card card-body">
          <div className="h-4 mb-3">Security</div>
          <div className="flex items-c j-between mb-3">
            <div><div className="caption fw-6">Two-factor authentication</div><div className="micro c-3">Via SMS to +27 82 ••• 7810</div></div>
            <span className="badge b-active">Enabled</span>
          </div>
          <button className="btn btn-secondary btn-sm">Change Password</button>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR — developer navigation (Dashboard · Projects · Messages · Profile · Company)
// ─────────────────────────────────────────────────────────────────────────────
const developerNav = [
  { section: "Main", items: [
    { key:"dev-dashboard", icon:"🏘️", label:"Dashboard" },
  ]},
  { section: "Projects", items: [
    { key:"dev-detail",    icon:"📋", label:"My Developments", badge:"3" },
    { key:"dev-create",    icon:"＋", label:"New Development" },
    { key:"dev-explorer",  icon:"👁", label:"Explorer Preview" },
  ]},
  { section: "Messages", items: [
    { key:"dev-messages",  icon:"💬", label:"Messages", badge:"2" },
  ]},
  { section: "Account", items: [
    { key:"dev-profile",   icon:"👤", label:"Profile & Settings" },
    { key:"dev-company",   icon:"🏢", label:"Company" },
  ]},
];

const Sidebar = ({ activeScreen, setScreen }) => (
  <div className="sidebar">
    <div className="sb-logo">
      <div className="sb-logo-mark">🏗️</div>
      <div className="sb-logo-name">Build<em>Quote</em></div>
    </div>
    <div className="sb-nav">
      {developerNav.map(section => (
        <div key={section.section}>
          <div className="sb-section-label">{section.section}</div>
          {section.items.map(item => (
            <button key={item.key} className={`sb-item ${activeScreen === item.key ? "active" : ""}`} onClick={() => setScreen(item.key)}>
              <span className="sb-item-ico">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="sb-badge">{item.badge}</span>}
            </button>
          ))}
          <div className="sb-divider" />
        </div>
      ))}
    </div>
    <div className="sb-user" onClick={() => setScreen("dev-profile")}>
      <Avatar name="Neo Kgatla" bg="#7C3AED" size="sm" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="sb-user-name">Neo Kgatla</div>
        <div className="sb-user-role">Property Developer</div>
      </div>
      <span style={{ color:"rgba(255,255,255,0.3)", fontSize:12 }}>⚙</span>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────
const topbarConfig = {
  "dev-dashboard": { title:"Dashboard",           sub:"Your developments, stands and buyer activity" },
  "dev-create":    { title:"New Development",     sub:"Set up stands, layout and house designs" },
  "dev-detail":    { title:"Development Detail",  sub:"DEV-2026-001 — The Ridge at Ruimsig" },
  "dev-explorer":  { title:"Client Explorer",     sub:"Preview — what your client sees at home" },
  "dev-messages":  { title:"Messages",            sub:"Client conversations across developments" },
  "dev-company":   { title:"Company",             sub:"Kgatla Developments (Pty) Ltd" },
  "dev-profile":   { title:"Profile & Settings",  sub:"Manage your account" },
};

const Topbar = ({ screen }) => {
  const cfg = topbarConfig[screen] || { title: screen, sub: "" };
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{cfg.title}</div>
        {cfg.sub && <div className="topbar-sub">{cfg.sub}</div>}
      </div>
      <div className="topbar-actions">
        <button className="btn btn-ico" title="Notifications">
          <span style={{ position: "relative" }}>
            🔔
            <span style={{ position:"absolute", top:-2, right:-2, width:8, height:8, background:"var(--brand-accent)", borderRadius:"50%", border:"1.5px solid white" }} />
          </span>
        </button>
        <button className="btn btn-ico" title="Help">❓</button>
        <button className="btn btn-secondary btn-sm">Sign Out</button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DEMO NAV — jump between the new developer screens
// ─────────────────────────────────────────────────────────────────────────────
const DemoNav = ({ screen, setScreen }) => {
  const screens = [
    { key:"dev-dashboard", label:"① Developer Dash" },
    { key:"dev-create",    label:"② New Development" },
    { key:"dev-detail",    label:"③ Development Detail" },
    { key:"dev-explorer",  label:"④ Client Explorer" },
    { key:"dev-messages",  label:"⑤ Messages" },
    { key:"dev-company",   label:"⑥ Company" },
    { key:"dev-profile",   label:"⑦ Profile" },
  ];
  return (
    <div className="demo-nav">
      <span className="demo-label">Developer Module Preview</span>
      {screens.map(s => (
        <button key={s.key} className={`demo-btn ${screen === s.key ? "active" : ""}`} onClick={() => setScreen(s.key)}>{s.label}</button>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function DeveloperPortal() {
  const [screen, setScreen] = useState("dev-dashboard");

  const renderScreen = () => {
    switch (screen) {
      case "dev-dashboard": return <DeveloperDashboard setScreen={setScreen} />;
      case "dev-create":    return <CreateDevelopmentScreen setScreen={setScreen} />;
      case "dev-detail":    return <DevelopmentDetailScreen setScreen={setScreen} />;
      case "dev-explorer":  return <ClientExplorerScreen setScreen={setScreen} />;
      case "dev-messages":  return <DeveloperMessagesScreen />;
      case "dev-company":   return <CompanyScreen />;
      case "dev-profile":   return <DeveloperProfileScreen />;
      default:              return <DeveloperDashboard setScreen={setScreen} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <DemoNav screen={screen} setScreen={setScreen} />
      <div className="app-shell">
        <Sidebar activeScreen={screen} setScreen={setScreen} />
        <div className="main-area">
          <Topbar screen={screen} />
          {renderScreen()}
        </div>
      </div>
    </>
  );
}
