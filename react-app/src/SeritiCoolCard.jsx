import { useState } from "react";

/* ══════════════════════════════════════════════════════════════
   SERITI SOLUTIONS — "Cool" Digital Business Card
   Recreated from CardDesigns/NewCard4 screen recordings
   (CoolCardMobile.mp4, CoolCardDesktop.mp4)

   A minimal, utilitarian "widget" style: fixed narrow content
   column (even on desktop), small dot-bullet section labels with
   no big headings, sky-blue accent, image carousel gallery, and
   a floating pill-shaped call-to-action bar on every breakpoint.
   ══════════════════════════════════════════════════════════════ */

const IMG = {
  banner: "/seriti-cool/Banner.jpg",
  profile: "/seriti-cool/Profile.jpg",
  gallery: [
    "/seriti-cool/Gallery1.jpg",
    "/seriti-cool/Gallery2.jpg",
    "/seriti-cool/Gallery3.jpg",
    "/seriti-cool/Gallery4.jpg",
    "/seriti-cool/Gallery5.jpg",
    "/seriti-cool/Gallery6.jpg",
  ],
};

const PROFILE = {
  first: "Ashleigh",
  last: "Exley",
  titleLine: "NATIONAL MANAGER (MAURITIUS)",
  company: "SERITI SOLUTIONS",
  email: "ashleigh@seritisolutions.com",
  phone: "+230 5977 8738",
  whatsapp: "+23059778738",
};

const ABOUT_PARAGRAPHS = [
  "Seriti is a totally independent solutions-driven company which differentiates itself through its unique solutions and industry expertise. We deliver technology solutions to a host of sectors providing immediate results.",
  "Grounded by our intellectual property and knowledge from management and employees, the solutions are intelligent in an ever-changing landscape of financial services. We are the out the box thinkers and our pioneering approach keeps us ahead of the curve.",
];

const SERVICES = [
  { icon: "clock", title: "Fully Integrated System", body: "Seriti system: Performance Measurement, Compliance, Efficiency, Integration. Tracks performance, ensures compliance, automates…" },
  { icon: "smartphone", title: "Interactive Digital Business Cards", body: "Go green with digital business cards. Share contact info digitally, boost online presence, minimize waste. Collect leads effortlessly with…" },
  { icon: "shield", title: "Value Added Products", body: "We offer a range of products to our customers in the form of Vehicle Warranties, Vehicle Body Maintenance, Tyre and Rim protection and…" },
  { icon: "briefcase", title: "Professional Consulting Services", body: "Consulting for finance, insurance, and asset dealers. Specializing in ops efficiency, project management, data analytics. Customized solution…" },
  { icon: "car", title: "Dealer Management System", body: "Streamlines processes, reduces reworks and enhances back office efficiencies. Empowers marketing strategies with robust Data Analytics…" },
  { icon: "card", title: "Hosted Finance Application", body: "Branded embedded finance app enables customers and Dealer Partners to capture and submit applications electronically. Streamlines…" },
  { icon: "image", title: "360 Virtual Tours", body: "Revolutionize product showcasing with immersive 360° views, high-resolution imagery, and personalized highlights. Engage customers…" },
];

const HOURS = [
  { d: "Mon", h: "9am – 5pm" }, { d: "Tue", h: "9am – 5pm" },
  { d: "Wed", h: "9am – 5pm" }, { d: "Thu", h: "9am – 5pm" },
  { d: "Fri", h: "9am – 5pm" }, { d: "Sat", h: "Closed", closed: true },
  { d: "Sun", h: "Closed", closed: true },
];

