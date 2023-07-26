import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Box, Button, Flex, chakra, useDisclosure } from '@chakra-ui/react'
import NavModal from '../Modal/modal';

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                    <Button onClick={onOpen} size={'sm'} color='white' _hover={{bgColor:'#394867'}} bgColor='#394867' mr={2}>Signup</Button>
                    <Button size={'sm'} color='white' _hover={{bgColor:'#394867'}} bgColor='#394867' >Login</Button>
                </Flex>
            </Box>
            <NavModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </chakra.nav>
    )
}

export default Navbar