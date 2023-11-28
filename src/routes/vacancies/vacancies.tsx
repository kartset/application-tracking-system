import { 
    AddIcon, Search2Icon, SmallCloseIcon 
} from "@chakra-ui/icons"
import { 
    Box, Button, Grid, GridItem, Heading, FormControl, 
    FormLabel, Input, InputGroup, InputLeftElement, 
    Select, useDisclosure, Modal, ModalContent, 
    ModalOverlay, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, useSteps, useToast, 
    Flex, Switch, Text, Checkbox, Tag, TagLabel, 
    TagRightIcon, ListItem, OrderedList, Stack, useMediaQuery, IconButton, 
} from "@chakra-ui/react"
import TableWrapper from "../../components/Table"
import SteppperWrapper from "../../components/Stepper"
import { useEffect, useId, useState } from "react"
import Editor from "../../components/Editor/Editor"
import CreatableSelect from 'react-select/creatable';
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup';
import SliderWrapper from "../../components/Slider"
import TimeRange from "../../components/TimeRange"
import SalaryRange from "../../components/SalaryRange"
import { ActionMeta } from "react-select"
import { toTitleCase } from "../../utils/helpers"
import { CustomTabs } from "../../components/Tabs"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { initializeVacancies, setHTML, setJSON } from "../../redux/reducers/vacancies"
import { tableColumns } from "./data"
import MobileTable from "../../components/MobileTable/table"

const steps = Array(6).fill({ title: '' })

const Vacancies = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { activeStep, setActiveStep } = useSteps({index: 0, count: steps.length})
    const { vacanciesList } = useSelector((state:RootState) => state.vacancies)
    const dispatch = useDispatch()
    const [isLargerThan768] = useMediaQuery('(min-width: 769px)')

    useEffect(() => {
        dispatch(initializeVacancies())
    }, [])
    
    return (<>
        <GridItem mt={3} as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} rowSpan={2}>
            <Box ml={4} >
                <Heading as={'h4'} size={'md'} >
                    Vacancies
                </Heading>
            </Box> 
            <Box mr={4} >
                <Button
                    display={{base:'none', md:'block'}} 
                    onClick={() => {onOpen()}} 
                    rounded={'xl'} variant={'solid'} 
                    leftIcon={<AddIcon />} colorScheme='teal' 
                    size={'sm'} 
                >
                    Add New
                </Button>
            </Box> 
        </GridItem>
        <GridItem ml={4} rounded={'2xl'} mr={4} mt={3} as={'div'} style={{backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)', display:'grid', alignItems:'center'}} rowSpan={4}>
            <VacanciesSearchBar />
        </GridItem>
        { isLargerThan768 ? 
            <TableWrapper
                tableProps= {{
                    columns: tableColumns,
                    data: vacanciesList
                }}
                paginationProps={{
                    pageIndex: 1,
                    pageSize: 5,
                    totalItemCount: vacanciesList.length
                }}
                onChange={() => {}}
            />
        :   <GridItem 
                style={{ 
                    borderRadius:'1rem', border:'1px #E3E9F0 solid', 
                    backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)'
                }} 
                ml={4} mr={4} mt={3} rowSpan={13}
            >
                <MobileTable />
            </GridItem> 
        }
        <ModalWrapper 
            isOpen={isOpen} 
            onClose={onClose} 
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
        />
    </>)
}

