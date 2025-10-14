import type { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import type { SiteModel } from '../../../../../services/models/site-model.ts';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface VisitsSiteFilterItemProps {
  site: SiteModel;
  checked?: boolean;
  onToggle: (id: string) => void;
}
export const VisitsSiteFilterItem: FC<VisitsSiteFilterItemProps> = ({ site,   checked = false, onToggle  }) => {
  const labelId = `checkbox-list-label-${site.id}`;

  const handleToggle = () => {
    onToggle(site.id);
  };

  const getContent = () => {
    if (site.type === 'unit' && site.unit) {
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="caption">
            unit
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
            }}
          >
            {site.unit?.name}
          </Typography>


        </Stack>
      );
    }

    if (site.type === 'area' && site.area) {
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="caption">
            area
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
            }}
          >
            {site.area?.name}
          </Typography>
        </Stack>
      );
    }

    return (
      <Stack direction="row" alignItems="center" gap={1}>
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
        {/*  <FenceOutlinedIcon fontSize="medium" />*/}
        {/*</Box>*/}
        <Typography variant="caption">
          main
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
    <ListItem
      key={site.id}
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={handleToggle}
        dense
      >
        <ListItemIcon sx={{ padding: 0, mr: 0.5, minWidth:0 }}>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
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
