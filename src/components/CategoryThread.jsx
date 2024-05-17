/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function CategoryThread({ setSelectedCategory }) {
  const { threads = [], users = [] } = useSelector((state) => state);
  const threadList = threads.map((thread) => {
    const user = users.find((user) => user.id === thread.ownerId);
    return {
      ...thread,
      user,
    };
  });

  const categoriesSet = new Set(threadList.map((data) => data.category));
  const categories = Array.from(categoriesSet);

  const [selectedCategory, setSelectedCategoryState] = useState(null);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedCategoryState(null);
    } else {
      setSelectedCategory(category);
      setSelectedCategoryState(category);
    }
  };

  return (
    <div className="flex flex-col gap-2 px-8 pt-6 bg-white text-[#3f3f46]">
      <h1 className="text-lg">Kategori Populer</h1>
      <div className="flex flex-wrap space-x-2">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategorySelect(category)}
            aria-hidden="true"
            className={`border rounded mb-2 w-[12%] text-center text-sm py-0.5 cursor-pointer ${
              selectedCategory === category
                ? 'bg-secondary text-white'
                : 'border-primary text-[#3f3f46]'
            }`}
          >
            #
            {category}
          </div>
        ))}
      </div>

      <h1 className="pt-4 text-2xl font-bold">Diskusi Tersedia</h1>
    </div>
  );
}

CategoryThread.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryThread;
