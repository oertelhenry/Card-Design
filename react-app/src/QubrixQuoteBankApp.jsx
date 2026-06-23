import { useState } from "react";

const COST_ITEMS = [
  { icon: "foundation", title: "Sub-structure & Shell", subtitle: "Excavations, Concrete, Brickwork", amount: "R485,000", status: "On Benchmark", statusColor: "text-safety-green" },
  { icon: "plumbing", title: "Mechanical & Electrical", subtitle: "Reticulation, Sanitaryware, Lighting", amount: "R212,500", status: "6% Above Avg.", statusColor: "text-secondary" },
  { icon: "colors", title: "Finishes & Fittings", subtitle: "Flooring, Paint, Carpentry", amount: "R345,000", status: "Excellent Value", statusColor: "text-safety-green" },
];

export default function QubrixQuoteBankApp() {

  const [docs, setDocs] = useState([
    { label: "Approved Building Plans", checked: true },
    { label: "Contractor NHBRC Cert", checked: true },
    { label: "Latest Bank Statements", checked: false },
  ]);

  const toggleDoc = (index) => {
    setDocs((prev) => prev.map((doc, i) => i === index ? { ...doc, checked: !doc.checked } : doc));
  };

  return (
    <>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <div className="bg-background text-on-surface font-body-md scroll-smooth selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="bg-surface-bright shadow-sm sticky top-0 z-50">
          <div className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
            <div className="flex items-center gap-8">
              <span className="text-headline-md font-headline-md font-bold text-primary">Qubrix</span>
              <nav className="hidden md:flex items-center gap-6">
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Dashboard</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Find Builders</a>
                <a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1 transition-colors duration-200" href="#">My Quotes</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Documents</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block px-6 py-2.5 bg-secondary text-white rounded-full font-label-md text-label-md active:scale-95 transition-transform duration-150 hover:bg-opacity-90">
                Get Quote
              </button>
              <div className="h-10 w-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
                <img
                  alt="User profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoRkJtLbIb2vyq5Ie9YGGdg3vybfExWPyNxy7nb8swu1DTM04dNj8x3EndA-AN_IXrx9Vr0ZQ-KGVz6-kyPd2lG7CyqJwp9S_mbxs8pBLollmEnqdnZospM-aZIzn7YRg2Y8yFkx_7-DGL9PrPWmGtWL7prqkCLbo3_QBs4_D-PJbC_g77zHn48XJae7at3UCP8V1JgFujdD-i6ZnSxqRBf9ONeRczyyRieZLy44bGMa2sE4Wuxhi2AcUIXtYmTzzeOgjuYX6r550"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex-grow">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -translate-y-1/2 z-0"></div>
              <div className="absolute top-1/2 left-0 w-2/3 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"></div>
              {[
                { label: "Quote", done: true },
                { label: "Review", active: true },
                { label: "Bank Submit", inactive: true },
              ].map(({ label, done, active, inactive }, i) => (
                <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      inactive ? "bg-surface-container-highest text-on-surface-variant border-2 border-outline-variant" : "bg-primary text-on-primary"
                    } ${active ? "ring-4 ring-primary-fixed" : ""}`}
                  >
                    {done ? (
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    ) : (
                      <span className="font-label-md text-label-md">{i + 1}</span>
                    )}
                  </div>
                  <span className={`font-label-sm text-label-sm uppercase ${inactive ? "text-on-surface-variant" : "text-primary"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-gutter">
              {/* Project Overview */}
              <section
                className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-surface-variant/30"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h1 className="font-headline-lg text-headline-lg text-primary mb-1">Double-Story Extension</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      42 Silver Oak Estate, Sandton, Johannesburg
                    </p>
                  </div>
                  <div className="bg-safety-green/10 text-safety-green px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="font-label-md text-label-md">NHBRC Approved</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-surface-variant/50">
                  {[
                    { label: "Total Area", value: "145 m²" },
                    { label: "Duration", value: "22 Weeks" },
                    { label: "Quote Date", value: "Oct 24, 2024" },
                    { label: "Expiring In", value: "12 Days", highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div key={label}>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">{label}</p>
                      <p className={`font-headline-md text-headline-md ${highlight ? "text-secondary" : "text-primary"}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-label-md text-label-md text-primary mb-3">Project Scope Summary</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Proposed double-story master suite extension including ensuite bathroom, walk-in dressing room, and balcony.
                    Scope covers structural engineering, NHBRC registrations, plumbing, electrical installations to code, and
                    high-end finishing as per technical specifications.
                  </p>
                </div>
              </section>

              {/* Cost Breakdown */}
              <section
                className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-surface-variant/30"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <h2 className="font-headline-md text-headline-md text-primary">Cost Breakdown</h2>
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI BENCHMARKED
                    </span>
                  </div>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Market Average: <span className="text-primary">R14,200/m²</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {COST_ITEMS.map(({ icon, title, subtitle, amount, status, statusColor }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all"
                      style={{ transition: "background-color 0.2s, transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                          <span className="material-symbols-outlined">{icon}</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-primary">{title}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-headline-md text-headline-md text-primary">{amount}</p>
                        <p className={`font-label-sm text-label-sm ${statusColor}`}>{status}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-label-sm text-label-sm opacity-80 uppercase mb-1">Total Estimated Investment</p>
                    <p className="font-display-lg text-display-lg text-white">R1,042,500.00</p>
                  </div>
                  <button className="flex items-center gap-2 font-label-md text-label-md text-white border border-on-primary-container px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">download</span> Full PDF Quote
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-gutter">
              {/* Builder Profile */}
              <section className="bg-white rounded-xl p-6 shadow-sm border border-surface-variant/30">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-6">Contracting Builder</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                    <img
                      alt="Builder logo"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHLO5AJ00iF8vrkxGmurgja1TV6jRHxh0G6V9PujsFB1bOnEWcgdIAmnJs8owt0UXKnqzjMNs-lZL-geER29v4ZSRKZGMMqC3sG7RiSYIXgsyoTfaWmX_eD844_WmODuSuT90Hytec5IcUqSSGcL-9u-nwEmKfVwbFL6C0EsFCHoVbDekCIe8j42xo3VasIN59CtT6Ne-rWjw3UH-eHUQkpUuI9Ax9GoYViCRQOFSbG3MQ4Ch9d0ltWvqOJ2vmrGbbr_wknwToDvo"
                    />
                  </div>
                  <div>
                    <p className="font-headline-md text-headline-md text-primary">Elite Structures SA</p>
                    <div className="flex items-center gap-1 text-safety-green">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-md text-label-md">4.9 (124 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "NHBRC Reg.", value: "#10023498", className: "text-primary font-bold" },
                    { label: "Public Liability", value: "Active", icon: "check_circle", className: "text-safety-green flex items-center gap-1" },
                    { label: "Completed Projects", value: "48 in area", className: "text-primary" },
                  ].map(({ label, value, icon, className }) => (
                    <div key={label} className="flex items-center justify-between text-label-md font-label-md">
                      <span className="text-on-surface-variant">{label}</span>
                      <span className={className}>
                        {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 border border-outline text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                  View Portfolio
                </button>
              </section>

              {/* Bank Application */}
              <section className="bg-surface-bright rounded-xl p-6 shadow-md border-2 border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-secondary-container/20 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">account_balance</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary">Submit to Bank</h3>
                </div>
                <div className="space-y-6">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Qubrix is an authorized bank partner. We package your quote for rapid building loan approval.
                  </p>
                  <div className="space-y-3">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Required Documents</p>
                    {docs.map((doc, index) => (
                      <label
                        key={doc.label}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-surface-variant cursor-pointer hover:border-primary transition-all"
                        onClick={() => toggleDoc(index)}
                      >
                        <input
                          checked={doc.checked}
                          onChange={() => toggleDoc(index)}
                          className="rounded text-secondary focus:ring-secondary w-5 h-5"
                          type="checkbox"
                        />
                        <span className="font-label-md text-label-md text-primary flex-1">{doc.label}</span>
                        <span className={`material-symbols-outlined ${doc.checked ? "text-safety-green" : "text-outline"}`}>
                          {doc.checked ? "check_circle" : "pending"}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-dashed border-outline-variant text-center">
                    <span className="material-symbols-outlined text-outline-variant text-[32px] block mb-2">upload_file</span>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      Drop bank statements here or{" "}
                      <span className="text-secondary underline cursor-pointer">browse</span>
                    </p>
                  </div>

                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md shadow-lg active:scale-95 transition-transform">
                    Apply for Finance
                  </button>
                  <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
                    Estimated approval time: <span className="font-bold">48 - 72 Hours</span>
                  </p>
                </div>
              </section>

              {/* Help Links */}
              <div className="flex items-center justify-center gap-6 py-4">
                <a className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2 hover:text-primary" href="#">
                  <span className="material-symbols-outlined text-[20px]">help</span>
                  Help Center
                </a>
                <a className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2 hover:text-primary" href="#">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  Chat Support
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-primary mt-12 py-12">
          <div className="w-full px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="col-span-1">
              <span className="font-headline-md text-headline-md text-on-primary block mb-4">Qubrix</span>
              <p className="font-body-md text-body-md text-primary-fixed/80 leading-relaxed">
                South Africa's premier platform for managed residential construction and digital building finance.
              </p>
            </div>
            {[
              { heading: "Platform", links: ["Builder Directory", "Bank Finance Guide", "Technical Standards"] },
              { heading: "Company", links: ["Terms of Service", "Privacy Policy", "Contact Support"] },
            ].map(({ heading, links }) => (
              <div key={heading} className="col-span-1">
                <h4 className="font-label-sm text-label-sm text-secondary-fixed mb-4 uppercase">{heading}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a className="font-label-md text-label-md text-primary-fixed/80 hover:text-white transition-colors" href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-1">
              <h4 className="font-label-sm text-label-sm text-secondary-fixed mb-4 uppercase">Our Partners</h4>
              <div className="flex flex-wrap gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
                {["ABSA", "FNB", "NHBRC"].map((partner) => (
                  <div key={partner} className="h-8 w-16 bg-white/10 rounded flex items-center justify-center font-bold text-white text-[10px]">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full px-margin-desktop max-w-container-max mx-auto mt-12 pt-8 border-t border-white/10 text-center">
            <p className="font-label-sm text-label-sm text-primary-fixed/60">
              © 2024 Qubrix South Africa. All Rights Reserved. NHBRC Verified Partner.
            </p>
          </div>
        </footer>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 md:hidden bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.02)] rounded-t-xl">
          {[
            { icon: "dashboard", label: "Home" },
            { icon: "verified", label: "Builders" },
            { icon: "request_quote", label: "Quotes", active: true },
            { icon: "person", label: "Profile" },
          ].map(({ icon, label, active }) => (
            <a
              key={label}
              className={`flex flex-col items-center justify-center p-2 ${active ? "text-secondary bg-secondary-container/10 rounded-xl scale-90" : "text-on-surface-variant hover:text-secondary transition-all"}`}
              href="#"
            >
              <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>{icon}</span>
              <span className="font-label-sm text-[10px]">{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
