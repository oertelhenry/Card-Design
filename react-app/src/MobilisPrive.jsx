import React, { useEffect, useState } from "react";
import {
  LayoutGrid, Radio, Users, Smartphone, CalendarClock, SlidersHorizontal, Grid2x2, Megaphone,
  ChartColumn, ShieldCheck, Search, Bell, ChevronDown, RefreshCw, TriangleAlert, ArrowRight,
  Clock, MapPin, Phone, MessageSquare, UserPlus, Car, CircleCheck, X, Eye, Send, Plus, Download,
  Funnel, StickyNote, Siren, Calendar, CircleAlert, PenLine, Truck, ArrowUpRight, Headphones,
  Check, KeyRound, Monitor, Gift, FileText, MessageCircle, UserRound, RotateCcw, Navigation,
  Wifi, BatteryMedium, BadgeCheck, Star, History, Wrench, ArrowUp, ArrowDown, CalendarCheck, Lock,
} from "lucide-react";

/*
  Mobilis Privé — Member Services admin console (multi-tenant, Jetour Mauritius demo)
  Rebuilt from the Mobilis.mp4 walkthrough.

  Reference geometry (recorded at a ~1430px viewport):
    sidebar 252px · topbar 64px · content padding 24px · card radius 12px
    stat tiles 6-up, 12px gutter · segmented tabs 36px pill · body 14px
  Self-contained: styles live in the <style> block below, prefixed `mp-`.
*/

/* ------------------------------------------------------------------ data */

const NAV = [
  { group: "Operations", items: [
    { id: "dashboard", label: "Operations dashboard", icon: LayoutGrid, path: "/" },
    { id: "queue", label: "Live agent queue", icon: Radio, path: "/queue", badge: 3 },
  ]},
  { group: "Members", items: [
    { id: "members", label: "Members & vehicles", icon: Users, path: "/members" },
    { id: "memberapp", label: "Member app preview", icon: Smartphone, path: "/member-app" },
  ]},
  { group: "Service", items: [
    { id: "workshop", label: "Workshop & outreach", icon: CalendarClock, path: "/workshop", badge: 3 },
  ]},
  { group: "Configure", items: [
    { id: "setup", label: "Tenant setup", icon: SlidersHorizontal, path: "/setup" },
    { id: "miniapps", label: "Mini-app catalogue", icon: Grid2x2, path: "/mini-apps" },
    { id: "content", label: "Content & engagement", icon: Megaphone, path: "/content" },
  ]},
  { group: "Insights", items: [
    { id: "analytics", label: "Analytics", icon: ChartColumn, path: "/analytics" },
  ]},
  { group: "Administration", items: [
    { id: "admin", label: "Administration", icon: ShieldCheck, path: "/administration" },
  ]},
];

const CASES = [
  { id: "JT-2481", urgency: "Emergency", status: "New", name: "Anjali Ramgoolam", service: "Emergency assistance",
    meta: "Jetour X70 Plus · 4821 ZK · Port Louis · Unassigned", wait: "4m 12s", waitTone: "muted", when: "Today, 09:41", action: "claim",
    body: "Vehicle stopped with smoke from the engine bay after a warning light. Two adults and one child on board, safe but stranded on the hard shoulder.",
    mobile: "+230 5 712 8890", vehicle: "Jetour X70 Plus · 4821 ZK", location: "M2 northbound, near Baie du Tombeau", mbr: "MBR-10428", initials: "AR", branch: "Port Louis" },
  { id: "JT-2479", urgency: "Urgent", status: "Open", name: "Kevin Ah-Chuen", service: "Roadside assist",
    meta: "Jetour Dashing · 7712 AB · Curepipe · Priya Naidoo", wait: "33m 04s", waitTone: "red", when: "Today, 09:12", action: "call",
    body: "Flat battery, member has a jump-start kit. Requests a technician within 45 minutes to avoid missing a meeting.",
    mobile: "+230 5 498 2277", vehicle: "Jetour Dashing · 7712 AB", location: "Royal Road, Curepipe", mbr: "MBR-10391", initials: "KA", branch: "Curepipe" },
  { id: "JT-2471", urgency: "Urgent", status: "Open", name: "Shalini Meetoo", service: "Tyre & battery",
    meta: "Jetour X70 · 1187 GH · Port Louis · Daniel Foo", wait: "1h 50m", waitTone: "red", when: "Today, 07:58", action: "call",
    body: "Two tyres damaged after a kerb strike. Member cannot drive and requests a mobile tyre partner.",
    mobile: "+230 5 663 4410", vehicle: "Jetour X70 · 1187 GH", location: "Caudan, Port Louis", mbr: "MBR-10377", initials: "SM", branch: "Port Louis" },
  { id: "JT-2477", urgency: "Standard", status: "Awaiting member", name: "Marie-Claire Léopold", service: "Service booking",
    meta: "Jetour X70 Plus · 3310 CD · Ébène · Daniel Foo", wait: "58m 02s", waitTone: "muted", when: "Today, 08:50", action: "call",
    body: "20,000 km service requested. Member offered three slots but has not confirmed yet, second follow-up due today.",
    mobile: "+230 5 744 6621", vehicle: "Jetour X70 Plus · 3310 CD", location: "Ébène", mbr: "MBR-10402", initials: "ML", branch: "Ébène" },
  { id: "JT-2475", urgency: "Standard", status: "Open", name: "Rakesh Bundhoo", service: "Vehicle pick-up",
    meta: "Jetour X70 Plus · 9054 EF · Quatre Bornes · Unassigned", wait: "1h 17m", waitTone: "muted", when: "Today, 08:31", action: "claim",
    body: "Requests a collection for bodywork assessment. Access is through a security gate, member will leave the key at reception.",
    mobile: "+230 5 901 3388", vehicle: "Jetour X70 Plus · 9054 EF", location: "St Jean Road, Quatre Bornes", mbr: "MBR-10455", initials: "RB", branch: "Quatre Bornes" },
  { id: "JT-2462", urgency: "Emergency", status: "Slot confirmed", name: "Tanya Appadoo", service: "Emergency assistance",
    meta: "Jetour X90 Plus · 6602 LM · Ébène · Priya Naidoo", wait: "—", waitTone: "muted", when: "Yesterday, 21:05", action: "call", closedRail: true,
    body: "Collision on the motorway, no injuries. Vehicle recovered to the Ébène workshop and an assessment booked for Monday.",
    mobile: "+230 5 210 4410", vehicle: "Jetour X90 Plus · 6602 LM", location: "Ébène", mbr: "MBR-10301", initials: "TA", branch: "Ébène" },
  { id: "JT-2468", urgency: "Standard", status: "Slot confirmed", name: "Olivier Sénèque", service: "Service booking",
    meta: "Jetour X70 Plus · 2244 JK · Curepipe · Daniel Foo", wait: "—", waitTone: "muted", when: "Yesterday, 16:20", action: "call",
    body: "10,000 km service confirmed for Friday 21 November at 09:00, Curepipe bay 3. Member notified by SMS and in-app.",
    mobile: "+230 5 832 7744", vehicle: "Jetour X70 Plus · 2244 JK", location: "Curepipe", mbr: "MBR-10466", initials: "OS", branch: "Curepipe" },
  { id: "JT-2459", urgency: "Standard", status: "Closed", name: "Devind Beeharry", service: "Renewal reminder",
    meta: "Jetour Dashing · 5533 NP · Quatre Bornes · Daniel Foo", wait: "—", waitTone: "muted", when: "Mon, 10:12", action: "call",
    body: "Insurance renewal supported over the phone. Member renewed directly with the insurer and the case was closed.",
    mobile: "+230 5 118 2290", vehicle: "Jetour Dashing · 5533 NP", location: "Quatre Bornes", mbr: "MBR-10288", initials: "DB", branch: "Quatre Bornes" },
];

const MEMBERS = [
  { initials: "AR", name: "Anjali Ramgoolam", reg: "4821 ZK", mobile: "+230 5 712 8890", status: "Activated", branch: "Port Louis", mbr: "MBR-10428", since: "12 Mar 2024", email: "anjali.ramgoolam@example.mu", dealer: "DLR-JT-00921", activation: "Mini-app activated", vehicle: "Jetour X70 Plus", year: 2024, vin: "LJXCM3FC7PT018842",
    history: [["Emergency assistance", "JT-2481 · Today", "New"], ["10,000 km service", "JT-2104 · 18 Jul 2025", "Completed"]] },
  { initials: "KA", name: "Kevin Ah-Chuen", reg: "7712 AB", mobile: "+230 5 498 2277", status: "Activated", branch: "Curepipe", mbr: "MBR-10391", since: "04 Jan 2024", email: "kevin.ahchuen@example.mu", dealer: "DLR-JT-00874", activation: "Mini-app activated", vehicle: "Jetour Dashing", year: 2023, vin: "LJXCM2DA1NT004417",
    history: [["Roadside assist", "JT-2479 · Today", "Open"]] },
  { initials: "ML", name: "Marie-Claire Léopold", reg: "3310 CD", mobile: "+230 5 744 6621", status: "Activated", branch: "Ébène", mbr: "MBR-10402", since: "21 Feb 2024", email: "mc.leopold@example.mu", dealer: "DLR-JT-00902", activation: "Mini-app activated", vehicle: "Jetour X70 Plus", year: 2024, vin: "LJXCM3FC5PT016613",
    history: [["Service booking", "JT-2477 · Today", "Awaiting member"]] },
  { initials: "RB", name: "Rakesh Bundhoo", reg: "9054 EF", mobile: "+230 5 901 3388", status: "Invited", branch: "Quatre Bornes", mbr: "MBR-10455", since: "02 Oct 2025", email: "rakesh.bundhoo@example.mu", dealer: "DLR-JT-01127", activation: "Awaiting member registration", vehicle: "Jetour X70 Plus", year: 2025, vin: "LJXCM3FC0RT022871",
    history: [["Vehicle pick-up", "JT-2475 · Today", "Open"]] },
  { initials: "SM", name: "Shalini Meetoo", reg: "1187 GH", mobile: "+230 5 663 4410", status: "Activated", branch: "Port Louis", mbr: "MBR-10377", since: "15 Nov 2023", email: "shalini.meetoo@example.mu", dealer: "DLR-JT-00811", activation: "Mini-app activated", vehicle: "Jetour X70", year: 2023, vin: "LJXCM1BB2NT001195",
    history: [["Tyre & battery", "JT-2471 · Today", "Open"]] },
  { initials: "OS", name: "Olivier Sénèque", reg: "2244 JK", mobile: "+230 5 832 7744", status: "Pending", branch: "Curepipe", mbr: "MBR-10466", since: "28 Oct 2025", email: "olivier.seneque@example.mu", dealer: "DLR-JT-01140", activation: "Invitation sent", vehicle: "Jetour X70 Plus", year: 2025, vin: "LJXCM3FC3RT023310",
    history: [["Service booking", "JT-2468 · Yesterday", "Slot confirmed"]] },
];

const TONE = {
  New: "slate", Open: "amber", "Slot confirmed": "green", Closed: "slate", "Awaiting member": "amber", Completed: "green",
  Activated: "green", Invited: "amber", Pending: "amber", Live: "green", Scheduled: "amber", Draft: "slate", Active: "green",
  Healthy: "green", Degraded: "amber", Failed: "red", "Rolling out": "amber", "In review": "slate", Internal: "slate",
};

