alter table public.site_settings add column if not exists website_url text not null default 'https://chairidesgroup.in';
update public.site_settings set website_url='https://chairidesgroup.in' where website_url is null or website_url='';

insert into public.franchise_benefits(package_id,benefit_type,title,description,sort_order)
select p.id,v.kind,v.title,v.description,v.sort_order
from public.franchise_packages p
join (values
('classic-franchise','general','100% business support','Promotional poster claim describing the scope of business support; it is not a guarantee of commercial results.',60),
('classic-franchise','promotion','Low investment / high returns','Promotional wording only. Returns are not guaranteed and depend on location, demand and operations.',70),
('classic-franchise','training','Recipe mastery','Guidance on the core Chai Rides recipes included in training.',80),
('classic-franchise','training','Operational guidance','Practical guidance for day-to-day outlet operations.',90),
('classic-franchise','training','Customer service','Service guidance for a consistent guest experience.',100),
('classic-franchise','training','Business management','Introductory guidance for managing the outlet.',110),
('classic-franchise','marketing','Social media page setup','Initial social media page setup support.',120),
('classic-franchise','marketing','Branding and optimization','Guidance for consistent profile branding and optimization.',130),
('classic-franchise','marketing','Content strategy','Support for planning suitable social content.',140),
('classic-franchise','marketing','Regular posts and support','Ongoing posting support as described in the supplied promotion.',150),
('classic-franchise','marketing','Growth and engagement support','Guidance intended to support audience growth and engagement; results are not guaranteed.',160),
('special-offer-franchise','promotion','Low investment / high returns','Promotional wording only. Returns are not guaranteed and depend on location, demand and operations.',60),
('special-offer-franchise','promotion','100% success','Poster wording only. Chai Rides does not guarantee success, revenue, profit or returns.',70)
) v(slug,kind,title,description,sort_order) on p.slug=v.slug
where not exists(select 1 from public.franchise_benefits b where b.package_id=p.id and b.title=v.title);
