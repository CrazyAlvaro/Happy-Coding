import { Router } from 'express';
import * as devs from './controllers/devs';

export default new Router()
  .get('/:username', devs.devGetId);
