"use client";

import { useState } from "react";

interface TransferFormData {
  from: string;
  to: string;
  amount: number | string;
  currency: string;
  convertedAmount: number | string;
  targetCurrency: string;
  recipientName: string;
  recipientCountry: string;
  deliveryMethod: string;
  [key: string]: unknown;
}

interface Step4SubmissionData extends TransferFormData {
  soleOwner: "yes" | "no" | null;
  firstTransaction: "yes" | "no" | null;
  agree: boolean;
}

interface Step4Props {
  formData: TransferFormData;
  onPrev: () => void;
  onSubmit: (data: Step4SubmissionData) => void;
}

export default function Step4({ formData, onPrev, onSubmit }: Step4Props) {
  const [soleOwner, setSoleOwner] = useState<"yes" | "no" | null>(null);
  const [firstTransaction, setFirstTransaction] = useState<"yes" | "no" | null>(null);
  const [agree, setAgree] = useState(false);

  const handleSubmit = () => {
    if (!agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const finalData: Step4SubmissionData = {
      ...formData,
      soleOwner,
      firstTransaction,
      agree,
    };
    console.log("Final Submission:", finalData);
    onSubmit(finalData);
  };

  return (
    <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        Money Transfer
      </h2>

      {/* Money Info */}
      <div className="border p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Your Money Information</h3>
        <p>
          <strong>From:</strong> {formData.from}
        </p>
        <p>
          <strong>To:</strong> {formData.to}
        </p>
        <p>
          <strong>Amount to send:</strong> {formData.amount} {formData.currency}
        </p>
        <p>
          <strong>Recipient Receives:</strong> {formData.convertedAmount}{" "}
          {formData.targetCurrency}
        </p>
      </div>

      {/* Recipient Info */}
      <div className="border p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Recipient Information</h3>
        <p>
          <strong>Full Name:</strong> {formData.recipientName}
        </p>
        <p>
          <strong>Country:</strong> {formData.recipientCountry}
        </p>
        <p>
          <strong>Delivery Method:</strong> {formData.deliveryMethod}
        </p>
      </div>

      {/* Extra Questions */}
      <div>
        <p className="font-medium">Are you sole owner of the funds?</p>
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="soleOwner"
              checked={soleOwner === "yes"}
              onChange={() => setSoleOwner("yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="soleOwner"
              checked={soleOwner === "no"}
              onChange={() => setSoleOwner("no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      <div>
        <p className="font-medium">
          Is this your 1st transaction from a Swiss bank?
        </p>
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="firstTransaction"
              checked={firstTransaction === "yes"}
              onChange={() => setFirstTransaction("yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="firstTransaction"
              checked={firstTransaction === "no"}
              onChange={() => setFirstTransaction("no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span className="ml-2 text-sm text-gray-600">
          I agree and accept the terms and conditions
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
