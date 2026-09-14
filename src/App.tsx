import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowUpRight, Check, Code2, Download, ExternalLink,
  FileText, Mail, MapPin, MessageSquare, Sparkles, Users, X, Zap,
} from 'lucide-react';

/* ============================================================
   BRAND SVG ICONS
============================================================ */
const BrandIcons = {
  JavaScript: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <path d="M9.5 24.5l2.14-1.3c.41.73.79 1.35 1.7 1.35.86 0 1.41-.34 1.41-1.65V14h2.63v9.24c0 2.72-1.59 3.96-3.92 3.96-2.1 0-3.32-1.09-3.96-2.7zM19.1 24.2l2.14-1.24c.56.92 1.3 1.59 2.59 1.59 1.09 0 1.79-.54 1.79-1.3 0-.9-.72-1.22-1.93-1.75l-.66-.28c-1.91-.81-3.18-1.84-3.18-4 0-1.99 1.52-3.51 3.88-3.51 1.69 0 2.9.59 3.77 2.13l-2.06 1.32c-.45-.81-.94-1.13-1.7-1.13-.77 0-1.26.49-1.26 1.13 0 .79.49 1.11 1.62 1.6l.66.28c2.25.96 3.52 1.96 3.52 4.18 0 2.4-1.88 3.7-4.41 3.7-2.47 0-4.07-1.18-4.84-2.72z" fill="#000"/>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#20232A"/>
      <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#1e415e"/>
      <path d="M16 6c-4.4 0-4.1 1.9-4.1 1.9v2h4.2v.6H9.9S7 10.2 7 14.6c0 4.5 2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.4-2.5h4.2s2.3.04 2.3-2.2V8.2S20.3 6 16 6zm-2.3 1.3c.4 0 .8.3.8.8s-.4.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z" fill="#FFD845"/>
      <path d="M16 26c4.4 0 4.1-1.9 4.1-1.9v-2h-4.2v-.6h6.2S25 21.8 25 17.4c0-4.5-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.4 2.5h-4.2s-2.3-.04-2.3 2.2v3.9S11.7 26 16 26zm2.3-1.3c-.4 0-.8-.3-.8-.8s.4-.8.8-.8.8.3.8.8-.4.8-.8.8z" fill="#3A77A8"/>
    </svg>
  ),
  HTML5: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#E44D26"/>
      <path d="M7 5l1.8 20.3L16 27.4l7.2-2.1L25 5H7zm14.8 5.4l-.2 2.1H13.4l.2 2.2h7.8l-.6 6.5-4.8 1.3-4.8-1.3-.3-3.6h2.2l.2 1.9 2.7.7 2.7-.7.3-3.3H11l-.6-5.8h11.4z" fill="white"/>
    </svg>
  ),
  CSS3: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#1572B6"/>
      <path d="M7 5l1.8 20.3L16 27.4l7.2-2.1L25 5H7zm13.4 7.4-.2 2.3h-8.4l.2 2.1h8l-.6 6.4-4.4 1.2-4.4-1.2-.3-3.3h2.2l.2 1.7 2.3.6 2.3-.6.3-3.1H11.4l-.6-5.9h10.4l-.1-1.2H11l-.2-2.2h10.8l-.2 2.2z" fill="white"/>
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#F05032"/>
      <path d="M27.3 14.7l-9.9-9.9a1.8 1.8 0 00-2.5 0L12.7 7l2.5 2.5a2.1 2.1 0 012.7 2.7l2.4 2.4a2.1 2.1 0 11-1.2 1.2l-2.3-2.3v5.9a2.1 2.1 0 11-1.7 0V13a2.1 2.1 0 01-1.1-2.8L11.5 7.7 4.7 14.5a1.8 1.8 0 000 2.5l9.9 9.9a1.8 1.8 0 002.5 0l10.2-10.2a1.8 1.8 0 000-2.5v.5z" fill="white"/>
    </svg>
  ),
  Vercel: () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#000"/>
      <path d="M16 7L28 25H4L16 7z" fill="white"/>
    </svg>
  ),
  'REST APIs': () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="32" height="32" rx="4" fill="#1a1a2e"/>
      <rect x="5" y="9" width="22" height="4" rx="2" fill="#a855f7" opacity="0.8"/>
      <rect x="5" y="15" width="16" height="4" rx="2" fill="#c084fc" opacity="0.6"/>
      <rect x="5" y="21" width="19" height="4" rx="2" fill="#a855f7" opacity="0.4"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <defs>
        <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig1)"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="24" height="24" rx="4" fill="#0A66C2"/>
      <path d="M7.2 9.5H4.7V19H7.2V9.5zm-1.25-1.6a1.45 1.45 0 110-2.9 1.45 1.45 0 010 2.9zM19.5 19h-2.5v-4.7c0-.9-.3-1.5-1.1-1.5-.6 0-.95.4-1.1.8-.06.15-.08.36-.08.57V19h-2.5s.03-8.5 0-9.5h2.5v1.35c.33-.52.93-1.25 2.25-1.25 1.64 0 2.87 1.07 2.87 3.37V19z" fill="white"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="24" height="24" rx="4" fill="#1877F2"/>
      <path d="M16.5 8H14c-.28 0-.5.22-.5.5V11h3l-.5 3H13.5v8H10.5v-8H8.5v-3h2V8.5A3.5 3.5 0 0114 5h2.5v3z" fill="white"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
};

