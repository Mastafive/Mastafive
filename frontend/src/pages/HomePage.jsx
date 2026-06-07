import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Bio from "../components/Bio";
import MixcloudPlayer from "../components/MixcloudPlayer";
import MerchVideo from "../components/MerchVideo";
import Tracks from "../components/Tracks";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Bio />
      <Hero />
      <MixcloudPlayer />
      <MerchVideo />
      <Tracks />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
