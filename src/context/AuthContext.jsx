import { createContext, useContext, useState } from 'react';

/**
 * Mock authentication.
 * Stores the "logged in" user in localStorage so a refresh keeps you signed in.
 * There is NO real security here – Phase 2 will swap this for real auth.
 */
const AuthContext = createContext(null);
const STORAGE_KEY = 'casacraft_user';

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  const signIn = (nextUser) => {
    setUser(nextUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      /* storage unavailable – keep the user in memory only */
    }
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return <AuthContext.Provider value={{ user, signIn, signOut, setUser: signIn }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
