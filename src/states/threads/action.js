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

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncLikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    dispatch(showLoading());
    dispatch(likeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.likeThread(threadId);
    } catch (error) {
      alert(error.message);
      const { downVotesBy } = threads.filter(
        (thread) => thread.id === threadId,
      )[0];
      if (downVotesBy.includes(authUser.id)) {
        dispatch(dislikeThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(
          neutralLikeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncDislikeThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    dispatch(showLoading());
    dispatch(dislikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.dislikeThread(threadId);
    } catch (error) {
      alert(error.message);
      const { upVotesBy } = threads.filter(
        (thread) => thread.id === threadId,
      )[0];
      if (upVotesBy.includes(authUser.id)) {
        dispatch(likeThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(
          neutralLikeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralLikeThread({ threadId, likeTypeBefore }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    dispatch(neutralLikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralLikeThread(threadId);
    } catch (error) {
      alert(error.message);
      if (likeTypeBefore === 1) {
        dispatch(likeThreadActionCreator({ threadId, userId: authUser.id }));
      }

      if (likeTypeBefore === -1) {
        dispatch(dislikeThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
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
