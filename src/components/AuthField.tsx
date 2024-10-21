import { Button, Container, Heading, HStack, useClipboard, useColorMode, VStack } from "@chakra-ui/react";

import Register from "components/Register";
import Login from "components/Login";
import { useGlobalContext } from "components/Context";
import { CopyIcon } from "@chakra-ui/icons";
import { getEllipsisTxt } from "utils/format";

const AuthField = () => {
    const { authenticated, root } = useGlobalContext();
    const { colorMode } = useColorMode();
    const { onCopy } = useClipboard(root ?? '');

    const darkBgColor = "rgba(255, 255, 255, 0.7)";
    const lightBgColor = "rgba(0, 0, 0, 0.7)";

    return (
        <Container mt={"100px"} maxW="container.md" py={6}>
            <VStack
                mt={'200px'}
                bgColor={colorMode == "dark" ? lightBgColor : darkBgColor}
                backdropFilter={"blur(5px)"}
                justifyContent={"center"}
                borderRadius={'30px'}
            >
                <Heading mt={"5px"} size={'xl'}>HOVER IMAGES TO LEARN MORE!</Heading>
                <HStack p={"10px 20px"}>
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
            </VStack>
        </Container>


    );
};

export default AuthField;