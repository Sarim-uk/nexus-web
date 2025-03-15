import React from "react";
import { motion } from 'framer-motion';

export const Testimonials = (props) => {
  if (!props.data || props.data.length === 0) return "No testimonials available";

  return (
    <motion.div 
      initial={{ opacity: 0, rotateX: 15 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ 
        duration: 0.8,
        ease: [0.83, 0, 0.17, 1]
      }}
      whileHover={{
        zIndex: 2,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div id="testimonials" style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#2c3e50' }}>Client Success Stories</h2>
          </div>

          <div className="testimonial-grid" style={gridStyle}>
            {props.data.map((d, i) => (
              <motion.div 
                key={`${d.name}-${i}`}
                style={cardStyle}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="testimonial-card"
              >
                <div style={cardHeaderStyle}>
                  <img src={d.img} alt={d.name} style={avatarStyle} />
                  <div style={headerTextStyle}>
                    <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.4rem' }}>{d.name}</h3>
                    <p style={{ margin: 0, color: '#7f8c8d', fontSize: '1.1rem' }}>{d.role} {d.company}</p>
                  </div>
                </div>
                <div style={cardBodyStyle}>
                  <p className="testimonial-text" style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#34495e' }}>
                    "{d.text}"
                  </p>
                  <div style={ratingStyle}>
                    {'★'.repeat(d.rating).padEnd(5, '☆')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Keep only necessary styles
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
  padding: '20px'
};

const cardStyle = {
  background: 'white',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  padding: '25px',
  minHeight: '350px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

// Rest of the styles remain the same as previous version
const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px'
};

const avatarStyle = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '20px'
};

const headerTextStyle = {
  flex: 1
};

const cardBodyStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const ratingStyle = {
  color: '#f1c40f',
  fontSize: '1.4rem',
  marginTop: '15px',
  textAlign: 'center'
};
