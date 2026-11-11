import type { APIRoute } from 'astro';
import { navigation } from '../config';
import { getPosts, postUrl, withBase } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site must be configured for sitemap');
  const paths = [...navigation.map(item => withBase(item.path)), ...(await getPosts()).map(postUrl)];
  const urls = paths.map(path => `<url><loc>${new URL(path, site).href.replaceAll('&', '&amp;')}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
