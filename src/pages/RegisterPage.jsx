import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = (name, email, password) => {
    dispatch(asyncRegisterUser(name, email, password));
    navigate('/login');
  };
  return (
    <div
      className="w-screen h-screen"
    >
      <h1 className="text-[32px] font-bold">Register</h1>
      <RegisterForm registerUser={onRegister} />
    </div>
  );
}

export default RegisterPage;
