import React from "react";
import { motion } from 'framer-motion';

export const Features = (props) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Features</h2>
          </div>
          <div className="row">
            {props.data
              ? props.data.map((d, i) => (
                  <motion.div 
                    key={`${d.title}-${i}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.15,
                      duration: 0.6
                    }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                    className="col-xs-6 col-md-3 feature-card"
                  >
                    {" "}
                    <i className={d.icon}></i>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </motion.div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
