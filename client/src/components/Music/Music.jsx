import React, {useState} from 'react'
import {List, ListItemText,ListItemButton,ListItemIcon,Divider, Box, Input,Paper, IconButton,Typography} from '@mui/material'
import theme from 'theme';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';


///////////////////////////////////////////////           MAIN CONTENT            /////////////
function Music(props) {
  const {playlistOpen, setPlaylistOpen} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (index) => { setSelectedIndex(index); };

  const [playlist, setPlaylist] = useState([
    {title: 'Example song'}
  ]);
  const addToPlaylist = () => {
    setPlaylist(prev => [
      ...prev,
      {title: 'Example song'}
    ])
  }

  const removeFromPlaylist = (i) => {
    setPlaylist(prev => prev.filter((item,index) => (index === i)  ? false : true));
  }

  return (
    <>
    <Paper
        sx={{
          mt: '45px',
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
          <List sx={{pt:0}}>
          <Box sx={{bgcolor: theme.palette.background.default, p:1, pb:0, height: 48}}>
            <Input placeholder='Enter playlist link:' sx={{display: playlistOpen ? 'inline-block' : 'none'}}/>
            <IconButton sx={{display: playlistOpen ? 'inline' : 'none', position: 'absolute'}} onClick={addToPlaylist}>
              <MusicNoteIcon/>
            </IconButton>
            <IconButton sx={{position: 'absolute', right: 0, borderRadius: 0}} onClick={()=> setPlaylistOpen(false)}>
              <ChevronLeftIcon/>
            </IconButton>
          </Box>
          <Divider/>
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
      </Paper>
    
      
    </>
  )
}

export default Music