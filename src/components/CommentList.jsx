import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({
  comments, onLikeComment, onDislikeComment, onNeutralComment,
}) {
  return (
    <div className="">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLikeComment={onLikeComment}
          onDislikeComment={onDislikeComment}
          onNeutralComment={onNeutralComment}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  onLikeComment: PropTypes.func.isRequired,
  onDislikeComment: PropTypes.func.isRequired,
  onNeutralComment: PropTypes.func.isRequired,
};

export default CommentList;
