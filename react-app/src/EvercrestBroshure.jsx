/* ══════════════════════════════════════════════════════════════
   EVERCREST DEVELOPMENTS — "Silverwood Estate" Brochure Microsite
   Recreated pixel-for-pixel from Broshure/NewBroshure.mp4

   One-page property brochure: split hero (navy intro panel +
   aerial photo), trust-stat strip, master-plan overview with
   numbered legend, home-design + pricing package split, 3×2
   amenities grid, lifestyle/location banner with quote overlay,
   and a contact/CTA footer.
   ══════════════════════════════════════════════════════════════ */

const C = {
  navy: "#0A0E27",
  cream: "#F7F3ED",
  tan: "#F2EAE0",
  border: "#E4DAC9",
  heading: "#1C2016",
  body: "#5B5648",
  muted: "#8B8677",
  sage: "#6E9C52",
  badgeGreen: "#4A7A2C",
  pineGreen: "#2B4F14",
  rust: "#B4703A",
  steelBlue: "#3E6EA0",
  buttonTan: "#F7DDBC",
  serif: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
};

const IMG = {
  banner: "/evercrest/banner.jpg",
  masterplan: "/evercrest/masterplan.png",
  home1: "/evercrest/home1.jpg",
  home2: "/evercrest/home2.jpg",
  clubhouse: "/evercrest/clubhouse.jpg",
  padel: "/evercrest/padelcourts.jpg",
  trails: "/evercrest/walkingtrails.jpg",
  play: "/evercrest/playarea.jpg",
  green: "/evercrest/greenspaces.jpg",
  security: "/evercrest/security.jpg",
  lifestyle: "/evercrest/lifestylelocation.jpg",
};

const STATS = [
  { icon: "shield", line1: "SECURE ESTATE", line2: "LIVING", accent: C.rust },
  { icon: "leaf", line1: "NATURE ON YOUR", line2: "DOORSTEP", accent: C.rust },
  { icon: "users", line1: "A COMMUNITY", line2: "THAT CONNECTS", accent: C.steelBlue },
  { icon: "home", line1: "QUALITY HOMES.", line2: "LASTING VALUE.", accent: C.steelBlue },
];

const MASTERPLAN_ITEMS = [
  "Estate Entrance & Guardhouse",
  "The Clubhouse",
  "Padel Courts",
  "Children's Play Area",
  "Community Park",
  "Walking & Running Trails",
  "Future Development",
  "Retention Dam & Boardwalk",
];

const HOME_DESIGNS = [
  { name: "TYPE A – 3 BEDROOM DUET", img: IMG.home1, beds: 3, baths: 2, cars: 2, size: 150 },
  { name: "TYPE B – 4 BEDROOM DUET", img: IMG.home2, beds: 4, baths: 2.5, cars: 2, size: 188 },
];

const PRICING = [
  { tier: "Standard", includes: "Plot, plan & building package with quality finishes.", from: "R2 095 000" },
  { tier: "Premium", includes: "Upgraded finishes, enhanced specifications and landscaping.", from: "R2 395 000" },
  { tier: "Signature", includes: "Premium finishes, appliances, landscaping & extras.", from: "R2 795 000" },
];

const AMENITIES = [
  { img: IMG.clubhouse, title: "CLUBHOUSE", desc: "Sophisticated space with lounge, pool, braai area and more." },
  { img: IMG.padel, title: "PADEL COURTS", desc: "Two professional padel courts for active living." },
  { img: IMG.trails, title: "WALKING TRAILS", desc: "Scenic walking and running trails through natural surrounds." },
  { img: IMG.play, title: "CHILDREN'S PLAY AREA", desc: "Safe, fun play spaces for kids to explore and make memories." },
  { img: IMG.green, title: "OPEN GREEN SPACES", desc: "Beautiful parks and open spaces to relax, picnic and connect." },
  { img: IMG.security, title: "24/7 SECURITY", desc: "Controlled access, regular patrols and peace of mind." },
];

const LOCATION_STATS = [
  { icon: "signpost", value: "5 MIN", label: "TO MAIN ROAD" },
  { icon: "cart", value: "10 MIN", label: "TO SHOPPING CENTRES" },
  { icon: "book", value: "12 MIN", label: "TO LEADING SCHOOLS" },
  { icon: "plane", value: "30 MIN", label: "TO OR TAMBO INTERNATIONAL" },
];

