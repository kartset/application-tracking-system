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
            :   activeStep === 1 ?  <ApplicantDetailsForm formId={formTwoId} onSubmit={onSubmit} /> 
            :   activeStep === 2 ?  <DocumentsUploadForm formId={formThreeId} onSubmit={onSubmit} /> 
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


const ApplicantDetailsForm = ({formId, onSubmit}:any) => {
    let formSchema = Yup.object({
        firstName: Yup.string().required('First Name is Required !!'),
        lastName: Yup.string().required('Last Name is required'),
        contact: Yup.string().length(10).required("Contact is Required"),
        email: Yup.string().email().required("Email is Required"),
        aadhaar: Yup.string().length(12).required("Aadhaar Number is required"),
        pan: Yup.string().length(10).required("PAN is required"),
        address: Yup.string().required("Address is required")
    })

    let initialValues = {
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        aadhaar: '',
        pan: '',
        address: ''
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={(values) =>  {console.log({values});onSubmit()}}
        >
            <Form id={formId}>
                <Grid mt={2} gap={4} templateColumns='repeat(2, 1fr)'>
                    <Field name="firstName">
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input 
                                        {...field} 
                                        placeholder='Enter First Name' 
                                        rounded={'lg'} size={'sm'} 
                                    />
                                    <ErrorMessage name="firstName" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name="lastName" >
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input 
                                        {...field} 
                                        placeholder='Enter Last Name' 
                                        rounded={'lg'} size={'sm'} 
                                    />
                                    <ErrorMessage name="lastName" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name='contact' >
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>
                                    <FormLabel>Contact</FormLabel>
                                    <Input 
                                        {...field}  
                                        placeholder='Enter Contact Number' 
                                        rounded={'lg'} size={'sm'} 
                                    />
                                    <ErrorMessage name="contact" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name='email'>
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>
                                    <FormLabel>Email</FormLabel>
                                    <Input 
                                        {...field} 
                                        placeholder='Enter Email' 
                                        rounded={'lg'} size={'sm'} 
                                    />
                                    <ErrorMessage name="email" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name="aadhaar">
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>                                    
                                    <FormLabel>Aadhaar Number</FormLabel>
                                    <Input 
                                        {...field} 
                                        placeholder='Enter Aadhaar Number' 
                                        rounded={'lg'} size={'sm'} 
                                    />
                                    <ErrorMessage name="aadhaar" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name="pan" >
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>
                                    <FormLabel>PAN</FormLabel>
                                    <Input {...field} placeholder='Enter PAN' rounded={'lg'} size={'sm'} />
                                    <ErrorMessage name="pan" />
                                </GridItem>   
                            )
                        }}
                    </Field>
                    <Field name="address" >
                        {({field}:any) => {
                            return (
                                <GridItem mb={2} colSpan={1}>
                                    <FormLabel>Address</FormLabel>
                                    <Input {...field} type='text' placeholder='Enter Address' rounded={'lg'} size={'sm'} />
                                    <ErrorMessage name="address" />
                                </GridItem>
                            )
                        }}
                    </Field>
                </Grid>
            </Form>
        </Formik>
    )
}

const DocumentsUploadForm = ({formId, onSubmit}:any) => {
    const formSchema = Yup.object({
        aadhaarFront: Yup.mixed().required('Required'),
        aadhaarBack: Yup.mixed().required('Required'),
        panFront: Yup.mixed().required('Required'),
        panBack: Yup.mixed().required('Required')
    })

    const initialValues = {
        aadhaarFront: undefined,
        aadhaarBack: undefined,
        panFront: undefined,
        panBack: undefined
    }
    return (
        <Formik
            validationSchema={formSchema}
            initialValues={initialValues}
            onSubmit={(values) => {console.log({values});onSubmit()}}
        >
            <Form id={formId}>
                <Grid gap={4} templateColumns='repeat(2, 1fr)'>
                    <Field name="aadhaarFront" >
                        {({form}:any) => {
                            return (
                                <GridItem mt={2} mb={2} colSpan={1}>
                                    <FormLabel>Addhaar Front Photo</FormLabel>
                                    <Input type='file' onChange={(e) => { form.setFieldValue('aadhaarFront', e.target.files) }} />
                                    <ErrorMessage name="aadhaarFront" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name="aadhaarBack">
                        {({form}:any) => {
                            return (
                                <GridItem mt={2} mb={2} colSpan={1}>
                                    <FormLabel>Addhaar Back Photo</FormLabel>
                                    <Input type='file' onChange={(e) => { form.setFieldValue('aadhaarBack', e.target.files) }} />
                                    <ErrorMessage name="aadhaarBack" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name="panFront">
                        {({form}:any) => {
                            return (
                                <GridItem mt={2} mb={2} colSpan={1}>
                                    <FormLabel>PAN Front Photo</FormLabel>
                                    <Input type='file' onChange={(e) => { form.setFieldValue('panFront', e.target.files) }} />
                                    <ErrorMessage name="panFront" />
                                </GridItem>
                            )
                        }}
                    </Field>
                    <Field name="panBack" >
                        {({form}:any) => {
                            return (
                                <GridItem mt={2} mb={2} colSpan={1}>
                                    <FormLabel>PAN Back Photo</FormLabel>
                                    <Input type='file' onChange={(e) => { form.setFieldValue('panBack', e.target.files) }} />
                                    <ErrorMessage name="panBack" />
                                </GridItem>
                            )
                        }}
                    </Field>
                </Grid>
            </Form>
        </Formik>
        
    )
}


export default CandidateApplicationForm
