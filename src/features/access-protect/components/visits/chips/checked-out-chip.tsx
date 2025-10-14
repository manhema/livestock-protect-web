import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { FC } from 'react';


interface CheckedOutChipProps {
  datetime: Date | string;
}

export const CheckedOutChip : FC<CheckedOutChipProps>= ({ datetime }) => {
  const visitedAt = dayjs(datetime);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Chip
        size="small"
        label={<small>CHECKED OUT</small>}
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
                width: 13,
                height: 13,
                filter: 'brightness(0) invert(1)',
              }}
            />
          </Avatar>
        )}
        sx={{
          fontSize: '0.65rem',
          color: 'white',
          backgroundColor: '#2C3E37',
        }}
      />

      <Typography variant={'caption'}>
        Checked-Out: {visitedAt.format('ddd DD MMM YYYY HH:mm')}
      </Typography>
    </Stack>
  );
};
