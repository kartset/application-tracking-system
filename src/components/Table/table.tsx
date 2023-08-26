import { 
    DeleteIcon, EditIcon, HamburgerIcon 
} from "@chakra-ui/icons"
import { 
    Flex, IconButton, Table, TableContainer, 
    Tbody, Td, Th, Thead, Tr 
} from "@chakra-ui/react"

const AppTable = () => {
    return (
        <TableContainer borderRadius={'1rem'} >
            <Table size='sm'>
                <Thead bgColor={'white'}>
                    <Tr>
                        <Th p={3} >Position</Th>
                        <Th p={3} >Type</Th>
                        <Th p={3} >Curr. Vac.</Th>
                        <Th p={3} >Public</Th>
                        <Th p={3} >Remote</Th>
                        <Th p={3} >Posted</Th>
                        <Th p={3} >Salary</Th>
                        <Th p={3} >Location</Th>
                        <Th p={3} >Experience</Th>
                        <Th p={3} >Equity</Th>
                        <Th p={3}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td p={3} >SDE-1 Frontend</Td>
                        <Td p={3} >Full-Time</Td>
                        <Td p={3} textAlign={'center'} >4</Td>
                        <Td p={3} >Yes</Td>
                        <Td p={3} >True</Td>
                        <Td p={3} >23-10-2023</Td>
                        <Td p={3} >10-12Lac</Td>
                        <Td p={3} >Delhi</Td>
                        <Td p={3} >5+ years</Td>
                        <Td p={3} >0.1-0.5%</Td>
                        <Td>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <IconButton size={'sm'} variant={'ghost'} icon={<HamburgerIcon color={'green'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<EditIcon color={'blue'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<DeleteIcon color={'red'} />} aria-label={""} />
                            </Flex>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td p={3} >SDE-1 Backend</Td>
                        <Td p={3} >Full Time</Td>
                        <Td p={3} textAlign={'center'} >7</Td>
                        <Td p={3} >No</Td>
                        <Td p={3} >True</Td>
                        <Td p={3} >23-10-2023</Td>
                        <Td p={3} >10-12Lac</Td>
                        <Td p={3} >Gurugram</Td>
                        <Td p={3} >Fresher</Td>
                        <Td p={3} >0.1-0.5%</Td>
                        <Td>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <IconButton size={'sm'} variant={'ghost'} icon={<HamburgerIcon color={'green'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<EditIcon color={'blue'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<DeleteIcon color={'red'} />} aria-label={""} />
                            </Flex>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td p={3} >Business Manager</Td>
                        <Td p={3} >Part Time</Td>
                        <Td p={3} textAlign={'center'} >10</Td>
                        <Td p={3} >No</Td>
                        <Td p={3} >False</Td>
                        <Td p={3} >23-10-2023</Td>
                        <Td p={3} >10-12Lac</Td>
                        <Td p={3} >Noida</Td>
                        <Td p={3} >10+</Td>
                        <Td p={3} >0.1-0.5%</Td>
                        <Td>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <IconButton size={'sm'} variant={'ghost'} icon={<HamburgerIcon color={'green'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<EditIcon color={'blue'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<DeleteIcon color={'red'} />} aria-label={""} />
                            </Flex>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td p={3} >Business Manager</Td>
                        <Td p={3} >Part Time</Td>
                        <Td p={3} textAlign={'center'} >10</Td>
                        <Td p={3} >No</Td>
                        <Td p={3} >False</Td>
                        <Td p={3} >23-10-2023</Td>
                        <Td p={3} >10-12Lac</Td>
                        <Td p={3} >Noida</Td>
                        <Td p={3} >10+</Td>
                        <Td p={3} >0.1-0.5%</Td>
                        <Td>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <IconButton size={'sm'} variant={'ghost'} icon={<HamburgerIcon color={'green'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<EditIcon color={'blue'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<DeleteIcon color={'red'} />} aria-label={""} />
                            </Flex>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td  p={3} >Business Manager</Td>
                        <Td  p={3} >Part Time</Td>
                        <Td  p={3} textAlign={'center'} >10</Td>
                        <Td  p={3} >No</Td>
                        <Td  p={3} >False</Td>
                        <Td  p={3} >23-10-2023</Td>
                        <Td  p={3} >10-12Lac</Td>
                        <Td  p={3} >Noida</Td>
                        <Td  p={3} >10+</Td>
                        <Td  p={3} >0.1-0.5%</Td>
                        <Td>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <IconButton size={'sm'} variant={'ghost'} icon={<HamburgerIcon color={'green'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<EditIcon color={'blue'} />} aria-label={""} />
                                <IconButton size={'sm'} variant={'ghost'} icon={<DeleteIcon color={'red'} />} aria-label={""} />
                            </Flex>
                        </Td>
                    </Tr>                   
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default AppTable