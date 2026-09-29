import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";

type CheckoutItem = {
  productId: number;
  quantity: number;
};

type CheckoutBody = {
  items: CheckoutItem[];
  paymentMethod: "CASH" | "CARD";
  amountPaid?: number;
};

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CheckoutBody;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    if (
      body.paymentMethod !== "CASH" &&
      body.paymentMethod !== "CARD"
    ) {
      return NextResponse.json(
        { error: "Invalid payment method." },
        { status: 400 }
      );
    }

    const cashier = await db.orm.public.User
      .where({
        email: session.user.email.trim().toLowerCase(),
      })
      .first();

    if (!cashier) {
      return NextResponse.json(
        { error: "Cashier account not found." },
        { status: 404 }
      );
    }

    let total = 0;

    const validatedItems: {
      productId: number;
      quantity: number;
      price: string;
      stock: number;
    }[] = [];

    for (const item of body.items) {
      if (
        !Number.isInteger(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          { error: "Invalid cart item." },
          { status: 400 }
        );
      }

      const product = await db.orm.public.Product
        .where({
          id: item.productId,
        })
        .first();

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} was not found.` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Not enough stock for ${product.name}.`,
          },
          { status: 400 }
        );
      }

      total += Number(product.price) * item.quantity;

      validatedItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price.toString(),
        stock: product.stock,
      });
    }

    let amountPaid: number | null = null;
    let change: number | null = null;

    if (body.paymentMethod === "CASH") {
      if (
        typeof body.amountPaid !== "number" ||
        Number.isNaN(body.amountPaid)
      ) {
        return NextResponse.json(
          { error: "Cash amount is required." },
          { status: 400 }
        );
      }

      if (body.amountPaid < total) {
        return NextResponse.json(
          { error: "Cash amount is less than the total." },
          { status: 400 }
        );
      }

      amountPaid = body.amountPaid;
      change = body.amountPaid - total;
    }

    const order = await db.orm.public.Order.create({
      cashierId: cashier.id,
      total: total.toFixed(2),
      paymentMethod: body.paymentMethod,
      amountPaid:
        amountPaid === null ? null : amountPaid.toFixed(2),
      change:
        change === null ? null : change.toFixed(2),
      status: "COMPLETED",
    });

    for (const item of validatedItems) {
      await db.orm.public.OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });

      await db.orm.public.Product
        .where({
          id: item.productId,
        })
        .update({
          stock: item.stock - item.quantity,
        });

      await db.orm.public.InventoryTransaction.create({
        productId: item.productId,
        type: "SALE",
        quantity: -item.quantity,
        note: `Sale order #${order.id}`,
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      total: total.toFixed(2),
      paymentMethod: body.paymentMethod,
      amountPaid:
        amountPaid === null ? null : amountPaid.toFixed(2),
      change:
        change === null ? null : change.toFixed(2),
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Something went wrong during checkout." },
      { status: 500 }
    );
  }
}