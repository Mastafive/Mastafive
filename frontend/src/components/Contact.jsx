import React, { useState } from "react";
import { Mail, Send, Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 } from "lucide-react";
import { contactData, socials } from "../mock";
import { useToast } from "../hooks/use-toast";

const ICON_MAP = { Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 };

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Campi mancanti", description: "Compila nome, email e messaggio." });
      return;
    }
    setSending(true);
    // Frontend-only: simulate send
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({ title: "Messaggio inviato!", description: "Your details were sent successfully!" });
    }, 900);
  };

  return (
    <section id="contact" className="w-full bg-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-[#e91414] text-xs tracking-[0.3em] uppercase mb-2">Get In Touch</p>
          <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight uppercase inline-block heading-accent">
            {contactData.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-3">
                {contactData.bookingLabel}
              </h3>
              <a
                href={`mailto:${contactData.bookingEmail}`}
                className="inline-flex items-center gap-3 text-white/80 hover:text-[#e91414] transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                  <Mail size={16} />
                </span>
                <span className="text-base">{contactData.bookingEmail}</span>
              </a>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-4">
                Seguimi
              </h3>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon = ICON_MAP[s.icon] || Instagram;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="social-icon w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white/90"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed border-l-2 border-[#e91414] pl-4">
              Per booking, collaborazioni musicali, direzione artistica eventi e produzione, contattami via email o tramite il form.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#e91414] outline-none text-white py-2 text-base transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#e91414] outline-none text-white py-2 text-base transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Oggetto</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#e91414] outline-none text-white py-2 text-base transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Messaggio</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#e91414] outline-none text-white py-2 text-base transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="cta-button inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white text-sm tracking-[0.25em] font-bold uppercase disabled:opacity-50"
            >
              <Send size={14} />
              {sending ? "Invio..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
