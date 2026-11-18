import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutGrid, Car, CalendarPlus, ClipboardList, Bell, FileText, BadgePercent, User,
  LifeBuoy, Phone, MessageCircle, LogOut, ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  Wrench, ShieldCheck, Gauge, Download, Share2, Pencil, Trash2, Plus, List, Calendar, X,
  Upload, Search, Eye, EyeOff, MapPin, Clock, Copy, Gift, Mail, ExternalLink, Smartphone, Monitor,
  Check, CheckCircle2, AlertCircle, Info, Sparkles, Camera, ImagePlus, Crosshair, ShieldAlert,
  Lock, CalendarCheck, Tablet, Loader2,
} from "lucide-react";

import imgTiggo from "./assets/jetour/tiggo.jpg";
import imgDashing from "./assets/jetour/dashing.jpg";
import imgOfferHealth from "./assets/jetour/offer-health.jpg";
import imgOfferBrakes from "./assets/jetour/offer-brakes.jpg";
import imgOfferFilter from "./assets/jetour/offer-filter.jpg";

/* ════════════════════════════════════════════════════════════════════
   Jetour Mauritius — Member Portal (desktop client)
   Template recreated from clientdesktop.mp4
   ════════════════════════════════════════════════════════════════════ */

const TODAY = new Date(2026, 10, 17);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const pad = (n) => String(n).padStart(2, "0");
const parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmt = (s) => { const d = typeof s === "string" ? parseISO(s) : s; return `${pad(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const daysUntil = (s) => Math.round((parseISO(s) - TODAY) / 86400000);
const inDays = (s) => { const n = daysUntil(s); return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `In ${n} days`; };

/* ─────────────────────────── seed data ─────────────────────────── */

const SEED_VEHICLES = [
  {
    id: "v1", reg: "2341 JU", model: "Jetour Tiggo 7 Pro", short: "Tiggo 7 Pro", trim: "2.0T Executive · automatic",
    img: imgTiggo, serviceDue: "2026-12-12", serviceLabel: "Major service — 60,000 km", nextService: "60,000 km service",
    mileage: "48,320 km", warranty: "2028-03-15", warrantyShort: "Mar 2028", year: 2022, vin: "LVTDB21B0ND123456",
    colour: "Polar white", fuel: "Petrol", transmission: "7-speed DCT", primary: true, history: 6, docs: 5,
    covered: "48,320 km of 100,000 km covered · 51,680 km remaining",
  },
  {
    id: "v2", reg: "5518 JU", model: "Jetour Dashing", short: "Dashing", trim: "1.5T Prime · automatic",
    img: imgDashing, serviceDue: "2027-02-04", serviceLabel: "10,000 km service", nextService: "10,000 km service",
    mileage: "19,850 km", warranty: "2029-08-02", warrantyShort: "Aug 2029", year: 2024, vin: "LVTDB21B0RD778812",
    colour: "Graphite grey", fuel: "Petrol", transmission: "6-speed DCT", primary: false, history: 3, docs: 3,
    covered: "19,850 km of 100,000 km covered · 80,150 km remaining",
  },
];

const SERVICE_HISTORY = {
  v1: [
    { date: "2026-11-14", title: "Scheduled maintenance (60,000 km)", branch: "Quatre Bornes — head office", ref: "JTM-2418-072", km: "48,320 km" },
    { date: "2026-06-20", title: "40,000 km service", branch: "Quatre Bornes — head office", ref: "JTM-1987-204", km: "40,110 km" },
    { date: "2026-05-04", title: "Tyres and alignment", branch: "Curepipe", ref: "JTM-2104-055", km: "37,880 km" },
    { date: "2025-11-02", title: "30,000 km service", branch: "Quatre Bornes — head office", ref: "JTM-1544-310", km: "30,240 km" },
    { date: "2024-12-09", title: "20,000 km service", branch: "Port Louis", ref: "JTM-1102-087", km: "20,060 km" },
    { date: "2023-12-01", title: "First year service", branch: "Quatre Bornes — head office", ref: "JTM-0711-019", km: "10,150 km" },
  ],
  v2: [
    { date: "2026-09-02", title: "Repairs and diagnostics (air conditioning)", branch: "Curepipe", ref: "JTM-2290-118", km: "17,420 km" },
    { date: "2025-08-02", title: "First year service", branch: "Quatre Bornes — head office", ref: "JTM-1611-402", km: "9,880 km" },
    { date: "2024-08-02", title: "Pre-delivery inspection", branch: "Quatre Bornes — head office", ref: "JTM-1288-006", km: "12 km" },
  ],
};

const SEED_REQUESTS = [
  {
    id: "JTM-2418-072", title: "Scheduled maintenance (60,000 km)", vehicleId: "v1", submitted: "2026-11-14", time: "09:12",
    device: "iPhone", branch: "Quatre Bornes", branchFull: "Quatre Bornes — head office", stage: 1,
    note: "Major service due at 60,000 km. Please also check a light vibration through the steering wheel at around 90 km/h, and the air-con is a little weak on the passenger side.",
    slots: [{ date: "2026-11-24", win: "Morning" }, { date: "2026-11-26", win: "Afternoon" }, { date: "2026-12-01", win: "Morning" }],
    advisor: "Navin Ramdhony",
  },
  {
    id: "JTM-2290-118", title: "Repairs and diagnostics (air conditioning)", vehicleId: "v2", submitted: "2026-09-02", time: "10:04",
    device: "Android", branch: "Curepipe", branchFull: "Curepipe", stage: 4,
    note: "Air conditioning blows warm on the passenger side since last week. It gets worse when the car is standing in traffic.",
    slots: [{ date: "2026-09-09", win: "Morning" }], advisor: "Sheetal Bundhoo",
  },
  {
    id: "JTM-2104-055", title: "Tyres and alignment", vehicleId: "v1", submitted: "2026-05-04", time: "08:41",
    device: "Desktop", branch: "Curepipe", branchFull: "Curepipe", stage: 4,
    note: "Front tyres are wearing on the inside edge. Please check alignment and quote for two new tyres.",
    slots: [{ date: "2026-05-08", win: "Morning" }], advisor: "Sheetal Bundhoo",
  },
];

const SEED_REMINDERS = [
  { id: "r1", kind: "personal", title: "Collect the spare key from Curepipe", date: "2026-11-19", note: "Reception keeps it for seven days.", shared: false },
  { id: "r2", kind: "personal", title: "School run swap with Priya", date: "2026-11-21", note: "", shared: true },
  { id: "r3", kind: "personal", title: "Book tyre rotation before the December trip", date: "2026-11-28", note: "Rakesh can fit it in on a Saturday morning at Quatre Bornes.", shared: false },
  { id: "r4", kind: "vehicle", vehicleId: "v1", title: "Major service due — 60,000 km", date: "2026-12-12", note: "Book before this date to keep the warranty conditions valid.", shared: true },
  { id: "r5", kind: "vehicle", vehicleId: "v1", title: "Insurance renewal — Tiggo 7 Pro", date: "2027-01-01", note: "Policy renewal with the broker; documents must be uploaded to your file.", shared: false },
  { id: "r6", kind: "vehicle", vehicleId: "v2", title: "Road tax renewal — Dashing", date: "2027-01-31", note: "", shared: false },
  { id: "r7", kind: "vehicle", vehicleId: "v2", title: "Dashing — first year service", date: "2027-02-04", note: "", shared: false },
  { id: "r8", kind: "vehicle", vehicleId: "v1", title: "Warranty ends — Tiggo 7 Pro", date: "2028-03-15", note: "3 years / 100,000 km manufacturer warranty ends on this date.", shared: false },
];

const SEED_DOCS = [
  { id: "d1", name: "Invoice — JTM-2418-072.pdf", size: "168 KB", vehicleId: "v1", type: "Invoice", date: "2026-11-17", ref: "D-PQD4NN2" },
  { id: "d2", name: "Invoice — 40,000 km service.pdf", size: "184 KB", vehicleId: "v1", type: "Invoice", date: "2026-06-20", ref: "D-K82LM0Q" },
  { id: "d3", name: "Warranty certificate.pdf", size: "96 KB", vehicleId: "v1", type: "Warranty", date: "2023-03-15", ref: "D-W4R7C11" },
  { id: "d4", name: "Vehicle registration certificate.pdf", size: "212 KB", vehicleId: "v1", type: "Registration", date: "2023-04-10", ref: "D-RG2341J" },
  { id: "d5", name: "Insurance certificate 2026.pdf", size: "148 KB", vehicleId: "v1", type: "Insurance", date: "2026-01-01", ref: "D-INS2026" },
  { id: "d6", name: "Invoice — air-con repair.pdf", size: "156 KB", vehicleId: "v2", type: "Invoice", date: "2026-09-09", ref: "D-AC0918X" },
  { id: "d7", name: "Pre-delivery inspection.pdf", size: "230 KB", vehicleId: "v2", type: "Inspection", date: "2024-08-02", ref: "D-PDI5518" },
  { id: "d8", name: "Roadworthiness certificate.pdf", size: "118 KB", vehicleId: "v2", type: "Compliance", date: "2026-07-18", ref: "D-RW7718A" },
];

const BRANCHES = [
  { name: "Quatre Bornes — head office", short: "Quatre Bornes", addr: "Royal Road, Quatre Bornes", hours: "Mon – Fri 08:00 – 17:30 · Sat 08:30 – 13:00", extra: "Sales, service and the main parts store.", phone: "+230 555 0142" },
  { name: "Curepipe", short: "Curepipe", addr: "12 Sir Winston Churchill Street, Curepipe", hours: "Mon – Fri 08:00 – 17:00 · Sat 08:30 – 12:30", phone: "+230 555 0188" },
  { name: "Port Louis", short: "Port Louis", addr: "4 Desforges Street, Port Louis", hours: "Mon – Fri 08:00 – 17:00", phone: "+230 555 0173" },
  { name: "Phoenix", short: "Phoenix", addr: "Phoenix industrial zone, near the motorway junction", hours: "Mon – Fri 08:00 – 17:00 · Sat 08:30 – 12:30", phone: "+230 555 0195" },
  { name: "Moka", short: "Moka", addr: "Bagatelle, Moka", hours: "Mon – Sat 09:00 – 17:00", phone: "+230 555 0161" },
];

const OFFERS = [
  { tag: "SERVICE", img: imgOfferHealth, title: "Free 40-point health check", body: "Book any service before 31 December and we check brakes, tyres, fluids, battery and air-con at no extra cost.", until: "Until 31 December 2026", cta: "Book with this offer" },
  { tag: "PARTS", img: imgOfferBrakes, title: "20% off brake pads", body: "Genuine front or rear pads fitted at any Jetour branch. Member price applied automatically at the counter.", until: "Until 30 November 2026", cta: "Add to a service request" },
  { tag: "SERVICE", img: imgOfferFilter, title: "Complimentary cabin filter", body: "Every major service booked through the portal includes a new cabin air filter and a ventilation clean.", until: "Until 15 January 2027", cta: "Book a major service" },
];

const SERVICES = ["Scheduled maintenance", "Repairs and diagnostics", "Warranty inspection", "Tyres and alignment", "Air-conditioning service"];
const WINDOWS = ["Morning (08:00 – 12:00)", "Afternoon (12:00 – 17:00)", "Full day drop-off"];
const MODELS = ["Jetour Tiggo 7 Pro", "Jetour Tiggo 8 Pro", "Jetour Dashing", "Jetour X70 Plus", "Jetour X90 Plus", "Other Jetour model"];
const STAGES = ["Request submitted", "Branch review", "Slot confirmed", "Vehicle in service", "Completed"];

const NAV = [
  { key: "overview", label: "Overview", icon: LayoutGrid, path: "/" },
  { key: "vehicle", label: "My Vehicle", icon: Car, path: "/vehicle" },
  { key: "book", label: "Book a Service", icon: CalendarPlus, path: "/book-service" },
  { key: "requests", label: "Requests", icon: ClipboardList, path: "/requests" },
  { key: "reminders", label: "Reminders", icon: Bell, path: "/reminders" },
  { key: "documents", label: "Documents", icon: FileText, path: "/documents" },
  { key: "offers", label: "Offers & Branches", icon: BadgePercent, path: "/offers" },
  { key: "account", label: "Account", icon: User, path: "/account" },
];
const PAGE_TITLES = { overview: "Overview", vehicle: "My Vehicle", book: "Book a Service", requests: "Requests", reminders: "Reminders", documents: "Documents", offers: "Offers & Branches", account: "Account", help: "Help & Roadside" };

/* ─────────────────────────── styles ─────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700&family=JetBrains+Mono:wght@500;600&display=swap');

.jt{--p:#ad3c14;--p-h:#962f0b;--p-d:#7f2a0d;--p-s:#f6ebe6;--p-s2:#fbf4f1;--p-b:#efd3c8;
  --ink:#0d1526;--tx:#2b3445;--mu:#667085;--mu2:#8a93a3;--bd:#e4e5ea;--bd2:#d9dce3;--sub:#f8f9fc;--sub2:#f2f4f7;
  --g:#1e8a4f;--g-d:#17703f;--g-s:#ecf8f1;--g-b:#bfe5cf;--y:#e3a019;--y-s:#fdf6d9;--y-b:#f2e2a0;--y-t:#7a5800;--r:#c8312c;--r-s:#fdeceb;--r-b:#f5c9c6;
  font-family:'Nunito Sans',system-ui,sans-serif;color:var(--tx);font-size:14px;line-height:1.45;
  position:absolute;inset:0;display:flex;background:#fff;-webkit-font-smoothing:antialiased;}
.jt *{box-sizing:border-box;}
.jt button{font-family:inherit;cursor:pointer;}
.jt input,.jt select,.jt textarea{font-family:inherit;}
.jt .disp{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-weight:800;color:var(--ink);letter-spacing:-.01em;}
.jt .mono{font-family:'JetBrains Mono',ui-monospace,monospace;}

/* sidebar */
.jt-side{width:264px;flex-shrink:0;border-right:1px solid var(--bd);display:flex;flex-direction:column;padding:20px 12px 14px;overflow-y:auto;background:#fff;}
.jt-brand{display:flex;align-items:center;gap:12px;padding:0 8px;margin-bottom:20px;}
.jt-logo{width:40px;height:40px;border-radius:6px;background:var(--p);color:#fff;display:grid;place-items:center;font-family:'Plus Jakarta Sans';font-weight:800;font-size:17px;flex-shrink:0;}
.jt-brand b{display:block;font-family:'Plus Jakarta Sans';font-weight:800;font-size:15px;color:var(--ink);letter-spacing:.01em;line-height:1.1;}
.jt-brand small{display:block;font-size:10px;letter-spacing:.2em;color:var(--mu);font-weight:600;margin-top:3px;}
.jt-prof{border:1px solid var(--bd);border-radius:10px;padding:12px;display:flex;gap:12px;align-items:center;margin-bottom:20px;}
.jt-av{width:36px;height:36px;border-radius:50%;background:#f7eae7;color:var(--p);display:grid;place-items:center;font-weight:800;font-size:12px;flex-shrink:0;}
.jt-prof b{display:block;font-size:14px;font-weight:600;color:var(--ink);}
.jt-prof span{display:block;font-size:12px;color:var(--mu);line-height:1.35;}
.jt-nav{display:flex;flex-direction:column;gap:2px;}
.jt-nav button{display:flex;align-items:center;gap:12px;height:40px;padding:0 12px;border:0;background:transparent;border-radius:8px;color:var(--tx);font-size:14px;font-weight:500;text-align:left;width:100%;}
.jt-nav button:hover{background:var(--sub);}
.jt-nav button.on{background:var(--p-s);color:var(--p);font-weight:600;}
.jt-nav button svg{color:currentColor;opacity:.85;}
.jt-nav .cnt{margin-left:auto;min-width:18px;height:22px;padding:0 6px;border-radius:11px;background:#f6e5df;color:var(--p);font-size:11px;font-weight:700;display:grid;place-items:center;}
.jt-helpbox{margin-top:20px;border:1px solid var(--bd);background:var(--sub);border-radius:10px;padding:12px;}
.jt-helpbox .t{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:var(--ink);}
.jt-helpbox .t svg{color:var(--p);}
.jt-helpbox p{margin:6px 0 12px;font-size:12px;color:var(--mu);line-height:1.55;}
.jt-helpbox .link{display:block;text-align:center;margin-top:10px;font-size:12px;font-weight:600;color:var(--p);background:none;border:0;width:100%;}
.jt-signout{margin-top:auto;padding-top:18px;display:flex;justify-content:center;}
.jt-signout button{display:flex;align-items:center;gap:8px;border:0;background:none;color:var(--mu);font-size:13px;font-weight:500;}

/* main */
.jt-main{flex:1;min-width:0;display:flex;flex-direction:column;}
.jt-top{height:64px;border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 28px 0 24px;gap:12px;flex-shrink:0;background:#fff;}
.jt-top .crumb small{display:block;font-size:10px;letter-spacing:.16em;font-weight:600;color:var(--mu);}
.jt-top .crumb b{display:block;font-size:14px;font-weight:600;color:var(--ink);margin-top:2px;}
.jt-top .sp{flex:1;}
.jt-top .vl{font-size:12px;color:var(--mu);font-weight:500;}
.jt-vsel{position:relative;}
.jt-vsel select{appearance:none;height:36px;border:1px solid var(--bd2);border-radius:8px;padding:0 36px 0 12px;font-size:14px;font-weight:600;color:var(--ink);background:#fff;min-width:178px;outline:none;}
.jt-vsel select:focus{border-color:var(--p);box-shadow:0 0 0 1px var(--p),0 0 0 4px rgba(173,60,20,.14);}
.jt-vsel svg{position:absolute;right:12px;top:10px;pointer-events:none;color:var(--tx);}
.jt-ib{height:36px;border:1px solid var(--bd2);border-radius:8px;background:#fff;display:flex;align-items:center;gap:8px;padding:0 14px;font-size:14px;font-weight:600;color:var(--ink);}
.jt-ib svg{color:var(--p);}
.jt-ib:hover{background:var(--sub);}
.jt-bell{position:relative;width:36px;height:36px;padding:0;border:0;background:none;display:grid;place-items:center;color:var(--ink);border-radius:8px;margin:0 6px;}
.jt-bell:hover{background:var(--sub);}
.jt-bell i{position:absolute;top:6px;right:7px;width:8px;height:8px;border-radius:50%;background:#e2581f;border:2px solid #fff;}
.jt-me{display:flex;align-items:center;gap:8px;border:0;background:none;font-size:14px;font-weight:600;color:var(--ink);}
.jt-me .jt-av{background:var(--p);color:#fff;}
.jt-scroll{flex:1;overflow-y:auto;position:relative;}
.jt-page{padding:36px 32px 0;max-width:1200px;}
.jt-foot{margin-top:40px;border-top:1px solid var(--bd);padding:24px 0 40px;display:flex;justify-content:space-between;font-size:12px;color:var(--mu);}
.jt-foot .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#2fb36b;margin-right:8px;vertical-align:middle;}

/* page head */
.jt-ph{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:44px;}
.jt-eyebrow{font-size:12px;letter-spacing:.16em;font-weight:600;color:var(--p);text-transform:uppercase;}
.jt-h1{font-size:28px;line-height:1.2;margin:6px 0 8px;}
.jt-lead{color:var(--tx);font-size:14px;max-width:672px;margin:0;line-height:1.45;}

/* buttons */
.jt-btn{height:44px;padding:0 20px;border-radius:8px;border:1px solid transparent;font-size:14px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;}
.jt-btn.p{background:var(--p);color:#fff;}
.jt-btn.p:hover{background:var(--p-h);}
.jt-btn.o{background:#fff;border-color:var(--bd2);color:var(--ink);}
.jt-btn.o:hover{background:var(--sub);}
.jt-btn.g{background:none;color:var(--ink);}
.jt-btn.sm{height:36px;padding:0 14px;font-size:13px;}
.jt-btn.xs{height:32px;padding:0 12px;font-size:13px;border-radius:7px;}
.jt-btn.full{width:100%;}
.jt-btn.soft{background:#f2e3df;color:var(--p);}
.jt-btn.green{background:var(--g-d);color:#fff;}
.jt-btn.go{background:#fff;border-color:var(--g-b);color:var(--ink);}
.jt-btn:disabled{opacity:.55;cursor:not-allowed;}
.jt-link{background:none;border:0;color:var(--p);font-weight:600;font-size:14px;display:inline-flex;align-items:center;gap:6px;padding:0;}
.jt-link:hover{text-decoration:underline;}

/* cards */
.jt-card{border:1px solid var(--bd);border-radius:12px;background:#fff;}
.jt-ch{padding:20px 24px 18px;border-bottom:1px solid var(--bd);display:flex;justify-content:space-between;align-items:flex-start;gap:16px;}
.jt-ch h3{margin:0;font-size:16px;line-height:1.35;}
.jt-ch p{margin:4px 0 0;color:var(--mu);font-size:14px;}
.jt-cb{padding:20px 24px 24px;}
.jt-grid{display:grid;gap:20px;}
.jt-lbl{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--mu);font-weight:600;}
.jt-val{font-size:14px;color:var(--ink);font-weight:600;margin-top:3px;}
.jt-sub{font-size:12px;color:var(--mu);}
.jt-plate{display:inline-block;border:1px solid var(--bd2);border-radius:5px;padding:2px 8px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:var(--ink);letter-spacing:.06em;background:#fff;}

/* pills */
.jt-pill{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:12px;font-size:12px;font-weight:600;white-space:nowrap;}
.jt-pill i{width:6px;height:6px;border-radius:50%;}
.jt-pill.y{background:var(--y-s);border:1px solid var(--y-b);color:var(--y-t);} .jt-pill.y i{background:var(--y);}
.jt-pill.gr{background:var(--g-s);border:1px solid var(--g-b);color:var(--g-d);} .jt-pill.gr i{background:#2fb36b;}
.jt-pill.n{background:var(--sub2);border:1px solid var(--bd);color:var(--tx);} .jt-pill.n i{background:#98a2b3;}
.jt-tag{display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 8px;border-radius:10px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;}
.jt-tag.sh{background:#e3f6ea;color:var(--g-d);}
.jt-tag.vh{background:var(--sub2);color:var(--mu);}
.jt-tag.pr{background:#f7e6df;color:var(--p);}
.jt-tag.pend{background:#fbf0c9;color:#7a5800;}
.jt-tag.now{background:#fbeee8;color:var(--p);}
.jt-tag.ok{background:var(--g-d);color:#fff;}

/* forms */
.jt-f{display:flex;flex-direction:column;gap:6px;}
.jt-f label{font-size:14px;font-weight:600;color:var(--ink);}
.jt-f label em{color:var(--p);font-style:normal;margin-left:2px;}
.jt-in{height:44px;border:1px solid var(--bd2);border-radius:8px;padding:0 12px;font-size:14px;color:var(--ink);background:#fff;outline:none;width:100%;}
.jt-in::placeholder{color:#8a93a3;}
textarea.jt-in{height:auto;min-height:104px;padding:12px;resize:vertical;line-height:1.5;}
select.jt-in{padding:0 12px 0 16px;}
.jt-in:focus{border-color:var(--p);box-shadow:0 0 0 1px var(--p),0 0 0 4px rgba(173,60,20,.14);}
.jt-in.err{border-color:var(--r);}
.jt-in:disabled{background:#fff;color:var(--mu2);}
.jt-hint{font-size:12px;color:var(--mu);}
.jt-err{font-size:12px;color:var(--r);display:flex;align-items:center;gap:6px;font-weight:600;}
.jt-okmsg{font-size:12px;color:var(--g-d);display:flex;align-items:center;gap:6px;background:var(--g-s);border:1px solid var(--g-b);border-radius:6px;padding:6px 10px;}
.jt-row2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.jt-tog{width:44px;height:24px;border-radius:12px;border:0;background:#dfe2e8;position:relative;flex-shrink:0;transition:background .15s;}
.jt-tog::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:left .15s;}
.jt-tog.on{background:var(--p);} .jt-tog.on::after{left:23px;}

/* segmented */
.jt-seg{display:inline-flex;background:var(--sub2);border-radius:10px;padding:4px;gap:2px;}
.jt-seg button{height:36px;padding:0 14px;border:0;border-radius:7px;background:transparent;font-size:14px;font-weight:600;color:var(--tx);display:flex;align-items:center;gap:8px;}
.jt-seg button.on{background:#fff;color:var(--ink);box-shadow:0 1px 2px rgba(16,24,40,.06);}
.jt-seg .c{min-width:18px;height:18px;border-radius:9px;background:#e7e9ee;font-size:11px;display:grid;place-items:center;padding:0 5px;color:var(--mu);}
.jt-seg button.on .c{background:#f7e6df;color:var(--p);}

/* list rows */
.jt-ico{width:36px;height:36px;border-radius:8px;display:grid;place-items:center;flex-shrink:0;background:var(--sub2);color:var(--mu);}
.jt-ico.red{background:#fbe9e3;color:var(--p);}
.jt-icbtn{width:36px;height:36px;padding:0;border-radius:8px;border:1px solid var(--bd2);background:#fff;display:grid;place-items:center;color:var(--ink);flex-shrink:0;line-height:0;}
.jt-icbtn svg{display:block;}
.jt-icbtn:hover{background:var(--sub);}
.jt-icbtn.ghost{border:0;background:none;color:var(--mu);}
.jt-icbtn.ghost:hover{background:var(--sub2);color:var(--ink);}
.jt-icbtn.ghost.del:hover{background:var(--r-s);color:var(--r);}

/* toast */
.jt-toast{position:absolute;right:20px;bottom:20px;z-index:60;background:#fff;border:1px solid var(--bd);border-radius:10px;box-shadow:0 12px 28px rgba(16,24,40,.12);padding:14px 20px 14px 16px;display:flex;gap:12px;align-items:flex-start;min-width:350px;max-width:350px;font-size:14px;color:var(--ink);animation:jtUp .2s ease;}
@keyframes jtUp{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}

/* overlay */
.jt-ov{position:absolute;inset:0;background:rgba(40,44,60,.45);z-index:50;display:flex;}
.jt-drawer{margin-left:auto;width:440px;max-width:100%;background:#fff;height:100%;display:flex;flex-direction:column;animation:jtIn .2s ease;}
@keyframes jtIn{from{transform:translateX(30px);opacity:.4}to{transform:none;opacity:1}}
.jt-modal{margin:auto;width:720px;max-width:calc(100% - 40px);background:#fff;border-radius:12px;box-shadow:0 24px 48px rgba(16,24,40,.2);}

/* table */
.jt-tbl{width:100%;border-collapse:collapse;}
.jt-tblwrap{overflow-x:auto;}
.jt-tbl th{background:var(--sub);text-align:left;font-size:12px;letter-spacing:.1em;font-weight:600;color:var(--mu);padding:12px 12px;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);text-transform:uppercase;white-space:nowrap;}
.jt-tbl td{padding:12px 12px;border-bottom:1px solid var(--bd);font-size:14px;color:var(--tx);vertical-align:middle;}
.jt-tbl th:first-child,.jt-tbl td:first-child{padding-left:20px;}
.jt-tbl th:last-child,.jt-tbl td:last-child{padding-right:16px;}
.jt-tbl td.nw{white-space:nowrap;}
.jt-tbl tr.sel td{background:#faf3f0;}
.jt-tbl tr{cursor:pointer;}
.jt-tbl tr:hover td{background:#fcf8f6;}

/* calendar */
.jt-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
.jt-cal .dh{font-size:11px;letter-spacing:.06em;color:var(--mu);text-align:center;padding:4px 0 8px;font-weight:600;}
.jt-cal .d{height:72px;border-radius:8px;border:1px solid transparent;padding:6px 8px;font-size:12px;font-weight:600;color:var(--ink);background:none;text-align:left;display:flex;flex-direction:column;gap:4px;align-items:flex-start;overflow:hidden;}
.jt-cal .d.empty{background:#f9fafb;cursor:default;}
.jt-cal .d:hover:not(.empty){background:var(--sub);}
.jt-cal .d.sel{border-color:var(--p);background:var(--p-s2);}
.jt-cal .d .n{width:24px;height:24px;display:grid;place-items:center;border-radius:50%;margin:-2px 0 0 -4px;}
.jt-cal .d .n.today{background:var(--p);color:#fff;}
.jt-cal .ev{font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#eef0f4;color:var(--tx);}
.jt-cal .ev.veh{background:#f8e3dc;color:var(--p-d);}

.jt-acc{border-bottom:1px solid var(--bd);}
.jt-acc button{width:100%;display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border:0;background:none;font-size:14px;font-weight:600;color:var(--ink);text-align:left;}
.jt-acc .a{padding:0 20px 16px;color:var(--tx);font-size:14px;line-height:1.6;}

.jt-tl{position:relative;display:flex;flex-direction:column;gap:20px;}
.jt-tl .it{display:flex;gap:16px;position:relative;}
.jt-tl .it:not(:last-child)::before{content:"";position:absolute;left:17px;top:38px;bottom:-20px;width:1px;background:var(--bd);}
.jt-tl .dot{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;background:var(--sub2);color:var(--mu);border:1px solid var(--bd);}
.jt-tl .dot.r{background:#fbe9e3;color:var(--p);border-color:#f2d0c4;}
.jt-tl .dot.g{background:var(--g-s);color:var(--g);border-color:var(--g-b);}
.jt-tl b{display:block;font-size:14px;font-weight:600;color:var(--ink);}
.jt-tl small{display:block;font-size:12px;color:var(--mu);margin:2px 0 6px;}
.jt-tl p{margin:0;font-size:14px;color:var(--tx);line-height:1.6;}

.jt-steps{display:flex;flex-direction:column;gap:14px;}
.jt-steps .s{display:flex;align-items:center;gap:12px;font-size:14px;color:var(--mu);}
.jt-steps .s .c{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;border:1px solid var(--bd2);color:var(--mu);flex-shrink:0;}
.jt-steps .s.done{color:var(--tx);} .jt-steps .s.done .c{background:#2a9a5a;border-color:#2a9a5a;color:#fff;}
.jt-steps .s.cur{color:var(--ink);font-weight:700;} .jt-steps .s.cur .c{background:var(--p);border-color:var(--p);color:#fff;}

.jt-dash{border:1px dashed #e3cfc6;border-radius:12px;background:#fdfbfa;}
.jt-proto{border:1px dashed #e7d5cd;border-radius:12px;background:#fdfaf9;padding:16px 16px;}
.jt-proto .h{display:flex;align-items:center;gap:8px;font-size:12px;letter-spacing:.12em;font-weight:600;color:var(--tx);}
.jt-proto .h svg{color:var(--p);}
.jt-note{border:1px solid var(--bd);background:var(--sub);border-radius:12px;padding:14px 16px;display:flex;gap:10px;font-size:12px;color:var(--mu);line-height:1.6;}
.jt-note svg{color:var(--p);flex-shrink:0;margin-top:2px;}
.jt-alert{display:flex;gap:10px;align-items:center;border:1px solid var(--r-b);background:#fdf1f0;color:#b42318;border-radius:8px;padding:10px 14px;font-size:14px;font-weight:600;}

.jt-appt{border:1px solid var(--g-b);background:#f2fbf6;border-radius:12px;}
.jt-appt .hd{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--g-b);font-weight:600;color:var(--ink);font-size:14px;}
.jt-appt .hd span{display:flex;align-items:center;gap:10px;}
.jt-appt .bd{padding:18px 20px;display:grid;grid-template-columns:auto 1fr 1fr;gap:24px 40px;}
.jt-appt .ft{display:flex;gap:8px;padding:12px 20px 14px;border-top:1px solid var(--g-b);flex-wrap:wrap;}
.jt-appt .big{font-family:'Plus Jakarta Sans';font-weight:800;font-size:24px;color:var(--ink);line-height:1.15;margin-top:4px;}

.jt-hero-help{border-radius:12px;background:linear-gradient(90deg,#a63a12 0%,#93330f 40%,#6e270c 100%);color:#fff;padding:20px 20px;display:flex;align-items:center;gap:16px;box-shadow:0 4px 14px rgba(120,40,10,.25);}
.jt-hero-help .ic{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.14);display:grid;place-items:center;flex-shrink:0;}
.jt-hero-help b{display:block;font-size:14px;font-weight:700;}
.jt-hero-help span{font-size:14px;opacity:.9;}
.jt-hero-help .b1{background:#c24719;color:#fff;border:0;height:36px;border-radius:8px;padding:0 14px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px;}
.jt-hero-help .b2{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.55);height:36px;border-radius:8px;padding:0 14px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px;}

.jt-vchip{display:flex;align-items:center;gap:12px;border:1px solid var(--bd);border-radius:10px;padding:10px 12px;background:#fff;text-align:left;width:100%;}
.jt-vchip:hover{border-color:#d8c0b6;}
.jt-vchip.on{border-color:#d38d72;background:#fbf4f1;}
.jt-vchip img,.jt-vchip .ph{width:80px;height:56px;border-radius:6px;object-fit:cover;flex-shrink:0;}
.jt-vchip .ph{background:var(--sub2);display:grid;place-items:center;color:var(--mu);}

/* sign in */
.jt-sign{position:absolute;inset:0;display:flex;background:#fff;}
.jt-sign .l{width:51%;background:linear-gradient(180deg,rgba(26,16,10,.86),rgba(22,13,8,.82) 55%,rgba(20,12,7,.92)),url(${imgDashing}) center 60%/cover;color:#fff;padding:56px 56px 56px;display:flex;flex-direction:column;}
.jt-sign .r{flex:1;display:flex;flex-direction:column;justify-content:center;padding:40px 60px;}
.jt-sign .frm{width:420px;max-width:100%;margin:0 auto;}
`;

/* ─────────────────────────── small UI atoms ─────────────────────────── */

const Pill = ({ stage }) => {
  if (stage <= 1) return <span className="jt-pill y"><i />In review</span>;
  if (stage === 2) return <span className="jt-pill gr"><i />Confirmed</span>;
  if (stage === 3) return <span className="jt-pill gr"><i />In service</span>;
  return <span className="jt-pill n"><i />Completed</span>;
};

const Card = ({ title, sub, action, children, bodyStyle, style, noBody }) => (
  <div className="jt-card" style={style}>
    {(title || action) && (
      <div className="jt-ch">
        <div><h3 className="disp">{title}</h3>{sub && <p>{sub}</p>}</div>
        {action}
      </div>
    )}
    {noBody ? children : <div className="jt-cb" style={bodyStyle}>{children}</div>}
  </div>
);

const Field = ({ label, req, children, hint, error, style }) => (
  <div className="jt-f" style={style}>
    {label && <label>{label}{req && <em>*</em>}</label>}
    {children}
    {error ? <div className="jt-err"><AlertCircle size={13} />{error}</div> : hint ? <div className="jt-hint">{hint}</div> : null}
  </div>
);

const PageHead = ({ eyebrow, title, lead, action }) => (
  <div className="jt-ph">
    <div>
      <div className="jt-eyebrow">{eyebrow}</div>
      <h1 className="disp jt-h1">{title}</h1>
      {lead && <p className="jt-lead">{lead}</p>}
    </div>
    {action}
  </div>
);

const Footer = () => (
  <div className="jt-foot">
    <span>Same account on iPhone, Android, the PWA and desktop — anjali.ramdhony@example.com</span>
    <span><span className="dot" />Prototype · saved in this browser</span>
  </div>
);

const DeviceIcon = ({ d, size = 12 }) => d === "Desktop" ? <Monitor size={size} /> : d === "Android" ? <Tablet size={size} /> : <Smartphone size={size} />;

/* ═══════════════════════════ main component ═══════════════════════════ */

export default function JetourMemberPortal({ initialPage = "overview", initialSignedIn = true, initialVehicleTab = "Details", initialReminderView = "List" } = {}) {
  const [signedIn, setSignedIn] = useState(initialSignedIn);
  const [page, setPage] = useState(initialPage);
  const [vehicles, setVehicles] = useState(SEED_VEHICLES);
  const [vehicleId, setVehicleId] = useState("v1");
  const [requests, setRequests] = useState(SEED_REQUESTS);
  const [reqSel, setReqSel] = useState("JTM-2418-072");
  const [reminders, setReminders] = useState(SEED_REMINDERS);
  const [docs, setDocs] = useState(SEED_DOCS);
  const [toast, setToast] = useState(null);
  const [vehicleTab, setVehicleTab] = useState(initialVehicleTab);
  const [bookPrefill, setBookPrefill] = useState(null);
  const scrollRef = useRef(null);
  const toastTimer = useRef(null);
  const toastSeq = useRef(0);

  const vehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0];
  const vById = (id) => vehicles.find((v) => v.id === id);

  const notify = (text, kind = "ok") => {
    clearTimeout(toastTimer.current);
    toastSeq.current += 1;
    setToast({ text, kind, k: toastSeq.current });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const go = (p, opts = {}) => {
    setPage(p);
    if (opts.tab) setVehicleTab(opts.tab);
    if (opts.req) setReqSel(opts.req);
    if (p === "book") setBookPrefill(opts.prefill || null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const advanceRequest = (id) => {
    setRequests((rs) => rs.map((r) => {
      if (r.id !== id || r.stage >= 4) return r;
      const stage = r.stage + 1;
      return { ...r, stage, ...(stage === 2 ? { advisor: "Navin Ramdhony" } : {}) };
    }));
    const r = requests.find((x) => x.id === id);
    if (r && r.stage === 1) {
      const v = vById(r.vehicleId);
      setReminders((rm) => [
        { id: "auto-" + id, kind: "vehicle", vehicleId: r.vehicleId, title: `Service appointment tomorrow — ${v.reg}`, date: toISO(new Date(parseISO(r.slots[0].date).getTime() - 86400000)), note: `${fmt(r.slots[0].date)} · Morning (08:00 – 12:00) at ${r.branchFull}. Reference ${r.id}. Leave time to arrive 10 minutes early with the service book.`, shared: true, appt: true },
        ...rm,
      ]);
      notify("Appointment confirmed — 24-hour reminder added");
    } else notify("Request updated");
  };

  const openCount = requests.filter((r) => r.stage < 4).length;

  if (!signedIn) {
    return (
      <div className="jt">
        <style>{CSS}</style>
        <SignIn onSignIn={() => { setSignedIn(true); go("overview"); }} />
      </div>
    );
  }

  const ctx = { initialReminderView, vehicles, vehicle, vehicleId, setVehicleId, vById, requests, setRequests, reqSel, setReqSel, reminders, setReminders, docs, setDocs, go, notify, advanceRequest, vehicleTab, setVehicleTab, setVehicles, bookPrefill };

  return (
    <div className="jt">
      <style>{CSS}</style>

      {/* ───────── sidebar ───────── */}
      <aside className="jt-side">
        <div className="jt-brand">
          <div className="jt-logo">J</div>
          <div><b>JETOUR</b><small>MAURITIUS MEMBERS</small></div>
        </div>
        <div className="jt-prof">
          <div className="jt-av">AR</div>
          <div><b>Anjali Ramdhony</b><span>Jetour Care+ · since<br />March 2023</span></div>
        </div>
        <nav className="jt-nav">
          {NAV.map((n) => {
            const Icon = n.icon;
            const cnt = n.key === "requests" ? openCount : n.key === "reminders" ? reminders.length : 0;
            return (
              <button key={n.key} className={page === n.key ? "on" : ""} onClick={() => go(n.key)}>
                <Icon size={18} strokeWidth={1.75} />{n.label}
                {cnt > 0 && <span className="cnt">{cnt}</span>}
              </button>
            );
          })}
        </nav>
        <div className="jt-helpbox">
          <div className="t"><LifeBuoy size={15} />Help &amp; roadside</div>
          <p>24 hours a day, anywhere<br />in Mauritius.</p>
          <a className="jt-btn p sm full" href="tel:+2305550199" style={{ textDecoration: "none" }}><Phone size={15} />Call roadside</a>
          <a className="jt-btn o sm full" href="https://wa.me/2305550199" target="_blank" rel="noreferrer" style={{ marginTop: 8, textDecoration: "none" }}><MessageCircle size={15} />WhatsApp care</a>
          <button className="link" onClick={() => go("help")}>Open the help page</button>
        </div>
        <div className="jt-signout"><button onClick={() => setSignedIn(false)}><LogOut size={15} />Sign out</button></div>
      </aside>

      {/* ───────── main ───────── */}
      <div className="jt-main">
        <header className="jt-top">
          <div className="crumb"><small>MEMBER PORTAL</small><b>{PAGE_TITLES[page]}</b></div>
          <div className="sp" />
          <span className="vl">Vehicle</span>
          <div className="jt-vsel">
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              {vehicles.map((v) => <option key={v.id} value={v.id}>{v.reg} · {v.short}</option>)}
            </select>
            <ChevronDown size={16} />
          </div>
          <button className="jt-ib" onClick={() => go("help")}><LifeBuoy size={16} />Help</button>
          <button className="jt-bell" onClick={() => go("reminders")} aria-label="Notifications"><Bell size={20} strokeWidth={1.75} /><i /></button>
          <button className="jt-me" onClick={() => go("account")}><span className="jt-av">AR</span>Anjali</button>
        </header>

        <div className="jt-scroll" ref={scrollRef}>
          <div className="jt-page">
            {page === "overview" && <Overview {...ctx} />}
            {page === "vehicle" && <MyVehicle {...ctx} />}
            {page === "book" && <BookService key={JSON.stringify(bookPrefill) + vehicleId} {...ctx} />}
            {page === "requests" && <Requests {...ctx} />}
            {page === "reminders" && <Reminders {...ctx} />}
            {page === "documents" && <Documents {...ctx} />}
            {page === "offers" && <Offers {...ctx} />}
            {page === "account" && <Account {...ctx} onSignOut={() => setSignedIn(false)} />}
            {page === "help" && <Help {...ctx} />}
            <Footer />
          </div>
        </div>
      </div>

      {toast && (
        <div className="jt-toast" key={toast.k}>
          {toast.kind === "info" ? <Info size={18} color="#c8312c" style={{ marginTop: 1 }} /> : <CheckCircle2 size={18} color="#2a9a5a" style={{ marginTop: 1 }} />}
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ SIGN IN ═══════════════════════════ */

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("anjali.ramdhony@example.com");
  const [pw, setPw] = useState("jetour2026");
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(true);
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return setErr("Enter the email address you use in the app.");
    if (pw.length < 6) return setErr("Your password is at least 6 characters.");
    onSignIn();
  };
  return (
    <div className="jt-sign">
      <div className="l">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="jt-logo" style={{ width: 44, height: 44 }}>J</div>
          <div>
            <b style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 800, fontSize: 17, display: "block", lineHeight: 1.1 }}>JETOUR</b>
            <small style={{ fontSize: 10, letterSpacing: ".2em", opacity: .75, fontWeight: 700 }}>MAURITIUS · MEMBER PORTAL</small>
          </div>
        </div>
        <div style={{ marginTop: "auto", marginBottom: "auto", paddingTop: 40 }}>
          <h1 style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 800, fontSize: 40, lineHeight: 1.12, letterSpacing: "-.02em", margin: "0 0 18px", maxWidth: 460 }}>Everything about your Jetour, in one place.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, opacity: .82, margin: "0 0 30px", maxWidth: 510 }}>Sign in with the same account you use on iPhone, Android and the PWA. Your vehicles, documents, reminders and request history follow you here.</p>
          {["Your vehicles, service history and warranty", "Service requests with the same reference across devices", "Reminders, documents and member offers in one place"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 17, marginBottom: 16, opacity: .92 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,.18)", display: "grid", placeItems: "center" }}><Check size={12} /></span>{t}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, opacity: .8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><ShieldCheck size={15} color="#e0663a" />Roadside assistance 24/7 · +230 555 0142</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Smartphone size={15} color="#e0663a" />Start on your phone, finish here</span>
        </div>
      </div>
      <div className="r">
        <form className="frm" onSubmit={submit}>
          <h2 className="disp" style={{ fontSize: 24, margin: 0 }}>Sign in to your account</h2>
          <p style={{ color: "var(--mu)", margin: "4px 0 24px" }}>Use the same email and password as the mobile app.</p>
          <Field label="Email address" req>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 12, top: 14, color: "var(--mu)" }} />
              <input className="jt-in" style={{ paddingLeft: 36 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </Field>
          <Field label="Password" req style={{ marginTop: 18 }}>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 12, top: 14, color: "var(--mu)" }} />
              <input className="jt-in" type={show ? "text" : "password"} style={{ paddingLeft: 36, paddingRight: 40 }} value={pw} onChange={(e) => setPw(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 8, top: 8, border: 0, background: "none", color: "var(--mu)", padding: 4 }}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
          </Field>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0 20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--tx)", cursor: "pointer" }}>
              <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} style={{ width: 16, height: 16, accentColor: "#2b3445" }} />Keep me signed in
            </label>
            <button type="button" className="jt-link">Forgot password?</button>
          </div>
          {err && <div className="jt-err" style={{ marginBottom: 12 }}><AlertCircle size={13} />{err}</div>}
          <button className="jt-btn p full" type="submit">Sign in <ArrowRight size={16} /></button>
          <div style={{ marginTop: 28, border: "1px solid var(--bd)", background: "var(--sub)", borderRadius: 10, padding: "18px 16px 16px" }}>
            <div className="jt-lbl" style={{ fontSize: 12 }}>DEMO ACCOUNT</div>
            <div style={{ margin: "6px 0 14px", color: "var(--ink)" }}>anjali.ramdhony@example.com <span style={{ color: "var(--mu)", margin: "0 4px" }}>/</span> jetour2026</div>
            <button type="button" className="jt-btn soft sm full" onClick={onSignIn}>Continue as Anjali</button>
          </div>
          <p style={{ fontSize: 12, color: "var(--mu)", lineHeight: 1.65, marginTop: 32 }}>This is a clickable prototype. The session and the changes you make are stored in this browser only — connect the built-in backend when you are ready for real member accounts.</p>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════ OVERVIEW ═══════════════════════════ */

