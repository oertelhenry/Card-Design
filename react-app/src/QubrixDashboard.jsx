import { useEffect } from "react";

export default function QubrixDashboard() {
  useEffect(() => {
    const progressBars = document.querySelectorAll(".progress-bar-animate");
    progressBars.forEach((bar) => {
      const targetWidth = bar.dataset.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.transition = "width 1.5s cubic-bezier(0.65, 0, 0.35, 1)";
        bar.style.width = targetWidth;
      }, 300);
    });
  }, []);

  return (
    <>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
      <div className="bg-surface-bright text-on-surface font-body-md min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {/* TopNavBar */}
        <header className="bg-surface-bright shadow-sm fixed top-0 left-0 w-full z-50">
          <nav className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
            <div className="flex items-center gap-12">
              <span className="text-headline-md font-headline-md font-bold text-primary">Qubrix</span>
              <div className="hidden md:flex items-center gap-8">
                <a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1" href="#">Dashboard</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Find Builders</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">My Quotes</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Documents</a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="hidden md:block bg-secondary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:shadow-lg transition-all active:scale-95 duration-150">
                Get Quote
              </button>
              <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
                <img
                  alt="User profile"
                  className="w-full h-auto"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAue_SvYo5T3qeItHr8ObV3OOo0zvqpiJRdYT6FNDo2ff-Qw1RHRKhj509IyARo2tNdSxcgS5YsbZQO_EGfeg7w6Jx45JIA_t_u3TgALlinT1EtuKLPpIGLEMLzlu7dPotaW_uv0X14soBVVkIgpQ-0vQgbcYx99ZAok9DihSKND-19iYtQ9M_GULnHfuLPBBoQhyd6zTY5tRbwCH6FZk4og9h4rHqHCbGq1KX4nBhywAI48yNYiiJQBGGLdDeHw-bHkvHCZ8T3DiE"
                />
              </div>
            </div>
          </nav>
        </header>

        <main className="pt-24 pb-20 md:pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Welcome Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-display-lg text-display-lg text-primary mb-2">Welcome back, David.</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Your property renovations are 82% on track this month.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-primary">search</span>
                  <span className="font-label-md text-label-md text-primary">Find a Builder</span>
                </button>
                <button className="flex items-center gap-2 bg-secondary text-on-primary px-6 py-3 rounded-xl hover:shadow-md transition-all active:scale-95">
                  <span className="material-symbols-outlined">add</span>
                  <span className="font-label-md text-label-md">Start New Quote</span>
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Active Projects */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-lg text-headline-lg text-primary">Active Projects</h2>
                <a className="text-secondary font-label-md text-label-md hover:underline" href="#">View All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Sandton Villa */}
                <div
                  className="bg-surface-container-lowest rounded-xl p-6 hover:shadow-[0_12px_24px_rgba(28,53,87,0.06)] transition-all group"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">foundation</span>
                    </div>
                    <span className="bg-safety-green/10 text-safety-green font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined !text-sm">check_circle</span>
                      On Schedule
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-1">Sandton Villa Extension</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Kitchen remodel &amp; patio expansion.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">
                        Current Phase: <span className="text-primary font-bold">Building</span>
                      </span>
                      <span className="text-primary">65%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full progress-bar-animate"
                        data-width="65%"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <div className="flex -space-x-2">
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white"
                          alt="Team member"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhuGiOchzKw7FiNc0Nis1n0_H4hvE31Ak20UXpo09kyaHIo6J8s3If0fFvMciO4w8QIHkPo27VKzzJMbIpEh9AEvUSyd_nZ9w839v3s3L8z7byPusePitVhDHA9M_E0WumWFxXwtaXn1tATyZKCdyizottNz4Gbh5ryKblhvy1oe1fn2yoZ-OJ3cOtS2iOwExeIvBrZsQzfleAwk8pMGrhrldrKo7lq6vCaUz52eeeCkfPU2n_3i9YxQhlv8aIHFuxNAKbbQ-eDsI"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white"
                          alt="Team member"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98PQ0dQRhjRoehdHHpNflxXkQbSbUNL1ESA0JE291uZ4m-NVvi3Qx0Z5j-D95L_ToJl2t52-ACPfmtU1o96Mnm8rgTjOyGc0Ev7CshrUwp2MyaUMZlLOO6kQCtmcrEi8WrU-jUSyH_83dX_QwspYk9VY_fnpDlayOkd51CmRJRgvd7JXX7ALYJYfGd0ZuGHoq4hhvy9_C1Ty3fSyM6IF2WoWJf4dYBt5COw_TZSIKsRNAPJySVjh4WqkRdvFjyjetFRw1p_J4CxI"
                        />
                      </div>
                      <span className="text-label-sm text-on-surface-variant italic">Next: Inspections</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Camps Bay Loft */}
                <div
                  className="bg-surface-container-lowest rounded-xl p-6 hover:shadow-[0_12px_24px_rgba(28,53,87,0.06)] transition-all group"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <span className="bg-primary-fixed text-primary font-label-sm text-label-sm px-2 py-1 rounded">
                      Planning
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-1">Camps Bay Loft</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Structural reinforcement &amp; interior design.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">
                        Current Phase: <span className="text-primary font-bold">Quoting</span>
                      </span>
                      <span className="text-primary">20%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary-container rounded-full progress-bar-animate"
                        data-width="20%"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant !text-lg">description</span>
                        <span className="text-label-sm text-on-surface-variant">3 Quotes Received</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-8 bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: "Total Invested", value: "R2.4M" },
                    { label: "Active Tasks", value: "12" },
                    { label: "Verified Pros", value: "04" },
                    { label: "Project Days", value: "45" },
                  ].map(({ label, value }) => (
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

            {/* Recent Quotes Sidebar */}
            <aside className="lg:col-span-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-lg text-headline-lg text-primary">Recent Quotes</h2>
              </div>
              <div
                className="bg-surface-container-lowest rounded-xl divide-y divide-surface-container overflow-hidden"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
              >
                {[
                  { amount: "R450,000.00", time: "2h ago", name: "Apex Structural Ltd", snippet: '"Revised foundation plan including reinforced steel..."' },
                  { amount: "R385,000.00", time: "5h ago", name: "BuildRight Pros", snippet: '"Quote includes premium granite finishes..."' },
                  { amount: "R510,000.00", time: "Yesterday", name: "Cape Craft Interiors", snippet: '"Complete renovation with lighting design phase..."' },
                ].map(({ amount, time, name, snippet }) => (
                  <div key={name} className="p-6 hover:bg-surface-container-low transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{amount}</span>
                      <span className="text-label-sm text-on-surface-variant">{time}</span>
                    </div>
                    <h4 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors">{name}</h4>
                    <div className="flex items-center gap-2 mt-1 mb-4">
                      <span className="flex items-center gap-1 bg-safety-green/10 text-safety-green font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined !text-xs">verified</span>
                        Verified Builder
                      </span>
                    </div>
                    <p className="text-label-md font-label-md text-on-surface-variant line-clamp-1 italic">{snippet}</p>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <button className="text-primary font-label-md text-label-md hover:text-secondary transition-colors py-2">
                    Compare All Quotes
                  </button>
                </div>
              </div>

              {/* AI Insight Card */}
              <div className="mt-8 bg-tertiary-container text-on-tertiary-container rounded-xl p-6 border-l-4 border-secondary shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <h5 className="font-headline-md text-headline-md">AI Savings Insight</h5>
                </div>
                <p className="font-body-md text-body-md opacity-90">
                  Switching to <span className="font-bold text-on-tertiary">Eco-Block foundation</span> for the villa could save up to{" "}
                  <span className="text-secondary font-bold">R45,000</span> without compromising structural integrity.
                </p>
                <button className="mt-4 text-on-tertiary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all">
                  View Analysis <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                </button>
              </div>
            </aside>
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 md:hidden bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.02)] rounded-t-xl">
          {[
            { icon: "dashboard", label: "Home", active: true },
            { icon: "verified", label: "Builders" },
            { icon: "request_quote", label: "Quotes" },
            { icon: "person", label: "Profile" },
          ].map(({ icon, label, active }) => (
            <a
              key={label}
              className={`flex flex-col items-center justify-center p-2 ${active ? "text-secondary bg-secondary-container/10 rounded-xl" : "text-on-surface-variant hover:text-secondary transition-all"}`}
              href="#"
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-label-sm text-[10px]">{label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <footer className="bg-primary w-full py-12 mt-12">
          <div className="w-full px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter text-on-primary">
            <div className="md:col-span-1">
              <span className="font-headline-md text-headline-md text-on-primary font-bold">Qubrix</span>
              <p className="mt-4 font-body-md text-body-md opacity-70">
                Building trust in South African residential construction since 2021.
              </p>
            </div>
            {[
              { heading: "Resources", links: ["Builder Directory", "Bank Finance Guide", "Success Stories"] },
              { heading: "Company", links: ["Privacy Policy", "Terms of Service", "Contact Support"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h6 className="font-label-sm text-label-sm mb-6 uppercase opacity-50 tracking-widest">{heading}</h6>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a className="text-primary-fixed/80 hover:text-white transition-colors hover:underline decoration-secondary-container underline-offset-4" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h6 className="font-label-sm text-label-sm mb-6 uppercase opacity-50 tracking-widest">Connect</h6>
              <p className="font-label-md text-label-md text-primary-fixed/80 mb-4">support@qubrix.co.za</p>
            </div>
          </div>
          <div className="w-full px-margin-desktop max-w-container-max mx-auto mt-12 pt-8 border-t border-white/10">
            <p className="font-label-sm text-label-sm text-primary-fixed/50">
              © 2024 Qubrix South Africa. All Rights Reserved. NHBRC Verified Partner.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
