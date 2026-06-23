// QuBrixRedesign.jsx
// Self-contained interactive prototype — no external dependencies except React & Tailwind CSS
// To run: create-react-app or Vite project, install tailwindcss, drop this file in src/
// Usage: <QuBrixApp />

import React, { useState } from "react";

// ─── COLOUR TOKENS ────────────────────────────────────────────────────────────
// Navy: #0F1F3D   Teal accent: #00B4D8   Amber CTA: #D4700A
// Surface: #F8F6F1  Card: #FFFFFF  Sidebar: #0F1F3D
// Status colours: awarded=#16A34A  submitted=#6366F1  draft=#F59E0B

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_PROJECTS = [
  { id: "p1", title: "Contemporary Urban Townhouse", type: "Full Renovation", status: "Awarded", budget: "R 500k – R 1M", created: "03 Jun 2026", location: "Brackenhurst, Gauteng" },
  { id: "p2", title: "Contemporary Henry 1", type: "New Build", status: "Submitted", budget: "R 200k – R 500k", created: "03 Jun 2026", location: "Sandton, Gauteng" },
  { id: "p3", title: "Modern Double-Storey Residence", type: "New Build", status: "Awarded", budget: "R 500k – R 1M", created: "02 Jun 2026", location: "Midrand, Gauteng" },
  { id: "p4", title: "New Luxury Residential Estate", type: "New Build", status: "Awarded", budget: "R 1M+", created: "01 Jun 2026", location: "Centurion, Gauteng" },
  { id: "p5", title: "Contemporary Office Park", type: "Full Renovation", status: "Awarded", budget: "R 500k – R 1M", created: "02 Jun 2026", location: "Rosebank, Gauteng" },
];

const MOCK_QUOTES = [
  { id: "q1", project: "New Luxury Residential Estate", number: "QUO-2026-0001", status: "Quote Accepted", excl: "R 515 877", incl: "R 593 258,55", date: "01 Jun 2026" },
  { id: "q2", project: "Contemporary Office Park", number: "QUO-2026-0003", status: "Quote Accepted", excl: "R 381 065", incl: "R 438 224,75", date: "02 Jun 2026" },
  { id: "q3", project: "Modern Double-Storey Residence", number: "QUO-2026-0004", status: "Quote Accepted", excl: "R 357 123", incl: "R 410 691,45", date: "02 Jun 2026" },
  { id: "q4", project: "Contemporary Urban Townhouse", number: "QUO-2026-0006", status: "Quote Accepted", excl: "R 2 600", incl: "R 2 990,00", date: "03 Jun 2026" },
];

const MOCK_BANK_APPS = [
  { id: "b1", project: "Contemporary Urban Townhouse", ref: "DE7016F3", bank: "Standard Bank", amount: "R 2 990", status: "Bank Approved", rate: "12.75%", step: 9 },
  { id: "b2", project: "New Luxury Residential Estate", ref: "0EC4D758", bank: "Standard Bank", amount: "R 600 000", status: "Bank Approved", rate: "13.25%", step: 9 },
];

const ACTIVITY_FEED = [
  { time: "03 Jun 10:22", event: "Project Awarded", type: "project", detail: "Formally awarded to builder following finance approval." },
  { time: "03 Jun 09:31", event: "Home Loan Offer Accepted", type: "bank", detail: "Standard Bank · R 2 990 @ 12.75% p.a." },
  { time: "03 Jun 09:08", event: "Bond Application Approved", type: "bank", detail: "Standard Bank approved R 2 990 over 15 years." },
  { time: "03 Jun 06:59", event: "Quote Accepted", type: "quote", detail: "QUO-2026-0006 from QuBrix Building Ltd · R 2 990,00" },
  { time: "03 Jun 05:52", event: "New Quote Submitted", type: "quote", detail: "QuBrix Building Ltd submitted QUO-2026-0006" },
  { time: "03 Jun 05:45", event: "Builders Assigned", type: "project", detail: "2 builders invited: Naidoo Building, QuBrix Building Ltd" },
];

