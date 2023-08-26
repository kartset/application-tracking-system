import { 
    ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, 
    ChevronLeftIcon, ChevronRightIcon 
} from "@chakra-ui/icons";
import { 
    Button, Flex, HStack, Icon, Menu, 
    MenuButton, MenuItem, MenuList, Text, 
    chakra, useColorModeValue 
} from "@chakra-ui/react";
import { useState } from "react";

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

export default Pagination