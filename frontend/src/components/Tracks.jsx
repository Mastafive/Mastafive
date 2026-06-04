import React from "react";
import { ExternalLink, Play } from "lucide-react";
import { topTracks, spotifyArtist } from "../mock";

function ArtistCard({ artist }) {
  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black p-6 rounded-md border border-white/5">
      <div className="aspect-square overflow-hidden rounded-md mb-5 shadow-2xl">
        <img src={artist.cover} alt={`${artist.name} cover`} className="w-full h-full object-cover" />
      </div>
      <p className="text-white/60 text-xs uppercase tracking-widest">Artista</p>
      <h3 className="text-white text-3xl font-black mt-1">{artist.name}</h3>
      <p className="text-white/50 text-sm mt-2 mb-5">Top tracks</p>
      <a
        href={artist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
      >
        <Play size={14} fill="black" />
        Play on Spotify
      </a>
    </div>
  );
}

function TrackRow({ track, url }) {
  return (
    <li className="track-row group flex items-center gap-4 py-3 px-3 rounded-sm border-b border-white/5">
      <span className="text-white/40 group-hover:text-[#1DB954] text-sm w-6 font-mono transition-colors">
        {String(track.n).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm md:text-base font-semibold truncate">{track.title}</p>
          {track.explicit && (
            <span className="text-[10px] bg-white/15 text-white/80 px-1.5 py-0.5 rounded-sm font-bold">E</span>
          )}
        </div>
        <p className="text-white/50 text-xs md:text-sm truncate mt-0.5">{track.artists}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
        aria-label="Open in Spotify"
      >
        <ExternalLink size={16} />
      </a>
    </li>
  );
}

export default function Tracks() {
  return (
    <section id="musica" className="w-full bg-[#0a0a0a] py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#1DB954] text-xs tracking-[0.3em] uppercase mb-2">Spotify</p>
          <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
            Top Tracks
          </h2>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          <ArtistCard artist={spotifyArtist} />
          <ol className="space-y-1">
            {topTracks.map((t) => (
              <TrackRow key={t.title} track={t} url={spotifyArtist.url} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
