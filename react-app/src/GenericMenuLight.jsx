import { useState, useEffect } from "react";

/* ============================================================================
   GenericMenuLight — restaurant menu card ("Burger Bliss")
   Pixel-faithful rebuild of:
     CardDesigns/genericCard/genericlightdesktop.mp4
     CardDesigns/genericCard/genericlightmobile.mp4

   A warm, editorial digital menu on a cream canvas with a wine-red accent:
     • Hero      — full-bleed food image, serif wordmark, tagline
     • Nav       — Food / Drinks / Dessert tabs (underline active)
     • Menu      — script section headings + item rows (name, badges, price)
     • Footer    — crossed-utensils mark + closing line

   Both DESKTOP and MOBILE layouts live in this one file. A Desktop / Mobile
   pill (top-right, mirroring the recording) switches the preview frame; the
   layout also reflows automatically to the real viewport width.
   Self-contained — inline styles, internal state.
   ========================================================================== */

// ─── Fonts ────────────────────────────────────────────────────────────────────
function useFontLoader() {
  useEffect(() => {
    const id = "genericmenu-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?" +
      "family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600;1,700" +
      "&family=Inter:wght@400;500;600;700" +
      "&display=swap";
    document.head.appendChild(link);
  }, []);
}
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

// ─── Palette (light) ──────────────────────────────────────────────────────────
const C = {
  page:      "#F5EEE4",
  panel:     "#F1E6D8",   // subtle rounded panel for alternating sections
  panelBd:   "#EADBC9",
  navBg:     "#F6EFE6",
  navBd:     "#E7D9C7",

  ink:       "#2C1D14",   // item names / headings
  head:      "#2A1A12",
  body:      "#957a5f",   // descriptions
  bodyDim:   "#A8907A",
  price:     "#9B4A3F",   // wine-red prices
  accent:    "#A83E3C",   // active tab, POPULAR / NEW
  accentBd:  "#C98A80",
  veg:       "#7A6A2E",   // "V" badge
  vegBg:     "#EFE7CF",
  vegBd:     "#D8C89A",
  rule:      "#E4D4C1",   // item separators
  deco:      "#D8C4AE",   // section-heading flourish lines
  heroText:  "#FBF3EA",
  heroSub:   "#EAD9C6",
};

// ─── Palette (dark) — for the moon toggle ─────────────────────────────────────
const D = {
  page:      "#221712",
  panel:     "#2C1E17",
  panelBd:   "#3A281F",
  navBg:     "#1E1410",
  navBd:     "#33231B",

  ink:       "#F3E7DA",
  head:      "#F6ECE0",
  body:      "#B49B84",
  bodyDim:   "#8E7761",
  price:     "#E0928A",
  accent:    "#E0918B",
  accentBd:  "#7A4A44",
  veg:       "#C7B36A",
  vegBg:     "#33291A",
  vegBd:     "#4A3C24",
  rule:      "#3A2A20",
  deco:      "#4A3628",
  heroText:  "#FBF3EA",
  heroSub:   "#EAD9C6",
};

