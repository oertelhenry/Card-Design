import { useMemo, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   CFAO MOBILITY KENYA — "Ascend" Vehicle Microsite
   Recreated from CardDesigns/Microsite/Ascend
   (AscendDesktop.mp4 / AscendMobile.mp4)

   Vehicle listing for an official Toyota dealership: sticky
   lavender header, search + filter pills (fuel/body type),
   Featured/price/name sorting, grid ⇄ list view toggle,
   hover View Details / Enquire actions, pagination with
   page-size select. Grid collapses to one column on mobile,
   where the list toggle is hidden.
   ══════════════════════════════════════════════════════════════ */

const VEHICLES = [
  { name: "Corolla Cross", variant: "E3", fuel: "Petrol", body: "SUV", trans: "Automatic", year: 2024, price: 4200000, img: "/ascend/corollacross.jpg" },
  { name: "GR Corolla Cross", variant: "GR Sport", fuel: "Petrol", body: "SUV", trans: "Automatic", year: 2024, price: 5800000, img: "/ascend/grcorollacross.jpg" },
  { name: "Corolla Cross", variant: "HYBRID ELECTRIC VEHICLE (HEV)", fuel: "Hybrid", body: "SUV", trans: "CVT", year: 2024, price: 4850000, img: "/ascend/corollacross1.jpg" },
  { name: "FJ Cruiser", variant: "KH", fuel: "Petrol", body: "SUV", trans: "Automatic", year: 2023, price: 6500000, img: "/ascend/fjcruiser.jpg" },
  { name: "Fortuner", variant: "SFX-HI - EURO4", fuel: "Diesel", body: "SUV", trans: "Automatic", year: 2024, price: 7200000, img: "/ascend/fortuner.jpg" },
  { name: "Fortuner", variant: "SFX - K1 E4", fuel: "Diesel", body: "SUV", trans: "Automatic", year: 2024, price: 6900000, img: "/ascend/fortuner1.jpg" },
  { name: "Hilux", variant: "Single Cabin (IW)", fuel: "Diesel", body: "Pickup", trans: "Manual", year: 2024, price: 3800000, img: "/ascend/hilux1.jpg" },
  { name: "Land Cruiser GDJ79", variant: "2.8L Single cab", fuel: "Diesel", body: "Pickup", trans: "Manual", year: 2024, price: 8500000, img: "/ascend/landcruiser1.jpg" },
  { name: "Prado GDJ250", variant: "Luxury", fuel: "Diesel", body: "SUV", trans: "Automatic", year: 2024, price: 11500000, img: "/ascend/Prado.jpg" },
  { name: "RAV4", variant: "2WD", fuel: "Petrol", body: "SUV", trans: "Automatic", year: 2024, price: 5100000, img: "/ascend/rav41.jpg" },
  { name: "Hilux Double Cab", variant: "4×4 SRX", fuel: "Diesel", body: "Pickup", trans: "Automatic", year: 2024, price: 5400000, img: "/ascend/hilux.jpg" },
  { name: "Corolla", variant: "XS CVT", fuel: "Petrol", body: "Sedan", trans: "CVT", year: 2024, price: 3600000, img: "/ascend/corolla.jpg" },
  { name: "Land Cruiser 300", variant: "VX-R Twin Turbo", fuel: "Diesel", body: "SUV", trans: "Automatic", year: 2024, price: 18500000, img: "/ascend/landcruiser.jpg" },
  { name: "RAV4 Hybrid", variant: "AWD GX+", fuel: "Hybrid", body: "SUV", trans: "CVT", year: 2024, price: 5950000, img: "/ascend/rav4.jpg" },
  { name: "Hiace Van", variant: "Commuter GL", fuel: "Diesel", body: "Van", trans: "Manual", year: 2024, price: 4800000, img: "/ascend/hiace.jpg" },
];

const FUEL_TYPES = ["All", "Petrol", "Diesel", "Hybrid"];
const BODY_TYPES = ["All", "SUV", "Pickup", "Sedan", "Van"];
const SORTS = ["Featured", "Price: Low to High", "Price: High to Low", "Name A–Z"];
const PAGE_SIZES = [5, 10, 15, 20];

/* ── palette ────────────────────────────────────────────────── */
const C = {
  pageBg: "#eef1f8",
  panelBg: "#f4f6fb",
  cardBg: "#fbfcfe",
  border: "#e2e6f0",
  heading: "#1c2c47",
  body: "#55617a",
  muted: "#8a93a6",
  green: "#7f9464",
  greenDark: "#6f8455",
  greenText: "#5f7547",
  pill: "#e9edf6",
  avatar: "#5a7fa8",
  imgBg: "linear-gradient(180deg,#f0f0f2 0%,#dfe0e4 100%)",
  serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  sans: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
};

const fmtPrice = (p) => `KES ${p.toLocaleString("en-US")}`;

/* ── icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 15, color = "currentColor" }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "back": return <svg {...p}><path d="M19 12H5m7 7-7-7 7-7" /></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case "filters": return <svg {...p}><path d="M4 6h16M7 12h10m-7 6h4" /></svg>;
    case "sort": return <svg {...p}><path d="m7 4v16m0 0-3-3m3 3 3-3m7-13v16m0-16-3 3m3-3 3 3" transform="scale(0.9) translate(1.3 1.3)" /></svg>;
    case "grid": return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    case "list": return <svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>;
    case "fuel": return <svg {...p}><path d="M3 22h12M4 9h10m-10 13V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18m0-9h2a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0V9l-3-3" /></svg>;
    case "car": return <svg {...p}><path d="M5 11 6.5 6.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0a2 2 0 0 0-2 2v4h2m16-6a2 2 0 0 1 2 2v4h-2m-12 0h8m-8 0v2H5v-2m14 0v2h-2v-2" /></svg>;
    case "gear": return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M19.1 4.9 17 7m-10 10-2.1 2.1" /></svg>;
    case "chevD": return <svg {...p}><path d="m6 9 6 6 6-6" /></svg>;
    case "chevL": return <svg {...p}><path d="m15 18-6-6 6-6" /></svg>;
    case "chevR": return <svg {...p}><path d="m9 18 6-6-6-6" /></svg>;
    case "chevLL": return <svg {...p}><path d="m11 17-5-5 5-5m7 10-5-5 5-5" /></svg>;
    case "chevRR": return <svg {...p}><path d="m6 17 5-5-5-5m7 10 5-5-5-5" /></svg>;
    default: return null;
  }
};

/* ── small pieces ───────────────────────────────────────────── */
const Tag = ({ icon, children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px",
    background: C.pill, border: `1px solid ${C.border}`, borderRadius: 6,
    fontSize: 11.5, color: C.body, fontFamily: C.sans,
  }}>
    <Icon name={icon} size={11} color={C.body} />{children}
  </span>
);

