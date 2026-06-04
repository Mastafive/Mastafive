import React, { useState } from "react";
import { X } from "lucide-react";
import { gallery } from "../mock";

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="w-full bg-[#0a0a0a] py-20 md:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2">Live &amp; Backstage</p>
          <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
            Gallery
          </h2>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
          {gallery.map((src, idx) => (
            <div
              key={idx}
              className="gallery-item mb-3 break-inside-avoid rounded-sm"
              onClick={() => setActive(src)}
            >
              <img src={src} alt={`Mastafive ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
            onClick={() => setActive(null)}
            aria-label="close"
          >
            <X size={32} />
          </button>
          <img
            src={active}
            alt="preview"
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
