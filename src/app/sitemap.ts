import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vodeco.org';
  const currentDate = new Date().toISOString();

  // Main pages
  const mainPages = [
    '',
    '/dashboard',
    '/map',
    '/dao',
    '/tokenhub',
    '/whitepaper',
    '/social',
    '/profile',
    '/missions',
    '/presentation',
    '/interactive-presentation',
    '/landing',
    '/invest',
    '/roadmap',
    '/rewards',
    '/governance',
    '/nexus',
    '/wallet',
    '/vodcheck',
  ];

  // Cabinet pages
  const cabinetPages = [
    '/cabinets',
    '/cabinets/citizen',
    '/cabinets/government',
    '/cabinets/infrastructure',
    '/cabinets/investor',
    '/cabinets/science',
    '/cabinets/operator',
    '/cabinets/admin',
  ];

  // Social pages
  const socialPages = [
    '/social/messages',
    '/social/friends',
    '/groups',
  ];

  // Ecosystem pages
  const ecosystemPages = [
    '/ecosystem/ecology',
    '/ecosystem/energy',
    '/ecosystem/health',
    '/ecosystem/science',
  ];

  const allPages = [
    ...mainPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: page === '' ? 1 : page.includes('dashboard') || page.includes('dao') ? 0.9 : 0.8,
    })),
    ...cabinetPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...socialPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
    ...ecosystemPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  return allPages;
}










