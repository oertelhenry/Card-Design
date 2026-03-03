import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   VEHICLE CARD — LIGHT VARIANT
   Warm cream palette, soft shadows, pill-shaped stat bar,
   tabbed spec sections. Mobile + Desktop in one preview.
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
    price: "more info", make: "JETOUR", model: "Dashing Momentum",
    mileage: "New", registrationYear: "New", transmission: "Auto",
    branch: "Phoenix", noOfSeats: "5", noOfDoors: "5", bodyType: "SUV",
    variant: "", colour: "Various", stockNumber: "",
  },
  vehiclePerformance: {
    fuelConsumption: "7.8l/100km", engineCapacity: "1.5 TCI + 6DCT (1498cc)",
    fuelTankCapacity: "57 l", fuelType: "Petrol", cylinderLayout: "",
    kilowatts: "197", drive: "Front", gears: "6-Speed DCT",
  },
  vehicleCondition: {
    roadworthyVoucher: "", vehicleServiceHistory: "New", category: "",
    spareKey: "Yes", warranty: "10 years",
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
const labelMap = {
  price:"Price",make:"Make",model:"Model",mileage:"Mileage",registrationYear:"Reg. Year",
  transmission:"Transmission",branch:"Branch",noOfSeats:"Seats",noOfDoors:"Doors",
  bodyType:"Body Type",variant:"Variant",colour:"Colour",stockNumber:"Stock #",
  fuelConsumption:"Fuel Consumption",engineCapacity:"Engine",fuelTankCapacity:"Tank Capacity",
  fuelType:"Fuel Type",cylinderLayout:"Cylinder Layout",kilowatts:"Power (kW)",
  drive:"Drivetrain",gears:"Gearbox",roadworthyVoucher:"Roadworthy",
  vehicleServiceHistory:"Service History",category:"Category",spareKey:"Spare Key",warranty:"Warranty",
};

/* ─── colour tokens — LIGHT ─── */
const C = {
  accent: "#1B6EF3",
  accentSoft: "#EBF2FF",
  bg: "#F6F5F1",
  card: "#FFFFFF",
  surface: "#F0EFEB",
  border: "#E4E2DC",
  borderLight: "#EDECE8",
  t1: "#1A1D23",
  t2: "#6B7280",
  t3: "#9CA3AF",
  shadow: "0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.06)",
  shadowLg: "0 2px 8px rgba(0,0,0,.04), 0 12px 40px rgba(0,0,0,.08)",
  heroGrad: "linear-gradient(135deg, #F0EFEB 0%, #E8E6E0 100%)",
};

/* ─── icons ─── */
const I = {
  Mileage:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Trans:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 12h4m4 0h4M8 8v8m4-8v8"/></svg>,
  Fuel:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2 2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 4"/><path d="M3 22h12"/><path d="M7 9h4"/></svg>,
  Eco:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6"/><path d="M16 14l-4-2"/></svg>,
  Engine:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Kw:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Drive:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/></svg>,
  Left:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>,
  Right:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 6 15 12 9 18"/></svg>,
  Mail:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  Share:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
};

/* ─── shared row ─── */
const Row = ({ k, val, last }) =>
  v(val) ? (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: last ? "none" : `1px solid ${C.borderLight}` }}>
      <span style={{ fontSize: 13, color: C.t2, fontWeight: 500 }}>{labelMap[k] || k}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.t1, textAlign: "right", maxWidth: "58%" }}>{val}</span>
    </div>
  ) : null;

/* ─── gallery nav button (shared) ─── */
const navBtn = {
  position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 2,
  width: 36, height: 36, borderRadius: "50%",
  background: "rgba(255,255,255,.85)", border: "1px solid rgba(0,0,0,.08)",
  color: C.t1, display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
  boxShadow: "0 2px 8px rgba(0,0,0,.1)",
};


/* ════════════════════════════════════════
   MOBILE LAYOUT — Light Variant
   ════════════════════════════════════════ */
