// tests/2_functional-tests.js

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('POST /api/issues/{project} => object with issue data', function() {
    test('Create an issue with every field', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Creator',
          assigned_to: 'Assignee',
          status_text: 'Status'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Creator');
          assert.equal(res.body.assigned_to, 'Assignee');
          assert.equal(res.body.status_text, 'Status');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'open');
          assert.property(res.body, '_id');
          done();
        });
    });

    test('Create an issue with only required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Creator'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Creator');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'open');
          assert.property(res.body, '_id');
          done();
        });
    });

    test('Create an issue with missing required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'required field(s) missing' });
          done();
        });
    });
  });

  suite('GET /api/issues/{project} => Array of objects with issue data', function() {
    test('View issues on a project', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], '_id');
          done();
        });
    });

    test('View issues on a project with one filter', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({ open: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach(issue => {
            assert.equal(issue.open, true);
          });
          done();
        });
    });

    test('View issues on a project with multiple filters', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({ open: true, created_by: 'Creator' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach(issue => {
            assert.equal(issue.open, true);
            assert.equal(issue.created_by, 'Creator');
          });
          done();
        });
    });
  });

  suite('PUT /api/issues/{project} => text', function() {
    test('Update one field on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '60c72bdf5f1b2c23d8e1b4c5',
          issue_title: 'Updated Title'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { result: 'successfully updated', '_id': '60c72bdf5f1b2c23d8e1b4c5' });
          done();
        });
    });

    test('Update multiple fields on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '60c72bdf5f1b2c23d8e1b4c5',
          issue_title: 'Updated Title',
          issue_text: 'Updated Text'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { result: 'successfully updated', '_id': '60c72bdf5f1b2c23d8e1b4c5' });
          done();
        });
    });

    test('Update an issue with missing _id', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          issue_title: 'Updated Title'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'missing _id' });
          done();
        });
    });

    test('Update an issue with no fields to update', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '60c72bdf5f1b2c23d8e1b4c5'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'no update field(s) sent', '_id': '60c72bdf5f1b2c23d8e1b4c5' });
          done();
        });
    });

    test('Update an issue with an invalid _id', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: 'invalid_id',
          issue_title: 'Updated Title'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'could not update', '_id': 'invalid_id' });
          done();
        });
    });
  });

  suite('DELETE /api/issues/{project} => text', function() {
    test('Delete an issue', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: '60c72bdf5f1b2c23d8e1b4c5'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { result: 'successfully deleted', '_id': '60c72bdf5f1b2c23d8e1b4c5' });
          done();
        });
    });

    test('Delete an issue with an invalid _id', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: 'invalid_id'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'could not delete', '_id': 'invalid_id' });
          done();
        });
    });

    test('Delete an issue with missing _id', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'missing _id' });
          done();
        });
    });
  });

});
