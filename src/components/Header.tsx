import { Box, Heading, HStack } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";

const Header = () => {
  return (
    <Box
      top={0}
      w={"100%"}
      pos={"fixed"}
      bgColor={"rgba(0, 0, 0, 0.2)"}
      backdropFilter={"blur(5px)"}
    >
      <HStack p={"10px 7%"} justifyContent={"space-between"}>
        <Heading size={"xl"}>Authantication App</Heading>
        <HStack>
          <Register />
          <Login />
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
