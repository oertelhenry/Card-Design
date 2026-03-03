import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  "Overview",
  "Hierarchy",
  "Navigation",
  "Screens",
  "Components",
  "Accessibility",
  "Micro-interactions",
  "Responsive",
];

const SCREEN_TABS = [
  "Onboarding",
  "Dashboard",
  "Card Editor",
  "Card Detail",
  "Settings",
  "Search & Filter",
  "Share & Export",
  "Empty & Error",
];

// ─── Color Tokens ───
const tokens = {
  bg: "#F5F5F7",
  surface: "#FFFFFF",
  surfaceSecondary: "#F2F2F7",
  glass: "rgba(255,255,255,0.72)",
  glassBorder: "rgba(255,255,255,0.45)",
  text: "#1D1D1F",
  textSecondary: "#86868B",
  textTertiary: "#AEAEB2",
  accent: "#007AFF",
  accentHover: "#0056CC",
  green: "#34C759",
  orange: "#FF9500",
  red: "#FF3B30",
  purple: "#AF52DE",
  separator: "rgba(0,0,0,0.06)",
  shadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
  shadowLg: "0 2px 8px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.08)",
};

// ─── Reusable Pill Nav ───
function PillNav({ items, active, onChange, size = "md" }) {
  const pad = size === "sm" ? "6px 14px" : "8px 20px";
  const font = size === "sm" ? "12px" : "13px";
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", background: tokens.surfaceSecondary, borderRadius: 12, padding: 4 }}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          style={{
            padding: pad, fontSize: font, fontWeight: 600,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
            border: "none", borderRadius: 10, cursor: "pointer",
            background: active === item ? tokens.surface : "transparent",
            color: active === item ? tokens.text : tokens.textSecondary,
            boxShadow: active === item ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
            letterSpacing: "-0.01em",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// ─── Design Token Swatch ───
function Swatch({ color, label, hex }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: color,
        border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
      }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text }}>{label}</div>
        <div style={{ fontSize: 11, color: tokens.textSecondary, fontFamily: "'SF Mono', 'Fira Code', monospace" }}>{hex}</div>
      </div>
    </div>
  );
}

// ─── Section Card ───
function Card({ title, children, accent, note }) {
  return (
    <div style={{
      background: tokens.surface, borderRadius: 16, padding: 28,
      boxShadow: tokens.shadow, border: `1px solid ${tokens.separator}`,
    }}>
      {accent && (
        <div style={{
          display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 10,
          fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
          background: `${accent}14`, color: accent, marginBottom: 12,
        }}>{title}</div>
      )}
      {!accent && title && (
        <h3 style={{
          fontSize: 17, fontWeight: 700, color: tokens.text, margin: "0 0 16px",
          letterSpacing: "-0.02em",
        }}>{title}</h3>
      )}
      {children}
      {note && (
        <div style={{
          marginTop: 16, padding: "12px 16px", borderRadius: 10,
          background: "#FFF9E6", borderLeft: `3px solid ${tokens.orange}`,
          fontSize: 12, lineHeight: 1.6, color: "#8B6914",
        }}>
          <strong>Designer's Note:</strong> {note}
        </div>
      )}
    </div>
  );
}

// ─── Wireframe Box ───
function WireframeBox({ label, children, style: extraStyle, dashed, accent }) {
  return (
    <div style={{
      border: `${dashed ? "2px dashed" : "1px solid"} ${accent || "rgba(0,0,0,0.1)"}`,
      borderRadius: 10, padding: 12, position: "relative",
      background: accent ? `${accent}06` : "rgba(0,0,0,0.015)", ...extraStyle,
    }}>
      {label && (
        <span style={{
          position: "absolute", top: -8, left: 12, background: tokens.surface,
          padding: "0 6px", fontSize: 9, fontWeight: 700, color: accent || tokens.textSecondary,
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>{label}</span>
      )}
      {children}
    </div>
  );
}

// ─── Wireframe Placeholder ───
function WireframePlaceholder({ height = 32, label, rounded, color }) {
  return (
    <div style={{
      height, borderRadius: rounded ? height / 2 : 8,
      background: color || "rgba(0,0,0,0.06)", display: "flex",
      alignItems: "center", justifyContent: "center", fontSize: 10,
      color: tokens.textSecondary, fontWeight: 600, letterSpacing: "0.02em",
    }}>{label}</div>
  );
}

// ─── Mini Button Preview ───
function MiniButton({ label, variant = "primary", small }) {
  const styles = {
    primary: { background: tokens.accent, color: "#fff" },
    secondary: { background: tokens.surfaceSecondary, color: tokens.accent },
    tertiary: { background: "transparent", color: tokens.accent },
    destructive: { background: "#FF3B3014", color: tokens.red },
  };
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: small ? "6px 14px" : "10px 20px", borderRadius: 10,
      fontSize: small ? 12 : 14, fontWeight: 600, letterSpacing: "-0.01em",
      ...styles[variant],
    }}>{label}</div>
  );
}

// ─── SCREEN WIREFRAMES ───

function OnboardingScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        A three-step onboarding carousel using full-bleed illustrations, progressive disclosure, and immediate value demonstration. Users can skip at any point. The final step includes a "Create Your First Card" CTA that transitions directly into the Card Editor.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {["Welcome", "Quick Tour", "Get Started"].map((step, i) => (
          <WireframeBox key={step} label={`Step ${i + 1}`} accent={tokens.accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 0" }}>
              <WireframePlaceholder height={100} label="Illustration" color={`${tokens.accent}12`} />
              <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text, textAlign: "center" }}>{step}</div>
              <WireframePlaceholder height={10} label="" color="rgba(0,0,0,0.04)" />
              <WireframePlaceholder height={10} label="" color="rgba(0,0,0,0.03)" />
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 8 }}>
                {[0, 1, 2].map((d) => (
                  <div key={d} style={{ width: d === i ? 20 : 6, height: 6, borderRadius: 3, background: d === i ? tokens.accent : "rgba(0,0,0,0.12)", transition: "width 0.3s" }} />
                ))}
              </div>
            </div>
          </WireframeBox>
        ))}
      </div>
      <SpecTable rows={[
        ["Transition", "Horizontal swipe or auto-advance on CTA tap, spring(0.5, 0.9)"],
        ["Skip action", "Top-right text button, persists across all steps"],
        ["Progress", "Expanding pill indicators — active dot stretches to capsule shape"],
        ["Step 1", "Animated card illustration morphing between card types (business, vehicle, microsite)"],
        ["Step 2", "Interactive mini-demo: user drags a section to reorder — teaches drag-and-drop instantly"],
        ["Step 3", "'Create Your First Card' primary CTA + 'Explore Templates' secondary link"],
        ["Empty state fallback", "If user dismisses onboarding, Dashboard shows inline prompt card to revisit"],
      ]} />
    </div>
  );
}

function DashboardScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        The Dashboard follows a Z-pattern: top-left summary stats → top-right quick actions → bottom-left recent cards → bottom-right activity feed. A floating "+" FAB is persistent on mobile for instant card creation.
      </p>
      <WireframeBox label="Dashboard Layout" accent={tokens.accent}>
        <div style={{ display: "grid", gap: 12, padding: "16px 0" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: tokens.textSecondary, fontWeight: 600 }}>GOOD MORNING</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: tokens.text, letterSpacing: "-0.02em" }}>Your Cards</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <WireframePlaceholder height={36} label="🔍" rounded color={tokens.surfaceSecondary} style={{ width: 36 }} />
              <WireframePlaceholder height={36} label="+ New" rounded color={tokens.accent} />
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { label: "Total Cards", value: "24", color: tokens.accent },
              { label: "Views Today", value: "142", color: tokens.green },
              { label: "Shared", value: "8", color: tokens.purple },
              { label: "Templates", value: "6", color: tokens.orange },
            ].map((s) => (
              <div key={s.label} style={{
                padding: 12, borderRadius: 12, background: `${s.color}08`,
                border: `1px solid ${s.color}15`, textAlign: "center",
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: tokens.textSecondary, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {["Business Card", "Vehicle Card", "Microsite", "Generic Card"].map((type) => (
              <div key={type} style={{
                padding: "14px 8px", borderRadius: 12, background: tokens.surfaceSecondary,
                textAlign: "center", fontSize: 11, fontWeight: 600, color: tokens.text,
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>
                  {type === "Business Card" ? "💼" : type === "Vehicle Card" ? "🚗" : type === "Microsite" ? "🌐" : "📋"}
                </div>
                {type}
              </div>
            ))}
          </div>

          {/* Recent cards grid */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text, marginBottom: 8 }}>Recent Cards</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${tokens.separator}` }}>
                  <WireframePlaceholder height={60} label="Card Preview" color={`${tokens.accent}${8 + i * 2}`} />
                  <div style={{ padding: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>Card Name {i}</div>
                    <div style={{ fontSize: 9, color: tokens.textSecondary }}>Edited 2h ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WireframeBox>
      <SpecTable rows={[
        ["Layout pattern", "Z-pattern: Stats → Actions → Recent cards → Activity"],
        ["Card thumbnails", "Live mini-renders of actual card styling at 1:3 scale, lazy-loaded"],
        ["Pull to refresh", "Custom spring animation with subtle haptic, refreshes analytics + card list"],
        ["FAB (mobile)", "Bottom-right floating '+' button, 56pt, expands to card type picker on tap"],
        ["Context menu", "Long-press card → Edit, Duplicate, Share, Archive, Delete (destructive, separated)"],
        ["Analytics sparkline", "Inline 7-day trend sparkline in each stat tile, no axis labels"],
        ["State persistence", "Scroll position, active filters, and search query preserved on back-navigate"],
      ]} />
    </div>
  );
}

function CardEditorScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        The primary task screen. A split-panel layout on desktop (editor left, live preview right) collapses to a single pane with a floating preview toggle on mobile. Sections are collapsible accordion items with drag handles.
      </p>
      <WireframeBox label="Editor — Desktop Split View" accent={tokens.accent}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12, padding: "12px 0" }}>
          {/* Left: Editor */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text }}>← Edit Card</div>
              <div style={{ display: "flex", gap: 6 }}>
                <MiniButton label="Save Draft" variant="secondary" small />
                <MiniButton label="Publish" variant="primary" small />
              </div>
            </div>

            {/* Progress steps */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {["Details", "Sections", "Style", "Share"].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 10, fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: i === 1 ? tokens.accent : i < 1 ? tokens.green : tokens.surfaceSecondary,
                    color: i <= 1 ? "#fff" : tokens.textSecondary,
                  }}>{i < 1 ? "✓" : i + 1}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: i === 1 ? tokens.text : tokens.textSecondary }}>{s}</span>
                  {i < 3 && <div style={{ width: 16, height: 1, background: tokens.separator }} />}
                </div>
              ))}
            </div>

            {/* Section accordions */}
            {["Account Details ●", "Contact Info ●", "Services", "Business Hours", "Gallery", "Testimonials"].map((sec, i) => (
              <div key={sec} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                borderRadius: 10, background: i === 2 ? `${tokens.accent}08` : tokens.surfaceSecondary,
                border: i === 2 ? `1px solid ${tokens.accent}20` : `1px solid transparent`,
              }}>
                {i > 1 && <span style={{ fontSize: 12, color: tokens.textTertiary, cursor: "grab" }}>☰</span>}
                {i <= 1 && <span style={{ fontSize: 10, color: tokens.textTertiary }}>📌</span>}
                <span style={{ fontSize: 12, fontWeight: 600, color: tokens.text, flex: 1 }}>{sec}</span>
                <div style={{
                  width: 32, height: 18, borderRadius: 9,
                  background: i < 4 ? tokens.green : "rgba(0,0,0,0.12)",
                }} />
                <span style={{ fontSize: 11, color: tokens.textTertiary }}>›</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: tokens.textTertiary, textAlign: "center", padding: 4 }}>
              Drag ☰ to reorder · Toggle to enable/disable · Pinned sections stay at top
            </div>
          </div>

          {/* Right: Preview */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: `1px solid ${tokens.separator}`, background: "#000",
            padding: 8,
          }}>
            <div style={{ borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", height: "100%", minHeight: 280 }}>
              <div style={{ padding: 20, textAlign: "center" }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 25, background: "rgba(255,255,255,0.3)",
                  margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: "#fff",
                }}>JD</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Jane Doe</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Product Designer · Acme Inc</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12 }}>
                  {["📞", "✉️", "🔗"].map((ic) => (
                    <div key={ic} style={{
                      width: 32, height: 32, borderRadius: 16, background: "rgba(255,255,255,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                    }}>{ic}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "16px 16px 12px 12px", padding: 16, marginTop: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: tokens.textSecondary, marginBottom: 6 }}>SERVICES</div>
                {[1, 2].map((s) => (
                  <WireframePlaceholder key={s} height={24} label={`Service ${s}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </WireframeBox>
      <SpecTable rows={[
        ["Split ratio", "Desktop: 55% editor / 45% preview. Tablet: full editor with floating preview button"],
        ["Section drag", "CDK drag-drop with 200ms haptic feedback; drop shadow + 4° tilt while dragging"],
        ["Auto-save", "Debounced 2s after last edit; subtle 'Saved ✓' indicator fades in toolbar"],
        ["Preview sync", "Observable-driven; every field change pushes to preview within 16ms (one frame)"],
        ["Validation", "Inline below field, red tint on input border, shake animation (200ms) on submit with errors"],
        ["Group lock", "When Group Collection active: frosted overlay on section, lock icon, 'Managed by [Group]' label"],
        ["Template apply", "Color swatch in dropdown; applying template shows diff-preview dialog before confirming"],
        ["Undo/Redo", "Cmd+Z / Cmd+Shift+Z with 50-step history stack, toast notification on undo"],
      ]} />
    </div>
  );
}

function CardDetailScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        A read-only detail view showing card performance, sharing options, and quick edit access. Uses a hero card preview at top with analytics below.
      </p>
      <WireframeBox label="Card Detail View" accent={tokens.purple}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text }}>← Jane Doe</div>
            <div style={{ display: "flex", gap: 6 }}>
              <MiniButton label="Edit" variant="secondary" small />
              <MiniButton label="Share" variant="primary" small />
            </div>
          </div>
          <WireframePlaceholder height={120} label="Live Card Preview (Interactive)" color={`${tokens.purple}10`} rounded={false} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[
              { l: "Total Views", v: "1,247" },
              { l: "This Week", v: "+89" },
              { l: "Shares", v: "34" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center", padding: 10, borderRadius: 10, background: tokens.surfaceSecondary }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: tokens.text }}>{s.v}</div>
                <div style={{ fontSize: 9, color: tokens.textSecondary }}>{s.l}</div>
              </div>
            ))}
          </div>

          <WireframePlaceholder height={60} label="7-Day Views Chart (Area)" color="rgba(0,0,0,0.03)" />

          <div style={{ fontSize: 11, fontWeight: 700, color: tokens.text }}>Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {["Download QR", "Wallet Card", "Send via Email", "Copy Link"].map((a) => (
              <WireframePlaceholder key={a} height={36} label={a} color={tokens.surfaceSecondary} />
            ))}
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: tokens.text }}>Recent Activity</div>
          {[1, 2, 3].map((r) => (
            <div key={r} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: tokens.green }} />
              <span style={{ fontSize: 11, color: tokens.textSecondary }}>Viewed from Chrome, Johannesburg — 2h ago</span>
            </div>
          ))}
        </div>
      </WireframeBox>
      <SpecTable rows={[
        ["Hero preview", "Card rendered at 60% scale, tappable to expand full-screen with pinch-to-zoom"],
        ["Chart", "SF Symbols style area chart, 7-day rolling, tap point to see exact value"],
        ["Geolocation", "Leaflet map below chart showing access event markers, clustered at zoom levels"],
        ["Context menu", "Long-press card preview → Open in Browser, Duplicate, Archive, Delete"],
        ["Deep link", "QR encodes {env.url}/{company}/{cardName}, displayed in 200×200px modal"],
        ["Activity feed", "Real-time via WebSocket, grouped by hour, expandable for full device/browser detail"],
      ]} />
    </div>
  );
}

function SettingsScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        Settings follow iOS grouped-list conventions. Sections are clearly separated with descriptive footers. Destructive actions are at the bottom, visually distinct.
      </p>
      <WireframeBox label="Settings" accent={tokens.green}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
          {[
            { title: "Account", items: ["Profile Photo & Name", "Email Address", "Company Details", "Role: Admin"] },
            { title: "Card Defaults", items: ["Default Template", "Default Sections", "Auto-enable Analytics"] },
            { title: "Group Collections", items: ["Contact Info Groups", "Business Hours Groups", "Service Groups"] },
            { title: "Notifications", items: ["Push Notification Settings", "Email Digest Frequency"] },
            { title: "Danger Zone", items: ["Export All Data", "Delete Account"], destructive: true },
          ].map((section) => (
            <div key={section.title}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: section.destructive ? tokens.red : tokens.textSecondary,
                textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, paddingLeft: 4,
              }}>{section.title}</div>
              <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${section.destructive ? `${tokens.red}20` : tokens.separator}` }}>
                {section.items.map((item, i) => (
                  <div key={item} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", background: tokens.surface,
                    borderTop: i > 0 ? `1px solid ${tokens.separator}` : "none",
                  }}>
                    <span style={{ fontSize: 12, color: section.destructive ? tokens.red : tokens.text }}>{item}</span>
                    <span style={{ fontSize: 12, color: tokens.textTertiary }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </WireframeBox>
      <SpecTable rows={[
        ["Pattern", "iOS grouped inset list with section headers and footers"],
        ["Role badge", "Non-editable, system-assigned, shown with SF Symbol shield icon"],
        ["Group management", "Drill-down to list → detail editor; shows card count per group"],
        ["Destructive", "Red text, isolated section at bottom, double-confirm dialog on tap"],
        ["Export", "Generates ZIP with all card data, images, analytics CSV — download or email"],
      ]} />
    </div>
  );
}

function SearchFilterScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        Universal search accessible from every screen via Cmd+K (desktop) or pull-down (mobile). Filters use a chip-based system with instant results.
      </p>
      <WireframeBox label="Search & Filter" accent={tokens.orange}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 0" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
            borderRadius: 12, background: tokens.surfaceSecondary,
          }}>
            <span style={{ fontSize: 14, color: tokens.textTertiary }}>🔍</span>
            <span style={{ fontSize: 13, color: tokens.textTertiary }}>Search cards, templates, groups...</span>
            <span style={{
              marginLeft: "auto", fontSize: 10, color: tokens.textTertiary,
              padding: "2px 6px", borderRadius: 4, background: "rgba(0,0,0,0.06)",
            }}>⌘K</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All Types", "Business", "Vehicle", "Microsite", "Active", "Archived"].map((f, i) => (
              <div key={f} style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                background: i === 0 ? tokens.accent : tokens.surfaceSecondary,
                color: i === 0 ? "#fff" : tokens.textSecondary,
              }}>{f}</div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: tokens.textSecondary, fontWeight: 600 }}>3 results</div>
          {[1, 2, 3].map((r) => (
            <div key={r} style={{
              display: "flex", gap: 10, alignItems: "center", padding: "8px 12px",
              borderRadius: 10, background: r === 1 ? `${tokens.accent}06` : "transparent",
              border: `1px solid ${r === 1 ? `${tokens.accent}15` : "transparent"}`,
            }}>
              <WireframePlaceholder height={36} label="" color={`${tokens.accent}12`} rounded />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: tokens.text }}>Card Result {r}</div>
                <div style={{ fontSize: 10, color: tokens.textSecondary }}>Business Card · Active · 142 views</div>
              </div>
              <span style={{ fontSize: 11, color: tokens.textTertiary }}>›</span>
            </div>
          ))}
        </div>
      </WireframeBox>
      <SpecTable rows={[
        ["Trigger", "⌘K on desktop, pull-down on mobile, persistent search icon in toolbar"],
        ["Scope", "Cards, Templates, Group Collections, Users — segmented at top"],
        ["Typeahead", "Debounced 300ms, highlights matching substring in results"],
        ["Filter chips", "Horizontally scrollable, multi-select, persisted to sessionStorage"],
        ["Empty query", "Shows recent searches (last 5) and suggested filters"],
        ["Keyboard nav", "Arrow keys to navigate results, Enter to select, Esc to dismiss"],
        ["State persistence", "Search query + filters + page position saved per list view"],
      ]} />
    </div>
  );
}

function ShareExportScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        The share flow consolidates all distribution methods into a single action sheet. Wallet card generation and QR display happen inline with real-time preview.
      </p>
      <WireframeBox label="Share & Export" accent={tokens.green}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text }}>Share "Jane Doe"</div>
            <div style={{ fontSize: 11, color: tokens.textSecondary }}>personalyz.com/acme/jane-doe</div>
          </div>

          {/* QR Preview */}
          <div style={{
            width: 100, height: 100, margin: "0 auto", borderRadius: 12,
            background: tokens.surfaceSecondary, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 40, border: `1px solid ${tokens.separator}`,
          }}>📱</div>

          {/* Share methods */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {[
              { icon: "✉️", label: "Email" },
              { icon: "💬", label: "WhatsApp" },
              { icon: "📤", label: "Share" },
              { icon: "📧", label: "Mail App" },
              { icon: "📋", label: "Copy" },
            ].map((m) => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: tokens.surfaceSecondary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, margin: "0 auto 4px",
                }}>{m.icon}</div>
                <div style={{ fontSize: 9, color: tokens.textSecondary }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: tokens.separator }} />

          {/* Export options */}
          <div style={{ fontSize: 11, fontWeight: 700, color: tokens.text }}>Export</div>
          {["Download Wallet Card (PNG)", "Print QR Code", "Download vCard", "Export Analytics CSV"].map((opt) => (
            <div key={opt} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 12px", borderRadius: 10, background: tokens.surfaceSecondary,
            }}>
              <span style={{ fontSize: 12, color: tokens.text }}>{opt}</span>
              <span style={{ fontSize: 11, color: tokens.accent }}>↓</span>
            </div>
          ))}
        </div>
      </WireframeBox>
      <SpecTable rows={[
        ["Presentation", "Bottom sheet on mobile (detents: 50%, 100%), dialog on desktop"],
        ["QR generation", "QRious library, 200×200 canvas, encoded URL auto-updates if card name changes"],
        ["Wallet card", "900×504px canvas, gradient background, CORS-handled profile photo with initials fallback"],
        ["Web Share API", "Primary share method on supported devices; PNG attachment attempted first, text fallback"],
        ["WhatsApp", "Opens wa.me/?text= with personalized message including card URL"],
        ["Success state", "'Copied!' toast (1.5s) or native share sheet confirmation"],
        ["Haptic", "Light impact on share button tap, success notification on copy"],
      ]} />
    </div>
  );
}

function EmptyErrorScreen() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
        Every list, detail, and action state has a designed empty and error experience. Empty states always include a clear CTA to resolve the emptiness.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <WireframeBox label="Empty — No Cards" accent={tokens.textTertiary}>
          <div style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📇</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text }}>No cards yet</div>
            <div style={{ fontSize: 11, color: tokens.textSecondary, margin: "4px 0 12px", lineHeight: 1.5 }}>
              Create your first digital business card in under a minute.
            </div>
            <MiniButton label="+ Create Card" variant="primary" small />
          </div>
        </WireframeBox>
        <WireframeBox label="Empty — No Search Results" accent={tokens.textTertiary}>
          <div style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text }}>No matches</div>
            <div style={{ fontSize: 11, color: tokens.textSecondary, margin: "4px 0 12px", lineHeight: 1.5 }}>
              Try different keywords or clear your filters.
            </div>
            <MiniButton label="Clear Filters" variant="secondary" small />
          </div>
        </WireframeBox>
        <WireframeBox label="Error — Network" accent={tokens.red}>
          <div style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📡</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text }}>Connection lost</div>
            <div style={{ fontSize: 11, color: tokens.textSecondary, margin: "4px 0 12px", lineHeight: 1.5 }}>
              Check your internet connection and try again.
            </div>
            <MiniButton label="Retry" variant="primary" small />
          </div>
        </WireframeBox>
        <WireframeBox label="Error — Save Failed" accent={tokens.red}>
          <div style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: tokens.text }}>Couldn't save</div>
            <div style={{ fontSize: 11, color: tokens.textSecondary, margin: "4px 0 12px", lineHeight: 1.5 }}>
              Your changes are safe locally. We'll retry automatically.
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <MiniButton label="Retry Now" variant="primary" small />
              <MiniButton label="Discard" variant="destructive" small />
            </div>
          </div>
        </WireframeBox>
      </div>
      <SpecTable rows={[
        ["Illustration style", "SF Symbols or custom line-art, 40pt, centered, muted color"],
        ["Copy tone", "Friendly, specific, actionable — never 'Oops!' or 'Something went wrong'"],
        ["CTA hierarchy", "Primary action prominent, secondary/destructive actions smaller and below"],
        ["Loading skeleton", "Shimmer animation (1.5s ease-in-out loop) matching content shapes"],
        ["Error recovery", "Auto-retry with exponential backoff (2s, 4s, 8s), manual retry always available"],
        ["Offline mode", "Banner at top: 'You're offline — changes will sync when connected'"],
        ["Validation errors", "Inline red text below field + red border, list summary at form top"],
      ]} />
    </div>
  );
}

// ─── Spec Table ───
function SpecTable({ rows }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${tokens.separator}` }}>
      {rows.map(([label, value], i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "140px 1fr", fontSize: 12,
          borderTop: i > 0 ? `1px solid ${tokens.separator}` : "none",
        }}>
          <div style={{
            padding: "8px 12px", fontWeight: 600, color: tokens.textSecondary,
            background: tokens.surfaceSecondary, borderRight: `1px solid ${tokens.separator}`,
          }}>{label}</div>
          <div style={{ padding: "8px 12px", color: tokens.text, lineHeight: 1.5 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN SECTIONS ───

function OverviewSection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Design Philosophy" note="Apple's 'Invisible Design' principle: the best interfaces feel so natural that users don't notice the design—they just accomplish their goals. Every decision here optimizes for that transparency.">
        <p style={{ fontSize: 13, color: tokens.textSecondary, lineHeight: 1.8, margin: 0 }}>
          Personalyz Admin is reimagined as a focused, task-oriented workspace where creating and managing digital business cards feels as fluid as using a native Apple application. The design centers on three principles: <strong style={{ color: tokens.text }}>clarity</strong> (every element earns its place), <strong style={{ color: tokens.text }}>deference</strong> (content is the hero, chrome is minimal), and <strong style={{ color: tokens.text }}>depth</strong> (layered interfaces create a sense of place through transitions and spatial relationships).
        </p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card accent={tokens.accent} title="Clarity">
          <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Text is legible at every size. Icons are precise and lucid. Adornments are subtle and appropriate. A sharpened focus on functionality motivates the design.
          </p>
        </Card>
        <Card accent={tokens.green} title="Deference">
          <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Fluid motion and a crisp interface help people understand and interact without competing with content. Card previews, not admin chrome, dominate visual weight.
          </p>
        </Card>
        <Card accent={tokens.purple} title="Depth">
          <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Distinct visual layers and realistic motion convey hierarchy and facilitate understanding. Transitions and layering provide a sense of spatial context.
          </p>
        </Card>
      </div>

      <Card title="Design Tokens">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: tokens.textSecondary, marginBottom: 8, letterSpacing: "0.04em" }}>BACKGROUNDS</div>
            <Swatch color={tokens.bg} label="System Background" hex="#F5F5F7" />
            <Swatch color={tokens.surface} label="Surface" hex="#FFFFFF" />
            <Swatch color={tokens.surfaceSecondary} label="Secondary Fill" hex="#F2F2F7" />
            <Swatch color={tokens.glass} label="Glass" hex="rgba(255,255,255,0.72)" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: tokens.textSecondary, marginBottom: 8, letterSpacing: "0.04em" }}>TEXT</div>
            <Swatch color={tokens.text} label="Primary" hex="#1D1D1F" />
            <Swatch color={tokens.textSecondary} label="Secondary" hex="#86868B" />
            <Swatch color={tokens.textTertiary} label="Tertiary" hex="#AEAEB2" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: tokens.textSecondary, marginBottom: 8, letterSpacing: "0.04em" }}>SEMANTIC</div>
            <Swatch color={tokens.accent} label="Accent / Link" hex="#007AFF" />
            <Swatch color={tokens.green} label="Success / Active" hex="#34C759" />
            <Swatch color={tokens.orange} label="Warning" hex="#FF9500" />
            <Swatch color={tokens.red} label="Destructive" hex="#FF3B30" />
          </div>
        </div>
      </Card>

      <Card title="Typography Scale">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "Large Title", size: 34, weight: 700, tracking: "-0.02em" },
            { name: "Title 1", size: 28, weight: 700, tracking: "-0.02em" },
            { name: "Title 2", size: 22, weight: 700, tracking: "-0.01em" },
            { name: "Title 3", size: 20, weight: 600, tracking: "-0.01em" },
            { name: "Headline", size: 17, weight: 600, tracking: "-0.01em" },
            { name: "Body", size: 17, weight: 400, tracking: "0" },
            { name: "Callout", size: 16, weight: 400, tracking: "0" },
            { name: "Subheadline", size: 15, weight: 400, tracking: "0" },
            { name: "Footnote", size: 13, weight: 400, tracking: "0" },
            { name: "Caption 1", size: 12, weight: 400, tracking: "0" },
            { name: "Caption 2", size: 11, weight: 400, tracking: "0.02em" },
          ].map((t) => (
            <div key={t.name} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ width: 100, fontSize: 11, color: tokens.textSecondary, fontWeight: 600 }}>{t.name}</span>
              <span style={{
                fontSize: Math.min(t.size, 28), fontWeight: t.weight, color: tokens.text,
                letterSpacing: t.tracking,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
              }}>
                Personalyz
              </span>
              <span style={{ fontSize: 10, color: tokens.textTertiary, fontFamily: "'SF Mono', monospace" }}>
                {t.size}pt / {t.weight} / {t.tracking}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HierarchySection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Visual Hierarchy Strategy" note="The Z-pattern on Dashboard and F-pattern on list views are deliberate: business owners scan dashboards casually (Z) but review card lists with focused intent (F). The editor uses split-attention: left panel draws focus for editing, right panel provides ambient preview context.">
        <div style={{ display: "grid", gap: 16 }}>
          <SpecTable rows={[
            ["1st — Card Previews", "Live card renders are the largest, most colorful elements on every screen. The user's creation is always the hero."],
            ["2nd — Action CTAs", "Primary blue buttons and the floating '+' FAB are the next most prominent elements, guiding users to their top goals."],
            ["3rd — Navigation", "Sidebar/tab bar is subdued, using gray tones and SF Symbols. Present but never competing with content."],
            ["4th — Metadata", "Stats, timestamps, and labels use Caption/Footnote sizes in secondary/tertiary colors. Available but not demanding attention."],
          ]} />
        </div>
      </Card>

      <Card title="Content Density Decisions">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text, marginBottom: 8 }}>Generous Spacing (Default)</div>
            <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              Dashboard, Card Detail, Onboarding, Share screens — these are browsing/reading contexts where breathing room reduces cognitive load and makes the experience feel premium.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text, marginBottom: 8 }}>Controlled Density</div>
            <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              Card Editor, Bulk Import, Analytics table — these are productivity contexts where seeing more information at once matters. Spacing is tighter but never cramped; 8pt grid maintained.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Liquid Glass Application">
        <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.7, margin: "0 0 12px" }}>
          Applied selectively to floating elements that exist in a distinct spatial layer above content:
        </p>
        <SpecTable rows={[
          ["Navigation bar", "backdrop-filter: blur(20px) saturate(180%), rgba(255,255,255,0.72) background"],
          ["Preview panel header", "Glass treatment creates visual separation from the rendered card content beneath"],
          ["Bottom sheet handles", "Glass drag indicator area on mobile share/filter sheets"],
          ["Floating toolbar", "Editor save/publish bar on scroll — transitions from embedded to glass floating"],
          ["NOT applied to", "Cards, list items, form inputs, buttons — these need solid, predictable visual weight"],
        ]} />
      </Card>

      <Card title="Spacing System (8pt Grid)">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { name: "2xs", val: 4 }, { name: "xs", val: 8 }, { name: "sm", val: 12 },
            { name: "md", val: 16 }, { name: "lg", val: 24 }, { name: "xl", val: 32 },
            { name: "2xl", val: 48 }, { name: "3xl", val: 64 },
          ].map((s) => (
            <div key={s.name} style={{ textAlign: "center" }}>
              <div style={{
                width: s.val, height: s.val, background: `${tokens.accent}25`,
                border: `1px solid ${tokens.accent}40`, borderRadius: 2, margin: "0 auto 4px",
                minWidth: 4, minHeight: 4,
              }} />
              <div style={{ fontSize: 10, fontWeight: 600, color: tokens.text }}>{s.name}</div>
              <div style={{ fontSize: 9, color: tokens.textTertiary }}>{s.val}pt</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function NavigationSection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Navigation Architecture" note="Sidebar on desktop + tab bar on mobile mirrors Apple's own approach in apps like Music and Files. The sidebar collapses to icons on tablet landscape, providing maximum editor space while maintaining wayfinding.">
        <SpecTable rows={[
          ["Desktop (1024px+)", "Persistent left sidebar (240px) with icon + label. Collapsible to icon-only (72px) via toggle. Main content fills remaining space."],
          ["Tablet (768–1023px)", "Icon-only sidebar (72px) by default. Tap icon reveals label flyout. Editor uses full width with slide-over preview."],
          ["Mobile (<768px)", "Bottom tab bar (5 items: Dashboard, Cards, Create, Templates, Settings). No sidebar. Navigation stack for drill-down."],
        ]} />
      </Card>

      <Card title="Sidebar Structure">
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{
            width: 200, background: tokens.surfaceSecondary, borderRadius: 12, padding: 12,
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            {[
              { icon: "🏠", label: "Dashboard", active: false },
              { icon: "📇", label: "Cards", active: true },
              { icon: "🚗", label: "Vehicles", active: false },
              { icon: "🌐", label: "Microsites", active: false },
              { icon: "📋", label: "Generics", active: false },
              { divider: true },
              { icon: "🎨", label: "Templates", active: false },
              { icon: "📦", label: "Groups", active: false },
              { icon: "👥", label: "Users", active: false, badge: "Admin+" },
              { icon: "📊", label: "Analytics", active: false },
              { divider: true },
              { icon: "⚙️", label: "Settings", active: false },
            ].map((item, i) =>
              item.divider ? (
                <div key={i} style={{ height: 1, background: tokens.separator, margin: "6px 0" }} />
              ) : (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                  borderRadius: 8, background: item.active ? `${tokens.accent}12` : "transparent",
                  cursor: "pointer",
                }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{
                    fontSize: 13, fontWeight: item.active ? 600 : 400,
                    color: item.active ? tokens.accent : tokens.text,
                  }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      marginLeft: "auto", fontSize: 9, padding: "1px 6px", borderRadius: 4,
                      background: `${tokens.orange}15`, color: tokens.orange, fontWeight: 600,
                    }}>{item.badge}</span>
                  )}
                </div>
              )
            )}
          </div>
          <div style={{ flex: 1 }}>
            <SpecTable rows={[
              ["Active state", "Tinted background + accent text + semibold weight"],
              ["Hover state", "Subtle background fill (rgba(0,0,0,0.04)), 150ms ease"],
              ["Role gating", "Items hidden by role; badge shown for admin-restricted features"],
              ["Collapse", "Double-click sidebar edge or toggle button; animates 240px → 72px over 250ms"],
              ["Deep link", "Each sidebar item maps to a route; back button returns to list with preserved state"],
            ]} />
          </div>
        </div>
      </Card>

      <Card title="Modal Presentation Guidelines">
        <SpecTable rows={[
          ["Sheet (forms)", "Bottom sheet on mobile (drag-to-dismiss), centered dialog on desktop. Used for: Add Contact, Share Email, Template picker."],
          ["Full-screen", "Card editor preview pop-out, Bulk Import wizard, Analytics detail. Always has explicit close button."],
          ["Alert", "Centered, compact, max 280px wide. Used for: Delete confirmation, discard changes, send notification confirm."],
          ["Toast", "Top-center, 1.5s duration, no interaction required. Used for: Save success, copy confirmation, auto-retry notice."],
          ["Popover", "Attached to trigger element. Used for: Color picker, font selector, template swatch preview."],
        ]} />
      </Card>

      <Card title="Gesture Definitions">
        <SpecTable rows={[
          ["Swipe left on card row", "Reveal quick actions: Edit (blue), Share (green), Delete (red, requires confirm)"],
          ["Swipe down on list", "Pull-to-refresh with custom spring animation + haptic"],
          ["Long-press card", "Context menu: Edit, Duplicate, Share, Archive, Delete"],
          ["Pinch on preview", "Zoom card preview from 60% to 100% scale"],
          ["Drag section handle", "Reorder sections in editor; 200ms haptic on pick up and drop"],
          ["Two-finger swipe", "Navigate back (mobile) — system gesture, not overridden"],
        ]} />
      </Card>
    </div>
  );
}

