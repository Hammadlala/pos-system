"use client";

import { useState } from "react";

type ProductFormProps = {
  onProductCreated?: () => void;
};

export default function ProductForm({
  onProductCreated,
}: ProductFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      lowStockThreshold: formData.get("lowStockThreshold"),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to create product.");
        return;
      }

      setSuccess("Product created successfully.");
form.reset();
onProductCreated?.();
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Product Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Category
        </label>

        <input
          id="category"
          name="category"
          type="text"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Initial Stock
        </label>

        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="lowStockThreshold"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Low Stock Threshold
        </label>

        <input
          id="lowStockThreshold"
          name="lowStockThreshold"
          type="number"
          min="0"
          defaultValue="5"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {success && <p className="text-sm text-green-400">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </form>
  );
}