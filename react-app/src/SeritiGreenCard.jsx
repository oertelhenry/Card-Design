import { useState } from "react";

/* ══════════════════════════════════════════════════════════════
   SERITI SOLUTIONS — "Green" Digital Business Card
   Recreated from CardDesigns/NewCard1 screen recordings
   (GreenMobile.mp4, GreenDesktop.mp4, GreenHeroSection.mp4)

   Fonts: Playfair Display (serif headings) + system sans (body)
   Palette: deep forest-green hero banner, ivory/putty sections,
            brick-red accent, dark navy headings
   ══════════════════════════════════════════════════════════════ */

const IMG = {
  banner: "/seriti-green/Banner.jpg",
  profile: "/seriti-green/Profile.jpg",
  gallery: [
    "/seriti-green/Gallery1.jpg",
    "/seriti-green/Gallery2.jpg",
    "/seriti-green/Gallery3.jpg",
    "/seriti-green/Gallery4.jpg",
    "/seriti-green/Gallery5.jpg",
    "/seriti-green/Gallery6.jpg",
  ],
  testimonials: [
    "/seriti-green/Gallery1.jpg",
    "/seriti-green/Services1.jpg",
    "/seriti-green/Services3.jpg",
  ],
};

const PROFILE = {
  name: "Ashleigh Exley",
  title: "National Manager",
  region: "(Mauritius)",
  company: "SERITI SOLUTIONS",
  email: "ashleigh@seritisolutions.com",
  phone: "+230 5977 8738",
  whatsapp: "+23059778738",
};

const ABOUT = {
  paragraphs: [
    "Seriti is a totally independent solutions-driven company which differentiates itself through its unique solutions and industry expertise. We deliver technology solutions to a host of sectors providing immediate results.",
    "Grounded by our intellectual property and knowledge from management and employees, the solutions are intelligent in an ever-changing landscape of financial services. We are the out the box thinkers and our pioneering approach keeps us ahead of the curve.",
  ],
  stats: [
    { n: "18+", l: "Years Experience" },
    { n: "500+", l: "Clients Served" },
    { n: "7", l: "Core Services" },
  ],
};

const SERVICES = [
  { icon: "clock", title: "Fully Integrated System", body: "Seriti system: Performance Measurement, Compliance, Efficiency, Integration. Tracks performance, ensures compliance, automates tasks, integrates seamlessly across your operations." },
  { icon: "smartphone", title: "Interactive Digital Business Cards", body: "Go green with digital business cards. Share contact info digitally, boost online presence, minimize waste. Collect leads effortlessly with fillable forms." },
  { icon: "shield", title: "Value Added Products", body: "We offer a range of products to our customers in the form of Vehicle Warranties, Vehicle Body Maintenance, Tyre and Rim protection and insurance leads." },
  { icon: "briefcase", title: "Professional Consulting Services", body: "Consulting for finance, insurance, and asset dealers. Specializing in ops efficiency, project management, data analytics. Customized solutions for success." },
  { icon: "car", title: "Dealer Management System", body: "Streamlines processes, reduces reworks and enhances back office efficiencies. Empowers marketing strategies with robust Data Analytics. Elevates customer experience." },
  { icon: "card", title: "Hosted Finance Application", body: "Branded embedded finance app enables customers and Dealer Partners to capture and submit applications electronically. Streamlines vetting and cross-selling." },
  { icon: "image", title: "360 Virtual Tours", body: "Revolutionize product showcasing with immersive 360° views, high-resolution imagery, and personalized highlights. Engage customers like never before." },
];

const HOURS = [
  { d: "Monday", h: "9am – 5pm" },
  { d: "Tuesday", h: "9am – 5pm" },
  { d: "Wednesday", h: "9am – 5pm" },
  { d: "Thursday", h: "9am – 5pm" },
  { d: "Friday", h: "9am – 5pm" },
  { d: "Saturday", h: "Closed", closed: true },
  { d: "Sunday", h: "Closed", closed: true },
];

