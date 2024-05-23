/* eslint-disable react/function-component-definition */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
import store from '../states/index';

const stories = {
  title: 'ThreadItem',
  component: ThreadItem,
};

export default stories;

const TemplateStory = (args) => (
  <Provider store={store}>
    <Router>
      <ThreadItem {...args} />
    </Router>
  </Provider>
);

const testThreadItem = TemplateStory.bind({});

testThreadItem.args = {
  threadId: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: new Date().toISOString(),
  upVotesBy: ['users-1'],
  downVotesBy: [],
  totalComments: 0,
  owner: {
    id: 'users-2',
    name: 'users2',
    email: 'users2@gmail.com',
    avatar: '',
  },
  authUserId: 'users-1',
};

export { testThreadItem };
