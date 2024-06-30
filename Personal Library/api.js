// routes/api.js

'use strict';

const expect = require('chai').expect;
const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {

  app.route('/api/books')
    .get(async function (req, res){
      try {
        const books = await db.collection('books').find().toArray();
        const formattedBooks = books.map(book => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        }));
        res.json(formattedBooks);
      } catch (error) {
        res.json({ error: 'could not retrieve books' });
      }
    })

    .post(async function (req, res){
      const { title } = req.body;

      if (!title) {
        return res.send('missing required field title');
      }

      const newBook = {
        title,
        comments: []
      };

      try {
        const result = await db.collection('books').insertOne(newBook);
        res.json({
          _id: result.ops[0]._id,
          title: result.ops[0].title
        });
      } catch (error) {
        res.json({ error: 'could not create book' });
      }
    })

    .delete(async function (req, res){
      try {
        await db.collection('books').deleteMany({});
        res.send('complete delete successful');
      } catch (error) {
        res.json({ error: 'could not delete books' });
      }
    });

  app.route('/api/books/:id')
    .get(async function (req, res){
      const bookId = req.params.id;

      try {
        const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });
        if (!book) {
          return res.send('no book exists');
        }
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments
        });
      } catch (error) {
        res.json({ error: 'could not retrieve book' });
      }
    })

    .post(async function (req, res){
      const bookId = req.params.id;
      const { comment } = req.body;

      if (!comment) {
        return res.send('missing required field comment');
      }

      try {
        const result = await db.collection('books').findOneAndUpdate(
          { _id: new ObjectId(bookId) },
          { $push: { comments: comment } },
          { returnDocument: 'after' }
        );

        if (!result.value) {
          return res.send('no book exists');
        }

        res.json({
          _id: result.value._id,
          title: result.value.title,
          comments: result.value.comments
        });
      } catch (error) {
        res.json({ error: 'could not update book' });
      }
    })

    .delete(async function (req, res){
      const bookId = req.params.id;

      try {
        const result = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

        if (result.deletedCount === 1) {
          res.send('delete successful');
        } else {
          res.send('no book exists');
        }
      } catch (error) {
        res.json({ error: 'could not delete book' });
      }
    });

};
