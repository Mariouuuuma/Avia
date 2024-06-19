import { createContext, useState, ReactNode, FC } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}

const initialFormData: FormData = {
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
  bookBusinessClassReturn: boolean;
  setBookBusinessClassReturn: (value: boolean) => void;
  bookEconomyClassReturn: boolean;
  setBookEconomyClassReturn: (value: boolean) => void;
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
  CounterAdultReturn: number;
  CounterJeuneReturn: number;
  CounterBébéReturn: number;
  CounterEnfantReturn: number;
  setCounterBébéReturn: (name: number) => void;
  setCounterAdultReturn: (name: number) => void;
  setCounterEnfantReturn: (name: number) => void;
  setCounterJeuneReturn: (name: number) => void;
  Form1: FormData;
  setForm1: (form: FormData) => void;
  Form2: FormData;
  setForm2: (form: FormData) => void;
  Devise: string;
  setDevise: (devise: string) => void;
  DeviseReturn: string;
  setDeviseReturn: (devise: string) => void;
  FN: string;
  setFN: (FN: string) => void;
  LN: string;
  setLN: (LN: string) => void;
  ServiceLounge: boolean;
  setServiceLounge: (name: boolean) => void;
  totalServiceLounge: number;
  settotalServiceLounge: (name: number) => void;
  selectedSeat: string;
  setSelectedSeat: (name: string) => void;
  chosenSeatDep: string[];
  setChosenSeatDep: (names: string[]) => void;
  chosenSeatArr: string[];
  setChosenSeatArr: (names: string[]) => void;
};

export const ReservationContext = createContext<ReservationContextType>({
  bookBusinessClass: false,
  bookBusinessClassReturn: false,
  setBookBusinessClass: () => {},
  setBookBusinessClassReturn: () => {},
  bookEconomyClass: false,
  bookEconomyClassReturn: false,

  setBookEconomyClass: () => {},
  setBookEconomyClassReturn: () => {},
  firstFields: initialFormData,
  setFirstFields: (name: FormData) => {},
  CounterAdult: 0,
  CounterAdultReturn: 0,
  CounterJeune: 0,
  CounterJeuneReturn: 0,
  CounterBébé: 0,
  CounterBébéReturn: 0,
  CounterEnfant: 0,
  CounterEnfantReturn: 0,
  setCounterBébé: (name: number) => {},
  setCounterBébéReturn: (name: number) => {},
  setCounterAdult: (name: number) => {},
  setCounterAdultReturn: (name: number) => {},
  setCounterEnfant: (name: number) => {},
  setCounterEnfantReturn: (name: number) => {},
  setCounterJeune: (name: number) => {},
  setCounterJeuneReturn: (name: number) => {},
  Form1: initialFormData,
  setForm1: (form: FormData) => {},
  Form2: initialFormData,
  setForm2: (form: FormData) => {},
  Devise: "",
  setDevise: (name: string) => {},
  DeviseReturn: "",
  setDeviseReturn: (name: string) => {},
  FN: "",
  setFN: (FN: string) => {},
  LN: "",
  setLN: (LN: string) => {},
  ServiceLounge: false,
  setServiceLounge: (name: boolean) => {},
  totalServiceLounge: 0,
  settotalServiceLounge: (name: number) => {},
  selectedSeat: "",
  setSelectedSeat: (name: string) => {},
  chosenSeatDep: [],
  setChosenSeatDep: (names: string[]) => {},
  chosenSeatArr: [""],
  setChosenSeatArr: (names: string[]) => {},
});

export const ReservationProvider: FC<ReservationProviderProps> = ({
  children,
}) => {
  const [bookBusinessClass, setBookBusinessClass] = useState<boolean>(false);
  const [bookBusinessClassReturn, setBookBusinessClassReturn] =
    useState<boolean>(false);

  const [Form1, setForm1] = useState<FormData>(initialFormData);
  const [Form2, setForm2] = useState<FormData>(initialFormData);
  const [bookEconomyClass, setBookEconomyClass] = useState<boolean>(false);
  const [bookEconomyClassReturn, setBookEconomyClassReturn] =
    useState<boolean>(false);
  const [firstFields, setFirstFields] = useState<FormData>(initialFormData);
  const [CounterBébé, setCounterBébé] = useState<number>(0);
  const [CounterAdult, setCounterAdult] = useState<number>(0);
  const [CounterJeune, setCounterJeune] = useState<number>(0);
  const [CounterEnfant, setCounterEnfant] = useState<number>(0);
  const [CounterBébéReturn, setCounterBébéReturn] = useState<number>(0);
  const [CounterAdultReturn, setCounterAdultReturn] = useState<number>(0);
  const [CounterJeuneReturn, setCounterJeuneReturn] = useState<number>(0);
  const [CounterEnfantReturn, setCounterEnfantReturn] = useState<number>(0);
  const [FN, setFN] = useState<string>("");
  const [LN, setLN] = useState<string>("");
  const [ServiceLounge, setServiceLounge] = useState<boolean>(false);
  const [totalServiceLounge, settotalServiceLounge] = useState<number>(0);

  const [selectedSeat, setSelectedSeat] = useState<string>("");
  const [Devise, setDevise] = useState<string>("");
  const [DeviseReturn, setDeviseReturn] = useState<string>("");

  const [chosenSeatDep, setChosenSeatDep] = useState<string[]>([]);
  const [chosenSeatArr, setChosenSeatArr] = useState<string[]>([]);

  return (
    <ReservationContext.Provider
      value={{
        bookBusinessClass,
        setBookBusinessClass,
        bookEconomyClass,
        setBookEconomyClass,
        bookBusinessClassReturn,
        setBookBusinessClassReturn,
        bookEconomyClassReturn,
        setBookEconomyClassReturn,
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
        Form1,
        setForm1,
        CounterBébéReturn,
        CounterEnfantReturn,
        CounterAdultReturn,
        CounterJeuneReturn,
        setCounterBébéReturn,
        setCounterEnfantReturn,
        setCounterAdultReturn,
        setCounterJeuneReturn,
        Form2,
        setForm2,
        Devise,
        setDevise,
        LN,
        setLN,
        FN,
        setFN,
        ServiceLounge,
        setServiceLounge,
        totalServiceLounge,
        settotalServiceLounge,
        selectedSeat,
        setSelectedSeat,
        chosenSeatDep,
        setChosenSeatDep,
        chosenSeatArr,
        setChosenSeatArr,
        DeviseReturn,
        setDeviseReturn,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
