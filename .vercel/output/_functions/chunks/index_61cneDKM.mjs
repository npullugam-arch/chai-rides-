import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { C as unescapeHTML, a as Fragment, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { t as renderScript } from "./script_istBs7Sh.mjs";
import { n as $$Base, t as loadSite } from "./content_BLhOlhDb.mjs";
import { n as $$Header, t as $$Footer } from "./Footer_DZtHF2NQ.mjs";
import { s as loadFooterContent } from "./supabase_BKWTd6yk.mjs";
// src/components/CupFallback.astro
var $$CupFallback = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="spot-fallback" data-fallback> <svg viewBox="0 0 200 160" aria-hidden="true"><ellipse cx="100" cy="140" rx="88" ry="12" fill="var(--line)"></ellipse><path d="M40 50h110l-10 70a20 20 0 0 1-20 18H70a20 20 0 0 1-20-18Z" fill="var(--accent)"></path><path d="M150 62c22 0 22 40-6 40" stroke="var(--accent)" stroke-width="10" fill="none"></path><ellipse cx="95" cy="50" rx="55" ry="10" fill="var(--ink)" opacity=".85"></ellipse><path d="M80 30c-6-8 6-12 0-22M100 32c-6-8 6-12 0-22M120 30c-6-8 6-12 0-22" stroke="var(--muted)" stroke-width="3" fill="none" stroke-linecap="round"></path></svg> </div>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/CupFallback.astro", void 0);
// src/components/Hero.astro
createAstro("http://localhost:4321");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { eyebrow, title, text, stats } = Astro.props;
	const words = title.trim().split(/\s+/);
	return renderTemplate`${maybeRenderHead($$result)}<section class="wrap hero" aria-labelledby="hero-title"> <div> ${eyebrow && renderTemplate`<span class="eyebrow">${eyebrow}</span>`} <h1 id="hero-title"> ${words.map((w, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="w"${addAttribute(`animation-delay:${i * .07}s`, "style")}>${i === words.length - 1 ? renderTemplate`<em>${w}</em>` : w}</span>${i < words.length - 1 ? " " : ""} ` })}`)} </h1> <p class="hero-text">${text}</p> <div class="hero-cta"> <a class="btn" href="#menu">See the menu</a> <a class="btn btn-ghost" href="#visit">Find us</a> </div> ${stats.length > 0 && renderTemplate`<dl class="stats"> ${stats.map((s) => renderTemplate`<div> <dt>${s.value}</dt> <dd>${s.label}</dd> </div>`)} </dl>`} </div> <div class="spot" id="spotHero">${renderComponent($$result, "CupFallback", $$CupFallback, {})}</div> </section>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Hero.astro", void 0);
// src/components/Ticker.astro
createAstro("http://localhost:4321");
var $$Ticker = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Ticker;
	const { items } = Astro.props;
	return renderTemplate`${items.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div class="ticker"> <p class="sr-only">${items.join(". ")}</p> <div class="ticker-track" aria-hidden="true"> ${[...items, ...items].map((t) => renderTemplate`<span>${t}</span>`)} </div> </div>`}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Ticker.astro", void 0);
// src/components/Beans.astro
createAstro("http://localhost:4321");
var $$Beans = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Beans;
	const { eyebrow, title, text, origins, steps } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="wrap section" id="beans" aria-labelledby="beans-title"> <div class="split"> <div class="spot" id="spotStory">${renderComponent($$result, "CupFallback", $$CupFallback, {})}</div> <div> ${eyebrow && renderTemplate`<span class="eyebrow">${eyebrow}</span>`} <h2 class="sec-title" id="beans-title">${title}</h2> ${text && renderTemplate`<p class="lede">${text}</p>`} <ul class="origins"> ${origins.map((o) => renderTemplate`<li class="origin"> <h3>${o.name}</h3> <div class="meta">${o.process}<br>${o.altitude}</div> ${o.notes.length > 0 && renderTemplate`<ul class="notes" aria-label="Tasting notes"> ${o.notes.map((n) => renderTemplate`<li>${n}</li>`)} </ul>`} <div class="roast"> <span>Intensity</span> <span class="sr-only">${o.roast} of 5</span> ${[
		1,
		2,
		3,
		4,
		5
	].map((i) => renderTemplate`<i${addAttribute(i <= o.roast ? "on" : "", "class")} aria-hidden="true"></i>`)} ${o.use && renderTemplate`<span class="use">${o.use}</span>`} </div> </li>`)} </ul> </div> </div> ${steps.length > 0 && renderTemplate`<ol class="steps"> ${steps.map((s) => renderTemplate`<li class="step"> <h3>${s.title}</h3> <p>${s.text}</p> </li>`)} </ol>`} </section>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Beans.astro", void 0);
// src/components/Menu.astro
createAstro("http://localhost:4321");
var $$Menu = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Menu;
	const { eyebrow, title, note, drinks, categories, startDrink, formatPrice } = Astro.props;
	const startCat = startDrink?.category ?? categories[0];
	const tabId = (i) => `tab-${i}`;
	const looks = Object.fromEntries(drinks.map((d) => [d.id, {
		...d.look,
		name: d.name,
		recipe: d.recipe,
		category: d.category,
		price: formatPrice(d.price)
	}]));
	return renderTemplate`${maybeRenderHead($$result)}<section class="wrap section flush-top" id="menu" aria-labelledby="menu-title"> ${eyebrow && renderTemplate`<span class="eyebrow">${eyebrow}</span>`} <h2 class="sec-title" id="menu-title">${title}</h2> <div class="menu-grid"> <div> ${categories.length > 1 && renderTemplate`<div class="tabs" role="tablist" aria-label="Menu sections" data-tabs="drink-list"> ${categories.map((c, i) => renderTemplate`<button class="tab" type="button" role="tab"${addAttribute(tabId(i), "id")} aria-controls="drink-list"${addAttribute(c === startCat ? "true" : "false", "aria-selected")}${addAttribute(c === startCat ? 0 : -1, "tabindex")}${addAttribute(c, "data-cat")}>${c}</button>`)} </div>`} <div class="drinks" id="drink-list"${addAttribute(categories.length > 1 ? "tabpanel" : void 0, "role")}${addAttribute(categories.length > 1 ? tabId(categories.indexOf(startCat)) : void 0, "aria-labelledby")}> ${drinks.map((d) => renderTemplate`<div class="drink-row"${addAttribute(d.category, "data-cat")}${addAttribute(d.category !== startCat, "hidden")}> <button class="drink" type="button"${addAttribute(d.id, "data-drink")}${addAttribute(d.id === startDrink?.id ? "true" : "false", "aria-pressed")}> <span class="dname">${d.name}</span> <span class="price">${formatPrice(d.price)}</span> ${d.description && renderTemplate`<span class="ddesc">${d.description}</span>`} </button> </div>`)} </div> ${note && renderTemplate`<p class="lede menu-note">${note}</p>`} </div> <div class="window" id="cupWindow" aria-live="polite"> ${renderComponent($$result, "CupFallback", $$CupFallback, {})} <div class="window-top"><span class="eyebrow" id="winBar">${startDrink?.category}</span><span class="eyebrow" id="winPrice">${startDrink && formatPrice(startDrink.price)}</span></div> <div class="window-cap"> <div><h3 id="winName">${startDrink?.name}</h3><p class="ratio" id="winRatio">${startDrink?.recipe}</p></div> </div> </div> </div> <script type="application/json" id="drink-looks">${unescapeHTML(JSON.stringify({
		start: startDrink?.id ?? null,
		drinks: looks
	}))}<\/script> </section>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Menu.astro", void 0);
// src/components/BakeryThumb.astro
createAstro("http://localhost:4321");
var $$BakeryThumb = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BakeryThumb;
	const { shape, tone } = Astro.props;
	const shade = (hex, k) => "#" + [
		1,
		3,
		5
	].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * k).toString(16).padStart(2, "0")).join("");
	const dark = shade(tone, .55);
	const mid = shade(tone, .8);
	return renderTemplate`${shape === "cookie" ? renderTemplate`${maybeRenderHead($$result)}<svg viewBox="0 0 64 64" aria-hidden="true"> <circle cx="32" cy="33" r="25"${addAttribute(mid, "fill")}></circle> <circle cx="32" cy="31" r="25"${addAttribute(tone, "fill")}></circle> <circle cx="22" cy="23" r="3.6"${addAttribute(dark, "fill")}></circle> <circle cx="38" cy="19" r="3"${addAttribute(dark, "fill")}></circle> <circle cx="43" cy="33" r="3.8"${addAttribute(dark, "fill")}></circle> <circle cx="28" cy="38" r="3.2"${addAttribute(dark, "fill")}></circle> <circle cx="19" cy="34" r="2.4"${addAttribute(dark, "fill")}></circle> <circle cx="36" cy="45" r="2.6"${addAttribute(dark, "fill")}></circle> <path d="M16 22c3-6 9-10 16-10" stroke="#fff" stroke-opacity=".28" stroke-width="2.5" stroke-linecap="round" fill="none"></path> </svg>` : renderTemplate`<svg viewBox="0 0 64 64" aria-hidden="true"> <path d="M15 34h34l-4.5 22a3 3 0 0 1-3 2.4H22.5a3 3 0 0 1-3-2.4Z" fill="var(--accent)"></path> <path d="M22 35l1.6 22M29 35l.6 22.5M35 35l-.6 22.5M42 35l-1.6 22" stroke="var(--paper)" stroke-opacity=".35" stroke-width="1.6"></path> <path d="M11 34c0-12 9.5-22 21-22s21 10 21 22c0 2-1.6 3.5-3.5 3.5h-35C12.6 37.5 11 36 11 34Z"${addAttribute(tone, "fill")}></path> <circle cx="24" cy="24" r="2.4"${addAttribute(dark, "fill")}></circle> <circle cx="35" cy="20" r="2.2"${addAttribute(dark, "fill")}></circle> <circle cx="41" cy="29" r="2.4"${addAttribute(dark, "fill")}></circle> <circle cx="29" cy="30" r="2"${addAttribute(dark, "fill")}></circle> <path d="M18 24c2-5 7-8 12-8.5" stroke="#fff" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round" fill="none"></path> </svg>`}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/BakeryThumb.astro", void 0);
