import { createContext, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

// Définir le type des propriétés du composant Provider
type MessagingProviderProps = {
  children: ReactNode;
};

// Définir le type de l'objet de contexte
type AuthContextType = {
  currentuser: User | null;
  setCurrentuser: (user: User | null) => void;
};

// Créer le contexte en spécifiant le type AuthContextType
export const AuthContext = createContext<AuthContextType>({
  currentuser: null,
  setCurrentuser: (user: User | null) => {}  
});

// Composant Provider qui enveloppe les enfants avec le contexte
export const AuthProvider: React.FC<MessagingProviderProps> = ({ children }) => {
  // Initialiser l'état local pour stocker l'utilisateur actuel
  const [currentuser, setCurrentuser] = useState<User | null>(null);

  // Rendre le contexte disponible avec la valeur actuelle de l'utilisateur
  return (
    <AuthContext.Provider value={{ currentuser, setCurrentuser }}>
      {children}
    </AuthContext.Provider>
  );
};
