import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { ImageTicker } from "./components/ImageTicker";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
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
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <div>
      <ImageTicker images={Tickerimages} />
      </div>
      <Testimonials data={landingPageData.Testimonials} />
     <Contact data={landingPageData.Contact} />
     <div id="footer">
     <p>Developed by <a href="https://github.com/Sarim-uk" target="_blank">Sarim.uk</a> - All rights reserved Nexus Infinity Solutions Private Limited.</p>
     </div>
    </div>
  );
};

export default App;
