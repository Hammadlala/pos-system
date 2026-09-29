import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const quantity = Number(body.quantity);

    if (!Number.isInteger(quantity) || quantity === 0) {
      return NextResponse.json(
        { error: "Adjustment must be a non-zero whole number." },
        { status: 400 }
      );
    }

    const product = await db.orm.public.Product
      .where({ id: productId })
      .first();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const newStock = product.stock + quantity;

    if (newStock < 0) {
      return NextResponse.json(
        { error: "Adjustment cannot make stock negative." },
        { status: 400 }
      );
    }

    const updatedProduct = await db.orm.public.Product
      .where({ id: productId })
      .update({
        stock: newStock,
      });

    await db.orm.public.InventoryTransaction.create({
      productId,
      type: "ADJUSTMENT",
      quantity,
      note: "Admin stock adjustment",
    });

    return NextResponse.json({
      message: "Stock adjusted successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Stock adjustment error:", error);

    return NextResponse.json(
      { error: "Something went wrong while adjusting stock." },
      { status: 500 }
    );
  }
}