const PROJECT_TYPES = [
  { id: "new-build", label: "New Build", desc: "Construction of a new home from scratch", icon: "🏗️" },
  { id: "extension", label: "Extension / Addition", desc: "Adding rooms, floors or square meterage", icon: "📐" },
  { id: "full-reno", label: "Full Renovation", desc: "Major interior & exterior transformation", icon: "🔨" },
  { id: "insurance", label: "Insurance Claim / Repair", desc: "Rebuild and repair damage", icon: "🛡️" },
  { id: "kitchen", label: "Kitchen Remodel", desc: "Kitchen redesign, cabinets & appliances", icon: "🍳" },
  { id: "bathroom", label: "Bathroom Remodel", desc: "Bathroom renovation & fitting", icon: "🚿" },
  { id: "outdoor", label: "Outdoor & Pool", desc: "Pool, braai area, landscaping", icon: "🌿" },
  { id: "roofing", label: "Roofing", desc: "Roof replacement or repair", icon: "🏠" },
  { id: "light-commercial", label: "Light Commercial", desc: "Small offices, sectional title", icon: "🏢" },
];

// ─── UTILITY COMPONENTS ───────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Awarded: "bg-emerald-100 text-emerald-700",
    Submitted: "bg-indigo-100 text-indigo-700",
    Draft: "bg-amber-100 text-amber-700",
    "Bank Approved": "bg-emerald-100 text-emerald-700",
    "Quote Accepted": "bg-emerald-100 text-emerald-700",
    Accepted: "bg-emerald-100 text-emerald-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Invited: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>{children}</div>
);

const Button = ({ children, variant = "primary", size = "md", onClick, disabled, className = "" }) => {
  const base = "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#D4700A] hover:bg-[#B85E08] text-white focus:ring-[#D4700A]",
    secondary: "bg-[#0F1F3D] hover:bg-[#1a2f54] text-white focus:ring-[#0F1F3D]",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 focus:ring-slate-300",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm gap-1.5", md: "px-4 py-2 text-sm gap-2", lg: "px-6 py-3 text-base gap-2" };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder, value, onChange, icon, required, hint }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-slate-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#D4700A] focus:ring-2 focus:ring-[#D4700A]/20 outline-none ${icon ? "pl-10 pr-4" : "px-4"}`}
      />
    </div>
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
      active ? "bg-[#D4700A]/20 text-[#D4700A]" : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`}
  >
    <span className="text-base">{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {badge != null && badge > 0 && (
      <span className="bg-[#D4700A] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">{badge}</span>
    )}
  </button>
);

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ page, setPage }) => {
  const nav = [
    { group: "MAIN", items: [
      { id: "dashboard", icon: "⊞", label: "Dashboard" },
      { id: "messages", icon: "✉", label: "Messages", badge: 3 },
    ]},
    { group: "PROJECTS", items: [
      { id: "my-projects", icon: "📁", label: "My Projects" },
      { id: "bank-applications", icon: "🏦", label: "Bank Applications" },
    ]},
    { group: "QUOTES", items: [
      { id: "my-quotes", icon: "📋", label: "Quotes & Payments" },
    ]},
    { group: "ACCOUNT", items: [
      { id: "profile", icon: "👤", label: "Profile & Settings" },
      { id: "help", icon: "❓", label: "Help & Support" },
    ]},
  ];

  return (
    <aside className="w-60 min-h-screen bg-[#0F1F3D] flex flex-col fixed top-0 left-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-[#D4700A]/20 flex items-center justify-center">
          <span className="text-[#D4700A] text-lg font-bold">Q</span>
        </div>
        <div>
          <div className="text-white font-bold text-base tracking-wide">QUBRIX</div>
          <div className="text-slate-400 text-xs">Quantify. Qualify. Build.</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {nav.map(({ group, items }) => (
          <div key={group}>
            <p className="text-[10px] font-semibold tracking-widest text-slate-500 px-3 mb-1">{group}</p>
            {items.map(item => (
              <SidebarItem key={item.id} {...item} active={page === item.id} onClick={() => setPage(item.id)} />
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#D4700A] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">HO</div>
        <div className="overflow-hidden">
          <div className="text-white text-sm font-medium truncate">Henry Oertel</div>
          <div className="text-slate-400 text-xs truncate">Client Account</div>
        </div>
        <button className="ml-auto text-slate-400 hover:text-white transition text-lg" title="Sign out">⏻</button>
      </div>
    </aside>
  );
};

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const Topbar = ({ title, subtitle, actions }) => (
  <div className="h-16 bg-white border-b border-slate-100 flex items-center px-8 gap-4 sticky top-0 z-10">
    <div className="flex-1 min-w-0">
      <h1 className="text-lg font-semibold text-slate-900 truncate">{title}</h1>
      {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-48">
        <span className="text-slate-400 text-sm">🔍</span>
        <input className="bg-transparent text-sm outline-none text-slate-600 placeholder-slate-400 w-full" placeholder="Search… (⌘K)" />
      </div>
      <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
        <span className="text-slate-600">🔔</span>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4700A] rounded-full"></span>
      </button>
      {actions}
    </div>
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent }) => (
  <Card className="p-5 flex items-start gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${accent}`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mt-0.5">{value}</p>
    </div>
  </Card>
);

