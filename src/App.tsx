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
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './App.css';


import circuithubDashboard from './assets/circuithub/01-dashboard.png';
import captivityHome from './assets/captivity-care/01-home.jpg';
import jewelStorefront from './assets/jewel/01-storefront.jpg';
import noisewatchReport from './assets/noisewatch/01-noise-report.png';
import noisewatchQr from './assets/noisewatch/02-qr-download.png';


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

interface ProjectImage {
  src: string;
  caption: string;
}

type ProjectFrame = 'browser' | 'mobile';

interface Project {
  ext: string;
  accent: Accent;
  title: string;
  desc: string;
  tags: string[];
  links?: ProjectLink[];
  note?: string;
  images?: ProjectImage[];
  frame?: ProjectFrame; // 'browser' (default) shows a window-bar mockup, 'mobile' shows a phone frame
  impact?: string[]; // short, outcome-focused bullets — what changed because this exists
  capstone?: boolean; // shows a "Capstone Project" badge instead of the index number
  belowLinksImage?: ProjectImage; // plain (non-phone-frame) image rendered directly under the links row
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
    ext: '.tsx',
    accent: 'pink',
    title: 'NoiseWatch',
    desc: 'A community-driven platform that lets residents record, analyze, and report noise disturbances directly to their barangay — backed by real-time AI audio analysis and GPS location tagging. Detects and ranks the sources behind a recording (music, traffic, construction, etc.), measures decibel level and distance, and flags likely violations such as entertainment noise during quiet hours, turning a raw audio clip into a barangay-ready report.',
    tags: ['React', 'Mobile', 'AI Audio Analysis', 'GPS', 'Capstone'],
    links: [{ label: 'Visit site', href: 'https://noisewatchapp.vercel.app/', icon: 'external' }],
    frame: 'mobile',
    capstone: true,
    impact: [
      'Gives residents a direct, evidence-backed channel to report noise disturbances to their barangay instead of informal complaints',
      'Real-time AI analysis identifies and ranks likely noise sources, so reports come with data instead of just an accusation',
      'GPS tagging and measured decibel/distance readings give barangay officials context they can act on immediately',
    ],
    images: [
      { src: noisewatchReport, caption: 'Noise report — detected sounds, decibel level & flagged reasons' },
    ],
    belowLinksImage: { src: noisewatchQr, caption: 'Scan to download the Android APK' },
  },
  {
    ext: '.jsx',
    accent: 'lilac',
    title: 'Captivity & Care',
    desc: 'Mobile app for logging animal behavior, tracking health, flagging issues, and scheduling vet visits.',
    tags: ['React Native', 'Mobile', 'Health Tracking'],
    links: [{ label: 'View repo', href: 'https://github.com/carla-io/animalMobile', icon: 'github' }],
    frame: 'mobile',
    impact: [
      'Centralized animal health logs that were previously scattered across paper and memory',
      'Status filters make it easy to spot flagged issues at a glance instead of digging through records',
      'Vet-visit scheduling built directly into the workflow instead of a separate calendar or notebook',
    ],
    images: [
      { src: captivityHome, caption: 'Home screen — task list with status filters' },
    ],
  },
  {
    ext: '.py',
    accent: 'pink',
    title: 'CircuitHub',
    desc: 'A full-stack inventory management system for electronics components, built to eliminate the stock loss and duplicate ordering that come from tracking parts across spreadsheets. Includes a live dashboard with at-a-glance stats (total components, total stock, low-stock alerts, category counts), full CRUD for components with fields like category, stock level, minimum threshold, specifications, and supplier, and automatic status flags that surface low-stock items in real time. A dedicated Reports module generates downloadable PDF summaries — category breakdowns, supplier performance scoring, and monthly usage trends — turning raw inventory data into something a manager can actually act on.',
    tags: ['Python', 'Inventory System', 'Database', 'Data Visualization', 'PDF Reporting'],
    links: [{ label: 'Live demo', href: 'https://python-frontend-9vgt.onrender.com', icon: 'external' }],
    frame: 'browser',
    impact: [
      'Replaced spreadsheet tracking with a single source of truth for stock across categories',
      'Automatic low-stock flags cut the risk of stockouts and duplicate ordering',
      'PDF reporting turned raw inventory data into supplier and usage insights managers can act on',
    ],
    images: [
      { src: circuithubDashboard, caption: 'Dashboard — stock stats & low-stock alerts' },
    ],
  },
  {
    ext: '.jsx',
    accent: 'lilac',
    title: 'Jewel',
    desc: 'Mobile storefront for jewelry products with full CRUD product management, built end to end.',
    tags: ['React Native', 'E-commerce', 'CRUD'],
    links: [{ label: 'View repo', href: 'https://github.com/carla-io/jewel2', icon: 'github' }],
    frame: 'mobile',
    impact: [
      'End-to-end product CRUD gives full control over catalog updates without touching a database directly',
      'Category and cart flows built to mirror a real e-commerce shopping experience',
    ],
    images: [
      { src: jewelStorefront, caption: 'Storefront — categories, product grid & cart' },
    ],
  },
  {
    ext: 'LOW-CODE',
    accent: 'mint',
    title: 'PO Request Form',
    desc: 'Power Apps tool that replaced a manual, paper-based purchase order process — wired into SharePoint and Power Automate.',
    tags: ['Power Apps', 'SharePoint', 'Power Automate'],
    note: 'Internal business solution — Telstra Hypercare BU',
    impact: [
      'Digitized and automated a manual, paper-based workflow',
      'Improved document and data management across the process',
      'Collaborated directly with stakeholders to deliver a user-friendly business solution',
    ],
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


const STATS: Stat[] = [
  { num: '2026', label: 'Grad Year' },
  { num: '5', label: 'Projects Shipped' },
  { num: '1', label: 'Internship' },
  { num: '5', label: 'Certifications' },
];

export default function CarlaDasalPortfolio() {
  const [active, setActive] = useState<string>('about');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

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

          <div className="cp-projects-stack">
            {PROJECTS.map((p, i) => (
              <article
                className={`cp-project-full ${p.images?.length ? 'cp-project-full-split' : ''}`}
                key={p.title}
              >
                <div className="cp-project-info">
                  <div className="cp-project-full-header">
                    <span className={`cp-ext-badge cp-pill-${p.accent}`}>{p.ext}</span>
                    {p.capstone ? (
                      <span className="cp-capstone-badge">Capstone Project</span>
                    ) : (
                      <span className="cp-project-index">{String(i + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  <h3 className="cp-project-full-title">{p.title}</h3>
                  <p className="cp-project-full-desc">{p.desc}</p>

                  <div className="cp-tag-row">
                    {p.tags.map((t) => (
                      <span key={t} className="cp-tag">{t}</span>
                    ))}
                  </div>

                  {p.impact && p.impact.length > 0 ? (
                    <div className="cp-impact">
                      <div className={`cp-impact-label cp-skill-key-${p.accent}`}>Impact</div>
                      <ul className="cp-impact-list">
                        {p.impact.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {p.links ? (
                    <div className="cp-project-links">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          className={`cp-project-link cp-project-cta cp-project-cta-${p.accent}`}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.icon === 'github' ? <Code2 size={15} /> : <ExternalLink size={15} />}
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : p.note ? (
                    <div className="cp-project-note">{p.note}</div>
                  ) : null}

                  {p.belowLinksImage ? (
                    <figure
                      className="cp-shot cp-shot-inline"
                      onClick={() => setLightbox(p.belowLinksImage!)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setLightbox(p.belowLinksImage!);
                      }}
                      aria-label={`Enlarge screenshot: ${p.belowLinksImage.caption}`}
                    >
                      <div className="cp-shot-bar">
                        <span className="cp-dot cp-dot-pink" />
                        <span className="cp-dot cp-dot-lilac" />
                        <span className="cp-dot cp-dot-mint" />
                      </div>
                      <img
                        src={p.belowLinksImage.src}
                        alt={`${p.title} — ${p.belowLinksImage.caption}`}
                        loading="lazy"
                      />
                      <figcaption>{p.belowLinksImage.caption}</figcaption>
                    </figure>
                  ) : null}
                </div>

                {p.images && p.images.length > 0 ? (
                  <div className={`cp-project-media ${p.frame === 'mobile' ? 'cp-project-media-mobile' : ''}`}>
                    {p.images.map((img) =>
                      p.frame === 'mobile' ? (
                        <figure
                          className="cp-shot-phone"
                          key={img.src}
                          onClick={() => setLightbox(img)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') setLightbox(img);
                          }}
                          aria-label={`Enlarge screenshot: ${img.caption}`}
                        >
                          <span className="cp-notch" aria-hidden="true" />
                          <img src={img.src} alt={`${p.title} — ${img.caption}`} loading="lazy" />
                          <figcaption>{img.caption}</figcaption>
                        </figure>
                      ) : (
                        <figure
                          className="cp-shot"
                          key={img.src}
                          onClick={() => setLightbox(img)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') setLightbox(img);
                          }}
                          aria-label={`Enlarge screenshot: ${img.caption}`}
                        >
                          <div className="cp-shot-bar">
                            <span className="cp-dot cp-dot-pink" />
                            <span className="cp-dot cp-dot-lilac" />
                            <span className="cp-dot cp-dot-mint" />
                          </div>
                          <img src={img.src} alt={`${p.title} — ${img.caption}`} loading="lazy" />
                          <figcaption>{img.caption}</figcaption>
                        </figure>
                      )
                    )}
                  </div>
                ) : (
                  <div className="cp-shot-placeholder">Screenshots coming soon</div>
                )}
              </article>
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

      {lightbox && (
        <div className="cp-lightbox" onClick={() => setLightbox(null)}>
          <button
            className="cp-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close enlarged screenshot"
          >
            <X size={20} />
          </button>
          <figure
            className="cp-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.caption} />
            <figcaption>{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}