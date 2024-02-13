import dbClient from '../../utils/db';

const assert = require('assert');

describe('test the Mongodb utility', () => {
  it('mongo client should be alive', async () => {
    assert.equal(true, dbClient.isAlive());
  });

  it('test users count', async () => {
    const usersCount = await dbClient.nbUsers();
    assert.equal(true, usersCount >= 0);
  });

  it('test files count', async () => {
    const filesCount = await dbClient.nbFiles();
    assert.equal(true, filesCount >= 0);
  });
});
