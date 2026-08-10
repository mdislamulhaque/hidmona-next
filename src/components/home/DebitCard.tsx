import Link from "next/link";

export default function DebitCard() {
  return (
    <section className="relative w-full min-h-[500px] lg:min-h-screen bg-[url('/debitCardIntro.jpg')] bg-cover bg-center bg-no-repeat flex items-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-end">
          {/* Content Block (Right Aligned on Large Screens) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
            <div className="p-4 lg:p-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Introducing Hidmona Debit Card
              </h2>
              
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Widely accepted, faster money services, and a convenient way for
                withdrawing cash from ATMs anywhere.
              </p>

              <div className="pt-2">
                <Link
                  href="https://dev.hidmona.ch/register"
                  className="inline-block px-8 py-3.5 btn-hidmona text-white font-medium  transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  APPLY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}