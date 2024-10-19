"use client";

import Footer from "../components/footer";
import Navbar from "../components/menu";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData); 
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 flex items-center justify-center py-10">
        <div className="w-full max-w-2xl p-10 bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20 relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent blur-lg rounded-3xl -z-10"></div>

          <h2 className="text-4xl font-bold text-center text-white drop-shadow-md mb-6">
            Contact Us
          </h2>
          <p className="text-center text-white/80 mb-8">
            We’d love to hear from you. Fill in the form and we’ll get back to you!
          </p>

          {submitted ? (
            <div className="text-center">
              <h3 className="text-3xl text-green-300 font-semibold">Thank you!</h3>
              <p className="text-white">Your message has been successfully sent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/80"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-6 py-3 rounded-xl border-none shadow-lg focus:ring-4 focus:ring-pink-300/70 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-6 py-3 rounded-xl border-none shadow-lg focus:ring-4 focus:ring-purple-300/70 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/80"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-2 w-full px-6 py-3 rounded-xl border-none shadow-lg focus:ring-4 focus:ring-red-300/70 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 focus:ring-4 focus:ring-blue-300/70"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div style={{ margin: 50 }}></div>

        <div className="mt-12 text-center text-white">
          <h3 className="text-2xl font-semibold mb-2">Our Office</h3>
          <p>1234 Main St, City, Country 56789</p>
          <p>Email: contact@company.com | Phone: +123 456 7890</p>

          <div className="mt-8 flex justify-center space-x-6">

            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faTiktok} className="w-8 h-8 text-blue-300" />
            </a>
        
            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faFacebookF} className="w-8 h-8 text-blue-300" />
            </a>
   
            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faInstagram} className="w-8 h-8 text-blue-300" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
