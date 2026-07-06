import { useState } from "react";

/* ══════════════════════════════════════════════════════════════
   SERITI SOLUTIONS — "Tech" Digital Business Card
   Recreated pixel-for-pixel from CardDesigns/NewCard5
   (TechCardDesktop.mp4 / TechCardMobile.mp4)

   Aesthetic: near-black hacker/terminal theme, neon-emerald accent,
   monospace section labels ("// CONTACT"), dot-grid + perspective
   grid backdrop behind the hero. Single narrow column on both
   mobile and desktop (services grid goes 2-col on desktop only).
   ══════════════════════════════════════════════════════════════ */

const IMG = {
  profile: "/seriti-awesome/Profile.jpg",
  gallery: [
    "/seriti-green/Gallery1.jpg",
    "/seriti-green/Gallery2.jpg",
    "/seriti-green/Gallery3.jpg",
    "/seriti-green/Gallery4.jpg",
    "/seriti-green/Gallery5.jpg",
    "/seriti-green/Gallery6.jpg",
  ],
  testimonials: ["/seriti-green/Gallery5.jpg", "/seriti-green/Services1.jpg", "/seriti-green/Services3.jpg"],
};

const PROFILE = {
  name: ["Ashleigh", "Exley"],
  title: "National Manager",
  region: "Mauritius",
  company: "SERITI SOLUTIONS",
  email: "ashleigh@seritisolutions.com",
  phone: "+230 5977 8738",
  whatsapp: "+23059778738",
};

const ABOUT = [
  "Seriti is a totally independent solutions-driven company which differentiates itself through its unique solutions and industry expertise. We deliver technology solutions to a host of sectors providing immediate results.",
  "Grounded by our intellectual property and knowledge from management and employees, the solutions are intelligent in an ever-changing landscape of financial services. We are the out the box thinkers and our pioneering approach keeps us ahead of the curve.",
];

const CONTACT_ITEMS = [
  { icon: "mail", label: "Email", value: PROFILE.email },
  { icon: "phone", label: "Phone", value: PROFILE.phone },
  { icon: "whatsapp", label: "WhatsApp", value: PROFILE.whatsapp },
];

const SERVICES = [
  { icon: "clock", title: "Fully Integrated System", body: "Seriti system: Performance Measurement, Compliance, Efficiency, Integration. Tracks performance, ensures compliance, automates..." },
  { icon: "smartphone", title: "Interactive Digital Business Cards", body: "Go green with digital business cards. Share contact info digitally, boost online presence, minimize waste. Collect leads effortlessly with fillable forms." },
  { icon: "shield", title: "Value Added Products", body: "We offer a range of products to our customers in the form of Vehicle Warranties, Vehicle Body Maintenance, Tyre and Rim protection and..." },
  { icon: "briefcase", title: "Professional Consulting Services", body: "Consulting for finance, insurance, and asset dealers. Specializing in ops efficiency, project management, data analytics. Customized solution..." },
  { icon: "car", title: "Dealer Management System", body: "Streamlines processes, reduces reworks and enhances back office efficiencies. Empowers marketing strategies with robust Data Analytics...." },
  { icon: "card", title: "Hosted Finance Application", body: "Branded embedded finance app enables customers and Dealer Partners to capture and submit applications electronically. Streamlines..." },
  { icon: "image", title: "360 Virtual Tours", body: "Revolutionize product showcasing with immersive 360° views, high-resolution imagery, and personalized highlights. Engage customers like..." },
];

const HOURS = [
  { d: "Mon", h: "9am – 5pm", open: true },
  { d: "Tue", h: "9am – 5pm", open: true },
  { d: "Wed", h: "9am – 5pm", open: true },
  { d: "Thu", h: "9am – 5pm", open: true },
  { d: "Fri", h: "9am – 5pm", open: true },
  { d: "Sat", h: "Closed", open: false },
  { d: "Sun", h: "Closed", open: false },
];

