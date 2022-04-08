import logo from './logo.svg';
import { CssBaseline, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

import TrendingCarousel from './components/Trending/TrendingCarousel';
import Header from './components/Header/Header';
import "@fontsource/open-sans";
import theme from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <TrendingCarousel width={600} height={800}/>
        <Typography variant="h2" gutterBottom>
          Welcome to React
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default App;
