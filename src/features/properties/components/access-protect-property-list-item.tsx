import Card from '@mui/material/Card';
import { type PropertyModel } from '../services/models/property-model.ts';
import type { FC } from 'react';
import { getPropertyStatusColor } from '../utils/property-helper.ts';
import { Box, Button, CardContent, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Divider from '@mui/material/Divider';
import { PolicyInformationModel } from '../../user-management/services/models/policy-information-model.ts';

interface AccessProtectListItemProps {
  property: PropertyModel;
}

export const AccessProtectPropertyListItem : FC<AccessProtectListItemProps>= ({ property }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ my:1 }}
    >
      <Card
        elevation={2}
        sx={{
          borderLeft: `1rem solid ${getPropertyStatusColor(property?.riskLevel)} !important`,
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


interface AccessProtectPropertyPolicyListItemProps {
  property: PolicyInformationModel['properties'][0];
}

export const AccessProtectPropertyPolicyListItem : FC<AccessProtectPropertyPolicyListItemProps>= ({ property }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        my:1,
      }}
    >
      <Card
        aria-disabled={true}
        elevation={2}
        sx={{
          borderLeft: `1rem solid ${getPropertyStatusColor()} !important`,
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
            <Box sx={{ opacity: 0.6 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography
                  variant="subtitle2"
                  data-testid="access-control-property-name"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    display: 'block',
                    cursor: 'default',
                    color: 'text.disabled',
                  }}>
                  {property.name}
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.6 }}>
                <IconButton
                  disabled
                  onClick={() => {
                    navigate(`/access/protect/properties/${property.propertyId}`);
                  }}
                >
                  <DashboardIcon fontSize={'small'} />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />

                <IconButton
                  disabled
                  onClick={() => {
                    navigate(`/access/protect/properties/${property.propertyId}/visits`);
                  }}
                >
                  <VisibilityOutlinedIcon fontSize={'small'} />
                </IconButton>
              </Box>
              <Button
                type="button"
                size="small"
                variant="contained"
                sx={{ my: 0, fontSize: '75%' }}
                // onClick={
                //   () => navigate(`/access/protect/properties/${property.id}/visits`)
                // }
              >
                <small>Subscription Required</small>
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
