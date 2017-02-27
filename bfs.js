var readline = require('readline');
const Stack = require('./lib/stack');
const Queue = require('./lib/queue');
const BinaryHeap = require('./lib/binaryHeap');
const Crane = require('./models/crane');
const State = require('./models/state');

// Create interface for STDIO
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var maxHeight, initialState, goalState;
var inputCount = 1; // Counter for input

var crane;
var state = new State();

var visited = [];
var queue = new Queue();
var movements = [];
var cost = 0;

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
      main(maxHeight, initialState, goalState);
      break;
    default:
      console.log('Exceeded input')
      break;
  }
})

function main(maxHeight, initialState, goalState) {

  var init = state.parse(initialState);
  var goal = state.parse(goalState);
  crane = new Crane(maxHeight);

  if (!breadthFirstSearch(init, goal)) {
    console.log('No solution found');
  } else {
    console.log(cost);
    printMovements();
  }
 }

function printMovements() {
  console.log(movements.join('; '));
}

function breadthFirstSearch(node, goal) {

  queue.push(node);

  while (queue.length > 0) {

    node = queue.pop();

    if (state.compare(node, goal)) {
      return true;
    }

    visited.push(node);

    var children = crane.nextValidStates(node);
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (!visitedContains(child)) {
        cost += crane.getCostForAction(node, child);
        movements.push(crane.getActions(node, child));
        queue.push(child);
      }
    }

  }
}

function visitedContains(stack) {

  result = false;

  for (j = 0; j < visited.length; j++) {
    if (state.compare(visited[j], stack)) {
      result = true;
    }
  }

  return result;
}
