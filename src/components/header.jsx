import React from "react";
import { motion } from "framer-motion";
import "./Header.css"; // Make sure to import the CSS

export const Header = ({ data, id }) => {
  return (
    <header id={id} className="header-section">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <motion.div 
                className="col-md-8 col-md-offset-2 intro-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.17, 0.67, 0.83, 0.67]
                }}
              >
                <h1>
                  {data ? data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{data ? data.paragraph : "Loading"}</p>
                <motion.a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
