import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { login } from "utils/calls";
import { Mail } from "utils/interface";
import { protectPassword } from "utils/security";
import { timestamp } from "utils/time";
import { saveEmail, saveJWT, saveRT } from "utils/localStorage";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mail, setMail] = useState("");
  const [correctMail, setCorrectEmail] = useState(false);
  const [passwd, setPasswd] = useState("");
  const [show, setShow] = useState(true);

  useEffect(() => {
    let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
    const match = mail.match(regexp);
    setCorrectEmail(match !== null && match[0].length == mail.length);
  }, [mail]);

  return (
    <>
      <Button m={"10px"} onClick={onOpen}>
        Login
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="flushed"
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <InputGroup size="md">
              <Input
                mt={"5px"}
                variant="flushed"
                placeholder="Password"
                type={show ? "text" : "password"}
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
              />
              <InputRightElement mt={"5px"}>
                <Button bgColor={"transparent"} onClick={() => setShow(!show)}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              h={"35px"}
              width={"100%"}
              disabled={!(correctMail && passwd.length > 0)}
              onClick={async () => {
                const result = await login({
                  mail: mail as Mail,
                  password: protectPassword(passwd),
                  timestamp: timestamp(),
                });

                console.log(result);
                if (result.response.success) {
                  saveEmail(mail as Mail);
                  saveJWT(result.response);
                  saveRT(result.response);
                }
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
