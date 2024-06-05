import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type SideBarProviderProps = {
  children: ReactNode;
};

type Person = {
  firstName: string;
  lastName: string;
};

const emptyPerson: Person = {
  firstName: "",
  lastName: "",
};

type SideContextType = {
  clicked: boolean;
  setClicked: (value: boolean) => void;
  receiver: Person;
  setReceiver: (value: any) => void;
  inboxClicked: boolean;
  setInboxClicked: (value: boolean) => void;
  sender: Person;
  setSender: Dispatch<SetStateAction<Person>>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clickedName: boolean;
  setClickedname: (value: boolean) => void;
  LogoutC: boolean;
  setLogoutC: (value: boolean) => void;
  logoInbox: boolean;
  setLogoinbox: (value: boolean) => void;
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  showProfile: boolean;
  setShowProfile: (value: boolean) => void;
  showTeam: boolean;
  clickShowTeam: (name: boolean) => void;
};

export const SideBarContext = createContext<SideContextType>({
  clicked: false,
  setClicked: (value: boolean) => {},
  receiver: { firstName: "", lastName: "" },
  setReceiver: (value: any) => {},
  inboxClicked: false,
  setInboxClicked: (value: boolean) => {},
  sender: emptyPerson,
  setSender: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  clickedName: false,
  setClickedname: (value: boolean) => {},
  LogoutC: false,
  setLogoutC: (value: boolean) => {},
  logoInbox: false,
  setLogoinbox: (value: boolean) => {},
  showForm: false,
  setShowForm: (value: boolean) => {},
  showProfile: false,
  setShowProfile: (value: boolean) => {},
  showTeam: false,
  clickShowTeam: (name: boolean) => {},
});

export const SideBarProvider: React.FC<SideBarProviderProps> = ({
  children,
}) => {
  const [clicked, setClicked] = useState(false);
  const [sender, setSender] = useState<Person>(emptyPerson);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Initialize sender with emptyPerson
  const [receiver, setReceiver] = useState<any>(null);
  const [inboxClicked, setInboxClicked] = useState<boolean>(false);
  const [clickedName, setClickedname] = useState<boolean>(false);
  const [LogoutC, setLogoutC] = useState<boolean>(false);
  const [logoInbox, setLogoinbox] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showTeam, clickShowTeam] = useState<boolean>(false);

  const updateClicked = (value: boolean) => {
    setClicked(value);
  };

  return (
    <SideBarContext.Provider
      value={{
        clicked,
        setClicked: updateClicked,
        receiver,
        setReceiver,
        inboxClicked,
        setInboxClicked,
        sender,
        setSender,
        searchTerm,
        setSearchTerm,
        clickedName,
        setClickedname,
        LogoutC,
        setLogoutC,
        logoInbox,
        setLogoinbox,
        showForm,
        setShowForm,
        showProfile,
        setShowProfile,
        showTeam,
        clickShowTeam,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
