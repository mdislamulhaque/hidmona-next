'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Smartphone } from "lucide-react";

export default function LoginPage() {
  // Client component-এ টাইটেল সেট করা
  useEffect(() => {
    document.title = "Hidmona | Login";
  }, []);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpMethod, setOtpMethod] = useState("email");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!otpMethod) {
      setErrorMsg("Please select SMS or Email for OTP verification");
      return;
    }

    setIsLoading(true);

    // LocalStorage নিরাপদভাবে ব্রাউজারে সেট করা (SSR Safe)
    if (typeof window !== "undefined") {
      localStorage.setItem("otpMethod", otpMethod);
      localStorage.setItem("userEmail", formData.email);
    }

    // Next.js Router দিয়ে রিডাইরেক্ট
    setTimeout(() => {
      setIsLoading(false);
      router.push("/otp");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account & services
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {errorMsg && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition duration-200"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-11 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* OTP Verification Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receive OTP via
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOtpMethod("email")}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition duration-200 ${
                    otpMethod === "email"
                      ? "border-primary-600 bg-primary-50 text-primary-600"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  <span>Email OTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOtpMethod("sms")}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition duration-200 ${
                    otpMethod === "sms"
                      ? "border-primary-600 bg-primary-50 text-primary-600"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>SMS OTP</span>
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-xl font-medium text-white transition duration-200 shadow-md flex items-center justify-center space-x-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 active:scale-[0.99]"
              }`}
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ShieldCheck className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-3 bg-white text-gray-500 font-medium">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link Button */}
          <div className="mt-6">
            <Link
              href="/signup"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
            >
              Create a new account
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600 inline" />
            <span>Secured with 256-bit SSL Encryption</span>
          </p>
        </div>
      </div>
    </div>
  );
}