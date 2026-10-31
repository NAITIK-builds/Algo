import React, { useState, useEffect, useRef } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { soundFX } from '../../utils/SoundFX';
import { 
  Sparkles, 
  X, 
  Move, 
  Smile, 
  Flame, 
  Zap, 
  Eye, 
  Pin, 
  Minimize2,
  Heart,
  Coffee,
  Pizza,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Volume2
} from 'lucide-react';

export type OwlMood = 
  | 'peeking' 
  | 'smug' 
  | 'laughing' 
  | 'derp' 
  | 'cool' 
  | 'annoyed' 
  | 'shocked' 
  | 'eating' 
  | 'sleeping'
  | 'teasing';

interface TeaseChallenge {
  id: string;
  teaser: string;
  targetSelector: string;
  prompt: string;
  praise: string;
}

const TEASE_CHALLENGES: TeaseChallenge[] = [
  {
    id: 'traffic_jam',
    teaser: "Psst... did you learn this? Bet you don't know how to cause a 10x traffic jam to make Dijkstra cry! 🚚😏",
    targetSelector: '#algorithm-select',
    prompt: "Right here! Select the '+10 Traffic' tool from the toolbar and paint a roadblock on the grid! Go on, try it! 👆",
    praise: "Aha! Look at that congestion! 🚚 You actually did it! You're a natural troublemaker! 😈✨"
  },
  {
    id: 'engine_duel',
    teaser: "Did you learn how to race two algorithms side-by-side in Engine Duel? Bet you haven't! 🥊",
    targetSelector: '#nav-tab-comparison',
    prompt: "Click this 'Engine Duel' tab right here! Race Dijkstra vs A* and see who embarrasses who! 👆",
    praise: "Ooooh, you found the arena! 🏎️ Let the algorithmic bloodbath begin!"
  },
  {
    id: 'move_rider',
    teaser: "Did you learn that you can pick up the green rider 🛵 and drag them anywhere? Bet you didn't know! 😜",
    targetSelector: '#btn-run-viz',
    prompt: "Click and drag the green scooter on the grid to a new corner! Don't be shy, pick him up! 🛵💨",
    praise: "Wheee! Look at him fly! 🛵 You learned how to relocate the origin!"
  },
  {
    id: 'tsp_dispatch',
    teaser: "Did you learn how to summon the delivery van in Multi-Stop TSP? It has real spinning wheels! 🚚✨",
    targetSelector: '#nav-tab-multistop',
    prompt: "Hop over to Multi-Stop TSP (tab 3)! Add customer pins and click 'Dispatch Delivery Van 🚚'! 👆",
    praise: "Honk honk! 🚚 Look at the delivery van go! You're an official dispatcher now!"
  },
  {
    id: 'sorting_timetravel',
    teaser: "Did you learn how to rewind time in Sorting Studio like a time-traveling wizard? ⏳🧙‍♂️",
    targetSelector: '#nav-tab-sorting',
    prompt: "Switch to Sorting Studio, hit Play, then pause and drag the step slider backward! Can you do it? 👆",
    praise: "Whoa, time travel master! ⏳ Look at you scrubbing through algorithm history!"
  },
  {
    id: 'speed_slowmo',
    teaser: "Did you learn how to slow down the visualization to 0.5x slow-mo to watch ripples expand? 🐢",
    targetSelector: '#btn-run-viz',
    prompt: "Find the speed control in the playback bar and click '0.5x Slow'! Watch every single cell glow! 👆",
    praise: "Maaatrix mode engaged! 🕶️ Look at those gentle ripples of logic!"
  }
];

