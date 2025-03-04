import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import { motion } from "framer-motion";

const initialState = {
  name: "",
  email: "",
  message: "",
  phone: "", // Added phone number field
};

export const Contact = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  });
  const [notification, setNotification] = useState(""); // State for notification
  const [isSubmitting, setIsSubmitting] = useState(false); // Add missing isSubmitting state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setFormData({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    setNotification(""); // Clear any previous notifications
    
    // Check if emailjs is properly loaded
    if (!emailjs) {
      console.error("EmailJS not loaded");
      setNotification("There was an error with our email service. Please try again later.");
      setIsSubmitting(false);
      return;
    }
    
    emailjs
      .sendForm("service_21rb7zm", "template_wqx33u8", e.target, "wIb9sS7AtJ78RJN3U")
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          clearState();
          setNotification("Your email has been sent. Thank you for contacting Nexus Academy. We will get back to you shortly.");
          setIsSubmitting(false);
        },
        (error) => {
          console.error("Email error:", error.text);
          setNotification("There was an error sending your email. Please try again later.");
          setIsSubmitting(false);
        }
      )
      .catch((err) => {
        console.error("Unexpected error:", err);
        setNotification("An unexpected error occurred. Please try again later.");
        setIsSubmitting(false);
      });
  };

  // Inline styles
  const notificationStyle = {
    margin: '15px 0',
    padding: '12px',
    fontSize: '0.9rem',
    '@media (min-width: 768px)': {
      fontSize: '1rem',
      padding: '15px'
    }
  };

  const whatsappButtonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#25D366", // WhatsApp green color
    color: "#fff", // White text color
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  };

  // Completely revamp the formStyles object with more prominent labels
  const formStyles = {
    formGroup: {
      marginBottom: '25px',
      position: 'relative',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#ffffff', // Changed to white
      fontWeight: '700',
      fontSize: '1.1rem',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      borderLeft: '4px solid #c4a43f',
      paddingLeft: '10px',
      lineHeight: '1.5',
      backgroundColor: '#052453', // Changed to dark blue for contrast
      padding: '5px 10px',
      borderRadius: '0 4px 4px 0',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid rgba(196, 164, 63, 0.5)',
      borderRadius: '4px',
      fontSize: '16px',
      color: '#333',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid rgba(196, 164, 63, 0.5)',
      borderRadius: '4px',
      fontSize: '16px',
      minHeight: '150px',
      color: '#333',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    button: {
      backgroundColor: '#c4a43f',
      color: '#fff',
      border: 'none',
      padding: '15px 25px',
      borderRadius: '4px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(196, 164, 63, 0.3)',
    },
  };

  return (
    <div id="contact" style={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2>Contact Us</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0, 0.55, 0.45, 1]
              }}
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <div style={formStyles.formGroup}>
                  <label htmlFor="name" style={formStyles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={formStyles.input}
                    placeholder="Your name"
                  />
                </div>
                
                <div style={formStyles.formGroup}>
                  <label htmlFor="email" style={formStyles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={formStyles.input}
                    placeholder="Your email address"
                  />
                </div>
                
                <div style={formStyles.formGroup}>
                  <label htmlFor="phone" style={formStyles.label}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={formStyles.input}
                    placeholder="Your phone number (optional)"
                  />
                </div>
                
                <div style={formStyles.formGroup}>
                  <label htmlFor="message" style={formStyles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={formStyles.textarea}
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  style={{
                    ...formStyles.button,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
            {notification && (
              <div style={{
                ...notificationStyle,
                backgroundColor: notification.includes("error") ? '#ffebee' : '#e8f5e9',
                color: notification.includes("error") ? '#c62828' : '#2e7d32',
                border: `1px solid ${notification.includes("error") ? '#ef9a9a' : '#a5d6a7'}`,
                borderRadius: '4px',
                padding: '15px',
                marginTop: '20px'
              }}>
                {notification}
              </div>
            )}
          </div>

          <div className="col-md-5 contact-info" style={{ 
            padding: '40px',
            backgroundColor: '#052453',
            borderRadius: '10px',
            color: 'white',
            boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
            border: '3px solid #c4a43f',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '550px', // Ensure minimum height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Gold accent bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '12px', // Wider accent bar
              height: '100%',
              backgroundColor: '#c4a43f'
            }}></div>
            
            <div className="contact-item" style={{ marginBottom: '40px', paddingLeft: '20px' }}>
              <h3 style={{ 
                color: '#c4a43f', 
                marginBottom: '30px', 
                fontSize: '2.3rem', // Larger heading
                fontWeight: 'bold',
                borderBottom: '2px solid rgba(196, 164, 63, 0.3)',
                paddingBottom: '15px'
              }}>Contact Info</h3>
              
              <p style={{ 
                marginBottom: '25px', 
                fontSize: '1.4rem', // Larger text
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fa fa-map-marker" style={{ 
                  marginRight: '20px', 
                  color: '#c4a43f',
                  fontSize: '2rem' // Larger icon
                }}></i>
                <span>{props.data ? props.data.address : "Loading address..."}</span>
              </p>
              
              <p style={{ 
                marginBottom: '25px', 
                fontSize: '1.4rem', // Larger text
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fa fa-phone" style={{ 
                  marginRight: '20px', 
                  color: '#c4a43f',
                  fontSize: '2rem' // Larger icon
                }}></i>
                <span>{props.data ? props.data.phone : "Loading phone..."}</span>
              </p>
              
              <p style={{ 
                marginBottom: '25px', 
                fontSize: '1.4rem', // Larger text
                display: 'flex',
                alignItems: 'center'
              }}>
                <i className="fa fa-envelope-o" style={{ 
                  marginRight: '20px', 
                  color: '#c4a43f',
                  fontSize: '2rem' // Larger icon
                }}></i>
                <span>{props.data ? props.data.email : "Loading email..."}</span>
              </p>
            </div>
            
            <div className="section-title" style={{ paddingLeft: '20px' }}>
              <h3 style={{ 
                color: '#c4a43f', 
                marginBottom: '25px', 
                fontSize: '2.3rem', // Larger heading
                fontWeight: 'bold',
                borderBottom: '2px solid rgba(196, 164, 63, 0.3)',
                paddingBottom: '15px'
              }}>Quick Connect</h3>
              
              <a href="https://wa.me/+447459533146" target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                textDecoration: 'none'
              }}>
                <button style={{
                  ...whatsappButtonStyle,
                  width: '100%',
                  padding: '18px 25px', // Larger padding
                  fontSize: '1.3rem', // Larger text
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fa fa-whatsapp" style={{ fontSize: '1.8rem' }}></i>
                  WhatsApp Chat
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
