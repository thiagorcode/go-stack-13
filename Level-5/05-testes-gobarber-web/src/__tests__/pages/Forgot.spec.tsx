import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import ForgotPassword from '../../pages/ForgotPassword';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

// mock utilizado para criar uma função e retornar seu valor para utilização no teste.
// Devemos testar apenas a página que estamos
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

describe('Forgot Password Page', () => {
  // Faz com execute uma função antes de executar o teste.
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to forgot', async () => {
    const apiResponse = {
      type: 'success',
    };
    apiMock.onPost('/password/forgot').reply(200, apiResponse);
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if forgot fails', async () => {
    const apiResponse = {};
    apiMock.onPost('/password/forgot').reply(404, apiResponse);
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

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
