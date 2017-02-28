const Stack = require('../lib/stack');

var maxHeight;

function crane(height) {
  maxHeight = height;
}

function moveContainer(stacks, origin, destination) {
  var container = pickUpContainer(stacks, origin);
  return putDownContainer(stacks, destination, container);
}

function pickUpContainer(stacks, stack) {
  // time += 0.5;
  return stacks[stack].pop();
}

function putDownContainer(stacks, stack, container) {
  // time += 0.5;
  stacks[stack].push(container);
  return stacks;
}

crane.prototype.isMovementValid = function(stackA, stackB) {
  // console.log(stackA + ' to ' + stackB);
  // console.log(!(stackA.length === 0));
  // console.log(stackB.length < maxHeight);
  return (!(stackA.length === 0) &&
    stackB.length < maxHeight);
}

crane.prototype.getActions = function(stackA, stackB) {


  var max, min;
  var result = 1;

  // TODO make this single function 2/2
  for (var i = 0; i < stackA.length; i++) {
    if (stackA[i].length < stackB[i].length) {
      min = i;
    } else if (stackA[i].length > stackB[i].length) {
      max = i;
    }
  }

  // var max = arr.indexOf(Math.max.apply(null, arr));
  // var min = arr.indexOf(Math.min.apply(null, arr));

  return ('(' + min + ', ' + max + ')');

}

crane.prototype.getCostForAction = function(stackA, stackB) {

  var max, min;
  var result = 1;

  // TODO make this single function 2/2
  for (var i = 0; i < stackA.length; i++) {
    if (stackA[i].length < stackB[i].length) {
      min = i;
    } else if (stackA[i].length > stackB[i].length) {
      max = i;
    }
  }

  // var max = arr.indexOf(Math.max.apply(null, arr));
  // var min = arr.indexOf(Math.min.apply(null, arr));

  var stacksMoved = (Math.abs(max - min));

  return (result + stacksMoved);

}


crane.prototype.nextValidStates = function(stackArray) {

  var result = [];
  for (var i = 0; i < stackArray.length; i++) {
    for (var j = 0; j < stackArray.length; j++) {
      if (!(i == j)) {
        if (this.isMovementValid(stackArray[i], stackArray[j])) {
          // console.log(i + ' to ' + j);
          // Need to make a copy of the array
          var stacks = stackArray.map(function(arr) {
            return arr.slice();
          });
          result.push(moveContainer(stacks, i, j));
        }
      }
    }
  }
  return result;
}

module.exports = crane;
