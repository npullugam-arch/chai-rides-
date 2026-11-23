import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { i as databaseConfigured, p as supabaseConfigured, r as createEnquiry, u as recentEnquiryCount } from "./supabase_BKWTd6yk.mjs";
// src/pages/api/franchise.ts
var franchise_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var clean = (f, key, max) => String(f.get(key) || "").trim().slice(0, max);
var POST = async ({ request }) => {
	if (!supabaseConfigured && !databaseConfigured) return new Response(null, {
		status: 303,
		headers: { Location: "/franchise?setup=1" }
	});
	const f = await request.formData();
	if (clean(f, "website", 100)) return new Response(null, {
		status: 303,
		headers: { Location: "/franchise?sent=1" }
	});
	const full_name = clean(f, "full_name", 100), mobile = clean(f, "mobile", 20), email = clean(f, "email", 160), city = clean(f, "city", 100), package_id = clean(f, "package_id", 50), preferred_budget = clean(f, "preferred_budget", 60), message = clean(f, "message", 1500);
	if (full_name.length < 2 || !/^[+\d][\d\s-]{7,19}$/.test(mobile) || !city || email && !/^\S+@\S+\.\S+$/.test(email)) return new Response(null, {
		status: 303,
		headers: { Location: "/franchise?error=1" }
	});
	const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
	const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${ip}:${(/* @__PURE__ */ new Date()).toISOString().slice(0, 13)}`));
	const source_ip_hash = [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
	if (await recentEnquiryCount(source_ip_hash) >= 3) return new Response(null, {
		status: 303,
		headers: { Location: "/franchise?rate=1" }
	});
	await createEnquiry({
		full_name,
		mobile,
		email: email || null,
		city,
		package_id: package_id || null,
		preferred_budget: preferred_budget || null,
		message,
		source_ip_hash
	});
	return new Response(null, {
		status: 303,
		headers: { Location: "/franchise?sent=1" }
	});
};
// \0virtual:astro:page:src/pages/api/franchise@_@ts
var page = () => franchise_exports;
export { page };
