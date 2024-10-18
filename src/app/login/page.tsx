"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Footer from "../components/footer";
import Navbar from "../components/menu";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleLogin = () => {
    // Dummy validation
    if (email && password) {
      alert("Logged in successfully!");
    } else {
      setErrorMessage("Please enter both email and password.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl text-center transition-transform duration-300 md:hover:scale-105">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {/* Email and Password Input */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center border-b border-gray-300 mb-4 pb-2">
              <FaUser className="text-gray-800 mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-none outline-none px-2 py-1 text-gray-800"
              />
            </div>
            <div className="flex items-center border-b border-gray-300 mb-4 pb-2">
              <FaLock className="text-gray-800 mr-3" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-none outline-none px-2 py-1 text-gray-800"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="ml-2 text-gray-800"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md w-full transition-transform duration-300 md:hover:shadow-xl md:hover:scale-105"
            onClick={handleLogin}
          >
            Sign In
          </button>

          {/* Social Login Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            <button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-800 shadow-md transition-transform duration-300 md:hover:shadow-xl md:hover:scale-105">
              <FaGoogle className="text-red-500 mr-2" />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-800 shadow-md transition-transform duration-300 md:hover:shadow-xl md:hover:scale-105">
              <FaApple className="text-gray-800 mr-2" />
              Sign in with Apple
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
