import ProductManager from "./ProductManager";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProductsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/pos");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Product Management
          </h1>

          <p className="mt-2 text-gray-400">
            Add, edit, and manage products and inventory.
          </p>
        </div>

        <ProductManager />
      </div>
    </main>
  );
}