/**
 * BuildQuote Platform — Legal Pages
 * Drop this file into your project and wire it into BuildQuotePlatform.jsx
 * following the instructions at the bottom of this file.
 */

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// LEGAL PAGE WRAPPER
// Matches the existing page-wrap / card design system exactly.
// ─────────────────────────────────────────────────────────────────────────────
const LegalPage = ({ title, subtitle, icon, lastUpdated, children }) => (
  <div className="page-wrap" style={{ maxWidth: 860 }}>
    {/* Hero header */}
    <div style={{
      background: "var(--bg-sidebar)",
      borderRadius: "var(--r-xl)",
      padding: "32px 36px",
      marginBottom: 28,
      display: "flex",
      alignItems: "flex-start",
      gap: 20,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative circle */}
      <div style={{
        position: "absolute", right: -40, top: -40,
        width: 200, height: 200, borderRadius: "50%",
        background: "rgba(196,98,45,0.08)",
        pointerEvents: "none",
      }} />
      <div style={{
        width: 52, height: 52, borderRadius: "var(--r-lg)",
        background: "linear-gradient(135deg,var(--brand-accent),#E8956B)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, flexShrink: 0,
        boxShadow: "0 4px 16px rgba(196,98,45,0.35)",
      }}>
        {icon}
      </div>
      <div>
        <h1 style={{
          fontFamily: "var(--font-d)", fontSize: 26,
          color: "var(--txt-dark)", marginBottom: 4, letterSpacing: "-0.2px",
        }}>
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--txt-dark-2)", lineHeight: 1.5 }}>
          {subtitle}
        </p>
        {lastUpdated && (
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </div>

    {/* Content card */}
    <div className="card" style={{ padding: "32px 36px", lineHeight: 1.75 }}>
      {children}
    </div>
  </div>
);

// Section heading inside legal doc
const LH = ({ children }) => (
  <h2 style={{
    fontFamily: "var(--font-d)", fontSize: 18, color: "var(--txt-1)",
    marginTop: 32, marginBottom: 10, letterSpacing: "-0.1px",
    borderBottom: "1px solid var(--border-sub)", paddingBottom: 8,
  }}>
    {children}
  </h2>
);

// Sub-heading
const LSH = ({ children }) => (
  <h3 style={{
    fontSize: 14, fontWeight: 600, color: "var(--txt-1)",
    marginTop: 20, marginBottom: 6,
  }}>
    {children}
  </h3>
);

// Body paragraph
const LP = ({ children }) => (
  <p style={{ fontSize: 13.5, color: "var(--txt-2)", marginBottom: 12, lineHeight: 1.75 }}>
    {children}
  </p>
);

// Highlighted info box
const LBox = ({ color = "var(--info-bg)", border = "var(--brand-primary)", children }) => (
  <div style={{
    background: color,
    borderLeft: `3px solid ${border}`,
    borderRadius: "0 var(--r-md) var(--r-md) 0",
    padding: "12px 16px",
    margin: "16px 0",
    fontSize: 13,
    color: "var(--txt-1)",
    lineHeight: 1.65,
  }}>
    {children}
  </div>
);

// Bullet list
const LList = ({ items }) => (
  <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: 13.5, color: "var(--txt-2)", marginBottom: 6, lineHeight: 1.65 }}>
        {item}
      </li>
    ))}
  </ul>
);

// Contact block
const LContact = ({ lines }) => (
  <div style={{
    background: "rgba(28,53,87,0.05)",
    borderRadius: "var(--r-md)",
    padding: "16px 20px",
    margin: "16px 0",
  }}>
    {lines.map((line, i) => (
      <p key={i} style={{ fontSize: 13, color: "var(--txt-1)", marginBottom: i < lines.length - 1 ? 4 : 0 }}>
        {line}
      </p>
    ))}
  </div>
);


// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1 — PRIVACY NOTICE
// ─────────────────────────────────────────────────────────────────────────────
export const PrivacyNoticeScreen = () => (
  <LegalPage
    icon="🔒"
    title="Privacy Notice"
    subtitle="How QBRIX collects, uses, stores and protects your personal information"
    lastUpdated="January 2026"
  >
    <LBox>
      This Privacy Notice applies to all users of the QBRIX BuildQuote platform, including clients,
      builders, bankers and administrators. By using the platform you acknowledge that you have read
      and understood this notice.
    </LBox>

    <LH>1. Who We Are</LH>
    <LP>
      QBRIX (Pty) Ltd ("QBRIX", "we", "us", "our") is a technology company registered in the
      Republic of South Africa. We operate the BuildQuote platform which connects homeowners,
      building contractors and financial institutions.
    </LP>
    <LContact lines={[
      "QBRIX (Pty) Ltd",
      "Registered address: [Your registered address]",
      "Email: privacy@qbrix.co.za",
      "Tel: [Your telephone number]",
    ]} />

    <LH>2. Information We Collect</LH>
    <LSH>2.1 Information you provide directly</LSH>
    <LList items={[
      "Full name, email address and contact number",
      "ID number or passport number for identity verification",
      "Physical address and location data for project sites",
      "Company registration details (builders and institutions)",
      "Banking details for payment processing",
      "Project descriptions, photos and supporting documents",
    ]} />
    <LSH>2.2 Information we collect automatically</LSH>
    <LList items={[
      "Device type, browser and operating system",
      "IP address and approximate location",
      "Pages visited, features used and time spent on platform",
      "Cookies and similar tracking technologies",
    ]} />

    <LH>3. How We Use Your Information</LH>
    <LP>We process your personal information for the following purposes:</LP>
    <LList items={[
      "To create and manage your account on the platform",
      "To match clients with suitable building contractors",
      "To facilitate quote submissions and project management",
      "To process payments and prevent fraud",
      "To submit applications to financial institutions on your behalf",
      "To communicate service updates, notifications and support",
      "To comply with legal and regulatory obligations",
      "To improve and develop our platform and services",
    ]} />

    <LH>4. Legal Basis for Processing</LH>
    <LP>
      We process your personal information under the Protection of Personal Information Act 4 of 2013
      (POPIA) on the following lawful grounds:
    </LP>
    <LList items={[
      "Performance of a contract — to provide the services you have requested",
      "Legal obligation — to comply with applicable laws and regulations",
      "Legitimate interests — to improve our services and prevent fraud",
      "Consent — where you have provided explicit consent for specific processing activities",
    ]} />

    <LH>5. Sharing Your Information</LH>
    <LP>We may share your personal information with:</LP>
    <LList items={[
      "Building contractors (limited to project-relevant information)",
      "Financial institutions for loan and bond applications",
      "Payment processors and banking partners",
      "Cloud hosting and IT service providers",
      "Legal and regulatory authorities when required by law",
    ]} />
    <LBox color="var(--warning-bg)" border="var(--warning)">
      We do not sell your personal information to third parties for marketing purposes.
    </LBox>

    <LH>6. Data Retention</LH>
    <LP>
      We retain your personal information for as long as your account is active and for a period of
      five (5) years thereafter, unless a longer retention period is required by law.
    </LP>

    <LH>7. Your Rights</LH>
    <LP>Under POPIA you have the right to:</LP>
    <LList items={[
      "Access the personal information we hold about you",
      "Request correction of inaccurate or incomplete information",
      "Request deletion of your personal information (subject to legal obligations)",
      "Object to the processing of your personal information",
      "Lodge a complaint with the Information Regulator",
    ]} />

    <LH>8. Security</LH>
    <LP>
      We implement appropriate technical and organisational measures to protect your personal
      information against unauthorised access, disclosure, alteration or destruction. These include
      encryption, access controls, regular security audits and staff training.
    </LP>

    <LH>9. Contact Our Information Officer</LH>
    <LP>For privacy-related queries, requests or complaints:</LP>
    <LContact lines={[
      "Information Officer: [Name]",
      "Email: privacy@qbrix.co.za",
      "Tel: [Number]",
      "Information Regulator (SA): inforeg@justice.gov.za",
    ]} />
  </LegalPage>
);


// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2 — PAIA MANUAL
// ─────────────────────────────────────────────────────────────────────────────
export const PaiaManualScreen = () => (
  <LegalPage
    icon="📋"
    title="PAIA Manual"
    subtitle="Promotion of Access to Information Act — Subsidiaries Manual"
    lastUpdated="January 2026"
  >
    <LBox>
      This manual is published in compliance with Section 51 of the Promotion of Access to
      Information Act 2 of 2000 (PAIA) as amended. It guides you on how to request access to
      records held by QBRIX (Pty) Ltd and its subsidiaries.
    </LBox>

    <LH>1. Introduction</LH>
    <LP>
      The Constitution of the Republic of South Africa guarantees the right of access to any
      information held by the State and to information held by another person that is required for
      the exercise or protection of any right. PAIA gives effect to this constitutional right.
    </LP>

    <LH>2. Contact Details of the Information Officer</LH>
    <LContact lines={[
      "Company: QBRIX (Pty) Ltd",
      "Information Officer: [Full Name]",
      "Registered address: [Your registered address]",
      "Postal address: [Your postal address]",
      "Email: infofficer@qbrix.co.za",
      "Tel: [Number]",
      "Fax: [Number]",
    ]} />

    <LH>3. Records Held by QBRIX</LH>
    <LSH>3.1 Company Records</LSH>
    <LList items={[
      "Memorandum of Incorporation and company registration documents",
      "Minutes of board and shareholder meetings",
      "Annual financial statements and audit reports",
      "Share register",
    ]} />
    <LSH>3.2 Human Resources Records</LSH>
    <LList items={[
      "Employee personal records and employment contracts",
      "Payroll records",
      "Leave records",
      "Disciplinary and grievance records",
    ]} />
    <LSH>3.3 Operational Records</LSH>
    <LList items={[
      "Client and contractor agreements",
      "Project records and documentation",
      "Financial and accounting records",
      "IT systems and security records",
    ]} />

    <LH>4. How to Request Access to Records</LH>
    <LP>
      Requests for access to records must be submitted using the prescribed Form C (available from
      the South African Human Rights Commission at www.sahrc.org.za).
    </LP>
    <LSH>4.1 Requirements for a valid request</LSH>
    <LList items={[
      "Completed Form C",
      "Adequate description of the record requested",
      "Indication of the form of access required",
      "Proof of identity (certified copy of ID)",
      "The prescribed request fee",
    ]} />
    <LSH>4.2 Request fees</LSH>
    <LList items={[
      "Request fee: R50,00 (non-refundable)",
      "Access fee: R1,10 per page (printed copies)",
      "No fee charged for records about the requester's own personal information",
    ]} />
    <LBox color="var(--info-bg)" border="var(--brand-primary)">
      Submit your completed Form C and proof of payment to: infofficer@qbrix.co.za or by post to
      our registered address. We will respond within 30 days of receipt.
    </LBox>

    <LH>5. Grounds for Refusal</LH>
    <LP>Access may be refused on the following grounds:</LP>
    <LList items={[
      "The information is protected under another Act",
      "Disclosure would violate the privacy of a third party",
      "The information is commercially confidential",
      "Disclosure would be harmful to the safety of any person",
      "The record does not exist",
    ]} />

    <LH>6. Subsidiaries</LH>
    <LP>
      This manual covers QBRIX (Pty) Ltd and all its subsidiaries and associated entities.
      A complete list of subsidiaries is available on request from the Information Officer.
    </LP>

    <LH>7. Further Assistance</LH>
    <LP>
      If you are unable to read, write or communicate in English, or if you have a disability that
      prevents you from submitting a request in writing, please contact our Information Officer who
      will render reasonable assistance.
    </LP>
    <LContact lines={[
      "South African Human Rights Commission (SAHRC)",
      "Tel: 011 877 3600",
      "Email: paia@sahrc.org.za",
      "Website: www.sahrc.org.za",
    ]} />
  </LegalPage>
);


// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3 — EMAIL DISCLAIMER
// ─────────────────────────────────────────────────────────────────────────────
export const EmailDisclaimerScreen = () => (
  <LegalPage
    icon="✉️"
    title="Email Disclaimer"
    subtitle="Company-wide email disclaimer and confidentiality notice"
    lastUpdated="January 2026"
  >
    <LBox color="var(--warning-bg)" border="var(--warning)">
      This disclaimer applies to all email communications sent from QBRIX (Pty) Ltd email addresses.
    </LBox>

    <LH>Standard Disclaimer</LH>
    <div style={{
      background: "rgba(28,53,87,0.04)",
      border: "1px solid var(--border-med)",
      borderRadius: "var(--r-md)",
      padding: "20px 24px",
      fontSize: 13,
      color: "var(--txt-2)",
      lineHeight: 1.75,
      fontStyle: "italic",
      margin: "16px 0 28px",
    }}>
      <p style={{ marginBottom: 12 }}>
        This email and any attachments are confidential and intended solely for the use of the
        individual or entity to whom they are addressed. If you have received this email in error,
        please notify the sender immediately and delete it from your system. You must not copy,
        distribute or take action in reliance on this email.
      </p>
      <p style={{ marginBottom: 12 }}>
        The views or opinions expressed in this email are those of the author and do not necessarily
        represent those of QBRIX (Pty) Ltd. QBRIX (Pty) Ltd reserves the right to monitor all email
        communications through its network.
      </p>
      <p>
        QBRIX (Pty) Ltd does not accept liability for any loss or damage arising from the use of this
        email or any attachments, including (but not limited to) loss or damage from viruses,
        software defects or any other technical causes. Whilst QBRIX takes reasonable precautions to
        ensure that no viruses are present in its emails, the company cannot accept responsibility
        for any loss or damage arising from the use of this email or attachments.
      </p>
    </div>

    <LH>Why This Disclaimer Applies</LH>
    <LP>
      South African law recognises that email communications may constitute binding legal agreements.
      This disclaimer is intended to clarify the nature and limitations of email communications from
      QBRIX and to protect both the sender and the company.
    </LP>

    <LH>Confidentiality</LH>
    <LP>
      All information transmitted by QBRIX via email in connection with client projects, quotes,
      contractor details and financial information is considered strictly confidential. Recipients
      are prohibited from:
    </LP>
    <LList items={[
      "Forwarding confidential emails to unauthorised third parties",
      "Using confidential information for purposes other than those intended",
      "Reproducing or distributing email content without written consent from QBRIX",
      "Using information obtained from QBRIX emails to the detriment of QBRIX or its clients",
    ]} />

    <LH>Phishing and Fraud Warning</LH>
    <LBox color="var(--error-bg)" border="var(--error)">
      QBRIX will never request banking details, passwords or personal information via email.
      If you receive a suspicious email claiming to be from QBRIX, do not click any links or
      attachments. Contact us immediately at security@qbrix.co.za.
    </LBox>

    <LH>Electronic Communications and Transactions Act</LH>
    <LP>
      In terms of the Electronic Communications and Transactions Act 25 of 2002 (ECTA), QBRIX
      draws your attention to the fact that contracts concluded electronically are valid and
      enforceable in South Africa. Any acceptance of quotes, project submissions or agreements
      communicated via email constitute legally binding obligations.
    </LP>

    <LH>Contact</LH>
    <LP>
      For queries regarding this disclaimer or to report a suspicious email:
    </LP>
    <LContact lines={[
      "QBRIX (Pty) Ltd",
      "Email: legal@qbrix.co.za",
      "Security concerns: security@qbrix.co.za",
      "Tel: [Your telephone number]",
    ]} />
  </LegalPage>
);


