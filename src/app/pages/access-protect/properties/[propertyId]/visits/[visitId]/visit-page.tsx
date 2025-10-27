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
import {
  CheckedOutChip,
} from '../../../../../../../features/access-protect/components/visits/chips/checked-out-chip.tsx';
import type { VisitModel } from '../../../../../../../features/access-protect/services/models/visit-model.ts';
import { useQueryVisit } from '../../../../../../../features/access-protect/state/server';
import { getPropertyStatusColor } from '../../../../../../../features/properties/utils/property-helper.ts';
import { BasicBreadcrumbs } from '../../../../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import Divider from '@mui/material/Divider';
import { CheckedInRow } from '../../../../../../../features/access-protect/components/visits/checked-in-row.tsx';
import { EmployeeCard } from '../../../../../../../features/access-protect/components/visits/cards/employee-card.tsx';
import { CompanyCard } from '../../../../../../../features/access-protect/components/visits/cards/company-card.tsx';

export const VisitPage = () => {
  // const { organizationId } = useOrganizationStore();
  const { propertyId, visitId } = useParams();

  const { isLoading, error, data } = useQueryVisit(propertyId as string, visitId as string);

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
        <BasicBreadcrumbs
          label={'Visit'}
          links={[
            {
              name: 'AP',
              href: '/access/protect/dashboard',
            },
            {
              name: 'Properties',
              href: '/access/protect/properties',
            },
            {
              name: 'Property',
              href: `/access/protect/properties/${propertyId}`,
            },
            {
              name: 'Visits',
              href: `/access/protect/properties/${propertyId}/visits`,
            },
          ]}
        />

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
              <CardContent
                sx={{
                  '&:last-child': { pb: 2 },
                }}
              >
                <CheckedInRow visit={data} />
              </CardContent>
            </Card>
          </Box>

          {checkedOutContent(data)}

          <UserCard user={data.user} />
          {data.vehicleRegNo && <VehicleCard vehicleRegNo={data.vehicleRegNo} />}
          <ReasonCard reason={data.reason} />
          {data.employee && <EmployeeCard employee={data.employee} />}
          {data.company && <CompanyCard company={data.company} />}
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
