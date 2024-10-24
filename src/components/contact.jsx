import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
  phone: "", // Added phone number field
};

export const Contact = (props) => {
  const [{ name, email, message, phone }, setState] = useState(initialState);
  const [notification, setNotification] = useState(""); // State for notification

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

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

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Fill out the form below, and connect with us to open the doors to premium education and avail our discounts!
                </p>
              </div>
              {notification && ( // Conditional rendering of notification
                <div style={notificationStyle}>
                  {notification}
                </div>
              )}
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }} // Added styling
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }} // Added styling
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="tel" // Changed to "tel" for phone input
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      onChange={handleChange}
                      pattern="[0-9]*" // Allows only numbers
                      style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }} // Added styling
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                    style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }} // Added styling
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
              <div className="section-title">
              <h2>Or reach out to us via WhatsApp</h2>
                <a href="https://wa.me/+447459533146" target="_blank" rel="noopener noreferrer">
                  <button style={whatsappButtonStyle} className="btn btn-custom btn-lg">
                    Connect via WhatsApp!
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
