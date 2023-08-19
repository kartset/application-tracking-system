import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Avatar, AvatarBadge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Grid, GridItem, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import img from '../../assets/bell.png'

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewPdubiwZ-wA40RGuCnUu-IBIkj3iSCGGd6s5Hf7Q&s'

const Navbar = () => {
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

export default Navbar