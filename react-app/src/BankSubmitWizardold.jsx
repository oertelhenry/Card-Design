/**
 * BuildQuote — Bank Home Loan Submission Wizard
 * Standalone component: full FNB Home Loan application flow
 * 9-step wizard covering all SA home loan application fields
 */

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --bg-base        : #F6F4F0;
    --bg-elevated    : rgba(255,252,248,0.95);
    --bg-glass       : rgba(255,252,248,0.70);
    --brand-primary  : #1C3557;
    --brand-mid      : #264a75;
    --brand-accent   : #C4622D;
    --brand-accent-lt: rgba(196,98,45,0.10);
    --success        : #2A7D4F;
    --success-bg     : rgba(42,125,79,0.10);
    --warning        : #B45309;
    --warning-bg     : rgba(180,83,9,0.10);
    --error          : #C0392B;
    --error-bg       : rgba(192,57,43,0.10);
    --info-bg        : rgba(28,53,87,0.06);
    --txt-1          : #1A1A1A;
    --txt-2          : #5A5A5A;
    --txt-3          : #9A9A9A;
    --border-sub     : rgba(0,0,0,0.07);
    --border-med     : rgba(0,0,0,0.12);
    --border-str     : rgba(0,0,0,0.20);
    --shadow-xs : 0 1px 2px rgba(0,0,0,0.05);
    --shadow-sm : 0 2px 6px rgba(0,0,0,0.07),0 1px 2px rgba(0,0,0,0.04);
    --shadow-md : 0 6px 20px rgba(0,0,0,0.09),0 2px 6px rgba(0,0,0,0.05);
    --shadow-lg : 0 16px 40px rgba(0,0,0,0.11),0 4px 10px rgba(0,0,0,0.06);
    --r-sm  : 8px; --r-md : 12px; --r-lg : 16px; --r-xl : 22px; --r-full: 9999px;
    --font-d : 'DM Serif Display', Georgia, serif;
    --font-b : 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-m : 'JetBrains Mono', 'Courier New', monospace;
    --ease-out   : cubic-bezier(0.16,1,0.3,1);
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --dur-fast : 140ms; --dur-norm : 240ms; --dur-slow : 380ms;
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:var(--font-b); background:var(--bg-base); color:var(--txt-1); -webkit-font-smoothing:antialiased; line-height:1.5; }
  button { font-family:inherit; cursor:pointer; border:none; background:none; }
  input, textarea, select { font-family:inherit; }

  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes pop     { 0%{transform:scale(0.85);opacity:0} 80%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.45} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.14); border-radius:3px; }

  /* ── Wizard Shell ── */
  .wiz-shell {
    min-height:100vh; background:var(--bg-base);
    display:flex; flex-direction:column;
  }
  .wiz-header {
    background:rgba(246,244,240,0.92);
    backdrop-filter:blur(20px) saturate(1.6);
    border-bottom:1px solid var(--border-sub);
    padding:0 40px; height:64px;
    display:flex; align-items:center; gap:16px;
    position:sticky; top:0; z-index:100;
    box-shadow:var(--shadow-xs);
  }
  .wiz-logo { font-family:var(--font-d); font-size:20px; color:var(--brand-primary); }
  .wiz-logo em { color:var(--brand-accent); font-style:normal; }
  .wiz-header-title {
    font-size:13.5px; font-weight:500; color:var(--txt-2);
    border-left:1px solid var(--border-med); padding-left:16px; margin-left:4px;
  }
  .wiz-header-actions { margin-left:auto; display:flex; gap:8px; align-items:center; }

  .wiz-body { display:flex; flex:1; }

  /* ── Progress Rail (left sidebar) ── */
  .wiz-rail {
    width:280px; flex-shrink:0;
    background:white; border-right:1px solid var(--border-sub);
    padding:32px 20px; position:sticky; top:64px;
    height:calc(100vh - 64px); overflow-y:auto;
  }
  .rail-title { font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--txt-3); margin-bottom:20px; padding-left:6px; }
  .rail-step {
    display:flex; align-items:flex-start; gap:14px;
    padding:10px 10px 10px 6px; border-radius:var(--r-md);
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    margin-bottom:2px; position:relative;
  }
  .rail-step:hover:not(.rail-active) { background:rgba(0,0,0,0.03); }
  .rail-step.rail-active { background:var(--info-bg); }
  .rail-step.rail-done .rail-node { background:var(--success); border-color:var(--success); color:white; }
  .rail-step.rail-active .rail-node { background:var(--brand-primary); border-color:var(--brand-primary); color:white; box-shadow:0 0 0 3px rgba(28,53,87,0.15); }
  .rail-node {
    width:26px; height:26px; border-radius:50%; flex-shrink:0;
    border:2px solid var(--border-med); background:white;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700; color:var(--txt-3);
    transition:all var(--dur-norm) var(--ease-out);
  }
  .rail-info { flex:1; min-width:0; }
  .rail-step-name { font-size:12.5px; font-weight:500; color:var(--txt-2); line-height:1.3; }
  .rail-step.rail-active .rail-step-name { color:var(--brand-primary); font-weight:600; }
  .rail-step.rail-done .rail-step-name { color:var(--success); }
  .rail-step-sub { font-size:11px; color:var(--txt-3); margin-top:2px; line-height:1.3; }
  .rail-connector {
    width:2px; height:16px; background:var(--border-sub);
    margin-left:18px; border-radius:2px;
    transition:background var(--dur-norm);
  }
  .rail-connector.done { background:var(--success); opacity:0.4; }

  /* ── Main Content ── */
  .wiz-main { flex:1; padding:40px 48px; max-width:900px; }
  .wiz-step-header { margin-bottom:32px; animation:slideUp var(--dur-slow) var(--ease-out); }
  .wiz-step-eyebrow { font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--brand-accent); margin-bottom:8px; }
  .wiz-step-title { font-family:var(--font-d); font-size:28px; line-height:1.15; color:var(--txt-1); margin-bottom:8px; }
  .wiz-step-desc { font-size:13.5px; color:var(--txt-2); line-height:1.6; max-width:600px; }

  /* ── Section Dividers ── */
  .sec-divider {
    display:flex; align-items:center; gap:12px;
    margin:28px 0 20px;
  }
  .sec-divider-label { font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--txt-3); white-space:nowrap; }
  .sec-divider-line { flex:1; height:1px; background:var(--border-sub); }

  /* ── Cards ── */
  .card {
    background:white; border-radius:var(--r-lg);
    border:1px solid var(--border-sub); box-shadow:var(--shadow-sm); overflow:hidden;
  }
  .card-head { padding:18px 22px; border-bottom:1px solid var(--border-sub); display:flex; align-items:center; gap:10px; }
  .card-body { padding:22px; }

  /* ── Typography ── */
  .h-2   { font-size:21px; font-weight:600; letter-spacing:-0.2px; }
  .h-3   { font-size:16px; font-weight:600; letter-spacing:-0.1px; }
  .h-4   { font-size:14px; font-weight:600; }
  .body  { font-size:13.5px; line-height:1.55; }
  .caption { font-size:12px; line-height:1.45; }
  .micro { font-size:10.5px; line-height:1.35; }
  .fw-5 { font-weight:500; } .fw-6 { font-weight:600; } .fw-7 { font-weight:700; }
  .c-1 { color:var(--txt-1); } .c-2 { color:var(--txt-2); } .c-3 { color:var(--txt-3); }
  .c-success { color:var(--success); } .c-warning { color:var(--warning); } .c-error { color:var(--error); } .c-accent { color:var(--brand-accent); }
  .text-center { text-align:center; }

  /* ── Buttons ── */
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; font-family:var(--font-b); font-weight:500; cursor:pointer; transition:all var(--dur-fast) var(--ease-out); white-space:nowrap; border:none; position:relative; }
  .btn:disabled { opacity:0.45; cursor:not-allowed; pointer-events:none; }
  .btn-primary { background:var(--brand-primary); color:white; padding:10px 22px; border-radius:var(--r-md); font-size:13.5px; box-shadow:0 2px 8px rgba(28,53,87,0.25); }
  .btn-primary:hover { background:var(--brand-mid); box-shadow:0 4px 16px rgba(28,53,87,0.30); transform:translateY(-1px); }
  .btn-accent { background:var(--brand-accent); color:white; padding:10px 22px; border-radius:var(--r-md); font-size:13.5px; box-shadow:0 2px 8px rgba(196,98,45,0.30); }
  .btn-accent:hover { background:#B5581F; transform:translateY(-1px); }
  .btn-secondary { background:white; color:var(--txt-1); padding:9px 18px; border-radius:var(--r-md); font-size:13.5px; border:1px solid var(--border-med); box-shadow:var(--shadow-xs); }
  .btn-secondary:hover { background:#f8f7f5; border-color:var(--border-str); transform:translateY(-1px); }
  .btn-ghost { background:transparent; color:var(--txt-2); padding:8px 14px; border-radius:var(--r-md); font-size:13.5px; }
  .btn-ghost:hover { background:rgba(0,0,0,0.05); color:var(--txt-1); }
  .btn-sm  { padding:5px 12px; font-size:12px; border-radius:var(--r-sm); }
  .btn-lg  { padding:13px 28px; font-size:15px; border-radius:var(--r-lg); }
  .w-full  { width:100%; }

  /* ── Forms ── */
  .form-row  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .form-row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
  .f-group   { margin-bottom:18px; }
  .f-label   { display:block; font-size:12.5px; font-weight:500; color:var(--txt-1); margin-bottom:6px; }
  .f-label .req { color:var(--brand-accent); margin-left:2px; }
  .f-hint    { font-size:11.5px; color:var(--txt-3); margin-top:5px; line-height:1.4; }

  .inp {
    width:100%; padding:9px 13px;
    background:white; border:1.5px solid var(--border-med);
    border-radius:var(--r-md); font-size:13.5px; color:var(--txt-1);
    transition:all var(--dur-fast) var(--ease-out); outline:none;
  }
  .inp::placeholder { color:var(--txt-3); }
  .inp:focus { border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }
  textarea.inp { resize:vertical; min-height:80px; line-height:1.55; }
  select.inp {
    appearance:none; cursor:pointer; padding-right:34px;
    background-image:url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5.5 5.5L10 1' stroke='%239A9A9A' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 11px center;
  }
  .inp-prefix-wrap { position:relative; }
  .inp-prefix { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:var(--txt-3); font-size:13px; pointer-events:none; }
  .inp-prefix ~ .inp, .has-prefix { padding-left:32px; }

  /* ── Radio / Check ── */
  .check-group { display:flex; flex-wrap:wrap; gap:8px; }
  .check-pill {
    display:flex; align-items:center; gap:8px;
    padding:7px 14px; border-radius:var(--r-full);
    border:1.5px solid var(--border-med); background:white;
    font-size:12.5px; cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    user-select:none;
  }
  .check-pill:hover { border-color:var(--brand-primary); background:var(--info-bg); }
  .check-pill.selected { border-color:var(--brand-primary); background:var(--info-bg); color:var(--brand-primary); font-weight:500; }
  .check-pill.selected .pill-dot { background:var(--brand-primary); }
  .pill-dot { width:8px; height:8px; border-radius:50%; border:2px solid var(--border-str); transition:all var(--dur-fast); flex-shrink:0; }

  .toggle-row { display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border-sub); }
  .toggle-row:last-child { border-bottom:none; }
  .toggle-switch {
    width:40px; height:22px; border-radius:11px; background:var(--border-med);
    cursor:pointer; position:relative; transition:background var(--dur-fast); flex-shrink:0;
  }
  .toggle-switch.on { background:var(--brand-primary); }
  .toggle-switch::after {
    content:''; position:absolute; width:16px; height:16px; border-radius:50%;
    background:white; top:3px; left:3px;
    box-shadow:var(--shadow-xs); transition:transform var(--dur-fast) var(--ease-out);
  }
  .toggle-switch.on::after { transform:translateX(18px); }

  /* ── Notif Banner ── */
  .notif {
    padding:12px 16px; border-radius:var(--r-md);
    display:flex; align-items:flex-start; gap:10px;
    margin-bottom:20px; font-size:12.5px; line-height:1.5;
  }
  .notif-info    { background:var(--info-bg); border:1px solid rgba(28,53,87,0.12); color:var(--brand-primary); }
  .notif-warning { background:var(--warning-bg); border:1px solid rgba(180,83,9,0.18); color:var(--warning); }
  .notif-success { background:var(--success-bg); border:1px solid rgba(42,125,79,0.18); color:var(--success); }
  .notif-error   { background:var(--error-bg); border:1px solid rgba(192,57,43,0.18); color:var(--error); }
  .notif-ico { font-size:15px; flex-shrink:0; margin-top:1px; }

  /* ── Tags / Badges ── */
  .badge { display:inline-flex; align-items:center; gap:5px; padding:2px 9px; border-radius:var(--r-full); font-size:10.5px; font-weight:700; letter-spacing:0.3px; }
  .badge-info    { background:var(--info-bg); color:var(--brand-primary); }
  .badge-success { background:var(--success-bg); color:var(--success); }
  .badge-warning { background:var(--warning-bg); color:var(--warning); }

  /* ── Progress Bar ── */
  .prog-track { height:4px; background:var(--border-sub); border-radius:2px; overflow:hidden; margin-bottom:28px; }
  .prog-fill  { height:100%; background:var(--brand-primary); border-radius:2px; transition:width 0.4s var(--ease-out); }

  /* ── Wizard Footer ── */
  .wiz-footer {
    background:rgba(246,244,240,0.92);
    backdrop-filter:blur(20px) saturate(1.6);
    border-top:1px solid var(--border-sub);
    padding:16px 48px; display:flex; align-items:center;
    position:sticky; bottom:0; z-index:90;
    box-shadow:0 -4px 20px rgba(0,0,0,0.06);
  }
  .wiz-footer-info { font-size:12px; color:var(--txt-3); }
  .wiz-footer-nav  { margin-left:auto; display:flex; gap:10px; align-items:center; }

  /* ── File Drop Zone ── */
  .drop-zone {
    border:2px dashed var(--border-med); border-radius:var(--r-lg);
    padding:28px 20px; text-align:center; cursor:pointer;
    transition:all var(--dur-fast) var(--ease-out);
    background:rgba(0,0,0,0.01);
  }
  .drop-zone:hover, .drop-zone.dragging { border-color:var(--brand-primary); background:var(--info-bg); }
  .drop-zone-ico { font-size:32px; margin-bottom:10px; }
  .drop-zone-title { font-size:13.5px; font-weight:500; color:var(--txt-1); margin-bottom:4px; }
  .drop-zone-sub   { font-size:12px; color:var(--txt-3); }

  .file-item {
    display:flex; align-items:center; gap:12px;
    padding:10px 14px; border-radius:var(--r-md);
    background:white; border:1px solid var(--border-sub);
    box-shadow:var(--shadow-xs); margin-bottom:8px;
    animation:slideUp var(--dur-fast) var(--ease-out);
  }
  .file-item-ico { font-size:20px; flex-shrink:0; }
  .file-item-name { font-size:12.5px; font-weight:500; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .file-item-size { font-size:11px; color:var(--txt-3); white-space:nowrap; }
  .file-item-remove { color:var(--txt-3); font-size:13px; cursor:pointer; padding:4px; transition:color var(--dur-fast); }
  .file-item-remove:hover { color:var(--error); }

  /* ── Bank Selector ── */
  .bank-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .bank-card {
    padding:18px; border-radius:var(--r-lg); border:2px solid var(--border-med);
    background:white; cursor:pointer; transition:all var(--dur-norm) var(--ease-out);
    position:relative; overflow:hidden;
  }
  .bank-card:hover { border-color:var(--brand-primary); box-shadow:var(--shadow-md); }
  .bank-card.selected { border-color:var(--brand-primary); background:var(--info-bg); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }
  .bank-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--bank-clr, var(--border-med)); transition:background var(--dur-norm); }
  .bank-card.selected::before { background:var(--brand-primary); }
  .bank-logo { font-size:28px; margin-bottom:10px; }
  .bank-name { font-size:14px; font-weight:600; color:var(--txt-1); margin-bottom:3px; }
  .bank-tag  { font-size:11px; color:var(--txt-3); }
  .bank-check { position:absolute; top:14px; right:14px; width:20px; height:20px; border-radius:50%; background:var(--brand-primary); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity var(--dur-fast); }
  .bank-card.selected .bank-check { opacity:1; }

  /* ── Review Table ── */
  .review-section { margin-bottom:24px; }
  .review-row { display:flex; padding:8px 0; border-bottom:1px solid var(--border-sub); font-size:12.5px; }
  .review-row:last-child { border-bottom:none; }
  .review-key   { color:var(--txt-3); width:200px; flex-shrink:0; }
  .review-val   { color:var(--txt-1); font-weight:500; flex:1; }
  .review-edit  { color:var(--brand-accent); font-size:11px; cursor:pointer; padding:0 6px; margin-left:auto; }
  .review-edit:hover { text-decoration:underline; }

  /* ── Sending / Success States ── */
  .send-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; animation:fadeIn var(--dur-slow); }
  .send-spinner { width:56px; height:56px; border:4px solid var(--border-sub); border-top-color:var(--brand-primary); border-radius:50%; animation:spin 0.9s linear infinite; margin-bottom:24px; }
  .send-prog { width:320px; height:5px; background:var(--border-sub); border-radius:3px; overflow:hidden; margin:16px auto 0; }
  .send-prog-fill { height:100%; background:linear-gradient(90deg,var(--brand-primary),var(--brand-accent)); border-radius:3px; animation:sendProg 2.2s var(--ease-out) forwards; }
  @keyframes sendProg { from{width:0} to{width:92%} }

  .success-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; animation:pop 0.5s var(--ease-spring); }
  .success-ring {
    width:88px; height:88px; border-radius:50%;
    background:var(--success-bg); border:3px solid rgba(42,125,79,0.25);
    display:flex; align-items:center; justify-content:center;
    font-size:40px; margin-bottom:24px;
    box-shadow:0 0 0 12px rgba(42,125,79,0.06);
  }
  .ref-box {
    background:white; border:1px solid var(--border-sub);
    border-radius:var(--r-lg); padding:20px 28px;
    box-shadow:var(--shadow-sm); margin:24px 0; min-width:380px;
  }
  .ref-row { display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-sub); }
  .ref-row:last-child { border-bottom:none; }

  /* ── Entity Tab ── */
  .entity-tabs { display:flex; gap:2px; background:rgba(0,0,0,0.05); padding:3px; border-radius:var(--r-md); width:fit-content; margin-bottom:24px; }
  .entity-tab  { padding:6px 18px; border-radius:calc(var(--r-md) - 2px); font-size:12.5px; font-weight:500; color:var(--txt-2); cursor:pointer; transition:all var(--dur-fast) var(--ease-out); border:none; background:none; }
  .entity-tab.active { background:white; color:var(--txt-1); box-shadow:var(--shadow-sm); }

  /* ── Misc ── */
  .flex   { display:flex; } .items-c { align-items:center; } .j-between { justify-content:space-between; }
  .gap-2  { gap:8px; } .gap-3 { gap:12px; } .gap-4 { gap:16px; } .gap-5 { gap:20px; }
  .mb-1   { margin-bottom:4px; } .mb-2 { margin-bottom:8px; } .mb-3 { margin-bottom:12px; }
  .mb-4   { margin-bottom:16px; } .mb-5 { margin-bottom:20px; } .mb-6 { margin-bottom:24px; }
  .mt-2   { margin-top:8px; } .mt-3 { margin-top:12px; } .mt-4 { margin-top:16px; }
  .p-4    { padding:16px; } .p-5 { padding:20px; } .p-6 { padding:24px; }
  .flex-1 { flex:1; } .w-full { width:100%; }
  .opacity-0 { opacity:0; } .opacity-1 { opacity:1; }

  /* ── Applicant Sections ── */
  .applicant-panel { border:1px solid var(--border-sub); border-radius:var(--r-lg); overflow:hidden; margin-bottom:20px; background:white; }
  .applicant-head { padding:14px 20px; background:rgba(28,53,87,0.04); border-bottom:1px solid var(--border-sub); display:flex; align-items:center; gap:10px; }
  .applicant-body { padding:22px; }

  /* ── Applicant Tab Bar ── */
  .apt-bar {
    display:flex; align-items:center; gap:0;
    border-bottom:2px solid var(--border-sub);
    margin-bottom:24px; overflow-x:auto;
    scrollbar-width:none;
  }
  .apt-bar::-webkit-scrollbar { display:none; }
  .apt-tab {
    display:flex; align-items:center; gap:8px;
    padding:10px 18px 11px; font-size:13px; font-weight:500;
    color:var(--txt-3); cursor:pointer; border:none; background:none;
    border-bottom:2px solid transparent; margin-bottom:-2px;
    white-space:nowrap; transition:all var(--dur-fast) var(--ease-out);
    position:relative;
  }
  .apt-tab:hover { color:var(--txt-1); }
  .apt-tab.apt-active {
    color:var(--brand-primary); font-weight:600;
    border-bottom-color:var(--brand-primary);
  }
  .apt-tab-icon { font-size:15px; }
  .apt-tab-close {
    width:16px; height:16px; border-radius:50%;
    background:rgba(0,0,0,0.08); display:flex; align-items:center; justify-content:center;
    font-size:9px; cursor:pointer; transition:all var(--dur-fast);
    margin-left:2px; flex-shrink:0;
  }
  .apt-tab-close:hover { background:var(--error); color:white; }
  .apt-tab-add {
    display:flex; align-items:center; gap:5px;
    padding:8px 14px 10px; font-size:12px; font-weight:600;
    color:var(--brand-accent); cursor:pointer; border:none; background:none;
    border:1.5px dashed rgba(196,98,45,0.35); border-radius:var(--r-sm);
    margin-left:8px; margin-bottom:2px; white-space:nowrap;
    transition:all var(--dur-fast) var(--ease-out);
  }
  .apt-tab-add:hover { border-color:var(--brand-accent); background:var(--brand-accent-lt); }
  .apt-panel { animation:slideUp 0.22s var(--ease-out); }

  /* ── Entity Details Card ── */
  .entity-card {
    background:rgba(28,53,87,0.035); border:1px solid rgba(28,53,87,0.12);
    border-radius:var(--r-lg); padding:20px 22px; margin-bottom:24px;
  }
  .entity-card-head {
    display:flex; align-items:center; gap:10px; margin-bottom:16px;
  }
  .entity-member-row {
    display:grid; grid-template-columns:1fr 1fr auto auto; gap:12px;
    align-items:end; padding:12px 14px;
    background:white; border:1px solid var(--border-sub);
    border-radius:var(--r-md); margin-bottom:8px;
    animation:slideUp 0.18s var(--ease-out);
  }
  .entity-member-remove {
    width:32px; height:32px; border-radius:var(--r-sm);
    background:white; border:1px solid var(--border-med);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; color:var(--txt-3); font-size:13px;
    transition:all var(--dur-fast); flex-shrink:0; margin-bottom:18px;
  }
  .entity-member-remove:hover { border-color:var(--error); color:var(--error); background:var(--error-bg); }
  .entity-member-pct { width:80px; }
  .entity-add-member {
    display:flex; align-items:center; gap:6px;
    padding:8px 16px; border-radius:var(--r-md);
    border:1.5px dashed var(--border-str); background:white;
    color:var(--txt-2); font-size:12.5px; font-weight:500; cursor:pointer;
    transition:all var(--dur-fast); margin-top:4px;
  }
  .entity-add-member:hover { border-color:var(--brand-primary); color:var(--brand-primary); background:var(--info-bg); }

  /* ── Responsive ── */
  @media (max-width:900px) {
    .wiz-rail { display:none; }
    .wiz-main { padding:24px 20px; }
    .form-row, .form-row3, .bank-grid { grid-template-columns:1fr; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const STEPS = [
  { id:"bank",        label:"Bank Selection",     sub:"Choose your lender",           icon:"🏦" },
  { id:"app-type",    label:"Application Type",   sub:"Applicant & loan structure",    icon:"📋" },
  { id:"personal",    label:"Personal Details",   sub:"Applicant & co-applicant",     icon:"👤" },
  { id:"employment",  label:"Employment",         sub:"Income & employer details",    icon:"💼" },
  { id:"financial",   label:"Financial Details",  sub:"Income, expenses & liabilities",icon:"💰" },
  { id:"property",    label:"Property Details",   sub:"Property & loan specifics",    icon:"🏠" },
  { id:"tax",         label:"Tax Declaration",    sub:"SARS & compliance",            icon:"📊" },
  { id:"documents",   label:"Documents",          sub:"Upload supporting docs",       icon:"📎" },
  { id:"review",      label:"Review & Submit",    sub:"Confirm and submit",           icon:"✅" },
];

const BANKS = [
  { id:"fnb",  name:"First National Bank",   short:"FNB",  tag:"Fastest digital turnaround",       logo:"🟠", clr:"#f26722" },
  { id:"absa", name:"Absa Home Loans",        short:"ABSA", tag:"Largest residential lender in SA", logo:"🔴", clr:"#dc1e3c" },
  { id:"std",  name:"Standard Bank",          short:"STDB", tag:"Competitive rates, strong network",logo:"🔵", clr:"#0033a0" },
  { id:"ned",  name:"Nedbank Home Loans",     short:"NED",  tag:"Good for self-build & construction",logo:"🟢",clr:"#007a3e" },
];

const SA_PROVINCES = ["Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo","Mpumalanga","Northern Cape","North West","Western Cape"];
const TITLES = ["Mr","Mrs","Miss","Ms","Dr","Prof"];
const MARITAL_TYPES = ["Single","Married (ANC with Accrual)","Married (ANC without Accrual)","Married (COP)","Married (Traditional)","Divorced","Widowed"];
const EMP_STATUS = ["Permanently Employed","Temporarily Employed","Contract","Self-Employed","Other"];
const EMP_SECTORS = ["Private Sector","Government / Public Sector","Parastatals","Mining","Financial Services","Healthcare","Education","Retail","Construction","Other"];
const ACCOUNT_TYPES = ["Cheque / Current","Savings","Transmission"];
const PROPERTY_TYPES = ["Freehold (Full Title)","Sectional Title","Small Holding","Vacant Land"];
const PROP_RIGHTS = ["Full Title (Freehold)","Leasehold (Cession)"];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL UTILITY COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Notif = ({ type="info", icon, children }) => (
  <div className={`notif notif-${type}`}>
    {icon && <span className="notif-ico">{icon}</span>}
    <div>{children}</div>
  </div>
);

const Field = ({ label, required, hint, children }) => (
  <div className="f-group">
    {label && <label className="f-label">{label}{required && <span className="req"> *</span>}</label>}
    {children}
    {hint && <div className="f-hint">{hint}</div>}
  </div>
);

const Inp = ({ ...props }) => <input className="inp" {...props} />;
const Sel = ({ children, ...props }) => <select className="inp" {...props}>{children}</select>;

const SectionDivider = ({ label }) => (
  <div className="sec-divider">
    <span className="sec-divider-label">{label}</span>
    <div className="sec-divider-line" />
  </div>
);

const Pills = ({ options, value, onChange, multi }) => (
  <div className="check-group">
    {options.map(opt => {
      const v = typeof opt === "string" ? opt : opt.value;
      const l = typeof opt === "string" ? opt : opt.label;
      const sel = multi ? (value||[]).includes(v) : value === v;
      return (
        <div key={v} className={`check-pill${sel?" selected":""}`}
          onClick={() => {
            if (multi) {
              const cur = value || [];
              onChange(sel ? cur.filter(x=>x!==v) : [...cur, v]);
            } else onChange(v);
          }}>
          <div className="pill-dot" />
          {l}
        </div>
      );
    })}
  </div>
);

const Toggle = ({ label, desc, value, onChange }) => (
  <div className="toggle-row">
    <div>
      <div className="caption fw-5">{label}</div>
      {desc && <div className="micro c-3 mt-2">{desc}</div>}
    </div>
    <div className={`toggle-switch${value?" on":""}`} onClick={() => onChange(!value)} />
  </div>
);

// Address block reusable
const AddressBlock = ({ prefix, data, onChange }) => {
  const f = (field) => `${prefix}_${field}`;
  return (
    <>
      <Field label="Street Address" required>
        <Inp placeholder="12 Acacia Avenue" value={data[f("street")]||""} onChange={e=>onChange(f("street"),e.target.value)} />
      </Field>
      <div className="form-row">
        <Field label="Suburb">
          <Inp placeholder="Sandton" value={data[f("suburb")]||""} onChange={e=>onChange(f("suburb"),e.target.value)} />
        </Field>
        <Field label="City / Town" required>
          <Inp placeholder="Johannesburg" value={data[f("city")]||""} onChange={e=>onChange(f("city"),e.target.value)} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Province" required>
          <Sel value={data[f("province")]||""} onChange={e=>onChange(f("province"),e.target.value)}>
            <option value="">Select province…</option>
            {SA_PROVINCES.map(p=><option key={p}>{p}</option>)}
          </Sel>
        </Field>
        <Field label="Postal Code" required>
          <Inp placeholder="2196" maxLength={4} value={data[f("postal")]||""} onChange={e=>onChange(f("postal"),e.target.value)} />
        </Field>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// APPLICANT PERSONAL PANEL
// ─────────────────────────────────────────────────────────────────────────────
const ApplicantPersonal = ({ title, role, data, onChange }) => {
  const f = k => `${role}_${k}`;
  return (
    <div className="applicant-panel">
      <div className="applicant-head">
        <span style={{fontSize:18}}>{role==="applicant"?"👤":"👥"}</span>
        <span className="h-4">{title}</span>
        <span className="badge badge-info" style={{marginLeft:"auto"}}>{role==="applicant"?"Primary":"Co-Applicant / Spouse"}</span>
      </div>
      <div className="applicant-body">
        <SectionDivider label="Identity & Demographics" />
        <div className="form-row3">
          <Field label="Title" required>
            <Sel value={data[f("title")]||""} onChange={e=>onChange(f("title"),e.target.value)}>
              <option value="">Select…</option>
              {TITLES.map(t=><option key={t}>{t}</option>)}
            </Sel>
          </Field>
          <Field label="First Name(s)" required>
            <Inp placeholder="As per ID" value={data[f("firstName")]||""} onChange={e=>onChange(f("firstName"),e.target.value)} />
          </Field>
          <Field label="Surname" required>
            <Inp value={data[f("surname")]||""} onChange={e=>onChange(f("surname"),e.target.value)} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="SA ID / Passport Number" required>
            <Inp placeholder="13-digit ID or passport" value={data[f("idNumber")]||""} onChange={e=>onChange(f("idNumber"),e.target.value)} />
          </Field>
          <Field label="Date of Birth" required>
            <Inp type="date" value={data[f("dob")]||""} onChange={e=>onChange(f("dob"),e.target.value)} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Country of Birth">
            <Inp placeholder="South Africa" value={data[f("countryBirth")]||""} onChange={e=>onChange(f("countryBirth"),e.target.value)} />
          </Field>
          <Field label="City of Birth">
            <Inp value={data[f("cityBirth")]||""} onChange={e=>onChange(f("cityBirth"),e.target.value)} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Race" hint="As defined for FICA / NCA compliance">
            <Sel value={data[f("race")]||""} onChange={e=>onChange(f("race"),e.target.value)}>
              <option value="">Select…</option>
              {["African","Asian","Coloured","White"].map(r=><option key={r}>{r}</option>)}
            </Sel>
          </Field>
          <Field label="SA Citizen?">
            <Pills options={["Yes","No"]} value={data[f("saCitizen")]||""} onChange={v=>onChange(f("saCitizen"),v)} />
          </Field>
        </div>
        {data[f("saCitizen")]==="No" && (
          <div className="form-row">
            <Field label="Nationality">
              <Inp value={data[f("nationality")]||""} onChange={e=>onChange(f("nationality"),e.target.value)} />
            </Field>
            <Field label="Residency Status">
              <Pills options={["Temporary Resident","Permanent Resident"]} value={data[f("residency")]||""} onChange={v=>onChange(f("residency"),v)} />
            </Field>
          </div>
        )}

        <SectionDivider label="Marital Status" />
        <Field label="Marital Status" required>
          <Pills options={MARITAL_TYPES} value={data[f("marital")]||""} onChange={v=>onChange(f("marital"),v)} />
        </Field>
        {data[f("marital")]?.startsWith("Married") && (
          <Field label="Country of Marriage">
            <Inp placeholder="South Africa" value={data[f("countryMarriage")]||""} onChange={e=>onChange(f("countryMarriage"),e.target.value)} />
          </Field>
        )}

        <SectionDivider label="Legal / Credit Status" />
        <div className="form-row">
          <Field label="Ever declared insolvent / sequestrated?">
            <Pills options={["Yes","No"]} value={data[f("insolvent")]||""} onChange={v=>onChange(f("insolvent"),v)} />
          </Field>
          <Field label="First-time home buyer?">
            <Pills options={["Yes","No"]} value={data[f("firstTimeBuyer")]||""} onChange={v=>onChange(f("firstTimeBuyer"),v)} />
          </Field>
        </div>
        {data[f("insolvent")]==="Yes" && (
          <div className="form-row">
            <Field label="Date of Insolvency">
              <Inp type="date" value={data[f("insolventDate")]||""} onChange={e=>onChange(f("insolventDate"),e.target.value)} />
            </Field>
            <Field label="Rehabilitated?">
              <Pills options={["Yes","No"]} value={data[f("rehabilitated")]||""} onChange={v=>onChange(f("rehabilitated"),v)} />
            </Field>
          </div>
        )}

        <SectionDivider label="Contact Details" />
        <div className="form-row">
          <Field label="Email Address" required>
            <Inp type="email" placeholder="name@email.co.za" value={data[f("email")]||""} onChange={e=>onChange(f("email"),e.target.value)} />
          </Field>
          <Field label="Cellphone Number" required>
            <Inp placeholder="082 000 0000" value={data[f("cell")]||""} onChange={e=>onChange(f("cell"),e.target.value)} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Telephone (Home)">
            <Inp placeholder="011 000 0000" value={data[f("telHome")]||""} onChange={e=>onChange(f("telHome"),e.target.value)} />
          </Field>
          <Field label="Telephone (Work)">
            <Inp placeholder="011 000 0000" value={data[f("telWork")]||""} onChange={e=>onChange(f("telWork"),e.target.value)} />
          </Field>
        </div>

        <SectionDivider label="Physical Address (Current)" />
        <AddressBlock prefix={`${role}_phys`} data={data} onChange={onChange} />

        <SectionDivider label="Postal Address" />
        <Toggle label="Same as physical address" value={data[f("postalSame")]||false} onChange={v=>onChange(f("postalSame"),v)} />
        {!data[f("postalSame")] && <AddressBlock prefix={`${role}_post`} data={data} onChange={onChange} />}
      </div>
    </div>
  );
};

// Inner body used in tabs — no panel wrapper
const ApplicantPersonalInner = ({ role, data, onChange }) => {
  const f = k => `${role}_${k}`;
  return (
    <>
      <SectionDivider label="Identity & Demographics" />
      <div className="form-row3">
        <Field label="Title" required>
          <Sel value={data[f("title")]||""} onChange={e=>onChange(f("title"),e.target.value)}>
            <option value="">Select…</option>
            {TITLES.map(t=><option key={t}>{t}</option>)}
          </Sel>
        </Field>
        <Field label="First Name(s)" required>
          <Inp placeholder="As per ID" value={data[f("firstName")]||""} onChange={e=>onChange(f("firstName"),e.target.value)} />
        </Field>
        <Field label="Surname" required>
          <Inp value={data[f("surname")]||""} onChange={e=>onChange(f("surname"),e.target.value)} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="SA ID / Passport Number" required>
          <Inp placeholder="13-digit ID or passport" value={data[f("idNumber")]||""} onChange={e=>onChange(f("idNumber"),e.target.value)} />
        </Field>
        <Field label="Date of Birth" required>
          <Inp type="date" value={data[f("dob")]||""} onChange={e=>onChange(f("dob"),e.target.value)} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Country of Birth">
          <Inp placeholder="South Africa" value={data[f("countryBirth")]||""} onChange={e=>onChange(f("countryBirth"),e.target.value)} />
        </Field>
        <Field label="City of Birth">
          <Inp value={data[f("cityBirth")]||""} onChange={e=>onChange(f("cityBirth"),e.target.value)} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Race" hint="As defined for FICA / NCA compliance">
          <Sel value={data[f("race")]||""} onChange={e=>onChange(f("race"),e.target.value)}>
            <option value="">Select…</option>
            {["African","Asian","Coloured","White"].map(r=><option key={r}>{r}</option>)}
          </Sel>
        </Field>
        <Field label="SA Citizen?">
          <Pills options={["Yes","No"]} value={data[f("saCitizen")]||""} onChange={v=>onChange(f("saCitizen"),v)} />
        </Field>
      </div>
      {data[f("saCitizen")]==="No" && (
        <div className="form-row">
          <Field label="Nationality">
            <Inp value={data[f("nationality")]||""} onChange={e=>onChange(f("nationality"),e.target.value)} />
          </Field>
          <Field label="Residency Status">
            <Pills options={["Temporary Resident","Permanent Resident"]} value={data[f("residency")]||""} onChange={v=>onChange(f("residency"),v)} />
          </Field>
        </div>
      )}
      <SectionDivider label="Marital Status" />
      <Field label="Marital Status" required>
        <Pills options={MARITAL_TYPES} value={data[f("marital")]||""} onChange={v=>onChange(f("marital"),v)} />
      </Field>
      {data[f("marital")]?.startsWith("Married") && (
        <Field label="Country of Marriage">
          <Inp placeholder="South Africa" value={data[f("countryMarriage")]||""} onChange={e=>onChange(f("countryMarriage"),e.target.value)} />
        </Field>
      )}
      <SectionDivider label="Legal / Credit Status" />
      <div className="form-row">
        <Field label="Ever declared insolvent / sequestrated?">
          <Pills options={["Yes","No"]} value={data[f("insolvent")]||""} onChange={v=>onChange(f("insolvent"),v)} />
        </Field>
        <Field label="First-time home buyer?">
          <Pills options={["Yes","No"]} value={data[f("firstTimeBuyer")]||""} onChange={v=>onChange(f("firstTimeBuyer"),v)} />
        </Field>
      </div>
      {data[f("insolvent")]==="Yes" && (
        <div className="form-row">
          <Field label="Date of Insolvency">
            <Inp type="date" value={data[f("insolventDate")]||""} onChange={e=>onChange(f("insolventDate"),e.target.value)} />
          </Field>
          <Field label="Rehabilitated?">
            <Pills options={["Yes","No"]} value={data[f("rehabilitated")]||""} onChange={v=>onChange(f("rehabilitated"),v)} />
          </Field>
        </div>
      )}
      <SectionDivider label="Contact Details" />
      <div className="form-row">
        <Field label="Email Address" required>
          <Inp type="email" placeholder="name@email.co.za" value={data[f("email")]||""} onChange={e=>onChange(f("email"),e.target.value)} />
        </Field>
        <Field label="Cellphone Number" required>
          <Inp placeholder="082 000 0000" value={data[f("cell")]||""} onChange={e=>onChange(f("cell"),e.target.value)} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Telephone (Home)">
          <Inp placeholder="011 000 0000" value={data[f("telHome")]||""} onChange={e=>onChange(f("telHome"),e.target.value)} />
        </Field>
        <Field label="Telephone (Work)">
          <Inp placeholder="011 000 0000" value={data[f("telWork")]||""} onChange={e=>onChange(f("telWork"),e.target.value)} />
        </Field>
      </div>
      <SectionDivider label="Physical Address (Current)" />
      <AddressBlock prefix={`${role}_phys`} data={data} onChange={onChange} />
      <SectionDivider label="Postal Address" />
      <Toggle label="Same as physical address" value={data[f("postalSame")]||false} onChange={v=>onChange(f("postalSame"),v)} />
      {!data[f("postalSame")] && <AddressBlock prefix={`${role}_post`} data={data} onChange={onChange} />}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EMPLOYMENT INNER (body only, for tabs)
// ─────────────────────────────────────────────────────────────────────────────
const EmploymentInner = ({ role, data, onChange }) => {
  const f = k => `${role}_${k}`;
  const isSelfEmp = data[f("empStatus")] === "Self-Employed";
  return (
    <>
      <Field label="Employment Status" required>
        <Pills options={EMP_STATUS} value={data[f("empStatus")]||""} onChange={v=>onChange(f("empStatus"),v)} />
      </Field>
      {!isSelfEmp && (
        <>
          <div className="form-row">
            <Field label="Occupation" required>
              <Inp value={data[f("occupation")]||""} onChange={e=>onChange(f("occupation"),e.target.value)} />
            </Field>
            <Field label="Employment Sector">
              <Sel value={data[f("sector")]||""} onChange={e=>onChange(f("sector"),e.target.value)}>
                <option value="">Select…</option>
                {EMP_SECTORS.map(s=><option key={s}>{s}</option>)}
              </Sel>
            </Field>
          </div>
          <div className="form-row">
            <Field label="Employer Name" required>
              <Inp value={data[f("employerName")]||""} onChange={e=>onChange(f("employerName"),e.target.value)} />
            </Field>
            <Field label="Employer Telephone">
              <Inp placeholder="011 000 0000" value={data[f("employerTel")]||""} onChange={e=>onChange(f("employerTel"),e.target.value)} />
            </Field>
          </div>
          <Field label="Employer Address (Street)">
            <Inp value={data[f("employerStreet")]||""} onChange={e=>onChange(f("employerStreet"),e.target.value)} />
          </Field>
          <div className="form-row">
            <Field label="Length of Current Employment" hint="In months">
              <Inp type="number" min="0" placeholder="e.g. 36" value={data[f("lengthService")]||""} onChange={e=>onChange(f("lengthService"),e.target.value)} />
            </Field>
            <Field label="Previous Employer (if < 24 months)">
              <Inp value={data[f("prevEmployer")]||""} onChange={e=>onChange(f("prevEmployer"),e.target.value)} />
            </Field>
          </div>
        </>
      )}
      {isSelfEmp && (
        <div className="form-row">
          <Field label="Business Name">
            <Inp value={data[f("bizName")]||""} onChange={e=>onChange(f("bizName"),e.target.value)} />
          </Field>
          <Field label="Period in Own Business" hint="In months">
            <Inp type="number" min="0" placeholder="e.g. 48" value={data[f("bizMonths")]||""} onChange={e=>onChange(f("bizMonths"),e.target.value)} />
          </Field>
        </div>
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EMPLOYMENT PANEL
// ─────────────────────────────────────────────────────────────────────────────
const EmploymentPanel = ({ title, role, data, onChange }) => {
  const f = k => `${role}_${k}`;
  const isSelfEmp = data[f("empStatus")] === "Self-Employed";
  return (
    <div className="applicant-panel">
      <div className="applicant-head">
        <span style={{fontSize:18}}>{role==="applicant"?"👤":"👥"}</span>
        <span className="h-4">{title}</span>
      </div>
      <div className="applicant-body">
        <Field label="Employment Status" required>
          <Pills options={EMP_STATUS} value={data[f("empStatus")]||""} onChange={v=>onChange(f("empStatus"),v)} />
        </Field>
        {!isSelfEmp && (
          <>
            <div className="form-row">
              <Field label="Occupation" required>
                <Inp value={data[f("occupation")]||""} onChange={e=>onChange(f("occupation"),e.target.value)} />
              </Field>
              <Field label="Employment Sector">
                <Sel value={data[f("sector")]||""} onChange={e=>onChange(f("sector"),e.target.value)}>
                  <option value="">Select…</option>
                  {EMP_SECTORS.map(s=><option key={s}>{s}</option>)}
                </Sel>
              </Field>
            </div>
            <div className="form-row">
              <Field label="Employer Name" required>
                <Inp value={data[f("employerName")]||""} onChange={e=>onChange(f("employerName"),e.target.value)} />
              </Field>
              <Field label="Employer Telephone">
                <Inp placeholder="011 000 0000" value={data[f("employerTel")]||""} onChange={e=>onChange(f("employerTel"),e.target.value)} />
              </Field>
            </div>
            <Field label="Employer Address (Street)">
              <Inp value={data[f("employerStreet")]||""} onChange={e=>onChange(f("employerStreet"),e.target.value)} />
            </Field>
            <div className="form-row">
              <Field label="Length of Current Employment" hint="In months">
                <Inp type="number" min="0" placeholder="e.g. 36" value={data[f("lengthService")]||""} onChange={e=>onChange(f("lengthService"),e.target.value)} />
              </Field>
              <Field label="Previous Employer (if < 24 months)">
                <Inp value={data[f("prevEmployer")]||""} onChange={e=>onChange(f("prevEmployer"),e.target.value)} />
              </Field>
            </div>
          </>
        )}
        {isSelfEmp && (
          <div className="form-row">
            <Field label="Business Name">
              <Inp value={data[f("bizName")]||""} onChange={e=>onChange(f("bizName"),e.target.value)} />
            </Field>
            <Field label="Period in Own Business" hint="In months">
              <Inp type="number" min="0" placeholder="e.g. 48" value={data[f("bizMonths")]||""} onChange={e=>onChange(f("bizMonths"),e.target.value)} />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FILE UPLOADER
// ─────────────────────────────────────────────────────────────────────────────
const FileUploader = ({ label, hint, docKey, files, onAdd, onRemove }) => {
  const inp = useRef();
  const [dragging, setDragging] = useState(false);
  const myFiles = files[docKey] || [];

  const handleFiles = (fileList) => {
    Array.from(fileList).forEach(f => {
      onAdd(docKey, { name:f.name, size:f.size, type:f.type, id:Date.now()+Math.random() });
    });
  };

  return (
    <div className="f-group">
      {label && <label className="f-label">{label}</label>}
      {hint && <div className="f-hint mb-3">{hint}</div>}
      <div
        className={`drop-zone${dragging?" dragging":""}`}
        onDragOver={e=>{e.preventDefault();setDragging(true);}}
        onDragLeave={()=>setDragging(false)}
        onDrop={e=>{e.preventDefault();setDragging(false);handleFiles(e.dataTransfer.files);}}
        onClick={()=>inp.current.click()}
      >
        <div className="drop-zone-ico">📎</div>
        <div className="drop-zone-title">Drop files here or click to browse</div>
        <div className="drop-zone-sub">PDF, JPG, PNG • Max 10MB per file</div>
        <input ref={inp} type="file" multiple style={{display:"none"}} onChange={e=>handleFiles(e.target.files)} />
      </div>
      {myFiles.map(f => (
        <div key={f.id} className="file-item">
          <span className="file-item-ico">{f.type?.includes("pdf")?"📄":"🖼️"}</span>
          <span className="file-item-name">{f.name}</span>
          <span className="file-item-size">{(f.size/1024).toFixed(0)} KB</span>
          <span className="file-item-remove" onClick={()=>onRemove(docKey,f.id)}>✕</span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// STEP 1 — Bank Selection
const StepBank = ({ data, onChange }) => (
  <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
    <Notif type="info" icon="🔒">
      Your application will be submitted directly via the bank's official secure API integration. BuildQuote never stores your banking credentials or accesses your accounts.
    </Notif>
    <div className="bank-grid">
      {BANKS.map(b => (
        <div key={b.id} className={`bank-card${data.selectedBank===b.id?" selected":""}`}
          style={{"--bank-clr": b.clr}}
          onClick={()=>onChange("selectedBank",b.id)}>
          <div className="bank-check"><span style={{color:"white",fontSize:11}}>✓</span></div>
          <div className="bank-logo">{b.logo}</div>
          <div className="bank-name">{b.name}</div>
          <div className="bank-tag">{b.tag}</div>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <Notif type="warning" icon="⚠️">
        <strong>Note:</strong> You may only submit to one bank at a time through this portal. To approach multiple lenders, submit separate applications from the project page after this one is processed.
      </Notif>
    </div>
  </div>
);

// STEP 2 — Application Type
const StepAppType = ({ data, onChange }) => (
  <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
    <div className="card mb-5">
      <div className="card-head"><span className="h-4">📋 Applicant Structure</span></div>
      <div className="card-body">
        <Field label="Applicant Type" required hint="Select the legal structure of the applicant(s)">
          <Pills options={["Individual","Joint","Multiple Applicants","Close Corporation","Company","Trust"]}
            value={data.applicantType||""} onChange={v=>onChange("applicantType",v)} />
        </Field>
        {(data.applicantType==="Joint"||data.applicantType==="Multiple Applicants") && (
          <Notif type="info" icon="👥">
            You'll be asked to complete details for a co-applicant / spouse in the Personal Details step.
          </Notif>
        )}
        {(data.applicantType==="Company"||data.applicantType==="Close Corporation"||data.applicantType==="Trust") && (
          <Notif type="info" icon="🏢">
            Entity details (registration number, directors/members/trustees) will be captured in the Entity Information section.
          </Notif>
        )}
      </div>
    </div>

    <div className="card mb-5">
      <div className="card-head"><span className="h-4">🏠 Application Type</span></div>
      <div className="card-body">
        <Field label="Loan Purpose" required>
          <Pills options={["New Home Loan","Switch / Conversion"]} value={data.loanPurpose||""} onChange={v=>onChange("loanPurpose",v)} />
        </Field>
        <div className="form-row">
          <Field label="Previous Home Loan with this Bank?">
            <Pills options={["Yes","No"]} value={data.prevLoan||""} onChange={v=>onChange("prevLoan",v)} />
          </Field>
          {data.prevLoan==="Yes" && (
            <Field label="Previous Account Number">
              <Inp value={data.prevLoanAcc||""} onChange={e=>onChange("prevLoanAcc",e.target.value)} />
            </Field>
          )}
        </div>
        <Field label="Reserve Additional Amount for Future Use?">
          <Pills options={["Yes","No"]} value={data.futureUse||""} onChange={v=>onChange("futureUse",v)} />
        </Field>
        {data.futureUse==="Yes" && (
          <Field label="Future Use Amount Required" hint="This amount will be reserved but not drawn immediately">
            <div className="inp-prefix-wrap">
              <span className="inp-prefix">R</span>
              <Inp className="inp has-prefix" placeholder="0.00" value={data.futureUseAmt||""} onChange={e=>onChange("futureUseAmt",e.target.value)} />
            </div>
          </Field>
        )}
      </div>
    </div>

    {data.loanPurpose==="Switch / Conversion" && (
      <div className="card">
        <div className="card-head"><span className="h-4">🔄 Existing Bond Details</span></div>
        <div className="card-body">
          <div className="form-row">
            <Field label="Current Institution Name" required>
              <Inp value={data.existBondInstitution||""} onChange={e=>onChange("existBondInstitution",e.target.value)} />
            </Field>
            <Field label="Account Holder Name">
              <Inp value={data.existBondHolder||""} onChange={e=>onChange("existBondHolder",e.target.value)} />
            </Field>
          </div>
          <div className="form-row">
            <Field label="Bond Account Number">
              <Inp value={data.existBondAcc||""} onChange={e=>onChange("existBondAcc",e.target.value)} />
            </Field>
            <Field label="Registered Bond Amount">
              <div className="inp-prefix-wrap">
                <span className="inp-prefix">R</span>
                <Inp className="inp has-prefix" value={data.existBondAmt||""} onChange={e=>onChange("existBondAmt",e.target.value)} />
              </div>
            </Field>
          </div>
        </div>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: APPLICANT TAB BAR (used across Personal, Employment, Financial, Tax)
// ─────────────────────────────────────────────────────────────────────────────
const ApplicantTabBar = ({ tabs, activeIdx, onSelect, onAdd, onRemove, addLabel, canAdd }) => (
  <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:24}}>
    <div className="apt-bar" style={{flex:1}}>
      {tabs.map((tab, i) => (
        <button key={tab.id} className={`apt-tab${i===activeIdx?" apt-active":""}`} onClick={()=>onSelect(i)}>
          <span className="apt-tab-icon">{tab.icon||"👤"}</span>
          {tab.label}
          {onRemove && i > 0 && tabs.length > 1 && (
            <span className="apt-tab-close" onClick={e=>{e.stopPropagation();onRemove(i);}}>✕</span>
          )}
        </button>
      ))}
    </div>
    {canAdd && onAdd && (
      <button className="apt-tab-add" onClick={onAdd}>
        <span style={{fontSize:16,lineHeight:1}}>+</span> {addLabel||"Add Member"}
      </button>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ENTITY DETAILS BLOCK (CC / Company / Trust) — shown at top of Personal step
// ─────────────────────────────────────────────────────────────────────────────
const EntityDetailsBlock = ({ data, onChange }) => {
  const type = data.applicantType;
  const memberLabel = type==="Trust" ? "Trustee / Beneficiary / Founder" : type==="Close Corporation" ? "Member" : "Director / Shareholder";
  const memberSectionLabel = type==="Trust" ? "Trustees / Beneficiaries / Founders" : type==="Close Corporation" ? "Members & Beneficial Owners" : "Shareholders & Directors";
  const memberCount = data.entityMemberCount || 1;

  const setMemberCount = (n) => onChange("entityMemberCount", n);
  const addMember = () => setMemberCount(memberCount + 1);
  const removeMember = (i) => {
    // Shift subsequent members up
    const newCount = memberCount - 1;
    for (let j = i; j < newCount; j++) {
      onChange(`entityMember${j}_name`, data[`entityMember${j+1}_name`]||"");
      onChange(`entityMember${j}_id`,   data[`entityMember${j+1}_id`]||"");
      onChange(`entityMember${j}_pct`,  data[`entityMember${j+1}_pct`]||"");
    }
    onChange(`entityMember${newCount}_name`,"");
    onChange(`entityMember${newCount}_id`,"");
    onChange(`entityMember${newCount}_pct`,"");
    setMemberCount(newCount);
  };

  return (
    <div className="entity-card" style={{marginBottom:28}}>
      <div className="entity-card-head">
        <span style={{fontSize:20}}>🏢</span>
        <div style={{flex:1}}>
          <div className="h-4">{type} Details</div>
          <div className="micro c-3 mt-2">Registration & entity information</div>
        </div>
        <span className="badge badge-info">{type}</span>
      </div>
      <div className="form-row" style={{marginBottom:16}}>
        <Field label="Registered Name" required>
          <Inp value={data.entityName||""} onChange={e=>onChange("entityName",e.target.value)} />
        </Field>
        <Field label="Registration Number" required>
          <Inp placeholder="YYYY/XXXXXX/XX" value={data.entityRegNo||""} onChange={e=>onChange("entityRegNo",e.target.value)} />
        </Field>
      </div>
      <div className="form-row" style={{marginBottom:20}}>
        <Field label="VAT Number">
          <Inp value={data.entityVat||""} onChange={e=>onChange("entityVat",e.target.value)} />
        </Field>
        <Field label="Business Address">
          <Inp value={data.entityAddress||""} onChange={e=>onChange("entityAddress",e.target.value)} />
        </Field>
      </div>

      <SectionDivider label={memberSectionLabel} />
      <Notif type="info" icon="ℹ️">
        List all {memberLabel.toLowerCase()}s with more than 25% beneficial ownership. At least one is required.
      </Notif>

      {Array.from({length: memberCount}, (_, i) => (
        <div key={i} className="entity-member-row">
          <Field label={`${memberLabel} ${memberCount>1?i+1:""}`} style={{marginBottom:0}}>
            <Inp value={data[`entityMember${i}_name`]||""} onChange={e=>onChange(`entityMember${i}_name`,e.target.value)} placeholder="Full name" />
          </Field>
          <Field label="ID / Passport Number">
            <Inp value={data[`entityMember${i}_id`]||""} onChange={e=>onChange(`entityMember${i}_id`,e.target.value)} placeholder="SA ID or passport" />
          </Field>
          <div className="entity-member-pct">
            <Field label="% Holding">
              <Inp type="number" min="0" max="100" placeholder="0" value={data[`entityMember${i}_pct`]||""} onChange={e=>onChange(`entityMember${i}_pct`,e.target.value)} />
            </Field>
          </div>
          {memberCount > 1 ? (
            <div className="entity-member-remove" onClick={()=>removeMember(i)} title="Remove member">✕</div>
          ) : <div style={{width:32}} />}
        </div>
      ))}

      <button className="entity-add-member" onClick={addMember}>
        <span style={{fontSize:17,lineHeight:1}}>+</span> Add {memberLabel}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: build tab config from applicant type + optional member list
// ─────────────────────────────────────────────────────────────────────────────
const buildApplicantTabs = (applicantType, extraMembers=[]) => {
  const isEntity = ["Company","Close Corporation","Trust"].includes(applicantType);
  const isJointOrMulti = ["Joint","Multiple Applicants"].includes(applicantType);

  if (isEntity) {
    const memberLabel = applicantType==="Trust" ? "Trustee" : applicantType==="Close Corporation" ? "Member" : "Director";
    const base = [{id:"m0", label:`${memberLabel} 1`, icon:"👤", role:"member0"}];
    extraMembers.forEach((_, i) => base.push({id:`m${i+1}`, label:`${memberLabel} ${i+2}`, icon:"👤", role:`member${i+1}`}));
    return base;
  }
  if (isJointOrMulti) {
    return [
      {id:"applicant",   label:"Applicant",   icon:"👤", role:"applicant"},
      {id:"coapplicant", label:"Co-Applicant", icon:"👥", role:"coapplicant"},
    ];
  }
  return [{id:"applicant", label:"Applicant", icon:"👤", role:"applicant"}];
};

// STEP 3 — Personal Details
const StepPersonal = ({ data, onChange }) => {
  const isEntity = ["Company","Close Corporation","Trust"].includes(data.applicantType);
  const isJointOrMulti = ["Joint","Multiple Applicants"].includes(data.applicantType);
  const hasMultiplePeople = isEntity || isJointOrMulti;

  const [activeTab, setActiveTab] = useState(0);
  const [extraMembers, setExtraMembers] = useState([]);

  const tabs = buildApplicantTabs(data.applicantType, extraMembers);
  const canAdd = isEntity; // Only entities can have more than 2

  const addTab = () => {
    setExtraMembers(prev => [...prev, {id: Date.now()}]);
    setTimeout(() => setActiveTab(tabs.length), 0);
  };
  const removeTab = (i) => {
    const newExtra = extraMembers.filter((_,j) => j !== i-1);
    setExtraMembers(newExtra);
    setActiveTab(Math.min(activeTab, tabs.length - 2));
  };

  const activeRole = tabs[activeTab]?.role || "applicant";

  return (
    <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
      {/* Entity registration block always first */}
      {isEntity && <EntityDetailsBlock data={data} onChange={onChange} />}

      {/* Tab bar for multi-person sections */}
      {hasMultiplePeople ? (
        <div className="applicant-panel">
          <div className="applicant-head">
            <span style={{fontSize:18}}>
              {isEntity ? "🏢" : "👥"}
            </span>
            <span className="h-4">
              {isEntity ? "Personal Details — Members / Directors" : "Personal Details — Applicants"}
            </span>
            <span className="badge badge-info" style={{marginLeft:"auto"}}>
              {tabs.length} {tabs.length===1?"person":"people"}
            </span>
          </div>
          <div className="applicant-body">
            <ApplicantTabBar
              tabs={tabs}
              activeIdx={activeTab}
              onSelect={setActiveTab}
              onAdd={canAdd ? addTab : null}
              onRemove={canAdd ? removeTab : null}
              addLabel={isEntity ? (data.applicantType==="Trust"?"Add Trustee":data.applicantType==="Close Corporation"?"Add Member":"Add Director") : null}
              canAdd={canAdd}
            />
            <div className="apt-panel" key={activeRole}>
              <ApplicantPersonalInner role={activeRole} data={data} onChange={onChange} />
            </div>
          </div>
        </div>
      ) : (
        <ApplicantPersonal title="Applicant" role="applicant" data={data} onChange={onChange} />
      )}
    </div>
  );
};

// STEP 4 — Employment
const StepEmployment = ({ data, onChange }) => {
  const isEntity = ["Company","Close Corporation","Trust"].includes(data.applicantType);
  const isJointOrMulti = ["Joint","Multiple Applicants"].includes(data.applicantType);
  const hasMultiple = isEntity || isJointOrMulti;
  const [activeTab, setActiveTab] = useState(0);
  const [extraMembers, setExtraMembers] = useState([]);
  const tabs = buildApplicantTabs(data.applicantType, extraMembers);
  const canAdd = isEntity;
  const addTab = () => { setExtraMembers(prev=>[...prev,{id:Date.now()}]); setTimeout(()=>setActiveTab(tabs.length),0); };
  const removeTab = (i) => { setExtraMembers(prev=>prev.filter((_,j)=>j!==i-1)); setActiveTab(t=>Math.min(t,tabs.length-2)); };
  const activeRole = tabs[activeTab]?.role||"applicant";

  if (!hasMultiple) {
    return (
      <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
        <EmploymentPanel title="Applicant — Employment Details" role="applicant" data={data} onChange={onChange} />
      </div>
    );
  }
  return (
    <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
      <div className="applicant-panel">
        <div className="applicant-head">
          <span style={{fontSize:18}}>{isEntity?"🏢":"👥"}</span>
          <span className="h-4">Employment Details</span>
          <span className="badge badge-info" style={{marginLeft:"auto"}}>{tabs.length} {tabs.length===1?"person":"people"}</span>
        </div>
        <div className="applicant-body">
          <ApplicantTabBar tabs={tabs} activeIdx={activeTab} onSelect={setActiveTab}
            onAdd={canAdd?addTab:null} onRemove={canAdd?removeTab:null}
            addLabel={isEntity?(data.applicantType==="Trust"?"Add Trustee":data.applicantType==="Close Corporation"?"Add Member":"Add Director"):null}
            canAdd={canAdd} />
          <div className="apt-panel" key={activeRole}>
            <EmploymentInner role={activeRole} data={data} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

// STEP 5 — Financial Details
const FinancialInner = ({ role, data, onChange }) => {
  const f = k => `${role}_${k}`;
  return (
    <>
      <SectionDivider label="Income" />
      <div className="form-row">
        <Field label="Gross Income (Cost to Company)" required>
          <div className="inp-prefix-wrap"><span className="inp-prefix">R</span><Inp className="inp has-prefix" placeholder="0.00" value={data[f("incomeGross")]||""} onChange={e=>onChange(f("incomeGross"),e.target.value)} /></div>
        </Field>
        <Field label="Nett Income (Bank Deposit)" required>
          <div className="inp-prefix-wrap"><span className="inp-prefix">R</span><Inp className="inp has-prefix" placeholder="0.00" value={data[f("incomeNett")]||""} onChange={e=>onChange(f("incomeNett"),e.target.value)} /></div>
        </Field>
      </div>
      <div className="form-row">
        <Field label="Commission / Variable Pay">
          <div className="inp-prefix-wrap"><span className="inp-prefix">R</span><Inp className="inp has-prefix" placeholder="0.00" value={data[f("incomeCommission")]||""} onChange={e=>onChange(f("incomeCommission"),e.target.value)} /></div>
        </Field>
        <Field label="Other Income (specify)" hint="Rental, investments, etc.">
          <div className="inp-prefix-wrap"><span className="inp-prefix">R</span><Inp className="inp has-prefix" placeholder="0.00" value={data[f("incomeOther")]||""} onChange={e=>onChange(f("incomeOther"),e.target.value)} /></div>
        </Field>
      </div>

      <SectionDivider label="Banking Details" />
      <div className="form-row">
        <Field label="Bank Name" required>
          <Sel value={data[f("bankName")]||""} onChange={e=>onChange(f("bankName"),e.target.value)}>
            <option value="">Select bank…</option>
            {["FNB","ABSA","Standard Bank","Nedbank","Capitec","Investec","African Bank","TymeBank"].map(b=><option key={b}>{b}</option>)}
          </Sel>
        </Field>
        <Field label="Account Type" required>
          <Sel value={data[f("accType")]||""} onChange={e=>onChange(f("accType"),e.target.value)}>
            <option value="">Select…</option>
            {ACCOUNT_TYPES.map(t=><option key={t}>{t}</option>)}
          </Sel>
        </Field>
      </div>
      <div className="form-row">
        <Field label="Account Number" required>
          <Inp value={data[f("accNumber")]||""} onChange={e=>onChange(f("accNumber"),e.target.value)} />
        </Field>
        <Field label="Branch Code">
          <Inp placeholder="e.g. 250655" value={data[f("branchCode")]||""} onChange={e=>onChange(f("branchCode"),e.target.value)} />
        </Field>
      </div>

      <SectionDivider label="Monthly Debt Obligations" />
      <Notif type="info" icon="ℹ️">Enter your current monthly repayment amounts for all existing credit obligations.</Notif>
      {[
        ["Mortgage Bond / Rent","debtBond"],
        ["Personal Loan","debtPersonal"],
        ["Credit Cards (min repayment)","debtCards"],
        ["Overdraft","debtOverdraft"],
        ["Retail / Store Cards","debtRetail"],
        ["Vehicle Finance (HP/Lease)","debtVehicle"],
        ["Other Revolving Debt","debtOther"],
        ["Obligation as Surety","debtSurety"],
      ].map(([label,key]) => (
        <div key={key} className="form-row" style={{alignItems:"center",marginBottom:12}}>
          <label className="f-label" style={{marginBottom:0}}>{label}</label>
          <div className="inp-prefix-wrap">
            <span className="inp-prefix">R</span>
            <Inp className="inp has-prefix" placeholder="0.00" value={data[f(key)]||""} onChange={e=>onChange(f(key),e.target.value)} />
          </div>
        </div>
      ))}

      <SectionDivider label="Monthly Living Expenses" />
      {[
        ["Water & Lights","expLights"],
        ["Fuel & Vehicle Maintenance","expFuel"],
        ["Telephone & Cellphone","expTel"],
        ["Car & Household Insurance","expInsurance"],
        ["Life Assurance Policies","expLifeAssurance"],
        ["Medical Aid (if not deducted)","expMedical"],
        ["Levy / Rates & Taxes","expLevy"],
        ["Education (school/university)","expEducation"],
        ["Groceries & Housekeeping","expGroceries"],
        ["Child / Spouse Maintenance","expMaintenance"],
        ["General Living Expenses","expGeneral"],
      ].map(([label,key]) => (
        <div key={key} className="form-row" style={{alignItems:"center",marginBottom:12}}>
          <label className="f-label" style={{marginBottom:0}}>{label}</label>
          <div className="inp-prefix-wrap">
            <span className="inp-prefix">R</span>
            <Inp className="inp has-prefix" placeholder="0.00" value={data[f(key)]||""} onChange={e=>onChange(f(key),e.target.value)} />
          </div>
        </div>
      ))}

      <SectionDivider label="Household Information" />
      <div className="form-row">
        <Field label="Number of Adults in Household">
          <Inp type="number" min="1" max="20" value={data[f("hhAdults")]||""} onChange={e=>onChange(f("hhAdults"),e.target.value)} />
        </Field>
        <Field label="Number of Children (dependants)">
          <Inp type="number" min="0" max="20" value={data[f("hhChildren")]||""} onChange={e=>onChange(f("hhChildren"),e.target.value)} />
        </Field>
      </div>
    </>
  );
};

const StepFinancial = ({ data, onChange }) => {
  const isEntity = ["Company","Close Corporation","Trust"].includes(data.applicantType);
  const isJointOrMulti = ["Joint","Multiple Applicants"].includes(data.applicantType);
  const hasMultiple = isEntity || isJointOrMulti;
  const [activeTab, setActiveTab] = useState(0);
  const [extraMembers, setExtraMembers] = useState([]);
  const tabs = buildApplicantTabs(data.applicantType, extraMembers);
  const canAdd = isEntity;
  const addTab = () => { setExtraMembers(prev=>[...prev,{id:Date.now()}]); setTimeout(()=>setActiveTab(tabs.length),0); };
  const removeTab = (i) => { setExtraMembers(prev=>prev.filter((_,j)=>j!==i-1)); setActiveTab(t=>Math.min(t,tabs.length-2)); };
  const activeRole = tabs[activeTab]?.role||"applicant";

  if (!hasMultiple) {
    return (
      <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
        <div className="applicant-panel">
          <div className="applicant-head"><span style={{fontSize:18}}>👤</span><span className="h-4">Applicant — Financial Details</span></div>
          <div className="applicant-body"><FinancialInner role="applicant" data={data} onChange={onChange} /></div>
        </div>
      </div>
    );
  }
  return (
    <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
      <div className="applicant-panel">
        <div className="applicant-head">
          <span style={{fontSize:18}}>{isEntity?"🏢":"👥"}</span>
          <span className="h-4">Financial Details</span>
          <span className="badge badge-info" style={{marginLeft:"auto"}}>{tabs.length} {tabs.length===1?"person":"people"}</span>
        </div>
        <div className="applicant-body">
          <ApplicantTabBar tabs={tabs} activeIdx={activeTab} onSelect={setActiveTab}
            onAdd={canAdd?addTab:null} onRemove={canAdd?removeTab:null}
            addLabel={isEntity?(data.applicantType==="Trust"?"Add Trustee":data.applicantType==="Close Corporation"?"Add Member":"Add Director"):null}
            canAdd={canAdd} />
          <div className="apt-panel" key={activeRole}>
            <FinancialInner role={activeRole} data={data} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

// STEP 6 — Property Details
const StepProperty = ({ data, onChange }) => (
  <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
    <div className="card mb-5">
      <div className="card-head"><span className="h-4">🏠 Loan Requirements</span></div>
      <div className="card-body">
        <div className="form-row">
          <Field label="Total Loan Amount Required" required>
            <div className="inp-prefix-wrap"><span className="inp-prefix">R</span><Inp className="inp has-prefix" placeholder="0.00" value={data.loanAmount||""} onChange={e=>onChange("loanAmount",e.target.value)} /></div>
          </Field>
          <Field label="Loan Term" hint="Maximum 20 years">
            <Sel value={data.loanTerm||""} onChange={e=>onChange("loanTerm",e.target.value)}>
              <option value="">Select term…</option>
              {[5,10,15,20].map(y=><option key={y} value={y}>{y} years</option>)}
            </Sel>
          </Field>
        </div>
        <div className="form-row">
          <Field label="Purchase Price" required>
            <div className="inp-prefix-wrap"><span className="inp-prefix">R</span><Inp className="inp has-prefix" placeholder="0.00" value={data.purchasePrice||""} onChange={e=>onChange("purchasePrice",e.target.value)} /></div>
          </Field>
          <Field label="Property Type" required>
            <Sel value={data.propertyType||""} onChange={e=>onChange("propertyType",e.target.value)}>
              <option value="">Select type…</option>
              {PROPERTY_TYPES.map(t=><option key={t}>{t}</option>)}
            </Sel>
          </Field>
        </div>
        <div className="form-row">
          <Field label="Property Right / Title">
            <Pills options={PROP_RIGHTS} value={data.propertyRight||""} onChange={v=>onChange("propertyRight",v)} />
          </Field>
          <Field label="Primary Residence?">
            <Pills options={["Yes","No"]} value={data.primaryResidence||""} onChange={v=>onChange("primaryResidence",v)} />
          </Field>
        </div>
        <Field label="Will Existing Bond / Rent Fall Away?" hint="On transfer of this property">
          <Pills options={["Yes","No","Not Applicable"]} value={data.existingBondFallAway||""} onChange={v=>onChange("existingBondFallAway",v)} />
        </Field>
      </div>
    </div>

    <div className="card mb-5">
      <div className="card-head"><span className="h-4">📍 Property Location</span></div>
      <div className="card-body">
        <AddressBlock prefix="prop" data={data} onChange={onChange} />
        <div className="form-row3">
          <Field label="Stand / Erf Number">
            <Inp placeholder="e.g. 1234" value={data.propErf||""} onChange={e=>onChange("propErf",e.target.value)} />
          </Field>
          <Field label="Portion Number">
            <Inp placeholder="e.g. 0 (PTN 0)" value={data.propPortion||""} onChange={e=>onChange("propPortion",e.target.value)} />
          </Field>
          <Field label="Unit Number">
            <Inp placeholder="e.g. 14B" value={data.propUnit||""} onChange={e=>onChange("propUnit",e.target.value)} />
          </Field>
        </div>
        {data.propertyType==="Sectional Title" && (
          <Field label="Complex / Development Name">
            <Inp value={data.propComplex||""} onChange={e=>onChange("propComplex",e.target.value)} />
          </Field>
        )}
      </div>
    </div>
  </div>
);

// STEP 7 — Tax Declaration
const TaxInner = ({ role, data, onChange }) => {
  const f = k => `${role}_${k}`;
  return (
    <>
      <Field label="South African Tax Number (SARS)" hint="As per your ITA34 or eFiling profile">
        <Inp placeholder="e.g. 9123456789" value={data[f("taxNo")]||""} onChange={e=>onChange(f("taxNo"),e.target.value)} />
      </Field>
      <Toggle label="Tax obligation outside South Africa?"
        value={data[f("foreignTax")]||false}
        onChange={v=>onChange(f("foreignTax"),v)} />
      {data[f("foreignTax")] && (
        <>
          <div className="form-row mt-3">
            <Field label="Country of Tax Obligation" required>
              <Inp value={data[f("foreignTaxCountry")]||""} onChange={e=>onChange(f("foreignTaxCountry"),e.target.value)} />
            </Field>
            <Field label="Foreign Tax Identification Number">
              <Inp value={data[f("foreignTaxId")]||""} onChange={e=>onChange(f("foreignTaxId"),e.target.value)} />
            </Field>
          </div>
          <Field label="Reason if no foreign TIN issued">
            <Inp placeholder="Reason (if applicable)" value={data[f("foreignTaxReason")]||""} onChange={e=>onChange(f("foreignTaxReason"),e.target.value)} />
          </Field>
        </>
      )}
    </>
  );
};

const StepTax = ({ data, onChange }) => {
  const isEntity = ["Company","Close Corporation","Trust"].includes(data.applicantType);
  const isJointOrMulti = ["Joint","Multiple Applicants"].includes(data.applicantType);
  const hasMultiple = isEntity || isJointOrMulti;
  const [activeTab, setActiveTab] = useState(0);
  const [extraMembers, setExtraMembers] = useState([]);
  const tabs = buildApplicantTabs(data.applicantType, extraMembers);
  const canAdd = isEntity;
  const addTab = () => { setExtraMembers(prev=>[...prev,{id:Date.now()}]); setTimeout(()=>setActiveTab(tabs.length),0); };
  const removeTab = (i) => { setExtraMembers(prev=>prev.filter((_,j)=>j!==i-1)); setActiveTab(t=>Math.min(t,tabs.length-2)); };
  const activeRole = tabs[activeTab]?.role||"applicant";

  return (
    <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
      <Notif type="info" icon="🇿🇦">
        Tax declarations are required under FICA and international FATCA/CRS obligations. All information is transmitted securely and used solely for regulatory compliance.
      </Notif>
      {!hasMultiple ? (
        <div className="applicant-panel mb-4">
          <div className="applicant-head"><span style={{fontSize:18}}>👤</span><span className="h-4">Applicant — Tax Declaration</span></div>
          <div className="applicant-body"><TaxInner role="applicant" data={data} onChange={onChange} /></div>
        </div>
      ) : (
        <div className="applicant-panel mb-4">
          <div className="applicant-head">
            <span style={{fontSize:18}}>{isEntity?"🏢":"👥"}</span>
            <span className="h-4">Tax Declaration</span>
            <span className="badge badge-info" style={{marginLeft:"auto"}}>{tabs.length} {tabs.length===1?"person":"people"}</span>
          </div>
          <div className="applicant-body">
            <ApplicantTabBar tabs={tabs} activeIdx={activeTab} onSelect={setActiveTab}
              onAdd={canAdd?addTab:null} onRemove={canAdd?removeTab:null}
              addLabel={isEntity?(data.applicantType==="Trust"?"Add Trustee":data.applicantType==="Close Corporation"?"Add Member":"Add Director"):null}
              canAdd={canAdd} />
            <div className="apt-panel" key={activeRole}>
              <TaxInner role={activeRole} data={data} onChange={onChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// STEP 8 — Documents
const DOC_REQUIREMENTS = [
  { key:"id",         label:"ID Document / Passport",           hint:"Certified copy of SA ID or valid passport — all applicants",  required:true },
  { key:"payslips",   label:"Latest 3 Payslips",                hint:"Or most recent payslip if recently employed",                  required:true },
  { key:"statements", label:"3 Months Bank Statements",         hint:"Most recent 3 months — same account as salary deposit",       required:true },
  { key:"incomeProof",label:"Proof of Other Income",            hint:"Rental agreements, investment statements, commission letters", required:false },
  { key:"taxReturn",  label:"SARS ITA34 / Tax Assessment",      hint:"Most recent — required if self-employed or requested",        required:false },
  { key:"financials", label:"2 Years Financial Statements",     hint:"Audited/reviewed — required for companies, CCs, and trusts",  required:false },
  { key:"plans",      label:"Approved Building Plans",          hint:"Council-approved architectural plans",                        required:true },
  { key:"deed",       label:"Title Deed / Offer to Purchase",   hint:"Notarised title deed or signed OTP",                         required:true },
  { key:"divorce",    label:"Divorce Decree / Settlement",      hint:"Required if divorced",                                        required:false },
  { key:"empContract",label:"Employment Contract",              hint:"If employed for less than 12 months",                         required:false },
];

const StepDocuments = ({ files, onAdd, onRemove }) => (
  <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
    <Notif type="warning" icon="⚠️">
      Missing required documents may delay or reject your application. Documents marked <strong>Required</strong> must be uploaded before submission.
    </Notif>
    {DOC_REQUIREMENTS.map(doc => (
      <div key={doc.key} className="card mb-4">
        <div className="card-head" style={{background:doc.required?"rgba(28,53,87,0.03)":"white"}}>
          <span className="h-4" style={{flex:1}}>{doc.label}</span>
          <span className={`badge${doc.required?" badge-warning":" badge-info"}`}>{doc.required?"Required":"Optional"}</span>
          {(files[doc.key]||[]).length>0 && <span className="badge badge-success">✓ {(files[doc.key]||[]).length} file{(files[doc.key]||[]).length>1?"s":""}</span>}
        </div>
        <div className="card-body" style={{paddingTop:16,paddingBottom:16}}>
          <FileUploader hint={doc.hint} docKey={doc.key} files={files} onAdd={onAdd} onRemove={onRemove} />
        </div>
      </div>
    ))}
  </div>
);

// STEP 9 — Review & Submit
const StepReview = ({ data, files, onGoToStep }) => {
  const bank = BANKS.find(b=>b.id===data.selectedBank);
  const totalDocs = Object.values(files).reduce((a,b)=>a+(b||[]).length,0);
  const missingRequired = DOC_REQUIREMENTS.filter(d=>d.required&&!(files[d.key]||[]).length).map(d=>d.label);

  return (
    <div style={{animation:"slideUp 0.3s var(--ease-out)"}}>
      {missingRequired.length>0 && (
        <Notif type="warning" icon="⚠️">
          <strong>Missing required documents:</strong> {missingRequired.join(", ")}. Please go back to the Documents step to upload these before submitting.
        </Notif>
      )}

      {/* Bank & Loan Summary */}
      <div className="card mb-4">
        <div className="card-head">
          <span className="h-4">🏦 Bank & Loan</span>
          <span className="review-edit" onClick={()=>onGoToStep(0)}>Edit</span>
        </div>
        <div className="card-body" style={{paddingBottom:8}}>
          {[
            ["Selected Bank", bank?.name || "—"],
            ["Application Type", data.loanPurpose || "—"],
            ["Applicant Structure", data.applicantType || "—"],
            ["Loan Amount", data.loanAmount ? `R ${data.loanAmount}` : "—"],
            ["Purchase Price", data.purchasePrice ? `R ${data.purchasePrice}` : "—"],
            ["Loan Term", data.loanTerm ? `${data.loanTerm} years` : "—"],
          ].map(([k,v])=>(<div key={k} className="review-row"><span className="review-key">{k}</span><span className="review-val">{v}</span></div>))}
        </div>
      </div>

      {/* Applicant Summary */}
      <div className="card mb-4">
        <div className="card-head">
          <span className="h-4">👤 Primary Applicant</span>
          <span className="review-edit" onClick={()=>onGoToStep(2)}>Edit</span>
        </div>
        <div className="card-body" style={{paddingBottom:8}}>
          {[
            ["Full Name", `${data.applicant_firstName||""} ${data.applicant_surname||""}`.trim()||"—"],
            ["ID Number", data.applicant_idNumber||"—"],
            ["Email", data.applicant_email||"—"],
            ["Cellphone", data.applicant_cell||"—"],
            ["Marital Status", data.applicant_marital||"—"],
            ["First-time Buyer", data.applicant_firstTimeBuyer||"—"],
          ].map(([k,v])=>(<div key={k} className="review-row"><span className="review-key">{k}</span><span className="review-val">{v}</span></div>))}
        </div>
      </div>

      {/* Property Summary */}
      <div className="card mb-4">
        <div className="card-head">
          <span className="h-4">🏠 Property</span>
          <span className="review-edit" onClick={()=>onGoToStep(5)}>Edit</span>
        </div>
        <div className="card-body" style={{paddingBottom:8}}>
          {[
            ["Property Type", data.propertyType||"—"],
            ["Property Right", data.propertyRight||"—"],
            ["Primary Residence", data.primaryResidence||"—"],
            ["Address", [data.prop_street, data.prop_city, data.prop_province].filter(Boolean).join(", ")||"—"],
          ].map(([k,v])=>(<div key={k} className="review-row"><span className="review-key">{k}</span><span className="review-val">{v}</span></div>))}
        </div>
      </div>

      {/* Documents Summary */}
      <div className="card mb-4">
        <div className="card-head">
          <span className="h-4">📎 Documents</span>
          <span className="review-edit" onClick={()=>onGoToStep(7)}>Edit</span>
        </div>
        <div className="card-body" style={{paddingBottom:8}}>
          {DOC_REQUIREMENTS.map(doc=>{
            const count = (files[doc.key]||[]).length;
            return (
              <div key={doc.key} className="review-row">
                <span className="review-key">{doc.label}</span>
                <span className={`review-val ${count>0?"c-success":"c-3"}`}>
                  {count>0 ? `✓ ${count} file${count>1?"s":""}` : (doc.required?"⚠ Not uploaded":"—")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Declaration */}
      <div className="card">
        <div className="card-head"><span className="h-4">📜 Declaration & Consent</span></div>
        <div className="card-body">
          {[
            { key:"decl1", label:"I confirm all information provided is accurate and complete to the best of my knowledge." },
            { key:"decl2", label:"I declare that I am not currently under debt review, administration, or sequestration." },
            { key:"decl3", label:"I consent to credit bureau checks being conducted on my behalf." },
            { key:"decl4", label:"I consent to my employer being contacted for verification purposes." },
            { key:"decl5", label:"I authorise BuildQuote to transmit this application to the selected bank on my behalf." },
            { key:"decl6", label:"I consent to my data being shared with the bank and their appointed insurers as required for this application." },
          ].map((d,i)=>(
            <div key={d.key} className="toggle-row">
              <div className="caption" style={{flex:1,paddingRight:20}}>{d.label}</div>
              <div className={`toggle-switch${data[d.key]?" on":""}`} onClick={()=>{}}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN WIZARD
// ─────────────────────────────────────────────────────────────────────────────
export default function BankSubmitWizard({ onCancel }) {
  const [step, setStep]   = useState(0);
  const [phase, setPhase] = useState("wizard"); // "wizard" | "sending" | "success"
  const [data, setData]   = useState({
    selectedBank: "", applicantType: "Individual", loanPurpose: "New Home Loan",
    applicant_postalSame: true, coapplicant_postalSame: true,
    decl1:false,decl2:false,decl3:false,decl4:false,decl5:false,decl6:false,
  });
  const [files, setFiles] = useState({});
  const mainRef = useRef();

  useEffect(() => {
    if (phase === "sending") {
      const t = setTimeout(() => setPhase("success"), 2800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const onChange = (key, val) => setData(p => ({...p, [key]: val}));

  const addFile = (docKey, file) => setFiles(p => ({...p, [docKey]: [...(p[docKey]||[]), file]}));
  const removeFile = (docKey, id) => setFiles(p => ({...p, [docKey]: (p[docKey]||[]).filter(f=>f.id!==id)}));

  const goToStep = (i) => {
    setStep(i);
    mainRef.current?.scrollTo({top:0, behavior:"smooth"});
  };

  const progress = ((step+1)/STEPS.length)*100;

  // ── SENDING ──
  if (phase === "sending") {
    const bank = BANKS.find(b=>b.id===data.selectedBank);
    return (
      <>
        <style>{STYLES}</style>
        <div className="wiz-shell">
          <div className="wiz-header">
            <div className="wiz-logo">Build<em>Quote</em></div>
            <div className="wiz-header-title">Home Loan Application</div>
          </div>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div className="send-wrap">
              <div className="send-spinner" />
              <div className="h-2 mb-2">Transmitting to {bank?.name}…</div>
              <div className="body c-2 mb-4" style={{maxWidth:380}}>
                Establishing a secure connection and transmitting your application pack. Please do not close this window.
              </div>
              <div className="send-prog">
                <div className="send-prog-fill" />
              </div>
              <div className="caption c-3 mt-3">Encrypting documents and uploading…</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── SUCCESS ──
  if (phase === "success") {
    const bank = BANKS.find(b=>b.id===data.selectedBank);
    const ref = `${bank?.short||"BNK"}-HL-2025-${Math.floor(100000+Math.random()*899999)}`;
    const now = new Date().toLocaleString("en-ZA",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
    return (
      <>
        <style>{STYLES}</style>
        <div className="wiz-shell">
          <div className="wiz-header">
            <div className="wiz-logo">Build<em>Quote</em></div>
            <div className="wiz-header-title">Home Loan Application</div>
          </div>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px"}}>
            <div className="success-wrap">
              <div className="success-ring">🎉</div>
              <div style={{fontFamily:"var(--font-d)",fontSize:28,marginBottom:8}}>Application Submitted!</div>
              <div className="body c-2 mb-2" style={{maxWidth:440}}>
                Your home loan application has been sent electronically to <strong>{bank?.name}</strong>. A reference has been issued and all parties have been notified by email.
              </div>
              <div className="ref-box">
                {[
                  ["Application Reference", ref],
                  ["Submitted To", bank?.name],
                  ["Submitted At", now],
                  ["Loan Amount", data.loanAmount ? `R ${data.loanAmount}` : "—"],
                  ["Expected Response", "5–10 business days"],
                ].map(([k,v])=>(
                  <div key={k} className="ref-row">
                    <span className="caption c-3">{k}</span>
                    <span className="caption fw-6 c-success">{v}</span>
                  </div>
                ))}
              </div>
              <Notif type="info" icon="📬">You will receive email updates at <strong>{data.applicant_email||"your registered email"}</strong> as your application progresses.</Notif>
              <button className="btn btn-primary btn-lg" onClick={onCancel||(() => window.location.reload())}>← Back to Project</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── WIZARD ──
  const STEP_CONTENT = [
    <StepBank key="bank" data={data} onChange={onChange} />,
    <StepAppType key="app-type" data={data} onChange={onChange} />,
    <StepPersonal key="personal" data={data} onChange={onChange} />,
    <StepEmployment key="employment" data={data} onChange={onChange} />,
    <StepFinancial key="financial" data={data} onChange={onChange} />,
    <StepProperty key="property" data={data} onChange={onChange} />,
    <StepTax key="tax" data={data} onChange={onChange} />,
    <StepDocuments key="documents" files={files} onAdd={addFile} onRemove={removeFile} />,
    <StepReview key="review" data={data} files={files} onGoToStep={goToStep} />,
  ];

  const isLast = step === STEPS.length - 1;
  const bank = BANKS.find(b=>b.id===data.selectedBank);

  return (
    <>
      <style>{STYLES}</style>
      <div className="wiz-shell">

        {/* Header */}
        <div className="wiz-header">
          <div className="wiz-logo">Build<em>Quote</em></div>
          <div className="wiz-header-title">Home Loan Application · {bank ? bank.short : "Select Bank"}</div>
          <div className="wiz-header-actions">
            <span className="caption c-3">Step {step+1} of {STEPS.length}</span>
            <button className="btn btn-ghost btn-sm" onClick={onCancel||undefined}>✕ Cancel</button>
          </div>
        </div>

        <div className="wiz-body">
          {/* Left Rail */}
          <div className="wiz-rail">
            <div className="rail-title">Application Progress</div>
            {STEPS.map((s, i) => (
              <div key={s.id}>
                <div
                  className={`rail-step${i===step?" rail-active":""}${i<step?" rail-done":""}`}
                  onClick={()=>i<=step && goToStep(i)}
                  style={{cursor: i<=step?"pointer":"default", opacity: i>step+1?0.55:1}}
                >
                  <div className="rail-node">
                    {i<step ? "✓" : i+1}
                  </div>
                  <div className="rail-info">
                    <div className="rail-step-name">{s.label}</div>
                    <div className="rail-step-sub">{s.sub}</div>
                  </div>
                </div>
                {i<STEPS.length-1 && <div className={`rail-connector${i<step?" done":""}`} />}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div style={{flex:1, overflowY:"auto"}} ref={mainRef}>
            <div className="wiz-main">
              {/* Progress bar */}
              <div className="prog-track"><div className="prog-fill" style={{width:`${progress}%`}} /></div>

              {/* Step Header */}
              <div className="wiz-step-header">
                <div className="wiz-step-eyebrow">Step {step+1} / {STEPS.length} — {STEPS[step].icon} {STEPS[step].label}</div>
                <div className="wiz-step-title">{STEPS[step].label}</div>
                <div className="wiz-step-desc">
                  {[
                    "Choose the bank you'd like to submit your home loan application to.",
                    "Define the structure and purpose of your home loan application.",
                    "Provide identity, contact, and address details for all applicants.",
                    "Employment status and employer details for income verification.",
                    "Income, banking details, and a full breakdown of monthly expenses and liabilities.",
                    "Property being purchased and detailed loan requirements.",
                    "Tax residency and SARS compliance declarations as required by FICA and CRS.",
                    "Upload all supporting documentation required by the bank for assessment.",
                    "Review your complete application before secure submission to the bank.",
                  ][step]}
                </div>
              </div>

              {/* Step Content */}
              {STEP_CONTENT[step]}
            </div>

            {/* Footer */}
            <div className="wiz-footer">
              <div className="wiz-footer-info">
                🔒 256-bit encrypted · POPIA compliant · FICA regulated
              </div>
              <div className="wiz-footer-nav">
                {step>0 && (
                  <button className="btn btn-secondary" onClick={()=>goToStep(step-1)}>← Back</button>
                )}
                {!isLast && (
                  <button className="btn btn-primary" onClick={()=>goToStep(step+1)}>
                    Continue →
                  </button>
                )}
                {isLast && (
                  <button
                    className="btn btn-accent btn-lg"
                    onClick={()=>setPhase("sending")}
                  >
                    🏦 Submit to {bank?.name||"Bank"} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
