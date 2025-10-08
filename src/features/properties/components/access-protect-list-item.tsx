import Card from '@mui/material/Card';
import type { PropertyModel } from '../services/models/property-model.ts';
import type { FC } from 'react';
import { getPropertyStatusColor } from '../utils/property-helper.ts';
import { Box, CardActionArea, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import StatusBadge from './badges/property-status-badge.tsx';
import { LivestockBadge } from './badges/livestock-badge.tsx';

interface AccessProtectListItemProps {
  property: PropertyModel;
}

export const AccessProtectListItem : FC<AccessProtectListItemProps>= ({ property }) => {
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
      >
        <CardActionArea>
          <CardContent>
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

              <Box>
                <StatusBadge riskLevel={property?.riskLevel} />
              </Box>
            </Stack>

            <Stack direction="row" flexWrap="wrap" gap={1}>
              {property.livestockTypes.map((type) => (
                <LivestockBadge
                  key={type}
                  livestockType={type}
                />
              ))}
            </Stack>
          </CardContent>


        </CardActionArea>
      </Card>
    </Box>
  );
};
