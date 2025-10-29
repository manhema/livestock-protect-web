import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MiniDrawerNavigation } from '../app/layout/drawers/mini-drawer-navigation';
import { AuthenticationGuard } from '../app/layout/guards/authentication-guard';
import { OrganizationsGuard } from '../app/layout/guards/guards/organizations-guard';
import { PoliciesGuard } from '../app/layout/guards/guards/policies-guard';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { LoginPage } from '../app/pages/login-page.tsx';

export const Route = createFileRoute('/_protected')({
  component: () => (
    <AuthenticationGuard fallback={<LoginPage />}>
      <OrganizationsGuard>
        <PoliciesGuard>
          <MiniDrawerNavigation>
            <Outlet />
          </MiniDrawerNavigation>
          <TanStackRouterDevtools />
        </PoliciesGuard>
      </OrganizationsGuard>
    </AuthenticationGuard>
  ),
});
