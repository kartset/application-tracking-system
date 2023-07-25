import { 
    Flex, Grid, GridItem 
} from '@chakra-ui/react'
import Navbar from '../../components/Navbar/navbar'
import List from './list'
import Filter from './filter'

const Jobs = () => {
    return (
        <Flex flexDirection={'column'}>
            <Navbar />
            <Grid templateColumns='repeat(4, 1fr)' pt={50} mt={0} bgColor={'#edf3f8'}>
                <GridItem colSpan={1} ><Filter /></GridItem>
                <GridItem colSpan={3}><List /></GridItem>
            </Grid>
        </Flex>
    )
}

export default Jobs
