import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════
// VARIANT 1: "Chalk & Cream" — Warm editorial light design
// Fonts: DM Serif Display (display) + Karla (body)
// Palette: Warm cream base, terracotta accent, charcoal ink
// Signature: Dot-leader pricing, italic section dividers, soft shadows
// ═══════════════════════════════════════════════════════════════════

const cardData = {"id":"1b9265c9-f81d-4d6e-87ab-bfc37bbacda3","cardName":"WinterMenu","genericDetailsVisible":true,"genericImagesVisible":true,"genericBlocksVisible":true,"cardBackgroundColor":null,"buttonColor":null,"buttonTextColor":null,"tabHeadingColor":null,"mainHeadingColor":null,"itemHeadingColor":null,"itemValueColor":null,"itemDescriptionColor":null,"deviderLineColor":null,"tabHeadingNotSelectedColor":null,"blockHeadingColor":null,"details":{"logo":"https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-1b9265c9-f81d-4d6e-87ab-bfc37bbacda3/21af43825bd34055b142886cb6317463_wintermenu.jpg","description":"Test description","details":"Test details","information":"Test Information","enquireButton":true,"enquireButtonText":"Contact us"},"cardBlocks":[{"id":"0704ad0e","tabName":"Food Menu","tabNumber":0,"title":"Breakfast & Brunch","sort":0,"propertyRows":[{"id":"1c9b627f","heading":"Classic","headingValue":"Single R 69.00 | Double R 112.00","headingDescription":"Topped with hickory ham. Served with grilled tomato & a hash brown. [hot] [veg] [gf] [vegan]","sort":0},{"id":"476651e5","heading":"South African","headingValue":"Single R 75.00 | Double R 127.00","headingDescription":"Topped with a boerewors patty & corn chakalaka.","sort":1},{"id":"0e9a54c6","heading":"Big Ben","headingValue":"Single R 89.00 | Double R 142.00","headingDescription":"Topped with baby spinach, grilled tomato, hash brown, cheddar, hickory ham, back bacon & a battered onion ring.","sort":2},{"id":"4a925cba","heading":"Buffalo Chicken & Blue Cheese","headingValue":"Single R 79.00 | Double R 125.00","headingDescription":"Sesame-crusted chicken strips coated in hot sauce, blue cheese crumbles & an extra drizzle of hot sauce.","sort":3},{"id":"15ce16bd","heading":"Mediterranean","headingValue":"Single R 74.00 | Double R 119.00","headingDescription":"Roasted peppers, feta, olives, basil pesto, grilled tomato & a hash brown. [veg]","sort":4},{"id":"914b4cc2","heading":"Shakshuka Skillet","headingValue":"Single R 78.00 | Double R 120.00","headingDescription":"Spiced tomato-pepper sauce with onions, poached eggs, fresh herbs & toasted sourdough. (GF without toast)","sort":5},{"id":"bcf263ae","heading":"Avo Smash","headingValue":"Single R 82.00 | Double R 135.00","headingDescription":"Smashed avocado, lemon zest, chili flakes, poached egg & microgreens on toast. [veg]","sort":6},{"id":"e6a418fa","heading":"Halloumi & Roast Veg","headingValue":"Single R 79.00 | Double R 128.00","headingDescription":"Griddled halloumi, roasted courgette & peppers, basil oil, grilled tomato & a hash brown. [veg] [gf]","sort":7},{"id":"44074306","heading":"Pap & Wors Breakfast","headingValue":"Single R 86.00 | Double R 139.00","headingDescription":"Creamy mielie pap, boerewors bites, chakalaka, fried egg & crispy onion. (SA classic)","sort":8}]},{"id":"6c571827","tabName":"Food Menu","tabNumber":0,"title":"Toasted Sandwiches","sort":1,"propertyRows":[{"id":"eac53bcd","heading":"Back Bacon & Egg","headingValue":"150","headingDescription":"","sort":0},{"id":"bdf69ac8","heading":"Cheddar and Tomato","headingValue":"R 79","headingDescription":"","sort":1},{"id":"3bbd7b19","heading":"Chicken Mayo","headingValue":"R 89","headingDescription":"","sort":2},{"id":"1489e733","heading":"Bacon, Avo & Feta","headingValue":"R 109","headingDescription":"Crispy bacon, avocado, feta & tomato relish.","sort":3},{"id":"639207da","heading":"Tomato, Mozzarella & Basil","headingValue":"R 84","headingDescription":"Melted mozzarella, fresh tomato & basil pesto. [veg]","sort":4},{"id":"8b1349f4","heading":"Steak, Onion & Cheddar","headingValue":"R 119","headingDescription":"Thin-sliced steak, caramelised onion & mature cheddar.","sort":5},{"id":"33642513","heading":"Tuna Mayo & Pickle","headingValue":"R 96","headingDescription":"Tuna mayo, dill pickle & pepper.","sort":6},{"id":"ff65b003","heading":"Roast Veg & Pesto","headingValue":"R 89","headingDescription":"Roasted peppers, marrows, onion & basil pesto. [veg]","sort":7}]},{"id":"ef5e2878","tabName":"Drinks Menu","tabNumber":1,"title":"Smoothies","sort":0,"propertyRows":[{"id":"b0f60a22","heading":"Green Monster","headingValue":"R 64","headingDescription":"Spinach, Avo, Cucumber and Ginger blended in carrot juice","sort":0},{"id":"84897a9e","heading":"Berry Burst","headingValue":"R 65","headingDescription":"Strawberries, Blueberries, Banana and Chia Seeds blended in almond milk","sort":1},{"id":"4eecfc84","heading":"Tropical Glow","headingValue":"R 60","headingDescription":"Mango, Pineapple, Coconut and Mint blended in orange juice","sort":2},{"id":"e08c2993","heading":"Nutty Power","headingValue":"R 66","headingDescription":"Peanut Butter, Oats, Banana and Dates blended in oat milk","sort":3},{"id":"17995395","heading":"Cocoa Banana","headingValue":"R 62","headingDescription":"Banana, cocoa, yoghurt & honey blended with milk.","sort":4},{"id":"87d5bb0a","heading":"Coffee Buzz","headingValue":"R 66","headingDescription":"Double espresso, banana & dates blended in oat milk.","sort":5},{"id":"f2256bb3","heading":"Citrus Cleanse","headingValue":"R 63","headingDescription":"Orange, grapefruit, lemon, ginger & turmeric blended with ice.","sort":6},{"id":"12055cab","heading":"Carrot Cake","headingValue":"R 64","headingDescription":"Carrot, pineapple, banana & cinnamon blended in oat milk. [veg]","sort":7}]},{"id":"b6107080","tabName":"Dessert Menu","tabNumber":2,"title":"Warm Desserts","sort":0,"propertyRows":[{"id":"1ce7727d","heading":"Malva","headingValue":"R 44","headingDescription":"Traditional warm pudding","sort":0},{"id":"c8a7960f","heading":"Custard","headingValue":"R 30","headingDescription":"Topping for just about anything","sort":1},{"id":"337d5717","heading":"Cape Brandy Pudding","headingValue":"R 52","headingDescription":"Warm date pudding soaked in brandy syrup with vanilla custard.","sort":2},{"id":"76847cdc","heading":"Apple Crumble","headingValue":"R 48","headingDescription":"Buttery crumble over cinnamon apples, served with custard.","sort":3},{"id":"31b4fe98","heading":"Chocolate Fondant","headingValue":"R 58","headingDescription":"Warm molten-centre chocolate cake with vanilla ice cream.","sort":4},{"id":"d8b36888","heading":"Sticky Toffee Malva","headingValue":"R 49","headingDescription":"Malva pudding finished with a sticky toffee glaze.","sort":5},{"id":"e6d86a3d","heading":"Cinnamon Pancakes","headingValue":"R 46","headingDescription":"Warm pancakes with cinnamon-sugar & lemon, add custard +R 10.","sort":6}]},{"id":"2fe54c41","tabName":"HenryDemo","tabNumber":3,"title":"asdfsadf","sort":0,"propertyRows":[{"id":"bc27b567","heading":"asdf","headingValue":"asdf","headingDescription":"asdf","sort":0},{"id":"7f7771e9","heading":"dfgh","headingValue":"dfgh","headingDescription":"dfgh","sort":1}]},{"id":"c8534872","tabName":"Claras Menu","tabNumber":4,"title":"Caps","sort":0,"propertyRows":[{"id":"602c7a03","heading":"Blue Cap","headingValue":"100","headingDescription":"fdlkdljabsdludbjsadv","sort":0}]},{"id":"59842af7","tabName":"HenryDemo","tabNumber":3,"title":"yyy","sort":1,"propertyRows":[{"id":"fbaf8638","heading":"yt","headingValue":"rt","headingDescription":"rt","sort":0}]},{"id":"71ac9604","tabName":"Food Menu","tabNumber":0,"title":"","sort":2,"propertyRows":[]}]};

