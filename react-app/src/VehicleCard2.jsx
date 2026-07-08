import { useState } from "react";

/* ══════════════════════════════════════════════════════════════
   VEHICLE CARD 2 — "Orbit / CardPwa" listing
   Recreated pixel-for-pixel from OrbitDesktop.mp4 / OrbitMobile.mp4
   Off-white page, floating white cards, serif display headings
   (Playfair) over sans body (Inter), teal-green accent, dark logo tile.
   Mobile + Desktop layouts live in this one file behind a preview toggle.
   ══════════════════════════════════════════════════════════════ */

const IMAGES = [
  "/vehicle-card-2/img1.jpg",
  "/vehicle-card-2/img2.jpg",
  "/vehicle-card-2/img3.jpg",
  "/vehicle-card-2/img4.jpg",
  "/vehicle-card-2/img5.jpg",
  "/vehicle-card-2/img6.jpg",
  "/vehicle-card-2/img7.jpg",
];

const DATA = {
  brand: "CardPwa",
  price: "R 570 000",
  title: "LAND ROVER Evoque",
  variant: "R-Dynamic SE",
  year: "2021",
  photoCount: 10,
  quickStats: [
    { icon: "gauge", value: "38 000 kms" },
    { icon: "steering", value: "Automatic" },
    { icon: "car", value: "SUV" },
    { icon: "palette", value: "Red" },
    { icon: "person", value: "5 Seats" },
  ],
  dealer: {
    name: "Prestige Motors",
    location: "Sandton Johannesburg",
    verified: true,
    responds: "Responds within 2 hours",
  },
  description:
    "Experience the pinnacle of luxury and efficiency with this limited edition Mercedes-Benz C-Class 350e Sedan. Featuring a plug-in hybrid powertrain, this vehicle combines exhilarating performance with exceptional fuel economy. The interior is appointed with premium materials and cutting-edge technology, ensuring every journey is as comfortable as it is memorable.",
  specs: [
    {
      title: "Vehicle Details",
      rows: [
        ["Make", "LAND ROVER"],
        ["Model", "Evoque"],
        ["Variant", "R-Dynamic SE"],
        ["Year", "2021"],
        ["Mileage", "38 000 kms"],
        ["Transmission", "Automatic"],
        ["Body Type", "SUV"],
        ["Colour", "Red"],
        ["Seats", "5"],
        ["Doors", "5"],
        ["Branch", "Cape Town"],
        ["Stock No.", "VH001"],
      ],
    },
    {
      title: "Vehicle Performance",
      rows: [
        ["Fuel Consumption", "9.3 / 100kms"],
        ["Engine Capacity", "1.5 L"],
        ["Fuel Tank", "45 L"],
        ["Fuel Type", "Hybrid (Petrol)"],
        ["Cylinders", "4"],
        ["Power Output", "309 bhp"],
        ["Drive", "Front"],
        ["Gears", "5"],
      ],
    },
    {
      title: "Vehicle Condition",
      rows: [
        ["Category", "Used"],
        ["Service History", "Full"],
        ["Roadworthy", "Yes"],
        ["Spare Key", "Yes"],
        ["Warranty Until", "2026"],
      ],
    },
  ],
};

/* ── palette (sampled from source video frames) ── */
const C = {
  pageBg: "#F8F9F9",
  cardBg: "#FFFFFF",
  headerBg: "#FFFFFF",
  headerBorder: "#EFEFF1",
  logoBg: "#2B2F36",
  border: "#E9EAEC",
  chipBg: "#F8F9F9",
  divider: "#EFEFEF",
  text: "#14171C",
  textSub: "#6B7280",
  textFaint: "#9AA0A8",
  green: "#0F7A55",       // verified icon + text
  greenBg: "#D6F5EC",     // verified pill
  teal: "#0E9488",        // responds link + selected thumb border
  tealTile: "#CDEFE3",    // dealer icon tile
  chipIcon: "#6B7280",
};

const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
const body = "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif";

/* ─── icon set ─── */
const iconBox = (p) => ({ width: p.width, height: p.height, flexShrink: 0, display: "block", ...(p.style || {}) });

