import postgres from "postgres";
// src/lib/supabase.ts
var url = "https://ujgxirvujyccdlpqricr.supabase.co".replace(/\/$/, "");
var anon = "";
var service = "";
var databaseOptions = {
	host: "aws-0-ap-south-1.pooler.supabase.com",
	port: 5432,
	database: "postgres",
	username: "postgres.ujgxirvujyccdlpqricr",
	password: "Nandu@Minnu",
	ssl: "require"
};
var supabaseConfigured = Boolean(url && anon);
var authConfigured = Boolean(url && anon);
var publicSupabaseConfigured = Boolean(databaseOptions);
var databaseConfigured = Boolean(databaseOptions);
var sqlClient;
var sql = () => {
	if (!databaseOptions) throw new SupabaseSetupError();
	return sqlClient ||= postgres({
		...databaseOptions,
		max: 3,
		idle_timeout: 20
	});
};
var SupabaseSetupError = class extends Error {
	constructor() {
		super("Supabase is not configured. Add the required server environment variables.");
	}
};
async function request(path, options = {}) {
	const key = options.serviceRole ? service : anon;
	if (!url || !key) throw new SupabaseSetupError();
	const response = await fetch(`${url}${path}`, {
		method: options.method || "GET",
		headers: {
			apikey: key,
			Authorization: `Bearer ${options.token || key}`,
			...options.body !== void 0 ? { "content-type": "application/json" } : {},
			...options.headers
		},
		body: options.body === void 0 ? void 0 : JSON.stringify(options.body)
	});
	if (!response.ok) throw new Error(`Supabase request failed (${response.status}): ${await response.text()}`);
	if (response.status === 204) return null;
	const text = await response.text();
	return text ? JSON.parse(text) : null;
}
var db = {
	public: (table, query = "") => request(`/rest/v1/${table}?${query}`),
	admin: (table, query = "", options = {}) => request(`/rest/v1/${table}?${query}`, {
		...options,
		serviceRole: true,
		headers: {
			Prefer: "return=representation",
			...options.headers
		}
	})
};
var footerDefaults = {
	brand_name: "CHAI RIDES",
	tagline: "Ride to Sip",
	phone: "+91 6302567570",
	whatsapp_number: "+91 6302567570",
	instagram_url: null,
	footer_email: null,
	footer_location: "Siddipet, Telangana, India",
	business_hours: null,
	footer_intro: "Chai Rides is a modern tea café and franchise opportunity rooted in Siddipet, Telangana.",
	footer_logo_url: null,
	quickLinks: [
		{
			label: "Home",
			href: "/",
			link_group: "quick",
			sort_order: 10
		},
		{
			label: "Our Menu",
			href: "/#menu",
			link_group: "quick",
			sort_order: 20
		},
		{
			label: "Franchise",
			href: "/franchise",
			link_group: "quick",
			sort_order: 30
		},
		{
			label: "Franchise Packages",
			href: "/franchise#packages",
			link_group: "quick",
			sort_order: 40
		},
		{
			label: "Franchise Locations",
			href: "/franchise#locations",
			link_group: "quick",
			sort_order: 50
		},
		{
			label: "Contact Us",
			href: "/#visit",
			link_group: "quick",
			sort_order: 60
		}
	],
	policies: [
		{
			slug: "terms-and-conditions",
			title: "Terms & Conditions",
			content: "[Draft — business owner approval required]\n\nAdd the approved website terms and conditions here.",
			sort_order: 10
		},
		{
			slug: "privacy-policy",
			title: "Privacy Policy",
			content: "[Draft — business owner approval required]\n\nAdd the approved privacy-policy wording here.",
			sort_order: 20
		},
		{
			slug: "franchise-terms-and-conditions",
			title: "Franchise Terms & Conditions",
			content: "[Draft — business owner approval required]\n\nAdd approved franchise terms here.",
			sort_order: 30
		},
		{
			slug: "disclaimer",
			title: "Disclaimer",
			content: "[Draft — business owner approval required]\n\nAdd the approved disclaimer here.",
			sort_order: 40
		}
	]
};
async function loadFooterContent() {
	if (!publicSupabaseConfigured) return footerDefaults;
	try {
		if (databaseOptions && true) {
			const pg = sql();
			const [settings, quickLinks, policies] = await Promise.all([
				pg`select * from public.site_settings order by updated_at desc limit 1`,
				pg`select * from public.footer_links where is_published=true order by sort_order`,
				pg`select * from public.legal_policies where is_published=true order by sort_order`
			]);
			const setting = settings[0] || {};
			return {
				...footerDefaults,
				...setting,
				whatsapp_number: setting.whatsapp_number || setting.phone || footerDefaults.whatsapp_number,
				quickLinks: quickLinks.length ? quickLinks : footerDefaults.quickLinks,
				policies
			};
		}
		const [settings, quickLinks, policies] = await Promise.all([
			db.public("site_settings", "select=*&limit=1"),
			db.public("footer_links", "select=*&is_published=eq.true&order=sort_order"),
			db.public("legal_policies", "select=*&is_published=eq.true&order=sort_order")
		]);
		const setting = settings[0] || {};
		return {
			...footerDefaults,
			...setting,
			whatsapp_number: setting.whatsapp_number || setting.phone || footerDefaults.whatsapp_number,
			quickLinks: quickLinks.length ? quickLinks : footerDefaults.quickLinks,
			policies
		};
	} catch (error) {
		console.warn("Footer content unavailable; using safe defaults.", error);
		return footerDefaults;
	}
}
async function loadFranchiseContent() {
	if (!publicSupabaseConfigured) return null;
	if (databaseOptions && true) {
		const pg = sql();
		const [packages, items, benefits, faqs, settings, images, locations] = await Promise.all([
			pg`select * from public.franchise_packages where is_active=true order by sort_order`,
			pg`select * from public.franchise_package_items where is_included=true order by sort_order`,
			pg`select * from public.franchise_benefits where is_active=true order by sort_order`,
			pg`select * from public.franchise_faqs where is_published=true order by sort_order`,
			pg`select * from public.site_settings order by updated_at desc limit 1`,
			pg`select * from public.franchise_images where is_published=true order by sort_order`,
			pg`select * from public.franchise_locations where status='active' order by updated_at desc`
		]);
		return {
			packages: packages.map((p) => ({
				...p,
				franchise_package_items: items.filter((i) => i.package_id === p.id)
			})),
			benefits,
			faqs,
			settings: settings[0] || null,
			images,
			locations
		};
	}
	const [packages, benefits, faqs, settings, images, locations] = await Promise.all([
		db.public("franchise_packages", "select=*,franchise_package_items(*)&is_active=eq.true&order=sort_order"),
		db.public("franchise_benefits", "select=*&is_active=eq.true&order=sort_order"),
		db.public("franchise_faqs", "select=*&is_published=eq.true&order=sort_order"),
		db.public("site_settings", "select=*&limit=1"),
		db.public("franchise_images", "select=*&is_published=eq.true&order=sort_order"),
		db.public("franchise_locations", "select=*&status=eq.active&order=updated_at.desc")
	]);
	return {
		packages,
		benefits,
		faqs,
		settings: settings[0] || null,
		images,
		locations
	};
}
async function createEnquiry(input) {
	if (databaseConfigured) {
		const pg = sql();
		return (await pg`insert into public.franchise_enquiries ${pg(input)} returning id`)[0];
	}
	return (await db.admin("franchise_enquiries", "", {
		method: "POST",
		body: input
	}))[0];
}
async function recentEnquiryCount(sourceIpHash) {
	if (databaseConfigured) {
		const [row] = await sql()`select count(*)::int as count from public.franchise_enquiries where source_ip_hash=${sourceIpHash} and created_at>=now()-interval '10 minutes'`;
		return row.count;
	}
	return (await db.admin("franchise_enquiries", `select=id&source_ip_hash=eq.${sourceIpHash}&created_at=gte.${encodeURIComponent((/* @__PURE__ */ new Date(Date.now() - 6e5)).toISOString())}`)).length;
}
async function listAdminRecords(table) {
	if (databaseConfigured) {
		const pg = sql();
		return table === "site_settings" ? pg`select * from ${pg(table)} order by updated_at desc` : pg`select * from ${pg(table)} order by created_at desc`;
	}
	return db.admin(table, "select=*&order=created_at.desc");
}
async function createAdminRecord(table, input) {
	if (databaseConfigured) {
		const pg = sql();
		return pg`insert into ${pg(table)} ${pg(input)} returning *`;
	}
	return db.admin(table, "", {
		method: "POST",
		body: input
	});
}
async function updateAdminRecord(table, id, input) {
	if (databaseConfigured) {
		const pg = sql();
		return pg`update ${pg(table)} set ${pg(input)} where id=${id} returning *`;
	}
	return db.admin(table, `id=eq.${id}`, {
		method: "PATCH",
		body: input
	});
}
async function deleteAdminRecord(table, id) {
	if (databaseConfigured) {
		const pg = sql();
		return pg`delete from ${pg(table)} where id=${id} returning *`;
	}
	return db.admin(table, `id=eq.${id}`, { method: "DELETE" });
}
async function signIn(email, password) {
	throw new SupabaseSetupError();
}
async function verifyUser(token) {
	return null;
}
var storage = {
	upload: async (bucket, path, file) => {
		throw new SupabaseSetupError();
	},
	remove: (bucket, paths) => request(`/storage/v1/object/${bucket}`, {
		method: "DELETE",
		body: { prefixes: paths },
		serviceRole: true
	})
};
export { deleteAdminRecord as a, loadFranchiseContent as c, signIn as d, storage as f, verifyUser as h, databaseConfigured as i, publicSupabaseConfigured as l, updateAdminRecord as m, createAdminRecord as n, listAdminRecords as o, supabaseConfigured as p, createEnquiry as r, loadFooterContent as s, authConfigured as t, recentEnquiryCount as u };
