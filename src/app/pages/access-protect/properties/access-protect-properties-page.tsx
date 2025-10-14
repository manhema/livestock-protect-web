import { Fragment } from 'react';
import { AccessProtectListItem } from '../../../../features/properties/components/access-protect-list-item.tsx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BasicBreadcrumbs } from '../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import { useQueryAccessProtectProperties } from '../../../../features/access-protect/state/server';
import { useOrganizationStore } from '../../../../features/user-management/state/client/store.ts';

export const AccessProtectPropertiesPage = () => {
  const { organizationId } = useOrganizationStore();

  const { isLoading, error, data } = useQueryAccessProtectProperties(organizationId!);

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
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
          Properties {data.length}
          <Grid container spacing={0}>
            {
              data.map((property) => (
                <Grid key={property.id} size={{ sm: 12, md: 12, lg: 12, xl: 12 }}>
                  {/*<Grid key={property.id} size={{ sm: 6, md: 4, lg: 4, xl: 4 }}>*/}
                  <AccessProtectListItem key={property.id} property={property}/>
                </Grid>
              ))
            }
          </Grid>
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
