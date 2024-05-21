/**
 * Test Scenarios
 *
 * - authUserReducer
 *   - should return the authUser with the new authUser when given by SET_AUTH_USER action
 *   - should return null when given by UNSET_AUTH_USER action
 *
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducer', () => {
  it('should return the authUser with the new authUser when given by SET_AUTH_USER action', () => {
    const authUser = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'users-1',
          name: 'user1',
          email: 'user1@gmail.com',
        },
      },
    };
    // action
    const nextState = authUserReducer(authUser, action);
    // assert
    expect(nextState).toEqual({
      id: 'users-1',
      name: 'user1',
      email: 'user1@gmail.com',
    });
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const authUser = {
      id: 'users-1',
      name: 'user1',
      email: 'user1@gmail.com',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
    };
    // action
    const nextState = authUserReducer(authUser, action);
    // assert
    expect(nextState).toEqual(null);
  });
});
