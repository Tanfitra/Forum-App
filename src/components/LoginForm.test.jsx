/**
 * Test Scenario
 *
 * - LoginForm Component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call loginUser function when login button clicked
 *
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';

expect.extend(matchers);

describe('LoginForm Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(
      <Router>
        <LoginForm loginUser={() => {}} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'johndoe@gmail.com');

    expect(emailInput).toHaveValue('johndoe@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <Router>
        <LoginForm loginUser={() => {}} />
      </Router>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call loginUser function when login button clicked', async () => {
    const mockLogin = vi.fn();
    render(
      <Router>
        <LoginForm loginUser={mockLogin} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith('johndoe@gmail.com', 'password123');
  });
});
