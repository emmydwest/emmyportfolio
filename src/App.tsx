import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Download,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Twitter,
  Users,
  Zap,
} from 'lucide-react';

type Project = {
  name: string;
  category: string;
  description: string;
  role: string;
  tech: string[];
  href: string;
  image: string;
  span: string;
};

const projects: Project[] = [
  {
    name: 'Project Ashabi',
    category: 'Founder Project',
    description: 'A people-first digital product built from the first sketch to a shipped, useful experience. Founded, designed, and engineered end-to-end.',
    role: 'Founder & Full-Stack Developer',
    tech: ['React', 'JavaScript', 'REST APIs'],
    href: 'https://project-ashabi.vercel.app',
    image: '/images/Ashabi.jpeg',
    span: 'lg',
  },
  {
    name: 'Billions Network',
    category: 'Web Experience',
    description: 'A bright, accessible front-end for a human and AI network serving a global community.',
    role: 'Freelance Web Developer',
    tech: ['React', 'CSS', 'Responsive UI'],
    href: 'https://billions-playground-bydvm.vercel.app',
    image: '/images/billions.jpeg',
    span: 'sm',
  },
  {
    name: 'TAGID',
    category: 'Product & Community',
    description: 'A web platform where product thinking and community care work together in the same flow.',
    role: 'Web Developer & Community Manager',
    tech: ['React', 'Moderation', 'Docs'],
    href: 'https://tagtribe1.vercel.app/profile',
    image: '/images/Tag.jpeg',
    span: 'sm',
  },
  {
    name: 'Maximals',
    category: 'Web3 Front-End',
    description: 'A staking interface translated into a calm, readable experience without unnecessary wallet friction.',
    role: 'Web3 Front-End Developer',
    tech: ['JavaScript', 'Wallet UI', 'Live Data'],
    href: 'https://maximals-project.vercel.app',
    image: '/images/maximals.jpeg',
    span: 'lg',
  },
];

const experience = [
  { period: '2025 — Now', title: 'Founder & Full-Stack Developer', company: 'Project Ashabi' },
  { period: '2025 — Now', title: 'Technical Support Specialist', company: 'Noir / Rebelka / Boinkers' },
  { period: '2025', title: 'Web Developer & Community Manager', company: 'TAGID' },
  { period: '2024 — 2025', title: 'Web Developer', company: 'Billions Network' },
  { period: 'Earlier', title: 'Web3 / DeFi Front-End Developer', company: 'Independent practice' },
];

const skills = [
  { label: 'JavaScript', icon: Code2 },
  { label: 'React', icon: Zap },
  { label: 'Python', icon: Code2 },
  { label: 'REST APIs', icon: Zap },
  { label: 'HTML5', icon: Code2 },
  { label: 'CSS3', icon: Code2 },
  { label: 'Git', icon: Code2 },
  { label: 'Vercel', icon: Zap },
  { label: 'Community Moderation', icon: Users },
  { label: 'Technical Support', icon: MessageCircle },
  { label: 'Documentation', icon: Code2 },
  { label: 'Conflict Resolution', icon: Users },
];

const socials = [
  { label: 'X', href: 'https://x.com/emmydwest?s=11', icon: Twitter },
  { label: 'Instagram', href: 'https://www.instagram.com/emmy.dwest1?stkn=cmkzeWJwMTg3OHZ5&utm_source=qr', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuel-kalama-b8470a38a?utm_source=share_via&utm_content=profile&utm_medium=member_ios', icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1DhsucciNt/?mibextid=wwXIfr', icon: Facebook },
  { label: 'WhatsApp', href: 'https://wa.me/2349048964270', icon: MessageCircle },
];

const marqueeItems = ['JavaScript', 'React', 'Python', 'REST APIs', 'HTML5', 'CSS3', 'Git', 'Vercel', 'Community', 'Support', 'Moderation', 'Documentation'];

