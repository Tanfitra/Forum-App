/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown,
} from 'react-icons/fa6';
import { FaRegCommentDots } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, parseHTML, truncateString } from '../utils/formatter';
import { asyncLikeThread, asyncDislikeThread, asyncNeutralLikeThread } from '../states/threads/action';

function Thread({
  title,
  body,
  category,
  createdAt,
  totalComments,
  totalLike,
  totalDislike,
  ownerId,
  threadId,
  likes,
  dislikes,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const users = useSelector((state) => state.users);
  const filterUser = users.find((user) => user.id === ownerId);

  const [likeCount, setLikeCount] = useState(totalLike);
  const [dislikeCount, setDislikeCount] = useState(totalDislike);
  const [hasUpVote, setHasUpVote] = useState(likes ? likes.includes(authUser) : false);
  const [hasDownVote, setHasDownVote] = useState(dislikes ? dislikes.includes(authUser) : false);

  const likeHandle = () => {
    if (hasUpVote) {
      dispatch(asyncNeutralLikeThread(threadId));
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      dispatch(asyncLikeThread(threadId));
      setLikeCount((prevCount) => prevCount + 1);
    }
    setHasUpVote(!hasUpVote);
    if (hasDownVote) {
      setDislikeCount((prevCount) => prevCount - 1);
      setHasDownVote(false);
    }
  };

  const dislikeHandle = () => {
    if (hasDownVote) {
      dispatch(asyncNeutralLikeThread(threadId));
      setDislikeCount((prevCount) => prevCount - 1);
    } else {
      dispatch(asyncDislikeThread(threadId));
      setDislikeCount((prevCount) => prevCount + 1);
    }
    setHasDownVote(!hasDownVote);
    if (hasUpVote) {
      setLikeCount((prevCount) => prevCount - 1);
      setHasUpVote(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 px-8 bg-white text-[#3f3f46]">
      <div className="border border-primary rounded w-[12%] text-center text-sm py-0.5">
        <p>{category}</p>
      </div>
      <h1 className="text-xl font-bold">
        <Link to={`/threads/${threadId}`}>{title}</Link>
      </h1>
      <p className="text-justify text-md">
        <Link to={`/threads/${threadId}`}>{parseHTML(truncateString(body, 250))}</Link>
      </p>
      <div className="flex flex-row items-center gap-4 text-sm">
        <button className="flex items-center gap-2" onClick={likeHandle} type="button">
          <span>{hasUpVote ? <FaThumbsUp /> : <FaRegThumbsUp />}</span>
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-2" onClick={dislikeHandle} type="button">
          <span>{hasDownVote ? <FaThumbsDown /> : <FaRegThumbsDown />}</span>
          <span>{dislikeCount}</span>
        </button>
        <button className="flex items-center gap-2" type="button">
          <span><FaRegCommentDots /></span>
          <span>{totalComments}</span>
        </button>
        <p>{formatDate(createdAt)}</p>
        <p>
          Dibuat oleh
          {filterUser?.name}
        </p>
      </div>
      <span className="w-full h-[1px] bg-primary" />
    </div>
  );
}

Thread.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  totalLike: PropTypes.number.isRequired,
  totalDislike: PropTypes.number.isRequired,
  ownerId: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default Thread;
