/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SigninForm } from './signin-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../state/store/auth';
import { useSigninMutation } from '../../hooks/use-auth';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('../../../../state/store/auth', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('../../hooks/use-auth', () => ({
  useSigninMutation: jest.fn(),
}));

jest.mock('../../../../components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormField: ({ render }: { render: (props: any) => React.ReactNode }) =>
    render({ field: { value: '', onChange: jest.fn() } }),
  FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
  FormMessage: () => null,
}));

jest.mock('../../../../components/ui/input', () => ({
  Input: (props: any) => <input type="text" {...props} />,
}));

jest.mock('../../../../components/ui/button', () => ({
  Button: ({ children, disabled, onClick, loading }: any) => (
    <button disabled={disabled || loading} onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock('../../../../components/core/u-password-input', () => ({
  UPasswordInput: (props: any) => <input type="password" {...props} />,
}));

describe('SigninForm', () => {
  const mockNavigate = jest.fn();
  const mockLogin = jest.fn();
  const mockMutateAsync = jest.fn();

  const mockAuthResponse = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ login: mockLogin });
    (useSigninMutation as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mockMutateAsync,
      isError: false,
      errorDetails: { title: '', message: '' },
    });
  });

  it('renders the signin form with all elements', () => {
    render(<SigninForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    mockMutateAsync.mockResolvedValueOnce(mockAuthResponse);

    render(<SigninForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
      });
      expect(mockLogin).toHaveBeenCalledWith(
        mockAuthResponse.access_token,
        mockAuthResponse.refresh_token
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays error alert when signin fails', async () => {
    const errorDetails = {
      title: 'Error',
      message: 'Invalid credentials',
    };

    (useSigninMutation as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mockMutateAsync,
      isError: true,
      errorDetails,
    });

    render(<SigninForm />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      `${errorDetails.title}: ${errorDetails.message}`
    );
  });

  it('disables submit button while request is pending', () => {
    (useSigninMutation as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mockMutateAsync,
      isError: false,
      errorDetails: { title: '', message: '' },
    });

    render(<SigninForm />);

    const submitButton = screen.getByRole('button', { name: /log in/i });
    expect(submitButton).toBeDisabled();
  });

  it('validates required fields', async () => {
    render(<SigninForm />);

    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });

  it('navigates to forgot password page when link is clicked', () => {
    render(<SigninForm />);

    const forgotPasswordLink = screen.getByRole('link', { name: /forgot password/i });
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
  });
});
