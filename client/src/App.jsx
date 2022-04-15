import {useState, useEffect, React} from 'react';
import { CssBaseline,Stack} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import "@fontsource/open-sans";
import theme from 'theme';

import {Routes, Route} from 'react-router-dom'

import Header from 'components/Globals/Header/Header';
import Sidebar from 'components/Globals/Sidebar/Sidebar';
import Main from 'components/Main/Main'
import Footer from 'components/Globals/Footer/Footer';
import Featured from 'components/Featured/Featured';
import Campfire from 'components/Campfire/Campfire';
import Music from 'components/Music/Music';
import Timer from 'components/Timer/Timer';
import ErrorPage from 'components/ErrorPage'
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
            <Routes>
              <Route path="/featured" element={<Featured />} />
              <Route path="/campfire" element={<Campfire />} />
              <Route path="/music" element={<Music />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/" element={<Main />}/>
              <Route path="*" element={<ErrorPage/>}/>

            </Routes>
            <Footer/>
          </Stack>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
