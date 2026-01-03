"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Join us and start your journey
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
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded-lg bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}