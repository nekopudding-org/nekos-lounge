import React, {useState, useRef, useEffect} from 'react';
import { CssBaseline,Stack,Box } from '@mui/material'
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
import MusicPlayer from 'components/MusicPlayer/MusicPlayer';
import Timer from 'components/Timer/Timer';
import ErrorPage from 'components/ErrorPage'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [timerOpen,setTimerOpen] = useState(true);
  const [playlistOpen, setPlaylistOpen] = useState(false); 
  const [resetTimerWindow, setResetTimerWindow] = useState(false);
  const contentContainer = useRef(null)
  const [windowD, setWindowD] = useState({width: window.innerWidth, height: window.innerHeight});
  const appBarHeight = '48';

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setWindowD({width: window.innerWidth, height: window.innerHeight});
    })
  },[])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} appBarHeight={appBarHeight}/>
        <Stack sx={{ flexFlow: 'row nowrap', minWidth: '100vw', minHeight: '100vh'}}>
          <Sidebar 
            setDrawerOpen={setDrawerOpen} 
            drawerOpen={drawerOpen} 
            setTimerOpen={setTimerOpen} 
            setResetTimerWindow={setResetTimerWindow}
            setPlaylistOpen={setPlaylistOpen}
          />
          <Box>
            <MusicPlayer drawerOpen={drawerOpen} playlistOpen={playlistOpen} setPlaylistOpen={setPlaylistOpen} appBarHeight={appBarHeight} windowD={windowD}/>
          </Box>
          
          <Stack sx={{flexGrow: 1, display: drawerOpen ? {xs: 'none', md:'block'} : 'block'}} ref={contentContainer}>
            <Timer 
              parent={contentContainer}
              open={timerOpen} 
              setOpen={setTimerOpen} 
              resetWindowPosition={resetTimerWindow} 
              setResetWindowPosition={setResetTimerWindow}
              windowD={windowD}
            />
            <Routes>
              <Route exact path="/featured" element={<Featured />} />
              <Route exact path="/campfire" element={<Campfire />} />
              <Route exact path="/" element={<Main />}/>
              <Route path="*" element={<ErrorPage/>}/>
            </Routes>
            {/* <Routes>
              <Route path="/music" element={<Music />} />
              <Route path="/timer" element={<Timer />} />
            </Routes> */}
            <Footer/>
          </Stack>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
