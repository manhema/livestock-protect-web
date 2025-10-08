import { type FC, Fragment, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { LoginRequest } from '../../types/request.ts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutationSignInWithEmailAndPassword } from '../../state/server';

interface IFormInput { email: string; password: string; rememberMe: boolean }

interface LoginWithEmailFormProps {
  onSuccess: () => void;
}

export const LoginWithEmailForm : FC<LoginWithEmailFormProps> = ({ onSuccess }) => {
  const { isPending, error, mutate } = useMutationSignInWithEmailAndPassword();
  const [showPassword, setShowPassword] = useState(false);

  const { register, formState: { isValid, errors }, handleSubmit } = useForm<IFormInput>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const request = LoginRequest.parse({
      email: data.email,
      password: data.password,
    });

    console.log(request);

    mutate(request, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <Fragment>
      <Stack
        spacing={1}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <Alert sx={{ my: 2 }} data-testid="error-message" severity="error">Incorrect username or password</Alert>}

        <TextField
          fullWidth
          variant="filled"
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', { required: true })}
        />

        <TextField
          fullWidth
          variant="filled"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password', { required: true })}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          loading={isPending}
          disabled={!isValid}>
          Login
        </Button>
      </Stack>
    </Fragment>
  );
};
