import { Fragment } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { useQueryVisitsByPropertyId } from '../../../../../../features/access-protect/state/server';
import { BasicBreadcrumbs } from '../../../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import { VisitsTable } from '../../../../../../features/access-protect/components/visits/visits-table.tsx';
import { VisitorListItem } from '../../../../../../features/access-protect/components/visits/visitor-list-item.tsx';

export const VisitsPage = () => {
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
          {
            data.map((visit) => (
              <VisitorListItem key={visit.id} visit={visit}/>
            ))
          }
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
