import { Box, Flex } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import FormElement from '../FormElementBuilder'

const FormBuilder:React.FC<any> = ({ elements, initialValues, schema, formId, onSubmit}) => {
    return (
        <Flex gap={4} height={'100%'} width={'100%'} flexDirection={'row'}>
            <Flex gap={4} ml={4} flex={1} mt={4} justifyContent={'space-around'} alignItems={'start'} flexDirection={'column'}>
                { elements.map((field:any, i:any) => {
                    return (
                        <Flex key={field.text + i} justifyContent={'center'} flexDirection={'column'} >
                            <Box fontSize={'20px'} ><b>{field.text}</b></Box>
                            <Box fontSize={'14px'} color={'#4C5A6D'} >{field.subtext}</Box>
                        </Flex>
                    )
                })}
            </Flex>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) =>  {onSubmit(values)}}
                key={formId}
            >
                <Form 
                    id={formId} 
                    style={{
                        flex:1, marginTop:'16px', marginLeft:'4px', 
                        display:'flex', flexDirection:'column'
                    }}
                >
                    { elements.map((formField:any, index:any) => {
                        return (
                            <FormElement key={`${formField.field} + ${index}`} formField={formField} index={index} />
                        )
                    })}
                </Form>
            </Formik>
        </Flex>
    )
}

export default FormBuilder