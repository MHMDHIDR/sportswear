// pages/productdetails.tsx
"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/menu";
import Footer from "../components/footer";

const ProductDetails = () => {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1); // State to manage product quantity
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // State to manage favorite status

  useEffect(() => {
    // Retrieve product data from local storage
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  // Handle quantity increase
  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10)); // Max quantity set to 10
  };

  // Handle quantity decrease
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1)); // Min quantity set to 1
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Handle add to cart action
  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${product.title} to cart!`);
    // Here, you can implement your cart logic (e.g., saving to local storage or state management)
  };

  if (!product) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>; // Center loading message
  }

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center p-4 max-w-2xl mx-auto">
      
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{product.title}</h1>
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-auto rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105" 
      />
      <p className="text-lg text-gray-700 mb-6">{product.description}</p>

      {/* Quantity Selector with + and - buttons */}
      <div className="flex items-center mb-4">
        <button 
          onClick={decreaseQuantity} 
          className="border border-gray-300 rounded-l px-4 py-2 bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>
        <span className="border-t border-b border-gray-300 px-4 py-2">{quantity}</span>
        <button 
          onClick={increaseQuantity} 
          className="border border-gray-300 rounded-r px-4 py-2 bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Favorite Button */}
      <button 
        onClick={toggleFavorite} 
        className={`mb-4 py-2 px-4 rounded ${isFavorite ? 'bg-red-500' : 'bg-gray-300'} text-white`}
      >
        {isFavorite ? '♥ Favorited' : '♡ Favorite'}
      </button>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart} 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mb-4"
      >
        Add to Cart
      </button>

      {/* Back Link */}
      <Link href="/" className="text-blue-500 underline">
        Back to Products
      </Link>
    </div>
    <Footer />
    </>
  );
};

export default ProductDetails;
