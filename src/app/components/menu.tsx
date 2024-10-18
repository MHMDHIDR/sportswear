"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import MobileNavbar from "./mobile-menu";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const existingCart = localStorage.getItem("cartItems");
      if (existingCart) {
        const items = JSON.parse(existingCart);
        setCartCount(
          items.reduce((total: number, item: any) => total + item.quantity, 0)
        );
      }
    };

    // Initial load
    updateCartCount();

    // Listen for cartUpdated events
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    // Clean up
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <>
      {/* Mobile view */}
      <div className='block md:hidden'>
        <MobileNavbar />
      </div>

      {/* Desktop view */}
      <div className='hidden md:block relative' style={{ zIndex: 1000 }}>
        <nav
          className='bg-gray-800 p-4 w-full shadow-lg transform transition-transform duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] relative'
          style={{ zIndex: 1000 }}
        >
          <div
            className='container mx-auto flex justify-between items-center px-4 relative'
            style={{ zIndex: 1000 }}
          >
            <Link href='/' className='flex items-center'>
              <img
                src='https://www.almrsal.com/wp-content/uploads/2020/09/1.png'
                alt='Logo'
                className='h-10 w-auto'
              />
            </Link>
            <div className='flex-1 flex items-center'>
              <div style={{ marginLeft: 50 }} className='flex space-x-6'>
                <Link href='/Home' className='text-white hover:text-gray-400'>
                  Home
                </Link>
                <div className='relative' style={{ zIndex: 1000 }}>
                  <button
                    className='text-white hover:text-gray-400 flex items-center'
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    aria-haspopup='true'
                    aria-expanded={isDropdownOpen}
                  >
                    Categories
                    <svg
                      className='w-4 h-4 ml-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div
                      className='absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 transition-opacity duration-300 ease-in-out'
                      style={{ width: 250, zIndex: 2000 }}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Link
                        href='/category1'
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                        aria-label='Category 1'
                      >
                        Category 1
                      </Link>
                      <Link
                        href='/category2'
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                        aria-label='Category 2'
                      >
                        Category 2
                      </Link>
                      <Link
                        href='/category3'
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                        aria-label='Category 3'
                      >
                        Category 3
                      </Link>
                    </div>
                  )}
                </div>
                <Link href='/about' className='text-white hover:text-gray-400'>
                  About Us
                </Link>
                <Link
                  href='/contact'
                  className='text-white hover:text-gray-400'
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='relative' style={{ zIndex: 1000 }}>
                <button
                  className='text-white hidden md:block ml-4'
                  aria-label='Search'
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <FaSearch />
                </button>
                {isSearchOpen && (
                  <input
                    type='text'
                    placeholder='Search...'
                    className='absolute right-0 top-12 mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-lg bg-white transform transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500'
                    style={{ zIndex: 2000, width: 900 }}
                    aria-label='Search Input'
                    onBlur={() => setIsSearchOpen(false)}
                  />
                )}
              </div>
              <Link href='/login' className='text-white hover:text-gray-400'>
                Sign In
              </Link>
              <Link
                href='/cart'
                className='text-white hover:text-gray-400 relative'
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
