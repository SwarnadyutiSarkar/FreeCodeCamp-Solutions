// tests/2_functional-tests.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('POST /api/solve => object', () => {
    test('Solve a puzzle with valid puzzle string', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'solution');
          done();
        });
    });

    test('Solve a puzzle with missing puzzle string', (done) => {
      chai.request(server)
        .post('/api/solve')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field missing' });
          done();
        });
    });

    test('Solve a puzzle with invalid characters', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5...a9';
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
          done();
        });
    });

    test('Solve a puzzle with incorrect length', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5....';
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
          done();
        });
    });

    test('Solve a puzzle that cannot be solved', (done) => {
      const puzzle = '999.5..84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
          done();
        });
    });
  });

  suite('POST /api/check => object', () => {
    test('Check a puzzle placement with all fields', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: '7' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { valid: true });
          done();
        });
    });

    test('Check a puzzle placement with single placement conflict', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: '5' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { valid: false, conflict: ['row'] });
          done();
        });
    });

    test('Check a puzzle placement with multiple placement conflicts', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: '2' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column'] });
          done();
        });
    });

    test('Check a puzzle placement with all placement conflicts', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: '1' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column', 'region'] });
          done();
        });
    });

    test('Check a puzzle placement with missing required fields', (done) => {
      chai.request(server)
        .post('/api/check')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });

    test('Check a puzzle placement with invalid characters', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5...a9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: '1' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
          done();
        });
    });

    test('Check a puzzle placement with incorrect length', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5....';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: '1' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
          done();
        });
    });

    test('Check a puzzle placement with invalid placement coordinate', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'Z1', value: '1' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid coordinate' });
          done();
        });
    });

    test('Check a puzzle placement with invalid placement value', (done) => {
      const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
      chai.request(server)
        .post('/api/check')
        .send({ puzzle, coordinate: 'A1', value: 'a' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid value' });
          done();
        });
    });
  });

});
