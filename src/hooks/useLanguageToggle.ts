'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export default function LanguageToggle() {
  const [lang, setLang] = useState<string>("en");
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const languages: LanguageOption[] = [
    { code: "en", name: "English", flag: "/uk.png" },
    { code: "fr", name: "French", flag: "/france.png" },
  ];

  const applyTranslation = (targetLang: string) => {
    document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${targetLang}; path=/`;

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = targetLang;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const changeLanguage = (targetLang: string) => {
    if (lang === targetLang) {
      setOpen(false);
      return;
    }

    setLang(targetLang);
    localStorage.setItem("preferred-language", targetLang);
    setOpen(false);

    applyTranslation(targetLang);
    window.location.reload();
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") || "en";
    setLang(savedLang);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return React.createElement(
    "div",
    { className: "relative inline-block text-left", ref: dropdownRef },
    React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className:
          "flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-gray-300 transition-all cursor-pointer shadow-sm text-sm font-medium",
      },
      React.createElement(Image, {
        src: currentLang.flag,
        alt: currentLang.name,
        width: 20,
        height: 20,
        className: "w-5 h-5 rounded-full object-cover shrink-0",
      }),
      React.createElement("span", null, currentLang.name),
      React.createElement(ChevronDown, {
        className: "w-4 h-4 text-gray-400 shrink-0",
      })
    ),
    open &&
      React.createElement(
        "div",
        {
          className:
            "absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1",
        },
        ...languages.map((item) =>
          React.createElement(
            "button",
            {
              key: item.code,
              type: "button",
              onClick: () => changeLanguage(item.code),
              className:
                lang === item.code
                  ? "flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors bg-blue-50 text-blue-600 dark:bg-gray-700/50 dark:text-blue-400"
                  : "flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30",
            },
            React.createElement(Image, {
              src: item.flag,
              alt: item.name,
              width: 20,
              height: 20,
              className: "w-5 h-5 rounded-full object-cover shrink-0",
            }),
            React.createElement("span", null, item.name)
          )
        )
      )
  );
}