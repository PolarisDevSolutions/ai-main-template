import {readFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
const {siteId}=JSON.parse(readFileSync(new URL('./routes.json',import.meta.url),'utf8'));

// This repository is also a reusable CMS template. Retire only the old Polaris site.
export function onPreBuild({netlifyConfig,constants}){
 if(constants.SITE_ID!==siteId)return;
 const emptyFunctions=resolve('dist/legacy-empty-functions');
 mkdirSync(emptyFunctions,{recursive:true});
 netlifyConfig.build.command='node scripts/build-legacy-redirects.mjs';
 netlifyConfig.functions.directory=emptyFunctions;
 // _redirects in the static output replaces all old CMS/API/sitemap rewrites.
 netlifyConfig.redirects=[];
 console.log('Polaris .rs: building permanent redirects without the CMS, database or serverless functions.');
}
