// ProductDetails.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import "./ProductDetails.css"; // Import CSS file
import Footer from "../components/footer";
import Navbar from "../components/menu";

interface Product {
  image: string;
  price: string;
  description: string;
  sizes: string[];
  colors: string[];
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showCartMessage, setShowCartMessage] = useState<boolean>(false);

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    console.log("Stored Product:", storedProduct);
    if (storedProduct) {
      try {
        setProduct(JSON.parse(storedProduct));
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    } else {
      console.warn("No product found in localStorage.");
    }
  }, []);

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setQuantity((prevQuantity) => {
      if (operation === "increase") {
        return prevQuantity + 1;
      } else if (operation === "decrease" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;

    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 4000); // Hide message after 4 seconds
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className='loading-container'>
          <div className='spinner'></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.productDisplay}>
          <div style={styles.imageContainer}>
            <img src={product.image} alt='Product Image' style={styles.image} />
          </div>
        </div>
        <div style={styles.details}>
          <h2 style={styles.price}>{product.price}</h2>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.pickers}>
            <div style={styles.pickerBlock}>
              <label htmlFor='sizePicker' style={styles.pickerLabel}>
                Select Size:
              </label>
              <select
                id='sizePicker'
                value={selectedSize || ""}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={styles.picker}
              >
                <option value='' disabled>
                  Select a size
                </option>
                {product.sizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.pickerBlock}>
              <label htmlFor='colorPicker' style={styles.pickerLabel}>
                Select Color:
              </label>
              <select
                id='colorPicker'
                value={selectedColor || ""}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={styles.picker}
              >
                <option value='' disabled>
                  Select a color
                </option>
                {product.colors.map((color, index) => (
                  <option
                    key={index}
                    value={color}
                    style={{ backgroundColor: color }}
                  >
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={styles.quantitySection}>
            <button
              style={styles.quantityButton}
              onClick={() => handleQuantityChange("decrease")}
              aria-label='Decrease quantity'
            >
              -
            </button>
            <span style={styles.quantityDisplay}>{quantity}</span>
            <button
              style={styles.quantityButton}
              onClick={() => handleQuantityChange("increase")}
              aria-label='Increase quantity'
            >
              +
            </button>
          </div>
          <button
            style={styles.addToCartButton}
            onClick={handleAddToCart}
            aria-label='Add to Cart'
          >
            <FaCartPlus size={24} />
            <span>Add to Cart</span>
          </button>
          {showCartMessage && (
            <div className='cart-message-box'>
              <div style={styles.cartMessageContent}>
                <img
                  src={product.image}
                  alt='Product Thumbnail'
                  style={styles.cartMessageImage}
                />
                <div style={styles.cartMessageText}>
                  <h3 style={styles.cartMessageTitle}>Added to Cart</h3>
                  <p style={styles.cartMessageQuantity}>Quantity: {quantity}</p>
                  <p style={styles.cartMessageSize}>Size: {selectedSize}</p>
                  <p style={styles.cartMessageColor}>Color: {selectedColor}</p>
                </div>
                <button
                  style={styles.cartMessageCloseButton}
                  onClick={() => setShowCartMessage(false)}
                  aria-label='Close'
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  // Product Details Styles
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },
  productDisplay: {
    display: "flex",
    justifyContent: "center",
    perspective: "1000px",
    marginBottom: "30px"
  },
  imageContainer: {
    width: "300px",
    height: "300px",
    transformStyle: "preserve-3d",
    transition: "transform 0.5s",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
  },
  details: {
    textAlign: "center",
    maxWidth: "800px"
  },
  price: {
    fontSize: "2em",
    color: "#333",
    margin: "0 0 10px"
  },
  description: {
    fontSize: "1.2em",
    color: "#666",
    marginBottom: "20px"
  },
  pickers: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  pickerBlock: {
    flex: "1",
    margin: "0 10px"
  },
  pickerLabel: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold"
  },
  picker: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none"
  },
  quantitySection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0"
  },
  quantityButton: {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "1.5em",
    cursor: "pointer",
    margin: "0 10px"
  },
  quantityDisplay: {
    fontSize: "1.5em"
  },
  addToCartButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#28A745",
    color: "#fff",
    fontSize: "1.2em",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  addToCartButtonHover: {
    backgroundColor: "#218838"
  },
  cartMessageContent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000
  },
  cartMessageImage: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    marginRight: "10px"
  },
  cartMessageText: {
    flex: 1
  },
  cartMessageTitle: {
    margin: "0"
  },
  cartMessageQuantity: {
    margin: "5px 0"
  },
  cartMessageSize: {
    margin: "5px 0"
  },
  cartMessageColor: {
    margin: "5px 0"
  },
  cartMessageCloseButton: {
    background: "none",
    border: "none",
    fontSize: "1.5em",
    cursor: "pointer"
  }
};

export default ProductDetails;
