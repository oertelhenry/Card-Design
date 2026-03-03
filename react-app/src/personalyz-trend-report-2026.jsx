import { useState } from "react";

const NAV = ["Macro Trends", "Competitive Map", "User Shifts", "Platform Evolution", "Strategy", "Mood Board"];

const fonts = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Courier New', monospace",
};

const c = {
  bg: "#FAF9F7",
  paper: "#FFFFFF",
  ink: "#1A1A1A",
  sub: "#6B6B6B",
  muted: "#9A9A9A",
  accent: "#D4380D",
  accentSoft: "#FFF1E6",
  blue: "#0958D9",
  blueSoft: "#E6F0FF",
  green: "#389E0D",
  greenSoft: "#F0FFE6",
  purple: "#722ED1",
  purpleSoft: "#F3EDFF",
  gold: "#D48806",
  goldSoft: "#FFFBE6",
  border: "#E8E6E3",
  borderDark: "#D0CEC9",
  tag: "#F5F3F0",
};

function PillNav({ items, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {items.map((item) => (
        <button key={item} onClick={() => onChange(item)} style={{
          padding: "8px 18px", fontSize: 13, fontWeight: 500, fontFamily: fonts.body,
          border: "none", borderRadius: 6, cursor: "pointer", letterSpacing: "-0.01em",
          background: active === item ? c.ink : "transparent",
          color: active === item ? "#fff" : c.sub,
          transition: "all 0.15s ease",
        }}>{item}</button>
      ))}
    </div>
  );
}

function SectionTitle({ number, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: c.accent, fontFamily: fonts.mono, marginBottom: 6 }}>
        {number}
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: c.ink, fontFamily: fonts.display, margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 14, color: c.sub, margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

function Card({ children, style: extra, accent }) {
  return (
    <div style={{
      background: c.paper, borderRadius: 10, border: `1px solid ${c.border}`,
      padding: 24, ...extra,
      borderTop: accent ? `3px solid ${accent}` : undefined,
    }}>{children}</div>
  );
}

function Tag({ label, color, bg }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 4, fontSize: 10,
      fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
      color: color || c.accent, background: bg || c.accentSoft, fontFamily: fonts.mono,
    }}>{label}</span>
  );
}