const ModalWrapper:React.FC<any> = ({isOpen, onClose, activeStep, setActiveStep}) => {
    const toast = useToast()
    const formOneId = useId()
    const formTwoId = useId()
    const formThreeId = useId()
    const formFourId = useId()
    const formFiveId = useId()
    const formSixId = useId()
    const [currentFormId, setCurrentFormId] = useState(formOneId)
    const [formData, setformData] = useState<any>({})

    const onSubmitFinal = (values:any) => {
        console.log('on submit')
        console.log({formData, values})
        //send formData to backend with if make it public is true or false
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

    const onSubmit = (values:any) => {
        if(activeStep < steps.length-1) {
            setActiveStep(activeStep+1) 
            setformData({
                ...formData,
                ...values
            })
        } else {
            onSubmitFinal(values)
            setActiveStep(activeStep+1)
        }
    }

    useEffect(() => {
        setActiveStep(0)
    }, [isOpen])

    useEffect(() => {
        if(activeStep === 0) {
            setCurrentFormId(formOneId)
        } else if(activeStep === 1) {
            setCurrentFormId(formTwoId)
        } else if(activeStep === 2) {
            setCurrentFormId(formThreeId)
        } else if(activeStep === 3) {
            setCurrentFormId(formFourId)
        } else if(activeStep === 4) {
            setCurrentFormId(formFiveId)
        } else {
            setCurrentFormId(formSixId)
        }
    }, [activeStep])
    
    
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
                            <JobPostFormOne onSubmit={onSubmit} formId={formOneId} /> 
                        : activeStep === 1 ? <JobPostFormTwo onSubmit={onSubmit} formId={formTwoId} /> 
                        : activeStep === 2 ? <JobsFormThree onSubmit={onSubmit} formId={formThreeId} /> 
                        : activeStep === 3 ? <JobsFormFour onSubmit={onSubmit} formId={formFourId} /> 
                        : activeStep === 4 ? <JobsFormFive onSubmit={onSubmit} formId={formFiveId} />
                        : <JobsFormSix onSubmit={onSubmit} formId={formSixId} />
                    }
                </ModalBody>
                <ModalFooter gap={3}>
                    <Button variant={'outline'} size={'sm'} colorScheme='blue'
                        onClick={() => {
                            if(activeStep === 0) { onClose()} 
                            else { setActiveStep(activeStep-1)}
                        }}
                    >
                        Back
                    </Button>
                    <Button size={'sm'} variant={'unstyled'} mr={3} onClick={onClose}>Close</Button>
                    <Button form={currentFormId} type="submit" size={'sm'} colorScheme='teal'>
                        Next
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const JobPostFormOne:React.FC<any> = ({onSubmit, formId}) => {

    let jobPositionOptions = [
        {text:'Fresher', value:'fresher'},
        {text:'Associate', value:'associate'},
        {text:'Senior', value:'senior'},
        {text:'Executive', value:'executive'},
        {text:'Advisory', value:'advisory'},
    ]

    let jobTypeOptions = [
        {text:'Freelance', value:'freelance'},
        {text:'Full-Time', value:'fullTime'},
        {text:'Part-Time', value:'partTime'},
        {text:'Contractual', value:'contractual'},
        {text:'Internship', value:'internship'},
        {text:'Seasonal', value:'seasonal'}
    ]

    let departmentOptions = [
        {text: 'Sales', value:'sales'},
        {text: 'Marketing', value:'marketing'},
        {text: 'Design', value:'design'},
        {text: 'Engineering', value:'engineering'}

    ]
    
    let formSchema = Yup.object({
        jobTitle: Yup.string().required("Required"),
        jobPosition: Yup.string().oneOf(jobPositionOptions.map((option) => option.value)).required("Required"),
        jobType: Yup.string().oneOf(jobTypeOptions.map((option) => option.value)).required("Required"),
        jobLocation: Yup.string().required("Required"),
        remoteFriendly: Yup.boolean().default(true),
        department: Yup.string().oneOf(departmentOptions.map((option) => option.value)).required("Required"),
    })

    let initialValues = { 
        jobTitle: '', 
        jobPosition: '', 
        jobType: '', 
        jobLocation: '', 
        remoteFriendly:true,  
        department: '' 
    }

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
            <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={(values) =>  {onSubmit(values)}}
            >
                <Form id={formId} style={{flex:1, marginTop:'4px', marginLeft:'4px', display:'flex', flexDirection:'column'}}>
                    <Field name='jobTitle'>
                        {({field}:any) => {
                            return (
                                <Flex flex={1} justifyContent={'start'} alignItems={'center'}>
                                    <Input autoFocus
                                        {...field} width={'75%'} placeholder="Enter Job Title"
                                        rounded={'lg'} size={'sm'} 
                                    />
                                    <ErrorMessage name="jobTitle" />
                                </Flex>
                            )
                        }}
                    </Field>
                    <Field name='jobPosition'>
                        {({field}:any) => {
                            return (
                                <Flex flex={1} justifyContent={'start'} alignItems={'center'} >
                                    <Select {...field} width={'75%'} rounded={'lg'} size={'sm'} placeholder='Select option'>
                                        {jobPositionOptions.map((option) => {
                                            return (<option key={option.value} value={option.value}>{option.text}</option>)
                                        })}
                                    </Select>
                                    <ErrorMessage name="jobPosition" />
                                </Flex>
                            )
                        }}
                    </Field>
                    <Field name='jobType' >
                        {({field}:any) => {
                            return (
                                <Flex flex={1} justifyContent={'start'} alignItems={'center'} >
                                    <Select {...field} width={'75%'} rounded={'lg'} size={'sm'} placeholder='Select option'>
                                        {jobTypeOptions.map((type) => {
                                            return (<option key={type.value} value={type.value}>{type.text}</option>)
                                        })}
                                    </Select>
                                    <ErrorMessage name="jobType" />
                                </Flex>
                            )
                        }}
                    </Field>
                    <Field name='jobLocation'>
                        {({field}:any) => {
                            return (
                                <Box display={'flex'} flexDirection={'row'} >
                                    <Flex gap={1} flex={1} flexDirection={'column'}  justifyContent={'start'} >
                                        <Input {...field} width={'75%'} rounded={'lg'} placeholder="Job Location" size={'sm'} /> {/*make it a google places api with city or region selection */}
                                        <Field name='remoteFriendly' >
                                            {({field}:any) => {
                                                return (
                                                    <Checkbox {...field} size={'sm'} defaultChecked>Remote Friendly</Checkbox>
                                                )
                                            }}
                                        </Field>
                                    </Flex>
                                    <ErrorMessage name="jobLocation" />
                                </Box>
                            )
                        }}
                    </Field>
                    <Field name='department' >
                        {({field}:any) => {
                            return (
                                <Flex flex={1} justifyContent={'start'} alignItems={'center'} >
                                    <Select {...field} width={'75%'} rounded={'lg'} size={'sm'} placeholder='Select option'>
                                        {departmentOptions.map((department) => {
                                            return (<option key={department.value} value={department.value}>{department.text}</option>)
                                        })}
                                    </Select>
                                    <ErrorMessage name="department" />
                                </Flex>
                            )
                        }}
                    </Field>
                </Form>
            </Formik>
        </Flex>
    )
}

