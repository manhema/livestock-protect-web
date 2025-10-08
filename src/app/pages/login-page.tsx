import { Fragment } from 'react';
import { LoginWithEmailForm } from '../../features/authentication/components/forms/login-with-email-form.tsx';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <LoginWithEmailForm
        onSuccess={() => {
          navigate('/');
        }}
      />
    </Fragment>
  );
};
