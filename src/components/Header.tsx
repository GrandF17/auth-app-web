import { Box, Button, Heading, HStack, useClipboard } from "@chakra-ui/react";

import Register from "components/Register";
import Login from "components/Login";
import { useGlobalContext } from "components/Context";
import { CopyIcon } from "@chakra-ui/icons";
import { getEllipsisTxt } from "utils/format";
import { getMail } from "utils/localStorage";

const Header = () => {
  const { authenticated, root } = useGlobalContext();
  const { onCopy } = useClipboard(root ?? '');
  
  
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
        {authenticated ? (
          <HStack>
            <Heading>{getEllipsisTxt(root, 4)}</Heading>
            <Button bgColor={'transparent'} onClick={onCopy}><CopyIcon /></Button>
          </HStack>
        ) : (
          <HStack>
            <Register />
            <Login />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default Header;
