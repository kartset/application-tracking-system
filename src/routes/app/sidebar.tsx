import { 
    Avatar, Flex, Grid, 
    GridItem, Image, Text, useMediaQuery 
} from "@chakra-ui/react"
import { activeLinkStyle, bottomBarStyle, linkStyle, navItems } from "./data"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion";
import { useState } from "react";


const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewPdubiwZ-wA40RGuCnUu-IBIkj3iSCGGd6s5Hf7Q&s'

const Sidebar = () => {
    let location = useLocation()
    let pathname = location.pathname || "/";
    const [hoveredPath, setHoveredPath] = useState(pathname);
    const [ isSmallerThan1024 ] = useMediaQuery('(max-width: 1024px)')
    return (
        <Grid height={'95vh'} width={'100%'} templateRows='repeat(17, 1fr)' >
            <GridItem 
                style={{display:'flex', alignItems:'center', justifyContent:'center'}} 
                className={"brand text-scrolled"} rowSpan={2} 
            >
                AT-System
            </GridItem>
            <GridItem color={'white'} display={{base:'none', md:'block', xl:'none'}} >
                <Avatar size={'sm'} src={url} />
                <Text pt={2} >Kartik Setia</Text>
            </GridItem>
            <GridItem
                display={{base:'none', xl:'flex' }} 
                style={{alignItems:'center', justifyContent:'center'}} 
                rowSpan={3}
            >
                <Image width={'35%'} height={'90%'} borderRadius={'10px'} src={url} />        
            </GridItem>
            <GridItem
                display={{base:'none', xl:'flex' }} 
                fontSize={'14px'} color={'white'} rowSpan={2} 
                style={{
                   flexDirection:'column', 
                    alignItems:'center', justifyContent:'center'
                }} 
            >
                <Text>Kartik Setia</Text>
                <Text color={'#606267'} >kartset10@gmail.com</Text>
            </GridItem>
            <GridItem  
                style={{
                    display:'flex', flexDirection:'column', alignItems:'center',
                    justifyContent: 'start',width: '100%',borderRadius: '0.4rem',                      
                }} 
                fontSize={'14px'} 
                color={'white'} 
                rowSpan={10}
            >
                {navItems.map(item => { 
                    const isActive = item.path === pathname;
                    return (                          
                        <Link
                            onMouseOver={() => setHoveredPath(item.path) }
                            onMouseLeave={() => setHoveredPath(pathname)} 
                            key={item.path}
                            {...(item.newTab && {target:"_blank"})} 
                            data-active={isActive}
                            style={{
                                padding:'8px',
                                position:'relative',
                                paddingLeft:'16px', width:'80%',
                                ...linkStyle,
                                ...(isActive ? activeLinkStyle : {}),
                              }}
                            to={item.path}
                        >
                            {item.path  === hoveredPath ? (
                                <motion.div
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        ...bottomBarStyle,
                                        width:'100%',
                                        ...(isSmallerThan1024 ? {justifyContent:'center'} : {})
                                    }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.25,
                                        stiffness: 130,
                                        damping: 9,
                                        duration: 0.3,
                                    }}
                                >
                                    <Image boxSize='20px' src={item.img} />
                                    <Text 
                                        display={{base:'none', xl:'block'}} 
                                        ml={3} 
                                        fontSize={{base:'12px', '2xl':'19px'}}
                                    >
                                        {item.name}
                                    </Text>
                                </motion.div>
                            ) : <Flex 
                                    p={1} pl={4} width={'80%'}
                                    justifyContent={{base:'center', xl:'start'}} 
                                    borderRadius={'10px'} alignItems={'center'}
                                    paddingLeft={'4px'}

                                >
                                    <Image boxSize='20px' src={item.img} />
                                    <Text 
                                        display={{base:'none', xl:'block'}} 
                                        ml={3} fontSize={{base:'12px', '2xl':'19px'}}
                                    >
                                        {item.name}
                                    </Text>
                                </Flex>
                            }
                        </Link>
                    )
                })}
            </GridItem>
        </Grid>
    ) 
}

export default Sidebar