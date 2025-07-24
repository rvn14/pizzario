"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Scene from "@/components/Scene";
import { TransitionLink } from "@/components/utils/TransitionLink";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Here you would normally have authentication logic
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (res.status !== 200) {
        throw new Error("Login failed");
      }
      console.log("Login attempted with:", email, password);
      
      // Simulate authentication success
      setTimeout(() => {
        router.push("/"); // Redirect after successful login
        setIsLoading(false);
      }, 1000);
    } catch (err) {
        console.log("Login error:", err);
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
    }
  };

  return (
    <div className="justify-center items-center h-screen bg-primary grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-16">
      <div className="h-screen order-2 hidden md:block">
        <Suspense>
          <Scene rotateX={3} />
        </Suspense>
      </div>
      <div className="flex items-center justify-center h-screen order-1 text-white">
        <div className="w-full max-w-md space-y-8 rounded-lg  p-8 shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-tomato">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">

              Sign in to get started with Pizzario. 
            </p>

          </div>
          
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-400">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-tomato focus:outline-none focus:ring-tomato"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-400">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-tomato focus:outline-none focus:ring-tomato"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-tomato focus:ring-tomato cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-tomato/80 hover:text-tomato">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-tomato py-2 px-4 text-sm font-medium text-white hover:bg-tomato/80 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-0 cursor-pointer"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className="text-center text-sm text-amber-50">
              <p>
                Don&apos;t have an account?{" "}
                <TransitionLink href="/signup" >
                <span className="font-medium text-tomato/80 hover:text-tomato">Register here</span>
                </TransitionLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}
