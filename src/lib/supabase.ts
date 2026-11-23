import postgres from 'postgres';
const url = import.meta.env.SUPABASE_URL?.replace(/\/$/, '');
const anon = import.meta.env.SUPABASE_ANON_KEY;
const service = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const databaseUrl = import.meta.env.DATABASE_URL;
const databasePassword = import.meta.env.SUPABASE_DB_PASSWORD;
const databaseOptions = databasePassword ? { host: import.meta.env.SUPABASE_DB_HOST || 'aws-0-ap-south-1.pooler.supabase.com', port: Number(import.meta.env.SUPABASE_DB_PORT || 5432), database: import.meta.env.SUPABASE_DB_NAME || 'postgres', username: import.meta.env.SUPABASE_DB_USER || 'postgres.ujgxirvujyccdlpqricr', password: databasePassword, ssl: 'require' as const } : null;

export const supabaseConfigured = Boolean(url && anon && service);
export const authConfigured = Boolean(url && anon);
export const publicSupabaseConfigured = Boolean((url && anon) || databaseUrl || databaseOptions);
export const databaseConfigured = Boolean(databaseUrl || databaseOptions);
let sqlClient: ReturnType<typeof postgres> | undefined;
export const sql = () => { if (!databaseUrl && !databaseOptions) throw new SupabaseSetupError(); return sqlClient ||= databaseUrl ? postgres(databaseUrl,{ssl:'require',max:3,idle_timeout:20}) : postgres({...databaseOptions!,max:3,idle_timeout:20}); };

export class SupabaseSetupError extends Error {
  constructor() { super('Supabase is not configured. Add the required server environment variables.'); }
}

type RequestOptions = { method?: string; body?: unknown; token?: string; serviceRole?: boolean; headers?: Record<string, string> };

