import { Box, Button, Flex, Link, chakra } from "@chakra-ui/react";


const Card = () => {
    return (
        <Flex bg="#edf3f8" _dark={{bg: "#3e3e3e",}} p={50} pt={0} w="full" 
            alignItems="center" justifyContent="center"
        >
            <Box mx="auto" px={8} py={4} rounded="lg" shadow="lg" bg="white" _dark={{ bg: "gray.800"}}>
                <Flex justifyContent="space-between" alignItems="center">
                    <chakra.span fontSize="sm" color="gray.600" _dark={{ color: "gray.400"}}>
                        July 15, 2023
                    </chakra.span>
                    <Flex>
                        <Link
                            px={3} mr={2} py={1} bg="gray.600" color="gray.100" fontSize="sm" 
                            fontWeight="700" rounded="md"  _hover={{ bg: "gray.500" }}
                        >
                            Full-Time
                        </Link>
                        <Link
                        px={3} py={1} bg="gray.600" color="gray.100" fontSize="sm" 
                        fontWeight="700" rounded="md"  _hover={{ bg: "gray.500" }}
                    >
                        Tech
                    </Link>
                    </Flex>
                </Flex>

                <Box mt={2}>
                    <Link fontSize="2xl" color="gray.700" _dark={{ color: "white" }} fontWeight="700"
                        _hover={{ color: "gray.600", _dark: { color: "gray.200"}, textDecor: "none" }}
                    >
                        Full Stack Engineer
                    </Link>
                    <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                        expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
                        enim reprehenderit nisi, accusamus delectus nihil quis facere in modi
                        ratione libero!
                    </chakra.p>
                </Box>

                <Flex justifyContent="end" alignItems="center" mt={4}>
                    <Button size={'sm'} colorScheme="blue" >Apply</Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Card
