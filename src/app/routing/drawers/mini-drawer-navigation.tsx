import type { FC } from 'react';
import * as React from 'react';
import { type CSSObject, styled, type Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChatDrawer } from './chat-drawer.tsx';
import { NotificationDrawer } from './notification-drawer.tsx';
import { Container } from '@mui/material';
import { TopNav } from '../navigation/top-nav.tsx';
import { SideNav } from '../navigation/side-nav.tsx';
import { RIGHT_DRAWER_WIDTH } from '../constants.ts';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
    }),
  }),
);

interface MiniDrawerProps {
  children: React.ReactNode;
}

export const MiniDrawerNavigation : FC<MiniDrawerProps> = ({ children } ) =>  {
  const theme = useTheme();
  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState<'chat' | 'notifications'>('chat');

  const handleDrawerOpen = () => {
    setLeftDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setLeftDrawerOpen(false);
  };

  const handleRightDrawerToggle = (panel: 'chat' | 'notifications') => {
    if (rightDrawerOpen && activePanel === panel) {
      // If the same panel is clicked while open, close it
      setRightDrawerOpen(false);
    } else {
      // Otherwise, open the drawer with the selected panel
      setActivePanel(panel);
      setRightDrawerOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <TopNav
        leftDrawerOpen={leftDrawerOpen}
        rightDrawerOpen={rightDrawerOpen}
        openLeftDrawer={handleDrawerOpen}
        openChat={() => handleRightDrawerToggle('chat')}
        openNotifications={() => handleRightDrawerToggle('notifications')}
      />

      <Drawer variant="permanent" open={leftDrawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <SideNav leftDrawerOpen={leftDrawerOpen} />
      </Drawer>

      <Container
        component="main"
        maxWidth={false}
        disableGutters={true}
        sx={{
          // backgroundColor: 'red',
          // p: 3,
          flexGrow: 1,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <DrawerHeader/>
        {children}
      </Container>

      {/* Right Drawer */}
      <MuiDrawer
        anchor="right"
        open={rightDrawerOpen}
        variant="persistent"
        sx={{
          width: rightDrawerOpen ? RIGHT_DRAWER_WIDTH : 0,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          '& .MuiDrawer-paper': {
            width: RIGHT_DRAWER_WIDTH,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
      >
        {activePanel === 'chat' && (
          <ChatDrawer
            onToggle={() => handleRightDrawerToggle('chat')}
          />
        )}

        {activePanel === 'notifications' && (
          <NotificationDrawer
            onToggle={() => handleRightDrawerToggle('notifications')}
          />
        )}
      </MuiDrawer>
    </Box>
  );
};
