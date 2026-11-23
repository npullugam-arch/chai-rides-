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
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 9e3);
	const response = await fetch(`${url}${path}`, {
		method: options.method || "GET",
		headers: {
			apikey: key,
			Authorization: `Bearer ${options.token || key}`,
			...options.body !== void 0 ? { "content-type": "application/json" } : {},
			...options.headers
		},
		body: options.body === void 0 ? void 0 : JSON.stringify(options.body),
		signal: controller.signal
	});
	clearTimeout(timeout);
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
	return footerDefaults;
}
async function loadFranchiseContent() {
	return null;
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
