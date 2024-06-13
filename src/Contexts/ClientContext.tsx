// OtherContext.js
import { TimeLike } from "fs";
import { createContext, useState, ReactNode } from "react";
type ClientProviderProps = {
  children: ReactNode;
};
type Flight = {
  CityDep: string;
  CityArr: string;
  Type: string;
  SchedateDep: string;
  SchedateArr: string;
  created_at?: number;
  id?: number;
  TimeDepStart?: TimeLike;
  TimeDepEnd?: TimeLike;
  TimeArrStart?: TimeLike;
  TimeArrEnd?: TimeLike;
  PriceBC: number;
  PriceEC: number;
};
type ClientContextType = {
  vol: Flight | null; // Utilisation de Flight comme type de vol
  setVol: (flight: Flight | null) => void; // La fonction setVol prend désormais un paramètre de type Flight ou null
};

export const ClientContext = createContext<ClientContextType>({
  vol: null,
  setVol: () => {},
});

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [vol, setVol] = useState<Flight | null>(null);

  return (
    <ClientContext.Provider value={{ vol, setVol }}>
      {children}
    </ClientContext.Provider>
  );
};
