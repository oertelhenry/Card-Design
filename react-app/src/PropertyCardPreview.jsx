import { useState, useRef, useEffect, useMemo } from "react";
import {
  Bed, Bath, Car, Ruler, Mountain, MapPin, Share2, Heart, Phone, Mail, Clock,
  ChevronDown, ChevronLeft, ChevronRight, Check, Home, Building2, GraduationCap,
  Bus, Calendar, ShieldCheck, User, Printer, Download, Flag, Sun, Sprout, Waves,
  FileText, Image as ImageIcon, Grid3x3, Hospital,
} from "lucide-react";
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa6";

/* ══════════════════════════════════════════════════════════
   PROPERTY CARD — Prestige Properties reference build
   Desktop + Mobile layouts, toggle preview at the bottom.
   All fields are conditionally rendered — empty/null = hidden.
   ══════════════════════════════════════════════════════════ */

const img = (seed) => `https://picsum.photos/seed/${seed}/1200/800`;

const SAMPLE = {
  agencyName: "Prestige Properties",
  listingRef: "123456789",
  breadcrumb: ["Property for Sale", "Gauteng", "Sandton", "Bryanston"],
  images: [
    { id: 1, url: img("prestige-villa-living"), alt: "Living room" },
    { id: 2, url: img("prestige-villa-lounge2"), alt: "Lounge" },
    { id: 3, url: img("prestige-villa-kitchen"), alt: "Kitchen" },
    { id: 4, url: img("prestige-villa-bedroom"), alt: "Bedroom" },
    { id: 5, url: img("prestige-villa-bathroom"), alt: "Bathroom" },
    { id: 6, url: img("prestige-villa-pool"), alt: "Pool" },
    { id: 7, url: img("prestige-villa-dining"), alt: "Dining room" },
    { id: 8, url: img("prestige-villa-exterior"), alt: "Exterior" },
    { id: 9, url: img("prestige-villa-stairs"), alt: "Staircase" },
    { id: 10, url: img("prestige-villa-garden"), alt: "Garden" },
  ],
  title: "Luxury Villa",
  address: "17 Bantry Road, Unit 2, Bryanston, Sandton",
  currency: "ZAR",
  price: 1250000,
  previousPrice: 1300000,
  propertyType: "Townhouse",
  ownership: "Freehold",
  listingType: "Sale",
  status: "Active",
  quickStats: [
    { icon: Bed, label: "Bedrooms", shortLabel: "Beds", value: 2, key: "beds" },
    { icon: Bath, label: "Bathrooms", shortLabel: "Baths", value: 2, key: "baths" },
    { icon: Ruler, label: "m²", shortLabel: "m²", value: 120, key: "floor" },
    { icon: Mountain, label: "m²", shortLabel: "m²", value: 1200, key: "land" },
    { icon: Car, label: "Parking", shortLabel: "Parking", value: 2, key: "parking" },
  ],
  quickFeatures: [
    { icon: Bed, label: "Bedrooms", value: 2 },
    { icon: Bath, label: "Bathrooms", value: 2 },
    { icon: Car, label: "Parking", value: 2 },
    { icon: Waves, label: "Pool" },
  ],
  overviewGroups: [
    {
      group: null,
      rows: [
        { label: "Listing Number", value: "123456789" },
        { label: "Listing Type", value: "Sale" },
        { label: "Status", value: "Active" },
        { label: "Property Type", value: "Residential - Townhouse" },
        { label: "Ownership", value: "Freehold" },
        { label: "Availability Date", value: "2026-08-21" },
        { label: "Listing Date", value: "2026-08-17" },
      ],
    },
    {
      group: "Address",
      rows: [
        { label: "Street", value: "17 Bantry Road, Unit 2" },
        { label: "Building", value: "Bantry Close" },
        { label: "Suburb", value: "Bryanston" },
        { label: "City", value: "Sandton" },
        { label: "Province", value: "Gauteng" },
        { label: "Country", value: "South Africa" },
        { label: "Postal Code", value: "2188" },
      ],
    },
    {
      group: "Physical Attributes",
      rows: [
        { label: "Floor Size", value: "120 m²" },
        { label: "Land Size", value: "1200 m²" },
        { label: "Floor Number", value: "3 of 6" },
        { label: "Storeys", value: "2" },
        { label: "Year Built", value: "2015" },
        { label: "Year Renovated", value: "2017" },
        { label: "Facing Direction", value: "North" },
        { label: "Ceiling Height", value: "2.7 m" },
      ],
    },
    {
      group: "Room Counts",
      rows: [
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "2" },
        { label: "Kitchens", value: "1" },
        { label: "Reception Rooms", value: "1" },
        { label: "Parking Spaces", value: "2" },
      ],
    },
    {
      group: "Pricing",
      rows: [
        { label: "Price", value: "ZAR 1,250,000" },
        { label: "Previous Price", value: "ZAR 1,300,000" },
        { label: "Price Reduction", value: "ZAR 50,000 (3.85%)" },
      ],
    },
    {
      group: "Monthly Costs",
      rows: [
        { label: "Levy", value: "ZAR 1,400" },
        { label: "Rates & Taxes", value: "ZAR 800" },
        { label: "Special Levy", value: "ZAR 1,200" },
        { label: "Transfer Duty", value: "ZAR 20,000" },
      ],
    },
    {
      group: "Utilities",
      rows: [
        { label: "Electricity", value: "Grid (Prepaid)" },
        { label: "Water", value: "Municipal (Prepaid)" },
        { label: "Sewerage", value: "Municipal" },
        { label: "Fibre", value: "Available" },
        { label: "Solar", value: "8 Panels, 10 kWh Battery" },
        { label: "Generator", value: "5 kW" },
        { label: "Gas", value: "Available" },
      ],
    },
    {
      group: "Accessibility",
      rows: [
        { label: "Wheelchair Accessible", value: "Yes" },
        { label: "Step Free Access", value: "Yes" },
        { label: "Elevator", value: "Yes" },
        { label: "Accessible Bathroom", value: "Yes" },
        { label: "Wide Doorways", value: "Yes" },
      ],
    },
  ],
  rooms: [
    {
      name: "Bedroom 1",
      features: ["Built-in Cupboards", "Walk-in Closet", "Air Conditioning", "Carpeted", "Fireplace", "Bay Window", "Underfloor Heating", "Bath", "Shower", "Double Basin", "Ceiling Fan", "Tiled Floors", "Laminated Floors"],
    },
    {
      name: "Bedroom 2",
      features: ["Built-in Cupboards", "Carpeted", "Bay Window", "Walk-in Closet", "Air Conditioning", "Laminated Floors", "Ceiling Fan", "Tiled Floors", "Double Basin", "Shower", "Bath", "Underfloor Heating", "Fireplace"],
    },
  ],
  parking: [
    { name: "Single Garage", features: ["Automated", "Remote Controlled"] },
    { name: "Carport", features: ["Covered"] },
  ],
  outdoorAreas: [
    { name: "Pool", icon: Waves, features: ["Heated", "Private", "Communal", "Covered", "Fenced", "Solar Heated", "Lighting"] },
    { name: "Patio", icon: Sun, features: ["Private", "Communal", "Covered", "Lighting"] },
    { name: "Garden", icon: Sprout, features: ["Private", "Lighting", "Irrigation", "Fenced", "Communal"] },
  ],
  amenities: {
    general: ["Fibre Ready", "Pool View", "Garden View", "Sea View", "Park View", "Mountain View", "City View", "Golf Course View"],
    security: ["Security Gate", "CCTV", "Guard House", "Security Guard", "Alarm", "Electric Fence", "Armed Response", "Intercom", "Perimeter Wall", "Boomed Access", "Biometric Access", "Access Control", "24 Hour Security", "Perimeter Security"],
    lifestyle: ["Security Estate", "Security Complex", "Golf Estate", "Lock Up & Go", "Retirement Estate", "Eco Estate", "Pet Friendly", "Family Friendly", "Country Estate", "Coastal Estate", "Investment Property", "Entertainer's Home"],
  },
  nearbyPlaces: [
    { name: "The Hospital", category: "Hospital", distance: "2 km", icon: Hospital },
    { name: "Bryanston High School", category: "School", distance: "3 km", icon: GraduationCap },
    { name: "Bus Stop", category: "Public Transport", distance: "1 km", icon: Bus },
  ],
  agent: {
    name: "Jane Smith",
    verified: true,
    company: "Prestige Properties",
    license: "Lic-452362",
    phone: "+27 82 555 4325",
    email: "jane@prestigeproperties.co.za",
    responds: "Responds in 2 Hours",
  },
  bondCalc: { defaultDeposit: 0, defaultInterestRate: 10.5, defaultTermYears: 20 },
};

