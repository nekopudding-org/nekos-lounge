import React from 'react';
import { AppBar,Box,Toolbar,IconButton,Typography,Button} from '@mui/material'
import theme from '../../theme';
import MenuIcon from "@mui/icons-material/Menu";


function Header(props) {
  const {drawerOpen, drawerWidth, setDrawerOpen} = props;
  return (
  <>
      <AppBar position='fixed' sx={{ 
          ml: drawerOpen ? props.drawerWidth : 0, 
          p: 0,
          width: drawerOpen ?  `calc(100% - ${drawerWidth}px)` : '100%',
          boxShadow:0,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
          ...(drawerOpen && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          })
        }}
      >
        <Toolbar variant='dense'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: 5,
              ...(drawerOpen && { display: "none" })
            }}
            onClick={()=> setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow:1}}>
            <Typography variant="h6" component="div" nowrap>
              Neko's Lounge
            </Typography>
          </Box>

          <Box sx={{flexGrow:0}}>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

Header.defaultProps = {
  drawerWidth: 240,
  drawerOpen: false
}
export default Header;