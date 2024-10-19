import Footer from "../components/footer";
import { ImagesSliderDemo } from "../components/imagesSlider";
import Navbar from "../components/menu";
import { LensDemo } from "../components/productCard";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <ImagesSliderDemo />
      <main style={styles.main}>
        <LensDemo />
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
