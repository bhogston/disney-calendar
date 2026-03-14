import { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'disney2026_progress';

const DAYS = [
  {
    id: 1,
    label: 'Day 1',
    title: 'Travel + Disney Springs',
    date: 'Sun Mar 15',
    color: '#7c6af5',
    schedule: 'Drive from VA (~7 hrs). Check in Pop Century. Disney Springs evening stroll.',
    ideas: [
      {
        id: '1-1',
        title: 'Road Trip Content',
        platform: 'TikTok/Reels',
        shots: ['Family loading the car', 'Atlas reaction "are we there yet"', 'Sign: Welcome to Florida', 'Pop Century check-in reaction'],
      },
      {
        id: '1-2',
        title: 'Pop Century First Look',
        platform: 'TikTok/Reels',
        shots: ['80s/90s theming detail shots', 'Pool area', 'Room tour', 'View from balcony'],
      },
      {
        id: '1-3',
        title: 'Disney Springs Night Vibes',
        platform: 'Instagram',
        shots: ['World of Disney storefront', 'Atlas with Mickey ears', 'Food/snack pick', 'Ambiance B-roll'],
      },
    ],
  },
  {
    id: 2,
    label: 'Day 2',
    title: 'Hollywood Studios',
    date: 'Mon Mar 16',
    color: '#e84d8a',
    schedule: 'Skyliner in. Rope drop. LL: ROTR + Slinky + MMRR. Muppets / Toy Story Land midday.',
    note: 'Rock \'n\' Roller Coaster CLOSED (Muppets retheme). MuppetVision 3D permanently closed.',
    ideas: [
      {
        id: '2-1',
        title: 'Skyliner Morning',
        platform: 'TikTok',
        shots: ['Boarding at Pop Century', 'Aerial views', 'Atlas reaction from gondola', 'Hollywood Studios sign arrival'],
      },
      {
        id: '2-2',
        title: 'Rise of the Resistance',
        platform: 'TikTok/Reels',
        shots: ['Queue theming details', 'Pre-show reaction', 'Post-ride Atlas reaction', 'Kylo Ren encounter moment'],
        riderSwap: 'Atlas 40" — confirm at gate (40" req)',
      },
      {
        id: '2-3',
        title: 'Slinky Dog Dash',
        platform: 'TikTok',
        shots: ['Toy Story Land arrival', 'Atlas in line', 'Post-ride reaction', 'Slinky queue detail shots'],
        riderSwap: 'Atlas right at limit (38" req — should be fine)',
      },
      {
        id: '2-4',
        title: 'Mickey & Minnie\'s Runaway Railway',
        platform: 'Reels',
        shots: ['Chinese Theatre exterior', 'Pre-show cartoon entrance', 'Post-ride happy chaos', 'Family photo outside'],
      },
      {
        id: '2-5',
        title: 'Toy Story Land Golden Hour',
        platform: 'Instagram',
        shots: ['Oversized toy theming', 'Atlas next to giant Woody', 'Alien Swirling Saucers', 'Sunset behind the land'],
      },
    ],
  },
  {
    id: 3,
    label: 'Day 3',
    title: 'Magic Kingdom',
    date: 'Tue Mar 17',
    color: '#38b2e8',
    schedule: 'St. Patrick\'s Day. LL: 7 Dwarfs + Tiana\'s + Space Mtn. Beak and Barrel 6:05 PM.',
    note: 'Big Thunder Mountain CLOSED (Spring 2026 retheme). Buzz Lightyear CLOSED. Liberty Square Riverboat permanently gone (Cars expansion).',
    ideas: [
      {
        id: '3-1',
        title: 'Magic Kingdom Arrival',
        platform: 'TikTok/Reels',
        shots: ['Ferry boat or monorail in', 'Atlas first view of the castle', 'Main Street USA morning', 'Castle wide shot'],
      },
      {
        id: '3-2',
        title: 'Seven Dwarfs Mine Train',
        platform: 'TikTok',
        shots: ['Queue: cottage detail', 'Atlas reaction in line', 'Post-ride faces', 'Mine cart photo op'],
        riderSwap: 'Atlas 40" — confirm at gate (38" req)',
      },
      {
        id: '3-3',
        title: 'Tiana\'s Bayou Adventure',
        platform: 'Reels',
        shots: ['New bayou theming entrance', 'Animatronic Tiana', 'Drop splash moment', 'Atlas post-ride reaction'],
        riderSwap: 'Atlas right at limit (40" req — confirm at gate)',
      },
      {
        id: '3-4',
        title: 'Space Mountain',
        platform: 'TikTok',
        shots: ['Tomorrowland approach', 'Queue cosmic theming', 'Rider swap handoff moment', 'Post-ride glow'],
        riderSwap: 'RIDER SWAP — Atlas 40", need 44". Sean and Brooke take turns.',
      },
      {
        id: '3-5',
        title: 'St. Patrick\'s Day Magic',
        platform: 'Instagram',
        shots: ['Green-accented outfits', 'Castle green lighting (if any)', 'Main Street parade potential', 'Lucky Irish treat'],
      },
      {
        id: '3-6',
        title: 'Beak and Barrel Dinner',
        platform: 'Instagram/TikTok',
        shots: ['Frontierland restaurant exterior', 'Menu/food spread', 'Family table moment', 'Atlas eating something funny'],
      },
      {
        id: '3-7',
        title: 'Fireworks / Castle at Night',
        platform: 'TikTok/Reels',
        shots: ['Castle lit up blue/gold', 'Atlas watching fireworks', 'Crowd reaction wide shot', 'Family selfie with castle'],
      },
    ],
  },
  {
    id: 4,
    label: 'Day 4',
    title: 'Animal Kingdom',
    date: 'Wed Mar 18',
    color: '#48bb78',
    schedule: 'Rope drop Pandora. LL: Flight of Passage. Dusk priority: bioluminescent Pandora shots.',
    note: 'Rafiki\'s Planet Watch + Wildlife Express Train CLOSED (Bluey retheme). DINOSAUR/Dinoland USA permanently gone (Tropical Americas).',
    ideas: [
      {
        id: '4-1',
        title: 'Rope Drop Pandora',
        platform: 'TikTok/Reels',
        shots: ['Park entrance tree of life', 'Pandora bridge arrival', 'Floating mountains in morning light', 'Atlas jaw drop moment'],
      },
      {
        id: '4-2',
        title: 'Avatar Flight of Passage',
        platform: 'TikTok',
        shots: ['Lab queue theming', 'Rider swap handoff', 'Post-ride "my legs still feel it"', 'Banshee animatronic close-up'],
        riderSwap: 'RIDER SWAP — Atlas 40", need 44".',
      },
      {
        id: '4-3',
        title: 'Na\'vi River Journey',
        platform: 'Reels',
        shots: ['Glowing queue flora', 'Shaman of Songs animatronic', 'Family boat photo', 'Atlas pointing at glowing things'],
      },
      {
        id: '4-4',
        title: 'Expedition Everest',
        platform: 'TikTok',
        shots: ['Asia area approach', 'Mountain exterior', 'Rider swap logistics', 'Yeti warning signage detail'],
        riderSwap: 'RIDER SWAP — Atlas 40", need 44".',
      },
      {
        id: '4-5',
        title: 'Tree of Life Details',
        platform: 'Instagram',
        shots: ['Wide tree silhouette', 'Animal carving close-ups', 'Atlas searching for animals', 'Golden hour glow'],
      },
      {
        id: '4-6',
        title: 'Pandora at Dusk (PRIORITY)',
        platform: 'TikTok/Reels/Instagram',
        shots: ['Bioluminescent ground glow', 'Floating mountains with lights', 'Family silhouette shot', 'Atlas face lit by glow'],
      },
    ],
  },
  {
    id: 5,
    label: 'Day 5',
    title: 'EPCOT',
    date: 'Thu Mar 19',
    color: '#ed8936',
    schedule: 'Flower & Garden Festival. LL: Guardians + Remy + Frozen. 8 PM France pavilion.',
    note: 'All rides open. Test Track 3.0 reopened Summer 2025. Frozen reopened Feb 2026 with new animatronics. Spaceship Earth back Oct 2025.',
    ideas: [
      {
        id: '5-1',
        title: 'Flower & Garden Festival',
        platform: 'Instagram/Reels',
        shots: ['Topiary characters entrance', 'Atlas next to Bambi topiary', 'Flower wall detail', 'Festival booth food'],
      },
      {
        id: '5-2',
        title: 'Guardians of the Galaxy: Cosmic Rewind',
        platform: 'TikTok',
        shots: ['Xandar pavilion queue exterior', 'Rider swap moment', 'Post-ride "what song did you get"', 'Family reaction video'],
        riderSwap: 'RIDER SWAP — Atlas 40", need 42".',
      },
      {
        id: '5-3',
        title: 'Spaceship Earth',
        platform: 'Reels',
        shots: ['Classic ball exterior', 'Inside historical scenes', 'Your future scene', 'Atlas looking around in wonder'],
      },
      {
        id: '5-4',
        title: 'Remy\'s Ratatouille Adventure',
        platform: 'TikTok',
        shots: ['France pavilion approach', 'Giant Remy queue', 'Post-ride Atlas reaction', 'Crepe from France booth'],
      },
      {
        id: '5-5',
        title: 'Frozen Ever After',
        platform: 'Reels',
        shots: ['Norway pavilion exterior', 'New animatronic Elsa close-up', 'Boat ride B-roll', 'Atlas singing along'],
      },
      {
        id: '5-6',
        title: 'World Showcase Food Tour',
        platform: 'TikTok/Instagram',
        shots: ['Japan booth food', 'Morocco detail shots', 'Canada maple whatever', 'Atlas eating something international'],
      },
      {
        id: '5-7',
        title: 'France Pavilion at 8 PM',
        platform: 'Instagram/Reels',
        shots: ['Eiffel Tower replica lit up', 'Cafe tables ambiance', 'Family dinner shot', 'Atlas with beret if available'],
      },
    ],
  },
  {
    id: 6,
    label: 'Day 6',
    title: 'Beach Club + Disney Springs',
    date: 'Fri Mar 20',
    color: '#9f7aea',
    schedule: 'Morning: Beach Club + Yacht Club resort hop. Afternoon: Disney Springs. Drive home to VA.',
    ideas: [
      {
        id: '6-1',
        title: 'Beach Club Resort Vibes',
        platform: 'Instagram/Reels',
        shots: ['Stormalong Bay pool exterior', 'Nautical theming details', 'Atlas at sandy bottom pool', 'Beach Club lobby'],
      },
      {
        id: '6-2',
        title: 'Yacht Club Resort Hop',
        platform: 'TikTok',
        shots: ['Boardwalk walk between resorts', 'Yacht Club lighthouse', 'Compare theming side by side', 'Waterway views'],
      },
      {
        id: '6-3',
        title: 'Final Disney Springs Haul',
        platform: 'TikTok/Instagram',
        shots: ['World of Disney final haul', 'Atlas choosing a souvenir', 'Family last selfie', 'Disney Springs goodbye B-roll'],
      },
      {
        id: '6-4',
        title: 'Trip Recap / Wrap-Up',
        platform: 'TikTok/Reels',
        shots: ['Clip montage of best Atlas reactions', 'Favorite ride ranking reveal', 'Brooke and Sean takeaways', '"See you real soon" outro'],
      },
    ],
  },
];

// ── Styles ───────────────────────────────────────────────────────────────────

const S = {
  app: { minHeight: '100vh', position: 'relative', paddingBottom: 40 },
  stars: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 },
  castle: {
    position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
    opacity: 0.04, pointerEvents: 'none', zIndex: 0, width: 600,
  },
  header: {
    position: 'relative', zIndex: 1, textAlign: 'center',
    padding: '40px 20px 24px',
  },
  title: {
    fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700,
    fontSize: 'clamp(1.8rem, 5vw, 3rem)',
    background: 'linear-gradient(135deg, #f5c842 0%, #ffe082 50%, #f5c842 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text', marginBottom: 8,
  },
  subtitle: { color: 'rgba(240,244,255,0.6)', fontSize: '0.9rem', letterSpacing: 2 },
  nav: {
    position: 'sticky', top: 0, zIndex: 10,
    background: 'rgba(11,13,31,0.95)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '10px 16px', display: 'flex', gap: 8,
    overflowX: 'auto', scrollbarWidth: 'none',
  },
  tab: (active, color) => ({
    flex: '0 0 auto', padding: '8px 16px', borderRadius: 20, border: 'none',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontWeight: 700,
    fontSize: '0.78rem', letterSpacing: 0.5, position: 'relative', overflow: 'hidden',
    background: active ? color : 'rgba(255,255,255,0.07)',
    color: active ? '#0b0d1f' : 'rgba(240,244,255,0.75)',
    transition: 'all 0.2s',
  }),
  tabBar: (pct, color) => ({
    position: 'absolute', bottom: 0, left: 0, height: 3,
    width: `${pct}%`, background: color, transition: 'width 0.4s',
  }),
  body: { position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '20px 16px' },
  dayHeader: (color) => ({
    borderRadius: 16, padding: '20px 24px 16px', marginBottom: 24,
    background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
    border: `1px solid ${color}44`, overflow: 'hidden', position: 'relative',
  }),
  dayTitle: { fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 },
  dayDate: { color: 'rgba(240,244,255,0.5)', fontSize: '0.8rem', letterSpacing: 1, marginBottom: 10 },
  schedText: { color: 'rgba(240,244,255,0.75)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 6 },
  noteText: {
    color: '#fbbf24', fontSize: '0.78rem', lineHeight: 1.5,
    background: 'rgba(251,191,36,0.08)', borderRadius: 8,
    padding: '6px 10px', marginTop: 6,
  },
  progress: (color) => ({
    marginTop: 12, display: 'flex', alignItems: 'center', gap: 12,
  }),
  progressBar: (pct, color) => ({
    flex: 1, height: 6, borderRadius: 3,
    background: 'rgba(255,255,255,0.1)', overflow: 'hidden',
  }),
  progressFill: (pct, color) => ({
    height: '100%', borderRadius: 3, background: color,
    width: `${pct}%`, transition: 'width 0.4s',
  }),
  progressLabel: { fontSize: '0.75rem', color: 'rgba(240,244,255,0.5)', whiteSpace: 'nowrap' },
  resetBtn: (color) => ({
    fontSize: '0.7rem', padding: '3px 10px', borderRadius: 10,
    border: `1px solid ${color}66`, background: 'transparent',
    color: 'rgba(240,244,255,0.5)', cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  }),
  tabsRow: { display: 'flex', gap: 8, marginBottom: 20 },
  sectionTab: (active, color) => ({
    padding: '6px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.78rem',
    background: active ? color : 'rgba(255,255,255,0.07)',
    color: active ? '#0b0d1f' : 'rgba(240,244,255,0.6)',
    transition: 'all 0.2s',
  }),
  ideaCard: (done, color) => ({
    borderRadius: 12, marginBottom: 14,
    background: done ? `${color}18` : 'rgba(255,255,255,0.04)',
    border: `1px solid ${done ? color + '55' : 'rgba(255,255,255,0.07)'}`,
    overflow: 'hidden', transition: 'all 0.3s',
  }),
  ideaHeader: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer' },
  circle: (done, color) => ({
    width: 28, height: 28, borderRadius: '50%', border: `2px solid ${done ? color : 'rgba(255,255,255,0.2)'}`,
    background: done ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'all 0.2s', cursor: 'pointer',
  }),
  ideaTitle: (done) => ({
    fontWeight: 800, fontSize: '0.95rem', flex: 1,
    textDecoration: done ? 'line-through' : 'none',
    color: done ? 'rgba(240,244,255,0.45)' : 'var(--white)',
    transition: 'all 0.2s',
  }),
  badge: (done, color) => ({
    fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 8,
    background: done ? `${color}33` : 'rgba(255,255,255,0.08)',
    color: done ? color : 'rgba(240,244,255,0.5)',
  }),
  platform: (color) => ({
    fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 8,
    background: `${color}22`, color: color, flexShrink: 0,
  }),
  shotsGrid: { padding: '0 16px 12px 56px', display: 'flex', flexDirection: 'column', gap: 6 },
  shotRow: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '4px 0' },
  shotCircle: (done, color) => ({
    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
    border: `1.5px solid ${done ? color : 'rgba(255,255,255,0.2)'}`,
    background: done ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s',
  }),
  shotText: (done) => ({
    fontSize: '0.82rem', color: done ? 'rgba(240,244,255,0.35)' : 'rgba(240,244,255,0.75)',
    textDecoration: done ? 'line-through' : 'none', transition: 'all 0.15s', lineHeight: 1.4,
  }),
  riderSwap: {
    margin: '4px 56px 10px', padding: '6px 12px', borderRadius: 8,
    background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)',
    fontSize: '0.75rem', color: '#fbbf24', lineHeight: 1.4,
  },
  footer: { textAlign: 'center', padding: '40px 20px 20px', color: 'rgba(240,244,255,0.2)', fontSize: '0.75rem' },
};

