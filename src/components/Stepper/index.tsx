import { 
    Box, Step, StepIcon, StepIndicator, 
    StepNumber, StepSeparator, StepStatus, 
    StepTitle, Stepper 
} from "@chakra-ui/react"

const SteppperWrapper:React.FC<any> = ({steps, activeStep, setActiveStep}) => {
    return (
        <Stepper index={activeStep}>
            {steps.map((step:any, index:any) => (
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


export default SteppperWrapper