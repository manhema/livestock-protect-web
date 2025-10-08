import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { LoginPage } from './pages/login-page.tsx';
import { HomePage } from './pages/home/home-page.tsx';
import { AuthenticationGuard } from './routing/guards/authentication-guard.tsx';
import { PropertiesPage } from './pages/properties/properties-page.tsx';
import { AccessProtectPage } from './pages/access-protect/access-protect-page.tsx';
import { ReportsPage } from './pages/reports/reports-page.tsx';
import {
  ElectronicBiosecurityAssessmentPage,
} from './pages/contingency-planning/electronic-biosecurity-assessment-page.tsx';
import { OperationsPage } from './pages/operations/operations-page.tsx';
import { MiniDrawerNavigation } from './routing/drawers/mini-drawer-navigation.tsx';
import { AccessProtectByPropertyIdPage } from './pages/access-protect/[propertyId]/access-protect-by-propert-id-page.tsx';
import {
  AccessProtectVisitsByPropertyIdPage,
} from './pages/access-protect/[propertyId]/visits/visits-by-property-id-page.tsx';

const ProtectedAppLayout = () => {
  return (
    <AuthenticationGuard
      fallback={<LoginPage />}
    >
      <MiniDrawerNavigation>
        <Outlet />
      </MiniDrawerNavigation>
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
          <Route index path="/access/protect/:propertyId" element={<AccessProtectByPropertyIdPage />} />
          <Route index path="/access/protect/:propertyId/visits" element={<AccessProtectVisitsByPropertyIdPage />} />



          <Route index path="/contingency-planning/ebas" element={<ElectronicBiosecurityAssessmentPage />} />
          <Route index path="/reports" element={<ReportsPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
