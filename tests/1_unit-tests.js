const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite("Number input", function() {
    test("Whole number input", function() {
      let input = "10kg";
      assert.equal(convertHandler.getNum(input), 10);
    });

    test("Decimal number input", function() {
      let input = "10.5kg";
      assert.equal(convertHandler.getNum(input), 10.5);
    });

    test("Fractional number input", function() {
      let input = "1/2kg";
      assert.equal(convertHandler.getNum(input), 0.5);
    });

    test("Fraction number input with a decimal", function() {
      let input = "1.5/2kg";
      assert.equal(convertHandler.getNum(input), 0.75);
    });

    test("Return error on double fraction", function() {
      let input = "1.5/2/4kg";
      assert.isNotOk(convertHandler.getNum(input));
    });

    test("Default to 1 with no number input", function() {
      let input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
    });
  });

  suite("Reading inputs", function() {
    test("Read valid input units", function() {
      let input = "10gal";
      assert.equal(convertHandler.getUnit(input), "gal");
    });

    test("Return an error for invalid units", function() {
      let input = "10invalid";
      assert.isNotOk(convertHandler.getUnit(input));
    });

    test("Return the correct return units", function() {
      let input = "gal";
      assert.equal(convertHandler.getReturnUnit(input), "L");
    });

    test("Return the correct spelled-out units", function() {
      let input = "gal";
      assert.equal(convertHandler.spellOutUnit(input), "gallons");
    });
  });

  suite("Conversions", function() {
    test("gal to L", function() {
      let number = 10;
      let unit = "gal";
      assert.equal(convertHandler.convert(number, unit), 37.85410);
    });

    test("L to gal", function() {
      let number = 37.85410;
      let unit = "L";
      assert.equal(convertHandler.convert(number, unit), 10);
    });

    test("mi to km", function() {
      let number = 10;
      let unit = "mi";
      assert.equal(convertHandler.convert(number, unit), 16.09340);
    });

    test("km to mi", function() {
      let number = 16.09340;
      let unit = "km";
      assert.equal(convertHandler.convert(number, unit), 10);
    });

    test("lbs to kg", function() {
      let number = 10;
      let unit = "lbs";
      assert.equal(convertHandler.convert(number, unit), 4.53592);
    });

    test("lbs to kg", function() {
      let number = 4.53592;
      let unit = "kg";
      assert.equal(convertHandler.convert(number, unit), 10);
    });
  });

});