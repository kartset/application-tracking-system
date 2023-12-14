import { Flex, Select, Text } from "@chakra-ui/react"
import { useField } from "formik"

const TimeRange:React.FC<any> = (props) => {
    const { name } = props
    const [field, meta, {setValue}] = useField(props);
    return (
        <Flex flexDirection={'column'} >
            <Flex flexDirection={'row'} gap={2} >
                <SelectTime field={field} setValue={setValue} name={name} property={['startTime', 'startTimeMeridiem']}  />
                <Text>-</Text>
                <SelectTime field={field} setValue={setValue} name={name} property={['endTime', 'endTimeMeridiem']} />
            </Flex>
        </Flex>
    )
}


export const SelectTime:React.FC<any> = ({property, setValue, field, ...props}) => {
    let meridiemOptions = [
        {value:'ante', text:'a.m.'},
        {value:'post', text:'p.m'}
    ]
    return (<>
        <Flex gap={2} flexDirection={'column'} >
            <Select {...field} value={field.value[property[0]]} onChange={(e) => setValue({...field.value, [property[0]]:e.target.value})} rounded={'lg'} size={'sm'} placeholder='Select'>
                { [0,1,2,3,4,5,6,7,8,9,10,11,12].map((a,i) => {
                    return (<option key={a} value={i}>{a}</option>)
                })}
            </Select>
        </Flex>
        <Flex gap={2} flexDirection={'column'}>
            <Select {...field} onChange={(e) => setValue({...field.value, [property[1]]:e.target.value})} value={field.value[property[1]]} rounded={'lg'} size={'sm'} placeholder='Select'>
                {meridiemOptions.map((option:any) => {
                    return (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    )

                })}
            </Select>
        </Flex>
    </>)
}

export default TimeRange