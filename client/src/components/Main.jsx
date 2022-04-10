import {Box} from '@mui/material';
import HeaderOffset from './Header/HeaderOffset';
import PostsSection from './Posts/PostsSection';
import TrendingCarousel from './Trending/TrendingCarousel';

const Main = () => {
  return (
  <Box component="main" 
    sx={{ 
      display: 'flex',  
      flexGrow: 1, 
      py: 3, 
      mt: '45px',
      mr: 3
  }}>
    <Box sx={{height: '800px', flexGrow: 1}}>
      <PostsSection></PostsSection>
    </Box>
    <TrendingCarousel width={200} height={400} />


    

  </Box>
)
}

export default Main;

