/**
 * BuildQuote Platform
 * Apple HIG — Liquid Glass Design System
 * Senior UI Design: Web Applications Division
 *
 * Complete UI covering all 8 screens:
 *  1. Welcome / Role Onboarding
 *  2. Client Dashboard
 *  3. Builder Dashboard
 *  4. Admin Dashboard
 *  5. Create Project Request  (Client — 6-step form)
 *  6. Quote Builder           (Builder)
 *  7. Project Detail View
 *  8. Profile & Settings
 * + Search / Filter screen
 * + Bank Submission screen
 * + Empty / Error states
 */

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — injected as global CSS
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

  /* ── Animations ── */
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideUp  { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes slideIn  { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes shimmer  { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.45} }
  @keyframes pop      { 0%{transform:scale(0.85);opacity:0} 80%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }

  /* ── Layout ── */
  .app-shell   { display:flex; min-height:100vh; position:relative; }
  .main-area   { margin-left:var(--sidebar-w); flex:1; display:flex; flex-direction:column; min-height:100vh; overflow-x:hidden; }
  .page-wrap   { padding:32px 36px; flex:1; animation:slideIn var(--dur-slow) var(--ease-out); }
  .max-content { max-width:1200px; }

  /* ── Sidebar ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--bg-sidebar);
    position: fixed; top:0; left:0; bottom:0;
    display: flex; flex-direction:column;
    z-index: 100; overflow-y:auto; overflow-x:hidden;
  }
  .sb-logo {
    display:flex; align-items:center; gap:10px;
    padding:24px 20px 20px;
    border-bottom:1px solid rgba(255,255,255,0.07);
  }
  .sb-logo-mark {
    width:34px; height:34px; border-radius:10px;
    background:linear-gradient(135deg,var(--brand-accent),#E8956B);
    display:flex; align-items:center; justify-content:center;
    font-size:17px; flex-shrink:0;
    box-shadow:0 4px 12px rgba(196,98,45,0.4);
  }
  .sb-logo-name {
    font-family:var(--font-d); font-size:19px;
    color:var(--txt-dark); letter-spacing:-0.3px;
  }
  .sb-logo-name em { color:#F4A570; font-style:normal; }
  .sb-nav { padding:16px 12px; flex:1; }
  .sb-section-label {
    font-size:9.5px; font-weight:700; letter-spacing:1.1px;
    text-transform:uppercase; color:var(--txt-dark-2);
    padding:12px 8px 6px; margin-top:4px;
  }
  .sb-item {
    display:flex; align-items:center; gap:10px;
    padding:8px 10px; border-radius:10px;
    font-size:13.5px; font-weight:400; color:var(--txt-dark-2);
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    position:relative; margin-bottom:1px; width:100%; text-align:left;
  }
  .sb-item:hover  { background:var(--bg-sidebar-hover); color:var(--txt-dark); }
  .sb-item.active { background:rgba(196,98,45,0.18); color:#F4A570; font-weight:500; }
  .sb-item-ico    { width:18px; text-align:center; font-size:15px; flex-shrink:0; }
  .sb-badge {
    margin-left:auto; background:var(--brand-accent); color:white;
    font-size:9.5px; font-weight:700; padding:1px 6px;
    border-radius:var(--r-full); min-width:18px; text-align:center;
  }
  .sb-divider { height:1px; background:rgba(255,255,255,0.07); margin:8px 16px; }
  .sb-user {
    margin-top:auto; padding:14px 16px;
    border-top:1px solid rgba(255,255,255,0.08);
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

  .btn-primary {
    background:var(--brand-primary); color:white;
    padding:9px 20px; border-radius:var(--r-md); font-size:13.5px;
    box-shadow:0 2px 8px rgba(28,53,87,0.25);
  }
  .btn-primary:hover { background:var(--brand-mid); box-shadow:0 4px 16px rgba(28,53,87,0.30); transform:translateY(-1px); }
  .btn-primary:active { transform:translateY(0); }

  .btn-accent {
    background:var(--brand-accent); color:white;
    padding:9px 20px; border-radius:var(--r-md); font-size:13.5px;
    box-shadow:0 2px 8px rgba(196,98,45,0.30);
  }
  .btn-accent:hover { background:#B5581F; box-shadow:0 4px 16px rgba(196,98,45,0.35); transform:translateY(-1px); }

  .btn-secondary {
    background:white; color:var(--txt-1);
    padding:8px 18px; border-radius:var(--r-md); font-size:13.5px;
    border:1px solid var(--border-med); box-shadow:var(--shadow-xs);
  }
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
  .btn-ico-lg { width:40px; height:40px; padding:0; border-radius:var(--r-md); background:white; border:1px solid var(--border-med); color:var(--txt-2); box-shadow:var(--shadow-xs); }

  /* ── Cards ── */
  .card { background:white; border-radius:var(--r-lg); border:1px solid var(--border-sub); box-shadow:var(--shadow-sm); overflow:hidden; }
  .card-glass {
    background:var(--bg-glass);
    backdrop-filter:blur(22px) saturate(1.6);
    -webkit-backdrop-filter:blur(22px) saturate(1.6);
    border-radius:var(--r-lg); border:1px solid rgba(255,255,255,0.65);
    box-shadow:var(--shadow-md); overflow:hidden;
  }
  .card-head {
    padding:18px 22px; border-bottom:1px solid var(--border-sub);
    display:flex; align-items:center; gap:10px;
  }
  .card-body { padding:22px; }
  .card-foot {
    padding:14px 22px; border-top:1px solid var(--border-sub);
    background:rgba(0,0,0,0.017);
    display:flex; align-items:center; gap:10px;
  }

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
  .badge {
    display:inline-flex; align-items:center; gap:5px;
    padding:2px 9px; border-radius:var(--r-full);
    font-size:10.5px; font-weight:700; letter-spacing:0.3px; white-space:nowrap;
  }
  .bdot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

  .b-draft      { background:rgba(0,0,0,0.06); color:var(--txt-2); }
  .b-submitted  { background:rgba(28,53,87,0.10); color:var(--brand-primary); }
  .b-pending    { background:rgba(180,83,9,0.12); color:#92400E; }
  .b-review     { background:rgba(109,40,217,0.10); color:#6D28D9; }
  .b-matched    { background:rgba(2,132,199,0.10); color:#0369A1; }
  .b-quoted     { background:rgba(109,40,217,0.14); color:#5B21B6; }
  .b-accepted   { background:rgba(42,125,79,0.14); color:#166534; }
  .b-rejected   { background:var(--error-bg); color:var(--error); }
  .b-inprogress { background:rgba(2,132,199,0.12); color:#0369A1; }
  .b-banksubmit { background:rgba(109,40,217,0.16); color:#4C1D95; }
  .b-completed  { background:rgba(42,125,79,0.20); color:#166534; }
  .b-verified   { background:rgba(42,125,79,0.12); color:var(--success); }
  .b-suspended  { background:var(--error-bg); color:var(--error); }
  .b-active     { background:rgba(42,125,79,0.12); color:var(--success); }

  /* ── Forms ── */
  .form-row  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .form-row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
  .f-group   { margin-bottom:18px; }
  .f-label   { display:block; font-size:12.5px; font-weight:500; color:var(--txt-1); margin-bottom:6px; }
  .f-label .req { color:var(--brand-accent); margin-left:2px; }
  .f-hint    { font-size:11.5px; color:var(--txt-3); margin-top:5px; line-height:1.4; }
  .f-error   { font-size:11.5px; color:var(--error); margin-top:5px; display:flex; align-items:center; gap:4px; }

  .inp {
    width:100%; padding:9px 13px;
    background:white; border:1.5px solid var(--border-med);
    border-radius:var(--r-md); font-size:13.5px; color:var(--txt-1);
    transition:all var(--dur-fast) var(--ease-out); outline:none;
  }
  .inp::placeholder { color:var(--txt-3); }
  .inp:focus { border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }
  .inp.err   { border-color:var(--error); box-shadow:0 0 0 3px rgba(192,57,43,0.10); }
  .inp.ok    { border-color:var(--success); box-shadow:0 0 0 3px rgba(42,125,79,0.10); }
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

  /* ── Checkbox / Radio ── */
  .check-row { display:flex; align-items:center; gap:10px; cursor:pointer; }
  .check-box {
    width:18px; height:18px; border-radius:5px;
    border:1.5px solid var(--border-med); background:white;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    transition:all var(--dur-fast) var(--ease-out);
  }
  .check-box.checked { background:var(--brand-primary); border-color:var(--brand-primary); }

  /* ── Tabs ── */
  .tabs {
    display:flex; gap:2px; background:rgba(0,0,0,0.05);
    padding:3px; border-radius:var(--r-md); width:fit-content;
  }
  .tab-item {
    padding:5px 16px; border-radius:calc(var(--r-md) - 2px);
    font-size:12.5px; font-weight:500; color:var(--txt-2);
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    border:none; background:none; white-space:nowrap;
  }
  .tab-item.active { background:white; color:var(--txt-1); box-shadow:var(--shadow-sm); }
  .tab-item:hover:not(.active) { color:var(--txt-1); }

  /* ── Table ── */
  .tbl { width:100%; border-collapse:collapse; }
  .tbl th {
    text-align:left; font-size:10.5px; font-weight:700;
    color:var(--txt-3); text-transform:uppercase; letter-spacing:0.7px;
    padding:10px 16px; border-bottom:1px solid var(--border-sub); white-space:nowrap;
  }
  .tbl td {
    padding:11px 16px; font-size:13px; color:var(--txt-1);
    border-bottom:1px solid var(--border-sub); vertical-align:middle;
  }
  .tbl tbody tr { cursor:pointer; transition:background var(--dur-fast); }
  .tbl tbody tr:hover { background:rgba(0,0,0,0.018); }
  .tbl tr:last-child td { border-bottom:none; }

  /* ── Steps / Wizard ── */
  .stepper { display:flex; align-items:flex-start; margin-bottom:36px; }
  .step-node { display:flex; flex-direction:column; align-items:center; flex:1; position:relative; }
  .step-circ {
    width:30px; height:30px; border-radius:50%; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:700; z-index:1;
    transition:all var(--dur-norm) var(--ease-out);
  }
  .step-circ.done   { background:var(--success); color:white; box-shadow:0 0 0 4px rgba(42,125,79,0.15); }
  .step-circ.active { background:var(--brand-primary); color:white; box-shadow:0 0 0 4px rgba(28,53,87,0.15); }
  .step-circ.todo   { background:white; color:var(--txt-3); border:2px solid var(--border-med); }
  .step-lbl { font-size:10.5px; font-weight:500; color:var(--txt-3); text-align:center; margin-top:7px; white-space:nowrap; }
  .step-lbl.active { color:var(--brand-primary); font-weight:700; }
  .step-lbl.done   { color:var(--success); }
  .step-line {
    position:absolute; top:15px; left:50%; right:-50%;
    height:2px; background:var(--border-med); z-index:0;
  }
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
  .modal {
    background:white; border-radius:var(--r-xl);
    box-shadow:var(--shadow-xl); width:100%; max-width:520px;
    max-height:92vh; overflow-y:auto;
    animation:slideUp var(--dur-slow) var(--ease-out);
  }
  .modal-lg { max-width:740px; }
  .modal-head { padding:24px 24px 16px; display:flex; align-items:flex-start; gap:14px; }
  .modal-body { padding:0 24px 24px; }
  .modal-foot { padding:14px 24px; border-top:1px solid var(--border-sub); display:flex; align-items:center; justify-content:flex-end; gap:10px; }

  /* ── Upload ── */
  .upload-zone {
    border:2px dashed var(--border-med); border-radius:var(--r-lg);
    padding:28px; text-align:center; cursor:pointer;
    transition:all var(--dur-fast) var(--ease-out); background:rgba(0,0,0,0.01);
  }
  .upload-zone:hover { border-color:var(--brand-primary); background:var(--info-bg); }

  /* ── Skeleton ── */
  .skel {
    background:linear-gradient(90deg,#f0ede8 25%,#e8e4df 50%,#f0ede8 75%);
    background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:var(--r-sm);
  }

  /* ── Notification ── */
  .notif { padding:12px 16px; border-radius:var(--r-md); display:flex; align-items:flex-start; gap:10px; margin-bottom:14px; }
  .notif.info    { background:var(--info-bg); border-left:3px solid var(--brand-primary); }
  .notif.success { background:var(--success-bg); border-left:3px solid var(--success); }
  .notif.warning { background:var(--warning-bg); border-left:3px solid var(--warning); }
  .notif.error   { background:var(--error-bg); border-left:3px solid var(--error); }

  /* ── Quote table ── */
  .q-tbl { width:100%; border-collapse:collapse; }
  .q-tbl th { background:rgba(0,0,0,0.03); padding:10px 14px; text-align:left; font-size:10.5px; font-weight:700; color:var(--txt-2); text-transform:uppercase; letter-spacing:0.5px; }
  .q-tbl td { padding:10px 14px; border-bottom:1px solid var(--border-sub); font-size:12.5px; }
  .q-tbl tr:last-child td { border-bottom:none; }
  .q-tbl .num { font-family:var(--font-m); text-align:right; }
  .q-total { background:var(--brand-primary); }
  .q-total td { color:white; font-weight:600; font-size:14px; border:none; padding:13px 14px; }

  /* ── Match score ── */
  .match-bar { height:4px; background:var(--border-sub); border-radius:2px; overflow:hidden; flex:1; }
  .match-fill { height:100%; background:linear-gradient(90deg,var(--brand-primary),var(--brand-accent)); border-radius:2px; }

  /* ── Welcome screen ── */
  .welcome-wrap { min-height:100vh; display:flex; background:var(--bg-base); overflow:hidden; }
  .welcome-left {
    width:52%; background:var(--brand-primary); padding:48px 52px;
    display:flex; flex-direction:column; justify-content:space-between;
    position:relative; overflow:hidden;
  }
  .welcome-left::before {
    content:''; position:absolute; bottom:-120px; right:-80px;
    width:460px; height:460px; border-radius:50%;
    background:rgba(196,98,45,0.14); pointer-events:none;
  }
  .welcome-left::after {
    content:''; position:absolute; top:-60px; left:-60px;
    width:320px; height:320px; border-radius:50%;
    background:rgba(255,255,255,0.04); pointer-events:none;
  }
  .welcome-right {
    width:48%; padding:52px 48px; display:flex;
    flex-direction:column; justify-content:center; align-items:center;
  }
  .welcome-right-inner { width:100%; max-width:390px; }
  .role-card {
    border:2px solid var(--border-med); border-radius:var(--r-xl);
    padding:20px; cursor:pointer;
    transition:all var(--dur-norm) var(--ease-out);
    background:white; margin-bottom:12px; position:relative; overflow:hidden;
  }
  .role-card:hover     { border-color:var(--brand-primary); box-shadow:0 0 0 4px rgba(28,53,87,0.07),var(--shadow-md); transform:translateY(-2px); }
  .role-card.selected  { border-color:var(--brand-primary); background:rgba(28,53,87,0.025); box-shadow:0 0 0 4px rgba(28,53,87,0.09); }
  .role-ico { width:44px; height:44px; border-radius:var(--r-md); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:12px; }
  .check-mark {
    position:absolute; top:16px; right:16px;
    width:20px; height:20px; border-radius:50%;
    background:var(--brand-primary); display:flex; align-items:center; justify-content:center;
    color:white; font-size:11px; opacity:0; transform:scale(0.5);
    transition:all var(--dur-norm) var(--ease-spring);
  }
  .role-card.selected .check-mark { opacity:1; transform:scale(1); }

  /* ── Map placeholder ── */
  .map-ph {
    background:linear-gradient(135deg,#e8efea 0%,#d5e3d8 50%,#c8d8cc 100%);
    border-radius:var(--r-lg); position:relative; overflow:hidden;
    height:180px; display:flex; align-items:center; justify-content:center;
  }
  .map-ph::before {
    content:''; position:absolute; inset:0;
    background-image:linear-gradient(rgba(255,255,255,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.25) 1px,transparent 1px);
    background-size:28px 28px;
  }
  .map-pin { font-size:28px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2)); position:relative; z-index:1; animation:pop 0.5s var(--ease-spring) 0.3s both; }

  /* ── Doc chip ── */
  .doc-chip {
    display:inline-flex; align-items:center; gap:6px; padding:6px 10px;
    background:rgba(0,0,0,0.04); border:1px solid var(--border-sub);
    border-radius:var(--r-md); font-size:11.5px; color:var(--txt-2);
    cursor:pointer; transition:background var(--dur-fast); white-space:nowrap;
  }
  .doc-chip:hover { background:rgba(0,0,0,0.07); }

  /* ── Empty state ── */
  .empty-state {
    text-align:center; padding:56px 28px;
    display:flex; flex-direction:column; align-items:center; gap:12px;
  }
  .empty-ico {
    width:68px; height:68px; border-radius:var(--r-xl);
    background:rgba(0,0,0,0.04); display:flex; align-items:center;
    justify-content:center; font-size:30px; margin-bottom:4px;
  }

  /* ── Tag ── */
  .tag {
    display:inline-flex; align-items:center; gap:4px; padding:3px 10px;
    background:rgba(0,0,0,0.05); border-radius:var(--r-full);
    font-size:11.5px; font-weight:500; color:var(--txt-2);
  }

  /* ── Avatar ── */
  .ava { border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:600; color:white; flex-shrink:0; }
  .ava-sm { width:26px; height:26px; font-size:10px; }
  .ava-md { width:34px; height:34px; font-size:13px; }
  .ava-lg { width:46px; height:46px; font-size:17px; }
  .ava-xl { width:64px; height:64px; font-size:22px; }

  /* ── Section header ── */
  .sec-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }

  /* ── Divider ── */
  .divider { height:1px; background:var(--border-sub); margin:18px 0; }

  /* ── Utility ── */
  .flex     { display:flex; }
  .flex-col { flex-direction:column; }
  .flex-1   { flex:1; }
  .items-c  { align-items:center; }
  .items-s  { align-items:flex-start; }
  .j-between{ justify-content:space-between; }
  .j-center { justify-content:center; }
  .gap-2  { gap:6px; }
  .gap-3  { gap:10px; }
  .gap-4  { gap:14px; }
  .gap-6  { gap:20px; }
  .gap-8  { gap:28px; }
  .w-full { width:100%; }
  .relative{ position:relative; }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
  .grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }

  .mb-1{margin-bottom:4px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}
  .mb-5{margin-bottom:20px}.mb-6{margin-bottom:24px}.mb-8{margin-bottom:32px}
  .mt-2{margin-top:8px}.mt-3{margin-top:12px}.mt-4{margin-top:16px}.mt-6{margin-top:24px}
  .ml-auto{margin-left:auto}.mr-2{margin-right:8px}
  .p-4{padding:14px}.p-5{padding:18px}.p-6{padding:22px}
  .px-4{padding-left:14px;padding-right:14px}.py-2{padding-top:7px;padding-bottom:7px}
  .rounded-sm{border-radius:var(--r-sm)}.rounded-md{border-radius:var(--r-md)}.rounded-lg{border-radius:var(--r-lg)}.rounded-full{border-radius:var(--r-full)}

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
  .text-right{text-align:right}.text-center{text-align:center}
  .italic{font-style:italic}

  @media(max-width:1024px){
    :root{--sidebar-w:220px}
    .grid-4{grid-template-columns:repeat(2,1fr)}
    .grid-3{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:768px){
    .sidebar{transform:translateX(-100%)}
    .main-area{margin-left:0}
    .welcome-left{display:none}
    .welcome-right{width:100%}
    .grid-2,.grid-3{grid-template-columns:1fr}
    .grid-4{grid-template-columns:1fr 1fr}
    .page-wrap{padding:20px 18px}
    .topbar{padding:0 18px}
    .form-row,.form-row3{grid-template-columns:1fr}
    .stepper{overflow-x:auto}
  }

  /* ── Demo nav ── */
  .demo-nav {
    background:#0F1921; padding:8px 16px; display:flex; align-items:center;
    gap:6px; flex-wrap:wrap; position:sticky; top:0; z-index:9999;
    border-bottom:1px solid rgba(255,255,255,0.06);
  }
  .demo-label { color:rgba(255,255,255,0.3); font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; margin-right:6px; white-space:nowrap; }
  .demo-sep   { width:1px; height:18px; background:rgba(255,255,255,0.1); margin:0 4px; }
  .demo-btn {
    padding:3px 11px; border-radius:var(--r-full); font-size:11px; font-weight:500;
    cursor:pointer; transition:all var(--dur-fast); border:1px solid rgba(255,255,255,0.12);
    background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.62); white-space:nowrap;
  }
  .demo-btn:hover  { background:rgba(255,255,255,0.12); color:white; }
  .demo-btn.active { background:var(--brand-accent); border-color:var(--brand-accent); color:white; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────
const STATUSES = {
  DRAFT:          { label:"Draft",            cls:"b-draft",      dot:"#9A9A9A" },
  SUBMITTED:      { label:"Submitted",        cls:"b-submitted",  dot:"#1C3557" },
  UNDER_REVIEW:   { label:"Under Review",     cls:"b-review",     dot:"#7C3AED" },
  MATCHING:       { label:"Matching Builders",cls:"b-matched",    dot:"#0369A1" },
  QUOTED:         { label:"Quoted",           cls:"b-quoted",     dot:"#5B21B6" },
  QUOTE_ACCEPTED: { label:"Quote Accepted",   cls:"b-accepted",   dot:"#166534" },
  QUOTE_REJECTED: { label:"Quote Rejected",   cls:"b-rejected",   dot:"#C0392B" },
  IN_PROGRESS:    { label:"In Progress",      cls:"b-inprogress", dot:"#0369A1" },
  BANK_SUBMITTED: { label:"Bank Submitted",   cls:"b-banksubmit", dot:"#4C1D95" },
  BANK_APPROVED:  { label:"Bank Approved",    cls:"b-accepted",   dot:"#166534" },
  BANK_DECLINED:  { label:"Bank Declined",    cls:"b-rejected",   dot:"#C0392B" },
  COMPLETED:      { label:"Completed",        cls:"b-completed",  dot:"#166534" },
  ON_HOLD:        { label:"On Hold",          cls:"b-pending",    dot:"#B45309" },
  CANCELLED:      { label:"Cancelled",        cls:"b-suspended",  dot:"#C0392B" },
};

const DEMO_PROJECTS = [
  { id:"BQ-2024-001", title:"Sandton Double-Storey Extension", client:"Thabo Nkosi", status:"IN_PROGRESS", value:"R 2,840,000", date:"12 Jan 2025", type:"Extension", location:"Sandton, GP" },
  { id:"BQ-2024-002", title:"Melville Kitchen & Bathrooms Reno", client:"Priya Naidoo", status:"QUOTED", value:"R 680,000", date:"18 Jan 2025", type:"Renovation", location:"Melville, GP" },
  { id:"BQ-2024-003", title:"Pretoria New Build 3-Bed Cluster", client:"Andre van Wyk", status:"BANK_SUBMITTED", value:"R 4,200,000", date:"24 Jan 2025", type:"New Build", location:"Waterkloof, GP" },
  { id:"BQ-2024-004", title:"Rosebank Open-Plan Remodel", client:"Lisa Joubert", status:"SUBMITTED", value:"R 320,000", date:"3 Feb 2025", type:"Remodel", location:"Rosebank, GP" },
  { id:"BQ-2024-005", title:"Centurion Pool & Entertainment Area", client:"Dean Botha", status:"MATCHING", value:"R 490,000", date:"8 Feb 2025", type:"Outdoor", location:"Centurion, GP" },
];

const DEMO_BUILDERS = [
  { id:"BLD-001", name:"Siyabonga Dlamini", company:"Dlamini Construction", reg:"2019/234567/07", status:"verified", rating:4.8, jobs:34, spec:["New Build","Extension","Concrete"], location:"Johannesburg" },
  { id:"BLD-002", name:"Michael Henning", company:"Henning & Sons Builders", reg:"2015/098234/07", status:"verified", rating:4.6, jobs:67, spec:["Renovation","Remodel","Tiling"], location:"Pretoria" },
  { id:"BLD-003", name:"Fatima Isaacs", company:"Isaacs Projects cc", reg:"2021/567890/23", status:"pending", rating:null, jobs:0, spec:["New Build","Plumbing","Electrical"], location:"Centurion" },
  { id:"BLD-004", name:"Kobus Swanepoel", company:"KS Building Solutions", reg:"2018/345678/07", status:"verified", rating:4.9, jobs:89, spec:["Commercial","New Build","Steel"], location:"Sandton" },
];

const TRADE_CATEGORIES = [
  "New Residential Build","Extension / Addition","Renovation","Kitchen Remodel",
  "Bathroom Remodel","Roofing","Plumbing","Electrical","Tiling","Flooring",
  "Painting","Waterproofing","Pool & Outdoor","Landscaping","Steel & Ironwork",
  "Concrete & Foundations","Drywall / Partitioning","HVAC / Air Conditioning",
  "Solar & Electrical Systems","Disability Access / Modifications",
];

const QUOTE_ITEMS = [
  { id:1, cat:"Site Preparation",   desc:"Excavation & levelling (200m²)", qty:1,    unit:"LS",  rate:28000,  total:28000  },
  { id:2, cat:"Foundations",        desc:"Strip foundations 280 lin.m",    qty:280,  unit:"m",   rate:850,    total:238000 },
  { id:3, cat:"Brickwork",          desc:"External cavity wall 180m²",     qty:180,  unit:"m²",  rate:1420,   total:255600 },
  { id:4, cat:"Roof Structure",     desc:"Timber roof truss system",        qty:1,    unit:"LS",  rate:185000, total:185000 },
  { id:5, cat:"Roofing",            desc:"Concrete roof tiles (IBR opt.)", qty:1,    unit:"LS",  rate:96000,  total:96000  },
  { id:6, cat:"Plumbing",           desc:"Rough-in & fittings",            qty:1,    unit:"LS",  rate:78000,  total:78000  },
  { id:7, cat:"Electrical",         desc:"3-phase DB + full wiring",       qty:1,    unit:"LS",  rate:92000,  total:92000  },
  { id:8, cat:"Plastering",         desc:"Internal plaster 640m²",         qty:640,  unit:"m²",  rate:185,    total:118400 },
  { id:9, cat:"Tiling",             desc:"Porcelain tiles 180m²",          qty:180,  unit:"m²",  rate:620,    total:111600 },
  { id:10,cat:"Joinery",            desc:"Doors, frames & hardware",       qty:12,   unit:"nr",  rate:8500,   total:102000 },
  { id:11,cat:"Painting",           desc:"Internal & external (2 coats)",  qty:1,    unit:"LS",  rate:68000,  total:68000  },
  { id:12,cat:"Provisional Sums",   desc:"Contingency 5%",                 qty:1,    unit:"LS",  rate:68680,  total:68680  },
];

const TIMELINE_EVENTS = [
  { time:"02 Feb 2025 09:14", title:"Project Submitted by Client",   desc:"Andre van Wyk submitted project BQ-2024-003.", dot:"done"   },
  { time:"03 Feb 2025 11:30", title:"Admin Review Complete",         desc:"Project approved and placed in matching queue.", dot:"done"   },
  { time:"05 Feb 2025 14:22", title:"Builder Matched",               desc:"KS Building Solutions assigned as primary builder.", dot:"done"   },
  { time:"08 Feb 2025 10:05", title:"Quote Submitted by Builder",    desc:"Quote of R 4,200,000 submitted (incl. VAT).", dot:"done"   },
  { time:"10 Feb 2025 16:45", title:"Quote Accepted by Client",      desc:"Client accepted quote. Contract generation initiated.", dot:"done"   },
  { time:"12 Feb 2025 08:00", title:"Application Sent to Bank",      desc:"FNB Home Loans — application submitted electronically.", dot:"active" },
  { time:"Pending",           title:"Bank Approval Expected",        desc:"Expected 5–10 business days from submission.", dot:"todo"   },
  { time:"Pending",           title:"Construction Commencement",     desc:"Site handover and construction start.", dot:"todo"   },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const s = STATUSES[status];
  if (!s) return null;
  return (
    <span className={`badge ${s.cls}`}>
      <span className="bdot" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
};

const Avatar = ({ name = "?", bg = "#1C3557", size = "md" }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return <div className={`ava ava-${size}`} style={{ background: bg }}>{initials}</div>;
};

const Icon = ({ i, style }) => <span style={{ fontStyle: "normal", ...style }}>{i}</span>;

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

const Divider = () => <div className="divider" />;

const Notif = ({ type = "info", icon, title, msg }) => (
  <div className={`notif ${type}`}>
    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
    <div>
      {title && <div className="fw-6 caption mb-1">{title}</div>}
      <div className="caption c-2">{msg}</div>
    </div>
  </div>
);

const Skeleton = ({ w = "100%", h = 16, mb = 8 }) => (
  <div className="skel" style={{ width: w, height: h, marginBottom: mb }} />
);

const Tag = ({ children }) => <span className="tag">{children}</span>;

const DocChip = ({ name, size, icon = "📄" }) => (
  <span className="doc-chip">
    <span>{icon}</span>
    <span className="fw-5">{name}</span>
    {size && <span className="c-3">· {size}</span>}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1 — WELCOME / ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────
const WelcomeScreen = ({ onEnter }) => {
  const [role, setRole] = useState(null);
  const [step, setStep] = useState("role"); // role | register
  const [formData, setFormData] = useState({ firstName:"", lastName:"", email:"", phone:"", password:"", regNum:"", company:"" });
  const [agree, setAgree] = useState(false);

  const roles = [
    { key: "client",  icon: "🏠", label: "Property Owner / Client",  desc: "I want to build or renovate and receive verified quotes from trusted builders." },
    { key: "builder", icon: "🔨", label: "Registered Builder",        desc: "I am a registered builder wanting to quote on verified residential projects." },
    { key: "admin",   icon: "🛡️",  label: "Administrator",             desc: "Platform administrator — manage users, projects and verifications." },
  ];

  if (step === "register") {
    return (
      <div className="welcome-wrap" style={{ animation: "fadeIn 0.3s ease" }}>
        <div className="welcome-left">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="sb-logo-mark mb-6" style={{ width: 40, height: 40, fontSize: 20 }}>🏗️</div>
            <div className="h-1 c-white mb-4">Create your<br /><em style={{ fontStyle:"italic", color:"#F4A570" }}>BuildQuote</em><br />account</div>
            <div className="body c-white" style={{ opacity: 0.65, maxWidth: 280, lineHeight: 1.7 }}>
              Join thousands of verified builders and property owners building trust, one project at a time.
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="flex gap-3 flex-col">
              {["✅ Verified builder network","📋 Smart quote builder","🏦 Direct bank integration","📧 Real-time notifications"].map(f => (
                <div key={f} className="caption c-white" style={{ opacity: 0.75 }}>{f}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="welcome-right" style={{ overflowY: "auto" }}>
          <div className="welcome-right-inner">
            <button className="btn btn-ghost btn-sm mb-6 c-2" onClick={() => setStep("role")}>← Back to role selection</button>
            <div className="h-3 mb-2">Register as {roles.find(r => r.key === role)?.label}</div>
            <div className="caption c-2 mb-6">Fill in your details to get started.</div>

            <div className="form-row">
              <div className="f-group">
                <label className="f-label">First Name <span className="req">*</span></label>
                <input className="inp" placeholder="e.g. Thabo" value={formData.firstName} onChange={e => setFormData({...formData, firstName:e.target.value})} />
              </div>
              <div className="f-group">
                <label className="f-label">Last Name <span className="req">*</span></label>
                <input className="inp" placeholder="e.g. Nkosi" value={formData.lastName} onChange={e => setFormData({...formData, lastName:e.target.value})} />
              </div>
            </div>
            <div className="f-group">
              <label className="f-label">Email Address <span className="req">*</span></label>
              <div className="inp-wrap">
                <span className="inp-ico">✉️</span>
                <input className="inp" type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} />
              </div>
            </div>
            <div className="f-group">
              <label className="f-label">Phone Number <span className="req">*</span></label>
              <div className="inp-wrap">
                <span className="inp-ico">📱</span>
                <input className="inp" placeholder="+27 82 000 0000" value={formData.phone} onChange={e => setFormData({...formData, phone:e.target.value})} />
              </div>
            </div>
            {role === "builder" && <>
              <div className="f-group">
                <label className="f-label">Company Name <span className="req">*</span></label>
                <input className="inp" placeholder="Your registered company name" value={formData.company} onChange={e => setFormData({...formData, company:e.target.value})} />
              </div>
              <div className="f-group">
                <label className="f-label">CIDB Registration Number <span className="req">*</span></label>
                <div className="inp-wrap">
                  <span className="inp-ico">🔏</span>
                  <input className="inp" placeholder="e.g. 2019/234567/07" value={formData.regNum} onChange={e => setFormData({...formData, regNum:e.target.value})} />
                </div>
                <div className="f-hint">Your CIDB or NHBRC registration number — we verify this before activating your account.</div>
              </div>
            </>}
            <div className="f-group">
              <label className="f-label">Password <span className="req">*</span></label>
              <input className="inp" type="password" placeholder="Minimum 8 characters" value={formData.password} onChange={e => setFormData({...formData, password:e.target.value})} />
              <div className="f-hint">Include uppercase, number and special character.</div>
            </div>
            <div className="check-row mb-6" onClick={() => setAgree(!agree)}>
              <div className={`check-box ${agree ? "checked" : ""}`}>{agree && <span style={{color:"white",fontSize:11}}>✓</span>}</div>
              <span className="caption c-2">I agree to the <span className="c-brand fw-5">Terms of Service</span> and <span className="c-brand fw-5">Privacy Policy</span></span>
            </div>
            <button className="btn btn-primary btn-xl w-full" onClick={() => onEnter(role)} disabled={!agree}>
              Create Account →
            </button>
            <div className="text-center mt-4 caption c-3">Already have an account? <span className="c-brand fw-5" style={{cursor:"pointer"}}>Sign in</span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-wrap">
      <div className="welcome-left">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="flex items-c gap-3 mb-8">
            <div className="sb-logo-mark" style={{ width: 42, height: 42, fontSize: 22 }}>🏗️</div>
            <span className="h-3 c-white fw-5">Build<em style={{color:"#F4A570",fontStyle:"normal"}}>Quote</em></span>
          </div>
          <div className="h-display c-white mb-5" style={{ maxWidth: 380 }}>
            Where trusted builders meet property owners.
          </div>
          <div className="body-lg c-white mb-8" style={{ opacity: 0.65, maxWidth: 340, lineHeight: 1.8 }}>
            South Africa's verified residential building and renovation platform. Smart quotes. Bank-ready applications.
          </div>
          <div className="flex gap-3 flex-col" style={{ maxWidth: 300 }}>
            {[
              { i:"🔒", t:"Verified builders only", d:"All builders are CIDB/NHBRC verified before listing." },
              { i:"💡", t:"AI-assisted quoting", d:"Smart cost benchmarks from major hardware chains." },
              { i:"🏦", t:"Direct bank integration", d:"Submit your application electronically to SA banks." },
            ].map(f => (
              <div key={f.t} className="flex items-s gap-3">
                <span style={{ fontSize: 18, marginTop: 2 }}>{f.i}</span>
                <div>
                  <div className="caption fw-6 c-white mb-1">{f.t}</div>
                  <div className="micro c-white" style={{ opacity: 0.6 }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="caption c-white" style={{ opacity: 0.4, position: "relative", zIndex: 1 }}>
          © 2025 BuildQuote (Pty) Ltd · CIDB Approved Platform · POPIA Compliant
        </div>
      </div>

      <div className="welcome-right">
        <div className="welcome-right-inner">
          <div className="h-2 mb-2">Welcome. Who are you?</div>
          <div className="caption c-2 mb-6">Select your role to get started.</div>

          {roles.map(r => (
            <div
              key={r.key}
              className={`role-card ${role === r.key ? "selected" : ""}`}
              onClick={() => setRole(r.key)}
            >
              <div className="check-mark">✓</div>
              <div className="role-ico" style={{ background: r.key === "client" ? "rgba(28,53,87,0.08)" : r.key === "builder" ? "rgba(196,98,45,0.1)" : "rgba(42,125,79,0.1)" }}>
                {r.icon}
              </div>
              <div className="h-4 mb-1">{r.label}</div>
              <div className="caption c-2">{r.desc}</div>
            </div>
          ))}

          <button
            className="btn btn-primary btn-xl w-full mt-4"
            disabled={!role}
            onClick={() => setStep("register")}
          >
            Continue as {role ? roles.find(r => r.key === role)?.label.split("/")[0].trim() : "…"} →
          </button>
          <div className="text-center mt-4 caption c-3">
            Already registered? <span className="c-brand fw-5" style={{ cursor: "pointer" }}>Sign in →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2 — CLIENT DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const ClientDashboard = ({ setScreen }) => (
  <div className="page-wrap">
    <div className="flex items-c j-between mb-6">
      <div>
        <div className="h-1 mb-1">Good morning, Thabo 👋</div>
        <div className="caption c-2">Here's the status of your building projects.</div>
      </div>
      <button className="btn btn-accent" onClick={() => setScreen("create-project")}>
        + New Project Request
      </button>
    </div>

    <Notif type="info" icon="ℹ️" title="Quote received on BQ-2024-002" msg="Henning & Sons Builders submitted a quote of R 680,000. Please review and accept or request changes." />

    <div className="stat-grid">
      <StatCard label="Active Projects" value="3" delta="1 new this month" color="var(--brand-primary)" icon="📋" />
      <StatCard label="Quotes Received" value="2" color="#7C3AED" icon="💼" />
      <StatCard label="In Progress" value="1" color="var(--success)" delta="On schedule" icon="🏗️" />
      <StatCard label="Total Value" value="R 3.52M" color="var(--brand-accent)" delta="Across all projects" deltaType="neutral" icon="💰" />
    </div>

    <div className="grid-2 gap-6">
      <div>
        <div className="sec-head">
          <div className="h-3">My Projects</div>
          <button className="btn btn-ghost btn-sm" onClick={() => setScreen("search")}>View all →</button>
        </div>
        <div className="card">
          {DEMO_PROJECTS.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              className="flex items-c gap-3 p-4 card-hover"
              style={{ borderBottom: i < 3 ? "1px solid var(--border-sub)" : "none" }}
              onClick={() => setScreen("project-detail")}
            >
              <div className="ava ava-md rounded-md" style={{ background:"var(--brand-primary)",borderRadius:"var(--r-md)" }}>
                {p.type === "Extension" ? "🏠" : p.type === "Renovation" ? "🔨" : p.type === "New Build" ? "🏗️" : "🔧"}
              </div>
              <div className="flex-1">
                <div className="h-4 mb-1 truncate" style={{ maxWidth: 200 }}>{p.title}</div>
                <div className="caption c-3">{p.id} · {p.date}</div>
              </div>
              <div className="text-right">
                <Badge status={p.status} />
                <div className="micro c-3 mt-2">{p.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sec-head"><div className="h-3">Activity Feed</div></div>
        <div className="card card-body">
          <div className="timeline">
            {TIMELINE_EVENTS.slice(0, 5).map((e, i) => (
              <div key={i} className="tl-item">
                <div className={`tl-dot ${e.dot}`} />
                <div className="tl-time">{e.time}</div>
                <div className="tl-title">{e.title}</div>
                <div className="tl-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 sec-head"><div className="h-3">Matched Builders</div></div>
        <div className="card">
          {DEMO_BUILDERS.filter(b => b.status === "verified").slice(0,2).map((b, i) => (
            <div key={b.id} className="flex items-c gap-3 p-4 card-hover" style={{ borderBottom: i < 1 ? "1px solid var(--border-sub)" : "none" }}>
              <Avatar name={b.name} bg={i === 0 ? "#1C3557" : "#C4622D"} size="md" />
              <div className="flex-1">
                <div className="flex items-c gap-2 mb-1">
                  <span className="h-4">{b.company}</span>
                  <span className="badge b-verified">✓ Verified</span>
                </div>
                <div className="caption c-3">{b.spec.slice(0,2).join(" · ")} · {b.location}</div>
              </div>
              <div className="text-right">
                <div className="fw-6 caption">⭐ {b.rating}</div>
                <div className="micro c-3">{b.jobs} jobs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3 — CREATE PROJECT (6-step wizard)
// ─────────────────────────────────────────────────────────────────────────────
const CreateProjectScreen = ({ setScreen }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Project Type","Property Details","Scope of Work","Documents","Preferences","Review & Submit"
  ];

  const content = [
    // Step 0 — Project Type
    <div key="s0">
      <div className="h-2 mb-2">What type of project is this?</div>
      <div className="caption c-2 mb-6">Select the primary category for your building or renovation project.</div>
      <div className="grid-2 gap-3">
        {[
          { k:"new-build",   i:"🏗️",  t:"New Build",          d:"Construction of a new home from scratch." },
          { k:"extension",   i:"📐",  t:"Extension / Addition",d:"Adding rooms, floors or square meterage." },
          { k:"renovation",  i:"🔨",  t:"Full Renovation",     d:"Major interior & exterior transformation." },
          { k:"kitchen",     i:"🍳",  t:"Kitchen Remodel",     d:"Kitchen redesign, cabinets & appliances." },
          { k:"bathroom",    i:"🛁",  t:"Bathroom Remodel",    d:"Bathroom renovation & fitting." },
          { k:"outdoor",     i:"🌿",  t:"Outdoor & Pool",      d:"Pool, braai area, landscaping." },
          { k:"roofing",     i:"🏠",  t:"Roofing",             d:"Roof replacement or repair." },
          { k:"commercial",  i:"🏢",  t:"Light Commercial",    d:"Small offices, sectional title." },
        ].map(o => (
          <div key={o.k} className="card card-hover p-4" onClick={() => setStep(1)}
            style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
            <span style={{ fontSize: 24 }}>{o.i}</span>
            <div>
              <div className="h-4 mb-1">{o.t}</div>
              <div className="micro c-2">{o.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Step 1 — Property Details
    <div key="s1">
      <div className="h-2 mb-2">Tell us about the property</div>
      <div className="caption c-2 mb-6">The more detail you provide, the more accurate your quotes will be.</div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Street Address <span className="req">*</span></label>
          <input className="inp" placeholder="12 Acacia Avenue" />
        </div>
        <div className="f-group">
          <label className="f-label">Suburb <span className="req">*</span></label>
          <input className="inp" placeholder="Sandton" />
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">City / Town <span className="req">*</span></label>
          <input className="inp" defaultValue="Johannesburg" />
        </div>
        <div className="f-group">
          <label className="f-label">Province <span className="req">*</span></label>
          <select className="inp">
            <option>Gauteng</option><option>Western Cape</option><option>KwaZulu-Natal</option>
            <option>Eastern Cape</option><option>Limpopo</option><option>Mpumalanga</option>
            <option>North West</option><option>Free State</option><option>Northern Cape</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Stand / Erf Number</label>
          <input className="inp" placeholder="Erf 4521" />
        </div>
        <div className="f-group">
          <label className="f-label">Title Deed Number</label>
          <input className="inp" placeholder="T 12345/2021" />
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Existing Floor Area (m²)</label>
          <div className="inp-wrap"><input className="inp" placeholder="0" type="number" /><span className="inp-sfx">m²</span></div>
        </div>
        <div className="f-group">
          <label className="f-label">New / Additional Floor Area (m²)</label>
          <div className="inp-wrap"><input className="inp" placeholder="200" type="number" /><span className="inp-sfx">m²</span></div>
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Property Type</label>
          <select className="inp">
            <option>Freestanding House</option><option>Sectional Title</option>
            <option>Estate / Cluster</option><option>Duplex</option><option>Townhouse</option>
          </select>
        </div>
        <div className="f-group">
          <label className="f-label">Zoning</label>
          <select className="inp">
            <option>Residential 1</option><option>Residential 2</option>
            <option>Residential 3</option><option>Special Residential</option><option>Business</option>
          </select>
        </div>
      </div>
      <div className="f-group">
        <label className="f-label">Special Site Conditions</label>
        <textarea className="inp" placeholder="e.g. Rocky terrain, sloped site, high water table, access restrictions, proximity to neighbours, heritage overlay, etc." style={{minHeight:80}} />
      </div>
      <div className="map-ph mt-2">
        <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <div className="map-pin">📍</div>
          <div className="caption c-2 mt-2 fw-5">Map pin placed at Sandton</div>
          <button className="btn btn-secondary btn-sm mt-2">Adjust Location</button>
        </div>
      </div>
    </div>,

    // Step 2 — Scope of Work
    <div key="s2">
      <div className="h-2 mb-2">Describe your scope of work</div>
      <div className="caption c-2 mb-6">Detailed specifications allow builders to provide accurate, comparable quotes.</div>
      <div className="f-group">
        <label className="f-label">Project Description <span className="req">*</span></label>
        <textarea className="inp" placeholder="Describe the full scope of work in as much detail as possible. Include what you want to achieve, any specific design intent, preferred materials, special requirements, etc." style={{minHeight:120}} />
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Number of Bedrooms (proposed)</label>
          <select className="inp"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5+</option></select>
        </div>
        <div className="f-group">
          <label className="f-label">Number of Bathrooms (proposed)</label>
          <select className="inp"><option>1</option><option selected>2</option><option>3</option><option>4+</option></select>
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Number of Garages / Carports</label>
          <select className="inp"><option>None</option><option>1</option><option selected>2</option><option>3+</option></select>
        </div>
        <div className="f-group">
          <label className="f-label">Finishes Standard</label>
          <select className="inp"><option>Builder Grade</option><option selected>Mid-Range</option><option>High-End</option><option>Luxury</option></select>
        </div>
      </div>
      <div className="f-group">
        <label className="f-label">Trades Required</label>
        <div className="caption c-2 mb-3">Select all that apply:</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {TRADE_CATEGORIES.slice(0, 12).map(t => (
            <div key={t} className="check-row" style={{ marginBottom: 6 }}>
              <div className="check-box checked"><span style={{color:"white",fontSize:10}}>✓</span></div>
              <span className="caption">{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Budget Range (ZAR)</label>
          <select className="inp">
            <option>Under R 200,000</option><option>R 200K – R 500K</option>
            <option selected>R 500K – R 1M</option><option>R 1M – R 2M</option>
            <option>R 2M – R 5M</option><option>R 5M+</option>
          </select>
        </div>
        <div className="f-group">
          <label className="f-label">Desired Start Date</label>
          <input className="inp" type="date" defaultValue="2025-04-01" />
        </div>
      </div>
      <div className="form-row">
        <div className="f-group">
          <label className="f-label">Expected Duration</label>
          <select className="inp">
            <option>1–3 months</option><option>3–6 months</option>
            <option selected>6–12 months</option><option>12–18 months</option><option>18+ months</option>
          </select>
        </div>
        <div className="f-group">
          <label className="f-label">Funding Method</label>
          <select className="inp">
            <option selected>Bank Finance (Home Loan)</option>
            <option>Cash / Self-Funded</option>
            <option>Developer Finance</option>
            <option>Government Subsidy</option>
          </select>
        </div>
      </div>
      <div className="f-group">
        <label className="f-label">Special Requirements or Notes</label>
        <textarea className="inp" placeholder="e.g. Solar-ready roof, rainwater harvesting, disability access, specific architectural style, heritage requirements, NHBRC warranty required, existing contractor preferred, etc." style={{minHeight:80}} />
      </div>
    </div>,

    // Step 3 — Documents
    <div key="s3">
      <div className="h-2 mb-2">Upload supporting documents</div>
      <div className="caption c-2 mb-6">Upload relevant plans, photos and compliance documents. The more you provide, the better.</div>
      {[
        { label:"Approved Building Plans", hint:"PDF of municipal-approved plans (if available)", req:false, icon:"📐" },
        { label:"Site Photos", hint:"Existing site, all elevations, interior", req:false, icon:"📸" },
        { label:"Title Deed", hint:"For identity and ownership verification", req:true, icon:"📜" },
        { label:"SPLUMA / Zoning Certificate", hint:"Confirms land use rights for proposed work", req:false, icon:"🗺️" },
        { label:"Architectural Drawings / Sketches", hint:"Any concept or design drawings", req:false, icon:"✏️" },
        { label:"Soil / Geo Report", hint:"For new builds on unimproved land", req:false, icon:"🔬" },
        { label:"Engineer's Cert (if applicable)", hint:"Structural assessment for extensions", req:false, icon:"⚙️" },
        { label:"Quotations from Specialists", hint:"Electrical, plumbing, solar — upload if available", req:false, icon:"💡" },
      ].map((d, i) => (
        <div key={i} className="flex items-c gap-3 mb-3 card p-4">
          <span style={{ fontSize: 22 }}>{d.icon}</span>
          <div className="flex-1">
            <div className="h-4 mb-1">{d.label} {d.req && <span className="req c-accent">*</span>}</div>
            <div className="micro c-3">{d.hint}</div>
          </div>
          <button className="btn btn-secondary btn-sm">+ Upload</button>
        </div>
      ))}
      <div className="upload-zone mt-4">
        <span className="upload-ico" style={{fontSize:32,display:"block",marginBottom:10}}>☁️</span>
        <div className="fw-5 caption mb-1">Drag & drop any additional files here</div>
        <div className="micro c-3">PDF, JPEG, PNG, DWG, DXF — max 50MB per file</div>
      </div>
    </div>,

    // Step 4 — Preferences
    <div key="s4">
      <div className="h-2 mb-2">Builder & Project Preferences</div>
      <div className="caption c-2 mb-6">Help us match you with the most suitable verified builders.</div>
      <div className="f-group">
        <label className="f-label">Builder Proximity</label>
        <select className="inp">
          <option selected>Within 15 km of the project</option>
          <option>Within 30 km</option><option>Within 50 km</option><option>Province-wide</option>
        </select>
        <div className="f-hint">We match builders within your selected radius first.</div>
      </div>
      <div className="f-group">
        <label className="f-label">Minimum Builder Grade (CIDB)</label>
        <select className="inp">
          <option>No preference</option>
          <option>Grade 1 (up to R 200K)</option><option selected>Grade 3 (up to R 2M)</option>
          <option>Grade 5 (up to R 13M)</option><option>Grade 7+</option>
        </select>
      </div>
      <div className="f-group">
        <label className="f-label">Number of Quotes Requested</label>
        <select className="inp">
          <option>1 builder only</option><option selected>3 competing quotes</option><option>5 quotes</option>
        </select>
        <div className="f-hint">We recommend 3 quotes for best competitive pricing.</div>
      </div>
      <div className="f-group">
        <label className="f-label">Quote Response Window</label>
        <select className="inp">
          <option>7 days</option><option selected>14 days</option><option>21 days</option><option>30 days</option>
        </select>
      </div>
      <div className="f-group">
        <label className="f-label">Bank for Home Loan Application</label>
        <select className="inp">
          <option selected>FNB Home Loans</option><option>ABSA Home Loans</option>
          <option>Standard Bank Home Loans</option><option>Nedbank Home Loans</option>
          <option>SA Home Loans</option><option>No bank preference</option>
          <option>Not requiring finance</option>
        </select>
        <div className="f-hint">We will send your application packet electronically once a quote is accepted.</div>
      </div>
      <div className="f-group">
        <label className="f-label">Communication Preferences</label>
        <div className="flex gap-4 flex-col mt-2">
          {["Email notifications for all updates","WhatsApp notifications (coming soon)","In-app notifications only"].map(o => (
            <div key={o} className="check-row">
              <div className="check-box checked"><span style={{color:"white",fontSize:10}}>✓</span></div>
              <span className="caption">{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Step 5 — Review
    <div key="s5">
      <div className="h-2 mb-2">Review & Submit</div>
      <div className="caption c-2 mb-6">Please confirm all details before submitting your project for builder matching.</div>
      <Notif type="success" icon="✅" title="All required fields complete" msg="Your project is ready to submit. Builders in your area will be notified within 24 hours." />
      {[
        { label:"Project Type",   value:"Extension / Addition" },
        { label:"Address",        value:"12 Acacia Avenue, Sandton, GP" },
        { label:"New Floor Area", value:"200 m²" },
        { label:"Bedrooms",       value:"3 + 1 study" },
        { label:"Budget Range",   value:"R 500K – R 1M" },
        { label:"Start Date",     value:"1 April 2025" },
        { label:"Funding",        value:"Bank Finance — FNB Home Loans" },
        { label:"Quotes Needed",  value:"3 competing quotes" },
        { label:"Builder Radius", value:"Within 15 km of Sandton" },
      ].map(r => (
        <div key={r.label} className="flex items-c j-between py-2" style={{ borderBottom:"1px solid var(--border-sub)" }}>
          <span className="caption c-2">{r.label}</span>
          <span className="caption fw-5">{r.value}</span>
        </div>
      ))}
      <div className="mt-5">
        <div className="caption fw-6 mb-3">Uploaded Documents (4 of 8)</div>
        <div className="flex gap-2" style={{flexWrap:"wrap"}}>
          <DocChip name="Title Deed.pdf" size="1.2MB" icon="📜" />
          <DocChip name="Site Photos.zip" size="18MB" icon="📸" />
          <DocChip name="Concept Plan.pdf" size="3.4MB" icon="📐" />
          <DocChip name="Engineer Letter.pdf" size="0.8MB" icon="⚙️" />
        </div>
      </div>
      <Notif type="warning" icon="⚠️" msg="Once submitted, your project will be reviewed by a BuildQuote admin within 24 hours before being shared with builders. You will be notified by email." />
    </div>,
  ];

  return (
    <div className="page-wrap" style={{ maxWidth: 820 }}>
      <div className="flex items-c gap-3 mb-6">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen("client-dashboard")}>← Dashboard</button>
        <span className="c-3 caption">/ New Project Request</span>
      </div>
      <div className="h-2 mb-8">New Project Request</div>

      {/* Stepper */}
      <div className="stepper">
        {steps.map((s, i) => (
          <div key={s} className="step-node" style={{ position: "relative" }}>
            {i < steps.length - 1 && <div className={`step-line ${i < step ? "done" : ""}`} />}
            <div className={`step-circ ${i < step ? "done" : i === step ? "active" : "todo"}`} onClick={() => i <= step && setStep(i)} style={{ cursor: i <= step ? "pointer" : "default" }}>
              {i < step ? "✓" : i + 1}
            </div>
            <div className={`step-lbl ${i === step ? "active" : i < step ? "done" : ""}`}>{s}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body">{content[step]}</div>
        <div className="card-foot">
          {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Previous</button>}
          <div className="ml-auto flex gap-3 items-c">
            <button className="btn btn-ghost">Save Draft</button>
            {step < steps.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Continue →</button>
            ) : (
              <button className="btn btn-accent" onClick={() => setScreen("client-dashboard")}>
                🚀 Submit Project Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4 — BUILDER DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const BuilderDashboard = ({ setScreen }) => (
  <div className="page-wrap">
    <div className="flex items-c j-between mb-4">
      <div>
        <div className="flex items-c gap-3 mb-1">
          <div className="h-2">Dlamini Construction</div>
          <span className="badge b-verified">✓ CIDB Verified</span>
        </div>
        <div className="caption c-2">Grade 5 · Johannesburg · Reg: 2019/234567/07</div>
      </div>
      <button className="btn btn-accent" onClick={() => setScreen("quote-builder")}>
        + Build New Quote
      </button>
    </div>

    <Notif type="warning" icon="🔔" title="2 new jobs matching your specialisation" msg="New projects in Sandton and Centurion match your trade profile. Respond within 14 days." />

    <div className="stat-grid">
      <StatCard label="Open Leads" value="7" color="var(--brand-primary)" icon="📬" />
      <StatCard label="Active Quotes" value="3" color="#7C3AED" icon="📋" />
      <StatCard label="In Progress" value="2" color="var(--success)" delta="On track" icon="🏗️" />
      <StatCard label="Completed (YTD)" value="12" color="var(--brand-accent)" icon="✅" />
      <StatCard label="Revenue Pipeline" value="R 8.4M" color="#0369A1" delta="Across all quotes" deltaType="neutral" icon="💰" />
    </div>

    <div className="grid-2 gap-6">
      <div>
        <div className="sec-head">
          <div className="h-3">Available Projects</div>
          <button className="btn btn-ghost btn-sm" onClick={() => setScreen("search")}>Browse all →</button>
        </div>
        <div className="flex flex-col gap-3">
          {DEMO_PROJECTS.filter(p => ["SUBMITTED","MATCHING"].includes(p.status)).map(p => (
            <div key={p.id} className="card p-5 card-hover" onClick={() => setScreen("project-detail")}>
              <div className="flex items-c j-between mb-2">
                <Badge status={p.status} />
                <div className="caption c-3 fs-m">{p.id}</div>
              </div>
              <div className="h-4 mb-1">{p.title}</div>
              <div className="caption c-2 mb-3">📍 {p.location} · {p.type}</div>
              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); setScreen("quote-builder"); }}>Quote This Job</button>
                <button className="btn btn-secondary btn-sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sec-head"><div className="h-3">My Active Quotes</div></div>
        <div className="card mb-4">
          {DEMO_PROJECTS.filter(p => ["QUOTED","IN_PROGRESS","BANK_SUBMITTED"].includes(p.status)).map((p, i, arr) => (
            <div key={p.id} className="flex items-c gap-3 p-4 card-hover" style={{ borderBottom: i < arr.length-1 ? "1px solid var(--border-sub)" : "none" }} onClick={() => setScreen("project-detail")}>
              <div style={{ width:36,height:36,borderRadius:"var(--r-md)",background:"var(--brand-accent-lt)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18 }}>
                {p.type==="New Build"?"🏗️":p.type==="Renovation"?"🔨":"🏠"}
              </div>
              <div className="flex-1 min-width:0">
                <div className="h-4 truncate mb-1">{p.title}</div>
                <div className="caption c-3">{p.date}</div>
              </div>
              <div className="text-right">
                <Badge status={p.status} />
                <div className="micro c-3 mt-1 fs-m">{p.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sec-head"><div className="h-3">Profile Completeness</div></div>
        <div className="card p-5">
          {[
            { label:"Business Profile",    pct:100, done:true },
            { label:"CIDB Verification",   pct:100, done:true },
            { label:"Portfolio Photos",    pct:60,  done:false },
            { label:"Trade Certifications",pct:80,  done:false },
            { label:"Insurance Certificate",pct:100,done:true },
            { label:"Bank Details",        pct:100, done:true },
          ].map(item => (
            <div key={item.label} className="mb-3">
              <div className="flex items-c j-between mb-1">
                <span className="caption">{item.label}</span>
                <span className={`micro fw-6 ${item.done?"c-success":"c-warning"}`}>{item.pct}%</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{width:`${item.pct}%`,background:item.done?"var(--success)":"var(--warning)"}} />
              </div>
            </div>
          ))}
          <button className="btn btn-primary btn-sm mt-3">Complete Profile</button>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 5 — QUOTE BUILDER
// ─────────────────────────────────────────────────────────────────────────────
const QuoteBuilderScreen = ({ setScreen }) => {
  const subtotal = QUOTE_ITEMS.reduce((a, i) => a + i.total, 0);
  const vat      = Math.round(subtotal * 0.15);
  const total    = subtotal + vat;
  const fmt      = n => `R ${n.toLocaleString("en-ZA")}`;

  return (
    <div className="page-wrap">
      <div className="flex items-c gap-3 mb-4">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen("builder-dashboard")}>← Dashboard</button>
        <span className="c-3 caption">/ Quote Builder</span>
        <div className="ml-auto flex gap-2 items-c">
          <span className="badge b-draft">Draft</span>
          <span className="caption c-3 fs-m">QUO-2025-047</span>
        </div>
      </div>

      <div className="grid-2 gap-6 mb-5" style={{ gridTemplateColumns:"1fr 1fr" }}>
        <div className="card p-5">
          <div className="caption fw-6 mb-3 c-3 uppercase" style={{letterSpacing:"0.6px",fontSize:"10.5px"}}>Project</div>
          <div className="h-3 mb-1">Pretoria New Build 3-Bed Cluster</div>
          <div className="caption c-2 mb-1">📍 Waterkloof, Pretoria — BQ-2024-003</div>
          <div className="caption c-2">Client: Andre van Wyk</div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Tag>New Build</Tag><Tag>Residential</Tag><Tag>3 Bed</Tag>
          </div>
        </div>
        <div className="card p-5">
          <div className="caption fw-6 mb-3 c-3 uppercase" style={{letterSpacing:"0.6px",fontSize:"10.5px"}}>Quote Summary</div>
          <div className="flex items-c j-between mb-2">
            <span className="caption c-2">Subtotal (excl. VAT)</span>
            <span className="caption fw-6 fs-m">{fmt(subtotal)}</span>
          </div>
          <div className="flex items-c j-between mb-2">
            <span className="caption c-2">VAT (15%)</span>
            <span className="caption fw-6 fs-m">{fmt(vat)}</span>
          </div>
          <div className="divider" style={{margin:"10px 0"}} />
          <div className="flex items-c j-between">
            <span className="h-4">Total (incl. VAT)</span>
            <span className="h-3 c-brand fs-m">{fmt(total)}</span>
          </div>
          <div className="caption c-3 mt-2">
            ⚠️ Variance check: <span className="c-success fw-5">Within expected range (±8%)</span>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-head j-between">
          <span className="h-3">Line Items</span>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm">+ Add Category</button>
            <button className="btn btn-primary btn-sm">+ Add Line Item</button>
          </div>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="q-tbl">
            <thead>
              <tr>
                <th style={{width:30}}>#</th>
                <th>Category</th>
                <th style={{minWidth:240}}>Description</th>
                <th className="text-right">Qty</th>
                <th>Unit</th>
                <th className="text-right">Rate (R)</th>
                <th className="text-right">Total (R)</th>
                <th style={{width:40}} />
              </tr>
            </thead>
            <tbody>
              {QUOTE_ITEMS.map((item) => (
                <tr key={item.id}>
                  <td className="c-3 fs-m" style={{fontSize:11}}>{item.id}</td>
                  <td><span className="tag">{item.cat}</span></td>
                  <td className="caption">{item.desc}</td>
                  <td className="num">{item.qty.toLocaleString()}</td>
                  <td><span className="caption c-3">{item.unit}</span></td>
                  <td className="num fw-5">{item.rate.toLocaleString()}</td>
                  <td className="num fw-6 c-brand">{item.total.toLocaleString()}</td>
                  <td><button className="btn btn-ghost btn-sm" style={{color:"var(--error)",padding:"3px 6px"}}>✕</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="q-total">
                <td colSpan={6} className="text-right">TOTAL (incl. 15% VAT)</td>
                <td className="num">{fmt(total)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid-2 gap-6">
        <div className="card p-5">
          <div className="h-4 mb-4">Quote Terms & Conditions</div>
          <div className="f-group">
            <label className="f-label">Quote Validity</label>
            <select className="inp"><option>14 days</option><option selected>30 days</option><option>60 days</option></select>
          </div>
          <div className="f-group">
            <label className="f-label">Payment Terms</label>
            <select className="inp">
              <option>10/80/10 — Deposit / Progress / Completion</option>
              <option selected>10/40/40/10 — Four instalments</option>
              <option>On completion</option>
            </select>
          </div>
          <div className="f-group">
            <label className="f-label">Exclusions</label>
            <textarea className="inp" placeholder="List items not included in this quote (e.g. landscaping, external paving, appliances, boundary walls)" style={{minHeight:80}} />
          </div>
          <div className="f-group">
            <label className="f-label">Assumptions</label>
            <textarea className="inp" placeholder="e.g. Soil suitable for strip foundations, approved plans supplied by client, etc." style={{minHeight:80}} />
          </div>
        </div>
        <div className="card p-5">
          <div className="h-4 mb-4">Attachments & Supporting Docs</div>
          {[
            { name:"Company Profile.pdf",  size:"2.1MB", icon:"🏢" },
            { name:"CIDB Certificate.pdf", size:"0.4MB", icon:"🔏" },
            { name:"Insurance COC.pdf",    size:"0.6MB", icon:"🛡️" },
          ].map(d => (
            <div key={d.name} className="flex items-c gap-3 mb-3 rounded-md p-3 bg-brand-lt">
              <span style={{fontSize:20}}>{d.icon}</span>
              <div className="flex-1">
                <div className="caption fw-5">{d.name}</div>
                <div className="micro c-3">{d.size}</div>
              </div>
              <button className="btn btn-ghost btn-sm c-error">Remove</button>
            </div>
          ))}
          <button className="btn btn-secondary btn-sm w-full mt-2">+ Attach Document</button>

          <div className="divider" />
          <div className="h-4 mb-3">Cost Benchmark Check</div>
          <Notif type="success" icon="✅" msg="Your total of R 4.2M is within the expected range for a 3-bed new build of 220m² in Pretoria (R 3.9M – R 4.8M)." />
          <div className="caption c-2">Data sourced from Builders Warehouse, Cashbuild & PPC pricelist — updated Mar 2025.</div>
        </div>
      </div>

      <div className="flex j-between items-c mt-6 card p-4" style={{background:"var(--brand-primary)"}}>
        <div>
          <div className="caption c-white fw-6">Total Quote Value (incl. VAT)</div>
          <div className="h-2 c-white fs-m mt-1">{fmt(total)}</div>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary" onClick={() => setScreen("builder-dashboard")}>Save Draft</button>
          <button className="btn btn-accent btn-lg">Submit Quote to Client →</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 6 — PROJECT DETAIL
// ─────────────────────────────────────────────────────────────────────────────
const ProjectDetailScreen = ({ setScreen, userRole }) => {
  const [tab, setTab] = useState("overview");
  return (
    <div className="page-wrap">
      <div className="flex items-c gap-3 mb-4">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen(userRole === "builder" ? "builder-dashboard" : "client-dashboard")}>← Back</button>
        <span className="c-3 caption">/ BQ-2024-003</span>
      </div>

      {/* Header */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="flex items-s gap-5">
            <div className="ava ava-xl rounded-lg" style={{ background:"var(--brand-primary)", borderRadius:"var(--r-lg)", fontSize:28 }}>🏗️</div>
            <div className="flex-1">
              <div className="flex items-c gap-3 mb-2 flex-wrap">
                <div className="h-2">Pretoria New Build 3-Bed Cluster</div>
                <Badge status="BANK_SUBMITTED" />
              </div>
              <div className="caption c-2 mb-2">📍 Waterkloof, Pretoria, GP · New Build · 220 m²</div>
              <div className="flex gap-3 flex-wrap">
                <Tag>3 Bedrooms</Tag><Tag>2 Bathrooms</Tag><Tag>Double Garage</Tag>
                <Tag>Solar-Ready</Tag><Tag>Grade 5 Builder</Tag>
              </div>
            </div>
            <div className="text-right">
              <div className="caption c-3 mb-1">Accepted Quote</div>
              <div className="h-2 fs-m c-brand">R 4,200,000</div>
              <div className="micro c-3">incl. VAT</div>
              {userRole !== "builder" && <button className="btn btn-accent btn-sm mt-3" onClick={() => setScreen("bank-submission")}>🏦 Bank Application</button>}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs mb-5">
        {["overview","documents","quote","timeline","messages"].map(t => (
          <button key={t} className={`tab-item ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid-2 gap-5">
          <div>
            <div className="card mb-4">
              <div className="card-head"><span className="h-4">Project Details</span></div>
              <div className="card-body">
                {[
                  ["Project ID","BQ-2024-003"],["Type","New Build"],["Client","Andre van Wyk"],
                  ["Builder","KS Building Solutions (Kobus Swanepoel)"],
                  ["Submitted","24 Jan 2025"],["Start Date","1 March 2025"],
                  ["Duration","12 months"],["Funding","Bank Finance — FNB"],
                  ["Status","Bank Submitted"],["Admin","Reviewed ✓"],
                ].map(([k,v]) => (
                  <div key={k} className="flex items-c j-between py-2" style={{borderBottom:"1px solid var(--border-sub)"}}>
                    <span className="caption c-2">{k}</span>
                    <span className="caption fw-5">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-head"><span className="h-4">Builder Profile</span></div>
              <div className="card-body">
                <div className="flex items-c gap-3 mb-4">
                  <Avatar name="Kobus Swanepoel" bg="#1C3557" size="lg" />
                  <div>
                    <div className="flex items-c gap-2 mb-1">
                      <span className="h-4">KS Building Solutions</span>
                      <span className="badge b-verified">✓ Verified</span>
                    </div>
                    <div className="caption c-2">Kobus Swanepoel · ⭐ 4.9 · 89 completed jobs</div>
                  </div>
                </div>
                {[["CIDB Grade","Grade 5 (up to R 13M)"],["Specialisations","New Build, Commercial, Steel"],["Location","Sandton, Johannesburg"],["Reg No.","2018/345678/07"],["Insurance","Public Liability R 10M ✓"]].map(([k,v]) => (
                  <div key={k} className="flex items-c j-between py-2" style={{borderBottom:"1px solid var(--border-sub)"}}>
                    <span className="caption c-2">{k}</span><span className="caption fw-5">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="card mb-4">
              <div className="card-head"><span className="h-4">Project Description</span></div>
              <div className="card-body">
                <div className="body c-2" style={{lineHeight:1.75}}>
                  Single storey, 3-bedroom freestanding cluster unit in a security estate. High-end finishes with double garage, covered patio, and solar-ready roof structure. Architectural design by Eben Marais & Associates.
                </div>
                <div className="divider" />
                <div className="caption fw-6 mb-2">Site Address</div>
                <div className="map-ph">
                  <div style={{textAlign:"center",position:"relative",zIndex:1}}>
                    <div className="map-pin">📍</div>
                    <div className="caption c-2 fw-5 mt-1">Waterkloof, Pretoria</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-head"><span className="h-4">Timeline</span></div>
              <div className="card-body">
                <div className="timeline">
                  {TIMELINE_EVENTS.map((e,i) => (
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
      )}

      {tab === "documents" && (
        <div className="card">
          <div className="card-head j-between">
            <span className="h-4">Project Documents</span>
            <button className="btn btn-secondary btn-sm">+ Upload Document</button>
          </div>
          <div className="card-body">
            <div className="grid-2 gap-3">
              {[
                { name:"Approved Building Plans", type:"PDF", size:"8.4MB", icon:"📐", date:"24 Jan", by:"Client" },
                { name:"Title Deed (T12345/2021)", type:"PDF", size:"1.2MB", icon:"📜", date:"24 Jan", by:"Client" },
                { name:"Site Photographs (8 files)", type:"ZIP", size:"18MB", icon:"📸", date:"24 Jan", by:"Client" },
                { name:"KS Building Solutions Quote", type:"PDF", size:"2.1MB", icon:"💼", date:"8 Feb", by:"Builder" },
                { name:"Builder Company Profile", type:"PDF", size:"1.8MB", icon:"🏢", date:"8 Feb", by:"Builder" },
                { name:"CIDB Registration Certificate", type:"PDF", size:"0.4MB", icon:"🔏", date:"8 Feb", by:"Builder" },
                { name:"Public Liability Insurance COC", type:"PDF", size:"0.6MB", icon:"🛡️", date:"8 Feb", by:"Builder" },
                { name:"FNB Bank Application Pack", type:"PDF", size:"3.2MB", icon:"🏦", date:"12 Feb", by:"System" },
              ].map(d => (
                <div key={d.name} className="flex items-c gap-3 card p-4 card-hover">
                  <span style={{fontSize:24}}>{d.icon}</span>
                  <div className="flex-1">
                    <div className="caption fw-5 mb-1">{d.name}</div>
                    <div className="micro c-3">{d.type} · {d.size} · {d.date} · by {d.by}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm">⬇</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "quote" && (
        <div className="card">
          <div className="card-head j-between">
            <span className="h-4">Accepted Quote — QUO-2025-047</span>
            <button className="btn btn-secondary btn-sm">Download PDF</button>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="q-tbl">
              <thead>
                <tr>
                  <th>Category</th><th style={{minWidth:220}}>Description</th>
                  <th className="text-right">Qty</th><th>Unit</th>
                  <th className="text-right">Rate (R)</th><th className="text-right">Total (R)</th>
                </tr>
              </thead>
              <tbody>
                {QUOTE_ITEMS.map(item => (
                  <tr key={item.id}>
                    <td><span className="tag">{item.cat}</span></td>
                    <td className="caption">{item.desc}</td>
                    <td className="num">{item.qty.toLocaleString()}</td>
                    <td><span className="caption c-3">{item.unit}</span></td>
                    <td className="num">{item.rate.toLocaleString()}</td>
                    <td className="num fw-6">{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{background:"rgba(0,0,0,0.03)"}}>
                  <td colSpan={5} className="text-right caption fw-6">Subtotal (excl. VAT)</td>
                  <td className="num fw-6">R {QUOTE_ITEMS.reduce((a,i)=>a+i.total,0).toLocaleString()}</td>
                </tr>
                <tr style={{background:"rgba(0,0,0,0.03)"}}>
                  <td colSpan={5} className="text-right caption fw-6">VAT (15%)</td>
                  <td className="num fw-6">R {Math.round(QUOTE_ITEMS.reduce((a,i)=>a+i.total,0)*0.15).toLocaleString()}</td>
                </tr>
                <tr className="q-total">
                  <td colSpan={5} className="text-right">TOTAL (incl. VAT)</td>
                  <td className="num">R 4,200,000</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {tab === "timeline" && (
        <div className="card">
          <div className="card-head"><span className="h-4">Full Activity Timeline</span></div>
          <div className="card-body">
            <div className="timeline">
              {TIMELINE_EVENTS.map((e,i) => (
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
      )}

      {tab === "messages" && (
        <div className="card" style={{maxWidth:640}}>
          <div className="card-head"><span className="h-4">Project Messages</span></div>
          <div className="card-body" style={{maxHeight:400,overflowY:"auto"}}>
            {[
              { from:"Andre van Wyk", role:"Client", msg:"Please confirm the roof tile spec — we discussed a lighter colour option.", time:"10 Feb 14:23", me:false },
              { from:"Kobus Swanepoel", role:"Builder", msg:"Confirmed — we can use Marley Pearl Grey 305 at no extra cost. Updated in the spec sheet.", time:"10 Feb 16:05", me:true },
              { from:"Andre van Wyk", role:"Client", msg:"Perfect. And what is the allowance for kitchen cupboards in the quote?", time:"11 Feb 09:14", me:false },
              { from:"Kobus Swanepoel", role:"Builder", msg:"R 95,000 including installation, as per line item 14. Upgrade options available — I'll send options.", time:"11 Feb 10:30", me:true },
            ].map((m,i) => (
              <div key={i} className={`flex gap-3 mb-4 ${m.me ? "flex-row" : ""}`} style={{justifyContent:m.me?"flex-end":"flex-start"}}>
                {!m.me && <Avatar name={m.from} size="sm" bg={i%2===0?"#1C3557":"#C4622D"} />}
                <div style={{maxWidth:"75%"}}>
                  <div className="micro c-3 mb-1 fw-5">{m.me?"You":m.from} · {m.time}</div>
                  <div className="body rounded-lg p-3" style={{background:m.me?"var(--brand-primary)":"rgba(0,0,0,0.05)",color:m.me?"white":"var(--txt-1)"}}>
                    {m.msg}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card-foot">
            <input className="inp flex-1" placeholder="Write a message…" />
            <button className="btn btn-primary btn-sm">Send →</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 7 — ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const AdminDashboard = ({ setScreen }) => {
  const [tab, setTab] = useState("projects");
  return (
    <div className="page-wrap">
      <div className="flex items-c j-between mb-5">
        <div>
          <div className="h-2 mb-1">Administration Console</div>
          <div className="caption c-2">Platform overview — all clients, builders and projects.</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm">⬇ Export Report</button>
          <button className="btn btn-primary btn-sm">+ Manual Entry</button>
        </div>
      </div>

      <div className="stat-grid mb-5">
        <StatCard label="Total Clients" value="284" delta="+12 this week" color="var(--brand-primary)" icon="👥" />
        <StatCard label="Verified Builders" value="67" delta="+3 this week" color="#0369A1" icon="🔨" />
        <StatCard label="Pending Verification" value="8" color="var(--warning)" icon="⏳" />
        <StatCard label="Active Projects" value="41" delta="+7 this month" color="var(--success)" icon="📋" />
        <StatCard label="Quotes Submitted" value="128" color="#7C3AED" icon="💼" />
        <StatCard label="Platform Value" value="R 38.2M" color="var(--brand-accent)" deltaType="neutral" delta="Total quote value" icon="💰" />
      </div>

      <div className="tabs mb-5">
        {["projects","clients","builders","verifications"].map(t => (
          <button key={t} className={`tab-item ${tab===t?"active":""}`} onClick={()=>setTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "projects" && (
        <div className="card">
          <div className="card-head j-between">
            <span className="h-4">All Projects</span>
            <div className="flex gap-2 items-c">
              <input className="inp" placeholder="🔍 Search projects…" style={{width:220}} />
              <select className="inp" style={{width:160}}>
                <option>All statuses</option>
                {Object.entries(STATUSES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Project ID</th><th>Title</th><th>Client</th>
                  <th>Type</th><th>Value</th><th>Status</th><th>Date</th><th></th>
                </tr>
              </thead>
              <tbody>
                {DEMO_PROJECTS.map(p => (
                  <tr key={p.id} onClick={() => setScreen("project-detail")}>
                    <td className="fs-m caption c-3">{p.id}</td>
                    <td><span className="caption fw-5">{p.title}</span></td>
                    <td className="caption c-2">{p.client}</td>
                    <td><Tag>{p.type}</Tag></td>
                    <td className="caption fw-6 fs-m">{p.value}</td>
                    <td><Badge status={p.status} /></td>
                    <td className="caption c-3">{p.date}</td>
                    <td><button className="btn btn-ghost btn-sm">→</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "builders" && (
        <div className="card">
          <div className="card-head j-between">
            <span className="h-4">Registered Builders</span>
            <input className="inp" placeholder="🔍 Search builders…" style={{width:220}} />
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="tbl">
              <thead>
                <tr>
                  <th></th><th>Builder</th><th>Company</th><th>Reg No.</th>
                  <th>Location</th><th>Status</th><th>Rating</th><th>Jobs</th><th></th>
                </tr>
              </thead>
              <tbody>
                {DEMO_BUILDERS.map((b,i) => (
                  <tr key={b.id}>
                    <td><Avatar name={b.name} bg={["#1C3557","#C4622D","#2A7D4F","#7C3AED"][i]} size="sm" /></td>
                    <td className="caption fw-5">{b.name}</td>
                    <td className="caption c-2">{b.company}</td>
                    <td className="caption c-3 fs-m" style={{fontSize:11}}>{b.reg}</td>
                    <td className="caption c-2">{b.location}</td>
                    <td>
                      <span className={`badge ${b.status==="verified"?"b-verified":"b-pending"}`}>
                        {b.status==="verified"?"✓ Verified":"⏳ Pending"}
                      </span>
                    </td>
                    <td className="caption fw-6">{b.rating ? `⭐ ${b.rating}` : "—"}</td>
                    <td className="caption">{b.jobs}</td>
                    <td>
                      <div className="flex gap-2">
                        {b.status !== "verified" && <button className="btn btn-sm" style={{background:"var(--success-bg)",color:"var(--success)",border:"1px solid rgba(42,125,79,0.18)"}}>Verify</button>}
                        <button className="btn btn-ghost btn-sm">→</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "clients" && (
        <div className="card">
          <div className="card-head"><span className="h-4">Registered Clients</span></div>
          <div style={{overflowX:"auto"}}>
            <table className="tbl">
              <thead>
                <tr><th></th><th>Name</th><th>Email</th><th>Phone</th><th>Projects</th><th>Registered</th><th></th></tr>
              </thead>
              <tbody>
                {["Thabo Nkosi","Priya Naidoo","Andre van Wyk","Lisa Joubert","Dean Botha"].map((n,i) => (
                  <tr key={n}>
                    <td><Avatar name={n} bg={["#1C3557","#C4622D","#2A7D4F","#7C3AED","#0369A1"][i]} size="sm" /></td>
                    <td className="caption fw-5">{n}</td>
                    <td className="caption c-2">{n.toLowerCase().replace(" ",".")+"@email.co.za"}</td>
                    <td className="caption c-3">+27 8{i} 000 000{i}</td>
                    <td className="caption fw-5">{i+1}</td>
                    <td className="caption c-3">Jan 2025</td>
                    <td><button className="btn btn-ghost btn-sm">→</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "verifications" && (
        <div className="flex flex-col gap-4">
          <Notif type="warning" icon="⚠️" title="8 builders pending verification" msg="Please review and approve or reject the following builder registrations." />
          {DEMO_BUILDERS.filter(b => b.status === "pending").map(b => (
            <div key={b.id} className="card p-5">
              <div className="flex items-c gap-4 mb-4">
                <Avatar name={b.name} bg="#C4622D" size="lg" />
                <div className="flex-1">
                  <div className="flex items-c gap-2 mb-1">
                    <span className="h-3">{b.company}</span>
                    <span className="badge b-pending">⏳ Pending Review</span>
                  </div>
                  <div className="caption c-2">{b.name} · {b.location}</div>
                  <div className="caption c-3 mt-1 fs-m">Reg: {b.reg}</div>
                </div>
              </div>
              <div className="grid-3 gap-3 mb-4">
                {[
                  { name:"Company Registration.pdf", icon:"📋" },
                  { name:"CIDB Certificate.pdf", icon:"🔏" },
                  { name:"Tax Clearance.pdf", icon:"📊" },
                ].map(d => <DocChip key={d.name} name={d.name} icon={d.icon} />)}
              </div>
              <div className="flex gap-3">
                <button className="btn btn-sm" style={{background:"var(--success-bg)",color:"var(--success)",border:"1px solid rgba(42,125,79,0.2)"}}>✓ Verify & Approve</button>
                <button className="btn btn-danger btn-sm">✕ Reject Application</button>
                <button className="btn btn-secondary btn-sm">Request More Documents</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 8 — SEARCH & FILTER
// ─────────────────────────────────────────────────────────────────────────────
const SearchScreen = ({ setScreen, userRole }) => {
  const [query, setQuery] = useState("");
  return (
    <div className="page-wrap">
      <div className="h-2 mb-5">{userRole === "builder" ? "Browse Available Projects" : "Find Verified Builders"}</div>

      {/* Search bar */}
      <div className="card p-4 mb-4">
        <div className="flex items-c gap-3 flex-wrap">
          <div className="inp-wrap flex-1" style={{minWidth:200}}>
            <span className="inp-ico">🔍</span>
            <input className="inp" placeholder={userRole==="builder"?"Search projects by type, location…":"Search builders by trade, location…"} value={query} onChange={e=>setQuery(e.target.value)} />
          </div>
          <select className="inp" style={{width:160}}>
            <option>All of Gauteng</option><option>Johannesburg</option>
            <option>Pretoria</option><option>Centurion</option><option>Sandton</option>
          </select>
          {userRole === "builder" ? (
            <select className="inp" style={{width:160}}>
              <option>All types</option><option>New Build</option><option>Extension</option>
              <option>Renovation</option><option>Outdoor</option>
            </select>
          ) : (
            <select className="inp" style={{width:180}}>
              <option>All trades</option>
              {TRADE_CATEGORIES.slice(0,6).map(t => <option key={t}>{t}</option>)}
            </select>
          )}
          <select className="inp" style={{width:160}}>
            <option>Any budget</option><option>Under R 500K</option>
            <option>R 500K – R 1M</option><option>R 1M – R 3M</option><option>R 3M+</option>
          </select>
          <button className="btn btn-primary">Search</button>
        </div>
      </div>

      {/* Results */}
      {userRole === "builder" ? (
        <div className="flex flex-col gap-3">
          {DEMO_PROJECTS.map(p => (
            <div key={p.id} className="card card-hover p-5" onClick={() => setScreen("project-detail")}>
              <div className="flex items-c gap-4">
                <div style={{width:50,height:50,borderRadius:"var(--r-md)",background:"var(--info-bg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                  {p.type==="New Build"?"🏗️":p.type==="Extension"?"📐":p.type==="Outdoor"?"🌿":"🔨"}
                </div>
                <div className="flex-1">
                  <div className="flex items-c gap-2 mb-1 flex-wrap">
                    <span className="h-4">{p.title}</span>
                    <Badge status={p.status} />
                  </div>
                  <div className="caption c-2 mb-2">📍 {p.location} · {p.date}</div>
                  <div className="flex gap-2">
                    <Tag>{p.type}</Tag>
                    <Tag>Posted {p.date}</Tag>
                  </div>
                </div>
                <div className="text-right" style={{flexShrink:0}}>
                  <div className="caption c-3 mb-1">Est. Value</div>
                  <div className="h-4 fs-m c-brand">{p.value}</div>
                  <button className="btn btn-accent btn-sm mt-2" onClick={e=>{e.stopPropagation();setScreen("quote-builder")}}>Quote This</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {DEMO_BUILDERS.map((b,i) => (
            <div key={b.id} className="card card-hover p-5">
              <div className="flex items-c gap-4">
                <Avatar name={b.name} bg={["#1C3557","#C4622D","#2A7D4F","#7C3AED"][i]} size="lg" />
                <div className="flex-1">
                  <div className="flex items-c gap-2 mb-1 flex-wrap">
                    <span className="h-4">{b.company}</span>
                    <span className={`badge ${b.status==="verified"?"b-verified":"b-pending"}`}>{b.status==="verified"?"✓ Verified":"⏳ Pending"}</span>
                  </div>
                  <div className="caption c-2 mb-2">{b.name} · 📍 {b.location}</div>
                  <div className="flex gap-2 flex-wrap">
                    {b.spec.map(s => <Tag key={s}>{s}</Tag>)}
                  </div>
                  <div className="mt-3">
                    <div className="caption c-3 mb-1">Match score for your project:</div>
                    <div className="flex items-c gap-2">
                      <div className="match-bar"><div className="match-fill" style={{width:[92,84,71,96][i]+"%"}} /></div>
                      <span className="caption fw-7 c-brand">{[92,84,71,96][i]}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right" style={{flexShrink:0}}>
                  {b.rating && <div className="h-4">⭐ {b.rating}</div>}
                  <div className="caption c-3">{b.jobs} completed jobs</div>
                  <button className="btn btn-primary btn-sm mt-3">Request Quote</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 9 — BANK SUBMISSION
// ─────────────────────────────────────────────────────────────────────────────
const BankSubmissionScreen = ({ setScreen }) => {
  const [stage, setStage] = useState(0); // 0: prep  1: sending  2: success
  useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 2200);
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (stage === 2) return (
    <div className="page-wrap" style={{maxWidth:560}}>
      <div className="card p-6 text-center" style={{animation:"pop 0.5s var(--ease-spring)"}}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <div className="h-2 mb-2">Application Submitted!</div>
        <div className="body c-2 mb-5">Your home loan application has been sent electronically to <strong>FNB Home Loans</strong>. A reference number has been generated and both you and the builder have been notified by email.</div>
        <div className="card p-4 bg-success mb-5 text-left" style={{borderRadius:"var(--r-lg)"}}>
          {[
            ["Application Reference","FNB-HL-2025-089234"],
            ["Submitted To","FNB Home Loans — Electronic Interface"],
            ["Submitted At","12 Feb 2025 — 09:14:33"],
            ["Quote Value","R 4,200,000 (incl. VAT)"],
            ["Expected Response","5–10 business days"],
          ].map(([k,v]) => (
            <div key={k} className="flex items-c j-between py-2" style={{borderBottom:"1px solid rgba(42,125,79,0.15)"}}>
              <span className="caption c-2">{k}</span>
              <span className="caption fw-6 c-success fs-m">{v}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary w-full" onClick={() => setScreen("project-detail")}>← Back to Project</button>
      </div>
    </div>
  );

  if (stage === 1) return (
    <div className="page-wrap" style={{maxWidth:480}}>
      <div className="card p-6 text-center">
        <div style={{fontSize:48,marginBottom:16,animation:"pulse 1s infinite"}}>🏦</div>
        <div className="h-3 mb-2">Sending to FNB Home Loans…</div>
        <div className="caption c-2 mb-5">Establishing secure connection and transmitting application pack.</div>
        <div className="progress mb-3"><div className="progress-fill" style={{width:"72%",animation:"none"}} /></div>
        <div className="caption c-3">Uploading documents — please do not close this window.</div>
      </div>
    </div>
  );

  return (
    <div className="page-wrap" style={{maxWidth:680}}>
      <div className="flex items-c gap-3 mb-5">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen("project-detail")}>← Project</button>
        <span className="c-3 caption">/ Bank Application</span>
      </div>
      <div className="h-2 mb-2">Submit Home Loan Application</div>
      <div className="caption c-2 mb-5">
        We will compile your complete application packet and transmit it electronically to your selected bank. BuildQuote does not handle any funds — this only establishes the connection.
      </div>

      <Notif type="info" icon="🔒" title="Secure electronic submission" msg="Your data is encrypted and transmitted via the bank's official API integration. BuildQuote never stores your banking credentials." />

      <div className="card mb-4">
        <div className="card-head"><span className="h-4">Application Contents</span></div>
        <div className="card-body">
          {[
            { ico:"✅", item:"Client Personal Details", note:"Pre-populated from your registered profile" },
            { ico:"✅", item:"Accepted Quote — R 4,200,000 (incl. VAT)", note:"QUO-2025-047 by KS Building Solutions" },
            { ico:"✅", item:"Approved Building Plans", note:"Uploaded to project documents" },
            { ico:"✅", item:"Title Deed (T12345/2021)", note:"Property ownership verification" },
            { ico:"✅", item:"Builder Verification Certificate", note:"CIDB Grade 5 — verified by BuildQuote" },
            { ico:"✅", item:"Builder Insurance Certificate", note:"Public Liability R 10M" },
            { ico:"⚠️", item:"Payslips / Proof of Income", note:"Please attach — required by the bank", warn:true },
            { ico:"⚠️", item:"Last 3 Months Bank Statements", note:"Please attach — required by the bank", warn:true },
          ].map(r => (
            <div key={r.item} className="flex items-c gap-3 mb-3">
              <span style={{fontSize:18}}>{r.ico}</span>
              <div className="flex-1">
                <div className={`caption fw-5 ${r.warn?"c-warning":""}`}>{r.item}</div>
                <div className="micro c-3">{r.note}</div>
              </div>
              {r.warn && <button className="btn btn-secondary btn-sm">+ Attach</button>}
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-head"><span className="h-4">Select Bank</span></div>
        <div className="card-body">
          <div className="grid-2 gap-3">
            {[
              { name:"FNB Home Loans", note:"Fastest electronic turnaround", selected:true },
              { name:"ABSA Home Loans", note:"Largest residential lender" },
              { name:"Standard Bank Home Loans", note:"Competitive rates" },
              { name:"Nedbank Home Loans", note:"Good for self-build" },
            ].map(b => (
              <div key={b.name} className={`card p-4 card-hover ${b.selected?"border-med shadow-sm":""}`} style={b.selected?{borderColor:"var(--brand-primary)",background:"var(--info-bg)"}:{}}>
                <div className="flex items-c j-between mb-1">
                  <span className="h-4">🏦 {b.name}</span>
                  {b.selected && <span className="badge b-active">Selected</span>}
                </div>
                <div className="caption c-3">{b.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 j-between items-c">
        <div className="caption c-3">By submitting, you authorise BuildQuote to transmit your application to the selected bank.</div>
        <div className="flex gap-3">
          <button className="btn btn-secondary" onClick={() => setScreen("project-detail")}>Cancel</button>
          <button className="btn btn-accent btn-lg" onClick={() => setStage(1)}>
            🏦 Submit to FNB Home Loans →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 10 — PROFILE & SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
const ProfileScreen = ({ userRole }) => {
  const [tab, setTab] = useState("profile");
  return (
    <div className="page-wrap" style={{maxWidth:800}}>
      <div className="h-2 mb-5">Profile & Settings</div>
      <div className="tabs mb-5">
        {["profile", userRole === "builder" ? "company" : null, "notifications","security"].filter(Boolean).map(t => (
          <button key={t} className={`tab-item ${tab===t?"active":""}`} onClick={()=>setTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="grid-2 gap-5">
          <div className="card p-5">
            <div className="flex items-c gap-4 mb-5">
              <div className="ava ava-xl" style={{background:"var(--brand-primary)",fontSize:28}}>TN</div>
              <div>
                <div className="h-3 mb-1">Thabo Nkosi</div>
                <div className="caption c-2">Client Account · Joined Jan 2025</div>
                <button className="btn btn-secondary btn-sm mt-2">Change Photo</button>
              </div>
            </div>
            <div className="f-group"><label className="f-label">First Name</label><input className="inp" defaultValue="Thabo" /></div>
            <div className="f-group"><label className="f-label">Last Name</label><input className="inp" defaultValue="Nkosi" /></div>
            <div className="f-group"><label className="f-label">Email</label><input className="inp" type="email" defaultValue="thabo.nkosi@email.co.za" /></div>
            <div className="f-group"><label className="f-label">Phone</label><input className="inp" defaultValue="+27 82 000 0001" /></div>
            <div className="f-group"><label className="f-label">ID Number</label><input className="inp" placeholder="••••••••••••••" /></div>
            <div className="f-group"><label className="f-label">Physical Address</label><textarea className="inp" defaultValue="12 Acacia Avenue, Sandton, 2196" /></div>
            <button className="btn btn-primary w-full mt-2">Save Changes</button>
          </div>

          <div>
            <div className="card p-5 mb-4">
              <div className="h-4 mb-4">My Documents</div>
              {[
                { name:"ID / Passport", status:"✓ Uploaded", icon:"🪪" },
                { name:"Proof of Residence", status:"✓ Uploaded", icon:"🏠" },
                { name:"Income Statement", status:"✗ Required", icon:"📊", warn:true },
              ].map(d => (
                <div key={d.name} className="flex items-c gap-3 mb-3">
                  <span style={{fontSize:22}}>{d.icon}</span>
                  <div className="flex-1">
                    <div className="caption fw-5">{d.name}</div>
                    <div className={`micro ${d.warn?"c-warning":"c-success"}`}>{d.status}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm">{d.warn?"+ Upload":"Replace"}</button>
                </div>
              ))}
            </div>
            <div className="card p-5">
              <div className="h-4 mb-4">Preferences</div>
              <div className="f-group">
                <label className="f-label">Default Province</label>
                <select className="inp"><option>Gauteng</option><option>Western Cape</option></select>
              </div>
              <div className="f-group">
                <label className="f-label">Preferred Bank</label>
                <select className="inp"><option>FNB Home Loans</option><option>ABSA</option><option>Standard Bank</option></select>
              </div>
              <div className="f-group">
                <label className="f-label">Language</label>
                <select className="inp"><option>English</option><option>Afrikaans</option><option>Zulu</option></select>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "company" && (
        <div className="grid-2 gap-5">
          <div className="card p-5">
            <div className="h-4 mb-4">Company Details</div>
            <div className="f-group"><label className="f-label">Company Name</label><input className="inp" defaultValue="Dlamini Construction" /></div>
            <div className="f-group"><label className="f-label">Registration Number</label><input className="inp" defaultValue="2019/234567/07" /></div>
            <div className="f-group"><label className="f-label">VAT Number</label><input className="inp" defaultValue="4800123456" /></div>
            <div className="f-group"><label className="f-label">CIDB Grade</label><select className="inp"><option>Grade 5 (up to R 13M)</option></select></div>
            <div className="f-group"><label className="f-label">NHBRC Enrolment No.</label><input className="inp" placeholder="e.g. 0123456" /></div>
            <div className="f-group">
              <label className="f-label">Trade Specialisations</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>
                {TRADE_CATEGORIES.slice(0,8).map(t => (
                  <div key={t} className="check-row" style={{marginBottom:4}}>
                    <div className="check-box checked"><span style={{color:"white",fontSize:10}}>✓</span></div>
                    <span className="caption">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-primary w-full mt-2">Save Company Details</button>
          </div>
          <div>
            <div className="card p-5 mb-4">
              <div className="flex items-c j-between mb-3">
                <div className="h-4">Verification Status</div>
                <span className="badge b-verified">✓ Verified</span>
              </div>
              {[
                { name:"Company Registration", icon:"📋", ok:true },
                { name:"CIDB Certificate", icon:"🔏", ok:true },
                { name:"Tax Clearance (SARS)", icon:"📊", ok:true },
                { name:"Public Liability Insurance", icon:"🛡️", ok:true },
                { name:"NHBRC Registration", icon:"🏗️", ok:false },
              ].map(d => (
                <div key={d.name} className="flex items-c gap-3 mb-3">
                  <span style={{fontSize:18}}>{d.icon}</span>
                  <span className="caption fw-5 flex-1">{d.name}</span>
                  <span className={`micro fw-7 ${d.ok?"c-success":"c-warning"}`}>{d.ok?"✓ Approved":"⚠ Required"}</span>
                </div>
              ))}
            </div>
            <div className="card p-5">
              <div className="h-4 mb-3">Service Area</div>
              <div className="map-ph">
                <div style={{position:"relative",zIndex:1,textAlign:"center"}}>
                  <div className="map-pin">📍</div>
                  <div className="caption fw-5 c-2 mt-1">Johannesburg area (30km radius)</div>
                  <button className="btn btn-secondary btn-sm mt-2">Edit Service Area</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="card p-5" style={{maxWidth:500}}>
          <div className="h-4 mb-5">Notification Preferences</div>
          {[
            { label:"New project matches", desc:"When a project matches your trade profile" },
            { label:"Quote submitted", desc:"When a builder submits a quote on your project" },
            { label:"Quote accepted / rejected", desc:"Status change on your submitted quote" },
            { label:"Admin review complete", desc:"When your project passes admin review" },
            { label:"Bank application updates", desc:"Status changes from the bank" },
            { label:"Message received", desc:"New message from client / builder" },
            { label:"System alerts", desc:"Platform maintenance and important notices" },
          ].map((n,i) => (
            <div key={n.label} className="flex items-c j-between py-3" style={{borderBottom:i<6?"1px solid var(--border-sub)":"none"}}>
              <div>
                <div className="caption fw-5">{n.label}</div>
                <div className="micro c-3">{n.desc}</div>
              </div>
              <div className="flex gap-2 items-c">
                <button className="btn btn-sm bg-success" style={{background:"var(--success-bg)",color:"var(--success)",border:"1px solid rgba(42,125,79,0.2)",fontSize:11,padding:"3px 10px"}}>Email</button>
                <button className="btn btn-sm" style={{background:"rgba(0,0,0,0.05)",color:"var(--txt-3)",border:"1px solid var(--border-sub)",fontSize:11,padding:"3px 10px"}}>In-App</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "security" && (
        <div className="grid-2 gap-5">
          <div className="card p-5">
            <div className="h-4 mb-4">Change Password</div>
            <div className="f-group"><label className="f-label">Current Password</label><input className="inp" type="password" /></div>
            <div className="f-group"><label className="f-label">New Password</label><input className="inp" type="password" /></div>
            <div className="f-group"><label className="f-label">Confirm New Password</label><input className="inp" type="password" /></div>
            <button className="btn btn-primary w-full">Update Password</button>
          </div>
          <div className="card p-5">
            <div className="h-4 mb-4">Two-Factor Authentication</div>
            <Notif type="warning" icon="⚠️" msg="2FA is not enabled. We strongly recommend enabling it to protect your account." />
            <button className="btn btn-primary w-full mb-3">Enable Two-Factor Auth</button>
            <div className="divider" />
            <div className="h-4 mb-3">Active Sessions</div>
            {["Chrome · Johannesburg · Now","Safari · Mobile · 2 days ago"].map(s => (
              <div key={s} className="flex items-c j-between py-2 caption">
                <span>🖥️ {s}</span>
                <button className="btn btn-ghost btn-sm c-error">Sign out</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE SCREEN
// ─────────────────────────────────────────────────────────────────────────────
const EmptyStateScreen = ({ setScreen }) => (
  <div className="page-wrap">
    <div className="h-2 mb-5">Empty & Error States</div>
    <div className="grid-2 gap-5">
      <div className="card">
        <div className="card-head"><span className="h-4">No Projects Yet</span></div>
        <div className="empty-state">
          <div className="empty-ico">📋</div>
          <div className="h-3">No projects found</div>
          <div className="body c-2 text-center" style={{maxWidth:280}}>You haven't submitted any building projects yet. Get started by creating your first project request.</div>
          <button className="btn btn-accent" onClick={() => setScreen("create-project")}>+ Create First Project</button>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><span className="h-4">No Matching Builders</span></div>
        <div className="empty-state">
          <div className="empty-ico">🔨</div>
          <div className="h-3">No builders in your area</div>
          <div className="body c-2 text-center" style={{maxWidth:280}}>There are currently no verified builders within your selected radius. Try expanding the search area.</div>
          <button className="btn btn-secondary">Expand Search Radius</button>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><span className="h-4">Error State</span></div>
        <div className="empty-state">
          <div className="empty-ico" style={{background:"var(--error-bg)"}}>⚠️</div>
          <div className="h-3">Something went wrong</div>
          <div className="body c-2 text-center" style={{maxWidth:280}}>We couldn't load your projects. This might be a temporary issue. Please try again.</div>
          <div className="flex gap-3">
            <button className="btn btn-primary">Try Again</button>
            <button className="btn btn-secondary">Contact Support</button>
          </div>
          <div className="micro c-3 fs-m">Error code: 503 · Ref: ERR-20250212-0847</div>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><span className="h-4">Loading / Skeleton State</span></div>
        <div className="card-body">
          <div className="flex items-c gap-3 mb-4">
            <div className="skel" style={{width:46,height:46,borderRadius:"var(--r-md)"}} />
            <div className="flex-1"><Skeleton w="60%" h={14} mb={6} /><Skeleton w="40%" h={11} /></div>
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="flex items-c gap-3 mb-4">
              <div className="skel" style={{width:36,height:36,borderRadius:"var(--r-md)"}} />
              <div className="flex-1"><Skeleton w={`${[70,55,80][i-1]}%`} h={13} mb={5} /><Skeleton w="35%" h={10} /></div>
              <Skeleton w={60} h={20} style={{borderRadius:10}} />
            </div>
          ))}
          <Skeleton w="100%" h={36} mb={8} />
          <div className="caption c-3 text-center" style={{animation:"pulse 1.5s infinite"}}>Loading your projects…</div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR — role-aware navigation
// ─────────────────────────────────────────────────────────────────────────────
const navConfig = {
  client: [
    { section: "Main", items: [
      { key:"client-dashboard", icon:"🏠", label:"Dashboard" },
      { key:"create-project",   icon:"＋", label:"New Project" },
      { key:"search",           icon:"🔍", label:"Find Builders" },
    ]},
    { section: "Projects", items: [
      { key:"project-detail",   icon:"📋", label:"My Projects", badge:"3" },
      { key:"bank-submission",  icon:"🏦", label:"Bank Application" },
    ]},
    { section: "Account", items: [
      { key:"profile",          icon:"👤", label:"Profile & Settings" },
      { key:"empty-states",     icon:"ℹ️",  label:"Help & Support" },
    ]},
  ],
  builder: [
    { section: "Main", items: [
      { key:"builder-dashboard",icon:"🏗️", label:"Dashboard" },
      { key:"search",           icon:"🔍", label:"Browse Projects" },
      { key:"quote-builder",    icon:"📐", label:"Quote Builder", badge:"2" },
    ]},
    { section: "My Work", items: [
      { key:"project-detail",   icon:"📋", label:"Active Jobs", badge:"3" },
    ]},
    { section: "Account", items: [
      { key:"profile",          icon:"👤", label:"Profile & Company" },
    ]},
  ],
  admin: [
    { section: "Overview", items: [
      { key:"admin-dashboard",  icon:"🛡️",  label:"Admin Console" },
    ]},
    { section: "Management", items: [
      { key:"search",           icon:"🔍", label:"Search" },
      { key:"project-detail",   icon:"📋", label:"Projects" },
      { key:"profile",          icon:"👤", label:"Users" },
    ]},
    { section: "System", items: [
      { key:"empty-states",     icon:"⚙️",  label:"System Settings" },
    ]},
  ],
};

const Sidebar = ({ userRole, activeScreen, setScreen }) => {
  const nav = navConfig[userRole] || navConfig.client;
  const userNames = { client:"Thabo Nkosi", builder:"Siyabonga Dlamini", admin:"Admin User" };
  const userRoleLabels = { client:"Client Account", builder:"Verified Builder", admin:"Platform Admin" };
  const avatarBgs = { client:"#1C3557", builder:"#C4622D", admin:"#2A7D4F" };

  return (
    <div className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-mark">🏗️</div>
        <div className="sb-logo-name">Build<em>Quote</em></div>
      </div>

      <div className="sb-nav">
        {nav.map(section => (
          <div key={section.section}>
            <div className="sb-section-label">{section.section}</div>
            {section.items.map(item => (
              <button
                key={item.key}
                className={`sb-item ${activeScreen === item.key ? "active" : ""}`}
                onClick={() => setScreen(item.key)}
              >
                <span className="sb-item-ico">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="sb-badge">{item.badge}</span>}
              </button>
            ))}
            <div className="sb-divider" />
          </div>
        ))}
      </div>

      <div className="sb-user" onClick={() => setScreen("profile")}>
        <Avatar name={userNames[userRole]} bg={avatarBgs[userRole]} size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sb-user-name">{userNames[userRole]}</div>
          <div className="sb-user-role">{userRoleLabels[userRole]}</div>
        </div>
        <span style={{ color:"rgba(255,255,255,0.3)", fontSize:12 }}>⚙</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────
const topbarConfig = {
  "welcome":           { title:"BuildQuote", sub:"Welcome" },
  "client-dashboard":  { title:"Dashboard", sub:"Your building projects at a glance" },
  "builder-dashboard": { title:"Dashboard", sub:"Manage your quotes and active jobs" },
  "admin-dashboard":   { title:"Admin Console", sub:"Platform-wide management" },
  "create-project":    { title:"New Project Request", sub:"Fill in your building requirements" },
  "quote-builder":     { title:"Quote Builder", sub:"Build and submit your quote" },
  "project-detail":    { title:"Project Detail", sub:"BQ-2024-003 — Waterkloof New Build" },
  "search":            { title:"Search", sub:"Browse projects and builders" },
  "profile":           { title:"Profile & Settings", sub:"Manage your account" },
  "bank-submission":   { title:"Bank Application", sub:"Submit to FNB Home Loans" },
  "empty-states":      { title:"States Reference", sub:"Empty, error & loading" },
};

const Topbar = ({ screen, userRole, setScreen, onLogout }) => {
  const cfg = topbarConfig[screen] || { title: screen, sub:"" };
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{cfg.title}</div>
        {cfg.sub && <div className="topbar-sub">{cfg.sub}</div>}
      </div>
      <div className="topbar-actions">
        <button className="btn btn-ico" title="Notifications">
          <span style={{ position:"relative" }}>
            🔔
            <span style={{ position:"absolute", top:-2, right:-2, width:8, height:8, background:"var(--brand-accent)", borderRadius:"50%", border:"1.5px solid white" }} />
          </span>
        </button>
        <button className="btn btn-ico" title="Help">❓</button>
        <button className="btn btn-secondary btn-sm" onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DEMO NAV BAR — allows jumping between all screens
// ─────────────────────────────────────────────────────────────────────────────
const DemoNav = ({ screen, setScreen, userRole, setRole }) => {
  const allScreens = [
    { key:"welcome",           label:"① Welcome",       group:"auth" },
    { key:"client-dashboard",  label:"② Client Dash",   group:"client" },
    { key:"create-project",    label:"③ New Project",   group:"client" },
    { key:"builder-dashboard", label:"④ Builder Dash",  group:"builder" },
    { key:"quote-builder",     label:"⑤ Quote Builder", group:"builder" },
    { key:"project-detail",    label:"⑥ Detail View",   group:"shared" },
    { key:"admin-dashboard",   label:"⑦ Admin",         group:"admin" },
    { key:"search",            label:"⑧ Search",        group:"shared" },
    { key:"bank-submission",   label:"⑨ Bank Submit",   group:"shared" },
    { key:"profile",           label:"⑩ Profile",       group:"shared" },
    { key:"empty-states",      label:"⑪ States",        group:"shared" },
  ];
  return (
    <div className="demo-nav">
      <span className="demo-label">Screen Preview</span>
      {allScreens.map(s => (
        <button key={s.key} className={`demo-btn ${screen===s.key?"active":""}`} onClick={() => {
          if (s.group==="client")  setRole("client");
          if (s.group==="builder") setRole("builder");
          if (s.group==="admin")   setRole("admin");
          setScreen(s.key);
        }}>{s.label}</button>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function BuildQuotePlatform() {
  const [screen, setScreen]     = useState("welcome");
  const [userRole, setUserRole] = useState("client"); // client | builder | admin

  const handleEnter = (role) => {
    setUserRole(role);
    if (role === "client")  setScreen("client-dashboard");
    if (role === "builder") setScreen("builder-dashboard");
    if (role === "admin")   setScreen("admin-dashboard");
  };

  const handleLogout = () => {
    setScreen("welcome");
    setUserRole("client");
  };

  const renderScreen = () => {
    switch (screen) {
      case "welcome":           return <WelcomeScreen onEnter={handleEnter} />;
      case "client-dashboard":  return <ClientDashboard setScreen={setScreen} />;
      case "builder-dashboard": return <BuilderDashboard setScreen={setScreen} />;
      case "admin-dashboard":   return <AdminDashboard setScreen={setScreen} />;
      case "create-project":    return <CreateProjectScreen setScreen={setScreen} />;
      case "quote-builder":     return <QuoteBuilderScreen setScreen={setScreen} />;
      case "project-detail":    return <ProjectDetailScreen setScreen={setScreen} userRole={userRole} />;
      case "search":            return <SearchScreen setScreen={setScreen} userRole={userRole} />;
      case "bank-submission":   return <BankSubmissionScreen setScreen={setScreen} />;
      case "profile":           return <ProfileScreen userRole={userRole} />;
      case "empty-states":      return <EmptyStateScreen setScreen={setScreen} />;
      default:                  return <ClientDashboard setScreen={setScreen} />;
    }
  };

  const isWelcome = screen === "welcome";

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <DemoNav screen={screen} setScreen={setScreen} userRole={userRole} setRole={setUserRole} />

      {isWelcome ? (
        renderScreen()
      ) : (
        <div className="app-shell">
          <Sidebar userRole={userRole} activeScreen={screen} setScreen={setScreen} />
          <div className="main-area">
            <Topbar screen={screen} userRole={userRole} setScreen={setScreen} onLogout={handleLogout} />
            {renderScreen()}
          </div>
        </div>
      )}
    </>
  );
}
