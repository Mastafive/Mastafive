import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { bioData } from "../mock";

function BioImage({ src }) {
  return (
    <div className="relative md:sticky md:top-28">
      <div className="relative overflow-hidden rounded-sm shadow-2xl">
        <img src={src} alt="Mastafive Bio" className="w-full h-auto object-cover" />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-[#e91414] -z-0" />
    </div>
  );
}

function BioSection({ section }) {
  return (
    <div data-testid="bio-section">
      <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-wide flex items-center gap-3">
        <span className="inline-block w-6 h-[3px] bg-[#e91414]" />
        {section.heading}
      </h3>
      <p className="mt-3 text-white/75 text-[15px] leading-relaxed">{section.lead}</p>
      {section.items.length > 0 && (
        <ul className="mt-4 space-y-3">
          {section.items.map((item) => (
            <li key={item.label} className="text-white/75 text-[15px] leading-relaxed pl-4 border-l-2 border-white/10">
              <span className="text-white font-bold">{item.label}:</span> {item.text}
            </li>
          ))}
        </ul>
      )}
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
            <p data-testid="bio-subtitle" className="mt-4 text-white/90 text-base font-bold tracking-wide">
              {bioData.subtitle}
            </p>

            <div className="mt-6 space-y-4 text-white/75 text-[15px] leading-relaxed">
              {bioData.intro.map((p) => (
                <p key={p.slice(0, 60)}>{p}</p>
              ))}
            </div>

            <Link
              to={bioData.discographyLink}
              data-testid="bio-discography-link"
              className="inline-flex items-center gap-2 text-[#e91414] hover:text-white text-sm font-bold tracking-[0.2em] uppercase mt-6 transition-colors"
            >
              {bioData.discographyText}
              <ArrowRight size={16} />
            </Link>

            <div className="mt-12 space-y-10">
              {bioData.sections.map((section) => (
                <BioSection key={section.heading} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
