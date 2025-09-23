/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signupSchema, type SignupFormData } from '@/lib/rules';
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { TransitionLink } from '@/components/utils/TransitionLink';
import Image from 'next/image';

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    try {
      // Validate form data against schema
      const validatedData = signupSchema.parse(formData);
      setErrors({});
      setIsLoading(true);
      // Send data to API endpoint
      const res = await axios.post('/api/auth/signup', validatedData);
      if (res.status !== 201) throw new Error('Signup failed');
      toast.success("Account created! Please login.");
      router.push('/login');
    } catch (error: any) {
      // Handle validation errors
      if (error.errors) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
          `Error: ${error.response?.status} - ${error.message}` ||
          'Failed to sign up'
        );
        toast.error(error.response?.data?.message || 'Signup failed!');
      } else {
        setServerError(error.message || 'An error occurred during signup');
        toast.error(error.message || 'Signup failed!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="hidden md:flex h-screen w-1/2 items-center justify-center relative">
        <Image src="/images/cel1.png" alt="Background" layout="fill" objectFit="cover" className="object-cover" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-zinc-900/90 rounded-2xl p-8 shadow-2xl border border-zinc-800 backdrop-blur-md">
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-extrabold font-clash-semibold text-tomato mb-1 drop-shadow">
              Create an Account
            </h1>
            <p className="text-gray-300 text-base">Sign up to get started with <span className="font-bold">Pizzario</span></p>
          </div>

          {serverError && (
            <div className="rounded-lg bg-red-100/90 border border-red-400 px-3 py-2 text-red-700 text-sm mb-4 animate-shake">
              {serverError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">User Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-zinc-800/80 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-tomato transition placeholder-gray-500`}
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-zinc-800/80 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-tomato transition placeholder-gray-500`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-zinc-800/80 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-tomato transition placeholder-gray-500 pr-12`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-tomato transition"
                  tabIndex={-1}
                >
                  {!showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPwd ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-zinc-800/80 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-tomato transition placeholder-gray-500 pr-12`}
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-tomato transition"
                  tabIndex={-1}
                >
                  {showConfirmPwd ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-md text-lg font-bold cursor-pointer bg-tomato hover:bg-tomato/90 text-white shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-tomato focus:ring-offset-2 ${isLoading ? "opacity-60" : ""}`}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div className="text-center text-sm text-zinc-200 mt-2">
              <span>
                Already have an account?{" "}
                <TransitionLink href="/login">
                  <span className="font-semibold text-tomato hover:underline">
                    Log in
                  </span>
                </TransitionLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
