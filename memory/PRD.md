# PRD — Clone sito Mastafive (www.mastafive.com)

## Problem Statement
Clone pixel-perfect del sito www.mastafive.com (portfolio DJ/produttore). Tema nero con accenti rossi (#e91414). Lingua utente: ITALIANO.

## Architettura
- Frontend: React + Tailwind + shadcn + lucide-react + embla-carousel
- Backend: FastAPI + MongoDB (solo form contatti + admin)
- Ordine sezioni HomePage: Navbar → Hero → Bio → Mixcloud → Merch → Tracks → Gallery → Contact → Footer
- Pagine: `/` (HomePage), `/discografia`, `/admin/messaggi` (protetta)

## Implementato (cronologia)
- Clone UI completo con immagini HD originali dal CDN Wix
- Gallery con carousel Embla + lightbox custom
- Pagina Discografia con link a ricerca Spotify
- Backend form contatti (POST /api/contact) + pagina admin (GET/PATCH/DELETE /api/admin/contact, POST /api/admin/verify)
- Player Mixcloud custom (dati statici in `mixcloud.js`, 12 mix dal profilo utente)
- Riordino sezioni homepage come richiesto dall'utente
- **Giu 2026**: Sostituita la biografia con nuovo testo completo strutturato in sezioni (Etichette & Management, Radio & Podcast, Televisione, Colonne Sonore, Format Live & Eventi, Attività Live). Dati in `mock.js` → `bioData` (intro + sections con items label/text). UI in `Bio.jsx` con heading rossi e liste.
- **Giu 2026 (2)**: Bio trasformata in box cliccabile: in home si vede solo la preview (intro), click apre Dialog shadcn con la biografia completa (`Bio.jsx`). Aggiunta foto DJ B&N/rosso di fianco alla sezione Mix & Podcast (`MixcloudPlayer.jsx`, layout 2 colonne, immagine sticky `/assets/mastafive-mix.png`). Aggiunte 2 nuove foto (figura intera frontale e profilo) in cima alla gallery (`/assets/mastafive-front.png`, `/assets/mastafive-side.png` in `mock.js`).

## Note tecniche
- Password admin verificata nel backend: vedi /app/memory/test_credentials.md
- Mixcloud: snapshot statico in `mixcloud.js` (se l'utente vuole aggiornamento dinamico → creare route backend)
- Form contatti salva solo su MongoDB (nessuna email inviata)
- App deployata in produzione: https://mastafive-preview.emergent.host

## Backlog
- P2: Route backend per aggiornamento dinamico dei mix Mixcloud (solo se richiesto)
