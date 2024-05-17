/* eslint-disable no-alert */
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  LIKE_THREAD: 'LIKE_THREAD',
  DISLIKE_THREAD: 'DISLIKE_THREAD',
  NEUTRAL_LIKE_THREAD: 'NEUTRAL_LIKE_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  LIKE_COMMENT: 'LIKE_COMMENT',
  DISLIKE_COMMENT: 'DISLIKE_COMMENT',
  NEUTRAL_LIKE_COMMENT: 'NEUTRAL_LIKE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function likeThreadActionCreator(userId) {
  return {
    type: ActionType.LIKE_THREAD,
    payload: {
      userId,
    },
  };
}

function dislikeThreadActionCreator(userId) {
  return {
    type: ActionType.DISLIKE_THREAD,
    payload: {
      userId,
    },
  };
}

function neutralLikeThreadActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_LIKE_THREAD,
    payload: {
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function likeCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.LIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function dislikeCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DISLIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralLikeCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_LIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncLikeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(likeThreadActionCreator(authUser.id));

    try {
      await api.likeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDislikeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(dislikeThreadActionCreator(authUser.id));

    try {
      await api.dislikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralLikeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralLikeThreadActionCreator(authUser.id));

    try {
      await api.neutralLikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncLikeComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const vote = await api.likeComment(threadId, commentId);
      dispatch(likeCommentActionCreator(vote));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDislikeComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const vote = await api.dislikeComment(threadId, commentId);
      dispatch(dislikeCommentActionCreator(vote));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralLikeComment({ threadId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const vote = await api.neutralLikeComment({ threadId, commentId });
      dispatch(neutralLikeCommentActionCreator(vote));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  likeThreadActionCreator,
  dislikeThreadActionCreator,
  neutralLikeThreadActionCreator,
  addCommentActionCreator,
  likeCommentActionCreator,
  dislikeCommentActionCreator,
  neutralLikeCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncLikeThreadDetail,
  asyncDislikeThreadDetail,
  asyncNeutralLikeThreadDetail,
  asyncAddComment,
  asyncLikeComment,
  asyncDislikeComment,
  asyncNeutralLikeComment,
};