/* ── Helpers ─────────────────────────────────────────────── */

const tagMap = {
  "[veg]":   { label: "V",  bg: "#E8F5E8", color: "#2D6A2D", title: "Vegetarian" },
  "[vegan]": { label: "Ve", bg: "#C8E6C9", color: "#1B5E20", title: "Vegan" },
  "[gf]":    { label: "GF", bg: "#FFF3E0", color: "#E65100", title: "Gluten Free" },
  "[hot]":   { label: "\ud83c\udf36\ufe0f", bg: "#FFEAEA", color: "#D32F2F", title: "Spicy" },
};

function parseTags(desc) {
  if (!desc) return { clean: "", tags: [] };
  let clean = desc;
  const tags = [];
  Object.entries(tagMap).forEach(([key, val]) => {
    if (clean.toLowerCase().includes(key)) {
      tags.push(val);
      clean = clean.replace(new RegExp("\\s*\\[" + key.slice(1, -1) + "\\]", "gi"), "");
    }
  });
  return { clean: clean.trim(), tags };
}

function groupByTab(blocks) {
  const map = {};
  const order = [];
  blocks.forEach((b) => {
    if (!map[b.tabName]) { map[b.tabName] = []; order.push(b.tabName); }
    map[b.tabName].push(b);
  });
  Object.values(map).forEach((s) => s.sort((a, b) => a.sort - b.sort));
  return { map, order };
}

