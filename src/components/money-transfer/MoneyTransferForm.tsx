'use client'; // Next.js App Router-এর Client Component

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation"; 
import { CheckCircle2 } from "lucide-react";

import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import TransferForm from "../../components/home/heroSection/TransferForm";

function MoneyTransferFormContent() {
  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({});

  // URL Query Params থেকে ডেটা পড়ার লজিক (যেমন: /transfer?fromCountry=Sweden&sendingAmount=1000)
  useEffect(() => {
    const fromCountry = searchParams.get("fromCountry");
    const toCountry = searchParams.get("toCountry");
    const sendingAmount = searchParams.get("sendingAmount");
    const fromCurrency = searchParams.get("fromCurrency");

    if (fromCountry && sendingAmount) {
      const initialData = {
        fromCountry,
        toCountry,
        sendingAmount,
        fromCurrency,
      };
      setFormData(initialData);
      setCompletedSteps([1]);
      setActiveStep(2);
    }
  }, [searchParams]);

  const handleStepComplete = (stepNumber, data) => {
    setFormData((prev) => ({ ...prev, ...data }));

    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps((prev) => [...prev, stepNumber]);
    }

    setActiveStep(stepNumber + 1);
  };

  const handleHeaderClick = (stepNumber) => {
    if (activeStep === stepNumber) {
      setActiveStep(null);
      return;
    }

    if (
      stepNumber === 1 ||
      completedSteps.includes(stepNumber - 1) ||
      stepNumber <= activeStep
    ) {
      setActiveStep(stepNumber);
    }
  };

  const renderStepHeader = (stepNumber, title, summaryText) => {
    const isActive = activeStep === stepNumber;
    const isCompleted = completedSteps.includes(stepNumber);

    return (
      <button
        type="button"
        onClick={() => handleHeaderClick(stepNumber)}
        className={`w-full flex items-center justify-between p-4 transition-all border-b border-gray-100 text-left focus:outline-none ${
          isActive
            ? "bg-blue-50 text-blue-700 font-semibold"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center space-x-3">
          {isCompleted && !isActive ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
          ) : (
            <span
              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber}
            </span>
          )}

          <div>
            <span className="text-base font-medium">{title}</span>
            {!isActive && isCompleted && summaryText && (
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                {summaryText}
              </p>
            )}
          </div>
        </div>

        {!isActive && isCompleted && (
          <span className="text-xs text-blue-600 font-medium hover:underline">
            Edit
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Money Transfer</h2>

      {/* --- STEP 1: Amount & Country --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {renderStepHeader(
          1,
          "Transfer Details",
          formData.fromCountry
            ? `${formData.fromCountry} ➔ ${formData.toCountry} (${formData.sendingAmount} ${formData.fromCurrency || ""})`
            : ""
        )}
        <div className={activeStep === 1 ? "block p-5" : "hidden"}>
          <TransferForm
            initialFormData={formData}
            onNext={(data) => handleStepComplete(1, data)}
          />
        </div>
      </div>

      {/* --- STEP 2: Recipients --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {renderStepHeader(
          2,
          "Recipient Information",
          formData.recipientName ? `Send to: ${formData.recipientName}` : ""
        )}
        <div className={activeStep === 2 ? "block p-5" : "hidden"}>
          <Step2
            formData={formData}
            onNext={(data) => handleStepComplete(2, data)}
            onPrev={() => setActiveStep(1)}
          />
        </div>
      </div>

      {/* --- STEP 3: Purpose --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {renderStepHeader(3, "Reason for Transfer", formData.reason)}
        <div className={activeStep === 3 ? "block p-5" : "hidden"}>
          <Step3
            formData={formData}
            onPrev={() => setActiveStep(2)}
            onNext={(data) => handleStepComplete(3, data)}
          />
        </div>
      </div>

      {/* --- STEP 4: Review --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {renderStepHeader(4, "Review & Confirm")}
        <div className={activeStep === 4 ? "block p-5" : "hidden"}>
          <Step4
            formData={formData}
            onPrev={() => setActiveStep(3)}
            onSubmit={(data) => handleStepComplete(4, data)}
          />
        </div>
      </div>

      {/* --- STEP 5: Payment --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {renderStepHeader(5, "Payment Method")}
        <div className={activeStep === 5 ? "block p-5" : "hidden"}>
          <Step5
            formData={formData}
            onPrev={() => setActiveStep(4)}
            onPay={(data) => {
              setFormData((prev) => ({ ...prev, ...data }));
              alert("Payment Successful!");
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Next.js-এ useSearchParams ব্যবহার করলে Suspense দিয়ে র‍্যাপ করা আবশ্যক
export default function MoneyTransferForm() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <MoneyTransferFormContent />
    </Suspense>
  );
}