function Overview({ vehicle, vehicles, requests, reminders, docs, go, vById }) {
  const current = requests.find((r) => r.stage < 4) || requests[0];
  const cv = vById(current.vehicleId);
  const upcoming = [...reminders].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const recentDocs = ["d6", "d8", "d2", "d5"].map((id) => docs.find((d) => d.id === id)).filter(Boolean);
  const dl = daysUntil(vehicle.serviceDue);
  return (
    <>
      <PageHead
        eyebrow="MEMBER OVERVIEW"
        title="Good evening, Anjali"
        lead={<>{DAYS_LONG[TODAY.getDay()]}, 17 November 2026 · Jetour Care+ member since March 2023. Your account is the same one you use on iPhone, Android and the PWA.</>}
        action={<button className="jt-btn p" onClick={() => go("book")}><CalendarPlus size={17} />Book a Service</button>}
      />

      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)" }}>
        <Card title="Your vehicle" sub={`${vehicles.length} linked vehicles · showing ${vehicle.reg}`}
          action={<button className="jt-link" onClick={() => go("vehicle")}>My Vehicle <ArrowRight size={15} /></button>}>
          <div style={{ display: "flex", gap: 20 }}>
            <img src={vehicle.img} alt="" style={{ width: 200, height: 220, objectFit: "cover", borderRadius: 10, border: "1px solid var(--bd)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span className="jt-plate">{vehicle.reg}</span>
              <div className="disp" style={{ fontSize: 18, marginTop: 8 }}>{vehicle.model}</div>
              <div style={{ color: "var(--mu)", fontSize: 14 }}>{vehicle.trim}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
                <div>
                  <div className="jt-lbl">SERVICE DUE</div>
                  <div style={{ color: "var(--ink)", fontWeight: 500, marginTop: 6 }}>{fmt(vehicle.serviceDue)}</div>
                  <div style={{ color: "var(--g-d)", fontSize: 12, fontWeight: 700 }}>In {dl} days</div>
                </div>
                <div>
                  <div className="jt-lbl">MILEAGE</div>
                  <div style={{ color: "var(--ink)", fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}><Gauge size={14} />{vehicle.mileage}</div>
                  <div className="jt-sub">{vehicle.serviceLabel === "10,000 km service" ? "10,000 km service" : "Major service — 60,000 km"}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button className="jt-btn p sm" onClick={() => go("book")}><Wrench size={15} />Book a Service</button>
                <button className="jt-btn o sm" onClick={() => go("vehicle", { tab: "Service history" })}>Service history</button>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, color: "var(--mu)", marginTop: 14, display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}><ShieldCheck size={14} color="#2a9a5a" />Warranty to {vehicle.warrantyShort}</div>
            </div>
          </div>
        </Card>

        <Card title="Current request" sub={`Started on ${current.device}`}
          action={<button className="jt-link" onClick={() => go("requests", { req: current.id })}>All requests <ArrowRight size={15} /></button>}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: ".04em" }}>{current.id}</div>
              <div style={{ color: "var(--tx)", marginTop: 4 }}>{current.title}</div>
            </div>
            <Pill stage={current.stage} />
          </div>
          {current.stage >= 2 && current.stage < 4 ? (
            <OverviewAppt r={current} v={cv} />
          ) : (
            <div style={{ border: "1px solid var(--bd)", borderRadius: 8, padding: "14px 14px", marginTop: 16 }}>
              <div className="jt-lbl">NEXT EXPECTED STEP</div>
              <p style={{ margin: "6px 0 0", lineHeight: 1.65, color: "var(--tx)" }}>{nextStepText(current.stage)}</p>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px", marginTop: 18 }}>
            <div><div className="jt-lbl">VEHICLE</div><div className="jt-val">{cv.reg}</div></div>
            <div><div className="jt-lbl">BRANCH</div><div className="jt-val">{current.branch}</div></div>
            <div><div className="jt-lbl">SUBMITTED</div><div className="jt-val">{fmt(current.submitted)}</div></div>
            <div><div className="jt-lbl">PREFERENCES</div><div className="jt-val">{current.slots.length} preferred slot{current.slots.length > 1 ? "s" : ""}</div></div>
          </div>
          <button className="jt-btn o sm full" style={{ marginTop: 18 }} onClick={() => go("requests", { req: current.id })}>Open the full timeline <ArrowRight size={15} /></button>
        </Card>
      </div>

      <div className="jt-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 20 }}>
        <Card title="Upcoming reminders" sub="Vehicle dates and your own reminders"
          action={<button className="jt-link" onClick={() => go("reminders")}>View all <ArrowRight size={15} /></button>}
          bodyStyle={{ padding: "8px 24px 8px" }}>
          {upcoming.map((r, i) => (
            <div key={r.id} style={{ display: "flex", gap: 12, padding: "16px 0", borderTop: i ? "1px solid var(--bd)" : 0 }}>
              <div className={`jt-ico ${r.kind === "vehicle" ? "red" : ""}`}>{r.kind === "vehicle" ? <Car size={16} /> : <Bell size={16} />}</div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>{r.title}</div>
                <div className="jt-sub">{fmt(r.date)} · {inDays(r.date)}{r.shared ? " · Shared with the service team" : ""}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card title="Recent documents" sub="Invoices, warranty and vehicle papers"
          action={<button className="jt-link" onClick={() => go("documents")}>Open documents <ArrowRight size={15} /></button>}
          bodyStyle={{ padding: "8px 24px 8px" }}>
          {recentDocs.map((d, i) => (
            <div key={d.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px 0", borderTop: i ? "1px solid var(--bd)" : 0 }}>
              <div className="jt-ico"><FileText size={16} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>{d.name}</div>
                <div className="jt-sub">{d.type} · {fmt(d.date)} · {d.size}</div>
              </div>
              <button className="jt-icbtn" title="Download"><Download size={16} /></button>
            </div>
          ))}
        </Card>
      </div>

      <Card title="Offers for you" sub="Member pricing at every Jetour branch" style={{ marginTop: 20 }}
        action={<button className="jt-link" onClick={() => go("offers")}>All offers &amp; branches <ArrowRight size={15} /></button>}>
        <div className="jt-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {OFFERS.slice(0, 2).map((o) => (
            <div key={o.title} style={{ display: "flex", border: "1px solid var(--bd)", borderRadius: 10, overflow: "hidden" }}>
              <img src={o.img} alt="" style={{ width: 168, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ padding: "16px 16px" }}>
                <span className="jt-tag pr">{o.tag}</span>
                <div style={{ fontWeight: 700, color: "var(--ink)", margin: "8px 0 6px" }}>{o.title}</div>
                <div style={{ fontSize: 12, color: "var(--mu)", lineHeight: 1.65 }}>{o.body}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--tx)", marginTop: 10 }}>{o.until}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 20, border: "1px solid var(--bd)", background: "var(--sub)", borderRadius: 12, padding: "20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--p)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}><LifeBuoy size={20} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: "var(--ink)" }}>Need help on the road?</div>
          <div style={{ color: "var(--tx)" }}>Roadside assistance is available 24/7. If your browser cannot share a location, you can type it manually.</div>
        </div>
        <button className="jt-btn p sm" onClick={() => go("help")}><LifeBuoy size={15} />Roadside help</button>
        <a className="jt-btn o sm" href="tel:+2305550199" style={{ textDecoration: "none" }}><Phone size={15} />+230 555 0199</a>
        <a className="jt-btn o sm" href="https://wa.me/2305550199" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><MessageCircle size={15} />WhatsApp</a>
      </div>
    </>
  );
}

