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

  // TODO make this single func
  var arr = [];

  for (var i = 0; i <= 2; i++) {
    arr.push(stackA[i].length + stackB[i].length);
  }

  var max = arr.indexOf(Math.max.apply(null, arr));
  arr[max] = -1;

  var second = arr.indexOf(Math.max.apply(null, arr));

  return('(' + second + ', ' + max + ')');

}

crane.prototype.getCostForAction =  function(stackA, stackB) {

 var arr = [];
 var result = 1;

  for (var i = 0; i <= 2; i++) {
    arr.push(stackA[i].length + stackB[i].length);
  }

  var max = arr.indexOf(Math.max.apply(null, arr));
  arr[max] = -1;
  var second = arr.indexOf(Math.max.apply(null, arr));

  var stacksMoved = (Math.abs(max - second));

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
