/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signupSchema, type SignupFormData } from '@/lib//rules';
import Scene from '@/components/Scene';
import { TransitionLink } from '@/components/utils/TransitionLink';

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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
      
      // If validation passes, clear errors
      setErrors({});
      
      // Set loading state
      setIsLoading(true);
      
      // Send data to API endpoint
      const res = await axios.post('/api/auth/signup', validatedData);
      
      // Handle response - if we get here, the request was successful
      console.log('User registered successfully:', res.data);
      
      // Redirect to login page after successful signup
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
        // Handle specific axios errors with better error messages
        setServerError(
          error.response?.data?.message || 
          `Error: ${error.response?.status} - ${error.message}` || 
          'Failed to sign up'
        );
      } else {
        // Handle other errors
        setServerError(error.message || 'An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="justify-center items-center h-screen bg-primary grid grid-cols-1 md:grid-cols-2 gap-4 px-8 md:px-16 text-white">
      
      <div className='h-screen w-full bg-primary hidden md:block'>
          <Suspense>
            <Scene rotateX={-3} />
          </Suspense>
      </div>
      <div className="relative z-10 flex items-center justify-center h-screen ">
        <div className="w-full max-w-md p-8 space-y-8  rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-tomato">Create an Account</h1>
            <p className="mt-2 text-gray-300">Sign up to get started with Pizzario</p>
          </div>
          
          {serverError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {serverError}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                User Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-tomato focus:border-tomato`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-tomato focus:border-tomato`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-tomato focus:border-tomato`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-tomato focus:border-tomato`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white cursor-pointer ${isLoading ? 'bg-tomato' : 'bg-tomato hover:bg-tomato/80'} focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-white`}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-200">
              Already have an account?{' '}
              <TransitionLink href="/login" >
              <span className="font-medium text-tomato hover:text-tomato/80">
                Log in
              </span>
              </TransitionLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;