const JobPostFormTwo:React.FC<any> = ({onSubmit, formId}) => {
    
    let formTwoSchema = Yup.object({
        numVacancies: Yup.number().min(1, "Vacancies Should be more than 1").required("Required"),
        onlyWomen: Yup.boolean().default(false),
        workHours: Yup.object({
            startTime:Yup.number().default(undefined).required("Required"), 
            startTimeMeridiem:Yup.string().oneOf(['ante', 'post']).default(undefined).required("Required"),
            endTime:Yup.number().default(undefined).required("Required"),
            endTimeMeridiem: Yup.string().oneOf(['ante', 'post']).default(undefined).required("Required"),
        }).required("Required"),
        salaryRange: Yup.object({
            type: Yup.string().oneOf(['hourly', 'weekly', 'monthly', 'fullTime']).required("Required"),
            start: Yup.number().min(1, "Required").required("Required"),
            end: Yup.number().min(1, "Required").required("Required"),
            negotiable: Yup.boolean().default(true)
        }).required("Required"),
        equityRange: Yup.object({
            start: Yup.number().default(0),
            end: Yup.number().default(0)
        }).required("Required"),
        immediateJoining: Yup.boolean().default(true)
    })

    let initialValues = { 
        numVacancies: 0, 
        onlyWomen: false, 
        workHours: {
            startTime:undefined, 
            startTimeMeridiem:undefined,
            endTime:undefined,
            endTimeMeridiem: undefined,
        }, 
        salaryRange: {
            type: undefined,
            start: 0,
            end: 0,
            negotiable: true
        }, 
        equityRange: {
            start:0,
            end: 0
        },
        immediateJoining: false
    }
    
    return (<>
        <Flex gap={4} flexDirection={'row'}>
            <Flex gap={4} ml={4} alignItems={'start'} flex={1} mt={4} flexDirection={'column'}>
                <Flex justifyContent={'center'} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Number of Vacancies</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >Total Number People to Hire for this post</Box>
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
                    <Box fontSize={'14px'} color={'#4C5A6D'} >An ESOP grants company stock to employees</Box>
                </Flex>
            </Flex>
            <Formik
                initialValues={initialValues}
                validationSchema={formTwoSchema}
                onSubmit={(values) =>  {onSubmit(values)}}
            >
                <Form id={formId} style={{gap:'16px', marginTop:'5px', display:'flex', flex:1, flexDirection:'column' }}>
                    <Field name="numVacancies">
                        {({field}:any) => {
                            return(
                                <Flex gap={2} flexDirection={'column'} justifyContent={'center'} flex={1}>
                                    <SliderWrapper name={field.name} type="number" />
                                    <Field name="onlyWomen" >
                                        {({field}:any) => {
                                            return (<Checkbox {...field} size={'sm'} >Hiring Only Women </Checkbox>)
                                        }}
                                    </Field>
                                    <ErrorMessage name="numVacancies" />
                                </Flex>
                            )
                        }}
                    </Field>
                    <Field name="workHours">
                        {({field, form}:any) => {
                            return (
                                <Flex gap={2} justifyContent={'center'} alignItems={'center'} flex={1} >
                                    <TimeRange name={field.name} />
                                </Flex>
                            )
                        }}
                    </Field>
                    <Field name="salaryRange">
                        {({field}:any) => <SalaryRange name={field.name} />}
                    </Field>
                    <Field name="equityRange">
                        {({field, form}:any) => {
                            return (
                                <Flex>
                                    <Flex gap={2} justifyContent={'center'} alignItems={'center'} flex={1}>
                                        <Input {...field} value={field.value['start']} onChange={(e) => {form.setValues({...form.values, equityRange: {...form.values.equityRange, start:e.target.value}})}} placeholder="Lower ESOP Limit" type="number" rounded={'lg'} size={'sm'} />
                                        <Text>-</Text>
                                        <Input {...field} value={field.value['end']} onChange={(e) => {form.setValues({...form.values, equityRange: {...form.values.equityRange, end:e.target.value}})}} placeholder="Upper ESOP Limit" type="number" rounded={'lg'} size={'sm'} />    
                                    </Flex>
                                    <ErrorMessage name="equityRange" />
                                </Flex>
                            )
                        }}
                    </Field>
                    <Field name="immediateJoining">
                        {({field, form}:any) => {
                            return (
                                <Flex mt={4} gap={4} justifyContent={'end'} alignItems={'end'}>
                                    <Box fontSize={'20px'} ><b>Immediate Joining</b></Box>
                                    <Flex justifyContent={'center'} alignItems={'center'}>
                                        <Switch {...field} id='immediate-joining' />
                                    </Flex>
                                </Flex>
                            )
                        }}
                    </Field>
                </Form>
            </Formik>
        </Flex>
    </>)
}

