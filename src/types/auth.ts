export type AuthCredentials = {
  id?: string;
  email: string;
  username?: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  error?: string;
  userId?: string;
};
