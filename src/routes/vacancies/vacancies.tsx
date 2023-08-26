import { 
    AddIcon, Search2Icon 
} from "@chakra-ui/icons"
import { 
    Box, Button, Grid, GridItem, Heading, FormControl, 
    FormLabel, Input, InputGroup, InputLeftElement, 
    Select, useDisclosure, Modal, ModalContent, 
    ModalOverlay, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, useSteps
} from "@chakra-ui/react"
import TableWrapper from "../../components/Table"
import SteppperWrapper from "../../components/Stepper"



const Vacancies = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (<>
        <GridItem mt={3} as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} rowSpan={2}>
            <Box ml={4} ><Heading as={'h4'} size={'md'} >Vacancies</Heading></Box>
            <Box mr={4} ><Button onClick={() => {onOpen()}} rounded={'xl'} variant={'solid'} leftIcon={<AddIcon />} colorScheme='teal' size={'sm'} >Add New</Button></Box>
        </GridItem>
        <GridItem ml={4} rounded={'2xl'} mr={4} mt={3} as={'div'} style={{backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)', display:'grid', alignItems:'center'}} rowSpan={4}>
            <VacanciesSearchBar />
        </GridItem>
        <TableWrapper />
        <ModalWrapper isOpen={isOpen} onClose={onClose} />
    </>)
}

const ModalWrapper:React.FC<any> = ({isOpen, onClose}) => {
    const steps = Array(7).fill({ title: '' })
    const { activeStep, setActiveStep } = useSteps({index: 0, count: steps.length})
    return (
        <Modal size={'6xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay  backdropFilter='blur(10px) hue-rotate(90deg)' />
            <ModalContent>
                <ModalHeader>Add New Vacancy</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SteppperWrapper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const VacanciesSearchBar = () => {
    return (
        <Grid ml={4} gap={10} templateColumns={'repeat(6, 1fr)'}>
            <GridItem colSpan={3} >
                <FormControl>
                    <FormLabel fontSize={'12px'} >What are you looking for ?</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                        <Search2Icon color='gray.300' />
                        </InputLeftElement>
                        <Input variant={'filled'} rounded={'lg'} size={'sm'} type='tel' placeholder='Search for category, name, company, etc' />
                    </InputGroup>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl>
                    <FormLabel fontSize={'12px'} >Category</FormLabel>
                    <Select fontSize={'12px'} size={'sm'} rounded={'lg'} placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl>
                    <FormLabel fontSize={'12px'} >Status</FormLabel>
                    <Select fontSize={'12px'} size={'sm'} rounded='lg' placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'end'}} colSpan={1}>
                <Button rounded={'xl'} pr={8} pl={8} colorScheme='teal' size='sm'>Search</Button>
            </GridItem>
        </Grid>
    )
}

export default Vacancies
