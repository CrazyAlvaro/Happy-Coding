import mongoose from 'mongoose';
import winston from 'winston';
import { URL } from '../../mongo';

// as per http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

mongoose.connect(URL);

mongoose.connection.on('connected', () => {
  winston.info('mongoose connected to', mongoose.connection.name);
});

mongoose.connection.on('error', err => {
  winston.error('mongoose error', err);
});

mongoose.connection.on('disconnected', () => {
  winston.info('mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    winston.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export UserProfile from './userProfile';
export Role from './role';
