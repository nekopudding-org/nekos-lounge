import React, {useState} from 'react'
import {Drawer, List, ListItemIcon, ListItemButton,ListItemText,Divider} from '@mui/material'
import {alpha, styled} from '@mui/styles'
import { Link } from 'react-router-dom';
import { common } from '@mui/material/colors';
import { borderRadius } from '@mui/system';
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
  width: {xs: '100%', md: drawerWidth},
  
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

const SidebarItem = styled(ListItemButton)(({ theme }) => ({

  color: 'red !important',
  '&.Mui-selected': {
    backgroundColor: 'blue !important',
  }
}));


///////////////////////////////////////////////           MAIN CONTENT            /////////////
const pageList = [
  {title: 'Home', icon: HomeIcon, route: '/'},
  {title: 'Featured', icon: StarOutlineIcon, route: '/featured'}, 
  {title: 'Campfire', icon: FireplaceIcon, route: '/campfire'},
  {title: 'Music', icon: MusicNoteIcon, route: '/music'},
  {title: 'Timer', icon: TimerIcon, route: '/timer'}
]

function Sidebar(props) {
  const {drawerOpen, setDrawerOpen} = props; 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

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
            <Link to={item.route}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    bgcolor: theme.palette.background.sidebarHover,
                  },
                  '&.Mui-selected:hover, &.Mui-selected': {
                    bgcolor: theme.palette.background.sidebarSelected,
                  },
                }}
                disableRipple
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: drawerOpen ? 1 : 0 }} />
              </ListItemButton>
            </Link>
            <Divider/>
            </React.Fragment>
            
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar