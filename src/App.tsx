import { useEffect, useRef, useState } from 'react';
import {
  Code2,
  ExternalLink,
  Mail,
  Link2,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Accent = 'pink' | 'lilac' | 'mint';

interface Tab {
  id: string;
  label: string;
}

interface SkillGroup {
  key: string;
  accent: Accent;
  items: string[];
}

interface ProjectLink {
  label: string;
  href: string;
  icon: 'github' | 'external';
}

interface Project {
  ext: string;
  accent: Accent;
  title: string;
  desc: string;
  tags: string[];
  links?: ProjectLink[];
  note?: string;
}

type TimelineType = 'education' | 'work' | 'cert';

interface TimelineItem {
  date: string;
  type: TimelineType;
  title: string;
  org?: string;
  desc?: string;
}

interface TypeMeta {
  label: string;
  icon: LucideIcon;
  accent: Accent;
}

interface Stat {
  num: string;
  label: string;
}

const TABS: Tab[] = [
  { id: 'about', label: 'about.tsx' },
  { id: 'skills', label: 'skills.json' },
  { id: 'projects', label: 'projects.tsx' },
  { id: 'timeline', label: 'timeline.log' },
  { id: 'contact', label: 'contact.sh' },
];

const SKILL_GROUPS: SkillGroup[] = [
  { key: 'languages', accent: 'pink', items: ['JavaScript', 'Python', 'Java', 'SQL'] },
  { key: 'web', accent: 'lilac', items: ['HTML', 'CSS', 'React', 'Node.js'] },
  { key: 'mobile', accent: 'mint', items: ['React Native'] },
  { key: 'databases', accent: 'pink', items: ['MongoDB', 'SQL'] },
  { key: 'tools', accent: 'lilac', items: ['GitHub', 'VS Code', 'Power Platform', 'MS Office'] },
  { key: 'other', accent: 'mint', items: ['API Integration', 'UI/UX Design', 'Low-Code Dev', 'VB.NET'] },
];

const PROJECTS: Project[] = [
  {
    ext: '.py',
    accent: 'pink',
    title: 'CircuitHub',
    desc: 'Inventory system for tracking electronic components — built to stop loss and duplication with one organized source of truth.',
    tags: ['Python', 'Inventory System', 'Database'],
    links: [{ label: 'Live demo', href: 'https://python-frontend-9vgt.onrender.com', icon: 'external' }],
  },
  {
    ext: '.jsx',
    accent: 'lilac',
    title: 'Captivity & Care',
    desc: 'Mobile app for logging animal behavior, tracking health, flagging issues, and scheduling vet visits.',
    tags: ['React Native', 'Mobile', 'Health Tracking'],
    links: [{ label: 'View repo', href: 'https://github.com/carla-io/animalMobile', icon: 'github' }],
  },
  {
    ext: '.jsx',
    accent: 'lilac',
    title: 'Jewel',
    desc: 'Mobile storefront for jewelry products with full CRUD product management, built end to end.',
    tags: ['React Native', 'E-commerce', 'CRUD'],
    links: [{ label: 'View repo', href: 'https://github.com/carla-io/jewel2', icon: 'github' }],
  },
  {
    ext: 'LOW-CODE',
    accent: 'mint',
    title: 'PO Request Form',
    desc: 'Power Apps tool that replaced a manual, paper-based purchase order process — wired into SharePoint and Power Automate for the Hypercare team at Telstra.',
    tags: ['Power Apps', 'SharePoint', 'Power Automate'],
    note: 'Internal business solution — Telstra Hypercare BU',
  },
];

const TIMELINE: TimelineItem[] = [
  { date: '2020 – 2022', type: 'education', title: 'Senior High School, General Academic Strand', org: 'Dr. Arcadio Santos National High School' },
  { date: '2022 – 2026', type: 'education', title: 'BS in Information Technology', org: 'Technological University of the Philippines, Taguig' },
  { date: 'Sep 2025', type: 'cert', title: 'Introduction to Generative AI and Prompt Engineering' },
  { date: 'Sep 2025', type: 'cert', title: 'R for Everyone: An Introduction' },
  { date: '2026', type: 'work', title: 'IT Intern', org: 'Telstra Foundation Philippines', desc: 'Built a Power Platform application that digitized manual workflows and improved document and data management, working directly with stakeholders to ship a usable business solution.' },
  { date: 'Apr 2026', type: 'cert', title: 'Data Visualisation Mastery in R: Telling Your Story' },
  { date: 'Apr 2026', type: 'cert', title: 'AI for Learning and Future Careers' },
  { date: 'Apr 2026', type: 'cert', title: 'Fundamentals of Artificial Intelligence' },
];

const TYPE_META: Record<TimelineType, TypeMeta> = {
  education: { label: 'Education', icon: GraduationCap, accent: 'lilac' },
  work: { label: 'Internship', icon: Briefcase, accent: 'pink' },
  cert: { label: 'Certification', icon: Award, accent: 'mint' },
};

const STATS: Stat[] = [
  { num: '2026', label: 'Grad Year' },
  { num: '4', label: 'Projects Shipped' },
  { num: '1', label: 'Internship' },
  { num: '5', label: 'Certifications' },
];

export default function CarlaDasalPortfolio() {
  const [active, setActive] = useState<string>('about');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string): void => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setRef = (id: string) => (el: HTMLElement | null): void => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="cp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .cp-root {
          --ink: #fffbfd;
          --panel: #ffffff;
          --panel-alt: #fbeef5;
          --pink: #db2777;
          --pink-soft: rgba(219,39,119,0.10);
          --lilac: #7c3aed;
          --lilac-soft: rgba(124,58,237,0.10);
          --mint: #0d9488;
          --mint-soft: rgba(13,148,136,0.10);
          --paper: #231c30;
          --slate: #6b6478;
          --border: #ebe3ed;
          font-family: 'Inter', sans-serif;
          background: var(--ink);
          color: var(--paper);
          min-height: 100vh;
          line-height: 1.6;
        }
        .cp-root * { box-sizing: border-box; }
        .cp-mono { font-family: 'JetBrains Mono', monospace; }

        .cp-tabbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 1.1rem;
          background: var(--panel-alt);
          border-bottom: 1px solid var(--border);
          padding: 0.7rem 1.25rem;
          overflow-x: auto;
        }
        .cp-dots { display: flex; gap: 0.4rem; flex-shrink: 0; }
        .cp-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .cp-dot-pink { background: var(--pink); }
        .cp-dot-lilac { background: var(--lilac); }
        .cp-dot-mint { background: var(--mint); }
        .cp-tabs { display: flex; gap: 0.15rem; }
        .cp-tab {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          white-space: nowrap;
          color: var(--slate);
          background: transparent;
          border: none;
          padding: 0.4rem 0.7rem;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .cp-tab:hover { color: var(--paper); background: rgba(0,0,0,0.04); }
        .cp-tab-active { color: var(--pink); border-bottom-color: var(--pink); }
        .cp-tab:focus-visible { outline: 2px solid var(--pink); outline-offset: 2px; }

        .cp-section { padding: 4.5rem 1.5rem; max-width: 1080px; margin: 0 auto; }
        .cp-eyebrow { font-family: 'JetBrains Mono', monospace; color: var(--pink); font-size: 0.82rem; letter-spacing: 0.04em; margin-bottom: 0.85rem; }
        .cp-heading { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: clamp(1.5rem, 3.5vw, 2rem); margin: 0 0 2rem; }

        .cp-hero { padding-top: 3.5rem; }
        .cp-hero-name { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: clamp(2.1rem, 6vw, 3.4rem); line-height: 1.1; margin: 0 0 0.85rem; }
        .cp-hero-bio { color: var(--slate); font-size: 1.02rem; max-width: 580px; margin-bottom: 1.5rem; }
        .cp-status { display: inline-flex; align-items: center; gap: 0.55rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--mint); background: var(--mint-soft); border: 1px solid rgba(94,234,212,0.35); padding: 0.4rem 0.85rem; border-radius: 999px; margin-bottom: 1.75rem; }
        .cp-status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mint); animation: cp-pulse 2s infinite; }

        .cp-cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .cp-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; padding: 0.65rem 1.15rem; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.15s, border-color 0.2s, color 0.2s; text-decoration: none; }
        .cp-btn-primary { background: var(--pink); color: var(--ink); border: none; font-weight: 600; }
        .cp-btn-primary:hover { transform: translateY(-2px); }
        .cp-btn-ghost { background: transparent; color: var(--paper); border: 1px solid var(--border); }
        .cp-btn-ghost:hover { border-color: var(--pink); color: var(--pink); }
        .cp-btn:focus-visible { outline: 2px solid var(--pink); outline-offset: 2px; }

        .cp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 620px; margin-bottom: 3rem; }
        .cp-stat-num { font-family: 'JetBrains Mono', monospace; font-size: 1.55rem; color: var(--pink); font-weight: 700; }
        .cp-stat-label { font-size: 0.68rem; color: var(--slate); text-transform: uppercase; letter-spacing: 0.04em; }

        .cp-window { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; max-width: 540px; box-shadow: 0 20px 45px -25px rgba(219,39,119,0.22); }
        .cp-window-bar { display: flex; align-items: center; gap: 0.45rem; padding: 0.6rem 0.9rem; background: var(--panel-alt); border-bottom: 1px solid var(--border); }
        .cp-window-bar .cp-dot { width: 8px; height: 8px; }
        .cp-window-filename { margin-left: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--slate); }
        .cp-code { padding: 1.15rem 1.3rem; font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; overflow-x: auto; }
        .cp-code-line { display: flex; gap: 1rem; white-space: pre; }
        .cp-line-num { color: #c9c2d4; user-select: none; width: 1.2rem; text-align: right; flex-shrink: 0; }
        .cp-key { color: var(--lilac); }
        .cp-string { color: var(--mint); }
        .cp-punc { color: var(--slate); }

        .cp-skills-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 1.4rem 1.75rem; }
        .cp-skill-row { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.6rem; padding: 0.75rem 0; border-bottom: 1px solid var(--border); }
        .cp-skill-row:last-child { border-bottom: none; }
        .cp-skill-key { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; width: 115px; flex-shrink: 0; }
        .cp-skill-key-pink { color: var(--pink); }
        .cp-skill-key-lilac { color: var(--lilac); }
        .cp-skill-key-mint { color: var(--mint); }
        .cp-pill { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; padding: 0.25rem 0.65rem; border-radius: 999px; border: 1px solid; }
        .cp-pill-pink { color: var(--pink); border-color: rgba(255,95,168,0.4); background: var(--pink-soft); }
        .cp-pill-lilac { color: var(--lilac); border-color: rgba(156,140,255,0.4); background: var(--lilac-soft); }
        .cp-pill-mint { color: var(--mint); border-color: rgba(94,234,212,0.4); background: var(--mint-soft); }

        .cp-projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .cp-project-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; }
        .cp-project-card:hover { transform: translateY(-4px); border-color: var(--pink); }
        .cp-project-top { height: 4px; }
        .cp-project-top-pink { background: var(--pink); }
        .cp-project-top-lilac { background: var(--lilac); }
        .cp-project-top-mint { background: var(--mint); }
        .cp-project-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .cp-ext-badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 4px; width: fit-content; margin-bottom: 0.85rem; }
        .cp-project-title { font-family: 'JetBrains Mono', monospace; font-size: 1.05rem; font-weight: 600; margin-bottom: 0.5rem; }
        .cp-project-desc { color: var(--slate); font-size: 0.9rem; margin-bottom: 1rem; flex: 1; }
        .cp-tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.1rem; }
        .cp-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--slate); background: rgba(0,0,0,0.04); padding: 0.2rem 0.5rem; border-radius: 4px; }
        .cp-project-links { display: flex; gap: 1rem; }
        .cp-project-link { display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--paper); text-decoration: none; }
        .cp-project-link:hover { color: var(--pink); }
        .cp-project-note { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--slate); font-style: italic; }

        .cp-timeline { position: relative; padding-left: 1.75rem; border-left: 1px solid var(--border); }
        .cp-timeline-item { position: relative; padding-bottom: 2.1rem; }
        .cp-timeline-item:last-child { padding-bottom: 0; }
        .cp-timeline-dot { position: absolute; left: -1.94rem; top: 0.25rem; width: 10px; height: 10px; border-radius: 50%; }
        .cp-timeline-date { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--slate); margin-bottom: 0.4rem; }
        .cp-type-pill { display: inline-flex; align-items: center; gap: 0.3rem; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 999px; border: 1px solid; margin-left: 0.6rem; }
        .cp-timeline-title { font-weight: 600; font-size: 1rem; margin-bottom: 0.2rem; }
        .cp-timeline-org { color: var(--slate); font-size: 0.88rem; margin-bottom: 0.4rem; }
        .cp-timeline-desc { color: var(--slate); font-size: 0.88rem; max-width: 560px; }

        .cp-terminal { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 1.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; margin-bottom: 2rem; }
        .cp-prompt { color: var(--mint); }
        .cp-terminal-out { color: var(--slate); margin: 0.5rem 0 1.25rem 1.2rem; }
        .cp-terminal-out:last-child { margin-bottom: 0; }
        .cp-contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        .cp-contact-btn { display: flex; align-items: center; gap: 0.6rem; background: var(--panel-alt); border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem 1rem; color: var(--paper); text-decoration: none; font-size: 0.88rem; transition: border-color 0.2s, color 0.2s; }
        .cp-contact-btn:hover { border-color: var(--pink); color: var(--pink); }
        .cp-contact-note { color: var(--slate); font-size: 0.82rem; margin-top: 1.25rem; }

        .cp-footer { text-align: center; padding: 2rem 1.5rem 3rem; font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--slate); }

        @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        @media (max-width: 720px) {
          .cp-projects-grid { grid-template-columns: 1fr; }
          .cp-contact-grid { grid-template-columns: 1fr; }
          .cp-stats { grid-template-columns: repeat(2, 1fr); }
          .cp-skill-row { flex-direction: column; align-items: flex-start; }
          .cp-skill-key { width: auto; margin-bottom: 0.3rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cp-root * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <header className="cp-tabbar">
        <div className="cp-dots">
          <span className="cp-dot cp-dot-pink" />
          <span className="cp-dot cp-dot-lilac" />
          <span className="cp-dot cp-dot-mint" />
        </div>
        <nav className="cp-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.id)}
              className={`cp-tab ${active === t.id ? 'cp-tab-active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {/* ABOUT */}
        <section id="about" ref={setRef('about')} className="cp-section cp-hero">
          <div className="cp-eyebrow">// carla-dasal/portfolio</div>
          <h1 className="cp-hero-name">Carla Dasal</h1>
          <p className="cp-hero-bio">
            Graduating IT student at TUP with hands-on experience turning manual business
            processes into working software — a Power Platform tool built during a Telstra
            internship, plus full-stack and mobile apps built solo. Comfortable across React,
            Node, Python, and SQL, and just as comfortable reaching for low-code when that's
            the right tool for the job.
          </p>
          <div className="cp-status">
            <span className="cp-status-dot" />
            open to entry-level opportunities
          </div>
          <div className="cp-cta-row">
            <button className="cp-btn cp-btn-primary" onClick={() => scrollTo('projects')}>
              View projects
            </button>
            <a className="cp-btn cp-btn-ghost" href="mailto:dasalcarla812@gmail.com">
              <Mail size={15} /> Email me
            </a>
          </div>
          <div className="cp-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="cp-stat-num">{s.num}</div>
                <div className="cp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="cp-window">
            <div className="cp-window-bar">
              <span className="cp-dot cp-dot-pink" />
              <span className="cp-dot cp-dot-lilac" />
              <span className="cp-dot cp-dot-mint" />
              <span className="cp-window-filename">about.tsx</span>
            </div>
            <div className="cp-code">
              <div className="cp-code-line"><span className="cp-line-num">1</span><span><span className="cp-key">const</span> developer = {'{'}</span></div>
              <div className="cp-code-line"><span className="cp-line-num">2</span><span>&nbsp;&nbsp;name: <span className="cp-string">'Carla Dasal'</span>,</span></div>
              <div className="cp-code-line"><span className="cp-line-num">3</span><span>&nbsp;&nbsp;role: <span className="cp-string">'IT Graduate'</span>,</span></div>
              <div className="cp-code-line"><span className="cp-line-num">4</span><span>&nbsp;&nbsp;location: <span className="cp-string">'Paranaque City, PH'</span>,</span></div>
              <div className="cp-code-line"><span className="cp-line-num">5</span><span>&nbsp;&nbsp;stack: [<span className="cp-string">'React'</span>, <span className="cp-string">'Python'</span>, <span className="cp-string">'Power Platform'</span>],</span></div>
              <div className="cp-code-line"><span className="cp-line-num">6</span><span>&nbsp;&nbsp;status: <span className="cp-string">'open to opportunities'</span>,</span></div>
              <div className="cp-code-line"><span className="cp-line-num">7</span><span className="cp-punc">{'};'}</span></div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" ref={setRef('skills')} className="cp-section">
          <div className="cp-eyebrow">// skills</div>
          <h2 className="cp-heading">What I work with</h2>
          <div className="cp-skills-card">
            {SKILL_GROUPS.map((g) => (
              <div className="cp-skill-row" key={g.key}>
                <span className={`cp-skill-key cp-skill-key-${g.accent}`}>{g.key}:</span>
                {g.items.map((item) => (
                  <span key={item} className={`cp-pill cp-pill-${g.accent}`}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" ref={setRef('projects')} className="cp-section">
          <div className="cp-eyebrow">// projects</div>
          <h2 className="cp-heading">Things I've built</h2>
          <div className="cp-projects-grid">
            {PROJECTS.map((p) => (
              <div className="cp-project-card" key={p.title}>
                <div className={`cp-project-top cp-project-top-${p.accent}`} />
                <div className="cp-project-body">
                  <span className={`cp-ext-badge cp-pill-${p.accent}`}>{p.ext}</span>
                  <div className="cp-project-title">{p.title}</div>
                  <div className="cp-project-desc">{p.desc}</div>
                  <div className="cp-tag-row">
                    {p.tags.map((t) => <span key={t} className="cp-tag">{t}</span>)}
                  </div>
                  {p.links ? (
                    <div className="cp-project-links">
                      {p.links.map((l) => (
                        <a key={l.label} className="cp-project-link" href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.icon === 'github' ? <Code2 size={15} /> : <ExternalLink size={15} />}
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="cp-project-note">{p.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" ref={setRef('timeline')} className="cp-section">
          <div className="cp-eyebrow">// timeline</div>
          <h2 className="cp-heading">Education, work & certifications</h2>
          <div className="cp-timeline">
            {TIMELINE.map((item, i) => {
              const meta = TYPE_META[item.type];
              const Icon = meta.icon;
              return (
                <div className="cp-timeline-item" key={i}>
                  <span className={`cp-timeline-dot cp-dot-${meta.accent}`} />
                  <div className="cp-timeline-date">
                    {item.date}
                    <span className={`cp-type-pill cp-pill-${meta.accent}`}>
                      <Icon size={11} /> {meta.label}
                    </span>
                  </div>
                  <div className="cp-timeline-title">{item.title}</div>
                  {item.org && <div className="cp-timeline-org">{item.org}</div>}
                  {item.desc && <div className="cp-timeline-desc">{item.desc}</div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" ref={setRef('contact')} className="cp-section">
          <div className="cp-eyebrow">// contact</div>
          <h2 className="cp-heading">Let's talk</h2>
          <div className="cp-terminal">
            <div><span className="cp-prompt">carla@dasal:~$</span> whoami</div>
            <div className="cp-terminal-out">Carla Dasal — IT Graduate, open to entry-level roles</div>
            <div><span className="cp-prompt">carla@dasal:~$</span> contact --list</div>
            <div className="cp-contact-grid">
              <a className="cp-contact-btn" href="mailto:dasalcarla812@gmail.com">
                <Mail size={16} /> dasalcarla812@gmail.com
              </a>
              <a className="cp-contact-btn" href="https://www.linkedin.com/in/carla-dasal-486736399" target="_blank" rel="noopener noreferrer">
                <Link2 size={16} /> LinkedIn
              </a>
              <a className="cp-contact-btn" href="tel:+639662509610">
                <Phone size={16} /> +63 966 250 9610
              </a>
              <span className="cp-contact-btn" style={{ cursor: 'default' }}>
                <MapPin size={16} /> Paranaque City, PH
              </span>
            </div>
          </div>
          <p className="cp-contact-note">References available upon request.</p>
        </section>
      </main>

      <footer className="cp-footer">Built with React · 2026</footer>
    </div>
  );
}