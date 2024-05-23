/**
 * Test Scenario
 *
 * - CommentForm Component
 *   - should show text "login untuk memberi komentar" when user not login
 *   - should show textarea input and create button when user is already logged in
 *   - textarea should typing correctly
 *   - should call createComment function when create button clicked when user is already logged in
 *  -
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter as Router } from 'react-router-dom';
import CommentForm from './CommentForm';

expect.extend(matchers);

describe('CommentForm Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show text "Login untuk memberi komentar" when user not login', () => {
    render(
      <Router>
        <CommentForm authUserId="" createComment={() => {}} />
      </Router>,
    );
    const message = screen.getByText('Login untuk memberi komentar');
    expect(message).toBeVisible();
    expect(message.textContent).toBe('Login untuk memberi komentar');
  });

  it('should show textarea input and create button when user is already logged in', () => {
    render(
      <Router>
        <CommentForm authUserId="user-1" createComment={() => {}} />
      </Router>,
    );
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    expect(textarea).toBeVisible();
    expect(button).toBeVisible();
  });

  it('textarea should typing correctly', async () => {
    render(
      <Router>
        <CommentForm authUserId="user-1" createComment={() => {}} />
      </Router>,
    );
    const commentFormArea = await screen.getByPlaceholderText('Write your comment here...');
    await userEvent.type(commentFormArea, 'Hello, this is a comment');
    expect(commentFormArea).toHaveValue('Hello, this is a comment');
  });

  it('should call createComment function when create button clicked when user is already logged in', async () => {
    const mockAddComment = vi.fn();
    render(
      <Router>
        <CommentForm authUserId="user-1" createComment={mockAddComment} />
      </Router>,
    );

    const commentFormArea = await screen.getByPlaceholderText('Write your comment here...');
    const addButton = screen.getByRole('button', { name: 'Add Comment' });
    await userEvent.type(commentFormArea, 'Hello, this is a comment');
    await userEvent.click(addButton);

    expect(mockAddComment).toBeCalledWith('Hello, this is a comment');
  });
});
