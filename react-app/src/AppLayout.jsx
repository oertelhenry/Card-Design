/**
 * AppLayout.jsx — Static JSX representation of the entire cards-admin Angular app.
 * Covers every route, shell, and modal. State/handlers are stubs.
 */
import './AppLayout.css';

// ─────────────────────────────────────────────────────────────────────────────
// ICON (stub)
// ─────────────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color || "currentColor"} strokeWidth={1.8} strokeLinecap="round" />
);

// ─────────────────────────────────────────────────────────────────────────────
// COMMAND PALETTE
// ─────────────────────────────────────────────────────────────────────────────
const CommandPalette = ({ isOpen = false }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="cp-backdrop" />
      <div className="cp-panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cp-search-row">
          <Icon name="search" size={16} className="cp-search-icon" />
          <input className="cp-input" type="text" placeholder="Search pages and help…"
            autoComplete="off" spellCheck="false" />
          <kbd className="cp-esc-key">Esc</kbd>
        </div>
        <ul className="cp-results" role="listbox">
          <li className="cp-group-label" role="presentation">Pages</li>
          {["Dashboard", "All Cards", "Analytics", "Users", "Companies",
            "Notifications", "Settings", "Help"].map((label) => (
            <li key={label} className="cp-item" role="option">
              <div className="cp-item-main">
                <span className="cp-item-label">{label}</span>
              </div>
            </li>
          ))}
          <li className="cp-group-label" role="presentation">Help</li>
          <li className="cp-item cp-item--help" role="option">
            <div className="cp-item-main">
              <span className="cp-item-label">
                <Icon name="help" size={13} className="cp-help-icon" /> Getting started
              </span>
            </div>
          </li>
        </ul>
        <div className="cp-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard",     label: "Dashboard",     icon: "home",     route: "/admin" },
  { id: "cards",         label: "Cards",          icon: "cards",    route: "/admin/cards" },
  { id: "microsites",    label: "Microsites",     icon: "globe",    route: "/admin/microsites" },
  { id: "analytics",     label: "Analytics",      icon: "chart",    route: "/admin/analytics" },
  { id: "users",         label: "Users",          icon: "users",    route: "/admin/users" },
  { id: "companies",     label: "Companies",      icon: "building", route: "/admin/companies" },
  { id: "notifications", label: "Notifications",  icon: "bell",     route: "/admin/notifications" },
  { id: "settings",      label: "Settings",       icon: "settings", route: "/admin/settings" },
  { id: "help",          label: "Help",           icon: "help",     route: "/admin/help" },
];