function OverviewAppt({ r, v }) {
  return (
    <div className="jt-appt" style={{ marginTop: 16 }}>
      <div className="hd"><span><CalendarCheck size={16} color="#17703f" />Confirmed appointment</span><span className="jt-tag ok">CONFIRMED</span></div>
      <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 14 }}>
        <div><div className="jt-lbl">DATE</div><div className="disp" style={{ fontSize: 18, marginTop: 2 }}>{fmt(r.slots[0].date)}</div><div style={{ fontSize: 12, color: "var(--g-d)" }}>Morning (08:00 – 12:00)</div></div>
        <div><div className="jt-lbl">BRANCH</div><div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{r.branchFull}</div><div className="jt-sub">Royal Road, Quatre Bornes</div></div>
        <div><div className="jt-lbl">DETAILS</div><div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{v.model} · {v.reg}</div><div style={{ fontSize: 12, color: "var(--g-d)" }}>Advisor {r.advisor} · {r.id}</div></div>
      </div>
      <div className="ft"><button className="jt-btn green xs"><CalendarPlus size={14} />Add to calendar</button><button className="jt-btn go xs"><MapPin size={14} />Get directions</button><button className="jt-btn go xs"><Phone size={14} />Call the branch</button></div>
    </div>
  );
}

const nextStepText = (stage) => [
  "Your branch reviews the request and confirms one of your preferred slots.",
  "Your branch is checking technician availability for your three preferred slots and will confirm within one working day.",
  "Arrive at Quatre Bornes — head office on 24 Nov 2026 for your morning (08:00 – 12:00) slot, 10 minutes early, with the service book and this reference. A reminder is set for 23 Nov 2026.",
  "Your vehicle is in the workshop. We message you when the work is finished and the car is ready for collection.",
  "This request is complete. The invoice and warranty record are saved in Documents for this vehicle.",
][stage];

