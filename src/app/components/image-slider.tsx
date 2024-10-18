"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";

// Styled components
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  perspective: 1500px;
  height: auto;
`;

const Slider = styled.div`
  display: flex;
  transform-style: preserve-3d;
`;

const Slides = styled.div<{ currentIndex: number }>`
  display: flex;
  width: 100%;
  transform-style: preserve-3d;
  transform: translateX(-${(props) => props.currentIndex * 100}%);
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
  backface-visibility: hidden;
  transform: rotateY(0deg);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-12/Fjr1JYxXgAQTNz9.jpg.png?itok=LIVKi_Me",
    "https://i.pinimg.com/originals/30/fa/a4/30faa4ac03f08a200adcfad5a89a2ca3.jpg",
    "https://www.soccerbible.com/media/124570/adi-1-min.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SliderContainer>
      <Slider>
        <Slides currentIndex={currentIndex}>
          {images.map((image, index) => (
            <Slide key={index}>
              <Image src={image} alt={`Slide ${index + 1}`} />
            </Slide>
          ))}
        </Slides>
      </Slider>
      <PrevButton onClick={handlePrevious}>
        <FaArrowLeft />
      </PrevButton>
      <NextButton onClick={handleNext}>
        <FaArrowRight />
      </NextButton>
    </SliderContainer>
  );
};

export default ImageSlider;
