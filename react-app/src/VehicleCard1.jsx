import { useState, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   VEHICLE CARD 1 — "Prestige Motors" listing
   Recreated pixel-for-pixel from Vehicle1Desktop.mp4 / Vehicle1Mobile.mp4
   Warm ivory palette, serif display type, amber/gold accent.
   Mobile + Desktop layouts live in this one file, plus the shared
   enquiry dialog (centered on desktop, bottom-sheet on mobile).
   ══════════════════════════════════════════════════════════════ */

const IMAGES = [
  "/vehicle-card-1/img1.jpg",
  "/vehicle-card-1/img2.jpg",
  "/vehicle-card-1/img3.jpg",
  "/vehicle-card-1/img4.jpg",
  "/vehicle-card-1/img5.jpg",
  "/vehicle-card-1/img6.jpg",
  "/vehicle-card-1/img7.jpg",
  "/vehicle-card-1/img8.jpg",
];

const DATA = {
  dealer: {
    name: "Prestige Motors",
    location: "Sandton, Johannesburg",
    verified: true,
    responds: "Responds within 2 hours",
  },
  tags: [
    { label: "2024", kind: "year" },
    { label: "NEW", kind: "new" },
    { label: "FEATURED", kind: "featured" },
  ],
  make: "MERCEDES-BENZ",
  model: "C-Class 350e Sedan",
  variant: "Limited edition",
  title: "MERCEDES-BENZ C-Class 350e Sedan Limited edition",
  subtitle: "MERCEDES-BENZ · C-Class 350e Sedan · Limited edition",
  price: "R 299 999",
  mileageShort: "75 000 km",
  quickStats: [
    { icon: "mileage", label: "Mileage", value: "75 000" },
    { icon: "transmission", label: "Transmission", value: "PHEV" },
    { icon: "fuel", label: "Fuel", value: "PHEV" },
    { icon: "consumption", label: "Consumption", value: "2.1L/100 km" },
    { icon: "engine", label: "Engine", value: "2.0L" },
  ],
  description:
    "Experience the pinnacle of luxury and efficiency with this limited edition Mercedes-Benz C-Class 350e Sedan. Featuring a plug-in hybrid powertrain, this vehicle combines exhilarating performance with exceptional fuel economy. The interior is appointed with premium materials and cutting-edge technology, ensuring every journey is as comfortable as it is memorable.",
  specs: [
    {
      title: "Vehicle Details",
      icon: "car",
      rows: [
        ["Make", "MERCEDES-BENZ"],
        ["Model", "C-Class 350e Sedan"],
        ["Variant", "Limited edition"],
        ["Year", "2024"],
        ["Mileage", "75 000"],
        ["Registration", "New"],
        ["Transmission", "PHEV"],
        ["Seats", "5"],
        ["Doors", "5"],
        ["Body Type", "Sedan"],
        ["Colour", "Various"],
      ],
    },
    {
      title: "Condition & Warranty",
      icon: "shield",
      rows: [
        ["Service History", "Full"],
        ["Roadworthy", "Valid"],
        ["Category", "New"],
        ["Spare Key", "Yes"],
        ["Warranty", "3 Years"],
      ],
    },
    {
      title: "Performance",
      icon: "bolt",
      rows: [
        ["Fuel Consumption", "2.1L/100 km"],
        ["Engine Capacity", "2.0L"],
        ["Fuel Tank", "55L"],
        ["Fuel Type", "PHEV"],
        ["Cylinders", "4"],
        ["Power", "204 + 129hp"],
        ["Drive", "FWD"],
        ["Gears", "5"],
      ],
    },
  ],
};

/* ── palette (sampled from source video frames) ── */
const C = {
  pageBg: "#F1EDE7",
  cardBg: "#F9F7F3",
  panelBg: "#F5F3EF",
  rowAlt: "#F0ECE4",
  border: "#E7E1D4",
  borderSoft: "#EDE8DE",
  text: "#1B1712",
  textSub: "#8B8983",
  textFaint: "#A9A6A0",
  gold: "#8B5E13",
  goldBtn: "#96650B",
  goldBtnDark: "#7E5709",
  navy: "#171A33",
  tagYearBg: "#F1D9BC",
  tagYearText: "#8B5E13",
  tagNewBg: "#DEDCE6",
  tagNewText: "#181633",
  tagFeaturedBg: "#DCD6CC",
  tagFeaturedText: "#4A3F2E",
  black: "#000000",
  dealerSub: "#ACAFC0",
  amberIcon: "#C6841E",
  chipBg: "#ECEAF5",
  chipIcon: "#2A2A4A",
};

const heading = "'Playfair Display', Georgia, 'Times New Roman', serif";
const body = "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";

/* ─── icon set ─── */
/* svg root: attribute width/height alone doesn't give a definite CSS box size
   inside a flex container (they collapse to 0 on the main axis), so every
   icon also mirrors width/height into inline style. */
const iconBox = (p) => ({ width: p.width, height: p.height, flexShrink: 0, display: "block", ...(p.style || {}) });

const Ico = {
  Logo: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.4" /><path d="M12 4v3.4M12 16.6V20M4 12h3.4M16.6 12H20" /></svg>,
  Share: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
  ChevL: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  ChevR: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>,
  Swipe: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M4 12h16" /></svg>,
  Car: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13" /><rect x="2.5" y="13" width="19" height="5" rx="1.5" /><circle cx="7" cy="18.5" r="1.3" /><circle cx="17" cy="18.5" r="1.3" /></svg>,
  Shield: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3.5V11c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V5.5L12 2z" /></svg>,
  Bolt: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  ShieldSm: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.amberIcon} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3.5V11c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V5.5L12 2z" /></svg>,
  Clock: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.amberIcon} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>,
  Dealer: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.amberIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1-5h16l1 5" /><path d="M4 9h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9z" /><path d="M9 20v-6h6v6" /></svg>,
  Phone: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8.1 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.9 2.2z" /></svg>,
  Close: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.textSub} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Mileage: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.2" /><rect x="14" y="3" width="7" height="7" rx="1.2" /><rect x="3" y="14" width="7" height="7" rx="1.2" /><rect x="14" y="14" width="7" height="7" rx="1.2" /></svg>,
  Transmission: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#5B5F6B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v3m0 16v3M4.2 4.2l2.1 2.1m11.4 11.4l2.1 2.1M1 12h3m16 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>,
  Fuel: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" /><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2 2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 4" /><path d="M3 22h12M7 9h4" /></svg>,
  Consumption: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#5B5F6B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 12l4-2.5M12 7v.01" /></svg>,
  Engine: (p) => <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#5B5F6B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.7 12.7l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
};

