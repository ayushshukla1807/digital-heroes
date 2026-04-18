-- Initial Schema Migration for Digital Heroes
-- Run this in Supabase SQL editor or via CLI

-- Set timezone
set timezone = 'UTC';

-- Create custom types
create type user_role as enum ('user', 'admin');
create type subscription_status as enum ('active', 'inactive', 'expired');
create type subscription_plan as enum ('monthly', 'yearly');
create type draw_status as enum ('pending', 'simulated', 'published');
create type draw_type as enum ('random', 'algorithmic');
create type prize_tier as enum ('5-match', '4-match', '3-match');
create type verification_status as enum ('pending', 'approved', 'rejected');
create type payout_status as enum ('pending', 'paid');

-- 1. Charities Table
create table public.charities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  logo_url text,
  website text,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 2. Profiles Table (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role user_role default 'user',
  subscription_status subscription_status default 'inactive',
  subscription_plan subscription_plan,
  subscription_start timestamptz,
  subscription_end timestamptz,
  charity_id uuid references public.charities(id) on delete set null,
  charity_contribution_percent integer default 10 check (charity_contribution_percent >= 10 and charity_contribution_percent <= 100),
  created_at timestamptz default now()
);

-- 3. Scores Table
create table public.scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  score integer check (score >= 1 and score <= 45),
  score_date date not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  -- Unique constraint ensuring one score per date per user
  constraint one_score_per_date_per_user unique (user_id, score_date)
);

-- 4. Draws Table
create table public.draws (
  id uuid primary key default gen_random_uuid(),
  draw_month date not null, -- Expected to be 1st of month
  status draw_status default 'pending',
  draw_type draw_type,
  winning_numbers integer[],
  jackpot_amount numeric default 0,
  prize_pool numeric default 0,
  created_at timestamptz default now(),
  published_at timestamptz
);

-- 5. Draw Entries Table
create table public.draw_entries (
  id uuid primary key default gen_random_uuid(),
  draw_id uuid not null references public.draws(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  numbers_matched integer,
  prize_tier prize_tier,
  prize_amount numeric default 0,
  created_at timestamptz default now()
);

-- 6. Winner Verifications
create table public.winner_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  draw_id uuid not null references public.draws(id) on delete cascade,
  proof_url text,
  status verification_status default 'pending',
  payout_status payout_status default 'pending',
  submitted_at timestamptz default now(),
  reviewed_at timestamptz
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.charities enable row level security;
alter table public.profiles enable row level security;
alter table public.scores enable row level security;
alter table public.draws enable row level security;
alter table public.draw_entries enable row level security;
alter table public.winner_verifications enable row level security;

-- Charities Policies
create policy "Charities are viewable by everyone" on charities for select using (true);
create policy "Charities are insertable by admins only" on charities for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Charities are updatable by admins only" on charities for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Profiles Policies
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);

-- Scores Policies
create policy "Users can view their own scores" on scores for select using (auth.uid() = user_id);
create policy "Admins can view all scores" on scores for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can insert their own scores" on scores for insert with check (auth.uid() = user_id);
create policy "Users can update their own scores" on scores for update using (auth.uid() = user_id);
create policy "Users can delete their own scores" on scores for delete using (auth.uid() = user_id);

-- Draws Policies
create policy "Published draws are viewable by everyone" on draws for select using (status = 'published');
create policy "Admins can view all draws" on draws for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can fully manage draws" on draws for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Draw Entries Policies
create policy "Users can view their own entries" on draw_entries for select using (auth.uid() = user_id);
create policy "Admins can view all entries" on draw_entries for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can insert/update entries" on draw_entries for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Winner Verifications Policies
create policy "Users can view their own verifications" on winner_verifications for select using (auth.uid() = user_id);
create policy "Admins can view all verifications" on winner_verifications for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can insert their own verifications" on winner_verifications for insert with check (auth.uid() = user_id);
create policy "Admins can fully manage verifications" on winner_verifications for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ==========================================
-- TRIGGERS & FUNCTIONS
-- ==========================================

-- Trigger to maintain at most 5 scores per user
-- Only keeps the latest 5 scores based on score_date
create or replace function limit_scores_per_user()
returns trigger as $$
declare
  oldest_score_id uuid;
  score_count integer;
begin
  select count(*) into score_count from public.scores where user_id = new.user_id;
  if score_count > 5 then
    select id into oldest_score_id from public.scores 
    where user_id = new.user_id 
    order by score_date asc 
    limit 1;
    
    delete from public.scores where id = oldest_score_id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger enforce_max_scores
after insert on public.scores
for each row execute function limit_scores_per_user();

-- Trigger to automatically create a profile when a new user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role, charity_contribution_percent)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    'user',
    10
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
