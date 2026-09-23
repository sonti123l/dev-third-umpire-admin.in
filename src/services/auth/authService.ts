import { $fetch } from "@/http/fetch";

export interface FotaManager {
  id: number;
  email: string;
  name: string | null;
  role: string | null;
  createdAt?: string | null;
}

export interface AuthResponse {
  message?: string;
  access_token: string;
  refresh_token: string;
  user: FotaManager;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const loginManager = async (payload: LoginPayload): Promise<AuthResponse> => {
  const result = await $fetch.post("/auth/login", payload);
  return result.data as AuthResponse;
};

export const signupManager = async (payload: SignupPayload): Promise<AuthResponse> => {
  const result = await $fetch.post("/auth/signup", payload);
  return result.data as AuthResponse;
};

export const getCurrentManager = async (): Promise<{ user: FotaManager }> => {
  const result = await $fetch.get("/auth/me");
  return result.data as { user: FotaManager };
};

export const logoutManager = async (): Promise<{ message: string }> => {
  const result = await $fetch.post("/auth/logout");
  return result.data as { message: string };
};