const TESTIMONIALS = [
  { img: "/seriti-cool/Gallery3.jpg", name: "Hatfield Motor Group", quote: "Seriti has impacted our business for the positive since moving platforms a few years ago. The system is stable and reliable, with great technical support. Our Business Managers profit margins keep on improving due to the reports that are available. Every aspect of back-end can be viewed based on the various reports that are available on a group, dealer, department and individual level. I make extensive use of the system to drive KPI's which result in better productivity and increased profit margins. Compliance levels have increased and the use of paper has been reduced." },
  { img: "/seriti-cool/Gallery2.jpg", name: "ECM Group", quote: "Seriti are clear leaders in their industry, understanding our business inside out which makes a significant difference in the way we operate. With Seriti our dealerships seen an increase in our second gross and a significant increase in the sale of our value added products. Seriti constantly enhance and upgrade their system which ensures we have a relevant and user friendly system. Reporting, data management and compliance is easy and user friendly. The cost of Seriti is low and definitely worth the investment. For the Seriti system and Team nothing is impossible, they make it possible!" },
  { img: "/seriti-cool/Gallery3.jpg", name: "Eagle Ford", quote: "Today, 2nd Gross revenue is becoming increasingly important for a car dealership, for many dealerships, efficient F&I management also offers untapped potential to increase revenue and profitability. Partnering with Seriti Solutions has assisted us in evaluating our F&I performance in depth and aided us on the correct path to increase our revenue. A tangible and measurable benefit of utilising Seriti. If you're looking for an increase in productivity and more importantly you profit margins, then you could genuinely benefit from Seriti." },
];

const TIME_SLOTS = ["9am – 10am", "10am – 11am", "11am – 12pm", "12pm – 1pm", "2pm – 3pm", "3pm – 4pm"];

const SHARE_ITEMS = [
  { icon: "download", label: "Save Card", solid: true },
  { icon: "share2", label: "Share Card", solid: true },
  { icon: "userCheck", label: "Contact", solid: false },
  { icon: "home", label: "Add to Home", solid: false },
];

const SOCIAL = [
  { icon: "globe", label: "Website" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "facebook", label: "Facebook" },
];

/* ── palette ────────────────────────────────────────────────── */
const C = {
  bgLight: "#F8F9FE",
  bgAlt: "#EFF3F7",
  cardWhite: "#FFFFFF",
  border: "#E7EAF2",
  navy: "#000026",
  body: "#5B6478",
  accent: "#0D96D3",
  accentBright: "#38BFF3",
  gradient: "linear-gradient(90deg, #3DBAEE 0%, #6290C4 100%)",
  iconBg: "#DCE6F6",
  serif: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', 'Segoe UI', system-ui, sans-serif",
};

