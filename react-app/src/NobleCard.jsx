import { useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   SERITI — "Noble" Digital Business Card
   Recreated from CardDesigns/Noble
   (Nobledesktop.mp4 / Noblemobile.mp4)

   Aesthetic: refined classic — light lavender-grey page, deep
   navy world-map hero, high-contrast serif headings (Cormorant),
   sage-green accents. Single centred column; services and
   testimonials go 2-col on wider screens.
   ══════════════════════════════════════════════════════════════ */

const IMG = {
  banner: "/noble/banner.jpg",
  profile: "/noble/profile.jpg",
  gallery: ["/noble/gal1.jpg", "/noble/gal2.jpg", "/noble/gal3.jpg", "/noble/gal4.jpg"],
};

const PROFILE = {
  name: "Gareth Hiepner",
  title: "Managing Director Mauritius and Kenya",
  company: "Seriti Mauritius",
  email: "garethh@seritisolutions.com",
  whatsapp: "+1111111111111",
  phone: "+1111111111111",
};

const ABOUT = [
  "Seriti is a totally independent solutions-driven company which differentiates itself through its unique solutions and industry expertise. We deliver technology solutions to a host of sectors providing immediate results.",
  "Grounded by our intellectual property and knowledge from management and employees, the solutions are intelligent in an ever-changing landscape of financial services. We are the out the box thinkers and our pioneering approach keeps us ahead of the curve.",
];

const HOURS = [
  { d: "Mon", h: "8am – 5pm", open: true },
  { d: "Tue", h: "8am – 5pm", open: true },
  { d: "Wed", h: "8am – 5pm", open: true },
  { d: "Thu", h: "8am – 5pm", open: true },
  { d: "Fri", h: "8am – 5pm", open: true },
  { d: "Sat", h: "Closed", open: false },
  { d: "Sun", h: "Closed", open: false },
];

const TIME_SLOTS = ["9am – 10am", "11am – 12pm", "1pm – 2pm", "2pm – 3pm", "3pm – 4pm", "4pm – 5pm"];

const SERVICES = [
  { title: "Value Added Products", body: "We offer a range of Products to our customers in the form of Vehicle Warranties, Vehicle Body Maintenance, Tyre and Rim ..." },
  { title: "Professional Consulting Services", body: "Consulting for finance, insurance, & asset dealers. Specializing in ops efficiency, project management, data analytics. ..." },
  { title: "Dealer Management System", body: "Streamlines processes, reduces reworks and Enhances back office efficiencies. Empowers marketing strategies with robust ..." },
  { title: "Hosted Finance Application", body: "Branded embedded finance app: Enables customers/Dealer Partners to capture & submit applications electronically. Streaml..." },
  { title: "360 Virtual Tours", body: "Introducing Personalyz Virtual Tours – revolutionize product showcasing! Engage customers with immersive 360° views, hig..." },
];

const TESTIMONIALS = [
  {
    name: "Hatfield Motor Group",
    quote: "Seriti a eu un impact positif sur notre entreprise depuis que nous avons changé de plateforme il y a quelques années. Le système est stable et fiable, avec un excellent support technique. Les marges bénéficiaires continuent de s'améliorer grâce aux rapports disponibles. Chaque aspect du back-end peut être visualisé sur la base des différents rapports disponibles au niveau du groupe, du concessionnaire, du département et de l'individu. J'utilise le système pour piloter des indicateurs qui se traduisent par une meilleure productivité et des marges bénéficiaires accrues.",
  },
  {
    name: "ECM Group",
    quote: "Seriti est un leader incontesté dans son secteur, comprenant parfaitement notre activité, ce qui fait une différence significative dans notre façon de fonctionner. Grâce à Seriti, notre concession à vu son dessein créatif et convivial augmenter et la vente de nos produits à valeur ajoutée a considérablement augmenté. Seriti améliore et met à niveau en permanence son système, ce qui garantit que nous disposons d'un système efficace et convivial. Les rapports: la gestion des données et la conformité sont simples et conviviales.",
  },
  {
    name: "Eagle Ford",
    quote: "Aujourd'hui, le deuxième revenu brut devient de plus en plus important pour un concessionnaire automobile. De nombreux concessionnaires, une gestion F&I efficace offre également un potentiel inexploité d'augmentation des revenus et de la rentabilité. Le partenariat avec Seriti Solutions nous a aidés à approfondir nos performances F&I et nous a aidés à trouver la bonne voie pour augmenter nos revenus. Un avantage tangible et mesurable de Seriti est l'augmentation des revenus.",
  },
];

/* ── palette ────────────────────────────────────────────────── */
const C = {
  pageBg: "#edf0f7",
  navy: "#0c2038",
  heading: "#1c2c47",
  body: "#3f4d68",
  muted: "#8a92a6",
  hairline: "#d9dee9",
  green: "#7f9464",
  greenDark: "#6f8455",
  cardBg: "#e4e8f1",
  cardBorder: "#d5dae6",
  white: "#ffffff",
  gold: "#d9a520",
  serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  sans: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
};

/* ── icons (inline SVG) ─────────────────────────────────────── */
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "mail":
      return <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>;
    case "phone":
      return <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case "whatsapp":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>;
    case "calendar":
      return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "bookmark":
      return <svg {...p}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>;
    case "share":
      return <svg {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98m-.01-10.98-6.82 3.98" /></svg>;
    case "smartphone":
      return <svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>;
    case "globe":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></svg>;
    case "facebook":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
    case "linkedin":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>;
    case "chevL":
      return <svg {...p}><path d="m15 18-6-6 6-6" /></svg>;
    case "chevR":
      return <svg {...p}><path d="m9 18 6-6-6-6" /></svg>;
    case "arrowR":
      return <svg {...p}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>;
    case "chevD":
      return <svg {...p}><path d="m6 9 6 6 6-6" /></svg>;
    default:
      return null;
  }
};