const STAT_ICON = { mileage: Ico.Mileage, transmission: Ico.Transmission, fuel: Ico.Fuel, consumption: Ico.Consumption, engine: Ico.Engine };

/* ─── shared bits ─── */
const FontLinks = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
  />
);

const GlobalStyle = () => (
  <style>{`
    .vc1-scroll::-webkit-scrollbar { display: none; }
    .vc1-scroll { scrollbar-width: none; }
    .vc1-navbtn { transition: background .15s ease; }
    .vc1-navbtn:hover { background: rgba(0,0,0,.6) !important; }
    .vc1-dot { transition: all .25s ease; }
    @keyframes vc1-fade { from { opacity: 0 } to { opacity: 1 } }
    @keyframes vc1-scaleIn { from { opacity: 0; transform: scale(.94) } to { opacity: 1; transform: scale(1) } }
    @keyframes vc1-slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
    .vc1-overlay { animation: vc1-fade .2s ease; }
    .vc1-dialog { animation: vc1-scaleIn .22s cubic-bezier(.2,.9,.3,1.2); }
    .vc1-sheet { animation: vc1-slideUp .28s cubic-bezier(.2,.9,.3,1.1); }
    .vc1-input:focus { outline: none; border-color: ${C.gold} !important; }
  `}</style>
);

