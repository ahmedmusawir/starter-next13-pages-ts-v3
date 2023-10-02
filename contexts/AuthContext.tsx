import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import authService from "@/services/authService"; // Adjust the path accordingly
import { AxiosError, User } from "@/global-interfaces";
import { useRouter } from "next/router";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  open: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for the existence of the "authFlag" in local storage
      const authFlag = localStorage.getItem("authFlag");

      if (!authFlag) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const data = await authService.checkAuthStatus();
        setIsAuthenticated(true);
        setUser(data);
      } catch (err) {
        const error = err as AxiosError;

        console.log("Axios Error:", error.response?.status);

        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          console.error("Error during auth initialization:", error);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      console.log("Login success data", data);

      if (data.user) {
        setIsAuthenticated(true);
        setUser(data.user);

        localStorage.setItem("authFlag", "true");

        router.push("/profile");
      } else {
        console.error("Login failed");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      const serverErrorMessage = error.response?.data?.error;
      return serverErrorMessage || "An unexpected error occurred.";
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);

      localStorage.removeItem("authFlag");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        isLoading,
        login,
        logout,
        setOpen,
        open,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
