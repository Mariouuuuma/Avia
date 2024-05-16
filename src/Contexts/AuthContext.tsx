import { createContext, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

type MessagingProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  currentuser: User | null;
  setCurrentuser: (user: User | null) => void;
  loggedOut: boolean;
  setLoggedout: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  currentuser: null,
  setCurrentuser: (user: User | null) => {},
  loggedOut: true,
  setLoggedout: (value: boolean) => {},
});

export const AuthProvider: React.FC<MessagingProviderProps> = ({
  children,
}) => {
  const [currentuser, setCurrentuser] = useState<User | null>(null);
  const [loggedOut, setLoggedout] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{ currentuser, setCurrentuser, loggedOut, setLoggedout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
