-- Editable public footer data. This migration is additive and preserves all existing content.
alter table public.site_settings
  add column if not exists whatsapp_number text not null default '+91 6302567570',
  add column if not exists instagram_url text,
  add column if not exists footer_email text,
  add column if not exists footer_location text not null default 'Siddipet, Telangana, India',
  add column if not exists business_hours text,
  add column if not exists footer_intro text not null default 'Chai Rides is a modern tea café and franchise opportunity rooted in Siddipet, Telangana.',
  add column if not exists footer_logo_url text;

update public.site_settings
set whatsapp_number = phone
where whatsapp_number is null or whatsapp_number = '';

create table if not exists public.footer_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  link_group text not null default 'quick' check(link_group in ('quick','social')),
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_policies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check(slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  content text not null default '',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_footer_links_group_sort on public.footer_links(link_group, sort_order);
create index if not exists idx_legal_policies_sort on public.legal_policies(sort_order);

drop trigger if exists set_updated_at on public.footer_links;
create trigger set_updated_at before update on public.footer_links for each row execute function public.set_updated_at();
drop trigger if exists set_updated_at on public.legal_policies;
create trigger set_updated_at before update on public.legal_policies for each row execute function public.set_updated_at();

alter table public.footer_links enable row level security;
alter table public.legal_policies enable row level security;
create policy "public published footer links" on public.footer_links for select using(is_published);
create policy "public published legal policies" on public.legal_policies for select using(is_published);

insert into public.footer_links(label, href, link_group, sort_order) values
  ('Home', '/', 'quick', 10),
  ('Our Menu', '/#menu', 'quick', 20),
  ('Franchise', '/franchise', 'quick', 30),
  ('Franchise Packages', '/franchise#packages', 'quick', 40),
  ('Franchise Locations', '/franchise#locations', 'quick', 50),
  ('Contact Us', '/#visit', 'quick', 60)
on conflict do nothing;

insert into public.legal_policies(slug, title, content, sort_order) values
  ('terms-and-conditions', 'Terms & Conditions', '[Draft — business owner approval required]\n\nAdd the approved website terms and conditions here. Do not publish final legal wording without review.' , 10),
  ('privacy-policy', 'Privacy Policy', '[Draft — business owner approval required]\n\nAdd the approved privacy-policy wording here, including how enquiries and contact information are handled.', 20),
  ('franchise-terms-and-conditions', 'Franchise Terms & Conditions', '[Draft — business owner approval required]\n\nAdd approved franchise terms here. Franchise availability, investment, returns and outcomes must be confirmed only in a written agreement.', 30),
  ('disclaimer', 'Disclaimer', '[Draft — business owner approval required]\n\nAdd the approved disclaimer here. Promotional content must not be read as a guarantee of revenue, returns, success or availability.', 40),
  ('refund-cancellation-policy', 'Refund / Cancellation Policy', '[Draft — include only if applicable]\n\nAdd an owner-approved policy if refunds or cancellations are offered. Otherwise unpublish or remove this page.', 50)
on conflict (slug) do nothing;
