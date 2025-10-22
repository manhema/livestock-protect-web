import { Fragment } from 'react';
import { useQueryProperties } from '../../../features/properties/state/server';
import { AccessProtectPropertyListItem } from '../../../features/properties/components/access-protect-property-list-item.tsx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BasicBreadcrumbs } from '../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';

export const PropertiesPage = () => {
  const { isLoading, error, data } = useQueryProperties();

  if (isLoading)
    return <Box>Loading...</Box>;

  if (isLoading)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (
      <Box>
        <BasicBreadcrumbs links={[]} label={'Properties'}/>

        <Container
          // maxWidth="xl"
          disableGutters={true}
          maxWidth={false}
          sx={{ p:2 }}
        >
          Properties {data.length}
          <Grid container spacing={2}>
            {
              data.map((property) => (
                <Grid key={property.id} size={{ sm: 12, md: 12, lg: 12, xl: 12 }}>
                  {/*<Grid key={property.id} size={{ sm: 6, md: 4, lg: 4, xl: 4 }}>*/}
                  <AccessProtectPropertyListItem property={property}/>
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
