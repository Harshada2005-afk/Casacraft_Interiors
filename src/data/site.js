import { img } from '../utils/image';

/** Global site content: navigation, contact details and shared marketing copy. */
export const siteInfo = {
  name: 'CasaCraft Interiors',
  tagline: 'Beautiful Spaces. Thoughtfully Designed.',
  description:
    'A boutique interior design studio crafting elegant, functional and deeply personal spaces for homes and businesses across India.',
  phone: '+91 98765 43210',
  email: 'hello@casacraftinteriors.com',
  address: '14, Palm Grove Lane, Bandra West, Mumbai 400050',
  hours: [
    { days: 'Monday – Friday', time: '10:00 AM – 7:00 PM' },
    { days: 'Saturday', time: '10:00 AM – 4:00 PM' },
    { days: 'Sunday', time: 'By appointment' },
  ],
  socials: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'Pinterest', href: 'https://pinterest.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Design Styles', to: '/design-styles' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const footerQuickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Client Login', to: '/login' },
];

export const heroContent = {
  headline: 'Beautiful Spaces. Thoughtfully Designed.',
  subtitle: 'We create elegant, functional and personalized interiors that turn your house into a place you truly love.',
  image: img('livingLux', 2400),
};

export const whyChooseUs = [
  {
    icon: 'Sparkles',
    title: 'Personalized Design',
    text: 'Every space begins with you. We listen closely and design around your lifestyle, taste and routines.',
  },
  {
    icon: 'Gem',
    title: 'Quality Materials',
    text: 'We source premium, durable materials from trusted partners and master craftsmen.',
  },
  {
    icon: 'Users',
    title: 'Expert Designers',
    text: 'An award-winning team of designers, architects and project managers under one roof.',
  },
  {
    icon: 'Eye',
    title: 'Attention to Detail',
    text: 'From the grain of the wood to the last cushion, nothing is left to chance.',
  },
];

export const designProcess = [
  {
    step: '01',
    icon: 'MessageSquare',
    title: 'Consultation',
    text: 'We meet to understand your needs, lifestyle, budget and the story you want your space to tell.',
  },
  {
    step: '02',
    icon: 'PenTool',
    title: 'Concept & Planning',
    text: 'Mood boards, layouts and material palettes come together into a clear, considered design direction.',
  },
  {
    step: '03',
    icon: 'Layers',
    title: '3D Visualization',
    text: 'Photo-realistic renders let you see and refine every detail before work begins on site.',
  },
  {
    step: '04',
    icon: 'Hammer',
    title: 'Execution',
    text: 'Our project team manages craftsmen, timelines and quality until the final styled reveal.',
  },
];

export const stats = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 25, suffix: '+', label: 'Design Awards' },
];

export const aboutContent = {
  heroImage: img('livingClassic', 2400),
  storyImage: img('plans', 1200),
  philosophyImage: img('decor', 1200),
  story: [
    'CasaCraft Interiors began in 2015 in a small Mumbai studio with a simple belief: everyone deserves a home that feels truly theirs.',
    'What started as two designers sketching at a kitchen table has grown into a multidisciplinary team of designers, architects and craftspeople who have shaped more than 150 homes, offices and boutique spaces across India.',
  ],
  philosophy:
    'We believe the most beautiful spaces are honest ones. They are built around real lives, crafted from natural materials and designed to age gracefully. We favour timeless over trendy, and comfort over showiness.',
  mission:
    'To design elegant, functional interiors that improve the way people live and work, delivered with transparency, care and uncompromising craftsmanship.',
  approach: [
    { title: 'Listen first', text: 'We spend time understanding how you live before we draw a single line.' },
    { title: 'Design with purpose', text: 'Every element is chosen to be beautiful, useful and right for you.' },
    { title: 'Craft with care', text: 'Our in-house team and trusted artisans deliver finishes that last.' },
    { title: 'Deliver with clarity', text: 'Transparent budgets, clear timelines and a single point of contact.' },
  ],
  team: [
    { name: 'Isha Kapoor', role: 'Founder & Principal Designer', image: 'photo-1534528741775-53994a69daeb' },
    { name: 'Rahul Menon', role: 'Design Director', image: 'photo-1507003211169-0a1dd7228f2d' },
    { name: 'Aditi Rao', role: 'Senior Interior Designer', image: 'photo-1544005313-94ddf0286df2' },
  ],
};
