import React, { useState } from "react";
import { ExternalLink, Disc3, Music, Users } from "lucide-react";
import { albumsAndEPs, singlesAndTracks, collaborations, spotifySearchUrl } from "../discography";

const TABS = [
  { id: "albums", label: "Album & EP", icon: Disc3, data: albumsAndEPs, count: albumsAndEPs.length },
  { id: "singles", label: "Singoli & Tracce", icon: Music, data: singlesAndTracks, count: singlesAndTracks.length },
  { id: "collab", label: "Collaborazioni", icon: Users, data: collaborations, count: collaborations.length }
];

function DiscoRow({ entry }) {
  const url = spotifySearchUrl(entry);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 md:gap-6 py-4 px-3 md:px-5 border-b border-white/5 hover:bg-white/5 transition-colors"
    >
      {entry.year && (
        <span className="text-[#e91414] text-sm md:text-base font-mono font-bold w-14 md:w-16 flex-shrink-0 pt-0.5">
          {entry.year}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-white/70 text-sm md:text-base font-semibold">
            {entry.artist}
          </span>
          <span className="text-white/30 text-sm">—</span>
          <span className="text-white text-base md:text-lg font-bold group-hover:text-[#1DB954] transition-colors">
            {entry.title}
          </span>
        </div>
        {entry.note && (
          <p className="text-white/40 text-xs md:text-sm mt-1 italic">
            {entry.note}
          </p>
        )}
      </div>
      <ExternalLink
        size={16}
        className="text-white/30 group-hover:text-[#1DB954] mt-1 flex-shrink-0 transition-colors"
      />
    </a>
  );
}

export default function Discography() {
  const [active, setActive] = useState("albums");
  const current = TABS.find((t) => t.id === active);

  return (
    <section id="discografia" className="w-full bg-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2">Discografia</p>
          <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
            30 Anni di Suoni
          </h2>
          <p className="text-white/60 text-sm md:text-base mt-6 max-w-2xl leading-relaxed">
            Album, EP, singoli, produzioni e collaborazioni dal 1994 ad oggi. Clicca su un titolo per cercarlo direttamente su Spotify.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8 border-b border-white/10 pb-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative inline-flex items-center gap-2 px-4 md:px-5 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-sm font-mono ${
                    isActive ? "bg-[#e91414] text-white" : "bg-white/10 text-white/60"
                  }`}
                >
                  {tab.count}
                </span>
                {isActive && (
                  <span className="absolute -bottom-[5px] left-0 right-0 h-[3px] bg-[#e91414]" />
                )}
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="bg-[#0a0a0a]/40 border border-white/5 rounded-sm">
          {current.data.map((entry, idx) => (
            <DiscoRow key={`${active}-${idx}`} entry={entry} />
          ))}
        </div>

        <p className="text-white/30 text-xs mt-6 text-center">
          I link aprono la ricerca sul web player di Spotify. Alcuni brani del catalogo storico potrebbero non essere disponibili in streaming.
        </p>
      </div>
    </section>
  );
}
