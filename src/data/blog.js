import { img } from '../utils/image';

export const blogCategories = ['All', 'Interior Design', 'Home Decor', 'Living Room', 'Kitchen', 'Bedroom', 'Office'];

/**
 * Mock blog posts. `content` is an array of blocks so the details page
 * can render headings, paragraphs and quotes without HTML strings.
 */
export const blogPosts = [
  {
    id: 'quiet-luxury-at-home',
    title: 'Quiet Luxury: How to Make Your Home Feel Effortlessly Elegant',
    category: 'Interior Design',
    excerpt: 'Forget logos and loud statements. Quiet luxury is about texture, proportion and craftsmanship. Here is how to bring it home.',
    date: '2026-09-18',
    readTime: '6 min read',
    author: 'Isha Kapoor',
    authorRole: 'Principal Designer',
    image: img('livingNeutral', 1400),
    content: [
      {
        type: 'p',
        text: 'Quiet luxury is less about what you buy and more about how a space makes you feel. It is the soft hush of a wool rug underfoot, the weight of a solid oak door and the way afternoon light falls across a lime-washed wall.',
      },
      { type: 'h2', text: '1. Start with a restrained palette' },
      {
        type: 'p',
        text: 'Choose three to four tones from the same family: ivory, oat, taupe and a deep anchor such as charcoal. A tight palette lets materials and textures do the talking.',
      },
      { type: 'h2', text: '2. Invest in tactile materials' },
      {
        type: 'p',
        text: 'Natural stone, linen, bouclé, walnut and brushed brass age beautifully. When budgets are tight, prioritise the surfaces you touch every day: door handles, dining tables and the sofa.',
      },
      { type: 'quote', text: 'Luxury is in each detail. The best rooms reveal themselves slowly.' },
      { type: 'h2', text: '3. Edit, then edit again' },
      {
        type: 'p',
        text: 'Negative space is a design tool. Leave breathing room on shelves and walls and let a few meaningful pieces carry the room.',
      },
    ],
  },
  {
    id: 'kitchen-trends-2026',
    title: '7 Kitchen Design Trends We Love in 2026',
    category: 'Kitchen',
    excerpt: 'From hidden pantries to warm wood tones, these are the kitchen ideas that combine beauty with everyday practicality.',
    date: '2026-09-05',
    readTime: '5 min read',
    author: 'Rahul Menon',
    authorRole: 'Kitchen Specialist',
    image: img('kitchenModern', 1400),
    content: [
      {
        type: 'p',
        text: 'Kitchens have become the true living rooms of modern homes. This year, the focus is on warmth, hidden function and materials that feel good to live with.',
      },
      { type: 'h2', text: 'Hidden pantry walls' },
      {
        type: 'p',
        text: 'Floor-to-ceiling cabinetry with pocket doors hides small appliances and clutter, keeping the main kitchen serene.',
      },
      { type: 'h2', text: 'Warm wood is back' },
      {
        type: 'p',
        text: 'Oak and walnut cabinetry paired with soft stone countertops bring a welcoming, crafted feel that all-white kitchens often lack.',
      },
      { type: 'quote', text: 'A great kitchen is designed around how you cook, not just how it photographs.' },
      { type: 'h2', text: 'Statement islands' },
      {
        type: 'p',
        text: 'Islands now double as dining tables, homework stations and bars. Waterfall edges in quartz or marble make them the sculptural heart of the room.',
      },
    ],
  },
  {
    id: 'bedroom-sanctuary',
    title: 'Designing a Bedroom Sanctuary for Better Sleep',
    category: 'Bedroom',
    excerpt:
      'Lighting, layout and colour all affect how well you rest. Our designers share their best tips for a calm, restorative bedroom.',
    date: '2026-08-22',
    readTime: '4 min read',
    author: 'Isha Kapoor',
    authorRole: 'Principal Designer',
    image: img('bedroomSoft', 1400),
    content: [
      {
        type: 'p',
        text: 'Your bedroom should be the calmest room in your home. Small design choices can make a measurable difference to how quickly you unwind.',
      },
      { type: 'h2', text: 'Layer your lighting' },
      { type: 'p', text: 'Swap harsh overhead lights for warm, dimmable wall lights, bedside lamps and concealed cove lighting.' },
      { type: 'h2', text: 'Choose soothing colours' },
      { type: 'p', text: 'Muted, earthy tones such as clay, sage and soft greige lower visual noise and help the mind settle.' },
      { type: 'quote', text: 'Design the bedroom for the last hour of your day and the first hour of your morning.' },
    ],
  },
  {
    id: 'living-room-layouts',
    title: 'Living Room Layouts That Make Conversation Easy',
    category: 'Living Room',
    excerpt: 'A beautiful sofa is only half the story. Discover the furniture layouts that make living rooms feel welcoming and balanced.',
    date: '2026-08-09',
    readTime: '5 min read',
    author: 'Aditi Rao',
    authorRole: 'Senior Designer',
    image: img('livingWarm', 1400),
    content: [
      {
        type: 'p',
        text: 'The best living rooms are designed around people, not the television. Here are layouts that encourage connection.',
      },
      { type: 'h2', text: 'Float your furniture' },
      {
        type: 'p',
        text: 'Pulling the sofa away from the wall and anchoring it with a generous rug instantly creates a more intimate zone.',
      },
      { type: 'h2', text: 'Mind the distances' },
      { type: 'p', text: 'Keep seats within about 2.5 metres of each other and leave at least 90 cm for walkways.' },
    ],
  },
  {
    id: 'styling-with-art',
    title: 'The Art of Styling: Decor Pieces That Tell Your Story',
    category: 'Home Decor',
    excerpt: 'Art, objects and textiles turn a well-designed house into a home. Learn how to curate décor with intention.',
    date: '2026-07-28',
    readTime: '4 min read',
    author: 'Aditi Rao',
    authorRole: 'Senior Designer',
    image: img('decor', 1400),
    content: [
      { type: 'p', text: 'Décor is where personality lives. Instead of filling shelves, curate pieces that carry memories and meaning.' },
      { type: 'h2', text: 'Work in odd numbers' },
      { type: 'p', text: 'Groups of three or five objects of varying heights feel natural and balanced.' },
      { type: 'quote', text: 'Collect slowly. The most beautiful homes are never finished in a weekend.' },
    ],
  },
  {
    id: 'productive-office-design',
    title: 'How Thoughtful Office Design Boosts Productivity',
    category: 'Office',
    excerpt: 'Acoustics, daylight and flexible zones matter more than ping-pong tables. Here is what really makes a workplace work.',
    date: '2026-07-10',
    readTime: '6 min read',
    author: 'Rahul Menon',
    authorRole: 'Workplace Lead',
    image: img('officeLounge', 1400),
    content: [
      {
        type: 'p',
        text: 'Modern teams switch between deep focus, collaboration and socialising throughout the day. Great offices support all three.',
      },
      { type: 'h2', text: 'Design for acoustic comfort' },
      { type: 'p', text: 'Soft finishes, felt panels and phone booths reduce distractions in open-plan spaces.' },
      { type: 'h2', text: 'Bring nature in' },
      { type: 'p', text: 'Plants, natural materials and access to daylight are proven to improve wellbeing and concentration.' },
    ],
  },
];

export const getPostById = (id) => blogPosts.find((p) => p.id === id);