async function request(path: string, options: RequestOptions = {}) {
  const key = options.serviceRole ? service : anon;
  if (!url || !key) throw new SupabaseSetupError();
  const response = await fetch(`${url}${path}`, {
    method: options.method || 'GET',
    headers: {
      apikey: key,
      Authorization: `Bearer ${options.token || key}`,
      ...(options.body !== undefined ? { 'content-type': 'application/json' } : {}),
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  if (!response.ok) throw new Error(`Supabase request failed (${response.status}): ${await response.text()}`);
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const db = {
  public: (table: string, query = '') => request(`/rest/v1/${table}?${query}`),
  admin: (table: string, query = '', options: RequestOptions = {}) => request(`/rest/v1/${table}?${query}`, { ...options, serviceRole: true, headers: { Prefer: 'return=representation', ...options.headers } }),
};

export type FooterLink = { id?: string; label: string; href: string; link_group: 'quick' | 'social'; is_published?: boolean; sort_order: number };
export type LegalPolicy = { id?: string; slug: string; title: string; content: string; is_published?: boolean; sort_order: number };
export type FooterContent = {
  brand_name: string; tagline: string; phone: string; whatsapp_number: string; instagram_url: string | null; footer_email: string | null;
  footer_location: string; business_hours: string | null; footer_intro: string; footer_logo_url: string | null; quickLinks: FooterLink[]; policies: LegalPolicy[];
};

const footerDefaults: FooterContent = {
  brand_name: 'CHAI RIDES', tagline: 'Ride to Sip', phone: '+91 6302567570', whatsapp_number: '+91 6302567570', instagram_url: null,
  footer_email: null, footer_location: 'Siddipet, Telangana, India', business_hours: null,
  footer_intro: 'Chai Rides is a modern tea café and franchise opportunity rooted in Siddipet, Telangana.', footer_logo_url: null,
  quickLinks: [{ label: 'Home', href: '/', link_group: 'quick', sort_order: 10 }, { label: 'Our Menu', href: '/#menu', link_group: 'quick', sort_order: 20 }, { label: 'Franchise', href: '/franchise', link_group: 'quick', sort_order: 30 }, { label: 'Franchise Packages', href: '/franchise#packages', link_group: 'quick', sort_order: 40 }, { label: 'Franchise Locations', href: '/franchise#locations', link_group: 'quick', sort_order: 50 }, { label: 'Contact Us', href: '/#visit', link_group: 'quick', sort_order: 60 }],
  policies: [
    { slug: 'terms-and-conditions', title: 'Terms & Conditions', content: '[Draft — business owner approval required]\n\nAdd the approved website terms and conditions here.', sort_order: 10 },
    { slug: 'privacy-policy', title: 'Privacy Policy', content: '[Draft — business owner approval required]\n\nAdd the approved privacy-policy wording here.', sort_order: 20 },
    { slug: 'franchise-terms-and-conditions', title: 'Franchise Terms & Conditions', content: '[Draft — business owner approval required]\n\nAdd approved franchise terms here.', sort_order: 30 },
    { slug: 'disclaimer', title: 'Disclaimer', content: '[Draft — business owner approval required]\n\nAdd the approved disclaimer here.', sort_order: 40 },
  ],
};

export async function loadFooterContent(): Promise<FooterContent> {
  if (!publicSupabaseConfigured) return footerDefaults;
  try {
    if ((databaseUrl || databaseOptions) && !(url && anon)) {
      const pg = sql();
      const [settings, quickLinks, policies] = await Promise.all([
        pg`select * from public.site_settings order by updated_at desc limit 1`,
        pg`select * from public.footer_links where is_published=true order by sort_order`,
        pg`select * from public.legal_policies where is_published=true order by sort_order`,
      ]);
      const setting = settings[0] || {};
      return { ...footerDefaults, ...setting, whatsapp_number: setting.whatsapp_number || setting.phone || footerDefaults.whatsapp_number, quickLinks: (quickLinks.length ? quickLinks : footerDefaults.quickLinks) as unknown as FooterLink[], policies: policies as unknown as LegalPolicy[] };
    }
    const [settings, quickLinks, policies] = await Promise.all([
      db.public('site_settings', 'select=*&limit=1'),
      db.public('footer_links', 'select=*&is_published=eq.true&order=sort_order'),
      db.public('legal_policies', 'select=*&is_published=eq.true&order=sort_order'),
    ]);
    const setting = settings[0] || {};
    return { ...footerDefaults, ...setting, whatsapp_number: setting.whatsapp_number || setting.phone || footerDefaults.whatsapp_number, quickLinks: (quickLinks.length ? quickLinks : footerDefaults.quickLinks) as unknown as FooterLink[], policies: policies as unknown as LegalPolicy[] };
  } catch (error) {
    console.warn('Footer content unavailable; using safe defaults.', error);
    return footerDefaults;
  }
}

export async function loadFranchiseContent() {
  if (!publicSupabaseConfigured) return null;
  if ((databaseUrl || databaseOptions) && !(url && anon)) {
    const pg=sql();
    const [packages,items,benefits,faqs,settings,images,locations]=await Promise.all([
      pg`select * from public.franchise_packages where is_active=true order by sort_order`,
      pg`select * from public.franchise_package_items where is_included=true order by sort_order`,
      pg`select * from public.franchise_benefits where is_active=true order by sort_order`,
      pg`select * from public.franchise_faqs where is_published=true order by sort_order`,
      pg`select * from public.site_settings order by updated_at desc limit 1`,
      pg`select * from public.franchise_images where is_published=true order by sort_order`,
      pg`select * from public.franchise_locations where status='active' order by updated_at desc`,
    ]);
    return { packages:packages.map(p=>({...p,franchise_package_items:items.filter(i=>i.package_id===p.id)})), benefits, faqs, settings:settings[0]||null, images, locations };
  }
  const [packages, benefits, faqs, settings, images, locations] = await Promise.all([
    db.public('franchise_packages', 'select=*,franchise_package_items(*)&is_active=eq.true&order=sort_order'),
    db.public('franchise_benefits', 'select=*&is_active=eq.true&order=sort_order'),
    db.public('franchise_faqs', 'select=*&is_published=eq.true&order=sort_order'),
    db.public('site_settings', 'select=*&limit=1'),
    db.public('franchise_images', 'select=*&is_published=eq.true&order=sort_order'),
    db.public('franchise_locations', 'select=*&status=eq.active&order=updated_at.desc'),
  ]);
  return { packages, benefits, faqs, settings: settings[0] || null, images, locations };
}

export async function createEnquiry(input:Record<string,unknown>){
  if(databaseConfigured){const pg=sql();const rows=await pg`insert into public.franchise_enquiries ${pg(input)} returning id`;return rows[0];}
  return (await db.admin('franchise_enquiries','',{method:'POST',body:input}))[0];
}

export async function recentEnquiryCount(sourceIpHash:string){
  if(databaseConfigured){const pg=sql();const [row]=await pg`select count(*)::int as count from public.franchise_enquiries where source_ip_hash=${sourceIpHash} and created_at>=now()-interval '10 minutes'`;return row.count as number;}
  const recent=await db.admin('franchise_enquiries',`select=id&source_ip_hash=eq.${sourceIpHash}&created_at=gte.${encodeURIComponent(new Date(Date.now()-10*60_000).toISOString())}`);return recent.length;
}

export async function listAdminRecords(table:string){
  if(databaseConfigured){const pg=sql();return table==='site_settings'?pg`select * from ${pg(table)} order by updated_at desc`:pg`select * from ${pg(table)} order by created_at desc`;}
  return db.admin(table,'select=*&order=created_at.desc');
}
export async function createAdminRecord(table:string,input:Record<string,unknown>){
  if(databaseConfigured){const pg=sql();return pg`insert into ${pg(table)} ${pg(input)} returning *`;}
  return db.admin(table,'',{method:'POST',body:input});
}
export async function updateAdminRecord(table:string,id:string,input:Record<string,unknown>){
  if(databaseConfigured){const pg=sql();return pg`update ${pg(table)} set ${pg(input)} where id=${id} returning *`;}
  return db.admin(table,`id=eq.${id}`,{method:'PATCH',body:input});
}
export async function deleteAdminRecord(table:string,id:string){
  if(databaseConfigured){const pg=sql();return pg`delete from ${pg(table)} where id=${id} returning *`;}
  return db.admin(table,`id=eq.${id}`,{method:'DELETE'});
}

export async function signIn(email: string, password: string) {
  if (!url || !anon) throw new SupabaseSetupError();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: anon, 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
  if (!response.ok) return null;
  return response.json();
}

export async function verifyUser(token: string) {
  if (!url || !anon || !token) return null;
  const response = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anon, Authorization: `Bearer ${token}` } });
  return response.ok ? response.json() : null;
}

export const storage = {
  upload: async (bucket: string, path: string, file: File) => {
    if (!url || !service) throw new SupabaseSetupError();
    const response = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, { method: 'POST', headers: { apikey: service, Authorization: `Bearer ${service}`, 'content-type': file.type, 'x-upsert': 'true' }, body: file });
    if (!response.ok) throw new Error(await response.text());
    return `${url}/storage/v1/object/public/${bucket}/${path}`;
  },
  remove: (bucket: string, paths: string[]) => request(`/storage/v1/object/${bucket}`, { method: 'DELETE', body: { prefixes: paths }, serviceRole: true }),
};
