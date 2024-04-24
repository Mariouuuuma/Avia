// OtherContext.js
import { createContext, useState,ReactNode } from "react";
type MessengingProviderProps = {
  children: ReactNode; // Explicitly type children as ReactNode
};
export const MessengingContext = createContext({
 // Placeholder function
  messagesent: "",
  setMessagesent: (name: string) => {} // Placeholder function
});

export const MessengingProvider: React.FC<MessengingProviderProps> = ({ children }) => {
  const [messagesent, setMessagesent] = useState("");

  return (
    <MessengingContext.Provider value={{  messagesent, setMessagesent }}>
      {children}
    </MessengingContext.Provider>
  );
};