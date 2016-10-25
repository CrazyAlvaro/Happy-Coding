import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import _ from 'lodash';
import flash from 'connect-flash';
import authenticationRouter from './auth/authenticationRouter';
import devRouter from './auth/devRouter';
import { UserProfile } from './auth/models';
import ensureAuthenticated from './auth/middlewares/ensureAuthenticated';
import authorizationRouter from './admin/router';
import ensureAdminMiddleware from './admin/middlewares/ensureAdminMiddleware';
import connectMongo from 'connect-mongo';
import { URL } from './mongo';

export default function authConfig(app) {
  const secret = process.env.SESSION_SECRET || '4d748bb898e7cbd78210e29536f4c1f1';
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const sessionOpts = {
    secret,
    resave: false,
    saveUninitialized: true,
  };
  // use mongo session in production
  if (process.env.NODE_ENV === 'production') {
    const MongoStore = connectMongo(session);
    app.use(session({
      ...sessionOpts,
      store: new MongoStore({
        url: URL,
      }),
    }));
  } else {
    app.use(session(sessionOpts));
  }

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(UserProfile.createStrategy());
  passport.serializeUser(UserProfile.serializeUser());
  passport.deserializeUser(UserProfile.deserializeUser());

  app.use(flash());
  app.use('/auth', authenticationRouter);
  app.use('/admin', ensureAuthenticated, ensureAdminMiddleware, authorizationRouter);

  if (_.includes(['test', 'dev'], process.env.NODE_ENV)) {
    app.use('/dev', devRouter);
  }
}
