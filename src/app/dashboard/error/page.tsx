"use client";
import { useRouter } from "next/navigation"; // For navigation

export default function Error() {
  const router = useRouter(); // Initialize router

  const handleBackToDashboard = () => {
    router.push("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Oops! Page not found.</p>
      <button
        onClick={handleBackToDashboard}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
