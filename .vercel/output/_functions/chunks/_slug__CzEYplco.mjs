import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { t as $$SimpleBase } from "./SimpleBase_rYo16bzO.mjs";
import { n as $$Header, t as $$Footer } from "./Footer_BA2BlTYx.mjs";
import { s as loadFooterContent } from "./supabase_BKWTd6yk.mjs";
// src/pages/legal/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("http://localhost:4321");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const footer = await loadFooterContent();
	const policy = footer.policies.find((item) => item.slug === Astro.params.slug);
	if (!policy) return Astro.redirect("/404");
	return renderTemplate`${renderComponent($$result, "SimpleBase", $$SimpleBase, {
		"title": `${policy.title} · Chai Rides`,
		"description": policy.title
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", $$Header, {
		"name": footer.brand_name,
		"themeKey": "espresso",
		"showSwitcher": false,
		"showHomeBack": true
	})} ${maybeRenderHead($$result)}<main id="main" class="wrap policy-page"> <span class="eyebrow">Chai Rides policy</span> <h1>${policy.title}</h1> <div class="policy-copy">${policy.content.split("\n").map((line) => line ? renderTemplate`<p>${line}</p>` : renderTemplate`<br>`)}</div> </main> ${renderComponent($$result, "Footer", $$Footer, { "footer": footer })} ` })}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/legal/[slug].astro", void 0);
var $$file = "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/legal/[slug].astro";
var $$url = "/legal/[slug]";
// \0virtual:astro:page:src/pages/legal/[slug]@_@astro
var page = () => _slug__exports;
export { page };
