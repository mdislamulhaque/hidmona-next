import Link from "next/link";

export default function PromoCard() {
  return (
    <section className="relative w-full h-[500px] lg:h-screen bg-[url('/card-promo.jpg')] bg-cover bg-top bg-no-repeat">
      {/* Absolute Dark Overlay for proper coverage */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            With Hidmona DebitCards, Living home and abroad is simplified
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-normal max-w-xl mx-auto">
            Effortless transactions, affordable, and convenient.
          </p>

          <div className="pt-4">
            <Link
              href="https://dev.hidmona.ch/register"
              className="inline-flex items-center justify-center px-8 py-3.5 btn-hidmona text-white font-semibold   transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}