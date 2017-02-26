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

function isMovementValid(stackA, stackB) {
  // console.log(stackA + ' to ' + stackB);
  // console.log(!(stackA.length === 0));
  // console.log(stackB.length < maxHeight);
  return (!(stackA.length === 0) &&
    stackB.length < maxHeight);
}

function getActions(stackA, stackB) {

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

function getCostForAction(stackA, stackB) {

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


function nextValidStates(stackArray) {

  var result = [];
  for (var i = 0; i <= 2; i++) {
    for (var j = 0; j <= 2; j++) {
      if (!(i == j)) {
        if (isMovementValid(stackArray[i], stackArray[j])) {
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

crane.prototype = {
  moveContainer,
  getActions,
  getCostForAction,
  nextValidStates
};

module.exports = crane;
