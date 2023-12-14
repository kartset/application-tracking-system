
import { InfoIcon } from '@chakra-ui/icons'
import { Flex, Input, Checkbox, Select, Box, Switch } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import SliderWrapper from '../Slider'


interface formFieldProps {
    field: string,
    text: string | undefined,
    subtext: string | undefined,
    placeholder: string | undefined,
    elementType: string,
    element?: any,
    type: string,
    options: { value: string, text:string }[] | undefined,
    subElement: {
        field: string,
        text: string,
        type: string,
        elementType: string,
    } | undefined,
}

const FormElement:React.FC<{formField:formFieldProps, index:number}> = ({formField, index}) => {
    return (
        formField.elementType === HTMLInputElement.name ?
            formField.type === 'input' ?
                <Field name={formField.field}>
                    {({field, form}:any) => {
                        return ( 
                            <Flex flexDirection={'column'} flex={1} justifyContent={'space-evenly'} alignItems={'start'}>
                                <Input autoFocus={index === 0}
                                    {...field} width={'75%'} placeholder="Enter Job Title"
                                    rounded={'lg'} size={'sm'} 
                                />
                                { formField.subElement && formField.subElement.type === 'checkbox' ? 
                                        <Field name={formField.subElement.field} >
                                            {({field}:any) => {
                                                return (
                                                    <Checkbox 
                                                        {...field} size={'sm'} 
                                                        defaultChecked
                                                    >
                                                        {formField.subElement!.text}
                                                    </Checkbox>
                                                )
                                            }}
                                        </Field>
                                    : <></>
                                }
                                <Flex 
                                    display={ (form.touched[formField.field] && form.errors[formField.field]) ? 'flex' : 'none' } 
                                    flexDirection='row' gap={2} align={'center'} color={'red'} 
                                >
                                    <InfoIcon />
                                    <span>
                                        {form.errors[formField.field]}
                                    </span>
                                </Flex>
                            </Flex>
                        )
                    }}
                </Field>
            : formField.type === 'slider' ?
                <Field name={formField.field}>
                    {({field, form}:any) => {
                        return(
                            <Flex gap={2} flexDirection={'column'} justifyContent={'center'} flex={1}>
                                <SliderWrapper name={field.name} type="number" />
                                { formField.subElement && formField.subElement.type === 'checkbox' ? 
                                    <Field name={formField.subElement.field} >
                                        {({field}:any) => {
                                            return (<Checkbox {...field} size={'sm'} >{formField.subElement!.text}</Checkbox>)
                                        }}
                                    </Field>
                                :<></>}
                                <Flex 
                                    display={ (form.touched[formField.field] && form.errors[formField.field]) ? 'flex' : 'none' } 
                                    flexDirection='row' gap={2} align={'center'} color={'red'} 
                                >
                                    <InfoIcon />
                                    <span>
                                        {form.errors[formField.field]}
                                    </span>
                                </Flex>
                            </Flex>
                        )
                    }}
                </Field> 
            :   formField.type === 'switch' ? 
                    <Field name={formField.field}>
                        {({field, form}:any) => {
                            return (
                                <Flex mt={4} gap={4} justifyContent={'end'} alignItems={'end'}>
                                    <Box fontSize={'20px'} ><b>Immediate Joining</b></Box>
                                    <Flex justifyContent={'center'} alignItems={'center'}>
                                        <Switch isChecked={field.value} {...field} id={formField.field} />
                                    </Flex>
                                </Flex>
                            )
                        }}
                    </Field>
                : <></>
        :   formField.elementType === HTMLSelectElement.name ?
            <Field name={formField.field}>
                {({field, form}:any) => {
                    return (
                        <Flex flexDirection={'column'} flex={1} justifyContent={'space-evenly'} alignItems={'start'} >
                            <Select {...field} width={'75%'} rounded={'lg'} size={'sm'} placeholder={formField.placeholder}>
                                {formField.options!.map((option:{value:string, text:string}) => {
                                    return (<option key={option.value} value={option.value}>{option.text}</option>)
                                })}
                            </Select>
                            <Flex 
                                display={(form.touched[formField.field] && form.errors[formField.field]) ? 'flex' : 'none' } 
                                flexDirection='row' gap={2} align={'center'} color={'red'} 
                            >
                                <InfoIcon />
                                <span>
                                    {form.errors[formField.field]}
                                </span>
                            </Flex>
                        </Flex>
                    )
                }}
            </Field>
        :   formField.elementType === 'custom' ?
                <Field name={formField.field}>
                    {({field, form}:any) => {
                        return (
                            <Flex gap={2} flexDirection={'column'} justifyContent={'center'} alignItems={'start'} flex={1} >
                                <formField.element 
                                    { ...(formField.type === 'equityRange' ? {field, form} : {name:field.name})} 
                                />
                                <Flex 
                                    display={(form.touched[formField.field] && form.errors[formField.field]) ? 'flex' : 'none' } 
                                    flexDirection='row' gap={2} align={'center'} color={'red'} 
                                >
                                    <InfoIcon />
                                    <span>
                                        {form.errors[formField.field]}
                                    </span>
                                </Flex>
                            </Flex>
                        )
                    }}
                </Field>
            : <></>
    )
}

export default FormElement