const Icon = ({ name, size = 22, color = C.navy, strokeWidth = 1.5 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "shield": return <svg {...p}><path d="M12 3 4 6v6c0 4.6 3.2 8.4 8 9 4.8-.6 8-4.4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "leaf": return <svg {...p}><path d="M5 21c8 0 14-6 14-14V4h-3C8 4 5 10 5 18v3Z" /><path d="M5 21c3-6 7-10 13-13" /></svg>;
    case "users": return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5S15.5 16.4 15.5 20" /><circle cx="17.5" cy="9" r="2.6" /><path d="M15.7 13.7c2.9.3 5.1 2.9 5.1 6.3" /></svg>;
    case "home": return <svg {...p}><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9.5a1 1 0 0 0 1 1h3.5v-6h3v6H17a1 1 0 0 0 1-1V10" /></svg>;
    case "bed": return <svg {...p}><path d="M3 18v-6.5A2 2 0 0 1 5 9.5h14a2 2 0 0 1 2 2V18" /><path d="M3 18v2M21 18v2M3 14h18" /><path d="M6 14v-2a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 12 12v2" /></svg>;
    case "bath": return <svg {...p}><path d="M4 11V6.5A2.5 2.5 0 0 1 6.5 4c1 0 1.9.6 2.3 1.5" /><path d="M3 11h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2Z" /><path d="M8 21v-2M16 21v-2" /></svg>;
    case "car": return <svg {...p}><path d="M5 11 6.5 6.8A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11" /><path d="M4.5 11h15a1.5 1.5 0 0 1 1.5 1.5V16h-18v-3.5A1.5 1.5 0 0 1 4.5 11Z" /><circle cx="7.5" cy="16" r="1.4" /><circle cx="16.5" cy="16" r="1.4" /></svg>;
    case "area": return <svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="1.5" /><path d="M3.5 8h4M8 3.5v4M20.5 16h-4M16 20.5v-4" /></svg>;
    case "phone": return <svg {...p}><path d="M5.5 4h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.6 19.2 4.8 13.4 4 6.6A1.5 1.5 0 0 1 5.5 4Z" /></svg>;
    case "mail": return <svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="1.8" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.3 4 5.3 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.3-4-8.5s1.4-6.2 4-8.5Z" /></svg>;
    case "tree": return <svg {...p} fill={color} stroke="none"><path d="M12 2 7 9h2.2L6 14h2.6L5 20h14l-3.6-6H18l-3.2-5H17L12 2Z" /><rect x="10.7" y="19" width="2.6" height="3" /></svg>;
    case "leafSmall": return <svg {...p}><path d="M4 20c6.5 0 11-4.5 11-11V4h-2c-6.5 0-11 4.5-11 11v5Z" /><path d="M4 20c2.5-4.5 5.5-7.5 10-10" /></svg>;
    case "pin": return <svg {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.4" /></svg>;
    case "signpost": return <svg {...p}><path d="M12 3v18M12 6h7l-1.5 2.5L19 11h-7" /></svg>;
    case "cart": return <svg {...p}><path d="M3 4h2l2.4 11.5a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>;
    case "book": return <svg {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5A2.5 2.5 0 0 0 20 18.5v-13Z" /></svg>;
    case "plane": return <svg {...p}><path d="M10.5 13.5 3 11l1-2 8 1.2L17 4l2 1-4 7.8 1 6.7-2-1-1.5-4.5-4 4v-2.5l2-2Z" /></svg>;
    case "check": return <svg {...p}><path d="m5 13 4 4 10-10" /></svg>;
    default: return null;
  }
};

const Eyebrow = ({ children, color = C.rust, dark }) => (
  <div style={{
    fontFamily: C.sans, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.18em",
    textTransform: "uppercase", color: dark ? "#B9C1AE" : color, marginBottom: 10,
  }}>{children}</div>
);

const Heading = ({ children, size = 30, dark, style }) => (
  <h2 style={{
    fontFamily: C.serif, fontWeight: 600, fontSize: size, lineHeight: 1.15,
    letterSpacing: "0.01em", color: dark ? "#fff" : C.heading, margin: 0,
    textTransform: "uppercase", ...style,
  }}>{children}</h2>
);

export default function EvercrestBroshure() {
  return (
    <div style={{ background: C.cream, fontFamily: C.sans, color: C.body, minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .ec-hero { display: grid; grid-template-columns: 300px 1fr; }
        .ec-stats { display: grid; grid-template-columns: repeat(4, 1fr); }
        .ec-mp { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .ec-hd { display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; align-items: start; }
        .ec-hd-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ec-amenities { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 28px; }
        .ec-loc { display: grid; grid-template-columns: 1fr 1fr; }
        .ec-loc-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 28px; }
        .ec-footer { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 28px; align-items: start; }
        @media (max-width: 900px) {
          .ec-hero { grid-template-columns: 1fr; }
          .ec-stats { grid-template-columns: repeat(2, 1fr); }
          .ec-mp { grid-template-columns: 1fr; }
          .ec-hd { grid-template-columns: 1fr; }
          .ec-amenities { grid-template-columns: repeat(2, 1fr); }
          .ec-loc { grid-template-columns: 1fr; }
          .ec-footer { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ec-hd-cards { grid-template-columns: 1fr; }
          .ec-amenities { grid-template-columns: 1fr; }
          .ec-loc-stats { grid-template-columns: 1fr; }
          .ec-footer { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="ec-hero">
        <div style={{ background: C.navy, padding: "48px 34px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Icon name="tree" size={40} color={C.sage} />
          <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 24, color: "#fff", letterSpacing: "0.06em", marginTop: 14 }}>EVERCREST</div>
          <div style={{ fontFamily: C.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.32em", color: C.sage, marginTop: 4 }}>DEVELOPMENTS</div>
          <div style={{ width: 34, height: 1, background: "rgba(255,255,255,0.25)", margin: "20px 0" }} />
          <div style={{ fontFamily: C.serif, fontStyle: "italic", fontWeight: 500, fontSize: 17, color: "#fff", lineHeight: 1.35 }}>
            Building Better<br />Places to Live
          </div>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#B9C1AE", marginTop: 16, maxWidth: 220 }}>
            Evercrest Developments creates exceptional residential communities that blend modern living with natural surroundings, delivering lasting value and a lifestyle you'll love.
          </p>
          <div style={{ marginTop: "auto", paddingTop: 40 }}>
            <Icon name="leafSmall" size={20} color="rgba(255,255,255,0.35)" />
          </div>
        </div>
        <div style={{ position: "relative", minHeight: 420 }}>
          <img src={IMG.banner} alt="Evercrest Silverwood Estate aerial view" style={{ width: "100%", height: "100%", position: "absolute", inset: 0, objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.15) 100%)" }} />
          <div style={{ position: "relative", padding: "56px 44px", maxWidth: 460 }}>
            <h1 style={{ fontFamily: C.serif, fontWeight: 500, fontSize: 38, lineHeight: 1.22, color: "#fff", margin: 0 }}>
              Discover a life surrounded by <span style={{ color: C.sage, fontStyle: "italic" }}>nature</span>. Designed for modern living.
            </h1>
          </div>
        </div>
      </div>

      {/* ── TRUST STATS ── */}
      <div className="ec-stats" style={{ background: C.cream, padding: "36px 24px", borderBottom: `1px solid ${C.border}` }}>
        {STATS.map((s) => (
          <div key={s.line1} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, padding: "0 12px" }}>
            <Icon name={s.icon} size={24} color={C.navy} />
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.04em", color: C.heading, lineHeight: 1.5 }}>
              {s.line1}<br /><span style={{ color: s.accent }}>{s.line2}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── MASTER PLAN ── */}
      <div style={{ background: C.tan, padding: "64px 40px" }}>
        <div className="ec-mp" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <Heading size={30}>Master-Planned<br />With Purpose</Heading>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, marginTop: 16, maxWidth: 440 }}>
              Green spaces, walking trails and premium amenities come together in perfect harmony to create a lifestyle estate that puts wellbeing, connection and convenience at the heart of everyday life.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 22 }}>
              {MASTERPLAN_ITEMS.map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13.5, fontWeight: 500, color: C.heading }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%", background: C.badgeGreen, color: "#fff",
                    fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 14, boxShadow: "0 12px 30px rgba(20,30,15,0.08)" }}>
            <img src={IMG.masterplan} alt="Silverwood Estate master plan" style={{ width: "100%", display: "block", borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* ── HOME DESIGNS + PRICING ── */}
      <div style={{ background: C.cream, padding: "64px 40px" }}>
        <div className="ec-hd" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <Heading size={26}>Home Designs</Heading>
            <p style={{ fontSize: 13, fontStyle: "italic", color: C.muted, marginTop: 8 }}>Contemporary homes. Thoughtfully designed.</p>
            <div className="ec-hd-cards" style={{ marginTop: 24 }}>
              {HOME_DESIGNS.map((h) => (
                <div key={h.name}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.03em", color: C.heading, marginBottom: 8 }}>{h.name}</div>
                  <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 11.5, color: C.body }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="bed" size={14} color={C.body} />{h.beds}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="bath" size={14} color={C.body} />{h.baths}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="car" size={14} color={C.body} />{h.cars}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="area" size={14} color={C.body} />{h.size} m²</span>
                  </div>
                  <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: 10 }}>
                    <img src={h.img} alt={h.name} style={{ width: "100%", display: "block", borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: C.pineGreen, borderRadius: 10, padding: "30px 26px" }}>
            <Heading size={24} dark style={{ letterSpacing: "0.02em" }}>Pricing<br />Packages</Heading>
            <p style={{ fontSize: 12.5, color: "#C9D4BC", lineHeight: 1.6, marginTop: 10 }}>Choose the perfect package to suit your lifestyle and budget.</p>
            <div style={{ display: "flex", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#9DB187", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "18px 0 8px", marginTop: 8 }}>
              <span style={{ flex: "0 0 76px" }}>PACKAGE</span>
              <span style={{ flex: 1 }}>INCLUDES</span>
              <span>FROM</span>
            </div>
            {PRICING.map((p) => (
              <div key={p.tier} style={{ display: "flex", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", gap: 8 }}>
                <span style={{ flex: "0 0 76px", fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{p.tier}</span>
                <span style={{ flex: 1, fontSize: 11.5, color: "#C9D4BC", lineHeight: 1.55, paddingRight: 8 }}>{p.includes}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", textAlign: "right", whiteSpace: "nowrap" }}>{p.from}</span>
              </div>
            ))}
            <button style={{
              width: "100%", marginTop: 22, padding: "14px 16px", background: "transparent",
              border: "1px solid rgba(255,255,255,0.4)", borderRadius: 6, cursor: "pointer", textAlign: "center",
            }}>
              <div style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", color: "#fff" }}>LET US BUILD YOUR VISION</div>
              <div style={{ fontSize: 11, color: "#9DB187", marginTop: 3 }}>Custom options and upgrade packages available.</div>
            </button>
          </div>
        </div>
      </div>

      {/* ── AMENITIES ── */}
      <div style={{ background: C.tan, padding: "64px 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Heading size={28}>Amenities</Heading>
          <p style={{ fontSize: 13, fontStyle: "italic", color: C.muted, marginTop: 8, marginBottom: 30 }}>Everything you need. Right where you live.</p>
          <div className="ec-amenities">
            {AMENITIES.map((a) => (
              <div key={a.title}>
                <div style={{ borderRadius: 6, overflow: "hidden" }}>
                  <img src={a.img} alt={a.title} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.03em", color: C.heading, marginTop: 12 }}>{a.title}</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: C.body, marginTop: 5 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIFESTYLE / LOCATION ── */}
      <div className="ec-loc" style={{ background: C.navy }}>
        <div style={{ padding: "56px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Eyebrow dark>Lifestyle. Location. Legacy.</Eyebrow>
          <Heading size={30} dark style={{ textTransform: "none" }}>
            A better address for <span style={{ color: C.sage, fontStyle: "italic", fontWeight: 500 }}>your</span> next chapter.
          </Heading>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#B9C1AE", marginTop: 16, maxWidth: 400 }}>
            Perfectly positioned close to schools, shopping centres, medical facilities and major routes, Silverwood Estate offers the ideal balance of convenience and tranquillity.
          </p>
          <div className="ec-loc-stats" style={{ marginTop: 26 }}>
            {LOCATION_STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name={s.icon} size={17} color={C.sage} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.05em", color: "#9DA69C" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", minHeight: 380 }}>
          <img src={IMG.lifestyle} alt="Couple walking on estate pathway" style={{ width: "100%", height: "100%", position: "absolute", inset: 0, objectFit: "cover" }} />
          <div style={{
            position: "absolute", right: 28, bottom: 28, background: "#fff", borderRadius: 4,
            padding: "20px 22px", maxWidth: 230, boxShadow: "0 14px 34px rgba(0,0,0,0.25)",
          }}>
            <p style={{ fontFamily: C.serif, fontStyle: "italic", fontSize: 14, lineHeight: 1.4, color: C.heading, margin: 0 }}>
              Live close to nature. Stay connected to what matters.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
              <span style={{ width: 16, height: 1, background: C.border }} />
              <Icon name="leafSmall" size={13} color={C.sage} />
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: C.cream, padding: "48px 40px" }}>
        <div className="ec-footer" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="tree" size={26} color={C.sage} />
            <div>
              <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 16, color: C.heading, letterSpacing: "0.04em" }}>EVERCREST</div>
              <div style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: "0.24em", color: C.sage }}>DEVELOPMENTS</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: C.heading, marginBottom: 12 }}>GET IN TOUCH</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 12.5 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="phone" size={13} color={C.sage} />082 123 4567</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="mail" size={13} color={C.sage} />info@evercrest.co.za</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="globe" size={13} color={C.sage} />www.evercrest.co.za</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: C.heading, marginBottom: 12 }}>SHOW HOUSE</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
              Open daily 10am – 5pm<br />
              Silverwood Estate,<br />
              Off Cedar Road, Jubilee View
            </div>
          </div>

          <button style={{
            padding: "16px 22px", background: C.buttonTan, border: "none", borderRadius: 6,
            cursor: "pointer", textAlign: "center", minWidth: 190, alignSelf: "start",
          }}>
            <div style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: C.heading }}>BOOK YOUR VIEWING TODAY</div>
            <div style={{ fontSize: 11, color: C.rust, marginTop: 3 }}>Your new lifestyle awaits.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
