import logo from './logo.svg';
import { CssBaseline, Checkbox, Paper, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

import TrendingCarousel from './components/TrendingCarousel';
import "@fontsource/open-sans";

const theme = createTheme({
  palette: {
    text: {
      primary: '#e2e2e2'
    },
    background: {
      default: '#242c49',
      paper: '#324470'
    },
    primary: {
      main: '#35418c',
      light: '#5e6cae',
      dark: '#212769'
    },
    secondary: {
      main: '#bcbc47',
      light: '#dce555',
      dark: '#8c7f35'
    },
    error: {
      main: '#a13a45',
      light: '#ce5461',
      dark: '#672c3a'
    },
    info: {
      main: '#427c9e',
      light: '#77a4c2',
      dark: '#255a75'
    },
    success: {
      main: '#3a9972',
      light: '#4aa984',
      dark: '#1b5032'
    },
    warm: {
      main: '##c27814',
      light: '##d29e33',
      dark: '#b0560a'
    },
  },
  typography: {
    fontFamily:"Open Sans",

    card: {
      fontSize: 100,
      fontWeight: 900,
      color: 'white'
    },
    content: {

    },
    title: {

    }

  }
  
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TrendingCarousel width={600} height={800}/>
        <Typography variant="h2" gutterBottom>
          Welcome to React
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default App;
