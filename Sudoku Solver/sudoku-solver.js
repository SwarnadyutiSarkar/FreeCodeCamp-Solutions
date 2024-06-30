// controllers/sudoku-solver.js

class SudokuSolver {

    validate(puzzleString) {
      const validChars = /^[1-9.]*$/;
      if (puzzleString.length !== 81) {
        return { error: 'Expected puzzle to be 81 characters long' };
      }
      if (!validChars.test(puzzleString)) {
        return { error: 'Invalid characters in puzzle' };
      }
      return true;
    }
  
    checkRowPlacement(puzzleString, row, column, value) {
      const grid = this.convertToGrid(puzzleString);
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === value) {
          return false;
        }
      }
      return true;
    }
  
    checkColPlacement(puzzleString, row, column, value) {
      const grid = this.convertToGrid(puzzleString);
      for (let r = 0; r < 9; r++) {
        if (grid[r][column] === value) {
          return false;
        }
      }
      return true;
    }
  
    checkRegionPlacement(puzzleString, row, column, value) {
      const grid = this.convertToGrid(puzzleString);
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(column / 3) * 3;
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (grid[r][c] === value) {
            return false;
          }
        }
      }
      return true;
    }
  
    convertToGrid(puzzleString) {
      let grid = [];
      for (let i = 0; i < 9; i++) {
        grid.push(puzzleString.slice(i * 9, i * 9 + 9).split(''));
      }
      return grid;
    }
  
    solve(puzzleString) {
      const isValid = this.validate(puzzleString);
      if (isValid.error) {
        return isValid;
      }
  
      const grid = this.convertToGrid(puzzleString);
      const solvedGrid = this.solveSudoku(grid);
      if (!solvedGrid) {
        return { error: 'Puzzle cannot be solved' };
      }
  
      return { solution: solvedGrid.flat().join('') };
    }
  
    solveSudoku(grid) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === '.') {
            for (let num = 1; num <= 9; num++) {
              const value = num.toString();
              if (this.checkRowPlacement(grid.flat().join(''), row, col, value) &&
                  this.checkColPlacement(grid.flat().join(''), row, col, value) &&
                  this.checkRegionPlacement(grid.flat().join(''), row, col, value)) {
                grid[row][col] = value;
                if (this.solveSudoku(grid)) {
                  return grid;
                } else {
                  grid[row][col] = '.';
                }
              }
            }
            return false;
          }
        }
      }
      return grid;
    }
  
  }
  
  module.exports = SudokuSolver;
  