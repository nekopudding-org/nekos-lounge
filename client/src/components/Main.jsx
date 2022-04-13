import {Box, Stack} from '@mui/material';
import HeaderOffset from './Header/HeaderOffset';
import PostsSection from './Posts/PostsSection';
import TrendingCarousel from './Trending/TrendingCarousel';

const Main = () => {
  return (
  <Stack
    sx={{ 
      flexFlow: 'row nowrap',
      flex: '1 1 auto',
      py: 3, 
      mt: '45px',
  }}>
      <PostsSection/>
    <TrendingCarousel fontSize={30}/>
  </Stack>
)
}

export default Main;

