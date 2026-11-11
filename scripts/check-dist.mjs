import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import config from '../astro.config.mjs';

const dist = path.resolve('dist');
const base = (config.base || '/').replace(/\/$/, '');
const site = new URL(config.site);
const failures = [];
let links = 0;

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(item => item.isDirectory() ? files(path.join(dir, item.name)) : path.join(dir, item.name)))).flat();
}

const htmlFiles = (await files(dist)).filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(dist, file).split(path.sep).join('/');
  const pagePath = base + '/' + relative.replace(/index\.html$/, '');
  const current = new URL(pagePath, site);
  if (!html.includes('<title>') || !html.includes('name="description"')) failures.push(`${relative}: missing page metadata`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const target = new URL(value, current);
    if (target.origin !== site.origin) continue;
    const pathname = decodeURIComponent(target.pathname);
    if (base && pathname !== base && !pathname.startsWith(base + '/')) {
      failures.push(`${relative}: URL is missing project base: ${value}`); continue;
    }
    let targetPath = pathname.slice(base.length).replace(/^\//, '');
    if (!targetPath || targetPath.endsWith('/')) targetPath += 'index.html';
    const resolved = path.resolve(dist, targetPath);
    if (!resolved.startsWith(dist + path.sep)) { failures.push(`${relative}: invalid path ${value}`); continue; }
    try {
      await access(resolved); links++;
      if (target.hash && resolved.endsWith('.html')) {
        const targetHtml = resolved === file ? html : await readFile(resolved, 'utf8');
        const id = decodeURIComponent(target.hash.slice(1));
        if (id && !targetHtml.includes(`id="${id}"`)) failures.push(`${relative}: missing anchor ${value}`);
      }
    } catch { failures.push(`${relative}: target does not exist: ${value}`); }
  }
}

for (const filename of ['index.html', 'essays/index.html', 'photography/index.html', 'notes/index.html', 'about/index.html', '404.html', 'rss.xml', 'sitemap.xml']) {
  try { await access(path.join(dist, filename)); } catch { failures.push(`Missing required output: ${filename}`); }
}
if (failures.length) {
  console.error(failures.join('\n')); process.exitCode = 1;
} else {
  console.log(`Verified ${htmlFiles.length} HTML pages and ${links} internal links/assets with base "${base || '/'}".`);
}
