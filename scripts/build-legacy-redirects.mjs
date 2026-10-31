import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
const {pages,aliases,destination}=JSON.parse(readFileSync(new URL('../plugins/polaris-legacy-redirects/routes.json',import.meta.url),'utf8'));
const output=resolve('dist/spa');
rmSync(output,{recursive:true,force:true});mkdirSync(output,{recursive:true});
const rules=[
 '/robots.txt /robots.txt 200',
 ...Object.entries({...pages,...aliases}).map(([source,path])=>`${source} ${destination}${path} 301!`),
 ...['/sitemap.xml','/sitemap-pages.xml','/sitemap-posts.xml'].map(path=>`${path} ${destination}/sitemap.xml 301!`),
 '/favicon.ico '+destination+'/favicon-64.png 301!',
 '/favicon-64.png '+destination+'/favicon-64.png 301!',
 '/apple-touch-icon.png '+destination+'/apple-touch-icon.png 301!',
 `/sr/* ${destination}/sr/:splat 301!`,
 // Unknown paths keep their identity and correctly return 404 if they never existed.
 `/* ${destination}/sr/:splat 301!`,
];
writeFileSync(resolve(output,'_redirects'),rules.join('\n')+'\n');
writeFileSync(resolve(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${destination}/sitemap.xml\n`);
writeFileSync(resolve(output,'index.html'),`<!doctype html><html lang="sr"><meta charset="utf-8"><title>Polaris Development</title><p>Sajt je preseljen na <a href="${destination}/sr/">polarisdevsolutions.com/sr/</a>.</p></html>\n`);
console.log(`Prepared ${Object.keys(pages).length} page migrations and ${Object.keys(aliases).length} aliases. No external services used.`);
