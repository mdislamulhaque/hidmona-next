'use client';

import React, { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";

// Google Window Interface Extension for TS
declare global {
  interface Window {
    google?: any;
  }
}

export default function LanguageToggle() {
  const [lang, setLang] = useState<string>("en");
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // ইমেজ পাথ (ফাইলগুলো public/flags/ ফোল্ডারে রাখুন)
  const enFlag = "/uk.png";
  const frFlag = "/france.png";

  // Google Translate দিয়ে পৃষ্ঠা অনুবাদ করার ফাংশন
  const translatePage = (language: string) => {
    // Method 1: Select element ব্যবহার করে
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = language;
      const event = new Event("change", { bubbles: true });
      select.dispatchEvent(event);
      console.log("Language changed via select element");
      return;
    }

    // Method 2: Google Translate API সরাসরি ব্যবহার করে
    if (window.google && window.google.translate) {
      try {
        const translateInstance = window.google.translate.TranslateElement.getInstance();
        if (translateInstance) {
          translateInstance.translatePage(language);
          console.log("Language changed via API instance");
          return;
        }
      } catch (error) {
        console.log("API instance error:", error);
      }
    }

    // Method 3: Fallback - iframe খুঁজে পরিবর্তন করুন
    setTimeout(() => {
      const iframe = document.querySelector(".goog-te-menu-frame") as HTMLIFrameElement | null;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        const iframeSelect = iframeDoc?.querySelector("select") as HTMLSelectElement | null;
        if (iframeSelect && iframeSelect.value !== language) {
          iframeSelect.value = language;
          const iframeEvent = new Event("change", { bubbles: true });
          iframeSelect.dispatchEvent(iframeEvent);
          console.log("Language changed via iframe");
        }
      }
    }, 100);

    // Method 4: Cookie ব্যবহার করে
    document.cookie = `googtrans=/auto/${language}; path=/; max-age=31536000`;
    console.log("Language cookie set");
  };

  // ভাষা পরিবর্তনের ফাংশন
  const changeLanguage = (language: string) => {
    console.log("Changing language to:", language);
    setLang(language);
    localStorage.setItem("preferred-language", language);
    setOpen(false);
    translatePage(language);
  };

  // Google Translate লোড হয়েছে কিনা চেক করার ফাংশন
  const checkGoogleTranslateLoaded = () => {
    return document.querySelector(".goog-te-combo") !== null;
  };

  // ভাষা ইনিশিয়ালাইজেশন
  const initializeLanguage = () => {
    const savedLang = localStorage.getItem("preferred-language") || "en";
    console.log("Initializing with language:", savedLang);

    setLang(savedLang);
    setIsInitialized(true);

    const initInterval = setInterval(() => {
      if (checkGoogleTranslateLoaded()) {
        clearInterval(initInterval);
        console.log("Google Translate loaded, setting language:", savedLang);
        translatePage(savedLang);

        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
          if (select && select.value !== savedLang) {
            console.log("Language not set correctly, retrying...");
            translatePage(savedLang);
          }
        }, 500);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(initInterval);
      console.log("Google Translate loading timeout");
    }, 5000);
  };

  useEffect(() => {
    initializeLanguage();
    window.addEventListener("load", initializeLanguage);

    return () => {
      window.removeEventListener("load", initializeLanguage);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const handleLanguageChange = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (
        select &&
        select.value &&
        (select.value === "en" || select.value === "fr")
      ) {
        if (select.value !== lang) {
          console.log(
            "Detected language change from Google Translate:",
            select.value
          );
          setLang(select.value);
          localStorage.setItem("preferred-language", select.value);
        }
      }
    };

    const interval = setInterval(handleLanguageChange, 2000);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          handleLanguageChange();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [lang, isInitialized]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleScroll = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const hideWidget = () => {
      const style = document.createElement("style");
      style.textContent = `
        .goog-te-banner-frame, 
        .goog-te-menu-value, 
        .goog-te-gadget, 
        .skiptranslate, 
        .goog-te-banner, 
        .goog-te-ftab {
          display: none !important;
        }
        body { top: 0px !important; }
        .goog-te-combo { 
          opacity: 0;
          position: absolute;
          pointer-events: none;
          width: 1px;
          height: 1px;
        }
      `;
      document.head.appendChild(style);
      return style;
    };

    const styleElement = hideWidget();
    const styleInterval = setInterval(hideWidget, 1000);

    return () => {
      clearInterval(styleInterval);
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  const currentFlag = lang === "en" ? enFlag : frFlag;
  const currentText = lang === "en" ? "English" : "French";

  return React.createElement(
    "div",
    { className: "relative", ref: dropdownRef },
    React.createElement(
      "button",
      {
        onClick: () => setOpen(!open),
        className:
          "flex items-center gap-2 px-3 py-2 rounded-2xl dark:border-gray-600 hover:text-primary-600 cursor-pointer",
      },
      React.createElement("img", {
        src: currentFlag,
        alt: "flag",
        width: 20,
        height: 20,
        className: "w-5 h-5",
      }),
      React.createElement("span", { className: "text-sm font-medium" }, currentText),
      React.createElement(Globe, { size: 16 })
    ),
    open &&
      React.createElement(
        "div",
        {
          className:
            "absolute right-0 mt-3 w-36 bg-white border rounded shadow-lg z-50 text-gray-900",
        },
        React.createElement(
          "button",
          {
            onClick: () => changeLanguage("en"),
            className: `flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 ${
              lang === "en" ? "bg-blue-50 text-blue-600" : ""
            }`,
          },
          React.createElement("img", {
            src: enFlag,
            alt: "English",
            width: 20,
            height: 20,
            className: "w-5 h-5",
          }),
          "English"
        )
      )
  );
}