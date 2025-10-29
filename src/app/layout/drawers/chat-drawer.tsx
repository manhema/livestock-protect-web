import { type FC, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Chat } from '../../../features/paula/Chat.tsx';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


interface ChatDrawerProps {
  onToggle: () => void;
}
export  const ChatDrawer : FC<ChatDrawerProps> = ({ onToggle }) => {
  return (
    <Fragment>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, ml: 2 }}>
          <Typography variant="h6">
            Paula
          </Typography>
          <Box
            sx={{
              bgcolor: 'grey.200',
              color: 'grey.800',
              px: 1.5,
              py: 0.25,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              ml: 1,
              lineHeight: 1.6,
            }}
            component="span"
          >
            Preview
          </Box>
        </Box>
        <IconButton onClick={() => onToggle()}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Chat />
      </Box>
    </Fragment>
  );
};
