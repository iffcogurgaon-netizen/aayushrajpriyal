import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import floralHero from "@/assets/floral-hero.jpg";
import mandala from "@/assets/mandala.png";
import rose from "@/assets/rose.png";
import groomAsset from "@/assets/groom-photo.jpg.asset.json";
import brideAsset from "@/assets/bride-photo.jpg.asset.json";
import musicAsset from "@/assets/soulful-wedding-instrumental.mp3.asset.json";
const groom = groomAsset.url;
const bride = brideAsset.url;
import g1Asset from "@/assets/gallery-1.jpg.asset.json";
import g2Asset from "@/assets/gallery-2.jpg.asset.json";
import g3Asset from "@/assets/gallery-3.jpg.asset.json";
import g4Asset from "@/assets/gallery-4.jpg.asset.json";
import g5Asset from "@/assets/gallery-5.jpg.asset.json";
import g6Asset from "@/assets/gallery-6.jpg.asset.json";
const g1 = g1Asset.url;
const g2 = g2Asset.url;
const g3 = g3Asset.url;
const g4 = g4Asset.url;
const g5 = g5Asset.url;
const g6 = g6Asset.url;

export const Route = createFileRoute("/")({
  component: Invitation,
});

const WEDDING_DATE = new Date("2026-06-24T16:00:00+05:30");
const VENUE_QUERY = "Hotel Shree International, Main Road, Maripur, Muzaffarpur, Bihar 842001";
const VENUE_MAPS = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}`;
const VENUE_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&output=embed`;
const MUSIC_URL = musicAsset.url;

/* ---------- Decorative ---------- */
function Petals() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 14 + Math.random() * 22,
        rotate: Math.random() * 360,
        key: i,
      })),
    [],
  );
  if (!mounted) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.key}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            top: "-10vh",
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotate}deg)`,
            animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
            backgroundImage: `url(${rose})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: 0.55,
            filter: "drop-shadow(0 4px 6px oklch(0.78 0.085 18 / 0.3))",
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      {kicker && (
        <p className="font-script text-2xl text-gold-deep md:text-3xl">{kicker}</p>
      )}
      <h2 className="font-display mt-2 text-4xl text-ink md:text-6xl">{title}</h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-gold-deep">
        <span className="h-px w-12 bg-gold-deep/40" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.39 6.95H22l-6 4.36 2.3 7.1L12 16.8 5.7 20.4 8 13.31 2 8.95h7.61L12 2z" />
        </svg>
        <span className="h-px w-12 bg-gold-deep/40" />
      </div>
    </motion.div>
  );
}

