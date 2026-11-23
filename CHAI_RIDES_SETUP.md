# CHAI RIDES franchise system setup

The franchise website and admin CMS use Supabase PostgreSQL, Auth and Storage. The application does not claim a connection until real credentials are supplied and an actual request succeeds.

## Supabase

1. Create a Supabase project.
2. Run the SQL files in `supabase/migrations/` in filename order.
3. Run `supabase/seed.sql` after the first migration; the completion migration safely adds the final editable website field and qualified promotional/support records.
4. Create the business owner's email/password user in Authentication.
5. Assign the user an admin role (replace the UUID):

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where id = 'ADMIN_USER_UUID';
```

6. Copy `.env.example` to `.env` and add the pooled PostgreSQL URL, project URL, anon key and service-role key. The local database URL is already configured and has passed a read/write test; the two API keys are still required for Auth and Storage.
7. Never expose or commit the service-role key. Add the same values as encrypted Vercel environment variables before deployment.

RLS permits public reads of active/published franchise content only. Enquiries and all mutations pass through server endpoints. Private enquiry rows have no public select policy.

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:4321/franchise` and `http://localhost:4321/admin`.

## Poster verification

The three promotional poster files were not present in the received attachment directory. Seed rows identified as unclear in the supplied transcription are marked `needs_confirmation` and displayed as “Needs Admin Confirmation.” Upload the poster images through the admin media library after Supabase is connected.

## Vercel

The project uses the official Astro Vercel adapter and server-rendered franchise/admin routes. No deployment is included.
