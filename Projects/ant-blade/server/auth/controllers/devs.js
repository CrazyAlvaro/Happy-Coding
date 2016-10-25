import winston from 'winston';
import UserProfile from '../models/userProfile';

export async function devGetId(req, res) {
  const { username } = req.params;
  if (!username) {
    res.sendStatus(400);
    winston.error('username should be provided');
  } else {
    try {
      const user = await UserProfile.findOne({ where: { username } });
      res.status(200).send({ id: user.id });
    } catch (err) {
      res.sendStatus(400);
      winston.error(err);
    }
  }
}
