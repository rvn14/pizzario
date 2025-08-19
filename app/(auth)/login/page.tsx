
"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Scene from "@/components/Scene";
import { TransitionLink } from "@/components/utils/TransitionLink";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.status !== 200) throw new Error("Login failed");
      setTimeout(() => {
        router.push("/");
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError("Invalid credentials. Please try again." + (err instanceof Error ? `: ${err.message}` : ""));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br px-4 md:px-12">
      {/* Scene/Left Side */}
      <div className="hidden md:flex h-screen w-1/2 items-center justify-center">
        <Suspense>
          <Scene rotateX={-3} />
        </Suspense>
      </div>
      {/* Form/Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-zinc-900/90 rounded-2xl p-8 shadow-2xl border border-zinc-800 backdrop-blur-md">
          <div className="mb-7 text-center">
            <h2 className="text-3xl font-extrabold font-clash-semibold text-tomato mb-1 drop-shadow">
              Sign in to your account
            </h2>
            <p className="text-gray-300 text-base">Sign in to get started with <span className="font-bold">Pizzario</span></p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-100/90 border border-red-400 px-3 py-2 text-red-700 text-sm mb-4 animate-shake">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-zinc-800/80 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-tomato transition placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-zinc-800/80 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-tomato transition placeholder-gray-500 "
                  placeholder="Your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
                
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="flex items-center text-gray-300 cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-400 text-tomato focus:ring-tomato"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <TransitionLink href="/forgot-password" className="text-tomato/80 hover:text-tomato text-sm font-medium">
                Forgot password?
              </TransitionLink>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-md text-lg font-bold bg-tomato hover:bg-tomato/90 text-white shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-tomato focus:ring-offset-2 ${isLoading ? "opacity-60" : ""}`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <div className="text-center text-sm text-zinc-200 mt-2">
              <span>
                Don&apos;t have an account?{" "}
                <TransitionLink href="/signup">
                  <span className="font-semibold text-tomato hover:underline">
                    Register here
                  </span>
                </TransitionLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