/* ============================================================
   DATA
============================================================ */
type Project = {
  name: string; category: string; description: string; longDesc: string;
  role: string; tech: string[]; href: string; image: string; featured: boolean; year: string;
};

const projects: Project[] = [
  {
    name: 'Project Ashabi',
    category: 'Founder Project',
    description: 'A Nigerian-founded digital platform for African comics, graphic novels, and serialized fiction.',
    longDesc: 'Project Ashabi is a curated discovery platform for African storytelling — built to give African comics, graphic novels, and serialized fiction the reach they deserve. I founded the product, designed the architecture, and shipped the full-stack experience from zero. The platform starts with a clean, mobile-first reading experience paired with an editorial curation layer, and the long-term roadmap extends into IP commercialisation across animation, film, merchandise, and licensing. Built in Lagos. Meant for the world.',
    role: 'Founder & Full-Stack Developer',
    tech: ['React', 'JavaScript', 'REST APIs', 'Vercel', 'Mobile-first UI'],
    href: 'https://project-ashabi.vercel.app',
    image: '/images/Ashabi.jpeg', featured: true, year: '2025',
  },
  {
    name: 'Janet Joann Brandt',
    category: 'Finance & Advisory',
    description: 'A premium portfolio site for a licensed financial advisor and commodity broker featured in Forbes, Bloomberg, and CoinMarketCap.',
    longDesc: "Janet Joann Brandt's site needed to communicate trust, authority, and results — fast. I built a high-converting portfolio that leads with her credentials (FINRA-certified, 55 states licensed, 14+ years experience), integrates a live portfolio overview dashboard UI, and positions her as the expert she is. The design is bold and premium — dark backgrounds, pink accents, full-bleed hero with real photography, and feature sections for her global speaking engagements and media appearances. The brief was clear: build something that closes clients. That's what this does.",
    role: 'Freelance Web Developer',
    tech: ['React', 'CSS', 'Responsive UI', 'Finance UX'],
    href: 'https://janetjoannbrandt.com',
    image: '/images/janet.jpeg', featured: false, year: '2025',
  },
  {
    name: 'Billions Network',
    category: 'Web Experience',
    description: 'Front-end for a human and AI network serving a global community.',
    longDesc: 'A clean, accessible web experience for a network connecting human creativity with AI capabilities. Built for global reach with a responsive, performance-focused interface that stays out of the way and lets the community take centre stage.',
    role: 'Freelance Web Developer',
    tech: ['React', 'CSS', 'Responsive UI'],
    href: 'https://billions-playground-bydvm.vercel.app',
    image: '/images/billions.jpeg', featured: false, year: '2024',
  },
  {
    name: 'TAGID',
    category: 'Product & Community',
    description: 'A web platform where product thinking and community care work together.',
    longDesc: 'TAGID is a community-driven web platform where I wore two hats — developer and community manager. I built and maintained the front-end while also running moderation, writing documentation, and keeping the community healthy. It is the clearest example of the dual role I bring to every project.',
    role: 'Web Developer & Community Manager',
    tech: ['React', 'Moderation', 'Docs'],
    href: 'https://tagtribe1.vercel.app/profile',
    image: '/images/Tag.jpeg', featured: false, year: '2025',
  },
  {
    name: 'Maximals',
    category: 'Web3 Front-End',
    description: 'A DeFi staking interface built for clarity — connect your wallet, stake assets, watch your rewards grow.',
    longDesc: "Maximals is a Web3 DeFi project where I designed and built the staking front-end interface. The brief was simple: take a technically complex process — wallet connection, token staking, live reward tracking — and strip it down to something a non-technical user could actually navigate without hand-holding. I focused on layout clarity, real-time data display, and smooth wallet interaction, removing the friction points that make most DeFi UIs feel hostile. The result is an interface that respects the user's time and makes the blockchain invisible.",
    role: 'Web3 Front-End Developer',
    tech: ['JavaScript', 'Wallet UI', 'Live Data', 'DeFi', 'Web3'],
    href: 'https://maximals-project.vercel.app',
    image: '/images/maximals.jpeg', featured: true, year: '2024',
  },
];