const TESTIMONIALS = [
  {
    img: IMG.testimonials[0],
    name: "Hatfield Motor Group",
    quote: "Seriti has impacted our business for the positive since moving platforms a few years ago. The system is stable and reliable, with great technical support. Our Business Managers profit margins keep on improving due to the reports that are available. Every aspect of back-end can be viewed based on the various reports that are available on a group, dealer, department and individual level. I make extensive use of the system to drive KPI's which result in better productivity and increased profit margins. Compliance levels have increased and the use of paper has been reduced.",
  },
  {
    img: IMG.testimonials[1],
    name: "ECM Group",
    quote: "Seriti are clear leaders in their industry, understanding our business inside out which makes a significant difference in the way we operate. With Seriti our dealerships seen an increase in our second gross and a significant increase in the sale of our value added products. Seriti constantly enhance and upgrade their system which ensures we have a relevant and user friendly system. Reporting, data management and compliance is easy and user friendly. The cost of Seriti is low and definitely worth the investment. For the Seriti system and Team nothing is impossible, they make it possible!",
  },
  {
    img: IMG.testimonials[2],
    name: "Eagle Ford",
    quote: "Today, 2nd Gross revenue is becoming increasingly important for a car dealership, for many dealerships, efficient F&I management also offers untapped potential to increase revenue and profitability. Partnering with Seriti Solutions has assisted us in evaluating our F&I performance in depth and aided us on the correct path to increase our revenue. A tangible and measurable benefit of utilising Seriti. If you're looking for an increase in productivity and more importantly you profit margins, then you could genuinely benefit from Seriti.",
  },
];

const TIME_SLOTS = ["9am – 10am", "10am – 11am", "11am – 12pm", "12pm – 1pm", "2pm – 3pm", "3pm – 4pm"];
const SOCIAL = [
  { icon: "globe", label: "Website" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "facebook", label: "Facebook" },
];
const ACTIONS = [
  { icon: "download", label: "Save Card", accent: true },
  { icon: "share2", label: "Share Card", accent: true },
  { icon: "userCheck", label: "Contact" },
  { icon: "home", label: "Add to Home" },
];

/* ── palette ────────────────────────────────────────────────── */
const C = {
  bg: "#050505",
  surface: "#0A0B0A",
  surfaceAlt: "#0A1613",
  border: "rgba(255,255,255,0.09)",
  borderGreen: "rgba(52,211,153,0.28)",
  textPrimary: "#F2F4F3",
  textSecondary: "#9AA4AE",
  textMuted: "#5F6A73",
  role: "#A5B4FC",
  nameAlt: "#8FB4D9",
  green: "#34D399",
  greenBright: "#4ADE80",
  greenSolid: "#0EA473",
  greenDeep: "#00120A",
  pink: "#F3A6B2",
  mono: "'JetBrains Mono', 'Fira Code', 'Space Mono', monospace",
  sans: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
};

