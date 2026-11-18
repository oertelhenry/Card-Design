import React, { useEffect, useMemo, useState } from "react";

/* =============================================================================
   Legacy Vault — "The important things. In one place."
   Pixel template recreated from legacychannel.mp4 (captured at 1388×856,
   app viewport ≈ 1322×743, sidebar 272px, header 64px, content gutter 32px).

   Single-file, dependency-free React. Drop into any React 18 app and render
   <LegacyVault />. Routing is in-memory (see ROUTES) so every screen from the
   recording is reachable from the sidebar and in-page links.
   ============================================================================= */

/* ------------------------------------------------------------------ tokens */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');

.lv{
  --ink:#0b0d12; --ink-2:#2b2d33; --ink-3:#51535a; --ink-4:#7a7c83; --ink-5:#9a9ca2;
  --navy:#020a1d; --night:#00030c; --night-2:#0b0e14; --night-line:rgba(255,255,255,.09);
  --paper:#fcfbf6; --card:#faf8f2; --card-2:#f4f2eb; --line:#e7e3d8; --line-2:#efebe2;
  --gold:#ad8c47; --gold-2:#b18d43; --gold-ink:#6d5520; --gold-bg:#f6ecd3; --gold-line:#e6d3a3;
  --green-bg:#e8f4ed; --green-line:#b8dcc6; --green-ink:#1d4a33; --green-dot:#3f7a58;
  --blue-bg:#eaf1f8; --blue-line:#a9bed8; --blue-ink:#1d3553;
  --amber-bg:#fcf3e2; --amber-line:#ecd6a6;
  --serif:'Fraunces',Georgia,'Times New Roman',serif;
  --sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  --mono:'JetBrains Mono',ui-monospace,Consolas,monospace;
  font-family:var(--sans); color:var(--ink); background:var(--paper);
  font-size:15px; line-height:1.5; -webkit-font-smoothing:antialiased;
}
.lv *{box-sizing:border-box;margin:0;padding:0}
:where(.lv) button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
:where(.lv) input,:where(.lv) select,:where(.lv) textarea{font:inherit;color:inherit}
:where(.lv) a{color:inherit;text-decoration:none}
.lv svg{flex:none}

