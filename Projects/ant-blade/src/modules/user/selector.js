import _ from 'lodash';

export const userLoadProfileStatusSelector = state => _.get(state, 'user.isLoading');
export const userProfileSelector = state => _.get(state, 'user.profile');
export const userIsSignedInStatusSelector = state => _.get(state, 'user.isSignedIn');
export const userRolesSelector = state => _.get(state, 'user.roles');

export default {
  userLoadProfileStatusSelector,
  userProfileSelector,
  userIsSignedInStatusSelector,
  userRolesSelector,
};
