import {
    Box, Button, Flex, Grid, GridItem, Step, StepIcon, StepIndicator, 
    StepNumber, StepSeparator, StepStatus, 
    StepTitle, Stepper, useSteps, FormControl,
    FormLabel,
    FormHelperText,
    Input,
} from '@chakra-ui/react'
import './form.css'
import { useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'

const count = 1
const formats = ['doc', 'docx', 'pdf']
const steps = [ { title: 'Resume'}, { title: 'Contact'}, { title: 'Documents'}]

const CandidateApplicationForm:React.FC<any> = ({onClose}) => {
    const { activeStep, setActiveStep } = useSteps({index: 0, count: steps.length})
    const toast = useToast()

    const onSubmit = () => {
        console.log('on submit')
        onClose()
        toast({title:'Success', status:'success', position:'top-right', description:'Application Submitted Successfully', isClosable:true, duration:1500})
    }

    return (<>
        <SteppperWrapper activeStep={activeStep} setActiveStep={setActiveStep} />
        {activeStep === 0 ? <ResumeForm /> : activeStep === 1 ? <ApplicantDetailsForm /> : <></> }
       
        <Flex justifyContent={'end'}>
            <Button 
                onClick={() => {
                    if(activeStep < steps.length-1) {
                        setActiveStep(activeStep+1) 
                    } else {
                        
                        setActiveStep(activeStep+1)
                        onSubmit()
                    }
                } }
                size={'sm'} 
                colorScheme="blue" 
            >
                {activeStep < steps.length-1 ? 'Next' : 'Submit'}
            </Button>
        </Flex>
    </>)
}

const SteppperWrapper:React.FC<any> = ({activeStep, setActiveStep}) => {
    return (
        <Stepper index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index} onClick={() => setActiveStep(index)}>
                    <StepIndicator>
                        <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                    </StepIndicator>
                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

const ResumeForm = () => {
    const drop = useRef<any>(null);
    const toast = useToast()

    useEffect(() => {
        let dropCurrentCopy = drop.current
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);

        return () => {
            dropCurrentCopy.removeEventListener('dragover', handleDragOver);
            dropCurrentCopy.removeEventListener('drop', handleDrop);
        };
    });

    const onUpload = (files:File[]) => {
        console.log(files);
    };
      
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        drop.current.classList.add("drag-active")
    };

    const handleDrop = (e: DragEvent) => {
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
        }

        onUpload(files);
    };
    return (
        <Box ref={drop} className="drop-container" id="dropcontainer" mt={4} mb={4}>
            <label className="drop-title">Drop resume here</label>
                or
            <input type="file" id="resume_file" accept=".doc,.docx,.pdf,application/msword" required />
        </Box>
    )
}


const ApplicantDetailsForm = () => {
    return (
        <form id='applicantDetailsForm' onSubmit={(e) => {e.preventDefault()}}>
            <Grid gap={4} templateColumns='repeat(2, 1fr)'>
                <GridItem mt={2} mb={2} colSpan={1} id="firstName">
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



export default CandidateApplicationForm
