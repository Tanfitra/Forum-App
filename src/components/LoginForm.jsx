import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useInput from '../hooks/UseInput';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm({ loginUser }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = () => {
    if (email === '' || password === '') {
      toast.error(
        'Please fill in all fields!',
        {
          theme: 'colored',
          position: 'bottom-center',
        },
      );
    } else {
      loginUser(email, password);
    }
  };

  return (
    <form className="w-8/12 py-20 mt-16 rounded-lg bg-primary flex flex-col justify-center items-center text-white">
      <h1 className="text-[32px] font-bold">Login</h1>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
          className="py-2 border rounded px-2 bg-secondary"
        />
      </div>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Password</p>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={onPasswordChange}
          className="py-2 border rounded px-2 bg-secondary"
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2 w-3/6 mt-[16px]">
        <div className="inline-flex space-x-1">
          <p>Don&apos;t have an account?</p>
          <Link to="/register" className="cursor-pointer hover:text-secondary">Register</Link>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          id="loginUser"
          className="border rounded px-12 py-1.5 bg-secondary"
        >
          Login
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
