
const BUILDERS = [
  {
    id: 1,
    name: "Apex Structured Living",
    rating: "4.9",
    location: "Sandton, Johannesburg",
    tags: ["Full Renovation", "Architecture"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-Nv2Q45W-VVtFacJ2bcNEP_OtGJ4zmAdbwT-O8GFvhC3DLrQIPVuv44ucKxbxy1SqwECI4LW8aYDeY9l1h2hX5ern0EKQeCZoMl2QAtsL7dYos1vvM73z-GSlZG-uzq5fxRuj9jf6dj1T6fHl3EjVhOZTNmZ1FNw2GPWuNUbsN7v7JA3-BlLBkPkHIf4NM2V3nfTSQ-UTk0KKTNxI1LJ5aduR2-rol7ER-hO5CWvg-eXCPyqySQJJIcRcgzLxYGeHFigoFze9T8",
  },
  {
    id: 2,
    name: "Summit Roofing & Deck",
    rating: "4.7",
    location: "Centurion, Pretoria",
    tags: ["Roofing Specialist", "Outdoor"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq5KsNwSNMH-yX_09kSJrQhZE54YQnECot1ge02a1lLVaLWAF8QwkTI02P_GCbNGImRfn3B-biLRHKLP3-Go7IJ0_3sM-RPYRKzG3VoKDKB3VnvDcDTmbWet7pYlR53iRM-qNpMrey6XKM5bgVOXUsC6y0x0aH6AtXwfuW87qoVJXB2U2FP7HbEQ0hDPXSM3aDLP9Yw1LIe95IDx4aiz0aaCbtrMNe7QEQsm1YuW5dx39wW-ERYMiufjgnKLKvq9Vg634OAwt2-f0",
  },
  {
    id: 3,
    name: "Blue Horizon Devs",
    rating: "5.0",
    location: "Midrand, Johannesburg",
    tags: ["Luxury Homes", "Green Tech"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqKyBKUY_5jTa3wgVOTWaWFP8yGLg57PhCncGcvqFcfBTBDcftEvrODbxgDZebKNF2v0ma6NVtfcGXJ84T1WgvKiobp7A1fmt7RYKr7S5Bh9kwDj96VYp-bJuBjWD-D94yiaRjse_9gUKEaNfc5jUjh5jaBCitcoOtHEJgNBDy69Zn7vMwcuN8-UgdCDz0QhhhQnuBhridoXjUiuBlIZHvyDFlkXPB2zSViVoHT0hN1aF1Bi0_-B7iLv_6n3YdN9pX_oe1X7EBrfQ",
  },
  {
    id: 4,
    name: "Urban Core Interiors",
    rating: "4.6",
    location: "Randburg, Johannesburg",
    tags: ["Interior Fit-out", "Renovation"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8R4ng0hGaGDTzAL8BbIX_i-4ONHq1xA1l8CHHMVD_dscmkcSefX_ISB5ZZ6WB05X_Z7Z6H50lrOfolB0Nr9VJo2xl4a16SkVPO-tGrDakyWUr6K_SZbImh4eTTKiyugQLnivYXAYXOnxcdRsIahJ69HUqncunXXpsgoQKW8hRTqKdNSSELqvblKQ3GCLv4hZ9NRJcuOkZlGGvWOH_C41E8ix4ULlo8jlO5hhyEv2wVDgR4WvL7Pp7MDPaR2mwI-izaXrrPMZBQ8",
  },
];

function BuilderCard({ builder }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all group" style={{ boxShadow: "0 4px 4px 0 rgba(0,0,0,0.02)" }}>
      <div className="relative h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={builder.img}
          alt={builder.name}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
          <span className="material-symbols-outlined text-safety-green text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
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
            <span key={tag} className="bg-surface-container-high px-2 py-1 rounded text-label-sm font-label-sm text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="flex-grow bg-[#C4622D] text-white py-3 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">
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

export default function QubrixBuilderDirectory() {

  return (
    <>
      <style>{`
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Hanken Grotesk', sans-serif; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
      <div className="bg-background text-on-background min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="bg-surface-bright shadow-sm sticky top-0 z-50">
          <nav className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
            <div className="flex items-center gap-8">
              <a className="text-headline-md font-headline-md font-bold text-primary" href="#">Qubrix</a>
              <div className="hidden md:flex items-center gap-6">
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Dashboard</a>
                <a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1 transition-colors duration-200" href="#">Find Builders</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">My Quotes</a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Documents</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block relative">
                <input
                  className="bg-surface-container-low border-none rounded-full px-4 py-2 text-body-md focus:ring-2 focus:ring-primary w-64 transition-all"
                  placeholder="Search builders..."
                  type="text"
                />
                <span className="material-symbols-outlined absolute right-3 top-2 text-outline">search</span>
              </div>
              <button className="bg-[#C4622D] text-white px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary transition-all active:scale-95 duration-150">
                Get Quote
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-variant">
                <img
                  alt="User profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwdnqiFNqgZO8qovG9OusQbUZCF3BhxN_gI8xlBGZBstDukvCAzF_9ZC8InUQ-Zcw7c8XL-aa-HSFw36WOp-RbDTEIvPUwRDxe0gpUO7unFKG4okHbtANBJhP6u20SSh50rt8Hh4-vYVG668LEKTSwtDMlf-xjcY1jDsZRi5GMZigaxH4_LeBrqDfTEivRshc4UWoqbaFEZPFCwsHgxdkvjZ-EZR4AK6S_4459x2qyy3OOAqS971FaYT25Rr1pGOMblIfEr_5Kr9M"
                />
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-gutter">
            {/* Filter Sidebar */}
            <aside className="w-full md:w-72 flex-shrink-0 space-y-8">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30" style={{ boxShadow: "0 4px 4px 0 rgba(0,0,0,0.02)" }}>
                <h2 className="font-headline-md text-headline-md mb-6 text-primary">Filters</h2>

                {/* Region */}
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

                {/* Specialization */}
                <div className="mb-8">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block mb-4">Specialization</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-bright text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all">Roofing</button>
                    <button className="px-3 py-1.5 rounded-full border border-primary bg-primary-container text-on-primary-container text-label-sm font-label-sm transition-all">Full Renovation</button>
                    <button className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-bright text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all">Plumbing</button>
                    <button className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-bright text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all">Interior Design</button>
                    <button className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-bright text-label-sm font-label-sm hover:border-primary hover:text-primary transition-all">Solar Install</button>
                  </div>
                </div>

                {/* NHBRC Status */}
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

            {/* Main Content */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-primary">Verified Builders</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">Showing 12 contractors in Johannesburg, Gauteng</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-surface-container-low p-1 rounded-lg">
                  <button className="p-2 bg-white rounded-md shadow-sm text-primary">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 text-outline hover:text-primary">
                    <span className="material-symbols-outlined">list</span>
                  </button>
                </div>
              </div>

              {/* Builder Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {BUILDERS.map((builder) => (
                  <BuilderCard key={builder.id} builder={builder} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-md text-label-md ${page === 1 ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all"}`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-2 text-outline">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all font-label-md text-label-md">
                  12
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-on-primary py-12">
          <div className="w-full px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-on-primary">Qubrix</h2>
              <p className="font-body-md text-body-md text-primary-fixed/80">
                Connecting South African homeowners with the most reliable, NHBRC verified contractors.
              </p>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-secondary-container mb-4 uppercase tracking-widest">Platform</h4>
              <ul className="space-y-2">
                {["Builder Directory", "Bank Finance Guide", "Contract Templates"].map((item) => (
                  <li key={item}><a className="font-body-md text-body-md text-primary-fixed/80 hover:text-white transition-colors" href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-secondary-container mb-4 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Safety Standards"].map((item) => (
                  <li key={item}><a className="font-body-md text-body-md text-primary-fixed/80 hover:text-white transition-colors" href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-secondary-container mb-4 uppercase tracking-widest">Support</h4>
              <ul className="space-y-2">
                {["Contact Support", "Help Center"].map((item) => (
                  <li key={item}><a className="font-body-md text-body-md text-primary-fixed/80 hover:text-white transition-colors" href="#">{item}</a></li>
                ))}
                <li className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-safety-green"></span>
                  <span className="font-label-sm text-label-sm">NHBRC Partnership Active</span>
                </li>
              </ul>
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
            { icon: "verified", label: "Builders", active: true },
            { icon: "request_quote", label: "Quotes" },
            { icon: "person", label: "Profile" },
          ].map(({ icon, label, active }) => (
            <a
              key={label}
              className={`flex flex-col items-center justify-center p-2 ${active ? "text-secondary bg-secondary-container/10 rounded-xl" : "text-on-surface-variant"}`}
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