/* ---------- Opening Screen (Envelope) ---------- */
function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        backgroundImage: `linear-gradient(180deg, oklch(0.985 0.012 85 / 0.92), oklch(0.94 0.03 78 / 0.96)), url(${floralHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="animate-slow-spin pointer-events-none absolute left-1/2 top-1/2 w-[820px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 opacity-10"
      />

      {/* Envelope */}
      <motion.button
        onClick={handleOpen}
        aria-label="Open invitation"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={!opening ? { scale: 1.02, y: -4 } : {}}
        whileTap={!opening ? { scale: 0.98 } : {}}
        className="relative z-10 block"
        style={{
          width: "min(86vw, 420px)",
          aspectRatio: "1.55 / 1",
          perspective: "1400px",
        }}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.92 0.05 75), oklch(0.84 0.07 65))",
            boxShadow:
              "0 30px 60px -20px oklch(0.4 0.08 40 / 0.45), inset 0 0 0 1px oklch(0.78 0.08 60 / 0.6)",
          }}
        />
        {/* Front pocket (triangular bottom edges) */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, transparent 45%, oklch(0.88 0.06 70) 45%)",
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.9 0.055 70), oklch(0.82 0.07 60))",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.4)",
            }}
          />
          {/* Side flaps */}
          <div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.86 0.06 65) 0%, transparent 60%)",
              clipPath: "polygon(0 0, 0 100%, 100% 100%)",
              opacity: 0.7,
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                "linear-gradient(225deg, oklch(0.86 0.06 65) 0%, transparent 60%)",
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* Top flap */}
        <motion.div
          className="absolute left-0 right-0 top-0 origin-top"
          style={{
            height: "55%",
            transformStyle: "preserve-3d",
          }}
          animate={opening ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.9 0.055 72), oklch(0.82 0.075 62))",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              boxShadow: "inset 0 -1px 0 oklch(0.6 0.08 50 / 0.3)",
              backfaceVisibility: "hidden",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, oklch(0.94 0.04 78), oklch(0.88 0.06 68))",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex items-center justify-center rounded-full"
          style={{
            width: "26%",
            aspectRatio: "1",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.55 0.18 25), oklch(0.38 0.16 22) 70%, oklch(0.28 0.12 20))",
            boxShadow:
              "0 6px 14px oklch(0.2 0.08 20 / 0.55), inset 0 -3px 6px oklch(0 0 0 / 0.35), inset 0 3px 6px oklch(1 0 0 / 0.15)",
          }}
          animate={opening ? { scale: 0, opacity: 0, rotate: 25 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <div
            className="absolute inset-[8%] rounded-full"
            style={{
              border: "1px dashed oklch(0.85 0.08 70 / 0.55)",
            }}
          />
          <span
            className="font-display relative text-3xl md:text-4xl"
            style={{
              color: "oklch(0.92 0.07 75)",
              textShadow: "0 1px 2px oklch(0 0 0 / 0.5)",
            }}
          >
            A&P
          </span>
        </motion.div>

        {/* Letter peeking out */}
        <motion.div
          className="absolute left-[8%] right-[8%] rounded-sm"
          style={{
            top: "30%",
            height: "55%",
            background:
              "linear-gradient(180deg, oklch(0.98 0.01 85), oklch(0.94 0.02 80))",
            boxShadow: "0 4px 12px oklch(0.3 0.05 50 / 0.25)",
            zIndex: 5,
          }}
          animate={opening ? { y: "-55%" } : { y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </motion.button>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="font-script relative z-10 mt-10 text-2xl text-gold-deep md:text-3xl"
      >
        Tap to open invitation
      </motion.p>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mt-3 text-gold-deep"
      >
        ▾
      </motion.div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${floralHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/60 via-ivory/30 to-ivory/90" />
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="animate-slow-spin pointer-events-none absolute left-1/2 top-1/2 w-[900px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-10"
      />

      <div className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-script text-3xl text-gold-deep md:text-4xl"
        >
          ~ Save the Date ~
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display mt-4 text-6xl text-ink md:text-9xl"
        >
          Aayush <span className="text-gold-gradient">&</span> Priyal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Two souls, one promise — a celebration of love, family, and the journey we begin together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 inline-flex items-center gap-4 rounded-full glass-card px-6 py-3 text-sm tracking-[0.25em] text-ink uppercase"
        >
          24 · 06 · 2026 <span className="text-gold-deep">•</span> Muzaffarpur
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Couple ---------- */
function Couple() {
  const card = (img: string, role: string, name: string, parents: string, parentNames: string, pos: string) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="glass-card relative overflow-hidden rounded-3xl p-8 text-center"
    >
      <div className="mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-gold/40 shadow-[var(--shadow-glow)] md:h-72 md:w-72">
        <img src={img} alt={name} className="h-full w-full object-cover" style={{ objectPosition: pos }} />
      </div>
      <p className="font-script mt-6 text-2xl text-gold-deep">{role}</p>
      <h3 className="font-display mt-1 text-4xl text-ink md:text-5xl">{name}</h3>
      <div className="mx-auto my-4 h-px w-16 bg-gold-deep/40" />
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{parents}</p>
      <p className="font-display mt-2 text-xl text-ink">{parentNames}</p>
    </motion.div>
  );
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="The Couple" title="With Joyful Hearts" />
      <div className="mx-auto mt-16 grid max-w-6xl gap-10 md:grid-cols-2">
        {card(groom, "The Groom", "Aayush Raj", "Beloved Son of", "Smt. Kanchana Sobha & Shri Sanjay Kumar", "50% 25%")}
        {card(bride, "The Bride", "Dr. Priyal Komal", "Beloved Daughter of", "Dr. Puja Shekhar & Shri P. K. Dhiraj", "50% 30%")}
      </div>
    </section>
  );
}

/* ---------- Countdown ---------- */
function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target.getTime() - now);
  const ready = now !== null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, ready };
}

function Countdown() {
  const { d, h, m, s, ready } = useCountdown(WEDDING_DATE);
  const items = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Minutes" },
    { v: s, l: "Seconds" },
  ];
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="Counting the Moments" title="Until We Say Yes" />
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((it) => (
          <motion.div
            key={it.l}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card flex flex-col items-center rounded-2xl px-6 py-8"
          >
            <span
              className="font-display text-5xl md:text-6xl"
              style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", color: "transparent" }}
            >
              {ready ? String(it.v).padStart(2, "0") : "--"}
            </span>
            <span className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{it.l}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Event Details ---------- */
function EventDetails() {
  const detail = (label: string, value: string, icon: React.ReactNode) => (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
        {icon}
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="font-display mt-2 whitespace-pre-line text-xl text-ink md:text-2xl">{value}</p>
    </div>
  );
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="The Celebration" title="Ring Ceremony" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="glass-card mx-auto mt-12 max-w-5xl rounded-3xl p-10 md:p-16"
      >
        <div className="grid gap-12 md:grid-cols-3">
          {detail(
            "Date",
            "Wednesday\n24 June 2026",
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>,
          )}
          {detail(
            "Time",
            "04:00 PM\nOnwards",
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
          )}
          {detail(
            "Venue",
            "Hotel Shree International\nMain Road, Maripur\nMuzaffarpur, Bihar",
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s7-7.58 7-13a7 7 0 10-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Venue ---------- */
function Venue() {
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="Find Us" title="The Venue" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="glass-card mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl"
      >
        <div className="aspect-[16/10] w-full">
          <iframe
            title="Venue map"
            src={VENUE_EMBED}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-2xl text-ink">Hotel Shree International</p>
            <p className="mt-1 text-sm text-muted-foreground">Main Road, Maripur · Muzaffarpur, Bihar 842001</p>
          </div>
          <a
            href={VENUE_MAPS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm uppercase tracking-[0.2em] text-ivory shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            Get Directions →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Gallery ---------- */
const GALLERY = [g1, g2, g3, g4, g5, g6];
function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="Memories" title="Cherished Moments" />
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        {GALLERY.map((src, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/30 shadow-[var(--shadow-soft)]"
          >
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-2 rounded-xl ring-1 ring-inset ring-ivory/30" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={GALLERY[active]}
              alt=""
              className="max-h-[88vh] max-w-[92vw] rounded-2xl border-2 border-gold/60 shadow-2xl"
            />
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 rounded-full bg-ivory/90 p-3 text-ink"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- RSVP ---------- */
function RSVP() {
  const [form, setForm] = useState({ name: "", mobile: "", guests: "1", attending: "yes" });
  const [sent, setSent] = useState(false);
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="With Love" title="Kindly RSVP" />
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        onSubmit={(e) => {
          e.preventDefault();
          const msg =
            `*Wedding RSVP — Aayush & Priyal*%0A%0A` +
            `*Name:* ${encodeURIComponent(form.name)}%0A` +
            `*Mobile:* ${encodeURIComponent(form.mobile)}%0A` +
            `*Guests:* ${encodeURIComponent(form.guests)}%0A` +
            `*Attending:* ${form.attending === "yes" ? "Yes, with joy" : "Sadly, no"}`;
          window.open(`https://wa.me/919939290931?text=${msg}`, "_blank");
          setSent(true);
        }}
        className="glass-card mx-auto mt-12 grid max-w-2xl gap-5 rounded-3xl p-8 md:p-12"
      >
        {sent ? (
          <div className="py-10 text-center">
            <p className="font-script text-4xl text-gold-deep">Thank You!</p>
            <p className="mt-3 text-muted-foreground">Your blessings mean the world to us.</p>
          </div>
        ) : (
          <>
            <Field label="Your Name">
              <input
                required
                maxLength={80}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-gold/30 bg-ivory/70 px-4 py-3 outline-none focus:border-gold-deep"
              />
            </Field>
            <Field label="Mobile Number">
              <input
                required
                inputMode="tel"
                pattern="[0-9+\s-]{7,15}"
                maxLength={15}
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full rounded-xl border border-gold/30 bg-ivory/70 px-4 py-3 outline-none focus:border-gold-deep"
              />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Number of Guests">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full rounded-xl border border-gold/30 bg-ivory/70 px-4 py-3 outline-none focus:border-gold-deep"
                />
              </Field>
              <Field label="Attending">
                <select
                  value={form.attending}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                  className="w-full rounded-xl border border-gold/30 bg-ivory/70 px-4 py-3 outline-none focus:border-gold-deep"
                >
                  <option value="yes">Yes, with joy</option>
                  <option value="no">Sadly, no</option>
                </select>
              </Field>
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.25em] text-ivory shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-gold)" }}
            >
              Send Blessings
            </button>
          </>
        )}
      </motion.form>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

