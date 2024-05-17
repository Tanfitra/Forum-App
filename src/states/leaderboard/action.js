/* eslint-disable no-alert */
// action.js
import api from '../../utils/api';

const ActionType = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

function getLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.GET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(getLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  getLeaderboardsActionCreator,
  asyncGetLeaderboards,
};
