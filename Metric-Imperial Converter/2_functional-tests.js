// tests/2_functional-tests.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert valid input 10L', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convert invalid input 32g', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });

  test('Convert invalid number 3/7.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number');
        done();
      });
  });

  test('Convert invalid number AND unit 3/7.2/4kilomegagram', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kilomegagram'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: 'kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
