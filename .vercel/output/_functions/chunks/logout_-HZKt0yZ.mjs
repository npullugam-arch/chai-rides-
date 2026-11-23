import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { t as clearSessionCookie } from "./auth_D1v-w6fz.mjs";
// src/pages/api/admin/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async () => new Response(null, {
	status: 303,
	headers: {
		Location: "/admin",
		"Set-Cookie": clearSessionCookie()
	}
});
// \0virtual:astro:page:src/pages/api/admin/logout@_@ts
var page = () => logout_exports;
export { page };
