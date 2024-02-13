const { promisify } = require('util');
const assert = require('assert');
const process = require('process');
const request = require('request');

const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `http://${HOST}:${PORT}`;

describe('post /users', () => {
  it('should return 400 if email is missing', async () => {
    const options = {
      method: 'POST',
      uri: `${url}/users`,
      json: {
        'password': 'passwd123',
      }
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 400);
  });

  it('should return 400 if password is missing', async () => {
    const options = {
      method: 'POST',
      uri: `${url}/users`,
      json: {
        'email': 'user@example.com',
      }
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 400);
  });

  it('should return 400 if user already exists', async () => {
    // Add a user to the database or mock the database to have a user
    // Then send a request to create a user with the same email
    const options = {
      method: 'POST',
      uri: `${url}/users`,
      json: {
        'email': 'existing_user@example.com',
        'password': 'passwd123',
      }
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 400);
  });
});

describe('get /me', () => {
  it('should return 404 if no user found with the provided token', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/me`,
      headers: {
        'X-Token': 'valid_token',
      },
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 404);
  });
});
