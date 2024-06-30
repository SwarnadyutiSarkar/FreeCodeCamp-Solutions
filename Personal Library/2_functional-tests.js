// tests/2_functional-tests.js

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('POST /api/books => object with book data', function() {
    test('Create a book with title', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Book Title' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          done();
        });
    });

    test('Create a book without title', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing required field title');
          done();
        });
    });
  });

  suite('GET /api/books => array of books', function() {
    test('View all books', function(done) {
      chai.request(server)
        .get('/api/books')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach(book => {
            assert.property(book, 'title');
            assert.property(book, '_id');
            assert.property(book, 'commentcount');
          });
          done();
        });
    });
  });

  suite('GET /api/books/:id => book object with book data', function() {
    test('View a single book', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Book Title' })
        .end(function(err, res) {
          const bookId = res.body._id;
          chai.request(server)
            .get(`/api/books/${bookId}`)
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, 'title');
              assert.property(res.body, '_id');
              assert.property(res.body, 'comments');
              assert.isArray(res.body.comments);
              done();
            });
        });
    });

    test('View a book with invalid id', function(done) {
      chai.request(server)
        .get('/api/books/invalidid')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
    });
  });

  suite('POST /api/books/:id => add comment/return book object', function() {
    test('Add comment to book', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Book Title' })
        .end(function(err, res) {
          const bookId = res.body._id;
          chai.request(server)
            .post(`/api/books/${bookId}`)
            .send({ comment: 'Great book!' })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, 'title');
              assert.property(res.body, '_id');
              assert.property(res.body, 'comments');
              assert.include(res.body.comments, 'Great book!');
              done();
            });
        });
    });

    test('Add comment to book with invalid id', function(done) {
      chai.request(server)
        .post('/api/books/invalidid')
        .send({ comment: 'Great book!' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
    });

    test('Add comment to book without comment', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Book Title' })
        .end(function(err, res) {
          const bookId = res.body._id;
          chai.request(server)
            .post(`/api/books/${bookId}`)
            .send({})
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, 'missing required field comment');
              done();
            });
        });
    });
  });

  suite('DELETE /api/books/:id => delete book', function() {
    test('Delete a book', function(done) {
      chai.request(server)
        .post('/api/books')
        .send({ title: 'Book Title' })
        .end(function(err, res) {
          const bookId = res.body._id;
          chai.request(server)
            .delete(`/api/books/${bookId}`)
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, 'delete successful');
              done();
            });
        });
    });

    test('Delete a book with invalid id', function(done) {
      chai.request(server)
        .delete('/api/books/invalidid')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
    });
  });

  suite('DELETE /api/books => delete all books', function() {
    test('Delete all books', function(done) {
      chai.request(server)
        .delete('/api/books')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'complete delete successful');
          done();
        });
    });
  });

});
