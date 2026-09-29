"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Analytics = {
  totalSales: string;
  totalOrders: number;
  itemsSold: number;
  averageOrderValue: string;
  salesOverTime: {
    date: string;
    sales: number;
  }[];
  productAnalytics: {
  productId: number;
  productName: string;
  unitsSold: number;
  revenue: number;
}[];
};

export default function AnalyticsCards() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [range, setRange] = useState<"7" | "30" | "all">("7");
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await fetch("/api/analytics");
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to load analytics.");
          return;
        }

        setAnalytics(result);
      } catch {
        setError("Unable to load analytics.");
      }
    }

    loadAnalytics();
  }, []);

  if (error) {
    return (
      <p className="mt-6 text-red-400">
        {error}
      </p>
    );
  }

  if (!analytics) {
    return (
      <p className="mt-6 text-gray-400">
        Loading analytics...
      </p>
    );
  }

const filteredSales = analytics.salesOverTime.filter((sale) => {
  if (range === "all") {
    return true;
  }

  const days = Number(range);

  const cutoffDate = new Date();
  cutoffDate.setHours(0, 0, 0, 0);
  cutoffDate.setDate(cutoffDate.getDate() - (days - 1));

  const saleDate = new Date(`${sale.date}T00:00:00`);

  return saleDate >= cutoffDate;
});

  return (
  <div className="mt-8">
    {/* Analytics Cards */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-gray-400">Total Sales</p>
        <p className="mt-2 text-2xl font-bold">
          RM {analytics.totalSales}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-gray-400">Total Orders</p>
        <p className="mt-2 text-2xl font-bold">
          {analytics.totalOrders}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-gray-400">Items Sold</p>
        <p className="mt-2 text-2xl font-bold">
          {analytics.itemsSold}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-gray-400">
          Average Order Value
        </p>
        <p className="mt-2 text-2xl font-bold">
          RM {analytics.averageOrderValue}
        </p>
      </div>
    </div>

    {/* Sales Over Time Chart */}
    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
  <h2 className="text-xl font-bold">
    Sales Over Time
  </h2>

  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => setRange("7")}
      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
        range === "7"
          ? "bg-indigo-500 text-white"
          : "bg-slate-800 text-gray-300 hover:bg-slate-700"
      }`}
    >
      7 Days
    </button>

    <button
      type="button"
      onClick={() => setRange("30")}
      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
        range === "30"
          ? "bg-indigo-500 text-white"
          : "bg-slate-800 text-gray-300 hover:bg-slate-700"
      }`}
    >
      30 Days
    </button>

    <button
      type="button"
      onClick={() => setRange("all")}
      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
        range === "all"
          ? "bg-indigo-500 text-white"
          : "bg-slate-800 text-gray-300 hover:bg-slate-700"
      }`}
    >
      All Time
    </button>
  </div>
 </div>

      {analytics.salesOverTime.length === 0 ? (
        <p className="text-gray-400">
          No sales data available.
        </p>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredSales}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `RM ${Number(value).toFixed(2)}`,
                  "Sales",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#818cf8"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
            )}
    </div>

    {/* Product Sales Analytics */}
    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Product Sales Analytics
      </h2>

      {analytics.productAnalytics.length === 0 ? (
        <p className="text-gray-400">
          No product sales data available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-gray-400">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Units Sold</th>
                <th className="px-4 py-3">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {analytics.productAnalytics.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b border-slate-800"
                >
                  <td className="px-4 py-3 font-medium">
                    {product.productName}
                  </td>

                  <td className="px-4 py-3">
                    {product.unitsSold}
                  </td>

                  <td className="px-4 py-3">
                    RM {product.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  </div>
);
}