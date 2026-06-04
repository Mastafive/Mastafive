import React from "react";
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 } from "lucide-react";
import { heroData, socials } from "../mock";

const ICON_MAP = { Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 };

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroData.djImage}
          alt="Mastafive DJ"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl fade-up">
        <div className="mb-6">
          <img
            src="/assets/mastafive-logo.png"
            alt="Mastafive Logo"
            className="logo-graffiti mx-auto w-auto h-40 sm:h-52 md:h-64 lg:h-72 object-contain"
            draggable="false"
          />
          <div className="h-1 w-24 bg-[#e91414] mx-auto mt-4" />
        </div>

        <p className="text-white/80 text-base md:text-lg tracking-[0.3em] uppercase mb-3">
          DJ &middot; Producer &middot; Composer
        </p>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mb-10">
          30 anni sul mixer. Funkie Jazz, Rap, Rock. Non c'è limite al suono.
        </p>

        <a
          href={heroData.ctaLink}
          className="cta-button inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white text-sm tracking-[0.25em] font-semibold uppercase rounded-none"
        >
          {heroData.ctaText}
        </a>

        <div className="flex items-center gap-5 mt-12">
          {socials.map((s) => {
            const Icon = ICON_MAP[s.icon] || Instagram;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="social-icon w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white/90 hover:border-[#e91414]"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
