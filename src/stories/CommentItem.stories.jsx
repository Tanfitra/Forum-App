/* eslint-disable react/function-component-definition */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../states/index';
import CommentItem from '../components/CommentItem';

const stories = {
  title: 'CommentItem',
  component: CommentItem,
};

export default stories;

const TemplateStory = (args) => (
  <Provider store={store}>
    <Router>
      <CommentItem {...args} />
    </Router>
  </Provider>
);

const testCommentItem = TemplateStory.bind({});

testCommentItem.args = {
  comment: {
    id: 'comment-1',
    content: 'This is a test comment.',
    createdAt: new Date().toISOString(),
    owner: {
      id: 'user-2',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar: 'https://via.placeholder.com/150',
    },
    upVotesBy: ['user-1'],
    downVotesBy: [],
  },
};

export { testCommentItem };