// src/components/Bakery.astro
createAstro("http://localhost:4321");
var $$Bakery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Bakery;
	const { eyebrow, title, text, items, categories, formatPrice } = Astro.props;
	const first = categories[0];
	const tabId = (i) => `btab-${i}`;
	const TAG_LABELS = {
		vegan: "Vegan",
		vegetarian: "Vegetarian",
		"gluten-free": "Gluten-free",
		nuts: "Contains nuts",
		egg: "Contains egg"
	};
	const start = items.find((b) => b.category === first) ?? items[0];
	const chaiMurukuluGif = "https://i.postimg.cc/mkHbFsPB/Animated-Chai-Pour-Over-Murukulu.gif";
	return renderTemplate`${items.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="wrap section flush-top" id="bakery" aria-labelledby="bakery-title"> <div class="bakery-content"> ${eyebrow && renderTemplate`<span class="eyebrow">${eyebrow}</span>`} <h2 class="sec-title" id="bakery-title">${title}</h2> ${text && renderTemplate`<p class="lede">${text}</p>`} ${categories.length > 1 && renderTemplate`<div class="tabs bakery-tabs" role="tablist" aria-label="Bakery sections" data-tabs="bakery-list"> ${categories.map((c, i) => renderTemplate`<button class="tab" type="button" role="tab"${addAttribute(tabId(i), "id")} aria-controls="bakery-list"${addAttribute(c === first ? "true" : "false", "aria-selected")}${addAttribute(c === first ? 0 : -1, "tabindex")}${addAttribute(c, "data-cat")}>${c}</button>`)} </div>`} <ul class="bakes" id="bakery-list"${addAttribute(categories.length > 1 ? "tabpanel" : void 0, "role")}${addAttribute(categories.length > 1 ? tabId(0) : void 0, "aria-labelledby")}> ${items.map((b) => renderTemplate`<li class="bake"${addAttribute(b.category, "data-cat")}${addAttribute(b.category !== first, "hidden")}> <button class="bake-pick" type="button"${addAttribute(b.id, "data-bake")}${addAttribute(b.name, "data-name")}${addAttribute(b.id === start?.id ? "true" : "false", "aria-pressed")}> <span class="bake-thumb"> ${b.name === "Chai Murukulu" ? renderTemplate`<img${addAttribute(chaiMurukuluGif, "src")} alt="Animated chai being poured over Chai Murukulu" width="72" height="72" loading="lazy" decoding="async">` : b.photo ? renderTemplate`<img${addAttribute(b.photo, "src")} alt="" width="72" height="72" loading="lazy" decoding="async">` : renderTemplate`${renderComponent($$result, "BakeryThumb", $$BakeryThumb, {
		"shape": b.shape,
		"tone": b.tone
	})}`} </span> <span class="bake-body"> <span class="bake-head"><span class="bake-name">${b.name}</span><span class="price">${formatPrice(b.price)}</span></span> ${b.description && renderTemplate`<span class="ddesc">${b.description}</span>`} ${b.tags.length > 0 && renderTemplate`<span class="tags"> <span class="sr-only">Dietary information:</span> ${b.tags.map((t) => renderTemplate`<span${addAttribute(`tag tag-${t}`, "class")}>${TAG_LABELS[t] ?? t}</span>`)} </span>`} </span> </button> </li>`)} </ul> </div> </section>`}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Bakery.astro", void 0);
