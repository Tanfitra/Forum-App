/* eslint-disable no-console */
const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function registerUser(name, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const result = await response.json();

    const { status, message } = result;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = result;

    return user;
  }

  async function loginUser(email, password) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.status !== 'success') {
        return { error: 'Failed to log in' };
      }
      const { token } = result.data;
      return { token };
    } catch (error) {
      console.log(error);
      return { error: 'Failed to log in' };
    }
  }

  async function getAllUser() {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      const result = await response.json();

      if (result.status !== 'success') {
        return { error: 'Failed to get all user.' };
      }
      return result.data.users;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to get all user.' };
    }
  }

  async function getUserLoggedIn() {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/me`);

      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to get user loggedin.' };
      }
      console.log('User logged in:', result.data.user);
      return result.data.user;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to get user loggedin.' };
    }
  }

  async function createThread({ title, body, category }) {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/threads`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          category,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.status !== 'success') {
        throw new Error('Failed to create thread.');
      }
      return result.data.thread;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create thread.');
    }
  }

  async function getAllThread() {
    try {
      const response = await fetch(`${BASE_URL}/threads`);
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to get all thread.' };
      }
      return result.data.threads;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to get all thread.' };
    }
  }

  async function getDetailThread(threadId) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}`);
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to get detail thread.' };
      }
      return result.data.detailThread;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to get detail thread.' };
    }
  }

  async function createComment(threadId, content) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
          }),
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to create comment' };
      }
      return result.data.comment;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to create comment' };
    }
  }

  async function likeThread(threadId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/up-vote`,
        {
          method: 'POST',
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to like thread' };
      }
      return result.data.vote;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to like thread' };
    }
  }

  async function dislikeThread(threadId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/down-vote`,
        {
          method: 'POST',
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to dislike thread' };
      }
      return result.data.vote;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to dislike thread' };
    }
  }

  async function neutralLikeThread(threadId) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/neutral-vote`,
        {
          method: 'POST',
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return false;
      }
      return result.data.vote;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function likeComment({ threadId, commentId }) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return false;
      }
      console.log(result.data.vote);
      return result.data.vote;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function dislikeComment({ threadId, commentId }) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {
          method: 'POST',
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to dislike comment' };
      }
      return result.data.vote;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to dislike comment' };
    }
  }

  async function neutralLikeComment({ threadId, commentId }) {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {
          method: 'POST',
        },
      );
      const result = await response.json();
      if (result.status !== 'success') {
        return false;
      }
      return result.data.vote;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function getLeaderboards() {
    try {
      const response = await fetch(`${BASE_URL}/leaderboards`);
      const result = await response.json();
      if (result.status !== 'success') {
        return { error: 'Failed to get leaderboards' };
      }
      return result.data.leaderboards;
    } catch (error) {
      console.log(error);
      return { error: 'Failed to get leaderboards' };
    }
  }
  return {
    putAccessToken,
    getAccessToken,
    registerUser,
    loginUser,
    getAllUser,
    getUserLoggedIn,
    createThread,
    getAllThread,
    getDetailThread,
    createComment,
    likeThread,
    dislikeThread,
    neutralLikeThread,
    likeComment,
    dislikeComment,
    neutralLikeComment,
    getLeaderboards,
  };
})();

export default api;
