/**
 * Test Scenarios
 *
 * - threadDetailReducer
 *   - should return the comment with the new comment when given by ADD_COMMENT action
 *   - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *   - should return the thread with the new like when given by LIKE_THREAD action
 *   - should return the thread with the new dislike when given by DISLIKE_THREAD action
 *   - should return the thread with the neutral like when given by NEUTRAL_LIKE_THREAD action
 *   - should return the thread with the new like when given by LIKE_COMMENT action
 *   - should return the thread with the new dislike when given by DISLIKE_COMMENT action
 *   - should return the thread with the neutral like when given by NEUTRAL_LIKE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer', () => {
  it('should return the comment with the new comment when given by ADD_COMMENT action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      comments: [],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T08:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-2',
            name: 'user2',
            email: 'user2@gmail.com',
          },
        },
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState.comments).toEqual([action.payload.comment]);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    const threadDetail = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        thread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
          comments: [],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread with the new like when given by LIKE_THREAD action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'LIKE_THREAD',
      payload: {
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      likes: [action.payload.userId],
    });
  });

  it('should return the thread with the new dislike when given by DISLIKE_THREAD action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'DISLIKE_THREAD',
      payload: {
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      dislikes: [action.payload.userId],
    });
  });

  it('should return the thread with the neutral like when given by NEUTRAL_LIKE_THREAD action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'NEUTRAL_LIKE_THREAD',
      payload: {
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toEqual({
      ...threadDetail,
      likes: [],
      dislikes: [],
    });
  });

  it('should return the thread with the updated comment likes when given LIKE_COMMENT action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T08:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-2',
            name: 'user2',
            email: 'user2@gmail.com',
          },
        },
      ],
    };
    const action = {
      type: 'LIKE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(threadDetail, action);

    expect(nextState).toEqual({
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          likes: [action.payload.userId],
        },
      ],
    });
  });

  it('should return the thread with the updated comment dislikes when given DISLIKE_COMMENT action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T08:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-2',
            name: 'user2',
            email: 'user2@gmail.com',
          },
        },
      ],
    };
    const action = {
      type: 'DISLIKE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };
    const nextState = threadDetailReducer(threadDetail, action);
    expect(nextState).toEqual({
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          dislikes: [action.payload.userId],
        },
      ],
    });
  });
  it('should return the thread with the updated comment likes and dislikes when given NEUTRAL_LIKE_COMMENT action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T08:00:00.000Z',
          upVotesBy: ['users-2'],
          downVotesBy: [],
          owner: {
            id: 'users-2',
            name: 'user2',
            email: 'user2@gmail.com',
          },
        },
      ],
    };
    const action = {
      type: 'NEUTRAL_LIKE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(threadDetail, action);

    expect(nextState).toEqual(threadDetail);
  });
});
