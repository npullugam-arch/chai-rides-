import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
// src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const sitemap = new URL("sitemap-index.xml", site).href;
	return new Response(`User-agent: *\nAllow: /\nDisallow: /keystatic\nDisallow: /api/\n\nSitemap: ${sitemap}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
// \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
export { page };
