import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useInput from '../hooks/UseInput';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm({ registerUser }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = () => {
    if (name === '' || email === '' || password === '') {
      toast.error(
        'Please fill in all fields.',
        {
          theme: 'colored',
          position: 'bottom-center',
        },
      );
    } else {
      registerUser(name, email, password);
    }
  };

  return (
    <form className="w-8/12 py-20 mt-16 rounded-lg bg-primary flex flex-col justify-center items-center text-white">
      <h1 className="text-[32px] font-bold">Register</h1>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Name</p>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={onNameChange}
          className="py-2 border rounded px-2 bg-secondary"
        />
      </div>
      <div className="flex flex-col w-3/6 gap-2 mb-1">
        <p>Email</p>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={onEmailChange}
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
          <p>Already have an account?</p>
          <Link to="/login" className="cursor-pointer hover:text-secondary">Login</Link>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="border rounded px-12 py-1.5 bg-secondary"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default RegisterForm;
