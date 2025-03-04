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
      <div id="footer">
        <p>Developed by <a href="https://github.com/Sarim-uk" target="_blank" rel="noreferrer">Sarim.uk</a> - All rights reserved Nexus Infinity Solutions Private Limited.</p>
      </div>
    </div>
  );
};

export default App;