function MetricBar({ label, value, max = 100, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: c.ink }}>{label}</span>
        <span style={{ fontSize: 11, color: c.sub, fontFamily: fonts.mono }}>{value}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: c.tag }}>
        <div style={{ height: 6, borderRadius: 3, background: color || c.accent, width: `${value}%`, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", padding: "8px 0",
      borderBottom: `1px solid ${c.border}`, fontSize: 13,
    }}>
      <span style={{ color: c.sub, fontWeight: 500 }}>{label}</span>
      <span style={{ color: c.ink, fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

// ══════════════════════════════════════════
// SECTION 1: MACRO TRENDS
// ══════════════════════════════════════════

function MacroTrends() {
  const [activeTrend, setActiveTrend] = useState(0);

  const trends = [
    {
      name: "Liquid Glass & Dynamic Materiality",
      area: "Visual Aesthetics",
      phase: "Growing",
      phaseColor: c.green,
      definition: "Translucent, light-responsive UI surfaces that simulate physical glass properties — refraction, reflection, and depth — to create hierarchy and spatial context in digital interfaces.",
      visuals: {
        colors: "Frosted whites, translucent layers with 60–80% opacity, subtle gradient tints that shift based on background content",
        shapes: "Rounded rectangles (12–20px radius), floating pill-shaped controls that detach from screen edges, layered cards with frosted overlaps",
        typography: "SF Pro and system fonts prioritized for legibility over glass; heavier weights (Semibold, Bold) to maintain contrast on translucent surfaces",
        imagery: "Depth-of-field backgrounds that play with the refraction effect; 3D-rendered icons with specular highlights",
      },
      origin: "Apple visionOS (2023) → Apple iOS 26 / Liquid Glass (WWDC June 2025). Samsung OneUI 7 and Google Android 16 quickly adopted glassmorphic elements in quick settings panels.",
      brands: ["Apple (iOS 26 system-wide)", "Microsoft (Fluent Design 3.0 icons)", "Figma (glass effect tools, late 2025)"],
      opportunities: "Creates premium, spatial feel that differentiates from flat competitors; ideal for card preview overlays and live editing contexts where layering communicates hierarchy.",
      risks: "Accessibility backlash is real — Apple had to add opacity sliders after complaints about legibility. Contrast ratios fail WCAG AA on many glass surfaces. Performance-heavy on older devices. Risk of looking dated fast if over-applied.",
    },
    {
      name: "Agentic UX & Generative Interfaces",
      area: "Interaction Patterns",
      phase: "Emerging",
      phaseColor: c.purple,
      definition: "AI-driven interfaces that assemble themselves in real-time based on user intent, context, and behavioral signals — shifting from pre-designed screens to dynamically composed experiences.",
      visuals: {
        colors: "Neutral base palettes with semantic AI-state indicators (thinking = pulsing blue, acting = green, error = amber). Minimal chrome to maximize generative content area.",
        shapes: "Modular, card-based layouts that can be rearranged algorithmically. Container-query-responsive components that resize based on context, not just viewport.",
        typography: "Variable fonts that adjust weight/width based on content importance. Dynamic heading hierarchy assigned by AI based on content analysis.",
        imagery: "Contextual: AI selects and places imagery based on content type. Skeleton loaders that morph into actual content shapes.",
      },
      origin: "Google Gemini's purpose-built UI responses (2024–2025). Notion AI sidebar. ChatGPT Canvas mode. The shift from 'AI behind a button' to 'AI as ambient infrastructure' as described by Orizon and UX Collective researchers.",
      brands: ["Google Gemini (generative UI for search results)", "Notion AI (contextual side panels)", "Linear (AI-composed project views)"],
      opportunities: "Massive for admin contexts — imagine a card editor that pre-fills and pre-configures based on uploaded CV or website analysis (Personalyz already has this in SuperAdmin). Could auto-suggest section ordering based on industry best practices.",
      risks: "Users need to trust autonomous actions. 54% of designers report clients want AI features without clear use cases (Lyssna survey, Dec 2025). Without transparency ('AI did this because...'), users feel loss of control. 'Vibe-coded products — good for prototyping, ineffective for everything else.'",
    },
    {
      name: "Calm Design & Strategic Restraint",
      area: "Color Trends",
      phase: "Mature",
      phaseColor: c.blue,
      definition: "A deliberate pull toward muted palettes, generous whitespace, and reduced visual stimulation — a counter-trend to notification overload, dopamine UI, and AI-generated visual noise.",
      visuals: {
        colors: "Pantone Cloud Dancer (#F0EEE9) as 2026 Color of the Year. Warm off-whites replacing stark #FFFFFF. Tinted neutrals (warm grays, stone, putty). Single accent color used sparingly. Blue-greens emerging as THE color trend.",
        shapes: "Large corner radii (16–24px), generous padding (24–48px), breathing room between components. Content cards with subtle shadows instead of borders.",
        typography: "Modern serifs making a comeback for editorial trust (as noted by Fontfabric and Creative Bloq). Clean sans-serifs for UI, serifs for marketing content. Larger body text (17–18px).",
        imagery: "Reduced imagery density. Single hero illustrations instead of grids. Soft gradients (ombré style) replacing harsh multi-stop gradients.",
      },
      origin: "Post-pandemic screen fatigue. Burnout from notification-heavy UX. Aligns with Apple's 'content is hero' philosophy. The wellness/mindfulness movement influencing digital product design.",
      brands: ["Linear (extreme minimalism in project management)", "Notion (calm, customizable workspace)", "Stripe Dashboard (clean data-focused UI with generous whitespace)"],
      opportunities: "Directly addresses Personalyz users' pain point of 'cluttered, unintuitive layouts.' Calm design improves task completion speed by reducing cognitive load. Makes the card preview — the user's creation — the visual hero.",
      risks: "Can feel under-designed or 'empty' if not executed with intention. Minimal palettes require higher typography and spacing precision. Boring if the accent color and micro-interactions aren't distinctive.",
    },
    {
      name: "Imperfect by Design & Anti-AI Aesthetics",
      area: "Typography Trends",
      phase: "Growing",
      phaseColor: c.gold,
      definition: "A deliberate embrace of human imperfection in typography and visual design — friction, texture, handcrafted forms — as a counter-signal to AI-generated sterility and algorithmic neutrality.",
      visuals: {
        colors: "Electric blues, neon coral, acid yellow, vivid teal for accents. Dopamine-bright but intentionally 'imperfect' — slightly off from mathematically harmonious palettes.",
        shapes: "Grid-breaking layouts. Asymmetric compositions. Overlapping elements. Visible texture — grain, halftone, risograph effects.",
        typography: "'Mutant Heritage' — classic letterforms digitally hacked (Klim, Grilli Type releases). Funky curvy serifs. Kinetic type that morphs, stretches, and reacts. Variable fonts with expressive axes (weight, width, slant as interactive parameters). Studio Dumbar's OutSystems identity: type as UI/diagram/sound wave.",
        imagery: "Collage, mixed media, hand-drawn elements. Raw photography over polished stock. Deliberate noise and grain.",
      },
      origin: "Charli XCX 'Brat' album cover anti-design aesthetic (2024). Pentagram's Young V&A rebrand. Marketplace data from MyFonts and Creative Market showing aggressive rejection of 'blanding' (IK Agency analysis, Jan 2026). Eventbrite, Bose, and Affinity rebrands.",
      brands: ["COLLINS for Bose (type visualizing sound — variable weight, rhythm, vibration)", "Pentagram for Young V&A (brash, colorful anti-design)", "Red Antler for Popup Bagels (handwritten, imperfect)"],
      opportunities: "For Personalyz's marketing site and template gallery — not the admin UI itself. Custom card templates could embrace expressive typography as a differentiator. Section headings could use variable font expressiveness.",
      risks: "Absolutely wrong for admin productivity contexts. Anti-design in a dashboard = confusion. Best applied selectively: marketing, onboarding, template previews. Never on form labels or navigation.",
    },
    {
      name: "Spatial & Multi-Modal Design",
      area: "Technology Influence",
      phase: "Emerging",
      phaseColor: c.accent,
      definition: "Design for interfaces that exist across screens, glasses, voice, and gesture simultaneously — driven by visionOS, Meta's neural band, Samsung Galaxy XR, and the convergence of AR/VR into everyday computing.",
      visuals: {
        colors: "Depth-coded palettes: brighter = closer, darker = further. Spatial gradients that simulate light sources. Luminous UI on dark backgrounds for AR legibility.",
        shapes: "Z-axis as a design variable. Floating panels at different depth layers. 'Window' metaphors replacing 'page' metaphors. Physics-based interactions (gravity, inertia, spring).",
        typography: "Larger minimum sizes for spatial contexts (24pt+ for comfort at arm's length). Variable optical sizing for distance adaptation. High-contrast required for varied lighting conditions.",
        imagery: "3D visualizations of real-world objects. Spatial photography with depth maps. AR-compatible asset pipelines.",
      },
      origin: "Apple Vision Pro (Feb 2024). Meta Ray-Ban display glasses announcement (Oct 2025). Samsung Galaxy XR headset launch. Neural band gesture control. Figma's exploration of spatial design tools.",
      brands: ["Apple (visionOS → Liquid Glass cross-pollination)", "Meta (Ray-Ban smart glasses, neural band input)", "Samsung (Galaxy XR at half the Vision Pro price)"],
      opportunities: "Digital business cards viewed in AR glasses is a near-future use case. Wallet cards, QR codes, and contact sharing all have spatial analogs. Card previews could incorporate depth/parallax for 'wow factor.'",
      risks: "Premature to redesign core admin UX for spatial. Best used as progressive enhancement: spatial-ready assets, depth-aware previews, physics-based animations that translate to spatial contexts later.",
    },
  ];

  const t = trends[activeTrend];

  return (
    <div>
      <SectionTitle number="01" title="Macro Trend Analysis" subtitle="Five defining trends shaping admin UI in 2026 — researched from 25+ industry sources including Lyssna (100-designer survey), Fontfabric, Orizon, UX Collective, Apple WWDC 2025, Creative Bloq, and marketplace data from MyFonts and Creative Market." />

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {trends.map((tr, i) => (
          <button key={i} onClick={() => setActiveTrend(i)} style={{
            padding: "10px 16px", fontSize: 12, fontWeight: 600, fontFamily: fonts.body,
            border: `1px solid ${activeTrend === i ? c.ink : c.border}`, borderRadius: 8,
            cursor: "pointer", background: activeTrend === i ? c.ink : c.paper,
            color: activeTrend === i ? "#fff" : c.ink, transition: "all 0.15s",
            letterSpacing: "-0.01em",
          }}>
            {tr.name.split("&")[0].trim()}
          </button>
        ))}
      </div>

      <Card accent={t.phaseColor}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: c.ink, fontFamily: fonts.display, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{t.name}</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <Tag label={t.area} color={c.blue} bg={c.blueSoft} />
              <Tag label={t.phase} color={t.phaseColor === c.green ? c.green : t.phaseColor === c.purple ? c.purple : t.phaseColor === c.blue ? c.blue : t.phaseColor === c.gold ? c.gold : c.accent} bg={t.phaseColor === c.green ? c.greenSoft : t.phaseColor === c.purple ? c.purpleSoft : t.phaseColor === c.blue ? c.blueSoft : t.phaseColor === c.gold ? c.goldSoft : c.accentSoft} />
            </div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: c.ink, lineHeight: 1.7, margin: "0 0 20px", borderLeft: `3px solid ${t.phaseColor}`, paddingLeft: 14 }}>
          {t.definition}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {Object.entries(t.visuals).map(([key, val]) => (
            <div key={key} style={{ padding: 14, borderRadius: 8, background: c.tag }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: c.muted, textTransform: "uppercase", marginBottom: 4, fontFamily: fonts.mono }}>{key}</div>
              <div style={{ fontSize: 12, color: c.ink, lineHeight: 1.6 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <DataRow label="Origin" value={t.origin} />
          <div style={{ padding: "8px 0", borderBottom: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 13, color: c.sub, fontWeight: 500, marginBottom: 6 }}>Brands Using It Well</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {t.brands.map((b, i) => (
                <span key={i} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: c.blueSoft, color: c.blue }}>{b}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 14, borderRadius: 8, background: c.greenSoft, border: `1px solid #D9F7BE` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: c.green, fontFamily: fonts.mono, letterSpacing: "0.06em", marginBottom: 4 }}>OPPORTUNITIES</div>
              <div style={{ fontSize: 12, color: "#135200", lineHeight: 1.6 }}>{t.opportunities}</div>
            </div>
            <div style={{ padding: 14, borderRadius: 8, background: c.accentSoft, border: "1px solid #FFD8BF" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: c.accent, fontFamily: fonts.mono, letterSpacing: "0.06em", marginBottom: 4 }}>RISKS</div>
              <div style={{ fontSize: 12, color: "#871400", lineHeight: 1.6 }}>{t.risks}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════
// SECTION 2: COMPETITIVE MAP
// ══════════════════════════════════════════

function CompetitiveMap() {
  const competitors = [
    { name: "Blinq", x: 30, y: 25, note: "Minimal, frictionless" },
    { name: "HiHello", x: 55, y: 55, note: "Feature-rich, complex" },
    { name: "Popl", x: 70, y: 70, note: "Max features, NFC hardware" },
    { name: "Wave Connect", x: 40, y: 45, note: "Balanced, clean" },
    { name: "Mobilo", x: 65, y: 60, note: "Sales-team focus" },
    { name: "V1CE", x: 50, y: 80, note: "Premium materials" },
    { name: "Uniqode", x: 60, y: 50, note: "QR-first, scalable" },
    { name: "Linq", x: 35, y: 65, note: "NFC basic" },
    { name: "Canva", x: 80, y: 35, note: "Template-first, limited" },
    { name: "Personalyz", x: 48, y: 42, note: "Current position", highlight: true },
  ];

  return (
    <div>
      <SectionTitle number="02" title="Competitive Landscape" subtitle="10 digital business card platforms mapped across innovation and visual density axes, with white space opportunities identified." />

      <Card>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", background: c.tag, borderRadius: 8, overflow: "hidden", border: `1px solid ${c.border}` }}>
          {/* Axes */}
          <div style={{ position: "absolute", top: "50%", left: 16, right: 16, height: 1, background: c.borderDark }} />
          <div style={{ position: "absolute", left: "50%", top: 16, bottom: 16, width: 1, background: c.borderDark }} />
          {/* Labels */}
          <div style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(8px)", fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>CONSERVATIVE</div>
          <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(8px)", fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>INNOVATIVE</div>
          <div style={{ position: "absolute", left: "50%", top: 10, transform: "translateX(8px)", fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>MINIMAL</div>
          <div style={{ position: "absolute", left: "50%", bottom: 10, transform: "translateX(8px)", fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>FEATURE-RICH</div>
          {/* White space */}
          <div style={{ position: "absolute", right: "10%", top: "10%", width: "25%", height: "25%", border: `2px dashed ${c.green}`, borderRadius: 12, opacity: 0.6 }} />
          <div style={{ position: "absolute", right: "12%", top: "12%", fontSize: 9, fontWeight: 700, color: c.green, fontFamily: fonts.mono }}>WHITE SPACE</div>
          {/* Dots */}
          {competitors.map((comp) => (
            <div key={comp.name} style={{
              position: "absolute",
              left: `${comp.x}%`, top: `${comp.y}%`,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}>
              <div style={{
                width: comp.highlight ? 14 : 10, height: comp.highlight ? 14 : 10,
                borderRadius: "50%", margin: "0 auto 3px",
                background: comp.highlight ? c.accent : c.ink,
                border: comp.highlight ? `3px solid ${c.accentSoft}` : "2px solid #fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }} />
              <div style={{
                fontSize: 9, fontWeight: 700, color: comp.highlight ? c.accent : c.ink,
                fontFamily: fonts.mono, whiteSpace: "nowrap",
              }}>{comp.name}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
        <Card accent={c.green}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: c.green, margin: "0 0 12px", fontFamily: fonts.display }}>White Space Opportunities</h4>
          <div style={{ fontSize: 13, color: c.ink, lineHeight: 1.7 }}>
            <strong>Innovative + Minimal</strong> (top-right quadrant) is underserved. No platform combines cutting-edge AI/generative features with a clean, calm admin experience. Blinq is minimal but conservative; Canva is innovative but template-limited.
            Personalyz can own the intersection: AI-powered content generation (CV parsing, website analysis) wrapped in a serene, task-focused interface.
          </div>
        </Card>
        <Card accent={c.accent}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: c.accent, margin: "0 0 12px", fontFamily: fonts.display }}>Overused Patterns to Avoid</h4>
          {["Purple/violet as primary brand color (HiHello, Popl, generic SaaS)", "Hamburger menus hiding critical navigation on desktop", "Feature-gate everything behind paywalls (Popl: 5-contact limit on free)", "NFC-first strategies that require physical hardware", "Rainbow gradient hero sections (2022 aesthetic, still lingering)", "Generic Bootstrap admin templates with no product personality"].map((p, i) => (
            <div key={i} style={{ fontSize: 12, color: c.ink, padding: "4px 0", borderBottom: i < 5 ? `1px solid ${c.border}` : "none", lineHeight: 1.5 }}>
              <span style={{ color: c.accent, fontWeight: 700 }}>×</span> {p}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// SECTION 3: USER SHIFTS
// ══════════════════════════════════════════

function UserShifts() {
  return (
    <div>
      <SectionTitle number="03" title="User Expectation Shifts" subtitle="How behaviors have changed post-AI, post-pandemic, and with Gen Z entering the workforce — and what users will no longer tolerate." />

      <div style={{ display: "grid", gap: 16 }}>
        <Card accent={c.blue}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: c.ink, margin: "0 0 4px", fontFamily: fonts.display }}>Post-AI: The Intention Economy</h4>
          <Tag label="Paradigm Shift" color={c.blue} bg={c.blueSoft} />
          <p style={{ fontSize: 13, color: c.ink, lineHeight: 1.7, margin: "12px 0 0" }}>
            UX is shifting from the <strong>attention economy</strong> to the <strong>intention economy</strong> (UX Collective, Jan 2026). Users no longer want to navigate through menus — they want to state goals and have the system resolve them. 73% of designers say AI as a design collaborator will have the most impact in 2026 (Lyssna survey). 60% believe agentic AI that takes actions for users will be transformative. The implication: admin UIs should move from "navigate to find" to "state intent and confirm."
          </p>
          <div style={{ marginTop: 12 }}>
            <MetricBar label="Designers using generative AI tools" value={93} color={c.blue} />
            <MetricBar label="AI as design collaborator will have most impact" value={73} color={c.blue} />
            <MetricBar label="Agentic AI actions will be transformative" value={60} color={c.blue} />
            <MetricBar label="Clients want AI without clear use cases" value={54} color={c.accent} />
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card accent={c.purple}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: c.ink, margin: "0 0 12px", fontFamily: fonts.display }}>New Mental Models</h4>
            {[
              { model: "Prompt → Result", desc: "Users expect to describe what they want, not click through wizards. Card creation should accept natural language input." },
              { model: "Preview-First", desc: "81.9% of users prefer dark mode; 37% of small businesses now use digital cards. Users expect instant visual feedback on every action." },
              { model: "Cross-Device Continuity", desc: "Started on phone, finished on desktop. State must persist seamlessly across devices and sessions." },
              { model: "AI as Default", desc: "AI features are becoming infrastructure, not innovation. Auto-fill, smart suggestions, and content generation should be ambient, not gated." },
            ].map((m, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? `1px solid ${c.border}` : "none" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.purple }}>{m.model}</div>
                <div style={{ fontSize: 12, color: c.sub, lineHeight: 1.5, marginTop: 2 }}>{m.desc}</div>
              </div>
            ))}
          </Card>

          <Card accent={c.accent}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: c.ink, margin: "0 0 12px", fontFamily: fonts.display }}>Zero-Tolerance Friction Points</h4>
            {[
              "Manual data re-entry (if AI can parse a CV, why am I typing?)",
              "Save buttons without auto-save (Google Docs trained us)",
              "No undo/redo (every creative tool has Cmd+Z)",
              "Modals that block workflow (sheets > modals in 2026)",
              "Separate preview screens (split-view or inline preview is expected)",
              "Loading states without skeletons (blank screens feel broken)",
              "No dark mode option (82% desktop users prefer it)",
              "Inconsistent UI between sections (the #1 Personalyz pain point)",
            ].map((f, i) => (
              <div key={i} style={{ fontSize: 12, color: c.ink, padding: "6px 0", borderBottom: i < 7 ? `1px solid ${c.border}` : "none", lineHeight: 1.4 }}>
                <span style={{ color: c.accent, fontWeight: 700, fontFamily: fonts.mono }}>⚠</span> {f}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// SECTION 4: PLATFORM EVOLUTION
// ══════════════════════════════════════════

function PlatformEvolution() {
  return (
    <div>
      <SectionTitle number="04" title="Platform-Specific Evolution" subtitle="How iOS 26, Material Design, and web design patterns have shifted in 2025–2026, and what it means for Personalyz's cross-platform admin." />

      <div style={{ display: "grid", gap: 16 }}>
        <Card accent={c.ink}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: c.ink, margin: 0, fontFamily: fonts.display }}>Apple: iOS 26 / Liquid Glass / visionOS</h4>
            <Tag label="Released Sep 2025" color={c.ink} bg={c.tag} />
          </div>
          <p style={{ fontSize: 13, color: c.sub, lineHeight: 1.7, margin: "0 0 12px" }}>
            The first major iOS redesign since iOS 7 (2013). Apple unified all platforms (iOS, iPadOS, macOS Tahoe, watchOS, tvOS) under the Liquid Glass design language, inspired by visionOS's spatial UI. Version number jumped from 18 → 26 to synchronize with the calendar year.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Key Changes", items: "Translucent materials with refraction/reflection; Tab bars that shrink on scroll; Floating pill controls detached from edges; Layered app icons with glass shimmer; Clear/Light/Dark/Tinted themes" },
              { label: "Reception & Fixes", items: "Mixed reception — criticized for legibility issues. Apple added opacity slider in iOS 26.1, lock screen transparency control in 26.2. Developer beta 3 made nav bars more opaque. Alan Dye (VP Design) departed to Meta in Dec 2025." },
              { label: "Impact on Web", items: "backdrop-filter: blur() and saturate() now expected. Figma added glass effect tools. Samsung OneUI 7 and Android 16 adopted glassmorphic quick settings. Web admin panels increasingly adopting floating nav bars." },
              { label: "For Personalyz", items: "Apply Liquid Glass selectively: nav bar, floating toolbar, preview panel header. NOT on form inputs, cards, or data tables. Always provide opacity controls. Test contrast rigorously." },
            ].map((item) => (
              <div key={item.label} style={{ padding: 12, borderRadius: 8, background: c.tag }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: c.ink, lineHeight: 1.5 }}>{item.items}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card accent={c.green}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: c.ink, margin: "0 0 12px", fontFamily: fonts.display }}>Google: Material You (M3) Evolution</h4>
            <div style={{ fontSize: 12, color: c.ink, lineHeight: 1.6 }}>
              Material You continues its dynamic theming story. Android 16 added glassmorphic elements to quick settings, converging with Apple's direction. Key shifts: color tokens automatically extracted from wallpapers; motion design emphasis on 'easing and duration' over 'animation type'; emphasis on large screens (tablets, foldables) driving adaptive layouts; Gemini's generative UI creating purpose-built interfaces in response to user queries.
            </div>
          </Card>

          <Card accent={c.purple}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: c.ink, margin: "0 0 12px", fontFamily: fonts.display }}>Web: Pattern Shifts</h4>
            <div style={{ fontSize: 12, color: c.ink, lineHeight: 1.6 }}>
              CSS container queries enabling truly modular components. View Transitions API for native-feeling page transitions. Scroll-driven animations replacing JavaScript-heavy solutions. HSL-based design token systems (Divi 5, Tailwind 4). React Server Components changing how admin panels load data. Vite 7 and Tailwind CSS dominating new dashboard templates (AdminLTE, TailPanel). The sidebar + content layout persists as the dominant admin pattern, but with collapsible icon-only modes for focus.
            </div>
          </Card>
        </div>

        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: c.ink, margin: "0 0 12px", fontFamily: fonts.display }}>Cross-Platform Convergence: Glassmorphism Across Ecosystems</h4>
          <p style={{ fontSize: 12, color: c.sub, lineHeight: 1.6, margin: "0 0 8px" }}>
            All three major platforms now feature glass-like transparency in system UI. A LogRocket analysis compared quick settings panels across iOS 26, Samsung OneUI 7, and Android 16, concluding: "Apple prioritizes aesthetics, Samsung is well-balanced, and Android is all about accessibility."
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { platform: "Apple iOS 26", blur: "Heavy", contrast: "Lower", approach: "Aesthetic-first" },
              { platform: "Samsung OneUI 7", blur: "Medium", contrast: "Balanced", approach: "Professional" },
              { platform: "Android 16", blur: "Light", contrast: "Higher", approach: "Accessibility-first" },
            ].map((p) => (
              <div key={p.platform} style={{ padding: 12, borderRadius: 8, background: c.tag, textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.ink }}>{p.platform}</div>
                <div style={{ fontSize: 11, color: c.sub, marginTop: 4 }}>Blur: {p.blur}</div>
                <div style={{ fontSize: 11, color: c.sub }}>Contrast: {p.contrast}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: c.blue, marginTop: 4 }}>{p.approach}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// SECTION 5: STRATEGY
// ══════════════════════════════════════════

function Strategy() {
  return (
    <div>
      <SectionTitle number="05" title="Strategic Recommendations" subtitle="Actionable guidance: what to adopt, what to ignore, and a phased 6-month implementation roadmap for Personalyz Admin." />

      <div style={{ display: "grid", gap: 16 }}>
        <Card accent={c.green}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: c.green, margin: "0 0 14px", fontFamily: fonts.display }}>✓ Trends to Adopt</h4>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { trend: "Calm Design & Strategic Restraint", how: "Adopt as the PRIMARY design philosophy. Warm off-white backgrounds (#FAF9F7 not #FFFFFF), generous whitespace, single accent color, card previews as visual hero. Directly addresses user pain point of cluttered layouts." },
              { trend: "Selective Liquid Glass", how: "Apply ONLY to floating elements: nav bar, editor toolbar on scroll, preview panel header. Use backdrop-filter: blur(20px) saturate(180%) with rgba(255,255,255,0.72). Always maintain WCAG AA contrast beneath glass. Provide opacity control in Settings." },
              { trend: "Ambient AI", how: "Surface existing SuperAdmin AI features (CV parsing, website analysis) to all admin tiers with appropriate gating. Make AI feel ambient: auto-suggest card names, pre-fill sections from templates, smart section ordering based on card type. Never require a separate 'AI mode.'" },
              { trend: "Variable Fonts for System UI", how: "Adopt SF Pro or Inter Variable as the system font. Use weight axis for state communication (400 normal → 600 active → 700 headings). This improves performance (single file) and enables smooth weight transitions." },
              { trend: "Split-View Editor with Live Preview", how: "This is now table stakes. Every competitor with a card editor shows live preview. Implement as standard: 55/45 split on desktop, floating toggle on mobile. Observable-driven instant sync." },
            ].map((item, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 8, background: c.greenSoft, border: "1px solid #D9F7BE" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#135200", marginBottom: 4 }}>{item.trend}</div>
                <div style={{ fontSize: 12, color: "#135200", lineHeight: 1.6 }}>{item.how}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card accent={c.accent}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: c.accent, margin: "0 0 14px", fontFamily: fonts.display }}>× Trends to Ignore</h4>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { trend: "Neo-Brutalism / Anti-Design", why: "Deliberately broken grids and imperfect typography are for marketing and editorial — never for admin productivity tools. Business owners creating cards need predictability and clarity, not aesthetic rebellion." },
              { trend: "Heavy Liquid Glass on All Surfaces", why: "Apple themselves had to dial it back after backlash. Glass on form inputs, data tables, or card thumbnails would tank usability. Reserve for 3–4 floating chrome elements maximum." },
              { trend: "Generative UI (Fully Dynamic Layouts)", why: "Too emerging and unpredictable for a tool where users need consistent mental models. An editor that rearranges itself per-session creates anxiety, not efficiency. Implement AI as suggestions within stable layouts instead." },
              { trend: "Spatial/AR as Primary Interface", why: "Premature. Digital business cards in AR glasses is a valid future use case, but redesigning the admin for spatial computing today would alienate 99% of users who use phones and desktops." },
            ].map((item, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 8, background: c.accentSoft, border: "1px solid #FFD8BF" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#871400", marginBottom: 4 }}>{item.trend}</div>
                <div style={{ fontSize: 12, color: "#871400", lineHeight: 1.6 }}>{item.why}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card accent={c.blue}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: c.blue, margin: "0 0 16px", fontFamily: fonts.display }}>6-Month Trend Roadmap</h4>
          <div style={{ display: "grid", gap: 2 }}>
            {[
              { month: "Month 1–2", phase: "FOUNDATION", items: "Design token system (colors, typography, spacing, shadows). Unified component library in Figma. Consistent card/list/form patterns across all sections. Warm palette migration (#FAF9F7 base).", color: c.blue },
              { month: "Month 2–3", phase: "EDITOR CORE", items: "Split-view editor with live preview. Section drag-and-drop with haptic feedback patterns. Auto-save with debounced sync. Skeleton loaders for all dynamic content.", color: c.green },
              { month: "Month 3–4", phase: "GLASS & MOTION", items: "Selective Liquid Glass on nav bar and floating toolbar. Spring-based animations for modals, sheets, accordion expand. Toast notification system. Reduced-motion alternatives for all animations.", color: c.purple },
              { month: "Month 4–5", phase: "AI AMBIENT", items: "Surface CV/website analysis to admin tier. Smart section suggestions on card creation. Template recommendations based on card type. Auto-generated wallet card previews.", color: c.gold },
              { month: "Month 5–6", phase: "POLISH & ACCESSIBILITY", items: "WCAG AA audit on all glass surfaces. Dynamic Type support to 310%. VoiceOver labels on every interactive element. Dark mode token set. Performance budgets: <1.5s FCP, <3s TTI.", color: c.accent },
            ].map((phase) => (
              <div key={phase.month} style={{ display: "grid", gridTemplateColumns: "100px 90px 1fr", gap: 12, padding: "12px 0", borderBottom: `1px solid ${c.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: phase.color, fontFamily: fonts.mono }}>{phase.month}</div>
                <Tag label={phase.phase} color={phase.color} bg={c.tag} />
                <div style={{ fontSize: 12, color: c.ink, lineHeight: 1.5 }}>{phase.items}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// SECTION 6: MOOD BOARD
// ══════════════════════════════════════════

function MoodBoard() {
  const palettes = [
    { name: "Calm Admin", colors: ["#FAF9F7", "#1D1D1F", "#007AFF", "#34C759", "#F2F2F7", "#86868B"], desc: "Apple HIG-inspired. Warm off-white base, single blue accent, green for success. The 'safe' choice that looks premium." },
    { name: "Warm Neutral", colors: ["#F5F0EB", "#2D2A26", "#D4380D", "#8B7355", "#E8E0D8", "#A39585"], desc: "Earthy, editorial. Clay and terracotta tones. Feels artisanal and premium. Good for card templates marketed to creatives." },
    { name: "Cool Mineral", colors: ["#F0F2F5", "#1A1D23", "#0958D9", "#389E0D", "#E6E9EF", "#71757F"], desc: "Cooler, more corporate. Steel blues and mineral grays. Professional, trustworthy. Best for enterprise-focused positioning." },
    { name: "Night Mode", colors: ["#0F0F0F", "#FAFAFA", "#4096FF", "#52C41A", "#1A1A1A", "#8C8C8C"], desc: "Deep black with high-contrast text. Neon-bright accents for actions. Reduces eye strain in long editing sessions." },
  ];

  const references = [
    { id: 1, ref: "Linear.app Dashboard", mood: "Extreme calm minimalism. Near-monochrome gray palette with a single purple accent. Content is king — no decorative elements. Typography does all the heavy lifting.", relevance: "Section ordering, card list views" },
    { id: 2, ref: "Notion Workspace", mood: "Warm white canvas (#FFFFFF tinted), San Francisco font, generous line heights. Calm but customizable. Inline editing everywhere — no modal interruptions.", relevance: "Section heading inline edit pattern" },
    { id: 3, ref: "Stripe Dashboard", mood: "Clean data visualization on white. Blue (#635BFF) as sole accent. Charts with 10% opacity area fills. Generous card padding (24px+). Subtle shadows over borders.", relevance: "Analytics views, stat tiles" },
    { id: 4, ref: "Apple iOS 26 Settings", mood: "Grouped inset lists with section headers and footers. SF Pro at system sizes. Chevron disclosure indicators. Glass nav bar with blur.", relevance: "Settings page, grouped form patterns" },
    { id: 5, ref: "Figma Editor Interface", mood: "Split-panel layout: canvas center, properties right, layers left. Floating toolbars. Dark mode default. Dense but organized information hierarchy.", relevance: "Card editor split-view architecture" },
    { id: 6, ref: "Framer Site Builder", mood: "Inline preview that updates in real-time. Subtle glass panel headers. Smooth spring animations on panel resize. Grid overlay toggle.", relevance: "Live preview sync pattern" },
    { id: 7, ref: "Vercel Dashboard", mood: "Minimal to the extreme. Monospace accents for technical data. Black/white/gray only with green for success, red for errors. No gradients.", relevance: "Error/success states, toast design" },
    { id: 8, ref: "Shopify Admin (Polaris)", mood: "Warm gray sidebar, white content area. Green accent (#008060). Card-based layout for product management. Bulk actions toolbar.", relevance: "Card management, bulk operations" },
    { id: 9, ref: "Airbnb Host Dashboard", mood: "Photography-forward with generous image previews. Stats presented as friendly conversational text, not raw numbers. Warm, approachable.", relevance: "Card thumbnail previews, analytics" },
    { id: 10, ref: "Apple Music Now Playing", mood: "Full album art as background with extracted color palette. Glass overlays for controls. Dynamic contrast adaptation.", relevance: "Card detail view with live card as hero" },
  ];

  const typePairs = [
    { display: "SF Pro Display", body: "SF Pro Text", context: "Native Apple feel. Best for iOS-first users. System font = zero load time.", weight: "Recommended" },
    { display: "Instrument Serif", body: "Inter Variable", context: "Editorial warmth (display) + clean UI (body). Bridges marketing and admin. Trending on Fontfabric 2026 lists.", weight: "Alternative" },
    { display: "Sora", body: "DM Sans", context: "Geometric, modern, friendly. Both are variable fonts with excellent axis ranges. Good for a younger, tech-forward brand positioning.", weight: "Alternative" },
  ];

  return (
    <div>
      <SectionTitle number="06" title="Mood Board Specifications" subtitle="Visual references, color palette extractions, and typography recommendations derived from trend analysis. 10 detailed references + 4 palette options + 3 type pairings." />

      <div style={{ display: "grid", gap: 16 }}>
        {/* Color Palettes */}
        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: c.ink, margin: "0 0 16px", fontFamily: fonts.display }}>Extracted Color Palettes</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {palettes.map((pal) => (
              <div key={pal.name} style={{ padding: 14, borderRadius: 8, background: c.tag }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.ink, marginBottom: 8 }}>{pal.name}</div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  {pal.colors.map((col, i) => (
                    <div key={i} style={{ flex: 1, height: 32, borderRadius: 6, background: col, border: `1px solid ${c.border}` }}>
                      <div style={{ fontSize: 7, fontWeight: 600, color: i < 2 ? (i === 0 ? c.ink : "#fff") : c.ink, textAlign: "center", lineHeight: "32px", fontFamily: fonts.mono }}>
                        {col}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: c.sub, lineHeight: 1.5 }}>{pal.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Visual References */}
        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: c.ink, margin: "0 0 16px", fontFamily: fonts.display }}>Visual References (10 of 20)</h4>
          <div style={{ display: "grid", gap: 2 }}>
            {references.map((ref) => (
              <div key={ref.id} style={{
                display: "grid", gridTemplateColumns: "32px 180px 1fr 160px", gap: 12,
                padding: "10px 0", borderBottom: `1px solid ${c.border}`, alignItems: "start",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, textAlign: "right" }}>
                  {String(ref.id).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.ink }}>{ref.ref}</div>
                <div style={{ fontSize: 11, color: c.sub, lineHeight: 1.5 }}>{ref.mood}</div>
                <Tag label={ref.relevance} color={c.blue} bg={c.blueSoft} />
              </div>
            ))}
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: c.ink, margin: "0 0 16px", fontFamily: fonts.display }}>Typography Pairings</h4>
          <div style={{ display: "grid", gap: 12 }}>
            {typePairs.map((pair) => (
              <div key={pair.display} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16,
                padding: 14, borderRadius: 8, background: c.tag, alignItems: "start",
              }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>DISPLAY</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: c.ink, marginTop: 4 }}>{pair.display}</div>
                  <Tag label={pair.weight} color={pair.weight === "Recommended" ? c.green : c.blue} bg={pair.weight === "Recommended" ? c.greenSoft : c.blueSoft} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>BODY</div>
                  <div style={{ fontSize: 14, color: c.ink, marginTop: 4 }}>{pair.body}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.muted, fontFamily: fonts.mono, letterSpacing: "0.06em" }}>CONTEXT</div>
                  <div style={{ fontSize: 12, color: c.sub, lineHeight: 1.5, marginTop: 4 }}>{pair.context}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════

export default function TrendReport() {
  const [activeSection, setActiveSection] = useState(NAV[0]);

  const sectionMap = {
    "Macro Trends": <MacroTrends />,
    "Competitive Map": <CompetitiveMap />,
    "User Shifts": <UserShifts />,
    "Platform Evolution": <PlatformEvolution />,
    "Strategy": <Strategy />,
    "Mood Board": <MoodBoard />,
  };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, fontFamily: fonts.body, color: c.ink, WebkitFontSmoothing: "antialiased" }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100, padding: "14px 24px",
        background: "rgba(250,249,247,0.88)", backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: c.accent, fontFamily: fonts.mono }}>
                FROG DESIGN · RESEARCH BRIEF
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: c.ink, fontFamily: fonts.display, letterSpacing: "-0.02em" }}>
                Admin UI Design Trends 2026
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: c.muted, fontFamily: fonts.mono }}>CLIENT: PERSONALYZ</div>
              <div style={{ fontSize: 10, color: c.muted, fontFamily: fonts.mono }}>FEB 2026 · 25+ SOURCES</div>
            </div>
          </div>
          <PillNav items={NAV} active={activeSection} onChange={setActiveSection} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px 80px" }}>
        {sectionMap[activeSection]}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: 24, fontSize: 10, color: c.muted, fontFamily: fonts.mono, borderTop: `1px solid ${c.border}` }}>
        Sources: Apple WWDC 2025 · Lyssna Designer Survey (n=100) · UX Collective · Fontfabric · Creative Bloq · Orizon · IK Agency · LogRocket · TechCrunch · Wave Connect · Blinq · MyFonts · Creative Market
      </div>
    </div>
  );
}
