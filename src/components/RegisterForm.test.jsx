/**
 * Test Scenario
 *
 * - RegisterForm Component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call registerUser function when login button clicked
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
import RegisterForm from './RegisterForm';

expect.extend(matchers);

describe('RegisterForm Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(
      <Router>
        <RegisterForm registerUser={() => {}} />
      </Router>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    await userEvent.type(nameInput, 'John Doe');

    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    render(
      <Router>
        <RegisterForm registerUser={() => {}} />
      </Router>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'johndoe@gmail.com');

    expect(emailInput).toHaveValue('johndoe@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <Router>
        <RegisterForm registerUser={() => {}} />
      </Router>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call registerUser function when login button clicked', async () => {
    const mockRegister = vi.fn();
    render(
      <Router>
        <RegisterForm registerUser={mockRegister} />
      </Router>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const button = await screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'johndoe@gmail.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(button);

    expect(mockRegister).toBeCalledWith('John Doe', 'johndoe@gmail.com', 'password123');
  });
});
