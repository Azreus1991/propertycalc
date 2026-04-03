-- ============================================================
-- PROPERTYCALC — REAL ESTATE OPERATING SYSTEM
-- Full database schema for Supabase (PostgreSQL)
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================================
create type user_role as enum (
  'investor', 'bird_dog', 'vendor', 'agent',
  'lender', 'contractor', 'property_manager', 'member'
);

create type membership_tier as enum ('free', 'pro', 'elite');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  roles user_role[] not null default '{member}',
  primary_role user_role not null default 'member',
  membership membership_tier not null default 'free',
  company_name text,
  bio text,
  website text,
  location_city text,
  location_state text,
  service_areas text[], -- array of state codes
  is_verified boolean not null default false,
  verification_date timestamptz,
  trust_score integer not null default 0, -- 0-100
  deals_submitted integer not null default 0,
  deals_converted integer not null default 0,
  total_earnings numeric(12,2) not null default 0,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- 2. DEALS (Core deal table)
-- ============================================================
create type deal_type as enum (
  'bird_dog', 'wholesale', 'arbitrage',
  'flip', 'rental', 'brrrr', 'commercial',
  'section_8', 'government', 'development',
  'co_hosting', 'contract_assignment'
);

create type deal_status as enum (
  'draft', 'submitted', 'under_review', 'accepted',
  'rejected', 'routed', 'in_progress', 'converted', 'closed'
);

create type deal_grade as enum ('A', 'B', 'C', 'D', 'F');

