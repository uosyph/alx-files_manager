const { promisify } = require('util');
const assert = require('assert');
const process = require('process');
const request = require('request');

const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `http://${HOST}:${PORT}`;

describe('post /users', () => {
  const promise = promisify(request);
  const options = {
    method: 'POST',
    uri: `${url}/users`,
    json: {
      'email': 'user@email.com',
      'password': 'passwd123',
    }
  };
  const requestUrl = promise(options);

  it('should return 400 if user not found', async () => {
    const response = await requestUrl;
    assert.equal(response.statusCode, 400);
  });
});


describe('get /connect', () => {
  it('should return 401 if no Authorization header is provided', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/connect`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });

  it('should return 401 if email or password is missing', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/connect`,
      headers: {
        'Authorization': 'Basic ' + Buffer.from('username').toString('base64'),
      },
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});

describe('get /disconnect', () => {
  it('should return 401 if no X-Token header is provided', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/disconnect`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });

  it('should return 401 if token is invalid', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/disconnect`,
      headers: {
        'X-Token': 'invalid_token',
      },
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});
