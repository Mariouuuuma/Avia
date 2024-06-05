import { User } from "@supabase/supabase-js";
import { createContext, useState, ReactNode } from "react";

type MessengingProviderProps = {
  children: ReactNode;
};

type MessengingContextType = {
  messagesent: string;
  setMessagesent: (name: string) => void;
  messageInbox: boolean;
  setmessageInbox: (name: boolean) => void;
  guestId: number | null; // Adjusted type here
  setguestId: (value: number | null) => void;
  convName: string | null; // Adjusted type here
  setConvName: (value: string | null) => void;
  msgGuest: boolean;
  setmessageGuest: (name: boolean) => void;
  user: User | null;
  setUser: (name: User | null) => void;
  redbox: boolean;
  setRedbox: (name: boolean) => void;
  SetConvId: (name: string) => void;
  ConvId: string;
  messageReclm: string;
  setMessageReclm: (name: string) => void;
  clickedButtons: Boolean;
  setClickedButtons: (name: boolean) => void;
  Me: string | undefined;
  setMe: (name: string | undefined) => void;
  messageBot: boolean;
  setMessageBot: (name: boolean) => void;
  increment: number;
  setIncrement: (name: number) => void;
};

export const MessengingContext = createContext<MessengingContextType>({
  messagesent: "",
  setMessagesent: (name: string) => {},
  messageInbox: false,
  setmessageInbox: (name: boolean) => {},
  guestId: null,
  setguestId: (value: number | null) => {},
  convName: null,
  setConvName: (value: string | null) => {},
  msgGuest: false,
  setmessageGuest: (name: boolean) => {},
  user: null,
  setUser: (name: User | null) => {},
  redbox: false,
  setRedbox: (name: boolean) => {},
  SetConvId: (name: string) => {},
  ConvId: "",
  messageReclm: "",
  setMessageReclm: (name: string) => {},
  clickedButtons: false,
  setClickedButtons: (name: boolean) => {},
  Me: "",
  setMe: (name: string | undefined) => {},
  messageBot: false,
  setMessageBot: (name: boolean) => {},
  increment: 0,
  setIncrement: (name: number) => {},
});

export const MessengingProvider: React.FC<MessengingProviderProps> = ({
  children,
}) => {
  const [messagesent, setMessagesent] = useState("");
  const [messageInbox, setmessageInbox] = useState<boolean>(false);
  const [guestId, setguestId] = useState<number | null>(null);
  const [convName, setConvName] = useState<string | null>(null); // Adjusted type here
  const [msgGuest, setmessageGuest] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [redbox, setRedbox] = useState<boolean>(false);
  const [ConvId, SetConvId] = useState<string>(""); // Adjusted type here
  const [messageReclm, setMessageReclm] = useState<string>("");
  const [clickedButtons, setClickedButtons] = useState<boolean>(false);
  const [Me, setMe] = useState<string | undefined>();
  const [messageBot, setMessageBot] = useState<boolean>(false);
  const [increment, setIncrement] = useState<number>(0);

  return (
    <MessengingContext.Provider
      value={{
        messagesent,
        setMessagesent,
        messageInbox,
        setmessageInbox,
        guestId,
        setguestId,
        convName,
        setConvName,
        msgGuest,
        setmessageGuest,
        user,
        setUser,
        redbox,
        setRedbox,
        SetConvId,
        ConvId,
        messageReclm,
        setMessageReclm,
        clickedButtons,
        setClickedButtons,
        Me,
        setMe,
        messageBot,
        setMessageBot,
        increment,
        setIncrement,
      }}
    >
      {children}
    </MessengingContext.Provider>
  );
};
