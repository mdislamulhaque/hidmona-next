'use client';

import React from "react";
import { motion, Variants } from "framer-motion";
import { CreditCard, IdCard, UserCheck, ArrowRight, Sparkles } from "lucide-react";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const steps = [
  {
    id: 1,
    stepNumber: "01",
    Icon: UserCheck,
    title: "Open Personal / Company Account",
    description:
      "Complete your signup process by opening a personal or company account with Hidmona Financial Service.",
  },
  {
    id: 2,
    stepNumber: "02",
    Icon: IdCard,
    title: "Verify Your Identity",
    description:
      "Verify your personal and/or company documents to unlock the Debit card services we offer.",
  },
  {
    id: 3,
    stepNumber: "03",
    Icon: CreditCard,
    title: "Get Your Debit Card",
    description:
      "Once you complete ID verification, apply for a debit card and it will be issued based on your country.",
  },
];

export default function CardIssue() {
  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 overflow-hidden">
      {/* Dynamic Background Blur Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-600/10 text-primary-600 text-xs font-bold tracking-wide uppercase mb-4 border border-primary-600/20">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Guide
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            Simplified Card Issuing <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary-600 to-gray-800">
              Process
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Get your debit card in three easy steps and manage your finances seamlessly.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.Icon;
            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary-600/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Glowing Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Step Header: Icon & Big Number Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary-600/10 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-inner">
                      <Icon className="w-8 h-8 transition-colors duration-300" aria-hidden="true" />
                    </div>

                    <span className="text-4xl font-black text-gray-100 group-hover:text-primary-600/20 transition-colors duration-300 select-none">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Step Flow Footer Indicator */}
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-primary-600">
                  <span>Step {step.stepNumber}</span>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="w-4 h-4 hidden md:block text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}