import {
    Box, Button, Flex, Grid, GridItem, 
    useSteps, FormControl,FormLabel, Input, Text,
} from '@chakra-ui/react'
import './form.css'
import { useEffect, useId, useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import SteppperWrapper from '../Stepper'
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { truncate } from '../../utils/helpers'


const count = 1
const formats = ['doc', 'docx', 'pdf']

const CandidateApplicationForm:React.FC<any> = ({isOpen, onClose}) => {
    const steps = [ { title: 'Resume'}, { title: 'Contact'}, { title: 'Documents'}]
    const { activeStep, setActiveStep } = useSteps({index: 0, count: steps.length})
    const toast = useToast()
    const formOneId = useId()
    const formTwoId = useId()
    const formThreeId = useId()
    const [currentFormId, setCurrentFormId] = useState(formOneId)

    const onSubmit = () => {
        if(activeStep < steps.length-1) {
            setActiveStep(activeStep+1)
        } else {
            setActiveStep(activeStep+1)
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
        }
    }, [activeStep])

    return (<>
        <SteppperWrapper 
            steps={steps}  
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
        />
        
        {
            activeStep === 0 ?  <ResumeForm formId={formOneId} onSubmit={onSubmit} /> 
            :   activeStep === 1 ?  <ApplicantDetailsForm /> 
            :   activeStep === 2 ?  <DocumentsUploadForm /> 
            :   <></> 
        }
       
        <Flex justifyContent={'end'}>
            <Button
                type='submit'
                form={currentFormId}
                size={'sm'} 
                colorScheme="blue" 
            >
                {activeStep < steps.length-1 ? 'Next' : 'Submit'}
            </Button>
        </Flex>
    </>)
}


const ResumeForm = ({formId, onSubmit}:any) => {
    const drop = useRef<any>(null);
    const toast = useToast()

    let formSchema = Yup.object({
        resume: Yup.mixed().required('File is required'),        
    })

    let initialValues = {
        resume: undefined
    }

    const onUpload = (files:File[]) => {
        console.log(files);
    };
      
    const handleDragOver = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        drop.current.classList.add("drag-active")
    };

    const handleDrop = (e:any, form:any) => {
        e.preventDefault();
        e.stopPropagation();
        drop.current.classList.remove("drag-active")

        const files = e.dataTransfer ? [...e.dataTransfer.files] : [];

        if (count && count < files.length) {
            toast({
                description: `Nope, only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`, 
                position:'top-right', 
                status:'error', 
                duration:2000
            });
            return;
        }
        
        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            toast({
                description:`Nope, only following file formats are acceptable: ${formats.join(', ')}`, 
                position:'top-right', 
                status:'error', 
                duration:2000
            });
            return;
        }
        
        if (files && files.length) {
            toast({
                description:'Yep, that\'s what I want', 
                status:'success', 
                position:'top-right', 
                duration:1000
            });
            onUpload(files);
            form.setValues({resume:files})
        }

        onUpload(files);
    };
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={(values) =>  {console.log({values});onSubmit()}} 
        >
            <Form id={formId}>
                <Field name="resume" >
                    {({field, form}:any) => {
                        return (
                            <Box 
                                ref={drop} 
                                className="drop-container" 
                                id="dropcontainer" 
                                mt={4} mb={4}
                                onDragOverCapture={(e) => {handleDragOver(e)}}
                                onDropCapture={(e) => {handleDrop(e, form)}}
                            >
                                <label className='drop-title'>Drop resume here</label> or
                                <Flex
                                    style={{
                                        justifyContent:'start', width:'50%', alignItems:'center', 
                                        border:'1px solid black', borderRadius:'10px', padding:'4px', 
                                        paddingTop:'6px', paddingBottom:'6px', backgroundColor:'white' 
                                    }} 
                                >
                                    <label className="button">Choose File</label>
                                    <input
                                        type="file"
                                        className="file-input" 
                                        id="resume_file" 
                                        accept=".doc,.docx,.pdf,application/msword"
                                        multiple={false}
                                        onChange={(e) => {
                                            form.setValues({resume:e.target.files})
                                        }}
                                    />
                                    <Text style={{fontSize:'16px'}}>
                                        {
                                            form.values.resume && form.values.resume.length > 0 ? 
                                            truncate(form.values.resume[0].name, 20, '...') 
                                            :   'No file chosen'
                                        }
                                    </Text>
                                </Flex>
                                <ErrorMessage name="resume" />
                            </Box>

                        )
                    }}
                </Field>
            </Form>
        </Formik>
    )
}


const ApplicantDetailsForm = () => {
    return (
        <form id='applicantDetailsForm' onSubmit={(e) => {e.preventDefault()}}>
            <Grid mt={2} gap={4} templateColumns='repeat(2, 1fr)'>
                <GridItem mb={2} colSpan={1} id="firstName">
                    <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' placeholder='Enter First Name' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
                <GridItem mb={2} colSpan={1} id="lastName">
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' placeholder='Enter Last Name' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
                <GridItem mb={2} colSpan={1} id="contact">
                    <FormControl isRequired>
                        <FormLabel>Contact</FormLabel>
                        <Input type='tel' placeholder='Enter Contact Number' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
                <GridItem mb={2} colSpan={1} id="email">
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' placeholder='Enter Email' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
                <GridItem mb={2} colSpan={1} id="aadhaar">
                    <FormControl isRequired>
                        <FormLabel>Aadhaar Number</FormLabel>
                        <Input type='number' placeholder='Enter Aadhaar Number' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
                <GridItem mb={2} colSpan={1} id="pan">
                    <FormControl isRequired>
                        <FormLabel>PAN</FormLabel>
                        <Input type='text' placeholder='Enter PAN' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
                <GridItem mb={2} colSpan={2} id="address">
                    <FormControl isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input type='text' placeholder='Enter Address' rounded={'lg'} size={'sm'} />
                    </FormControl>
                </GridItem>
            </Grid>
        </form>
    )
}

const DocumentsUploadForm = () => {
    return (
        <Grid gap={4} templateColumns='repeat(2, 1fr)'>
            <GridItem mt={2} mb={2} colSpan={1} id="aadhaarFront">
                <FormControl isRequired>
                    <FormLabel>Addhaar Front Photo</FormLabel>
                    <input type='file' />
                </FormControl>
            </GridItem>
            <GridItem mt={2} mb={2} colSpan={1} id="aadhaarBack">
                <FormControl isRequired>
                    <FormLabel>Addhaar Back Photo</FormLabel>
                    <input type='file' />
                </FormControl>
            </GridItem>
            <GridItem mt={2} mb={2} colSpan={1} id="panFront">
                <FormControl isRequired>
                    <FormLabel>PAN Front Photo</FormLabel>
                    <input type='file' />
                </FormControl>
            </GridItem>
            <GridItem mt={2} mb={2} colSpan={1} id="panBack">
                <FormControl isRequired>
                    <FormLabel>PAN Back Photo</FormLabel>
                    <input type='file' />
                </FormControl>
            </GridItem>
        </Grid>
    )
}


export default CandidateApplicationForm
