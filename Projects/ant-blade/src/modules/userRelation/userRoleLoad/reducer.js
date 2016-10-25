import {
  LOAD_USER_ROLE,
  LOAD_USER_ROLE_SUCCESS,
  LOAD_USER_ROLE_FAIL,
} from './action';
// import _ from 'lodash';

/**
 * @username: current username
 * @userROles: current username's roles
 * @allUserRoles: all user and their roles
 *
 */
const initialState = {
  username: '',
  userRoles: [],
  allUserRoles: {},
  isLoading: false,
};

function userRoleLoad(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_ROLE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_USER_ROLE_SUCCESS: {
      const username = action.username;
      const userRoles = action.userRoles;

      // Update all user roles, Object type
      const allUserRoles = {
        ...state.allUserRoles,
        [username]: userRoles,
      };

      // Update all roles, array
      // const allRoles = _.uniq(state.allRoles.concat(action.userRoles));

      return {
        ...state,
        username,
        userRoles,
        allUserRoles,
        isLoading: false,
      };
    }

    case LOAD_USER_ROLE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default userRoleLoad;
