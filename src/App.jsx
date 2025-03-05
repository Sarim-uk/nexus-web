import React, { useState, useEffect } from "react";
import { Navigation } from './components/Navigation.jsx';
import { Header } from './components/Header.jsx';
import { Features } from './components/Features.jsx';
import { About } from './components/About.jsx';
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { ImageTicker } from "./components/ImageTicker";
import { Contact } from './components/Contact.jsx';
import JsonData from "./data/data.json";
import "./App.css";
import { ScrollAnimation } from './components/AnimationWrapper';

export const scroll = {
  animateScroll: (target) => {
    target.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    if (JsonData) {
      setLandingPageData(JsonData);
    } else {
      console.error("JsonData is undefined or not loaded correctly.");
    }
  }, []);

  const Tickerimages = [
    { src: require('./tickerimg/img1.png'), alt: "Image 1" },
    { src: require('./tickerimg/img2.png'), alt: "Image 2" },
    { src: require('./tickerimg/img3.png'), alt: "Image 3" },
    { src: require('./tickerimg/img4.png'), alt: "Image 4" },
    { src: require('./tickerimg/img5.png'), alt: "Image 5" },
  ];

  return (
    <div>
      <Navigation />
      <ScrollAnimation>
        <Header data={landingPageData.Header} />
      </ScrollAnimation>
      <ScrollAnimation delay={0.2}>
        <Features data={landingPageData.Features} />
      </ScrollAnimation>
      <ScrollAnimation delay={0.3}>
        <About data={landingPageData.About} />
      </ScrollAnimation>
      <Services data={landingPageData.Services} />
      <div>
        <ImageTicker images={Tickerimages} data={landingPageData.Partners} />
      </div>
      <Testimonials data={landingPageData.Testimonials} />
      <Contact data={landingPageData.Contact} />
      <div id="footer" style={{ 
        backgroundColor: '#052453',
        color: 'white',
        padding: '40px 20px',
        borderTop: '3px solid #c4a43f'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 footer-section">
              <h4>Nexus Academy</h4>
              <p style={{ 
                color: '#c4a43f', 
                lineHeight: '1.7',
                maxWidth: '500px',
                transition: 'color 0.3s ease'
              }}>
                Global leader in accredited online education, offering bespoke learning solutions with world-class certified tutors and innovative teaching methodologies.
              </p>
            </div>
            
            <div className="col-md-6 footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features">Our Programs</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#testimonials">Success Stories</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom" style={{ 
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(196, 164, 63, 0.3)',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Nexus Academy UK<br/>
              A subsidiary of Nexus Infinity Solutions Private Limited<br/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
