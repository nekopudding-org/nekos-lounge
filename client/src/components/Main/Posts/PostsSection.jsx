import { Pagination, Paper,Box, Stack, Divider, Typography } from '@mui/material'
import { bgcolor } from '@mui/system'
import React from 'react'
import theme from 'theme'

const postList = [
  {
    title: 'Example Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt finibus ex vitae mattis. Maecenas a ex purus. Praesent dolor dolor, hendrerit in enim sed, sodales placerat eros. Proin fermentum enim in mauris tincidunt, ac pharetra sem sodales. Curabitur volutpat sollicitudin nisl, non mollis augue fringilla et. Morbi arcu magna, congue eget suscipit sed, congue at orci. Sed pellentesque orci mauris, in pellentesque ligula pulvinar nec. Sed mattis nulla non magna maximus pharetra. Etiam ut ex non nisi imperdiet consequat et tempus quam. Mauris porta aliquam velit quis mollis. Aliquam posuere nec mauris et varius.'
  },
  {
    title: 'Example Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt finibus ex vitae mattis. Maecenas a ex purus. Praesent dolor dolor, hendrerit in enim sed, sodales placerat eros. Proin fermentum enim in mauris tincidunt, ac pharetra sem sodales. Curabitur volutpat sollicitudin nisl, non mollis augue fringilla et. Morbi arcu magna, congue eget suscipit sed, congue at orci. Sed pellentesque orci mauris, in pellentesque ligula pulvinar nec. Sed mattis nulla non magna maximus pharetra. Etiam ut ex non nisi imperdiet consequat et tempus quam. Mauris porta aliquam velit quis mollis. Aliquam posuere nec mauris et varius.'
  },
  {
    title: 'Example Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt finibus ex vitae mattis. Maecenas a ex purus. Praesent dolor dolor, hendrerit in enim sed, sodales placerat eros. Proin fermentum enim in mauris tincidunt, ac pharetra sem sodales. Curabitur volutpat sollicitudin nisl, non mollis augue fringilla et. Morbi arcu magna, congue eget suscipit sed, congue at orci. Sed pellentesque orci mauris, in pellentesque ligula pulvinar nec. Sed mattis nulla non magna maximus pharetra. Etiam ut ex non nisi imperdiet consequat et tempus quam. Mauris porta aliquam velit quis mollis. Aliquam posuere nec mauris et varius.'
  },
]
function PostsSection() {
  return (
    <>
    <Stack spacing={4} sx={{maxWidth: {xs:'70vw', md: '70vw'}}}>
      <Paper elevation={3} sx={{mx: 0,width: '100%'}}>
        <Stack sx={{width: '100%'}}>
          {postList.map((item, index) => {
          return (
            <React.Fragment key={index}>
            <Box sx={{ py:2, px:3, width: '80%'}}>
              <Typography variant="h6" noWrap>{item.title}</Typography>
              <Typography variant="body2" paragraph noWrap>{item.content}</Typography>
            </Box>
            <Divider sx={{borderBottomWidth: '2px'}}/>
            </React.Fragment>
          )})}
        </Stack>
      </Paper>
      <Box sx={{justifyContent:"center", display:'flex'}}>
        <Pagination 
          count={5} 
          color="secondary" 
          sx={{ 
            '& .MuiPaginationItem-root.Mui-selected:hover': {
              bgcolor: theme.palette.secondary.main //don't change color if selected
            },
            '& .MuiPaginationItem-root:not(.Mui-selected):hover': {
              bgcolor: theme.palette.background.light
            }
        }}/>
      </Box>
    </Stack>
      
    </>
  )
}

export default PostsSection