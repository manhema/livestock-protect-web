import { Fragment } from 'react';
import { LoginWithEmailForm } from '../../features/authentication/components/forms/login-with-email-form.tsx';
import { useNavigate } from '@tanstack/react-router';
import Container from '@mui/material/Container';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Container maxWidth="sm">
        <br/>
        <br/>
        <LoginWithEmailForm
          onSuccess={() => {
            navigate({ to: '/' });
          }}
        />
      </Container>
    </Fragment>
  );
};