const Ico = {
  Logo: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15.5V12l1.4-3.7A2 2 0 017.3 7h9.4a2 2 0 011.9 1.3L20 12v3.5" />
      <path d="M4 15.5h16v1.7a1 1 0 01-1 1h-1.3a1 1 0 01-1-1v-.7M4 15.5v1.7a1 1 0 001 1h1.3a1 1 0 001-1v-.7" />
      <path d="M6.5 12h11" />
    </svg>
  ),
  Share: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" />
      <line x1="8.3" y1="10.7" x2="15.6" y2="6.6" /><line x1="8.3" y1="13.3" x2="15.6" y2="17.4" />
    </svg>
  ),
  ChevronUp: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#9AA0A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 15 12 9 18 15" />
    </svg>
  ),
  Gauge: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 12l3.2-3.2M12 16.2v.01" />
    </svg>
  ),
  Steering: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1.9" />
      <path d="M12 13.9v3.2M10.4 11l-6.2-2M13.6 11l6.2-2" />
    </svg>
  ),
  Car: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15V12.5l1.1-3.2A2 2 0 017 8h10a2 2 0 011.9 1.3L20 12.5V15" />
      <rect x="3" y="15" width="18" height="3.2" rx="1.2" />
    </svg>
  ),
  Palette: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="8.3" r="1" fill={C.chipIcon} stroke="none" />
    </svg>
  ),
  Person: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.chipIcon} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  ),
  Store: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="8" width="14" height="12" rx="1" />
      <path d="M9 20v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
      <path d="M8.5 11.5h.01M8.5 14h.01M15.5 11.5h.01M15.5 14h.01" />
      <path d="M5 8l1-3h12l1 3" />
    </svg>
  ),
  Verified: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill={C.green} stroke="none">
      <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1z" />
      <path d="M8.2 12.2l2.4 2.4L15.8 9.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const STAT_ICON = { gauge: Ico.Gauge, steering: Ico.Steering, car: Ico.Car, palette: Ico.Palette, person: Ico.Person };

/* ─── shared style ─── */
const FontLinks = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
  />
);

const GlobalStyle = () => (
  <style>{`
    .vc2-thumbs::-webkit-scrollbar { height: 6px; }
    .vc2-thumbs::-webkit-scrollbar-track { background: #E3E4E6; border-radius: 10px; }
    .vc2-thumbs::-webkit-scrollbar-thumb { background: #C7C9CC; border-radius: 10px; }
    .vc2-page::-webkit-scrollbar { width: 9px; }
    .vc2-page::-webkit-scrollbar-track { background: transparent; }
    .vc2-page::-webkit-scrollbar-thumb { background: #8A8A8A; border-radius: 10px; }
    .vc2-thumb-btn { cursor: pointer; }
  `}</style>
);

/* ─── shared components ─── */
const Header = ({ height }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height, padding: "0 18px", background: C.headerBg, borderBottom: `1px solid ${C.headerBorder}`,
    position: "sticky", top: 0, zIndex: 5, flexShrink: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: C.logoBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico.Logo width={18} height={18} />
      </div>
      <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.text }}>{DATA.brand}</span>
    </div>
    <Ico.Share width={17} height={17} />
  </div>
);

const Gallery = ({ idx, setIdx, thumbSize, aspect }) => (
  <div>
    <div style={{ position: "relative", width: "100%", aspectRatio: aspect, borderRadius: 14, overflow: "hidden", background: "#d8d5d2" }}>
      <img src={IMAGES[idx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <span style={{
        position: "absolute", right: 12, bottom: 12, background: "rgba(0,0,0,.6)", color: "#fff",
        fontFamily: body, fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 8,
      }}>{DATA.photoCount} photos</span>
    </div>
    <div className="vc2-thumbs" style={{ display: "flex", gap: 10, marginTop: 12, overflowX: "auto", paddingBottom: 6 }}>
      {IMAGES.map((src, i) => (
        <button
          key={src}
          className="vc2-thumb-btn"
          onClick={() => setIdx(i)}
          style={{
            width: thumbSize, height: Math.round(thumbSize * 0.82), flexShrink: 0, borderRadius: 12, overflow: "hidden", padding: 0,
            border: i === idx ? `2px solid ${C.teal}` : `2px solid ${C.border}`,
            boxSizing: "border-box", background: "none",
          }}
        >
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </button>
      ))}
    </div>
  </div>
);

const PriceBlock = ({ priceSize, titleSize }) => (
  <div>
    <div style={{ fontFamily: serif, fontSize: priceSize, fontWeight: 800, color: C.text, letterSpacing: "-.01em" }}>{DATA.price}</div>
    <div style={{ fontFamily: serif, fontSize: titleSize, fontWeight: 700, color: C.text, marginTop: 6 }}>{DATA.title}</div>
    <div style={{ fontFamily: body, fontSize: 14, color: C.textSub, marginTop: 5 }}>
      {DATA.variant} <span style={{ margin: "0 4px" }}>•</span> {DATA.year}
    </div>
  </div>
);

const StatChips = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
    {DATA.quickStats.map((s) => {
      const Icon = STAT_ICON[s.icon];
      return (
        <div key={s.value} style={{
          display: "flex", alignItems: "center", gap: 7, background: C.chipBg,
          border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 12px",
        }}>
          <Icon width={15} height={15} />
          <span style={{ fontFamily: body, fontSize: 13.5, fontWeight: 500, color: C.text }}>{s.value}</span>
        </div>
      );
    })}
  </div>
);

const DealerCard = ({ padding }) => (
  <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: C.tealTile, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ico.Store width={22} height={22} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
          <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 700, color: C.text, whiteSpace: "nowrap" }}>{DATA.dealer.name}</span>
          {DATA.dealer.verified && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: C.greenBg, color: C.green, fontFamily: body, fontSize: 11.5, fontWeight: 700, padding: "3px 9px 3px 6px", borderRadius: 20, whiteSpace: "nowrap" }}>
              <Ico.Verified width={13} height={13} /> Verified
            </span>
          )}
        </div>
        <div style={{ fontFamily: body, fontSize: 14, color: C.textSub, marginTop: 5 }}>{DATA.dealer.location}</div>
        <div style={{ fontFamily: body, fontSize: 13.5, fontWeight: 600, color: C.teal, marginTop: 5 }}>{DATA.dealer.responds}</div>
      </div>
    </div>
  </div>
);

