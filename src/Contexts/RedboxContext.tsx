import React, { createContext, useState, ReactNode } from "react";

interface RedboxContextProps {
  redbox: boolean;
  setRedbox: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RedboxContext = createContext<RedboxContextProps>({
  redbox: false,
  setRedbox: () => {},
});

export const RedboxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [redbox, setRedbox] = useState<boolean>(false);

  return (
    <RedboxContext.Provider value={{ redbox, setRedbox }}>
      {children}
    </RedboxContext.Provider>
  );
};