/* ── icon set ───────────────────────────────────────────────── */
const svgProps = (size, color, sw = 1.8) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round",
  style: { display: "block", flexShrink: 0 },
});
const Icon = ({ name, size = 18, color = "currentColor", sw }) => {
  const p = svgProps(size, color, sw);
  switch (name) {
    case "mail": return <svg {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="M3 6l9 7 9-7" /></svg>;
    case "phone": return <svg {...p}><path d="M4.5 3.5h4l1.5 5-2.5 1.5a12 12 0 006 6l1.5-2.5 5 1.5v4a2 2 0 01-2.2 2A17.5 17.5 0 013 5.7 2 2 0 014.5 3.5z" /></svg>;
    case "whatsapp": return <svg {...p} fill={color} stroke="none"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 2a8 8 0 014.7 14.5l-.3.2.4 2.6-2.7-.7-.3.2A8 8 0 1112 4zm4.4 10.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.8-2.2-1.5-.6-.6-1.1-1.3-1.5-2-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.9 1.3-.9 2.1 0 1 .4 2 1.2 3 1 1.4 2.2 2.6 3.7 3.4.5.3 1.2.6 1.9.7.7.1 1.4 0 2-.3.6-.3 1-.9 1.1-1.5.1-.3.1-.7 0-.8-.1-.1-.2-.2-.4-.3z" /></svg>;
    case "chat": return <svg {...p}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>;
    case "star": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>;
    case "arrowRight": return <svg {...p} strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "chevronRight": return <svg {...p} strokeWidth="2.2"><polyline points="9 6 15 12 9 18" /></svg>;
    case "chevronLeft": return <svg {...p} strokeWidth="2.2"><polyline points="15 6 9 12 15 18" /></svg>;
    case "chevronDown": return <svg {...p} strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>;
    case "arrowUp": return <svg {...p} strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M16 2.5v4M8 2.5v4M3 9.5h18" /></svg>;
    case "mapPin": return <svg {...p}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3.3 2" /></svg>;
    case "smartphone": return <svg {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2" /><path d="M11 18.5h2" /></svg>;
    case "shield": return <svg {...p}><path d="M12 2.5l8 3.5v6c0 5-3.4 8.4-8 9.5-4.6-1.1-8-4.5-8-9.5V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>;
    case "briefcase": return <svg {...p}><rect x="2.5" y="7" width="19" height="12.5" rx="2" /><path d="M8 7V5.5a2 2 0 012-2h4a2 2 0 012 2V7M2.5 12.5h19" /></svg>;
    case "car": return <svg {...p}><path d="M4 16v-3.5L6 7.5A2 2 0 018 6h8a2 2 0 012 1.5l2 5V16" /><path d="M3 16h18v2.5a1 1 0 01-1 1h-1.5a1 1 0 01-1-1V17H6.5v1.5a1 1 0 01-1 1H4a1 1 0 01-1-1z" /><circle cx="7.5" cy="16" r="1.3" fill={color} /><circle cx="16.5" cy="16" r="1.3" fill={color} /></svg>;
    case "card": return <svg {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="2" /><path d="M2.5 9.5h19M6 14.5h4" /></svg>;
    case "image": return <svg {...p}><rect x="3" y="3.5" width="18" height="17" rx="2" /><circle cx="8.5" cy="9" r="1.6" /><path d="M21 15.5l-5.5-5-9 9" /></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5a15 15 0 013.8 9.5 15 15 0 01-3.8 9.5A15 15 0 018.2 12 15 15 0 0112 2.5z" /></svg>;
    case "linkedin": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "block", flexShrink: 0 }}><path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>;
    case "facebook": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "block", flexShrink: 0 }}><path d="M14 9h2.5V5.5H14C11.5 5.5 10 7 10 9.3V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9.6c0-.6.3-.6.5-.6z" /></svg>;
    case "download": return <svg {...p}><path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5" /><path d="M4 19.5h16" /></svg>;
    case "share2": return <svg {...p}><circle cx="18" cy="5" r="2.8" /><circle cx="6" cy="12" r="2.8" /><circle cx="18" cy="19" r="2.8" /><path d="M8.5 10.6l7-3.7M8.5 13.4l7 3.7" /></svg>;
    case "userCheck": return <svg {...p}><path d="M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20" /><circle cx="9" cy="7.5" r="3.5" /><path d="M16.5 11l1.5 1.5L21 9.3" /></svg>;
    case "home": return <svg {...p}><path d="M3.5 11l8.5-7 8.5 7" /><path d="M5.5 9.7V20a1 1 0 001 1H9a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2.5a1 1 0 001-1V9.7" /></svg>;
    default: return null;
  }
};

/* ── shared bits ────────────────────────────────────────────── */
const SectionHeader = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
    <span style={{ fontFamily: C.mono, fontSize: 12.5, fontWeight: 700, color: C.green, letterSpacing: ".08em", whiteSpace: "nowrap" }}>
      // {children}
    </span>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
  </div>
);

const Stars = ({ n = 5, size = 13 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={size} color={i < n ? C.green : "#2A302C"} />)}
  </div>
);

const glowLineTop = { height: 2, background: `linear-gradient(90deg, transparent, ${C.green}, transparent)`, opacity: 0.7 };

const Card = ({ children, style }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, ...style }}>{children}</div>
);

const ContactRow = ({ item, last }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderBottom: last ? "none" : `1px solid ${C.border}`, cursor: "pointer" }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, background: C.surfaceAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={item.icon} size={17} color={C.green} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: C.mono, fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em" }}>{item.label}</div>
      <div style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 700, color: C.textPrimary, marginTop: 2 }}>{item.value}</div>
    </div>
    <Icon name="chevronRight" size={16} color={C.textMuted} />
  </div>
);

