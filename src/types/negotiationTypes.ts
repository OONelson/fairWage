export type Negotiation = {
  id: string;
  created_at: string;
  user_id: string;
  job_title: string;
  location: string | null;
  years_of_experience: number;
  proposed_range_min: number;
  proposed_range_max: number;
  justification: string;
};
