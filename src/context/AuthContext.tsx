import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import {
  FotaManager,
  LoginPayload,
  SignupPayload,
  loginManager,
  signupManager,
  getCurrentManager,
  logoutManager,
} from "@/services/auth/authService";
import { $fetch } from "@/http/fetch";

interface AuthContextType {
  user: FotaManager | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FotaManager | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refresh_token");

    if (!token && !refreshToken) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      // 1. Try with current access token
      if (token) {
        try {
          const profile = await getCurrentManager();
          if (profile?.user) {
            setUser(profile.user);
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        } catch (err: any) {
          // Token might be expired, will try refresh below
        }
      }

      // 2. Try refreshing access token
      if (refreshToken) {
        const newToken = await $fetch.refreshAccessToken();
        if (newToken) {
          const profile = await getCurrentManager();
          if (profile?.user) {
            setUser(profile.user);
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        }
      }

      // Failed both
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      setUser(null);
      setIsAuthenticated(false);
    } catch {
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (payload: LoginPayload) => {
    const res = await loginManager(payload);
    Cookies.set("token", res.access_token, { expires: 7 });
    Cookies.set("refresh_token", res.refresh_token, { expires: 30 });
    setUser(res.user);
    setIsAuthenticated(true);
  };

  const signup = async (payload: SignupPayload) => {
    const res = await signupManager(payload);
    Cookies.set("token", res.access_token, { expires: 7 });
    Cookies.set("refresh_token", res.refresh_token, { expires: 30 });
    setUser(res.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutManager();
    } catch {
      // Ignore network errors on logout
    } finally {
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
