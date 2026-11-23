import { d as renderTemplate, f as maybeRenderHead, m as addAttribute } from "./server_Djfphud0.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Cgr8Xbyu.mjs";
// src/components/AdminRecordCards.astro
createAstro("http://localhost:4321");
var $$AdminRecordCards = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminRecordCards;
	const { records, resource, fields, searchable = false } = Astro.props;
	const isLong = (f) => f.includes("description") || f.includes("message") || f.includes("notes") || f === "answer" || f === "terms" || f === "address";
	return renderTemplate`${maybeRenderHead($$result)}<div class="record-grid" data-astro-cid-274xo5vi>${records.map((r) => renderTemplate`<article class="cms-panel"${addAttribute(searchable ? fields.map((f) => String(r[f] || "")).join(" ").toLowerCase() : void 0, "data-search")}${addAttribute(r.status, "data-status")} data-astro-cid-274xo5vi><form class="ajax-form cms-form"${addAttribute(resource, "data-resource")}${addAttribute(r.id, "data-id")} data-astro-cid-274xo5vi>${fields.map((f) => typeof r[f] === "boolean" ? renderTemplate`<label data-astro-cid-274xo5vi><input type="checkbox"${addAttribute(f, "name")}${addAttribute(r[f], "checked")} data-astro-cid-274xo5vi>${f.replaceAll("_", " ")}</label>` : isLong(f) ? renderTemplate`<label data-astro-cid-274xo5vi>${f.replaceAll("_", " ")}<textarea${addAttribute(f, "name")} data-astro-cid-274xo5vi>${r[f] ?? ""}</textarea></label>` : f === "status" ? renderTemplate`<label data-astro-cid-274xo5vi>Status<select name="status" data-astro-cid-274xo5vi>${[
		"new",
		"contacted",
		"in_progress",
		"converted",
		"closed",
		"planned",
		"active",
		"inactive"
	].map((s) => renderTemplate`<option${addAttribute(s, "value")}${addAttribute(r[f] === s, "selected")} data-astro-cid-274xo5vi>${s}</option>`)}</select></label>` : renderTemplate`<label data-astro-cid-274xo5vi>${f.replaceAll("_", " ")}<input${addAttribute(f, "name")}${addAttribute(r[f] ?? "", "value")}${addAttribute(f.includes("amount") || f.includes("price") || f === "quantity" || f === "sort_order" ? "number" : "text", "type")} step="0.01" data-astro-cid-274xo5vi></label>`)}<button class="cms-btn" data-astro-cid-274xo5vi>Save changes</button><button class="delete-btn" type="button"${addAttribute(resource, "data-resource")}${addAttribute(r.id, "data-id")} data-astro-cid-274xo5vi>Delete</button></form></article>`)}</div>`;
}, "C:/Users/madur/OneDrive/Desktop/spring_boot/chairidesgroup/ember-and-oak/src/components/AdminRecordCards.astro", void 0);
export { $$AdminRecordCards as t };
