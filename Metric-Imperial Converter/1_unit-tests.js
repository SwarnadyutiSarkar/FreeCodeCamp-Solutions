// tests/1_unit-tests.js

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Whole number input', function(done) {
    const input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  test('Decimal number input', function(done) {
    const input = '3.2L';
    assert.equal(convertHandler.getNum(input), 3.2);
    done();
  });

  test('Fractional input', function(done) {
    const input = '1/2L';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  test('Fractional input with decimal', function(done) {
    const input = '5.4/3L';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });

  test('Double-fraction input error', function(done) {
    const input = '3/2/3L';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });

  test('No numerical input', function(done) {
    const input = 'L';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test('Each valid input unit', function(done) {
    const input = '32L';
    assert.equal(convertHandler.getUnit(input), 'L');
    done();
  });

  test('Invalid input unit error', function(done) {
    const input = '32g';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  test('Correct return unit', function(done) {
    const input = '32L';
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    done();
  });

  test('Spelled-out unit', function(done) {
    const input = '32L';
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    done();
  });

  test('Convert gal to L', function(done) {
    const input = '1gal';
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    done();
  });

  test('Convert L to gal', function(done) {
    const input = '1L';
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    done();
  });

  test('Convert mi to km', function(done) {
    const input = '1mi';
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    done();
  });

  test('Convert km to mi', function(done) {
    const input = '1km';
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    done();
  });

  test('Convert lbs to kg', function(done) {
    const input = '1lbs';
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    done();
  });

  test('Convert kg to lbs', function(done) {
    const input = '1kg';
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    done();
  });
});
