import type { APIRoute } from 'astro';
import { getPosts, postUrl, withBase } from '../lib/content';
import { siteConfig } from '../config';
const escapeXml = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site must be configured for RSS');
  const posts = await getPosts();
  const items = posts.map(post => {
    const url = new URL(postUrl(post), site).href;
    return `<item><title>${escapeXml(post.data.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><description>${escapeXml(post.data.description)}</description><pubDate>${post.data.date.toUTCString()}</pubDate></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(siteConfig.title)}</title><link>${escapeXml(new URL(withBase('/'), site).href)}</link><description>${escapeXml(siteConfig.description)}</description><language>zh-CN</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