/* ─── helpers ─── */
const v = (val) => val !== null && val !== undefined && String(val).trim() !== "";
const money = (currency, n) => `${currency} ${Math.round(n).toLocaleString("en-US")}`;
const discountOf = (price, previousPrice) =>
  v(previousPrice) && previousPrice > price ? Math.round(((previousPrice - price) / previousPrice) * 10000) / 100 : null;

/* ═══════════ COLOUR TOKENS ═══════════ */
const C = {
  page: "#F7F4ED",
  panelAlt: "#F2EEE2",
  stripe: "#FAF8F3",
  border: "#E7E1D2",
  ink: "#17140F",
  body: "#4A453C",
  muted: "#8C8577",
  green: "#12805A",
  greenDeep: "#0B6B47",
  greenBg: "#DEF5E7",
  greenText: "#1B7A50",
  gold: "#B8860B",
  saleBg: "#EFDBA6",
  saleText: "#8A5A17",
  neutralBg: "#F1ECDF",
  neutralText: "#5B564B",
  securityBg: "#E7E9F6",
  securityBorder: "#CDD1EF",
  securityText: "#3D4A9B",
  lifestyleBg: "#FBEBD2",
  lifestyleBorder: "#EDD6A6",
  lifestyleText: "#96671C",
  iconLavenderBg: "#E7E7F5",
  iconLavenderText: "#585A8C",
};

const FONT_HEAD = "'Playfair Display', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif";

const FontFace = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
);

