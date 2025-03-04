import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./ImageTicker.css"; // Make sure this CSS file exists

export const ImageTicker = (props) => {
  useEffect(() => {
    // Debug logs to check what data is being passed
    console.log("ImageTicker props:", props);
  }, [props]);

  // Handle both data formats - either props.data or props.images
  let tickerData = [];
  
  if (props.images && props.images.length > 0) {
    // Format from App.jsx: { src: "...", alt: "..." }
    tickerData = props.images.map(item => ({
      name: item.alt,
      img: item.src
    }));
  } else if (props.data && props.data.length > 0) {
    // Format from data.json: { name: "...", img: "..." }
    tickerData = props.data;
  } else {
    // Fallback data if neither is provided
    tickerData = [
      { name: "Partner 1", img: require("../tickerimg/img1.png") },
      { name: "Partner 2", img: require("../tickerimg/img2.png") },
      { name: "Partner 3", img: require("../tickerimg/img3.png") },
      { name: "Partner 4", img: require("../tickerimg/img4.png") },
      { name: "Partner 5", img: require("../tickerimg/img5.png") }
    ];
  }

  return (
    <div className="image-ticker-container">
      <div className="ticker-wrapper">
        <motion.div
          className="ticker"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {tickerData.map((d, i) => (
            <div className="ticker-item" key={`${d.name}-${i}`}>
              <img 
                src={d.img} 
                alt={d.name} 
                className="ticker-image"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Duplicate for seamless loop */}
        <motion.div
          className="ticker"
          animate={{ x: ["0%", "-100%"] }}
          initial={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {tickerData.map((d, i) => (
            <div className="ticker-item" key={`${d.name}-duplicate-${i}`}>
              <img 
                src={d.img} 
                alt={d.name} 
                className="ticker-image"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
