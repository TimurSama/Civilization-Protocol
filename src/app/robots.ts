import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/whitepaper', '/presentation', '/landing'],
        disallow: ['/api/', '/cabinets/admin'],
      },
    ],
    sitemap: 'https://vodeco.org/sitemap.xml',
    host: 'https://vodeco.org',
  };
}






















