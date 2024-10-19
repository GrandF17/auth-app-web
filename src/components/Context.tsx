import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth, refresh } from "utils/calls";
import { Auth, Hash, Proof } from "utils/interface";
import { getMail, getRT, getJWT } from "utils/localStorage";
import { useIsTouchDevice } from "utils/detect-mobile";
import { timestamp } from "utils/time";
import { isValidToken } from "utils/token";

interface ContextProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<{
  isMobile: boolean | undefined;
  authenticated: boolean;
  root: Hash | undefined;
  RT: Proof | null;
  JWT: Proof | null;
}>({
  isMobile: undefined,
  authenticated: false,
  root: undefined,
  RT: null,
  JWT: null,
});

const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [isMobile, setIsMobile] = useState(undefined as boolean | undefined);
  const [authenticated, setAuthenticated] = useState(false);
  const [root, setRoot] = useState(undefined as Hash | undefined);

  // ===============================
  // ======== local storage ========

  const [mail, setMail] = useState(getMail());
  const [RT, setRT] = useState(getRT());
  const [JWT, setJWT] = useState(getJWT());

  useEffect(() => {
        const handleNewMail = () => setMail(getMail())
        const handleNewJWT = () => setJWT(getJWT())
        const handleNewRT = () => setRT(getRT())

        window.addEventListener("newMail", handleNewMail);
        window.addEventListener("newJWT", handleNewJWT);
        window.addEventListener("newRT", handleNewRT);

        return () => {
            window.removeEventListener("newMail", handleNewMail);
            window.removeEventListener("newJWT", handleNewJWT);
            window.removeEventListener("newRT", handleNewRT);
        };
  }, []);

  // ===============================
  // ======== other effects ========

  useEffect(() => {
    setIsMobile(useIsTouchDevice);
  }, []);

  useEffect(() => {
    if (!root) return;
    setAuthenticated(true);
  }, [root]);

  /**
   * @info refresh handler to get new JWT
   */
  useEffect(() => {
    if (authenticated || !mail) return;

    const callAsync = async () => {
      if (isValidToken(RT) && !isValidToken(JWT)) {
        const result = await refresh({
          mail,
          proof: RT!.proof,
          timestamp: timestamp(),
        } as Auth);

        setJWT(result.response.JWT!);
      }
    };

    callAsync().catch((e) => console.log("ContextErr in refresh: ", e));
  }, [RT, JWT, mail]);

  /**
   * @info auth handler to access DB by JWT
   */
  useEffect(() => {
    if (authenticated || !mail) return;

    const callAsync = async () => {
      if (isValidToken(JWT)) {
        const result = await auth({
          mail,
          proof: JWT!.proof,
          timestamp: timestamp(),
        } as Auth);

        if (result.response.root)
          setRoot(result.response.root as Hash);
      }
    };

    callAsync().catch((e) => console.log("ContextErr in auth: ", e));
  }, [JWT, mail]);

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
        authenticated,
        root,
        RT,
        JWT,
      }}
    >
      {/* here we detect device and only then load components */}
      {isMobile !== undefined && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;
