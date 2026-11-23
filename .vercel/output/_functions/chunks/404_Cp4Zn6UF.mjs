import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { C as unescapeHTML, c as renderSlot, d as renderTemplate, f as maybeRenderHead, h as defineScriptVars, i as renderComponent, m as addAttribute, p as renderHead } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { a as themeCss, i as fontsUrl, n as THEMES, r as THEME_OPTIONS } from "./Logo_Ccjrvq56.mjs";
import { n as $$Header, t as $$Footer } from "./Footer_BA2BlTYx.mjs";
import { s as loadFooterContent } from "./supabase_CQzM9MX_.mjs";
import { createReader } from "@keystatic/core/reader";
import { collection, config, fields, singleton } from "@keystatic/core";
// src/layouts/Base.astro
createAstro("http://localhost:4321");
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const { site, title, description, noindex = false, welcomeLoader = false } = Astro.props;
	const { settings: s, themeKey, hours } = site;
	const theme = THEMES[themeKey];
	const pageTitle = title ?? (s.tagline ? `${s.name} · ${s.tagline}` : s.name);
	const pageDescription = description ?? s.description;
	const canonical = new URL(Astro.url.pathname, Astro.site).href;
	const ogImage = new URL("/og.png", Astro.site).href;
	const themeFonts = Object.fromEntries(Object.entries(THEMES).map(([k, t]) => [k, fontsUrl(t)]));
	const allowSwitch = s.showThemeSwitcher;
	const a = s.address;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CafeOrCoffeeShop",
		name: s.name,
		description: s.description,
		url: new URL("/", Astro.site).href,
		image: ogImage,
		telephone: s.phone || void 0,
		email: s.email || void 0,
		servesCuisine: "Indian tea and snacks",
		priceRange: "₹",
		hasMenu: new URL("/#menu", Astro.site).href,
		address: {
			"@type": "PostalAddress",
			streetAddress: a.street,
			addressLocality: a.city,
			addressRegion: a.region || void 0,
			postalCode: a.postalCode || void 0,
			addressCountry: a.country || void 0
		},
		openingHoursSpecification: hours.filter((h) => !h.closed).map((h) => ({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: `https://schema.org/${h.day}`,
			opens: h.open,
			closes: h.close
		})),
		sameAs: [s.instagram].filter(Boolean)
	};
	return renderTemplate`<html lang="en"${addAttribute(themeKey, "data-skin")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${pageTitle}</title><meta name="description"${addAttribute(pageDescription, "content")}><link rel="canonical"${addAttribute(canonical, "href")}>${noindex && renderTemplate`<meta name="robots" content="noindex">`}<meta name="theme-color"${addAttribute(theme.c.paper, "content")}><meta property="og:type" content="website"><meta property="og:site_name"${addAttribute(s.name, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDescription, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.ico?v=2" sizes="32x32"><link rel="icon" type="image/png" href="/favicon-32x32.png?v=2" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180"><link rel="sitemap" href="/sitemap-index.xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet"${addAttribute(fontsUrl(theme), "href")} id="theme-fonts">${welcomeLoader && renderTemplate`<link rel="preload" href="/chai-rides-welcome.gif" as="image" type="image/gif">`}<style>${unescapeHTML(themeCss())}</style><script>(function(){${defineScriptVars({
		themeFonts,
		allowSwitch,
		fallback: themeKey
	})}
      // Apply a visitor's saved theme before the page paints, to avoid a flash of the default.
      try {
        var saved = allowSwitch ? localStorage.getItem('cafe-theme') : null;
        if (saved && saved !== fallback && themeFonts[saved]) {
          document.documentElement.dataset.skin = saved;
          var l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = themeFonts[saved];
          l.dataset.theme = saved;
          document.head.appendChild(l);
        }
      } catch (e) {}
    })();<\/script>${welcomeLoader && renderTemplate`<script>
      document.documentElement.classList.add('welcome-pending');
    <\/script>`}<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>${renderHead($$result)}</head> <body> <a class="skip" href="#main">Skip to content</a> ${renderSlot($$result, $$slots["default"])} </body> </html>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/layouts/Base.astro", void 0);
// keystatic.config.ts
/**
* Keystatic: the admin panel staff use at /keystatic to edit the site.
*
* Every field below becomes a form in the admin. Edits are saved as JSON files
* in src/content/, and the site rebuilds from those files.
*
* Where edits are saved depends on environment variables (see .env.example):
*   - nothing set                   → "local": edits write straight to this folder (for npm run dev)
*   - PUBLIC_KEYSTATIC_CLOUD_PROJECT → Keystatic Cloud: staff sign in with email, no GitHub account needed
*   - PUBLIC_KEYSTATIC_GITHUB_REPO  → GitHub: staff sign in with their own GitHub accounts
*/
var storage = { kind: "local" };
var time = (label, defaultValue) => fields.text({
	label,
	defaultValue,
	validation: { pattern: {
		regex: /^([01]\d|2[0-3]):[0-5]\d$/,
		message: "Use 24-hour time, like 07:00 or 18:30"
	} }
});
var day = (label, open, close) => fields.object({
	closed: fields.checkbox({
		label: "Closed all day",
		defaultValue: false
	}),
	open: time("Opens", open),
	close: time("Closes", close)
}, { label });
var hexColor = (label, defaultValue, description) => fields.text({
	label,
	defaultValue,
	description,
	validation: { pattern: {
		regex: /^#[0-9a-fA-F]{6}$/,
		message: "Use a hex colour like #A87148"
	} }
});
var keystatic_config_default = config({
	storage,
	ui: {
		brand: { name: "CHAI RIDES" },
		navigation: {
			"Café": ["settings", "hours"],
			Menu: [
				"drinks",
				"bakery",
				"origins"
			],
			Website: ["homepage"]
		}
	},
	singletons: {
		settings: singleton({
			label: "Café details",
			path: "src/content/settings",
			format: { data: "json" },
			schema: {
				name: fields.text({
					label: "Café name",
					validation: { isRequired: true }
				}),
				tagline: fields.text({
					label: "Tagline",
					description: "Short line under the name in search results and link previews."
				}),
				description: fields.text({
					label: "Search description",
					multiline: true,
					description: "One or two sentences that Google and social media show for the site. Aim for 120–160 characters.",
					validation: { length: { max: 200 } }
				}),
				phone: fields.text({
					label: "Phone number",
					description: "Include the country code, e.g. +1 555 0142"
				}),
				email: fields.text({ label: "Email (optional)" }),
				address: fields.object({
					street: fields.text({
						label: "Street address",
						validation: { isRequired: true }
					}),
					area: fields.text({ label: "Area / neighbourhood (optional)" }),
					city: fields.text({
						label: "City",
						validation: { isRequired: true }
					}),
					region: fields.text({ label: "State / region" }),
					postalCode: fields.text({ label: "Postal code" }),
					country: fields.text({
						label: "Country code",
						description: "Two letters, e.g. US, GB, IN",
						defaultValue: "US"
					})
				}, { label: "Address" }),
				mapsUrl: fields.url({
					label: "Google Maps link (optional)",
					description: "Paste the share link for your café on Google Maps. If empty, directions search for the address."
				}),
				instagram: fields.url({ label: "Instagram link (optional)" }),
				currency: fields.select({
					label: "Currency",
					defaultValue: "USD",
					options: [
						{
							label: "US dollar ($)",
							value: "USD"
						},
						{
							label: "Indian rupee (₹)",
							value: "INR"
						},
						{
							label: "Euro (€)",
							value: "EUR"
						},
						{
							label: "British pound (£)",
							value: "GBP"
						},
						{
							label: "Australian dollar (A$)",
							value: "AUD"
						},
						{
							label: "Canadian dollar (C$)",
							value: "CAD"
						},
						{
							label: "Singapore dollar (S$)",
							value: "SGD"
						},
						{
							label: "UAE dirham (AED)",
							value: "AED"
						}
					]
				}),
				locale: fields.text({
					label: "Number format",
					defaultValue: "en-US",
					description: "How prices are written. en-US → $4.50, en-IN → ₹450.00, en-GB → £4.50"
				}),
				timeZone: fields.text({
					label: "Time zone",
					defaultValue: "America/New_York",
					description: "Used for the \"Open now\" badge. Examples: America/New_York, Europe/London, Asia/Kolkata"
				}),
				theme: fields.select({
					label: "Site theme",
					defaultValue: "espresso",
					options: THEME_OPTIONS
				}),
				showThemeSwitcher: fields.checkbox({
					label: "Let visitors switch themes",
					description: "Shows the colour swatches in the header.",
					defaultValue: true
				})
			}
		}),
		hours: singleton({
			label: "Opening hours",
			path: "src/content/hours",
			format: { data: "json" },
			schema: {
				monday: day("Monday", "07:00", "18:00"),
				tuesday: day("Tuesday", "07:00", "18:00"),
				wednesday: day("Wednesday", "07:00", "18:00"),
				thursday: day("Thursday", "07:00", "18:00"),
				friday: day("Friday", "07:00", "19:00"),
				saturday: day("Saturday", "08:00", "17:00"),
				sunday: day("Sunday", "08:00", "15:00"),
				note: fields.text({
					label: "Note under the hours (optional)",
					description: "e.g. \"Closed 25 December\""
				})
			}
		}),
		homepage: singleton({
			label: "Homepage text",
			path: "src/content/homepage",
			format: { data: "json" },
			schema: {
				hero: fields.object({
					eyebrow: fields.text({ label: "Small heading above the title" }),
					title: fields.text({
						label: "Big title",
						description: "The last word is shown in italics and the accent colour."
					}),
					text: fields.text({
						label: "Intro paragraph",
						multiline: true
					})
				}, { label: "Top of page" }),
				stats: fields.array(fields.object({
					value: fields.text({
						label: "Big value",
						description: "Short, e.g. \"Tue\" or \"12\""
					}),
					label: fields.text({ label: "Caption" })
				}), {
					label: "Three facts under the intro",
					itemLabel: (p) => `${p.fields.value.value} · ${p.fields.label.value}`,
					validation: { length: { max: 3 } }
				}),
				ticker: fields.array(fields.text({ label: "Line" }), {
					label: "Scrolling banner lines",
					itemLabel: (p) => p.value
				}),
				beans: fields.object({
					eyebrow: fields.text({ label: "Small heading" }),
					title: fields.text({ label: "Title" }),
					text: fields.text({
						label: "Paragraph",
						multiline: true
					})
				}, { label: "Beans section" }),
				steps: fields.array(fields.object({
					title: fields.text({ label: "Step title" }),
					text: fields.text({
						label: "Step text",
						multiline: true
					})
				}), {
					label: "How we work (steps)",
					itemLabel: (p) => p.fields.title.value,
					validation: { length: { max: 4 } }
				}),
				menu: fields.object({
					eyebrow: fields.text({ label: "Small heading" }),
					title: fields.text({ label: "Title" }),
					note: fields.text({
						label: "Note under the drinks",
						multiline: true
					})
				}, { label: "Menu section" }),
				bakery: fields.object({
					eyebrow: fields.text({ label: "Small heading" }),
					title: fields.text({ label: "Title" }),
					text: fields.text({
						label: "Paragraph",
						multiline: true
					})
				}, { label: "Bakery section" }),
				visit: fields.object({
					eyebrow: fields.text({ label: "Small heading" }),
					title: fields.text({ label: "Title" })
				}, { label: "Visit section" })
			}
		})
	},
	collections: {
		drinks: collection({
			label: "Drinks",
			slugField: "name",
			path: "src/content/drinks/*",
			format: { data: "json" },
			columns: [
				"category",
				"price",
				"available"
			],
			schema: {
				name: fields.slug({ name: {
					label: "Drink name",
					validation: { isRequired: true }
				} }),
				category: fields.text({
					label: "Menu tab",
					defaultValue: "Hot Chai",
					description: "Drinks with the same tab name are grouped together, e.g. Hot Chai, Cold Chai.",
					validation: { isRequired: true }
				}),
				price: fields.number({
					label: "Price",
					step: .01,
					validation: {
						isRequired: true,
						min: 0
					}
				}),
				description: fields.text({
					label: "Short description",
					multiline: true
				}),
				recipe: fields.text({
					label: "Recipe line (optional)",
					description: "Shown under the 3D cup, e.g. \"Double shot · 150 ml milk\""
				}),
				available: fields.checkbox({
					label: "On the menu",
					description: "Untick to hide without deleting.",
					defaultValue: true
				}),
				order: fields.integer({
					label: "Sort order",
					description: "Lower numbers come first within a tab.",
					defaultValue: 10
				}),
				featured: fields.checkbox({
					label: "Show this drink in the 3D cup first",
					defaultValue: false
				}),
				look: fields.object({
					cup: fields.select({
						label: "Cup",
						defaultValue: "mug",
						options: [
							{
								label: "Mug",
								value: "mug"
							},
							{
								label: "Small chai cup",
								value: "demi"
							},
							{
								label: "Glass (cold drinks)",
								value: "glass"
							}
						]
					}),
					liquid: hexColor("Drink colour", "#A87148"),
					art: fields.select({
						label: "Surface",
						defaultValue: "plain",
						options: [
							{
								label: "Plain",
								value: "plain"
							},
							{
								label: "Crema",
								value: "crema"
							},
							{
								label: "Latte art heart",
								value: "heart"
							},
							{
								label: "Latte art rosetta",
								value: "rosetta"
							},
							{
								label: "Foam with cocoa",
								value: "foam"
							},
							{
								label: "Chocolate drizzle",
								value: "drizzle"
							},
							{
								label: "Matcha heart",
								value: "matcha"
							}
						]
					}),
					fill: fields.number({
						label: "How full (0.5–1)",
						defaultValue: .85,
						step: .01,
						validation: {
							min: .3,
							max: 1
						}
					})
				}, { label: "3D cup appearance" })
			}
		}),
		bakery: collection({
			label: "Snacks",
			slugField: "name",
			path: "src/content/bakery/*",
			format: { data: "json" },
			columns: [
				"category",
				"price",
				"available"
			],
			schema: {
				name: fields.slug({ name: {
					label: "Item name",
					validation: { isRequired: true }
				} }),
				category: fields.text({
					label: "Snack tab",
					defaultValue: "Cookies",
					description: "Items with the same tab name are grouped together, e.g. Cookies, Muffins.",
					validation: { isRequired: true }
				}),
				price: fields.number({
					label: "Price",
					step: .01,
					validation: {
						isRequired: true,
						min: 0
					}
				}),
				description: fields.text({
					label: "Short description",
					multiline: true
				}),
				tags: fields.multiselect({
					label: "Dietary tags",
					options: [
						{
							label: "Vegan",
							value: "vegan"
						},
						{
							label: "Vegetarian",
							value: "vegetarian"
						},
						{
							label: "Gluten-free",
							value: "gluten-free"
						},
						{
							label: "Contains nuts",
							value: "nuts"
						},
						{
							label: "Contains egg",
							value: "egg"
						}
					]
				}),
				shape: fields.select({
					label: "Shape (drawing and 3D model)",
					defaultValue: "cookie",
					options: [{
						label: "Cookie",
						value: "cookie"
					}, {
						label: "Muffin",
						value: "muffin"
					}]
				}),
				tone: hexColor("Colour", "#C68A4C", "Main colour of the drawing and the 3D model, e.g. #6B3A22 for chocolate."),
				topping: fields.select({
					label: "Topping (3D model)",
					defaultValue: "chocolate",
					options: [
						{
							label: "Chocolate chips",
							value: "chocolate"
						},
						{
							label: "Blueberries",
							value: "blueberries"
						},
						{
							label: "Nuts",
							value: "nuts"
						},
						{
							label: "Raisins",
							value: "raisins"
						},
						{
							label: "Seeds (poppy, sesame)",
							value: "seeds"
						},
						{
							label: "Sugar crystals",
							value: "sugar"
						},
						{
							label: "None",
							value: "none"
						}
					]
				}),
				photo: fields.image({
					label: "Photo (optional)",
					description: "A square photo works best. It replaces the drawing.",
					directory: "public/images/bakery",
					publicPath: "/images/bakery/"
				}),
				available: fields.checkbox({
					label: "Available today",
					description: "Untick when sold out or not baked today.",
					defaultValue: true
				}),
				order: fields.integer({
					label: "Sort order",
					description: "Lower numbers come first within a tab.",
					defaultValue: 10
				})
			}
		}),
		origins: collection({
			label: "Chai pantry",
			slugField: "name",
			path: "src/content/origins/*",
			format: { data: "json" },
			columns: ["process", "onBar"],
			schema: {
				name: fields.slug({ name: {
					label: "Ingredient name",
					description: "e.g. Assam · Bold Tea",
					validation: { isRequired: true }
				} }),
				process: fields.text({
					label: "Process",
					description: "Washed, Natural, Honey…"
				}),
				altitude: fields.text({
					label: "Altitude",
					description: "e.g. 2,100 masl"
				}),
				notes: fields.array(fields.text({ label: "Tasting note" }), {
					label: "Tasting notes",
					itemLabel: (p) => p.value
				}),
				roast: fields.integer({
					label: "Intensity (1 light – 5 strong)",
					defaultValue: 3,
					validation: {
						min: 1,
						max: 5
					}
				}),
				use: fields.text({
					label: "Used for",
					description: "e.g. Classic chai, Masala chai"
				}),
				onBar: fields.checkbox({
					label: "On bar now",
					description: "Untick to hide without deleting.",
					defaultValue: true
				}),
				order: fields.integer({
					label: "Sort order",
					defaultValue: 10
				})
			}
		})
	}
});
// src/lib/content.ts
/**
* Reads everything staff edit in the admin (src/content/*) at build time and
* shapes it for the page. Nothing here runs in the browser.
*/
var reader = createReader(process.cwd(), keystatic_config_default);
var DAYS = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday"
];
var DAY_LABELS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];
function required(value, what) {
	if (value == null) throw new Error(`Missing ${what}. Open the admin at /keystatic and save it once.`);
	return value;
}
async function loadSite() {
	const [settings, hoursRaw, home, drinkEntries, originEntries, bakeryEntries] = await Promise.all([
		reader.singletons.settings.read(),
		reader.singletons.hours.read(),
		reader.singletons.homepage.read(),
		reader.collections.drinks.all(),
		reader.collections.origins.all(),
		reader.collections.bakery.all()
	]);
	const s = required(settings, "café details");
	const h = required(hoursRaw, "opening hours");
	const page = required(home, "homepage text");
	const themeKey = s.theme in THEMES ? s.theme : "espresso";
	const drinks = drinkEntries.filter((e) => e.entry.available).sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0) || a.entry.name.localeCompare(b.entry.name)).map(({ slug, entry: e }) => ({
		id: slug,
		name: e.name,
		category: e.category.trim() || "Menu",
		price: e.price,
		description: e.description,
		recipe: e.recipe,
		featured: e.featured,
		look: {
			cup: e.look.cup,
			liquid: /^#[0-9a-f]{6}$/i.test(e.look.liquid) ? e.look.liquid : "#A87148",
			art: e.look.art,
			fill: Math.min(1, Math.max(.3, e.look.fill ?? .85))
		}
	}));
	const categories = [...new Set(drinks.map((d) => d.category))];
	const bakery = bakeryEntries.filter((e) => e.entry.available).sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0) || a.entry.name.localeCompare(b.entry.name)).map(({ slug, entry: e }) => ({
		id: slug,
		name: e.name,
		category: e.category.trim() || "Bakery",
		price: e.price,
		description: e.description,
		tags: e.tags,
		shape: e.shape,
		tone: /^#[0-9a-f]{6}$/i.test(e.tone) ? e.tone : "#C68A4C",
		topping: e.topping,
		photo: e.photo || null
	}));
	const bakeryCategories = [...new Set(bakery.map((b) => b.category))];
	const origins = originEntries.filter((e) => e.entry.onBar).sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0)).map(({ slug, entry: e }) => ({
		id: slug,
		...e,
		roast: Math.min(5, Math.max(1, e.roast ?? 3))
	}));
	const hours = DAYS.map((k, i) => ({
		day: DAY_LABELS[i],
		...h[k]
	}));
	let money;
	try {
		money = new Intl.NumberFormat(s.locale || "en-US", {
			style: "currency",
			currency: s.currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	} catch {
		money = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	}
	const a = s.address;
	const addressLines = [
		a.street,
		[a.area, a.city].filter(Boolean).join(", "),
		[a.region, a.postalCode].filter(Boolean).join(" ")
	].filter(Boolean);
	const mapsUrl = s.mapsUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([
		a.street,
		a.area,
		a.city,
		a.region,
		a.postalCode,
		a.country
	].filter(Boolean).join(", "));
	return {
		settings: s,
		themeKey,
		page,
		drinks,
		categories,
		startDrink: drinks.find((d) => d.featured) ?? drinks[0],
		origins,
		bakery,
		bakeryCategories,
		hours,
		hoursNote: h.note,
		formatPrice: (n) => money.format(n),
		addressLines,
		mapsUrl
	};
}
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
