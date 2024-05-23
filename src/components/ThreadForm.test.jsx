/**
 * Test Scenario
 *
 * - ThreadForm Component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 *   - should call createThread function when login button clicked
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
import ThreadForm from './ThreadForm';

expect.extend(matchers);

describe('ThreadForm Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    render(
      <Router>
        <ThreadForm registerUser={() => {}} />
      </Router>,
    );
    const titleInput = await screen.getByPlaceholderText('Enter title here...');

    await userEvent.type(titleInput, 'Hello World');

    expect(titleInput).toHaveValue('Hello World');
  });

  it('should handle body typing correctly', async () => {
    render(
      <Router>
        <ThreadForm registerUser={() => {}} />
      </Router>,
    );
    const bodyInput = await screen.getByPlaceholderText('Enter body here...');

    await userEvent.type(bodyInput, 'Hello, this is a body');

    expect(bodyInput).toHaveValue('Hello, this is a body');
  });

  it('should handle category typing correctly', async () => {
    render(
      <Router>
        <ThreadForm registerUser={() => {}} />
      </Router>,
    );
    const categoryInput = await screen.getByPlaceholderText('Enter category here...');

    await userEvent.type(categoryInput, 'Hello, this is a category');

    expect(categoryInput).toHaveValue('Hello, this is a category');
  });

  it('should call createThread function when login button clicked', async () => {
    const mockAddThread = vi.fn();
    render(
      <Router>
        <ThreadForm createThread={mockAddThread} />
      </Router>,
    );
    const titleInput = await screen.getByPlaceholderText('Enter title here...');
    const bodyInput = await screen.getByPlaceholderText('Enter body here...');
    const categoryInput = await screen.getByPlaceholderText('Enter category here...');

    const button = await screen.getByRole('button', { name: 'Create' });

    await userEvent.type(titleInput, 'Hello World');
    await userEvent.type(bodyInput, 'Hello, this is a body');
    await userEvent.type(categoryInput, 'Hello, this is a category');
    await userEvent.click(button);

    expect(mockAddThread).toBeCalledWith({
      title: 'Hello World',
      category: 'Hello, this is a category',
      body: 'Hello, this is a body',
    });
  });
});
