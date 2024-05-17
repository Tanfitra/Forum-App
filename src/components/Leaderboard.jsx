import React from 'react';
import PropTypes from 'prop-types';

function Leaderboard({ name, score, avatar }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <img src={avatar} alt={name} className="w-10 rounded-full" />
        <h1>{name}</h1>
      </div>
      <p>{score}</p>
    </div>
  );
}

Leaderboard.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Leaderboard;
