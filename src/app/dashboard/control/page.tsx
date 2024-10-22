"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation

export default function Control() {
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    // If email or password are missing, redirect to the Error page
    if (!email || !password) {
      router.push("/dashboard/error"); // Redirect to the Error page
    }
  }, [router]);

  const handleLogout = () => {
    // Clear localStorage and redirect to /dashboard
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-200"
        >
          Logout
        </button>
        <h1 className="text-4xl font-bold">Control Page</h1>
      </div>
      <div className="flex flex-1">
        <h1>Welcome to the Control Page. You can add, edit, delete, and view</h1>
      </div>
    </div>
  );
}
