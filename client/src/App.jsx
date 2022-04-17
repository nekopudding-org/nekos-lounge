import React, {useState, useRef} from 'react';
import { CssBaseline,Stack } from '@mui/material'
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
  const [timerOpen,setTimerOpen] = useState(true);
  const [resetTimerWindow, setResetTimerWindow] = useState(false);
  const contentContainer = useRef(null)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        <Stack sx={{ flexFlow: 'row nowrap', minWidth: '100vw', minHeight: '100vh'}}>
          <Sidebar 
            setDrawerOpen={setDrawerOpen} 
            drawerOpen={drawerOpen} 
            setTimerOpen={setTimerOpen} 
            setResetTimerWindow={setResetTimerWindow}
          />
          <Stack sx={{flexGrow: 1, display: drawerOpen ? {xs: 'none', md:'block'} : 'block'}} ref={contentContainer}>
            <Timer 
              parent={contentContainer}
              open={timerOpen} 
              setOpen={setTimerOpen} 
              resetWindowPosition={resetTimerWindow} 
              setResetWindowPosition={setResetTimerWindow}
            />
            <Music/>
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