const Star = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={C.gold}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Face = ({ mood, size = 26 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round" };
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="0.5" fill="#fff" />
      <circle cx="15" cy="10" r="0.5" fill="#fff" />
      {mood === "happy" && <path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8" />}
      {mood === "neutral" && <path d="M8.5 15h7" />}
      {mood === "unhappy" && <path d="M8.5 16c.9-1.2 2.1-1.8 3.5-1.8s2.6.6 3.5 1.8" />}
    </svg>
  );
};

/* ── shared bits ────────────────────────────────────────────── */
const SectionTitle = ({ children, size = 26 }) => (
  <h2 style={{ fontFamily: C.serif, fontWeight: 600, fontSize: size, color: C.heading, textAlign: "center", margin: "0 0 18px", letterSpacing: "0.01em" }}>
    {children}
  </h2>
);

const Hairline = () => <div style={{ height: 1, background: C.hairline, margin: "26px 0" }} />;

const GreenBtn = ({ icon, children, style = {}, onClick }) => (
  <button
    onClick={onClick}
    className="noble-green-btn"
    style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      width: "100%", padding: "12px 18px", border: "none", borderRadius: 8,
      background: C.green, color: C.white, fontFamily: C.sans, fontSize: 13.5,
      fontWeight: 600, cursor: "pointer", ...style,
    }}
  >
    {icon && <Icon name={icon} size={15} color="#fff" />}
    {children}
  </button>
);

