import { loadEnv } from 'vite';
import postgres from 'postgres';
const env=loadEnv('development',process.cwd(),'');
if(!env.SUPABASE_DB_PASSWORD&&!env.DATABASE_URL) throw new Error('SUPABASE_DB_PASSWORD is missing.');
const connection=env.DATABASE_URL||{host:env.SUPABASE_DB_HOST||'aws-0-ap-south-1.pooler.supabase.com',port:Number(env.SUPABASE_DB_PORT||5432),database:env.SUPABASE_DB_NAME||'postgres',username:env.SUPABASE_DB_USER||'postgres.ujgxirvujyccdlpqricr',password:env.SUPABASE_DB_PASSWORD,ssl:'require'};
const sql=typeof connection==='string'?postgres(connection,{ssl:'require',max:1,connect_timeout:10}):postgres({...connection,max:1,connect_timeout:10});
try{const [row]=await sql`select current_database() as database, current_user as user, now() as checked_at`;console.log(`Supabase PostgreSQL connection succeeded for database "${row.database}" as "${row.user}".`)}finally{await sql.end()}
