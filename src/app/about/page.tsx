"use client";

import Footer from "../components/footer";
import Navbar from "../components/menu";

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-3xl p-8 bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl border border-gray-600 relative mb-12">
          <h1 className="text-4xl font-bold text-center text-white mb-4">About Us</h1>
          <p className="text-center text-gray-300 mb-6">
            Welcome to our sportswear store, where passion for sports meets high-quality apparel. We are dedicated to providing you with the best gear for your active lifestyle.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-6 text-center">
            Our mission is to empower athletes of all levels by offering innovative and stylish sportswear that enhances performance and comfort.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Quality: We prioritize high-quality materials and craftsmanship.</li>
            <li>Innovation: We embrace cutting-edge technology in our products.</li>
            <li>Sustainability: We are committed to eco-friendly practices.</li>
            <li>Community: We support local sports initiatives and charities.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center">
              <img src="https://img.youm7.com/ArticleImgs/2022/2/20/43114-%D8%B5%D9%88%D8%B1%D8%A9-%D8%B4%D8%AE%D8%B5%D9%8A%D8%A9.jpeg" alt="Team Member 1" className="w-32 h-32 rounded-full mb-4 border-4 border-gray-500"/>
              <h3 className="text-lg font-semibold text-white">Alex Johnson</h3>
              <p className="text-gray-300">CEO & Founder</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://cdn.arabsstock.com/uploads/images/111714/image-111714-concept-softness-femininity-personal-photo-official-docum-search_large.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mb-4 border-4 border-gray-500"/>
              <h3 className="text-lg font-semibold text-white">Samantha Lee</h3>
              <p className="text-gray-300">Marketing Director</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://mir-s3-cdn-cf.behance.net/projects/404/c257b0192589675.65de254542ad7.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full mb-4 border-4 border-gray-500"/>
              <h3 className="text-lg font-semibold text-white">Mike Smith</h3>
              <p className="text-gray-300">Product Manager</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/%D8%B5%D9%88%D8%B1%D8%A9_%D8%B4%D8%AE%D8%B5%D9%8A%D8%A9_%D9%A1%D9%A2%D9%A3.jpg" alt="Team Member 4" className="w-32 h-32 rounded-full mb-4 border-4 border-gray-500"/>
              <h3 className="text-lg font-semibold text-white">Emily Davis</h3>
              <p className="text-gray-300">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
