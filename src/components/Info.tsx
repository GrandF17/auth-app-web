import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { TimeIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FaUserShield } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Info = () => {
  // Sample data for visualization
  const data = {
    labels: ["Request 1", "Request 2", "Request 3", "Request 4"],
    datasets: [
      {
        label: "Timestamp Progression",
        data: [1609459200, 1609459260, 1609459320, 1609459380], // Example UNIX timestamps
        borderColor: "teal",
        backgroundColor: "teal",
        fill: false,
      },
    ],
  };

  return (
    <Container mt={"100px"} maxW="container.md" py={6}>
      <VStack spacing={6} align="start">
        <Heading>Breaf overview</Heading>
        <Text>
          Our authentication application is designed to provide a secure and
          reliable way of managing user access. The key features include the use
          of JWT (Access Tokens) and Refresh Tokens, password hashing with salt,
          email verification, and protection against replay attacks.
        </Text>
        <Box>
          <Heading size="md" mb={4}>
            Key Features
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FaUserShield} color="green.500" />
              <strong>JWT & Refresh Tokens:</strong> The application uses JWT
              for access and Refresh Tokens for session management, ensuring
              secure user authentication.
            </ListItem>
            <ListItem>
              <ListIcon as={LockIcon} color="blue.500" />
              <strong>Hashed Passwords with Salt:</strong> All passwords are
              stored as hash strings with salt. This adds an extra layer of
              security by making it more difficult to reverse-engineer the
              original password even if the hashed data is compromised.
            </ListItem>
            <ListItem>
              <ListIcon as={EmailIcon} color="purple.500" />
              <strong>Email Verification:</strong> The application requires
              email verification with a code that can be requested once every
              minute.
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="orange.500" />
              <strong>Replay Attack Prevention:</strong> Every action includes a
              timestamp that must be greater than the previous one. Combined
              with SSL/TLS encryption, this prevents attackers from tampering
              with requests.
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Replay Attack Prevention Visualization
          </Heading>
          <Text mb={4}>
            The graph below illustrates how the application prevents replay
            attacks by ensuring that each request contains a progressively
            increasing timestamp.
          </Text>
          <Line data={data} />
        </Box>
      </VStack>
    </Container>
  );
};

export default Info;
