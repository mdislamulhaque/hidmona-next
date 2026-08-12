'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";
import { Mail, ChevronRight } from "lucide-react";

// TypeScript Interfaces
interface SocialLink {
  id: string;
  icon: IconType;
  href: string;
  hoverColor: string;
}

interface UsefulLink {
  label: string;
  href: string;
}

const Footer2: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { id: "fb", icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61557692010880", hoverColor: "hover:bg-blue-600 hover:text-white hover:border-blue-600" },
    { id: "tw", icon: FaXTwitter, href: "https://twitter.com/Hidmona2", hoverColor: "hover:bg-black hover:text-white hover:border-black" },
    { id: "insta", icon: FaInstagram, href: "https://www.instagram.com/hidmonafs", hoverColor: "hover:bg-pink-600 hover:text-white hover:border-pink-600" },
    { id: "linkedin", icon: FaLinkedinIn, href: "http://linkedin.com/in/hidmona-financial-services-a90a09277", hoverColor: "hover:bg-blue-700 hover:text-white hover:border-blue-700" },
    { id: "wa", icon: FaWhatsapp, href: "https://wa.me/41763000000", hoverColor: "hover:bg-emerald-600 hover:text-white hover:border-emerald-600" },
    { id: "tiktok", icon: FaTiktok, href: "https://www.tiktok.com/@hidmona.financial?_t=8lY3jNA27dZ&_r=1", hoverColor: "hover:bg-gray-900 hover:text-white hover:border-gray-900" },
  ];

  const usefulLinks: UsefulLink[] = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/termsandcondition" },
    { label: "Refund Policy", href: "/cancellationandrefund" },
  ];

  // Framer Motion Typed Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-white text-slate-700 pt-16 pb-6 border-t border-slate-200 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {/* Column 1: Logo & Contact */}
          <motion.div variants={itemVariants} className="space-y-5">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/hidmon-log.png"
                alt="Hidmona Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority={false}
              />
            </Link>

            <div className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors">
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-blue-600">
                <Mail className="w-4 h-4" />
              </div>
              <a href="mailto:support@hidmona.ch" className="hover:underline font-medium">
                support@hidmona.ch
              </a>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              To get exclusive updates and financial benefits directly to your inbox.
            </p>

            {/* Social Icons */}
            <div className="pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Connect With Us</p>
              <ul className="flex flex-wrap gap-2.5">
                {socialLinks.map((item: SocialLink) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Social link ${item.id}`}
                        className={`w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center text-sm transition-all duration-300 ${item.hoverColor} hover:scale-110 shadow-sm`}
                      >
                        <IconComponent />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Column 2: Mobile App Download */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Download Mobile App
            </h3>
            
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* App Store */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-2 hover:border-slate-300 transition-colors">
                <a
                  href="https://apps.apple.com/us/app/hidmona-money-transfer/id1629064572"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full transition-transform hover:scale-105"
                >
                  <Image
                    src="/Download-Apple-Icon.png"
                    alt="App Store Download Badge"
                    width={135}
                    height={48}
                    className="h-9 w-auto mx-auto object-contain"
                  />
                </a>
                <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <Image
                    src="/app-store-qr.jpg"
                    alt="App Store QR Code"
                    width={110}
                    height={110}
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
              </div>

              {/* Play Store */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-2 hover:border-slate-300 transition-colors">
                <a
                  href="https://play.google.com/store/apps/details?id=com.mahmud.hidmona&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full transition-transform hover:scale-105"
                >
                  <Image
                    src="/Download-Android-Icon.png"
                    alt="Google Play Store Badge"
                    width={135}
                    height={48}
                    className="h-9 w-auto mx-auto object-contain"
                  />
                </a>
                <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <Image
                    src="/play-store-qr.jpg"
                    alt="Play Store QR Code"
                    width={110}
                    height={110}
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Useful Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Useful Links
            </h3>
            <ul className="space-y-3 text-sm">
              {usefulLinks.map((link: UsefulLink, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Payment Acceptance */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Card Payment Acceptance
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <Image
                src="/trastpay-payment-accept.png"
                alt="Accepted Payment Methods"
                width={300}
                height={100}
                className="max-w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>© 2026 Hidmona Financial Services. All Rights Reserved.</p>
          <p>
            Powered by{" "}
            <Link href="#" className="text-blue-600 hover:underline font-semibold">
              Vivacom
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer2;