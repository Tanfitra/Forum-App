/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, parseHTML } from '../utils/formatter';
import {
  asyncDislikeComment,
  asyncLikeComment,
  asyncNeutralLikeComment,
} from '../states/threadDetail/action';

function Comment({
  name,
  comment,
  avatar,
  createdAt,
  totalLike,
  totalDislike,
  likes,
  dislikes,
  threadId,
  commentId,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states);

  const hasUpVote = likes ? likes.includes(authUser) : false;
  const hasDownVote = dislikes ? dislikes.includes(authUser) : false;

  const likeHandle = () => {
    if (hasUpVote) {
      dispatch(asyncNeutralLikeComment(threadId, commentId));
    } else {
      dispatch(asyncLikeComment(threadId, commentId));
    }
  };

  const dislikeHandle = () => {
    if (hasDownVote) {
      dispatch(asyncNeutralLikeComment(threadId, commentId));
    } else {
      dispatch(asyncDislikeComment(threadId, commentId));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-b-2 border-b-gray-200">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img src={avatar} alt={name} className="w-5 rounded-full" />
          <h1>{name}</h1>
        </div>
        <p>{formatDate(createdAt)}</p>
      </div>
      <p>{parseHTML(comment)}</p>
      <div className="flex flex-row items-center gap-4 text-sm">
        <button className="flex items-center gap-2" onClick={likeHandle} type="button">
          <span>
            <LuThumbsUp />
          </span>
          <span>{totalLike}</span>
        </button>
        <button className="flex items-center gap-2" onClick={dislikeHandle} type="button">
          <span>
            <LuThumbsDown />
          </span>
          <span>{totalDislike}</span>
        </button>
      </div>
    </div>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalLike: PropTypes.number.isRequired,
  totalDislike: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default Comment;