/* ---------- Families ---------- */
function Families() {
  const family = (side: string, names: string[]) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card rounded-3xl p-10 text-center"
    >
      <p className="font-script text-3xl text-gold-deep">{side}</p>
      <div className="mx-auto my-4 h-px w-16 bg-gold-deep/40" />
      <ul className="space-y-2 text-lg text-ink">
        {names.map((n) => (<li key={n} className="font-display">{n}</li>))}
      </ul>
    </motion.div>
  );
  return (
    <section className="relative px-6 py-24">
      <SectionTitle kicker="Blessings From" title="Our Beloved Families" />
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
        {family("The Groom's Family", ["Smt. Kanchana Sobha", "Shri Sanjay Kumar", "& all loving relatives"])}
        {family("The Bride's Family", ["Dr. Puja Shekhar", "Shri P. K. Dhiraj", "& all loving relatives"])}
      </div>
    </section>
  );
}

/* ---------- Closing ---------- */
function Closing() {
  return (
    <section className="relative px-6 py-32 text-center">
      <img src={mandala} alt="" aria-hidden className="animate-slow-spin mx-auto w-40 opacity-30" />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-display mx-auto mt-8 max-w-3xl text-3xl text-ink md:text-5xl"
      >
        “Your Presence Will Make Our Celebration Complete”
      </motion.p>
      <p className="mt-10 font-script text-4xl text-gold-deep md:text-6xl">
        Aayush &amp; Priyal
      </p>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        24 · 06 · 2026 · Muzaffarpur
      </p>
    </section>
  );
}

