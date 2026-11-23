-- Part 3 client corrections. Preserve historical rows and disable superseded inclusions.
update public.franchise_packages
set investment_amount=120000, updated_at=now()
where slug='classic-franchise';

update public.franchise_packages
set investment_amount=150000, updated_at=now()
where slug='standard-franchise';

update public.franchise_package_items i
set is_included=false,
    confirmation_note='Excluded from the Classic Franchise by the latest client specification.',
    updated_at=now()
from public.franchise_packages p
where i.package_id=p.id
  and p.slug='classic-franchise'
  and lower(i.name) in ('chairs','32-inch led tv','additional gas stove');

update public.franchise_package_items i
set quantity=8, unit='pieces', is_included=true, needs_confirmation=false,
    confirmation_note=null, updated_at=now()
from public.franchise_packages p
where i.package_id=p.id and p.slug='standard-franchise' and lower(i.name)='chairs';

update public.franchise_package_items i
set quantity=1, unit='unit', dimensions='32 inch', is_included=true,
    needs_confirmation=false, confirmation_note=null, updated_at=now()
from public.franchise_packages p
where i.package_id=p.id and p.slug='standard-franchise' and lower(i.name)='32-inch led tv';

update public.franchise_package_items i
set quantity=1, unit='unit', dimensions='165 litres', is_included=true,
    needs_confirmation=false, confirmation_note=null, updated_at=now()
from public.franchise_packages p
where i.package_id=p.id and p.slug='standard-franchise' and lower(i.name)='fridge';

insert into public.franchise_package_items
  (package_id,category,name,quantity,unit,dimensions,is_included,needs_confirmation,confirmation_note,sort_order)
select p.id,'Additional Equipment','Additional gas stove',1,'unit',null,true,false,
       'Additional to the existing High-pressure gas stove.',125
from public.franchise_packages p
where p.slug='standard-franchise'
  and not exists (
    select 1 from public.franchise_package_items i
    where i.package_id=p.id and lower(i.name)='additional gas stove'
  );

update public.franchise_package_items i
set quantity=1, unit='unit', is_included=true, needs_confirmation=false,
    confirmation_note='Additional to the existing High-pressure gas stove.', updated_at=now()
from public.franchise_packages p
where i.package_id=p.id and p.slug='standard-franchise' and lower(i.name)='additional gas stove';

