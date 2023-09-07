import { 
    AddIcon, Search2Icon, SmallCloseIcon 
} from "@chakra-ui/icons"
import { 
    Box, Button, Grid, GridItem, Heading, FormControl, 
    FormLabel, Input, InputGroup, InputLeftElement, 
    Select, useDisclosure, Modal, ModalContent, 
    ModalOverlay, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, useSteps, useToast, 
    Flex, Switch, Text, Checkbox, InputLeftAddon, 
    Tag, TagLabel, TagRightIcon, ListItem, OrderedList, 
    Stack, CheckboxGroup,
} from "@chakra-ui/react"
import TableWrapper from "../../components/Table"
import SteppperWrapper from "../../components/Stepper"
import { useEffect, useState } from "react"
import Editor from "../../components/Editor/Editor"
import CreatableSelect from 'react-select/creatable';

const steps = Array(6).fill({ title: '' })

const Vacancies = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { activeStep, setActiveStep } = useSteps({index: 0, count: steps.length})
    return (<>
        <GridItem mt={3} as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} rowSpan={2}>
            <Box ml={4} ><Heading as={'h4'} size={'md'} >Vacancies</Heading></Box>
            <Box mr={4} ><Button onClick={() => {onOpen()}} rounded={'xl'} variant={'solid'} leftIcon={<AddIcon />} colorScheme='teal' size={'sm'} >Add New</Button></Box>
        </GridItem>
        <GridItem ml={4} rounded={'2xl'} mr={4} mt={3} as={'div'} style={{backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)', display:'grid', alignItems:'center'}} rowSpan={4}>
            <VacanciesSearchBar />
        </GridItem>
        <TableWrapper />
        <ModalWrapper isOpen={isOpen} onClose={onClose} activeStep={activeStep} setActiveStep={setActiveStep} />
    </>)
}

