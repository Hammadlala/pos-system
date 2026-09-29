export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <a href="/" className="text-2xl font-bold tracking-tight">
            POS<span className="text-indigo-400">System</span>
          </a>

          {/* Navigation Tabs */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-gray-300 transition hover:text-white"
            >
              Home
            </a>

            <a
              href="/services"
              className="text-indigo-400 transition hover:text-indigo-300"
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
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            Our Services
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Everything You Need to
            <span className="block text-indigo-400">
              Run Your Business
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
            Our POS system brings sales, products, inventory and business
            management together in one simple platform.
          </p>

        </div>
      </section>

      {/* Services */}
      <section className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* POS & Checkout */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50">

              <div className="mb-6 text-4xl">
                🛒
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                POS & Checkout
              </h2>

              <p className="mb-5 leading-7 text-gray-400">
                Process customer orders quickly through an interactive point
                of sale interface.
              </p>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Product search and selection</li>
                <li>• Interactive shopping cart</li>
                <li>• Cash and card payments</li>
                <li>• Automatic change calculation</li>
              </ul>

            </div>

            {/* Product Management */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50">

              <div className="mb-6 text-4xl">
                🏷️
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Product Management
              </h2>

              <p className="mb-5 leading-7 text-gray-400">
                Admins can organize and maintain the products available in
                the business.
              </p>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Add and remove products</li>
                <li>• Edit product information</li>
                <li>• Manage product categories</li>
                <li>• Set and update prices</li>
              </ul>

            </div>

            {/* Inventory Management */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50">

              <div className="mb-6 text-4xl">
                📦
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Inventory Management
              </h2>

              <p className="mb-5 leading-7 text-gray-400">
                Admins can monitor and manage stock levels while completed
                sales automatically update inventory.
              </p>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Stock level monitoring</li>
                <li>• Inventory restocking</li>
                <li>• Low-stock tracking</li>
                <li>• Automatic stock deduction</li>
              </ul>

            </div>

            {/* Sales History */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50">

              <div className="mb-6 text-4xl">
                🧾
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Sales & Receipts
              </h2>

              <p className="mb-5 leading-7 text-gray-400">
                Keep a complete record of completed transactions and provide
                customers with proof of payment.
              </p>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Sales history</li>
                <li>• Transaction details</li>
                <li>• Digital receipts</li>
                <li>• Printable proof of payment</li>
              </ul>

            </div>

            {/* Dashboard */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50">

              <div className="mb-6 text-4xl">
                📊
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Business Dashboard
              </h2>

              <p className="mb-5 leading-7 text-gray-400">
                Admins can monitor business performance through an overview
                of important sales and inventory information.
              </p>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Revenue overview</li>
                <li>• Sales performance</li>
                <li>• Best-selling products</li>
                <li>• Inventory insights</li>
              </ul>

            </div>

            {/* User Roles */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50">

              <div className="mb-6 text-4xl">
                👥
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                User & Role Management
              </h2>

              <p className="mb-5 leading-7 text-gray-400">
                Control access to the system by assigning appropriate roles
                to administrators and cashiers.
              </p>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Admin accounts</li>
                <li>• Cashier accounts</li>
                <li>• Role-based access</li>
                <li>• Protected system features</li>
              </ul>

            </div>

          </div>
        </div>
      </section>

      {/* Role Explanation */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Designed Around Your Team
            </h2>

            <p className="text-gray-400">
              Different roles get access to the tools they need.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Admin */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-8">

              <div className="mb-5 text-4xl">
                👨‍💼
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                Admin
              </h3>

              <p className="mb-5 text-gray-400">
                Administrators have access to the management side of the
                system.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  Product Management
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  Inventory
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  Dashboard
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  User Management
                </div>
              </div>

            </div>

            {/* Cashier */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">

              <div className="mb-5 text-4xl">
                👨‍💻
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                Cashier
              </h3>

              <p className="mb-5 text-gray-400">
                Cashiers focus on serving customers and processing
                transactions.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  POS Checkout
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  Product Search
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  Cash Payments
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-sm text-gray-300">
                  Card Payments
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">

          <h2 className="mb-5 text-3xl font-bold">
            Ready to Get Started?
          </h2>

          <p className="mb-8 text-gray-400">
            Create an account and start managing your business with a simpler
            point-of-sale experience.
          </p>

          <a
            href="/sign_up"
            className="inline-block rounded-lg bg-indigo-500 px-8 py-3.5 font-semibold transition hover:bg-indigo-600"
          >
            Create an Account
          </a>

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