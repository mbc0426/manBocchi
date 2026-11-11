import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type PostKind = 'essay' | 'note';

export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function postUrl(post: Post) {
  const section = post.data.kind === 'essay' ? 'essays' : 'notes';
  return withBase(`/${section}/${post.id}/`);
}

export async function getPosts(kind?: PostKind) {
  const posts = await getCollection('posts', ({ data }) => !data.draft && (!kind || data.kind === kind));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
  }).format(date).replaceAll('/', '.');
}

export function readingMinutes(body = '') {
  return Math.max(1, Math.ceil(body.replace(/\s/g, '').length / 350));
}

export function canonicalUrl(path: string, site: URL) {
  return new URL(path, site).href;
}
