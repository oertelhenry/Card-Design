import { useState } from "react";

// VARIANT 2: "Ember & Obsidian" - Dark luxe design
// Fonts: Playfair Display (display) + Nunito Sans (body)
// Palette: Deep charcoal base, amber/gold accent, warm whites
// Signature: Frosted glass tab bar, glowing dividers, grain overlay

const cardData = {"id":"1b9265c9-f81d-4d6e-87ab-bfc37bbacda3","cardName":"WinterMenu","genericDetailsVisible":true,"genericImagesVisible":true,"genericBlocksVisible":true,"cardBackgroundColor":null,"buttonColor":null,"buttonTextColor":null,"tabHeadingColor":null,"mainHeadingColor":null,"itemHeadingColor":null,"itemValueColor":null,"itemDescriptionColor":null,"deviderLineColor":null,"tabHeadingNotSelectedColor":null,"blockHeadingColor":null,"details":{"logo":"https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-1b9265c9-f81d-4d6e-87ab-bfc37bbacda3/21af43825bd34055b142886cb6317463_wintermenu.jpg","description":"Test description","details":"Test details","information":"Test Information","enquireButton":true,"enquireButtonText":"Contact us"},"cardBlocks":[{"id":"0704ad0e","tabName":"Food Menu","tabNumber":0,"title":"Breakfast & Brunch","sort":0,"propertyRows":[{"id":"1c9b627f","heading":"Classic","headingValue":"Single R 69.00 | Double R 112.00","headingDescription":"Topped with hickory ham. Served with grilled tomato & a hash brown. [hot] [veg] [gf] [vegan]","sort":0},{"id":"476651e5","heading":"South African","headingValue":"Single R 75.00 | Double R 127.00","headingDescription":"Topped with a boerewors patty & corn chakalaka.","sort":1},{"id":"0e9a54c6","heading":"Big Ben","headingValue":"Single R 89.00 | Double R 142.00","headingDescription":"Topped with baby spinach, grilled tomato, hash brown, cheddar, hickory ham, back bacon & a battered onion ring.","sort":2},{"id":"4a925cba","heading":"Buffalo Chicken & Blue Cheese","headingValue":"Single R 79.00 | Double R 125.00","headingDescription":"Sesame-crusted chicken strips coated in hot sauce, blue cheese crumbles & an extra drizzle of hot sauce.","sort":3},{"id":"15ce16bd","heading":"Mediterranean","headingValue":"Single R 74.00 | Double R 119.00","headingDescription":"Roasted peppers, feta, olives, basil pesto, grilled tomato & a hash brown. [veg]","sort":4},{"id":"914b4cc2","heading":"Shakshuka Skillet","headingValue":"Single R 78.00 | Double R 120.00","headingDescription":"Spiced tomato-pepper sauce with onions, poached eggs, fresh herbs & toasted sourdough. (GF without toast)","sort":5},{"id":"bcf263ae","heading":"Avo Smash","headingValue":"Single R 82.00 | Double R 135.00","headingDescription":"Smashed avocado, lemon zest, chili flakes, poached egg & microgreens on toast. [veg]","sort":6},{"id":"e6a418fa","heading":"Halloumi & Roast Veg","headingValue":"Single R 79.00 | Double R 128.00","headingDescription":"Griddled halloumi, roasted courgette & peppers, basil oil, grilled tomato & a hash brown. [veg] [gf]","sort":7},{"id":"44074306","heading":"Pap & Wors Breakfast","headingValue":"Single R 86.00 | Double R 139.00","headingDescription":"Creamy mielie pap, boerewors bites, chakalaka, fried egg & crispy onion. (SA classic)","sort":8}]},{"id":"6c571827","tabName":"Food Menu","tabNumber":0,"title":"Toasted Sandwiches","sort":1,"propertyRows":[{"id":"eac53bcd","heading":"Back Bacon & Egg","headingValue":"150","headingDescription":"","sort":0},{"id":"bdf69ac8","heading":"Cheddar and Tomato","headingValue":"R 79","headingDescription":"","sort":1},{"id":"3bbd7b19","heading":"Chicken Mayo","headingValue":"R 89","headingDescription":"","sort":2},{"id":"1489e733","heading":"Bacon, Avo & Feta","headingValue":"R 109","headingDescription":"Crispy bacon, avocado, feta & tomato relish.","sort":3},{"id":"639207da","heading":"Tomato, Mozzarella & Basil","headingValue":"R 84","headingDescription":"Melted mozzarella, fresh tomato & basil pesto. [veg]","sort":4},{"id":"8b1349f4","heading":"Steak, Onion & Cheddar","headingValue":"R 119","headingDescription":"Thin-sliced steak, caramelised onion & mature cheddar.","sort":5},{"id":"33642513","heading":"Tuna Mayo & Pickle","headingValue":"R 96","headingDescription":"Tuna mayo, dill pickle & pepper.","sort":6},{"id":"ff65b003","heading":"Roast Veg & Pesto","headingValue":"R 89","headingDescription":"Roasted peppers, marrows, onion & basil pesto. [veg]","sort":7}]},{"id":"ef5e2878","tabName":"Drinks Menu","tabNumber":1,"title":"Smoothies","sort":0,"propertyRows":[{"id":"b0f60a22","heading":"Green Monster","headingValue":"R 64","headingDescription":"Spinach, Avo, Cucumber and Ginger blended in carrot juice","sort":0},{"id":"84897a9e","heading":"Berry Burst","headingValue":"R 65","headingDescription":"Strawberries, Blueberries, Banana and Chia Seeds blended in almond milk","sort":1},{"id":"4eecfc84","heading":"Tropical Glow","headingValue":"R 60","headingDescription":"Mango, Pineapple, Coconut and Mint blended in orange juice","sort":2},{"id":"e08c2993","heading":"Nutty Power","headingValue":"R 66","headingDescription":"Peanut Butter, Oats, Banana and Dates blended in oat milk","sort":3},{"id":"17995395","heading":"Cocoa Banana","headingValue":"R 62","headingDescription":"Banana, cocoa, yoghurt & honey blended with milk.","sort":4},{"id":"87d5bb0a","heading":"Coffee Buzz","headingValue":"R 66","headingDescription":"Double espresso, banana & dates blended in oat milk.","sort":5},{"id":"f2256bb3","heading":"Citrus Cleanse","headingValue":"R 63","headingDescription":"Orange, grapefruit, lemon, ginger & turmeric blended with ice.","sort":6},{"id":"12055cab","heading":"Carrot Cake","headingValue":"R 64","headingDescription":"Carrot, pineapple, banana & cinnamon blended in oat milk. [veg]","sort":7}]},{"id":"b6107080","tabName":"Dessert Menu","tabNumber":2,"title":"Warm Desserts","sort":0,"propertyRows":[{"id":"1ce7727d","heading":"Malva","headingValue":"R 44","headingDescription":"Traditional warm pudding","sort":0},{"id":"c8a7960f","heading":"Custard","headingValue":"R 30","headingDescription":"Topping for just about anything","sort":1},{"id":"337d5717","heading":"Cape Brandy Pudding","headingValue":"R 52","headingDescription":"Warm date pudding soaked in brandy syrup with vanilla custard.","sort":2},{"id":"76847cdc","heading":"Apple Crumble","headingValue":"R 48","headingDescription":"Buttery crumble over cinnamon apples, served with custard.","sort":3},{"id":"31b4fe98","heading":"Chocolate Fondant","headingValue":"R 58","headingDescription":"Warm molten-centre chocolate cake with vanilla ice cream.","sort":4},{"id":"d8b36888","heading":"Sticky Toffee Malva","headingValue":"R 49","headingDescription":"Malva pudding finished with a sticky toffee glaze.","sort":5},{"id":"e6d86a3d","heading":"Cinnamon Pancakes","headingValue":"R 46","headingDescription":"Warm pancakes with cinnamon-sugar & lemon, add custard +R 10.","sort":6}]},{"id":"2fe54c41","tabName":"HenryDemo","tabNumber":3,"title":"asdfsadf","sort":0,"propertyRows":[{"id":"bc27b567","heading":"asdf","headingValue":"asdf","headingDescription":"asdf","sort":0},{"id":"7f7771e9","heading":"dfgh","headingValue":"dfgh","headingDescription":"dfgh","sort":1}]},{"id":"c8534872","tabName":"Claras Menu","tabNumber":4,"title":"Caps","sort":0,"propertyRows":[{"id":"602c7a03","heading":"Blue Cap","headingValue":"100","headingDescription":"fdlkdljabsdludbjsadv","sort":0}]},{"id":"59842af7","tabName":"HenryDemo","tabNumber":3,"title":"yyy","sort":1,"propertyRows":[{"id":"fbaf8638","heading":"yt","headingValue":"rt","headingDescription":"rt","sort":0}]},{"id":"71ac9604","tabName":"Food Menu","tabNumber":0,"title":"","sort":2,"propertyRows":[]}]};

