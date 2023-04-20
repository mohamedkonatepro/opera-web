import React from 'react';
import { Drawer, Toolbar, useTheme } from '@mui/material';

const drawerWidth = '288px';
const SideBar = () => {
  const theme = useTheme();
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.default
        }
      }}
      variant="permanent"
      sx={{ minWidth: drawerWidth }}
    >
      <Toolbar sx={{ width: drawerWidth }}>
        <img src="/logo.png" alt="logo" height="28px" width="52px" />
      </Toolbar>
    </Drawer>
  );
};

export default SideBar;
