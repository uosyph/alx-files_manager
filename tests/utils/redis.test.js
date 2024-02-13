import redisClient from '../../utils/redis';

const assert = require('assert');

describe('test the Redis client utility', () => {
  it('redis client should be alive', () => {
    assert.equal(true, redisClient.isAlive());
  });

  it('test get/set methods', async () => {
    await redisClient.set('key', 'value', 5);
    const value = await redisClient.get('key');
    assert.equal(value, 'value');
  });

  it('test del method', async () => {
    await redisClient.del('key');
    const value = await redisClient.get('key');
    assert.equal(value, undefined);
  });
});
