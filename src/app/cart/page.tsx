"use client";
import React, { useEffect, useState, useCallback } from "react";

import Footer from "../components/footer";
import Navbar from "../components/menu";

interface CartItem {
  image: string;
  price: string;
  description: string;
  quantity: number;
}

const CART_STORAGE_KEY = "cartItems";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const existingCart = localStorage.getItem(CART_STORAGE_KEY);
    if (existingCart) {
      try {
        setCartItems(JSON.parse(existingCart));
      } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  const updateCart = useCallback((updatedItems: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: updatedItems })
    );
  }, []);

  const handleQuantityChange = (
    index: number,
    operation: "increase" | "decrease"
  ) => {
    const updatedItems = [...cartItems];
    if (operation === "increase") {
      updatedItems[index].quantity += 1;
    } else {
      updatedItems[index].quantity = Math.max(
        1,
        updatedItems[index].quantity - 1
      );
    }
    updateCart(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    updateCart(updatedItems);
  };

  const calculateTotalAmount = () =>
    cartItems
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
      )
      .toFixed(2);

  const handlePurchase = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.cartContainer}>
        <h1 style={styles.cartTitle}>Your Cart</h1>
        <div style={styles.cartItems}>
          {cartItems.length === 0 ? (
            <p style={styles.emptyCart}>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <img src={item.image} alt="Product" style={styles.cartImage} />
                <div style={styles.cartDetails}>
                  <h2 style={styles.cartPrice}>{item.price}</h2>
                  <p style={styles.cartDescription}>{item.description}</p>
                  <div style={styles.cartActions}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(index, "decrease")}
                      aria-label="Decrease quantity"
                    >
                      <span style={styles.buttonText}>-</span>
                    </button>
                    <span style={styles.quantityDisplay}>{item.quantity}</span>
                    <button
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(index, "increase")}
                      aria-label="Increase quantity"
                    >
                      <span style={styles.buttonText}>+</span>
                    </button>
                    <button
                      style={styles.removeButton}
                      onClick={() => handleRemoveItem(index)}
                      aria-label="Remove item from cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2"
                        style={styles.trashIcon}
                      >
                        <path d="M3 6h18"></path>
                        <path d="M8 6v12"></path>
                        <path d="M12 6v12"></path>
                        <path d="M16 6v12"></path>
                        <path d="M19 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div style={styles.cartSummary}>
            <h2 style={styles.totalAmount}>
              Total Amount: ${calculateTotalAmount()}
            </h2>
            <button style={styles.purchaseButton} onClick={handlePurchase}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  cartContainer: {
    flex: 1,
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  cartTitle: {
    textAlign: "center",
    marginBottom: "20px",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: "1.2em",
    color: "#666",
  },
  cartItem: {
    display: "flex",
    gap: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    background: "#fff",
    transition: "transform 0.3s ease",
    transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
  },
  cartImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  cartDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cartPrice: {
    fontSize: "1.2em",
    margin: "0 0 10px",
  },
  cartDescription: {
    fontSize: "1em",
    margin: "0 0 10px",
  },
  cartActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  quantityButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "1.2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    textAlign: "center",
  },
  buttonText: {
    display: "block",
  },
  quantityDisplay: {
    fontSize: "1.5em",
    margin: "0 10px",
    width: "40px",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545", // Red background color
    border: "none",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "50%", // Make button circular
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trashIcon: {
    width: "24px",
    height: "24px",
    color: "#fff", // White color for trash icon
  },
  cartSummary: {
    textAlign: "center",
    marginTop: "20px",
  },
  totalAmount: {
    fontSize: "1.5em",
    marginBottom: "10px",
  },
  purchaseButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "15px 20px",
    cursor: "pointer",
    fontSize: "1.2em",
  },
};

export default Cart;
