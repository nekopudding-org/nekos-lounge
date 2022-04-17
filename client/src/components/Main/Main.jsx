import {Box, Stack} from '@mui/material';
import PostsSection from 'components/Main/Posts/PostsSection';
import TrendingCarousel from './Trending/TrendingCarousel';

const Main = () => {
  return (
  <Stack
    direction='row'
    spacing={4}
    sx={{ 
      flexWrap: 'nowrap',
      flex: '1 1 auto',
      justifyContent: 'space-between',
      mx: 4,
      mt: 13,
      mb: 5
  }}>
  <Box sx={{flex: '0 1 auto'}}>
    <PostsSection/>
  </Box>
      
    <Box sx={{display: 'flex', justifyContent:'center', flexGrow: 1}}>
      <TrendingCarousel fontSize={30}/>
    </Box>
  </Stack>
)
}

export default Main;

