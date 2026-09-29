export default async function LandingPage() {

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          {/* Logo / Brand */}
          <a href="/" className="text-2xl font-bold tracking-tight">
            POS<span className="text-indigo-400">System</span>
          </a>

          {/* Navigation Tabs */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-indigo-400 transition hover:text-indigo-300"
            >
              Home
            </a>

            <a
  href="/services"
  className="text-gray-300 transition hover:text-white"
>
  Services
</a>

            <a
              href="/about"
              className="text-gray-300 transition hover:text-white"
            >
              About Us
            </a>

            <a
              href="/contact"
              className="text-gray-300 transition hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* Login / Sign Up */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-lg px-4 py-2 font-medium text-gray-300 transition hover:bg-slate-800 hover:text-white"
            >
              Login
            </a>

            <a
              href="/sign_up"
              className="rounded-lg bg-indigo-500 px-5 py-2 font-semibold text-white transition hover:bg-indigo-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          
          <div className="mb-6 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            Simple • Fast • Reliable
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Modern Point of Sale
            <span className="block text-indigo-400">
              Made Simple
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-400">
            Manage your products, inventory, sales and customers from one
            powerful point-of-sale system designed to make everyday business
            operations easier.
          </p>

          {/* Main Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/login"
              className="rounded-lg bg-indigo-500 px-8 py-3.5 font-semibold transition hover:bg-indigo-600"
            >
              Get Started
            </a>

            <a
              href="/about"
              className="rounded-lg border border-slate-700 px-8 py-3.5 font-semibold text-gray-300 transition hover:bg-slate-900 hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Everything You Need
            </h2>

            <p className="text-gray-400">
              Manage your business from a single platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="mb-4 text-3xl">🛒</div>
              <h3 className="mb-2 text-xl font-semibold">
                Easy Checkout
              </h3>
              <p className="text-gray-400">
                Process customer orders quickly with an intuitive checkout
                experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="mb-4 text-3xl">📦</div>
              <h3 className="mb-2 text-xl font-semibold">
                Inventory Management
              </h3>
              <p className="text-gray-400">
                Keep track of your products and stock levels in real time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="mb-4 text-3xl">📊</div>
              <h3 className="mb-2 text-xl font-semibold">
                Sales Insights
              </h3>
              <p className="text-gray-400">
                Monitor sales and business performance through clear
                dashboards and reports.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <p>
            © 2026 POS System. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="/about" className="hover:text-white">
              About Us
            </a>

            <a href="/contact" className="hover:text-white">
              Contact
            </a>

            <a href="/login" className="hover:text-white">
              Login
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}