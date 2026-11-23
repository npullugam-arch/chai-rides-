import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as isAdmin } from "./auth_D1v-w6fz.mjs";
import { n as removeImage, t as cloudinaryConfigured } from "./cloudinary_lNV0zyrJ.mjs";
import { a as deleteAdminRecord, f as storage, i as databaseConfigured, m as updateAdminRecord, n as createAdminRecord, o as listAdminRecords, p as supabaseConfigured } from "./supabase_CQzM9MX_.mjs";
// src/pages/api/admin/[resource].ts
var _resource__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PATCH: () => PATCH,
	POST: () => POST
});
var tables = {
	packages: "franchise_packages",
	items: "franchise_package_items",
	benefits: "franchise_benefits",
	enquiries: "franchise_enquiries",
	locations: "franchise_locations",
	faqs: "franchise_faqs",
	settings: "site_settings",
	images: "franchise_images"
};
async function handle({ request, params }, method) {
	if (!supabaseConfigured && !databaseConfigured) return Response.json({ error: "Supabase not configured" }, { status: 503 });
	if (!await isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
	const table = tables[params.resource];
	if (!table) return Response.json({ error: "Unknown resource" }, { status: 404 });
	const body = await request.json();
	const id = body.id;
	delete body.id;
	try {
		if (method === "POST") return Response.json(await createAdminRecord(table, body), { status: 201 });
		if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
		if (method === "PATCH") return Response.json(await updateAdminRecord(table, id, body));
		if (method === "DELETE") {
			if (params.resource === "images") {
				const path = (await listAdminRecords(table)).filter((r) => r.id === id)[0]?.storage_path;
				if (path?.startsWith("chai-rides/") && cloudinaryConfigured) await removeImage(path);
				else if (path && supabaseConfigured) await storage.remove("franchise-images", [path]);
			}
			await deleteAdminRecord(table, id);
			return new Response(null, { status: 204 });
		}
		return new Response(null, { status: 405 });
	} catch (e) {
		return Response.json({ error: e instanceof Error ? e.message : "Request failed" }, { status: 400 });
	}
}
var POST = (c) => handle(c, "POST");
var PATCH = (c) => handle(c, "PATCH");
var DELETE = (c) => handle(c, "DELETE");
// \0virtual:astro:page:src/pages/api/admin/[resource]@_@ts
var page = () => _resource__exports;
export { page };
