import { supabase } from "@/lib/supabaseClient";
import { AnonymousUser, UserProfile } from "@/types/user";

// Create user profile (called after signup)
export const createUserProfile = async (
  userId: string,
  anonymousData: {
    anonymous_id: string;
    username: string;
  }
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.from("user_profiles").insert({
      id: userId,
      anonymous_id: anonymousData.anonymous_id,
      username: anonymousData.username,
      is_anonymous: true,
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
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

// Get current user's profile
export const getCurrentUserProfile = async (
  userId: string
): Promise<{
  success: boolean;
  profile?: UserProfile;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, profile: data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Get anonymous user by ID (public info only)
export const getAnonymousUser = async (
  anonymousId: string
): Promise<{
  success: boolean;
  user?: AnonymousUser;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select(
        "id, anonymous_id, username, created_at, last_active, contribution_score"
      )
      .eq("anonymous_id", anonymousId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Update user activity
export const updateUserActivity = async (
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from("user_profiles")
      .update({ last_active: new Date().toISOString() })
      .eq("id", userId);

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

// Increment contribution score
//   async incrementContributionScore(
//     userId: string,
//     points: number = 1
//   ): Promise<{ success: boolean; error?: string }> {
//     try {
//       const { error } = await supabase.rpc("increment_contribution_score", {
//         user_id: userId,
//         points: points,
//       });

//       if (error) {
//         return { success: false, error: error.message };
//       }

//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         error:
//           error instanceof Error ? error.message : "Unknown error occurred",
//       };
//     }
//   },
// };