/* ── icon set ───────────────────────────────────────────────── */
const svgProps = (size, color, sw = 1.8) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round",
});
const Icon = ({ name, size = 18, color = "currentColor", sw }) => {
  const p = svgProps(size, color, sw);
  switch (name) {
    case "mail": return <svg {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="M3 6l9 7 9-7" /></svg>;
    case "phone": return <svg {...p}><path d="M4.5 3.5h4l1.5 5-2.5 1.5a12 12 0 006 6l1.5-2.5 5 1.5v4a2 2 0 01-2.2 2A17.5 17.5 0 013 5.7 2 2 0 014.5 3.5z" /></svg>;
    case "whatsapp": return <svg {...p} fill={color} stroke="none"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 2a8 8 0 014.7 14.5l-.3.2.4 2.6-2.7-.7-.3.2A8 8 0 1112 4zm4.4 10.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.8-2.2-1.5-.6-.6-1.1-1.3-1.5-2-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.9 1.3-.9 2.1 0 1 .4 2 1.2 3 1 1.4 2.2 2.6 3.7 3.4.5.3 1.2.6 1.9.7.7.1 1.4 0 2-.3.6-.3 1-.9 1.1-1.5.1-.3.1-.7 0-.8-.1-.1-.2-.2-.4-.3z" /></svg>;
    case "chevronRight": return <svg {...p} strokeWidth="2.2"><path d="M9 6l6 6-6 6" /></svg>;
    case "chevronLeft": return <svg {...p} strokeWidth="2.2"><path d="M15 6l-6 6 6 6" /></svg>;
    case "star": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>;
    case "arrowRight": return <svg {...p} strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "arrowUp": return <svg {...p} strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M16 2.5v4M8 2.5v4M3 9.5h18" /></svg>;
    case "mapPin": return <svg {...p}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5a15 15 0 013.8 9.5 15 15 0 01-3.8 9.5A15 15 0 018.2 12 15 15 0 0112 2.5z" /></svg>;
    case "linkedin": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>;
    case "facebook": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M14 9h2.5V5.5H14C11.5 5.5 10 7 10 9.3V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9.6c0-.6.3-.6.5-.6z" /></svg>;
    case "download": return <svg {...p}><path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5" /><path d="M4 19.5h16" /></svg>;
    case "share2": return <svg {...p}><circle cx="18" cy="5" r="2.8" /><circle cx="6" cy="12" r="2.8" /><circle cx="18" cy="19" r="2.8" /><path d="M8.5 10.6l7-3.7M8.5 13.4l7 3.7" /></svg>;
    case "userCheck": return <svg {...p}><path d="M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20" /><circle cx="9" cy="7.5" r="3.5" /><path d="M16.5 11l1.5 1.5L21 9.3" /></svg>;
    case "home": return <svg {...p}><path d="M3.5 11l8.5-7 8.5 7" /><path d="M5.5 9.7V20a1 1 0 001 1H9a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2.5a1 1 0 001-1V9.7" /></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3.3 2" /></svg>;
    case "smartphone": return <svg {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2" /><path d="M11 18.5h2" /></svg>;
    case "shield": return <svg {...p}><path d="M12 2.5l8 3.5v6c0 5-3.4 8.4-8 9.5-4.6-1.1-8-4.5-8-9.5V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>;
    case "briefcase": return <svg {...p}><rect x="2.5" y="7" width="19" height="12.5" rx="2" /><path d="M8 7V5.5a2 2 0 012-2h4a2 2 0 012 2V7M2.5 12.5h19" /></svg>;
    case "car": return <svg {...p}><path d="M4 16v-3.5L6 7.5A2 2 0 018 6h8a2 2 0 012 1.5l2 5V16" /><path d="M3 16h18v2.5a1 1 0 01-1 1h-1.5a1 1 0 01-1-1V17H6.5v1.5a1 1 0 01-1 1H4a1 1 0 01-1-1z" /><circle cx="7.5" cy="16" r="1.3" fill={color} /><circle cx="16.5" cy="16" r="1.3" fill={color} /></svg>;
    case "card": return <svg {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="2" /><path d="M2.5 9.5h19M6 14.5h4" /></svg>;
    case "image": return <svg {...p}><rect x="3" y="3.5" width="18" height="17" rx="2" /><circle cx="8.5" cy="9" r="1.6" /><path d="M21 15.5l-5.5-5-9 9" /></svg>;
    case "externalLink": return <svg {...p}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6M10 14L21 3" /></svg>;
    default: return null;
  }
};

/* ── shared bits ────────────────────────────────────────────── */
const Label = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accentBright, flexShrink: 0 }} />
    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", color: C.body }}>{children}</span>
  </div>
);

const GradientBar = () => <div style={{ height: 3, background: C.gradient }} />;

const InfoRow = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px" }}>
    <div style={{ width: 38, height: 38, borderRadius: 10, background: C.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={icon} size={17} color={C.navy} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: C.body }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginTop: 1 }}>{value}</div>
    </div>
    <Icon name="chevronRight" size={16} color="#B7BECC" />
  </div>
);

