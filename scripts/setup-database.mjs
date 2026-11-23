import { loadEnv } from 'vite';
import postgres from 'postgres';
import { readFile } from 'node:fs/promises';
const env=loadEnv('development',process.cwd(),'');
if(!env.SUPABASE_DB_PASSWORD&&!env.DATABASE_URL) throw new Error('SUPABASE_DB_PASSWORD is missing.');
const connection=env.DATABASE_URL||{host:env.SUPABASE_DB_HOST||'aws-0-ap-south-1.pooler.supabase.com',port:Number(env.SUPABASE_DB_PORT||5432),database:env.SUPABASE_DB_NAME||'postgres',username:env.SUPABASE_DB_USER||'postgres.ujgxirvujyccdlpqricr',password:env.SUPABASE_DB_PASSWORD,ssl:'require'};
const sql=typeof connection==='string'?postgres(connection,{ssl:'require',max:1,connect_timeout:15}):postgres({...connection,max:1,connect_timeout:15});
try{await sql.unsafe(await readFile(new URL('../supabase/migrations/202611220001_franchise_system.sql',import.meta.url),'utf8'));await sql.unsafe(await readFile(new URL('../supabase/seed.sql',import.meta.url),'utf8'));const [{count}]=await sql`select count(*)::int as count from public.franchise_packages`;console.log(`Supabase schema and seed completed. Active package records: ${count}.`)}finally{await sql.end()}
