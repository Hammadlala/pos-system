import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const orders = await db.orm.public.Order
  .include("items", (items) =>
    items.include("product")
  )
  .where({
    status: "COMPLETED",
  })
  .all();

    const totalOrders = orders.length;

    const totalSales = orders.reduce(
      (total, order) => total + Number(order.total),
      0
    );

    const itemsSold = orders.reduce(
  (total, order) =>
    total +
    order.items.reduce(
      (itemTotal, item) =>
        itemTotal + Number(item.quantity),
      0
    ),
  0
);

    const averageOrderValue =
      totalOrders > 0 ? totalSales / totalOrders : 0;
    const salesByDate: Record<string, number> = {};

for (const order of orders) {
  const date = order.createdAt
  .toString()
  .split("T")[0];

  salesByDate[date] =
    (salesByDate[date] || 0) + Number(order.total);
}

const salesOverTime = Object.entries(salesByDate)
  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
  .map(([date, sales]) => ({
    date,
    sales: Number(sales.toFixed(2)),
  }));

  const productSales: Record<
  number,
  {
  productId: number;
  productName: string;
  unitsSold: number;
  revenue: number;
}
> = {};

for (const order of orders) {
  for (const item of order.items) {
    const productId = Number(item.productId);
    const quantity = Number(item.quantity);
    const price = Number(item.price);

    if (!productSales[productId]) {
      productSales[productId] = {
  productId,
  productName: item.product.name,
  unitsSold: 0,
  revenue: 0,
};}

    productSales[productId].unitsSold += quantity;
    productSales[productId].revenue += price * quantity;
  }
}

const productAnalytics = Object.values(productSales)
  .map((product) => ({
    ...product,
    revenue: Number(product.revenue.toFixed(2)),
  }))
  .sort((a, b) => b.unitsSold - a.unitsSold);

    return NextResponse.json({
  totalSales: totalSales.toFixed(2),
  totalOrders,
  itemsSold,
  averageOrderValue: averageOrderValue.toFixed(2),
  salesOverTime,
  productAnalytics,
});

  } catch (error) {
    console.error("Analytics fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading analytics." },
      { status: 500 }
    );
  }
}