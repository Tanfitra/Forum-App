/**
 * Test Scenarios
 *
 * - asyncPopulateUserAndThreads Thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and show alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'user1',
    email: 'user1@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'user-2',
    name: 'user2',
    email: 'user2@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'user-3',
    name: 'user3',
    email: 'user3@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUserAndThreads Thunk', () => {
  beforeEach(() => {
    api._getAllUser = api.getAllUser;
    api._getAllThread = api.getAllThread;
  });

  afterEach(() => {
    api.getAllUser = api._getAllUser;
    api.getAllThread = api._getAllThread;

    delete api._getAllUser;
    delete api._getAllThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUser = () => Promise.resolve(fakeUsersResponse);
    api.getAllThread = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();
    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and show alert correctly when data fetching failed', async () => {
    api.getAllUser = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
