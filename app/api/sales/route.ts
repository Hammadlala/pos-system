import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const orders = await db.orm.public.Order
      .include("cashier")
      .include("items", (items) =>
        items.include("product")
      )
      .orderBy((order) => order.createdAt.desc())
      .all();

   const safeOrders = orders.map((order) => {
  const { password, ...safeCashier } = order.cashier;

  return {
    ...order,
    cashier: safeCashier,
  };
});

return NextResponse.json({
  orders: safeOrders,
});
  } catch (error) {
    console.error("Sales history fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading sales history." },
      { status: 500 }
    );
  }
}