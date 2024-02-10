import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import getIdAndKey from '../utils/users';

class AuthController {
  static async getConnect(req, res) {
    const authorization = req.header('Authorization') || '';
    const userAuth = authorization.split(' ')[1];
    if (!userAuth) return res.status(401).send({ error: 'Unauthorized' });

    const decodedAuth = Buffer.from(userAuth, 'base64').toString('utf-8');
    const [email, pass] = decodedAuth.split(':');
    if (!email || !pass) return res.status(401).send({ error: 'Unauthorized' });

    const sha1Passwd = sha1(pass);
    const user = await dbClient.users.findOne({
      email,
      password: sha1Passwd,
    });
    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    const token = uuidv4();
    const key = `auth_${token}`;
    const expDate = 24 * 3600;

    await redisClient.set(key, user._id.toString(), expDate);

    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const { userId, key } = await getIdAndKey(req);
    if (!userId) return res.status(401).send({ error: 'Unauthorized' });

    await redisClient.del(key);

    return res.status(204).send();
  }
}

export default AuthController;
