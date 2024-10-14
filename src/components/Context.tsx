import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useIsTouchDevice } from "utils/detect-mobile";

interface ContextProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<{
  isMobile: boolean | undefined;
}>({
  isMobile: undefined,
});

const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [isMobile, setIsMobile] = useState(undefined as boolean | undefined);

  useEffect(() => {
    setIsMobile(useIsTouchDevice);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
      }}
    >
      {/* here we detect device and only then load components */}
      {isMobile !== undefined && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;
