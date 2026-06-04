import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { bioData } from "../mock";

function BioImage({ src }) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-sm shadow-2xl">
        <img src={src} alt="Mastafive Bio" className="w-full h-auto object-cover" />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-[#e91414] -z-0" />
    </div>
  );
}

function BioParagraphs({ paragraphs, cta }) {
  const [head, ...rest] = [paragraphs.slice(0, 3), paragraphs.slice(3)];
  return (
    <div className="mt-10 space-y-4 text-white/75 text-[15px] leading-relaxed">
      {head.map((p) => (
        <p key={p.slice(0, 60)}>{p}</p>
      ))}

      <Link
        to={cta.href}
        className="inline-flex items-center gap-2 text-[#e91414] hover:text-white text-sm font-bold tracking-[0.2em] uppercase mt-2 transition-colors"
      >
        {cta.text}
        <ArrowRight size={16} />
      </Link>

      {rest[0].map((p) => (
        <p key={p.slice(0, 60)}>{p}</p>
      ))}
    </div>
  );
}

export default function Bio() {
  return (
    <section id="bio" className="w-full bg-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
          <BioImage src={bioData.image} />
          <div>
            <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-3">About</p>
            <h2 className="heading-accent text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
              {bioData.title}
            </h2>
            <BioParagraphs
              paragraphs={bioData.paragraphs}
              cta={{ href: bioData.discographyLink, text: bioData.discographyText }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
