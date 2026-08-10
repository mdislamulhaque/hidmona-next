'use client';

import React from "react";
import { motion } from "framer-motion";
import { CreditCard, IdCard, UserCheck } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const steps = [
  {
    id: 1,
    stepNumber: "01",
    Icon: UserCheck,
    title: "Open a Personal or Company Account",
    description:
      "Complete your signup process by opening a personal or company account with Hidmona Financial Service.",
  },
  {
    id: 2,
    stepNumber: "02",
    Icon: IdCard,
    title: "Verify your identity",
    description:
      "Verify your personal and/or company documents to unlock the Debit card services we offer.",
  },
  {
    id: 3,
    stepNumber: "03",
    Icon: CreditCard,
    title: "Apply and get your debit card",
    description:
      "Once you complete ID verification, apply for a debit card and it will be issued based on your country.",
  },
];

export default function CardIssue() {
  return (
    <section className="bg-[#fafafb] py-20 lg:py-24 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight mb-3">
            Simplified Card Issuing Process
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Get your debit card in three easy steps and manage your finances seamlessly.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between h-full relative group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <span className="text-3xl font-extrabold text-gray-200 group-hover:text-primary-200 transition-colors duration-300">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-secondary mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}