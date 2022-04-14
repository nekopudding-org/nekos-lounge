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
      mx: 4,
      mt: 13,
      mb: 5
  }}>
      <PostsSection/>
    <TrendingCarousel fontSize={30}/>
  </Stack>
)
}

export default Main;

