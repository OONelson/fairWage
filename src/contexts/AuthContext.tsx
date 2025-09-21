import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, AuthError } from "@supabase/supabase-js";
import { generateUsername } from "../utils/username";
import { AuthCredentials } from "@/types/auth";
import {
  signUp,
  signIn,
  signOut as authSignOut,
  getSession,
} from "@/services/auth";

interface AuthContextType {
  user: AuthCredentials | null;
  session: Session | null;
  isLoading: boolean;
  handleSignUp: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null; success?: boolean }>;
  handleSignIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null; success?: boolean }>;
  handleSignOut: () => Promise<void>;
  handleResetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthCredentials | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const session = await getSession();
        setSession(session);

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            username:
              session.user.user_metadata?.username ||
              generateUsername(session.user.email!),
            password: "",
          });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          username:
            session.user.user_metadata?.username ||
            generateUsername(session.user.email!),
          password: "",
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const username = generateUsername(email);

      const response = await signUp({
        email,
        password,
        username,
      });

      if (response.success) {
        return { error: null, success: true };
      } else {
        return {
          error: {
            name: "SignupError",
            message: response.error || "Unknown error during sign up",
          } as AuthError,
          success: false,
        };
      }
    } catch (error) {
      return {
        error: {
          name: "SignUpError",
          message:
            error instanceof Error
              ? error.message
              : "Unknown error during sign up",
        } as AuthError,
        success: false,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await signIn({ email, password, username: "" });

      if (response.success) {
        return {
          error: null,
          success: true,
        };
      } else {
        return {
          error: {
            name: "SignInError",
            message: response.error || "Unknown error during sign in",
          } as AuthError,
          success: false,
        };
      }
    } catch (error) {
      return {
        error: {
          name: "SignInError",
          message:
            error instanceof Error
              ? error.message
              : "Unknown error during sign in",
        } as AuthError,
        success: false,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const response = await authSignOut();

      if (!response.success) {
        console.error("Error signing out:", response.error);
      }
    } catch (error) {
      console.error("Error in signOut:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return { error };
    } catch (error) {
      return {
        error: {
          name: "ResetPasswordError",
          message:
            error instanceof Error
              ? error.message
              : "Unknown error during password reset",
        } as AuthError,
      };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
