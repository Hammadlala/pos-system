"use client";

import { useEffect, useState } from "react";

type SalesItem = {
  id: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
  };
};

type Sale = {
  id: number;
  total: string;
  paymentMethod: "CASH" | "CARD";
  amountPaid: string | null;
  change: string | null;
  status: "COMPLETED" | "CANCELLED";
  createdAt: string;
  cashier: {
    id: number;
    name: string;
    email: string;
  };
  items: SalesItem[];
};

export default function SalesHistory() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  useEffect(() => {
    async function loadSales() {
      try {
        const response = await fetch("/api/sales");
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to load sales.");
          return;
        }

        setSales(result.orders);
      } catch {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-400">
        Loading sales history...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        {error}
      </p>
    );
  }

  if (sales.length === 0) {
    return (
      <p className="text-gray-400">
        No sales found.
      </p>
    );
  }

  return (
  <div className="space-y-6">
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full text-left">
        <thead className="border-b border-slate-800 bg-slate-800/50">
          <tr>
            <th className="px-4 py-3">
              Order
            </th>

            <th className="px-4 py-3">
              Date
            </th>

            <th className="px-4 py-3">
              Cashier
            </th>

            <th className="px-4 py-3">
              Items
            </th>

            <th className="px-4 py-3">
              Payment
            </th>

            <th className="px-4 py-3">
              Total
            </th>
            <th className="px-4 py-3">
              Receipt
            </th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-b border-slate-800 last:border-b-0"
            >
              <td className="px-4 py-4 font-semibold">
                #{sale.id}
              </td>

              <td className="px-4 py-4 text-gray-300">
                {new Date(sale.createdAt).toLocaleString()}
              </td>

              <td className="px-4 py-4 text-gray-300">
                {sale.cashier?.name || "Unknown"}
              </td>

              <td className="px-4 py-4 text-gray-300">
                {sale.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </td>

              <td className="px-4 py-4">
                {sale.paymentMethod}
              </td>

              <td className="px-4 py-4 font-semibold text-green-400">
                RM {Number(sale.total).toFixed(2)}
              </td>

              <td className="px-4 py-4">
                <button
                 type="button"
                 onClick={() => {
                 console.log("Selected sale:", sale);
                 setSelectedSale(sale);
                 }}
                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
                 >
                 View Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
                  </table>
    </div>

    {selectedSale && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
    <div
      id="history-receipt"
      className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-black shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Receipt
          </h2>

          <p className="text-sm text-gray-500">
            Order #{selectedSale.id}
          </p>
        </div>

        
        <div className="flex gap-2">
  <button
  type="button"
  onClick={() => {
    const receipt = document.getElementById("history-receipt");

    if (!receipt) {
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=800,height=600"
    );

    if (!printWindow) {
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - Order #${selectedSale.id}</title>

          <style>
            @page {
              size: 58mm auto;
              margin: 0;
            }

            * {
              box-sizing: border-box;
            }

            html,
            body {
              width: 58mm;
              margin: 0;
              padding: 0;
            }

            body {
              font-family: Arial, sans-serif;
              font-size: 10px;
              line-height: 1.3;
              color: #000;
            }

            #history-receipt {
              width: 48mm;
              margin: 0 auto;
              padding: 3mm 0;
              border: none !important;
              background: #fff !important;
              color: #000 !important;
              box-shadow: none !important;
            }

            #history-receipt * {
              color: #000 !important;
            }
            .center {
  text-align: center;
}

.title {
  font-size: 14px;
}

.separator {
  border-top: 1px dashed #000;
  margin: 2mm 0;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 2mm;
  margin: 1mm 0;
}

.item {
  margin: 2mm 0;
}

.item-name {
  font-weight: bold;
}

.total {
  font-size: 12px;
  font-weight: bold;
}
            button {
              display: none !important;
            }
          </style>
        </head>

        <body>
  <div id="history-receipt">
    <div class="center">
      <strong class="title">POS RECEIPT</strong>
    </div>

    <div class="separator"></div>

    <div>Order #${selectedSale.id}</div>
    <div>${new Date(selectedSale.createdAt).toLocaleString()}</div>
    <div>Cashier: ${selectedSale.cashier?.name || "Unknown"}</div>

    <div class="separator"></div>

    ${selectedSale.items
      .map(
        (item) => `
          <div class="item">
            <div class="item-name">${item.product.name}</div>

            <div class="row">
              <span>
                ${item.quantity} x RM ${Number(item.price).toFixed(2)}
              </span>

              <span>
                RM ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        `
      )
      .join("")}

    <div class="separator"></div>

    <div class="row total">
      <span>TOTAL</span>
      <span>RM ${Number(selectedSale.total).toFixed(2)}</span>
    </div>

    <div class="row">
      <span>Payment</span>
      <span>${selectedSale.paymentMethod}</span>
    </div>

    ${
      selectedSale.paymentMethod === "CASH"
        ? `
          <div class="row">
            <span>Paid</span>
            <span>RM ${Number(selectedSale.amountPaid).toFixed(2)}</span>
          </div>

          <div class="row">
            <span>Change</span>
            <span>RM ${Number(selectedSale.change).toFixed(2)}</span>
          </div>
        `
        : ""
    }

    <div class="separator"></div>

    <div class="center">
      THANK YOU!
    </div>
  </div>
</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
>
  Print Receipt
</button>

  <button
    type="button"
    onClick={() => setSelectedSale(null)}
    className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
  >
    Close
  </button>
</div>
      </div>

      <div className="mt-5 border-t border-gray-300 pt-4 text-sm">
        <p>
          Date: {new Date(selectedSale.createdAt).toLocaleString()}
        </p>

        <p>
          Cashier: {selectedSale.cashier?.name || "Unknown"}
        </p>

        <p>
          Payment: {selectedSale.paymentMethod}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {selectedSale.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-gray-200 pb-3"
          >
            <div>
              <p className="font-medium">
                {item.product.name}
              </p>

              <p className="text-sm text-gray-500">
                RM {Number(item.price).toFixed(2)} × {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              RM {(Number(item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between border-t border-gray-300 pt-4 text-xl font-bold">
        <span>Total</span>

        <span>
          RM {Number(selectedSale.total).toFixed(2)}
        </span>
      </div>

      {selectedSale.paymentMethod === "CASH" && (
        <div className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Amount Paid</span>
            <span>
              RM {Number(selectedSale.amountPaid).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Change</span>
            <span>
              RM {Number(selectedSale.change).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
)}
  </div>
);
}