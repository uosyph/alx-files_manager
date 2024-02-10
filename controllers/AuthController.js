import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import DBClient from '../utils/db';
import RedisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    const authorization = req.header('Authorization') || null;
    if (!authorization) return res.status(401).send({ error: 'Unauthorized' });

    const userBuffer = Buffer.from(authorization.replace('Basic ', ''), 'base64');
    const userCredentials = {
      email: userBuffer.toString('utf-8').split(':')[0],
      password: userBuffer.toString('utf-8').split(':')[1],
    };

    if (!userCredentials.email || !userCredentials.password) return res.status(401).send({ error: 'Unauthorized' });

    userCredentials.password = sha1(userCredentials.password);

    const userExists = await DBClient.db.collection('users').findOne(userCredentials);
    if (!userExists) return res.status(401).send({ error: 'Unauthorized' });

    const token = uuidv4();
    const key = `auth_${token}`;
    await RedisClient.set(key, userExists._id.toString(), 86400);

    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-Token') || null;
    if (!token) return res.status(401).send({ error: 'Unauthorized' });

    const redisToken = await RedisClient.get(`auth_${token}`);
    if (!redisToken) return res.status(401).send({ error: 'Unauthorized' });

    await RedisClient.del(`auth_${token}`);
    return res.status(204).send();
  }
}

module.exports = AuthController;
