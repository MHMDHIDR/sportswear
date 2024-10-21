"use client";
import { useState } from "react";
import { Lens } from "./lens";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from "next/link";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Product = {
  id: string; // Add an id field
  title: string;
  description: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  quantity: number; // Quantity state passed as prop
  isFavorite: boolean; // Favorite state passed as prop
  onQuantityChange: (newQuantity: number) => void; // Function to update quantity
  onToggleFavorite: () => void; // Function to toggle favorite
};

function ProductCard({ product, quantity, isFavorite, onQuantityChange, onToggleFavorite }: ProductCardProps) {
  const [hovering, setHovering] = useState(false);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  const handleNavigateToDetails = () => {
    // Store product details in local storage
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden max-w-md mx-2 bg-white p-4 my-10 shadow-md">
      <div className="relative z-10">
        <Lens hovering={hovering} setHovering={setHovering}>
          <Link href={`/productdetails`} onClick={handleNavigateToDetails}>
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="rounded-2xl"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            />
          </Link>
        </Lens>
        <motion.div
          animate={{
            filter: hovering ? "blur(2px)" : "blur(0px)",
          }}
          className="py-4 relative z-20"
        >
          <h2 className="text-black text-2xl text-left font-bold">
            {product.title}
          </h2>
          <p className="text-gray-700 text-left mt-4">
            {product.description}
          </p>

          {/* Quantity Controls */}
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center mb-2">
              <button
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="bg-gray-200 text-gray-800 p-4 rounded-md mx-2 text-xl transition-all duration-200 hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-bold mx-2">{quantity}</span>
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="bg-gray-200 text-gray-800 p-4 rounded-md mx-2 text-xl transition-all duration-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <span className="text-gray-500 text-sm">Adjust Quantity</span>
          </div>

          {/* Add to Cart and Add to Favorites Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-green-800 text-white p-2 rounded-md shadow-md hover:bg-green-600 transition duration-200"
            >
              <FontAwesomeIcon icon={faCartPlus} className="mr-1" />
              Add to Cart
            </button>
            <button onClick={onToggleFavorite} className="text-red-500">
              <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


export function LensDemo() {
  const products: Product[] = [
    {
      id: "1", 
      title: "Apple Vision Pro",
      description: "The all new Apple Vision Pro was the best thing that happened around 8 months ago, not anymore.",
      image: "https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2FRMCFMO0024-01-1.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=1920&q=75",
    },
    {
      id: "2", 
      title: "Samsung Galaxy S23",
      description: "Experience the next level of smartphone technology with the Samsung Galaxy S23.",
      image: "https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2FRMCFMZ0201-1.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=3840&q=50",
    },
    {
      id: "3", 
      title: "Google Pixel 7",
      description: "Capture stunning photos with the Google Pixel 7's advanced camera system.",
      image: "https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2Frmcfmz0196-01.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=640&q=50",
    },
    {
      id: "4", 
      title: "OnePlus 9 Pro",
      description: "The OnePlus 9 Pro offers fast charging and a sleek design for tech enthusiasts.",
      image: "https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2FRMCFMZ0201-1.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=3840&q=50",
    },
    {
      id: "5", 
      title: "Xiaomi Mi 11",
      description: "Unleash the power of photography with the Xiaomi Mi 11's impressive camera capabilities.",
      image: "https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2Frmcfmz0196-01.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=640&q=50",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 3; // Set the number of products to display per page
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  // State to manage quantities and favorites for all products
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  // Calculate the index of the first and last product on the current page
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center flex-wrap">
        {currentProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            quantity={quantities[product.id] || 1} // Pass quantity for the product
            isFavorite={!!favorites[product.id]} // Pass favorite status for the product
            onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)} // Pass quantity change handler
            onToggleFavorite={() => toggleFavorite(product.id)} // Pass favorite toggle handler
          /> 
        ))}
      </div>
      <div className="flex justify-between items-center w-full max-w-md mt-4">
  {/* Previous Button */}
  <button
    onClick={handlePrevious}
    disabled={currentPage === 0}
    className={`w-12 h-12 bg-gray-500 text-white rounded-full flex justify-center items-center shadow-md transition duration-200 
      ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
  >
    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
  </button>

  {/* Page Indicator */}
  <span className="text-lg font-bold">
    {currentPage + 1} / {totalPages}
  </span>

  {/* Next Button */}
  <button
    onClick={handleNext}
    disabled={currentPage >= totalPages - 1}
    className={`w-12 h-12 bg-gray-500 text-white rounded-full flex justify-center items-center shadow-md transition duration-200 
      ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
  >
    <FontAwesomeIcon icon={faArrowRight} size="lg" />
  </button>
</div>
    </div>
  );
}