// hero image — stand-in for the bundled photo (dark bar, burger + smoothie)
const HERO_IMG =
  "radial-gradient(120% 90% at 78% 60%, rgba(214,150,74,0.5) 0%, rgba(60,32,18,0.2) 42%, transparent 62%), " +
  "radial-gradient(60% 60% at 74% 40%, rgba(240,210,150,0.35) 0%, transparent 60%), " +
  "linear-gradient(180deg, #241812 0%, #3A241799 40%, #140C08 100%)";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MENUS = {
  food: [
    {
      title: "Breakfast & Brunch",
      items: [
        { name: "Classic Breakfast", badge: "POPULAR", desc: "Bacon, fried egg & American cheddar on toasted sourdough bread with fresh herbs.", single: "$8.95", double: "$12.95" },
        { name: "Farmer's Breakfast", desc: "Sausage patty, scrambled eggs, cheddar & hash browns with grilled tomatoes.", single: "$9.95", double: "$14.95" },
        { name: "Big Ben", desc: "Bacon, sausage, eggs, cheddar & tomato on a toasted English muffin stack.", single: "$10.95", double: "$15.95" },
        { name: "Buffalo Chicken & Blue Cheese", badge: "NEW", desc: "Crispy buffalo chicken, blue cheese, ranch & baby spinach on brioche bun.", single: "$10.95", double: "$15.95" },
        { name: "Mediterranean", veg: true, desc: "Feta, spinach, tomato, olives & roasted peppers with zaatar seasoning.", single: "$9.95", double: "$14.95" },
        { name: "Shakshuka Skillet", desc: "Eggs poached in simmering tomato sauce with peppers, onions & cumin.", single: "$10.95", double: "$15.95" },
      ],
    },
    {
      title: "Toasted Sandwiches",
      items: [
        { name: "Bacon & Egg", desc: "Crispy applewood bacon, fried egg & butter on toasted sourdough.", price: "$8.95" },
        { name: "Cheddar & Tomato", veg: true, desc: "Melted sharp cheddar with vine-ripened tomatoes on multigrain bread.", price: "$7.95" },
        { name: "Chicken Salad Melt", desc: "House-made chicken salad with melted cheddar and cracked black pepper.", price: "$10.95" },
        { name: "Bacon, Avocado & Feta", badge: "POPULAR", desc: "Crispy bacon, fresh avocado, feta cheese & tomato relish on sourdough.", price: "$11.95" },
        { name: "Steak & Egg", desc: "Grilled sirloin, fried egg, caramelized onions & provolone on ciabatta.", single: "$13.95", double: "$19.95" },
      ],
    },
  ],
  drinks: [
    {
      title: "Smoothies",
      items: [
        { name: "Green Monster", veg: true, desc: "Spinach, avocado, cucumber and ginger blended in carrot juice.", price: "$8.95" },
        { name: "Berry Burst", veg: true, desc: "Strawberries, blueberries, banana and chia seeds blended with almond milk.", price: "$9.25" },
        { name: "Tropical Glow", veg: true, desc: "Mango, pineapple, coconut and fresh mint blended with orange juice.", price: "$8.75" },
        { name: "Nutty Power", veg: true, desc: "Peanut butter, rolled oats, banana and Medjool dates blended with oat milk.", price: "$9.50" },
        { name: "Cocoa Banana", desc: "Banana, cocoa, Greek yogurt and honey blended with whole milk.", price: "$8.95" },
        { name: "Coffee Buzz", badge: "POPULAR", veg: true, desc: "Double espresso, banana and Medjool dates blended with oat milk.", price: "$9.50" },
      ],
    },
    {
      title: "Coffee & Tea",
      items: [
        { name: "Espresso", desc: "Rich, bold single shot of our house blend espresso.", price: "$3.50" },
        { name: "Cappuccino", desc: "Espresso with steamed milk foam and a dusting of cocoa.", price: "$4.50" },
        { name: "Latte", desc: "Smooth espresso with velvety steamed milk and latte art.", price: "$4.75" },
        { name: "Iced Americano", desc: "Double espresso over ice with cold filtered water.", price: "$4.25" },
        { name: "Matcha Latte", veg: true, desc: "Ceremonial grade matcha with steamed oat milk and honey.", price: "$5.50" },
        { name: "Chai Latte", desc: "Spiced black tea concentrate with steamed milk and cinnamon.", price: "$5.25" },
      ],
    },
  ],
  dessert: [
    {
      title: "Warm Desserts",
      items: [
        { name: "Apple Crumble", desc: "Warm cinnamon apples topped with a buttery oat crumble, served with vanilla ice cream.", price: "$7.95" },
        { name: "Chocolate Lava Cake", badge: "POPULAR", desc: "Warm chocolate cake with a molten center, served with vanilla ice cream.", price: "$9.95" },
        { name: "Sticky Toffee Pudding", desc: "Moist date cake finished with warm toffee sauce and whipped cream.", price: "$8.95" },
        { name: "Bread Pudding", desc: "Warm vanilla bread pudding with bourbon caramel sauce.", price: "$8.95" },
        { name: "Cinnamon Sugar Pancakes", desc: "Fluffy pancakes tossed in cinnamon sugar, served with whipped butter and maple syrup.", price: "$7.95" },
        { name: "Warm Brownie Sundae", desc: "Warm fudge brownie topped with vanilla ice cream, hot fudge and whipped cream.", price: "$9.95" },
        { name: "Peach Cobbler", desc: "Sweet baked peaches with a buttery biscuit topping, served with vanilla ice cream.", price: "$8.95" },
      ],
    },
    {
      title: "Cold & Fresh",
      items: [
        { name: "Vanilla Bean Cheesecake", badge: "POPULAR", desc: "Creamy baked cheesecake on a graham crust with berry compote.", price: "$8.95" },
        { name: "Tiramisu", desc: "Espresso-soaked ladyfingers layered with mascarpone and cocoa.", price: "$9.25" },
        { name: "Lemon Tart", veg: true, desc: "Zesty lemon curd in a crisp pastry shell with torched meringue.", price: "$7.95" },
        { name: "Affogato", desc: "Vanilla gelato drowned in a shot of hot espresso.", price: "$6.50" },
        { name: "Berry Pavlova", veg: true, desc: "Crisp meringue with whipped cream and fresh seasonal berries.", price: "$8.50" },
      ],
    },
  ],
};

