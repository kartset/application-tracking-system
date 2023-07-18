import { 
  Flex, Heading, 
  ListItem, List, Grid, GridItem, Center
} from '@chakra-ui/react';
import './App.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Grid templateColumns='repeat(12, 1fr)' className="App">
      <GridItem colSpan={3} >
        <Sidebar />
      </GridItem>
      <GridItem colSpan={9} id="detail">
        <Center><Outlet /></Center>
      </GridItem>
    </Grid>
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
