import {useState} from 'react';
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import Header from './components/Header/Header';
import "@fontsource/open-sans";
import theme from './theme';
import Sidebar from './components/Sidebar/Sidebar';

import Main from './components/Main'
import Footer from './components/Footer/Footer';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
          <Sidebar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
          <Box sx={{flexGrow: 1, display:'flex', flexDirection:'column'}}> 
            <Main/>
            <Footer/>
          </Box>

        </Box>

      </ThemeProvider>
    </>
  );
}

export default App;
