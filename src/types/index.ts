// src/types/index.ts
export interface AnonymousUser {
  id: string;
  anonymousId: string; // Generated anonymous identifier
  createdAt: Date;
  lastActive: Date;
}

export interface SalaryData {
  id: string;
  anonymousUserId: string;
  jobTitle: string;
  company: string; // Optional, can be "Redacted" or similar
  location: string;
  salary: number;
  currency: string;
  experienceLevel: "entry" | "mid" | "senior" | "executive";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  benefits: string[];
  negotiationStatus: "success" | "failed" | "in-progress";
  createdAt: Date;
  updatedAt: Date;
  isAnonymous: boolean;
}

export interface AuthResponse {
  user: AnonymousUser;
  session: any;
  error?: string;
}

export interface NegotiationResponse {
  data: SalaryData | SalaryData[] | null;
  error?: string;
}
