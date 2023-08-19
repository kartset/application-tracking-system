import { Grid, GridItem} from '@chakra-ui/react';
import './App.css';
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <>
            <Grid  templateColumns='repeat(12, 1fr)' className="App">
                <GridItem colSpan={12} id="detail">
                    <Outlet />
                </GridItem>
            </Grid>
        </>
    );
}

export default App;
