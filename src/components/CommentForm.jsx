import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useInput from '../hooks/UseInput';
import 'react-toastify/dist/ReactToastify.css';

function CommentForm({ authUserId, createComment }) {
  const [content, onContentChange] = useInput('');

  const handleCreateComment = () => {
    if (content.trim() !== '') {
      createComment(content);
    } else {
      toast.error('Please enter a comment.', {
        theme: 'colored',
        position: 'bottom-center',
      });
    }
  };

  return (
    <div>
      {authUserId ? (
        <form className="flex flex-col w-full gap-2">
          <textarea
            value={content}
            onChange={onContentChange}
            className="w-full h-32 px-2 border rounded bg-secondary"
          />
          <button
            type="button"
            onClick={() => handleCreateComment()}
            className="border rounded px-12 py-1.5 bg-secondary"
          >
            Add Comment
          </button>
          <ToastContainer />
        </form>
      ) : (
        <div className="inline-flex space-x-1">
          <Link to="/login" className="text-blue-700 cursor-pointer">
            Login
          </Link>
          <span>untuk memberi komentar</span>
        </div>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  authUserId: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired,
};

export default CommentForm;