/* ═══════════════════════════ MY VEHICLE ═══════════════════════════ */

function MyVehicle({ vehicles, vehicle, setVehicleId, go, vehicleTab, setVehicleTab, docs }) {
  const vdocs = docs.filter((d) => d.vehicleId === vehicle.id);
  const pending = vehicle.pending;
  const history = SERVICE_HISTORY[vehicle.id] || [];
  const tabs = [["Details"], ["Service history", pending ? 0 : vehicle.history], ["Warranty"], ["Documents", pending ? 0 : vdocs.length]];
  return (
    <>
      <PageHead
        eyebrow="MY VEHICLE"
        title={vehicle.model}
        lead={pending ? `${vehicle.reg} · Awaiting details from your dealer. Everything recorded against this vehicle, on every device.` : `${vehicle.reg} · ${vehicle.trim}. Everything recorded against this vehicle, on every device.`}
        action={<button className="jt-btn p" onClick={() => go("book")}><CalendarPlus size={17} />Book a Service</button>}
      />
      <div style={{ marginTop: -16 }}>
        <div className="jt-lbl" style={{ fontSize: 12, marginBottom: 8 }}>LINKED VEHICLES</div>
        <div className="jt-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {vehicles.map((v) => (
            <button key={v.id} className={`jt-vchip ${v.id === vehicle.id ? "on" : ""}`} onClick={() => setVehicleId(v.id)}>
              {v.img ? <img src={v.img} alt="" /> : <div className="ph"><Car size={18} /></div>}
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", letterSpacing: ".06em" }}>{v.reg}</div>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>{v.model}</div>
                <div className="jt-sub">Service due {fmt(v.serviceDue)}</div>
              </div>
              {v.id === vehicle.id && <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--p)", color: "#fff", display: "grid", placeItems: "center" }}><Check size={14} strokeWidth={3} /></span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0 16px" }}>
        <div className="jt-seg">
          {tabs.map(([t, c]) => (
            <button key={t} className={vehicleTab === t ? "on" : ""} onClick={() => setVehicleTab(t)}>{t}{c !== undefined && <span className="c">{c}</span>}</button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: "var(--mu)" }}>VIN {pending ? "—" : vehicle.vin} · {pending ? "2026" : vehicle.year}</span>
      </div>

      {vehicleTab === "Details" && (
        <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)" }}>
          <div className="jt-card" style={{ padding: 24 }}>
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid var(--bd)", height: 330, background: "var(--sub2)", display: "grid", placeItems: "center" }}>
              {vehicle.img ? <img src={vehicle.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Car size={34} color="#667085" />}
              <span className="jt-plate" style={{ position: "absolute", top: 12, left: 12 }}>{vehicle.reg}</span>
            </div>
            {!pending && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px 24px", marginTop: 24 }}>
                {[["REGISTRATION", vehicle.reg], ["MODEL YEAR", vehicle.year], ["COLOUR", vehicle.colour], ["FUEL", vehicle.fuel], ["TRANSMISSION", vehicle.transmission], ["MILEAGE", vehicle.mileage], ["NEXT SERVICE", vehicle.nextService], ["SERVICE DUE", fmt(vehicle.serviceDue)], ["VIN", vehicle.vin]].map(([k, v]) => (
                  <div key={k}><div className="jt-lbl" style={{ fontSize: 12 }}>{k}</div><div className={k === "VIN" ? "mono" : ""} style={{ color: "var(--ink)", fontWeight: k === "VIN" ? 500 : 600, fontSize: k === "VIN" ? 11 : 14, marginTop: 4 }}>{v}</div></div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card title="Service due" sub={pending ? "First service after linking" : vehicle.nextService}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="disp" style={{ fontSize: 24 }}>{fmt(vehicle.serviceDue)}</div>
                  <div style={{ color: "var(--g-d)", fontWeight: 700, fontSize: 14 }}>In {daysUntil(vehicle.serviceDue)} days</div>
                </div>
                <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#fbe9e3", display: "grid", placeItems: "center", color: "var(--p)" }}><Wrench size={18} /></span>
              </div>
              <p style={{ color: "var(--tx)", lineHeight: 1.65, margin: "14px 0 16px" }}>Choose three preferred dates at your branch and the service team confirms the slot. The confirmed appointment appears in Requests and Reminders.</p>
              <button className="jt-btn p sm full" onClick={() => go("book")}><CalendarPlus size={15} />Book this service</button>
            </Card>
            <Card title="At a glance">
              {[[Gauge, "Mileage", pending ? "—" : vehicle.mileage], [FileText, "Documents", pending ? 0 : vdocs.length], [ShieldCheck, "Warranty until", pending ? "—" : fmt(vehicle.warranty)]].map(([I, k, v], i) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", marginTop: i ? 4 : -6 }}>
                  <I size={15} color="#667085" /><span style={{ color: "var(--mu)" }}>{k}</span><span style={{ marginLeft: "auto", fontWeight: 600, color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {vehicleTab === "Service history" && (
        <Card title="Service history" sub={`${history.length} visits recorded against ${vehicle.reg}`} bodyStyle={{ padding: "8px 24px" }}>
          {history.length === 0 && <p style={{ color: "var(--mu)", padding: "16px 0" }}>No visits yet. Your history appears here once the dealer has confirmed the vehicle.</p>}
          {history.map((h, i) => (
            <div key={h.ref} style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 0", borderTop: i ? "1px solid var(--bd)" : 0 }}>
              <div className="jt-ico red"><Wrench size={16} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>{h.title}</div>
                <div className="jt-sub">{fmt(h.date)} · {h.branch} · {h.km}</div>
              </div>
              <span className="mono" style={{ fontSize: 12, color: "var(--mu)" }}>{h.ref}</span>
              <span className="jt-pill n"><i />Completed</span>
            </div>
          ))}
        </Card>
      )}

      {vehicleTab === "Warranty" && (
        <div className="jt-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Card title="Manufacturer warranty" sub="3 years / 100,000 km, transferable with the vehicle">
            <div style={{ border: "1px solid var(--g-b)", background: "var(--g-s)", borderRadius: 10, padding: "18px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: ".12em", fontWeight: 600, color: "var(--g-d)" }}><ShieldCheck size={15} />ACTIVE COVER</div>
              <div className="disp" style={{ fontSize: 24, margin: "4px 0 2px" }}>Until {fmt(vehicle.warranty)}</div>
              <div style={{ fontSize: 14, color: "var(--g-d)" }}>{vehicle.covered}</div>
            </div>
            {["Engine, transmission and drivetrain components", "Air-conditioning and electrical systems", "Suspension and steering (excluding wear items)", "Paint and body corrosion inspection"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 14, color: "var(--tx)" }}><Check size={16} color="#2a9a5a" />{t}</div>
            ))}
            <p style={{ fontSize: 12, color: "var(--mu)", lineHeight: 1.65, margin: "18px 0 0" }}>Servicing must be carried out at an authorised Jetour branch within the recommended interval to keep the warranty valid. Your next service is {fmt(vehicle.serviceDue)}.</p>
          </Card>
          <Card title="Warranty documents" sub="Kept with the vehicle across every device">
            {vdocs.filter((d) => d.type === "Warranty").concat(vehicle.id === "v2" ? [{ id: "wx", name: "Warranty certificate.pdf", date: "2024-08-02", size: "96 KB" }] : []).map((d) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="jt-ico"><FileText size={16} /></div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, color: "var(--ink)" }}>{d.name}</div><div className="jt-sub">{fmt(d.date)} · {d.size}</div></div>
                <button className="jt-icbtn"><Download size={16} /></button>
              </div>
            ))}
            <button className="jt-btn o sm full" style={{ marginTop: 20 }} onClick={() => go("documents")}>Open all documents <ArrowRight size={15} /></button>
          </Card>
        </div>
      )}

      {vehicleTab === "Documents" && (
        <Card title="Documents for this vehicle" sub={`${vdocs.length} files`} bodyStyle={{ padding: "8px 24px" }}>
          {vdocs.map((d, i) => (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: i ? "1px solid var(--bd)" : 0 }}>
              <div className="jt-ico"><FileText size={16} /></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, color: "var(--ink)" }}>{d.name}</div><div className="jt-sub">{d.type} · {fmt(d.date)} · {d.size}</div></div>
              <button className="jt-btn g xs"><Download size={14} />Download</button>
              <button className="jt-btn g xs" onClick={() => go("documents")}>Preview</button>
            </div>
          ))}
        </Card>
      )}
    </>
  );
}

/* ═══════════════════════════ BOOK A SERVICE ═══════════════════════════ */

function BookService({ vehicles, vehicle, setRequests, go, notify, advanceRequest, requests, vById, bookPrefill }) {
  const [vid, setVid] = useState(vehicle.id);
  const [branch, setBranch] = useState(BRANCHES[0].name);
  const [service, setService] = useState(bookPrefill?.service || SERVICES[0]);
  const [desc, setDesc] = useState(bookPrefill?.desc || "");
  const [photos, setPhotos] = useState([]);
  const [slots, setSlots] = useState([{ date: "", win: WINDOWS[0] }, { date: "", win: WINDOWS[1] }, { date: "", win: WINDOWS[0] }]);
  const [errs, setErrs] = useState({});
  const [picker, setPicker] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const fileRef = useRef(null);
  const v = vById(vid);
  const br = BRANCHES.find((b) => b.name === branch);

  const submit = () => {
    const e = {};
    if (desc.trim().length < 10) e.desc = "Please add a little more detail (at least 10 characters).";
    if (!slots[0].date) e.slot = true;
    setErrs(e);
    if (Object.keys(e).length) return;
    const id = "JTM-2531-339";
    setRequests((rs) => [{
      id, title: service, vehicleId: vid, submitted: "2026-11-17", time: "19:53", device: "Desktop", branch: br.short, branchFull: br.name, stage: 1,
      note: desc, slots: slots.filter((s) => s.date).map((s) => ({ date: s.date, win: s.win.split(" ")[0] })), advisor: "Navin Ramdhony", fresh: true,
    }, ...rs.filter((r) => r.id !== id)]);
    setSubmittedId(id);
    notify(`Request ${id} submitted`);
  };

  if (submittedId) {
    const r = requests.find((x) => x.id === submittedId);
    if (r) return <Submitted r={r} v={vById(r.vehicleId)} go={go} advanceRequest={advanceRequest} />;
  }

  const filledSlots = slots.filter((s) => s.date);

  return (
    <>
      <PageHead eyebrow="BOOK A SERVICE" title="Request a service appointment"
        lead="Choose your vehicle, branch and three preferred dates or time windows. Your branch confirms the final slot and it appears in Requests." />
      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card title="1. Vehicle and branch" sub="Which car needs attention, and where?">
            <div className="jt-row2">
              <Field label="Vehicle" req>
                <select className="jt-in" value={vid} onChange={(e) => setVid(e.target.value)}>
                  {vehicles.map((x) => <option key={x.id} value={x.id}>{x.model} — {x.reg}</option>)}
                </select>
              </Field>
              <Field label="Branch" req hint="Your branch confirms the final slot.">
                <select className="jt-in" value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {BRANCHES.map((b) => <option key={b.name}>{b.name}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ display: "flex", gap: 24, border: "1px solid var(--bd)", borderRadius: 8, padding: "12px 20px", marginTop: 16, fontSize: 12, color: "var(--tx)" }}>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}><MapPin size={14} color="#ad3c14" />{br.addr}</span>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Clock size={14} color="#ad3c14" />{br.hours}</span>
            </div>
          </Card>

          <Card title="2. Service details" sub="The more the workshop knows, the better the visit goes.">
            <Field label="Service needed" req>
              <select className="jt-in" value={service} onChange={(e) => setService(e.target.value)}>
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Describe the work or anything the team should know" req style={{ marginTop: 16 }} error={errs.desc}>
              <textarea className={`jt-in ${errs.desc ? "err" : ""}`} maxLength={500} placeholder="For example: major 60,000 km service, and a light vibration through the steering wheel at 90 km/h." value={desc} onChange={(e) => { setDesc(e.target.value); if (errs.desc) setErrs({ ...errs, desc: null }); }} />
            </Field>
            {!errs.desc && <div className="jt-hint" style={{ marginTop: 6 }}>{desc.length}/500 characters</div>}
            <div style={{ border: "1px solid var(--bd)", borderRadius: 10, padding: 16, marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "var(--ink)", fontSize: 14 }}><Camera size={15} color="#ad3c14" />Photos (optional)</div>
              <div style={{ fontSize: 12, color: "var(--mu)", margin: "4px 0 2px" }}>A picture of the warning light, a dashboard message or the damage helps the workshop prepare before you arrive.</div>
              <div style={{ fontSize: 11, color: "var(--mu)", background: "var(--sub2)", display: "inline-block", padding: "1px 6px", borderRadius: 4, marginTop: 4 }}>{photos.length}/4</div>
              <div className="jt-dash" style={{ marginTop: 12, padding: "28px 16px", textAlign: "center", borderColor: "#e2e4ea", background: "#fff" }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = [...e.dataTransfer.files].slice(0, 4 - photos.length); setPhotos([...photos, ...f.map((x) => x.name)]); }}>
                {photos.length > 0 ? (
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
                    {photos.map((p, i) => <span key={i} className="jt-pill n" style={{ gap: 8 }}><ImagePlus size={13} />{p}<X size={12} style={{ cursor: "pointer" }} onClick={() => setPhotos(photos.filter((_, j) => j !== i))} /></span>)}
                  </div>
                ) : (
                  <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#fbe9e3", display: "inline-grid", placeItems: "center", color: "var(--p)" }}><ImagePlus size={17} /></span>
                )}
                <div style={{ fontWeight: 600, color: "var(--ink)", marginTop: 8 }}>Drag a photo here, or choose a file</div>
                <div style={{ fontSize: 12, color: "var(--mu)", margin: "2px 0 12px" }}>JPG, PNG or HEIC · up to 12 MB each · 4 photos maximum</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  <button className="jt-btn o xs" onClick={() => fileRef.current?.click()}><Upload size={14} />Choose a photo</button>
                  <button className="jt-btn o xs" onClick={() => setPicker(true)}><ImagePlus size={14} />From Documents</button>
                  <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { const f = [...e.target.files].slice(0, 4 - photos.length); setPhotos([...photos, ...f.map((x) => x.name)]); e.target.value = ""; }} />
                </div>
              </div>
            </div>
          </Card>

          <Card title="3. Three preferred dates or time windows" sub="The branch uses these to confirm a slot. Only the first date is required.">
            {errs.slot && <div className="jt-alert" style={{ marginBottom: 12 }}><AlertCircle size={16} />Give at least one preferred date so the branch can book you in.</div>}
            {slots.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 14, border: "1px solid var(--bd)", borderRadius: 10, padding: "14px 12px", marginBottom: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fbe9e3", color: "var(--p)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 14 }}>{i + 1}</span>
                <div className="jt-row2" style={{ flex: 1, gap: 12 }}>
                  <Field label={`Preferred date ${i + 1}`}>
                    <input type="date" className={`jt-in ${errs.slot && i === 0 ? "err" : ""}`} min="2026-11-18" value={s.date} onChange={(e) => { const n = [...slots]; n[i] = { ...s, date: e.target.value }; setSlots(n); if (i === 0) setErrs({ ...errs, slot: false }); }} />
                  </Field>
                  <Field label="Time window">
                    <select className="jt-in" value={s.win} onChange={(e) => { const n = [...slots]; n[i] = { ...s, win: e.target.value }; setSlots(n); }}>
                      {WINDOWS.map((w) => <option key={w}>{w}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--mu)", marginTop: 12 }}><AlertCircle size={13} color="#ad3c14" />If none of the dates work, the branch will propose an alternative in your timeline.</div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 16 }}>
          <Card title="Booking summary" sub="Check this before you submit.">
            {[["Vehicle", <>{v.model}<div className="mono" style={{ fontSize: 11, color: "var(--mu)", fontWeight: 500, letterSpacing: ".06em" }}>{v.reg}</div></>], ["Branch", br.name], ["Service", service]].map(([k, val]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "6px 0", marginTop: k === "Vehicle" ? -6 : 0 }}>
                <span style={{ color: "var(--mu)" }}>{k}</span><span style={{ fontWeight: 600, color: "var(--ink)", textAlign: "right" }}>{val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--bd)", borderRadius: 8, padding: "9px 12px", marginTop: 6 }}>
              <span style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--mu)" }}><Camera size={14} color="#ad3c14" />Photos</span>
              <span style={{ fontSize: 12, color: "var(--tx)" }}>{photos.length ? `${photos.length} attached` : "None yet"}</span>
            </div>
            <div className="jt-lbl" style={{ marginTop: 16 }}>PREFERRED SLOTS</div>
            <div style={{ border: "1px dashed var(--bd2)", borderRadius: 8, padding: "10px 12px", marginTop: 8, fontSize: 12, color: "var(--mu)" }}>
              {filledSlots.length === 0 ? "No dates chosen yet." : filledSlots.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", color: "var(--ink)", fontSize: 13 }}><span>{fmt(s.date)}</span><span style={{ color: "var(--mu)", fontSize: 12 }}>{s.win.split(" ")[0]}</span></div>
              ))}
            </div>
            <button className="jt-btn p full" style={{ marginTop: 20 }} onClick={submit}><Wrench size={16} />Submit request</button>
            <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--mu)", marginTop: 12, lineHeight: 1.6 }}><CalendarCheck size={14} color="#ad3c14" style={{ flexShrink: 0, marginTop: 2 }} />You get a reference straight away. The branch confirms your slot, usually within one working day.</div>
          </Card>
          <div className="jt-note" style={{ display: "block", padding: "18px 16px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}><Smartphone size={15} color="#ad3c14" />Started on your phone?</div>
            <div style={{ marginTop: 4 }}>Requests follow your account. Anything you submit here appears on the iPhone, Android and PWA with the same reference.</div>
          </div>
        </div>
      </div>

      {picker && <DocPicker vehicles={vehicles} onClose={() => setPicker(false)} />}
    </>
  );
}

