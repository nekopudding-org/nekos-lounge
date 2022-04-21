import { Box } from '@mui/system'
import React from 'react'

function Campfire() {
  return (
    <>
    <Box sx={{flexGrow: 1, height: 'auto', width: '100%', display: 'flex', justifyContent: 'center', mt: 30, mb: 8.5}}>
      <Box component='img' src='images/campfire.gif' sx={{height: 500, width: 500}} />
    </Box>
    </>
  )
}

export default Campfire