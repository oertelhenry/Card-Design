import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Calm Admin palette (consistent with admin UI)
// ═══════════════════════════════════════════════════════════════
const T = {
  bg: "#F6F4F1",
  surface: "#FFFFFF",
  surfaceAlt: "#FAF9F7",
  ink: "#1A1A1A",
  ink2: "#3D3D3D",
  sub: "#7A7A7A",
  muted: "#A3A3A3",
  faint: "#E8E5E1",
  border: "#E8E5E1",
  borderLight: "#F0EEEB",
  accent: "#0066FF",
  accentSoft: "#EBF2FF",
  accentHover: "#0052CC",
  success: "#1A8917",
  successSoft: "#E8F5E8",
  warning: "#E8890C",
  warningSoft: "#FFF4E5",
  danger: "#D32F2F",
  dangerSoft: "#FFEAEA",
  purple: "#7B61FF",
  purpleSoft: "#F0EDFF",
  glass: "rgba(255,255,255,0.72)",
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.03)",
  shadowMd: "0 2px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.06)",
  radius: 10,
  radiusSm: 6,
  radiusLg: 14,
};

const font = {
  display: "'Instrument Serif', Georgia, serif",
  ui: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Consolas', monospace",
};

// ═══════════════════════════════════════════════════════════════
// ICONS — Minimal SVG icon system
// ═══════════════════════════════════════════════════════════════
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    plus: <path d="M12 4v16m8-8H4" />,
    x: <path d="M6 18L18 6M6 6l12 12" />,
    chevDown: <path d="M19 9l-7 7-7-7" />,
    chevRight: <path d="M9 5l7 7-7 7" />,
    chevUp: <path d="M5 15l7-7 7 7" />,
    edit: <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    grip: <><circle cx="9" cy="5" r="1.5" fill="currentColor" /><circle cx="15" cy="5" r="1.5" fill="currentColor" /><circle cx="9" cy="12" r="1.5" fill="currentColor" /><circle cx="15" cy="12" r="1.5" fill="currentColor" /><circle cx="9" cy="19" r="1.5" fill="currentColor" /><circle cx="15" cy="19" r="1.5" fill="currentColor" /></>,
    photo: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    settings: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
    palette: <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />,
    save: <path d="M17 21v-8H7v8m10 0H7m10 0h2a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0016.586 3H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0v-8h10" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    folder: <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    tag: <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" />,
    arrowUp: <path d="M12 19V5m-7 7l7-7 7 7" />,
    arrowDown: <path d="M12 5v14m7-7l-7 7-7-7" />,
    check: <path d="M5 13l4 4L19 7" />,
    info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Badge({ label, variant = "default", count }) {
  const styles = {
    default: { bg: T.faint, color: T.sub },
    active: { bg: T.successSoft, color: T.success },
    accent: { bg: T.accentSoft, color: T.accent },
    warning: { bg: T.warningSoft, color: T.warning },
    purple: { bg: T.purpleSoft, color: T.purple },
    danger: { bg: T.dangerSoft, color: T.danger },
    muted: { bg: T.faint, color: T.muted },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", background: s.bg, color: s.color, fontFamily: font.ui, lineHeight: "18px", whiteSpace: "nowrap" }}>
      {label}{count !== undefined && <span style={{ fontFamily: font.mono, fontSize: 10, opacity: 0.8 }}>{count}</span>}
    </span>
  );
}

function Btn({ children, variant = "primary", size = "md", icon, onClick, style: extra, disabled }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: font.ui, fontWeight: 600, borderRadius: T.radiusSm, transition: "all 0.15s", lineHeight: 1, opacity: disabled ? 0.5 : 1 };
  const sizes = { xs: { padding: "4px 8px", fontSize: 11 }, sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 }, lg: { padding: "10px 20px", fontSize: 14 } };
  const variants = {
    primary: { background: T.accent, color: "#fff" },
    secondary: { background: T.faint, color: T.ink },
    ghost: { background: "transparent", color: T.sub },
    danger: { background: T.dangerSoft, color: T.danger },
    outline: { background: "transparent", color: T.accent, border: `1px solid ${T.accent}` },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...extra }}>{icon}{children}</button>;
}