function DocPicker({ vehicles, onClose }) {
  const [f, setF] = useState("v1");
  return (
    <div className="jt-ov" onClick={onClose}>
      <div className="jt-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--bd)", display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="disp" style={{ fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}><ImagePlus size={17} color="#ad3c14" />Attach a photo from Documents</div>
            <div style={{ color: "var(--mu)", marginTop: 4 }}>Pick a picture you already saved to your vehicle file. No need to find it on your phone again.</div>
          </div>
          <button className="jt-icbtn ghost" onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--bd)", display: "flex", alignItems: "center", gap: 12 }}>
          <span className="jt-lbl" style={{ fontSize: 12 }}>SHOW</span>
          <div className="jt-seg">
            {[["all", "All vehicles"], ...vehicles.map((v) => [v.id, v.reg])].map(([k, l]) => <button key={k} style={{ fontSize: 12, height: 30 }} className={f === k ? "on" : ""} onClick={() => setF(k)}>{l}</button>)}
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <div className="jt-dash" style={{ borderColor: "var(--bd2)", background: "#fff", padding: "48px 20px", textAlign: "center" }}>
            <span style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--sub2)", display: "inline-grid", placeItems: "center", color: "var(--mu)" }}><ImagePlus size={20} /></span>
            <div style={{ fontWeight: 600, color: "var(--ink)", marginTop: 12 }}>No photos in Documents yet</div>
            <div style={{ color: "var(--mu)", marginTop: 8 }}>Upload a picture in Documents, or choose a photo from your<br />computer instead.</div>
          </div>
        </div>
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--bd)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--mu)" }}>Tap a picture to attach it. You can attach several.</span>
          <button className="jt-btn p sm" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

