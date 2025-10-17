import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { LoginPage } from './pages/login-page.tsx';
import { HomePage } from './pages/home/home-page.tsx';
import { AuthenticationGuard } from './routing/guards/authentication-guard.tsx';
import { PropertiesPage } from './pages/properties/properties-page.tsx';
import { ReportsPage } from './pages/reports/reports-page.tsx';
import {
  ElectronicBiosecurityAssessmentPage,
} from './pages/contingency-planning/electronic-biosecurity-assessment-page.tsx';
import { OperationsPage } from './pages/operations/operations-page.tsx';
import { MiniDrawerNavigation } from './routing/drawers/mini-drawer-navigation.tsx';
import { AccessProtectPropertiesPage } from './pages/access-protect/properties/access-protect-properties-page.tsx';
import { VisitsPage } from './pages/access-protect/properties/[propertyId]/visits/visits-page.tsx';
import { VisitPage } from './pages/access-protect/properties/[propertyId]/visits/[visitId]/visit-page.tsx';
import { AccessProtectPage } from './pages/access-protect/access-protect-page.tsx';
import { OrganizationsGuard } from './routing/guards/guards/organizations-guard.tsx';
import { PoliciesGuard } from './routing/guards/guards/policies-guard.tsx';

const ProtectedAppLayout = () => {
  return (
    <AuthenticationGuard
      fallback={<LoginPage />}
    >
      <OrganizationsGuard>
        <PoliciesGuard>
          <MiniDrawerNavigation>
            <Outlet />
          </MiniDrawerNavigation>
        </PoliciesGuard>
      </OrganizationsGuard>
    </AuthenticationGuard>
  );
};

export const AppRoutes = () => {
  return  (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedAppLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route index path="/properties" element={<PropertiesPage />} />
          <Route index path="/operations" element={<OperationsPage />} />

          <Route index path="/access/protect" element={<AccessProtectPage />} />

          <Route index path="/access/protect/properties" element={<AccessProtectPropertiesPage />} />

          <Route index path="/access/protect/properties/:propertyId/visits" element={<VisitsPage />} />
          <Route index path="/access/protect/properties/:propertyId/visits/:visitId" element={<VisitPage />} />

          <Route index path="/contingency-planning/ebas" element={<ElectronicBiosecurityAssessmentPage />} />
          <Route index path="/reports" element={<ReportsPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
