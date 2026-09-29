import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password, confirmPassword } = body;

    // Check required fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Basic password requirement
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether email already exists
  const existingUser = await db.orm.public.User
  .where({ email: normalizedEmail })
  .first();

if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // New public signups are CASHIER by default
    const user = await db.orm.public.User.create({
  name: name.trim(),
  email: normalizedEmail,
  password: hashedPassword,
  role: "CASHIER",
});

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating the account." },
      { status: 500 }
    );
  }
}