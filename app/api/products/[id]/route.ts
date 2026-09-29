import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function PATCH(
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

    const {
      name,
      price,
      lowStockThreshold,
    } = body;

    if (
      !name ||
      price === undefined ||
      lowStockThreshold === undefined
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const productPrice = Number(price);
    const threshold = Number(lowStockThreshold);

    if (
      Number.isNaN(productPrice) ||
      Number.isNaN(threshold) ||
      productPrice < 0 ||
      threshold < 0
    ) {
      return NextResponse.json(
        { error: "Invalid product values." },
        { status: 400 }
      );
    }

    const product = await db.orm.public.Product
      .where({ id: productId })
      .update({
        name: name.trim(),
        price: productPrice.toString(),
        lowStockThreshold: threshold,
      });

    return NextResponse.json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Product update error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating the product." },
      { status: 500 }
    );
  }
}