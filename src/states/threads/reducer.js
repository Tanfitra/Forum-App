import { ActionType } from './action';

const initialState = [];

function threadsReducer(threads = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [...threads, action.payload.thread];
    case ActionType.LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            likes: thread.likes
              ? [...thread.likes, action.payload.userId]
              : [action.payload.userId],
          };
        }
        return thread;
      });
    case ActionType.DISLIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            dislikes: thread.dislikes
              ? [...thread.dislikes, action.payload.userId]
              : [action.payload.userId],
          };
        }
        return thread;
      });
    case ActionType.NEUTRAL_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            likes: thread.likes
              ? thread.likes.filter(
                (userId) => userId !== action.payload.userId,
              )
              : [],
            dislikes: thread.dislikes
              ? thread.dislikes.filter(
                (userId) => userId !== action.payload.userId,
              )
              : [],
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
