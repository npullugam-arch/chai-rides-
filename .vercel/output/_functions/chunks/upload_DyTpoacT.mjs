import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as isAdmin } from "./auth_DT6eLQJW.mjs";
import { n as removeImage, r as uploadImage, t as cloudinaryConfigured } from "./cloudinary_lNV0zyrJ.mjs";
import { i as databaseConfigured, n as createAdminRecord } from "./supabase_BKWTd6yk.mjs";
// src/pages/api/admin/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	if (!cloudinaryConfigured) return Response.json({ error: "Cloudinary not configured" }, { status: 503 });
	if (!databaseConfigured) return Response.json({ error: "Database not configured" }, { status: 503 });
	if (!await isAdmin(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
	const f = await request.formData(), file = f.get("image");
	if (!(file instanceof File) || ![
		"image/jpeg",
		"image/png",
		"image/webp",
		"image/gif"
	].includes(file.type) || file.size > 10485760) return new Response(null, {
		status: 303,
		headers: { Location: "/admin?tab=images&upload_error=file" }
	});
	try {
		const uploaded = await uploadImage(file);
		try {
			await createAdminRecord("franchise_images", {
				storage_path: uploaded.publicId,
				public_url: uploaded.url,
				caption: String(f.get("caption") || ""),
				alt_text: String(f.get("alt_text") || ""),
				package_id: f.get("package_id") || null
			});
		} catch (error) {
			await removeImage(uploaded.publicId).catch(() => {});
			throw error;
		}
		return new Response(null, {
			status: 303,
			headers: { Location: "/admin?tab=images&saved=1" }
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "";
		const code = /missing permissions|actions=.*create/i.test(message) ? "permission" : "service";
		console.error("Admin image upload failed:", code);
		return new Response(null, {
			status: 303,
			headers: { Location: `/admin?tab=images&upload_error=${code}` }
		});
	}
};
// \0virtual:astro:page:src/pages/api/admin/upload@_@ts
var page = () => upload_exports;
export { page };
