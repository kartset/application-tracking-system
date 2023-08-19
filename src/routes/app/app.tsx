import { Grid, GridItem,} from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import Sidebar from "./sidebar"


const AppWrapper = () => {
    return (
        <Grid templateColumns={'repeat(12, 1fr)'} flexDirection={'row'} height={605} bgColor={'#131215'}>
            <GridItem colSpan={2}>
                <Sidebar />
            </GridItem>
            <GridItem rounded={'2xl'} colSpan={10}>
                <Grid rounded={'2xl'} height={593} templateRows='repeat(22, 1fr)' mt={1} mb={2} mr={2} bgColor={'#F8F8FF'} >
                    <GridItem style={{borderTopLeftRadius:'1rem', borderTopRightRadius:'1rem', boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)'}} backgroundColor={'white'} rowSpan={2}>
                        <Navbar />
                    </GridItem>
                    <Outlet />
                </Grid>
            </GridItem>
        </Grid>
    )
}

export default AppWrapper