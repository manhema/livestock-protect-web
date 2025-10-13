import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import { useParams } from 'react-router';
import {
  QuestionnaireAnswersCard,
} from '../../../../../../../features/access-protect/components/visits/cards/questionnaire-answers-card.tsx';
import { ReasonCard } from '../../../../../../../features/access-protect/components/visits/cards/reason-card.tsx';
import { UserCard } from '../../../../../../../features/access-protect/components/visits/cards/user-card.tsx';
import { VehicleCard } from '../../../../../../../features/access-protect/components/visits/cards/vehicle-card.tsx';
import { CheckedInChip } from '../../../../../../../features/access-protect/components/visits/checked-in-chip.tsx';
import { CheckedOutChip } from '../../../../../../../features/access-protect/components/visits/checked-out-chip.tsx';
import type { VisitModel } from '../../../../../../../features/access-protect/services/models/visit-model.ts';
import { useQueryVisit } from '../../../../../../../features/access-protect/state/server';
import { getPropertyStatusColor } from '../../../../../../../features/properties/utils/property-helper.ts';
import { BasicBreadcrumbs } from '../../../../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import Divider from '@mui/material/Divider';

export const VisitPage = () => {
  const organizationId = '08dd6d6a-fb22-a96e-fdb3-b20335000001';
  const { propertyId, visitId } = useParams();

  const { isLoading, error, data } = useQueryVisit(organizationId, propertyId as string, visitId as string);

  const checkedOutContent = (visit: VisitModel) => {
    if (visit.leftAt) {
      return (
        <Fragment>
          <Divider sx={{ my: 2 }}/>

          <Box sx={{ my:2 }}>
            <Card
              elevation={2}
              sx={{
                borderLeft: `1rem solid ${getPropertyStatusColor(visit.property.riskLevel)} !important`,
                borderColor: 'divider !important',
              }}
            >
              <CardContent sx={{
                '&:last-child': { pb: 2 },
              }}>
                <CheckedOutChip datetime={visit.visitedAt} />
              </CardContent>
            </Card>
          </Box>
        </Fragment>
      );
    }

    return <Fragment/>;
  };

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

          <Box sx={{ my:2 }}>
            <Card
              elevation={2}
              sx={{
                borderLeft: `1rem solid ${getPropertyStatusColor(data.property.riskLevel)} !important`,
                borderColor: 'divider !important',
              }}
            >
              <CardContent sx={{
                // pb: '16px !important',
                '&:last-child': { pb: 2 },
              }}>
                <CheckedInChip visit={data} datetime={data.visitedAt} />

              </CardContent>
            </Card>
          </Box>

          {checkedOutContent(data)}


          <UserCard user={data.user} />
          {data.vehicleRegNo && <VehicleCard vehicleRegNo={data.vehicleRegNo} />}
          <ReasonCard reason={data.reason} />
          <QuestionnaireAnswersCard questionnaire={data.questionnaire} />
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
