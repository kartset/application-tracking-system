import { 
    Checkbox, Flex, Input, 
    InputGroup, InputLeftAddon, 
    Select, Text 
} from '@chakra-ui/react'
import { useField } from 'formik'

const SalaryRange:React.FC<any> = (props) => {
    let options = [
        {text:'Hourly', value:'hourly'},
        {text:'Weekly', value:'weekly'},
        {text:'Monthly', value:'monthly'},
        {text:'Yearly', value:'yearly'},
    ]
    const [field, meta, {setValue}] = useField(props)

    return (
        <Flex gap={1} flexDirection={'column'} justifyContent={'center'} flex={1}>
            <Flex gap={2}>
                <Flex flex={1} gap={2} flexDirection={'column'} >
                    <Select {...field} value={field.value['type']} onChange={(e) => {setValue({...field.value, type:e.target.value})}} rounded={'lg'} size={'sm'}>
                        {options.map((option) => {
                            return (<option key={option.value} value={option.value}>{option.text}</option>)
                        })}
                    </Select>
                </Flex>

                <Flex flex={1} gap={2} flexDirection={'column'} >
                    <InputGroup size={'sm'} >
                        <InputLeftAddon rounded={'lg'} children='$' />
                        <Input {...field} value={field.value['start']} onChange={(e) => {setValue({...field.value, start:e.target.value})}} type='number' rounded={'lg'} placeholder='Rate' />
                    </InputGroup>
                </Flex>
                
                <Text>-</Text>
                
                <Flex flex={1} gap={2} flexDirection={'column'} >
                    <InputGroup size={'sm'}>
                        <InputLeftAddon rounded={'lg'} children='$' />
                        <Input {...field} value={field.value['end']} onChange={(e) => {setValue({...field.value, end:e.target.value})}} type='number' rounded={'lg'} placeholder='Rate' />
                    </InputGroup>
                </Flex>            
            </Flex>
            <Checkbox {...field} value={field.value['negotiable']} onChange={(e) => {setValue({...field.value, negotiable:e.target.value})}} defaultChecked>Negotiable</Checkbox>
        </Flex>
    )
}

export default SalaryRange