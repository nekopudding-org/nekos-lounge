import { Card, CardActions, CardContent, CardHeader, IconButton, Typography, Chip, Stack, Input } from '@mui/material'
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import React, {useEffect, useState} from 'react'
import Draggable from 'react-draggable';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import duration from 'dayjs/plugin/duration'

function Timer(props) {
  const {open,setOpen,resetWindowPosition,setResetWindowPosition} = props;
  const [startTime, setStartTime] = useState(0)
  const [playing, setPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [wasPaused, setWasPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0)

  useEffect(() => {
    dayjs.extend(duration);
    dayjs.extend(objectSupport);
  },[]);

  useEffect(()=> {
    if (!playing) return;
    let start = Date.now();
    let interval;
    if (wasPaused && remainingTime > 0) {
      interval = setInterval(() => {
        let deltaSeconds = Math.floor((Date.now() - start) / 1000);
        setRemainingTime(pausedTime - deltaSeconds);
      }, 500);
    }

    else if (!wasPaused){
      interval = setInterval(() => {
        let deltaSeconds = Math.floor((Date.now() - start) / 1000);
        setRemainingTime(startTime - deltaSeconds);
      }, 500);
    }
    setWasPaused(false);
    return () => {clearInterval(interval)};
  },[playing])

  useEffect(()=>{
    if (remainingTime > 0) return;
    handleTimerEnd();
  }, [remainingTime])

  const handleStart = () => {
    if (!wasPaused) {
      setRemainingTime(startTime);
    }
    setPlaying(true);
  }
  const handlePause = () => {
    setWasPaused(true);
    setPausedTime(remainingTime)
    setPlaying(false);
  }
  const handleReset = () => {
    setPlaying(false);
    setWasPaused(false);
  }

  const setTimer = (time) => {
    setStartTime(time);
    handleReset();
  }

  const handleTimerEnd = () => {
    if (playing) new Audio(process.env.PUBLIC_URL + 'hillside.mp3').play();
    handlePause();
  }

  const parseTime = () => {
    let time = (playing || wasPaused) ? remainingTime : startTime;
    const hours = Math.floor(time/3600); time %= 3600;
    const minutes = Math.floor(time/60); time %= 60;
    const seconds = Math.floor(time);
    return dayjs({hour: hours, minute: minutes, second: seconds }).format('HH:mm:ss')
  }

  return (
    <>
    <Draggable
      bounds={{left: 0, top: 0, right: window.innerWidth-400, bottom: window.innerHeight-150}}
      position={resetWindowPosition ? {x: 0, y: 0} : null}
      onDrag={()=> setResetWindowPosition(false)}
    >

      <Card 
        variant='outlined' 
        sx={{ 
          position: 'fixed', 
          mt: '50px', 
          ml: '5px', 
          py: '5px',
          width: '300px', 
          boxShadow: 6, 
          display: open ? 'flex' : 'none', 
          flexDirection: 'column',
          zIndex: 10,
          justifyContent: 'space-between'
        }}
      >
        <CardHeader 
          title={<Typography variant='h6'>{parseTime()}</Typography>}
          action={
            <>
              <IconButton aria-label='minimize' size="small" onClick={handleStart}><PlayArrowIcon/></IconButton>
              <IconButton aria-label='minimize' size="small" onClick={handlePause}><PauseIcon/></IconButton>
              <IconButton aria-label='minimize' size="small" onClick={handleReset}><RestartAltIcon/></IconButton>

              <IconButton aria-label='minimize' size="small"><MinimizeIcon fontSize='inherit'/></IconButton>
              <IconButton aria-label="close" size="small" onClick={() => setOpen(false)}><CloseIcon fontSize='inherit'/></IconButton>
            </>
          } 
          sx={{ p: 1, pl: 2}}
        />
        <CardActions sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'right', pr: 2}}>
          <Chip size='small' label="50m" variant="outlined" onClick={()=> setTimer(50*60)} />
          <Chip size='small' label="25m" variant="outlined" onClick={()=> setTimer(25*60)} />
          <Chip size='small' label="10m" variant="outlined" onClick={()=> setTimer(10*60)} />
          <Chip size='small' label="5m" variant="outlined" onClick={()=> setTimer(5*60)} />
          <Chip size='small' label="5s" variant="outlined" onClick={()=> setTimer(5)} />
        </CardActions>
      </Card>
      </Draggable>

    </>
  )
}

export default Timer