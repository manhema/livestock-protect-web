import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginWithEmailForm } from '../src/features/authentication/components/forms/login-with-email-form';

describe('LoginWithEmailForm', () => {
  afterEach(cleanup);

  it('should login the user with an email and password', async () => {
    const onLoginMock = vi.fn();
    render(<LoginWithEmailForm onSuccess={onLoginMock} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'joe.doe@protect.co.uk' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Y6#v2w!pD4@F' } });

    const button = screen.getByRole('button', { name: 'Login' });
    // wait until the button is enabled when the form is valid
    await waitFor(() => {
      expect(button.getAttribute('disabled')).toBe(null);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalled();
    });
  });
});