// ─── PAGES ────────────────────────────────────────────────────────────────────

// LOGIN
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("henry@qubrix.co.za");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex w-[45%] bg-[#0F1F3D] flex-col p-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4700A]/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-[#D4700A]/20 flex items-center justify-center">
            <span className="text-[#D4700A] text-xl font-bold">Q</span>
          </div>
          <div>
            <div className="text-white font-bold text-lg">QUBRIX</div>
            <div className="text-slate-400 text-xs">Quantify Qualify without Qualm</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">Where trusted<br />builders meet<br />property owners.</h2>
          <p className="text-slate-400 text-base mb-10">South Africa's verified residential building and renovation platform. Smart quotes. Bank-ready applications.</p>
          <div className="space-y-5">
            {[
              { icon: "🔒", title: "Verified builders", desc: "All builders are CIDB/NHBRC verified before listing." },
              { icon: "💡", title: "AI-assisted quoting", desc: "Smart cost benchmarks from major hardware chains." },
              { icon: "🏦", title: "Direct bank integration", desc: "Submit your application electronically to SA banks." },
            ].map(f => (
              <div key={f.title} className="flex gap-4">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">{f.title}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-8">© 2026 QuBrix (Pty) Ltd · POPIA Compliant</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center bg-[#F8F6F1] px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to your QuBrix account to continue.</p>
          </div>
          <div className="space-y-4">
            <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon="✉" required />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Password <span className="text-red-500">*</span></label>
                <button className="text-sm text-[#D4700A] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔑</span>
                <input type={showPass ? "text" : "password"} placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#D4700A] focus:ring-2 focus:ring-[#D4700A]/20 outline-none" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPass ? "🙈" : "👁"}</button>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full mt-2" onClick={onLogin}>Sign in</Button>
            <p className="text-center text-sm text-slate-500">Don't have an account? <button className="text-[#D4700A] font-semibold hover:underline">Register</button></p>
            <div className="flex items-center gap-3 justify-center pt-2">
              <button className="text-xs text-slate-400 hover:underline">Privacy Policy</button>
              <span className="text-slate-300">·</span>
              <button className="text-xs text-slate-400 hover:underline">Legal & Compliance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DASHBOARD
const DashboardPage = ({ setPage, setSelectedProject }) => {
  const stats = [
    { label: "Total Projects", value: "5", icon: "📁", accent: "bg-indigo-50" },
    { label: "Drafts", value: "0", icon: "✏️", accent: "bg-amber-50" },
    { label: "Submitted", value: "1", icon: "📤", accent: "bg-purple-50" },
    { label: "Active / Awarded", value: "5", icon: "✅", accent: "bg-emerald-50" },
  ];

  return (
    <div>
      <Topbar
        title="Dashboard"
        subtitle="Your building projects at a glance"
        actions={<Button variant="primary" onClick={() => setPage("create-project")}>＋ New Project</Button>}
      />
      <div className="p-8 space-y-8">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Good afternoon, Henry 👋</h2>
          <p className="text-slate-500 text-sm mt-1">Here's the status of your building projects.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Projects + Activity */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Projects list */}
          <Card className="lg:col-span-3 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">My Projects</h3>
              <button className="text-sm text-[#D4700A] hover:underline" onClick={() => setPage("my-projects")}>View all →</button>
            </div>
            <div className="divide-y divide-slate-50">
              {MOCK_PROJECTS.slice(0, 4).map(p => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition group">
                  <div className="w-10 h-10 rounded-xl bg-[#0F1F3D] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {p.title.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm truncate">{p.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.type} · {p.created}</div>
                  </div>
                  <StatusBadge status={p.status} />
                  <Button variant="outline" size="sm" onClick={() => { setSelectedProject(p); setPage("project-detail"); }}
                    className="opacity-0 group-hover:opacity-100 transition">View</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity feed */}
          <Card className="lg:col-span-2">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Activity Feed</h3>
              <p className="text-xs text-slate-500 mt-0.5">Contemporary Urban Townhouse Development</p>
            </div>
            <div className="px-6 py-4 space-y-4 max-h-80 overflow-y-auto">
              {ACTIVITY_FEED.map((a, i) => {
                const typeColor = { project: "bg-blue-100 text-blue-700", bank: "bg-emerald-100 text-emerald-700", quote: "bg-amber-100 text-amber-700" };
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${a.type === "bank" ? "bg-emerald-500" : a.type === "quote" ? "bg-amber-500" : "bg-blue-500"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[a.type]}`}>{a.event}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{a.detail}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// MESSAGES
const MessagesPage = () => {
  const threads = [
    { project: "Contemporary Urban Townhouse Development", count: 7, messages: [
      { tag: "BANK UPDATE", title: "Project Awarded — Builder May Commence", date: "3 Jun 2026, 10:22", body: "Your project has been formally awarded to the builder. They are now cleared to commence work." },
      { tag: "BANK UPDATE", title: "Home Loan Offer Accepted", date: "3 Jun 2026, 09:31", body: "You have accepted the home loan offer from Standard Bank for R 2 990,00 at 12,75% p.a." },
      { tag: "QUOTE DECISION", title: "Quote Accepted — Awaiting Project Award", date: "3 Jun 2026, 06:59", body: "You have accepted QUO-2026-0006 — R 2 990,00 (incl. VAT) from QuBrix Building Ltd." },
    ]},
    { project: "Contemporary Henry 1", count: 2, messages: [
      { tag: "SYSTEM", title: "Project Submitted Successfully", date: "2 Jun 2026, 14:00", body: "Your project has been submitted and is under review." },
    ]},
  ];

  const [expanded, setExpanded] = useState("Contemporary Urban Townhouse Development");
  const tagColor = { "BANK UPDATE": "bg-emerald-100 text-emerald-700", "QUOTE DECISION": "bg-amber-100 text-amber-700", QUOTE: "bg-blue-100 text-blue-700", SYSTEM: "bg-slate-100 text-slate-600", "NEW MATCH": "bg-purple-100 text-purple-700" };

  return (
    <div>
      <Topbar title="Messages" subtitle="Your notifications and updates" />
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Inbox <span className="ml-2 text-sm text-slate-400 font-normal">44 total</span></h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Unread</Button>
          </div>
        </div>
        <div className="space-y-4">
          {threads.map(thread => (
            <Card key={thread.project} className="overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
                onClick={() => setExpanded(expanded === thread.project ? null : thread.project)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber-500 text-lg">📂</span>
                  <span className="font-semibold text-slate-900">{thread.project}</span>
                  <span className="text-xs text-slate-400">{thread.count} messages</span>
                </div>
                <span className="text-slate-400">{expanded === thread.project ? "▲" : "▼"}</span>
              </button>
              {expanded === thread.project && (
                <div className="divide-y divide-slate-50">
                  {thread.messages.map((m, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-slate-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor[m.tag] ?? "bg-slate-100 text-slate-600"}`}>{m.tag}</span>
                            <span className="font-semibold text-slate-900 text-sm">{m.title}</span>
                          </div>
                          <p className="text-sm text-slate-500">{m.body}</p>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">{m.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// MY PROJECTS
const MyProjectsPage = ({ setPage, setSelectedProject }) => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? MOCK_PROJECTS : MOCK_PROJECTS.filter(p => p.status.toLowerCase() === filter);

  return (
    <div>
      <Topbar
        title="My Projects"
        subtitle="All your building project requests in one place."
        actions={<Button variant="primary" onClick={() => setPage("create-project")}>＋ New Project</Button>}
      />
      <div className="p-8">
        <Card className="overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-100 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {["all","awarded","submitted","draft"].map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition capitalize ${filter === s ? "bg-[#0F1F3D] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
              <span className="text-slate-400 text-sm">🔍</span>
              <input className="bg-transparent text-sm outline-none text-slate-600 placeholder-slate-400 w-36" placeholder="Search projects…" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Title","Type","Status","Budget","Created",""].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0F1F3D] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{p.title.charAt(0)}</div>
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{p.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">📍 {p.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{p.type}</span></td>
                    <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.budget}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{p.created}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <Button variant="secondary" size="sm" onClick={() => { setSelectedProject(p); setPage("project-detail"); }}>View</Button>
                        <Button variant="outline" size="sm">Process Payment</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// PROJECT DETAIL
const ProjectDetailPage = ({ project, setPage }) => {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview","documents","quote","builders","timeline","messages"];

  const tabIcon = { overview:"📋", documents:"📄", quote:"💰", builders:"🔨", timeline:"⏱", messages:"✉" };

  return (
    <div>
      <Topbar
        title="Project Detail"
        subtitle={`${project?.title ?? "Project"} — Brackenhurst, Alberton`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage("my-projects")}>← Back</Button>
            <Button variant="success" size="sm">✓ Conclude Project</Button>
          </div>
        }
      />
      <div className="p-8 space-y-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-slate-100 pb-0">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize rounded-t transition ${tab === t ? "bg-white border border-b-white border-slate-100 -mb-px text-[#D4700A]" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tabIcon[t]} {t}
            </button>
          ))}
        </div>

        {/* Hero card */}
        <Card className="p-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#0F1F3D] text-white flex items-center justify-center text-2xl flex-shrink-0">
              🏗
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{project?.title ?? "Project Detail"}</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Brackenhurst, Alberton · Ref: {project?.ref ?? "QUO-2026-0001"}</p>
                </div>
                <StatusBadge status={project?.status ?? "Active"} />
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Project Type", value: project?.type ?? "Renovation" },
                  { label: "Budget", value: project?.budget ?? "R 450,000" },
                  { label: "Builder", value: "QuBrix Building Ltd" },
                  { label: "Created", value: "1 Jun 2026" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Tab content */}
        {tab === "overview" && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-3">Project Overview</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              This project covers the full renovation of the property as per the approved building plan.
              All NHBRC and CIDB compliance requirements have been met. The builder has commenced work
              following acceptance of the quote and approval of the home loan.
            </p>
          </Card>
        )}
        {tab === "messages" && <MessagesPage />}
        {(tab !== "overview" && tab !== "messages") && (
          <Card className="p-6">
            <p className="text-slate-400 text-sm text-center py-8">No {tab} content yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

const QuBrixApp = () => {
  const [page, setPage] = useState("login");
  const [selectedProject, setSelectedProject] = useState(null);

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("dashboard")} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F6F1]">
      <Sidebar page={page} setPage={setPage} />
      <div className="ml-60 flex-1 min-h-screen">
        {page === "dashboard"         && <DashboardPage setPage={setPage} setSelectedProject={setSelectedProject} />}
        {page === "messages"          && <MessagesPage />}
        {page === "my-projects"       && <MyProjectsPage setPage={setPage} setSelectedProject={setSelectedProject} />}
        {page === "project-detail"    && <ProjectDetailPage project={selectedProject} setPage={setPage} />}
        {(page !== "dashboard" && page !== "messages" && page !== "my-projects" && page !== "project-detail") && (
          <div className="p-8">
            <Topbar title={page.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} subtitle="Coming soon" />
            <div className="flex items-center justify-center h-64 text-slate-400">This section is under construction 🏗</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuBrixApp;