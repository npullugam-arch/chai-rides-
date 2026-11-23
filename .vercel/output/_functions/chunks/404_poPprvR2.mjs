import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_Djfphud0.mjs";
import { n as createComponent } from "./compiler_Cgr8Xbyu.mjs";
import { n as $$Base, t as loadSite } from "./content_DYRy4npV.mjs";
import { n as $$Header, t as $$Footer } from "./Footer_BA2BlTYx.mjs";
import { s as loadFooterContent } from "./supabase_BKWTd6yk.mjs";
// src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(async ($$result, $$props, $$slots) => {
	const [site, footer] = await Promise.all([loadSite(), loadFooterContent()]);
	const { settings: s } = site;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"site": site,
		"title": `Page not found · ${s.name}`,
		"noindex": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", $$Header, {
		"name": s.name,
		"themeKey": site.themeKey,
		"showSwitcher": false
	})} ${maybeRenderHead($$result)}<main id="main" class="wrap notfound"> <span class="eyebrow">404</span> <h1>Spilled it.</h1> <p class="lede" style="margin-inline:auto">That page doesn't exist, or it moved. The chai is still brewing, though.</p> <a class="btn" href="/">Back to the homepage</a> </main> ${renderComponent($$result, "Footer", $$Footer, { "footer": footer })} ` })}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/404.astro", void 0);
var $$file = "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/404.astro";
var $$url = "/404";
// \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
export { page };
