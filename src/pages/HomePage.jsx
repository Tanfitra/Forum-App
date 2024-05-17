/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryThread from '../components/CategoryThread';
import Thread from '../components/Thread';
import Leaderboard from '../components/Leaderboard';
import { parseHTML } from '../utils/formatter';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncGetLeaderboards } from '../states/leaderboard/action';

function HomePage() {
  const {
    threads = [],
    leaderboards = [],
    users = [],
  } = useSelector((state) => state);
  const dispatch = useDispatch();

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
    .map((thread) => {
      const threadUser = users.find((user) => user.id === thread.ownerId);
      return {
        ...thread,
        user: threadUser, // Update the property name to 'user'
      };
    });

  const handleCategorySelect = (category) => {
    setPreviousCategory(selectedCategory);
    setSelectedCategory(category);
  };

  return (
    <div className="flex pl-12 pt-24 bg-[#f4f4f5] pb-12">
      <div className="container w-8/12">
        <div className="border-t shadow-lg border-x border-secondary">
          <CategoryThread setSelectedCategory={handleCategorySelect} />
        </div>
        <div className="mb-4 border-b shadow-lg border-x border-secondary">
          {threadList.map((data, i) => (
            <Thread
              key={i}
              title={data.title}
              body={parseHTML(data.body)}
              category={data.category}
              createdAt={data.createdAt}
              totalComments={data.totalComments}
              totalLike={data.upVotesBy.length}
              totalDislike={data.downVotesBy.length}
              ownerId={data.ownerId}
              id={data.id}
              likes={data.likes} // Menyertakan data likes
              dislikes={data.dislikes}
            />
          ))}
        </div>
      </div>
      <div className="container items-center w-3/12 ml-16">
        <div className="flex flex-col gap-4 p-8 bg-white rounded shadow-lg border border-secondary text-[#3f3f46]">
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
  );
}

export default HomePage;