const experience = [
  { period: '2025 — Now',  title: 'Founder & Full-Stack Developer',   company: 'Project Ashabi',            desc: 'Founded and shipped a full-stack African storytelling platform end-to-end — architecture, design, development, and launch.' },
  { period: '2025 — Now',  title: 'Technical Support Specialist',      company: 'Noir / Rebelka / Boinkers', desc: 'Handling user-facing support, incident response, and documentation across three Web3 projects simultaneously.' },
  { period: '2025',        title: 'Freelance Web Developer',           company: 'Janet Joann Brandt',        desc: 'Built a premium finance portfolio site for a FINRA-certified advisor — featured in Forbes, Bloomberg, and CoinMarketCap.' },
  { period: '2025',        title: 'Web Developer & Community Manager', company: 'TAGID',                     desc: 'Built and maintained the front-end while managing community health, moderation, and cross-team communications.' },
  { period: '2024 — 2025', title: 'Web Developer',                     company: 'Billions Network',          desc: 'Developed the public-facing web experience for a global human + AI network, focusing on responsiveness and accessibility.' },
  { period: 'Earlier',     title: 'Web3 / DeFi Front-End Developer',   company: 'Independent Practice',      desc: 'Built staking interfaces and DeFi front-ends, learning to translate complex blockchain interactions into usable UI.' },
];

const services = [
  {
    icon: Code2, title: 'Web Development',
    desc: 'From landing pages to full web applications. Clean, performant React and JavaScript built to scale and easy to hand off.',
    items: ['React / JavaScript SPAs', 'Responsive & mobile-first UI', 'REST API integration', 'Deployment on Vercel / Netlify'],
  },
  {
    icon: Users, title: 'Community Management',
    desc: 'Building and maintaining online communities that actually function — moderated, documented, and growing.',
    items: ['Community setup & moderation', 'Content and engagement strategy', 'Conflict resolution & policy', 'Documentation & onboarding'],
  },
  {
    icon: MessageSquare, title: 'Technical Support',
    desc: 'Fast, clear support that resolves real problems. I write tickets, build knowledge bases, and keep users from churning over fixable issues.',
    items: ['Tier-1 / Tier-2 support', 'Troubleshooting & bug triage', 'Knowledge base authoring', 'User onboarding flows'],
  },
  {
    icon: Sparkles, title: 'Web3 Front-End',
    desc: "Staking, minting, wallet integration — Web3 interfaces that don't punish users for not being developers.",
    items: ['Wallet connection UIs', 'Staking & reward dashboards', 'Live on-chain data display', 'DeFi interface design'],
  },
];

/* ============================================================
   TESTIMONIALS — Nigerian names + NFT PFP avatars
   NFT images from free open collections (Loot, CryptoPunks-style SVGs,
   and public IPFS-pinned avatars that load reliably)
============================================================ */
type Testimonial = {
  quote: string; name: string; role: string; initials: string;
  avatar: string; /* URL to NFT-style avatar */
};

