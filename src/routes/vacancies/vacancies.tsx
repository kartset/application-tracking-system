import { 
    AddIcon, ArrowLeftIcon, ArrowRightIcon, 
    ChevronDownIcon, ChevronLeftIcon, 
    ChevronRightIcon, DeleteIcon, EditIcon, 
    HamburgerIcon, Search2Icon 
} from "@chakra-ui/icons"
import img from '../../assets/bell.png'
import dash from '../../assets/blue.png'
import check from '../../assets/check.png'
import people from '../../assets/youth.png'
import clock from '../../assets/wall-clock.png'
import chat from '../../assets/chat.png'
import link from '../../assets/link.png'



import { Link } from "react-router-dom"
import { 
    Avatar, AvatarBadge, Box, Button, 
    Menu, MenuButton, MenuItem, MenuList,  
    Breadcrumb,BreadcrumbItem, BreadcrumbLink,
    Grid, GridItem, Heading, FormControl, FormLabel, 
    Input, InputGroup, InputLeftElement, Select, 
    TableContainer, Table, Thead, Tr, Th, Tbody, Td, 
    chakra, useColorModeValue, Icon, Flex, HStack, 
    Text, IconButton, Image, 
} from "@chakra-ui/react"
import { useState } from "react"

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewPdubiwZ-wA40RGuCnUu-IBIkj3iSCGGd6s5Hf7Q&s'

const Vacancies = () => {
    return (
        <Grid templateColumns={'repeat(12, 1fr)'} flexDirection={'row'} height={605} bgColor={'#131215'}>
            <GridItem colSpan={2}>
                <AppSidebar />
            </GridItem>
            <GridItem rounded={'2xl'} colSpan={10}>
                <Grid rounded={'2xl'} height={593} templateRows='repeat(22, 1fr)' mt={1} mb={2} mr={2} bgColor={'#F8F8FF'} >
                    <GridItem style={{borderTopLeftRadius:'1rem', borderTopRightRadius:'1rem', boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)'}} backgroundColor={'white'} rowSpan={2}>
                        <AppNavbar />
                    </GridItem>
                    <GridItem mt={3} as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} rowSpan={2}>
                        <Box ml={4} ><Heading as={'h4'} size={'md'} >Vacancies</Heading></Box>
                        <Box mr={4} ><Button rounded={'xl'} variant={'solid'} leftIcon={<AddIcon />} colorScheme='teal' size={'sm'} >Add New</Button></Box>
                    </GridItem>
                    <GridItem ml={4} rounded={'2xl'} mr={4} mt={3} as={'div'} style={{backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)', display:'grid', alignItems:'center'}} rowSpan={4}>
                        <VacanciesSearchBar />
                    </GridItem>
                    <GridItem style={{ borderRadius:'1rem', border:'1px #E3E9F0 solid', backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)'}} ml={4} mr={4} mt={3} rowSpan={13}>
                        <AppTable />
                        <Flex justifyContent={'space-between'}>
                            <Flex p={3}>
                                <Text wordBreak="unset">Go to:</Text>
                                <Input ml={1} size='xs' rounded={'lg'} w="40px" />
                            </Flex>
                            <Pagination />
                        </Flex>
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    )
}

const AppNavbar = () => {
    return (
        <Grid height={'-webkit-fill-available'} templateColumns='repeat(12, 1fr)' >
            <GridItem pl={4} as={'div'} style={{paddingTop:'5px', alignSelf:'center'}} colSpan={10}>
                <Breadcrumb  fontWeight={400} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} href='#'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={Link} href='#'>Vacancies</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </GridItem>
            <GridItem as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', paddingTop:'5px'}}  colSpan={2}>
                <Avatar src={img} size='xs' >
                    <AvatarBadge placement='top-end' boxSize="1.50em" bg="green.500">4</AvatarBadge>
                </Avatar>
                <Avatar size={'sm'} src={url} />
                <Menu>
                    <MenuButton size='sm' variant={'ghost'} style={{fontWeight:'normal'}} as={Button} rightIcon={<ChevronDownIcon />}>
                        Kartik Setia
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </GridItem>
        </Grid>
    )
}

const AppSidebar = () => {
  return (
    <Grid height={593} templateRows='repeat(17, 1fr)' >
        <GridItem style={{display:'flex', alignItems:'center', justifyContent:'center'}} className={"brand text-scrolled"} rowSpan={2} >AT-System</GridItem>
        <GridItem style={{display:'flex', alignItems:'center', justifyContent:'center'}} rowSpan={3}>
            <Image width={'35%'} height={'90%'} borderRadius={'10px'} src={url} />
        </GridItem>
        <GridItem style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} fontSize={'14px'} color={'white'} rowSpan={2} >
            <Text>Kartik Setia</Text>
            <Text color={'#606267'} >kartset10@gmail.com</Text>
        </GridItem>
        <GridItem gap={3} style={{display:'flex', flexDirection:'column', alignItems:'center'}} fontSize={'14px'} color={'white'} rowSpan={10}>
            <Flex alignItems={'center'} >
                <Image boxSize='20px' src={dash} />
                <Text ml={3} fontSize={'19px'}>Dashboard</Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
            <Image boxSize='20px' src={check} />
                <Text  ml={3} fontSize={'19px'}>Vacancies</Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Image boxSize='20px' src={people} />
                <Text ml={3} fontSize={'19px'}>Candidates</Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Image boxSize='20px' src={clock} />
                <Text ml={3} fontSize={'19px'}>Schedules</Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Image boxSize='20px' src={people} />
                <Text ml={3} fontSize={'19px'}>Employess</Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Image boxSize='20px' src={chat} />
                <Text ml={3} fontSize={'19px'}>Chat</Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Image boxSize='20px' src={link} />
                <Text ml={3} fontSize={'19px'}>Connected Apps</Text>
            </Flex>
        </GridItem>
    </Grid>
  ) 
}

