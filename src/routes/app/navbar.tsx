import { ChevronDownIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons"
import { 
    Avatar, AvatarBadge, Breadcrumb, BreadcrumbItem, 
    BreadcrumbLink, Button, Grid, GridItem, IconButton, 
    Link, Menu, MenuButton, MenuItem, MenuList, useMediaQuery 
} from "@chakra-ui/react"
import img from '../../assets/bell.png'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSideBarState } from "../../redux/reducers/app"

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewPdubiwZ-wA40RGuCnUu-IBIkj3iSCGGd6s5Hf7Q&s'

const Navbar:React.FC<any> = ({onOpen}) => {

    const navigate = useNavigate()
    const [isLargerThan768] = useMediaQuery('(min-width: 769px)')
    const dispatch = useDispatch()

    const logout = () => {
        if(localStorage.getItem('user')) {
            localStorage.removeItem('user')
            navigate('/app')
            window.location.reload()
        }
    }

    return (
        <Grid height={'-webkit-fill-available'} templateColumns='repeat(12, 1fr)' >
            { isLargerThan768 ? 
                <GridItem pl={4} as={'div'} style={{paddingTop:'5px', alignSelf:'center'}} colSpan={10}>
                    <Breadcrumb fontWeight={400} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={Link} href='#'>Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink as={Link} href='#'>Vacancies</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </GridItem> 
            :  <GridItem style={{paddingTop:'5px', alignSelf:'center'}} colSpan={2} >
                    <IconButton onClick={() => {onOpen();dispatch(setSideBarState()) }} size={'sm'} variant={'outline'} aria-label="SidebarButton" icon={<HamburgerIcon />} />
                </GridItem>
            }
            <GridItem as={'div'} style={{display:'flex', flexDirection:'row', justifyContent:'end', alignItems:'center', paddingTop:'5px'}}  colSpan={isLargerThan768 ? 2 : 10}>
                <Avatar src={img} size='xs' >
                    <AvatarBadge 
                        placement='top-end' 
                        boxSize="1.50em" 
                        bg="green.500"
                    >
                        4
                    </AvatarBadge>
                </Avatar>
               { isLargerThan768 ? <Avatar size={'sm'} src={url} />  : <></>}
                <Menu>
                    <MenuButton size='sm' variant={'ghost'} style={{fontWeight:'normal'}} as={Button} rightIcon={<ChevronDownIcon />}>
                        { isLargerThan768 ? 'Kartik Setia' : <Avatar size={'sm'} src={url} /> }
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={() => {logout()}} >Logout</MenuItem>
                    </MenuList>
                </Menu>
            </GridItem>
        </Grid>
    )
}

export default Navbar