import { Avatar, Box, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { type FC } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { VisitModel } from '../../../services/models/visit-model.ts';

dayjs.extend(relativeTime);

interface VisitorStatusChipProps {
  visit: VisitModel;
}

export const VisitorStatusChip : FC<VisitorStatusChipProps>= ({ visit }) => {
  if (visit.leftAt) {
    return (
      <Chip
        size="small"
        label={<Box component={'small'}>CHECKED OUT</Box>}
        avatar={(
          <Avatar
            sx={{
              backgroundColor: '#378C36',
              width: 26,
              height: 26,
            }}
          >
            <Box
              component="img"
              src="/icons/location_away.png"
              alt="Checked in"
              sx={{
                width: 12,
                height: 12,
                filter: 'brightness(0) invert(1)',
              }}
            />
          </Avatar>
        )}
        sx={{
          fontSize: '0.65rem',
          color: 'white',
          backgroundColor: '#2C3E37',
          '& .MuiChip-label': { minWidth: '4.8rem' },
        }}
      />
    );
  }

  // checked-in
  return (
    <Chip
      size="small"
      label={<Box component={'small'} sx={{ minWidth: '4.5rem' }}>CHECKED IN</Box>}

      avatar={(
        <Avatar
          sx={{
            backgroundColor: '#E6692E',
            width: 26,
            height: 26,
          }}
        >
          <Box
            component="img"
            src="/icons/location_home.png"
            alt="Checked in"
            sx={{
              width: 12,
              height: 12,
              filter: 'brightness(0) invert(1)',
            }}
          />
        </Avatar>
      )}
      sx={{
        fontSize: '0.65rem',
        color: 'white',
        backgroundColor: '#2a403b',
        '& .MuiChip-label': { minWidth: '4.8rem' },
      }}
    />
  );
};
