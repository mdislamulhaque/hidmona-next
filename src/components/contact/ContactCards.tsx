import React from "react";

const contacts = [
  {
    country: "Canada",
    phone: "+1 (343) 700-1552",
    flag: "https://flagpedia.net/data/flags/w1160/ca.webp",
  },
  {
    country: "Europe",
    phone: "+46 850 248 631",
    flag: "https://flagpedia.net/data/flags/w1160/eu.webp",
  },
  {
    country: "Switzerland",
    phone: "+41 21 539 1910",
    flag: "https://flagpedia.net/data/flags/w1160/ch.webp",
  },
  {
    country: "UK",
    phone: "+44 116 366 1004",
    flag: "https://flagpedia.net/data/flags/w1160/gb.webp",
  },
  {
    country: "USA",
    phone: "+1 (440) 597 5158",
    flag: "https://flagpedia.net/data/flags/w1160/us.webp",
  },
];

export default function ContactCards() {
  return (
    <section className="mt-16 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 tracking-tight">
          Global Contact Numbers
        </h2>
        <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
          Reach our regional support teams directly in your country
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200/80 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 h-full"
          >
            {/* Flag Image */}
            <div className="w-14 h-10 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={item.flag || "/images/default-flag.png"}
                alt={`${item.country} flag`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Contact Details */}
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {item.country}
              </h3>
              <a
                href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors inline-block mt-0.5"
              >
                {item.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}