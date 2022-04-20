import React from 'react'
import {ListItemButton,Divider, Box, IconButton,Typography} from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import theme from 'theme';

function PlaylistItem(props) {
  const {index,item, selectedIndex, handleSelectSong, removeFromPlaylist} = props;
  return (
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
                <Box sx={{height: 48,flexGrow: 1, p:1}} onClick={()=>handleSelectSong(index)}>
                  <Typography variant='bgText' noWrap fontSize={14} sx={{display: 'inline-block', width: 160}}>{item.title}</Typography>
                </Box>
                <IconButton size='small' onClick={() => removeFromPlaylist(index)} sx={{mx:1}}>
                  <Typography variant='bgText'><CloseIcon fontSize='small'/></Typography>
                </IconButton>
              </ListItemButton>
              <Divider />
              </React.Fragment>
  )
}

export default PlaylistItem