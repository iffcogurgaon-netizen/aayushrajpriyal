import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import floralHero from "@/assets/floral-hero.jpg";
import mandala from "@/assets/mandala.png";
import rose from "@/assets/rose.png";
import groom from "@/assets/groom.jpg";
import bride from "@/assets/bride.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  component: Invitation,
});

const WEDDING_DATE = new Date("2026-06-24T16:00:00+05:30");
const VENUE_QUERY = "Hotel Shree International, Main Road, Maripur, Muzaffarpur, Bihar 842001";
const VENUE_MAPS = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}`;
const VENUE_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&output=embed`;
// Royalty-free instrumental track
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3";

/* ---------- Decorative ---------- */
function Petals() {
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

/* ---------- Opening Screen: Sealed Envelope ---------- */
function AmbientParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        key: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.key}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: "radial-gradient(circle, oklch(0.95 0.08 80 / 0.9), transparent 70%)",
            filter: "blur(0.5px)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<"sealed" | "opening" | "done">("sealed");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stage !== "opening") return;
    const t = setTimeout(() => {
      setStage("done");
      onOpen();
    }, 2600);
    return () => clearTimeout(t);
  }, [stage, onOpen]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    setParallax({ x, y });
  };

  const breakSeal = () => {
    if (stage === "sealed") setStage("opening");
  };

  // Subtle ivory paper texture (SVG noise) as data URI
  const paper =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.92  0 0 0 0 0.84  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' fill='#faf5ea'/><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
    );

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onMouseMove={handleMove}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, oklch(0.96 0.04 80) 0%, oklch(0.9 0.045 70) 45%, oklch(0.78 0.06 55) 100%)",
      }}
    >
      {/* Warm vignette glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, oklch(1 0 0 / 0.45), transparent 55%), radial-gradient(circle at 50% 100%, oklch(0.3 0.04 50 / 0.35), transparent 60%)",
        }}
      />
      <AmbientParticles />

      <div className="relative z-10 flex w-full flex-col items-center px-5">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: stage === "sealed" ? 1 : 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="font-script mb-6 text-3xl text-gold-deep drop-shadow-sm md:mb-8 md:text-5xl"
        >
          You're Invited
        </motion.p>

        {/* Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            transition: "transform 0.4s ease-out",
          }}
          className="relative"
        >
          <div
            className="relative"
            style={{
              width: "min(86vw, 460px)",
              aspectRatio: "1.55 / 1",
              perspective: "1400px",
            }}
          >
            {/* Soft drop shadow under envelope */}
            <div
              className="absolute -bottom-8 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[50%]"
              style={{ background: "radial-gradient(ellipse, oklch(0.3 0.04 50 / 0.35), transparent 70%)", filter: "blur(14px)" }}
            />

            {/* Envelope body (back) */}
            <div
              className="absolute inset-0 rounded-[6px] overflow-hidden"
              style={{
                backgroundImage: `url("${paper}")`,
                backgroundSize: "cover",
                boxShadow:
                  "0 30px 60px -20px oklch(0.3 0.04 50 / 0.45), inset 0 0 60px oklch(0.7 0.08 60 / 0.25), inset 0 0 0 1px oklch(0.74 0.13 75 / 0.35)",
              }}
            >
              {/* Inner gold border */}
              <div
                className="absolute inset-3 rounded-[3px]"
                style={{ border: "1px solid oklch(0.74 0.13 75 / 0.55)", boxShadow: "inset 0 0 0 1px oklch(0.96 0.04 80 / 0.8)" }}
              />
              {/* Letter peeking when opening */}
              <motion.div
                initial={{ y: "20%", opacity: 0 }}
                animate={stage !== "sealed" ? { y: "-58%", opacity: 1 } : { y: "20%", opacity: 0 }}
                transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-[6%] right-[6%] top-[8%] bottom-[8%] rounded-[4px] z-10"
                style={{
                  backgroundImage: `url("${paper}")`,
                  backgroundSize: "cover",
                  boxShadow: "0 14px 30px -10px oklch(0.3 0.04 50 / 0.4), inset 0 0 0 1px oklch(0.74 0.13 75 / 0.4)",
                }}
              >
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <p className="font-script text-xl text-gold-deep md:text-2xl">Aayush Raj</p>
                  <span className="my-1 text-gold-deep">&</span>
                  <p className="font-script text-xl text-gold-deep md:text-2xl">Priyal Komal</p>
                  <div className="mt-2 h-px w-16 bg-gold-deep/50" />
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ink/70 md:text-xs">
                    24 · 06 · 2026
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom triangular pockets (visual depth) */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(to top right, oklch(0.86 0.06 75) 49.7%, transparent 50%) bottom left / 50% 60% no-repeat, linear-gradient(to top left, oklch(0.86 0.06 75) 49.7%, transparent 50%) bottom right / 50% 60% no-repeat",
                opacity: 0.55,
                mixBlendMode: "multiply",
              }}
            />

            {/* Top flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={stage !== "sealed" ? { rotateX: -178 } : { rotateX: 0 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              className="absolute left-0 right-0 top-0 origin-top z-20"
              style={{
                height: "62%",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="h-full w-full"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backgroundImage: `linear-gradient(180deg, oklch(0.93 0.05 78), oklch(0.84 0.07 70)), url("${paper}")`,
                  backgroundBlendMode: "multiply",
                  backgroundSize: "cover",
                  boxShadow: "inset 0 0 30px oklch(0.6 0.1 60 / 0.25)",
                  filter: "drop-shadow(0 4px 6px oklch(0.3 0.04 50 / 0.25))",
                }}
              />
            </motion.div>

            {/* Wax Seal */}
            <motion.button
              onClick={breakSeal}
              disabled={stage !== "sealed"}
              aria-label="Tap the seal to open invitation"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.1, duration: 0.7, type: "spring", stiffness: 120 }}
              whileHover={stage === "sealed" ? { scale: 1.06 } : {}}
              whileTap={stage === "sealed" ? { scale: 0.94 } : {}}
              className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
              style={{ width: "min(26vw, 130px)", aspectRatio: "1" }}
            >
              {/* Seal halves split on click */}
              <motion.div
                animate={stage !== "sealed" ? { x: -60, rotate: -25, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
                style={{ clipPath: "polygon(0 0, 52% 0, 46% 100%, 0 100%)" }}
              >
                <SealFace />
              </motion.div>
              <motion.div
                animate={stage !== "sealed" ? { x: 60, rotate: 25, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
                style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 46% 100%)" }}
              >
                <SealFace />
              </motion.div>

              {/* Pulse ring when sealed */}
              {stage === "sealed" && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 0 0 oklch(0.58 0.13 65 / 0.6)" }}
                  animate={{ boxShadow: ["0 0 0 0 oklch(0.58 0.13 65 / 0.5)", "0 0 0 22px oklch(0.58 0.13 65 / 0)"] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === "sealed" ? 1 : 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="mt-10 text-xs uppercase tracking-[0.4em] text-ink/70 md:text-sm"
        >
          Tap the Seal to Open
        </motion.p>
      </div>
    </motion.div>
  );
}

function SealFace() {
  return (
    <div
      className="relative h-full w-full rounded-full"
      style={{
        background:
          "radial-gradient(circle at 30% 28%, oklch(0.55 0.18 28), oklch(0.38 0.16 25) 55%, oklch(0.28 0.13 25) 100%)",
        boxShadow:
          "0 10px 22px -6px oklch(0.2 0.05 25 / 0.55), inset 0 -6px 12px oklch(0.2 0.05 25 / 0.55), inset 0 4px 8px oklch(1 0 0 / 0.18)",
      }}
    >
      {/* drips */}
      <span
        className="absolute -left-1 top-3 h-5 w-5 rounded-full"
        style={{ background: "oklch(0.42 0.17 26)", filter: "blur(0.3px)" }}
      />
      <span
        className="absolute -right-2 bottom-4 h-6 w-6 rounded-full"
        style={{ background: "oklch(0.42 0.17 26)", filter: "blur(0.3px)" }}
      />
      <span
        className="absolute right-3 -top-1 h-3 w-3 rounded-full"
        style={{ background: "oklch(0.45 0.17 26)" }}
      />
      {/* embossed floral monogram */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full p-3"
        style={{ filter: "drop-shadow(0 1px 0 oklch(0.2 0.05 25 / 0.7))" }}
      >
        <defs>
          <radialGradient id="gold" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.92 0.1 85)" />
            <stop offset="60%" stopColor="oklch(0.78 0.13 75)" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 65)" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="url(#gold)" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="50" cy="50" r="36" strokeWidth="1" opacity="0.7" />
          <circle cx="50" cy="50" r="30" strokeWidth="0.6" opacity="0.5" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 50 + Math.cos(a) * 8;
            const y1 = 50 + Math.sin(a) * 8;
            const x2 = 50 + Math.cos(a) * 26;
            const y2 = 50 + Math.sin(a) * 26;
            return (
              <g key={i}>
                <path
                  d={`M${x1} ${y1} Q ${50 + Math.cos(a + 0.3) * 18} ${50 + Math.sin(a + 0.3) * 18} ${x2} ${y2}`}
                />
                <circle cx={x2} cy={y2} r="1.4" fill="url(#gold)" stroke="none" />
              </g>
            );
          })}
        </g>
        <g fill="url(#gold)">
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="22"
            fontWeight="600"
            letterSpacing="1"
          >
            A&P
          </text>
        </g>
      </svg>
    </div>
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
  const card = (img: string, role: string, name: string, parents: string, parentNames: string) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="glass-card relative overflow-hidden rounded-3xl p-8 text-center"
    >
      <div className="mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-gold/40 shadow-[var(--shadow-glow)] md:h-72 md:w-72">
        <img src={img} alt={name} className="h-full w-full object-cover" />
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
        {card(groom, "The Groom", "Aayush Raj", "Beloved Son of", "Dr. Kanchana Sobha & Sanjay Kumar")}
        {card(bride, "The Bride", "Priyal Komal", "Beloved Daughter of", "Dr. Puja Shekhar & P. K. Dhiraj")}
      </div>
    </section>
  );
}

/* ---------- Countdown ---------- */
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function Countdown() {
  const { d, h, m, s } = useCountdown(WEDDING_DATE);
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
              {String(it.v).padStart(2, "0")}
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
      <SectionTitle kicker="The Celebration" title="Ring Ceremony & Shubh Sagun" />
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
      <div className="mx-auto mt-12 max-w-6xl columns-1 gap-4 sm:columns-2 md:columns-3 [column-fill:_balance]">
        {GALLERY.map((src, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            onClick={() => setActive(i)}
            className="mb-4 block w-full overflow-hidden rounded-2xl border border-gold/20 break-inside-avoid shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
          >
            <img src={src} alt={`Memory ${i + 1}`} loading="lazy" className="h-auto w-full" />
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
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
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
        {family("The Groom's Family", ["Dr. Kanchana Sobha", "Shri Sanjay Kumar", "& all loving relatives"])}
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
function MusicToggle({ enabled }: { enabled: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const a = new Audio(MUSIC_URL);
    a.loop = true;
    a.volume = 0.4;
    ref.current = a;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => { a.pause(); ref.current = null; };
  }, [enabled]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  if (!enabled) return null;
  return (
    <button
      onClick={toggle}
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
  return (
    <main className="relative overflow-hidden">
      <Petals />
      <AnimatePresence>
        {!opened && <OpeningScreen onOpen={() => setOpened(true)} />}
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

      <MusicToggle enabled={opened} />
    </main>
  );
}
