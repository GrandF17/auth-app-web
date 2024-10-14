import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import "./styles/App.css";
import GlobalContextProvider from "components/Context";
import Info from "components/Info";

function App() {
  return (
    <ChakraProvider>
      <GlobalContextProvider>
        <Header />
        <Info />
      </GlobalContextProvider>
    </ChakraProvider>
  );
}

export default App;
