import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa6';
import parse from 'html-react-parser';
import { formatDate } from '../utils/formatter';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

function DetailThread({
  threadId,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUserId,
  onLikeThread,
  onDislikeThread,
  onNeutralThread,
  createComment,
  onLikeComment,
  onDislikeComment,
  onNeutralComment,
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
    <div className="flex justify-center h-full items-center content-center bg-secondary text-white">
      <div className="flex flex-col w-8/12 rounded-lg gap-4 p-8 mt-24 mb-12 text-justify bg-primary shadow-lg ">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={owner.avatar}
              alt={owner.name}
              className="w-8 rounded-full"
            />
            <div>
              {owner.name}
            </div>
          </div>

          <div className="border border-white rounded-lg w-[15%] text-center text-sm py-1">
            <div>
              #
              {category}
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-md">{parse(body)}</p>
        <div className="flex flex-row items-center gap-4 w-fit px-4 py-1.5 rounded-lg text-base bg-tertiary">
          <div>
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
          </div>
          <div>
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
          </div>
          <div>{formatDate(createdAt)}</div>
        </div>
        <CommentForm authUserId={authUserId} createComment={createComment} />
        <CommentList
          comments={comments}
          onLikeComment={onLikeComment}
          onDislikeComment={onDislikeComment}
          onNeutralComment={onNeutralComment}
        />
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

DetailThread.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape(ownerShape).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  authUserId: PropTypes.string.isRequired,
  onLikeThread: PropTypes.func.isRequired,
  onDislikeThread: PropTypes.func.isRequired,
  onNeutralThread: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  onLikeComment: PropTypes.func.isRequired,
  onDislikeComment: PropTypes.func.isRequired,
  onNeutralComment: PropTypes.func.isRequired,
};

export default DetailThread;
