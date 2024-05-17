import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (email, password) => {
    dispatch(asyncSetAuthUser(email, password));
    navigate('/');
  };
  return (
    <div
      className="w-screen h-screen"
    >
      <h1 className="text-[32px] font-bold">Login</h1>
      <LoginForm loginUser={onLogin} />
    </div>
  );
}

export default LoginPage;
