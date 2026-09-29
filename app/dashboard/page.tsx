import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AnalyticsCards from "./AnalyticsCards";

export default async function DashboardPage() {
  const session = await auth();

  // Not logged in
  if (!session?.user) {
    redirect("/login");
  }

  // Logged in but not an admin
  if (session.user.role !== "ADMIN") {
    redirect("/pos");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
     <div className="mx-auto w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-4">
          Admin Dashboard
        </h1>
        <a
  href="/dashboard/products"
  className="mt-6 inline-block rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-600"
>
  Manage Products
</a>
<a
  href="/dashboard/sales"
  className="ml-4 mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
>
  Sales History
</a>
        <p className="text-gray-400">
          Login successful. Welcome to the admin dashboard.
        </p>

        <AnalyticsCards />
      </div>
    </main>
  );
}