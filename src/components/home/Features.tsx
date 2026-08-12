import React from 'react';
import { Shield, Clock, Globe, TrendingUp, Sparkles } from 'lucide-react';

interface FeatureItem {
  // allow any props on the icon element so we can inject className via cloneElement
  icon: React.ReactElement<any>;
  title: string;
  description: string;
  badge?: string;
}

const features: FeatureItem[] = [
  {
    icon: <Shield className="h-6 w-6 text-primary-600" />,
    title: 'Bank-Level Security',
    description: 'Your money and personal information are protected with 256-bit SSL encryption.'
  },
  {
    icon: <Clock className="h-6 w-6 text-primary-600" />,
    title: 'Lightning Fast',
    description: 'Send money in minutes, not days. Most transfers complete within 15 minutes.'
  },
  {
    icon: <Globe className="h-6 w-6 text-primary-600" />,
    title: 'Global Network',
    description: 'Send money to over 200 countries and territories worldwide.'
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary-600" />,
    title: 'Best Exchange Rates',
    description: 'Get competitive exchange rates with transparent, low fees.'
  }
];

export default function Features() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 overflow-hidden">
      {/* Background Subtle Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-primary-600 text-xs font-semibold tracking-wide uppercase mb-4 border border-primary-600/20">
            <Sparkles className="w-3.5 h-3.5" />
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            Why should you choose <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900">
              Hidmona Money Transfer?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Trusted by millions worldwide
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Top Gradient Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Modern Icon Container */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-600/10 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  {React.cloneElement(feature.icon, {
                    className: "h-7 w-7 text-primary-600 group-hover:text-white transition-colors duration-300"
                  })}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                Learn more &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}