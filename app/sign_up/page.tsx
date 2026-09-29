"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to create account.");
        return;
      }

      router.push("/login");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold">
            POS<span className="text-indigo-400">System</span>
          </a>

          <h1 className="text-3xl font-bold mt-8 mb-2">
            Create Your Account
          </h1>

          <p className="text-gray-400">
            Sign up to get started with POS System
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
        <label
         htmlFor="name"
         className="block text-sm font-medium text-gray-300 mb-2"
     >
        Name
        </label>

      <input
       id="name"
       name="name"
       type="text"
       placeholder="Enter your name"
       required
       className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
        </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
{error && (
  <p className="text-sm text-red-400">
    {error}
  </p>
)}
            {/* Sign Up Button */}
           <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Creating Account..." : "Sign Up"}
</button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Login
            </a>
          </p>
        </div>

        {/* Back Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-300"
          >
            ← Back to Home
          </a>
        </div>

      </div>
    </main>
  );
}