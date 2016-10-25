export const LOAD_PROFILE = 'app/user/LOAD_PROFILE';
export const LOAD_PROFILE_SUCCESS = 'app/user/LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_FAIL = 'app/user/LOAD_PROFILE_FAIL';

export function loadProfile() {
  return {
    type: LOAD_PROFILE,
  };
}

export function loadProfileSuccess(payload) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    payload,
  };
}

export function loadProfileFail(payload) {
  return {
    type: LOAD_PROFILE_FAIL,
    payload,
  };
}
