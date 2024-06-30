// routes/api.js

'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver();

module.exports = function (app) {

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      const result = solver.solve(puzzle);
      res.json(result);
    });

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const isValid = solver.validate(puzzle);
      if (isValid.error) {
        return res.json(isValid);
      }

      const row = coordinate.charCodeAt(0) - 65;
      const column = parseInt(coordinate[1]) - 1;

      if (row < 0 || row > 8 || column < 0 || column > 8) {
        return res.json({ error: 'Invalid coordinate' });
      }

      if (value < 1 || value > 9) {
        return res.json({ error: 'Invalid value' });
      }

      const rowValid = solver.checkRowPlacement(puzzle, row, column, value);
      const colValid = solver.checkColPlacement(puzzle, row, column, value);
      const regionValid = solver.checkRegionPlacement(puzzle, row, column, value);

      const conflicts = [];
      if (!rowValid) conflicts.push('row');
      if (!colValid) conflicts.push('column');
      if (!regionValid) conflicts.push('region');

      if (conflicts.length === 0) {
        return res.json({ valid: true });
      } else {
        return res.json({ valid: false, conflict: conflicts });
      }
    });

};