const TESTIMONIALS = [
  {
    img: IMG.testimonials[0],
    quote: "Seriti has impacted our business for the positive since moving platforms a few years ago. The system is stable and reliable, with great technical support. Our Business Managers profit margins keep on improving due to the reports that are available. Every aspect of back-end can be viewed based on the various reports that are available on a group, dealer, department and individual level. I make extensive use of the system to drive KPI's which result in better productivity and increased profit margins. Compliance levels have increased and the use of paper has been reduced.",
    name: "Hatfield Motor Group",
  },
  {
    img: IMG.testimonials[1],
    quote: "Seriti are clear leaders in their industry, understanding our business inside out which makes a significant difference in the way we operate. With Seriti our dealerships seen an increase in our second gross and a significant increase in the sale of our value added products. Seriti constantly enhance and upgrade their system which ensures we have a relevant and user friendly system. Reporting, data management and compliance is easy and user friendly. The cost of Seriti is low and definitely worth the investment. For the Seriti system and Team nothing is impossible, they make it possible!",
    name: "ECM Group",
  },
  {
    img: IMG.testimonials[2],
    quote: "Today, 2nd Gross revenue is becoming increasingly important for a car dealership, for many dealerships, efficient F&I management also offers untapped potential to increase revenue and profitability. Partnering with Seriti Solutions has assisted us in evaluating our F&I performance in depth and aided us on the correct path to increase our revenue. A tangible and measurable benefit of utilising Seriti. If you're looking for an increase in productivity and more importantly you profit margins, then you could genuinely benefit from Seriti.",
    name: "Eagle Ford",
  },
];

const TIME_SLOTS = ["9am – 10am", "10am – 11am", "11am – 12pm", "12pm – 1pm", "2pm – 3pm", "3pm – 4pm"];

const SHARE_ITEMS = [
  { icon: "download", label: "Save Card" },
  { icon: "share2", label: "Share Card" },
  { icon: "userCheck", label: "Contact" },
  { icon: "home", label: "Add to Home" },
];

const SOCIAL = [
  { icon: "globe", label: "Website" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "facebook", label: "Facebook" },
];

/* ── palette ────────────────────────────────────────────────── */
const C = {
  bgLight: "#FBF9F5",
  bgAlt: "#F1EEE4",
  cardBg: "#F3F1E9",
  cardWhite: "#FDFCF9",
  border: "#E7E1D3",
  navy: "#1C2440",
  body: "#4C5878",
  accent: "#9C2B2B",
  green: "#2E5233",
  greenDeep: "#20391F",
  iconBg: "#FADCD5",
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
    case "check": return <svg {...p}><path d="M20 6L9 17l-5-5" /></svg>;
    case "star": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>;
    case "arrowRight": return <svg {...p} strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "arrowUp": return <svg {...p} strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M16 2.5v4M8 2.5v4M3 9.5h18" /></svg>;
    case "mapPin": return <svg {...p}><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "externalLink": return <svg {...p}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6M10 14L21 3" /></svg>;
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
    case "quote": return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h1c0 3-1 4-3 4z" /></svg>;
    default: return null;
  }
};

/* ── shared bits ────────────────────────────────────────────── */
const Stars = ({ n = 5, size = 12 }) => (
  <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
    {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={size} color={i < n ? C.accent : "#E4DED0"} />)}
    <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginLeft: 4 }}>{n}/5</span>
  </div>
);

const Label = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: C.accent, textAlign: "center", marginBottom: 8 }}>{children}</div>
);

const Heading = ({ children, size = 26 }) => (
  <div style={{ textAlign: "center", marginBottom: 6 }}>
    <h2 style={{ fontFamily: C.serif, fontWeight: 700, fontSize: size, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>{children}</h2>
    <div style={{ width: 46, height: 2.5, background: C.accent, margin: "12px auto 0" }} />
  </div>
);

const PillBtn = ({ icon, label, variant, size }) => {
  const solid = variant === "solid";
  const compact = size === "sm";
  return (
    <button style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
      padding: compact ? "9px 14px" : "11px 18px",
      borderRadius: 999, border: solid ? "none" : "1px solid rgba(255,255,255,0.28)",
      background: solid ? C.accent : "rgba(255,255,255,0.1)",
      color: "#fff", fontSize: compact ? 12.5 : 13.5, fontWeight: 600,
      cursor: "pointer", fontFamily: C.sans, whiteSpace: "nowrap",
      backdropFilter: solid ? "none" : "blur(6px)",
    }}>
      <Icon name={icon} size={14} /> <span>{label}</span>
    </button>
  );
};