export const OwlBot: React.FC = () => {
  const { mode, isRunning, stats, theme } = useVisualizer();

  // Peeking state: When true, Athena hides behind screen edge with ONLY ONE EYE looking out!
  const [isPeeking, setIsPeeking] = useState<boolean>(true);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  
  // Position on screen when popped out
  const [position, setPosition] = useState<{ x: number; y: number }>(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth - 330 : 800,
    y: typeof window !== 'undefined' ? window.innerHeight - 380 : 500,
  }));

  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Mood and speech
  const [mood, setMood] = useState<OwlMood>('peeking');
  const [speech, setSpeech] = useState<string>(
    "Psst... hey you! Did you learn this trick yet? 😏 Click my eye or drag me out to play!"
  );
  const [isFlapping, setIsFlapping] = useState(false);
  const [showSpeechCard, setShowSpeechCard] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [isPointingAtTarget, setIsPointingAtTarget] = useState(false);

  // Fast click detector for dizzy effect
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide timer
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerFlap = (duration = 1400) => {
    setIsFlapping(true);
    setTimeout(() => setIsFlapping(false), duration);
  };

  const playHoot = (tone: 'happy' | 'curious' | 'excited' | 'sleepy' = 'happy') => {
    try { soundFX.playOwlHoot(tone); } catch {}
  };

  const playGiggle = () => {
    try { soundFX.playOwlGiggle(); } catch {}
  };

  const playBoop = () => {
    try { soundFX.playOwlBoop(); } catch {}
  };

  const playMunch = () => {
    try { soundFX.playOwlMunch(); } catch {}
  };

  // Schedule auto-hide back into one-eye peeking mode
  const scheduleAutoHide = () => {
    if (isPinned || isPointingAtTarget) return;
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    autoHideTimerRef.current = setTimeout(() => {
      setIsPeeking(true);
      setShowSpeechCard(false);
      setMood('peeking');
    }, 8000);
  };

  // 1. Initial Arrival: Welcomes the user, then hides with ONLY ONE EYE looking out!
  useEffect(() => {
    // Start popped out briefly to say hi
    setIsPeeking(false);
    setShowSpeechCard(true);
    setMood('smug');
    triggerFlap(2000);
    playHoot('happy');
    setSpeech("Hoo-hoo! Welcome to AlgoLenz! 🦉 I'm Athena! I'll be peeking from the side... Let's see what you can learn! ✨");

    // After 3.5 seconds, hide behind screen edge with ONLY ONE EYE looking!
    const timer = setTimeout(() => {
      if (!isPinned) {
        setIsPeeking(true);
        setShowSpeechCard(false);
        setMood('peeking');
        playBoop();
      }
    }, 3600);

    return () => clearTimeout(timer);
  }, []);

  // Pop out from single-eye peek
  const popOut = () => {
    setIsPeeking(false);
    setShowSpeechCard(true);
    setIsPointingAtTarget(false);
    playBoop();
    triggerFlap(1000);
    setMood('teasing');
    const challenge = TEASE_CHALLENGES[currentChallengeIndex];
    setSpeech(challenge.teaser);
    scheduleAutoHide();
  };

  // Move owl right next to target element and challenge user
  const moveToTargetAndTease = () => {
    const challenge = TEASE_CHALLENGES[currentChallengeIndex];
    const el = document.querySelector(challenge.targetSelector);

    setIsPeeking(false);
    setShowSpeechCard(true);
    setIsPointingAtTarget(true);
    triggerFlap(1600);
    playHoot('curious');
    setMood('teasing');
    setSpeech(challenge.prompt);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('animate-spotlight-pulse');
      setTimeout(() => el.classList.remove('animate-spotlight-pulse'), 4500);

      const rect = el.getBoundingClientRect();
      const targetX = Math.max(20, Math.min(window.innerWidth - 330, rect.left - 40));
      const targetY = Math.max(60, Math.min(window.innerHeight - 380, rect.bottom + 12));
      setPosition({ x: targetX, y: targetY });
    }
  };

  // User completed the teasing challenge
  const handleUserCompletedTease = () => {
    const challenge = TEASE_CHALLENGES[currentChallengeIndex];
    setSpeech(challenge.praise);
    setMood('laughing');
    triggerFlap(2000);
    playGiggle();
    setIsPointingAtTarget(false);

    // Next challenge ready for next time
    setCurrentChallengeIndex(prev => (prev + 1) % TEASE_CHALLENGES.length);
    scheduleAutoHide();
  };

  // Next tease question
  const nextTeaseQuestion = () => {
    const nextIdx = (currentChallengeIndex + 1) % TEASE_CHALLENGES.length;
    setCurrentChallengeIndex(nextIdx);
    setSpeech(TEASE_CHALLENGES[nextIdx].teaser);
    setMood('teasing');
    setIsPointingAtTarget(false);
    playBoop();
    triggerFlap(1000);
    scheduleAutoHide();
  };

  // React to User Running the Visualizer
  useEffect(() => {
    if (isRunning) {
      setMood('shocked');
      triggerFlap(1800);
      playHoot('excited');
      setSpeech("VROOOOM! Look at those nodes scramble! Don't let your path crash! 🚀💨");
      if (isPeeking) {
        setIsPeeking(false);
        setShowSpeechCard(true);
      }
      scheduleAutoHide();
    } else if (stats.visitedCount > 0) {
      if (stats.pathLength > 0) {
        setMood('cool');
        triggerFlap(1400);
        playGiggle();
        setSpeech(`Hmph, took you ${stats.visitedCount} nodes! Even a fluffy pigeon could do that! 🕊️💅`);
      } else {
        setMood('derp');
        triggerFlap(1800);
        playGiggle();
        setSpeech("HAHAHAHA! You trapped the rider completely! Did you think they had a jetpack?! 🚀😂");
      }
      scheduleAutoHide();
    }
  }, [isRunning, stats.visitedCount, stats.pathLength]);

  // React to Theme
  const prevTheme = useRef(theme);
  useEffect(() => {
    if (prevTheme.current !== theme) {
      prevTheme.current = theme;
      if (theme === 'light') {
        setMood('shocked');
        setSpeech("AHHH! WHO TURNED ON THE SUN?! MY CUTE NOCTURNAL RETINAS! ☀️😵");
        triggerFlap(1400);
        playHoot('excited');
      } else {
        setMood('cool');
        setSpeech("Ahhh, cozy darkness. Now everything is soft and peaceful... 🌙🦉");
        playHoot('happy');
      }
      if (isPeeking) {
        setIsPeeking(false);
        setShowSpeechCard(true);
      }
      scheduleAutoHide();
    }
  }, [theme]);

  // Dragging mechanics
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragOffsetRef.current.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 340, e.clientY - dragOffsetRef.current.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Poke handler
  const handlePoke = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1200);

    if (clickCountRef.current >= 4) {
      setMood('derp');
      triggerFlap(2000);
      playGiggle();
      setSpeech("WOOOOOAH!! Stop clicking so fast, my head is spinning 360 degrees! 💫🌀");
      return;
    }

    setMood(prev => prev === 'annoyed' ? 'laughing' : 'annoyed');
    playGiggle();
    triggerFlap(800);
    setSpeech("*Squee!* Don't poke my soft feathers! I'm trying to look majestic here! 🦉💖");
    scheduleAutoHide();
  };

  // Feeding snacks
  const handleFeed = (food: 'pizza' | 'coffee') => {
    playMunch();
    setMood('eating');
    triggerFlap(1400);

    if (food === 'pizza') {
      setSpeech("OM NOM NOM! 🍕 Delicious pizza fuel for my tiny owl belly! So soft and cheesy!");
    } else {
      setMood('shocked');
      setSpeech("☕⚡ HYPER-SPEED ENGAGED! Look at my wings go flap-flap-flap! Zoom!");
    }
    setTimeout(() => setMood('laughing'), 1800);
    scheduleAutoHide();
  };

  // ==============================================================
  // 1. ONE-EYE PEEK SVG: Hides behind the screen edge with ONLY ONE EYE LOOKING!
  // ==============================================================
  const renderOneEyePeekSVG = () => {
    return (
      <svg viewBox="0 0 90 140" className="w-20 h-28 filter drop-shadow-xl select-none">
        <defs>
          <linearGradient id="softOwlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="60%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>

          <radialGradient id="cuteIris" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="90%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
        </defs>

        {/* Soft Pointed Ear Tuft peeking around corner */}
        <polygon points="55,34 38,4 68,22" fill="#4F46E5" />
        <polygon points="54,32 44,12 64,24" fill="#A5B4FC" opacity="0.75" />

        {/* Little Fluffy Clinging Wing Clinging to Screen Edge */}
        <path
          d="M 68 85 C 45 92 42 118 64 128 C 70 120 72 100 68 85 Z"
          fill="#4338CA"
          stroke="#3730A3"
          strokeWidth="1.5"
        />

        {/* Half Chubby Rounded Head / Body peeking from right edge */}
        <path
          d="M 88 18 C 38 18 28 65 30 105 C 32 128 55 136 88 136 Z"
          fill="url(#softOwlGrad)"
        />

        {/* Soft Creamy Belly Cheek Fluff */}
        <path
          d="M 88 64 C 52 64 48 105 88 126 Z"
          fill="#FEF3C7"
          opacity="0.9"
        />

        {/* Pink Blush under the Eye */}
        <ellipse cx="50" cy="84" rx="8" ry="4.5" fill="#FDA4AF" opacity="0.85" />

        {/* Big Rounded Face Disc */}
        <circle cx="56" cy="62" r="23" fill="#FFFFFF" />

        {/* THE SINGLE BIG CUTE GLOSSY EYE */}
        <g className="animate-owl-one-eye">
          {/* Glowing Hazel Iris */}
          <circle cx="56" cy="62" r="17" fill="url(#cuteIris)" />

          {/* Deep Black Pupil */}
          <circle cx="54" cy="61" r="10" fill="#0F172A" />

          {/* Large Glossy Highlight Sparkle (Anime shine) */}
          <circle cx="50" cy="56" r="4.5" fill="#FFFFFF" />

          {/* Secondary Tiny Highlight */}
          <circle cx="59" cy="67" r="2" fill="#FFFFFF" opacity="0.9" />

          {/* Cute Eyelash / Brow Curve */}
          <path d="M 38 48 Q 56 42 72 50" stroke="#312E81" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Half of the tiny cute golden beak peeking */}
        <polygon points="88,68 76,76 88,80" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      </svg>
    );
  };

  // ==============================================================
  // 2. FULL SOFT & CUTE OWL SVG (WHEN POPPED OUT)
  // ==============================================================
  const renderSoftOwlSVG = () => {
    const isSmug = mood === 'smug' || mood === 'teasing';
    const isLaughing = mood === 'laughing';
    const isDerp = mood === 'derp';
    const isCool = mood === 'cool';
    const isAnnoyed = mood === 'annoyed';
    const isShocked = mood === 'shocked';
    const isEating = mood === 'eating';

    return (
      <svg 
        viewBox="0 0 160 160" 
        className={`w-28 h-28 filter drop-shadow-xl transition-transform duration-300 select-none ${
          isDerp ? 'animate-owl-dizzy' : isAnnoyed ? '-rotate-6' : isSmug ? 'rotate-3' : ''
        }`}
      >
        <defs>
          <linearGradient id="bodyGradSoft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>

          <linearGradient id="bellyGradSoft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          <radialGradient id="eyeIrisSoft" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="90%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
        </defs>

        {/* Soft Ear Tufts */}
        <polygon 
          points="44,40 28,14 56,30" 
          fill="#4F46E5" 
          className={isFlapping ? 'animate-owl-wiggle' : ''} 
        />
        <polygon 
          points="116,40 132,14 104,30" 
          fill="#4F46E5" 
          className={isFlapping ? 'animate-owl-wiggle' : ''} 
        />
        <polygon points="44,38 34,22 52,32" fill="#A5B4FC" opacity="0.65" />
        <polygon points="116,38 126,22 108,32" fill="#A5B4FC" opacity="0.65" />

        {/* Fluffy Rounded Left Wing */}
        <path
          d="M 38 68 C 16 78 16 114 36 124 C 44 110 46 88 38 68 Z"
          fill="#4338CA"
          stroke="#3730A3"
          strokeWidth="1.5"
          className={isFlapping ? 'animate-owl-wing-left' : ''}
        />

        {/* Fluffy Rounded Right Wing */}
        <path
          d="M 122 68 C 144 78 144 114 124 124 C 116 110 114 88 122 68 Z"
          fill="#4338CA"
          stroke="#3730A3"
          strokeWidth="1.5"
          className={isFlapping ? 'animate-owl-wing-right' : ''}
        />

        {/* Round Squishy Body */}
        <ellipse cx="80" cy="85" rx="46" ry="50" fill="url(#bodyGradSoft)" />

        {/* Fluffy Creamy Belly */}
        <path
          d="M 52 82 C 52 118 108 118 108 82 C 108 72 52 72 52 82 Z"
          fill="url(#bellyGradSoft)"
        />

        {/* Cute Delicate Belly Fluff Scallops */}
        <path d="M 72 88 Q 80 94 88 88" stroke="#FCD34D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 66 98 Q 74 104 82 98" stroke="#FCD34D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 78 98 Q 86 104 94 98" stroke="#FCD34D" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Tiny Chubby Feet */}
        <ellipse cx="68" cy="136" rx="7" ry="4" fill="#F59E0B" />
        <ellipse cx="92" cy="136" rx="7" ry="4" fill="#F59E0B" />

        {/* Big White Face Discs */}
        <circle cx="61" cy="58" r="21" fill="#FFFFFF" />
        <circle cx="99" cy="58" r="21" fill="#FFFFFF" />

        {/* Super Cute Rosy Blush on Cheeks */}
        <ellipse cx="44" cy="74" rx="7" ry="4" fill="#FDA4AF" opacity="0.85" />
        <ellipse cx="116" cy="74" rx="7" ry="4" fill="#FDA4AF" opacity="0.85" />

        {/* ================= EYES ================= */}
        {isLaughing ? (
          /* Joyful Laughing Curved Eyes ^ ^ */
          <g stroke="#1E1B4B" strokeWidth="3.2" strokeLinecap="round" fill="none">
            <path d="M 50 60 Q 61 48 72 60" />
            <path d="M 88 60 Q 99 48 110 60" />
          </g>
        ) : isCool ? (
          /* Cool Black Shades 😎 */
          <g fill="#0F172A" stroke="#000000" strokeWidth="1.5">
            <polygon points="44,50 78,50 74,68 48,68" rx="3" />
            <polygon points="82,50 116,50 112,68 86,68" rx="3" />
            <line x1="78" y1="56" x2="82" y2="56" stroke="#0F172A" strokeWidth="3" />
            <line x1="50" y1="54" x2="60" y2="64" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="88" y1="54" x2="98" y2="64" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ) : isDerp ? (
          /* Derpy Spiral Eyes 🤪 */
          <g>
            <circle cx="61" cy="58" r="15" fill="url(#eyeIrisSoft)" />
            <circle cx="99" cy="58" r="15" fill="url(#eyeIrisSoft)" />
            <circle cx="63" cy="54" r="5" fill="#0F172A" />
            <circle cx="97" cy="62" r="5" fill="#0F172A" />
            <circle cx="64" cy="53" r="2" fill="#FFFFFF" />
            <circle cx="98" cy="61" r="2" fill="#FFFFFF" />
          </g>
        ) : isShocked ? (
          /* Big Dilated Shocked Eyes */
          <g>
            <circle cx="61" cy="58" r="16" fill="url(#eyeIrisSoft)" />
            <circle cx="99" cy="58" r="16" fill="url(#eyeIrisSoft)" />
            <circle cx="61" cy="58" r="11" fill="#0F172A" />
            <circle cx="99" cy="58" r="11" fill="#0F172A" />
            <circle cx="65" cy="53" r="3.5" fill="#FFFFFF" />
            <circle cx="103" cy="53" r="3.5" fill="#FFFFFF" />
          </g>
        ) : isSmug ? (
          /* Teasing Winking Smug Look 😉 */
          <g>
            {/* Left big glowing eye */}
            <circle cx="61" cy="58" r="15" fill="url(#eyeIrisSoft)" />
            <circle cx="63" cy="57" r="8" fill="#0F172A" />
            <circle cx="59" cy="53" r="4" fill="#FFFFFF" />
            <circle cx="66" cy="62" r="1.5" fill="#FFFFFF" />
            {/* Arched brow */}
            <path d="M 47 44 Q 61 38 72 47" stroke="#312E81" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Right eye playfully winking shut */}
            <path d="M 88 58 Q 99 66 110 58" stroke="#1E1B4B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            <path d="M 88 47 Q 99 44 109 46" stroke="#312E81" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          /* Giant Soft Glossy Anime Eyes */
          <g>
            <circle cx="61" cy="58" r="15" fill="url(#eyeIrisSoft)" />
            <circle cx="99" cy="58" r="15" fill="url(#eyeIrisSoft)" />
            <circle cx="61" cy="58" r="9" fill="#0F172A" />
            <circle cx="99" cy="58" r="9" fill="#0F172A" />
            {/* Sparkles */}
            <circle cx="58" cy="53" r="4.2" fill="#FFFFFF" />
            <circle cx="96" cy="53" r="4.2" fill="#FFFFFF" />
            <circle cx="65" cy="63" r="2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="103" cy="63" r="2" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}

        {/* Cute Tiny Golden Beak */}
        {isEating ? (
          <g>
            <polygon points="80,62 70,72 90,72" fill="#F59E0B" />
            <circle cx="66" cy="74" r="1.5" fill="#D97706" />
            <circle cx="94" cy="74" r="1.5" fill="#D97706" />
          </g>
        ) : isDerp ? (
          <g>
            <polygon points="80,63 72,74 88,74" fill="#F59E0B" />
            <path d="M 76 74 Q 80 84 84 74 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1" className="animate-owl-tease" />
          </g>
        ) : (
          <g>
            <polygon points="80,63 72,74 88,74" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <path d="M 76 77 Q 82 82 85 76" stroke="#92400E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    );
  };

  // ==============================================================
  // RENDER PEEKING STATE (ONLY ONE EYE LOOKING!)
  // ==============================================================
  if (isPeeking) {
    return (
      <div 
        className="fixed z-50 right-0 top-1/2 -translate-y-1/2 translate-x-[46%] cursor-pointer select-none transition-all duration-300"
        onClick={popOut}
        title="Athena is peeking with one eye! Click to pull her out!"
      >
        <div className="relative flex items-center group animate-owl-curious-nod">
          {/* Only One Eye Looks Out! */}
          <div className="hover:scale-110 active:scale-95 transition-transform filter drop-shadow-2xl">
            {renderOneEyePeekSVG()}
          </div>

          {/* Floating Teasing Speech Pill */}
          <div className="absolute top-2 -left-28 bg-white/95 dark:bg-dark-900/95 border border-indigo-200/90 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 group-hover:scale-105 transition-transform animate-pulse backdrop-blur-md">
            <span>👀 Psst...</span>
          </div>
        </div>
      </div>
    );
  }

  const currentChallenge = TEASE_CHALLENGES[currentChallengeIndex];

  // ==============================================================
  // RENDER FULL POPPED-OUT SOFT OWL CARD
  // ==============================================================
  return (
    <div 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      className="fixed z-50 select-none max-w-[320px] w-full transition-all duration-300"
    >
      <div className="relative flex flex-col items-end">

        {/* 1. Cute Soft Avatar (Click to poke/tickle!) */}
        <div 
          className="relative cursor-grab active:cursor-grabbing mb-[-14px] z-10 flex items-center gap-1 group"
          onMouseDown={handleMouseDown}
          onClick={handlePoke}
          title="Click to tickle Athena! Drag to reposition anywhere!"
        >
          <div className="animate-owl-soft-bob relative">
            {renderSoftOwlSVG()}

            {/* Drag Pill on hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm pointer-events-none">
              <Move className="w-2.5 h-2.5" />
              <span>Drag me</span>
            </div>
          </div>
        </div>

        {/* 2. Soft & Cute Teasing Dialog Card */}
        {showSpeechCard && (
          <div className="w-full bg-white/95 dark:bg-dark-900/95 border border-indigo-100 dark:border-dark-750 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md flex flex-col transition-all duration-300 text-xs text-slate-700 dark:text-slate-300">
            
            {/* Header */}
            <div 
              className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50/70 dark:from-indigo-950/60 dark:to-dark-900 border-b border-indigo-100/80 dark:border-dark-800 flex items-center justify-between cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  Athena 🦉
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-medium">
                    Teasing Owl
                  </span>
                </span>
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-1">
                {/* Pin toggle */}
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  className={`p-1 rounded-md transition-colors ${
                    isPinned ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100 dark:hover:bg-dark-800 text-slate-400'
                  }`}
                  title={isPinned ? 'Pinned open' : 'Pin so it stays open'}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>

                {/* Hide back into 1-Eye Peek */}
                <button
                  onClick={() => {
                    setIsPeeking(true);
                    setShowSpeechCard(false);
                    setMood('peeking');
                    setIsPointingAtTarget(false);
                    playBoop();
                  }}
                  className="p-1 rounded-md hover:bg-indigo-100 dark:hover:bg-dark-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                  title="Hide behind edge (One-Eye Peek)"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>

                {/* Close card */}
                <button
                  onClick={() => setShowSpeechCard(false)}
                  className="p-1 rounded-md hover:bg-rose-100 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Close card"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Speech Dialogue Box */}
            <div className="p-3.5 bg-indigo-50/40 dark:bg-indigo-950/20 border-b border-indigo-100/70 dark:border-dark-800 flex items-start gap-2.5">
              <span className="text-base mt-0.5">💬</span>
              <div className="flex-1">
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
                  {speech}
                </p>
              </div>
            </div>

            {/* TEASING "DID YOU LEARN THIS?" ACTION HUB */}
            <div className="p-3 space-y-2.5">
              
              {!isPointingAtTarget ? (
                <>
                  <button
                    onClick={moveToTargetAndTease}
                    className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                    <span>Show Me Where! (Take Me There) 🚀</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={nextTeaseQuestion}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Another Tease 😏</span>
                    </button>

                    <button
                      onClick={handlePoke}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>👉 Tickle Her</span>
                    </button>
                  </div>
                </>
              ) : (
                /* When Athena has flown to the element and is waiting for user to click */
                <div className="space-y-2">
                  <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2">
                    <span className="text-base animate-bounce">👇</span>
                    <span className="font-semibold">I'm pointing right at it! Click the highlighted control!</span>
                  </div>

                  <button
                    onClick={handleUserCompletedTease}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>I Did It! Look! 🥳</span>
                  </button>
                </div>
              )}

              {/* Feed Athena a soft snack */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-dark-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Give treat:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleFeed('pizza')}
                    className="px-2 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 hover:scale-105 transition-transform text-amber-800 dark:text-amber-200 font-semibold"
                  >
                    🍕 Pizza
                  </button>
                  <button
                    onClick={() => handleFeed('coffee')}
                    className="px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:scale-105 transition-transform text-rose-800 dark:text-rose-200 font-semibold"
                  >
                    ☕ Coffee
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-2 px-3 bg-slate-50/70 dark:bg-dark-950 border-t border-indigo-100/60 dark:border-dark-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>Hides with 1 eye when idle</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Press O to toggle</span>
            </div>

          </div>
        )}

        {/* Small pop-out pill if card was closed with [X] */}
        {!showSpeechCard && (
          <button
            onClick={() => {
              setShowSpeechCard(true);
              playBoop();
            }}
            className="mt-2 bg-indigo-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <span>💬 Did you learn this?</span>
          </button>
        )}

      </div>
    </div>
  );
};
