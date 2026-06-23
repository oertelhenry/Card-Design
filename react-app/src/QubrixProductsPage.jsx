const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#E07B3A" fillOpacity="0.12" />
    <path d="M6 10.5L8.5 13L14 7.5" stroke="#E07B3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LOCK_ICON = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#94A3B8" fillOpacity="0.12" />
    <rect x="6.5" y="9" width="7" height="5.5" rx="1" stroke="#94A3B8" strokeWidth="1.4" />
    <path d="M7.5 9V7.5a2.5 2.5 0 0 1 5 0V9" stroke="#94A3B8" strokeWidth="1.4" />
  </svg>
);

const plans = [
  {
    id: "free",
    name: "Free",
    badge: null,
    price: "R 0",
    period: "ZAR / month",
    tagline: "Get started at no cost",
    cta: "Your current plan",
    ctaStyle: "outline",
    features: [
      { text: "View available projects", included: true },
      { text: "Manage existing projects", included: true },
      { text: "Basic profile listing", included: true },
      { text: "Quote creation", included: false },
      { text: "Quote bank access", included: false },
      { text: "Invite to quote", included: false },
      { text: "Payment requests", included: false },
    ],
    accentColor: "#64748B",
    borderHighlight: false,
  },
  {
    id: "pro3",
    name: "3 Month Subscription",
    badge: null,
    price: "R 3 000",
    period: "ZAR / 3 months (incl. VAT)",
    tagline: "Full system access for 3 months",
    cta: "Subscribe",
    ctaStyle: "secondary",
    features: [
      { text: "Full quote creation & management", included: true },
      { text: "Quote bank access", included: true },
      { text: "Payment requests", included: true },
      { text: "Invite to quote", included: true },
      { text: "Verified builder badge", included: true },
      { text: "3 months continuous access", included: true },
    ],
    accentColor: "#1E293B",
    borderHighlight: false,
  },
  {
    id: "pro6",
    name: "6 Month Subscription",
    badge: null,
    price: "R 5 000",
    period: "ZAR / 6 months (incl. VAT)",
    tagline: "Full system access for 6 months",
    cta: "Subscribe",
    ctaStyle: "secondary",
    features: [
      { text: "Full quote creation & management", included: true },
      { text: "Quote bank access", included: true },
      { text: "Payment requests", included: true },
      { text: "Invite to quote", included: true },
      { text: "Verified builder badge", included: true },
      { text: "Priority project matching", included: true },
      { text: "6 months continuous access", included: true },
    ],
    accentColor: "#1E293B",
    borderHighlight: false,
    saving: "Save R 1 000 vs the 3-month rate",
  },
  {
    id: "pro12",
    name: "12 Month Subscription",
    badge: "BEST VALUE",
    price: "R 10 000",
    period: "ZAR / 12 months (incl. VAT)",
    tagline: "Full system access for 12 months",
    cta: "Subscribe",
    ctaStyle: "primary",
    features: [
      { text: "Full quote creation & management", included: true },
      { text: "Quote bank access", included: true },
      { text: "Payment requests", included: true },
      { text: "Invite to quote", included: true },
      { text: "Verified builder badge", included: true },
      { text: "Priority project matching", included: true },
      { text: "Dedicated account support", included: true },
      { text: "12 months continuous access", included: true },
    ],
    accentColor: "#E07B3A",
    borderHighlight: true,
    saving: "Save R 2 000 vs the 3-month rate",
  },
];

function PlanCard({ plan }) {
  const isOutline = plan.ctaStyle === "outline";
  const isPrimary = plan.ctaStyle === "primary";

  return (
    <div
      style={{
        background: plan.borderHighlight ? "#1a1a2e" : "#FFFFFF",
        border: plan.borderHighlight
          ? `2px solid ${plan.accentColor}`
          : "1.5px solid #E2E8F0",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
        boxShadow: plan.borderHighlight
          ? `0 8px 32px rgba(224,123,58,0.18)`
          : "0 2px 8px rgba(0,0,0,0.06)",
        minWidth: 220,
        flex: "1 1 0",
        color: plan.borderHighlight ? "#F1F5F9" : "#1E293B",
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: plan.badge === "BEST VALUE" ? "#1E293B" : "#64748B",
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "3px 12px",
            borderRadius: 20,
            whiteSpace: "nowrap",
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Plan name */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 12,
          color: plan.borderHighlight ? "#FFFFFF" : "#0F172A",
        }}
      >
        {plan.name}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 4, display: "flex", alignItems: "flex-end", gap: 4 }}>
        <span
          style={{
            fontSize: 38,
            fontWeight: 800,
            lineHeight: 1,
            color: plan.borderHighlight ? "#FFFFFF" : "#0F172A",
          }}
        >
          {plan.price}
        </span>
      </div>
      <div
        style={{
          fontSize: 12,
          color: plan.borderHighlight ? "#94A3B8" : "#64748B",
          marginBottom: 8,
        }}
      >
        {plan.period}
      </div>

      {/* Saving tag */}
      {plan.saving && (
        <div
          style={{
            display: "inline-block",
            background: "rgba(224,123,58,0.12)",
            color: "#E07B3A",
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 10px",
            borderRadius: 20,
            marginBottom: 8,
          }}
        >
          {plan.saving}
        </div>
      )}

      {/* Tagline */}
      <div
        style={{
          fontSize: 13,
          color: plan.borderHighlight ? "#CBD5E1" : "#475569",
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        {plan.tagline}
      </div>

      {/* CTA Button */}
      <button
        style={{
          width: "100%",
          padding: "11px 0",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          cursor: isOutline ? "default" : "pointer",
          marginBottom: 20,
          border: isOutline
            ? `1.5px solid ${plan.borderHighlight ? "#475569" : "#CBD5E1"}`
            : "none",
          background: isOutline
            ? "transparent"
            : isPrimary
            ? "#E07B3A"
            : "#1E293B",
          color: isOutline
            ? plan.borderHighlight
              ? "#94A3B8"
              : "#94A3B8"
            : "#FFFFFF",
          transition: "opacity 0.15s",
        }}
        disabled={isOutline}
      >
        {plan.cta}
      </button>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: plan.borderHighlight ? "rgba(255,255,255,0.08)" : "#F1F5F9",
          marginBottom: 16,
        }}
      />

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {f.included ? CHECK_ICON : LOCK_ICON}
            <span
              style={{
                fontSize: 13,
                color: f.included
                  ? plan.borderHighlight
                    ? "#E2E8F0"
                    : "#334155"
                  : "#94A3B8",
                textDecoration: f.included ? "none" : "none",
              }}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", section: "MAIN" },
  { label: "Projects", icon: "folder_open", section: "MAIN" },
  { label: "Quotes", icon: "request_quote", section: "MAIN" },
  { label: "Messages", icon: "chat_bubble_outline", section: "MAIN" },
  { label: "Active Jobs", icon: "work_outline", section: "MY WORK" },
  { label: "Profile & Company", icon: "person_outline", section: "ACCOUNT" },
  { label: "Plans", icon: "workspace_premium", section: "ACCOUNT", active: true },
];

