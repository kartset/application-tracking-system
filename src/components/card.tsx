import { Box, Button, Flex, Link, chakra, useDisclosure } from "@chakra-ui/react";
import { ApplyModal } from "./Modal/modal";
import { jobProps } from "../routes/jobs/list";

interface cardProps {
    jobData : jobProps
}

const Card:React.FC<cardProps> = ({ jobData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex bg="#edf3f8" _dark={{bg: "#3e3e3e",}} p={50} pt={0} w="full" 
            alignItems="center" justifyContent="center"
        >
            <Box mx="auto" px={8} py={4} rounded="lg" shadow="lg" bg="white" _dark={{ bg: "gray.800"}}>
                <Flex justifyContent="space-between" alignItems="center">
                    <chakra.span fontSize="sm" color="gray.600" _dark={{ color: "gray.400"}}>
                        {jobData.datePosted}
                    </chakra.span>
                    <Flex>
                        <Link
                            px={3} mr={2} py={1} bg="gray.600" color="gray.100" fontSize="sm" 
                            fontWeight="700" rounded="md"  _hover={{ bg: "gray.500" }}
                        >
                            {jobData.jobExperienceLevel}
                        </Link>
                        <Link
                            px={3} mr={2} py={1} bg="gray.600" color="gray.100" fontSize="sm" 
                            fontWeight="700" rounded="md"  _hover={{ bg: "gray.500" }}
                        >
                            {jobData.jobType}
                        </Link>
                        <Link
                        px={3} py={1} bg="gray.600" color="gray.100" fontSize="sm" 
                        fontWeight="700" rounded="md"  _hover={{ bg: "gray.500" }}
                    >
                        {jobData.jobArea}
                    </Link>
                    </Flex>
                </Flex>

                <Box mt={2}>
                    <Link fontSize="2xl" color="gray.700" _dark={{ color: "white" }} fontWeight="700"
                        _hover={{ color: "gray.600", _dark: { color: "gray.200"}, textDecor: "none" }}
                    >
                        {jobData.jobTitle}
                    </Link>
                    <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                        {jobData.jobDescription}
                    </chakra.p>
                </Box>

                <Flex justifyContent="end" alignItems="center" mt={4}>
                    <Button onClick={() => {onOpen()}} size={'sm'} colorScheme="blue" >Apply</Button>
                </Flex>
            </Box>
            <ApplyModal modalTitle={'Apply'} isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}

export default Card