create table deals (
  id uuid primary key default uuid_generate_v4(),
  submitted_by uuid not null references profiles(id),
  title text not null,
  description text,
  deal_type deal_type not null,
  status deal_status not null default 'draft',

  -- Property details
  property_address text,
  city text not null,
  state text not null,
  zip text,
  property_type text, -- SFH, multi, commercial, land
  bedrooms integer,
  bathrooms numeric(3,1),
  sqft integer,
  lot_size numeric(10,2),
  year_built integer,

  -- Financial details
  asking_price numeric(12,2),
  arv numeric(12,2), -- after repair value
  estimated_repair numeric(12,2),
  monthly_rent numeric(10,2),
  monthly_expenses numeric(10,2),
  noi numeric(10,2), -- net operating income

  -- Underwriting scores (calculated)
  roi_score numeric(5,2),
  cash_flow_score numeric(5,2),
  risk_score numeric(5,2),
  overall_grade deal_grade,
  strategy_detected deal_type[],

  -- Deal flow
  assigned_to uuid references profiles(id),
  routed_to uuid references profiles(id),
  accepted_by uuid references profiles(id),
  converted_at timestamptz,
  payout_amount numeric(10,2),
  routing_fee numeric(10,2),
  referral_fee numeric(10,2),

  -- Metadata
  is_featured boolean not null default false,
  view_count integer not null default 0,
  images text[],
  documents text[],
  tags text[],
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_deals_status on deals(status);
create index idx_deals_type on deals(deal_type);
create index idx_deals_state on deals(state);
create index idx_deals_submitted_by on deals(submitted_by);
create index idx_deals_grade on deals(overall_grade);

-- ============================================================
-- 3. DEAL ROUTES (routing deals to investors/lenders/agents)
-- ============================================================
create type route_status as enum (
  'pending', 'sent', 'viewed', 'interested',
  'passed', 'accepted', 'closed'
);

create table deal_routes (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid not null references deals(id) on delete cascade,
  routed_to uuid not null references profiles(id),
  routed_by uuid references profiles(id), -- null = system auto-route
  status route_status not null default 'pending',
  match_score numeric(5,2), -- how well this deal matches the investor
  notes text,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_deal_routes_deal on deal_routes(deal_id);
create index idx_deal_routes_user on deal_routes(routed_to);

-- ============================================================
-- 4. SERVICES (vendor/contractor marketplace)
-- ============================================================
create type service_category as enum (
  'contractor', 'property_manager', 'lender', 'agent',
  'inspector', 'appraiser', 'attorney', 'insurance',
  'title_company', 'wholesaler', 'photographer', 'other'
);

create type listing_tier as enum ('basic', 'pro', 'featured');

create table services (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid not null references profiles(id),
  category service_category not null,
  title text not null,
  description text,
  listing_tier listing_tier not null default 'basic',

  -- Details
  specialties text[],
  service_areas text[], -- state codes
  price_range_min numeric(10,2),
  price_range_max numeric(10,2),
  pricing_model text, -- hourly, flat, percentage
  response_time text, -- "24 hours", "same day"
  years_experience integer,
  license_number text,
  insurance_verified boolean not null default false,

  -- Stats
  rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  leads_received integer not null default 0,
  deals_completed integer not null default 0,

  -- Metadata
  is_active boolean not null default true,
  images text[],
  website text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_services_category on services(category);
create index idx_services_provider on services(provider_id);
create index idx_services_tier on services(listing_tier);

-- ============================================================
-- 5. SERVICE REQUESTS (deals → services integration)
-- ============================================================
create type service_request_status as enum (
  'pending', 'matched', 'in_progress', 'completed', 'cancelled'
);

create table service_requests (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references deals(id),
  requested_by uuid not null references profiles(id),
  service_id uuid references services(id),
  category service_category not null,
  status service_request_status not null default 'pending',
  description text,
  budget_min numeric(10,2),
  budget_max numeric(10,2),
  urgency text, -- low, medium, high, urgent
  notes text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_service_requests_deal on service_requests(deal_id);

-- ============================================================
-- 6. PAYOUTS (bird-dog payout tracking)
-- ============================================================
create type payout_status as enum (
  'pending', 'eligible', 'approved', 'processing', 'paid', 'disputed'
);

create table payouts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  deal_id uuid not null references deals(id),
  amount numeric(10,2) not null,
  fee_type text not null, -- 'bird_dog', 'referral', 'routing', 'split'
  status payout_status not null default 'pending',
  percentage numeric(5,2), -- payout percentage
  notes text,
  approved_by uuid references profiles(id),
  approved_at timestamptz,
  paid_at timestamptz,
  payment_method text,
  transaction_id text,
  created_at timestamptz not null default now()
);

create index idx_payouts_user on payouts(user_id);
create index idx_payouts_deal on payouts(deal_id);
create index idx_payouts_status on payouts(status);

-- ============================================================
-- 7. MESSAGES (user-to-user + deal discussions)
-- ============================================================
create table conversations (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references deals(id),
  title text,
  is_deal_discussion boolean not null default false,
  created_at timestamptz not null default now()
);

create table conversation_participants (
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id uuid not null references profiles(id),
  joined_at timestamptz not null default now(),
  last_read_at timestamptz,
  primary key (conversation_id, user_id)
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  content text not null,
  is_system boolean not null default false,
  read_by uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create index idx_messages_conversation on messages(conversation_id);
create index idx_messages_sender on messages(sender_id);

-- ============================================================
-- 8. PORTFOLIO (property tracking)
-- ============================================================
create table portfolios (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  name text not null default 'My Portfolio',
  is_public boolean not null default false,
  total_value numeric(14,2) not null default 0,
  total_equity numeric(14,2) not null default 0,
  monthly_cash_flow numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table portfolio_properties (
  id uuid primary key default uuid_generate_v4(),
  portfolio_id uuid not null references portfolios(id) on delete cascade,
  address text not null,
  city text not null,
  state text not null,
  property_type text,
  purchase_price numeric(12,2),
  current_value numeric(12,2),
  mortgage_balance numeric(12,2),
  monthly_rent numeric(10,2),
  monthly_expenses numeric(10,2),
  monthly_cash_flow numeric(10,2),
  cap_rate numeric(5,2),
  roi numeric(5,2),
  acquisition_date date,
  strategy text, -- flip, rental, brrrr, etc.
  status text not null default 'active', -- active, sold, pending
  notes text,
  images text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_portfolio_properties_portfolio on portfolio_properties(portfolio_id);

-- ============================================================
-- 9. MEMBERSHIPS (subscription tracking)
-- ============================================================
create table memberships (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  tier membership_tier not null,
  stripe_subscription_id text,
  status text not null default 'active', -- active, cancelled, past_due
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 10. SUPPORT TICKETS
-- ============================================================
create type ticket_status as enum (
  'open', 'in_progress', 'waiting', 'resolved', 'closed'
);

create type ticket_category as enum (
  'general', 'deal_dispute', 'payout', 'account',
  'vendor', 'technical', 'billing', 'verification'
);

create table tickets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  category ticket_category not null default 'general',
  subject text not null,
  description text not null,
  status ticket_status not null default 'open',
  priority text not null default 'medium', -- low, medium, high, urgent
  deal_id uuid references deals(id),
  assigned_to uuid references profiles(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table ticket_replies (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  user_id uuid not null references profiles(id),
  content text not null,
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 11. REVIEWS
-- ============================================================
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  reviewer_id uuid not null references profiles(id),
  reviewed_id uuid not null references profiles(id),
  service_id uuid references services(id),
  deal_id uuid references deals(id),
  rating integer not null check (rating between 1 and 5),
  content text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 12. NOTIFICATIONS
-- ============================================================
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  title text not null,
  message text not null,
  type text not null, -- deal_update, payout, message, route, system
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_notifications_user on notifications(user_id);
create index idx_notifications_read on notifications(is_read);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles enable row level security;
alter table deals enable row level security;
alter table deal_routes enable row level security;
alter table services enable row level security;
alter table service_requests enable row level security;
alter table payouts enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table portfolios enable row level security;
alter table portfolio_properties enable row level security;
alter table tickets enable row level security;
alter table notifications enable row level security;

-- Profiles: users can read all, update own
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Deals: authenticated can read accepted+, owners can CRUD own
create policy "Published deals are viewable" on deals for select using (
  status in ('submitted', 'under_review', 'accepted', 'routed', 'in_progress', 'converted', 'closed')
  or submitted_by = auth.uid()
);
create policy "Users can create deals" on deals for insert with check (auth.uid() = submitted_by);
create policy "Users can update own deals" on deals for update using (auth.uid() = submitted_by);

-- Services: public read, owners manage
create policy "Active services are viewable" on services for select using (is_active = true);
create policy "Providers can manage own services" on services for all using (auth.uid() = provider_id);

-- Payouts: users see own
create policy "Users see own payouts" on payouts for select using (auth.uid() = user_id);

-- Messages: participants only
create policy "Participants can read messages" on messages for select using (
  exists (
    select 1 from conversation_participants
    where conversation_id = messages.conversation_id
    and user_id = auth.uid()
  )
);
create policy "Participants can send messages" on messages for insert with check (
  auth.uid() = sender_id and exists (
    select 1 from conversation_participants
    where conversation_id = messages.conversation_id
    and user_id = auth.uid()
  )
);

-- Portfolios: public if toggled, owner always
create policy "Public portfolios are viewable" on portfolios for select using (
  is_public = true or user_id = auth.uid()
);
create policy "Users manage own portfolios" on portfolios for all using (auth.uid() = user_id);

-- Portfolio properties: follow portfolio access
create policy "Portfolio properties follow portfolio" on portfolio_properties for select using (
  exists (
    select 1 from portfolios
    where id = portfolio_properties.portfolio_id
    and (is_public = true or user_id = auth.uid())
  )
);
create policy "Users manage own portfolio properties" on portfolio_properties for all using (
  exists (
    select 1 from portfolios
    where id = portfolio_properties.portfolio_id
    and user_id = auth.uid()
  )
);

-- Notifications: own only
create policy "Users see own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users update own notifications" on notifications for update using (auth.uid() = user_id);

-- Tickets: own only
create policy "Users see own tickets" on tickets for select using (auth.uid() = user_id);
create policy "Users create own tickets" on tickets for insert with check (auth.uid() = user_id);

-- Deal routes: recipient can see
create policy "Users see own routes" on deal_routes for select using (auth.uid() = routed_to);
