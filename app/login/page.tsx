"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 border border-red-400 text-red-200 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-400 hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
