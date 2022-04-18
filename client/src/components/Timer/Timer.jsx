import { Card, CardActions, CardHeader, IconButton, Typography, Chip, Collapse } from '@mui/material'
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import React, {useEffect, useState, useRef} from 'react'
import Draggable from 'react-draggable';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import duration from 'dayjs/plugin/duration'
import theme from 'theme';

function Timer(props) {
  const {open,setOpen,resetWindowPosition,setResetWindowPosition, parent} = props;
  const [expanded, setExpanded] = useState(true);
  const cardContainer = useRef(null);
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
      bounds={{
        left: 0, 
        top: 0, 
        right: (window.innerWidth - (parent.current && parent.current.offsetWidth < 850 ? 0 : 56)) - (cardContainer.current ? cardContainer.current.offsetWidth : 0), 
        bottom: (window.innerHeight-45)-(cardContainer.current ? cardContainer.current.offsetHeight : 0)
      }}
      position={resetWindowPosition ? {x: 0, y: 0} : null}
      onDrag={()=> setResetWindowPosition(false)}
      handle='.MuiCardHeader-root'
    >
      <Card 
        variant='outlined' 
        sx={{ 
          position: 'fixed', 
          mt: '50px', 
          ml: '2px', 
          width: '300px', 
          boxShadow: 6, 
          display: open ? 'flex' : 'none', 
          flexDirection: 'column',
          zIndex: 1,
          justifyContent: 'space-between',
        }}
        ref={cardContainer}
      >
        <CardHeader 
          title={<Typography variant='h6' sx={{lineHeight: 1.4, userSelect: 'none'}}>{parseTime()}</Typography>}
          sx={{ 
            p: 1, 
            pl: 2, 
            display: 'flex',
            my: 'auto',
            bgcolor: theme.palette.background.default,
          }}
        />
        <CardActions sx={{mt: 0, right: 0, m: 'auto', position: 'absolute', display: 'flex', justifyContent:'right'}} disableSpacing>
          <IconButton aria-label='minimize' size="small" onClick={handleStart}><PlayArrowIcon fontSize='inherit'/></IconButton>
          <IconButton aria-label='minimize' size="small" onClick={handlePause}><PauseIcon fontSize='inherit'/></IconButton>
          <IconButton aria-label='minimize' size="small" onClick={handleReset}><RestartAltIcon fontSize='inherit'/></IconButton>

          <IconButton aria-label='minimize' size="small" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}><MinimizeIcon fontSize='inherit'/></IconButton>
          <IconButton aria-label="close" size="small" onClick={() => setOpen(false)}><CloseIcon fontSize='inherit'/></IconButton>
        </CardActions>
         <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardActions sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'right', pr: 2, pt: 2}}>
            <Chip size='small' label="50m" variant="outlined" onClick={()=> setTimer(50*60)} />
            <Chip size='small' label="25m" variant="outlined" onClick={()=> setTimer(25*60)} />
            <Chip size='small' label="10m" variant="outlined" onClick={()=> setTimer(10*60)} />
            <Chip size='small' label="5m" variant="outlined" onClick={()=> setTimer(5*60)} />
            <Chip size='small' label="5s" variant="outlined" onClick={()=> setTimer(5)} />
          </CardActions>
         </Collapse>
        
      </Card>
      </Draggable>

    </>
  )
}

export default Timer