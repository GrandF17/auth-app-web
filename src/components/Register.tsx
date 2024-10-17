import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
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
import { useEffect, useState } from "react";
import { getCode, register } from "utils/calls";
import { Mail } from "utils/interface";
import { protectPassword } from "utils/security";

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // basic inputs
  const [mail, setMail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdR, setPasswdR] = useState("");
  const [correctEmail, setCorrectEmail] = useState(false);
  const [passwordsEq, setPasswordsEq] = useState(true);

  // show/blur password
  const [show, setShow] = useState(true);

  // mail verification inputs
  const [code, setCode] = useState("");

  useEffect(() => {
    let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
    const match = mail.match(regexp);
    setCorrectEmail(match !== null && match[0].length == mail.length);
  }, [mail]);

  useEffect(() => {
    setPasswordsEq(passwd === passwdR);
  }, [passwd, passwdR]);

  return (
    <>
      <Button m={"10px"} onClick={onOpen}>
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Input
              variant="flushed"
              placeholder="Email"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />

            <InputGroup>
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

            <Input
              mt={"5px"}
              variant="flushed"
              placeholder="Repeat password"
              type={show ? "text" : "password"}
              value={passwdR}
              errorBorderColor={"red.300"}
              isInvalid={!passwordsEq}
              onChange={(e) => setPasswdR(e.target.value)}
            />

            <HStack mt={"20px"}>
              <Input
                mt={"5px"}
                w={"100px"}
                variant="flushed"
                placeholder="Code"
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value.slice(0, 6))}
              />
              <Button
                disabled={!correctEmail}
                onClick={() => {
                  const resp = getCode(mail as Mail);
                  console.log(resp);
                }}
              >
                Send code
              </Button>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              h={"35px"}
              width={"100%"}
              onClick={() => {
                const resp = register({
                  mail: mail as Mail,
                  password: protectPassword(passwd),
                  verificationCode: Number(code),
                });
                console.log(resp);
              }}
              disabled={!(correctEmail && passwordsEq && code.length == 6)}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;