/* ── Theme ───────────────────────────────────────────────── */

const C = {
  bg: "#FAF7F2", surface: "#FFFFFF", cream: "#F5F0E8",
  ink: "#2C2417", sub: "#8A7E6D", muted: "#B8AFA3",
  border: "#E8E0D4", borderLight: "#F0EBE3",
  accent: "#C45D3E",
};
const F = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'Karla', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

/* ── Atoms ───────────────────────────────────────────────── */

function Tag({ tag }) {
  return (
    <span title={tag.title} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "1px 5px", borderRadius: 3, fontSize: 9, fontWeight: 700,
      background: tag.bg, color: tag.color, fontFamily: F.body,
      letterSpacing: "0.02em", lineHeight: "15px",
    }}>{tag.label}</span>
  );
}

function MenuRow({ row, idx }) {
  const { clean, tags } = parseTags(row.headingDescription);
  return (
    <div style={{
      padding: "13px 0",
      borderBottom: `1px solid ${cardData.deviderLineColor || C.borderLight}`,
      animation: "fadeUp 0.35s ease both",
      animationDelay: `${idx * 0.03}s`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 14.5, fontWeight: 700, color: cardData.itemHeadingColor || C.ink, fontFamily: F.body, lineHeight: 1.3 }}>
          {row.heading}
        </span>
        {tags.length > 0 && (
          <span style={{ display: "inline-flex", gap: 3, marginLeft: 3, flexShrink: 0 }}>
            {tags.map((t, i) => <Tag key={i} tag={t} />)}
          </span>
        )}
        {/* Dot leader */}
        <span style={{ flex: 1, borderBottom: `1.5px dotted ${C.border}`, margin: "0 6px", minWidth: 16, alignSelf: "flex-end", marginBottom: 3 }} />
        <span style={{
          fontSize: 12.5, fontWeight: 600, color: cardData.itemValueColor || C.accent,
          fontFamily: F.mono, whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "-0.02em",
        }}>
          {row.headingValue}
        </span>
      </div>
      {clean && (
        <p style={{
          fontSize: 12.5, color: cardData.itemDescriptionColor || C.sub,
          margin: "4px 0 0", lineHeight: 1.55, fontFamily: F.body, paddingRight: 36,
        }}>{clean}</p>
      )}
    </div>
  );
}

