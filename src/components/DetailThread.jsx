/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from 'react-icons/fa6';
import {
  asyncLikeThreadDetail,
  asyncDislikeThreadDetail,
  asyncNeutralLikeThreadDetail,
  asyncReceiveThreadDetail,
  asyncAddComment,
} from '../states/threadDetail/action';
import { formatDate, parseHTML } from '../utils/formatter';
import Comment from './Comment';
import CommentForm from './CommentForm';

function DetailThread({ likes = [], dislikes = [] }) {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const comments = threadDetail ? threadDetail.comments : [];
  const [dataLoaded, setDataLoaded] = useState(false);

  const hasUpVote = likes.includes(authUser);
  const hasDownVote = dislikes.includes(authUser);
  const onCommentSubmit = (content) => {
    dispatch(asyncAddComment(threadId, content));
  };
  const likeHandle = () => {
    if (hasUpVote) {
      dispatch(asyncNeutralLikeThreadDetail());
    } else {
      dispatch(asyncLikeThreadDetail());
    }
  };

  const dislikeHandle = () => {
    if (hasDownVote) {
      dispatch(asyncNeutralLikeThreadDetail());
    } else {
      dispatch(asyncDislikeThreadDetail());
    }
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  useEffect(() => {
    if (threadDetail && threadDetail.owner.avatar) {
      setDataLoaded(true);
    }
  }, [threadDetail]);

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="flex justify-center h-full items-center content-center bg-[#f4f4f5] text-[#3f3f46]">
      <div className="flex flex-col w-8/12 h-full gap-4 p-8 pt-24 pb-32 text-justify bg-white shadow-lg border-b-1 border-b-gray-200">
        <div className="border border-primary rounded w-[12%] text-center text-sm py-0.5">
          <p>{threadDetail.category}</p>
        </div>
        <h1 className="text-2xl font-bold">{threadDetail.title}</h1>
        <p className="text-md">{parseHTML(threadDetail.body)}</p>
        <div className="flex flex-row items-center gap-4 text-sm">
          <button className="flex items-center gap-2" onClick={likeHandle} type="button">
            <span>{hasUpVote ? <FaThumbsUp /> : <FaRegThumbsUp />}</span>
            <span>{threadDetail.upVotesBy.length || 0}</span>
          </button>
          <button className="flex items-center gap-2" onClick={dislikeHandle} type="button">
            <span>
              {hasDownVote ? <FaThumbsDown /> : <FaRegThumbsDown />}
            </span>
            <span>{threadDetail.downVotesBy.length || 0}</span>
          </button>
          <p>{formatDate(threadDetail.createdAt)}</p>
          <div className="flex items-center gap-2">
            {dataLoaded
              && (
              <img
                src={threadDetail.owner.avatar}
                alt={threadDetail.owner.name}
                className="w-5 rounded-full"
              />
              )}
            <p>
              Dibuat oleh&nbsp;
              {threadDetail.owner.name}
            </p>
          </div>
        </div>
        <h1 className="font-semibold">Beri Komentar</h1>
        {authUser ? (
          <CommentForm createComment={onCommentSubmit} />
        ) : (
          <div className="inline-flex space-x-1">
            <Link to="/login" className="text-blue-700 cursor-pointer">
              Login
            </Link>
            <p>untuk memberi komentar</p>
          </div>
        )}
        <div>
          <h1 className="font-semibold">
            Komentar&nbsp;
            (
            {comments.length}
            )
          </h1>
          {comments.map((data, index) => (
            <Comment
              key={index}
              name={data.owner.name}
              comment={parseHTML(data.content)}
              avatar={data.owner.avatar}
              createdAt={data.createdAt}
              totalLike={data.upVotesBy.length}
              totalDislike={data.downVotesBy.length}
              likes={data.likes}
              dislikes={data.dislikes}
              threadId={threadId}
              commentId={data.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailThread;
