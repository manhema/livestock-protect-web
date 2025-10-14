import type { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import type { SiteModel } from '../../../../../services/models/site-model.ts';
import Stack from '@mui/material/Stack';
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FenceOutlinedIcon from '@mui/icons-material/FenceOutlined';
import Divider from '@mui/material/Divider';

interface VisitsSiteSelectedItemProps {
  site: SiteModel;
}
export const VisitsSiteSelectedItem: FC<VisitsSiteSelectedItemProps> = ({ site  }) => {
  const getContent = () => {
    if (site.type === 'unit' && site.unit) {
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              borderRadius: '5px',
              backgroundColor: '#1C4971FF',
              color: 'white',

              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DoorFrontOutlinedIcon fontSize="medium" />
          </Box>
          <Typography variant="caption">
            Unit
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

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
            {site.unit?.name}
          </Typography>
        </Stack>
      );
    }

    if (site.type === 'area' && site.area) {
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              borderRadius: '5px',
              backgroundColor: '#1C4971FF',
              color: 'white',

              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LocationOnOutlinedIcon fontSize='medium'  />
          </Box>
          <Typography variant="caption">
            Area
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
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
            {site.area?.name}
          </Typography>
        </Stack>
      );
    }

    return (
      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          sx={{
            borderRadius: '5px',
            backgroundColor: '#1C4971FF',
            color: 'white',

            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FenceOutlinedIcon fontSize="medium" />
        </Box>
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
          Main
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
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
          {site.property.name}
        </Typography>
      </Stack>
    );
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        role={undefined}
        dense
      >
        <ListItemText
          primary={(
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {getContent()}
            </Box>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
};