/* ═══════════ STYLE FRAGMENTS ═══════════ */
const sectionTitleStyle = { fontFamily: FONT_HEAD, fontSize: 19, fontWeight: 700, color: C.ink, margin: 0 };
const crumbLink = { color: "rgba(255,255,255,.92)", cursor: "pointer", fontWeight: 500 };
const crumbSep = { color: "rgba(255,255,255,.5)" };
const countBadgeStyle = { position: "absolute", bottom: 14, right: 14, background: "rgba(20,18,14,.75)", color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600 };
const imgCover = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const statIconStyle = { width: 30, height: 30, borderRadius: "50%", background: C.greenBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const prefixStyle = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 14 };
const suffixStyle = { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 14 };
const linkStyle = { color: C.greenDeep, fontSize: 13, fontWeight: 600, textDecoration: "none", cursor: "pointer" };
const navBtnStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 34, height: 34, padding: 0, borderRadius: "50%", background: "rgba(20,18,14,.55)", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const outlineBtnStyle = { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${C.green}`, background: "#fff", color: C.greenDeep, fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: FONT_BODY };
const primaryBtnStyle = { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 16px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%", fontFamily: FONT_BODY, boxSizing: "border-box" };
const textareaStyle = { width: "100%", minHeight: 80, padding: "12px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13.5, fontFamily: FONT_BODY, resize: "vertical", boxSizing: "border-box" };

/* ═══════════ SHARED ATOMS ═══════════ */
const Pill = ({ children, tone = "neutral", icon: Icon, small }) => {
  const tones = {
    neutral: { bg: C.neutralBg, text: C.neutralText, border: "transparent" },
    gold: { bg: C.saleBg, text: C.saleText, border: "transparent" },
    green: { bg: C.greenBg, text: C.greenText, border: "transparent" },
    security: { bg: C.securityBg, text: C.securityText, border: C.securityBorder },
    lifestyle: { bg: C.lifestyleBg, text: C.lifestyleText, border: C.lifestyleBorder },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: small ? "5px 12px" : "7px 16px", borderRadius: 999, background: t.bg, color: t.text, border: `1px solid ${t.border}`, fontSize: small ? 12.5 : 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>
      {Icon && <Icon size={13} strokeWidth={2.5} />}
      {children}
    </span>
  );
};

const CheckPill = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "#fff", border: `1px solid ${C.border}`, fontSize: 13, fontWeight: 500, color: C.body }}>
    <Check size={13} strokeWidth={3} color={C.green} /> {children}
  </span>
);

const PillWrap = ({ children }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "8px 0 16px" }}>{children}</div>;

const GroupLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: C.muted, padding: "14px 2px 6px" }}>{children}</div>
);

const IconCircleButton = ({ icon, dark, size = 38, onClick }) => {
  const Icon = icon;
  return (
    <button onClick={onClick} style={{ width: size, height: size, padding: 0, borderRadius: "50%", border: `1px solid ${dark ? "rgba(255,255,255,.25)" : C.border}`, background: dark ? "rgba(255,255,255,.06)" : "#fff", color: dark ? "#fff" : C.body, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <Icon size={16} />
    </button>
  );
};

const TabButton = ({ active, onClick, icon, children }) => {
  const Icon = icon;
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, border: `1px solid ${active ? "#141310" : C.border}`, background: active ? "#141310" : "#fff", color: active ? "#fff" : C.body, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
      <Icon size={15} /> {children}
    </button>
  );
};

const FormInput = ({ icon, placeholder, type = "text" }) => {
  const Icon = icon;
  return (
    <div style={{ position: "relative" }}>
      <Icon size={15} color={C.muted} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }} />
      <input type={type} placeholder={placeholder} style={{ width: "100%", padding: "12px 14px 12px 38px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13.5, fontFamily: FONT_BODY, boxSizing: "border-box", background: "#fff" }} />
    </div>
  );
};

const ShareBtn = ({ bg, children }) => (
  <span style={{ width: 38, height: 38, borderRadius: "50%", background: bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>{children}</span>
);

const LinkLine = ({ icon, children }) => {
  const Icon = icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", color: C.body, fontSize: 13.5, cursor: "pointer" }}>
      <Icon size={15} color={C.muted} /> {children}
    </div>
  );
};

const SectionCard = ({ title, children, noPad, style }) => (
  <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: "0 1px 3px rgba(20,18,14,.04)", padding: noPad ? 0 : 24, marginTop: 20, ...style }}>
    {title && <h3 style={{ ...sectionTitleStyle, padding: noPad ? "20px 20px 14px" : 0 }}>{title}</h3>}
    {children}
  </div>
);

const OverviewRow = ({ label, value, i }) => (
  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "13px 20px", background: i % 2 ? C.stripe : "#fff" }}>
    <span style={{ fontSize: 13.5, color: C.muted }}>{label}</span>
    <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, textAlign: "right" }}>{value}</span>
  </div>
);

const NearbyRow = ({ icon, name, category, distance }) => {
  const Icon = icon;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 38, height: 38, borderRadius: "50%", background: C.iconLavenderBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={17} color={C.iconLavenderText} />
        </span>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>{name}</div>
          <div style={{ fontSize: 12.5, color: C.muted }}>{category}</div>
        </div>
      </div>
      <Pill tone="green" small>{distance}</Pill>
    </div>
  );
};

const FeatureCard = ({ icon, name, features, iconBg, iconColor }) => {
  const Icon = icon;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ width: 34, height: 34, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={17} color={iconColor} strokeWidth={2} />
        </span>
        <span style={{ fontSize: 16, fontWeight: 700, color: C.ink, fontFamily: FONT_HEAD }}>{name}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {features.map((f) => <CheckPill key={f}>{f}</CheckPill>)}
      </div>
    </div>
  );
};

const AmenityGroups = ({ amenities }) => (
  <>
    {v(amenities.general?.length) && (<><GroupLabel>General</GroupLabel><PillWrap>{amenities.general.map((a) => <Pill key={a} tone="green" icon={Check} small>{a}</Pill>)}</PillWrap></>)}
    {v(amenities.security?.length) && (<><GroupLabel>Security</GroupLabel><PillWrap>{amenities.security.map((a) => <Pill key={a} tone="security" icon={Check} small>{a}</Pill>)}</PillWrap></>)}
    {v(amenities.lifestyle?.length) && (<><GroupLabel>Lifestyle</GroupLabel><PillWrap>{amenities.lifestyle.map((a) => <Pill key={a} tone="lifestyle" icon={Check} small>{a}</Pill>)}</PillWrap></>)}
  </>
);

const ContactLine = ({ icon, children }) => {
  const Icon = icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} color={C.body} />
      </span>
      <span style={{ fontSize: 13.5, color: C.body }}>{children}</span>
    </div>
  );
};

const AgentCard = ({ agent }) => (
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
      <span style={{ width: 52, height: 52, borderRadius: "50%", background: C.greenBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <User size={24} color={C.greenDeep} />
      </span>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{agent.name}</span>
          {agent.verified && <Pill tone="green" small icon={ShieldCheck}>Verified</Pill>}
        </div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{agent.company}</div>
        {v(agent.license) && <div style={{ fontSize: 11.5, color: C.muted }}>License: {agent.license}</div>}
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {v(agent.phone) && <ContactLine icon={Phone}>{agent.phone}</ContactLine>}
      {v(agent.email) && <ContactLine icon={Mail}>{agent.email}</ContactLine>}
      {v(agent.responds) && <ContactLine icon={Clock}>{agent.responds}</ContactLine>}
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 12.5, color: C.muted, marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);

const ResultRow = ({ label, value, bold }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontSize: 13.5, color: C.body }}>{label}</span>
    <span style={{ fontSize: bold ? 16 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
  </div>
);

function BondCalculator({ defaultPrice, defaultDeposit, defaultInterestRate, defaultTermYears, currency, stacked }) {
  const [price, setPrice] = useState(defaultPrice);
  const [deposit, setDeposit] = useState(defaultDeposit);
  const [interest, setInterest] = useState(defaultInterestRate);
  const [term, setTerm] = useState(defaultTermYears);

  const { monthly, onceOff, minIncome } = useMemo(() => {
    const principal = Math.max(price - deposit, 0);
    const r = interest / 100 / 12;
    const n = term * 12;
    const m = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { monthly: Math.round(m || 0), onceOff: Math.round(price * 0.025), minIncome: Math.round((m || 0) * 3) };
  }, [price, deposit, interest, term]);

  return (
    <div>
      <h3 style={sectionTitleStyle}>Bond Calculator</h3>
      <div style={{ display: "grid", gridTemplateColumns: stacked ? "1fr" : "1fr 1fr", gap: 28, marginTop: 16 }}>
        <div>
          <Field label="Purchase Price">
            <div style={{ position: "relative" }}>
              <span style={prefixStyle}>R</span>
              <input style={{ ...textareaInputStyle, paddingLeft: 28 }} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} />
            </div>
          </Field>
          <Field label="Deposit (Optional)">
            <div style={{ position: "relative" }}>
              <span style={prefixStyle}>R</span>
              <input style={{ ...textareaInputStyle, paddingLeft: 28 }} type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value) || 0)} />
            </div>
          </Field>
          <Field label="Interest Rate">
            <div style={{ position: "relative" }}>
              <input style={{ ...textareaInputStyle, paddingRight: 28 }} type="number" step="0.1" value={interest} onChange={(e) => setInterest(Number(e.target.value) || 0)} />
              <span style={suffixStyle}>%</span>
            </div>
          </Field>
          <Field label="Loan Term">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <input type="range" min={5} max={30} value={term} onChange={(e) => setTerm(Number(e.target.value))} style={{ flex: 1, accentColor: C.green }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, whiteSpace: "nowrap" }}>{term} Years</span>
            </div>
          </Field>
        </div>
        <div>
          <ResultRow label="Monthly Repayment:" value={money(currency, monthly)} bold />
          <ResultRow label="Total Once-off Costs:" value={money(currency, onceOff)} />
          <ResultRow label="Min Gross Monthly Income:" value={money(currency, minIncome)} />
          <button style={{ ...primaryBtnStyle, marginTop: 16 }}>View Breakdown</button>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            <a href="#" style={linkStyle} onClick={(e) => e.preventDefault()}>What do I qualify for based on my income?</a>
            <a href="#" style={linkStyle} onClick={(e) => e.preventDefault()}>What are the bond and transfer costs?</a>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: C.muted, marginTop: 20, lineHeight: 1.6 }}>
        Disclaimer: Please note that by default this calculator uses the prime interest rate for bond payment calculations. This is purely for convenience and not an indication of the interest rate that might be offered to you by a bank.
      </p>
    </div>
  );
}
const textareaInputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: FONT_BODY, background: "#fff", color: C.ink, boxSizing: "border-box" };

function Accordion({ title, open, onToggle, children }) {
  return (
    <div style={{ borderRadius: 14, background: C.panelAlt, border: `1px solid ${C.border}`, overflow: "hidden", marginTop: 12 }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer" }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 18, fontWeight: 700, color: C.ink }}>{title}</span>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }} color={C.body} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 4000 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height .4s ease, opacity .3s ease" }}>
        <div style={{ padding: "0 20px 20px" }}>{children}</div>
      </div>
    </div>
  );
}

/* ═══════════ DESKTOP LAYOUT ═══════════ */
function PropertyCardDesktop({ data = SAMPLE }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [galleryTab, setGalleryTab] = useState("photos");
  const [openSections, setOpenSections] = useState({});
  const [showPhone, setShowPhone] = useState(false);
  const imgs = data.images || [];
  const toggle = (id) => setOpenSections((p) => ({ ...p, [id]: !p[id] }));
  const discountPct = discountOf(data.price, data.previousPrice);

  return (
    <div style={{ background: C.page, fontFamily: FONT_BODY, color: C.ink, minHeight: "100%" }}>
      {/* breadcrumb bar */}
      <div style={{ background: C.greenDeep, color: "#fff", padding: "13px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13.5, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <a style={crumbLink}>Back to Results</a>
          <span style={crumbSep}>|</span>
          {(data.breadcrumb || []).map((b, i) => (
            <span key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={crumbSep}>›</span>}
              <span style={crumbLink}>{b}</span>
            </span>
          ))}
          {v(data.listingRef) && (<><span style={crumbSep}>›</span><span style={{ fontWeight: 700 }}>{data.listingRef}</span></>)}
        </div>
        <a style={{ ...crumbLink, fontWeight: 700 }}>Next ›</a>
      </div>

      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "28px 32px 60px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
        {/* LEFT column */}
        <div style={{ minWidth: 0 }}>
          {/* gallery */}
          {imgs.length > 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1.75fr 1fr", gap: 12 }}>
                <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "3/2", background: "#e6e2d6" }}>
                  <img src={imgs[imgIdx]?.url} alt={imgs[imgIdx]?.alt} style={imgCover} />
                  <div style={countBadgeStyle}>{imgs.length} photos</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {imgs[1] && <div onClick={() => setImgIdx(1)} style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "16/10", cursor: "pointer" }}><img src={imgs[1].url} alt={imgs[1].alt} style={imgCover} /></div>}
                  {imgs[2] && (
                    <div onClick={() => setImgIdx(2)} style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "16/10", cursor: "pointer" }}>
                      <img src={imgs[2].url} alt={imgs[2].alt} style={imgCover} />
                      {imgs.length > 3 && (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(20,18,14,.72)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, fontWeight: 700 }}>
                          +{imgs.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "16px 0 8px" }}>
                <TabButton active={galleryTab === "photos"} onClick={() => setGalleryTab("photos")} icon={ImageIcon}>Photos ({imgs.length})</TabButton>
                <TabButton active={galleryTab === "grid"} onClick={() => setGalleryTab("grid")} icon={Grid3x3}>Photo Grid</TabButton>
              </div>
            </>
          )}

          {/* price card */}
          <SectionCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                {v(data.price) && <span style={{ fontFamily: FONT_HEAD, fontSize: 30, fontWeight: 700, color: C.ink }}>{money(data.currency, data.price)}</span>}
                {v(data.previousPrice) && <span style={{ fontSize: 18, color: C.muted, textDecoration: "line-through" }}>{money(data.currency, data.previousPrice)}</span>}
                {discountPct != null && <Pill tone="green" small>{discountPct}% off</Pill>}
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <IconCircleButton icon={Share2} />
                <IconCircleButton icon={Heart} />
              </div>
            </div>
            {v(data.title) && <h1 style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 700, margin: "14px 0 6px" }}>{data.title}</h1>}
            {v(data.address) && <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 14.5 }}><MapPin size={15} />{data.address}</div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "18px 0" }}>
              {v(data.propertyType) && <Pill icon={Home}>{data.propertyType}</Pill>}
              {v(data.ownership) && <Pill icon={FileText}>{data.ownership}</Pill>}
              {v(data.listingType) && <Pill tone="gold">{data.listingType}</Pill>}
              {v(data.status) && <Pill tone="green">{data.status}</Pill>}
            </div>
            <div style={{ height: 1, background: C.border, margin: "6px 0 18px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              {(data.quickStats || []).map((s) => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={statIconStyle}><s.icon size={16} color={C.greenDeep} /></span>
                  <span style={{ fontSize: 15 }}><b>{s.value}</b> {s.label}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* quick features */}
          {v(data.quickFeatures?.length) && (
            <SectionCard title="Features">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, columnGap: 20, marginTop: 16 }}>
                {data.quickFeatures.map((f) => (
                  <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}>
                    <f.icon size={16} color={C.body} />
                    <span>{f.label}{v(f.value) ? ": " : ""}{v(f.value) && <b>{f.value}</b>}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* photos grid */}
          {imgs.length > 0 && (
            <SectionCard title="Photos">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 }}>
                {imgs.slice(0, 9).map((im, i) => (
                  <div key={im.id} style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}>
                    <img src={im.url} alt={im.alt} style={imgCover} />
                    {i === 8 && imgs.length > 9 && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(20,18,14,.65)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 20 }}>
                        +{imgs.length - 9}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* property overview table */}
          {v(data.overviewGroups?.length) && (
            <SectionCard title="Property Overview" noPad>
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 14 }}>
                {data.overviewGroups.flatMap((g) => g.rows).map((r, i) => <OverviewRow key={r.label} label={r.label} value={r.value} i={i} />)}
              </div>
            </SectionCard>
          )}

          {/* accordions */}
          {v(data.rooms?.length) && (
            <Accordion title="Rooms" open={!!openSections.rooms} onToggle={() => toggle("rooms")}>
              {data.rooms.map((r) => <FeatureCard key={r.name} icon={Bed} name={r.name} features={r.features} iconBg={C.greenBg} iconColor={C.greenDeep} />)}
            </Accordion>
          )}
          {v(data.parking?.length) && (
            <Accordion title="Parking" open={!!openSections.parking} onToggle={() => toggle("parking")}>
              {data.parking.map((p) => <FeatureCard key={p.name} icon={Car} name={p.name} features={p.features} iconBg={C.iconLavenderBg} iconColor={C.iconLavenderText} />)}
            </Accordion>
          )}
          {v(data.outdoorAreas?.length) && (
            <Accordion title="Outdoor Areas" open={!!openSections.outdoor} onToggle={() => toggle("outdoor")}>
              {data.outdoorAreas.map((o) => <FeatureCard key={o.name} icon={o.icon} name={o.name} features={o.features} iconBg={C.lifestyleBg} iconColor={C.lifestyleText} />)}
            </Accordion>
          )}
          {data.amenities && (
            <Accordion title="Features & Amenities" open={!!openSections.amenities} onToggle={() => toggle("amenities")}>
              <AmenityGroups amenities={data.amenities} />
            </Accordion>
          )}
          {v(data.nearbyPlaces?.length) && (
            <Accordion title="Nearby Places" open={!!openSections.nearby} onToggle={() => toggle("nearby")}>
              {data.nearbyPlaces.map((n) => <NearbyRow key={n.name} {...n} />)}
            </Accordion>
          )}
          {data.agent && (
            <Accordion title="Listed By" open={!!openSections.listedby} onToggle={() => toggle("listedby")}>
              <AgentCard agent={data.agent} />
            </Accordion>
          )}

          {/* bond calculator */}
          {data.bondCalc && (
            <SectionCard>
              <BondCalculator defaultPrice={data.price} defaultDeposit={data.bondCalc.defaultDeposit} defaultInterestRate={data.bondCalc.defaultInterestRate} defaultTermYears={data.bondCalc.defaultTermYears} currency={data.currency} />
            </SectionCard>
          )}

          {/* contact agent full section */}
          {data.agent && (
            <SectionCard>
              <h3 style={sectionTitleStyle}>Contact Agent</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 28, marginTop: 16 }}>
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <FormInput icon={User} placeholder="Your Name" />
                    <FormInput icon={Mail} placeholder="Email" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <FormInput icon={Phone} placeholder="Phone" />
                    <button style={outlineBtnStyle} onClick={() => setShowPhone(true)}><Phone size={15} />{showPhone ? data.agent.phone : "Show Contact Number"}</button>
                  </div>
                  <textarea placeholder="I'm interested in this property, please contact me." style={textareaStyle} />
                  <button style={{ ...primaryBtnStyle, marginTop: 12 }}>Send Message</button>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ width: 64, height: 64, borderRadius: "50%", background: C.greenBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                    <User size={28} color={C.greenDeep} />
                  </span>
                  <div style={{ fontWeight: 700 }}>{data.agent.name}</div>
                  {data.agent.verified && <div style={{ marginTop: 6 }}><Pill tone="green" small icon={ShieldCheck}>Verified</Pill></div>}
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>{data.agent.company}</div>
                </div>
              </div>
            </SectionCard>
          )}
        </div>

        {/* RIGHT sidebar (sticky) */}
        <div style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {data.agent && (
            <SectionCard>
              <h3 style={{ ...sectionTitleStyle, textAlign: "center" }}>Contact Agent</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                <button style={outlineBtnStyle} onClick={() => setShowPhone(true)}><Phone size={15} /> {showPhone ? data.agent.phone : "Show Contact Number"}</button>
                <button style={outlineBtnStyle}><FaWhatsapp size={15} /> WhatsApp Agent</button>
                <FormInput icon={User} placeholder="Your Name" />
                <FormInput icon={Mail} placeholder="Email Address" />
                <FormInput icon={Phone} placeholder="Phone Number" />
                <textarea placeholder="I'm interested in this property, please contact me." style={textareaStyle} />
                <button style={primaryBtnStyle}>Send Message</button>
              </div>
            </SectionCard>
          )}

          {v(data.agencyName) && (
            <SectionCard style={{ textAlign: "center" }}>
              <span style={{ width: 56, height: 56, borderRadius: 12, background: "#EEF0F6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <Building2 size={26} color={C.muted} />
              </span>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 17, fontWeight: 700 }}>{data.agencyName}</div>
              <div style={{ fontSize: 12.5, color: C.muted }}>Agent</div>
            </SectionCard>
          )}

          {data.agent && (
            <SectionCard>
              <AgentCard agent={data.agent} />
            </SectionCard>
          )}

          <SectionCard>
            <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Share</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <ShareBtn bg="#1877F2"><FaFacebookF /></ShareBtn>
              <ShareBtn bg="#000"><FaXTwitter /></ShareBtn>
              <ShareBtn bg="#25D366"><FaWhatsapp /></ShareBtn>
              <ShareBtn bg="#EA4335"><FaEnvelope /></ShareBtn>
            </div>
          </SectionCard>

          <SectionCard>
            <LinkLine icon={Printer}>Print</LinkLine>
            <LinkLine icon={Download}>Download Brochure</LinkLine>
            <LinkLine icon={Flag}>Report Listing</LinkLine>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ MOBILE LAYOUT ═══════════ */
function PropertyCardMobile({ data = SAMPLE }) {
  const [idx, setIdx] = useState(0);
  const [openSections, setOpenSections] = useState({});
  const [showPhone, setShowPhone] = useState(false);
  const thumbRef = useRef(null);
  const imgs = data.images || [];
  const toggle = (id) => setOpenSections((p) => ({ ...p, [id]: !p[id] }));
  const prev = () => setIdx((i) => (i > 0 ? i - 1 : imgs.length - 1));
  const next = () => setIdx((i) => (i < imgs.length - 1 ? i + 1 : 0));
  const discountPct = discountOf(data.price, data.previousPrice);

  useEffect(() => { thumbRef.current?.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }, [idx]);

  return (
    <div style={{ background: C.page, fontFamily: FONT_BODY, color: C.ink, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <div style={{ position: "sticky", top: 0, zIndex: 5, background: "#161410", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Home size={16} color="#fff" />
          </span>
          <span style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13.5, letterSpacing: ".05em", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.agencyName}</span>
        </div>
        <IconCircleButton icon={Share2} dark size={34} />
      </div>

      <div style={{ flex: 1 }}>
        {/* gallery */}
        {imgs.length > 0 && (
          <div>
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#e6e2d6" }}>
              <img src={imgs[idx]?.url} alt={imgs[idx]?.alt} style={imgCover} />
              {imgs.length > 1 && (<>
                <button onClick={prev} style={{ ...navBtnStyle, left: 10 }}><ChevronLeft size={20} /></button>
                <button onClick={next} style={{ ...navBtnStyle, right: 10 }}><ChevronRight size={20} /></button>
              </>)}
              <div style={countBadgeStyle}>{imgs.length} photos</div>
            </div>
            {imgs.length > 1 && (
              <div ref={thumbRef} style={{ display: "flex", gap: 8, padding: "10px 14px", overflowX: "auto" }}>
                {imgs.map((im, i) => (
                  <img key={im.id} src={im.url} alt={im.alt} onClick={() => setIdx(i)} style={{ width: 64, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0, cursor: "pointer", border: i === idx ? `2px solid ${C.green}` : "2px solid transparent", opacity: i === idx ? 1 : 0.55 }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* price + badges */}
        <div style={{ padding: "6px 18px 4px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 10 }}>
            {v(data.price) && <span style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 700 }}>{money(data.currency, data.price)}</span>}
            {v(data.previousPrice) && <span style={{ fontSize: 15, color: C.muted, textDecoration: "line-through" }}>{money(data.currency, data.previousPrice)}</span>}
          </div>
          {discountPct != null && <div style={{ marginTop: 8 }}><Pill tone="green" small>{discountPct}% off</Pill></div>}
          {v(data.title) && <h1 style={{ fontFamily: FONT_HEAD, fontSize: 21, fontWeight: 700, margin: "14px 0 6px" }}>{data.title}</h1>}
          {v(data.address) && <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 13.5 }}><MapPin size={14} />{data.address}</div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {v(data.propertyType) && <Pill icon={Home} small>{data.propertyType}</Pill>}
            {v(data.ownership) && <Pill icon={FileText} small>{data.ownership}</Pill>}
            {v(data.listingType) && <Pill tone="gold" small>{data.listingType}</Pill>}
            {v(data.status) && <Pill tone="green" small>{data.status}</Pill>}
          </div>
        </div>

        {/* quick stats */}
        {v(data.quickStats?.length) && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${data.quickStats.length},1fr)`, gap: 8, padding: "16px 16px 4px" }}>
            {data.quickStats.map((s) => (
              <div key={s.key} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 4px", textAlign: "center" }}>
                <span style={{ ...statIconStyle, margin: "0 auto 6px" }}><s.icon size={15} color={C.greenDeep} /></span>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{s.shortLabel}</div>
              </div>
            ))}
          </div>
        )}

        {/* accordions */}
        <div style={{ padding: "16px 16px 24px" }}>
          {v(data.overviewGroups?.length) && (
            <Accordion title="Property Details" open={!!openSections.details} onToggle={() => toggle("details")}>
              {data.overviewGroups.map((g, gi) => (
                <div key={g.group || `root-${gi}`}>
                  {g.group && <GroupLabel>{g.group}</GroupLabel>}
                  <div style={{ borderTop: `1px solid ${C.border}`, marginLeft: -20, marginRight: -20 }}>
                    {g.rows.map((r, i) => <OverviewRow key={r.label} label={r.label} value={r.value} i={i} />)}
                  </div>
                </div>
              ))}
            </Accordion>
          )}
          {v(data.rooms?.length) && (
            <Accordion title="Rooms" open={!!openSections.rooms} onToggle={() => toggle("rooms")}>
              {data.rooms.map((r) => <FeatureCard key={r.name} icon={Bed} name={r.name} features={r.features} iconBg={C.greenBg} iconColor={C.greenDeep} />)}
            </Accordion>
          )}
          {v(data.parking?.length) && (
            <Accordion title="Parking" open={!!openSections.parking} onToggle={() => toggle("parking")}>
              {data.parking.map((p) => <FeatureCard key={p.name} icon={Car} name={p.name} features={p.features} iconBg={C.iconLavenderBg} iconColor={C.iconLavenderText} />)}
            </Accordion>
          )}
          {v(data.outdoorAreas?.length) && (
            <Accordion title="Outdoor Areas" open={!!openSections.outdoor} onToggle={() => toggle("outdoor")}>
              {data.outdoorAreas.map((o) => <FeatureCard key={o.name} icon={o.icon} name={o.name} features={o.features} iconBg={C.lifestyleBg} iconColor={C.lifestyleText} />)}
            </Accordion>
          )}
          {data.amenities && (
            <Accordion title="Features & Amenities" open={!!openSections.amenities} onToggle={() => toggle("amenities")}>
              <AmenityGroups amenities={data.amenities} />
            </Accordion>
          )}
          {v(data.nearbyPlaces?.length) && (
            <Accordion title="Nearby Places" open={!!openSections.nearby} onToggle={() => toggle("nearby")}>
              {data.nearbyPlaces.map((n) => <NearbyRow key={n.name} {...n} />)}
            </Accordion>
          )}
          {data.agent && (
            <Accordion title="Listed By" open={!!openSections.listedby} onToggle={() => toggle("listedby")}>
              <AgentCard agent={data.agent} />
            </Accordion>
          )}
          {data.bondCalc && (
            <Accordion title="Bond Calculator" open={!!openSections.bond} onToggle={() => toggle("bond")}>
              <BondCalculator defaultPrice={data.price} defaultDeposit={data.bondCalc.defaultDeposit} defaultInterestRate={data.bondCalc.defaultInterestRate} defaultTermYears={data.bondCalc.defaultTermYears} currency={data.currency} stacked />
            </Accordion>
          )}
          {data.agent && (
            <Accordion title="Contact Agent" open={!!openSections.contact} onToggle={() => toggle("contact")}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button style={outlineBtnStyle} onClick={() => setShowPhone(true)}><Phone size={15} /> {showPhone ? data.agent.phone : "Show Contact Number"}</button>
                <button style={outlineBtnStyle}><FaWhatsapp size={15} /> WhatsApp Agent</button>
                <FormInput icon={User} placeholder="Your Name" />
                <FormInput icon={Mail} placeholder="Email Address" />
                <FormInput icon={Phone} placeholder="Phone Number" />
                <textarea placeholder="I'm interested in this property, please contact me." style={textareaStyle} />
                <button style={primaryBtnStyle}>Send Message</button>
              </div>
            </Accordion>
          )}
        </div>
      </div>

      {/* sticky footer */}
      <div style={{ position: "sticky", bottom: 0, zIndex: 5, background: "#fff", borderTop: `1px solid ${C.border}`, padding: "10px 14px", display: "flex", gap: 8 }}>
        <IconCircleButton icon={Phone} onClick={() => setShowPhone(true)} />
        <IconCircleButton icon={Share2} />
        <a href={v(data.agent?.email) ? `mailto:${data.agent.email}` : undefined} style={{ ...primaryBtnStyle, flex: 1, textDecoration: "none" }}>Enquire Now</a>
        <button style={{ width: 46, height: 46, padding: 0, borderRadius: 10, background: C.gold, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Calendar size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════ PREVIEW WRAPPER (toggle Desktop / Mobile) ═══════════ */
export default function PropertyCardPreview() {
  const [mode, setMode] = useState("desktop");

  return (
    <div style={{ background: "#221F1A", minHeight: "100vh", fontFamily: FONT_BODY }}>
      <FontFace />
      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "16px 16px 0" }}>
        {["desktop", "mobile"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 28px",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 8,
              border: `1px solid ${mode === m ? C.green : "rgba(255,255,255,.15)"}`,
              background: mode === m ? C.green : "rgba(255,255,255,.06)",
              color: mode === m ? "#fff" : "rgba(255,255,255,.6)",
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            {m === "mobile" ? "📱 Mobile" : "🖥 Desktop"}
          </button>
        ))}
      </div>

      <div style={{ padding: mode === "desktop" ? "24px 16px 40px" : "24px 0 40px" }}>
        {mode === "mobile" ? (
          <div style={{ maxWidth: 420, margin: "0 auto", borderRadius: 20, border: "2px solid rgba(255,255,255,.12)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.5)", maxHeight: "82vh", overflowY: "auto" }}>
            <PropertyCardMobile data={SAMPLE} />
          </div>
        ) : (
          <div style={{ boxShadow: "0 24px 80px rgba(0,0,0,.3)" }}>
            <PropertyCardDesktop data={SAMPLE} />
          </div>
        )}
      </div>
    </div>
  );
}
