import { loadEnv } from 'vite';
import postgres from 'postgres';
import { readFile } from 'node:fs/promises';

const env=loadEnv('development',process.cwd(),'');
if(!env.SUPABASE_DB_PASSWORD&&!env.DATABASE_URL) throw new Error('Supabase database password is missing.');
const connection=env.DATABASE_URL||{
  host:env.SUPABASE_DB_HOST||'aws-0-ap-south-1.pooler.supabase.com',
  port:Number(env.SUPABASE_DB_PORT||5432), database:env.SUPABASE_DB_NAME||'postgres',
  username:env.SUPABASE_DB_USER||'postgres.ujgxirvujyccdlpqricr',
  password:env.SUPABASE_DB_PASSWORD, ssl:'require'
};
const sql=typeof connection==='string'?postgres(connection,{ssl:'require',max:1}):postgres({...connection,max:1});
try {
  await sql.unsafe(await readFile(new URL('../supabase/migrations/202611230001_part3_franchise_fixes.sql',import.meta.url),'utf8'));
  const rows=await sql`
    select p.slug,i.name,i.quantity,i.unit,i.dimensions,i.is_included
    from public.franchise_packages p join public.franchise_package_items i on i.package_id=p.id
    where lower(i.name) in ('chairs','32-inch led tv','fridge','additional gas stove','high-pressure gas stove')
    order by p.sort_order,i.sort_order`;
  rows.forEach(row=>console.log(`${row.slug}: ${row.name} = ${row.quantity} ${row.unit||''} ${row.dimensions||''} included=${row.is_included}`));
  const packages=await sql`select slug,investment_amount from public.franchise_packages order by sort_order`;
  packages.forEach(row=>console.log(`${row.slug}: investment=${row.investment_amount}`));
  const locations=await sql`select franchise_name,city,status from public.franchise_locations order by created_at`;
  console.log(`locations: ${locations.length} total; ${locations.filter(row=>row.status==='active').length} active`);
  locations.forEach(row=>console.log(`location: ${row.franchise_name}, ${row.city}, status=${row.status}`));
} finally { await sql.end(); }
