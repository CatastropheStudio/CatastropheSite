import React from "react";
import Header from "./components/Header/Header";
import AboutUs from "./components/About/About";
import TribesSection from "./components/Tribes/Tribes";
import ContactUs from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import SkyScroll from "./components/SkyScroll/SkyScroll";

export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <SkyScroll />
      <TribesSection />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
}
