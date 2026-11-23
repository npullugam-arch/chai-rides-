import { authConfigured, verifyUser } from './supabase';
const COOKIE='chai_admin_session',enc=new TextEncoder();
const username=import.meta.env.ADMIN_USERNAME,password=import.meta.env.ADMIN_PASSWORD,secret=import.meta.env.SESSION_SECRET;
export const fallbackAuthConfigured=Boolean(username&&password&&secret&&secret.length>=32);
function equal(a:string,b:string){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0}
async function sign(value:string){const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return [...new Uint8Array(await crypto.subtle.sign('HMAC',key,enc.encode(value)))].map(b=>b.toString(16).padStart(2,'0')).join('')}
export async function createFallbackSession(){const expiry=String(Date.now()+8*60*60*1000);return `${expiry}.${await sign(expiry)}`}
export function credentialsValid(user:string,pass:string){return fallbackAuthConfigured&&equal(user,username)&&equal(pass,password)}
export function sessionCookie(token:string,maxAge=28800){return `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${import.meta.env.PROD?'; Secure':''}`}
export const clearSessionCookie=()=>`${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
export function sessionToken(request:Request){return decodeURIComponent(request.headers.get('cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length+1)||'')}
async function fallbackSessionValid(token:string){if(!fallbackAuthConfigured)return false;const [expiry,sig]=token.split('.');return Number(expiry)>Date.now()&&!!sig&&equal(sig,await sign(expiry))}
export async function adminUser(request:Request){const token=sessionToken(request);if(authConfigured){const user=await verifyUser(token);if(user?.app_metadata?.role==='admin'||user?.user_metadata?.role==='admin')return user}return await fallbackSessionValid(token)?{id:'local-admin',email:username}:null}
export const isAdmin=async(request:Request)=>Boolean(await adminUser(request));
