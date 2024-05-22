/**
 * Test Scenarios
 *
 * - asyncSetAuthUser Thunk
 *   - should dispatch action correctly when login success
 *   - should dispatch action and show alert correctly when login failed
 * - asyncUnsetAuthUser Thunk
 *   - should dispatch action correctly when unset authUser
 *
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator,
} from './action';

const fakeUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

const fakeLoginResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItSUF6Z3YyeXpIM3dES3RUcSIsImlhdCI6MTcxNjM5MzgyOH0.kVp0BFaD-_h3pufkZ-_vK48xP_apQTAUyf2i-46QhEo',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._loginUser = api.loginUser;
    api._getUserLoggedIn = api.getUserLoggedIn;
  });

  afterEach(() => {
    api.loginUser = api._loginUser;
    api.getUserLoggedIn = api._getUserLoggedIn;
    delete api._loginUser;
    delete api._getUserLoggedIn;
  });

  it('should dispatch action correctly when asyncSetAuthUser succes', async () => {
    api.loginUser = () => Promise.resolve(fakeLoginResponse);
    api.getUserLoggedIn = () => Promise.resolve(fakeUser);

    const dispatch = vi.fn();
    api.putAccessToken = vi.fn();

    await asyncSetAuthUser({
      email: fakeUser.email,
      password: fakeUser.password,
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse.token);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when asyncSetAuthUser failed', async () => {
    api.loginUser = async () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncSetAuthUser({
      email: fakeUser.email,
      password: fakeUser.password,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('should dispatch action correctly when asyncUnsetAuthUser success', async () => {
    const dispatch = vi.fn();
    api.putAccessToken = vi.fn();

    await asyncUnsetAuthUser()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
