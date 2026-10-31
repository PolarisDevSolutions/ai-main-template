import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,readdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {onPreBuild} from '../plugins/polaris-legacy-redirects/index.js';
const {siteId,pages,aliases}=JSON.parse(readFileSync(new URL('../plugins/polaris-legacy-redirects/routes.json',import.meta.url),'utf8'));
const config=()=>({build:{command:'pnpm build:client && pnpm build:ssg'},functions:{directory:'vendor/cms-core/netlify/functions'},redirects:[{from:'/api/*',to:'/.netlify/functions/api/:splat',status:200}]});
test('other Netlify projects keep the complete CMS configuration',()=>{
 const original=config(),copy=structuredClone(original);onPreBuild({netlifyConfig:copy,constants:{SITE_ID:'another-site'}});assert.deepEqual(copy,original);
});
test('the retired project builds static redirects and deploys no CMS functions',()=>{
 const c=config();onPreBuild({netlifyConfig:c,constants:{SITE_ID:siteId}});
 assert.equal(c.build.command,'node scripts/build-legacy-redirects.mjs');assert.equal(c.redirects.length,0);
 assert.deepEqual(readdirSync(c.functions.directory),[]);
});
test('the build works with no environment or dependencies and emits only redirects, crawl policy and a fallback',()=>{
 const cwd=mkdtempSync(join(tmpdir(),'polaris-redirects-'));
 try{
  execFileSync(process.execPath,[resolve('scripts/build-legacy-redirects.mjs')],{cwd,env:{}});
  const output=join(cwd,'dist/spa');assert.deepEqual(readdirSync(output).sort(),['_redirects','index.html','robots.txt']);
  const rules=readFileSync(join(output,'_redirects'),'utf8').trim().split('\n');
  for(const [path,target] of Object.entries({...pages,...aliases}))assert.ok(rules.includes(`${path} https://polarisdevsolutions.com${target} 301!`));
  assert.equal(Object.keys(pages).length,15);
  assert.ok(rules.indexOf('/sitemap.xml https://polarisdevsolutions.com/sitemap.xml 301!')<rules.length-1);
  assert.equal(rules.at(-1),'/* https://polarisdevsolutions.com/sr/:splat 301!');
  assert.ok(!readFileSync(join(output,'robots.txt'),'utf8').includes('Disallow: /'));
 }finally{rmSync(cwd,{recursive:true,force:true});}
});
