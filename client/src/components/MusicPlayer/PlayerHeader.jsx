import React from 'react'
import {Divider, Box, Input,IconButton,Stack, Chip} from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from 'theme';

function PlayerHeader(props) {
  const {inputURL, playlistOpen,handleInputChange,addToPlaylist,setPlaylistOpen,setInputURL,defaultPlaylists, clearPlaylist} = props;
  return (
    <>
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
          <Chip color='info' size='small' label="Stardew" variant="outlined" onClick={()=> setInputURL(defaultPlaylists[2])} 
            sx={{flexGrow: 1}}
          />
          <IconButton sx={{mt: -3}} size='small' onClick={clearPlaylist}>
            <DeleteIcon fontSize='small'/>
          </IconButton>
        </Stack>

      </Box>
      <Divider/>
    </>
  )
}

export default PlayerHeader