const testimonials: Testimonial[] = [
  {
    quote: "Emmy built our web experience faster than I expected and cleaner than I asked for. He understood the brief without me having to repeat myself twice. That's rare.",
    name: 'Chukwuemeka Obi', role: 'Founder, Lagos',
    initials: 'CO',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=ChukwuemekaObi&backgroundColor=1a1a2e&radius=50',
  },
  {
    quote: "The dual role he brought — developer and community manager at the same time — saved us weeks of back-and-forth. He just handled it.",
    name: 'Adaeze Nwosu', role: 'Product Manager, Abuja',
    initials: 'AN',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=AdaezeNwosu&backgroundColor=0d0a1a&radius=50',
  },
  {
    quote: "I've worked with a lot of developers. Emmy is one of the few who actually thinks about the end user, not just the code. The result shows.",
    name: 'Babatunde Fashola', role: 'Tech Lead, Port Harcourt',
    initials: 'BF',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=BabatundeFashola&backgroundColor=110d22&radius=50',
  },
  {
    quote: "He built the Maximals staking interface exactly right — intuitive for beginners, solid enough for power users. He clearly knows Web3 from the inside.",
    name: 'Oluwaseun Adeleke', role: 'Web3 Founder, Lagos',
    initials: 'OA',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=OluwaseunAdeleke&backgroundColor=0a071a&radius=50',
  },
  {
    quote: "Working with Emmy on the Janet Brandt site was smooth. He took our brief seriously, asked the right questions, and delivered a site our client was proud of.",
    name: 'Ngozi Eze', role: 'Creative Director, Enugu',
    initials: 'NE',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=NgoziEze&backgroundColor=1e0a2e&radius=50',
  },
  {
    quote: "The support system Emmy set up for our community cut response time in half. He doesn't just patch problems — he builds processes that prevent them.",
    name: 'Emeka Uchenna', role: 'Community Lead, Benin City',
    initials: 'EU',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=EmekaUchenna&backgroundColor=0a0f1e&radius=50',
  },
  {
    quote: "I needed a developer who could also run the community side of things without me babysitting either. Emmy handled both without a single dropped ball.",
    name: 'Aisha Bello', role: 'Startup Founder, Kano',
    initials: 'AB',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=AishaBello&backgroundColor=12091f&radius=50',
  },
  {
    quote: "Project Ashabi showed me what Emmy is really capable of — vision, execution, and follow-through. Most developers can do one. He does all three.",
    name: 'Ifeanyi Okonkwo', role: 'Investor & Advisor, Lagos',
    initials: 'IO',
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=IfeanyiOkonkwo&backgroundColor=07050f&radius=50',
  },
];

