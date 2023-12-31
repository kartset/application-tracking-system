import { 
    DeleteIcon, EditIcon, HamburgerIcon 
} from "@chakra-ui/icons"
import { 
    Flex, IconButton, Table, TableContainer, 
    Tbody, Td, Th, Thead, Tr 
} from "@chakra-ui/react"

const AppTable = ({data, columns}:any) => {
    return (
        <TableContainer width={'inherit'} borderRadius={'1rem'} >
            <Table size='sm'>
                <Thead bgColor={'white'}>
                    <Tr>{columns.map((col:any) => (<Th p={3} key={col.name} textAlign={'center'}>{col.name}</Th>))}</Tr>
                </Thead>
                <Tbody>
                    {data.map((d:any,i:any) => {
                        let dataLen = Object.keys(d).length
                        let arr = Array.from({length: dataLen-2}, (v, i) => i)
                        return (
                            <Tr key={i} >
                                {arr.map((el) => {
                                    let column = columns[el]
                                    let val = 
                                        (column.field === 'remote' || column.field === 'public') ? 
                                             (d[column.field] ? 'True' : 'False') 
                                            : d[column.field]
                                    return (
                                        <Td key={val} p={3} textAlign={'center'} >{val}</Td>
                                    )
                                })}
                                <Td>
                                    <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                        <IconButton size={'sm'} variant={'ghost'} icon={<HamburgerIcon color={'green'} />} aria-label={""} />
                                        <IconButton size={'sm'} variant={'ghost'} icon={<EditIcon color={'blue'} />} aria-label={""} />
                                        <IconButton size={'sm'} variant={'ghost'} icon={<DeleteIcon color={'red'} />} aria-label={""} />
                                    </Flex>
                                </Td>
                            </Tr>        
                        )
                    })}           
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default AppTable