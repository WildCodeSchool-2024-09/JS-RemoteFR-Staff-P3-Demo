import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logOut: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
  profilePicture: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const logOut = useCallback(() => {
    setUser(null);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <logOut is in a useCallback and will never change>
  const value = useMemo(() => ({ user, setUser, logOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
