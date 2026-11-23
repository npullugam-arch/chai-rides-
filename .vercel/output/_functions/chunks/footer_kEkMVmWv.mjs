import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
import { t as $$SimpleBase } from "./SimpleBase_B7o5Q2WB.mjs";
import { t as $$Logo } from "./Logo_Ccjrvq56.mjs";
import { t as $$AdminRecordCards } from "./admin-responsive_CGF3jZSI.mjs";
import { a as isAdmin, i as fallbackAuthConfigured } from "./auth_DT6eLQJW.mjs";
import { i as databaseConfigured, o as listAdminRecords, t as authConfigured } from "./supabase_BKWTd6yk.mjs";
// src/pages/admin/footer.astro
var footer_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Footer,
	file: () => $$file,
	url: () => $$url
});
createAstro("http://localhost:4321");
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const ready = databaseConfigured && (authConfigured || fallbackAuthConfigured);
	const loggedIn = ready && await isAdmin(Astro.request);
	let settings = [], links = [], policies = [], error = "";
	if (loggedIn) try {
		[settings, links, policies] = await Promise.all([
			"site_settings",
			"footer_links",
			"legal_policies"
		].map(listAdminRecords));
	} catch (e) {
		error = e instanceof Error ? e.message : "Could not load footer data.";
	}
	return renderTemplate`${renderComponent($$result, "SimpleBase", $$SimpleBase, {
		"title": "Footer management · Chai Rides",
		"description": "Manage public footer content",
		"noindex": true
	}, { "default": async ($$result) => renderTemplate` ${maybeRenderHead($$result)}<main id="main" class="cms-shell"> <header class="cms-top"><a href="/" class="cms-brand">${renderComponent($$result, "Logo", $$Logo, {})}<span>CHAI RIDES</span></a><a class="cms-btn" href="/admin">Back to admin</a></header> ${!ready ? renderTemplate`<section class="login-card"><h1>Connect Supabase</h1><p>Footer management requires the configured admin backend.</p></section>` : !loggedIn ? renderTemplate`<section class="login-card"><h1>Admin login required</h1><p>Sign in at the admin dashboard first.</p><a class="cms-btn" href="/admin">Go to admin login</a></section>` : renderTemplate`<section class="cms-content">${error && renderTemplate`<p class="alert error">${error}</p>`} ${settings.map((s) => renderTemplate`<section class="cms-panel"><h1>Footer management</h1><form class="ajax-form cms-form grid" data-resource="settings"${addAttribute(s.id, "data-id")}><label>Business phone<input name="phone"${addAttribute(s.phone || "+91 6302567570", "value")} required></label><label>WhatsApp number<input name="whatsapp_number"${addAttribute(s.whatsapp_number || s.phone || "+91 6302567570", "value")} required></label><label>Instagram URL<input name="instagram_url" type="url"${addAttribute(s.instagram_url || "", "value")}></label><label>Email<input name="footer_email" type="email"${addAttribute(s.footer_email || "", "value")}></label><label>Location<input name="footer_location"${addAttribute(s.footer_location || s.location || "", "value")}></label><label>Business hours<input name="business_hours"${addAttribute(s.business_hours || "", "value")}></label><label class="wide">Footer introduction<textarea name="footer_intro">${s.footer_intro || ""}</textarea></label><label class="wide">Footer logo URL<input name="footer_logo_url" type="url"${addAttribute(s.footer_logo_url || "", "value")}></label><button class="cms-btn">Save footer settings</button></form></section>`)} <section class="cms-panel"><h2>Quick links and social links</h2><form class="ajax-form cms-form grid" data-resource="footer_links"><label>Label<input name="label" required></label><label>URL<input name="href" required></label><label>Group<select name="link_group"><option value="quick">Quick link</option><option value="social">Social link</option></select></label><label>Sort order<input name="sort_order" type="number" value="0"></label><label><input name="is_published" type="checkbox" checked> Published</label><button class="cms-btn">Add link</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": links,
		"resource": "footer_links",
		"fields": [
			"label",
			"href",
			"link_group",
			"sort_order",
			"is_published"
		]
	})} <section class="cms-panel"><h2>Legal policies</h2><form class="ajax-form cms-form grid" data-resource="legal_policies"><label>Slug<input name="slug" required pattern="[a-z0-9-]+"></label><label>Title<input name="title" required></label><label class="wide">Content<textarea name="content" required></textarea></label><label>Sort order<input name="sort_order" type="number" value="0"></label><label><input name="is_published" type="checkbox" checked> Published</label><button class="cms-btn">Add policy</button></form></section>${renderComponent($$result, "RecordCards", $$AdminRecordCards, {
		"records": policies,
		"resource": "legal_policies",
		"fields": [
			"slug",
			"title",
			"content",
			"sort_order",
			"is_published"
		]
	})} </section>`} </main> <script>const value=(el)=>el.type==='checkbox'?el.checked:el.type==='number'?(el.value===''?null:Number(el.value)):el.value||null;document.querySelectorAll('.ajax-form').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();const body={};form.querySelectorAll('[name]').forEach(el=>body[el.name]=value(el));if(form.dataset.id)body.id=form.dataset.id;const r=await fetch(\`/api/admin/\${form.dataset.resource}\`,{method:form.dataset.id?'PATCH':'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});if(r.ok)location.reload();else alert((await r.json()).error||'Save failed')}));document.querySelectorAll('.delete-btn').forEach(b=>b.addEventListener('click',async()=>{if(!confirm('Delete this record?'))return;const r=await fetch(\`/api/admin/\${b.dataset.resource}\`,{method:'DELETE',headers:{'content-type':'application/json'},body:JSON.stringify({id:b.dataset.id})});if(r.ok)location.reload();else alert('Delete failed')}));<\/script> ` })}`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/admin/footer.astro", void 0);
var $$file = "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/pages/admin/footer.astro";
var $$url = "/admin/footer";
// \0virtual:astro:page:src/pages/admin/footer@_@astro
var page = () => footer_exports;
export { page };
