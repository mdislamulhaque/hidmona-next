"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // যদি আগে থেকেই লগইন সফল হয়ে থাকে, তবে /login এ যাবে না
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated === "true") {
        router.push("/dashboard");
        return;
      }

      const savedMethod = localStorage.getItem("otpMethod");
      if (savedMethod) {
        setMethod(savedMethod);
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    setIsVerifying(true);

    // Simulated OTP check (Design mode)
    setTimeout(() => {
      if (otp === "123456") {
        alert("✅ Login Successful!");

        if (typeof window !== "undefined") {
          // ১. ইউজার যে লগইন করেছে তা সেভ করে রাখা
          localStorage.setItem("isAuthenticated", "true");
          // ২. OTP Method মুছে ফেলা
          localStorage.removeItem("otpMethod");
        }

        // ৩. ড্যাশবোর্ডে নিয়ে যাওয়া
        router.push("/dashboard");
      } else {
        alert("❌ Invalid OTP. Try again! (Hint: Use 123456)");
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600">
          We sent an OTP to your {method === "sms" ? "phone" : "email"}.
        </p>

        {/* OTP Input */}
        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center tracking-widest text-lg outline-none"
            placeholder="Enter 6-digit OTP"
          />

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors cursor-pointer ${
              isVerifying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => alert("📩 New OTP Sent! (Default: 123456)")}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;