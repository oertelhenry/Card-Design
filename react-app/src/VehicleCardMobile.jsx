import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   VEHICLE CARD — MOBILE LAYOUT
   Premium automotive aesthetic, optimised for portrait phones.
   All fields are conditionally rendered — empty/null = hidden.
   ══════════════════════════════════════════════════════════ */

// ── sample payload (swap with real props / API fetch) ──
const SAMPLE = {
  companyName: "Jetour",
  orgUnitName: "Phoenix",
  emailAddress: "info@jetourmauritius.mu",
  vehicleDetailsVisible: true,
  vehiclePerformanceVisible: true,
  vehicleConditionVisible: true,
  vehicleCustomHtmlVisible: false,
  customHtml: null,
  vehicleDetails: {
    price: "more info",
    make: "JETOUR",
    model: "Dashing Momentum",
    mileage: "New",
    registrationYear: "New",
    transmission: "Auto",
    branch: "Phoenix",
    noOfSeats: "5",
    noOfDoors: "5",
    bodyType: "SUV",
    variant: "",
    colour: "Various",
    stockNumber: "",
  },
  vehiclePerformance: {
    fuelConsumption: "7.8l/100km",
    engineCapacity: "1.5 TCI + 6DCT (1498cc)",
    fuelTankCapacity: "57 l",
    fuelType: "Petrol",
    cylinderLayout: "",
    kilowatts: "197",
    drive: "Front",
    gears: "6-Speed DCT",
  },
  vehicleCondition: {
    roadworthyVoucher: "",
    vehicleServiceHistory: "New",
    category: "",
    spareKey: "Yes",
    warranty: "10 years",
  },
  images: [
    { sortId: 1, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/8508b1a6d62d4f85af5f32ff105bee12_Dashing2.jpg" },
    { sortId: 2, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/b67464b75f5b4e8cb48d02fd9fe032e2_Dashing3.jpg" },
    { sortId: 3, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/c9892c14faf94b408519d302a9e9ba9d_Dashing4.jpg" },
    { sortId: 5, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/552a02bc3f514a75aef81f4574b625c5_Dashing5.jpg" },
    { sortId: 6, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/aa1e9fb1de3b4f099a5b665081fc9f2e_Dashing6.jpg" },
    { sortId: 7, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/8acb527f17cf4f1dad8dd1000f53e9a0_Dashing1.jpg" },
    { sortId: 8, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/c7ffcc08788d4e52ae460cfe407f028c_color.jpg" },
    { sortId: 9, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/beb8f21f9b65414eb728735c4923a551_Jetour-Mauritius-Dashing-Momentum-Spec-Sheet-1080x1080.jpg" },
  ],
};

/* ─── helpers ─── */
const v = (val) => val != null && String(val).trim() !== "";
const label = (key) => {
  const map = {
    price: "Price", make: "Make", model: "Model", mileage: "Mileage",
    registrationYear: "Reg. Year", transmission: "Transmission", branch: "Branch",
    noOfSeats: "Seats", noOfDoors: "Doors", bodyType: "Body Type",
    variant: "Variant", colour: "Colour", stockNumber: "Stock #",
    fuelConsumption: "Fuel Consumption", engineCapacity: "Engine",
    fuelTankCapacity: "Tank Capacity", fuelType: "Fuel Type",
    cylinderLayout: "Cylinder Layout", kilowatts: "Power (kW)",
    drive: "Drivetrain", gears: "Gearbox",
    roadworthyVoucher: "Roadworthy", vehicleServiceHistory: "Service History",
    category: "Category", spareKey: "Spare Key", warranty: "Warranty",
  };
  return map[key] || key;
};

/* ─── inline SVG icons ─── */
const Ico = {
  Mileage: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Transmission: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 12h4m4 0h4M8 8v8m4-8v8"/></svg>,
  Fuel: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2 2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 4"/><path d="M3 22h12"/><path d="M7 9h4"/></svg>,
  Consumption: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6"/><path d="M16 14l-4-2"/></svg>,
  Engine: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Chevron: ({ flip }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: flip ? "rotate(180deg)" : "rotate(0)", transition: "transform .25s ease" }}><polyline points="6 9 12 15 18 9"/></svg>,
  ArrowL: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ArrowR: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  Share: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
};

/* ═══════════ COLOUR TOKENS ═══════════ */
const accent = "#0072F5";
const bg = "#0E1117";
const surface = "#161B22";
const surfaceAlt = "#1C2230";
const border = "#2A3040";
const textPrimary = "#F0F2F5";
const textSecondary = "#8B95A5";

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function VehicleCardMobile({ data = SAMPLE }) {
  const d = data.vehicleDetails || {};
  const p = data.vehiclePerformance || {};
  const c = data.vehicleCondition || {};
  const imgs = (data.images || []).filter((i) => i.active).sort((a, b) => a.sortId - b.sortId);

  const [idx, setIdx] = useState(0);
  const [openSections, setOpenSections] = useState({ details: true, performance: false, condition: false });
  const thumbRef = useRef(null);

  const toggle = (s) => setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }));
  const prev = () => setIdx((i) => (i > 0 ? i - 1 : imgs.length - 1));
  const next = () => setIdx((i) => (i < imgs.length - 1 ? i + 1 : 0));

  useEffect(() => {
    if (thumbRef.current) {
      const el = thumbRef.current.children[idx];
      if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [idx]);

  const quickStats = [
    { icon: <Ico.Mileage />, label: "Mileage", value: d.mileage },
    { icon: <Ico.Transmission />, label: "Trans.", value: d.transmission },
    { icon: <Ico.Fuel />, label: "Fuel", value: p.fuelType },
    { icon: <Ico.Consumption />, label: "Economy", value: p.fuelConsumption },
    { icon: <Ico.Engine />, label: "Engine", value: p.engineCapacity },
  ].filter((s) => v(s.value));

  const titleLine = [d.registrationYear === "New" ? "New" : d.registrationYear, d.make, d.model, d.variant].filter(v).join(" ");

  /* ─── spec row ─── */
  const Row = ({ k, val }) =>
    v(val) ? (
      <div style={S.row}>
        <span style={S.rowLabel}>{label(k)}</span>
        <span style={S.rowValue}>{val}</span>
      </div>
    ) : null;

  /* ─── collapsible section ─── */
  const Section = ({ id, title, children, visible }) => {
    if (!visible) return null;
    const open = openSections[id];
    return (
      <div style={S.section}>
        <button onClick={() => toggle(id)} style={S.sectionHeader}>
          <span style={S.sectionTitle}>{title}</span>
          <Ico.Chevron flip={open} />
        </button>
        <div style={{ ...S.sectionBody, maxHeight: open ? 900 : 0, opacity: open ? 1 : 0, paddingTop: open ? 0 : 0, paddingBottom: open ? 8 : 0 }}>
          <div style={{ padding: "0 18px" }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════ RENDER ═══════════ */
  return (
    <div style={S.card}>
      {/* ── IMAGE GALLERY ── */}
      {imgs.length > 0 && (
        <div style={S.gallery}>
          <div style={S.heroWrap}>
            <img src={imgs[idx]?.image} alt={titleLine} style={S.heroImg} />
            <div style={S.heroGrad} />
            {imgs.length > 1 && (
              <>
                <button onClick={prev} style={{ ...S.navBtn, left: 8 }}><Ico.ArrowL /></button>
                <button onClick={next} style={{ ...S.navBtn, right: 8 }}><Ico.ArrowR /></button>
              </>
            )}
            <div style={S.counter}>{idx + 1} / {imgs.length}</div>
          </div>
          {imgs.length > 1 && (
            <div ref={thumbRef} style={S.thumbStrip}>
              {imgs.map((im, i) => (
                <img key={im.sortId} src={im.image} alt="" onClick={() => setIdx(i)}
                  style={{ ...S.thumb, ...(i === idx ? S.thumbActive : {}) }} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TITLE + PRICE ── */}
      <div style={S.titleBlock}>
        {v(titleLine) && <h1 style={S.title}>{titleLine}</h1>}
        {v(d.price) && <div style={S.price}>{d.price}</div>}
        {(v(data.companyName) || v(data.orgUnitName)) && (
          <p style={S.dealer}>{[data.companyName, data.orgUnitName].filter(v).join(" · ")}</p>
        )}
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div style={S.actions}>
        {v(data.emailAddress) && (
          <a href={`mailto:${data.emailAddress}`} style={S.btnPrimary}>
            <Ico.Mail /> <span>Enquire Now</span>
          </a>
        )}
        <button
          onClick={() => { try { navigator.share?.({ url: window.location.href }); } catch {} }}
          style={S.btnSecondary}
        >
          <Ico.Share /> <span>Share</span>
        </button>
      </div>

      {/* ── QUICK STATS GRID ── */}
      {quickStats.length > 0 && (
        <div style={S.quickGrid}>
          {quickStats.map((s) => (
            <div key={s.label} style={S.statCard}>
              <span style={S.statIcon}>{s.icon}</span>
              <span style={S.statLabel}>{s.label}</span>
              <span style={S.statValue}>{s.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── SPEC SECTIONS (collapsible) ── */}
      <Section id="details" title="Vehicle Details" visible={data.vehicleDetailsVisible}>
        {["make","model","variant","mileage","registrationYear","transmission","branch","noOfSeats","noOfDoors","bodyType","colour","stockNumber"].map(k => <Row key={k} k={k} val={d[k]} />)}
      </Section>

      <Section id="performance" title="Performance" visible={data.vehiclePerformanceVisible}>
        {["fuelConsumption","engineCapacity","fuelTankCapacity","fuelType","cylinderLayout","kilowatts","drive","gears"].map(k => <Row key={k} k={k} val={p[k]} />)}
      </Section>

      <Section id="condition" title="Vehicle Condition" visible={data.vehicleConditionVisible}>
        {["vehicleServiceHistory","roadworthyVoucher","category","spareKey","warranty"].map(k => <Row key={k} k={k} val={c[k]} />)}
      </Section>

      {/* ── CUSTOM HTML ── */}
      {data.vehicleCustomHtmlVisible && v(data.customHtml) && (
        <div style={{ ...S.section, padding: 18 }}>
          <div style={S.sectionTitle}>More Information</div>
          <div dangerouslySetInnerHTML={{ __html: data.customHtml }} />
        </div>
      )}

      {/* ── FOOTER ── */}
      {v(data.emailAddress) && (
        <div style={S.footer}>
          <span style={{ fontSize: 11, color: textSecondary, letterSpacing: "0.03em" }}>{data.emailAddress}</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════ STYLE MAP ═══════════ */
const S = {
  card: {
    maxWidth: 480, margin: "0 auto", background: bg,
    fontFamily: "'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif",
    color: textPrimary, minHeight: "100dvh", paddingBottom: 40,
  },

  /* gallery */
  gallery: { background: "#0A0D12" },
  heroWrap: { position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#0A0D12" },
  heroImg: { width: "100%", height: "100%", objectFit: "contain", display: "block", transition: "opacity .25s ease" },
  heroGrad: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent,rgba(14,17,23,.8))", pointerEvents: "none" },
  navBtn: {
    position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 2,
    width: 38, height: 38, borderRadius: "50%",
    background: "rgba(22,27,34,.72)", border: "1px solid rgba(255,255,255,.1)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
  },
  counter: { position: "absolute", bottom: 10, right: 14, fontSize: 12, color: "rgba(255,255,255,.5)", fontWeight: 500, zIndex: 2, fontVariantNumeric: "tabular-nums" },
  thumbStrip: { display: "flex", gap: 6, padding: "10px 14px 14px", overflowX: "auto", scrollbarWidth: "none" },
  thumb: { width: 58, height: 44, borderRadius: 8, objectFit: "cover", cursor: "pointer", border: "2px solid transparent", opacity: 0.45, transition: "all .2s", flexShrink: 0 },
  thumbActive: { border: `2px solid ${accent}`, opacity: 1 },

  /* title */
  titleBlock: { padding: "20px 20px 4px" },
  title: { fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.25, letterSpacing: "-0.02em" },
  price: { fontSize: 20, fontWeight: 700, color: accent, marginTop: 6, textTransform: "capitalize" },
  dealer: { fontSize: 13, color: textSecondary, marginTop: 6, marginBottom: 0 },

  /* actions */
  actions: { display: "flex", gap: 10, padding: "14px 20px 4px" },
  btnPrimary: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    background: accent, color: "#fff", border: "none", borderRadius: 10,
    padding: "12px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none",
  },
  btnSecondary: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    background: surfaceAlt, color: textPrimary, border: `1px solid ${border}`, borderRadius: 10,
    padding: "12px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },

  /* quick stats */
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: "18px 20px 10px" },
  statCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    background: surface, borderRadius: 12, padding: "14px 6px", border: `1px solid ${border}`,
  },
  statIcon: { color: accent, marginBottom: 2 },
  statLabel: { fontSize: 10, color: textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 },
  statValue: { fontSize: 12, fontWeight: 600, textAlign: "center", lineHeight: 1.3 },

  /* sections */
  section: { margin: "12px 20px 0", borderRadius: 14, background: surface, border: `1px solid ${border}`, overflow: "hidden" },
  sectionHeader: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "15px 18px", background: "none", border: "none", color: textPrimary,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  },
  sectionTitle: { fontSize: 15, fontWeight: 700 },
  sectionBody: { overflow: "hidden", transition: "max-height .35s ease, opacity .25s ease, padding .25s ease" },

  /* rows */
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${border}` },
  rowLabel: { fontSize: 13, color: textSecondary, fontWeight: 500 },
  rowValue: { fontSize: 13, fontWeight: 600, textAlign: "right", maxWidth: "58%" },

  /* footer */
  footer: { textAlign: "center", padding: "28px 20px 0" },
};
