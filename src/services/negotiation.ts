import { supabase } from "@/lib/supabaseClient";
import { SalaryData, NegotiationTip } from "@/types/negotiationTypes";

// Submit salary data
export const submitSalaryData = async (
  salaryData: Omit<SalaryData, "id" | "created_at" | "updated_at">
): Promise<{
  success: boolean;
  data?: SalaryData;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("salary_data")
      .insert([
        {
          ...salaryData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Get salary feed
export const getSalaryFeed = async (
  filters: {
    job_title?: string;
    location?: string;
    industry?: string;
    min_experience?: number;
    max_experience?: number;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{
  success: boolean;
  data?: SalaryData[];
  error?: string;
  count?: number;
}> => {
  try {
    let query = supabase.from("salary_data").select(
      `
          id,
          job_title,
          company,
          location,
          industry,
          years_experience,
          education_level,
          base_salary,
          total_compensation,
          currency,
          negotiation_strategy,
          is_remote,
          is_accepting_offers,
          created_at,
          user_profiles!inner(username, anonymous_id)
        `,
      { count: "exact" }
    );

    // Apply filters
    if (filters.job_title) {
      query = query.ilike("job_title", `%${filters.job_title}%`);
    }
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }
    if (filters.industry) {
      query = query.eq("industry", filters.industry);
    }
    if (filters.min_experience !== undefined) {
      query = query.gte("years_experience", filters.min_experience);
    }
    if (filters.max_experience !== undefined) {
      query = query.lte("years_experience", filters.max_experience);
    }

    query = query
      .order("created_at", { ascending: false })
      .range(filters.offset || 0, (filters.limit || 50) - 1);

    const { data, error, count } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data, count };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Get negotiation tips
export const getNegotiationTips = async (
  category?: string
): Promise<{
  success: boolean;
  tips?: NegotiationTip[];
  error?: string;
}> => {
  try {
    let query = supabase
      .from("negotiation_tips")
      .select("*")
      .order("upvotes", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, tips: data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Upvote a negotiation tip
export const upvoteTip = async (
  tipId: string
  //   userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.rpc("increment_tip_upvotes", {
      tip_id: tipId,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
