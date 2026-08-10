import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// Meta Data and Favicon
export const metadata: Metadata = {
  title: 'Hidmona',
  description: 'Hidmona Application',
  icons: {
    icon: '/FAV.png', // public/FAV.png ফোল্ডারে ছবিটি রাখবেন
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Translate Inline Function */}
        <Script id="google-translate-init" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "en",
                },
                "google_translate_element"
              );
            }
          `}
        </Script>
        
        {/* Google Translate External CDN Script */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {/* Hidden div for Google Translate */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        {/* Dynamic Page Content */}
        {children}
      </body>
    </html>
  );
}