const ServiceCard = ({ item }) => (
  <div style={{ position: "relative", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px 20px", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, ...glowLineTop }} />
    <div style={{ width: 42, height: 42, borderRadius: 10, background: C.surfaceAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <Icon name={item.icon} size={19} color={C.green} />
    </div>
    <h3 style={{ fontFamily: C.sans, fontSize: 15.5, fontWeight: 700, color: C.textPrimary, margin: "0 0 8px" }}>{item.title}</h3>
    <p style={{ fontFamily: C.sans, fontSize: 13, lineHeight: 1.6, color: C.textSecondary, margin: "0 0 16px" }}>{item.body}</p>
    <button style={{
      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      background: C.greenDeep, border: `1px solid ${C.borderGreen}`, borderRadius: 10, padding: "11px",
      fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, color: C.green, letterSpacing: ".05em", cursor: "pointer",
    }}>
      LEARN MORE <Icon name="arrowRight" size={13} color={C.green} />
    </button>
  </div>
);

const TestimonialCard = ({ t }) => (
  <div style={{ position: "relative", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, ...glowLineTop }} />
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <img src={t.img} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
      <div style={{ fontFamily: C.sans, fontSize: 14.5, fontWeight: 700, color: C.textPrimary }}>{t.name}</div>
    </div>
    <Stars />
    <p style={{ fontFamily: C.sans, fontSize: 13, lineHeight: 1.7, color: C.textSecondary, fontStyle: "italic", margin: "12px 0 0" }}>&ldquo;{t.quote}&rdquo;</p>
  </div>
);

const fieldLabel = { display: "block", fontFamily: C.mono, fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 7 };
const fieldInput = { width: "100%", boxSizing: "border-box", background: "#000", border: `1px solid ${C.border}`, borderRadius: 9, padding: "11px 13px", fontFamily: C.sans, fontSize: 13.5, color: C.textPrimary };

const FormField = ({ label, required, placeholder, type = "text", full }) => (
  <div style={{ flex: full ? "1 1 100%" : "1 1 180px" }}>
    <label style={fieldLabel}>{label} {required && <span style={{ color: C.green }}>*</span>}</label>
    <input type={type} placeholder={placeholder} readOnly style={fieldInput} />
  </div>
);

const SocialButton = ({ item }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={item.icon} size={19} color={C.textPrimary} />
    </div>
    <span style={{ fontFamily: C.mono, fontSize: 10.5, color: C.textMuted, letterSpacing: ".04em" }}>{item.label.toUpperCase()}</span>
  </div>
);

const ActionButton = ({ item }) => (
  <button style={{
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    background: item.accent ? C.greenDeep : C.surface,
    border: `1px solid ${item.accent ? C.borderGreen : C.border}`,
    borderRadius: 12, padding: "14px 10px", cursor: "pointer",
    fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em",
    color: item.accent ? C.green : C.textPrimary,
  }}>
    <Icon name={item.icon} size={15} color={item.accent ? C.green : C.textPrimary} /> {item.label.toUpperCase()}
  </button>
);

/* ── gallery carousel ───────────────────────────────────────── */
const Gallery = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i > 0 ? i - 1 : IMG.gallery.length - 1));
  const next = () => setIdx((i) => (i < IMG.gallery.length - 1 ? i + 1 : 0));
  return (
    <div>
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, background: "#000" }}>
        <img src={IMG.gallery[idx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <button onClick={prev} style={navBtn("left")}><Icon name="chevronLeft" size={18} color="#fff" /></button>
        <button onClick={next} style={navBtn("right")}><Icon name="chevronRight" size={18} color="#fff" /></button>
        <span style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.6)", color: "#fff", fontFamily: C.mono, fontSize: 12, padding: "4px 12px", borderRadius: 20 }}>
          {idx + 1} / {IMG.gallery.length}
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, overflowX: "auto" }}>
        {IMG.gallery.map((src, i) => (
          <img key={i} src={src} alt="" onClick={() => setIdx(i)} style={{
            width: 64, height: 48, objectFit: "cover", borderRadius: 8, cursor: "pointer", flexShrink: 0,
            border: i === idx ? `2px solid ${C.green}` : `2px solid transparent`, opacity: i === idx ? 1 : 0.55,
          }} />
        ))}
      </div>
    </div>
  );
};