/* ---------------------------------------------------------------- styles */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
.mp{--bg:#f7f7f3;--card:#fff;--line:#e4e4de;--line2:#eeeee9;--ink:#141714;--ink2:#4d524e;--mute:#7a807b;--pri:#1f4d43;--pri2:#2c6a5b;--prisoft:#e9f0ed;
--red:#c8262c;--redsoft:#fdecec;--redline:#f2c9c9;--amber:#b7791f;--ambersoft:#fff8e3;--amberline:#f0dc9c;--green:#2f8a53;--greensoft:#eaf6ee;--greenline:#bfe3cb;
font-family:Geist,Inter,system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);font-size:14px;line-height:1.45;display:flex;min-height:100vh;
background-color:var(--bg);background-image:radial-gradient(#e7e7e1 1px,transparent 1px);background-size:18px 18px;-webkit-font-smoothing:antialiased}
.mp *{box-sizing:border-box}.mp button{font:inherit;color:inherit;cursor:pointer}.mp select,.mp input{font:inherit;color:inherit}
.mp-side{width:252px;flex:none;background:#fbfbf8;border-right:1px solid var(--line);display:flex;flex-direction:column;position:sticky;top:0;height:100vh}
.mp-brand{height:64px;display:flex;align-items:center;gap:10px;padding:0 16px;border-bottom:1px solid var(--line)}
.mp-logo{width:32px;height:32px;border-radius:7px;background:var(--pri);color:#fff;display:grid;place-items:center;font-weight:600;font-size:13px}
.mp-brand b{display:block;font-size:14px;font-weight:600;line-height:1.1}.mp-brand small{font-size:10.5px;letter-spacing:.09em;color:var(--mute)}
.mp-nav{flex:1;overflow:auto;padding:14px 12px}.mp-nav h6{margin:8px 8px 6px;font-size:10.5px;letter-spacing:.11em;color:var(--mute);font-weight:500;text-transform:uppercase}
.mp-nav h6+.mp-ni{}.mp-grp{margin-bottom:12px}
.mp-ni{display:flex;align-items:center;gap:10px;width:100%;height:33px;border:0;background:none;border-radius:7px;padding:0 9px;font-size:13.5px;color:var(--ink2);text-align:left;margin-bottom:3px}
.mp-ni:hover{background:#f0f0eb}.mp-ni.on{background:#ecefea;color:var(--ink);font-weight:500}.mp-ni svg{color:var(--mute)}
.mp-badge{margin-left:auto;min-width:18px;height:18px;border-radius:9px;background:var(--red);color:#fff;font-size:10.5px;font-weight:600;display:grid;place-items:center}
.mp-demo{margin:12px;padding:10px 11px;border:1px solid var(--line);border-radius:8px;background:#f4f4ef}.mp-demo b{font-size:11.5px;font-weight:500;display:flex;align-items:center;gap:6px}
.mp-demo b:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--ink)}.mp-demo p{margin:3px 0 0;font-size:10.5px;color:var(--mute);line-height:1.4}
.mp-main{flex:1;min-width:0;display:flex;flex-direction:column}
.mp-top{height:64px;display:flex;align-items:center;gap:12px;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(251,251,248,.92);position:sticky;top:0;z-index:20;backdrop-filter:blur(6px)}
.mp-tenant{display:flex;align-items:center;gap:9px;height:36px;padding:0 10px;border:1px solid var(--line);border-radius:8px;background:#fff;min-width:230px}
.mp-tenant .jt{width:20px;height:20px;border-radius:4px;background:#eceee9;font-size:9px;font-weight:600;display:grid;place-items:center}
.mp-tenant b{display:block;font-size:12.5px;font-weight:600;line-height:1.1}.mp-tenant small{font-size:9.5px;letter-spacing:.07em;color:var(--mute)}
.mp-search{flex:0 1 420px;display:flex;align-items:center;gap:9px;height:36px;padding:0 10px;border:1px solid var(--line);border-radius:8px;background:#fff;color:var(--mute);font-size:13px}
.mp-search input{border:0;outline:0;flex:1;background:none;min-width:0}.mp-kbd{font-size:10px;padding:2px 5px;border-radius:4px;background:#efefea;color:var(--mute)}
.mp-iconbtn{width:36px;height:36px;border:1px solid var(--line);border-radius:8px;background:#fff;display:grid;place-items:center;position:relative}
.mp-iconbtn .dot{position:absolute;top:7px;right:8px;width:7px;height:7px;border-radius:50%;background:var(--red);border:1.5px solid #fff}
.mp-role{font-size:10.5px;letter-spacing:.1em;color:var(--mute);font-weight:500;padding-left:10px;border-left:1px solid var(--line);height:28px;display:flex;align-items:center}
.mp-sel{height:36px;border:1px solid var(--line);border-radius:8px;background:#fff;padding:0 10px;font-size:13px;outline:0}
.mp-me{display:flex;align-items:center;gap:8px}.mp-av{width:30px;height:30px;border-radius:50%;background:var(--pri);color:#fff;font-size:11px;font-weight:600;display:grid;place-items:center;flex:none}
.mp-me b{display:block;font-size:12.5px;font-weight:600;line-height:1.15}.mp-me small{font-size:10.5px;color:var(--mute)}
.mp-page{padding:24px 24px 40px;max-width:1180px;width:100%}
.mp-crumb{font-size:11.5px;color:var(--ink2);margin-bottom:4px}.mp-crumb span{margin:0 6px;color:var(--mute)}
.mp-h1{font-size:22px;font-weight:600;letter-spacing:-.01em;margin:0 0 22px}
.mp-sub{display:flex;align-items:center;justify-content:space-between;color:var(--ink2);font-size:12.5px;margin:-4px 0 16px}
.mp-card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:20px}
.mp-card h3{margin:0;font-size:16.5px;font-weight:600;letter-spacing:-.005em}.mp-card .desc{margin:6px 0 0;color:var(--ink2);font-size:12.5px}
.mp-btn{height:32px;padding:0 12px;border:1px solid var(--line);border-radius:7px;background:#fff;font-size:12.5px;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
.mp-btn:hover{background:#f6f6f2}.mp-btn.pri{background:var(--pri);border-color:var(--pri);color:#fff}.mp-btn.pri:hover{background:var(--pri2)}
.mp-btn.ghost{border-color:transparent;background:none}.mp-btn.sm{height:27px;padding:0 9px;font-size:11.5px}.mp-btn.soft{background:#eef0ec;border-color:#d7dbd5}
.mp-btn.dis{background:#8fb0a6;border-color:#8fb0a6;color:#fff;pointer-events:none}
.mp-pill{display:inline-flex;align-items:center;gap:5px;height:20px;padding:0 8px;border-radius:10px;font-size:11px;border:1px solid var(--line);background:#f5f5f1;color:var(--ink2);white-space:nowrap}
.mp-pill.dot:before{content:"";width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.7}
.mp-pill.green{background:var(--greensoft);border-color:var(--greenline);color:var(--green)}.mp-pill.amber{background:var(--ambersoft);border-color:var(--amberline);color:#9a6512}
.mp-pill.red{background:var(--redsoft);border-color:var(--redline);color:var(--red)}.mp-pill.slate{background:#f1f2f4;border-color:#d9dce1;color:#4d5562}
.mp-pill.solid{background:var(--red);border-color:var(--red);color:#fff;font-weight:600;height:21px}
.mp-alert{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--amberline);background:var(--ambersoft);border-radius:12px;padding:16px 18px;margin-bottom:20px}
.mp-alert b{display:block;font-size:13px;font-weight:600}.mp-alert p{margin:2px 0 0;font-size:12.5px;color:var(--ink2)}.mp-alert>svg{color:#b45309;margin-top:2px;flex:none}
.mp-alert .mp-btn{margin-left:auto;align-self:center}
.mp-stats{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:20px}
.mp-stat{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;display:flex;flex-direction:column;min-height:188px}
.mp-stat.red{background:#fdf6f5;border-color:var(--redline)}.mp-stat.amber{background:var(--ambersoft);border-color:var(--amberline)}
.mp-stat .lbl{display:flex;justify-content:space-between;gap:6px;font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:var(--ink2);line-height:1.6}
.mp-stat .val{font-size:28px;font-weight:600;letter-spacing:-.01em;margin:8px 0 6px;line-height:1.1}.mp-stat.red .val{color:var(--red)}
.mp-stat .note{font-size:12.5px;color:var(--ink2)}.mp-stat .lnk{margin-top:auto;padding-top:10px;font-size:12.5px;font-weight:500;background:none;border:0;padding-left:0;text-align:left}
.mp-delta{align-self:flex-start;font-size:10.5px;letter-spacing:0;text-transform:none;padding:2px 7px;border-radius:12px;border:1px solid var(--greenline);background:var(--greensoft);color:var(--green);line-height:1.35;text-align:center}
.mp-delta.red{border-color:var(--redline);background:var(--redsoft);color:var(--red)}
.mp-row{display:flex;align-items:center;gap:8px}.mp-sp{flex:1}.mp-mute{color:var(--mute)}.mp-small{font-size:12px}
.mp-seg{display:inline-flex;gap:2px;padding:4px;background:#f1f1ec;border:1px solid var(--line);border-radius:22px}
.mp-seg button{height:30px;border:0;background:none;border-radius:16px;padding:0 13px;font-size:12.5px;color:var(--ink2);white-space:nowrap}
.mp-seg button.on{background:#fff;color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}.mp-seg button i{font-style:normal;color:var(--mute);margin-left:6px}
.mp-tabsbar{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:16px}
.mp-grid2{display:grid;grid-template-columns:1.85fr 1fr;gap:16px}.mp-grid2e{display:grid;grid-template-columns:1fr 1fr;gap:16px}.mp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.mp-rec{border:1px solid var(--line);border-radius:10px;padding:14px}.mp-steps{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--mute);margin:12px 0 10px}
.mp-steps .st{display:flex;align-items:center;gap:5px;white-space:nowrap}.mp-steps .st.on{color:var(--ink);font-weight:500}.mp-steps .ln{flex:1;height:1px;background:var(--line);min-width:10px}
.mp-steps .c{width:9px;height:9px;border-radius:50%;border:1.5px solid #c3c6c2}.mp-steps .st.done .c{background:var(--pri);border-color:var(--pri)}.mp-steps .st.on .c{border:2px solid var(--pri);width:10px;height:10px}
.mp-li{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--line2)}.mp-li:last-child{border-bottom:0}
.mp-qcard{background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:10px;cursor:pointer;position:relative}
.mp-qcard.sel{background:#eef2ee;border-color:#b8c9bf}.mp-qcard.em{border-left:3px solid var(--red)}
.mp-qcard .t{font-size:14px;margin:6px 0 2px}.mp-qcard .t b{font-weight:600}.mp-qcard .t span{color:var(--ink2)}.mp-qcard .m{font-size:11.5px;color:var(--mute)}
.mp-qcard p{margin:8px 0 8px;font-size:12.5px;color:var(--ink2)}
.mp-kv{display:flex;justify-content:space-between;padding:7px 0;font-size:13px}.mp-kv span:first-child{color:var(--ink2)}
.mp-cap{font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--mute);font-weight:500}
.mp-quote{border:1px solid var(--line);background:#fafaf7;border-radius:8px;padding:10px 12px;font-size:12px;color:var(--ink2)}
.mp-tl{position:relative;padding-left:18px;margin:10px 0}.mp-tl:before{content:"";position:absolute;left:3px;top:6px;bottom:6px;width:1px;background:var(--line)}
.mp-tl .e{position:relative;margin-bottom:12px;font-size:12.5px}.mp-tl .e:before{content:"";position:absolute;left:-18px;top:5px;width:7px;height:7px;border-radius:50%;background:#d9dcd8}
.mp-tl .e.on:before{background:var(--pri)}.mp-tl .e small{display:block;color:var(--mute);font-size:11px}
.mp-tbl{width:100%;border-collapse:collapse;font-size:13px}.mp-tbl th{text-align:left;font-size:10.5px;letter-spacing:.09em;color:var(--ink2);font-weight:500;padding:10px 0;border-bottom:1px solid var(--line)}
.mp-tbl td{padding:12px 8px 12px 0;border-bottom:1px solid var(--line2)}.mp-tbl tr:last-child td{border-bottom:0}
.mp-reg{font-size:10.5px;border:1px solid var(--line);background:#f2f2ee;border-radius:4px;padding:1px 4px;margin-left:6px;color:var(--ink2)}
.mp-bar{height:5px;border-radius:3px;background:#e4e5e1;overflow:hidden;margin-top:5px}.mp-bar i{display:block;height:100%;background:var(--pri);border-radius:3px}
.mp-field{margin-bottom:14px}.mp-field label{display:block;font-size:12.5px;font-weight:500;margin-bottom:6px}.mp-field small{display:block;font-size:11px;color:var(--mute);margin-top:5px}
.mp-input{width:100%;height:36px;border:1px solid var(--line);border-radius:7px;padding:0 11px;background:#fff;font-size:13px;outline:0}.mp-input:focus{border-color:#9db5ab}
.mp-tog{width:34px;height:19px;border-radius:10px;background:#e1e3df;border:0;position:relative;flex:none;padding:0}.mp-tog:after{content:"";position:absolute;left:2px;top:2px;width:15px;height:15px;border-radius:50%;background:#fff;transition:left .15s;box-shadow:0 1px 2px rgba(0,0,0,.2)}
.mp-tog.on{background:var(--pri)}.mp-tog.on:after{left:17px}
.mp-toasts{position:fixed;right:20px;bottom:20px;display:flex;flex-direction:column;gap:10px;z-index:100}
.mp-toast{width:340px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px 14px;display:flex;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,.08);font-size:12.5px}
.mp-toast>svg:first-child{color:var(--green);flex:none;margin-top:1px}.mp-toast b{display:block;font-weight:500;font-size:13px}.mp-toast p{margin:1px 0 0;color:var(--ink2);font-size:11.5px}
.mp-toast button{margin-left:auto;border:0;background:none;color:var(--mute);align-self:flex-start;padding:0}
.mp-pop{position:absolute;top:52px;right:0;width:330px;background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,.1);z-index:30;overflow:hidden}
.mp-pop .hd{display:flex;justify-content:space-between;padding:10px 12px;font-size:10.5px;letter-spacing:.1em;color:var(--ink2);border-bottom:1px solid var(--line)}
.mp-pop .it{padding:12px;border-bottom:1px solid var(--line2);font-size:13px}.mp-pop .it p{margin:4px 0 0;font-size:11.5px;color:var(--mute)}
.mp-phone{width:392px;margin:24px auto;border:9px solid #2b2b2b;border-radius:42px;background:#fff;overflow:hidden}
.mp-phone .sb{display:flex;justify-content:space-between;padding:10px 20px 4px;font-size:11px;font-weight:600}
.mp-phone .hd{display:flex;align-items:center;gap:9px;padding:6px 14px 10px;border-bottom:1px solid var(--line)}
.mp-phone .bd{padding:14px;background:#fafaf7;height:560px;overflow:auto}.mp-mc{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:12px}
.mp-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.mp-mini>div{border:1px solid var(--line);border-radius:7px;background:#fff;padding:8px 10px}
.mp-mini small{display:block;font-size:9.5px;letter-spacing:.08em;color:var(--mute)}.mp-mini b{font-size:17px;font-weight:600}
.mp-sq{width:34px;height:34px;border:1px solid var(--line);border-radius:7px;display:grid;place-items:center;background:#fafaf7;flex:none}
.mp-ov{position:fixed;inset:0;background:rgba(40,42,40,.42);z-index:90;display:flex;align-items:flex-start;justify-content:center;padding-top:62px}
.mp-modal{width:575px;max-width:calc(100vw - 32px);background:#fff;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.18);overflow:hidden}
.mp-modal .mh{padding:20px 20px 18px;border-bottom:1px solid var(--line);position:relative}.mp-modal .mh h4{margin:0;font-size:15px;font-weight:600}
.mp-modal .mh p{margin:5px 0 0;font-size:12.5px;color:var(--ink2)}.mp-modal .mh button{position:absolute;right:16px;top:18px;border:0;background:none;color:var(--ink2);padding:4px}
.mp-modal .mb{padding:16px 20px}.mp-modal .mf{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px;border-top:1px solid var(--line)}
.mp-modal .mf .mp-btn{height:32px;padding:0 12px;font-size:13px}.mp-modal .mp-btn.pri:disabled{background:#9db3ab;border-color:#9db3ab;cursor:default}
.mp-buyer{display:block;width:100%;text-align:left;border:1px solid var(--line);border-radius:8px;background:#fff;padding:12px 10px 10px;margin-bottom:8px}
.mp-buyer:hover{background:#fafaf7}.mp-buyer.on{border-color:#7fa597;background:#f3f7f4;box-shadow:0 0 0 1px #7fa597}
.mp-buyer .n{display:flex;justify-content:space-between;font-size:13px}.mp-buyer .n span{font-size:11px;color:var(--ink2)}.mp-buyer .d{font-size:11.5px;color:var(--ink2);margin-top:1px}.mp-buyer .r{font-size:11px;color:var(--ink2);margin-top:8px}
.mp-chk{width:16px;height:16px;border-radius:3px;border:1.5px solid #b9bdb8;background:#fff;display:grid;place-items:center;flex:none;padding:0;margin-top:2px}.mp-chk.on{background:var(--pri);border-color:var(--pri);color:#fff}
@keyframes mp-spin{to{transform:rotate(360deg)}}
.mp-img{width:166px;height:102px;border-radius:6px;flex:none;background-size:cover;background-position:center}
@media (max-width:1100px){.mp-stats{grid-template-columns:repeat(3,1fr)}.mp-grid2,.mp-grid3,.mp-grid2e{grid-template-columns:1fr}}
@media (max-width:760px){.mp-side{display:none}.mp-top .mp-tenant,.mp-top .mp-role,.mp-top .mp-sel,.mp-me div{display:none}.mp-stats{grid-template-columns:1fr 1fr}}
`;

/* ------------------------------------------------------------ primitives */

const Pill = ({ children, tone, dot = true, solid, icon: I }) => (
  <span className={`mp-pill ${tone || TONE[children] || ""} ${dot && !solid && !I ? "dot" : ""} ${solid ? "solid" : ""}`}>
    {I && <I size={11} />}{children}
  </span>
);
const Urgency = ({ u }) =>
  u === "Emergency" ? <Pill solid icon={TriangleAlert}>Emergency</Pill> : u === "Urgent" ? <Pill tone="amber">Urgent</Pill> : <Pill tone="slate">Standard</Pill>;
const Seg = ({ items, value, onChange }) => (
  <div className="mp-seg">
    {items.map(([k, label, n]) => (
      <button key={k} className={value === k ? "on" : ""} onClick={() => onChange(k)}>
        {label}{n != null && <i>{n}</i>}
      </button>
    ))}
  </div>
);
const Head = ({ crumb, title }) => (
  <>
    <div className="mp-crumb">Workspace<span>/</span>{crumb || title}</div>
    <h1 className="mp-h1">{title}</h1>
  </>
);
const Alert = ({ title, children, action = "Retry sync", onAction }) => (
  <div className="mp-alert">
    <TriangleAlert size={17} />
    <div><b>{title}</b><p>{children}</p></div>
    {action && <button className="mp-btn" onClick={onAction}><RefreshCw size={14} />{action}</button>}
  </div>
);
const Toggle = ({ on, onClick }) => <button className={`mp-tog ${on ? "on" : ""}`} onClick={onClick} aria-pressed={on} />;
const Bar = ({ pct, tone }) => <div className="mp-bar"><i style={{ width: `${pct}%`, background: tone }} /></div>;

/* ------------------------------------------------------------ dashboard */

function Dashboard({ go, toast }) {
  const Steps = ({ at }) => {
    const s = ["En route", "Arriving", "Towing", "Handover"];
    return (
      <div className="mp-steps">
        {s.map((x, i) => (
          <React.Fragment key={x}>
            <span className={`st ${i < at ? "done" : ""} ${i === at ? "on" : ""}`}><span className="c" />{x}</span>
            {i < 3 && <span className="ln" />}
          </React.Fragment>
        ))}
      </div>
    );
  };
  const stats = [
    { l: "New requests", v: "14", n: "Since midnight · 3 emergencies", a: "Open queue →", d: "+6 vs yesterday", to: "queue" },
    { l: "Open requests", v: "28", n: "Being worked across 4 branches", a: "Drill down →", to: "queue" },
    { l: "Overdue cases", v: "2", n: "Past the first-response target", a: "Escalate →", d: "+1 today", dt: "red", t: "red", to: "queue" },
    { l: "Median first response", v: "2m 41s", n: "Target 3m 00s · 7 day median", d: "−18s" },
    { l: "Upcoming services", v: "18", n: "Next 7 days · confirmed bookings", a: "View calendar →", to: "workshop" },
    { l: "Integration alerts", v: "2", n: "1 failed · 1 degraded", a: "Review health →", t: "red", to: "admin" },
  ];
  const bars = [[60, 52], [52, 58], [86, 70], [74, 80], [118, 96], [24, 30], [0, 0]];
  return (
    <>
      <Head title="Operations dashboard" />
      <div className="mp-sub">
        <span>All branches · Live queue is updating · Last sync 40 seconds ago</span>
        <span className="mp-row"><Pill tone="green">Live</Pill><button className="mp-btn" onClick={() => toast("Dashboard refreshed", "Queue metrics are current as of just now.")}><RefreshCw size={14} />Refresh</button></span>
      </div>
      <Alert title="Integration alert · notification service" onAction={() => toast("Reconnected to the notification service", "Paused reminders have been queued for delivery.")}>
        Push credentials expired for Jetour Mauritius. Automated reminders are paused and 12 members were not notified this morning.
      </Alert>
      <div className="mp-stats">
        {stats.map((s) => (
          <div key={s.l} className={`mp-stat ${s.t || ""}`}>
            <div className="lbl"><span>{s.l}</span>{s.d && <span className={`mp-delta ${s.dt || ""}`}>{s.d}</span>}</div>
            <div className="val">{s.v}</div>
            <div className="note">{s.n}</div>
            {s.a && <button className="lnk" onClick={() => go(s.to)}>{s.a}</button>}
          </div>
        ))}
      </div>

      <div className="mp-card" style={{ marginBottom: 20 }}>
        <div className="mp-row">
          <div><h3>Live recoveries</h3><p className="desc">2 stranded members on the network · 0 handovers awaiting a member signature.</p></div>
          <span className="mp-sp" />
          <button className="mp-btn" onClick={() => go("workshop")}>Port Louis arrivals board</button>
          <button className="mp-btn" onClick={() => go("queue")}>Open live queue <ArrowRight size={14} /></button>
        </div>
        <div className="mp-grid2e" style={{ marginTop: 16, gridTemplateColumns: "1fr 1fr 1fr" }}>
          {[
            ["Anjali Ramgoolam", "Jetour X70 Plus · 4821 ZK · Port Louis", "Driver en route", 0, "M2 northbound, near Baie du Tombeau", "ETA 12 min", true],
            ["Sébastien Ah-Koon", "Jetour X90 Plus · 5126 VD · Port Louis", "Towing to Port Louis", 2, "M1 southbound, near Pailles", "ETA 18 min", false],
          ].map(([n, v, s, at, loc, eta, live]) => (
            <div key={n} className="mp-rec">
              <div className="mp-row"><b style={{ fontWeight: 600 }}>{n}</b>{live && <Pill tone="green">Live</Pill>}<span className="mp-sp" /><Pill tone="slate">{s}</Pill></div>
              <div className="mp-small mp-mute" style={{ marginTop: 3 }}>{v}</div>
              <Steps at={at} />
              <div className="mp-row mp-small" style={{ color: "var(--ink2)", paddingBottom: 10, borderBottom: "1px solid var(--line2)" }}><MapPin size={13} />{loc}</div>
              <div className="mp-row mp-small" style={{ marginTop: 10, color: "var(--ink2)" }}>
                <Clock size={13} />{eta}<span className="mp-mute">Sign-off at handover</span><span className="mp-sp" />
              </div>
              <div className="mp-row" style={{ justifyContent: "flex-end", marginTop: 8 }}>
                <button className="mp-btn sm" onClick={() => go("queue")}>Open case</button>
                {live && <><button className="mp-btn sm soft" onClick={() => go("memberapp")}>Member screen</button><button className="mp-btn sm" onClick={() => go("memberapp")}>My vehicle</button></>}
              </div>
            </div>
          ))}
        </div>
        <div className="mp-row mp-small" style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line2)", color: "var(--ink2)" }}>
          Cases close only after the Port Louis handover is signed by the member.<span className="mp-sp" /><PenLine size={13} />Live handover not signed yet
        </div>
      </div>

      <div className="mp-grid2" style={{ marginBottom: 20 }}>
        <div className="mp-card">
          <div className="mp-row"><div><h3>Needs attention now</h3><p className="desc">Emergencies first, then the oldest waiting cases. 1 emergency and 2 overdue cases are live.</p></div><span className="mp-sp" /><button className="mp-btn" onClick={() => go("queue")}>Open live queue <ArrowRight size={14} /></button></div>
          <div style={{ marginTop: 12 }}>
            {CASES.slice(0, 3).map((c) => (
              <div key={c.id} className="mp-li" style={{ cursor: "pointer" }} onClick={() => go("queue")}>
                <span style={{ width: 86 }}><Urgency u={c.urgency} /></span>
                <div style={{ flex: 1 }}><div>{c.id} · {c.name}</div><div className="mp-small mp-mute">{c.service} · {c.meta.split(" · ")[1]} · {c.branch}</div></div>
                <span className="mp-row mp-small" style={{ color: c.waitTone === "red" ? "var(--red)" : "var(--ink2)", fontWeight: c.waitTone === "red" ? 600 : 400 }}><Clock size={13} />{c.wait}</span>
                <Pill>{c.status}</Pill>
              </div>
            ))}
          </div>
        </div>
        <div className="mp-card">
          <h3>Upcoming confirmed services</h3><p className="desc">Next confirmed bookings across all branches.</p>
          <div style={{ marginTop: 14 }}>
            {[["Olivier Sénèque", "09:00 · 10,000 km service · 2244 JK", "Fri 21 Nov"], ["Tanya Appadoo", "10:00 · Collision assessment · 6602 LM", "Mon 24 Nov"], ["Priyanka Hurree", "08:30 · Annual inspection · 4471 QR", "Wed 19 Nov"], ["Yannick Perrine", "11:00 · Brake pads · 3390 WX", "Thu 20 Nov"]].map(([n, d, t]) => (
              <div key={n} className="mp-rec" style={{ padding: "11px 12px", marginBottom: 10 }}>
                <div className="mp-row"><b style={{ fontWeight: 500 }}>{n}</b><span className="mp-sp" /><span className="mp-pill" style={{ borderRadius: 4 }}>{t}</span></div>
                <div className="mp-small mp-mute">{d}</div>
              </div>
            ))}
            <button className="mp-btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("workshop")}>Open workshop calendar</button>
          </div>
        </div>
      </div>

      <div className="mp-grid2">
        <div className="mp-card">
          <h3>Queue activity</h3><p className="desc">Cases created and resolved over the last 7 days.</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150, marginTop: 20, borderBottom: "1px solid var(--line)" }}>
            {bars.map(([a, b], i) => (
              <div key={i} style={{ flex: 1, display: "flex", gap: 4, alignItems: "flex-end" }}>
                <div style={{ flex: 1, height: a, background: "#3f6b5e", borderRadius: "3px 3px 0 0" }} />
                <div style={{ flex: 1, height: b, background: "#dcdcd8", borderRadius: "3px 3px 0 0" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d} className="mp-small mp-mute" style={{ flex: 1, textAlign: "center" }}>{d}</span>)}</div>
          <div className="mp-row mp-small mp-mute" style={{ marginTop: 10 }}><i style={{ width: 8, height: 8, background: "#3f6b5e", borderRadius: 2 }} />Created<i style={{ width: 8, height: 8, background: "#dcdcd8", borderRadius: 2, marginLeft: 8 }} />Resolved<span className="mp-sp" />Peak day · Fri (118 created)</div>
        </div>
        <div className="mp-card">
          <h3>Agent load</h3><p className="desc">Open cases held per agent right now.</p>
          <div style={{ marginTop: 16 }}>
            {[["Priya Naidoo", 4, 100], ["Daniel Foo", 3, 75], ["Sandra Rivière", 0, 0], ["Unassigned", 3, 75, "var(--red)"]].map(([n, v, p, c]) => (
              <div key={n} className="mp-row" style={{ marginBottom: 13, fontSize: 13 }}>
                <span style={{ width: 110 }}>{n}</span><div className="mp-bar" style={{ flex: 1, marginTop: 0 }}><i style={{ width: `${p}%`, background: c }} /></div><span style={{ width: 24, textAlign: "right" }} className="mp-mute">{v}</span>
              </div>
            ))}
          </div>
          <p className="mp-small mp-mute" style={{ marginTop: 14 }}>Supervisors can reassign cases and set agent response targets in the queue.</p>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- queue */

function NoteModal({ caseId, onClose, onSave }) {
  const [text, setText] = useState("");
  const ref = React.useRef(null);
  useEffect(() => {
    ref.current?.focus();
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const ok = text.trim().length > 0;
  return (
    <div className="mp-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mp-modal" style={{ width: 510 }} role="dialog" aria-modal="true" aria-label="Add an internal note">
        <div className="mh" style={{ paddingRight: 48 }}>
          <h4>Add an internal note</h4>
          <p style={{ lineHeight: 1.6 }}>Notes are visible to staff on this tenant only and are not shown to the member.</p>
          <button onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="mb" style={{ paddingTop: 18 }}>
          <label htmlFor="mp-note" style={{ display: "block", fontSize: 12.5, fontWeight: 500, marginBottom: 8 }}>Note</label>
          <textarea id="mp-note" ref={ref} className="mp-input" maxLength={500} value={text} onChange={(e) => setText(e.target.value)}
            placeholder="What did the member say, and what happens next?" style={{ height: 102, padding: "10px 11px", resize: "vertical", lineHeight: 1.5, display: "block" }}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && ok) onSave(text.trim()); }} />
          <div className="mp-small mp-mute" style={{ textAlign: "right", marginTop: 6, fontSize: 11 }}>{text.length}/500</div>
        </div>
        <div className="mf">
          <button className="mp-btn ghost" onClick={onClose}>Cancel</button>
          <button className="mp-btn pri" disabled={!ok} onClick={() => onSave(text.trim())}>Save note</button>
        </div>
      </div>
    </div>
  );
}

function Queue({ toast, go }) {
  const [tab, setTab] = useState("active");
  const [sel, setSel] = useState("JT-2481");
  const [claimed, setClaimed] = useState({});
  const [f, setF] = useState({ service: "", status: "", assignee: "", branch: "" });
  const [noteFor, setNoteFor] = useState(null);
  const [notes, setNotes] = useState({});
  const saveNote = (text) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setNotes((n) => ({ ...n, [noteFor]: [...(n[noteFor] || []), { text, by: "Aisha Mohit", time }] }));
    toast("Note added", `${noteFor} · visible to staff only.`);
    setNoteFor(null);
  };
  const setFilter = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const statusOf = (q) => (claimed[q.id] && q.status === "New" ? "Open" : q.status);
  const assigneeOf = (q) => (claimed[q.id] ? "Aisha Mohit" : q.meta.split(" · ").pop());
  const base = CASES.filter((q) =>
    (!f.service || q.service === f.service) && (!f.status || statusOf(q) === f.status) &&
    (!f.assignee || assigneeOf(q) === f.assignee) && (!f.branch || q.branch === f.branch));
  const TABF = { active: () => true, em: (q) => q.urgency === "Emergency", over: (q) => q.waitTone === "red", new: (q) => statusOf(q) === "New" };
  const count = (k) => base.filter(TABF[k]).length;
  const list = base.filter(TABF[tab]);
  const liveEm = base.filter((q) => q.urgency === "Emergency" && statusOf(q) !== "Closed" && statusOf(q) !== "Slot confirmed").length;
  const c = list.find((x) => x.id === sel) || list[0];  const claim = (id) => { setClaimed((s) => ({ ...s, [id]: true })); toast("Case claimed", `${id} is now assigned to you.`); };
  return (
    <>
      <Head title="Live agent queue" />
      {noteFor && <NoteModal caseId={noteFor} onClose={() => setNoteFor(null)} onSave={saveNote} />}
      <div className="mp-sub"><span>Queue sorted by urgency, then elapsed wait time. {liveEm} {liveEm === 1 ? "emergency" : "emergencies"} live.</span>
        <span className="mp-row"><span className="mp-small mp-mute">Period</span><select className="mp-sel" style={{ width: 116 }}><option>Today</option><option>Last 7 days</option><option>Last 30 days</option></select></span></div>
      <Alert title="Dealer system sync degraded" onAction={() => toast("Sync retried", "Dealer system lookups are recovering.")}>
        Vehicle lookups may return stale data. Cases can still be worked; invitation lookups are read-only until the sync recovers.
      </Alert>
      <div className="mp-card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center", padding: 12, marginBottom: 16 }}>
        <Seg value={tab} onChange={setTab} items={[["active", "Active queue", count("active")], ["em", "Emergencies", count("em")], ["over", "Overdue", count("over")], ["new", "New", count("new") || null]]} />
        <div style={{ display: "grid", gap: 8 }}>
          <select className="mp-sel" style={{ width: 168 }} value={f.service} onChange={setFilter("service")}>
            <option value="">All services</option>{["Emergency assistance", "Roadside assist", "Service booking", "Tyre & battery", "Vehicle pick-up", "Renewal reminder"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select className="mp-sel" value={f.status} onChange={setFilter("status")}>
            <option value="">All statuses</option>{["New", "Open", "Awaiting member", "Slot confirmed", "Closed"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select className="mp-sel" value={f.assignee} onChange={setFilter("assignee")}>
            <option value="">All assignees</option>{["Unassigned", "Priya Naidoo", "Daniel Foo", ...(Object.keys(claimed).length ? ["Aisha Mohit"] : [])].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select className="mp-sel" value={f.branch} onChange={setFilter("branch")}>
            <option value="">All branches</option>{["Port Louis", "Curepipe", "Quatre Bornes", "Ébène"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <button className="mp-btn ghost" style={{ justifySelf: "start" }} onClick={() => { setF({ service: "", status: "", assignee: "", branch: "" }); setTab("active"); }}><Funnel size={14} />Clear</button>
        </div>
      </div>
      {!c && (
        <div className="mp-card" style={{ textAlign: "center", padding: 40 }}>
          <Funnel size={20} color="var(--mute)" />
          <h3 style={{ marginTop: 8 }}>No cases match these filters</h3>
          <p className="desc">Try a different status, assignee or branch.</p>
          <button className="mp-btn" style={{ marginTop: 12 }} onClick={() => { setF({ service: "", status: "", assignee: "", branch: "" }); setTab("active"); }}>Clear filters</button>
        </div>
      )}
      {c && (
      <div className="mp-grid2" style={{ gridTemplateColumns: "1.6fr 1fr", alignItems: "start" }}>
        <div>
          {list.map((q) => (
            <div key={q.id} className={`mp-qcard ${sel === q.id ? "sel" : ""} ${q.closedRail ? "em" : ""}`} onClick={() => setSel(q.id)}>
              <div className="mp-row"><Urgency u={q.urgency} /><span className="mp-small" style={{ color: "var(--ink2)" }}>{q.id}</span><Pill>{statusOf(q)}</Pill><span className="mp-sp" />
                <span className="mp-row mp-small" style={{ color: q.waitTone === "red" ? "var(--red)" : "var(--mute)", fontWeight: q.waitTone === "red" ? 600 : 400 }}><Clock size={13} />{q.wait}</span></div>
              <div className="t"><b>{q.name}</b> <span>· {q.service}</span></div>
              <div className="m">{claimed[q.id] ? q.meta.replace("Unassigned", "Aisha Mohit") : q.meta}</div>
              <p>{q.body}</p>
              <div className="mp-row">
                {q.action === "claim" && !claimed[q.id]
                  ? <button className="mp-btn sm soft" onClick={(e) => { e.stopPropagation(); claim(q.id); }}>Claim case</button>
                  : <button className="mp-btn sm" onClick={(e) => { e.stopPropagation(); toast("Calling the member", `${q.mobile} · The call is logged on the case timeline.`); }}><Phone size={13} />Call member</button>}
                <span className="mp-small mp-mute">{q.when}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mp-card" style={{ padding: 0, position: "sticky", top: 80 }}>
          <div style={{ padding: 16 }}>
            <div className="mp-row"><Urgency u={c.urgency} /><Pill>{statusOf(c)}</Pill><span className="mp-sp" /><span className="mp-small mp-mute">{c.when}</span></div>
            <h3 style={{ marginTop: 12, fontSize: 16.5 }}>{c.service}</h3>
            <div className="mp-small mp-mute">{c.id} · {c.branch} · Waiting {c.wait}</div>
            <div className="mp-quote" style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6 }}>{c.body}</div>
            <button className="mp-btn ghost" style={{ paddingLeft: 0, marginTop: 8 }} onClick={() => go("memberapp")}><Smartphone size={14} />Preview the member's screen</button>
          </div>
          <div style={{ padding: 16, borderTop: "1px solid var(--line2)" }}>
            <div className="mp-row"><span className="mp-av" style={{ background: "#eceee9", color: "var(--ink2)", width: 32, height: 32 }}>{c.initials}</span>
              <div><div className="mp-cap">Member</div><div>{c.name} <span className="mp-mute">· {c.mbr}</span></div></div></div>
            <div className="mp-grid2e" style={{ marginTop: 12, gap: 8 }}>
              <div><div className="mp-cap">Vehicle</div><div style={{ fontSize: 13 }}>{c.vehicle}</div></div>
              <div><div className="mp-cap">Mobile</div><div style={{ fontSize: 13 }}>{c.mobile}</div></div>
            </div>
            <div className="mp-cap" style={{ marginTop: 12 }}>Location</div><div className="mp-row" style={{ fontSize: 13 }}><MapPin size={13} />{c.location}</div>
            <div className="mp-cap" style={{ marginTop: 12 }}>Assigned to</div>
            <div style={{ fontSize: 13, color: c.meta.includes("Unassigned") && !claimed[c.id] ? "var(--red)" : "var(--ink)" }}>{claimed[c.id] ? "Aisha Mohit" : c.meta.split(" · ").pop()}</div>
          </div>
          <div style={{ padding: 16, borderTop: "1px solid var(--line2)" }}>
            <div className="mp-row">
              {claimed[c.id] ? <button className="mp-btn dis"><Check size={14} />Claimed</button> : <button className="mp-btn pri" onClick={() => claim(c.id)}><UserPlus size={14} />Claim case</button>}
              <button className="mp-btn" onClick={() => setNoteFor(c.id)}><StickyNote size={14} />Add note</button>
            </div>
            <div className="mp-grid2e" style={{ marginTop: 12, gap: 8 }}>
              <div><div className="mp-cap" style={{ marginBottom: 5 }}>Reassign to</div><select className="mp-sel" style={{ width: "100%" }}><option>Keep current assignee</option><option>Priya Naidoo</option><option>Daniel Foo</option><option>Sandra Rivière</option></select></div>
              <div><div className="mp-cap" style={{ marginBottom: 5 }}>Member-facing status</div><select className="mp-sel" style={{ width: "100%" }} onChange={(e) => toast("Member status updated", `The member now sees "${e.target.value}".`)}><option>Update status…</option><option>Recovery dispatched</option><option>Technician arriving</option><option>Resolved</option></select></div>
            </div>
          </div>
          <div style={{ padding: 16, borderTop: "1px solid var(--line2)" }}>
            <div className="mp-cap mp-row"><History size={13} />Request timeline</div>
            <div className="mp-tl">
              <div className="e on">Request created from Emergency mini-app<small>09:41 · Member</small></div>
              <div className="e">Urgency classified as {c.urgency}<small>09:42 · Auto triage</small></div>
              <div className="e">Nearest partner recovery unit notified<small>09:43 · System</small></div>
            </div>
            <div className="mp-cap mp-row"><StickyNote size={13} />Internal notes</div>
            <div className="mp-quote" style={{ marginTop: 10, fontSize: 13, color: "var(--ink)" }}>Member confirmed nobody is injured. Advised to leave the vehicle and stand behind the barrier.<small style={{ display: "block", color: "var(--mute)", marginTop: 6, fontSize: 11 }}>System · 09:42</small></div>
            {(notes[c.id] || []).map((n, i) => (
              <div key={i} className="mp-quote" style={{ marginTop: 8, fontSize: 13, color: "var(--ink)", whiteSpace: "pre-wrap" }}>{n.text}<small style={{ display: "block", color: "var(--mute)", marginTop: 6, fontSize: 11 }}>{n.by} · {n.time}</small></div>
            ))}
          </div>
        </div>
      </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------- members */

const BUYERS = [
  { name: "Naven Kumar Gopaul", first: "Naven", vehicle: "Jetour X70 Plus · 2025", branch: "Port Louis", ref: "DLR-JT-01302", mobile: "+230 5 727 1140", consent: "Marketing opt-in at delivery" },
  { name: "Sonia Ramsamy", first: "Sonia", vehicle: "Jetour Dashing · 2025", branch: "Curepipe", ref: "DLR-JT-01303", mobile: "+230 5 480 9930", consent: "Opt-in pending" },
  { name: "Jean-Marc L'Espérance", first: "Jean-Marc", vehicle: "Jetour X90 Plus · 2024", branch: "Ébène", ref: "DLR-JT-01304", mobile: "+230 5 914 2287", consent: "Marketing opt-in at delivery" },
];

function InviteModal({ onClose, toast }) {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState(null);
  const [ok, setOk] = useState(false);
  const b = BUYERS[pick];
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const head = [
    ["Invite a buyer from the dealer system", "Find the buyer by name, mobile number or dealer reference."],
    ["Invite a buyer from the dealer system", "Review the buyer and confirm consent before sending the invitation."],
    ["Invitation sent", "The member receives an SMS with a link to activate the Jetour mini-app."],
  ][step];
  const send = () => { setStep(2); toast("Invitation SMS queued", `${b.name} · ${b.mobile}`); };
  return (
    <div className="mp-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mp-modal" role="dialog" aria-modal="true" aria-label={head[0]}>
        <div className="mh"><h4>{head[0]}</h4><p>{head[1]}</p><button onClick={onClose} aria-label="Close"><X size={16} /></button></div>

        {step === 0 && (
          <div className="mb">
            {BUYERS.map((x, i) => (
              <button key={x.ref} className={`mp-buyer ${pick === i ? "on" : ""}`} onClick={() => setPick(i)}>
                <div className="n">{x.name}<span>{x.consent}</span></div>
                <div className="d">{x.vehicle} · {x.branch}</div>
                <div className="r">{x.ref} · {x.mobile}</div>
              </button>
            ))}
            <p className="mp-small" style={{ color: "var(--ink2)", margin: "12px 0 0", fontSize: 11.5 }}>Results come from the dealer system. Only buyers with a delivered vehicle can be invited.</p>
          </div>
        )}

        {step === 1 && (
          <div className="mb">
            <div className="mp-rec" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, padding: "14px 12px" }}>
              {[["Buyer", b.name], ["Mobile", b.mobile], ["Vehicle", b.vehicle], ["Consent", b.consent]].map(([k, v]) => (
                <div key={k}><div className="mp-cap">{k}</div><div style={{ fontSize: 13 }}>{v}</div></div>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, margin: "16px 0 8px" }}>SMS preview</div>
            <div className="mp-quote" style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6, padding: "10px 12px" }}>
              Bonjour {b.first}, your Jetour Mauritius member space is ready. Activate it to book a service, request assistance and see your vehicle history: jetour.mu/activate
            </div>
            <div className="mp-small" style={{ color: "var(--ink2)", marginTop: 6, fontSize: 11.5 }}>Sent in English and French, using the tenant notification template.</div>
            <label className="mp-row" style={{ alignItems: "flex-start", marginTop: 12, fontSize: 12.5, color: "var(--ink2)", cursor: "pointer" }}>
              <button className={`mp-chk ${ok ? "on" : ""}`} onClick={() => setOk((v) => !v)} aria-pressed={ok}>{ok && <Check size={11} strokeWidth={3} />}</button>
              I confirm this buyer consented to be contacted about their vehicle and member space. The invitation is logged in the audit history.
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="mb">
            <div className="mp-rec mp-row" style={{ background: "#f1f6f3", borderColor: "#c4d8cd", fontSize: 13 }}><Send size={15} />Invitation queued to {b.mobile}. Delivery is tracked on the member record.</div>
            <p className="mp-small" style={{ color: "var(--ink2)", margin: "12px 0 0", lineHeight: 1.6 }}>If the member does not activate within 7 days, the outreach list will suggest a follow-up call. Invitations are limited to two per buyer per quarter.</p>
          </div>
        )}

        <div className="mf">
          {step === 0 && <><button className="mp-btn ghost" onClick={onClose}>Cancel</button><button className="mp-btn pri" disabled={pick == null} onClick={() => setStep(1)}>Review buyer</button></>}
          {step === 1 && <><button className="mp-btn ghost" onClick={() => { setStep(0); setOk(false); }}>Back</button><button className="mp-btn pri" disabled={!ok} onClick={send}><Send size={14} />Send SMS invitation</button></>}
          {step === 2 && <button className="mp-btn pri" onClick={onClose} style={{ padding: "0 16px" }}>Done</button>}
        </div>
      </div>
    </div>
  );
}

function Members({ toast }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [invite, setInvite] = useState(false);
  const list = MEMBERS.filter((m) => (m.name + m.reg + m.mobile + m.vin).toLowerCase().includes(q.toLowerCase()));
  const m = MEMBERS[sel];
  return (
    <>
      <Head title="Members & vehicles" />
      {invite && <InviteModal onClose={() => setInvite(false)} toast={toast} />}
      <Alert title="Dealer system is read-only" onAction={() => toast("Sync retried", "Buyer lookups are refreshing.")}>
        Buyer lookups are served from the last successful sync. Invitations can still be prepared, but delivery waits until the connection recovers.
      </Alert>
      <div className="mp-card mp-row" style={{ padding: 12, marginBottom: 16 }}>
        <div className="mp-search" style={{ flex: 1, maxWidth: "none" }}><Search size={15} /><input placeholder="Search by name, mobile number, registration or VIN" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span className="mp-small mp-mute">{list.length} members</span>
        <button className="mp-btn pri" style={{ height: 34 }} onClick={() => setInvite(true)}><UserPlus size={14} />Invite a buyer</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, alignItems: "start" }}>
        <div className="mp-card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="mp-cap" style={{ padding: "14px 12px 10px", borderBottom: "1px solid var(--line)", background: "#fafaf7" }}>Members</div>
          {list.map((x) => {
            const i = MEMBERS.indexOf(x);
            return (
              <div key={x.mbr} onClick={() => setSel(i)} style={{ display: "flex", gap: 12, padding: "12px", borderBottom: "1px solid var(--line2)", cursor: "pointer", background: sel === i ? "#f1f2ee" : "#fff" }}>
                <span className="mp-av" style={{ background: "#eceee9", color: "var(--ink2)" }}>{x.initials}</span>
                <div><div>{x.name}</div><div className="mp-small" style={{ color: "var(--ink2)" }}>{x.reg} · {x.mobile}</div>
                  <div className="mp-row" style={{ marginTop: 4 }}><Pill>{x.status}</Pill><span className="mp-small mp-mute">{x.branch}</span></div></div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="mp-card" style={{ marginBottom: 16 }}>
            <div className="mp-row" style={{ alignItems: "flex-start", gap: 14 }}>
              <span className="mp-av" style={{ width: 44, height: 44, background: "#eceee9", color: "var(--ink2)", fontSize: 13 }}>{m.initials}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 17 }}>{m.name}</h3>
                <div className="mp-small" style={{ color: "var(--ink2)", marginTop: 2 }}>{m.mbr} · Member since {m.since} · {m.branch}</div>
                <div className="mp-row" style={{ marginTop: 8 }}><Pill>{m.status}</Pill><span className="mp-pill"><BadgeCheck size={12} />Dealer ref {m.dealer}</span></div>
              </div>
              <button className="mp-btn" style={{ height: 32 }}>Call member</button>
              <button className="mp-btn pri" style={{ height: 32 }} onClick={() => toast("Invitation queued", `${m.name} · delivery waits for the dealer sync.`)}><UserPlus size={14} />Send invitation</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
              <div><div className="mp-cap">Mobile</div><div style={{ fontSize: 13 }}>{m.mobile}</div></div>
              <div><div className="mp-cap">Email</div><div style={{ fontSize: 13 }}>{m.email}</div></div>
              <div><div className="mp-cap">Activation</div><div style={{ fontSize: 13 }}>{m.activation}</div></div>
            </div>
          </div>
          <div className="mp-grid2e">
            <div className="mp-card">
              <h3>Linked vehicles</h3><p className="desc">Matched from the dealer system by VIN and registration.</p>
              <div className="mp-small mp-mute" style={{ margin: "16px 0 8px" }}>1 linked</div>
              <div className="mp-rec"><div className="mp-row"><Car size={15} />{m.vehicle}<span className="mp-sp" /><span className="mp-reg">{m.reg}</span></div><div className="mp-small mp-mute" style={{ marginTop: 6 }}>{m.year} · VIN {m.vin}</div></div>
              <div className="mp-quote mp-row" style={{ marginTop: 10, alignItems: "flex-start" }}><ShieldCheck size={13} style={{ flex: "none", marginTop: 2 }} />Private personal reminders are never shown to staff. Only vehicle service reminders are visible.</div>
            </div>
            <div className="mp-card">
              <h3>Request history</h3><p className="desc">Latest member requests across services.</p>
              <div style={{ marginTop: 16 }}>
                {m.history.map(([t, s, st]) => (
                  <div key={s} className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{t}</div><div className="mp-small mp-mute">{s}</div></div><Pill>{st}</Pill></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------------------------- member app */

const STAGES = ["Driver en route", "Driver arriving", "Towing to Port Louis", "Handover at Port Louis"];

function Phone_({ children, initials = "AR" }) {
  return (
    <div className="mp-phone">
      <div className="sb"><span>09:58</span><span className="mp-row" style={{ gap: 4 }}><Wifi size={12} /><BatteryMedium size={13} /></span></div>
      <div className="hd"><span className="mp-logo" style={{ width: 28, height: 28, fontSize: 11 }}>JT</span><div style={{ flex: 1 }}><b style={{ fontSize: 13, fontWeight: 600, display: "block", lineHeight: 1.1 }}>Jetour Mauritius</b><small style={{ fontSize: 9.5, letterSpacing: ".09em", color: "var(--mute)" }}>MEMBER SERVICES</small></div>
        <span className="mp-av" style={{ background: "#eceee9", color: "var(--ink2)", width: 28, height: 28, fontSize: 10 }}>{initials}</span></div>
      <div className="bd">{children}</div>
    </div>
  );
}

function MemberApp({ toast, go }) {
  const [tab, setTab] = useState("em");
  const [dev, setDev] = useState("m");
  const [stage, setStage] = useState(0);
  const emergency = (
    <>
      <div className="mp-mc" style={{ background: "#fdf3f2", borderColor: "var(--redline)" }}>
        <div className="mp-row"><Pill solid icon={TriangleAlert}>EMERGENCY ACTIVE</Pill><span className="mp-sp" /><span className="mp-small mp-mute">EM-2481</span></div>
        <div style={{ fontSize: 17, fontWeight: 600, marginTop: 10 }}>Help is on the way</div>
        <div className="mp-small" style={{ color: "var(--ink2)", marginTop: 3 }}>A senior agent is handling your request and will call you if anything changes.</div>
        <div className="mp-mini" style={{ gridTemplateColumns: "1fr 1fr" }}><div><small>ESTIMATED ARRIVAL</small><b>18 min</b></div><div><small>STATUS</small><div style={{ fontSize: 12.5, color: "var(--red)", fontWeight: 500 }}>Recovery dispatched</div></div></div>
      </div>
      <div className="mp-mc">
        <div className="mp-row"><span className="mp-av" style={{ background: "#eceee9", color: "var(--ink2)" }}>PN</span><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Priya Naidoo</div><div className="mp-small mp-mute">Senior agent · Port Louis</div></div><Pill tone="green">Online</Pill></div>
        <div className="mp-quote" style={{ marginTop: 10 }}>Recovery unit is 8 minutes from your location.</div>
        <div className="mp-row" style={{ marginTop: 10 }}><button className="mp-btn pri" style={{ flex: 1, justifyContent: "center", height: 36 }}><Phone size={14} />Call agent</button><button className="mp-btn" style={{ flex: 1, justifyContent: "center", height: 36 }}><MessageSquare size={14} />Message</button></div>
      </div>
      <div className="mp-mc"><div className="mp-cap" style={{ marginBottom: 6 }}>What happens next</div>
        <div className="mp-tl"><div className="e on">Request received<small>09:41</small></div><div className="e on">Agent assigned<small>09:42</small></div><div className="e on">Recovery dispatched<small>09:46</small></div><div className="e">Technician arriving<small>Expected 10:04</small></div></div></div>
    </>
  );
  const roadside = (
    <>
      <div className="mp-mc" style={{ background: "#eef2ee", borderColor: "#c8d5cd" }}>
        <div className="mp-row"><span className="mp-pill" style={{ background: "var(--pri)", color: "#fff", borderColor: "var(--pri)", fontWeight: 600 }}><Truck size={11} />RECOVERY IN PROGRESS</span><span className="mp-sp" /><span className="mp-small mp-mute">RS-2492</span></div>
        <div style={{ fontSize: 17, fontWeight: 600, marginTop: 10 }}>{["Your recovery driver is on the way", "Your driver is arriving", "Your vehicle is being towed", "Handover at Port Louis"][stage]}</div>
        <div className="mp-small" style={{ color: "var(--ink2)", marginTop: 3 }}>Island Recovery has accepted the job. You can call the driver directly from here.</div>
        <div className="mp-mini"><div><small>DRIVER ARRIVES</small><b>{[12, 3, 0, 0][stage]} min</b></div><div><small>DISTANCE</small><b>{["2.4 km", "0.6 km", "8.1 km", "0 km"][stage]}</b></div><div><small>STATUS</small><div style={{ fontSize: 12, fontWeight: 500 }}>{STAGES[stage]}</div></div></div>
      </div>
      <div className="mp-mc">
        <div className="mp-row"><span className="mp-cap">Your recovery driver</span><span className="mp-sp" /><Pill tone="green">Live</Pill></div>
        <div className="mp-row" style={{ marginTop: 10 }}><span className="mp-av" style={{ background: "#eceee9", color: "var(--ink2)", width: 36, height: 36 }}>RC</span>
          <div><div style={{ fontSize: 13.5 }}>Rakesh Curé <BadgeCheck size={13} style={{ verticalAlign: -2 }} /></div><div className="mp-small mp-mute">Recovery driver · flatbed · Island Recovery</div><div className="mp-small mp-mute"><Star size={11} fill="#e0a526" color="#e0a526" style={{ verticalAlign: -1 }} /> 4.9 · 1,284 recoveries</div></div></div>
        <div className="mp-rec mp-row" style={{ marginTop: 10, padding: 10 }}><div><div style={{ fontSize: 12.5 }}>Flatbed tow truck</div><div className="mp-small mp-mute">Plate IR 204 T</div></div><span className="mp-sp" /><span className="mp-pill" style={{ borderRadius: 4, fontSize: 9.5, letterSpacing: ".08em" }}>PARTNER</span></div>
        <div className="mp-quote" style={{ marginTop: 10 }}>"I am passing Baie du Tombeau now. Please stay in the vehicle with your seatbelt on until I signal you."</div>
        <div className="mp-row" style={{ marginTop: 10 }}><button className="mp-btn pri" style={{ flex: 1, justifyContent: "center", height: 36 }}><Phone size={14} />Call driver</button><button className="mp-btn" style={{ flex: 1, justifyContent: "center", height: 36 }}><MessageSquare size={14} />Message</button></div>
      </div>
      <div className="mp-mc"><div className="mp-row"><span className="mp-cap">Live recovery map</span><span className="mp-sp" /><span className="mp-small mp-mute">Updated 20 seconds ago</span></div>
        <div style={{ height: 130, marginTop: 10, borderRadius: 8, background: "linear-gradient(135deg,#dfe9e2,#eef1e8 40%,#d5e4ea)", position: "relative" }}>
          <span className="mp-pill" style={{ position: "absolute", left: 8, top: 8, background: "#1d2420", color: "#fff", borderColor: "#1d2420" }}><Navigation size={10} />IR 204 T · en route</span></div></div>
    </>
  );
  const booking = (
    <div className="mp-mc">
      <div className="mp-row"><CircleCheck size={22} color="var(--green)" /><div style={{ fontSize: 16, fontWeight: 600 }}>Your booking is confirmed</div></div>
      <div className="mp-small" style={{ color: "var(--ink2)", margin: "6px 0 12px" }}>We received your 24-hour notice and reserved a bay at Curepipe.</div>
      <div className="mp-rec mp-row"><div style={{ background: "var(--pri)", color: "#fff", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}><small style={{ fontSize: 9 }}>FRI</small><div style={{ fontSize: 18, fontWeight: 600 }}>21</div><small style={{ fontSize: 9 }}>NOV</small></div>
        <div><b style={{ fontWeight: 600 }}>09:00</b><div className="mp-small">10,000 km service</div><div className="mp-small mp-mute">Curepipe · Bay 3</div></div></div>
      <button className="mp-btn pri" style={{ width: "100%", justifyContent: "center", marginTop: 12, height: 36 }}><Calendar size={14} />Add to calendar</button>
    </div>
  );
  const myVehicle = (
    <div className="mp-mc">
      <div className="mp-row"><span className="mp-pill" style={{ background: "var(--pri)", color: "#fff", borderColor: "var(--pri)", fontWeight: 600 }}>HANDOVER READY</span></div>
      <div style={{ fontSize: 16, fontWeight: 600, marginTop: 10 }}>Handover at Port Louis</div>
      <div className="mp-small" style={{ color: "var(--ink2)" }}>Your X70 Plus is at the service centre. Sign below once you have your keys.</div>
      <div className="mp-mini"><div><small>ARRIVED</small><b>10:58</b></div><div><small>REMAINING</small><b>0 km</b></div><div><small>STATUS</small><div style={{ fontSize: 12 }}>Handover</div></div></div>
      <div className="mp-quote" style={{ marginTop: 12 }}>Your car is with Daniel Foo — keys received 17:38. Work approved.</div>
    </div>
  );
  const screen = { em: emergency, book: booking, road: roadside, veh: myVehicle }[tab];
  return (
    <>
      <Head title="Member app preview" />
      <div className="mp-card mp-row" style={{ padding: "12px 16px", marginBottom: 16 }}>
        <span className="mp-sq" style={{ width: 30, height: 30 }}><Eye size={15} /></span>
        <div style={{ flex: 1 }}><b style={{ fontSize: 13, fontWeight: 600 }}>Preview only</b><div className="mp-small" style={{ color: "var(--ink2)" }}>Nothing is sent to the member from this screen. Data is Jetour Mauritius demo data and follows the assigned agent's updates.</div></div>
        <button className="mp-btn" onClick={() => go("queue")}><ArrowUpRight size={14} />Open the case in the queue</button><span className="mp-pill" style={{ fontSize: 10, letterSpacing: ".08em" }}>ROLE · ADMIN</span>
      </div>
      <div className="mp-grid2" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <div className="mp-card" style={{ padding: 0 }}>
          <div style={{ padding: 16, borderBottom: "1px solid var(--line)" }}>
            <Seg value={tab} onChange={setTab} items={[["em", "Emergency request"], ["book", "Booking confirmation"], ["road", "Roadside Assist"], ["veh", "My vehicle"]]} />
            <div className="mp-row" style={{ marginTop: 10 }}>
              <div className="mp-seg"><button className={dev === "m" ? "on" : ""} onClick={() => setDev("m")}><Smartphone size={13} style={{ verticalAlign: -2, marginRight: 5 }} />Mobile</button><button className={dev === "d" ? "on" : ""} onClick={() => setDev("d")}><Monitor size={13} style={{ verticalAlign: -2, marginRight: 5 }} />Desktop web</button></div>
              <select className="mp-sel" style={{ width: 144 }}><option>Live status</option><option>Loading</option><option>Failed sync / offline</option></select>
            </div>
          </div>
          {dev === "m" ? <Phone_>{screen}</Phone_> : (
            <div style={{ margin: 24, border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#f1f1ec", padding: "8px 12px", fontSize: 11, color: "var(--mute)" }}>● ● ● &nbsp; members.jetour.mu</div>
              <div className="mp-row" style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)" }}><span className="mp-logo" style={{ width: 26, height: 26, fontSize: 10 }}>JT</span><b style={{ fontSize: 13 }}>Jetour Mauritius</b><span className="mp-sp" />{["Home", "Assist", "Book a service", "My vehicle", "Offers"].map((x) => <span key={x} className="mp-small" style={{ marginLeft: 12 }}>{x}</span>)}</div>
              <div style={{ padding: 16, background: "#fafaf7" }}>{screen}</div>
            </div>
          )}
        </div>
        <div>
          {tab === "road" && (
            <div className="mp-card" style={{ marginBottom: 16 }}>
              <h3>Staff control · recovery stage</h3><p className="desc">Advance the job the same way the queue does. The member screen on the left updates instantly.</p>
              <div style={{ marginTop: 14 }}>
                {STAGES.map((s, i) => (
                  <div key={s} className="mp-row" style={{ padding: "5px 0", fontSize: 13, color: i <= stage ? "var(--ink)" : "var(--ink2)" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 10, background: i < stage ? "var(--pri)" : "#fff", color: i < stage ? "#fff" : "inherit" }}>{i < stage ? <Check size={10} /> : i + 1}</span>
                    <span style={{ fontWeight: i === stage ? 500 : 400 }}>{s}</span><span className="mp-sp" />{i === stage && <span className="mp-pill">Member sees this</span>}
                  </div>
                ))}
              </div>
              <div className="mp-row" style={{ marginTop: 12 }}>
                <button className="mp-btn pri" disabled={stage === 3} onClick={() => { setStage((s) => Math.min(3, s + 1)); toast("Member status updated", `The member now sees "${STAGES[Math.min(3, stage + 1)]}".`); }}><ArrowRight size={14} />{stage < 3 ? `Advance to ${["En route", "Arriving", "Towing", "Handover"][stage + 1]}` : "Recovery complete"}</button>
                <button className="mp-btn ghost" onClick={() => setStage(0)}><RotateCcw size={14} />Reset</button>
              </div>
              <p className="mp-small mp-mute" style={{ marginTop: 12 }}>Each change is written to the case timeline and appears on the member's Roadside Assist screen immediately.</p>
            </div>
          )}
          <div className="mp-card" style={{ marginBottom: 16 }}>
            <h3>Linked request</h3><p className="desc">The member app mirrors the member-facing status of this record.</p>
            <div style={{ margin: "12px 0 8px" }}><Pill tone="slate">{tab === "road" ? STAGES[stage] : "Recovery dispatched"}</Pill></div>
            {[["Record", tab === "road" ? "JT-2492" : "JT-2481"], ["Member", "Anjali Ramgoolam"], ["Vehicle", "Jetour X70 Plus · 4821 ZK"], ["Assigned", "Priya Naidoo"], ["Last member update", "Today, 09:46"]].map(([k, v]) => <div key={k} className="mp-kv"><span>{k}</span><span>{v}</span></div>)}
            <div className="mp-quote" style={{ marginTop: 8 }}>Changing the member-facing status in the queue updates this preview within five seconds.</div>
          </div>
          <div className="mp-card">
            <h3>How staff actions appear</h3><p className="desc">Wording members actually read on their phone.</p>
            {[["Case claimed by an agent", "“Priya Naidoo is now handling your request.”"], ["Recovery dispatch accepted", "Status changes to “Recovery dispatched” with an ETA."], ["Member-facing status updated", "Appears in the status card and the update feed within 5 seconds."], ["Slot confirmed in the call centre", "“Your booking is confirmed” with date, time and branch."]].map(([t, d]) => (
              <div key={t} className="mp-rec" style={{ marginTop: 10, padding: "10px 12px" }}><div style={{ fontSize: 12.5 }}>{t}</div><div className="mp-small mp-mute">{d}</div></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- workshop */

const PENDING = [
  { id: "JT-2477", name: "Marie-Claire Léopold", mobile: "+230 5 744 6621", detail: "20,000 km service · Jetour X90 Plus · 3310 CD · Ébène", requested: "Today, 08:50",
    options: [["Thu 20 Nov · 08:00", "Courtesy vehicle available"], ["Fri 21 Nov · 10:30", "With wheel alignment"], ["Mon 24 Nov · 13:00", "Port Louis branch"]] },
  { id: "JT-2475", name: "Rakesh Bundhoo", mobile: "+230 5 901 3388", detail: "Vehicle pick-up · Jetour X70 Plus · 9054 EF · Quatre Bornes", requested: "Today, 08:31",
    options: [["Wed 19 Nov · 09:00", "Driver assigned"], ["Wed 19 Nov · 14:00", "Second run"], ["Thu 20 Nov · 09:30", "Residential pick-up"]] },
  { id: "JT-2471", name: "Shalini Meetoo", mobile: "+230 5 663 4410", detail: "Tyre & battery · Jetour X70 · 1187 GH · Port Louis", requested: "Today, 07:58",
    options: [["Wed 19 Nov · 11:00", "Two tyres in stock"], ["Thu 20 Nov · 08:30", "Mobile fitting partner"], ["Fri 21 Nov · 15:00", "Port Louis branch"]] },
];

const CAL_DAYS = ["Wed 19 Nov", "Thu 20 Nov", "Fri 21 Nov", "Sat 22 Nov", "Mon 24 Nov"];
const CAL_BOOKINGS = [
  { day: "Wed 19 Nov", time: "08:30", name: "Priyanka Hurree", service: "Annual inspection", branch: "Port Louis", bay: "bay 1" },
  { day: "Thu 20 Nov", time: "11:00", name: "Yannick Perrine", service: "Brake pads", branch: "Curepipe", bay: "bay 2" },
  { day: "Fri 21 Nov", time: "09:00", name: "Olivier Sénèque", service: "10,000 km service", branch: "Curepipe", bay: "bay 3" },
  { day: "Mon 24 Nov", time: "10:00", name: "Tanya Appadoo", service: "Collision assessment", branch: "Ébène", bay: "body shop 1" },
];

function Workshop({ toast, go }) {
  const [calBranch, setCalBranch] = useState("");
  const [tab, setTab] = useState("await");
  const [arr, setArr] = useState("all");
  const [req, setReq] = useState({});
  const [pick, setPick] = useState({});
  const [confirmed, setConfirmed] = useState({});
  const pendingList = PENDING.filter((p) => confirmed[p.id] == null);
  const arrivals = [
    ["08:12", "Priyanka Hurree", "Member drop-off", "Jetour Dashing", "4471 QR", "Annual inspection", "Keys left at reception · booked Wed 19 Nov, 08:30", "Daniel Foo", "Bay 1", "Keys received 08:12", "Signed 08:18", "6 min at the desk"],
    ["09:07", "Vikash Pudaruth", "Recovery", "Jetour X70 Plus", "6620 BC", "Brake noise diagnosis", "Flatbed IR 7 · Island Recovery · from Ébène", "Daniel Foo", "Bay 2", "Keys received 09:07", null, "Awaiting signature"],
    ["09:34", "Nadia Coowar", "Valet", "Jetour X70", "1902 DF", "Tyre & battery", "Collected from Curepipe by valet", "Priya Naidoo", "Bay 3", "Keys received 09:38", "Signed 09:41", "7 min at the desk"],
    ["10:05", "Ashwin Ramen", "Recovery", "Jetour X90 Plus", "7731 KL", "Collision assessment", "Flatbed IR 2 · Island Recovery", "Daniel Foo", "Bay 4", "Keys received 10:05", null, "Awaiting signature"],
    ["10:21", "Sabrina Tonta", "Member drop-off", "Jetour X70 Plus", "5510 MN", "Vehicle pick-up", "Member waiting in the lounge", "Naveen Audibert", "Bay 1", "Keys received 10:21", "Signed 10:26", "5 min at the desk"],
    ["10:58", "Anjali Ramgoolam", "Live case", "Jetour X70 Plus", "4821 ZK", "Recovery · Roadside Assist", "Collected by flatbed from Baie du Tombeau", "Daniel Foo", "Bay 2", "Keys received 17:38", null, "Awaiting signature"],
  ];
  const shown = arrivals.filter((a) => arr === "all" || (arr === "await" ? !a[10] : !!a[10]));
  return (
    <>
      <Head title="Workshop & outreach" />
      <div className="mp-tabsbar"><Seg value={tab} onChange={setTab} items={[["await", "Awaiting confirmation", pendingList.length], ["cal", "Confirmed calendar", 4 + PENDING.length - pendingList.length], ["arr", "Port Louis arrivals", 7], ["out", "Outreach", 5]]} /><span className="mp-sp" /><span className="mp-small" style={{ color: "var(--ink2)" }}>Call-centre fulfilment · Jetour Mauritius</span></div>

      {tab === "arr" && (
        <div className="mp-card">
          <div className="mp-row" style={{ alignItems: "flex-start" }}>
            <div style={{ maxWidth: 650 }}><h3>Port Louis arrivals board</h3><p className="desc" style={{ lineHeight: 1.6 }}>Every vehicle received at the Port Louis service centre today, with the time it arrived, the advisor who took the keys and whether the member has signed the handover.</p></div>
            <span className="mp-sp" /><Seg value={arr} onChange={setArr} items={[["all", "All arrivals", 8], ["await", "Awaiting signature", 3], ["signed", "Signed", 5]]} />
          </div>
          <div className="mp-rec" style={{ background: "#f5f6f3", marginTop: 14 }}>
            <div className="mp-row" style={{ fontSize: 12.5 }}><Smartphone size={14} /><span><b style={{ fontWeight: 600 }}>7 of 8</b> vehicles on this board are already on <b style={{ fontWeight: 600 }}>My vehicle</b> in the member app, with the advisor, bay and every job step — keys received, inspection started, work approved.</span></div>
            <div className="mp-row" style={{ marginTop: 8 }}><Pill tone="slate">7 members tracking</Pill><button className="mp-btn sm">See the member view <ArrowRight size={12} /></button></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 8 }}>
            {[["Handed over today", "8", "Receptions, recoveries and pick-ups"], ["Keys received", "7", "7 of 8 visible on My vehicle", "/ 8"], ["Unsigned handovers", "3", "Case cannot close until signed", null, true], ["Average handover", "86 min", "Arrival to member signature"]].map(([l, v, n, s, a]) => (
              <div key={l} className="mp-rec" style={{ background: a ? "var(--ambersoft)" : "#fff", borderColor: a ? "var(--amberline)" : "var(--line)", padding: 12 }}>
                <div className="mp-cap">{l}</div><div style={{ fontSize: 21, fontWeight: 600, marginTop: 2 }}>{v}{s && <span className="mp-small mp-mute" style={{ fontWeight: 400 }}> {s}</span>}</div><div className="mp-small" style={{ color: a ? "#9a6512" : "var(--mute)" }}>{n}</div>
              </div>
            ))}
          </div>
          <div className="mp-rec" style={{ background: "var(--ambersoft)", borderColor: "var(--amberline)", marginTop: 12 }}>
            <div className="mp-row" style={{ fontSize: 12.5 }}><PenLine size={14} /><span><b style={{ fontWeight: 600 }}>3 vehicles</b> at the centre with no member signature yet. Ask the member to sign in the Roadside Assist or booking screen before closing the case.</span></div>
            <div className="mp-row" style={{ marginTop: 10 }}><button className="mp-btn" onClick={() => setArr("await")}>Show only these</button><button className="mp-btn" onClick={() => toast("Reminders sent", "3 members were asked to sign their handover.")}><Bell size={14} />Remind all</button></div>
          </div>
          <div className="mp-rec" style={{ borderStyle: "dashed", marginTop: 12 }}><div className="mp-cap mp-row"><Truck size={13} />Inbound to Port Louis · not arrived yet</div><div className="mp-small" style={{ marginTop: 4 }}><b style={{ fontWeight: 500 }}>Sébastien Ah-Koon</b> <span style={{ color: "var(--ink2)" }}>· Jetour X90 Plus · 5126 VD · ETA 18 min</span></div></div>
          {shown.map((a) => (
            <div key={a[1]} className="mp-rec mp-row" style={{ marginTop: 10, alignItems: "flex-start", background: a[10] ? "#fff" : "#fffcf2", borderColor: a[10] ? "var(--line)" : "var(--amberline)" }}>
              <div style={{ width: 70 }}><div style={{ fontSize: 16, fontWeight: 600 }}>{a[0]}</div><div className="mp-small mp-mute mp-row" style={{ gap: 3, fontSize: 10, letterSpacing: ".08em" }}><Clock size={10} />ARRIVED</div></div>
              <div style={{ flex: 1 }}><div className="mp-row"><b style={{ fontWeight: 600 }}>{a[1]}</b><span className="mp-pill" style={{ borderRadius: 4 }}>{a[2]}</span></div>
                <div className="mp-small" style={{ color: "var(--ink2)", marginTop: 3 }}>{a[3]} · {a[4]} · {a[5]}</div><div className="mp-small" style={{ color: "var(--ink2)" }}>{a[6]}</div></div>
              <div style={{ width: 150 }}><div style={{ fontSize: 13 }}>{a[7]}</div><div className="mp-small mp-mute">{a[8]}</div><span className="mp-pill green" style={{ marginTop: 3 }}><KeyRound size={10} />{a[9]}</span></div>
              <div style={{ textAlign: "right" }}>{a[10] ? <span className="mp-pill green"><Check size={11} />{a[10]}</span> : <span className="mp-pill amber"><PenLine size={11} />Awaiting signature</span>}
                <div className="mp-row" style={{ marginTop: 8, justifyContent: "flex-end" }}><span className="mp-small mp-mute">{a[11]}</span>{a[10] ? <button className="mp-btn sm">Open case <ArrowRight size={12} /></button> : <button className="mp-btn sm" onClick={() => toast("Reminder sent", `${a[1]} was asked to sign the handover.`)}>Remind to sign</button>}</div></div>
            </div>
          ))}
          <p className="mp-small mp-mute" style={{ marginTop: 14 }}>Signatures are captured on the member's phone and land here instantly.</p>
        </div>
      )}

      {tab === "out" && (
        <div className="mp-card">
          <div className="mp-row"><h3>Upcoming services and renewals</h3><span className="mp-sp" /><span className="mp-small mp-mute">5 in list</span></div>
          <p className="desc" style={{ maxWidth: 640, lineHeight: 1.6 }}>Vehicles due within the next three weeks. Starting a request creates a case in the live queue and keeps the member in the loop.</p>
          <table className="mp-tbl" style={{ marginTop: 16 }}>
            <thead><tr>{["MEMBER", "VEHICLE", "REASON", "DUE", "BRANCH", "LAST CONTACT", "ACTION"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {[["Vikash Pudaruth", "Jetour X70 Plus · 2023", "6620 BC", "Service due", "in 6 days", "Port Louis", "Never contacted"], ["Nadia Coowar", "Jetour Dashing · 2024", "1902 DF", "Renewal", "in 9 days", "Curepipe", "SMS sent 3 days ago"], ["Ashwin Ramen", "Jetour X90 Plus · 2024", "7731 KL", "Inspection", "in 12 days", "Ébène", "Opened, no reply"], ["Sabrina Tonta", "Jetour X70 Plus · 2025", "5510 MN", "Service due", "in 14 days", "Quatre Bornes", "Never contacted"], ["Hugo L'Espérance", "Jetour Dashing · 2023", "2288 TR", "Renewal", "in 17 days", "Port Louis", "Called 6 days ago"]].map((r) => (
                <tr key={r[0]}>
                  <td>{r[0]}</td><td style={{ color: "var(--ink2)" }}>{r[1]}<span className="mp-reg">{r[2]}</span></td>
                  <td><Pill tone={r[3] === "Renewal" ? "amber" : "slate"}>{r[3]}</Pill></td><td>{r[4]}</td><td style={{ color: "var(--ink2)" }}>{r[5]}</td><td style={{ color: "var(--ink2)" }}>{req[r[0]] ? "SMS contact recorded" : r[6]}</td>
                  <td><div className="mp-row">
                    {req[r[0]] ? <button className="mp-btn dis"><Check size={13} />Requested</button> : <button className="mp-btn pri" onClick={() => { setReq((s) => ({ ...s, [r[0]]: true })); toast("Request started", `${r[0]} · ${r[3].toLowerCase()}. A case was created in the live queue.`); }}>Start request</button>}
                    <button className="mp-btn" style={req[r[0]] ? { color: "var(--mute)" } : null} onClick={() => toast("Outreach call launched", `${r[0]} · SMS contact recorded.`)}>{req[r[0]] ? "Contacted" : "Contact"}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "cal" && (() => {
        const bookings = [
          ...CAL_BOOKINGS,
          ...PENDING.filter((p) => confirmed[p.id] != null).map((p) => {
            const [day, time] = p.options[confirmed[p.id]][0].split(" · ");
            const parts = p.detail.split(" · ");
            return { day, time, name: p.name, service: parts[0], branch: parts[parts.length - 1], bay: "bay to allocate", fresh: true };
          }),
        ].filter((b) => !calBranch || b.branch === calBranch);
        return (
          <div className="mp-card">
            <div className="mp-row" style={{ alignItems: "flex-start" }}>
              <div><h3>Confirmed bookings · 19–24 November</h3><p className="desc">Grouped by day across {calBranch || "all branches"}. Each entry shows the bay allocated by the workshop.</p></div>
              <span className="mp-sp" />
              <select className="mp-sel" style={{ width: 128 }} value={calBranch} onChange={(e) => setCalBranch(e.target.value)}>
                <option value="">All branches</option>{["Port Louis", "Curepipe", "Quatre Bornes", "Ébène"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 8, marginTop: 16 }}>
              {CAL_DAYS.map((d) => {
                const items = bookings.filter((b) => b.day === d).sort((a, b) => a.time.localeCompare(b.time));
                return (
                  <div key={d} style={{ border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden", background: "#fff" }}>
                    <div style={{ background: "#f6f6f2", borderBottom: "1px solid var(--line)", padding: "8px 10px", fontSize: 12, fontWeight: 600 }}>{d}</div>
                    <div style={{ padding: 6, minHeight: 96 }}>
                      {items.length ? items.map((b) => (
                        <div key={b.name + b.time} style={{ border: `1px solid ${b.fresh ? "#b8d3c4" : "var(--line)"}`, background: b.fresh ? "#f3f8f5" : "#fff", borderRadius: 4, padding: "9px 9px 8px", marginBottom: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: 600 }}>{b.time}</div>
                          <div style={{ fontSize: 12.5, marginTop: 5 }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: "var(--ink2)" }}>{b.service}</div>
                          <div style={{ fontSize: 10.5, color: "var(--ink2)", marginTop: 8 }}>{b.branch} · {b.bay}</div>
                        </div>
                      )) : <div style={{ fontSize: 11.5, color: "var(--ink2)", padding: "14px 6px" }}>No bookings</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {tab === "await" && (
        pendingList.length === 0 ? (
          <div className="mp-card" style={{ textAlign: "center", padding: 40 }}>
            <CircleCheck size={22} color="var(--green)" />
            <h3 style={{ marginTop: 8 }}>All requests confirmed</h3>
            <p className="desc">New Book a Service requests will appear here.</p>
          </div>
        ) : pendingList.map((p) => {
          const chosen = pick[p.id] ?? 0;
          return (
            <div key={p.id} className="mp-card" style={{ marginBottom: 16 }}>
              <div className="mp-row" style={{ alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div className="mp-row"><b style={{ fontWeight: 600, fontSize: 14.5 }}>{p.name}</b><Pill tone="amber">Awaiting confirmation</Pill><span className="mp-small mp-mute">{p.id}</span></div>
                  <div style={{ fontSize: 13, color: "var(--ink2)", marginTop: 6 }}>{p.detail} · requested {p.requested}</div>
                </div>
                <button className="mp-btn" style={{ height: 32 }} onClick={() => toast("Calling the member", `${p.name} · ${p.mobile}. The call is logged on the case timeline.`)}><Phone size={14} />Call member</button>
                <button className="mp-btn pri" style={{ height: 32 }} onClick={() => {
                  const o = p.options[chosen];
                  setConfirmed((s) => ({ ...s, [p.id]: chosen }));
                  toast("Booking confirmed", `${p.name} · ${o[0]}. The member was notified by SMS and in-app.`);
                }}><CalendarClock size={14} />Confirm booking</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 14 }}>
                {p.options.map(([when, note], i) => (
                  <button key={i} onClick={() => setPick((s) => ({ ...s, [p.id]: i }))} aria-pressed={chosen === i}
                    style={{ textAlign: "left", border: `1px solid ${chosen === i && pick[p.id] != null ? "#7fa597" : "var(--line)"}`, boxShadow: chosen === i && pick[p.id] != null ? "0 0 0 1px #7fa597" : "none", background: chosen === i && pick[p.id] != null ? "#f3f7f4" : "#fafaf7", borderRadius: 6, padding: "11px 10px 10px" }}>
                    <div className="mp-cap" style={{ color: "var(--ink2)", fontWeight: 600 }}>Option {i + 1}</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>{when}</div>
                    <div className="mp-small" style={{ color: "var(--ink2)", fontSize: 11 }}>{note}</div>
                  </button>
                ))}
              </div>
              <p className="mp-small" style={{ color: "var(--ink2)", margin: "10px 0 6px", fontSize: 11.5 }}>The member submitted these three preferences in the Book a Service mini-app.</p>
              <button className="mp-btn ghost" style={{ padding: 0, height: 24, fontSize: 12, color: "var(--pri)" }} onClick={() => go("memberapp")}><Smartphone size={13} />Preview the member's confirmation screen</button>
            </div>
          );
        })
      )}
    </>
  );
}

/* ---------------------------------------------------------- tenant setup */

const TILE_ICON = {
  Emergency: Siren, "Roadside Assist": Truck, "Book a Service": CalendarCheck, "My Vehicle": Car, Reminders: Bell,
  Documents: FileText, Offers: Gift, "Chat with Us": MessageCircle, "Refer a Friend": UserRound,
};

function HomePreview({ order, tiles, color, greeting, carousel }) {
  const visible = order.filter((k) => tiles[k]);
  return (
    <>
      <div className="mp-row" style={{ gap: 9 }}>
        <span className="mp-logo" style={{ width: 28, height: 28, fontSize: 10, background: color }}>JT</span>
        <div><div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>Jetour Mauritius</div><div style={{ fontSize: 9.5, color: "var(--ink2)" }}>{greeting}</div></div>
      </div>
      <div style={{ background: "#ebebe7", borderRadius: 5, padding: "9px 10px", margin: "12px 0" }}>
        <div style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink2)" }}>MY VEHICLE</div>
        <div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 3 }}>Jetour X70 Plus · 4821 ZK</div>
        <div style={{ fontSize: 9, color: "var(--ink2)" }}>Next service in 2,140 km</div>
      </div>
      <div style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink2)", fontWeight: 600, marginBottom: 6 }}>QUICK ACTIONS</div>
      {visible.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {visible.map((k) => {
            const I = TILE_ICON[k];
            return (
              <div key={k} title={k} style={{ width: 40, height: 40, border: "1px solid var(--line)", borderRadius: 5, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <I size={12} color={color} />
                <span style={{ fontSize: 7.5, color: "var(--ink2)", maxWidth: 34, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k}</span>
              </div>
            );
          })}
        </div>
      ) : <div style={{ fontSize: 10, color: "var(--mute)" }}>No mini-apps shown</div>}
      {carousel !== "Hidden" && <div style={{ border: "1px dashed #d4d6d1", borderRadius: 5, padding: "7px 0", textAlign: "center", fontSize: 8, color: "var(--ink2)", marginTop: 12 }}>Offers and news carousel</div>}
    </>
  );
}

const MiniPhone = ({ children }) => (
  <div style={{ width: 210, border: "6px solid #2b2b2b", borderRadius: 26, overflow: "hidden", background: "#fff" }}>
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 14px 2px", fontSize: 8.5, fontWeight: 600 }}><span>09:58</span><span className="mp-row" style={{ gap: 3 }}><Wifi size={9} /><BatteryMedium size={10} /></span></div>
    <div style={{ padding: "10px 12px 18px", background: "#f6f6f2", minHeight: 260 }}>{children}</div>
  </div>
);

function PublishModal({ draft, onClose, onPublish }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const shown = draft.order.filter((k) => draft.tiles[k]).length;
  const panel = { border: "1px solid var(--line)", borderRadius: 4, background: "#fafaf7", padding: 12, minHeight: 322 };
  return (
    <div className="mp-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mp-modal" style={{ width: 670 }} role="dialog" aria-modal="true" aria-label="Review before publishing">
        <div className="mh" style={{ paddingRight: 64 }}>
          <h4>Review before publishing</h4>
          <p style={{ lineHeight: 1.6 }}>Compare the mobile and desktop home screen. Publishing replaces the version members currently see.</p>
          <button onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="mb" style={{ paddingTop: 16, paddingBottom: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={panel}>
              <div className="mp-cap" style={{ color: "var(--ink2)", fontWeight: 600, marginBottom: 12 }}>Mobile</div>
              <div style={{ display: "flex", justifyContent: "center", transform: "scale(.92)", transformOrigin: "top center" }}><MiniPhone><HomePreview {...draft} /></MiniPhone></div>
            </div>
            <div style={panel}>
              <div className="mp-cap" style={{ color: "var(--ink2)", fontWeight: 600, marginBottom: 12 }}>Desktop widget</div>
              <div style={{ border: "1px solid var(--line)", borderRadius: 6, background: "#f6f6f2", padding: "20px 24px" }}><HomePreview {...draft} /></div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--line)", marginTop: 16, padding: "12px 0 14px", fontSize: 11.5, color: "var(--ink2)", lineHeight: 2 }}>
            <div>· {shown} mini-apps visible, {draft.order.length - shown} hidden</div>
            <div>· Reminders: service {draft.reminders.service ? "on" : "off"} · renewal {draft.reminders.renewal ? "on" : "off"} · quiet hours {draft.reminders.quiet ? "on" : "off"}</div>
            <div>· Published changes appear immediately for members already on the current app version</div>
          </div>
        </div>
        <div className="mf">
          <button className="mp-btn ghost" onClick={onClose}>Keep editing</button>
          <button className="mp-btn pri" onClick={onPublish}><Check size={14} />Publish to members</button>
        </div>
      </div>
    </div>
  );
}

const SETUP_PUBLISHED = {
  tiles: { Emergency: 1, "Roadside Assist": 1, "Book a Service": 1, "My Vehicle": 1, Reminders: 0, Documents: 0, Offers: 1, "Chat with Us": 0, "Refer a Friend": 0 },
  order: Object.keys(TILE_ICON), greeting: "Your vehicle, looked after.", carousel: "Live offers",
  rules: { vin: 1, dealer: 1, manual: 1 }, color: "#134E4A",
  reminders: { service: 1, renewal: 1, docs: 0, quiet: 1 },
};

function Setup({ toast }) {
  const [tab, setTab] = useState("brand");
  const [published, setPublished] = useState(SETUP_PUBLISHED);
  const [tiles, setTiles] = useState(published.tiles);
  const [order, setOrder] = useState(published.order);
  const [device, setDevice] = useState("d");
  const [greeting, setGreeting] = useState(published.greeting);
  const [carousel, setCarousel] = useState(published.carousel);
  const [rules, setRules] = useState(published.rules);
  const [color, setColor] = useState(published.color);
  const [reminders, setReminders] = useState(published.reminders);
  const [touched, setTouched] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [review, setReview] = useState(false);
  const draft = { tiles, order, greeting, carousel, rules, color, reminders };
  const dirty = touched || JSON.stringify(draft) !== JSON.stringify(published);
  const discard = () => {
    setTiles(published.tiles); setOrder(published.order); setGreeting(published.greeting);
    setCarousel(published.carousel); setRules(published.rules); setColor(published.color); setReminders(published.reminders);
    setTouched(false); setFormKey((k) => k + 1);
    toast("Changes discarded", "Tenant setup is back to the published version.");
  };
  const publish = () => {
    setPublished(draft); setTouched(false); setReview(false);
    toast("Published to members", "Jetour Mauritius members now see the new home screen.");
  };
  return (
    <>
      <Head title="Tenant setup" />
      {review && <PublishModal draft={draft} onClose={() => setReview(false)} onPublish={publish} />}
      <div className="mp-tabsbar"><Seg value={tab} onChange={setTab} items={[["widget", "Home-screen widget"], ["brand", "Brand & branches"], ["reg", "Registration & services"], ["rem", "Reminders & templates"]]} /><span className="mp-sp" />
        {dirty ? <Pill tone="slate">Draft</Pill> : <Pill tone="green">Live</Pill>}
        <button className="mp-btn" onClick={() => setReview(true)}><Eye size={14} />Preview</button>
        <button className="mp-btn pri" onClick={() => (dirty ? setReview(true) : toast("Nothing to publish", "Members already see the latest version."))}><Send size={14} />Publish</button></div>
      {dirty && (
        <div className="mp-alert" style={{ alignItems: "center", padding: "10px 12px", marginBottom: 16 }}>
          <span style={{ fontSize: 12.5, color: "var(--ink)" }}>You have unpublished changes for <b style={{ display: "inline", fontWeight: 600 }}>Jetour Mauritius</b>. Members still see the last published version.</span>
          <span className="mp-sp" />
          <button className="mp-btn" style={{ marginLeft: 0 }} onClick={discard}><RotateCcw size={14} />Discard</button>
          <button className="mp-btn pri" style={{ marginLeft: 0 }} onClick={() => setReview(true)}>Review and publish</button>
        </div>
      )}
      <div key={formKey} onChangeCapture={(e) => { if (e.target.closest(".mp-field") && e.target.dataset.local == null) setTouched(true); }}>

      {tab === "brand" && (
        <div className="mp-grid2e">
          <div className="mp-card">
            <h3>Brand</h3><p className="desc" style={{ marginBottom: 18 }}>Applies to the member mini-app, SMS and email templates.</p>
            <div className="mp-field"><label>Tenant display name</label><input className="mp-input" defaultValue="Jetour Mauritius" /></div>
            <div className="mp-field"><label>Tagline</label><input className="mp-input" defaultValue="Your vehicle, looked after." /></div>
            <div className="mp-field"><label>Primary brand colour</label><div className="mp-row"><span style={{ width: 26, height: 26, borderRadius: 5, background: color, flex: "none" }} /><input data-local className="mp-input" value={color} onChange={(e) => setColor(e.target.value)} /></div><small>Used for buttons and quick-action icons.</small></div>
            <div className="mp-field"><label>Support phone</label><input className="mp-input" defaultValue="+230 5 700 0100" /><small>Shown in the mini-app help sheet.</small></div>
          </div>
          <div className="mp-card">
            <div className="mp-row"><div><h3>Branches</h3><p className="desc">Service locations available for booking and dispatch.</p></div><span className="mp-sp" /><button className="mp-btn">Add branch</button></div>
            <div style={{ marginTop: 12 }}>
              {[["Port Louis — Head office", "Royal Road, Port Louis · +230 5 700 0100", "Mon–Fri 08:00–17:30 · Sat 08:30–12:30", "4 bays"], ["Curepipe", "Royal College Street, Curepipe · +230 5 700 0120", "Mon–Fri 08:30–17:00 · Sat closed", "3 bays"], ["Quatre Bornes", "St Jean Road, Quatre Bornes · +230 5 700 0130", "Mon–Fri 08:00–17:00 · Sat 09:00–13:00", "2 bays"], ["Ébène", "Rue de la Démocratie, Ébène · +230 5 700 0140", "Mon–Fri 07:30–18:00 · Sat 08:00–13:00", "6 bays"]].map(([n, a, h, b]) => (
                <div key={n} className="mp-li" style={{ alignItems: "flex-start" }}><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{n}</div><div className="mp-small" style={{ color: "var(--ink2)" }}>{a}</div><div className="mp-small" style={{ color: "var(--ink2)" }}>{h}</div></div><span className="mp-small mp-mute">{b}</span></div>
              ))}
            </div>
            <div className="mp-field" style={{ marginTop: 6 }}><label>Default operating hours</label><input className="mp-input" defaultValue="Mon–Fri 08:00–17:30 · Sat 08:30–12:30" /></div>
          </div>
        </div>
      )}

      {tab === "widget" && (() => {
        const move = (i, d) => setOrder((o) => { const n = [...o]; [n[i], n[i + d]] = [n[i + d], n[i]]; return n; });
        const arrow = { width: 28, height: 28, border: "1px solid var(--line)", borderRadius: 6, background: "#fff", display: "grid", placeItems: "center", padding: 0, color: "#3d6a9e" };
        const homeScreen = <HomePreview {...draft} />;
        return (
          <div className="mp-grid2" style={{ gridTemplateColumns: "2.05fr 1fr", alignItems: "start" }}>
            <div className="mp-card">
              <h3>Home-screen widget</h3><p className="desc" style={{ lineHeight: 1.65 }}>Choose which mini-apps appear on the member home screen and in what order. Changes are drafts until published.</p>
              <div className="mp-seg" style={{ margin: "12px 0 10px" }}>
                <button className={device === "m" ? "on" : ""} onClick={() => setDevice("m")}><Smartphone size={13} style={{ verticalAlign: -2, marginRight: 5 }} />Mobile</button>
                <button className={device === "d" ? "on" : ""} onClick={() => setDevice("d")}><Monitor size={13} style={{ verticalAlign: -2, marginRight: 5 }} />Desktop</button>
              </div>
              {order.map((k, i) => {
                const I = TILE_ICON[k];
                return (
                  <div key={k} className="mp-li" style={{ padding: "10px 0" }}>
                    <span className="mp-sq" style={{ width: 32, height: 32 }}><I size={15} strokeWidth={1.6} /></span>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{k}</div><div className="mp-small" style={{ color: "var(--ink2)", fontSize: 11 }}>{tiles[k] ? `Position ${i + 1} on the member home screen` : "Hidden from members"}</div></div>
                    <button style={{ ...arrow, opacity: i === 0 ? 0.35 : 1 }} disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Move ${k} up`}><ArrowUp size={14} /></button>
                    <button style={{ ...arrow, opacity: i === order.length - 1 ? 0.35 : 1 }} disabled={i === order.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${k} down`}><ArrowDown size={14} /></button>
                    <Toggle on={!!tiles[k]} onClick={() => setTiles((t) => ({ ...t, [k]: t[k] ? 0 : 1 }))} />
                  </div>
                );
              })}
              <div className="mp-grid2e" style={{ marginTop: 14 }}>
                <div className="mp-field"><label>Greeting line</label><input data-local className="mp-input" value={greeting} onChange={(e) => setGreeting(e.target.value)} /><small>Shown above the quick actions.</small></div>
                <div className="mp-field"><label>Offers carousel</label><select data-local className="mp-sel" style={{ width: "100%" }} value={carousel} onChange={(e) => setCarousel(e.target.value)}><option>Live offers</option><option>Hidden</option></select><small>Uses live offers from Content & engagement.</small></div>
              </div>
            </div>
            <div className="mp-card">
              <h3>Preview</h3><p className="desc">Exactly what members see on their device.</p>
              {device === "d" ? (
                <div style={{ border: "1px solid var(--line)", borderRadius: 4, padding: 8, marginTop: 16 }}>
                  <div style={{ background: "#f6f6f2", borderRadius: 5, padding: 16 }}>{homeScreen}</div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}><MiniPhone>{homeScreen}</MiniPhone></div>
              )}
              <p className="mp-small" style={{ color: "var(--ink2)", marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--line)", lineHeight: 1.6 }}>Preview uses demo member data (Anjali Ramgoolam · Jetour X70 Plus). No personal reminders are included.</p>
            </div>
          </div>
        );
      })()}

      {tab === "reg" && (
        <div className="mp-grid2e" style={{ alignItems: "start" }}>
          <div className="mp-card">
            <h3>Registration rules</h3><p className="desc">How a vehicle can be linked to a member account.</p>
            {[["vin", "VIN verification", "Members must confirm the last six characters of the VIN."], ["dealer", "Dealer record match", "Only vehicles sold by a Jetour Mauritius dealer can be linked."], ["manual", "Manual approval", "Agent approval required before a vehicle is added."]].map(([k, t, d]) => (
              <div key={k} className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{t}</div><div className="mp-small mp-mute">{d}</div></div><Toggle on={!!rules[k]} onClick={() => setRules((r) => ({ ...r, [k]: r[k] ? 0 : 1 }))} /></div>
            ))}
          </div>
          <div className="mp-card">
            <h3>Services</h3><p className="desc">Services available to members and the fulfilment path for each.</p>
            {[["Emergency assistance", "Call centre 24/7"], ["Roadside assist", "Partner dispatch"], ["Service booking", "Call centre"], ["Vehicle pick-up", "Direct integration"], ["Tyre & battery", "Partner dispatch"]].map(([s, v]) => (
              <div key={s} className="mp-field" style={{ marginTop: 12 }}><label>{s}</label><select className="mp-sel" style={{ width: "100%" }} defaultValue={v}><option>Call centre 24/7</option><option>Call centre</option><option>Partner dispatch</option><option>Direct integration</option></select></div>
            ))}
          </div>
        </div>
      )}

      {tab === "rem" && (
        <div className="mp-grid2e" style={{ alignItems: "start" }}>
          <div className="mp-card">
            <h3>Automated vehicle reminders</h3>
            <p className="desc" style={{ marginBottom: 16 }}>Sent from the vehicle record; private personal reminders are never included.</p>
            {[["service", "Service due", "Send 30 days and 500 km before the service interval."], ["renewal", "Insurance & road tax renewal", "Send 45 days before expiry, once a week after."], ["docs", "Document expiry", "Remind when a document in the vault expires."], ["quiet", "Quiet hours", "Do not send between 20:00 and 07:00 local time."]].map(([k, t, d]) => (
              <div key={k} className="mp-rec mp-row" style={{ padding: "11px 10px", marginBottom: 12 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{t}</div><div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 2 }}>{d}</div></div>
                <Toggle on={!!reminders[k]} onClick={() => setReminders((r) => ({ ...r, [k]: r[k] ? 0 : 1 }))} />
              </div>
            ))}
          </div>
          <div className="mp-card">
            <h3>Notification templates</h3>
            <p className="desc" style={{ marginBottom: 14 }}>Member-facing wording in English and French.</p>
            {[["Booking confirmation", "SMS + in-app · updated Today, 08:56"], ["Emergency received", "SMS + push · updated 12 Nov 2025"], ["Service reminder", "Push + email · updated 04 Nov 2025"], ["Member invitation", "SMS · updated 28 Oct 2025"]].map(([t, d]) => (
              <div key={t} className="mp-li" style={{ padding: "11px 0" }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{t}</div><div style={{ fontSize: 11, color: "var(--ink2)", marginTop: 2 }}>{d}</div></div>
                <button className="mp-btn" style={{ height: 32 }}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------ mini-apps */

const MINI = [
  ["Emergency", Siren, "Immediate assistance, routed by urgency with member location.", "call", "Live", true, "Emergency desk · +230 5 700 0100", "Answer within 30 seconds", true],
  ["Book a Service", Calendar, "Service requests with three preferred slots.", "call", "Live", true, "Jetour service desk", "Confirm within 2 working hours", true],
  ["Offers", Gift, "Member-only offers and seasonal campaigns.", "call", "Live", true, "Marketing desk", "Redeem at branch", true],
  ["Chat with Us", MessageCircle, "Live chat with the call centre.", "call", "Draft", false, "Chat queue", "First reply within 2 minutes"],
  ["Refer a Friend", UserRound, "Member referral programme with tracking.", "call", "Live", true, "Member care", "Contact within 1 working day"],
  ["Roadside Assist", Truck, "Recovery, jump-start, fuel and tyre support.", "partner", "Live", true, "Island Recovery Ltd", "Arrive within 45 minutes", true],
  ["Tyre & battery", Wrench, "Mobile tyre and battery replacement.", "partner", "Live", true, "Island Recovery Ltd", "Same-day fitting"],
  ["My Vehicle", Car, "Linked vehicles, registration and service history.", "direct", "Live", true, "Dealer DMS connector", "Sync every 15 minutes", true],
  ["Reminders", Bell, "Automated vehicle and renewal reminders.", "direct", "Live", true, "Notification service", "Send within 1 minute"],
  ["Documents", FileText, "Insurance, registration and invoices.", "direct", "Live", true, "Document vault", "Available instantly"],
];
const FUL = { call: [Headphones, "Call centre"], partner: [Truck, "Partner dispatch"], direct: [RefreshCw, "Direct integration"] };

function ConfigModal({ name, cfg, onClose, onSave }) {
  const [v, setV] = useState(cfg);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const lbl = { display: "block", fontSize: 13, fontWeight: 500, margin: "16px 0 8px" };
  return (
    <div className="mp-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mp-modal" style={{ width: 510 }} role="dialog" aria-modal="true" aria-label={`Configure ${name}`}>
        <div className="mh" style={{ paddingRight: 56 }}>
          <h4>Configure {name}</h4>
          <p>Availability, service contacts and fulfilment are saved per tenant.</p>
          <button onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="mb">
          <div className="mp-rec mp-row" style={{ padding: "12px 10px" }}>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Available to members</div><div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 1 }}>Hidden mini-apps are removed from the home screen and search.</div></div>
            <Toggle on={v.on} onClick={() => setV((s) => ({ ...s, on: !s.on }))} />
          </div>
          <label style={lbl} htmlFor="mp-cfg-mode">Fulfilment mode</label>
          <select id="mp-cfg-mode" className="mp-sel" style={{ width: "100%" }} value={v.mode} onChange={set("mode")}>
            <option value="call">Call centre</option><option value="partner">Partner dispatch</option><option value="direct">Direct integration</option>
          </select>
          <div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 6, lineHeight: 1.5 }}>Call-centre fulfilment routes requests to the Jetour queue. Partner dispatch and direct integration are optional capabilities.</div>
          <label style={lbl} htmlFor="mp-cfg-contact">Service contact</label>
          <input id="mp-cfg-contact" className="mp-input" value={v.contact} onChange={set("contact")} />
          <label style={lbl} htmlFor="mp-cfg-target">Response target</label>
          <input id="mp-cfg-target" className="mp-input" value={v.target} onChange={set("target")} />
          <div className="mp-rec mp-row" style={{ padding: "12px 10px", marginTop: 12 }}>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Feature on the home screen</div><div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 1 }}>Featured mini-apps appear in the quick-action grid.</div></div>
            <Toggle on={v.home} onClick={() => setV((s) => ({ ...s, home: !s.home }))} />
          </div>
        </div>
        <div className="mf">
          <button className="mp-btn ghost" onClick={onClose}>Close</button>
          <button className="mp-btn pri" disabled={!v.contact.trim() || !v.target.trim()} onClick={() => onSave(v)}>Save configuration</button>
        </div>
      </div>
    </div>
  );
}

function MiniApps({ toast }) {
  const [tab, setTab] = useState("call");
  const [cfg, setCfg] = useState(() => Object.fromEntries(MINI.map((m) => [m[0], { on: m[5], mode: m[3], contact: m[6], target: m[7], home: !!m[8] }])));
  const [editing, setEditing] = useState(null);
  const list = MINI.filter((m) => tab === "all" || cfg[m[0]].mode === tab);
  const available = MINI.filter((m) => cfg[m[0]].on).length;
  return (
    <>
      <Head title="Mini-app catalogue" />
      {editing && (
        <ConfigModal name={editing} cfg={cfg[editing]} onClose={() => setEditing(null)}
          onSave={(v) => { setCfg((c) => ({ ...c, [editing]: v })); toast("Mini-app saved", `${editing} configuration updated for members.`); setEditing(null); }} />
      )}
      <div className="mp-tabsbar"><Seg value={tab} onChange={setTab} items={[["all", "All mini-apps"], ["call", "Call centre"], ["partner", "Partner dispatch"], ["direct", "Direct integration"]]} /><span className="mp-sp" /><span className="mp-small" style={{ color: "var(--ink2)" }}>{available} of {MINI.length} available to members</span></div>
      <div className="mp-rec" style={{ background: "#edf1ed", borderColor: "#c9d6ce", marginBottom: 16, padding: "14px 16px" }}>
        <b style={{ fontSize: 13, fontWeight: 600 }}>Call-centre fulfilment is active for Jetour's demo service bookings</b>
        <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.6 }}>Emergency, Book a Service, Offers and Refer a Friend route to the Jetour call centre. Roadside Assist and Tyre & battery dispatch to Island Recovery. Vehicle, Reminders and Documents sync directly with the dealer system.</p>
      </div>
      <div className="mp-grid3">
        {list.map(([n, I, d]) => {
          const c = cfg[n];
          const [FI, fl] = FUL[c.mode];
          return (
            <div key={n} className="mp-card" style={{ padding: 20 }}>
              <div className="mp-row" style={{ alignItems: "flex-start", gap: 12 }}><span className="mp-sq"><I size={16} /></span><div style={{ flex: 1 }}><b style={{ fontWeight: 600 }}>{n}</b><div className="mp-small" style={{ color: "var(--ink2)" }}>{d}</div></div>
                <Toggle on={c.on} onClick={() => { setCfg((o) => ({ ...o, [n]: { ...o[n], on: !o[n].on } })); toast("Mini-app saved", `${n} configuration updated for members.`); }} /></div>
              <div className="mp-row" style={{ margin: "14px 0 10px", paddingTop: 14, borderTop: "1px solid var(--line2)", flexWrap: "wrap", gap: 6 }}>
                <span className="mp-pill"><FI size={11} />{fl}</span><Pill tone={c.on ? "green" : "slate"} dot={false}>{c.on ? "Live" : "Draft"}</Pill>{c.home && <span className="mp-pill">On home screen</span>}</div>
              <div className="mp-kv" style={{ fontSize: 12, padding: "3px 0" }}><span>Contact</span><span>{c.contact}</span></div>
              <div className="mp-kv" style={{ fontSize: 12, padding: "3px 0" }}><span>Target</span><span>{c.target}</span></div>
              <button className="mp-btn" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => setEditing(n)}><SlidersHorizontal size={14} />Configure</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -------------------------------------------------------------- content */

const OFFER_IMG = [
  "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400&q=70",
  "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&q=70",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=70",
];

const BRANCH_INFO = [
  { name: "Port Louis — Head office", address: "Royal Road, Port Louis", phone: "+230 5 700 0100", hours: "Mon–Fri 08:00–17:30 · Sat 08:30–12:30", manager: "N. Appadoo", bays: "4" },
  { name: "Curepipe", address: "Royal College Street, Curepipe", phone: "+230 5 700 0120", hours: "Mon–Fri 08:30–17:00 · Sat closed", manager: "L. Ramsamy", bays: "3" },
  { name: "Quatre Bornes", address: "St Jean Road, Quatre Bornes", phone: "+230 5 700 0130", hours: "Mon–Fri 08:00–17:00 · Sat 09:00–13:00", manager: "S. Beeharry", bays: "2" },
  { name: "Ébène", address: "Rue de la Démocratie, Ébène", phone: "+230 5 700 0140", hours: "Mon–Fri 07:30–18:00 · Sat 08:00–13:00", manager: "R. Domingue", bays: "6" },
];

function BranchModal({ branch, onClose, onSave }) {
  const [v, setV] = useState(branch);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const fields = [["address", "Address"], ["phone", "Phone"], ["hours", "Operating hours"], ["bays", "Service bays"]];
  const ok = fields.every(([k]) => String(v[k]).trim());
  return (
    <div className="mp-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mp-modal" style={{ width: 510 }} role="dialog" aria-modal="true" aria-label="Edit branch information">
        <div className="mh" style={{ paddingRight: 56 }}>
          <h4>Edit branch information</h4>
          <p>{branch.name}</p>
          <button onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="mb" style={{ paddingTop: 18, paddingBottom: 18 }}>
          {fields.map(([k, label], i) => (
            <div key={k} style={{ marginTop: i ? 16 : 0 }}>
              <label htmlFor={`mp-br-${k}`} style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{label}</label>
              <input id={`mp-br-${k}`} className="mp-input" value={v[k]} type={k === "bays" ? "number" : "text"} min={k === "bays" ? 0 : undefined}
                onChange={(e) => setV((s) => ({ ...s, [k]: e.target.value }))} />
            </div>
          ))}
        </div>
        <div className="mf">
          <button className="mp-btn ghost" onClick={onClose}>Cancel</button>
          <button className="mp-btn pri" disabled={!ok} onClick={() => onSave(v)}>Save branch</button>
        </div>
      </div>
    </div>
  );
}

function Content({ toast }) {
  const [tab, setTab] = useState("offers");
  const [pub, setPub] = useState({});
  const [ref, setRef] = useState({ enabled: 1, sms: 1, approve: 1 });
  const [preview, setPreview] = useState(null);
  const [branches, setBranches] = useState(BRANCH_INFO);
  const [editBranch, setEditBranch] = useState(null);
  const publishOffer = (id, t) => { setPub((p) => ({ ...p, [id]: 1 })); toast("Offer published", `${t} is now live for members.`); };
  useEffect(() => {
    if (!preview) return;
    const k = (e) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [preview]);
  return (
    <>
      <Head title="Content & engagement" />
      {preview && (
        <div className="mp-ov" onMouseDown={(e) => e.target === e.currentTarget && setPreview(null)}>
          <div className="mp-modal" style={{ width: 448 }} role="dialog" aria-modal="true" aria-label="Member preview">
            <div className="mh" style={{ paddingRight: 64 }}>
              <h4>Member preview</h4>
              <p style={{ lineHeight: 1.6 }}>Exactly what the member sees in the mini-app before the offer is published.</p>
              <button onClick={() => setPreview(null)} aria-label="Close"><X size={16} /></button>
            </div>
            <div className="mb" style={{ paddingTop: 18 }}>
              <div style={{ width: 300, margin: "0 auto", border: "5px solid #2f2f2f", borderRadius: 18, overflow: "hidden", background: "#f6f6f2", padding: "0 6px 8px" }}>
                <div className="mp-row" style={{ gap: 8, padding: "10px 8px 8px" }}>
                  <span className="mp-logo" style={{ width: 24, height: 24, fontSize: 9, borderRadius: 5 }}>JT</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600 }}>Jetour Mauritius</span>
                </div>
                <div style={{ height: 132, margin: "0 -6px", backgroundImage: `url(${preview.img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#e7e4dc" }} />
                <div style={{ padding: "12px 6px 0" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{preview.t}</div>
                  <div style={{ fontSize: 11, color: "var(--ink2)", marginTop: 4, lineHeight: 1.6 }}>{preview.d}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink2)", marginTop: 8 }}>{preview.w}</div>
                  <button className="mp-btn pri" style={{ width: "100%", justifyContent: "center", height: 29, fontSize: 11.5, fontWeight: 600, marginTop: 10 }}>Claim offer</button>
                </div>
              </div>
              <p style={{ fontSize: 11.5, color: "var(--ink2)", lineHeight: 1.65, margin: "18px 0 0" }}>Preview uses the demo member profile. Personal reminders are excluded from all member-facing previews.</p>
            </div>
            <div className="mf">
              <button className="mp-btn ghost" onClick={() => setPreview(null)}>Close</button>
              {pub[preview.id] || preview.live
                ? <button className="mp-btn pri" disabled><Check size={14} />Live</button>
                : <button className="mp-btn pri" onClick={() => { publishOffer(preview.id, preview.t); setPreview(null); }}><Send size={14} />Publish offer</button>}
            </div>
          </div>
        </div>
      )}
      <div className="mp-tabsbar"><Seg value={tab} onChange={setTab} items={[["offers", "Offers", 3], ["branch", "Branch information"], ["care", "Customer care"], ["ref", "Referral settings"]]} /><span className="mp-sp" />
        {tab === "offers" && <button className="mp-btn pri"><Plus size={14} />New offer</button>}</div>

      {tab === "offers" && [["Summer service check", "Live", "OF-331", "Complimentary 25-point check with any paid service before 15 December.", "All activated members · Mauritius", "1 Nov – 15 Dec 2025", 148],
        ["Tyres at member price", "Scheduled", "OF-329", "20% off a set of four tyres, fitted at any Jetour branch.", "Members with a vehicle over 3 years", "15 Nov – 31 Jan 2026", 0],
        ["Referral credit", "Draft", "OF-326", "MUR 2,000 service credit for every friend who buys a Jetour.", "Activated members", "Ongoing", 0]].map(([t, s, id, d, a, w, r], i) => {
        const st = pub[id] ? "Live" : s;
        return (
          <div key={id} className="mp-card mp-row" style={{ alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
            <div className="mp-img" style={{ backgroundImage: `url(${OFFER_IMG[i]})`, backgroundColor: "#e7e4dc" }} />
            <div style={{ flex: 1 }}>
              <div className="mp-row"><b style={{ fontWeight: 600 }}>{t}</b><Pill>{st}</Pill><span className="mp-small mp-mute">{id}</span></div>
              <div style={{ fontSize: 13, color: "var(--ink2)", margin: "4px 0 8px" }}>{d}</div>
              <div className="mp-row mp-small" style={{ gap: 24 }}><span><span className="mp-mute">Audience</span>&nbsp; {a}</span><span><span className="mp-mute">Window</span>&nbsp; {w}</span><span><span className="mp-mute">Redemptions</span>&nbsp; {r}</span></div>
              <div className="mp-row" style={{ marginTop: 12 }}><button className="mp-btn" onClick={() => setPreview({ t, id, d, w, img: OFFER_IMG[i], live: s === "Live" })}><Eye size={14} />Preview as member</button>
                {st === "Live" ? <span className="mp-row mp-small mp-mute"><Send size={13} />Live</span> : <button className="mp-btn pri" onClick={() => publishOffer(id, t)}><Send size={14} />Publish</button>}</div>
            </div>
          </div>
        );
      })}

      {tab === "care" && (
        <div className="mp-grid2e" style={{ alignItems: "start" }}>
          <div className="mp-card"><h3>Customer-care contacts</h3><p className="desc">Used across mini-apps, SMS footers and the help sheet.</p>
            {[["Emergency desk (24/7)", "Always routed to a senior agent", "+230 5 700 0100"], ["Roadside dispatch", "Partner line: Island Recovery", "+230 5 700 0155"], ["Service bookings", "Call centre fulfilment for service bookings", "+230 5 700 0120"], ["Member-care email", "Replies within one working day", "care@jetour.mu"]].map(([t, d, v]) => (
              <div key={t} className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{t}</div><div className="mp-small mp-mute">{d}</div></div><span className="mp-small">{v}</span></div>))}</div>
          <div className="mp-card"><h3>Member messaging hours</h3><p className="desc">Outside these hours members see an out-of-hours notice with the emergency line.</p>
            <div className="mp-field" style={{ marginTop: 14 }}><label>Care desk hours</label><input className="mp-input" defaultValue="Mon–Fri 08:00–18:00 · Sat 08:30–13:00" /></div>
            <div className="mp-field"><label>Out-of-hours notice</label><textarea className="mp-input" style={{ height: 70, padding: 10 }} defaultValue="Our care desk is closed. For emergencies, call the 24/7 assistance line and we will respond immediately." /></div>
            <div className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Show emergency line out of hours</div><div className="mp-small mp-mute">Always visible, cannot be turned off for emergencies.</div></div><Toggle on /></div></div>
        </div>
      )}

      {tab === "branch" && (
        <div className="mp-card">
          <h3>Branch information</h3><p className="desc">Shown in the mini-app branch finder, on booking confirmations and on the public site.</p>
          <table className="mp-tbl" style={{ marginTop: 14 }}>
            <thead><tr>{["BRANCH", "ADDRESS", "PHONE", "HOURS", "MANAGER", "EDIT"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {branches.map((b, i) => (
                <tr key={b.name}>
                  <td>{b.name}</td>
                  <td style={{ color: "var(--ink2)" }}>{b.address}</td>
                  <td style={{ color: "var(--ink2)" }}>{b.phone}</td>
                  <td style={{ color: "var(--ink2)" }}>{b.hours}</td>
                  <td style={{ color: "var(--ink2)" }}>{b.manager}</td>
                  <td style={{ paddingRight: 0 }}><button className="mp-btn" style={{ height: 31 }} onClick={() => setEditBranch(i)}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editBranch != null && (
        <BranchModal branch={branches[editBranch]} onClose={() => setEditBranch(null)}
          onSave={(v) => { setBranches((bs) => bs.map((b, i) => (i === editBranch ? v : b))); toast("Branch saved", `${v.name} · members see the update in the branch finder.`); setEditBranch(null); }} />
      )}

      {tab === "ref" && (
        <div className="mp-grid2" style={{ alignItems: "start" }}>
          <div className="mp-card"><h3>Referral settings</h3><p className="desc">Controls the Refer a Friend mini-app and the reward credited to the referring member.</p>
            <div className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Programme enabled</div><div className="mp-small mp-mute">Members can invite friends from the mini-app.</div></div><Toggle on={!!ref.enabled} onClick={() => setRef((r) => ({ ...r, enabled: !r.enabled }))} /></div>
            <div className="mp-grid2e" style={{ marginTop: 12 }}><div className="mp-field"><label>Reward per referral (MUR)</label><input className="mp-input" defaultValue="2,000" /></div><div className="mp-field"><label>Maximum rewards per member / year</label><input className="mp-input" defaultValue="5" /></div></div>
            <div className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Notify the referrer by SMS</div><div className="mp-small mp-mute">When the referred friend completes a purchase.</div></div><Toggle on={!!ref.sms} onClick={() => setRef((r) => ({ ...r, sms: !r.sms }))} /></div>
            <div className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>Call-centre approval required</div><div className="mp-small mp-mute">A supervisor approves the reward before it is issued.</div></div><Toggle on={!!ref.approve} onClick={() => setRef((r) => ({ ...r, approve: !r.approve }))} /></div>
            <button className="mp-btn pri" style={{ marginTop: 12 }} onClick={() => toast("Referral settings saved", "Changes apply to new referrals.")}>Save settings</button></div>
          <div className="mp-card"><h3>Programme summary</h3><p className="desc">Last 90 days</p>
            {[["Invitations sent", "184"], ["Friends who purchased", "37"], ["Rewards issued", "MUR 74,000"], ["Awaiting approval", "4"]].map(([k, v]) => <div key={k} className="mp-kv" style={{ borderBottom: "1px solid var(--line2)" }}><span>{k}</span><b style={{ fontWeight: 600 }}>{v}</b></div>)}</div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------ analytics */

const BRANCH_STATS = [["Port Louis", 312, "2m 12s", "1h 38m", "72%"], ["Curepipe", 241, "2m 55s", "1h 52m", "66%"], ["Quatre Bornes", 188, "3m 24s", "2h 04m", "61%"], ["Ébène", 208, "2m 08s", "1h 41m", "70%"]];

function Analytics({ toast }) {
  const [p, setP] = useState("30");
  const [branch, setBranch] = useState("All branches");
  const focused = BRANCH_STATS.find((r) => r[0] === branch);
  const focus = (b) => {
    setBranch(b);
    toast("Branch focused", `Analytics now show ${b} only.`);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Head title="Analytics" />
      <div className="mp-card" style={{ padding: 12, marginBottom: 16 }}>
        <Seg value={p} onChange={setP} items={[["7", "Last 7 days"], ["30", "Last 30 days"], ["90", "Last 90 days"]]} />
        <select className="mp-sel" style={{ width: "100%", marginTop: 10 }} value={branch} onChange={(e) => setBranch(e.target.value)}>
          {["All branches", ...BRANCH_STATS.map((r) => r[0])].map((b) => <option key={b}>{b}</option>)}
        </select>
        <div className="mp-row" style={{ marginTop: 8 }}><button className="mp-btn ghost" style={{ paddingLeft: 0, fontWeight: 500 }}>Metric definitions</button><span className="mp-sp" /><button className="mp-btn" onClick={() => toast("Export started", `Analytics CSV for ${branch.toLowerCase() === "all branches" ? "all branches" : branch} is downloading.`)}><Download size={14} />Export</button></div>
      </div>
      <div className="mp-stats">
        {[["Requests", focused ? String(focused[1]) : "949", `Last ${p} days · ${branch}`], ["Median first response", focused ? focused[2] : "2m 41s", "Target 3m 00s"], ["Resolution time", focused ? focused[3] : "1h 46m", "Excludes awaiting member"], ["Booking conversion", focused ? focused[4] : "68%", "Confirmed / requested"], ["Missed appointments", "14", "3 branches recording"], ["Activation rate", "48%", "Vehicle linked / sold"]].map(([l, v, n]) => (
          <div key={l} className="mp-stat" style={{ minHeight: 126 }}><div className="lbl">{l}</div><div className="val" style={{ margin: "4px 0" }}>{v}</div><div className="note mp-small">{n}</div></div>
        ))}
      </div>
      <div className="mp-grid2e" style={{ gridTemplateColumns: "1.3fr 1fr", marginBottom: 16 }}>
        <div className="mp-card"><h3>Activation funnel</h3><p className="desc">From vehicle sold to the member's first request.</p>
          {[["01", "Vehicles sold in dealer system", "1,284", 100], ["02", "Invitation SMS delivered", "1,102", 86], ["03", "Mini-app opened", "764", 60], ["04", "Registration completed", "611", 48], ["05", "Vehicle linked", "578", 45], ["06", "First request created", "402", 31]].map(([i, l, v, pc]) => (
            <div key={i} style={{ marginTop: 12 }}><div className="mp-row" style={{ fontSize: 12.5 }}><span className="mp-mute">{i}</span>{l}<span className="mp-sp" />{v} · {pc}%</div><Bar pct={pc} /></div>))}</div>
        <div className="mp-card"><h3>Request volume by service</h3><p className="desc">Volume and median first response per service.</p>
          {[["Service booking", 386, "1m 48s"], ["Roadside assist", 214, "1m 12s"], ["Emergency assistance", 118, "0m 41s"], ["Tyre & battery", 96, "2m 05s"], ["Vehicle pick-up", 71, "3m 22s"], ["Renewal reminder", 64, "4m 10s"]].map(([l, v, t]) => (
            <div key={l} style={{ marginTop: 12 }}><div className="mp-row" style={{ fontSize: 12.5 }}>{l}<span className="mp-sp" />{v} · {t}</div><Bar pct={(v / 386) * 100} /></div>))}</div>
      </div>
      <div className="mp-grid3" style={{ marginBottom: 16 }}>
        <div className="mp-card"><h3>App usage by platform</h3><p className="desc">Sessions in the selected period.</p>
          {[["iOS", 42], ["Android", 34], ["Mobile PWA", 18, "#a9aca8"], ["Desktop web", 6]].map(([l, v, c]) => <div key={l} style={{ marginTop: 12 }}><div className="mp-row" style={{ fontSize: 12.5 }}>{l}<span className="mp-sp" />{v}%</div><Bar pct={v / 0.42} tone={c} /></div>)}
          <p className="mp-small mp-mute" style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line2)" }}>Desktop web is used mostly by branch staff, not members.</p></div>
        <div className="mp-card"><h3>Response and resolution</h3><p className="desc">Median times per week, last four weeks.</p>
          {[[45, "3.4m", "2.10h"], [46, "3.0m", "1.90h"], [47, "2.8m", "1.85h"], [48, "2.7m", "1.76h"]].map(([w, f, r]) => (
            <div key={w} className="mp-row" style={{ marginTop: 12, fontSize: 11.5 }}><span style={{ width: 56, fontSize: 12.5, color: "var(--ink2)" }}>Week {w}</span>
              <div style={{ flex: 1 }}><div className="mp-row mp-mute">First response {f}<span className="mp-sp" />Resolve {r}</div><div className="mp-row" style={{ gap: 4 }}><div className="mp-bar" style={{ flex: 1 }}><i style={{ width: "100%" }} /></div><div className="mp-bar" style={{ flex: 1.1 }}><i style={{ width: "100%", background: "#d6d8d4" }} /></div></div></div></div>))}
          <p className="mp-small mp-mute" style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line2)" }}>First response improved 21% over four weeks after emergencies moved to the top of the queue.</p></div>
        <div className="mp-card"><h3>Cross-tenant view</h3><p className="desc">Compare the tenants you administer.</p>
          {[["Jetour Mauritius", "949 requests", "Activation 48% · first response 2m 41s"], ["Mobilis Privé (internal)", "1204 requests", "Activation 61% · first response 3m 02s"], ["UAT sandbox", "36 requests", "Activation 12% · first response 1m 55s"]].map(([n, r, d]) => (
            <div key={n} className="mp-rec" style={{ marginTop: 10, padding: "10px 12px" }}><div className="mp-row"><span style={{ fontSize: 13 }}>{n}</span><span className="mp-sp" /><span className="mp-small mp-mute">{r}</span></div><div className="mp-small mp-mute">{d}</div></div>))}
          <button className="mp-btn" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => toast("Cross-tenant export queued", "You will receive the CSV by email.")}>Export all tenants <ArrowUpRight size={13} /></button></div>
      </div>
      <div className="mp-card">
        <div className="mp-row"><h3>Branch comparison</h3><span className="mp-sp" /><span className="mp-small mp-mute">Active filter: {branch}</span>
          {focused && <button className="mp-btn ghost" style={{ padding: 0, height: 20, fontSize: 12, marginLeft: 10 }} onClick={() => setBranch("All branches")}>Clear</button>}</div><p className="desc">Last 30 days · bookings, response times and activation by branch.</p>
        <table className="mp-tbl" style={{ marginTop: 14 }}><thead><tr>{["BRANCH", "REQUESTS", "FIRST RESPONSE", "RESOLUTION", "BOOKING CONVERSION", "ACTION"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{BRANCH_STATS.map((r) => (
            <tr key={r[0]} style={branch === r[0] ? { background: "#f3f7f4" } : null}><td style={{ fontWeight: branch === r[0] ? 600 : 400 }}>{r[0]}</td><td style={{ color: "var(--ink2)" }}>{r[1]}</td><td style={{ color: "var(--ink2)" }}>{r[2]}</td><td style={{ color: "var(--ink2)" }}>{r[3]}</td><td style={{ color: "var(--ink2)" }}>{r[4]}</td>
              <td>{branch === r[0]
                ? <span className="mp-row mp-small" style={{ color: "var(--green)", fontWeight: 500, gap: 4 }}><Check size={13} />Focused</span>
                : <button className="mp-btn ghost" style={{ padding: 0, fontWeight: 500 }} onClick={() => focus(r[0])}>Focus branch</button>}</td></tr>))}</tbody></table>
        <p className="mp-small mp-mute" style={{ marginTop: 10 }}>Missed appointments are recorded at Port Louis, Curepipe and Ébène only; Quatre Bornes does not capture them yet.</p>
      </div>
    </>
  );
}

/* -------------------------------------------------------- administration */

function Admin({ toast }) {
  const [tab, setTab] = useState("staff");
  const [susp, setSusp] = useState({});
  const [releases, setReleases] = useState([
    { name: "iOS", version: "3.4.1 · Released 12 Nov 2025", status: "Live", pct: 100, notes: "Emergency location sharing and stability fixes." },
    { name: "Android", version: "3.4.1 · Started 14 Nov 2025", status: "Rolling out", pct: 40, notes: "Staged rollout paused automatically after a crash spike on two devices." },
    { name: "Mobile PWA", version: "2.12.0 · Released 08 Nov 2025", status: "Live", pct: 100, notes: "Home-screen widget refresh and offline documents." },
    { name: "Desktop web", version: "1.9.3 · Submitted 16 Nov 2025", status: "In review", pct: 0, notes: "New analytics export and audit filters." },
  ]);
  const [health, setHealth] = useState([
    { name: "Dealer management system (DMS)", status: "Degraded", meta: "Latency 1.8 s · last sync 6 minutes ago", desc: "Vehicle lookups retrying. Invitation flow is read-only until resolved." },
    { name: "Partner dispatch (Island Recovery)", status: "Healthy", meta: "Latency 240 ms · last sync 40 seconds ago", desc: "Two active dispatches." },
    { name: "SMS gateway", status: "Healthy", meta: "Latency 610 ms · last sync 1 minute ago", desc: "Delivery rate 98.6% over 24 hours." },
    { name: "Notification service", status: "Failed", meta: "Latency — · last sync 42 minutes ago", desc: "Push credentials expired for the Jetour tenant. Reminders paused." },
    { name: "Document vault", status: "Healthy", meta: "Latency 120 ms · last sync 2 minutes ago", desc: "All documents available." },
  ]);
  const [retrying, setRetrying] = useState(null);
  const retry = (name) => {
    setRetrying(name);
    setTimeout(() => {
      setHealth((hs) => hs.map((h) => (h.name === name
        ? { ...h, status: "Healthy", meta: `Latency ${h.meta.match(/Latency ([\d.]+ ?m?s)/)?.[1] || "310 ms"} · last sync just now`, desc: h.status === "Healthy" ? h.desc : "Connection restored. Queued work is being processed." }
        : h)));
      setRetrying(null);
      toast("Connection restored", `${name} is healthy.`);
    }, 900);
  };
  const issues = health.filter((h) => h.status !== "Healthy").length;
  const approve = (name) => {
    setReleases((rs) => rs.map((r) => (r.name === name ? { ...r, status: "Live", pct: 100, version: r.version.replace(/(Started|Submitted) .*/, "Released 17 Nov 2025") } : r)));
    toast("Rollout approved", `${name} is now live for all members.`);
  };
  const staff = [["AM", "Aisha Mohit", "aisha.mohit@jetour.mu", "Tenant administrator", "All branches", "2 minutes ago"], ["ML", "Marc Lemaire", "marc.lemaire@mobilis.mu", "Platform administrator", "All tenants", "18 minutes ago"], ["NA", "Naveen Audibert", "naveen.audibert@jetour.mu", "Supervisor", "Port Louis, Curepipe", "41 minutes ago"], ["PN", "Priya Naidoo", "priya.naidoo@jetour.mu", "Call-centre agent", "Port Louis", "Online"], ["DF", "Daniel Foo", "daniel.foo@jetour.mu", "Call-centre agent", "Curepipe, Ébène", "Online"], ["SR", "Sandra Rivière", "sandra.riviere@jetour.mu", "Call-centre agent", "Quatre Bornes", "3 days ago"]];
  return (
    <>
      <Head title="Administration" />
      <div className="mp-tabsbar"><Seg value={tab} onChange={setTab} items={[["staff", "Staff & roles", 6], ["perm", "Permissions"], ["audit", "Audit history", 8], ["health", "Integration health", issues || null], ["rel", "Releases"]]} /></div>

      {tab === "staff" && (
        <div className="mp-card">
          <div className="mp-row"><div><h3 style={{ fontSize: 15 }}>Staff and roles</h3><p className="desc" style={{ marginTop: 2 }}>Roles limit which workspaces and actions each person can use.</p></div><span className="mp-sp" /><button className="mp-btn pri">Invite staff</button></div>
          <table className="mp-tbl" style={{ marginTop: 14 }}><thead><tr>{["NAME", "ROLE", "BRANCHES", "LAST ACTIVE", "STATUS", "ACTION"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{staff.map(([i, n, e, r, b, l]) => (
              <tr key={n}><td><div className="mp-row"><span className="mp-av" style={{ background: "#eceee9", color: "var(--ink2)", width: 28, height: 28, fontSize: 10 }}>{i}</span><div><div>{n}</div><div className="mp-small mp-mute">{e}</div></div></div></td>
                <td>{r}</td><td style={{ color: "var(--ink2)" }}>{b}</td><td style={{ color: "var(--ink2)" }}>{l}</td><td><Pill tone={susp[n] ? "red" : "green"}>{susp[n] ? "Suspended" : "Active"}</Pill></td>
                <td><button className="mp-btn ghost" style={{ padding: 0 }} onClick={() => { setSusp((s) => ({ ...s, [n]: !s[n] })); toast(susp[n] ? "Access restored" : "Access suspended", `${n} · ${e}`); }}>{susp[n] ? "Restore" : "Suspend"}</button></td></tr>))}</tbody></table>
        </div>
      )}

      {tab === "perm" && (
        <div className="mp-card">
          <h3 style={{ fontSize: 15 }}>Permissions matrix</h3>
          <p className="desc" style={{ marginTop: 4, fontSize: 12 }}>Read-only overview of what each role can do in this tenant.</p>
          <table className="mp-tbl" style={{ marginTop: 16, fontSize: 12.5 }}>
            <thead><tr>
              <th style={{ width: "38%" }}>CAPABILITY</th>
              {["PLATFORM ADMIN", "TENANT ADMIN", "SUPERVISOR", "AGENT"].map((h) => <th key={h} style={{ textAlign: "center" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[["View operations dashboard", 1, 1, 1, 1], ["Claim and reassign cases", 1, 1, 1, 1], ["Confirm booking slots", 1, 1, 1, 1], ["Invite members (dealer lookup)", 1, 1, 1, 0],
                ["Edit tenant brand & branches", 1, 1, 0, 0], ["Publish mini-app changes", 1, 1, 0, 0], ["Publish offers & content", 1, 1, 0, 0], ["View branch analytics", 1, 1, 1, 0],
                ["Cross-tenant analytics", 1, 0, 0, 0], ["Manage staff & permissions", 1, 1, 0, 0], ["Approve releases", 1, 0, 0, 0]].map(([a, ...v]) => (
                <tr key={a}>
                  <td style={{ padding: "11px 0" }}>{a}</td>
                  {v.map((x, i) => (
                    <td key={i} style={{ textAlign: "center", padding: "11px 0" }}>
                      {x ? <Check size={14} strokeWidth={2} color="var(--ink2)" aria-label="Allowed" />
                        : <Lock size={13} strokeWidth={1.6} color="#a3a6a2" aria-label="Not allowed" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "audit" && (
        <div className="mp-card"><div className="mp-row"><div><h3>Audit history</h3><p className="desc">Every member-facing change and permission event for the tenant.</p></div><span className="mp-sp" /><input className="mp-input" style={{ width: 220 }} placeholder="Filter by actor, action or case" /></div>
          {[["Priya Naidoo", "Confirmed booking slot", "JT-2482 · Tenant Admin · IP 196.20.14.8", "Today 09:42"], ["Priya Naidoo", "Updated member-facing status", "JT-2479 · Open → Awaiting member · IP 196.20.14.8", "Today 09:31"], ["System", "Recovery dispatch accepted", "JT-2478 · Island Recovery · IP internal", "Today 09:12"], ["Aisha Mohit", "Published notification template", "Booking confirmation · SMS · IP 196.20.15.21", "Today 08:56"], ["Aisha Mohit", "Changed mini-app availability", "Chat with Us → unavailable · IP 196.20.15.21", "Today 08:40"], ["Marc Lemaire", "Viewed cross-tenant analytics", "All tenants · IP 41.212.0.4", "Yesterday 17:32"], ["Daniel Foo", "Confirmed booking slot", "JT-2468 · Olivier Sénèque · IP 196.20.14.9", "Yesterday 16:20"], ["Marc Lemaire", "Rolled out Android release", "5.4.1 · 40% staged rollout · IP 41.212.0.4", "Yesterday 10:05"]].map(([a, t, d, w]) => (
            <div key={d} className="mp-li"><div style={{ flex: 1 }}><div style={{ fontSize: 13 }}><b style={{ fontWeight: 500 }}>{a}:</b> {t}</div><div className="mp-small mp-mute">{d}</div></div><span className="mp-small mp-mute">{w}</span></div>))}</div>
      )}

      {tab === "health" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12, alignItems: "start" }}>
          {health.map((h) => (
            <div key={h.name} className="mp-card" style={{ padding: "20px 20px 20px" }}>
              <div className="mp-row" style={{ alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div className="mp-row" style={{ gap: 6, fontSize: 14, fontWeight: 600 }}>
                    {h.status === "Failed" && <TriangleAlert size={16} color="var(--red)" />}{h.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 4 }}>{h.meta}</div>
                </div>
                <Pill>{h.status}</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ink2)", margin: "16px 0 14px" }}>{h.desc}</p>
              <div className="mp-row" style={{ gap: 8 }}>
                <button className="mp-btn" style={{ height: 32 }} disabled={retrying === h.name} onClick={() => retry(h.name)}>
                  <RefreshCw size={14} style={retrying === h.name ? { animation: "mp-spin 0.8s linear infinite" } : null} />{retrying === h.name ? "Retrying…" : "Retry connection"}
                </button>
                <button className="mp-btn ghost" style={{ height: 32 }}>View details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "rel" && (
        <div className="mp-card">
          <h3>Release overview</h3>
          <p className="desc">Channel status for the member mini-app. Approvals are limited to platform administrators.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12, marginTop: 16 }}>
            {releases.map((r) => {
              const live = r.status === "Live";
              const tone = r.status === "Rolling out" ? "#e3a21a" : r.status === "In review" ? "#b3b5b1" : "var(--pri)";
              return (
                <div key={r.name} style={{ border: "1px solid var(--line)", borderRadius: 10, background: "#fff", padding: "20px 20px 12px" }}>
                  <div className="mp-row" style={{ alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 4 }}>{r.version}</div>
                    </div>
                    <Pill>{r.status}</Pill>
                  </div>
                  <div className="mp-row" style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 18 }}>Rollout<span className="mp-sp" /><span style={{ color: "var(--ink)" }}>{r.pct ? `${r.pct}%` : "Internal"}</span></div>
                  <div style={{ height: 6, borderRadius: 3, background: "#efefea", marginTop: 6, overflow: "hidden" }}>
                    <div style={{ width: `${r.pct || 24}%`, height: "100%", background: tone, borderRadius: 3, transition: "width .3s" }} />
                  </div>
                  <p style={{ fontSize: 12, color: "var(--ink2)", margin: "14px 0 14px" }}>{r.notes}</p>
                  <div className="mp-row" style={{ gap: 6 }}>
                    <button className="mp-btn" style={{ height: 32, ...(live ? { color: "#b5b8b4", borderColor: "#ebebe7", cursor: "default" } : null) }} disabled={live}
                      onClick={() => approve(r.name)}>Approve rollout</button>
                    <button className="mp-btn ghost" style={{ height: 32 }}>Release notes</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ shell */

export default function MobilisPrive() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("Platform administrator");
  const [bell, setBell] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toast = (title, body) => {
    const id = Math.random();
    setToasts((t) => [...t.slice(-2), { id, title, body }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  };
  const go = (p) => { setPage(p); setBell(false); window.scrollTo?.({ top: 0 }); };
  useEffect(() => { const item = NAV.flatMap((g) => g.items).find((i) => i.id === page); document.title = `${item.label} · Mobilis Privé`; }, [page]);

  const P = { dashboard: Dashboard, queue: Queue, members: Members, memberapp: MemberApp, workshop: Workshop, setup: Setup, miniapps: MiniApps, content: Content, analytics: Analytics, admin: Admin }[page];

  return (
    <div className="mp">
      <style>{CSS}</style>
      <aside className="mp-side">
        <div className="mp-brand"><span className="mp-logo">MP</span><div><b>Mobilis Privé</b><small>MEMBER SERVICES</small></div></div>
        <nav className="mp-nav">
          {NAV.map((g) => (
            <div key={g.group} className="mp-grp"><h6>{g.group}</h6>
              {g.items.map((it) => (
                <button key={it.id} className={`mp-ni ${page === it.id ? "on" : ""}`} onClick={() => go(it.id)}>
                  <it.icon size={15} strokeWidth={1.7} />{it.label}{it.badge && <span className="mp-badge">{it.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="mp-demo"><b>Demo environment</b><p>Jetour Mauritius demo data. No live member records are shown.</p></div>
      </aside>
      <div className="mp-main">
        <header className="mp-top">
          <div className="mp-tenant"><span className="jt">JT</span><div style={{ flex: 1 }}><b>Jetour Mauritius</b><small>ACTIVE TENANT · MAURITIUS</small></div><ChevronDown size={14} /></div>
          <div className="mp-search"><Search size={15} /><input placeholder="Search members, registrations, VIN, case ID…" /><span className="mp-kbd">⌘K</span></div>
          <span className="mp-sp" />
          <div style={{ position: "relative" }}>
            <button className="mp-iconbtn" onClick={() => setBell((b) => !b)}><Bell size={16} /><span className="dot" /></button>
            {bell && (
              <div className="mp-pop">
                <div className="hd">INTEGRATION ALERTS <span className="mp-pill red" style={{ height: 17 }}>2</span></div>
                <div className="it"><div className="mp-row"><CircleAlert size={14} color="#b45309" />Dealer management system (DMS)</div><p>Vehicle lookups retrying. Invitation flow is read-only until resolved.</p></div>
                <div className="it"><div className="mp-row"><CircleAlert size={14} color="var(--red)" />Notification service</div><p>Push credentials expired for the Jetour tenant. Reminders paused.</p></div>
                <button className="it" style={{ width: "100%", textAlign: "left", border: 0, background: "#fafaf7", fontWeight: 500 }} onClick={() => go("admin")}>Open integration health</button>
              </div>
            )}
          </div>
          <span className="mp-role">ROLE</span>
          <select className="mp-sel" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: 170 }}><option>Platform administrator</option><option>Tenant administrator</option><option>Supervisor</option><option>Call-centre agent</option></select>
          <div className="mp-me"><span className="mp-av">AM</span><div><b>Aisha Mohit</b><small>Jetour Mauritius</small></div></div>
        </header>
        <main className="mp-page"><P go={go} toast={toast} /></main>
      </div>
      <div className="mp-toasts">
        {toasts.map((t) => (
          <div key={t.id} className="mp-toast"><CircleCheck size={17} /><div><b>{t.title}</b><p>{t.body}</p></div><button onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}><X size={14} /></button></div>
        ))}
      </div>
    </div>
  );
}
