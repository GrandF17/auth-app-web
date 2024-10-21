import { ChakraProvider, CSSReset, Divider } from "@chakra-ui/react";
import "./styles/App.css";
import GlobalContextProvider from "components/Context";
import Info from "components/Info";
import { useState } from "react";
import AuthField from "components/AuthField";
import Footer from "components/Footer";

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ChakraProvider>
      <CSSReset />
      <GlobalContextProvider>
        <Info />
        <AuthField />
        <Footer />
      </GlobalContextProvider>
    </ChakraProvider>
  );
}

export default App;