const navBtn = (side) => ({
  position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 10, zIndex: 2,
  width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.55)", border: "none",
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)",
});

/* ── hero (identical structure, only sizing differs) ───────── */
const Hero = ({ desktop }) => (
  <div style={{ position: "relative", overflow: "hidden", padding: desktop ? "64px 0 40px" : "48px 0 32px" }}>
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse 70% 55% at 50% 0%, rgba(52,211,153,0.18), transparent 70%)`,
    }} />
    <div style={{
      position: "absolute", inset: 0, opacity: 0.35,
      backgroundImage: `linear-gradient(rgba(52,211,153,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,.5) 1px, transparent 1px)`,
      backgroundSize: "36px 36px",
      transform: "perspective(280px) rotateX(62deg) scale(1.6)",
      transformOrigin: "50% 0%",
      maskImage: "linear-gradient(to bottom, black, transparent 75%)",
      WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
    }} />
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: desktop ? 128 : 108, height: desktop ? 128 : 108, borderRadius: "50%", padding: 3, background: `conic-gradient(${C.green}, #0A2E22 60%, ${C.green})`, marginBottom: 16 }}>
        <img src={IMG.profile} alt={PROFILE.name.join(" ")} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block", border: `2px solid ${C.bg}` }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.greenDeep, border: `1px solid ${C.borderGreen}`, borderRadius: 20, padding: "5px 14px", marginBottom: 18 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.greenBright, boxShadow: `0 0 6px ${C.greenBright}` }} />
        <span style={{ fontFamily: C.mono, fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: ".08em" }}>AVAILABLE</span>
      </div>
      <h1 style={{ fontFamily: C.sans, fontSize: desktop ? 34 : 27, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-.01em" }}>
        <span style={{ color: "#fff" }}>{PROFILE.name[0]}</span>{" "}
        <span style={{ color: C.nameAlt, fontWeight: 600 }}>{PROFILE.name[1]}</span>
      </h1>
      <p style={{ fontFamily: C.sans, fontSize: desktop ? 16 : 14, fontWeight: 700, color: C.role, margin: "0 0 6px" }}>
        {PROFILE.title} — {PROFILE.region}
      </p>
      <p style={{ fontFamily: C.mono, fontSize: 12, fontWeight: 700, color: C.green, letterSpacing: ".1em", margin: 0 }}>{PROFILE.company}</p>
    </div>
  </div>
);

/* ── all content sections, shared between mobile & desktop ─── */
const ContentSections = ({ desktop }) => {
  const [slotsOpen, setSlotsOpen] = useState(false);
  const wrap = { maxWidth: desktop ? 535 : "none", margin: "0 auto", padding: desktop ? 0 : "0 18px" };
  const gap = desktop ? 44 : 36;

  return (
    <div style={{ ...wrap, display: "flex", flexDirection: "column", gap }}>
      {/* ABOUT (plain paragraphs, no heading — matches source) */}
      <div>
        {ABOUT.map((p, i) => (
          <p key={i} style={{ fontFamily: C.sans, fontSize: 13.5, lineHeight: 1.75, color: C.textSecondary, margin: i === 0 ? "0 0 14px" : 0 }}>{p}</p>
        ))}
      </div>

      {/* CONTACT */}
      <div>
        <SectionHeader>CONTACT</SectionHeader>
        <Card style={{ overflow: "hidden" }}>
          {CONTACT_ITEMS.map((c, i) => <ContactRow key={c.label} item={c} last={i === CONTACT_ITEMS.length - 1} />)}
        </Card>
      </div>

      {/* SERVICES */}
      <div>
        <SectionHeader>SERVICES</SectionHeader>
        <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: 16 }}>
          {SERVICES.map((s) => <ServiceCard key={s.title} item={s} />)}
        </div>
      </div>

      {/* HOURS */}
      <div>
        <SectionHeader>HOURS</SectionHeader>
        <Card style={{ padding: "16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, columnGap: 10 }}>
            {HOURS.map((row) => (
              <div key={row.d} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: C.sans, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.open ? C.greenBright : "#4B5158" }} />
                  {row.d}
                </span>
                <span style={{ fontFamily: C.mono, fontSize: 12.5, color: row.open ? C.textSecondary : C.textMuted, textTransform: "uppercase" }}>{row.h}</span>
              </div>
            ))}
          </div>
        </Card>
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: C.sans, fontSize: 12, color: C.pink, marginTop: 14 }}>
          <Icon name="clock" size={13} color={C.pink} /> All times in Mauritius Standard Time (MST)
        </p>
      </div>

      {/* TESTIMONIALS */}
      <div>
        <SectionHeader>TESTIMONIALS</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>

      {/* REQUEST APPOINTMENT */}
      <div>
        <SectionHeader>REQUEST APPOINTMENT</SectionHeader>
        <Card style={{ padding: desktop ? "26px 28px" : "20px 18px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 14 }}>
            <FormField label="Full Name" required placeholder="John Doe" full={!desktop} />
            <FormField label="Email" required placeholder="john@example.com" type="email" full={!desktop} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <FormField label="Phone" placeholder="+230 1234 5678" full />
          </div>
          <div style={{ marginBottom: 14 }}>
            <FormField label="Preferred Date" required placeholder="yyyy/mm/dd" type="date" full />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={fieldLabel}>Select Time <span style={{ color: C.green }}>*</span></label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(slotsOpen ? TIME_SLOTS : TIME_SLOTS.slice(0, 3)).map((slot) => (
                <div key={slot} style={{ padding: "9px 14px", borderRadius: 9, border: `1px solid ${C.border}`, background: "#000", fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, color: C.textSecondary, textTransform: "uppercase" }}>{slot}</div>
              ))}
            </div>
            {!slotsOpen && (
              <button onClick={() => setSlotsOpen(true)} style={{ marginTop: 8, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, color: C.green }}>
                <Icon name="chevronDown" size={12} color={C.green} /> 3 MORE
              </button>
            )}
          </div>
          <div style={{ marginBottom: 6 }}>
            <label style={fieldLabel}>Message (Optional)</label>
            <textarea readOnly placeholder="Tell us about your requirements..." rows={3} style={{ ...fieldInput, resize: "none", fontFamily: C.sans }} />
            <div style={{ textAlign: "right", fontFamily: C.mono, fontSize: 10.5, color: C.textMuted, marginTop: 4 }}>Max 500 chars</div>
          </div>
          <button style={{
            width: "100%", marginTop: 8, padding: "14px", borderRadius: 10, border: "none",
            background: C.greenSolid, color: "#04140D", fontFamily: C.mono, fontSize: 13, fontWeight: 700, letterSpacing: ".04em",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <Icon name="calendar" size={16} color="#04140D" /> REQUEST APPOINTMENT
          </button>
        </Card>
      </div>

      {/* GALLERY */}
      <div>
        <SectionHeader>GALLERY</SectionHeader>
        <Gallery />
      </div>

      {/* LOCATION */}
      <div>
        <SectionHeader>LOCATION</SectionHeader>
        <Card style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="mapPin" size={15} color={C.green} />
            </div>
            <span style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>Port Louis, Mauritius</span>
          </div>
          <div style={{ aspectRatio: desktop ? "16/8" : "4/3" }}>
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Port+Louis,+Mauritius&output=embed"
              style={{ width: "100%", height: "100%", border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) brightness(0.95)" }}
              loading="lazy"
            />
          </div>
        </Card>
      </div>

      {/* CONNECT */}
      <div>
        <SectionHeader>CONNECT</SectionHeader>
        <div style={{ display: "flex", justifyContent: "center", gap: desktop ? 36 : 24 }}>
          {SOCIAL.map((s) => <SocialButton key={s.label} item={s} />)}
        </div>
      </div>

      {/* ACTIONS */}
      <div>
        <SectionHeader>ACTIONS</SectionHeader>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {ACTIONS.map((a) => <ActionButton key={a.label} item={a} />)}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28, textAlign: "center" }}>
        <div style={{ fontFamily: C.sans, fontSize: 16, fontWeight: 800, color: "#fff" }}>SERITI Solutions</div>
        <div style={{ fontFamily: C.mono, fontSize: 12.5, color: C.role, marginTop: 4 }}>{PROFILE.phone}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16 }}>
          {["phone", "mail", "whatsapp"].map((ic) => (
            <div key={ic} style={{ width: 34, height: 34, borderRadius: "50%", background: C.surfaceAlt, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={ic} size={14} color={C.green} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── floating bottom bar + scroll-to-top (shared) ───────────── */
const FloatingBar = ({ desktop }) => (
  <>
    <div style={{
      position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 20, zIndex: 20,
      display: "flex", gap: 8, background: "rgba(10,10,10,.85)", border: `1px solid ${C.border}`,
      borderRadius: 999, padding: 6, backdropFilter: "blur(8px)",
    }}>
      <button style={{ display: "flex", alignItems: "center", gap: 6, background: C.greenSolid, border: "none", borderRadius: 999, padding: "9px 16px", fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, color: "#04140D", cursor: "pointer" }}>
        <Icon name="phone" size={13} color="#04140D" /> CALL
      </button>
      <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#16181A", border: `1px solid ${C.border}`, borderRadius: 999, padding: "9px 16px", fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
        <Icon name="mail" size={13} color="#fff" /> EMAIL
      </button>
      <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#16181A", border: `1px solid ${C.border}`, borderRadius: 999, padding: "9px 16px", fontFamily: C.mono, fontSize: 11.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
        <Icon name="chat" size={13} color="#fff" /> CHAT
      </button>
    </div>
    <button style={{
      position: "absolute", right: desktop ? 20 : 14, bottom: 20, zIndex: 20,
      width: 40, height: 40, borderRadius: 10, background: C.greenSolid, border: "none",
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
    }}>
      <Icon name="arrowUp" size={17} color="#04140D" />
    </button>
  </>
);

const dotGrid = {
  backgroundImage: "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

/* ═══════════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════════ */
function MobileCard() {
  return (
    <div style={{ position: "relative", background: C.bg, height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="tc5-scroll" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto", ...dotGrid }}>
        <Hero desktop={false} />
        <div style={{ paddingBottom: 100 }}>
          <ContentSections desktop={false} />
        </div>
      </div>
      <FloatingBar desktop={false} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP CARD
   ═══════════════════════════════════════════════════ */
function DesktopCard() {
  return (
    <div style={{ position: "relative", background: C.bg, height: "100%" }}>
      <div className="tc5-scroll" style={{ height: "100%", overflowY: "auto", ...dotGrid }}>
        <Hero desktop={true} />
        <div style={{ paddingBottom: 100 }}>
          <ContentSections desktop={true} />
        </div>
      </div>
      <FloatingBar desktop={true} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PREVIEW WRAPPER
   ═══════════════════════════════════════════════════ */
export default function TechCard5() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: "#111315", minHeight: "100%", fontFamily: C.sans }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap" />
      <style>{`
        .tc5-scroll::-webkit-scrollbar { display: none; }
        .tc5-scroll { scrollbar-width: none; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "18px 16px 0" }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 26px", fontSize: 13, fontWeight: 700, textTransform: "capitalize",
              borderRadius: 10, cursor: "pointer", fontFamily: C.sans,
              border: mode === m ? `1.5px solid ${C.green}` : "1.5px solid #2A2E2C",
              background: mode === m ? C.greenSolid : "#1A1C1E",
              color: mode === m ? "#04140D" : "#C7CCD1",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 16px 48px", display: "flex", justifyContent: "center" }}>
        {mode === "mobile" ? (
          <div style={{ width: 390, height: 780, borderRadius: 32, border: "10px solid #1A1A1A", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.4)", position: "relative", background: C.bg }}>
            <MobileCard />
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 900, height: 780, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,.3)", borderRadius: 16, overflow: "hidden" }}>
            <DesktopCard />
          </div>
        )}
      </div>
    </div>
  );
}
