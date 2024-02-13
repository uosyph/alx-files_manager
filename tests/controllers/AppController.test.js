const request = require('request');
const { promisify } = require('util');
const process = require('process');
const assert = require('assert');

const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `http://${HOST}:${PORT}`;

describe('get /status', () => {
  const promise = promisify(request);
  const requestUrl = promise(`${url}/status`);

  it('should return the correct url', () => {
    assert.equal(url, `http://${HOST}:${PORT}`);
  });

  it('should be no errors', async () => {
    await requestUrl
      .then()
      .catch((err) => { assert.equal(err, null); });
  });

  it('should return the correct status', async () => {
    await requestUrl
      .then(
        (res) => {
          assert.equal(res.statusCode, 200);
        })
      .catch();
  });

  it('should return the correct response', async () => {
    await requestUrl
      .then(
        (res) => {
          try {
            assert.equal(res.body, '{"redis":true,"db":true}');
          } catch (error) {
            throw (new Error('Wrong response'));
          }
        })
      .catch();
  });
});

describe('get /stats', () => {
  const promise = promisify(request);
  const requestUrl = promise(`${url}/stats`);

  it('should return the correct url', () => {
    assert.equal(url, `http://${HOST}:${PORT}`);
  });

  it('should be no errors', async () => {
    await requestUrl
      .then()
      .catch((err) => { assert.equal(err, null); });
  });

  it('should return the correct status', async () => {
    await requestUrl
      .then(
        (res) => {
          assert.equal(res.statusCode, 200);
        })
      .catch();
  });

  it('should return the correct response', async () => {
    await requestUrl
      .then(
        (res) => {
          try {
            const data = JSON.parse(res.body);
            assert.equal(true, typeof data.users === 'number');
            assert.equal(true, typeof data.files === 'number');
          } catch (error) {
            throw (new Error('Wrong response'));
          }
        })
      .catch();
  });
});