const tagMap = {
  "[veg]":   { label: "V",  bg: "rgba(76,175,80,0.15)", color: "#81C784", title: "Vegetarian" },
  "[vegan]": { label: "Ve", bg: "rgba(76,175,80,0.22)", color: "#66BB6A", title: "Vegan" },
  "[gf]":    { label: "GF", bg: "rgba(255,183,77,0.15)", color: "#FFB74D", title: "Gluten Free" },
  "[hot]":   { label: "\ud83c\udf36\ufe0f", bg: "rgba(244,67,54,0.15)", color: "#EF5350", title: "Spicy" },
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

const D = {
  bg: "#0F0F0F", card: "#161616", elevated: "#222222",
  glass: "rgba(30,30,30,0.75)",
  ink: "#F0ECE4", sub: "#8A857B", muted: "#5A5650",
  border: "#2E2D2A", borderLight: "#242320",
  accent: "#D4A054", accentGlow: "rgba(212,160,84,0.2)",
};
const F = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Helvetica Neue', sans-serif",
  mono: "'Fira Code', monospace",
};

function Tag({ tag }) {
  return (
    <span title={tag.title} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "2px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700,
      background: tag.bg, color: tag.color, fontFamily: F.body,
      letterSpacing: "0.04em", lineHeight: "14px",
    }}>{tag.label}</span>
  );
}

