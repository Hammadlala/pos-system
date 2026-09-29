export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <a href="/" className="text-2xl font-bold tracking-tight">
            POS<span className="text-indigo-400">System</span>
          </a>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-gray-300 transition hover:text-white"
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
              className="text-indigo-400 transition hover:text-indigo-300"
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

      {/* About Hero */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            About POS System
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Making Business
            <span className="block text-indigo-400">
              Simpler and Smarter
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
            POS System is designed to help businesses manage their daily
            operations through a simple, reliable and efficient point-of-sale
            platform.
          </p>

        </div>
      </section>

      {/* Who We Are */}
      <section className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">

          <div>
            <h2 className="mb-6 text-3xl font-bold">
              Who We Are
            </h2>

            <p className="mb-5 leading-7 text-gray-400">
              We believe that managing a business should not be complicated.
              Our POS system brings essential business operations together in
              one centralized platform.
            
            0.</p>

            <p className="leading-7 text-gray-400">
              From processing sales to managing inventory and monitoring
              performance, our goal is to provide businesses with the tools
              they need to operate efficiently and make better decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">
            <div className="mb-6 text-5xl">
              🏪
            </div>

            <h3 className="mb-3 text-2xl font-semibold">
              One Platform
            </h3>

            <p className="leading-7 text-gray-400">
              Sales, products, inventory and business insights — all managed
              from one convenient system.
            </p>
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Mission */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl">
                🎯
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Our Mission
              </h2>

              <p className="leading-7 text-gray-400">
                To provide businesses with an accessible and efficient POS
                solution that simplifies everyday operations and improves
                productivity.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="mb-5 text-4xl">
                🚀
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Our Vision
              </h2>

              <p className="leading-7 text-gray-400">
                To create a modern business management experience where
                technology makes running a business easier, faster and more
                organized.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Why Choose Us?
            </h2>

            <p className="text-gray-400">
              Built with businesses and their everyday needs in mind.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="mb-3 text-xl font-semibold">
                Simple
              </h3>

              <p className="text-gray-400">
                An intuitive interface that makes managing daily business
                activities straightforward.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="mb-3 text-xl font-semibold">
                Efficient
              </h3>

              <p className="text-gray-400">
                Streamline sales, inventory and other operations from one
                centralized platform.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="mb-3 text-xl font-semibold">
                Reliable
              </h3>

              <p className="text-gray-400">
                Designed to provide businesses with dependable tools for
                managing their everyday operations.
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
            <a href="/" className="hover:text-white">
              Home
            </a>

            <a href="/services" className="hover:text-white">
              Services
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