const TABS = [
  { id: "food", label: "Food Menu" },
  { id: "drinks", label: "Drinks Menu" },
  { id: "dessert", label: "Dessert Menu" },
];

// ─── Viewport hook ────────────────────────────────────────────────────────────
function useViewportNarrow(bp = 720) {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w <= bp;
}

// ─── Badges ───────────────────────────────────────────────────────────────────
function TagBadge({ label, t }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "1px 7px", borderRadius: 4,
      border: `1px solid ${t.accentBd}`, color: t.accent, background: "transparent",
      fontFamily: SANS, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em",
      lineHeight: 1.6, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}
function VegBadge({ t }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 17, height: 17, borderRadius: 3, border: `1px solid ${t.vegBd}`,
      background: t.vegBg, color: t.veg, fontFamily: SANS, fontSize: 10, fontWeight: 700,
    }}>V</span>
  );
}

// ─── Price cell ───────────────────────────────────────────────────────────────
function Price({ item, t }) {
  if (item.double) {
    return (
      <div style={{ textAlign: "right", fontFamily: SANS, fontSize: 12.5, color: t.price, lineHeight: 1.55, whiteSpace: "nowrap" }}>
        <div><span style={{ color: t.bodyDim }}>Single</span> {item.single}</div>
        <div><span style={{ color: t.bodyDim }}>Double</span> {item.double}</div>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "right", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: t.price, whiteSpace: "nowrap" }}>
      {item.price}
    </div>
  );
}

// ─── Menu item row ────────────────────────────────────────────────────────────
function MenuItem({ item, t, narrow, last }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: narrow ? 12 : 24,
      padding: narrow ? "14px 0" : "16px 0",
      borderBottom: last ? "none" : `1px solid ${t.rule}`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 5 }}>
          <span style={{ fontFamily: SANS, fontSize: narrow ? 14.5 : 15.5, fontWeight: 700, color: t.ink, letterSpacing: "-0.01em" }}>{item.name}</span>
          {item.badge && <TagBadge label={item.badge} t={t} />}
          {item.veg && <VegBadge t={t} />}
        </div>
        <div style={{ fontFamily: SANS, fontSize: narrow ? 12.5 : 13.5, color: t.body, lineHeight: 1.5, maxWidth: 560 }}>{item.desc}</div>
      </div>
      {/* leader gap (desktop) */}
      {!narrow && <div style={{ flex: "0 0 60px", alignSelf: "center", height: 1, background: t.rule }} />}
      <div style={{ flexShrink: 0, paddingTop: 1 }}>
        <Price item={item} t={t} />
      </div>
    </div>
  );
}