/* ── component ──────────────────────────────────────────────── */
export default function NobleCard() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(null);
  const [moreTimes, setMoreTimes] = useState(false);
  const [rating, setRating] = useState(null);
  const galRef = useRef(null);

  const scrollGal = (dir) => {
    if (galRef.current) galRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  const visibleSlots = moreTimes ? TIME_SLOTS : TIME_SLOTS.slice(0, 3);

  const contactRows = [
    { icon: "mail", value: PROFILE.email },
    { icon: "whatsapp", value: PROFILE.whatsapp },
    { icon: "phone", value: PROFILE.phone },
  ];

  const moods = [
    { key: "unhappy", label: "Unhappy", color: "#e5484d" },
    { key: "neutral", label: "Neutral", color: "#f76b15" },
    { key: "happy", label: "Happy", color: "#2ebd59" },
  ];

  return (
    <div style={{ minHeight: "100%", background: C.pageBg, fontFamily: C.sans, display: "flex", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .noble-two-col { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 480px) { .noble-two-col { grid-template-columns: 1fr 1fr; } }
        .noble-two-col > .noble-center-last:last-child:nth-child(odd) { grid-column: 1 / -1; justify-self: center; width: 100%; }
        @media (min-width: 480px) { .noble-two-col > .noble-center-last:last-child:nth-child(odd) { max-width: 75%; } }
        .noble-green-btn:hover { background: ${C.greenDark} !important; }
        .noble-gal::-webkit-scrollbar { display: none; }
        .noble-quote::-webkit-scrollbar { width: 6px; }
        .noble-quote::-webkit-scrollbar-thumb { background: #c3c9d8; border-radius: 3px; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 560, background: C.pageBg, boxShadow: "0 0 40px rgba(20,35,60,0.08)" }}>

        {/* ── hero ── */}
        <div style={{ position: "relative", paddingBottom: 56 }}>
          <div style={{
            background: `${C.navy} url(${IMG.banner}) center/cover no-repeat`,
            paddingTop: 14, height: 210,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <span style={{ fontFamily: C.serif, fontSize: 26, fontWeight: 600, color: C.white, letterSpacing: "0.38em", marginLeft: "0.38em" }}>
                SERITI
              </span>
              <span style={{
                width: 34, height: 34, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.9)" }} />
                </span>
              </span>
            </div>
          </div>
          <img
            src={IMG.profile}
            alt={PROFILE.name}
            style={{
              position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)",
              width: 116, height: 116, borderRadius: "50%", objectFit: "cover",
              border: "4px solid #f4f6fb", boxShadow: "0 6px 18px rgba(10,25,45,0.25)",
            }}
          />
        </div>

        <div style={{ padding: "0 24px 30px" }}>

          {/* ── identity ── */}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <h1 style={{ fontFamily: C.serif, fontWeight: 600, fontSize: 34, color: C.heading, margin: 0 }}>{PROFILE.name}</h1>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.heading, marginTop: 6 }}>{PROFILE.title}</div>
            <div style={{ fontSize: 12.5, color: C.muted, marginTop: 4 }}>{PROFILE.company}</div>
          </div>

          {/* ── about ── */}
          <div style={{ marginTop: 20 }}>
            {ABOUT.map((t, i) => (
              <p key={i} style={{ fontSize: 13, lineHeight: 1.65, color: C.body, textAlign: "center", margin: i ? "14px 0 0" : 0 }}>{t}</p>
            ))}
          </div>

          <Hairline />

          {/* ── contact ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {contactRows.map((r) => (
              <div key={r.icon} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{
                  width: 40, height: 40, borderRadius: "50%", background: C.green, flexShrink: 0,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name={r.icon} size={17} color="#fff" />
                </span>
                <span style={{ fontSize: 13.5, color: C.heading }}>{r.value}</span>
              </div>
            ))}
          </div>

          <Hairline />

          {/* ── business hours ── */}
          <SectionTitle>Business Hours</SectionTitle>
          <div style={{ maxWidth: 340, margin: "0 auto" }}>
            {HOURS.map((r) => (
              <div key={r.d} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 2px", borderBottom: `1px solid ${C.hairline}`,
              }}>
                <span style={{ fontSize: 13, color: C.heading }}>{r.d}</span>
                <span style={{ fontSize: 13, color: r.open ? C.heading : C.muted, fontStyle: r.open ? "normal" : "italic" }}>{r.h}</span>
              </div>
            ))}
          </div>

          <Hairline />

          {/* ── appointment ── */}
          <div style={{ textAlign: "center" }}>
            <span style={{
              width: 44, height: 44, borderRadius: "50%", background: C.green,
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
            }}>
              <Icon name="calendar" size={19} color="#fff" />
            </span>
            <SectionTitle>Request an Appointment</SectionTitle>

            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.heading, marginBottom: 8 }}>Date</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box", padding: "12px 14px",
                border: `1px solid ${C.cardBorder}`, borderRadius: 10, background: C.white,
                fontFamily: C.sans, fontSize: 13.5, color: C.heading, outline: "none",
              }}
            />

            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.heading, margin: "16px 0 10px" }}>Hour</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
              {visibleSlots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  style={{
                    padding: "9px 14px", borderRadius: 8, cursor: "pointer",
                    border: `1px solid ${slot === s ? C.green : C.cardBorder}`,
                    background: slot === s ? C.green : "#eef0f6",
                    color: slot === s ? C.white : C.heading,
                    fontFamily: C.sans, fontSize: 12.5, fontWeight: 500,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMoreTimes((v) => !v)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12,
                border: "none", background: "none", cursor: "pointer",
                color: C.green, fontFamily: C.sans, fontSize: 12, fontWeight: 600,
              }}
            >
              <Icon name="chevD" size={13} color={C.green} />
              {moreTimes ? "fewer times" : `${TIME_SLOTS.length - 3} more times`}
            </button>

            <div style={{ marginTop: 16 }}>
              <GreenBtn icon="calendar">Request an Appointment</GreenBtn>
            </div>
          </div>

          <Hairline />

          {/* ── services ── */}
          <SectionTitle>Our Services</SectionTitle>
          <div className="noble-two-col">
            {SERVICES.map((s) => (
              <div key={s.title} className="noble-center-last" style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 14,
                padding: "22px 18px", textAlign: "center",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 17.5, color: C.heading, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: C.body, flex: 1 }}>{s.body}</div>
                <GreenBtn style={{ padding: "9px 14px", fontSize: 12.5 }}>Read More</GreenBtn>
              </div>
            ))}
          </div>

          <Hairline />

          {/* ── testimonials ── */}
          <SectionTitle>Testimonials</SectionTitle>
          <div className="noble-two-col">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="noble-center-last" style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 14,
                padding: "18px 16px", textAlign: "center",
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.body }}>5/5</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 3, margin: "6px 0 8px" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} />)}
                </div>
                <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 16, color: C.heading, marginBottom: 8 }}>{t.name}</div>
                <div className="noble-quote" style={{ fontSize: 12, lineHeight: 1.65, color: C.body, maxHeight: 190, overflowY: "auto", paddingRight: 6 }}>
                  {t.quote}
                </div>
              </div>
            ))}
          </div>

          <Hairline />

          {/* ── gallery ── */}
          <SectionTitle>Gallery</SectionTitle>
          <div style={{ position: "relative" }}>
            <div
              ref={galRef}
              className="noble-gal"
              style={{ display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", padding: "2px 0" }}
            >
              {IMG.gallery.map((src, i) => (
                <img key={src} src={src} alt={`Gallery ${i + 1}`} style={{
                  width: 190, height: 130, objectFit: "cover", borderRadius: 10,
                  flexShrink: 0, scrollSnapAlign: "start", boxShadow: "0 3px 10px rgba(15,30,55,0.12)",
                }} />
              ))}
            </div>
            {[[-1, "chevL", { left: -8 }], [1, "chevR", { right: -8 }]].map(([dir, ic, pos]) => (
              <button key={ic} onClick={() => scrollGal(dir)} style={{
                position: "absolute", top: "50%", transform: "translateY(-50%)", ...pos,
                width: 30, height: 30, borderRadius: "50%", border: `1px solid ${C.cardBorder}`,
                background: "rgba(255,255,255,0.92)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(15,30,55,0.18)", color: C.heading,
              }}>
                <Icon name={ic} size={15} />
              </button>
            ))}
          </div>

          <Hairline />

          {/* ── rate ── */}
          <SectionTitle>Rate Our Service</SectionTitle>
          <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
            {moods.map((m) => (
              <button key={m.key} onClick={() => setRating(m.key)} style={{ border: "none", background: "none", cursor: "pointer", textAlign: "center", padding: 0 }}>
                <span style={{
                  width: 52, height: 52, borderRadius: "50%", background: m.color,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  outline: rating === m.key ? `3px solid ${C.heading}` : "none", outlineOffset: 2,
                }}>
                  <Face mood={m.key} />
                </span>
                <div style={{ fontSize: 12, color: C.body, marginTop: 7 }}>{m.label}</div>
              </button>
            ))}
          </div>

          <Hairline />

          {/* ── share & connect ── */}
          <SectionTitle>Share &amp; Connect</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 340, margin: "0 auto" }}>
            <GreenBtn icon="bookmark">Save Card</GreenBtn>
            <GreenBtn icon="share">Share Card</GreenBtn>
            <GreenBtn icon="phone">Contact</GreenBtn>
            <GreenBtn icon="smartphone">Save to Homescreen</GreenBtn>
          </div>

          <Hairline />

          {/* ── social ── */}
          <SectionTitle>Social</SectionTitle>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {["globe", "facebook", "linkedin"].map((ic) => (
              <button key={ic} className="noble-green-btn" style={{
                width: 46, height: 46, borderRadius: "50%", border: "none", background: C.green,
                display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Icon name={ic} size={18} color="#fff" />
              </button>
            ))}
          </div>

          <Hairline />

          {/* ── map ── */}
          <SectionTitle>Find Us</SectionTitle>
          <div style={{ borderRadius: 14, overflow: "hidden", height: 300, boxShadow: "0 3px 12px rgba(15,30,55,0.12)" }}>
            <iframe
              title="Port Louis, Mauritius"
              src="https://www.google.com/maps?q=Port+Louis,+Mauritius&output=embed"
              width="100%" height="100%" style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ── finance CTA ── */}
          <div style={{
            marginTop: 32, background: C.cardBg, border: `1px solid ${C.cardBorder}`,
            borderRadius: 14, padding: "26px 22px", textAlign: "center",
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", color: C.heading, textTransform: "uppercase" }}>
              Complete Your Finance Application Here
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: C.body, margin: "10px 0 16px" }}>
              Apply now for vehicle finance and get instant approval with our streamlined digital application process.
            </p>
            <GreenBtn style={{ width: "auto", display: "inline-flex", padding: "10px 22px" }}>
              Apply Now&nbsp;<Icon name="arrowR" size={14} color="#fff" />
            </GreenBtn>
          </div>

          {/* ── footer ── */}
          <div style={{ textAlign: "center", fontSize: 11.5, color: C.muted, marginTop: 28 }}>
            © 2026 Seriti Solutions. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
