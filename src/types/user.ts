export type AnonymousUser = {
  id: string;
  anonymous_id: string;
  username: string;
  created_at: string;
  last_active: string;
  contribution_score: number;
};

export type UserProfile = {
  id: string;
  anonymous_id: string;
  username: string;
  is_anonymous: boolean;
  email?: string;
  created_at: string;
};
