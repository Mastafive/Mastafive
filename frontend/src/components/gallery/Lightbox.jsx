import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, activeIdx, onClose, onPrev, onNext }) {
  if (activeIdx === null || activeIdx === undefined) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="close"
      >
        <X size={32} />
      </button>

      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#e91414] text-white flex items-center justify-center transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#e91414] text-white flex items-center justify-center transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="next image"
      >
        <ChevronRight size={24} />
      </button>

      <img
        src={images[activeIdx]}
        alt={`preview ${activeIdx + 1}`}
        className="max-w-[92vw] max-h-[88vh] object-contain rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
        {activeIdx + 1} / {images.length}
      </p>
    </div>
  );
}
