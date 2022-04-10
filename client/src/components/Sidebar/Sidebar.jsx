import React, {useState} from 'react'
import {Drawer, IconButton, List, Stack, ListItemIcon, ListItemButton,ListItemText,Divider} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';


import theme from '../../theme';
import { common } from '@mui/material/colors';
import { borderRadius } from '@mui/system';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: {sm: '100%', md: drawerWidth},
  
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
  
});

function Sidebar(props) {
  const {drawerOpen, setDrawerOpen} = props; 

  return (
    <>
      <Drawer 
      sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(drawerOpen && { //when open use the openedMixin style
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!drawerOpen && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
          display: {xs: "none", md:"flex"},
        })
      }}
      variant='permanent'
    >
          <List sx={{pt:0}}>

          <ListItemButton
              onClick={()=>setDrawerOpen(prev => !prev)}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : 'auto',
                  justifyContent: drawerOpen ? 'right' : 'center',
                  color: common.white,
                  borderRadius: '50%',
                }}
              >
                {drawerOpen ? <ChevronLeftIcon/> : <MenuIcon />}
              </ListItemIcon>
            </ListItemButton>
          {['Home', 'Featured', 'Projects List', 'Campfire', 'Music'].map((text, index) => (
            <>
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
            <Divider />
            </>
            
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar