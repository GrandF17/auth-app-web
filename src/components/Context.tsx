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

  // local storage values:
  const [mail, setMail] = useState(getMail());
  const [RT, setRT] = useState(getRT());
  const [JWT, setJWT] = useState(getJWT());

  /////////////////////////////////

  const isNotExpired = (timestamp_: number) => {
    return timestamp_ > timestamp();
  };

  const isValidToken = (token: Proof | null) => {
    return token && isNotExpired(token.expires);
  };

  /////////////////////////////////

  useEffect(() => {
    setIsMobile(useIsTouchDevice);
  }, []);

  /**
   * @info refresh handler to get new JWT
   */
  useEffect(() => {
    const callAsync = async () => {
      // if no email in local store or already authenticated no need to refresh
      if (authenticated || !mail) return;
      // no need to call if JWT is valid
      if (isValidToken(JWT)) return;
      // call only if RT is valid
      if (!isValidToken(RT)) return;

      console.log("RT: ", RT);

      const now = timestamp();
      const result = await refresh({
        mail,
        proof: RT!.proof,
        timestamp: now,
      } as Auth);

      setJWT(result.response.JWT!);
    };

    callAsync().catch((e) => {
      console.log("Error in refresh in Context: ", e);
    });
  }, [RT, JWT, mail]);

  /**
   * @info auth handler to access DB by JWT
   */
  useEffect(() => {
    const callAsync = async () => {
      // if no email in local store or already authenticated no need to refresh
      if (authenticated || !mail) return;
      // call only if JWT is valid
      if (!isValidToken(JWT)) return;

      console.log("JWT: ", JWT);

      const now = timestamp();
      const result = await auth({
        mail,
        proof: JWT!.proof,
        timestamp: now,
      } as Auth);

      if (result.response.root) setRoot(result.response.root as Hash);
    };

    callAsync().catch((e) => {
      console.log("Error in auth in Context: ", e);
    });
  }, [JWT, mail]);

  /**
   * @info set authenticated status to true
   */
  useEffect(() => {
    if (!root) return;

    setAuthenticated(true);
    console.log("Your root: ", root);
  }, [root]);

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
