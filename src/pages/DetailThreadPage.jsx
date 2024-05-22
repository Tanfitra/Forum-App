/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailThread from '../components/DetailThread';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncLikeThreadDetail,
  asyncDislikeThreadDetail,
  asyncNeutralLikeThreadDetail,
  asyncLikeComment,
  asyncDislikeComment,
  asyncNeutralLikeComment,
} from '../states/threadDetail/action';

function DetailThreadPage() {
  const { threadDetail = null, authUser = null } = useSelector((states) => states);
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const onLikeThreadHandle = (threadId) => {
    dispatch(asyncLikeThreadDetail(threadId));
  };
  const onDislikeThreadHandle = (threadId) => {
    dispatch(asyncDislikeThreadDetail(threadId));
  };
  const onNeutralThreadHandle = ({ threadId, likeTypeBefore }) => {
    dispatch(asyncNeutralLikeThreadDetail({ threadId, likeTypeBefore }));
  };

  const createCommentHandle = (content) => {
    dispatch(asyncAddComment(threadId, content));
  };
  const onLikeCommentHandle = (commentId) => {
    dispatch(asyncLikeComment({ threadId: threadDetail?.id, commentId }));
  };
  const onDislikeCommentHandle = (commentId) => {
    dispatch(asyncDislikeComment({ threadId: threadDetail?.id, commentId }));
  };
  const onNeutralCommentHandle = ({ commentId, likeTypeBefore }) => {
    dispatch(asyncNeutralLikeComment({ threadId: threadDetail?.id, commentId, likeTypeBefore }));
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch]);

  if (!threadDetail) return null;
  return (
    <div>
      <DetailThread
        authUserId={authUser?.id || ''}
        threadId={threadDetail.id}
        title={threadDetail.title}
        body={threadDetail.body}
        category={threadDetail.category}
        createdAt={threadDetail.createdAt}
        owner={threadDetail.owner}
        upVotesBy={threadDetail.upVotesBy}
        downVotesBy={threadDetail.downVotesBy}
        comments={threadDetail.comments}
        onLikeThread={onLikeThreadHandle}
        onDislikeThread={onDislikeThreadHandle}
        onNeutralThread={onNeutralThreadHandle}
        createComment={createCommentHandle}
        onLikeComment={onLikeCommentHandle}
        onDislikeComment={onDislikeCommentHandle}
        onNeutralComment={onNeutralCommentHandle}
      />
    </div>
  );
}

export default DetailThreadPage;
