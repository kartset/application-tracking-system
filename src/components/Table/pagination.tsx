import { 
    ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, 
    ChevronLeftIcon, ChevronRightIcon 
} from "@chakra-ui/icons";
import { 
    Button, Flex, HStack, Icon, Menu, 
    MenuButton, MenuItem, MenuList, Text, 
    chakra, useColorModeValue 
} from "@chakra-ui/react";
import { Fragment, useState } from "react";

const Pagination = ({pageIndex, pageSize, totalItemCount}:any) => {

    let totalPages = Math.ceil(totalItemCount/pageSize)
    let itemsPerPageOptions = [
        { text: '5/page',  value: 5,  selected: true },
        { text: '10/page', value: 10, selected: false },
        { text: '15/page', value: 15, selected: false },
        { text: '20/page', value: 20, selected: false },
        { text: '25/page', value: 25, selected: false },
    ]
  
    return (
        <Flex mr={2}>
            <HStack>
                <PagButton>
                    <Icon 
                        as={ChevronLeftIcon} 
                        color="gray.700" 
                        _dark={{color: "gray.200",}} 
                        boxSize={4} 
                    />
                </PagButton>
                {Array.from({length: totalPages }, (v, i) => i).map((el) => {
                    return (
                        <Fragment key={el} >
                            <PagButton active={pageIndex === el+1} >{el+1}</PagButton>
                            {totalPages >= 4 && (el+1) === 3 ? <MButton right /> : <></> }
                        </Fragment>
                    )
                })}
                <PagButton>
                    <Icon as={ChevronRightIcon} color="gray.700" _dark={{ color: "gray.200"}} boxSize={4}/>
                </PagButton>
                <Menu size={'sm'} >
                    <MenuButton
                        isDisabled 
                        fontWeight={'normal'} 
                        size={'xs'} ml={1} 
                        as={Button} 
                        rightIcon={<ChevronDownIcon />}
                    >
                        {itemsPerPageOptions.filter(item => item.selected)[0].text}
                    </MenuButton>
                    <MenuList >
                        {itemsPerPageOptions.filter(item => !item.selected).map(item => {
                            return (
                                <MenuItem>{item.text}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
};

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

export default Pagination