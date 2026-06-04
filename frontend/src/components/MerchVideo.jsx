import React, { useState } from "react";
import { Play, ShoppingBag } from "lucide-react";
import { merchVideo } from "../mock";

export default function MerchVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="merch" className="w-full bg-black py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2">Merch Ufficiale</p>
          <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
            Bulls Temple Tee
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 relative aspect-video bg-zinc-900 overflow-hidden group rounded-sm">
            {!playing ? (
              <>
                <img
                  src={merchVideo.thumbnail}
                  alt={merchVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play video"
                >
                  <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#e91414] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-white ml-1" size={36} fill="white" />
                  </span>
                </button>
                <div className="absolute top-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{merchVideo.title}</p>
                    <p className="text-white/70 text-xs">{merchVideo.channel}</p>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${merchVideo.videoId}?autoplay=1&rel=0`}
                title={merchVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div className="md:col-span-1 space-y-5">
            <p className="text-white/70 text-sm leading-relaxed">
              La nuova collezione ufficiale Mastafive. T-shirt premium con grafica esclusiva, disponibile in tutte le taglie S - M - L - XL - XXL.
            </p>
            <a
              href={merchVideo.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm tracking-[0.2em] font-bold uppercase"
            >
              <ShoppingBag size={16} />
              {merchVideo.buyText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
