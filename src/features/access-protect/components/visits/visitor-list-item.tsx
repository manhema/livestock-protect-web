import Card from '@mui/material/Card';
import type { FC } from 'react';
import { getPropertyStatusColor } from '../../../properties/utils/property-helper.ts';
import { Box, CardActionArea, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import StatusBadge from '../../../properties/components/badges/property-status-badge.tsx';
import { useNavigate } from 'react-router';
import type { VisitModel } from '../../services/models/visit-model.ts';

interface VisitorListItemProps {
  visit: VisitModel;
}

export const VisitorListItem : FC<VisitorListItemProps>= ({ visit }) => {
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
          borderLeft: `1rem solid ${getPropertyStatusColor(visit.property.riskLevel)} !important`,

          // radius: '0',
          // height: '100%',
          // display: 'flex',
          // flexDirection: 'column',
          // backgroundColor: 'white',
          borderColor: 'divider !important',
        }}
        onClick={
          () => navigate(`/access/protect/properties/${visit.id}/visits/${visit.id}`)
        }
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
                  <Tooltip title={visit.user.firstName} placement="top">
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
                      {`${visit.user.firstName} ${visit.user.lastName}`}
                    </Typography>
                  </Tooltip>


                </Stack>
              </Box>

              <Box>
                <StatusBadge riskLevel={visit.property.riskLevel} />
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


        </CardActionArea>
      </Card>
    </Box>
  );
};
