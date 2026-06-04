import React, { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import useEmblaNav from "../hooks/useEmblaNav";
import useLightboxKeys from "../hooks/useLightboxKeys";
import { gallery } from "../mock";
import GalleryThumb from "./gallery/GalleryThumb";
import Lightbox from "./gallery/Lightbox";

function NavArrow({ direction, onClick, disabled }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#e91414] hover:border-[#e91414] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/30"
    >
      <Icon size={20} />
    </button>
  );
}

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    slidesToScroll: 1,
    containScroll: "trimSnaps"
  });
  const { canPrev, canNext, scrollPrev, scrollNext } = useEmblaNav(emblaApi);

  const openAt = useCallback((idx) => setActiveIdx(idx), []);
  const closeLightbox = useCallback(() => setActiveIdx(null), []);
  const goNext = useCallback(() => setActiveIdx((i) => (i + 1) % gallery.length), []);
  const goPrev = useCallback(() => setActiveIdx((i) => (i - 1 + gallery.length) % gallery.length), []);

  useLightboxKeys({
    enabled: activeIdx !== null,
    onClose: closeLightbox,
    onNext: goNext,
    onPrev: goPrev
  });

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
            <NavArrow direction="prev" onClick={scrollPrev} disabled={!canPrev} />
            <NavArrow direction="next" onClick={scrollNext} disabled={!canNext} />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-6 md:px-10">
            {gallery.map((src, idx) => (
              <GalleryThumb key={src} src={src} index={idx} onOpen={openAt} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <p className="text-white/40 text-xs tracking-widest uppercase">
          {gallery.length} foto &middot; scorri o clicca per ingrandire
        </p>
      </div>

      <Lightbox
        images={gallery}
        activeIdx={activeIdx}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </section>
  );
}
