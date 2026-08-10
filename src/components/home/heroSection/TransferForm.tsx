'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Flag from "react-world-flags";

// Types Definition
export interface SupportedMethod {
  id: string;
  label: string;
}

export interface Country {
  name: string;
  code: string;
  currency: string;
  supportedMethods: SupportedMethod[];
}

export interface InitialFormData {
  fromCountry?: string;
  toCountry?: string;
  deliveryMethod?: string;
  sendingAmount?: string | number;
}

export interface StepData {
  fromCountry: string;
  fromCurrency: string;
  toCountry: string;
  toCurrency: string;
  deliveryMethod: string;
  sendingAmount: number;
  receivingAmount: string;
  fee: string;
  rate: string;
}

interface TransferFormProps {
  onNext?: (data: StepData) => void;
  initialFormData?: InitialFormData;
  redirectUrl?: string; // রিডাইরেক্ট ইউআরএল কাস্টমাইজ করার জন্য (ডিফল্ট: /send-money)
}

interface FlagFormSelectProps {
  label: string;
  countries: Country[];
  selectedCountry: Country | null;
  onChange: (country: Country) => void;
}

const countries: Country[] = [
  { 
    name: "Sweden", 
    code: "SE", 
    currency: "SEK",
    supportedMethods: [{ id: "bank_transfer", label: "Bank Transfer" }]
  },
  { 
    name: "Bangladesh", 
    code: "BD", 
    currency: "BDT",
    supportedMethods: [
      { id: "bkash", label: "bKash / Nagad" },
      { id: "bank_transfer", label: "Bank Transfer" }
    ]
  },
  { 
    name: "Kenya", 
    code: "KE", 
    currency: "KES",
    supportedMethods: [
      { id: "mpesa", label: "MPESA - MMT" },
      { id: "cash_pickup", label: "Cash Pickup" }
    ]
  },
  { 
    name: "United States", 
    code: "US", 
    currency: "USD",
    supportedMethods: [{ id: "bank_transfer", label: "Bank Transfer" }]
  },
  { 
    name: "Canada", 
    code: "CA", 
    currency: "CAD",
    supportedMethods: [{ id: "bank_transfer", label: "Bank Transfer" }]
  },
  { 
    name: "United Kingdom", 
    code: "GB", 
    currency: "GBP",
    supportedMethods: [{ id: "bank_transfer", label: "Bank Transfer" }]
  },
];

const transactionFeeMap: Record<string, number> = {
  SEK: 1.5000,
  BDT: 15.00,
  USD: 5.00,
  CAD: 4.00,
  GBP: 3.00,
  KES: 100.00
};

// Form Custom Selector Component
const FlagFormSelect: React.FC<FlagFormSelectProps> = ({
  label,
  countries,
  selectedCountry,
  onChange,
}) => {
  return (
    <div className="relative border border-gray-300 rounded-lg px-4 py-2 flex items-center h-14">
      <span className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-600">
        {label}
      </span>
      <div className="flex items-center flex-grow space-x-3">
        {selectedCountry ? (
          <>
            <Flag code={selectedCountry.code} className="h-6 w-8 rounded-sm object-cover" />
            <span className="text-lg font-medium text-gray-900">{selectedCountry.name}</span>
          </>
        ) : (
          <span className="text-lg text-gray-400">Select a country</span>
        )}
      </div>

      <select
        value={selectedCountry?.name || ""}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const newCountry = countries.find((c) => c.name === e.target.value);
          if (newCountry) onChange(newCountry);
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>

      <ChevronDown className="h-5 w-5 text-gray-500 absolute right-4 pointer-events-none" />
    </div>
  );
};

