import React, {useState} from 'react'
import {Drawer, List, ListItemIcon, ListItemButton,Divider} from '@mui/material'
import SidebarItem from './SidebarItem';
import { Link } from 'react-router-dom';
import { common } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TimerIcon from '@mui/icons-material/Timer';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import theme from 'theme';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: {xs: '100vw', md: drawerWidth},
  
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

///////////////////////////////////////////////           MAIN CONTENT            /////////////
const pageList = [
  {title: 'Home', icon: HomeIcon, route: '/'},
  {title: 'Featured', icon: StarOutlineIcon, route: '/featured'}, 
  {title: 'Campfire', icon: FireplaceIcon, route: '/campfire'},
  {title: 'Music', icon: MusicNoteIcon, route: '/music'},
  {title: 'Timer', icon: TimerIcon, route: '/timer'}
]

function Sidebar(props) {
  const {drawerOpen, setDrawerOpen, setTimerOpen, setResetTimerWindow, setPlaylistOpen} = props; 
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => { setSelectedIndex(index); setDrawerOpen(false); };
  const openPlaylist = () => { setDrawerOpen(false); setPlaylistOpen(true);}
  const openTimer = () => { setTimerOpen(true); setDrawerOpen(false); setResetTimerWindow(true); }

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
          }),
        }}
      variant='permanent'
      PaperProps={{sx: {bgcolor: theme.palette.background.sidebar}}}
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
          {pageList.map((item, index) => (
            <React.Fragment key={index}>
            {index <= 2 && 
              <Link to={item.route}>
                <SidebarItem item={item} drawerOpen={drawerOpen} selectedIndex={selectedIndex} index={index} handleListItemClick={handleListItemClick}/>
              </Link>
            }
            {index === 3 && 
              <SidebarItem item={item} drawerOpen={drawerOpen} selectedIndex={selectedIndex} index={index} handleListItemClick={openPlaylist}/>
            }
            {index === 4 && 
              <SidebarItem item={item} drawerOpen={drawerOpen} selectedIndex={selectedIndex} index={index} handleListItemClick={openTimer}/>
            }
            <Divider/>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar