import { Fragment } from 'react';
import {
  AccessProtectPropertyListItem,
  AccessProtectPropertyPolicyListItem,
} from '../../../../features/properties/components/access-protect-property-list-item.tsx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { BasicBreadcrumbs } from '../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import { useQueryAccessProtectProperties } from '../../../../features/access-protect/state/server';
import { useOrganizationStore } from '../../../../features/user-management/state/client/store.ts';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Typography from '@mui/material/Typography';

export const AccessProtectPropertiesPage = () => {
  const { organizationId, policies } = useOrganizationStore();

  const { isLoading, error, data } = useQueryAccessProtectProperties(organizationId!);

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    const propertyIds = new Set((data ?? []).map((p) => p.id));
    const missing = (policies?.properties ?? []).filter((p) => !propertyIds.has(p.propertyId));

    return (
      <Box>
        <BasicBreadcrumbs
          label={'Properties'}
          links={[{
            name: 'AP',
            href: '/access/protect/dashboard',
          }]}
        />

        <Container
          // maxWidth="xl"
          disableGutters={true}
          maxWidth={false}
          sx={{ p:2 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="subtitle2" >
              Properties
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              {/*<PropertyDrillDownFilter*/}
              {/*  properties={properties}*/}
              {/*  options={options}*/}
              {/*  onDrillDownFilter={(value) => {*/}
              {/*    onOptionsChange(value);*/}
              {/*  }}*/}
              {/*/>*/}
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <IconButton
                onClick={() => {
                  // setIsFilterOpen((prev) => !prev);
                }}
              >
                <TuneIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my:2 }} />

          {
            data.map((property) => (
              <Box  key={property.id} >
                <AccessProtectPropertyListItem key={property.id} property={property}/>
              </Box>
            ))
          }

          <Divider sx={{ my:2 }} />

          {missing.map((property) => (
            <Box key={property.propertyId} >
              <AccessProtectPropertyPolicyListItem key={property.propertyId} property={property} />
            </Box>
          ))}
        </Container>
      </Box>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};
