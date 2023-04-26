import React from "react";
import { Drawer, Toolbar, useTheme } from "@mui/material";
import Image from "next/image";

const drawerWidth = "288px";
const SideBar = () => {
  const theme = useTheme();
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.default,
        },
      }}
      variant="permanent"
      sx={{ minWidth: drawerWidth }}
    >
      <Toolbar sx={{ width: drawerWidth }}>
        <Image src="/logo.png" alt="logo" height={28} width={52} />
      </Toolbar>
    </Drawer>
  );
};

export default SideBar;
