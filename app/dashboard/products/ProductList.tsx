"use client";

import { useEffect, useState } from "react";
type ProductListProps = {
  refreshKey?: number;
};
type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  lowStockThreshold: number;
  categoryId: number;
};

export default function ProductList({
  refreshKey,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [restockingProduct, setRestockingProduct] = useState<Product | null>(null);
  const [restockAmount, setRestockAmount] = useState("");
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to load products.");
          return;
        }

        setProducts(result.products);
      } catch {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [refreshKey]);

  if (loading) {
    return (
      <p className="mt-8 text-gray-400">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-8 text-red-400">
        {error}
      </p>
    );
  }
async function handleSaveChanges() {
  if (!editingProduct) {
    return;
  }

  try {
    const response = await fetch(`/api/products/${editingProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editingProduct.name,
        price: editingProduct.price,
        lowStockThreshold: editingProduct.lowStockThreshold,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Failed to update product.");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: editingProduct.name,
              price: editingProduct.price,
              lowStockThreshold: editingProduct.lowStockThreshold,
            }
          : product
      )
    );

    setEditingProduct(null);
  } catch {
    alert("Unable to connect to the server.");
  }
}
async function handleRestock() {
  if (!restockingProduct) {
    return;
  }

  const quantity = Number(restockAmount);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    alert("Please enter a valid restock quantity.");
    return;
  }

  try {
    const response = await fetch(
      `/api/products/${restockingProduct.id}/restock`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Failed to restock product.");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === restockingProduct.id
          ? {
              ...product,
              stock: product.stock + quantity,
            }
          : product
      )
    );

    setRestockingProduct(null);
    setRestockAmount("");
  } catch {
    alert("Unable to connect to the server.");
  }
}
async function handleAdjustment() {
  if (!adjustingProduct) {
    return;
  }

  const quantity = Number(adjustmentAmount);

  if (!Number.isInteger(quantity) || quantity === 0) {
    alert("Please enter a valid non-zero adjustment.");
    return;
  }

  if (adjustingProduct.stock + quantity < 0) {
    alert("Adjustment cannot make stock negative.");
    return;
  }

  try {
    const response = await fetch(
      `/api/products/${adjustingProduct.id}/adjust`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Failed to adjust stock.");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === adjustingProduct.id
          ? {
              ...product,
              stock: product.stock + quantity,
            }
          : product
      )
    );

    setAdjustingProduct(null);
    setAdjustmentAmount("");
  } catch {
    alert("Unable to connect to the server.");
  }
}
  return (
    <>
   {editingProduct && (
  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
    <h2 className="text-2xl font-bold">
      Edit Product
    </h2>

    <p className="mt-1 text-sm text-gray-400">
      Update the product information below.
    </p>

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Product Name
        </label>

        <input
          type="text"
          value={editingProduct.name}
          onChange={(event) =>
            setEditingProduct({
              ...editingProduct,
              name: event.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Price (RM)
        </label>

        <input
          type="number"
          step="0.01"
          min="0"
          value={editingProduct.price}
          onChange={(event) =>
            setEditingProduct({
              ...editingProduct,
              price: event.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Low Stock Threshold
        </label>

        <input
          type="number"
          min="0"
          value={editingProduct.lowStockThreshold}
          onChange={(event) =>
            setEditingProduct({
              ...editingProduct,
              lowStockThreshold: Number(event.target.value),
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
    </div>

    <div className="mt-6 flex gap-3">
      <button
  type="button"
  onClick={handleSaveChanges}
  className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500"
>
  Save Changes
</button>

      <button
        type="button"
        onClick={() => setEditingProduct(null)}
        className="rounded-lg bg-slate-700 px-5 py-2 font-medium hover:bg-slate-600"
      >
        Cancel
      </button>
    </div>
  </div>
)}
{restockingProduct && (
  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
    <h2 className="text-2xl font-bold">
      Restock Product
    </h2>

    <p className="mt-1 text-sm text-gray-400">
      {restockingProduct.name} currently has{" "}
      {restockingProduct.stock} units in stock.
    </p>

    <div className="mt-6 max-w-sm">
      <label className="mb-2 block text-sm text-gray-300">
        Quantity to Add
      </label>

      <input
        type="number"
        min="1"
        value={restockAmount}
        onChange={(event) => setRestockAmount(event.target.value)}
        placeholder="e.g. 20"
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-green-500"
      />
    </div>

    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={handleRestock}
        className="rounded-lg bg-green-600 px-5 py-2 font-medium hover:bg-green-500"
      >
        Confirm Restock
      </button>

      <button
        type="button"
        onClick={() => {
          setRestockingProduct(null);
          setRestockAmount("");
        }}
        className="rounded-lg bg-slate-700 px-5 py-2 font-medium hover:bg-slate-600"
      >
        Cancel
      </button>
    </div>
  </div>
)}

{adjustingProduct && (
  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
    <h2 className="text-2xl font-bold">
      Adjust Stock
    </h2>

    <p className="mt-1 text-sm text-gray-400">
      {adjustingProduct.name} currently has{" "}
      {adjustingProduct.stock} units in stock.
    </p>

    <div className="mt-6 max-w-sm">
      <label className="mb-2 block text-sm text-gray-300">
        Adjustment Amount
      </label>

      <input
        type="number"
        value={adjustmentAmount}
        onChange={(event) => setAdjustmentAmount(event.target.value)}
        placeholder="e.g. -3 or 2"
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-orange-500"
      />

      <p className="mt-2 text-xs text-gray-500">
        Use a negative number to reduce stock and a positive number to increase it.
      </p>
    </div>

    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={handleAdjustment}
        className="rounded-lg bg-orange-600 px-5 py-2 font-medium hover:bg-orange-500"
      >
        Confirm Adjustment
      </button>

      <button
        type="button"
        onClick={() => {
          setAdjustingProduct(null);
          setAdjustmentAmount("");
        }}
        className="rounded-lg bg-slate-700 px-5 py-2 font-medium hover:bg-slate-600"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold">
          Products
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-gray-400">
          No products have been added yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/60 text-sm text-gray-400">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {products.map((product) => {
                const lowStock =
                  product.stock <= product.lowStockThreshold;

                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 font-medium">
                      {product.name}
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      RM {Number(product.price).toFixed(2)}
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4">
                      {lowStock ? (
                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400">
                          Low Stock
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => setEditingProduct(product)}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
    >
      Edit
    </button>

    <button
      type="button"
       onClick={() => setRestockingProduct(product)}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-500"
    >
      Restock
    </button>
    
    <button
  type="button"
  onClick={() => setAdjustingProduct(product)}
  className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium hover:bg-orange-500"
>
  Adjust
</button>
  </div>
</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
        </div>
  </>
  );
}