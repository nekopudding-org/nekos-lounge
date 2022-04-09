import {useState} from 'react';
import logo from './logo.svg';
import { Box, CssBaseline, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

import TrendingCarousel from './components/Trending/TrendingCarousel';
import Header from './components/Header/Header';
import "@fontsource/open-sans";
import theme from './theme';
import Sidebar from './components/Sidebar/Sidebar';
import DrawerHeader from './components/Sidebar/DrawerHeader';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex'}}>
                <Header drawerOpen={drawerOpen} />

          <Sidebar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <TrendingCarousel width={600} height={800}/>
          </Box>
        </Box>

      </ThemeProvider>
    </>
  );
}

export default App;
