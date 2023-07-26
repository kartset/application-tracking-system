import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Box, Button, Flex, chakra, useDisclosure } from '@chakra-ui/react'
import NavModal from '../Modal/modal';

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalTitle, setModalTitle] = useState('')

    // Function to handle the scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
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
        <chakra.nav>
             <Box className={`navbar ${scrolling ? "scrolled" : ""}`}>
                <Box className={`brand ${scrolling ? "text-scrolled" : ""}`}>AT-System</Box>
                <Flex>
                    <Button onClick={() => {onOpen();setModalTitle('Log In')}} size={'sm'} color='white' _hover={{bgColor:'#394867'}} bgColor='#394867' mr={2} >Login</Button>
                    <Button variant={'outline'} borderColor={'#394867'} onClick={() => {onOpen();setModalTitle('Sign In')}} size={'sm'} color={scrolling ? 'white' : '#394867'} _hover={{bgColor:scrolling ? '#394867' : '#edf3f8'}} bgColor={scrolling ? '#394867': '#edf3f8'} >Signin</Button>
                </Flex>
            </Box>
            <NavModal modalTitle={modalTitle} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </chakra.nav>
    )
}

export default Navbar