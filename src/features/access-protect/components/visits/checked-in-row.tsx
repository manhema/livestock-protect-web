import { Avatar, Box, Button, Chip, Dialog, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { type FC, Fragment, type ReactElement, useState } from 'react';
import type { VisitModel } from '../../services/models/visit-model.ts';
import Divider from '@mui/material/Divider';
import { CheckoutVisitorForm } from './forms/checkout-visitor-form.tsx';

interface CheckedInRowProps {
  visit: VisitModel;
}

export const CheckedInRow : FC<CheckedInRowProps>= ({ visit }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const visitedAt = dayjs(new Date(visit.visitedAt));

  // let icon = <GarageOutlinedIcon fontSize="small" />;
  //
  // if (visit.area) {
  //   icon = <LocationOnOutlinedIcon fontSize="small" />;
  // } else if (visit.unit) {
  //   icon = <DoorFrontOutlinedIcon fontSize="small" />;
  // }

  let type = 'main';

  if (visit.area) {
    type = 'area';
  } else if (visit.unit) {
    type = 'unit';
  }

  const checkout = (): ReactElement => {
    if (visit.questionnaire.length === 0) {
      return (
        <Fragment>
          <Typography variant="caption">
            {'internal'}
          </Typography>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        </Fragment>
      );
    }

    if (visit.questionnaire.length > 0 && visit.leftAt) {
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

    if (visit.questionnaire.length > 0 && !visit.leftAt) {
      return (
        <Fragment>
          <Button
            type="button"
            size="small"
            variant="contained"
            sx={{ my: 0, fontSize: '75%' }}
            onClick={handleOpen}
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
    <Fragment>
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
              '& .MuiChip-label': { minWidth: '4.8rem' },
            }}
          />

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Typography variant={'caption'}>
            {type}
          </Typography>

          {/*<Box*/}
          {/*  sx={{*/}
          {/*    mx:1,*/}
          {/*    borderRadius: '5px',*/}
          {/*    backgroundColor: '#1C4971FF',*/}
          {/*    color: 'white',*/}

          {/*    width: 26,*/}
          {/*    height: 26,*/}
          {/*    display: 'flex',*/}
          {/*    alignItems: 'center',*/}
          {/*    justifyContent: 'center',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {icon}*/}
          {/*</Box>*/}
        </Box>


        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {checkout()}
          <Typography variant={'caption'}>
            Checked-In: {visitedAt.format('ddd DD MMM YYYY HH:mm')}
          </Typography>
        </Box>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ p: 2 }}>
          <CheckoutVisitorForm
            visit={visit}
            onSuccess={() => {
              handleClose();
            }}
          />
        </Box>
      </Dialog>
    </Fragment>
  );
};