const JobsFormThree:React.FC<any> = ({onSubmit, formId}) => {

    const [skillsTagsAll, setSkillsTagsAll] = useState<any>([{label:"Communication", value:"communication"}, {label:"Leadership", value:"leadership"}])
    const [skillsTagsChosen, setSkillsTagsChosen] = useState<any>([])
    let formThreeSchema = Yup.object({ skillsTags: Yup.array().min(1, "Required").required("Required") }) 
    let initialValues = { skillsTags: [] }

    const setOptions = () => {
        let optionValues = skillsTagsAll.map((x:any) => x.value).filter((x:string) => !skillsTagsChosen.includes(x))
        return skillsTagsAll.filter((x:any) => optionValues.includes(x.value))
    }
   
    return (
        <Flex mt={4} justifyContent={'center'} flexDirection={'row'}>
            <Flex flex={1} flexDirection={'column'}>
                <Flex justifyContent={'start'} flex={1} flexDirection={'column'} >
                    <Box fontSize={'20px'} ><b>Skils</b></Box>
                    <Box fontSize={'14px'} color={'#4C5A6D'} >Tag all the skills required for the job</Box>
                </Flex>
            </Flex>
            <Flex  flex={1} >
                <Formik
                    initialValues={initialValues}
                    validationSchema={formThreeSchema}
                    onSubmit={(values) =>  {onSubmit(values)}}
                >
                    <Form id={formId} style={{gap:'16px', marginTop:'5px', display:'flex', flex:1, flexDirection:'column' }} >
                        <Field name="skillsTags">
                            {({field, form}:any) => {
                                return (
                                    <Flex gap={2} flex={1} flexDirection={'column'} >
                                        <CreatableSelect 
                                            {...field} 
                                            value={''}
                                            onChange={(newValue:any, actionMeta:ActionMeta<string>) => {
                                                setSkillsTagsChosen([...skillsTagsChosen, newValue.value])
                                                form.setValues({...form.values, skillsTags:[...skillsTagsChosen, newValue.value]})
                                            }} 
                                            onCreateOption={(inputValue:string) => {
                                                setSkillsTagsAll([...skillsTagsAll, {label:inputValue, value:inputValue}])
                                                setSkillsTagsChosen([...skillsTagsChosen, inputValue])
                                                form.setValues({...form.values, skillsTags:[...skillsTagsChosen, inputValue]})
                                            }} 
                                            isClearable 
                                            options={setOptions()} 
                                        />
                                        <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                                            {skillsTagsChosen.map((skill:any, i:any) => (
                                                <GridItem key={i} >
                                                    <Tag size={'lg'} variant='subtle' colorScheme='cyan'>
                                                        <TagLabel>{toTitleCase(skill)}</TagLabel>
                                                        <TagRightIcon 
                                                            cursor={'pointer'} 
                                                            onClick={() => { 
                                                                setSkillsTagsChosen(skillsTagsChosen.filter((s:string) => s !== skill))
                                                            }} 
                                                            boxSize='12px' 
                                                            as={SmallCloseIcon} 
                                                        />
                                                    </Tag>
                                                </GridItem>
                                            ))}
                                        </Grid>
                                        <ErrorMessage name="skillsTags" />
                                    </Flex>
                                )
                            }}
                        </Field>
                    </Form>
                </Formik>
            </Flex>
        </Flex>
    )
}

