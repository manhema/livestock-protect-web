import { type FC, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Notifications } from '../../../features/notifications/Notifications.tsx';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


interface NotificationDrawerProps {
  onToggle: () => void;
}
export  const NotificationDrawer : FC<NotificationDrawerProps> = ({ onToggle }) => {
  return (
    <Fragment>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, ml: 2 }}>
          <Typography variant="h6">
            Notifications
          </Typography>
        </Box>
        <IconButton onClick={() => onToggle()}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Notifications />
      </Box>
    </Fragment>
  );
};
