function splitNumberAndUnit(input) {
  const num = input.match(/[.\d\/ ]+/g) || ["1"];
  const unit = input.match(/[a-zA-Z]+/g);

  num[0] = num[0].replace(" ", "+");

  if (num[0].split("/").length - 1 > 1) {
    return [false, unit[0].toLowerCase()];
  } else {
    return [eval(num[0]), unit[0].toLowerCase()];
  };
};

function testUnit(i) {
  if (
    i != "gal" &&
    i != "l" &&
    i != "lbs" &&
    i != "kg" &&
    i != "mi" &&
    i != "km"
  ) {
    return false;
  } else {
    return true;
  };
};

function ConvertHandler() {

  this.getNum = function(input) {
    let result = splitNumberAndUnit(input)[0];
    return result;
  };

  this.getUnit = function(input) {
    let result = splitNumberAndUnit(input)[1];

    if (testUnit(result)) {
      return result;
    } else {
      return;
    };
  };

  this.getReturnUnit = function(initUnit) {
    let result = "";
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
    };
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = "";

    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
    };
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = 0;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    };

    return Math.round(result * 100000) / 100000;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    let result = initNum.toString() + " " + spelledOutInitUnit + " converts to " + returnNum.toString() + " " + spelledOutReturnUnit;
    return result;
  };

}

module.exports = ConvertHandler;