function MobileCard({ data }) {
  const d = data.vehicleDetails || {};
  const p = data.vehiclePerformance || {};
  const c = data.vehicleCondition || {};
  const imgs = (data.images || []).filter((i) => i.active).sort((a, b) => a.sortId - b.sortId);
  const [idx, setIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const tRef = useRef(null);

  useEffect(() => {
    if (tRef.current?.children[idx]) tRef.current.children[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [idx]);

  const titleLine = [d.registrationYear === "New" ? "New" : d.registrationYear, d.make, d.model, d.variant].filter(v).join(" ");

  const qStats = [
    { icon: <I.Mileage />, l: "Mileage", v: d.mileage },
    { icon: <I.Trans />, l: "Trans.", v: d.transmission },
    { icon: <I.Fuel />, l: "Fuel", v: p.fuelType },
    { icon: <I.Eco />, l: "Economy", v: p.fuelConsumption },
    { icon: <I.Engine />, l: "Engine", v: p.engineCapacity },
  ].filter((s) => v(s.v));

  /* tab definitions */
  const tabs = [
    data.vehicleDetailsVisible && { id: "details", label: "Details" },
    data.vehiclePerformanceVisible && { id: "perf", label: "Performance" },
    data.vehicleConditionVisible && { id: "cond", label: "Condition" },
  ].filter(Boolean);

  const detailKeys = ["make","model","variant","mileage","registrationYear","transmission","branch","noOfSeats","noOfDoors","bodyType","colour","stockNumber"];
  const perfKeys = ["fuelConsumption","engineCapacity","fuelTankCapacity","fuelType","cylinderLayout","kilowatts","drive","gears"];
  const condKeys = ["vehicleServiceHistory","roadworthyVoucher","category","spareKey","warranty"];

  const tabContent = {
    details: detailKeys.filter((k) => v(d[k])),
    perf: perfKeys.filter((k) => v(p[k])),
    cond: condKeys.filter((k) => v(c[k])),
  };
  const tabData = { details: d, perf: p, cond: c };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", background: C.bg, color: C.t1, fontFamily: "'Outfit','DM Sans','Segoe UI',system-ui,sans-serif", minHeight: "100%", paddingBottom: 40 }}>

      {/* ── Gallery ── */}
      {imgs.length > 0 && (
        <div style={{ background: C.heroGrad, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
            <img src={imgs[idx]?.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            {imgs.length > 1 && (
              <>
                <button onClick={() => setIdx((i) => (i > 0 ? i - 1 : imgs.length - 1))} style={{ ...navBtn, left: 10 }}><I.Left /></button>
                <button onClick={() => setIdx((i) => (i < imgs.length - 1 ? i + 1 : 0))} style={{ ...navBtn, right: 10 }}><I.Right /></button>
              </>
            )}
            <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 20 : 7, height: 7, borderRadius: 10, border: "none", cursor: "pointer",
                    background: i === idx ? C.accent : "rgba(0,0,0,.2)",
                    transition: "all .25s ease",
                  }}
                />
              ))}
            </div>
          </div>
          {imgs.length > 1 && (
            <div ref={tRef} style={{ display: "flex", gap: 6, padding: "10px 16px 14px", overflowX: "auto", scrollbarWidth: "none" }}>
              {imgs.map((im, i) => (
                <img key={im.sortId} src={im.image} alt="" onClick={() => setIdx(i)}
                  style={{
                    width: 56, height: 42, borderRadius: 8, objectFit: "cover", cursor: "pointer", flexShrink: 0,
                    border: i === idx ? `2px solid ${C.accent}` : `2px solid ${C.border}`,
                    opacity: i === idx ? 1 : 0.55, transition: "all .2s",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Title card ── */}
      <div style={{ margin: "16px 16px 0", background: C.card, borderRadius: 16, padding: "20px 18px", boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
        {(v(data.companyName) || v(data.orgUnitName)) && (
          <p style={{ fontSize: 11, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 6px" }}>
            {[data.companyName, data.orgUnitName].filter(v).join(" · ")}
          </p>
        )}
        {v(titleLine) && <h1 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.25, letterSpacing: "-.02em", color: C.t1 }}>{titleLine}</h1>}
        {v(d.price) && (
          <span style={{ display: "inline-block", fontSize: 15, fontWeight: 700, color: C.accent, background: C.accentSoft, borderRadius: 8, padding: "5px 12px", marginTop: 4, textTransform: "capitalize" }}>
            {d.price}
          </span>
        )}
      </div>

      {/* ── Actions ── */}
      <div style={{ display: "flex", gap: 10, padding: "12px 16px 0" }}>
        {v(data.emailAddress) && (
          <a href={`mailto:${data.emailAddress}`} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            background: C.accent, color: "#fff", border: "none", borderRadius: 12,
            padding: "12px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none",
            boxShadow: "0 2px 10px rgba(27,110,243,.3)",
          }}>
            <I.Mail /> <span>Enquire Now</span>
          </a>
        )}
        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          background: C.card, color: C.t1, border: `1px solid ${C.border}`, borderRadius: 12,
          padding: "12px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: C.shadow,
        }}>
          <I.Share /> <span>Share</span>
        </button>
      </div>

      {/* ── Quick-stat horizontal scroll ── */}
      {qStats.length > 0 && (
        <div style={{ display: "flex", gap: 8, padding: "16px 16px 4px", overflowX: "auto", scrollbarWidth: "none" }}>
          {qStats.map((s) => (
            <div key={s.l} style={{
              display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
              background: C.card, borderRadius: 12, padding: "10px 14px",
              border: `1px solid ${C.border}`, boxShadow: C.shadow,
            }}>
              <span style={{ color: C.accent }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 10, color: C.t3, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{s.l}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginTop: 1, whiteSpace: "nowrap" }}>{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tabbed specs ── */}
      {tabs.length > 0 && (
        <div style={{ margin: "14px 16px 0", background: C.card, borderRadius: 16, boxShadow: C.shadow, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: "13px 8px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: "none", border: "none",
                  color: activeTab === tab.id ? C.accent : C.t3,
                  borderBottom: activeTab === tab.id ? `2.5px solid ${C.accent}` : "2.5px solid transparent",
                  transition: "all .2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "4px 18px 10px" }}>
            {(tabContent[activeTab] || []).map((k, i, arr) => (
              <Row key={k} k={k} val={tabData[activeTab][k]} last={i === arr.length - 1} />
            ))}
          </div>
        </div>
      )}

      {/* ── Custom HTML ── */}
      {data.vehicleCustomHtmlVisible && v(data.customHtml) && (
        <div style={{ margin: "14px 16px 0", background: C.card, borderRadius: 16, padding: 18, boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
          <div dangerouslySetInnerHTML={{ __html: data.customHtml }} />
        </div>
      )}

      {/* ── Footer ── */}
      {v(data.emailAddress) && (
        <div style={{ textAlign: "center", padding: "24px 16px 0" }}>
          <span style={{ fontSize: 11, color: C.t3 }}>{data.emailAddress}</span>
        </div>
      )}
    </div>
  );
}


/* ════════════════════════════════════════
   DESKTOP LAYOUT — Light Variant
   ════════════════════════════════════════ */
function DesktopCard({ data }) {
  const d = data.vehicleDetails || {};
  const p = data.vehiclePerformance || {};
  const c = data.vehicleCondition || {};
  const imgs = (data.images || []).filter((i) => i.active).sort((a, b) => a.sortId - b.sortId);
  const [idx, setIdx] = useState(0);
  const tRef = useRef(null);

  useEffect(() => {
    if (tRef.current?.children[idx]) tRef.current.children[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [idx]);

  const titleLine = [d.registrationYear === "New" ? "New" : d.registrationYear, d.make, d.model, d.variant].filter(v).join(" ");

  const qStats = [
    { icon: <I.Mileage />, l: "Mileage", v: d.mileage },
    { icon: <I.Trans />, l: "Transmission", v: d.transmission },
    { icon: <I.Fuel />, l: "Fuel", v: p.fuelType },
    { icon: <I.Eco />, l: "Economy", v: p.fuelConsumption },
    { icon: <I.Engine />, l: "Engine", v: p.engineCapacity },
    { icon: <I.Kw />, l: "Power", v: v(p.kilowatts) ? `${p.kilowatts} kW` : null },
    { icon: <I.Drive />, l: "Drivetrain", v: p.drive },
  ].filter((s) => v(s.v));

  const detailKeys = ["make","model","variant","mileage","registrationYear","transmission","branch","noOfSeats","noOfDoors","bodyType","colour","stockNumber"];
  const perfKeys = ["fuelConsumption","engineCapacity","fuelTankCapacity","fuelType","cylinderLayout","kilowatts","drive","gears"];
  const condKeys = ["vehicleServiceHistory","roadworthyVoucher","category","spareKey","warranty"];

  const panels = [
    data.vehicleDetailsVisible && { title: "Vehicle Details", keys: detailKeys, src: d },
    data.vehiclePerformanceVisible && { title: "Performance", keys: perfKeys, src: p },
    data.vehicleConditionVisible && { title: "Condition", keys: condKeys, src: c },
  ].filter(Boolean);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px", color: C.t1, fontFamily: "'Outfit','DM Sans','Segoe UI',system-ui,sans-serif" }}>

      {/* ═══ HERO — left gallery, right info ═══ */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, alignItems: "start" }}>

        {/* Gallery card */}
        <div style={{ borderRadius: 20, overflow: "hidden", background: C.heroGrad, border: `1px solid ${C.border}`, boxShadow: C.shadowLg }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
            <img src={imgs[idx]?.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            {imgs.length > 1 && (
              <>
                <button onClick={() => setIdx((i) => (i > 0 ? i - 1 : imgs.length - 1))} style={{ ...navBtn, left: 16, width: 40, height: 40 }}><I.Left /></button>
                <button onClick={() => setIdx((i) => (i < imgs.length - 1 ? i + 1 : 0))} style={{ ...navBtn, right: 16, width: 40, height: 40 }}><I.Right /></button>
              </>
            )}
            <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {imgs.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{
                  width: i === idx ? 22 : 8, height: 8, borderRadius: 10, border: "none", cursor: "pointer",
                  background: i === idx ? C.accent : "rgba(0,0,0,.15)", transition: "all .25s ease",
                }} />
              ))}
            </div>
          </div>
          {imgs.length > 1 && (
            <div ref={tRef} style={{ display: "flex", gap: 8, padding: "12px 16px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
              {imgs.map((im, i) => (
                <img key={im.sortId} src={im.image} alt="" onClick={() => setIdx(i)} style={{
                  width: 74, height: 54, borderRadius: 10, objectFit: "cover", cursor: "pointer", flexShrink: 0,
                  border: i === idx ? `2.5px solid ${C.accent}` : `2.5px solid ${C.border}`,
                  opacity: i === idx ? 1 : 0.5, transition: "all .2s",
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Info card */}
        <div style={{ background: C.card, borderRadius: 20, padding: "28px 26px", boxShadow: C.shadowLg, border: `1px solid ${C.border}` }}>
          {(v(data.companyName) || v(data.orgUnitName)) && (
            <p style={{ fontSize: 11, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 10px" }}>
              {[data.companyName, data.orgUnitName].filter(v).join(" · ")}
            </p>
          )}
          {v(titleLine) && <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-.025em" }}>{titleLine}</h1>}
          {v(d.price) && (
            <span style={{ display: "inline-block", fontSize: 17, fontWeight: 700, color: C.accent, background: C.accentSoft, borderRadius: 8, padding: "6px 14px", marginBottom: 20, textTransform: "capitalize" }}>
              {d.price}
            </span>
          )}

          {/* Quick stats — 2-col grid */}
          {qStats.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
              {qStats.map((s) => (
                <div key={s.l} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: C.surface, borderRadius: 12, padding: "10px 12px",
                  border: `1px solid ${C.borderLight}`,
                }}>
                  <span style={{ color: C.accent, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: C.t3, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{s.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginTop: 1 }}>{s.v}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ display: "flex", gap: 10 }}>
            {v(data.emailAddress) && (
              <a href={`mailto:${data.emailAddress}`} style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                background: C.accent, color: "#fff", border: "none", borderRadius: 12,
                padding: "13px 20px", fontSize: 15, fontWeight: 600, textDecoration: "none", cursor: "pointer",
                boxShadow: "0 2px 10px rgba(27,110,243,.3)",
              }}>
                <I.Mail /> <span>Enquire Now</span>
              </a>
            )}
            <button style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              background: C.surface, color: C.t1, border: `1px solid ${C.border}`, borderRadius: 12,
              padding: "13px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            }}>
              <I.Share /> <span>Share</span>
            </button>
          </div>
          {v(data.emailAddress) && <p style={{ fontSize: 12, color: C.t3, marginTop: 14, marginBottom: 0 }}>{data.emailAddress}</p>}
        </div>
      </div>

      {/* ═══ SPEC PANELS — three columns ═══ */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${panels.length >= 3 ? 3 : panels.length}, 1fr)`, gap: 20, marginTop: 28 }}>
        {panels.map((panel) => {
          const visKeys = panel.keys.filter((k) => v(panel.src[k]));
          if (!visKeys.length) return null;
          return (
            <div key={panel.title} style={{ background: C.card, borderRadius: 18, padding: "22px 22px 12px", boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", color: C.t1, letterSpacing: "-.01em" }}>{panel.title}</h3>
              <div style={{ height: 2, background: C.accent, width: 32, borderRadius: 2, marginBottom: 8 }} />
              {visKeys.map((k, i) => <Row key={k} k={k} val={panel.src[k]} last={i === visKeys.length - 1} />)}
            </div>
          );
        })}
      </div>

      {/* ── Custom HTML ── */}
      {data.vehicleCustomHtmlVisible && v(data.customHtml) && (
        <div style={{ background: C.card, borderRadius: 18, padding: "22px 22px 12px", boxShadow: C.shadow, border: `1px solid ${C.border}`, marginTop: 20 }}>
          <div dangerouslySetInnerHTML={{ __html: data.customHtml }} />
        </div>
      )}
    </div>
  );
}


/* ════════════════════════════════════════
   PREVIEW WRAPPER
   ════════════════════════════════════════ */
export default function VehicleCardLightPreview() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Outfit','DM Sans','Segoe UI',system-ui,sans-serif" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "20px 16px 0" }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 28px", fontSize: 13, fontWeight: 600, textTransform: "capitalize",
              borderRadius: 10, cursor: "pointer", transition: "all .15s",
              border: mode === m ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
              background: mode === m ? C.accent : C.card,
              color: mode === m ? "#fff" : C.t2,
              boxShadow: mode === m ? "0 2px 8px rgba(27,110,243,.25)" : C.shadow,
            }}
          >
            {m === "mobile" ? "📱 Mobile" : "🖥 Desktop"}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ padding: mode === "desktop" ? "24px 16px 48px" : "24px 0 48px" }}>
        {mode === "mobile" ? (
          <div style={{
            maxWidth: 420, margin: "0 auto",
            borderRadius: 24,
            border: `1.5px solid ${C.border}`,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.04)",
            background: C.bg,
          }}>
            <MobileCard data={SAMPLE} />
          </div>
        ) : (
          <DesktopCard data={SAMPLE} />
        )}
      </div>
    </div>
  );
}
