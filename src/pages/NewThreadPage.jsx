import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import ThreadForm from '../components/ThreadForm';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddThread(title, body, category));
    navigate('/');
  };
  return (
    <div className="w-screen h-screen flex bg-[#f4f4f5] justify-center content-center items-center">
      <ThreadForm createThread={onAddThread} />
    </div>
  );
}

export default NewThreadPage;
