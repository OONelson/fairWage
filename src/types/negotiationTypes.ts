// export type Negotiation = {
//   id: string;
//   created_at: string;
//   user_id: string;
//   job_title: string;
//   location: string | null;
//   years_of_experience: number;
//   proposed_range_min: number;
//   proposed_range_max: number;
//   justification: string;
// };

export type SalaryData = {
  id?: string;
  anonymous_user_id: string;
  job_title: string;
  company?: string;
  location: string;
  industry: string;
  years_experience: number;
  education_level: string;
  base_salary: number;
  total_compensation: number;
  currency: string;
  negotiation_strategy: string;
  is_remote: boolean;
  is_accepting_offers: boolean;
  created_at?: string;
  updated_at?: string;
};

export type NegotiationTip = {
  id: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  created_at: string;
};
