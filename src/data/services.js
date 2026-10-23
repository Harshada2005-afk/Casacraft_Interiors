import { img } from '../utils/image';

/** Mock services. `icon` is a name looked up in src/utils/icons.js. */
export const services = [
  {
    id: 'residential-interior-design',
    title: 'Residential Interior Design',
    icon: 'Home',
    image: img('livingLux', 1200),
    short: 'Complete home interiors designed around the way you live, from first sketch to final styling.',
    description:
      'Our signature end-to-end service. We plan, design and deliver your entire home, coordinating architects, craftsmen and vendors so you enjoy a seamless, stress-free journey.',
    features: [
      'Space planning & layouts',
      'Custom furniture & joinery',
      'Lighting design',
      'Turnkey execution',
      'Final styling & art curation',
    ],
    startingPrice: '₹8 Lakh',
  },
  {
    id: 'living-room-design',
    title: 'Living Room Design',
    icon: 'Sofa',
    image: img('livingWarm', 1200),
    short: 'Welcoming living spaces that balance comfort, conversation and quiet elegance.',
    description:
      'The living room sets the tone for your home. We craft layouts, furniture and lighting that feel as good for a Sunday afternoon as they do for a festive gathering.',
    features: ['Furniture layout & selection', 'TV & media walls', 'Layered lighting', 'Soft furnishings', 'Art & décor styling'],
    startingPrice: '₹2.5 Lakh',
  },
  {
    id: 'bedroom-design',
    title: 'Bedroom Design',
    icon: 'BedDouble',
    image: img('bedroomSoft', 1200),
    short: 'Restful, personal retreats with smart storage and hotel-level comfort.',
    description:
      'From master suites to kids’ rooms, we design bedrooms that help you unwind, with thoughtful storage, calming palettes and tactile materials.',
    features: ['Wardrobes & walk-in closets', 'Headboard & wall panelling', 'Ambient lighting', 'Window treatments', 'Kids & guest rooms'],
    startingPrice: '₹2 Lakh',
  },
  {
    id: 'kitchen-design',
    title: 'Kitchen Design',
    icon: 'ChefHat',
    image: img('kitchenModern', 1200),
    short: 'Beautiful, ergonomic kitchens built for real cooking and everyday life.',
    description:
      'We design modular and bespoke kitchens that combine efficient workflows, premium hardware and finishes that stand up to daily use.',
    features: [
      'Ergonomic work triangle',
      'Modular & custom cabinetry',
      'Premium hardware',
      'Appliance planning',
      'Pantry & storage solutions',
    ],
    startingPrice: '₹3 Lakh',
  },
  {
    id: 'office-interiors',
    title: 'Office Interiors',
    icon: 'Briefcase',
    image: img('officeOpen', 1200),
    short: 'Workspaces that boost focus, collaboration and your brand’s presence.',
    description:
      'From boutique studios to corporate floors, we create productive, healthy workplaces with smart zoning, acoustics and brand-led design.',
    features: ['Workplace strategy', 'Meeting & focus rooms', 'Acoustic planning', 'Ergonomic furniture', 'Brand integration'],
    startingPrice: '₹1,800 / sq ft',
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial Interiors',
    icon: 'Store',
    image: img('restaurant', 1200),
    short: 'Memorable retail, hospitality and café spaces that customers love to return to.',
    description:
      'We design commercial spaces that tell your story, guide your customers and stand out on social media, while staying practical to run.',
    features: ['Retail & showrooms', 'Cafés & restaurants', 'Boutique hotels', 'Customer journey design', 'Signage & wayfinding'],
    startingPrice: '₹2,200 / sq ft',
  },
  {
    id: '3d-interior-visualization',
    title: '3D Interior Visualization',
    icon: 'Box',
    image: img('plans', 1200),
    short: 'Photo-realistic 3D renders so you can see your space before it is built.',
    description:
      'Walk through your future home before a single wall is touched. Our realistic renders and virtual walkthroughs make decisions easy and confident.',
    features: [
      'Photo-realistic renders',
      '360° virtual walkthroughs',
      'Material & finish options',
      'Lighting simulations',
      'Unlimited revisions*',
    ],
    startingPrice: '₹25,000',
  },
];

export const getServiceById = (id) => services.find((s) => s.id === id);