const JobsFormFour:React.FC<any> = ({onSubmit, formId}) => {
    const [view, setView] = useState("editor")  
    const { HTML, json } = useSelector((state:RootState) => state.vacancies)
    const [isFirstRender, setIsFirstRender] = useState(true);

    const dispatch = useDispatch() 
    const options = [
        { label: 'Editor', type: 'preview', value: 'editor'},
        { label: 'View', type: 'preview', value: 'view' },
    ];
    let formFourSchema = Yup.object({ html: Yup.string().required("Required") })
    let initialValues = { html: "" }
    
    const onChange = (json:any, HTML:string) => {
        dispatch(setHTML(HTML))
        dispatch(setJSON(json))
    }
      
    return (<>
        <Flex justifyContent={'end'}>
            <CustomTabs
                setter={setView}
                getter={view}
                options={options}  
            />
        </Flex>
        { view ===  "editor" ? 
            <Formik
                validationSchema={formFourSchema}
                initialValues={initialValues}
                onSubmit={() => {onSubmit({html:HTML})}}
            >
                <Form id={formId} >
                    <Field name="html" >
                        {({field, form}:any) => {
                            return (<>
                                <Editor
                                    onChange={onChange}
                                    json={json}
                                    isFirstRender={isFirstRender}
                                    setIsFirstRender={setIsFirstRender}
                                    formFields={form}
                                /> 
                                <input style={{display:'none'}} {...field} />  
                                <ErrorMessage name="html" />  
                            </>)
                        }}
                    </Field>
                </Form>
            </Formik>
        :   <div dangerouslySetInnerHTML={{__html:JSON.parse(HTML)}} ></div>
        }
    </>)
}

