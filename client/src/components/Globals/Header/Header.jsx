import React from 'react';
import { AppBar,Box,Toolbar,IconButton,Typography,Button, Badge} from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from 'theme';

function Header(props) {
  const {drawerOpen, drawerWidth, setDrawerOpen} = props;
  return (
  <>
      <AppBar position='fixed' sx={{ 
          ml: drawerOpen ? props.drawerWidth : 0, 
          p: 0,
          width: drawerOpen ?  `calc(100% - ${drawerWidth}px)` : '100%',
          boxShadow:2,
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
          }),
          bgcolor: theme.palette.background.light,
        }}
      >
        <Toolbar variant='dense'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: {xs: 1, md:5},
              ...(drawerOpen && { display: "none" })
            }}
            onClick={()=> setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow:1}}>
            <Typography variant="h6" noWrap>
              Neko's Lounge
            </Typography>
          </Box>
          <IconButton sx={{mr: 1}}><Badge badgeContent={1} color="secondary"><NotificationsIcon/></Badge></IconButton>
          <Box>
            <Button color="inherit"><Typography variant='body2'>Login</Typography></Button>
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