/* ---------- Music Button ---------- */
function MusicToggle({ enabled, playing, onToggle }: { enabled: boolean; playing: boolean; onToggle: () => void }) {

  if (!enabled) return null;
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-ivory shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
      style={{ background: "var(--gradient-gold)" }}
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>
      )}
    </button>
  );
}

/* ---------- Page ---------- */
function Invitation() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = () => {
    if (audioRef.current) return audioRef.current;
    if (typeof Audio === "undefined") return null;
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.42;
    audio.onplaying = () => setPlaying(true);
    audio.onpause = () => setPlaying(false);
    audio.onerror = () => setPlaying(false);
    audioRef.current = audio;
    return audio;
  };

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const playMusic = () => {
    const audio = getAudio();
    if (!audio) return;
    audio.volume = 0.42;
    void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const openInvitation = () => {
    setOpened(true);
    playMusic();
  };

  return (
    <main className="relative overflow-hidden">
      <Petals />
      <AnimatePresence>
        {!opened && <OpeningScreen onOpen={openInvitation} />}
      </AnimatePresence>

      <Hero />
      <Couple />
      <Countdown />
      <EventDetails />
      <Venue />
      <Gallery />
      <RSVP />
      <Families />
      <Closing />

      <MusicToggle enabled={opened} playing={playing} onToggle={toggleMusic} />
    </main>
  );
}
