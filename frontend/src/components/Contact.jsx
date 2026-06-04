import React, { useState } from "react";
import { Mail, Send, Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 } from "lucide-react";
import { contactData, socials } from "../mock";
import { useToast } from "../hooks/use-toast";

const ICON_MAP = { Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 };

function validateForm(form) {
  if (!form.name || !form.email || !form.message) {
    return "Compila nome, email e messaggio.";
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    return "Inserisci un indirizzo email valido.";
  }
  return null;
}

function simulateSend() {
  return new Promise((resolve) => setTimeout(resolve, 900));
}

function ContactInfo() {
  return (
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
        <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-4">Seguimi</h3>
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
  );
}

function FormField({ label, name, type = "text", value, onChange, multiline = false }) {
  const sharedClasses =
    "w-full bg-transparent border-b-2 border-white/20 focus:border-[#e91414] outline-none text-white py-2 text-base transition-colors";
  return (
    <div>
      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">{label}</label>
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} rows={5} className={`${sharedClasses} resize-none`} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} className={sharedClasses} />
      )}
    </div>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(form);
    if (error) {
      toast({ title: "Campi mancanti", description: error });
      return;
    }
    setSending(true);
    await simulateSend();
    setSending(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast({ title: "Messaggio inviato!", description: "Your details were sent successfully!" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Nome" name="name" value={form.name} onChange={handleChange} />
        <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      </div>
      <FormField label="Oggetto" name="subject" value={form.subject} onChange={handleChange} />
      <FormField label="Messaggio" name="message" value={form.message} onChange={handleChange} multiline />
      <button
        type="submit"
        disabled={sending}
        className="cta-button inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white text-sm tracking-[0.25em] font-bold uppercase disabled:opacity-50"
      >
        <Send size={14} />
        {sending ? "Invio..." : "Send"}
      </button>
    </form>
  );
}

export default function Contact() {
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
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
