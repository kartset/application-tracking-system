import {
    Box, Button, Flex, Step, StepIcon, StepIndicator, 
    StepNumber, StepSeparator, StepStatus, 
    StepTitle, Stepper, useSteps,
} from '@chakra-ui/react'
import './form.css'
import { useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'

const count = 1
const formats = ['doc', 'docx', 'pdf']

const CandidateApplicationForm:React.FC<any> = ({onClose}) => {
    const steps = [ { title: 'Resume'}, { title: 'Contact'}, { title: 'Documents'}]
    const { activeStep, setActiveStep } = useSteps({index: 0, count: steps.length})
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

    const onSubmit = () => {
        console.log('on submit')
        onClose()
        toast({title:'Success', status:'success', position:'top-right', description:'Application Submitted Successfully', isClosable:true, duration:1500})
    }

    return (<>
        <Stepper index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
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
        <Box ref={drop} className="drop-container" id="dropcontainer" mt={4} mb={4}>
            <label className="drop-title">Drop resume here</label>
                or
            <input type="file" id="images" accept="image/*" required />
        </Box>
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

export default CandidateApplicationForm
