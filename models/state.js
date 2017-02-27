function state() {}

state.prototype.parse = function(string) {

  var stacks = [];
  var arr = string.replace(/[( )]/g, '').split(';');

  stacks.push(arr[0].split(',').filter(Boolean));
  stacks.push(arr[1].split(',').filter(Boolean));
  stacks.push(arr[2].split(',').filter(Boolean));

  return stacks;
}

state.prototype.compare = function(stackA, stackB) {

    // Returns true if they are equal/valid
  if (typeof stackA[0] != 'undefined' &&
    typeof stackB[0] != 'undefined') {

    if (stackB[0].includes('X')) {
      // console.log('Comparing r1', stackA, stackB, true);
      return true
    }

    if (stackA.length != stackB.length) {
      // console.log('Comparing r2', stackA, stackB, false);
      return false;
    }

    var result = false;

    for (var i = 0; i <= 2; i++) {
      result = JSON.stringify(stackA[i]) == JSON.stringify(stackB[i]);
    }
    // console.log('Comparing r3', stackA, stackB, result);
    return result;
  } else {
    // console.log('Comparing r4', stackA, stackB, false);
    return false
  }
}

state.prototype.getNumberMisplacedStacks = function(stacks, goal) {

  var result = 0;

  for (var i = 0; i <= 2; i++) {
    if (this.compare(stacks[i], goal[i])) {
      result++;
    }
  }

  return result;
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
