import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useScrolled from "../hooks/useScrolled";

const NAV_LINKS = [
  { label: "HOME", href: "/#home", type: "hash" },
  { label: "BIO", href: "/#bio", type: "hash" },
  { label: "DISCOGRAFIA", href: "/discografia", type: "route" },
  { label: "MUSICA", href: "/#musica", type: "hash" },
  { label: "GALLERY", href: "/#gallery", type: "hash" },
  { label: "CONTATTI", href: "/#contact", type: "hash" }
];

function NavLinkItem({ link, onClick, mobile }) {
  const baseAnchor =
    "text-white/80 hover:text-white text-sm tracking-widest font-semibold transition-colors relative group";
  const mobileClass = "text-white/80 hover:text-white text-base tracking-widest font-semibold";
  const className = mobile ? mobileClass : baseAnchor;

  const inner = (
    <>
      {link.label}
      {!mobile && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e91414] transition-all duration-300 group-hover:w-full" />
      )}
    </>
  );

  if (link.type === "route") {
    return (
      <Link to={link.href} onClick={onClick} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={link.href} onClick={onClick} className={className}>
      {inner}
    </a>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center group">
      <img
        src="/assets/mastafive-logo.png"
        alt="Mastafive"
        className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        draggable="false"
      />
    </Link>
  );
}

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // On non-home routes (e.g. /discografia), make the navbar always solid for readability
  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "bg-black/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Brand />

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <NavLinkItem key={l.href} link={l} />
          ))}
        </nav>

        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-white p-2"
          aria-label="toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/5">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((l) => (
              <NavLinkItem key={l.href} link={l} mobile onClick={() => setOpen(false)} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
