import React from 'react'
import {ListItemButton, ListItemIcon,ListItemText} from '@mui/material';
import theme from 'theme'

function SidebarItem(props) {
  const {item, drawerOpen, selectedIndex, index, handleListItemClick} = props
  return (
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
      onClick={() => (handleListItemClick != null) && handleListItemClick(index)}
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
  )
}

export default SidebarItem