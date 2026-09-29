"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setLoading(true);

  const formData = new FormData(event.currentTarget);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    const session = await getSession();

if (session?.user?.role === "ADMIN") {
  router.push("/dashboard");
} else {
  router.push("/pos");
}

router.refresh();
  } catch {
    setError("Something went wrong while logging in.");
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
            Welcome Back
          </h1>

          <p className="text-gray-400">
            Login to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {error && (
  <p className="text-sm text-red-400">
    {error}
  </p>
)}
            
             <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Logging in..." : "Login"}
</button>

          </form>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <a
              href="/sign_up"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
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