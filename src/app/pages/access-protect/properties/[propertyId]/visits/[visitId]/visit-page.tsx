import { Fragment } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { useQueryVisit } from '../../../../../../../features/access-protect/state/server';
import { BasicBreadcrumbs } from '../../../../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import { VisitorListItem } from '../../../../../../../features/access-protect/components/visits/visitor-list-item.tsx';

export const VisitPage = () => {
  const organizationId = '08dd6d6a-fb22-a96e-fdb3-b20335000001';
  const { propertyId, visitId } = useParams();

  const { isLoading, error, data } = useQueryVisit(organizationId, propertyId as string, visitId as string);

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
          Visit {JSON.stringify(data)}
          <VisitorListItem key={data.id} visit={data}/>
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
