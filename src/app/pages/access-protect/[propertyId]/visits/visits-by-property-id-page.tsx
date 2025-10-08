import { Fragment } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { BasicBreadcrumbs } from '../../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import { useParams } from 'react-router';
import { useQueryVisitsByPropertyId } from '../../../../../features/access-protect/state/server';
import { VisitsTable } from '../../../../../features/access-protect/components/visits/visits-table.tsx';

export const AccessProtectVisitsByPropertyIdPage = () => {
  const organizationId = '08dd6d6a-fb22-a96e-fdb3-b20335000001';
  const { propertyId } = useParams();

  const { isLoading, error, data } = useQueryVisitsByPropertyId(organizationId, propertyId as string);

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (data) {
    return (
      <Box>
        <BasicBreadcrumbs/>

        <Container
          // maxWidth="xl"
          disableGutters={true}
          maxWidth={false}
          sx={{ p:2 }}
        >
          Properties {data.length}
          <VisitsTable visits={data} />
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