const Pill = ({ active, children, onClick }) => (
  <button onClick={onClick} style={{
    padding: "7px 16px", borderRadius: 999, cursor: "pointer", fontFamily: C.sans,
    fontSize: 12.5, fontWeight: active ? 600 : 500,
    border: `1px solid ${active ? C.green : C.border}`,
    background: active ? C.green : "#fff",
    color: active ? "#fff" : C.body,
  }}>{children}</button>
);

const HoverActions = () => (
  <div className="ascend-actions" style={{ position: "absolute", right: 10, bottom: 10, display: "flex", gap: 8 }}>
    <button style={{
      padding: "7px 12px", borderRadius: 6, border: "none", cursor: "pointer",
      background: "#fff", color: C.heading, fontFamily: C.sans, fontSize: 12, fontWeight: 600,
      boxShadow: "0 2px 8px rgba(15,30,55,0.25)",
    }}>View Details</button>
    <button style={{
      padding: "7px 12px", borderRadius: 6, border: "none", cursor: "pointer",
      background: C.green, color: "#fff", fontFamily: C.sans, fontSize: 12, fontWeight: 600,
      boxShadow: "0 2px 8px rgba(15,30,55,0.25)",
    }}>Enquire</button>
  </div>
);

const ToyotaBadge = () => (
  <span style={{
    position: "absolute", top: 10, left: 10, padding: "4px 12px", borderRadius: 999,
    background: C.green, color: "#fff", fontFamily: C.sans, fontSize: 10, fontWeight: 700,
    letterSpacing: "0.08em",
  }}>TOYOTA</span>
);

