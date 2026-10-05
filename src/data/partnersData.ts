/**
 * Exposition Issue 22 - Partners & Partnership Legacy Data
 * 
 * You can easily update, replace, or append partner logos and details here.
 * For any new logos, place the image files in the `public/` directory (e.g. `public/resources/partners/`
 * or `public/resources/magazine/`) and reference them using an absolute web path like `/resources/partners/filename.png`.
 */

export interface Partner {
  id: string;
  name: string;
  tier: string;
  category: string;
  image: string;
  accentColor?: string;
  description?: string;
}

/**
 * ============================================================================
 * 1. OUR PARTNERS (Exposition Issue 22 Confirmed Partners)
 * ============================================================================
 * Add or update confirmed Issue 22 partners here.
 */
export const ISSUE_22_PARTNERS: Partner[] = [
  {
    id: 'issue22-methuli',
    name: 'Methuli Printers',
    tier: 'Printing Partner',
    category: 'Official Printing Partner',
    image: '/resources/partners/methuli-printers.png',
    accentColor: '#9333ea',
    description:
      'Official printing partner collaborating with Exposition Issue 22 to produce high-impact, collector-grade print editions and publication collaterals.',
  },
  {
    id: 'issue22-studio247',
    name: 'Studio 24/7',
    tier: 'Studio Partner',
    category: 'Official Studio Partner',
    image: '/resources/partners/studio-24-7.jpg',
    accentColor: '#E8C896',
    description:
      'Official studio partner powering high-fidelity podcast recordings, multimedia broadcasts, and visual content production for Exposition Issue 22.',
  },
];

/**
 * ============================================================================
 * 2. OUR PARTNERSHIP LEGACY (Previous Exposition Editions)
 * ============================================================================
 * Organizations that collaborated with Exposition across previous editions.
 * Update image paths, partner names, and categories as needed.
 */
export const LEGACY_PARTNERS: Partner[] = [
  {
    id: 'legacy-rexona',
    name: 'Rexona Unilever',
    tier: 'Title Partner',
    category: 'Youth & Brand Collaboration',
    image: '/resources/magazine/rexona-2048-B0Rd5_-Q.png',
    accentColor: '#d97706',
    description: 'Title partner for previous editions of Exposition magazine.',
  },
  {
    id: 'legacy-cima',
    name: 'AICPA & CIMA',
    tier: 'Platinum Partner',
    category: 'Global Finance & Leadership',
    image: '/resources/magazine/AICPA_CIMA-BnZ9T7n6.png',
    accentColor: '#38bdf8',
    description: 'Global accounting and strategic finance partner for previous editions.',
  },
  {
    id: 'legacy-gtn',
    name: 'GTN Group',
    tier: 'Platinum Partner',
    category: 'FinTech Infrastructure',
    image: '/resources/magazine/GTN Logo_2025-BAwawNw1.png',
    accentColor: '#38bdf8',
    description: 'FinTech and institutional investment infrastructure partner.',
  },
  {
    id: 'legacy-efl',
    name: 'EFL 3PL',
    tier: 'Gold Partner',
    category: 'Supply Chain & Logistics',
    image: '/resources/magazine/partner (4).png',
    accentColor: '#fbbf24',
    description: 'Global logistics and global freight logistics partner.',
  },
  {
    id: 'legacy-celsius',
    name: 'Celsius IT',
    tier: 'Silver Partner',
    category: 'Enterprise IT Solutions',
    image: '/resources/magazine/Asset 2@4x-CjObJBbi.png',
    accentColor: '#cbd5e1',
    description: 'Cloud technology and digital solutions partner.',
  },
  {
    id: 'legacy-digital365',
    name: 'Digital 365',
    tier: 'Silver Partner',
    category: 'Digital Media & Broadcast',
    image: '/resources/magazine/digital365-ofXxKHub.png',
    accentColor: '#cbd5e1',
    description: 'Digital media and modern communications partner.',
  },
  {
    id: 'legacy-xpressjobs',
    name: 'Xpress Jobs',
    tier: 'Recruitment Partner',
    category: 'Career Platform',
    image: '/resources/magazine/white bg Blue Text-CIcdJpXo.png',
    accentColor: '#38bdf8',
    description: 'Talent recruitment and graduate career development partner.',
  },
  {
    id: 'legacy-kassa',
    name: 'Studio Kassa',
    tier: 'Creative Partner',
    category: 'Advertising & Design',
    image: '/resources/magazine/Kassa Advertising Logo White-DIwYGvhd.png',
    accentColor: '#d97706',
    description: 'Creative brand design and campaign partner.',
  },
  {
    id: 'legacy-nestle',
    name: 'Nestlé / Nescafé',
    tier: 'Beverage Partner',
    category: 'Sustainable Industry',
    image: '/resources/magazine/NSTLE-PEELAWAY-A2-R-LS-AW01-DgQ18Hsj.png',
    accentColor: '#fbbf24',
    description: 'Official refreshment and beverage sponsor across previous editions.',
  },
  {
    id: 'legacy-nowyouseeme',
    name: 'NowYouSeeMe',
    tier: 'Photography Partner',
    category: 'Visual Media',
    image: '/resources/magazine/image-BddtjKBb.png',
    accentColor: '#cbd5e1',
    description: 'Official event photography and moment capture partner.',
  },
  {
    id: 'legacy-pwh',
    name: 'PW Holdings',
    tier: 'Corporate Partner',
    category: 'Industrial Solutions',
    image: '/resources/magazine/PWH.lk-CC0bYq1W.jpg',
    accentColor: '#cbd5e1',
    description: 'Strategic co-partner supporting undergraduate innovation.',
  },
  {
    id: 'legacy-imagine',
    name: 'Imagine Entertainment',
    tier: 'Technical Partner',
    category: 'Audio-Visual Production',
    image: '/resources/magazine/partner (24).png',
    accentColor: '#d97706',
    description: 'Technical event production and audiovisual staging partner.',
  },
  {
    id: 'legacy-edify',
    name: 'Edify Education',
    tier: 'Education Partner',
    category: 'EdTech & Skills Platform',
    image: '/resources/magazine/Edify.png',
    accentColor: '#d97706',
    description: 'Higher education and career readiness platform partner.',
  },
];