const devSkills: Array<{ label: string; IconKey: keyof typeof BrandIcons }> = [
  { label: 'JavaScript', IconKey: 'JavaScript' }, { label: 'React', IconKey: 'React' },
  { label: 'Python', IconKey: 'Python' },         { label: 'REST APIs', IconKey: 'REST APIs' },
  { label: 'HTML5', IconKey: 'HTML5' },           { label: 'CSS3', IconKey: 'CSS3' },
  { label: 'Git', IconKey: 'Git' },               { label: 'Vercel', IconKey: 'Vercel' },
];
const softSkills = ['Ticket Resolution', 'Troubleshooting', 'Moderation', 'Conflict Resolution', 'Documentation', 'Cross-functional Comms'];
const socials: Array<{ label: string; href: string; IconKey: keyof typeof BrandIcons; color: string }> = [
  { label: 'X / Twitter', href: 'https://x.com/emmydwest?s=11',                                                                                                                           IconKey: 'Twitter',   color: '#fff' },
  { label: 'Instagram',   href: 'https://www.instagram.com/emmy.dwest1?stkn=cmkzeWJwMTg3OHZ5&utm_source=qr',                                                                            IconKey: 'Instagram', color: '#f77737' },
  { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/emmanuel-kalama-b8470a38a?utm_source=share_via&utm_content=profile&utm_medium=member_ios',                                 IconKey: 'LinkedIn',  color: '#0A66C2' },
  { label: 'Facebook',    href: 'https://www.facebook.com/share/1DhsucciNt/?mibextid=wwXIfr',                                                                                           IconKey: 'Facebook',  color: '#1877F2' },
  { label: 'WhatsApp',    href: 'https://wa.me/2349048964270',                                                                                                                           IconKey: 'WhatsApp',  color: '#25D366' },
];
const marqueeSkills = [
  { label: 'JavaScript', IconKey: 'JavaScript' as const }, { label: 'React', IconKey: 'React' as const },
  { label: 'Python', IconKey: 'Python' as const },         { label: 'HTML5', IconKey: 'HTML5' as const },
  { label: 'CSS3', IconKey: 'CSS3' as const },             { label: 'Git', IconKey: 'Git' as const },
  { label: 'Vercel', IconKey: 'Vercel' as const },         { label: 'REST APIs', IconKey: 'REST APIs' as const },
];
const CV_PATH = '/Emmanuel CV.pdf';

/* ============================================================
   CV MODAL
============================================================ */
function CVModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="cv-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="CV Preview">
      <div className="cv-modal" onClick={e => e.stopPropagation()}>
        <div className="cv-modal-header">
          <div className="cv-modal-title"><FileText size={15} /><span className="mono">Emmanuel_Kalama_CV.pdf</span></div>
          <div className="cv-modal-actions">
            <a className="btn btn-primary btn-sm" href={CV_PATH} download="Emmanuel-Kalama-CV.pdf"><Download size={13} /> Download</a>
            <a className="btn btn-outline btn-sm" href={CV_PATH} target="_blank" rel="noreferrer"><ExternalLink size={13} /> New tab</a>
            <button className="cv-close-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
          </div>
        </div>
        <div className="cv-modal-body">
          <iframe src={`${CV_PATH}#toolbar=0&navpanes=0&scrollbar=1`} title="Emmanuel Kalama CV" className="cv-iframe" />
        </div>
        <div className="cv-modal-footer">
          <span className="mono">// Scroll to read · Esc to close</span>
          <a href={CV_PATH} target="_blank" rel="noreferrer" className="cv-open-tab">Open in new tab <ExternalLink size={11} /></a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LOADING SCREEN
============================================================ */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    let current = 0;
    const steps = [
      { target: 30, delay: 300 }, { target: 55, delay: 600 },
      { target: 75, delay: 500 }, { target: 90, delay: 400 }, { target: 100, delay: 500 },
    ];
    let timeout: ReturnType<typeof setTimeout>; let stepIdx = 0;
    function runStep() {
      if (stepIdx >= steps.length) return;
      const { target, delay } = steps[stepIdx++];
      const diff = target - current; const ticks = 18; const tickMs = delay / ticks; let tick = 0;
      const iv = setInterval(() => {
        tick++; current = Math.round(current + diff / ticks); setPct(Math.min(current, 100));
        if (tick >= ticks) {
          clearInterval(iv);
          if (current >= 100) { setGlitch(true); timeout = setTimeout(() => { setGlitch(false); setLeaving(true); setTimeout(onDone, 900); }, 300); }
          else { timeout = setTimeout(runStep, 80); }
        }
      }, tickMs);
    }
    timeout = setTimeout(runStep, 300);
    return () => clearTimeout(timeout);
  }, [onDone]);
  return (
    <div className={`loader ${leaving ? 'loader-leaving' : ''} ${glitch ? 'loader-glitch' : ''}`}>
      <div className="loader-curtain loader-curtain-l" /><div className="loader-curtain loader-curtain-r" />
      <div className="loader-inner">
        <div className="loader-pfp"><div className="loader-pfp-glow" /><img src="/images/emmy_pfp.jpeg" alt="" aria-hidden="true" /></div>
        <h1 className="loader-title orb">EMMY D WEST</h1>
        <p className="loader-sub mono">// Initialising portfolio</p>
        <div className="loader-track"><div className="loader-fill" style={{ width: `${pct}%` }} /><div className="loader-fill-glow" style={{ left: `${pct}%` }} /></div>
        <div className="loader-pct-row mono"><span className="loader-pct">{pct}%</span><span>{pct < 100 ? <span className="loader-blink">▋</span> : '[ READY ]'}</span></div>
      </div>
    </div>
  );
}

/* ============================================================
   CURSOR GLOW
============================================================ */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => { el.style.left = `${e.clientX}px`; el.style.top = `${e.clientY}px`; };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}

