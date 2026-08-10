'use client';

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface FromSelectProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  countries: string[];
  label?: string;
  className?: string;
  red?: string;
}

export default function FromSelect({
  value,
  onChange,
  countries = [],
  label = "",
  className = "",
  red = "",
}: FromSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country: string) => {
    onChange({ target: { value: country } });
    setIsOpen(false);
    setSearch("");
  };

  // Close dropdown on click outside or scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handlePageScroll = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handlePageScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handlePageScroll, true);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex gap-1 justify-start items-center">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <span className={`text-red-600 ${red}`}>*</span>
      </div>
      <div
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex justify-between items-center ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || `Select ${label}`}</span>
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-primary-600"
          />
          <ul>
            {filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => handleSelect(country)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
              >
                {country}
              </li>
            ))}
            {filteredCountries.length === 0 && (
              <li className="px-3 py-2 text-gray-400 text-sm">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}