function SectionBlock({ block }) {
  if (!block.title && (!block.propertyRows || block.propertyRows.length === 0)) return null;
  return (
    <div style={{ marginBottom: 30 }}>
      {block.title && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 2 }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.border}, transparent)` }} />
          <h3 style={{
            fontSize: 22, fontWeight: 400, color: cardData.blockHeadingColor || C.ink,
            fontFamily: F.display, margin: 0, fontStyle: "italic", whiteSpace: "nowrap",
          }}>{block.title}</h3>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${C.border}, transparent)` }} />
        </div>
      )}
      {[...block.propertyRows].sort((a, b) => a.sort - b.sort).map((row, idx) => (
        <MenuRow key={row.id} row={row} idx={idx} />
      ))}
    </div>
  );
}

/* ── Main Card ───────────────────────────────────────────── */

export default function GenericCardLight() {
  const { map, order } = groupByTab(cardData.cardBlocks);
  const [activeTab, setActiveTab] = useState(order[0]);
  const d = cardData.details;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", justifyContent: "center", padding: "24px 12px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroIn { from { opacity:0; transform:scale(1.03); } to { opacity:1; transform:scale(1); } }
        .lt-tab:hover { color: ${C.ink} !important; }
      `}</style>

      <div style={{
        width: "100%", maxWidth: 440,
        background: cardData.cardBackgroundColor || C.surface,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 4px 32px rgba(44,36,23,0.07), 0 1px 3px rgba(44,36,23,0.04)",
      }}>

        {/* ── Hero Image ────────────────────────────────── */}
        {cardData.genericImagesVisible && d.logo && (
          <div style={{ position: "relative", overflow: "hidden", animation: "heroIn 0.6s ease" }}>
            <img src={d.logo} alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(transparent, ${cardData.cardBackgroundColor || C.surface})` }} />
          </div>
        )}

        {/* ── Card Details ──────────────────────────────── */}
        {cardData.genericDetailsVisible && (
          <div style={{ padding: "16px 28px 4px", textAlign: "center" }}>
            {d.description && (
              <h2 style={{
                fontSize: 28, fontWeight: 400, color: cardData.mainHeadingColor || C.ink,
                fontFamily: F.display, margin: "0 0 6px",
              }}>{d.description}</h2>
            )}
            {d.details && (
              <p style={{ fontSize: 14, color: C.sub, margin: "0 0 3px", fontFamily: F.body }}>{d.details}</p>
            )}
            {d.information && (
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 14px", fontFamily: F.body }}>{d.information}</p>
            )}
            {d.enquireButton && (
              <button style={{
                padding: "10px 32px", borderRadius: 24, border: "none",
                background: cardData.buttonColor || C.accent,
                color: cardData.buttonTextColor || "#fff",
                fontSize: 13, fontWeight: 700, fontFamily: F.body,
                cursor: "pointer", letterSpacing: "0.03em",
                boxShadow: `0 3px 12px ${cardData.buttonColor || C.accent}44`,
                transition: "transform 0.15s",
              }}>{d.enquireButtonText}</button>
            )}
          </div>
        )}

        {/* ── Tab Navigation ────────────────────────────── */}
        {cardData.genericBlocksVisible && (
          <>
            <div style={{
              display: "flex", padding: "20px 20px 0",
              borderBottom: `1.5px solid ${C.borderLight}`,
              overflowX: "auto",
            }}>
              {order.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)} className="lt-tab" style={{
                    padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer",
                    fontSize: 13, fontWeight: active ? 700 : 500, fontFamily: F.body,
                    color: active ? (cardData.tabHeadingColor || C.ink) : (cardData.tabHeadingNotSelectedColor || C.sub),
                    borderBottom: active ? `2.5px solid ${C.accent}` : "2.5px solid transparent",
                    marginBottom: -1.5, whiteSpace: "nowrap", transition: "all 0.2s",
                  }}>{tab}</button>
                );
              })}
            </div>

            {/* ── Content ─────────────────────────────────── */}
            <div style={{ padding: "24px 28px 28px" }}>
              {(map[activeTab] || []).map((block) => (
                <SectionBlock key={block.id} block={block} />
              ))}
            </div>
          </>
        )}

        {/* ── Footer ──────────────────────────────────── */}
        <div style={{ padding: "14px 24px", background: C.cream, textAlign: "center", borderTop: `1px solid ${C.borderLight}` }}>
          <span style={{ fontSize: 10, color: C.muted, fontFamily: F.body, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Powered by Personalyz
          </span>
        </div>
      </div>
    </div>
  );
}
