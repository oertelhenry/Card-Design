import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   VEHICLE CARD — DESKTOP LAYOUT
   Premium automotive aesthetic, two-column hero,
   three-column spec sections. All fields conditional.
   ══════════════════════════════════════════════════════════ */

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

/* ─── icons ─── */
const Ico = {
  Mileage: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Transmission: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 12h4m4 0h4M8 8v8m4-8v8"/></svg>,
  Fuel: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2 2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 4"/><path d="M3 22h12"/><path d="M7 9h4"/></svg>,
  Consumption: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6"/><path d="M16 14l-4-2"/></svg>,
  Engine: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  ArrowL: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ArrowR: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  Share: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Kw: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Drive: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/></svg>,
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
export default function VehicleCardDesktop({ data = SAMPLE }) {
  const d = data.vehicleDetails || {};
  const p = data.vehiclePerformance || {};
  const c = data.vehicleCondition || {};
  const imgs = (data.images || []).filter((i) => i.active).sort((a, b) => a.sortId - b.sortId);

  const [idx, setIdx] = useState(0);
  const thumbRef = useRef(null);

  const prev = () => setIdx((i) => (i > 0 ? i - 1 : imgs.length - 1));
  const next = () => setIdx((i) => (i < imgs.length - 1 ? i + 1 : 0));

  useEffect(() => {
    if (thumbRef.current) {
      const el = thumbRef.current.children[idx];
      if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [idx]);

  const titleLine = [d.registrationYear === "New" ? "New" : d.registrationYear, d.make, d.model, d.variant].filter(v).join(" ");

  const quickStats = [
    { icon: <Ico.Mileage />, label: "Mileage", value: d.mileage },
    { icon: <Ico.Transmission />, label: "Transmission", value: d.transmission },
    { icon: <Ico.Fuel />, label: "Fuel", value: p.fuelType },
    { icon: <Ico.Consumption />, label: "Economy", value: p.fuelConsumption },
    { icon: <Ico.Engine />, label: "Engine", value: p.engineCapacity },
    { icon: <Ico.Kw />, label: "Power", value: v(p.kilowatts) ? `${p.kilowatts} kW` : null },
    { icon: <Ico.Drive />, label: "Drivetrain", value: p.drive },
  ].filter((s) => v(s.value));

  /* ─── row ─── */
  const Row = ({ k, val }) =>
    v(val) ? (
      <div style={S.row}>
        <span style={S.rowLabel}>{label(k)}</span>
        <span style={S.rowValue}>{val}</span>
      </div>
    ) : null;

  /* ─── spec panel ─── */
  const Panel = ({ title, children, visible }) => {
    if (!visible) return null;
    const hasContent = children.some((c) => c);
    if (!hasContent) return null;
    return (
      <div style={S.panel}>
        <h3 style={S.panelTitle}>{title}</h3>
        <div style={S.panelDivider} />
        {children}
      </div>
    );
  };

  /* ─── count visible panels for grid ─── */
  const panels = [
    data.vehicleDetailsVisible && "details",
    data.vehiclePerformanceVisible && "performance",
    data.vehicleConditionVisible && "condition",
  ].filter(Boolean);
  const panelCols = panels.length >= 3 ? 3 : panels.length;

  return (
    <div style={S.page}>
      <div style={S.container}>

        {/* ═══════ HERO ZONE — two columns ═══════ */}
        <div style={S.hero}>

          {/* LEFT: Gallery */}
          <div style={S.galleryCol}>
            <div style={S.heroWrap}>
              <img src={imgs[idx]?.image} alt={titleLine} style={S.heroImg} />
              {imgs.length > 1 && (
                <>
                  <button onClick={prev} style={{ ...S.navBtn, left: 14 }}><Ico.ArrowL /></button>
                  <button onClick={next} style={{ ...S.navBtn, right: 14 }}><Ico.ArrowR /></button>
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

          {/* RIGHT: Title, price, quick stats, actions */}
          <div style={S.infoCol}>
            {(v(data.companyName) || v(data.orgUnitName)) && (
              <p style={S.dealer}>{[data.companyName, data.orgUnitName].filter(v).join(" · ")}</p>
            )}
            {v(titleLine) && <h1 style={S.title}>{titleLine}</h1>}
            {v(d.price) && <div style={S.price}>{d.price}</div>}

            {/* Quick-stat chips */}
            {quickStats.length > 0 && (
              <div style={S.quickGrid}>
                {quickStats.map((s) => (
                  <div key={s.label} style={S.statCard}>
                    <span style={S.statIcon}>{s.icon}</span>
                    <div>
                      <div style={S.statLabel}>{s.label}</div>
                      <div style={S.statValue}>{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA buttons */}
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

            {v(data.emailAddress) && (
              <p style={{ ...S.dealer, marginTop: 12 }}>{data.emailAddress}</p>
            )}
          </div>
        </div>

        {/* ═══════ SPEC PANELS — responsive grid ═══════ */}
        <div style={{ ...S.specGrid, gridTemplateColumns: `repeat(${panelCols}, 1fr)` }}>

          <Panel title="Vehicle Details" visible={data.vehicleDetailsVisible}>
            {["make","model","variant","mileage","registrationYear","transmission","branch","noOfSeats","noOfDoors","bodyType","colour","stockNumber"].map(k => <Row key={k} k={k} val={d[k]} />)}
          </Panel>

          <Panel title="Performance" visible={data.vehiclePerformanceVisible}>
            {["fuelConsumption","engineCapacity","fuelTankCapacity","fuelType","cylinderLayout","kilowatts","drive","gears"].map(k => <Row key={k} k={k} val={p[k]} />)}
          </Panel>

          <Panel title="Vehicle Condition" visible={data.vehicleConditionVisible}>
            {["vehicleServiceHistory","roadworthyVoucher","category","spareKey","warranty"].map(k => <Row key={k} k={k} val={c[k]} />)}
          </Panel>
        </div>

        {/* ── CUSTOM HTML ── */}
        {data.vehicleCustomHtmlVisible && v(data.customHtml) && (
          <div style={S.panel}>
            <h3 style={S.panelTitle}>More Information</h3>
            <div style={S.panelDivider} />
            <div dangerouslySetInnerHTML={{ __html: data.customHtml }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════ STYLE MAP ═══════════ */
const S = {
  page: {
    background: bg, minHeight: "100vh",
    fontFamily: "'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif",
    color: textPrimary, padding: "32px 0",
  },
  container: { maxWidth: 1120, margin: "0 auto", padding: "0 32px" },

  /* hero */
  hero: { display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 32, alignItems: "start" },

  /* gallery column */
  galleryCol: { borderRadius: 16, overflow: "hidden", background: "#0A0D12", border: `1px solid ${border}` },
  heroWrap: { position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "#0A0D12" },
  heroImg: { width: "100%", height: "100%", objectFit: "contain", display: "block", transition: "opacity .2s" },
  navBtn: {
    position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 2,
    width: 42, height: 42, borderRadius: "50%",
    background: "rgba(22,27,34,.7)", border: "1px solid rgba(255,255,255,.1)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
    transition: "background .15s",
  },
  counter: { position: "absolute", bottom: 12, right: 16, fontSize: 13, color: "rgba(255,255,255,.5)", fontWeight: 500, zIndex: 2, fontVariantNumeric: "tabular-nums" },
  thumbStrip: { display: "flex", gap: 8, padding: "12px 14px 14px", overflowX: "auto", scrollbarWidth: "none" },
  thumb: { width: 72, height: 52, borderRadius: 8, objectFit: "cover", cursor: "pointer", border: "2px solid transparent", opacity: 0.4, transition: "all .2s", flexShrink: 0 },
  thumbActive: { border: `2px solid ${accent}`, opacity: 1 },

  /* info column */
  infoCol: { padding: "8px 0 0" },
  dealer: { fontSize: 13, color: textSecondary, margin: "0 0 8px", letterSpacing: "0.02em" },
  title: { fontSize: 30, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.025em" },
  price: { fontSize: 26, fontWeight: 700, color: accent, marginBottom: 22, textTransform: "capitalize" },

  /* quick stats */
  quickGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 },
  statCard: {
    display: "flex", alignItems: "center", gap: 12,
    background: surface, borderRadius: 12, padding: "12px 14px", border: `1px solid ${border}`,
  },
  statIcon: { color: accent, flexShrink: 0 },
  statLabel: { fontSize: 10, color: textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 },
  statValue: { fontSize: 14, fontWeight: 600, marginTop: 2 },

  /* CTA */
  actions: { display: "flex", gap: 12, marginBottom: 4 },
  btnPrimary: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    background: accent, color: "#fff", border: "none", borderRadius: 10,
    padding: "13px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none",
    transition: "background .15s",
  },
  btnSecondary: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    background: surfaceAlt, color: textPrimary, border: `1px solid ${border}`, borderRadius: 10,
    padding: "13px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .15s",
  },

  /* spec grid */
  specGrid: { display: "grid", gap: 20, marginTop: 32 },

  /* panels */
  panel: { background: surface, borderRadius: 16, border: `1px solid ${border}`, padding: "22px 24px" },
  panelTitle: { fontSize: 16, fontWeight: 700, margin: "0 0 0", letterSpacing: "-0.01em" },
  panelDivider: { height: 1, background: border, margin: "14px 0 6px" },

  /* rows */
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${border}` },
  rowLabel: { fontSize: 13, color: textSecondary, fontWeight: 500 },
  rowValue: { fontSize: 13, fontWeight: 600, textAlign: "right", maxWidth: "60%" },
};
