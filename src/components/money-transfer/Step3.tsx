"use client";
import { useState } from "react";

interface Step3Props {
  onNext: (data: { sendingPurpose: string }) => void;
  onPrev: () => void;
}

export default function Step3({ onNext, onPrev }: Step3Props) {
  // demo purposes – you can load from API later
  const purposes = [
    { id: 1, label: "Family Support" },
    { id: 2, label: "Business Payment" },
    { id: 3, label: "Education Expense" },
    { id: 4, label: "Gift" },
    { id: 5, label: "Other" },
  ];

  const [purpose, setPurpose] = useState("");

  const handleNext = () => {
    if (!purpose) return;
    onNext({ sendingPurpose: purpose });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">
        Money Transfer
      </h2>

      {/* Sending Purpose */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Sending Purpose</label>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full border rounded px-4 py-2"
        >
          <option value="">Select Purpose</option>
          {purposes.map((p) => (
            <option key={p.id} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!purpose}
          className={`px-4 py-2 rounded text-white font-medium transition 
            ${
              purpose
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