// src/components/BrandedCup.astro
var $$BrandedCup = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="branded-cup-section wrap" aria-labelledby="branded-cup-title"> <div class="branded-cup-art reveal"> <img src="/chai-rides-branded-cup.png" alt="Customized Chai Rides branded takeaway cup" width="533" height="800" loading="lazy" decoding="async"> </div> <div class="branded-cup-copy"> <span class="eyebrow">The Chai Rides touch</span> <h2 id="branded-cup-title">Every Sip, Uniquely Chai Rides.</h2> <p>Crafted with care and served in our signature branded cups, bringing the Chai Rides experience to every sip.</p> </div> </section>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/BrandedCup.astro", void 0);
// src/components/Visit.astro
createAstro("http://localhost:4321");
var $$Visit = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Visit;
	const { eyebrow, title, addressLines, mapsUrl, phone, hours, note, timeZone } = Astro.props;
	const tel = phone ? "tel:" + phone.replace(/[^\d+]/g, "") : "";
	return renderTemplate`${maybeRenderHead($$result)}<section class="wrap section flush-top" id="visit" aria-labelledby="visit-title"> <div class="visit"> <div> ${eyebrow && renderTemplate`<span class="eyebrow">${eyebrow}</span>`} <h2 class="sec-title" id="visit-title">${title}</h2> <address class="addr">${addressLines.map((l, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${l}${i < addressLines.length - 1 && renderTemplate`<br>`}` })}`)}</address> <span class="open-pill" id="openPill"${addAttribute(timeZone, "data-tz")}${addAttribute(JSON.stringify(hours), "data-hours")}><i></i><span></span></span> <dl class="hours" id="hours"> ${hours.map((h) => renderTemplate`<div><dt>${h.day}</dt><dd>${h.closed ? "Closed" : `${h.open} – ${h.close}`}</dd></div>`)} </dl> ${note && renderTemplate`<p class="hours-note">${note}</p>`} <div class="hero-cta"> <a class="btn"${addAttribute(mapsUrl, "href")} target="_blank" rel="noopener">Get directions</a> ${phone && renderTemplate`<a class="btn btn-ghost"${addAttribute(tel, "href")}>${phone}</a>`} </div> </div> <div class="spot" id="spotVisit">${renderComponent($$result, "CupFallback", $$CupFallback, {})}</div> </div> </section>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Visit.astro", void 0);
// src/components/WelcomeLoader.astro
var $$WelcomeLoader = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="welcome-loader" id="welcomeLoader" role="status" aria-live="polite" aria-label="Welcome to Chai Rides"> <img class="welcome-loader__gif" src="/chai-rides-welcome.gif" alt="" width="240" height="240" fetchpriority="high" decoding="async"> </div> <script>
  const loader = document.querySelector('#welcomeLoader');
  const root = document.documentElement;

  if (!root.classList.contains('welcome-pending')) {
    loader?.remove();
  } else {
    window.setTimeout(() => {
      root.classList.remove('welcome-pending');
      loader?.remove();
    }, 2500);
  }
<\/script>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/WelcomeLoader.astro", void 0);
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [site, footer] = await Promise.all([loadSite(), loadFooterContent()]);
	const { settings: s, page } = site;
	const links = [
		{
			href: "#beans",
			label: "Chai"
		},
		{
			href: "#menu",
			label: "Menu"
		},
		...site.bakery.length ? [{
			href: "#bakery",
			label: "Snacks"
		}] : [],
		{
			href: "#visit",
			label: "Visit"
		},
		{
			href: "/franchise",
			label: "Franchise"
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"site": site,
		"welcomeLoader": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "WelcomeLoader", $$WelcomeLoader, {})} ${renderComponent($$result, "Header", $$Header, {
		"name": s.name,
		"themeKey": site.themeKey,
		"showSwitcher": s.showThemeSwitcher,
		"links": links
	})} ${maybeRenderHead($$result)}<canvas id="stage" aria-hidden="true"></canvas> <main id="main"> ${renderComponent($$result, "Hero", $$Hero, {
		"eyebrow": page.hero.eyebrow,
		"title": page.hero.title,
		"text": page.hero.text,
		"stats": [...page.stats]
	})} ${renderComponent($$result, "Ticker", $$Ticker, { "items": [...page.ticker] })} ${renderComponent($$result, "Beans", $$Beans, {
		"eyebrow": page.beans.eyebrow,
		"title": page.beans.title,
		"text": page.beans.text,
		"origins": site.origins,
		"steps": [...page.steps]
	})} ${renderComponent($$result, "Menu", $$Menu, {
		"eyebrow": page.menu.eyebrow,
		"title": page.menu.title,
		"note": page.menu.note,
		"drinks": site.drinks,
		"categories": site.categories,
		"startDrink": site.startDrink,
		"formatPrice": site.formatPrice
	})} ${renderComponent($$result, "BrandedCup", $$BrandedCup, {})} ${renderComponent($$result, "Bakery", $$Bakery, {
		"eyebrow": page.bakery.eyebrow,
		"title": page.bakery.title,
		"text": page.bakery.text,
		"items": site.bakery,
		"categories": site.bakeryCategories,
		"formatPrice": site.formatPrice
	})} ${renderComponent($$result, "Visit", $$Visit, {
		"eyebrow": page.visit.eyebrow,
		"title": page.visit.title,
		"addressLines": site.addressLines,
		"mapsUrl": site.mapsUrl,
		"phone": s.phone,
		"hours": site.hours,
		"note": site.hoursNote,
		"timeZone": s.timeZone
	})} </main> ${renderComponent($$result, "Footer", $$Footer, { "footer": footer })}${renderScript($$result, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/index.astro", void 0);
var $$file = "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
