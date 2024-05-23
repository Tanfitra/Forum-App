import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdOutlineAddComment } from 'react-icons/md';
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Loading from './Loading';

function Navigation({ onSignOut }) {
  const { authUser } = useSelector((state) => state);

  return (
    <>
      <div className="fixed w-full px-8 py-4 bg-primary">
        <div className="container flex justify-between">
          <h1 className="pl-2 text-xl font-bold text-white">Forum App</h1>
          <ul className="flex gap-10">
            <li>
              <Link
                to="/"
                className="flex items-center content-center space-x-2 text-lg text-white"
              >
                <span>
                  <GoCommentDiscussion fontSize="25px" />
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              {authUser ? (
                <Link
                  to="/new"
                  className="flex items-center content-center space-x-2 text-lg text-white"
                >
                  <span>
                    <MdOutlineAddComment fontSize="25px" />
                  </span>
                  <span>New Thread</span>
                </Link>
              ) : null}
            </li>
            <li>
              {authUser ? (
                <div
                  className="flex items-center content-center space-x-2 text-lg text-white"
                  onClick={onSignOut}
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                >
                  <span>
                    <RiLogoutBoxLine fontSize="20px" />
                  </span>
                  <span>Logout</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center content-center space-x-2 text-lg text-white"
                >
                  <span>
                    <RiLoginBoxLine fontSize="20px" />
                  </span>
                  <span>Login</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Loading />
    </>
  );
}

Navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
