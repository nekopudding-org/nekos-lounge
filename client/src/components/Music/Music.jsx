import React, {useEffect, useRef, useState} from 'react'
import {List, ListItemText,ListItemButton,ListItemIcon,Divider, Box, Input,Paper, IconButton,Typography, Stack, Slider} from '@mui/material'
import ReactPlayer from 'react-player/youtube';
import theme from 'theme';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


///////////////////////////////////////////////           MAIN CONTENT            /////////////
function Music(props) {
  const {playlistOpen, setPlaylistOpen} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
  const handleListItemClick = (index) => { setSelectedIndex(index); };
  const [player, setPlayer] = useState({
    url: 'https://www.youtube.com/playlist?list=PLmD_XJcT9TYFW9jZ8gcGYX05DzYRGr6xh',
    controls: false,
    fallback: null,
    height: 0,
    width: 0,
    light: false,
    loop: false,
    muted: false,
    playing: false,
    volume: 0.5,
    stopOnUnmount: true,
		seek: 0, //fractional value from 0 to 1
  })
  const {url,controls,fallback,height,width,light,loop,muted,playing,volume, stopOnUnmount,seek} = player;

	const playerRef = useRef(null);

  const [playlist, setPlaylist] = useState([
    {title: 'Example song'}
  ]);
  const addToPlaylist = () => {
		if (inputURL && inputURL !== '') setPlayer( prev => {return ({...prev,url: inputURL})})
		setInputURL('');
    setPlaylist(prev => [
      ...prev,
      {title: 'Example song'}
    ])
  }

  const removeFromPlaylist = (i) => {
    setPlaylist(prev => prev.filter((item,index) => (index === i)  ? false : true));
  }

	const handlePlay= () => {
		setPlayer(prev => {return ({ ...prev, playing: !prev.playing })})
	}
	const setVolume = (event) => {
		setPlayer( prev => {return ({ ...prev,volume: event.target.value })})
	}
	const toggleMute = () => {
		setPlayer( prev => {return ({...prev,muted: !prev.muted})})
	}

	const setSeekSlider = (event) => { //call onChange
		setPlayer( prev => {return ({ ...prev,seek: event.target.value })})
	}
	const setSeek = (event) => { //only call on release of dragging slider onChangeCommitted
		playerRef.current && playerRef.current.seekTo(seek);
	}
	const skipSong = () => { playerRef.current && playerRef.current.seekTo(0.99999); }
	const [inputURL, setInputURL] = useState('')
	const handleInputChange = (e) => {
		setInputURL(e.target.value)
	};

	useEffect(() => { //fetches current playtime every 3 seconds, 
		if (!playing) return; 
		const interval = setInterval(()=>{
			const currSeek = playerRef.current ? playerRef.current.getCurrentTime()/playerRef.current.getDuration() : 0;
			if (!isDragging) setPlayer( prev => {return ({ ...prev,seek: currSeek })})
		},3000)
		return () => {clearInterval(interval)};
	},[playing,isDragging]) //remember useEffect uses initial value of isDragging, need isDragging as dependency

  return (
    <>
      <Paper
        sx={{
          pt: '45px',
          width: playlistOpen ? 260 : 0,
          height: '100vh',
          bgcolor: theme.palette.background.paper,
          overflowX: 'hidden',
          borderRadius: 0,
          position: 'fixed',
          zIndex: 2,
          boxShadow:2,
          overflowX: 'hidden',
          // display: playlistOpen ? 'block' : 'none',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Stack sx={{height: '100%',}}>
          <Box sx={{bgcolor: theme.palette.background.default, p:1, height: 48}}>
            <Input value={inputURL} onChange={handleInputChange} placeholder='Enter playlist link:' sx={{display: playlistOpen ? 'inline-block' : 'none'}}/>
            <IconButton sx={{display: playlistOpen ? 'inline-block' : 'none', position: 'absolute', height: 40}} onClick={addToPlaylist}>
              <MusicNoteIcon/>
            </IconButton>
            <IconButton sx={{position: 'absolute', right: 0, borderRadius: 0}} onClick={()=> setPlaylistOpen(false)}>
              <ChevronLeftIcon/>
            </IconButton>
          </Box><Divider/>
          <List sx={{pt:0, flexGrow: 1}}>
            {playlist.map((item,index) => (
              <React.Fragment key={index}>
              <ListItemButton
                sx={{
                  display: 'flex',
                  p: 0,
                  '&.Mui-selected:hover, &.Mui-selected': {
                    bgcolor: theme.palette.background.light,
                  },
                }}
                disableRipple
                selected={selectedIndex === index}
              >
                <IconButton size='small' sx={{borderRadius: 0, height: 48}}>
                  <Typography variant='bgText'><DragHandleIcon fontSize='small'/></Typography>
                </IconButton>
                <Box sx={{height: 48,flexGrow: 1, p:1}} onClick={() => (handleListItemClick != null) && handleListItemClick(index)}>
                  <Typography variant='bgText' noWrap>{item.title}</Typography>
                </Box>
                <IconButton size='small' onClick={() => removeFromPlaylist(index)} sx={{mx:1}}>
                  <Typography variant='bgText'><CloseIcon fontSize='small'/></Typography>
                </IconButton>
              </ListItemButton>
              <Divider />
              </React.Fragment>
            ))}
          </List>
          <ReactPlayer 
            style={{display: 'none'}}
            url={url}
            controls={controls}
            fallback={fallback}
            height={height}
            width={width}
            light={light}
            loop={loop}
            muted={muted}
            playing={playing}
            volume={volume}
            stopOnUnmount={stopOnUnmount}
						ref={playerRef}
          />
          <Box sx={{bgcolor: theme.palette.background.default, p:1, pb:3, height: 64, flexGrow: 0,display: 'flex'}}>
						<IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={handlePlay}>{!playing? <PlayArrowIcon fontSize='small'/> : <PauseIcon fontSize='small'/>}</IconButton>
            <Box sx={{width: '120px', height: 32, display: playlistOpen ? 'inline-block' : 'none', mx: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><Slider size='small' value={seek} onChange={setSeekSlider} step={0.01} onChangeCommitted={setSeek} max={1} onMouseDown={()=>setIsDragging(true)} onMouseUp={()=>setIsDragging(false)}/></Box>
            <IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={toggleMute}>{muted ? <VolumeOffIcon fontSize='small'/> : <VolumeUpIcon fontSize='small'/>}</IconButton>
            <IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={skipSong}><SkipNextIcon fontSize='small'/></IconButton>
          </Box>
        </Stack>  
      </Paper>
    </>
  )
}

export default Music