/* ── component ──────────────────────────────────────────────── */
export default function AscendMicrosite() {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("All");
  const [body, setBody] = useState("All");
  const [sort, setSort] = useState(SORTS[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const resetPage = () => setPage(1);

  const filtered = useMemo(() => {
    let list = VEHICLES.filter((v) => {
      const q = search.trim().toLowerCase();
      const matchQ = !q || `${v.name} ${v.variant}`.toLowerCase().includes(q);
      const matchF = fuel === "All" || v.fuel === fuel;
      const matchB = body === "All" || v.body === body;
      return matchQ && matchF && matchB;
    });
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "Name A–Z") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, fuel, body, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const pagerBtn = (disabled, active) => ({
    minWidth: 30, height: 30, padding: "0 8px", borderRadius: 6, cursor: disabled ? "default" : "pointer",
    border: `1px solid ${active ? C.green : C.border}`,
    background: active ? C.green : "#fff",
    color: active ? "#fff" : disabled ? "#c4cad8" : C.body,
    fontFamily: C.sans, fontSize: 12.5, fontWeight: 600,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
  });

  return (
    <div style={{ minHeight: "100%", background: C.pageBg, fontFamily: C.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .ascend-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(265px, 1fr)); gap: 20px; }
        .ascend-card .ascend-actions { opacity: 0; transition: opacity .18s ease; }
        .ascend-card:hover .ascend-actions { opacity: 1; }
        .ascend-card:hover { border-color: ${C.green} !important; }
        .ascend-row .ascend-side-actions { visibility: visible; }
        @media (max-width: 640px) {
          .ascend-view-toggle, .ascend-toolbar-label { display: none !important; }
          .ascend-row-actions { flex-direction: column; }
        }
      `}</style>

      {/* ── sticky top ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: C.pageBg, borderBottom: `1px solid ${C.border}` }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={{
              width: 38, height: 38, borderRadius: "50%", border: "none", background: C.green,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Icon name="back" size={17} color="#fff" />
            </button>
            <div>
              <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 19, color: C.heading, lineHeight: 1.15 }}>CFAO Mobility Kenya</div>
              <div style={{ fontSize: 11.5, color: C.muted }}>Official Toyota Dealership</div>
            </div>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: "50%", background: C.avatar, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600,
          }}>C</div>
        </div>

        {/* toolbar */}
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "10px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 360 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}>
                <Icon name="search" size={14} />
              </span>
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                placeholder="Search vehicles..."
                style={{
                  width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 34px",
                  border: `1px solid ${C.border}`, borderRadius: 8, background: "#e9ecf4",
                  fontFamily: C.sans, fontSize: 13, color: C.heading, outline: "none",
                }}
              />
            </div>

            <button onClick={() => setFiltersOpen((v) => !v)} style={{
              display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 16px",
              borderRadius: 8, cursor: "pointer", fontFamily: C.sans, fontSize: 13, fontWeight: 600,
              border: `1px solid ${filtersOpen ? C.green : C.border}`,
              background: filtersOpen ? C.green : "#fff",
              color: filtersOpen ? "#fff" : C.body,
            }}>
              <Icon name="filters" size={14} /><span className="ascend-toolbar-label">Filters</span>
            </button>

            <div style={{ position: "relative" }}>
              <button onClick={() => setSortOpen((v) => !v)} style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 16px",
                borderRadius: 8, cursor: "pointer", fontFamily: C.sans, fontSize: 13, fontWeight: 500,
                border: `1px solid ${C.border}`, background: "#fff", color: C.body,
              }}>
                <Icon name="sort" size={14} /><span className="ascend-toolbar-label">{sort}</span>
              </button>
              {sortOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 60, minWidth: 185,
                  background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(15,30,55,0.14)", padding: 6,
                }}>
                  {SORTS.map((s) => (
                    <button key={s} onClick={() => { setSort(s); setSortOpen(false); resetPage(); }} style={{
                      display: "block", width: "100%", textAlign: "left", padding: "9px 12px",
                      border: "none", borderRadius: 7, cursor: "pointer", fontFamily: C.sans, fontSize: 13,
                      background: s === sort ? "#eaf0e2" : "transparent",
                      color: C.heading, fontWeight: s === sort ? 600 : 400,
                    }}>{s}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="ascend-view-toggle" style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
              {[["grid", "grid"], ["list", "list"]].map(([v, ic]) => (
                <button key={v} onClick={() => setView(v)} style={{
                  width: 36, height: 36, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: view === v ? C.green : "#fff",
                  color: view === v ? "#fff" : C.muted,
                }}>
                  <Icon name={ic} size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* filter panel */}
          {filtersOpen && (
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap", padding: "16px 0 4px" }}>
              {[["Fuel Type", FUEL_TYPES, fuel, (v) => { setFuel(v); resetPage(); }],
                ["Body Type", BODY_TYPES, body, (v) => { setBody(v); resetPage(); }]].map(([label, opts, val, set]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.body, marginBottom: 9 }}>{label}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {opts.map((o) => <Pill key={o} active={val === o} onClick={() => set(o)}>{o}</Pill>)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ fontSize: 12, color: C.muted, padding: "8px 0 12px" }}>{filtered.length} vehicles found</div>
        </div>
      </div>

      {/* ── results ── */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 20px 0" }}>
        {view === "grid" ? (
          <div className="ascend-grid">
            {visible.map((v) => (
              <div key={v.name + v.variant} className="ascend-card" style={{
                background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12,
                overflow: "hidden", transition: "border-color .18s ease",
              }}>
                <div style={{ position: "relative", background: C.imgBg }}>
                  <img src={v.img} alt={`${v.name} ${v.variant}`} style={{ width: "100%", height: 185, objectFit: "cover", display: "block" }} />
                  <ToyotaBadge />
                  <HoverActions />
                </div>
                <div style={{ padding: "14px 15px 15px" }}>
                  <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 17, color: C.heading }}>{v.name}</div>
                  <div style={{ fontSize: 12.5, color: C.body, marginTop: 3 }}>{v.variant}</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap", margin: "11px 0 12px" }}>
                    <Tag icon="fuel">{v.fuel}</Tag>
                    <Tag icon="car">{v.body}</Tag>
                  </div>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 11, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12.5, color: C.body }}>{v.year}</span>
                    <span style={{ fontSize: 15.5, fontWeight: 700, color: C.greenText }}>{fmtPrice(v.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {visible.map((v) => (
              <div key={v.name + v.variant} className="ascend-card" style={{
                background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12,
                padding: 13, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
                transition: "border-color .18s ease",
              }}>
                <div style={{ position: "relative", background: C.imgBg, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                  <img src={v.img} alt={`${v.name} ${v.variant}`} style={{ width: 155, height: 92, objectFit: "cover", display: "block" }} />
                  <span style={{
                    position: "absolute", top: 6, left: 6, padding: "3px 9px", borderRadius: 999,
                    background: C.green, color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                  }}>TOYOTA</span>
                </div>
                <div style={{ flex: 1, minWidth: 170 }}>
                  <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 16.5, color: C.heading }}>{v.name}</div>
                  <div style={{ fontSize: 12.5, color: C.body, marginTop: 2 }}>{v.variant}</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap", margin: "8px 0" }}>
                    <Tag icon="fuel">{v.fuel}</Tag>
                    <Tag icon="car">{v.body}</Tag>
                    <Tag icon="gear">{v.trans}</Tag>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.greenText }}>{fmtPrice(v.price)}</div>
                </div>
                <div className="ascend-row-actions" style={{ display: "flex", gap: 9 }}>
                  <button style={{
                    padding: "9px 14px", borderRadius: 7, border: "none", cursor: "pointer",
                    background: C.green, color: "#fff", fontFamily: C.sans, fontSize: 12, fontWeight: 600,
                  }}>View Details</button>
                  <button style={{
                    padding: "9px 14px", borderRadius: 7, cursor: "pointer",
                    border: `1px solid ${C.border}`, background: "#fff", color: C.body,
                    fontFamily: C.sans, fontSize: 12, fontWeight: 600,
                  }}>Enquire</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <div style={{ textAlign: "center", color: C.muted, padding: "50px 0", fontSize: 14 }}>
            No vehicles match your search.
          </div>
        )}

        {/* ── pagination ── */}
        <div style={{
          borderTop: `1px solid ${C.border}`, marginTop: 26, padding: "16px 0 30px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: C.body }}>
            <span>{filtered.length === 0 ? 0 : start + 1}–{Math.min(start + pageSize, filtered.length)} of {filtered.length}</span>
            <span style={{ color: C.muted }}>Show</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); resetPage(); }}
              style={{
                padding: "5px 8px", borderRadius: 6, border: `1px solid ${C.border}`,
                background: "#fff", fontFamily: C.sans, fontSize: 12.5, color: C.heading, cursor: "pointer",
              }}
            >
              {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button style={pagerBtn(safePage === 1)} disabled={safePage === 1} onClick={() => setPage(1)}><Icon name="chevLL" size={13} /></button>
            <button style={pagerBtn(safePage === 1)} disabled={safePage === 1} onClick={() => setPage(safePage - 1)}><Icon name="chevL" size={13} /></button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button key={n} style={pagerBtn(false, n === safePage)} onClick={() => setPage(n)}>{n}</button>
            ))}
            <button style={pagerBtn(safePage === pageCount)} disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)}><Icon name="chevR" size={13} /></button>
            <button style={pagerBtn(safePage === pageCount)} disabled={safePage === pageCount} onClick={() => setPage(pageCount)}><Icon name="chevRR" size={13} /></button>
          </div>
        </div>
      </div>

      {/* ── footer ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, background: C.panelBg, padding: "20px 20px 26px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: C.body }}>© 2026 CFAO Mobility Kenya. All rights reserved.</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 5 }}>Authorized Toyota dealer — Genuine vehicles, genuine service.</div>
      </div>
    </div>
  );
}
