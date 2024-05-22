import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa6';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/formatter';

function CommentItem({
  comment,
  onLikeComment,
  onDislikeComment,
  onNeutralComment,
}) {
  const { authUser = null } = useSelector((states) => states);

  const hasLikeComment = comment.upVotesBy.includes(authUser?.id);
  const hasDislikeComment = comment.downVotesBy.includes(authUser?.id);

  const onLikeCommentHandle = () => {
    if (!authUser?.id) {
      alert('You must login to like this comment');
      return;
    }
    onLikeComment(comment.id);
  };

  const onDislikeCommentHandle = () => {
    if (!authUser?.id) {
      alert('You must login to dislike this comment');
      return;
    }
    onDislikeComment(comment.id);
  };

  const onNeutralCommentHandle = ({ likeTypeBefore }) => {
    if (!authUser?.id) {
      alert('You must login to neutral like this comment');
      return;
    }
    onNeutralComment({ commentId: comment.id, likeTypeBefore });
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-tertiary rounded-lg my-2"
      key={comment.id}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className="w-8 rounded-full"
          />
          <h1 className="text-base font-semibold">{comment.owner.name}</h1>
        </div>
        <div>{formatDate(comment.createdAt)}</div>
      </div>
      <div>{parse(comment.content)}</div>
      <div className="flex flex-row items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          {hasLikeComment ? (
            <div className="flex items-center gap-2">
              <FaThumbsUp
                className="cursor-pointer"
                size="20"
                onClick={() => onNeutralCommentHandle({
                  commentId: comment.id,
                  voteTypeBefore: 1,
                })}
              />
              <span>
                {comment.upVotesBy.length}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaRegThumbsUp
                className="cursor-pointer"
                size="20"
                onClick={() => onLikeCommentHandle()}
              />
              <span>
                {comment.upVotesBy.length}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasDislikeComment ? (
            <div className="flex items-center gap-2">
              <FaThumbsDown
                className="cursor-pointer"
                size="20"
                onClick={() => onNeutralCommentHandle({
                  voteTypeBefore: -1,
                })}
              />
              <span>
                {comment.downVotesBy.length}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaRegThumbsDown
                className="cursor-pointer"
                size="20"
                onClick={() => onDislikeCommentHandle()}
              />
              <span>
                {comment.downVotesBy.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
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
  }).isRequired,
  onLikeComment: PropTypes.func.isRequired,
  onDislikeComment: PropTypes.func.isRequired,
  onNeutralComment: PropTypes.func.isRequired,
};

export default CommentItem;
