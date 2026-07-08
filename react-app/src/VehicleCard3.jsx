import { useState } from "react";

/* ══════════════════════════════════════════════════════════════
   VEHICLE CARD 3 — "Horizon / CardPwa" listing
   Recreated pixel-for-pixel from HorizonDesktop.mp4 / HorizonMobile.mp4
   Cool light-lavender page background, floating white cards, blue accent.
   Mobile + Desktop layouts live in this one file behind a preview toggle.
   ══════════════════════════════════════════════════════════════ */

const IMAGES = [
  "/vehicle-card-3/img1.jpg",
  "/vehicle-card-3/img2.jpg",
  "/vehicle-card-3/img3.jpg",
  "/vehicle-card-3/img4.jpg",
  "/vehicle-card-3/img5.jpg",
  "/vehicle-card-3/img6.jpg",
  "/vehicle-card-3/img7.jpg",
];

const DATA = {
  brand: "CardPwa",
  price: "R 570 000",
  make: "LAND ROVER",
  model: "Evoque",
  variant: "R-Dynamic SE",
  title: "LAND ROVER Evoque",
  photoCount: 10,
  quickStats: [
    { icon: "calendar", value: "2021" },
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
  pageBg: "#ECEDF2",
  headerBg: "#FCFCFC",
  cardBg: "#FFFFFF",
  border: "#E8E9EF",
  divider: "#ECECEC",
  text: "#0C0E14",
  textSub: "#68707C",
  textFaint: "#9AA1AC",
  blue: "#0A81D1",
  blueLink: "#1C6FDB",
  badgeBg: "#DCEAFB",
  scrollTrack: "#E3E4E9",
  scrollThumb: "#C7C9D2",
};

const body = "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif";

/* ─── icon set ─── */
const iconBox = (p) => ({ width: p.width, height: p.height, flexShrink: 0, display: "block", ...(p.style || {}) });

const Ico = {
  Logo: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16.5V12l1.6-4.2A2 2 0 017.5 6.5h9a2 2 0 011.9 1.3L20 12v4.5" />
      <path d="M4 16.5h16v2a1 1 0 01-1 1h-1.5a1 1 0 01-1-1v-1M4 16.5v1a1 1 0 001 1H6a1 1 0 001-1v-1" />
      <circle cx="8" cy="16.4" r="0.1" />
      <circle cx="16" cy="16.4" r="0.1" />
    </svg>
  ),
  Share: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" />
      <line x1="8.3" y1="10.7" x2="15.6" y2="6.6" /><line x1="8.3" y1="13.3" x2="15.6" y2="17.4" />
    </svg>
  ),
  ChevronUp: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke="#8A909B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 15 12 9 18 15" />
    </svg>
  ),
  Calendar: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.3" /><path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  ),
  Gauge: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 12l3.2-3.2M12 16.2v.01" />
    </svg>
  ),
  Steering: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1.6" /><path d="M12 13.6V19M12 8.5V6" />
    </svg>
  ),
  Car: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15.5V13l1.2-3.4A2 2 0 017.1 8.3h9.8a2 2 0 011.9 1.3L20 13v2.5" />
      <rect x="3" y="15.4" width="18" height="3.2" rx="1.2" />
      <circle cx="7.2" cy="18.6" r="0.1" /><circle cx="16.8" cy="18.6" r="0.1" />
    </svg>
  ),
  Palette: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="8.3" r="1" fill={C.blue} stroke="none" />
    </svg>
  ),
  Person: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  ),
  Store: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l.8-4.2A1.5 1.5 0 016.3 4.5h11.4a1.5 1.5 0 011.5 1.3L20 10" />
      <path d="M4.5 10a2 2 0 004 .2 2 2 0 004-.2 2 2 0 004 .2 2 2 0 004-.2" />
      <path d="M5 10.5V18a1 1 0 001 1h12a1 1 0 001-1v-7.5" />
      <path d="M9.5 19v-4a1 1 0 011-1h3a1 1 0 011 1v4" />
    </svg>
  ),
  Verified: (p) => (
    <svg {...p} style={iconBox(p)} viewBox="0 0 24 24" fill={C.blueLink} stroke="none">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.3l2.5 2.5L16 9.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const STAT_ICON = { calendar: Ico.Calendar, gauge: Ico.Gauge, steering: Ico.Steering, car: Ico.Car, palette: Ico.Palette, person: Ico.Person };

/* ─── shared style helpers ─── */
const GlobalStyle = () => (
  <style>{`
    .vc3-thumbs::-webkit-scrollbar { height: 6px; }
    .vc3-thumbs::-webkit-scrollbar-track { background: ${C.scrollTrack}; border-radius: 10px; }
    .vc3-thumbs::-webkit-scrollbar-thumb { background: ${C.scrollThumb}; border-radius: 10px; }
    .vc3-page::-webkit-scrollbar { width: 8px; }
    .vc3-page::-webkit-scrollbar-track { background: transparent; }
    .vc3-page::-webkit-scrollbar-thumb { background: #c7c9d2; border-radius: 10px; }
    .vc3-thumb-btn { transition: box-shadow .15s ease; cursor: pointer; }
  `}</style>
);

/* ─── shared components ─── */
const Header = ({ height }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height, padding: "0 18px", background: C.headerBg, borderBottom: `1px solid #F0F0F3`,
    position: "sticky", top: 0, zIndex: 5, flexShrink: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico.Logo width={17} height={17} />
      </div>
      <span style={{ fontFamily: body, fontSize: 16, fontWeight: 700, color: C.text }}>{DATA.brand}</span>
    </div>
    <Ico.Share width={17} height={17} />
  </div>
);

const Gallery = ({ idx, setIdx, thumbSize }) => (
  <div>
    <div style={{ position: "relative", width: "100%", aspectRatio: "1.3", borderRadius: 14, overflow: "hidden", background: "#d8d5d2" }}>
      <img src={IMAGES[idx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <span style={{
        position: "absolute", right: 12, bottom: 12, background: "rgba(0,0,0,.55)", color: "#fff",
        fontFamily: body, fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 20,
      }}>{DATA.photoCount} photos</span>
    </div>
    <div className="vc3-thumbs" style={{ display: "flex", gap: 8, marginTop: 12, overflowX: "auto", paddingBottom: 8 }}>
      {IMAGES.map((src, i) => (
        <button
          key={src}
          className="vc3-thumb-btn"
          onClick={() => setIdx(i)}
          style={{
            width: thumbSize, height: thumbSize, flexShrink: 0, borderRadius: 10, overflow: "hidden", padding: 0,
            border: i === idx ? `2px solid ${C.blue}` : "2px solid transparent",
            boxSizing: "border-box", background: "none",
          }}
        >
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </button>
      ))}
    </div>
  </div>
);

const StatRow = ({ fontSize, gap }) => (
  <div style={{ display: "flex", flexWrap: "wrap", rowGap: 10, columnGap: gap }}>
    {DATA.quickStats.map((s) => {
      const Icon = STAT_ICON[s.icon];
      return (
        <div key={s.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon width={15} height={15} />
          <span style={{ fontFamily: body, fontSize, fontWeight: 500, color: C.text }}>{s.value}</span>
        </div>
      );
    })}
  </div>
);

const DealerCard = ({ padding }) => (
  <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.badgeBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ico.Store width={21} height={21} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: body, fontSize: 15.5, fontWeight: 700, color: C.text }}>{DATA.dealer.name}</span>
          {DATA.dealer.verified && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: C.badgeBg, color: C.blueLink, fontFamily: body, fontSize: 11.5, fontWeight: 700, padding: "3px 9px 3px 6px", borderRadius: 20 }}>
              <Ico.Verified width={13} height={13} /> Verified
            </span>
          )}
        </div>
        <div style={{ fontFamily: body, fontSize: 13.5, color: C.textSub, marginTop: 4 }}>{DATA.dealer.location}</div>
        <div style={{ fontFamily: body, fontSize: 13, fontWeight: 600, color: C.blueLink, marginTop: 4 }}>{DATA.dealer.responds}</div>
      </div>
    </div>
  </div>
);

