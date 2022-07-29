import React, { useState } from 'react'
import {Box,IconButton,Slider} from '@mui/material';
import theme from 'theme';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function PlayerFooter(props) {
  const [volumeSliderOpen, setVolumeSliderOpen] = useState(false);
  const {handlePlay,setSeek,setSeekSlider,setIsDragging,setVolumeSlider,playlistOpen,toggleMute,skipSong,seek,muted,playing,volume} = props;

  return (
    <>
    <Box sx={{bgcolor: theme.palette.background.default, p:1, pb: 3, flexGrow: 0,display: 'flex'}}>
      <IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={()=>handlePlay(!playing)}>{!playing? <PlayArrowIcon fontSize='small'/> : <PauseIcon fontSize='small'/>}</IconButton>
      <Box sx={{width: '120px', height: 32, display: playlistOpen ? 'inline-block' : 'none', mx: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Slider size='small' value={seek} onChange={setSeekSlider} step={0.01} onChangeCommitted={setSeek} max={1} onMouseDown={()=>setIsDragging(true)}/>
      </Box>
      <IconButton size='small' sx={{position: 'relative', display: playlistOpen ? 'inline' : 'none'}} onClick={()=>setVolumeSliderOpen(!volumeSliderOpen)}>
        {volume === 0 ? <VolumeOffIcon fontSize='small'/> : <VolumeUpIcon fontSize='small'/>}
        <Box sx={{
          height: 90,
          py: 2,
          bgcolor: theme.palette.background.default,
          display: volumeSliderOpen ? 'inline-block' : 'none',
          position: 'absolute',
          top: -100,
          left: 0,
          borderRadius: '4px'
        }}>
          <Slider 
            orientation='vertical' 
            size='small' 
            min={0} max={1} 
            value={volume}
            onChange={setVolumeSlider} step={0.05} 
          />
        </Box>
        
      </IconButton>
      <IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={skipSong}><SkipNextIcon fontSize='small'/></IconButton>
    </Box>
  </>
  )
}

export default PlayerFooter