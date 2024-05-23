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

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function likeCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.LIKE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function dislikeCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.DISLIKE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function neutralLikeCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_LIKE_COMMENT,
    payload: {
      threadId,
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

function asyncLikeThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(showLoading());
    dispatch(likeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.likeThread(threadId);
    } catch (error) {
      alert(error.message);
      if (threadDetail.downVotesBy.includes(authUser.id)) {
        dispatch(
          dislikeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      } else {
        dispatch(
          neutralLikeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncDislikeThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(showLoading());
    dispatch(dislikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.dislikeThread(threadId);
    } catch (error) {
      alert(error.message);
      if (threadDetail.downVotesBy.includes(authUser.id)) {
        dispatch(
          likeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      } else {
        dispatch(
          neutralLikeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralLikeThreadDetail({ threadId, likeTypeBefore }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    dispatch(neutralLikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralLikeThread(threadId);
    } catch (error) {
      alert(error.message);
      if (likeTypeBefore === 1) {
        dispatch(
          likeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }

      if (likeTypeBefore === -1) {
        dispatch(
          dislikeThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
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

function asyncLikeComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(showLoading());
    dispatch(likeCommentActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.likeComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      const { downVotesBy } = threadDetail.comments.filter(
        (comment) => comment.id === commentId,
      )[0];
      if (downVotesBy.includes(authUser.id)) {
        dispatch(
          dislikeCommentActionCreator({ threadId, commentId, userId: authUser.id }),
        );
      } else {
        dispatch(
          neutralLikeCommentActionCreator({ threadId, commentId, userId: authUser.id }),
        );
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDislikeComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(showLoading());
    dispatch(dislikeCommentActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.dislikeComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      const { upVotesBy } = threadDetail.comments.filter(
        (comment) => comment.id === commentId,
      )[0];
      if (upVotesBy.includes(authUser.id)) {
        dispatch(
          likeCommentActionCreator({ threadId, commentId, userId: authUser.id }),
        );
      } else {
        dispatch(
          neutralLikeCommentActionCreator({ threadId, commentId, userId: authUser.id }),
        );
      }
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralLikeComment({ threadId, commentId, likeTypeBefore }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    dispatch(neutralLikeCommentActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.neutralLikeComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      if (likeTypeBefore === 1) {
        dispatch(
          likeCommentActionCreator({ threadId, commentId, userId: authUser.id }),
        );
      }

      if (likeTypeBefore === -1) {
        dispatch(
          dislikeCommentActionCreator({ threadId, commentId, userId: authUser.id }),
        );
      }
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
