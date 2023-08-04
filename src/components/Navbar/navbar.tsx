import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Avatar, Box, Button, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, chakra, useDisclosure } from '@chakra-ui/react'
import NavModal from '../Modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { googleLogout } from '@react-oauth/google';
import { setProfile, setUser } from '../../redux/reducers/login/login';

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalTitle, setModalTitle] = useState('')
    const { profile } = useSelector((state:RootState) => state.login)
    const dispatch = useDispatch()

    // Function to handle the scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    const logOut = () => {
        googleLogout();
        dispatch(setProfile({}));
        dispatch(setUser({}))
    };
  
    useEffect(() => {
      // Attach the scroll event listener when the component mounts
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
        <chakra.nav className='nav'>
             <Box className={`navbar ${scrolling ? "scrolled" : ""}`}>
                <Box className={`brand ${scrolling ? "text-scrolled" : ""}`}>AT-System</Box>
                {Object.keys(profile).length === 0 ?
                    <Flex>
                        <Button onClick={() => {onOpen();setModalTitle('Log In')}} size={'sm'} color='white' _hover={{bgColor:'#394867'}} bgColor='#394867' mr={2} >Login</Button>
                        <Button variant={'outline'} borderColor={'#394867'} onClick={() => {onOpen();setModalTitle('Sign In')}} size={'sm'} color={scrolling ? 'white' : '#394867'} _hover={{bgColor:scrolling ? '#394867' : '#edf3f8'}} bgColor={scrolling ? '#394867': '#edf3f8'} >Signin</Button>
                    </Flex>
                :   <Flex>
                        <Menu>
                            <MenuButton variant={'ghost'} as={Button} rightIcon={<ChevronDownIcon />}>
                                <Avatar mt={1} size={'sm'} src={profile.picture} />
                            </MenuButton>
                            <MenuList>
                                <Box style={{textAlign:'center'}}>Hello, <b><i>{profile.name}</i></b></Box>
                                <Divider />
                                <MenuItem onClick={logOut}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                }
            </Box>
            <NavModal modalTitle={modalTitle} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </chakra.nav>
    )
}

export default Navbar