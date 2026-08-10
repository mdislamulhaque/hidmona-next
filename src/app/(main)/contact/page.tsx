import React from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

import useTitle from "@/hooks/UseTitle";
import SupportForm from "@/components/contact/SupportForm";
import ContactCards from "@/components/contact/ContactCards";

const Contact = () => {
//   useTitle("Hidmona | Contact");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-hidmona-gradient text-white">
        {/* Background overlay with pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            We’re here to help you with any questions or support you need.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3 border border-white btn-hidmona"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@hidmona.ch"
              className="px-8 py-3 border border-white btn-hidmona"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SupportForm />

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Head Office */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Head Office
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        Konradstrasse 75, 8005 Zürich
                        <br />
                        Zürich Switzerland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a
                        href="tel:+41762320333"
                        className="text-gray-600 inline-block cursor-pointer hover:text-primary-600 transition-colors"
                      >
                        +41 76 232 03 33
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href="mailto:support@hidmona.ch"
                        className="text-gray-600 inline-block cursor-pointer hover:text-primary-600 transition-colors"
                      >
                        support@hidmona.ch
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Support */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Customer Support
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary-600" />
                      <span className="font-medium">Phone Support</span>
                    </div>
                    <span className="text-green-600 text-sm">24/7</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary-600" />
                      <span className="font-medium">Email Support</span>
                    </div>
                    <span className="text-green-600 text-sm">{"< 24hrs"}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-primary-600" />
                      <span className="font-medium">WhatsApp</span>
                    </div>
                    <span className="text-green-600 text-sm">Instant</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href="https://wa.me/+41762320333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+41762320333"
                    className="block w-full text-center border border-primary-600 text-primary-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Call Support
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ContactCards />
        </div>
      </section>
    </div>
  );
};

export default Contact;