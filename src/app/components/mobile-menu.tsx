"use client";
import { useState } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaShoppingCart } from "react-icons/fa";

const MobileNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 w-full shadow-md">
      {/* Mobile Menu Button */}
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img
            src="https://www.almrsal.com/wp-content/uploads/2020/09/1.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <button
            className="text-white text-xl"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch />
          </button>
          <Link href="/login" className="text-white text-xl">
            Sign In
          </Link>
          <Link href="/cart" className="text-white text-xl">
            <FaShoppingCart />
          </Link>
          <button
            className="text-white text-xl"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchOpen && (
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 bg-white"
          aria-label="Search input"
          onBlur={() => setIsSearchOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 bg-gray-700 rounded-lg p-4">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <button
              className="text-white hover:text-gray-300 mb-2 text-left"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Categories
            </button>
            {isDropdownOpen && (
              <div className="bg-gray-600 rounded-md mt-2 py-2">
                <Link
                  href="/category1"
                  className="block px-4 py-2 text-white hover:bg-gray-500"
                >
                  Category 1
                </Link>
                <Link
                  href="/category2"
                  className="block px-4 py-2 text-white hover:bg-gray-500"
                >
                  Category 2
                </Link>
                <Link
                  href="/category3"
                  className="block px-4 py-2 text-white hover:bg-gray-500"
                >
                  Category 3
                </Link>
              </div>
            )}

            <Link href="/about" className="text-white hover:text-gray-300">
              About Us
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
