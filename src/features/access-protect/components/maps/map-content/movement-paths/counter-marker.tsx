import type { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface CountMarkerProps {
  count: any;
}

export const CountMarker: FC<CountMarkerProps> = ({ count }) => {
  return (
    <Box
      sx={{
        width: 40, // Increase from 24 to make hitbox larger
        height: 40, // Increase from 24
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      <Box
        sx={{
          backgroundColor: 'rgba(100, 100, 100, 0.85)',
          border: '1px solid white',
          borderRadius: '50%',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          position: 'relative',
        }}>
        <Typography
          sx={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: 'white',
          }}>
          {count}
        </Typography>

      </Box>
    </Box>
  );
};