const ServiceCard = ({ item }) => (
  <div className="svc-card" style={{
    background: C.cardWhite, border: `1px solid ${C.border}`, borderRadius: 16,
    padding: "22px 22px 20px",
  }}>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: C.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <Icon name={item.icon} size={21} color={C.accent} />
    </div>
    <h3 style={{ fontFamily: C.serif, fontSize: 17, fontWeight: 700, color: C.navy, margin: "0 0 8px" }}>{item.title}</h3>
    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.body, margin: "0 0 14px" }}>{item.body}</p>
    <a className="read-more" href="#" onClick={(e) => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: C.accent, textDecoration: "none" }}>
      Read More <Icon name="arrowRight" size={13} />
    </a>
  </div>
);

const TestimonialCard = ({ t }) => (
  <div style={{ background: C.cardWhite, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
    <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
      <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
    <div style={{ padding: "18px 20px 20px" }}>
      <Stars />
      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: C.body, margin: "12px 0 16px" }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.navy }}>{t.name}</div>
        <div style={{ fontSize: 12, color: C.body }}>Verified Partner</div>
      </div>
    </div>
  </div>
);

const ShareCard = ({ item }) => (
  <div style={{ background: C.cardWhite, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}>
    <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.bgAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={item.icon} size={18} color={C.navy} />
    </div>
    <span style={{ fontSize: 12.5, fontWeight: 600, color: C.navy }}>{item.label}</span>
  </div>
);

const SocialCircle = ({ item, size = 46 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={item.icon} size={size * 0.4} color={C.navy} />
    </div>
    <span style={{ fontSize: 12, color: C.body }}>{item.label}</span>
  </div>
);

const FormField = ({ label, required, placeholder, type = "text", full }) => (
  <div style={{ flex: full ? "1 1 100%" : "1 1 220px" }}>
    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: C.navy, marginBottom: 6 }}>
      {label} {required && <span style={{ color: C.accent }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} readOnly style={{
      width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10,
      border: `1px solid ${C.border}`, fontSize: 13.5, fontFamily: C.sans, color: C.navy, background: "#fff",
    }} />
  </div>
);

/* ══════════════════════════════════════════════════════════════
   HERO — mobile (stacked) & desktop (side-by-side)
   ══════════════════════════════════════════════════════════════ */
const Hero = ({ desktop }) => {
  const photo = (
    <div style={{ position: "relative", width: desktop ? 168 : 140, height: desktop ? 192 : 172, flexShrink: 0 }}>
      <img src={IMG.profile} alt={PROFILE.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18, display: "block" }} />
      <div style={{
        position: "absolute", bottom: -8, right: -8, width: 30, height: 30, borderRadius: "50%",
        background: C.accent, border: "3px solid rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name="check" size={14} color="#fff" sw={2.5} />
      </div>
    </div>
  );

  const info = (
    <div style={{ textAlign: desktop ? "left" : "center" }}>
      <h1 style={{ fontFamily: C.serif, fontWeight: 700, fontSize: desktop ? 34 : 25, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" }}>{PROFILE.name}</h1>
      <p style={{ fontSize: desktop ? 15.5 : 14, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>
        {PROFILE.title} <span style={{ color: "#E8877E" }}>{PROFILE.region}</span>
      </p>
      <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)", margin: "0 0 16px" }}>
        <span style={{ color: C.accent }}>● </span>{PROFILE.company}
      </p>
      <div style={{ display: "flex", gap: 9, justifyContent: desktop ? "flex-start" : "center", flexWrap: "wrap" }}>
        <PillBtn icon="mail" label="Email" size="sm" />
        <PillBtn icon="phone" label="Call" size="sm" />
        <PillBtn icon="whatsapp" label="WhatsApp" size="sm" variant="solid" />
      </div>
    </div>
  );

  return (
    <div style={{
      position: "relative", background: `url(${IMG.banner}) center/cover no-repeat`,
      padding: desktop ? "56px 60px" : "32px 20px 26px",
      display: "flex", justifyContent: "center",
    }}>
      {desktop ? (
        <div style={{ display: "flex", alignItems: "center", gap: 32, maxWidth: 1200, width: "100%" }}>
          {photo}{info}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          {photo}{info}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CONTENT SECTIONS — shared between mobile & desktop
   ══════════════════════════════════════════════════════════════ */
const ContentSections = ({ desktop }) => {
  const [slotsOpen, setSlotsOpen] = useState(false);
  const wrap = { maxWidth: desktop ? 1200 : 420, margin: "0 auto", padding: desktop ? "0 40px" : "0 20px" };
  const sectionPad = desktop ? "72px 0" : "44px 0";

  return (
    <>
      {/* ABOUT */}
      <div style={{ background: C.bgLight, padding: sectionPad }}>
        <div style={wrap}>
          <Label>ABOUT</Label>
          <Heading size={desktop ? 32 : 24}>Who We Are</Heading>
          <div style={{
            marginTop: 28, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 20,
            padding: desktop ? "36px 44px" : "24px 22px", maxWidth: desktop ? 900 : "none", marginLeft: "auto", marginRight: "auto",
          }}>
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 13.75, lineHeight: 1.75, color: C.body, margin: i === 0 ? "0 0 16px" : 0 }}>{p}</p>
            ))}
            <div style={{ borderTop: `1px solid ${C.border}`, margin: "22px 0 20px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", textAlign: "center", gap: 10 }}>
              {ABOUT.stats.map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: C.serif, fontSize: desktop ? 26 : 20, fontWeight: 700, color: C.accent }}>{s.n}</div>
                  <div style={{ fontSize: 11.5, color: C.body, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ background: C.bgAlt, padding: sectionPad }}>
        <div style={wrap}>
          <Label>WHAT WE OFFER</Label>
          <Heading size={desktop ? 32 : 24}>Our Services</Heading>
          <p style={{ textAlign: "center", fontSize: 13.5, color: C.body, maxWidth: 560, margin: "14px auto 0" }}>
            Comprehensive technology solutions tailored for the financial services and automotive industries.
          </p>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: desktop ? "repeat(3,1fr)" : "1fr", gap: desktop ? 20 : 16 }}>
            {SERVICES.map((s) => <ServiceCard key={s.title} item={s} />)}
          </div>
        </div>
      </div>

      {/* BUSINESS HOURS */}
      <div style={{ background: C.bgLight, padding: sectionPad }}>
        <div style={wrap}>
          <Label>SCHEDULE</Label>
          <Heading size={desktop ? 32 : 24}>Business Hours</Heading>
          <div style={{ marginTop: 28, maxWidth: 500, margin: "28px auto 0", background: C.cardWhite, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            {HOURS.map((row, i) => (
              <div key={row.d} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px",
                background: row.closed ? C.bgAlt : "transparent",
                borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: row.closed ? "#9A957F" : C.navy }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.closed ? "#C9C2AC" : "#8A6A45" }} />
                  {row.d}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: row.closed ? "#B0AB96" : C.navy }}>{row.h}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: C.body, marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name="clock" size={13} color={C.accent} /> All times are in Mauritius Standard Time (MST)
          </p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: C.bgAlt, padding: sectionPad }}>
        <div style={wrap}>
          <Label>TESTIMONIALS</Label>
          <Heading size={desktop ? 32 : 24}>Client Reviews</Heading>
          <p style={{ textAlign: "center", fontSize: 13.5, color: C.body, maxWidth: 560, margin: "14px auto 0" }}>
            Hear from our valued partners about their experience working with SERITI Solutions.
          </p>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: desktop ? "repeat(3,1fr)" : "1fr", gap: desktop ? 20 : 18 }}>
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </div>

      {/* BOOKING */}
      <div style={{ background: C.bgLight, padding: sectionPad }}>
        <div style={wrap}>
          <Label>BOOK A MEETING</Label>
          <Heading size={desktop ? 32 : 24}>Request an Appointment</Heading>
          <div style={{
            marginTop: 28, maxWidth: 640, margin: "28px auto 0", background: "#fff", border: `1px solid ${C.border}`,
            borderRadius: 18, padding: desktop ? "32px 36px" : "22px 20px",
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
              <FormField label="Full Name" required placeholder="John Doe" full={!desktop} />
              <FormField label="Email" required placeholder="john@example.com" type="email" full={!desktop} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <FormField label="Phone Number" placeholder="+230 1234 5678" full />
            </div>
            <div style={{ marginBottom: 16 }}>
              <FormField label="Preferred Date" required placeholder="yyyy/mm/dd" type="date" full />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
                Select Time Slot <span style={{ color: C.accent }}>*</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(slotsOpen ? TIME_SLOTS : TIME_SLOTS.slice(0, 3)).map((slot) => (
                  <div key={slot} style={{ padding: "9px 14px", borderRadius: 9, border: `1px solid ${C.border}`, background: C.bgAlt, fontSize: 12.5, fontWeight: 600, color: C.navy }}>{slot}</div>
                ))}
              </div>
              {!slotsOpen && (
                <button onClick={() => setSlotsOpen(true)} style={{ marginTop: 8, background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.accent, display: "flex", alignItems: "center", gap: 4 }}>
                  ⌄ 3 more times
                </button>
              )}
            </div>
            <div style={{ marginBottom: 6 }}>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Message (Optional)</label>
              <textarea readOnly placeholder="Tell us about your requirements..." rows={3} style={{
                width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10,
                border: `1px solid ${C.border}`, fontSize: 13.5, fontFamily: C.sans, color: C.navy, resize: "none",
              }} />
              <div style={{ textAlign: "right", fontSize: 11, color: C.body, marginTop: 4 }}>Max 500 characters</div>
            </div>
            <button style={{
              width: "100%", marginTop: 8, padding: "14px", borderRadius: 999, border: "none",
              background: C.green, color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: C.sans,
            }}>
              <Icon name="calendar" size={16} /> Request Appointment
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div style={{ background: C.bgAlt, padding: sectionPad }}>
        <div style={wrap}>
          <Label>PORTFOLIO</Label>
          <Heading size={desktop ? 32 : 24}>Gallery</Heading>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: desktop ? "repeat(3,1fr)" : "repeat(2,1fr)", gap: desktop ? 16 : 10 }}>
            {IMG.gallery.map((src, i) => (
              <div key={i} style={{ aspectRatio: "1/1", borderRadius: 12, overflow: "hidden" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIND US */}
      <div style={{ background: C.bgLight, padding: sectionPad }}>
        <div style={wrap}>
          <Label>VISIT US</Label>
          <Heading size={desktop ? 32 : 24}>Find Us</Heading>
          <div style={{ marginTop: 28, maxWidth: 900, margin: "28px auto 0", border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", background: C.cardBg }}>
              <Icon name="mapPin" size={16} color={C.accent} />
              <span style={{ fontSize: 13.5, fontWeight: 600, color: C.navy }}>Port Louis, Mauritius</span>
            </div>
            <div style={{
              position: "relative", aspectRatio: desktop ? "16/6" : "4/3",
              background: "linear-gradient(135deg,#BFE0DB 0%,#D8E9C8 55%,#C9E0B8 100%)",
            }}>
              <button style={{
                position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 6,
                padding: "8px 12px", borderRadius: 8, border: "none", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontSize: 12.5, fontWeight: 700, color: C.navy, cursor: "pointer",
              }}>
                Open in Maps <Icon name="externalLink" size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL + CONTACT */}
      <div style={{ background: C.bgAlt, padding: sectionPad }}>
        <div style={wrap}>
          <Label>CONNECT</Label>
          <Heading size={desktop ? 32 : 24}>Social</Heading>
          <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: desktop ? 40 : 28 }}>
            {SOCIAL.map((s) => <SocialCircle key={s.label} item={s} />)}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, margin: "28px 0 22px" }} />
          <div style={{ display: "flex", flexDirection: desktop ? "row" : "column", justifyContent: "center", alignItems: "center", gap: desktop ? 32 : 14 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.navy }}><Icon name="mail" size={14} color={C.navy} /> {PROFILE.email}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.navy }}><Icon name="phone" size={14} color={C.navy} /> {PROFILE.phone}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.navy }}><Icon name="whatsapp" size={14} color={C.navy} /> {PROFILE.whatsapp}</span>
          </div>
        </div>
      </div>

      {/* SHARE & CONNECT */}
      <div style={{ background: C.bgLight, padding: sectionPad }}>
        <div style={wrap}>
          <Label>SHARE</Label>
          <Heading size={desktop ? 32 : 24}>Share &amp; Connect</Heading>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: desktop ? "repeat(4,1fr)" : "repeat(2,1fr)", gap: 14 }}>
            {SHARE_ITEMS.map((it) => <ShareCard key={it.label} item={it} />)}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: C.bgAlt, padding: desktop ? "40px 0" : "32px 0 90px" }}>
        <div style={wrap}>
          <div style={{ display: "flex", flexDirection: desktop ? "row" : "column", justifyContent: "space-between", alignItems: desktop ? "center" : "flex-start", gap: 16 }}>
            <div>
              <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 16, color: C.navy }}>SERITI Solutions</div>
              <div style={{ fontSize: 12, color: C.accent, marginTop: 2 }}>Innovative Technology Solutions for Financial Services</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL.map((s) => (
                <div key={s.label} style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={s.icon} size={13} color={C.navy} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 20, paddingTop: 16, textAlign: "center" }}>
            <span style={{ fontSize: 12, color: C.body }}>© 2026 <span style={{ color: C.accent }}>SERITI</span> Solutions. All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   MOBILE CARD
   ══════════════════════════════════════════════════════════════ */
