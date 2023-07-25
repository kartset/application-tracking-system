import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Box, Button, Flex, chakra } from '@chakra-ui/react'

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);

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
                    <Button size={'sm'} color='white' _hover={{bgColor:'#394867'}} bgColor='#394867' mr={2}>Signup</Button>
                    <Button size={'sm'} color='white' _hover={{bgColor:'#394867'}} bgColor='#394867' >Login</Button>
                </Flex>
            </Box>
        </chakra.nav>
    )
}

export default Navbar