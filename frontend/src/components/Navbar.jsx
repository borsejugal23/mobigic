import { Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      height="60px" 
      boxShadow="md"
      bg="white" 
    >
      <Link as={RouterLink} to="/">
        <Text fontSize="xl" fontWeight="bold" color="blue.500" textDecoration="none">
          Register
        </Text>
      </Link>
      <Link as={RouterLink} to="/login">
        <Text fontSize="xl" fontWeight="bold" color="blue.500" textDecoration="none">
          Login
        </Text>
      </Link>
    </Flex>
  );
};
