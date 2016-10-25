import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import { loadTableList } from './modules/tableList/action';
import { loadProfile } from './modules/user/loadProfile/action';

import { App, AdminSpace, FrontPage } from './views';
import {
  TableList,
  Table,
  Yonyou,
  User,
  Role,
  UserRole,
  RoleRelation,
  MDAdmin,
 } from './containers';
import {
  MDSignin,
  MDSignup,
  MDProfile,
  MDEditProfile,
  MDChangePassword,
  MDGrid,
} from './components';

import _ from 'lodash';

// this line now doesn't save anything to localStorage
const composes = [persistState('user.isSignedIn', { key: 'redux-state' })];
if (process.env.NODE_ENV !== 'production') {
  // install the Chrome extension at https://github.com/zalmoxisus/redux-devtools-extension
  composes.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

const createPersistentStore = compose(...composes)(createStore);

const saga = createSagaMiddleware();

let middlewares;
if (process.env.NODE_ENV === 'production') {
  middlewares = [saga];
} else {
  const logger = createLogger();
  middlewares = [logger, saga];
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createPersistentStore);
const store = createStoreWithMiddleware(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);

saga.run(rootSaga);

// Required for replaying actions from devtools to work
// reduxRouterMiddleware.listenForReplays(store);
store.dispatch(loadTableList());
store.dispatch(loadProfile());

function authTransition(nextState, replace) {
  const profile = store.getState().user.profile;
  if (_.isEmpty(profile)) {
    replace('/');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={FrontPage} />
        <Route component={FrontPage} >
          <Route path="tableList/:category" component={TableList} onEnter={authTransition} />
          <Route path="table/:id" component={Table} onEnter={authTransition} />
          <Route path="yongyou" component={Yonyou} onEnter={authTransition} />
          <Route path="mdgrid" component={MDGrid} onEnter={authTransition} />
        </Route>
        <Route component={AdminSpace}>
          <Route path="signin" component={MDSignin} />
          <Route path="signup" component={MDSignup} />
          <Route path="profile/:username" component={MDProfile} />
          <Route path="password" component={MDChangePassword} />
          <Route path="edit_profile" component={MDEditProfile} />
          <Route path="auth">
            <Route path="signin" component={MDSignin} />
            <Route path="signup" component={MDSignup} />
            <Route path="profile/:username" component={MDProfile} />
            <Route path="password" component={MDChangePassword} />
            <Route path="edit_profile" component={MDEditProfile} />
          </Route>
          <Route path="administrator">
            <IndexRoute component={MDAdmin} />
            <Route path="user" component={User} />
            <Route path="role" component={Role} />
            <Route path="userrole" component={UserRole} />
            <Route path="rolerelation" component={RoleRelation} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