/* ---------------------------------------------------------------- shell */
.lv-app{display:flex;height:100vh;overflow:hidden}
.lv-side{width:272px;flex:none;background:var(--night);color:#fff;display:flex;flex-direction:column;position:relative}
.lv-side-scroll{flex:1;overflow-y:auto;padding:28px 12px 0 12px;scrollbar-width:thin;scrollbar-color:#3a3d44 transparent}
.lv-brand{display:flex;gap:12px;align-items:center;padding:0 12px 0 12px;margin-bottom:28px}
.lv-brand-mark{width:40px;height:40px;border-radius:6px;border:1px solid rgba(173,140,71,.55);background:linear-gradient(145deg,#141614,#07090c);display:grid;place-items:center;color:var(--gold)}
.lv-brand-name{font-family:var(--serif);font-weight:600;font-size:15.5px;letter-spacing:.2em;line-height:1}
.lv-brand-tag{font-size:9.5px;letter-spacing:.17em;text-transform:uppercase;color:rgba(255,255,255,.78);line-height:10px;margin-top:5px;font-weight:500}
.lv-side-rule{height:1px;background:var(--night-line);margin:0 12px 22px}
.lv-side-label{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8b8f98;padding:0 12px;margin-bottom:8px}
.lv-nav{display:flex;flex-direction:column;gap:2px}
.lv-nav-item{position:relative;display:flex;align-items:center;gap:12px;height:40px;padding:0 12px 0 20px;border-radius:6px;color:#e9eaec;font-size:15px;text-align:left;width:100%}
.lv-nav-item:hover{background:#0e1218}
.lv-nav-item.is-active{background:#1b1f26;color:#fff}
.lv-nav-item.is-active:before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:2px;border-radius:2px;background:var(--gold)}
.lv-nav-item svg{color:#d6d7da}
.lv-nav-badge{margin-left:auto;width:22px;height:22px;border-radius:50%;background:#2a2b2b;color:#d8c08a;font-size:11.5px;display:grid;place-items:center}
.lv-private{margin:34px 0 20px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:var(--night-2);padding:16px 16px 18px}
.lv-private h6{display:flex;gap:8px;align-items:center;color:var(--gold-2);font-size:11.5px;letter-spacing:.16em;font-weight:500;margin-bottom:8px}
.lv-private p{color:#d8d9dc;font-size:12.5px;line-height:1.55}
.lv-user{height:80px;flex:none;border-top:1px solid var(--night-line);display:flex;align-items:center;gap:12px;padding:0 20px 0 19px;background:var(--night)}
.lv-avatar-photo{width:38px;height:38px;border-radius:50%;background:radial-gradient(circle at 50% 38%,#e9e2d6 0 22%,#9b8f82 23% 40%,#3a3a3e 41%);border:1px solid rgba(255,255,255,.2)}
.lv-user b{display:block;font-size:15px;font-weight:600}
.lv-user small{display:block;font-size:12px;color:#a7a9ae}
.lv-user .lv-kebab{margin-left:auto;color:#cfd0d3}

.lv-main{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden}
.lv-top{height:64px;flex:none;display:flex;align-items:center;gap:12px;padding:0 32px;border-bottom:1px solid var(--line-2);background:var(--paper)}
.lv-search{width:384px;height:36px;border:1px solid #e1ddd2;background:#f3f1ea;border-radius:6px;display:flex;align-items:center;gap:10px;padding:0 12px;color:#8b8c90}
.lv-search input{border:0;background:transparent;outline:0;flex:1;font-size:15px}
.lv-search input::placeholder{color:#8b8c90}
.lv-top-sp{flex:1}
.lv-bell{position:relative;width:36px;height:36px;border:1px solid var(--line);border-radius:6px;display:grid;place-items:center;background:var(--paper)}
.lv-bell:after{content:"";position:absolute;top:7px;right:8px;width:6px;height:6px;border-radius:50%;background:var(--gold)}
.lv-scroll{flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#8f9094 transparent}
.lv-page{padding:40px 32px 0}
.lv-foot{margin-top:40px;border-top:1px solid var(--line-2);height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;font-size:13px;color:var(--ink-3)}
.lv-foot span{display:flex;gap:8px;align-items:center}

/* ---------------------------------------------------------------- type */
.eyebrow{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#6e5c30;font-weight:500}
.eyebrow.muted{color:var(--ink-3)}
.h1{font-family:var(--serif);font-weight:500;font-size:42px;line-height:44px;letter-spacing:-.012em;color:var(--ink)}
.h2{font-family:var(--serif);font-weight:500;font-size:25px;line-height:1.2;letter-spacing:-.01em}
.h3{font-family:var(--serif);font-weight:500;font-size:20px;line-height:1.25}
.h4{font-family:var(--serif);font-weight:600;font-size:16px;line-height:1.3}
.lead{font-size:15px;line-height:23px;color:#45474d}
.body{font-size:14px;line-height:21px;color:#45474d}
.small{font-size:12.5px;line-height:19px;color:var(--ink-3)}
.tiny{font-size:12px;color:var(--ink-3)}
.num{font-family:var(--serif);font-weight:500;font-size:26px;line-height:1.1;font-variant-numeric:oldstyle-nums}

/* ---------------------------------------------------------------- blocks */
.page-head{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;padding-bottom:28px;border-bottom:1px solid var(--line);margin-bottom:32px}
.page-head .eyebrow{margin-bottom:12px}
.page-head .lead{margin-top:12px;max-width:664px}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px}
.card.pad{padding:28px}
.card.soft{background:var(--card-2)}
.row{display:flex;align-items:center}
.gap4{gap:4px}.gap6{gap:6px}.gap8{gap:8px}.gap10{gap:10px}.gap12{gap:12px}.gap16{gap:16px}.gap24{gap:24px}
.between{justify-content:space-between}
.col2{display:grid;grid-template-columns:minmax(0,1fr) 308px;gap:24px;align-items:start}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.stack>*+*{margin-top:24px}
.mt4{margin-top:4px}.mt8{margin-top:8px}.mt12{margin-top:12px}.mt16{margin-top:16px}.mt20{margin-top:20px}.mt24{margin-top:24px}.mt32{margin-top:32px}.mt40{margin-top:40px}
.hr{height:1px;background:var(--line);border:0}

.stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);border-radius:8px;background:var(--card)}
.stats>div{padding:24px 24px 26px}
.stats>div+div{border-left:1px solid var(--line)}
.stats .eyebrow{color:#4f5157;margin-bottom:12px}
.stats .num{font-size:26px}
.stats .tiny{margin-top:8px}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:44px;padding:0 17px;border-radius:6px;font-size:15px;font-weight:600;white-space:nowrap}
.btn.sm{height:36px;padding:0 13px;font-size:13.5px;font-weight:500;gap:8px}
.btn-dark{background:var(--navy);color:#fff}
.btn-dark:hover{background:#0d1a33}
.btn-dark:disabled{background:#8a8d93;cursor:default}
.btn-gold{background:var(--gold);color:#1a1307;font-weight:500}
.btn-ghost-dark{border:1px solid rgba(255,255,255,.28);color:#fff}
.btn-line{border:1px solid var(--line);background:var(--paper);color:var(--ink);font-weight:500}
.btn-line:hover{border-color:#cfc9bb}
.link{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;flex:none;font-size:15px;font-weight:500;color:var(--ink)}
.link.sm{font-size:13px}
.link:hover{text-decoration:underline;text-underline-offset:3px}

/* chips */
.chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 9px;border-radius:5px;font-size:11.5px;font-weight:500;border:1px solid transparent;white-space:nowrap}
.chip.pill{border-radius:999px;height:32px;padding:0 14px;font-size:12.5px}
.chip.green{background:var(--green-bg);border-color:var(--green-line);color:var(--green-ink)}
.chip.gold{background:var(--gold-bg);border-color:var(--gold-line);color:var(--gold-ink)}
.chip.blue{background:var(--blue-bg);border-color:#c9d6e6;color:var(--blue-ink)}
.chip.plain{background:var(--card-2);border-color:var(--line);color:var(--ink-2)}
.chip.paper{background:var(--paper);border-color:var(--line);color:var(--ink-2)}
.chip.dark-gold{background:rgba(173,140,71,.15);border-color:rgba(173,140,71,.55);color:#f0d9a2}
.chip .dot{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.8}
.prio{height:24px;padding:0 10px;border-radius:999px;font-size:10.5px;letter-spacing:.12em;font-weight:600;display:inline-flex;align-items:center;border:1px solid}
.prio.high{background:var(--gold-bg);border-color:var(--gold-line);color:#6b521c}
.prio.medium{background:var(--green-bg);border-color:var(--green-line);color:var(--green-ink)}
.prio.low{background:var(--paper);border-color:var(--line);color:var(--ink-3)}
.tag{display:inline-flex;height:26px;align-items:center;padding:0 9px;border-radius:5px;background:#f3efe6;border:1px solid var(--line);font-size:12px;color:var(--ink-2)}
.tag.green{background:#dff0e6;border-color:#dff0e6;color:#1d4a33;height:22px;font-size:11.5px}

.notice{display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:8px;border:1px solid var(--green-line);background:var(--green-bg);color:#1f2a24;font-size:15px;line-height:23px}
.notice.sm{font-size:13px;line-height:19px;padding:13px 16px}
.notice.amber{border-color:var(--amber-line);background:var(--amber-bg);color:#3a2e14}
.notice.blue{border-color:#c9d6e6;background:var(--blue-bg)}
.notice .x{margin-left:auto;color:var(--ink-3)}

.icon-box{width:36px;height:36px;border-radius:6px;border:1px solid var(--line);background:#f5f1e8;display:grid;place-items:center;color:var(--ink-2)}
.icon-box.lg{width:44px;height:44px}
.icon-round{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--line);background:#f5f1e8;color:var(--ink-2)}
.icon-round.green{background:#e6f3ec;border-color:#bfdfcb;color:#1d4a33}
.icon-round.gold{background:#fbf0d8;border-color:#ecd7a6;color:#6b521c}
.icon-round.blue{background:#e8f0f9;border-color:#bccde2;color:#1d3553}
.initials{width:40px;height:40px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:12.5px;font-weight:600;position:relative;flex:none}
.initials.serif{font-family:var(--serif);font-size:14px;font-weight:500}
.initials.light{background:#f1ede4;color:var(--ink-2);border:1px solid var(--line)}
.initials.xl{width:48px;height:48px;font-size:14px}
.initials .ok{position:absolute;right:-3px;bottom:-3px;width:16px;height:16px;border-radius:50%;background:#3f7a58;border:2px solid var(--card);display:grid;place-items:center;color:#fff}
.initials .shield{position:absolute;right:-4px;bottom:-4px;width:17px;height:17px;border-radius:50%;background:#9f8144;border:2px solid var(--card);display:grid;place-items:center;color:#fff}

.progress{height:6px;border-radius:6px;background:#ebe7de;overflow:hidden}
.progress>i{display:block;height:100%;background:var(--navy);border-radius:6px}
.progress.gold>i{background:var(--gold)}

.toggle{flex:none;width:36px;height:20px;border-radius:999px;background:#e3dfd6;border:1px solid #d9d4c9;position:relative;transition:background .15s}
.toggle:after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:left .15s}
.toggle.on{background:var(--navy);border-color:var(--navy)}
.toggle.on:after{left:18px}
.toggle.dim{opacity:.55}
.toggle.muted.on{background:#6d7078;border-color:#6d7078}

.radio{width:18px;height:18px;border-radius:50%;border:1px solid #cdc8bd;background:var(--paper);display:grid;place-items:center;flex:none}
.radio.on{background:var(--navy);border-color:var(--navy);color:#fff}
.radio.gold.on{background:var(--gold);border-color:var(--gold)}

.list-row{display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-top:1px solid var(--line)}
.list-row:first-child{border-top:0}

.field label{display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);margin-bottom:10px}
.input{width:100%;height:40px;border:1px solid var(--line);border-radius:6px;background:var(--paper);padding:0 12px;font-size:15px;outline:0}
.input:focus{border-color:#a9bed8}
.input::placeholder{color:#8f9095}
textarea.input{height:auto;padding:12px 14px;resize:none;line-height:20px}

.seg{display:inline-flex;padding:3px;border-radius:999px;background:var(--card-2);border:1px solid var(--line)}
.seg button{height:32px;padding:0 12px;border-radius:999px;font-size:13px;font-weight:500;color:var(--ink-2)}
.seg button.on{background:var(--navy);color:#fff}

.tabs{display:flex;align-items:center;gap:4px;height:42px;padding:0 6px;border:1px solid var(--line);background:var(--card);border-radius:8px}
.tabs button{height:32px;padding:0 16px;border-radius:999px;font-size:15px;color:var(--ink-2)}
.tabs button.on{background:var(--navy);color:#fff;font-weight:500}

.filter{height:34px;display:inline-flex;align-items:center;gap:8px;padding:0 10px 0 14px;border:1px solid var(--line);background:var(--paper);border-radius:999px;font-size:13px;color:var(--ink-2)}
.filter .count{min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:#efebe2;font-size:11px;display:grid;place-items:center}
.filter.on{background:var(--navy);border-color:var(--navy);color:#fff;font-weight:500}
.filter.on .count{background:#2a3246;color:#fff}

/* timeline */
.tl{position:relative}
.tl-item{position:relative;display:grid;grid-template-columns:40px 1fr;gap:16px;padding-bottom:26px}
.tl-item:not(:last-child):before{content:"";position:absolute;left:19px;top:42px;bottom:0;width:1px;background:var(--line)}
.meta-chip{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 9px;border-radius:5px;border:1px solid var(--line);background:#f5f1e8;font-size:11.5px;color:var(--ink-2)}
.meta-chip.white{background:var(--paper)}
.meta-chip.mono{font-family:var(--sans)}

/* dark hero */
.hero{background:var(--night);color:#fff;border-radius:8px;position:relative;overflow:hidden}
.hero .eyebrow{color:#9fb5d8}
.hero .lead{color:#e7e9ee}
.hero .lbl{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8ea6cd;margin-bottom:8px}
.hero .val{font-size:15px;font-weight:500}
.hero .sub{font-size:11.5px;color:#c6cedc;margin-top:2px}
.hero-inner{border:1px solid rgba(255,255,255,.08);border-radius:6px;background:#01050f;padding:16px 20px;display:flex;align-items:center;gap:12px;font-size:13px;color:#e7e9ee}

/* overlay */
.overlay{position:fixed;inset:0;background:rgba(18,20,24,.45);display:grid;place-items:center;z-index:50;padding:32px}
.modal{background:var(--paper);border-radius:8px;box-shadow:0 30px 80px rgba(0,0,0,.35);max-height:calc(100vh - 64px);overflow:auto}
.modal-x{width:36px;height:36px;border:1px solid var(--line);border-radius:6px;display:grid;place-items:center;background:var(--paper)}

.opt{display:flex;align-items:center;gap:12px;height:42px;padding:0 20px;border:1px solid var(--line);border-radius:6px;background:var(--paper);font-size:15px;color:var(--ink-2);text-align:left;width:100%}
.opt.on{background:var(--blue-bg);border-color:var(--blue-line);color:var(--ink)}
.select-card{border:1px solid var(--line);border-radius:8px;background:var(--paper);text-align:left;width:100%}
.select-card.on{background:var(--blue-bg);border-color:var(--blue-line)}
.select-card:hover{border-color:#cfc9bb}
.select-card.on:hover{border-color:var(--blue-line)}

.acc{border:1px solid var(--line);border-radius:6px;background:var(--paper);overflow:hidden}
.acc+.acc{margin-top:10px}
.acc-head{display:flex;align-items:center;gap:14px;padding:16px;width:100%;text-align:left}
.acc-body{border-top:1px solid var(--line);padding:22px 16px 18px;background:#f8f6ef}

.kv{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;padding:5px 0}
.kv span{color:var(--ink-3)}
.kv b{font-weight:500;color:var(--ink)}

.mono{font-family:var(--mono);font-size:11.5px;letter-spacing:.02em}

/* home: inventory tiles + recent activity */
.cat-tile{display:block;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:20px 20px 19px;transition:background .12s,border-color .12s}
.cat-row:hover{background:#f4f1e9}
.cat-tile:hover{background:#f3f1ea;border-color:#d6d1c5}
.cat-tile .arrow{color:#9a9ca2}
.cat-tile:hover .arrow{color:var(--ink)}
.cat-tile .meta{display:flex;gap:10px;margin-top:10px;font-size:11.5px;color:var(--ink-2)}
.cat-tile .meta i{display:inline-block;width:5px;height:5px;border-radius:50%;margin-right:5px;vertical-align:2px}
.activity{position:relative}
.activity-row{position:relative;display:grid;grid-template-columns:40px 1fr auto;column-gap:16px;padding-bottom:31px}
.activity-row:last-child{padding-bottom:0}
.activity-row:not(:last-child):before{content:"";position:absolute;left:19.5px;top:40px;bottom:0;width:1px;background:var(--line)}
.activity-row .icon-round{width:40px;height:40px}
`;

/* ------------------------------------------------------------------- icons */
const P = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  inventory: "M5 3h14v18H5zM9 7h6M9 11h6M9 15h4",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  pack: "M8 7h11v14H8zM5 17V4h11M11 11h5M11 15h5",
  shield: "M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z",
  shieldCheck: "M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10zM9 12l2 2 4-4",
  siren: "M7 18v-6a5 5 0 0 1 10 0v6M5 21h14v-3H5zM12 3v1M20.5 6.5l-.7.7M3.5 6.5l.7.7M22 12h-1M3 12H2",
  history: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l4 2",
  folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18",
  mailOpen: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0zM22 10l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  unlock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 7.9-1",
  check: "M20 6 9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  circleCheck: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9 12l2 2 4-4",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  arrowUpRight: "M7 17 17 7M7 7h10v10",
  tag: "M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4zM7.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
  key: "M2.6 18.4 2 22h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4zM16.5 7.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
  route: "M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 16h6.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H15M18 5a3 3 0 1 0 0-.01",
  eyeOff: "M9.9 4.2A10.4 10.4 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2M6.6 6.6A18 18 0 0 0 2 11s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6M14.1 14.1a3 3 0 0 1-4.2-4.2M2 2l20 20",
  filePdf: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 17l2-5 2 5M9 15.5h2",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.2 13.9 7 22l5-3 5 3-1.2-8.1",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  plusCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v8M8 12h8",
  chevronRight: "m9 18 6-6-6-6",
  chevronDown: "m6 9 6 6 6-6",
  chevronUp: "m18 15-6-6-6 6",
  calendarCheck: "M3 5h18v16H3zM16 3v4M8 3v4M3 10h18M9 15l2 2 4-4",
  plus: "M12 5v14M5 12h14",
  landmark: "M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z",
  shieldStar: "M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10zM12 8l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z",
  house: "M3 10.5 12 3l9 7.5V21H3zM9 21v-6h6v6",
  car: "M5 17h14v-5l-2-5H7l-2 5zM5 12h14M7 17v2M17 17v2M8 14.5h.01M16 14.5h.01",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z",
  userHeart: "M14 19a6 6 0 0 0-12 0M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 21s-3-1.8-3-4a1.5 1.5 0 0 1 3-.5 1.5 1.5 0 0 1 3 .5c0 2.2-3 4-3 4z",
  handHeart: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9M2 15l6 6M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12z",
  timer: "M10 2h4M12 14l3-3M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  scale: "M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  fingerprint: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4M14 13.12c0 2.38 0 6.38-1 8.88M17.29 21.02c.12-.6.43-2.3.5-3.02M2 12a10 10 0 0 1 18-6M2 16h.01M21.8 16c.2-2 .131-5.354 0-6M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2M8.65 22c.21-.66.45-1.32.57-2M9 6.8a6 6 0 0 1 9 5.2v2",
  zap: "M13 2 3 14h9l-1 8 10-12h-9z",
  footprints: "M4 16v-2.38C4 11.5 3 10.5 3 8c0-2.7 1.5-6 4.5-6C9.4 2 10 3.8 10 5.5c0 3.1-2 5.7-2 8.7V16a2 2 0 1 1-4 0zM20 20v-2.38c0-2.12 1-3.12 1-5.62 0-2.7-1.5-6-4.5-6C14.6 6 14 7.8 14 9.5c0 3.1 2 5.7 2 8.7V20a2 2 0 1 0 4 0zM16 17h4M4 13h4",
  undo: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
  x: "M18 6 6 18M6 6l12 12",
  xCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15 9l-6 6M9 9l6 6",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01",
  heart: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z",
  heartPulse: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7zM3.2 12h5.3l1-2 2 4 1-2h8.3",
  stethoscope: "M5 3v6a4 4 0 0 0 8 0V3M9 13v2a5 5 0 0 0 10 0v-2M19 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  contact: "M5 3h14v18H5zM12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8 17a4 4 0 0 1 8 0",
  paw: "M11 5a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM17 5a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM21 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM7 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM12 12c-3 0-6 4-6 6.5 0 1.5 1.3 2.5 3 2.5 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.7 0 3-1 3-2.5C18 16 15 12 12 12z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  alert: "M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
  alertCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  pencil: "M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z",
  mailPlus: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7M19 16v6M16 19h6",
  mail: "M2 4h20v16H2zM22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
  userPlus: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  userX: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 8l5 5M22 8l-5 5",
  idCard: "M3 5h18v14H3zM7 11a2 2 0 1 0 0-.01M5 16c.5-1.5 1.5-2 2-2s1.5.5 2 2M13 10h5M13 14h4",
  bulb: "M15 14c.2-1 .7-1.7 1.5-2.5A4.9 4.9 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4",
  help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01",
  copy: "M8 8h12v12H8zM4 16V4h12",
  printer: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
  listChecks: "M10 6h11M10 12h11M10 18h11M3 6l1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2",
  listTodo: "M3 5h6v6H3zM13 6h8M13 12h8M13 18h8M3 17l2 2 4-4",
  tools: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76zM3 3l6 6",
  more: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  toggle: "M7 7h10a5 5 0 0 1 0 10H7A5 5 0 0 1 7 7zM8 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  chart: "M3 3v18h18M7 14l4-4 4 4 5-5",
  baby: "M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  sealed: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4M14 2v6h6v3M18 22s3-1.3 3-3.8V15l-3-1-3 1v3.2c0 2.5 3 3.8 3 3.8z",
  receipt: "M4 3h16v18l-3-2-2 2-3-2-3 2-2-2-3 2zM8 8h8M8 12h8",
  hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  signIn: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  doubleCheck: "M18 6 7 17l-5-5M22 10l-7.5 7.5L13 16",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  laptop: "M4 5h16v11H4zM2 20h20",
  smartphone: "M7 2h10v20H7zM11 18h2",
  briefcase: "M2 7h20v14H2zM16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3M2 13h20",
  feather: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8 2 22M17.5 15H9",
};

function Icon({ name, size = 16, stroke = 1.7, style, className }) {
  const d = P[name] || P.info;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      {d.split("M").filter(Boolean).map((seg, i) => <path key={i} d={"M" + seg} />)}
    </svg>
  );
}

/* -------------------------------------------------------------------- data */
const PEOPLE = [
  { id: "sarah", ini: "SV", name: "Sarah Venter", rel: "Spouse", role: "Primary contact", relIcon: "heart", email: "sarah.venter@gmail.com", phone: "+27 82 555 0198", status: "Verified", canRequest: true, access: ["Financial", "Insurance", "Property", "Vehicles", "Funeral", "Personal"], note: "Emergency information immediately; everything else after verification.", added: "12 Sep 2026", channel: "Email and SMS" },
  { id: "jane", ini: "JS", name: "Jane Smith", rel: "Executor", role: "Executor of the estate", relIcon: "scale", email: "jane.smith@abcatternreys.co.za", phone: "+27 21 424 8890", status: "Verified", canRequest: true, access: ["Financial", "Property", "Documents", "Vehicles"], note: "Estate information and legal documents once verification is complete.", added: "08 Sep 2026", channel: "Email" },
  { id: "michael", ini: "MV", name: "Michael Venter", rel: "Child", role: "Beneficiary", relIcon: "baby", email: "michael.venter@outlook.com", phone: "+27 83 220 7741", status: "Verified", canRequest: false, access: ["Personal", "Documents"], note: "Personal message and selected documents only, released last of all.", added: "14 Sep 2026", channel: "Email" },
  { id: "adele", ini: "AF", name: "Adele Fourie", rel: "Financial adviser", role: "Wealth adviser", relIcon: "chart", email: "adele.fourie@investec.co.za", phone: "+27 11 286 9104", status: "Verified", canRequest: false, access: ["Financial", "Insurance"], note: "Financial and insurance summaries after verification.", added: "10 Sep 2026", channel: "Email" },
  { id: "emma", ini: "EN", name: "Emma Naidoo", rel: "Sibling", role: "Backup contact", relIcon: "users", email: "emma.naidoo@gmail.com", phone: "+27 84 771 3320", status: "Awaiting confirmation", canRequest: false, access: ["Personal"], note: "Family information and the personal message only.", added: "25 Sep 2026", channel: "Email and SMS" },
];

const CATEGORIES = [
  { key: "Financial", icon: "landmark", desc: "Bank accounts, investments, retirement annuities, savings, credit cards and loans.", have: 4, of: 8, pct: 50, linked: 3, todo: 1, assigned: 3, level: "verified" },
  { key: "Insurance", icon: "shieldStar", desc: "Life insurance, funeral policies, short-term insurance, medical aid and disability cover.", have: 4, of: 5, pct: 80, linked: 3, todo: 1, assigned: 3, level: "verified" },
  { key: "Property", icon: "house", desc: "Primary residence, investment properties, holiday homes, land and rental properties.", have: 2, of: 3, pct: 67, linked: 1, todo: 1, assigned: 2, level: "verified" },
  { key: "Vehicles", icon: "car", desc: "Cars, motorcycles, boats and any finance agreements attached to them.", have: 2, of: 3, pct: 67, linked: 1, todo: 1, assigned: 1, level: "verified" },
  { key: "Documents", icon: "fileText", desc: "Will, trust documents, deeds, contracts, marriage and birth certificates.", have: 3, of: 6, pct: 50, linked: 2, todo: 1, assigned: 3, level: "locked" },
  { key: "Digital", icon: "globe", desc: "Email, social media, cloud storage, password manager, domains and digital businesses.", have: 3, of: 6, pct: 50, linked: 2, todo: 1, assigned: 3, level: "locked" },
  { key: "Personal", icon: "userHeart", desc: "Personal wishes, important contacts, pets, family information and messages.", have: 3, of: 5, pct: 60, linked: 2, todo: 1, assigned: 2, level: "personal" },
  { key: "Funeral", icon: "handHeart", desc: "Funeral policy, funeral wishes, preferred home and burial or cremation preferences.", have: 2, of: 4, pct: 50, linked: 1, todo: 1, assigned: 1, level: "emergency" },
];
const catIcon = (k) => (CATEGORIES.find((c) => c.key === k) || {}).icon || "fileText";

/* Release levels: chip on item rows, badge + explainer used on category/person pages */
const LEVELS = {
  verified: { chip: "green", icon: "shield", label: "Released", badge: "Released after verification", note: "Released once the verification process is complete." },
  emergency: { chip: "gold", icon: "zap", label: "Emergency", badge: "Emergency information", note: "May be released quickly to your nominated contacts." },
  locked: { chip: "blue", icon: "lock", label: "Released", badge: "Released separately", note: "Held back and released on its own schedule, after review." },
  personal: { chip: "paper", icon: "mailOpen", label: "Personal", badge: "Personal & private", note: "Only released to the specific people you choose, last of all." },
};
const LevelChip = ({ level, badge }) => {
  const l = LEVELS[level];
  return <span className={`chip ${l.chip}`} style={{ height: 26 }}><Icon name={l.icon} size={12} />{badge ? l.badge : l.label}</span>;
};

/* Inventory items per category: [name, provider · type, linked?, assigned to, release level, updated] */
const ITEMS = {
  Financial: [
    ["Discovery Bank", "Discovery Bank · Private Cheque Account", true, "Sarah Venter", "verified", "30 Sep 2026"],
    ["Old Mutual Investment Account", "Old Mutual Wealth · Unit Trust Portfolio", true, "Sarah Venter", "verified", "26 Sep 2026"],
    ["Sanlam Retirement Annuity", "Sanlam · Retirement Annuity", false, null, "verified", "18 Sep 2026"],
    ["Investec Credit Card", "Investec Private Bank · Credit Card", true, "Jane Smith (Executor)", "verified", "12 Sep 2026"],
  ],
  Insurance: [
    ["Old Mutual Life Policy", "Old Mutual · Whole Life Cover", true, "Sarah Venter", "verified", "29 Sep 2026"],
    ["AVBOB Funeral Policy", "AVBOB · Family Funeral Plan", true, "Sarah Venter", "emergency", "29 Sep 2026"],
    ["Discovery Health Medical Scheme", "Discovery Health · Classic Comprehensive", true, "Sarah Venter", "emergency", "20 Sep 2026"],
    ["Santam Short-Term Insurance", "Santam · Personal Lines Cover", false, null, "verified", "14 Sep 2026"],
  ],
  Property: [
    ["Primary Residence — Constantia", "Deeds Office, Cape Town · Freehold Residential", true, "Sarah Venter", "verified", "30 Sep 2026"],
    ["Investment Property — Sea Point", "Deeds Office, Cape Town · Sectional Title Apartment", false, "Sarah Venter", "verified", "11 Sep 2026"],
  ],
  Vehicles: [
    ["BMW X5 — CA 447 192", "eNatis / Licensing · Owned outright", true, "Michael Venter", "verified", "27 Sep 2026"],
    ["Vehicle Finance Agreement", "WesBank · Instalment Sale Agreement", false, null, "verified", "05 Sep 2026"],
  ],
  Documents: [
    ["Last Will and Testament", "ABC Attorneys · Original signed will", true, "Jane Smith (Executor)", "emergency", "30 Sep 2026"],
    ["Venter Family Trust Deed", "ABC Attorneys · Trust Deed", false, "Jane Smith (Executor)", "locked", "09 Sep 2026"],
    ["Marriage Certificate", "Department of Home Affairs · Certified copy", true, "Sarah Venter", "verified", "22 Sep 2026"],
  ],
  Digital: [
    ["Primary Email Account", "Google · Google Workspace", true, "Sarah Venter", "locked", "28 Sep 2026"],
    ["Password Manager (1Password)", "1Password · Family account", true, "Sarah Venter", "locked", "28 Sep 2026"],
    ["Registered Domains", "Registrar details missing · Domain portfolio", false, "Michael Venter", "locked", "07 Sep 2026"],
  ],
  Personal: [
    ["Personal Wishes", "Legacy Vault · Written wishes", true, "Sarah Venter", "personal", "30 Sep 2026"],
    ["Family Pets", "Legacy Vault · Care arrangement", true, "Sarah Venter", "personal", "19 Sep 2026"],
    ["Important Contacts", "Legacy Vault · Contact directory", false, null, "personal", "02 Sep 2026"],
  ],
  Funeral: [
    ["Funeral Wishes", "Legacy Vault · Written wishes", true, "Sarah Venter", "emergency", "30 Sep 2026"],
    ["Preferred Funeral Home", "Not yet recorded · Preferred provider", false, null, "emergency", "01 Sep 2026"],
  ],
};
/* Item ids match the live URLs (/inventory/item/fin-discovery …); others are derived from the name */
const ITEM_IDS = { "Discovery Bank": "fin-discovery", "Old Mutual Investment Account": "fin-oldmutual", "Sanlam Retirement Annuity": "fin-sanlam-ra", "Investec Credit Card": "fin-investec-card" };
const itemId = (cat, name) => ITEM_IDS[name] || `${cat.slice(0, 3).toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
/* Detail pages seen in the recording: type, reference (masked?), contact, phone, beneficiary, what to do, notes, documents, contacts recorded */
const ITEM_DETAILS = {
  "fin-discovery": { type: "Private Cheque Account", ref: "4471", masked: true, contact: "Private Client Desk", phone: "+27 11 554 3000", beneficiary: "Sarah Venter", todo: "Notify the bank of the passing and request the estate account details. A certified death certificate and the executor's letter of appointment are required.", notes: "Joint access arrangement exists with Sarah on the savings pocket only.", docs: 2, contacts: 1 },
  "fin-oldmutual": { type: "Unit Trust Portfolio", ref: "OM-88213-04", contact: "Wealth Advisory — Xolani Mbeki", phone: "+27 21 509 1200", beneficiary: "Sarah Venter", todo: "Contact the adviser to begin the cession process. Portfolio statement dated within 30 days is attached.", notes: "Adviser holds a copy of the original mandate.", docs: 3, contacts: 2 },
  "fin-sanlam-ra": { type: "Retirement Annuity", ref: null, contact: null, phone: null, beneficiary: null, todo: "Add the broker's name and policy number so the executor can process the claim.", notes: "Policy number is in the 2023 tax certificate stored with the will.", docs: 0, contacts: 0 },
  "fin-investec-card": { type: "Credit Card", ref: "9028", masked: true, contact: "Private Banker — Adele Fourie", phone: "+27 11 286 9000", beneficiary: "Jane Smith (Executor)", todo: "Notify Investec of the passing so the card is stopped and the outstanding balance is settled from the estate.", notes: "Outstanding balance is covered by the liquidity policy.", docs: 1, contacts: 1 },
};
const CAT_DEFAULT = { Financial: "verified", Insurance: "verified", Property: "verified", Vehicles: "verified", Documents: "locked", Digital: "locked", Personal: "personal", Funeral: "emergency" };

const TASKS = [
  { t: "Add life insurance policy", d: "Record the policy number, claims contact and nominated beneficiary.", p: "high" },
  { t: "Add executor", d: "Confirm the executor and give them permission to initiate the process.", p: "high" },
  { t: "Upload the will", d: "Record where the original is held so it can be found quickly.", p: "high" },
  { t: "Add funeral wishes", d: "Note the funeral home and any specific preferences.", p: "medium" },
  { t: "Assign spouse to financial information", d: "Choose exactly which financial items Sarah may receive.", p: "medium" },
  { t: "Record location of original documents", d: "Note the strongroom or safe where originals are kept.", p: "low" },
];

const ESSENTIALS = [
  { t: "Medical aid details", d: "Scheme, membership number and the 24 hour member services line.", c: "Insurance", icon: "heartPulse", on: true, tag: "Emergency information" },
  { t: "Treating doctor & medication", d: "Who treats you, current prescriptions and known allergies.", c: "Personal", icon: "stethoscope", on: true, tag: "Emergency information" },
  { t: "Funeral policy & wishes", d: "The AVBOB policy number and your written funeral wishes.", c: "Funeral", icon: "handHeart", on: true, tag: "Emergency information" },
  { t: "Insurance overview", d: "Life and short-term cover, with the claim line for each policy.", c: "Insurance", icon: "shieldStar", on: true, tag: "Emergency information" },
  { t: "Emergency & financial contacts", d: "Your private banker, adviser and the people to call first.", c: "Financial", icon: "contact", on: true, tag: "Emergency information" },
  { t: "Location of the will & executor", d: "Where the original is held and how to reach the executor.", c: "Documents", icon: "fileText", on: false, tag: "Emergency information" },
  { t: "Pets care arrangement", d: "Bella and Milo's routine, medication and vet details.", c: "Personal", icon: "paw", on: false, tag: "Emergency information" },
  { t: "Home access & essentials", d: "Who holds spare keys and where household essentials are kept.", c: "Property", icon: "house", on: false, tag: "After verification" },
];

/* Access history: [time, kind, title, body, who, whoRole, ref, action|null, iconTone, icon, changedHands] */
const JV = ["John Venter", "Owner"], LVS = ["Legacy Vault", "System"], RO = ["Release officer", "Officer 2290"];
const H = (at, kind, title, body, [who, whoRole], ref, action, tone, icon, changed) => ({ at, kind, title, body, who, whoRole, ref, action, tone, icon, changed: !!changed });
const HISTORY = [
  { date: "18 October 2026", events: [
    H("18 OCT 2026, 11:22", "release", "Trust deed released separately to Jane Smith", "The Venter Family Trust Deed (1 item) was released on its own schedule after a separate review.", LVS, "LV-RL-2292", "View the released file", "blue", "lock", 1),
    H("18 OCT 2026, 11:18", "release", "Verified information released to Jane Smith", "Financial, property, vehicle and document information (6 items) released after verification.", LVS, "LV-RL-2292", "View the released file", "gold", "shieldCheck", 1),
    H("18 OCT 2026, 11:16", "release", "Emergency information released to Jane Smith", "The location of the original will released first, exactly as you set.", LVS, "LV-RL-2292", "View the released file", "gold", "zap", 1),
    H("18 OCT 2026, 11:10", "request", "Release approved by a second officer", "A separate release officer signed off before anything was shared with Jane Smith.", RO, "LV-RL-2292", "View the request", "gold", "unlock"),
    H("18 OCT 2026, 09:00", "release", "Personal information released to Sarah Venter", "Personal wishes and family pets (2 items) were released last of all, exactly as you set.", LVS, "LV-RL-2291", "View the released file", "", "mailOpen", 1),
    H("18 OCT 2026, 08:30", "request", "Estate documentation verified", "The death certificate, letter of appointment and the Master's order were cross-checked by two reviewers.", ["Verification team", "Two reviewers"], "LV-VF-2292", "View the request", "green", "sealed"),
  ]},
  { date: "17 October 2026", events: [
    H("17 OCT 2026, 15:30", "release", "Verified information released to Sarah Venter", "Financial, property and vehicle information (4 items) released after verification.", LVS, "LV-RL-2291", "View the released file", "blue", "shieldCheck", 1),
    H("17 OCT 2026, 14:10", "request", "Executor identity verified", "Solicitor credentials and identity confirmed against the firm's records for Jane Smith.", ["Verification team", "Officer 4471"], "LV-VF-2292", "View the request", "green", "idCard"),
    H("17 OCT 2026, 10:02", "release", "Emergency information released to Sarah Venter", "Insurance and funeral information (3 items) released first, as you set.", LVS, "LV-RL-2291", "View the released file", "gold", "zap", 1),
    H("17 OCT 2026, 10:00", "request", "Release approved against your permissions", "Every item was checked against your instructions before sign-off.", RO, "LV-RL-2291", "View the request", "gold", "unlock"),
  ]},
  { date: "16 October 2026", events: [
    H("16 OCT 2026, 11:05", "request", "Requester identity verified", "Passport and live video check matched Sarah Venter's registered contact details.", ["Verification team", "Officer 4471"], "LV-VF-2291", "View the request", "green", "idCard"),
    H("16 OCT 2026, 09:20", "request", "Verification began for Sarah Venter's request", "Multi-stage verification started, exactly as you configured it.", LVS, "LV-VF-2291", "View the request", "blue", "shieldCheck"),
    H("16 OCT 2026, 08:15", "view", "You signed in and confirmed your identity", "A registered device was used and your identity check passed. Nothing was released.", JV, "LV-SN-1180", "Go to Home", "green", "signIn"),
  ]},
  { date: "09 October 2026", events: [
    H("09 OCT 2026, 09:14", "request", "Trusted contact notified", "We told your nominated contact we could not confirm your status. No information was shared.", LVS, "LV-AR-2291", "View the request", "gold", "users"),
  ]},
  { date: "02 October 2026", events: [
    H("02 OCT 2026, 09:15", "request", "Second reminder sent to you", "No response was recorded on any channel. Nothing was released.", LVS, "LV-AR-2291", "View the request", "", "clock"),
  ]},
  { date: "30 September 2026", events: [
    H("30 SEP 2026, 11:40", "request", "Executor process initiated by Jane Smith", "Opened as your nominated executor, on behalf of the family.", ["Jane Smith", "Executor"], "LV-AR-2292", "View the request", "", "scale"),
    H("30 SEP 2026, 09:15", "request", "“Are you OK?” notification sent to you", "Delivered by email, SMS and push notification with a single confirm button.", LVS, "LV-AR-2291", "View the request", "blue", "bell"),
    H("30 SEP 2026, 09:14", "request", "Access request received from Sarah Venter", "Submitted through the trusted-person screen with a written reason.", ["Sarah Venter", "Spouse"], "LV-AR-2291", "View the request", "blue", "mailPlus"),
    H("30 SEP 2026, 09:00", "checkin", "Your scheduled check-in went unanswered", "The 30-day check-in was due. No response was recorded, so the escalation you configured began.", LVS, "LV-CI-0940", "Review your check-in schedule", "gold", "alert"),
    H("30 SEP 2026, 08:52", "update", "You updated your Discovery Bank information", "Private cheque account details and beneficiary confirmation were refreshed.", JV, "LV-IN-4471", "Open the item", "", "pencil"),
    H("30 SEP 2026, 08:40", "update", "Funeral policy moved to emergency information", "Sarah Venter's release preference for the funeral policy was changed after your review.", JV, "LV-IN-3391", "Review permissions", "blue", "shield"),
  ]},
  { date: "26 September 2026", events: [
    H("26 SEP 2026, 10:20", "view", "Jane Smith viewed your Legacy Pack", "A trusted person opened the printable summary. No sensitive details were revealed.", ["Jane Smith", "Executor"], "LV-VW-2210", null, "", "eye"),
  ]},
  { date: "22 September 2026", events: [
    H("22 SEP 2026, 15:05", "view", "Adele Fourie viewed your financial summary", "Your wealth adviser opened the financial and insurance summary as part of the estate plan.", ["Adele Fourie", "Financial adviser"], "LV-VW-2187", null, "", "eye"),
  ]},
  { date: "12 September 2026", events: [
    H("12 SEP 2026, 09:30", "update", "Sarah Venter was added as a trusted person", "Permissions set for financial, insurance, property, vehicle, funeral and personal information.", JV, "LV-PP-0091", "Open the profile", "green", "userPlus"),
  ]},
  { date: "08 September 2026", events: [
    H("08 SEP 2026, 14:12", "update", "Jane Smith was added as your executor", "ABC Attorneys recorded as executor, with the estate information and legal documents.", JV, "LV-PP-0088", "Open the profile", "green", "userPlus"),
    H("08 SEP 2026, 14:12", "update", "Jane Smith was added as your executor", "ABC Attorneys recorded as executor, with the estate information and legal documents.", JV, "LV-PP-0088", "Open the profile", "green", "userPlus"),
  ]},
  { date: "05 September 2026", events: [
    H("05 SEP 2026, 15:40", "sealed", "Sealed copy created and emailed", "A sealed copy of your last twelve months (LV-SC-0018) was prepared and a private download link was emailed to Jane Smith and Adele Fourie.", JV, "LV-SC-0018", "View receipt", "green", "sealed", 1),
  ]},
  { date: "31 August 2026", events: [
    H("31 AUG 2026, 08:00", "checkin", "You completed your monthly check-in", "Confirmed you are OK. The next check-in was scheduled for 30 September 2026.", JV, "LV-CI-0910", "Review your check-in schedule", "green", "circleCheck"),
  ]},
  { date: "19 August 2026", events: [
    H("19 AUG 2026, 07:42", "emergency", "Emergency Mode expired automatically", "The 7-day window ended as scheduled. Sarah Venter's access closed and nothing further was shared.", LVS, "LV-EM-0074", "Open Emergency Mode", "blue", "timer"),
  ]},
  { date: "12 August 2026", events: [
    H("12 AUG 2026, 07:42", "emergency", "Emergency Mode activated for 7 days", "Hospital admission. 5 essential items shared with Sarah Venter only.", JV, "LV-EM-0074", "Open Emergency Mode", "gold", "zap", 1),
  ]},
  { date: "04 June 2026", events: [
    H("04 JUN 2026, 16:20", "emergency", "Emergency Mode revoked by you", "Ended early by John. No items remained visible after this point.", JV, "LV-EM-0061", "Open Emergency Mode", "", "undo"),
  ]},
  { date: "03 June 2026", events: [
    H("03 JUN 2026, 16:20", "emergency", "Emergency Mode activated for 24 hours", "Emergency travel. 3 essential items shared with Sarah Venter only.", JV, "LV-EM-0061", "Open Emergency Mode", "gold", "zap", 1),
  ]},
  { date: "01 June 2026", events: [
    H("01 JUN 2026, 09:00", "emergency", "Emergency Mode set up", "Essential set and default recipient confirmed. Never switched on until needed.", JV, "LV-EM-0040", "Open Emergency Mode", "green", "shieldCheck"),
  ]},
  { date: "12 March 2024", events: [
    H("12 MAR 2024, 10:00", "update", "Your Legacy Vault was created", "The record begins here. Every action since has been written to this history automatically.", JV, "LV-SY-0001", "Go to Home", "gold", "leaf"),
  ]},
];
const KIND = {
  sealed: ["green", "sealed", "Sealed copy"], checkin: ["green", "circleCheck", "Check-in"], release: ["gold", "lock", "Release"],
  request: ["blue", "mailPlus", "Access request"], view: ["plain", "eye", "View"], update: ["paper", "pencil", "Vault update"], emergency: ["gold", "siren", "Emergency Mode"],
};
const SCOPES = {
  full: ["Your full access record", "Every event written since your vault was created on 12 March 2024.", "your full access record", "2.1 MB · 48 pages"],
  year: ["Your last twelve months", "Activity from October 2025 to now — handy for an annual review.", "your last twelve months", "2.1 MB · 48 pages"],
  since: ["Everything since your last copy", "Only what has happened since your previous sealed copy was sent.", "everything since your last copy", "2.1 MB · 48 pages"],
};
const listNames = (names) => names.length < 2 ? names.join("") : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];

const SOURCES = [
  { k: "update", t: "Vault updates", d: "Every change you make to your vault", icon: "pencil", n: 6 },
  { k: "checkin", t: "Check-ins", d: "Confirmations you give, and any you miss", icon: "circleCheck", n: 2 },
  { k: "request", t: "Access requests", d: "Who asked for access, the verification steps", icon: "mailPlus", n: 11 },
  { k: "release", t: "Releases", d: "Exactly what was released, to whom", icon: "unlock", n: 6 },
  { k: "emergency", t: "Emergency Mode", d: "Every time Emergency Mode was switched on", icon: "siren", n: 5 },
  { k: "view", t: "Views & sign-ins", d: "Identity confirmations, trusted devices", icon: "eye", n: 3 },
  { k: "sealed", t: "Sealed copies", d: "Every sealed copy of your record", icon: "sealed", n: 1 },
];

/* ----------------------------------------------------------------- helpers */
const Btn = ({ kind = "dark", size, icon, iconRight, children, ...rest }) => (
  <button className={`btn btn-${kind} ${size || ""}`} {...rest}>
    {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
    {children}
    {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 16} />}
  </button>
);
const LinkA = ({ children, onClick, small, icon = "arrowRight" }) => (
  <button className={`link ${small ? "sm" : ""}`} onClick={onClick}>{children}{icon && <Icon name={icon} size={small ? 14 : 16} />}</button>
);
const Toggle = ({ on, onChange, dim, muted }) => (
  <button type="button" aria-pressed={on} className={`toggle ${on ? "on" : ""} ${dim ? "dim" : ""} ${muted ? "muted" : ""}`} onClick={() => onChange && onChange(!on)} />
);
const Released = ({ level }) =>
  level === "locked" ? <span className="chip blue"><Icon name="lock" size={12} />Released</span>
  : level === "personal" ? <span className="chip paper"><Icon name="mailOpen" size={12} />Personal</span>
  : level === "emergency" ? <span className="chip gold"><Icon name="zap" size={12} />Emergency</span>
  : <span className="chip green"><Icon name="shield" size={12} />Released</span>;

const PageHead = ({ eyebrow, title, lead, right, icon }) => (
  <div className="page-head">
    <div>
      {icon && <div className="icon-box lg" style={{ width: 48, height: 48, background: "#f8ecd2", borderColor: "#ecd8aa", color: "#6d5520", marginBottom: 22 }}><Icon name={icon} size={20} /></div>}
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="h1" style={{ maxWidth: 680 }}>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </div>
    {right && <div style={{ flex: "none" }}>{right}</div>}
  </div>
);

const Stats = ({ items }) => (
  <div className="stats">
    {items.map(([l, v, s], i) => (
      <div key={i}>
        <div className="eyebrow muted">{l}</div>
        <div className="num">{v}</div>
        {s && <div className="tiny">{s}</div>}
      </div>
    ))}
  </div>
);

const Footer = ({ tail = "You remain in control", lead = "Private estate and legacy management." }) => (
  <div className="lv-foot">
    <span>© 2026 Legacy Vault. {lead}</span>
    <span><Icon name="lock" size={14} />Secure · Private · Encrypted · {tail}</span>
  </div>
);

/* ------------------------------------------------------------------ shell */
const NAV = [
  ["home", "Home", "home"],
  ["inventory", "My Inventory", "inventory", 6],
  ["trusted-people", "Trusted People", "users"],
  ["legacy-pack", "Legacy Pack", "pack"],
  ["activation", "Activation Settings", "shield"],
  ["emergency", "Emergency Mode", "siren"],
  ["access-history", "Access History", "history"],
  ["documents", "Documents", "folder"],
  ["messages", "Messages", "mailOpen"],
  ["settings", "Settings", "settings"],
];
const navKey = (route) => {
  if (route === "readiness") return "home";
  if (route.startsWith("inventory")) return "inventory";
  if (route.startsWith("trusted-people")) return "trusted-people";
  if (route.startsWith("activation")) return "activation";
  return route;
};

function Sidebar({ route, go }) {
  const active = navKey(route);
  return (
    <aside className="lv-side">
      <div className="lv-side-scroll">
        <div className="lv-brand">
          <div className="lv-brand-mark"><Icon name="leaf" size={18} stroke={1.5} /></div>
          <div>
            <div className="lv-brand-name">LEGACY VAULT</div>
            <div className="lv-brand-tag">The important things.<br />In one place.</div>
          </div>
        </div>
        <div className="lv-side-rule" />
        <div className="lv-side-label">Your vault</div>
        <nav className="lv-nav">
          {NAV.map(([k, label, icon, badge]) => (
            <button key={k} className={`lv-nav-item ${active === k ? "is-active" : ""}`} onClick={() => go(k)}>
              <Icon name={icon} size={17} />
              <span>{label}</span>
              {badge && <span className="lv-nav-badge">{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="lv-private">
          <h6><Icon name="lock" size={13} />PRIVATE BY DESIGN</h6>
          <p>Nothing is ever released without your configured verification steps. You remain in control.</p>
        </div>
      </div>
      <div className="lv-user">
        <div className="lv-avatar-photo" />
        <div><b>John Venter</b><small>Private Client</small></div>
        <button className="lv-kebab" aria-label="Account menu"><Icon name="more" size={18} /></button>
      </div>
    </aside>
  );
}

function TopBar({ go }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!e.target.closest(".lv-notify")) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  return (
    <header className="lv-top">
      <label className="lv-search"><Icon name="search" size={16} /><input placeholder="Search your vault, people or documents" /></label>
      <div className="lv-top-sp" />
      <span className="chip pill green" style={{ height: 34, fontSize: 12, color: "#1f2f27" }}><Icon name="shieldCheck" size={14} />Encrypted &amp; private</span>
      <div className="lv-notify" style={{ position: "relative" }}>
        <button className="lv-bell" aria-label="Notifications" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="bell" size={17} /></button>
        {open && (
          <div className="card" style={{ position: "absolute", right: -16, top: 44, width: 320, padding: "14px 8px 8px", boxShadow: "0 18px 40px rgba(0,0,0,.14)", zIndex: 40, background: "var(--paper)" }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5, padding: "0 8px 8px" }}>Recent notifications</div>
            {[["Next check-in in 21 days", "We'll send a friendly reminder so you can confirm you're OK.", "activation/timeline"], ["Your vault is 63% ready", "6 items still need your attention.", "readiness"]].map(([t, d, r]) => (
              <button key={t} onClick={() => { setOpen(false); go(r); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 12px", borderRadius: 6 }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f3efe5")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{t}</div>
                <div className="small" style={{ marginTop: 3 }}>{d}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="btn btn-dark" style={{ height: 40, padding: "0 16px" }} onClick={() => go("emergency")}>
        <Icon name="siren" size={17} style={{ color: "#d9b872" }} />Emergency Mode
      </button>
    </header>
  );
}

/* ================================================================== PAGES */

/* ------------------------------------------------------------------- Home */
function Ring({ pct, size = 170, stroke = 8, track = "#0f1a2c", color = "#ad8c47", children }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} strokeLinecap="butt" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>{children}</div>
    </div>
  );
}

function TaskList({ withResolve, onResolve }) {
  const [done, setDone] = useState({});
  return (
    <div>
      {TASKS.map((t, i) => (
        <div key={i} className="list-row" style={{ alignItems: "center", padding: "16px 0 17px" }}>
          <button className={`radio ${done[i] ? "on" : ""}`} style={{ width: 20, height: 20, alignSelf: "flex-start", marginTop: 3 }} onClick={() => setDone({ ...done, [i]: !done[i] })}>
            {done[i] && <Icon name="check" size={12} stroke={2.4} />}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 500, textDecoration: done[i] ? "line-through" : "none", color: done[i] ? "var(--ink-4)" : "var(--ink)" }}>{t.t}</div>
            <div className="small mt4" style={{ color: "#4b4d53" }}>{t.d}</div>
          </div>
          <span className={`prio ${t.p}`}>{t.p.toUpperCase()}</span>
          {withResolve && <button className="link sm" style={{ marginLeft: 12 }} onClick={onResolve}>Resolve<Icon name="arrowRight" size={12} /></button>}
        </div>
      ))}
    </div>
  );
}

function CategoryCard({ c, go }) {
  return (
    <div className="card" style={{ padding: "24px 24px 24px" }}>
      <div className="row between" style={{ alignItems: "flex-start" }}>
        <div className="icon-box lg"><Icon name={c.icon} size={18} /></div>
        <Released level={c.level} />
      </div>
      <h3 className="h3 mt20" style={{ fontSize: 22 }}>{c.key}</h3>
      <p className="small mt8" style={{ minHeight: 38, color: "#45474d" }}>{c.desc}</p>
      <div className="row between mt20"><span style={{ fontSize: 15 }}>{c.have} of {c.of} items</span><span className="tiny">{c.pct}% recorded</span></div>
      <div className="progress mt8"><i style={{ width: c.pct + "%" }} /></div>
      <div className="hr mt20" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center", marginTop: 16 }}>
        {[["Linked", c.linked], ["To complete", c.todo], ["Assigned", c.assigned]].map(([l, v]) => (
          <div key={l}><div className="eyebrow muted" style={{ fontSize: 10.5, lineHeight: "16px", minHeight: 32, display: "grid", alignItems: "start" }}>{l}</div><div className="num" style={{ fontSize: 20 }}>{v}</div></div>
        ))}
      </div>
      <button className="btn btn-line mt24" style={{ width: "100%", justifyContent: "space-between", height: 46, fontWeight: 400 }} onClick={() => go("inventory/" + c.key.toLowerCase())}>
        View {c.key.toLowerCase()}<Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}

function Home({ go }) {
  return (
    <div className="lv-page" style={{ paddingTop: 40 }}>
      <section className="hero" style={{ height: 310, padding: "48px 40px", display: "flex", gap: 32 }}>
        <div aria-hidden style={{ position: "absolute", right: -40, top: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(173,140,71,.10),transparent 60%)" }} />
        <div style={{ flex: 1 }}>
          <div className="eyebrow" style={{ color: "#c2a15a" }}>Wednesday, 30 September 2026</div>
          <h1 className="h1" style={{ color: "#fff", fontSize: 46, lineHeight: "52px", marginTop: 12 }}>Good morning, John</h1>
          <p className="lead" style={{ fontSize: 16.5, lineHeight: "24px", marginTop: 14, maxWidth: 510 }}>Your legacy is more than just what you leave behind. It's what you make possible.</p>
          <div className="row gap12" style={{ marginTop: 28 }}>
            <Btn kind="gold" iconRight="arrowRight" onClick={() => go("readiness")}>Continue setup</Btn>
            <Btn kind="ghost-dark" icon="pack" onClick={() => go("legacy-pack")}>View Legacy Pack</Btn>
          </div>
        </div>
        <div className="row gap32" style={{ gap: 32, zIndex: 1 }}>
          <Ring pct={63} size={170} stroke={7}>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 38, lineHeight: 1, fontWeight: 500 }}>63<sup style={{ fontSize: 16, verticalAlign: 14 }}>%</sup></div>
              <div className="eyebrow" style={{ color: "#d3d6dc", marginTop: 10, fontSize: 10.5 }}>Legacy ready</div>
              <div style={{ fontSize: 11.5, color: "#bfc4cd", marginTop: 4 }}>10 of 16 items</div>
            </div>
          </Ring>
          <div style={{ display: "grid", gap: 20, width: 130 }}>
            {[["23", "Items recorded"], ["5", "Trusted people"], ["21 days", "Check-in due"]].map(([v, l]) => (
              <div key={l}><div style={{ fontFamily: "var(--serif)", fontSize: 25, lineHeight: 1 }}>{v}</div><div className="eyebrow" style={{ color: "#aab2c0", fontSize: 10.5, marginTop: 6 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="col2 mt32" style={{ gridTemplateColumns: "minmax(0,1fr) 310px", gap: 20 }}>
        <div className="card" style={{ padding: "32px 28px 20px" }}>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div><div className="eyebrow muted">Outstanding tasks</div><h2 className="h3 mt8" style={{ fontSize: 21 }}>6 items to complete</h2></div>
            <LinkA onClick={() => go("readiness")}>View Legacy Readiness</LinkA>
          </div>
          <div className="mt16" style={{ borderTop: "1px solid var(--line)" }}><TaskList /></div>
        </div>
        <div className="card" style={{ padding: "28px 24px 24px", display: "flex", flexDirection: "column", alignSelf: "stretch" }}>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div><div className="eyebrow muted">Next check-in</div><div className="h2 mt8" style={{ fontSize: 30 }}>21 days</div></div>
            <div className="icon-box" style={{ width: 40, height: 40, background: "#f8ecd2", borderColor: "#ecd8aa", color: "#6d5520" }}><Icon name="calendarCheck" size={17} /></div>
          </div>
          <p className="body mt16" style={{ fontSize: 15, lineHeight: "23px" }}>Your next check-in is in 21 days. We'll send you a friendly reminder to confirm you're OK.</p>
          <div className="progress gold mt32"><i style={{ width: "30%" }} /></div>
          <div className="row between mt8" style={{ fontSize: 11.5, color: "var(--ink-3)" }}><span>Last confirmed 09 Sep 2026</span><span>Due 30 Oct 2026</span></div>
          <div style={{ flex: 1 }} />
          <button className="btn" style={{ marginTop: 32, width: "100%", border: "1px solid var(--green-line)", background: "var(--green-bg)", color: "#1b2a22", fontWeight: 500 }} onClick={() => go("activation/timeline")}>
            <Icon name="circleCheck" size={16} />Confirm I'm OK
          </button>
          <p className="tiny" style={{ textAlign: "center", marginTop: 12, fontSize: 11.5 }}>Not responding never automatically means<br />someone has died.</p>
        </div>
      </div>

      <div className="row between mt40" style={{ alignItems: "flex-end" }}>
        <div><div className="eyebrow muted">My legacy inventory</div><h2 className="h2 mt8" style={{ fontSize: 25 }}>Everything that matters, in one place</h2></div>
        <LinkA onClick={() => go("inventory")}>Open full inventory</LinkA>
      </div>
      <div className="mt24" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16 }}>
        {CATEGORIES.map((c) => (
          <button key={c.key} className="cat-tile" onClick={() => go("inventory/" + c.key.toLowerCase())}>
            <div className="row between" style={{ alignItems: "flex-start" }}>
              <div className="icon-box" style={{ width: 40, height: 40 }}><Icon name={c.icon} size={16} /></div>
              <Icon name="arrowUpRight" size={14} className="arrow" style={{ marginTop: 13 }} />
            </div>
            <div className="h3" style={{ fontSize: 20, marginTop: 17 }}>{c.key}</div>
            <div className="small" style={{ marginTop: 4, fontSize: 13, color: "var(--ink-3)" }}>{c.have} of {c.of} recorded</div>
            <div className="meta">
              <span><i style={{ background: "#2c5a43" }} />{c.linked} linked</span>
              <span><i style={{ background: "var(--gold)" }} />{c.todo} incomplete</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt32" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 310px", gap: 20, alignItems: "stretch" }}>
        <div className="card" style={{ padding: "28px 28px 28px" }}>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div><div className="eyebrow muted">Access history</div><h2 className="h3 mt8" style={{ fontSize: 20 }}>Recent activity in your vault</h2></div>
            <LinkA onClick={() => go("access-history")}>Full history</LinkA>
          </div>
          <div className="activity" style={{ marginTop: 26 }}>
            {[
              ["pencil", "", "You updated your Discovery Bank information", "Private cheque account details and beneficiary confirmation.", "30 Sep 2026"],
              ["circleCheck", "green", "You completed your Legacy Vault check-in", "Confirmed you are OK. Next check-in scheduled for 30 Oct 2026.", "28 Sep 2026"],
              ["userPlus", "", "Sarah was added as a trusted person", "Permissions set for financial, insurance, property and personal information.", "12 Sep 2026"],
              ["shield", "gold", "Release preference changed", "Funeral policy moved to emergency information after your review.", "04 Sep 2026"],
              ["lock", "green", "No beneficiary information has been released", "Your vault has never been activated and no access has been granted.", "01 Sep 2026"],
            ].map(([i, tone, t, d, at]) => (
              <div key={t} className="activity-row">
                <div className={`icon-round ${tone}`}><Icon name={i} size={15} /></div>
                <div style={{ paddingTop: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, lineHeight: "22px" }}>{t}</div>
                  <div className="small" style={{ fontSize: 12.5, color: "#45474d", marginTop: 1 }}>{d}</div>
                </div>
                <span className="tiny" style={{ paddingTop: 4, fontSize: 11.5 }}>{at}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card soft" style={{ padding: "28px 28px 28px", display: "flex", flexDirection: "column" }}>
          <div className="icon-box" style={{ width: 44, height: 44, background: "var(--green-bg)", borderColor: "var(--green-line)", color: "#1f2a24" }}><Icon name="shieldCheck" size={18} /></div>
          <h3 className="h3" style={{ fontSize: 20, marginTop: 24 }}>Your vault is sealed</h3>
          <p className="body" style={{ fontSize: 15, lineHeight: "23px", marginTop: 8 }}>Nothing is released automatically. Your configured verification steps must complete first.</p>
          <div style={{ marginTop: 22 }}>
            {[["lock", "You remain in control of every item."], ["history", "Full access history is always available to you."], ["userX", "No beneficiary information has been released."]].map(([i, t]) => (
              <div key={t} className="row gap12" style={{ alignItems: "flex-start", marginTop: 12, fontSize: 14, lineHeight: "20px", color: "var(--ink-2)" }}>
                <Icon name={i} size={13} style={{ marginTop: 4 }} /><span>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minHeight: 40 }} />
          <div><LinkA onClick={() => go("access-history")}>View access history</LinkA></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------- Readiness */
function Readiness({ go }) {
  return (
    <div className="lv-page">
      <PageHead eyebrow="Legacy readiness" title="How prepared is your vault?"
        lead="Your readiness score reflects what has been recorded, linked and assigned. It is the single clearest measure of whether your family would know what to do."
        right={<Btn iconRight="arrowRight" onClick={() => go("inventory/add")}>Continue setup</Btn>} />
      <div className="card" style={{ padding: "28px 28px", display: "flex", gap: 56, alignItems: "center" }}>
        <Ring pct={63} size={194} stroke={8} track="#efeae0" color="#ad8c47">
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1 }}>63<sup style={{ fontSize: 15, verticalAlign: 14 }}>%</sup></div>
            <div className="eyebrow muted" style={{ marginTop: 10 }}>Legacy ready</div>
            <div className="tiny mt4">10 of 16 items</div>
          </div>
        </Ring>
        <div style={{ flex: 1 }}>
          <h2 className="h2" style={{ fontSize: 25 }}>You've completed 10 of 16 items</h2>
          <p className="body mt12" style={{ fontSize: 15, lineHeight: "23px", maxWidth: 580 }}>Six items still need your attention before your Legacy Vault is complete and fully ready to hand over.</p>
          <div className="row gap16 mt24">
            {[["Categories", "8"], ["Outstanding", "6"], ["High priority", "3"], ["This month", "+4"]].map(([l, v]) => (
              <div key={l} className="card soft" style={{ flex: 1, padding: "18px 17px 14px" }}><div className="eyebrow muted">{l}</div><div className="num mt8" style={{ fontSize: 22 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div className="col2 mt32" style={{ gap: 24 }}>
        <div className="card" style={{ padding: "32px 28px 16px" }}>
          <h2 className="h3" style={{ fontSize: 21 }}>Outstanding tasks</h2>
          <p className="body mt8" style={{ fontSize: 15 }}>Complete these to move your vault closer to fully ready.</p>
          <div className="mt16" style={{ borderTop: "1px solid var(--line)" }}><TaskList withResolve onResolve={() => go("inventory")} /></div>
        </div>
        <div className="card soft" style={{ padding: "32px 28px" }}>
          <h2 className="h3" style={{ fontSize: 21 }}>Readiness by category</h2>
          <div className="mt16">
            {CATEGORIES.map((c) => (
              <div key={c.key} style={{ marginTop: 18 }}>
                <div className="row between"><span className="row gap8" style={{ fontSize: 15 }}><Icon name={c.icon} size={15} />{c.key}</span><span className="tiny">{c.pct}%</span></div>
                <div className="progress mt8"><i style={{ width: c.pct + "%" }} /></div>
              </div>
            ))}
            <div className="card mt24" style={{ padding: "16px 16px", background: "var(--amber-bg)", borderColor: "var(--amber-line)", fontSize: 13, lineHeight: "20px", color: "#3a2e14" }}>Add life insurance, confirm your executor and upload your will — these three have the biggest impact on your family's readiness.</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------- Inventory */
function Inventory({ go }) {
  return (
    <div className="lv-page">
      <PageHead eyebrow="My legacy inventory" title="Everything your family should know about"
        lead="Record what exists, where it is and what to do. Legacy Vault is a discovery and handover system — it never asks you to store banking passwords."
        right={<Btn icon="plus" onClick={() => go("inventory/add")}>Add an item</Btn>} />
      <Stats items={[["Items recorded", "23", "of 40 expected"], ["Fully linked", "15", "nothing outstanding"], ["Need attention", "8", "missing information"], ["Assigned to someone", "18", "cleared for handover"]]} />
      <div className="row between" style={{ marginTop: 44, marginBottom: 24 }}>
        <h2 className="h2">Categories</h2><span className="small">8 categories · 8 with information</span>
      </div>
      <div className="grid3">{CATEGORIES.map((c) => <CategoryCard key={c.key} c={c} go={go} />)}</div>
      <Footer />
    </div>
  );
}

function CategoryPage({ slug, go }) {
  const c = CATEGORIES.find((x) => x.key.toLowerCase() === slug) || CATEGORIES[0];
  const rows = ITEMS[c.key];
  return (
    <div className="lv-page">
      <div className="row gap8 small" style={{ color: "var(--ink-3)", marginBottom: 32 }}>
        <button onClick={() => go("inventory")}>My Legacy Inventory</button><Icon name="chevronRight" size={13} /><span style={{ color: "var(--ink)" }}>{c.key}</span>
      </div>
      <div className="page-head" style={{ alignItems: "center" }}>
        <div>
          <div className="eyebrow">Legacy inventory · {c.key}</div>
          <h1 className="h1 mt12">{c.key}</h1>
          <p className="lead mt12">{c.desc}</p>
        </div>
        <Btn icon="plus" onClick={() => go("inventory/add")}>Add {c.key.toLowerCase()} item</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 228px", gap: 20 }}>
        <div className="stats">
          {[["Recorded", `${c.have}/${c.of}`], ["Linked", c.linked], ["To complete", c.todo], ["Assigned", c.assigned]].map(([l, v]) => (
            <div key={l} style={{ padding: "22px 20px 36px" }}><div className="eyebrow muted" style={{ marginBottom: 12 }}>{l}</div><div className="num">{v}</div></div>
          ))}
        </div>
        <div className="card soft" style={{ padding: "20px 20px" }}>
          <div className="eyebrow muted">Release level</div>
          <div className="mt12"><LevelChip level={CAT_DEFAULT[c.key]} badge /></div>
          <p className="tiny mt8" style={{ lineHeight: "18px" }}>Applies by default to new items you add in this category.</p>
        </div>
      </div>
      <div className="card mt32" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.9fr 1fr 1.1fr 1fr 110px", padding: "14px 24px", background: "var(--card-2)", borderBottom: "1px solid var(--line)" }}>
          {["Item", "Status", "Assigned to", "Release", "Updated"].map((h, i) => <span key={h} className="eyebrow muted" style={{ fontSize: 10.5, textAlign: i === 4 ? "right" : "left" }}>{h}</span>)}
        </div>
        {rows.map(([name, sub, linked, who, level, at], i) => (
          <button key={name} className="cat-row" onClick={() => go("inventory/item/" + itemId(c.key, name))} style={{ display: "grid", gridTemplateColumns: "1.9fr 1fr 1.1fr 1fr 110px", alignItems: "center", width: "100%", textAlign: "left", padding: "18px 24px", borderTop: i ? "1px solid var(--line)" : 0 }}>
            <span><span style={{ display: "block", fontSize: 15, fontWeight: 500 }}>{name}</span><span className="small" style={{ fontSize: 12.5 }}>{sub}</span></span>
            <span>{linked ? <span className="chip green" style={{ borderRadius: 999 }}><span className="dot" />Linked</span> : <span className="chip gold" style={{ borderRadius: 999 }}><span className="dot" />Incomplete</span>}</span>
            <span className="row gap8 small" style={{ color: who ? "var(--ink-2)" : "var(--ink-4)", fontSize: 13 }}>{who && <Icon name="user" size={13} />}{who || "Not assigned"}</span>
            <span><LevelChip level={level} /></span>
            <span className="row gap12 small" style={{ justifyContent: "flex-end", fontSize: 12.5 }}>{at}<Icon name="arrowRight" size={14} /></span>
          </button>
        ))}
      </div>
      <div className="notice sm mt32" style={{ fontSize: 14, alignItems: "center" }}><Icon name="info" size={16} />Knowing what exists is just as important as knowing where the documents are. Each item you record moves your Legacy Readiness forward.</div>
      <Footer />
    </div>
  );
}

function ItemPage({ id, go }) {
  const found = Object.entries(ITEMS).flatMap(([cat, rows]) => rows.map((r) => [cat, r])).find(([cat, r]) => itemId(cat, r[0]) === id);
  if (!found) return <Inventory go={go} />;
  const [cat, [name, sub, linked, who, level, updated]] = found;
  const [institution, kind] = sub.split(" · ");
  const d = ITEM_DETAILS[id] || { type: kind, ref: null, contact: null, phone: null, beneficiary: who, todo: null, notes: null, docs: linked ? 1 : 0, contacts: linked ? 1 : 0 };
  const assignee = who && PEOPLE.find((p) => who.startsWith(p.name));
  const receivers = PEOPLE.filter((p) => (PERSON_LEVELS[p.id] || {})[cat]);
  const docNames = ["statement or certificate", "supporting document 2", "supporting document 3"];
  const missing = (v, fallback) => v || <span style={{ color: "var(--ink-3)" }}>{fallback}</span>;
  const Card = ({ children, style }) => <div className="card" style={{ padding: "32px 28px 28px", ...style }}>{children}</div>;
  return (
    <div className="lv-page">
      <div className="row gap8 small" style={{ color: "var(--ink-3)", marginBottom: 32 }}>
        <button onClick={() => go("inventory")}>My Legacy Inventory</button><Icon name="chevronRight" size={13} />
        <button onClick={() => go("inventory/" + cat.toLowerCase())}>{cat}</button><Icon name="chevronRight" size={13} />
        <span style={{ color: "var(--ink)" }}>{name}</span>
      </div>
      <div className="page-head" style={{ alignItems: "flex-end" }}>
        <div>
          <div className="row gap12">
            <div className="icon-box lg"><Icon name={catIcon(cat)} size={18} /></div>
            {linked ? <span className="chip green" style={{ borderRadius: 999 }}><span className="dot" />Linked</span> : <span className="chip gold" style={{ borderRadius: 999 }}><span className="dot" />Incomplete</span>}
          </div>
          <h1 className="h1" style={{ marginTop: 20 }}>{name}</h1>
          <p className="lead mt8">{cat} · {institution}</p>
        </div>
        <div className="row gap12"><Btn kind="line" icon="pencil">Edit</Btn><Btn kind="line" icon="send">Handover</Btn><Btn icon="plus">Add document</Btn></div>
      </div>
      <div className="col2">
        <div className="stack">
          <Card>
            <h2 className="h3" style={{ fontSize: 21 }}>Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 32, marginTop: 12 }}>
              {[["Account type", d.type], ["Account number / reference", d.ref ? (d.masked ? <span className="row gap8"><Icon name="eyeOff" size={14} style={{ color: "var(--ink-3)" }} />•••• •••• {d.ref}</span> : d.ref) : missing(null, "Not yet recorded")], ["Institution", institution], ["Contact information", missing(d.contact, "Missing — add broker details")], ["Contact phone", missing(d.phone, "Not recorded yet")], ["Beneficiary", missing(d.beneficiary, "Not assigned to anyone yet")]].map(([l, v]) => (
                <div key={l} style={{ padding: "16px 0 14px", borderBottom: "1px solid var(--line)" }}><div className="eyebrow muted" style={{ fontSize: 10.5 }}>{l}</div><div style={{ fontSize: 15, marginTop: 6 }}>{v}</div></div>
              ))}
            </div>
          </Card>
          {d.todo && <Card>
            <div className="row gap12"><div className="icon-box" style={{ background: "#f8ecd2", borderColor: "#ecd8aa", color: "#6d5520" }}><Icon name="route" size={15} /></div><h2 className="h3" style={{ fontSize: 21 }}>What to do</h2></div>
            <p className="body mt16" style={{ fontSize: 15, lineHeight: "23px" }}>{d.todo}</p>
          </Card>}
          <Card style={{ background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
            <div className="row between"><div className="row gap12"><div className="icon-box" style={{ background: "var(--paper)" }}><Icon name="key" size={15} /></div><h2 className="h3" style={{ fontSize: 21 }}>Login details</h2></div><span className="chip paper" style={{ borderRadius: 999 }}>Not stored here</span></div>
            <p className="body mt16" style={{ fontSize: 15, lineHeight: "23px", color: "#2b2d33" }}>Legacy Vault never asks you to store banking passwords. Instead, it records where the credentials live so your trusted people know exactly where to look.</p>
            <div className="row gap16 mt16" style={{ padding: "12px 16px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 6 }}><Icon name="lock" size={16} /><div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Password manager</div><div style={{ fontSize: 15, fontWeight: 500 }}>1Password</div></div></div>
          </Card>
          {d.notes && <Card><h2 className="h3" style={{ fontSize: 21 }}>Notes</h2><p className="body mt12" style={{ fontSize: 15 }}>{d.notes}</p></Card>}
          <Card>
            <div className="row between"><h2 className="h3" style={{ fontSize: 21 }}>Attached documents</h2><span className="tiny">{d.docs} file{d.docs === 1 ? "" : "s"}</span></div>
            {d.docs ? <div className="mt16">{docNames.slice(0, d.docs).map((n, i) => (
              <div key={n} className="list-row" style={{ alignItems: "center" }}>
                <div className="icon-box"><Icon name="filePdf" size={15} /></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 15 }}>{name} — {n}</div><div className="tiny">PDF · {i ? "attached" : "verified copy"}</div></div>
                <button className="modal-x" aria-label="Download"><Icon name="download" size={15} /></button>
              </div>
            ))}</div> : <div className="small mt16" style={{ padding: "20px 16px", border: "1px dashed var(--line)", borderRadius: 6, textAlign: "center", fontSize: 14 }}>No documents attached yet. Add a statement or certificate so nothing has to be searched for later.</div>}
          </Card>
        </div>
        <div className="stack">
          <div className="card soft" style={{ padding: 24 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Assigned to</div>
            {assignee ? <div className="row gap12 mt16"><div className="initials" style={{ width: 36, height: 36, fontSize: 11 }}>{assignee.ini}</div><div><div style={{ fontSize: 15, fontWeight: 500 }}>{who}</div><div className="tiny">Will receive this information</div></div></div>
              : <p className="small mt12" style={{ fontSize: 13 }}>Not assigned. Assign this to a trusted person so it is handed over correctly.</p>}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Release &amp; visibility</div>
            <div className="mt16"><LevelChip level={level} badge /></div>
            <p className="small mt12" style={{ fontSize: 13 }}>{LEVELS[level].note}</p>
            <div className="hr mt16" />
            <div className="eyebrow muted mt16" style={{ fontSize: 10.5 }}>May receive this</div>
            {receivers.map((p) => (
              <div key={p.id} className="row gap12 mt12">
                <div className="initials light" style={{ width: 28, height: 28, fontSize: 9.5 }}>{p.ini}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div><div className="tiny" style={{ fontSize: 11 }}>{p.rel}</div></div>
                {p.canRequest && <Icon name="shield" size={13} style={{ color: "var(--gold-ink)" }} />}
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Item health</div>
            <div className="kv mt12"><span>Contacts recorded</span><b>{d.contacts}</b></div>
            <div className="kv"><span>Documents attached</span><b>{d.docs}</b></div>
            <div className="kv"><span>Last updated</span><b style={{ fontSize: 15 }}>{updated}</b></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------ Legacy Pack */
function LegacyPack({ go }) {
  const contents = [["users", "Who to contact first", "Your trusted people, their roles and how to reach them."], ["inventory", "What exists and where it is", "Every category, how much is recorded and who may receive it."], ["shield", "How access is given", "Your activation method, escalation and Emergency Mode."], ["history", "The activity record", "A summary of everything that has ever happened in the vault."]];
  return (
    <div className="lv-page" style={{ paddingTop: 33 }}>
      <div className="col2">
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ background: "var(--night)", color: "#fff", padding: "32px 40px 40px" }}>
            <div className="row between">
              <div className="row gap12">
                <div className="lv-brand-mark"><Icon name="leaf" size={18} stroke={1.5} /></div>
                <div><div className="lv-brand-name" style={{ fontSize: 13 }}>LEGACY VAULT</div><div style={{ fontSize: 12, color: "#c9cdd4", marginTop: 4 }}>The important things. In one place.</div></div>
              </div>
              <span className="chip pill" style={{ border: "1px solid rgba(255,255,255,.2)", color: "#e7e9ee" }}><Icon name="lock" size={13} />Private &amp; confidential</span>
            </div>
            <h1 className="h1" style={{ color: "#fff", marginTop: 32, fontSize: 40 }}>Legacy Pack</h1>
            <p style={{ color: "#e6e8ec", marginTop: 12, fontSize: 15 }}>Everything your family needs to know, when they need to know it.</p>
            <div className="hr" style={{ background: "rgba(255,255,255,.12)", marginTop: 28 }} />
            <div style={{ display: "grid", gridTemplateColumns: "130px 195px 1fr", rowGap: 18, marginTop: 24 }}>
              {[["Prepared for", "John Venter"], ["Location", "Constantia, Cape Town"], ["Generated", "30 September 2026"], ["Reference", "LV-PK-0007"], ["Version", "Version 7"]].map(([l, v]) => (
                <div key={l}><div className="eyebrow" style={{ color: "#aab2c0", fontSize: 10.5 }}>{l}</div><div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{v}</div></div>
              ))}
            </div>
          </div>
          <div style={{ padding: "40px 40px 32px", borderBottom: "1px solid var(--line)" }}>
            <p className="lead" style={{ fontSize: 15.5, lineHeight: "23px" }}>This is the one-page picture of John's Legacy Vault. It brings together who to contact, what exists and where it is held, how access is given, and a summary of everything that has happened — so nothing has to be guessed in a difficult moment.</p>
            <div className="stats mt24" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {[["Legacy readiness", "63%", "10 of 16 complete"], ["Trusted people", "5", "Named and verified"], ["Items recorded", "23", "Across 8 categories"], ["Categories", "8", "Fully structured"]].map(([l, v, s]) => (
                <div key={l} style={{ padding: "20px 20px 22px" }}><div className="eyebrow muted" style={{ fontSize: 10.5, lineHeight: "15px" }}>{l}</div><div className="num mt12" style={{ fontSize: 24 }}>{v}</div><div className="tiny mt4">{s}</div></div>
              ))}
            </div>
          </div>

          <PackSection n="01" title="Who to contact first" lead="These are the people John nominated. Start here — each one knows what they are responsible for and how to reach the next person.">
            {PEOPLE.slice(0, 4).map((p) => (
              <div key={p.id} className="list-row" style={{ padding: "20px 0" }}>
                <div className="initials serif light" style={{ width: 44, height: 44 }}>{p.ini}</div>
                <div style={{ flex: 1 }}>
                  <div className="row gap8"><b style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</b><span className="chip green" style={{ height: 22, borderRadius: 999 }}><Icon name={p.relIcon} size={11} />{p.rel}</span></div>
                  <div className="body mt4">{p.role}</div>
                  <div className="row gap16 mt4 small"><span className="row gap6"><Icon name="mail" size={13} />{p.email}</span><span className="row gap6"><Icon name="phone" size={13} />{p.phone}</span></div>
                  <div className="row gap4 mt8" style={{ flexWrap: "wrap" }}><span className="eyebrow muted" style={{ fontSize: 10, marginRight: 4 }}>May receive</span>{p.access.map((a) => <span key={a} className="tag green">{a}</span>)}</div>
                </div>
              </div>
            ))}
          </PackSection>

          <PackSection n="02" title="What exists and where it is" aside="23 items across 8 categories" lead="Everything John recorded, how complete it is, and the release level that governs when each category may be shared. The pack says where things are held — never the details themselves.">
            {CATEGORIES.map((c) => (
              <div key={c.key} className="list-row">
                <div className="icon-box"><Icon name={c.icon} size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div className="row between"><span style={{ fontSize: 15, fontWeight: 500 }}>{c.key}</span><span className="small" style={{ color: "var(--ink-2)" }}>{c.have} of {c.of} recorded</span></div>
                  <div className="small mt4" style={{ maxWidth: 400 }}>{c.desc}</div>
                </div>
                <Released level={c.level} />
              </div>
            ))}
          </PackSection>

          <PackSection n="03" title="How access is given" lead="Nothing is ever released simply because time has passed. Here is the process John configured, and the temporary option that works while he is still here.">
            <div className="grid2" style={{ gap: 16 }}>
              <div className="card soft" style={{ padding: 20 }}>
                <div className="row gap12"><div className="icon-box" style={{ background: "var(--blue-bg)", borderColor: "#c9d6e6" }}><Icon name="timer" size={16} /></div><b style={{ fontWeight: 500 }}>What triggers access</b></div>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 16 }}>Inactivity check-in</div>
                <p className="small mt4">We check in on a schedule you choose. If you don't respond, we escalate step by step before anything is considered.</p>
                <div className="hr mt16" />
                {[["timer", <>Check in <b>Every 30 days</b> by Email, SMS, Push.</>], ["users", "Requires 2 approvers — Sarah Venter and Jane Smith — before verification begins."], ["lock", "Only the information John authorised is released, to the people he chose, in the order he set."]].map(([i, t], k) => (
                  <div key={k} className="row gap10 small mt12" style={{ alignItems: "flex-start", color: "var(--ink-2)" }}><Icon name={i} size={14} style={{ marginTop: 3 }} /><span>{t}</span></div>
                ))}
              </div>
              <div className="card soft" style={{ padding: 20 }}>
                <div className="row gap12"><div className="icon-box" style={{ background: "#f8ecd2", borderColor: "#ecd8aa" }}><Icon name="siren" size={16} /></div><b style={{ fontWeight: 500 }}>Emergency Mode</b></div>
                <p className="body mt16" style={{ fontSize: 15, lineHeight: "23px" }}>A temporary, revocable release John can switch on himself — only ever the essentials, only for a set time, only to one person.</p>
                <div className="hr mt16" />
                {[["listChecks", <><b>8 essentials</b> prepared, 5 shared by default.</>], ["userHeart", <>Default recipient: <b>Sarah Venter</b>.</>], ["timer", "Windows of 24 hours, 3 days, 7 days, 30 days."]].map(([i, t], k) => (
                  <div key={k} className="row gap10 small mt12" style={{ alignItems: "flex-start", color: "var(--ink-2)" }}><Icon name={i} size={14} style={{ marginTop: 3 }} /><span>{t}</span></div>
                ))}
              </div>
            </div>
          </PackSection>

          <PackSection n="04" title="The activity record" aside={<span className="row gap6"><Icon name="history" size={14} />Last activity 18 Oct 2026, 11:22</span>} lead="Every view, update, request and release is written to John's Access History automatically. This is the same record summarised here — nothing in the pack can drift from it." bare>
            <div className="stats" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {[["Events recorded", "34", "Since 12 March 2024"], ["Access requests", "2", "Opened against the vault"], ["Item releases", "9", "Across two access windows"], ["Emergency activations", "2", "Both expired or revoked"]].map(([l, v, s]) => (
                <div key={l} style={{ padding: "20px 20px 22px" }}><div className="eyebrow muted" style={{ fontSize: 10.5, lineHeight: "15px" }}>{l}</div><div className="num mt12" style={{ fontSize: 24 }}>{v}</div><div className="tiny mt8" style={{ lineHeight: "18px" }}>{s}</div></div>
              ))}
            </div>
            <div className="eyebrow muted mt32" style={{ fontSize: 10.5 }}>Most recent entries</div>
            {[
              ["lock", "blue", "18 Oct 2026, 11:22", "Trust deed released separately to Jane Smith"],
              ["shieldCheck", "gold", "18 Oct 2026, 11:18", "Verified information released to Jane Smith"],
              ["zap", "gold", "18 Oct 2026, 11:16", "Emergency information released to Jane Smith"],
            ].map(([i, tone, when, what]) => (
              <div key={when} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
                <div className="icon-round" style={{ width: 32, height: 32, flexShrink: 0, ...(tone === "blue" ? { background: "var(--blue-bg)", borderColor: "#c9d6e6", color: "var(--blue-ink)" } : { background: "#fbf0d8", borderColor: "#ecd7a6", color: "#6b521c" }) }}><Icon name={i} size={14} /></div>
                <div>
                  <div className="row gap8" style={{ flexWrap: "wrap" }}>
                    <span className="tiny" style={{ color: "var(--ink-2)" }}>{when}</span>
                    <span className="tag green">Release</span>
                    <span className="tag" style={{ height: 22, fontSize: 11.5, background: "var(--gold-bg)", borderColor: "var(--gold-line)", color: "var(--gold-ink)" }}>Information changed hands</span>
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 4 }}>{what}</div>
                </div>
              </div>
            ))}
          </PackSection>

          <div style={{ padding: "40px 40px 32px", borderBottom: "1px solid var(--line)" }}>
            <div className="row gap12">
              <div className="icon-box" style={{ background: "#fbf0d8", borderColor: "#ecd7a6", color: "#6b521c" }}><Icon name="footprints" size={16} /></div>
              <h2 className="h3" style={{ fontSize: 19, fontWeight: 600 }}>What to do first</h2>
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: "20px 0 0" }}>
              {["Find the original will — it is held in the strongroom at ABC Attorneys.", "Call the AVBOB 24 hour line first if funeral arrangements are needed.", "Contact Jane Smith, the executor, before notifying banks or insurers.", "Read John's personal wishes together before distributing anything."].map((t, k) => (
                <li key={k} className="row gap12" style={{ marginTop: k ? 12 : 0, fontSize: 15, lineHeight: "21px", color: "var(--ink-2)" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--night)", color: "#fff", fontSize: 11, fontWeight: 600, display: "grid", placeItems: "center", flexShrink: 0 }}>{k + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="row between gap24" style={{ padding: "24px 40px", background: "var(--card-2)", alignItems: "flex-start" }}>
            <span className="tiny" style={{ maxWidth: 340, lineHeight: "18px", color: "var(--ink-2)" }}>Private and confidential. Prepared for John's nominated trusted people.</span>
            <span className="row gap8 tiny" style={{ maxWidth: 330, lineHeight: "18px", color: "var(--ink-2)", alignItems: "flex-start" }}><Icon name="fingerprint" size={12} style={{ color: "var(--gold)", marginTop: 3, flexShrink: 0 }} />Ref LV-PK-0007 · Version 7 · Generated 30 September 2026</span>
          </div>
        </div>

        <div className="stack">
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted">What's inside</div>
            {contents.map(([i, t, d]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
                <div className="icon-box" style={{ width: 26, height: 26 }}><Icon name={i} size={13} /></div>
                <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ lineHeight: "17px" }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 24, background: "var(--amber-bg)", borderColor: "var(--amber-line)" }}>
            <div className="row gap8 eyebrow" style={{ color: "#3a2e14" }}><Icon name="shield" size={14} />Never included</div>
            {[["lock", "Passwords", "The pack only ever says where passwords are held."], ["chart", "Account balances", "No values, balances or account numbers of any kind."], ["shield", "Login details", "No credentials, PINs or access codes are ever printed."], ["mailOpen", "Personal messages", "Your messages release separately, on their own schedule."]].map(([i, t, d]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
                <div className="icon-round" style={{ width: 26, height: 26, background: "#fffaf0", borderColor: "var(--amber-line)" }}><Icon name={i} size={12} /></div>
                <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ color: "#4a3f28", lineHeight: "17px" }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="row between"><div className="eyebrow muted" style={{ lineHeight: "16px" }}>Who has opened the<br />pack</div><span className="chip pill green" style={{ height: 26, fontSize: 11.5 }}><Icon name="eye" size={12} />Logged</span></div>
            {[["scale", "Jane Smith", "Executor · 26 Sep 2026, 10:20", "3×"], ["chart", "Adele Fourie", "Financial adviser · 22 Sep 2026…", "1×"], ["heart", "Sarah Venter", "Spouse · 12 Sep 2026, 09:40", "2×"]].map(([i, n, d, c]) => (
              <div key={n} className="row gap12 mt16">
                <div className="icon-round" style={{ width: 32, height: 32 }}><Icon name={i} size={14} /></div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{n}</div><div className="tiny" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d}</div></div>
                <span className="chip plain" style={{ height: 22 }}>{c}</span>
              </div>
            ))}
            <div className="hr mt20" />
            <p className="tiny mt16" style={{ lineHeight: "17px" }}>Opening the pack never reveals sensitive details, and every view is written to John's Access History.</p>
          </div>
          <button className="card soft" style={{ padding: 20, display: "flex", gap: 14, textAlign: "left", width: "100%" }} onClick={() => go("access-history")}>
            <div className="icon-box" style={{ background: "var(--paper)" }}><Icon name="history" size={16} /></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>See the full record</div><div className="tiny mt4" style={{ lineHeight: "17px" }}>Every view, update, request and release behind this pack lives in the full record.</div></div>
            <Icon name="chevronRight" size={16} style={{ marginTop: 4, color: "var(--ink-3)" }} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const PackSection = ({ n, title, lead, aside, children, last, bare }) => (
  <div style={{ padding: "40px 40px 32px", borderBottom: last ? 0 : "1px solid var(--line)" }}>
    <div className="row between">
      <div className="row gap12" style={{ alignItems: "baseline" }}><span className="tiny" style={{ color: "#6e5c30", letterSpacing: ".08em" }}>{n}</span><h2 className="h3" style={{ fontSize: 19, fontWeight: 600 }}>{title}</h2></div>
      {aside && <span className="small" style={{ color: "var(--ink-2)" }}>{aside}</span>}
    </div>
    <p className="body mt12" style={{ fontSize: 15, lineHeight: "23px" }}>{lead}</p>
    <div className={bare ? "mt20" : "mt16"} style={{ borderTop: bare ? 0 : "1px solid var(--line)" }}>{children}</div>
  </div>
);

/* ------------------------------------------------------- Activation page */
const METHODS = [
  { k: "inactivity", t: "Inactivity check-in", sub: null, d: "We check in on a schedule you choose. If you don't respond, we escalate step by step before anything is considered.", icon: "timer", rec: true },
  { k: "trusted", t: "Trusted person", sub: "On request", d: "A trusted person can ask us to begin the verification process. On its own this never releases any information.", icon: "userHeart" },
  { k: "executor", t: "Executor", sub: "Formal process", d: "Your nominated executor can initiate the process with formal documentation, in line with estate administration.", icon: "scale" },
  { k: "multiple", t: "Multiple people", sub: "Shared authority", d: "Require more than one person to agree before verification begins — for example your spouse and your executor together.", icon: "users" },
  { k: "custom", t: "Custom rules", sub: "Advanced", d: "Combine conditions such as inactivity and a trusted-person request into a rule that matches your arrangements.", icon: "sliders" },
];

/* [icon, dot colour, day, title, body, release chip] — shared by Activation and the timeline page */
const ESCALATION = [
  ["bell", "#3f7a58", "Day 30", "Initial reminder", "A gentle “Are you OK?” email, SMS and push notification with a single confirm button.", "Nothing released", "green"],
  ["clock", "#3f7a58", "Day 37", "Follow-up reminder", "A second reminder is sent. Your vault stays completely sealed.", "Nothing released", "green"],
  ["users", "#ad8c47", "Day 44", "Trusted contact notified", "We tell your nominated contact that we haven't been able to confirm your status. No information is shared.", "Nothing released", "gold"],
  ["shieldCheck", "#0b1a33", "Day 51", "Verification begins", "Multiple verification stages begin, including independent confirmation that you have not responded.", "Emergency information only, after review", "blue"],
  ["unlock", "#0b1a33", "After verification", "Controlled release", "Only the information you authorised is released, to the people you chose, in the order you set.", "According to each item's release level", "blue"],
];

const CUSTOM_PRESETS = {
  "Spouse and executor together": ["If my spouse and my executor both request access", "Begin the verification process, then release each item according to its own release level."],
  "Inactivity plus a request": ["If I haven't confirmed my status for 30 days AND my spouse requests access", "Begin the verification process, then release each item according to its own release level."],
  "Two children agree": ["If two of my children request access together", "Begin the verification process, then release personal information first and everything else according to its own release level."],
};

const PanelHead = ({ title, lead }) => (
  <div>
    <h2 className="h3" style={{ fontSize: 21 }}>{title}</h2>
    <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px", maxWidth: 680 }}>{lead}</p>
  </div>
);

function Activation({ go }) {
  const [method, setMethod] = useState("inactivity");
  const [saved, setSaved] = useState("inactivity");
  const [interval, setInterval_] = useState(30);
  const [channels, setChannels] = useState({ email: true, sms: true, push: true, call: false });
  const [perm, setPerm] = useState({ sarah: true, jane: true, michael: false, adele: false, emma: false });
  const [minOn, setMinOn] = useState(true);
  const [minPeople, setMinPeople] = useState(2);
  const [rule, setRule] = useState(CUSTOM_PRESETS["Inactivity plus a request"]);
  const [emergencyOn, setEmergencyOn] = useState(true);
  const [emergencyTo, setEmergencyTo] = useState("sarah");
  const dirty = method !== saved;
  const requesters = PEOPLE.filter((p) => perm[p.id]);
  const infoOnly = PEOPLE.filter((p) => !perm[p.id]);
  return (
    <div className="lv-page">
      <PageHead eyebrow="Activation settings" title="How should your Legacy Vault activate?"
        lead="You remain in control. Choose how your Legacy Vault should respond if we can no longer reach you — and exactly who may begin the process."
        right={<Btn icon="sealed" disabled={!dirty} onClick={() => setSaved(method)}>Save activation settings</Btn>} />
      <Stats items={[["Active method", <span style={{ fontSize: 26, lineHeight: "32px", display: "block", maxWidth: 190 }}>{METHODS.find((m) => m.k === saved).t}</span>, saved === "inactivity" ? "Recommended" : "Your choice"], ["Check-in interval", `${interval} days`, "Next due 30 Oct 2026"], ["Can request access", String(requesters.length), "of your trusted people"], ["Verification stages", "5", "before any release"]]} />
      <div className="notice mt32"><Icon name="shieldCheck" size={18} style={{ marginTop: 3 }} />No response to a check-in does not automatically mean someone has died. Every path runs through multiple verification stages before any information is released.</div>

      <div className="row between" style={{ marginTop: 44, marginBottom: 24, alignItems: "flex-end" }}>
        <h2 className="h2">Choose an activation method</h2>
        <span className="small">You can change this at any time · Nothing takes effect without your confirmation</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
        {METHODS.map((m) => {
          const on = method === m.k;
          return (
            <button key={m.k} className={`select-card ${on ? "on" : ""}`} style={{ padding: "20px 20px 28px", minHeight: 310, display: "block" }} onClick={() => setMethod(m.k)}>
              <div className="row between" style={{ alignItems: "flex-start" }}>
                <div className="icon-box" style={{ width: 40, height: 40, background: on ? "#fff" : "#f5f1e8" }}><Icon name={m.icon} size={17} /></div>
                <span className={`radio gold ${on ? "on" : ""}`} style={{ width: 20, height: 20 }}>{on && <Icon name="check" size={11} stroke={2.6} />}</span>
              </div>
              <div className="h3 mt24" style={{ fontSize: 17, fontWeight: 600 }}>{m.t}</div>
              {m.rec ? <span className="chip gold mt12" style={{ borderRadius: 999, letterSpacing: ".12em", fontSize: 10.5, height: 22 }}><Icon name="shieldStar" size={11} />RECOMMENDED</span>
                : <div className="eyebrow muted mt12" style={{ fontSize: 10.5 }}>{m.sub}</div>}
              <p className="small mt12" style={{ color: "#45474d", lineHeight: "19.5px" }}>{m.d}</p>
            </button>
          );
        })}
      </div>

      {method === "inactivity" && (
        <div className="card mt32" style={{ padding: "40px 28px 32px" }}>
          <PanelHead title="Inactivity check-in" lead="Choose how often we check in. Every reminder includes a single confirm button, and nothing is ever released from a missed check-in alone." />
          <div className="field mt24"><label>Check-in frequency</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[[14, "Extra reassurance"], [30, "Recommended balance"], [60, "Less frequent"], [90, "Minimal contact"]].map(([d, s]) => (
                <button key={d} className={`select-card ${interval === d ? "on" : ""}`} style={{ padding: "12px 16px", borderRadius: 6 }} onClick={() => setInterval_(d)}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>Every {d} days</div><div className="tiny" style={{ marginTop: 2 }}>{s}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="hr mt24" />
          <div className="field mt24"><label>How we reach you</label>
            <div className="grid2" style={{ gap: 12 }}>
              {[["email", "mail", "Email", "john.venter@venterholdings.co.za"], ["sms", "receipt", "SMS", "+27 82 555 0147"], ["push", "phone", "Push", "Legacy Vault mobile app"], ["call", "phone", "Automated call", "A voice reminder as a final step"]].map(([k, i, t, s]) => (
                <button key={k} className={`select-card ${channels[k] ? "on" : ""}`} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, borderRadius: 6 }} onClick={() => setChannels({ ...channels, [k]: !channels[k] })}>
                  <div className="icon-box" style={{ width: 32, height: 32, background: "var(--paper)" }}><Icon name={i} size={14} /></div>
                  <span style={{ flex: 1 }}><span style={{ display: "block", fontSize: 14.5, fontWeight: 500 }}>{t}</span><span className="tiny">{s}</span></span>
                  <span className={`radio ${channels[k] ? "on" : ""}`}>{channels[k] && <Icon name="check" size={11} stroke={2.6} />}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt24"><LinkA onClick={() => go("activation/timeline")}>Review the full check-in schedule</LinkA></div>
        </div>
      )}

      {method === "trusted" && (
        <div className="card mt32" style={{ padding: "40px 28px 32px" }}>
          <PanelHead title="Trusted person" lead="Select who may ask us to begin the verification process. These permissions live in Trusted People — changing them here updates the same record." />
          <div className="mt24" style={{ borderTop: "1px solid var(--line)" }}>
            {PEOPLE.map((p) => (
              <div key={p.id} className="list-row" style={{ alignItems: "center", padding: "16px 0" }}>
                <div className="initials" style={{ width: 36, height: 36, fontSize: 11 }}>{p.ini}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</div><div className="small">{p.rel} · {p.role}</div></div>
                <span className="tiny" style={{ marginRight: 12 }}>{perm[p.id] ? "May request access" : "Cannot request"}</span>
                <Toggle on={perm[p.id]} dim={p.id === "emma"} onChange={(v) => p.id !== "emma" && setPerm({ ...perm, [p.id]: v })} />
              </div>
            ))}
          </div>
          <div className="notice sm mt16" style={{ alignItems: "center" }}><Icon name="shieldCheck" size={15} />A request never releases information on its own. We notify you first and give you the chance to confirm everything is OK.</div>
          <div className="mt24"><LinkA onClick={() => go("trusted-people")}>Manage Trusted People</LinkA></div>
        </div>
      )}

      {method === "executor" && (
        <div className="card mt32" style={{ padding: "40px 28px 28px" }}>
          <PanelHead title="Executor" lead="Your executor can begin the formal process with documentation such as a death certificate, a letter of appointment or a court order. We verify what is provided before anything is released." />
          <div className="card soft mt24" style={{ padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
            <div className="initials xl" style={{ width: 44, height: 44 }}>JS</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>Jane Smith</div><div className="small">Executor of the estate</div><div className="row gap6 tiny mt4" style={{ color: "var(--ink-2)" }}><Icon name="circleCheck" size={13} />Verified contact</div></div>
            <LinkA onClick={() => go("trusted-people/per_jane")}>View executor</LinkA>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 20 }}>
            {[["fileText", "Death certificate"], ["award", "Letter of appointment"], ["landmark", "Master's court order"]].map(([i, t]) => (
              <div key={t} className="row gap12" style={{ height: 50, padding: "0 16px", border: "1px solid var(--line)", borderRadius: 6, background: "var(--paper)", fontSize: 13, color: "var(--ink-2)" }}><Icon name={i} size={15} />{t}</div>
            ))}
          </div>
          <div className="notice amber sm mt20">Documentation is reviewed by our verification team. An executor's request does not release information until every required step is confirmed.</div>
        </div>
      )}

      {method === "multiple" && (
        <div className="card mt32" style={{ padding: "40px 28px 28px" }}>
          <PanelHead title="Multiple people" lead="Require more than one trusted person to agree before verification begins. This prevents a single person from starting the process alone." />
          <div className="card soft mt24" style={{ padding: "20px 20px", display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>Require a minimum number of people</div><div className="small mt4">Choose how many of your nominated people must request access together.</div></div>
            <Toggle on={minOn} onChange={setMinOn} />
          </div>
          {minOn && (
            <>
              <div className="field mt24"><label>Minimum people required</label>
                <div className="row gap8">{[2, 3, 4].map((n) => (
                  <button key={n} className={`select-card ${minPeople === n ? "on" : ""}`} style={{ width: 64, height: 44, borderRadius: 6, textAlign: "center", fontFamily: "var(--serif)", fontSize: 18 }} onClick={() => setMinPeople(n)}>{n}</button>
                ))}</div>
              </div>
              <div className="field mt24"><label>People in this rule</label>
                <div className="grid2" style={{ gap: 12 }}>
                  {requesters.map((p) => (
                    <div key={p.id} className="select-card on" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderRadius: 6 }}>
                      <span className="radio on" style={{ width: 16, height: 16 }}><Icon name="check" size={10} stroke={2.8} /></span>
                      <span><span style={{ display: "block", fontSize: 15, fontWeight: 500 }}>{p.name}</span><span className="tiny">{p.rel}</span></span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="notice blue sm mt20">Rule: if at least {Math.min(minPeople, requesters.length)} of {requesters.length} selected people request access together, the verification process begins. Nothing is released until it completes.</div>
            </>
          )}
        </div>
      )}

      {method === "custom" && (
        <div className="card mt32" style={{ padding: "40px 28px 28px" }}>
          <PanelHead title="Custom rules" lead="Build a condition that matches your arrangements. Combine inactivity with a trusted-person request, or require several people to agree." />
          <div className="row gap8 mt24">{Object.keys(CUSTOM_PRESETS).map((k) => (
            <button key={k} className="chip pill paper" style={{ height: 32, fontSize: 13, background: rule === CUSTOM_PRESETS[k] ? "var(--blue-bg)" : undefined, borderColor: rule === CUSTOM_PRESETS[k] ? "var(--blue-line)" : undefined }} onClick={() => setRule(CUSTOM_PRESETS[k])}>{k}</button>
          ))}</div>
          <div className="field mt24"><label>When this should happen</label><textarea className="input" rows={3} value={rule[0]} onChange={(e) => setRule([e.target.value, rule[1]])} /></div>
          <div className="field mt24"><label>Then what should happen</label><textarea className="input" rows={3} value={rule[1]} onChange={(e) => setRule([rule[0], e.target.value])} /></div>
          <div className="notice sm mt24" style={{ alignItems: "center" }}><Icon name="info" size={15} />Even the most advanced rules always run through verification. No condition ever releases information instantly.</div>
        </div>
      )}

      <div className="card mt32" style={{ padding: "40px 28px 32px" }}>
        <div className="row between" style={{ alignItems: "flex-end" }}>
          <PanelHead title="Who can initiate an access request" lead="These permissions come directly from your Trusted People. A request is the start of a process — never a switch that releases everything." />
          <LinkA onClick={() => go("trusted-people")}>Manage permissions</LinkA>
        </div>
        <div className="mt24" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: 24, alignItems: "start" }}>
          <div>
            <div className="eyebrow muted" style={{ paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>Can request access ({requesters.length})</div>
            {requesters.map((p) => (
              <div key={p.id} className="list-row" style={{ alignItems: "center", borderTop: 0, borderBottom: "1px solid var(--line)" }}>
                <div className="initials" style={{ width: 36, height: 36, fontSize: 11 }}>{p.ini}<span className="shield"><Icon name="shield" size={8} stroke={2.4} /></span></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</div><div className="tiny">{p.rel} · {p.role}</div></div>
                <button className="link sm" onClick={() => go("trusted-people/per_" + p.id)}>Manage</button>
              </div>
            ))}
            <div className="eyebrow muted" style={{ padding: "22px 0 12px" }}>Information only ({infoOnly.length})</div>
            <div className="row gap8" style={{ flexWrap: "wrap" }}>{infoOnly.map((p) => <span key={p.id} className="chip plain" style={{ height: 30, borderRadius: 999, padding: "0 12px", fontSize: 12 }}><Icon name="user" size={12} />{p.name}</span>)}</div>
            <p className="tiny mt12">These people receive information only. They cannot begin a request themselves.</p>
          </div>
          <div className="card soft" style={{ padding: 20 }}>
            <div className="eyebrow muted">What happens when someone requests</div>
            <div className="mt16">
              {[["userHeart", "Someone trusted asks for access"], ["bell", "You are notified straight away"], ["shieldCheck", "Multi-stage verification runs"], ["lock", "Only authorised information releases"]].map(([i, t], k, arr) => (
                <div key={t} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 12, paddingBottom: k === arr.length - 1 ? 0 : 40, position: "relative" }}>
                  {k < arr.length - 1 && <span style={{ position: "absolute", left: 13.5, top: 34, bottom: 6, width: 1, background: "var(--line)" }} />}
                  <div className="icon-round" style={{ width: 28, height: 28, background: "var(--paper)" }}><Icon name={i} size={13} /></div>
                  <span className="small" style={{ color: "var(--ink-2)", paddingTop: 4 }}>{t}</span>
                </div>
              ))}
            </div>
            <div className="mt20"><LinkA small onClick={() => go("access-request")}>See the full journey</LinkA></div>
          </div>
        </div>
      </div>

      <div className="card mt32" style={{ padding: "40px 28px 32px" }}>
        <div className="row between" style={{ alignItems: "flex-end" }}>
          <PanelHead title="What happens if we can't reach you" lead="A calm, multi-stage escalation. No response never automatically means someone has died." />
          <LinkA onClick={() => go("activation/timeline")}>Open the full timeline</LinkA>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 20, marginTop: 28 }}>
          {ESCALATION.map(([i, dot, day, t, d, chip]) => (
            <div key={t}>
              <div className="row gap10"><span style={{ width: 8, height: 8, borderRadius: "50%", background: dot }} /><span className="eyebrow muted" style={{ fontSize: 11 }}>{day}</span><span style={{ flex: 1, height: 1, background: "var(--line)" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, marginTop: 14 }}>
                <div className="icon-box" style={{ width: 32, height: 32, background: "#f5f1e8" }}><Icon name={i} size={14} /></div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, lineHeight: "20px" }}>{t}</div>
                  <p className="small mt4" style={{ color: "#45474d" }}>{d}</p>
                  <span className="chip paper mt12" style={{ borderRadius: 999, height: "auto", minHeight: 24, padding: "4px 10px", fontSize: 11, whiteSpace: "normal", lineHeight: "15px" }}><Icon name="lock" size={11} />{chip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid2 mt32" style={{ gap: 24, alignItems: "stretch" }}>
        <div className="card" style={{ padding: "28px 28px 32px" }}>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <PanelHead title="Emergency access" lead="Release a small set of essential information now — while you are still here — for an unexpected hospital stay, travel or emergency." />
            <Toggle on={emergencyOn} onChange={setEmergencyOn} />
          </div>
          {emergencyOn && (
            <>
              <div className="eyebrow muted mt24" style={{ fontSize: 10.5 }}>Release emergency information to</div>
              <div className="row gap8 mt12">{PEOPLE.filter((p) => p.canRequest).map((p) => (
                <button key={p.id} className={`select-card ${emergencyTo === p.id ? "on" : ""}`} style={{ width: "auto", padding: "8px 14px", borderRadius: 999, fontSize: 13 }} onClick={() => setEmergencyTo(p.id)}>{p.name}</button>
              ))}</div>
              <div className="mt16">
                {["Medical aid details", "Funeral policy and wishes", "Insurance information", "Emergency and financial contacts", "Location of the will and executor details"].map((t) => (
                  <div key={t} className="row gap12 small" style={{ marginTop: 12, color: "var(--ink-2)" }}><Icon name="circleCheck" size={15} />{t}</div>
                ))}
              </div>
              <div className="notice amber sm mt20">Only {PEOPLE.find((p) => p.id === emergencyTo).name.split(" ")[0]} receives this, and only after you confirm the request. It can be revoked at any time.</div>
            </>
          )}
        </div>
        <div className="card" style={{ padding: "28px 28px 32px" }}>
          <PanelHead title="Activation history" lead="A complete record of every activation change." />
          {[["shield", "Activation method reviewed and confirmed as inactivity check-in.", "30 Sep 2026"], ["circleCheck", "Your Legacy Vault check-in was confirmed. Next check-in 30 Oct 2026.", "28 Sep 2026"], ["userPlus", "Sarah Venter granted permission to initiate an access request.", "12 Sep 2026"], ["lock", "No access request has ever been made. No information released.", "01 Sep 2026"]].map(([i, t, at]) => (
            <div key={t} className="row gap16" style={{ alignItems: "flex-start", marginTop: 26 }}>
              <div className="icon-round" style={{ width: 32, height: 32, background: "#f5f1e8" }}><Icon name={i} size={13} /></div>
              <div><div style={{ fontSize: 15, lineHeight: "23px" }}>{t}</div><div className="eyebrow muted" style={{ fontSize: 10.5, marginTop: 4 }}>{at}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="row gap8 small" style={{ justifyContent: "center", marginTop: 40 }}><Icon name="lock" size={13} />Secure · Private · Encrypted · Controlled access · You remain in control</div>
      <Footer />
    </div>
  );
}

function Timeline({ go }) {
  return (
    <div className="lv-page">
      <PageHead eyebrow="Activation settings · Escalation timeline" title="What happens if we can't reach you"
        lead="Not responding to a check-in never automatically means someone has died — it simply begins a careful, reversible escalation." />
      <div className="notice"><Icon name="shieldCheck" size={18} style={{ marginTop: 2 }} />Every stage is a week apart, and a single check-in stops the entire process. Your vault stays sealed until verification is complete.</div>
      <div className="col2 mt32">
        <div className="card" style={{ padding: "32px 28px 12px" }}>
          <h2 className="h3" style={{ fontSize: 21 }}>The stages, step by step</h2>
          <div className="tl mt24">
            {ESCALATION.map(([i, , day, t, d, chip, tone]) => (
              <div key={t} className="tl-item" style={{ paddingBottom: 30 }}>
                <div className={`icon-round ${tone}`} style={{ width: 40, height: 40 }}><Icon name={i} size={16} /></div>
                <div>
                  <div className="eyebrow muted">{day}</div>
                  <div className="h3 mt4" style={{ fontSize: 19 }}>{t}</div>
                  <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>{d}</p>
                  <span className="chip paper mt12" style={{ borderRadius: 999, height: 26 }}><Icon name="lock" size={12} />{chip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="stack">
          <div className="card soft" style={{ padding: 24 }}>
            <div className="eyebrow muted">Your safeguards</div>
            {[["bell", "Multiple reminders on every channel you enable."], ["users", "A trusted contact is involved before verification."], ["shield", "Several verification stages, not a single trigger."], ["lock", "Release only of what you authorised."], ["undo", "Any check-in instantly stops the process."]].map(([i, t]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}><div className="icon-round" style={{ width: 26, height: 26, background: "var(--paper)" }}><Icon name={i} size={12} /></div><span className="small" style={{ color: "var(--ink-2)" }}>{t}</span></div>
            ))}
          </div>
          <div className="card" style={{ padding: 24, background: "var(--amber-bg)", borderColor: "var(--amber-line)" }}>
            <div className="eyebrow" style={{ color: "#3a2e14" }}>Remember</div>
            <p className="small mt12" style={{ color: "#3a2e14" }}>Not responding is not the same as dying. Legacy Vault exists to give your family certainty, and it does so gently.</p>
          </div>
        </div>
      </div>

      <div className="card mt32" style={{ padding: "32px 28px 28px" }}>
        <div className="row between" style={{ alignItems: "flex-start" }}>
          <PanelHead title="What a trusted person sees" lead="When someone requests access, they see reassurance — not a switch. You are always notified and always given the chance to respond first." />
          <button className="chip pill paper" style={{ height: 30, fontSize: 12 }} onClick={() => go("access-request")}>Open the full request screen<Icon name="arrowRight" size={12} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          <JohnPrompt title="Access request received" body="John has been notified that you requested access to his Legacy File. We've sent him a notification and given him the opportunity to confirm that everything is OK." note="Interactive preview. In the live product these actions notify John and, if selected, open a direct line to him." />
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>What happens next</div>
            {[["clock", "If we don't hear from John within 48 hours, we send another notification. You will not be left guessing."], ["shieldCheck", "Verification then runs against your activation rules. If John configured multiple people, every required person is contacted."], ["lock", "Only once every stage is complete does the controlled release begin — and only for what John authorised you to receive."]].map(([i, t]) => (
              <div key={t} className="row gap12 small mt16" style={{ alignItems: "flex-start", color: "var(--ink-2)" }}><Icon name={i} size={14} style={{ marginTop: 3 }} /><span>{t}</span></div>
            ))}
            <div className="hr mt16" />
            <div className="row gap12 tiny mt16" style={{ alignItems: "flex-start", color: "#6d5520" }}><Icon name="zap" size={14} style={{ marginTop: 1 }} /><span>Emergency information such as a funeral policy or medical aid can be flagged for faster release, once verified.</span></div>
          </div>
        </div>
      </div>
      <div className="card mt24" style={{ padding: "22px 20px", background: "var(--blue-bg)", borderColor: "#c9d6e6" }}>
        <div className="row gap12" style={{ fontSize: 14, alignItems: "flex-start" }}><Icon name="sliders" size={16} style={{ marginTop: 2 }} /><span style={{ maxWidth: 560 }}>Every stage above is governed by your activation method. Choose who may begin the process and how many people must agree.</span></div>
        <Btn size="sm" icon="undo" style={{ marginTop: 16 }} onClick={() => go("activation")}>Back to activation settings</Btn>
      </div>
      <Footer />
    </div>
  );
}

/* The "Are you OK?" card a requester sees — preview-only buttons */
function JohnPrompt({ title, body, note, notification }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className="card soft" style={{ padding: 24 }}>
      {notification ? (
        <div className="row gap12"><div className="icon-box" style={{ width: 36, height: 36, background: "var(--night)", borderColor: "var(--night)", color: "#fff" }}><Icon name="leaf" size={15} /></div><div><div style={{ fontSize: 13, fontWeight: 500 }}>Legacy Vault</div><div className="tiny" style={{ fontSize: 11 }}>Just now</div></div></div>
      ) : (
        <div className="icon-round" style={{ width: 32, height: 32, background: "var(--night)", borderColor: "var(--night)", color: "#fff" }}><Icon name="userHeart" size={14} /></div>
      )}
      <h3 className="h3 mt20" style={{ fontSize: 19 }}>{title}</h3>
      <p className="body mt8" style={{ fontSize: notification ? 15 : 13.5, lineHeight: notification ? "23px" : "20px" }}>{body}</p>
      <div className="row gap8 mt20">
        <Btn size="sm" icon="check" onClick={() => setPicked("ok")}>I'm OK</Btn>
        <button className="btn btn-line sm" style={picked === "help" ? { background: "#fbf0d8", borderColor: "#ecd7a6" } : null} onClick={() => setPicked("help")}><Icon name="handHeart" size={14} />I need help</button>
      </div>
      {(picked || !notification) && <div className="row gap6 tiny mt12" style={{ alignItems: "flex-start", fontSize: 11 }}>{notification && <Icon name="info" size={12} style={{ marginTop: 2 }} />}<span>{note}</span></div>}
    </div>
  );
}

/* ---------------------------------------------------------- Trusted people */
function TrustedPeople({ go }) {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(false);
  const list = PEOPLE.filter((p) => tab === "all" || (tab === "req" ? p.canRequest : p.status !== "Verified"));
  return (
    <div className="lv-page">
      <PageHead eyebrow="Trusted people" title="The people you trust, on your terms"
        lead="Decide exactly who receives which information, and whether they may initiate an access request. Different people can receive different things — nothing is ever shared automatically."
        right={<Btn icon="userPlus" onClick={() => setOpen(true)}>Add trusted person</Btn>} />
      <Stats items={[["Trusted people", "5", "named in your vault"], ["Can request access", "2", "after verification"], ["Awaiting confirmation", "1", "invitations outstanding"], ["Categories covered", "7", "handed over to someone"]]} />
      <div className="tabs mt32" style={{ height: 42 }}>
        {[["all", "All people"], ["req", "Can request access"], ["wait", "Awaiting confirmation"]].map(([k, l]) => (
          <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
        ))}
        <span className="small" style={{ marginLeft: "auto", paddingRight: 10 }}>Showing {list.length} of 5</span>
      </div>
      <div className="grid3 mt32">
        {list.map((p) => (
          <div key={p.id} className="card" style={{ padding: "24px 24px 26px" }}>
            <div className="row gap16" style={{ alignItems: "flex-start" }}>
              <div className="initials serif xl" style={{ width: 48, height: 48 }}>{p.ini}{p.canRequest && <span className="shield"><Icon name="shield" size={8} stroke={2.4} /></span>}</div>
              <div><div className="h3" style={{ fontSize: 21 }}>{p.name}</div><div className="small mt4" style={{ color: "var(--ink-2)" }}><Icon name={p.relIcon} size={13} style={{ verticalAlign: -2, marginRight: 6 }} />{p.rel} · {p.role}</div></div>
            </div>
            <div className="row gap8 mt20">
              {p.status === "Verified" ? <span className="chip green" style={{ borderRadius: 999, height: 28, padding: "0 12px" }}><span className="dot" style={{ background: "var(--green-dot)" }} />Verified</span>
                : <span className="chip gold" style={{ borderRadius: 999, height: 28, padding: "0 12px" }}><span className="dot" />Awaiting confirmation</span>}
              {p.canRequest && <span className="chip blue" style={{ borderRadius: 999, height: 28, padding: "0 12px" }}><Icon name="shield" size={12} />Can request access</span>}
            </div>
            <div className="eyebrow muted mt20">What they can access</div>
            <div className="row gap6 mt12" style={{ flexWrap: "wrap" }}>{p.access.map((a) => <span key={a} className="tag">{a}</span>)}</div>
            <p className="small mt16" style={{ color: "#45474d", lineHeight: "20px" }}>{p.note}</p>
            <div className="hr mt20" />
            <div className="row between mt20"><span className="tiny">Added {p.added}</span><LinkA onClick={() => go("trusted-people/per_" + p.id)}>Manage access</LinkA></div>
          </div>
        ))}
      </div>
      <div className="notice mt32"><Icon name="shieldCheck" size={18} style={{ marginTop: 3 }} />Being listed here does not grant access. Every person only receives what you authorise, and only after your configured verification steps are complete.</div>
      <p className="small mt32" style={{ color: "var(--ink-3)" }}>Relationship types include Spouse, Partner, Child, Parent, Sibling, Executor, Attorney, Financial Adviser, Business Partner And Other Trusted Person.</p>
      <Footer />
      {open && <AddPersonModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function AddPersonModal({ onClose }) {
  const [sel, setSel] = useState({ Financial: true, Insurance: true });
  const [req, setReq] = useState(false);
  const [name, setName] = useState("");
  const cats = ["Financial", "Insurance", "Property", "Vehicles", "Documents", "Digital", "Personal", "Funeral"];
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ width: 672 }} onClick={(e) => e.stopPropagation()}>
        <div className="row between" style={{ padding: "22px 24px 22px", borderBottom: "1px solid var(--line)", alignItems: "flex-start" }}>
          <div><div className="eyebrow">Trusted people</div><h2 className="h2 mt4" style={{ fontSize: 22 }}>Add a trusted person</h2></div>
          <button className="modal-x" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div style={{ padding: "32px 24px 24px" }}>
          <div className="field"><label>Full name</label><input className="input" placeholder="e.g. Sarah Venter" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="grid2 mt24" style={{ gap: 16 }}>
            <div className="field"><label>Relationship</label><select className="input">{["Spouse", "Partner", "Child", "Parent", "Sibling", "Executor", "Attorney", "Financial Adviser", "Business Partner", "Other Trusted Person"].map((r) => <option key={r}>{r}</option>)}</select></div>
            <div className="field"><label>Role</label><input className="input" placeholder="e.g. Primary contact" /></div>
            <div className="field mt8"><label>Email</label><input className="input" placeholder="name@example.com" /></div>
            <div className="field mt8"><label>Phone</label><input className="input" placeholder="+27 82 000 0000" /></div>
          </div>
          <div className="field mt24"><label>What can they access?</label>
            <div className="grid2" style={{ gap: 8 }}>
              {cats.map((c) => (
                <button key={c} className={`opt ${sel[c] ? "on" : ""}`} onClick={() => setSel({ ...sel, [c]: !sel[c] })}>
                  <span className={`radio ${sel[c] ? "on" : ""}`} style={{ width: 16, height: 16 }}>{sel[c] && <Icon name="check" size={10} stroke={2.8} />}</span>
                  <Icon name={catIcon(c)} size={16} />{c}
                </button>
              ))}
            </div>
          </div>
          <div className="card soft mt24" style={{ padding: "16px 16px 18px" }}>
            <div className="row between"><b style={{ fontWeight: 500 }}>May they initiate an access request?</b><Toggle on={req} onChange={setReq} /></div>
            <p className="small mt8" style={{ maxWidth: 500 }}>If enabled, this person can ask us to begin verification. Information is never released without your configured safeguards.</p>
          </div>
        </div>
        <div className="row gap12" style={{ justifyContent: "flex-end", padding: "20px 24px", borderTop: "1px solid var(--line)" }}>
          <Btn kind="line" onClick={onClose}>Cancel</Btn>
          <Btn icon="userPlus" disabled={!name.trim()} onClick={onClose}>Send invitation</Btn>
        </div>
      </div>
    </div>
  );
}

const RELEASE_OPTIONS = [["emergency", "Immediate"], ["verified", "After verification"], ["locked", "Separate schedule"], ["personal", "Personal only"]];
const PERSON_LEVELS = {
  sarah: { Financial: "verified", Insurance: "emergency", Property: "verified", Vehicles: "verified", Personal: "personal", Funeral: "emergency" },
  jane: { Financial: "verified", Property: "verified", Vehicles: "verified", Documents: "verified" },
  michael: { Documents: "locked", Personal: "personal" },
  adele: { Financial: "verified", Insurance: "verified" },
  emma: { Personal: "personal" },
};
/* Per-person dates and the third access-history line */
const PERSON_META = {
  sarah: ["30 Sep 2026", ["eye", "Confirmed her identity on 30 Sep 2026", "—"]],
  jane: ["30 Sep 2026", ["eye", "Viewed the Legacy Pack on 26 Sep 2026", "—"]],
  michael: ["14 Sep 2026", ["eye", "Added 14 Sep 2026", "—"]],
  adele: ["22 Sep 2026", ["eye", "Viewed financial summary on 22 Sep 2026", "—"]],
  emma: ["25 Sep 2026", ["eye", "Invitation sent 25 Sep 2026", "—"]],
};
const PERSON_NOTES = {
  jane: "ABC Attorneys. Holds the original will, the trust deed and the 1Password Emergency Kit. Listed as a co-requester.",
  michael: "Receives the BMW X5 and a personal letter. Not permitted to initiate an access request.",
  adele: "Private banker at Investec. Assists with the estate liquidity plan and beneficiary nominations.",
  emma: "Invitation sent, awaiting confirmation of her contact details.",
};

function PersonDetail({ id, go }) {
  const p = PEOPLE.find((x) => x.id === id) || PEOPLE[1];
  const first = p.name.split(" ")[0];
  const initial = PERSON_LEVELS[p.id] || Object.fromEntries(p.access.map((k) => [k, k === "Personal" ? "personal" : "verified"]));
  const [levels, setLevels] = useState(initial);
  const [canRequest, setCanRequest] = useState(p.canRequest);
  const [saved, setSaved] = useState({ levels: initial, canRequest: p.canRequest });
  const [notice, setNotice] = useState(false);
  const dirty = JSON.stringify(levels) !== JSON.stringify(saved.levels) || canRequest !== saved.canRequest;
  const granted = Object.keys(levels).length;
  const handed = Object.entries(ITEMS).flatMap(([cat, rows]) => rows.filter((r) => r[3] && r[3].startsWith(p.name)).map((r) => ({ cat, name: r[0], level: r[4] })));
  const toggleCat = (k, on) => { const n = { ...levels }; if (on) n[k] = k === "Personal" ? "personal" : "verified"; else delete n[k]; setLevels(n); };
  const [updated, third] = PERSON_META[p.id];
  const history = [
    ["shield", "Permissions reviewed and confirmed.", updated],
    ["userPlus", `${p.name} was added as a trusted person.`, p.added],
    third,
  ];
  return (
    <div className="lv-page">
      <div className="row gap8 small" style={{ color: "var(--ink-3)", marginBottom: 24 }}>
        <button onClick={() => go("trusted-people")}>Trusted People</button><Icon name="chevronRight" size={13} /><span style={{ color: "var(--ink)" }}>{p.name}</span>
      </div>
      <div className="row between" style={{ paddingBottom: 28, borderBottom: "1px solid var(--line)", marginBottom: 32 }}>
        <div className="row gap16">
          <div className="initials" style={{ width: 48, height: 48, fontSize: 13 }}>{p.ini}</div>
          <div>
            <div className="row gap12"><h1 className="h1" style={{ fontSize: 36, lineHeight: "40px" }}>{p.name}</h1>
              {p.status === "Verified" ? <span className="chip green" style={{ borderRadius: 999, height: 22, fontSize: 11 }}>Verified</span> : <span className="chip gold" style={{ borderRadius: 999, height: 22, fontSize: 11 }}>Awaiting confirmation</span>}</div>
            <div className="row gap8 small mt4" style={{ color: "var(--ink-2)" }}><Icon name={p.relIcon} size={13} />{p.rel} · {p.role}</div>
          </div>
        </div>
        <div className="row gap12">
          {dirty && <span className="row gap6 small" style={{ fontSize: 12.5 }}><Icon name="tag" size={13} />Unsaved changes</span>}
          <Btn kind="line" size="sm" icon="send" style={{ height: 40 }}>Send a reminder</Btn>
          <Btn size="sm" icon="sealed" style={{ height: 40 }} disabled={!dirty} onClick={() => { setSaved({ levels, canRequest }); setNotice(true); }}>Save permissions</Btn>
        </div>
      </div>
      {notice && <div className="notice sm" style={{ marginBottom: 24, alignItems: "center", fontSize: 14 }}><Icon name="circleCheck" size={16} />Permissions updated. This change was recorded in your Access History.</div>}
      <div className="col2" style={{ gridTemplateColumns: "minmax(0,1fr) 300px" }}>
        <div className="stack">
          <div className="card" style={{ padding: "32px 28px 12px" }}>
            <div className="row between" style={{ alignItems: "flex-start" }}>
              <div><h2 className="h3" style={{ fontSize: 21 }}>What they can access</h2><p className="body mt8" style={{ fontSize: 15 }}>Grant access per category and choose how each is released.</p></div>
              <span className="chip plain" style={{ borderRadius: 999, height: 26, marginTop: 4 }}>{granted} of 8 categories</span>
            </div>
            <div className="mt16">
              {CATEGORIES.map((c) => {
                const lv = levels[c.key];
                return (
                  <div key={c.key} className="list-row" style={{ padding: "18px 0", display: "grid", gridTemplateColumns: "36px 1fr auto 40px", columnGap: 14, alignItems: "start" }}>
                    <div className="icon-box" style={{ width: 32, height: 32 }}><Icon name={c.icon} size={14} /></div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{c.key}</div>
                      <div className="small" style={{ maxWidth: 360, color: "#45474d", fontSize: 13 }}>{c.desc}</div>
                      {lv && <div className="row gap10 mt12"><LevelChip level={lv} badge={false} /><span className="tiny">{LEVELS[lv].note}</span></div>}
                    </div>
                    {lv ? (
                      <select className="input" style={{ height: 34, width: 162, fontSize: 13, padding: "0 10px" }} value={lv} onChange={(e) => setLevels({ ...levels, [c.key]: e.target.value })}>
                        {RELEASE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    ) : <span className="tiny" style={{ paddingTop: 8 }}>No access</span>}
                    <div style={{ paddingTop: 6 }}><Toggle on={!!lv} onChange={(on) => toggleCat(c.key, on)} /></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card" style={{ padding: "32px 28px 16px" }}>
            <h2 className="h3" style={{ fontSize: 21 }}>What will be handed over</h2>
            <p className="body mt8" style={{ fontSize: 15 }}>Items currently assigned to {first} in your inventory.</p>
            <div className="mt16">
              {handed.length ? handed.map((it) => (
                <div key={it.name} className="list-row" style={{ alignItems: "center" }}>
                  <div className="icon-box" style={{ width: 32, height: 32 }}><Icon name={catIcon(it.cat)} size={14} /></div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>{it.name}</div><div className="tiny">{it.cat}</div></div>
                  <LevelChip level={it.level} />
                </div>
              )) : <div className="small" style={{ margin: "4px 0 16px", padding: "20px 16px", border: "1px dashed var(--line)", borderRadius: 6, textAlign: "center", fontSize: 13.5 }}>No inventory items are assigned to this person yet.</div>}
            </div>
          </div>
          <div className="card" style={{ padding: "32px 28px 28px" }}>
            <h2 className="h3" style={{ fontSize: 21 }}>Notes</h2>
            <p className="body mt12" style={{ fontSize: 15, lineHeight: "23px" }}>{PERSON_NOTES[p.id] || `${first} is listed as ${p.role.toLowerCase()}.`}</p>
            <div className="card soft mt16" style={{ padding: "14px 16px 16px" }}><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Release rule</div><div className="mt8" style={{ fontSize: 14 }}>{p.note}</div></div>
          </div>
        </div>
        <div className="stack">
          <div className="card soft" style={{ padding: 20 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Contact details</div>
            {[["Email", p.email], ["Phone", p.phone], ["Preferred contact", p.channel]].map(([l, v]) => (
              <div key={l} className="mt12"><div className="eyebrow muted" style={{ fontSize: 10 }}>{l}</div><div style={{ fontSize: 14, marginTop: 2 }}>{v}</div></div>
            ))}
            <div className="hr mt16" />
            <div className="row gap8 tiny mt12" style={{ color: "var(--ink-2)" }}><Icon name={p.status === "Verified" ? "circleCheck" : "clock"} size={13} />{p.status === "Verified" ? "Contact details verified" : "Awaiting confirmation"}</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Access request</div>
            <div className="row between mt12"><b style={{ fontSize: 14.5, fontWeight: 500 }}>May initiate an access request</b><Toggle on={canRequest} dim={p.status !== "Verified"} onChange={(v) => p.status === "Verified" && setCanRequest(v)} /></div>
            <p className="tiny mt8" style={{ lineHeight: "18px" }}>This person can ask us to begin the verification process. Nothing is released immediately.</p>
            {canRequest
              ? <div className="notice sm mt12" style={{ fontSize: 12, padding: "12px 14px" }}><Icon name="shieldCheck" size={14} style={{ marginTop: 1 }} />Combined with your activation rules, release only proceeds after your configured verification steps.</div>
              : <div className="card soft mt12" style={{ fontSize: 12, padding: "12px 14px", color: "var(--ink-2)" }}>This person receives information only. They cannot start a request themselves.</div>}
            <div className="mt16"><LinkA small onClick={() => go("activation")}>Review activation rules</LinkA></div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Permission summary</div>
            {[["Categories granted", granted], ["Items assigned", handed.length], ["Can request access", canRequest ? "Yes" : "No"], ["Last updated", updated]].map(([k, v]) => (
              <div key={k} className="kv" style={{ padding: "6px 0" }}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Access history</div>
            {history.map(([i, t, d]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
                <div className="icon-round" style={{ width: 26, height: 26 }}><Icon name={i} size={12} /></div>
                <div><div style={{ fontSize: 13, lineHeight: "19px" }}>{t}</div><div className="tiny" style={{ fontSize: 11 }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------- Emergency */
function useCountdown(endsAt) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { if (!endsAt) return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [endsAt]);
  if (!endsAt) return null;
  const s = Math.max(0, Math.floor((endsAt - now) / 1000));
  const pad = (n) => String(n).padStart(2, "0");
  return [Math.floor(s / 3600), pad(Math.floor((s % 3600) / 60)), pad(s % 60)];
}

function Emergency({ go }) {
  const [recipient, setRecipient] = useState("sarah");
  const [windowD, setWindowD] = useState(7);
  const [items, setItems] = useState(ESSENTIALS.map((e) => e.on));
  const [reason, setReason] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [active, setActive] = useState(null); // { endsAt, at }
  const [revoked, setRevoked] = useState(false);
  const cd = useCountdown(active && active.endsAt);
  const who = PEOPLE.find((p) => p.id === recipient);
  const count = items.filter(Boolean).length;
  const windows = [[1, "24 hours", "A single day"], [3, "3 days", "A short hospital stay"], [7, "7 days", "Most commonly chosen"], [30, "30 days", "Extended recovery"]];
  const wLabel = windows.find((w) => w[0] === windowD)[1];
  const activate = () => {
    const d = new Date();
    setActive({ endsAt: Date.now() + windowD * 86400000, at: `${d.getDate()} Sept ${d.getFullYear()}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}` });
    setConfirm(false); setRevoked(false);
  };
  return (
    <div className="lv-page">
      <PageHead eyebrow="Emergency mode" title="Temporary access, while you're still here"
        lead="Sometimes the people you trust need the essentials sooner — a hospital stay, a trip, or an unexpected moment. Emergency Mode shares a small, chosen set of information for a limited time, and you can revoke it in one tap."
        right={active ? <span className="chip pill gold" style={{ background: "#fbf3e0" }}><span className="dot" style={{ background: "var(--gold)" }} />Emergency Mode active</span>
          : <span className="chip pill plain"><span className="dot" style={{ background: "#8b8c90" }} />Emergency Mode off</span>} />

      {revoked && !active && (
        <div className="notice" style={{ marginBottom: 32 }}><Icon name="circleCheck" size={18} style={{ marginTop: 3 }} />Emergency Mode has been revoked. Access closed immediately, nothing further will be shared, and this revocation is now part of your history.<button className="x" onClick={() => setRevoked(false)}><Icon name="x" size={16} /></button></div>
      )}

      {active ? (
        <section className="hero" style={{ padding: "40px 36px 42px" }}>
          <div className="row gap12"><span className="eyebrow">Emergency mode</span><span className="chip dark-gold" style={{ borderRadius: 999, height: 26 }}><span className="dot" style={{ background: "#d9b872", boxShadow: "0 0 0 3px rgba(217,184,114,.25)" }} />Active now</span></div>
          <div className="row between" style={{ marginTop: 20, alignItems: "center", gap: 32 }}>
            <div style={{ maxWidth: 540 }}>
              <h2 className="h1" style={{ color: "#fff", fontSize: 30, lineHeight: "36px" }}>Essential information is shared, on a timer</h2>
              <p style={{ color: "#e7e9ee", fontSize: 15, lineHeight: "23px", marginTop: 12 }}>{who.name} can currently see {count} essential items and nothing else. This closes by itself when the window ends — or the moment you revoke it.</p>
            </div>
            <div className="row gap16">
              <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, background: "#01050f", padding: "18px 20px 16px", minWidth: 172 }}>
                <div className="eyebrow" style={{ color: "#9fb5d8", fontSize: 10.5 }}>Closes in</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 32, lineHeight: 1.1, marginTop: 6, fontVariantNumeric: "lining-nums tabular-nums" }}>{cd[0]}<span style={{ color: "#8ea6cd" }}>:</span>{cd[1]}<span style={{ color: "#8ea6cd" }}>:</span>{cd[2]}</div>
              </div>
              <button className="btn" style={{ border: "1px solid rgba(217,184,114,.6)", color: "#fff", background: "#141410", fontWeight: 500 }} onClick={() => { setActive(null); setRevoked(true); }}><Icon name="undo" size={16} />Revoke now</button>
            </div>
          </div>
          <div className="hr" style={{ background: "rgba(255,255,255,.1)", marginTop: 28 }} />
          <div className="row gap8" style={{ marginTop: 18, color: "#c6cedc", fontSize: 12.5 }}><Icon name="clock" size={13} />Switched on {active.at}. You can revoke at any moment and everything closes instantly.</div>
        </section>
      ) : (
        <section className="card soft" style={{ padding: "32px 32px", display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div className="icon-round" style={{ width: 48, height: 48, background: "var(--paper)" }}><Icon name="siren" size={20} /></div>
          <div style={{ flex: 1, maxWidth: 500 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>Emergency Mode is standing by</h2>
            <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>It is switched off right now. Nothing is shared with anyone until you deliberately turn it on — for a hospital stay, a trip, or any moment you want a trusted person to have the essentials.</p>
          </div>
          <div className="row gap8" style={{ marginLeft: "auto", marginTop: 26 }}>
            <span className="chip pill paper"><Icon name="userHeart" size={13} />Ready for {who.name}</span>
            <span className="chip pill paper"><Icon name="listTodo" size={13} />{count} essentials ready</span>
          </div>
        </section>
      )}

      <div className="mt32"><Stats items={[["Status", active ? "Active" : "Standby", active ? "Sharing the essentials" : "Switched off right now"], ["Recipient", who.name.split(" ")[0], who.rel], ["Essentials ready", String(count), "of 8 available"], ["Window", wLabel, "Longest available 30 days"]]} /></div>

      <div className="row between" style={{ marginTop: 44, marginBottom: 20, alignItems: "flex-end" }}>
        <h2 className="h2">How Emergency Mode works</h2><span className="small">On by you · Limited window · Revocable in one tap</span>
      </div>
      <div className="stats" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[["toggle", "01", "You switch it on", "Emergency Mode is only ever turned on by you, from this screen, while you are alive and in control."], ["fingerprint", "02", "We confirm it's really you", "We check the request against your registered device and identity before a single item moves."], ["timer", "03", "Only essentials, for a set time", "The nominated person sees only the essential items you picked, and only inside the window you chose."], ["undo", "04", "You revoke it — any time", "One tap ends it immediately. Access closes, the record stays, and nothing else is ever released."]].map(([i, n, t, d]) => (
          <div key={n} style={{ padding: "24px 24px 26px" }}>
            <div className="row between"><div className="icon-box"><Icon name={i} size={15} /></div><span style={{ fontFamily: "var(--serif)", fontSize: 20, color: "#c9c3b4" }}>{n}</span></div>
            <div className="h4 mt24" style={{ fontSize: 15 }}>{t}</div>
            <p className="small mt8" style={{ color: "#45474d", lineHeight: "19.5px" }}>{d}</p>
          </div>
        ))}
      </div>

      <div className="col2 mt32">
        <div className="stack">
          <div className="card" style={{ padding: "40px 28px 28px" }}>
            <h2 className="h3" style={{ fontSize: 21 }}>Who receives the essentials</h2>
            <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>Choose a single trusted person. Emergency Mode never shares with more than one person at a time, so you always know exactly who is holding it.</p>
            <span className="chip pill plain mt16"><Icon name="lock" size={12} />One recipient at a time</span>
            <div className="grid2 mt20" style={{ opacity: active ? .55 : 1, pointerEvents: active ? "none" : "auto" }}>
              {PEOPLE.slice(0, 4).map((p) => {
                const on = recipient === p.id;
                return (
                  <button key={p.id} className={`select-card ${on ? "on" : ""}`} style={{ padding: "16px 16px", display: "flex", alignItems: "center", gap: 14 }} onClick={() => setRecipient(p.id)}>
                    <div className="initials">{p.ini}<span className="ok"><Icon name="check" size={8} stroke={3} /></span></div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</div><div className="tiny">{p.rel} · {p.channel}</div></div>
                    <span className={`radio ${on ? "on" : ""}`} style={{ width: 20, height: 20 }}>{on && <Icon name="check" size={11} stroke={2.6} />}</span>
                  </button>
                );
              })}
            </div>
            <div className="row gap8 tiny mt16" style={{ alignItems: "flex-start" }}><Icon name="info" size={13} style={{ marginTop: 2 }} />This person must already be confirmed in your Trusted People. You can change the recipient at any time before or during an activation.</div>
          </div>

          <div className="card" style={{ padding: "40px 28px 28px" }}>
            <h2 className="h3" style={{ fontSize: 21 }}>What may be shared</h2>
            <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>Only the items you switch on are ever visible during an activation. Everything else in your vault stays sealed — balances, accounts, documents and messages.</p>
            <span className="chip pill plain mt16">{count} of 8 selected</span>
            <div className="mt20" style={{ borderTop: "1px solid var(--line)" }}>
              {ESSENTIALS.map((e, i) => (
                <div key={e.t} className="list-row" style={{ padding: "18px 0" }}>
                  <div className="icon-box"><Icon name={e.icon} size={15} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="row gap8"><span style={{ fontSize: 15, fontWeight: 500 }}>{e.t}</span><span className={`chip ${e.tag === "After verification" ? "green" : "gold"}`} style={{ height: 20, fontSize: 11 }}>{e.tag}</span></div>
                    <div className="small mt4" style={{ color: "#45474d" }}>{e.d}</div>
                    <div className="tiny mt4" style={{ fontSize: 11.5 }}>{e.c}</div>
                  </div>
                  <div style={{ marginTop: 6 }}><Toggle on={items[i]} muted={!!active} onChange={(v) => !active && setItems(items.map((x, k) => (k === i ? v : x)))} /></div>
                </div>
              ))}
            </div>
            <div className="notice amber sm mt8" style={{ fontSize: 13 }}><Icon name="shield" size={15} style={{ marginTop: 2 }} /><span>Where your details live in 1Password, we show <b>where</b> they are held — never the passwords themselves. Legacy Vault is not a password manager.</span></div>
          </div>

          <div className="card soft" style={{ padding: "22px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Icon name="leaf" size={17} style={{ marginTop: 3, color: "var(--ink-3)" }} />
            <p style={{ fontSize: 15, lineHeight: "23px", color: "var(--ink-2)" }}>An emergency is not an ending. Emergency Mode exists for the moments when you are still here, simply unable to be the one who knows where everything is.</p>
          </div>
        </div>

        <div className="stack">
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted">Activation</div>
            <div className="eyebrow muted mt20" style={{ fontSize: 10.5 }}>Open a window for</div>
            <div className="grid2 mt12" style={{ gap: 8, opacity: active ? .55 : 1, pointerEvents: active ? "none" : "auto" }}>
              {windows.map(([d, t, s]) => (
                <button key={d} className={`select-card ${windowD === d ? "on" : ""}`} style={{ padding: "12px 12px 12px", minHeight: 76, borderRadius: 6 }} onClick={() => setWindowD(d)}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ fontSize: 11.5, lineHeight: "17px" }}>{s}</div>
                </button>
              ))}
            </div>
            <div className="eyebrow muted mt24" style={{ fontSize: 10.5 }}>Reason (optional)</div>
            <textarea className="input mt12" rows={3} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="For example: scheduled surgery on 4 October." style={{ height: 86 }} />
            <div className="tiny" style={{ textAlign: "right", fontSize: 11, marginTop: 6 }}>{reason.length}/500</div>
            <div className="card soft mt16" style={{ padding: "16px 16px 12px" }}>
              <div className="eyebrow muted" style={{ fontSize: 10.5, marginBottom: 8 }}>What will happen</div>
              <div className="kv"><span>Shared with</span><b>{who.name}</b></div>
              <div className="kv"><span>Essential items</span><b>{count}</b></div>
              <div className="kv"><span>Window</span><b>{wLabel}</b></div>
              <div className="kv"><span>Then</span><b>Closes automatically</b></div>
            </div>
            <button className="btn btn-dark mt20" style={{ width: "100%", height: 48 }} disabled={!!active || count === 0} onClick={() => setConfirm(true)}>
              <Icon name="zap" size={16} />{active ? "Emergency Mode is active" : "Activate Emergency Mode"}
            </button>
            <p className="tiny mt12" style={{ fontSize: 11.5, lineHeight: "17px" }}>{active ? "Revoke the current activation before changing these settings." : "You'll be asked to confirm. Nothing is shared until you do, and you can revoke at any time."}</p>
          </div>
          <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
            <div className="eyebrow" style={{ color: "#1f2a24" }}>Your safeguards</div>
            {[["leaf", "This is not an activation. No death process, no verification queue and no estate steps are triggered."], ["eye", "You can see exactly who has opened what, and when, while Emergency Mode is live."], ["lock", "Nothing outside the items you select is ever visible — not your balances, accounts or messages."], ["history", "Every activation and revocation is written to your Access History, permanently."]].map(([i, t]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}><div className="icon-round" style={{ width: 26, height: 26, background: "#f7fbf8", borderColor: "var(--green-line)" }}><Icon name={i} size={12} /></div><span className="small" style={{ color: "#1f2a24" }}>{t}</span></div>
            ))}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted">What Emergency Mode never does</div>
            {["It never releases your full Legacy File.", "It never reveals passwords — only where they are held.", "It never notifies anyone unless you switch it on.", "It never lasts longer than the window you choose."].map((t) => (
              <div key={t} className="row gap10 mt16" style={{ alignItems: "flex-start" }}><Icon name="xCircle" size={14} style={{ marginTop: 3, color: "var(--ink-3)" }} /><span className="small" style={{ color: "var(--ink-2)" }}>{t}</span></div>
            ))}
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted">Emergency history</div>
            <h3 className="h3 mt8" style={{ fontSize: 20 }}>Every activation, recorded</h3>
            {[["zap", "gold", "Emergency Mode activated for 7 days", "Hospital admission. 5 essential items shared with Sarah Venter only.", "12 AUG 2026, 07:42"], ["timer", "blue", "Emergency Mode expired automatically", "The window ended as scheduled. Sarah's access closed and nothing further was shared.", "19 AUG 2026, 07:42"], ["zap", "gold", "Emergency Mode activated for 24 hours", "Emergency travel. 3 essential items shared with Sarah Venter only.", "03 JUN 2026, 16:20"], ["undo", "", "Emergency Mode revoked by John", "Ended early by John. No items remained visible after this point.", "04 JUN 2026, 16:20"], ["shieldCheck", "green", "Emergency Mode set up", "Essential set and default recipient confirmed. Never switched on until needed.", "01 JUN 2026, 09:00"]].map(([i, tone, t, d, at], k) => (
              <div key={t} className="row gap12" style={{ alignItems: "flex-start", marginTop: k ? 0 : 20, paddingTop: k ? 16 : 0, paddingBottom: 16, borderBottom: k < 4 ? "1px solid var(--line)" : 0, marginLeft: 0 }}>
                <div className={`icon-round ${tone}`} style={{ width: 32, height: 32 }}><Icon name={i} size={13} /></div>
                <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ lineHeight: "17px" }}>{d}</div><div className="tiny mt8" style={{ fontSize: 10.5, letterSpacing: ".08em" }}>{at}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row gap16 small" style={{ justifyContent: "center", marginTop: 40 }}><span className="row gap6"><Icon name="lock" size={13} />Secure · Private · Encrypted</span><button className="row gap6" onClick={() => go("access-history")}><Icon name="history" size={13} />See it in your Access History</button></div>
      <Footer />

      {confirm && (
        <div className="overlay" onClick={() => setConfirm(false)}>
          <div className="modal" style={{ width: 448, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div className="icon-round gold" style={{ width: 48, height: 48 }}><Icon name="zap" size={20} /></div>
            <div className="eyebrow mt16">Confirm activation</div>
            <h2 className="h2 mt8" style={{ fontSize: 22 }}>Switch on Emergency Mode?</h2>
            <p className="body mt16" style={{ fontSize: 15, lineHeight: "23px" }}>{who.name} will immediately be able to see the {count} essential items you selected, and nothing else.</p>
            <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>It closes automatically after {wLabel}, and you can revoke it at any moment. No death process or estate step is triggered.</p>
            <div className="row gap8 mt24" style={{ justifyContent: "flex-end" }}>
              <Btn kind="line" onClick={() => setConfirm(false)}>Not now</Btn>
              <Btn icon="zap" onClick={activate}>Activate now</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------- Access history */
function AccessHistory({ go }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(false);
  const [sent, setSent] = useState(null); // { scope, names } once a sealed copy has been sent
  const [notice, setNotice] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const total = sent ? 35 : 34;
  const sentTo = sent ? listNames(sent.names.map((n) => (n === "John Venter" ? "you" : n))) : "";
  const record = useMemo(() => !sent ? HISTORY : [
    { date: "30 September 2026", events: [H("30 SEP 2026, 14:20", "sealed", "Sealed copy created and emailed", `A sealed copy of ${SCOPES[sent.scope][2]} (LV-SC-0031) was prepared and a secure download link was emailed to ${sentTo}.`, JV, "LV-SC-0031", "View receipt", "green", "sealed", 1)] },
    ...HISTORY,
  ], [sent, sentTo]);
  const groups = useMemo(() => record.map((g) => ({ ...g, events: g.events.filter((e) => (filter === "all" || e.kind === filter) && (!q || (e.title + e.body + e.ref + e.who).toLowerCase().includes(q.toLowerCase()))) })).filter((g) => g.events.length), [record, filter, q]);
  const shown = groups.reduce((n, g) => n + g.events.length, 0);
  const counts = { ...Object.fromEntries(SOURCES.map((s) => [s.k, s.n])), sealed: sent ? 2 : 1 };
  const route = (e) => ({
    "View the released file": "released-file", "View the request": "access-request", "Go to Home": "home", "Open the item": "inventory/financial",
    "Review permissions": "trusted-people/per_sarah", "Open the profile": e.ref === "LV-PP-0091" ? "trusted-people/per_sarah" : "trusted-people/per_jane",
    "Open Emergency Mode": "emergency", "Review your check-in schedule": "activation/timeline",
  }[e.action]);
  return (
    <div className="lv-page">
      <PageHead eyebrow="Access history" title="Everything that has ever happened here"
        lead="A single, sealed record of every view, update, request and release across your vault. Emergency Mode, access requests and released files all write here — so you can always see exactly who did what, and when."
        right={<div className="row gap12"><span className="chip pill green" style={{ height: 38 }}><Icon name="fingerprint" size={13} />Sealed record</span><Btn kind="line" icon="sealed" onClick={() => setModal(true)}>Download a sealed copy</Btn></div>} />
      {notice && <div className="notice" style={{ marginBottom: 32 }}><Icon name="circleCheck" size={18} style={{ marginTop: 3 }} /><span>Sealed copy <b style={{ fontWeight: 600 }}>LV-SC-0031</b> has been prepared and a secure download link was emailed to {sentTo}. It has been written to your record above.</span><button className="x" onClick={() => setNotice(false)}><Icon name="x" size={16} /></button></div>}
      <Stats items={[["Events recorded", String(total), "Since 12 March 2024"], ["Access requests", "2", "Opened against your vault"], ["Item releases", sent ? "10" : "9", "Across 2 access windows"], ["Emergency activations", "2", "Both expired or revoked"]]} />
      <div className="col2 mt32" style={{ gap: 24 }}>
        <div>
          <div className="card" style={{ padding: "24px 24px 24px" }}>
            <div className="row gap8" style={{ flexWrap: "wrap" }}>
              <button className={`filter ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}><Icon name="listTodo" size={14} />Everything<span className="count">{total}</span></button>
              {SOURCES.map((s) => (
                <button key={s.k} className={`filter ${filter === s.k ? "on" : ""}`} onClick={() => setFilter(s.k)}><Icon name={s.icon} size={14} />{s.t}<span className="count">{counts[s.k]}</span></button>
              ))}
            </div>
            <label className="lv-search mt20" style={{ width: "100%", height: 40 }}><Icon name="search" size={15} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by person, reference or what happened" /></label>
          </div>
          <div className="row between" style={{ margin: "28px 0 20px" }}>
            <span className="small" style={{ color: "var(--ink-2)" }}>Showing <b style={{ fontWeight: 600 }}>{shown}</b> of {total} events{filter !== "all" && ` · ${SOURCES.find((s) => s.k === filter).t}`}</span>
            <span className="row gap6 tiny"><Icon name="history" size={13} />Newest first</span>
          </div>
          {groups.map((g) => (
            <div key={g.date} className="card" style={{ padding: "28px 24px 12px", marginBottom: 24 }}>
              <div className="row gap16"><span className="eyebrow muted" style={{ fontSize: 11.5 }}>{g.date}</span><span style={{ flex: 1, height: 1, background: "var(--line)" }} /><span className="tiny">{g.events.length} event{g.events.length > 1 ? "s" : ""}</span></div>
              <div className="tl mt24">
                {g.events.map((e, k) => (
                  <div key={k} className="tl-item" style={{ gridTemplateColumns: "36px 1fr", paddingBottom: 30 }}>
                    <div className={`icon-round ${e.tone}`}><Icon name={e.icon} size={15} /></div>
                    <div>
                      <div className="row gap8" style={{ flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, letterSpacing: ".06em", color: "var(--ink-2)" }}>{e.at}</span>
                        <span className={`chip ${KIND[e.kind][0]}`} style={{ borderRadius: 999, height: 22, fontSize: 11 }}><Icon name={KIND[e.kind][1]} size={11} />{KIND[e.kind][2]}</span>
                        {e.changed && <span className="chip gold" style={{ borderRadius: 999, height: 22, fontSize: 11 }}><span className="dot" />Information changed hands</span>}
                      </div>
                      <div className="h4 mt8" style={{ fontSize: 15.5 }}>{e.title}</div>
                      <p className="small mt4" style={{ color: "#45474d", fontSize: 13 }}>{e.body}</p>
                      <div className="row gap8 mt12" style={{ flexWrap: "wrap" }}>
                        <span className="meta-chip"><Icon name="user" size={11} />{e.who}</span>
                        <span className="tiny" style={{ fontSize: 11 }}>{e.whoRole}</span>
                        <span className="meta-chip white"><Icon name="hash" size={11} />{e.ref}</span>
                        {e.action === "View receipt" ? <button className="chip green" style={{ height: 26 }} onClick={() => setReceipt(e.ref)}><Icon name="receipt" size={12} />View receipt</button>
                          : e.action && <button className="link sm" style={{ fontSize: 12 }} onClick={() => go(route(e))}>{e.action}<Icon name="chevronRight" size={12} /></button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {!shown && <div className="card pad small" style={{ textAlign: "center" }}>Nothing matches that search.</div>}
        </div>
        <div className="stack" style={{ position: "sticky", top: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted">Where this comes from</div>
            <h3 className="h3 mt12" style={{ fontSize: 19 }}>One log, many sources</h3>
            <p className="small mt8" style={{ color: "#45474d" }}>Everything you do across the vault writes here automatically. Pick a source to filter the record.</p>
            <div className="mt16">
              {SOURCES.map((s) => (
                <button key={s.k} className={`select-card ${filter === s.k ? "on" : ""}`} style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 12, marginTop: 6, border: filter === s.k ? undefined : "1px solid transparent", background: filter === s.k ? undefined : "transparent" }} onClick={() => setFilter(filter === s.k ? "all" : s.k)}>
                  <div className="icon-box" style={{ width: 32, height: 32, background: "var(--paper)" }}><Icon name={s.icon} size={14} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.t}</div><div className="tiny" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.d}</div></div>
                  <span className="chip plain" style={{ height: 20, borderRadius: 999, fontSize: 10.5 }}>{counts[s.k]}</span>
                </button>
              ))}
            </div>
            <div className="hr mt16" />
            {[["unlock", "Open a released file", "released-file"], ["mailPlus", "See a request as they see it", "access-request"]].map(([i, t, r]) => (
              <button key={t} className="row gap12" style={{ width: "100%", height: 46, padding: "0 16px", border: "1px solid var(--line)", borderRadius: 6, marginTop: 12, fontSize: 13.5, background: "var(--paper)" }} onClick={() => go(r)}>
                <Icon name={i} size={14} /><span style={{ flex: 1, textAlign: "left" }}>{t}</span><Icon name="chevronRight" size={14} style={{ color: "var(--ink-3)" }} />
              </button>
            ))}
          </div>
          <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
            <div className="eyebrow" style={{ color: "#1f2a24" }}>Why you can trust this record</div>
            <h3 className="h3 mt12" style={{ fontSize: 19 }}>Written once, never changed</h3>
            {[["fingerprint", "Sealed and tamper-evident", "Every entry is timestamped and sealed the moment it happens. Nothing here can be edited."], ["lock", "You are the only author", "Only you can read this record in full. Trusted people never see it."], ["history", "Written automatically", "You never have to log anything yourself — the vault records each action for you."], ["download", "Yours to take with you", "Export a sealed copy at any time, for your own records or for your adviser."]].map(([i, t, d]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
                <div className="icon-round" style={{ width: 26, height: 26, background: "#f7fbf8", borderColor: "var(--green-line)" }}><Icon name={i} size={12} /></div>
                <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ color: "#1f2a24", lineHeight: "17px" }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="card soft" style={{ padding: 20, display: "flex", gap: 12 }}>
            <Icon name="leaf" size={15} style={{ marginTop: 3, color: "var(--ink-3)" }} />
            <p className="small" style={{ color: "var(--ink-2)", fontSize: 13.5, lineHeight: "20px" }}>Nothing has been released without your configured verification steps. This record is your quiet proof of that — kept for good.</p>
          </div>
        </div>
      </div>
      <Footer />
      {receipt && <ReceiptModal data={receipt === "LV-SC-0018"
        ? { ref: "LV-SC-0018", created: "05 Sep 2026, 15:40", print: "7c04 9ba2 1f6d e3a8", scope: "year", size: "1.8 MB · 41 pages", validity: "Links expired 12 Sep 2026", names: ["Jane Smith", "Adele Fourie"] }
        : { ref: "LV-SC-0031", created: "30 Sep 2026, 14:20", print: "a4f9 3c21 88de 0b7f", scope: sent.scope, size: SCOPES[sent.scope][3], validity: "Links expire 07 Oct 2026", names: sent.names }} onClose={() => setReceipt(null)} />}
      {modal && <SealedCopyModal onClose={() => setModal(false)} onSend={(scope, names) => { setModal(false); setSent({ scope, names }); setNotice(true); setFilter("all"); }} />}
    </div>
  );
}

function ReceiptModal({ data, onClose }) {
  const everyone = [{ id: "john", ini: "JV", name: "John Venter", role: "You · Owner", email: "john.venter@venterholdings.co.za" }, ...PEOPLE.map((p) => ({ ...p, role: p.id === "jane" ? "Executor of the estate" : p.role }))];
  const to = data.names.map((n) => everyone.find((p) => p.name === n)).filter(Boolean);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ width: 512, padding: 28 }} onClick={(e) => e.stopPropagation()}>
        <div className="row gap16" style={{ alignItems: "flex-start" }}>
          <div className="icon-round green" style={{ width: 44, height: 44 }}><Icon name="sealed" size={18} /></div>
          <div style={{ flex: 1 }}><div className="eyebrow">Sealed copy receipt</div><h2 className="h2 mt4" style={{ fontSize: 22 }}>{data.ref}</h2><div className="tiny mt4" style={{ fontSize: 12.5 }}>Created {data.created} by John Venter</div></div>
          <button className="modal-x" style={{ border: 0 }} onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="card soft mt24" style={{ padding: "18px 16px", borderStyle: "dashed" }}>
          <div className="row gap8 eyebrow muted" style={{ fontSize: 10.5 }}><Icon name="fingerprint" size={13} />Tamper-evident fingerprint</div>
          <div className="mono mt12" style={{ fontSize: 14, letterSpacing: ".06em" }}>{data.print}</div>
          <p className="tiny mt12" style={{ fontSize: 11.5, lineHeight: "18px" }}>Verify this matches the fingerprint shown on the recipient's copy. If it differs in any way, the copy is not genuine.</p>
        </div>
        <div className="hr mt20" />
        <div className="kv mt12"><span>What's inside</span><b>{SCOPES[data.scope][0]}</b></div>
        <p className="tiny" style={{ textAlign: "right", maxWidth: 300, marginLeft: "auto", lineHeight: "18px" }}>{SCOPES[data.scope][1]}</p>
        <div className="row between mt8" style={{ fontSize: 13 }}><span className="row gap24"><span style={{ color: "var(--ink-3)" }}>Format</span><b style={{ fontWeight: 500 }}>PDF/A · 256-bit encrypted</b></span><span className="row gap24"><span style={{ color: "var(--ink-3)" }}>Size</span><b style={{ fontWeight: 500 }}>{data.size}</b></span></div>
        <div className="kv mt4"><span>Link validity</span><b>{data.validity}</b></div>
        <div className="hr mt16" />
        <div className="row between mt16"><span className="eyebrow muted" style={{ fontSize: 10.5 }}>Sent to {to.length}</span><span className="tiny">{to.length} of {to.length} links delivered</span></div>
        {to.map((p) => (
          <div key={p.id} className="row gap14 mt12" style={{ gap: 14, padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 6 }}>
            <div className="initials light" style={{ width: 36, height: 36, fontSize: 11 }}>{p.ini}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div><div className="tiny">{p.role}</div><div className="tiny">{p.email}</div></div>
            <span className="chip green" style={{ borderRadius: 999 }}><Icon name="check" size={11} />Delivered</span>
          </div>
        ))}
        <div className="card soft mt16" style={{ padding: "12px 14px", display: "flex", gap: 10, fontSize: 12, color: "var(--ink-2)" }}><Icon name="lock" size={13} style={{ marginTop: 2 }} />This receipt is written to your record automatically and can never be edited. Sealed copies never contained passwords, account balances or login details.</div>
        <div className="row mt20" style={{ justifyContent: "flex-end" }}><Btn kind="line" onClick={onClose}>Close</Btn></div>
      </div>
    </div>
  );
}

function SealedCopyModal({ onClose, onSend }) {
  const people = [{ id: "john", ini: "JV", name: "John Venter", role: "You · Owner", email: "john.venter@venterholdings.co.za" }, ...PEOPLE.map((p) => ({ ...p, role: p.id === "jane" ? "Executor of the estate" : p.role }))];
  const [sel, setSel] = useState({ john: true });
  const [scope, setScope] = useState("full");
  const [confirming, setConfirming] = useState(false);
  const chosen = people.filter((p) => sel[p.id]);
  const n = chosen.length;
  return (
    <div className="overlay" onClick={onClose}>
      {confirming && (
        <div className="overlay" style={{ zIndex: 60 }} onClick={(e) => { e.stopPropagation(); setConfirming(false); }}>
          <div className="modal" style={{ width: 448, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div className="icon-round green" style={{ width: 48, height: 48 }}><Icon name="sealed" size={20} /></div>
            <div className="eyebrow mt16">One last check</div>
            <h2 className="h2 mt8" style={{ fontSize: 22 }}>Send a sealed copy?</h2>
            <p className="body mt12" style={{ fontSize: 15, lineHeight: "23px" }}>A secure link to <b style={{ fontWeight: 600 }}>{SCOPES[scope][2]}</b> (LV-SC-0031) will be emailed to <b style={{ fontWeight: 600 }}>{listNames(chosen.map((p) => (p.id === "john" ? "you" : p.name)))}</b>. The link expires after 7 days, and this will be written to your record.</p>
            <div className="hr mt20" />
            {chosen.map((p) => (
              <div key={p.id} className="row gap12 mt16">
                <div className="initials light" style={{ width: 32, height: 32, fontSize: 10.5 }}>{p.ini}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div><div className="tiny">{p.email}</div></div>
                <Icon name="userHeart" size={14} style={{ color: "var(--ink-3)" }} />
              </div>
            ))}
            <div className="row gap8 mt24" style={{ justifyContent: "flex-end" }}>
              <Btn kind="line" onClick={() => setConfirming(false)}>Back</Btn>
              <Btn icon="mail" onClick={() => onSend(scope, chosen.map((p) => p.name))}>Send the link</Btn>
            </div>
          </div>
        </div>
      )}
      <div className="modal" style={{ width: 768 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "28px 28px 0", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div className="icon-round green" style={{ width: 44, height: 44 }}><Icon name="sealed" size={18} /></div>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">Sealed copy</div>
            <h2 className="h2 mt4" style={{ fontSize: 22 }}>Download a sealed copy</h2>
            <p className="small mt8" style={{ fontSize: 13, color: "#45474d", maxWidth: 580 }}>Make a locked, fingerprinted copy of your record and email a private download link to the people you choose. Nothing is ever sent as an attachment.</p>
          </div>
          <button className="modal-x" style={{ border: 0 }} onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div style={{ padding: "28px 28px 0" }}>
          <div className="row between"><span className="eyebrow muted">Who should receive the link?</span><span className="tiny">{n} selected</span></div>
          <div className="grid2 mt12" style={{ gap: 8 }}>
            {people.map((p) => (
              <button key={p.id} className={`select-card ${sel[p.id] ? "on" : ""}`} style={{ padding: "14px 14px", display: "flex", gap: 12, alignItems: "flex-start", borderRadius: 6 }} onClick={() => setSel({ ...sel, [p.id]: !sel[p.id] })}>
                <div className="initials light" style={{ width: 36, height: 36, fontSize: 11 }}>{p.ini}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div><div className="tiny mt4">{p.role}</div><div className="tiny">{p.email}</div></div>
                <span className={`radio ${sel[p.id] ? "on" : ""}`} style={{ width: 20, height: 20, marginTop: 8 }}>{sel[p.id] && <Icon name="check" size={11} stroke={2.6} />}</span>
              </button>
            ))}
          </div>
          <div className="eyebrow muted mt24">What's inside</div>
          {Object.entries(SCOPES).map(([k, [t, d]]) => (
            <button key={k} className={`select-card mt8 ${scope === k ? "on" : ""}`} style={{ padding: "14px 20px", display: "flex", gap: 14, alignItems: "flex-start", borderRadius: 6 }} onClick={() => setScope(k)}>
              <span className={`radio ${scope === k ? "on" : ""}`} style={{ width: 16, height: 16, marginTop: 2 }}>{scope === k && <Icon name="check" size={10} stroke={2.8} />}</span>
              <span><span style={{ display: "block", fontSize: 13.5, fontWeight: 500 }}>{t}</span><span className="tiny">{d}</span></span>
            </button>
          ))}
          <div className="card soft mt24" style={{ padding: "18px 16px" }}>
            <div className="row gap8 eyebrow muted"><Icon name="shieldCheck" size={13} />Your sealed copy</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24, marginTop: 8 }}>
              <div className="kv"><span>Reference</span><b>LV-SC-0031</b></div>
              <div className="kv"><span>Format</span><b>PDF/A · 256-bit encrypted</b></div>
              <div className="kv"><span>Size</span><b>{SCOPES[scope][3]}</b></div>
              <div className="kv"><span>Fingerprint</span><b className="mono">a4f9 3c21 88de 0b7f</b></div>
              <div className="kv"><span>Link validity</span><b /></div>
              <div className="kv"><span /><b>Links expire after 7 days</b></div>
            </div>
          </div>
          <div className="eyebrow muted mt24">What happens next</div>
          <div className="grid2 mt12" style={{ gap: 14, columnGap: 24 }}>
            {[["lock", "Sealed on creation", "The record is locked and fingerprinted the moment the copy is made."], ["mail", "A private link, never an attachment", "Each recipient gets their own secure download link by email."], ["timer", "The link closes itself", "Download links expire automatically after 7 days."], ["history", "Written to this record", "This page logs exactly who received a copy, and when."]].map(([i, t, d]) => (
              <div key={t} className="row gap12" style={{ alignItems: "flex-start" }}>
                <div className="icon-round green" style={{ width: 26, height: 26 }}><Icon name={i} size={12} /></div>
                <div><div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ fontSize: 11.5 }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="row gap8 tiny mt20" style={{ fontSize: 11.5 }}><Icon name="lock" size={12} />Sealed copies never contain passwords, account balances or login details.</div>
        </div>
        <div className="row gap12" style={{ justifyContent: "flex-end", padding: "32px 28px 24px" }}>
          <Btn kind="line" onClick={onClose}>Cancel</Btn>
          <Btn icon="lock" disabled={!n} onClick={() => setConfirming(true)}>Review &amp; send</Btn>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Documents etc. */
function Placeholder({ eyebrow, title, lead, icon, bullets }) {
  return (
    <div className="lv-page">
      <PageHead icon={icon} eyebrow={eyebrow} title={title} lead={lead} />
      <div className="col2">
        <div className="card" style={{ padding: "40px 28px 56px" }}>
          <h2 className="h3" style={{ fontSize: 21 }}>What this section will include</h2>
          {bullets.map((b) => <div key={b} className="row gap12 mt20" style={{ fontSize: 15, color: "var(--ink-2)" }}><Icon name="circleCheck" size={16} />{b}</div>)}
        </div>
        <div className="card" style={{ padding: "36px 28px 28px", background: "var(--blue-bg)", borderColor: "#c9d6e6" }}>
          <div className="row gap12 eyebrow" style={{ color: "var(--ink)" }}><Icon name="tools" size={16} />In development</div>
          <p style={{ fontSize: 15, lineHeight: "23px", marginTop: 20 }}>This screen is designed and scheduled for the next build phase. Everything you can see elsewhere in Legacy Vault already uses the same design language, so this section will slot straight in.</p>
          <p className="small mt16" style={{ color: "var(--ink-2)" }}>You remain in control. Nothing is released until your configured verification steps are complete.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------- Documents */
const DOC_GROUPS = [["Legal", "scale"], ["Family & identity", "idCard"], ["Property & vehicles", "house"], ["Financial", "landmark"], ["Insurance", "shieldStar"]];
/* Where originals are held: [place, icon, detail] */
const DOC_PLACES = [
  ["ABC Attorneys", "scale", "Strongroom, Cape Town office"],
  ["Home safe", "house", "Study, Constantia residence"],
  ["Issued digitally", "globe", "No paper original exists"],
  ["Not yet recorded", "alertCircle", "Your family would have to search"],
];
const docPlace = (k) => { const p = DOC_PLACES.find((x) => x[0] === k); return k === "Not yet recorded" || !p ? null : [p[0], p[2]]; };
/* Document library: name, group, copy on file, kind of copy, original [place, detail], linked inventory item [category, name], assigned to, release level, updated, what to do */
const D = (name, group, file, copy, original, linked, who, level, at, note) => ({ name, group, file, copy, original, linked, who, level, at, note });
const DOCS = [
  D("Last Will and Testament", "Legal", "PDF · 14 pages", "Certified copy", docPlace("ABC Attorneys"), ["Documents", "Last Will and Testament"], "Jane Smith (Executor)", "emergency", "30 Sep 2026", "The signed original must be lodged with the Master of the High Court. Jane holds it and knows the process — nobody needs to search for it."),
  D("Venter Family Trust Deed", "Legal", "PDF · 32 pages", "Scanned copy", null, ["Documents", "Venter Family Trust Deed"], "Jane Smith (Executor)", "locked", "09 Sep 2026", "A scanned copy is on file, but the location of the signed original has not been recorded yet."),
  D("Antenuptial Contract", "Legal", "PDF · 8 pages", "Certified copy", docPlace("ABC Attorneys"), null, "Jane Smith (Executor)", "verified", "08 Sep 2026", "Registered at the Deeds Office, Cape Town. The executor will need it to wind up the estate."),
  D("Marriage Certificate", "Family & identity", "PDF · 1 page", "Certified copy", docPlace("Home safe"), ["Documents", "Marriage Certificate"], "Sarah Venter", "verified", "22 Sep 2026", "Most institutions ask for a certified copy no older than three months. Home Affairs can issue a new one."),
  D("Birth Certificates — family", "Family & identity", "PDF · 3 pages", "Scanned copy", null, null, null, "verified", "02 Sep 2026", "Unabridged certificates for John, Sarah and Michael. Record where the originals are and who should receive them."),
  D("Title Deed — Constantia residence", "Property & vehicles", "PDF · 9 pages", "Scanned copy", docPlace("ABC Attorneys"), ["Property", "Primary Residence — Constantia"], "Sarah Venter", "verified", "30 Sep 2026", "The property is unbonded. The conveyancer at ABC Attorneys will handle the transfer."),
  D("BMW X5 — registration certificate", "Property & vehicles", "PDF · 1 page", "Scanned copy", docPlace("Home safe"), ["Vehicles", "BMW X5 — CA 447 192"], "Michael Venter", "verified", "27 Sep 2026", "Needed, together with the letter of executorship, to transfer ownership at the licensing department."),
  D("Discovery Bank — account confirmation", "Financial", "PDF · 2 pages", "Digital original", docPlace("Issued digitally"), ["Financial", "Discovery Bank"], "Sarah Venter", "verified", "30 Sep 2026", "A stamped confirmation letter. A fresh one can be requested from the Private Client Desk at any time."),
  D("Old Mutual Life Policy — schedule", "Insurance", "PDF · 6 pages", "Scanned copy", docPlace("Home safe"), ["Insurance", "Old Mutual Life Policy"], "Sarah Venter", "verified", "29 Sep 2026", "Shows the policy number, cover amount and nominated beneficiary. The claims line is recorded on the item."),
  D("AVBOB Funeral Policy — certificate", "Insurance", "PDF · 2 pages", "Scanned copy", docPlace("Home safe"), ["Insurance", "AVBOB Funeral Policy"], "Sarah Venter", "emergency", "29 Sep 2026", "Released as emergency information so the claim can be made within the first few days."),
];
/* Papers the inventory expects but that are not on file yet: [name, group, why] */
const DOCS_MISSING = [
  ["Title Deed — Sea Point apartment", "Property & vehicles", "The investment property has no deed on file."],
  ["Sanlam Retirement Annuity — policy", "Financial", "The executor needs the policy number to claim."],
  ["Santam Short-Term Insurance — schedule", "Insurance", "Cover details are still incomplete."],
];
const DOC_COLS = "2fr 1.45fr 1.1fr .8fr 112px";

function Documents({ go }) {
  const [docs, setDocs] = useState(DOCS);
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(DOCS[0].name);
  const [modal, setModal] = useState(null); // { name, group } preset for the add modal
  const [added, setAdded] = useState(null);
  const list = docs.filter((d) => (group === "all" || d.group === group) && (!q || (d.name + d.group + (d.original || []).join(" ") + (d.who || "")).toLowerCase().includes(q.toLowerCase())));
  const located = docs.filter((d) => d.original).length;
  const attention = docs.filter((d) => !d.original || !d.who).length;
  const missing = DOCS_MISSING.filter(([n]) => !docs.some((d) => d.name === n));
  return (
    <div className="lv-page">
      <PageHead eyebrow="Documents" title="Where the important papers live"
        lead="A private record of your will, trust documents, deeds, contracts and certificates. Keep a copy here if you wish — but above all, record where each original is held so nobody has to search."
        right={<Btn icon="upload" onClick={() => setModal({ name: "", group: "Legal" })}>Add a document</Btn>} />
      {added && <div className="notice" style={{ marginBottom: 32 }}><Icon name="circleCheck" size={18} style={{ marginTop: 3 }} /><span><b style={{ fontWeight: 600 }}>{added}</b> has been added to your documents. This was recorded in your Access History.</span><button className="x" onClick={() => setAdded(null)}><Icon name="x" size={16} /></button></div>}
      <Stats items={[["Documents on file", docs.length, `across ${DOC_GROUPS.length} groups`], ["Originals located", located, "your family knows where to look"], ["Need attention", attention, "location or recipient missing"], ["Assigned to someone", docs.filter((d) => d.who).length, "cleared for handover"]]} />

      <div className="card mt32" style={{ padding: 24 }}>
        <div className="row gap8" style={{ flexWrap: "wrap" }}>
          <button className={`filter ${group === "all" ? "on" : ""}`} onClick={() => setGroup("all")}><Icon name="folder" size={14} />All documents<span className="count">{docs.length}</span></button>
          {DOC_GROUPS.map(([g, icon]) => (
            <button key={g} className={`filter ${group === g ? "on" : ""}`} onClick={() => setGroup(g)}><Icon name={icon} size={14} />{g}<span className="count">{docs.filter((d) => d.group === g).length}</span></button>
          ))}
        </div>
        <label className="lv-search mt20" style={{ width: "100%", height: 40 }}><Icon name="search" size={15} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by document, person or where the original is held" /></label>
      </div>

      <div className="row between" style={{ margin: "28px 0 20px" }}>
        <span className="small" style={{ color: "var(--ink-2)" }}>Showing <b style={{ fontWeight: 600 }}>{list.length}</b> of {docs.length} documents{group !== "all" && ` · ${group}`}</span>
        <span className="row gap6 tiny"><Icon name="lock" size={13} />Copies are encrypted and only released on your terms</span>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: DOC_COLS, padding: "14px 24px", background: "var(--card-2)", borderBottom: "1px solid var(--line)" }}>
          {["Document", "Original held at", "Assigned to", "Release", "Updated"].map((h, i) => <span key={h} className="eyebrow muted" style={{ fontSize: 10.5, textAlign: i === 4 ? "right" : "left" }}>{h}</span>)}
        </div>
        {list.map((d, i) => {
          const on = open === d.name;
          return (
            <div key={d.name} style={{ borderTop: i ? "1px solid var(--line)" : 0 }}>
              <button className="cat-row" aria-expanded={on} onClick={() => setOpen(on ? null : d.name)} style={{ display: "grid", gridTemplateColumns: DOC_COLS, alignItems: "center", width: "100%", textAlign: "left", padding: "16px 24px" }}>
                <span className="row gap12" style={{ minWidth: 0, paddingRight: 16 }}>
                  <span className="icon-box"><Icon name={d.file.startsWith("PDF") ? "filePdf" : "fileText"} size={15} /></span>
                  <span style={{ minWidth: 0 }}><span style={{ display: "block", fontSize: 15, fontWeight: 500 }}>{d.name}</span><span className="small" style={{ fontSize: 12.5 }}>{d.group} · {d.copy}</span></span>
                </span>
                <span style={{ paddingRight: 16 }}>{d.original
                  ? <span><span style={{ display: "block", fontSize: 13.5 }}>{d.original[0]}</span><span className="tiny">{d.original[1]}</span></span>
                  : <span className="chip gold" style={{ borderRadius: 999 }}><span className="dot" />Not yet recorded</span>}</span>
                <span className="row gap8 small" style={{ color: d.who ? "var(--ink-2)" : "var(--ink-4)", fontSize: 13 }}>{d.who && <Icon name="user" size={13} />}{d.who || "Not assigned"}</span>
                <span><LevelChip level={d.level} /></span>
                <span className="row gap12 small" style={{ justifyContent: "flex-end", fontSize: 12.5 }}>{d.at}<Icon name={on ? "chevronUp" : "chevronDown"} size={14} /></span>
              </button>
              {on && (
                <div style={{ padding: "22px 24px 24px 72px", background: "#f8f6ef", borderTop: "1px solid var(--line)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                    <div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Where the original is held</div><div style={{ fontSize: 15, marginTop: 6 }}>{d.original ? d.original[0] : <span style={{ color: "var(--ink-3)" }}>Not yet recorded</span>}</div><div className="tiny">{d.original ? d.original[1] : "Add the location so it can be found quickly."}</div></div>
                    <div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Copy on file</div><div style={{ fontSize: 15, marginTop: 6 }}>{d.file}</div><div className="tiny">{d.copy}</div></div>
                    <div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Linked to</div>
                      {d.linked ? <><div style={{ fontSize: 15, marginTop: 6 }}>{d.linked[1]}</div><div className="tiny">{d.linked[0]} · My Inventory</div></> : <><div style={{ fontSize: 15, marginTop: 6, color: "var(--ink-3)" }}>No inventory item</div><div className="tiny">Stands on its own in your vault.</div></>}
                    </div>
                  </div>
                  {d.note && <div className="row gap12 mt20" style={{ alignItems: "flex-start", padding: "14px 16px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 6 }}><Icon name="route" size={15} style={{ marginTop: 3, color: "var(--gold-ink)" }} /><div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>What to do</div><p className="body mt4">{d.note}</p></div></div>}
                  <div className="row gap8 mt20">
                    {d.file !== "No copy uploaded" && <Btn kind="line" size="sm" icon="download">Download copy</Btn>}
                    <Btn kind="line" size="sm" icon="upload">{d.file === "No copy uploaded" ? "Upload a copy" : "Replace file"}</Btn>
                    <span style={{ flex: 1 }} />
                    {d.linked && <LinkA small onClick={() => go("inventory/item/" + itemId(d.linked[0], d.linked[1]))}>Open the item</LinkA>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {!list.length && <div className="small" style={{ padding: "32px 24px", textAlign: "center" }}>Nothing matches that search.</div>}
      </div>

      <div className="grid3 mt32" style={{ alignItems: "stretch" }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="eyebrow muted">Where originals are held</div>
          <h3 className="h3 mt12" style={{ fontSize: 19 }}>{located} of {docs.length} located</h3>
          <div className="progress mt16"><i style={{ width: (located / docs.length) * 100 + "%" }} /></div>
          <div className="mt8">
            {DOC_PLACES.map(([k, icon, detail]) => {
              const n = docs.filter((d) => (d.original ? d.original[0] : "Not yet recorded") === k).length;
              return (
                <div key={k} className="row gap12 mt16">
                  <div className="icon-box" style={k === "Not yet recorded" ? { width: 32, height: 32, background: "var(--gold-bg)", borderColor: "var(--gold-line)", color: "var(--gold-ink)" } : { width: 32, height: 32 }}><Icon name={icon} size={14} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{k}</div><div className="tiny">{detail}</div></div>
                  <span className="chip plain" style={{ height: 20, borderRadius: 999, fontSize: 10.5 }}>{n}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="eyebrow muted">Still to add</div>
          <h3 className="h3 mt12" style={{ fontSize: 19 }}>{missing.length ? "Papers your inventory expects" : "Nothing outstanding"}</h3>
          <p className="small mt8" style={{ color: "#45474d" }}>{missing.length ? "These items are recorded in your inventory but have no document on file." : "Every item in your inventory that expects a document now has one."}</p>
          {missing.map(([n, g, why]) => (
            <div key={n} className="list-row" style={{ alignItems: "center", padding: "14px 0" }}>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 500 }}>{n}</div><div className="tiny">{why}</div></div>
              <button className="link sm" onClick={() => setModal({ name: n, group: g })}>Add<Icon name="plus" size={12} /></button>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
          <div className="eyebrow" style={{ color: "#1f2a24" }}>More than a filing cabinet</div>
          <h3 className="h3 mt12" style={{ fontSize: 19 }}>Knowing where it is matters most</h3>
          {[["route", "Originals stay where they are", "Legacy Vault records the location. It never asks you to hand an original over."], ["shield", "Each document has its own release", "A document is only shared with the person you assign, at the level you choose."], ["history", "Every download is recorded", "Views and downloads are written to your Access History automatically."]].map(([i, t, d]) => (
            <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
              <div className="icon-round" style={{ width: 26, height: 26, background: "#f7fbf8", borderColor: "var(--green-line)" }}><Icon name={i} size={12} /></div>
              <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ color: "#1f2a24", lineHeight: "17px" }}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {modal && <AddDocumentModal preset={modal} onClose={() => setModal(null)} onAdd={(doc) => { setDocs([doc, ...docs]); setModal(null); setAdded(doc.name); setGroup("all"); setQ(""); setOpen(doc.name); }} />}
    </div>
  );
}

function AddDocumentModal({ preset, onClose, onAdd }) {
  const [f, setF] = useState({ name: preset.name, group: preset.group, place: "Not yet recorded", who: "", level: "locked" });
  const [file, setFile] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const add = () => onAdd(D(f.name.trim(), f.group, file ? "PDF · 3 pages" : "No copy uploaded", file ? "Uploaded copy" : "Location recorded only", docPlace(f.place), null, f.who || null, f.level, "30 Sep 2026", null));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ width: 672 }} onClick={(e) => e.stopPropagation()}>
        <div className="row between" style={{ padding: "22px 24px 22px", borderBottom: "1px solid var(--line)", alignItems: "flex-start" }}>
          <div><div className="eyebrow">Documents</div><h2 className="h2 mt4" style={{ fontSize: 22 }}>Add a document</h2></div>
          <button className="modal-x" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        </div>
        <div style={{ padding: "32px 24px 24px" }}>
          <button className="select-card" onClick={() => setFile(!file)} style={{ padding: "22px 20px", display: "flex", alignItems: "center", gap: 16, borderStyle: file ? "solid" : "dashed", borderRadius: 6, background: file ? "var(--green-bg)" : "var(--paper)", borderColor: file ? "var(--green-line)" : undefined }}>
            <div className={`icon-round ${file ? "green" : ""}`} style={{ width: 40, height: 40 }}><Icon name={file ? "filePdf" : "upload"} size={16} /></div>
            {file
              ? <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>Scan_2026-09-30.pdf</div><div className="tiny">PDF · 3 pages · 1.2 MB · encrypted on upload</div></div>
              : <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>Choose a file, or leave this empty</div><div className="tiny">PDF, JPG or PNG up to 25 MB. A copy is optional — the location of the original is what matters.</div></div>}
            <span className="link sm">{file ? "Remove" : "Browse"}</span>
          </button>
          <div className="field mt24"><label>Document name</label><input className="input" placeholder="e.g. Last Will and Testament" value={f.name} onChange={set("name")} /></div>
          <div className="grid2 mt24" style={{ gap: 16 }}>
            <div className="field"><label>Group</label><select className="input" value={f.group} onChange={set("group")}>{DOC_GROUPS.map(([g]) => <option key={g}>{g}</option>)}</select></div>
            <div className="field"><label>Where is the original held?</label><select className="input" value={f.place} onChange={set("place")}>{DOC_PLACES.map(([p]) => <option key={p}>{p}</option>)}</select></div>
            <div className="field mt8"><label>Who should receive it?</label><select className="input" value={f.who} onChange={set("who")}><option value="">Not assigned yet</option>{PEOPLE.map((p) => <option key={p.id}>{p.id === "jane" ? "Jane Smith (Executor)" : p.name}</option>)}</select></div>
            <div className="field mt8"><label>Release level</label><select className="input" value={f.level} onChange={set("level")}>{RELEASE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
          </div>
          <div className="card soft mt24" style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Icon name={LEVELS[f.level].icon} size={15} style={{ marginTop: 2 }} />
            <p className="small" style={{ color: "var(--ink-2)" }}><b style={{ fontWeight: 500 }}>{LEVELS[f.level].badge}.</b> {LEVELS[f.level].note} Nothing is released without your configured safeguards.</p>
          </div>
        </div>
        <div className="row gap12" style={{ justifyContent: "flex-end", padding: "20px 24px", borderTop: "1px solid var(--line)" }}>
          <Btn kind="line" onClick={onClose}>Cancel</Btn>
          <Btn icon="plus" disabled={!f.name.trim()} onClick={add}>Add document</Btn>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Messages */
const MSG_KINDS = {
  spouse: ["Message to spouse", "heart"], children: ["Message to children", "baby"], family: ["Family message", "users"],
  business: ["Business message", "briefcase"], instructions: ["Personal instructions", "listChecks"],
};
/* Release timing: [key, option label, phrase used in the release sentence] */
const MSG_TIMING = [
  ["activation", "When the vault is activated", "after Legacy Vault is activated"],
  ["verified", "After verification is complete", "once verification is complete"],
  ["delay", "30 days after release begins", "30 days after release begins"],
  ["anniversary", "On the first anniversary", "on the first anniversary of release"],
];
const MESSAGES = [
  { id: "m-sarah", kind: "spouse", title: "For Sarah", to: ["sarah"], timing: "activation", sealed: true, at: "30 Sep 2026",
    body: "My dearest Sarah,\n\nIf you are reading this, the vault has done what I asked of it. You already have the practical things — the policies, the accounts, who to call. This is the part that would not fit in a form.\n\nThank you. For Constantia, for the long drives up the West Coast, for every time you were right and kind about it. You made an ordinary life feel like a very large one.\n\nPlease don't rush anything. Jane knows what needs doing and in what order, so let her carry the paperwork. And take the trip to the Cederberg we kept postponing.\n\nAll my love, always,\nJohn" },
  { id: "m-michael", kind: "children", title: "For Michael, when the time is right", to: ["michael"], timing: "delay", sealed: true, at: "14 Sep 2026",
    body: "Michael,\n\nI asked for this to reach you a little later than everything else, once the first weeks have passed and there is room to read it properly.\n\nThe car is yours — look after it better than I did. But what I really want you to have is simpler: I was proud of you long before you gave me any reason to be, and I never stopped.\n\nLook after your mother. Let her look after you too.\n\nDad" },
  { id: "m-family", kind: "family", title: "To the family", to: ["sarah", "michael", "emma"], timing: "verified", sealed: true, at: "19 Sep 2026",
    body: "To all of you,\n\nEverything you need is recorded in the vault: what exists, where it is and who to call. Nothing is hidden and nothing should come as a surprise.\n\nIf there is ever a disagreement about what I would have wanted, the answer is the generous one. Choose that, and choose each other.\n\nWith love,\nJohn" },
  { id: "m-business", kind: "business", title: "For Venter Holdings", to: ["jane", "adele"], timing: "verified", sealed: false, at: "26 Sep 2026",
    body: "Jane, Adele,\n\nA few notes on the business that are not written down anywhere else.\n\nThe shareholder agreement and the buy-and-sell policy are with ABC Attorneys. The intention has always been that the partners buy out my share at the agreed valuation, and that the proceeds go to Sarah.\n\nStill to add: the names of the two people at the firm who should be told first." },
  { id: "m-instructions", kind: "instructions", title: "The things only I would know", to: ["sarah"], timing: "activation", sealed: false, at: "28 Sep 2026",
    body: "Small things, but they will save you time.\n\nThe spare keys are with Emma. Bella and Milo see Dr Pillay at the Constantia vet, and Milo's tablets are in the kitchen drawer.\n\nPasswords are not written down anywhere — they are all in 1Password, and Jane holds the Emergency Kit." },
];
const firstNames = (ids) => listNames(ids.map((id) => PEOPLE.find((p) => p.id === id).name.split(" ")[0]));
const releaseRule = (m) => m.to.length ? `Release to ${firstNames(m.to)} only ${MSG_TIMING.find((t) => t[0] === m.timing)[2]}.` : "Choose who should receive this message.";

function Messages({ go }) {
  const [msgs, setMsgs] = useState(MESSAGES);
  const [sel, setSel] = useState(MESSAGES[0].id);
  const [notice, setNotice] = useState(null);
  const m = msgs.find((x) => x.id === sel) || msgs[0];
  const upd = (patch) => setMsgs(msgs.map((x) => (x.id === m.id ? { ...x, ...patch, at: "30 Sep 2026" } : x)));
  const write = () => {
    const id = "m-new-" + msgs.length;
    setMsgs([{ id, kind: "family", title: "", to: [], timing: "activation", sealed: false, at: "30 Sep 2026", body: "" }, ...msgs]);
    setSel(id); setNotice(null);
  };
  const words = m.body.trim() ? m.body.trim().split(/\s+/).length : 0;
  const ready = m.title.trim() && m.body.trim() && m.to.length;
  const sealedCount = msgs.filter((x) => x.sealed).length;
  const [kindLabel, kindIcon] = MSG_KINDS[m.kind];
  return (
    <div className="lv-page">
      <PageHead eyebrow="Personal messages" title="The words you want them to have"
        lead="Write to the people who matter, in your own time. Each message is sealed, kept apart from everything else in your vault, and released only to the person you choose, when you choose."
        right={<Btn icon="feather" onClick={write}>Write a message</Btn>} />
      {notice && <div className="notice" style={{ marginBottom: 32 }}><Icon name="circleCheck" size={18} style={{ marginTop: 3 }} /><span>{notice}</span><button className="x" onClick={() => setNotice(null)}><Icon name="x" size={16} /></button></div>}
      <Stats items={[["Messages prepared", msgs.length, "letters and instructions"], ["Sealed and ready", sealedCount, "will release on your terms"], ["Still in draft", msgs.length - sealedCount, "never released until sealed"], ["People written to", new Set(msgs.flatMap((x) => x.to)).size, "of 5 trusted people"]]} />

      <div className="mt32" style={{ display: "grid", gridTemplateColumns: "316px minmax(0,1fr)", gap: 24, alignItems: "start" }}>
        <div className="stack">
          <div className="card" style={{ padding: "24px 16px 16px" }}>
            <div className="row between" style={{ padding: "0 8px" }}><span className="eyebrow muted">Your messages</span><span className="tiny">{msgs.length} in total</span></div>
            <div className="mt12">
              {msgs.map((x) => (
                <button key={x.id} className={`select-card ${x.id === m.id ? "on" : ""}`} onClick={() => { setSel(x.id); setNotice(null); }} style={{ padding: "14px 12px", display: "flex", gap: 12, alignItems: "flex-start", marginTop: 6, border: x.id === m.id ? undefined : "1px solid transparent", background: x.id === m.id ? undefined : "transparent" }}>
                  <div className="icon-box" style={{ width: 32, height: 32, background: "var(--paper)" }}><Icon name={MSG_KINDS[x.kind][1]} size={14} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="h4" style={{ fontSize: 15, fontWeight: 500 }}>{x.title || "Untitled message"}</div>
                    <div className="tiny mt4">{x.to.length ? "To " + firstNames(x.to) : "No recipient yet"}</div>
                    <div className="row gap8 mt8">
                      {x.sealed ? <span className="chip green" style={{ borderRadius: 999, height: 22, fontSize: 11 }}><Icon name="lock" size={11} />Sealed</span> : <span className="chip gold" style={{ borderRadius: 999, height: 22, fontSize: 11 }}><span className="dot" />Draft</span>}
                      <span className="tiny" style={{ fontSize: 11 }}>{x.at}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button className="row gap12" style={{ width: "100%", height: 46, padding: "0 16px", border: "1px dashed #d6d1c5", borderRadius: 6, marginTop: 12, fontSize: 13.5, color: "var(--ink-2)" }} onClick={write}>
              <Icon name="plus" size={14} /><span style={{ flex: 1, textAlign: "left" }}>Write another message</span>
            </button>
          </div>
          <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
            <div className="eyebrow" style={{ color: "#1f2a24" }}>How messages are kept</div>
            <h3 className="h3 mt12" style={{ fontSize: 19 }}>Private until the moment you chose</h3>
            {[["lock", "Sealed, not shared", "A sealed message cannot be read by anyone — including your other trusted people."], ["mailOpen", "Released on its own schedule", "Messages are never part of the Legacy Pack or an emergency release."], ["pencil", "Yours to change", "Unseal a message at any time to rewrite it. Only the latest version is ever released."]].map(([i, t, d]) => (
              <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}>
                <div className="icon-round" style={{ width: 26, height: 26, background: "#f7fbf8", borderColor: "var(--green-line)" }}><Icon name={i} size={12} /></div>
                <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ color: "#1f2a24", lineHeight: "17px" }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="stack">
          <div className="card" style={{ overflow: "hidden" }}>
            <div className="row between" style={{ padding: "18px 24px", borderBottom: "1px solid var(--line)", background: "var(--card-2)" }}>
              <div className="row gap8">
                <span className="chip paper" style={{ borderRadius: 999, height: 28, padding: "0 12px" }}><Icon name={kindIcon} size={12} />{kindLabel}</span>
                {m.sealed ? <span className="chip green" style={{ borderRadius: 999, height: 28, padding: "0 12px" }}><Icon name="lock" size={12} />Sealed</span> : <span className="chip gold" style={{ borderRadius: 999, height: 28, padding: "0 12px" }}><span className="dot" />Draft</span>}
              </div>
              {m.sealed
                ? <Btn kind="line" size="sm" icon="pencil" onClick={() => { upd({ sealed: false }); setNotice(null); }}>Unseal to edit</Btn>
                : <Btn size="sm" icon="sealed" disabled={!ready} onClick={() => { upd({ sealed: true }); setNotice(`“${m.title.trim()}” has been sealed. It will be released to ${firstNames(m.to)} only ${MSG_TIMING.find((t) => t[0] === m.timing)[2]}.`); }}>Seal message</Btn>}
            </div>
            <div style={{ padding: "40px 48px 36px", background: "var(--paper)" }}>
              <div className="row gap12">
                <span className="eyebrow muted" style={{ fontSize: 10.5 }}>To</span>
                {m.to.length ? m.to.map((id) => { const p = PEOPLE.find((y) => y.id === id); return <span key={id} className="row gap8" style={{ fontSize: 13.5 }}><span className="initials light" style={{ width: 26, height: 26, fontSize: 9.5 }}>{p.ini}</span>{p.name}</span>; }) : <span className="small">Nobody yet — choose a recipient below.</span>}
              </div>
              {m.sealed ? (
                <>
                  <h2 className="h2" style={{ fontSize: 28, marginTop: 28 }}>{m.title}</h2>
                  <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "20px 0 24px" }} />
                  <p style={{ fontFamily: "var(--serif)", fontSize: 16.5, lineHeight: "29px", color: "var(--ink-2)", whiteSpace: "pre-wrap", maxWidth: 560 }}>{m.body}</p>
                </>
              ) : (
                <>
                  <input className="input" value={m.title} onChange={(e) => upd({ title: e.target.value })} placeholder="Give this message a title" style={{ marginTop: 24, height: 52, fontFamily: "var(--serif)", fontSize: 22 }} />
                  <textarea className="input mt12" rows={13} value={m.body} onChange={(e) => upd({ body: e.target.value })} placeholder="Write in your own words. There is no right length, and you can come back to this as often as you like." style={{ fontFamily: "var(--serif)", fontSize: 16.5, lineHeight: "29px", padding: "16px 18px" }} />
                </>
              )}
            </div>
            <div className="row between" style={{ padding: "14px 24px", borderTop: "1px solid var(--line)" }}>
              <span className="tiny">{words} word{words === 1 ? "" : "s"} · Last edited {m.at}</span>
              <span className="row gap6 tiny"><Icon name={m.sealed ? "lock" : "pencil"} size={12} />{m.sealed ? "Sealed — nobody can read this until it is released" : "Drafts are never released"}</span>
            </div>
          </div>

          <div className="card" style={{ padding: "32px 28px 28px" }}>
            <div className="row between" style={{ alignItems: "flex-start" }}>
              <div><h2 className="h3" style={{ fontSize: 21 }}>Release settings</h2><p className="body mt8" style={{ fontSize: 15 }}>This message has its own rule, independent of everything else in your vault.</p></div>
              <LevelChip level="personal" badge />
            </div>
            <div className="field mt24"><label>Who receives it</label>
              <div className="grid2" style={{ gap: 8 }}>
                {PEOPLE.map((p) => {
                  const on = m.to.includes(p.id);
                  return (
                    <button key={p.id} disabled={m.sealed} className={`opt ${on ? "on" : ""}`} style={{ height: 48, padding: "0 14px", cursor: m.sealed ? "default" : "pointer" }} onClick={() => upd({ to: on ? m.to.filter((id) => id !== p.id) : [...m.to, p.id] })}>
                      <span className={`radio ${on ? "on" : ""}`} style={{ width: 16, height: 16 }}>{on && <Icon name="check" size={10} stroke={2.8} />}</span>
                      <span style={{ flex: 1 }}>{p.name}</span><span className="tiny">{p.rel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid2 mt24" style={{ gap: 16 }}>
              <div className="field"><label>When it is released</label><select className="input" disabled={m.sealed} value={m.timing} onChange={(e) => upd({ timing: e.target.value })}>{MSG_TIMING.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
              <div className="field"><label>Kind of message</label><select className="input" disabled={m.sealed} value={m.kind} onChange={(e) => upd({ kind: e.target.value })}>{Object.entries(MSG_KINDS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></div>
            </div>
            <div className="card soft mt24" style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div className="icon-round gold" style={{ width: 32, height: 32 }}><Icon name="mailOpen" size={14} /></div>
              <div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Release rule</div><div className="mt4" style={{ fontSize: 15, fontWeight: 500 }}>{releaseRule(m)}</div><p className="tiny mt4" style={{ lineHeight: "18px" }}>{m.sealed ? "Unseal the message to change who receives it or when." : "Nothing is sent while this message is a draft. Seal it when you are ready."}</p></div>
            </div>
            <div className="hr mt24" />
            <div className="row between mt16"><span className="row gap8 small"><Icon name="shieldCheck" size={14} />Released only after your activation rules and verification steps are complete.</span><LinkA small onClick={() => go("activation")}>Review activation rules</LinkA></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* --------------------------------------------------------------- Settings */
const SETTINGS_TABS = [["profile", "Profile"], ["security", "Security"], ["notifications", "Notifications"], ["privacy", "Privacy & data"]];
const SETTINGS = {
  name: "John Venter", preferred: "John", email: "john.venter@venterholdings.co.za", phone: "+27 82 555 0142", address: "14 Alphen Drive, Constantia, Cape Town, 7806",
  language: "English (South Africa)", timezone: "(GMT+02:00) Johannesburg",
  twoStep: true, biometric: true, signInAlerts: true, timeout: "15 minutes",
  byEmail: true, bySms: true, byPush: false, quiet: true, onView: true, onReadiness: true, onNews: false,
  suggestions: true, analytics: false,
};
const DEVICES = [
  ["laptop", "MacBook Pro · Safari", "Cape Town, South Africa", "This device"],
  ["smartphone", "iPhone 15 Pro · Legacy Vault app", "Cape Town, South Africa", "Last active 29 Sep 2026"],
  ["smartphone", "iPad Air · Safari", "Hermanus, South Africa", "Last active 02 Sep 2026"],
];
const SettingRow = ({ icon, title, desc, children }) => (
  <div className="list-row" style={{ alignItems: "center", padding: "18px 0" }}>
    {icon && <div className="icon-box" style={{ width: 32, height: 32 }}><Icon name={icon} size={14} /></div>}
    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 15, fontWeight: 500 }}>{title}</div><div className="small" style={{ color: "#45474d", fontSize: 13, maxWidth: 440 }}>{desc}</div></div>
    {children}
  </div>
);
const SettingCard = ({ title, lead, children, tight }) => (
  <div className="card" style={{ padding: tight ? "32px 28px 12px" : "32px 28px 28px" }}>
    <h2 className="h3" style={{ fontSize: 21 }}>{title}</h2>
    {lead && <p className="body mt8" style={{ fontSize: 15 }}>{lead}</p>}
    <div className="mt16">{children}</div>
  </div>
);

function Settings({ go }) {
  const [tab, setTab] = useState("profile");
  const [s, setS] = useState(SETTINGS);
  const [saved, setSaved] = useState(SETTINGS);
  const [notice, setNotice] = useState(false);
  const [devices, setDevices] = useState(DEVICES);
  const [exported, setExported] = useState(false);
  const dirty = JSON.stringify(s) !== JSON.stringify(saved);
  const text = (k) => ({ value: s[k], onChange: (e) => { setS({ ...s, [k]: e.target.value }); setNotice(false); } });
  const flag = (k) => ({ on: s[k], onChange: (v) => { setS({ ...s, [k]: v }); setNotice(false); } });
  return (
    <div className="lv-page">
      <PageHead eyebrow="Settings" title="Your account and preferences"
        lead="Manage your profile, how you sign in and the way Legacy Vault keeps in touch with you. What is released, and to whom, is set on each item and person — never here."
        right={<div className="row gap12">{dirty && <span className="row gap6 small" style={{ fontSize: 12.5 }}><Icon name="tag" size={13} />Unsaved changes</span>}<Btn icon="sealed" disabled={!dirty} onClick={() => { setSaved(s); setNotice(true); }}>Save changes</Btn></div>} />
      {notice && <div className="notice sm" style={{ marginBottom: 24, alignItems: "center", fontSize: 14 }}><Icon name="circleCheck" size={16} />Settings saved. This change was recorded in your Access History.</div>}
      <div className="tabs">
        {SETTINGS_TABS.map(([k, l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}
        <span className="small" style={{ marginLeft: "auto", paddingRight: 10 }}>Last changed 14 Jul 2026</span>
      </div>
      <div className="col2 mt32">
        <div className="stack">
          {tab === "profile" && <>
            <SettingCard title="Personal details" lead="How we address you, and how we reach you for check-ins.">
              <div className="grid2 mt24" style={{ gap: 16 }}>
                <div className="field"><label>Full name</label><input className="input" {...text("name")} /></div>
                <div className="field"><label>Preferred name</label><input className="input" {...text("preferred")} /></div>
                <div className="field mt8"><label>Email</label><input className="input" {...text("email")} /></div>
                <div className="field mt8"><label>Mobile</label><input className="input" {...text("phone")} /></div>
              </div>
              <div className="field mt24"><label>Home address</label><input className="input" {...text("address")} /></div>
            </SettingCard>
            <SettingCard title="Identity" lead="Used once, to confirm that this vault belongs to you." tight>
              <SettingRow icon="idCard" title="South African ID number" desc={<span className="row gap8"><Icon name="eyeOff" size={13} style={{ color: "var(--ink-3)" }} />•••••• •••• 08 4</span>}><span className="chip green" style={{ borderRadius: 999 }}><Icon name="check" size={11} />Verified 12 Mar 2024</span></SettingRow>
              <SettingRow icon="mail" title="Email address" desc="Confirmed by a link sent to your inbox."><span className="chip green" style={{ borderRadius: 999 }}><Icon name="check" size={11} />Confirmed</span></SettingRow>
              <SettingRow icon="phone" title="Mobile number" desc="Confirmed by a one-time code sent by SMS."><span className="chip green" style={{ borderRadius: 999 }}><Icon name="check" size={11} />Confirmed</span></SettingRow>
            </SettingCard>
            <SettingCard title="Language and region">
              <div className="grid2 mt24" style={{ gap: 16 }}>
                <div className="field"><label>Language</label><select className="input" {...text("language")}>{["English (South Africa)", "Afrikaans", "isiZulu", "isiXhosa"].map((o) => <option key={o}>{o}</option>)}</select></div>
                <div className="field"><label>Time zone</label><select className="input" {...text("timezone")}>{["(GMT+02:00) Johannesburg", "(GMT+00:00) London", "(GMT+04:00) Dubai"].map((o) => <option key={o}>{o}</option>)}</select></div>
              </div>
            </SettingCard>
          </>}

          {tab === "security" && <>
            <SettingCard title="Signing in" lead="Legacy Vault protects your own account. It never stores the passwords to anything else." tight>
              <SettingRow icon="key" title="Password" desc="Last changed 14 Jul 2026."><Btn kind="line" size="sm">Change password</Btn></SettingRow>
              <SettingRow icon="shieldCheck" title="Two-step verification" desc="A code from your authenticator app is required at every sign-in."><Toggle {...flag("twoStep")} /></SettingRow>
              <SettingRow icon="fingerprint" title="Biometric sign-in" desc="Use Face ID or your fingerprint on your registered devices."><Toggle {...flag("biometric")} /></SettingRow>
              <SettingRow icon="copy" title="Recovery codes" desc="8 of 10 codes remaining. Keep them somewhere other than your phone."><Btn kind="line" size="sm">View codes</Btn></SettingRow>
            </SettingCard>
            {!s.twoStep && <div className="notice amber sm" style={{ fontSize: 14, alignItems: "center" }}><Icon name="alert" size={16} />Without two-step verification, your password is the only thing protecting your vault. We strongly recommend keeping it on.</div>}
            <SettingCard title="Trusted devices" lead="Only these devices can open your vault without confirming your identity again." tight>
              {devices.map(([icon, name, where, when]) => (
                <SettingRow key={name} icon={icon} title={name} desc={`${where} · ${when}`}>
                  {when === "This device" ? <span className="chip green" style={{ borderRadius: 999 }}><span className="dot" />This device</span> : <button className="link sm" onClick={() => setDevices(devices.filter((d) => d[1] !== name))}>Remove</button>}
                </SettingRow>
              ))}
            </SettingCard>
            <SettingCard title="Sessions" tight>
              <SettingRow icon="timer" title="Sign out automatically" desc="Closes your session after a period of inactivity."><select className="input" style={{ height: 34, width: 162, fontSize: 13, padding: "0 10px" }} {...text("timeout")}>{["5 minutes", "15 minutes", "30 minutes", "1 hour"].map((o) => <option key={o}>{o}</option>)}</select></SettingRow>
              <SettingRow icon="signIn" title="Sign-in alerts" desc="Tell me whenever my vault is opened from a new device or location."><Toggle {...flag("signInAlerts")} /></SettingRow>
            </SettingCard>
          </>}

          {tab === "notifications" && <>
            <SettingCard title="Check-in reminders" lead="How we ask “Are you OK?”. We use every channel you switch on, so a missed email is never mistaken for silence." tight>
              <SettingRow icon="mail" title="Email" desc={s.email}><Toggle {...flag("byEmail")} /></SettingRow>
              <SettingRow icon="phone" title="SMS" desc={s.phone}><Toggle {...flag("bySms")} /></SettingRow>
              <SettingRow icon="bell" title="Push notification" desc="Sent to the Legacy Vault app on your registered devices."><Toggle {...flag("byPush")} /></SettingRow>
              <SettingRow icon="clock" title="Quiet hours" desc="Reminders are held between 21:00 and 07:00 and delivered in the morning."><Toggle {...flag("quiet")} /></SettingRow>
            </SettingCard>
            {!s.byEmail && !s.bySms && !s.byPush && <div className="notice amber sm" style={{ fontSize: 14, alignItems: "center" }}><Icon name="alert" size={16} />With every channel off we cannot reach you for a check-in. Switch at least one on to keep your activation rules working as intended.</div>}
            <div className="card soft" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div className="icon-box" style={{ background: "var(--paper)" }}><Icon name="calendarCheck" size={15} /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 500 }}>Check in every 30 days</div><div className="small">How often we ask, and what happens if we can't reach you, is part of your activation rules.</div></div>
              <LinkA small onClick={() => go("activation")}>Activation Settings</LinkA>
            </div>
            <SettingCard title="Vault activity" lead="What else you would like to hear about." tight>
              <SettingRow icon="mailPlus" title="Access requests and releases" desc="Whenever someone asks for access, or anything is released. Always on."><Toggle on dim /></SettingRow>
              <SettingRow icon="eye" title="When a trusted person views something" desc="For example when your executor opens the Legacy Pack."><Toggle {...flag("onView")} /></SettingRow>
              <SettingRow icon="listChecks" title="Readiness reminders" desc="A monthly note about the items still to complete."><Toggle {...flag("onReadiness")} /></SettingRow>
              <SettingRow icon="leaf" title="News from Legacy Vault" desc="Occasional updates about new features. Never marketing from anyone else."><Toggle {...flag("onNews")} /></SettingRow>
            </SettingCard>
          </>}

          {tab === "privacy" && <>
            <SettingCard title="Your data" lead="Everything in your vault belongs to you, and you can take it with you." tight>
              <SettingRow icon="download" title="Export your vault" desc="An encrypted copy of everything you have recorded, sent to you as a private link.">
                {exported ? <span className="chip green" style={{ borderRadius: 999 }}><Icon name="check" size={11} />Link sent by email</span> : <Btn kind="line" size="sm" onClick={() => setExported(true)}>Request export</Btn>}
              </SettingRow>
              <SettingRow icon="sealed" title="Sealed access record" desc="A tamper-evident copy of who did what in your vault, and when."><LinkA small onClick={() => go("access-history")}>Access History</LinkA></SettingRow>
              <SettingRow icon="globe" title="Where your data is held" desc="Stored and encrypted in South Africa, and handled in line with POPIA."><span className="chip plain" style={{ borderRadius: 999 }}>South Africa</span></SettingRow>
            </SettingCard>
            <SettingCard title="Consent" lead="You can change your mind at any time. Neither choice affects how your vault works." tight>
              <SettingRow icon="bulb" title="Readiness suggestions" desc="Use what I have recorded to suggest what may still be missing."><Toggle {...flag("suggestions")} /></SettingRow>
              <SettingRow icon="chart" title="Anonymous usage statistics" desc="Help improve Legacy Vault. The contents of your vault are never included."><Toggle {...flag("analytics")} /></SettingRow>
            </SettingCard>
            <div className="card" style={{ padding: "28px 28px", background: "var(--amber-bg)", borderColor: "var(--amber-line)" }}>
              <h2 className="h3" style={{ fontSize: 21 }}>Close your vault</h2>
              <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px", color: "#3a2e14", maxWidth: 560 }}>Closing your vault permanently removes everything you have recorded and tells your trusted people that it no longer exists. Nothing is released to anyone. We will ask you to confirm your identity first.</p>
              <Btn kind="line" style={{ marginTop: 20 }}>Close my vault</Btn>
            </div>
          </>}
        </div>

        <div className="stack">
          <div className="card soft" style={{ padding: 24 }}>
            <div className="row gap12"><div className="initials serif xl">JV</div><div><div className="h3" style={{ fontSize: 19 }}>{saved.name}</div><div className="tiny">Private Client</div></div></div>
            <div className="hr mt20" />
            <div className="kv mt12"><span>Member since</span><b>12 Mar 2024</b></div>
            <div className="kv"><span>Vault reference</span><b className="mono">LV-SY-0001</b></div>
            <div className="kv"><span>Last sign-in</span><b>30 Sep 2026, 08:15</b></div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow muted" style={{ fontSize: 10.5 }}>Security at a glance</div>
            {[[s.twoStep ? "circleCheck" : "alertCircle", s.twoStep ? "green" : "gold", "Two-step verification", s.twoStep ? "On · authenticator app" : "Switched off"], ["circleCheck", "green", "Trusted devices", `${devices.length} registered`], ["circleCheck", "green", "Password", "Changed 14 Jul 2026"], [s.signInAlerts ? "circleCheck" : "alertCircle", s.signInAlerts ? "green" : "gold", "Sign-in alerts", s.signInAlerts ? "On" : "Switched off"]].map(([i, tone, t, d]) => (
              <div key={t} className="row gap12 mt16">
                <div className={`icon-round ${tone}`} style={{ width: 26, height: 26 }}><Icon name={i} size={12} /></div>
                <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div className="tiny">{d}</div></div>
              </div>
            ))}
            <div className="hr mt20" />
            <div className="mt16"><LinkA small onClick={() => go("access-history")}>View access history</LinkA></div>
          </div>
          <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
            <div className="eyebrow" style={{ color: "#1f2a24" }}>You remain in control</div>
            <p className="small mt12" style={{ color: "#1f2a24", fontSize: 13.5, lineHeight: "20px" }}>Changing a setting here never releases anything. Your vault only activates through the rules and verification steps you configured.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ----------------------------------------- Standalone (trusted-person) */
function StandaloneBar({ chips }) {
  return (
    <header className="lv-top" style={{ padding: "0 86px" }}>
      <div className="row gap16">
        <div className="lv-brand-mark" style={{ background: "#f6ecd6", borderColor: "#e0cc9c", color: "var(--gold)" }}><Icon name="leaf" size={18} stroke={1.5} /></div>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 600, letterSpacing: ".22em", fontSize: 15 }}>LEGACY VAULT</span>
      </div>
      <div className="lv-top-sp" />
      {chips}
    </header>
  );
}

function PreviewSwitch({ who, setWho, label }) {
  return (
    <div className="row between" style={{ marginBottom: 24 }}>
      <span className="row gap8 small"><Icon name="eye" size={14} />{label}</span>
      <div className="seg">
        <button className={who === "sarah" ? "on" : ""} onClick={() => setWho("sarah")}>Sarah · Spouse</button>
        <button className={who === "jane" ? "on" : ""} onClick={() => setWho("jane")}>Jane · Executor</button>
      </div>
    </div>
  );
}

const REQUESTS = {
  sarah: { ref: "LV-AR-2291", at: "30 Sep 2026, 09:14", reason: "I haven't been able to reach John for several days and I'd like to make sure everything is in order." },
  jane: { ref: "LV-AR-2292", at: "30 Sep 2026, 11:40", reason: "Opened as the nominated executor, on behalf of the family." },
};
const StandaloneFoot = () => (
  <div className="lv-foot" style={{ padding: 0, marginTop: 48 }}><span>© 2026 Legacy Vault. Controlled information handover.</span><span><Icon name="lock" size={14} />Secure · Private · Encrypted · POPIA-conscious</span></div>
);

function AccessRequest({ go }) {
  const [who, setWho] = useState("sarah");
  const [urgentOpen, setUrgentOpen] = useState(false);
  const [urgent, setUrgent] = useState("");
  const [urgentSent, setUrgentSent] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const p = PEOPLE.find((x) => x.id === who);
  const req = REQUESTS[who];
  const levels = PERSON_LEVELS[who];
  const receive = ["emergency", "verified", "locked", "personal"].map((lv) => [lv, CATEGORIES.filter((c) => levels[c.key] === lv)]).filter(([, cs]) => cs.length);
  const switchTo = (id) => { setWho(id); setUrgentOpen(false); setUrgent(""); setUrgentSent(false); };
  const stages = [
    ["mailPlus", "blue", "Now", "Your request has been received", "John has been notified by email, SMS and push notification, and given the chance to confirm that everything is OK.", true],
    ["clock", "green", "In 48 hours", "We follow up with John", "If we don't hear from John, we send another notification. Nothing is released, and you will not be left guessing."],
    ["shieldCheck", "gold", "After the response window", "Verification begins", "Multiple verification stages run, exactly as John configured them. If he asked for more than one person, everyone required is contacted."],
    ["unlock", "blue", "After verification", "Controlled release", "Only the information John authorised is released to you, in the order he set. Nothing beyond your permissions is ever shared."],
  ];
  return (
    <div className="lv-main" style={{ height: "100vh" }}>
      <StandaloneBar chips={<div className="row gap10"><span className="chip pill green" style={{ height: 32 }}><Icon name="shieldCheck" size={13} />Encrypted &amp; private</span><span className="chip pill plain" style={{ height: 32 }}>Ref {req.ref}</span></div>} />
      <div className="lv-scroll">
        <div style={{ maxWidth: 1056, margin: "0 auto", padding: "48px 0 0" }}>
          <PreviewSwitch who={who} setWho={switchTo} label="Previewing the trusted person's experience" />
          {withdrawn ? (
            <div className="card" style={{ maxWidth: 576, margin: "0 auto", padding: "40px 40px", textAlign: "center" }}>
              <div className="icon-round" style={{ width: 56, height: 56, margin: "0 auto", background: "#f3efe5" }}><Icon name="undo" size={20} /></div>
              <h2 className="h2 mt24" style={{ fontSize: 24 }}>Your request has been withdrawn</h2>
              <p className="body mt12" style={{ fontSize: 15, lineHeight: "23px" }}>We've let John know that you no longer need access through this request. Nothing was released, and John's Legacy Vault stays exactly as it was.</p>
              <p className="body mt12" style={{ fontSize: 15 }}>If you need to reach John, you can start a new request at any time.</p>
              <Btn icon="history" style={{ marginTop: 24 }} onClick={() => { setWithdrawn(false); switchTo(who); }}>Start a new request</Btn>
            </div>
          ) : (
            <>
              <section className="hero" style={{ padding: "40px 40px 40px" }}>
                <div className="row gap12"><span className="eyebrow">Legacy Vault · Access request</span><span className="chip dark-gold" style={{ borderRadius: 999, height: 26 }}><span className="dot" style={{ background: "#d9b872" }} />Request received</span></div>
                <h1 className="h1" style={{ color: "#fff", fontSize: 40, lineHeight: "48px", marginTop: 20 }}>We've let John know you'd like access</h1>
                <p className="lead" style={{ fontSize: 17, lineHeight: "24px", marginTop: 14, maxWidth: 660 }}>John has been notified that you requested access to his Legacy File. We've sent him a notification and given him the opportunity to confirm that everything is OK.</p>
                <div className="hr" style={{ background: "rgba(255,255,255,.1)", marginTop: 24 }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", marginTop: 24 }}>
                  {[["Requested by", p.name, p.rel], ["Submitted", req.at, "Response window 48 hours"], ["Reference", req.ref, "Recorded in the access history"]].map(([l, v, s]) => (
                    <div key={l}><div className="lbl">{l}</div><div className="val">{v}</div><div className="sub">{s}</div></div>
                  ))}
                </div>
                <div className="hero-inner mt24"><Icon name="lock" size={15} style={{ color: "#d9b872" }} />Nothing has been shared. John responds first, and no response is not treated as anything more than no response.</div>
              </section>
              <div className="col2 mt32" style={{ gridTemplateColumns: "minmax(0,1fr) 336px", gap: 24 }}>
                <div className="stack">
                  <div className="card" style={{ padding: "40px 28px 20px" }}>
                    <h2 className="h3" style={{ fontSize: 21 }}>What happens next</h2>
                    <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>Your request follows a careful, multi-stage process. Nothing is shared with you until every stage is complete.</p>
                    <span className="chip plain mt16" style={{ borderRadius: 999, height: 26 }}>4 stages</span>
                    <div className="tl mt24">
                      {stages.map(([i, tone, when, t, d, now]) => (
                        <div key={t} className="tl-item" style={{ paddingBottom: 30 }}>
                          <div className={`icon-round ${tone}`} style={{ width: 40, height: 40 }}><Icon name={i} size={16} /></div>
                          <div>
                            <div className="row gap8"><span className="eyebrow muted">{when}</span>{now && <span className="chip gold" style={{ borderRadius: 999, height: 22, fontSize: 11 }}><span className="dot" />In progress</span>}</div>
                            <div className="h3 mt8" style={{ fontSize: 19 }}>{t}</div>
                            <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>{d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card" style={{ padding: "40px 28px 28px" }}>
                    <h2 className="h3" style={{ fontSize: 21 }}>What we sent John</h2>
                    <p className="body mt8" style={{ fontSize: 15 }}>John always hears from us first. Nothing is released before he has had the chance to respond.</p>
                    <span className="chip plain mt16" style={{ borderRadius: 999, height: 26 }}>John's notification</span>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20, alignItems: "start" }}>
                      <JohnPrompt key={who} notification title="Are you OK?" body="Hi John, someone you trust has asked to view your Legacy File. We just want to make sure you're still active — nothing has been shared." note="Preview only. In the live product John responds here and you are updated instantly." />
                      <div className="stack" style={{ gap: 0 }}>
                        <div className="card" style={{ padding: 20 }}>
                          <div className="eyebrow muted" style={{ fontSize: 10.5 }}>How we reach him</div>
                          {[["mail", "Email"], ["receipt", "SMS"], ["phone", "Push"]].map(([i, t]) => (
                            <div key={t} className="row gap12 mt12" style={{ fontSize: 13.5 }}><div className="icon-box" style={{ width: 28, height: 28 }}><Icon name={i} size={13} /></div>{t}</div>
                          ))}
                        </div>
                        <div className="notice sm" style={{ marginTop: 20, fontSize: 13 }}><Icon name="shieldCheck" size={15} style={{ marginTop: 1 }} />John can confirm he's OK or ask for help. Either way, he responds first, and a single check-in closes this request.</div>
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ padding: "40px 28px 28px" }}>
                    <h2 className="h3" style={{ fontSize: 21 }}>What you'll receive</h2>
                    <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>This is what John has authorised for you, and when each part becomes available. Nothing outside this list is ever shared.</p>
                    <span className="chip plain mt16" style={{ borderRadius: 999, height: 26 }}>{Object.keys(levels).length} sections</span>
                    {receive.map(([lv, cs]) => (
                      <div key={lv} className="mt24">
                        <div className="row gap12" style={{ paddingBottom: 12, borderBottom: "1px solid var(--line)" }}><LevelChip level={lv} badge /><span className="tiny">{LEVELS[lv].note}</span></div>
                        {cs.map((c) => (
                          <div key={c.key} className="list-row" style={{ alignItems: "center", padding: "14px 0" }}>
                            <div className="icon-box" style={{ width: 32, height: 32 }}><Icon name={c.icon} size={14} /></div>
                            <div><div style={{ fontSize: 15, fontWeight: 500 }}>{c.key}</div><div className="small" style={{ fontSize: 12.5 }}>{c.desc}</div></div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="card soft mt16" style={{ padding: "14px 16px", display: "flex", gap: 12, fontSize: 12, color: "var(--ink-2)" }}><Icon name="info" size={14} style={{ marginTop: 1 }} />Where John has pointed to a password manager, we show you where the details are held — we never store or hand over his passwords.</div>
                  </div>
                </div>

                <div className="stack">
                  <div className="card" style={{ padding: 24 }}>
                    <div className="eyebrow muted">Your request</div>
                    <div className="kv mt12"><span>Status</span><b>Awaiting John</b></div>
                    <div className="kv"><span>Submitted</span><b>{req.at}</b></div>
                    <div className="kv"><span>Response window</span><b>48 hours</b></div>
                    <div className="kv"><span>Reference</span><b>{req.ref}</b></div>
                    <div className="card soft mt16" style={{ padding: "14px 16px" }}><div className="eyebrow muted" style={{ fontSize: 10.5 }}>Your reason</div><p className="small mt8" style={{ color: "var(--ink)", fontSize: 13 }}>{req.reason}</p></div>
                    <div className="hr mt16" />
                    <p className="tiny mt12" style={{ lineHeight: "17px" }}>If we don't hear from John within 48 hours, we'll send another notification.</p>
                    <p className="tiny mt8" style={{ lineHeight: "17px" }}>If John still hasn't responded, verification begins on Day 51, exactly as he configured it.</p>
                    <button className="card soft mt16" style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, textAlign: "left", fontSize: 12, color: "var(--ink-2)" }} onClick={() => go("released-file")}>
                      <span style={{ flex: 1 }}>Once released, this request becomes your Released Legacy File.</span><Icon name="chevronRight" size={14} />
                    </button>
                  </div>
                  <div className="card" style={{ padding: 24 }}>
                    <div className="eyebrow muted">Your options</div>
                    <button className="opt mt16" style={{ height: "auto", padding: "12px 16px", alignItems: "center" }} aria-expanded={urgentOpen} onClick={() => setUrgentOpen(!urgentOpen)}>
                      <Icon name="siren" size={15} /><span style={{ flex: 1, fontWeight: 500, fontSize: 14.5 }}>Something urgent has happened</span><Icon name={urgentOpen ? "chevronUp" : "chevronDown"} size={15} />
                    </button>
                    {urgentOpen ? (
                      <>
                        <textarea className="input mt12" rows={4} maxLength={500} value={urgent} onChange={(e) => { setUrgent(e.target.value); setUrgentSent(false); }} placeholder="Tell us what's happening so we can prioritise the right steps." />
                        <div className="tiny" style={{ fontSize: 11, marginTop: 6 }}>{urgent.length}/500</div>
                        <button className="btn btn-dark mt12" style={{ width: "100%" }} disabled={!urgent.trim()} onClick={() => setUrgentSent(true)}><Icon name="send" size={15} />Send to Legacy Vault</button>
                        {urgentSent && <div className="row gap8 tiny mt12" style={{ alignItems: "flex-start", color: "var(--ink)" }}><Icon name="circleCheck" size={13} style={{ marginTop: 2 }} />Thank you. Our team will review this and speed up the right steps where we can.</div>}
                      </>
                    ) : <p className="tiny mt8" style={{ lineHeight: "17px" }}>Use this if there is a pressing reason for access, and we'll prioritise accordingly.</p>}
                    <div className="hr mt16" />
                    <Btn kind="line" icon="xCircle" style={{ width: "100%", marginTop: 16 }} onClick={() => setWithdrawn(true)}>Withdraw this request</Btn>
                    <p className="tiny mt12" style={{ lineHeight: "17px" }}>Withdrawing changes nothing in John's vault and he is told you no longer need access.</p>
                  </div>
                  <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
                    <div className="eyebrow" style={{ color: "#1f2a24" }}>Your safeguards</div>
                    {[["shield", "No information is released until every verification stage is complete."], ["userHeart", "You only ever receive the information John authorised for you."], ["undo", "If John confirms he's OK, this request closes immediately."], ["history", "Every action on this request is recorded in the access history."]].map(([i, t]) => (
                      <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}><div className="icon-round" style={{ width: 26, height: 26, background: "#f7fbf8", borderColor: "var(--green-line)" }}><Icon name={i} size={12} /></div><span className="small" style={{ color: "#1f2a24" }}>{t}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <StandaloneFoot />
        </div>
      </div>
    </div>
  );
}

function ReleasedFile({ go }) {
  const [who, setWho] = useState("sarah");
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(0);
  const [trail, setTrail] = useState("all");
  const [prepared, setPrepared] = useState(false);
  const sarah = who === "sarah";
  const ref = sarah ? "LV-RL-2291" : "LV-RL-2292";
  const groups = [
    { tag: ["gold", "zap", "Emergency information", "May be released quickly to your nominated contacts."], items: [
      { icon: "shieldStar", t: "AVBOB Funeral Policy", c: "Insurance", d: "Family funeral plan covering John and his dependants.", at: "17 OCT 2026, 10:02", body: { a: ["Policy number", "AVB-9900771"], b: ["24 hour claims line", "+27 12 303 3000"], todo: "Call the 24 hour line first — AVBOB coordinates collection and documentation with the family directly.", tip: "The funeral home will ask for the policy number and a certified death certificate." } },
      { icon: "shieldStar", t: "Discovery Health Medical Scheme", c: "Insurance", d: "Classic Comprehensive cover for the family.", at: "17 OCT 2026, 10:02" },
      { icon: "handHeart", t: "Funeral Wishes", c: "Funeral", d: "John's written preferences for his own service.", at: "17 OCT 2026, 10:02" },
    ]},
    { tag: ["green", "shield", "Released after verification", "Released once the verification process is complete."], items: [
      { icon: "landmark", t: "Discovery Bank", c: "Financial", d: "Private cheque account and savings pocket.", at: "17 OCT 2026, 15:30" },
      { icon: "landmark", t: "Old Mutual Investment Account", c: "Financial", d: "Unit trust portfolio.", at: "17 OCT 2026, 15:30" },
      { icon: "house", t: "Primary Residence — Constantia", c: "Property", d: "Freehold residential property.", at: "17 OCT 2026, 15:30" },
      { icon: "car", t: "BMW X5 — CA 447 192", c: "Vehicles", d: "Owned outright, bequeathed to Michael.", at: "17 OCT 2026, 15:30" },
    ]},
    { tag: ["blue", "lock", "Released last", "Personal information, released last of all as John set."], items: [
      { icon: "userHeart", t: "Personal wishes", c: "Personal", d: "A letter to the family and John's personal wishes.", at: "18 OCT 2026, 09:00" },
      { icon: "paw", t: "Bella and Milo", c: "Personal", d: "Care arrangements for the family pets.", at: "18 OCT 2026, 09:00" },
    ]},
  ];
  const trailItems = [
    ["mailPlus", "", "30 SEP 2026, 09:14", "Access request received", "Submitted through the trusted-person screen with a written reason.", "Sarah Venter", "Spouse", "LV-AR-2291"],
    ["bell", "blue", "30 SEP 2026, 09:15", "“Are you OK?” notification sent to John", "Delivered by email, SMS and push notification with a single confirm button.", "Legacy Vault", "System", "LV-AR-2291"],
    ["clock", "", "02 OCT 2026, 09:15", "Second reminder sent to John", "No response recorded on any channel. Nothing was released.", "Legacy Vault", "System", "LV-AR-2291"],
    ["users", "gold", "09 OCT 2026, 09:14", "Trusted contact notified", "We told John's nominated contact we could not confirm his status. No information was shared.", "Legacy Vault", "System", "LV-AR-2291"],
    ["shieldCheck", "blue", "16 OCT 2026, 09:20", "Verification began", "Multi-stage verification started, exactly as John configured it.", "Legacy Vault", "System", "LV-VF-2291"],
    ["idCard", "green", "16 OCT 2026, 11:05", "Requester identity verified", "Passport and live video check against registered contact details.", "Verification team", "Officer 4471", "LV-VF-2291"],
    ["userX", "green", "17 OCT 2026, 08:40", "John's non-response confirmed", "Two independent reviewers confirmed John had not responded to any channel.", "Verification team", "Two reviewers", "LV-VF-2291"],
    ["unlock", "gold", "17 OCT 2026, 10:00", "Release approved against John's permissions", "Every item was checked against John's instructions before sign-off.", "Release officer", "Officer 2290", "LV-RL-2291"],
    ["zap", "gold", "17 OCT 2026, 10:02", "Emergency information released", "Insurance and funeral information (3 items) released first, as John set.", "Legacy Vault", "System", "LV-RL-2291", true],
    ["shieldCheck", "blue", "17 OCT 2026, 15:30", "Verified information released", "Financial, property and vehicle information (4 items) released after verification.", "Legacy Vault", "System", "LV-RL-2291", true],
    ["mailOpen", "", "18 OCT 2026, 09:00", "Personal information released", "Personal wishes and family pets (2 items) released last of all, as John set.", "Legacy Vault", "System", "LV-RL-2291", true],
  ].filter((t) => trail === "all" || t[8]);
  return (
    <div className="lv-main" style={{ height: "100vh" }}>
      <StandaloneBar chips={<div className="row gap10"><span className="chip pill gold" style={{ height: 32 }}><Icon name="unlock" size={13} />Access granted</span><span className="chip pill green" style={{ height: 32 }}><Icon name="fingerprint" size={13} />Sealed record</span><span className="chip pill plain" style={{ height: 32 }}>Ref {ref}</span></div>} />
      <div className="lv-scroll">
        <div style={{ maxWidth: 1136, margin: "0 auto", padding: "48px 0 0" }}>
          <PreviewSwitch who={who} setWho={setWho} label="Previewing the trusted person's released file" />
          <section className="hero" style={{ padding: "40px 40px 40px" }}>
            <div className="row gap12"><span className="eyebrow">Legacy Vault · Released legacy file</span><span className="chip dark-gold" style={{ borderRadius: 999, height: 26 }}><span className="dot" style={{ background: "#d9b872" }} />Access granted</span></div>
            <h1 className="h1" style={{ color: "#fff", fontSize: 40, lineHeight: "50px", marginTop: 20, maxWidth: 740 }}>John's Legacy File has been released to you</h1>
            <p className="lead" style={{ fontSize: 17, lineHeight: "24px", marginTop: 14, maxWidth: 660 }}>This is the information John authorised for you, released in the order he set. Everything you are viewing is recorded, and you can return to it at any time during your access window.</p>
            <div className="hr" style={{ background: "rgba(255,255,255,.1)", marginTop: 24 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 24 }}>
              {[["Released to", sarah ? "Sarah Venter" : "Jane Smith", sarah ? "Spouse" : "Executor"], ["Released", sarah ? "17 October 2026, 15:30" : "18 October 2026, 11:15", "Controlled release"], ["Reference", ref, "Recorded in the audit trail"], ["Access window", sarah ? "90 days (until 15 January 2027)" : "180 days (until 16 April 2027)", "Then access must be requested again"]].map(([l, v, s]) => (
                <div key={l}><div className="lbl">{l}</div><div className="val">{v}</div><div className="sub">{s}</div></div>
              ))}
            </div>
            <div className="hero-inner mt24"><Icon name="lock" size={15} style={{ color: "#d9b872" }} />Nothing outside your permissions is included, and every entry below is tamper-evident.<button className="btn sm" style={{ marginLeft: "auto", border: "1px solid rgba(255,255,255,.15)", color: "#fff", fontSize: 12.5 }}><Icon name="info" size={13} />Why was this released?</button></div>
          </section>
          {confirmed && <div className="notice mt24"><Icon name="circleCheck" size={18} style={{ marginTop: 3 }} />Thank you — you've confirmed that you received this. That confirmation has been written to the audit trail as well.</div>}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 362px", gap: 24, marginTop: 24, alignItems: "start" }}>
            <div className="stack">
              <div className="card" style={{ padding: "40px 28px 28px" }}>
                <h2 className="h3" style={{ fontSize: 21 }}>Why this was released</h2>
                <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>John never responded to his check-in, every verification stage completed, and you were already authorised. Nothing outside your permissions was included.</p>
                <span className="chip pill paper mt16" style={{ height: 30 }}><Icon name="shield" size={12} />Inactivity check-in</span>
                <div className="card soft mt16" style={{ padding: "14px 16px", display: "flex", gap: 14, fontSize: 12, color: "var(--ink-2)", lineHeight: "18px" }}><Icon name="sliders" size={15} style={{ marginTop: 2 }} />John chose an inactivity check-in every 30 days. When his 30 September check-in went unanswered, the full escalation he configured ran before anything moved.</div>
                <div className="tl mt24">
                  {[["timer", "blue", "John's check-in went unanswered", "On 30 September 2026 John's scheduled check-in was due. It went unanswered, so the escalation he configured ran in full — two reminders, a trusted contact notified, and independent verification — before any release was considered."], ["shieldCheck", "gold", "Every verification stage was completed", "Your identity as the requester was verified, John's lack of response was independently confirmed by two reviewers, and the five-point release checklist completed on 17 October 2026."], ["userHeart", "green", "John had already authorised you", `On 30 September 2026 John granted you ${sarah ? "financial, insurance, property, vehicle, funeral and personal" : "financial, property, document and vehicle"} information, each with its own release level. Only that authorised set has been released.`]].map(([i, tone, t, d]) => (
                    <div key={t} className="tl-item" style={{ paddingBottom: 22 }}>
                      <div className={`icon-round ${tone}`} style={{ width: 40, height: 40 }}><Icon name={i} size={16} /></div>
                      <div><div className="h3" style={{ fontSize: 19 }}>{t}</div><p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>{d}</p></div>
                    </div>
                  ))}
                </div>
                <div className="hr mt8" />
                <h3 className="h4 mt32" style={{ fontSize: 16.5 }}>What was verified before release</h3>
                <p className="tiny mt4">Each stage had to pass before the next could begin.</p>
                <div className="grid2 mt20">
                  {[["idCard", "Requester identity verified", "Passport and live video check against your registered contact details.", "16 OCT 2026, 11:05"], ["userX", "John's non-response confirmed", "Two independent reviewers confirmed that John had not responded to any channel.", "17 OCT 2026, 08:40"], ["listChecks", "Release checked against permissions", "Every item was compared to John's instructions before approval.", "17 OCT 2026, 10:00"], ["unlock", "Release approved by a second officer", "A separate release officer signed off before anything was shared.", "17 OCT 2026, 10:01"]].map(([i, t, d, at]) => (
                    <div key={t} className="card soft" style={{ padding: "18px 16px", display: "flex", gap: 12 }}>
                      <div className="icon-round green" style={{ width: 30, height: 30 }}><Icon name={i} size={13} /></div>
                      <div><div style={{ fontSize: 15, fontWeight: 500 }}>{t} <Icon name="circleCheck" size={14} style={{ verticalAlign: -2, color: "#1d4a33" }} /></div><div className="small mt4" style={{ fontSize: 12.5, color: "#45474d" }}>{d}</div><div className="tiny mt8" style={{ fontSize: 11, letterSpacing: ".05em" }}>{at}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: "40px 28px 28px" }}>
                <h2 className="h3" style={{ fontSize: 21 }}>What was released to you</h2>
                <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>Grouped by when John allowed each part to become available. Open any item to see the details and what to do next.</p>
                <span className="chip pill plain mt16" style={{ height: 30 }}>9 items released</span>
                {groups.map((g, gi) => {
                  let idxBase = groups.slice(0, gi).reduce((n, x) => n + x.items.length, 0);
                  return (
                    <div key={gi} className="mt24">
                      <div className="row gap12" style={{ marginBottom: 12 }}><span className={`chip ${g.tag[0]}`} style={{ height: 30, padding: "0 10px", fontSize: 12.5 }}><Icon name={g.tag[1]} size={13} />{g.tag[2]}</span><span className="tiny" style={{ fontSize: 12.5 }}>{g.tag[3]}</span></div>
                      {g.items.map((it, k) => {
                        const idx = idxBase + k, isOpen = open === idx;
                        return (
                          <div key={it.t} className="acc">
                            <button className="acc-head" onClick={() => setOpen(isOpen ? -1 : idx)}>
                              <div className="icon-box"><Icon name={it.icon} size={15} /></div>
                              <div style={{ flex: 1 }}><div className="row gap8"><span style={{ fontSize: 15, fontWeight: 500 }}>{it.t}</span><span className="chip plain" style={{ borderRadius: 999, height: 20, fontSize: 10.5 }}>{it.c}</span></div><div className="small mt4" style={{ color: "#45474d" }}>{it.d}</div></div>
                              <span className="tiny" style={{ letterSpacing: ".06em", fontSize: 11 }}>RELEASED {it.at}</span>
                              <Icon name={isOpen ? "chevronUp" : "chevronDown"} size={15} />
                            </button>
                            {isOpen && (
                              <div className="acc-body">
                                <div className="grid2" style={{ gap: 16 }}>
                                  <div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>{(it.body || {}).a ? it.body.a[0] : "Where it is held"}</div><div className="mt8" style={{ fontSize: 13 }}>{(it.body || {}).a ? it.body.a[1] : "Statements in the study safe; contact details in the Legacy Pack."}</div></div>
                                  <div><div className="eyebrow muted" style={{ fontSize: 10.5 }}>{(it.body || {}).b ? it.body.b[0] : "Who to contact"}</div><div className="mt8" style={{ fontSize: 13 }}>{(it.body || {}).b ? it.body.b[1] : "Adele Fourie · +27 11 286 9104"}</div></div>
                                </div>
                                <div className="eyebrow muted mt16" style={{ fontSize: 10.5 }}>What to do</div>
                                <p className="mt8" style={{ fontSize: 13, maxWidth: 320, lineHeight: "20px" }}>{(it.body || {}).todo || "Contact the provider's deceased-estates line and quote the reference in this file."}</p>
                                <div className="notice amber sm mt16" style={{ fontSize: 12, alignItems: "center" }}><Icon name="bulb" size={14} />{(it.body || {}).tip || "Have a certified death certificate and the letter of executorship ready."}</div>
                                <div className="row gap12 mt16"><Btn kind="line" size="sm" icon="download">Download a copy</Btn><span className="tiny" style={{ fontSize: 11 }}>Released {it.at.replace(/^(\d+) (\w)(\w+)/, (m, d, a, b) => `${d} ${a}${b.toLowerCase()}`)}</span></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                <div className="card soft mt24" style={{ padding: "16px 16px", display: "flex", gap: 14, fontSize: 12, color: "var(--ink-2)" }}><Icon name="info" size={15} style={{ marginTop: 1 }} />Where John pointed to a password manager, we show you where the details are held — we never store or hand over his passwords.</div>
              </div>

              <div className="card" style={{ padding: "40px 28px 28px" }}>
                <h2 className="h3" style={{ fontSize: 21 }}>Audit trail</h2>
                <p className="body mt8" style={{ fontSize: 15, lineHeight: "23px" }}>The complete, tamper-evident record of everything that happened on this release. Nothing here can be edited after the fact.</p>
                <div className="seg mt16"><button className={trail === "all" ? "on" : ""} onClick={() => setTrail("all")}>Everything</button><button className={trail === "rel" ? "on" : ""} onClick={() => setTrail("rel")}>Release events</button></div>
                <div className="tl mt24">
                  {trailItems.map(([i, tone, at, t, d, w, wr, r, rel]) => (
                    <div key={t} className="tl-item" style={{ gridTemplateColumns: "36px 1fr", paddingBottom: 26 }}>
                      <div className={`icon-round ${tone}`}><Icon name={i} size={14} /></div>
                      <div>
                        <div className="row gap8"><span style={{ fontSize: 12, letterSpacing: ".06em", color: "var(--ink-2)" }}>{at}</span>{rel && <span className="chip gold" style={{ borderRadius: 999, height: 22, fontSize: 11 }}><span className="dot" />Release event</span>}</div>
                        <div className="h4 mt4" style={{ fontSize: 15 }}>{t}</div>
                        <p className="small mt4" style={{ fontSize: 13, color: "#45474d" }}>{d}</p>
                        <div className="row gap8 mt8"><span className="meta-chip"><Icon name="user" size={11} />{w}</span><span className="tiny" style={{ fontSize: 11 }}>{wr}</span><span className="meta-chip white"><Icon name="hash" size={11} />{r}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hr" />
                <div className="row between mt20"><span className="tiny">{trailItems.length} of 11 entries shown · sealed 17 October 2026, 15:30</span><Btn kind="line" icon={prepared ? "circleCheck" : "download"} onClick={() => setPrepared(true)}>{prepared ? "Audit trail prepared" : "Download the audit trail"}</Btn></div>
                {prepared && <div className="row gap8 tiny mt16" style={{ color: "var(--ink)" }}><Icon name="circleCheck" size={13} />A sealed copy is ready. We'll email a secure link to {ref} shortly.</div>}
              </div>
            </div>

            <div className="stack">
              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow muted">Release summary</div>
                <div className="mt12">
                  {[["Released to", sarah ? "Sarah Venter" : "Jane Smith"], ["Relationship", sarah ? "Spouse" : "Executor"], ["Activation", "Inactivity check-in"], ["Items released", sarah ? "9" : "6"], ["Reference", ref], ["Access window", sarah ? "90 days (until 15 January 2027)" : "180 days (until 16 April 2027)"]].map(([k, v]) => (
                    <div key={k} className="kv" style={{ padding: "6px 0" }}><span>{k}</span><b>{v}</b></div>
                  ))}
                </div>
                <div className="hr mt16" />
                {confirmed ? <div className="row gap8 tiny mt16" style={{ color: "var(--ink)" }}><Icon name="circleCheck" size={14} />Receipt confirmed and recorded.</div> : <>
                  <button className="btn btn-dark mt16" style={{ width: "100%" }} onClick={() => setConfirmed(true)}><Icon name="doubleCheck" size={16} />Confirm you've received this</button>
                  <p className="tiny mt12" style={{ fontSize: 11, lineHeight: "17px" }}>We record this for John's estate, and you can still revisit the file at any time.</p>
                </>}
              </div>
              <div className="card" style={{ padding: 24, background: "var(--green-bg)", borderColor: "var(--green-line)" }}>
                <div className="eyebrow" style={{ color: "#1f2a24" }}>Keeping this trustworthy</div>
                {[["fingerprint", "Tamper-evident record", "Every entry is timestamped and sealed. Nothing here can be edited after the fact."], ["history", "Every view is logged", "Each time you open this file, that visit is written to the audit trail."], ["lock", "Access is temporary", "Your access window is fixed. After it ends, access must be requested again."]].map(([i, t, d]) => (
                  <div key={t} className="row gap12 mt16" style={{ alignItems: "flex-start" }}><div className="icon-round" style={{ width: 26, height: 26, background: "#f7fbf8", borderColor: "var(--green-line)" }}><Icon name={i} size={12} /></div><div><div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ fontSize: 11.5, color: "#1f2a24" }}>{d}</div></div></div>
                ))}
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow muted">Need something else?</div>
                {[["help", "Something here isn't clear", "Reach the release team and someone will walk you through it."], ["alertCircle", "Challenge this release", "If you believe this release was made in error, you can flag it for review."], ["copy", "Request a certified copy", "Ask for paper copies of any document to be sent securely."]].map(([i, t, d]) => (
                  <button key={t} className="row gap14" style={{ gap: 14, width: "100%", textAlign: "left", alignItems: "flex-start", padding: 16, border: "1px solid var(--line)", borderRadius: 6, marginTop: 12, background: "var(--paper)" }}>
                    <div className="icon-box" style={{ width: 28, height: 28 }}><Icon name={i} size={13} /></div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div><div className="tiny mt4" style={{ fontSize: 11.5 }}>{d}</div></div>
                    <Icon name="chevronRight" size={14} style={{ color: "var(--ink-3)", marginTop: 6 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="lv-foot" style={{ padding: 0, marginTop: 48 }}><span>© 2026 Legacy Vault. Controlled information handover.</span><span><Icon name="lock" size={14} />Secure · Private · Encrypted · POPIA-conscious</span></div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== ROOT */
export default function LegacyVault({ initialRoute = "home" }) {
  const [route, setRoute] = useState(initialRoute);
  const go = (r) => { setRoute(r); requestAnimationFrame(() => { const el = document.querySelector(".lv-scroll"); if (el) el.scrollTop = 0; }); };

  const standalone = route === "access-request" || route === "released-file";
  let page;
  if (route === "home") page = <Home go={go} />;
  else if (route === "readiness") page = <Readiness go={go} />;
  else if (route === "inventory") page = <Inventory go={go} />;
  else if (route.startsWith("inventory/item/")) page = <ItemPage key={route} id={route.slice(15)} go={go} />;
  else if (route.startsWith("inventory/") && ITEMS[route.slice(10, 11).toUpperCase() + route.slice(11)]) page = <CategoryPage key={route} slug={route.slice(10)} go={go} />;
  else if (route === "inventory/add") page = <Placeholder icon="plusCircle" eyebrow="My legacy inventory" title="Add an item" lead="A guided way to record a new account, policy, property, vehicle, document or digital asset." bullets={["Choose a category and the type of item you are adding.", "Record what exists, where it is, who to contact and what to do.", "Point to your password manager instead of storing passwords here.", "Assign the item to a trusted person and set its release level."]} />;
  else if (route === "legacy-pack") page = <LegacyPack go={go} />;
  else if (route === "activation") page = <Activation go={go} />;
  else if (route === "activation/timeline") page = <Timeline go={go} />;
  else if (route === "trusted-people") page = <TrustedPeople go={go} />;
  else if (route.startsWith("trusted-people/per_")) page = <PersonDetail key={route} id={route.split("per_")[1]} go={go} />;
  else if (route === "emergency") page = <Emergency go={go} />;
  else if (route === "access-history") page = <AccessHistory go={go} />;
  else if (route === "documents") page = <Documents go={go} />;
  else if (route === "messages") page = <Messages go={go} />;
  else if (route === "settings") page = <Settings go={go} />;
  else page = <Home go={go} />;

  return (
    <div className="lv">
      <style>{CSS}</style>
      {standalone ? (
        <div className="lv-app">{route === "access-request" ? <AccessRequest go={go} /> : <ReleasedFile go={go} />}</div>
      ) : (
        <div className="lv-app">
          <Sidebar route={route} go={go} />
          <main className="lv-main">
            <TopBar go={go} />
            <div className="lv-scroll">{page}</div>
          </main>
        </div>
      )}
    </div>
  );
}
