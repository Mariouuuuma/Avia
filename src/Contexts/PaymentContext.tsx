import { Moment } from "moment";
import { createContext, useState, ReactNode, FC } from "react";

interface Payment {
  codePromo: number;
  masterCard: boolean;
  visa: boolean;
  cardNumber: number;
  SecurityCode: number;
  Expiry: Moment | null;
  NameOnCard: string;
  cardHolderEmail: string;
  cardHolderPhone: number;
}

const PaymentForm: Payment = {
  codePromo: 0,
  masterCard: false,
  visa: false,
  cardNumber: 0,
  SecurityCode: 0,
  Expiry: null,
  NameOnCard: "",
  cardHolderEmail: "",
  cardHolderPhone: 0o0,
};

type ReservationProviderProps = {
  children: ReactNode;
};

type PaymentContextType = {
  paymentForm: Payment;
  setpaymentForm: (payment: Payment) => void;
};

export const PaymentContext = createContext<PaymentContextType>({
  paymentForm: PaymentForm!,
  setpaymentForm: (payment: Payment) => {},
});

export const ReservationProvider: FC<ReservationProviderProps> = ({
  children,
}) => {
  const [bookBusinessClass, setBookBusinessClass] = useState<boolean>(false);
  const [paymentForm, setpaymentForm] = useState<Payment>(PaymentForm);

  return (
    <PaymentContext.Provider
      value={{
        paymentForm,
        setpaymentForm,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
