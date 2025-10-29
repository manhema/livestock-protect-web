import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../../app/pages/login-page.tsx';

export const Route = createFileRoute('/login/')({
  component: LoginPage,
});
