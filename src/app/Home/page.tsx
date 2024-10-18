import Footer from "../components/footer";
import ImageSlider from "../components/image-slider";
import Navbar from "../components/menu";
import ProductList from "../components/productCard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ImageSlider />
      <main style={styles.main}>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0"
  }
};
