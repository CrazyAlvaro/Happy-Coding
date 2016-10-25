import * as controllers from './controllers';
import ensureAuthenticated from './middlewares/ensureAuthenticated';
import Router from 'express';
import passport from 'passport';
import {
  userAuthMsgs,
  authUrls,
} from '../../common/authConstants';
const msgs = userAuthMsgs.cn;

export default new Router()
  .post('/signup', controllers.signup)
  .post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: authUrls.SIGNIN,
    failureFlash: true,
    successFlash: {
      type: 'success',
      message: msgs.INFO_SIGNIN_SUCCESS,
    },
  }))
  .post('/admin/signin', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: authUrls.ADMIN_SIGNIN,
    failureFlash: true,
    successFlash: {
      type: 'success',
      message: msgs.INFO_ADMIN_SIGNIN_SUCCESS,
    },
  }))
  .post('/signout', ensureAuthenticated, controllers.signout)
  .get('/me', ensureAuthenticated, controllers.me)
  .post('/update', ensureAuthenticated, controllers.update)
  .post('/password', ensureAuthenticated, controllers.changePassword);
