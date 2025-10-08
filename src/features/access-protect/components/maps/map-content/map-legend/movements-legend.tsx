import { Box, Paper, Stack, Typography } from '@mui/material';
import { type FC } from 'react';

export const MovementsLegend: FC = () => {
  return (
    <Box maxWidth="300px">
      <Paper sx={{ p:2 }}>
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(100, 100, 100, 0.85)' }} />
            <Typography variant="caption">Movement counts</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 14, height: 4, bgcolor: '#43a047', borderRadius: '2px' }} />
            <Typography variant="caption">Low traffic</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 14, height: 4, bgcolor: '#fb8c00', borderRadius: '2px' }} />
            <Typography variant="caption">Medium traffic</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 14, height: 4, bgcolor: '#e53935', borderRadius: '2px' }} />
            <Typography variant="caption">High traffic</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

