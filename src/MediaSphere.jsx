import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Home, BookOpen, Search, Wrench, Library, User, Moon, Sun, ChevronRight,
  ChevronDown, Award, Flame, Star, Lock, CheckCircle2, XCircle,
  AlertTriangle, ArrowRight, MessageCircle, Heart, Share2, Link2,
  Newspaper, Image as ImageIcon, FileSearch, Clock, Users, Sparkles, Shield,
  Trophy, Target, Brain, Eye, TrendingUp, Filter, Layers, Repeat, Info,
  Download, Printer, X, Play, Zap, Calendar, ThumbsUp,
  BadgeCheck, Gauge, ClipboardList, HelpCircle
} from "lucide-react";

/* ============================================================
   COLOR TOKENS — "Colour Palette Inspiration" pastel set
   (Blush / Rose / Butter / Olive / Ice / Sky)
   ============================================================ */
const C = {
  primary: "#F791A9",      // Rose — primary brand color
  primary2: "#BAD6DA",     // Sky — secondary accent
  primary3: "#E0F2F4",     // Ice — lightest tint
  accent1: "#FFE797",      // Butter — warm accent
  accent2: "#DDDD7B",      // Olive — secondary warm accent
  blush: "#FFDBDF",        // Blush — extra soft accent
  bg: "#FBF3F1",           // warm cream page background (necessary neutral)
  bgDark: "#241A1D",       // deep warm charcoal for dark mode (necessary neutral)
  cardDark: "#332428",     // card surface in dark mode
  text: "#3A2530",         // dark rose-charcoal ink — body text on light bg (necessary neutral)
  textSoft: "#7D5E68",     // muted mauve — secondary text
  textDarkBg: "#FFE797",   // Butter — body text on dark bg
  textSoftDarkBg: "#D9B8C0", // muted pastel pink-grey on dark bg
  ink: "#3A2530",          // ink — used as foreground on pastel-colored surfaces
  // Deepened variants of each pastel, for small icon glyphs / accent text on white
  // or near-transparent surfaces, where the raw pastel reads as too washed out.
  primaryDeep: "#C2486B",  // deep Rose
  primary2Deep: "#5B7F86", // deep Sky
  accent1Deep: "#B98F1E",  // deep Butter
  accent2Deep: "#8C8C2E",  // deep Olive
  blushDeep: "#C2748A",    // deep Blush
};

const gradientBrand = C.primary;      // solid Rose — primary UI color
const gradientWarm = C.accent1;       // solid Butter — warm accent for badges/highlights

/* ============================================================
   FONTS
   ============================================================ */
function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      .font-head { font-family: 'Poppins', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      @keyframes floaty { 0%,100% { transform: translateY(0px) rotate(0deg);} 50% { transform: translateY(-14px) rotate(2deg);} }
      @keyframes floaty2 { 0%,100% { transform: translateY(0px) rotate(0deg);} 50% { transform: translateY(12px) rotate(-3deg);} }
      @keyframes popin { 0% { opacity:0; transform: scale(.85) translateY(8px);} 100% { opacity:1; transform: scale(1) translateY(0);} }
      @keyframes slidein { 0% { opacity:0; transform: translateX(24px);} 100% { opacity:1; transform: translateX(0);} }
      @keyframes shimmer { 0% { background-position: -200% 0;} 100% { background-position: 200% 0;} }
      @keyframes confettiFall { 0% { transform: translateY(-10px) rotate(0deg); opacity:1;} 100% { transform: translateY(400px) rotate(720deg); opacity:0;} }
      @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(247,145,169,0.35);} 50% { box-shadow: 0 0 0 14px rgba(247,145,169,0);} }
      .animate-floaty { animation: floaty 6s ease-in-out infinite; }
      .animate-floaty2 { animation: floaty2 7s ease-in-out infinite; }
      @keyframes floaty3 { 0%,100% { transform: translate(0,0) rotate(0deg);} 50% { transform: translate(6px,-10px) rotate(-3deg);} }
      @keyframes wobble { 0%,100% { transform: rotate(-3deg);} 50% { transform: rotate(3deg);} }
      .animate-floaty3 { animation: floaty3 8s ease-in-out infinite; }
      .animate-wobble { animation: wobble 3.6s ease-in-out infinite; }
      .animate-popin { animation: popin .35s ease-out both; }
      .animate-slidein { animation: slidein .3s ease-out both; }
      .animate-pulseGlow { animation: pulseGlow 2.2s ease-in-out infinite; }

      /* Per-case motif animations — each investigation gets its own personality */
      @keyframes orbitSpin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
      @keyframes leafSway { 0%,100% { transform: rotate(-4deg) scale(1);} 50% { transform: rotate(5deg) scale(1.05);} }
      @keyframes flipCard { 0%,100% { transform: perspective(200px) rotateY(0deg);} 50% { transform: perspective(200px) rotateY(14deg);} }
      @keyframes pulseHeartBeat { 0%,100% { transform: scale(1);} 25% { transform: scale(1.12);} 40% { transform: scale(0.97);} 55% { transform: scale(1.08);} }
      @keyframes glitchShift { 0%,100% { transform: translate(0,0); filter: hue-rotate(0deg);} 20% { transform: translate(-1.5px,1px);} 40% { transform: translate(1.5px,-1px); filter: hue-rotate(20deg);} 60% { transform: translate(-1px,-1px);} 80% { transform: translate(1px,1px);} }
      @keyframes sphereDrift { 0% { transform: rotate(0deg) scale(1);} 50% { transform: rotate(180deg) scale(1.06);} 100% { transform: rotate(360deg) scale(1);} }
      .motif-orbit { animation: orbitSpin 9s linear infinite; }
      .motif-leaf { animation: leafSway 3.4s ease-in-out infinite; transform-origin: center; }
      .motif-flip { animation: flipCard 4s ease-in-out infinite; }
      .motif-pulseheart { animation: pulseHeartBeat 2.6s ease-in-out infinite; transform-origin: center; }
      .motif-glitch { animation: glitchShift 2.8s steps(1) infinite; }
      .motif-sphere { animation: sphereDrift 12s linear infinite; transform-origin: center; }
      .reduce-motion * { animation: none !important; transition: none !important; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-thumb { background: rgba(247,145,169,0.4); border-radius: 8px; }
      @media print {
        .no-print { display: none !important; }
        .print-area { box-shadow:none !important; }
        .report-backdrop { background: white !important; position: static !important; padding: 0 !important; }
      }
    `}</style>
  );
}

/* ============================================================
   STORAGE HOOK (persists across sessions, no backend)
   ============================================================ */
const DEFAULT_PROGRESS = {
  xp: 0,
  rank: "Recruit",
  completedCases: [],
  badges: [],
  streak: 1,
  lastVisit: null,
  quizzesTaken: {},
  timeSpentMin: 6,
  darkMode: false,
};

// Defensively coerce whatever was found in storage into a safe, correctly-typed
// shape. Storage may hold data from an older version of this app (different
// fields, different types) — never trust it blindly, since a wrong type here
// (e.g. badges saved as null instead of []) crashes every `.includes()`/`.map()`
// call downstream the moment this data reaches a page that reads it.
function sanitizeProgress(raw) {
  const d = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const xp = typeof d.xp === "number" && isFinite(d.xp) && d.xp >= 0 ? d.xp : 0;
  const completedCases = Array.isArray(d.completedCases) ? d.completedCases.filter((x) => typeof x === "string") : [];
  const badges = Array.isArray(d.badges) ? d.badges.filter((x) => typeof x === "string") : [];
  const quizzesTaken = d.quizzesTaken && typeof d.quizzesTaken === "object" && !Array.isArray(d.quizzesTaken) ? d.quizzesTaken : {};
  return {
    xp,
    rank: rankForXP(xp), // always recompute from xp rather than trusting a possibly-stale saved string
    completedCases,
    badges,
    streak: typeof d.streak === "number" && isFinite(d.streak) && d.streak >= 0 ? d.streak : 1,
    lastVisit: typeof d.lastVisit === "string" ? d.lastVisit : null,
    quizzesTaken,
    timeSpentMin: typeof d.timeSpentMin === "number" && isFinite(d.timeSpentMin) && d.timeSpentMin >= 0 ? d.timeSpentMin : 6,
    darkMode: typeof d.darkMode === "boolean" ? d.darkMode : false,
  };
}

function useProgress() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = localStorage.getItem("mediasphere:progress");
        const parsed = res ? JSON.parse(res) : {};
        const data = sanitizeProgress(parsed);
        const today = new Date().toDateString();
        if (data.lastVisit && data.lastVisit !== today) {
          const last = new Date(data.lastVisit);
          const diffDays = Math.round((new Date(today) - last) / 86400000);
          data.streak = diffDays === 1 ? data.streak + 1 : 1;
        }
        data.lastVisit = today;
        setProgress(data);
      } catch (e) {
        setProgress(DEFAULT_PROGRESS);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const update = useCallback((updater) => {
  setProgress((prev) => {
    const raw =
      typeof updater === "function"
        ? updater(prev)
        : { ...prev, ...updater };

    const next = sanitizeProgress(raw);

    localStorage.setItem(
      "mediasphere:progress",
      JSON.stringify(next)
    );

    return next;
  });
}, []);

return { progress, update, loaded };
}

function rankForXP(xp) {
  if (xp >= 900) return "Chief Media Investigator";
  if (xp >= 600) return "Senior Investigator";
  if (xp >= 350) return "Field Investigator";
  if (xp >= 150) return "Junior Investigator";
  return "Recruit";
}

/* ============================================================
   PRIMITIVES
   ============================================================ */
function GlassCard({ children, className = "", dark, style, ...rest }) {
  return (
    <div
      className={`rounded-3xl border shadow-xl ${className}`}
      style={{
        background: dark ? "rgba(43,20,40,0.92)" : "rgba(255,255,255,0.92)",
        borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

function ProgressBar({ value, max = 100, colorFrom = C.primary, height = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="w-full rounded-full overflow-hidden bg-black/5" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, background: colorFrom }}
      />
    </div>
  );
}

function Pill({ children, tone = "primary", dark }) {
  const tones = {
    primary: { bg: "rgba(247,145,169,0.24)", color: C.ink },
    warm: { bg: "rgba(255,231,151,0.4)", color: C.ink },
    ok: { bg: "rgba(34,197,94,0.15)", color: "#16A34A" },
    bad: { bg: "rgba(239,68,68,0.15)", color: "#DC2626" },
    neutral: { bg: dark ? "rgba(255,255,255,0.08)" : "rgba(58,37,48,0.06)", color: dark ? C.textDarkBg : C.textSoft },
  };
  const t = tones[tone] || tones.primary;
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-body"
      style={{ background: t.bg, color: t.color }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, className = "", icon: Icon, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-head font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 ${className}`}
      style={{ background: gradientBrand, color: C.ink, boxShadow: "0 10px 30px -10px rgba(247,145,169,0.6)" }}
    >
      {children}
      {Icon ? <Icon size={18} className="transition-transform group-hover:translate-x-0.5" /> : null}
    </button>
  );
}

