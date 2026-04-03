// ============================================================
// PROPERTYCALC — TypeScript Types
// Mirrors supabase-schema.sql
// ============================================================

export type UserRole =
  | 'investor' | 'bird_dog' | 'vendor' | 'agent'
  | 'lender' | 'contractor' | 'property_manager' | 'member';

export type MembershipTier = 'free' | 'pro' | 'elite';

export type DealType =
  | 'bird_dog' | 'wholesale' | 'arbitrage'
  | 'flip' | 'rental' | 'brrrr' | 'commercial'
  | 'section_8' | 'government' | 'development'
  | 'co_hosting' | 'contract_assignment';

export type DealStatus =
  | 'draft' | 'submitted' | 'under_review' | 'accepted'
  | 'rejected' | 'routed' | 'in_progress' | 'converted' | 'closed';

export type DealGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export type RouteStatus =
  | 'pending' | 'sent' | 'viewed' | 'interested'
  | 'passed' | 'accepted' | 'closed';

export type ServiceCategory =
  | 'contractor' | 'property_manager' | 'lender' | 'agent'
  | 'inspector' | 'appraiser' | 'attorney' | 'insurance'
  | 'title_company' | 'wholesaler' | 'photographer' | 'other';

export type ListingTier = 'basic' | 'pro' | 'featured';

export type PayoutStatus =
  | 'pending' | 'eligible' | 'approved' | 'processing' | 'paid' | 'disputed';

export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
export type TicketCategory =
  | 'general' | 'deal_dispute' | 'payout' | 'account'
  | 'vendor' | 'technical' | 'billing' | 'verification';

// ============================================================
// Table Row Types
// ============================================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  roles: UserRole[];
  primary_role: UserRole;
  membership: MembershipTier;
  company_name: string | null;
  bio: string | null;
  website: string | null;
  location_city: string | null;
  location_state: string | null;
  service_areas: string[] | null;
  is_verified: boolean;
  verification_date: string | null;
  trust_score: number;
  deals_submitted: number;
  deals_converted: number;
  total_earnings: number;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  submitted_by: string;
  title: string;
  description: string | null;
  deal_type: DealType;
  status: DealStatus;
  property_address: string | null;
  city: string;
  state: string;
  zip: string | null;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  lot_size: number | null;
  year_built: number | null;
  asking_price: number | null;
  arv: number | null;
  estimated_repair: number | null;
  monthly_rent: number | null;
  monthly_expenses: number | null;
  noi: number | null;
  roi_score: number | null;
  cash_flow_score: number | null;
  risk_score: number | null;
  overall_grade: DealGrade | null;
  strategy_detected: DealType[] | null;
  assigned_to: string | null;
  routed_to: string | null;
  accepted_by: string | null;
  converted_at: string | null;
  payout_amount: number | null;
  routing_fee: number | null;
  referral_fee: number | null;
  is_featured: boolean;
  view_count: number;
  images: string[] | null;
  documents: string[] | null;
  tags: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  submitter?: Profile;
}

export interface DealRoute {
  id: string;
  deal_id: string;
  routed_to: string;
  routed_by: string | null;
  status: RouteStatus;
  match_score: number | null;
  notes: string | null;
  responded_at: string | null;
  created_at: string;
  // Joined
  deal?: Deal;
  recipient?: Profile;
}

export interface Service {
  id: string;
  provider_id: string;
  category: ServiceCategory;
  title: string;
  description: string | null;
  listing_tier: ListingTier;
  specialties: string[] | null;
  service_areas: string[] | null;
  price_range_min: number | null;
  price_range_max: number | null;
  pricing_model: string | null;
  response_time: string | null;
  years_experience: number | null;
  license_number: string | null;
  insurance_verified: boolean;
  rating: number;
  review_count: number;
  leads_received: number;
  deals_completed: number;
  is_active: boolean;
  images: string[] | null;
  website: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  provider?: Profile;
}

export interface ServiceRequest {
  id: string;
  deal_id: string | null;
  requested_by: string;
  service_id: string | null;
  category: ServiceCategory;
  status: 'pending' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  description: string | null;
  budget_min: number | null;
  budget_max: number | null;
  urgency: string | null;
  notes: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Payout {
  id: string;
  user_id: string;
  deal_id: string;
  amount: number;
  fee_type: string;
  status: PayoutStatus;
  percentage: number | null;
  notes: string | null;
  approved_by: string | null;
  approved_at: string | null;
  paid_at: string | null;
  payment_method: string | null;
  transaction_id: string | null;
  created_at: string;
  // Joined
  deal?: Deal;
}

export interface Conversation {
  id: string;
  deal_id: string | null;
  title: string | null;
  is_deal_discussion: boolean;
  created_at: string;
  // Joined
  participants?: Profile[];
  last_message?: Message;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_system: boolean;
  read_by: string[];
  created_at: string;
  // Joined
  sender?: Profile;
}

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  is_public: boolean;
  total_value: number;
  total_equity: number;
  monthly_cash_flow: number;
  created_at: string;
  updated_at: string;
  // Joined
  properties?: PortfolioProperty[];
  owner?: Profile;
}

export interface PortfolioProperty {
  id: string;
  portfolio_id: string;
  address: string;
  city: string;
  state: string;
  property_type: string | null;
  purchase_price: number | null;
  current_value: number | null;
  mortgage_balance: number | null;
  monthly_rent: number | null;
  monthly_expenses: number | null;
  monthly_cash_flow: number | null;
  cap_rate: number | null;
  roi: number | null;
  acquisition_date: string | null;
  strategy: string | null;
  status: string;
  notes: string | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  user_id: string;
  category: TicketCategory;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: string;
  deal_id: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

// ============================================================
// Supabase Database Type (for typed client)
// ============================================================
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string; email: string }; Update: Partial<Profile> };
      deals: { Row: Deal; Insert: Partial<Deal> & { submitted_by: string; title: string; deal_type: DealType; city: string; state: string }; Update: Partial<Deal> };
      deal_routes: { Row: DealRoute; Insert: Partial<DealRoute> & { deal_id: string; routed_to: string }; Update: Partial<DealRoute> };
      services: { Row: Service; Insert: Partial<Service> & { provider_id: string; category: ServiceCategory; title: string }; Update: Partial<Service> };
      service_requests: { Row: ServiceRequest; Insert: Partial<ServiceRequest> & { requested_by: string; category: ServiceCategory }; Update: Partial<ServiceRequest> };
      payouts: { Row: Payout; Insert: Partial<Payout> & { user_id: string; deal_id: string; amount: number; fee_type: string }; Update: Partial<Payout> };
      conversations: { Row: Conversation; Insert: Partial<Conversation>; Update: Partial<Conversation> };
      messages: { Row: Message; Insert: Partial<Message> & { conversation_id: string; sender_id: string; content: string }; Update: Partial<Message> };
      portfolios: { Row: Portfolio; Insert: Partial<Portfolio> & { user_id: string }; Update: Partial<Portfolio> };
      portfolio_properties: { Row: PortfolioProperty; Insert: Partial<PortfolioProperty> & { portfolio_id: string; address: string; city: string; state: string }; Update: Partial<PortfolioProperty> };
      tickets: { Row: Ticket; Insert: Partial<Ticket> & { user_id: string; subject: string; description: string }; Update: Partial<Ticket> };
      notifications: { Row: Notification; Insert: Partial<Notification> & { user_id: string; title: string; message: string; type: string }; Update: Partial<Notification> };
    };
  };
}