export default function TransferForm({ 
  onNext, 
  initialFormData,
  redirectUrl = "/send-money" 
}: TransferFormProps) {
  const router = useRouter(); // Next.js Router for navigation

  // 1. Sending From Country
  const [fromCountry, setFromCountry] = useState<Country>(() => {
    if (initialFormData?.fromCountry) {
      return countries.find((c) => c.name === initialFormData.fromCountry) || countries[0];
    }
    return countries[0];
  });

  // 2. Receiving Country
  const [toCountry, setToCountry] = useState<Country>(() => {
    if (initialFormData?.toCountry) {
      return countries.find((c) => c.name === initialFormData.toCountry) || countries[1];
    }
    return countries[1];
  });

  // 3. Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<string>(() => {
    return initialFormData?.deliveryMethod || countries[1].supportedMethods[0].label;
  });

  // 4. Amount
  const [amount, setAmount] = useState<string>(() => {
    return initialFormData?.sendingAmount ? initialFormData.sendingAmount.toString() : "";
  });

  const [error, setError] = useState<string>("");
  const [liveRate, setLiveRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Auto-update delivery method when receiving country changes
  useEffect(() => {
    if (toCountry && toCountry.supportedMethods.length > 0) {
      const hasMatchingMethod = toCountry.supportedMethods.some(
        (m) => m.label === deliveryMethod
      );
      if (!hasMatchingMethod) {
        setDeliveryMethod(toCountry.supportedMethods[0].label);
      }
    }
  }, [toCountry, deliveryMethod]);

  // Fetch live exchange rate with AbortController
  useEffect(() => {
    const controller = new AbortController();

    const fetchLiveRate = async () => {
      if (fromCountry.currency === toCountry.currency) {
        setLiveRate(1);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${fromCountry.currency}`,
          { signal: controller.signal }
        );
        const data = await response.json();

        if (data && data.rates && data.rates[toCountry.currency]) {
          setLiveRate(data.rates[toCountry.currency]);
        } else {
          setError("Could not fetch exchange rate.");
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Network error. Failed to get live rates.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchLiveRate();

    return () => controller.abort();
  }, [fromCountry.currency, toCountry.currency]);

  // Dynamic Calculations
  const numAmount = parseFloat(amount) || 0;
  const isCalculated = numAmount > 0 && liveRate !== null;
  const transactionFee = transactionFeeMap[fromCountry.currency] ?? 0.0;
  const receivingValue = isCalculated && liveRate ? numAmount * liveRate : 0;

  const formattedReceiving = receivingValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (fromCountry.code === toCountry.code) {
      setError("From and To country cannot be the same.");
      return;
    }

    const currentStepData: StepData = {
      fromCountry: fromCountry.name,
      fromCurrency: fromCountry.currency,
      toCountry: toCountry.name,
      toCurrency: toCountry.currency,
      deliveryMethod,
      sendingAmount: numAmount,
      receivingAmount: `${formattedReceiving} ${toCountry.currency}`,
      fee: transactionFee.toFixed(2),
      rate: liveRate ? liveRate.toFixed(4) : "0.0000",
    };

    // Callback executing if provided
    if (onNext) {
      onNext(currentStepData);
    } else {
      // Direct Next.js Navigation with SessionStorage/Query Params
      if (typeof window !== "undefined") {
        sessionStorage.setItem("transferFormData", JSON.stringify(currentStepData));
      }

      const params = new URLSearchParams({
        from: currentStepData.fromCountry,
        to: currentStepData.toCountry,
        amount: currentStepData.sendingAmount.toString(),
      });

      router.push(`${redirectUrl}?${params.toString()}`);
    }
  };

  return (
    <div className="w-full bg-white p-5 md:p-6 rounded-2xl shadow-xl border border-gray-150">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* Row 1: Countries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FlagFormSelect
            label="Sending from"
            countries={countries}
            selectedCountry={fromCountry}
            onChange={(country) => setFromCountry(country)}
          />
          <FlagFormSelect
            label="Receiving in"
            countries={countries}
            selectedCountry={toCountry}
            onChange={(country) => setToCountry(country)}
          />
        </div>

        {/* Row 2: Delivery Method */}
        <div className="relative border border-gray-300 rounded-lg px-4 py-2 h-14 flex items-center">
          <span className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-600">
            Delivery Method
          </span>
          <p className="text-lg font-medium text-gray-900 flex-grow">{deliveryMethod}</p>
          <select
            value={deliveryMethod}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDeliveryMethod(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {toCountry?.supportedMethods?.map((method) => (
              <option key={method.id} value={method.label}>
                {method.label}
              </option>
            ))}
          </select>
          <ChevronDown className="h-5 w-5 text-gray-500 pointer-events-none" />
        </div>

        {/* Row 3: Amounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative border border-gray-300 rounded-lg px-4 py-2 flex items-center h-14">
            <span className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-600">
              You will send
            </span>
            <div className="flex items-center flex-grow space-x-2">
              <Flag code={fromCountry?.code} className="h-5 w-7 rounded-sm object-cover" />
              <span className="text-lg font-medium text-gray-600">{fromCountry?.currency}</span>
              <input
                type="text"
                value={amount}
                placeholder="0.00"
                onChange={handleAmountChange}
                className="text-lg font-medium text-gray-900 flex-grow text-right pr-2 outline-none w-full"
              />
            </div>
          </div>

          <div className="relative border border-gray-300 rounded-lg px-4 py-2 h-14 flex items-center bg-gray-50">
            <span className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-600">
              Recipient will receive
            </span>
            <div className="flex items-center flex-grow space-x-2">
              <Flag code={toCountry?.code} className="h-5 w-7 rounded-sm object-cover" />
              <span className="text-lg font-medium text-gray-600">{toCountry?.currency}</span>
              <input
                type="text"
                value={isCalculated ? formattedReceiving : ""}
                disabled
                placeholder={loading ? "Loading..." : "0.00"}
                className="text-lg font-medium text-gray-900 flex-grow text-right outline-none w-full disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Calculations Box */}
        {isCalculated && !loading && liveRate && (
          <div className="p-4 border border-gray-300 rounded-xl bg-white space-y-2 text-sm text-gray-900 font-sans">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Our rate:</span>
              <span className="font-medium text-gray-900">
                1.0000 {fromCountry.currency} = {liveRate.toFixed(4)} {toCountry.currency}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Transaction Fee:</span>
              <span className="font-medium text-gray-900">
                {transactionFee.toFixed(2)} {fromCountry?.currency}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Market FX:</span>
              <span className="font-medium text-gray-900">{liveRate.toFixed(4)}</span>
            </div>
            <hr className="border-gray-200 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-gray-700">You'll be sending</span>
              <span className="font-medium text-gray-900">
                {numAmount.toFixed(2)} {fromCountry.currency}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">They will receive</span>
              <span className="font-semibold text-lg text-gray-900">
                {formattedReceiving} {toCountry.currency}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-xs font-medium text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full btn-hidmona text-white font-medium py-3 px-6  flex items-center justify-center text-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!amount || numAmount <= 0 || loading}
        >
          {loading ? "Fetching live rates..." : "Send Now"}
        </button>
      </form>
    </div>
  );
}