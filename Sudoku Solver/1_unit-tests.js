// tests/1_unit-tests.js

const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.equal(solver.validate(puzzle), true);
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5...a9';
    assert.deepEqual(solver.validate(puzzle), { error: 'Invalid characters in puzzle' });
  });

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5....';
    assert.deepEqual(solver.validate(puzzle), { error: 'Expected puzzle to be 81 characters long' });
  });

  test('Logic handles a valid row placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.isTrue(solver.checkRowPlacement(puzzle, 0, 0, '1'));
  });

  test('Logic handles an invalid row placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.isFalse(solver.checkRowPlacement(puzzle, 0, 0, '5'));
  });

  test('Logic handles a valid column placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.isTrue(solver.checkColPlacement(puzzle, 0, 0, '1'));
  });

  test('Logic handles an invalid column placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.isFalse(solver.checkColPlacement(puzzle, 0, 0, '8'));
  });

  test('Logic handles a valid region (3x3 grid) placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.isTrue(solver.checkRegionPlacement(puzzle, 0, 0, '1'));
  });

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    assert.isFalse(solver.checkRegionPlacement(puzzle, 0, 0, '2'));
  });

  test('Valid puzzle strings pass the solver', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    const solution = solver.solve(puzzle).solution;
    assert.isString(solution);
    assert.equal(solution.length, 81);
  });

  test('Invalid puzzle strings fail the solver', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5...a9';
    const result = solver.solve(puzzle);
    assert.deepEqual(result, { error: 'Invalid characters in puzzle' });
  });

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9.1....8.2.3674.3...8.9...3....8.5.....67.6..2.84..63.12.7.2..5.....9';
    const expectedSolution = '135762984946381257728459613694517328812936745357824196473298561581673429269145873';
    assert.equal(solver.solve(puzzle).solution, expectedSolution);
  });

});
