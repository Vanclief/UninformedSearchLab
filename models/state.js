function state() {}

state.prototype.parse = function(string) {

  var stacks = [];
  var arr = string.replace(/[( )]/g, '').split(';');

  for (var i = 0; i < arr.length; i++) {
    stacks.push(arr[i].split(',').filter(Boolean));
  }

  return stacks;
}

state.prototype.printMovements = function (movements) {
  var arr = [];

  while (movements.length > 0) {
    var n = movements.pop();
    arr.push(n.action);
  }
  console.log(arr.join('; '));
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

state.prototype.getNumberMisplacedBlocks = function(stacks, goal) {

  var result = 0;

  for (var i = 0; i < stacks.length; i++) {
    if (stacks[i] && !(goal[i]).includes('X')) {
      for (var j = 0; j < stacks[i].length; j++) {
        if (!(goal[i].includes(stacks[i][j])))
            result++;
      }
    }
  }
  return result;
}

state.prototype.visitedContains = function(visited, stack) {

  result = false;

  for (j = 0; j < visited.length; j++) {
    if (this.compare(visited[j], stack)) {
      result = true;
    }
  }

  return result;
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);
      var len = o.length >>> 0;

      if (len === 0) {
        return false;
      }

      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

module.exports = state;
