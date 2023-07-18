import { Center, Flex, Heading, Text } from "@chakra-ui/react";

export default function ErrorPage() {

  return (
    <Center style={{marginTop:'15px'}}>
        <Flex flexDirection={'column'} id="error-page">
          <Heading>Oops!</Heading>
          <Text>Sorry, an unexpected error has occurred.</Text>
        </Flex>
      </Center>
  );
}