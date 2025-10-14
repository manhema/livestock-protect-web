import Card from '@mui/material/Card';
import { type FC, Fragment, type ReactElement, useState } from 'react';
import { getPropertyStatusColor } from '../../../../properties/utils/property-helper.ts';
import { Box, Button, CardContent, Dialog } from '@mui/material';
import type { VisitModel } from '../../../services/models/visit-model.ts';
import { VisitorStatusChip } from '../chips/visitor-status-chip.tsx';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { CheckoutVisitorForm } from '../forms/checkout-visitor-form.tsx';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router';

dayjs.extend(durationPlugin);

interface VisitorListItemProps {
  visit: VisitModel;
}

export const VisitorListItem : FC<VisitorListItemProps>= ({ visit }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let type = 'main';

  if (visit.area) {
    type = 'area';
  } else if (visit.unit) {
    type = 'unit';
  }

  const visitedAt = dayjs(new Date(visit.visitedAt));

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
      <Box
        sx={{
          my:1,
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderLeft: `1rem solid ${getPropertyStatusColor(visit.property.riskLevel)} !important`,
            borderColor: 'divider !important',
          }}
        >
          <CardContent
            sx={{
              '&:last-child': { pb: 2 },
            }}
          >
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
                <VisitorStatusChip visit={visit}  />
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Typography variant={'caption'}>
                  {type}
                </Typography>
                {/*  */}
                {/*<Box*/}
                {/*  sx={{*/}
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
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Typography
                  variant="caption"
                  data-testid="access-control-property-name"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    display: 'block',
                    cursor: 'pointer',
                  }}>
                  {`${visit.user.firstName} ${visit.user.lastName}`}
                </Typography>
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
                  {/*Checked-In: {timeago}*/}
                  Checked-In: {visitedAt.format('ddd DD MMM YYYY HH:mm')}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />

                <IconButton
                  onClick={() => {
                    navigate(`/access/protect/properties/${visit.property.id}/visits/${visit.id}`);
                  }}
                >
                  <VisibilityOutlinedIcon fontSize={'small'} />
                </IconButton>
              </Box>


            </Stack>
          </CardContent>
        </Card>
      </Box>

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
