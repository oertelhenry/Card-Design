import { useState, useEffect } from "react";

// ─── Shared data ────────────────────────────────────────────────────────────

const BUILDERS = [
  { id: 1, name: "Apex Structured Living", rating: "4.9", location: "Sandton, Johannesburg", tags: ["Full Renovation", "Architecture"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-Nv2Q45W-VVtFacJ2bcNEP_OtGJ4zmAdbwT-O8GFvhC3DLrQIPVuv44ucKxbxy1SqwECI4LW8aYDeY9l1h2hX5ern0EKQeCZoMl2QAtsL7dYos1vvM73z-GSlZG-uzq5fxRuj9jf6dj1T6fHl3EjVhOZTNmZ1FNw2GPWuNUbsN7v7JA3-BlLBkPkHIf4NM2V3nfTSQ-UTk0KKTNxI1LJ5aduR2-rol7ER-hO5CWvg-eXCPyqySQJJIcRcgzLxYGeHFigoFze9T8" },
  { id: 2, name: "Summit Roofing & Deck", rating: "4.7", location: "Centurion, Pretoria", tags: ["Roofing Specialist", "Outdoor"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq5KsNwSNMH-yX_09kSJrQhZE54YQnECot1ge02a1lLVaLWAF8QwkTI02P_GCbNGImRfn3B-biLRHKLP3-Go7IJ0_3sM-RPYRKzG3VoKDKB3VnvDcDTmbWet7pYlR53iRM-qNpMrey6XKM5bgVOXUsC6y0x0aH6AtXwfuW87qoVJXB2U2FP7HbEQ0hDPXSM3aDLP9Yw1LIe95IDx4aiz0aaCbtrMNe7QEQsm1YuW5dx39wW-ERYMiufjgnKLKvq9Vg634OAwt2-f0" },
  { id: 3, name: "Blue Horizon Devs", rating: "5.0", location: "Midrand, Johannesburg", tags: ["Luxury Homes", "Green Tech"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqKyBKUY_5jTa3wgVOTWaWFP8yGLg57PhCncGcvqFcfBTBDcftEvrODbxgDZebKNF2v0ma6NVtfcGXJ84T1WgvKiobp7A1fmt7RYKr7S5Bh9kwDj96VYp-bJuBjWD-D94yiaRjse_9gUKEaNfc5jUjh5jaBCitcoOtHEJgNBDy69Zn7vMwcuN8-UgdCDz0QhhhQnuBhridoXjUiuBlIZHvyDFlkXPB2zSViVoHT0hN1aF1Bi0_-B7iLv_6n3YdN9pX_oe1X7EBrfQ" },
  { id: 4, name: "Urban Core Interiors", rating: "4.6", location: "Randburg, Johannesburg", tags: ["Interior Fit-out", "Renovation"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8R4ng0hGaGDTzAL8BbIX_i-4ONHq1xA1l8CHHMVD_dscmkcSefX_ISB5ZZ6WB05X_Z7Z6H50lrOfolB0Nr9VJo2xl4a16SkVPO-tGrDakyWUr6K_SZbImh4eTTKiyugQLnivYXAYXOnxcdRsIahJ69HUqncunXXpsgoQKW8hRTqKdNSSELqvblKQ3GCLv4hZ9NRJcuOkZlGGvWOH_C41E8ix4ULlo8jlO5hhyEv2wVDgR4WvL7Pp7MDPaR2mwI-izaXrrPMZBQ8" },
];

const COST_ITEMS = [
  { icon: "foundation", title: "Sub-structure & Shell", subtitle: "Excavations, Concrete, Brickwork", amount: "R485,000", status: "On Benchmark", statusColor: "text-safety-green" },
  { icon: "plumbing", title: "Mechanical & Electrical", subtitle: "Reticulation, Sanitaryware, Lighting", amount: "R212,500", status: "6% Above Avg.", statusColor: "text-secondary" },
  { icon: "colors", title: "Finishes & Fittings", subtitle: "Flooring, Paint, Carpentry", amount: "R345,000", status: "Excellent Value", statusColor: "text-safety-green" },
];

const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAue_SvYo5T3qeItHr8ObV3OOo0zvqpiJRdYT6FNDo2ff-Qw1RHRKhj509IyARo2tNdSxcgS5YsbZQO_EGfeg7w6Jx45JIA_t_u3TgALlinT1EtuKLPpIGLEMLzlu7dPotaW_uv0X14soBVVkIgpQ-0vQgbcYx99ZAok9DihSKND-19iYtQ9M_GULnHfuLPBBoQhyd6zTY5tRbwCH6FZk4og9h4rHqHCbGq1KX4nBhywAI48yNYiiJQBGGLdDeHw-bHkvHCZ8T3DiE";

// ─── Shared layout components ────────────────────────────────────────────────

function TopNav({ page, setPage }) {
  const navLinks = [
    { label: "Dashboard", route: "dashboard" },
    { label: "Find Builders", route: "builders" },
    { label: "My Quotes", route: "quote" },
    { label: "Documents", route: null },
  ];

  return (
    <header className="bg-surface-bright shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={() => setPage("dashboard")} className="text-headline-md font-headline-md font-bold text-primary">
            Qubrix
          </button>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, route }) => (
              <button
                key={label}
                onClick={() => route && setPage(route)}
                className={`font-label-md text-label-md transition-colors duration-200 ${
                  page === route
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage("quote")}
            className="hidden md:block bg-secondary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:shadow-lg transition-all active:scale-95"
          >
            Get Quote
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-variant">
            <img alt="User profile" className="w-full h-full object-cover" src={USER_AVATAR} />
          </div>
        </div>
      </nav>
    </header>
  );
}

function MobileBottomNav({ page, setPage }) {
  const items = [
    { icon: "dashboard", label: "Home", route: "dashboard" },
    { icon: "verified", label: "Builders", route: "builders" },
    { icon: "request_quote", label: "Quotes", route: "quote" },
    { icon: "person", label: "Profile", route: null },
  ];
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 md:hidden bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.02)] rounded-t-xl">
      {items.map(({ icon, label, route }) => {
        const active = page === route;
        return (
          <button
            key={label}
            onClick={() => route && setPage(route)}
            className={`flex flex-col items-center justify-center p-2 ${active ? "text-secondary bg-secondary-container/10 rounded-xl" : "text-on-surface-variant"}`}
          >
            <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>{icon}</span>
            <span className="font-label-sm text-[10px]">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-on-primary py-12 mt-12">
      <div className="w-full px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="space-y-4">
          <h2 className="font-headline-md text-headline-md">Qubrix</h2>
          <p className="font-body-md text-body-md text-primary-fixed/80">
            Connecting South African homeowners with the most reliable, NHBRC verified contractors.
          </p>
        </div>
        {[
          { heading: "Platform", links: ["Builder Directory", "Bank Finance Guide", "Contract Templates"] },
          { heading: "Legal", links: ["Terms of Service", "Privacy Policy", "Safety Standards"] },
          { heading: "Support", links: ["Contact Support", "Help Center"] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="font-label-sm text-label-sm text-secondary-container mb-4 uppercase tracking-widest">{heading}</h4>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item}><a className="font-body-md text-body-md text-primary-fixed/80 hover:text-white transition-colors" href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-full px-margin-desktop max-w-container-max mx-auto mt-12 pt-8 border-t border-white/10 text-center">
        <p className="font-label-sm text-label-sm text-primary-fixed/60">
          © 2024 Qubrix South Africa. All Rights Reserved. NHBRC Verified Partner.
        </p>
      </div>
    </footer>
  );
}

// ─── Page: Login ─────────────────────────────────────────────────────────────

function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-surface font-body-md text-on-surface antialiased overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 bg-primary overflow-hidden flex flex-col p-8 md:p-margin-desktop">
        <div className="absolute inset-0 hero-pattern opacity-50"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-primary-container opacity-20 rounded-full blur-[80px]"></div>

        <div className="relative z-10 mb-12">
          <img
            alt="Qubrix Logo"
            className="h-16 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AP1WRLsdzHC0GRzRXra2yzUox9XXtTwYgXiD3AoB2TJuyriiJVyx6AzhQYP0VsS8hvtQwhiE87lPq598dJBgGRIEysLprQrBNu6cKD4XBDLCtpp6A_wKQ2JntLY3CG3CDaahaYYjMdpEfn4tCfSItAIw4ff74GAOeJRxJVzqhuIK3Fra1ubO5aJEoW89U_HsNmfh2w7gbIo5gzttYBTPuDsUdOdRO-jn8EAiqtT1dF5nxyjPrDHc9xnMkwJEYro"
          />
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center max-w-xl">
          <h1 className="font-display-lg text-display-lg text-on-primary mb-8 leading-tight">
            Where trusted builders meet property owners.
          </h1>
          <div className="space-y-8">
            {[
              { icon: "verified", title: "Verified Builders", desc: "Every contractor is vetted for NHBRC compliance and quality craftsmanship." },
              { icon: "psychology", title: "AI-assisted Quoting", desc: "Generate accurate construction cost estimates in minutes using advanced AI." },
              { icon: "account_balance", title: "Direct Bank Integration", desc: "Seamless financial workflows with South Africa's leading commercial banks." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-gutter group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center group-hover:bg-secondary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-on-primary">{icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-primary mb-1">{title}</h3>
                  <p className="text-on-primary-container text-body-md opacity-90">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-12 mt-auto">
          <p className="text-label-sm text-on-primary-container opacity-60">© 2024 Qubrix South Africa. NHBRC Verified Partner.</p>
        </div>
      </section>

      {/* Form */}
      <section className="w-full md:w-1/2 lg:w-2/5 bg-surface flex items-center justify-center p-8 md:p-margin-desktop">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Welcome Back</h2>
            <p className="font-body-md text-on-surface-variant">Sign in to manage your construction projects.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
              <input
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none placeholder:text-outline/50"
                id="email" name="email" placeholder="name@example.com" required type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                <a className="text-label-sm text-secondary hover:underline underline-offset-4" href="#">Forgot password?</a>
              </div>
              <input
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none placeholder:text-outline/50"
                id="password" name="password" placeholder="••••••••" required type="password"
              />
            </div>
            <div className="flex items-center gap-2">
              <input className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary" id="remember" type="checkbox" />
              <label className="text-label-md text-on-surface-variant select-none" htmlFor="remember">Remember me for 30 days</label>
            </div>
            <button
              className="w-full bg-secondary hover:bg-secondary/90 text-on-primary font-label-md text-body-md py-4 rounded-xl shadow-lg shadow-secondary/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              type="submit" disabled={loading}
            >
              {loading ? (
                <><span className="material-symbols-outlined animate-spin">progress_activity</span> Authenticating...</>
              ) : (
                <>Sign In <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
            <div className="relative flex justify-center text-label-sm">
              <span className="bg-surface px-4 text-on-surface-variant font-medium uppercase tracking-wider">Social Sign In</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-label-md">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="font-label-md">GitHub</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="font-body-md text-on-surface-variant">
              Don't have an account?{" "}
              <a className="text-secondary font-bold hover:underline underline-offset-4" href="#">Register</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Page: Builder Directory ──────────────────────────────────────────────────

function BuilderCard({ builder, onQuote }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all group" style={{ boxShadow: "0 4px 4px 0 rgba(0,0,0,0.02)" }}>
      <div className="relative h-48 w-full overflow-hidden">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={builder.img} alt={builder.name} />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
          <span className="material-symbols-outlined text-safety-green text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <span className="text-safety-green font-label-sm text-label-sm uppercase tracking-wide">NHBRC Verified</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-headline-md text-primary">{builder.name}</h3>
          <div className="flex items-center gap-1 text-[#C4622D]">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-label-md text-label-md">{builder.rating}</span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">{builder.location}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {builder.tags.map((tag) => (
            <span key={tag} className="bg-surface-container-high px-2 py-1 rounded text-label-sm font-label-sm text-on-surface-variant">{tag}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onQuote} className="flex-grow bg-[#C4622D] text-white py-3 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">
            Request Quote
          </button>
          <button className="p-3 border border-outline-variant rounded-lg text-primary hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function BuildersPage({ setPage }) {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0 space-y-8">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30" style={{ boxShadow: "0 4px 4px 0 rgba(0,0,0,0.02)" }}>
              <h2 className="font-headline-md text-headline-md mb-6 text-primary">Filters</h2>
              <div className="mb-8">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block mb-4">Region</label>
                <div className="space-y-3">
                  {["Gauteng", "Western Cape", "KwaZulu-Natal", "Mpumalanga"].map((region, i) => (
                    <label key={region} className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked={i === 0} className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                      <span className="font-body-md text-body-md group-hover:text-primary transition-colors">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block mb-4">Specialization</label>
                <div className="flex flex-wrap gap-2">
                  {["Roofing", "Full Renovation", "Plumbing", "Interior Design", "Solar Install"].map((s, i) => (
                    <button key={s} className={`px-3 py-1.5 rounded-full border text-label-sm font-label-sm transition-all ${i === 1 ? "border-primary bg-primary-container text-on-primary-container" : "border-outline-variant bg-surface-bright hover:border-primary hover:text-primary"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block mb-4">NHBRC Status</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-5 h-5 border-outline text-safety-green focus:ring-safety-green" name="nhbrc" type="radio" />
                    <span className="font-body-md text-body-md group-hover:text-safety-green transition-colors">Verified Only</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="nhbrc" type="radio" />
                    <span className="font-body-md text-body-md group-hover:text-primary transition-colors">All Contractors</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary">Verified Builders</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Showing 12 contractors in Johannesburg, Gauteng</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-surface-container-low p-1 rounded-lg">
                <button className="p-2 bg-white rounded-md shadow-sm text-primary"><span className="material-symbols-outlined">grid_view</span></button>
                <button className="p-2 text-outline hover:text-primary"><span className="material-symbols-outlined">list</span></button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {BUILDERS.map((b) => <BuilderCard key={b.id} builder={b} onQuote={() => setPage("quote")} />)}
            </div>
            <div className="mt-12 flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-md text-label-md ${p === 1 ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all"}`}>{p}</button>
              ))}
              <span className="px-2 text-outline">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all font-label-md text-label-md">12</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Page: Dashboard ──────────────────────────────────────────────────────────

function DashboardPage({ setPage }) {
  useEffect(() => {
    const bars = document.querySelectorAll(".progress-bar-animate");
    bars.forEach((bar) => {
      const target = bar.dataset.width;
      bar.style.width = "0%";
      setTimeout(() => { bar.style.transition = "width 1.5s cubic-bezier(0.65,0,0.35,1)"; bar.style.width = target; }, 300);
    });
  }, []);

  return (
    <div className="bg-surface-bright text-on-surface min-h-screen flex flex-col">
      <main className="pt-8 pb-20 md:pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex-grow">
        {/* Welcome */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display-lg text-display-lg text-primary mb-2">Welcome back, David.</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Your property renovations are 82% on track this month.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setPage("builders")} className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors shadow-sm">
                <span className="material-symbols-outlined text-primary">search</span>
                <span className="font-label-md text-label-md text-primary">Find a Builder</span>
              </button>
              <button onClick={() => setPage("quote")} className="flex items-center gap-2 bg-secondary text-on-primary px-6 py-3 rounded-xl hover:shadow-md transition-all active:scale-95">
                <span className="material-symbols-outlined">add</span>
                <span className="font-label-md text-label-md">Start New Quote</span>
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Projects */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-lg text-headline-lg text-primary">Active Projects</h2>
              <a className="text-secondary font-label-md text-label-md hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 hover:shadow-[0_12px_24px_rgba(28,53,87,0.06)] transition-all" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary"><span className="material-symbols-outlined">foundation</span></div>
                  <span className="bg-safety-green/10 text-safety-green font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined !text-sm">check_circle</span> On Schedule
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">Sandton Villa Extension</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Kitchen remodel &amp; patio expansion.</p>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Phase: <span className="text-primary font-bold">Building</span></span>
                    <span className="text-primary">65%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full progress-bar-animate" data-width="65%" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-white" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhuGiOchzKw7FiNc0Nis1n0_H4hvE31Ak20UXpo09kyaHIo6J8s3If0fFvMciO4w8QIHkPo27VKzzJMbIpEh9AEvUSyd_nZ9w839v3s3L8z7byPusePitVhDHA9M_E0WumWFxXwtaXn1tATyZKCdyizottNz4Gbh5ryKblhvy1oe1fn2yoZ-OJ3cOtS2iOwExeIvBrZsQzfleAwk8pMGrhrldrKo7lq6vCaUz52eeeCkfPU2n_3i9YxQhlv8aIHFuxNAKbbQ-eDsI" />
                      <img className="w-8 h-8 rounded-full border-2 border-white" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98PQ0dQRhjRoehdHHpNflxXkQbSbUNL1ESA0JE291uZ4m-NVvi3Qx0Z5j-D95L_ToJl2t52-ACPfmtU1o96Mnm8rgTjOyGc0Ev7CshrUwp2MyaUMZlLOO6kQCtmcrEi8WrU-jUSyH_83dX_QwspYk9VY_fnpDlayOkd51CmRJRgvd7JXX7ALYJYfGd0ZuGHoq4hhvy9_C1Ty3fSyM6IF2WoWJf4dYBt5COw_TZSIKsRNAPJySVjh4WqkRdvFjyjetFRw1p_J4CxI" />
                    </div>
                    <span className="text-label-sm text-on-surface-variant italic">Next: Inspections</span>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 hover:shadow-[0_12px_24px_rgba(28,53,87,0.06)] transition-all" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary"><span className="material-symbols-outlined">architecture</span></div>
                  <span className="bg-primary-fixed text-primary font-label-sm text-label-sm px-2 py-1 rounded">Planning</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">Camps Bay Loft</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Structural reinforcement &amp; interior design.</p>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Phase: <span className="text-primary font-bold">Quoting</span></span>
                    <span className="text-primary">20%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container rounded-full progress-bar-animate" data-width="20%" style={{ width: "20%" }}></div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="material-symbols-outlined text-on-surface-variant !text-lg">description</span>
                    <span className="text-label-sm text-on-surface-variant">3 Quotes Received</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[{ label: "Total Invested", value: "R2.4M" }, { label: "Active Tasks", value: "12" }, { label: "Verified Pros", value: "04" }, { label: "Project Days", value: "45" }].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-on-primary-container font-label-sm text-label-sm mb-1 uppercase tracking-wider">{label}</p>
                    <p className="font-headline-lg text-headline-lg">{value}</p>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary-container/20 rounded-full -ml-12 -mb-12 blur-2xl"></div>
            </div>
          </div>

          {/* Quotes Sidebar */}
          <aside className="lg:col-span-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-lg text-headline-lg text-primary">Recent Quotes</h2>
            </div>
            <div className="bg-surface-container-lowest rounded-xl divide-y divide-surface-container overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              {[
                { amount: "R450,000.00", time: "2h ago", name: "Apex Structural Ltd", snippet: '"Revised foundation plan including reinforced steel..."' },
                { amount: "R385,000.00", time: "5h ago", name: "BuildRight Pros", snippet: '"Quote includes premium granite finishes..."' },
                { amount: "R510,000.00", time: "Yesterday", name: "Cape Craft Interiors", snippet: '"Complete renovation with lighting design phase..."' },
              ].map(({ amount, time, name, snippet }) => (
                <button key={name} onClick={() => setPage("quote")} className="w-full p-6 text-left hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{amount}</span>
                    <span className="text-label-sm text-on-surface-variant">{time}</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors">{name}</h4>
                  <div className="flex items-center gap-2 mt-1 mb-4">
                    <span className="flex items-center gap-1 bg-safety-green/10 text-safety-green font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined !text-xs">verified</span> Verified Builder
                    </span>
                  </div>
                  <p className="text-label-md font-label-md text-on-surface-variant line-clamp-1 italic">{snippet}</p>
                </button>
              ))}
              <div className="p-4 text-center">
                <button onClick={() => setPage("quote")} className="text-primary font-label-md text-label-md hover:text-secondary transition-colors py-2">Compare All Quotes</button>
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-8 bg-tertiary-container text-on-tertiary-container rounded-xl p-6 border-l-4 border-secondary shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h5 className="font-headline-md text-headline-md">AI Savings Insight</h5>
              </div>
              <p className="font-body-md text-body-md opacity-90">
                Switching to <span className="font-bold text-on-tertiary">Eco-Block foundation</span> could save up to{" "}
                <span className="text-secondary font-bold">R45,000</span> without compromising structural integrity.
              </p>
              <button className="mt-4 text-on-tertiary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all">
                View Analysis <span className="material-symbols-outlined !text-sm">arrow_forward</span>
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Page: Quote & Bank Application ──────────────────────────────────────────

function QuotePage() {
  const [docs, setDocs] = useState([
    { label: "Approved Building Plans", checked: true },
    { label: "Contractor NHBRC Cert", checked: true },
    { label: "Latest Bank Statements", checked: false },
  ]);

  const toggleDoc = (i) => setDocs((prev) => prev.map((d, idx) => idx === i ? { ...d, checked: !d.checked } : d));

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex-grow">
        {/* Progress Steps */}
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${inactive ? "bg-surface-container-highest text-on-surface-variant border-2 border-outline-variant" : "bg-primary text-on-primary"} ${active ? "ring-4 ring-primary-fixed" : ""}`}>
                  {done ? <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span> : <span className="font-label-md text-label-md">{i + 1}</span>}
                </div>
                <span className={`font-label-sm text-label-sm uppercase ${inactive ? "text-on-surface-variant" : "text-primary"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left */}
          <div className="lg:col-span-8 space-y-gutter">
            {/* Project Overview */}
            <section className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-surface-variant/30" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
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
            <section className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-surface-variant/30" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <h2 className="font-headline-md text-headline-md text-primary">Cost Breakdown</h2>
                  <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI BENCHMARKED
                  </span>
                </div>
                <p className="font-label-md text-label-md text-on-surface-variant">Market Avg: <span className="text-primary">R14,200/m²</span></p>
              </div>
              <div className="space-y-4">
                {COST_ITEMS.map(({ icon, title, subtitle, amount, status, statusColor }) => (
                  <div key={title} className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}>
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

          {/* Right */}
          <div className="lg:col-span-4 space-y-gutter">
            {/* Builder */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-surface-variant/30">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-6">Contracting Builder</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                  <img alt="Builder" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHLO5AJ00iF8vrkxGmurgja1TV6jRHxh0G6V9PujsFB1bOnEWcgdIAmnJs8owt0UXKnqzjMNs-lZL-geER29v4ZSRKZGMMqC3sG7RiSYIXgsyoTfaWmX_eD844_WmODuSuT90Hytec5IcUqSSGcL-9u-nwEmKfVwbFL6C0EsFCHoVbDekCIe8j42xo3VasIN59CtT6Ne-rWjw3UH-eHUQkpUuI9Ax9GoYViCRQOFSbG3MQ4Ch9d0ltWvqOJ2vmrGbbr_wknwToDvo" />
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
                  { label: "NHBRC Reg.", value: "#10023498", cls: "text-primary font-bold" },
                  { label: "Public Liability", value: "Active", icon: "check_circle", cls: "text-safety-green flex items-center gap-1" },
                  { label: "Completed Projects", value: "48 in area", cls: "text-primary" },
                ].map(({ label, value, icon, cls }) => (
                  <div key={label} className="flex items-center justify-between text-label-md font-label-md">
                    <span className="text-on-surface-variant">{label}</span>
                    <span className={cls}>{icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}{value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 border border-outline text-primary rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-colors">View Portfolio</button>
            </section>

            {/* Bank */}
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
                  {docs.map((doc, i) => (
                    <label key={doc.label} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-surface-variant cursor-pointer hover:border-primary transition-all">
                      <input checked={doc.checked} onChange={() => toggleDoc(i)} className="rounded text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                      <span className="font-label-md text-label-md text-primary flex-1">{doc.label}</span>
                      <span className={`material-symbols-outlined ${doc.checked ? "text-safety-green" : "text-outline"}`}>{doc.checked ? "check_circle" : "pending"}</span>
                    </label>
                  ))}
                </div>
                <div className="p-4 bg-white rounded-lg border border-dashed border-outline-variant text-center">
                  <span className="material-symbols-outlined text-outline-variant text-[32px] block mb-2">upload_file</span>
                  <p className="font-label-md text-label-md text-on-surface-variant">Drop bank statements here or <span className="text-secondary underline cursor-pointer">browse</span></p>
                </div>
                <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md shadow-lg active:scale-95 transition-transform">Apply for Finance</button>
                <p className="text-center font-label-sm text-label-sm text-on-surface-variant">Estimated approval time: <span className="font-bold">48 - 72 Hours</span></p>
              </div>
            </section>

            <div className="flex items-center justify-center gap-6 py-4">
              <a className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2 hover:text-primary" href="#">
                <span className="material-symbols-outlined text-[20px]">help</span> Help Center
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2 hover:text-primary" href="#">
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span> Chat Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function QubrixApp() {
  const [page, setPage] = useState("login");

  const isAuthenticated = page !== "login";

  return (
    <>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hero-pattern {
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 32px 32px;
        }
        .glass-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3);
        }
      `}</style>

      {isAuthenticated && <TopNav page={page} setPage={setPage} />}

      {page === "login"     && <LoginPage onLogin={() => setPage("dashboard")} />}
      {page === "dashboard" && <DashboardPage setPage={setPage} />}
      {page === "builders"  && <BuildersPage setPage={setPage} />}
      {page === "quote"     && <QuotePage />}

      {isAuthenticated && <MobileBottomNav page={page} setPage={setPage} />}
    </>
  );
}
