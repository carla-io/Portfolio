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
  Download,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './App.css';


// lucide-react removed brand icons (GitHub, Twitter, etc.) in 1.0,
// so the GitHub mark is a small inline SVG instead of a lucide import.
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.13-.02-2.04-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

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

interface GithubRepo {
  name: string;
  desc: string;
  lang: string;
  accent: Accent;
  href: string;
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
    desc: 'Power Apps tool that replaced a manual, paper-based purchase order process — wired into SharePoint and Power Automate.',
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

const GITHUB_USERNAME = 'carla-io';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const CV_FILE_PATH = '/Dasal_Carla_C_Resume.pdf';

const GITHUB_REPOS: GithubRepo[] = [
  { name: 'noisewatch', desc: 'JavaScript project — most starred repo on the profile.', lang: 'JavaScript', accent: 'pink', href: `${GITHUB_URL}/noisewatch` },
  { name: 'clicklock-real', desc: 'PHP application, follow-up build on clicklock.', lang: 'PHP', accent: 'mint', href: `${GITHUB_URL}/clicklock-real` },
  { name: 'laravel', desc: 'JavaScript-backed Laravel project.', lang: 'JavaScript', accent: 'pink', href: `${GITHUB_URL}/laravel` },
  { name: 'sneaknet', desc: 'PHP application.', lang: 'PHP', accent: 'mint', href: `${GITHUB_URL}/sneaknet` },
];

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
        <a className="cp-btn cp-btn-ghost" href={CV_FILE_PATH} target="_blank" rel="noopener noreferrer">
  <Download size={15} /> View/Download CV
</a>
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

          <div className="cp-github-header">
            <GithubIcon size={18} />
            <span>From <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="cp-github-link">github.com/{GITHUB_USERNAME}</a></span>
          </div>
          <div className="cp-repos-grid">
            {GITHUB_REPOS.map((r) => (
              <a key={r.name} className="cp-repo-card" href={r.href} target="_blank" rel="noopener noreferrer">
                <div className="cp-repo-top">
                  <Code2 size={14} />
                  <span className="cp-repo-name">{r.name}</span>
                </div>
                <div className="cp-repo-desc">{r.desc}</div>
                <div className="cp-repo-lang">
                  <span className={`cp-lang-dot cp-dot-${r.accent}`} />
                  {r.lang}
                </div>
              </a>
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
              <a className="cp-contact-btn" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} /> github.com/{GITHUB_USERNAME}
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
