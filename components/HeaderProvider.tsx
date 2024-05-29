"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IHeaderContextProp {
  headerHeight: number;
  setHeaderHeight: Dispatch<SetStateAction<number>>;
}

const HeaderHeightContext = createContext<IHeaderContextProp>(
  {} as IHeaderContextProp
);

export const HeaderHeightProvider = ({ children }: { children: ReactNode }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <HeaderHeightContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderHeightContext.Provider>
  );
};

export const useHeaderHeight = () => {
  return useContext(HeaderHeightContext) as IHeaderContextProp;
};