function MobileCard() {
  return (
    <div style={{ fontFamily: C.sans, position: "relative", background: C.bgLight }}>
      <Hero desktop={false} />
      <ContentSections desktop={false} />

      {/* floating scroll-to-top */}
      <button style={{
        position: "fixed", bottom: 78, right: 18, width: 44, height: 44, borderRadius: "50%",
        background: C.green, border: "none", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.25)", zIndex: 20,
      }}>
        <Icon name="arrowUp" size={18} color="#fff" />
      </button>

      {/* bottom nav bar */}
      <div style={{
        position: "sticky", bottom: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        background: "#fff", borderTop: `1px solid ${C.border}`, padding: "10px 0 12px", zIndex: 15,
      }}>
        {[["phone", "Call"], ["mail", "Email"], ["whatsapp", "WhatsApp"], ["calendar", "Book"]].map(([ic, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Icon name={ic} size={17} color={C.navy} />
            <span style={{ fontSize: 10.5, color: C.navy, fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DESKTOP CARD
   ══════════════════════════════════════════════════════════════ */
function DesktopCard() {
  return (
    <div style={{ fontFamily: C.sans, position: "relative", background: C.bgLight }}>
      <Hero desktop={true} />
      <ContentSections desktop={true} />

      <button style={{
        position: "fixed", bottom: 28, right: 28, width: 48, height: 48, borderRadius: "50%",
        background: C.green, border: "none", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.25)", zIndex: 20,
      }}>
        <Icon name="arrowUp" size={19} color="#fff" />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PREVIEW WRAPPER — toggle Mobile / Desktop
   ══════════════════════════════════════════════════════════════ */
export default function SeritiGreenCard() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: "#0E1117", minHeight: "100%" }}>
      <style>{`
        .svc-card { transition: border-color .15s, box-shadow .15s; }
        .svc-card:hover { border-color: ${C.accent}; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .read-more:hover svg { transform: translateX(3px); }
        .read-more svg { transition: transform .15s; }
      `}</style>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "16px 16px 0", position: "sticky", top: 0, background: "#0E1117", zIndex: 30 }}>
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
            <MobileCard />
          </div>
        ) : (
          <div style={{ maxWidth: 1400, margin: "0 auto", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.35)" }}>
            <DesktopCard />
          </div>
        )}
      </div>
    </div>
  );
}
