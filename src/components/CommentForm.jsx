import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import useInput from '../hooks/UseInput';
import 'react-toastify/dist/ReactToastify.css';

function CommentForm({ createComment }) {
  const [content, onContentChange] = useInput('');

  const handleCreateComment = () => {
    if (content.trim() !== '') {
      createComment(content);
    } else {
      toast.error(
        'Please enter a comment.',
        {
          theme: 'colored',
          position: 'bottom-center',
        },
      );
    }
  };

  return (
    <form className="flex flex-col w-full gap-2">
      <textarea
        value={content}
        onChange={onContentChange}
        className="w-full h-32 px-2 border rounded"
      />
      <button
        type="button"
        onClick={handleCreateComment}
        className="border rounded px-12 py-1.5 bg-secondary"
      >
        Add Comment
      </button>
      <ToastContainer />
    </form>
  );
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default CommentForm;
