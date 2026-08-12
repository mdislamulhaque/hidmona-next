import Link from "next/link";
import { CreditCard, ArrowRight, ShieldCheck, Globe2, Zap } from "lucide-react";

export default function DebitCard() {
  const highlights = [
    { icon: Globe2, text: "Accepted worldwide at millions of locations" },
    { icon: Zap, text: "Instant ATM withdrawals & contactless payments" },
    { icon: ShieldCheck, text: "Enhanced security & zero liability protection" },
  ];

  return (
    <section className="relative w-full min-h-[550px] lg:min-h-screen bg-[url('/debitCardIntro.jpg')] bg-cover bg-center bg-no-repeat flex items-center overflow-hidden">
      {/* Multi-layered Vignette & Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/85 lg:to-black/75 z-0" />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0" />

      {/* Decorative Glow Orb */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/15 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row justify-end items-center">
          {/* Frosted Glass Content Block (Right Aligned on Large Screens) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
              
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs font-bold tracking-wider uppercase">
                <CreditCard className="w-4 h-4 text-primary-400" />
                <span>Next-Gen Financial Freedom</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight">
                Introducing{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-primary-400">
                  Hidmona Debit Card
                </span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Widely accepted, faster money services, and a convenient way for
                withdrawing cash from ATMs anywhere across the globe.
              </p>

              {/* Key Highlights List */}
              <div className="space-y-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 text-sm sm:text-base text-gray-200">
                      <div className="w-7 h-7 rounded-lg bg-primary-600/30 border border-primary-500/40 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary-300" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>

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
        </div>
      </div>
    </section>
  );
}