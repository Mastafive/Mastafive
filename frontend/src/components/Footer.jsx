import React from "react";
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 } from "lucide-react";
import { socials } from "../mock";

const ICON_MAP = { Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 };

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <img
            src="/assets/mastafive-logo.png"
            alt="Mastafive"
            className="h-12 w-auto object-contain"
            draggable="false"
          />
          <p className="text-white/40 text-xs tracking-widest uppercase mt-3">
            © {new Date().getFullYear()} Mastafive — All rights reserved
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = ICON_MAP[s.icon] || Instagram;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="social-icon w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
