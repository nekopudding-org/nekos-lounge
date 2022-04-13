import {useState, useEffect, React} from 'react';
import { Box, CssBaseline,Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import Header from './components/Header/Header';
import "@fontsource/open-sans";
import theme from './theme';
import Sidebar from './components/Sidebar/Sidebar';

import Main from './components/Main'
import Footer from './components/Footer/Footer';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(()=> {
    // document.documentElement.style.setProperty('--base',this.state.color);
  },[])
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        <Stack sx={{ flexFlow: 'row nowrap', minWidth: '100vw', minHeight: '100vh'}}>
          <Sidebar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
          <Stack sx={{flexGrow: 1}}> 
            <Main/>
            <Footer/>
          </Stack>

        </Stack>

      </ThemeProvider>
    </>
  );
}

export default App;
