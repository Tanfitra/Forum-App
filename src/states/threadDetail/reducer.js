import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [
          action.payload.comment,
          ...threadDetail.comments,
        ],
      };
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.LIKE_THREAD:
      if (threadDetail.id !== action.payload.threadId) return threadDetail;
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.DISLIKE_THREAD:
      if (threadDetail.id !== action.payload.threadId) return threadDetail;
      return {
        ...threadDetail,
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.NEUTRAL_LIKE_THREAD:
      if (threadDetail.id !== action.payload.threadId) return threadDetail;
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.LIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return {
            ...comment,
            upVotesBy: [...comment.upVotesBy, action.payload.userId],
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }),
      };
    case ActionType.DISLIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return {
            ...comment,
            downVotesBy: [...comment.downVotesBy, action.payload.userId],
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }),
      };
    case ActionType.NEUTRAL_LIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