function Submitted({ r, v, go, advanceRequest }) {
  return (
    <>
      <PageHead eyebrow="BOOK A SERVICE" title={`Request ${r.id}`} lead="Your request is with the branch. This page updates as the service team moves it forward." />
      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", alignItems: "start", marginTop: -16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="jt-card" style={{ padding: 20 }}>
            <div style={{ display: "flex", gap: 14 }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--g-s)", display: "grid", placeItems: "center", color: "var(--g)", flexShrink: 0 }}><CheckCircle2 size={20} /></span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><div style={{ fontWeight: 600, color: "var(--ink)" }}>Request submitted</div><div className="mono" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", letterSpacing: ".06em" }}>{r.id}</div></div>
                  <span className="jt-pill n" style={{ height: 22, fontSize: 11 }}><i style={{ background: "#2fb36b" }} />{r.stage <= 1 ? "Submitted" : r.stage === 4 ? "Completed" : "Confirmed"}</span>
                </div>
                <div className="jt-sub" style={{ fontSize: 13, marginTop: 4 }}>Started on desktop · {fmt(r.submitted)} · {r.branchFull}</div>
              </div>
            </div>
            <div style={{ border: "1px solid var(--bd)", borderRadius: 8, padding: "12px 14px", marginTop: 16 }}>
              <div className="jt-lbl">WHAT HAPPENS NEXT</div>
              <div style={{ marginTop: 6, lineHeight: 1.6 }}>{r.stage <= 1 ? "Your branch has your request and will review your three preferred slots. You will see the confirmation here, usually within one working day." : nextStepText(r.stage)}</div>
            </div>
          </div>
          <Card title="Request timeline" sub="Everything you and the service team have done on this request">
            <Timeline r={r} desktop />
          </Card>
          {r.stage < 4 && <ProtoControl r={r} advanceRequest={advanceRequest} />}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card title="Your request">
            {[["Vehicle", <>{v.model}<div className="mono" style={{ fontSize: 11, color: "var(--mu)", fontWeight: 500 }}>{v.reg}</div></>], ["Branch", r.branchFull], ["Service", r.title]].map(([k, val]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}><span style={{ color: "var(--mu)" }}>{k}</span><span style={{ fontWeight: 600, color: "var(--ink)", textAlign: "right" }}>{val}</span></div>
            ))}
            <div className="jt-lbl" style={{ marginTop: 12 }}>PREFERRED SLOTS</div>
            {r.slots.map((s, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", border: "1px solid var(--bd)", borderRadius: 8, padding: "8px 12px", marginTop: 8, fontSize: 13 }}><span style={{ color: "var(--ink)" }}>{fmt(s.date)}</span><span style={{ color: "var(--mu)", fontSize: 12 }}>{s.win}</span></div>)}
            <div className="jt-lbl" style={{ marginTop: 14 }}>WHAT YOU TOLD US</div>
            <div style={{ marginTop: 4, color: "var(--tx)", fontSize: 13 }}>{r.note}</div>
          </Card>
          <Card title="Progress"><Steps stage={r.stage} /></Card>
          <button className="jt-btn p full" onClick={() => go("requests", { req: r.id })}>Open in Requests <ArrowRight size={16} /></button>
          <button className="jt-btn o full" onClick={() => go("book", { prefill: { t: Date.now() } })}><CalendarPlus size={16} />Book another service</button>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════ REQUESTS ═══════════════════════════ */

function Timeline({ r, desktop }) {
  const ev = [
    { ic: <User size={16} />, cls: "r", t: "Request submitted", m: `${fmt(r.submitted)} · ${r.time} · Anjali Ramdhony`, b: desktop || r.device === "Desktop" ? "Submitted from the member portal on desktop (service request)." : `Submitted from the Jetour Mauritius app on ${r.device}.` },
    { ic: <Sparkles size={16} />, cls: "", t: "Reference created", m: `${fmt(r.submitted)} · ${r.time.replace(/\d\d$/, (x) => pad(Math.min(59, +x + 1)))}`, b: `Reference ${r.id}. The same request follows you on iPhone, Android, the PWA and desktop.` },
  ];
  if (r.stage >= 1 && !r.fresh) ev.push({ ic: <Wrench size={16} />, cls: "g", t: "Reviewed by the service team", m: `15 Nov 2026 · 10:40 · ${r.advisor} · ${r.branch}`, b: "Thanks Anjali — we have your request and are checking the workshop diary against your three preferred slots." });
  if (r.stage >= 2) ev.push({ ic: <Wrench size={16} />, cls: "g", t: "Appointment confirmed", m: `17 Nov 2026 · 19:47 · ${r.advisor} · ${r.branchFull}`, b: `${r.branchFull} confirmed ${fmt(r.slots[0].date)} · Morning (08:00 – 12:00). Your advisor is ${r.advisor}.` });
  if (r.stage >= 2) ev.push({ ic: <Sparkles size={16} />, cls: "", t: "Added to your reminders", m: "17 Nov 2026 · 19:47", b: "The confirmed appointment appears in Overview, Requests and Reminders, with a reminder on the day before. You can add it to your own calendar from the appointment card, or from this reminder row in Reminders." });
  if (r.stage >= 3) ev.push({ ic: <Wrench size={16} />, cls: "g", t: "Vehicle checked in", m: "17 Nov 2026 · 19:47", b: `Reception at ${r.branchFull} has your vehicle and the workshop has started the work.` });
  if (r.stage >= 4) ev.push({ ic: <Wrench size={16} />, cls: "g", t: "Service completed", m: "17 Nov 2026 · 19:47", b: `Work finished on ${r.vehicleId === "v1" ? "Jetour Tiggo 7 Pro" : "Jetour Dashing"}. Invoice ${r.id}.pdf was added to your Documents.` });
  if (r.stage >= 4) ev.push({ ic: <Car size={16} />, cls: "r", t: "Ready for collection", m: "17 Nov 2026 · 19:47", b: `Your vehicle is ready at ${r.branchFull}. Ask for reference ${r.id} at the counter.` });
  return (
    <div className="jt-tl">
      {ev.map((e, i) => (
        <div className="it" key={i}>
          <span className={`dot ${e.cls}`}>{e.ic}</span>
          <div><b>{e.t}</b><small>{e.m}</small><p>{e.b}</p></div>
        </div>
      ))}
    </div>
  );
}

function Steps({ stage }) {
  return (
    <div className="jt-steps">
      {STAGES.map((s, i) => {
        const done = i < stage || stage === 4;
        const cur = i === stage && stage < 4;
        return (
          <div key={s} className={`s ${done ? "done" : cur ? "cur" : ""}`}>
            <span className="c">{done ? <Check size={13} strokeWidth={3} /> : i + 1}</span>{s}{cur && <span className="jt-tag now">NOW</span>}
          </div>
        );
      })}
    </div>
  );
}

function ProtoControl({ r, advanceRequest }) {
  const label = ["Simulate the branch confirming your first preferred slot", "Simulate the branch confirming your first preferred slot", "Simulate the vehicle being checked in", "Simulate the work being completed"][r.stage];
  return (
    <>
      <div className="jt-proto">
        <div className="h"><Sparkles size={15} />PROTOTYPE CONTROL</div>
        <div style={{ color: "var(--tx)", margin: "6px 0 12px", lineHeight: 1.5 }}>In production the service team moves this request forward. For the demo you can move it yourself.</div>
        <button className="jt-btn o sm" style={{ fontSize: 13 }} onClick={() => advanceRequest(r.id)}><ShieldCheck size={15} />{label}<ArrowRight size={15} /></button>
      </div>
      <div className="jt-note" style={{ marginTop: 20 }}><Clock size={14} />Status changes are saved on this account, so the same request shows the same status on iPhone, Android, the PWA and desktop.</div>
    </>
  );
}

function Requests({ requests, reqSel, setReqSel, vById, go, advanceRequest }) {
  const [filter, setFilter] = useState("All");
  const open = requests.filter((r) => r.stage < 4);
  const done = requests.filter((r) => r.stage === 4);
  const list = filter === "Open" ? open : filter === "Completed" ? done : requests;
  const r = requests.find((x) => x.id === reqSel) || requests[0];
  const v = vById(r.vehicleId);
  return (
    <>
      <PageHead eyebrow="REQUESTS" title="Your service requests"
        lead="Switch between requests without leaving the page. Every request keeps what you submitted, the updates from the service team and the confirmed outcome."
        action={<button className="jt-btn p" onClick={() => go("book")}><CalendarPlus size={17} />Book a Service</button>} />
      <div className="jt-grid" style={{ gridTemplateColumns: "340px minmax(0,1fr)", alignItems: "start" }}>
        <div style={{ position: "sticky", top: 12 }}>
          <div className="jt-seg" style={{ width: "100%", marginBottom: 12 }}>
            {[["All", requests.length], ["Open", open.length], ["Completed", done.length]].map(([k, c]) => (
              <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{k}<span className="c">{c}</span></button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {list.map((x) => {
              const xv = vById(x.vehicleId);
              const on = x.id === r.id;
              return (
                <button key={x.id} onClick={() => setReqSel(x.id)} style={{ textAlign: "left", border: `1px solid ${on ? "#d38d72" : "var(--bd)"}`, background: on ? "#fbf4f1" : "#fff", borderRadius: 10, padding: "14px 14px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", letterSpacing: ".06em" }}>{x.id}</span><Pill stage={x.stage} />
                  </div>
                  <div style={{ fontWeight: 600, color: "var(--ink)", margin: "8px 0 6px" }}>{x.title}</div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--mu)", alignItems: "center" }}>
                    <span style={{ display: "flex", gap: 4, alignItems: "center" }}><Car size={12} />{xv.reg}</span>
                    <span>{fmt(x.submitted)}</span>
                    <span style={{ display: "flex", gap: 4, alignItems: "center" }}><DeviceIcon d={x.device} />{x.device}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="jt-card">
            <div className="jt-ch" style={{ display: "block" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="mono" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: ".06em" }}>{r.id}</span><Pill stage={r.stage} />
              </div>
              <p>Service request · started on {r.device} · {fmt(r.submitted)}</p>
            </div>
            <div className="jt-cb">
              <div style={{ display: "grid", gridTemplateColumns: "1.25fr .75fr .75fr", gap: "16px 24px" }}>
                <div style={{ gridRow: "span 2" }}>
                  <div className="jt-lbl">WHAT YOU ASKED FOR</div>
                  <div className="jt-val" style={{ marginBottom: 4 }}>{r.title}</div>
                  <div style={{ lineHeight: 1.65 }}>{r.note}</div>
                </div>
                <div><div className="jt-lbl">VEHICLE</div><div className="jt-val">{v.reg}</div></div>
                <div><div className="jt-lbl">BRANCH</div><div className="jt-val">{r.branch}</div></div>
                <div><div className="jt-lbl">SUBMITTED</div><div className="jt-val">{fmt(r.submitted)}</div></div>
                <div><div className="jt-lbl">REFERENCE</div><div className="mono" style={{ fontSize: 11, marginTop: 5, color: "var(--ink)" }}>{r.id}</div></div>
              </div>
              <div className="jt-lbl" style={{ marginTop: 18 }}>YOUR PREFERRED SLOTS</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {r.slots.map((s, i) => {
                  const booked = i === 0 && r.stage >= 2;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${booked ? "#9fd8b8" : "var(--bd2)"}`, background: booked ? "var(--g-s)" : "#fff", borderRadius: 8, padding: "9px 12px" }}>
                      <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fmt(s.date)}</span><span style={{ fontSize: 12, color: "var(--mu)" }}>{s.win}</span>
                      {booked && <span className="jt-tag ok">BOOKED</span>}
                    </div>
                  );
                })}
              </div>
              <div style={{ border: "1px solid var(--bd)", borderRadius: 8, padding: "14px 14px", marginTop: 16 }}>
                <div className="jt-lbl">NEXT EXPECTED STEP</div>
                <div style={{ marginTop: 6, lineHeight: 1.6 }}>{nextStepText(r.stage)}</div>
              </div>
              {r.stage >= 2 && (
                <div className="jt-appt" style={{ marginTop: 16 }}>
                  <div className="hd"><span><CalendarCheck size={16} />Confirmed appointment</span><span className="jt-tag ok">CONFIRMED</span></div>
                  <div className="bd">
                    <div><div className="jt-lbl">DATE</div><div className="big">{fmt(r.slots[0].date)}</div><div style={{ color: "var(--g-d)" }}>Morning (08:00 – 12:00)</div><div style={{ fontSize: 12, color: "var(--g-d)" }}>08:00 – 12:00 · Indian/Mauritius</div></div>
                    <div><div className="jt-lbl">BRANCH</div><div className="jt-val">{r.branchFull}</div><div style={{ fontSize: 12, color: "var(--g-d)" }}>{BRANCHES.find((b) => b.name === r.branchFull)?.addr}</div></div>
                    <div><div className="jt-lbl">DETAILS</div><div className="jt-val" style={{ fontWeight: 500 }}>{v.model} · {v.reg}</div><div style={{ fontSize: 12, color: "var(--g-d)" }}>Advisor {r.advisor} · {r.id}</div></div>
                  </div>
                  <div className="ft"><button className="jt-btn green xs"><CalendarPlus size={14} />Add to calendar</button><button className="jt-btn go xs"><MapPin size={14} />Get directions</button><button className="jt-btn go xs"><Phone size={14} />Call the branch</button></div>
                </div>
              )}
            </div>
          </div>

          <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", alignItems: "start" }}>
            <Card title="Timeline" sub="What you submitted, updates from the service team and the outcome"><Timeline r={r} /></Card>
            <div>
              <Card title="Progress"><Steps stage={r.stage} /></Card>
              {r.stage < 4 && <div style={{ marginTop: 20 }}><ProtoControl r={r} advanceRequest={advanceRequest} /></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════ REMINDERS ═══════════════════════════ */

function Reminders({ reminders, setReminders, vById, notify, initialReminderView }) {
  const [view, setView] = useState(initialReminderView || "List");
  const [drawer, setDrawer] = useState(null);
  const [month, setMonth] = useState(new Date(2026, 10, 1));
  const [selDay, setSelDay] = useState(null);
  const sorted = useMemo(() => [...reminders].sort((a, b) => a.date.localeCompare(b.date)), [reminders]);
  const personal = reminders.filter((r) => r.kind === "personal").length;

  const meta = (r) => r.kind === "vehicle" ? `${fmt(r.date)} · ${vById(r.vehicleId).model} (${vById(r.vehicleId).reg})` : fmt(r.date);
  const del = (id) => { setReminders((rs) => rs.filter((r) => r.id !== id)); notify("Reminder removed", "info"); };
  const toggleShare = (id) => { setReminders((rs) => rs.map((r) => r.id === id ? { ...r, shared: !r.shared } : r)); notify("Sharing updated"); };
  const save = (data) => {
    if (data.id) { setReminders((rs) => rs.map((r) => r.id === data.id ? { ...r, ...data } : r)); notify("Reminder updated"); }
    else { setReminders((rs) => [...rs, { ...data, id: "r" + Date.now(), kind: "personal" }]); notify("Reminder added"); }
    setDrawer(null);
  };

  const Row = ({ r, compact }) => (
    <div style={{ display: "flex", gap: 12, padding: compact ? "14px 0" : "16px 20px", alignItems: "flex-start" }}>
      <div className={`jt-ico ${r.kind === "vehicle" ? "red" : ""}`}>{r.kind === "vehicle" ? <Car size={16} /> : <Bell size={16} />}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{r.title}</span>
          {!compact && r.kind === "vehicle" && <span className="jt-tag vh">FROM YOUR VEHICLE</span>}
          {!compact && r.appt && <span className="jt-tag pr" style={{ background: "#fde9e2" }}><CalendarCheck size={10} />APPOINTMENT · 24H BEFORE</span>}
          {r.shared && <span className="jt-tag sh"><Share2 size={10} />SHARED</span>}
        </div>
        <div className="jt-sub" style={{ marginTop: 2 }}>{compact ? fmt(r.date) : meta(r)}</div>
        {r.note && !compact && <div style={{ marginTop: 4 }}>{r.note}</div>}
      </div>
      {r.appt && !compact && <button className="jt-btn o xs" style={{ fontSize: 12, height: 28 }}><CalendarPlus size={13} />Add to calendar</button>}
      <div style={{ display: "flex", gap: 6 }}>
        <button className="jt-icbtn ghost" title="Share with the service team" onClick={() => toggleShare(r.id)}><Share2 size={16} /></button>
        {r.kind === "personal" && <button className="jt-icbtn ghost" title="Edit" onClick={() => setDrawer(r)}><Pencil size={16} /></button>}
        {r.kind === "personal" && <button className="jt-icbtn ghost del" title="Delete" onClick={() => del(r.id)}><Trash2 size={16} /></button>}
      </div>
    </div>
  );

  // calendar
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7;
  const dim = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const iso = (d) => toISO(new Date(month.getFullYear(), month.getMonth(), d));
  const onDay = (d) => sorted.filter((r) => r.date === iso(d));
  const selList = selDay ? sorted.filter((r) => r.date === selDay) : [];
  const nextUp = sorted.filter((r) => r.date >= toISO(TODAY)).slice(0, 3);

  return (
    <>
      <PageHead eyebrow="REMINDERS" title="Dates that matter"
        lead="Service due dates, road tax, insurance and warranty come from your vehicle record. Add private reminders of your own and choose whether to share them."
        action={<button className="jt-btn p" onClick={() => setDrawer({ title: "", date: selDay || "2026-11-21", note: "", shared: false })}><Plus size={17} />New reminder</button>} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="jt-seg">
          <button className={view === "List" ? "on" : ""} onClick={() => setView("List")}><List size={16} />List</button>
          <button className={view === "Calendar" ? "on" : ""} onClick={() => setView("Calendar")}><Calendar size={16} />Calendar</button>
        </div>
        <span style={{ color: "var(--mu)" }}>{reminders.length} reminders · {personal} personal</span>
      </div>

      {view === "List" ? (
        <Card title="All reminders" sub="Sorted by date" bodyStyle={{ padding: "8px 24px 8px" }}>
          {sorted.map((r, i) => <div key={r.id} style={{ borderTop: i ? "1px solid var(--bd)" : 0 }}><Row r={r} /></div>)}
        </Card>
      ) : (
        <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)", alignItems: "start" }}>
          <Card title={`${MONTHS_LONG[month.getMonth()]} ${month.getFullYear()}`}
            action={<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="jt-icbtn" style={{ width: 32, height: 32 }} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={16} /></button>
              <button className="jt-btn g xs" onClick={() => { setMonth(new Date(2026, 10, 1)); setSelDay(null); }}>Today</button>
              <button className="jt-icbtn" style={{ width: 32, height: 32 }} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={16} /></button>
            </div>}>
            <div className="jt-cal">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => <div key={d} className="dh">{d}</div>)}
              {cells.map((d, i) => {
                if (!d) return <div key={i} className="d empty" />;
                const evs = onDay(d);
                const isToday = iso(d) === toISO(TODAY);
                return (
                  <button key={i} className={`d ${selDay === iso(d) ? "sel" : ""}`} onClick={() => setSelDay(iso(d))}>
                    <span className={`n ${isToday ? "today" : ""}`}>{d}</span>
                    {evs.slice(0, 1).map((e) => <span key={e.id} className={`ev ${e.kind === "vehicle" ? "veh" : ""}`}>{e.title}</span>)}
                  </button>
                );
              })}
            </div>
            <div style={{ borderTop: "1px solid var(--bd)", marginTop: 14, paddingTop: 12, display: "flex", gap: 18, fontSize: 12, color: "var(--mu)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><i style={{ width: 10, height: 10, background: "#f8e3dc", borderRadius: 2, display: "inline-block" }} />Vehicle date</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><i style={{ width: 10, height: 10, background: "#eef0f4", borderRadius: 2, display: "inline-block" }} />Personal reminder</span>
            </div>
          </Card>
          {selDay ? (
            <Card title={(() => { const d = parseISO(selDay); return `${DAYS_LONG[d.getDay()]} ${d.getDate()} ${MONTHS_LONG[d.getMonth()]}`; })()} sub={`${selList.length} reminder${selList.length === 1 ? "" : "s"}`}
              action={<button className="jt-btn o sm" onClick={() => setDrawer({ title: "", date: selDay, note: "", shared: false })}><Plus size={15} />Add</button>}
              bodyStyle={{ padding: "8px 24px" }}>
              {selList.length === 0 && <p style={{ color: "var(--mu)" }}>Nothing planned for this day.</p>}
              {selList.map((r) => <Row key={r.id} r={r} compact />)}
            </Card>
          ) : (
            <Card title="Pick a day" sub="Select a date in the calendar to see what is planned.">
              <div className="jt-sub" style={{ marginBottom: 8, marginTop: -6 }}>Next up:</div>
              {nextUp.map((r) => (
                <button key={r.id} onClick={() => { setSelDay(r.date); }} style={{ display: "flex", justifyContent: "space-between", width: "100%", border: "1px solid var(--bd)", background: "#fff", borderRadius: 8, padding: "9px 12px", marginBottom: 8, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                  <span>{r.title}</span><span style={{ color: "var(--mu)", fontWeight: 500, fontSize: 12 }}>{fmt(r.date).slice(0, 6)}</span>
                </button>
              ))}
            </Card>
          )}
        </div>
      )}

      {drawer && <ReminderDrawer init={drawer} onClose={() => setDrawer(null)} onSave={save} />}
    </>
  );
}

function ReminderDrawer({ init, onClose, onSave }) {
  const [f, setF] = useState({ type: "Personal reminder", ...init });
  const [err, setErr] = useState(false);
  const editing = !!init.id;
  const submit = () => { if (!f.title.trim()) return setErr(true); onSave(f); };
  return (
    <div className="jt-ov" onClick={onClose}>
      <div className="jt-drawer" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid var(--bd)", display: "flex", justifyContent: "space-between" }}>
          <div><div className="disp" style={{ fontSize: 16 }}>{editing ? "Edit reminder" : "New reminder"}</div><div style={{ fontSize: 12, color: "var(--mu)", marginTop: 2 }}>Personal reminders can be shared with the service team.</div></div>
          <button className="jt-icbtn ghost" onClick={onClose}><X size={18} /></button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", flex: 1 }}>
          <Field label="Title" req error={err ? "Give the reminder a short title." : null}>
            <input autoFocus className={`jt-in ${err ? "err" : ""}`} placeholder="e.g. Book tyre rotation" value={f.title} onChange={(e) => { setF({ ...f, title: e.target.value }); setErr(false); }} />
          </Field>
          <Field label="Date" req><input type="date" className="jt-in" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Field>
          <Field label="Type" hint="Vehicle reminders sit next to your service dates.">
            <select className="jt-in" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}><option>Personal reminder</option><option>Vehicle reminder</option></select>
          </Field>
          <Field label="Note" hint="Optional — anything you want to remember.">
            <textarea className="jt-in" placeholder="Add a short note" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
          </Field>
          <div style={{ border: "1px solid var(--bd)", borderRadius: 10, padding: 16, display: "flex", gap: 16, background: "var(--sub)" }}>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, color: "var(--ink)" }}>Share with the service team</div><div style={{ color: "var(--mu)", marginTop: 2 }}>Your branch can see this reminder when preparing your visit.</div></div>
            <button className={`jt-tog ${f.shared ? "on" : ""}`} onClick={() => setF({ ...f, shared: !f.shared })} />
          </div>
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--bd)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="jt-btn g" onClick={onClose}>Cancel</button>
          <button className="jt-btn p" onClick={submit}>{editing ? "Save changes" : "Add reminder"}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ DOCUMENTS ═══════════════════════════ */

function Documents({ docs, setDocs, vehicle, vehicles, vById, notify }) {
  const [q, setQ] = useState("");
  const [vf, setVf] = useState("all");
  const [sel, setSel] = useState(docs[0]?.id);
  const fileRef = useRef(null);
  const list = docs.filter((d) => (vf === "all" || d.vehicleId === vf) && d.name.toLowerCase().includes(q.toLowerCase()));
  const d = docs.find((x) => x.id === sel) || docs[0];
  const dv = vById(d.vehicleId);
  const add = (files) => {
    const nd = [...files].map((f, i) => ({ id: "u" + Date.now() + i, name: f.name, size: `${Math.max(1, Math.round(f.size / 1024))} KB`, vehicleId: vehicle.id, type: "Upload", date: toISO(TODAY), ref: "D-" + Math.random().toString(36).slice(2, 9).toUpperCase() }));
    if (!nd.length) return;
    setDocs((ds) => [...nd, ...ds]); setSel(nd[0].id); notify(`${nd.length} file${nd.length > 1 ? "s" : ""} added to ${vehicle.reg}`);
  };
  return (
    <>
      <PageHead eyebrow="DOCUMENTS" title="Your vehicle documents"
        lead="Invoices, warranty papers, insurance and registration — stored against the right vehicle and available on every device."
        action={<button className="jt-btn p" onClick={() => fileRef.current?.click()}><Upload size={17} />Upload files</button>} />
      <input ref={fileRef} type="file" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,2.55fr) minmax(0,1fr)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="jt-dash" style={{ padding: "36px 20px", textAlign: "center", borderColor: "#d9dce3", background: "#fff", borderWidth: 2 }}
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }}>
            <span style={{ width: 40, height: 40, borderRadius: "50%", background: "#fbe9e3", display: "inline-grid", placeItems: "center", color: "var(--p)" }}><Upload size={18} /></span>
            <div style={{ fontWeight: 600, color: "var(--ink)", marginTop: 8 }}>Drag and drop files, or choose them from your computer</div>
            <div style={{ fontSize: 12, color: "var(--mu)", margin: "4px 0 12px" }}>PDF, JPG or PNG · up to 10 MB each · added to {vehicle.reg}</div>
            <button className="jt-btn o sm" onClick={() => fileRef.current?.click()}>Choose files</button>
          </div>
          <div className="jt-card" style={{ padding: "34px 0 4px" }}>
            <div style={{ padding: "0 44px" }}>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: 10, color: "var(--mu)" }} />
                <input className="jt-in" style={{ height: 36, paddingLeft: 36 }} placeholder="Search file names" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <select className="jt-in" style={{ height: 36, marginTop: 12 }} value={vf} onChange={(e) => setVf(e.target.value)}>
                <option value="all">All vehicles</option>
                {vehicles.map((v) => <option key={v.id} value={v.id}>{v.reg}</option>)}
              </select>
              <div className="jt-sub" style={{ margin: "14px 0 12px" }}>{list.length} files</div>
            </div>
            <div className="jt-tblwrap" style={{ margin: "0 24px" }}>
              <table className="jt-tbl">
                <thead><tr><th>File name</th><th>Vehicle</th><th>Type</th><th>Date</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
                <tbody>
                  {list.map((x) => (
                    <tr key={x.id} className={x.id === d.id ? "sel" : ""} onClick={() => setSel(x.id)}>
                      <td><div style={{ display: "flex", gap: 12, alignItems: "center" }}><div className="jt-ico" style={{ width: 32, height: 32 }}><FileText size={15} /></div><div style={{ minWidth: 0 }}><div style={{ fontWeight: 600, color: "var(--ink)", minWidth: 120 }}>{x.name}</div><div className="jt-sub">{x.size}</div></div></div></td>
                      <td className="nw">{vById(x.vehicleId).reg}</td>
                      <td className="nw"><span style={{ background: "var(--sub2)", border: "1px solid var(--bd)", borderRadius: 12, padding: "2px 8px", fontSize: 12, fontWeight: 600, color: "var(--tx)" }}>{x.type}</span></td>
                      <td className="nw">{fmt(x.date)}</td>
                      <td className="nw"><div style={{ display: "flex", gap: 0, justifyContent: "flex-end", color: "var(--tx)" }}>
                        <button className="jt-icbtn ghost" style={{ width: 28, height: 28 }} onClick={(e) => { e.stopPropagation(); setSel(x.id); }}><Eye size={16} /></button>
                        <button className="jt-icbtn ghost" style={{ width: 28, height: 28 }} onClick={(e) => { e.stopPropagation(); notify(`Downloading ${x.name}`); }}><Download size={16} /></button>
                        <button className="jt-icbtn ghost" style={{ width: 28, height: 28 }} onClick={(e) => { e.stopPropagation(); notify("Share link copied"); }}><Share2 size={16} /></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Card title="Preview" sub={d.size} style={{ position: "sticky", top: 16 }}>
          <div style={{ border: "1px solid var(--bd)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--bd)", background: "var(--sub)" }}>
              <span className="disp" style={{ fontSize: 11 }}>Jetour Mauritius</span><span style={{ fontSize: 10, letterSpacing: ".12em", color: "var(--mu)", fontWeight: 600 }}>{d.type.toUpperCase()}</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, color: "var(--ink)" }}>{d.name.replace(/\.pdf$/, "")}</div>
              <div style={{ fontSize: 11, color: "var(--mu)", margin: "6px 0 14px", lineHeight: 1.6 }}>{dv.model} · {dv.reg} — issued {fmt(d.date)}</div>
              {[100, 92, 85, 70].map((w, i) => <div key={i} style={{ height: 5, borderRadius: 3, background: "#eceef2", width: `${w}%`, marginBottom: 6 }} />)}
              <div style={{ border: "1px solid var(--bd)", borderRadius: 4, padding: "6px 8px", margin: "12px 0", fontSize: 9 }}>
                {[["Reference", d.ref], ["Vehicle", dv.reg], ["Issued", fmt(d.date)]].map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span style={{ color: "var(--mu)" }}>{k}</span><span style={{ color: "var(--ink)", fontWeight: 600 }}>{v}</span></div>)}
              </div>
              {[100, 60].map((w, i) => <div key={i} style={{ height: 5, borderRadius: 3, background: "#eceef2", width: `${w}%`, marginBottom: 6 }} />)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginTop: 18 }}>
            {[["VEHICLE", dv.reg], ["TYPE", d.type], ["ADDED", fmt(d.date)], ["SIZE", d.size]].map(([k, v]) => <div key={k}><div className="jt-lbl">{k}</div><div className="jt-val" style={{ marginTop: 0 }}>{v}</div></div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
            <button className="jt-btn p sm" onClick={() => notify(`Downloading ${d.name}`)}><Download size={15} />Download</button>
            <button className="jt-btn o sm" onClick={() => notify("Share link copied")}><Share2 size={15} />Share</button>
          </div>
          <p style={{ fontSize: 12, color: "var(--mu)", lineHeight: 1.65, margin: "14px 0 0" }}>Only you and the Jetour service team can open this file. Documents stay attached to the vehicle on every device.</p>
        </Card>
      </div>
    </>
  );
}

/* ═══════════════════════════ OFFERS & BRANCHES ═══════════════════════════ */

function Offers({ vehicle, go, notify }) {
  const copy = (t, msg) => { try { navigator.clipboard?.writeText(t); } catch { /* ignore */ } notify(msg); };
  return (
    <>
      <PageHead eyebrow="OFFERS AND BRANCHES" title="Member offers, branches and referrals"
        lead={`Pricing and services available to Jetour Care+ members. ${vehicle.reg} is your active vehicle.`}
        action={<button className="jt-btn p" onClick={() => go("book")}>Book a Service <ArrowRight size={16} /></button>} />
      <div className="jt-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {OFFERS.map((o) => (
          <div key={o.title} className="jt-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", height: 150 }}>
              <img src={o.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span className="jt-tag" style={{ position: "absolute", left: 12, top: 16, background: "#fff", color: "var(--p)", height: 22, fontSize: 10 }}>{o.tag}</span>
            </div>
            <div style={{ padding: "18px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div className="disp" style={{ fontSize: 15 }}>{o.title}</div>
              <div style={{ color: "var(--tx)", lineHeight: 1.65, margin: "10px 0 8px" }}>{o.body}</div>
              <div style={{ fontSize: 12, color: "var(--tx)", display: "flex", gap: 6, alignItems: "center", marginTop: "auto" }}><Clock size={12} />{o.until}</div>
              <button className="jt-btn o sm full" style={{ marginTop: 12 }} onClick={() => go("book", { prefill: { service: o.title.includes("major") ? "Scheduled maintenance" : SERVICES[0], desc: `Member offer: ${o.title}.` } })}>{o.cta}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.45fr) minmax(0,1fr)", marginTop: 20, alignItems: "start" }}>
        <Card title="Jetour branches in Mauritius" sub="Address, opening hours and a direct line to each branch." bodyStyle={{ padding: "8px 24px 8px 44px" }}>
          {BRANCHES.map((b, i) => (
            <div key={b.name} style={{ display: "flex", gap: 14, padding: "18px 0", borderTop: i ? "1px solid var(--bd)" : 0, alignItems: "flex-start" }}>
              <div className="jt-ico red" style={{ borderRadius: "50%" }}><MapPin size={16} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>{b.name}</div>
                <div className="jt-sub">{b.addr}</div>
                <div className="jt-sub" style={{ display: "flex", gap: 6, marginTop: 4, color: "var(--tx)" }}><Clock size={12} style={{ marginTop: 2, flexShrink: 0 }} />{b.hours}</div>
                {b.extra && <div className="jt-sub" style={{ marginTop: 4, color: "var(--tx)" }}>{b.extra}</div>}
              </div>
              <a className="jt-btn o sm" href={`https://maps.google.com/?q=${encodeURIComponent(b.addr + ", Mauritius")}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><ExternalLink size={14} />Directions</a>
              <a className="jt-btn g sm" href={`tel:${b.phone.replace(/\s/g, "")}`} style={{ textDecoration: "none", fontWeight: 500 }}><Phone size={14} />{b.phone}</a>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card title="Refer a friend" sub="The same referral flow you know from the mobile app.">
            <div style={{ display: "flex", gap: 12, border: "1px solid #ecc9bc", background: "#fbf3f0", borderRadius: 10, padding: 14 }}>
              <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--p)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}><Gift size={18} /></span>
              <div><div style={{ fontWeight: 600, color: "var(--ink)" }}>MUR 2,000 service credit</div><div style={{ fontSize: 12, color: "var(--mu)", lineHeight: 1.6 }}>For you and the person you refer, once their Jetour is delivered.</div></div>
            </div>
            <div className="jt-lbl" style={{ marginTop: 18 }}>YOUR REFERRAL CODE</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <div className="mono jt-in" style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: 600, letterSpacing: ".06em" }}>ANJALI-2418</div>
              <button className="jt-btn o sm" style={{ height: 40 }} onClick={() => copy("ANJALI-2418", "Referral code copied")}><Copy size={15} />Copy</button>
            </div>
            {["Share your code or link with the person buying a Jetour.", "They quote the code when they place the order at any branch.", "MUR 2,000 service credit is added to your account after delivery."].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginTop: 10, fontSize: 12, color: "var(--tx)", lineHeight: 1.6 }}><span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--sub2)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>{t}</div>
            ))}
            <a className="jt-btn p sm full" style={{ marginTop: 16, textDecoration: "none" }} href="https://wa.me/?text=Use%20my%20Jetour%20referral%20code%20ANJALI-2418" target="_blank" rel="noreferrer"><MessageCircle size={15} />Share on WhatsApp</a>
            <a className="jt-btn g sm full" style={{ marginTop: 4, textDecoration: "none" }} href="mailto:?subject=Jetour%20referral&body=Use%20my%20code%20ANJALI-2418"><Mail size={15} />Invite by email</a>
            <button className="jt-btn g sm full" style={{ marginTop: 4, background: "var(--sub)" }} onClick={() => copy("https://jetour.mu/r/ANJALI-2418", "Referral link copied")}><Copy size={15} />Copy the referral link</button>
          </Card>
          <Card title="Customer care">
            <p style={{ margin: "-6px 0 14px", color: "var(--tx)", lineHeight: 1.6 }}>A person, not a queue. Quote your registration and we can see your vehicle and open requests.</p>
            <a className="jt-btn o sm full" href="https://wa.me/2305550142" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><MessageCircle size={15} color="#2a9a5a" />WhatsApp care · replies in minutes</a>
            <a className="jt-btn o sm full" href="tel:+2305550142" style={{ marginTop: 8, textDecoration: "none" }}><Phone size={15} color="#ad3c14" />+230 555 0142</a>
            <a className="jt-btn o sm full" href="mailto:members@jetour.mu" style={{ marginTop: 8, textDecoration: "none" }}><Mail size={15} color="#ad3c14" />members@jetour.mu</a>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════ ACCOUNT ═══════════════════════════ */

function Account({ vehicles, setVehicles, notify, go, onSignOut, setVehicleId }) {
  const [c, setC] = useState({ first: "Anjali", last: "Ramdhony", email: "anjali.ramdhony@example.com", mobile: "+230 5 742 8831", addr: "12 Avenue des Manguiers, Quatre Bornes", lang: "English" });
  const [n, setN] = useState({ due: true, req: true, docs: true, offers: false, channel: "Email" });
  const [linking, setLinking] = useState(false);
  const [lk, setLk] = useState({ reg: "", model: MODELS[0] });
  const [lkErr, setLkErr] = useState("");
  const set = (k) => (e) => setC({ ...c, [k]: e.target.value });

  const link = () => {
    const reg = lk.reg.trim().toUpperCase();
    if (!/^\d{1,4}\s?[A-Z]{1,3}$/.test(reg) && reg.length < 5) return setLkErr("Enter the full registration, e.g. 2341 JU.");
    if (reg.length < 4) return setLkErr("Enter the full registration, e.g. 2341 JU.");
    const id = "v" + Date.now();
    const short = lk.model.replace("Jetour ", "");
    setVehicles((vs) => [...vs, { id, reg, model: lk.model, short, trim: "Awaiting dealer record", img: null, serviceDue: "2027-05-16", serviceLabel: "First service", nextService: "First service after linking", mileage: "—", warranty: "2029-05-16", warrantyShort: "—", year: 2026, vin: "—", colour: "—", fuel: "—", transmission: "—", primary: false, history: 0, docs: 0, pending: true, covered: "Awaiting verification from your dealer" }]);
    setLinking(false); setLk({ reg: "", model: MODELS[0] }); setLkErr("");
    notify(`${reg} linked — verification pending`);
  };

  const prefs = [["due", "Service due reminders", "Two weeks and two days before the service date."], ["req", "Request updates", "Every change on a service or roadside request."], ["docs", "Document and warranty expiry", "Insurance, road tax and warranty end dates."], ["offers", "Offers and promotions", "Member pricing and seasonal service offers."]];

  return (
    <>
      <PageHead eyebrow="ACCOUNT" title="Your details and preferences" lead="The same account signs you in to iPhone, Android, the PWA and this portal. Changes here apply everywhere." />
      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", alignItems: "start" }}>
        <Card title="Contact details" sub="Used for service confirmations, invoices and roadside call-backs.">
          <div className="jt-row2">
            <Field label="First name" req><input className="jt-in" value={c.first} onChange={set("first")} /></Field>
            <Field label="Last name" req><input className="jt-in" value={c.last} onChange={set("last")} /></Field>
            <Field label="Email address" req><input className="jt-in" value={c.email} onChange={set("email")} /></Field>
            <Field label="Mobile number" req><input className="jt-in" value={c.mobile} onChange={set("mobile")} /></Field>
          </div>
          <Field label="Address" req style={{ marginTop: 16 }}><input className="jt-in" value={c.addr} onChange={set("addr")} /></Field>
          <div className="jt-row2" style={{ marginTop: 16 }}>
            <Field label="Preferred language" hint="Used for emails and call-backs.">
              <select className="jt-in" value={c.lang} onChange={set("lang")}><option>English</option><option>Français</option><option>Kreol Morisien</option></select>
            </Field>
            <Field label="Member since"><input className="jt-in" disabled value="March 2023 · Jetour Care+" /></Field>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button className="jt-btn p" onClick={() => notify("Contact details saved")}>Save changes</button>
            <button className="jt-btn g">Cancel</button>
          </div>
        </Card>
        <Card title="Notification preferences" sub="Choose what we tell you about and how." bodyStyle={{ padding: "8px 24px 24px" }}>
          {prefs.map(([k, t, s], i) => (
            <div key={k} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderTop: i ? "1px solid var(--bd)" : 0 }}>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, color: "var(--ink)" }}>{t}</div><div style={{ color: "var(--mu)" }}>{s}</div></div>
              <button className={`jt-tog ${n[k] ? "on" : ""}`} onClick={() => setN({ ...n, [k]: !n[k] })} />
            </div>
          ))}
          <Field label="Preferred channel" style={{ marginTop: 14 }}>
            <select className="jt-in" value={n.channel} onChange={(e) => setN({ ...n, channel: e.target.value })}><option>Email</option><option>SMS</option><option>WhatsApp</option><option>Push notification</option></select>
          </Field>
          <button className="jt-btn p" style={{ marginTop: 16 }} onClick={() => notify("Notification preferences saved")}>Save preferences</button>
        </Card>
      </div>

      <Card title="Linked vehicles" sub={`${vehicles.length} vehicles on this account`} style={{ marginTop: 20 }}
        action={<button className="jt-btn o sm" onClick={() => setLinking(true)}><Plus size={15} />Link another vehicle</button>}
        bodyStyle={{ padding: "8px 24px 20px" }}>
        {vehicles.map((v, i) => (
          <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: i ? "1px solid var(--bd)" : 0 }}>
            {v.img ? <img src={v.img} alt="" style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 6, border: "1px solid var(--bd)" }} /> : <div style={{ width: 80, height: 56, borderRadius: 6, background: "var(--sub2)", display: "grid", placeItems: "center", color: "var(--mu)" }}><Car size={18} /></div>}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", letterSpacing: ".06em" }}>{v.reg}</span>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>{v.model}</span>
                {v.primary && <span className="jt-tag pr">PRIMARY</span>}
                {v.pending && <span className="jt-tag pend">VERIFICATION PENDING</span>}
              </div>
              <div className="jt-sub">{v.pending ? "Our team is checking the details with your dealer." : `Service due ${fmt(v.serviceDue)} · ${v.mileage}`}</div>
            </div>
            <button className="jt-btn g sm" onClick={() => { setVehicleId(v.id); go("vehicle", { tab: "Details" }); }}>Open</button>
          </div>
        ))}
        {linking && (
          <div style={{ border: "1px solid var(--bd)", background: "var(--sub)", borderRadius: 10, padding: 16, marginTop: 10 }}>
            <div style={{ fontWeight: 600, color: "var(--ink)" }}>Link a Jetour you already own</div>
            <div style={{ fontSize: 12, color: "var(--mu)", marginBottom: 12 }}>We check the registration against the dealer record before showing service history.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto", gap: 12, alignItems: "end" }}>
              <Field label="Registration" req><input className={`jt-in ${lkErr ? "" : ""}`} placeholder="e.g. 8824 JU" value={lk.reg} onChange={(e) => { setLk({ ...lk, reg: e.target.value }); setLkErr(""); }} /></Field>
              <Field label="Model"><select className="jt-in" value={lk.model} onChange={(e) => setLk({ ...lk, model: e.target.value })}>{MODELS.map((m) => <option key={m}>{m}</option>)}</select></Field>
              <button className="jt-btn p" onClick={link}>Link</button>
              <button className="jt-btn g" onClick={() => { setLinking(false); setLkErr(""); }}>Cancel</button>
            </div>
            {lkErr && <div className="jt-err" style={{ marginTop: 8 }}><AlertCircle size={13} />{lkErr}</div>}
          </div>
        )}
      </Card>

      <div className="jt-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 20, alignItems: "start" }}>
        <Card title="Sign-in and security">
          <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--bd)", borderRadius: 8, padding: "12px 14px" }}>
            <div className="jt-av"><User size={16} /></div>
            <div><div style={{ fontWeight: 600, color: "var(--ink)" }}>{c.first} {c.last}</div><div className="jt-sub">{c.email}</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, color: "var(--tx)" }}><Smartphone size={15} color="#ad3c14" />Signed in on iPhone, Android, PWA and desktop</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, color: "var(--tx)" }}><ShieldCheck size={15} color="#2a9a5a" />Two-step verification is on for your mobile number</div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="jt-btn o sm" onClick={onSignOut}><LogOut size={15} />Sign out</button>
            <button className="jt-btn g sm" onClick={() => notify("Demo data reset")}>Reset the demo data</button>
          </div>
        </Card>
        <Card title="This is a prototype" sub="What is stored where">
          <p style={{ margin: "0 0 12px", lineHeight: 1.65 }}>The session, the requests you submit and any details you change are saved in this browser so you can move between screens without losing your place. Nothing is sent to a server.</p>
          <p style={{ margin: 0, lineHeight: 1.65 }}>When you are ready for real member accounts, connect the built-in backend and the same screens use live data — vehicles, documents and requests stay in sync with the mobile app.</p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="jt-btn o sm" onClick={() => go("offers")}>Contact customer care</button>
            <button className="jt-btn g sm" onClick={() => go("requests")}>Review my requests</button>
          </div>
        </Card>
      </div>
    </>
  );
}

