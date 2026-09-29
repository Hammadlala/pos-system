import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "CASHIER";
  }

  interface Session {
    user: {
      role: "ADMIN" | "CASHIER";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "CASHIER";
  }
}