function ScreensSection() {
  const [activeScreen, setActiveScreen] = useState(SCREEN_TABS[0]);
  const screenMap = {
    "Onboarding": <OnboardingScreen />,
    "Dashboard": <DashboardScreen />,
    "Card Editor": <CardEditorScreen />,
    "Card Detail": <CardDetailScreen />,
    "Settings": <SettingsScreen />,
    "Search & Filter": <SearchFilterScreen />,
    "Share & Export": <ShareExportScreen />,
    "Empty & Error": <EmptyErrorScreen />,
  };
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <PillNav items={SCREEN_TABS} active={activeScreen} onChange={setActiveScreen} size="sm" />
      {screenMap[activeScreen]}
    </div>
  );
}

function ComponentsSection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Button Hierarchy">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <MiniButton label="Primary Action" variant="primary" />
          <MiniButton label="Secondary" variant="secondary" />
          <MiniButton label="Tertiary" variant="tertiary" />
          <MiniButton label="Delete" variant="destructive" />
        </div>
        <SpecTable rows={[
          ["Primary", "#007AFF fill, white text, 10px radius, 44pt min touch target. Used for: Save, Publish, Create, Share."],
          ["Secondary", "#F2F2F7 fill, #007AFF text. Used for: Cancel, Save Draft, secondary actions alongside primary."],
          ["Tertiary", "Transparent, #007AFF text. Used for: inline links, 'See all', 'Skip'. No background on rest state."],
          ["Destructive", "Red tinted fill (#FF3B3014), #FF3B30 text. Used for: Delete, Remove, Discard. Always requires confirmation."],
          ["Disabled state", "40% opacity, no pointer events, aria-disabled='true'"],
          ["Loading state", "Label replaced with 12px spinner, button width locked to prevent layout shift"],
        ]} />
      </Card>

      <Card title="Form Patterns">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {/* Default */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: tokens.textSecondary, marginBottom: 4 }}>DEFAULT</div>
            <div style={{
              padding: "10px 14px", borderRadius: 10, border: `1px solid ${tokens.separator}`,
              background: tokens.surface, fontSize: 13, color: tokens.textTertiary,
            }}>Card name</div>
          </div>
          {/* Focus */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: tokens.accent, marginBottom: 4 }}>FOCUSED</div>
            <div style={{
              padding: "10px 14px", borderRadius: 10, border: `2px solid ${tokens.accent}`,
              background: tokens.surface, fontSize: 13, color: tokens.text,
              boxShadow: `0 0 0 3px ${tokens.accent}15`,
            }}>jane-doe-card</div>
          </div>
          {/* Error */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: tokens.red, marginBottom: 4 }}>ERROR</div>
            <div style={{
              padding: "10px 14px", borderRadius: 10, border: `2px solid ${tokens.red}`,
              background: `${tokens.red}04`, fontSize: 13, color: tokens.text,
            }}>jane doe</div>
            <div style={{ fontSize: 10, color: tokens.red, marginTop: 4, fontWeight: 500 }}>Card name must be alphanumeric with no spaces</div>
          </div>
        </div>
        <SpecTable rows={[
          ["Validation timing", "On blur for format checks; debounced 500ms for async uniqueness checks"],
          ["Error animation", "200ms horizontal shake (translateX ±4px) + border/shadow transition to red"],
          ["Success state", "Green checkmark fades in at right edge of input (200ms)"],
          ["Helper text", "Below input, Caption 2 size, secondary color. Shifts to red on error."],
          ["Required indicator", "Subtle red asterisk after label — no 'Required' text"],
          ["Group-locked", "Frosted overlay, lock icon, 'Managed by [Group Name]' label, cursor: not-allowed"],
        ]} />
      </Card>

      <Card title="Card Layouts" note="Card thumbnails are live mini-renders at 1:3 scale, not static screenshots. This ensures the preview always matches reality and reinforces the 'what you see is what you get' principle.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {/* Grid card */}
          <WireframeBox label="Grid View">
            <div style={{ padding: 4 }}>
              <WireframePlaceholder height={80} label="Live Preview" color={`${tokens.accent}10`} />
              <div style={{ padding: "8px 0" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: tokens.text }}>Card Name</div>
                <div style={{ fontSize: 10, color: tokens.textSecondary }}>Business · Active</div>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  <div style={{ fontSize: 9, color: tokens.green }}>● 142 views</div>
                  <div style={{ fontSize: 9, color: tokens.textTertiary }}>· 2h ago</div>
                </div>
              </div>
            </div>
          </WireframeBox>
          {/* List card */}
          <WireframeBox label="List View">
            <div style={{ display: "flex", gap: 8, alignItems: "center", padding: 4 }}>
              <WireframePlaceholder height={48} label="" color={`${tokens.accent}10`} rounded />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: tokens.text }}>Card Name</div>
                <div style={{ fontSize: 10, color: tokens.textSecondary }}>Business · 142 views</div>
              </div>
              <span style={{ color: tokens.textTertiary }}>›</span>
            </div>
          </WireframeBox>
          {/* Compact */}
          <WireframeBox label="Compact (Mobile)">
            <div style={{ display: "flex", gap: 6, alignItems: "center", padding: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: `${tokens.accent}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: tokens.accent,
              }}>JD</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>Jane Doe</div>
                <div style={{ fontSize: 9, color: tokens.textSecondary }}>Active</div>
              </div>
            </div>
          </WireframeBox>
        </div>
      </Card>

      <Card title="Toggle & Selection Components">
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          {/* Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 44, height: 26, borderRadius: 13, background: tokens.green,
              position: "relative",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11, background: "#fff",
                position: "absolute", top: 2, left: 20,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }} />
            </div>
            <span style={{ fontSize: 12, color: tokens.text }}>Section enabled</span>
          </div>
          {/* Segmented control */}
          <div style={{
            display: "flex", background: tokens.surfaceSecondary, borderRadius: 8, padding: 2,
          }}>
            {["Grid", "List"].map((v, i) => (
              <div key={v} style={{
                padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                background: i === 0 ? tokens.surface : "transparent",
                color: i === 0 ? tokens.text : tokens.textSecondary,
                boxShadow: i === 0 ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}>{v}</div>
            ))}
          </div>
          {/* Star rating */}
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} style={{ fontSize: 16, color: s <= 4 ? "#FFD60A" : tokens.textTertiary }}>★</span>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Data Visualization">
        <SpecTable rows={[
          ["Analytics charts", "SF Symbols style: thin lines, rounded caps, accent color fill with 10% opacity area. Library: Recharts or native Canvas."],
          ["Sparklines", "Inline 7-day trend, 48×16px, no axis/labels, single stroke in semantic color (green = up, red = down)."],
          ["Geolocation map", "Leaflet with light Apple Maps-style tiles. Markers clustered at far zoom, individual pins at close zoom."],
          ["Progress indicators", "Circular for uploads (determinate), linear for page loads (indeterminate), inline spinners for buttons."],
        ]} />
      </Card>
    </div>
  );
}

function AccessibilitySection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Dynamic Type Support" note="Every text element uses rem units tied to the system font size preference. The layout is tested and verified at 310% scaling — no truncation, no overlaps, no horizontal scrolling.">
        <SpecTable rows={[
          ["Implementation", "All sizes in rem relative to 17px base. CSS clamp() for min/max bounds."],
          ["310% test", "All screens verified: card thumbnails stack vertically, sidebar collapses to icons, table cells wrap text."],
          ["Line height", "Scales proportionally: 1.4× at default, increases to 1.6× at large sizes for readability."],
          ["Touch targets", "Minimum 44×44pt at all type sizes. Padding increases with font scale."],
        ]} />
      </Card>

      <Card title="VoiceOver Labels">
        <SpecTable rows={[
          ["Card thumbnail", "label: '{name}, {type} card, {status}' — hint: 'Double tap to edit. Swipe up for actions.'"],
          ["Section toggle", "label: '{section name}, {on/off}' — hint: 'Double tap to toggle. Three finger swipe to reorder.'"],
          ["Drag handle", "label: 'Reorder {section}' — hint: 'Double tap and hold, then swipe up or down to move.'"],
          ["Star rating", "label: '{n} of 5 stars' — trait: adjustable — hint: 'Swipe up or down to change rating.'"],
          ["Color swatch", "label: '{color name}, {hex value}' — hint: 'Double tap to open color picker.'"],
          ["Preview panel", "label: 'Card preview for {name}' — trait: image — hint: 'Pinch to zoom. Double tap to expand.'"],
          ["Group lock icon", "label: 'Section managed by {group name}' — hint: 'Content is controlled by a group collection and cannot be edited here.'"],
        ]} />
      </Card>

      <Card title="Color Contrast (WCAG AA)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 12 }}>
          {[
            { fg: "#1D1D1F", bg: "#FFFFFF", ratio: "18.1:1", pass: true },
            { fg: "#86868B", bg: "#FFFFFF", ratio: "4.6:1", pass: true },
            { fg: "#007AFF", bg: "#FFFFFF", ratio: "4.5:1", pass: true },
            { fg: "#FFFFFF", bg: "#007AFF", ratio: "4.5:1", pass: true },
            { fg: "#FF3B30", bg: "#FFFFFF", ratio: "4.0:1", pass: false, note: "Large text only" },
            { fg: "#34C759", bg: "#FFFFFF", ratio: "2.3:1", pass: false, note: "Icon only, paired with label" },
          ].map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "6px 10px",
              borderRadius: 8, border: `1px solid ${tokens.separator}`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 6, background: c.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: c.fg, border: `1px solid ${tokens.separator}`,
              }}>Aa</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: tokens.text }}>
                  {c.ratio} {c.pass ? "✅" : "⚠️"}
                </div>
                <div style={{ fontSize: 9, color: tokens.textSecondary }}>
                  {c.note || "Passes AA normal text"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: tokens.textSecondary, lineHeight: 1.6, margin: 0 }}>
          Red (#FF3B30) and green (#34C759) are never used as sole color indicators. Red error states pair with text labels and icons. Green success/active states pair with '✓' or text labels. Toggle on/off uses both color AND position.
        </p>
      </Card>

      <Card title="Reduce Motion & Focus">
        <SpecTable rows={[
          ["prefers-reduced-motion", "All transitions replaced with instant state changes. Drag-drop uses opacity change instead of spatial animation. Skeleton shimmer becomes static gray."],
          ["Focus indicators", "2px blue outline offset by 2px on all interactive elements. Visible on keyboard tab, hidden on mouse/touch interaction."],
          ["Focus order", "Logical document order: nav → main content → sidebar → modals. Skip-to-content link as first focusable element."],
          ["Screen reader announcements", "Live regions for: toast notifications, save status, validation errors, card creation success."],
          ["High contrast mode", "Borders become 2px solid, subtle background fills become fully opaque, separator opacity increased to 0.2."],
        ]} />
      </Card>
    </div>
  );
}

function MicroInteractionsSection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Transition Definitions" note="Every animation uses Apple's canonical spring curves. The system feels alive but never slow — no transition exceeds 500ms. prefers-reduced-motion disables all.">
        <SpecTable rows={[
          ["Page transition", "300ms cubic-bezier(0.25, 0.1, 0.25, 1) — content fades + translates 8px up"],
          ["Modal present", "350ms spring(0.5, 0.9) — scales from 95% + fades, backdrop fades 200ms"],
          ["Modal dismiss", "250ms cubic-bezier(0.25, 0.1, 0.25, 1) — reverse of present"],
          ["Bottom sheet", "spring(1, 0.85) — natural bounce at detent stops (50%, 100% height)"],
          ["Toggle switch", "200ms spring(0.5, 0.9) — thumb slides, track color cross-fades"],
          ["Accordion expand", "250ms cubic-bezier(0.25, 0.1, 0.25, 1) — height auto with opacity"],
          ["Drag reorder", "Picked item: 200ms scale(1.03) + shadow elevation. Drop: 300ms spring to final position."],
          ["Toast", "Enter: 200ms slide-down + fade. Hold: 1500ms. Exit: 150ms fade-out."],
          ["Button press", "100ms scale(0.97) on :active, immediate release on touch-end"],
          ["Skeleton shimmer", "1.5s linear infinite — gradient sweep left-to-right, paused in reduced-motion"],
        ]} />
      </Card>

      <Card title="Haptic Feedback Mapping">
        <SpecTable rows={[
          ["Button tap", "UIImpactFeedbackGenerator.light — subtle confirmation of interaction"],
          ["Toggle change", "UIImpactFeedbackGenerator.medium — distinct state change acknowledgment"],
          ["Drag pick up", "UIImpactFeedbackGenerator.medium — confirms grab"],
          ["Drag drop", "UINotificationFeedbackGenerator.success — confirms placement"],
          ["Delete confirm", "UINotificationFeedbackGenerator.warning — pause before destructive action"],
          ["Save success", "UINotificationFeedbackGenerator.success — operation completed"],
          ["Error/validation", "UINotificationFeedbackGenerator.error — attention needed"],
          ["Pull-to-refresh threshold", "UIImpactFeedbackGenerator.light — crossed refresh trigger point"],
        ]} />
      </Card>

      <Card title="Sound Design">
        <SpecTable rows={[
          ["Design principle", "Sounds are off by default. Users can enable in Settings → Sounds & Haptics."],
          ["Card published", "Soft ascending chime (major third interval, 200ms)"],
          ["Share sent", "Brief swoosh (100ms, reminiscent of iOS send sound)"],
          ["Error", "Subtle low tone (150ms, C3 to B2)"],
          ["Respects", "System silent mode switch — no sounds when device is silenced"],
        ]} />
      </Card>
    </div>
  );
}

function ResponsiveSection() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Card title="Breakpoint System" note="Breakpoints align with Apple's device categories. The design is fluid between breakpoints using percentage-based widths and flexible grids — it never 'snaps' awkwardly between sizes.">
        <SpecTable rows={[
          ["Mobile", "<768px — Single column, bottom tab bar, full-width cards, stack all content vertically"],
          ["Tablet Portrait", "768–1023px — Icon-only sidebar (72px), 2-column card grid, slide-over preview"],
          ["Tablet Landscape", "1024–1199px — Full sidebar (240px), 3-column grid, side-by-side editor+preview"],
          ["Desktop", "1200–1440px — Full sidebar, 4-column grid, split editor with generous margins"],
          ["Wide Desktop", ">1440px — Content maxes at 1440px, centered, sidebar remains fixed. No infinite stretch."],
        ]} />
      </Card>

      <Card title="Key Adaptations by Breakpoint">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text, marginBottom: 8 }}>Card List</div>
            <SpecTable rows={[
              ["Mobile", "Single column, compact cards with initials avatar"],
              ["Tablet", "2-column grid with mini-previews"],
              ["Desktop", "3–4 column grid with live card renders"],
            ]} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.text, marginBottom: 8 }}>Card Editor</div>
            <SpecTable rows={[
              ["Mobile", "Full-screen editor, floating 'Preview' toggle button bottom-right"],
              ["Tablet", "Full editor, preview opens as slide-over sheet (70% width)"],
              ["Desktop", "Split view: 55% editor / 45% live preview, always visible"],
            ]} />
          </div>
        </div>
      </Card>

      <Card title="Orientation & Device Handling">
        <SpecTable rows={[
          ["Portrait → Landscape", "Sidebar appears/expands, card grid gains columns, editor may split. Transition: 200ms layout animation."],
          ["Landscape → Portrait", "Sidebar hides to tab bar, grid reduces columns, editor collapses to single pane. State preserved."],
          ["iPad multitasking", "Supports Split View (50/50, 70/30) and Slide Over. At narrowest, matches mobile layout."],
          ["Foldable (Galaxy Fold)", "Unfolded: tablet layout. Folded cover: mobile layout. Flex mode (L-shape): editor top half, preview bottom half."],
          ["Safe areas", "Respects env(safe-area-inset-*) for notches, Dynamic Island, home indicator bar."],
          ["Keyboard avoidance", "Form fields scroll into view with 16px padding above keyboard. Preview panel collapses on mobile."],
        ]} />
      </Card>

      <Card title="Performance Budgets">
        <SpecTable rows={[
          ["First Contentful Paint", "<1.5s on 4G connection"],
          ["Time to Interactive", "<3s — card list renders skeletons immediately, hydrates progressively"],
          ["Card preview render", "<100ms per card thumbnail (Canvas/WebGL based mini-render)"],
          ["Image optimization", "WebP with AVIF fallback, srcset for 1×/2×/3×, lazy loading below fold"],
          ["Bundle size", "Route-level code splitting, shared chunk for card renderer (<200KB gzipped total)"],
          ["Offline", "Service worker caches shell + last-viewed cards. Editor works offline with sync-on-reconnect."],
        ]} />
      </Card>
    </div>
  );
}

// ─── MAIN APP ───

export default function PersonalyzDesignSpec() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [showTOC, setShowTOC] = useState(false);

  const sectionMap = {
    "Overview": <OverviewSection />,
    "Hierarchy": <HierarchySection />,
    "Navigation": <NavigationSection />,
    "Screens": <ScreensSection />,
    "Components": <ComponentsSection />,
    "Accessibility": <AccessibilitySection />,
    "Micro-interactions": <MicroInteractionsSection />,
    "Responsive": <ResponsiveSection />,
  };

  return (
    <div style={{
      minHeight: "100vh", background: tokens.bg,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      color: tokens.text, WebkitFontSmoothing: "antialiased",
    }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100, padding: "16px 24px",
        background: tokens.glass, backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: `1px solid ${tokens.glassBorder}`,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: tokens.textSecondary, textTransform: "uppercase" }}>
                Apple HIG Design Specification
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: tokens.text }}>
                Personalyz Admin
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600,
                background: `${tokens.green}15`, color: tokens.green,
              }}>v2.0</span>
              <span style={{ fontSize: 11, color: tokens.textSecondary }}>Feb 2026</span>
            </div>
          </div>
          <PillNav items={SECTIONS} active={activeSection} onChange={setActiveSection} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 80px" }}>
        {sectionMap[activeSection]}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "24px", fontSize: 11, color: tokens.textTertiary,
        borderTop: `1px solid ${tokens.separator}`,
      }}>
        Personalyz Admin UI Design Specification · Apple Human Interface Guidelines · 8 Screens · Full Component System
      </div>
    </div>
  );
}
