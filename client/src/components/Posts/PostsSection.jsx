import { Pagination, Paper,Box, Stack, Divider, Typography } from '@mui/material'
import React from 'react'
import theme from '../../theme'

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
    <Stack spacing={2} sx={{flexGrow:1}}>
      <Paper elevation={3} sx={{mx: 2}}>
        <Stack>
          {postList.map((item, index) => {
          return (
            <>
            <Box sx={{maxWidth:'60rem', py:2, px:3}}>
              <Typography variant="h6" noWrap>{item.title}</Typography>
              <Typography variant="body2" paragraph noWrap>{item.content}</Typography>
            </Box>
            <Divider sx={{borderBottomWidth: '2px'}}/>
            </>
          )})}
        </Stack>
      </Paper>
      <Box sx={{justifyContent:"center", display:'flex'}}>
        <Pagination count={5} color="secondary"/>
      </Box>
    </Stack>
      
    </>
  )
}

export default PostsSection