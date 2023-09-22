import { Flex, Select, Text } from "@chakra-ui/react"
import { useField } from "formik"

const TimeRange:React.FC<any> = (props) => {
    const { name } = props
    return (<>
        <SelectTime name={name} property={['startTime', 'startTimeMeridiem']}  />
        <Text>-</Text>
        <SelectTime name={name} property={['endTime', 'endTimeMeridiem']} />
    </>)
}


export const SelectTime:React.FC<any> = ({property, ...props}) => {
    let meridiemOptions = [
        {value:'ante', text:'a.m.'},
        {value:'post', text:'p.m'}
    ]
    const [field, meta, {setValue}] = useField(props);
    return (<>
        <Flex gap={2} flexDirection={'column'} >
            <Select {...field} value={field.value[property[0]]} onChange={(e) => setValue({...field.value, [property[0]]:e.target.value})} rounded={'lg'} size={'sm'} placeholder='Select'>
                { [0,1,2,3,4,5,6,7,8,9,10,11,12].map((a,i) => {
                    return (<option key={a} value={i}>{a}</option>)
                })}
            </Select>
            <Text>{(meta as any).error && (meta as any).error[property[0]] && (meta as any).error[property[0]] }</Text>
        </Flex>
        <Flex gap={2} flexDirection={'column'}>
            <Select {...field} onChange={(e) => setValue({...field.value, [property[1]]:e.target.value})} value={field.value[property[1]]} rounded={'lg'} size={'sm'} placeholder='Select'>
                {meridiemOptions.map((option:any) => {
                    return (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    )

                })}
            </Select>
            <Text>{(meta as any).error && (meta as any).error[property[1]] && (meta as any).error[property[1]]}</Text>
        </Flex>
    </>)
}

export default TimeRange