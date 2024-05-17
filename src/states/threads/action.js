/* eslint-disable no-alert */
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  LIKE_THREAD: 'LIKE_THREAD',
  DISLIKE_THREAD: 'DISLIKE_THREAD',
  NEUTRAL_LIKE_THREAD: 'NEUTRAL_LIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function likeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function dislikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DISLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function neutralLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread(title, body, category) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread(title, body, category);
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncLikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(likeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.likeThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(likeThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncDislikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(dislikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.dislikeThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(dislikeThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralLikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralLikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralLikeThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralLikeThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  likeThreadActionCreator,
  dislikeThreadActionCreator,
  neutralLikeThreadActionCreator,
  asyncAddThread,
  asyncLikeThread,
  asyncDislikeThread,
  asyncNeutralLikeThread,
};
