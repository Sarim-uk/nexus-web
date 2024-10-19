import React from "react";
import "./ImageTicker.css"; // Ensure this path is correct

export const ImageTicker = ({ images }) => {
  return (
    <div className="ticker-container">
      <div className="ticker">
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} />
        ))}
        {/* Duplicate images for seamless scrolling */}
        {images.map((image, index) => (
          <img key={`${index}-duplicate`} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
};
