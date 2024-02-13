const { promisify } = require('util');
const assert = require('assert');
const process = require('process');
const request = require('request');

const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `http://${HOST}:${PORT}`;

describe('post /upload', () => {
  it('should return 404 if no X-Token header is provided', async () => {
    const options = {
      method: 'POST',
      uri: `${url}/upload`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 404);
  });
});

describe('get /files/:id', () => {
  it('should return 401 if no X-Token header is provided', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/files/:id`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});

describe('get files', () => {
  it('should return 401 if no X-Token header is provided', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/files`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});

describe('put /files/:id/publish', () => {
  it('should return 401 if no X-Token header is provided', async () => {
    const options = {
      method: 'PUT',
      uri: `${url}/files/:id/publish`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});

describe('put /files/:id/unpublish', () => {
  it('should return 401 if no X-Token header is provided', async () => {
    const options = {
      method: 'PUT',
      uri: `${url}/files/:id/unpublish`,
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});

describe('get /files/:id', () => {
  it('should return 401 if file is not found', async () => {
    const options = {
      method: 'GET',
      uri: `${url}/files/:id`,
      headers: {
        'X-Token': 'valid_token',
      },
    };
    const response = await promisify(request)(options);
    assert.equal(response.statusCode, 401);
  });
});
