import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vigitecpanama.com';
  
  const routes = [
    '',
    '/servicios',
    '/quienes-somos',
    '/contacto',
    '/cotizacion',
    '/renovable-solar',
    '/cotizacion-solar'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
