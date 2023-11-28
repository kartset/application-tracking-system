import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import { 
    Badge, Drawer, DrawerBody, DrawerContent, 
    DrawerHeader, DrawerOverlay, Flex, Grid, 
    GridItem, IconButton, Menu, MenuButton, MenuItem, 
    MenuList, useDisclosure
} from "@chakra-ui/react"
import React, { Fragment, useState } from "react"
import { toTitleCase } from "../../utils/helpers"
import { DeleteIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons"

const MobileTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { vacanciesList } = useSelector((state:RootState) => state.vacancies)
    const [currentVacancy, setCurrentVacancy] = useState({})
    return (<>
        <Fragment>
            <Flex
                fontWeight={'bold'} pt={4} pb={4} fontSize={'13px'} 
                justifyContent={'space-between'} textAlign={'start'} 
                ml={3} mr={3}
            >
                <p style={{fontSize:'16px'}} >Postions</p>
                <p style={{fontSize:'16px'}} >Actions</p>
            </Flex>
            <Grid templateColumns={'repeat(2, 1fr)'} height={'80%'} paddingBottom={4} >
                {vacanciesList.map((vac:any, i:any) => {
                    return (
                        <GridItem
                            display={'flex'} rowSpan={1} colSpan={2} key={i}
                            fontWeight={'normal'} pb={2} fontSize={'13px'} 
                            justifyContent={'space-between'} textAlign={'start'}
                            alignItems={'center'} ml={3} mr={3}
                            onClick={() => {onOpen();setCurrentVacancy(vac)}}
                        >
                            <p style={{fontSize:'16px'}} >{vac.position}</p>
                            <Menu>
                                <MenuButton 
                                    as={IconButton} icon={<HamburgerIcon />} size={'xs'}
                                    variant='ghost' onClick={(e) => e.stopPropagation()} 
                                />
                                <MenuList>
                                    <MenuItem icon={<ExternalLinkIcon />} >Make Public</MenuItem>
                                    <MenuItem icon={<DeleteIcon />} >Delete</MenuItem>
                                
                                </MenuList>
                            </Menu>
                        </GridItem>
                    )
                })}
            </Grid>
        </Fragment>
        <TableDrawer isOpen={isOpen} onClose={onClose} currentVacancy={currentVacancy} /> 
    </>)
}

const TableDrawer:React.FC<any> = ({isOpen, onClose, currentVacancy }) => { 
    let fields = Object.keys(currentVacancy)
    fields.shift()
    let tags = ['public', 'remote']
    return (
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader  borderBottomWidth='1px'>
                {currentVacancy.position}
                <Flex gap={2} >
                    <Badge>public</Badge>
                    <Badge>remote</Badge>
                </Flex>
            </DrawerHeader>
            <DrawerBody>
                <Grid templateColumns={'repeat(3, 1fr)'} >
                    { fields.filter(field => !tags.includes(field)).map((field:string) => {
                        return (
                            <GridItem mb={2} key={field} >
                                <Flex flexDirection={'column'} >
                                    <span style={{fontSize:'12px', fontWeight:'bolder'}} >{toTitleCase(field)}</span>
                                    <span style={{fontSize:'15px', paddingLeft:'5px'}} >{currentVacancy[field]}</span>
                                </Flex>
                            </GridItem>
                        )
                    })}
                </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    )
  }

export default MobileTable