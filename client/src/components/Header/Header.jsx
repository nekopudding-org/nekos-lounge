import React, { useState } from 'react';
import { AppBar,Box,Toolbar,IconButton,Typography,Button, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

function Header() {
  const [open, setOpen] = useState(false);    
  return (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer 
      sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
          })
      }}
      variant='permanent'
    >
          dasfaskdf
      </Drawer>
    </>
  )
}

export default Header;