const VacanciesSearchBar = () => {
    return (
        <Grid ml={4} gap={10} templateColumns={'repeat(6, 1fr)'}>
            <GridItem colSpan={3} >
                <FormControl>
                    <FormLabel fontSize={'12px'} >What are you looking for ?</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                        <Search2Icon color='gray.300' />
                        </InputLeftElement>
                        <Input variant={'filled'} rounded={'lg'} size={'sm'} type='tel' placeholder='Search for category, name, company, etc' />
                    </InputGroup>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl>
                    <FormLabel fontSize={'12px'} >Category</FormLabel>
                    <Select fontSize={'12px'} size={'sm'} rounded={'lg'} placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl>
                    <FormLabel fontSize={'12px'} >Status</FormLabel>
                    <Select fontSize={'12px'} size={'sm'} rounded='lg' placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'end'}} colSpan={1}>
                <Button rounded={'xl'} pr={8} pl={8} colorScheme='teal' size='sm'>Search</Button>
            </GridItem>
        </Grid>
    )
}

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


const Pagination = () => {
    
    const PagButton = (props:any) => {
        const activeStyle = {
            bg: "brand.600",
            _dark: {bg: "brand.500",},
            fontWeight:'bold', 
            backgroundColor: '#EDF2F9'
        };
        return (
            <Button variant={'outline'} fontWeight={'normal'} size={'xs'} mx={1} px={4} py={2} rounded="md" bg="white" _dark={{bg: "gray.800",}}
                color="gray.700" opacity={props.disabled && 0.6} 
                cursor={props.disabled && "not-allowed"} {...(props.active && activeStyle)}
            >
                {props.children}
            </Button>
        );
    };
  
    const MButton = (props:any) => {
        const DoubleArrow = props.left ? ArrowLeftIcon : ArrowRightIcon;
        const [hovered, setHovered] = useState(false);
        const hoverColor = useColorModeValue("brand.800", "brand.700");
        return (
            <chakra.a w={4} py={2} color="gray.700" _dark={{color: "gray.200",}}
                onMouseOver={() => setHovered(true)}
                onMouseOut={() => setHovered(false)}
                cursor="pointer"
                textAlign="center"
            >
                {hovered ? (
                    <Icon
                        as={DoubleArrow}
                        boxSize={3}
                        cursor="pointer"
                        color={hoverColor}
                    />
                ) : (<Text color={'black'} boxSize={4} opacity={0.5}>...</Text>)}
            </chakra.a>
        );
    };
  
    return (
        <Flex mr={2}>
            <HStack>
                <PagButton>
                    <Icon as={ChevronLeftIcon} color="gray.700" _dark={{color: "gray.200",}} boxSize={4} />
                </PagButton>
                <PagButton>1</PagButton>
                <PagButton active>2</PagButton>
                <PagButton>3</PagButton>
                <MButton right />
                <PagButton>50</PagButton>
                <PagButton>
                    <Icon as={ChevronRightIcon} color="gray.700" _dark={{ color: "gray.200"}} boxSize={4}/>
                </PagButton>
                <Menu size={'sm'} >
                    <MenuButton fontWeight={'normal'} size={'xs'} ml={1} as={Button} rightIcon={<ChevronDownIcon />}>10 / page</MenuButton>
                    <MenuList >
                        <MenuItem>20 / page</MenuItem>
                        <MenuItem>30 / page</MenuItem>
                        <MenuItem>40 / page</MenuItem>
                        <MenuItem>50 / page</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
  };




export default Vacancies
