function state() {}

state.prototype.parse = function(string) {

  var stacks = [];
  var arr = string.replace(/[( )]/g, '').split(';');

  for (var i = 0; i < arr.length; i++) {
    stacks.push(arr[i].split(',').filter(Boolean));
  }

  return stacks;
}

state.prototype.compare = function(stackArrayA, stackArrayB) {

  var result = true;

  for (var i = 0; i < stackArrayA.length; i++) {
    if (!(this.compareArray(stackArrayA[i], stackArrayB[i]))) {
      result = false;
    }
  }

  return result;

}

state.prototype.compareArray = function(stackA, stackB) {

  var result = true;


  if (typeof stackA == 'undefined' &&
    typeof stackB == 'undefined') {
    // console.log('Compare R1', stackA, stackB, true);
    return true;
  } else if (typeof stackA != 'undefined' &&
    typeof stackB != 'undefined') {

    if (stackB.includes('X')) {
      // console.log('Compare R3', stackA, stackB, true);
      return true;
    }

    if (stackA.length != stackB.length) {
      // console.log('Compare R6', stackA, stackB, false);
      return false;
    }

    for (var i = 0; i <= stackA.length; i++) {
      if (!(JSON.stringify(stackA[i]) == JSON.stringify(stackB[i])))
        result = false;
    }

    // console.log('Compare R2', stackA, stackB, result);
    return result;

  } else {
    // console.log('Compare R4', stackA, stackB, false);
    return false;
  }

  // console.log('Compare R5', stackA, stackB, false);
  return false
}

state.prototype.getNumberMisplacedStacks = function(stacks, goal, currentCost) {

  var result = 0;

  for (var i = 0; i < stacks.length; i++) {
    if (this.compareArray(stacks[i], goal[i])) {
      result++;
    }
  }

  return result + currentCost;
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

module.exports = state;
