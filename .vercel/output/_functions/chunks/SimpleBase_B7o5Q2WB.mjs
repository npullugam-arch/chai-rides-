import { C as unescapeHTML, c as renderSlot, d as renderTemplate, m as addAttribute, p as renderHead } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { a as themeCss, i as fontsUrl, n as THEMES } from "./Logo_Ccjrvq56.mjs";
// src/layouts/SimpleBase.astro
createAstro("http://localhost:4321");
var $$SimpleBase = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SimpleBase;
	const { title, description, noindex = false } = Astro.props;
	const theme = THEMES.espresso;
	return renderTemplate`<html lang="en" data-skin="espresso"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${noindex && renderTemplate`<meta name="robots" content="noindex">`}<meta name="theme-color"${addAttribute(theme.c.paper, "content")}><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet"${addAttribute(fontsUrl(theme), "href")}><style>${unescapeHTML(themeCss())}</style>${renderHead($$result)}</head> <body><a class="skip" href="#main">Skip to content</a>${renderSlot($$result, $$slots["default"])}</body> </html>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/layouts/SimpleBase.astro", void 0);
export { $$SimpleBase as t };
