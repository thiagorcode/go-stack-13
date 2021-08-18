import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedApiPost = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

jest.mock('../../services/api', () => ({
  post: () => mockedApiPost,
}));

describe('SingUp Page', () => {
  // Faz com execute uma função antes de executar o teste.
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedApiPost.mockClear();
  });

  it('should be able to sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('E-mail');
    const nameField = getByPlaceholderText('Nome');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('E-mail');
    const nameField = getByPlaceholderText('Nome');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if sign up fails', async () => {
    mockedApiPost.mockImplementation(() => {
      console.log('test');

      throw new Error();
    });
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('E-mail');
    const nameField = getByPlaceholderText('Nome');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
