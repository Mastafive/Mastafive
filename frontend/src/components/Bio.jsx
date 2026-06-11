import React, { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { bioData } from "../mock";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

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

function BioSection({ section }) {
  return (
    <div data-testid="bio-section">
      <h3 className="text-white text-base md:text-lg font-black uppercase tracking-wide flex items-center gap-3">
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

function BioDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="bio-dialog"
        className="bg-[#0a0a0a] border-white/10 text-white max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-10"
      >
        <div>
          <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2">About</p>
          <DialogTitle className="heading-accent text-white text-2xl md:text-4xl font-black tracking-tight uppercase">
            {bioData.title}
          </DialogTitle>
          <p className="mt-3 text-white/90 text-sm md:text-base font-bold tracking-wide">{bioData.subtitle}</p>

          <div className="mt-6 space-y-4 text-white/75 text-[15px] leading-relaxed">
            {bioData.intro.map((p) => (
              <p key={p.slice(0, 60)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {bioData.sections.map((section) => (
              <BioSection key={section.heading} section={section} />
            ))}
          </div>

          <Link
            to={bioData.discographyLink}
            data-testid="bio-dialog-discography-link"
            className="inline-flex items-center gap-2 text-[#e91414] hover:text-white text-sm font-bold tracking-[0.2em] uppercase mt-10 transition-colors"
          >
            {bioData.discographyText}
            <ArrowRight size={16} />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Bio() {
  const [open, setOpen] = useState(false);

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

            <button
              type="button"
              data-testid="bio-preview-box"
              onClick={() => setOpen(true)}
              className="group block w-full text-left mt-6 p-6 md:p-8 bg-[#0a0a0a] border border-white/10 hover:border-[#e91414] rounded-sm transition-colors cursor-pointer"
            >
              <div className="space-y-4 text-white/75 text-[15px] leading-relaxed">
                {bioData.intro.map((p) => (
                  <p key={p.slice(0, 60)}>{p}</p>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-[#e91414] group-hover:text-white text-sm font-bold tracking-[0.2em] uppercase mt-6 transition-colors">
                <Plus size={16} />
                Leggi la biografia completa
              </span>
            </button>

            <Link
              to={bioData.discographyLink}
              data-testid="bio-discography-link"
              className="inline-flex items-center gap-2 text-[#e91414] hover:text-white text-sm font-bold tracking-[0.2em] uppercase mt-8 transition-colors"
            >
              {bioData.discographyText}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <BioDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}
