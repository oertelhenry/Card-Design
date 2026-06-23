export default function QubrixLogin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML =
      '<span class="material-symbols-outlined animate-spin">progress_activity</span> Authenticating...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }, 1500);
  };

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
      `}</style>
      <main className="min-h-screen flex flex-col md:flex-row bg-surface font-body-md text-on-surface antialiased overflow-x-hidden">
        {/* Left Side: High-Impact Hero Section */}
        <section className="relative w-full md:w-1/2 lg:w-3/5 bg-primary overflow-hidden flex flex-col p-8 md:p-margin-desktop">
          <div className="absolute inset-0 hero-pattern opacity-50"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary opacity-10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-primary-container opacity-20 rounded-full blur-[80px]"></div>

          {/* Logo */}
          <div className="relative z-10 mb-12">
            <img
              alt="Qubrix Logo"
              className="h-16 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AP1WRLsdzHC0GRzRXra2yzUox9XXtTwYgXiD3AoB2TJuyriiJVyx6AzhQYP0VsS8hvtQwhiE87lPq598dJBgGRIEysLprQrBNu6cKD4XBDLCtpp6A_wKQ2JntLY3CG3CDaahaYYjMdpEfn4tCfSItAIw4ff74GAOeJRxJVzqhuIK3Fra1ubO5aJEoW89U_HsNmfh2w7gbIo5gzttYBTPuDsUdOdRO-jn8EAiqtT1dF5nxyjPrDHc9xnMkwJEYro"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex-grow flex flex-col justify-center max-w-xl">
            <h1 className="font-display-lg text-display-lg text-on-primary mb-8 leading-tight">
              Where trusted builders meet property owners.
            </h1>
            <div className="space-y-8">
              <div className="flex gap-gutter group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center group-hover:bg-secondary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-on-primary">verified</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-primary mb-1">Verified Builders</h3>
                  <p className="text-on-primary-container text-body-md opacity-90">
                    Every contractor is vetted for NHBRC compliance and quality craftsmanship.
                  </p>
                </div>
              </div>
              <div className="flex gap-gutter group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center group-hover:bg-secondary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-on-primary">psychology</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-primary mb-1">AI-assisted Quoting</h3>
                  <p className="text-on-primary-container text-body-md opacity-90">
                    Generate accurate construction cost estimates in minutes using advanced AI.
                  </p>
                </div>
              </div>
              <div className="flex gap-gutter group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center group-hover:bg-secondary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-on-primary">account_balance</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-primary mb-1">Direct Bank Integration</h3>
                  <p className="text-on-primary-container text-body-md opacity-90">
                    Seamless financial workflows with South Africa's leading commercial banks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-12 mt-auto">
            <p className="text-label-sm text-on-primary-container opacity-60">
              © 2024 Qubrix South Africa. NHBRC Verified Partner.
            </p>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full md:w-1/2 lg:w-2/5 bg-surface flex items-center justify-center p-8 md:p-margin-desktop">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center md:text-left">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Welcome Back</h2>
              <p className="font-body-md text-on-surface-variant">Sign in to manage your construction projects.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none placeholder:text-outline/50"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">
                    Password
                  </label>
                  <a className="text-label-sm text-secondary hover:underline underline-offset-4" href="#">
                    Forgot password?
                  </a>
                </div>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none placeholder:text-outline/50"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                  id="remember"
                  type="checkbox"
                />
                <label className="text-label-md text-on-surface-variant select-none" htmlFor="remember">
                  Remember me for 30 days
                </label>
              </div>

              <button
                className="w-full bg-secondary hover:bg-secondary/90 text-on-primary font-label-md text-body-md py-4 rounded-xl shadow-lg shadow-secondary/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                type="submit"
              >
                Sign In
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-label-sm">
                <span className="bg-surface px-4 text-on-surface-variant font-medium uppercase tracking-wider">
                  Social Sign In
                </span>
              </div>
            </div>

            {/* Social Logins */}
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
                <a className="text-secondary font-bold hover:underline underline-offset-4" href="#">
                  Register
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
