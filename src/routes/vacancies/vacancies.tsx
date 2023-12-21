import { 
    AddIcon, Search2Icon, SmallCloseIcon 
} from "@chakra-ui/icons"
import { 
    Box, Button, Grid, GridItem, Heading, FormControl, 
    FormLabel, Input, InputGroup, InputLeftElement, 
    Select, useDisclosure, Modal, ModalContent, 
    ModalOverlay, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, useSteps, useToast, 
    Flex, Checkbox, Tag, TagLabel, 
    TagRightIcon, Stack, useMediaQuery, IconButton, 
} from "@chakra-ui/react"
import TableWrapper from "../../components/Table"
import SteppperWrapper from "../../components/Stepper"
import { useEffect, useId, useState } from "react"
import Editor from "../../components/Editor/Editor"
import AsyncCreatableSelect from 'react-select/async-creatable';

import { 
    ErrorMessage, Field, FieldArray, 
    Form, Formik 
} from "formik"
import * as Yup from 'yup';
import { ActionMeta } from "react-select"
import { toTitleCase } from "../../utils/helpers"
import { CustomTabs } from "../../components/Tabs"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { 
    createVacancyAction, initializeVacancies, 
    resetCreateVacancyStatus, setHTML, setJSON 
} from "../../redux/reducers/vacancies"
import { 
    formOne, formSchema, formTwo, formTwoInitialValues, 
    formTwoSchema, initialValues, tableColumns 
} from "./data"
import MobileTable from "../../components/MobileTable/table"
import { STATUS } from "../../utils/constants"
import FormBuilder from "../../components/FormBuilder"
import { getSkillsAction } from "../../redux/reducers/skills"

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
    const dispatch = useDispatch<any>();
    const { createVacancyStatus } = useSelector((state:RootState) => state.vacancies)

    const onSubmitFinal = (values:any) => {
        console.log('on submit')
        console.log({formData, values})
        dispatch(createVacancyAction({
            ...formData, 
            ...values,
            orgId:'656dbe0b48cf7d7416f18247',
            createdBy: '656edbc7da466683ab896266'
        }))
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

    useEffect(() => {
        if(createVacancyStatus === STATUS.COMPLETED) {
            onClose()
            toast({
                title:'Success', 
                status:'success', 
                position:'top-right', 
                description:'Application Submitted Successfully', 
                isClosable:true, 
                duration:2000
            })
            dispatch(resetCreateVacancyStatus({}))
        } else if(createVacancyStatus === STATUS.FAILED) {
            onClose()
            toast({
                title:'Failed', 
                status:'error', 
                position:'top-right', 
                description:'Application Submission Failed. Check the console for the errors.',
                isClosable:true, 
                duration:2000
            })
            dispatch(resetCreateVacancyStatus({}))
        }
    }, [createVacancyStatus])
    return (
        <Modal size={'4xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay  backdropFilter='blur(10px) hue-rotate(90deg)' />
            <ModalContent height="80%" >
                <ModalHeader>Add New Vacancy</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column" align="stretch" height="100%" >
                        <SteppperWrapper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
                        <Box flex={1}>
                            { 
                                activeStep === 0 ? <FormBuilder formId={formOneId} onSubmit={onSubmit} elements={formOne} initialValues={initialValues} schema={formSchema} />
                                : activeStep === 1 ? <FormBuilder formId={formTwoId} onSubmit={onSubmit} elements={formTwo} initialValues={formTwoInitialValues} schema={formTwoSchema}/> 
                                : activeStep === 2 ? <JobsFormThree onSubmit={onSubmit} formId={formThreeId} /> 
                                : activeStep === 3 ? <JobsFormFour onSubmit={onSubmit} formId={formFourId} /> 
                                : activeStep === 4 ? <JobsFormFive onSubmit={onSubmit} formId={formFiveId} />
                                : <JobsFormSix onSubmit={onSubmit} formId={formSixId} />
                            }
                        </Box>
                    </Flex>
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
                    <Button 
                        isLoading={ createVacancyStatus === STATUS.PENDING } 
                        form={currentFormId} type="submit" size={'sm'} 
                        colorScheme='teal'
                    >
                        { activeStep === 5 ? 'Submit' :  'Next'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const JobsFormThree:React.FC<any> = ({onSubmit, formId}) => {
    const [skillsTagsChosen, setSkillsTagsChosen] = useState<any>([])
    const { skills, getSkillsStatus } = useSelector((state:RootState) => state.skills)
    let formThreeSchema = Yup.object().shape({
        skills: Yup.array().of( 
            Yup.object().shape({
                skillId: Yup.string(),
                skill: Yup.string(),
            })
        ).min(1, "Required").required("Required")
    }) 
    let initialValues = { skills: [{
        skillId: '',
        skill: ''
    }
    ] }
    const dispatch = useDispatch<any>()

    useEffect(() => {
      dispatch(getSkillsAction({}))
    }, [])

    const loadOptions = async (inputValue:any, callback:any) => {
        dispatch(getSkillsAction({skill:inputValue}));
        const options = skills.map((skill:any) => ({
        value: skill.skill,
        label: toTitleCase(skill.skill),
        }));
        callback(options);
    };
    
   
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
                        <Field name="skills">
                            {({field, form}:any) => {
                                return (
                                    <Flex gap={2} flex={1} flexDirection={'column'} >
                                        <AsyncCreatableSelect
                                            key={field.name}
                                            {...field} 
                                            value={''}
                                            onChange={(newValue:any, actionMeta:ActionMeta<string>) => {
                                                setSkillsTagsChosen([...skillsTagsChosen, {skillId:newValue.id, skill:newValue.value}])
                                                form.setValues({...form.values, skills:[...skillsTagsChosen,{skillId:newValue.id, skill:newValue.value}]})
                                            }} 
                                            onCreateOption={(inputValue:string) => {
                                                setSkillsTagsChosen([...skillsTagsChosen, {skillId:'new', skill:inputValue}])
                                                form.setValues({...form.values, skills:[...skillsTagsChosen, {skillId:'new', skill:inputValue}  ]})
                                            }} 
                                            isClearable 
                                            isLoading={getSkillsStatus === STATUS.PENDING}
                                            defaultOptions={skills.map((skill:any) => {return {...skill, label:toTitleCase(skill.skill), value:skill.skill}})}
                                            loadOptions={loadOptions}
                                            options={skills.map((skill:any) => {return {...skill, label:toTitleCase(skill.skill), value:skill.skill}})}
                                        />
                                        <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                                            {skillsTagsChosen.map((skill:any, i:any) => (
                                                <GridItem key={i} >
                                                    <Tag size={'lg'} variant='subtle' colorScheme='cyan'>
                                                        <TagLabel>{toTitleCase(skill.skill)}</TagLabel>
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
                                        <ErrorMessage name="skills" />
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
    let formFourSchema = Yup.object({ textHTML: Yup.string().required("Required") })
    let initialValues = { textHTML: "" }
    
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
                onSubmit={() => {onSubmit({textHTML:HTML})}}
            >
                <Form id={formId} >
                    <Field name="textHTML" >
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
                                <ErrorMessage name="textHTML" />  
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

    let formFiveSchema = Yup.object().shape({ 
        questions: Yup.array().of(
            Yup.object().shape({
                text: Yup.string(),
            })
        ).min(1, "Required").required("Required") 
    }) 
    let initialValues = { questions: [{text:''}] }

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
                {({values}) =>  (
                    <Form id={formId} style={{ marginTop:'16px', display:'flex', flexDirection:'column', flex:1, gap:2,}} >
                        <FieldArray
                            name="questions"
                            render={ arrayHelpers => (
                                <div>
                                    {values.questions.map((question, index) => {
                                        return (
                                        <div key={index} >
                                            <Field name={`questions[${index}].text`} >
                                                {({field, form}:any) => {
                                                    return (<>
                                                        <Input 
                                                            {...field} 
                                                            value={form.values.questions[index].text} 
                                                            placeholder="Enter a Question" mb={2}
                                                            onChange={(e) => {
                                                                form.setValues({
                                                                    ...form.values, 
                                                                    questions: form.values.questions.map((q:string, i:number) => {
                                                                        if(index === i) return {text: e.target.value}
                                                                        else return q
                                                                    })
                                                                })
                                                            }}   
                                                        />
                                                        <ErrorMessage name={`questions[${index}].text`} />  
                                                    </>
                                                    )
                                                }}
                                            </Field>
                                        </div>
                                        )
                                    })}
                                    <Flex>
                                        <Button size={'sm'} colorScheme="blue" 
                                            onClick={() =>{
                                                arrayHelpers.push({text:''})
                                                setQuestions(questions+1)
                                            }}
                                        >
                                            Add New
                                        </Button>
                                    </Flex>
                                </div>
                            )}
                        />
                    </Form>
                )}
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
                    colorScheme='teal' size='sm'
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