// ─── Section heading with flourish ────────────────────────────────────────────
function SectionHeading({ title, t, narrow }) {
  const line = <span style={{ height: 1, width: narrow ? 28 : 56, background: t.deco }} />;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: narrow ? 12 : 20, margin: narrow ? "6px 0 16px" : "8px 0 22px" }}>
      {line}
      <h2 style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: narrow ? 22 : 30, color: t.head, letterSpacing: "0.005em", whiteSpace: "nowrap" }}>{title}</h2>
      {line}
    </div>
  );
}

// ─── Section (alternating panel background) ───────────────────────────────────
function Section({ section, t, narrow, panel }) {
  return (
    <div style={{
      maxWidth: 720, margin: "0 auto", marginBottom: narrow ? 8 : 12,
      padding: panel ? (narrow ? "22px 18px" : "34px 44px") : (narrow ? "16px 4px" : "24px 44px"),
      background: panel ? t.panel : "transparent",
      border: panel ? `1px solid ${t.panelBd}` : "none",
      borderRadius: panel ? 16 : 0,
    }}>
      <SectionHeading title={section.title} t={t} narrow={narrow} />
      <div>
        {section.items.map((it, i) => (
          <MenuItem key={it.name} item={it} t={t} narrow={narrow} last={i === section.items.length - 1} />
        ))}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ t, narrow }) {
  return (
    <div style={{
      position: "relative", height: narrow ? 200 : 336, background: HERO_IMG,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "0 24px", overflow: "hidden",
    }}>
      <h1 style={{
        margin: 0, fontFamily: SERIF, fontWeight: 800, color: t.heroText,
        fontSize: narrow ? 40 : 64, letterSpacing: "-0.01em", lineHeight: 1,
        textShadow: "0 2px 20px rgba(0,0,0,0.45)",
      }}>Burger Bliss</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: narrow ? 12 : 16 }}>
        <span style={{ height: 1, width: narrow ? 20 : 30, background: "rgba(240,225,205,0.6)" }} />
        <span style={{ fontFamily: SANS, fontSize: narrow ? 13 : 15, fontWeight: 600, color: t.heroSub, letterSpacing: "0.01em", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
          Crafted with passion, served with love
        </span>
        <span style={{ height: 1, width: narrow ? 20 : 30, background: "rgba(240,225,205,0.6)" }} />
      </div>
    </div>
  );
}

// ─── Nav tabs ─────────────────────────────────────────────────────────────────
function NavTabs({ tab, onTab, t, narrow }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 5, background: t.navBg,
      borderBottom: `1px solid ${t.navBd}`,
      display: "flex", justifyContent: "center", gap: narrow ? 18 : 40,
      padding: narrow ? "14px 12px" : "16px 24px",
    }}>
      {TABS.map(x => {
        const on = tab === x.id;
        return (
          <button key={x.id} onClick={() => onTab(x.id)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "2px 0 6px",
            fontFamily: SANS, fontSize: narrow ? 11.5 : 13, fontWeight: on ? 700 : 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: on ? t.accent : t.bodyDim,
            borderBottom: `2px solid ${on ? t.accent : "transparent"}`,
            transition: "color 0.15s",
          }}>{x.label}</button>
        );
      })}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ t, narrow }) {
  return (
    <div style={{ background: t.panel, borderTop: `1px solid ${t.panelBd}`, padding: narrow ? "36px 20px" : "52px 24px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 14 }}>
        <span style={{ height: 1, width: narrow ? 40 : 70, background: t.deco }} />
        {/* crossed utensils */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.bodyDim} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3l7 7M4 10l6-1" transform="rotate(0 12 12)" />
          <path d="M20 3l-8 8M18.5 4.5l-3 3" />
          <path d="M4 3c-1 2-1 4 0 5s3 1 4 0" />
        </svg>
        <span style={{ height: 1, width: narrow ? 40 : 70, background: t.deco }} />
      </div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: narrow ? 20 : 26, color: t.head }}>Every bite tells a story</div>
      <div style={{ marginTop: 10, fontFamily: SANS, fontSize: narrow ? 12.5 : 13.5, color: t.bodyDim, letterSpacing: "0.01em" }}>
        Fresh ingredients · Made to order · All day breakfast
      </div>
    </div>
  );
}

