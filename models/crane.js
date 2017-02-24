const Stack = require('../lib/stack');

let stack0 = new Stack();
let stack1 = new Stack();
let stack2 = new Stack();

let maxHeight;

function crane(height, initialState, goalState) {

  maxHeight = height;
  this.initialState = initialState;
  this.goalState = goalState;

  initStacks(initialState);
}

function initStacks(initialState) {

  let parsedState = initialState.replace(/[( )]/g, '');
  let stackArray = parsedState.split(';');

  let stack0Array = stackArray[0].split(',');
  let stack1Array = stackArray[1].split(',');
  let stack2Array = stackArray[2].split(',');

  stack0Array.map(container => {
    stack0.push(container)
  });

  stack1Array.map(container => {
    stack1.push(container)
  });

  stack2Array.map(container => {
    stack2.push(container)
  });
}

function pickUpContainer(stack) {
  // time += 0.5;
  switch (stack) {
    case 0:
      return stack0.pop();
    case 1:
      return stack1.pop();
    case 2:
      return stack2.pop();
  }
}

function putDownContainer(stack, container) {
  // time += 0.5;
  switch (stack) {
    case 0:
      return stack0.push(container);
    case 1:
      return stack1.push(container);
    case 2:
      return stack2.push(container);
  }
}

function isMovementValid(originStack, destinationStack) {
  return (!originStack.isEmpty() && destinationStack.length < maxHeight);
}

function printCurrentState() {

  let print0 = stack0;
  let print1 = stack1;
  let print2 = stack2;

  let printedStack = [];


  for (var i = 0; i < print0.length; i++) {
    printedStack.push(print0.pop());
  }

  for (var i = 0; i < print1.length; i++) {
    printedStack.push(print1.pop());
  }

  for (var i = 0; i < print2.length; i++) {
    printedStack.push(print2.pop());
  }

  console.log(printedStack);
}


// Public functions

function moveContainer(initialState, origin, destination) {

  initStacks(initialState);

  // for (i = 0; i < Math.abs(origin - destination); i++) {
  // time += 1;
  // }

  // movementLogArray.push("(" + origin + " ," + destination + ")");

  let container = pickUpContainer(origin);
  putDownContainer(destination, container);
  // console.log('(' + printStack(stack0) + '); ('  + printStack(stack1) + '); ('  + printStack(stack2) + ')');

}


function nextValidStates(initialState) {
  if (isMovementValid(stack0, stack1)) {
    console.log('0 to 1');
    moveContainer(initialState, 0, 1);
  }
  if (isMovementValid(stack0, stack2)) {
    console.log('0 to 2');
    moveContainer(initialState, 0, 2);
    printCurrentState();
  }
  if (isMovementValid(stack1, stack0)) {
    console.log('1 to 0');
    moveContainer(initialState, 1, 0);
  }
  if (isMovementValid(stack1, stack2)) {
    console.log('1 to 2');
    moveContainer(initialState, 1, 2);
  }
  if (isMovementValid(stack2, stack0)) {
    console.log('2 to 0');
    moveContainer(initialState, 2, 0);
  }
  if (isMovementValid(stack2, stack1)) {
    console.log('2 to 1');
    moveContainer(initialState, 2, 1);
  }
}

crane.prototype = {
  moveContainer,
  nextValidStates
};

module.exports = crane;
