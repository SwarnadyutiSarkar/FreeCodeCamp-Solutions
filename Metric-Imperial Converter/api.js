// routes/api.js

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json('invalid number and unit');
      } else if (initNum === 'invalid number') {
        return res.json('invalid number');
      } else if (initUnit === 'invalid unit') {
        return res.json('invalid unit');
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
      const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);

      res.json({
        initNum,
        initUnit,
        returnNum: parseFloat(returnNum),
        returnUnit,
        string: `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`
      });
    });
};
