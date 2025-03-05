import React from "react";
import { motion } from "framer-motion";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            We provide the most premium services for students on their path to achieve the best results possible!
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <motion.div 
                  key={`${d.name}-${i}`} 
                  className="col-md-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.1,
                    duration: 0.4
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </motion.div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
