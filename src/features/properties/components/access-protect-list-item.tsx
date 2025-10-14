import Card from '@mui/material/Card';
import type { PropertyModel } from '../services/models/property-model.ts';
import type { FC } from 'react';
import { getPropertyStatusColor } from '../utils/property-helper.ts';
import { Box, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Divider from '@mui/material/Divider';

interface AccessProtectListItemProps {
  property: PropertyModel;
}

export const AccessProtectListItem : FC<AccessProtectListItemProps>= ({ property }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        my:1,
      }}
    >
      <Card
        elevation={2}
        sx={{
          borderLeft: `1rem solid ${getPropertyStatusColor(property?.riskLevel)} !important`,

          // radius: '0',
          // height: '100%',
          // display: 'flex',
          // flexDirection: 'column',
          // backgroundColor: 'white',
          borderColor: 'divider !important',
        }}
        // onClick={
        //   () => navigate(`/access/protect/properties/${property.id}/visits`)
        // }
      >
        {/*<CardActionArea>*/}
        <CardContent
          sx={{
            '&:last-child': { pb: 2 },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            // paddingBottom={2}
          >
            <Box>
              <Stack direction="row" alignItems="center" gap={1}>
                <Tooltip title={property.name} placement="top">
                  <Typography
                    variant="subtitle2"
                    data-testid="access-control-property-name"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                      display: 'block',
                      cursor: 'pointer',
                    }}>
                    {property.name}
                  </Typography>
                </Tooltip>


              </Stack>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {/*<StatusBadge riskLevel={property?.riskLevel} />*/}
              {/*<Divider orientation="vertical" flexItem sx={{ ml: 1 }} />*/}

              <IconButton
                onClick={() => {
                  navigate(`/access/protect/properties/${property.id}`);
                }}
              >
                <DashboardIcon fontSize={'small'} />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />

              <IconButton
                onClick={() => {
                  navigate(`/access/protect/properties/${property.id}/visits`);
                }}
              >
                <VisibilityOutlinedIcon fontSize={'small'} />
              </IconButton>
            </Box>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {/*{property.livestockTypes.map((type) => (*/}
            {/*  <LivestockBadge*/}
            {/*    key={type}*/}
            {/*    livestockType={type}*/}
            {/*  />*/}
            {/*))}*/}
          </Stack>
        </CardContent>


        {/*</CardActionArea>*/}
      </Card>
    </Box>
  );
};
