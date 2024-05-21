/**
 * Test Scenarios
 *
 * - userReducer
 *   - should return the talks when given by RECEIVE_THREADS action
 */

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';

describe('usersReducer', () => {
  it('should return the users when given by RECEIVE_USERS action', () => {
    const users = [];
    const action = {
      type: 'RECEIVE_USERS',
      payload: {
        users: [
          {
            id: 'users-1',
            name: 'user1',
            email: 'user1@gmail.com',
          },
          {
            id: 'users-2',
            name: 'user2',
            email: 'user2@gmail.com',
          },
        ],
      },
    };
    // action
    const nextState = usersReducer(users, action);
    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