const About = () => (
  <div>
    <div style={{ fontFamily: body, fontSize: 12, fontWeight: 700, letterSpacing: ".09em", color: C.textFaint, textTransform: "uppercase" }}>
      About This Vehicle
    </div>
    <p style={{ fontFamily: body, fontSize: 14.5, color: C.textSub, lineHeight: 1.7, margin: "14px 0 0" }}>
      {DATA.description}
    </p>
  </div>
);

const Row = ({ k, val, isLast }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 22px", borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
  }}>
    <span style={{ fontFamily: body, fontSize: 14, color: C.textSub }}>{k}</span>
    <span style={{ fontFamily: body, fontSize: 14, color: C.text, fontWeight: 700, textAlign: "right" }}>{val}</span>
  </div>
);

const SpecCard = ({ title, rows }) => (
  <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "19px 22px" }}>
      <span style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, color: C.text }}>{title}</span>
      <Ico.ChevronUp width={18} height={18} />
    </div>
    {rows.map(([k, val], i) => <Row key={k} k={k} val={val} isLast={i === rows.length - 1} />)}
  </div>
);

/* ═══════════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════════ */
function MobileCard() {
  const [idx, setIdx] = useState(0);

  return (
    <div style={{ background: C.pageBg, fontFamily: body, height: "100%", display: "flex", flexDirection: "column" }}>
      <Header height={60} />
      <div className="vc2-page" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto" }}>
        <div style={{ padding: "16px 16px 36px" }}>
          <Gallery idx={idx} setIdx={setIdx} thumbSize={78} aspect={1.35} />

          <div style={{ marginTop: 22 }}>
            <PriceBlock priceSize={30} titleSize={20} />
          </div>

          <div style={{ marginTop: 18 }}>
            <StatChips />
          </div>

          <div style={{ marginTop: 20 }}>
            <DealerCard padding="18px" />
          </div>

          <div style={{ marginTop: 24 }}>
            <About />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
            {DATA.specs.map((s) => <SpecCard key={s.title} title={s.title} rows={s.rows} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP CARD
   ═══════════════════════════════════════════════════ */
function DesktopCard() {
  const [idx, setIdx] = useState(0);

  return (
    <div style={{ background: C.pageBg, fontFamily: body, height: "100%", display: "flex", flexDirection: "column" }}>
      <Header height={64} />
      <div className="vc2-page" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "26px 4px 52px" }}>
          <Gallery idx={idx} setIdx={setIdx} thumbSize={92} aspect={1.5} />

          <div style={{ marginTop: 26 }}>
            <PriceBlock priceSize={38} titleSize={24} />
          </div>

          <div style={{ marginTop: 22 }}>
            <StatChips />
          </div>

          <div style={{ marginTop: 24 }}>
            <DealerCard padding="20px 22px" />
          </div>

          <div style={{ marginTop: 28 }}>
            <About />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 26 }}>
            {DATA.specs.map((s) => <SpecCard key={s.title} title={s.title} rows={s.rows} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PREVIEW WRAPPER
   ═══════════════════════════════════════════════════ */
export default function VehicleCard2() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: "#E9EBEA", minHeight: "100%", fontFamily: body }}>
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
              border: mode === m ? `1.5px solid ${C.teal}` : `1.5px solid ${C.border}`,
              background: mode === m ? C.teal : "#fff",
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
            width: 386, height: 792, borderRadius: 32, border: "10px solid #1A1A1A",
            overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.18)", position: "relative", background: C.pageBg,
          }}>
            <MobileCard />
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 1156, height: 792, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,.1)", borderRadius: 16, overflow: "hidden" }}>
            <DesktopCard />
          </div>
        )}
      </div>
    </div>
  );
}