const ServiceCard = ({ item }) => (
  <div style={{ background: C.cardWhite, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
    <GradientBar />
    <div style={{ padding: "22px" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        <Icon name={item.icon} size={20} color={C.navy} />
      </div>
      <h3 style={{ fontSize: 15.5, fontWeight: 700, color: C.navy, margin: "0 0 8px" }}>{item.title}</h3>
      <p style={{
        fontSize: 13, lineHeight: 1.6, color: C.body, margin: "0 0 16px",
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{item.body}</p>
      <button style={{
        width: "100%", padding: "11px", borderRadius: 10, border: "none", background: C.accent, color: "#fff",
        fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        fontFamily: C.sans,
      }}>Read More <Icon name="arrowRight" size={14} /></button>
    </div>
  </div>
);

const TestimonialCard = ({ t }) => (
  <div style={{ background: C.cardWhite, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
    <GradientBar />
    <div style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <img src={t.img} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", display: "block" }} />
        <span style={{ fontSize: 14.5, fontWeight: 700, color: C.navy }}>{t.name}</span>
      </div>
      <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
        {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={13} color={C.accentBright} />)}
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: C.body, fontStyle: "italic", margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
    </div>
  </div>
);

const FormField = ({ label, required, placeholder, type = "text", full }) => (
  <div style={{ flex: full ? "1 1 100%" : "1 1 220px" }}>
    <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: C.navy, marginBottom: 6 }}>
      {label} {required && <span style={{ color: C.accent }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} readOnly style={{
      width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10,
      border: `1px solid ${C.border}`, fontSize: 13.5, fontFamily: C.sans, color: C.navy, background: "#fff",
    }} />
  </div>
);

const SocialCircle = ({ item }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={item.icon} size={18} color={C.navy} />
    </div>
    <span style={{ fontSize: 12, color: C.body }}>{item.label}</span>
  </div>
);

const ShareBtn = ({ item }) => (
  <button style={{
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px",
    borderRadius: 10, border: item.solid ? "none" : `1px solid ${C.border}`,
    background: item.solid ? C.accent : "#fff", color: item.solid ? "#fff" : C.navy,
    fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: C.sans,
  }}>
    <Icon name={item.icon} size={16} /> {item.label}
  </button>
);

/* ── floating call-to-action bar (shared, both breakpoints) ──── */
const FloatingBar = () => (
  <div style={{ position: "fixed", left: 0, right: 0, bottom: 18, display: "flex", justifyContent: "center", gap: 10, zIndex: 40, padding: "0 16px" }}>
    <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", borderRadius: 999, padding: 5, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 999, border: "none", background: C.accent, color: "#fff", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: C.sans, whiteSpace: "nowrap" }}>
        <Icon name="phone" size={13} /> Call Now
      </button>
      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 999, border: "none", background: C.iconBg, color: C.navy, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: C.sans, whiteSpace: "nowrap" }}>
        <Icon name="mail" size={13} /> Email
      </button>
      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 999, border: "none", background: C.iconBg, color: C.navy, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: C.sans, whiteSpace: "nowrap" }}>
        <Icon name="whatsapp" size={13} /> WhatsApp
      </button>
    </div>
    <button style={{ width: 44, height: 44, borderRadius: 14, border: "none", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", flexShrink: 0 }}>
      <Icon name="arrowUp" size={18} color="#fff" />
    </button>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   HERO — identical structure on mobile & desktop
   ══════════════════════════════════════════════════════════════ */
const Hero = () => (
  <div>
    <div style={{ height: 250, background: `url(${IMG.banner}) center/cover no-repeat` }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px 28px", marginTop: -65 }}>
      <img src={IMG.profile} alt={`${PROFILE.first} ${PROFILE.last}`} style={{ width: 130, height: 130, borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", display: "block" }} />
      <div style={{ width: 34, height: 2, background: C.accentBright, margin: "16px 0 10px" }} />
      <h1 style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 26, color: C.navy, margin: "0 0 8px", textAlign: "center" }}>
        {PROFILE.first} <em style={{ fontStyle: "italic" }}>{PROFILE.last}</em>
      </h1>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: C.body, textAlign: "center" }}>{PROFILE.titleLine}</div>
      <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.06em", color: C.body, textAlign: "center", marginTop: 3 }}>{PROFILE.company}</div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   GALLERY — large image carousel + thumbnail strip
   ══════════════════════════════════════════════════════════════ */
const GalleryCarousel = () => {
  const [idx, setIdx] = useState(0);
  const n = IMG.gallery.length;
  return (
    <div>
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", aspectRatio: "16/10" }}>
        <img src={IMG.gallery[idx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <button onClick={() => setIdx((idx - 1 + n) % n)} style={{
          position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%",
          border: "none", background: "rgba(0,0,0,0.35)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}><Icon name="chevronLeft" size={18} color="#fff" /></button>
        <button onClick={() => setIdx((idx + 1) % n)} style={{
          position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%",
          border: "none", background: "rgba(0,0,0,0.35)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}><Icon name="chevronRight" size={18} color="#fff" /></button>
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", padding: "4px 12px",
          borderRadius: 999, background: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, color: C.navy,
        }}>{idx + 1} / {n}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto" }}>
        {IMG.gallery.map((src, i) => (
          <img key={i} src={src} alt="" onClick={() => setIdx(i)} style={{
            width: 56, height: 56, borderRadius: 8, objectFit: "cover", flexShrink: 0, cursor: "pointer",
            border: i === idx ? `2px solid ${C.accent}` : "2px solid transparent", opacity: i === idx ? 1 : 0.75,
          }} />
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CONTENT SECTIONS — shared between mobile & desktop
   ══════════════════════════════════════════════════════════════ */
const ContentSections = ({ desktop }) => {
  const [slotsOpen, setSlotsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const wrap = { maxWidth: 486, margin: "0 auto", padding: "0 20px" };
  const mapQuery = encodeURIComponent("Port Louis, Mauritius");

  return (
    <div style={{ background: C.bgLight }}>
      {/* ABOUT (no heading — paragraphs directly under hero) */}
      <div style={{ padding: "0 0 32px" }}>
        <div style={wrap}>
          <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 24 }} />
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i} style={{ fontSize: 13.5, lineHeight: 1.75, color: C.body, textAlign: "center", margin: i === 0 ? "0 0 16px" : "0 0 24px" }}>{p}</p>
          ))}
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <InfoRow icon="mail" label="EMAIL" value={PROFILE.email} />
            <div style={{ borderTop: `1px solid ${C.border}` }} />
            <InfoRow icon="phone" label="PHONE" value={PROFILE.phone} />
            <div style={{ borderTop: `1px solid ${C.border}` }} />
            <InfoRow icon="whatsapp" label="WHATSAPP" value={PROFILE.whatsapp} />
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ background: C.bgAlt, padding: "32px 0" }}>
        <div style={wrap}>
          <Label>OUR SERVICES</Label>
          <div style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(2,1fr)" : "1fr", gap: 16 }}>
            {SERVICES.map((s) => <ServiceCard key={s.title} item={s} />)}
          </div>
        </div>
      </div>

      {/* BUSINESS HOURS */}
      <div style={{ padding: "32px 0" }}>
        <div style={wrap}>
          <Label>BUSINESS HOURS</Label>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: "8px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 20 }}>
              {HOURS.map((row) => (
                <div key={row.d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: row.closed ? "#B0AB96" : C.navy }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.closed ? "#D8DBE3" : C.accentBright }} />
                    {row.d}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: row.closed ? "#B0AB96" : C.navy, textTransform: row.closed ? "uppercase" : "none" }}>{row.h}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: C.body, marginTop: 16 }}>
            All times in <span style={{ color: C.accent }}>Mauritius Standard Time (MST)</span>
          </p>
        </div>
      </div>

      {/* TESTIMONIALS — single column on every breakpoint */}
      <div style={{ background: C.bgAlt, padding: "32px 0" }}>
        <div style={wrap}>
          <Label>TESTIMONIALS</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </div>

      {/* BOOKING */}
      <div style={{ padding: "32px 0" }}>
        <div style={wrap}>
          <Label>REQUEST AN APPOINTMENT</Label>
          <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 20px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
              <FormField label="FULL NAME" required placeholder="John Doe" full />
              <FormField label="EMAIL" required placeholder="john@example.com" type="email" full />
            </div>
            <div style={{ marginBottom: 16 }}>
              <FormField label="PHONE NUMBER" placeholder="+230 1234 5678" full />
            </div>
            <div style={{ marginBottom: 16 }}>
              <FormField label="PREFERRED DATE" required placeholder="yyyy/mm/dd" type="date" full />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: C.navy, marginBottom: 8 }}>
                SELECT TIME <span style={{ color: C.accent }}>*</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(slotsOpen ? TIME_SLOTS : TIME_SLOTS.slice(0, 3)).map((slot) => {
                  const active = slot === selectedSlot;
                  return (
                    <div key={slot} onClick={() => setSelectedSlot(slot)} style={{
                      padding: "9px 14px", borderRadius: 9, cursor: "pointer",
                      border: `1px solid ${active ? C.accent : C.border}`,
                      background: active ? C.accent : C.bgAlt,
                      fontSize: 12.5, fontWeight: 600, color: active ? "#fff" : C.navy,
                    }}>{slot}</div>
                  );
                })}
              </div>
              {!slotsOpen && (
                <button onClick={() => setSlotsOpen(true)} style={{ marginTop: 8, background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.accent, display: "flex", alignItems: "center", gap: 4 }}>
                  ⌄ 3 more times
                </button>
              )}
            </div>
            <div style={{ marginBottom: 6 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: C.navy, marginBottom: 6 }}>MESSAGE (OPTIONAL)</label>
              <textarea readOnly placeholder="Tell us about your requirements..." rows={3} style={{
                width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10,
                border: `1px solid ${C.border}`, fontSize: 13.5, fontFamily: C.sans, color: C.navy, resize: "none",
              }} />
              <div style={{ textAlign: "right", fontSize: 11, color: C.body, marginTop: 4 }}>Max 500 characters</div>
            </div>
            <button style={{
              width: "100%", marginTop: 8, padding: "14px", borderRadius: 10, border: "none",
              background: C.accent, color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: C.sans,
            }}>
              <Icon name="calendar" size={16} /> Request Appointment
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY — carousel */}
      <div style={{ background: C.bgAlt, padding: "32px 0" }}>
        <div style={wrap}>
          <Label>GALLERY</Label>
          <GalleryCarousel />
        </div>
      </div>

      {/* LOCATION */}
      <div style={{ padding: "32px 0" }}>
        <div style={wrap}>
          <Label>LOCATION</Label>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px" }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: C.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="mapPin" size={15} color={C.navy} />
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: C.navy }}>Port Louis, Mauritius</span>
            </div>
            <div style={{ aspectRatio: "4/3" }}>
              <iframe
                title="map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL */}
      <div style={{ background: C.bgAlt, padding: "32px 0" }}>
        <div style={wrap}>
          <Label>SOCIAL</Label>
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {SOCIAL.map((s) => <SocialCircle key={s.label} item={s} />)}
          </div>
        </div>
      </div>

      {/* SHARE & CONNECT */}
      <div style={{ padding: "32px 0" }}>
        <div style={wrap}>
          <Label>SHARE &amp; CONNECT</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {SHARE_ITEMS.map((it) => <ShareBtn key={it.label} item={it} />)}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: C.bgAlt, padding: "36px 0 110px", textAlign: "center" }}>
        <div style={wrap}>
          <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 17, color: C.navy }}>SERITI Solutions</div>
          <div style={{ fontSize: 13, color: C.body, marginTop: 4 }}>{PROFILE.phone}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16 }}>
            {["phone", "mail", "whatsapp"].map((ic) => (
              <div key={ic} style={{ width: 34, height: 34, borderRadius: 10, background: C.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={ic} size={15} color={C.navy} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MOBILE / DESKTOP CARD — same structure, column width differs
   ══════════════════════════════════════════════════════════════ */
function CardBody({ desktop }) {
  return (
    <div style={{ fontFamily: C.sans, position: "relative", background: C.bgLight }}>
      <Hero />
      <ContentSections desktop={desktop} />
      <FloatingBar />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PREVIEW WRAPPER — toggle Mobile / Desktop
   ══════════════════════════════════════════════════════════════ */
export default function SeritiCoolCard() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: "#0E1117", minHeight: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "16px 16px 0", position: "sticky", top: 0, background: "#0E1117", zIndex: 50 }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 28px", fontSize: 13, fontWeight: 600, textTransform: "capitalize",
              borderRadius: 8, border: `1px solid ${mode === m ? C.accent : "#2A3040"}`,
              background: mode === m ? C.accent : "#161B22", color: mode === m ? "#fff" : "#8B95A5",
              cursor: "pointer", transition: "all .15s",
            }}
          >
            {m === "mobile" ? "📱 Mobile" : "🖥 Desktop"}
          </button>
        ))}
      </div>

      <div style={{ padding: mode === "desktop" ? "24px 16px 40px" : "24px 0 40px" }}>
        {mode === "mobile" ? (
          <div style={{ maxWidth: 420, margin: "0 auto", borderRadius: 20, border: "2px solid #2A3040", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.5)" }}>
            <CardBody desktop={false} />
          </div>
        ) : (
          <div style={{ maxWidth: 900, margin: "0 auto", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.35)" }}>
            <CardBody desktop={true} />
          </div>
        )}
      </div>
    </div>
  );
}
