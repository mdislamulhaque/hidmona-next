'use client';

import React, { useEffect, useState } from "react";

export default function Transaction() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    // Client-side এ sessionStorage থেকে ডেটা নেওয়া
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("transactionData");
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (error) {
          console.error("Failed to parse transaction data:", error);
        }
      }
      // Hydration Error এড়াতে Transaction ID ক্লায়েন্টে জেনারেট করা হলো
      setTransactionId(`TXN${Date.now()}`);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading transaction details...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-500">
        No transaction data available
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl my-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Transaction Summary
      </h2>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Field</th>
            <th className="p-3 border">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            // যদি অবজেক্ট হয় (যেমন: payment details)
            if (typeof value === "object" && value !== null) {
              return Object.entries(value).map(([subKey, subValue]) => (
                <tr key={`${key}-${subKey}`}>
                  <td className="p-3 border font-medium capitalize text-gray-700">
                    {key} ({subKey})
                  </td>
                  <td className="p-3 border text-gray-800">
                    {String(subValue)}
                  </td>
                </tr>
              ));
            }

            return (
              <tr key={key}>
                <td className="p-3 border font-medium capitalize text-gray-700">
                  {key}
                </td>
                <td className="p-3 border text-gray-800">{String(value)}</td>
              </tr>
            );
          })}
          <tr>
            <td className="p-3 border font-medium text-gray-700">
              Transaction ID
            </td>
            <td className="p-3 border text-gray-800 font-semibold">
              {transactionId}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}