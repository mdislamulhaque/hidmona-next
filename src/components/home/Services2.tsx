'use client';

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Globe,
  ArrowLeftRight,
  Smartphone,
  Wallet,
  CreditCard,
  Zap,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

// Types Definition
interface ServiceStats {
  value: string;
  label: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  stats: ServiceStats;
}

interface GradientIconProps {
  icon: LucideIcon;
  gradient: string;
  size?: number;
}

// Motion Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Custom Gradient Icon Component
const GradientIcon: React.FC<GradientIconProps> = ({ icon: Icon, gradient, size = 26 }) => (
  <div
    className={`relative w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-md shadow-primary-600/20 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
  >
    <Icon size={size} className="text-white relative z-10" />
    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

export default function Services2() {
  const services: ServiceItem[] = [
    {
      title: "International Money Transfer",
      description:
        "Send and receive money across borders with competitive exchange rates and low fees.",
      icon: Globe,
      gradient: "bg-primary-600",
      features: ["Fast Transfer", "Low Fees", "150+ Countries"],
      stats: { value: "50M+", label: "Transactions" },
    },
    {
      title: "Cash & Account Remittances",
      description:
        "Easy cash pickup and direct bank account transfers for your convenience.",
      icon: ArrowLeftRight,
      gradient: "bg-primary-600",
      features: ["Instant Processing", "Multiple Options", "24/7 Service"],
      stats: { value: "99.9%", label: "Success Rate" },
    },
    {
      title: "Digital Banking Platform",
      description:
        "User-friendly online portal and mobile app for seamless banking experience.",
      icon: Smartphone,
      gradient: "bg-primary-600",
      features: ["Mobile App", "Web Portal", "Real-time Tracking"],
      stats: { value: "1M+", label: "Active Users" },
    },
    {
      title: "Mobile Money Transfer",
      description:
        "Transfer money directly to mobile wallets instantly and securely.",
      icon: Wallet,
      gradient: "bg-primary-600",
      features: ["Instant Transfer", "Mobile Wallets", "Secure"],
      stats: { value: "24/7", label: "Availability" },
    },
    {
      title: "Debit Card Services",
      description:
        "Issue personalized debit cards with advanced security features.",
      icon: CreditCard,
      gradient: "bg-primary-600",
      features: ["Visa/Mastercard", "Contactless", "Zero Liability"],
      stats: { value: "500K+", label: "Cards Issued" },
    },
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 overflow-hidden">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-600/10 text-primary-600 text-xs font-bold tracking-wide uppercase mb-4 border border-primary-600/20">
            <Zap size={14} className="animate-pulse" />
            Our Services
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            Premium Financial <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary-600 to-gray-800">
              Solutions For Everyone
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Experience seamless banking with our cutting-edge services designed for the modern digital era.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary-600/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex justify-between items-start mb-6">
                  <GradientIcon
                    icon={service.icon}
                    gradient={service.gradient}
                  />
                  
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200/50">
                      {service.stats.value}
                    </span>
                    <span className="block text-[11px] text-gray-400 mt-1 font-medium">
                      {service.stats.label}
                    </span>
                  </div>
                </div>

                {/* Service Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Feature Tags List */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100/80 mb-6">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                    >
                      <CheckCircle2 size={14} className="text-primary-600 mr-2 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action Link Footer */}
                <div className="flex items-center text-xs font-bold text-primary-600 group/link cursor-pointer">
                  <span>Explore Features</span>
                  <ArrowRight size={14} className="ml-1.5 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}