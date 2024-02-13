import redisClient from "../../utils/redis";

const assert = require('assert');
const client = redisClient;

describe('Test the Redis client utility', () => {
  it('Redis client should be alive', () => {
    assert.equal(true, client.isAlive());
  });

  it('Test get/set methods', async () => {
    await client.set('key', 'value', 5);
    const value = await client.get('key');
    assert.equal(await client.get('key'), 'value');
  });

  it('Test del method', async () => {
    await client.del('key');
    const value = await client.get('key');
    assert.equal(value, undefined);
  });
});
