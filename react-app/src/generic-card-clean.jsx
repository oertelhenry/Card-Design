import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA — Full WinterMenu card response
// ═══════════════════════════════════════════════════════════════
const cardData = {
  id: "1b9265c9-f81d-4d6e-87ab-bfc37bbacda3",
  cardName: "WinterMenu",
  details: {
    logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=500&fit=crop",
    description: "Test description",
    details: "Test details",
    information: "Test Information",
    enquireButton: true,
    enquireButtonText: "Contact us",
  },
  genericDetailsVisible: true,
  genericBlocksVisible: true,
  cardBackgroundColor: null,
  buttonColor: null,
  buttonTextColor: null,
  tabHeadingColor: null,
  mainHeadingColor: null,
  itemHeadingColor: null,
  itemValueColor: null,
  itemDescriptionColor: null,
  deviderLineColor: null,
  tabHeadingNotSelectedColor: null,
  blockHeadingColor: null,
  cardBlocks: [
    {
      id: "0704ad0e", tabName: "Food Menu", tabNumber: 0, title: "Breakfast & Brunch", sort: 0,
      propertyRows: [
        { id: "1c9b627f", heading: "Classic", headingValue: "Single R 69.00 | Double R 112.00", headingDescription: "Topped with hickory ham. Served with grilled tomato & a hash brown.", sort: 0 },
        { id: "476651e5", heading: "South African", headingValue: "Single R 75.00 | Double R 127.00", headingDescription: "Topped with a boerewors patty & corn chakalaka.", sort: 1 },
        { id: "0e9a54c6", heading: "Big Ben", headingValue: "Single R 89.00 | Double R 142.00", headingDescription: "Topped with baby spinach, grilled tomato, hash brown, cheddar, hickory ham, back bacon & a battered onion ring.", sort: 2 },
        { id: "4a925cba", heading: "Buffalo Chicken & Blue Cheese", headingValue: "Single R 79.00 | Double R 125.00", headingDescription: "Sesame-crusted chicken strips coated in hot sauce, blue cheese crumbles & an extra drizzle of hot sauce.", sort: 3 },
        { id: "15ce16bd", heading: "Mediterranean", headingValue: "Single R 74.00 | Double R 119.00", headingDescription: "Roasted peppers, feta, olives, basil pesto, grilled tomato & a hash brown.", sort: 4 },
        { id: "914b4cc2", heading: "Shakshuka Skillet", headingValue: "Single R 78.00 | Double R 120.00", headingDescription: "Spiced tomato-pepper sauce with onions, poached eggs, fresh herbs & toasted sourdough.", sort: 5 },
        { id: "bcf263ae", heading: "Avo Smash", headingValue: "Single R 82.00 | Double R 135.00", headingDescription: "Smashed avocado, lemon zest, chili flakes, poached egg & microgreens on toast.", sort: 6 },
        { id: "e6a418fa", heading: "Halloumi & Roast Veg", headingValue: "Single R 79.00 | Double R 128.00", headingDescription: "Griddled halloumi, roasted courgette & peppers, basil oil, grilled tomato & a hash brown.", sort: 7 },
        { id: "44074306", heading: "Pap & Wors Breakfast", headingValue: "Single R 86.00 | Double R 139.00", headingDescription: "Creamy mielie pap, boerewors bites, chakalaka, fried egg & crispy onion.", sort: 8 },
      ],
    },
    {
      id: "6c571827", tabName: "Food Menu", tabNumber: 0, title: "Toasted Sandwiches", sort: 1,
      propertyRows: [
        { id: "eac53bcd", heading: "Back Bacon & Egg", headingValue: "R 150", headingDescription: "", sort: 0 },
        { id: "bdf69ac8", heading: "Cheddar and Tomato", headingValue: "R 79", headingDescription: "", sort: 1 },
        { id: "3bbd7b19", heading: "Chicken Mayo", headingValue: "R 89", headingDescription: "", sort: 2 },
        { id: "1489e733", heading: "Bacon, Avo & Feta", headingValue: "R 109", headingDescription: "Crispy bacon, avocado, feta & tomato relish.", sort: 3 },
        { id: "639207da", heading: "Tomato, Mozzarella & Basil", headingValue: "R 84", headingDescription: "Melted mozzarella, fresh tomato & basil pesto.", sort: 4 },
        { id: "8b1349f4", heading: "Steak, Onion & Cheddar", headingValue: "R 119", headingDescription: "Thin-sliced steak, caramelised onion & mature cheddar.", sort: 5 },
        { id: "33642513", heading: "Tuna Mayo & Pickle", headingValue: "R 96", headingDescription: "Tuna mayo, dill pickle & pepper.", sort: 6 },
        { id: "ff65b003", heading: "Roast Veg & Pesto", headingValue: "R 89", headingDescription: "Roasted peppers, marrows, onion & basil pesto.", sort: 7 },
      ],
    },
    {
      id: "ef5e2878", tabName: "Drinks Menu", tabNumber: 1, title: "Smoothies", sort: 0,
      propertyRows: [
        { id: "b0f60a22", heading: "Green Monster", headingValue: "R 64", headingDescription: "Spinach, Avo, Cucumber and Ginger blended in carrot juice", sort: 0 },
        { id: "84897a9e", heading: "Berry Burst", headingValue: "R 65", headingDescription: "Strawberries, Blueberries, Banana and Chia Seeds blended in almond milk", sort: 1 },
        { id: "4eecfc84", heading: "Tropical Glow", headingValue: "R 60", headingDescription: "Mango, Pineapple, Coconut and Mint blended in orange juice", sort: 2 },
        { id: "e08c2993", heading: "Nutty Power", headingValue: "R 66", headingDescription: "Peanut Butter, Oats, Banana and Dates blended in oat milk", sort: 3 },
        { id: "17995395", heading: "Cocoa Banana", headingValue: "R 62", headingDescription: "Banana, cocoa, yoghurt & honey blended with milk.", sort: 4 },
        { id: "87d5bb0a", heading: "Coffee Buzz", headingValue: "R 66", headingDescription: "Double espresso, banana & dates blended in oat milk.", sort: 5 },
        { id: "f2256bb3", heading: "Citrus Cleanse", headingValue: "R 63", headingDescription: "Orange, grapefruit, lemon, ginger & turmeric blended with ice.", sort: 6 },
        { id: "12055cab", heading: "Carrot Cake", headingValue: "R 64", headingDescription: "Carrot, pineapple, banana & cinnamon blended in oat milk.", sort: 7 },
      ],
    },
    {
      id: "b6107080", tabName: "Dessert Menu", tabNumber: 2, title: "Warm Desserts", sort: 0,
      propertyRows: [
        { id: "1ce7727d", heading: "Malva", headingValue: "R 44", headingDescription: "Traditional warm pudding", sort: 0 },
        { id: "c8a7960f", heading: "Custard", headingValue: "R 30", headingDescription: "Topping for just about anything", sort: 1 },
        { id: "337d5717", heading: "Cape Brandy Pudding", headingValue: "R 52", headingDescription: "Warm date pudding soaked in brandy syrup with vanilla custard.", sort: 2 },
        { id: "76847cdc", heading: "Apple Crumble", headingValue: "R 48", headingDescription: "Buttery crumble over cinnamon apples, served with custard.", sort: 3 },
        { id: "31b4fe98", heading: "Chocolate Fondant", headingValue: "R 58", headingDescription: "Warm molten-centre chocolate cake with vanilla ice cream.", sort: 4 },
        { id: "d8b36888", heading: "Sticky Toffee Malva", headingValue: "R 49", headingDescription: "Malva pudding finished with a sticky toffee glaze.", sort: 5 },
        { id: "e6d86a3d", heading: "Cinnamon Pancakes", headingValue: "R 46", headingDescription: "Warm pancakes with cinnamon-sugar & lemon, add custard +R 10.", sort: 6 },
      ],
    },
    {
      id: "2fe54c41", tabName: "HenryDemo", tabNumber: 3, title: "asdfsadf", sort: 0,
      propertyRows: [
        { id: "bc27b567", heading: "asdf", headingValue: "asdf", headingDescription: "asdf", sort: 0 },
        { id: "7f7771e9", heading: "dfgh", headingValue: "dfgh", headingDescription: "dfgh", sort: 1 },
      ],
    },
    {
      id: "c8534872", tabName: "Claras Menu", tabNumber: 4, title: "Caps", sort: 0,
      propertyRows: [
        { id: "602c7a03", heading: "Blue Cap", headingValue: "100", headingDescription: "fdlkdljabsdludbjsadv", sort: 0 },
      ],
    },
    {
      id: "59842af7", tabName: "HenryDemo", tabNumber: 3, title: "yyy", sort: 1,
      propertyRows: [
        { id: "fbaf8638", heading: "yt", headingValue: "rt", headingDescription: "rt", sort: 0 },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function groupByTab(blocks) {
  const tabMap = {};
  const tabOrder = [];
  blocks.forEach((block) => {
    if (!tabMap[block.tabName]) {
      tabMap[block.tabName] = { tabName: block.tabName, tabNumber: block.tabNumber, sections: [] };
      tabOrder.push(block.tabName);
    }
    tabMap[block.tabName].sections.push(block);
  });
  tabOrder.forEach((name) => {
    tabMap[name].sections.sort((a, b) => a.sort - b.sort);
  });
  return tabOrder.map((name) => tabMap[name]);
}

// ═══════════════════════════════════════════════════════════════
// CLEAN THEME — "Moderne" / Editorial Clean
// Warm white, charcoal ink, coral accent, serif headings
// ═══════════════════════════════════════════════════════════════

const C = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  ink: "#1C1C1C",
  ink2: "#3A3A3A",
  sub: "#787878",
  muted: "#ABABAB",
  border: "#EBEBEB",
  borderLight: "#F3F3F1",
  accent: "#2563EB",
  accentSoft: "#EFF4FF",
  warmAccent: "#E8562A",
  warmAccentSoft: "#FFF2ED",
  divider: "#E5E2DD",
};

const ff = {
  display: "'Playfair Display', 'Georgia', serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

function LoadFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}

// ═══════════════════════════════════════════════════════════════
// MENU ITEM ROW
// ═══════════════════════════════════════════════════════════════
function MenuItem({ item, isLast }) {
  return (
    <div style={{
      padding: "14px 0",
      borderBottom: isLast ? "none" : `1px solid ${C.borderLight}`,
    }}>
      {/* Name + Price row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <h4 style={{
          margin: 0, fontSize: 15, fontWeight: 600, color: C.ink,
          fontFamily: ff.body, lineHeight: 1.3, flex: 1,
        }}>
          {item.heading}
        </h4>
        <span style={{
          fontSize: 13, fontWeight: 600, color: C.warmAccent,
          fontFamily: ff.mono, whiteSpace: "nowrap", flexShrink: 0,
          letterSpacing: "-0.02em", lineHeight: 1.3,
        }}>
          {item.headingValue}
        </span>
      </div>
      {/* Description */}
      {item.headingDescription && (
        <p style={{
          margin: "4px 0 0", fontSize: 13, color: C.sub,
          fontFamily: ff.body, lineHeight: 1.5, letterSpacing: "0.01em",
          paddingRight: 40,
        }}>
          {item.headingDescription}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION BLOCK
// ═══════════════════════════════════════════════════════════════
function SectionBlock({ section }) {
  if (!section.title && section.propertyRows.length === 0) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      {/* Section Heading */}
      {section.title && (
        <div style={{ textAlign: "center", padding: "24px 0 8px", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: C.divider, marginTop: 8 }} />
          <h3 style={{
            display: "inline-block", position: "relative", margin: 0,
            fontSize: 22, fontWeight: 700, color: C.ink,
            fontFamily: ff.display, letterSpacing: "-0.01em",
            background: C.bg, padding: "0 18px",
          }}>
            {section.title}
          </h3>
        </div>
      )}
      {/* Items */}
      <div style={{ padding: "4px 0" }}>
        {section.propertyRows
          .sort((a, b) => a.sort - b.sort)
          .map((row, idx) => (
            <MenuItem key={row.id} item={row} isLast={idx === section.propertyRows.length - 1} />
          ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB BAR
// ═══════════════════════════════════════════════════════════════
function TabBar({ tabs, active, onSelect }) {
  const scrollRef = useRef(null);
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div ref={scrollRef} style={{
        display: "flex", overflowX: "auto", padding: "0 20px", gap: 0,
        scrollbarWidth: "none", msOverflowStyle: "none",
      }}>
        {tabs.map((tab, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={tab.tabName}
              onClick={() => onSelect(idx)}
              style={{
                padding: "13px 16px", border: "none", background: "transparent", cursor: "pointer",
                fontFamily: ff.body, fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? C.accent : C.sub,
                borderBottom: isActive ? `2.5px solid ${C.accent}` : "2.5px solid transparent",
                whiteSpace: "nowrap", transition: "all 0.2s",
                letterSpacing: "0.01em", flexShrink: 0,
              }}
            >
              {tab.tabName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CARD — Clean Theme
// ═══════════════════════════════════════════════════════════════
export default function GenericCardClean() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = groupByTab(cardData.cardBlocks);
  const currentTab = tabs[activeTab];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: ff.body }}>
      <LoadFonts />

      {/* ── Phone Frame ── */}
      <div style={{
        maxWidth: 420, margin: "0 auto", minHeight: "100vh",
        background: C.bg, position: "relative",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 8px 60px rgba(0,0,0,0.08)",
      }}>
        {/* Hero Image */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 2.8", overflow: "hidden" }}>
          <img
            src={cardData.details.logo}
            alt={cardData.cardName}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
            background: `linear-gradient(to top, ${C.bg}, transparent)`,
          }} />
        </div>

        {/* Card Details */}
        {cardData.genericDetailsVisible && (
          <div style={{ textAlign: "center", padding: "0 24px 20px", marginTop: -20, position: "relative" }}>
            {cardData.details.description && (
              <h2 style={{
                margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: C.ink,
                fontFamily: ff.display, letterSpacing: "-0.02em", lineHeight: 1.2,
                fontStyle: "italic",
              }}>
                {cardData.details.description}
              </h2>
            )}
            {cardData.details.details && (
              <p style={{ margin: "0 0 4px", fontSize: 14, color: C.sub, fontFamily: ff.body, lineHeight: 1.5 }}>
                {cardData.details.details}
              </p>
            )}
            {cardData.details.information && (
              <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontFamily: ff.body, lineHeight: 1.5 }}>
                {cardData.details.information}
              </p>
            )}
            {cardData.details.enquireButton && (
              <button style={{
                padding: "10px 28px", border: "none", borderRadius: 24,
                background: C.accent, color: "#FFFFFF",
                fontSize: 14, fontWeight: 600, fontFamily: ff.body,
                cursor: "pointer", letterSpacing: "0.02em",
                boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
                transition: "all 0.2s",
              }}>
                {cardData.details.enquireButtonText}
              </button>
            )}
          </div>
        )}

        {/* Tab Navigation */}
        {cardData.genericBlocksVisible && (
          <>
            <TabBar tabs={tabs} active={activeTab} onSelect={setActiveTab} />

            {/* Tab Content */}
            <div style={{ padding: "0 22px 40px" }}>
              {currentTab && currentTab.sections.map((section) => (
                <SectionBlock key={section.id} section={section} />
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center", padding: "16px 20px 28px",
          borderTop: `1px solid ${C.borderLight}`,
        }}>
          <p style={{
            fontSize: 10, color: C.muted, fontFamily: ff.body,
            letterSpacing: "0.08em", textTransform: "uppercase", margin: 0,
          }}>
            Powered by Personalyz
          </p>
        </div>
      </div>
    </div>
  );
}