const JobsFormFive:React.FC<any> = ({formId, onSubmit}) => {
    const [questions, setQuestions] = useState<number>(1)

    let formFiveSchema = Yup.object({ 
        questions: Yup.array().min(1, "Required").required("Required") 
    }) 
    let initialValues = { questions: [""] }

    return (
        <Flex mt={4} justifyContent={'center'} flexDirection={'row'}>
            <Flex flex={1} mt={4} justifyContent={'start'} flexDirection={'column'} >
                <Box fontSize={'20px'} ><b>Questions</b></Box>
                <Box fontSize={'14px'} color={'#4C5A6D'} >A job title must describe one job post</Box>
            </Flex>
            <Formik
                onSubmit={(values) => {onSubmit(values)}}
                initialValues={initialValues}
                validationSchema={formFiveSchema}
            >
                <Form id={formId} style={{display:'flex', flexDirection:'column', flex:1, gap:2,}} >
                    <Field name="questions" >
                        {({field, form}:any) => {
                            return (<>
                                <OrderedList gap={2} mt={4}>
                                    {Array(questions).fill({}).map((a, i) =>{
                                        return(
                                            <ListItem key={i} mb={2} >
                                                <Input {...field} value={form.values.questions[i]}
                                                    onChange={(e) => {
                                                        form.setValues({
                                                            ...form.values, 
                                                            questions: form.values.questions.map((q:string, index:number) => {
                                                                if(index === i) return e.target.value
                                                                else return q
                                                            })
                                                        })
                                                    }} 
                                                    placeholder="Enter a Question" 
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </OrderedList>
                                <Flex>
                                    <Button size={'sm'} colorScheme="blue" 
                                        onClick={() =>{
                                            setQuestions(questions+1)
                                            form.setValues({...form.values, questions: [...form.values.questions, ""]})
                                        }}
                                    >
                                        Add New
                                    </Button>
                                </Flex>
                                <ErrorMessage name="questions" />
                            </>)
                        }}
                    </Field>
                </Form>
            </Formik>
        </Flex>
    )
}

const JobsFormSix:React.FC<any> = ({onSubmit, formId}) => {
    
    const finalCheckboxes = [
        {label: "Make it public", value:1, fieldName:'public'},
        {label: "Share it using the link", value:2, fieldName:'shareUsingLink'},
    ]
    
    let formSixSchema = Yup.object({ 
        public: Yup.boolean().default(true),
        shareUsingLink: Yup.boolean().default(true)
    }) 
    
    let initialValues = { public: true, shareUsingLink:true }

    return (
        <Flex mt={4} justifyContent={'center'} flexDirection={'row'}>
            <Formik
                validationSchema={formSixSchema}
                initialValues={initialValues}
                onSubmit={(values) => onSubmit(values)}
            >
                <Form id={formId} >
                    <Stack direction='column'>
                        {finalCheckboxes.map((checkbox:any, i:any) => {
                            return (
                                <Field key={i} name={checkbox.fieldName} >
                                    {({field, form}:any) => {
                                        return (
                                            <Checkbox {...field}>{checkbox.label}</Checkbox>
                                        )
                                    }}
                                </Field>
                            )
                        })}
                    </Stack>
                </Form>
            </Formik>
        </Flex>
    )
}

const VacanciesSearchBar = () => {
    const [isLargerThan768] = useMediaQuery('(min-width: 769px)')
    return (
        <Grid 
            ml={4} 
            paddingBottom={'10px'} 
            gap={{base: 4, md:10}} 
            templateColumns={'repeat(6, 1fr)'}
        >
            <GridItem colSpan={{ base:5, md:3 }} >
                <FormControl pt={1} >
                    <FormLabel fontWeight={{base:'bold', md:'normal'}} fontSize={'12px'} >What are you looking for ?</FormLabel>
                    <InputGroup size={ isLargerThan768 ? 'sm' : 'md'} >
                        <InputLeftElement pointerEvents='none'>
                            <Search2Icon color='gray.300' />
                        </InputLeftElement> 
                        <Input 
                            rounded={'lg'}
                            variant={'filled'} 
                            placeholder={ 
                                isLargerThan768 ? 
                                    'Search for category, name, company, etc' 
                                :   'Search...'
                            } 
                        />
                    </InputGroup>
                </FormControl>
            </GridItem>
            <GridItem display={{base:'none', md:'block'}} colSpan={1}>
                <FormControl pt={1} >
                    <FormLabel fontSize={'12px'} >Category</FormLabel>
                    <Select fontSize={'12px'} size={'sm'} rounded={'lg'} placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem display={{base:'none', md:'block'}} colSpan={1}>
                <FormControl pt={1} >
                    <FormLabel fontSize={'12px'} >Status</FormLabel>
                    <Select fontSize={'12px'} size={'sm'} rounded='lg' placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem 
                as={'div'} 
                style={{
                    display:'flex', flexDirection:'row', 
                    justifyContent:'center', 
                    alignItems:'end'
                }}
                colSpan={1}

            >
                
                <Button 
                    rounded={'xl'} pr={4} pl={4} 
                    colorScheme='teal' size='xs'
                    display={{base:'none', md:'block' }}
                >
                    Search
                </Button> 
                <IconButton 
                    aria-label='Search' 
                    size={'md'} 
                    variant={'ghost'} 
                    icon={<Search2Icon />} 
                    display={{base:'block', md:'none'}}
                />
                
            </GridItem>
        </Grid>
    )
}

export default Vacancies