const Tag = ({ label, kind }) => {
  const map = {
    year: { bg: C.tagYearBg, text: C.tagYearText },
    new: { bg: C.tagNewBg, text: C.tagNewText },
    featured: { bg: C.tagFeaturedBg, text: C.tagFeaturedText },
  };
  const s = map[kind];
  return (
    <span style={{
      display: "inline-block", background: s.bg, color: s.text,
      fontFamily: body, fontSize: 12, fontWeight: 700, letterSpacing: ".02em",
      padding: "6px 12px", borderRadius: 8,
    }}>{label}</span>
  );
};

const Row = ({ k, val, i }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 18px", background: i % 2 === 1 ? C.rowAlt : "transparent",
    borderBottom: `1px solid ${C.borderSoft}`,
  }}>
    <span style={{ fontFamily: body, fontSize: 13.5, color: C.textSub, fontWeight: 500 }}>{k}</span>
    <span style={{ fontFamily: body, fontSize: 13.5, color: C.text, fontWeight: 700, textAlign: "right" }}>{val}</span>
  </div>
);

const SpecPanel = ({ title, icon: Icon, rows }) => (
  <div style={{ background: C.panelBg, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px" }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: C.chipBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon width={16} height={16} />
      </div>
      <span style={{ fontFamily: body, fontSize: 15.5, fontWeight: 700, color: C.text }}>{title}</span>
    </div>
    {rows.map(([k, val], i) => <Row key={k} k={k} val={val} i={i} />)}
  </div>
);

const DealerCard = () => (
  <div style={{ background: C.black, borderRadius: 16, padding: "18px 20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ico.Dealer width={19} height={19} />
      </div>
      <div>
        <div style={{ fontFamily: body, fontSize: 15, fontWeight: 700, color: "#fff" }}>{DATA.dealer.name}</div>
        <div style={{ fontFamily: body, fontSize: 12.5, color: C.dealerSub, marginTop: 2 }}>{DATA.dealer.location}</div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: body, fontSize: 11.5, color: C.dealerSub, flexWrap: "wrap", rowGap: 6 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><Ico.ShieldSm width={12} height={12} /> Verified Dealer</span>
      <span style={{ color: "#4A4A4A" }}>·</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><Ico.Clock width={12} height={12} /> {DATA.dealer.responds}</span>
    </div>
  </div>
);

const navBtnStyle = (side, size) => ({
  position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 10, zIndex: 2,
  width: size, height: size, borderRadius: "50%", background: "rgba(0,0,0,.48)",
  border: "none", display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", backdropFilter: "blur(4px)",
});

/* ═══════════ ENQUIRY MODAL (dialog | sheet) ═══════════ */
function EnquiryModal({ variant, onClose }) {
  const isSheet = variant === "sheet";
  return (
    <div
      className="vc1-overlay"
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, background: "rgba(20,17,12,.5)", zIndex: 50,
        display: "flex", alignItems: isSheet ? "flex-end" : "center", justifyContent: "center",
      }}
    >
      <div
        className={isSheet ? "vc1-sheet" : "vc1-dialog"}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.cardBg, width: isSheet ? "100%" : 420, maxWidth: "100%",
          maxHeight: isSheet ? "88%" : "90%", overflowY: "auto",
          borderRadius: isSheet ? "20px 20px 0 0" : 20,
          padding: isSheet ? "10px 22px 24px" : "26px 26px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,.25)",
        }}
      >
        {isSheet && (
          <div style={{ width: 38, height: 4, borderRadius: 3, background: C.border, margin: "0 auto 16px" }} />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <h3 style={{ fontFamily: heading, fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>
            Enquire About This Vehicle
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <Ico.Close width={18} height={18} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 20 }}>
          <img src={IMAGES[0]} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: body, fontSize: 13, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{DATA.title}</div>
            <div style={{ fontFamily: heading, fontSize: 14, fontWeight: 700, color: C.gold, marginTop: 2 }}>{DATA.price}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <Field label="Full Name" placeholder="John Smith" />
          <Field label="Phone" placeholder="+27 82 123 4567" />
        </div>
        <Field label="Email Address" placeholder="john@example.com" style={{ marginBottom: 14 }} />
        <div style={{ marginBottom: 6 }}>
          <label style={fieldLabelStyle}>Message</label>
          <textarea
            className="vc1-input"
            placeholder="I am interested in this vehicle..."
            rows={4}
            style={{ ...fieldInputStyle, resize: "none", fontFamily: body }}
          />
        </div>
        <div style={{ textAlign: "right", fontFamily: body, fontSize: 11.5, color: C.textFaint, marginBottom: 16 }}>Max 500 characters</div>

        <button style={{
          width: "100%", background: C.goldBtn, color: "#fff", border: "none", borderRadius: 12,
          padding: "15px", fontFamily: body, fontSize: 15, fontWeight: 700, cursor: "pointer",
        }}>Send Enquiry</button>
      </div>
    </div>
  );
}

const fieldLabelStyle = { display: "block", fontFamily: body, fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 };
const fieldInputStyle = { width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 13px", fontSize: 13.5, color: C.text, boxSizing: "border-box" };

const Field = ({ label, placeholder, style }) => (
  <div style={style}>
    <label style={fieldLabelStyle}>{label}</label>
    <input className="vc1-input" placeholder={placeholder} style={fieldInputStyle} />
  </div>
);

/* ═══════════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════════ */
function MobileCard() {
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(false);
  const prev = () => setIdx((i) => (i > 0 ? i - 1 : IMAGES.length - 1));
  const next = () => setIdx((i) => (i < IMAGES.length - 1 ? i + 1 : 0));

  return (
    <div style={{ position: "relative", background: C.cardBg, fontFamily: body, height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="vc1-scroll" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto", paddingBottom: 82 }}>
        {/* gallery */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "8/5", overflow: "hidden", background: "#111" }}>
          <img src={IMAGES[idx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <button className="vc1-navbtn" onClick={prev} style={navBtnStyle("left", 34)}><Ico.ChevL width={18} height={18} /></button>
          <button className="vc1-navbtn" onClick={next} style={navBtnStyle("right", 34)}><Ico.ChevR width={18} height={18} /></button>
          <button className="vc1-navbtn" style={{ position: "absolute", top: 12, right: 12, zIndex: 2, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.48)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)" }}>
            <Ico.Share width={15} height={15} style={{ stroke: "#fff" }} />
          </button>
          <span style={{ position: "absolute", left: 12, bottom: 12, display: "flex", alignItems: "center", gap: 5, background: "rgba(0,0,0,.5)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 20 }}>
            <Ico.Swipe width={13} height={13} /> Swipe
          </span>
          <span style={{ position: "absolute", right: 12, bottom: 12, background: "rgba(0,0,0,.5)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>
            {idx + 1} / {IMAGES.length}
          </span>
        </div>

        {/* tags */}
        <div style={{ display: "flex", gap: 8, padding: "16px 18px 0" }}>
          {DATA.tags.map((t) => <Tag key={t.label} label={t.label} kind={t.kind} />)}
        </div>

        {/* title / price */}
        <div style={{ padding: "10px 18px 0" }}>
          <h1 style={{ fontFamily: heading, fontSize: 21, fontWeight: 700, color: C.text, margin: "0 0 6px", lineHeight: 1.25 }}>
            {DATA.title}
          </h1>
          <p style={{ fontFamily: body, fontSize: 12.5, color: C.textSub, margin: "0 0 10px" }}>{DATA.subtitle}</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: heading, fontSize: 26, fontWeight: 700, color: C.gold }}>{DATA.price}</span>
            <span style={{ fontFamily: body, fontSize: 13, color: C.textFaint }}>{DATA.mileageShort}</span>
          </div>
        </div>

        {/* quick stats — 2 col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "16px 18px 0" }}>
          {DATA.quickStats.map((s) => {
            const Icon = STAT_ICON[s.icon];
            return (
              <div key={s.label} style={{ background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <Icon width={14} height={14} />
                  <span style={{ fontFamily: body, fontSize: 10, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</span>
                </div>
                <div style={{ fontFamily: body, fontSize: 13.5, fontWeight: 700, color: C.text }}>{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* description */}
        <div style={{ padding: "22px 18px 0" }}>
          <h2 style={{ fontFamily: body, fontSize: 12.5, fontWeight: 700, letterSpacing: ".05em", color: C.text, margin: "0 0 10px" }}>DESCRIPTION</h2>
          <p style={{ fontFamily: body, fontSize: 13.5, color: C.textSub, lineHeight: 1.65, margin: 0 }}>{DATA.description}</p>
        </div>

        {/* specifications */}
        <div style={{ padding: "22px 18px 0" }}>
          <h2 style={{ fontFamily: body, fontSize: 12.5, fontWeight: 700, letterSpacing: ".05em", color: C.text, margin: "0 0 12px" }}>SPECIFICATIONS</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {DATA.specs.map((p) => <SpecPanel key={p.title} title={p.title} icon={Ico[p.icon[0].toUpperCase() + p.icon.slice(1)]} rows={p.rows} />)}
          </div>
        </div>

        {/* dealer */}
        <div style={{ padding: "16px 18px 0" }}>
          <DealerCard />
        </div>
      </div>

      {/* sticky footer */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", gap: 10, padding: "14px 18px", background: C.cardBg, borderTop: `1px solid ${C.border}` }}>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 18px", fontFamily: body, fontSize: 14, fontWeight: 700, color: C.text, cursor: "pointer" }}>
          <Ico.Phone width={16} height={16} /> Call
        </button>
        <button onClick={() => setModal(true)} style={{ flex: 1, background: C.goldBtn, border: "none", borderRadius: 12, padding: "13px 18px", fontFamily: body, fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
          Enquire Now
        </button>
      </div>

      {modal && <EnquiryModal variant="sheet" onClose={() => setModal(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP CARD
   ═══════════════════════════════════════════════════ */
function DesktopCard() {
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(false);
  const prev = () => setIdx((i) => (i > 0 ? i - 1 : IMAGES.length - 1));
  const next = () => setIdx((i) => (i < IMAGES.length - 1 ? i + 1 : 0));

  return (
    <div style={{ position: "relative", background: C.pageBg, fontFamily: body, height: "100%" }}>
      <div className="vc1-scroll" style={{ height: "100%", overflowY: "auto", paddingBottom: 90 }}>
        <div style={{ maxWidth: 670, margin: "0 auto" }}>

          {/* header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Ico.Logo width={22} height={22} />
              <span style={{ fontFamily: heading, fontSize: 18, fontWeight: 700, color: C.text }}>{DATA.dealer.name}</span>
            </div>
            <button style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Ico.Share width={16} height={16} />
            </button>
          </div>

          {/* gallery */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", borderRadius: "14px 14px 0 0", background: "#111" }}>
            <img src={IMAGES[idx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <button className="vc1-navbtn" onClick={prev} style={navBtnStyle("left", 40)}><Ico.ChevL width={20} height={20} /></button>
            <button className="vc1-navbtn" onClick={next} style={navBtnStyle("right", 40)}><Ico.ChevR width={20} height={20} /></button>
            <span style={{ position: "absolute", right: 16, bottom: 14, background: "rgba(0,0,0,.5)", color: "#fff", fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 20 }}>
              {idx + 1} / {IMAGES.length}
            </span>
          </div>

          {/* dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "16px 0" }}>
            {IMAGES.map((_, i) => (
              <button key={i} className="vc1-dot" onClick={() => setIdx(i)} style={{
                width: i === idx ? 20 : 7, height: 7, borderRadius: 10, border: "none", cursor: "pointer",
                background: i === idx ? C.text : C.border,
              }} />
            ))}
          </div>

          {/* tags */}
          <div style={{ display: "flex", gap: 8, padding: "0 4px" }}>
            {DATA.tags.map((t) => <Tag key={t.label} label={t.label} kind={t.kind} />)}
          </div>

          {/* title / subtitle */}
          <div style={{ padding: "16px 4px 0" }}>
            <h1 style={{ fontFamily: heading, fontSize: 27, fontWeight: 700, color: C.text, margin: "0 0 8px", lineHeight: 1.25 }}>
              {DATA.title}
            </h1>
            <p style={{ fontFamily: body, fontSize: 13.5, color: C.textSub, margin: 0 }}>{DATA.subtitle}</p>
          </div>

          <div style={{ height: 1, background: C.border, margin: "20px 4px" }} />

          {/* price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "0 4px" }}>
            <span style={{ fontFamily: heading, fontSize: 32, fontWeight: 700, color: C.gold }}>{DATA.price}</span>
            <span style={{ fontFamily: body, fontSize: 14, color: C.textFaint }}>{DATA.mileageShort}</span>
          </div>

          {/* quick stats — row */}
          <div style={{ display: "flex", gap: 10, padding: "18px 4px 0" }}>
            {DATA.quickStats.map((s) => {
              const Icon = STAT_ICON[s.icon];
              return (
                <div key={s.label} style={{ flex: 1, background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Icon width={14} height={14} />
                    <span style={{ fontFamily: body, fontSize: 9.5, fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" }}>{s.label}</span>
                  </div>
                  <div style={{ fontFamily: body, fontSize: 13.5, fontWeight: 700, color: C.text, whiteSpace: "nowrap" }}>{s.value}</div>
                </div>
              );
            })}
          </div>

          {/* description */}
          <div style={{ padding: "26px 4px 0" }}>
            <h2 style={{ fontFamily: body, fontSize: 13, fontWeight: 700, letterSpacing: ".05em", color: C.text, margin: "0 0 12px" }}>DESCRIPTION</h2>
            <p style={{ fontFamily: body, fontSize: 14, color: C.textSub, lineHeight: 1.7, margin: 0 }}>{DATA.description}</p>
          </div>

          {/* specifications */}
          <div style={{ padding: "26px 4px 0" }}>
            <h2 style={{ fontFamily: body, fontSize: 13, fontWeight: 700, letterSpacing: ".05em", color: C.text, margin: "0 0 14px" }}>SPECIFICATIONS</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {DATA.specs.map((p) => <SpecPanel key={p.title} title={p.title} icon={Ico[p.icon[0].toUpperCase() + p.icon.slice(1)]} rows={p.rows} />)}
            </div>
          </div>

          {/* dealer */}
          <div style={{ padding: "16px 4px 24px" }}>
            <DealerCard />
          </div>
        </div>
      </div>

      {/* sticky footer */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: C.cardBg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 670, margin: "0 auto", display: "flex", gap: 12, padding: "16px 4px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 24px", fontFamily: body, fontSize: 15, fontWeight: 700, color: C.text, cursor: "pointer" }}>
            <Ico.Phone width={17} height={17} /> Call
          </button>
          <button onClick={() => setModal(true)} style={{ flex: 1, background: C.goldBtn, border: "none", borderRadius: 12, padding: "14px 24px", fontFamily: body, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
            Enquire Now
          </button>
        </div>
      </div>

      {modal && <EnquiryModal variant="dialog" onClose={() => setModal(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PREVIEW WRAPPER
   ═══════════════════════════════════════════════════ */
export default function VehicleCard1() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: "#EDEAE3", minHeight: "100%", fontFamily: body }}>
      <FontLinks />
      <GlobalStyle />

      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "18px 16px 0" }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 26px", fontSize: 13, fontWeight: 700, textTransform: "capitalize",
              borderRadius: 10, cursor: "pointer", fontFamily: body,
              border: mode === m ? `1.5px solid ${C.goldBtn}` : `1.5px solid ${C.border}`,
              background: mode === m ? C.goldBtn : "#fff",
              color: mode === m ? "#fff" : C.text,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 16px 48px", display: "flex", justifyContent: "center" }}>
        {mode === "mobile" ? (
          <div style={{
            width: 390, height: 780, borderRadius: 32, border: "10px solid #1A1A1A",
            overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.18)", position: "relative", background: C.cardBg,
          }}>
            <MobileCard />
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 900, height: 780, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,.1)", borderRadius: 16, overflow: "hidden" }}>
            <DesktopCard />
          </div>
        )}
      </div>
    </div>
  );
}
