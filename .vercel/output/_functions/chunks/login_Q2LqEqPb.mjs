import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { i as fallbackAuthConfigured, n as createFallbackSession, o as sessionCookie, r as credentialsValid } from "./auth_DT6eLQJW.mjs";
import { d as signIn, t as authConfigured } from "./supabase_BKWTd6yk.mjs";
// src/pages/api/admin/login.ts
var login_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	const form = await request.formData();
	const identity = String(form.get("identity") || form.get("email") || ""), pass = String(form.get("password") || "");
	if (authConfigured) {
		const result = await signIn(identity, pass);
		if (result?.access_token) return new Response(null, {
			status: 303,
			headers: {
				Location: "/admin",
				"Set-Cookie": sessionCookie(result.access_token, result.expires_in || 3600)
			}
		});
	}
	if (fallbackAuthConfigured && credentialsValid(identity, pass)) return new Response(null, {
		status: 303,
		headers: {
			Location: "/admin",
			"Set-Cookie": sessionCookie(await createFallbackSession())
		}
	});
	return new Response(null, {
		status: 303,
		headers: { Location: "/admin?error=1" }
	});
};
// \0virtual:astro:page:src/pages/api/admin/login@_@ts
var page = () => login_exports;
export { page };
