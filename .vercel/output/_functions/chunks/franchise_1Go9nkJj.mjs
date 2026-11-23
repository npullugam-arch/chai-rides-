import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as Fragment, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { t as renderScript } from "./script_istBs7Sh.mjs";
import { t as $$SimpleBase } from "./SimpleBase_rYo16bzO.mjs";
import { n as $$Header, t as $$Footer } from "./Footer_BA2BlTYx.mjs";
import { c as loadFranchiseContent, l as publicSupabaseConfigured, s as loadFooterContent } from "./supabase_CQzM9MX_.mjs";
// src/components/FranchiseIcon.astro
createAstro("http://localhost:4321");
var $$FranchiseIcon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FranchiseIcon;
	const { type } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<span class="fi" aria-hidden="true" data-astro-cid-66m7xrce> ${type === "branding" ? renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="M4 5h16v10H4zM8 19h8M12 15v4" data-astro-cid-66m7xrce></path></svg>` : type === "kitchen" ? renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14M9 8h6" data-astro-cid-66m7xrce></path></svg>` : type === "furniture" ? renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="M5 12h14v5H5zM7 17v3M17 17v3M7 12V7h10v5" data-astro-cid-66m7xrce></path></svg>` : type === "raw" ? renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="M12 21c5-3 7-8 6-15-7-1-12 3-13 10 2 2 4 4 7 5ZM7 17c3-3 6-5 10-7" data-astro-cid-66m7xrce></path></svg>` : type === "training" ? renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="m3 8 9-4 9 4-9 4zM6 10v5c3 3 9 3 12 0v-5M21 9v6" data-astro-cid-66m7xrce></path></svg>` : type === "marketing" ? renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="M4 14V9l12-4v13L4 14Zm0 0 2 5h4l-2-4M18 8c2 1 2 6 0 7" data-astro-cid-66m7xrce></path></svg>` : renderTemplate`<svg viewBox="0 0 24 24" data-astro-cid-66m7xrce><path d="M12 3 4 7v10l8 4 8-4V7zM4 7l8 4 8-4M12 11v10" data-astro-cid-66m7xrce></path></svg>`} </span>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/FranchiseIcon.astro", void 0);
// src/components/FranchiseLocations.astro
createAstro("http://localhost:4321");
var $$FranchiseLocations = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FranchiseLocations;
	const { locations = [] } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="wrap section locations-section" id="locations" data-astro-cid-bw2ct6yi> <div class="section-heading" data-astro-cid-bw2ct6yi> <span class="kicker" data-astro-cid-bw2ct6yi>Our growing network</span> <h2 data-astro-cid-bw2ct6yi>Active Chai Rides locations.</h2> <p data-astro-cid-bw2ct6yi>Only locations published as active by the Chai Rides admin team appear here.</p> </div> ${locations.length ? renderTemplate`<div class="location-grid" data-astro-cid-bw2ct6yi> ${locations.map((location) => renderTemplate`<article class="location-card reveal" data-astro-cid-bw2ct6yi> ${location.image_url ? renderTemplate`<img${addAttribute(location.image_url, "src")}${addAttribute(`${location.franchise_name} in ${location.city}`, "alt")} loading="lazy" data-astro-cid-bw2ct6yi>` : renderTemplate`<div class="location-placeholder" aria-hidden="true" data-astro-cid-bw2ct6yi><img src="/chai-rides-logo.png" alt="" data-astro-cid-bw2ct6yi></div>`} <div class="location-copy" data-astro-cid-bw2ct6yi><span data-astro-cid-bw2ct6yi>${location.city}</span><h3 data-astro-cid-bw2ct6yi>${location.franchise_name}</h3><p data-astro-cid-bw2ct6yi>${location.address}</p></div> </article>`)} </div>` : renderTemplate`<div class="locations-empty" data-astro-cid-bw2ct6yi><strong data-astro-cid-bw2ct6yi>New locations will be announced here.</strong><p data-astro-cid-bw2ct6yi>There are currently no published franchise locations.</p></div>`} </section>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/FranchiseLocations.astro", void 0);
