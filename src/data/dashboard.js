import { img, portrait } from '../utils/image';

/** The mock signed-in customer. Replaced by the real user from the API in Phase 2. */
export const mockCustomer = {
  id: 'u_1001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98200 12345',
  address: 'A-1203, Lodha Park, Worli, Mumbai 400018',
  avatar: portrait('man3', 300),
  memberSince: 'March 2025',
};

export const customerStats = [
  { label: 'Active Projects', value: 2, icon: 'FolderKanban', trend: '1 nearing completion' },
  { label: 'Consultations', value: 5, icon: 'CalendarCheck', trend: '1 upcoming' },
  { label: 'Saved Projects', value: 8, icon: 'Heart', trend: '3 added this month' },
  { label: 'Messages', value: 3, icon: 'MessageSquare', trend: '2 unread' },
];

export const myProjects = [
  {
    id: 'MP-201',
    name: 'Worli Apartment – Living & Dining',
    image: img('livingWarm', 900),
    location: 'Worli, Mumbai',
    status: 'In Progress',
    progress: 68,
    designer: 'Isha Kapoor',
    nextMilestone: 'Furniture installation · 14 Oct',
  },
  {
    id: 'MP-202',
    name: 'Master Bedroom Makeover',
    image: img('bedroomLux', 900),
    location: 'Worli, Mumbai',
    status: 'Design Phase',
    progress: 35,
    designer: 'Aditi Rao',
    nextMilestone: '3D render review · 06 Oct',
  },
  {
    id: 'MP-188',
    name: 'Modular Kitchen',
    image: img('kitchenModern', 900),
    location: 'Worli, Mumbai',
    status: 'Completed',
    progress: 100,
    designer: 'Rahul Menon',
    nextMilestone: 'Handed over · 22 Jul',
  },
];

export const customerActivity = [
  { text: 'Your designer shared new 3D renders for the Master Bedroom.', time: '2 hours ago' },
  { text: 'Consultation CN-1042 scheduled for 8 Oct, 11:00 AM.', time: 'Yesterday' },
  { text: 'Living room flooring installation completed.', time: '3 days ago' },
  { text: 'You saved “Contemporary Villa” to your inspiration board.', time: '1 week ago' },
];

/* ---------------- Admin ---------------- */

export const adminStats = [
  { label: 'Total Users', value: 1284, icon: 'Users', trend: '+12% this month' },
  { label: 'Total Projects', value: 156, icon: 'FolderKanban', trend: '+8 this month' },
  { label: 'Pending Consultations', value: 18, icon: 'CalendarClock', trend: '5 new today' },
  { label: 'Completed Projects', value: 142, icon: 'CircleCheck', trend: '91% completion rate' },
  { label: 'Messages', value: 27, icon: 'MessageSquare', trend: '9 unread' },
];

/** Monthly consultation requests – used by the admin bar chart. */
export const monthlyConsultations = [
  { label: 'Apr', value: 22 },
  { label: 'May', value: 28 },
  { label: 'Jun', value: 25 },
  { label: 'Jul', value: 34 },
  { label: 'Aug', value: 31 },
  { label: 'Sep', value: 42 },
];

/** Monthly revenue in ₹ lakh – used by the admin line chart. */
export const monthlyRevenue = [
  { label: 'Apr', value: 38 },
  { label: 'May', value: 45 },
  { label: 'Jun', value: 41 },
  { label: 'Jul', value: 56 },
  { label: 'Aug', value: 62 },
  { label: 'Sep', value: 71 },
];

/** Projects by category – used by the admin donut chart. */
export const projectsByCategory = [
  { label: 'Residential', value: 64 },
  { label: 'Kitchen', value: 32 },
  { label: 'Office', value: 28 },
  { label: 'Commercial', value: 20 },
  { label: 'Villa', value: 12 },
];

export const projectStatuses = ['Planning', 'In Progress', 'On Hold', 'Completed'];

export const recentMessages = [
  {
    name: 'Kavya Reddy',
    text: 'Could we look at a warmer palette for the living room?',
    time: '10 min ago',
    avatar: portrait('woman1', 100),
  },
  { name: 'Aditya Bose', text: 'Sharing the floor plan for our new office.', time: '1 hr ago', avatar: portrait('man2', 100) },
  { name: 'Neha Verma', text: 'Thank you for the quick kitchen quote!', time: '3 hr ago', avatar: portrait('woman4', 100) },
];
