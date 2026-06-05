import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Lock, Mail, User, Calendar, Trash2, CheckCircle2, Circle, LogOut, RefreshCw, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STORAGE_KEY = "mastafive_admin_pw";

function LoginScreen({ onLogin, error, loading }) {
  const [pw, setPw] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <form
        onSubmit={(e) => { e.preventDefault(); onLogin(pw); }}
        className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-8 rounded-sm"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#e91414]/15 border border-[#e91414]/40 mx-auto mb-5">
          <Lock className="text-[#e91414]" size={22} />
        </div>
        <h1 className="text-white text-2xl font-black uppercase tracking-wider text-center">Admin</h1>
        <p className="text-white/50 text-xs text-center mt-1 tracking-widest uppercase">Messaggi contatti</p>

        <label className="block text-white/60 text-xs uppercase tracking-widest mt-8 mb-2">Password</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#e91414] outline-none text-white py-2 text-base transition-colors"
        />
        {error && (
          <p className="text-red-400 text-xs mt-3">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !pw}
          className="cta-button mt-6 w-full px-6 py-3 border-2 border-white text-white text-sm tracking-[0.25em] font-bold uppercase disabled:opacity-50"
        >
          {loading ? "Verifica..." : "Accedi"}
        </button>
        <Link to="/" className="block text-center text-white/40 hover:text-white text-xs mt-6 tracking-widest uppercase transition-colors">
          ← Torna al sito
        </Link>
      </form>
    </div>
  );
}

function MessageCard({ msg, onToggleRead, onDelete }) {
  const date = new Date(msg.created_at);
  const dateStr = date.toLocaleString("it-IT", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  return (
    <article className={`border rounded-sm p-5 md:p-6 transition-colors ${msg.read ? "border-white/5 bg-[#0a0a0a]" : "border-[#e91414]/30 bg-[#1a0000]/30"}`}>
      <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-lg font-bold flex items-center gap-2 flex-wrap">
            <User size={16} className="text-white/40" />
            <span>{msg.name}</span>
            {!msg.read && (
              <span className="text-[10px] bg-[#e91414] text-white px-2 py-0.5 rounded-sm font-bold tracking-widest">NUOVO</span>
            )}
          </h3>
          <a href={`mailto:${msg.email}`} className="text-[#e91414] hover:text-white text-sm transition-colors inline-flex items-center gap-1.5 mt-1">
            <Mail size={13} />
            {msg.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleRead(msg)}
            title={msg.read ? "Segna come da leggere" : "Segna come letto"}
            className="w-9 h-9 rounded-full border border-white/15 hover:border-[#1DB954] hover:text-[#1DB954] text-white/70 flex items-center justify-center transition-colors"
          >
            {msg.read ? <CheckCircle2 size={15} /> : <Circle size={15} />}
          </button>
          <button
            onClick={() => onDelete(msg)}
            title="Elimina"
            className="w-9 h-9 rounded-full border border-white/15 hover:border-red-500 hover:text-red-500 text-white/70 flex items-center justify-center transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </header>

      {msg.subject && (
        <p className="text-white/70 text-sm font-semibold mb-2">Oggetto: <span className="text-white">{msg.subject}</span></p>
      )}

      <p className="text-white/80 text-[15px] leading-relaxed whitespace-pre-wrap mt-3 border-l-2 border-white/10 pl-4">
        {msg.message}
      </p>

      <div className="flex items-center gap-2 text-white/40 text-xs mt-4 pt-3 border-t border-white/5">
        <Calendar size={12} />
        <span>{dateStr}</span>
      </div>
    </article>
  );
}

export default function AdminMessagesPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all"); // all | unread

  const fetchMessages = useCallback(async (pw) => {
    try {
      const res = await axios.get(`${API}/admin/contact`, { headers: { "X-Admin-Password": pw } });
      setMessages(res.data || []);
      setAuthed(true);
      setError(null);
    } catch (err) {
      if (err?.response?.status === 401) {
        setError("Password non corretta.");
        setAuthed(false);
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        setError("Errore di connessione.");
      }
      throw err;
    }
  }, []);

  // Try auto-login if password saved
  useEffect(() => {
    if (password) {
      setLoading(true);
      fetchMessages(password).catch(() => {}).finally(() => setLoading(false));
    }
  }, [password, fetchMessages]);

  const handleLogin = async (pw) => {
    setLoading(true);
    setError(null);
    try {
      await fetchMessages(pw);
      sessionStorage.setItem(STORAGE_KEY, pw);
      setPassword(pw);
    } catch (e) {
      // error already set
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setAuthed(false);
    setMessages([]);
  };

  const handleToggleRead = async (msg) => {
    try {
      await axios.patch(
        `${API}/admin/contact/${msg.id}?read=${!msg.read}`,
        null,
        { headers: { "X-Admin-Password": password } }
      );
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: !msg.read } : m)));
    } catch (e) {
      setError("Errore aggiornamento messaggio");
    }
  };

  const handleDelete = async (msg) => {
    if (!window.confirm(`Eliminare il messaggio di ${msg.name}?`)) return;
    try {
      await axios.delete(`${API}/admin/contact/${msg.id}`, { headers: { "X-Admin-Password": password } });
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    } catch (e) {
      setError("Errore eliminazione messaggio");
    }
  };

  const handleRefresh = () => {
    if (password) {
      setLoading(true);
      fetchMessages(password).catch(() => {}).finally(() => setLoading(false));
    }
  };

  if (!authed) {
    return <LoginScreen onLogin={handleLogin} error={error} loading={loading} />;
  }

  const unreadCount = messages.filter((m) => !m.read).length;
  const visible = filter === "unread" ? messages.filter((m) => !m.read) : messages;

  return (
    <main className="min-h-screen bg-black">
      <header className="border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Inbox className="text-[#e91414]" size={22} />
            <div>
              <h1 className="text-white text-lg font-black uppercase tracking-wider leading-none">Messaggi</h1>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-1">Admin Mastafive</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-3 py-2 text-xs uppercase tracking-widest text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Aggiorna</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs uppercase tracking-widest text-white/70 hover:text-red-400 border border-white/15 hover:border-red-400 transition-colors inline-flex items-center gap-2"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${filter === "all" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
          >
            Tutti ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${filter === "unread" ? "bg-[#e91414] text-white" : "text-white/60 hover:text-white"}`}
          >
            Da leggere ({unreadCount})
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {visible.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
            <Inbox className="text-white/20 mx-auto mb-3" size={48} />
            <p className="text-white/50 text-sm">
              {filter === "unread" ? "Nessun messaggio da leggere." : "Nessun messaggio ricevuto."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((msg) => (
              <MessageCard key={msg.id} msg={msg} onToggleRead={handleToggleRead} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
