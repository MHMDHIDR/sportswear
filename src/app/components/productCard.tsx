"use client";

import React, { useState } from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";

interface Product {
  image: string;
  price: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface ProductCardProps extends Product {
  onAddToCart: (product: Product, quantity: number) => void;
}

const products: Product[] = [
  {
    image:
      "https://assets.adidas.com/images/w_1880,f_auto,q_auto/4125cf575a4f420aa9390f8c42151e56_9366/HR3796_HM30.jpg",
    price: "$99.99",
    description: "Comfortable and stylish sneakers for everyday wear.",
    sizes: ["7", "8", "9", "10"],
    colors: ["Black", "White", "Red"]
  },
  {
    image:
      "https://assets.adidas.com/images/w_1880,f_auto,q_auto/3b4e98acec924a71afc9d85b06203c27_9366/IN9846_HM30.jpg",
    price: "$79.99",
    description: "High-quality leather boots for any occasion.",
    sizes: ["8", "9", "10", "11"],
    colors: ["Brown", "Black"]
  },
  {
    image:
      "https://en-ae.sssports.com/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwfa2cf3c7/sss/SSS2/A/D/I/F/0/SSS2_ADIF0699_4066765120410_2.jpg?sw=700&sh=700&sm=fit",
    price: "$49.99",
    description: "Durable backpack with multiple compartments.",
    sizes: ["Small", "Medium", "Large"],
    colors: ["Black", "Gray", "Blue"]
  }
];

const PRODUCTS_PER_PAGE = 6;

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  description,
  sizes,
  colors,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showCartMessage, setShowCartMessage] = useState<boolean>(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCartClick = () => {
    onAddToCart({ image, price, description, sizes, colors }, quantity);
    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 4000);
  };

  const handleQuantityChange = (operation: "increased" | "decreased") => {
    setQuantity((prevQuantity) =>
      operation === "increased"
        ? prevQuantity + 1
        : Math.max(1, prevQuantity - 1)
    );
  };

  return (
    <div style={styles.card}>
      <a
        href='/productdetails'
        target='_blank'
        rel='noopener noreferrer'
        style={styles.link}
      >
        <img src={image} alt='Product Image' style={styles.image} />
      </a>
      <div style={styles.details}>
        <h2 style={styles.price}>{price}</h2>
        <p style={styles.description}>{description}</p>
        <div style={styles.actions}>
          <button
            style={{ ...styles.iconButton, color: isFavorite ? "red" : "gray" }}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from Favorites" : "Add to Favorites"
            }
          >
            <FaHeart size={24} />
          </button>
          <button
            style={styles.iconButton}
            onClick={handleCartClick}
            aria-label='Add to Cart'
          >
            <FaCartPlus size={24} color='green' />
          </button>
        </div>
        <div style={styles.quantity}>
          <button
            style={styles.quantityButton}
            onClick={() => handleQuantityChange("decreased")}
            aria-label='Decrease quantity'
          >
            -
          </button>
          <span style={styles.quantityDisplay}>{quantity}</span>
          <button
            style={styles.quantityButton}
            onClick={() => handleQuantityChange("increased")}
            aria-label='Increase quantity'
          >
            +
          </button>
        </div>
        {showCartMessage && (
          <div style={styles.cartMessageBox}>
            <div style={styles.cartMessageContent}>
              <img
                src={image}
                alt='Product Thumbnail'
                style={styles.cartMessageImage}
              />
              <div style={styles.cartMessageText}>
                <h3 style={styles.cartMessageTitle}>Added to Cart</h3>
                <p style={styles.cartMessageQuantity}>Quantity: {quantity}</p>
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
  );
};

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    // Get existing cart items from local storage
    const existingCart = localStorage.getItem("cartItems");
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    // Add new product to cart items
    cartItems.push({ ...product, quantity });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Optionally, show a message or update UI
  };

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div>
      <div style={styles.productList}>
        {currentProducts.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            price={product.price}
            description={product.description}
            sizes={product.sizes}
            colors={product.colors}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
    margin: "15px",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  link: {
    textDecoration: "none"
  },
  image: {
    width: "100%",
    height: "auto"
  },
  details: {
    padding: "15px",
    width: "100%",
    boxSizing: "border-box"
  },
  price: {
    fontSize: "1.5em",
    color: "#333",
    margin: "0 0 10px",
    textAlign: "center"
  },
  description: {
    fontSize: "0.9em",
    color: "#666",
    margin: "0 0 15px",
    textAlign: "center"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10px"
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    transition: "color 0.3s"
  },
  quantity: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    width: "100%"
  },
  quantityButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    cursor: "pointer",
    margin: "0 5px",
    fontSize: "1.2em",
    lineHeight: "1",
    textAlign: "center",
    width: "40px",
    height: "40px",
    transition: "background-color 0.3s"
  },
  quantityDisplay: {
    fontSize: "1.2em",
    margin: "0 10px"
  },
  cartMessageBox: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#333",
    color: "#fff",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
    animation: "slideInOut 4s ease-out"
  },
  cartMessageContent: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  cartMessageImage: {
    width: "50px",
    height: "50px",
    borderRadius: "4px",
    marginRight: "15px"
  },
  cartMessageText: {
    flex: 1
  },
  cartMessageTitle: {
    fontSize: "1.1em",
    margin: "0 0 5px"
  },
  cartMessageQuantity: {
    fontSize: "0.9em",
    margin: "0"
  },
  cartMessageCloseButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5em",
    cursor: "pointer",
    padding: "0 5px",
    transition: "color 0.3s"
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  },
  pageButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    cursor: "pointer",
    margin: "0 5px",
    fontSize: "1em",
    lineHeight: "1",
    textAlign: "center",
    transition: "background-color 0.3s"
  },
  pageInfo: {
    display: "flex",
    alignItems: "center",
    margin: "0 10px"
  },
  "@keyframes slideInOut": {
    "0%": {
      opacity: 0,
      transform: "translateY(100%)"
    },
    "10%": {
      opacity: 1,
      transform: "translateY(0)"
    },
    "90%": {
      opacity: 1,
      transform: "translateY(0)"
    },
    "100%": {
      opacity: 0,
      transform: "translateY(100%)"
    }
  },
  "@media (max-width: 768px)": {
    card: {
      width: "90%",
      maxWidth: "none",
      margin: "10px"
    }
  },
  "@media (max-width: 480px)": {
    card: {
      width: "100%",
      margin: "5px"
    },
    price: {
      fontSize: "1.2em"
    },
    description: {
      fontSize: "0.8em"
    },
    iconButton: {
      padding: "5px"
    },
    quantityButton: {
      padding: "5px 8px"
    },
    cartMessageBox: {
      bottom: "10px",
      right: "10px",
      padding: "10px 15px"
    },
    cartMessageImage: {
      width: "40px",
      height: "40px"
    },
    cartMessageTitle: {
      fontSize: "1em"
    },
    cartMessageQuantity: {
      fontSize: "0.8em"
    },
    cartMessageCloseButton: {
      fontSize: "1.2em"
    }
  }
};

export default ProductList;
