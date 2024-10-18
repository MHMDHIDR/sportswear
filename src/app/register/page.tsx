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

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // import styles
import Footer from "../components/footer";
import Navbar from "../components/menu";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password && confirmPassword && phoneNumber) {
      if (password === confirmPassword) {
        alert("Registered successfully!");
        // Clear form fields on success
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
      } else {
        setErrorMessage("Passwords do not match.");
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Register</h1>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
              {/* Email and Password Input */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center border-b border-gray-300 pb-2">
                  <FaUser className="text-gray-800 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-none outline-none px-3 py-2 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-400"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex items-center border-b border-gray-300 pb-2 relative">
                  <FaLock className="text-gray-800 mr-3" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-none outline-none px-3 py-2 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-400"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex items-center border-b border-gray-300 pb-2 relative">
                  <FaLock className="text-gray-800 mr-3" />
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-none outline-none px-3 py-2 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-400"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                    aria-label={
                      confirmPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="mb-4">
                <PhoneInput
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-gray-400"
                  inputClass="w-full border-none outline-none px-3 py-2 text-gray-800"
                  countrySelectProps={{ className: "border-r border-gray-300" }}
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="bg-gray-800 text-white py-2 px-4 rounded-md w-full transition-transform duration-200 hover:shadow-lg hover:scale-105 focus:outline-none md:hover:scale-105"
              >
                Register
              </button>

              {/* Social Login Buttons */}
              <div className="mt-4 flex flex-col gap-4">
                <button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-800 shadow-md transition-transform duration-200 hover:shadow-lg focus:outline-none md:hover:scale-105">
                  <FaGoogle className="text-red-500 mr-2" />
                  Register with Google
                </button>
                <button className="flex items-center justify-center py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-800 shadow-md transition-transform duration-200 hover:shadow-lg focus:outline-none md:hover:scale-105">
                  <FaApple className="text-gray-800 mr-2" />
                  Register with Apple
                </button>
              </div>

              {/* Footer */}
              <p className="mt-4 text-gray-600 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
