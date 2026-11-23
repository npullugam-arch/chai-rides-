import { createHash } from "node:crypto";
// src/lib/cloudinary.ts
var cloudName = "dfkwmid4g";
var apiKey = "437126799476471";
var apiSecret = "kDJb-IXjL_bOQx6ihhbQj3NVbV0";
var cloudinaryConfigured = Boolean(apiSecret);
function signature(params) {
	const value = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([key, val]) => `${key}=${val}`).join("&");
	return createHash("sha1").update(`${value}${apiSecret}`).digest("hex");
}
async function uploadImage(file) {
	if (!cloudinaryConfigured) throw new Error("Cloudinary is not configured.");
	const timestamp = Math.floor(Date.now() / 1e3), folder = "chai-rides/franchise", form = new FormData();
	form.set("file", file);
	form.set("api_key", apiKey);
	form.set("timestamp", String(timestamp));
	form.set("folder", folder);
	form.set("signature", signature({
		folder,
		timestamp
	}));
	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: "POST",
		body: form
	});
	if (!response.ok) throw new Error(`Cloudinary upload failed: ${await response.text()}`);
	const result = await response.json();
	return {
		publicId: String(result.public_id),
		url: String(result.secure_url)
	};
}
async function removeImage(publicId) {
	if (!cloudinaryConfigured) throw new Error("Cloudinary is not configured.");
	const timestamp = Math.floor(Date.now() / 1e3), form = new FormData();
	form.set("public_id", publicId);
	form.set("api_key", apiKey);
	form.set("timestamp", String(timestamp));
	form.set("signature", signature({
		public_id: publicId,
		timestamp
	}));
	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
		method: "POST",
		body: form
	});
	if (!response.ok) throw new Error(`Cloudinary delete failed: ${await response.text()}`);
}
export { removeImage as n, uploadImage as r, cloudinaryConfigured as t };
