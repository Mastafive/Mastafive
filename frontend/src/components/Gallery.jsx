import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { gallery } from "../mock";

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    slidesToScroll: 1,
    containScroll: "trimSnaps"
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNav = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateNav();
    emblaApi.on("select", updateNav);
    emblaApi.on("reInit", updateNav);
  }, [emblaApi, updateNav]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setActiveIdx(null);
      else if (e.key === "ArrowRight") setActiveIdx((i) => (i + 1) % gallery.length);
      else if (e.key === "ArrowLeft") setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIdx]);

  return (
    <section id="gallery" className="w-full bg-[#0a0a0a] py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2">Live &amp; Backstage</p>
            <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
              Gallery
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#e91414] hover:border-[#e91414] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next"
              className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#e91414] hover:border-[#e91414] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel - full width banner */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-6 md:px-10">
            {gallery.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="relative flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] h-72 md:h-80 lg:h-96 group overflow-hidden rounded-sm bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#e91414]"
                aria-label={`Open image ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Mastafive ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            ))}
          </div>
        </div>

        {/* edge fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <p className="text-white/40 text-xs tracking-widest uppercase">
          {gallery.length} foto &middot; scorri o clicca per ingrandire
        </p>
      </div>

      {/* Lightbox */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveIdx(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveIdx(null); }}
            aria-label="close"
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#e91414] text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length); }}
            aria-label="previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#e91414] text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveIdx((i) => (i + 1) % gallery.length); }}
            aria-label="next image"
          >
            <ChevronRight size={24} />
          </button>

          <img
            src={gallery[activeIdx]}
            alt={`preview ${activeIdx + 1}`}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
            {activeIdx + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
