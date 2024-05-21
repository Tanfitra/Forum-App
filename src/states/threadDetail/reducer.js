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
      return {
        ...threadDetail,
        likes: threadDetail && threadDetail.likes
          ? [...threadDetail.likes, action.payload.userId]
          : [action.payload.userId],
      };
    case ActionType.DISLIKE_THREAD:
      return {
        ...threadDetail,
        dislikes: threadDetail && threadDetail.dislikes
          ? [...threadDetail.dislikes, action.payload.userId]
          : [action.payload.userId],
      };
    case ActionType.NEUTRAL_LIKE_THREAD:
      return {
        ...threadDetail,
        likes: threadDetail && threadDetail.likes
          ? threadDetail.likes.filter((userId) => userId !== action.payload.userId)
          : [],
        dislikes: threadDetail && threadDetail.dislikes
          ? threadDetail.dislikes.filter((userId) => userId !== action.payload.userId)
          : [],
      };
    case ActionType.LIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              likes: [action.payload.userId],
            };
          }
          return comment;
        }),
      };
    case ActionType.DISLIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              dislikes: [action.payload.userId],
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRAL_LIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            likes: comment.likes?.filter((userId) => userId !== action.payload.userId),
            dislikes: comment.dislikes?.filter((userId) => userId !== action.payload.userId),
          }
          : comment)),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
