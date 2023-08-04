import { AddIcon, ChevronDownIcon, ChevronRightIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons"
import img from '../../assets/bell.png'
import { Link } from "react-router-dom"
import { 
    Avatar, AvatarBadge, Box, Button, Menu, MenuButton, MenuItem, 
    MenuList,  Breadcrumb,BreadcrumbItem, BreadcrumbLink,
    Grid, GridItem, Heading, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, 
} from "@chakra-ui/react"

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewPdubiwZ-wA40RGuCnUu-IBIkj3iSCGGd6s5Hf7Q&s'

const Vacancies = () => {
    return (
        <Grid templateColumns={'repeat(12, 1fr)'} flexDirection={'row'} height={605} bgColor={'#131215'}>
            <GridItem colSpan={2}>
                <AppSidebar />
            </GridItem>
            <GridItem rounded={'2xl'} colSpan={10}>
                <Grid rounded={'2xl'} height={593} templateRows='repeat(22, 1fr)' mt={1} mb={2} mr={2} bgColor={'#F8F8FF'} >
                    <GridItem rounded={'2xl'} style={{boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'}} backgroundColor={'white'} rowSpan={2}>
                        <AppNavbar />
                    </GridItem>
                    <GridItem mt={6} as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} rowSpan={2}>
                        <Box ml={4} ><Heading as={'h4'} size={'md'} >Vacancies</Heading></Box>
                        <Box mr={4} ><Button variant={'solid'} leftIcon={<AddIcon />} colorScheme='teal' size={'sm'} >Add New</Button></Box>
                    </GridItem>
                    <GridItem ml={4} rounded={'2xl'} mr={4} mt={6} as={'div'} style={{backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)', display:'grid', alignItems:'center'}} rowSpan={6}>
                        <VacanciesSearchBar />
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    )
}

const AppNavbar = () => {
    return (
        <Grid height={'-webkit-fill-available'} templateColumns='repeat(12, 1fr)' >
            <GridItem as={'div'} style={{paddingTop:'5px', alignSelf:'center', paddingLeft:'7px'}} colSpan={10}>
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
    <Box></Box>
  )
}

const VacanciesSearchBar = () => {
    return (
        <Grid ml={4} gap={6} templateColumns={'repeat(6, 1fr)'}>
            <GridItem colSpan={3} >
                <FormControl>
                    <FormLabel>What are you looking for ?</FormLabel>
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
                    <FormLabel>Category</FormLabel>
                    <Select size={'sm'} rounded={'lg'} placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select size={'sm'} rounded='lg' placeholder='All'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'end'}} colSpan={1}>
                <Button pr={8} pl={8} colorScheme='teal' size='sm'>Search</Button>
            </GridItem>
        </Grid>
    )
}



export default Vacancies
