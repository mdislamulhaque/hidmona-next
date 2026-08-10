'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import LanguageToggle from "@/hooks/useLanguageToggle";

interface NavItem {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Location", href: "/location" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/hidmon-log.png"
                alt="Hidmona Logo"
                width={150}
                height={48}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-red-600 border-b-2 border-red-600 font-semibold"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Controls (Auth + Quick Contact + Language) */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
            {/* Quick Contact Icons */}
            <div className="flex items-center space-x-3 pr-2 border-r border-gray-200">
              <a
                href="https://wa.me/+41762320333"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-xl transition-transform hover:scale-110"
                title="WhatsApp Support"
              >
                <FaWhatsapp />
              </a>
              <a
                href="mailto:support@hidmona.ch"
                className="text-red-600 hover:text-red-700 text-xl transition-transform hover:scale-110"
                title="Email Support"
              >
                <FaEnvelope />
              </a>
            </div>

            {/* Language Switcher */}
            <LanguageToggle />

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 pl-2">
              <Link
                href="/login"
                className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls & Hamburger */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language Toggle */}
            <LanguageToggle />

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 p-2 rounded-md focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-2">
            
            {/* Nav Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-red-600 bg-red-50 font-semibold"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Quick Contact Row */}
            <div className="flex items-center justify-around py-3 my-2 border-y border-gray-100 bg-gray-50 rounded-lg">
              <a
                href="https://wa.me/+41762320333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 font-medium text-sm"
              >
                <FaWhatsapp className="text-lg" /> WhatsApp
              </a>
              <a
                href="mailto:support@hidmona.ch"
                className="flex items-center gap-2 text-red-600 font-medium text-sm"
              >
                <FaEnvelope className="text-lg" /> Support Email
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="pt-2 space-y-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-base font-medium shadow-sm transition-colors"
              >
                Sign Up
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;