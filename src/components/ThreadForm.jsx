import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/UseInput';

function ThreadForm({ createThread }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <form className="w-8/12 h-full bg-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center">Create New Thread</h1>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Title</p>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          className="py-2 border rounded px-2"
        />
      </div>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Category</p>
        <input
          type="text"
          value={category}
          onChange={onCategoryChange}
          className="py-2 border rounded px-2"
        />
      </div>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Body</p>
        <textarea
          value={body}
          onChange={onBodyChange}
          className="py-2 border rounded px-2"
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2 w-3/6 mt-[16px]">
        <Link to="/" className="cursor-pointer hover:text-secondary">Back</Link>
        <button
          type="button"
          onClick={() => createThread(title, body, category)}
          className="border rounded px-12 py-1.5 bg-secondary"
        >
          Create
        </button>
      </div>
    </form>
  );
}

ThreadForm.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default ThreadForm;