// ── SVG Helpers ───────────────────────────────────────────────────────────────

function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    cx: Math.random() * 1440, cy: Math.random() * 900,
    r: Math.random() * 1.5 + 0.3, op: Math.random() * 0.6 + 0.2,
    dur: Math.random() * 4 + 2,
  }));
  return (
    <svg style={S.stars} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op}>
          <animate attributeName="opacity" values={`${s.op};${s.op * 0.2};${s.op}`} dur={`${s.dur}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function Checkmark({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polyline points="2,7 5.5,10.5 12,3.5" stroke={color === '#48bb78' ? '#0b0d1f' : '#0b0d1f'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmallCheck({ color }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <polyline points="1.5,5 4,7.5 8.5,2" stroke="#0b0d1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function DisneyCalendar() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeSection, setActiveSection] = useState('content'); // 'schedule' | 'content'
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleShot = (ideaId, shotIdx) => {
    const key = `${ideaId}-${shotIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleIdea = (ideaId, shots) => {
    const allDone = shots.every((_, i) => checked[`${ideaId}-${i}`]);
    const updates = {};
    shots.forEach((_, i) => { updates[`${ideaId}-${i}`] = !allDone; });
    setChecked(prev => ({ ...prev, ...updates }));
  };

  const resetDay = (day) => {
    const toRemove = {};
    day.ideas.forEach(idea => {
      idea.shots.forEach((_, i) => { toRemove[`${idea.id}-${i}`] = false; });
    });
    setChecked(prev => ({ ...prev, ...toRemove }));
  };

  const dayProgress = (day) => {
    let totalIdeas = day.ideas.length, doneIdeas = 0;
    let totalShots = 0, doneShots = 0;
    day.ideas.forEach(idea => {
      const shots = idea.shots;
      totalShots += shots.length;
      const shotsDone = shots.filter((_, i) => checked[`${idea.id}-${i}`]).length;
      doneShots += shotsDone;
      if (shotsDone === shots.length) doneIdeas++;
    });
    return { totalIdeas, doneIdeas, totalShots, doneShots };
  };

  const ideaDone = (idea) => idea.shots.every((_, i) => checked[`${idea.id}-${i}`]);

  const shotsDoneCount = (idea) => idea.shots.filter((_, i) => checked[`${idea.id}-${i}`]).length;

  const currentDay = DAYS.find(d => d.id === activeDay);

  return (
    <div style={S.app}>
      <Stars />

      {/* Castle watermark */}
      <svg style={S.castle} viewBox="0 0 600 400" fill="white">
        <rect x="270" y="100" width="60" height="300" />
        <polygon points="300,40 270,100 330,100" />
        <rect x="180" y="160" width="50" height="240" />
        <polygon points="205,100 180,160 230,160" />
        <rect x="370" y="160" width="50" height="240" />
        <polygon points="395,100 370,160 420,160" />
        <rect x="100" y="220" width="45" height="180" />
        <rect x="455" y="220" width="45" height="180" />
        <rect x="50" y="280" width="550" height="120" />
      </svg>

      {/* Header */}
      <header style={S.header}>
        <h1 style={S.title}>Walt Disney World 2026</h1>
        <p style={S.subtitle}>CONTENT CALENDAR · MARCH 15–20 · POP CENTURY</p>
      </header>

      {/* Day tabs nav */}
      <nav style={S.nav}>
        {DAYS.map(day => {
          const prog = dayProgress(day);
          const pct = prog.totalShots ? (prog.doneShots / prog.totalShots) * 100 : 0;
          const active = activeDay === day.id;
          return (
            <button key={day.id} style={S.tab(active, day.color)} onClick={() => setActiveDay(day.id)}>
              {day.label}
              <div style={S.tabBar(active ? pct : 0, day.color)} />
            </button>
          );
        })}
      </nav>

      {/* Body */}
      <main style={S.body}>
        {currentDay && (() => {
          const prog = dayProgress(currentDay);
          const pct = prog.totalShots ? (prog.doneShots / prog.totalShots) * 100 : 0;
          const anyChecked = prog.doneShots > 0;

          return (
            <>
              {/* Day header card */}
              <div style={S.dayHeader(currentDay.color)}>
                <div style={S.dayTitle}>{currentDay.title}</div>
                <div style={S.dayDate}>{currentDay.date}</div>
                {/* Progress */}
                <div style={S.progress(currentDay.color)}>
                  <div style={S.progressBar(pct, currentDay.color)}>
                    <div style={S.progressFill(pct, currentDay.color)} />
                  </div>
                  <span style={S.progressLabel}>
                    {prog.doneIdeas}/{prog.totalIdeas} ideas · {prog.doneShots}/{prog.totalShots} shots
                  </span>
                  {anyChecked && (
                    <button style={S.resetBtn(currentDay.color)} onClick={() => resetDay(currentDay)}>
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Section tabs */}
              <div style={S.tabsRow}>
                <button style={S.sectionTab(activeSection === 'schedule', currentDay.color)} onClick={() => setActiveSection('schedule')}>
                  Schedule
                </button>
                <button style={S.sectionTab(activeSection === 'content', currentDay.color)} onClick={() => setActiveSection('content')}>
                  Content Ideas ({currentDay.ideas.length})
                </button>
              </div>

              {/* Schedule tab */}
              {activeSection === 'schedule' && (
                <div>
                  <p style={S.schedText}>{currentDay.schedule}</p>
                  {currentDay.note && <p style={S.noteText}>⚠️ {currentDay.note}</p>}
                </div>
              )}

              {/* Content ideas tab */}
              {activeSection === 'content' && currentDay.ideas.map(idea => {
                const done = ideaDone(idea);
                const shotsDone = shotsDoneCount(idea);
                return (
                  <div key={idea.id} style={S.ideaCard(done, currentDay.color)}>
                    {/* Idea header */}
                    <div style={S.ideaHeader}>
                      <div style={S.circle(done, currentDay.color)} onClick={() => toggleIdea(idea.id, idea.shots)}>
                        {done && <Checkmark color={currentDay.color} />}
                      </div>
                      <span style={S.ideaTitle(done)} onClick={() => toggleIdea(idea.id, idea.shots)}>
                        {idea.title}
                      </span>
                      <span style={S.badge(done, currentDay.color)}>
                        {shotsDone}/{idea.shots.length}
                      </span>
                      <span style={S.platform(currentDay.color)}>{idea.platform}</span>
                    </div>

                    {/* Rider swap note */}
                    {idea.riderSwap && (
                      <div style={S.riderSwap}>🎢 {idea.riderSwap}</div>
                    )}

                    {/* Shots checklist */}
                    <div style={S.shotsGrid}>
                      {idea.shots.map((shot, i) => {
                        const key = `${idea.id}-${i}`;
                        const shotDone = !!checked[key];
                        return (
                          <div key={i} style={S.shotRow} onClick={() => toggleShot(idea.id, i)}>
                            <div style={S.shotCircle(shotDone, currentDay.color)}>
                              {shotDone && <SmallCheck color={currentDay.color} />}
                            </div>
                            <span style={S.shotText(shotDone)}>{shot}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          );
        })()}
      </main>

      <footer style={S.footer}>
        See you real soon ✦ Walt Disney World 2026
      </footer>
    </div>
  );
}
