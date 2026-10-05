/**
 * Exposition Issue 22 - Partners & Partnership Legacy Data
 * 
 * All partner logos are centralized in `/resources/partners/`.
 */

export interface Partner {
  id: string;
  name: string;
  tier: string;
  category: string;
  image: string;
  accentColor?: string;
  description?: string;
  bgMode?: 'light' | 'dark';
}

/**
 * ============================================================================
 * 1. OUR PARTNERS (Exposition Issue 22 Confirmed Partners)
 * ============================================================================
 * Confirmed partners for Exposition Issue 22.
 */
export const ISSUE_22_PARTNERS: Partner[] = [
  {
    id: 'issue22-methuli',
    name: 'Methuli Printers',
    tier: 'Printing Partner',
    category: 'Official Printing Partner',
    image: '/resources/partners/methuli-printers.png',
    accentColor: '#9333ea',
    bgMode: 'light',
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
    bgMode: 'light',
    description:
      'Official studio partner powering high-fidelity podcast recordings, multimedia broadcasts, and visual content production for Exposition Issue 22.',
  },
  {
    id: 'issue22-studio-kassa',
    name: 'Studio Kassa',
    tier: 'Studio Partner',
    category: 'Official Studio Partner',
    image: '/resources/partners/studio-kassa.png',
    accentColor: '#d97706',
    bgMode: 'light',
    description:
      'Official studio partner collaborating with Exposition Issue 22 for creative multimedia production and broadcasting.',
  },
  {
    id: 'issue22-fos-media',
    name: 'FOS Media',
    tier: 'Media Partner',
    category: 'Official Photography & Media Partner',
    image: '/resources/partners/FOS-media.jpg',
    accentColor: '#8a2be2',
    bgMode: 'dark',
    description:
      'Official photography and media coverage partner documenting key moments and broadcast coverage for Exposition Issue 22.',
  },
];

/**
 * ============================================================================
 * 2. OUR PARTNERSHIP LEGACY (Previous Exposition Editions)
 * ============================================================================
 * Organizations that collaborated with Exposition across previous editions.
 */
export const LEGACY_PARTNERS: Partner[] = [
  {
    id: 'legacy-rexona',
    name: 'Rexona Unilever',
    tier: 'Title Partner',
    category: 'Youth & Brand Collaboration',
    image: '/resources/partners/rexona.png',
    accentColor: '#d97706',
    bgMode: 'dark',
    description: 'Title partner for previous editions of Exposition magazine.',
  },
  {
    id: 'legacy-cima',
    name: 'AICPA & CIMA',
    tier: 'Platinum Partner',
    category: 'Global Finance & Leadership',
    image: '/resources/partners/aicpa-cima.png',
    accentColor: '#38bdf8',
    bgMode: 'light',
    description: 'Global accounting and strategic finance partner for previous editions.',
  },
  {
    id: 'legacy-gtn',
    name: 'GTN Group',
    tier: 'Platinum Partner',
    category: 'FinTech Infrastructure',
    image: '/resources/partners/gtn-group.png',
    accentColor: '#38bdf8',
    bgMode: 'dark',
    description: 'FinTech and institutional investment infrastructure partner.',
  },
  {
    id: 'legacy-efl',
    name: 'EFL 3PL',
    tier: 'Gold Partner',
    category: 'Supply Chain & Logistics',
    image: '/resources/partners/3PL-efl.jpg',
    accentColor: '#fbbf24',
    bgMode: 'light',
    description: 'Global freight forwarding and supply chain logistics partner.',
  },
  {
    id: 'legacy-celsius',
    name: 'Celsius IT',
    tier: 'Silver Partner',
    category: 'Enterprise IT Solutions',
    image: '/resources/partners/celsius-it.png',
    accentColor: '#cbd5e1',
    bgMode: 'dark',
    description: 'Cloud technology and digital engineering solutions partner.',
  },
  {
    id: 'legacy-digital365',
    name: 'Digital 365',
    tier: 'Silver Partner',
    category: 'Digital Media & Broadcast',
    image: '/resources/partners/digital-365.png',
    accentColor: '#cbd5e1',
    bgMode: 'dark',
    description: 'Digital media and modern communications partner.',
  },
  {
    id: 'legacy-xpressjobs',
    name: 'Xpress Jobs',
    tier: 'Recruitment Partner',
    category: 'Career Platform',
    image: '/resources/partners/xpress-jobs.png',
    accentColor: '#38bdf8',
    bgMode: 'light',
    description: 'Talent recruitment and graduate career development partner.',
  },
  {
    id: 'legacy-nestle',
    name: 'Nestlé / Nescafé',
    tier: 'Beverage Partner',
    category: 'Sustainable Industry',
    image: '/resources/partners/nestle.png',
    accentColor: '#fbbf24',
    bgMode: 'light',
    description: 'Official refreshment and beverage sponsor across previous editions.',
  },
  {
    id: 'legacy-nowyouseeme',
    name: 'NowYouSeeMe',
    tier: 'Photography Partner',
    category: 'Visual Media',
    image: '/resources/partners/nowyouseeme.png',
    accentColor: '#cbd5e1',
    bgMode: 'dark',
    description: 'Official event photography and moment capture partner.',
  },
  {
    id: 'legacy-pwh',
    name: 'PW Holdings',
    tier: 'Corporate Partner',
    category: 'Industrial Solutions',
    image: '/resources/partners/pwh.jpg',
    accentColor: '#cbd5e1',
    bgMode: 'light',
    description: 'Strategic co-partner supporting undergraduate innovation.',
  },
];
