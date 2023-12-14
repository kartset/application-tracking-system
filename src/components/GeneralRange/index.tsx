import { Flex, Input, Text } from "@chakra-ui/react"

export const GeneralRange:React.FC<any> = (props) => {
    const { field, form } = props
    return (
        <Flex gap={2} justifyContent={'center'} alignItems={'center'} flex={1}>
            <Input {...field} value={field.value['start']} onChange={(e) => {form.setValues({...form.values, equity: {...form.values.equity, start:e.target.value}})}} placeholder="Lower ESOP Limit" type="number" rounded={'lg'} size={'sm'} />
            <Text>-</Text>
            <Input {...field} value={field.value['end']} onChange={(e) => {form.setValues({...form.values, equity: {...form.values.equity, end:e.target.value}})}} placeholder="Upper ESOP Limit" type="number" rounded={'lg'} size={'sm'} />    
        </Flex>
    )
}