function Toggle({ on, onToggle, label, size = "md" }) {
  const w = size === "sm" ? 32 : 40;
  const h = size === "sm" ? 18 : 22;
  const dot = size === "sm" ? 14 : 18;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={onToggle}>
      <div style={{
        width: w, height: h, borderRadius: h / 2, padding: 2, transition: "background 0.2s",
        background: on ? T.accent : T.faint,
        display: "flex", alignItems: "center", justifyContent: on ? "flex-end" : "flex-start",
      }}>
        <div style={{ width: dot, height: dot, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", transition: "all 0.2s" }} />
      </div>
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: T.ink, fontFamily: font.ui }}>{label}</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DATA — From the actual WinterMenu JSON
// ═══════════════════════════════════════════════════════════════

const initialData = {
  id: "1b9265c9-f81d-4d6e-87ab-bfc37bbacda3",
  cardName: "WinterMenu",
  normName: "wintermenu",
  companyName: "Personalyz",
  orgUnitName: "DemoCards",
  genericDetailsVisible: true,
  genericImagesVisible: true,
  genericBlocksVisible: true,
  details: {
    logo: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-1b9265c9-f81d-4d6e-87ab-bfc37bbacda3/21af43825bd34055b142886cb6317463_wintermenu.jpg",
    description: "",
    details: "",
    information: "",
    enquireButton: false,
    enquireButtonText: "Contact us",
  },
  // Group cardBlocks by tabName
  tabs: [
    {
      tabName: "Food Menu", tabNumber: 0,
      sections: [
        {
          id: "0704ad0e", title: "Breakfast & Brunch", sort: 0,
          rows: [
            { id: "1c9b627f", heading: "Classic", headingValue: "Single R 69.00 | Double R 112.00", headingDescription: "Topped with hickory ham. Served with grilled tomato & a hash brown. [hot] [veg] [gf] [vegan]", sort: 0 },
            { id: "476651e5", heading: "South African", headingValue: "Single R 75.00 | Double R 127.00", headingDescription: "Topped with a boerewors patty & corn chakalaka.", sort: 1 },
            { id: "0e9a54c6", heading: "Big Ben", headingValue: "Single R 89.00 | Double R 142.00", headingDescription: "Topped with baby spinach, grilled tomato, hash brown, cheddar, hickory ham, back bacon & a battered onion ring.", sort: 2 },
            { id: "4a925cba", heading: "Buffalo Chicken & Blue Cheese", headingValue: "Single R 79.00 | Double R 125.00", headingDescription: "Sesame-crusted chicken strips coated in hot sauce, blue cheese crumbles & an extra drizzle of hot sauce.", sort: 3 },
            { id: "15ce16bd", heading: "Mediterranean", headingValue: "Single R 74.00 | Double R 119.00", headingDescription: "Roasted peppers, feta, olives, basil pesto, grilled tomato & a hash brown. [veg]", sort: 4 },
            { id: "914b4cc2", heading: "Shakshuka Skillet", headingValue: "Single R 78.00 | Double R 120.00", headingDescription: "Spiced tomato-pepper sauce with onions, poached eggs, fresh herbs & toasted sourdough.", sort: 5 },
          ],
        },
        {
          id: "6c571827", title: "Toasted Sandwiches", sort: 1,
          rows: [
            { id: "eac53bcd", heading: "Back Bacon & Egg", headingValue: "R 150", headingDescription: "", sort: 0 },
            { id: "bdf69ac8", heading: "Cheddar and Tomato", headingValue: "R 79", headingDescription: "", sort: 1 },
            { id: "3bbd7b19", heading: "Chicken Mayo", headingValue: "R 89", headingDescription: "", sort: 2 },
            { id: "1489e733", heading: "Bacon, Avo & Feta", headingValue: "R 109", headingDescription: "Crispy bacon, avocado, feta & tomato relish.", sort: 3 },
            { id: "639207da", heading: "Tomato, Mozzarella & Basil", headingValue: "R 84", headingDescription: "Melted mozzarella, fresh tomato & basil pesto. [veg]", sort: 4 },
          ],
        },
      ],
    },
    {
      tabName: "Drinks Menu", tabNumber: 1,
      sections: [
        {
          id: "ef5e2878", title: "Smoothies", sort: 0,
          rows: [
            { id: "b0f60a22", heading: "Green Monster", headingValue: "R 64", headingDescription: "Spinach, Avo, Cucumber and Ginger blended in carrot juice", sort: 0 },
            { id: "84897a9e", heading: "Berry Burst", headingValue: "R 65", headingDescription: "Strawberries, Blueberries, Banana and Chia Seeds blended in almond milk", sort: 1 },
            { id: "4eecfc84", heading: "Tropical Glow", headingValue: "R 60", headingDescription: "Mango, Pineapple, Coconut and Mint blended in orange juice", sort: 2 },
            { id: "e08c2993", heading: "Nutty Power", headingValue: "R 66", headingDescription: "Peanut Butter, Oats, Banana and Dates blended in oat milk", sort: 3 },
          ],
        },
      ],
    },
    {
      tabName: "Dessert Menu", tabNumber: 2,
      sections: [
        {
          id: "b6107080", title: "Warm Desserts", sort: 0,
          rows: [
            { id: "1ce7727d", heading: "Malva", headingValue: "R 44", headingDescription: "Traditional warm pudding", sort: 0 },
            { id: "c8a7960f", heading: "Custard", headingValue: "R 30", headingDescription: "Topping for just about anything", sort: 1 },
            { id: "337d5717", heading: "Cape Brandy Pudding", headingValue: "R 52", headingDescription: "Warm date pudding soaked in brandy syrup with vanilla custard.", sort: 2 },
            { id: "76847cdc", heading: "Apple Crumble", headingValue: "R 48", headingDescription: "Buttery crumble over cinnamon apples, served with custard.", sort: 3 },
            { id: "31b4fe98", heading: "Chocolate Fondant", headingValue: "R 58", headingDescription: "Warm molten-centre chocolate cake with vanilla ice cream.", sort: 4 },
          ],
        },
      ],
    },
  ],
  colorOverrides: {
    cardBackgroundColor: null,
    buttonColor: null,
    buttonTextColor: null,
    tabHeadingColor: null,
    mainHeadingColor: null,
    itemHeadingColor: null,
    itemValueColor: null,
    itemDescriptionColor: null,
    deviderLineColor: null,
    tabHeadingNotSelectedColor: null,
    blockHeadingColor: null,
  },
};

// ═══════════════════════════════════════════════════════════════
// TOP BAR — Sticky header with card name + actions
// ═══════════════════════════════════════════════════════════════

function TopBar({ cardName, companyName, orgUnit, onSave }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 40, padding: "12px 28px", background: "rgba(246,244,241,0.85)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 56,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: T.warningSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="layers" size={18} color={T.warning} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{cardName}</h1>
            <Badge label="Generic" variant="warning" />
          </div>
          <p style={{ fontSize: 12, color: T.sub, margin: "2px 0 0", fontFamily: font.ui }}>{companyName} · {orgUnit}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Btn variant="ghost" size="sm" icon={<Icon name="eye" size={14} color={T.sub} />}>Preview</Btn>
        <Btn variant="secondary" size="sm" icon={<Icon name="palette" size={14} color={T.ink2} />}>Card Styling</Btn>
        <Btn size="sm" icon={<Icon name="save" size={14} color="#fff" />} onClick={onSave}>Save Changes</Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD DETAILS PANEL — Logo, description, details, info, CTA
// ═══════════════════════════════════════════════════════════════

function CardDetailsPanel({ details, visible, onToggleVisible }) {
  const [data, setData] = useState(details);

  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 20, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: T.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="info" size={14} color={T.purple} />
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>Card Details</h3>
        </div>
        <Toggle on={visible} onToggle={onToggleVisible} label="Visible on card" size="sm" />
      </div>

      <div style={{ padding: 20 }}>
        {/* Logo Upload */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 6, fontFamily: font.ui }}>Card Image / Logo</label>
          <div style={{ display: "flex", gap: 14, alignItems: "start" }}>
            <div style={{
              width: 120, height: 80, borderRadius: T.radiusSm, overflow: "hidden",
              border: `1px solid ${T.border}`, background: T.surfaceAlt,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {data.logo ? (
                <img src={data.logo} alt="Card logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Icon name="photo" size={28} color={T.muted} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <Btn variant="secondary" size="sm" icon={<Icon name="photo" size={13} />}>Upload Image</Btn>
              <p style={{ fontSize: 11, color: T.muted, margin: "6px 0 0", fontFamily: font.ui }}>Recommended: 800×400px · JPG/PNG · Max 2MB</p>
            </div>
          </div>
        </div>

        {/* Description + Details side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Brief overview shown at top of card…"
              style={{
                width: "100%", padding: "9px 12px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
                borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", resize: "vertical",
                minHeight: 72, boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>Details</label>
            <textarea
              value={data.details}
              onChange={(e) => setData({ ...data, details: e.target.value })}
              placeholder="Additional details (hours, location, etc.)…"
              style={{
                width: "100%", padding: "9px 12px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
                borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", resize: "vertical",
                minHeight: 72, boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Information — full width */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.ink2, marginBottom: 4, fontFamily: font.ui }}>Information</label>
          <textarea
            value={data.information}
            onChange={(e) => setData({ ...data, information: e.target.value })}
            placeholder="Extended information shown in expandable section…"
            style={{
              width: "100%", padding: "9px 12px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
              borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none", resize: "vertical",
              minHeight: 60, boxSizing: "border-box",
            }}
          />
        </div>

        {/* Contact Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: T.radiusSm, background: T.surfaceAlt, border: `1px solid ${T.borderLight}` }}>
          <Toggle on={data.enquireButton} onToggle={() => setData({ ...data, enquireButton: !data.enquireButton })} size="sm" />
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui }}>Contact Button</span>
            <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>Display an enquiry/contact CTA on the card</span>
          </div>
          {data.enquireButton && (
            <input
              value={data.enquireButtonText}
              onChange={(e) => setData({ ...data, enquireButtonText: e.target.value })}
              style={{
                width: 160, padding: "6px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
                borderRadius: T.radiusSm, background: T.surface, color: T.ink, outline: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INLINE ROW EDITOR — Compact row with expand-to-edit
// ═══════════════════════════════════════════════════════════════

function RowItem({ row, index, isEditing, onToggleEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [data, setData] = useState(row);

  return (
    <div style={{
      border: `1px solid ${isEditing ? T.accent : T.borderLight}`,
      borderRadius: T.radiusSm,
      background: isEditing ? T.accentSoft : T.surface,
      marginBottom: 4,
      transition: "all 0.15s",
      overflow: "hidden",
    }}>
      {/* Collapsed Row */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
          cursor: "pointer", minHeight: 40,
        }}
        onClick={onToggleEdit}
      >
        <div style={{ color: T.muted, cursor: "grab", flexShrink: 0, padding: "0 2px" }}>
          <Icon name="grip" size={12} color={T.muted} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: font.mono, width: 20, textAlign: "center", flexShrink: 0 }}>
          {index + 1}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {data.heading || <span style={{ color: T.muted, fontStyle: "italic" }}>Untitled item</span>}
        </span>
        {data.headingValue && (
          <span style={{ fontSize: 12, fontWeight: 600, color: T.accent, fontFamily: font.mono, flexShrink: 0 }}>
            {data.headingValue}
          </span>
        )}
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          {!isFirst && (
            <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} style={{ width: 24, height: 24, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="arrowUp" size={12} color={T.muted} />
            </button>
          )}
          {!isLast && (
            <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} style={{ width: 24, height: 24, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="arrowDown" size={12} color={T.muted} />
            </button>
          )}
        </div>
        <Icon name={isEditing ? "chevUp" : "chevDown"} size={14} color={T.muted} />
      </div>

      {/* Expanded Editor */}
      {isEditing && (
        <div style={{ padding: "0 12px 12px", borderTop: `1px solid ${T.borderLight}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 10, paddingTop: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 3, fontFamily: font.ui }}>Item Name</label>
              <input
                value={data.heading}
                onChange={(e) => setData({ ...data, heading: e.target.value })}
                placeholder="e.g. Classic Burger"
                style={{
                  width: "100%", padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
                  borderRadius: 4, background: "#fff", color: T.ink, outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 3, fontFamily: font.ui }}>Price / Value</label>
              <input
                value={data.headingValue}
                onChange={(e) => setData({ ...data, headingValue: e.target.value })}
                placeholder="e.g. R 89.00"
                style={{
                  width: "100%", padding: "7px 10px", fontSize: 13, fontFamily: font.mono, border: `1px solid ${T.border}`,
                  borderRadius: 4, background: "#fff", color: T.accent, outline: "none", boxSizing: "border-box", fontWeight: 600,
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 3, fontFamily: font.ui }}>Description</label>
            <textarea
              value={data.headingDescription}
              onChange={(e) => setData({ ...data, headingDescription: e.target.value })}
              placeholder="Item description, ingredients, dietary tags…"
              rows={2}
              style={{
                width: "100%", padding: "7px 10px", fontSize: 13, fontFamily: font.ui, border: `1px solid ${T.border}`,
                borderRadius: 4, background: "#fff", color: T.ink, outline: "none", resize: "vertical", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 8 }}>
            <Btn variant="danger" size="xs" icon={<Icon name="trash" size={12} color={T.danger} />} onClick={onDelete}>Delete</Btn>
            <Btn variant="ghost" size="xs" icon={<Icon name="copy" size={12} />}>Duplicate</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION CARD — Collapsible section with rows inside
// ═══════════════════════════════════════════════════════════════

function SectionCard({ section, sectionIndex, onDeleteSection }) {
  const [collapsed, setCollapsed] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [title, setTitle] = useState(section.title);
  const [rows, setRows] = useState(section.rows);

  const handleDeleteRow = (rowId) => {
    setRows(rows.filter((r) => r.id !== rowId));
  };

  const handleMoveRow = (idx, dir) => {
    const newRows = [...rows];
    const target = idx + dir;
    if (target < 0 || target >= newRows.length) return;
    [newRows[idx], newRows[target]] = [newRows[target], newRows[idx]];
    newRows.forEach((r, i) => (r.sort = i));
    setRows(newRows);
    if (editingRow === idx) setEditingRow(target);
    else if (editingRow === target) setEditingRow(idx);
  };

  const handleAddRow = () => {
    const newRow = {
      id: `new-${Date.now()}`,
      heading: "",
      headingValue: "",
      headingDescription: "",
      sort: rows.length,
    };
    setRows([...rows, newRow]);
    setEditingRow(rows.length);
    setCollapsed(false);
  };

  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 12, overflow: "hidden" }}>
      {/* Section Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
        borderBottom: collapsed ? "none" : `1px solid ${T.borderLight}`,
        background: T.surfaceAlt,
        cursor: "pointer",
      }}>
        <div style={{ color: T.muted, cursor: "grab", flexShrink: 0 }}>
          <Icon name="grip" size={14} color={T.muted} />
        </div>
        <div onClick={() => setCollapsed(!collapsed)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name={collapsed ? "chevRight" : "chevDown"} size={14} color={T.sub} />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Section heading…"
            style={{
              fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: font.ui, border: "none", background: "transparent",
              outline: "none", flex: 1, padding: "2px 0",
            }}
          />
        </div>
        <Badge label={`${rows.length} item${rows.length !== 1 ? "s" : ""}`} variant="muted" />
        <Btn variant="ghost" size="xs" icon={<Icon name="plus" size={12} />} onClick={handleAddRow}>Add</Btn>
        <button onClick={onDeleteSection} style={{ width: 26, height: 26, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="trash" size={13} color={T.muted} />
        </button>
      </div>

      {/* Rows */}
      {!collapsed && (
        <div style={{ padding: "8px 12px" }}>
          {rows.length === 0 ? (
            <div style={{ padding: "20px 16px", textAlign: "center", color: T.muted, fontSize: 13, fontFamily: font.ui }}>
              <p style={{ margin: "0 0 8px" }}>No items in this section yet</p>
              <Btn variant="outline" size="sm" icon={<Icon name="plus" size={13} color={T.accent} />} onClick={handleAddRow}>Add First Item</Btn>
            </div>
          ) : (
            rows.map((row, idx) => (
              <RowItem
                key={row.id}
                row={row}
                index={idx}
                isEditing={editingRow === idx}
                onToggleEdit={() => setEditingRow(editingRow === idx ? null : idx)}
                onDelete={() => handleDeleteRow(row.id)}
                onMoveUp={() => handleMoveRow(idx, -1)}
                onMoveDown={() => handleMoveRow(idx, 1)}
                isFirst={idx === 0}
                isLast={idx === rows.length - 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB SIDEBAR — Vertical tab navigation
// ═══════════════════════════════════════════════════════════════

function TabSidebar({ tabs, activeTab, onSelectTab, onAddTab, onDeleteTab, onRenameTab }) {
  const [renamingTab, setRenamingTab] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const startRename = (idx) => {
    setRenamingTab(idx);
    setRenameValue(tabs[idx].tabName);
  };

  const commitRename = () => {
    if (renameValue.trim()) {
      onRenameTab(renamingTab, renameValue.trim());
    }
    setRenamingTab(null);
  };

  const totalItems = (tab) => tab.sections.reduce((sum, s) => sum + s.rows.length, 0);

  return (
    <div style={{
      width: 220, minWidth: 220, background: T.surface, borderRight: `1px solid ${T.border}`,
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      {/* Tab List Header */}
      <div style={{ padding: "16px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: T.muted, fontFamily: font.mono, textTransform: "uppercase" }}>Tabs</span>
        <Btn variant="ghost" size="xs" icon={<Icon name="plus" size={13} color={T.accent} />} onClick={onAddTab} style={{ color: T.accent }} />
      </div>

      {/* Tab Items */}
      <div style={{ flex: 1, padding: "0 8px", overflowY: "auto" }}>
        {tabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(idx)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 10px",
                borderRadius: T.radiusSm, cursor: "pointer", marginBottom: 2,
                background: isActive ? T.accentSoft : "transparent",
                transition: "all 0.12s",
                border: isActive ? `1px solid ${T.accent}22` : "1px solid transparent",
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: isActive ? T.accent : T.faint,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon name="folder" size={13} color={isActive ? "#fff" : T.sub} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {renamingTab === idx ? (
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => e.key === "Enter" && commitRename()}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: font.ui, border: `1px solid ${T.accent}`,
                      borderRadius: 3, padding: "1px 4px", background: "#fff", outline: "none", width: "100%", boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <div
                    onDoubleClick={(e) => { e.stopPropagation(); startRename(idx); }}
                    style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, color: isActive ? T.accent : T.ink, fontFamily: font.ui, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {tab.tabName}
                  </div>
                )}
                <div style={{ fontSize: 11, color: T.muted, fontFamily: font.mono }}>
                  {tab.sections.length} section{tab.sections.length !== 1 ? "s" : ""} · {totalItems(tab)} items
                </div>
              </div>
              {tabs.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); onDeleteTab(idx); }} style={{ width: 22, height: 22, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4, flexShrink: 0 }}>
                  <Icon name="x" size={12} color={T.sub} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Helper text */}
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.borderLight}`, fontSize: 11, color: T.muted, fontFamily: font.ui, lineHeight: 1.4 }}>
        Double-click a tab name to rename it. Each tab appears as a navigation tab on the card.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VISIBILITY CONTROLS — Quick toggles panel
// ═══════════════════════════════════════════════════════════════

function VisibilityPanel({ genericDetailsVisible, genericImagesVisible, genericBlocksVisible, onToggle }) {
  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: T.successSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="eye" size={14} color={T.success} />
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>Section Visibility</h3>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <Toggle on={genericDetailsVisible} onToggle={() => onToggle("genericDetailsVisible")} label="Card Details" size="sm" />
        <Toggle on={genericImagesVisible} onToggle={() => onToggle("genericImagesVisible")} label="Images" size="sm" />
        <Toggle on={genericBlocksVisible} onToggle={() => onToggle("genericBlocksVisible")} label="Content Blocks" size="sm" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB CONTENT AREA — Sections for the active tab
// ═══════════════════════════════════════════════════════════════

function TabContentArea({ tab }) {
  const [sections, setSections] = useState(tab.sections);

  // Sync when tab changes
  useEffect(() => {
    setSections(tab.sections);
  }, [tab.tabName]);

  const handleAddSection = () => {
    const newSection = {
      id: `new-sec-${Date.now()}`,
      title: "",
      sort: sections.length,
      rows: [],
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (idx) => {
    const s = sections[idx];
    if (s.rows.length > 0 && !confirm(`Delete "${s.title || "Untitled section"}" and its ${s.rows.length} item(s)?`)) return;
    setSections(sections.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {/* Tab Content Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>{tab.tabName}</h2>
          <p style={{ fontSize: 12, color: T.sub, margin: "2px 0 0", fontFamily: font.ui }}>
            {sections.length} section{sections.length !== 1 ? "s" : ""} · {sections.reduce((s, sec) => s + sec.rows.length, 0)} total items
          </p>
        </div>
        <Btn variant="secondary" size="sm" icon={<Icon name="plus" size={14} />} onClick={handleAddSection}>Add Section</Btn>
      </div>

      {/* Sections */}
      {sections.length === 0 ? (
        <div style={{
          background: T.surface, borderRadius: T.radius, border: `2px dashed ${T.border}`,
          padding: "48px 32px", textAlign: "center",
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: T.warningSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <Icon name="layers" size={22} color={T.warning} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: T.ink, margin: "0 0 4px", fontFamily: font.ui }}>No sections yet</p>
          <p style={{ fontSize: 13, color: T.sub, margin: "0 0 16px", fontFamily: font.ui }}>
            Sections group your items under headings like "Breakfast", "Mains", etc.
          </p>
          <Btn icon={<Icon name="plus" size={14} color="#fff" />} onClick={handleAddSection}>Create First Section</Btn>
        </div>
      ) : (
        sections.map((section, idx) => (
          <SectionCard
            key={section.id}
            section={section}
            sectionIndex={idx}
            onDeleteSection={() => handleDeleteSection(idx)}
          />
        ))
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP — Generic Card Editor
// ═══════════════════════════════════════════════════════════════

export default function GenericCardEditor() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(0);
  const [activePanel, setActivePanel] = useState("content"); // "content" | "details" | "styling"

  const handleToggleVisibility = (key) => {
    setData({ ...data, [key]: !data[key] });
  };

  const handleAddTab = () => {
    const newTab = {
      tabName: `New Tab ${data.tabs.length + 1}`,
      tabNumber: data.tabs.length,
      sections: [],
    };
    setData({ ...data, tabs: [...data.tabs, newTab] });
    setActiveTab(data.tabs.length);
  };

  const handleDeleteTab = (idx) => {
    if (!confirm(`Delete "${data.tabs[idx].tabName}" tab and all its contents?`)) return;
    const newTabs = data.tabs.filter((_, i) => i !== idx);
    setData({ ...data, tabs: newTabs });
    if (activeTab >= newTabs.length) setActiveTab(Math.max(0, newTabs.length - 1));
  };

  const handleRenameTab = (idx, newName) => {
    const newTabs = [...data.tabs];
    newTabs[idx] = { ...newTabs[idx], tabName: newName };
    setData({ ...data, tabs: newTabs });
  };

  const panels = ["content", "details"];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: T.bg, fontFamily: font.ui }}>
      {/* Top Bar */}
      <TopBar cardName={data.cardName} companyName={data.companyName} orgUnit={data.orgUnitName} />

      {/* Sub-nav: Content vs Details */}
      <div style={{ padding: "0 28px", background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", gap: 0 }}>
        {[
          { id: "content", label: "Content Blocks", icon: "layers", count: data.tabs.length },
          { id: "details", label: "Card Details", icon: "info" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePanel(p.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "12px 18px", border: "none",
              background: "transparent", cursor: "pointer", fontFamily: font.ui, fontSize: 13,
              fontWeight: activePanel === p.id ? 600 : 500,
              color: activePanel === p.id ? T.accent : T.sub,
              borderBottom: activePanel === p.id ? `2px solid ${T.accent}` : "2px solid transparent",
              marginBottom: -1,
              transition: "all 0.12s",
            }}
          >
            <Icon name={p.icon} size={15} color={activePanel === p.id ? T.accent : T.sub} />
            {p.label}
            {p.count !== undefined && <Badge label={p.count} variant={activePanel === p.id ? "accent" : "muted"} />}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {activePanel === "content" ? (
          <>
            {/* Tab Sidebar */}
            <TabSidebar
              tabs={data.tabs}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onAddTab={handleAddTab}
              onDeleteTab={handleDeleteTab}
              onRenameTab={handleRenameTab}
            />

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
              {/* Visibility Toggles */}
              <VisibilityPanel
                genericDetailsVisible={data.genericDetailsVisible}
                genericImagesVisible={data.genericImagesVisible}
                genericBlocksVisible={data.genericBlocksVisible}
                onToggle={handleToggleVisibility}
              />

              {/* Active Tab Content */}
              {data.tabs[activeTab] && (
                <TabContentArea tab={data.tabs[activeTab]} key={activeTab} />
              )}
            </div>
          </>
        ) : (
          /* Details Panel — Full width */
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", maxWidth: 860 }}>
            <CardDetailsPanel
              details={data.details}
              visible={data.genericDetailsVisible}
              onToggleVisible={() => handleToggleVisibility("genericDetailsVisible")}
            />

            {/* Color Overrides */}
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: T.warningSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="palette" size={14} color={T.warning} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: font.display, margin: 0 }}>Color Overrides</h3>
                <Badge label="Optional" variant="muted" />
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ fontSize: 13, color: T.sub, margin: "0 0 16px", fontFamily: font.ui }}>
                  Override default theme colors for this card. Leave empty to use the card theme defaults.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { key: "cardBackgroundColor", label: "Background" },
                    { key: "buttonColor", label: "Button" },
                    { key: "buttonTextColor", label: "Button Text" },
                    { key: "tabHeadingColor", label: "Tab Heading" },
                    { key: "tabHeadingNotSelectedColor", label: "Tab Inactive" },
                    { key: "mainHeadingColor", label: "Main Heading" },
                    { key: "blockHeadingColor", label: "Section Heading" },
                    { key: "itemHeadingColor", label: "Item Name" },
                    { key: "itemValueColor", label: "Item Value" },
                    { key: "itemDescriptionColor", label: "Description" },
                    { key: "deviderLineColor", label: "Divider Line" },
                  ].map((c) => (
                    <div key={c.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: T.sub, marginBottom: 3, fontFamily: font.ui }}>{c.label}</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: T.surfaceAlt }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 4,
                          background: data.colorOverrides[c.key] || T.faint,
                          border: `1px solid ${T.border}`, cursor: "pointer", flexShrink: 0,
                        }} />
                        <input
                          value={data.colorOverrides[c.key] || ""}
                          onChange={(e) => setData({
                            ...data,
                            colorOverrides: { ...data.colorOverrides, [c.key]: e.target.value || null },
                          })}
                          placeholder="Default"
                          style={{
                            flex: 1, border: "none", background: "transparent", fontSize: 12, color: T.sub,
                            fontFamily: font.mono, outline: "none", width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
