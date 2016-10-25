export const LOAD_USER = 'app/userRelation/LOAD_USER';
export const LOAD_USER_SUCCESS = 'app/userRelation/LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'app/userRelation/LOAD_USER_FAIL';

export function loadUserRemote() {
  return {
    type: LOAD_USER,
  };
}

export function loadUserRemoteSuccess(users) {
  return {
    type: LOAD_USER_SUCCESS,
    users,
  };
}

export function loadUserRemoteFail(error) {
  return {
    type: LOAD_USER_FAIL,
    error,
  };
}
