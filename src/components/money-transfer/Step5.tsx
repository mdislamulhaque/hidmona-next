'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step5FormData = {
  sendingAmount?: number | string;
  amount?: number | string;
  fromCurrency?: string;
  currency?: string;
  [key: string]: unknown;
};

type Step5Props = {
  formData: Step5FormData;
  onPrev: () => void;
};

export default function Step5({ formData, onPrev }: Step5Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  // Pay button click
  const handlePay = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all required fields.");
      return;
    }
    setShowOtpModal(true); // open OTP modal
  };

  // OTP Submit
  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }

    const paymentData = {
      ...formData,
      payment: { cardNumber, expiry, cvv },
      otp,
    };

    console.log("✅ OTP Verified, Payment Success:", paymentData);

    setShowOtpModal(false);

    // Next.js-এ ডেটা পরবর্তী পেজে পাঠানোর জন্য sessionStorage ব্যবহার করা নিরাপদ
    if (typeof window !== "undefined") {
      sessionStorage.setItem("transactionData", JSON.stringify(paymentData));
    }

    // Navigate to transaction page
    router.push("/dashboard/transaction");
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 relative mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Payment Details
      </h2>

      <p className="text-center text-lg font-medium mb-6 text-gray-700">
        Your Transaction Amount: {formData?.sendingAmount || formData?.amount || 0}{" "}
        {formData?.fromCurrency || formData?.currency || ""}
      </p>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="**** **** **** ****"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Expiration */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Expiration date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* CVV */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Security code <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="***"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handlePay}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Pay
        </button>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
              Enter OTP
            </h3>
            <input
              type="text"
              maxLength={6}
              placeholder="******"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-center text-xl tracking-widest text-gray-800"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOtpSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}