// ─── Preview controls (Desktop / Mobile pill + dark toggle) ───────────────────
function PreviewControls({ device, setDevice, dark, setDark }) {
  return (
    <div style={{ position: "absolute", top: 16, right: 16, zIndex: 20, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", background: "rgba(255,255,255,0.14)", borderRadius: 999, padding: 3, backdropFilter: "blur(6px)" }}>
        {[["desktop", "Desktop", "🖵"], ["mobile", "Mobile", "▢"]].map(([id, label]) => {
          const on = device === id;
          return (
            <button key={id} onClick={() => setDevice(id)} style={{
              display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer",
              padding: "5px 12px", borderRadius: 999, fontFamily: SANS, fontSize: 12, fontWeight: 600,
              background: on ? C.accent : "transparent", color: on ? "#fff" : "rgba(255,255,255,0.7)",
              transition: "background 0.15s, color 0.15s",
            }}>
              <span style={{ fontSize: 11 }}>{id === "desktop" ? "🖥" : "📱"}</span>{label}
            </button>
          );
        })}
      </div>
      <button onClick={() => setDark(v => !v)} title="Toggle theme" style={{
        width: 34, height: 34, borderRadius: 999, border: "none", cursor: "pointer",
        background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={dark ? "#C9922E" : "#3A2A1E"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {dark
            ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></>
            : <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>}
        </svg>
      </button>
    </div>
  );
}

// ─── The menu card body (shared by desktop & mobile frames) ───────────────────
function MenuCard({ t, narrow, showControls, device, setDevice, dark, setDark }) {
  const [tab, setTab] = useState("food");
  const sections = MENUS[tab];
  return (
    <div style={{ background: t.page, minHeight: "100%", position: "relative" }}>
      {showControls && <PreviewControls device={device} setDevice={setDevice} dark={dark} setDark={setDark} t={t} />}
      <Hero t={t} narrow={narrow} />
      <NavTabs tab={tab} onTab={setTab} t={t} narrow={narrow} />
      <div style={{ padding: narrow ? "22px 0 32px" : "36px 0 48px" }}>
        {sections.map((s, i) => (
          <Section key={s.title} section={s} t={t} narrow={narrow} panel={i % 2 === 1} />
        ))}
      </div>
      <Footer t={t} narrow={narrow} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function GenericMenuLight() {
  useFontLoader();
  const autoNarrow = useViewportNarrow();
  const [dark, setDark] = useState(false);
  // device preview: "desktop" | "mobile". Defaults to real viewport.
  const [device, setDevice] = useState(autoNarrow ? "mobile" : "desktop");
  const t = dark ? D : C;

  const mobile = device === "mobile";

  // On a wide viewport the "mobile" choice renders inside a centered phone frame.
  // On a narrow viewport we always render full-bleed mobile.
  const phoneFrame = mobile && !autoNarrow;

  return (
    <div style={{ position: "absolute", inset: 0, overflowY: "auto", background: dark ? "#191029" : "#EFE7DB", fontFamily: SANS }}>
      {phoneFrame ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "28px 16px" }}>
          <div style={{
            width: 390, borderRadius: 30, overflow: "hidden", position: "relative",
            border: `10px solid ${dark ? "#0E0A16" : "#241a13"}`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.35)", background: t.page,
          }}>
            <MenuCard t={t} narrow showControls device={device} setDevice={setDevice} dark={dark} setDark={setDark} />
          </div>
        </div>
      ) : (
        <MenuCard t={t} narrow={autoNarrow || mobile} showControls device={device} setDevice={setDevice} dark={dark} setDark={setDark} />
      )}
    </div>
  );
}
