/**
 * Test Scenarios
 *
 * - threadDetailReducer
 *   - should return the comment with the new comment when given by ADD_COMMENT action
 *   - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *   - should return null when clear the thread detail by CLEAR_THREAD_DETAIL action
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

  it('should return null when clear the thread detail by CLEAR_THREAD_DETAIL action', () => {
    const threadDetail = {
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
    };
    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toEqual(null);
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
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toStrictEqual({
      ...threadDetail,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
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
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toStrictEqual({
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
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
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(threadDetail, action);
    // assert
    expect(nextState).toStrictEqual({
      ...threadDetail,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return the thread with the updated comment likes when given LIKE_COMMENT action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'LIKE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    const nextState = threadDetailReducer(threadDetail, action);

    expect(nextState).toStrictEqual({
      ...threadDetail,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-1'],
          downVotesBy: [],
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
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'DISLIKE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };
    const nextState = threadDetailReducer(threadDetail, action);
    expect(nextState).toStrictEqual({
      ...threadDetail,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-1'],
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
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'NEUTRAL_LIKE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(threadDetail, action);

    expect(nextState).toStrictEqual({
      ...threadDetail,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
