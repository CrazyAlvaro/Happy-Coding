import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as actions from './action';
import { loadProfile } from '../../../utils/authApi';
import _ from 'lodash';

function* userLoadProfile() {
  try {
    const profile = yield call(loadProfile);
    const filteredProfile = _.omit(profile, ['id', 'password']);
    if (!_.isEmpty(profile)) {
      yield put(actions.loadProfileSuccess({ profile: filteredProfile }));
    } else {
      throw new Error('no user profile');
    }
  } catch (error) {
    yield put(actions.loadProfileFail({ error }));
  }
}

export default function* watchUserLoadProfile() {
  yield* takeEvery(actions.LOAD_PROFILE, userLoadProfile);
}