function GhostButton({ children, onClick, className = "", icon: Icon, dark }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-head font-semibold border transition-colors ${className}`}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(58,37,48,0.12)",
        color: dark ? C.textDarkBg : C.text,
      }}
    >
      {children}
      {Icon ? <Icon size={16} /> : null}
    </button>
  );
}

/* ============================================================
   TOAST / ACHIEVEMENT POPUP + CONFETTI
   ============================================================ */
function Confetti({ show }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 1.4 + Math.random() * 1.2,
        color: [C.primary, C.primary2, C.primary3, C.accent1, C.accent2][i % 5],
        size: 6 + Math.random() * 6,
        rotate: Math.random() * 360,
      })),
    [show]
  );
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[70] overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-10px",
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.dur}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

function AchievementToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4200);
    return () => clearTimeout(t);
  }, [toast]);
  if (!toast) return null;
  return (
    <div className="fixed top-6 right-6 z-[80] animate-popin no-print">
      <GlassCard className="p-4 pr-5 flex items-center gap-3 shadow-2xl" style={{ minWidth: 280 }}>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulseGlow"
          style={{ background: gradientWarm }}
        >
          <Award size={22} style={{ color: C.ink }} />
        </div>
        <div>
          <p className="font-head font-bold text-sm" style={{ color: C.text }}>
            {toast.title}
          </p>
          <p className="font-body text-xs" style={{ color: C.textSoft }}>
            {toast.subtitle}
          </p>
        </div>
        <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100">
          <X size={16} />
        </button>
      </GlassCard>
    </div>
  );
}

/* ============================================================
   CONTENT DATA — LEARN MODULES
   ============================================================ */
const LESSONS = [
  {
    id: "algorithms",
    icon: TrendingUp,
    title: "Algorithms",
    tagline: "The invisible editor deciding what you see",
    body: "Every feed you scroll is arranged by an algorithm — software that predicts what will keep you watching. It doesn't rank posts by accuracy or importance; it ranks them by how likely you are to react, comment, or linger. That means outrage, novelty, and emotional content often rise to the top, not because they're true, but because they perform well.",
    example: "Two posts about the same event: a calm, well-sourced explainer gets 40 likes. An angry, exaggerated take gets 4,000 shares. The algorithm boosts the second one to millions of feeds — not because it's more accurate, but because it kept people engaged for longer.",
    quiz: {
      question: "Why might a false claim spread faster than a fact-checked correction?",
      options: [
        "Algorithms are programmed to prefer false information",
        "False claims are often more novel and emotionally charged, which algorithms interpret as 'engaging'",
        "Corrections are usually removed by moderators",
        "Fact-checked posts are shown only to adults",
      ],
      correct: 1,
      explanation: "Algorithms optimize for engagement signals like shares and comments. Emotionally charged or surprising claims tend to generate more of these signals than calm corrections — regardless of accuracy.",
    },
    reflection: "Think of the last post that made you feel something strong. What in the content might have made it 'engaging' to an algorithm — and does that say anything about whether it was accurate?",
  },
  {
    id: "echo-chambers",
    icon: Repeat,
    title: "Echo Chambers",
    tagline: "When everyone around you agrees with you",
    body: "An echo chamber forms when you're mostly exposed to opinions that match your own — through the people you follow, the groups you join, and the content your feed learns to show you. Over time, opposing views seem rarer and more extreme than they actually are, simply because you rarely encounter them.",
    example: "A student who follows only accounts that share one political viewpoint may come to believe 'everyone thinks this way' — even though national polling shows the country is closely split.",
    quiz: {
      question: "What's a practical way to check whether you're inside an echo chamber?",
      options: [
        "Assume your feed reflects the whole population",
        "Deliberately follow a few credible sources that hold different viewpoints and compare coverage",
        "Only trust posts with the most likes",
        "Avoid the topic altogether",
      ],
      correct: 1,
      explanation: "Deliberately diversifying your sources — while still checking their credibility — is one of the few reliable ways to notice what your usual feed leaves out.",
    },
    reflection: "List three accounts or creators you follow. Do any of them regularly disagree with you? If not, what might you be missing?",
  },
  {
    id: "filter-bubbles",
    icon: Filter,
    title: "Filter Bubbles",
    tagline: "Personalization that narrows your world",
    body: "A filter bubble is the personalized version of the internet that algorithms build around you based on your clicks, watch time, and searches. Unlike an echo chamber (which is about the people you choose to follow), a filter bubble is built automatically, often without your awareness, and can quietly narrow what you're shown over time.",
    example: "Two people search the exact same news topic on the same day. Because of different search and click histories, they see very different sets of results — each shaped to match what they already tend to click.",
    quiz: {
      question: "What distinguishes a filter bubble from an echo chamber?",
      options: [
        "They are the same thing",
        "A filter bubble is built by algorithms based on behavior; an echo chamber is built by the people and groups you choose",
        "Filter bubbles only exist on search engines",
        "Echo chambers are always intentional and filter bubbles never are",
      ],
      correct: 1,
      explanation: "Filter bubbles are algorithmic personalization; echo chambers are social. In practice they often reinforce each other.",
    },
    reflection: "Try searching a neutral topic in a private/incognito window. Does the result set look different from your normal, signed-in results?",
  },
  {
    id: "confirmation-bias",
    icon: Brain,
    title: "Confirmation Bias",
    tagline: "Why we believe what we already believe",
    body: "Confirmation bias is the tendency to notice, accept, and remember information that confirms what we already think — while dismissing or forgetting information that contradicts it. It's not a flaw unique to any group; every brain does this, which is exactly why it's worth watching for in yourself.",
    example: "Someone convinced a new phone model overheats reads one viral complaint and feels validated, while scrolling past hundreds of neutral reviews without registering them.",
    quiz: {
      question: "Which behavior best shows confirmation bias in action?",
      options: [
        "Reading sources you disagree with to test your own view",
        "Sharing a claim instantly because it matches what you already believed, without checking it",
        "Asking where a statistic originally came from",
        "Comparing a claim across three independent outlets",
      ],
      correct: 1,
      explanation: "Confirmation bias shows up as reduced scrutiny for claims that already match our beliefs — we skip the fact-check step precisely because it 'already sounds true.'",
    },
    reflection: "Recall a time you shared something quickly because it 'confirmed' what you thought. Did you check it first?",
  },
  {
    id: "halo-effect",
    icon: Star,
    title: "Halo Effect",
    tagline: "When one good trait makes everything seem trustworthy",
    body: "The halo effect happens when a positive impression in one area (attractiveness, fame, confidence, production quality) bleeds into how we judge someone's competence in an unrelated area, like medical or financial advice. A polished video with great lighting can feel more 'credible' even if the claims inside it are unverified.",
    example: "A fitness influencer with millions of followers and a glossy studio recommends a supplement. Followers assume the advice must be well-researched — because the creator seems successful and put-together, not because anyone checked the claim.",
    quiz: {
      question: "The halo effect is most dangerous when it causes people to skip which step?",
      options: [
        "Watching the whole video",
        "Verifying the claim itself, separate from how likeable or polished the source seems",
        "Liking the post",
        "Following the account",
      ],
      correct: 1,
      explanation: "The halo effect substitutes 'this person seems impressive' for 'this claim is accurate' — two very different questions.",
    },
    reflection: "Think of a creator you trust automatically. What would change if you fact-checked their next claim the way you would a stranger's?",
  },
  {
    id: "social-proof",
    icon: Users,
    title: "Social Proof",
    tagline: "If everyone's sharing it, it must be true... right?",
    body: "Social proof is the shortcut of assuming something is correct or worth doing because many other people are doing it. High like and share counts can create an illusion of consensus or credibility — even when the underlying claim has never been verified by anyone in that chain of shares.",
    example: "A post claiming a common food is 'secretly banned in Europe' spreads to 2 million shares. Almost none of those sharers checked an official source — they trusted the share count itself as evidence.",
    quiz: {
      question: "Why is a high share count not proof that a claim is accurate?",
      options: [
        "Shares are counted differently on every platform",
        "People often share based on how a claim makes them feel, not whether they verified it",
        "Only bots share false content",
        "Share counts are always faked",
      ],
      correct: 1,
      explanation: "Virality measures emotional resonance and reach, not accuracy. A claim can be shared millions of times and still be false.",
    },
    reflection: "Next time you see a high share count, pause: has anyone in that chain actually linked a source?",
  },
  {
    id: "misinformation",
    icon: AlertTriangle,
    title: "Misinformation",
    tagline: "False information shared without intent to deceive",
    body: "Misinformation is incorrect or misleading information shared by someone who often believes it's true — a friend forwarding an outdated statistic, or a well-meaning post based on an outdated study. The harm is real even when the intent isn't malicious, because false claims spread just as fast either way.",
    example: "A relative shares a years-old warning about a food recall that has long since been resolved, genuinely believing they're helping — but the outdated post keeps circulating and causing confusion.",
    quiz: {
      question: "What best defines misinformation?",
      options: [
        "Information that is deliberately fabricated to deceive for profit or influence",
        "False or inaccurate information, regardless of the sharer's intent",
        "Any opinion you disagree with",
        "Content created only by bots",
      ],
      correct: 1,
      explanation: "Misinformation is defined by inaccuracy, not intent. (Compare with disinformation, next lesson, which is defined by intent.)",
    },
    reflection: "Have you ever shared something later found to be outdated or wrong? What would have caught it earlier?",
  },
  {
    id: "disinformation",
    icon: Shield,
    title: "Disinformation",
    tagline: "False information created to deceive on purpose",
    body: "Disinformation is false information deliberately created and spread to mislead — often for political, financial, or reputational gain. Because it's intentional, disinformation campaigns are frequently more coordinated: fake accounts, doctored images, or fabricated 'leaked documents' designed to look credible at a glance.",
    example: "A fabricated 'leaked memo' with an official-looking logo circulates before an event, designed to look authentic enough to pass a quick glance — the goal isn't to be believed forever, just long enough to cause confusion at a critical moment.",
    quiz: {
      question: "What separates disinformation from misinformation?",
      options: [
        "Disinformation is always shared on social media only",
        "Disinformation is created with intent to deceive; misinformation may be shared unknowingly",
        "There is no real difference",
        "Disinformation is always illegal",
      ],
      correct: 1,
      explanation: "Intent is the key distinction. The same false claim can start as disinformation (created deliberately) and spread further as misinformation (shared by people who believe it).",
    },
    reflection: "What clues (formatting, urgency, anonymous sourcing) might suggest a document was designed to deceive rather than simply mistaken?",
  },
  {
    id: "deepfakes",
    icon: Eye,
    title: "Deepfakes",
    tagline: "AI-generated audio and video built to look real",
    body: "Deepfakes use AI to generate or alter video and audio so a person appears to say or do something they never did. As the technology improves, common tell-tale signs (odd blinking, mismatched lighting, warped background details) are becoming harder to spot with the eye alone, which is why source-checking matters more than visual inspection.",
    example: "A short clip appears to show a public figure making an inflammatory statement. It spreads for hours before anyone checks whether any legitimate news outlet has the same footage — because by the time it's debunked, it has already been seen by millions.",
    quiz: {
      question: "What's the most reliable way to check a suspicious video today?",
      options: [
        "Zoom in and look for blurry pixels",
        "Check whether any established, independent outlet has published the same footage or event",
        "Assume it's real if it has a lot of views",
        "Trust the caption describing the video",
      ],
      correct: 1,
      explanation: "As AI video quality improves, visual inspection alone becomes unreliable. Cross-checking against independent, verifiable coverage is the sturdier method.",
    },
    reflection: "If you saw a shocking video of a public figure tomorrow, what's the very first thing you'd do before sharing it?",
  },
  {
    id: "sponsored-content",
    icon: Link2,
    title: "Sponsored Content",
    tagline: "Advertising dressed as a personal opinion",
    body: "Sponsored content is paid promotion made to look like organic, personal recommendation. Regulations in many countries require disclosure (#ad, #sponsored, 'paid partnership'), but disclosures are often small, buried, or skipped entirely — and even when disclosed, the emotional trust of a familiar creator can still outweigh the reader's skepticism.",
    example: "A creator posts a heartfelt 'this changed my skin' story with a discount code buried in the caption and a tiny 'paid partnership' tag easy to miss at a glance.",
    quiz: {
      question: "Which is the strongest sign a post is sponsored, even without an explicit label?",
      options: [
        "The creator seems happy",
        "A discount code, affiliate link, or unusually enthusiastic single-product focus appears",
        "The post has good lighting",
        "The post was made on a weekend",
      ],
      correct: 1,
      explanation: "Discount codes and affiliate links are strong practical signals of a paid or commission-based relationship, even when a formal disclosure tag is missing or hard to notice.",
    },
    reflection: "Scroll your own feed for one 'personal recommendation' post. Can you find a discount code or affiliate link hiding in it?",
  },
];

/* ============================================================
   CONTENT DATA — BADGES
   ============================================================ */
const BADGE_LIBRARY = {
  "orientation-complete": { name: "Cadet Badge", desc: "Completed field orientation" },
  "source-seeker": { name: "Source Seeker", desc: "Solved The Viral Health Hack" },
  "fact-finder": { name: "Fact Finder", desc: "Solved Breaking News or Breaking Trust?" },
  "influence-investigator": { name: "Influence Investigator", desc: "Solved Sponsored... or Not?" },
  "digital-detective": { name: "Digital Detective", desc: "Solved Reality or AI?" },
  "certified-investigator": { name: "Certified Media Investigator", desc: "Solved the Final Case" },
};

/* ============================================================
   CONTENT DATA — INVESTIGATION CASES (data-driven engine)
   ============================================================ */
const CASES = [
  {
    id: "level-0",
    kind: "orientation",
    title: "Field Orientation",
    subtitle: "Learn the six habits every investigator uses",
    tag: "Training",
    difficulty: 0,
    xp: 40,
    badge: "orientation-complete",
    checklist: [
      { icon: User, title: "Check the profile", text: "Look at account age, bio, follower-to-engagement ratio, and whether the account posts about one topic obsessively — a common sign of an inauthentic or single-purpose account." },
      { icon: FileSearch, title: "Look for sources", text: "A credible claim can point to where it came from: a study, an official statement, named witnesses. 'Sources say' with nothing named is a claim, not evidence." },
      { icon: MessageCircle, title: "Read comments critically", text: "Comments can reveal doubts, corrections, or context the post itself hides — but comments can also be bought or bot-generated, so weigh them, don't trust them blindly." },
      { icon: Calendar, title: "Check publication dates", text: "Old news reposted as current is one of the most common forms of accidental misinformation. Always check when something was actually published or filmed." },
      { icon: ImageIcon, title: "Reverse image search", text: "Searching an image (or key frame of a video) can reveal where it really came from — and whether it's being recycled from an unrelated event." },
      { icon: BookOpen, title: "Read beyond the headline", text: "Headlines are optimized for clicks, not accuracy. The nuance — and the caveats — usually live in paragraph three, not the title." },
    ],
    practice: {
      prompt: "A post claims: 'BREAKING: Scientists say chocolate cures colds — doctors don't want you to know!' You have 15 seconds before deciding whether to share it. What do you check first?",
      options: [
        { text: "Share it immediately — it's about scientists, so it must be credible", correct: false, feedback: "The phrase 'doctors don't want you to know' is a classic red flag — it discourages verification instead of inviting it." },
        { text: "Look for the actual study or named researcher behind the claim", correct: true, feedback: "Exactly right. Vague authority ('scientists say') without a named source or study is one of the clearest signs a claim needs checking before it's shared." },
        { text: "Check how many likes it has", correct: false, feedback: "Like count measures engagement, not accuracy — plenty of false claims go viral precisely because they're surprising." },
      ],
    },
  },
  {
    id: "case-001",
    kind: "case",
    title: "The Viral Health Hack",
    subtitle: "An Instagram wellness post is spreading fast. Is it reliable?",
    tag: "Wellness & Health",
    difficulty: 1,
    xp: 100,
    badge: "source-seeker",
    biasesTaught: ["Authority Bias"],
    scenario:
      "An Instagram post claims a common household spice 'reverses inflammation better than prescription medication' within 48 hours. It has 340,000 likes and is being shared into group chats across your school.",
    evidence: [
      {
        icon: ImageIcon,
        title: "The Profile",
        detail:
          "@vitalitywithava — 2.1M followers, bio reads 'Certified Wellness Coach 🌿 | Not medical advice but trust me.' Account created 8 months ago. Every post promotes a different supplement.",
        flag: true,
        flagNote: "A 'certified wellness coach' credential is self-described and unverifiable, and the bio's own disclaimer contradicts the confident medical claim in the post.",
      },
      {
        icon: MessageCircle,
        title: "Top Comments",
        detail:
          "'This actually worked for my mom!! 😭' (4.2k likes) · 'My doctor never mentioned this, suspicious...' (890 likes) · 'Sourced study?' — no reply from creator after 6 months.",
        flag: true,
        flagNote: "An unanswered request for sources, sitting for six months, is a strong signal the claim was never actually backed by evidence.",
      },
      {
        icon: Link2,
        title: "Linked Article",
        detail:
          "The caption links to 'dailyvitalitynews.com' — a site with no listed authors, no 'About' page, and articles that all end in affiliate shopping links to the same spice brand.",
        flag: true,
        flagNote: "No named authors, no editorial accountability, and a direct financial incentive (affiliate links) all undermine independence.",
      },
      {
        icon: Heart,
        title: "Engagement Numbers",
        detail: "340,000 likes, 12,000 shares — but the account's average post gets roughly 40,000 likes, meaning this post is outperforming the norm by 8x.",
        flag: false,
        flagNote: "High engagement alone isn't proof of anything — it just means the claim is emotionally compelling, which is worth noting but not a verdict by itself.",
      },
    ],
    verdictOptions: ["Reliable", "Misleading", "False"],
    correctVerdict: "Misleading",
    verdictExplanation:
      "This case is a textbook example of Authority Bias: the creator borrows the appearance of medical authority ('Certified Wellness Coach') without providing verifiable credentials or peer-reviewed evidence. The claim isn't necessarily invented from nothing (spices do have some studied anti-inflammatory properties in modest amounts) but it's stretched into a dramatic, unsupported medical claim, wrapped in affiliate-marketing infrastructure. That combination makes it Misleading rather than outright fabricated (False) or trustworthy (Reliable).",
  },
  {
    id: "case-002",
    kind: "case",
    title: "Breaking News or Breaking Trust?",
    subtitle: "Three articles, one event, very different stories.",
    tag: "News Comparison",
    difficulty: 2,
    xp: 130,
    badge: "fact-finder",
    biasesTaught: ["Confirmation Bias", "Availability Heuristic"],
    scenario:
      "A local water-quality story is circulating in three different versions. Your job is to work out which is credible, which is satire, and which reads like it may be AI-generated filler.",
    evidence: [
      {
        icon: Newspaper,
        title: "Article A — 'Regional Herald'",
        detail:
          "Dated this morning. Quotes the city's water utility director by name, links the official test results PDF, and notes the levels were within federal safety limits but flags one aging pipe section for monitoring.",
        flag: false,
        flagNote: "Named officials, a linked primary document, and appropriately hedged language (not overstated) are strong credibility signals.",
      },
      {
        icon: Newspaper,
        title: "Article B — 'The Daily Provocateur'",
        detail:
          "Headline: 'City Poisons Its Own Water Supply, Officials Silent.' No named sources, no linked data, publish date is actually 14 months old (re-shared as if new), written in the outlet's known satire/opinion section footer text (easy to miss on mobile).",
        flag: true,
        flagNote: "An outdated publish date reshared as breaking news, combined with a hidden satire-section label, is a classic case of stale content being recirculated as if new.",
      },
      {
        icon: Newspaper,
        title: "Article C — 'QuickNews Now'",
        detail:
          "Generic stock photo unrelated to the actual city, repetitive filler sentences that restate the headline three different ways, no named reporter byline (just 'Staff'), oddly generic quotes attributed to 'a local resident.'",
        flag: true,
        flagNote: "Repetitive, generic phrasing with no named byline or specific attributable quotes is a common pattern in low-effort or AI-generated filler articles built to capture search traffic.",
      },
    ],
    verdictOptions: ["Article A is credible", "Article B is credible", "Article C is credible"],
    correctVerdict: "Article A is credible",
    verdictExplanation:
      "This case tests two biases at once. Availability Heuristic makes the dramatic headline in Article B feel more 'real' simply because it's more memorable and alarming — even though its date and sourcing don't hold up. Confirmation Bias can make readers who already distrust local officials more likely to accept Article B without checking its date or its satire-section origin. Article A, while less dramatic, is the one with a named official, a linked primary source, and appropriately cautious language.",
  },
  {
    id: "case-003",
    kind: "case",
    title: "Sponsored... or Not?",
    subtitle: "An influencer's 'honest review' has some hidden threads.",
    tag: "Influencer Marketing",
    difficulty: 3,
    xp: 150,
    badge: "influence-investigator",
    biasesTaught: ["Parasocial Relationships", "Social Proof", "Halo Effect"],
    scenario:
      "A lifestyle creator you've followed for years posts a tearful, personal-feeling video about a skincare brand that 'saved her confidence.' No sponsorship tag is visible in the video itself.",
    evidence: [
      {
        icon: ImageIcon,
        title: "The Post Caption",
        detail:
          "Full of personal storytelling about confidence and self-image. In tiny gray text at the very bottom of an expandable caption: 'Partner: GlowCo (code AVA20 for 20% off).'",
        flag: true,
        flagNote: "Disclosure exists but is minimized — placed after a 'Read more' fold, in a way that most viewers scrolling quickly will never see.",
      },
      {
        icon: Clock,
        title: "Story Highlights",
        detail: "The creator's Story highlights show the same brand mentioned in 9 of her last 14 posts, always with a discount code, always styled as spontaneous personal discovery.",
        flag: true,
        flagNote: "Repetition with a discount code attached is a strong practical signal of an ongoing paid partnership, regardless of how 'spontaneous' each individual post is framed.",
      },
      {
        icon: MessageCircle,
        title: "Comments",
        detail:
          "'I trust you more than any ad, love you!! ❤️' (top comment, 8.9k likes). A handful of replies further down ask 'wait is this an ad?' with no response from the creator.",
        flag: true,
        flagNote: "This is a direct example of a parasocial relationship overriding scrutiny — the audience's trust in the person is being used as a stand-in for trust in the product claim.",
      },
      {
        icon: Users,
        title: "Follower Reaction",
        detail: "Over 40,000 comments in the first hour, many simply tagging friends. Very few ask about ingredients, results timelines, or independent reviews.",
        flag: true,
        flagNote: "High-volume tagging behavior is social proof in action — the sheer number of reactions substitutes for actual product verification in many viewers' minds.",
      },
    ],
    verdictOptions: ["Genuine, unpaid recommendation", "Undisclosed or under-disclosed sponsorship", "Outright scam"],
    correctVerdict: "Undisclosed or under-disclosed sponsorship",
    verdictExplanation:
      "The evidence doesn't point to a scam — the product may work fine for some users — but it does point to sponsorship that's technically disclosed yet deliberately minimized, which functionally misleads viewers about how 'organic' the recommendation is. The Halo Effect (this creator seems relatable and honest, so the claim must be too) and Parasocial Relationships (years of one-directional trust) combine with Social Proof (everyone's tagging friends) to suppress the healthy skepticism this post would otherwise get from a stranger.",
  },
  {
    id: "case-004",
    kind: "case",
    title: "Reality or AI?",
    subtitle: "A dramatic photo is circulating. Was it ever real?",
    tag: "Visual Forensics",
    difficulty: 4,
    xp: 170,
    badge: "digital-detective",
    biasesTaught: ["Visual Misinformation"],
    scenario:
      "A striking image showing severe flood damage to a famous landmark is circulating with the caption 'This is happening RIGHT NOW and no one is covering it.'",
    evidence: [
      {
        icon: ImageIcon,
        title: "Close Inspection",
        detail:
          "Reflections in the water don't match the angle of nearby buildings. A crowd in the background has several figures with fused or oddly-shaped hands and inconsistent shadow directions.",
        flag: true,
        flagNote: "Inconsistent lighting/shadow physics and malformed hands or crowd details remain common (though shrinking) tells of AI-generated imagery.",
      },
      {
        icon: FileSearch,
        title: "Reverse Image Search",
        detail:
          "No matches on any reverse image search across news archives. The earliest appearance of this exact file is a small AI-art community page posted two weeks before the 'breaking' claim.",
        flag: true,
        flagNote: "An image with zero prior news coverage but a documented origin on an AI-art page is close to conclusive — real breaking news of this scale would appear across multiple independent outlets.",
      },
      {
        icon: Info,
        title: "Metadata",
        detail: "Available file metadata shows the image was created (not photographed) using an AI image generator, with a generation timestamp two weeks prior to the viral post.",
        flag: true,
        flagNote: "Creation metadata pointing to generative software, rather than a camera model, directly confirms the image's synthetic origin.",
      },
      {
        icon: Newspaper,
        title: "Independent Coverage",
        detail: "No major wire service (AP, Reuters, AFP) or local news outlet in the supposedly affected region has any matching report from the same timeframe.",
        flag: true,
        flagNote: "A dramatic, landmark-scale event with zero independent wire coverage is one of the strongest possible signals that the claim is fabricated.",
      },
    ],
    verdictOptions: ["Authentic photograph", "AI-generated image presented as real", "Real photo, exaggerated caption"],
    correctVerdict: "AI-generated image presented as real",
    verdictExplanation:
      "Every independent line of evidence — visual artifacts, reverse image search, file metadata, and the total absence of wire-service coverage — converges on the same conclusion. This is the core lesson of visual misinformation: as AI image quality improves, the human eye alone becomes an unreliable filter, which is exactly why cross-checking against independent sources matters more than ever.",
  },
  {
    id: "final-case",
    kind: "final",
    title: "Inside The Sphere",
    subtitle: "A full creator ecosystem. Nothing is labeled. You decide.",
    tag: "Full Ecosystem",
    difficulty: 5,
    xp: 260,
    badge: "certified-investigator",
    biasesTaught: ["Authority Bias", "Halo Effect", "Social Proof", "Confirmation Bias", "Visual Misinformation"],
    scenario:
      "Meet 'Jordan Vale' — 3.4M followers across Instagram and TikTok, a lifestyle-and-'science' creator. Over the past month Jordan has posted about a new sleep supplement, a dramatic 'leaked lab video,' and a rebuttal to critics. Some of what Jordan says is true. Some is misleading. Some is fabricated. Build your verdict from the full case file.",
    evidence: [
      {
        icon: ImageIcon,
        title: "Instagram — Bio & History",
        detail:
          "Bio: 'MSc (unaccredited online program) | Sleep Science Creator.' Account pivoted from fashion content to 'science' content 5 months ago, coinciding with the first supplement partnership post.",
        flag: true,
        flagNote: "An unaccredited credential presented in shorthand ('MSc') alongside a recent, monetization-timed pivot into a health niche both warrant scrutiny.",
      },
      {
        icon: Play,
        title: "TikTok — 'Leaked Lab Footage'",
        detail:
          "A shaky video allegedly shows a lab technician confirming the supplement's effectiveness 'off the record.' No lab name, no visible face, distorted voice. Captioned 'they tried to stop me from posting this.'",
        flag: true,
        flagNote: "Anonymous, unverifiable 'leaked' footage paired with a persecution narrative ('they tried to stop me') is a well-documented disinformation pattern designed to preempt scrutiny.",
      },
      {
        icon: Newspaper,
        title: "Website — jordanvalewellness.com",
        detail: "Cites one real, peer-reviewed 2019 sleep study — but the study tested a completely different ingredient at a different dosage than what's in the marketed supplement.",
        flag: true,
        flagNote: "This is a subtle but common tactic: linking a real, credible study that doesn't actually support the specific product being sold — technically 'sourced,' substantively misleading.",
      },
      {
        icon: MessageCircle,
        title: "Comments Across Platforms",
        detail:
          "Thousands of supportive comments, but a consistent thread of similarly-worded accounts (\"Wow this is life changing 😍\") posted within seconds of each other across multiple videos.",
        flag: true,
        flagNote: "Near-identical phrasing posted in rapid succession across multiple videos is a pattern consistent with coordinated or purchased engagement, not organic reaction.",
      },
      {
        icon: Users,
        title: "Google Search — Independent Coverage",
        detail:
          "A consumer-protection blog (unaffiliated, with named authors and disclosed methodology) tested the supplement's ingredient list against label claims and found two ingredients at roughly half the labeled dosage.",
        flag: true,
        flagNote: "An independent, methodologically transparent test contradicting the product's own label claims is strong, credible counter-evidence.",
      },
      {
        icon: ThumbsUp,
        title: "What's Actually True",
        detail:
          "Jordan genuinely has a large, real following built over years, and one core claim — that consistent sleep schedules improve focus — is well-supported general sleep science, just not specific to this product.",
        flag: false,
        flagNote: "Not every element of a case is fabricated. Separating the one accurate, general claim from the specific, unsupported product claims is itself a key investigative skill.",
      },
    ],
    verdictOptions: ["Fully reliable creator and product", "Mixed: partly true, largely misleading marketing", "Entirely fabricated persona"],
    correctVerdict: "Mixed: partly true, largely misleading marketing",
    verdictExplanation:
      "The strongest, most defensible verdict is 'mixed.' Jordan Vale is a real person with a real audience and one broadly accurate general claim about sleep — but the specific product claims rest on an unaccredited credential (Authority Bias), a fabricated 'leaked' video, a mismatched citation, coordinated-looking comments (Social Proof), and independent lab testing that contradicts the label. A binary 'totally true' or 'totally fake' verdict would miss the nuance — real investigations usually end in 'partly true, meaningfully misleading,' not a clean extreme.",
  },
];

/* ============================================================
   CASE THEMES — each investigation gets its own palette pairing,
   motif animation, and small illustration
   ============================================================ */
const CASE_THEMES = {
  "level-0": {
    gradient: C.primary, // Rose — the starting, trust-building case
    glow: "rgba(247,145,169,0.4)",
    accent: C.primaryDeep,
    motif: "orbit",
  },
  "case-001": {
    gradient: C.accent1, // Butter — warm, matches the wellness/health tone
    glow: "rgba(255,231,151,0.45)",
    accent: C.accent1Deep,
    motif: "leaf",
  },
  "case-002": {
    gradient: C.primary2, // Sky — cool, objective "news" blue
    glow: "rgba(186,214,218,0.45)",
    accent: C.primary2Deep,
    motif: "flip",
  },
  "case-003": {
    gradient: C.blush, // Blush — soft, fits the influencer/heart motif
    glow: "rgba(255,219,223,0.45)",
    accent: C.blushDeep,
    motif: "pulseHeart",
  },
  "case-004": {
    gradient: C.accent2, // Olive — the odd, glitchy one out
    glow: "rgba(221,221,123,0.45)",
    accent: C.accent2Deep,
    motif: "glitch",
  },
  "final-case": {
    gradient: C.primary3, // Ice — palest, ethereal, fits the drifting "sphere" motif
    glow: "rgba(224,242,244,0.5)",
    accent: C.primary2Deep,
    motif: "sphere",
  },
};

/* Small inline illustrations, palette-only, decorative — not photoreal, not IP */
function CaseIllustration({ id, size = 56, dark }) {
  const stroke = C.ink;      // main shape — dark ink reads on the light pastel circles
  const inner = "white";     // internal contrast details
  switch (id) {
    case "level-0":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="20" stroke={stroke} strokeWidth="2" opacity="0.5" />
          <circle cx="32" cy="32" r="3" fill={stroke} />
          <path d="M32 12 L36 30 L32 32 L28 30 Z" fill={stroke} opacity="0.9" />
        </svg>
      );
    case "case-001":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <path d="M32 12c10 4 14 14 10 24-3 8-11 12-18 8-6-3-8-11-4-18 3-6 8-10 12-14z" fill={stroke} opacity="0.85" />
          <path d="M32 16v30" stroke={inner} strokeWidth="1.5" opacity="0.6" />
        </svg>
      );
    case "case-002":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect x="14" y="16" width="30" height="24" rx="2" fill={stroke} opacity="0.25" transform="rotate(-6 29 28)" />
          <rect x="18" y="20" width="30" height="24" rx="2" fill={stroke} opacity="0.95" />
          <line x1="23" y1="27" x2="43" y2="27" stroke={inner} strokeWidth="1.6" />
          <line x1="23" y1="32" x2="43" y2="32" stroke={inner} strokeWidth="1.6" />
          <line x1="23" y1="37" x2="35" y2="37" stroke={inner} strokeWidth="1.6" />
        </svg>
      );
    case "case-003":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect x="20" y="10" width="24" height="42" rx="6" fill={stroke} opacity="0.9" />
          <circle cx="32" cy="30" r="7" fill={inner} opacity="0.9" />
          <path d="M32 27c1.6-2 4.6-2 5.6 0.4 0.9 2.1-1.4 4-5.6 6.6-4.2-2.6-6.5-4.5-5.6-6.6 1-2.4 4-2.4 5.6-0.4z" fill={stroke} />
        </svg>
      );
    case "case-004":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect x="14" y="14" width="26" height="26" rx="3" fill={stroke} opacity="0.35" />
          <rect x="20" y="20" width="26" height="26" rx="3" fill={stroke} opacity="0.55" />
          <rect x="26" y="26" width="26" height="26" rx="3" fill={stroke} opacity="0.95" />
          <path d="M32 34l4 4-4 4-4-4z" fill={inner} />
        </svg>
      );
    case "final-case":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="16" fill={stroke} opacity="0.9" />
          <ellipse cx="32" cy="32" rx="24" ry="9" stroke={stroke} strokeWidth="1.6" opacity="0.6" />
          <ellipse cx="32" cy="32" rx="24" ry="9" stroke={stroke} strokeWidth="1.6" opacity="0.4" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="24" ry="9" stroke={stroke} strokeWidth="1.6" opacity="0.4" transform="rotate(120 32 32)" />
        </svg>
      );
    default:
      return null;
  }
}

function motifClass(motif) {
  return {
    orbit: "motif-orbit",
    leaf: "motif-leaf",
    flip: "motif-flip",
    pulseHeart: "motif-pulseheart",
    glitch: "motif-glitch",
    sphere: "motif-sphere",
  }[motif] || "";
}

/* ============================================================
   TOOLKIT + RESOURCES DATA
   ============================================================ */
const TOOLKIT_ITEMS = [
  {
    title: "Fact-Checking Checklist",
    icon: ClipboardList,
    desc: "A 7-point checklist to run through before you share anything: source, date, author, corroboration, motive, tone, and original context.",
  },
  {
    title: "Source Credibility Checklist",
    icon: Shield,
    desc: "How to evaluate whether a website, account, or outlet has the editorial structure (named authors, corrections policy, funding transparency) of a credible source.",
  },
  {
    title: "Reverse Image Search Guide",
    icon: ImageIcon,
    desc: "Step-by-step walkthrough for tracing an image or video frame back to its original context using free, publicly available tools.",
  },
  {
    title: "Critical Thinking Flowchart",
    icon: Layers,
    desc: "A decision-tree style flowchart: start with 'does this make me feel something strong?' and end at 'safe to share,' 'needs more checking,' or 'do not share.'",
  },
  {
    title: "Teacher Guide",
    icon: BookOpen,
    desc: "Lesson-plan companion for using The Media Sphere in a classroom setting, including discussion prompts for each Learn module.",
  },
  {
    title: "Parent Guide",
    icon: Users,
    desc: "A plain-language guide for parents on how algorithms and misinformation work, plus conversation starters for talking with teens about their feeds.",
  },
];

const RESOURCE_LINKS = [
  { name: "News Literacy Project", desc: "Nonprofit providing programs and resources that teach how to know what to trust in the digital age.", url: "https://newslit.org" },
  { name: "First Draft", desc: "Research and training on the spread of misinformation, verification, and reporting in the digital age.", url: "https://firstdraftnews.org" },
  { name: "Poynter's MediaWiki / IFCN", desc: "The International Fact-Checking Network, home to global fact-checking standards and a directory of verified fact-checkers.", url: "https://www.poynter.org/ifcn/" },
  { name: "Common Sense Media", desc: "Independent nonprofit offering media ratings and digital-literacy resources for families and educators.", url: "https://www.commonsensemedia.org" },
  { name: "AllSides", desc: "Media bias ratings that let you compare how the same story is covered across the political spectrum.", url: "https://www.allsides.com" },
  { name: "Google Reverse Image Search / TinEye", desc: "Free tools for tracing where an image first appeared online.", url: "https://images.google.com" },
];

/* ============================================================
   NAVIGATION
   ============================================================ */
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "investigations", label: "Investigations", icon: Search },
  { id: "toolkit", label: "Toolkit", icon: Wrench },
  { id: "resources", label: "Resources", icon: Library },
  { id: "profile", label: "Profile", icon: User },
];

function NavBar({ view, setView, dark, setDark, progress }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 no-print">
      <div
        className="border-b"
        style={{
          background: dark ? "rgba(27,10,25,0.96)" : "rgba(255,244,235,0.96)",
          borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-2 font-head font-extrabold text-lg"
            style={{ color: dark ? "white" : C.text }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: gradientBrand }}
            >
              <Sparkles size={16} style={{ color: C.ink }} />
            </div>
            The Media Sphere
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-body font-semibold transition-colors"
                  style={{
                    color: active ? C.ink : dark ? C.textSoftDarkBg : C.textSoft,
                    background: active ? gradientBrand : "transparent",
                  }}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.05)" }}>
              <Flame size={14} style={{ color: C.accent2Deep }} />
              <span className="text-xs font-bold font-body" style={{ color: dark ? "white" : C.text }}>{progress.streak}d</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.05)" }}>
              <Zap size={14} style={{ color: C.primaryDeep }} />
              <span className="text-xs font-bold font-body" style={{ color: dark ? "white" : C.text }}>{progress.xp} XP</span>
            </div>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(58,37,48,0.06)" }}
            >
              {dark ? <Sun size={16} color="white" /> : <Moon size={16} color={C.text} />}
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(58,37,48,0.06)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              <Layers size={16} color={dark ? "white" : C.text} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden px-5 pb-3 flex flex-wrap gap-2 animate-slidein">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-body font-semibold"
                  style={{ color: active ? C.ink : dark ? C.textSoftDarkBg : C.textSoft, background: active ? gradientBrand : dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.05)" }}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
const WHY_CARDS = [
  { icon: TrendingUp, title: "Algorithms", text: "Feeds are ranked for engagement, not accuracy — learn to spot the difference." },
  { icon: AlertTriangle, title: "Misinformation", text: "False claims spread 6x faster than corrections. Speed isn't proof." },
  { icon: Eye, title: "AI-Generated Media", text: "Deepfakes and AI images are getting harder to catch by eye alone." },
  { icon: Users, title: "Social Influence", text: "Parasocial trust and social proof can quietly override your judgment." },
  { icon: Brain, title: "Confirmation Bias", text: "We scrutinize claims we disagree with far more than ones we already believe." },
];

function HomePage({ setView, dark }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-16 pb-24">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: dark ? C.bgDark : C.bg }}
        />
        {/* floating decorative elements — trimmed to 4 for performance */}
        <div className="hidden md:block absolute top-20 left-[6%] animate-floaty">
          <GlassCard dark={dark} className="p-3 w-40">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full" style={{ background: gradientBrand }} />
              <div className="h-2 w-16 rounded-full" style={{ background: dark ? "rgba(255,255,255,0.15)" : "rgba(58,37,48,0.12)" }} />
            </div>
            <div className="h-2 w-full rounded-full mb-1" style={{ background: dark ? "rgba(255,255,255,0.1)" : "rgba(58,37,48,0.08)" }} />
            <div className="flex items-center gap-3 mt-2">
              <Heart size={12} style={{ color: C.primaryDeep }} />
              <MessageCircle size={12} style={{ color: C.primaryDeep }} />
              <Share2 size={12} style={{ color: C.primary2Deep }} />
            </div>
          </GlassCard>
        </div>
        <div className="hidden md:block absolute top-72 left-[10%] animate-floaty2">
          <GlassCard dark={dark} className="p-2.5 flex items-center gap-2">
            <ImageIcon size={14} style={{ color: C.primaryDeep }} />
            <div className="h-1.5 w-14 rounded-full" style={{ background: dark ? "rgba(255,255,255,0.15)" : "rgba(58,37,48,0.1)" }} />
          </GlassCard>
        </div>
        <div className="hidden md:block absolute top-36 right-[6%] animate-floaty2">
          <GlassCard dark={dark} className="p-3 flex items-center gap-2">
            <AlertTriangle size={16} style={{ color: C.accent1Deep }} />
            <span className="text-xs font-body font-semibold" style={{ color: dark ? "white" : C.text }}>Unverified claim</span>
          </GlassCard>
        </div>
        <div className="hidden md:block absolute bottom-24 right-[10%] animate-floaty2">
          <GlassCard dark={dark} className="p-2.5">
            <Sparkles size={16} style={{ color: C.primary2Deep }} />
          </GlassCard>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <Pill dark={dark}>
            <Sparkles size={12} /> A detective-style media literacy program
          </Pill>
          <h1 className="font-head font-extrabold mt-6 text-5xl sm:text-6xl leading-[1.05] tracking-tight" style={{ color: dark ? "white" : C.text }}>
            The Media Sphere
          </h1>
          <p className="font-head font-semibold text-xl sm:text-2xl mt-4" style={{ color: dark ? C.primary3 : gradientBrand }}>
            Think Beyond the Feed.
          </p>
          <p className="font-body mt-5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
            Learn to spot misinformation, decode algorithms, and catch AI-generated fakes — by solving real detective-style investigations, not reading a textbook.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <PrimaryButton onClick={() => setView("investigations")} icon={ArrowRight}>
              Begin Investigation
            </PrimaryButton>
            <GhostButton onClick={() => setView("learn")} dark={dark} icon={BookOpen}>
              Start with Learn
            </GhostButton>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="px-5 py-16 max-w-6xl mx-auto">
        <h2 className="font-head font-bold text-3xl text-center" style={{ color: dark ? "white" : C.text }}>
          Why Media Literacy Matters
        </h2>
        <p className="font-body text-center mt-2 max-w-lg mx-auto" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
          Five forces shape everything you see online — most of them invisible until you know how to look.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {WHY_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <GlassCard key={i} dark={dark} className="p-5 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3" style={{ background: i % 2 === 0 ? gradientBrand : gradientWarm }}>
                  <Icon size={20} style={{ color: C.ink }} />
                </div>
                <h3 className="font-head font-bold text-base" style={{ color: dark ? "white" : C.text }}>{c.title}</h3>
                <p className="font-body text-sm mt-1.5 leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{c.text}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-16 max-w-4xl mx-auto text-center">
        <h2 className="font-head font-bold text-3xl" style={{ color: dark ? "white" : C.text }}>How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
          {[
            { icon: BookOpen, label: "Learn", desc: "Bite-sized interactive lessons" },
            { icon: Search, label: "Investigate", desc: "Solve real detective-style cases" },
            { icon: Trophy, label: "Get Certified", desc: "Become a Media Investigator" },
          ].map((step, i, arr) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <GlassCard dark={dark} className="p-6 w-full md:w-56">
                  <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-3" style={{ background: gradientBrand }}>
                    <Icon size={22} style={{ color: C.ink }} />
                  </div>
                  <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>{step.label}</p>
                  <p className="font-body text-xs mt-1" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{step.desc}</p>
                </GlassCard>
                {i < arr.length - 1 && (
                  <ChevronRight className="hidden md:block rotate-0 md:rotate-0" size={22} style={{ color: dark ? C.textSoftDarkBg : C.textSoft }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-20 max-w-4xl mx-auto">
        <GlassCard dark={dark} className="p-8 text-center" style={{ background: gradientBrand }}>
          <h3 className="font-head font-extrabold text-2xl" style={{ color: C.ink }}>Ready to see what your feed isn't telling you?</h3>
          <p className="font-body mt-2" style={{ color: C.ink, opacity: 0.85 }}>Start with Field Orientation — it takes about 5 minutes.</p>
          <div className="mt-5">
            <button
              onClick={() => setView("investigations")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-head font-bold bg-white hover:scale-[1.03] transition-transform"
              style={{ color: C.primaryDeep }}
            >
              Begin Investigation <ArrowRight size={18} />
            </button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

/* ============================================================
   LEARN PAGE
   ============================================================ */
function LessonCard({ lesson, dark, quizState, onQuizAnswer }) {
  const [open, setOpen] = useState(false);
  const Icon = lesson.icon;
  const answered = quizState !== undefined;
  const isCorrect = quizState === lesson.quiz.correct;

  return (
    <GlassCard dark={dark} className="overflow-hidden">
      <button className="w-full text-left p-5 flex items-center gap-4" onClick={() => setOpen((v) => !v)}>
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: gradientBrand }}>
          <Icon size={20} style={{ color: C.ink }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>{lesson.title}</p>
          <p className="font-body text-xs mt-0.5" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{lesson.tagline}</p>
        </div>
        {answered && (
          <span className="flex-shrink-0">
            {isCorrect ? <CheckCircle2 size={18} style={{ color: "#16A34A" }} /> : <CheckCircle2 size={18} style={{ color: C.accent2Deep }} />}
          </span>
        )}
        <ChevronDown size={18} className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: dark ? C.textSoftDarkBg : C.textSoft }} />
      </button>
      {open && (
        <div className="px-5 pb-6 animate-slidein">
          <p className="font-body text-sm leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{lesson.body}</p>

          <div className="mt-4 p-4 rounded-2xl" style={{ background: dark ? "rgba(247,145,169,0.12)" : "rgba(247,145,169,0.06)" }}>
            <p className="font-head font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: C.primaryDeep }}>Example</p>
            <p className="font-body text-sm leading-relaxed" style={{ color: dark ? C.textDarkBg : C.text }}>{lesson.example}</p>
          </div>

          <div className="mt-5">
            <p className="font-head font-semibold text-sm mb-2 flex items-center gap-1.5" style={{ color: dark ? "white" : C.text }}>
              <HelpCircle size={14} /> Quick check
            </p>
            <p className="font-body text-sm mb-3" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{lesson.quiz.question}</p>
            <div className="space-y-2">
              {lesson.quiz.options.map((opt, i) => {
                const selected = quizState === i;
                let style = { borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(58,37,48,0.1)" };
                if (answered && i === lesson.quiz.correct) style = { borderColor: "#16A34A", background: "rgba(34,197,94,0.08)" };
                else if (selected && i !== lesson.quiz.correct) style = { borderColor: "#DC2626", background: "rgba(239,68,68,0.08)" };
                return (
                  <button
                    key={i}
                    disabled={answered}
                    onClick={() => onQuizAnswer(lesson.id, i)}
                    className="w-full text-left p-3 rounded-xl border text-sm font-body transition-colors disabled:cursor-default"
                    style={{ color: dark ? C.textDarkBg : C.text, ...style }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="mt-3 p-3 rounded-xl animate-popin" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(58,37,48,0.04)" }}>
                <p className="font-body text-xs leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
                  <span className="font-semibold" style={{ color: isCorrect ? "#16A34A" : C.accent2 }}>{isCorrect ? "Correct — " : "Not quite — "}</span>
                  {lesson.quiz.explanation}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 flex items-start gap-2 p-4 rounded-2xl" style={{ background: dark ? "rgba(255,231,151,0.08)" : "rgba(255,231,151,0.15)" }}>
            <Brain size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.accent2Deep }} />
            <div>
              <p className="font-head font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: C.accent2Deep }}>Reflect</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: dark ? C.textDarkBg : C.text }}>{lesson.reflection}</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

function LearnPage({ dark, progress, update }) {
  const quizzesTaken = progress.quizzesTaken || {};

  const onQuizAnswer = (lessonId, idx) => {
    if (quizzesTaken[lessonId] !== undefined) return;
    const lesson = LESSONS.find((l) => l.id === lessonId);
    const correct = idx === lesson.quiz.correct;
    update((prev) => {
      const nextQuizzes = { ...(prev.quizzesTaken || {}), [lessonId]: idx };
      return { ...prev, quizzesTaken: nextQuizzes, xp: prev.xp + (correct ? 15 : 5) };
    });
  };

  const completedCount = Object.keys(quizzesTaken).length;

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <div className="mb-8">
        <Pill dark={dark}><BookOpen size={12} /> Learn</Pill>
        <h1 className="font-head font-extrabold text-4xl mt-3" style={{ color: dark ? "white" : C.text }}>Interactive Lessons</h1>
        <p className="font-body mt-2" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
          Ten short modules covering the ideas behind everything you'll investigate later. Tap a card to expand it.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1"><ProgressBar value={completedCount} max={LESSONS.length} /></div>
          <span className="text-xs font-body font-semibold whitespace-nowrap" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{completedCount}/{LESSONS.length}</span>
        </div>
      </div>
      <div className="space-y-3">
        {LESSONS.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} dark={dark} quizState={quizzesTaken[lesson.id]} onQuizAnswer={onQuizAnswer} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   INVESTIGATIONS — CASE ENGINE
   ============================================================ */
function DifficultyStars({ n, dark, color }) {
  const c = color || C.accent1;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < n ? c : "none"}
          stroke={i < n ? C.ink : dark ? "#5A424B" : "#D9C2C8"}
          strokeWidth={i < n ? 1.25 : 1.5}
        />
      ))}
    </div>
  );
}

function OrientationCase({ caseData, dark, onComplete }) {
  const [step, setStep] = useState(0); // 0..5 checklist, 6 = practice, 7 = done
  const [practiceChoice, setPracticeChoice] = useState(null);

  const total = caseData.checklist.length;
  const done = step >= total;

  const choosePractice = (i) => {
    if (practiceChoice !== null) return;
    setPracticeChoice(i);
  };

  const finish = () => {
    onComplete({ score: practiceChoice != null && caseData.practice.options[practiceChoice].correct ? 100 : 70 });
  };

  return (
    <div>
      {!done && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            {caseData.checklist.map((_, i) => (
              <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= step ? gradientBrand : dark ? "rgba(255,255,255,0.1)" : "rgba(58,37,48,0.08)" }} />
            ))}
          </div>
          {(() => {
            const item = caseData.checklist[step];
            const Icon = item.icon;
            return (
              <GlassCard dark={dark} className="p-6 animate-popin">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: gradientBrand }}>
                  <Icon size={22} style={{ color: C.ink }} />
                </div>
                <h3 className="font-head font-bold text-lg" style={{ color: dark ? "white" : C.text }}>{item.title}</h3>
                <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{item.text}</p>
                <div className="mt-6 flex justify-end">
                  <PrimaryButton onClick={() => setStep((s) => s + 1)} icon={ChevronRight}>
                    {step === total - 1 ? "Continue to practice" : "Next habit"}
                  </PrimaryButton>
                </div>
              </GlassCard>
            );
          })()}
        </div>
      )}

      {done && (
        <GlassCard dark={dark} className="p-6 animate-popin">
          <Pill tone="warm" dark={dark}><Target size={12} /> Practice Case</Pill>
          <p className="font-body text-sm mt-3 leading-relaxed" style={{ color: dark ? C.textDarkBg : C.text }}>{caseData.practice.prompt}</p>
          <div className="mt-4 space-y-2">
            {caseData.practice.options.map((opt, i) => {
              const selected = practiceChoice === i;
              let style = { borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(58,37,48,0.1)" };
              if (practiceChoice !== null && opt.correct) style = { borderColor: "#16A34A", background: "rgba(34,197,94,0.08)" };
              else if (selected && !opt.correct) style = { borderColor: "#DC2626", background: "rgba(239,68,68,0.08)" };
              return (
                <button
                  key={i}
                  disabled={practiceChoice !== null}
                  onClick={() => choosePractice(i)}
                  className="w-full text-left p-3.5 rounded-xl border text-sm font-body transition-colors"
                  style={{ color: dark ? C.textDarkBg : C.text, ...style }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
          {practiceChoice !== null && (
            <div className="mt-3 p-3 rounded-xl animate-popin" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(58,37,48,0.04)" }}>
              <p className="font-body text-xs leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{caseData.practice.options[practiceChoice].feedback}</p>
            </div>
          )}
          {practiceChoice !== null && (
            <div className="mt-5 flex justify-end">
              <PrimaryButton onClick={finish} icon={Award}>Complete Orientation</PrimaryButton>
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}

function InvestigationCase({ caseData, dark, onComplete }) {
  const [revealed, setRevealed] = useState([]);
  const [phase, setPhase] = useState("brief"); // brief -> evidence -> verdict -> result
  const [verdict, setVerdict] = useState(null);

  const allRevealed = revealed.length === caseData.evidence.length;

  const revealNext = () => {
    setRevealed((r) => [...r, caseData.evidence[r.length]]);
  };

  const chooseVerdict = (v) => {
    setVerdict(v);
    setPhase("result");
  };

  const isCorrect = verdict === caseData.correctVerdict;

  return (
    <div>
      {phase === "brief" && (
        <GlassCard dark={dark} className="p-6 animate-popin">
          <Pill dark={dark}><FileSearch size={12} /> Case Brief</Pill>
          <p className="font-body text-sm mt-3 leading-relaxed" style={{ color: dark ? C.textDarkBg : C.text }}>{caseData.scenario}</p>
          <div className="mt-5 flex justify-end">
            <PrimaryButton onClick={() => setPhase("evidence")} icon={Search}>Begin Investigation</PrimaryButton>
          </div>
        </GlassCard>
      )}

      {phase === "evidence" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-head font-semibold text-sm" style={{ color: dark ? "white" : C.text }}>
              Evidence collected: {revealed.length}/{caseData.evidence.length}
            </p>
          </div>
          <div className="space-y-3">
            {revealed.map((ev, i) => {
              const Icon = ev.icon;
              return (
                <GlassCard key={i} dark={dark} className="p-4 animate-slidein">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: gradientBrand }}>
                      <Icon size={16} style={{ color: C.ink }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-head font-bold text-sm" style={{ color: dark ? "white" : C.text }}>{ev.title}</p>
                      <p className="font-body text-sm mt-1 leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{ev.detail}</p>
                      <div className="mt-2 flex items-start gap-1.5 p-2.5 rounded-lg" style={{ background: ev.flag ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)" }}>
                        {ev.flag ? <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#DC2626" }} /> : <Info size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#16A34A" }} />}
                        <p className="font-body text-xs leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{ev.flagNote}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
          <div className="mt-5 flex justify-end gap-2">
            {!allRevealed ? (
              <PrimaryButton onClick={revealNext} icon={Search}>Examine next evidence</PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setPhase("verdict")} icon={Gauge}>Reach a Verdict</PrimaryButton>
            )}
          </div>
        </div>
      )}

      {phase === "verdict" && (
        <GlassCard dark={dark} className="p-6 animate-popin">
          <Pill tone="warm" dark={dark}><Gauge size={12} /> Final Verdict</Pill>
          <p className="font-body text-sm mt-3" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
            Based on everything you've examined, what's your verdict?
          </p>
          <div className="mt-4 space-y-2">
            {caseData.verdictOptions.map((v, i) => (
              <button
                key={i}
                onClick={() => chooseVerdict(v)}
                className="w-full text-left p-3.5 rounded-xl border text-sm font-body font-semibold transition-colors hover:scale-[1.01]"
                style={{ borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(58,37,48,0.1)", color: dark ? C.textDarkBg : C.text }}
              >
                {v}
              </button>
            ))}
          </div>
        </GlassCard>
      )}

      {phase === "result" && (
        <GlassCard dark={dark} className="p-6 animate-popin">
          <div className="flex items-center gap-2">
            {isCorrect ? <CheckCircle2 size={20} style={{ color: "#16A34A" }} /> : <XCircle size={20} style={{ color: C.accent2Deep }} />}
            <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>
              {isCorrect ? "Verdict confirmed" : "Case reviewed"}
            </p>
          </div>
          <p className="font-body text-xs mt-1" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
            Your verdict: <span className="font-semibold">{verdict}</span> · Correct verdict: <span className="font-semibold">{caseData.correctVerdict}</span>
          </p>
          <div className="mt-4 p-4 rounded-2xl" style={{ background: dark ? "rgba(247,145,169,0.12)" : "rgba(247,145,169,0.06)" }}>
            <p className="font-head font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: C.primaryDeep }}>
              {caseData.biasesTaught.join(" · ")}
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: dark ? C.textDarkBg : C.text }}>{caseData.verdictExplanation}</p>
          </div>
          <div className="mt-5 flex justify-end">
            <PrimaryButton onClick={() => onComplete({ score: isCorrect ? 100 : 65, verdict })} icon={Award}>
              Claim reward
            </PrimaryButton>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

function CaseDetailModal({ caseData, dark, onClose, onComplete }) {
  const theme = CASE_THEMES[caseData.id] || CASE_THEMES["level-0"];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto no-print"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl my-6 animate-popin"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard dark={dark} className="p-0 overflow-hidden" style={{ background: dark ? C.cardDark : "white" }}>
          <div className="relative p-5 pr-14 overflow-hidden" style={{ background: theme.gradient }}>
            <div
              className="absolute -right-4 -top-4 w-28 h-28 rounded-full"
              style={{ background: "rgba(255,255,255,0.14)" }}
            />
            <div className="flex items-center gap-4 relative">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/25 ${motifClass(theme.motif)}`}>
                <CaseIllustration id={caseData.id} size={34} dark={false} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Pill tone="neutral"><span style={{ color: C.ink }}>{caseData.kind === "orientation" ? "Orientation" : caseData.kind === "final" ? "Final Case" : "Case File"}</span></Pill>
                  {caseData.tag && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-head font-bold uppercase tracking-wide bg-white/30" style={{ color: C.ink }}>
                      {caseData.tag}
                    </span>
                  )}
                  {caseData.difficulty > 0 && <DifficultyStars n={caseData.difficulty} dark={dark} color={C.ink} />}
                </div>
                <h2 id="case-modal-title" className="font-head font-extrabold text-xl mt-2" style={{ color: C.ink }}>{caseData.title}</h2>
                <p className="font-body text-sm mt-1" style={{ color: C.ink, opacity: 0.8 }}>{caseData.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close case" className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors">
              <X size={16} color={C.ink} />
            </button>
          </div>
          <div className="p-5 max-h-[70vh] overflow-y-auto">
            {caseData.kind === "orientation" ? (
              <OrientationCase caseData={caseData} dark={dark} onComplete={onComplete} />
            ) : (
              <InvestigationCase caseData={caseData} dark={dark} onComplete={onComplete} />
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function InvestigationsPage({ dark, progress, update, onAward, onOpenReport }) {
  const [activeCase, setActiveCase] = useState(null);
  const completed = progress.completedCases || [];

  const isUnlocked = (idx) => {
    if (idx === 0) return true;
    return completed.includes(CASES[idx - 1].id);
  };

  const handleComplete = (caseData, result) => {
    const alreadyDone = progress.completedCases.includes(caseData.id);
    update((prev) => {
      if (prev.completedCases.includes(caseData.id)) return prev;
      const nextBadges = caseData.badge && !prev.badges.includes(caseData.badge) ? [...prev.badges, caseData.badge] : prev.badges;
      const nextXP = prev.xp + caseData.xp;
      return {
        ...prev,
        completedCases: [...prev.completedCases, caseData.id],
        badges: nextBadges,
        xp: nextXP,
        rank: rankForXP(nextXP),
      };
    });
    if (!alreadyDone) {
      onAward({
        title: caseData.badge ? `${BADGE_LIBRARY[caseData.badge].name} unlocked!` : "Case complete!",
        subtitle: `+${caseData.xp} XP earned`,
      });
    }
    setActiveCase(null);
    if (caseData.kind === "final") {
      setTimeout(() => onOpenReport(result), 400);
    }
  };

  return (
    <div className="no-print max-w-4xl mx-auto px-5 py-14">
      <Pill dark={dark}><Search size={12} /> Investigations</Pill>
      <h1 className="font-head font-extrabold text-4xl mt-3" style={{ color: dark ? "white" : C.text }}>Investigation Program</h1>
      <p className="font-body mt-2" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
        Six cases, growing in difficulty. Each one plays out like a real investigation — examine evidence, weigh red flags, and reach a verdict.
      </p>

      <div className="mt-8 space-y-4">
        {CASES.map((c, idx) => {
          const unlocked = isUnlocked(idx);
          const done = completed.includes(c.id);
          const theme = CASE_THEMES[c.id] || CASE_THEMES["level-0"];
          return (
            <GlassCard
              key={c.id}
              dark={dark}
              role="button"
              tabIndex={unlocked ? 0 : -1}
              aria-disabled={!unlocked}
              aria-label={unlocked ? `Open case: ${c.title}` : `${c.title} — locked, complete the previous case first`}
              className={`p-5 flex items-center gap-4 transition-all duration-300 outline-none ${unlocked ? "hover:-translate-y-1 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#F791A9] cursor-pointer" : "opacity-60"}`}
              style={unlocked ? { boxShadow: `0 8px 24px -12px ${theme.glow}` } : undefined}
              onClick={() => unlocked && setActiveCase(c)}
              onKeyDown={(e) => {
                if (unlocked && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setActiveCase(c);
                }
              }}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden ${unlocked && !done ? motifClass(theme.motif) : ""}`}
                style={{ background: done ? "#16A34A" : unlocked ? theme.gradient : dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.08)" }}
              >
                {!unlocked ? (
                  <Lock size={20} color={dark ? "#8B7583" : "#A5899C"} />
                ) : done ? (
                  <CheckCircle2 size={22} className="text-white" />
                ) : (
                  <CaseIllustration id={c.id} size={30} dark={false} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>{c.title}</p>
                  {c.difficulty > 0 && <DifficultyStars n={c.difficulty} dark={dark} color={unlocked ? theme.accent : undefined} />}
                </div>
                {c.tag && unlocked && (
                  <span
                    className="inline-block mt-1 mb-0.5 px-2 py-0.5 rounded-full text-[10px] font-head font-bold uppercase tracking-wide"
                    style={{ color: theme.accent, background: theme.glow.replace(/0\.\d+\)/, "0.14)") }}
                  >
                    {c.tag}
                  </span>
                )}
                <p className="font-body text-xs mt-1" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{c.subtitle}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <Pill tone={done ? "ok" : "primary"} dark={dark}>{done ? "Solved" : `+${c.xp} XP`}</Pill>
                {unlocked && !done && <ChevronRight size={16} style={{ color: dark ? C.textSoftDarkBg : C.textSoft }} />}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {activeCase && (
        <CaseDetailModal
          caseData={activeCase}
          dark={dark}
          onClose={() => setActiveCase(null)}
          onComplete={(result) => handleComplete(activeCase, result)}
        />
      )}
    </div>
  );
}

/* ============================================================
   INVESTIGATION REPORT (Final Case output)
   ============================================================ */
function InvestigationReport({ report, dark, onClose, progress }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!report) return null;
  const credibilityScore = report.result?.score ?? 85;
  const rank = progress.rank;
  return (
    <div
      className="report-backdrop fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl my-6 print-area"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard dark={dark} className="p-0 overflow-hidden" style={{ background: dark ? C.cardDark : "white" }}>
          <div className="p-6" style={{ background: gradientBrand }}>
            <div className="flex items-center justify-between no-print">
              <Pill tone="neutral"><BadgeCheck size={12} /> Official Report</Pill>
              <button onClick={onClose} aria-label="Close report" className="p-2 rounded-xl bg-white/20">
                <X size={16} style={{ color: C.ink }} />
              </button>
            </div>
            <h2 id="report-modal-title" className="font-head font-extrabold text-2xl mt-3" style={{ color: C.ink }}>Investigation Report</h2>
            <p className="font-body text-sm mt-1" style={{ color: C.ink, opacity: 0.85 }}>Case: Inside The Sphere</p>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke={dark ? "rgba(255,255,255,0.1)" : "rgba(58,37,48,0.08)"} strokeWidth="8" />
                  <circle
                    cx="40" cy="40" r="34" fill="none"
                    stroke={C.primary} strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - credibilityScore / 100)}`}
                  />
                </svg>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: dark ? C.cardDark : "white" }}>
                  <span className="font-head font-extrabold text-lg" style={{ color: dark ? "white" : C.text }}>{credibilityScore}</span>
                </div>
              </div>
              <div>
                <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>Credibility Score</p>
                <p className="font-body text-xs" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>Based on verdict accuracy and evidence reviewed</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl" style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(58,37,48,0.03)" }}>
                <p className="font-head font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: C.primaryDeep }}>Evidence Collected</p>
                <p className="font-body text-sm" style={{ color: dark ? C.textDarkBg : C.text }}>6 items across Instagram, TikTok, website, comments, and independent testing</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(58,37,48,0.03)" }}>
                <p className="font-head font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: C.primaryDeep }}>Sources Checked</p>
                <p className="font-body text-sm" style={{ color: dark ? C.textDarkBg : C.text }}>Primary account, linked study, independent consumer-protection blog</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(58,37,48,0.03)" }}>
                <p className="font-head font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: C.primaryDeep }}>Skills Used</p>
                <p className="font-body text-sm" style={{ color: dark ? C.textDarkBg : C.text }}>Source checking, cross-referencing, credential verification, pattern recognition</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(58,37,48,0.03)" }}>
                <p className="font-head font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: C.primaryDeep }}>Biases Navigated</p>
                <p className="font-body text-sm" style={{ color: dark ? C.textDarkBg : C.text }}>Authority Bias, Halo Effect, Social Proof, Confirmation Bias</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl" style={{ background: "rgba(255,231,151,0.12)" }}>
              <p className="font-head font-semibold text-xs uppercase tracking-wide mb-1" style={{ color: C.accent2Deep }}>Areas for Improvement</p>
              <p className="font-body text-sm" style={{ color: dark ? C.textDarkBg : C.text }}>
                {credibilityScore >= 90
                  ? "Strong, evidence-led verdict. Keep checking metadata and independent coverage even when a claim feels obviously true or false."
                  : "Consider slowing down between individual pieces of evidence — a mixed verdict usually needs all evidence weighed together, not just the most dramatic piece."}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: gradientWarm }}>
              <div>
                <p className="font-head font-semibold text-xs uppercase tracking-wide" style={{ color: C.ink, opacity: 0.85 }}>Final Rank</p>
                <p className="font-head font-extrabold text-lg" style={{ color: C.ink }}>{rank}</p>
              </div>
              <Trophy size={28} style={{ color: C.ink }} />
            </div>

            <div className="flex justify-end gap-2 no-print">
              <GhostButton dark={dark} onClick={() => window.print()} icon={Printer}>Print / Save as PDF</GhostButton>
              <PrimaryButton onClick={onClose}>Done</PrimaryButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ============================================================
   TOOLKIT PAGE
   ============================================================ */
function ToolkitPage({ dark }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <Pill dark={dark}><Wrench size={12} /> Toolkit</Pill>
      <h1 className="font-head font-extrabold text-4xl mt-3" style={{ color: dark ? "white" : C.text }}>Investigator's Toolkit</h1>
      <p className="font-body mt-2" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
        Reference guides you can keep coming back to — built from the same habits used throughout the investigations.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {TOOLKIT_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <GlassCard key={i} dark={dark} className="p-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3" style={{ background: i % 2 === 0 ? gradientBrand : gradientWarm }}>
                <Icon size={20} style={{ color: C.ink }} />
              </div>
              <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>{item.title}</p>
              <p className="font-body text-sm mt-1.5 leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{item.desc}</p>
              <button
                onClick={() => window.print()}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-head font-semibold"
                style={{ color: C.primaryDeep }}
              >
                <Download size={13} /> View / Print guide
              </button>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   RESOURCES PAGE
   ============================================================ */
function ResourcesPage({ dark }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <Pill dark={dark}><Library size={12} /> Resources</Pill>
      <h1 className="font-head font-extrabold text-4xl mt-3" style={{ color: dark ? "white" : C.text }}>Trusted Organizations</h1>
      <p className="font-body mt-2" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
        Independent, nonprofit, and widely-cited organizations working on media literacy and fact-checking.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {RESOURCE_LINKS.map((r, i) => (
          <GlassCard key={i} dark={dark} className="p-5">
            <p className="font-head font-bold" style={{ color: dark ? "white" : C.text }}>{r.name}</p>
            <p className="font-body text-sm mt-1.5 leading-relaxed" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{r.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-head font-semibold" style={{ color: C.primaryDeep }}>
              <Link2 size={13} /> {r.url.replace("https://", "")}
            </span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE PAGE
   ============================================================ */
function ProfilePage({ dark, progress }) {
  const nextRankXP = { Recruit: 150, "Junior Investigator": 350, "Field Investigator": 600, "Senior Investigator": 900, "Chief Media Investigator": null }[progress.rank];
  const completedCount = progress.completedCases.length;

  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <Pill dark={dark}><User size={12} /> Profile</Pill>
      <h1 className="font-head font-extrabold text-4xl mt-3" style={{ color: dark ? "white" : C.text }}>Your Investigator Profile</h1>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <GlassCard dark={dark} className="p-6 md:col-span-1 text-center">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center animate-pulseGlow" style={{ background: gradientBrand }}>
            <Shield size={34} style={{ color: C.ink }} />
          </div>
          <p className="font-head font-extrabold text-lg mt-4" style={{ color: dark ? "white" : C.text }}>{progress.rank}</p>
          <p className="font-body text-xs mt-1" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{progress.xp} XP total</p>
          {nextRankXP && (
            <div className="mt-4">
              <ProgressBar value={progress.xp} max={nextRankXP} />
              <p className="font-body text-[11px] mt-1.5" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{nextRankXP - progress.xp} XP to next rank</p>
            </div>
          )}
        </GlassCard>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: "Completed Cases", value: `${completedCount}/${CASES.length}`, icon: FileSearch },
            { label: "Achievements", value: progress.badges.length, icon: Award },
            { label: "Learning Streak", value: `${progress.streak} days`, icon: Flame },
            { label: "Time Invested", value: `${progress.timeSpentMin} min`, icon: Clock },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={i} dark={dark} className="p-4">
                <Icon size={18} style={{ color: C.primaryDeep }} />
                <p className="font-head font-extrabold text-xl mt-2" style={{ color: dark ? "white" : C.text }}>{stat.value}</p>
                <p className="font-body text-xs" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{stat.label}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-head font-bold text-xl" style={{ color: dark ? "white" : C.text }}>Badges</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {Object.entries(BADGE_LIBRARY).map(([id, b]) => {
            const earned = progress.badges.includes(id);
            return (
              <GlassCard key={id} dark={dark} className={`p-4 text-center ${!earned ? "opacity-40" : ""}`}>
                <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center" style={{ background: earned ? gradientWarm : dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.08)" }}>
                  {earned ? <Award size={20} style={{ color: C.ink }} /> : <Lock size={18} color={dark ? "#8B7583" : "#A5899C"} />}
                </div>
                <p className="font-head font-bold text-sm mt-2" style={{ color: dark ? "white" : C.text }}>{b.name}</p>
                <p className="font-body text-[11px] mt-1" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>{b.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-head font-bold text-xl" style={{ color: dark ? "white" : C.text }}>Case Progress</h2>
        <div className="mt-4 space-y-2">
          {CASES.map((c) => {
            const done = progress.completedCases.includes(c.id);
            return (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(58,37,48,0.03)" }}>
                <span className="font-body text-sm" style={{ color: dark ? C.textDarkBg : C.text }}>{c.title}</span>
                {done ? <CheckCircle2 size={16} style={{ color: "#16A34A" }} /> : <Lock size={14} color={dark ? "#8B7583" : "#A5899C"} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("The Media Sphere hit a render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, padding: 24, textAlign: "center" }}>
          <div>
            <p className="font-head font-bold text-lg" style={{ color: C.text, marginBottom: 8 }}>Something went wrong.</p>
            <p className="font-body text-sm" style={{ color: C.textSoft, marginBottom: 16 }}>Your saved progress is safe — try again below.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="font-head font-semibold"
              style={{ padding: "10px 22px", borderRadius: 14, background: C.primaryDeep, color: "white", border: "none", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MediaSphereAppInner() {
  const [view, setView] = useState("home");
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [report, setReport] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { progress, update, loaded } = useProgress();

  const handleAward = (t) => {
    setToast(t);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
  };

  useEffect(() => {
    if (loaded) setDark(!!progress.darkMode);
  }, [loaded]);

  const toggleDark = (v) => {
    setDark(v);
    update((prev) => ({ ...prev, darkMode: v }));
  };

  const pageMap = {
    home: <HomePage setView={setView} dark={dark} />,
    learn: <LearnPage dark={dark} progress={progress} update={update} />,
    investigations: (
      <InvestigationsPage
        dark={dark}
        progress={progress}
        update={update}
        onAward={handleAward}
        onOpenReport={(result) => setReport({ result })}
      />
    ),
    toolkit: <ToolkitPage dark={dark} />,
    resources: <ResourcesPage dark={dark} />,
    profile: <ProfilePage dark={dark} progress={progress} />,
  };

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FontLoader />
        <div className="flex flex-col items-center gap-3 animate-popin">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: gradientBrand }}>
            <Sparkles size={20} className="text-white" />
          </div>
          <p className="font-head font-semibold text-sm" style={{ color: C.text }}>Loading The Media Sphere…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={reduceMotion ? "reduce-motion" : ""} style={{ minHeight: "100vh", background: dark ? C.bgDark : C.bg, transition: "background .3s" }}>
      <FontLoader />
      <NavBar view={view} setView={setView} dark={dark} setDark={toggleDark} progress={progress} />
      {pageMap[view]}

      <footer className="no-print px-5 py-10 text-center border-t mt-10" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(58,37,48,0.06)" }}>
        <div className="flex items-center justify-center gap-4 mb-3 flex-wrap">
          <button
            onClick={() => setReduceMotion((v) => !v)}
            className="text-xs font-body font-semibold underline underline-offset-2"
            style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}
          >
            {reduceMotion ? "Enable motion" : "Reduce motion"}
          </button>
        </div>
        <p className="font-body text-xs" style={{ color: dark ? C.textSoftDarkBg : C.textSoft }}>
          The Media Sphere · Think Beyond the Feed
        </p>
      </footer>

      <Confetti show={showConfetti} />
      <AchievementToast toast={toast} onClose={() => setToast(null)} />
      {report && <InvestigationReport report={report} dark={dark} progress={progress} onClose={() => setReport(null)} />}
    </div>
  );
}

export default function MediaSphereApp() {
  return (
    <ErrorBoundary>
      <MediaSphereAppInner />
    </ErrorBoundary>
  );
}