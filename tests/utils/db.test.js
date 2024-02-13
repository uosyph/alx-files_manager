import dbClient from "../../utils/db";

const assert = require('assert');

describe('Test the Mongodb utility', () => {
  it('Mongo client should be alive', async () => {
    assert.equal(true, dbClient.isAlive());
  });

  it('Test users count', async () => {
    const usersCount = await dbClient.nbUsers();
    assert.equal(true, 0 <= usersCount);
  });

  it('Test files count', async () => {
    const filesCount = await dbClient.nbFiles();
    assert.equal(true, 0 <= filesCount);
  });
});