// src/pages/franchise.astro
var franchise_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Franchise,
	file: () => $$file,
	url: () => $$url
});
createAstro("http://localhost:4321");
var $$Franchise = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Franchise;
	let content = null, loadError = "";
	try {
		content = await loadFranchiseContent();
	} catch (e) {
		loadError = e instanceof Error ? e.message : "Unable to load franchise information.";
	}
	const footer = await loadFooterContent();
	const settings = content?.settings, packages = (content?.packages || []).slice(0, 2), benefits = content?.benefits || [], faqs = content?.faqs || [], locations = content?.locations || [];
	const classic = packages.find((p) => p.slug === "classic-franchise") || packages[0], standard = packages.find((p) => p.slug === "standard-franchise") || packages[1];
	const phone = settings?.phone || "+91 6302567570", digits = phone.replace(/\D/g, "");
	const defaultMessage = settings?.whatsapp_message || "Hello Chai Rides Team, I am interested in starting a Chai Rides franchise. Could you please provide more information about the Classic and Standard franchise packages, investment requirements, included equipment, and application process? I look forward to hearing from you. Thank you.";
	const money = (n) => new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(n);
	const item = (p, name) => (p?.franchise_package_items || []).find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
	const groupName = (i) => /led tv|induction/i.test(i.name) ? "Additional Equipment" : /branding|board|frame/i.test(i.category) ? "Branding Equipment" : /kitchen/i.test(i.category) ? "Kitchen Equipment" : /furniture|woodwork/i.test(i.category) ? "Furniture and Woodwork" : /raw/i.test(i.category) ? "Raw Materials" : "Additional Equipment";
	const groups = (p) => [
		"Branding Equipment",
		"Kitchen Equipment",
		"Furniture and Woodwork",
		"Raw Materials",
		"Additional Equipment"
	].map((name) => ({
		name,
		items: (p?.franchise_package_items || []).filter((i) => groupName(i) === name).sort((a, b) => a.sort_order - b.sort_order)
	})).filter((g) => g.items.length);
	const iconType = (name) => name.startsWith("Branding") ? "branding" : name.startsWith("Kitchen") ? "kitchen" : name.startsWith("Furniture") ? "furniture" : name.startsWith("Raw") ? "raw" : "additional";
	const spec = (i) => i.dimensions || "Not applicable";
	const qty = (i) => i.quantity != null ? `${i.quantity} ${i.unit || "unit"}` : "Not specified";
	const included = (p, name) => Boolean(item(p, name));
	const highlights = (p) => benefits.filter((b) => b.package_id === p?.id && [
		"general",
		"training",
		"marketing"
	].includes(b.benefit_type)).slice(0, 5);
	return renderTemplate`${renderComponent($$result, "SimpleBase", $$SimpleBase, {
		"title": "Chai Rides Franchise · Ride to Sip",
		"description": "Explore Classic and Standard Chai Rides franchise packages in Siddipet, Telangana.",
		"data-astro-cid-g7dvcu6s": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", $$Header, {
		"name": "CHAI RIDES",
		"themeKey": "espresso",
		"showSwitcher": false,
		"showHomeBack": true,
		"links": [
			{
				href: "/#menu",
				label: "Menu"
			},
			{
				href: "#packages",
				label: "Packages"
			},
			{
				href: "#apply",
				label: "Apply"
			}
		],
		"data-astro-cid-g7dvcu6s": true
	})} ${maybeRenderHead($$result)}<main id="main" class="franchise-page" data-astro-cid-g7dvcu6s> <section class="fr-hero" data-astro-cid-g7dvcu6s> <div class="hero-orb orb-one" data-astro-cid-g7dvcu6s></div><div class="hero-orb orb-two" data-astro-cid-g7dvcu6s></div> <div class="wrap hero-layout" data-astro-cid-g7dvcu6s> <div class="hero-copy reveal" data-astro-cid-g7dvcu6s><div class="brand-lockup" data-astro-cid-g7dvcu6s><img src="/chai-rides-logo.png" alt="Chai Rides" data-astro-cid-g7dvcu6s><div data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Siddipet · Telangana · India</span><strong data-astro-cid-g7dvcu6s>${settings?.tagline || "Ride to Sip"}</strong></div></div><h1 data-astro-cid-g7dvcu6s>${settings?.hero_heading || "Build your next chapter with Chai Rides."}</h1><p data-astro-cid-g7dvcu6s>${settings?.hero_text || "A premium Indian chai franchise with a focused format, practical support and two clear investment paths."}</p><div class="hero-actions" data-astro-cid-g7dvcu6s><a class="button button-primary" href="#packages" data-astro-cid-g7dvcu6s>Explore Franchise Packages</a><a class="button button-ghost"${addAttribute(`https://wa.me/${digits}?text=${encodeURIComponent(defaultMessage)}`, "href")} target="_blank" rel="noopener" data-astro-cid-g7dvcu6s>Enquire on WhatsApp</a></div><div class="hero-proof" data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>2</strong> clear packages</span><span data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>3 days</strong> training</span><span data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>0</strong> royalty listed</span></div></div> <div class="chai-scene brand-scene reveal" data-astro-cid-g7dvcu6s><span class="brand-halo" aria-hidden="true" data-astro-cid-g7dvcu6s></span><img class="hero-brand-gif" src="/chai-rides-logo.png" alt="Chai Rides — Ride to Sip" data-astro-cid-g7dvcu6s><div class="scene-note" data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Franchise from</span><strong data-astro-cid-g7dvcu6s>${classic && money(classic.investment_amount)}</strong></div></div> </div> </section> ${!publicSupabaseConfigured && renderTemplate`<section class="wrap notice" data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>Supabase setup required</strong><p data-astro-cid-g7dvcu6s>Package content will appear after the database is configured.</p></section>`}${loadError && renderTemplate`<section class="wrap notice error" data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>Unable to load franchise information</strong><p data-astro-cid-g7dvcu6s>${loadError}</p></section>`} ${content && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <section class="wrap intro-section reveal" data-astro-cid-g7dvcu6s><div class="intro-title" data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>A modern chai business</span><h2 data-astro-cid-g7dvcu6s>A familiar ritual, shaped into a focused franchise.</h2></div><div class="intro-story" data-astro-cid-g7dvcu6s><p data-astro-cid-g7dvcu6s>${settings?.about_content || "Chai Rides brings a recognisable tea-and-snacks format together with practical training, operational guidance and marketing support."}</p><strong data-astro-cid-g7dvcu6s>Rooted in Siddipet. Ready for the next chai destination.</strong><span class="intro-steam" aria-hidden="true" data-astro-cid-g7dvcu6s>♨</span></div></section> <section class="wrap section" id="packages" data-astro-cid-g7dvcu6s><div class="section-heading" data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>Choose your format</span><h2 data-astro-cid-g7dvcu6s>Two packages. One unmistakable chai identity.</h2><p data-astro-cid-g7dvcu6s>Compare the investment, included setup and opening materials, then enquire directly about the best fit for your location.</p></div><div class="package-grid" data-astro-cid-g7dvcu6s>${packages.map((p, index) => renderTemplate`<article${addAttribute(`package-card reveal ${p.slug === "standard-franchise" ? "standard" : ""}`, "class")} data-astro-cid-g7dvcu6s><div class="package-top" data-astro-cid-g7dvcu6s><span class="package-index" data-astro-cid-g7dvcu6s>${index === 0 ? "Classic" : "Standard"}</span>${renderComponent($$result, "FranchiseIcon", $$FranchiseIcon, {
		"type": index === 0 ? "branding" : "additional",
		"data-astro-cid-g7dvcu6s": true
	})}</div><h3 data-astro-cid-g7dvcu6s>${p.name}</h3><p class="price" data-astro-cid-g7dvcu6s>${money(p.investment_amount)}</p><p class="package-description" data-astro-cid-g7dvcu6s>${p.description}</p><ul class="highlight-list" data-astro-cid-g7dvcu6s>${highlights(p).map((b) => renderTemplate`<li data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>✓</span>${b.title}</li>`)}</ul><div class="card-actions" data-astro-cid-g7dvcu6s><a class="button button-dark"${addAttribute(`#details-${p.slug}`, "href")} data-astro-cid-g7dvcu6s>View Full Details</a><a class="button button-light"${addAttribute(`https://wa.me/${digits}?text=${encodeURIComponent(`${defaultMessage} I am interested in the ${p.name}.`)}`, "href")} target="_blank" rel="noopener" data-astro-cid-g7dvcu6s>Enquire Now</a></div></article>`)}</div></section> <section class="comparison-section" data-astro-cid-g7dvcu6s><div class="wrap" data-astro-cid-g7dvcu6s><div class="section-heading light" data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>The important differences</span><h2 data-astro-cid-g7dvcu6s>Understand both packages in seconds.</h2></div><div class="comparison-grid" data-astro-cid-g7dvcu6s>${[classic, standard].filter(Boolean).map((p) => renderTemplate`<article${addAttribute(`compare-card ${p.slug === "standard-franchise" ? "standard" : ""}`, "class")} data-astro-cid-g7dvcu6s><div class="compare-head" data-astro-cid-g7dvcu6s><div data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>${p.slug === "standard-franchise" ? "Expanded format" : "Focused format"}</span><h3 data-astro-cid-g7dvcu6s>${p.name}</h3></div><strong data-astro-cid-g7dvcu6s>${money(p.investment_amount)}</strong></div><div class="quick-facts" data-astro-cid-g7dvcu6s><p data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Investment</span><strong data-astro-cid-g7dvcu6s>${money(p.investment_amount)}</strong></p><p data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Fridge</span><strong data-astro-cid-g7dvcu6s>${spec(item(p, "Fridge"))}</strong></p><p data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Chairs</span><strong${addAttribute(included(p, "Chairs") ? "yes" : "no", "class")} data-astro-cid-g7dvcu6s>${included(p, "Chairs") ? qty(item(p, "Chairs")) : "Not included"}</strong></p><p data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>32-inch LED TV</span><strong${addAttribute(included(p, "32-inch LED TV") ? "yes" : "no", "class")} data-astro-cid-g7dvcu6s>${included(p, "32-inch LED TV") ? "1 unit" : "Not included"}</strong></p><p data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Additional gas stove</span><strong${addAttribute(included(p, "Additional gas stove") ? "yes" : "no", "class")} data-astro-cid-g7dvcu6s>${included(p, "Additional gas stove") ? "1 unit" : "Not included"}</strong></p><p data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Tea powder</span><strong data-astro-cid-g7dvcu6s>${qty(item(p, "Tea powder"))}</strong></p></div><details data-astro-cid-g7dvcu6s><summary data-astro-cid-g7dvcu6s>Other key inclusions <span aria-hidden="true" data-astro-cid-g7dvcu6s>⌄</span></summary><ul data-astro-cid-g7dvcu6s>${p.slug === "standard-franchise" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<li data-astro-cid-g7dvcu6s>✓ Larger Standard raw-material quantities</li><li data-astro-cid-g7dvcu6s>✓ Existing stove plus one additional gas stove</li><li data-astro-cid-g7dvcu6s>✓ Branding, furniture and kitchen equipment</li>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<li data-astro-cid-g7dvcu6s>✓ Classic equipment and raw materials</li><li data-astro-cid-g7dvcu6s>✓ Existing Classic fridge specification retained</li><li data-astro-cid-g7dvcu6s>✓ Branding, furniture and kitchen equipment</li>` })}`}<li data-astro-cid-g7dvcu6s>✓ Training and marketing support</li></ul></details></article>`)}</div><p class="comparison-note" data-astro-cid-g7dvcu6s>Package contents remain subject to written terms. Revenue and success are not guaranteed.</p></div></section> <section class="wrap section equipment-section" data-astro-cid-g7dvcu6s><div class="section-heading" data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>Complete inclusions</span><h2 data-astro-cid-g7dvcu6s>Every available item, clearly organised.</h2><p data-astro-cid-g7dvcu6s>Choose a package, then expand a category. Missing measurements are shown as “Not applicable”; unclear source text remains flagged for confirmation.</p></div><div class="package-switcher" role="tablist" aria-label="Select package details" data-astro-cid-g7dvcu6s>${packages.map((p, i) => renderTemplate`<button role="tab" type="button"${addAttribute(i === 0 ? "true" : "false", "aria-selected")}${addAttribute(p.slug, "data-package-tab")} data-astro-cid-g7dvcu6s>${p.name}<span data-astro-cid-g7dvcu6s>${money(p.investment_amount)}</span></button>`)}</div>${packages.map((p, i) => renderTemplate`<article class="details-panel"${addAttribute(`details-${p.slug}`, "id")}${addAttribute(p.slug, "data-package-panel")}${addAttribute(i !== 0, "hidden")} data-astro-cid-g7dvcu6s><div class="details-title" data-astro-cid-g7dvcu6s><div data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>Package contents</span><h3 data-astro-cid-g7dvcu6s>${p.name}</h3></div><span data-astro-cid-g7dvcu6s>${p.franchise_package_items.length} included records</span></div><div class="accordion-grid" data-astro-cid-g7dvcu6s>${groups(p).map((group) => renderTemplate`<details class="category-card" data-astro-cid-g7dvcu6s><summary data-astro-cid-g7dvcu6s>${renderComponent($$result, "FranchiseIcon", $$FranchiseIcon, {
		"type": iconType(group.name),
		"data-astro-cid-g7dvcu6s": true
	})}<span class="summary-copy" data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>${group.name}</strong><small data-astro-cid-g7dvcu6s>${group.items.length} items · Tap to expand</small></span><svg class="chevron" viewBox="0 0 20 20" aria-hidden="true" data-astro-cid-g7dvcu6s><path d="m5 7.5 5 5 5-5" data-astro-cid-g7dvcu6s></path></svg></summary><div class="item-list" data-astro-cid-g7dvcu6s>${group.items.map((i) => renderTemplate`<article class="item-row" data-astro-cid-g7dvcu6s><div data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>${i.name}</strong>${i.needs_confirmation && renderTemplate`<span class="confirmation" data-astro-cid-g7dvcu6s>Needs Admin Confirmation</span>`}</div><dl data-astro-cid-g7dvcu6s><div data-astro-cid-g7dvcu6s><dt data-astro-cid-g7dvcu6s>Quantity</dt><dd data-astro-cid-g7dvcu6s>${qty(i)}</dd></div><div data-astro-cid-g7dvcu6s><dt data-astro-cid-g7dvcu6s>Dimensions / capacity</dt><dd data-astro-cid-g7dvcu6s>${spec(i)}</dd></div>${i.unit_price != null && renderTemplate`<div data-astro-cid-g7dvcu6s><dt data-astro-cid-g7dvcu6s>Unit price</dt><dd data-astro-cid-g7dvcu6s>${money(i.unit_price)}</dd></div>`}</dl></article>`)}</div></details>`)}</div></article>`)}</section> <section class="support-section" data-astro-cid-g7dvcu6s><div class="wrap" data-astro-cid-g7dvcu6s><div class="section-heading light" data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>Support beyond setup</span><h2 data-astro-cid-g7dvcu6s>Training, operations and launch support.</h2></div><div class="support-cards" data-astro-cid-g7dvcu6s>${[
		[
			"training",
			"Three-day training",
			"Recipe preparation, operations, customer service and business management."
		],
		[
			"marketing",
			"Marketing support",
			"Social page setup, branding, content planning and engagement guidance."
		],
		[
			"general",
			"Franchise benefits",
			"No royalty and applicable package benefits, subject to the written agreement."
		]
	].map(([type, title, summary]) => renderTemplate`<article class="support-card reveal" data-astro-cid-g7dvcu6s>${renderComponent($$result, "FranchiseIcon", $$FranchiseIcon, {
		"type": type,
		"data-astro-cid-g7dvcu6s": true
	})}<h3 data-astro-cid-g7dvcu6s>${title}</h3><p data-astro-cid-g7dvcu6s>${summary}</p><ul data-astro-cid-g7dvcu6s>${benefits.filter((b) => b.benefit_type === type).slice(0, 5).map((b) => renderTemplate`<li data-astro-cid-g7dvcu6s>${b.title}</li>`)}</ul></article>`)}</div><div class="terms-strip" data-astro-cid-g7dvcu6s><strong data-astro-cid-g7dvcu6s>Transparent promotion policy</strong><p data-astro-cid-g7dvcu6s>Promotional revenue figures, “high returns,” business-support language and poster success wording are not guarantees of earnings, profit or outcomes.</p></div></div></section> <section class="wrap contact-section" id="apply" data-astro-cid-g7dvcu6s><div class="contact-copy" data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>Start the conversation</span><h2 data-astro-cid-g7dvcu6s>Ready to bring Chai Rides to your city?</h2><p data-astro-cid-g7dvcu6s>Call, message us on WhatsApp, or submit the application. The team will review your location and package preference.</p><div class="contact-actions" data-astro-cid-g7dvcu6s><a class="contact-action"${addAttribute(`tel:+${digits}`, "href")} data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>Call Now</span><strong data-astro-cid-g7dvcu6s>${phone}</strong></a><a class="contact-action whatsapp"${addAttribute(`https://wa.me/${digits}?text=${encodeURIComponent(defaultMessage)}`, "href")} target="_blank" rel="noopener" data-astro-cid-g7dvcu6s><span data-astro-cid-g7dvcu6s>WhatsApp Enquiry</span><strong data-astro-cid-g7dvcu6s>Start a conversation</strong></a></div></div><form class="enquiry-form" method="post" action="/api/franchise" data-astro-cid-g7dvcu6s>${Astro.url.searchParams.has("sent") && renderTemplate`<p class="form-message success" data-astro-cid-g7dvcu6s>Your enquiry was saved successfully. The team can now review it.</p>`}${Astro.url.searchParams.has("error") && renderTemplate`<p class="form-message error" data-astro-cid-g7dvcu6s>Please check the required fields.</p>`}${Astro.url.searchParams.has("rate") && renderTemplate`<p class="form-message error" data-astro-cid-g7dvcu6s>Please wait before sending another enquiry.</p>`}<div class="field-grid" data-astro-cid-g7dvcu6s><label data-astro-cid-g7dvcu6s>Full name<input name="full_name" required minlength="2" maxlength="100" autocomplete="name" data-astro-cid-g7dvcu6s></label><label data-astro-cid-g7dvcu6s>Mobile number<input name="mobile" required maxlength="20" autocomplete="tel" data-astro-cid-g7dvcu6s></label><label data-astro-cid-g7dvcu6s>Email <span data-astro-cid-g7dvcu6s>Optional</span><input name="email" type="email" maxlength="160" autocomplete="email" data-astro-cid-g7dvcu6s></label><label data-astro-cid-g7dvcu6s>City / location<input name="city" required maxlength="100" autocomplete="address-level2" data-astro-cid-g7dvcu6s></label><label data-astro-cid-g7dvcu6s>Interested package<select name="package_id" data-astro-cid-g7dvcu6s><option value="" data-astro-cid-g7dvcu6s>Select a package</option>${packages.map((p) => renderTemplate`<option${addAttribute(p.id, "value")} data-astro-cid-g7dvcu6s>${p.name} · ${money(p.investment_amount)}</option>`)}</select></label><label data-astro-cid-g7dvcu6s>Investment budget <span data-astro-cid-g7dvcu6s>Optional</span><input name="preferred_budget" maxlength="60" data-astro-cid-g7dvcu6s></label></div><label class="honeypot" data-astro-cid-g7dvcu6s>Website<input name="website" tabindex="-1" autocomplete="off" data-astro-cid-g7dvcu6s></label><label data-astro-cid-g7dvcu6s>Message<textarea name="message" rows="4" maxlength="1500" data-astro-cid-g7dvcu6s></textarea></label><button class="button button-primary submit-button" type="submit" data-astro-cid-g7dvcu6s>Submit Enquiry</button></form></section> <section class="wrap faq-section" data-astro-cid-g7dvcu6s><div data-astro-cid-g7dvcu6s><span class="kicker" data-astro-cid-g7dvcu6s>Questions & terms</span><h2 data-astro-cid-g7dvcu6s>Clear answers before you apply.</h2><p data-astro-cid-g7dvcu6s>${settings?.terms}</p></div><div data-astro-cid-g7dvcu6s>${faqs.map((f) => renderTemplate`<details data-astro-cid-g7dvcu6s><summary data-astro-cid-g7dvcu6s>${f.question}<span data-astro-cid-g7dvcu6s>+</span></summary><p data-astro-cid-g7dvcu6s>${f.answer}</p></details>`)}</div></section> ` })}`} </main>${renderComponent($$result, "FranchiseLocations", $$FranchiseLocations, {
		"locations": locations,
		"data-astro-cid-g7dvcu6s": true
	})}${renderComponent($$result, "Footer", $$Footer, {
		"footer": footer,
		"data-astro-cid-g7dvcu6s": true
	})}${renderScript($$result, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/franchise.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/franchise.astro", void 0);
var $$file = "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/franchise.astro";
var $$url = "/franchise";
// \0virtual:astro:page:src/pages/franchise@_@astro
var page = () => franchise_exports;
export { page };
