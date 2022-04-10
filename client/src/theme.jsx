import { createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

const theme = createTheme({
    mode: dark,
    palette: {
      text: {
        primary: '#e2e2e2'
      },
      background: {
        default: '#242c49',
        paper: '#324470',
        dark: '#161a2b'
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
      allVariants: {
        fontFamily:"Open Sans",
        color: '#e2e2e2',
      },
  
      card: {
        fontWeight: 300,
        color: 'white'
      },
      content: {
  
      },
      title: {
        fontWeight: 800
      }
    },
  });

export default theme;