const ModalWrapper:React.FC<any> = ({isOpen, onClose, activeStep, setActiveStep}) => {
    const toast = useToast()

    const onSubmit = () => {
        console.log('on submit')
        onClose()
        toast({
            title:'Success', 
            status:'success', 
            position:'top-right', 
            description:'Application Submitted Successfully', 
            isClosable:true, 
            duration:1500
        })
    }

    useEffect(() => {
        setActiveStep(0)
    }, [isOpen])
    

    return (
        <Modal size={'4xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay  backdropFilter='blur(10px) hue-rotate(90deg)' />
            <ModalContent minHeight={'80vh'} >
                <ModalHeader>Add New Vacancy</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SteppperWrapper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
                    { 
                        activeStep === 0 ? 
                            <JobPostFormOne /> 
                        : activeStep === 1 ? <JobPostFormTwo /> 
                        : activeStep === 2 ? <JobsFormThree /> 
                        : activeStep === 3 ? <JobsFormFour /> 
                        : activeStep === 4 ? <JobsFormFive />
                        : <JobsFormSix />
                    }
                </ModalBody>
                <ModalFooter gap={3}>
                    <Button variant={'outline'} size={'sm'} colorScheme='blue'
                        onClick={() => {
                            if(activeStep === 0) {
                                onClose()
                            } else {
                                setActiveStep(activeStep-1)
                            }
                        } }
                    >
                        Back
                    </Button>
                    <Button size={'sm'} variant={'unstyled'} mr={3} onClick={onClose}>Close</Button>
                    <Button size={'sm'} colorScheme='teal'
                        onClick={() => {
                            if(activeStep < steps.length-1) {
                                setActiveStep(activeStep+1) 
                            } else {
                                onSubmit()
                                setActiveStep(activeStep+1)
                            }
                        } }
                    >
                        Next
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const JobPostFormOne = () => {
    return (
        <Flex gap={4} flexDirection={'row'}>
            <Flex gap={4} ml={4} flex={1} mt={4} alignItems={'start'} flexDirection={'column'}>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Job Title</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job title is a name or designation given to a job or position</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Job Position</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job position is a function you serve at a company</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Job Type</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job type defines the accounting behavior for the related job</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Job Location</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job location usually means where the job is performed</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Department</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >Department is one part of a large organization</Box>
                </Flex>
            </Flex>
            <Flex ml={4} gap={4} flex={1} mt={4} flexDirection={'column'} >
                <Flex flex={1} justifyContent={'start'} alignItems={'center'}>
                    <Input width={'75%'} placeholder="Enter Job Title" rounded={'lg'} size={'sm'} />
                </Flex>
                <Flex flex={1} justifyContent={'start'} alignItems={'center'} >
                    <Select width={'75%'} rounded={'lg'} size={'sm'} placeholder='Select option'>
                        <option value='option1'>Fresher</option>
                        <option value='option2'>Associate</option>
                        <option value='option3'>Senior</option>
                        <option value='option4'>Executive</option>
                        <option value='option5'>Advisory</option>
                        <option value='option6'>Add New...</option>
                    </Select>
                </Flex>
                <Flex flex={1} justifyContent={'start'} alignItems={'center'} >
                    <Select width={'75%'} rounded={'lg'} size={'sm'} placeholder='Select option'>
                        <option value='option1'>Freelance</option>
                        <option value='option2'>Full-Time</option>
                        <option value='option3'>Part-Time</option>
                        <option value='option4'>Contractual</option>
                        <option value='option5'>Internship</option>
                        <option value='option6'>Seasonal</option>
                        <option value='option7'>Add New...</option>
                    </Select>
                </Flex>
                <Flex flex={1} flexDirection={'column'}  justifyContent={'start'} >
                    <Input width={'75%'} rounded={'lg'} placeholder="Job Location" size={'sm'} />  {/*make it a google places api with city or region selection */}
                    <Checkbox size={'sm'} defaultChecked>Remote Friendly</Checkbox>
                </Flex>
                <Flex flex={1} justifyContent={'start'} alignItems={'center'} >
                    <Select width={'75%'} rounded={'lg'} size={'sm'} placeholder='Select option'>
                        <option value='option1'>Sales</option>
                        <option value='option2'>Marketing</option>
                        <option value='option3'>Design</option>
                        <option value='option4'>Engineering</option>
                    </Select>
                </Flex>
            </Flex>
        </Flex>
    )
}

const JobPostFormTwo = () => {
    return (<>
        <Flex gap={4} flexDirection={'row'}>
            <Flex gap={4} ml={4} alignItems={'start'} flex={1} mt={4} flexDirection={'column'}>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Number of Vacancies</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job title must describe one job post</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Work Hours</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >The amount of time employee would spend at work during a day</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Salary Range</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A salary range is the range of pay offered for performing a job.</Box>
                </Flex>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Equity</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job title must describe one job post</Box>
                </Flex>
            </Flex>
            <Flex gap={4} mt={4} flex={1} flexDirection={'column'}>
                <Flex gap={1} flexDirection={'column'} justifyContent={'center'} flex={1}>
                    <Input width={'75%'} placeholder="Enter Job Title" rounded={'lg'} size={'sm'} />
                    <Checkbox>Hiring Only Women </Checkbox>
                </Flex>
                <Flex gap={2} justifyContent={'center'} alignItems={'center'} flex={1} >
                    <Select rounded={'lg'} size={'sm'} placeholder='Select'>
                        { [0,1,2,3,4,5,6,7,8,9,10,11,12].map((a,i) => {
                            return (<option value={'option' + i}>{a}</option>)
                        })}
                    </Select>
                    <Select defaultValue={'option1'} rounded={'lg'} size={'sm'} placeholder='Select'>
                        <option value={'option1'}>a.m.</option>
                        <option value={'option2'}>p.m.</option>
                    </Select>
                    <Text>-</Text>
                    <Select rounded={'lg'} size={'sm'} placeholder='Select'>
                        { [0,1,2,3,4,5,6,7,8,9,10,11,12].map((a,i) => {
                            return (<option value={'option' + i}>{a}</option>)
                        })}
                    </Select>
                    <Select defaultValue={'option2'} rounded={'lg'} size={'sm'} placeholder='Select'>
                        <option value={'option1'}>a.m.</option>
                        <option value={'option2'}>p.m.</option>
                    </Select>
                </Flex>
                <Flex gap={1} flexDirection={'column'} justifyContent={'center'} flex={1}>
                    <Flex gap={2}>
                        <Select rounded={'lg'} size={'sm'}>
                            <option value={'option1'}>Hourly</option>
                            <option value={'option2'}>Weekly</option>
                            <option value={'option2'}>Monthly</option>
                            <option value={'option2'}>Full Time</option>
                        </Select>
                        <InputGroup size={'sm'} >
                            <InputLeftAddon rounded={'lg'} children='$' />
                            <Input type='tel' rounded={'lg'} placeholder='Salary' />
                        </InputGroup>
                        <Text>-</Text>
                        <InputGroup size={'sm'}>
                            <InputLeftAddon rounded={'lg'} children='$' />
                            <Input type='tel' rounded={'lg'} placeholder='Salary' />
                        </InputGroup>
                    </Flex>
                    <Checkbox defaultChecked>Negotiable</Checkbox>
                </Flex>
                <Flex gap={2} justifyContent={'center'} alignItems={'center'} flex={1}>
                    <Input placeholder="Enter Job Title" rounded={'lg'} size={'sm'} />
                    <Text>-</Text>
                    <Input placeholder="Enter Job Title" rounded={'lg'} size={'sm'} />
                    
                </Flex>
            </Flex>
        </Flex>
        <Flex mt={4} gap={4} justifyContent={'end'} alignItems={'end'}>
            <Box fontSize={'20px'} ><b>Immediate Joining</b></Box>
            <Flex justifyContent={'center'} alignItems={'center'}>
                <Switch id='immediate-joining' />
            </Flex>
        </Flex>
    </>)
}

const JobsFormThree = () => {
    return (
        <Flex mt={4} justifyContent={'center'} flexDirection={'row'}>
            <Flex flex={1} flexDirection={'column'}>
                <Flex justifyContent={'start'} flex={1} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Skils</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >A job title must describe one job post</Box>
                </Flex>
            </Flex>
            <Flex flexDirection={'column'} >
                <Flex gap={2} flex={1} flexDirection={'column'} >
                    <CreatableSelect isClearable options={[]} />
                    <Flex gap={2}>
                        {['md', 'md', 'md','md', 'md'].map((size) => (
                            <Tag size={size} key={size} variant='subtle' colorScheme='cyan'>
                                <TagLabel>JavaScript</TagLabel>
                                <TagRightIcon cursor={'pointer'} onClick={() => {console.log('remove tag')}} boxSize='12px' as={SmallCloseIcon} />
                            </Tag>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

const JobsFormFour = () => {
    const [HTML, setHTML] = useState<string>(JSON.stringify('<span></span>'))    
    return (
        <Editor setHTML={setHTML} />
        // {/* <div dangerouslySetInnerHTML={{__html:JSON.parse(HTML)}} ></div> */}
    )
}

const JobsFormFive = () => {
    const [questions, setQuestions] = useState<number>(2)

    return (
        <Flex mt={4} justifyContent={'center'} flexDirection={'row'}>
            <Flex flex={1} mt={4} justifyContent={'start'} flexDirection={'column'} >
                <Box fontSize={'20px'} ><b>Questions</b></Box>
                <Box fontSize={'14px'} color={'#4C5A6D'} >A job title must describe one job post</Box>
            </Flex>
            <Flex flex={1} gap={2} flexDirection={'column'} >
                <OrderedList gap={2} mt={4}>
                    {Array(questions).fill({}).map(a =>{
                        return(<ListItem mb={2} ><Input placeholder="Enter a Question" /></ListItem>)
                    })}
                </OrderedList>
                <Flex>
                    <Button onClick={() =>{setQuestions(questions+1)}} size={'sm'} colorScheme="blue" >Add New</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

const JobsFormSix = () => {
    const [value, setValue] = useState<(string | number)[]>(['1'])
    return (
        <Flex mt={4} justifyContent={'center'} flexDirection={'row'}>
            <CheckboxGroup onChange={(value) => setValue(value)} value={value}>
                <Stack direction='column'>
                    <Checkbox value='1'>Make it public</Checkbox>
                    <Checkbox value='2'>Share it using the link</Checkbox>
                </Stack>
            </CheckboxGroup>
        </Flex>
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