const Row = ({ k, val, isLast }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "13px 20px", borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
  }}>
    <span style={{ fontFamily: body, fontSize: 13.5, color: C.textSub }}>{k}</span>
    <span style={{ fontFamily: body, fontSize: 13.5, color: C.text, fontWeight: 700, textAlign: "right" }}>{val}</span>
  </div>
);

const SpecCard = ({ title, rows }) => (
  <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px" }}>
      <span style={{ fontFamily: body, fontSize: 16.5, fontWeight: 700, color: C.text }}>{title}</span>
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
      <div className="vc3-page" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto" }}>
        <div style={{ padding: "16px 16px 32px" }}>
          <Gallery idx={idx} setIdx={setIdx} thumbSize={64} />

          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: body, fontSize: 26, fontWeight: 800, color: C.text }}>{DATA.price}</div>
            <div style={{ fontFamily: body, fontSize: 18, fontWeight: 700, color: C.text, marginTop: 4 }}>{DATA.title}</div>
            <div style={{ fontFamily: body, fontSize: 13.5, color: C.textSub, marginTop: 2 }}>{DATA.variant}</div>
          </div>

          <div style={{ marginTop: 14 }}>
            <StatRow fontSize={13} gap={16} />
          </div>

          <div style={{ marginTop: 18 }}>
            <DealerCard padding="16px" />
          </div>

          <p style={{ fontFamily: body, fontSize: 13.5, color: C.textSub, lineHeight: 1.65, margin: "18px 0 0" }}>
            {DATA.description}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}>
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
      <div className="vc3-page" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 4px 48px" }}>
          <Gallery idx={idx} setIdx={setIdx} thumbSize={70} />

          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: body, fontSize: 32, fontWeight: 800, color: C.text }}>{DATA.price}</div>
            <div style={{ fontFamily: body, fontSize: 20, fontWeight: 700, color: C.text, marginTop: 6 }}>{DATA.title}</div>
            <div style={{ fontFamily: body, fontSize: 14, color: C.textSub, marginTop: 3 }}>{DATA.variant}</div>
          </div>

          <div style={{ marginTop: 18 }}>
            <StatRow fontSize={14} gap={24} />
          </div>

          <div style={{ marginTop: 22 }}>
            <DealerCard padding="18px 20px" />
          </div>

          <p style={{ fontFamily: body, fontSize: 14, color: C.textSub, lineHeight: 1.7, margin: "20px 0 0" }}>
            {DATA.description}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 26 }}>
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
export default function VehicleCard3() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: "#E4E5EA", minHeight: "100%", fontFamily: body }}>
      <GlobalStyle />

      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "18px 16px 0" }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 26px", fontSize: 13, fontWeight: 700, textTransform: "capitalize",
              borderRadius: 10, cursor: "pointer", fontFamily: body,
              border: mode === m ? `1.5px solid ${C.blue}` : `1.5px solid ${C.border}`,
              background: mode === m ? C.blue : "#fff",
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
            width: 392, height: 802, borderRadius: 32, border: "10px solid #1A1A1A",
            overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.18)", position: "relative", background: C.pageBg,
          }}>
            <MobileCard />
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 1166, height: 800, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,.1)", borderRadius: 16, overflow: "hidden" }}>
            <DesktopCard />
          </div>
        )}
      </div>
    </div>
  );
}
