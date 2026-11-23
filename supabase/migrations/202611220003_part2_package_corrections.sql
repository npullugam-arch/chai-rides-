update public.franchise_packages
set name='Standard Franchise', slug='standard-franchise', updated_at=now()
where slug='special-offer-franchise' or name='Special Offer Franchise';

update public.franchise_package_items i
set dimensions='165 litres', quantity=1, unit='unit', needs_confirmation=false,
    confirmation_note='Client-confirmed Standard Franchise specification.', updated_at=now()
from public.franchise_packages p
where i.package_id=p.id and p.slug='standard-franchise' and lower(i.name)='fridge';

update public.site_settings
set whatsapp_message='Hello Chai Rides Team, I am interested in starting a Chai Rides franchise. Could you please provide more information about the Classic and Standard franchise packages, investment requirements, included equipment, and application process? I look forward to hearing from you. Thank you.', updated_at=now();
