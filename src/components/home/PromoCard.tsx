import Link from "next/link";
import { CreditCard, ArrowRight, Sparkles } from "lucide-react";

export default function PromoCard() {
  return (
    <section className="relative w-full h-[550px] lg:h-[85vh] min-h-[500px] max-h-[800px] bg-[url('/card-promo.jpg')] bg-cover bg-top bg-no-repeat overflow-hidden flex items-center">
      {/* Multi-Layer Modern Overlay (Gradient & Vignette) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />

      {/* Decorative Light Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary-600/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase shadow-inner">
            <CreditCard className="w-4 h-4 text-primary-400" />
            <span>Hidmona Debit Card</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
            With Hidmona Debit Cards, Living Home & Abroad is{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-300 to-primary-500">
              Simplified.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
            Effortless transactions, affordable rates, and unmatched convenience worldwide.
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              href="https://dev.hidmona.ch/register"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-primary-600/30 hover:shadow-2xl hover:shadow-primary-600/50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
              <span>APPLY NOW</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}