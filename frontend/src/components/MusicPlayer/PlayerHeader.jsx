import React from 'react'
import {Divider, Box, Input,IconButton,Stack, Chip} from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from 'theme';

function PlayerHeader(props) {
  const {inputQuery, playlistOpen,handleInputChange,addToPlaylist,setPlaylistOpen,setInputQuery,defaultPlaylists, clearPlaylist} = props;
  return (
    <>
      <Box sx={{bgcolor: theme.palette.background.default, p:1, height: 80}}>
        <Input value={inputQuery} onChange={handleInputChange} placeholder='Enter yt query or link:' sx={{display: playlistOpen ? 'inline-block' : 'none', fontSize: 14, mt: 0.5, width: 180}}/>
        <IconButton sx={{display: playlistOpen ? 'inline-block' : 'none', position: 'absolute', height: 40}} onClick={addToPlaylist}>
          <MusicNoteIcon/>
        </IconButton>
        <IconButton sx={{position: 'absolute', right: 0, borderRadius: 0}} onClick={()=> setPlaylistOpen(false)}>
          <ChevronLeftIcon/>
        </IconButton>

        <Stack direction='row' spacing={1} sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'left', pt:1}}>
          <Chip color='info' size='small' label="Misc." variant='outlined' onClick={()=> setInputQuery(defaultPlaylists[0])} />
          <Chip color='info' size='small' label="Study" variant="outlined" onClick={()=> setInputQuery(defaultPlaylists[1])} />
          <Chip color='info' size='small' label="Stardew" variant="outlined" onClick={()=> setInputQuery(defaultPlaylists[2])} 
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