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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setFormData({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_21rb7zm", "template_wqx33u8", e.target, "wIb9sS7AtJ78RJN3U")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
          setNotification("Your email has been sent. Thank you for contacting Nexus Academy. We will get back to you shortly."); // Set notification message
        },
        (error) => {
          console.log(error.text);
          setNotification("There was an error sending your email. Please try again later."); // Set error notification
        }
      );
  };

  // Inline styles
  const notificationStyle = {
    margin: "20px 0",
    padding: "10px",
    border: "1px solid #ccc", // Optional border
    backgroundColor: "#e6ffe6", // Light green background
    color: "#4caf50", // Green text color
    borderRadius: "5px", // Rounded corners
    textAlign: "center", // Centered text
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

  // Updated styles
  const formStyle = {
    display: 'grid',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px'
  };

  const inputGroupStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical'
  };

  const submitButtonStyle = {
    ...whatsappButtonStyle,
    width: '100%',
    marginTop: '10px'
  };

  return (
    <div id="contact" style={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
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
              <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={inputGroupStyle}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  style={textareaStyle}
                  required
                ></textarea>
                <button type="submit" style={submitButtonStyle}>
                  Send Message
                </button>
              </form>
            </motion.div>
            {notification && <div style={notificationStyle}>{notification}</div>}
          </div>

          <div className="col-md-4 contact-info" style={{ 
            padding: '20px',
            backgroundColor: '#2c3e50', // Added dark background
            borderRadius: '8px',
            color: 'white' // Set default text color to white
          }}>
            <div className="contact-item" style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>Contact Info</h3>
              <p style={{ marginBottom: '10px' }}>
                <i className="fa fa-map-marker" style={{ marginRight: '10px' }}></i>
                {props.data ? props.data.address : "Loading address..."}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <i className="fa fa-phone" style={{ marginRight: '10px' }}></i>
                {props.data ? props.data.phone : "Loading phone..."}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <i className="fa fa-envelope-o" style={{ marginRight: '10px' }}></i>
                {props.data ? props.data.email : "Loading email..."}
              </p>
            </div>
            
            <div className="section-title">
              <h3 style={{ color: 'white', marginBottom: '15px' }}>Quick Connect</h3>
              <a href="https://wa.me/+447459533146" target="_blank" rel="noopener noreferrer">
                <button style={whatsappButtonStyle}>
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