function MenuRow({ row, idx }) {
  const { clean, tags } = parseTags(row.headingDescription);
  return (
    <div style={{
      padding: "14px 0",
      borderBottom: `1px solid ${cardData.deviderLineColor || D.borderLight}`,
      animation: "dkFade 0.4s ease both",
      animationDelay: `${idx * 0.04}s`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: cardData.itemHeadingColor || D.ink, fontFamily: F.body }}>{row.heading}</span>
          {tags.length > 0 && <span style={{ display: "inline-flex", gap: 3 }}>{tags.map((t, i) => <Tag key={i} tag={t} />)}</span>}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: cardData.itemValueColor || D.accent, fontFamily: F.mono, whiteSpace: "nowrap", flexShrink: 0 }}>{row.headingValue}</span>
      </div>
      {clean && <p style={{ fontSize: 12.5, color: cardData.itemDescriptionColor || D.sub, margin: "4px 0 0", lineHeight: 1.5, fontFamily: F.body, paddingRight: 32 }}>{clean}</p>}
    </div>
  );
}

function SectionBlock({ block }) {
  if (!block.title && (!block.propertyRows || block.propertyRows.length === 0)) return null;
  const bgColor = cardData.cardBackgroundColor || D.card;
  return (
    <div style={{ marginBottom: 32 }}>
      {block.title && (
        <div style={{ textAlign: "center", marginBottom: 8, position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${D.accent}44, transparent)` }} />
          <h3 style={{
            fontSize: 20, fontWeight: 700, color: cardData.blockHeadingColor || D.ink,
            fontFamily: F.display, margin: 0, position: "relative",
            display: "inline-block", padding: "0 16px", background: bgColor,
          }}>{block.title}</h3>
        </div>
      )}
      {[...block.propertyRows].sort((a, b) => a.sort - b.sort).map((row, idx) => (
        <MenuRow key={row.id} row={row} idx={idx} />
      ))}
    </div>
  );
}

export default function GenericCardDark() {
  const { map, order } = groupByTab(cardData.cardBlocks);
  const [activeTab, setActiveTab] = useState(order[0]);
  const d = cardData.details;
  const bgColor = cardData.cardBackgroundColor || D.card;

  return (
    <div style={{ minHeight: "100vh", background: D.bg, display: "flex", justifyContent: "center", padding: "24px 12px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes dkFade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .dk-tab:hover { color: ${D.ink} !important; background: ${D.elevated} !important; }
      `}</style>

      <div style={{
        width: "100%", maxWidth: 440, background: bgColor, borderRadius: 20,
        overflow: "hidden", position: "relative",
        boxShadow: "0 8px 48px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
        border: `1px solid ${D.border}`,
      }}>

        {/* Hero with cinematic overlay */}
        {cardData.genericImagesVisible && d.logo && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={d.logo} alt="" style={{ width: "100%", height: 230, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${bgColor} 100%)` }} />
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 50%, ${bgColor} 100%)`, opacity: 0.4 }} />
          </div>
        )}

        {/* Card Details */}
        {cardData.genericDetailsVisible && (
          <div style={{ padding: "12px 28px 8px", textAlign: "center", position: "relative", zIndex: 3 }}>
            {d.description && <h2 style={{ fontSize: 30, fontWeight: 700, color: cardData.mainHeadingColor || D.ink, fontFamily: F.display, margin: "0 0 6px" }}>{d.description}</h2>}
            {d.details && <p style={{ fontSize: 14, color: D.sub, margin: "0 0 3px", fontFamily: F.body, fontWeight: 600 }}>{d.details}</p>}
            {d.information && <p style={{ fontSize: 13, color: D.muted, margin: "0 0 16px", fontFamily: F.body }}>{d.information}</p>}
            {d.enquireButton && (
              <button style={{
                padding: "11px 36px", borderRadius: 8,
                border: `1.5px solid ${cardData.buttonColor || D.accent}`,
                background: "transparent", color: cardData.buttonTextColor || D.accent,
                fontSize: 12, fontWeight: 700, fontFamily: F.body, cursor: "pointer",
                letterSpacing: "0.08em", textTransform: "uppercase",
                boxShadow: `0 0 20px ${D.accentGlow}`,
              }}>{d.enquireButtonText}</button>
            )}
          </div>
        )}

        {/* Frosted glass tab bar */}
        {cardData.genericBlocksVisible && (
          <>
            <div style={{
              display: "flex", gap: 4, padding: "10px 10px",
              margin: "14px 16px 0", borderRadius: 10,
              background: D.glass, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${D.border}`, overflowX: "auto", position: "relative", zIndex: 3,
            }}>
              {order.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)} className="dk-tab" style={{
                    padding: "8px 14px", border: "none", cursor: "pointer", borderRadius: 6,
                    fontSize: 12.5, fontWeight: active ? 700 : 500, fontFamily: F.body,
                    whiteSpace: "nowrap", transition: "all 0.2s",
                    background: active ? D.elevated : "transparent",
                    color: active ? (cardData.tabHeadingColor || D.accent) : (cardData.tabHeadingNotSelectedColor || D.muted),
                    boxShadow: active ? `0 0 12px ${D.accentGlow}` : "none",
                  }}>{tab}</button>
                );
              })}
            </div>

            <div style={{ padding: "20px 28px 28px", position: "relative", zIndex: 3 }}>
              {(map[activeTab] || []).map((block) => <SectionBlock key={block.id} block={block} />)}
            </div>
          </>
        )}

        <div style={{ padding: "14px 24px", textAlign: "center", borderTop: `1px solid ${D.border}`, background: "rgba(0,0,0,0.2)", position: "relative", zIndex: 3 }}>
          <span style={{ fontSize: 10, color: D.muted, fontFamily: F.body, letterSpacing: "0.1em", textTransform: "uppercase" }}>Powered by Personalyz</span>
        </div>
      </div>
    </div>
  );
}
