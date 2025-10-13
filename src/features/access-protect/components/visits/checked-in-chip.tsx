import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { FC } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import type { VisitModel } from '../../services/models/visit-model.ts';
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

dayjs.extend(relativeTime);
interface CheckedInChipProps {
  visit: VisitModel;
  datetime: Date | string;
}

export const CheckedInChip : FC<CheckedInChipProps>= ({ visit, datetime }) => {
  const timeago = dayjs(datetime).fromNow();

  let icon = <GarageOutlinedIcon fontSize="small" />;

  if (visit.area) {
    icon = <LocationOnOutlinedIcon fontSize="small" />;
  } else if (visit.unit) {
    icon = <DoorFrontOutlinedIcon fontSize="small" />;
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Chip
          size="small"
          label={<small>CHECKED IN</small>}
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
          }}
        />

        {icon}
      </Box>


      <Typography variant={'caption'}>
        {timeago}
      </Typography>
    </Stack>
  );
};