/* ═══════════════════════════ HELP & ROADSIDE ═══════════════════════════ */

function Help({ vehicle, notify }) {
  const [reg, setReg] = useState(vehicle.reg);
  const [phone, setPhone] = useState("+230 5 742 8831");
  const [where, setWhere] = useState("");
  const [what, setWhat] = useState("Battery or starting problem");
  const [more, setMore] = useState("");
  const [locState, setLocState] = useState("idle");
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(null);
  const [sent, setSent] = useState(false);

  const locate = () => {
    setLocState("loading");
    const done = (txt) => { setWhere(txt); setLocState("ok"); setErr(false); };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => done(`Lat ${p.coords.latitude.toFixed(4)}, Lng ${p.coords.longitude.toFixed(4)}`),
        () => done("Lat -20.2650, Lng 57.4791"),
        { timeout: 6000 }
      );
    } else done("Lat -20.2650, Lng 57.4791");
  };
  const submit = () => {
    if (!where.trim()) { setErr(true); return; }
    setSent(true); notify("Roadside request sent — an agent will call you back");
  };

  const faqs = [
    ["What if my browser cannot find my location?", "Type the road, town or nearest landmark in the location field. The agent confirms the exact spot when they call you back."],
    ["How quickly does an agent call me back?", "Usually within 5 minutes, any time of day. If it is urgent, call +230 555 0199 directly."],
    ["Is roadside assistance available across Mauritius?", "Yes — the whole island, 24 hours a day, for every Jetour on a Jetour Care+ membership."],
    ["When should I call emergency services instead?", "If anyone is injured or the vehicle is in a dangerous position, call 999 or 112 first, then let us know."],
  ];

  return (
    <>
      <PageHead eyebrow="HELP AND ROADSIDE" title="Urgent help, without hunting for a number"
        lead="Roadside assistance runs 24 hours a day across Mauritius. Call directly, message customer care, or send a request and an agent calls you back." />
      <div className="jt-hero-help">
        <span className="ic"><LifeBuoy size={22} /></span>
        <div style={{ flex: 1 }}><b>Roadside assistance · 24/7</b><span>Breakdowns, flat tyres, battery, lockouts and recovery anywhere on the island.</span></div>
        <a className="b1" href="tel:+2305550199" style={{ textDecoration: "none" }}><Phone size={15} />+230 555 0199</a>
        <a className="b2" href="https://wa.me/2305550199" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><MessageCircle size={15} />WhatsApp</a>
      </div>

      <div className="jt-grid" style={{ gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", marginTop: 20, alignItems: "start" }}>
        <Card title="Request roadside assistance" sub="Tell us where you are and what has happened. We call you back.">
          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <span style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--g-s)", color: "var(--g)", display: "inline-grid", placeItems: "center" }}><CheckCircle2 size={24} /></span>
              <div className="disp" style={{ fontSize: 18, marginTop: 12 }}>Help is on the way</div>
              <p style={{ color: "var(--mu)", maxWidth: 380, margin: "8px auto 16px" }}>An agent will call {phone} within a few minutes. Keep your hazard lights on and wait in a safe place.</p>
              <button className="jt-btn o sm" onClick={() => setSent(false)}>Send another request</button>
            </div>
          ) : (
            <>
              <div className="jt-row2">
                <Field label="Registration"><input className="jt-in" value={reg} onChange={(e) => setReg(e.target.value)} /></Field>
                <Field label="Contact number" req><input className="jt-in" value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
              </div>
              <Field label="Where are you?" req style={{ marginTop: 16 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input className={`jt-in ${err ? "err" : ""}`} placeholder="e.g. M1 motorway near Phoenix, northbound" value={where} onChange={(e) => { setWhere(e.target.value); setErr(false); }} />
                  <button className="jt-btn o" style={{ flexShrink: 0, minWidth: 168 }} onClick={locate} disabled={locState === "loading"}>
                    {locState === "loading" ? <><Loader2 size={16} className="jt-spin" />Locating…</> : <><Crosshair size={16} />Use my location</>}
                  </button>
                </div>
              </Field>
              {err && <div className="jt-err" style={{ marginTop: 6 }}><AlertCircle size={13} />Tell us where the vehicle is.</div>}
              {locState === "ok" ? <div className="jt-okmsg" style={{ marginTop: 8 }}><CheckCircle2 size={13} />Location captured. Add a landmark if it helps the driver find you.</div>
                : <div className="jt-hint" style={{ marginTop: 6 }}>Road, town or nearest landmark. If your browser cannot share a location, type it here.</div>}
              <Field label="What has happened?" req style={{ marginTop: 16 }}>
                <select className="jt-in" value={what} onChange={(e) => setWhat(e.target.value)}>
                  {["Battery or starting problem", "Flat tyre", "Locked out / lost key", "Accident or collision", "Warning light or engine fault", "Out of fuel", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Anything else the agent should know?" hint="Optional — passengers, hazards, a safe place to wait." style={{ marginTop: 16 }}>
                <textarea className="jt-in" placeholder="e.g. Two passengers, car is on the hard shoulder." value={more} onChange={(e) => setMore(e.target.value)} />
              </Field>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
                <button className="jt-btn p" onClick={submit}><Car size={17} />Request roadside help</button>
                <span style={{ fontSize: 12, color: "var(--tx)", display: "flex", gap: 6, alignItems: "center" }}><ShieldAlert size={14} color="#c8312c" />Danger or injury? Call 999 / 112 first.</span>
              </div>
            </>
          )}
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card title="Emergency contacts">
            {[[Phone, "#ad3c14", "Roadside · +230 555 0199", "tel:+2305550199"], [MessageCircle, "#2a9a5a", "WhatsApp customer care", "https://wa.me/2305550142"], [Phone, "#ad3c14", "Customer care · +230 555 0142", "tel:+2305550142"], [ShieldAlert, "#c8312c", "Emergency services · 999 / 112", "tel:999"]].map(([I, col, t, href]) => (
              <a key={t} className="jt-btn o sm full" href={href} style={{ marginBottom: 8, textDecoration: "none", fontWeight: 600 }}><I size={15} color={col} />{t}</a>
            ))}
            <div style={{ fontSize: 12, color: "var(--mu)", marginTop: 8, lineHeight: 1.65 }}>These numbers work even if your browser location is unavailable or the portal is offline.</div>
          </Card>
          <Card title="Nearest branches" sub="For recovery and drop-off">
            {BRANCHES.slice(0, 3).map((b) => (
              <div key={b.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div><div style={{ fontWeight: 600, color: "var(--ink)" }}>{b.name}</div><div className="jt-sub">{b.addr}</div></div>
                <a className="jt-link" style={{ fontSize: 12, alignSelf: "flex-start" }} href={`https://maps.google.com/?q=${encodeURIComponent(b.addr + ", Mauritius")}`} target="_blank" rel="noreferrer">Map</a>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Card title="Help questions" style={{ marginTop: 20 }} bodyStyle={{ padding: "8px 24px 24px" }}>
        {faqs.map(([q, a], i) => (
          <div key={q} className="jt-acc">
            <button onClick={() => setOpen(open === i ? null : i)}>{q}<ChevronDown size={16} style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform .15s", color: "var(--mu)" }} /></button>
            {open === i && <div className="a">{a}</div>}
          </div>
        ))}
      </Card>
      <div style={{ display: "flex", gap: 24, fontSize: 12, color: "var(--mu)", border: "1px solid var(--bd)", background: "var(--sub)", borderRadius: 10, padding: "12px 16px", marginTop: 20 }}>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><Info size={13} color="#ad3c14" />Requests raised here are logged against your account</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><Clock size={13} color="#ad3c14" />Last roadside request: 17 Nov 2026</span>
      </div>
      <style>{`.jt-spin{animation:jtSpin 1s linear infinite}@keyframes jtSpin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
