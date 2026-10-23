/**
 * Draws a simple, elegant interior illustration as an inline SVG data URI.
 * Only used when VITE_OFFLINE_IMAGES=true (e.g. previews without internet access).
 * The same id always produces the same picture.
 */
const palettes = [
  { wall: ['#EDE4D6', '#D9CBB6'], floor: '#B89A78', sofa: '#F4EEE5', accent: '#B8955E', dark: '#3A3530', plant: '#7E8A6A' },
  { wall: ['#E6DED3', '#CFC2B0'], floor: '#8E6E52', sofa: '#3E3A36', accent: '#C9A97A', dark: '#26231F', plant: '#6F7D5C' },
  { wall: ['#F1ECE4', '#E1D6C6'], floor: '#C8B193', sofa: '#B9714F', accent: '#9A7A47', dark: '#4A3B30', plant: '#5E6B4E' },
  { wall: ['#DCD6CC', '#BEB5A8'], floor: '#6B5444', sofa: '#E9E0D2', accent: '#D4BC94', dark: '#1F1E1C', plant: '#7D8670' },
  { wall: ['#EFE6DA', '#D6C4AC'], floor: '#A4836A', sofa: '#9DB5B0', accent: '#B8955E', dark: '#3B3A38', plant: '#5E6B4E' },
  { wall: ['#2F2D2A', '#45413C'], floor: '#5B4636', sofa: '#C9A97A', accent: '#E3CFA8', dark: '#171615', plant: '#6F7D5C' },
];

const hash = (str) => {
  let h = [...str].reduce((acc, c) => Math.imul(acc ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d) >>> 0;
  return (h ^ (h >>> 12)) >>> 0;
};

function room(id) {
  const h = hash(id);
  const p = palettes[h % palettes.length];
  const arch = (h >> 3) % 2 === 0;
  const winX = 160 + ((h >> 5) % 5) * 150;
  const sofaX = 520 + ((h >> 8) % 4) * 60;
  const lamp = (h >> 11) % 2 === 0;
  const art = (h >> 13) % 3;
  const g = `g${h % 1000}`;

  const windowShape = arch
    ? `<path d="M${winX} 640V300a130 130 0 0 1 260 0v340z" fill="url(#${g}l)"/><path d="M${winX + 130} 170v470M${winX} 420h260" stroke="${p.wall[1]}" stroke-width="8"/>`
    : `<rect x="${winX}" y="190" width="300" height="450" fill="url(#${g}l)"/><path d="M${winX + 150} 190v450M${winX} 415h300" stroke="${p.wall[1]}" stroke-width="8"/>`;

  const artwork =
    art === 0
      ? `<rect x="1080" y="260" width="220" height="280" fill="${p.accent}" opacity=".85"/><circle cx="1190" cy="400" r="70" fill="${p.wall[0]}"/>`
      : art === 1
        ? `<rect x="1060" y="280" width="140" height="190" fill="${p.dark}" opacity=".8"/><rect x="1220" y="280" width="140" height="190" fill="${p.accent}" opacity=".7"/>`
        : `<path d="M1060 520c60-160 160-220 300-240v240z" fill="${p.accent}" opacity=".75"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="${g}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.wall[0]}"/><stop offset="1" stop-color="${p.wall[1]}"/></linearGradient>
<linearGradient id="${g}l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFDF8"/><stop offset="1" stop-color="#F3E6CF"/></linearGradient>
<linearGradient id="${g}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.floor}"/><stop offset="1" stop-color="${p.dark}" stop-opacity=".85"/></linearGradient>
<radialGradient id="${g}s" cx=".3" cy=".2" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="1000" fill="url(#${g}w)"/>
${windowShape}
<path d="M${winX + 300} 640 L${winX + 700} 1000 H${winX - 200} Z" fill="#FFF8EA" opacity=".18"/>
${artwork}
<rect y="640" width="1600" height="360" fill="url(#${g}f)"/>
<ellipse cx="${sofaX + 260}" cy="860" rx="520" ry="70" fill="${p.wall[0]}" opacity=".35"/>
<rect x="${sofaX}" y="560" width="560" height="190" rx="34" fill="${p.sofa}"/>
<rect x="${sofaX - 30}" y="610" width="80" height="150" rx="30" fill="${p.sofa}"/>
<rect x="${sofaX + 510}" y="610" width="80" height="150" rx="30" fill="${p.sofa}"/>
<rect x="${sofaX + 40}" y="520" width="160" height="110" rx="24" fill="${p.accent}" opacity=".9"/>
<rect x="${sofaX + 360}" y="520" width="160" height="110" rx="24" fill="${p.wall[1]}"/>
<rect x="${sofaX + 120}" y="800" width="320" height="26" rx="13" fill="${p.dark}"/>
<rect x="${sofaX + 150}" y="826" width="10" height="60" fill="${p.dark}"/><rect x="${sofaX + 400}" y="826" width="10" height="60" fill="${p.dark}"/>
${lamp ? `<path d="M${sofaX + 280} 0v250" stroke="${p.dark}" stroke-width="4"/><path d="M${sofaX + 200} 330a80 80 0 0 1 160 0z" fill="${p.accent}"/>` : `<path d="M1460 760V420" stroke="${p.dark}" stroke-width="6"/><path d="M1400 440h120l-30-90h-60z" fill="${p.accent}"/>`}
<rect x="140" y="700" width="90" height="120" rx="10" fill="${p.dark}" opacity=".85"/>
<circle cx="185" cy="640" r="80" fill="${p.plant}"/><circle cx="140" cy="590" r="55" fill="${p.plant}" opacity=".85"/><circle cx="235" cy="575" r="50" fill="${p.plant}" opacity=".9"/>
<rect width="1600" height="1000" fill="url(#${g}s)"/>
</svg>`;
}

function person(id) {
  const bgs = ['#E9E0D2', '#D8CBB6', '#E3CFA8', '#CFC2B0'];
  const bg = bgs[hash(id) % bgs.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<rect width="400" height="400" fill="${bg}"/>
<circle cx="200" cy="165" r="70" fill="#8C877F" opacity=".55"/>
<path d="M70 400c8-90 62-140 130-140s122 50 130 140z" fill="#8C877F" opacity=".55"/>
</svg>`;
}

const PORTRAIT_IDS = new Set([
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1438761681033-6461ffad8d80',
  'photo-1500648767791-00dcc994a43e',
  'photo-1534528741775-53994a69daeb',
  'photo-1544005313-94ddf0286df2',
  'photo-1472099645785-5658abf4ff4e',
]);

const cache = new Map();
export function illustration(id) {
  if (!cache.has(id)) {
    const svg = PORTRAIT_IDS.has(id) ? person(id) : room(id);
    cache.set(id, `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\n/g, ''))}`);
  }
  return cache.get(id);
}
