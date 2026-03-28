create extension if not exists "pgcrypto";

create table if not exists public.foods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('veg', 'non-veg')),
  category text not null check (category in ('breakfast', 'lunch', 'snack', 'dinner')),
  cost integer not null check (cost >= 0),
  calories double precision not null check (calories >= 0),
  protein double precision not null check (protein >= 0),
  iron double precision not null check (iron >= 0),
  calcium double precision not null check (calcium >= 0),
  age_group text not null check (age_group in ('toddler', 'child', 'all'))
);

alter table public.foods enable row level security;

drop policy if exists "Foods are readable by everyone" on public.foods;
create policy "Foods are readable by everyone"
on public.foods
for select
using (true);

insert into public.foods (name,type,category,cost,calories,protein,iron,calcium,age_group) values
('Milk','veg','breakfast',30,150,8,0.1,125,'all'),
('Banana','veg','breakfast',10,89,1.1,0.3,5,'all'),
('Apple','veg','snack',20,95,0.5,0.2,6,'all'),
('Boiled Egg','non-veg','breakfast',7,78,6,1.2,28,'child'),
('Omelette','non-veg','breakfast',15,154,10,1.8,50,'child'),
('Poha','veg','breakfast',20,180,4,2.7,20,'all'),
('Upma','veg','breakfast',25,190,5,1.5,30,'all'),
('Idli','veg','breakfast',15,58,2,0.3,10,'all'),
('Dosa','veg','breakfast',30,168,4,1,20,'child'),
('Paratha','veg','breakfast',25,260,6,2.5,50,'child'),
('Rice','veg','lunch',20,130,2.5,0.2,10,'all'),
('Dal','veg','lunch',25,116,9,3.3,19,'all'),
('Roti','veg','lunch',10,70,3,1.2,15,'all'),
('Paneer','veg','dinner',50,265,18,0.7,208,'child'),
('Curd','veg','snack',20,98,11,0.2,110,'all'),
('Chicken Curry','non-veg','lunch',60,239,27,1.3,15,'child'),
('Egg Curry','non-veg','dinner',40,220,13,2,60,'child'),
('Vegetable Sabzi','veg','dinner',20,90,2,1.5,40,'all'),
('Khichdi','veg','dinner',30,200,7,2,60,'all'),
('Peanuts','veg','snack',15,567,26,4.6,92,'child'),
('Sprouts','veg','breakfast',20,120,9,2.5,40,'child'),
('Fish Curry','non-veg','lunch',70,206,22,1,20,'child'),
('Mutton Curry','non-veg','dinner',80,294,25,2,30,'child'),
('Samosa','veg','snack',15,250,4,1,30,'child'),
('Pakora','veg','snack',20,300,5,2,40,'child'),
('Dhokla','veg','snack',20,160,6,1,40,'all'),
('Corn Chaat','veg','snack',20,150,5,1.5,20,'all'),
('Buttermilk','veg','snack',10,60,3,0.1,100,'all'),
('Lassi','veg','snack',20,180,6,0.1,200,'child')
on conflict do nothing;
