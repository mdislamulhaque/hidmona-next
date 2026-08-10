"use client";
import React, { useState } from "react";

const initialFormState = {
  type: "",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function SupportForm() {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
    setFormData(initialFormState);
  };

  return (
    <div
      id="contact"
      className="w-full mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Support Type */}
        <div>
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
            Support Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
          >
            <option value="">Select Type</option>
            <option value="general">Inactive or login</option>
            <option value="billing">Others</option>
          </select>
        </div>

        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="E.g., Thomas Edison"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@hidmona.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
              required
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+41 79 123 45 67"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Enter your subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all resize-y"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-hidmona px-6 py-3 w-full font-medium rounded-lg transition-transform active:scale-[0.99]"
        >
          Submit Now
        </button>
      </form>
    </div>
  );
}