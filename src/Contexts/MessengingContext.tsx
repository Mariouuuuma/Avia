// OtherContext.js
import { createContext, useState, ReactNode } from "react";
type MessengingProviderProps = {
  children: ReactNode; // Explicitly type children as ReactNode
};
export const MessengingContext = createContext({
  // Placeholder function
  messagesent: "",
  setMessagesent: (name: string) => {},
  messageInbox: false,
  setmessageInbox: (name: boolean) => {}, // Placeholder function
});

export const MessengingProvider: React.FC<MessengingProviderProps> = ({
  children,
}) => {
  const [messagesent, setMessagesent] = useState("");
  const [messageInbox, setmessageInbox] = useState<boolean>(false);
  return (
    <MessengingContext.Provider
      value={{ messagesent, setMessagesent, messageInbox, setmessageInbox }}
    >
      {children}
    </MessengingContext.Provider>
  );
};
