import { Pagination, Paper,Box } from '@mui/material'
import React from 'react'

function PostsSection() {
  return (
    <>
      <Paper sx={{mx: 2, minHeight: '700px'}}>
        
      </Paper>
      <Box sx={{margin: '20px auto', justifyContent:"center", display:'flex'}}>
        <Pagination count={10} color="secondary"/>
      </Box>
    </>
  )
}

export default PostsSection