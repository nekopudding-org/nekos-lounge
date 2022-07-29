import React from 'react'
import {Box, Typography} from '@mui/material'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function ErrorPage() {
  return (
    <Box 
      sx={{
        width: '100vw', 
        height:'81vh', 
        display: 'flex', 
        flexDirection: 'column',
      }}>
      <SentimentVeryDissatisfiedIcon sx={{width: '250px', height: 'auto', m: 'auto', mb:0, opacity: 0.8}}/>
      <Typography variant='h1' sx={{mx: 'auto', mb: 0, opacity: 0.8}}>404</Typography>
      <Typography variant='h5' sx={{m: 'auto', mt: 0, opacity: 0.6}}>Page Not Found</Typography>
    </Box>
  )
}

export default ErrorPage