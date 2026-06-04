import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Discography from "../components/Discography";
import Footer from "../components/Footer";

export default function DiscographyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-black">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <Discography />
      </div>
      <Footer />
    </main>
  );
}