function Sidebar({ userPlan = "free" }) {
  const isPaid = userPlan !== "free";
  const sections = ["MAIN", "MY WORK", "ACCOUNT"];
  return (
    <aside
      style={{
        width: 210,
        minHeight: "100vh",
        background: "#141C27",
        display: "flex",
        flexDirection: "column",
        padding: "0 0 24px 0",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>QB</span>
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>QUBRIX</div>
            <div style={{ color: "#64748B", fontSize: 9, letterSpacing: "0.06em" }}>Quantify Qualify without Qualm</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px 0 12px" }}>
        {sections.map((section) => {
          const items = NAV_ITEMS.filter((n) => n.section === section);
          if (!items.length) return null;
          return (
            <div key={section} style={{ marginBottom: 8 }}>
              <div
                style={{
                  color: "#475569",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "10px 8px 4px 8px",
                  textTransform: "uppercase",
                }}
              >
                {section}
              </div>
              {items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: item.active ? "rgba(224,123,58,0.14)" : "transparent",
                    color: item.active ? "#E07B3A" : "#94A3B8",
                    fontWeight: item.active ? 600 : 400,
                    fontSize: 13,
                    marginBottom: 1,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 17, opacity: item.active ? 1 : 0.7 }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div
        style={{
          margin: "0 12px",
          padding: "10px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#E07B3A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          HO
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#E2E8F0", fontSize: 12, fontWeight: 600, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Henry Oertel
          </div>
          <div style={{ color: "#64748B", fontSize: 10 }}>{isPaid ? "Verified Builder" : "Free"}</div>
        </div>
        {!isPaid && (
          <button
            style={{
              flexShrink: 0,
              background: "#2D3748",
              border: "none",
              color: "#E2E8F0",
              fontSize: 11,
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: 6,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Upgrade
          </button>
        )}
      </div>
    </aside>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header
      style={{
        height: 56,
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F5F9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        flexShrink: 0,
      }}
    >
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Plans & Pricing</div>
        <div style={{ fontSize: 12, color: "#94A3B8" }}>Choose the plan that works for your business</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            padding: "6px 12px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: "#94A3B8" }}>search</span>
          <span style={{ fontSize: 12, color: "#CBD5E1" }}>Search…</span>
          <kbd style={{ fontSize: 10, color: "#CBD5E1", background: "#F1F5F9", borderRadius: 4, padding: "1px 5px" }}>⌘K</kbd>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FEE2E2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#EF4444" }}>notifications</span>
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              background: "#EF4444",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              borderRadius: 10,
              padding: "1px 4px",
            }}
          >
            4
          </span>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#1E293B",
            border: "none",
            color: "#F1F5F9",
            fontSize: 13,
            fontWeight: 600,
            padding: "7px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 14 }}>✦</span>
          Upgrade
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            fontSize: 13,
            color: "#64748B",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

// ─── Products Page ────────────────────────────────────────────────────────────

export default function QubrixProductsPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Sidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", overflow: "auto" }}>
          <TopBar />

          <main style={{ flex: 1, padding: "32px 28px 48px 28px" }}>
            {/* Hero section */}
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(224,123,58,0.1)",
                  color: "#E07B3A",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "4px 14px",
                  borderRadius: 20,
                  marginBottom: 12,
                  textTransform: "uppercase",
                }}
              >
                Flexible Plans
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", margin: "0 0 8px 0" }}>
                Find the right plan for your business
              </h1>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                All plans include access to the Qubrix builder platform. Upgrade or cancel anytime.
              </p>
            </div>

            {/* Filter tabs */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <div
                style={{
                  display: "inline-flex",
                  background: "#EEF2FF",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <button
                  style={{
                    padding: "7px 18px",
                    borderRadius: 7,
                    border: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "default",
                    background: "#FFFFFF",
                    color: "#0F172A",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Plans
                </button>
              </div>
            </div>

            {/* Plan cards */}
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "stretch",
              }}
            >
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* Footer note */}
            <p
              style={{
                textAlign: "center",
                marginTop: 32,
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              All prices are inclusive of VAT where indicated. Need help choosing?{" "}
              <span style={{ color: "#E07B3A", cursor: "pointer", fontWeight: 600 }}>Contact our support team</span>
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
