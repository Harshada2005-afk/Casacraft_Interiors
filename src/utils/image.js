import { illustration } from './illustration';

// The studio's own interior photos (bundled with the site, so they always load).
import heroLuxuryLiving from '../assets/images/hero-luxury-living.jpg';
import livingClassic from '../assets/images/living-classic.jpg';
import livingAccentChair from '../assets/images/living-accent-chair.jpg';
import livingScandi from '../assets/images/living-scandi.jpg';
import bedroomScandi from '../assets/images/bedroom-scandi.jpg';
import kitchenDiningIsland from '../assets/images/kitchen-dining-island.jpg';
import kitchenWoodBar from '../assets/images/kitchen-wood-bar.jpg';
import homeOffice from '../assets/images/home-office.jpg';

// Set VITE_OFFLINE_IMAGES=true for sandboxed previews that cannot load external
// images: Unsplash photos are then swapped for the closest local photo.
const OFFLINE_IMAGES = import.meta.env.VITE_OFFLINE_IMAGES === 'true';

/**
 * Builds an optimised Unsplash image URL.
 * Unsplash's CDN resizes on the fly, so we only download what we need.
 *
 * @param {string} id     Unsplash photo id, e.g. "photo-1600210492486-724fe5c67fb0"
 * @param {number} width  Desired width in pixels
 */
export const unsplash = (id, width = 1600) =>
  OFFLINE_IMAGES ? illustration(id) : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

/**
 * Image keys that use the studio's own photos. Add more photos to
 * src/assets/images and map them here to replace further Unsplash images.
 */
const LOCAL = {
  livingLux: heroLuxuryLiving,
  livingClassic: livingClassic,
  livingNeutral: livingClassic,
  livingCalm: livingClassic,
  livingOpen: heroLuxuryLiving,
  livingChair: livingAccentChair,
  decor: livingAccentChair,
  sofaGreen: livingAccentChair,
  livingSofa: livingAccentChair,
  livingBright: livingScandi,
  livingWarm: livingScandi,
  apartment: livingScandi,
  apartment2: livingScandi,
  living3: livingScandi,
  livingLoft: kitchenWoodBar,
  bedroomSoft: bedroomScandi,
  bedroomLux: bedroomScandi,
  bedroomHotel: bedroomScandi,
  bedroomLight: bedroomScandi,
  bedroomNordic: bedroomScandi,
  kitchenModern: kitchenDiningIsland,
  kitchenWhite: kitchenDiningIsland,
  kitchenIsland: kitchenDiningIsland,
  kitchenBright: kitchenDiningIsland,
  kitchenDark: kitchenWoodBar,
  dining: kitchenWoodBar,
  officeOpen: homeOffice,
  officeLounge: homeOffice,
  officeDesk: homeOffice,
  officeMeeting: homeOffice,
};

/** Closest local photo for the remaining Unsplash images, used in offline previews. */
const OFFLINE_FALLBACK = {
  villaPool: kitchenDiningIsland,
  villaFacade: heroLuxuryLiving,
  villaEvening: livingClassic,
  restaurant: kitchenWoodBar,
  retail: heroLuxuryLiving,
  plans: homeOffice,
};

/** A curated pool of interior photographs used throughout the mock data. */
export const IMAGES = {
  livingWarm: 'photo-1600210492486-724fe5c67fb0',
  livingNeutral: 'photo-1618221195710-dd6b41faaea6',
  livingChair: 'photo-1586023492125-27b2c045efd7',
  livingSofa: 'photo-1555041469-a586c61ea9bc',
  livingBright: 'photo-1493663284031-b7e3aefcae8e',
  livingLoft: 'photo-1502672260266-1c1ef2d93688',
  livingClassic: 'photo-1513694203232-719a280e022f',
  livingLux: 'photo-1600607687939-ce8a6c25118c',
  livingOpen: 'photo-1600607687644-c7171b42498f',
  livingCalm: 'photo-1600573472550-8090b5e0745e',
  apartment: 'photo-1522708323590-d24dbb6b0267',
  apartment2: 'photo-1560448204-e02f11c3d0e2',
  living3: 'photo-1554995207-c18c203602cb',
  sofaGreen: 'photo-1567016432779-094069958ea5',
  bedroomSoft: 'photo-1616486338812-3dadae4b4ace',
  bedroomLux: 'photo-1615874959474-d609969a20ed',
  bedroomHotel: 'photo-1631049307264-da0ec9d70304',
  bedroomLight: 'photo-1505693416388-ac5ce068fe85',
  bedroomNordic: 'photo-1540518614846-7eded433c457',
  kitchenWhite: 'photo-1556909114-f6e7ad7d3136',
  kitchenModern: 'photo-1600566753190-17f0baa2a6c3',
  kitchenBright: 'photo-1484154218962-a197022b5858',
  kitchenDark: 'photo-1565538810643-b5bdb714032a',
  kitchenIsland: 'photo-1600121848594-d8644e57abab',
  dining: 'photo-1617806118233-18e1de247200',
  officeOpen: 'photo-1497366216548-37526070297c',
  officeLounge: 'photo-1524758631624-e2822e304c36',
  officeDesk: 'photo-1497215728101-856f4ea42174',
  officeMeeting: 'photo-1556761175-5973dc0f32e7',
  villaPool: 'photo-1600596542815-ffad4c1539a9',
  villaFacade: 'photo-1600585154340-be6161a56a0c',
  villaEvening: 'photo-1600585154526-990dced4db0d',
  restaurant: 'photo-1517248135467-4c7edcad34c4',
  retail: 'photo-1441986300917-64674bd600d8',
  plans: 'photo-1503387762-592deb58ef4e',
  decor: 'photo-1583847268964-b28dc8f51f92',
};

/** Portrait photos for testimonials and profiles. */
export const PORTRAITS = {
  woman1: 'photo-1494790108377-be9c29b29330',
  man1: 'photo-1507003211169-0a1dd7228f2d',
  woman2: 'photo-1438761681033-6461ffad8d80',
  man2: 'photo-1500648767791-00dcc994a43e',
  woman3: 'photo-1534528741775-53994a69daeb',
  woman4: 'photo-1544005313-94ddf0286df2',
  man3: 'photo-1472099645785-5658abf4ff4e',
};

export const img = (key, width) => {
  if (LOCAL[key]) return LOCAL[key];
  if (OFFLINE_IMAGES && OFFLINE_FALLBACK[key]) return OFFLINE_FALLBACK[key];
  return unsplash(IMAGES[key], width);
};
export const portrait = (key, width = 200) => unsplash(PORTRAITS[key], width);
