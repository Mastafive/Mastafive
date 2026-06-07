import React, { useState } from "react";
import { Play, ExternalLink, Headphones, Clock } from "lucide-react";
import {
  mixcloudShows,
  mixcloudProfile,
  formatDuration,
  formatShowDate,
  mixcloudEmbedUrl
} from "../mixcloud";

function ShowCard({ show, active, onPlay }) {
  return (
    <button
      onClick={() => onPlay(show)}
      className={`group relative text-left rounded-sm overflow-hidden bg-[#0a0a0a] border transition-colors ${
        active ? "border-[#e91414]" : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={show.pic}
          alt={show.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <span className="w-14 h-14 rounded-full bg-[#e91414] flex items-center justify-center shadow-2xl">
            <Play size={22} className="text-white ml-0.5" fill="white" />
          </span>
        </span>
        {show.duration > 0 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono rounded-sm inline-flex items-center gap-1">
            <Clock size={10} />
            {formatDuration(show.duration)}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#e91414] transition-colors">
          {show.name}
        </p>
        <p className="text-white/40 text-xs mt-1.5 tracking-wide">{formatShowDate(show.created)}</p>
      </div>
    </button>
  );
}

function FeaturedPlayer({ show }) {
  if (!show) return null;
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-4 md:p-6 mb-10">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-[#e91414] text-[10px] tracking-[0.3em] uppercase font-bold mb-1">In riproduzione</p>
          <h3 className="text-white text-lg md:text-xl font-bold leading-tight">{show.name}</h3>
          <p className="text-white/50 text-xs mt-1">
            {formatShowDate(show.created)} {show.duration > 0 && `· ${formatDuration(show.duration)}`}
          </p>
        </div>
        <a
          href={show.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-white/70 hover:text-white border border-white/15 hover:border-[#e91414] transition-colors"
        >
          <ExternalLink size={13} />
          Apri su Mixcloud
        </a>
      </div>
      <div className="bg-black rounded-sm overflow-hidden">
        <iframe
          title={show.name}
          src={mixcloudEmbedUrl(show.key, { autoplay: true, light: true })}
          width="100%"
          height="120"
          frameBorder="0"
          allow="autoplay"
        />
      </div>
    </div>
  );
}

export default function MixcloudPlayer() {
  const [active, setActive] = useState(null);

  return (
    <section id="mixcloud" className="w-full bg-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2 inline-flex items-center gap-2">
              <Headphones size={14} />
              Mixcloud
            </p>
            <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
              Mix &amp; Podcast
            </h2>
            <p className="text-white/60 text-sm md:text-base mt-6 max-w-2xl leading-relaxed">
              I miei DJ set, mashup e trasmissioni podcast. Clicca su un mix per ascoltarlo direttamente qui o aprilo su Mixcloud.
            </p>
          </div>
          <a
            href={mixcloudProfile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white text-white text-xs tracking-[0.25em] font-bold uppercase"
          >
            <ExternalLink size={14} />
            Profilo Mixcloud
          </a>
        </div>

        <FeaturedPlayer show={active} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {mixcloudShows.map((show) => (
            <ShowCard
              key={show.key}
              show={show}
              active={active?.key === show.key}
              onPlay={(s) => setActive(s)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