// ─────────────────────────────────────────────────────────────────────────────
// LEGAL HUB — landing page linking to all three documents
// ─────────────────────────────────────────────────────────────────────────────
export const LegalHubScreen = ({ setScreen }) => {
  const docs = [
    {
      screen: "privacy-notice",
      icon: "🔒",
      title: "Privacy Notice",
      desc: "How we collect, use, store and protect your personal information in compliance with POPIA.",
      badge: "POPIA",
      badgeColor: "var(--brand-primary)",
    },
    {
      screen: "paia-manual",
      icon: "📋",
      title: "PAIA Manual",
      desc: "How to request access to records held by QBRIX and its subsidiaries under PAIA.",
      badge: "PAIA",
      badgeColor: "var(--success)",
    },
    {
      screen: "email-disclaimer",
      icon: "✉️",
      title: "Email Disclaimer",
      desc: "Company-wide email disclaimer, confidentiality notice and fraud warnings.",
      badge: "ECTA",
      badgeColor: "var(--brand-accent)",
    },
  ];

  return (
    <div className="page-wrap" style={{ maxWidth: 860 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="h-1" style={{ marginBottom: 6 }}>Legal & Compliance</h1>
        <p className="body" style={{ color: "var(--txt-2)" }}>
          QBRIX is committed to transparency and compliance with South African law.
          Review our legal documents below.
        </p>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {docs.map((doc) => (
          <div
            key={doc.screen}
            className="card card-hover"
            onClick={() => setScreen(doc.screen)}
            style={{ padding: "22px 26px", display: "flex", alignItems: "center", gap: 20 }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: "var(--r-lg)", flexShrink: 0,
              background: "var(--bg-base)",
              border: "1px solid var(--border-sub)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
            }}>
              {doc.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--txt-1)" }}>{doc.title}</span>
                <span style={{
                  fontSize: 9.5, fontWeight: 700, letterSpacing: "0.6px",
                  padding: "2px 7px", borderRadius: "var(--r-full)",
                  background: doc.badgeColor, color: "white",
                }}>
                  {doc.badge}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--txt-2)", lineHeight: 1.5 }}>{doc.desc}</p>
            </div>
            <span style={{ color: "var(--txt-3)", fontSize: 18, flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "var(--txt-3)", marginTop: 24, textAlign: "center" }}>
        For questions about any of these documents, contact us at{" "}
        <span style={{ color: "var(--brand-primary)", fontWeight: 500 }}>legal@qbrix.co.za</span>
      </p>
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────────────
// INTEGRATION INSTRUCTIONS
// ─────────────────────────────────────────────────────────────────────────────
/**
 * STEP 1 — Import these screens into BuildQuotePlatform.jsx:
 *
 *   import {
 *     LegalHubScreen,
 *     PrivacyNoticeScreen,
 *     PaiaManualScreen,
 *     EmailDisclaimerScreen,
 *   } from "./LegalScreens";
 *
 *
 * STEP 2 — Add to topbarConfig:
 *
 *   "legal":            { title: "Legal & Compliance", sub: "Policies and legal documents" },
 *   "privacy-notice":   { title: "Privacy Notice",     sub: "POPIA — how we handle your data" },
 *   "paia-manual":      { title: "PAIA Manual",         sub: "Access to information requests" },
 *   "email-disclaimer": { title: "Email Disclaimer",    sub: "Company email disclaimer" },
 *
 *
 * STEP 3 — Add to renderScreen() switch:
 *
 *   case "legal":            return <LegalHubScreen setScreen={setScreen} />;
 *   case "privacy-notice":   return <PrivacyNoticeScreen />;
 *   case "paia-manual":      return <PaiaManualScreen />;
 *   case "email-disclaimer": return <EmailDisclaimerScreen />;
 *
 *
 * STEP 4 — Add a Legal section to the sidebar nav (in the sidebarNav config):
 *
 *   {
 *     section: "Legal",
 *     items: [
 *       { key: "legal",  icon: "⚖️", label: "Legal & Compliance" },
 *     ],
 *   }
 *
 *   Or add individual items to an existing section:
 *   { key: "privacy-notice",   icon: "🔒", label: "Privacy Notice" },
 *   { key: "paia-manual",      icon: "📋", label: "PAIA Manual" },
 *   { key: "email-disclaimer", icon: "✉️", label: "Email Disclaimer" },
 *
 *
 * STEP 5 (optional) — Add to DemoNav for prototyping:
 *
 *   { key: "legal",            label: "⑯ Legal Hub",   group: "shared" },
 *   { key: "privacy-notice",   label: "⑰ Privacy",     group: "shared" },
 *   { key: "paia-manual",      label: "⑱ PAIA",        group: "shared" },
 *   { key: "email-disclaimer", label: "⑲ Disclaimer",  group: "shared" },
 */

// Standalone default export for the App.jsx tab viewer
export default function LegalScreens() {
  const [screen, setScreen] = useState("legal");
  if (screen === "privacy-notice") return <PrivacyNoticeScreen />;
  if (screen === "paia-manual") return <PaiaManualScreen />;
  if (screen === "email-disclaimer") return <EmailDisclaimerScreen />;
  return <LegalHubScreen setScreen={setScreen} />;
}
