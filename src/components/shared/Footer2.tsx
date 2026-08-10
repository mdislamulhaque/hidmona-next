'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";

const Footer2: React.FC = () => {
  return (
    <footer className="pt-24 bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              },
            },
          }}
        >
          {/* Logo & Contact */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/4"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="mb-6">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/hidmon-log.png"
                  alt="Hidmona Logo"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <ul className="mb-2 text-sm">
                <li>
                  <span className="font-semibold">Email: </span>
                  <a href="mailto:support@hidmona.ch" className="text-blue-600 hover:underline">
                    support@hidmona.ch
                  </a>
                </li>
              </ul>
              <p className="mb-4 text-sm">
                To get exclusive updates and benefits.
              </p>
              <ul className="flex flex-wrap space-x-3 text-xl">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61557692010880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/Hidmona2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    <FaXTwitter />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/hidmonafs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="http://linkedin.com/in/hidmona-financial-services-a90a09277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/41763000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                  >
                    <FaWhatsapp />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@hidmona.financial?_t=8lY3jNA27dZ&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    <FaTiktok />
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Mobile App Download */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/4"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Download Mobile App</h3>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <a
                  href="https://apps.apple.com/us/app/hidmona-money-transfer/id1629064572"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Download-Apple-Icon.png"
                    alt="App Store"
                    width={135}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
                <Image
                  src="/app-store-qr.jpg"
                  alt="App Store QR"
                  width={128}
                  height={128}
                  className="h-32 w-auto mt-2"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.mahmud.hidmona&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Download-Android-Icon.png"
                    alt="Google Play"
                    width={135}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
                <Image
                  src="/play-store-qr.jpg"
                  alt="Play Store QR"
                  width={128}
                  height={128}
                  className="h-32 w-auto mt-2"
                />
              </div>
            </div>
          </motion.div>

          {/* Useful Links */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/4"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/termsandcondition" className="hover:underline">
                  Terms and Condition
                </Link>
              </li>
              <li>
                <Link href="/cancellationandrefund" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Payment Acceptance */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/4"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold mb-4">
              Card Payment Acceptance
            </h3>
            <Image
              src="/trastpay-payment-accept.png"
              alt="Payments"
              width={300}
              height={100}
              className="max-w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="mt-10 bg-gray-200 text-center py-4 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p>
          © 2026{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Vivacom
          </Link>{" "}
          - All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer2;