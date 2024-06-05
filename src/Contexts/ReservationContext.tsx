import { createContext, useState, ReactNode, FC } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}

const Forma = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address1: "",
  address2: "",
};

type ReservationProviderProps = {
  children: ReactNode;
};

type ReservationContextType = {
  bookBusinessClass: boolean;
  setBookBusinessClass: (value: boolean) => void;
  bookEconomyClass: boolean;
  setBookEconomyClass: (value: boolean) => void;
  firstFields: FormData;
  setFirstFields: (name: FormData) => void;
  CounterAdult: number;
  CounterJeune: number;
  CounterBébé: number;
  CounterEnfant: number;
  setCounterBébé: (name: number) => void;
  setCounterAdult: (name: number) => void;
  setCounterEnfant: (name: number) => void;
  setCounterJeune: (name: number) => void;
};

// Crée le contexte avec des valeurs par défaut
export const ReservationContext = createContext<ReservationContextType>({
  bookBusinessClass: false,
  setBookBusinessClass: () => {},
  bookEconomyClass: false,
  setBookEconomyClass: () => {},
  firstFields: Forma,
  setFirstFields: (name: FormData) => {},
  CounterAdult: 0,
  CounterJeune: 0,
  CounterBébé: 0,
  CounterEnfant: 0,
  setCounterBébé: (name: number) => {},
  setCounterAdult: (name: number) => {},
  setCounterEnfant: (name: number) => {},
  setCounterJeune: (name: number) => {},
});

// Crée le provider
export const ReservationProvider: FC<ReservationProviderProps> = ({
  children,
}) => {
  const [bookBusinessClass, setBookBusinessClass] = useState<boolean>(false);
  const [bookEconomyClass, setBookEconomyClass] = useState<boolean>(false);
  const [firstFields, setFirstFields] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
  });
  const [CounterBébé, setCounterBébé] = useState<number>(0);
  const [CounterAdult, setCounterAdult] = useState<number>(0);
  const [CounterJeune, setCounterJeune] = useState<number>(0);
  const [CounterEnfant, setCounterEnfant] = useState<number>(0);

  return (
    <ReservationContext.Provider
      value={{
        bookBusinessClass,
        setBookBusinessClass,
        bookEconomyClass,
        setBookEconomyClass,
        firstFields,
        setFirstFields,
        CounterBébé,
        CounterEnfant,
        CounterAdult,
        CounterJeune,
        setCounterBébé,
        setCounterEnfant,
        setCounterAdult,
        setCounterJeune,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
