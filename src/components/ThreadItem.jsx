import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaRegCommentDots } from 'react-icons/fa';
import parse from 'html-react-parser';
import { formatDate } from '../utils/formatter';

function ThreadItem({
  threadId,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUserId,
  onLikeThread,
  onDislikeThread,
  onNeutralThread,
}) {
  const hasLikeThread = upVotesBy.includes(authUserId);
  const hasDislikeThread = downVotesBy.includes(authUserId);

  const onLikeThreadHandle = () => {
    if (!authUserId) {
      alert('You must login to like this thread');
      return;
    }
    onLikeThread(threadId);
  };

  const onDislikeThreadHandle = () => {
    if (!authUserId) {
      alert('You must login to dislike this thread');
      return;
    }
    onDislikeThread(threadId);
  };

  const onNeutralThreadHandle = ({ likeTypeBefore }) => {
    if (!authUserId) {
      alert('You must login to neutral like this thread');
      return;
    }
    onNeutralThread({ threadId, likeTypeBefore });
  };

  return (
    <div className="flex flex-col gap-4 p-4 px-4 h-full bg-primary rounded-xl text-white">
      <div className="border border-white rounded-lg w-[15%] text-center text-sm py-1">
        <p>
          #
          {category}
        </p>
      </div>
      <h1 className="text-xl font-bold">
        <Link to={`/threads/${threadId}`}>{title}</Link>
      </h1>
      <p className="text-justify text-md line-clamp-5">
        <Link to={`/threads/${threadId}`}>{parse(body)}</Link>
      </p>
      <div className="flex flex-row items-center gap-4 w-full px-4 py-1.5 rounded-lg text-base bg-tertiary">
        {hasLikeThread ? (
          <div className="flex items-center gap-2">
            <FaThumbsUp
              className="cursor-pointer"
              size="20"
              onClick={() => onNeutralThreadHandle({ threadId, voteTypeBefore: 1 })}
            />
            <span>
              {upVotesBy.length}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FaRegThumbsUp
              className="cursor-pointer"
              size="20"
              onClick={() => onLikeThreadHandle(threadId)}
            />
            <span>
              {upVotesBy.length}
            </span>
          </div>
        )}
        {hasDislikeThread ? (
          <div className="flex items-center gap-2">
            <FaThumbsDown
              className="cursor-pointer"
              size="20"
              onClick={() => onNeutralThreadHandle({ threadId, voteTypeBefore: 1 })}
            />
            <span>
              {downVotesBy.length}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FaRegThumbsDown
              className="cursor-pointer"
              size="20"
              onClick={() => onDislikeThreadHandle(threadId)}
            />
            <span>
              {downVotesBy.length}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span><FaRegCommentDots size="20" /></span>
          <span>{totalComments}</span>
        </div>
        <p>{formatDate(createdAt)}</p>
        <p>
          Dibuat oleh&nbsp;
          {owner.name || 'null'}
        </p>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUserId: PropTypes.string.isRequired,
  onLikeThread: PropTypes.func.isRequired,
  onDislikeThread: PropTypes.func.isRequired,
  onNeutralThread: PropTypes.func.isRequired,
};

export default ThreadItem;
