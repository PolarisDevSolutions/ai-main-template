# Polaris .rs migration

The old `polarisdevsolutions` Netlify project (`d5c991c8-319d-46f4-8b52-dd3399f5beea`) now serves permanent redirects to the Serbian version of `https://polarisdevsolutions.com`.

The local build plugin selects this behavior only for that exact Netlify site ID. Other sites using this repository retain the original build, routing and functions. The application source is retained for archival use.

For the retired site, the build uses Node core modules only. It does not run Vite, SSG, Supabase queries or the old CMS. The functions directory is replaced with an empty generated directory. The deploy contains `_redirects`, `robots.txt` and a small HTML fallback only. Old API and sitemap function rewrites are removed from the effective configuration.

`plugins/polaris-legacy-redirects/routes.json` maps all 15 URLs from the old published sitemap to their corresponding Serbian pages. English path aliases go directly to Serbian equivalents too. Sitemap URLs redirect to the new sitemap. Unknown paths keep their path beneath `/sr/` and return the new site's 404 when no equivalent exists. Query parameters are passed through by Netlify. Crawl access stays enabled so search engines can follow the 301 redirects.

Validation: `node --test scripts/legacy-redirects.test.mjs` and `node scripts/build-legacy-redirects.mjs`. The tests cover site isolation, removal of old runtime functions and generation with an empty environment and no external dependencies. Live verification must cover all 15 source URLs, targets, query strings, www and slash variants.

Keep the .rs domain, its DNS and this small Netlify redirect project active. Existing MX/email records are unrelated to these HTTP redirects and are unchanged. The old Supabase project is not deleted by this migration. Before deleting it, keep any historical data you still need and ensure no other application uses it. The new Astro website and Sanity Studio use local migrated images or Sanity assets rather than Supabase Storage.

Rollback: revert the migration commits in this repository and redeploy while the old Supabase project still exists. The prior .rs production source commit was `a9954a3a57afe065e345caf2f62f1b3633417b2f`.
