// Stuff required for stdin
let readline = require('readline');
const Stack = require('./lib/stack');

// Create interface for STDIO
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Input Variables
let maxHeight;
let initialState;
let goalState;

// Program variables
let inputCount = 1; // Counter for input
let time = 0; // Time for the crane
let movementLogArray = []; // Log for the crane movements

let stack0Array = [];
let stack1Array = [];
let stack2Array = [];

rl.on('line', function(line) {

  switch (inputCount) {
    case 1:
      maxHeight = line;
      inputCount++;
      break;
    case 2:
      initialState = line;
      inputCount++;
      break;
    case 3:
      goalState = line;
      inputCount++;
      run(maxHeight, initialState, goalState);
      break;
    default:
      console.log('Exceeded input')
      break;
  }
})

function run(maxHeight, initialState, goalState) {
  // console.log('Max Height', maxHeight);
  // console.log('Initial State', initialState);
  // console.log('Goal State', goalState);

  initStackVariables(initialState);


}

function initStackVariables(initialState) {

  let parsedState = initialState.replace(/[()]/g, '');

  let stackArray = parsedState.split(';');

  stack0Array = stackArray[0].split(',');
  stack1Array = stackArray[1].split(',');
  stack2Array = stackArray[2].split(',');



}

// Crane functions

function pickUpContainer(stack) {
  time += 0.5;
  switch (stack) {
    case 0:
      return stack0Array.pop();
    case 1:
      return stack1Array.pop();
    case 2:
      return stack2Array.pop();
  }
}

function moveContainer(location, destination) {

  for (i = 0; i < Math.abs(location - destination); i++) {
    time += 1;
  }
  movementLogArray.push("(" + location + " ," + destination + ")");

  let box = pickUpContainer(location);
  putDownContainer(destination, box);

}

function putDownContainer(stack, box) {
  time += 0.5;
  switch (stack) {
    case 0:
      return stack0Array.push(box);
    case 1:
      return stack1Array.push(box);
    case 2:
      return stack2Array.push(box);
  }
}

function printState() {
  console.log("(" + stack0Array + "); (" + stack1Array + "); (" + stack2Array + ")");
}