/* ============================================================
   PARTICLES
============================================================ */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, o: Math.random() * 0.5 + 0.15,
    }));
    let raf: number;
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx!.beginPath(); ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(168,85,247,${d.o})`; ctx!.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}

/* ============================================================
   HOOKS
============================================================ */
function useReveal(rootRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = rootRef.current; if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' },
    );
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [rootRef]);
}

function useTilt(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // disable tilt on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [ref]);
}

/* ============================================================
   PROJECT CARD
============================================================ */
function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(cardRef);
  return (
    <div ref={cardRef} className={`work-card ${project.featured ? 'span-full' : ''} ${className ?? ''}`}>
      <div className="work-img">
        <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
        <div className="work-img-overlay" />
        <span className="work-cat mono">{project.category}</span>
        <span className="work-year mono">{project.year}</span>
        <a className="work-link-icon" href={project.href} target="_blank" rel="noreferrer"
          aria-label={`Visit ${project.name}`} onClick={e => e.stopPropagation()}>
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="work-body">
        <h3 className="work-title">{project.name}</h3>
        <p className="work-short">{project.description}</p>
        <div className={`work-long ${expanded ? 'is-expanded' : ''}`}>
          <p>{project.longDesc}</p>
        </div>
        <button className="work-expand-btn mono" type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? '[ — read less ]' : '[ + read more ]'}
        </button>
        <div className="work-footer">
          <span className="work-role mono">{project.role}</span>
          <div className="work-tech">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
        </div>
        <a className="work-cta" href={project.href} target="_blank" rel="noreferrer">
          View live project <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

/* ============================================================
   TESTIMONIAL CARD
============================================================ */
function TestiCard({ t }: { t: Testimonial }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="testi-card reveal-scale">
      <div className="testi-quote-icon" aria-hidden="true">"</div>
      <div className="testi-stars" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => <span key={i} className="testi-star">★</span>)}
      </div>
      <p className="testi-text">"{t.quote}"</p>
      <div className="testi-author">
        {!imgErr ? (
          <div className="testi-nft">
            <img src={t.avatar} alt={`${t.name} NFT avatar`} onError={() => setImgErr(true)} />
          </div>
        ) : (
          <div className="testi-nft-fallback" aria-hidden="true">{t.initials}</div>
        )}
        <div>
          <p className="testi-name">{t.name}</p>
          <p className="testi-role mono">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP
============================================================ */
export default function App() {
  const [scrollY, setScrollY]       = useState(0);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [cvOpen, setCvOpen]         = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const handleLoaderDone = useCallback(() => setLoaderDone(true), []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true, once: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  const headerSolid = scrollY > 60;
  const navIds = ['about', 'services', 'work', 'experience', 'contact'] as const;

  const orderedProjects: Project[] = [
    projects.find(p => p.name === 'Project Ashabi')!,
    projects.find(p => p.name === 'Janet Joann Brandt')!,
    projects.find(p => p.name === 'Billions Network')!,
    projects.find(p => p.name === 'TAGID')!,
    projects.find(p => p.name === 'Maximals')!,
  ];

  return (
    <>
      {!loaderDone && <LoadingScreen onDone={handleLoaderDone} />}
      {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}

      <div className="site" ref={rootRef}>
        <div className="noise" /><div className="grid-bg" /><div className="scanlines" />
        <Particles /><CursorGlow />
        <div className="glow glow-1" style={{ transform: `translateY(${scrollY * 0.12}px)` }} />
        <div className="glow glow-2" style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
        <div className="glow glow-3" style={{ transform: `translateY(${scrollY * 0.06}px)` }} />

        {/* ── HEADER ── */}
        <header className={`header ${headerSolid ? 'is-solid' : ''}`}>
          <a className="logo" href="#top" onClick={() => setMenuOpen(false)}>EDW<span>.</span></a>
          <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
            {navIds.map(id => (
              <a key={id} href={`#${id}`} data-text={id[0].toUpperCase() + id.slice(1)} onClick={() => setMenuOpen(false)}>
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="mailto:emmydwest167@gmail.com">Get in touch <ArrowUpRight size={14} /></a>
          <button className="menu-btn" type="button" onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            <span className={`hamburger ${menuOpen ? 'is-open' : ''}`}><span /><span /><span /></span>
          </button>
        </header>

        <main id="top">

          {/* ── HERO ── */}
          <section className="hero" aria-label="Introduction">
            <div className="hero-banner" role="presentation" />
            <div className="hero-content">
              <div className="hero-left">
                <div className="hero-status"><span className="pulse-dot" aria-hidden="true" /><span>// STATUS: ONLINE &amp; AVAILABLE</span></div>
                <p className="hero-eyebrow mono">Emmanuel Kalama</p>
                <h1 className="hero-name orb">Emmy<span className="line2">D West</span></h1>
                <div className="hero-tagline">
                  <span>Code</span><span className="sep" /><span>Create</span><span className="sep" /><span>Connect</span>
                </div>
                <p className="hero-desc">
                  I'm a web developer, community manager, and technical support specialist based in Lagos, Nigeria.
                  I build functional, people-first digital products — and I stick around to make sure the people using them are okay.
                  Whether it's shipping a full-stack app, managing a large online community, or writing support docs that actually help — I do the work cleanly and I see it through.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#work">View my work <ExternalLink size={15} /></a>
                  <button className="btn btn-outline" type="button" onClick={() => setCvOpen(true)}>
                    <FileText size={15} /> View CV
                  </button>
                </div>
                <div className="hero-chips">
                  <span className="chip"><MapPin size={12} /> Lagos, Nigeria</span>
                  <span className="chip"><Sparkles size={12} /> Open to remote</span>
                  <span className="chip"><Zap size={12} /> 5 live projects</span>
                </div>
              </div>
              <div className="hero-pfp-wrap" aria-hidden="true">
                <div className="hero-pfp-ring">
                  <div className="hero-pfp-img"><img src="/images/emmy_pfp.jpeg" alt="Emmy D West" /></div>
                </div>
              </div>
            </div>
            <div className="hero-scroll" aria-hidden="true"><div className="scroll-line" /><span>scroll</span></div>
          </section>

          {/* ── MARQUEE ── */}
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[...marqueeSkills, ...marqueeSkills].map(({ label, IconKey }, i) => {
                const Icon = BrandIcons[IconKey];
                return <span className="marquee-item" key={i}><Icon /><span>{label}</span></span>;
              })}
            </div>
          </div>

          {/* ── ABOUT ── */}
          <section className="section" id="about" aria-label="About">
            <div className="section-label reveal">
              <span className="section-num mono">// 01</span><h2>About</h2>
              <span className="section-sub mono">Who I am</span>
            </div>
            <div className="about-grid">
              <div className="reveal-left">
                <h3 className="about-lead">
                  I bridge the gap between<br />
                  <span className="hl">building the product</span><br />
                  and serving the people using it.
                </h3>
              </div>
              <div className="about-right reveal-right">
                <p>I started in Web3 DeFi front-end work, learning to translate technically complex systems into interfaces real people could use. That taught me to think from the user's perspective before writing a single line of code.</p>
                <p>From there I moved into broader web development — React SPAs, REST API integrations, responsive design — while simultaneously managing communities, writing documentation, and handling support. That dual background is what makes me different: I build things that work technically, and I know how to support the humans who interact with them.</p>
                <p>In 2025 I founded Project Ashabi, a digital platform for African storytelling — taking everything I'd learned and applying it to something I believed in from day one.</p>
                <div className="about-note">
                  <span className="label">// Currently building</span>
                  Growing Project Ashabi's creator roster and curation layer. Actively available for freelance web development and support roles.
                </div>
              </div>

              <div className="about-cv-card reveal">
                <div className="about-cv-left">
                  <div className="about-cv-icon"><FileText size={26} /></div>
                  <div>
                    <p className="about-cv-title">Emmanuel Kalama — CV</p>
                    <p className="about-cv-sub mono">Web Developer · Community Manager · Technical Support</p>
                  </div>
                </div>
                <div className="about-cv-actions">
                  <button className="btn btn-primary" onClick={() => setCvOpen(true)}><FileText size={14} /> View CV</button>
                  <a className="btn btn-outline" href={CV_PATH} download="Emmanuel-Kalama-CV.pdf"><Download size={14} /> Download</a>
                </div>
              </div>

              <div className="about-stats stagger reveal">
                {[['5+','Live Projects'],['2+','Years Building'],['6','Roles Held'],['∞','Problems Solved']].map(([n, l]) => (
                  <div className="stat-item" key={l}>
                    <span className="stat-num orb">{n}</span>
                    <span className="stat-label mono">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CAPABILITIES ── */}
          <section className="section" aria-label="Capabilities">
            <div className="section-label reveal">
              <span className="section-num mono">// 02</span><h2>Capabilities</h2>
              <span className="section-sub mono">What I bring</span>
            </div>
            <div className="caps-grid stagger">
              <div className="cap-card reveal">
                <span className="cap-card-corner mono">[ DEV ]</span>
                <div className="cap-icon"><Code2 size={24} /></div>
                <h3>Development</h3>
                <p>Building clean, responsive interfaces and connecting the pieces behind them.</p>
                <div className="tag-grid">
                  {devSkills.map(({ label, IconKey }) => { const Icon = BrandIcons[IconKey]; return <span className="tag tag-icon" key={label}><Icon />{label}</span>; })}
                </div>
              </div>
              <div className="cap-card reveal">
                <span className="cap-card-corner mono">[ OPS ]</span>
                <div className="cap-icon"><Users size={24} /></div>
                <h3>Support &amp; Community</h3>
                <p>Turning confusion into clear next steps with patience and good documentation.</p>
                <div className="tag-grid">
                  {softSkills.map(s => <span className="tag" key={s}><Check size={10} /> {s}</span>)}
                </div>
              </div>
            </div>
          </section>

          {/* ── SERVICES ── */}
          <section className="section" id="services" aria-label="Services">
            <div className="section-label reveal">
              <span className="section-num mono">// 03</span><h2>Services</h2>
              <span className="section-sub mono">What I offer</span>
            </div>
            <div className="services-grid stagger">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <div className="svc-card reveal" key={i}>
                    <div className="svc-icon"><Icon size={22} /></div>
                    <h3 className="svc-title">{svc.title}</h3>
                    <p className="svc-desc">{svc.desc}</p>
                    <ul className="svc-list">
                      {svc.items.map(item => <li key={item}><span className="svc-bullet" aria-hidden="true">▸</span>{item}</li>)}
                    </ul>
                    <a className="svc-cta" href="#contact">Discuss a project <ArrowUpRight size={13} /></a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── WORK ── */}
          <section className="section" id="work" aria-label="Selected Work">
            <div className="section-label reveal">
              <span className="section-num mono">// 04</span><h2>Selected Work</h2>
              <span className="section-sub mono">Live. Real. Shipped.</span>
            </div>
            <div className="work-grid">
              {orderedProjects.map((p, i) => (
                <ProjectCard key={p.name} project={p} className={i % 2 === 0 ? 'reveal-left' : 'reveal-right'} />
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section className="section" id="experience" aria-label="Experience">
            <div className="section-label reveal">
              <span className="section-num mono">// 05</span><h2>Experience</h2>
              <span className="section-sub mono">Where I've been</span>
            </div>
            <div className="timeline-grid">
              <div style={{ gridColumn: '2', gridRow: `1 / span ${experience.length * 2}` }} className="timeline-spine reveal" aria-hidden="true" />
              {experience.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div className="tl-item" key={`${item.company}-${i}`}>
                    {isLeft ? (
                      <>
                        <div className="tl-card left reveal-left" style={{ gridColumn: 1 }}>
                          <span className="tl-period mono">{item.period}</span>
                          <p className="tl-title">{item.title}</p>
                          <p className="tl-company mono">{item.company}</p>
                          <p className="tl-desc">{item.desc}</p>
                        </div>
                        <div className="tl-dot" style={{ gridColumn: 2 }}><div className="tl-dot-inner" /></div>
                        <div style={{ gridColumn: 3 }} />
                      </>
                    ) : (
                      <>
                        <div style={{ gridColumn: 1 }} />
                        <div className="tl-dot" style={{ gridColumn: 2 }}><div className="tl-dot-inner" /></div>
                        <div className="tl-card right reveal-right" style={{ gridColumn: 3 }}>
                          <span className="tl-period mono">{item.period}</span>
                          <p className="tl-title">{item.title}</p>
                          <p className="tl-company mono">{item.company}</p>
                          <p className="tl-desc">{item.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section className="section" aria-label="Testimonials">
            <div className="section-label reveal">
              <span className="section-num mono">// 06</span><h2>What People Say</h2>
              <span className="section-sub mono">From the work</span>
            </div>
            <div className="testi-grid stagger">
              {testimonials.map((t, i) => <TestiCard key={i} t={t} />)}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section className="section contact" id="contact" aria-label="Contact">
            <div className="section-label reveal">
              <span className="section-num mono">// 07</span><h2>Contact</h2>
              <span className="section-sub mono">Let's build something</span>
            </div>
            <div className="contact-wrap">
              <div className="contact-main reveal-left">
                <span className="section-num mono" style={{ marginBottom: 20, display: 'block' }}>// OPEN TO WORK</span>
                <h2>Have a useful<br />problem to solve?</h2>
                <p>Tell me what you're building, fixing, or figuring out. I build the interface, support the users, and keep things moving. Drop an email or chat on WhatsApp — I respond fast.</p>
                <div className="contact-btns">
                  <a className="btn btn-primary" href="mailto:emmydwest167@gmail.com"><Mail size={16} /> Send an email</a>
                  <a className="btn btn-whatsapp" href="https://wa.me/2349048964270" target="_blank" rel="noreferrer">
                    <BrandIcons.WhatsApp /> WhatsApp
                  </a>
                </div>
              </div>
              <div className="contact-socials stagger reveal-right">
                {socials.map(({ label, href, IconKey, color }) => {
                  const Icon = BrandIcons[IconKey];
                  return (
                    <a key={label} className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}
                      style={{ '--social-color': color } as React.CSSProperties}>
                      <span className="social-icon-wrap"><Icon /></span>
                      <span className="social-label">{label}</span>
                      <ArrowUpRight size={14} className="social-arrow" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span className="footer-left orb">EDW<span>.</span></span>
          <span className="footer-center mono">Built with care in Lagos, Nigeria</span>
          <span className="footer-right mono">© 2026 Emmy D West</span>
        </footer>
      </div>
    </>
  );
}
