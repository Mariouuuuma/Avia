import { createContext, useState, ReactNode } from "react";

type SideBarProviderProps = {
  children: ReactNode; 
};

type SideContextType = {
  clicked: boolean;
  setClicked: (value: boolean) => void;  
  user:any;
  setUser:(value:any)=>void;
  inboxClicked:boolean;
  setInboxClicked:(value: boolean) => void;  

}
export const SideBarContext = createContext<SideContextType>({
  clicked: false,
  setClicked: (value: boolean) => {}, 
  user:null, 
  setUser:(value:any)=>{},
  inboxClicked:false,
  setInboxClicked:(value: boolean) =>{}
});

export const SideBarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [inboxClicked, setInboxClicked] = useState<boolean>(false);
  const updateClicked = (value: boolean) => {
    setClicked(value); 
  };

  return (
    <SideBarContext.Provider value={{ clicked, setClicked: updateClicked ,user,setUser,  inboxClicked,
      setInboxClicked}}>
      {children}
    </SideBarContext.Provider>
  );
};
