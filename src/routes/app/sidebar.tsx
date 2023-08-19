import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react"
import dash from '../../assets/blue.png'
import check from '../../assets/check.png'
import people from '../../assets/youth.png'
import clock from '../../assets/wall-clock.png'
import chat from '../../assets/chat.png'
// import link from '../../assets/link.png'

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewPdubiwZ-wA40RGuCnUu-IBIkj3iSCGGd6s5Hf7Q&s'


const Sidebar = () => {
    return (
        <Grid height={593} templateRows='repeat(17, 1fr)' >
            <GridItem style={{display:'flex', alignItems:'center', justifyContent:'center'}} className={"brand text-scrolled"} rowSpan={2} >AT-System</GridItem>
            <GridItem style={{display:'flex', alignItems:'center', justifyContent:'center'}} rowSpan={3}>
                <Image width={'35%'} height={'90%'} borderRadius={'10px'} src={url} />
            </GridItem>
            <GridItem style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} fontSize={'14px'} color={'white'} rowSpan={2} >
                <Text>Kartik Setia</Text>
                <Text color={'#606267'} >kartset10@gmail.com</Text>
            </GridItem>
            <GridItem gap={3} style={{display:'flex', flexDirection:'column', alignItems:'center'}} fontSize={'14px'} color={'white'} rowSpan={10}>
                <Flex p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={dash} />
                    <Text ml={3} fontSize={'19px'}>Dashboard</Text>
                </Flex>
                <Flex bgColor={'#2A2B2D'} p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={check} />
                    <Text  ml={3} fontSize={'19px'}>Vacancies</Text>
                </Flex>
                <Flex p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={people} />
                    <Text ml={3} fontSize={'19px'}>Candidates</Text>
                </Flex>
                <Flex p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={clock} />
                    <Text ml={3} fontSize={'19px'}>Schedules</Text>
                </Flex>
                <Flex p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={people} />
                    <Text ml={3} fontSize={'19px'}>Employess</Text>
                </Flex>
                <Flex p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={chat} />
                    <Text ml={3} fontSize={'19px'}>Chat</Text>
                </Flex>
                {/* <Flex p={2} pl={4} width={'80%'} justifyContent={'start'} borderRadius={'10px'} alignItems={'center'} >
                    <Image boxSize='20px' src={link} />
                    <Text ml={3} fontSize={'19px'}>Connected Apps</Text>
                </Flex> */}
            </GridItem>
        </Grid>
    ) 
}

export default Sidebar