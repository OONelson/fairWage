import { supabase } from "@/lib/supabaseClient";
import { generateUsername } from "@/utils/username";
import type { AuthCredentials, AuthResponse } from "@/types/auth";

// Sign up with anonymous handling
export const signUp = async (
  credentials: Omit<AuthCredentials, "id">
): Promise<AuthResponse> => {
  try {
    const anonymousUsername = generateUsername();

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          username: anonymousUsername,
          is_anonymous: true,
          anonymous_id: `anon_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      userId: data.user?.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Sign in
export const signIn = async (
  credentials: Omit<AuthCredentials, "id">
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      userId: data.user.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Sign out
export const signOut = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();

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

// Get current session
export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

// Subscribe to auth changes
//   onAuthStateChange(callback: (event: any, session: any) => void) {
//     return supabase.auth.onAuthStateChange(callback);
//   }
