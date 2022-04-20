import React, {useEffect, useRef, useState} from 'react'
import {List, Paper, Stack} from '@mui/material'
import ReactPlayer from 'react-player/youtube';
import theme from 'theme';

import PlaylistItem from './PlaylistItem';
import axios from 'axios';
import PlayerFooter from './PlayerFooter';
import PlayerHeader from './PlayerHeader';

//react-player can't handle playlists inputted in this format, need to pass as array of urls
const defaultPlaylists = [
	'https://www.youtube.com/watch?v=KkVwuWH-woA&list=PLmD_XJcT9TYFW9jZ8gcGYX05DzYRGr6xh',
	'https://www.youtube.com/watch?v=5RfqB76eHTQ&list=PLmD_XJcT9TYEc33QeCx0ii01kVBDkGS9D',
	'https://www.youtube.com/watch?v=FQSHcl6TJb4&list=PLKDOdCjxOjzIFucHobwJpSK4-vAVXST90',
]
///////////////////////////////////////////////           MAIN CONTENT            /////////////
function MusicPlayer(props) {
  const {playlistOpen, setPlaylistOpen} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputQuery, setInputQuery] = useState('')
	const [isDragging, setIsDragging] = useState(false);
  const handleListItemClick = (index) => { setSelectedIndex(index); };
  const [player, setPlayer] = useState({
    url: '',
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
    if (playlist.length === 0) handlePlay(true);
    setInputQuery('');
		if (inputQuery && inputQuery !== '') {
      axios.get('http://localhost:3002/ytsearch', {params: {url: inputQuery}})
      .then((res) => {
        setPlaylist(prev => [
          ...prev,
          ...res.data
        ])
      })
      .catch((error) => { console.log(error); })
      .then(() => {
        //input error
      })
    }
  }
  function changeSong(url) {
    setPlayer( prev => {return ({...prev,url: url})})
  }

  const clearPlaylist = () => { setPlaylist([]);}
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
	const handleInputChange = (e) => {
    if(e.target.value && e.target.value !== '') setInputQuery(e.target.value)
	};

  function handleSelectSong(index) {
    playlist[index] && changeSong(playlist[index].url);
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

  useEffect(() => {
    //limit playlist length to 200 for performance reasons
    if (playlist.length > 200) {
      setPlaylist(playlist.slice(0,200));
    }
    if (!playlist || selectedIndex > playlist.length - 1) {
      changeSong('')
      handlePlay(false);
      setSelectedIndex(0);
    } else {
      changeSong(playlist[selectedIndex].url)
    }
  },[playlist,selectedIndex])

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
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Stack sx={{height: '100%',}}>
          <PlayerHeader 
            inputQuery={inputQuery} 
            playlistOpen={playlistOpen}
            handleInputChange={handleInputChange}
            addToPlaylist={addToPlaylist}
            setPlaylistOpen={setPlaylistOpen}
            setInputQuery={setInputQuery}
            defaultPlaylists={defaultPlaylists}
            clearPlaylist={clearPlaylist}
          />
          <List sx={{pt:0, flexGrow: 1, overflow: 'auto'}}>
            {playlist.map((item,index) => (
              <PlaylistItem key={index} item={item} index={index} selectedIndex={selectedIndex} handleSelectSong={handleSelectSong} removeFromPlaylist={removeFromPlaylist}/>
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
          <PlayerFooter
            handlePlay={handlePlay}
            setSeek={setSeek}
            setSeekSlider={setSeekSlider}
            setIsDragging={setIsDragging}
            toggleMute={toggleMute}
            skipSong={skipSong}
            playlistOpen={playlistOpen}
            seek={seek}
            muted={muted}
            playing={playing}
          />
        </Stack>  
      </Paper>
    </>
  )
}

export default MusicPlayer