import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as Fragment, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { t as renderScript } from "./script_istBs7Sh.mjs";
import { t as $$SimpleBase } from "./SimpleBase_rYo16bzO.mjs";
import { t as $$Logo } from "./Logo_Ccjrvq56.mjs";
import { t as $$AdminRecordCards } from "./admin-responsive_CGF3jZSI.mjs";
import { a as isAdmin, i as fallbackAuthConfigured } from "./auth_DT6eLQJW.mjs";
import { i as databaseConfigured, o as listAdminRecords, t as authConfigured } from "./supabase_BKWTd6yk.mjs";
// src/components/AdminPageTitle.astro
createAstro("http://localhost:4321");
var $$AdminPageTitle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminPageTitle;
	const { kicker, title } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="cms-heading" data-astro-cid-wotu2tuz><span class="eyebrow" data-astro-cid-wotu2tuz>${kicker}</span><h1 data-astro-cid-wotu2tuz>${title}</h1></div>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/AdminPageTitle.astro", void 0);
// src/pages/admin.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Admin,
	file: () => $$file,
	url: () => $$url
});
createAstro("http://localhost:4321");
var $$Admin = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const backendReady = databaseConfigured && (authConfigured || fallbackAuthConfigured);
	const loggedIn = backendReady && await isAdmin(Astro.request);
	let data = {
		packages: [],
		items: [],
		benefits: [],
		enquiries: [],
		locations: [],
		images: [],
		faqs: [],
		settings: [],
		footer_links: [],
		legal_policies: []
	}, loadError = "";
	if (loggedIn) try {
		const keys = Object.keys(data);
		const rows = await Promise.all([
			"franchise_packages",
			"franchise_package_items",
			"franchise_benefits",
			"franchise_enquiries",
			"franchise_locations",
			"franchise_images",
			"franchise_faqs",
			"site_settings",
			"footer_links",
			"legal_policies"
		].map(listAdminRecords));
		keys.forEach((k, i) => data[k] = rows[i]);
	} catch (e) {
		loadError = e instanceof Error ? e.message : "Could not load admin data.";
	}
	const supabaseConfigured = backendReady;
	const tab = Astro.url.searchParams.get("tab") || "overview", uploadError = Astro.url.searchParams.get("upload_error");
	const recent = data.enquiries.slice(0, 5);
	return renderTemplate`${renderComponent($$result, "SimpleBase", $$SimpleBase, {
		"title": "Admin · Chai Rides",
		"description": "Chai Rides franchise administration",
		"noindex": true,
		"data-astro-cid-hfbr3nnz": true
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="main" class="cms-shell" data-astro-cid-hfbr3nnz><header class="cms-top" data-astro-cid-hfbr3nnz><a href="/" class="cms-brand" data-astro-cid-hfbr3nnz>${renderComponent($$result, "Logo", $$Logo, { "data-astro-cid-hfbr3nnz": true })}<span data-astro-cid-hfbr3nnz>CHAI RIDES</span></a>${loggedIn && renderTemplate`<form method="post" action="/api/admin/logout" data-astro-cid-hfbr3nnz><button data-astro-cid-hfbr3nnz>Logout</button></form>`}</header> ${!supabaseConfigured ? renderTemplate`<section class="login-card" data-astro-cid-hfbr3nnz><span class="eyebrow" data-astro-cid-hfbr3nnz>Setup required</span><h1 data-astro-cid-hfbr3nnz>Connect Supabase</h1><p data-astro-cid-hfbr3nnz>The dashboard is intentionally disabled until valid Supabase credentials are provided. Apply the migration and seed, create an admin user, then add the server environment variables.</p><a class="cms-btn" href="/franchise" data-astro-cid-hfbr3nnz>View setup state</a></section>` : !loggedIn ? renderTemplate`<section class="login-card" data-astro-cid-hfbr3nnz><span class="eyebrow" data-astro-cid-hfbr3nnz>Secure administration</span><h1 data-astro-cid-hfbr3nnz>Admin login</h1>${Astro.url.searchParams.has("error") && renderTemplate`<p class="alert error" data-astro-cid-hfbr3nnz>Incorrect credentials or this user is not assigned the admin role.</p>`}<form class="cms-form" method="post" action="/api/admin/login" data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Email<input type="email" name="email" required autocomplete="username" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Password<input type="password" name="password" required autocomplete="current-password" data-astro-cid-hfbr3nnz></label><button class="cms-btn" type="submit" data-astro-cid-hfbr3nnz>Login securely</button></form></section>` : renderTemplate`<div class="cms-layout" data-astro-cid-hfbr3nnz><nav class="cms-nav" aria-label="Admin sections" data-astro-cid-hfbr3nnz>${[
		["overview", "Overview"],
		["packages", "Packages"],
		["items", "Package items"],
		["benefits", "Benefits & support"],
		["enquiries", "Enquiries"],
		["locations", "Locations"],
		["images", "Images"],
		["settings", "Website settings"],
		["faqs", "FAQs"]
	].map(([id, label]) => renderTemplate`<a${addAttribute(tab === id ? "active" : "", "class")}${addAttribute(`/admin?tab=${id}`, "href")} data-astro-cid-hfbr3nnz>${label}</a>`)}</nav><section class="cms-content" data-astro-cid-hfbr3nnz>${loadError && renderTemplate`<p class="alert error" data-astro-cid-hfbr3nnz>${loadError}</p>`} ${tab === "overview" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="cms-heading" data-astro-cid-hfbr3nnz><span class="eyebrow" data-astro-cid-hfbr3nnz>Dashboard overview</span><h1 data-astro-cid-hfbr3nnz>Franchise management</h1></div><div class="metrics" data-astro-cid-hfbr3nnz><article data-astro-cid-hfbr3nnz><span data-astro-cid-hfbr3nnz>Total enquiries</span><strong data-astro-cid-hfbr3nnz>${data.enquiries.length}</strong></article><article data-astro-cid-hfbr3nnz><span data-astro-cid-hfbr3nnz>Total locations</span><strong data-astro-cid-hfbr3nnz>${data.locations.length}</strong></article><article data-astro-cid-hfbr3nnz><span data-astro-cid-hfbr3nnz>Active packages</span><strong data-astro-cid-hfbr3nnz>${data.packages.filter((p) => p.is_active).length}</strong></article></div><section class="cms-panel" data-astro-cid-hfbr3nnz><h2 data-astro-cid-hfbr3nnz>Recent enquiries</h2><div class="table-scroll" data-astro-cid-hfbr3nnz><table data-astro-cid-hfbr3nnz><thead data-astro-cid-hfbr3nnz><tr data-astro-cid-hfbr3nnz><th data-astro-cid-hfbr3nnz>Name</th><th data-astro-cid-hfbr3nnz>City</th><th data-astro-cid-hfbr3nnz>Mobile</th><th data-astro-cid-hfbr3nnz>Status</th><th data-astro-cid-hfbr3nnz>Received</th></tr></thead><tbody data-astro-cid-hfbr3nnz>${recent.map((e) => renderTemplate`<tr data-astro-cid-hfbr3nnz><td data-astro-cid-hfbr3nnz>${e.full_name}</td><td data-astro-cid-hfbr3nnz>${e.city}</td><td data-astro-cid-hfbr3nnz>${e.mobile}</td><td data-astro-cid-hfbr3nnz>${e.status}</td><td data-astro-cid-hfbr3nnz>${new Date(e.created_at).toLocaleDateString("en-IN")}</td></tr>`)}</tbody></table></div></section>` })}`} ${tab === "packages" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Franchise catalog",
		"title": "Manage packages",
		"data-astro-cid-hfbr3nnz": true
	})}<section class="cms-panel" data-astro-cid-hfbr3nnz><h2 data-astro-cid-hfbr3nnz>Add package</h2><form class="ajax-form cms-form grid" data-resource="packages" data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Name<input name="name" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Slug<input name="slug" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Investment amount<input type="number" name="investment_amount" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Sort order<input type="number" name="sort_order" value="0" data-astro-cid-hfbr3nnz></label><label class="wide" data-astro-cid-hfbr3nnz>Description<textarea name="description" data-astro-cid-hfbr3nnz></textarea></label><label class="wide" data-astro-cid-hfbr3nnz>Promotional offer<textarea name="promotional_offer" data-astro-cid-hfbr3nnz></textarea></label><label class="wide" data-astro-cid-hfbr3nnz>Terms<textarea name="terms" data-astro-cid-hfbr3nnz></textarea></label><label data-astro-cid-hfbr3nnz><input type="checkbox" name="is_active" checked data-astro-cid-hfbr3nnz> Active</label><button class="cms-btn" data-astro-cid-hfbr3nnz>Add package</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": data.packages,
		"resource": "packages",
		"fields": [
			"name",
			"slug",
			"investment_amount",
			"description",
			"promotional_offer",
			"terms",
			"sort_order",
			"is_active"
		],
		"data-astro-cid-hfbr3nnz": true
	})}` })}`} ${tab === "items" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Package contents",
		"title": "Manage package items",
		"data-astro-cid-hfbr3nnz": true
	})}<section class="cms-panel" data-astro-cid-hfbr3nnz><form class="ajax-form cms-form grid" data-resource="items" data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Package<select name="package_id" required data-astro-cid-hfbr3nnz>${data.packages.map((p) => renderTemplate`<option${addAttribute(p.id, "value")} data-astro-cid-hfbr3nnz>${p.name}</option>`)}</select></label><label data-astro-cid-hfbr3nnz>Category<input name="category" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Item name<input name="name" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Quantity<input type="number" step="0.01" name="quantity" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Unit<input name="unit" placeholder="kg, g, packet, piece" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Dimensions<input name="dimensions" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Optional unit price<input type="number" step="0.01" name="unit_price" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Sort order<input type="number" name="sort_order" value="0" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz><input type="checkbox" name="is_included" checked data-astro-cid-hfbr3nnz> Included</label><label data-astro-cid-hfbr3nnz><input type="checkbox" name="needs_confirmation" data-astro-cid-hfbr3nnz> Needs confirmation</label><label class="wide" data-astro-cid-hfbr3nnz>Confirmation note<input name="confirmation_note" data-astro-cid-hfbr3nnz></label><button class="cms-btn" data-astro-cid-hfbr3nnz>Add item</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": data.items,
		"resource": "items",
		"fields": [
			"category",
			"name",
			"quantity",
			"unit",
			"dimensions",
			"unit_price",
			"sort_order",
			"is_included",
			"needs_confirmation",
			"confirmation_note"
		],
		"data-astro-cid-hfbr3nnz": true
	})}` })}`} ${tab === "benefits" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Support details",
		"title": "Manage benefits, training and marketing",
		"data-astro-cid-hfbr3nnz": true
	})}<section class="cms-panel" data-astro-cid-hfbr3nnz><form class="ajax-form cms-form grid" data-resource="benefits" data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Package<select name="package_id" data-astro-cid-hfbr3nnz><option value="" data-astro-cid-hfbr3nnz>All packages</option>${data.packages.map((p) => renderTemplate`<option${addAttribute(p.id, "value")} data-astro-cid-hfbr3nnz>${p.name}</option>`)}</select></label><label data-astro-cid-hfbr3nnz>Type<select name="benefit_type" data-astro-cid-hfbr3nnz><option data-astro-cid-hfbr3nnz>general</option><option data-astro-cid-hfbr3nnz>training</option><option data-astro-cid-hfbr3nnz>marketing</option><option data-astro-cid-hfbr3nnz>promotion</option></select></label><label data-astro-cid-hfbr3nnz>Title<input name="title" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Sort order<input type="number" name="sort_order" value="0" data-astro-cid-hfbr3nnz></label><label class="wide" data-astro-cid-hfbr3nnz>Description<textarea name="description" data-astro-cid-hfbr3nnz></textarea></label><label data-astro-cid-hfbr3nnz><input type="checkbox" name="is_active" checked data-astro-cid-hfbr3nnz> Active</label><button class="cms-btn" data-astro-cid-hfbr3nnz>Add benefit</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": data.benefits,
		"resource": "benefits",
		"fields": [
			"benefit_type",
			"title",
			"description",
			"sort_order",
			"is_active"
		],
		"data-astro-cid-hfbr3nnz": true
	})}` })}`} ${tab === "enquiries" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Leads",
		"title": "Manage enquiries",
		"data-astro-cid-hfbr3nnz": true
	})}<div class="filter-row" data-astro-cid-hfbr3nnz><input id="searchRecords" placeholder="Search name, city or mobile" data-astro-cid-hfbr3nnz><select id="statusFilter" data-astro-cid-hfbr3nnz><option value="" data-astro-cid-hfbr3nnz>All statuses</option><option data-astro-cid-hfbr3nnz>new</option><option data-astro-cid-hfbr3nnz>contacted</option><option data-astro-cid-hfbr3nnz>in_progress</option><option data-astro-cid-hfbr3nnz>converted</option><option data-astro-cid-hfbr3nnz>closed</option></select></div><div id="enquiryRecords" data-astro-cid-hfbr3nnz>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": data.enquiries,
		"resource": "enquiries",
		"searchable": true,
		"fields": [
			"full_name",
			"mobile",
			"email",
			"city",
			"preferred_budget",
			"message",
			"status",
			"internal_notes"
		],
		"data-astro-cid-hfbr3nnz": true
	})}</div>` })}`} ${tab === "locations" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Network",
		"title": "Manage franchise locations",
		"data-astro-cid-hfbr3nnz": true
	})}<section class="cms-panel" data-astro-cid-hfbr3nnz><form class="ajax-form cms-form grid" data-resource="locations" data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Franchise name<input name="franchise_name" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>City<input name="city" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Contact name<input name="contact_name" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Contact phone<input name="contact_phone" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Status<select name="status" data-astro-cid-hfbr3nnz><option data-astro-cid-hfbr3nnz>planned</option><option data-astro-cid-hfbr3nnz>active</option><option data-astro-cid-hfbr3nnz>inactive</option></select></label><label data-astro-cid-hfbr3nnz>Image URL<input name="image_url" data-astro-cid-hfbr3nnz></label><label class="wide" data-astro-cid-hfbr3nnz>Address<textarea name="address" required data-astro-cid-hfbr3nnz></textarea></label><button class="cms-btn" data-astro-cid-hfbr3nnz>Add location</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": data.locations,
		"resource": "locations",
		"fields": [
			"franchise_name",
			"city",
			"address",
			"contact_name",
			"contact_phone",
			"status",
			"image_url"
		],
		"data-astro-cid-hfbr3nnz": true
	})}` })}`} ${tab === "images" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Media library",
		"title": "Manage franchise images",
		"data-astro-cid-hfbr3nnz": true
	})}${uploadError && renderTemplate`<p class="alert error" data-astro-cid-hfbr3nnz>${uploadError === "permission" ? "Cloudinary denied image creation. In Cloudinary Settings → API Keys, assign this key the Media Library User or Master Admin role, then retry." : uploadError === "file" ? "Use a JPG, PNG, WebP or GIF image up to 10 MB." : "Image upload failed. Check the Cloudinary configuration and try again."}</p>`}${Astro.url.searchParams.has("saved") && renderTemplate`<p class="alert success" data-astro-cid-hfbr3nnz>Image uploaded successfully.</p>`}<section class="cms-panel" data-astro-cid-hfbr3nnz><form class="cms-form grid" method="post" action="/api/admin/upload" enctype="multipart/form-data" data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Image<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" required data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Assign to package<select name="package_id" data-astro-cid-hfbr3nnz><option value="" data-astro-cid-hfbr3nnz>General franchise page</option>${data.packages.map((p) => renderTemplate`<option${addAttribute(p.id, "value")} data-astro-cid-hfbr3nnz>${p.name}</option>`)}</select></label><label data-astro-cid-hfbr3nnz>Caption<input name="caption" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Alt text<input name="alt_text" required data-astro-cid-hfbr3nnz></label><button class="cms-btn" data-astro-cid-hfbr3nnz>Upload image</button></form></section><div class="media-grid" data-astro-cid-hfbr3nnz>${data.images.map((i) => renderTemplate`<article class="cms-panel" data-astro-cid-hfbr3nnz><img${addAttribute(i.public_url, "src")}${addAttribute(i.alt_text, "alt")} data-astro-cid-hfbr3nnz><form class="ajax-form cms-form" data-resource="images"${addAttribute(i.id, "data-id")} data-astro-cid-hfbr3nnz><label data-astro-cid-hfbr3nnz>Caption<input name="caption"${addAttribute(i.caption, "value")} data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz>Alt text<input name="alt_text"${addAttribute(i.alt_text, "value")} data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz><input type="checkbox" name="is_published"${addAttribute(i.is_published, "checked")} data-astro-cid-hfbr3nnz> Published</label><button class="cms-btn" data-astro-cid-hfbr3nnz>Save</button><button class="delete-btn" type="button" data-resource="images"${addAttribute(i.id, "data-id")} data-astro-cid-hfbr3nnz>Delete</button></form></article>`)}</div>` })}`} ${tab === "settings" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Website",
		"title": "Edit franchise page settings",
		"data-astro-cid-hfbr3nnz": true
	})}${data.settings.map((s) => renderTemplate`<section class="cms-panel" data-astro-cid-hfbr3nnz><form class="ajax-form cms-form grid" data-resource="settings"${addAttribute(s.id, "data-id")} data-astro-cid-hfbr3nnz>${[
		"brand_name",
		"tagline",
		"location",
		"phone",
		"website_url",
		"hero_heading",
		"about_heading"
	].map((k) => renderTemplate`<label data-astro-cid-hfbr3nnz>${k.replaceAll("_", " ")}<input${addAttribute(k, "name")}${addAttribute(s[k], "value")} data-astro-cid-hfbr3nnz></label>`)}${[
		"whatsapp_message",
		"hero_text",
		"about_content",
		"terms"
	].map((k) => renderTemplate`<label class="wide" data-astro-cid-hfbr3nnz>${k.replaceAll("_", " ")}<textarea${addAttribute(k, "name")} data-astro-cid-hfbr3nnz>${s[k]}</textarea></label>`)}<button class="cms-btn" data-astro-cid-hfbr3nnz>Save settings</button></form></section>`)}` })}`} ${tab === "faqs" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageTitle", $$AdminPageTitle, {
		"kicker": "Help content",
		"title": "Manage FAQs",
		"data-astro-cid-hfbr3nnz": true
	})}<section class="cms-panel" data-astro-cid-hfbr3nnz><form class="ajax-form cms-form grid" data-resource="faqs" data-astro-cid-hfbr3nnz><label class="wide" data-astro-cid-hfbr3nnz>Question<input name="question" required data-astro-cid-hfbr3nnz></label><label class="wide" data-astro-cid-hfbr3nnz>Answer<textarea name="answer" required data-astro-cid-hfbr3nnz></textarea></label><label data-astro-cid-hfbr3nnz>Sort order<input type="number" name="sort_order" value="0" data-astro-cid-hfbr3nnz></label><label data-astro-cid-hfbr3nnz><input type="checkbox" name="is_published" checked data-astro-cid-hfbr3nnz> Published</label><button class="cms-btn" data-astro-cid-hfbr3nnz>Add FAQ</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": data.faqs,
		"resource": "faqs",
		"fields": [
			"question",
			"answer",
			"sort_order",
			"is_published"
		],
		"data-astro-cid-hfbr3nnz": true
	})}` })}`} </section></div>`}</main> <script>document.addEventListener('DOMContentLoaded',()=>{const input=document.querySelector('input[name="email"]');if(input){input.type='text';input.name='identity';input.previousSibling.textContent='Username or email';}});<\/script>${renderScript($$result, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/admin.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/admin.astro", void 0);
var $$file = "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/admin.astro";
var $$url = "/admin";
// \0virtual:astro:page:src/pages/admin@_@astro
var page = () => admin_exports;
export { page };
