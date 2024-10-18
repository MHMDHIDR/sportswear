"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-12 shadow-lg transform transition-transform duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul>
            <li className="flex items-center mb-2">
              <MdPhone className="mr-2" />
              <span>+123 456 7890</span>
            </li>
            <li className="flex items-center mb-2">
              <MdEmail className="mr-2" />
              <span>info@example.com</span>
            </li>
            <li className="flex items-center mb-2">
              <MdLocationOn className="mr-2" />
              <span>123 Main Street, City, Country</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Terms of Service</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
