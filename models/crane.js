const Stack = require('../lib/stack');

let stack0 = [];
let stack1 = [];
let stack2 = [];

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

  stack0 = stackArray[0].split(',');
  stack1 = stackArray[1].split(',');
  stack2 = stackArray[2].split(',');

  stack0 = stack0.filter(Boolean)
  stack1 = stack1.filter(Boolean)
  stack2 = stack2.filter(Boolean)
}

function parseState(state) {

  let stacks = [];
  let parsedState = state.replace(/[( )]/g, '');
  let stackArray = parsedState.split(';');


  let s0 = stackArray[0].split(',');
  let s1 = stackArray[1].split(',');
  let s2 = stackArray[2].split(',');

  s0 = s0.filter(Boolean)
  s1 = s1.filter(Boolean)
  s2 = s2.filter(Boolean)

  stacks.push(s0);
  stacks.push(s1);
  stacks.push(s2);

  return stacks;

  // return("(" + s0 + "); (" + s1 + "); (" + s2 + ")");
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
  return (!(originStack.length === 0) && destinationStack.length < maxHeight);
}

function getCurrentState() {
  let stacks = [];
  stacks.push(stack0);
  stacks.push(stack1);
  stacks.push(stack2);
  return stacks;
}

function moveContainer(initialState, origin, destination) {

  initStacks(initialState);

  let container = pickUpContainer(origin);
  putDownContainer(destination, container);
  return getCurrentState();
}


function nextValidStates(initialState) {

  let result = [];
  if (isMovementValid(stack0, stack1)) {
    // console.log('0 to 1');
    result.push(moveContainer(initialState, 0, 1));
  }
  if (isMovementValid(stack0, stack2)) {
    // console.log('0 to 2');
    result.push(moveContainer(initialState, 0, 2));
  }
  if (isMovementValid(stack1, stack0)) {
    // console.log('1 to 0');
    result.push(moveContainer(initialState, 1, 0));
  }
  if (isMovementValid(stack1, stack2)) {
    // console.log('1 to 2');
    result.push(moveContainer(initialState, 1, 2));
  }
  if (isMovementValid(stack2, stack0)) {
    // console.log('2 to 0');
    result.push(moveContainer(initialState, 2, 0));
  }
  if (isMovementValid(stack2, stack1)) {
    // console.log('2 to 1');
    result.push(moveContainer(initialState, 2, 1));
  }

  return result;
}

crane.prototype = {
  moveContainer,
  parseState,
  nextValidStates
};

module.exports = crane;
