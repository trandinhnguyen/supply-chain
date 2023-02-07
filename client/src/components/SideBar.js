

import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

export default function SideBar() {
    return (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      ></Drawer>
    );
}   