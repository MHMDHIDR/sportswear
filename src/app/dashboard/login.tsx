"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize router

  const handleLogin = () => {
    if (email && password) {
      // Store email and password in localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      // Redirect to /dashboard/control
      router.push("/dashboard/control");
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-center mb-6">
          <Image
            src="https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png"
            alt="User Avatar"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back</h1>
          <p className="text-gray-500">Please login to your account</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Login
        </button>

        <div className="flex justify-between items-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
}
