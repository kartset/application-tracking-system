import { 
    Flex, Heading, 
    ListItem, List, Grid, GridItem
} from '@chakra-ui/react';
import './App.css';
import { Outlet } from "react-router-dom";

function App() {
    let showSidebar = false
    return (
        <>
            <Grid  templateColumns='repeat(12, 1fr)' className="App">
               { showSidebar ? <GridItem colSpan={3} ><Sidebar /></GridItem> : <></>}
                <GridItem colSpan={showSidebar ? 9 : 12} id="detail">
                    <Outlet />
                </GridItem>
            </Grid>
        </>
    );
}
function Sidebar() {
    return (
        <Flex id="sidebar" justifyContent={'flex-start'} flexDirection={'column'}>
            <Heading as={'h4'} size={'md'}>Side Bar</Heading>
            <Flex justifyContent={'space-evenly'}>
                    
            </Flex>
            <List>
                <ListItem>
                </ListItem>
                <ListItem>
                </ListItem>
            </List>
        </Flex>
    );
}

export default App;
