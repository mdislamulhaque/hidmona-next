import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hidmona Money Transfer",
  description: "Fast & Secure Money Transfer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Translate-এর ব্যানার ও পপআপ হাইড করার CSS */}
        <style>{`
          .goog-te-banner-frame, 
          .goog-te-menu-value, 
          .goog-te-gadget, 
          .skiptranslate, 
          .goog-te-banner, 
          .goog-te-ftab {
            display: none !important;
          }
          body { top: 0px !important; }
          .goog-te-combo { 
            display: none !important;
          }
        `}</style>
      </head>
      <body>
        {/* Google Translate Init Function */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { 
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* Google Translate External Script */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Hidden Google Translate Container */}
        <div id="google_translate_element" style={{ display: 'none' }} />

        {children}
      </body>
    </html>
  );
}