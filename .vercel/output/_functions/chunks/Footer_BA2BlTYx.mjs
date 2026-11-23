import { d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { n as THEMES, t as $$Logo } from "./Logo_Ccjrvq56.mjs";
// src/components/Header.astro
createAstro("http://localhost:4321");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const { name, themeKey, showSwitcher, showHomeBack = false, links = [
		{
			href: "/#beans",
			label: "Beans"
		},
		{
			href: "/#menu",
			label: "Menu"
		},
		{
			href: "/#visit",
			label: "Visit"
		}
	] } = Astro.props;
	const themes = Object.entries(THEMES);
	const franchiseLink = links.find((link) => link.href === "/franchise");
	return renderTemplate`${maybeRenderHead($$result)}<header class="head"> <div class="wrap head-in"> ${showHomeBack && renderTemplate`<a class="home-back" href="/" aria-label="Back to home"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 3.5 6 8l4.5 4.5M6.5 8h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Home</span></a>`} <a class="logo" href="/"${addAttribute(`${name}, home`, "aria-label")}> ${renderComponent($$result, "Logo", $$Logo, {})} <span class="logo-text">${name}</span> </a> <nav class="nav" aria-label="Main"> ${links.map((l) => renderTemplate`<a${addAttribute(l.href === "/franchise" ? "franchise-nav" : void 0, "class")}${addAttribute(l.href, "href")}>${l.label}${l.href === "/franchise" && renderTemplate`<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h7M8 5l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`}</a>`)} </nav> ${franchiseLink && renderTemplate`<a class="mobile-franchise" href="/franchise">Franchise<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h7M8 5l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>`} ${showSwitcher && renderTemplate`<div class="theme-picker" data-theme-picker> <span class="theme-name" id="themeName" aria-live="polite">${THEMES[themeKey].label}</span> <button class="theme-trigger" id="themeTrigger" type="button" aria-label="Choose colour theme" aria-expanded="false" aria-controls="swatches"> <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.2"></circle><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle><circle cx="16" cy="16" r="2.2"></circle></svg> </button> <fieldset class="swatches" id="swatches"> <legend class="sr-only">Colour theme</legend> ${themes.map(([k, t]) => renderTemplate`<label class="sw"${addAttribute(t.label, "title")}> <input type="radio" name="theme"${addAttribute(k, "value")}${addAttribute(k === themeKey, "checked")}${addAttribute(t.label, "data-label")}> <span${addAttribute(`--a:${t.c.paper};--b:${t.d3.cup}`, "style")} aria-hidden="true"></span> <span class="sr-only">${t.label}</span> </label>`)} </fieldset> </div>`} </div> </header>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Header.astro", void 0);
// src/components/Footer.astro
createAstro("http://localhost:4321");
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const { footer } = Astro.props;
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const digits = footer.whatsapp_number.replace(/\D/g, "");
	const logo = footer.footer_logo_url || "https://i.postimg.cc/8k0DBjDc/Chai-Rides-Animated-Logo-Grid.gif";
	const socialLinks = footer.quickLinks.filter((link) => link.link_group === "social");
	return renderTemplate`${maybeRenderHead($$result)}<footer class="site-footer"> <div class="wrap footer-grid"> <section class="footer-brand" aria-label="Chai Rides"> <img class="footer-logo"${addAttribute(logo, "src")}${addAttribute(`${footer.brand_name} logo`, "alt")} width="112" height="112" loading="lazy" decoding="async"> <div><strong>${footer.brand_name}</strong><span>${footer.tagline}</span></div> <p>${footer.footer_intro}</p> </section> <section class="footer-column"> <h2>Quick links</h2> <nav aria-label="Footer navigation"><ul>${footer.quickLinks.filter((link) => link.link_group === "quick").map((link) => renderTemplate`<li><a${addAttribute(link.href, "href")}>${link.label}</a></li>`)}</ul></nav> </section> <section class="footer-column"> <h2>Legal & policies</h2> <nav aria-label="Legal policies"><ul>${footer.policies.map((policy) => renderTemplate`<li><a${addAttribute(`/legal/${policy.slug}`, "href")}>${policy.title}</a></li>`)}</ul></nav> </section> <section class="footer-column footer-contact"> <h2>Contact</h2> <ul> <li><a${addAttribute(`https://wa.me/${digits}`, "href")} target="_blank" rel="noopener"><span aria-hidden="true">◉</span> WhatsApp</a></li> <li><a${addAttribute(`tel:${footer.phone.replace(/\s/g, "")}`, "href")}><span aria-hidden="true">◌</span> ${footer.phone}</a></li> ${footer.footer_email && renderTemplate`<li><a${addAttribute(`mailto:${footer.footer_email}`, "href")}><span aria-hidden="true">✉</span> ${footer.footer_email}</a></li>`} ${footer.instagram_url && renderTemplate`<li><a${addAttribute(footer.instagram_url, "href")} target="_blank" rel="noopener"><span aria-hidden="true">◎</span> Instagram</a></li>`} ${socialLinks.map((link) => renderTemplate`<li><a${addAttribute(link.href, "href")} target="_blank" rel="noopener">${link.label}</a></li>`)} </ul> <address>${footer.footer_location}</address> ${footer.business_hours && renderTemplate`<p class="footer-hours">${footer.business_hours}</p>`} </section> </div> <div class="wrap footer-bottom"> <span>© ${year} Chai Rides. All rights reserved.</span> <a class="developer-credit" href="https://nandakishore.info/" target="_blank" rel="noopener noreferrer" title="Visit Developer Portfolio" aria-label="Developed by Nandakishore — Visit Developer Portfolio"> <span>Developed by <strong>Nandakishore</strong></span> <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> </a> </div> </footer>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/Footer.astro", void 0);
export { $$Header as n, $$Footer as t };
