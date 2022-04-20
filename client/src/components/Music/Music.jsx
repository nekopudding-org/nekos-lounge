import React, {useEffect, useRef, useState} from 'react'
import {List, Divider, Box, Input,Paper, IconButton,Stack, Slider, Chip} from '@mui/material'
import ReactPlayer from 'react-player/youtube';
import theme from 'theme';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import PlaylistItem from './PlaylistItem';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import axios from 'axios';

//react-player can't handle playlists inputted in this format, need to pass as array of urls
const defaultPlaylists = [
	'https://www.youtube.com/watch?v=KkVwuWH-woA&list=PLmD_XJcT9TYFW9jZ8gcGYX05DzYRGr6xh',
	'https://www.youtube.com/watch?v=5RfqB76eHTQ&list=PLmD_XJcT9TYEc33QeCx0ii01kVBDkGS9D',
	'https://www.youtube.com/watch?v=FQSHcl6TJb4&list=PLKDOdCjxOjzIFucHobwJpSK4-vAVXST90',
]
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

  const [playlist, setPlaylist] = useState([]);
  const addToPlaylist = () => { //call on input enter
		if (inputURL && inputURL !== '') {
      axios.get('http://localhost:3002/playlist', {params: {url: inputURL}})
      .then((res) => {
        setPlaylist(prev => [
          ...prev,
          ...res.data
        ])
      }).catch((error) => { console.log(error); })
      .then(() => {
        //input error
      })
    }
		setInputURL('');
    if (playlist.length === 0) handlePlay(true);
  }
  function changeSong(url) {
    setPlayer( prev => {return ({...prev,url: url})})
  }

  const removeFromPlaylist = (i) => {
    setPlaylist(prev => prev.filter((item,index) => (index === i)  ? false : true));
  }

	const handlePlay= (state) => { //call on play/pause button press
		setPlayer(prev => {return ({ ...prev, playing: state })})
	}
  const handleEnd = () => { //called onEnd of currently playing url
    if (selectedIndex >= playlist.length - 1) {
      handlePlay(false);
    }
    handleSelectSong(selectedIndex + 1);
  }
	const setVolume = (event) => { //called on volume slider
		setPlayer( prev => {return ({ ...prev,volume: event.target.value })})
	}
	const toggleMute = () => { //call on mute button press
		setPlayer( prev => {return ({...prev,muted: !prev.muted})})
	}

	const setSeekSlider = (event) => { //call onChange
		setPlayer( prev => {return ({ ...prev,seek: event.target.value })})
	}
	const setSeek = (event) => { //only call on release of dragging slider onChangeCommitted
    setIsDragging(false);
    if (seek === 1) { skipSong(); return; }
    playerRef.current && playerRef.current.seekTo(seek);
	}
	const skipSong = () => { playerRef.current && playerRef.current.seekTo(playerRef.current.getDuration()); }
	const [inputURL, setInputURL] = useState('')
	const handleInputChange = (e) => {
		setInputURL(e.target.value)
	};

  function handleSelectSong(index) {
    changeSong(playlist[index].url);
    (handleListItemClick != null) && handleListItemClick(index)
  }

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
          <Box sx={{bgcolor: theme.palette.background.default, p:1, height: 80}}>
            <Input value={inputURL} onChange={handleInputChange} placeholder='Enter playlist link:' sx={{display: playlistOpen ? 'inline-block' : 'none', fontSize: 14, mt: 0.5, width: 180}}/>
            <IconButton sx={{display: playlistOpen ? 'inline-block' : 'none', position: 'absolute', height: 40}} onClick={addToPlaylist}>
              <MusicNoteIcon/>
            </IconButton>
            <IconButton sx={{position: 'absolute', right: 0, borderRadius: 0}} onClick={()=> setPlaylistOpen(false)}>
              <ChevronLeftIcon/>
            </IconButton>

						<Stack direction='row' spacing={1} sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'left', pt:1}}>
							<Chip color='info' size='small' label="Misc." variant='outlined' onClick={()=> setInputURL(defaultPlaylists[0])} />
							<Chip color='info' size='small' label="Study" variant="outlined" onClick={()=> setInputURL(defaultPlaylists[1])} />
							<Chip color='info' size='small' label="Stardew" variant="outlined" onClick={()=> setInputURL(defaultPlaylists[2])} />
						</Stack>

          </Box><Divider/>
          <List sx={{pt:0, flexGrow: 1, overflow: 'auto'}}>
            {playlist.map((item,index) => (
              <PlaylistItem item={item} index={index} selectedIndex={selectedIndex} handleSelectSong={handleSelectSong} removeFromPlaylist={removeFromPlaylist}/>
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
            onEnded={handleEnd}
          />
          <Box sx={{bgcolor: theme.palette.background.default, p:1, pb:3, height: 64, flexGrow: 0,display: 'flex'}}>
						<IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={()=>handlePlay(!playing)}>{!playing? <PlayArrowIcon fontSize='small'/> : <PauseIcon fontSize='small'/>}</IconButton>
            <Box sx={{width: '120px', height: 32, display: playlistOpen ? 'inline-block' : 'none', mx: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><Slider size='small' value={seek} onChange={setSeekSlider} step={0.01} onChangeCommitted={setSeek} max={1} onMouseDown={()=>setIsDragging(true)}/></Box>
            <IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={toggleMute}>{muted ? <VolumeOffIcon fontSize='small'/> : <VolumeUpIcon fontSize='small'/>}</IconButton>
            <IconButton size='small' sx={{display: playlistOpen ? 'inline' : 'none'}} onClick={skipSong}><SkipNextIcon fontSize='small'/></IconButton>
          </Box>
        </Stack>  
      </Paper>
    </>
  )
}

export default Music