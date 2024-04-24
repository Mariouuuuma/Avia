import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type SideBarProviderProps = {
  children: ReactNode;
};

type Person = {
  firstName: string;
  lastName: string;
};

// Define an empty Person object
const emptyPerson: Person = {
  firstName: "",
  lastName: "",
};

type SideContextType = {
  clicked: boolean;
  setClicked: (value: boolean) => void;
  user: Person;
  setUser: (value: any) => void;
  inboxClicked: boolean;
  setInboxClicked: (value: boolean) => void;
  sender: Person; // sender is always of type Person
  setSender: Dispatch<SetStateAction<Person>>; 
  searchTerm:string;
  setSearchTerm:(value:string)=>void// Use Dispatch with SetStateAction<Person>
};

export const SideBarContext = createContext<SideContextType>({
  clicked: false,
  setClicked: (value: boolean) => {},
  user: {firstName:"",lastName:""},
  setUser: (value: any) => {},
  inboxClicked: false,
  setInboxClicked: (value: boolean) => {},
  sender: emptyPerson, // Initialize sender as an empty Person object
  setSender: () => {},
  searchTerm:"",
  setSearchTerm:()=>{} // Default empty function for setSender
});

export const SideBarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const [sender, setSender] = useState<Person>(emptyPerson);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Initialize sender with emptyPerson


  

  const [user, setUser] = useState<any>(null);
  const [inboxClicked, setInboxClicked] = useState<boolean>(false);

  const updateClicked = (value: boolean) => {
    setClicked(value);
  };

  return (
    <SideBarContext.Provider
      value={{
        clicked,
        setClicked: updateClicked,
        user,
        setUser,
        inboxClicked,
        setInboxClicked,
        sender,
        setSender,
        searchTerm,
        setSearchTerm // Use setSender to update the state
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
