/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryThread from '../components/CategoryThread';
import ThreadList from '../components/ThreadList';
import Leaderboard from '../components/Leaderboard';
import { asyncLikeThread, asyncDislikeThread, asyncNeutralLikeThread } from '../states/threads/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncGetLeaderboards } from '../states/leaderboard/action';

function HomePage() {
  const {
    threads = [],
    leaderboards = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onLikeThreadHandle = (threadId) => {
    dispatch(asyncLikeThread(threadId));
  };

  const onDislikeThreadHandle = (threadId) => {
    dispatch(asyncDislikeThread(threadId));
  };

  const onNeutralThreadHandle = ({ threadId, likeTypeBefore }) => {
    dispatch(asyncNeutralLikeThread({ threadId, likeTypeBefore }));
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previousCategory, setPreviousCategory] = useState(null);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  const threadList = threads
    .filter((thread) => {
      if (!selectedCategory) return true;
      if (selectedCategory === previousCategory) return true;
      return thread.category === selectedCategory;
    })
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
      authUserId: authUser ? authUser.id : '',
    }));

  const handleCategorySelect = (category) => {
    setPreviousCategory(selectedCategory);
    setSelectedCategory(category);
  };

  return (
    <div className="bg-secondary pt-24 pb-12">
      <div className="w-screen pl-12 -pb-12">
        <CategoryThread setSelectedCategory={handleCategorySelect} />
      </div>
      <div className="flex pl-12 space-x-12 pjustify-between">
        <div className="container w-8/12">
          <div className="mb-4">
            <ThreadList
              threads={threadList}
              onLikeThread={onLikeThreadHandle}
              onDislikeThread={onDislikeThreadHandle}
              onNeutralThread={onNeutralThreadHandle}
            />
          </div>
        </div>
        <div className="container items-center w-3/12 bg-secondary pt-4">
          <div className="flex flex-col gap-4 p-8 rounded-lg shadow-lg text-white bg-primary">
            <h1 className="font-bold">Klasmen Pengguna Aktif</h1>
            <div className="flex justify-between">
              <p>Pengguna</p>
              <p>Skor</p>
            </div>
            <div className="flex flex-col gap-4">
              {leaderboards?.map((data, i) => (
                <Leaderboard
                  key={i}
                  name={data.user.name}
                  score={data.score}
                  avatar={data.user.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
