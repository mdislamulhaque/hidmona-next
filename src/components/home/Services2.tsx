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
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

const floatingVariants: Variants = {
  float: {
    y: [-8, 8, -8],
    transition: {
      duration: 3,
      repeat: Infinity, // Fixed: Smooth infinite floating
      ease: "easeInOut",
    },
  },
};

// Custom Icon Component with gradient support
const GradientIcon: React.FC<GradientIconProps> = ({ icon: Icon, gradient, size = 24 }) => (
  <div
    className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center shadow-lg mb-4`}
  >
    <Icon size={size} className="text-white" />
  </div>
);

export default function Services2() {
  const services: ServiceItem[] = [
    {
      title: "International Money Transfer",
      description:
        "Send and receive money across borders with competitive exchange rates and low fees.",
      icon: Globe,
      gradient: "bg-hidmona-gradient",
      features: ["Fast Transfer", "Low Fees", "150+ Countries"],
      stats: { value: "50M+", label: "Transactions" },
    },
    {
      title: "Cash and Account Remittances",
      description:
        "Easy cash pickup and direct bank account transfers for your convenience.",
      icon: ArrowLeftRight,
      gradient: "bg-hidmona-gradient",
      features: ["Instant Processing", "Multiple Options", "24/7 Service"],
      stats: { value: "99.9%", label: "Success Rate" },
    },
    {
      title: "Digital Banking Platform",
      description:
        "User-friendly online portal and mobile app for seamless banking experience.",
      icon: Smartphone,
      gradient: "bg-hidmona-gradient",
      features: ["Mobile App", "Web Portal", "Real-time Tracking"],
      stats: { value: "1M+", label: "Active Users" },
    },
    {
      title: "Mobile Money Transfer",
      description:
        "Transfer money directly to mobile wallets instantly and securely.",
      icon: Wallet,
      gradient: "bg-hidmona-gradient",
      features: ["Instant Transfer", "Mobile Wallets", "Secure"],
      stats: { value: "24/7", label: "Availability" },
    },
    {
      title: "Debit Card Services",
      description:
        "Issue personalized debit cards with advanced security features.",
      icon: CreditCard,
      gradient: "bg-hidmona-gradient",
      features: ["Visa/Mastercard", "Contactless", "Zero Liability"],
      stats: { value: "500K+", label: "Cards Issued" },
    },
  ];

  return (
    <motion.section
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-pink-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center px-4 py-2 bg-blue-600/10 text-blue-600 text-primary-600 rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <Zap size={16} className="mr-2 text-primary-600" />
            Our Services
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Premium Financial Solutions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience seamless banking with our cutting-edge services designed
            for the modern world
          </p>
        </motion.div>

        {/* Services Cards Container */}
        <motion.div
          className="relative"
          variants={floatingVariants}
          animate="float"
        >
          {/* Responsive Grid System */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group relative h-full"
                variants={cardVariants}
                custom={i}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 h-full hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Icon & Stat */}
                    <div className="flex justify-between items-start mb-4">
                      <GradientIcon
                        icon={service.icon}
                        gradient={service.gradient}
                        size={28}
                      />
                      <motion.span
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.stats.value}
                      </motion.span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mt-auto">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-2 h-2 bg-hidmona-gradient rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}