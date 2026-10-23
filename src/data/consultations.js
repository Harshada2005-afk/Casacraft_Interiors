/** Options used by the Book Consultation form (and admin filters). */
export const budgetOptions = ['₹1–5 Lakh', '₹5–10 Lakh', '₹10–20 Lakh', '₹20–40 Lakh', '₹40 Lakh+'];

export const designStyleOptions = ['Modern', 'Minimalist', 'Luxury', 'Contemporary', 'Scandinavian', 'Industrial'];

export const propertyTypeOptions = ['Apartment', 'Independent House', 'Villa', 'Penthouse', 'Office', 'Retail / Commercial'];

export const projectTypeOptions = [
  'Full Home Interior',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Office Interior',
  'Commercial Space',
  '3D Visualization',
];

export const consultationStatuses = ['Pending', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'];

/** Consultations for the logged-in mock customer. */
export const myConsultations = [
  { id: 'CN-1042', projectType: 'Full Home Interior', date: '2026-10-08', budget: '₹20–40 Lakh', status: 'Scheduled' },
  { id: 'CN-1036', projectType: 'Kitchen', date: '2026-09-21', budget: '₹5–10 Lakh', status: 'Contacted' },
  { id: 'CN-1029', projectType: 'Bedroom', date: '2026-09-02', budget: '₹1–5 Lakh', status: 'Completed' },
  { id: 'CN-1017', projectType: 'Living Room', date: '2026-08-14', budget: '₹5–10 Lakh', status: 'Pending' },
  { id: 'CN-1008', projectType: '3D Visualization', date: '2026-07-30', budget: '₹1–5 Lakh', status: 'Cancelled' },
];

/** All consultation requests, for the admin panel. */
export const allConsultations = [
  {
    id: 'CN-1048',
    customer: 'Kavya Reddy',
    email: 'kavya.reddy@example.com',
    projectType: 'Full Home Interior',
    date: '2026-10-03',
    budget: '₹40 Lakh+',
    status: 'Pending',
  },
  {
    id: 'CN-1047',
    customer: 'Aditya Bose',
    email: 'aditya.bose@example.com',
    projectType: 'Office Interior',
    date: '2026-10-02',
    budget: '₹20–40 Lakh',
    status: 'Pending',
  },
  {
    id: 'CN-1046',
    customer: 'Neha Verma',
    email: 'neha.verma@example.com',
    projectType: 'Kitchen',
    date: '2026-09-30',
    budget: '₹5–10 Lakh',
    status: 'Contacted',
  },
  {
    id: 'CN-1045',
    customer: 'Ishaan Gupta',
    email: 'ishaan.gupta@example.com',
    projectType: 'Living Room',
    date: '2026-09-29',
    budget: '₹1–5 Lakh',
    status: 'Scheduled',
  },
  {
    id: 'CN-1044',
    customer: 'Riya Banerjee',
    email: 'riya.b@example.com',
    projectType: 'Bedroom',
    date: '2026-09-27',
    budget: '₹1–5 Lakh',
    status: 'Completed',
  },
  {
    id: 'CN-1043',
    customer: 'Farhan Sheikh',
    email: 'farhan.s@example.com',
    projectType: 'Commercial Space',
    date: '2026-09-25',
    budget: '₹40 Lakh+',
    status: 'Scheduled',
  },
  {
    id: 'CN-1042',
    customer: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    projectType: 'Full Home Interior',
    date: '2026-09-24',
    budget: '₹20–40 Lakh',
    status: 'Contacted',
  },
  {
    id: 'CN-1041',
    customer: 'Tara Pillai',
    email: 'tara.pillai@example.com',
    projectType: '3D Visualization',
    date: '2026-09-20',
    budget: '₹1–5 Lakh',
    status: 'Cancelled',
  },
  {
    id: 'CN-1040',
    customer: 'Kabir Singh',
    email: 'kabir.singh@example.com',
    projectType: 'Kitchen',
    date: '2026-09-18',
    budget: '₹10–20 Lakh',
    status: 'Completed',
  },
];
