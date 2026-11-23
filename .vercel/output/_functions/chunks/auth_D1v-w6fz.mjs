import { h as verifyUser, t as authConfigured } from "./supabase_CQzM9MX_.mjs";
// src/lib/auth.ts
var COOKIE = "chai_admin_session";
var enc = new TextEncoder();
var username = "admin";
var password = "admin@123";
var secret = "41f6be2742d44d09b6f33e160fb1b82f825553cd4e01491491b2a2cc81aa839c";
var fallbackAuthConfigured = Boolean(true);
function equal(a, b) {
	if (a.length !== b.length) return false;
	let d = 0;
	for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return d === 0;
}
async function sign(value) {
	const key = await crypto.subtle.importKey("raw", enc.encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	return [...new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(value)))].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function createFallbackSession() {
	const expiry = String(Date.now() + 288e5);
	return `${expiry}.${await sign(expiry)}`;
}
function credentialsValid(user, pass) {
	return fallbackAuthConfigured && equal(user, username) && equal(pass, password);
}
function sessionCookie(token, maxAge = 28800) {
	return `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}; Secure`;
}
var clearSessionCookie = () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
function sessionToken(request) {
	return decodeURIComponent(request.headers.get("cookie")?.split(";").map((v) => v.trim()).find((v) => v.startsWith(`${COOKIE}=`))?.slice(19) || "");
}
async function fallbackSessionValid(token) {
	if (!fallbackAuthConfigured) return false;
	const [expiry, sig] = token.split(".");
	return Number(expiry) > Date.now() && !!sig && equal(sig, await sign(expiry));
}
async function adminUser(request) {
	const token = sessionToken(request);
	if (authConfigured) {
		const user = await verifyUser(token);
		if (user?.app_metadata?.role === "admin" || user?.user_metadata?.role === "admin") return user;
	}
	return await fallbackSessionValid(token) ? {
		id: "local-admin",
		email: username
	} : null;
}
var isAdmin = async (request) => Boolean(await adminUser(request));
export { isAdmin as a, fallbackAuthConfigured as i, createFallbackSession as n, sessionCookie as o, credentialsValid as r, clearSessionCookie as t };
