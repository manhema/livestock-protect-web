import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { type FC, Fragment, type ReactElement } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import type { VisitModel } from '../../../services/models/visit-model.ts';
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Divider from '@mui/material/Divider';

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

  const action = (): ReactElement => {
    if (visit.leftAt) {
      const visitedAt = dayjs(new Date(visit.visitedAt));

      const leftAt = dayjs(new Date(visit.leftAt));
      const stayDuration = dayjs.duration(leftAt.diff(visitedAt));
      const hours = Math.floor(stayDuration.asHours());
      const minutes = stayDuration.minutes();
      const durationLabel = `${hours} h ${minutes.toString().padStart(2, '0')} m`;


      return (
        <Fragment>
          <Typography variant="caption">
            {`Duration: ${durationLabel}`}
          </Typography>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        </Fragment>
      );
    }
    if (!visit.leftAt) {
      return (
        <Fragment>
          <Button
            type="button"
            size="small"
            variant="contained"
            sx={{ my: 0, fontSize: '75%' }}
            // onClick={handleOpen}
          >
            <small>Check-Out</small>
          </Button>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        </Fragment>
      );
    }

    return <Fragment/>;
  };

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


        <Box
          sx={{
            mx:1,
            borderRadius: '5px',
            backgroundColor: '#1C4971FF',
            color: 'white',

            width: 26,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>


      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {action()}
        <Typography variant={'caption'}>
          {timeago}
        </Typography>
      </Box>
    </Stack>
  );
};