function downloadResume() {
  const resume = `EMMY D WEST\nWeb Developer & Technical Support Specialist\nemmydwest167@gmail.com\n\nI build the product and help the people using it.\n\nSkills\n${skills.map((s) => s.label).join(', ')}\n\nExperience\n${experience.map((item) => `${item.title} — ${item.company} (${item.period})`).join('\n')}\n`;
  const blob = new Blob([resume], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Emmy-D-West-Resume.txt';
  link.click();
  URL.revokeObjectURL(url);
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const headerSolid = scrollY > 40;

  return (
    <div className="site" ref={rootRef}>
      <div className="noise" />
      <div className="grid-bg" />
      <div className="glow glow-1" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
      <div className="glow glow-2" style={{ transform: `translateY(${scrollY * -0.1}px)` }} />

      <header className={`header ${headerSolid ? 'is-solid' : ''}`}>
        <a className="logo" href="#top" onClick={closeMenu}>EDW<span>.</span></a>
        <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href="mailto:emmydwest167@gmail.com">Get in touch <ArrowUpRight size={15} /></a>
        <button className="menu-btn" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? 'Close' : 'Menu'}</button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-left reveal">
            <div className="badge"><span className="pulse" /> Available for work</div>
            <h1 className="hero-title">Building <span className="grad">digital products</span> with a human side.</h1>
            <p className="hero-sub">I'm Emmy D West — a web developer, community manager, and technical support specialist based in Lagos. I build the product, then help the people using it.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">View my work <ArrowDown size={17} /></a>
              <button className="btn btn-ghost" type="button" onClick={downloadResume}><Download size={17} /> Download CV</button>
            </div>
            <div className="hero-meta">
              <span><MapPin size={14} /> Lagos, Nigeria</span>
              <span className="dot-sep" />
              <span>Open to remote</span>
              <span className="dot-sep" />
              <span>4 live projects</span>
            </div>
          </div>
          <div className="hero-right reveal">
            <div className="hero-card">
              <div className="hero-card-img"><img src="/images/emmy_pfp.jpeg" alt="Emmy D West" /></div>
              <div className="hero-card-info">
                <div className="hero-card-row"><span className="mono">ROLE</span><span>Developer + Support</span></div>
                <div className="hero-card-row"><span className="mono">FOCUS</span><span>People-first products</span></div>
                <div className="hero-card-row"><span className="mono">BASED</span><span>Lagos, NG</span></div>
              </div>
              <div className="hero-card-tag"><Sparkles size={13} /> <span className="mono">EST. 2024</span></div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee reveal">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="section-head reveal">
            <span className="section-num mono">01</span>
            <h2>About</h2>
          </div>
          <div className="about-body">
            <p className="about-lead reveal">I work across the two sides of a good digital experience: the interface people see, and the support they need when something gets difficult.</p>
            <div className="about-text reveal">
              <p>My development work spans JavaScript, React, Python, APIs, and responsive interfaces. My support work spans ticket resolution, troubleshooting, moderation, and clear documentation.</p>
              <p>That combination means I care about more than getting something to run. I care about whether it makes sense, whether it feels considered, and whether someone can actually use it.</p>
              <p className="about-note"><span className="mono">RECENT</span> Rebuilding my public code footprint after a device setback — active project links below.</p>
            </div>
          </div>
        </section>

        {/* SKILLS BENTO */}
        <section className="section skills-section">
          <div className="section-head reveal">
            <span className="section-num mono">02</span>
            <h2>Capabilities</h2>
          </div>
          <div className="skills-bento reveal">
            <div className="bento-card bento-dev">
              <div className="bento-icon"><Code2 size={22} /></div>
              <h3>Development</h3>
              <p>Building clean, responsive interfaces and connecting the pieces behind them.</p>
              <div className="skill-tags">
                {['JavaScript', 'React', 'Python', 'REST APIs', 'HTML5', 'CSS3', 'Git', 'Vercel'].map((s) => <span key={s}><Check size={12} /> {s}</span>)}
              </div>
            </div>
            <div className="bento-card bento-support">
              <div className="bento-icon"><Users size={22} /></div>
              <h3>Support & Community</h3>
              <p>Turning confusion into clear next steps with patience and good documentation.</p>
              <div className="skill-tags">
                {['Ticket Resolution', 'Troubleshooting', 'Moderation', 'Conflict Resolution', 'Documentation', 'Cross-functional Comms'].map((s) => <span key={s}><Check size={12} /> {s}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* WORK BENTO */}
        <section className="section work" id="work">
          <div className="section-head reveal">
            <span className="section-num mono">03</span>
            <h2>Selected Work</h2>
            <p className="section-sub">Live links, real projects, no inflated numbers.</p>
          </div>
          <div className="work-grid reveal">
            {projects.map((project) => (
              <a key={project.name} className={`work-card work-${project.span}`} href={project.href} target="_blank" rel="noreferrer">
                <div className="work-card-img"><img src={project.image} alt={`${project.name} preview`} /><div className="work-card-overlay" /></div>
                <div className="work-card-body">
                  <div className="work-card-top"><span className="work-card-cat mono">{project.category}</span><ExternalLink size={16} /></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="work-card-meta">
                    <span className="mono">{project.role}</span>
                    <div className="work-card-tech">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section experience" id="experience">
          <div className="section-head reveal">
            <span className="section-num mono">04</span>
            <h2>Experience</h2>
          </div>
          <div className="timeline reveal">
            {experience.map((item, i) => (
              <div className="tl-item" key={`${item.company}-${item.title}`}>
                <span className="tl-num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="tl-period mono">{item.period}</span>
                <div className="tl-content">
                  <h3>{item.title}</h3>
                  <p>{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="contact-card reveal">
            <div className="contact-left">
              <span className="section-num mono">05</span>
              <h2>Have a useful<br />problem to solve?</h2>
              <p>Tell me what you're building, fixing, or figuring out. I'd like to hear about it.</p>
              <a className="btn btn-primary" href="mailto:emmydwest167@gmail.com"><Mail size={17} /> emmydwest167@gmail.com</a>
              <a className="btn btn-whatsapp" href="https://wa.me/2349048964270" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp</a>
            </div>
            <div className="contact-right">
              <div className="contact-socials">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon size={20} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 Emmy D West</span>
        <span className="mono">Built with care in Lagos</span>
      </footer>
    </div>
  );
}

export default App;
