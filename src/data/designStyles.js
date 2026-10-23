import { img } from '../utils/image';

export const designStyles = [
  {
    id: 'modern',
    name: 'Modern',
    tagline: 'Clean lines, bold simplicity',
    image: img('kitchenModern', 1600),
    description:
      'Modern design celebrates function and form with crisp lines, open layouts and a confident use of contrast. Every element has a purpose, and the result feels fresh, bright and timeless.',
    characteristics: [
      'Clean geometric lines',
      'Open, uncluttered layouts',
      'Neutral base with bold accents',
      'Sleek, handle-less surfaces',
    ],
    palette: ['#F7F6F3', '#D4D0C8', '#8E8A84', '#2A2A2A'],
    materials: ['Lacquer', 'Glass', 'Polished concrete', 'Steel'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    tagline: 'Less, but better',
    image: img('livingNeutral', 1600),
    description:
      'Minimalism is the art of editing. A calm, restrained palette and generous negative space allow light, proportion and a handful of beautiful pieces to shine.',
    characteristics: ['Generous negative space', 'Monochrome palettes', 'Hidden storage', 'Natural light as a feature'],
    palette: ['#F2EEE7', '#DCCFBD', '#A89580', '#3B3A38'],
    materials: ['Lime plaster', 'Pale oak', 'Linen', 'Travertine'],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    tagline: 'Refined, rich and indulgent',
    image: img('livingLux', 1600),
    description:
      'Luxury interiors are layered with rich textures, precious materials and bespoke details. Think veined marble, velvet, metallic accents and dramatic, sculptural lighting.',
    characteristics: ['Bespoke furniture and joinery', 'Statement lighting', 'Rich, layered textures', 'Metallic accents'],
    palette: ['#F6F1E8', '#C9A97A', '#6B5444', '#1F1E1C'],
    materials: ['Marble', 'Velvet', 'Brass', 'Silk'],
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    tagline: 'Of the moment, always evolving',
    image: img('livingWarm', 1600),
    description:
      'Contemporary design reflects what is current, mixing soft curves, organic shapes and natural textures with a relaxed, liveable sophistication.',
    characteristics: ['Curved, organic forms', 'Mixed materials', 'Earthy, warm neutrals', 'Statement art'],
    palette: ['#F4EDE2', '#D9C3A0', '#9C7B5B', '#3D3833'],
    materials: ['Bouclé', 'Terrazzo', 'Rattan', 'Walnut'],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    tagline: 'Light, cosy and honest',
    image: img('bedroomNordic', 1600),
    description:
      'Rooted in Nordic simplicity and the idea of hygge, Scandinavian interiors are bright, warm and practical, with pale woods, soft textiles and plenty of natural light.',
    characteristics: ['Light woods and white walls', 'Cosy textiles', 'Functional furniture', 'Indoor greenery'],
    palette: ['#F5F4F0', '#E3D7C4', '#B9BEBC', '#5D6164'],
    materials: ['Ash & birch', 'Wool', 'Ceramics', 'Cotton'],
  },
  {
    id: 'industrial',
    name: 'Industrial',
    tagline: 'Raw, urban character',
    image: img('kitchenDark', 1600),
    description:
      'Inspired by converted warehouses and lofts, industrial design embraces exposed structure, raw materials and a moody, characterful palette.',
    characteristics: ['Exposed brick and ducts', 'Metal and reclaimed wood', 'Open floor plans', 'Vintage lighting'],
    palette: ['#C9C5BE', '#9C5B3B', '#5B5853', '#222120'],
    materials: ['Brick', 'Blackened steel', 'Concrete', 'Leather'],
  },
];
