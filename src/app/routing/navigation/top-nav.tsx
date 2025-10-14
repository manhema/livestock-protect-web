import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import { Divider, Paper } from '@mui/material';
import { RIGHT_DRAWER_WIDTH } from '../constants.ts';
import { SelectOrganization } from '../../../features/user-management/components/select-organization.tsx';

const drawerWidth = 240;
// const rightDrawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  leftDrawerOpen?: boolean;
  rightDrawerOpen?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'leftDrawerOpen'&& prop !== 'rightDrawerOpen',
})<AppBarProps>(({ theme, leftDrawerOpen, rightDrawerOpen }) => {
  // Base styles
  const baseStyles = {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };

  // Calculate left margin based on left drawer state
  const leftMargin = leftDrawerOpen ? drawerWidth : 0;

  // Calculate right margin based on right drawer state
  const rightMargin = rightDrawerOpen ? RIGHT_DRAWER_WIDTH : 0;

  // Calculate width based on both margins
  const width = `calc(100% - ${leftMargin + rightMargin}px)`;

  return {
    ...baseStyles,
    marginLeft: leftMargin,
    marginRight: rightMargin,
    width,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
});

interface TopNavProps {
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
  openLeftDrawer: () => void;
  openChat: () => void;
  openNotifications: () => void;
}

export const TopNav: FC<TopNavProps> = (props) => {
  return (
    <AppBar
      position="fixed"
      leftDrawerOpen={props.leftDrawerOpen}
      rightDrawerOpen={props.rightDrawerOpen}
      component={Paper}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.openLeftDrawer}
          edge="start"
          sx={{
            marginRight: 5,
            ...(props.leftDrawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon/>
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center'  }}>
          <Box component="img" src="/logos/protect-icon-logo.png" alt="Protect Logo" sx={{ height: 35 }} />
        </Box>
        <Box sx={{ ml: 3*3 }}>
          <SelectOrganization/>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          edge="end"
          onClick={props.openChat}
          sx={{ mr: 1 }}
        >
          <ChatIcon/>
        </IconButton>
        <IconButton
          color="inherit"
          edge="end"
          onClick={props.openNotifications}
        >
          <NotificationsIcon/>
        </IconButton>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
