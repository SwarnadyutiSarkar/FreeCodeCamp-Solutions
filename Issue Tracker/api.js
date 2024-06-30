// routes/api.js

'use strict';

const expect = require('chai').expect;
const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {

  app.route('/api/issues/:project')

    .get(async function (req, res){
      const project = req.params.project;
      const query = req.query;
      query.project = project;

      try {
        const issues = await db.collection('issues').find(query).toArray();
        res.json(issues);
      } catch (error) {
        res.json({ error: 'could not retrieve issues' });
      }
    })

    .post(async function (req, res){
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      const newIssue = {
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to: assigned_to || '',
        status_text: status_text || '',
        created_on: new Date(),
        updated_on: new Date(),
        open: true,
      };

      try {
        const result = await db.collection('issues').insertOne(newIssue);
        res.json(result.ops[0]);
      } catch (error) {
        res.json({ error: 'could not create issue' });
      }
    })

    .put(async function (req, res){
      const project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && !open) {
        return res.json({ error: 'no update field(s) sent', '_id });
      }

      const updateFields = {};
      if (issue_title) updateFields.issue_title = issue_title;
      if (issue_text) updateFields.issue_text = issue_text;
      if (created_by) updateFields.created_by = created_by;
      if (assigned_to) updateFields.assigned_to = assigned_to;
      if (status_text) updateFields.status_text = status_text;
      if (open !== undefined) updateFields.open = open;

      updateFields.updated_on = new Date();

      try {
        const result = await db.collection('issues').findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: updateFields },
          { returnDocument: 'after' }
        );

        if (result.value) {
          res.json({ result: 'successfully updated', '_id': _id });
        } else {
          res.json({ error: 'could not update', '_id': _id });
        }
      } catch (error) {
        res.json({ error: 'could not update', '_id': _id });
      }
    })

    .delete(async function (req, res){
      const project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        const result = await db.collection('issues').deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount === 1) {
          res.json({ result: 'successfully deleted', '_id': _id });
        } else {
          res.json({ error: 'could not delete', '_id': _id });
        }
      } catch (error) {
        res.json({ error: 'could not delete', '_id': _id });
      }
    });

};
