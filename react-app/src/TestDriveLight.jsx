import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #16161f;
    --border: rgba(255,255,255,0.08);
    --border-focus: rgba(200,170,110,0.6);
    --gold: #c8aa6e;
    --gold-light: #e8cc8e;
    --gold-dim: rgba(200,170,110,0.15);
    --text-primary: #f0ede8;
    --text-secondary: rgba(240,237,232,0.5);
    --text-muted: rgba(240,237,232,0.3);
    --success: #4ade80;
    --error: #f87171;
    --radius: 20px;
    --radius-sm: 12px;
  }

  html, body, #root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
  }

  .app-wrapper {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  /* Ambient glow orbs */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.12;
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #c8aa6e, transparent);
    top: -80px; right: -80px;
  }
  .orb-2 {
    width: 250px; height: 250px;
    background: radial-gradient(circle, #6e8fc8, transparent);
    bottom: 100px; left: -60px;
  }

  /* ─── PAGE CONTAINER ─── */
  .page {
    width: 100%;
    max-width: 430px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    animation: pageFadeIn 0.6s ease forwards;
  }

  @keyframes pageFadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── HEADER ─── */
  .header {
    padding: 52px 28px 24px;
    position: relative;
  }

  .brand-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--gold-dim);
    border: 1px solid rgba(200,170,110,0.25);
    border-radius: 100px;
    padding: 6px 14px;
    margin-bottom: 28px;
  }

  .brand-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .brand-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }

  .header-title span {
    color: var(--gold);
  }

  .header-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    font-weight: 300;
    max-width: 280px;
  }

  /* ─── DIVIDER ─── */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 0 28px 28px;
  }

  /* ─── FORM CARD ─── */
  .form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin: 0 16px 32px;
    padding: 28px 24px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
  }

  /* ─── FIELD ─── */
  .field {
    margin-bottom: 20px;
  }

  .field:last-of-type {
    margin-bottom: 0;
  }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 8px;
    padding-left: 2px;
  }

  .field-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .field-icon {
    position: absolute;
    left: 16px;
    width: 18px; height: 18px;
    color: var(--text-muted);
    pointer-events: none;
    transition: color 0.2s;
  }

  .field-input {
    width: 100%;
    background: var(--surface2);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 15px 16px 15px 46px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: var(--text-primary);
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    -webkit-appearance: none;
    appearance: none;
  }

  .field-input::placeholder {
    color: var(--text-muted);
  }

  .field-input:focus {
    border-color: var(--border-focus);
    background: rgba(22,22,31,0.9);
    box-shadow: 0 0 0 4px rgba(200,170,110,0.08);
  }

  .field-input:focus ~ .field-icon,
  .field-input-wrap:focus-within .field-icon {
    color: var(--gold);
  }

  .field-input.has-error {
    border-color: var(--error);
  }

  .field-error {
    font-size: 12px;
    color: var(--error);
    margin-top: 6px;
    padding-left: 4px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* ─── SUBMIT BUTTON ─── */
  .submit-btn {
    width: 100%;
    margin: 28px 0 0;
    padding: 18px;
    background: linear-gradient(135deg, #c8aa6e 0%, #e8cc8e 50%, #c8aa6e 100%);
    background-size: 200% 200%;
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #1a1408;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.25s, background-position 0.4s;
    box-shadow: 0 8px 32px rgba(200,170,110,0.3);
    -webkit-tap-highlight-color: transparent;
  }

  .submit-btn:hover {
    background-position: 100% 100%;
    box-shadow: 0 12px 40px rgba(200,170,110,0.45);
  }

  .submit-btn:active {
    transform: scale(0.98);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn-arrow {
    transition: transform 0.2s;
  }

  .submit-btn:hover .btn-arrow {
    transform: translateX(4px);
  }

  /* Shimmer on button */
  .submit-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-20deg);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 200%; }
  }

  /* ─── FOOTER NOTE ─── */
  .footer-note {
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    padding: 0 28px 40px;
    line-height: 1.7;
  }

  .footer-note a {
    color: var(--gold);
    text-decoration: none;
  }

  /* ─── PROGRESS DOTS ─── */
  .progress-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 0 28px 24px;
  }

  .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--border);
    transition: all 0.3s;
  }

  .dot.active {
    background: var(--gold);
    width: 20px;
    border-radius: 3px;
  }

  /* ════════════════════════════════
     THANK YOU PAGE
  ════════════════════════════════ */

  .ty-page {
    width: 100%;
    max-width: 430px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 28px;
    position: relative;
    z-index: 1;
    animation: pageFadeIn 0.8s ease forwards;
  }

  .ty-icon-wrap {
    width: 96px; height: 96px;
    border-radius: 50%;
    background: var(--gold-dim);
    border: 1px solid rgba(200,170,110,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    animation: iconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
  }

  @keyframes iconPop {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }

  .ty-icon-wrap svg {
    color: var(--gold);
  }

  /* Rotating ring */
  .ty-ring {
    position: absolute;
    width: 120px; height: 120px;
    border-radius: 50%;
    border: 1px solid rgba(200,170,110,0.2);
    animation: ringRotate 8s linear infinite;
  }

  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .ty-ring::before {
    content: '';
    position: absolute;
    top: -3px; left: 50%;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    transform: translateX(-50%);
  }

  .ty-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    animation: fadeSlidUp 0.5s ease 0.4s both;
  }

  .ty-title {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 500;
    color: var(--text-primary);
    text-align: center;
    line-height: 1.15;
    margin-bottom: 16px;
    animation: fadeSlidUp 0.5s ease 0.5s both;
  }

  .ty-title span {
    color: var(--gold);
    font-style: italic;
  }

  .ty-subtitle {
    font-size: 15px;
    color: var(--text-secondary);
    text-align: center;
    line-height: 1.7;
    max-width: 300px;
    font-weight: 300;
    animation: fadeSlidUp 0.5s ease 0.6s both;
  }

  @keyframes fadeSlidUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ty-divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 32px auto;
    animation: fadeSlidUp 0.5s ease 0.7s both;
  }

  .ty-details {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    animation: fadeSlidUp 0.5s ease 0.8s both;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4);
  }

  .ty-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }

  .ty-detail-row:last-child {
    border-bottom: none;
  }

  .ty-detail-key {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .ty-detail-val {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    text-align: right;
  }

  .ty-footer {
    margin-top: 40px;
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.8;
    animation: fadeSlidUp 0.5s ease 0.9s both;
  }

  .ty-footer strong {
    color: var(--gold);
    font-weight: 500;
  }

  /* Car SVG animation */
  .car-wrap {
    margin: 36px 0 0;
    animation: carFloat 3s ease-in-out infinite, fadeSlidUp 0.6s ease 1s both;
  }

  @keyframes carFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`;

// ─── ICONS ───────────────────────────────────────────────────

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const CarSVG = () => (
  <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="35" width="160" height="28" rx="6" fill="#1e1e2e" stroke="rgba(200,170,110,0.3)" strokeWidth="1"/>
    <path d="M50 35 C60 15 140 15 150 35" stroke="rgba(200,170,110,0.4)" strokeWidth="1" fill="#16161f"/>
    <path d="M50 35 C60 18 140 18 150 35 Z" fill="#16161f" stroke="rgba(200,170,110,0.25)" strokeWidth="1"/>
    <rect x="62" y="19" width="30" height="14" rx="3" fill="rgba(100,160,255,0.15)" stroke="rgba(100,160,255,0.3)" strokeWidth="0.5"/>
    <rect x="108" y="19" width="30" height="14" rx="3" fill="rgba(100,160,255,0.15)" stroke="rgba(100,160,255,0.3)" strokeWidth="0.5"/>
    <circle cx="55" cy="63" r="10" fill="#111" stroke="rgba(200,170,110,0.5)" strokeWidth="1.5"/>
    <circle cx="55" cy="63" r="5" fill="#1a1a24" stroke="rgba(200,170,110,0.3)" strokeWidth="1"/>
    <circle cx="145" cy="63" r="10" fill="#111" stroke="rgba(200,170,110,0.5)" strokeWidth="1.5"/>
    <circle cx="145" cy="63" r="5" fill="#1a1a24" stroke="rgba(200,170,110,0.3)" strokeWidth="1"/>
    <rect x="20" y="50" width="16" height="8" rx="2" fill="rgba(255,220,100,0.6)"/>
    <rect x="164" y="50" width="16" height="8" rx="2" fill="rgba(255,80,80,0.5)"/>
    <line x1="0" y1="73" x2="200" y2="73" stroke="rgba(200,170,110,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
  </svg>
);

// ─── FORM PAGE ────────────────────────────────────────────────

function FormPage({ onSubmit }) {
  const [values, setValues] = useState({ name: "", surname: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "First name is required";
    if (!values.surname.trim()) e.surname = "Surname is required";
    if (!values.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email address";
    if (!values.phone.trim()) e.phone = "Contact number is required";
    else if (!/^[\d\s\+\-\(\)]{7,}$/.test(values.phone)) e.phone = "Enter a valid contact number";
    return e;
  };

  const handleChange = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    onSubmit(values);
  };

  const fields = [
    { key: "name",    label: "First Name",      placeholder: "e.g. James",           icon: <UserIcon />,  type: "text",  autocomplete: "given-name"  },
    { key: "surname", label: "Surname",          placeholder: "e.g. Anderson",        icon: <UserIcon />,  type: "text",  autocomplete: "family-name" },
    { key: "email",   label: "Email Address",    placeholder: "you@example.com",      icon: <MailIcon />,  type: "email", autocomplete: "email"       },
    { key: "phone",   label: "Contact Number",   placeholder: "+27 82 000 0000",      icon: <PhoneIcon />, type: "tel",   autocomplete: "tel"         },
  ];

  return (
    <div className="page">
      <div className="header">
        <div className="brand-tag">
          <div className="brand-dot" />
          <span className="brand-label">Test Drive Experience</span>
        </div>
        <h1 className="header-title">Let's get you<br />behind the <span>wheel.</span></h1>
        <p className="header-subtitle">Complete your details below to begin your personalised test drive today.</p>
      </div>

      <div className="divider" />

      <div className="form-card">
        {fields.map(f => (
          <div className="field" key={f.key}>
            <label className="field-label" htmlFor={f.key}>{f.label}</label>
            <div className="field-input-wrap">
              <input
                id={f.key}
                type={f.type}
                autoComplete={f.autocomplete}
                className={`field-input${errors[f.key] ? " has-error" : ""}`}
                placeholder={f.placeholder}
                value={values[f.key]}
                onChange={handleChange(f.key)}
              />
              <span className="field-icon">{f.icon}</span>
            </div>
            {errors[f.key] && (
              <div className="field-error">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                {errors[f.key]}
              </div>
            )}
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          <div className="submit-btn-inner">
            {loading ? "Processing…" : <>Start My Test Drive <ArrowIcon /></>}
          </div>
        </button>
      </div>

      <div className="progress-dots">
        <div className="dot active" />
        <div className="dot" />
      </div>

      <p className="footer-note">
        Your information is kept strictly confidential and used solely for this test drive session.
      </p>
    </div>
  );
}

// ─── THANK YOU PAGE ───────────────────────────────────────────

function ThankYouPage({ data }) {
  return (
    <div className="ty-page">
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 0 }}>
        <div className="ty-ring" />
        <div className="ty-icon-wrap">
          <CheckIcon />
        </div>
      </div>

      <div className="ty-eyebrow">All Set</div>

      <h2 className="ty-title">Enjoy Your<br /><span>Test Drive.</span></h2>

      <p className="ty-subtitle">
        Your details have been confirmed. The keys are ready — the road awaits you.
      </p>

      <div className="ty-divider" />

      <div className="ty-details">
        {[
          { key: "Name",           val: `${data.name} ${data.surname}` },
          { key: "Email",          val: data.email              },
          { key: "Contact",        val: data.phone              },
          { key: "Status",         val: "✓ Confirmed"           },
        ].map(r => (
          <div className="ty-detail-row" key={r.key}>
            <span className="ty-detail-key">{r.key}</span>
            <span className="ty-detail-val">{r.val}</span>
          </div>
        ))}
      </div>

      <div className="car-wrap">
        <CarSVG />
      </div>

      <div className="ty-footer">
        A consultant will accompany you shortly.<br />
        <strong>Drive safe &amp; enjoy every moment.</strong>
      </div>

      <div className="progress-dots" style={{ marginTop: 32 }}>
        <div className="dot" />
        <div className="dot active" />
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setSubmitted(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        {submitted ? <ThankYouPage data={formData} /> : <FormPage onSubmit={handleSubmit} />}
      </div>
    </>
  );
}
