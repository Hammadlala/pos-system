import { auth } from "@/auth";
import { redirect } from "next/navigation";
import POSClient from "./POSClient";

export default async function POSPage() {
  const session = await auth();

  // Not logged in
  if (!session?.user) {
    redirect("/login");
  }

  return (
  <main className="min-h-screen bg-slate-950 p-6 text-white">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          POS Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome, {session.user.name}.
        </p>
      </div>

      <POSClient />
    </div>
  </main>
);
}