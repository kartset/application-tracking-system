
import { InfoIcon } from '@chakra-ui/icons'
import { Flex, Input, Checkbox, Select } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'


interface formFieldProps {
    field: string,
    text: string,
    subtext: string,
    placeholder: string,
    elementType: string,
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
        formField.elementType === HTMLInputElement.name && formField.type === 'input' ?
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
        : <></>
    )
}

export default FormElement