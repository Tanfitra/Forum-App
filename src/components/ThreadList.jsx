import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads, onLikeThread, onDislikeThread, onNeutralThread,
}) {
  return (
    <div className="flex flex-col gap-4 p-4 px-8">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          threadId={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
          owner={thread.owner}
          authUserId={thread.authUserId}
          onLikeThread={onLikeThread}
          onDislikeThread={onDislikeThread}
          onNeutralThread={onNeutralThread}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onLikeThread: PropTypes.func.isRequired,
  onDislikeThread: PropTypes.func.isRequired,
  onNeutralThread: PropTypes.func.isRequired,
};

export default ThreadList;
