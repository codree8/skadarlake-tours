import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { MdCancel } from "react-icons/md"; 
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, red.400, red.500)"
              backgroundClip="text"
            >
                <MdCancel /> Denied Access
            </Heading>

            <Text fontSize="18px" mt={3} mb={2}>
                Only Admin Can Access This Page
            </Text>

            <Text color={"gray.500"} mb={6}>
                You do not have the necessary permissions to view this page.
            </Text>

            <Button
              colorScheme="blue"
              bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
              color="white"
              variant="solid"
              onClick={() => navigate("/")}
            >
                Go to Home 
            </Button>
        </Box>
    );
}
