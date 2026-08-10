"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  Calendar,
} from "lucide-react";

// নোট: আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী FromSelect এবং useTitle ইমপোর্ট করুন
import FromSelect from "@/components/home/heroSection/FormSelect";
// import useTitle from "@/hook/UseTitle"; // Next.js-এ পেজ টাইটেল দিতে layout.tsx বা metadata ব্যবহার করা ভালো

const countriesList = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "India",
  "Brazil",
  "Mexico",
];

const Signup = () => {
  // Next.js App Router-এর জন্য useRouter
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.country) newErrors.country = "Country is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // ডিজাইন মোডের জন্য ১ সেকেন্ডের লোডিং দেখাবে এবং তারপর /login পেজে রিডাইরেক্ট করবে
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully! (Design Mode)");
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join thousands of users sending money worldwide
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <div className="flex gap-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-0 focus:border-0 transition-colors ${
                    errors.fullName
                      ? "border-red-300 focus:border-red-600"
                      : "border-gray-300 focus:border-primary-600"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="flex gap-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-0 focus:ring-primary-600 outline-0 transition-colors ${
                    errors.email
                      ? "border-red-300 focus:border-red-600"
                      : "border-gray-300 focus:border-primary-600"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <div className="flex gap-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-0 outline-0 focus:ring-primary-600 transition-colors ${
                    errors.phone
                      ? "border-red-300 focus:border-red-600"
                      : "border-gray-300 focus:border-primary-600"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <div className="flex gap-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-0 outline-0 focus:ring-primary-600 transition-colors ${
                    errors.dob
                      ? "border-red-300 focus:border-red-600"
                      : "border-gray-300 focus:border-primary-600"
                  }`}
                />
              </div>
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
              )}
            </div>

            {/* Country */}
            <div className="md:col-span-2">
              <FromSelect
                value={formData.country}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange({
                    target: { name: "country", value: e.target.value },
                  } as unknown as React.ChangeEvent<HTMLInputElement>)
                }
                countries={countriesList}
                label="Country"
                className="py-2 text-gray-700"
                red="text-red-500 block"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex gap-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:border-0 focus:ring-primary-600 outline-0 transition-colors ${
                    errors.password
                      ? "border-red-300 focus:border-red-600"
                      : "border-gray-300 focus:border-primary-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex gap-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:border-0 focus:ring-primary-600 outline-0 transition-colors ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-600"
                      : "border-gray-300 focus:border-primary-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Submit */}
            <div className="md:col-span-2">
              <div className="flex items-start mb-4">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary-600 hover:text-primary-600 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-600 hover:text-primary-600 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 btn-hidmona cursor-pointer rounded-lg font-medium transition-colors ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Create Account</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-600 transition-colors"
              >
                Go to Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;