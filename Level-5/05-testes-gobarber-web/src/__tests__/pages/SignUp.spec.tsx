import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import SignUp from '../../pages/SignUp';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();

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

describe('SingUp Page', () => {
  // Faz com execute uma função antes de executar o teste.
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    const apiResponse = {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
    };

    apiMock.onPost('users').reply(200, apiResponse);
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
    const apiResponse = {

    };

    apiMock.onPost('users').reply(404, apiResponse);
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
