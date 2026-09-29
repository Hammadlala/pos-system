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

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    const products = await db.orm.public.Product
      .orderBy((product) => product.name.asc())
  .all();
      

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading products." },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const session = await auth();

    // Must be logged in
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    // Only admins can create products
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      name,
      category,
      price,
      stock,
      lowStockThreshold,
    } = body;

    if (
      !name ||
      !category ||
      price === undefined ||
      stock === undefined ||
      lowStockThreshold === undefined
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const productPrice = Number(price);
    const productStock = Number(stock);
    const threshold = Number(lowStockThreshold);

    if (
      Number.isNaN(productPrice) ||
      Number.isNaN(productStock) ||
      Number.isNaN(threshold)
    ) {
      return NextResponse.json(
        { error: "Price and stock values must be valid numbers." },
        { status: 400 }
      );
    }

    if (productPrice < 0 || productStock < 0 || threshold < 0) {
      return NextResponse.json(
        { error: "Values cannot be negative." },
        { status: 400 }
      );
    }

    // Find existing category
    let existingCategory = await db.orm.public.Category
      .where({
        name: category.trim(),
      })
      .first();

    // Create category if it does not exist yet
    if (!existingCategory) {
      existingCategory = await db.orm.public.Category.create({
        name: category.trim(),
      });
    }

    // Create product
    const product = await db.orm.public.Product.create({
      name: name.trim(),
      price: productPrice.toString(),
      stock: productStock,
      lowStockThreshold: threshold,
      categoryId: existingCategory.id,
    });

    return NextResponse.json(
      {
        message: "Product created successfully.",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating the product." },
      { status: 500 }
    );
  }
}