const Sidebar = ({ collapsed = false }) => (
  <nav className={`sidebar${collapsed ? " collapsed" : ""}`}>
    {/* Logo */}
    <div className="sidebar-logo">
      <div className="logo-icon">P</div>
      {!collapsed && <span className="logo-text">Personalyz</span>}
    </div>

    {/* Nav items */}
    <ul className="nav-list">
      {navItems.map((item) => (
        <li key={item.id}>
          <a className="nav-item" href={item.route} title={collapsed ? item.label : ""}>
            <Icon name={item.icon} size={18} className="nav-icon" />
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </a>
        </li>
      ))}
      {/* Imports — shown only for specific user */}
      <li>
        <a className="nav-item" href="/admin/imports" title={collapsed ? "Imports" : ""}>
          <Icon name="upload" size={18} className="nav-icon" />
          {!collapsed && <span className="nav-label">Imports</span>}
        </a>
      </li>
    </ul>

    {/* User footer */}
    <div className="sidebar-user" title={collapsed ? "Jane Smith" : ""}>
      <div className="user-avatar">J</div>
      {!collapsed && (
        <div className="user-info">
          <span className="user-name">Jane Smith</span>
          <span className="user-email">jane@company.com</span>
        </div>
      )}
      <button className="logout-btn" aria-label="Log out" title="Log out">
        <Icon name="x" size={15} />
      </button>
    </div>

    {/* Collapse toggle */}
    <button className="collapse-btn" aria-label="Toggle sidebar">
      <Icon name={collapsed ? "chevRight" : "chevLeft"} size={16} />
    </button>
  </nav>
);

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────
const Topbar = ({ title, subtitle, children, darkMode = false, avatarOpen = false }) => (
  <header className="topbar">
    <div className="topbar-title-area">
      <h1 className="topbar-title">{title}</h1>
      {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
    </div>

    <div className="topbar-right">
      {/* Search */}
      <div className="search-wrap" role="button" aria-label="Open search">
        <Icon name="search" size={15} className="search-icon" />
        <input className="search-input" placeholder="Search… ⌘K" readOnly tabIndex={-1} />
      </div>

      {/* Page action slot */}
      {children}

      {/* Dark mode toggle */}
      <button className="theme-toggle"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
        <Icon name={darkMode ? "sun" : "moon"} size={17} />
      </button>

      {/* Avatar + dropdown */}
      <div className="avatar-wrap">
        <div className={`avatar${avatarOpen ? " avatar--open" : ""}`}>JS</div>
        {avatarOpen && (
          <div className="avatar-dropdown">
            <div className="avatar-dropdown-header">
              <span className="avatar-dropdown-name">Jane Smith</span>
              <span className="avatar-dropdown-email">jane@company.com</span>
            </div>
            <div className="avatar-dropdown-divider" />
            <button className="avatar-dropdown-item avatar-dropdown-item--danger">
              <Icon name="x" size={14} /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN LAYOUT SHELL
// ─────────────────────────────────────────────────────────────────────────────
const AdminLayout = ({ children, sidebarCollapsed = false }) => (
  <>
    <div className="shell">
      <Sidebar collapsed={sidebarCollapsed} />
      <main className="main">
        {children}
      </main>
    </div>
    <CommandPalette isOpen={false} />
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// AUTH PAGE  (/auth/login | /register | /forgot-password | /reset-password)
// ─────────────────────────────────────────────────────────────────────────────
const AuthPage = ({ mode = "login" }) => {
  const titles = { login: "Welcome back", register: "Create account",
    forgot: "Reset your password", reset: "Set new password" };
  const subtitles = { login: "Sign in to your Personalyz account",
    register: "Start managing digital cards", forgot: "We'll email you a link",
    reset: "Enter your new password below" };
  const submitLabels = { login: "Sign in", register: "Create account",
    forgot: "Send reset link", reset: "Reset password" };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="brand">
          <span className="brand-mark" />
          <span className="brand-name">Personalyz</span>
        </div>

        {/* Heading */}
        <div className="auth-header">
          <h1 className="auth-title">{titles[mode]}</h1>
          <p className="auth-subtitle">{subtitles[mode]}</p>
        </div>

        {/* Alerts */}
        <div className="alert alert-error" role="alert" style={{ display: "none" }}>
          Invalid credentials.
        </div>

        <form className="auth-form" noValidate>
          {/* LOGIN */}
          {mode === "login" && (
            <>
              <div className="field">
                <label className="label" htmlFor="username">Username or email</label>
                <input id="username" className="input" type="text"
                  autoComplete="username" placeholder="Enter your username" />
              </div>
              <div className="field">
                <label className="label" htmlFor="password">
                  <span>Password</span>
                  <a className="label-link" href="/auth/forgot-password">Forgot password?</a>
                </label>
                <div className="pw-wrap">
                  <input id="password" className="input" type="password"
                    autoComplete="current-password" placeholder="••••••••" />
                  <button type="button" className="pw-toggle" aria-label="Show password">
                    <Icon name="eye" size={15} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* REGISTER */}
          {mode === "register" && (
            <>
              <div className="field-row">
                <div className="field">
                  <label className="label" htmlFor="firstName">First name</label>
                  <input id="firstName" className="input" type="text"
                    autoComplete="given-name" placeholder="Jane" />
                </div>
                <div className="field">
                  <label className="label" htmlFor="lastName">Last name</label>
                  <input id="lastName" className="input" type="text"
                    autoComplete="family-name" placeholder="Smith" />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="reg-email">Email</label>
                <input id="reg-email" className="input" type="email"
                  autoComplete="email" placeholder="jane@company.com" />
              </div>
              <div className="field">
                <label className="label" htmlFor="knownAs">
                  <span>Display name</span>
                  <span className="label-hint">optional</span>
                </label>
                <input id="knownAs" className="input" type="text"
                  autoComplete="nickname" placeholder="How should we call you?" />
              </div>
              <div className="field">
                <label className="label" htmlFor="reg-password">Password</label>
                <div className="pw-wrap">
                  <input id="reg-password" className="input" type="password"
                    autoComplete="new-password" placeholder="••••••••" />
                  <button type="button" className="pw-toggle" aria-label="Show password">
                    <Icon name="eye" size={15} />
                  </button>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="confirmPassword">Confirm password</label>
                <div className="pw-wrap">
                  <input id="confirmPassword" className="input" type="password"
                    autoComplete="new-password" placeholder="••••••••" />
                  <button type="button" className="pw-toggle" aria-label="Show password">
                    <Icon name="eye" size={15} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* FORGOT */}
          {mode === "forgot" && (
            <div className="field">
              <label className="label" htmlFor="forgot-email">Email address</label>
              <input id="forgot-email" className="input" type="email"
                autoComplete="email" placeholder="jane@company.com" />
            </div>
          )}

          {/* RESET */}
          {mode === "reset" && (
            <>
              <div className="field">
                <label className="label" htmlFor="new-password">New password</label>
                <div className="pw-wrap">
                  <input id="new-password" className="input" type="password"
                    autoComplete="new-password" placeholder="••••••••" />
                  <button type="button" className="pw-toggle" aria-label="Show password">
                    <Icon name="eye" size={15} />
                  </button>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="confirm-new-password">Confirm new password</label>
                <div className="pw-wrap">
                  <input id="confirm-new-password" className="input" type="password"
                    autoComplete="new-password" placeholder="••••••••" />
                  <button type="button" className="pw-toggle" aria-label="Show password">
                    <Icon name="eye" size={15} />
                  </button>
                </div>
              </div>
            </>
          )}

          <button className="btn-submit" type="submit">{submitLabels[mode]}</button>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD  (/admin)
// ─────────────────────────────────────────────────────────────────────────────
const DashboardPage = () => (
  <>
    <Topbar title="Dashboard" subtitle="Welcome back, Jane" />
    <div className="page-body">

      {/* Stat row */}
      <div className="stat-row">
        {[
          { label: "Total Cards",    icon: "cards",  accent: "accent",  value: 48 },
          { label: "Business Cards", icon: "users",  accent: "success", value: 21 },
          { label: "Vehicle Cards",  icon: "car",    accent: "purple",  value: 15 },
          { label: "Generic Cards",  icon: "globe",  accent: "warning", value: 12 },
        ].map(({ label, icon, accent, value }) => (
          <div key={label} className="stat-card">
            <div className={`stat-icon-wrap ${accent}`}>
              <Icon name={icon} size={20} />
            </div>
            <div className="stat-body">
              <span className="stat-label">{label}</span>
              <span className="stat-value">{value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Entitlement panel */}
      <div className="entitlement-panel">
        <div className="entitlement-header">
          <span className="panel-title">Card Entitlements</span>
          <a className="panel-link" href="/admin/companies">Manage companies →</a>
        </div>
        <div className="entitlement-stats">
          <div className="ent-stat">
            <span className="ent-val">100</span>
            <span className="ent-lbl">Purchased</span>
          </div>
          <div className="ent-divider" />
          <div className="ent-stat">
            <span className="ent-val accent">48</span>
            <span className="ent-lbl">Allocated</span>
          </div>
          <div className="ent-divider" />
          <div className="ent-stat">
            <span className="ent-val success">52</span>
            <span className="ent-lbl">Available</span>
          </div>
        </div>
        <div className="ent-bar-wrap">
          <div className="ent-bar">
            <div className="ent-bar-fill" style={{ width: "48%" }} />
          </div>
          <span className="ent-bar-label">48% allocated</span>
        </div>
      </div>

      {/* Main two-column grid */}
      <div className="main-grid">
        {/* Recent cards panel */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Recent Cards</span>
            <a className="panel-link" href="/admin/cards">View all →</a>
          </div>
          <div className="recent-cards-empty">
            <Icon name="cards" size={32} />
            <p>Recent cards will appear here once the API is ready.</p>
          </div>
        </div>

        {/* Right column */}
        <div className="right-col">
          {/* Quick Actions */}
          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Quick Actions</span>
            </div>
            <div className="quick-actions">
              {[
                { label: "New Business Card", icon: "users",    route: "/admin/cards/new" },
                { label: "New Vehicle Card",  icon: "car",      route: "/admin/cards/new/vehicle" },
                { label: "Manage Users",      icon: "users",    route: "/admin/users" },
                { label: "View Analytics",    icon: "chart",    route: "/admin/analytics" },
              ].map(({ label, icon, route }) => (
                <a key={label} className="qa-btn" href={route}>
                  <div className="qa-icon"><Icon name={icon} size={16} /></div>
                  <span className="qa-label">{label}</span>
                  <Icon name="chevRight" size={14} className="qa-chevron" />
                </a>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="panel panel-flex">
            <div className="panel-head">
              <span className="panel-title">Activity</span>
            </div>
            <div className="activity-empty">
              <Icon name="clock" size={28} />
              <p>Activity feed coming soon.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// SHARE MODAL (reused on Cards page and Card Editor)
// ─────────────────────────────────────────────────────────────────────────────
const ShareModal = ({ subMode = null, copied = false, onClose }) => (
  <>
    <div className="cs-backdrop" onClick={onClose} />
    <div className="cs-modal" role="dialog" aria-modal="true">
      {subMode === null && (
        <>
          <div className="cs-modal-header">
            <span className="cs-modal-title">Share Card</span>
            <button className="cs-modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="cs-option-grid">
            {[
              { label: "WhatsApp", icon: "whatsapp" },
              { label: "Email",    icon: "email" },
              { label: "QR Code",  icon: "qr" },
              { label: copied ? "Copied!" : "Other", icon: "dots" },
            ].map(({ label }) => (
              <button key={label} className="cs-option-btn">
                <span className="cs-option-icon" />
                <span className="cs-option-label">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {subMode === "email" && (
        <>
          <div className="cs-modal-header">
            <button className="cs-modal-back" aria-label="Back">←</button>
            <span className="cs-modal-title">Share via Email</span>
            <button className="cs-modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="cs-modal-body">
            <p className="cs-share-prompt">Enter the email address to share this card with:</p>
            <div className="cs-modal-field">
              <label className="cs-modal-label">Email Address <span className="cs-modal-req">*</span></label>
              <input className="cs-modal-input" type="email" placeholder="recipient@example.com" />
            </div>
            <div className="cs-modal-actions">
              <button className="cs-modal-cancel">Back</button>
              <button className="cs-modal-submit">Share Card</button>
            </div>
          </div>
        </>
      )}

      {subMode === "qr" && (
        <>
          <div className="cs-modal-header">
            <button className="cs-modal-back" aria-label="Back">←</button>
            <span className="cs-modal-title">QR Code</span>
            <button className="cs-modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="cs-qr-body">
            <p className="cs-share-prompt">Scan the code below to open this card:</p>
            <img className="cs-qr-img" src="/qr-placeholder.png" alt="QR Code" />
          </div>
        </>
      )}
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION (shared)
// ─────────────────────────────────────────────────────────────────────────────
const Pagination = ({ page = 1, totalPages = 5, total = 50, label = "cards" }) => (
  <div className="pagination">
    <span className="pagination-info">
      Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} of {total} {label}
    </span>
    <div className="pagination-controls">
      <button className="page-btn page-nav" disabled={page === 1} aria-label="Previous page">
        <Icon name="chevLeft" size={14} />
      </button>
      {[1, 2, 3, "…", totalPages].map((p, i) => (
        typeof p === "string"
          ? <span key={`e${i}`} className="page-ellipsis">…</span>
          : <button key={p} className={`page-btn${p === page ? " active" : ""}`}>{p}</button>
      ))}
      <button className="page-btn page-nav" disabled={page === totalPages} aria-label="Next page">
        <Icon name="chevRight" size={14} />
      </button>
    </div>
    <div className="page-size-wrap">
      <label className="page-size-label">Per page</label>
      <select className="page-size-select" defaultValue={10}>
        {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CARDS PAGE  (/admin/cards)
// ─────────────────────────────────────────────────────────────────────────────
const sampleCards = [
  { id: 1, name: "john-doe",    type: "Business", companyName: "Acme Corp",  orgUnitName: "Sales",  createdAt: "2024-11-01", enabled: true,  thumbUrl: null },
  { id: 2, name: "ford-ranger", type: "Vehicle",  companyName: "AutoMax",    orgUnitName: null,     createdAt: "2024-10-15", enabled: true,  thumbUrl: null },
  { id: 3, name: "promo-2024",  type: "Generic",  companyName: "TechStart",  orgUnitName: "Mktg",   createdAt: "2024-09-22", enabled: false, thumbUrl: null },
];

const CardsPage = ({ view = "list", filter = "All", showShareModal = false }) => (
  <>
    <Topbar title="All Cards" subtitle="Cards across all companies">
      <button className="btn-primary">
        <Icon name="plus" size={14} /> New Card
      </button>
    </Topbar>

    <div className="page-body">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <Icon name="search" size={14} className="search-icon" />
            <input className="search-input" placeholder="Search cards…" />
          </div>
          <select className="filter-select" defaultValue="">
            <option value="">All Companies</option>
            <option>Acme Corp</option>
            <option>AutoMax</option>
          </select>
          <div className="filter-pills">
            {["All", "Business", "Vehicle", "Generic"].map((t) => (
              <button key={t} className={`pill${filter === t ? " active" : ""}`}>{t}</button>
            ))}
          </div>
        </div>

        {filter === "Business" && (
          <button className="btn-group-items">
            <Icon name="cards" size={13} /> Group Items
          </button>
        )}
        {filter === "Vehicle" && (
          <button className="btn-group-items">
            <Icon name="car" size={13} /> Test Drives Analytics
          </button>
        )}

        <div className="view-toggle">
          <button className={`view-btn${view === "list" ? " active" : ""}`} aria-label="List view">
            <Icon name="list" size={16} />
          </button>
          <button className={`view-btn${view === "grid" ? " active" : ""}`} aria-label="Grid view">
            <Icon name="cards" size={16} />
          </button>
        </div>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="list-surface">
          <table className="list-table">
            <thead>
              <tr>
                <th>Card</th>
                <th className="th-org">Company / Unit</th>
                <th className="th-date">Created</th>
                <th className="th-actions" />
              </tr>
            </thead>
            <tbody>
              {sampleCards.map((card) => (
                <tr key={card.id} className="list-row">
                  <td className="td-card">
                    <div className="card-cell">
                      <div className={`card-thumb thumb-${card.type.toLowerCase()}`}>
                        <Icon name={card.type === "Vehicle" ? "car" : card.type === "Generic" ? "globe" : "users"} size={16} />
                      </div>
                      <div className="card-meta">
                        <span className="card-name card-name--link">{card.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="td-org">
                    <span className="org-name">{card.companyName}</span>
                    {card.orgUnitName && <span className="org-unit">{card.orgUnitName}</span>}
                  </td>
                  <td className="td-date">{card.createdAt}</td>
                  <td className="td-actions">
                    <div className="row-actions">
                      <button className="row-btn" aria-label="Edit card"><Icon name="edit" size={14} /></button>
                      <button className="row-btn" aria-label="Preview card"><Icon name="eye" size={14} /></button>
                      <button className="row-btn" aria-label="Share card"><Icon name="share" size={14} /></button>
                      <button className="row-btn" aria-label="Duplicate card"><Icon name="copy" size={14} /></button>
                      <button className="row-btn row-btn--danger" aria-label="Delete card"><Icon name="trash" size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid">
          {sampleCards.map((card) => (
            <div key={card.id} className="grid-card">
              <div className={`grid-thumb thumb-${card.type.toLowerCase()}`}>
                <div className="grid-icon-wrap">
                  <Icon name={card.type === "Vehicle" ? "car" : "users"} size={24} />
                </div>
                <span className={`badge status-corner ${card.enabled ? "badge-active" : "badge-inactive"}`}>
                  {card.enabled ? "Active" : "Inactive"}
                </span>
                <div className="grid-thumb-overlay">
                  <button className="grid-action-btn" aria-label="Edit card"><Icon name="edit" size={15} /></button>
                  <button className="grid-action-btn" aria-label="Preview card"><Icon name="eye" size={15} /></button>
                  <button className="grid-action-btn" aria-label="Share card"><Icon name="share" size={15} /></button>
                  <button className="grid-action-btn" aria-label="Duplicate card"><Icon name="copy" size={15} /></button>
                  <button className="grid-action-btn grid-action-btn--danger" aria-label="Delete card"><Icon name="trash" size={15} /></button>
                </div>
              </div>
              <div className="grid-body">
                <p className="grid-name">{card.name}</p>
                <p className="grid-company">{card.companyName}</p>
                <p className="grid-date">{card.createdAt}</p>
              </div>
              <div className="grid-footer">
                <span className={`badge badge-${card.type.toLowerCase()}`}>{card.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination total={3} totalPages={1} label="cards" />
    </div>

    {showShareModal && <ShareModal subMode={null} />}
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// CARD NEW PROFILE  (/admin/cards/new)
// ─────────────────────────────────────────────────────────────────────────────
const themes = [
  { id: "classic",    label: "Classic",    tagline: "Clean & professional",  accentTop: "#1a1a2e", accentBot: "#16213e" },
  { id: "ocean",      label: "Ocean",      tagline: "Cool blue tones",       accentTop: "#0077b6", accentBot: "#023e8a" },
  { id: "forest",     label: "Forest",     tagline: "Natural & refreshing",  accentTop: "#2d6a4f", accentBot: "#1b4332" },
  { id: "sunset",     label: "Sunset",     tagline: "Warm & vibrant",        accentTop: "#e85d04", accentBot: "#9d0208" },
  { id: "midnight",   label: "Midnight",   tagline: "Dark & elegant",        accentTop: "#240046", accentBot: "#10002b" },
  { id: "slate",      label: "Slate",      tagline: "Modern & minimal",      accentTop: "#334155", accentBot: "#1e293b" },
];

const CardNewProfilePage = () => (
  <>
    <Topbar title="New Card" subtitle="Choose a profile template to get started" />
    <div className="profile-page">
      <div className="intro">
        <h2 className="intro-title">Select a profile</h2>
        <p className="intro-sub">
          Each profile gives your card a unique look and feel. You can customise every detail after selecting.
        </p>
      </div>
      <div className="theme-grid">
        {themes.map((theme) => (
          <button key={theme.id} className="theme-card">
            <div className="card-mock"
              style={{ background: `linear-gradient(160deg,${theme.accentTop} 0%,${theme.accentBot} 100%)` }}>
              <div className="mock-avatar" />
              <div className="mock-lines">
                <div className="mock-line mock-line--name" />
                <div className="mock-line mock-line--role" />
                <div className="mock-line mock-line--short" />
              </div>
              <div className="mock-icons">
                <div className="mock-icon" />
                <div className="mock-icon" />
                <div className="mock-icon" />
              </div>
              <div className="mock-badge">{theme.label}</div>
            </div>
            <div className="theme-info">
              <span className="theme-name">{theme.label}</span>
              <span className="theme-tagline">{theme.tagline}</span>
            </div>
            <div className="theme-select">
              <Icon name="chevRight" size={14} /> Use this profile
            </div>
          </button>
        ))}
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// CARD EDITOR  (/admin/cards/create/business  |  /admin/cards/edit/business/:co/:name)
// ─────────────────────────────────────────────────────────────────────────────
const CardEditorPage = ({ activeSection = "_identity", isNew = false }) => (
  <>
    <Topbar title={isNew ? "New Business Card" : "Edit Card"} subtitle="john-doe — Acme Corp">
      <div className="editor-actions">
        <button className="btn-secondary-sm"><Icon name="users" size={14} /> Assign Card User</button>
        <button className="btn-secondary-sm"><Icon name="eye" size={14} /> Preview</button>
        <button className="btn-secondary-sm"><Icon name="share" size={14} /> Share</button>
        <button className="btn-primary-sm">Save &amp; Publish</button>
      </div>
    </Topbar>

    <div className="editor-layout">
      {/* Sections nav sidebar */}
      <div className="sections-nav">
        <div className="sections-nav-header">
          <span className="sections-nav-title">Card Sections</span>
          <span className="panel-hint">Toggle to show on card</span>
        </div>

        {/* Pinned: Theme */}
        <div className={`section-row section-row-pinned${activeSection === "_theme" ? " active" : ""}`}>
          <span className="sec-label">Theme</span>
        </div>

        {/* Draggable sections */}
        {[
          { key: "_identity",    label: "Card Identity",    sort: 1 },
          { key: "more",         label: "Share & Connect",  sort: 2 },
          { key: "contactInfo",  label: "Contact Info",     sort: 3 },
          { key: "businessHours",label: "Business Hours",   sort: 4 },
          { key: "appointments", label: "Appointments",     sort: 5 },
          { key: "services",     label: "Services",         sort: 6 },
          { key: "testimonials", label: "Testimonials",     sort: 7 },
          { key: "social",       label: "Social",           sort: 8 },
          { key: "customHtml",   label: "Custom HTML",      sort: 9 },
          { key: "googleMap",    label: "Google Map",       sort: 10 },
          { key: "gallery",      label: "Gallery",          sort: 11 },
          { key: "rate",         label: "Rate Service",     sort: 12 },
        ].map((sec) => (
          <div key={sec.key}
            className={`section-row${activeSection === sec.key ? " active" : ""}`}
            draggable="true">
            <span className="grip-wrap"><Icon name="grip" size={14} /></span>
            <span className="sec-sort">{sec.sort}</span>
            <span className="sec-label">{sec.label}</span>
            <button className="toggle toggle-on" aria-label={`Disable ${sec.label}`}>
              <span className="toggle-knob" />
            </button>
          </div>
        ))}

        {/* Pinned: Styling */}
        <div className={`section-row section-row-pinned${activeSection === "_styling" ? " active" : ""}`}>
          <span className="sec-label">Styling</span>
        </div>
      </div>

      {/* Editor content area */}
      <div className="editor-content">

        {/* ── Theme ── */}
        {activeSection === "_theme" && (
          <div className="panel panel-theme">
            <h3 className="panel-title">Theme</h3>
            <p className="panel-description">Choose the visual style for your card.</p>
            <div className="theme-grid">
              {themes.map((t) => (
                <button key={t.id} className="theme-card">
                  <div className="card-mock"
                    style={{ background: `linear-gradient(160deg,${t.accentTop} 0%,${t.accentBot} 100%)` }}>
                    <div className="mock-avatar" />
                    <div className="mock-lines">
                      <div className="mock-line mock-line--name" />
                      <div className="mock-line mock-line--role" />
                      <div className="mock-line mock-line--short" />
                    </div>
                    <div className="mock-icons">
                      <div className="mock-icon" /><div className="mock-icon" /><div className="mock-icon" />
                    </div>
                    <div className="mock-badge">{t.label}</div>
                  </div>
                  <div className="theme-info">
                    <span className="theme-name">{t.label}</span>
                    <span className="theme-tagline">{t.tagline}</span>
                  </div>
                  <div className="theme-select">
                    <Icon name="chevRight" size={14} /> Use this theme
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Card Identity ── */}
        {(activeSection === "_identity" || activeSection === "accountDetails") && (
          <div className="panel">
            <div className="panel-title-row">
              <h3 className="panel-title">Card Identity</h3>
              <button className="btn-auto-populate">
                <Icon name="star" size={13} /> Auto Generate
              </button>
            </div>
            <div className="form-grid">
              <div className="field">
                <label>Card Name</label>
                <input placeholder="url-slug" />
              </div>
              <div className="field">
                <label>Email Address (Notifications Only)</label>
                <input type="text" placeholder="e.g. notify@company.com" />
              </div>
              <div className="field">
                <label>Display Name</label>
                <input placeholder="Full name" />
              </div>
              <div className="field">
                <label>Designation</label>
                <input placeholder="e.g. Senior Developer" />
              </div>
              <div className="field col-span-2">
                <label>More Detail</label>
                <input placeholder="e.g. Available Mon–Fri" />
              </div>
              <div className="field col-span-2">
                <label>Description</label>
                <textarea placeholder="Brief bio or company description…" rows={6} />
              </div>
            </div>
            <div className="images-row">
              <div className="image-slot">
                <span className="field-label">Profile Picture</span>
                <div className="image-preview-sq image-upload-slot">
                  <Icon name="photo" size={24} />
                  <div className="slot-upload-hint"><Icon name="photo" size={13} color="#fff" /></div>
                </div>
              </div>
              <div className="image-slot image-slot-wide">
                <span className="field-label">Banner Image</span>
                <div className="image-preview-wide image-upload-slot">
                  <Icon name="photo" size={24} />
                  <div className="slot-upload-hint"><Icon name="photo" size={13} color="#fff" /></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Share & Connect ── */}
        {activeSection === "more" && (
          <div className="panel panel-more">
            <h3 className="panel-title">Share &amp; Connect</h3>
            <p className="panel-description">
              The <strong>Share &amp; Connect</strong> toggle controls the visibility of the action bar on your digital card.
            </p>
            <ul className="more-feature-list">
              <li><strong>Save Card</strong> — lets visitors save your contact details.</li>
              <li><strong>Share Card</strong> — allows visitors to share your card link.</li>
              <li><strong>Contact</strong> — provides a quick way to reach out.</li>
              <li><strong>Save to Home Screen</strong> — prompts visitors to add your card as a shortcut.</li>
            </ul>
          </div>
        )}

        {/* ── Contact Info ── */}
        {activeSection === "contactInfo" && (
          <div className="panel panel-contact">
            <div className="panel-header">
              <h3 className="panel-title">Contact Info</h3>
              <span className="group-select-label">Group Items</span>
              <select className="group-select" defaultValue="">
                <option value="">— local —</option>
              </select>
              <button className="btn-secondary-sm">
                <Icon name="plus" size={12} /> Add
              </button>
            </div>
            <div className="contact-list">
              {[
                { icon: "phone", detail: "+27 82 123 4567",    color: "#25d366" },
                { icon: "mail",  detail: "john@acme.com",      color: "#ea4335" },
                { icon: "globe", detail: "https://acme.com",   color: "#4285f4" },
              ].map((c) => (
                <div key={c.detail} className="contact-row">
                  <span className="grip-wrap"><Icon name="grip" size={13} /></span>
                  <span className="contact-badge" style={{ background: c.color }}>
                    <Icon name={c.icon} size={14} color="#fff" />
                  </span>
                  <input className="contact-detail-input" defaultValue={c.detail} />
                  <button className="toggle toggle-on"><span className="toggle-knob" /></button>
                  <button className="btn-icon-danger" aria-label="Remove contact">
                    <Icon name="x" size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Business Hours ── */}
        {activeSection === "businessHours" && (
          <div className="panel panel-bh">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Business Hours" />
              <span className="panel-hint">Toggle to mark a day open or closed</span>
            </div>
            <div className="bh-list">
              {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day, i) => (
                <div key={day} className={`bh-row${i >= 5 ? " bh-weekend" : ""}`}>
                  <span className="bh-day">{day}</span>
                  <button className={`toggle ${i < 5 ? "toggle-on" : "toggle-off"}`}>
                    <span className="toggle-knob" />
                  </button>
                  {i < 5 ? (
                    <div className="bh-times">
                      <input type="time" className="time-input" defaultValue="08:00" />
                      <span className="bh-sep">–</span>
                      <input type="time" className="time-input" defaultValue="17:00" />
                    </div>
                  ) : (
                    <span className="bh-closed">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Appointments ── */}
        {activeSection === "appointments" && (
          <div className="panel panel-appt">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Appointments" />
              <button className="btn-secondary-sm">
                <Icon name="plus" size={12} /> Add Slot
              </button>
            </div>
            <div className="appt-list">
              {[
                { start: "09:00", end: "09:30" },
                { start: "10:00", end: "10:30" },
                { start: "11:00", end: "11:30" },
              ].map((a, i) => (
                <div key={i} className="appt-row">
                  <span className="grip-wrap"><Icon name="grip" size={13} /></span>
                  <span className="appt-index">{i + 1}</span>
                  <input type="time" className="time-input" defaultValue={a.start} />
                  <span className="bh-sep">–</span>
                  <input type="time" className="time-input" defaultValue={a.end} />
                  <button className="toggle toggle-on"><span className="toggle-knob" /></button>
                  <button className="btn-icon-danger" aria-label="Remove slot">
                    <Icon name="x" size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Services ── */}
        {activeSection === "services" && (
          <div className="panel panel-services">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Services" />
              <button className="btn-secondary-sm">
                <Icon name="plus" size={12} /> Add Service
              </button>
            </div>
            <div className="svc-list">
              {[{ title: "Consulting", desc: "One-on-one business consulting sessions." }].map((s) => (
                <div key={s.title} className="svc-item">
                  <div className="svc-top">
                    <span className="grip-wrap"><Icon name="grip" size={13} /></span>
                    <div className="svc-img-thumb"><Icon name="photo" size={18} /></div>
                    <input className="svc-title-input" defaultValue={s.title} placeholder="Service title" />
                    <button className="btn-icon-danger" aria-label="Remove service">
                      <Icon name="x" size={13} />
                    </button>
                  </div>
                  <div className="svc-body">
                    <textarea className="svc-desc" rows={2} defaultValue={s.desc} placeholder="Description" />
                    <div className="svc-btn-row">
                      <input className="svc-btn-input" placeholder="Button label" />
                      <input className="svc-btn-input svc-btn-link" placeholder="https://..." />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Testimonials ── */}
        {activeSection === "testimonials" && (
          <div className="panel panel-testimonials">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Testimonials" />
              <button className="btn-secondary-sm">
                <Icon name="plus" size={12} /> Add
              </button>
            </div>
            <div className="test-list">
              <div className="testimonial-item">
                <div className="svc-top">
                  <span className="grip-wrap"><Icon name="grip" size={13} /></span>
                  <div className="test-avatar"><Icon name="users" size={16} /></div>
                  <input className="svc-title-input" defaultValue="Sarah Johnson" placeholder="Reviewer name" />
                  <button className="toggle toggle-on"><span className="toggle-knob" /></button>
                  <button className="btn-icon-danger" aria-label="Remove testimonial">
                    <Icon name="x" size={13} />
                  </button>
                </div>
                <div className="svc-body">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className={`star-btn${star <= 5 ? " star-active" : ""}`}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}>★</button>
                    ))}
                  </div>
                  <textarea className="svc-desc" rows={2}
                    defaultValue="Exceptional service! Highly recommend."
                    placeholder="Review text" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Social ── */}
        {activeSection === "social" && (
          <div className="panel panel-social">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Social" />
              <button className="btn-secondary-sm">
                <Icon name="plus" size={12} /> Add
              </button>
            </div>
            <div className="contact-list">
              {[
                { icon: "linkedin", detail: "linkedin.com/in/johndoe", color: "#0077b5" },
                { icon: "twitter",  detail: "@johndoe",                 color: "#1da1f2" },
              ].map((s) => (
                <div key={s.detail} className="contact-row">
                  <span className="grip-wrap"><Icon name="grip" size={13} /></span>
                  <span className="contact-badge" style={{ background: s.color }}>
                    <Icon name={s.icon} size={14} color="#fff" />
                  </span>
                  <input className="contact-detail-input" defaultValue={s.detail} />
                  <button className="toggle toggle-on"><span className="toggle-knob" /></button>
                  <button className="btn-icon-danger" aria-label="Remove social link">
                    <Icon name="x" size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Custom HTML ── */}
        {activeSection === "customHtml" && (
          <div className="panel panel-custom-html">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Custom HTML" />
            </div>
            <div className="rate-body">
              <textarea className="rate-desc map-input" rows={8}
                placeholder={"Paste your HTML code here\ne.g. <iframe ...></iframe> or any custom HTML snippet"} />
            </div>
          </div>
        )}

        {/* ── Google Map ── */}
        {activeSection === "googleMap" && (
          <div className="panel panel-map">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Google Map" />
            </div>
            <div className="rate-body">
              <textarea className="rate-desc map-input" rows={6}
                placeholder={"Paste your Google Maps embed code or link here\ne.g. <iframe src=\"https://www.google.com/maps/embed?...\"></iframe>"} />
            </div>
          </div>
        )}

        {/* ── Gallery ── */}
        {activeSection === "gallery" && (
          <div className="panel panel-gallery">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Gallery" />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="btn-secondary-sm"><Icon name="photo" size={12} /> Image</button>
                <button className="btn-secondary-sm"><Icon name="film" size={12} /> Video</button>
                <button className="btn-secondary-sm"><Icon name="document" size={12} /> PDF</button>
              </div>
            </div>
            <div className="gallery-grid">
              {["image", "video", "pdf"].map((type) => (
                <div key={type} className="gallery-item">
                  <div className="gallery-thumb">
                    <div className="gallery-thumb-placeholder">
                      <Icon name={type === "video" ? "film" : type === "pdf" ? "document" : "photo"} size={24} />
                    </div>
                    <div className="gallery-controls">
                      <button className="toggle toggle-on"><span className="toggle-knob" /></button>
                      <button className="btn-icon-danger gallery-delete-btn" aria-label="Remove">
                        <Icon name="x" size={12} />
                      </button>
                    </div>
                  </div>
                  <span className="gallery-type-badge">{type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Rate Service ── */}
        {activeSection === "rate" && (
          <div className="panel panel-rate">
            <div className="panel-header">
              <input className="panel-title-input" defaultValue="Rate Service" />
              <span className="panel-hint">Shown to customers on your card</span>
            </div>
            <div className="rate-body">
              <textarea className="rate-desc" rows={5}
                placeholder={'Describe what customers are rating, e.g. "How was your experience with our team?"'} />
            </div>
          </div>
        )}

        {/* ── Styling ── */}
        {activeSection === "_styling" && (
          <div className="panel">
            <h3 className="panel-title">Card Styling</h3>
            {[
              { group: "Backgrounds", fields: ["Top Card Colour","Card Background","Services & Testimonials"] },
              { group: "Text", fields: ["Card Name","Designation","More Detail","Profile Description","Section Heading","Services & Testimonials Heading","Services & Testimonials Text","Contact Text"] },
              { group: "Icons", fields: ["Icon Circle","Icon"] },
              { group: "Buttons", fields: ["Button Background","Button Hover","Button Text"] },
            ].map(({ group, fields }) => (
              <div key={group}>
                <p className="styling-group-label">{group}</p>
                <div className="styling-grid">
                  {fields.map((f) => (
                    <div key={f} className="color-field">
                      <span className="field-label">{f}</span>
                      <div className="color-row">
                        <span className="swatch swatch-pick" style={{ background: "#ffffff" }} />
                        <input type="color" className="color-input-hidden" defaultValue="#ffffff" />
                        <code>#ffffff</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>{/* /editor-content */}

      {/* Right: phone preview */}
      <div className="editor-right">
        <div className="preview-header">
          <span className="preview-label">Live Preview</span>
          <div className="preview-tabs">
            <button className="preview-tab active">Mobile</button>
            <button className="preview-tab">Desktop</button>
          </div>
        </div>
        <div className="preview-body">
          <div className="phone-wrap">
            <div className="phone-frame">
              <div className="phone-status-bar">
                <div className="phone-pill" />
              </div>
              <div className="phone-screen">
                <div className="phone-scale-wrap">
                  {/* <CardPreview card={card} /> */}
                  <div style={{ padding: 16, fontSize: 12, color: "#888" }}>Card preview renders here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>{/* /editor-layout */}

    {/* Auto Populate modal */}
    <div className="share-overlay" style={{ display: "none" }}>
      <div className="auto-populate-modal" role="dialog" aria-modal="true">
        <div className="share-header">
          <span className="share-title"><Icon name="star" size={15} /> Auto Populate</span>
          <button className="share-close" aria-label="Close">✕</button>
        </div>
        <p className="auto-populate-hint">
          Enter a name and designation and we'll generate your card content using AI.
        </p>
        <div className="auto-populate-fields">
          <div className="field">
            <label>Full Name</label>
            <input type="text" placeholder="e.g. Fred Flintstone" />
          </div>
          <div className="field">
            <label>Designation</label>
            <input type="text" placeholder="e.g. Accountant & Tax Consultant" />
          </div>
        </div>
        <div className="auto-populate-actions">
          <button className="btn-secondary-sm">Cancel</button>
          <button className="btn-primary-sm">
            <Icon name="star" size={13} /> Generate
          </button>
        </div>
      </div>
    </div>

    {/* Assign Card User modal */}
    <div className="modal-backdrop" style={{ display: "none" }}>
      <div className="modal assign-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">Assign Card User</h3>
          <button className="modal-close" aria-label="Close">✕</button>
        </div>
        <div className="modal-search">
          <Icon name="search" size={14} className="modal-search-icon" />
          <input className="modal-search-input" placeholder="Search by name or email…" />
        </div>
        <div className="assign-table-head">
          <span className="assign-col assign-col--name">Name / Email</span>
          <span className="assign-col assign-col--company">Company</span>
          <span className="assign-col assign-col--orgunit">Org Unit</span>
          <span className="assign-col assign-col--action" />
        </div>
        <div className="modal-list">
          {[{ fullName: "Jane Smith", email: "jane@acme.com", companyName: "Acme Corp", orgUnitName: "Sales" }].map((u) => (
            <div key={u.email} className="assign-row">
              <div className="assign-col assign-col--name">
                <span className="assign-fullname">{u.fullName}</span>
                <span className="assign-email">{u.email}</span>
              </div>
              <div className="assign-col assign-col--company">{u.companyName}</div>
              <div className="assign-col assign-col--orgunit">{u.orgUnitName}</div>
              <div className="assign-col assign-col--action">
                <button className="btn-primary-sm">Assign</button>
              </div>
            </div>
          ))}
        </div>
        <div className="assign-footer">
          <span className="assign-total">24 users</span>
        </div>
      </div>
    </div>

    {/* Share modal (editor version) */}
    <div className="share-overlay" style={{ display: "none" }}>
      <div className="share-modal" role="dialog" aria-modal="true">
        <div className="share-header">
          <span className="share-title">Share Card</span>
          <button className="share-close" aria-label="Close">✕</button>
        </div>
        <div className="share-option-grid">
          {["WhatsApp","Email","QR Code","Other"].map((opt) => (
            <button key={opt} className="share-option-btn">
              <span className="share-option-icon" />
              <span className="share-option-label">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// USERS PAGE  (/admin/users)
// ─────────────────────────────────────────────────────────────────────────────
const sampleUsers = [
  { userGuid: "u1", fullName: "Jane Smith",   email: "jane@acme.com",   roles: ["Admin"],     companyName: "Acme Corp", orgUnitName: "Sales" },
  { userGuid: "u2", fullName: "Bob Jones",    email: "bob@acme.com",    roles: ["Moderator"], companyName: "Acme Corp", orgUnitName: null },
  { userGuid: "u3", fullName: "Alice Kumar",  email: "alice@auto.com",  roles: ["Admin"],     companyName: "AutoMax",   orgUnitName: "Parts" },
];

const UsersPage = ({ isEditorOpen = false, activeTab = "profile" }) => (
  <>
    <Topbar title="Users">
      <button className="btn-primary">
        <Icon name="plus" size={14} /> New User
      </button>
    </Topbar>

    <div className={`page-body${isEditorOpen ? " has-editor" : ""}`}>
      {/* List panel */}
      <div className="list-panel">
        <div className="toolbar">
          <div className="search-wrap">
            <Icon name="search" size={14} className="search-icon" />
            <input className="search-input" placeholder="Search users…" />
          </div>
        </div>

        <div className="list-surface">
          <table className="list-table">
            <thead>
              <tr>
                <th>User</th>
                <th className="th-role">Role</th>
                {!isEditorOpen && <><th className="th-org">Company</th><th className="th-org">Org Unit</th></>}
                <th className="th-actions" />
              </tr>
            </thead>
            <tbody>
              {sampleUsers.map((u, i) => (
                <tr key={u.userGuid} className="list-row">
                  <td className="td-user">
                    <div className="user-cell">
                      <div className="user-avatar"
                        style={{ background: ["#6366f1","#8b5cf6","#ec4899"][i % 3] }}>
                        {u.fullName[0]}
                      </div>
                      <div className="user-meta">
                        <span className="user-name">{u.fullName}</span>
                        <span className="user-email">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="td-role">
                    <span className={`badge badge-role-${u.roles[0].toLowerCase()}`}>{u.roles[0]}</span>
                  </td>
                  {!isEditorOpen && (
                    <>
                      <td className="td-org"><span className="org-name">{u.companyName}</span></td>
                      <td className="td-org">
                        {u.orgUnitName
                          ? <span className="org-unit">{u.orgUnitName}</span>
                          : <span className="org-none">—</span>}
                      </td>
                    </>
                  )}
                  <td className="td-actions">
                    <div className="row-actions">
                      <button className="row-btn" aria-label="Edit user"><Icon name="edit" size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={24} totalPages={3} label="users" />
      </div>

      {/* Editor panel */}
      {isEditorOpen && (
        <div className="editor-panel">
          <div className="editor-header">
            <div className="editor-avatar" style={{ background: "#6366f1" }}>J</div>
            <div className="editor-identity">
              <span className="editor-name">Jane Smith</span>
              <span className="editor-email">jane@acme.com</span>
            </div>
            <button className="editor-close" aria-label="Close editor">
              <Icon name="x" size={16} />
            </button>
          </div>

          <div className="editor-tabs">
            {["profile","access","security"].map((t) => (
              <button key={t} className={`editor-tab${activeTab === t ? " active" : ""}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="editor-body">
            {activeTab === "profile" && (
              <div className="form-section">
                <div className="form-row two-col">
                  <div className="form-field">
                    <label className="field-label">First name</label>
                    <input className="field-input" type="text" defaultValue="Jane" placeholder="First name" />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Last name</label>
                    <input className="field-input" type="text" defaultValue="Smith" placeholder="Last name" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="field-label">Email address <span className="required">*</span></label>
                  <input className="field-input" type="email" defaultValue="jane@acme.com" placeholder="user@example.com" />
                </div>
              </div>
            )}

            {activeTab === "access" && (
              <div className="form-section">
                <div className="form-field">
                  <label className="field-label">Role</label>
                  <div className="role-card">
                    <div className="role-card-left">
                      <span className="badge badge-role-admin">Admin</span>
                      <span className="role-desc">Full access to all features and settings.</span>
                    </div>
                    <button className="btn-secondary btn-sm">Change</button>
                  </div>
                </div>
                <div className="form-field">
                  <label className="field-label">Company</label>
                  <select className="field-input" defaultValue="acme">
                    <option value="acme">Acme Corp</option>
                    <option value="auto">AutoMax</option>
                  </select>
                </div>
                <div className="form-field toggle-field">
                  <span className="field-label">Account enabled</span>
                  <button className="toggle on" role="switch" aria-checked="true">
                    <span className="toggle-thumb" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="form-section">
                <p className="security-hint">Leave blank to keep the current password.</p>
                <div className="form-field">
                  <label className="field-label">New password</label>
                  <div className="pw-wrap">
                    <input className="field-input" type="password" placeholder="••••••••" autoComplete="new-password" />
                    <button type="button" className="pw-toggle" aria-label="Show password">
                      <Icon name="eye" size={15} />
                    </button>
                  </div>
                </div>
                <div className="form-field">
                  <label className="field-label">Confirm password</label>
                  <div className="pw-wrap">
                    <input className="field-input" type="password" placeholder="••••••••" autoComplete="new-password" />
                    <button type="button" className="pw-toggle" aria-label="Show password">
                      <Icon name="eye" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="editor-footer">
            <button className="btn-ghost">Cancel</button>
            <button className="btn-primary">Save</button>
          </div>
        </div>
      )}
    </div>

    {/* Role modal */}
    <div className="modal-backdrop" style={{ display: "none" }}>
      <div className="modal-box">
        <div className="modal-head">
          <span className="modal-title">Select role</span>
          <button className="editor-close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal-body">
          {["SuperAdmin","Admin","OrgUnitAdmin","Moderator"].map((role) => (
            <button key={role} className="role-option">
              <div className="role-option-head">
                <span className={`badge badge-role-${role.toLowerCase()}`}>{role}</span>
              </div>
              <p className="role-option-desc">Role description for {role}.</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// COMPANIES PAGE  (/admin/companies)
// ─────────────────────────────────────────────────────────────────────────────
const sampleCompanies = [
  { companyId: "c1", companyName: "Acme Corp",   cardsEntitlement: 50, orgUnits: [{ id:"ou1", orgUnitName:"Sales" }, { id:"ou2", orgUnitName:"Support" }], enabled: true },
  { companyId: "c2", companyName: "AutoMax",     cardsEntitlement: 30, orgUnits: [{ id:"ou3", orgUnitName:"Parts" }], enabled: true },
  { companyId: "c3", companyName: "TechStart",   cardsEntitlement: 20, orgUnits: [], enabled: false },
];

const CompaniesPage = ({ view = "list", isEditorOpen = false }) => (
  <>
    <Topbar title="Companies" subtitle="Organizations and accounts">
      <button className="btn-primary">
        <Icon name="plus" size={14} /> New Company
      </button>
    </Topbar>

    <div className={`page-body${isEditorOpen ? " has-editor" : ""}`}>
      <div className="list-panel">
        <div className="toolbar">
          <div className="search-wrap">
            <Icon name="search" size={14} className="search-icon" />
            <input className="search-input" placeholder="Search companies…" />
          </div>
          <div className="view-toggle">
            <button className={`view-btn${view === "list" ? " active" : ""}`} aria-label="List view">
              <Icon name="list" size={15} />
            </button>
            <button className={`view-btn${view === "grid" ? " active" : ""}`} aria-label="Grid view">
              <Icon name="cards" size={15} />
            </button>
          </div>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="co-grid">
            {sampleCompanies.map((c, i) => (
              <div key={c.companyId} className="co-tile">
                <div className="co-tile-head">
                  <div className="co-icon-wrap">
                    <Icon name="building" size={20} />
                  </div>
                  <span className={c.enabled ? "status-pill active" : "status-pill inactive"}>
                    {c.enabled ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="co-tile-name">{c.companyName}</div>
                <div className="co-tile-stats">
                  <div className="co-stat">
                    <span className="co-stat-val">{c.cardsEntitlement}</span>
                    <span className="co-stat-lbl">Cards</span>
                  </div>
                  <div className="co-stat">
                    <span className="co-stat-val">{c.orgUnits.length}</span>
                    <span className="co-stat-lbl">Org Units</span>
                  </div>
                </div>
                {c.orgUnits.length > 0 && (
                  <div className="co-tile-units">
                    <span className="co-units-lbl">Org Units</span>
                    <div className="co-unit-tags">
                      {c.orgUnits.map((ou) => (
                        <span key={ou.id} className="ou-tag">{ou.orgUnitName}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <div className="list-surface">
            <table className="list-table">
              <thead>
                <tr>
                  <th>Company</th>
                  {!isEditorOpen && <><th className="th-num">Cards</th><th className="th-num">Org Units</th></>}
                  <th className="th-status">Status</th>
                  <th className="th-actions" />
                </tr>
              </thead>
              <tbody>
                {sampleCompanies.map((c, i) => (
                  <tr key={c.companyId} className="list-row">
                    <td className="td-company">
                      <div className="company-cell">
                        <div className="co-avatar"
                          style={{ background: ["#6366f1","#8b5cf6","#ec4899"][i % 3] }}>
                          {c.companyName[0]}
                        </div>
                        <div className="co-meta">
                          <span className="co-name">{c.companyName}</span>
                          {!isEditorOpen && c.orgUnits.length > 0 && (
                            <span className="co-sub">{c.orgUnits.length} org unit{c.orgUnits.length !== 1 ? "s" : ""}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    {!isEditorOpen && (
                      <>
                        <td className="td-num"><span className="num-badge">{c.cardsEntitlement}</span></td>
                        <td className="td-num">
                          {c.orgUnits.length > 0
                            ? <span className="num-badge">{c.orgUnits.length}</span>
                            : <span className="org-none">—</span>}
                        </td>
                      </>
                    )}
                    <td className="td-status">
                      <span className={c.enabled ? "status-dot active" : "status-dot inactive"} />
                      {c.enabled ? "Active" : "Inactive"}
                    </td>
                    <td className="td-actions">
                      <div className="row-actions">
                        <button className="row-btn" aria-label="Edit company"><Icon name="edit" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Company editor panel */}
      {isEditorOpen && (
        <div className="editor-panel">
          <div className="editor-header">
            <div className="co-avatar co-avatar-lg" style={{ background: "#6366f1" }}>A</div>
            <div className="editor-identity">
              <span className="editor-name">Acme Corp</span>
              <span className="status-pill active">Active</span>
            </div>
            <button className="editor-close" aria-label="Close"><Icon name="x" size={16} /></button>
          </div>
          <div className="editor-body">
            <div className="section">
              <h3 className="section-title">Company Details</h3>
              <div className="form-field">
                <label className="field-label">Company name <span className="required">*</span></label>
                <input className="field-input" type="text" defaultValue="Acme Corp" placeholder="e.g. Acme Corp" />
              </div>
              <div className="form-field">
                <label className="field-label">Cards purchased</label>
                <input className="field-input field-input-sm" type="number" defaultValue={50} min={0} />
              </div>
              <div className="form-field toggle-field">
                <div className="toggle-label-group">
                  <span className="field-label">Account enabled</span>
                  <span className="field-hint">Disabling prevents all users in this company from logging in.</span>
                </div>
                <button className="toggle on" role="switch" aria-checked="true">
                  <span className="toggle-thumb" />
                </button>
              </div>
            </div>
            <div className="section">
              <div className="section-head">
                <h3 className="section-title">Org Units</h3>
                <button className="btn-secondary btn-sm">
                  <Icon name="plus" size={12} /> Add
                </button>
              </div>
              <div className="ou-list">
                {sampleCompanies[0].orgUnits.map((ou) => (
                  <div key={ou.id} className="ou-row">
                    <div className="ou-row-left">
                      <span className="ou-name">{ou.orgUnitName}</span>
                      <span className="ou-cards">25 cards</span>
                      <span className="ou-status active">Active</span>
                    </div>
                    <div className="ou-row-actions">
                      <button className="row-btn" aria-label="Edit org unit"><Icon name="edit" size={13} /></button>
                      <button className="row-btn row-btn-danger" aria-label="Delete org unit"><Icon name="x" size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="editor-footer">
            <button className="btn-delete"><Icon name="x" size={13} /> Delete</button>
            <div className="footer-actions">
              <button className="btn-ghost">Cancel</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS PAGE  (/admin/analytics)
// ─────────────────────────────────────────────────────────────────────────────
const AnalyticsPage = ({ activeTab = "overview" }) => (
  <>
    <Topbar title="Analytics" subtitle="Card performance across all companies">
      <div className="topbar-actions">
        <div className="analytics-tabs">
          <button className={`analytics-tab${activeTab === "overview" ? " active" : ""}`}>Overview</button>
          <button className={`analytics-tab${activeTab === "explorer" ? " active" : ""}`}>Card Access Explorer</button>
        </div>
        <button className="btn-ghost-sm"><Icon name="refresh" size={14} /> Refresh</button>
      </div>
    </Topbar>

    {activeTab === "overview" && (
      <div className="page-body">
        {/* Filter bar */}
        <div className="filter-bar">
          <div className="filter-primary">
            {[
              { label: "Range",     options: ["Last 7 days","Last 30 days","Last 90 days","All time"] },
              { label: "Group By",  options: ["Day","Week","Month"] },
              { label: "Dimension", options: ["Country","City","Device","Browser"] },
              { label: "Card Type", options: ["All","Business","Vehicle","Generic"] },
              { label: "Top",       options: ["5","10","20"] },
            ].map(({ label, options }) => (
              <div key={label} className="filter-field">
                <label className="filter-label">{label}</label>
                <div className="select-wrap">
                  <select className="filter-select" defaultValue={options[0]}>
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <Icon name="chevDown" size={13} className="select-chevron" />
                </div>
              </div>
            ))}
            <button className="filter-expand-btn">
              <Icon name="filter" size={14} /> Filters <Icon name="chevRight" size={12} />
            </button>
            <div className="metric-pills">
              <button className="metric-pill active">Total Hits</button>
              <button className="metric-pill">Sessions</button>
              <button className="metric-pill">Users</button>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: "var(--accent-soft)" }}>
              <Icon name="cursor" size={18} color="var(--accent)" />
            </div>
            <div className="stat-body">
              <span className="stat-label">Total Hits</span>
              <span className="stat-value">12,847</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: "var(--success-soft)" }}>
              <Icon name="trendUp" size={18} color="var(--success)" />
            </div>
            <div className="stat-body">
              <span className="stat-label">Unique Sessions</span>
              <span className="stat-value">4,231</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: "var(--purple-soft)" }}>
              <Icon name="users" size={18} color="var(--purple)" />
            </div>
            <div className="stat-body">
              <span className="stat-label">Unique Users</span>
              <span className="stat-value">2,108</span>
            </div>
          </div>
          <div className="stat-card device-card">
            <div className="device-header">
              <span className="stat-label">Device Split</span>
              <div className="stat-icon-wrap" style={{ background: "var(--warning-soft)" }}>
                <Icon name="smartphone" size={18} color="var(--warning)" />
              </div>
            </div>
            <div className="device-split">
              <div className="device-item">
                <div className="device-label"><Icon name="smartphone" size={13} /><span>Mobile</span></div>
                <span className="device-pct">74%</span>
              </div>
              <div className="device-item">
                <div className="device-label"><Icon name="monitor" size={13} /><span>Desktop</span></div>
                <span className="device-pct">26%</span>
              </div>
            </div>
            <div className="device-bar">
              <div className="device-bar-mobile" style={{ width: "74%" }} />
              <div className="device-bar-desktop" style={{ width: "26%" }} />
            </div>
          </div>
        </div>

        {/* Row 2: Time series + Breakdown */}
        <div className="two-col">
          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Total Hits Over Time</span>
              <button className="btn-ghost-sm"><Icon name="download" size={13} />CSV</button>
            </div>
            <div className="chart-area">
              <div className="chart-inner">
                <div className="y-labels">
                  {["500","400","300","200","100","0"].map((v) => <span key={v}>{v}</span>)}
                </div>
                <div className="chart-bars-wrap">
                  <div className="chart-bars">
                    {[0,33,66,100].map((tick) => (
                      <div key={tick} className="grid-line" style={{ bottom: `${tick}%` }} />
                    ))}
                    {[320,410,280,390,450,370,430,290,380,410,350,420].map((h, i) => (
                      <div key={i} className="bar-col">
                        <div className="bar" style={{ height: `${(h / 450) * 100}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="x-labels">
                    {["Jan 1","","","Jan 4","","","Jan 7","","","Jan 10","",""].map((l, i) => (
                      <div key={i} className="x-label">{l && <span>{l}</span>}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Breakdown <span className="panel-title-sub">by country</span></span>
              <button className="btn-ghost-sm"><Icon name="download" size={13} />CSV</button>
            </div>
            <div className="breakdown-list">
              {[
                { key: "South Africa", count: 4821 },
                { key: "United States", count: 2103 },
                { key: "United Kingdom", count: 1847 },
                { key: "Germany", count: 984 },
                { key: "Australia", count: 673 },
              ].map((item, i) => (
                <div key={item.key} className="breakdown-row">
                  <span className="breakdown-key">{item.key}</span>
                  <div className="breakdown-bar-wrap">
                    <div className="breakdown-bar"
                      style={{ width: `${(item.count / 4821) * 100}%`, opacity: 1 - i * 0.06 }} />
                  </div>
                  <span className="breakdown-count">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Top Cards + Browser + By Company */}
        <div className="three-col">
          <div className="panel">
            <div className="panel-head"><span className="panel-title">Top Performing Cards</span></div>
            <div className="mini-list">
              {[{name:"john-doe",hits:1240},{name:"ford-ranger",hits:980},{name:"promo-2024",hits:741}].map((c, i) => (
                <div key={c.name} className="mini-row">
                  <div className="mini-row-head">
                    <span className="mini-name">{c.name}</span>
                    <span className="mini-count">{c.hits}</span>
                  </div>
                  <div className="mini-bar-bg">
                    <div className="mini-bar" style={{ width: `${(c.hits / 1240) * 100}%`, opacity: 1 - i * 0.12 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><span className="panel-title">Browser</span></div>
            <div className="browser-section">
              <div className="browser-bar">
                {[{name:"Chrome",pct:62,color:"#4285f4"},{name:"Safari",pct:24,color:"#000"},{name:"Firefox",pct:9,color:"#ff7139"},{name:"Other",pct:5,color:"#888"}].map((b) => (
                  <div key={b.name} style={{ width: `${b.pct}%`, background: b.color }} />
                ))}
              </div>
              <div className="browser-list">
                {[{name:"Chrome",pct:62,color:"#4285f4"},{name:"Safari",pct:24,color:"#000"},{name:"Firefox",pct:9,color:"#ff7139"},{name:"Other",pct:5,color:"#888"}].map((b) => (
                  <div key={b.name} className="browser-row">
                    <div className="browser-dot" style={{ background: b.color }} />
                    <span className="browser-name">{b.name}</span>
                    <span className="browser-pct">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><span className="panel-title">By Company</span></div>
            <div className="mini-list">
              {[{name:"Acme Corp",hits:5240,pct:100},{name:"AutoMax",hits:4107,pct:78},{name:"TechStart",hits:3500,pct:67}].map((co, i) => (
                <div key={co.name} className="mini-row">
                  <div className="mini-row-head">
                    <span className="mini-name">{co.name}</span>
                    <span className="mini-count">{co.hits} hits</span>
                  </div>
                  <div className="mini-bar-bg">
                    <div className="mini-bar mini-bar-purple"
                      style={{ width: `${co.pct}%`, opacity: 1 - i * 0.15 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Access Explorer preview */}
        <div className="explorer-preview-panel">
          <div className="explorer-preview-head">
            <div className="explorer-preview-title">
              <Icon name="search" size={16} color="var(--accent)" />
              <span className="panel-title">Card Access Explorer</span>
              <span className="panel-title-sub">— recent hits preview</span>
            </div>
            <button className="btn-secondary-sm">Open Full Explorer →</button>
          </div>
          <div className="hit-preview-scroll">
            <div className="hit-thead">
              <span>Time</span><span>Card</span><span>Company</span>
              <span>Org Unit</span><span>Device</span><span>Browser</span><span>Location</span>
            </div>
            {[
              { time:"10:41","card":"john-doe",co:"Acme Corp",ou:"Sales",device:"mobile",browser:"Chrome",lat:"-26.2",lng:"28.0" },
              { time:"10:39","card":"ford-ranger",co:"AutoMax",ou:"—",device:"desktop",browser:"Safari",lat:null },
              { time:"10:37","card":"promo-2024",co:"TechStart",ou:"Mktg",device:"mobile",browser:"Chrome",lat:"-33.9",lng:"18.4" },
            ].map((h, i) => (
              <div key={i} className="hit-row preview-row">
                <span className="hit-time">{h.time}</span>
                <span className="hit-card">{h.card}</span>
                <span className="hit-sub">{h.co}</span>
                <span className="hit-muted">{h.ou}</span>
                <span>
                  <span className={`device-badge${h.device === "desktop" ? " desktop" : ""}`}>
                    <Icon name={h.device === "desktop" ? "monitor" : "smartphone"} size={11} />
                    {h.device}
                  </span>
                </span>
                <span className="hit-muted">{h.browser}</span>
                <span>
                  {h.lat
                    ? <span className="location-pill has-location"><Icon name="mapPin" size={11} />{h.lat}, {h.lng}</span>
                    : <span className="location-pill no-location"><Icon name="mapPin" size={11} />No location</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Full explorer tab */}
    {activeTab === "explorer" && (
      <div className="explorer-fullscreen">
        <div className="explorer-subheader">
          <div className="explorer-subheader-left">
            <Icon name="search" size={15} color="var(--accent)" />
            <span className="explorer-subheader-title">Card Access Explorer</span>
            <span className="explorer-event-count">1,247 events</span>
          </div>
          <div className="explorer-subheader-right">
            <button className="btn-ghost-sm"><Icon name="mapPin" size={13} /> Expand Map</button>
            <button className="btn-ghost-sm"><Icon name="download" size={13} /> Export</button>
          </div>
        </div>

        <div className="explorer-cols">
          {/* Card list */}
          <div className="explorer-left">
            <div className="explorer-search-wrap">
              <Icon name="search" size={14} className="explorer-search-icon" />
              <input className="explorer-search-input" placeholder="Search cards…" />
            </div>
            <div className="card-list">
              {["john-doe","ford-ranger","promo-2024","alice-wu","tesla-model3"].map((name, i) => (
                <button key={name} className={`card-list-item${i === 0 ? " active" : ""}`}>
                  <div className="card-list-meta">
                    <span className="card-list-name">{name}</span>
                  </div>
                  <span className={`card-list-hits${i === 0 ? " active" : ""}`}>{[1240,980,741,520,310][i]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hit log */}
          <div className="explorer-right">
            <div className="hit-thead">
              <span>Time</span><span>Card</span><span>Company</span>
              <span>Org Unit</span><span>Device</span><span>Browser</span><span>Location</span>
            </div>
            <div className="hit-rows">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="hit-row">
                  <span className="hit-time">10:{(40 - i * 2).toString().padStart(2,"0")}</span>
                  <span className="hit-card">john-doe</span>
                  <span className="hit-sub">Acme Corp</span>
                  <span className="hit-muted">Sales</span>
                  <span>
                    <span className="device-badge">
                      <Icon name="smartphone" size={11} /> mobile
                    </span>
                  </span>
                  <span className="hit-muted">Chrome</span>
                  <span>
                    <span className="location-pill has-location">
                      <Icon name="mapPin" size={11} /> -26.2, 28.0
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="explorer-map">
            <div className="map-header">
              <Icon name="mapPin" size={14} color="var(--accent)" />
              <span className="map-title">Location</span>
            </div>
            <div className="map-area">
              <div style={{ padding: 20, fontSize: 12, color: "#888", textAlign: "center" }}>
                Map renders here (Leaflet / Google Maps)
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS PAGE  (/admin/settings)
// ─────────────────────────────────────────────────────────────────────────────
const SettingsPage = () => (
  <>
    <Topbar title="Settings" subtitle="Account, preferences and integrations" />
    <div className="page-body">
      <div className="qr-section">
        <h3 className="section-title">QR Code Generator</h3>
        <p className="section-hint">
          Enter a URL or text, generate QR codes in multiple styles, then download individually or all at once.
        </p>
        <div className="qr-input-row">
          <input className="qr-input" type="text" placeholder="https://example.com or any text" />
          <button className="btn-primary-sm">Generate</button>
        </div>
        {/* Results grid (shown after generation) */}
        <div className="qr-toolbar">
          <span className="qr-count">6 styles generated</span>
          <button className="btn-secondary-sm">⬇ Download All (ZIP)</button>
        </div>
        <div className="qr-grid">
          {["Classic","Rounded","Dots","Inverted","Dark","Color"].map((style) => (
            <div key={style} className="qr-card">
              <div className="qr-preview">
                <img className="qr-img" src="/qr-placeholder.png" alt={`${style} QR code`} />
              </div>
              <div className="qr-card-footer">
                <span className="qr-label">{style}</span>
                <span className="qr-ec-badge">EC: M</span>
                <button className="btn-secondary-sm">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATIONS PAGE  (/admin/notifications)
// ─────────────────────────────────────────────────────────────────────────────
const NotificationsPage = () => (
  <>
    <Topbar title="Notifications" subtitle="System alerts and messages" />
    <div className="page-body">
      <div className="panel">
        <div className="panel-head"><span className="panel-title">Recent Notifications</span></div>
        <div className="notifications-list">
          {[
            { type:"info",    msg:"Your card 'john-doe' was shared via email.",      time:"2 min ago" },
            { type:"success", msg:"Card 'ford-ranger' was saved successfully.",      time:"1 hr ago" },
            { type:"warning", msg:"Card entitlement for Acme Corp is at 96%.",       time:"3 hrs ago" },
            { type:"error",   msg:"Failed to send share email to bob@example.com.",  time:"Yesterday" },
          ].map((n, i) => (
            <div key={i} className={`notification-row notification-${n.type}`}>
              <Icon name={n.type === "error" ? "x" : n.type === "warning" ? "bell" : "check"} size={16} />
              <div className="notification-body">
                <p className="notification-msg">{n.msg}</p>
                <span className="notification-time">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// MICROSITES PAGE  (/admin/microsites)
// ─────────────────────────────────────────────────────────────────────────────
const MicrositesPage = () => (
  <>
    <Topbar title="Microsites" subtitle="Landing pages linked to your cards" />
    <div className="page-body">
      <div className="empty-state">
        <Icon name="globe" size={40} />
        <p>Microsites coming soon.</p>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// HELP PAGE  (/admin/help)
// ─────────────────────────────────────────────────────────────────────────────
const HelpPage = () => (
  <>
    <Topbar title="Help" subtitle="Documentation and guides" />
    <div className="page-body">
      <div className="panel">
        <div className="panel-head"><span className="panel-title">Getting Started</span></div>
        <div className="help-content">
          {["Creating your first card","Assigning cards to users","Using the card editor",
            "Analytics overview","Managing companies and org units"].map((topic) => (
            <div key={topic} className="help-row">
              <Icon name="help" size={16} />
              <a href="#" className="help-link">{topic}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS PAGE  (/admin/imports)
// ─────────────────────────────────────────────────────────────────────────────
const ImportsPage = () => (
  <>
    <Topbar title="Imports" subtitle="Bulk data imports" />
    <div className="page-body">
      <div className="panel">
        <div className="panel-head"><span className="panel-title">Import Data</span></div>
        <div className="import-body">
          <p className="section-hint">Upload a CSV or Excel file to bulk-import cards or users.</p>
          <div className="import-drop-zone">
            <Icon name="upload" size={32} />
            <p>Drag &amp; drop a file here, or click to select</p>
            <button className="btn-secondary-sm">Browse File</button>
          </div>
        </div>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// TEST DRIVES PAGE  (/admin/cards/test-drives)
// ─────────────────────────────────────────────────────────────────────────────
const TestDrivesPage = () => (
  <>
    <Topbar title="Test Drives" subtitle="Vehicle card analytics" />
    <div className="page-body">
      <div className="stat-row">
        {[
          { label: "Total Test Drives", value: 142, icon: "car" },
          { label: "This Month",        value: 38,  icon: "chart" },
          { label: "Avg Duration",      value: "4.2 min", icon: "clock" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="stat-card">
            <div className="stat-icon-wrap accent"><Icon name={icon} size={20} /></div>
            <div className="stat-body">
              <span className="stat-label">{label}</span>
              <span className="stat-value">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-head"><span className="panel-title">Recent Test Drive Sessions</span></div>
        <table className="list-table">
          <thead>
            <tr>
              <th>Vehicle</th><th>Company</th><th>Date</th><th>Duration</th><th>Location</th>
            </tr>
          </thead>
          <tbody>
            {[
              { vehicle:"ford-ranger", co:"AutoMax", date:"2024-12-01", dur:"5:12", loc:"Sandton, ZA" },
              { vehicle:"tesla-model3",co:"AutoMax", date:"2024-11-30", dur:"3:45", loc:"Cape Town, ZA" },
            ].map((r) => (
              <tr key={r.vehicle + r.date} className="list-row">
                <td>{r.vehicle}</td>
                <td>{r.co}</td>
                <td>{r.date}</td>
                <td>{r.dur}</td>
                <td>{r.loc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// GROUP ITEMS LIST  (/admin/cards/group-items)
// ─────────────────────────────────────────────────────────────────────────────
const GroupItemsPage = () => (
  <>
    <Topbar title="Group Items" subtitle="Shared contact and content collections">
      <button className="btn-primary">
        <Icon name="plus" size={14} /> New Group Item
      </button>
    </Topbar>
    <div className="page-body">
      <div className="list-surface">
        <table className="list-table">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Company</th><th className="th-actions" /></tr>
          </thead>
          <tbody>
            {[
              { id:"gi1", name:"Sales Contact Pack", type:"Contact Info", co:"Acme Corp" },
              { id:"gi2", name:"Head Office Hours",  type:"Business Hours", co:"Acme Corp" },
              { id:"gi3", name:"Showroom Gallery",   type:"Gallery",        co:"AutoMax" },
            ].map((g) => (
              <tr key={g.id} className="list-row">
                <td>{g.name}</td>
                <td><span className="badge">{g.type}</span></td>
                <td>{g.co}</td>
                <td className="td-actions">
                  <div className="row-actions">
                    <button className="row-btn" aria-label="Edit"><Icon name="edit" size={14} /></button>
                    <button className="row-btn row-btn--danger" aria-label="Delete"><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP — renders all routes as separate sections for reference
// ─────────────────────────────────────────────────────────────────────────────
export default function AppLayout() {
  return (
    <div className="app-layout-demo">
      {/* ════════════════════════════════════════════════════════════
          AUTH ROUTES  (/auth/*)
          ════════════════════════════════════════════════════════════ */}
      <section aria-label="Auth: Login">
        <AuthPage mode="login" />
      </section>

      <section aria-label="Auth: Register">
        <AuthPage mode="register" />
      </section>

      <section aria-label="Auth: Forgot Password">
        <AuthPage mode="forgot" />
      </section>

      <section aria-label="Auth: Reset Password">
        <AuthPage mode="reset" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          ADMIN ROUTES  (/admin/*)
          All wrapped in AdminLayout (Sidebar + Topbar + main content)
          ════════════════════════════════════════════════════════════ */}

      {/* Dashboard */}
      <section aria-label="Admin: Dashboard">
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>
      </section>

      {/* Cards list */}
      <section aria-label="Admin: Cards (List View)">
        <AdminLayout>
          <CardsPage view="list" filter="All" />
        </AdminLayout>
      </section>

      {/* Cards grid */}
      <section aria-label="Admin: Cards (Grid View)">
        <AdminLayout>
          <CardsPage view="grid" filter="Business" />
        </AdminLayout>
      </section>

      {/* Cards — Share modal open */}
      <section aria-label="Admin: Cards with Share Modal">
        <AdminLayout>
          <CardsPage view="list" filter="All" showShareModal />
        </AdminLayout>
      </section>

      {/* New card — profile picker */}
      <section aria-label="Admin: New Card (Profile Picker)">
        <AdminLayout>
          <CardNewProfilePage />
        </AdminLayout>
      </section>

      {/* Card editor — Identity section */}
      <section aria-label="Admin: Card Editor (Identity)">
        <AdminLayout>
          <CardEditorPage activeSection="_identity" />
        </AdminLayout>
      </section>

      {/* Card editor — Theme section */}
      <section aria-label="Admin: Card Editor (Theme)">
        <AdminLayout>
          <CardEditorPage activeSection="_theme" />
        </AdminLayout>
      </section>

      {/* Card editor — Contact Info */}
      <section aria-label="Admin: Card Editor (Contact Info)">
        <AdminLayout>
          <CardEditorPage activeSection="contactInfo" />
        </AdminLayout>
      </section>

      {/* Card editor — Business Hours */}
      <section aria-label="Admin: Card Editor (Business Hours)">
        <AdminLayout>
          <CardEditorPage activeSection="businessHours" />
        </AdminLayout>
      </section>

      {/* Card editor — Services */}
      <section aria-label="Admin: Card Editor (Services)">
        <AdminLayout>
          <CardEditorPage activeSection="services" />
        </AdminLayout>
      </section>

      {/* Card editor — Gallery */}
      <section aria-label="Admin: Card Editor (Gallery)">
        <AdminLayout>
          <CardEditorPage activeSection="gallery" />
        </AdminLayout>
      </section>

      {/* Card editor — Styling */}
      <section aria-label="Admin: Card Editor (Styling)">
        <AdminLayout>
          <CardEditorPage activeSection="_styling" />
        </AdminLayout>
      </section>

      {/* Test Drives */}
      <section aria-label="Admin: Test Drives">
        <AdminLayout>
          <TestDrivesPage />
        </AdminLayout>
      </section>

      {/* Group Items */}
      <section aria-label="Admin: Group Items">
        <AdminLayout>
          <GroupItemsPage />
        </AdminLayout>
      </section>

      {/* Microsites */}
      <section aria-label="Admin: Microsites">
        <AdminLayout>
          <MicrositesPage />
        </AdminLayout>
      </section>

      {/* Analytics — Overview */}
      <section aria-label="Admin: Analytics (Overview)">
        <AdminLayout>
          <AnalyticsPage activeTab="overview" />
        </AdminLayout>
      </section>

      {/* Analytics — Explorer */}
      <section aria-label="Admin: Analytics (Card Access Explorer)">
        <AdminLayout>
          <AnalyticsPage activeTab="explorer" />
        </AdminLayout>
      </section>

      {/* Users — list only */}
      <section aria-label="Admin: Users">
        <AdminLayout>
          <UsersPage isEditorOpen={false} />
        </AdminLayout>
      </section>

      {/* Users — with editor open */}
      <section aria-label="Admin: Users (Editor Open)">
        <AdminLayout>
          <UsersPage isEditorOpen activeTab="profile" />
        </AdminLayout>
      </section>

      {/* Companies — list view */}
      <section aria-label="Admin: Companies (List)">
        <AdminLayout>
          <CompaniesPage view="list" />
        </AdminLayout>
      </section>

      {/* Companies — grid view with editor */}
      <section aria-label="Admin: Companies (Grid + Editor)">
        <AdminLayout>
          <CompaniesPage view="grid" isEditorOpen />
        </AdminLayout>
      </section>

      {/* Notifications */}
      <section aria-label="Admin: Notifications">
        <AdminLayout>
          <NotificationsPage />
        </AdminLayout>
      </section>

      {/* Settings */}
      <section aria-label="Admin: Settings">
        <AdminLayout>
          <SettingsPage />
        </AdminLayout>
      </section>

      {/* Help */}
      <section aria-label="Admin: Help">
        <AdminLayout>
          <HelpPage />
        </AdminLayout>
      </section>

      {/* Imports */}
      <section aria-label="Admin: Imports">
        <AdminLayout>
          <ImportsPage />
        </AdminLayout>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SIDEBAR — Collapsed state (for reference)
          ════════════════════════════════════════════════════════════ */}
      <section aria-label="Sidebar (Collapsed)">
        <AdminLayout sidebarCollapsed>
          <DashboardPage />
        </AdminLayout>
      </section>

      {/* ════════════════════════════════════════════════════════════
          COMMAND PALETTE — Open state (for reference)
          ════════════════════════════════════════════════════════════ */}
      <section aria-label="Command Palette (Open)">
        <div style={{ position: "relative" }}>
          <CommandPalette isOpen />
        </div>
      </section>
    </div>
  );
}
