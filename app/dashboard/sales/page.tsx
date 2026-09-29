import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SalesHistory from "./sales-history";

export default async function SalesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/pos");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Sales History
          </h1>

          <p className="mt-2 text-gray-400">
            View completed transactions and receipts.
          </p>
        </div>

        <SalesHistory />
      </div>
    </main>
  );
}