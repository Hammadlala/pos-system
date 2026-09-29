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

    const products = await db.orm.public.Product
      .orderBy((product) => product.name.asc())
      .all();

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error("POS product fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading products." },
      { status: 500 }
    );
  }
}