/**
 * Test Scenarios
 *
 * - asyncPreload Thunk
 *   - should dispatch action correctly when loading authUser succes
 *   - should dispatch action correctly when loading authUser failed
 *
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeUser = {
  id: 'test',
  name: 'test',
  email: 'test@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPreload Thunk', () => {
  beforeEach(() => {
    api._getUserLoggedIn = api.getUserLoggedIn;
  });

  afterEach(() => {
    api.getUserLoggedIn = api._getUserLoggedIn;
  });

  it('should dispatch actions correctly when loading authUser succeeds', async () => {
    api.getUserLoggedIn = () => Promise.resolve(fakeUser);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions correctly when loading authUser fails', async () => {
    api.getUserLoggedIn = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
