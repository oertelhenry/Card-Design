/**
 * BankerDashboard — Qubrix Banking Partner Portal
 * Read-only application review dashboard for banking partners
 * Matches BankSubmitWizard design system exactly
 */

import { useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (identical to BankSubmitWizard)
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

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.14); border-radius:3px; }

  /* ── Shell ── */
  .shell { min-height:100vh; background:var(--bg-base); display:flex; flex-direction:column; }

  /* ── Top Header ── */
  .top-header {
    background:rgba(246,244,240,0.92);
    backdrop-filter:blur(20px) saturate(1.6);
    border-bottom:1px solid var(--border-sub);
    padding:0 32px; height:64px;
    display:flex; align-items:center; gap:16px;
    position:sticky; top:0; z-index:200;
    box-shadow:var(--shadow-xs);
  }
  .logo { font-family:var(--font-d); font-size:20px; color:var(--brand-primary); }
  .logo em { color:var(--brand-accent); font-style:normal; }
  .header-divider { width:1px; height:20px; background:var(--border-med); }
  .header-title { font-size:13.5px; font-weight:500; color:var(--txt-2); }
  .header-right { margin-left:auto; display:flex; gap:10px; align-items:center; }
  .avatar {
    width:34px; height:34px; border-radius:50%;
    background:var(--brand-primary); color:white;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:700; letter-spacing:0.5px;
  }
  .header-name { font-size:13px; font-weight:600; color:var(--txt-1); }
  .header-role { font-size:11px; color:var(--txt-3); }

  /* ── Body layout ── */
  .body-layout { display:flex; flex:1; }

  /* ── Left Sidebar ── */
  .sidebar {
    width:240px; flex-shrink:0;
    background:white; border-right:1px solid var(--border-sub);
    padding:24px 16px;
    position:sticky; top:64px;
    height:calc(100vh - 64px); overflow-y:auto;
    display:flex; flex-direction:column; gap:4px;
  }
  .sidebar-label {
    font-size:10px; font-weight:700; letter-spacing:1.2px;
    text-transform:uppercase; color:var(--txt-3);
    padding:0 10px; margin:16px 0 6px;
  }
  .sidebar-label:first-child { margin-top:0; }
  .nav-item {
    display:flex; align-items:center; gap:10px;
    padding:9px 10px; border-radius:var(--r-md);
    font-size:13px; font-weight:500; color:var(--txt-2);
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
    text-decoration:none;
  }
  .nav-item:hover { background:rgba(0,0,0,0.04); color:var(--txt-1); }
  .nav-item.active { background:var(--info-bg); color:var(--brand-primary); font-weight:600; }
  .nav-icon { font-size:15px; width:20px; text-align:center; }
  .nav-badge {
    margin-left:auto; background:var(--brand-accent); color:white;
    font-size:10px; font-weight:700; padding:2px 7px;
    border-radius:var(--r-full); min-width:20px; text-align:center;
  }

  /* ── Main Area ── */
  .main-area { flex:1; overflow-y:auto; }

  /* ── Dashboard view ── */
  .dash-content { padding:36px 40px; max-width:1100px; animation:fadeIn var(--dur-slow) var(--ease-out); }
  .page-title { font-family:var(--font-d); font-size:28px; color:var(--txt-1); margin-bottom:4px; }
  .page-subtitle { font-size:13.5px; color:var(--txt-2); margin-bottom:28px; }

  /* ── Stat Cards ── */
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:32px; }
  .stat-card {
    background:white; border:1px solid var(--border-sub); border-radius:var(--r-lg);
    box-shadow:var(--shadow-sm); padding:20px 22px;
  }
  .stat-label { font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:var(--txt-3); margin-bottom:8px; }
  .stat-value { font-family:var(--font-d); font-size:30px; color:var(--txt-1); line-height:1; margin-bottom:4px; }
  .stat-sub { font-size:11.5px; color:var(--txt-3); }
  .stat-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:6px; }

  /* ── Application List ── */
  .section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
  .section-title { font-size:15px; font-weight:700; color:var(--txt-1); }
  .filter-row { display:flex; gap:8px; align-items:center; }
  .filter-btn {
    font-size:12px; font-weight:500; padding:5px 12px;
    border-radius:var(--r-full); border:1px solid var(--border-med);
    color:var(--txt-2); background:white; cursor:pointer;
    transition:all var(--dur-fast) var(--ease-out);
  }
  .filter-btn:hover { border-color:var(--brand-primary); color:var(--brand-primary); }
  .filter-btn.active { background:var(--brand-primary); color:white; border-color:var(--brand-primary); }

  .app-table { width:100%; border-collapse:collapse; }
  .app-table-wrap {
    background:white; border:1px solid var(--border-sub);
    border-radius:var(--r-lg); box-shadow:var(--shadow-sm); overflow:hidden;
  }
  .app-table th {
    padding:11px 18px; text-align:left;
    font-size:10.5px; font-weight:700; letter-spacing:0.8px;
    text-transform:uppercase; color:var(--txt-3);
    background:rgba(0,0,0,0.02); border-bottom:1px solid var(--border-sub);
  }
  .app-table td {
    padding:14px 18px; font-size:13px; color:var(--txt-1);
    border-bottom:1px solid var(--border-sub);
  }
  .app-table tr:last-child td { border-bottom:none; }
  .app-table tbody tr {
    transition:background var(--dur-fast);
    cursor:pointer;
  }
  .app-table tbody tr:hover { background:rgba(28,53,87,0.03); }
  .app-ref { font-family:var(--font-m); font-size:12px; color:var(--brand-primary); font-weight:500; }
  .app-project { font-weight:600; font-size:13px; }
  .app-client { font-size:12px; color:var(--txt-2); margin-top:2px; }

  /* ── Status Badges ── */
  .badge {
    display:inline-flex; align-items:center; gap:5px;
    font-size:11px; font-weight:600; padding:4px 10px;
    border-radius:var(--r-full); white-space:nowrap;
  }
  .badge-submitted { background:var(--info-bg); color:var(--brand-primary); }
  .badge-approved  { background:var(--success-bg); color:var(--success); }
  .badge-declined  { background:var(--error-bg); color:var(--error); }
  .badge-pending   { background:var(--warning-bg); color:var(--warning); }
  .badge-dot { width:6px; height:6px; border-radius:50%; background:currentColor; }

  /* ── Application Detail View ── */
  .detail-content { padding:0; animation:fadeIn var(--dur-slow) var(--ease-out); }

  .detail-topbar {
    background:white; border-bottom:1px solid var(--border-sub);
    padding:16px 32px; display:flex; align-items:center; gap:16px;
    position:sticky; top:0; z-index:100;
    box-shadow:var(--shadow-xs);
  }
  .back-btn {
    display:inline-flex; align-items:center; gap:6px;
    font-size:13px; font-weight:500; color:var(--txt-2);
    padding:6px 12px; border-radius:var(--r-md);
    border:1px solid var(--border-med); background:white;
    cursor:pointer; transition:all var(--dur-fast) var(--ease-out);
  }
  .back-btn:hover { border-color:var(--brand-primary); color:var(--brand-primary); }
  .detail-app-name { font-family:var(--font-d); font-size:22px; color:var(--txt-1); }
  .detail-ref { font-family:var(--font-m); font-size:12px; color:var(--txt-3); }
  .detail-actions { margin-left:auto; display:flex; gap:8px; align-items:center; }

  /* ── Tab Bar ── */
  .tab-bar {
    display:flex; gap:0; padding:0 32px;
    background:white; border-bottom:1px solid var(--border-sub);
  }
  .tab {
    font-size:13px; font-weight:500; color:var(--txt-2);
    padding:14px 18px; cursor:pointer; border:none; background:none;
    border-bottom:2px solid transparent; margin-bottom:-1px;
    display:flex; align-items:center; gap:7px;
    transition:all var(--dur-fast) var(--ease-out);
  }
  .tab:hover { color:var(--txt-1); }
  .tab.active { color:var(--brand-primary); border-bottom-color:var(--brand-primary); font-weight:600; }

  /* ── Detail Body ── */
  .detail-body { padding:32px; display:grid; grid-template-columns:1fr 340px; gap:24px; align-items:start; }
  .detail-main { display:flex; flex-direction:column; gap:20px; }
  .detail-aside { display:flex; flex-direction:column; gap:20px; position:sticky; top:120px; }

  /* ── Cards ── */
  .card {
    background:white; border:1px solid var(--border-sub);
    border-radius:var(--r-lg); box-shadow:var(--shadow-sm); overflow:hidden;
  }
  .card-head {
    padding:16px 22px; border-bottom:1px solid var(--border-sub);
    display:flex; align-items:center; gap:10px;
  }
  .card-head-icon { font-size:16px; }
  .card-head-title { font-size:13.5px; font-weight:700; color:var(--txt-1); }
  .card-head-sub { font-size:12px; color:var(--txt-3); margin-left:auto; }
  .card-body { padding:22px; }

  /* ── Field Grid ── */
  .field-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px 24px; }
  .field-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px 24px; }
  .field-group { display:flex; flex-direction:column; gap:3px; }
  .field-group.span2 { grid-column:span 2; }
  .field-group.span3 { grid-column:span 3; }
  .field-label { font-size:10.5px; font-weight:700; letter-spacing:0.7px; text-transform:uppercase; color:var(--txt-3); }
  .field-value { font-size:13.5px; color:var(--txt-1); font-weight:500; }
  .field-value.mono { font-family:var(--font-m); font-size:12.5px; }
  .field-value.empty { color:var(--txt-3); font-style:italic; font-weight:400; }

  /* ── Applicant Tabs ── */
  .applicant-tabs { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; }
  .applicant-tab {
    padding:8px 16px; border-radius:var(--r-md);
    font-size:12.5px; font-weight:500; cursor:pointer;
    border:1px solid var(--border-med); background:white; color:var(--txt-2);
    transition:all var(--dur-fast) var(--ease-out);
  }
  .applicant-tab:hover { border-color:var(--brand-primary); color:var(--brand-primary); }
  .applicant-tab.active { background:var(--brand-primary); color:white; border-color:var(--brand-primary); }
  .applicant-tab-role { font-size:10px; opacity:0.7; margin-top:1px; }

  /* ── Section Divider ── */
  .sec-div { display:flex; align-items:center; gap:12px; margin:22px 0 16px; }
  .sec-div-label { font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--txt-3); white-space:nowrap; }
  .sec-div-line { flex:1; height:1px; background:var(--border-sub); }

  /* ── Income / Expense Table ── */
  .fin-table { width:100%; border-collapse:collapse; }
  .fin-table th { font-size:10.5px; font-weight:700; letter-spacing:0.7px; text-transform:uppercase; color:var(--txt-3); padding:8px 12px; text-align:left; border-bottom:1px solid var(--border-sub); background:rgba(0,0,0,0.02); }
  .fin-table td { font-size:13px; padding:9px 12px; border-bottom:1px solid var(--border-sub); color:var(--txt-1); }
  .fin-table tr:last-child td { border-bottom:none; }
  .fin-table td:last-child { text-align:right; font-family:var(--font-m); font-size:12px; }
  .fin-total td { font-weight:700; background:rgba(0,0,0,0.02); border-top:1px solid var(--border-med) !important; }
  .fin-null { color:var(--txt-3); font-style:italic; font-size:11.5px; }

  /* ── Banker Panel (aside) ── */
  .banker-select {
    width:100%; padding:10px 14px; border-radius:var(--r-md);
    border:1px solid var(--border-med); font-family:var(--font-b);
    font-size:13.5px; color:var(--txt-1); background:white;
    appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239A9A9A' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 12px center;
    cursor:pointer; transition:border var(--dur-fast);
  }
  .banker-select:focus { outline:none; border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }

  .banker-info { display:flex; flex-direction:column; gap:10px; margin-top:14px; padding:14px; background:var(--info-bg); border-radius:var(--r-md); }
  .banker-info-row { display:flex; flex-direction:column; gap:2px; }
  .banker-info-label { font-size:10px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:var(--txt-3); }
  .banker-info-val { font-size:13px; font-weight:500; color:var(--txt-1); }

  /* Deal fields */
  .deal-field {
    width:100%; padding:10px 14px; border-radius:var(--r-md);
    border:1px solid var(--border-med); font-family:var(--font-b);
    font-size:13.5px; color:var(--txt-1); background:white;
    transition:border var(--dur-fast); margin-top:4px;
  }
  .deal-field:focus { outline:none; border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }
  .deal-field-label { font-size:10.5px; font-weight:700; letter-spacing:0.7px; text-transform:uppercase; color:var(--txt-3); }

  .status-select {
    width:100%; padding:10px 14px; border-radius:var(--r-md);
    border:1px solid var(--border-med); font-family:var(--font-b);
    font-size:13.5px; color:var(--txt-1); background:white;
    appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239A9A9A' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 12px center;
    cursor:pointer; transition:border var(--dur-fast); margin-top:4px;
  }
  .status-select:focus { outline:none; border-color:var(--brand-primary); }

  .notes-area {
    width:100%; padding:10px 14px; border-radius:var(--r-md);
    border:1px solid var(--border-med); font-family:var(--font-b);
    font-size:13px; color:var(--txt-1); background:white;
    resize:vertical; min-height:90px; line-height:1.5;
    transition:border var(--dur-fast); margin-top:4px;
  }
  .notes-area:focus { outline:none; border-color:var(--brand-primary); box-shadow:0 0 0 3px rgba(28,53,87,0.10); }

  .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; font-family:var(--font-b); font-weight:500; cursor:pointer; transition:all var(--dur-fast) var(--ease-out); white-space:nowrap; border:none; }
  .btn-primary { background:var(--brand-primary); color:white; padding:10px 22px; border-radius:var(--r-md); font-size:13.5px; box-shadow:0 2px 8px rgba(28,53,87,0.25); }
  .btn-primary:hover { background:var(--brand-mid); transform:translateY(-1px); }
  .btn-success { background:var(--success); color:white; padding:10px 20px; border-radius:var(--r-md); font-size:13px; }
  .btn-success:hover { background:#236641; transform:translateY(-1px); }
  .btn-error { background:var(--error); color:white; padding:10px 20px; border-radius:var(--r-md); font-size:13px; }
  .btn-error:hover { background:#a3312a; transform:translateY(-1px); }
  .btn-ghost { border:1px solid var(--border-med); padding:10px 18px; border-radius:var(--r-md); font-size:13px; color:var(--txt-2); background:white; }
  .btn-ghost:hover { border-color:var(--border-str); color:var(--txt-1); }
  .btn-sm { padding:7px 14px; font-size:12.5px; }
  .btn-full { width:100%; }

  /* Status History */
  .history-entry { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--border-sub); }
  .history-entry:last-child { border-bottom:none; padding-bottom:0; }
  .history-dot { width:8px; height:8px; border-radius:50%; background:var(--brand-accent); flex-shrink:0; margin-top:5px; }
  .history-main { flex:1; }
  .history-status { font-size:13px; font-weight:600; color:var(--txt-1); }
  .history-meta { font-size:11.5px; color:var(--txt-3); margin-top:2px; }
  .history-note { font-size:12.5px; color:var(--txt-2); margin-top:5px; font-style:italic; padding:8px 10px; background:var(--bg-base); border-radius:var(--r-sm); }

  /* Documents */
  .doc-item {
    display:flex; align-items:center; gap:12px;
    padding:12px 0; border-bottom:1px solid var(--border-sub);
  }
  .doc-item:last-child { border-bottom:none; }
  .doc-icon { font-size:20px; width:36px; text-align:center; }
  .doc-name { font-size:13px; font-weight:600; color:var(--txt-1); }
  .doc-type { font-size:11.5px; color:var(--txt-3); margin-top:2px; }
  .doc-link {
    margin-left:auto; font-size:12px; color:var(--brand-accent);
    font-weight:600; cursor:pointer; text-decoration:none;
    padding:5px 10px; border-radius:var(--r-sm);
    border:1px solid var(--brand-accent-lt); background:var(--brand-accent-lt);
    transition:all var(--dur-fast);
  }
  .doc-link:hover { background:var(--brand-accent); color:white; }

  /* Entity members */
  .member-row {
    display:flex; align-items:center; gap:14px;
    padding:10px 0; border-bottom:1px solid var(--border-sub);
  }
  .member-row:last-child { border-bottom:none; }
  .member-avatar {
    width:32px; height:32px; border-radius:50%;
    background:var(--brand-accent-lt); color:var(--brand-accent);
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700; flex-shrink:0;
  }
  .member-name { font-size:13px; font-weight:600; color:var(--txt-1); }
  .member-id { font-size:11.5px; color:var(--txt-3); font-family:var(--font-m); }
  .member-pct { margin-left:auto; font-size:12px; font-weight:700; color:var(--brand-primary); background:var(--info-bg); padding:3px 8px; border-radius:var(--r-full); }

  /* Consent checks */
  .consent-grid { display:flex; flex-direction:column; gap:8px; }
  .consent-row { display:flex; align-items:center; gap:10px; font-size:13px; color:var(--txt-2); }
  .consent-check { width:18px; height:18px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:11px; }
  .consent-yes { background:var(--success-bg); color:var(--success); }
  .consent-no  { background:var(--error-bg); color:var(--error); }

  /* Alert flags */
  .flag-row { display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:var(--r-sm); font-size:12.5px; font-weight:500; margin-bottom:8px; }
  .flag-warn { background:var(--warning-bg); color:var(--warning); }
  .flag-err  { background:var(--error-bg); color:var(--error); }

  /* Responsive */
  @media(max-width:900px) {
    .detail-body { grid-template-columns:1fr; }
    .detail-aside { position:static; }
    .stats-grid { grid-template-columns:1fr 1fr; }
    .field-grid { grid-template-columns:1fr; }
    .field-grid-3 { grid-template-columns:1fr 1fr; }
    .field-group.span2, .field-group.span3 { grid-column:span 1; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────
const BANKERS = [
  { id: "b1", name: "Sarah van der Merwe", email: "s.vandermerwe@fnb.co.za", mobile: "082 345 6789", office: "011 632 0100" },
  { id: "b2", name: "James Pietersen",      email: "j.pietersen@fnb.co.za",  mobile: "083 456 7890", office: "011 632 0101" },
  { id: "b3", name: "Nomsa Dlamini",        email: "n.dlamini@fnb.co.za",    mobile: "084 567 8901", office: "011 632 0102" },
  { id: "b4", name: "Michael du Plessis",   email: "m.duplessis@fnb.co.za",  mobile: "072 678 9012", office: "011 632 0103" },
];

const APPLICATION = {
  bankApplicationId: "fee84186-e1b1-4b38-a6eb-4b31e70cd0f4",
  statusCode: "BANK_SUBMITTED",
  requestedAmount: 1600000,
  submittedAt: "2026-05-08T18:06:54.02062+00:00",
  createdAt: "2026-05-08T17:51:36.96794+00:00",
  consentAccurate: true, consentNoDebtReview: true, consentCreditCheck: true,
  consentEmployerContact: true, consentTransmit: true, consentDataShare: true,
  project: {
    title: "Modern Family Home Extension",
    description: "Extension and renovation of an existing residential property to create additional living space for a growing family. The scope includes constructing two new bedrooms, expanding the kitchen and dining area, and adding a covered outdoor entertainment section.",
    projectTypeName: "Extension / Addition",
    address: { line1: "533 Ysterhout Drive", suburb: "Boskruin", city: "Randburg", stateProvince: "Gauteng", postalCode: "2188" },
  },
  client: { firstName: "Brendan", lastName: "Smith", email: "brendan@smith.com" },
  bankPartner: { name: "First National Bank", shortName: "FNB" },
  loanDetail: {
    applicantType: "Close Corporation",
    loanPurpose: "New Home Loan",
    loanTerm: 20,
    purchasePrice: 1600000,
    propertyType: "Freehold (Full Title)",
    primaryResidence: true,
    propLine1: "533 Ysterhout Drive", propSuburb: "Boskruin", propCity: "Randburg",
    propProvince: "Gauteng", propPostalCode: "2188", propUnit: "33",
    entityName: "Properties are us", entityRegNo: "1997/456789/99",
    entityVat: "234567890", entityAddress: "33 Drew Lane, Rivonia, Johannesburg",
    entityMembers: [
      { fullName: "Bruce Willis", idNumber: "0987654321", holdingPct: 33 },
      { fullName: "Tom Hanks",    idNumber: "1234567890", holdingPct: 33 },
      { fullName: "Brad Pit",     idNumber: "5432167890", holdingPct: 33 },
    ],
  },
  entityApplicants: [
    {
      bankApplicationApplicantId: "d67f1b03", role: "em_0",
      title: "Mr", firstName: "Bruce", lastName: "Willis",
      idNumber: "1234567890", dob: "1995-02-02", saCitizen: true, race: "White",
      maritalStatus: "Married (ANC without Accrual)", insolvent: false, firstTimeBuyer: false,
      telHome: "0113456789", email: "bruce@willis.com", phone: "8907654321",
      addrLine1: "878 Drip Street", addrSuburb: "Blaauwbank", addrCity: "Westonaria",
      addrProvince: "Gauteng", addrPostalCode: "5563",
      postalSameAsPhysical: false,
      postalLine1: "Po Box 1234", postalSuburb: "Westonaria", postalCity: "Westonaria",
      postalProvince: "Gauteng", postalPostalCode: "5533",
      empStatus: "Permanently Employed", occupation: "Actor", empSector: "Private Sector",
      employerName: "Holywood Productions", employerTel: "011 222 3333", lengthService: 33,
      incomeGross: 120000, incomeNett: 100000, incomeCommission: 30000, incomeOther: 10000,
      bankName: "Nedbank", accType: "Savings", accNumber: "0987654321", branchCode: "12345",
      taxNo: "6789054321", foreignTax: false,
      debts: [
        { label: "Other Revolving Debt", monthlyObligation: 2000 },
        { label: "Retail / Store Cards", monthlyObligation: 2000 },
        { label: "Credit Cards (min repayment)", monthlyObligation: 3000 },
        { label: "Personal Loan", monthlyObligation: 2000 },
        { label: "Overdraft", monthlyObligation: 2000 },
        { label: "Mortgage Bond / Rent", monthlyObligation: 1000 },
        { label: "Vehicle Finance (HP/Lease)", monthlyObligation: 2000 },
        { label: "Obligation as Surety", monthlyObligation: 2000 },
      ],
      expenses: [
        { label: "Groceries & Housekeeping", monthlyAmount: 2000 },
        { label: "Levy / Rates & Taxes", monthlyAmount: 2000 },
        { label: "Car & Household Insurance", monthlyAmount: 2000 },
        { label: "Life Assurance Policies", monthlyAmount: 2000 },
        { label: "Education (school/university)", monthlyAmount: 2000 },
        { label: "Child / Spouse Maintenance", monthlyAmount: 2000 },
        { label: "Fuel & Vehicle Maintenance", monthlyAmount: 2000 },
        { label: "Water & Lights", monthlyAmount: 2000 },
        { label: "Medical Aid (if not deducted)", monthlyAmount: 2000 },
        { label: "Telephone & Cellphone", monthlyAmount: 2000 },
        { label: "General Living Expenses", monthlyAmount: 2000 },
      ],
    },
    {
      bankApplicationApplicantId: "45457270", role: "em_1",
      title: "Dr", firstName: "Tom", lastName: "Hanks",
      idNumber: "0987654321", dob: "1973-10-15", saCitizen: true, race: "Asian",
      maritalStatus: "Married (COP)", insolvent: true, firstTimeBuyer: true,
      telHome: "0118792000", email: "tom@hanks.com", phone: "0826664444",
      addrLine1: "443 Secure Street", addrSuburb: "Morningside", addrCity: "Sandton",
      addrProvince: "Gauteng", addrPostalCode: "7324",
      postalSameAsPhysical: true,
      empStatus: "Temporarily Employed", occupation: "Singer", empSector: "Parastatals",
      employerName: "Plumblink", employerTel: "0118799000", lengthService: 60,
      incomeGross: 150000, incomeNett: 120000, incomeCommission: 20000, incomeOther: null,
      bankName: "Standard Bank", accType: "Cheque / Current", accNumber: "6789054321", branchCode: "87654",
      taxNo: "1234567890", foreignTax: false,
      debts: [
        { label: "Other Revolving Debt", monthlyObligation: 1000 },
        { label: "Obligation as Surety", monthlyObligation: null },
        { label: "Credit Cards (min repayment)", monthlyObligation: null },
        { label: "Vehicle Finance (HP/Lease)", monthlyObligation: null },
        { label: "Mortgage Bond / Rent", monthlyObligation: 1000 },
        { label: "Retail / Store Cards", monthlyObligation: null },
        { label: "Overdraft", monthlyObligation: 1000 },
        { label: "Personal Loan", monthlyObligation: null },
      ],
      expenses: [
        { label: "Life Assurance Policies", monthlyAmount: null },
        { label: "General Living Expenses", monthlyAmount: null },
        { label: "Water & Lights", monthlyAmount: null },
        { label: "Car & Household Insurance", monthlyAmount: null },
        { label: "Telephone & Cellphone", monthlyAmount: null },
        { label: "Levy / Rates & Taxes", monthlyAmount: null },
        { label: "Education (school/university)", monthlyAmount: null },
        { label: "Child / Spouse Maintenance", monthlyAmount: null },
        { label: "Medical Aid (if not deducted)", monthlyAmount: null },
        { label: "Fuel & Vehicle Maintenance", monthlyAmount: null },
        { label: "Groceries & Housekeeping", monthlyAmount: 1000 },
      ],
    },
    {
      bankApplicationApplicantId: "8884bd32", role: "em_2",
      title: "Mr", firstName: "Brad", lastName: "Pit",
      idNumber: "5432167890", dob: "2009-03-19", saCitizen: true, race: "Coloured",
      maritalStatus: "Married (ANC with Accrual)", insolvent: false, firstTimeBuyer: false,
      phone: "0987654321", email: "brad@pit.com",
      addrLine1: "19 Brad street", addrSuburb: "Witfield", addrCity: "Boksburg",
      addrProvince: "Gauteng", addrPostalCode: "1234",
      postalSameAsPhysical: true,
      empStatus: "Self-Employed", bizName: "Brads Dildos", bizMonths: 90,
      incomeGross: 90000, incomeNett: 70000, incomeCommission: 40000, incomeOther: null,
      bankName: "Investec", accType: "Savings", accNumber: "5643214345", branchCode: "76584",
      taxNo: "0987654321", foreignTax: true, foreignTaxCountry: "Canada", foreignTaxId: "45678234",
      debts: [
        { label: "Personal Loan", monthlyObligation: null },
        { label: "Overdraft", monthlyObligation: 3200 },
        { label: "Credit Cards (min repayment)", monthlyObligation: 2000 },
        { label: "Obligation as Surety", monthlyObligation: null },
        { label: "Retail / Store Cards", monthlyObligation: null },
        { label: "Vehicle Finance (HP/Lease)", monthlyObligation: 2000 },
        { label: "Mortgage Bond / Rent", monthlyObligation: 2000 },
        { label: "Other Revolving Debt", monthlyObligation: 2000 },
      ],
      expenses: [
        { label: "Groceries & Housekeeping", monthlyAmount: 2000 },
        { label: "General Living Expenses", monthlyAmount: null },
        { label: "Fuel & Vehicle Maintenance", monthlyAmount: null },
        { label: "Levy / Rates & Taxes", monthlyAmount: null },
        { label: "Car & Household Insurance", monthlyAmount: null },
        { label: "Telephone & Cellphone", monthlyAmount: 2000 },
        { label: "Medical Aid (if not deducted)", monthlyAmount: null },
        { label: "Child / Spouse Maintenance", monthlyAmount: null },
        { label: "Life Assurance Policies", monthlyAmount: null },
        { label: "Education (school/university)", monthlyAmount: null },
        { label: "Water & Lights", monthlyAmount: null },
      ],
    },
  ],
  documents: [
    { bankApplicationDocumentId: "5ca43498", documentTypeName: "Approved Building Plans", fileName: "Building Plans.png", fileUrl: "#", createdAt: "2026-05-08T18:06:38.542144+00:00" },
    { bankApplicationDocumentId: "7e27c521", documentTypeName: "Company Registration",    fileName: "ID.png",            fileUrl: "#", createdAt: "2026-05-08T18:06:19.548694+00:00" },
    { bankApplicationDocumentId: "bd796394", documentTypeName: "Title Deed",              fileName: "Title Deed Certificate.png", fileUrl: "#", createdAt: "2026-05-08T18:06:44.687071+00:00" },
    { bankApplicationDocumentId: "d0aed1f1", documentTypeName: "Tax Clearance (SARS)",   fileName: "Bank Statement.png", fileUrl: "#", createdAt: "2026-05-08T18:06:31.679928+00:00" },
    { bankApplicationDocumentId: "ea2d5b1a", documentTypeName: "Public Liability Insurance", fileName: "Proof of Income.png", fileUrl: "#", createdAt: "2026-05-08T18:06:24.671686+00:00" },
  ],
};

const SAMPLE_APPLICATIONS = [
  { id: "fee84186", ref: "FEE84186", project: "Modern Family Home Extension", client: "Brendan Smith", amount: 1600000, status: "BANK_SUBMITTED", date: "08 May 2026", applicants: 3, type: "Close Corporation" },
  { id: "abc12345", ref: "ABC12345", project: "Sandton Apartment Purchase",   client: "Linda Nkosi",   amount: 2400000, status: "APPROVED",        date: "06 May 2026", applicants: 2, type: "Individual" },
  { id: "def67890", ref: "DEF67890", project: "Soweto Starter Home",          client: "Sipho Mokoena", amount: 850000,  status: "PENDING",          date: "04 May 2026", applicants: 1, type: "Individual" },
  { id: "ghi11223", ref: "GHI11223", project: "Midrand Office Conversion",    client: "Andre Botha",   amount: 3200000, status: "DECLINED",         date: "02 May 2026", applicants: 2, type: "Close Corporation" },
  { id: "jkl44556", ref: "JKL44556", project: "Pretoria Townhouse Complex",   client: "Fatima Patel",  amount: 5800000, status: "BANK_SUBMITTED",   date: "01 May 2026", applicants: 4, type: "Individual" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmt = (n) => n != null ? `R ${Number(n).toLocaleString("en-ZA")}` : <span className="field-value empty">—</span>;
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
const val = (v, mono = false) => v != null && v !== "" ? <span className={`field-value${mono ? " mono" : ""}`}>{v}</span> : <span className="field-value empty">Not provided</span>;
const StatusBadge = ({ code }) => {
  const MAP = {
    BANK_SUBMITTED: ["badge-submitted", "Submitted"],
    APPROVED:       ["badge-approved",  "Approved"],
    DECLINED:       ["badge-declined",  "Declined"],
    PENDING:        ["badge-pending",   "Pending Review"],
  };
  const [cls, label] = MAP[code] || ["badge-pending", code];
  return <span className={`badge ${cls}`}><span className="badge-dot" />{label}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function FieldGroup({ label, value, mono = false, span = 1 }) {
  const spanClass = span === 2 ? " span2" : span === 3 ? " span3" : "";
  return (
    <div className={`field-group${spanClass}`}>
      <div className="field-label">{label}</div>
      {val(value, mono)}
    </div>
  );
}

function Card({ icon, title, sub, children }) {
  return (
    <div className="card">
      <div className="card-head">
        {icon && <span className="card-head-icon">{icon}</span>}
        <span className="card-head-title">{title}</span>
        {sub && <span className="card-head-sub">{sub}</span>}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function SectionDiv({ label }) {
  return (
    <div className="sec-div">
      <div className="sec-div-line" />
      <div className="sec-div-label">{label}</div>
      <div className="sec-div-line" />
    </div>
  );
}

function FinTable({ rows, amtKey, label }) {
  const active = rows.filter(r => r[amtKey] != null && r[amtKey] > 0);
  const total = active.reduce((s, r) => s + (r[amtKey] || 0), 0);
  return (
    <table className="fin-table" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>{label}</th>
          <th style={{ textAlign: "right" }}>Monthly (R)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={{ color: r[amtKey] == null ? "var(--txt-3)" : undefined }}>{r.label || r.label}</td>
            <td>
              {r[amtKey] != null ? Number(r[amtKey]).toLocaleString("en-ZA") : <span className="fin-null">—</span>}
            </td>
          </tr>
        ))}
        <tr className="fin-total">
          <td style={{ fontSize: "12px" }}>Total</td>
          <td>{Number(total).toLocaleString("en-ZA")}</td>
        </tr>
      </tbody>
    </table>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BANKER SIDE PANEL
// ─────────────────────────────────────────────────────────────────────────────
function BankerPanel({ app }) {
  const [bankerId, setBankerId] = useState("");
  const [dealRef, setDealRef] = useState("");
  const [financeAcc, setFinanceAcc] = useState("");
  const [financeStatus, setFinanceStatus] = useState("");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([
    { date: fmtDate(app.submittedAt), status: "Draft → Bank Submitted", by: `${app.client.firstName} ${app.client.lastName}`, note: null },
  ]);

  const banker = BANKERS.find(b => b.id === bankerId);

  const addNote = () => {
    if (!note.trim()) return;
    setHistory(h => [{ date: new Date().toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }), status: financeStatus || "Note Added", by: banker?.name || "Banker", note: note.trim() }, ...h]);
    setNote("");
  };

  const flags = [];
  app.entityApplicants?.forEach(a => {
    if (a.insolvent) flags.push({ type: "err", msg: `${a.firstName} ${a.lastName} — marked insolvent` });
    if (a.firstTimeBuyer) flags.push({ type: "warn", msg: `${a.firstName} ${a.lastName} — first-time buyer` });
    if (a.foreignTax) flags.push({ type: "warn", msg: `${a.firstName} ${a.lastName} — foreign tax resident (${a.foreignTaxCountry})` });
    if (a.empStatus === "Temporarily Employed") flags.push({ type: "warn", msg: `${a.firstName} ${a.lastName} — temporarily employed` });
  });

  return (
    <>
      {/* Flags */}
      {flags.length > 0 && (
        <Card icon="🚩" title="Risk Flags">
          {flags.map((f, i) => (
            <div key={i} className={`flag-row flag-${f.type}`}>
              {f.type === "err" ? "⛔" : "⚠️"} {f.msg}
            </div>
          ))}
        </Card>
      )}

      {/* Bank Details */}
      <Card icon="🏦" title="Bank Details">
        <div className="deal-field-label">Assigned Banker</div>
        <select
          className="banker-select"
          value={bankerId}
          onChange={e => setBankerId(e.target.value)}
        >
          <option value="">— Select your name —</option>
          {BANKERS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        {banker && (
          <div className="banker-info">
            <div className="banker-info-row">
              <div className="banker-info-label">Email</div>
              <div className="banker-info-val">{banker.email}</div>
            </div>
            <div className="banker-info-row">
              <div className="banker-info-label">Mobile</div>
              <div className="banker-info-val">{banker.mobile}</div>
            </div>
            <div className="banker-info-row">
              <div className="banker-info-label">Office</div>
              <div className="banker-info-val">{banker.office}</div>
            </div>
          </div>
        )}
      </Card>

      {/* Finance Application Info */}
      <Card icon="📋" title="Finance Application Info & Status">
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div className="deal-field-label">Bank Deal Reference Number</div>
            <input className="deal-field" placeholder="Enter deal reference…" value={dealRef} onChange={e => setDealRef(e.target.value)} />
          </div>
          <div>
            <div className="deal-field-label">Finance Account Number</div>
            <input className="deal-field" placeholder="Enter account number…" value={financeAcc} onChange={e => setFinanceAcc(e.target.value)} />
          </div>
          <div>
            <div className="deal-field-label">Finance Status</div>
            <select className="status-select" value={financeStatus} onChange={e => setFinanceStatus(e.target.value)}>
              <option value="">— Select status —</option>
              <option value="Under Review">Under Review</option>
              <option value="Conditionally Approved">Conditionally Approved</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
              <option value="Request More Info">Request More Info</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div>
            <div className="deal-field-label">Bank Notes</div>
            <textarea
              className="notes-area"
              placeholder="Add a note…"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <button className="btn btn-primary btn-full" style={{ marginTop: "8px" }} onClick={addNote}>
              💬 Save Note
            </button>
          </div>
        </div>

        {/* Status History */}
        <SectionDiv label="Status Notes History" />
        <div>
          {history.map((h, i) => (
            <div key={i} className="history-entry">
              <div className="history-dot" />
              <div className="history-main">
                <div className="history-status">{h.status}</div>
                <div className="history-meta">{h.date} · {h.by}</div>
                {h.note && <div className="history-note">"{h.note}"</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card icon="⚡" title="Actions">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button className="btn btn-success btn-full">✓ Approve Application</button>
          <button className="btn btn-error btn-full">✕ Decline Application</button>
          <button className="btn btn-ghost btn-full">? Request More Information</button>
        </div>
      </Card>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APPLICATION DETAIL VIEW
// ─────────────────────────────────────────────────────────────────────────────
function ApplicationDetail({ app, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeApplicant, setActiveApplicant] = useState(0);

  const applicants = app.entityApplicants || [];
  const a = applicants[activeApplicant] || {};
  const ld = app.loanDetail || {};

  const totalDebt = (a.debts || []).reduce((s, d) => s + (d.monthlyObligation || 0), 0);
  const totalExp  = (a.expenses || []).reduce((s, e) => s + (e.monthlyAmount || 0), 0);
  const totalInc  = (a.incomeGross || 0);

  const TABS = [
    { id: "overview",   label: "Overview",          icon: "📊" },
    { id: "applicants", label: `Applicants (${applicants.length})`, icon: "👥" },
    { id: "property",   label: "Property & Loan",   icon: "🏡" },
    { id: "documents",  label: `Documents (${app.documents?.length || 0})`, icon: "📁" },
  ];

  return (
    <div className="detail-content">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="back-btn" onClick={onBack}>← Back to Applications</button>
        <div>
          <div className="detail-app-name">{app.project.title}</div>
          <div className="detail-ref">Ref: {app.bankApplicationId.split("-")[0].toUpperCase()}</div>
        </div>
        <div className="detail-actions">
          <StatusBadge code={app.statusCode} />
        </div>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t.id} className={`tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="detail-body">
        <div className="detail-main">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              <Card icon="📌" title="Project Overview">
                <div className="field-grid">
                  <FieldGroup label="Project Title" value={app.project.title} span={2} />
                  <FieldGroup label="Project Type" value={app.project.projectTypeName} />
                  <FieldGroup label="Bank Partner" value={app.bankPartner?.name} />
                  <FieldGroup label="Requested Amount" value={fmt(app.requestedAmount)} />
                  <FieldGroup label="Submitted By" value={`${app.client.firstName} ${app.client.lastName}`} />
                  <FieldGroup label="Submitted At" value={fmtDate(app.submittedAt)} />
                  <FieldGroup label="Created At"   value={fmtDate(app.createdAt)} />
                </div>
                <SectionDiv label="Project Address" />
                <div className="field-grid">
                  <FieldGroup label="Street" value={app.project.address.line1} span={2} />
                  <FieldGroup label="Suburb"   value={app.project.address.suburb} />
                  <FieldGroup label="City"     value={app.project.address.city} />
                  <FieldGroup label="Province" value={app.project.address.stateProvince} />
                  <FieldGroup label="Postal Code" value={app.project.address.postalCode} />
                </div>
                <SectionDiv label="Description" />
                <p style={{ fontSize: "13.5px", color: "var(--txt-2)", lineHeight: "1.65" }}>{app.project.description}</p>
              </Card>

              <Card icon="✅" title="Consents & Declarations">
                <div className="consent-grid">
                  {[
                    ["Information is accurate",             app.consentAccurate],
                    ["Not under debt review",               app.consentNoDebtReview],
                    ["Credit check authorised",             app.consentCreditCheck],
                    ["Employer contact authorised",         app.consentEmployerContact],
                    ["Data transmit authorised",            app.consentTransmit],
                    ["Data share authorised",               app.consentDataShare],
                  ].map(([label, val]) => (
                    <div key={label} className="consent-row">
                      <div className={`consent-check consent-${val ? "yes" : "no"}`}>{val ? "✓" : "✕"}</div>
                      {label}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* ── APPLICANTS TAB ── */}
          {activeTab === "applicants" && (
            <>
              <div className="applicant-tabs">
                {applicants.map((ap, i) => (
                  <div
                    key={ap.bankApplicationApplicantId}
                    className={`applicant-tab${activeApplicant === i ? " active" : ""}`}
                    onClick={() => setActiveApplicant(i)}
                  >
                    <div>{ap.title} {ap.firstName} {ap.lastName}</div>
                    <div className="applicant-tab-role">Member {i + 1}</div>
                  </div>
                ))}
              </div>

              {/* Flags for this applicant */}
              {(a.insolvent || a.firstTimeBuyer || a.foreignTax || a.empStatus === "Temporarily Employed") && (
                <div style={{ marginBottom: "4px" }}>
                  {a.insolvent && <div className="flag-row flag-err">⛔ Applicant is marked as insolvent</div>}
                  {a.firstTimeBuyer && <div className="flag-row flag-warn">⚠️ First-time buyer</div>}
                  {a.foreignTax && <div className="flag-row flag-warn">⚠️ Foreign tax resident — {a.foreignTaxCountry}</div>}
                  {a.empStatus === "Temporarily Employed" && <div className="flag-row flag-warn">⚠️ Temporarily employed</div>}
                </div>
              )}

              {/* Personal Details */}
              <Card icon="👤" title="Personal Details">
                <div className="field-grid">
                  <FieldGroup label="Full Name"  value={`${a.title} ${a.firstName} ${a.lastName}`} />
                  <FieldGroup label="ID Number"  value={a.idNumber} mono />
                  <FieldGroup label="Date of Birth" value={a.dob} />
                  <FieldGroup label="SA Citizen"    value={a.saCitizen ? "Yes" : "No"} />
                  <FieldGroup label="Race"          value={a.race} />
                  <FieldGroup label="Marital Status" value={a.maritalStatus} span={2} />
                  <FieldGroup label="Insolvent"      value={a.insolvent ? "Yes ⚠️" : "No"} />
                  <FieldGroup label="First-Time Buyer" value={a.firstTimeBuyer ? "Yes" : "No"} />
                  <FieldGroup label="Tax Number" value={a.taxNo} mono />
                  <FieldGroup label="Foreign Tax" value={a.foreignTax ? `Yes — ${a.foreignTaxCountry} (${a.foreignTaxId})` : "No"} />
                </div>
                <SectionDiv label="Contact" />
                <div className="field-grid">
                  <FieldGroup label="Email"    value={a.email} />
                  <FieldGroup label="Mobile"   value={a.phone} mono />
                  <FieldGroup label="Home Tel" value={a.telHome} mono />
                  <FieldGroup label="Work Tel" value={a.telWork} mono />
                </div>
                <SectionDiv label="Physical Address" />
                <div className="field-grid">
                  <FieldGroup label="Street"      value={a.addrLine1} span={2} />
                  <FieldGroup label="Suburb"      value={a.addrSuburb} />
                  <FieldGroup label="City"        value={a.addrCity} />
                  <FieldGroup label="Province"    value={a.addrProvince} />
                  <FieldGroup label="Postal Code" value={a.addrPostalCode} mono />
                </div>
                {!a.postalSameAsPhysical && (
                  <>
                    <SectionDiv label="Postal Address" />
                    <div className="field-grid">
                      <FieldGroup label="Street"      value={a.postalLine1} span={2} />
                      <FieldGroup label="Suburb"      value={a.postalSuburb} />
                      <FieldGroup label="City"        value={a.postalCity} />
                      <FieldGroup label="Province"    value={a.postalProvince} />
                      <FieldGroup label="Postal Code" value={a.postalPostalCode} mono />
                    </div>
                  </>
                )}
                {a.postalSameAsPhysical && (
                  <div style={{ fontSize: "12.5px", color: "var(--txt-3)", marginTop: "12px" }}>📌 Postal address same as physical</div>
                )}
              </Card>

              {/* Employment */}
              <Card icon="💼" title="Employment Details">
                <div className="field-grid">
                  <FieldGroup label="Employment Status" value={a.empStatus} />
                  <FieldGroup label="Sector"            value={a.empSector} />
                  <FieldGroup label="Occupation"        value={a.occupation} />
                  {a.empStatus === "Self-Employed" ? (
                    <>
                      <FieldGroup label="Business Name"   value={a.bizName} />
                      <FieldGroup label="Business (Months)" value={a.bizMonths != null ? `${a.bizMonths} months` : null} />
                    </>
                  ) : (
                    <>
                      <FieldGroup label="Employer Name"   value={a.employerName} />
                      <FieldGroup label="Employer Tel"    value={a.employerTel} mono />
                      <FieldGroup label="Length of Service" value={a.lengthService != null ? `${a.lengthService} months` : null} />
                    </>
                  )}
                </div>
              </Card>

              {/* Income & Financials */}
              <Card icon="💰" title="Income & Expenses"
                sub={<span style={{ fontFamily: "var(--font-m)", fontSize: "12px", color: "var(--brand-primary)" }}>
                  Gross: R {(a.incomeGross || 0).toLocaleString("en-ZA")}
                </span>}
              >
                <div className="field-grid" style={{ marginBottom: "20px" }}>
                  <FieldGroup label="Gross Income"    value={fmt(a.incomeGross)} />
                  <FieldGroup label="Net Income"      value={fmt(a.incomeNett)} />
                  <FieldGroup label="Commission"      value={fmt(a.incomeCommission)} />
                  <FieldGroup label="Other Income"    value={fmt(a.incomeOther)} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <SectionDiv label="Monthly Debts" />
                    <FinTable rows={a.debts || []} amtKey="monthlyObligation" label="Debt Type" />
                  </div>
                  <div>
                    <SectionDiv label="Monthly Expenses" />
                    <FinTable rows={a.expenses || []} amtKey="monthlyAmount" label="Expense Type" />
                  </div>
                </div>
                <div style={{ marginTop: "16px", padding: "14px", background: "var(--info-bg)", borderRadius: "var(--r-md)", display: "flex", gap: "24px" }}>
                  <div>
                    <div className="field-label">Total Monthly Debt</div>
                    <div style={{ fontFamily: "var(--font-m)", fontSize: "16px", fontWeight: 700, color: "var(--error)" }}>
                      R {totalDebt.toLocaleString("en-ZA")}
                    </div>
                  </div>
                  <div>
                    <div className="field-label">Total Monthly Expenses</div>
                    <div style={{ fontFamily: "var(--font-m)", fontSize: "16px", fontWeight: 700, color: "var(--warning)" }}>
                      R {totalExp.toLocaleString("en-ZA")}
                    </div>
                  </div>
                  <div>
                    <div className="field-label">Gross Income</div>
                    <div style={{ fontFamily: "var(--font-m)", fontSize: "16px", fontWeight: 700, color: "var(--success)" }}>
                      R {totalInc.toLocaleString("en-ZA")}
                    </div>
                  </div>
                  <div>
                    <div className="field-label">Net Disposable</div>
                    <div style={{ fontFamily: "var(--font-m)", fontSize: "16px", fontWeight: 700, color: (a.incomeNett - totalDebt - totalExp) > 0 ? "var(--success)" : "var(--error)" }}>
                      R {(a.incomeNett - totalDebt - totalExp).toLocaleString("en-ZA")}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Bank Account */}
              <Card icon="🏧" title="Bank Account Details">
                <div className="field-grid">
                  <FieldGroup label="Bank Name"    value={a.bankName} />
                  <FieldGroup label="Account Type" value={a.accType} />
                  <FieldGroup label="Account Number" value={a.accNumber} mono />
                  <FieldGroup label="Branch Code"    value={a.branchCode} mono />
                </div>
              </Card>
            </>
          )}

          {/* ── PROPERTY & LOAN TAB ── */}
          {activeTab === "property" && (
            <>
              <Card icon="🏡" title="Loan Details">
                <div className="field-grid">
                  <FieldGroup label="Applicant Type"   value={ld.applicantType} />
                  <FieldGroup label="Loan Purpose"     value={ld.loanPurpose} />
                  <FieldGroup label="Purchase Price"   value={fmt(ld.purchasePrice)} />
                  <FieldGroup label="Loan Term"        value={ld.loanTerm ? `${ld.loanTerm} years` : null} />
                  <FieldGroup label="Property Type"    value={ld.propertyType} />
                  <FieldGroup label="Property Right"   value={ld.propertyRight} />
                  <FieldGroup label="Primary Residence" value={ld.primaryResidence ? "Yes" : "No"} />
                  <FieldGroup label="Unit Number"      value={ld.propUnit} mono />
                </div>
                <SectionDiv label="Property Address" />
                <div className="field-grid">
                  <FieldGroup label="Street"      value={ld.propLine1} span={2} />
                  <FieldGroup label="Suburb"      value={ld.propSuburb} />
                  <FieldGroup label="City"        value={ld.propCity} />
                  <FieldGroup label="Province"    value={ld.propProvince} />
                  <FieldGroup label="Postal Code" value={ld.propPostalCode} mono />
                </div>
              </Card>

              {ld.applicantType === "Close Corporation" && (
                <Card icon="🏢" title="Entity Details">
                  <div className="field-grid">
                    <FieldGroup label="Entity Name"    value={ld.entityName} />
                    <FieldGroup label="Reg. Number"    value={ld.entityRegNo} mono />
                    <FieldGroup label="VAT Number"     value={ld.entityVat}   mono />
                    <FieldGroup label="Entity Address" value={ld.entityAddress} span={2} />
                  </div>
                  <SectionDiv label="Members / Shareholders" />
                  {(ld.entityMembers || []).map((m, i) => (
                    <div key={i} className="member-row">
                      <div className="member-avatar">{m.fullName.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
                      <div>
                        <div className="member-name">{m.fullName}</div>
                        <div className="member-id">{m.idNumber}</div>
                      </div>
                      <div className="member-pct">{m.holdingPct}%</div>
                    </div>
                  ))}
                </Card>
              )}
            </>
          )}

          {/* ── DOCUMENTS TAB ── */}
          {activeTab === "documents" && (
            <Card icon="📁" title="Supporting Documents">
              {(app.documents || []).map((doc) => (
                <div key={doc.bankApplicationDocumentId} className="doc-item">
                  <div className="doc-icon">📄</div>
                  <div>
                    <div className="doc-name">{doc.fileName}</div>
                    <div className="doc-type">{doc.documentTypeName} · {fmtDate(doc.createdAt)}</div>
                  </div>
                  <a className="doc-link" href={doc.fileUrl} target="_blank" rel="noreferrer">View ↗</a>
                </div>
              ))}
            </Card>
          )}
        </div>

        {/* ── ASIDE — always visible ── */}
        <div className="detail-aside">
          <BankerPanel app={app} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD VIEW
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard({ onOpenApp }) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const FILTERS = ["ALL", "BANK_SUBMITTED", "APPROVED", "PENDING", "DECLINED"];
  const FILTER_LABELS = { ALL: "All", BANK_SUBMITTED: "Submitted", APPROVED: "Approved", PENDING: "Pending", DECLINED: "Declined" };
  const filtered = statusFilter === "ALL" ? SAMPLE_APPLICATIONS : SAMPLE_APPLICATIONS.filter(a => a.status === statusFilter);

  return (
    <div className="dash-content">
      <div className="page-title">Good morning, Banking Partner 👋</div>
      <div className="page-subtitle">First National Bank · Applications Dashboard</div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label: "Total Applications", value: SAMPLE_APPLICATIONS.length, sub: "All time", dot: "#1C3557" },
          { label: "Pending Review",      value: SAMPLE_APPLICATIONS.filter(a => a.status === "BANK_SUBMITTED" || a.status === "PENDING").length, sub: "Requires action", dot: "#B45309" },
          { label: "Approved",            value: SAMPLE_APPLICATIONS.filter(a => a.status === "APPROVED").length, sub: "This month", dot: "#2A7D4F" },
          { label: "Total Exposure",      value: `R ${(SAMPLE_APPLICATIONS.reduce((s, a) => s + a.amount, 0) / 1e6).toFixed(1)}M`, sub: "Across all applications", dot: "#C4622D" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label"><span className="stat-dot" style={{ background: s.dot }} />{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Application List */}
      <div className="section-head">
        <div className="section-title">Applications</div>
        <div className="filter-row">
          {FILTERS.map(f => (
            <button key={f} className={`filter-btn${statusFilter === f ? " active" : ""}`} onClick={() => setStatusFilter(f)}>
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </div>
      <div className="app-table-wrap">
        <table className="app-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Project</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Applicants</th>
              <th>Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(app => (
              <tr key={app.id} onClick={() => onOpenApp(app.id)}>
                <td><span className="app-ref">{app.ref}</span></td>
                <td>
                  <div className="app-project">{app.project}</div>
                  <div className="app-client">{app.client}</div>
                </td>
                <td><span style={{ fontSize: "12px", color: "var(--txt-2)" }}>{app.type}</span></td>
                <td><span style={{ fontFamily: "var(--font-m)", fontSize: "12.5px" }}>R {app.amount.toLocaleString("en-ZA")}</span></td>
                <td><span style={{ fontSize: "13px", color: "var(--txt-2)" }}>{app.applicants}</span></td>
                <td><span style={{ fontSize: "12px", color: "var(--txt-3)" }}>{app.date}</span></td>
                <td><StatusBadge code={app.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function BankerDashboard() {
  const [view, setView] = useState("dashboard"); // "dashboard" | "detail"
  const [navActive, setNavActive] = useState("applications");
  const mainRef = useRef(null);

  const openApp = (id) => {
    setView("detail");
    setNavActive("applications");
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };
  const goBack = () => {
    setView("dashboard");
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="shell">

        {/* Top Header */}
        <div className="top-header">
          <div className="logo">Qub<em>rix</em></div>
          <div className="header-divider" />
          <div className="header-title">Banking Partner Portal</div>
          <div className="header-right">
            <div>
              <div className="header-name">Fred Flintstone</div>
              <div className="header-role">Banking Partner · FNB</div>
            </div>
            <div className="avatar">FF</div>
          </div>
        </div>

        <div className="body-layout">

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-label">Main</div>
            {[
              { id: "dashboard",    icon: "📊", label: "Dashboard" },
              { id: "applications", icon: "📋", label: "Applications", badge: 2 },
            ].map(n => (
              <div
                key={n.id}
                className={`nav-item${navActive === n.id ? " active" : ""}`}
                onClick={() => { setNavActive(n.id); if (n.id === "dashboard") setView("dashboard"); }}
              >
                <span className="nav-icon">{n.icon}</span>
                {n.label}
                {n.badge && <span className="nav-badge">{n.badge}</span>}
              </div>
            ))}

            <div className="sidebar-label">Account</div>
            {[
              { id: "profile",   icon: "👤", label: "Profile & Settings" },
            ].map(n => (
              <div key={n.id} className={`nav-item${navActive === n.id ? " active" : ""}`} onClick={() => setNavActive(n.id)}>
                <span className="nav-icon">{n.icon}</span>
                {n.label}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="main-area" ref={mainRef}>
            {view === "dashboard" && <Dashboard onOpenApp={openApp} />}
            {view === "detail"    && <ApplicationDetail app={APPLICATION} onBack={goBack} />}
          </div>
        </div>
      </div>
    </>
  );
}
