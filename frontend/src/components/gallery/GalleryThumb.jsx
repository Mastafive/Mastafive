import React from "react";

export default function GalleryThumb({ src, index, onOpen }) {
  const contain = src.startsWith("/assets/");
  return (
    <button
      onClick={() => onOpen(index)}
      className="relative flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] h-72 md:h-80 lg:h-96 group overflow-hidden rounded-sm bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#e91414]"
      aria-label={`Open image ${index + 1}`}
    >
      <img
        src={src}
        alt={`Mastafive ${index + 1}`}
        loading="lazy"
        className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
          contain ? "object-contain bg-white object-center" : "object-cover"
        }`}
        style={{ filter: "grayscale(15%) brightness(0.9)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
      <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      </div>
    </button>
  );
}
