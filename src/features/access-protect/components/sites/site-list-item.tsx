import Card from '@mui/material/Card';
import { type FC, Fragment } from 'react';
import { Box, CardContent, Stack, Typography } from '@mui/material';
import type { SiteModel } from '../../services/models/site-model.ts';
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconButton from '@mui/material/IconButton';

import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FenceOutlinedIcon from '@mui/icons-material/FenceOutlined';
import { ViewSiteQrCodeDialog } from './qrcodes/qrcode-dialog.tsx';
import { config } from '../../../../core/config/config.ts';

interface PropertyListItemProps {
  property: SiteModel['property'];
}

export const PropertyListItem : FC<PropertyListItemProps>= ({ property }) => {
  return (
    <Box
      sx={{
        my:1,
      }}
    >
      <Card
        elevation={2}
        sx={{
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
            <Box>
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
                  Main: {property.name}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <ViewSiteQrCodeDialog
                title={property.name}
                url={`${config.accessProtect.selfServicePortalUrl}/properties/${property.id}`}
                builder={(open) => (
                  <Fragment>
                    <IconButton
                      onClick={
                        () => open()
                      }
                    >
                      <QrCode2OutlinedIcon sx={{ fontSize: '18px', color: 'black' }} />
                    </IconButton>
                  </Fragment>
                )}
              />
            </Box>
          </Stack>
        </CardContent>

      </Card>
    </Box>
  );
};


interface UnitListItemProps {
  property: SiteModel['property'];
  unit: SiteModel['unit'];
}
export const UnitListItem : FC<UnitListItemProps>= ({ property, unit }) => {

  return (
    <Box
      sx={{
        my:1,
      }}
    >
      <Card
        elevation={2}
        sx={{
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
            // paddingBottom={2}
          >
            <Box>
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
                  Unit: {unit?.name}
                </Typography>


              </Stack>
            </Box>

            <Box>
              <ViewSiteQrCodeDialog
                title={`${property.name} | ${unit?.name}`}
                url={`${config.accessProtect.selfServicePortalUrl}/properties/${property.id}?unit=${unit?.id}`}
                builder={(open) => (
                  <Fragment>
                    <IconButton
                      onClick={
                        () => open()
                      }
                    >
                      <QrCode2OutlinedIcon sx={{ fontSize: '18px', color: 'black' }} />
                    </IconButton>
                  </Fragment>
                )}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

interface AreaListItemProps {
  property: SiteModel['property'];
  area: SiteModel['area'];
}

export const AreaListItem : FC<AreaListItemProps>= ({ property, area }) => {

  return (
    <Box
      sx={{
        my:1,
      }}
    >
      <Card
        elevation={2}
        sx={{
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
            // paddingBottom={2}
          >
            <Box>
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
                  Area: {area?.name}
                </Typography>


              </Stack>
            </Box>

            <Box>

              <IconButton
                // onClick={
                //   // () => navigate('/access/protect')
                // }
              >
                <EditOutlinedIcon sx={{ fontSize: '18px', color: 'black' }} />
              </IconButton>

              <ViewSiteQrCodeDialog
                title={`${property.name} | ${area?.name}`}
                url={`${config.accessProtect.selfServicePortalUrl}/properties/${property.id}?area=${area?.id}`}
                builder={(open) => (
                  <Fragment>
                    <IconButton
                      onClick={
                        () => open()
                      }
                    >
                      <QrCode2OutlinedIcon sx={{ fontSize: '18px', color: 'black' }} />
                    </IconButton>
                  </Fragment>
                )}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};


interface SiteListItemProps {
  site: SiteModel;
}

export const SiteListItem : FC<SiteListItemProps>= ({ site }) => {

  if (site.type === 'unit' && site.unit) {
    return <UnitListItem property={site.property} unit={site.unit}/>;
  }

  if (site.type === 'area' && site.area) {
    return <AreaListItem property={site.property} area={site.area}/>;
  }

  return <PropertyListItem property={site.property}/>;
};
